// // // // // // 'use client';

// // // // // // import { X, FileText, CheckCircle, XCircle, Download, User, Calendar } from 'lucide-react';

// // // // // // interface CourseProposalDetailModalProps {
// // // // // //     course: any;
// // // // // //     onClose: () => void;
// // // // // //     onApprove: (course: any) => void;
// // // // // //     onReject: (id: string) => void;
// // // // // // }

// // // // // // export default function CourseProposalDetailModal({ course, onClose, onApprove, onReject }: CourseProposalDetailModalProps) {
// // // // // //     if (!course) return null;

// // // // // //     return (
// // // // // //         <div className="fixed inset-0 bg-black/70 z-[110] flex items-center justify-center p-4 backdrop-blur-sm animate-in zoom-in-95">
// // // // // //             <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
// // // // // //                 {/* Header */}
// // // // // //                 <div className="bg-orange-50 p-5 border-b border-orange-100 flex justify-between items-center">
// // // // // //                     <div>
// // // // // //                         <h2 className="text-lg font-bold text-orange-900">Review Pengajuan Pelatihan</h2>
// // // // // //                         <p className="text-xs text-orange-700">Verifikasi dokumen sebelum menyetujui.</p>
// // // // // //                     </div>
// // // // // //                     {/* [FIX] Tambahkan title dan aria-label */}
// // // // // //                     <button 
// // // // // //                         onClick={onClose} 
// // // // // //                         className="p-2 hover:bg-orange-100 rounded-full text-orange-800 transition-colors"
// // // // // //                         title="Tutup Modal"
// // // // // //                         aria-label="Tutup Modal"
// // // // // //                     >
// // // // // //                         <X size={20}/>
// // // // // //                     </button>
// // // // // //                 </div>

// // // // // //                 {/* Body */}
// // // // // //                 <div className="p-6 overflow-y-auto space-y-6">
                    
// // // // // //                     {/* Info Utama */}
// // // // // //                     <div className="flex gap-4 items-start">
// // // // // //                         <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
// // // // // //                             <User size={24}/>
// // // // // //                         </div>
// // // // // //                         <div>
// // // // // //                             <h3 className="font-bold text-gray-900 text-lg">{course.title}</h3>
// // // // // //                             <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
// // // // // //                                 <span className="font-semibold">{course.creatorInfo?.name || 'User'}</span>
// // // // // //                                 <span>•</span>
// // // // // //                                 <span>{course.creatorInfo?.email}</span>
// // // // // //                             </div>
// // // // // //                             <div className="mt-2 flex gap-2">
// // // // // //                                 <span className={`px-2 py-1 rounded text-xs font-bold border ${course.programType==='training'?'bg-blue-50 text-blue-700 border-blue-200':'bg-purple-50 text-purple-700 border-purple-200'}`}>
// // // // // //                                     {course.programType === 'training' ? 'Diklat Resmi' : 'Kursus Mandiri'}
// // // // // //                                 </span>
// // // // // //                                 <span className="px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-600 flex items-center gap-1">
// // // // // //                                     <Calendar size={12}/> Diajukan: {new Date(course.createdAt).toLocaleDateString('id-ID')}
// // // // // //                                 </span>
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     </div>

// // // // // //                     {/* Alasan Pengajuan */}
// // // // // //                     <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
// // // // // //                         <h4 className="text-sm font-bold text-gray-700 mb-2">Latar Belakang / Tujuan</h4>
// // // // // //                         <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: course.description }} />
// // // // // //                     </div>

// // // // // //                     {/* Dokumen Lampiran */}
// // // // // //                     <div>
// // // // // //                         <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
// // // // // //                             <FileText size={16}/> Dokumen Pendukung
// // // // // //                         </h4>
                        
// // // // // //                         {!course.proposalDocuments || course.proposalDocuments.length === 0 ? (
// // // // // //                             <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 text-sm italic">
// // // // // //                                 Tidak ada dokumen yang dilampirkan.
// // // // // //                             </div>
// // // // // //                         ) : (
// // // // // //                             <div className="grid gap-3">
// // // // // //                                 {course.proposalDocuments.map((doc: any, idx: number) => (
// // // // // //                                     <div key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
// // // // // //                                         <div className="flex items-center gap-3 overflow-hidden">
// // // // // //                                             <div className="bg-red-50 p-2 rounded text-red-600"><FileText size={18}/></div>
// // // // // //                                             <span className="text-sm font-medium text-gray-700 truncate max-w-[200px] md:max-w-xs" title={doc.name}>
// // // // // //                                                 {doc.name}
// // // // // //                                             </span>
// // // // // //                                         </div>
// // // // // //                                         <a 
// // // // // //                                             href={doc.url} 
// // // // // //                                             target="_blank" 
// // // // // //                                             rel="noopener noreferrer"
// // // // // //                                             className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors"
// // // // // //                                             title="Download Dokumen"
// // // // // //                                             aria-label="Download Dokumen"
// // // // // //                                         >
// // // // // //                                             <Download size={12}/> Lihat / Download
// // // // // //                                         </a>
// // // // // //                                     </div>
// // // // // //                                 ))}
// // // // // //                             </div>
// // // // // //                         )}
// // // // // //                     </div>
// // // // // //                 </div>

// // // // // //                 {/* Footer Action */}
// // // // // //                 <div className="p-5 border-t bg-gray-50 flex justify-end gap-3">
// // // // // //                     <button 
// // // // // //                         onClick={() => onReject(course._id)} 
// // // // // //                         className="px-5 py-2.5 rounded-xl border border-red-200 text-red-600 font-bold text-sm hover:bg-red-50 flex items-center gap-2"
// // // // // //                         title="Tolak Pengajuan"
// // // // // //                     >
// // // // // //                         <XCircle size={18}/> Tolak Pengajuan
// // // // // //                     </button>
// // // // // //                     <button 
// // // // // //                         onClick={() => onApprove(course)} 
// // // // // //                         className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 shadow-lg flex items-center gap-2"
// // // // // //                         title="Setujui Pengajuan"
// // // // // //                     >
// // // // // //                         <CheckCircle size={18}/> Setujui & Proses
// // // // // //                     </button>
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // }

// // // // // 'use client';

// // // // // import { useState, useRef, useEffect } from 'react';
// // // // // import { X, FileText, CheckCircle, Undo2, User, Calendar, ExternalLink, AlertTriangle, Upload, MessageSquare, Loader2, Image as ImageIcon, Send } from 'lucide-react';
// // // // // import { api } from '@/lib/api'; 
// // // // // import axios from 'axios';

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
    
// // // // //     // Fallback array jika null
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
// // // // //         setUploading(true);
// // // // //         const fd = new FormData();
// // // // //         fd.append('file', file);

// // // // //         try {
// // // // //             const userStr = localStorage.getItem('user');
// // // // //             const token = userStr ? JSON.parse(userStr).token : '';
// // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
// // // // //             });

// // // // //             const fileUrl = response.data.data?.url || response.data.url;
// // // // //             const fileName = response.data.data?.originalName || file.name;

// // // // //             if (fileUrl) {
// // // // //                 const newDoc = { name: fileName, originalName: fileName, url: fileUrl }; // Simpan nama asli
// // // // //                 const updatedDocs = [...localDocuments, newDoc];
// // // // //                 const autoMsg = {
// // // // //                     senderName: "System", role: "SYSTEM",
// // // // //                     message: `📄 Mengunggah dokumen susulan: ${fileName}`, createdAt: new Date()
// // // // //                 };
// // // // //                 const newHistory = [...localHistory, autoMsg];

// // // // //                 await api(`/api/courses/${course._id}`, {
// // // // //                     method: 'PATCH',
// // // // //                     body: { proposalDocuments: updatedDocs, feedbackHistory: newHistory }
// // // // //                 });

// // // // //                 setLocalDocuments(updatedDocs);
// // // // //                 setLocalHistory(newHistory);
// // // // //             }
// // // // //         } catch (err: any) { alert("Gagal Upload: " + err.message); } finally {
// // // // //             setUploading(false);
// // // // //             e.target.value = '';
// // // // //         }
// // // // //     };

// // // // //     return (
// // // // //         <div className="fixed inset-0 bg-black/70 z-[110] flex items-center justify-center p-4 backdrop-blur-sm animate-in zoom-in-95">
// // // // //             <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
// // // // //                 <div className="bg-white p-5 border-b border-gray-100 flex justify-between items-center shadow-sm z-10">
// // // // //                     <div>
// // // // //                         <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
// // // // //                             {isReadOnly ? 'Histori Pengajuan' : 'Review & Diskusi Pengajuan'}
// // // // //                             <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full uppercase border border-orange-200">{course.status}</span>
// // // // //                         </h2>
// // // // //                     </div>
// // // // //                     <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Tutup"><X size={20}/></button>
// // // // //                 </div>

// // // // //                 <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
// // // // //                     {/* KOLOM KIRI */}
// // // // //                     <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6 border-r border-gray-200">
// // // // //                         <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
// // // // //                             <h3 className="font-bold text-lg text-gray-800 mb-2">{course.title}</h3>
// // // // //                             <div className="text-sm text-gray-600 leading-relaxed mb-4">
// // // // //                                 <div dangerouslySetInnerHTML={{ __html: course.description }} />
// // // // //                             </div>
// // // // //                             <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
// // // // //                                 <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">
// // // // //                                     {course.creatorInfo?.name?.charAt(0) || 'U'}
// // // // //                                 </div>
// // // // //                                 <div className="text-xs">
// // // // //                                     <div className="font-bold text-gray-700">{course.creatorInfo?.name}</div>
// // // // //                                     <div className="text-gray-500">{course.creatorInfo?.email}</div>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         </div>

// // // // //                         {/* LIST DOKUMEN */}
// // // // //                         <div>
// // // // //                             <div className="flex justify-between items-center mb-3">
// // // // //                                 <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2"><FileText size={16}/> Dokumen Pendukung ({localDocuments.length})</h4>
// // // // //                                 {!isReadOnly && (
// // // // //                                     <div className="relative">
// // // // //                                         <input type="file" onChange={handleUploadSusulan} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload"/>
// // // // //                                         <button className="flex items-center gap-1 text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
// // // // //                                             {uploading ? <Loader2 size={12} className="animate-spin"/> : <Upload size={12}/>} Upload Susulan
// // // // //                                         </button>
// // // // //                                     </div>
// // // // //                                 )}
// // // // //                             </div>
                            
// // // // //                             {localDocuments.length === 0 ? (
// // // // //                                 <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 text-sm italic bg-white">
// // // // //                                     <AlertTriangle size={20} className="mx-auto mb-2 text-gray-300"/> Belum ada dokumen.
// // // // //                                 </div>
// // // // //                             ) : (
// // // // //                                 <div className="space-y-3">
// // // // //                                     {localDocuments.map((doc: any, idx: number) => {
// // // // //                                         const type = getFileType(doc.url);
// // // // //                                         // [FIX] Menggunakan originalName untuk judul
// // // // //                                         const displayName = doc.originalName || doc.name;
// // // // //                                         const displayType = doc.originalName ? doc.name : 'Dokumen'; // Jika ada originalName, 'name' jadi label tipe (misal: KAK)

// // // // //                                         return (
// // // // //                                             <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
// // // // //                                                 <div className="flex items-start gap-3">
// // // // //                                                     <div className={`p-2 rounded-lg shrink-0 ${type === 'pdf' ? 'bg-red-50 text-red-600' : type === 'image' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
// // // // //                                                         {type === 'image' ? <ImageIcon size={20}/> : <FileText size={20}/>}
// // // // //                                                     </div>
// // // // //                                                     <div className="flex-1 min-w-0">
// // // // //                                                         <p className="text-sm font-bold text-gray-700 truncate" title={displayName}>{displayName}</p>
// // // // //                                                         <p className="text-[10px] text-gray-400 uppercase mt-0.5">{displayType}</p>
// // // // //                                                         {type === 'image' && (
// // // // //                                                             <div className="mt-2 mb-2 rounded-lg overflow-hidden border border-gray-100 w-fit">
// // // // //                                                                 <img src={doc.url} alt="Preview" className="h-32 w-auto object-cover"/>
// // // // //                                                             </div>
// // // // //                                                         )}
// // // // //                                                         <div className="mt-2">
// // // // //                                                             <a href={doc.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded transition-colors ${type === 'pdf' ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
// // // // //                                                                 <ExternalLink size={10}/> {type === 'image' ? 'Lihat Full Size' : 'Download File'}
// // // // //                                                             </a>
// // // // //                                                         </div>
// // // // //                                                     </div>
// // // // //                                                 </div>
// // // // //                                             </div>
// // // // //                                         );
// // // // //                                     })}
// // // // //                                 </div>
// // // // //                             )}
// // // // //                         </div>
// // // // //                     </div>

// // // // //                     {/* KOLOM KANAN */}
// // // // //                     <div className="w-full md:w-[350px] flex flex-col bg-white border-l border-gray-200 h-[600px] md:h-auto">
// // // // //                         <div className="p-3 bg-gray-50 border-b border-gray-200 font-bold text-xs text-gray-500 uppercase tracking-wider flex items-center gap-2">
// // // // //                             <MessageSquare size={14}/> Catatan & Feedback
// // // // //                         </div>
// // // // //                         <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
// // // // //                             {localHistory.length === 0 && <div className="text-center text-gray-400 text-xs italic mt-10">Belum ada catatan.</div>}
// // // // //                             {localHistory.map((msg: any, idx: number) => {
// // // // //                                 const isMe = currentUser && msg.senderName === currentUser.name;
// // // // //                                 const isSystem = msg.role === 'SYSTEM';
// // // // //                                 if (isSystem) return <div key={idx} className="flex justify-center my-2"><span className="text-[10px] bg-gray-100 text-gray-500 px-3 py-1 rounded-full border border-gray-200">{msg.message}</span></div>;
// // // // //                                 return (
// // // // //                                     <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// // // // //                                         <div className={`max-w-[90%] p-3 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
// // // // //                                             {msg.message}
// // // // //                                         </div>
// // // // //                                         <span className="text-[10px] text-gray-400 mt-1 px-1">
// // // // //                                             {isMe ? 'Anda' : msg.senderName} • {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
// // // // //                                         </span>
// // // // //                                     </div>
// // // // //                                 );
// // // // //                             })}
// // // // //                         </div>
// // // // //                         {!isReadOnly && (
// // // // //                             <div className="p-3 border-t border-gray-200 bg-gray-50">
// // // // //                                 <div className="flex gap-2">
// // // // //                                     <input type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis catatan..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendFeedback()}/>
// // // // //                                     <button onClick={handleSendFeedback} disabled={sending || !newMessage.trim()} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors" title="Kirim" aria-label="Kirim">
// // // // //                                         {sending ? <Loader2 size={18} className="animate-spin"/> : <Send size={18}/>}
// // // // //                                     </button>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         )}
// // // // //                     </div>
// // // // //                 </div>

// // // // //                 <div className="p-4 border-t bg-white flex justify-end gap-3 shrink-0">
// // // // //                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors">Tutup</button>
// // // // //                     {!isReadOnly && isAdminOrSuper && (
// // // // //                         <>
// // // // //                             <button onClick={() => onReject(course)} className="px-5 py-2.5 rounded-xl border border-yellow-200 text-yellow-700 font-bold text-sm hover:bg-yellow-50 flex items-center gap-2">
// // // // //                                 <Undo2 size={18}/> Kembalikan
// // // // //                             </button>
// // // // //                             <button onClick={() => onApprove(course)} className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 shadow-lg flex items-center gap-2">
// // // // //                                 <CheckCircle size={18}/> Setujui
// // // // //                             </button>
// // // // //                         </>
// // // // //                     )}
// // // // //                 </div>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // }


// // // // 'use client';

// // // // import { useState, useRef, useEffect } from 'react';
// // // // import { X, FileText, CheckCircle, Undo2, User, Calendar, ExternalLink, AlertTriangle, Upload, MessageSquare, Loader2, Image as ImageIcon, Send } from 'lucide-react';
// // // // import { api } from '@/lib/api'; 
// // // // import axios from 'axios';

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

// // // //     useEffect(() => {
// // // //         if (chatContainerRef.current) {
// // // //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // //         }
// // // //     }, [localHistory]);

// // // //     if (!course) return null;

// // // //     const isAdminOrSuper = currentUser && ['ADMIN', 'SUPER_ADMIN'].includes(currentUser.role);

// // // //     const getFileType = (url: string) => {
// // // //         const ext = url.split('.').pop()?.toLowerCase();
// // // //         if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image';
// // // //         if (ext === 'pdf') return 'pdf';
// // // //         return 'file';
// // // //     };

// // // //     const handleSendFeedback = async () => {
// // // //         if (!newMessage.trim()) return;
// // // //         setSending(true);
// // // //         try {
// // // //             const feedbackItem = {
// // // //                 senderName: currentUser?.name || 'Admin',
// // // //                 role: currentUser?.role || 'ADMIN',
// // // //                 message: newMessage,
// // // //                 createdAt: new Date()
// // // //             };
// // // //             const updatedHistory = [...localHistory, feedbackItem];
// // // //             await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { feedbackHistory: updatedHistory } });
// // // //             setLocalHistory(updatedHistory);
// // // //             setNewMessage('');
// // // //         } catch (e) { alert("Gagal mengirim pesan."); } finally { setSending(false); }
// // // //     };

// // // //     const handleUploadSusulan = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //         const file = e.target.files?.[0];
// // // //         if (!file) return;
        
// // // //         // [FIX] Cek Token Sebelum Upload
// // // //         const userStr = localStorage.getItem('user');
// // // //         const token = userStr ? JSON.parse(userStr).token : null;

// // // //         if (!token) {
// // // //             alert("Sesi Anda telah habis. Silakan Logout dan Login kembali.");
// // // //             return;
// // // //         }

// // // //         setUploading(true);
// // // //         const fd = new FormData();
// // // //         fd.append('file', file);

// // // //         try {
// // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
// // // //             });

// // // //             // [FIX] Handle struktur response yang mungkin berbeda
// // // //             const resultData = response.data;
// // // //             // Cek apakah url ada di root atau di dalam object data
// // // //             const fileUrl = resultData.data?.url || resultData.url;
// // // //             const fileName = resultData.data?.originalName || resultData.originalName || file.name;

// // // //             if (fileUrl) {
// // // //                 const newDoc = { name: fileName, originalName: fileName, url: fileUrl };
// // // //                 const updatedDocs = [...localDocuments, newDoc];
                
// // // //                 const autoMsg = {
// // // //                     senderName: "System", role: "SYSTEM",
// // // //                     message: `📄 Mengunggah dokumen susulan: ${fileName}`, createdAt: new Date()
// // // //                 };
// // // //                 const newHistory = [...localHistory, autoMsg];

// // // //                 await api(`/api/courses/${course._id}`, {
// // // //                     method: 'PATCH',
// // // //                     body: { proposalDocuments: updatedDocs, feedbackHistory: newHistory }
// // // //                 });

// // // //                 setLocalDocuments(updatedDocs);
// // // //                 setLocalHistory(newHistory);
// // // //             } else {
// // // //                 throw new Error("URL File tidak ditemukan dalam respon server");
// // // //             }
// // // //         } catch (err: any) { 
// // // //             console.error(err);
// // // //             // Pesan error lebih detail
// // // //             const msg = err.response?.data?.message || err.message || "Gagal Upload";
// // // //             alert(`Gagal Upload: ${msg}. Coba login ulang.`);
// // // //         } finally {
// // // //             setUploading(false);
// // // //             e.target.value = '';
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div className="fixed inset-0 bg-black/70 z-[110] flex items-center justify-center p-4 backdrop-blur-sm animate-in zoom-in-95">
// // // //             <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
// // // //                 <div className="bg-white p-5 border-b border-gray-100 flex justify-between items-center shadow-sm z-10">
// // // //                     <div>
// // // //                         <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
// // // //                             {isReadOnly ? 'Histori Pengajuan' : 'Review & Diskusi Pengajuan'}
// // // //                             <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full uppercase border border-orange-200">
// // // //                                 {course.status}
// // // //                             </span>
// // // //                         </h2>
// // // //                     </div>
// // // //                     <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Tutup"><X size={20}/></button>
// // // //                 </div>

// // // //                 <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
// // // //                     {/* KOLOM KIRI */}
// // // //                     <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6 border-r border-gray-200">
// // // //                         <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
// // // //                             <h3 className="font-bold text-lg text-gray-800 mb-2">{course.title}</h3>
// // // //                             <div className="text-sm text-gray-600 leading-relaxed mb-4">
// // // //                                 <div dangerouslySetInnerHTML={{ __html: course.description }} />
// // // //                             </div>
// // // //                             <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
// // // //                                 <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">
// // // //                                     {course.creatorInfo?.name?.charAt(0) || 'U'}
// // // //                                 </div>
// // // //                                 <div className="text-xs">
// // // //                                     <div className="font-bold text-gray-700">{course.creatorInfo?.name}</div>
// // // //                                     <div className="text-gray-500">{course.creatorInfo?.email}</div>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>

// // // //                         <div>
// // // //                             <div className="flex justify-between items-center mb-3">
// // // //                                 <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2"><FileText size={16}/> Dokumen Pendukung ({localDocuments.length})</h4>
// // // //                                 {!isReadOnly && (
// // // //                                     <div className="relative">
// // // //                                         <input type="file" onChange={handleUploadSusulan} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload"/>
// // // //                                         <button className="flex items-center gap-1 text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
// // // //                                             {uploading ? <Loader2 size={12} className="animate-spin"/> : <Upload size={12}/>} Upload Susulan
// // // //                                         </button>
// // // //                                     </div>
// // // //                                 )}
// // // //                             </div>
                            
// // // //                             {localDocuments.length === 0 ? (
// // // //                                 <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 text-sm italic bg-white">
// // // //                                     <AlertTriangle size={20} className="mx-auto mb-2 text-gray-300"/> Belum ada dokumen.
// // // //                                 </div>
// // // //                             ) : (
// // // //                                 <div className="space-y-3">
// // // //                                     {localDocuments.map((doc: any, idx: number) => {
// // // //                                         const type = getFileType(doc.url);
// // // //                                         const displayName = doc.originalName || doc.name;
// // // //                                         const displayType = doc.originalName ? doc.name : 'Dokumen';

// // // //                                         return (
// // // //                                             <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
// // // //                                                 <div className="flex items-start gap-3">
// // // //                                                     <div className={`p-2 rounded-lg shrink-0 ${type === 'pdf' ? 'bg-red-50 text-red-600' : type === 'image' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
// // // //                                                         {type === 'image' ? <ImageIcon size={20}/> : <FileText size={20}/>}
// // // //                                                     </div>
// // // //                                                     <div className="flex-1 min-w-0">
// // // //                                                         <p className="text-sm font-bold text-gray-700 truncate" title={displayName}>{displayName}</p>
// // // //                                                         <p className="text-[10px] text-gray-400 uppercase mt-0.5">{displayType}</p>
// // // //                                                         {type === 'image' && (
// // // //                                                             <div className="mt-2 mb-2 rounded-lg overflow-hidden border border-gray-100 w-fit">
// // // //                                                                 <img src={doc.url} alt="Preview" className="h-32 w-auto object-cover"/>
// // // //                                                             </div>
// // // //                                                         )}
// // // //                                                         <div className="mt-2">
// // // //                                                             <a href={doc.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded transition-colors ${type === 'pdf' ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
// // // //                                                                 <ExternalLink size={10}/> {type === 'image' ? 'Lihat Full Size' : 'Download File'}
// // // //                                                             </a>
// // // //                                                         </div>
// // // //                                                     </div>
// // // //                                                 </div>
// // // //                                             </div>
// // // //                                         );
// // // //                                     })}
// // // //                                 </div>
// // // //                             )}
// // // //                         </div>
// // // //                     </div>

// // // //                     {/* KOLOM KANAN */}
// // // //                     <div className="w-full md:w-[350px] flex flex-col bg-white border-l border-gray-200 h-[600px] md:h-auto">
// // // //                         <div className="p-3 bg-gray-50 border-b border-gray-200 font-bold text-xs text-gray-500 uppercase tracking-wider flex items-center gap-2">
// // // //                             <MessageSquare size={14}/> Catatan & Feedback
// // // //                         </div>
// // // //                         <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
// // // //                             {localHistory.length === 0 && <div className="text-center text-gray-400 text-xs italic mt-10">Belum ada catatan.</div>}
// // // //                             {localHistory.map((msg: any, idx: number) => {
// // // //                                 const isMe = currentUser && msg.senderName === currentUser.name;
// // // //                                 const isSystem = msg.role === 'SYSTEM';
// // // //                                 if (isSystem) return <div key={idx} className="flex justify-center my-2"><span className="text-[10px] bg-gray-100 text-gray-500 px-3 py-1 rounded-full border border-gray-200">{msg.message}</span></div>;
// // // //                                 return (
// // // //                                     <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// // // //                                         <div className={`max-w-[90%] p-3 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
// // // //                                             {msg.message}
// // // //                                         </div>
// // // //                                         <span className="text-[10px] text-gray-400 mt-1 px-1">
// // // //                                             {isMe ? 'Anda' : msg.senderName} • {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
// // // //                                         </span>
// // // //                                     </div>
// // // //                                 );
// // // //                             })}
// // // //                         </div>
// // // //                         {!isReadOnly && (
// // // //                             <div className="p-3 border-t border-gray-200 bg-gray-50">
// // // //                                 <div className="flex gap-2">
// // // //                                     <input type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis catatan..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendFeedback()}/>
// // // //                                     <button onClick={handleSendFeedback} disabled={sending || !newMessage.trim()} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors" title="Kirim" aria-label="Kirim">
// // // //                                         {sending ? <Loader2 size={18} className="animate-spin"/> : <Send size={18}/>}
// // // //                                     </button>
// // // //                                 </div>
// // // //                             </div>
// // // //                         )}
// // // //                     </div>
// // // //                 </div>

// // // //                 <div className="p-4 border-t bg-white flex justify-end gap-3 shrink-0">
// // // //                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors">Tutup</button>
// // // //                     {!isReadOnly && isAdminOrSuper && (
// // // //                         <>
// // // //                             <button onClick={() => onReject(course)} className="px-5 py-2.5 rounded-xl border border-yellow-200 text-yellow-700 font-bold text-sm hover:bg-yellow-50 flex items-center gap-2">
// // // //                                 <Undo2 size={18}/> Kembalikan
// // // //                             </button>
// // // //                             <button onClick={() => onApprove(course)} className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 shadow-lg flex items-center gap-2">
// // // //                                 <CheckCircle size={18}/> Setujui
// // // //                             </button>
// // // //                         </>
// // // //                     )}
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }



// // // 'use client';

// // // import { useState, useRef, useEffect } from 'react';
// // // import { X, FileText, CheckCircle, Undo2, MessageSquare, Loader2, Image as ImageIcon, Send, ExternalLink, AlertTriangle, Upload } from 'lucide-react';
// // // import { api } from '@/lib/api'; 
// // // import axios from 'axios';

// // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // interface CourseProposalDetailModalProps {
// // //     course: any;
// // //     onClose: () => void;
// // //     onApprove: (course: any) => void;
// // //     onReject: (course: any) => void; 
// // //     currentUser: any;
// // //     refreshData?: () => void;
// // //     isReadOnly?: boolean;
// // // }

// // // export default function CourseProposalDetailModal({ 
// // //     course, onClose, onApprove, onReject, currentUser, refreshData, isReadOnly = false 
// // // }: CourseProposalDetailModalProps) {
// // //     const [newMessage, setNewMessage] = useState('');
// // //     const [sending, setSending] = useState(false);
// // //     const [uploading, setUploading] = useState(false);
    
// // //     const [localDocuments, setLocalDocuments] = useState(course.proposalDocuments || []);
// // //     const [localHistory, setLocalHistory] = useState(course.feedbackHistory || []);

// // //     const chatContainerRef = useRef<HTMLDivElement>(null);

// // //     useEffect(() => {
// // //         if (chatContainerRef.current) {
// // //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // //         }
// // //     }, [localHistory]);

// // //     if (!course) return null;

// // //     const isAdminOrSuper = currentUser && ['ADMIN', 'SUPER_ADMIN'].includes(currentUser.role);

// // //     const getFileType = (url: string) => {
// // //         const ext = url.split('.').pop()?.toLowerCase();
// // //         if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image';
// // //         if (ext === 'pdf') return 'pdf';
// // //         return 'file';
// // //     };

// // //     const handleSendFeedback = async () => {
// // //         if (!newMessage.trim()) return;
// // //         setSending(true);
// // //         try {
// // //             const feedbackItem = {
// // //                 senderName: currentUser?.name || 'Admin',
// // //                 role: currentUser?.role || 'ADMIN',
// // //                 message: newMessage,
// // //                 createdAt: new Date()
// // //             };
// // //             const updatedHistory = [...localHistory, feedbackItem];
// // //             await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { feedbackHistory: updatedHistory } });
// // //             setLocalHistory(updatedHistory);
// // //             setNewMessage('');
// // //         } catch (e) { alert("Gagal mengirim pesan."); } finally { setSending(false); }
// // //     };

// // //     const handleUploadSusulan = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // //         const file = e.target.files?.[0];
// // //         if (!file) return;
        
// // //         const userStr = localStorage.getItem('user');
// // //         const token = userStr ? JSON.parse(userStr).token : null;
// // //         if (!token) { alert("Sesi habis."); return; }

// // //         setUploading(true);
// // //         const fd = new FormData();
// // //         fd.append('file', file);

// // //         try {
// // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
// // //             });
// // //             const resultData = response.data;
// // //             const fileUrl = resultData.data?.url || resultData.url;
// // //             const fileName = resultData.data?.originalName || resultData.originalName || file.name;

// // //             if (fileUrl) {
// // //                 const newDoc = { name: fileName, originalName: fileName, url: fileUrl };
// // //                 const updatedDocs = [...localDocuments, newDoc];
// // //                 const autoMsg = {
// // //                     senderName: "System", role: "SYSTEM", message: `📄 Upload susulan: ${fileName}`, createdAt: new Date()
// // //                 };
// // //                 const newHistory = [...localHistory, autoMsg];
// // //                 await api(`/api/courses/${course._id}`, {
// // //                     method: 'PATCH', body: { proposalDocuments: updatedDocs, feedbackHistory: newHistory }
// // //                 });
// // //                 setLocalDocuments(updatedDocs);
// // //                 setLocalHistory(newHistory);
// // //             }
// // //         } catch (err: any) { console.error(err); alert("Gagal Upload"); } finally { setUploading(false); e.target.value = ''; }
// // //     };

// // //     return (
// // //         /* KEMBALI KE DEFAULT: Kita hapus manual positioning (items-start, pt-20) 
// // //            karena sekarang globals.css yang akan menanganinya via z-[110] */
// // //         <div className="fixed inset-0 bg-black/70 z-[110] flex justify-center items-center p-4 backdrop-blur-sm animate-in zoom-in-95">
            
// // //             {/* Max-width kita kunci di 4xl agar tetap compact sesuai request terakhir */}
// // //             <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-gray-100">
                
// // //                 <div className="bg-white px-5 py-4 border-b border-gray-100 flex justify-between items-center shadow-sm z-10 shrink-0">
// // //                     <div>
// // //                         <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
// // //                             {isReadOnly ? 'Histori Pengajuan' : 'Review & Diskusi'}
// // //                             <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full uppercase border border-orange-200 tracking-wide font-bold">
// // //                                 {course.status}
// // //                             </span>
// // //                         </h2>
// // //                     </div>
// // //                     <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Tutup"><X size={18}/></button>
// // //                 </div>

// // //                 <div className="flex-1 overflow-hidden flex flex-col md:flex-row min-h-0">
// // //                     {/* KOLOM KIRI */}
// // //                     <div className="flex-1 overflow-y-auto p-5 bg-gray-50 space-y-5 border-r border-gray-200">
// // //                         <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
// // //                             <h3 className="font-bold text-base text-gray-800 mb-2">{course.title}</h3>
// // //                             <div className="text-xs text-gray-600 leading-relaxed mb-3">
// // //                                 <div dangerouslySetInnerHTML={{ __html: course.description }} />
// // //                             </div>
// // //                             <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
// // //                                 <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-[10px] font-bold">
// // //                                     {course.creatorInfo?.name?.charAt(0) || 'U'}
// // //                                 </div>
// // //                                 <div className="text-[10px]">
// // //                                     <div className="font-bold text-gray-700">{course.creatorInfo?.name}</div>
// // //                                     <div className="text-gray-500">{course.creatorInfo?.email}</div>
// // //                                 </div>
// // //                             </div>
// // //                         </div>

// // //                         <div>
// // //                             <div className="flex justify-between items-center mb-3">
// // //                                 <h4 className="text-xs font-bold text-gray-700 flex items-center gap-2"><FileText size={14}/> Dokumen ({localDocuments.length})</h4>
// // //                                 {!isReadOnly && (
// // //                                     <div className="relative">
// // //                                         <input type="file" onChange={handleUploadSusulan} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload"/>
// // //                                         <button className="flex items-center gap-1 text-[10px] font-bold bg-white text-blue-600 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm">
// // //                                             {uploading ? <Loader2 size={12} className="animate-spin"/> : <Upload size={12}/>} Susulan
// // //                                         </button>
// // //                                     </div>
// // //                                 )}
// // //                             </div>
                            
// // //                             {localDocuments.length === 0 ? (
// // //                                 <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 text-xs italic bg-white">
// // //                                     <AlertTriangle size={16} className="mx-auto mb-1 text-gray-300"/> Belum ada dokumen.
// // //                                 </div>
// // //                             ) : (
// // //                                 <div className="space-y-2">
// // //                                     {localDocuments.map((doc: any, idx: number) => {
// // //                                         const type = getFileType(doc.url);
// // //                                         const displayName = doc.originalName || doc.name;
// // //                                         return (
// // //                                             <div key={idx} className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
// // //                                                 <div className="flex items-start gap-3">
// // //                                                     <div className={`p-1.5 rounded-md shrink-0 ${type === 'pdf' ? 'bg-red-50 text-red-600' : type === 'image' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
// // //                                                         {type === 'image' ? <ImageIcon size={16}/> : <FileText size={16}/>}
// // //                                                     </div>
// // //                                                     <div className="flex-1 min-w-0">
// // //                                                         <p className="text-xs font-bold text-gray-700 truncate" title={displayName}>{displayName}</p>
// // //                                                         <div className="mt-2">
// // //                                                             <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:underline flex items-center gap-1"><ExternalLink size={10}/> Buka File</a>
// // //                                                         </div>
// // //                                                     </div>
// // //                                                 </div>
// // //                                             </div>
// // //                                         );
// // //                                     })}
// // //                                 </div>
// // //                             )}
// // //                         </div>
// // //                     </div>

// // //                     {/* KOLOM KANAN */}
// // //                     <div className="w-full md:w-[320px] flex flex-col bg-white border-l border-gray-200 h-[400px] md:h-auto min-h-0">
// // //                         <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-bold text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-2 shrink-0">
// // //                             <MessageSquare size={12}/> Diskusi
// // //                         </div>
// // //                         <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
// // //                             {localHistory.length === 0 && <div className="text-center text-gray-400 text-[10px] italic mt-10">Belum ada catatan.</div>}
// // //                             {localHistory.map((msg: any, idx: number) => {
// // //                                 const isMe = currentUser && msg.senderName === currentUser.name;
// // //                                 const isSystem = msg.role === 'SYSTEM';
// // //                                 if (isSystem) return <div key={idx} className="flex justify-center my-2"><span className="text-[9px] bg-gray-50 text-gray-400 px-2 py-0.5 rounded-full border border-gray-100">{msg.message}</span></div>;
// // //                                 return (
// // //                                     <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// // //                                         <div className={`max-w-[90%] px-3 py-2 rounded-2xl text-xs shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
// // //                                             {msg.message}
// // //                                         </div>
// // //                                         <span className="text-[9px] text-gray-300 mt-0.5 px-1">
// // //                                             {isMe ? 'Anda' : msg.senderName} • {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
// // //                                         </span>
// // //                                     </div>
// // //                                 );
// // //                             })}
// // //                         </div>
// // //                         {!isReadOnly && (
// // //                             <div className="p-3 border-t border-gray-200 bg-gray-50 shrink-0">
// // //                                 <div className="flex gap-2">
// // //                                     <input type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendFeedback()}/>
// // //                                     <button onClick={handleSendFeedback} disabled={sending || !newMessage.trim()} className="bg-blue-600 text-white p-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
// // //                                         {sending ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>}
// // //                                     </button>
// // //                                 </div>
// // //                             </div>
// // //                         )}
// // //                     </div>
// // //                 </div>

// // //                 <div className="px-5 py-4 border-t bg-white flex justify-end gap-3 shrink-0">
// // //                     <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors">Tutup</button>
// // //                     {!isReadOnly && isAdminOrSuper && (
// // //                         <>
// // //                             <button onClick={() => onReject(course)} className="px-4 py-2 rounded-lg border border-yellow-200 text-yellow-700 font-bold text-xs hover:bg-yellow-50 flex items-center gap-2"><Undo2 size={14}/> Kembalikan</button>
// // //                             <button onClick={() => onApprove(course)} className="px-5 py-2 rounded-lg bg-green-600 text-white font-bold text-xs hover:bg-green-700 shadow-sm flex items-center gap-2"><CheckCircle size={14}/> Setujui</button>
// // //                         </>
// // //                     )}
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }


// // 'use client';

// // import { useState, useRef, useEffect } from 'react';
// // import { X, FileText, CheckCircle, Undo2, MessageSquare, Loader2, Image as ImageIcon, Send, ExternalLink, AlertTriangle, Upload } from 'lucide-react';
// // import { api } from '@/lib/api'; 
// // import axios from 'axios';

// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // interface CourseProposalDetailModalProps {
// //     course: any;
// //     onClose: () => void;
// //     onApprove: (course: any) => void;
// //     onReject: (course: any) => void; 
// //     currentUser: any;
// //     refreshData?: () => void;
// //     isReadOnly?: boolean;
// // }

// // export default function CourseProposalDetailModal({ 
// //     course, onClose, onApprove, onReject, currentUser, refreshData, isReadOnly = false 
// // }: CourseProposalDetailModalProps) {
// //     const [newMessage, setNewMessage] = useState('');
// //     const [sending, setSending] = useState(false);
// //     const [uploading, setUploading] = useState(false);
    
// //     const [localDocuments, setLocalDocuments] = useState(course.proposalDocuments || []);
// //     const [localHistory, setLocalHistory] = useState(course.feedbackHistory || []);

// //     const chatContainerRef = useRef<HTMLDivElement>(null);

// //     // [SCROLL LOCK - FINAL SOLUTION]
// //     // Ini adalah standar industri untuk mematikan scroll layar belakang secara total.
// //     useEffect(() => {
// //         // 1. Saat modal muncul: Bekukan body
// //         document.body.style.overflow = 'hidden';
        
// //         // 2. Saat modal hilang (unmount): Cairkan kembali
// //         return () => {
// //             document.body.style.overflow = 'unset';
// //         };
// //     }, []);

// //     useEffect(() => {
// //         if (chatContainerRef.current) {
// //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// //         }
// //     }, [localHistory]);

// //     if (!course) return null;

// //     const isAdminOrSuper = currentUser && ['ADMIN', 'SUPER_ADMIN'].includes(currentUser.role);

// //     const getFileType = (url: string) => {
// //         const ext = url.split('.').pop()?.toLowerCase();
// //         if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image';
// //         if (ext === 'pdf') return 'pdf';
// //         return 'file';
// //     };

// //     const handleSendFeedback = async () => {
// //         if (!newMessage.trim()) return;
// //         setSending(true);
// //         try {
// //             const feedbackItem = {
// //                 senderName: currentUser?.name || 'Admin',
// //                 role: currentUser?.role || 'ADMIN',
// //                 message: newMessage,
// //                 createdAt: new Date()
// //             };
// //             const updatedHistory = [...localHistory, feedbackItem];
// //             await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { feedbackHistory: updatedHistory } });
// //             setLocalHistory(updatedHistory);
// //             setNewMessage('');
// //         } catch (e) { alert("Gagal mengirim pesan."); } finally { setSending(false); }
// //     };

// //     const handleUploadSusulan = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const file = e.target.files?.[0];
// //         if (!file) return;
        
// //         const userStr = localStorage.getItem('user');
// //         const token = userStr ? JSON.parse(userStr).token : null;
// //         if (!token) { alert("Sesi habis."); return; }

// //         setUploading(true);
// //         const fd = new FormData();
// //         fd.append('file', file);

// //         try {
// //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
// //             });
// //             const resultData = response.data;
// //             const fileUrl = resultData.data?.url || resultData.url;
// //             const fileName = resultData.data?.originalName || resultData.originalName || file.name;

// //             if (fileUrl) {
// //                 const newDoc = { name: fileName, originalName: fileName, url: fileUrl };
// //                 const updatedDocs = [...localDocuments, newDoc];
// //                 const autoMsg = {
// //                     senderName: "System", role: "SYSTEM", message: `📄 Upload susulan: ${fileName}`, createdAt: new Date()
// //                 };
// //                 const newHistory = [...localHistory, autoMsg];
// //                 await api(`/api/courses/${course._id}`, {
// //                     method: 'PATCH', body: { proposalDocuments: updatedDocs, feedbackHistory: newHistory }
// //                 });
// //                 setLocalDocuments(updatedDocs);
// //                 setLocalHistory(newHistory);
// //             }
// //         } catch (err: any) { console.error(err); alert("Gagal Upload"); } finally { setUploading(false); e.target.value = ''; }
// //     };

// //     return (
// //         <div className="fixed inset-0 bg-black/70 z-[110] flex justify-center items-center p-4 backdrop-blur-sm animate-in zoom-in-95">
// //             <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-gray-100">
// //                 <div className="bg-white px-5 py-4 border-b border-gray-100 flex justify-between items-center shadow-sm z-10 shrink-0">
// //                     <div>
// //                         <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
// //                             {isReadOnly ? 'Histori Pengajuan' : 'Review & Diskusi'}
// //                             <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full uppercase border border-orange-200 tracking-wide font-bold">
// //                                 {course.status}
// //                             </span>
// //                         </h2>
// //                     </div>
// //                     <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Tutup"><X size={18}/></button>
// //                 </div>

// //                 <div className="flex-1 overflow-hidden flex flex-col md:flex-row min-h-0">
// //                     {/* KOLOM KIRI */}
// //                     <div className="flex-1 overflow-y-auto p-5 bg-gray-50 space-y-5 border-r border-gray-200">
// //                         <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
// //                             <h3 className="font-bold text-base text-gray-800 mb-2">{course.title}</h3>
// //                             <div className="text-xs text-gray-600 leading-relaxed mb-3">
// //                                 <div dangerouslySetInnerHTML={{ __html: course.description }} />
// //                             </div>
// //                             <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
// //                                 <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-[10px] font-bold">
// //                                     {course.creatorInfo?.name?.charAt(0) || 'U'}
// //                                 </div>
// //                                 <div className="text-[10px]">
// //                                     <div className="font-bold text-gray-700">{course.creatorInfo?.name}</div>
// //                                     <div className="text-gray-500">{course.creatorInfo?.email}</div>
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         <div>
// //                             <div className="flex justify-between items-center mb-3">
// //                                 <h4 className="text-xs font-bold text-gray-700 flex items-center gap-2"><FileText size={14}/> Dokumen ({localDocuments.length})</h4>
// //                                 {!isReadOnly && (
// //                                     <div className="relative">
// //                                         <input type="file" onChange={handleUploadSusulan} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload"/>
// //                                         <button className="flex items-center gap-1 text-[10px] font-bold bg-white text-blue-600 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm">
// //                                             {uploading ? <Loader2 size={12} className="animate-spin"/> : <Upload size={12}/>} Susulan
// //                                         </button>
// //                                     </div>
// //                                 )}
// //                             </div>
                            
// //                             {localDocuments.length === 0 ? (
// //                                 <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 text-xs italic bg-white">
// //                                     <AlertTriangle size={16} className="mx-auto mb-1 text-gray-300"/> Belum ada dokumen.
// //                                 </div>
// //                             ) : (
// //                                 <div className="space-y-2">
// //                                     {localDocuments.map((doc: any, idx: number) => {
// //                                         const type = getFileType(doc.url);
// //                                         const displayName = doc.originalName || doc.name;
// //                                         return (
// //                                             <div key={idx} className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
// //                                                 <div className="flex items-start gap-3">
// //                                                     <div className={`p-1.5 rounded-md shrink-0 ${type === 'pdf' ? 'bg-red-50 text-red-600' : type === 'image' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
// //                                                         {type === 'image' ? <ImageIcon size={16}/> : <FileText size={16}/>}
// //                                                     </div>
// //                                                     <div className="flex-1 min-w-0">
// //                                                         <p className="text-xs font-bold text-gray-700 truncate" title={displayName}>{displayName}</p>
// //                                                         <div className="mt-2">
// //                                                             <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:underline flex items-center gap-1"><ExternalLink size={10}/> Buka File</a>
// //                                                         </div>
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                         );
// //                                     })}
// //                                 </div>
// //                             )}
// //                         </div>
// //                     </div>

// //                     {/* KOLOM KANAN */}
// //                     <div className="w-full md:w-[320px] flex flex-col bg-white border-l border-gray-200 h-[400px] md:h-auto min-h-0">
// //                         <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-bold text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-2 shrink-0">
// //                             <MessageSquare size={12}/> Diskusi
// //                         </div>
// //                         <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
// //                             {localHistory.length === 0 && <div className="text-center text-gray-400 text-[10px] italic mt-10">Belum ada catatan.</div>}
// //                             {localHistory.map((msg: any, idx: number) => {
// //                                 const isMe = currentUser && msg.senderName === currentUser.name;
// //                                 const isSystem = msg.role === 'SYSTEM';
// //                                 if (isSystem) return <div key={idx} className="flex justify-center my-2"><span className="text-[9px] bg-gray-50 text-gray-400 px-2 py-0.5 rounded-full border border-gray-100">{msg.message}</span></div>;
// //                                 return (
// //                                     <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// //                                         <div className={`max-w-[90%] px-3 py-2 rounded-2xl text-xs shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
// //                                             {msg.message}
// //                                         </div>
// //                                         <span className="text-[9px] text-gray-300 mt-0.5 px-1">
// //                                             {isMe ? 'Anda' : msg.senderName} • {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
// //                                         </span>
// //                                     </div>
// //                                 );
// //                             })}
// //                         </div>
// //                         {!isReadOnly && (
// //                             <div className="p-3 border-t border-gray-200 bg-gray-50 shrink-0">
// //                                 <div className="flex gap-2">
// //                                     <input type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendFeedback()}/>
// //                                     <button onClick={handleSendFeedback} disabled={sending || !newMessage.trim()} className="bg-blue-600 text-white p-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
// //                                         {sending ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>}
// //                                     </button>
// //                                 </div>
// //                             </div>
// //                         )}
// //                     </div>
// //                 </div>

// //                 <div className="px-5 py-4 border-t bg-white flex justify-end gap-3 shrink-0">
// //                     <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors">Tutup</button>
// //                     {!isReadOnly && isAdminOrSuper && (
// //                         <>
// //                             <button onClick={() => onReject(course)} className="px-4 py-2 rounded-lg border border-yellow-200 text-yellow-700 font-bold text-xs hover:bg-yellow-50 flex items-center gap-2"><Undo2 size={14}/> Kembalikan</button>
// //                             <button onClick={() => onApprove(course)} className="px-5 py-2 rounded-lg bg-green-600 text-white font-bold text-xs hover:bg-green-700 shadow-sm flex items-center gap-2"><CheckCircle size={14}/> Setujui</button>
// //                         </>
// //                     )}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }


// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { FileText, CheckCircle, Undo2, MessageSquare, Loader2, Image as ImageIcon, Send, ExternalLink, AlertTriangle, Upload } from 'lucide-react';
// import { api } from '@/lib/api'; 
// import axios from 'axios';
// import BaseModal from '@/components/ui/BaseModal';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// interface CourseProposalDetailModalProps {
//     course: any;
//     onClose: () => void;
//     onApprove: (course: any) => void;
//     onReject: (course: any) => void; 
//     currentUser: any;
//     refreshData?: () => void;
//     isReadOnly?: boolean;
// }

// export default function CourseProposalDetailModal({ 
//     course, onClose, onApprove, onReject, currentUser, refreshData, isReadOnly = false 
// }: CourseProposalDetailModalProps) {
//     const [newMessage, setNewMessage] = useState('');
//     const [sending, setSending] = useState(false);
//     const [uploading, setUploading] = useState(false);
    
//     const [localDocuments, setLocalDocuments] = useState(course.proposalDocuments || []);
//     const [localHistory, setLocalHistory] = useState(course.feedbackHistory || []);

//     const chatContainerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (chatContainerRef.current) {
//             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//         }
//     }, [localHistory]);

//     if (!course) return null;

//     const isAdminOrSuper = currentUser && ['ADMIN', 'SUPER_ADMIN'].includes(currentUser.role);

//     const getFileType = (url: string) => {
//         const ext = url.split('.').pop()?.toLowerCase();
//         if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image';
//         if (ext === 'pdf') return 'pdf';
//         return 'file';
//     };

//     const handleSendFeedback = async () => {
//         if (!newMessage.trim()) return;
//         setSending(true);
//         try {
//             const feedbackItem = {
//                 senderName: currentUser?.name || 'Admin',
//                 role: currentUser?.role || 'ADMIN',
//                 message: newMessage,
//                 createdAt: new Date()
//             };
//             const updatedHistory = [...localHistory, feedbackItem];
//             await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { feedbackHistory: updatedHistory } });
//             setLocalHistory(updatedHistory);
//             setNewMessage('');
//         } catch (e) { alert("Gagal mengirim pesan."); } finally { setSending(false); }
//     };

//     const handleUploadSusulan = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;
        
//         const userStr = localStorage.getItem('user');
//         const token = userStr ? JSON.parse(userStr).token : null;
//         if (!token) { alert("Sesi habis."); return; }

//         setUploading(true);
//         const fd = new FormData();
//         fd.append('file', file);

//         try {
//             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
//                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
//             });
//             const resultData = response.data;
//             const fileUrl = resultData.data?.url || resultData.url;
//             const fileName = resultData.data?.originalName || resultData.originalName || file.name;

//             if (fileUrl) {
//                 const newDoc = { name: fileName, originalName: fileName, url: fileUrl };
//                 const updatedDocs = [...localDocuments, newDoc];
//                 const autoMsg = {
//                     senderName: "System", role: "SYSTEM", message: `📄 Upload susulan: ${fileName}`, createdAt: new Date()
//                 };
//                 const newHistory = [...localHistory, autoMsg];
//                 await api(`/api/courses/${course._id}`, {
//                     method: 'PATCH', body: { proposalDocuments: updatedDocs, feedbackHistory: newHistory }
//                 });
//                 setLocalDocuments(updatedDocs);
//                 setLocalHistory(newHistory);
//             }
//         } catch (err: any) { console.error(err); alert("Gagal Upload"); } finally { setUploading(false); e.target.value = ''; }
//     };

//     const footerButtons = (
//         <>
//             <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors">Tutup</button>
//             {!isReadOnly && isAdminOrSuper && (
//                 <>
//                     <button onClick={() => onReject(course)} className="px-4 py-2 rounded-lg border border-yellow-200 text-yellow-700 font-bold text-xs hover:bg-yellow-50 flex items-center gap-2"><Undo2 size={14}/> Kembalikan</button>
//                     <button onClick={() => onApprove(course)} className="px-5 py-2 rounded-lg bg-green-600 text-white font-bold text-xs hover:bg-green-700 shadow-sm flex items-center gap-2"><CheckCircle size={14}/> Setujui</button>
//                 </>
//             )}
//         </>
//     );

//     return (
//         <BaseModal
//             isOpen={true}
//             onClose={onClose}
//             title={isReadOnly ? 'Histori Pengajuan' : 'Review & Diskusi'}
//             subTitle={course.status}
//             size="2xl" // Lebih kecil dari form edit agar fokus
//             footer={footerButtons}
//         >
//             <div className="flex flex-col md:flex-row min-h-0 bg-gray-50 h-[500px] -m-6">
                
//                 {/* KOLOM KIRI (Info & Dokumen) */}
//                 <div className="flex-1 overflow-y-auto p-5 space-y-5 border-r border-gray-200 custom-scrollbar">
//                     <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//                         <h3 className="font-bold text-base text-gray-800 mb-2">{course.title}</h3>
//                         <div className="text-xs text-gray-600 leading-relaxed mb-3">
//                             <div dangerouslySetInnerHTML={{ __html: course.description }} />
//                         </div>
//                         <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
//                             <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-[10px] font-bold">
//                                 {course.creatorInfo?.name?.charAt(0) || 'U'}
//                             </div>
//                             <div className="text-[10px]">
//                                 <div className="font-bold text-gray-700">{course.creatorInfo?.name}</div>
//                                 <div className="text-gray-500">{course.creatorInfo?.email}</div>
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <div className="flex justify-between items-center mb-3">
//                             <h4 className="text-xs font-bold text-gray-700 flex items-center gap-2"><FileText size={14}/> Dokumen ({localDocuments.length})</h4>
                            
//                             {/* [FITUR SUSULAN DIKEMBALIKAN] */}
//                             {!isReadOnly && (
//                                 <div className="relative">
//                                     <input type="file" onChange={handleUploadSusulan} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload" aria-label="Upload Susulan"/>
//                                     <button className="flex items-center gap-1 text-[10px] font-bold bg-white text-blue-600 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm">
//                                         {uploading ? <Loader2 size={12} className="animate-spin"/> : <Upload size={12}/>} Susulan
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
                        
//                         {localDocuments.length === 0 ? (
//                             <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 text-xs italic bg-white">
//                                 <AlertTriangle size={16} className="mx-auto mb-1 text-gray-300"/> Belum ada dokumen.
//                             </div>
//                         ) : (
//                             <div className="space-y-2">
//                                 {localDocuments.map((doc: any, idx: number) => {
//                                     const type = getFileType(doc.url);
//                                     const displayName = doc.originalName || doc.name;
//                                     return (
//                                         <div key={idx} className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
//                                             <div className="flex items-start gap-3">
//                                                 <div className={`p-1.5 rounded-md shrink-0 ${type === 'pdf' ? 'bg-red-50 text-red-600' : type === 'image' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
//                                                     {type === 'image' ? <ImageIcon size={16}/> : <FileText size={16}/>}
//                                                 </div>
//                                                 <div className="flex-1 min-w-0">
//                                                     <p className="text-xs font-bold text-gray-700 truncate" title={displayName}>{displayName}</p>
//                                                     <div className="mt-2">
//                                                         <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:underline flex items-center gap-1"><ExternalLink size={10}/> Buka File</a>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* KOLOM KANAN (Chat / Diskusi) */}
//                 <div className="w-full md:w-[350px] flex flex-col bg-white border-l border-gray-200 h-full min-h-0">
//                     <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-bold text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-2 shrink-0">
//                         <MessageSquare size={12}/> Diskusi
//                     </div>
//                     <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-white custom-scrollbar">
//                         {localHistory.length === 0 && <div className="text-center text-gray-400 text-[10px] italic mt-10">Belum ada catatan.</div>}
//                         {localHistory.map((msg: any, idx: number) => {
//                             const isMe = currentUser && msg.senderName === currentUser.name;
//                             const isSystem = msg.role === 'SYSTEM';
//                             if (isSystem) return <div key={idx} className="flex justify-center my-2"><span className="text-[9px] bg-gray-50 text-gray-400 px-2 py-0.5 rounded-full border border-gray-100">{msg.message}</span></div>;
//                             return (
//                                 <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
//                                     <div className={`max-w-[90%] px-3 py-2 rounded-2xl text-xs shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
//                                         {msg.message}
//                                     </div>
//                                     <span className="text-[9px] text-gray-300 mt-0.5 px-1">
//                                         {isMe ? 'Anda' : msg.senderName} • {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                                     </span>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                     {!isReadOnly && (
//                         <div className="p-3 border-t border-gray-200 bg-gray-50 shrink-0">
//                             <div className="flex gap-2">
//                                 <input type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendFeedback()}/>
//                                 <button onClick={handleSendFeedback} disabled={sending || !newMessage.trim()} className="bg-blue-600 text-white p-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
//                                     {sending ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>}
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </BaseModal>
//     );
// }


'use client';

import { useState, useRef, useEffect } from 'react';
import { FileText, CheckCircle, Undo2, MessageSquare, Loader2, Image as ImageIcon, Send, Upload } from 'lucide-react';
import { api } from '@/lib/api';
import axios from 'axios';
import BaseModal from '@/components/ui/BaseModal';

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
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [localDocuments, setLocalDocuments] = useState(course.proposalDocuments || []);
    const [localHistory, setLocalHistory] = useState(course.feedbackHistory || []);

    const chatContainerRef = useRef<HTMLDivElement>(null);
    // Ensure accurate role check matching your DB
    const isAdminOrSuper = currentUser && ['ADMIN', 'SUPER_ADMIN'].includes(currentUser.role);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [localHistory]);

    if (!course) return null;

    // --- HANDLE SEND MESSAGE ---
    const handleSendFeedback = async () => {
        if (!newMessage.trim()) return;
        setSending(true);
        try {
            // 1. Save Chat to Course DB
            const feedbackItem = {
                senderName: currentUser?.name || 'User',
                role: currentUser?.role || 'USER',
                message: newMessage,
                createdAt: new Date()
            };
            const updatedHistory = [...localHistory, feedbackItem];

            await api(`/api/courses/${course._id}`, {
                method: 'PATCH',
                body: { feedbackHistory: updatedHistory }
            });

            // 2. Send Notification
            // STRICTLY use this URL format for proposals
            const correctTargetUrl = `/admin/courses?highlight=${course._id}`;

            if (isAdminOrSuper) {
                // Admin sends -> Notify Facilitator (User)
                if (course.creatorInfo?._id || course.creatorInfo?.id) {
                    await api('/api/notifications', {
                        method: 'POST',
                        body: {
                            recipient: course.creatorInfo._id || course.creatorInfo.id,
                            type: 'reply', // Keep type as 'reply'
                            message: `💬 Admin membalas di "${course.title}": ${newMessage.substring(0, 30)}...`,
                            targetUrl: correctTargetUrl, // <--- CRITICAL FIX
                            topic: course._id
                        }
                    });
                }
            } else {
                // Facilitator sends -> Notify All Admins
                await api('/api/notifications', {
                    method: 'POST',
                    body: {
                        roleTarget: 'ADMIN',
                        type: 'reply',
                        message: `💬 ${currentUser?.name} membalas di "${course.title}": ${newMessage.substring(0, 30)}...`,
                        targetUrl: correctTargetUrl, // <--- CRITICAL FIX
                        topic: course._id
                    }
                });
            }

            setLocalHistory(updatedHistory);
            setNewMessage('');
        } catch (e) {
            alert("Gagal kirim pesan.");
        } finally {
            setSending(false);
        }
    };

    // --- HANDLE UPLOAD SUSULAN ---
    const handleUploadSusulan = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const userStr = localStorage.getItem('user'); const token = userStr ? JSON.parse(userStr).token : null;
        setUploading(true); const fd = new FormData(); fd.append('file', file);
        try {
            const res = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` } });
            const fileUrl = res.data?.data?.url || res.data?.url; const fileName = res.data?.data?.originalName || file.name;
            if (fileUrl) {
                const newDoc = { name: fileName, originalName: fileName, url: fileUrl };
                const updatedDocs = [...localDocuments, newDoc];
                const autoMsg = { senderName: "System", role: "SYSTEM", message: `📄 Upload susulan: ${fileName}`, createdAt: new Date() };
                const newHistory = [...localHistory, autoMsg];
                await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { proposalDocuments: updatedDocs, feedbackHistory: newHistory } });
                setLocalDocuments(updatedDocs); setLocalHistory(newHistory);

                // Notify Admin on upload
                if (!isAdminOrSuper) {
                    await api('/api/notifications', {
                        method: 'POST',
                        body: {
                            roleTarget: 'ADMIN',
                            type: 'reply',
                            message: `📄 ${currentUser?.name} mengupload dokumen susulan di "${course.title}".`,
                            targetUrl: `/admin/courses?highlight=${course._id}`,
                            topic: course._id
                        }
                    });
                }
            }
        } catch (e) { alert("Gagal upload"); } finally { setUploading(false); e.target.value = ''; }
    };

    const footerButtons = (
        <>
            <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors">Tutup</button>
            {!isReadOnly && isAdminOrSuper && (
                <>
                    <button onClick={() => onReject(course)} className="px-4 py-2 rounded-lg border border-yellow-200 text-yellow-700 font-bold text-xs hover:bg-yellow-50 flex items-center gap-2"><Undo2 size={14}/> Kembalikan</button>
                    <button onClick={() => onApprove(course)} className="px-5 py-2 rounded-lg bg-green-600 text-white font-bold text-xs hover:bg-green-700 shadow-sm flex items-center gap-2"><CheckCircle size={14}/> Setujui</button>
                </>
            )}
        </>
    );

    return (
        <BaseModal isOpen={true} onClose={onClose} title={isReadOnly ? 'Histori Pengajuan' : 'Review & Diskusi'} subTitle={course.status} size="2xl" footer={footerButtons}>
            <div className="flex flex-col md:flex-row min-h-0 bg-gray-50 h-[500px] -m-6">
                {/* LEFT SIDE */}
                <div className="flex-1 overflow-y-auto p-5 space-y-5 border-r border-gray-200 custom-scrollbar">
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-base text-gray-800 mb-2">{course.title}</h3>
                        <div className="text-xs text-gray-600 leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: course.description }} />
                        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-[10px] font-bold">{course.creatorInfo?.name?.charAt(0) || 'U'}</div>
                            <div className="text-[10px]"><div className="font-bold text-gray-700">{course.creatorInfo?.name}</div><div className="text-gray-500">{course.creatorInfo?.email}</div></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="text-xs font-bold text-gray-700 flex items-center gap-2"><FileText size={14}/> Dokumen ({localDocuments.length})</h4>
                            {!isReadOnly && (<div className="relative"><input type="file" onChange={handleUploadSusulan} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload"/><button className="flex items-center gap-1 text-[10px] font-bold bg-white text-blue-600 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm">{uploading ? <Loader2 size={12} className="animate-spin"/> : <Upload size={12}/>} Susulan</button></div>)}
                        </div>
                        <div className="space-y-2">
                            {localDocuments.map((doc: any, idx: number) => (
                                <div key={idx} className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm flex items-center gap-3"><div className="p-1.5 bg-blue-50 text-blue-600 rounded"><FileText size={16}/></div><div className="flex-1 min-w-0"><p className="text-xs font-bold text-gray-700 truncate">{doc.originalName || doc.name}</p><a href={doc.url} target="_blank" className="text-[10px] text-blue-600 hover:underline">Buka File</a></div></div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* RIGHT SIDE */}
                <div className="w-full md:w-[350px] flex flex-col bg-white border-l border-gray-200 h-full min-h-0">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-bold text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-2 shrink-0"><MessageSquare size={12}/> Diskusi</div>
                    <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-white custom-scrollbar">
                        {localHistory.map((msg: any, idx: number) => (
                            <div key={idx} className={`flex flex-col ${currentUser && msg.senderName === currentUser.name ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[90%] px-3 py-2 rounded-2xl text-xs shadow-sm ${msg.role === 'SYSTEM' ? 'bg-gray-50 text-gray-500 mx-auto rounded-full border' : currentUser && msg.senderName === currentUser.name ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>{msg.message}</div>
                                {msg.role !== 'SYSTEM' && <span className="text-[9px] text-gray-300 mt-0.5 px-1">{msg.senderName}</span>}
                            </div>
                        ))}
                    </div>
                    {!isReadOnly && <div className="p-3 border-t border-gray-200 bg-gray-50 shrink-0"><div className="flex gap-2"><input type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendFeedback()}/><button onClick={handleSendFeedback} disabled={sending || !newMessage.trim()} className="bg-blue-600 text-white p-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">{sending ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>}</button></div></div>}
                </div>
            </div>
        </BaseModal>
    );
}
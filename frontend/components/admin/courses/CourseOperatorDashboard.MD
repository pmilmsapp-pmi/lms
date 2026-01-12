
// // // // // // // // // 'use client';

// // // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // // import {
// // // // // // // // //   RefreshCw, Users, Eye, MessageCircle, Trash2, Check, XCircle,
// // // // // // // // //   AlertCircle, BarChart3, X, Send, Smile, MessageSquare, Briefcase,
// // // // // // // // //   Paperclip, Image as ImageIcon, FileText
// // // // // // // // // } from 'lucide-react';

// // // // // // // // // const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

// // // // // // // // // /* =========================================================================
// // // // // // // // //    GROUP CHAT MODAL (Tabs: aria-selected literal + tabpanel berpasangan)
// // // // // // // // //    ========================================================================= */
// // // // // // // // // function GroupChatModal({ courseId, onClose }: any) {
// // // // // // // // //   const [activeTab, setActiveTab] = useState<'internal' | 'public'>('public');
// // // // // // // // //   const [messages, setMessages] = useState<any[]>([]);
// // // // // // // // //   const [newMessage, setNewMessage] = useState('');
// // // // // // // // //   const [showEmoji, setShowEmoji] = useState(false);
// // // // // // // // //   const [attachment, setAttachment] = useState<any>(null);
// // // // // // // // //   const [isUploading, setIsUploading] = useState(false);

// // // // // // // // //   const messagesEndRef = useRef<HTMLDivElement>(null);
// // // // // // // // //   const fileInputRef = useRef<HTMLInputElement>(null);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     loadMessages();
// // // // // // // // //     const interval = setInterval(loadMessages, 3000);
// // // // // // // // //     return () => clearInterval(interval);
// // // // // // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // // // // // //   }, [courseId, activeTab]);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // // // // // //   }, [messages]);

// // // // // // // // //   const loadMessages = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const res = await api(`/api/courses/${courseId}/chat-group?type=${activeTab}`);
// // // // // // // // //       setMessages(res || []);
// // // // // // // // //     } catch (e) { console.error('Chat error', e); }
// // // // // // // // //   };

// // // // // // // // //   const onEmojiClick = (emojiObject: any) => {
// // // // // // // // //     setNewMessage(prev => prev + emojiObject.emoji);
// // // // // // // // //     setShowEmoji(false);
// // // // // // // // //   };

// // // // // // // // //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //     const file = e.target.files?.[0];
// // // // // // // // //     if (!file) return;
// // // // // // // // //     setIsUploading(true);
// // // // // // // // //     try {
// // // // // // // // //       const formData = new FormData();
// // // // // // // // //       formData.append('file', file);
// // // // // // // // //       const res = await apiUpload('/api/upload', formData);
// // // // // // // // //       const fileUrl = res.url || res.file?.url;
// // // // // // // // //       const type = file.type.startsWith('image/') ? 'image' : 'file';
// // // // // // // // //       setAttachment({ url: fileUrl, type, name: file.name });
// // // // // // // // //     } catch (error: any) {
// // // // // // // // //       alert('Gagal upload file: ' + error.message);
// // // // // // // // //     } finally {
// // // // // // // // //       setIsUploading(false);
// // // // // // // // //       if (fileInputRef.current) fileInputRef.current.value = '';
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleRemoveAttachment = () => setAttachment(null);

// // // // // // // // //   const handleSend = async (e: React.FormEvent) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     if ((!newMessage.trim() && !attachment) || isUploading) return;

// // // // // // // // //     const tempMsg = {
// // // // // // // // //       _id: Date.now(),
// // // // // // // // //       sender: { name: 'Saya', role: 'me' },
// // // // // // // // //       message: newMessage,
// // // // // // // // //       attachment,
// // // // // // // // //       createdAt: new Date().toISOString()
// // // // // // // // //     };
// // // // // // // // //     setMessages(prev => [...prev, tempMsg]);

// // // // // // // // //     const payload = { text: newMessage, type: activeTab, attachment };
// // // // // // // // //     setNewMessage(''); setAttachment(null);

// // // // // // // // //     try {
// // // // // // // // //       await api(`/api/courses/${courseId}/chat-group`, { method: 'POST', body: payload });
// // // // // // // // //       loadMessages();
// // // // // // // // //     } catch (e: any) {
// // // // // // // // //       alert('Gagal kirim: ' + e.message);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const isPublicSelected = activeTab === 'public';
// // // // // // // // //   const isInternalSelected = activeTab === 'internal';

// // // // // // // // //   const ChatPanel = () => (
// // // // // // // // //     <div className="flex-1 bg-gray-100 p-4 overflow-y-auto space-y-4 relative">
// // // // // // // // //       {messages.length === 0 && (
// // // // // // // // //         <div className="text-center text-gray-400 text-xs mt-10 p-4 bg-white rounded-lg shadow-sm border border-dashed">
// // // // // // // // //           <p className="font-bold mb-1">Belum ada percakapan.</p>
// // // // // // // // //           <p>Mulai diskusi di {isPublicSelected ? 'Kelas' : 'Tim Internal'} sekarang!</p>
// // // // // // // // //         </div>
// // // // // // // // //       )}

// // // // // // // // //       {messages.map((msg: any) => {
// // // // // // // // //         const isMe = msg.sender?.role === 'me' || msg.sender?._id === 'current_user_id';
// // // // // // // // //         return (
// // // // // // // // //           <div key={msg._id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
// // // // // // // // //             <div className={`flex max-w-[85%] flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// // // // // // // // //               {/* Header Pesan */}
// // // // // // // // //               <div className="flex items-center gap-2 mb-1 px-1">
// // // // // // // // //                 {!isMe && (
// // // // // // // // //                   <div className="w-5 h-5 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
// // // // // // // // //                     {msg.sender?.avatarUrl ? (
// // // // // // // // //                       <img src={getImageUrl(msg.sender.avatarUrl)} alt="" className="w-full h-full object-cover" />
// // // // // // // // //                     ) : (
// // // // // // // // //                       <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-gray-600">
// // // // // // // // //                         {(msg.sender?.name || '?').charAt(0)}
// // // // // // // // //                       </div>
// // // // // // // // //                     )}
// // // // // // // // //                   </div>
// // // // // // // // //                 )}
// // // // // // // // //                 <span className="text-[10px] font-bold text-gray-600">{msg.sender?.name || 'User'}</span>
// // // // // // // // //                 <span className="text-[9px] text-gray-400">
// // // // // // // // //                   {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
// // // // // // // // //                 </span>
// // // // // // // // //               </div>

// // // // // // // // //               {/* Bubble */}
// // // // // // // // //               <div
// // // // // // // // //                 className={`px-4 py-2 shadow-sm text-sm break-words relative ${
// // // // // // // // //                   isMe
// // // // // // // // //                     ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
// // // // // // // // //                     : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-200'
// // // // // // // // //                 }`}
// // // // // // // // //               >
// // // // // // // // //                 {msg.attachment && (
// // // // // // // // //                   <div className="mb-2">
// // // // // // // // //                     {msg.attachment.type === 'image' ? (
// // // // // // // // //                       <a href={getImageUrl(msg.attachment.url)} target="_blank" rel="noreferrer" aria-label="Lihat Gambar">
// // // // // // // // //                         <img
// // // // // // // // //                           src={getImageUrl(msg.attachment.url)}
// // // // // // // // //                           alt="Lampiran"
// // // // // // // // //                           className="max-w-full rounded-lg max-h-48 object-cover hover:opacity-90 transition-opacity"
// // // // // // // // //                         />
// // // // // // // // //                       </a>
// // // // // // // // //                     ) : (
// // // // // // // // //                       <a
// // // // // // // // //                         href={getImageUrl(msg.attachment.url)}
// // // // // // // // //                         target="_blank"
// // // // // // // // //                         rel="noreferrer"
// // // // // // // // //                         className={`flex items-center gap-2 p-2 rounded-lg ${
// // // // // // // // //                           isMe ? 'bg-blue-700 text-white' : 'bg-gray-50 text-gray-800'
// // // // // // // // //                         } hover:bg-opacity-80 transition-colors`}
// // // // // // // // //                         aria-label="Download File"
// // // // // // // // //                       >
// // // // // // // // //                         <FileText size={16} aria-hidden="true" />
// // // // // // // // //                         <span className="text-xs truncate max-w-[150px] font-medium underline">
// // // // // // // // //                           {msg.attachment.name || 'Dokumen'}
// // // // // // // // //                         </span>
// // // // // // // // //                       </a>
// // // // // // // // //                     )}
// // // // // // // // //                   </div>
// // // // // // // // //                 )}
// // // // // // // // //                 {msg.message && <p>{msg.message}</p>}
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         );
// // // // // // // // //       })}

// // // // // // // // //       <div ref={messagesEndRef} />

// // // // // // // // //       {showEmoji && (
// // // // // // // // //         <div className="absolute bottom-2 left-4 z-20">
// // // // // // // // //           <div className="fixed inset-0 z-10" onClick={() => setShowEmoji(false)} aria-hidden="true" />
// // // // // // // // //           <div className="relative z-20 shadow-2xl rounded-xl">
// // // // // // // // //             <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={350} />
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       )}
// // // // // // // // //     </div>
// // // // // // // // //   );

// // // // // // // // //   return (
// // // // // // // // //     <div
// // // // // // // // //       className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
// // // // // // // // //       role="dialog"
// // // // // // // // //       aria-modal="true"
// // // // // // // // //       aria-label="Ruang Diskusi"
// // // // // // // // //     >
// // // // // // // // //       <div className="bg-white w-full max-w-lg h-[650px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
// // // // // // // // //         {/* Header */}
// // // // // // // // //         <div className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md z-10">
// // // // // // // // //           <h3 className="font-bold flex items-center gap-2">
// // // // // // // // //             <MessageSquare size={20} aria-hidden="true" /> Ruang Diskusi
// // // // // // // // //           </h3>
// // // // // // // // //           <button
// // // // // // // // //             onClick={onClose}
// // // // // // // // //             className="hover:bg-gray-700 p-1.5 rounded-full"
// // // // // // // // //             aria-label="Tutup Modal"
// // // // // // // // //             title="Tutup"
// // // // // // // // //           >
// // // // // // // // //             <X size={20} aria-hidden="true" />
// // // // // // // // //           </button>
// // // // // // // // //         </div>

// // // // // // // // //         {/* Tabs: render dua versi (literal aria-selected) */}
// // // // // // // // //         <div className="flex border-b bg-white z-10" role="tablist" aria-label="Jenis ruang chat">
// // // // // // // // //           {/* PUBLIC TAB */}
// // // // // // // // //           {isPublicSelected ? (
// // // // // // // // //             <button
// // // // // // // // //               role="tab"
// // // // // // // // //               id="tab-public"
// // // // // // // // //               aria-selected="true"
// // // // // // // // //               aria-controls="panel-public"
// // // // // // // // //               tabIndex={0}
// // // // // // // // //               onClick={() => setActiveTab('public')}
// // // // // // // // //               className="flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2 border-blue-600 text-blue-600 bg-blue-50"
// // // // // // // // //               aria-label="Kelas (Publik)"
// // // // // // // // //             >
// // // // // // // // //               <Users size={16} aria-hidden="true" /> Kelas (Publik)
// // // // // // // // //             </button>
// // // // // // // // //           ) : (
// // // // // // // // //             <button
// // // // // // // // //               role="tab"
// // // // // // // // //               id="tab-public"
// // // // // // // // //               aria-selected="false"
// // // // // // // // //               aria-controls="panel-public"
// // // // // // // // //               tabIndex={-1}
// // // // // // // // //               onClick={() => setActiveTab('public')}
// // // // // // // // //               className="flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors text-gray-500 hover:bg-gray-50"
// // // // // // // // //               aria-label="Kelas (Publik)"
// // // // // // // // //             >
// // // // // // // // //               <Users size={16} aria-hidden="true" /> Kelas (Publik)
// // // // // // // // //             </button>
// // // // // // // // //           )}

// // // // // // // // //           {/* INTERNAL TAB */}
// // // // // // // // //           {isInternalSelected ? (
// // // // // // // // //             <button
// // // // // // // // //               role="tab"
// // // // // // // // //               id="tab-internal"
// // // // // // // // //               aria-selected="true"
// // // // // // // // //               aria-controls="panel-internal"
// // // // // // // // //               tabIndex={0}
// // // // // // // // //               onClick={() => setActiveTab('internal')}
// // // // // // // // //               className="flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2 border-purple-600 text-purple-600 bg-purple-50"
// // // // // // // // //               aria-label="Tim Internal"
// // // // // // // // //             >
// // // // // // // // //               <Briefcase size={16} aria-hidden="true" /> Tim Internal
// // // // // // // // //             </button>
// // // // // // // // //           ) : (
// // // // // // // // //             <button
// // // // // // // // //               role="tab"
// // // // // // // // //               id="tab-internal"
// // // // // // // // //               aria-selected="false"
// // // // // // // // //               aria-controls="panel-internal"
// // // // // // // // //               tabIndex={-1}
// // // // // // // // //               onClick={() => setActiveTab('internal')}
// // // // // // // // //               className="flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors text-gray-500 hover:bg-gray-50"
// // // // // // // // //               aria-label="Tim Internal"
// // // // // // // // //             >
// // // // // // // // //               <Briefcase size={16} aria-hidden="true" /> Tim Internal
// // // // // // // // //             </button>
// // // // // // // // //           )}
// // // // // // // // //         </div>

// // // // // // // // //         {/* Panel berpasangan: selalu di-DOM, panel non-aktif disembunyikan */}
// // // // // // // // //         <div
// // // // // // // // //           id="panel-public"
// // // // // // // // //           role="tabpanel"
// // // // // // // // //           aria-labelledby="tab-public"
// // // // // // // // //           hidden={!isPublicSelected}
// // // // // // // // //           className="flex-1 flex flex-col"
// // // // // // // // //         >
// // // // // // // // //           <ChatPanel />
// // // // // // // // //         </div>

// // // // // // // // //         <div
// // // // // // // // //           id="panel-internal"
// // // // // // // // //           role="tabpanel"
// // // // // // // // //           aria-labelledby="tab-internal"
// // // // // // // // //           hidden={!isInternalSelected}
// // // // // // // // //           className="flex-1 flex flex-col"
// // // // // // // // //         >
// // // // // // // // //           <ChatPanel />
// // // // // // // // //         </div>

// // // // // // // // //         {/* Attachment Preview */}
// // // // // // // // //         {attachment && (
// // // // // // // // //           <div className="px-4 py-2 bg-gray-50 border-t flex items-center justify-between animate-in slide-in-from-bottom-2">
// // // // // // // // //             <div className="flex items-center gap-3">
// // // // // // // // //               <div className="p-2 bg-white border rounded-lg">
// // // // // // // // //                 {attachment.type === 'image'
// // // // // // // // //                   ? <ImageIcon size={20} className="text-purple-600" aria-hidden="true" />
// // // // // // // // //                   : <FileText size={20} className="text-blue-600" aria-hidden="true" />}
// // // // // // // // //               </div>
// // // // // // // // //               <div className="text-xs">
// // // // // // // // //                 <p className="font-bold text-gray-700 truncate max-w-[200px]">{attachment.name}</p>
// // // // // // // // //                 <p className="text-gray-400">Siap dikirim</p>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //             <button
// // // // // // // // //               onClick={handleRemoveAttachment}
// // // // // // // // //               className="text-red-500 hover:bg-red-50 p-1 rounded-full"
// // // // // // // // //               aria-label="Hapus Lampiran"
// // // // // // // // //               title="Hapus"
// // // // // // // // //             >
// // // // // // // // //               <X size={16} aria-hidden="true" />
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //         {/* Input Area */}
// // // // // // // // //         <form onSubmit={handleSend} className="p-3 bg-white border-t flex items-center gap-2">
// // // // // // // // //           <button
// // // // // // // // //             type="button"
// // // // // // // // //             onClick={() => setShowEmoji(!showEmoji)}
// // // // // // // // //             className="text-gray-400 hover:text-yellow-500 p-2 rounded-full transition-colors"
// // // // // // // // //             aria-label="Buka Emoji"
// // // // // // // // //             title="Emoji"
// // // // // // // // //           >
// // // // // // // // //             <Smile size={20} aria-hidden="true" />
// // // // // // // // //           </button>

// // // // // // // // //           <button
// // // // // // // // //             type="button"
// // // // // // // // //             onClick={() => fileInputRef.current?.click()}
// // // // // // // // //             className="text-gray-400 hover:text-blue-500 p-2 rounded-full transition-colors"
// // // // // // // // //             aria-label="Upload File"
// // // // // // // // //             title="Upload"
// // // // // // // // //           >
// // // // // // // // //             <Paperclip size={20} aria-hidden="true" />
// // // // // // // // //           </button>

// // // // // // // // //           <input
// // // // // // // // //             type="file"
// // // // // // // // //             ref={fileInputRef}
// // // // // // // // //             className="hidden"
// // // // // // // // //             onChange={handleFileChange}
// // // // // // // // //             aria-label="Pilih file"
// // // // // // // // //             title="Pilih file"
// // // // // // // // //           />

// // // // // // // // //           <input
// // // // // // // // //             className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
// // // // // // // // //             placeholder={isUploading ? 'Mengupload...' : 'Ketik pesan...'}
// // // // // // // // //             value={newMessage}
// // // // // // // // //             onChange={e => setNewMessage(e.target.value)}
// // // // // // // // //             disabled={isUploading}
// // // // // // // // //             aria-label="Tulis Pesan"
// // // // // // // // //           />

// // // // // // // // //           <button
// // // // // // // // //             type="submit"
// // // // // // // // //             disabled={isUploading || (!newMessage && !attachment)}
// // // // // // // // //             className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2.5 rounded-full shadow-lg transition-transform active:scale-90"
// // // // // // // // //             aria-label="Kirim Pesan"
// // // // // // // // //             title="Kirim"
// // // // // // // // //           >
// // // // // // // // //             <Send size={18} aria-hidden="true" />
// // // // // // // // //           </button>
// // // // // // // // //         </form>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // /* =========================================================================
// // // // // // // // //    PERSONAL CHAT MODAL (Accessible dialog)
// // // // // // // // //    ========================================================================= */
// // // // // // // // // function PersonalChatModal({ student, onClose }: any) {
// // // // // // // // //   const [messages, setMessages] = useState<any[]>([]);
// // // // // // // // //   const [newMessage, setNewMessage] = useState('');
// // // // // // // // //   const messagesEndRef = useRef<HTMLDivElement>(null);
// // // // // // // // //   const targetId = student.user?._id || student._id;
// // // // // // // // //   const targetName = student.user?.name || student.name || 'User';

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (targetId) loadHistory();
// // // // // // // // //     const interval = setInterval(() => { if (targetId) loadHistory(); }, 5000);
// // // // // // // // //     return () => clearInterval(interval);
// // // // // // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // // // // // //   }, [targetId]);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // // // // // //   }, [messages]);

// // // // // // // // //   const loadHistory = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const res = await api(`/api/chat/${targetId}?t=${Date.now()}`);
// // // // // // // // //       setMessages(res.messages || []);
// // // // // // // // //     } catch (e) { console.error(e); }
// // // // // // // // //   };

// // // // // // // // //   const handleSend = async (e: React.FormEvent) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     if (!newMessage.trim()) return;
// // // // // // // // //     const msgToSend = newMessage;
// // // // // // // // //     setNewMessage('');
// // // // // // // // //     try {
// // // // // // // // //       await api('/api/chat/send', { method: 'POST', body: { recipientId: targetId, message: msgToSend } });
// // // // // // // // //       loadHistory();
// // // // // // // // //     } catch (error: any) { alert('Gagal: ' + error.message); }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div
// // // // // // // // //       className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4"
// // // // // // // // //       role="dialog"
// // // // // // // // //       aria-modal="true"
// // // // // // // // //       aria-label={`Chat Personal dengan ${targetName}`}
// // // // // // // // //     >
// // // // // // // // //       <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95">
// // // // // // // // //         <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
// // // // // // // // //           <div className="font-bold flex items-center gap-2">
// // // // // // // // //             <MessageCircle size={18} aria-hidden="true" /> Chat: {targetName}
// // // // // // // // //           </div>
// // // // // // // // //           <button
// // // // // // // // //             onClick={onClose}
// // // // // // // // //             className="hover:bg-indigo-700 p-1 rounded"
// // // // // // // // //             aria-label="Tutup Chat"
// // // // // // // // //             title="Tutup Chat"
// // // // // // // // //           >
// // // // // // // // //             <X size={18} aria-hidden="true" />
// // // // // // // // //           </button>
// // // // // // // // //         </div>

// // // // // // // // //         <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-2">
// // // // // // // // //           {messages.map((msg: any, i: number) => (
// // // // // // // // //             <div
// // // // // // // // //               key={i}
// // // // // // // // //               className={`p-2 rounded-lg text-sm max-w-[80%] ${msg.sender === 'me' ? 'bg-indigo-100 ml-auto text-right' : 'bg-white border'}`}
// // // // // // // // //             >
// // // // // // // // //               {msg.message}
// // // // // // // // //             </div>
// // // // // // // // //           ))}
// // // // // // // // //           <div ref={messagesEndRef} />
// // // // // // // // //         </div>

// // // // // // // // //         <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
// // // // // // // // //           <input
// // // // // // // // //             className="flex-1 border rounded-full px-3 py-1.5 text-sm"
// // // // // // // // //             value={newMessage}
// // // // // // // // //             onChange={e => setNewMessage(e.target.value)}
// // // // // // // // //             placeholder="Tulis..."
// // // // // // // // //             aria-label="Input pesan personal"
// // // // // // // // //           />
// // // // // // // // //           <button
// // // // // // // // //             type="submit"
// // // // // // // // //             className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
// // // // // // // // //             aria-label="Kirim"
// // // // // // // // //             title="Kirim"
// // // // // // // // //           >
// // // // // // // // //             <Send size={14} aria-hidden="true" />
// // // // // // // // //           </button>
// // // // // // // // //         </form>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // /* =========================================================================
// // // // // // // // //    MAIN DASHBOARD (Progress pakai <progress> — bebas inline styles)
// // // // // // // // //    ========================================================================= */
// // // // // // // // // interface CourseOperatorProps { courseId: string; course: any; }

// // // // // // // // // export default function CourseOperatorDashboard({ courseId, course }: CourseOperatorProps) {
// // // // // // // // //   const [participants, setParticipants] = useState<any[]>([]);
// // // // // // // // //   const [loadingParticipants, setLoadingParticipants] = useState(false);
// // // // // // // // //   const [participantFilter, setParticipantFilter] = useState('');
// // // // // // // // //   const [actionOptions, setActionOptions] = useState<any[]>([]);
// // // // // // // // //   const [selectedActionId, setSelectedActionId] = useState<string>('');
// // // // // // // // //   const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
// // // // // // // // //   const [showGroupChat, setShowGroupChat] = useState(false);
// // // // // // // // //   const [studentDetail, setStudentDetail] = useState<any>(null);
// // // // // // // // //   const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);

// // // // // // // // //   const totalLessons = course?.modules?.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0) || 0;

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (course?.modules) {
// // // // // // // // //       const opts: any[] = [];
// // // // // // // // //       course.modules.forEach((m: any) => {
// // // // // // // // //         m.lessons?.forEach((l: any) => {
// // // // // // // // //           let label = l.title;
// // // // // // // // //           if (l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
// // // // // // // // //           else if (l.type === 'essay') label = `📝 Esai: ${l.title}`;
// // // // // // // // //           else if (l.type === 'upload_doc') label = `📤 Upload: ${l.title}`;
// // // // // // // // //           opts.push({ id: l._id, label, type: l.type });
// // // // // // // // //         });
// // // // // // // // //       });
// // // // // // // // //       setActionOptions(opts);
// // // // // // // // //     }
// // // // // // // // //   }, [course]);

// // // // // // // // //   const fetchParticipants = async () => {
// // // // // // // // //     setLoadingParticipants(true);
// // // // // // // // //     try {
// // // // // // // // //       const res = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`);
// // // // // // // // //       setParticipants(res.participants || []);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Gagal load peserta');
// // // // // // // // //     } finally {
// // // // // // // // //       setLoadingParticipants(false);
// // // // // // // // //     }
// // // // // // // // //   };
// // // // // // // // //   useEffect(() => { fetchParticipants(); }, [courseId]);

// // // // // // // // //   const handleVerifyEnrollment = async (enrollmentId: string, action: 'approve' | 'reject', studentName: string) => {
// // // // // // // // //     if (!confirm(`Konfirmasi ${action} untuk ${studentName}?`)) return;
// // // // // // // // //     try {
// // // // // // // // //       await api('/api/courses/verify-enrollment', { method: 'POST', body: { enrollmentId, action } });
// // // // // // // // //       alert('Berhasil.');
// // // // // // // // //       fetchParticipants();
// // // // // // // // //     } catch (e: any) { alert(e.message); }
// // // // // // // // //   };

// // // // // // // // //   const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => {
// // // // // // // // //     if (!selectedActionId) return alert('Pilih Materi dulu!');
// // // // // // // // //     const realUserId =
// // // // // // // // //       participants.find(p => (p.user?._id === studentId) || (p.user === studentId))?.user?._id || studentId;

// // // // // // // // //     if (action === 'pass') {
// // // // // // // // //       if (!confirm('Luluskan peserta ini manual?')) return;
// // // // // // // // //       try {
// // // // // // // // //         await api(`/api/courses/mark-complete-lesson`, {
// // // // // // // // //           method: 'POST',
// // // // // // // // //           body: { studentId: realUserId, lessonId: selectedActionId, courseId }
// // // // // // // // //         });
// // // // // // // // //         alert('Berhasil diluluskan!');
// // // // // // // // //         fetchParticipants();
// // // // // // // // //       } catch (e: any) { alert(e.message); }
// // // // // // // // //     } else if (action === 'reset') {
// // // // // // // // //       if (!confirm('Reset progress materi ini?')) return;
// // // // // // // // //       try {
// // // // // // // // //         await api(`/api/courses/reset-quiz`, {
// // // // // // // // //           method: 'POST',
// // // // // // // // //           body: { studentId: realUserId, quizId: selectedActionId }
// // // // // // // // //         });
// // // // // // // // //         alert('Reset berhasil!');
// // // // // // // // //         fetchParticipants();
// // // // // // // // //       } catch (e: any) { alert(e.message); }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleRejectParticipant = async (enrollmentId: string) => {
// // // // // // // // //     if (!confirm('Hapus permanen peserta ini?')) return;
// // // // // // // // //     try {
// // // // // // // // //       await api(`/api/enrollments/${enrollmentId}`, { method: 'DELETE' });
// // // // // // // // //       alert('Dihapus.');
// // // // // // // // //       fetchParticipants();
// // // // // // // // //     } catch (e: any) { alert(e.message); }
// // // // // // // // //   };

// // // // // // // // //   const pendingParticipants = participants.filter(p => {
// // // // // // // // //     const s = (p.status || '').toLowerCase();
// // // // // // // // //     return !s || s === 'pending' || s === 'waiting';
// // // // // // // // //   });
// // // // // // // // //   const activeParticipants = participants.filter(p => {
// // // // // // // // //     const s = (p.status || '').toLowerCase();
// // // // // // // // //     return s === 'active' || s === 'approved';
// // // // // // // // //   });
// // // // // // // // //   const passedStudents = participants.filter(p => p.progress >= 100 || p.isCompleted).length;

// // // // // // // // //   if (loadingParticipants && participants.length === 0) {
// // // // // // // // //     return (
// // // // // // // // //       <div className="p-10 text-center text-gray-500">
// // // // // // // // //         <RefreshCw className="animate-spin inline-block mr-2" size={18} aria-hidden="true" /> Memuat data...
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <div className="space-y-8 animate-in slide-in-from-right-4">
// // // // // // // // //       {/* Header Stats */}
// // // // // // // // //       <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100">
// // // // // // // // //         <div className="flex gap-6">
// // // // // // // // //           <div className="text-center">
// // // // // // // // //             <span className="block text-2xl font-bold text-gray-800">{participants.length}</span>
// // // // // // // // //             <span className="text-[10px] text-gray-500 uppercase font-bold">Total</span>
// // // // // // // // //           </div>
// // // // // // // // //           <div className="text-center">
// // // // // // // // //             <span className="block text-2xl font-bold text-green-600">{passedStudents}</span>
// // // // // // // // //             <span className="text-[10px] text-gray-500 uppercase font-bold">Lulus</span>
// // // // // // // // //           </div>
// // // // // // // // //           <div className="text-center">
// // // // // // // // //             <span className="block text-2xl font-bold text-orange-500">{activeParticipants.length}</span>
// // // // // // // // //             <span className="text-[10px] text-gray-500 uppercase font-bold">Aktif</span>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //         <button
// // // // // // // // //           onClick={() => setShowGroupChat(true)}
// // // // // // // // //           className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg hover:bg-indigo-700 flex items-center gap-2 transition-transform active:scale-95"
// // // // // // // // //           aria-label="Buka Ruang Diskusi"
// // // // // // // // //           title="Ruang Diskusi"
// // // // // // // // //         >
// // // // // // // // //           <MessageSquare size={18} aria-hidden="true" /> Ruang Diskusi
// // // // // // // // //         </button>
// // // // // // // // //       </div>

// // // // // // // // //       {/* TABEL PENDING */}
// // // // // // // // //       <div className="bg-amber-50 border border-amber-200 rounded-2xl shadow-sm overflow-hidden mb-6">
// // // // // // // // //         <div className="px-6 py-3 border-b border-amber-200 bg-amber-100 flex items-center gap-2">
// // // // // // // // //           <AlertCircle className="text-amber-600" size={18} aria-hidden="true" />
// // // // // // // // //           <h3 className="font-bold text-amber-900 text-sm">Menunggu Persetujuan ({pendingParticipants.length})</h3>
// // // // // // // // //         </div>

// // // // // // // // //         {pendingParticipants.length === 0 ? (
// // // // // // // // //           <div className="p-6 text-center text-gray-400 text-sm italic">Tidak ada antrian.</div>
// // // // // // // // //         ) : (
// // // // // // // // //           <div className="overflow-x-auto">
// // // // // // // // //             <table className="w-full text-left text-sm">
// // // // // // // // //               <tbody className="divide-y divide-amber-200">
// // // // // // // // //                 {pendingParticipants.map((p: any) => (
// // // // // // // // //                   <tr key={p._id} className="hover:bg-amber-100/50">
// // // // // // // // //                     <td className="p-3 font-bold">{p.user?.name}</td>
// // // // // // // // //                     <td className="p-3 text-gray-500">{p.user?.email}</td>
// // // // // // // // //                     <td className="p-3 text-right">
// // // // // // // // //                       <button
// // // // // // // // //                         onClick={() => handleVerifyEnrollment(p._id, 'approve', p.user?.name)}
// // // // // // // // //                         className="text-green-700 font-bold hover:underline mr-4"
// // // // // // // // //                         aria-label={`Setujui ${p.user?.name}`}
// // // // // // // // //                       >
// // // // // // // // //                         Setujui
// // // // // // // // //                       </button>
// // // // // // // // //                       <button
// // // // // // // // //                         onClick={() => handleVerifyEnrollment(p._id, 'reject', p.user?.name)}
// // // // // // // // //                         className="text-red-600 font-bold hover:underline"
// // // // // // // // //                         aria-label={`Tolak ${p.user?.name}`}
// // // // // // // // //                       >
// // // // // // // // //                         Tolak
// // // // // // // // //                       </button>
// // // // // // // // //                     </td>
// // // // // // // // //                   </tr>
// // // // // // // // //                 ))}
// // // // // // // // //               </tbody>
// // // // // // // // //             </table>
// // // // // // // // //           </div>
// // // // // // // // //         )}
// // // // // // // // //       </div>

// // // // // // // // //       {/* TABEL AKTIF */}
// // // // // // // // //       <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
// // // // // // // // //         <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-wrap gap-4">
// // // // // // // // //           <h3 className="font-bold text-gray-800 flex items-center gap-2">
// // // // // // // // //             <Users size={18} aria-hidden="true" /> Peserta Aktif
// // // // // // // // //           </h3>
// // // // // // // // //           <div className="flex gap-2">
// // // // // // // // //             <select
// // // // // // // // //               className="p-1.5 border rounded text-xs bg-white h-9 focus:ring-2 focus:ring-indigo-500 outline-none"
// // // // // // // // //               value={selectedActionId}
// // // // // // // // //               onChange={e => setSelectedActionId(e.target.value)}
// // // // // // // // //               aria-label="Pilih Materi untuk Aksi Cepat"
// // // // // // // // //             >
// // // // // // // // //               <option value="">-- Aksi Cepat --</option>
// // // // // // // // //               {actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
// // // // // // // // //             </select>

// // // // // // // // //             <input
// // // // // // // // //               className="px-3 py-1.5 rounded border text-xs h-9 focus:ring-2 focus:ring-indigo-500 outline-none"
// // // // // // // // //               placeholder="Cari..."
// // // // // // // // //               value={participantFilter}
// // // // // // // // //               onChange={e => setParticipantFilter(e.target.value)}
// // // // // // // // //               aria-label="Cari peserta"
// // // // // // // // //             />

// // // // // // // // //             <button
// // // // // // // // //               onClick={fetchParticipants}
// // // // // // // // //               className="bg-white border p-1.5 rounded h-9 w-9 flex justify-center items-center hover:bg-gray-100"
// // // // // // // // //               aria-label="Refresh Data"
// // // // // // // // //               title="Refresh Data"
// // // // // // // // //             >
// // // // // // // // //               <RefreshCw size={14} aria-hidden="true" />
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         </div>

// // // // // // // // //         <div className="overflow-x-auto">
// // // // // // // // //           <table className="w-full text-left border-collapse text-sm">
// // // // // // // // //             <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b">
// // // // // // // // //               <tr>
// // // // // // // // //                 <th className="p-4">Peserta</th>
// // // // // // // // //                 <th className="p-4">Sedang Mengerjakan</th>
// // // // // // // // //                 <th className="p-4">Progress</th>
// // // // // // // // //                 <th className="p-4 text-center">Status</th>
// // // // // // // // //                 <th className="p-4 text-center">Aksi Cepat</th>
// // // // // // // // //                 <th className="p-4 text-center">Chat</th>
// // // // // // // // //                 <th className="p-4 text-center">Detail</th>
// // // // // // // // //                 <th className="p-4 text-center">Hapus</th>
// // // // // // // // //               </tr>
// // // // // // // // //             </thead>

// // // // // // // // //             <tbody className="divide-y divide-gray-100">
// // // // // // // // //               {activeParticipants
// // // // // // // // //                 .filter(p => (p.user?.name || '').toLowerCase().includes(participantFilter.toLowerCase()))
// // // // // // // // //                 .map((p: any, idx: number) => {
// // // // // // // // //                   // Normalisasi progress (0..100)
// // // // // // // // //                   const rawProgress = Number(p.progress);
// // // // // // // // //                   const progressValue = Number.isFinite(rawProgress)
// // // // // // // // //                     ? Math.max(0, Math.min(100, Math.round(rawProgress)))
// // // // // // // // //                     : 0;

// // // // // // // // //                   const isActionCompleted = selectedActionId && p.completedLessons?.includes(selectedActionId);

// // // // // // // // //                   return (
// // // // // // // // //                     <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
// // // // // // // // //                       <td className="p-4">
// // // // // // // // //                         <div className="font-bold text-gray-900">{p.user?.name}</div>
// // // // // // // // //                         <div className="text-xs text-gray-500">{p.user?.email}</div>
// // // // // // // // //                       </td>

// // // // // // // // //                       <td className="p-4">
// // // // // // // // //                         <div className="flex items-center gap-2 text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 w-fit">
// // // // // // // // //                           <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
// // // // // // // // //                           {p.currentPosition || 'Belum Memulai'}
// // // // // // // // //                         </div>
// // // // // // // // //                       </td>

// // // // // // // // //                       <td className="p-4 w-44">
// // // // // // // // //                         <div className="flex justify-between text-xs font-bold mb-1">
// // // // // // // // //                           <span>{progressValue}%</span>
// // // // // // // // //                         </div>

// // // // // // // // //                         {/* Native progress (tanpa inline styles) */}
// // // // // // // // //                         <progress
// // // // // // // // //                           max={100}
// // // // // // // // //                           value={progressValue}
// // // // // // // // //                           aria-label="Kemajuan peserta"
// // // // // // // // //                           className="w-full h-1.5
// // // // // // // // //                                      [&::-webkit-progress-bar]:bg-gray-100
// // // // // // // // //                                      [&::-webkit-progress-value]:bg-blue-500"
// // // // // // // // //                         />
// // // // // // // // //                       </td>

// // // // // // // // //                       <td className="p-4 text-center">
// // // // // // // // //                         {progressValue === 100 ? (
// // // // // // // // //                           <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">LULUS</span>
// // // // // // // // //                         ) : (
// // // // // // // // //                           <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">PROSES</span>
// // // // // // // // //                         )}
// // // // // // // // //                       </td>

// // // // // // // // //                       <td className="p-4 text-center">
// // // // // // // // //                         {selectedActionId ? (
// // // // // // // // //                           <button
// // // // // // // // //                             onClick={() => handleParticipantAction(p.user?._id, 'pass')}
// // // // // // // // //                             disabled={isActionCompleted}
// // // // // // // // //                             className={`px-2 py-1 rounded text-xs font-bold border ${isActionCompleted ? 'bg-gray-100 text-gray-400' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
// // // // // // // // //                             aria-label={isActionCompleted ? 'Materi Selesai' : 'Luluskan Materi'}
// // // // // // // // //                             title={isActionCompleted ? 'Materi Selesai' : 'Luluskan Materi'}
// // // // // // // // //                           >
// // // // // // // // //                             {isActionCompleted ? 'Selesai' : 'Luluskan'}
// // // // // // // // //                           </button>
// // // // // // // // //                         ) : '-'}
// // // // // // // // //                       </td>

// // // // // // // // //                       <td className="p-4 text-center">
// // // // // // // // //                         <button
// // // // // // // // //                           onClick={() => setChatTargetStudent(p)}
// // // // // // // // //                           className="text-gray-400 hover:text-blue-600"
// // // // // // // // //                           aria-label={`Chat dengan ${p.user?.name}`}
// // // // // // // // //                           title="Chat"
// // // // // // // // //                         >
// // // // // // // // //                           <MessageCircle size={18} aria-hidden="true" />
// // // // // // // // //                         </button>
// // // // // // // // //                       </td>

// // // // // // // // //                       <td className="p-4 text-center">
// // // // // // // // //                         <button
// // // // // // // // //                           onClick={() => { setStudentDetail(p); setShowStudentDetailModal(true); }}
// // // // // // // // //                           className="text-gray-400 hover:text-indigo-600"
// // // // // // // // //                           aria-label={`Detail ${p.user?.name}`}
// // // // // // // // //                           title="Detail"
// // // // // // // // //                         >
// // // // // // // // //                           <Eye size={18} aria-hidden="true" />
// // // // // // // // //                         </button>
// // // // // // // // //                       </td>

// // // // // // // // //                       <td className="p-4 text-center">
// // // // // // // // //                         <button
// // // // // // // // //                           onClick={() => handleRejectParticipant(p._id)}
// // // // // // // // //                           className="text-gray-300 hover:text-red-600"
// // // // // // // // //                           aria-label={`Hapus ${p.user?.name}`}
// // // // // // // // //                           title="Hapus"
// // // // // // // // //                         >
// // // // // // // // //                           <Trash2 size={16} aria-hidden="true" />
// // // // // // // // //                         </button>
// // // // // // // // //                       </td>
// // // // // // // // //                     </tr>
// // // // // // // // //                   );
// // // // // // // // //                 })}
// // // // // // // // //             </tbody>
// // // // // // // // //           </table>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* MODALS */}
// // // // // // // // //       {chatTargetStudent && (
// // // // // // // // //         <PersonalChatModal student={chatTargetStudent} onClose={() => setChatTargetStudent(null)} />
// // // // // // // // //       )}

// // // // // // // // //       {showGroupChat && (
// // // // // // // // //         <GroupChatModal courseId={courseId} onClose={() => setShowGroupChat(false)} />
// // // // // // // // //       )}

// // // // // // // // //       {showStudentDetailModal && studentDetail && (
// // // // // // // // //         <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
// // // // // // // // //           <div
// // // // // // // // //             className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
// // // // // // // // //             role="dialog"
// // // // // // // // //             aria-modal="true"
// // // // // // // // //             aria-label="Detail Peserta"
// // // // // // // // //           >
// // // // // // // // //             <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
// // // // // // // // //               <h3 className="font-bold flex items-center gap-2">
// // // // // // // // //                 <Users size={20} aria-hidden="true" /> Detail: {studentDetail.user?.name}
// // // // // // // // //               </h3>
// // // // // // // // //               <button
// // // // // // // // //                 onClick={() => setShowStudentDetailModal(false)}
// // // // // // // // //                 aria-label="Tutup Modal"
// // // // // // // // //                 title="Tutup"
// // // // // // // // //               >
// // // // // // // // //                 <X size={24} aria-hidden="true" />
// // // // // // // // //               </button>
// // // // // // // // //             </div>

// // // // // // // // //             <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
// // // // // // // // //               {course?.modules?.map((m: any) => (
// // // // // // // // //                 <div key={m._id} className="bg-white border rounded-xl overflow-hidden shadow-sm">
// // // // // // // // //                   <div className="bg-gray-100 px-4 py-2 border-b font-bold text-sm text-gray-700">{m.title}</div>
// // // // // // // // //                   <div className="divide-y">
// // // // // // // // //                     {m.lessons.map((l: any) => {
// // // // // // // // //                       const isDone = studentDetail.completedLessons?.includes(l._id);
// // // // // // // // //                       return (
// // // // // // // // //                         <div key={l._id} className="p-3 flex justify-between items-center hover:bg-gray-50">
// // // // // // // // //                           <div className="flex items-center gap-3">
// // // // // // // // //                             <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isDone ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>
// // // // // // // // //                               {isDone && <Check size={12} aria-hidden="true" />}
// // // // // // // // //                             </div>
// // // // // // // // //                             <span className={`text-sm ${isDone ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{l.title}</span>
// // // // // // // // //                           </div>
// // // // // // // // //                           <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">{l.type}</span>
// // // // // // // // //                         </div>
// // // // // // // // //                       );
// // // // // // // // //                     })}
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               ))}
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       )}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // 'use client';

// // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // import {
// // // // // // // //   RefreshCw, Users, Eye, MessageCircle, Trash2, Check, XCircle,
// // // // // // // //   AlertCircle, BarChart3, X, Send, Smile, MessageSquare, Briefcase,
// // // // // // // //   Paperclip, Image as ImageIcon, FileText
// // // // // // // // } from 'lucide-react';

// // // // // // // // const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

// // // // // // // // /* =========================================================================
// // // // // // // //    GROUP CHAT MODAL
// // // // // // // //    ========================================================================= */
// // // // // // // // function GroupChatModal({ courseId, onClose }: any) {
// // // // // // // //   const [activeTab, setActiveTab] = useState<'internal' | 'public'>('public');
// // // // // // // //   const [messages, setMessages] = useState<any[]>([]);
// // // // // // // //   const [newMessage, setNewMessage] = useState('');
// // // // // // // //   const [showEmoji, setShowEmoji] = useState(false);
// // // // // // // //   const [attachment, setAttachment] = useState<any>(null);
// // // // // // // //   const [isUploading, setIsUploading] = useState(false);

// // // // // // // //   const messagesEndRef = useRef<HTMLDivElement>(null);
// // // // // // // //   const fileInputRef = useRef<HTMLInputElement>(null);

// // // // // // // //   useEffect(() => {
// // // // // // // //     loadMessages();
// // // // // // // //     const interval = setInterval(loadMessages, 3000);
// // // // // // // //     return () => clearInterval(interval);
// // // // // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // // // // //   }, [courseId, activeTab]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // // // // //   }, [messages]);

// // // // // // // //   const loadMessages = async () => {
// // // // // // // //     try {
// // // // // // // //       const res = await api(`/api/courses/${courseId}/chat-group?type=${activeTab}`);
// // // // // // // //       setMessages(res || []);
// // // // // // // //     } catch (e) { console.error('Chat error', e); }
// // // // // // // //   };

// // // // // // // //   const onEmojiClick = (emojiObject: any) => {
// // // // // // // //     setNewMessage(prev => prev + emojiObject.emoji);
// // // // // // // //     setShowEmoji(false);
// // // // // // // //   };

// // // // // // // //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //     const file = e.target.files?.[0];
// // // // // // // //     if (!file) return;
// // // // // // // //     setIsUploading(true);
// // // // // // // //     try {
// // // // // // // //       const formData = new FormData();
// // // // // // // //       formData.append('file', file);
// // // // // // // //       const res = await apiUpload('/api/upload', formData);
// // // // // // // //       const fileUrl = res.url || res.file?.url;
// // // // // // // //       const type = file.type.startsWith('image/') ? 'image' : 'file';
// // // // // // // //       setAttachment({ url: fileUrl, type, name: file.name });
// // // // // // // //     } catch (error: any) {
// // // // // // // //       alert('Gagal upload file: ' + error.message);
// // // // // // // //     } finally {
// // // // // // // //       setIsUploading(false);
// // // // // // // //       if (fileInputRef.current) fileInputRef.current.value = '';
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleRemoveAttachment = () => setAttachment(null);

// // // // // // // //   const handleSend = async (e: React.FormEvent) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     if ((!newMessage.trim() && !attachment) || isUploading) return;

// // // // // // // //     const tempMsg = {
// // // // // // // //       _id: Date.now(),
// // // // // // // //       sender: { name: 'Saya', role: 'me' },
// // // // // // // //       message: newMessage,
// // // // // // // //       attachment,
// // // // // // // //       createdAt: new Date().toISOString()
// // // // // // // //     };
// // // // // // // //     setMessages(prev => [...prev, tempMsg]);

// // // // // // // //     const payload = { text: newMessage, type: activeTab, attachment };
// // // // // // // //     setNewMessage(''); setAttachment(null);

// // // // // // // //     try {
// // // // // // // //       await api(`/api/courses/${courseId}/chat-group`, { method: 'POST', body: payload });
// // // // // // // //       loadMessages();
// // // // // // // //     } catch (e: any) {
// // // // // // // //       alert('Gagal kirim: ' + e.message);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const isPublicSelected = activeTab === 'public';
// // // // // // // //   const isInternalSelected = activeTab === 'internal';

// // // // // // // //   const ChatPanel = () => (
// // // // // // // //     <div className="flex-1 bg-gray-100 p-4 overflow-y-auto space-y-4 relative">
// // // // // // // //       {messages.length === 0 && (
// // // // // // // //         <div className="text-center text-gray-400 text-xs mt-10 p-4 bg-white rounded-lg shadow-sm border border-dashed">
// // // // // // // //           <p className="font-bold mb-1">Belum ada percakapan.</p>
// // // // // // // //           <p>Mulai diskusi di {isPublicSelected ? 'Kelas' : 'Tim Internal'} sekarang!</p>
// // // // // // // //         </div>
// // // // // // // //       )}

// // // // // // // //       {messages.map((msg: any) => {
// // // // // // // //         const isMe = msg.sender?.role === 'me' || msg.sender?._id === 'current_user_id';
// // // // // // // //         return (
// // // // // // // //           <div key={msg._id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
// // // // // // // //             <div className={`flex max-w-[85%] flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// // // // // // // //               {/* Header Pesan */}
// // // // // // // //               <div className="flex items-center gap-2 mb-1 px-1">
// // // // // // // //                 {!isMe && (
// // // // // // // //                   <div className="w-5 h-5 rounded-full bg-gray-300 overflow-hidden flex-shrink-0" aria-hidden="true">
// // // // // // // //                     {msg.sender?.avatarUrl ? (
// // // // // // // //                       <img src={getImageUrl(msg.sender.avatarUrl)} alt="" className="w-full h-full object-cover" />
// // // // // // // //                     ) : (
// // // // // // // //                       <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-gray-600">
// // // // // // // //                         {(msg.sender?.name || '?').charAt(0)}
// // // // // // // //                       </div>
// // // // // // // //                     )}
// // // // // // // //                   </div>
// // // // // // // //                 )}
// // // // // // // //                 <span className="text-[10px] font-bold text-gray-600">{msg.sender?.name || 'User'}</span>
// // // // // // // //                 <span className="text-[9px] text-gray-400">
// // // // // // // //                   {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
// // // // // // // //                 </span>
// // // // // // // //               </div>

// // // // // // // //               {/* Bubble */}
// // // // // // // //               <div
// // // // // // // //                 className={`px-4 py-2 shadow-sm text-sm break-words relative ${
// // // // // // // //                   isMe
// // // // // // // //                     ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
// // // // // // // //                     : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-200'
// // // // // // // //                 }`}
// // // // // // // //               >
// // // // // // // //                 {msg.attachment && (
// // // // // // // //                   <div className="mb-2">
// // // // // // // //                     {msg.attachment.type === 'image' ? (
// // // // // // // //                       <a href={getImageUrl(msg.attachment.url)} target="_blank" rel="noreferrer" aria-label="Lihat Gambar">
// // // // // // // //                         <img
// // // // // // // //                           src={getImageUrl(msg.attachment.url)}
// // // // // // // //                           alt="" 
// // // // // // // //                           className="max-w-full rounded-lg max-h-48 object-cover hover:opacity-90 transition-opacity"
// // // // // // // //                         />
// // // // // // // //                       </a>
// // // // // // // //                     ) : (
// // // // // // // //                       <a
// // // // // // // //                         href={getImageUrl(msg.attachment.url)}
// // // // // // // //                         target="_blank"
// // // // // // // //                         rel="noreferrer"
// // // // // // // //                         className={`flex items-center gap-2 p-2 rounded-lg ${
// // // // // // // //                           isMe ? 'bg-blue-700 text-white' : 'bg-gray-50 text-gray-800'
// // // // // // // //                         } hover:bg-opacity-80 transition-colors`}
// // // // // // // //                         aria-label="Download File"
// // // // // // // //                       >
// // // // // // // //                         <FileText size={16} aria-hidden="true" />
// // // // // // // //                         <span className="text-xs truncate max-w-[150px] font-medium underline">
// // // // // // // //                           {msg.attachment.name || 'Dokumen'}
// // // // // // // //                         </span>
// // // // // // // //                       </a>
// // // // // // // //                     )}
// // // // // // // //                   </div>
// // // // // // // //                 )}
// // // // // // // //                 {msg.message && <p>{msg.message}</p>}
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         );
// // // // // // // //       })}

// // // // // // // //       <div ref={messagesEndRef} />

// // // // // // // //       {showEmoji && (
// // // // // // // //         <div className="absolute bottom-2 left-4 z-20">
// // // // // // // //           <div className="fixed inset-0 z-10" onClick={() => setShowEmoji(false)} aria-hidden="true" role="presentation" />
// // // // // // // //           <div className="relative z-20 shadow-2xl rounded-xl">
// // // // // // // //             <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={350} />
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );

// // // // // // // //   return (
// // // // // // // //     <div
// // // // // // // //       className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
// // // // // // // //       role="dialog"
// // // // // // // //       aria-modal="true"
// // // // // // // //       aria-label="Ruang Diskusi"
// // // // // // // //     >
// // // // // // // //       <div className="bg-white w-full max-w-lg h-[650px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
// // // // // // // //         {/* Header */}
// // // // // // // //         <div className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md z-10">
// // // // // // // //           <h3 className="font-bold flex items-center gap-2">
// // // // // // // //             <MessageSquare size={20} aria-hidden="true" /> Ruang Diskusi
// // // // // // // //           </h3>
// // // // // // // //           <button
// // // // // // // //             onClick={onClose}
// // // // // // // //             className="hover:bg-gray-700 p-1.5 rounded-full"
// // // // // // // //             aria-label="Tutup Modal"
// // // // // // // //             title="Tutup"
// // // // // // // //           >
// // // // // // // //             <X size={20} aria-hidden="true" />
// // // // // // // //           </button>
// // // // // // // //         </div>

// // // // // // // //         {/* Tabs: Menggunakan struktur Split Button agar valid di mata Linter */}
// // // // // // // //         <div className="flex border-b bg-white z-10" role="tablist" aria-label="Jenis ruang chat">
// // // // // // // //           {/* PUBLIC TAB */}
// // // // // // // //           {isPublicSelected ? (
// // // // // // // //             <button
// // // // // // // //               role="tab"
// // // // // // // //               id="tab-public"
// // // // // // // //               aria-selected="true" // FIX: Literal String
// // // // // // // //               aria-controls="panel-public"
// // // // // // // //               tabIndex={0}
// // // // // // // //               onClick={() => setActiveTab('public')}
// // // // // // // //               className="flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2 border-blue-600 text-blue-600 bg-blue-50"
// // // // // // // //               aria-label="Kelas (Publik)"
// // // // // // // //             >
// // // // // // // //               <Users size={16} aria-hidden="true" /> Kelas (Publik)
// // // // // // // //             </button>
// // // // // // // //           ) : (
// // // // // // // //             <button
// // // // // // // //               role="tab"
// // // // // // // //               id="tab-public"
// // // // // // // //               aria-selected="false" // FIX: Literal String
// // // // // // // //               aria-controls="panel-public"
// // // // // // // //               tabIndex={-1}
// // // // // // // //               onClick={() => setActiveTab('public')}
// // // // // // // //               className="flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors text-gray-500 hover:bg-gray-50"
// // // // // // // //               aria-label="Kelas (Publik)"
// // // // // // // //             >
// // // // // // // //               <Users size={16} aria-hidden="true" /> Kelas (Publik)
// // // // // // // //             </button>
// // // // // // // //           )}

// // // // // // // //           {/* INTERNAL TAB */}
// // // // // // // //           {isInternalSelected ? (
// // // // // // // //             <button
// // // // // // // //               role="tab"
// // // // // // // //               id="tab-internal"
// // // // // // // //               aria-selected="true" // FIX: Literal String
// // // // // // // //               aria-controls="panel-internal"
// // // // // // // //               tabIndex={0}
// // // // // // // //               onClick={() => setActiveTab('internal')}
// // // // // // // //               className="flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2 border-purple-600 text-purple-600 bg-purple-50"
// // // // // // // //               aria-label="Tim Internal"
// // // // // // // //             >
// // // // // // // //               <Briefcase size={16} aria-hidden="true" /> Tim Internal
// // // // // // // //             </button>
// // // // // // // //           ) : (
// // // // // // // //             <button
// // // // // // // //               role="tab"
// // // // // // // //               id="tab-internal"
// // // // // // // //               aria-selected="false" // FIX: Literal String
// // // // // // // //               aria-controls="panel-internal"
// // // // // // // //               tabIndex={-1}
// // // // // // // //               onClick={() => setActiveTab('internal')}
// // // // // // // //               className="flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors text-gray-500 hover:bg-gray-50"
// // // // // // // //               aria-label="Tim Internal"
// // // // // // // //             >
// // // // // // // //               <Briefcase size={16} aria-hidden="true" /> Tim Internal
// // // // // // // //             </button>
// // // // // // // //           )}
// // // // // // // //         </div>

// // // // // // // //         {/* Panel */}
// // // // // // // //         <div
// // // // // // // //           id="panel-public"
// // // // // // // //           role="tabpanel"
// // // // // // // //           aria-labelledby="tab-public"
// // // // // // // //           hidden={!isPublicSelected}
// // // // // // // //           className={`flex-1 flex flex-col ${!isPublicSelected ? 'hidden' : ''}`}
// // // // // // // //         >
// // // // // // // //           <ChatPanel />
// // // // // // // //         </div>

// // // // // // // //         <div
// // // // // // // //           id="panel-internal"
// // // // // // // //           role="tabpanel"
// // // // // // // //           aria-labelledby="tab-internal"
// // // // // // // //           hidden={!isInternalSelected}
// // // // // // // //           className={`flex-1 flex flex-col ${!isInternalSelected ? 'hidden' : ''}`}
// // // // // // // //         >
// // // // // // // //           <ChatPanel />
// // // // // // // //         </div>

// // // // // // // //         {/* Attachment Preview */}
// // // // // // // //         {attachment && (
// // // // // // // //           <div className="px-4 py-2 bg-gray-50 border-t flex items-center justify-between animate-in slide-in-from-bottom-2">
// // // // // // // //             <div className="flex items-center gap-3">
// // // // // // // //               <div className="p-2 bg-white border rounded-lg">
// // // // // // // //                 {attachment.type === 'image'
// // // // // // // //                   ? <ImageIcon size={20} className="text-purple-600" aria-hidden="true" />
// // // // // // // //                   : <FileText size={20} className="text-blue-600" aria-hidden="true" />}
// // // // // // // //               </div>
// // // // // // // //               <div className="text-xs">
// // // // // // // //                 <p className="font-bold text-gray-700 truncate max-w-[200px]">{attachment.name}</p>
// // // // // // // //                 <p className="text-gray-400">Siap dikirim</p>
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //             <button
// // // // // // // //               onClick={handleRemoveAttachment}
// // // // // // // //               className="text-red-500 hover:bg-red-50 p-1 rounded-full"
// // // // // // // //               aria-label="Hapus Lampiran"
// // // // // // // //               title="Hapus"
// // // // // // // //             >
// // // // // // // //               <X size={16} aria-hidden="true" />
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         )}

// // // // // // // //         {/* Input Area */}
// // // // // // // //         <form onSubmit={handleSend} className="p-3 bg-white border-t flex items-center gap-2">
// // // // // // // //           {/* FIX: Emoji Button di-split agar aria-expanded menggunakan string literal */}
// // // // // // // //           {showEmoji ? (
// // // // // // // //             <button
// // // // // // // //               type="button"
// // // // // // // //               onClick={() => setShowEmoji(false)}
// // // // // // // //               className="text-yellow-500 hover:text-yellow-600 p-2 rounded-full transition-colors"
// // // // // // // //               aria-label="Tutup Emoji"
// // // // // // // //               aria-expanded="true" // Valid String Literal
// // // // // // // //               title="Tutup Emoji"
// // // // // // // //             >
// // // // // // // //               <Smile size={20} aria-hidden="true" />
// // // // // // // //             </button>
// // // // // // // //           ) : (
// // // // // // // //             <button
// // // // // // // //               type="button"
// // // // // // // //               onClick={() => setShowEmoji(true)}
// // // // // // // //               className="text-gray-400 hover:text-yellow-500 p-2 rounded-full transition-colors"
// // // // // // // //               aria-label="Buka Emoji"
// // // // // // // //               aria-expanded="false" // Valid String Literal
// // // // // // // //               title="Buka Emoji"
// // // // // // // //             >
// // // // // // // //               <Smile size={20} aria-hidden="true" />
// // // // // // // //             </button>
// // // // // // // //           )}

// // // // // // // //           <button
// // // // // // // //             type="button"
// // // // // // // //             onClick={() => fileInputRef.current?.click()}
// // // // // // // //             className="text-gray-400 hover:text-blue-500 p-2 rounded-full transition-colors"
// // // // // // // //             aria-label="Upload File"
// // // // // // // //             title="Upload"
// // // // // // // //           >
// // // // // // // //             <Paperclip size={20} aria-hidden="true" />
// // // // // // // //           </button>

// // // // // // // //           <input
// // // // // // // //             type="file"
// // // // // // // //             ref={fileInputRef}
// // // // // // // //             className="hidden"
// // // // // // // //             onChange={handleFileChange}
// // // // // // // //             aria-label="Pilih file"
// // // // // // // //             title="Pilih file"
// // // // // // // //           />

// // // // // // // //           <input
// // // // // // // //             className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
// // // // // // // //             placeholder={isUploading ? 'Mengupload...' : 'Ketik pesan...'}
// // // // // // // //             value={newMessage}
// // // // // // // //             onChange={e => setNewMessage(e.target.value)}
// // // // // // // //             disabled={isUploading}
// // // // // // // //             aria-label="Tulis Pesan"
// // // // // // // //           />

// // // // // // // //           <button
// // // // // // // //             type="submit"
// // // // // // // //             disabled={isUploading || (!newMessage && !attachment)}
// // // // // // // //             className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2.5 rounded-full shadow-lg transition-transform active:scale-90"
// // // // // // // //             aria-label="Kirim Pesan"
// // // // // // // //             title="Kirim"
// // // // // // // //           >
// // // // // // // //             <Send size={18} aria-hidden="true" />
// // // // // // // //           </button>
// // // // // // // //         </form>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // /* =========================================================================
// // // // // // // //    PERSONAL CHAT MODAL
// // // // // // // //    ========================================================================= */
// // // // // // // // function PersonalChatModal({ student, onClose }: any) {
// // // // // // // //   const [messages, setMessages] = useState<any[]>([]);
// // // // // // // //   const [newMessage, setNewMessage] = useState('');
// // // // // // // //   const messagesEndRef = useRef<HTMLDivElement>(null);
// // // // // // // //   const targetId = student.user?._id || student._id;
// // // // // // // //   const targetName = student.user?.name || student.name || 'User';

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (targetId) loadHistory();
// // // // // // // //     const interval = setInterval(() => { if (targetId) loadHistory(); }, 5000);
// // // // // // // //     return () => clearInterval(interval);
// // // // // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // // // // //   }, [targetId]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // // // // //   }, [messages]);

// // // // // // // //   const loadHistory = async () => {
// // // // // // // //     try {
// // // // // // // //       const res = await api(`/api/chat/${targetId}?t=${Date.now()}`);
// // // // // // // //       setMessages(res.messages || []);
// // // // // // // //     } catch (e) { console.error(e); }
// // // // // // // //   };

// // // // // // // //   const handleSend = async (e: React.FormEvent) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     if (!newMessage.trim()) return;
// // // // // // // //     const msgToSend = newMessage;
// // // // // // // //     setNewMessage('');
// // // // // // // //     try {
// // // // // // // //       await api('/api/chat/send', { method: 'POST', body: { recipientId: targetId, message: msgToSend } });
// // // // // // // //       loadHistory();
// // // // // // // //     } catch (error: any) { alert('Gagal: ' + error.message); }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div
// // // // // // // //       className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4"
// // // // // // // //       role="dialog"
// // // // // // // //       aria-modal="true"
// // // // // // // //       aria-label={`Chat Personal dengan ${targetName}`}
// // // // // // // //     >
// // // // // // // //       <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95">
// // // // // // // //         <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
// // // // // // // //           <div className="font-bold flex items-center gap-2">
// // // // // // // //             <MessageCircle size={18} aria-hidden="true" /> Chat: {targetName}
// // // // // // // //           </div>
// // // // // // // //           <button
// // // // // // // //             onClick={onClose}
// // // // // // // //             className="hover:bg-indigo-700 p-1 rounded"
// // // // // // // //             aria-label="Tutup Chat"
// // // // // // // //             title="Tutup Chat"
// // // // // // // //           >
// // // // // // // //             <X size={18} aria-hidden="true" />
// // // // // // // //           </button>
// // // // // // // //         </div>

// // // // // // // //         <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-2">
// // // // // // // //           {messages.map((msg: any, i: number) => (
// // // // // // // //             <div
// // // // // // // //               key={i}
// // // // // // // //               className={`p-2 rounded-lg text-sm max-w-[80%] ${msg.sender === 'me' ? 'bg-indigo-100 ml-auto text-right' : 'bg-white border'}`}
// // // // // // // //             >
// // // // // // // //               {msg.message}
// // // // // // // //             </div>
// // // // // // // //           ))}
// // // // // // // //           <div ref={messagesEndRef} />
// // // // // // // //         </div>

// // // // // // // //         <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
// // // // // // // //           <input
// // // // // // // //             className="flex-1 border rounded-full px-3 py-1.5 text-sm"
// // // // // // // //             value={newMessage}
// // // // // // // //             onChange={e => setNewMessage(e.target.value)}
// // // // // // // //             placeholder="Tulis..."
// // // // // // // //             aria-label="Input pesan personal"
// // // // // // // //           />
// // // // // // // //           <button
// // // // // // // //             type="submit"
// // // // // // // //             className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
// // // // // // // //             aria-label="Kirim"
// // // // // // // //             title="Kirim"
// // // // // // // //           >
// // // // // // // //             <Send size={14} aria-hidden="true" />
// // // // // // // //           </button>
// // // // // // // //         </form>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // /* =========================================================================
// // // // // // // //    MAIN DASHBOARD
// // // // // // // //    ========================================================================= */
// // // // // // // // interface CourseOperatorProps { courseId: string; course: any; }

// // // // // // // // export default function CourseOperatorDashboard({ courseId, course }: CourseOperatorProps) {
// // // // // // // //   const [participants, setParticipants] = useState<any[]>([]);
// // // // // // // //   const [loadingParticipants, setLoadingParticipants] = useState(false);
// // // // // // // //   const [participantFilter, setParticipantFilter] = useState('');
// // // // // // // //   const [actionOptions, setActionOptions] = useState<any[]>([]);
// // // // // // // //   const [selectedActionId, setSelectedActionId] = useState<string>('');
// // // // // // // //   const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
// // // // // // // //   const [showGroupChat, setShowGroupChat] = useState(false);
// // // // // // // //   const [studentDetail, setStudentDetail] = useState<any>(null);
// // // // // // // //   const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);

// // // // // // // //   const totalLessons = course?.modules?.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0) || 0;

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (course?.modules) {
// // // // // // // //       const opts: any[] = [];
// // // // // // // //       course.modules.forEach((m: any) => {
// // // // // // // //         m.lessons?.forEach((l: any) => {
// // // // // // // //           let label = l.title;
// // // // // // // //           if (l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
// // // // // // // //           else if (l.type === 'essay') label = `📝 Esai: ${l.title}`;
// // // // // // // //           else if (l.type === 'upload_doc') label = `📤 Upload: ${l.title}`;
// // // // // // // //           opts.push({ id: l._id, label, type: l.type });
// // // // // // // //         });
// // // // // // // //       });
// // // // // // // //       setActionOptions(opts);
// // // // // // // //     }
// // // // // // // //   }, [course]);

// // // // // // // //   const fetchParticipants = async () => {
// // // // // // // //     setLoadingParticipants(true);
// // // // // // // //     try {
// // // // // // // //       const res = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`);
// // // // // // // //       setParticipants(res.participants || []);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Gagal load peserta');
// // // // // // // //     } finally {
// // // // // // // //       setLoadingParticipants(false);
// // // // // // // //     }
// // // // // // // //   };
// // // // // // // //   useEffect(() => { fetchParticipants(); }, [courseId]);

// // // // // // // //   const handleVerifyEnrollment = async (enrollmentId: string, action: 'approve' | 'reject', studentName: string) => {
// // // // // // // //     if (!confirm(`Konfirmasi ${action} untuk ${studentName}?`)) return;
// // // // // // // //     try {
// // // // // // // //       await api('/api/courses/verify-enrollment', { method: 'POST', body: { enrollmentId, action } });
// // // // // // // //       alert('Berhasil.');
// // // // // // // //       fetchParticipants();
// // // // // // // //     } catch (e: any) { alert(e.message); }
// // // // // // // //   };

// // // // // // // //   const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => {
// // // // // // // //     if (!selectedActionId) return alert('Pilih Materi dulu!');
// // // // // // // //     const realUserId =
// // // // // // // //       participants.find(p => (p.user?._id === studentId) || (p.user === studentId))?.user?._id || studentId;

// // // // // // // //     if (action === 'pass') {
// // // // // // // //       if (!confirm('Luluskan peserta ini manual?')) return;
// // // // // // // //       try {
// // // // // // // //         await api(`/api/courses/mark-complete-lesson`, {
// // // // // // // //           method: 'POST',
// // // // // // // //           body: { studentId: realUserId, lessonId: selectedActionId, courseId }
// // // // // // // //         });
// // // // // // // //         alert('Berhasil diluluskan!');
// // // // // // // //         fetchParticipants();
// // // // // // // //       } catch (e: any) { alert(e.message); }
// // // // // // // //     } else if (action === 'reset') {
// // // // // // // //       if (!confirm('Reset progress materi ini?')) return;
// // // // // // // //       try {
// // // // // // // //         await api(`/api/courses/reset-quiz`, {
// // // // // // // //           method: 'POST',
// // // // // // // //           body: { studentId: realUserId, quizId: selectedActionId }
// // // // // // // //         });
// // // // // // // //         alert('Reset berhasil!');
// // // // // // // //         fetchParticipants();
// // // // // // // //       } catch (e: any) { alert(e.message); }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleRejectParticipant = async (enrollmentId: string) => {
// // // // // // // //     if (!confirm('Hapus permanen peserta ini?')) return;
// // // // // // // //     try {
// // // // // // // //       await api(`/api/enrollments/${enrollmentId}`, { method: 'DELETE' });
// // // // // // // //       alert('Dihapus.');
// // // // // // // //       fetchParticipants();
// // // // // // // //     } catch (e: any) { alert(e.message); }
// // // // // // // //   };

// // // // // // // //   const pendingParticipants = participants.filter(p => {
// // // // // // // //     const s = (p.status || '').toLowerCase();
// // // // // // // //     return !s || s === 'pending' || s === 'waiting';
// // // // // // // //   });
// // // // // // // //   const activeParticipants = participants.filter(p => {
// // // // // // // //     const s = (p.status || '').toLowerCase();
// // // // // // // //     return s === 'active' || s === 'approved';
// // // // // // // //   });
// // // // // // // //   const passedStudents = participants.filter(p => p.progress >= 100 || p.isCompleted).length;

// // // // // // // //   if (loadingParticipants && participants.length === 0) {
// // // // // // // //     return (
// // // // // // // //       <div className="p-10 text-center text-gray-500">
// // // // // // // //         <RefreshCw className="animate-spin inline-block mr-2" size={18} aria-hidden="true" /> Memuat data...
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <div className="space-y-8 animate-in slide-in-from-right-4">
// // // // // // // //       {/* Header Stats */}
// // // // // // // //       <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100">
// // // // // // // //         <div className="flex gap-6">
// // // // // // // //           <div className="text-center">
// // // // // // // //             <span className="block text-2xl font-bold text-gray-800">{participants.length}</span>
// // // // // // // //             <span className="text-[10px] text-gray-500 uppercase font-bold">Total</span>
// // // // // // // //           </div>
// // // // // // // //           <div className="text-center">
// // // // // // // //             <span className="block text-2xl font-bold text-green-600">{passedStudents}</span>
// // // // // // // //             <span className="text-[10px] text-gray-500 uppercase font-bold">Lulus</span>
// // // // // // // //           </div>
// // // // // // // //           <div className="text-center">
// // // // // // // //             <span className="block text-2xl font-bold text-orange-500">{activeParticipants.length}</span>
// // // // // // // //             <span className="text-[10px] text-gray-500 uppercase font-bold">Aktif</span>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //         <button
// // // // // // // //           onClick={() => setShowGroupChat(true)}
// // // // // // // //           className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg hover:bg-indigo-700 flex items-center gap-2 transition-transform active:scale-95"
// // // // // // // //           aria-label="Buka Ruang Diskusi"
// // // // // // // //           title="Ruang Diskusi"
// // // // // // // //         >
// // // // // // // //           <MessageSquare size={18} aria-hidden="true" /> Ruang Diskusi
// // // // // // // //         </button>
// // // // // // // //       </div>

// // // // // // // //       {/* TABEL PENDING */}
// // // // // // // //       <div className="bg-amber-50 border border-amber-200 rounded-2xl shadow-sm overflow-hidden mb-6">
// // // // // // // //         <div className="px-6 py-3 border-b border-amber-200 bg-amber-100 flex items-center gap-2">
// // // // // // // //           <AlertCircle className="text-amber-600" size={18} aria-hidden="true" />
// // // // // // // //           <h3 className="font-bold text-amber-900 text-sm">Menunggu Persetujuan ({pendingParticipants.length})</h3>
// // // // // // // //         </div>

// // // // // // // //         {pendingParticipants.length === 0 ? (
// // // // // // // //           <div className="p-6 text-center text-gray-400 text-sm italic">Tidak ada antrian.</div>
// // // // // // // //         ) : (
// // // // // // // //           <div className="overflow-x-auto">
// // // // // // // //             <table className="w-full text-left text-sm">
// // // // // // // //               <tbody className="divide-y divide-amber-200">
// // // // // // // //                 {pendingParticipants.map((p: any) => (
// // // // // // // //                   <tr key={p._id} className="hover:bg-amber-100/50">
// // // // // // // //                     <td className="p-3 font-bold">{p.user?.name}</td>
// // // // // // // //                     <td className="p-3 text-gray-500">{p.user?.email}</td>
// // // // // // // //                     <td className="p-3 text-right">
// // // // // // // //                       <button
// // // // // // // //                         onClick={() => handleVerifyEnrollment(p._id, 'approve', p.user?.name)}
// // // // // // // //                         className="text-green-700 font-bold hover:underline mr-4"
// // // // // // // //                         aria-label={`Setujui ${p.user?.name}`}
// // // // // // // //                       >
// // // // // // // //                         Setujui
// // // // // // // //                       </button>
// // // // // // // //                       <button
// // // // // // // //                         onClick={() => handleVerifyEnrollment(p._id, 'reject', p.user?.name)}
// // // // // // // //                         className="text-red-600 font-bold hover:underline"
// // // // // // // //                         aria-label={`Tolak ${p.user?.name}`}
// // // // // // // //                       >
// // // // // // // //                         Tolak
// // // // // // // //                       </button>
// // // // // // // //                     </td>
// // // // // // // //                   </tr>
// // // // // // // //                 ))}
// // // // // // // //               </tbody>
// // // // // // // //             </table>
// // // // // // // //           </div>
// // // // // // // //         )}
// // // // // // // //       </div>

// // // // // // // //       {/* TABEL AKTIF */}
// // // // // // // //       <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
// // // // // // // //         <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-wrap gap-4">
// // // // // // // //           <h3 className="font-bold text-gray-800 flex items-center gap-2">
// // // // // // // //             <Users size={18} aria-hidden="true" /> Peserta Aktif
// // // // // // // //           </h3>
// // // // // // // //           <div className="flex gap-2">
// // // // // // // //             <select
// // // // // // // //               className="p-1.5 border rounded text-xs bg-white h-9 focus:ring-2 focus:ring-indigo-500 outline-none"
// // // // // // // //               value={selectedActionId}
// // // // // // // //               onChange={e => setSelectedActionId(e.target.value)}
// // // // // // // //               aria-label="Pilih Materi untuk Aksi Cepat"
// // // // // // // //             >
// // // // // // // //               <option value="">-- Aksi Cepat --</option>
// // // // // // // //               {actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
// // // // // // // //             </select>

// // // // // // // //             <input
// // // // // // // //               className="px-3 py-1.5 rounded border text-xs h-9 focus:ring-2 focus:ring-indigo-500 outline-none"
// // // // // // // //               placeholder="Cari..."
// // // // // // // //               value={participantFilter}
// // // // // // // //               onChange={e => setParticipantFilter(e.target.value)}
// // // // // // // //               aria-label="Cari peserta"
// // // // // // // //             />

// // // // // // // //             <button
// // // // // // // //               onClick={fetchParticipants}
// // // // // // // //               className="bg-white border p-1.5 rounded h-9 w-9 flex justify-center items-center hover:bg-gray-100"
// // // // // // // //               aria-label="Refresh Data"
// // // // // // // //               title="Refresh Data"
// // // // // // // //             >
// // // // // // // //               <RefreshCw size={14} aria-hidden="true" />
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //         <div className="overflow-x-auto">
// // // // // // // //           <table className="w-full text-left border-collapse text-sm">
// // // // // // // //             <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b">
// // // // // // // //               <tr>
// // // // // // // //                 <th className="p-4">Peserta</th>
// // // // // // // //                 <th className="p-4">Sedang Mengerjakan</th>
// // // // // // // //                 <th className="p-4">Progress</th>
// // // // // // // //                 <th className="p-4 text-center">Status</th>
// // // // // // // //                 <th className="p-4 text-center">Aksi Cepat</th>
// // // // // // // //                 <th className="p-4 text-center">Chat</th>
// // // // // // // //                 <th className="p-4 text-center">Detail</th>
// // // // // // // //                 <th className="p-4 text-center">Hapus</th>
// // // // // // // //               </tr>
// // // // // // // //             </thead>

// // // // // // // //             <tbody className="divide-y divide-gray-100">
// // // // // // // //               {activeParticipants
// // // // // // // //                 .filter(p => (p.user?.name || '').toLowerCase().includes(participantFilter.toLowerCase()))
// // // // // // // //                 .map((p: any, idx: number) => {
// // // // // // // //                   const rawProgress = Number(p.progress);
// // // // // // // //                   const progressValue = Number.isFinite(rawProgress)
// // // // // // // //                     ? Math.max(0, Math.min(100, Math.round(rawProgress)))
// // // // // // // //                     : 0;

// // // // // // // //                   const isActionCompleted = selectedActionId && p.completedLessons?.includes(selectedActionId);

// // // // // // // //                   return (
// // // // // // // //                     <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
// // // // // // // //                       <td className="p-4">
// // // // // // // //                         <div className="font-bold text-gray-900">{p.user?.name}</div>
// // // // // // // //                         <div className="text-xs text-gray-500">{p.user?.email}</div>
// // // // // // // //                       </td>

// // // // // // // //                       <td className="p-4">
// // // // // // // //                         <div className="flex items-center gap-2 text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 w-fit">
// // // // // // // //                           <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
// // // // // // // //                           {p.currentPosition || 'Belum Memulai'}
// // // // // // // //                         </div>
// // // // // // // //                       </td>

// // // // // // // //                       <td className="p-4 w-44">
// // // // // // // //                         <div className="flex justify-between text-xs font-bold mb-1">
// // // // // // // //                           <span>{progressValue}%</span>
// // // // // // // //                         </div>

// // // // // // // //                         {/* Native progress (tanpa inline styles) */}
// // // // // // // //                         <progress
// // // // // // // //                           max={100}
// // // // // // // //                           value={progressValue}
// // // // // // // //                           aria-label="Kemajuan peserta"
// // // // // // // //                           className="w-full h-1.5
// // // // // // // //                                      [&::-webkit-progress-bar]:bg-gray-100
// // // // // // // //                                      [&::-webkit-progress-value]:bg-blue-500"
// // // // // // // //                         />
// // // // // // // //                       </td>

// // // // // // // //                       <td className="p-4 text-center">
// // // // // // // //                         {progressValue === 100 ? (
// // // // // // // //                           <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">LULUS</span>
// // // // // // // //                         ) : (
// // // // // // // //                           <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">PROSES</span>
// // // // // // // //                         )}
// // // // // // // //                       </td>

// // // // // // // //                       <td className="p-4 text-center">
// // // // // // // //                         {selectedActionId ? (
// // // // // // // //                           <button
// // // // // // // //                             onClick={() => handleParticipantAction(p.user?._id, 'pass')}
// // // // // // // //                             disabled={isActionCompleted}
// // // // // // // //                             className={`px-2 py-1 rounded text-xs font-bold border ${isActionCompleted ? 'bg-gray-100 text-gray-400' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
// // // // // // // //                             aria-label={isActionCompleted ? 'Materi Selesai' : 'Luluskan Materi'}
// // // // // // // //                             title={isActionCompleted ? 'Materi Selesai' : 'Luluskan Materi'}
// // // // // // // //                           >
// // // // // // // //                             {isActionCompleted ? 'Selesai' : 'Luluskan'}
// // // // // // // //                           </button>
// // // // // // // //                         ) : '-'}
// // // // // // // //                       </td>

// // // // // // // //                       <td className="p-4 text-center">
// // // // // // // //                         <button
// // // // // // // //                           onClick={() => setChatTargetStudent(p)}
// // // // // // // //                           className="text-gray-400 hover:text-blue-600"
// // // // // // // //                           aria-label={`Chat dengan ${p.user?.name}`}
// // // // // // // //                           title="Chat"
// // // // // // // //                         >
// // // // // // // //                           <MessageCircle size={18} aria-hidden="true" />
// // // // // // // //                         </button>
// // // // // // // //                       </td>

// // // // // // // //                       <td className="p-4 text-center">
// // // // // // // //                         <button
// // // // // // // //                           onClick={() => { setStudentDetail(p); setShowStudentDetailModal(true); }}
// // // // // // // //                           className="text-gray-400 hover:text-indigo-600"
// // // // // // // //                           aria-label={`Detail ${p.user?.name}`}
// // // // // // // //                           title="Detail"
// // // // // // // //                         >
// // // // // // // //                           <Eye size={18} aria-hidden="true" />
// // // // // // // //                         </button>
// // // // // // // //                       </td>

// // // // // // // //                       <td className="p-4 text-center">
// // // // // // // //                         <button
// // // // // // // //                           onClick={() => handleRejectParticipant(p._id)}
// // // // // // // //                           className="text-gray-300 hover:text-red-600"
// // // // // // // //                           aria-label={`Hapus ${p.user?.name}`}
// // // // // // // //                           title="Hapus"
// // // // // // // //                         >
// // // // // // // //                           <Trash2 size={16} aria-hidden="true" />
// // // // // // // //                         </button>
// // // // // // // //                       </td>
// // // // // // // //                     </tr>
// // // // // // // //                   );
// // // // // // // //                 })}
// // // // // // // //             </tbody>
// // // // // // // //           </table>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* MODALS */}
// // // // // // // //       {chatTargetStudent && (
// // // // // // // //         <PersonalChatModal student={chatTargetStudent} onClose={() => setChatTargetStudent(null)} />
// // // // // // // //       )}

// // // // // // // //       {showGroupChat && (
// // // // // // // //         <GroupChatModal courseId={courseId} onClose={() => setShowGroupChat(false)} />
// // // // // // // //       )}

// // // // // // // //       {showStudentDetailModal && studentDetail && (
// // // // // // // //         <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
// // // // // // // //           <div
// // // // // // // //             className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
// // // // // // // //             role="dialog"
// // // // // // // //             aria-modal="true"
// // // // // // // //             aria-label="Detail Peserta"
// // // // // // // //           >
// // // // // // // //             <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
// // // // // // // //               <h3 className="font-bold flex items-center gap-2">
// // // // // // // //                 <Users size={20} aria-hidden="true" /> Detail: {studentDetail.user?.name}
// // // // // // // //               </h3>
// // // // // // // //               <button
// // // // // // // //                 onClick={() => setShowStudentDetailModal(false)}
// // // // // // // //                 aria-label="Tutup Modal"
// // // // // // // //                 title="Tutup"
// // // // // // // //               >
// // // // // // // //                 <X size={24} aria-hidden="true" />
// // // // // // // //               </button>
// // // // // // // //             </div>

// // // // // // // //             <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
// // // // // // // //               {course?.modules?.map((m: any) => (
// // // // // // // //                 <div key={m._id} className="bg-white border rounded-xl overflow-hidden shadow-sm">
// // // // // // // //                   <div className="bg-gray-100 px-4 py-2 border-b font-bold text-sm text-gray-700">{m.title}</div>
// // // // // // // //                   <div className="divide-y">
// // // // // // // //                     {m.lessons.map((l: any) => {
// // // // // // // //                       const isDone = studentDetail.completedLessons?.includes(l._id);
// // // // // // // //                       return (
// // // // // // // //                         <div key={l._id} className="p-3 flex justify-between items-center hover:bg-gray-50">
// // // // // // // //                           <div className="flex items-center gap-3">
// // // // // // // //                             <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isDone ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>
// // // // // // // //                               {isDone && <Check size={12} aria-hidden="true" />}
// // // // // // // //                             </div>
// // // // // // // //                             <span className={`text-sm ${isDone ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{l.title}</span>
// // // // // // // //                           </div>
// // // // // // // //                           <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">{l.type}</span>
// // // // // // // //                         </div>
// // // // // // // //                       );
// // // // // // // //                     })}
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               ))}
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // 'use client';

// // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // import dynamic from 'next/dynamic';
// // // // // // // import {
// // // // // // //   RefreshCw, Users, Eye, MessageCircle, Trash2, Check, X, Send, Smile, 
// // // // // // //   MessageSquare, Briefcase, Paperclip, Image as ImageIcon, FileText, 
// // // // // // //   AlertCircle, Award
// // // // // // // } from 'lucide-react';

// // // // // // // const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

// // // // // // // /* =========================================================================
// // // // // // //    GROUP CHAT MODAL
// // // // // // //    ========================================================================= */
// // // // // // // function GroupChatModal({ courseId, onClose }: any) {
// // // // // // //   const [activeTab, setActiveTab] = useState<'internal' | 'public'>('public');
// // // // // // //   const [messages, setMessages] = useState<any[]>([]);
// // // // // // //   const [newMessage, setNewMessage] = useState('');
// // // // // // //   const [showEmoji, setShowEmoji] = useState(false);
// // // // // // //   const [attachment, setAttachment] = useState<any>(null);
// // // // // // //   const [isUploading, setIsUploading] = useState(false);

// // // // // // //   const messagesEndRef = useRef<HTMLDivElement>(null);
// // // // // // //   const fileInputRef = useRef<HTMLInputElement>(null);

// // // // // // //   useEffect(() => {
// // // // // // //     loadMessages();
// // // // // // //     const interval = setInterval(loadMessages, 3000);
// // // // // // //     return () => clearInterval(interval);
// // // // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // // // //   }, [courseId, activeTab]);

// // // // // // //   useEffect(() => {
// // // // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // // // //   }, [messages]);

// // // // // // //   const loadMessages = async () => {
// // // // // // //     try {
// // // // // // //       const res = await api(`/api/courses/${courseId}/chat-group?type=${activeTab}`);
// // // // // // //       setMessages(res || []);
// // // // // // //     } catch (e) { console.error('Chat error', e); }
// // // // // // //   };

// // // // // // //   const onEmojiClick = (emojiObject: any) => {
// // // // // // //     setNewMessage(prev => prev + emojiObject.emoji);
// // // // // // //     setShowEmoji(false);
// // // // // // //   };

// // // // // // //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //     const file = e.target.files?.[0];
// // // // // // //     if (!file) return;
// // // // // // //     setIsUploading(true);
// // // // // // //     try {
// // // // // // //       const formData = new FormData();
// // // // // // //       formData.append('file', file);
// // // // // // //       const res = await apiUpload('/api/upload', formData);
// // // // // // //       const fileUrl = res.url || res.file?.url;
// // // // // // //       const type = file.type.startsWith('image/') ? 'image' : 'file';
// // // // // // //       setAttachment({ url: fileUrl, type, name: file.name });
// // // // // // //     } catch (error: any) {
// // // // // // //       alert('Gagal upload file: ' + error.message);
// // // // // // //     } finally {
// // // // // // //       setIsUploading(false);
// // // // // // //       if (fileInputRef.current) fileInputRef.current.value = '';
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleRemoveAttachment = () => setAttachment(null);

// // // // // // //   const handleSend = async (e: React.FormEvent) => {
// // // // // // //     e.preventDefault();
// // // // // // //     if ((!newMessage.trim() && !attachment) || isUploading) return;

// // // // // // //     const tempMsg = {
// // // // // // //       _id: Date.now(),
// // // // // // //       sender: { name: 'Saya', role: 'me' },
// // // // // // //       message: newMessage,
// // // // // // //       attachment,
// // // // // // //       createdAt: new Date().toISOString()
// // // // // // //     };
// // // // // // //     setMessages(prev => [...prev, tempMsg]);

// // // // // // //     const payload = { text: newMessage, type: activeTab, attachment };
// // // // // // //     setNewMessage(''); setAttachment(null);

// // // // // // //     try {
// // // // // // //       await api(`/api/courses/${courseId}/chat-group`, { method: 'POST', body: payload });
// // // // // // //       loadMessages();
// // // // // // //     } catch (e: any) {
// // // // // // //       alert('Gagal kirim: ' + e.message);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const isPublicSelected = activeTab === 'public';
// // // // // // //   const isInternalSelected = activeTab === 'internal';

// // // // // // //   const ChatPanel = () => (
// // // // // // //     <div className="flex-1 bg-gray-100 p-4 overflow-y-auto space-y-4 relative h-full">
// // // // // // //       {messages.length === 0 && (
// // // // // // //         <div className="text-center text-gray-400 text-xs mt-10 p-4 bg-white rounded-lg shadow-sm border border-dashed">
// // // // // // //           <p className="font-bold mb-1">Belum ada percakapan.</p>
// // // // // // //           <p>Mulai diskusi di {isPublicSelected ? 'Kelas' : 'Tim Internal'} sekarang!</p>
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       {messages.map((msg: any) => {
// // // // // // //         const isMe = msg.sender?.role === 'me' || msg.sender?._id === 'current_user_id';
// // // // // // //         return (
// // // // // // //           <div key={msg._id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
// // // // // // //             <div className={`flex max-w-[85%] flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// // // // // // //               <div className="flex items-center gap-2 mb-1 px-1">
// // // // // // //                 {!isMe && (
// // // // // // //                   <div className="w-5 h-5 rounded-full bg-gray-300 overflow-hidden flex-shrink-0" aria-hidden="true">
// // // // // // //                     {msg.sender?.avatarUrl ? (
// // // // // // //                       <img src={getImageUrl(msg.sender.avatarUrl)} alt="" className="w-full h-full object-cover" />
// // // // // // //                     ) : (
// // // // // // //                       <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-gray-600">
// // // // // // //                         {(msg.sender?.name || '?').charAt(0)}
// // // // // // //                       </div>
// // // // // // //                     )}
// // // // // // //                   </div>
// // // // // // //                 )}
// // // // // // //                 <span className="text-[10px] font-bold text-gray-600">{msg.sender?.name || 'User'}</span>
// // // // // // //                 <span className="text-[9px] text-gray-400">
// // // // // // //                   {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
// // // // // // //                 </span>
// // // // // // //               </div>

// // // // // // //               <div
// // // // // // //                 className={`px-4 py-2 shadow-sm text-sm break-words relative ${
// // // // // // //                   isMe
// // // // // // //                     ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
// // // // // // //                     : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-200'
// // // // // // //                 }`}
// // // // // // //               >
// // // // // // //                 {msg.attachment && (
// // // // // // //                   <div className="mb-2">
// // // // // // //                     {msg.attachment.type === 'image' ? (
// // // // // // //                       <a href={getImageUrl(msg.attachment.url)} target="_blank" rel="noreferrer" aria-label="Lihat Gambar" title="Lihat Gambar Full">
// // // // // // //                         <img
// // // // // // //                           src={getImageUrl(msg.attachment.url)}
// // // // // // //                           alt="" 
// // // // // // //                           className="max-w-full rounded-lg max-h-48 object-cover hover:opacity-90 transition-opacity"
// // // // // // //                         />
// // // // // // //                       </a>
// // // // // // //                     ) : (
// // // // // // //                       <a
// // // // // // //                         href={getImageUrl(msg.attachment.url)}
// // // // // // //                         target="_blank"
// // // // // // //                         rel="noreferrer"
// // // // // // //                         className={`flex items-center gap-2 p-2 rounded-lg ${
// // // // // // //                           isMe ? 'bg-blue-700 text-white' : 'bg-gray-50 text-gray-800'
// // // // // // //                         } hover:bg-opacity-80 transition-colors`}
// // // // // // //                         aria-label="Download File"
// // // // // // //                         title="Download File"
// // // // // // //                       >
// // // // // // //                         <FileText size={16} aria-hidden="true" />
// // // // // // //                         <span className="text-xs truncate max-w-[150px] font-medium underline">
// // // // // // //                           {msg.attachment.name || 'Dokumen'}
// // // // // // //                         </span>
// // // // // // //                       </a>
// // // // // // //                     )}
// // // // // // //                   </div>
// // // // // // //                 )}
// // // // // // //                 {msg.message && <p>{msg.message}</p>}
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         );
// // // // // // //       })}

// // // // // // //       <div ref={messagesEndRef} />

// // // // // // //       {showEmoji && (
// // // // // // //         <div className="absolute bottom-2 left-4 z-20">
// // // // // // //           <div className="fixed inset-0 z-10" onClick={() => setShowEmoji(false)} aria-hidden="true" role="presentation" />
// // // // // // //           <div className="relative z-20 shadow-2xl rounded-xl">
// // // // // // //             <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={350} />
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );

// // // // // // //   return (
// // // // // // //     <div
// // // // // // //       className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
// // // // // // //       role="dialog"
// // // // // // //       aria-modal="true"
// // // // // // //       aria-label="Ruang Diskusi"
// // // // // // //     >
// // // // // // //       <div className="bg-white w-full max-w-lg h-[650px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
// // // // // // //         {/* Header */}
// // // // // // //         <div className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md z-10">
// // // // // // //           <h3 className="font-bold flex items-center gap-2">
// // // // // // //             <MessageSquare size={20} aria-hidden="true" /> Ruang Diskusi
// // // // // // //           </h3>
// // // // // // //           <button
// // // // // // //             onClick={onClose}
// // // // // // //             type="button"
// // // // // // //             className="hover:bg-gray-700 p-1.5 rounded-full"
// // // // // // //             aria-label="Tutup Modal"
// // // // // // //             title="Tutup"
// // // // // // //           >
// // // // // // //             <X size={20} aria-hidden="true" />
// // // // // // //           </button>
// // // // // // //         </div>

// // // // // // //         {/* Tabs - FIX ARIA: Menggunakan String Literal dengan Percabangan */}
// // // // // // //         <div className="flex border-b bg-white z-10" role="tablist" aria-label="Jenis ruang chat">
          
// // // // // // //           {/* TAB PUBLIC */}
// // // // // // //           {isPublicSelected ? (
// // // // // // //             <button
// // // // // // //               type="button"
// // // // // // //               role="tab"
// // // // // // //               id="tab-public"
// // // // // // //               aria-selected="true" // Literal "true"
// // // // // // //               aria-controls="panel-public"
// // // // // // //               tabIndex={0}
// // // // // // //               onClick={() => setActiveTab('public')}
// // // // // // //               className="flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2 border-blue-600 text-blue-600 bg-blue-50"
// // // // // // //               title="Buka Chat Kelas Publik"
// // // // // // //             >
// // // // // // //               <Users size={16} aria-hidden="true" /> Kelas (Publik)
// // // // // // //             </button>
// // // // // // //           ) : (
// // // // // // //             <button
// // // // // // //               type="button"
// // // // // // //               role="tab"
// // // // // // //               id="tab-public"
// // // // // // //               aria-selected="false" // Literal "false"
// // // // // // //               aria-controls="panel-public"
// // // // // // //               tabIndex={-1}
// // // // // // //               onClick={() => setActiveTab('public')}
// // // // // // //               className="flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-transparent text-gray-500 hover:bg-gray-50"
// // // // // // //               title="Buka Chat Kelas Publik"
// // // // // // //             >
// // // // // // //               <Users size={16} aria-hidden="true" /> Kelas (Publik)
// // // // // // //             </button>
// // // // // // //           )}
          
// // // // // // //           {/* TAB INTERNAL */}
// // // // // // //           {isInternalSelected ? (
// // // // // // //             <button
// // // // // // //               type="button"
// // // // // // //               role="tab"
// // // // // // //               id="tab-internal"
// // // // // // //               aria-selected="true" // Literal "true"
// // // // // // //               aria-controls="panel-internal"
// // // // // // //               tabIndex={0}
// // // // // // //               onClick={() => setActiveTab('internal')}
// // // // // // //               className="flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2 border-purple-600 text-purple-600 bg-purple-50"
// // // // // // //               title="Buka Chat Tim Internal"
// // // // // // //             >
// // // // // // //               <Briefcase size={16} aria-hidden="true" /> Tim Internal
// // // // // // //             </button>
// // // // // // //           ) : (
// // // // // // //             <button
// // // // // // //               type="button"
// // // // // // //               role="tab"
// // // // // // //               id="tab-internal"
// // // // // // //               aria-selected="false" // Literal "false"
// // // // // // //               aria-controls="panel-internal"
// // // // // // //               tabIndex={-1}
// // // // // // //               onClick={() => setActiveTab('internal')}
// // // // // // //               className="flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-transparent text-gray-500 hover:bg-gray-50"
// // // // // // //               title="Buka Chat Tim Internal"
// // // // // // //             >
// // // // // // //               <Briefcase size={16} aria-hidden="true" /> Tim Internal
// // // // // // //             </button>
// // // // // // //           )}
// // // // // // //         </div>

// // // // // // //         {/* Panel Container */}
// // // // // // //         <div className="flex-1 flex flex-col relative overflow-hidden">
// // // // // // //             <div 
// // // // // // //                 id="panel-public" 
// // // // // // //                 role="tabpanel" 
// // // // // // //                 aria-labelledby="tab-public"
// // // // // // //                 hidden={!isPublicSelected}
// // // // // // //                 className={`flex-1 flex flex-col ${!isPublicSelected ? 'hidden' : 'h-full'}`}
// // // // // // //             >
// // // // // // //                 {isPublicSelected && <ChatPanel />}
// // // // // // //             </div>

// // // // // // //             <div 
// // // // // // //                 id="panel-internal" 
// // // // // // //                 role="tabpanel" 
// // // // // // //                 aria-labelledby="tab-internal"
// // // // // // //                 hidden={!isInternalSelected}
// // // // // // //                 className={`flex-1 flex flex-col ${!isInternalSelected ? 'hidden' : 'h-full'}`}
// // // // // // //             >
// // // // // // //                 {isInternalSelected && <ChatPanel />}
// // // // // // //             </div>
// // // // // // //         </div>

// // // // // // //         {/* Attachment Preview */}
// // // // // // //         {attachment && (
// // // // // // //           <div className="px-4 py-2 bg-gray-50 border-t flex items-center justify-between animate-in slide-in-from-bottom-2">
// // // // // // //             <div className="flex items-center gap-3">
// // // // // // //               <div className="p-2 bg-white border rounded-lg">
// // // // // // //                 {attachment.type === 'image'
// // // // // // //                   ? <ImageIcon size={20} className="text-purple-600" aria-hidden="true" />
// // // // // // //                   : <FileText size={20} className="text-blue-600" aria-hidden="true" />}
// // // // // // //               </div>
// // // // // // //               <div className="text-xs">
// // // // // // //                 <p className="font-bold text-gray-700 truncate max-w-[200px]">{attachment.name}</p>
// // // // // // //                 <p className="text-gray-400">Siap dikirim</p>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //             <button
// // // // // // //               type="button"
// // // // // // //               onClick={handleRemoveAttachment}
// // // // // // //               className="text-red-500 hover:bg-red-50 p-1 rounded-full"
// // // // // // //               aria-label="Hapus Lampiran"
// // // // // // //               title="Batalkan Lampiran"
// // // // // // //             >
// // // // // // //               <X size={16} aria-hidden="true" />
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {/* Input Form */}
// // // // // // //         <form onSubmit={handleSend} className="p-3 bg-white border-t flex items-center gap-2">
          
// // // // // // //           {/* TOMBOL EMOJI - FIX ARIA */}
// // // // // // //           {showEmoji ? (
// // // // // // //             <button
// // // // // // //               type="button"
// // // // // // //               onClick={() => setShowEmoji(false)}
// // // // // // //               className="p-2 rounded-full transition-colors text-yellow-500"
// // // // // // //               aria-label="Tutup Emoji"
// // // // // // //               aria-expanded="true" // Literal
// // // // // // //               title="Tutup Emoji"
// // // // // // //             >
// // // // // // //               <Smile size={20} aria-hidden="true" />
// // // // // // //             </button>
// // // // // // //           ) : (
// // // // // // //             <button
// // // // // // //               type="button"
// // // // // // //               onClick={() => setShowEmoji(true)}
// // // // // // //               className="p-2 rounded-full transition-colors text-gray-400 hover:text-yellow-500"
// // // // // // //               aria-label="Buka Emoji"
// // // // // // //               aria-expanded="false" // Literal
// // // // // // //               title="Buka Emoji"
// // // // // // //             >
// // // // // // //               <Smile size={20} aria-hidden="true" />
// // // // // // //             </button>
// // // // // // //           )}

// // // // // // //           <button
// // // // // // //             type="button"
// // // // // // //             onClick={() => fileInputRef.current?.click()}
// // // // // // //             className="text-gray-400 hover:text-blue-500 p-2 rounded-full transition-colors"
// // // // // // //             aria-label="Upload File"
// // // // // // //             title="Upload Gambar/Dokumen"
// // // // // // //           >
// // // // // // //             <Paperclip size={20} aria-hidden="true" />
// // // // // // //           </button>

// // // // // // //           <input
// // // // // // //             type="file"
// // // // // // //             ref={fileInputRef}
// // // // // // //             className="hidden"
// // // // // // //             onChange={handleFileChange}
// // // // // // //             aria-label="Input File Upload"
// // // // // // //             title="Input File Upload"
// // // // // // //           />

// // // // // // //           <input
// // // // // // //             className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
// // // // // // //             placeholder={isUploading ? 'Mengupload...' : 'Ketik pesan...'}
// // // // // // //             value={newMessage}
// // // // // // //             onChange={e => setNewMessage(e.target.value)}
// // // // // // //             disabled={isUploading}
// // // // // // //             aria-label="Ketik Pesan"
// // // // // // //             title="Ketik Pesan Anda"
// // // // // // //           />

// // // // // // //           <button
// // // // // // //             type="submit"
// // // // // // //             disabled={isUploading || (!newMessage && !attachment)}
// // // // // // //             className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2.5 rounded-full shadow-lg transition-transform active:scale-90"
// // // // // // //             aria-label="Kirim Pesan"
// // // // // // //             title="Kirim"
// // // // // // //           >
// // // // // // //             <Send size={18} aria-hidden="true" />
// // // // // // //           </button>
// // // // // // //         </form>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // /* =========================================================================
// // // // // // //    PERSONAL CHAT MODAL
// // // // // // //    ========================================================================= */
// // // // // // // function PersonalChatModal({ student, onClose }: any) {
// // // // // // //   const [messages, setMessages] = useState<any[]>([]);
// // // // // // //   const [newMessage, setNewMessage] = useState('');
// // // // // // //   const messagesEndRef = useRef<HTMLDivElement>(null);
// // // // // // //   const targetId = student.user?._id || student._id;
// // // // // // //   const targetName = student.user?.name || student.name || 'User';

// // // // // // //   useEffect(() => {
// // // // // // //     if (targetId) loadHistory();
// // // // // // //     const interval = setInterval(() => { if (targetId) loadHistory(); }, 5000);
// // // // // // //     return () => clearInterval(interval);
// // // // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // // // //   }, [targetId]);

// // // // // // //   useEffect(() => {
// // // // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // // // //   }, [messages]);

// // // // // // //   const loadHistory = async () => {
// // // // // // //     try {
// // // // // // //       const res = await api(`/api/chat/${targetId}?t=${Date.now()}`);
// // // // // // //       setMessages(res.messages || []);
// // // // // // //     } catch (e) { console.error(e); }
// // // // // // //   };

// // // // // // //   const handleSend = async (e: React.FormEvent) => {
// // // // // // //     e.preventDefault();
// // // // // // //     if (!newMessage.trim()) return;
// // // // // // //     const msgToSend = newMessage;
// // // // // // //     setNewMessage('');
// // // // // // //     try {
// // // // // // //       await api('/api/chat/send', { method: 'POST', body: { recipientId: targetId, message: msgToSend } });
// // // // // // //       loadHistory();
// // // // // // //     } catch (error: any) { alert('Gagal: ' + error.message); }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Chat Personal dengan ${targetName}`}>
// // // // // // //       <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95">
// // // // // // //         <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
// // // // // // //           <div className="font-bold flex items-center gap-2">
// // // // // // //             <MessageCircle size={18} aria-hidden="true" /> Chat: {targetName}
// // // // // // //           </div>
// // // // // // //           <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" aria-label="Tutup Chat" title="Tutup Chat">
// // // // // // //             <X size={18} aria-hidden="true" />
// // // // // // //           </button>
// // // // // // //         </div>
// // // // // // //         <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-2">
// // // // // // //           {messages.map((msg: any, i: number) => (
// // // // // // //             <div key={i} className={`p-2 rounded-lg text-sm max-w-[80%] ${msg.sender === 'me' ? 'bg-indigo-100 ml-auto text-right' : 'bg-white border'}`}>
// // // // // // //               {msg.message}
// // // // // // //             </div>
// // // // // // //           ))}
// // // // // // //           <div ref={messagesEndRef} />
// // // // // // //         </div>
// // // // // // //         <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
// // // // // // //           <input 
// // // // // // //             className="flex-1 border rounded-full px-3 py-1.5 text-sm" 
// // // // // // //             value={newMessage} 
// // // // // // //             onChange={e => setNewMessage(e.target.value)} 
// // // // // // //             placeholder="Tulis..." 
// // // // // // //             aria-label="Input pesan personal"
// // // // // // //             title="Ketik pesan personal"
// // // // // // //           />
// // // // // // //           <button type="submit" className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700" aria-label="Kirim Pesan" title="Kirim">
// // // // // // //             <Send size={14} aria-hidden="true" />
// // // // // // //           </button>
// // // // // // //         </form>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // /* =========================================================================
// // // // // // //    MAIN DASHBOARD
// // // // // // //    ========================================================================= */
// // // // // // // interface CourseOperatorProps { courseId: string; course: any; }

// // // // // // // export default function CourseOperatorDashboard({ courseId, course }: CourseOperatorProps) {
// // // // // // //   const [participants, setParticipants] = useState<any[]>([]);
// // // // // // //   const [loadingParticipants, setLoadingParticipants] = useState(false);
// // // // // // //   const [participantFilter, setParticipantFilter] = useState('');
// // // // // // //   const [actionOptions, setActionOptions] = useState<any[]>([]);
// // // // // // //   const [selectedActionId, setSelectedActionId] = useState<string>('');
// // // // // // //   const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
// // // // // // //   const [showGroupChat, setShowGroupChat] = useState(false);
// // // // // // //   const [studentDetail, setStudentDetail] = useState<any>(null);
// // // // // // //   const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);

// // // // // // //   useEffect(() => {
// // // // // // //     if (course?.modules) {
// // // // // // //       const opts: any[] = [];
// // // // // // //       course.modules.forEach((m: any) => {
// // // // // // //         m.lessons?.forEach((l: any) => {
// // // // // // //           let label = l.title;
// // // // // // //           if (l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
// // // // // // //           else if (l.type === 'essay') label = `📝 Esai: ${l.title}`;
// // // // // // //           else if (l.type === 'upload_doc') label = `📤 Upload: ${l.title}`;
// // // // // // //           opts.push({ id: l._id, label, type: l.type });
// // // // // // //         });
// // // // // // //       });
// // // // // // //       setActionOptions(opts);
// // // // // // //     }
// // // // // // //   }, [course]);

// // // // // // //   const fetchParticipants = async () => {
// // // // // // //     setLoadingParticipants(true);
// // // // // // //     try {
// // // // // // //       const res = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`);
// // // // // // //       setParticipants(res.participants || []);
// // // // // // //     } catch (error) { console.error('Gagal load peserta'); } finally { setLoadingParticipants(false); }
// // // // // // //   };
// // // // // // //   useEffect(() => { fetchParticipants(); }, [courseId]);

// // // // // // //   const handleVerifyEnrollment = async (enrollmentId: string, action: 'approve' | 'reject', studentName: string) => {
// // // // // // //     if (!confirm(`Konfirmasi ${action} untuk ${studentName}?`)) return;
// // // // // // //     try { await api('/api/courses/verify-enrollment', { method: 'POST', body: { enrollmentId, action } }); alert('Berhasil.'); fetchParticipants(); } catch (e: any) { alert(e.message); }
// // // // // // //   };

// // // // // // //   const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => {
// // // // // // //     if (!selectedActionId) return alert('Pilih Materi dulu!');
// // // // // // //     const realUserId = participants.find(p => (p.user?._id === studentId) || (p.user === studentId))?.user?._id || studentId;
// // // // // // //     if (action === 'pass') {
// // // // // // //       if (!confirm('Luluskan peserta ini manual?')) return;
// // // // // // //       try { await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId: realUserId, lessonId: selectedActionId, courseId } }); alert('Berhasil diluluskan!'); fetchParticipants(); } catch (e: any) { alert(e.message); }
// // // // // // //     } else if (action === 'reset') {
// // // // // // //       if (!confirm('Reset progress materi ini?')) return;
// // // // // // //       try { await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId: realUserId, quizId: selectedActionId } }); alert('Reset berhasil!'); fetchParticipants(); } catch (e: any) { alert(e.message); }
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleRejectParticipant = async (enrollmentId: string) => {
// // // // // // //     if (!confirm('Hapus permanen peserta ini?')) return;
// // // // // // //     try { await api(`/api/enrollments/${enrollmentId}`, { method: 'DELETE' }); alert('Dihapus.'); fetchParticipants(); } catch (e: any) { alert(e.message); }
// // // // // // //   };

// // // // // // //   // --- DOWNLOAD CERTIFICATE ---
// // // // // // //   const handleDownloadCertificate = async (studentId: string) => {
// // // // // // //     try {
// // // // // // //       const token = localStorage.getItem('token');
// // // // // // //       // Panggil endpoint khusus admin untuk download sertifikat user lain
// // // // // // //       const BACKEND_URL = 'http://localhost:4000'; // Pastikan port benar
// // // // // // //       const url = `${BACKEND_URL}/api/courses/certificate/download-admin/${courseId}/${studentId}`;
      
// // // // // // //       const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      
// // // // // // //       if (!res.ok) {
// // // // // // //           const err = await res.json();
// // // // // // //           throw new Error(err.error || "Gagal download");
// // // // // // //       }
      
// // // // // // //       const blob = await res.blob();
// // // // // // //       const downloadUrl = window.URL.createObjectURL(blob);
// // // // // // //       const a = document.createElement('a');
// // // // // // //       a.href = downloadUrl;
// // // // // // //       a.download = `Sertifikat-${studentId}.pdf`;
// // // // // // //       document.body.appendChild(a);
// // // // // // //       a.click();
// // // // // // //       a.remove();
// // // // // // //     } catch (e: any) {
// // // // // // //       alert("Gagal Download: " + e.message);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const pendingParticipants = participants.filter(p => !p.status || p.status === 'pending' || p.status === 'waiting');
// // // // // // //   const activeParticipants = participants.filter(p => p.status === 'active' || p.status === 'approved');
// // // // // // //   const passedStudents = participants.filter(p => p.progress >= 100 || p.isCompleted).length;

// // // // // // //   if (loadingParticipants && participants.length === 0) return (
// // // // // // //     <div className="p-10 text-center text-gray-500">
// // // // // // //         <RefreshCw className="animate-spin inline-block mr-2" size={18} aria-hidden="true" /> Memuat data...
// // // // // // //     </div>
// // // // // // //   );

// // // // // // //   return (
// // // // // // //     <div className="space-y-8 animate-in slide-in-from-right-4">
// // // // // // //       <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100">
// // // // // // //         <div className="flex gap-6">
// // // // // // //           <div className="text-center"><span className="block text-2xl font-bold text-gray-800">{participants.length}</span><span className="text-[10px] text-gray-500 uppercase font-bold">Total</span></div>
// // // // // // //           <div className="text-center"><span className="block text-2xl font-bold text-green-600">{passedStudents}</span><span className="text-[10px] text-gray-500 uppercase font-bold">Lulus</span></div>
// // // // // // //           <div className="text-center"><span className="block text-2xl font-bold text-orange-500">{activeParticipants.length}</span><span className="text-[10px] text-gray-500 uppercase font-bold">Aktif</span></div>
// // // // // // //         </div>
// // // // // // //         <button type="button" onClick={() => setShowGroupChat(true)} className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg hover:bg-indigo-700 flex items-center gap-2" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi">
// // // // // // //             <MessageSquare size={18} aria-hidden="true" /> Ruang Diskusi
// // // // // // //         </button>
// // // // // // //       </div>

// // // // // // //       <div className="bg-amber-50 border border-amber-200 rounded-2xl shadow-sm overflow-hidden mb-6">
// // // // // // //         <div className="px-6 py-3 border-b border-amber-200 bg-amber-100 flex items-center gap-2"><AlertCircle className="text-amber-600" size={18} aria-hidden="true" /><h3 className="font-bold text-amber-900 text-sm">Menunggu Persetujuan ({pendingParticipants.length})</h3></div>
// // // // // // //         {pendingParticipants.length === 0 ? <div className="p-6 text-center text-gray-400 text-sm italic">Tidak ada antrian.</div> : (
// // // // // // //           <div className="overflow-x-auto">
// // // // // // //             <table className="w-full text-left text-sm">
// // // // // // //                 <tbody className="divide-y divide-amber-200">
// // // // // // //                     {pendingParticipants.map((p: any) => (
// // // // // // //                         <tr key={p._id} className="hover:bg-amber-100/50">
// // // // // // //                             <td className="p-3 font-bold">{p.user?.name}</td>
// // // // // // //                             <td className="p-3 text-gray-500">{p.user?.email}</td>
// // // // // // //                             <td className="p-3 text-right">
// // // // // // //                                 <button type="button" onClick={() => handleVerifyEnrollment(p._id, 'approve', p.user?.name)} className="text-green-700 font-bold hover:underline mr-4" aria-label={`Setujui ${p.user?.name}`} title="Setujui">Setujui</button>
// // // // // // //                                 <button type="button" onClick={() => handleVerifyEnrollment(p._id, 'reject', p.user?.name)} className="text-red-600 font-bold hover:underline" aria-label={`Tolak ${p.user?.name}`} title="Tolak">Tolak</button>
// // // // // // //                             </td>
// // // // // // //                         </tr>
// // // // // // //                     ))}
// // // // // // //                 </tbody>
// // // // // // //             </table>
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>

// // // // // // //       <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
// // // // // // //         <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-wrap gap-4">
// // // // // // //           <h3 className="font-bold text-gray-800 flex items-center gap-2"><Users size={18} aria-hidden="true" /> Peserta Aktif</h3>
// // // // // // //           <div className="flex gap-2">
// // // // // // //             <select className="p-1.5 border rounded text-xs bg-white h-9 focus:ring-2 focus:ring-indigo-500 outline-none" value={selectedActionId} onChange={e => setSelectedActionId(e.target.value)} title="Pilih Materi Aksi Cepat" aria-label="Pilih Materi"><option value="">-- Aksi Cepat --</option>{actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}</select>
// // // // // // //             <input className="px-3 py-1.5 rounded border text-xs h-9 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Cari..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} title="Cari Peserta" aria-label="Cari Peserta" />
// // // // // // //             <button type="button" onClick={fetchParticipants} className="bg-white border p-1.5 rounded h-9 w-9 flex justify-center items-center hover:bg-gray-100" title="Refresh Data" aria-label="Refresh Data"><RefreshCw size={14} aria-hidden="true" /></button>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         <div className="overflow-x-auto">
// // // // // // //           <table className="w-full text-left border-collapse text-sm">
// // // // // // //             <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b">
// // // // // // //               <tr>
// // // // // // //                 <th className="p-4">Peserta</th>
// // // // // // //                 <th className="p-4">Sedang Mengerjakan</th>
// // // // // // //                 <th className="p-4">Progress</th>
// // // // // // //                 <th className="p-4 text-center">Status</th>
// // // // // // //                 <th className="p-4 text-center">Aksi Cepat</th>
// // // // // // //                 <th className="p-4 text-center">Sertifikat</th>
// // // // // // //                 <th className="p-4 text-center">Detail</th>
// // // // // // //                 <th className="p-4 text-center">Hapus</th>
// // // // // // //               </tr>
// // // // // // //             </thead>
// // // // // // //             <tbody className="divide-y divide-gray-100">
// // // // // // //               {activeParticipants.filter(p => (p.user?.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => {
// // // // // // //                 const rawProgress = Number(p.progress);
// // // // // // //                 const progressValue = Number.isFinite(rawProgress) ? Math.max(0, Math.min(100, Math.round(rawProgress))) : 0;
// // // // // // //                 const isActionCompleted = selectedActionId && p.completedLessons?.includes(selectedActionId);
// // // // // // //                 const isLulus = progressValue === 100 || p.isCompleted;

// // // // // // //                 return (
// // // // // // //                   <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
// // // // // // //                     <td className="p-4"><div className="font-bold text-gray-900">{p.user?.name}</div><div className="text-xs text-gray-500">{p.user?.email}</div></td>
// // // // // // //                     <td className="p-4"><div className="flex items-center gap-2 text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 w-fit"><div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />{p.currentPosition || 'Belum Memulai'}</div></td>
// // // // // // //                     <td className="p-4 w-44"><div className="flex justify-between text-xs font-bold mb-1"><span>{progressValue}%</span></div><progress max={100} value={progressValue} className="w-full h-1.5 [&::-webkit-progress-bar]:bg-gray-100 [&::-webkit-progress-value]:bg-blue-500" title={`Progress: ${progressValue}%`} /></td>
// // // // // // //                     <td className="p-4 text-center">{isLulus ? <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">LULUS</span> : <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">PROSES</span>}</td>
// // // // // // //                     <td className="p-4 text-center">{selectedActionId ? (<button type="button" onClick={() => handleParticipantAction(p.user?._id, 'pass')} disabled={isActionCompleted} className={`px-2 py-1 rounded text-xs font-bold border ${isActionCompleted ? 'bg-gray-100 text-gray-400' : 'bg-white text-blue-600 hover:bg-blue-50'}`} title={isActionCompleted ? "Sudah Selesai" : "Luluskan Materi"} aria-label={isActionCompleted ? "Sudah Selesai" : "Luluskan Materi"}>{isActionCompleted ? 'Selesai' : 'Luluskan'}</button>) : '-'}</td>
                    
// // // // // // //                     {/* BUTTON DOWNLOAD SERTIFIKAT */}
// // // // // // //                     <td className="p-4 text-center">
// // // // // // //                         {isLulus ? (
// // // // // // //                             <button type="button" onClick={() => handleDownloadCertificate(p.user?._id)} className="text-green-600 hover:text-green-800 p-1.5 rounded hover:bg-green-50 border border-green-200" title="Download Sertifikat" aria-label="Download Sertifikat"><Award size={18} aria-hidden="true" /></button>
// // // // // // //                         ) : (
// // // // // // //                             <span className="text-gray-300 text-xs italic">Belum Lulus</span>
// // // // // // //                         )}
// // // // // // //                     </td>

// // // // // // //                     <td className="p-4 text-center"><button type="button" onClick={() => { setStudentDetail(p); setShowStudentDetailModal(true); }} className="text-gray-400 hover:text-indigo-600" title="Lihat Detail" aria-label="Lihat Detail"><Eye size={18} aria-hidden="true" /></button></td>
// // // // // // //                     <td className="p-4 text-center"><button type="button" onClick={() => { setChatTargetStudent(p); }} className="text-gray-400 hover:text-blue-600 mr-2" title="Chat Personal" aria-label="Chat Personal"><MessageCircle size={18} aria-hidden="true" /></button><button type="button" onClick={() => handleRejectParticipant(p._id)} className="text-gray-300 hover:text-red-600" title="Hapus Peserta" aria-label="Hapus Peserta"><Trash2 size={16} aria-hidden="true" /></button></td>
// // // // // // //                   </tr>
// // // // // // //                 );
// // // // // // //               })}
// // // // // // //             </tbody>
// // // // // // //           </table>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {chatTargetStudent && <PersonalChatModal student={chatTargetStudent} onClose={() => setChatTargetStudent(null)} />}
// // // // // // //       {showGroupChat && <GroupChatModal courseId={courseId} onClose={() => setShowGroupChat(false)} />}
      
// // // // // // //       {/* Student Detail Modal */}
// // // // // // //       {showStudentDetailModal && studentDetail && (
// // // // // // //         <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Detail Peserta Modal">
// // // // // // //           <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // // // // // //             <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md"><h3 className="font-bold flex items-center gap-2"><Users size={20} aria-hidden="true" /> Detail: {studentDetail.user?.name}</h3><button type="button" onClick={() => setShowStudentDetailModal(false)} title="Tutup" aria-label="Tutup"><X size={24} aria-hidden="true" /></button></div>
// // // // // // //             <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
// // // // // // //               {course?.modules?.map((m: any) => (<div key={m._id} className="bg-white border rounded-xl overflow-hidden shadow-sm"><div className="bg-gray-100 px-4 py-2 border-b font-bold text-sm text-gray-700">{m.title}</div><div className="divide-y">{m.lessons.map((l: any) => { const isDone = studentDetail.completedLessons?.includes(l._id); return (<div key={l._id} className="p-3 flex justify-between items-center hover:bg-gray-50"><div className="flex items-center gap-3"><div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isDone ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>{isDone && <Check size={12} aria-hidden="true" />}</div><span className={`text-sm ${isDone ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{l.title}</span></div><span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">{l.type}</span></div>); })}</div></div>))}
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // }


// // // // // 'use client';

// // // // // import { useState, useEffect, useRef } from 'react';
// // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // import dynamic from 'next/dynamic';
// // // // // import {
// // // // //   RefreshCw, Users, Eye, MessageCircle, Trash2, Check, X, Send, Smile, 
// // // // //   MessageSquare, Briefcase, Paperclip, Image as ImageIcon, FileText, 
// // // // //   AlertCircle, Award, ChevronRight
// // // // // } from 'lucide-react';

// // // // // const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

// // // // // /* =========================================================================
// // // // //    GROUP CHAT MODAL (PERBAIKAN LAYOUT & MEMBER LIST)
// // // // //    ========================================================================= */
// // // // // function GroupChatModal({ courseId, participants, facilitators, onClose }: any) {
// // // // //   const [activeTab, setActiveTab] = useState<'internal' | 'public'>('public');
// // // // //   const [messages, setMessages] = useState<any[]>([]);
// // // // //   const [newMessage, setNewMessage] = useState('');
// // // // //   const [showEmoji, setShowEmoji] = useState(false);
// // // // //   const [attachment, setAttachment] = useState<any>(null);
// // // // //   const [isUploading, setIsUploading] = useState(false);
  
// // // // //   // Sidebar State (Default true di desktop)
// // // // //   const [showSidebar, setShowSidebar] = useState(true);

// // // // //   // Mention State
// // // // //   const [mentionQuery, setMentionQuery] = useState('');
// // // // //   const [showMentionPopup, setShowMentionPopup] = useState(false);
// // // // //   const [filteredMembers, setFilteredMembers] = useState<any[]>([]);

// // // // //   const messagesEndRef = useRef<HTMLDivElement>(null);
// // // // //   const fileInputRef = useRef<HTMLInputElement>(null);
// // // // //   const inputRef = useRef<HTMLInputElement>(null);

// // // // //   // --- LOGIKA MENGGABUNGKAN MEMBER ---
// // // // //   // Mengambil daftar anggota berdasarkan tab yang aktif
// // // // //   const getActiveMembers = () => {
// // // // //     // 1. Ambil data fasilitator (Tim Internal)
// // // // //     // Pastikan menangani format populated object atau string ID
// // // // //     const facs = (facilitators || []).map((f: any) => {
// // // // //         if (typeof f === 'object') {
// // // // //             return {
// // // // //                 _id: f._id || f.id,
// // // // //                 name: f.name,
// // // // //                 avatarUrl: f.avatarUrl,
// // // // //                 role: 'Fasilitator'
// // // // //             };
// // // // //         }
// // // // //         return null; 
// // // // //     }).filter(Boolean);

// // // // //     // 2. Ambil data peserta (Public)
// // // // //     const students = (participants || []).map((p: any) => ({
// // // // //       _id: p.user?._id || p.user?.id,
// // // // //       name: p.user?.name,
// // // // //       avatarUrl: p.user?.avatarUrl,
// // // // //       role: 'Peserta'
// // // // //     })).filter((u: any) => u._id);

// // // // //     if (activeTab === 'internal') {
// // // // //         return facs;
// // // // //     } else {
// // // // //         // Gabung untuk kelas publik (Fasilitator + Peserta)
// // // // //         const all = [...facs, ...students];
// // // // //         // Hapus duplikat berdasarkan ID
// // // // //         const uniqueMembers = Array.from(new Map(all.map(item => [item._id, item])).values());
// // // // //         // Urutkan A-Z
// // // // //         return uniqueMembers.sort((a: any, b: any) => (a.name || '').localeCompare(b.name || ''));
// // // // //     }
// // // // //   };

// // // // //   const activeMembers = getActiveMembers();

// // // // //   useEffect(() => {
// // // // //     loadMessages();
// // // // //     const interval = setInterval(loadMessages, 3000);
// // // // //     return () => clearInterval(interval);
// // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // //   }, [courseId, activeTab]);

// // // // //   useEffect(() => {
// // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // //   }, [messages]);

// // // // //   const loadMessages = async () => {
// // // // //     try {
// // // // //       const res = await api(`/api/courses/${courseId}/chat-group?type=${activeTab}`);
// // // // //       setMessages(res || []);
// // // // //     } catch (e) { console.error('Chat error', e); }
// // // // //   };

// // // // //   const onEmojiClick = (emojiObject: any) => {
// // // // //     setNewMessage(prev => prev + emojiObject.emoji);
// // // // //     setShowEmoji(false);
// // // // //   };

// // // // //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     const file = e.target.files?.[0];
// // // // //     if (!file) return;
// // // // //     setIsUploading(true);
// // // // //     try {
// // // // //       const formData = new FormData();
// // // // //       formData.append('file', file);
// // // // //       const res = await apiUpload('/api/upload', formData);
// // // // //       const fileUrl = res.url || res.file?.url;
// // // // //       const type = file.type.startsWith('image/') ? 'image' : 'file';
// // // // //       setAttachment({ url: fileUrl, type, name: file.name });
// // // // //     } catch (error: any) {
// // // // //       alert('Gagal upload: ' + error.message);
// // // // //     } finally {
// // // // //       setIsUploading(false);
// // // // //       if (fileInputRef.current) fileInputRef.current.value = '';
// // // // //     }
// // // // //   };

// // // // //   const handleRemoveAttachment = () => setAttachment(null);

// // // // //   // --- MENTION LOGIC ---
// // // // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     const val = e.target.value;
// // // // //     setNewMessage(val);

// // // // //     const lastWord = val.split(' ').pop();
// // // // //     if (lastWord && lastWord.startsWith('@') && lastWord.length > 1) {
// // // // //         const query = lastWord.substring(1).toLowerCase();
// // // // //         setMentionQuery(query);
// // // // //         const matches = activeMembers.filter((u: any) => u.name && u.name.toLowerCase().includes(query));
// // // // //         setFilteredMembers(matches);
// // // // //         setShowMentionPopup(matches.length > 0);
// // // // //     } else {
// // // // //         setShowMentionPopup(false);
// // // // //     }
// // // // //   };

// // // // //   const insertMention = (name: string) => {
// // // // //     const words = newMessage.split(' ');
// // // // //     words.pop(); 
// // // // //     const newText = words.join(' ') + ` @${name} `;
// // // // //     setNewMessage(newText);
// // // // //     setShowMentionPopup(false);
// // // // //     inputRef.current?.focus();
// // // // //   };

// // // // //   const handleSend = async (e: React.FormEvent) => {
// // // // //     e.preventDefault();
// // // // //     if ((!newMessage.trim() && !attachment) || isUploading) return;

// // // // //     const payload = { text: newMessage, type: activeTab, attachment };
// // // // //     setNewMessage(''); setAttachment(null); setShowMentionPopup(false); setShowEmoji(false);

// // // // //     try {
// // // // //       await api(`/api/courses/${courseId}/chat-group`, { method: 'POST', body: payload });
// // // // //       loadMessages();
// // // // //     } catch (e: any) {
// // // // //       alert('Gagal kirim: ' + e.message);
// // // // //     }
// // // // //   };

// // // // //   const renderMessage = (text: string) => {
// // // // //     const parts = text.split(/(@[\w\s]+)/g);
// // // // //     return parts.map((part, i) => 
// // // // //         part.startsWith('@') 
// // // // //         ? <span key={i} className="text-blue-600 font-bold bg-blue-50 px-1 rounded">{part}</span> 
// // // // //         : part
// // // // //     );
// // // // //   };

// // // // //   return (
// // // // //     <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Ruang Diskusi">
// // // // //       {/* Container Utama: Flex Column dengan tinggi fix agar child bisa scroll */}
// // // // //       <div className="bg-white w-full max-w-6xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 border border-gray-200">
        
// // // // //         {/* HEADER */}
// // // // //         <div className="bg-red-700 text-white p-4 flex justify-between items-center shadow-md z-20 shrink-0">
// // // // //           <div className="flex items-center gap-4">
// // // // //              <h3 className="font-bold flex items-center gap-2 text-lg"><MessageSquare size={20} /> Ruang Diskusi</h3>
// // // // //              <div className="h-6 w-px bg-white/20 mx-2"></div>
             
// // // // //              {/* Tab Switcher */}
// // // // //              <div className="flex bg-red-800/50 p-1 rounded-lg">
// // // // //                 <button 
// // // // //                     type="button"
// // // // //                     onClick={() => setActiveTab('public')}
// // // // //                     className={`px-4 py-1.5 text-xs rounded-md font-bold transition-all flex items-center gap-2 ${activeTab === 'public' ? 'bg-white text-red-700 shadow' : 'text-red-100 hover:bg-red-800'}`}
// // // // //                     title="Buka Kelas Publik"
// // // // //                 >
// // // // //                     <Users size={14}/> Kelas (Publik)
// // // // //                 </button>
// // // // //                 <button 
// // // // //                     type="button"
// // // // //                     onClick={() => setActiveTab('internal')}
// // // // //                     className={`px-4 py-1.5 text-xs rounded-md font-bold transition-all flex items-center gap-2 ${activeTab === 'internal' ? 'bg-white text-red-700 shadow' : 'text-red-100 hover:bg-red-800'}`}
// // // // //                     title="Buka Tim Internal"
// // // // //                 >
// // // // //                     <Briefcase size={14}/> Tim Internal
// // // // //                 </button>
// // // // //              </div>
// // // // //           </div>

// // // // //           <div className="flex items-center gap-2">
// // // // //              <button 
// // // // //                 type="button"
// // // // //                 onClick={() => setShowSidebar(!showSidebar)} 
// // // // //                 className={`p-2 rounded-full transition-colors ${showSidebar ? 'bg-white text-red-700' : 'hover:bg-red-800 text-white'}`} 
// // // // //                 title={showSidebar ? "Tutup Daftar Anggota" : "Buka Daftar Anggota"}
// // // // //              >
// // // // //                 <Users size={20} />
// // // // //              </button>
// // // // //              <button 
// // // // //                 type="button"
// // // // //                 onClick={onClose} 
// // // // //                 className="hover:bg-red-800 p-2 rounded-full transition-colors" 
// // // // //                 title="Tutup Modal"
// // // // //              >
// // // // //                 <X size={20} />
// // // // //              </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* BODY (FLEX ROW) */}
// // // // //         <div className="flex flex-1 overflow-hidden">
            
// // // // //             {/* AREA CHAT (KIRI) */}
// // // // //             <div className="flex-1 flex flex-col relative bg-gray-50 min-w-0">
// // // // //                 {/* Message List */}
// // // // //                 <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-4" onClick={() => setShowEmoji(false)}>
// // // // //                     {messages.length === 0 && (
// // // // //                         <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-50">
// // // // //                             <MessageCircle size={64} className="mb-4 text-gray-300"/>
// // // // //                             <p className="font-bold">Belum ada percakapan.</p>
// // // // //                             <p className="text-sm">Mulai diskusi dengan tim atau peserta!</p>
// // // // //                         </div>
// // // // //                     )}
                    
// // // // //                     {messages.map((msg: any) => {
// // // // //                         const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
// // // // //                         const senderName = typeof msg.sender === 'object' ? msg.sender.name : 'Unknown';
// // // // //                         const senderAvatar = typeof msg.sender === 'object' ? msg.sender.avatarUrl : null;
                        
// // // // //                         const isMyMessage = msg.sender?.role === 'me' || senderName === 'Saya'; 

// // // // //                         return (
// // // // //                             <div key={msg._id} className={`flex w-full ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
// // // // //                                 <div className={`flex max-w-[80%] gap-3 ${isMyMessage ? 'flex-row-reverse' : 'flex-row'}`}>
// // // // //                                     {/* Avatar */}
// // // // //                                     <div className="flex-shrink-0">
// // // // //                                         <img 
// // // // //                                             src={getImageUrl(senderAvatar)} 
// // // // //                                             className="w-8 h-8 rounded-full object-cover border border-gray-300 shadow-sm" 
// // // // //                                             alt={senderName} 
// // // // //                                             onError={(e: any) => { e.target.src = `https://ui-avatars.com/api/?name=${senderName}&background=random`; }}
// // // // //                                         />
// // // // //                                     </div>

// // // // //                                     {/* Bubble */}
// // // // //                                     <div className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}>
// // // // //                                         <div className="flex items-center gap-2 mb-1">
// // // // //                                             <span className="text-[11px] font-bold text-gray-700">{senderName}</span>
// // // // //                                             <span className="text-[10px] text-gray-400">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
// // // // //                                         </div>
// // // // //                                         <div className={`px-4 py-2.5 shadow-sm text-sm break-words rounded-2xl ${
// // // // //                                             isMyMessage 
// // // // //                                             ? 'bg-red-600 text-white rounded-tr-none' 
// // // // //                                             : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
// // // // //                                         }`}>
// // // // //                                             {msg.attachment && (
// // // // //                                                 <div className="mb-2 p-2 bg-black/10 rounded-lg">
// // // // //                                                     {msg.attachment.type === 'image' ? (
// // // // //                                                         <a href={getImageUrl(msg.attachment.url)} target="_blank" rel="noreferrer">
// // // // //                                                             <img src={getImageUrl(msg.attachment.url)} className="max-h-40 rounded object-cover" alt="Attach"/>
// // // // //                                                         </a>
// // // // //                                                     ) : (
// // // // //                                                         <a href={getImageUrl(msg.attachment.url)} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs underline">
// // // // //                                                             <FileText size={14}/> {msg.attachment.name}
// // // // //                                                         </a>
// // // // //                                                     )}
// // // // //                                                 </div>
// // // // //                                             )}
// // // // //                                             {msg.message && <p className="whitespace-pre-wrap">{renderMessage(msg.message)}</p>}
// // // // //                                         </div>
// // // // //                                     </div>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         );
// // // // //                     })}
// // // // //                     <div ref={messagesEndRef} />
// // // // //                 </div>

// // // // //                 {/* MENTION POPUP (Floating) */}
// // // // //                 {showMentionPopup && (
// // // // //                     <div className="absolute bottom-[80px] left-4 bg-white border border-gray-200 shadow-2xl rounded-xl w-64 max-h-48 overflow-y-auto z-50 animate-in slide-in-from-bottom-2">
// // // // //                         <div className="p-2 bg-gray-50 border-b text-xs font-bold text-gray-500 sticky top-0">Mention Anggota:</div>
// // // // //                         {filteredMembers.map((u: any, idx: number) => (
// // // // //                             <button 
// // // // //                                 key={idx} 
// // // // //                                 type="button"
// // // // //                                 onClick={() => insertMention(u.name)} 
// // // // //                                 className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2 text-sm transition-colors border-b border-gray-50 last:border-0"
// // // // //                                 title={`Mention ${u.name}`}
// // // // //                             >
// // // // //                                 <img 
// // // // //                                     src={getImageUrl(u.avatarUrl)} 
// // // // //                                     className="w-6 h-6 rounded-full object-cover" 
// // // // //                                     alt="" 
// // // // //                                     onError={(e: any) => { e.target.src = `https://ui-avatars.com/api/?name=${u.name}&background=random`; }}
// // // // //                                 />
// // // // //                                 <div className="overflow-hidden">
// // // // //                                     <p className="truncate font-medium text-gray-800">{u.name}</p>
// // // // //                                     <p className="text-[9px] text-gray-400">{u.role}</p>
// // // // //                                 </div>
// // // // //                             </button>
// // // // //                         ))}
// // // // //                     </div>
// // // // //                 )}

// // // // //                 {/* ATTACHMENT PREVIEW */}
// // // // //                 {attachment && (
// // // // //                     <div className="bg-gray-100 px-4 py-2 flex justify-between items-center border-t border-gray-200 shrink-0">
// // // // //                         <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
// // // // //                             <Paperclip size={14}/> <span>{attachment.name}</span>
// // // // //                         </div>
// // // // //                         <button type="button" onClick={handleRemoveAttachment} className="text-red-500 hover:text-red-700 bg-white rounded-full p-1 shadow-sm" title="Hapus">
// // // // //                             <X size={14}/>
// // // // //                         </button>
// // // // //                     </div>
// // // // //                 )}

// // // // //                 {/* INPUT AREA */}
// // // // //                 <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 relative shrink-0">
// // // // //                     {showEmoji && (
// // // // //                         <div className="absolute bottom-16 left-2 z-50 shadow-2xl">
// // // // //                             <EmojiPicker onEmojiClick={onEmojiClick} height={300} width={300} />
// // // // //                         </div>
// // // // //                     )}
                    
// // // // //                     <button type="button" onClick={() => setShowEmoji(!showEmoji)} className={`text-gray-400 p-2 rounded-full transition-colors ${showEmoji ? 'text-yellow-500 bg-yellow-50' : 'hover:bg-gray-100 hover:text-yellow-500'}`} title="Emoji">
// // // // //                         <Smile size={24} />
// // // // //                     </button>
// // // // //                     <button type="button" onClick={() => fileInputRef.current?.click()} className="text-gray-400 hover:text-blue-500 p-2 rounded-full hover:bg-gray-100 transition-colors" title="Upload File">
// // // // //                         <Paperclip size={24} />
// // // // //                     </button>
// // // // //                     <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} title="File Input" />
                    
// // // // //                     <input 
// // // // //                         ref={inputRef}
// // // // //                         className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none bg-gray-50 transition-all placeholder:text-gray-400"
// // // // //                         placeholder={activeTab === 'public' ? "Kirim ke semua peserta... (@ untuk mention)" : "Diskusi internal tim..."}
// // // // //                         value={newMessage}
// // // // //                         onChange={handleInputChange}
// // // // //                         onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) handleSend(e); }}
// // // // //                         autoFocus
// // // // //                         title="Ketik Pesan"
// // // // //                     />
                    
// // // // //                     <button 
// // // // //                         type="submit" 
// // // // //                         onClick={handleSend} 
// // // // //                         disabled={isUploading || (!newMessage.trim() && !attachment)} 
// // // // //                         className="bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-800 disabled:opacity-50 shadow-md transition-transform active:scale-95"
// // // // //                         title="Kirim Pesan"
// // // // //                     >
// // // // //                         <Send size={18} />
// // // // //                     </button>
// // // // //                 </div>
// // // // //             </div>

// // // // //             {/* SIDEBAR MEMBER LIST (KANAN) */}
// // // // //             {showSidebar && (
// // // // //                 <div className="w-72 border-l border-gray-200 bg-white flex flex-col shadow-xl z-10 animate-in slide-in-from-right shrink-0">
// // // // //                     <div className="p-3 border-b bg-gray-50 font-bold text-gray-700 text-sm flex items-center justify-between">
// // // // //                         <div className="flex items-center gap-2"><Users size={16}/> Anggota ({activeMembers.length})</div>
// // // // //                         <button type="button" onClick={() => setShowSidebar(false)} className="md:hidden text-gray-400" title="Tutup Sidebar"><X size={16}/></button>
// // // // //                     </div>
                    
// // // // //                     <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
// // // // //                         {activeMembers.length === 0 ? (
// // // // //                             <div className="text-center text-xs text-gray-400 mt-10">
// // // // //                                 <Users size={32} className="mx-auto mb-2 opacity-20"/>
// // // // //                                 <p>Tidak ada anggota.</p>
// // // // //                             </div>
// // // // //                         ) : (
// // // // //                             activeMembers.map((m: any, idx: number) => (
// // // // //                                 <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 group transition-colors cursor-default border border-transparent hover:border-gray-100">
// // // // //                                     <div className="relative flex-shrink-0">
// // // // //                                         <img 
// // // // //                                             src={getImageUrl(m.avatarUrl)} 
// // // // //                                             className="w-9 h-9 rounded-full object-cover border border-gray-200 group-hover:border-red-200" 
// // // // //                                             alt={m.name} 
// // // // //                                             onError={(e: any) => { e.target.src = `https://ui-avatars.com/api/?name=${m.name}&background=random`; }}
// // // // //                                         />
// // // // //                                         <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full ${m.role === 'Fasilitator' ? 'bg-purple-500' : 'bg-green-500'}`} title="Online"></div>
// // // // //                                     </div>
// // // // //                                     <div className="flex-1 min-w-0">
// // // // //                                         <p className="text-sm font-bold text-gray-700 truncate group-hover:text-red-700">{m.name}</p>
// // // // //                                         <p className={`text-[10px] uppercase font-bold ${m.role === 'Fasilitator' ? 'text-purple-600' : 'text-gray-400'}`}>
// // // // //                                             {m.role}
// // // // //                                         </p>
// // // // //                                     </div>
// // // // //                                     <button 
// // // // //                                         type="button"
// // // // //                                         onClick={() => insertMention(m.name)} 
// // // // //                                         className="opacity-0 group-hover:opacity-100 text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded border border-red-100 hover:bg-red-100 transition-opacity"
// // // // //                                         title={`Mention @${m.name}`}
// // // // //                                     >
// // // // //                                         @
// // // // //                                     </button>
// // // // //                                 </div>
// // // // //                             ))
// // // // //                         )}
// // // // //                     </div>
// // // // //                 </div>
// // // // //             )}

// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* =========================================================================
// // // // //    PERSONAL CHAT MODAL
// // // // //    ========================================================================= */
// // // // // function PersonalChatModal({ student, onClose }: any) {
// // // // //   const [messages, setMessages] = useState<any[]>([]);
// // // // //   const [newMessage, setNewMessage] = useState('');
// // // // //   const messagesEndRef = useRef<HTMLDivElement>(null);
// // // // //   const targetId = student.user?._id || student._id;
// // // // //   const targetName = student.user?.name || student.name || 'User';

// // // // //   useEffect(() => {
// // // // //     if (targetId) loadHistory();
// // // // //     const interval = setInterval(() => { if (targetId) loadHistory(); }, 5000);
// // // // //     return () => clearInterval(interval);
// // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // //   }, [targetId]);

// // // // //   useEffect(() => {
// // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // //   }, [messages]);

// // // // //   const loadHistory = async () => {
// // // // //     try {
// // // // //       const res = await api(`/api/chat/${targetId}?t=${Date.now()}`);
// // // // //       setMessages(res.messages || []);
// // // // //     } catch (e) { console.error(e); }
// // // // //   };

// // // // //   const handleSend = async (e: React.FormEvent) => {
// // // // //     e.preventDefault();
// // // // //     if (!newMessage.trim()) return;
// // // // //     const msgToSend = newMessage;
// // // // //     setNewMessage('');
// // // // //     try {
// // // // //       await api('/api/chat/send', { method: 'POST', body: { recipientId: targetId, message: msgToSend } });
// // // // //       loadHistory();
// // // // //     } catch (error: any) { alert('Gagal: ' + error.message); }
// // // // //   };

// // // // //   return (
// // // // //     <div className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Chat Personal dengan ${targetName}`}>
// // // // //       <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95">
// // // // //         <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
// // // // //           <div className="font-bold flex items-center gap-2">
// // // // //             <MessageCircle size={18} aria-hidden="true" /> Chat: {targetName}
// // // // //           </div>
// // // // //           <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" aria-label="Tutup Chat" title="Tutup Chat">
// // // // //             <X size={18} aria-hidden="true" />
// // // // //           </button>
// // // // //         </div>
// // // // //         <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-2">
// // // // //           {messages.map((msg: any, i: number) => (
// // // // //             <div key={i} className={`p-2 rounded-lg text-sm max-w-[80%] ${msg.sender === 'me' ? 'bg-indigo-100 ml-auto text-right' : 'bg-white border'}`}>
// // // // //               {msg.message}
// // // // //             </div>
// // // // //           ))}
// // // // //           <div ref={messagesEndRef} />
// // // // //         </div>
// // // // //         <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
// // // // //           <input 
// // // // //             className="flex-1 border rounded-full px-3 py-1.5 text-sm" 
// // // // //             value={newMessage} 
// // // // //             onChange={e => setNewMessage(e.target.value)} 
// // // // //             placeholder="Tulis..." 
// // // // //             aria-label="Input pesan personal"
// // // // //             title="Ketik pesan personal"
// // // // //           />
// // // // //           <button type="submit" className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700" aria-label="Kirim Pesan" title="Kirim">
// // // // //             <Send size={14} aria-hidden="true" />
// // // // //           </button>
// // // // //         </form>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* =========================================================================
// // // // //    MAIN DASHBOARD
// // // // //    ========================================================================= */
// // // // // interface CourseOperatorProps { courseId: string; course: any; facilitators?: any[]; }

// // // // // export default function CourseOperatorDashboard({ courseId, course, facilitators = [] }: CourseOperatorProps) {
// // // // //   const [participants, setParticipants] = useState<any[]>([]);
// // // // //   const [loadingParticipants, setLoadingParticipants] = useState(false);
// // // // //   const [participantFilter, setParticipantFilter] = useState('');
// // // // //   const [actionOptions, setActionOptions] = useState<any[]>([]);
// // // // //   const [selectedActionId, setSelectedActionId] = useState<string>('');
// // // // //   const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
// // // // //   const [showGroupChat, setShowGroupChat] = useState(false);
// // // // //   const [studentDetail, setStudentDetail] = useState<any>(null);
// // // // //   const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);

// // // // //   useEffect(() => {
// // // // //     if (course?.modules) {
// // // // //       const opts: any[] = [];
// // // // //       course.modules.forEach((m: any) => {
// // // // //         m.lessons?.forEach((l: any) => {
// // // // //           let label = l.title;
// // // // //           if (l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
// // // // //           else if (l.type === 'essay') label = `📝 Esai: ${l.title}`;
// // // // //           else if (l.type === 'upload_doc') label = `📤 Upload: ${l.title}`;
// // // // //           opts.push({ id: l._id, label, type: l.type });
// // // // //         });
// // // // //       });
// // // // //       setActionOptions(opts);
// // // // //     }
// // // // //   }, [course]);

// // // // //   const fetchParticipants = async () => {
// // // // //     setLoadingParticipants(true);
// // // // //     try {
// // // // //       const res = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`);
// // // // //       setParticipants(res.participants || []);
// // // // //     } catch (error) { console.error('Gagal load peserta'); } finally { setLoadingParticipants(false); }
// // // // //   };
// // // // //   useEffect(() => { fetchParticipants(); }, [courseId]);

// // // // //   const handleVerifyEnrollment = async (enrollmentId: string, action: 'approve' | 'reject', studentName: string) => {
// // // // //     if (!confirm(`Konfirmasi ${action} untuk ${studentName}?`)) return;
// // // // //     try { await api('/api/courses/verify-enrollment', { method: 'POST', body: { enrollmentId, action } }); alert('Berhasil.'); fetchParticipants(); } catch (e: any) { alert(e.message); }
// // // // //   };

// // // // //   const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => {
// // // // //     if (!selectedActionId) return alert('Pilih Materi dulu!');
// // // // //     const realUserId = participants.find(p => (p.user?._id === studentId) || (p.user === studentId))?.user?._id || studentId;
// // // // //     if (action === 'pass') {
// // // // //       if (!confirm('Luluskan peserta ini manual?')) return;
// // // // //       try { await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId: realUserId, lessonId: selectedActionId, courseId } }); alert('Berhasil diluluskan!'); fetchParticipants(); } catch (e: any) { alert(e.message); }
// // // // //     } else if (action === 'reset') {
// // // // //       if (!confirm('Reset progress materi ini?')) return;
// // // // //       try { await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId: realUserId, quizId: selectedActionId } }); alert('Reset berhasil!'); fetchParticipants(); } catch (e: any) { alert(e.message); }
// // // // //     }
// // // // //   };

// // // // //   const handleRejectParticipant = async (enrollmentId: string) => {
// // // // //     if (!confirm('Hapus permanen peserta ini?')) return;
// // // // //     try { await api(`/api/enrollments/${enrollmentId}`, { method: 'DELETE' }); alert('Dihapus.'); fetchParticipants(); } catch (e: any) { alert(e.message); }
// // // // //   };

// // // // //   const handleDownloadCertificate = async (studentId: string) => {
// // // // //     try {
// // // // //       const token = localStorage.getItem('token');
// // // // //       const BACKEND_URL = 'http://localhost:4000'; // Pastikan port benar
// // // // //       const url = `${BACKEND_URL}/api/courses/certificate/download-admin/${courseId}/${studentId}`;
// // // // //       const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
// // // // //       if (!res.ok) { const err = await res.json(); throw new Error(err.error || "Gagal download"); }
// // // // //       const blob = await res.blob();
// // // // //       const downloadUrl = window.URL.createObjectURL(blob);
// // // // //       const a = document.createElement('a'); a.href = downloadUrl; a.download = `Sertifikat-${studentId}.pdf`;
// // // // //       document.body.appendChild(a); a.click(); a.remove();
// // // // //     } catch (e: any) { alert("Gagal Download: " + e.message); }
// // // // //   };

// // // // //   const pendingParticipants = participants.filter(p => !p.status || p.status === 'pending' || p.status === 'waiting');
// // // // //   const activeParticipants = participants.filter(p => p.status === 'active' || p.status === 'approved');
// // // // //   const passedStudents = participants.filter(p => p.progress >= 100 || p.isCompleted).length;

// // // // //   if (loadingParticipants && participants.length === 0) return <div className="p-10 text-center text-gray-500"><RefreshCw className="animate-spin inline-block mr-2" size={18} /> Memuat data...</div>;

// // // // //   return (
// // // // //     <div className="space-y-8 animate-in slide-in-from-right-4">
// // // // //       {/* HEADER DASHBOARD */}
// // // // //       <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100">
// // // // //         <div className="flex gap-6">
// // // // //           <div className="text-center"><span className="block text-2xl font-bold text-gray-800">{participants.length}</span><span className="text-[10px] text-gray-500 uppercase font-bold">Total</span></div>
// // // // //           <div className="text-center"><span className="block text-2xl font-bold text-green-600">{passedStudents}</span><span className="text-[10px] text-gray-500 uppercase font-bold">Lulus</span></div>
// // // // //           <div className="text-center"><span className="block text-2xl font-bold text-orange-500">{activeParticipants.length}</span><span className="text-[10px] text-gray-500 uppercase font-bold">Aktif</span></div>
// // // // //         </div>
        
// // // // //         {/* Pass data facilitators ke modal */}
// // // // //         <button onClick={() => setShowGroupChat(true)} className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg hover:bg-indigo-700 flex items-center gap-2" title="Buka Ruang Diskusi">
// // // // //             <MessageSquare size={18} aria-hidden="true" /> Ruang Diskusi
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* TABEL PENDING */}
// // // // //       <div className="bg-amber-50 border border-amber-200 rounded-2xl shadow-sm overflow-hidden mb-6">
// // // // //         <div className="px-6 py-3 border-b border-amber-200 bg-amber-100 flex items-center gap-2"><AlertCircle className="text-amber-600" size={18} aria-hidden="true" /><h3 className="font-bold text-amber-900 text-sm">Menunggu Persetujuan ({pendingParticipants.length})</h3></div>
// // // // //         {pendingParticipants.length === 0 ? <div className="p-6 text-center text-gray-400 text-sm italic">Tidak ada antrian.</div> : (
// // // // //           <div className="overflow-x-auto">
// // // // //             <table className="w-full text-left text-sm">
// // // // //                 <tbody className="divide-y divide-amber-200">
// // // // //                     {pendingParticipants.map((p: any) => (
// // // // //                         <tr key={p._id} className="hover:bg-amber-100/50">
// // // // //                             <td className="p-3 font-bold">{p.user?.name}</td>
// // // // //                             <td className="p-3 text-gray-500">{p.user?.email}</td>
// // // // //                             <td className="p-3 text-right">
// // // // //                                 <button type="button" onClick={() => handleVerifyEnrollment(p._id, 'approve', p.user?.name)} className="text-green-700 font-bold hover:underline mr-4" title="Setujui">Setujui</button>
// // // // //                                 <button type="button" onClick={() => handleVerifyEnrollment(p._id, 'reject', p.user?.name)} className="text-red-600 font-bold hover:underline" title="Tolak">Tolak</button>
// // // // //                             </td>
// // // // //                         </tr>
// // // // //                     ))}
// // // // //                 </tbody>
// // // // //             </table>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* TABEL AKTIF */}
// // // // //       <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
// // // // //         <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-wrap gap-4">
// // // // //           <h3 className="font-bold text-gray-800 flex items-center gap-2"><Users size={18} aria-hidden="true" /> Peserta Aktif</h3>
// // // // //           <div className="flex gap-2">
// // // // //             <select className="p-1.5 border rounded text-xs bg-white h-9 focus:ring-2 focus:ring-indigo-500 outline-none" value={selectedActionId} onChange={e => setSelectedActionId(e.target.value)} title="Pilih Materi"><option value="">-- Aksi Cepat --</option>{actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}</select>
// // // // //             <input className="px-3 py-1.5 rounded border text-xs h-9 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Cari..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} title="Cari Peserta" />
// // // // //             <button type="button" onClick={fetchParticipants} className="bg-white border p-1.5 rounded h-9 w-9 flex justify-center items-center hover:bg-gray-100" title="Refresh Data"><RefreshCw size={14} aria-hidden="true" /></button>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="overflow-x-auto">
// // // // //           <table className="w-full text-left border-collapse text-sm">
// // // // //             <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b">
// // // // //               <tr>
// // // // //                 <th className="p-4">Peserta</th>
// // // // //                 <th className="p-4">Sedang Mengerjakan</th>
// // // // //                 <th className="p-4">Progress</th>
// // // // //                 <th className="p-4 text-center">Status</th>
// // // // //                 <th className="p-4 text-center">Aksi Cepat</th>
// // // // //                 <th className="p-4 text-center">Sertifikat</th>
// // // // //                 <th className="p-4 text-center">Detail</th>
// // // // //                 <th className="p-4 text-center">Hapus</th>
// // // // //               </tr>
// // // // //             </thead>
// // // // //             <tbody className="divide-y divide-gray-100">
// // // // //               {activeParticipants.filter(p => (p.user?.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => {
// // // // //                 const rawProgress = Number(p.progress);
// // // // //                 const progressValue = Number.isFinite(rawProgress) ? Math.max(0, Math.min(100, Math.round(rawProgress))) : 0;
// // // // //                 const isActionCompleted = selectedActionId && p.completedLessons?.includes(selectedActionId);
// // // // //                 const isLulus = progressValue === 100 || p.isCompleted;

// // // // //                 return (
// // // // //                   <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
// // // // //                     <td className="p-4"><div className="font-bold text-gray-900">{p.user?.name}</div><div className="text-xs text-gray-500">{p.user?.email}</div></td>
// // // // //                     <td className="p-4"><div className="flex items-center gap-2 text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 w-fit"><div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />{p.currentPosition || 'Belum Memulai'}</div></td>
// // // // //                     <td className="p-4 w-44"><div className="flex justify-between text-xs font-bold mb-1"><span>{progressValue}%</span></div><progress max={100} value={progressValue} className="w-full h-1.5 [&::-webkit-progress-bar]:bg-gray-100 [&::-webkit-progress-value]:bg-blue-500" title={`Progress: ${progressValue}%`} /></td>
// // // // //                     <td className="p-4 text-center">{isLulus ? <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">LULUS</span> : <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">PROSES</span>}</td>
// // // // //                     <td className="p-4 text-center">{selectedActionId ? (<button type="button" onClick={() => handleParticipantAction(p.user?._id, 'pass')} disabled={isActionCompleted} className={`px-2 py-1 rounded text-xs font-bold border ${isActionCompleted ? 'bg-gray-100 text-gray-400' : 'bg-white text-blue-600 hover:bg-blue-50'}`} title={isActionCompleted ? "Sudah Selesai" : "Luluskan Materi"}>{isActionCompleted ? 'Selesai' : 'Luluskan'}</button>) : '-'}</td>
// // // // //                     <td className="p-4 text-center">{isLulus ? (<button type="button" onClick={() => handleDownloadCertificate(p.user?._id)} className="text-green-600 hover:text-green-800 p-1.5 rounded hover:bg-green-50 border border-green-200" title="Download Sertifikat"><Award size={18} aria-hidden="true" /></button>) : (<span className="text-gray-300 text-xs italic">Belum Lulus</span>)}</td>
// // // // //                     <td className="p-4 text-center"><button type="button" onClick={() => { setStudentDetail(p); setShowStudentDetailModal(true); }} className="text-gray-400 hover:text-indigo-600" title="Lihat Detail"><Eye size={18} aria-hidden="true" /></button></td>
// // // // //                     <td className="p-4 text-center"><button type="button" onClick={() => { setChatTargetStudent(p); }} className="text-gray-400 hover:text-blue-600 mr-2" title="Chat Personal"><MessageCircle size={18} aria-hidden="true" /></button><button type="button" onClick={() => handleRejectParticipant(p._id)} className="text-gray-300 hover:text-red-600" title="Hapus Peserta"><Trash2 size={16} aria-hidden="true" /></button></td>
// // // // //                   </tr>
// // // // //                 );
// // // // //               })}
// // // // //             </tbody>
// // // // //           </table>
// // // // //         </div>
// // // // //       </div>

// // // // //       {chatTargetStudent && <PersonalChatModal student={chatTargetStudent} onClose={() => setChatTargetStudent(null)} />}
      
// // // // //       {/* Group Chat Modal dengan Passing Data Lengkap */}
// // // // //       {showGroupChat && (
// // // // //         <GroupChatModal 
// // // // //             courseId={courseId} 
// // // // //             participants={activeParticipants} 
// // // // //             facilitators={course.facilitatorIds || facilitators} // Prioritaskan data di course object
// // // // //             onClose={() => setShowGroupChat(false)} 
// // // // //         />
// // // // //       )}
      
// // // // //       {showStudentDetailModal && studentDetail && (
// // // // //         <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Detail Peserta Modal">
// // // // //           <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // // // //             <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md"><h3 className="font-bold flex items-center gap-2"><Users size={20} aria-hidden="true" /> Detail: {studentDetail.user?.name}</h3><button type="button" onClick={() => setShowStudentDetailModal(false)} title="Tutup"><X size={24} aria-hidden="true" /></button></div>
// // // // //             <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
// // // // //               {course?.modules?.map((m: any) => (<div key={m._id} className="bg-white border rounded-xl overflow-hidden shadow-sm"><div className="bg-gray-100 px-4 py-2 border-b font-bold text-sm text-gray-700">{m.title}</div><div className="divide-y">{m.lessons.map((l: any) => { const isDone = studentDetail.completedLessons?.includes(l._id); return (<div key={l._id} className="p-3 flex justify-between items-center hover:bg-gray-50"><div className="flex items-center gap-3"><div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isDone ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>{isDone && <Check size={12} aria-hidden="true" />}</div><span className={`text-sm ${isDone ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{l.title}</span></div><span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">{l.type}</span></div>); })}</div></div>))}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }



// // // // 'use client';

// // // // import { useState, useEffect, useRef } from 'react';
// // // // import { api, getImageUrl } from '@/lib/api';
// // // // import { useAuth } from '@/lib/AuthProvider';
// // // // import { RefreshCw, Users, Eye, MessageCircle, Trash2, AlertCircle, Award, Send, X, Check } from 'lucide-react';
// // // // import CourseGroupChat from '@/components/CourseGroupChat'; 

// // // // // --- PERSONAL CHAT MODAL ---
// // // // function PersonalChatModal({ student, onClose }: any) {
// // // //   const [messages, setMessages] = useState<any[]>([]);
// // // //   const [newMessage, setNewMessage] = useState('');
// // // //   const messagesEndRef = useRef<HTMLDivElement>(null);
// // // //   const targetId = student.user?._id || student._id || student.user; 
// // // //   const targetName = student.user?.name || student.name || 'User';

// // // //   useEffect(() => {
// // // //     if (targetId) loadHistory();
// // // //     const interval = setInterval(() => { if (targetId) loadHistory(); }, 5000);
// // // //     return () => clearInterval(interval);
// // // //   }, [targetId]);

// // // //   useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

// // // //   const loadHistory = async () => {
// // // //     try {
// // // //       const res = await api(`/api/chat/${targetId}?t=${Date.now()}`);
// // // //       setMessages(res.messages || []);
// // // //     } catch (e) { console.error(e); }
// // // //   };

// // // //   const handleSend = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     if (!newMessage.trim()) return;
// // // //     try {
// // // //       await api('/api/chat/send', { method: 'POST', body: { recipientId: targetId, message: newMessage } });
// // // //       setNewMessage('');
// // // //       loadHistory();
// // // //     } catch (error: any) { alert('Gagal: ' + error.message); }
// // // //   };

// // // //   return (
// // // //     <div className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Chat Personal dengan ${targetName}`}>
// // // //       <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-xl flex flex-col overflow-hidden">
// // // //         <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
// // // //           <div className="font-bold flex items-center gap-2"><MessageCircle size={18}/> Chat: {targetName}</div>
// // // //           <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20}/></button>
// // // //         </div>
// // // //         <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-2">
// // // //           {messages.map((msg: any, i: number) => (
// // // //             <div key={i} className={`p-2 rounded-lg text-sm max-w-[80%] ${msg.sender === 'me' ? 'bg-indigo-100 ml-auto text-right' : 'bg-white border'}`}>{msg.message}</div>
// // // //           ))}
// // // //           <div ref={messagesEndRef} />
// // // //         </div>
// // // //         <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
// // // //           <input className="flex-1 border rounded-full px-3 py-1.5 text-sm" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Tulis..." aria-label="Pesan" />
// // // //           <button type="submit" className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700" title="Kirim" aria-label="Kirim"><Send size={14}/></button>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // interface CourseOperatorProps { courseId: string; course: any; facilitators?: any[]; }

// // // // export default function CourseOperatorDashboard({ courseId, course, facilitators = [] }: CourseOperatorProps) {
// // // //   const { user } = useAuth();
// // // //   const [participants, setParticipants] = useState<any[]>([]);
// // // //   const [loadingParticipants, setLoadingParticipants] = useState(false);
// // // //   const [participantFilter, setParticipantFilter] = useState('');
// // // //   const [actionOptions, setActionOptions] = useState<any[]>([]);
// // // //   const [selectedActionId, setSelectedActionId] = useState<string>('');
  
// // // //   const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
// // // //   const [showGroupChat, setShowGroupChat] = useState(false);
// // // //   const [studentDetail, setStudentDetail] = useState<any>(null);
// // // //   const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);

// // // //   // [FIX] Menggabungkan fasilitator dari props ATAU dari course object agar tidak hilang
// // // //   const activeFacilitators = (course.facilitatorIds && course.facilitatorIds.length > 0) 
// // // //       ? course.facilitatorIds 
// // // //       : facilitators;

// // // //   useEffect(() => {
// // // //     if (course?.modules) {
// // // //       const opts: any[] = [];
// // // //       course.modules.forEach((m: any) => {
// // // //         m.lessons?.forEach((l: any) => {
// // // //           let label = l.title;
// // // //           if (l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
// // // //           else if (l.type === 'essay') label = `📝 Esai: ${l.title}`;
// // // //           else if (l.type === 'upload_doc') label = `📤 Upload: ${l.title}`;
// // // //           opts.push({ id: l._id, label, type: l.type });
// // // //         });
// // // //       });
// // // //       setActionOptions(opts);
// // // //     }
// // // //   }, [course]);

// // // //   const fetchParticipants = async () => {
// // // //     setLoadingParticipants(true);
// // // //     try {
// // // //       const res = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`);
// // // //       setParticipants(res.participants || []);
// // // //     } catch (error) { console.error('Gagal load peserta'); } finally { setLoadingParticipants(false); }
// // // //   };
// // // //   useEffect(() => { fetchParticipants(); }, [courseId]);

// // // //   const handleVerifyEnrollment = async (enrollmentId: string, action: 'approve' | 'reject', studentName: string) => {
// // // //     if (!confirm(`Konfirmasi?`)) return;
// // // //     try { await api('/api/courses/verify-enrollment', { method: 'POST', body: { enrollmentId, action } }); alert('Berhasil.'); fetchParticipants(); } catch (e: any) { alert(e.message); }
// // // //   };
  
// // // //   const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => {
// // // //     if (!selectedActionId) return alert('Pilih Materi!');
// // // //     const realUserId = participants.find(p => (p.user?._id === studentId) || (p.user === studentId))?.user?._id || studentId;
// // // //     try {
// // // //         if(action==='pass') await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId: realUserId, lessonId: selectedActionId, courseId } });
// // // //         else await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId: realUserId, quizId: selectedActionId } });
// // // //         alert('Berhasil!'); fetchParticipants();
// // // //     } catch(e:any){ alert(e.message); }
// // // //   };

// // // //   const handleRejectParticipant = async (id: string) => { if(confirm('Hapus?')) { await api(`/api/enrollments/${id}`, { method: 'DELETE' }); alert('Dihapus.'); fetchParticipants(); }};
// // // //   const handleDownloadCertificate = async (sid: string) => { 
// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       const BACKEND_URL = 'http://localhost:4000'; 
// // // //       const url = `${BACKEND_URL}/api/courses/certificate/download-admin/${courseId}/${sid}`;
// // // //       const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
// // // //       if (!res.ok) { const err = await res.json(); throw new Error(err.error || "Gagal download"); }
// // // //       const blob = await res.blob();
// // // //       const urlBlob = window.URL.createObjectURL(blob);
// // // //       const a = document.createElement('a'); a.href = urlBlob; a.download = `Sertifikat-${sid}.pdf`;
// // // //       document.body.appendChild(a); a.click(); a.remove();
// // // //     } catch (e: any) { alert("Gagal Download: " + e.message); }
// // // //   };

// // // //   const pendingParticipants = participants.filter(p => !p.status || p.status === 'pending' || p.status === 'waiting');
// // // //   const activeParticipants = participants.filter(p => p.status === 'active' || p.status === 'approved');
// // // //   const passedStudents = participants.filter(p => p.progress >= 100 || p.isCompleted).length;

// // // //   if (loadingParticipants && participants.length === 0) return <div className="p-10 text-center"><RefreshCw className="animate-spin inline-block mr-2" size={18} /></div>;

// // // //   return (
// // // //     <div className="space-y-8 animate-in slide-in-from-right-4">
// // // //       {/* HEADER */}
// // // //       <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100">
// // // //         <div className="flex gap-6">
// // // //           <div className="text-center"><span className="block text-2xl font-bold text-gray-800">{participants.length}</span><span className="text-[10px] text-gray-500 font-bold">Total</span></div>
// // // //           <div className="text-center"><span className="block text-2xl font-bold text-green-600">{passedStudents}</span><span className="text-[10px] text-gray-500 font-bold">Lulus</span></div>
// // // //           <div className="text-center"><span className="block text-2xl font-bold text-orange-500">{activeParticipants.length}</span><span className="text-[10px] text-gray-500 font-bold">Aktif</span></div>
// // // //         </div>
// // // //         <button onClick={() => setShowGroupChat(true)} className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg hover:bg-indigo-700 flex items-center gap-2" title="Buka Ruang Diskusi">
// // // //             <MessageCircle size={18} /> Ruang Diskusi
// // // //         </button>
// // // //       </div>

// // // //       {/* PENDING */}
// // // //       <div className="bg-amber-50 border border-amber-200 rounded-2xl shadow-sm overflow-hidden mb-6">
// // // //         <div className="px-6 py-3 border-b border-amber-200 bg-amber-100 flex items-center gap-2"><AlertCircle className="text-amber-600" size={18}/><h3 className="font-bold text-amber-900 text-sm">Menunggu Persetujuan ({pendingParticipants.length})</h3></div>
// // // //         {pendingParticipants.length === 0 ? <div className="p-6 text-center text-gray-400 text-sm italic">Tidak ada antrian.</div> : (
// // // //           <div className="overflow-x-auto">
// // // //             <table className="w-full text-left text-sm"><tbody className="divide-y divide-amber-200">{pendingParticipants.map((p: any) => (<tr key={p._id} className="hover:bg-amber-100/50"><td className="p-3 font-bold">{p.user?.name}</td><td className="p-3 text-gray-500">{p.user?.email}</td><td className="p-3 text-right"><button onClick={() => handleVerifyEnrollment(p._id, 'approve', p.user?.name)} className="text-green-700 font-bold hover:underline mr-4" title="Setujui">Setujui</button><button onClick={() => handleVerifyEnrollment(p._id, 'reject', p.user?.name)} className="text-red-600 font-bold hover:underline" title="Tolak">Tolak</button></td></tr>))}</tbody></table>
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {/* ACTIVE TABLE */}
// // // //       <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
// // // //         <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-wrap gap-4">
// // // //           <h3 className="font-bold text-gray-800 flex items-center gap-2"><Users size={18}/> Peserta Aktif</h3>
// // // //           <div className="flex gap-2">
// // // //             <select className="p-1.5 border rounded text-xs bg-white h-9 outline-none" value={selectedActionId} onChange={e => setSelectedActionId(e.target.value)} title="Aksi Cepat"><option value="">-- Aksi Cepat --</option>{actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}</select>
// // // //             <input className="px-3 py-1.5 rounded border text-xs h-9 outline-none" placeholder="Cari..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} title="Cari Peserta" />
// // // //             <button type="button" onClick={fetchParticipants} className="bg-white border p-1.5 rounded h-9 w-9 flex justify-center items-center hover:bg-gray-100" title="Refresh"><RefreshCw size={14}/></button>
// // // //           </div>
// // // //         </div>
// // // //         <div className="overflow-x-auto">
// // // //           <table className="w-full text-left border-collapse text-sm">
// // // //             <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b">
// // // //               <tr><th className="p-4">Peserta</th><th className="p-4">Progress</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Aksi</th><th className="p-4 text-center">Sertifikat</th><th className="p-4 text-center">Detail</th><th className="p-4 text-center">Chat/Hapus</th></tr>
// // // //             </thead>
// // // //             <tbody className="divide-y divide-gray-100">
// // // //               {activeParticipants.filter(p => (p.user?.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => {
// // // //                 const rawProgress = Number(p.progress);
// // // //                 const progressValue = Number.isFinite(rawProgress) ? Math.max(0, Math.min(100, Math.round(rawProgress))) : 0;
// // // //                 const isLulus = progressValue === 100 || p.isCompleted;
// // // //                 return (
// // // //                   <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
// // // //                     <td className="p-4"><div className="font-bold text-gray-900">{p.user?.name}</div><div className="text-xs text-gray-500">{p.user?.email}</div></td>
                    
// // // //                     {/* [FIX] KOLOM PROGRESS DENGAN % */}
// // // //                     <td className="p-4 w-44">
// // // //                         <div className="flex items-center gap-2">
// // // //                             <span className="text-xs font-bold text-gray-600 w-8">{progressValue}%</span>
// // // //                             <progress max={100} value={progressValue} className="flex-1 h-1.5" />
// // // //                         </div>
// // // //                     </td>
                    
// // // //                     <td className="p-4 text-center">{isLulus ? <span className="text-green-600 font-bold">LULUS</span> : <span className="text-orange-500 font-bold">PROSES</span>}</td>
// // // //                     <td className="p-4 text-center">{selectedActionId ? (<button onClick={() => handleParticipantAction(p.user?._id, 'pass')} className="text-xs bg-gray-100 px-2 py-1 rounded" title="Proses">Proses</button>) : '-'}</td>
                    
// // // //                     {/* [FIX] TOMBOL SERTIFIKAT */}
// // // //                     <td className="p-4 text-center">
// // // //                         {isLulus ? (
// // // //                             <button onClick={() => handleDownloadCertificate(p.user?._id)} className="text-green-600 hover:text-green-800 p-1.5 rounded" title="Download Sertifikat"><Award size={18}/></button>
// // // //                         ) : <span className="text-gray-300 text-xs italic">-</span>}
// // // //                     </td>

// // // //                     <td className="p-4 text-center"><button onClick={() => { setStudentDetail(p); setShowStudentDetailModal(true); }} className="text-gray-400 hover:text-indigo-600" title="Detail"><Eye size={18} /></button></td>
// // // //                     <td className="p-4 text-center">
// // // //                         <button onClick={() => setChatTargetStudent(p)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded" title="Chat"><MessageCircle size={18}/></button>
// // // //                         <button onClick={() => handleRejectParticipant(p._id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded" title="Hapus"><Trash2 size={18}/></button>
// // // //                     </td>
// // // //                   </tr>
// // // //                 );
// // // //               })}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       </div>

// // // //       {chatTargetStudent && <PersonalChatModal student={chatTargetStudent} onClose={() => setChatTargetStudent(null)} />}
      
// // // //       {/* [FIX] GROUP CHAT DENGAN FACILITATORS */}
// // // //       {showGroupChat && (
// // // //         <CourseGroupChat 
// // // //             courseId={courseId}
// // // //             currentUser={user} 
// // // //             participants={participants} 
// // // //             facilitators={activeFacilitators} 
// // // //             onClose={() => setShowGroupChat(false)} 
// // // //             isFloating={false} 
// // // //         />
// // // //       )}
      
// // // //       {showStudentDetailModal && studentDetail && (
// // // //         <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4">
// // // //           <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // // //             <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md"><h3 className="font-bold flex items-center gap-2"><Users size={20} /> Detail: {studentDetail.user?.name}</h3><button type="button" onClick={() => setShowStudentDetailModal(false)} title="Tutup"><X size={24} /></button></div>
// // // //             <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
// // // //               {course?.modules?.map((m: any) => (<div key={m._id} className="bg-white border rounded-xl overflow-hidden shadow-sm"><div className="bg-gray-100 px-4 py-2 border-b font-bold text-sm text-gray-700">{m.title}</div><div className="divide-y">{m.lessons.map((l: any) => { const isDone = studentDetail.completedLessons?.includes(l._id); return (<div key={l._id} className="p-3 flex justify-between items-center hover:bg-gray-50"><div className="flex items-center gap-3"><div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isDone ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>{isDone && <Check size={12} />}</div><span className={`text-sm ${isDone ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{l.title}</span></div><span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">{l.type}</span></div>); })}</div></div>))}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect, useRef } from 'react';
// // // import { api, getImageUrl } from '@/lib/api';
// // // import { useAuth } from '@/lib/AuthProvider';
// // // import { RefreshCw, Users, Eye, MessageCircle, Trash2, AlertCircle, Award, Send, X, Check } from 'lucide-react';
// // // import CourseGroupChat from '@/components/CourseGroupChat'; 

// // // // ... (Personal Chat Modal logic - tetap sama) ...
// // // function PersonalChatModal({ student, onClose }: any) {
// // //   const [messages, setMessages] = useState<any[]>([]);
// // //   const [newMessage, setNewMessage] = useState('');
// // //   const messagesEndRef = useRef<HTMLDivElement>(null);
// // //   const targetId = student.user?._id || student._id || student.user; 
// // //   const targetName = student.user?.name || student.name || 'User';

// // //   useEffect(() => {
// // //     if (targetId) loadHistory();
// // //     const interval = setInterval(() => { if (targetId) loadHistory(); }, 5000);
// // //     return () => clearInterval(interval);
// // //   }, [targetId]);

// // //   useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

// // //   const loadHistory = async () => {
// // //     try {
// // //       const res = await api(`/api/chat/${targetId}?t=${Date.now()}`);
// // //       setMessages(res.messages || []);
// // //     } catch (e) { console.error(e); }
// // //   };

// // //   const handleSend = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!newMessage.trim()) return;
// // //     try {
// // //       await api('/api/chat/send', { method: 'POST', body: { recipientId: targetId, message: newMessage } });
// // //       setNewMessage('');
// // //       loadHistory();
// // //     } catch (error: any) { alert('Gagal: ' + error.message); }
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Chat Personal`}>
// // //       <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-xl flex flex-col overflow-hidden">
// // //         <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
// // //           <div className="font-bold flex items-center gap-2"><MessageCircle size={18}/> Chat: {targetName}</div>
// // //           <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20}/></button>
// // //         </div>
// // //         <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-2">
// // //           {messages.map((msg: any, i: number) => (
// // //             <div key={i} className={`p-2 rounded-lg text-sm max-w-[80%] ${msg.sender === 'me' ? 'bg-indigo-100 ml-auto text-right' : 'bg-white border'}`}>{msg.message}</div>
// // //           ))}
// // //           <div ref={messagesEndRef} />
// // //         </div>
// // //         <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
// // //           <input className="flex-1 border rounded-full px-3 py-1.5 text-sm" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Tulis..." aria-label="Pesan" />
// // //           <button type="submit" className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={14}/></button>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // interface CourseOperatorProps { courseId: string; course: any; facilitators?: any[]; }

// // // export default function CourseOperatorDashboard({ courseId, course, facilitators = [] }: CourseOperatorProps) {
// // //   const { user } = useAuth();
// // //   const [participants, setParticipants] = useState<any[]>([]);
// // //   const [loadingParticipants, setLoadingParticipants] = useState(false);
// // //   const [participantFilter, setParticipantFilter] = useState('');
// // //   const [actionOptions, setActionOptions] = useState<any[]>([]);
// // //   const [selectedActionId, setSelectedActionId] = useState<string>('');
  
// // //   const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
// // //   const [showGroupChat, setShowGroupChat] = useState(false);
// // //   const [studentDetail, setStudentDetail] = useState<any>(null);
// // //   const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);

// // //   const activeFacilitators = (course.facilitatorIds && course.facilitatorIds.length > 0) 
// // //       ? course.facilitatorIds 
// // //       : facilitators;

// // //   useEffect(() => {
// // //     if (course?.modules) {
// // //       const opts: any[] = [];
// // //       course.modules.forEach((m: any) => {
// // //         m.lessons?.forEach((l: any) => {
// // //           let label = l.title;
// // //           if (l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
// // //           else if (l.type === 'essay') label = `📝 Esai: ${l.title}`;
// // //           else if (l.type === 'upload_doc') label = `📤 Upload: ${l.title}`;
// // //           opts.push({ id: l._id, label, type: l.type });
// // //         });
// // //       });
// // //       setActionOptions(opts);
// // //     }
// // //   }, [course]);

// // //   const fetchParticipants = async () => {
// // //     setLoadingParticipants(true);
// // //     try {
// // //       const res = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`);
// // //       setParticipants(res.participants || []);
// // //     } catch (error) { console.error('Gagal load peserta'); } finally { setLoadingParticipants(false); }
// // //   };
// // //   useEffect(() => { fetchParticipants(); }, [courseId]);

// // //   const handleVerifyEnrollment = async (enrollmentId: string, action: 'approve' | 'reject', studentName: string) => {
// // //     if (!confirm(`Konfirmasi?`)) return;
// // //     try { await api('/api/courses/verify-enrollment', { method: 'POST', body: { enrollmentId, action } }); alert('Berhasil.'); fetchParticipants(); } catch (e: any) { alert(e.message); }
// // //   };
  
// // //   const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => {
// // //     if (!selectedActionId) return alert('Pilih Materi!');
// // //     const realUserId = participants.find(p => (p.user?._id === studentId) || (p.user === studentId))?.user?._id || studentId;
// // //     try {
// // //         if(action==='pass') await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId: realUserId, lessonId: selectedActionId, courseId } });
// // //         else await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId: realUserId, quizId: selectedActionId } });
// // //         alert('Berhasil!'); fetchParticipants();
// // //     } catch(e:any){ alert(e.message); }
// // //   };

// // //   const handleRejectParticipant = async (id: string) => { if(confirm('Hapus?')) { await api(`/api/enrollments/${id}`, { method: 'DELETE' }); alert('Dihapus.'); fetchParticipants(); }};
  
// // //   const handleDownloadCertificate = async (sid: string) => { 
// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       const BACKEND_URL = 'http://localhost:4000'; 
// // //       const url = `${BACKEND_URL}/api/courses/certificate/download-admin/${courseId}/${sid}`;
// // //       const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
// // //       if (!res.ok) { const err = await res.json(); throw new Error(err.error || "Gagal download"); }
// // //       const blob = await res.blob();
// // //       const urlBlob = window.URL.createObjectURL(blob);
// // //       const a = document.createElement('a'); a.href = urlBlob; a.download = `Sertifikat-${sid}.pdf`;
// // //       document.body.appendChild(a); a.click(); a.remove();
// // //     } catch (e: any) { alert("Gagal Download: " + e.message); }
// // //   };

// // //   const pendingParticipants = participants.filter(p => !p.status || p.status === 'pending' || p.status === 'waiting');
// // //   const activeParticipants = participants.filter(p => p.status === 'active' || p.status === 'approved');
// // //   const passedStudents = participants.filter(p => p.progress >= 100 || p.isCompleted).length;

// // //   if (loadingParticipants && participants.length === 0) return <div className="p-10 text-center"><RefreshCw className="animate-spin inline-block mr-2" size={18} /></div>;

// // //   return (
// // //     <div className="space-y-8 animate-in slide-in-from-right-4">
// // //       {/* HEADER STATS */}
// // //       <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100">
// // //         <div className="flex gap-6">
// // //           <div className="text-center"><span className="block text-2xl font-bold text-gray-800">{participants.length}</span><span className="text-[10px] text-gray-500 font-bold">Total</span></div>
// // //           <div className="text-center"><span className="block text-2xl font-bold text-green-600">{passedStudents}</span><span className="text-[10px] text-gray-500 font-bold">Lulus</span></div>
// // //           <div className="text-center"><span className="block text-2xl font-bold text-orange-500">{activeParticipants.length}</span><span className="text-[10px] text-gray-500 font-bold">Aktif</span></div>
// // //         </div>
// // //         <button onClick={() => setShowGroupChat(true)} className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg hover:bg-indigo-700 flex items-center gap-2" title="Buka Ruang Diskusi">
// // //             <MessageCircle size={18} /> Ruang Diskusi
// // //         </button>
// // //       </div>

// // //       {/* PENDING TABLE */}
// // //       <div className="bg-amber-50 border border-amber-200 rounded-2xl shadow-sm overflow-hidden mb-6">
// // //         <div className="px-6 py-3 border-b border-amber-200 bg-amber-100 flex items-center gap-2"><AlertCircle className="text-amber-600" size={18}/><h3 className="font-bold text-amber-900 text-sm">Menunggu Persetujuan ({pendingParticipants.length})</h3></div>
// // //         {pendingParticipants.length === 0 ? <div className="p-6 text-center text-gray-400 text-sm italic">Tidak ada antrian.</div> : (
// // //           <div className="overflow-x-auto">
// // //             <table className="w-full text-left text-sm"><tbody className="divide-y divide-amber-200">{pendingParticipants.map((p: any) => (<tr key={p._id} className="hover:bg-amber-100/50"><td className="p-3 font-bold">{p.user?.name}</td><td className="p-3 text-gray-500">{p.user?.email}</td><td className="p-3 text-right"><button onClick={() => handleVerifyEnrollment(p._id, 'approve', p.user?.name)} className="text-green-700 font-bold hover:underline mr-4" title="Setujui">Setujui</button><button onClick={() => handleVerifyEnrollment(p._id, 'reject', p.user?.name)} className="text-red-600 font-bold hover:underline" title="Tolak">Tolak</button></td></tr>))}</tbody></table>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* ACTIVE TABLE */}
// // //       <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
// // //         <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-wrap gap-4">
// // //           <h3 className="font-bold text-gray-800 flex items-center gap-2"><Users size={18}/> Peserta Aktif</h3>
// // //           <div className="flex gap-2">
// // //             <select className="p-1.5 border rounded text-xs bg-white h-9 outline-none" value={selectedActionId} onChange={e => setSelectedActionId(e.target.value)} title="Aksi Cepat"><option value="">-- Aksi Cepat --</option>{actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}</select>
// // //             <input className="px-3 py-1.5 rounded border text-xs h-9 outline-none" placeholder="Cari..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} title="Cari Peserta" />
// // //             <button type="button" onClick={fetchParticipants} className="bg-white border p-1.5 rounded h-9 w-9 flex justify-center items-center hover:bg-gray-100" title="Refresh"><RefreshCw size={14}/></button>
// // //           </div>
// // //         </div>
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-left border-collapse text-sm">
// // //             <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b">
// // //               <tr>
// // //                 <th className="p-4">Peserta</th>
// // //                 <th className="p-4">Progress</th>
// // //                 <th className="p-4 text-center">Status</th>
// // //                 <th className="p-4 text-center">Aksi</th>
// // //                 <th className="p-4 text-center">Sertifikat</th>
// // //                 <th className="p-4 text-center">Detail</th>
// // //                 <th className="p-4 text-center">Chat/Hapus</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="divide-y divide-gray-100">
// // //               {activeParticipants.filter(p => (p.user?.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => {
// // //                 const rawProgress = Number(p.progress);
// // //                 const progressValue = Number.isFinite(rawProgress) ? Math.max(0, Math.min(100, Math.round(rawProgress))) : 0;
// // //                 const isLulus = progressValue === 100 || p.isCompleted;
// // //                 return (
// // //                   <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
// // //                     <td className="p-4"><div className="font-bold text-gray-900">{p.user?.name}</div><div className="text-xs text-gray-500">{p.user?.email}</div></td>
                    
// // //                     {/* [FIX] Progress Bar + Text % */}
// // //                     <td className="p-4 w-44">
// // //                         <div className="flex items-center gap-2">
// // //                             <span className="text-xs font-bold text-gray-600 w-8">{progressValue}%</span>
// // //                             <progress max={100} value={progressValue} className="flex-1 h-1.5 [&::-webkit-progress-bar]:bg-gray-100 [&::-webkit-progress-value]:bg-blue-500 rounded" title={`${progressValue}%`} />
// // //                         </div>
// // //                     </td>
                    
// // //                     <td className="p-4 text-center">{isLulus ? <span className="text-green-600 font-bold">LULUS</span> : <span className="text-orange-500 font-bold">PROSES</span>}</td>
// // //                     <td className="p-4 text-center">{selectedActionId ? (<button onClick={() => handleParticipantAction(p.user?._id, 'pass')} className="text-xs bg-gray-100 px-2 py-1 rounded" title="Proses">Proses</button>) : '-'}</td>
                    
// // //                     {/* [FIX] Tombol Download Sertifikat */}
// // //                     <td className="p-4 text-center">
// // //                         {isLulus ? (
// // //                             <button onClick={() => handleDownloadCertificate(p.user?._id)} className="text-green-600 hover:text-green-800 p-1.5 rounded hover:bg-green-50 border border-green-200" title="Download Sertifikat"><Award size={18}/></button>
// // //                         ) : <span className="text-gray-300 text-xs italic">-</span>}
// // //                     </td>

// // //                     <td className="p-4 text-center"><button onClick={() => { setStudentDetail(p); setShowStudentDetailModal(true); }} className="text-gray-400 hover:text-indigo-600" title="Detail"><Eye size={18} /></button></td>
// // //                     <td className="p-4 text-center">
// // //                         <button onClick={() => setChatTargetStudent(p)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded" title="Chat"><MessageCircle size={18}/></button>
// // //                         <button onClick={() => handleRejectParticipant(p._id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded" title="Hapus"><Trash2 size={18}/></button>
// // //                     </td>
// // //                   </tr>
// // //                 );
// // //               })}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>

// // //       {chatTargetStudent && <PersonalChatModal student={chatTargetStudent} onClose={() => setChatTargetStudent(null)} />}
      
// // //       {showGroupChat && (
// // //         <CourseGroupChat 
// // //             courseId={courseId}
// // //             currentUser={user} 
// // //             participants={participants} 
// // //             facilitators={activeFacilitators} 
// // //             onClose={() => setShowGroupChat(false)} 
// // //             isFloating={false} 
// // //         />
// // //       )}
      
// // //       {showStudentDetailModal && studentDetail && (
// // //         <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Detail Peserta Modal">
// // //           <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // //             <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md"><h3 className="font-bold flex items-center gap-2"><Users size={20} aria-hidden="true" /> Detail: {studentDetail.user?.name}</h3><button type="button" onClick={() => setShowStudentDetailModal(false)} title="Tutup"><X size={24} aria-hidden="true" /></button></div>
// // //             <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
// // //               {course?.modules?.map((m: any) => (<div key={m._id} className="bg-white border rounded-xl overflow-hidden shadow-sm"><div className="bg-gray-100 px-4 py-2 border-b font-bold text-sm text-gray-700">{m.title}</div><div className="divide-y">{m.lessons.map((l: any) => { const isDone = studentDetail.completedLessons?.includes(l._id); return (<div key={l._id} className="p-3 flex justify-between items-center hover:bg-gray-50"><div className="flex items-center gap-3"><div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isDone ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>{isDone && <Check size={12} aria-hidden="true" />}</div><span className={`text-sm ${isDone ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{l.title}</span></div><span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">{l.type}</span></div>); })}</div></div>))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { api, getImageUrl } from '@/lib/api';
// // import { useAuth } from '@/lib/AuthProvider';
// // import { RefreshCw, Users, Eye, MessageCircle, Trash2, AlertCircle, Award, Send, X, Check } from 'lucide-react';
// // import CourseGroupChat from '@/components/CourseGroupChat'; 

// // // --- PERSONAL CHAT MODAL ---
// // function PersonalChatModal({ student, onClose }: any) {
// //   const [messages, setMessages] = useState<any[]>([]);
// //   const [newMessage, setNewMessage] = useState('');
// //   const messagesEndRef = useRef<HTMLDivElement>(null);
// //   const targetId = student.user?._id || student._id || student.user; 
// //   const targetName = student.user?.name || student.name || 'User';

// //   useEffect(() => {
// //     if (targetId) loadHistory();
// //     const interval = setInterval(() => { if (targetId) loadHistory(); }, 5000);
// //     return () => clearInterval(interval);
// //   }, [targetId]);

// //   useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

// //   const loadHistory = async () => {
// //     try {
// //       const res = await api(`/api/chat/${targetId}?t=${Date.now()}`);
// //       setMessages(res.messages || []);
// //     } catch (e) { console.error(e); }
// //   };

// //   const handleSend = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!newMessage.trim()) return;
// //     try {
// //       await api('/api/chat/send', { method: 'POST', body: { recipientId: targetId, message: newMessage } });
// //       setNewMessage('');
// //       loadHistory();
// //     } catch (error: any) { alert('Gagal: ' + error.message); }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Chat Personal`}>
// //       <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-xl flex flex-col overflow-hidden">
// //         <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
// //           <div className="font-bold flex items-center gap-2"><MessageCircle size={18}/> Chat: {targetName}</div>
// //           <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20}/></button>
// //         </div>
// //         <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-2">
// //           {messages.map((msg: any, i: number) => (
// //             <div key={i} className={`p-2 rounded-lg text-sm max-w-[80%] ${msg.sender === 'me' ? 'bg-indigo-100 ml-auto text-right' : 'bg-white border'}`}>{msg.message}</div>
// //           ))}
// //           <div ref={messagesEndRef} />
// //         </div>
// //         <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
// //           <input className="flex-1 border rounded-full px-3 py-1.5 text-sm" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Tulis..." aria-label="Pesan" />
// //           <button type="submit" className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={14}/></button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // interface CourseOperatorProps { courseId: string; course: any; facilitators?: any[]; }

// // export default function CourseOperatorDashboard({ courseId, course, facilitators = [] }: CourseOperatorProps) {
// //   const { user } = useAuth();
// //   const [participants, setParticipants] = useState<any[]>([]);
// //   const [loadingParticipants, setLoadingParticipants] = useState(false);
// //   const [participantFilter, setParticipantFilter] = useState('');
// //   const [actionOptions, setActionOptions] = useState<any[]>([]);
// //   const [selectedActionId, setSelectedActionId] = useState<string>('');
  
// //   const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
// //   const [showGroupChat, setShowGroupChat] = useState(false);
// //   const [studentDetail, setStudentDetail] = useState<any>(null);
// //   const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);

// //   const activeFacilitators = (course.facilitatorIds && course.facilitatorIds.length > 0) 
// //       ? course.facilitatorIds 
// //       : facilitators;

// //   useEffect(() => {
// //     if (course?.modules) {
// //       const opts: any[] = [];
// //       course.modules.forEach((m: any) => {
// //         m.lessons?.forEach((l: any) => {
// //           let label = l.title;
// //           if (l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
// //           else if (l.type === 'essay') label = `📝 Esai: ${l.title}`;
// //           else if (l.type === 'upload_doc') label = `📤 Upload: ${l.title}`;
// //           opts.push({ id: l._id, label, type: l.type });
// //         });
// //       });
// //       setActionOptions(opts);
// //     }
// //   }, [course]);

// //   const fetchParticipants = async () => {
// //     setLoadingParticipants(true);
// //     try {
// //       const res = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`);
// //       setParticipants(res.participants || []);
// //     } catch (error) { console.error('Gagal load peserta'); } finally { setLoadingParticipants(false); }
// //   };
// //   useEffect(() => { fetchParticipants(); }, [courseId]);

// //   const handleVerifyEnrollment = async (enrollmentId: string, action: 'approve' | 'reject', studentName: string) => {
// //     if (!confirm(`Konfirmasi?`)) return;
// //     try { await api('/api/courses/verify-enrollment', { method: 'POST', body: { enrollmentId, action } }); alert('Berhasil.'); fetchParticipants(); } catch (e: any) { alert(e.message); }
// //   };
  
// //   const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => {
// //     if (!selectedActionId) return alert('Pilih Materi!');
// //     const realUserId = participants.find(p => (p.user?._id === studentId) || (p.user === studentId))?.user?._id || studentId;
// //     try {
// //         if(action==='pass') await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId: realUserId, lessonId: selectedActionId, courseId } });
// //         else await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId: realUserId, quizId: selectedActionId } });
// //         alert('Berhasil!'); fetchParticipants();
// //     } catch(e:any){ alert(e.message); }
// //   };

// //   const handleRejectParticipant = async (id: string) => { if(confirm('Hapus?')) { await api(`/api/enrollments/${id}`, { method: 'DELETE' }); alert('Dihapus.'); fetchParticipants(); }};
  
// //   const handleDownloadCertificate = async (sid: string) => { 
// //     try {
// //       const token = localStorage.getItem('token');
// //       const BACKEND_URL = 'http://localhost:4000'; 
// //       const url = `${BACKEND_URL}/api/courses/certificate/download-admin/${courseId}/${sid}`;
// //       const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
// //       if (!res.ok) { const err = await res.json(); throw new Error(err.error || "Gagal download"); }
// //       const blob = await res.blob();
// //       const urlBlob = window.URL.createObjectURL(blob);
// //       const a = document.createElement('a'); a.href = urlBlob; a.download = `Sertifikat-${sid}.pdf`;
// //       document.body.appendChild(a); a.click(); a.remove();
// //     } catch (e: any) { alert("Gagal Download: " + e.message); }
// //   };

// //   const pendingParticipants = participants.filter(p => !p.status || p.status === 'pending' || p.status === 'waiting');
// //   const activeParticipants = participants.filter(p => p.status === 'active' || p.status === 'approved');
// //   const passedStudents = participants.filter(p => p.progress >= 100 || p.isCompleted).length;

// //   if (loadingParticipants && participants.length === 0) return <div className="p-10 text-center"><RefreshCw className="animate-spin inline-block mr-2" size={18} /></div>;

// //   return (
// //     <div className="space-y-8 animate-in slide-in-from-right-4">
// //       {/* HEADER STATS */}
// //       <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100">
// //         <div className="flex gap-6">
// //           <div className="text-center"><span className="block text-2xl font-bold text-gray-800">{participants.length}</span><span className="text-[10px] text-gray-500 font-bold">Total</span></div>
// //           <div className="text-center"><span className="block text-2xl font-bold text-green-600">{passedStudents}</span><span className="text-[10px] text-gray-500 font-bold">Lulus</span></div>
// //           <div className="text-center"><span className="block text-2xl font-bold text-orange-500">{activeParticipants.length}</span><span className="text-[10px] text-gray-500 font-bold">Aktif</span></div>
// //         </div>
// //         <button onClick={() => setShowGroupChat(true)} className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg hover:bg-indigo-700 flex items-center gap-2" title="Buka Ruang Diskusi">
// //             <MessageCircle size={18} /> Ruang Diskusi
// //         </button>
// //       </div>

// //       {/* PENDING TABLE */}
// //       <div className="bg-amber-50 border border-amber-200 rounded-2xl shadow-sm overflow-hidden mb-6">
// //         <div className="px-6 py-3 border-b border-amber-200 bg-amber-100 flex items-center gap-2"><AlertCircle className="text-amber-600" size={18}/><h3 className="font-bold text-amber-900 text-sm">Menunggu Persetujuan ({pendingParticipants.length})</h3></div>
// //         {pendingParticipants.length === 0 ? <div className="p-6 text-center text-gray-400 text-sm italic">Tidak ada antrian.</div> : (
// //           <div className="overflow-x-auto">
// //             <table className="w-full text-left text-sm"><tbody className="divide-y divide-amber-200">{pendingParticipants.map((p: any) => (<tr key={p._id} className="hover:bg-amber-100/50"><td className="p-3 font-bold">{p.user?.name}</td><td className="p-3 text-gray-500">{p.user?.email}</td><td className="p-3 text-right"><button onClick={() => handleVerifyEnrollment(p._id, 'approve', p.user?.name)} className="text-green-700 font-bold hover:underline mr-4" title="Setujui">Setujui</button><button onClick={() => handleVerifyEnrollment(p._id, 'reject', p.user?.name)} className="text-red-600 font-bold hover:underline" title="Tolak">Tolak</button></td></tr>))}</tbody></table>
// //           </div>
// //         )}
// //       </div>

// //       {/* ACTIVE TABLE */}
// //       <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
// //         <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-wrap gap-4">
// //           <h3 className="font-bold text-gray-800 flex items-center gap-2"><Users size={18}/> Peserta Aktif</h3>
// //           <div className="flex gap-2">
// //             <select className="p-1.5 border rounded text-xs bg-white h-9 outline-none" value={selectedActionId} onChange={e => setSelectedActionId(e.target.value)} title="Aksi Cepat"><option value="">-- Aksi Cepat --</option>{actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}</select>
// //             <input className="px-3 py-1.5 rounded border text-xs h-9 outline-none" placeholder="Cari..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} title="Cari Peserta" />
// //             <button type="button" onClick={fetchParticipants} className="bg-white border p-1.5 rounded h-9 w-9 flex justify-center items-center hover:bg-gray-100" title="Refresh"><RefreshCw size={14}/></button>
// //           </div>
// //         </div>
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-left border-collapse text-sm">
// //             <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b">
// //               <tr><th className="p-4">Peserta</th><th className="p-4">Progress</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Aksi</th><th className="p-4 text-center">Sertifikat</th><th className="p-4 text-center">Detail</th><th className="p-4 text-center">Chat/Hapus</th></tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-100">
// //               {activeParticipants.filter(p => (p.user?.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => {
// //                 const rawProgress = Number(p.progress);
// //                 const progressValue = Number.isFinite(rawProgress) ? Math.max(0, Math.min(100, Math.round(rawProgress))) : 0;
// //                 const isLulus = progressValue === 100 || p.isCompleted;
// //                 return (
// //                   <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
// //                     <td className="p-4"><div className="font-bold text-gray-900">{p.user?.name}</div><div className="text-xs text-gray-500">{p.user?.email}</div></td>
                    
// //                     {/* [FIX] Progress Bar + Text % */}
// //                     <td className="p-4 w-44">
// //                         <div className="flex items-center gap-2">
// //                             <span className="text-xs font-bold text-gray-600 w-8">{progressValue}%</span>
// //                             <progress max={100} value={progressValue} className="flex-1 h-1.5 [&::-webkit-progress-bar]:bg-gray-100 [&::-webkit-progress-value]:bg-blue-500 rounded" title={`${progressValue}%`} />
// //                         </div>
// //                     </td>
                    
// //                     <td className="p-4 text-center">{isLulus ? <span className="text-green-600 font-bold">LULUS</span> : <span className="text-orange-500 font-bold">PROSES</span>}</td>
// //                     <td className="p-4 text-center">{selectedActionId ? (<button onClick={() => handleParticipantAction(p.user?._id, 'pass')} className="text-xs bg-gray-100 px-2 py-1 rounded" title="Proses">Proses</button>) : '-'}</td>
                    
// //                     {/* [FIX] Tombol Download Sertifikat */}
// //                     <td className="p-4 text-center">
// //                         {isLulus ? (
// //                             <button onClick={() => handleDownloadCertificate(p.user?._id)} className="text-green-600 hover:text-green-800 p-1.5 rounded hover:bg-green-50 border border-green-200" title="Download Sertifikat"><Award size={18}/></button>
// //                         ) : <span className="text-gray-300 text-xs italic">-</span>}
// //                     </td>

// //                     <td className="p-4 text-center"><button onClick={() => { setStudentDetail(p); setShowStudentDetailModal(true); }} className="text-gray-400 hover:text-indigo-600" title="Detail"><Eye size={18} /></button></td>
// //                     <td className="p-4 text-center">
// //                         <button onClick={() => setChatTargetStudent(p)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded" title="Chat"><MessageCircle size={18}/></button>
// //                         <button onClick={() => handleRejectParticipant(p._id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded" title="Hapus"><Trash2 size={18}/></button>
// //                     </td>
// //                   </tr>
// //                 );
// //               })}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {chatTargetStudent && <PersonalChatModal student={chatTargetStudent} onClose={() => setChatTargetStudent(null)} />}
      
// //       {showGroupChat && (
// //         <CourseGroupChat 
// //             courseId={courseId}
// //             currentUser={user} 
// //             participants={participants} 
// //             facilitators={activeFacilitators} 
// //             onClose={() => setShowGroupChat(false)} 
// //             isFloating={false} 
// //         />
// //       )}
      
// //       {showStudentDetailModal && studentDetail && (
// //         <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Detail Peserta Modal">
// //           <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// //             <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md"><h3 className="font-bold flex items-center gap-2"><Users size={20} aria-hidden="true" /> Detail: {studentDetail.user?.name}</h3><button type="button" onClick={() => setShowStudentDetailModal(false)} title="Tutup"><X size={24} aria-hidden="true" /></button></div>
// //             <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
// //               {course?.modules?.map((m: any) => (<div key={m._id} className="bg-white border rounded-xl overflow-hidden shadow-sm"><div className="bg-gray-100 px-4 py-2 border-b font-bold text-sm text-gray-700">{m.title}</div><div className="divide-y">{m.lessons.map((l: any) => { const isDone = studentDetail.completedLessons?.includes(l._id); return (<div key={l._id} className="p-3 flex justify-between items-center hover:bg-gray-50"><div className="flex items-center gap-3"><div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isDone ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>{isDone && <Check size={12} aria-hidden="true" />}</div><span className={`text-sm ${isDone ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{l.title}</span></div><span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">{l.type}</span></div>); })}</div></div>))}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { api } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';
// import { RefreshCw, Users, Eye, MessageCircle, Trash2, AlertCircle, Award, Send, X, Check, CheckCircle } from 'lucide-react';
// import CourseGroupChat from '@/components/CourseGroupChat'; 

// // --- PERSONAL CHAT MODAL ---
// function PersonalChatModal({ student, onClose }: any) {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const targetId = student.user?._id || student._id || student.user; 
//   const targetName = student.user?.name || student.name || 'User';

//   useEffect(() => {
//     if (targetId) loadHistory();
//     const interval = setInterval(() => { if (targetId) loadHistory(); }, 3000); 
//     return () => clearInterval(interval);
//   }, [targetId]);

//   useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

//   const loadHistory = async () => {
//     try {
//       const res = await api(`/api/chat/${targetId}?t=${Date.now()}`);
//       setMessages(res.messages || []);
//     } catch (e) { console.error(e); }
//   };

//   const handleSend = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;
//     try {
//       await api('/api/chat/send', { method: 'POST', body: { recipientId: targetId, message: newMessage } });
//       setNewMessage('');
//       loadHistory();
//     } catch (error: any) { alert('Gagal: ' + error.message); }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Chat Personal`}>
//       <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95">
//         <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
//           <div className="font-bold flex items-center gap-2"><MessageCircle size={18}/> Chat: {targetName}</div>
//           <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat"><X size={20}/></button>
//         </div>
//         <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-2">
//           {messages.map((msg: any, i: number) => (
//             <div key={i} className={`p-2 rounded-lg text-sm max-w-[80%] ${msg.sender === 'me' ? 'bg-indigo-100 ml-auto text-right' : 'bg-white border'}`}>{msg.message}</div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//         <form onSubmit={handleSend} className="p-3 border-t flex gap-2 bg-white">
//           <input className="flex-1 border rounded-full px-3 py-1.5 text-sm outline-none focus:border-indigo-500" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Tulis pesan..." />
//           <button type="submit" className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700" title="Kirim"><Send size={14}/></button>
//         </form>
//       </div>
//     </div>
//   );
// }

// interface CourseOperatorProps { courseId: string; course: any; facilitators?: any[]; }

// export default function CourseOperatorDashboard({ courseId, course, facilitators = [] }: CourseOperatorProps) {
//   const { user } = useAuth();
//   const [participants, setParticipants] = useState<any[]>([]);
//   const [loadingParticipants, setLoadingParticipants] = useState(false);
//   const [participantFilter, setParticipantFilter] = useState('');
  
//   // State Aksi Cepat
//   const [actionOptions, setActionOptions] = useState<any[]>([]);
//   const [selectedActionId, setSelectedActionId] = useState<string>('');
  
//   const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
//   const [showGroupChat, setShowGroupChat] = useState(false);
//   const [studentDetail, setStudentDetail] = useState<any>(null);
//   const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);
//   const [processingAction, setProcessingAction] = useState(false); // Loading State untuk Aksi

//   const activeFacilitators = (course.facilitatorIds && course.facilitatorIds.length > 0) 
//       ? course.facilitatorIds 
//       : facilitators;

//   // Load Opsi Aksi Cepat (Daftar Materi)
//   useEffect(() => {
//     if (course?.modules) {
//       const opts: any[] = [];
//       course.modules.forEach((m: any) => {
//         m.lessons?.forEach((l: any) => {
//           let label = l.title;
//           if (l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
//           else if (l.type === 'essay') label = `📝 Esai: ${l.title}`;
//           else if (l.type === 'upload_doc') label = `📤 Upload: ${l.title}`;
//           opts.push({ id: l._id, label, type: l.type });
//         });
//       });
//       setActionOptions(opts);
//     }
//   }, [course]);

//   // Fetch Data Peserta
//   const fetchParticipants = async (isBackground = false) => {
//     if (!isBackground) setLoadingParticipants(true);
//     try {
//       // Force refresh with timestamp
//       const res = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`);
//       setParticipants(res.participants || []);
//     } catch (error) { 
//         console.error('Gagal load peserta'); 
//     } finally { 
//         if (!isBackground) setLoadingParticipants(false); 
//     }
//   };

//   // Realtime Polling (Update UI Otomatis)
//   useEffect(() => {
//     fetchParticipants();
//     const interval = setInterval(() => fetchParticipants(true), 5000); // Update setiap 5 detik
//     return () => clearInterval(interval);
//   }, [courseId]);

//   // Handler Verifikasi Pendaftaran
//   const handleVerifyEnrollment = async (enrollmentId: string, action: 'approve' | 'reject', studentName: string) => {
//     if (!confirm(`Konfirmasi ${action === 'approve' ? 'Setujui' : 'Tolak'} untuk ${studentName}?`)) return;
//     try { 
//         await api('/api/courses/verify-enrollment', { method: 'POST', body: { enrollmentId, action } }); 
//         alert('Berhasil diproses.'); 
//         fetchParticipants(); 
//     } catch (e: any) { alert(e.message); }
//   };
  
//   // Handler Aksi Cepat (Luluskan / Reset Materi)
//   const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => {
//     if (!selectedActionId) return alert('Pilih Materi di dropdown Aksi Cepat terlebih dahulu!');
    
//     setProcessingAction(true);
//     const realUserId = participants.find(p => (p.user?._id === studentId) || (p.user === studentId))?.user?._id || studentId;
    
//     try {
//         if(action === 'pass') {
//             await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId: realUserId, lessonId: selectedActionId, courseId } });
//         } else {
//             await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId: realUserId, quizId: selectedActionId } }); 
//         }
        
//         // Immediate fetch after action
//         await fetchParticipants(); 
//         // Optional alert removal for smoother UX, or keep it simple
//         // alert(action === 'pass' ? '✅ Materi diluluskan.' : '🔄 Materi di-reset.');
//     } catch(e:any){ 
//         alert("Gagal: " + e.message); 
//     } finally { 
//         setProcessingAction(false); 
//     }
//   };

//   const handleRejectParticipant = async (id: string) => { 
//       if(confirm('Yakin ingin menghapus peserta ini dari kelas?')) { 
//           await api(`/api/enrollments/${id}`, { method: 'DELETE' }); 
//           alert('Peserta dihapus.'); 
//           fetchParticipants(); 
//       }
//   };
  
//   const handleDownloadCertificate = async (sid: string) => { 
//     try {
//       const token = localStorage.getItem('token');
//       // Ganti URL Backend sesuai config Anda (misal localhost:4000 atau /api jika proxy)
//       const BACKEND_URL = 'http://localhost:4000'; 
//       const url = `${BACKEND_URL}/api/courses/certificate/download-admin/${courseId}/${sid}`;
      
//       const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
//       if (!res.ok) { const err = await res.json(); throw new Error(err.error || "Gagal download"); }
//       const blob = await res.blob();
//       const urlBlob = window.URL.createObjectURL(blob);
//       const a = document.createElement('a'); a.href = urlBlob; a.download = `Sertifikat-${sid}.pdf`;
//       document.body.appendChild(a); a.click(); a.remove();
//     } catch (e: any) { alert("Gagal Download Sertifikat: " + e.message); }
//   };

//   const pendingParticipants = participants.filter(p => !p.status || p.status === 'pending' || p.status === 'waiting');
//   const activeParticipants = participants.filter(p => p.status === 'active' || p.status === 'approved');
//   // Hitung lulus jika progress 100 atau isCompleted true
//   const passedStudents = participants.filter(p => p.progress >= 100 || p.isCompleted).length;

//   if (loadingParticipants && participants.length === 0) return <div className="p-10 text-center flex flex-col items-center gap-2"><RefreshCw className="animate-spin text-indigo-500" size={24} /><span className="text-gray-500">Memuat data peserta...</span></div>;

//   return (
//     <div className="space-y-8 animate-in slide-in-from-right-4">
//       {/* HEADER STATS */}
//       <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-sm">
//         <div className="flex gap-8">
//           <div className="text-center"><span className="block text-2xl font-bold text-gray-800">{participants.length}</span><span className="text-[10px] uppercase font-bold text-gray-500">Total Peserta</span></div>
//           <div className="text-center"><span className="block text-2xl font-bold text-green-600">{passedStudents}</span><span className="text-[10px] uppercase font-bold text-gray-500">Lulus</span></div>
//           <div className="text-center"><span className="block text-2xl font-bold text-orange-500">{activeParticipants.length}</span><span className="text-[10px] uppercase font-bold text-gray-500">Aktif Belajar</span></div>
//         </div>
//         <div className="flex gap-2">
//             <button onClick={() => fetchParticipants()} className="bg-white border border-indigo-200 text-indigo-700 px-4 py-2 rounded-lg font-bold hover:bg-indigo-50 flex items-center gap-2 text-sm shadow-sm" title="Refresh Data">
//                 <RefreshCw size={16} className={loadingParticipants ? "animate-spin" : ""} /> Refresh
//             </button>
//             <button onClick={() => setShowGroupChat(true)} className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold shadow-md hover:bg-indigo-700 flex items-center gap-2 text-sm" title="Buka Ruang Diskusi">
//                 <MessageCircle size={18} /> Ruang Diskusi
//             </button>
//         </div>
//       </div>

//       {/* TABEL PENDAFTARAN PENDING */}
//       <div className={`bg-amber-50 border border-amber-200 rounded-2xl shadow-sm overflow-hidden mb-6 transition-all ${pendingParticipants.length > 0 ? 'block' : 'hidden'}`}>
//         <div className="px-6 py-3 border-b border-amber-200 bg-amber-100 flex items-center gap-2"><AlertCircle className="text-amber-600" size={18}/><h3 className="font-bold text-amber-900 text-sm">Menunggu Persetujuan ({pendingParticipants.length})</h3></div>
//         <div className="overflow-x-auto">
//             <table className="w-full text-left text-sm">
//                 <tbody className="divide-y divide-amber-200">
//                     {pendingParticipants.map((p: any) => (
//                         <tr key={p._id} className="hover:bg-amber-100/50">
//                             <td className="p-3 font-bold">{p.user?.name}</td>
//                             <td className="p-3 text-gray-500">{p.user?.email}</td>
//                             <td className="p-3 text-right">
//                                 <button onClick={() => handleVerifyEnrollment(p._id, 'approve', p.user?.name)} className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold mr-2 hover:bg-green-700 shadow-sm">Setujui</button>
//                                 <button onClick={() => handleVerifyEnrollment(p._id, 'reject', p.user?.name)} className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-700 shadow-sm">Tolak</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//       </div>

//       {/* TABEL PESERTA AKTIF */}
//       <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
//         <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-wrap gap-4">
//           <h3 className="font-bold text-gray-800 flex items-center gap-2"><Users size={18}/> Peserta Aktif ({activeParticipants.length})</h3>
          
//           <div className="flex gap-2 items-center bg-white p-1 rounded border shadow-sm">
//             <span className="text-xs font-bold text-gray-500 ml-2">Aksi Cepat:</span>
//             <select 
//                 className="p-1.5 border rounded text-xs bg-gray-50 h-9 outline-none min-w-[200px] focus:border-indigo-500" 
//                 value={selectedActionId} 
//                 onChange={e => setSelectedActionId(e.target.value)} 
//                 title="Pilih Materi untuk Aksi Cepat"
//             >
//                 <option value="">-- Pilih Materi / Kuis --</option>
//                 {actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
//             </select>
//             <div className="w-px h-6 bg-gray-300 mx-1"></div>
//             <input className="px-3 py-1.5 rounded border text-xs h-9 outline-none min-w-[150px]" placeholder="Cari Nama Peserta..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} />
//           </div>
//         </div>
        
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse text-sm">
//             <thead className="bg-gray-100 text-xs font-bold text-gray-600 uppercase border-b">
//               <tr>
//                 <th className="p-4">Peserta</th>
//                 <th className="p-4 w-48">Progress Belajar</th>
//                 <th className="p-4 text-center">Status & Posisi</th> {/* [UPDATE] Header Kolom Digabung */}
//                 <th className="p-4 text-center bg-indigo-50/50 border-x border-indigo-100 text-indigo-700">Aksi Cepat</th> 
//                 <th className="p-4 text-center">Sertifikat</th>
//                 <th className="p-4 text-center">Detail</th>
//                 <th className="p-4 text-center">Chat / Hapus</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {activeParticipants.filter(p => (p.user?.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => {
//                 const rawProgress = Number(p.progress);
//                 const progressValue = Number.isFinite(rawProgress) ? Math.max(0, Math.min(100, Math.round(rawProgress))) : 0;
//                 const isLulus = progressValue >= 100 || p.isCompleted === true;
                
//                 return (
//                   <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
//                     <td className="p-4">
//                         <div className="font-bold text-gray-900">{p.user?.name}</div>
//                         <div className="text-xs text-gray-500">{p.user?.email}</div>
//                     </td>
                    
//                     <td className="p-4">
//                         <div className="flex items-center gap-2">
//                             <span className="text-xs font-bold text-gray-600 w-8">{progressValue}%</span>
//                             <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                                 <div className={`h-full rounded-full transition-all duration-500 ${isLulus ? 'bg-green-500' : 'bg-blue-500'}`} style={{width: `${progressValue}%`}}></div>
//                             </div>
//                         </div>
//                     </td>
                    
//                     {/* [FIX] KOLOM STATUS & POSISI REALTIME */}
//                     <td className="p-4 text-center">
//                         <div className="flex flex-col items-center">
//                             {isLulus 
//                                 ? <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded"><CheckCircle size={12}/> LULUS</span> 
//                                 : <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded"><RefreshCw size={12} className="animate-spin-slow"/> PROSES</span>
//                             }
                            
//                             {/* Menampilkan Posisi Realtime (Sedang Mengerjakan Apa) */}
//                             {!isLulus && p.currentPosition && (
//                                 <span className="text-[10px] text-gray-500 font-medium italic mt-1 max-w-[150px] truncate" title={p.currentPosition}>
//                                    {p.currentPosition}
//                                 </span>
//                             )}
//                         </div>
//                     </td>

//                     <td className="p-4 text-center bg-indigo-50/20 border-x border-indigo-50">
//                         {selectedActionId ? (
//                             <div className="flex gap-1 justify-center">
//                                 <button onClick={() => handleParticipantAction(p.user?._id, 'pass')} disabled={processingAction} className="bg-green-600 hover:bg-green-700 text-white px-2 py-1.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm disabled:opacity-50" title="Tandai Lulus Manual"><Check size={12}/> Lulus</button>
//                                 <button onClick={() => handleParticipantAction(p.user?._id, 'reset')} disabled={processingAction} className="bg-red-600 hover:bg-red-700 text-white px-2 py-1.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm disabled:opacity-50" title="Reset Progres (Tidak Lulus)"><RefreshCw size={12}/> Reset</button>
//                             </div>
//                         ) : <span className="text-gray-300 text-xs italic">- Pilih Materi -</span>}
//                     </td>
                    
//                     <td className="p-4 text-center">
//                         {isLulus ? (
//                             <button onClick={() => handleDownloadCertificate(p.user?._id)} className="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50 border border-blue-200 transition-colors" title="Download Sertifikat"><Award size={18}/></button>
//                         ) : <span className="text-gray-300 text-xs">-</span>}
//                     </td>

//                     <td className="p-4 text-center"><button onClick={() => { setStudentDetail(p); setShowStudentDetailModal(true); }} className="text-gray-400 hover:text-indigo-600 transition-colors" title="Lihat Detail Belajar"><Eye size={18} /></button></td>
                    
//                     <td className="p-4 text-center">
//                         <div className="flex justify-center gap-2">
//                             <button onClick={() => setChatTargetStudent(p)} className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded transition-colors" title="Chat Personal"><MessageCircle size={18}/></button>
//                             <button onClick={() => handleRejectParticipant(p._id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded transition-colors" title="Hapus Peserta"><Trash2 size={18}/></button>
//                         </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {chatTargetStudent && <PersonalChatModal student={chatTargetStudent} onClose={() => setChatTargetStudent(null)} />}
      
//       {showGroupChat && (
//         <CourseGroupChat 
//             courseId={courseId}
//             currentUser={user} 
//             participants={participants} 
//             facilitators={activeFacilitators} 
//             onClose={() => setShowGroupChat(false)} 
//             isFloating={false} 
//         />
//       )}
      
//       {showStudentDetailModal && studentDetail && (
//         <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true">
//           <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
//             <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md"><h3 className="font-bold flex items-center gap-2"><Users size={20} /> Detail: {studentDetail.user?.name}</h3><button type="button" onClick={() => setShowStudentDetailModal(false)} title="Tutup"><X size={24} /></button></div>
//             <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
//               {course?.modules?.map((m: any) => (
//                   <div key={m._id} className="bg-white border rounded-xl overflow-hidden shadow-sm">
//                       <div className="bg-gray-100 px-4 py-2 border-b font-bold text-sm text-gray-700 flex justify-between">
//                           <span>{m.title}</span>
//                           <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded text-gray-600">MODUL</span>
//                       </div>
//                       <div className="divide-y">
//                           {m.lessons.map((l: any) => { 
//                               const isDone = studentDetail.completedLessons?.includes(l._id); 
//                               return (
//                                   <div key={l._id} className="p-3 flex justify-between items-center hover:bg-gray-50">
//                                       <div className="flex items-center gap-3">
//                                           <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isDone ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>{isDone && <Check size={12} />}</div>
//                                           <span className={`text-sm ${isDone ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{l.title}</span>
//                                       </div>
//                                       <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${isDone ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>{l.type}</span>
//                                   </div>
//                               ); 
//                           })}
//                       </div>
//                   </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



'use client';

import { useState, useEffect, useRef } from 'react';
import { api, getImageUrl } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import { 
    RefreshCw, Users, Eye, MessageCircle, Trash2, AlertCircle, Award, 
    Send, X, Check, CheckCircle, FileText, Download, BarChart2, PieChart,
    UserCheck, XCircle, Clock
} from 'lucide-react';
import CourseGroupChat from '@/components/CourseGroupChat'; 

// --- PERSONAL CHAT MODAL ---
function PersonalChatModal({ student, onClose }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const targetId = student.user?._id || student._id || student.user; 
  const targetName = student.user?.name || student.name || 'User';

  useEffect(() => {
    if (targetId) loadHistory();
    const interval = setInterval(() => { if (targetId) loadHistory(); }, 3000); 
    return () => clearInterval(interval);
  }, [targetId]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const loadHistory = async () => {
    try {
      const res = await api(`/api/chat/${targetId}?t=${Date.now()}`);
      setMessages(res.messages || []);
    } catch (e) { console.error(e); }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      await api('/api/chat/send', { method: 'POST', body: { recipientId: targetId, message: newMessage } });
      setNewMessage('');
      loadHistory();
    } catch (error: any) { alert('Gagal: ' + error.message); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Chat Personal`}>
      <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95">
        <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
          <div className="font-bold flex items-center gap-2"><MessageCircle size={18}/> Chat: {targetName}</div>
          <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat"><X size={20}/></button>
        </div>
        <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-2">
          {messages.map((msg: any, i: number) => (
            <div key={i} className={`p-2 rounded-lg text-sm max-w-[80%] ${msg.sender === 'me' ? 'bg-indigo-100 ml-auto text-right' : 'bg-white border'}`}>{msg.message}</div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} className="p-3 border-t flex gap-2 bg-white">
          <input className="flex-1 border rounded-full px-3 py-1.5 text-sm outline-none focus:border-indigo-500" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Tulis pesan..." />
          <button type="submit" className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700" title="Kirim"><Send size={14}/></button>
        </form>
      </div>
    </div>
  );
}

// --- STUDENT DETAIL MODAL (NEW TABS & REFRESH) ---
function StudentDetailModal({ student, course, onClose, onRefresh }: any) {
    const [activeTab, setActiveTab] = useState<'progress' | 'answers'>('progress');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const getLessonAnswer = (lessonId: string) => {
        return student.lessonDetails?.find((d: any) => d.lessonId === lessonId);
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await onRefresh();
        setTimeout(() => setIsRefreshing(false), 500);
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
            {/* Header Modal */}
            <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md shrink-0">
                <div className="flex items-center gap-3">
                    <h3 className="font-bold flex items-center gap-2"><Users size={20} /> Detail: {student.user?.name}</h3>
                    <button 
                        onClick={handleRefresh} 
                        className={`bg-indigo-500 hover:bg-indigo-400 p-1.5 rounded-full transition-all ${isRefreshing ? 'animate-spin' : ''}`} 
                        title="Refresh Data Peserta"
                    >
                        <RefreshCw size={16} />
                    </button>
                </div>
                <button type="button" onClick={onClose} title="Tutup" className="hover:bg-indigo-700 p-1 rounded"><X size={24} /></button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b bg-gray-50 shrink-0">
                <button 
                    onClick={() => setActiveTab('progress')}
                    className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === 'progress' ? 'border-indigo-600 text-indigo-700 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100'}`}
                >
                    📊 Progress Belajar
                </button>
                <button 
                    onClick={() => setActiveTab('answers')}
                    className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === 'answers' ? 'border-indigo-600 text-indigo-700 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100'}`}
                >
                    📝 Jawaban & Tugas
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-6">
                
                {/* TAB 1: PROGRESS CHECKLIST */}
                {activeTab === 'progress' && (
                    <div className="space-y-4">
                        {course?.modules?.map((m: any) => (
                            <div key={m._id} className="bg-white border rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-gray-100 px-4 py-2 border-b font-bold text-sm text-gray-700 flex justify-between">
                                    <span>{m.title}</span>
                                    <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded text-gray-600">MODUL</span>
                                </div>
                                <div className="divide-y">
                                    {m.lessons.map((l: any) => { 
                                        const isDone = student.completedLessons?.includes(l._id); 
                                        return (
                                            <div key={l._id} className="p-3 flex justify-between items-center hover:bg-gray-50">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isDone ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>{isDone && <Check size={12} />}</div>
                                                    <span className={`text-sm ${isDone ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{l.title}</span>
                                                </div>
                                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${isDone ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>{l.type}</span>
                                            </div>
                                        ); 
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* TAB 2: JAWABAN & TUGAS */}
                {activeTab === 'answers' && (
                    <div className="space-y-6">
                        {course?.modules?.map((m: any) => (
                            <div key={m._id} className="space-y-3">
                                <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider sticky top-0 bg-gray-50 py-2 z-10">Modul: {m.title}</h4>
                                {m.lessons.map((l: any) => {
                                    if (!['quiz', 'essay', 'upload_doc', 'poll'].includes(l.type)) return null;
                                    
                                    const answerData = getLessonAnswer(l._id);

                                    return (
                                        <div key={l._id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                            <div className="flex justify-between items-start mb-3 border-b pb-2">
                                                <div>
                                                    <h5 className="font-bold text-gray-800 text-sm">{l.title}</h5>
                                                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase font-bold">{l.type}</span>
                                                </div>
                                                <span className="text-[10px] text-gray-400">
                                                    {answerData?.submittedAt ? new Date(answerData.submittedAt).toLocaleString('id-ID') : 'Belum dikerjakan'}
                                                </span>
                                            </div>

                                            {/* KONTEN JAWABAN */}
                                            {!answerData ? (
                                                <div className="text-sm text-gray-400 italic">Belum ada data jawaban.</div>
                                            ) : (
                                                <div className="text-sm space-y-3">
                                                    {/* TIPE: UPLOAD TUGAS */}
                                                    {l.type === 'upload_doc' && answerData.uploadedFile && (
                                                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded border">
                                                            <FileText className="text-blue-500" size={24} />
                                                            <div className="flex-1 overflow-hidden">
                                                                <p className="font-bold text-gray-700 truncate">{answerData.uploadedFile.name}</p>
                                                                <p className="text-xs text-gray-500">Diunggah pada {new Date(answerData.uploadedFile.uploadedAt).toLocaleDateString()}</p>
                                                            </div>
                                                            <a href={getImageUrl(answerData.uploadedFile.url)} target="_blank" download className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1">
                                                                <Download size={14}/> Unduh
                                                            </a>
                                                        </div>
                                                    )}

                                                    {/* TIPE: ESAI */}
                                                    {l.type === 'essay' && answerData.essayAnswers && (
                                                        <div className="space-y-4">
                                                            {answerData.essayAnswers.map((ans: any, idx: number) => (
                                                                <div key={idx} className="bg-gray-50 p-3 rounded border">
                                                                    <p className="text-xs font-bold text-gray-500 mb-1">Pertanyaan {idx + 1}:</p>
                                                                    <div className="mb-2 font-medium text-gray-800" dangerouslySetInnerHTML={{ __html: l.questions?.[idx]?.question || `Soal ${idx+1}` }} />
                                                                    <p className="text-xs font-bold text-green-600 mb-1">Jawaban Peserta:</p>
                                                                    <div className="bg-white p-2 rounded border border-gray-200 text-gray-700" dangerouslySetInnerHTML={{ __html: ans }} />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* TIPE: KUIS */}
                                                    {l.type === 'quiz' && (
                                                        <div className="flex items-center gap-4 bg-yellow-50 p-3 rounded border border-yellow-200">
                                                            <div className="text-center">
                                                                <div className="text-3xl font-extrabold text-yellow-700">
                                                                    {answerData.score !== undefined ? answerData.score : '-'}
                                                                </div>
                                                                <div className="text-[10px] text-yellow-600 font-bold uppercase">Skor Akhir</div>
                                                            </div>
                                                            <div className="text-xs text-gray-600 border-l pl-4 border-yellow-200 space-y-1">
                                                                <p>Status: <span className={`font-bold ${answerData.score >= 70 ? 'text-green-600' : 'text-red-500'}`}>{answerData.score >= 70 ? 'Lulus' : 'Belum Lulus'}</span></p>
                                                                <p>Percobaan: <strong>{answerData.attempts || 1}x</strong></p>
                                                                <p>Waktu Selesai: {new Date(answerData.submittedAt).toLocaleTimeString()}</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* TIPE: POLLING */}
                                                    {l.type === 'poll' && (
                                                        <div className="flex items-center gap-2 bg-purple-50 p-3 rounded border border-purple-200 text-purple-800">
                                                            <BarChart2 size={18} />
                                                            <span>Pilihan Peserta: <strong>{answerData.pollAnswer || '-'}</strong></span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                )}
            </div>
          </div>
        </div>
    );
}

// --- MAIN COMPONENT ---
interface CourseOperatorProps { courseId: string; course: any; facilitators?: any[]; }

export default function CourseOperatorDashboard({ courseId, course, facilitators = [] }: CourseOperatorProps) {
  const { user } = useAuth();
  const [participants, setParticipants] = useState<any[]>([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [participantFilter, setParticipantFilter] = useState('');
  const [actionOptions, setActionOptions] = useState<any[]>([]);
  const [selectedActionId, setSelectedActionId] = useState<string>('');
  
  const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
  const [showGroupChat, setShowGroupChat] = useState(false);
  const [studentDetail, setStudentDetail] = useState<any>(null);
  const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);
  const [processingAction, setProcessingAction] = useState(false);

  const [pollStats, setPollStats] = useState<any>({});

  const activeFacilitators = (course.facilitatorIds && course.facilitatorIds.length > 0) ? course.facilitatorIds : facilitators;

  useEffect(() => {
    if (course?.modules) {
      const opts: any[] = [];
      course.modules.forEach((m: any) => {
        m.lessons?.forEach((l: any) => {
          let label = l.title;
          if (l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
          else if (l.type === 'essay') label = `📝 Esai: ${l.title}`;
          else if (l.type === 'upload_doc') label = `📤 Upload: ${l.title}`;
          else if (l.type === 'poll') label = `📊 Polling: ${l.title}`; 
          opts.push({ id: l._id, label, type: l.type });
        });
      });
      setActionOptions(opts);
    }
  }, [course]);

  const fetchParticipants = async (isBackground = false) => {
    if (!isBackground) setLoadingParticipants(true);
    try {
      const res = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`);
      setParticipants(res.participants || []);
      calculatePollStats(res.participants || []);
    } catch (error) { console.error('Gagal load peserta'); } finally { if (!isBackground) setLoadingParticipants(false); }
  };

  const calculatePollStats = (data: any[]) => {
      const stats: any = {};
      course.modules.forEach((m: any) => {
          m.lessons.forEach((l: any) => {
              if (l.type === 'poll') {
                  const lessonId = l._id;
                  const counts: any = {};
                  let totalVotes = 0;
                  l.pollOptions.forEach((opt: string) => { counts[opt] = 0; });
                  data.forEach((p: any) => {
                      const ans = p.lessonDetails?.find((d: any) => d.lessonId === lessonId)?.pollAnswer;
                      if (ans && counts[ans] !== undefined) {
                          counts[ans]++;
                          totalVotes++;
                      }
                  });
                  stats[lessonId] = { counts, totalVotes, title: l.title };
              }
          });
      });
      setPollStats(stats);
  };

  useEffect(() => {
    fetchParticipants();
    const interval = setInterval(() => fetchParticipants(true), 5000); 
    return () => clearInterval(interval);
  }, [courseId]);

  const handleVerifyEnrollment = async (enrollmentId: string, action: 'approve' | 'reject', studentName: string) => {
    if (!confirm(`Konfirmasi ${action === 'approve' ? 'Setujui' : 'Tolak'} untuk ${studentName}?`)) return;
    try { 
        await api('/api/courses/verify-enrollment', { method: 'POST', body: { enrollmentId, action } }); 
        alert('Berhasil diproses.'); fetchParticipants(); 
    } catch (e: any) { alert(e.message); }
  };
  
  const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => {
    if (!selectedActionId) return alert('Pilih Materi di dropdown Aksi Cepat terlebih dahulu!');
    setProcessingAction(true);
    const realUserId = participants.find(p => (p.user?._id === studentId) || (p.user === studentId))?.user?._id || studentId;
    try {
        if(action === 'pass') await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId: realUserId, lessonId: selectedActionId, courseId } });
        else await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId: realUserId, quizId: selectedActionId } }); 
        await fetchParticipants(); 
    } catch(e:any){ alert("Gagal: " + e.message); } finally { setProcessingAction(false); }
  };

  const handleRejectParticipant = async (id: string) => { 
      if(confirm('Yakin ingin menghapus peserta ini dari kelas?')) { 
          await api(`/api/enrollments/${id}`, { method: 'DELETE' }); 
          alert('Peserta dihapus.'); fetchParticipants(); 
      }
  };
  
  const handleDownloadCertificate = async (sid: string) => { 
    try {
      const token = localStorage.getItem('token');
      const BACKEND_URL = 'http://localhost:4000'; 
      const url = `${BACKEND_URL}/api/courses/certificate/download-admin/${courseId}/${sid}`;
      const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || "Gagal download"); }
      const blob = await res.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = urlBlob; a.download = `Sertifikat-${sid}.pdf`;
      document.body.appendChild(a); a.click(); a.remove();
    } catch (e: any) { alert("Gagal Download Sertifikat: " + e.message); }
  };

  // Filter Data
  const pendingParticipants = participants.filter(p => !p.status || p.status === 'pending' || p.status === 'waiting');
  const activeParticipants = participants.filter(p => p.status === 'active' || p.status === 'approved');
  const passedStudents = participants.filter(p => p.progress >= 100 || p.isCompleted).length;

  if (loadingParticipants && participants.length === 0) return <div className="p-10 text-center flex flex-col items-center gap-2"><RefreshCw className="animate-spin text-indigo-500" size={24} /><span className="text-gray-500">Memuat data peserta...</span></div>;

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4">
      {/* HEADER STATS */}
      <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-sm">
        <div className="flex gap-8">
          <div className="text-center"><span className="block text-2xl font-bold text-gray-800">{participants.length}</span><span className="text-[10px] uppercase font-bold text-gray-500">Total Peserta</span></div>
          <div className="text-center"><span className="block text-2xl font-bold text-green-600">{passedStudents}</span><span className="text-[10px] uppercase font-bold text-gray-500">Lulus</span></div>
          <div className="text-center"><span className="block text-2xl font-bold text-orange-500">{activeParticipants.length}</span><span className="text-[10px] uppercase font-bold text-gray-500">Aktif Belajar</span></div>
        </div>
        <div className="flex gap-2">
            <button onClick={() => fetchParticipants()} className="bg-white border border-indigo-200 text-indigo-700 px-4 py-2 rounded-lg font-bold hover:bg-indigo-50 flex items-center gap-2 text-sm shadow-sm" title="Refresh Data">
                <RefreshCw size={16} className={loadingParticipants ? "animate-spin" : ""} /> Refresh
            </button>
            <button onClick={() => setShowGroupChat(true)} className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold shadow-md hover:bg-indigo-700 flex items-center gap-2 text-sm" title="Buka Ruang Diskusi">
                <MessageCircle size={18} /> Ruang Diskusi
            </button>
        </div>
      </div>

      {/* [FIX] TABEL MENUNGGU PERSETUJUAN (CALON PESERTA) */}
      {pendingParticipants.length > 0 && (
        <div className="bg-white border border-yellow-200 rounded-2xl overflow-hidden shadow-sm animate-pulse-once">
            <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-100 flex justify-between items-center">
                <h3 className="font-bold text-yellow-800 flex items-center gap-2">
                    <UserCheck size={20} /> Calon Peserta Menunggu Persetujuan ({pendingParticipants.length})
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Nama Peserta</th>
                            <th className="px-6 py-3">Tanggal Daftar</th>
                            <th className="px-6 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {pendingParticipants.map((p) => (
                            <tr key={p._id} className="hover:bg-yellow-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-800 flex items-center gap-3">
                                    <img src={getImageUrl(p.user.avatarUrl)} className="w-8 h-8 rounded-full bg-gray-200 object-cover" alt=""/>
                                    <div>
                                        <div>{p.user.name}</div>
                                        <div className="text-xs text-gray-400 font-normal">{p.user.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{new Date(p.joinedAt || Date.now()).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleVerifyEnrollment(p._id, 'approve', p.user.name)} className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-200 flex items-center gap-1 transition-colors">
                                            <CheckCircle size={14}/> Setujui
                                        </button>
                                        <button onClick={() => handleVerifyEnrollment(p._id, 'reject', p.user.name)} className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-200 flex items-center gap-1 transition-colors">
                                            <XCircle size={14}/> Tolak
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}

      {/* STATISTIK POLLING */}
      {Object.keys(pollStats).length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><PieChart size={20} className="text-purple-600"/> Hasil Polling Kelas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(pollStats).map(([lessonId, stat]: any) => (
                      <div key={lessonId} className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                          <h4 className="font-bold text-purple-900 text-sm mb-3">{stat.title}</h4>
                          <div className="space-y-2">
                              {Object.entries(stat.counts).map(([opt, count]: any) => {
                                  const percent = stat.totalVotes > 0 ? Math.round((count / stat.totalVotes) * 100) : 0;
                                  return (
                                      <div key={opt} className="text-xs">
                                          <div className="flex justify-between mb-1">
                                              <span className="font-medium text-gray-700">{opt}</span>
                                              <span className="font-bold text-purple-700">{count} suara ({percent}%)</span>
                                          </div>
                                          <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                                              <div className="h-full bg-purple-600" style={{ width: `${percent}%` }}></div>
                                          </div>
                                      </div>
                                  );
                              })}
                          </div>
                          <div className="mt-3 text-xs text-right text-gray-500 italic">Total: {stat.totalVotes} suara</div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* TABEL PESERTA AKTIF */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-wrap gap-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2"><Users size={18}/> Peserta Aktif ({activeParticipants.length})</h3>
          
          <div className="flex gap-2 items-center bg-white p-1 rounded border shadow-sm">
            <span className="text-xs font-bold text-gray-500 ml-2">Aksi Cepat:</span>
            <select 
                className="p-1.5 border rounded text-xs bg-gray-50 h-9 outline-none min-w-[200px] focus:border-indigo-500" 
                value={selectedActionId} 
                onChange={e => setSelectedActionId(e.target.value)} 
                title="Pilih Materi untuk Aksi Cepat"
            >
                <option value="">-- Pilih Materi / Kuis --</option>
                {actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
            </select>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <input className="px-3 py-1.5 rounded border text-xs h-9 outline-none min-w-[150px]" placeholder="Cari Nama Peserta..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-gray-100 text-xs font-bold text-gray-600 uppercase border-b">
              <tr>
                <th className="p-4">Peserta</th>
                <th className="p-4 w-48">Progress Belajar</th>
                <th className="p-4 text-center">Status & Posisi</th>
                <th className="p-4 text-center bg-indigo-50/50 border-x border-indigo-100 text-indigo-700">Aksi Cepat</th> 
                <th className="p-4 text-center">Sertifikat</th>
                <th className="p-4 text-center">Detail</th>
                <th className="p-4 text-center">Chat / Hapus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activeParticipants.filter(p => (p.user?.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => {
                const rawProgress = Number(p.progress);
                const progressValue = Number.isFinite(rawProgress) ? Math.max(0, Math.min(100, Math.round(rawProgress))) : 0;
                const isLulus = progressValue >= 100 || p.isCompleted === true;
                return (
                  <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="p-4">
                        <div className="font-bold text-gray-900">{p.user?.name}</div>
                        <div className="text-xs text-gray-500">{p.user?.email}</div>
                    </td>
                    <td className="p-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-600 w-8">{progressValue}%</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-500 ${isLulus ? 'bg-green-500' : 'bg-blue-500'}`} style={{width: `${progressValue}%`}}></div></div>
                        </div>
                    </td>
                    <td className="p-4 text-center">
                        <div className="flex flex-col items-center">
                            {isLulus 
                                ? <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded"><CheckCircle size={12}/> LULUS</span> 
                                : <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded"><RefreshCw size={12} className="animate-spin-slow"/> PROSES</span>
                            }
                            {!isLulus && p.currentPosition && (<span className="text-[10px] text-gray-500 font-medium italic mt-1 max-w-[150px] truncate" title={p.currentPosition}>{p.currentPosition}</span>)}
                        </div>
                    </td>
                    <td className="p-4 text-center bg-indigo-50/20 border-x border-indigo-50">
                        {selectedActionId ? (
                            <div className="flex gap-1 justify-center">
                                <button onClick={() => handleParticipantAction(p.user?._id, 'pass')} disabled={processingAction} className="bg-green-600 hover:bg-green-700 text-white px-2 py-1.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm disabled:opacity-50" title="Tandai Lulus Manual"><Check size={12}/> Lulus</button>
                                <button onClick={() => handleParticipantAction(p.user?._id, 'reset')} disabled={processingAction} className="bg-red-600 hover:bg-red-700 text-white px-2 py-1.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm disabled:opacity-50" title="Reset Progres"><RefreshCw size={12}/> Reset</button>
                            </div>
                        ) : <span className="text-gray-300 text-xs italic">- Pilih Materi -</span>}
                    </td>
                    <td className="p-4 text-center">{isLulus ? (<button onClick={() => handleDownloadCertificate(p.user?._id)} className="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50 border border-blue-200 transition-colors" title="Download Sertifikat"><Award size={18}/></button>) : <span className="text-gray-300 text-xs">-</span>}</td>
                    <td className="p-4 text-center"><button onClick={() => { setStudentDetail(p); setShowStudentDetailModal(true); }} className="text-gray-400 hover:text-indigo-600 transition-colors" title="Lihat Detail Belajar"><Eye size={18} /></button></td>
                    <td className="p-4 text-center"><div className="flex justify-center gap-2"><button onClick={() => setChatTargetStudent(p)} className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded transition-colors" title="Chat Personal"><MessageCircle size={18}/></button><button onClick={() => handleRejectParticipant(p._id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded transition-colors" title="Hapus Peserta"><Trash2 size={18}/></button></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {chatTargetStudent && <PersonalChatModal student={chatTargetStudent} onClose={() => setChatTargetStudent(null)} />}
      
      {showGroupChat && (
        <CourseGroupChat 
            courseId={courseId}
            currentUser={user} 
            participants={participants} 
            facilitators={activeFacilitators} 
            onClose={() => setShowGroupChat(false)} 
            isFloating={false} 
        />
      )}
      
      {/* MODAL DETAIL SISWA DENGAN TAB & REFRESH */}
      {showStudentDetailModal && studentDetail && (
        <StudentDetailModal 
            student={studentDetail} 
            course={course} 
            onClose={() => setShowStudentDetailModal(false)}
            onRefresh={() => fetchParticipants(true)} // [FIX] Fungsi Refresh diteruskan
        />
      )}
    </div>
  );
}
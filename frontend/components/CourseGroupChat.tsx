// // // 'use client';

// // // import { useState, useEffect, useRef } from 'react';
// // // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // // import dynamic from 'next/dynamic';
// // // import {
// // //   MessageSquare, Send, X, Smile, Paperclip, 
// // //   FileText, Users, Image as ImageIcon, Minimize2
// // // } from 'lucide-react';

// // // // Dynamic import untuk EmojiPicker agar tidak error saat SSR
// // // const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

// // // interface Props {
// // //   courseId: string;
// // //   currentUser: any;
// // //   onClose?: () => void;
// // //   isFloating?: boolean; 
// // //   participants?: any[]; 
// // //   facilitators?: any[]; 
// // // }

// // // export default function CourseGroupChat({ courseId, currentUser, onClose, isFloating = false, participants = [], facilitators = [] }: Props) {
// // //   const [activeTab, setActiveTab] = useState<'internal' | 'public'>('public');
// // //   const [messages, setMessages] = useState<any[]>([]);
// // //   const [newMessage, setNewMessage] = useState('');
// // //   const [showEmoji, setShowEmoji] = useState(false);
// // //   const [attachment, setAttachment] = useState<any>(null);
// // //   const [isUploading, setIsUploading] = useState(false);
  
// // //   const [isOpen, setIsOpen] = useState(!isFloating); 
// // //   const [showSidebar, setShowSidebar] = useState(true); 

// // //   const [mentionQuery, setMentionQuery] = useState('');
// // //   const [showMentionPopup, setShowMentionPopup] = useState(false);
// // //   const [filteredMembers, setFilteredMembers] = useState<any[]>([]);

// // //   const messagesEndRef = useRef<HTMLDivElement>(null);
// // //   const fileInputRef = useRef<HTMLInputElement>(null);
// // //   const inputRef = useRef<HTMLInputElement>(null);

// // //   // [FIX] Cegah scroll parent saat scroll di dalam chat
// // //   const preventScroll = (e: React.MouseEvent) => e.stopPropagation();

// // //   // --- MEMBER LIST LOGIC ---
// // //   const getActiveMembers = () => {
// // //     const facs = (facilitators || []).map((f: any) => ({
// // //       _id: String(f._id || f.id),
// // //       name: f.name || 'Fasilitator',
// // //       avatarUrl: f.avatarUrl,
// // //       role: 'Fasilitator'
// // //     }));

// // //     const students = (participants || []).map((p: any) => {
// // //         const user = p.user ? p.user : p; 
// // //         if (!user || (!user._id && !user.id)) return null;
// // //         return {
// // //             _id: String(user._id || user.id),
// // //             name: user.name || 'Peserta',
// // //             avatarUrl: user.avatarUrl,
// // //             role: 'Peserta'
// // //         };
// // //     }).filter((u: any) => u !== null);

// // //     let displayList: any[] = [];
// // //     if (activeTab === 'public') {
// // //         displayList = [...facs, ...students];
// // //     } else {
// // //         displayList = [...facs];
// // //     }
    
// // //     const uniqueMap = new Map();
// // //     displayList.forEach(item => {
// // //         if (item && item._id) uniqueMap.set(String(item._id), item);
// // //     });
    
// // //     return Array.from(uniqueMap.values()).sort((a: any, b: any) => (a.name || '').localeCompare(b.name || ''));
// // //   };

// // //   const activeMembers = getActiveMembers();

// // //   // Scroll ke bawah saat pesan baru masuk
// // //   useEffect(() => {
// // //     if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // //   }, [messages, isOpen]);

// // //   // Polling pesan baru setiap 3 detik
// // //   useEffect(() => {
// // //     if (!isOpen) return;
// // //     loadMessages();
// // //     const interval = setInterval(loadMessages, 3000);
// // //     return () => clearInterval(interval);
// // //   }, [courseId, activeTab, isOpen]);

// // //   const loadMessages = async () => {
// // //     try {
// // //       const res = await api(`/api/courses/${courseId}/groups/messages?type=${activeTab}`);
// // //       // Cek kesamaan data sederhana (berdasarkan panjang array) untuk meminimalkan re-render
// // //       // Idealnya gunakan deep comparison atau memo, tapi length check + last ID check cukup efisien
// // //       setMessages(prev => {
// // //           if (res && res.length !== prev.length) return res;
// // //           if (res && res.length > 0 && prev.length > 0 && res[res.length-1]._id !== prev[prev.length-1]._id) return res;
// // //           return prev; // Kembalikan state lama jika tidak ada perubahan signifikan
// // //       });
// // //     } catch (e) { console.error(e); }
// // //   };

// // //   const handleSend = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if ((!newMessage.trim() && !attachment) || isUploading) return;

// // //     let targetType = activeTab;
// // //     // Jika peserta, paksa ke public karena tidak punya akses internal
// // //     if (currentUser.role === 'PARTICIPANT') targetType = 'public';

// // //     // Optimistic UI Update
// // //     const tempMsg = {
// // //       _id: Date.now(),
// // //       sender: { name: currentUser.name, role: 'me', avatarUrl: currentUser.avatarUrl, _id: currentUser.id || currentUser._id },
// // //       message: newMessage,
// // //       attachment,
// // //       createdAt: new Date().toISOString()
// // //     };
    
// // //     setMessages(prev => [...prev, tempMsg]);
// // //     const msgToSend = newMessage; 
// // //     setNewMessage(''); 
// // //     setAttachment(null); 
// // //     setShowEmoji(false); 
// // //     setShowMentionPopup(false);

// // //     try {
// // //       const payload = { text: msgToSend, type: targetType, attachment };
// // //       await api(`/api/courses/${courseId}/groups/send`, { method: 'POST', body: payload });
// // //       loadMessages(); // Refresh data asli dari server
// // //     } catch (e: any) { alert('Gagal kirim pesan: ' + e.message); }
// // //   };

// // //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const file = e.target.files?.[0];
// // //     if (!file) return;
// // //     setIsUploading(true);
// // //     try {
// // //         const fd = new FormData(); fd.append('file', file);
// // //         const res = await apiUpload('/api/upload', fd);
// // //         const url = res.url || res.file?.url || res.imageUrl;
// // //         setAttachment({ url, type: file.type.startsWith('image') ? 'image' : 'file', name: file.name });
// // //     } catch (e) { alert('Gagal upload file'); } finally { 
// // //         setIsUploading(false);
// // //         if(fileInputRef.current) fileInputRef.current.value = ''; // Reset input file
// // //     }
// // //   };

// // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const val = e.target.value;
// // //     setNewMessage(val);
    
// // //     // Logika Mention (@nama)
// // //     const cursorPosition = e.target.selectionStart || 0;
// // //     const textBeforeCursor = val.slice(0, cursorPosition);
// // //     const lastWord = textBeforeCursor.split(' ').pop();
    
// // //     if (lastWord && lastWord.startsWith('@') && lastWord.length > 1) {
// // //         const query = lastWord.substring(1).toLowerCase();
// // //         setMentionQuery(query);
// // //         const matches = activeMembers.filter((u: any) => u.name && u.name.toLowerCase().includes(query));
// // //         setFilteredMembers(matches);
// // //         setShowMentionPopup(matches.length > 0);
// // //     } else {
// // //         setShowMentionPopup(false);
// // //     }
// // //   };

// // //   const insertMention = (name: string) => {
// // //     const cursorPosition = inputRef.current?.selectionStart || 0;
// // //     const textBeforeCursor = newMessage.slice(0, cursorPosition);
// // //     const textAfterCursor = newMessage.slice(cursorPosition);
    
// // //     const lastAtPos = textBeforeCursor.lastIndexOf('@');
// // //     const newTextBefore = textBeforeCursor.substring(0, lastAtPos) + `@${name} `;
    
// // //     setNewMessage(newTextBefore + textAfterCursor);
// // //     setShowMentionPopup(false);
// // //     inputRef.current?.focus();
// // //   };

// // //   // Komponen Bubble Pesan
// // //   const renderMessageBubble = (msg: any) => {
// // //     const myId = currentUser.id || currentUser._id;
// // //     const msgSenderId = typeof msg.sender === 'object' ? (msg.sender._id || msg.sender.id) : msg.sender;
// // //     const isMe = msg.sender?.role === 'me' || String(msgSenderId) === String(myId);

// // //     // Format waktu
// // //     const timeString = new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

// // //     return (
// // //         <div key={msg._id} className={`flex w-full mb-4 ${isMe ? 'justify-end' : 'justify-start'}`}>
// // //             <div className={`flex max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
// // //                 <div className="flex-shrink-0">
// // //                     {msg.sender?.avatarUrl ? (
// // //                         <img 
// // //                             src={getImageUrl(msg.sender.avatarUrl)} 
// // //                             className="w-8 h-8 rounded-full object-cover border border-gray-200 mt-1" 
// // //                             alt={msg.sender?.name || 'User'}
// // //                         />
// // //                     ) : (
// // //                         <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-200 mt-1">
// // //                             {msg.sender?.name?.charAt(0) || '?'}
// // //                         </div>
// // //                     )}
// // //                 </div>
// // //                 <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// // //                     <div className="flex items-center gap-2 mb-1">
// // //                         <span className="text-[10px] font-bold text-gray-600">{msg.sender?.name || 'Unknown'}</span>
// // //                         <span className="text-[9px] text-gray-400">{timeString}</span>
// // //                     </div>
// // //                     <div className={`px-3 py-2 text-sm rounded-2xl shadow-sm ${isMe ? 'bg-red-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>
// // //                         {msg.attachment && (
// // //                             <div className="mb-2 p-1 bg-black/10 rounded overflow-hidden">
// // //                                 {msg.attachment.type === 'image' ? (
// // //                                     <a href={getImageUrl(msg.attachment.url)} target="_blank" rel="noopener noreferrer" title="Lihat Gambar">
// // //                                         <img src={getImageUrl(msg.attachment.url)} className="max-h-32 rounded object-cover" alt="Attachment"/>
// // //                                     </a>
// // //                                 ) : (
// // //                                     <a href={getImageUrl(msg.attachment.url)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs underline" title={`Download ${msg.attachment.name}`}>
// // //                                         <FileText size={12}/> {msg.attachment.name}
// // //                                     </a>
// // //                                 )}
// // //                             </div>
// // //                         )}
// // //                         <p className="whitespace-pre-wrap">{msg.message}</p>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // //   };

// // //   // Komponen Floating Button (Jika kondisi floating dan tertutup)
// // //   if (isFloating && !isOpen) {
// // //       return (
// // //           <button 
// // //             type="button"
// // //             onClick={() => setIsOpen(true)}
// // //             className="fixed bottom-24 right-6 w-14 h-14 bg-red-700 hover:bg-red-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 z-[50] animate-in zoom-in"
// // //             title="Buka Ruang Diskusi"
// // //             aria-label="Buka Ruang Diskusi"
// // //           >
// // //               <MessageSquare size={28} />
// // //           </button>
// // //       );
// // //   }

// // //   if (!isOpen) return null;

// // //   // --- RENDER MODAL UTAMA ---
// // //   return (
// // //     // [FIX ARIA] Tambahkan role="dialog" dan aria-modal="true" pada container modal
// // //     <div 
// // //         className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${isFloating ? 'pointer-events-none' : 'bg-black/60 backdrop-blur-sm'}`} 
// // //         role={!isFloating ? "dialog" : undefined}
// // //         aria-modal={!isFloating ? "true" : undefined}
// // //         aria-label="Ruang Diskusi"
// // //         onClick={() => !isFloating && onClose && onClose()}
// // //     >
// // //         {/* Container Chat Box */}
// // //         <div 
// // //             className={`${isFloating ? 'pointer-events-auto fixed bottom-24 right-6 w-[90vw] md:w-[450px] h-[600px] shadow-2xl' : 'w-full max-w-5xl h-[85vh] shadow-2xl'} bg-white rounded-2xl flex flex-col overflow-hidden animate-in zoom-in-95 border border-gray-200`} 
// // //             onClick={(e) => e.stopPropagation()}
// // //         >
// // //             {/* Header Chat */}
// // //             <div className="bg-red-700 text-white p-4 flex justify-between items-center shadow-md shrink-0">
// // //                 <div className="flex items-center gap-4">
// // //                     <h3 className="font-bold text-lg flex items-center gap-2"><MessageSquare size={20}/> Ruang Diskusi</h3>
                    
// // //                     {/* Tab Switcher */}
// // //                     <div className="bg-red-800/50 p-1 rounded-lg flex text-xs">
// // //                         <button 
// // //                             type="button" 
// // //                             onClick={()=>setActiveTab('public')} 
// // //                             className={`px-3 py-1.5 rounded font-bold transition-all ${activeTab==='public'?'bg-white text-red-700 shadow':'text-red-100 hover:text-white'}`} 
// // //                             title="Buka Tab Kelas"
// // //                         >
// // //                             Kelas
// // //                         </button>
// // //                         {currentUser.role !== 'PARTICIPANT' && (
// // //                             <button 
// // //                                 type="button" 
// // //                                 onClick={()=>setActiveTab('internal')} 
// // //                                 className={`px-3 py-1.5 rounded font-bold transition-all ${activeTab==='internal'?'bg-white text-red-700 shadow':'text-red-100 hover:text-white'}`} 
// // //                                 title="Buka Tab Fasilitator"
// // //                             >
// // //                                 Fasilitator
// // //                             </button>
// // //                         )}
// // //                     </div>
// // //                 </div>
// // //                 <div className="flex gap-2">
// // //                     {/* Toggle Sidebar Member (hanya jika bukan mode floating kecil) */}
// // //                     {!isFloating && (
// // //                         <button 
// // //                             type="button" 
// // //                             onClick={()=>setShowSidebar(!showSidebar)} 
// // //                             className={`p-2 rounded-full transition-colors ${showSidebar?'bg-white text-red-700':'hover:bg-red-800 text-white'}`} 
// // //                             title="Toggle Daftar Anggota" 
// // //                             aria-label="Toggle Daftar Anggota"
// // //                         >
// // //                             <Users size={20}/>
// // //                         </button>
// // //                     )}
// // //                     {/* Tombol Tutup / Minimize */}
// // //                     <button 
// // //                         type="button" 
// // //                         onClick={isFloating ? () => setIsOpen(false) : onClose} 
// // //                         className="hover:bg-red-800 p-2 rounded-full text-white" 
// // //                         title="Tutup Chat" 
// // //                         aria-label="Tutup Chat"
// // //                     >
// // //                         {isFloating ? <Minimize2 size={20}/> : <X size={20}/>}
// // //                     </button>
// // //                 </div>
// // //             </div>

// // //             {/* Body Chat */}
// // //             <div className="flex flex-1 overflow-hidden">
// // //                 {/* Area Pesan Utama */}
// // //                 <div className="flex-1 flex flex-col bg-gray-50 relative min-w-0">
// // //                     <div className="flex-1 p-4 overflow-y-auto custom-scrollbar" onClick={()=>setShowEmoji(false)}>
// // //                         {messages.length === 0 && (
// // //                             <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-50">
// // //                                 <MessageSquare size={64} className="mb-2"/>
// // //                                 <p>Belum ada percakapan. Mulai diskusi!</p>
// // //                             </div>
// // //                         )}
// // //                         {messages.map(renderMessageBubble)}
// // //                         <div ref={messagesEndRef} />
// // //                     </div>

// // //                     {/* Area Input Pesan */}
// // //                     <div className="p-3 border-t bg-white relative" onClick={preventScroll}>
// // //                         {/* Emoji Picker Popup */}
// // //                         {showEmoji && (
// // //                             <div className="absolute bottom-16 left-0 z-50 shadow-xl border rounded-lg">
// // //                                 <EmojiPicker onEmojiClick={(e)=>setNewMessage(prev=>prev+e.emoji)} height={350} width={300} searchDisabled={false} skinTonesDisabled />
// // //                             </div>
// // //                         )}
                        
// // //                         {/* Mention Popup */}
// // //                         {showMentionPopup && (
// // //                             <div className="absolute bottom-16 left-4 bg-white border border-gray-200 shadow-xl rounded-lg w-64 max-h-48 overflow-y-auto z-50">
// // //                                 {filteredMembers.map((u: any) => (
// // //                                     <button 
// // //                                         key={u._id} 
// // //                                         type="button" 
// // //                                         onClick={() => insertMention(u.name)} 
// // //                                         className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-xs" 
// // //                                         title={`Mention ${u.name}`}
// // //                                     >
// // //                                         {u.avatarUrl ? <img src={getImageUrl(u.avatarUrl)} className="w-5 h-5 rounded-full object-cover" alt="" /> : <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold">{u.name.charAt(0)}</div>}
// // //                                         <span className="truncate font-bold">{u.name}</span>
// // //                                     </button>
// // //                                 ))}
// // //                             </div>
// // //                         )}

// // //                         {/* Attachment Preview Bar */}
// // //                         {attachment && (
// // //                             <div className="flex justify-between items-center bg-gray-100 px-3 py-2 mb-2 rounded-lg text-xs border border-gray-200">
// // //                                 <span className="flex items-center gap-2 truncate font-medium text-gray-700">
// // //                                     {attachment.type === 'image' ? <ImageIcon size={14}/> : <Paperclip size={14}/>} 
// // //                                     {attachment.name}
// // //                                 </span>
// // //                                 <button type="button" onClick={() => setAttachment(null)} title="Hapus Lampiran" className="text-gray-500 hover:text-red-500"><X size={14}/></button>
// // //                             </div>
// // //                         )}

// // //                         {/* Form Input */}
// // //                         <form onSubmit={handleSend} className="flex gap-2 items-center">
// // //                             <div className="flex gap-1">
// // //                                 <button 
// // //                                     type="button" 
// // //                                     onClick={()=>setShowEmoji(!showEmoji)} 
// // //                                     className="text-gray-400 hover:text-yellow-500 p-2 rounded-full hover:bg-yellow-50 transition-colors" 
// // //                                     title="Emoji" 
// // //                                     aria-label="Buka Emoji"
// // //                                 >
// // //                                     <Smile size={20}/>
// // //                                 </button>
// // //                                 <button 
// // //                                     type="button" 
// // //                                     onClick={()=>fileInputRef.current?.click()} 
// // //                                     className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors" 
// // //                                     title="Upload File" 
// // //                                     aria-label="Upload File"
// // //                                 >
// // //                                     <Paperclip size={20}/>
// // //                                 </button>
// // //                                 <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
// // //                             </div>
                            
// // //                             <input 
// // //                                 ref={inputRef} 
// // //                                 className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-gray-50 transition-all" 
// // //                                 placeholder={activeTab==='public' ? "Kirim pesan ke kelas..." : "Chat internal fasilitator..."} 
// // //                                 value={newMessage} 
// // //                                 onChange={handleInputChange} 
// // //                                 title="Input Pesan" 
// // //                                 aria-label="Ketik Pesan"
// // //                                 autoComplete="off" 
// // //                             />
                            
// // //                             <button 
// // //                                 type="submit" 
// // //                                 disabled={!newMessage.trim() && !attachment} 
// // //                                 className="text-white bg-red-600 hover:bg-red-700 p-2.5 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
// // //                                 title="Kirim Pesan" 
// // //                                 aria-label="Kirim Pesan"
// // //                             >
// // //                                 <Send size={18}/>
// // //                             </button>
// // //                         </form>
// // //                     </div>
// // //                 </div>

// // //                 {/* Sidebar Anggota (Hanya tampil jika mode full/modal dan sidebar aktif) */}
// // //                 {showSidebar && !isFloating && (
// // //                     <div className="w-72 bg-white border-l border-gray-200 flex flex-col shrink-0 animate-in slide-in-from-right">
// // //                         <div className="p-3 border-b bg-gray-50 font-bold text-gray-700 text-xs uppercase tracking-wider flex justify-between items-center">
// // //                             <span>Anggota ({activeMembers.length})</span>
// // //                         </div>
// // //                         <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
// // //                             {activeMembers.map((m: any, idx: number) => (
// // //                                 <button 
// // //                                     type="button" 
// // //                                     key={idx} 
// // //                                     className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 group cursor-pointer transition-colors text-left" 
// // //                                     onClick={() => insertMention(m.name)} 
// // //                                     title={`Mention ${m.name}`}
// // //                                 >
// // //                                     <div className="relative flex-shrink-0">
// // //                                         {m.avatarUrl ? (
// // //                                             <img src={getImageUrl(m.avatarUrl)} className="w-8 h-8 rounded-full object-cover border border-gray-200" alt={m.name} />
// // //                                         ) : (
// // //                                             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${m.role==='Fasilitator'?'bg-purple-500':'bg-green-500'}`}>
// // //                                                 {m.name.charAt(0)}
// // //                                             </div>
// // //                                         )}
// // //                                         {/* Status Dot (Optional) */}
// // //                                         {/* <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full ${m.role==='Fasilitator'?'bg-purple-500':'bg-green-500'}`}></span> */}
// // //                                     </div>
// // //                                     <div className="flex-1 min-w-0 overflow-hidden">
// // //                                         <p className="text-sm font-bold text-gray-800 truncate">{m.name}</p>
// // //                                         <p className={`text-[10px] uppercase font-bold truncate ${m.role==='Fasilitator'?'text-purple-600':'text-gray-400'}`}>{m.role}</p>
// // //                                     </div>
// // //                                 </button>
// // //                             ))}
// // //                         </div>
// // //                     </div>
// // //                 )}
// // //             </div>
// // //         </div>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // import dynamic from 'next/dynamic';
// // import { 
// //     X, Send, MessageCircle, Paperclip, Minimize2, 
// //     Maximize2, Users, Smile, FileText, Image as ImageIcon, Trash2
// // } from 'lucide-react';

// // const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

// // interface CourseGroupChatProps {
// //     courseId: string;
// //     currentUser: any;
// //     participants?: any[];
// //     facilitators?: any[];
// //     isFloating?: boolean;
// //     onClose?: () => void;
// // }

// // export default function CourseGroupChat({ 
// //     courseId, 
// //     currentUser, 
// //     participants = [], 
// //     facilitators = [], 
// //     isFloating = false, 
// //     onClose 
// // }: CourseGroupChatProps) {
// //     const [isOpen, setIsOpen] = useState(!isFloating);
// //     const [activeTab, setActiveTab] = useState<'public' | 'internal'>('public');
// //     const [messages, setMessages] = useState<any[]>([]);
// //     const [inputText, setInputText] = useState('');
// //     const [isSending, setIsSending] = useState(false);
// //     const messagesEndRef = useRef<HTMLDivElement>(null);
// //     const [showMembers, setShowMembers] = useState(true);
    
// //     const [showEmoji, setShowEmoji] = useState(false);
// //     const [attachment, setAttachment] = useState<{ url: string, type: 'image' | 'file', name: string } | null>(null);
// //     const [isUploading, setIsUploading] = useState(false);
// //     const fileInputRef = useRef<HTMLInputElement>(null);
    
// //     const [mentionQuery, setMentionQuery] = useState('');
// //     const [showMentionPopup, setShowMentionPopup] = useState(false);
// //     const [cursorPos, setCursorPos] = useState(0);

// //     const isFacilitator = currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN' || facilitators.some((f: any) => f._id === currentUser?.id || f.id === currentUser?.id);

// //     // --- 1. NORMALISASI DATA ANGGOTA ---
// //     const normalizeMember = (data: any, role: string) => {
// //         const userObj = data.user || data;
// //         if (!userObj) return null;
// //         return {
// //             _id: userObj._id || userObj.id,
// //             name: userObj.name || 'Tanpa Nama',
// //             avatarUrl: userObj.avatarUrl,
// //             roleLabel: role,
// //             email: userObj.email
// //         };
// //     };

// //     const allFacilitators = facilitators.map(f => normalizeMember(f, 'Fasilitator')).filter(Boolean);
// //     const allParticipants = participants.map(p => normalizeMember(p, 'Peserta')).filter(Boolean);

// //     // Gabungkan semua untuk referensi
// //     const allMembersCombined = [...allFacilitators, ...allParticipants];
// //     const uniqueAllMembers = Array.from(new Map(allMembersCombined.map(item => [item!._id, item])).values());

// //     // [FIX] FILTER ANGGOTA BERDASARKAN TAB AKTIF
// //     // Jika Public: Tampilkan Semua. Jika Internal: Tampilkan HANYA Fasilitator.
// //     const activeMembersList = activeTab === 'public' 
// //         ? uniqueAllMembers 
// //         : uniqueAllMembers.filter(m => m!.roleLabel === 'Fasilitator');

// //     // --- 2. LOAD & POLLING ---
// //     const loadMessages = async () => {
// //         try {
// //             if (!isOpen && isFloating) return;
// //             const res = await api(`/api/courses/${courseId}/groups/messages?type=${activeTab}`);
// //             setMessages(prev => {
// //                 if (res && res.length !== prev.length) return res;
// //                 if (res && res.length > 0 && prev.length > 0 && res[res.length-1]._id !== prev[prev.length-1]._id) return res;
// //                 return prev;
// //             });
// //         } catch (e) { console.error("Gagal load chat", e); }
// //     };

// //     useEffect(() => {
// //         if (isOpen) {
// //             loadMessages();
// //             const interval = setInterval(loadMessages, 3000);
// //             return () => clearInterval(interval);
// //         }
// //     }, [courseId, activeTab, isOpen]);

// //     useEffect(() => {
// //         if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //     }, [messages, isOpen, activeTab]);

// //     // --- 3. HANDLERS ---
// //     const onEmojiClick = (emojiData: any) => {
// //         const text = inputText;
// //         const newText = text.slice(0, cursorPos) + emojiData.emoji + text.slice(cursorPos);
// //         setInputText(newText);
// //         setShowEmoji(false);
// //     };

// //     const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const file = e.target.files?.[0];
// //         if (!file) return;

// //         setIsUploading(true);
// //         try {
// //             const fd = new FormData();
// //             fd.append('file', file);
// //             const res = await apiUpload('/api/upload', fd);
// //             const url = res.url || res.file?.url || res.imageUrl;
            
// //             const isImg = file.type.startsWith('image/');
// //             setAttachment({
// //                 url,
// //                 type: isImg ? 'image' : 'file',
// //                 name: file.name
// //             });
// //         } catch (err: any) {
// //             alert("Gagal upload: " + err.message);
// //         } finally {
// //             setIsUploading(false);
// //             if (fileInputRef.current) fileInputRef.current.value = ''; 
// //         }
// //     };

// //     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const val = e.target.value;
// //         const selStart = e.target.selectionStart || 0;
// //         setInputText(val);
// //         setCursorPos(selStart);

// //         const lastAt = val.lastIndexOf('@', selStart);
// //         if (lastAt !== -1) {
// //             const query = val.substring(lastAt + 1, selStart);
// //             if (!query.includes(' ')) { 
// //                 setMentionQuery(query);
// //                 setShowMentionPopup(true);
// //                 return;
// //             }
// //         }
// //         setShowMentionPopup(false);
// //     };

// //     const insertMention = (name: string) => {
// //         const lastAt = inputText.lastIndexOf('@', cursorPos);
// //         const newText = inputText.substring(0, lastAt) + `@${name} ` + inputText.substring(cursorPos);
// //         setInputText(newText);
// //         setShowMentionPopup(false);
// //     };

// //     const handleSend = async (e?: React.FormEvent) => {
// //         e?.preventDefault();
// //         if ((!inputText.trim() && !attachment) || isSending || isUploading) return;

// //         setIsSending(true);
// //         try {
// //             await api(`/api/courses/${courseId}/groups/send`, {
// //                 method: 'POST',
// //                 body: { 
// //                     text: inputText, 
// //                     type: activeTab,
// //                     attachment: attachment 
// //                 }
// //             });
// //             setInputText('');
// //             setAttachment(null);
// //             loadMessages();
// //         } catch (error: any) {
// //             alert("Gagal kirim pesan: " + error.message);
// //         } finally {
// //             setIsSending(false);
// //         }
// //     };

// //     if (isFloating && !isOpen) {
// //         return (
// //             <button 
// //                 onClick={() => setIsOpen(true)}
// //                 className="fixed bottom-6 right-24 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-xl transition-transform hover:scale-105 flex items-center gap-2 animate-in slide-in-from-bottom-4"
// //                 title="Buka Ruang Diskusi"
// //                 aria-label="Buka Ruang Diskusi"
// //             >
// //                 <MessageCircle size={24} />
// //                 <span className="font-bold text-sm hidden md:inline">Ruang Diskusi</span>
// //             </button>
// //         );
// //     }

// //     const modalAttributes = !isFloating ? {
// //         role: "dialog",
// //         "aria-modal": true,
// //         "aria-label": "Ruang Diskusi"
// //     } : {
// //         "aria-label": "Panel Diskusi"
// //     };

// //     const containerClasses = isFloating 
// //         ? "fixed bottom-24 right-6 w-[90vw] md:w-[900px] h-[500px] md:h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex overflow-hidden border border-gray-200 animate-in zoom-in-95 origin-bottom-right"
// //         : "fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4";

// //     const innerClasses = isFloating
// //         ? "w-full h-full flex flex-col md:flex-row"
// //         : "bg-white w-full max-w-6xl h-[85vh] rounded-2xl shadow-2xl flex overflow-hidden animate-in zoom-in-95";

// //     return (
// //         <div 
// //             className={containerClasses} 
// //             {...modalAttributes}
// //             onClick={() => !isFloating && onClose && onClose()}
// //         >
// //             <div className={innerClasses} onClick={(e) => e.stopPropagation()}>
                
// //                 {/* --- LEFT: CHAT AREA --- */}
// //                 <div className="flex-1 flex flex-col min-w-0 relative">
// //                     {/* HEADER */}
// //                     <div className="h-16 bg-red-900 text-white px-4 flex items-center justify-between shrink-0">
// //                         <div className="flex items-center gap-3">
// //                             <MessageCircle size={20} />
// //                             <h3 className="font-bold text-lg">Ruang Diskusi</h3>
// //                             {isFacilitator && (
// //                                 <div className="ml-4 flex bg-red-950/30 rounded-lg p-1">
// //                                     <button 
// //                                         onClick={() => setActiveTab('public')} 
// //                                         className={`px-3 py-1 rounded text-xs font-bold transition-all ${activeTab === 'public' ? 'bg-white text-red-900 shadow' : 'text-red-100 hover:bg-red-800'}`}
// //                                     >
// //                                         Kelas (Publik)
// //                                     </button>
// //                                     <button 
// //                                         onClick={() => setActiveTab('internal')} 
// //                                         className={`px-3 py-1 rounded text-xs font-bold transition-all ${activeTab === 'internal' ? 'bg-white text-red-900 shadow' : 'text-red-100 hover:bg-red-800'}`}
// //                                     >
// //                                         Fasilitator
// //                                     </button>
// //                                 </div>
// //                             )}
// //                         </div>
// //                         <div className="flex items-center gap-2">
// //                             <button onClick={() => setShowMembers(!showMembers)} className="p-2 hover:bg-white/10 rounded-full md:hidden" title="Anggota" aria-label="Anggota"><Users size={20}/></button>
// //                             {isFloating ? (
// //                                 <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full" title="Minimize" aria-label="Minimize"><Minimize2 size={20}/></button>
// //                             ) : (
// //                                 <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full" title="Tutup" aria-label="Tutup"><X size={24}/></button>
// //                             )}
// //                         </div>
// //                     </div>

// //                     {/* MESSAGES LIST */}
// //                     <div className="flex-1 bg-slate-100 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3" onClick={() => { setShowEmoji(false); setShowMentionPopup(false); }}>
// //                         {messages.length === 0 ? (
// //                             <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2"><MessageCircle size={40} className="opacity-20"/><p className="text-sm">Belum ada percakapan.</p></div>
// //                         ) : (
// //                             messages.map((msg, idx) => {
// //                                 const isMe = msg.sender?._id === currentUser?.id || msg.sender === currentUser?.id;
// //                                 const isMsgFacil = msg.sender?.role === 'ADMIN' || msg.sender?.role === 'SUPER_ADMIN' || facilitators.some(f => f._id === msg.sender?._id);
// //                                 return (
// //                                     <div key={idx} className={`flex gap-3 max-w-[85%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'}`}>
// //                                         <div className="shrink-0 flex flex-col items-center gap-1">
// //                                             {msg.sender?.avatarUrl ? <img src={getImageUrl(msg.sender.avatarUrl)} className="w-8 h-8 rounded-full object-cover border border-gray-300" alt="Avt" /> : <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${isMsgFacil ? 'bg-red-600' : 'bg-indigo-500'}`}>{msg.sender?.name?.charAt(0) || '?'}</div>}
// //                                         </div>
// //                                         <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// //                                             <div className="flex items-center gap-2 mb-1">
// //                                                 <span className="text-[10px] font-bold text-gray-600">{msg.sender?.name || 'Unknown'}</span>
// //                                                 <span className="text-[9px] text-gray-400">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
// //                                             </div>
// //                                             <div className={`px-4 py-2 rounded-2xl text-sm shadow-sm break-words relative group ${isMe ? 'bg-red-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>
// //                                                 {msg.attachment && (
// //                                                     <div className="mb-2">
// //                                                         {msg.attachment.type === 'image' ? (
// //                                                             <img src={getImageUrl(msg.attachment.url)} alt="Att" className="max-w-[200px] rounded-lg border border-white/20" />
// //                                                         ) : (
// //                                                             <a href={getImageUrl(msg.attachment.url)} target="_blank" className={`flex items-center gap-2 p-2 rounded ${isMe ? 'bg-red-700' : 'bg-gray-100'} hover:opacity-80`}>
// //                                                                 <FileText size={16}/> <span className="truncate max-w-[150px] underline">{msg.attachment.name || 'Dokumen'}</span>
// //                                                             </a>
// //                                                         )}
// //                                                     </div>
// //                                                 )}
// //                                                 {msg.message}
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                 );
// //                             })
// //                         )}
// //                         <div ref={messagesEndRef} />
// //                     </div>

// //                     {/* MENTION POPUP */}
// //                     {showMentionPopup && (
// //                         <div className="absolute bottom-20 left-4 bg-white border border-gray-200 shadow-xl rounded-lg w-64 max-h-48 overflow-y-auto z-50">
// //                             {/* [FIX] Gunakan activeMembersList untuk filter mention */}
// //                             {activeMembersList.filter(m => m!.name.toLowerCase().includes(mentionQuery.toLowerCase())).map(m => (
// //                                 <button key={m!._id} onClick={() => insertMention(m!.name)} className="w-full text-left px-3 py-2 hover:bg-indigo-50 text-sm flex items-center gap-2 border-b last:border-0">
// //                                     <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${m!.roleLabel === 'Fasilitator' ? 'bg-red-500' : 'bg-gray-400'}`}>{m!.name.charAt(0)}</div>
// //                                     <span className="truncate font-medium text-gray-700">{m!.name}</span>
// //                                 </button>
// //                             ))}
// //                         </div>
// //                     )}

// //                     {/* EMOJI PICKER */}
// //                     {showEmoji && (
// //                         <div className="absolute bottom-20 left-4 z-50">
// //                             <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={350} />
// //                         </div>
// //                     )}

// //                     {/* ATTACHMENT PREVIEW */}
// //                     {attachment && (
// //                         <div className="px-4 pt-2 bg-white border-t flex items-center gap-3">
// //                             <div className="relative bg-gray-50 border rounded-lg p-2 flex items-center gap-2 pr-8">
// //                                 {attachment.type === 'image' ? <ImageIcon size={20} className="text-purple-600"/> : <FileText size={20} className="text-blue-600"/>}
// //                                 <span className="text-xs max-w-[200px] truncate font-medium text-gray-700">{attachment.name}</span>
// //                                 <button onClick={() => setAttachment(null)} className="absolute top-1 right-1 hover:bg-gray-200 rounded-full p-0.5 text-gray-500" title="Hapus"><X size={14}/></button>
// //                             </div>
// //                         </div>
// //                     )}

// //                     {/* INPUT AREA */}
// //                     <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2 items-end shrink-0">
// //                         <div className="flex gap-1 pb-2">
// //                             <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-2 text-gray-400 hover:text-yellow-500 transition-colors" title="Emoji" aria-label="Buka Emoji"><Smile size={20}/></button>
// //                             <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-blue-500 transition-colors" title="Lampirkan File" aria-label="Lampirkan File"><Paperclip size={20}/></button>
// //                             <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} title="Upload File" aria-label="Upload File"/>
// //                         </div>
                        
// //                         <div className="flex-1 relative">
// //                             <input 
// //                                 className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition-all" 
// //                                 placeholder={isUploading ? "Mengupload..." : `Ketik pesan... (@ untuk mention)`}
// //                                 value={inputText}
// //                                 onChange={handleInputChange}
// //                                 disabled={isUploading}
// //                                 autoFocus={!isFloating}
// //                                 title="Input Pesan"
// //                                 aria-label="Input Pesan"
// //                                 onKeyDown={(e) => {
// //                                     if (e.key === 'Enter' && !e.shiftKey) {
// //                                         e.preventDefault();
// //                                         handleSend();
// //                                     }
// //                                 }}
// //                             />
// //                         </div>
                        
// //                         <button 
// //                             type="submit" 
// //                             disabled={(!inputText.trim() && !attachment) || isSending || isUploading}
// //                             className="bg-red-700 text-white hover:bg-red-800 p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-0.5"
// //                             title="Kirim Pesan"
// //                             aria-label="Kirim Pesan"
// //                         >
// //                             <Send size={18} className={isSending ? 'animate-pulse' : ''} />
// //                         </button>
// //                     </form>
// //                 </div>

// //                 {/* --- RIGHT: MEMBER LIST --- */}
// //                 {showMembers && (
// //                     <div className="w-64 bg-white border-l border-gray-200 flex flex-col shrink-0 md:flex hidden md:flex">
// //                         <div className="p-4 border-b bg-gray-50 font-bold text-gray-700 text-sm flex justify-between items-center">
// //                             {/* [FIX] Jumlah Anggota Sesuai Tab */}
// //                             <span>ANGGOTA ({activeMembersList.length})</span>
// //                         </div>
// //                         <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
// //                             {/* [FIX] Render list menggunakan activeMembersList yang sudah difilter */}
// //                             {activeMembersList.map((m: any, idx) => (
// //                                 <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-default" title={`Role: ${m!.roleLabel}`}>
// //                                     <div className="relative">
// //                                         {m!.avatarUrl ? (
// //                                             <img src={getImageUrl(m!.avatarUrl)} className="w-8 h-8 rounded-full object-cover border" alt={m!.name} />
// //                                         ) : (
// //                                             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${m!.roleLabel === 'Fasilitator' ? 'bg-red-500' : 'bg-slate-400'}`}>
// //                                                 {m!.name?.charAt(0) || '?'}
// //                                             </div>
// //                                         )}
// //                                     </div>
// //                                     <div className="flex-1 min-w-0">
// //                                         <p className="text-sm font-medium text-gray-900 truncate">{m!.name}</p>
// //                                         <p className={`text-[10px] uppercase font-bold tracking-wider ${m!.roleLabel === 'Fasilitator' ? 'text-red-600' : 'text-gray-400'}`}>
// //                                             {m!.roleLabel}
// //                                         </p>
// //                                     </div>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { api, getImageUrl, apiUpload } from '@/lib/api';
// import dynamic from 'next/dynamic';
// import { 
//     X, Send, MessageCircle, Paperclip, Minimize2, 
//     Maximize2, Users, Smile, FileText, Image as ImageIcon, Trash2
// } from 'lucide-react';

// const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

// interface CourseGroupChatProps {
//     courseId: string;
//     currentUser: any;
//     participants?: any[];
//     facilitators?: any[];
//     isFloating?: boolean;
//     onClose?: () => void;
// }

// export default function CourseGroupChat({ 
//     courseId, 
//     currentUser, 
//     participants = [], 
//     facilitators = [], 
//     isFloating = false, 
//     onClose 
// }: CourseGroupChatProps) {
//     const [isOpen, setIsOpen] = useState(!isFloating);
//     const [activeTab, setActiveTab] = useState<'public' | 'internal'>('public');
//     const [messages, setMessages] = useState<any[]>([]);
//     const [inputText, setInputText] = useState('');
//     const [isSending, setIsSending] = useState(false);
//     const messagesEndRef = useRef<HTMLDivElement>(null);
//     const [showMembers, setShowMembers] = useState(true);
    
//     const [showEmoji, setShowEmoji] = useState(false);
//     const [attachment, setAttachment] = useState<{ url: string, type: 'image' | 'file', name: string } | null>(null);
//     const [isUploading, setIsUploading] = useState(false);
//     const fileInputRef = useRef<HTMLInputElement>(null);
    
//     const [mentionQuery, setMentionQuery] = useState('');
//     const [showMentionPopup, setShowMentionPopup] = useState(false);
//     const [cursorPos, setCursorPos] = useState(0);

//     const isFacilitator = currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN' || facilitators.some((f: any) => f._id === currentUser?.id || f.id === currentUser?.id);

//     // --- 1. NORMALISASI DATA ANGGOTA ---
//     const normalizeMember = (data: any, role: string) => {
//         const userObj = data.user || data;
//         if (!userObj) return null;
//         return {
//             _id: userObj._id || userObj.id,
//             name: userObj.name || 'Tanpa Nama',
//             avatarUrl: userObj.avatarUrl,
//             roleLabel: role,
//             email: userObj.email
//         };
//     };

//     const allFacilitators = facilitators.map(f => normalizeMember(f, 'Fasilitator')).filter(Boolean);
//     const allParticipants = participants.map(p => normalizeMember(p, 'Peserta')).filter(Boolean);

//     // Gabungkan semua untuk referensi
//     const allMembersCombined = [...allFacilitators, ...allParticipants];
//     const uniqueAllMembers = Array.from(new Map(allMembersCombined.map(item => [item!._id, item])).values());

//     // FILTER ANGGOTA BERDASARKAN TAB AKTIF
//     const activeMembersList = activeTab === 'public' 
//         ? uniqueAllMembers 
//         : uniqueAllMembers.filter(m => m!.roleLabel === 'Fasilitator');

//     // --- 2. LOAD & POLLING ---
//     const loadMessages = async () => {
//         try {
//             if (!isOpen && isFloating) return;
//             const res = await api(`/api/courses/${courseId}/groups/messages?type=${activeTab}`);
//             setMessages(prev => {
//                 if (res && res.length !== prev.length) return res;
//                 if (res && res.length > 0 && prev.length > 0 && res[res.length-1]._id !== prev[prev.length-1]._id) return res;
//                 return prev;
//             });
//         } catch (e) { console.error("Gagal load chat", e); }
//     };

//     useEffect(() => {
//         if (isOpen) {
//             loadMessages();
//             const interval = setInterval(loadMessages, 3000);
//             return () => clearInterval(interval);
//         }
//     }, [courseId, activeTab, isOpen]);

//     useEffect(() => {
//         if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages, isOpen, activeTab]);

//     // --- 3. HANDLERS ---
//     const onEmojiClick = (emojiData: any) => {
//         const text = inputText;
//         const newText = text.slice(0, cursorPos) + emojiData.emoji + text.slice(cursorPos);
//         setInputText(newText);
//         setShowEmoji(false);
//     };

//     const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         setIsUploading(true);
//         try {
//             const fd = new FormData();
//             fd.append('file', file);
//             const res = await apiUpload('/api/upload', fd);
//             const url = res.url || res.file?.url || res.imageUrl;
            
//             const isImg = file.type.startsWith('image/');
//             setAttachment({
//                 url,
//                 type: isImg ? 'image' : 'file',
//                 name: file.name
//             });
//         } catch (err: any) {
//             alert("Gagal upload: " + err.message);
//         } finally {
//             setIsUploading(false);
//             if (fileInputRef.current) fileInputRef.current.value = ''; 
//         }
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const val = e.target.value;
//         const selStart = e.target.selectionStart || 0;
//         setInputText(val);
//         setCursorPos(selStart);

//         const lastAt = val.lastIndexOf('@', selStart);
//         if (lastAt !== -1) {
//             const query = val.substring(lastAt + 1, selStart);
//             if (!query.includes(' ')) { 
//                 setMentionQuery(query);
//                 setShowMentionPopup(true);
//                 return;
//             }
//         }
//         setShowMentionPopup(false);
//     };

//     const insertMention = (name: string) => {
//         const lastAt = inputText.lastIndexOf('@', cursorPos);
//         const newText = inputText.substring(0, lastAt) + `@${name} ` + inputText.substring(cursorPos);
//         setInputText(newText);
//         setShowMentionPopup(false);
//     };

//     const handleSend = async (e?: React.FormEvent) => {
//         e?.preventDefault();
//         if ((!inputText.trim() && !attachment) || isSending || isUploading) return;

//         setIsSending(true);
//         try {
//             await api(`/api/courses/${courseId}/groups/send`, {
//                 method: 'POST',
//                 body: { 
//                     text: inputText, 
//                     type: activeTab,
//                     attachment: attachment 
//                 }
//             });
//             setInputText('');
//             setAttachment(null);
//             loadMessages();
//         } catch (error: any) {
//             alert("Gagal kirim pesan: " + error.message);
//         } finally {
//             setIsSending(false);
//         }
//     };

//     // [FIX] PERUBAHAN POSISI TOMBOL FLOATING
//     // Mengubah 'bottom-6 right-24' menjadi 'bottom-36 right-6' agar lebih tinggi dan tidak menutupi tombol lain
//     if (isFloating && !isOpen) {
//         return (
//             <button 
//                 onClick={() => setIsOpen(true)}
//                 className="fixed bottom-36 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-xl transition-transform hover:scale-105 flex items-center gap-2 animate-in slide-in-from-bottom-4"
//                 title="Buka Ruang Diskusi"
//                 aria-label="Buka Ruang Diskusi"
//             >
//                 <MessageCircle size={24} />
//                 <span className="font-bold text-sm hidden md:inline">Ruang Diskusi</span>
//             </button>
//         );
//     }

//     const modalAttributes = !isFloating ? {
//         role: "dialog",
//         "aria-modal": true,
//         "aria-label": "Ruang Diskusi"
//     } : {
//         "aria-label": "Panel Diskusi"
//     };

//     const containerClasses = isFloating 
//         ? "fixed bottom-24 right-6 w-[90vw] md:w-[900px] h-[500px] md:h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex overflow-hidden border border-gray-200 animate-in zoom-in-95 origin-bottom-right"
//         : "fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4";

//     const innerClasses = isFloating
//         ? "w-full h-full flex flex-col md:flex-row"
//         : "bg-white w-full max-w-6xl h-[85vh] rounded-2xl shadow-2xl flex overflow-hidden animate-in zoom-in-95";

//     return (
//         <div 
//             className={containerClasses} 
//             {...modalAttributes}
//             onClick={() => !isFloating && onClose && onClose()}
//         >
//             <div className={innerClasses} onClick={(e) => e.stopPropagation()}>
                
//                 {/* --- LEFT: CHAT AREA --- */}
//                 <div className="flex-1 flex flex-col min-w-0 relative">
//                     {/* HEADER */}
//                     <div className="h-16 bg-red-900 text-white px-4 flex items-center justify-between shrink-0">
//                         <div className="flex items-center gap-3">
//                             <MessageCircle size={20} />
//                             <h3 className="font-bold text-lg">Ruang Diskusi</h3>
//                             {isFacilitator && (
//                                 <div className="ml-4 flex bg-red-950/30 rounded-lg p-1">
//                                     <button 
//                                         onClick={() => setActiveTab('public')} 
//                                         className={`px-3 py-1 rounded text-xs font-bold transition-all ${activeTab === 'public' ? 'bg-white text-red-900 shadow' : 'text-red-100 hover:bg-red-800'}`}
//                                     >
//                                         Kelas (Publik)
//                                     </button>
//                                     <button 
//                                         onClick={() => setActiveTab('internal')} 
//                                         className={`px-3 py-1 rounded text-xs font-bold transition-all ${activeTab === 'internal' ? 'bg-white text-red-900 shadow' : 'text-red-100 hover:bg-red-800'}`}
//                                     >
//                                         Fasilitator
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <button onClick={() => setShowMembers(!showMembers)} className="p-2 hover:bg-white/10 rounded-full md:hidden" title="Anggota" aria-label="Anggota"><Users size={20}/></button>
//                             {isFloating ? (
//                                 <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full" title="Minimize" aria-label="Minimize"><Minimize2 size={20}/></button>
//                             ) : (
//                                 <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full" title="Tutup" aria-label="Tutup"><X size={24}/></button>
//                             )}
//                         </div>
//                     </div>

//                     {/* MESSAGES LIST */}
//                     <div className="flex-1 bg-slate-100 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3" onClick={() => { setShowEmoji(false); setShowMentionPopup(false); }}>
//                         {messages.length === 0 ? (
//                             <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2"><MessageCircle size={40} className="opacity-20"/><p className="text-sm">Belum ada percakapan.</p></div>
//                         ) : (
//                             messages.map((msg, idx) => {
//                                 const isMe = msg.sender?._id === currentUser?.id || msg.sender === currentUser?.id;
//                                 const isMsgFacil = msg.sender?.role === 'ADMIN' || msg.sender?.role === 'SUPER_ADMIN' || facilitators.some(f => f._id === msg.sender?._id);
//                                 return (
//                                     <div key={idx} className={`flex gap-3 max-w-[85%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'}`}>
//                                         <div className="shrink-0 flex flex-col items-center gap-1">
//                                             {msg.sender?.avatarUrl ? <img src={getImageUrl(msg.sender.avatarUrl)} className="w-8 h-8 rounded-full object-cover border border-gray-300" alt="Avt" /> : <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${isMsgFacil ? 'bg-red-600' : 'bg-indigo-500'}`}>{msg.sender?.name?.charAt(0) || '?'}</div>}
//                                         </div>
//                                         <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
//                                             <div className="flex items-center gap-2 mb-1">
//                                                 <span className="text-[10px] font-bold text-gray-600">{msg.sender?.name || 'Unknown'}</span>
//                                                 <span className="text-[9px] text-gray-400">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
//                                             </div>
//                                             <div className={`px-4 py-2 rounded-2xl text-sm shadow-sm break-words relative group ${isMe ? 'bg-red-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>
//                                                 {msg.attachment && (
//                                                     <div className="mb-2">
//                                                         {msg.attachment.type === 'image' ? (
//                                                             <img src={getImageUrl(msg.attachment.url)} alt="Att" className="max-w-[200px] rounded-lg border border-white/20" />
//                                                         ) : (
//                                                             <a href={getImageUrl(msg.attachment.url)} target="_blank" className={`flex items-center gap-2 p-2 rounded ${isMe ? 'bg-red-700' : 'bg-gray-100'} hover:opacity-80`}>
//                                                                 <FileText size={16}/> <span className="truncate max-w-[150px] underline">{msg.attachment.name || 'Dokumen'}</span>
//                                                             </a>
//                                                         )}
//                                                     </div>
//                                                 )}
//                                                 {msg.message}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })
//                         )}
//                         <div ref={messagesEndRef} />
//                     </div>

//                     {/* MENTION POPUP */}
//                     {showMentionPopup && (
//                         <div className="absolute bottom-20 left-4 bg-white border border-gray-200 shadow-xl rounded-lg w-64 max-h-48 overflow-y-auto z-50">
//                             {activeMembersList.filter(m => m!.name.toLowerCase().includes(mentionQuery.toLowerCase())).map(m => (
//                                 <button key={m!._id} onClick={() => insertMention(m!.name)} className="w-full text-left px-3 py-2 hover:bg-indigo-50 text-sm flex items-center gap-2 border-b last:border-0">
//                                     <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${m!.roleLabel === 'Fasilitator' ? 'bg-red-500' : 'bg-gray-400'}`}>{m!.name.charAt(0)}</div>
//                                     <span className="truncate font-medium text-gray-700">{m!.name}</span>
//                                 </button>
//                             ))}
//                         </div>
//                     )}

//                     {/* EMOJI PICKER */}
//                     {showEmoji && (
//                         <div className="absolute bottom-20 left-4 z-50">
//                             <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={350} />
//                         </div>
//                     )}

//                     {/* ATTACHMENT PREVIEW */}
//                     {attachment && (
//                         <div className="px-4 pt-2 bg-white border-t flex items-center gap-3">
//                             <div className="relative bg-gray-50 border rounded-lg p-2 flex items-center gap-2 pr-8">
//                                 {attachment.type === 'image' ? <ImageIcon size={20} className="text-purple-600"/> : <FileText size={20} className="text-blue-600"/>}
//                                 <span className="text-xs max-w-[200px] truncate font-medium text-gray-700">{attachment.name}</span>
//                                 <button onClick={() => setAttachment(null)} className="absolute top-1 right-1 hover:bg-gray-200 rounded-full p-0.5 text-gray-500" title="Hapus"><X size={14}/></button>
//                             </div>
//                         </div>
//                     )}

//                     {/* INPUT AREA */}
//                     <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2 items-end shrink-0">
//                         <div className="flex gap-1 pb-2">
//                             <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-2 text-gray-400 hover:text-yellow-500 transition-colors" title="Emoji" aria-label="Buka Emoji"><Smile size={20}/></button>
//                             <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-blue-500 transition-colors" title="Lampirkan File" aria-label="Lampirkan File"><Paperclip size={20}/></button>
//                             <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} title="Upload File" aria-label="Upload File"/>
//                         </div>
                        
//                         <div className="flex-1 relative">
//                             <input 
//                                 className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition-all" 
//                                 placeholder={isUploading ? "Mengupload..." : `Ketik pesan... (@ untuk mention)`}
//                                 value={inputText}
//                                 onChange={handleInputChange}
//                                 disabled={isUploading}
//                                 autoFocus={!isFloating}
//                                 title="Input Pesan"
//                                 aria-label="Input Pesan"
//                                 onKeyDown={(e) => {
//                                     if (e.key === 'Enter' && !e.shiftKey) {
//                                         e.preventDefault();
//                                         handleSend();
//                                     }
//                                 }}
//                             />
//                         </div>
                        
//                         <button 
//                             type="submit" 
//                             disabled={(!inputText.trim() && !attachment) || isSending || isUploading}
//                             className="bg-red-700 text-white hover:bg-red-800 p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-0.5"
//                             title="Kirim Pesan"
//                             aria-label="Kirim Pesan"
//                         >
//                             <Send size={18} className={isSending ? 'animate-pulse' : ''} />
//                         </button>
//                     </form>
//                 </div>

//                 {/* --- RIGHT: MEMBER LIST --- */}
//                 {showMembers && (
//                     <div className="w-64 bg-white border-l border-gray-200 flex flex-col shrink-0 md:flex hidden md:flex">
//                         <div className="p-4 border-b bg-gray-50 font-bold text-gray-700 text-sm flex justify-between items-center">
//                             <span>ANGGOTA ({activeMembersList.length})</span>
//                         </div>
//                         <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
//                             {activeMembersList.map((m: any, idx) => (
//                                 <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-default" title={`Role: ${m!.roleLabel}`}>
//                                     <div className="relative">
//                                         {m!.avatarUrl ? (
//                                             <img src={getImageUrl(m!.avatarUrl)} className="w-8 h-8 rounded-full object-cover border" alt={m!.name} />
//                                         ) : (
//                                             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${m!.roleLabel === 'Fasilitator' ? 'bg-red-500' : 'bg-slate-400'}`}>
//                                                 {m!.name?.charAt(0) || '?'}
//                                             </div>
//                                         )}
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                         <p className="text-sm font-medium text-gray-900 truncate">{m!.name}</p>
//                                         <p className={`text-[10px] uppercase font-bold tracking-wider ${m!.roleLabel === 'Fasilitator' ? 'text-red-600' : 'text-gray-400'}`}>
//                                             {m!.roleLabel}
//                                         </p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
'use client';

import { useState, useEffect, useRef } from 'react';
import { api, getImageUrl, apiUpload } from '@/lib/api';
import dynamic from 'next/dynamic';
import { 
    X, Send, MessageCircle, Paperclip, Minimize2, 
    Maximize2, Users, Smile, FileText, Image as ImageIcon, Trash2
} from 'lucide-react';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface CourseGroupChatProps {
    courseId: string;
    currentUser: any;
    participants?: any[];
    facilitators?: any[];
    isFloating?: boolean;
    onClose?: () => void;
}

export default function CourseGroupChat({ 
    courseId, 
    currentUser, 
    participants = [], 
    facilitators = [], 
    isFloating = false, 
    onClose 
}: CourseGroupChatProps) {
    const [isOpen, setIsOpen] = useState(!isFloating);
    const [activeTab, setActiveTab] = useState<'public' | 'internal'>('public');
    const [messages, setMessages] = useState<any[]>([]);
    const [inputText, setInputText] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [showMembers, setShowMembers] = useState(true);
    
    // --- FITUR NOTIFIKASI BADGE ---
    const [unreadCount, setUnreadCount] = useState(0);
    // Ref untuk menyimpan waktu terakhir chat dilihat/dibuka
    const lastReadTimeRef = useRef<number>(Date.now()); 

    const [showEmoji, setShowEmoji] = useState(false);
    const [attachment, setAttachment] = useState<{ url: string, type: 'image' | 'file', name: string } | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [mentionQuery, setMentionQuery] = useState('');
    const [showMentionPopup, setShowMentionPopup] = useState(false);
    const [cursorPos, setCursorPos] = useState(0);

    const isFacilitator = currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN' || facilitators.some((f: any) => f._id === currentUser?.id || f.id === currentUser?.id);

    // --- 1. NORMALISASI DATA ANGGOTA ---
    const normalizeMember = (data: any, role: string) => {
        const userObj = data.user || data;
        if (!userObj) return null;
        return {
            _id: userObj._id || userObj.id,
            name: userObj.name || 'Tanpa Nama',
            avatarUrl: userObj.avatarUrl,
            roleLabel: role,
            email: userObj.email
        };
    };

    const allFacilitators = facilitators.map(f => normalizeMember(f, 'Fasilitator')).filter(Boolean);
    const allParticipants = participants.map(p => normalizeMember(p, 'Peserta')).filter(Boolean);

    const allMembersCombined = [...allFacilitators, ...allParticipants];
    const uniqueAllMembers = Array.from(new Map(allMembersCombined.map(item => [item!._id, item])).values());

    const activeMembersList = activeTab === 'public' 
        ? uniqueAllMembers 
        : uniqueAllMembers.filter(m => m!.roleLabel === 'Fasilitator');

    // --- 2. LOAD & POLLING (MODIFIED FOR NOTIFICATION) ---
    const loadMessages = async () => {
        try {
            // [MODIFIED] Kita HAPUS baris "if (!isOpen && isFloating) return;" 
            // agar polling tetap jalan di background untuk cek notifikasi pesan masuk.
            
            const res = await api(`/api/courses/${courseId}/groups/messages?type=${activeTab}`);
            
            setMessages(prev => {
                // Optimasi: Hanya update state jika panjang array berbeda atau ID pesan terakhir beda
                if (res && res.length !== prev.length) return res;
                if (res && res.length > 0 && prev.length > 0 && res[res.length-1]._id !== prev[prev.length-1]._id) return res;
                return prev;
            });
        } catch (e) { console.error("Gagal load chat", e); }
    };

    useEffect(() => {
        // Polling jalan terus baik saat open maupun closed (untuk notifikasi)
        loadMessages();
        const interval = setInterval(loadMessages, 3000);
        return () => clearInterval(interval);
    }, [courseId, activeTab]); // Hapus isOpen dari dependency agar polling stabil

    // --- 3. LOGIKA NOTIFIKASI BADGE ---
    useEffect(() => {
        if (isOpen) {
            // Jika chat terbuka, reset badge dan update waktu terakhir baca
            setUnreadCount(0);
            if (messages.length > 0) {
                const lastMsgDate = new Date(messages[messages.length - 1].createdAt).getTime();
                // Set lastRead ke waktu pesan terakhir + 1 detik agar tidak dianggap unread
                lastReadTimeRef.current = Math.max(lastReadTimeRef.current, lastMsgDate);
            }
            // Auto scroll
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Jika chat tertutup, hitung pesan yang masuk SETELAH lastReadTime
            if (messages.length > 0) {
                const newMsgs = messages.filter(m => {
                    const msgTime = new Date(m.createdAt).getTime();
                    const senderId = m.sender._id || m.sender.id || m.sender;
                    const myId = currentUser.id || currentUser._id;
                    const isNotMe = senderId !== myId; // Jangan notif pesan sendiri
                    
                    return msgTime > lastReadTimeRef.current && isNotMe;
                });
                setUnreadCount(newMsgs.length);
            }
        }
    }, [messages, isOpen, currentUser]);


    // --- 4. HANDLERS ---
    const onEmojiClick = (emojiData: any) => {
        const text = inputText;
        const newText = text.slice(0, cursorPos) + emojiData.emoji + text.slice(cursorPos);
        setInputText(newText);
        setShowEmoji(false);
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            const res = await apiUpload('/api/upload', fd);
            const url = res.url || res.file?.url || res.imageUrl;
            
            const isImg = file.type.startsWith('image/');
            setAttachment({
                url,
                type: isImg ? 'image' : 'file',
                name: file.name
            });
        } catch (err: any) {
            alert("Gagal upload: " + err.message);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = ''; 
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const selStart = e.target.selectionStart || 0;
        setInputText(val);
        setCursorPos(selStart);

        const lastAt = val.lastIndexOf('@', selStart);
        if (lastAt !== -1) {
            const query = val.substring(lastAt + 1, selStart);
            if (!query.includes(' ')) { 
                setMentionQuery(query);
                setShowMentionPopup(true);
                return;
            }
        }
        setShowMentionPopup(false);
    };

    const insertMention = (name: string) => {
        const lastAt = inputText.lastIndexOf('@', cursorPos);
        const newText = inputText.substring(0, lastAt) + `@${name} ` + inputText.substring(cursorPos);
        setInputText(newText);
        setShowMentionPopup(false);
    };

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if ((!inputText.trim() && !attachment) || isSending || isUploading) return;

        setIsSending(true);
        try {
            await api(`/api/courses/${courseId}/groups/send`, {
                method: 'POST',
                body: { 
                    text: inputText, 
                    type: activeTab,
                    attachment: attachment 
                }
            });
            setInputText('');
            setAttachment(null);
            loadMessages();
            // Update last read time agar pesan sendiri tidak jadi notifikasi sesaat
            lastReadTimeRef.current = Date.now();
        } catch (error: any) {
            alert("Gagal kirim pesan: " + error.message);
        } finally {
            setIsSending(false);
        }
    };

    // --- RENDER FLOATING BUTTON WITH BADGE ---
    if (isFloating && !isOpen) {
        return (
            <div className="fixed bottom-36 right-6 z-50">
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-xl transition-transform hover:scale-105 flex items-center gap-2 animate-in slide-in-from-bottom-4 relative"
                    title="Buka Ruang Diskusi"
                    aria-label="Buka Ruang Diskusi"
                >
                    <MessageCircle size={24} />
                    <span className="font-bold text-sm hidden md:inline">Ruang Diskusi</span>
                    
                    {/* [NEW] NOTIFIKASI BADGE */}
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm animate-bounce">
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                    )}
                </button>
            </div>
        );
    }

    const modalAttributes = !isFloating ? {
        role: "dialog",
        "aria-modal": true,
        "aria-label": "Ruang Diskusi"
    } : {
        "aria-label": "Panel Diskusi"
    };

    const containerClasses = isFloating 
        ? "fixed bottom-24 right-6 w-[90vw] md:w-[900px] h-[500px] md:h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex overflow-hidden border border-gray-200 animate-in zoom-in-95 origin-bottom-right"
        : "fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4";

    const innerClasses = isFloating
        ? "w-full h-full flex flex-col md:flex-row"
        : "bg-white w-full max-w-6xl h-[85vh] rounded-2xl shadow-2xl flex overflow-hidden animate-in zoom-in-95";

    return (
        <div 
            className={containerClasses} 
            {...modalAttributes}
            onClick={() => !isFloating && onClose && onClose()}
        >
            <div className={innerClasses} onClick={(e) => e.stopPropagation()}>
                
                {/* --- LEFT: CHAT AREA --- */}
                <div className="flex-1 flex flex-col min-w-0 relative">
                    {/* HEADER */}
                    <div className="h-16 bg-red-900 text-white px-4 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <MessageCircle size={20} />
                            <h3 className="font-bold text-lg">Ruang Diskusi</h3>
                            {isFacilitator && (
                                <div className="ml-4 flex bg-red-950/30 rounded-lg p-1">
                                    <button 
                                        onClick={() => setActiveTab('public')} 
                                        className={`px-3 py-1 rounded text-xs font-bold transition-all ${activeTab === 'public' ? 'bg-white text-red-900 shadow' : 'text-red-100 hover:bg-red-800'}`}
                                    >
                                        Kelas (Publik)
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab('internal')} 
                                        className={`px-3 py-1 rounded text-xs font-bold transition-all ${activeTab === 'internal' ? 'bg-white text-red-900 shadow' : 'text-red-100 hover:bg-red-800'}`}
                                    >
                                        Fasilitator
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setShowMembers(!showMembers)} className="p-2 hover:bg-white/10 rounded-full md:hidden" title="Anggota" aria-label="Anggota"><Users size={20}/></button>
                            {isFloating ? (
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full" title="Minimize" aria-label="Minimize"><Minimize2 size={20}/></button>
                            ) : (
                                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full" title="Tutup" aria-label="Tutup"><X size={24}/></button>
                            )}
                        </div>
                    </div>

                    {/* MESSAGES LIST */}
                    <div className="flex-1 bg-slate-100 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3" onClick={() => { setShowEmoji(false); setShowMentionPopup(false); }}>
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2"><MessageCircle size={40} className="opacity-20"/><p className="text-sm">Belum ada percakapan.</p></div>
                        ) : (
                            messages.map((msg, idx) => {
                                const isMe = msg.sender?._id === currentUser?.id || msg.sender === currentUser?.id;
                                const isMsgFacil = msg.sender?.role === 'ADMIN' || msg.sender?.role === 'SUPER_ADMIN' || facilitators.some(f => f._id === msg.sender?._id);
                                return (
                                    <div key={idx} className={`flex gap-3 max-w-[85%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'}`}>
                                        <div className="shrink-0 flex flex-col items-center gap-1">
                                            {msg.sender?.avatarUrl ? <img src={getImageUrl(msg.sender.avatarUrl)} className="w-8 h-8 rounded-full object-cover border border-gray-300" alt="Avt" /> : <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${isMsgFacil ? 'bg-red-600' : 'bg-indigo-500'}`}>{msg.sender?.name?.charAt(0) || '?'}</div>}
                                        </div>
                                        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold text-gray-600">{msg.sender?.name || 'Unknown'}</span>
                                                <span className="text-[9px] text-gray-400">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                            </div>
                                            <div className={`px-4 py-2 rounded-2xl text-sm shadow-sm break-words relative group ${isMe ? 'bg-red-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>
                                                {msg.attachment && (
                                                    <div className="mb-2">
                                                        {msg.attachment.type === 'image' ? (
                                                            <img src={getImageUrl(msg.attachment.url)} alt="Att" className="max-w-[200px] rounded-lg border border-white/20" />
                                                        ) : (
                                                            <a href={getImageUrl(msg.attachment.url)} target="_blank" className={`flex items-center gap-2 p-2 rounded ${isMe ? 'bg-red-700' : 'bg-gray-100'} hover:opacity-80`}>
                                                                <FileText size={16}/> <span className="truncate max-w-[150px] underline">{msg.attachment.name || 'Dokumen'}</span>
                                                            </a>
                                                        )}
                                                    </div>
                                                )}
                                                {msg.message}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* MENTION POPUP */}
                    {showMentionPopup && (
                        <div className="absolute bottom-20 left-4 bg-white border border-gray-200 shadow-xl rounded-lg w-64 max-h-48 overflow-y-auto z-50">
                            {activeMembersList.filter(m => m!.name.toLowerCase().includes(mentionQuery.toLowerCase())).map(m => (
                                <button key={m!._id} onClick={() => insertMention(m!.name)} className="w-full text-left px-3 py-2 hover:bg-indigo-50 text-sm flex items-center gap-2 border-b last:border-0">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${m!.roleLabel === 'Fasilitator' ? 'bg-red-500' : 'bg-gray-400'}`}>{m!.name.charAt(0)}</div>
                                    <span className="truncate font-medium text-gray-700">{m!.name}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* EMOJI PICKER */}
                    {showEmoji && (
                        <div className="absolute bottom-20 left-4 z-50">
                            <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={350} />
                        </div>
                    )}

                    {/* ATTACHMENT PREVIEW */}
                    {attachment && (
                        <div className="px-4 pt-2 bg-white border-t flex items-center gap-3">
                            <div className="relative bg-gray-50 border rounded-lg p-2 flex items-center gap-2 pr-8">
                                {attachment.type === 'image' ? <ImageIcon size={20} className="text-purple-600"/> : <FileText size={20} className="text-blue-600"/>}
                                <span className="text-xs max-w-[200px] truncate font-medium text-gray-700">{attachment.name}</span>
                                <button onClick={() => setAttachment(null)} className="absolute top-1 right-1 hover:bg-gray-200 rounded-full p-0.5 text-gray-500" title="Hapus"><X size={14}/></button>
                            </div>
                        </div>
                    )}

                    {/* INPUT AREA */}
                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2 items-end shrink-0">
                        <div className="flex gap-1 pb-2">
                            <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-2 text-gray-400 hover:text-yellow-500 transition-colors" title="Emoji" aria-label="Buka Emoji"><Smile size={20}/></button>
                            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-blue-500 transition-colors" title="Lampirkan File" aria-label="Lampirkan File"><Paperclip size={20}/></button>
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} title="Upload File" aria-label="Upload File"/>
                        </div>
                        
                        <div className="flex-1 relative">
                            <input 
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition-all" 
                                placeholder={isUploading ? "Mengupload..." : `Ketik pesan... (@ untuk mention)`}
                                value={inputText}
                                onChange={handleInputChange}
                                disabled={isUploading}
                                autoFocus={!isFloating}
                                title="Input Pesan"
                                aria-label="Input Pesan"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={(!inputText.trim() && !attachment) || isSending || isUploading}
                            className="bg-red-700 text-white hover:bg-red-800 p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-0.5"
                            title="Kirim Pesan"
                            aria-label="Kirim Pesan"
                        >
                            <Send size={18} className={isSending ? 'animate-pulse' : ''} />
                        </button>
                    </form>
                </div>

                {/* --- RIGHT: MEMBER LIST --- */}
                {showMembers && (
                    <div className="w-64 bg-white border-l border-gray-200 flex flex-col shrink-0 md:flex hidden md:flex">
                        <div className="p-4 border-b bg-gray-50 font-bold text-gray-700 text-sm flex justify-between items-center">
                            <span>ANGGOTA ({activeMembersList.length})</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                            {activeMembersList.map((m: any, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-default" title={`Role: ${m!.roleLabel}`}>
                                    <div className="relative">
                                        {m!.avatarUrl ? (
                                            <img src={getImageUrl(m!.avatarUrl)} className="w-8 h-8 rounded-full object-cover border" alt={m!.name} />
                                        ) : (
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${m!.roleLabel === 'Fasilitator' ? 'bg-red-500' : 'bg-slate-400'}`}>
                                                {m!.name?.charAt(0) || '?'}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{m!.name}</p>
                                        <p className={`text-[10px] uppercase font-bold tracking-wider ${m!.roleLabel === 'Fasilitator' ? 'text-red-600' : 'text-gray-400'}`}>
                                            {m!.roleLabel}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
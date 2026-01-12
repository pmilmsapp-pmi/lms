// // // // 'use client';

// // // // import { useState, useEffect, useRef } from 'react';
// // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // import dynamic from 'next/dynamic';
// // // // import {
// // // //   MessageSquare, Send, X, Smile, Paperclip, 
// // // //   Image as ImageIcon, FileText, Users, ChevronRight, Briefcase
// // // // } from 'lucide-react';

// // // // const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

// // // // interface Props {
// // // //   courseId: string;
// // // //   currentUser: any;
// // // //   onClose?: () => void;
// // // //   isFloating?: boolean; 
// // // //   participants?: any[]; 
// // // //   facilitators?: any[]; 
// // // // }

// // // // export default function CourseGroupChat({ courseId, currentUser, onClose, isFloating = false, participants = [], facilitators = [] }: Props) {
// // // //   const [activeTab, setActiveTab] = useState<'internal' | 'public'>('public');
// // // //   const [messages, setMessages] = useState<any[]>([]);
// // // //   const [newMessage, setNewMessage] = useState('');
// // // //   const [showEmoji, setShowEmoji] = useState(false);
// // // //   const [attachment, setAttachment] = useState<any>(null);
// // // //   const [isUploading, setIsUploading] = useState(false);
// // // //   const [isOpen, setIsOpen] = useState(!isFloating); 
// // // //   const [showSidebar, setShowSidebar] = useState(true); 

// // // //   // Mention State
// // // //   const [mentionQuery, setMentionQuery] = useState('');
// // // //   const [showMentionPopup, setShowMentionPopup] = useState(false);
// // // //   const [filteredMembers, setFilteredMembers] = useState<any[]>([]);

// // // //   const messagesEndRef = useRef<HTMLDivElement>(null);
// // // //   const fileInputRef = useRef<HTMLInputElement>(null);
// // // //   const inputRef = useRef<HTMLInputElement>(null);

// // // //   // GABUNGKAN MEMBER UNTUK SIDEBAR & MENTION
// // // //   const getActiveMembers = () => {
// // // //     const facs = facilitators.map((f: any) => ({
// // // //       _id: f._id || f.id,
// // // //       name: f.name,
// // // //       avatarUrl: f.avatarUrl,
// // // //       role: 'Fasilitator'
// // // //     }));

// // // //     const students = activeTab === 'public' ? participants.map((p: any) => {
// // // //         const user = p.user || p; 
// // // //         return {
// // // //             _id: user._id || user.id,
// // // //             name: user.name,
// // // //             avatarUrl: user.avatarUrl,
// // // //             role: 'Peserta'
// // // //         };
// // // //     }).filter((u: any) => u._id) : [];

// // // //     const all = [...facs, ...students];
// // // //     const uniqueMap = new Map();
// // // //     all.forEach(item => uniqueMap.set(item._id, item));
// // // //     return Array.from(uniqueMap.values()).sort((a: any, b: any) => a.name.localeCompare(b.name));
// // // //   };

// // // //   const activeMembers = getActiveMembers();

// // // //   useEffect(() => {
// // // //     if (isOpen) {
// // // //         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // //     }
// // // //   }, [messages, isOpen]);

// // // //   useEffect(() => {
// // // //     if (!isOpen) return;
// // // //     loadMessages();
// // // //     const interval = setInterval(loadMessages, 3000);
// // // //     return () => clearInterval(interval);
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [courseId, activeTab, isOpen]);

// // // //   const loadMessages = async () => {
// // // //     try {
// // // //       const res = await api(`/api/courses/${courseId}/chat-group?type=${activeTab}`);
// // // //       setMessages(res || []);
// // // //     } catch (e) { console.error(e); }
// // // //   };

// // // //   const handleSend = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     if ((!newMessage.trim() && !attachment) || isUploading) return;

// // // //     const tempMsg = {
// // // //       _id: Date.now(),
// // // //       sender: { name: currentUser.name, role: 'me', avatarUrl: currentUser.avatarUrl, _id: currentUser.id },
// // // //       message: newMessage,
// // // //       attachment,
// // // //       createdAt: new Date().toISOString()
// // // //     };
// // // //     setMessages(prev => [...prev, tempMsg]);

// // // //     const payload = { text: newMessage, type: activeTab, attachment };
// // // //     setNewMessage(''); setAttachment(null); setShowEmoji(false); setShowMentionPopup(false);

// // // //     try {
// // // //       await api(`/api/courses/${courseId}/chat-group`, { method: 'POST', body: payload });
// // // //       loadMessages(); 
// // // //     } catch (e: any) { alert('Gagal: ' + e.message); }
// // // //   };

// // // //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const file = e.target.files?.[0];
// // // //     if (!file) return;
// // // //     setIsUploading(true);
// // // //     try {
// // // //         const fd = new FormData(); fd.append('file', file);
// // // //         const res = await apiUpload('/api/upload', fd);
// // // //         setAttachment({ url: res.url || res.file.url, type: file.type.startsWith('image') ? 'image' : 'file', name: file.name });
// // // //     } catch (e) { alert('Gagal upload'); } finally { setIsUploading(false); }
// // // //   };

// // // //   // --- MENTION LOGIC ---
// // // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const val = e.target.value;
// // // //     setNewMessage(val);

// // // //     const lastWord = val.split(' ').pop();
// // // //     if (lastWord && lastWord.startsWith('@') && lastWord.length > 1) {
// // // //         const query = lastWord.substring(1).toLowerCase();
// // // //         setMentionQuery(query);
// // // //         const matches = activeMembers.filter((u: any) => u.name && u.name.toLowerCase().includes(query));
// // // //         setFilteredMembers(matches);
// // // //         setShowMentionPopup(matches.length > 0);
// // // //     } else {
// // // //         setShowMentionPopup(false);
// // // //     }
// // // //   };

// // // //   const insertMention = (name: string) => {
// // // //     const words = newMessage.split(' ');
// // // //     words.pop(); 
// // // //     const newText = words.join(' ') + ` @${name} `;
// // // //     setNewMessage(newText);
// // // //     setShowMentionPopup(false);
// // // //     inputRef.current?.focus();
// // // //   };

// // // //   const renderMessageText = (text: string) => {
// // // //     const parts = text.split(/(@[\w\s]+)/g);
// // // //     return parts.map((part, i) => 
// // // //         part.startsWith('@') 
// // // //         ? <span key={i} className="text-blue-600 font-bold bg-blue-50 px-1 rounded">{part}</span> 
// // // //         : part
// // // //     );
// // // //   };

// // // //   const renderMessageBubble = (msg: any) => {
// // // //     const isMe = msg.sender?.role === 'me' || msg.sender?._id === currentUser.id;
// // // //     return (
// // // //         <div key={msg._id} className={`flex w-full mb-4 ${isMe ? 'justify-end' : 'justify-start'}`}>
// // // //             <div className={`flex max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
// // // //                 <div className="flex-shrink-0">
// // // //                     <img 
// // // //                         src={getImageUrl(msg.sender?.avatarUrl)} 
// // // //                         className="w-8 h-8 rounded-full object-cover border border-gray-200 mt-1" 
// // // //                         onError={(e:any) => e.target.src = `https://ui-avatars.com/api/?name=${msg.sender?.name}&background=random`}
// // // //                         alt={msg.sender?.name}
// // // //                     />
// // // //                 </div>
                
// // // //                 <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// // // //                     <div className="flex items-center gap-2 mb-1">
// // // //                         <span className="text-[10px] font-bold text-gray-600">{msg.sender?.name}</span>
// // // //                         <span className="text-[9px] text-gray-400">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
// // // //                     </div>
                    
// // // //                     <div className={`px-3 py-2 text-sm rounded-2xl shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>
// // // //                         {msg.attachment && (
// // // //                             <div className="mb-2 p-1 bg-black/10 rounded">
// // // //                                 {msg.attachment.type === 'image' ? (
// // // //                                     <a href={getImageUrl(msg.attachment.url)} target="_blank" title="Lihat Gambar" aria-label="Lihat Gambar">
// // // //                                         <img src={getImageUrl(msg.attachment.url)} className="max-h-32 rounded object-cover" alt="img"/>
// // // //                                     </a>
// // // //                                 ) : (
// // // //                                     <a href={getImageUrl(msg.attachment.url)} target="_blank" className="flex items-center gap-1 text-xs underline" title="Download File" aria-label="Download File">
// // // //                                         <FileText size={12}/> {msg.attachment.name}
// // // //                                     </a>
// // // //                                 )}
// // // //                             </div>
// // // //                         )}
// // // //                         {msg.message && <p className="whitespace-pre-wrap">{renderMessageText(msg.message)}</p>}
// // // //                     </div>
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // //   };

// // // //   // --- RENDER INPUT AREA (Reusable) ---
// // // //   const InputArea = () => (
// // // //     <div className="p-2 border-t bg-white relative">
// // // //         {showEmoji && <div className="absolute bottom-16 left-0 z-50"><EmojiPicker onEmojiClick={(e)=>setNewMessage(prev=>prev+e.emoji)} height={300} width={300}/></div>}
        
// // // //         {showMentionPopup && (
// // // //             <div className="absolute bottom-16 left-4 bg-white border border-gray-200 shadow-xl rounded-lg w-64 max-h-48 overflow-y-auto z-50">
// // // //                 {filteredMembers.map((u: any) => (
// // // //                     <button key={u._id} type="button" onClick={() => insertMention(u.name)} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-xs" title={`Mention ${u.name}`}>
// // // //                         <img src={getImageUrl(u.avatarUrl)} className="w-5 h-5 rounded-full" alt="" />
// // // //                         <span className="truncate font-bold">{u.name}</span>
// // // //                     </button>
// // // //                 ))}
// // // //             </div>
// // // //         )}

// // // //         {attachment && (
// // // //             <div className="flex justify-between items-center bg-gray-100 px-3 py-1 mb-2 rounded text-xs">
// // // //                 <span className="flex items-center gap-1 truncate"><Paperclip size={12}/> {attachment.name}</span>
// // // //                 <button type="button" onClick={() => setAttachment(null)} title="Hapus Lampiran" aria-label="Hapus Lampiran"><X size={12}/></button>
// // // //             </div>
// // // //         )}

// // // //         <form onSubmit={handleSend} className="flex gap-2 items-center">
// // // //             <button 
// // // //                 type="button" 
// // // //                 onClick={()=>setShowEmoji(!showEmoji)} 
// // // //                 className="text-gray-400 hover:text-yellow-500"
// // // //                 title="Buka Emoji"
// // // //                 aria-label="Buka Emoji"
// // // //             >
// // // //                 <Smile size={20}/>
// // // //             </button>
            
// // // //             <button 
// // // //                 type="button" 
// // // //                 onClick={()=>fileInputRef.current?.click()} 
// // // //                 className="text-gray-400 hover:text-blue-600"
// // // //                 title="Upload File"
// // // //                 aria-label="Upload File"
// // // //             >
// // // //                 <Paperclip size={20}/>
// // // //             </button>
            
// // // //             <input 
// // // //                 type="file" 
// // // //                 ref={fileInputRef} 
// // // //                 className="hidden" 
// // // //                 onChange={handleFileChange} 
// // // //                 title="Input File Upload"
// // // //                 aria-label="Input File Upload"
// // // //             />
            
// // // //             <input 
// // // //                 ref={inputRef}
// // // //                 className="flex-1 border rounded-full px-3 py-2 text-sm outline-none focus:border-blue-500 bg-gray-50"
// // // //                 placeholder={activeTab==='public' ? "Kirim ke kelas... (@mention)" : "Chat tim..."}
// // // //                 value={newMessage}
// // // //                 onChange={handleInputChange}
// // // //                 title="Ketik Pesan"
// // // //                 aria-label="Ketik Pesan"
// // // //             />
            
// // // //             <button 
// // // //                 type="submit" 
// // // //                 disabled={!newMessage.trim() && !attachment} 
// // // //                 className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
// // // //                 title="Kirim Pesan"
// // // //                 aria-label="Kirim Pesan"
// // // //             >
// // // //                 <Send size={20}/>
// // // //             </button>
// // // //         </form>
// // // //     </div>
// // // //   );

// // // //   // --- MODE 1: FLOATING BUBBLE (PESERTA) ---
// // // //   if (isFloating) {
// // // //       if (!isOpen) {
// // // //           return (
// // // //               <button 
// // // //                 type="button"
// // // //                 onClick={() => setIsOpen(true)}
// // // //                 className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 z-50 animate-in zoom-in"
// // // //                 title="Buka Ruang Diskusi"
// // // //                 aria-label="Buka Ruang Diskusi"
// // // //               >
// // // //                   <MessageSquare size={28} />
// // // //               </button>
// // // //           );
// // // //       }

// // // //       return (
// // // //           <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-50 animate-in slide-in-from-bottom-10 fade-in">
// // // //               <div className="bg-blue-700 p-3 text-white flex justify-between items-center shadow-md shrink-0">
// // // //                   <div className="font-bold flex items-center gap-2 text-sm"><MessageSquare size={18}/> Diskusi Kelas</div>
// // // //                   <button type="button" onClick={() => setIsOpen(false)} className="hover:bg-blue-800 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={18}/></button>
// // // //               </div>
// // // //               <div className="flex-1 overflow-y-auto p-3 bg-gray-50 custom-scrollbar" onClick={() => setShowEmoji(false)}>
// // // //                   {messages.length === 0 && <p className="text-center text-gray-400 text-xs mt-10">Belum ada diskusi.</p>}
// // // //                   {messages.map(renderMessageBubble)}
// // // //                   <div ref={messagesEndRef} />
// // // //               </div>
// // // //               <InputArea />
// // // //           </div>
// // // //       );
// // // //   }

// // // //   // --- MODE 2: MODAL BESAR (OPERATOR / ADMIN) ---
// // // //   return (
// // // //     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
// // // //         <div className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 border border-gray-200">
// // // //             {/* Header */}
// // // //             <div className="bg-red-700 text-white p-4 flex justify-between items-center shadow-md shrink-0">
// // // //                 <div className="flex items-center gap-4">
// // // //                     <h3 className="font-bold text-lg flex gap-2"><MessageSquare/> Ruang Diskusi</h3>
// // // //                     <div className="bg-red-800/50 p-1 rounded-lg flex text-xs">
// // // //                         <button type="button" onClick={()=>setActiveTab('public')} className={`px-3 py-1.5 rounded font-bold transition-all ${activeTab==='public'?'bg-white text-red-700 shadow':'text-red-100 hover:text-white'}`} title="Buka Tab Kelas">Kelas (Publik)</button>
// // // //                         {currentUser.role !== 'PARTICIPANT' && (
// // // //                             <button type="button" onClick={()=>setActiveTab('internal')} className={`px-3 py-1.5 rounded font-bold transition-all ${activeTab==='internal'?'bg-white text-red-700 shadow':'text-red-100 hover:text-white'}`} title="Buka Tab Internal">Tim Internal</button>
// // // //                         )}
// // // //                     </div>
// // // //                 </div>
// // // //                 <div className="flex gap-2">
// // // //                     <button type="button" onClick={()=>setShowSidebar(!showSidebar)} className={`p-2 rounded-full transition-colors ${showSidebar?'bg-white text-red-700':'hover:bg-red-800 text-white'}`} title="Toggle Sidebar" aria-label="Toggle Sidebar"><Users size={20}/></button>
// // // //                     <button type="button" onClick={onClose} className="hover:bg-red-800 p-2 rounded-full" title="Tutup Modal" aria-label="Tutup Modal"><X size={20}/></button>
// // // //                 </div>
// // // //             </div>

// // // //             {/* Body Flex */}
// // // //             <div className="flex flex-1 overflow-hidden">
// // // //                 {/* Chat Area */}
// // // //                 <div className="flex-1 flex flex-col bg-gray-50 relative min-w-0">
// // // //                     <div className="flex-1 p-4 overflow-y-auto custom-scrollbar" onClick={()=>setShowEmoji(false)}>
// // // //                         {messages.length === 0 && (
// // // //                             <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-50">
// // // //                                 <MessageSquare size={64} className="mb-2"/>
// // // //                                 <p>Belum ada percakapan di ruang ini.</p>
// // // //                             </div>
// // // //                         )}
// // // //                         {messages.map(renderMessageBubble)}
// // // //                         <div ref={messagesEndRef} />
// // // //                     </div>
// // // //                     <InputArea />
// // // //                 </div>

// // // //                 {/* Sidebar Member List */}
// // // //                 {showSidebar && (
// // // //                     <div className="w-72 bg-white border-l border-gray-200 flex flex-col shrink-0 animate-in slide-in-from-right">
// // // //                         <div className="p-3 border-b bg-gray-50 font-bold text-gray-700 text-xs uppercase tracking-wider flex justify-between items-center">
// // // //                             <span>Anggota ({activeMembers.length})</span>
// // // //                         </div>
// // // //                         <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
// // // //                             {activeMembers.map((m: any, idx: number) => (
// // // //                                 <button type="button" key={idx} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 group cursor-pointer transition-colors text-left" onClick={() => insertMention(m.name)} title={`Mention ${m.name}`}>
// // // //                                     <div className="relative flex-shrink-0">
// // // //                                         <img 
// // // //                                             src={getImageUrl(m.avatarUrl)} 
// // // //                                             className="w-8 h-8 rounded-full object-cover border border-gray-200" 
// // // //                                             onError={(e:any)=>e.target.src=`https://ui-avatars.com/api/?name=${m.name}`}
// // // //                                             alt={m.name}
// // // //                                         />
// // // //                                         <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full ${m.role==='Fasilitator'?'bg-purple-500':'bg-green-500'}`}></span>
// // // //                                     </div>
// // // //                                     <div className="flex-1 min-w-0 overflow-hidden">
// // // //                                         <p className="text-sm font-bold text-gray-800 truncate">{m.name}</p>
// // // //                                         <p className={`text-[10px] uppercase font-bold truncate ${m.role==='Fasilitator'?'text-purple-600':'text-gray-400'}`}>{m.role}</p>
// // // //                                     </div>
// // // //                                 </button>
// // // //                             ))}
// // // //                         </div>
// // // //                     </div>
// // // //                 )}
// // // //             </div>
// // // //         </div>
// // // //     </div>
// // // //   );
// // // // }


// // // 'use client';

// // // import { useState, useEffect, useRef } from 'react';
// // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // import dynamic from 'next/dynamic';
// // // import {
// // //   MessageSquare, Send, X, Smile, Paperclip, 
// // //   FileText, Users
// // // } from 'lucide-react';

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

// // //   // --- MEMBER LIST LOGIC ---
// // //   const getActiveMembers = () => {
// // //     // 1. Normalisasi Data Fasilitator
// // //     const facs = (facilitators || []).map((f: any) => ({
// // //       _id: String(f._id || f.id),
// // //       name: f.name || 'Fasilitator',
// // //       avatarUrl: f.avatarUrl,
// // //       role: 'Fasilitator'
// // //     }));

// // //     // 2. Normalisasi Data Peserta
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

// // //     // [FIX] KELAS PUBLIK = FASILITATOR + PESERTA
// // //     if (activeTab === 'public') {
// // //         displayList = [...facs, ...students];
// // //     } else {
// // //         // [FIX] FASILITATOR = HANYA FASILITATOR
// // //         displayList = [...facs];
// // //     }
    
// // //     // 3. Remove Duplicates
// // //     const uniqueMap = new Map();
// // //     displayList.forEach(item => {
// // //         if (item && item._id) uniqueMap.set(item._id, item);
// // //     });
    
// // //     return Array.from(uniqueMap.values()).sort((a: any, b: any) => (a.name || '').localeCompare(b.name || ''));
// // //   };

// // //   const activeMembers = getActiveMembers();

// // //   useEffect(() => {
// // //     if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // //   }, [messages, isOpen]);

// // //   useEffect(() => {
// // //     if (!isOpen) return;
// // //     loadMessages();
// // //     const interval = setInterval(loadMessages, 3000);
// // //     return () => clearInterval(interval);
// // //   }, [courseId, activeTab, isOpen]);

// // //   const loadMessages = async () => {
// // //     try {
// // //       const res = await api(`/api/courses/${courseId}/chat-group?type=${activeTab}`);
// // //       setMessages(res || []);
// // //     } catch (e) { console.error(e); }
// // //   };

// // //   const handleSend = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if ((!newMessage.trim() && !attachment) || isUploading) return;
// // //     const tempMsg = {
// // //       _id: Date.now(),
// // //       sender: { name: currentUser.name, role: 'me', avatarUrl: currentUser.avatarUrl, _id: currentUser.id || currentUser._id },
// // //       message: newMessage,
// // //       attachment,
// // //       createdAt: new Date().toISOString()
// // //     };
// // //     setMessages(prev => [...prev, tempMsg]);
// // //     const payload = { text: newMessage, type: activeTab, attachment };
// // //     setNewMessage(''); setAttachment(null); setShowEmoji(false); setShowMentionPopup(false);
// // //     try {
// // //       await api(`/api/courses/${courseId}/chat-group`, { method: 'POST', body: payload });
// // //       loadMessages(); 
// // //     } catch (e: any) { alert('Gagal: ' + e.message); }
// // //   };

// // //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const file = e.target.files?.[0];
// // //     if (!file) return;
// // //     setIsUploading(true);
// // //     try {
// // //         const fd = new FormData(); fd.append('file', file);
// // //         const res = await apiUpload('/api/upload', fd);
// // //         setAttachment({ url: res.url || res.file.url, type: file.type.startsWith('image') ? 'image' : 'file', name: file.name });
// // //     } catch (e) { alert('Gagal upload'); } finally { setIsUploading(false); }
// // //   };

// // //   const handleRemoveAttachment = () => setAttachment(null);

// // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const val = e.target.value;
// // //     setNewMessage(val);
// // //     const lastWord = val.split(' ').pop();
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
// // //     const words = newMessage.split(' ');
// // //     words.pop(); 
// // //     const newText = words.join(' ') + ` @${name} `;
// // //     setNewMessage(newText);
// // //     setShowMentionPopup(false);
// // //     inputRef.current?.focus();
// // //   };

// // //   const renderMessageText = (text: string) => {
// // //     const parts = text.split(/(@[\w\s]+)/g);
// // //     return parts.map((part, i) => part.startsWith('@') ? <span key={i} className="text-blue-600 font-bold bg-blue-50 px-1 rounded">{part}</span> : part);
// // //   };

// // //   const renderMessageBubble = (msg: any) => {
// // //     const myId = currentUser.id || currentUser._id;
// // //     const msgSenderId = typeof msg.sender === 'object' ? (msg.sender._id || msg.sender.id) : msg.sender;
// // //     const isMe = msg.sender?.role === 'me' || String(msgSenderId) === String(myId);

// // //     return (
// // //         <div key={msg._id} className={`flex w-full mb-4 ${isMe ? 'justify-end' : 'justify-start'}`}>
// // //             <div className={`flex max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
// // //                 <div className="flex-shrink-0">
// // //                     <img src={getImageUrl(msg.sender?.avatarUrl)} className="w-8 h-8 rounded-full object-cover border border-gray-200 mt-1" onError={(e:any) => e.target.src = `https://ui-avatars.com/api/?name=${msg.sender?.name}&background=random`} alt={msg.sender?.name} />
// // //                 </div>
// // //                 <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// // //                     <div className="flex items-center gap-2 mb-1">
// // //                         <span className="text-[10px] font-bold text-gray-600">{msg.sender?.name}</span>
// // //                         <span className="text-[9px] text-gray-400">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
// // //                     </div>
// // //                     <div className={`px-3 py-2 text-sm rounded-2xl shadow-sm ${isMe ? 'bg-red-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>
// // //                         {msg.attachment && (
// // //                             <div className="mb-2 p-1 bg-black/10 rounded">
// // //                                 {msg.attachment.type === 'image' ? <a href={getImageUrl(msg.attachment.url)} target="_blank" title="Lihat"><img src={getImageUrl(msg.attachment.url)} className="max-h-32 rounded object-cover" alt="img"/></a> : <a href={getImageUrl(msg.attachment.url)} target="_blank" className="flex items-center gap-1 text-xs underline" title="Download"><FileText size={12}/> {msg.attachment.name}</a>}
// // //                             </div>
// // //                         )}
// // //                         {msg.message && <p className="whitespace-pre-wrap">{renderMessageText(msg.message)}</p>}
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // //   };

// // //   const InputArea = () => (
// // //     <div className="p-2 border-t bg-white relative">
// // //         {showEmoji && <div className="absolute bottom-16 left-0 z-50"><EmojiPicker onEmojiClick={(e)=>setNewMessage(prev=>prev+e.emoji)} height={300} width={300}/></div>}
// // //         {showMentionPopup && (
// // //             <div className="absolute bottom-16 left-4 bg-white border border-gray-200 shadow-xl rounded-lg w-64 max-h-48 overflow-y-auto z-50">
// // //                 {filteredMembers.map((u: any) => (
// // //                     <button key={u._id} type="button" onClick={() => insertMention(u.name)} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-xs" title={`Mention ${u.name}`}>
// // //                         <img src={getImageUrl(u.avatarUrl)} className="w-5 h-5 rounded-full" alt="" />
// // //                         <span className="truncate font-bold">{u.name}</span>
// // //                     </button>
// // //                 ))}
// // //             </div>
// // //         )}
// // //         {attachment && <div className="flex justify-between items-center bg-gray-100 px-3 py-1 mb-2 rounded text-xs"><span className="flex items-center gap-1 truncate"><Paperclip size={12}/> {attachment.name}</span><button type="button" onClick={() => setAttachment(null)} title="Hapus"><X size={12}/></button></div>}
// // //         <form onSubmit={handleSend} className="flex gap-2 items-center">
// // //             <button type="button" onClick={()=>setShowEmoji(!showEmoji)} className="text-gray-400 hover:text-yellow-500" title="Emoji" aria-label="Emoji"><Smile size={20}/></button>
// // //             <button type="button" onClick={()=>fileInputRef.current?.click()} className="text-gray-400 hover:text-blue-600" title="Upload" aria-label="Upload"><Paperclip size={20}/></button>
// // //             <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} title="Upload" aria-label="Upload"/>
// // //             <input ref={inputRef} className="flex-1 border rounded-full px-3 py-2 text-sm outline-none focus:border-blue-500 bg-gray-50" placeholder={activeTab==='public' ? "Kirim ke kelas..." : "Chat fasilitator..."} value={newMessage} onChange={handleInputChange} title="Pesan" aria-label="Pesan"/>
// // //             <button type="submit" disabled={!newMessage.trim() && !attachment} className="text-blue-600 hover:bg-blue-50 p-2 rounded-full" title="Kirim" aria-label="Kirim"><Send size={20}/></button>
// // //         </form>
// // //     </div>
// // //   );

// // //   if (isFloating) {
// // //       if (!isOpen) {
// // //           return (
// // //               <button type="button" onClick={() => setIsOpen(true)} className="fixed bottom-40 right-6 w-14 h-14 bg-red-700 hover:bg-red-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 z-50 animate-in zoom-in" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi">
// // //                   <MessageSquare size={28} />
// // //               </button>
// // //           );
// // //       }
// // //   }

// // //   if (!isOpen) return null;

// // //   return (
// // //     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Ruang Diskusi">
// // //         <div className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 border border-gray-200">
// // //             <div className="bg-red-700 text-white p-4 flex justify-between items-center shadow-md shrink-0">
// // //                 <div className="flex items-center gap-4">
// // //                     <h3 className="font-bold text-lg flex gap-2"><MessageSquare/> Ruang Diskusi</h3>
// // //                     <div className="bg-red-800/50 p-1 rounded-lg flex text-xs">
// // //                         <button type="button" onClick={()=>setActiveTab('public')} className={`px-3 py-1.5 rounded font-bold transition-all ${activeTab==='public'?'bg-white text-red-700 shadow':'text-red-100 hover:text-white'}`} title="Buka Tab Kelas">Kelas (Publik)</button>
// // //                         {currentUser.role !== 'PARTICIPANT' && <button type="button" onClick={()=>setActiveTab('internal')} className={`px-3 py-1.5 rounded font-bold transition-all ${activeTab==='internal'?'bg-white text-red-700 shadow':'text-red-100 hover:text-white'}`} title="Buka Tab Fasilitator">Fasilitator</button>}
// // //                     </div>
// // //                 </div>
// // //                 <div className="flex gap-2">
// // //                     <button type="button" onClick={()=>setShowSidebar(!showSidebar)} className={`p-2 rounded-full transition-colors ${showSidebar?'bg-white text-red-700':'hover:bg-red-800 text-white'}`} title="Toggle Sidebar" aria-label="Toggle Sidebar"><Users size={20}/></button>
// // //                     <button type="button" onClick={isFloating ? () => setIsOpen(false) : onClose} className="hover:bg-red-800 p-2 rounded-full" title="Tutup" aria-label="Tutup"><X size={20}/></button>
// // //                 </div>
// // //             </div>
// // //             <div className="flex flex-1 overflow-hidden">
// // //                 <div className="flex-1 flex flex-col bg-gray-50 relative min-w-0">
// // //                     <div className="flex-1 p-4 overflow-y-auto custom-scrollbar" onClick={()=>setShowEmoji(false)}>
// // //                         {messages.length === 0 && <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-50"><MessageSquare size={64} className="mb-2"/><p>Belum ada percakapan.</p></div>}
// // //                         {messages.map(renderMessageBubble)}
// // //                         <div ref={messagesEndRef} />
// // //                     </div>
// // //                     <InputArea />
// // //                 </div>
// // //                 {showSidebar && (
// // //                     <div className="w-72 bg-white border-l border-gray-200 flex flex-col shrink-0 animate-in slide-in-from-right">
// // //                         <div className="p-3 border-b bg-gray-50 font-bold text-gray-700 text-xs uppercase tracking-wider flex justify-between items-center"><span>Anggota ({activeMembers.length})</span></div>
// // //                         <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
// // //                             {activeMembers.map((m: any, idx: number) => (
// // //                                 <button type="button" key={idx} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 group cursor-pointer transition-colors text-left" onClick={() => insertMention(m.name)} title={`Mention ${m.name}`}>
// // //                                     <div className="relative flex-shrink-0">
// // //                                         <img src={getImageUrl(m.avatarUrl)} className="w-8 h-8 rounded-full object-cover border border-gray-200" onError={(e:any)=>e.target.src=`https://ui-avatars.com/api/?name=${m.name}`} alt={m.name} />
// // //                                         <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full ${m.role==='Fasilitator'?'bg-purple-500':'bg-green-500'}`}></span>
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
// // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // import dynamic from 'next/dynamic';
// // import {
// //   MessageSquare, Send, X, Smile, Paperclip, 
// //   FileText, Users
// // } from 'lucide-react';

// // const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

// // interface Props {
// //   courseId: string;
// //   currentUser: any;
// //   onClose?: () => void;
// //   isFloating?: boolean; 
// //   participants?: any[]; 
// //   facilitators?: any[]; 
// // }

// // export default function CourseGroupChat({ courseId, currentUser, onClose, isFloating = false, participants = [], facilitators = [] }: Props) {
// //   // Tab State: 'public' (Kelas) atau 'internal' (Fasilitator)
// //   const [activeTab, setActiveTab] = useState<'internal' | 'public'>('public');
// //   const [messages, setMessages] = useState<any[]>([]);
// //   const [newMessage, setNewMessage] = useState('');
// //   const [showEmoji, setShowEmoji] = useState(false);
// //   const [attachment, setAttachment] = useState<any>(null);
// //   const [isUploading, setIsUploading] = useState(false);
  
// //   const [isOpen, setIsOpen] = useState(!isFloating); 
// //   const [showSidebar, setShowSidebar] = useState(true); 

// //   // Mention State
// //   const [mentionQuery, setMentionQuery] = useState('');
// //   const [showMentionPopup, setShowMentionPopup] = useState(false);
// //   const [filteredMembers, setFilteredMembers] = useState<any[]>([]);

// //   const messagesEndRef = useRef<HTMLDivElement>(null);
// //   const fileInputRef = useRef<HTMLInputElement>(null);
// //   const inputRef = useRef<HTMLInputElement>(null);

// //   // --- LOGIC MEMBER LIST (PERBAIKAN) ---
// //   const getActiveMembers = () => {
// //     // 1. Normalisasi Data Fasilitator
// //     const facs = (facilitators || []).map((f: any) => ({
// //       _id: String(f._id || f.id),
// //       name: f.name || 'Fasilitator',
// //       avatarUrl: f.avatarUrl,
// //       role: 'Fasilitator'
// //     }));

// //     // 2. Normalisasi Data Peserta
// //     const students = (participants || []).map((p: any) => {
// //         // Cek struktur: jika dari enrollment, user ada di dalam prop user. Jika direct, p adalah user.
// //         const user = p.user ? p.user : p; 
// //         if (!user || (!user._id && !user.id)) return null;
        
// //         return {
// //             _id: String(user._id || user.id),
// //             name: user.name || 'Peserta',
// //             avatarUrl: user.avatarUrl,
// //             role: 'Peserta'
// //         };
// //     }).filter((u: any) => u !== null);

// //     let membersToDisplay: any[] = [];

// //     if (activeTab === 'public') {
// //         // [ATURAN 1] TAB PUBLIK = FASILITATOR + PESERTA
// //         membersToDisplay = [...facs, ...students];
// //     } else {
// //         // [ATURAN 2] TAB FASILITATOR = HANYA FASILITATOR
// //         membersToDisplay = [...facs];
// //     }
    
// //     // 3. Hapus Duplikat (Gunakan Map berdasarkan _id)
// //     const uniqueMap = new Map();
// //     membersToDisplay.forEach(item => {
// //         if(item && item._id) uniqueMap.set(String(item._id), item);
// //     });
    
// //     // 4. Return array yang sudah di-sort A-Z
// //     return Array.from(uniqueMap.values()).sort((a: any, b: any) => (a.name || '').localeCompare(b.name || ''));
// //   };

// //   const activeMembers = getActiveMembers();

// //   // Auto Scroll
// //   useEffect(() => {
// //     if (isOpen) {
// //         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //     }
// //   }, [messages, isOpen]);

// //   // Polling Pesan
// //   useEffect(() => {
// //     if (!isOpen) return;
// //     loadMessages();
// //     const interval = setInterval(loadMessages, 3000);
// //     return () => clearInterval(interval);
// //   }, [courseId, activeTab, isOpen]);

// //   const loadMessages = async () => {
// //     try {
// //       const res = await api(`/api/courses/${courseId}/chat-group?type=${activeTab}`);
// //       setMessages(res || []);
// //     } catch (e) { console.error(e); }
// //   };

// //   const handleSend = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if ((!newMessage.trim() && !attachment) || isUploading) return;

// //     const tempMsg = {
// //       _id: Date.now(),
// //       sender: { name: currentUser.name, role: 'me', avatarUrl: currentUser.avatarUrl, _id: currentUser.id || currentUser._id },
// //       message: newMessage,
// //       attachment,
// //       createdAt: new Date().toISOString()
// //     };
// //     setMessages(prev => [...prev, tempMsg]);

// //     const payload = { text: newMessage, type: activeTab, attachment };
// //     setNewMessage(''); setAttachment(null); setShowEmoji(false); setShowMentionPopup(false);

// //     try {
// //       await api(`/api/courses/${courseId}/chat-group`, { method: 'POST', body: payload });
// //       loadMessages(); 
// //     } catch (e: any) { alert('Gagal: ' + e.message); }
// //   };

// //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     setIsUploading(true);
// //     try {
// //         const fd = new FormData(); fd.append('file', file);
// //         const res = await apiUpload('/api/upload', fd);
// //         setAttachment({ url: res.url || res.file.url, type: file.type.startsWith('image') ? 'image' : 'file', name: file.name });
// //     } catch (e) { alert('Gagal upload'); } finally { setIsUploading(false); }
// //   };

// //   const handleRemoveAttachment = () => setAttachment(null);

// //   // --- MENTION LOGIC ---
// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const val = e.target.value;
// //     setNewMessage(val);
// //     const lastWord = val.split(' ').pop();
// //     if (lastWord && lastWord.startsWith('@') && lastWord.length > 1) {
// //         const query = lastWord.substring(1).toLowerCase();
// //         setMentionQuery(query);
// //         const matches = activeMembers.filter((u: any) => u.name && u.name.toLowerCase().includes(query));
// //         setFilteredMembers(matches);
// //         setShowMentionPopup(matches.length > 0);
// //     } else {
// //         setShowMentionPopup(false);
// //     }
// //   };

// //   const insertMention = (name: string) => {
// //     const words = newMessage.split(' ');
// //     words.pop(); 
// //     const newText = words.join(' ') + ` @${name} `;
// //     setNewMessage(newText);
// //     setShowMentionPopup(false);
// //     inputRef.current?.focus();
// //   };

// //   // --- RENDERERS ---
// //   const renderMessageText = (text: string) => {
// //     const parts = text.split(/(@[\w\s]+)/g);
// //     return parts.map((part, i) => 
// //         part.startsWith('@') 
// //         ? <span key={i} className="text-blue-600 font-bold bg-blue-50 px-1 rounded">{part}</span> 
// //         : part
// //     );
// //   };

// //   const renderMessageBubble = (msg: any) => {
// //     const myId = currentUser.id || currentUser._id;
// //     const msgSenderId = typeof msg.sender === 'object' ? (msg.sender._id || msg.sender.id) : msg.sender;
// //     const isMe = msg.sender?.role === 'me' || String(msgSenderId) === String(myId);

// //     return (
// //         <div key={msg._id} className={`flex w-full mb-4 ${isMe ? 'justify-end' : 'justify-start'}`}>
// //             <div className={`flex max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
// //                 <div className="flex-shrink-0">
// //                     <img 
// //                         src={getImageUrl(msg.sender?.avatarUrl)} 
// //                         className="w-8 h-8 rounded-full object-cover border border-gray-200 mt-1" 
// //                         onError={(e:any) => e.target.src = `https://ui-avatars.com/api/?name=${msg.sender?.name}&background=random`}
// //                         alt={msg.sender?.name}
// //                     />
// //                 </div>
// //                 <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// //                     <div className="flex items-center gap-2 mb-1">
// //                         <span className="text-[10px] font-bold text-gray-600">{msg.sender?.name}</span>
// //                         <span className="text-[9px] text-gray-400">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
// //                     </div>
// //                     <div className={`px-3 py-2 text-sm rounded-2xl shadow-sm ${isMe ? 'bg-red-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>
// //                         {msg.attachment && (
// //                             <div className="mb-2 p-1 bg-black/10 rounded">
// //                                 {msg.attachment.type === 'image' ? (
// //                                     <a href={getImageUrl(msg.attachment.url)} target="_blank" title="Lihat"><img src={getImageUrl(msg.attachment.url)} className="max-h-32 rounded object-cover" alt="img"/></a>
// //                                 ) : (
// //                                     <a href={getImageUrl(msg.attachment.url)} target="_blank" className="flex items-center gap-1 text-xs underline" title="Download"><FileText size={12}/> {msg.attachment.name}</a>
// //                                 )}
// //                             </div>
// //                         )}
// //                         {msg.message && <p className="whitespace-pre-wrap">{renderMessageText(msg.message)}</p>}
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// //   };

// //   const InputArea = () => (
// //     <div className="p-2 border-t bg-white relative">
// //         {showEmoji && <div className="absolute bottom-16 left-0 z-50"><EmojiPicker onEmojiClick={(e)=>setNewMessage(prev=>prev+e.emoji)} height={300} width={300}/></div>}
// //         {showMentionPopup && (
// //             <div className="absolute bottom-16 left-4 bg-white border border-gray-200 shadow-xl rounded-lg w-64 max-h-48 overflow-y-auto z-50">
// //                 {filteredMembers.map((u: any) => (
// //                     <button key={u._id} type="button" onClick={() => insertMention(u.name)} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-xs" title={`Mention ${u.name}`}>
// //                         <img src={getImageUrl(u.avatarUrl)} className="w-5 h-5 rounded-full" alt="" />
// //                         <span className="truncate font-bold">{u.name}</span>
// //                     </button>
// //                 ))}
// //             </div>
// //         )}
// //         {attachment && (
// //             <div className="flex justify-between items-center bg-gray-100 px-3 py-1 mb-2 rounded text-xs">
// //                 <span className="flex items-center gap-1 truncate"><Paperclip size={12}/> {attachment.name}</span>
// //                 <button type="button" onClick={() => setAttachment(null)} title="Hapus" aria-label="Hapus Lampiran"><X size={12}/></button>
// //             </div>
// //         )}
// //         <form onSubmit={handleSend} className="flex gap-2 items-center">
// //             <button type="button" onClick={()=>setShowEmoji(!showEmoji)} className="text-gray-400 hover:text-yellow-500" title="Emoji" aria-label="Emoji"><Smile size={20}/></button>
// //             <button type="button" onClick={()=>fileInputRef.current?.click()} className="text-gray-400 hover:text-blue-600" title="Upload" aria-label="Upload"><Paperclip size={20}/></button>
// //             <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} title="Upload" aria-label="Upload"/>
// //             <input ref={inputRef} className="flex-1 border rounded-full px-3 py-2 text-sm outline-none focus:border-blue-500 bg-gray-50" placeholder={activeTab==='public' ? "Kirim ke kelas..." : "Chat fasilitator..."} value={newMessage} onChange={handleInputChange} title="Pesan" aria-label="Pesan"/>
// //             <button type="submit" disabled={!newMessage.trim() && !attachment} className="text-blue-600 hover:bg-blue-50 p-2 rounded-full" title="Kirim" aria-label="Kirim"><Send size={20}/></button>
// //         </form>
// //     </div>
// //   );

// //   if (isFloating) {
// //       if (!isOpen) {
// //           return (
// //               <button 
// //                 type="button"
// //                 onClick={() => setIsOpen(true)}
// //                 className="fixed bottom-40 right-6 w-14 h-14 bg-red-700 hover:bg-red-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 z-50 animate-in zoom-in"
// //                 title="Buka Ruang Diskusi"
// //                 aria-label="Buka Ruang Diskusi"
// //               >
// //                   <MessageSquare size={28} />
// //               </button>
// //           );
// //       }
// //   }

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Ruang Diskusi">
// //         <div className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 border border-gray-200">
// //             {/* Header */}
// //             <div className="bg-red-700 text-white p-4 flex justify-between items-center shadow-md shrink-0">
// //                 <div className="flex items-center gap-4">
// //                     <h3 className="font-bold text-lg flex gap-2"><MessageSquare/> Ruang Diskusi</h3>
// //                     <div className="bg-red-800/50 p-1 rounded-lg flex text-xs">
// //                         <button type="button" onClick={()=>setActiveTab('public')} className={`px-3 py-1.5 rounded font-bold transition-all ${activeTab==='public'?'bg-white text-red-700 shadow':'text-red-100 hover:text-white'}`} title="Buka Tab Kelas">Kelas (Publik)</button>
// //                         {currentUser.role !== 'PARTICIPANT' && (
// //                             <button type="button" onClick={()=>setActiveTab('internal')} className={`px-3 py-1.5 rounded font-bold transition-all ${activeTab==='internal'?'bg-white text-red-700 shadow':'text-red-100 hover:text-white'}`} title="Buka Tab Fasilitator">Fasilitator</button>
// //                         )}
// //                     </div>
// //                 </div>
// //                 <div className="flex gap-2">
// //                     <button type="button" onClick={()=>setShowSidebar(!showSidebar)} className={`p-2 rounded-full transition-colors ${showSidebar?'bg-white text-red-700':'hover:bg-red-800 text-white'}`} title="Toggle Sidebar" aria-label="Toggle Sidebar"><Users size={20}/></button>
// //                     <button type="button" onClick={isFloating ? () => setIsOpen(false) : onClose} className="hover:bg-red-800 p-2 rounded-full" title="Tutup" aria-label="Tutup"><X size={20}/></button>
// //                 </div>
// //             </div>

// //             {/* Body */}
// //             <div className="flex flex-1 overflow-hidden">
// //                 <div className="flex-1 flex flex-col bg-gray-50 relative min-w-0">
// //                     <div className="flex-1 p-4 overflow-y-auto custom-scrollbar" onClick={()=>setShowEmoji(false)}>
// //                         {messages.length === 0 && <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-50"><MessageSquare size={64} className="mb-2"/><p>Belum ada percakapan.</p></div>}
// //                         {messages.map(renderMessageBubble)}
// //                         <div ref={messagesEndRef} />
// //                     </div>
// //                     <InputArea />
// //                 </div>

// //                 {/* Sidebar Member List */}
// //                 {showSidebar && (
// //                     <div className="w-72 bg-white border-l border-gray-200 flex flex-col shrink-0 animate-in slide-in-from-right">
// //                         <div className="p-3 border-b bg-gray-50 font-bold text-gray-700 text-xs uppercase tracking-wider flex justify-between items-center">
// //                             <span>Anggota ({activeMembers.length})</span>
// //                         </div>
// //                         <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
// //                             {activeMembers.map((m: any, idx: number) => (
// //                                 <button type="button" key={idx} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 group cursor-pointer transition-colors text-left" onClick={() => insertMention(m.name)} title={`Mention ${m.name}`}>
// //                                     <div className="relative flex-shrink-0">
// //                                         <img src={getImageUrl(m.avatarUrl)} className="w-8 h-8 rounded-full object-cover border border-gray-200" onError={(e:any)=>e.target.src=`https://ui-avatars.com/api/?name=${m.name}`} alt={m.name} />
// //                                         <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full ${m.role==='Fasilitator'?'bg-purple-500':'bg-green-500'}`}></span>
// //                                     </div>
// //                                     <div className="flex-1 min-w-0 overflow-hidden">
// //                                         <p className="text-sm font-bold text-gray-800 truncate">{m.name}</p>
// //                                         <p className={`text-[10px] uppercase font-bold truncate ${m.role==='Fasilitator'?'text-purple-600':'text-gray-400'}`}>{m.role}</p>
// //                                     </div>
// //                                 </button>
// //                             ))}
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     </div>
// //   );
// // }


// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { api, apiUpload, getImageUrl } from '@/lib/api';
// import dynamic from 'next/dynamic';
// import {
//   MessageSquare, Send, X, Smile, Paperclip, 
//   FileText, Users
// } from 'lucide-react';

// const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

// interface Props {
//   courseId: string;
//   currentUser: any;
//   onClose?: () => void;
//   isFloating?: boolean; 
//   participants?: any[]; 
//   facilitators?: any[]; 
// }

// export default function CourseGroupChat({ courseId, currentUser, onClose, isFloating = false, participants = [], facilitators = [] }: Props) {
//   const [activeTab, setActiveTab] = useState<'internal' | 'public'>('public');
//   const [messages, setMessages] = useState<any[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [showEmoji, setShowEmoji] = useState(false);
//   const [attachment, setAttachment] = useState<any>(null);
//   const [isUploading, setIsUploading] = useState(false);
  
//   const [isOpen, setIsOpen] = useState(!isFloating); 
//   const [showSidebar, setShowSidebar] = useState(true); 

//   const [mentionQuery, setMentionQuery] = useState('');
//   const [showMentionPopup, setShowMentionPopup] = useState(false);
//   const [filteredMembers, setFilteredMembers] = useState<any[]>([]);

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // [FIX] Cegah scroll parent
//   const preventScroll = (e: any) => e.stopPropagation();

//   // --- MEMBER LIST LOGIC ---
//   const getActiveMembers = () => {
//     const facs = (facilitators || []).map((f: any) => ({
//       _id: String(f._id || f.id),
//       name: f.name || 'Fasilitator',
//       avatarUrl: f.avatarUrl,
//       role: 'Fasilitator'
//     }));

//     const students = (participants || []).map((p: any) => {
//         const user = p.user ? p.user : p; 
//         if (!user || (!user._id && !user.id)) return null;
//         return {
//             _id: String(user._id || user.id),
//             name: user.name || 'Peserta',
//             avatarUrl: user.avatarUrl,
//             role: 'Peserta'
//         };
//     }).filter((u: any) => u !== null);

//     let displayList: any[] = [];
//     if (activeTab === 'public') {
//         displayList = [...facs, ...students];
//     } else {
//         displayList = [...facs];
//     }
    
//     const uniqueMap = new Map();
//     displayList.forEach(item => {
//         if (item && item._id) uniqueMap.set(String(item._id), item);
//     });
    
//     return Array.from(uniqueMap.values()).sort((a: any, b: any) => (a.name || '').localeCompare(b.name || ''));
//   };

//   const activeMembers = getActiveMembers();

//   // Scroll
//   useEffect(() => {
//     if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isOpen]);

//   // Polling dengan pencegahan re-render berlebih
//   useEffect(() => {
//     if (!isOpen) return;
//     loadMessages();
//     const interval = setInterval(loadMessages, 3000);
//     return () => clearInterval(interval);
//   }, [courseId, activeTab, isOpen]);

//   const loadMessages = async () => {
//     try {
//       const res = await api(`/api/courses/${courseId}/chat-group?type=${activeTab}`);
//       // [FIX] Cek kesamaan data sebelum set state untuk mencegah input reset
//       if (JSON.stringify(res) !== JSON.stringify(messages)) {
//           setMessages(res || []);
//       }
//     } catch (e) { console.error(e); }
//   };

//   const handleSend = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if ((!newMessage.trim() && !attachment) || isUploading) return;

//     let targetType = activeTab;
//     if (currentUser.role === 'PARTICIPANT') targetType = 'public';

//     const tempMsg = {
//       _id: Date.now(),
//       sender: { name: currentUser.name, role: 'me', avatarUrl: currentUser.avatarUrl, _id: currentUser.id || currentUser._id },
//       message: newMessage,
//       attachment,
//       createdAt: new Date().toISOString()
//     };
    
//     setMessages(prev => [...prev, tempMsg]);
//     const msgToSend = newMessage; 
//     setNewMessage(''); 
//     setAttachment(null); 
//     setShowEmoji(false); 
//     setShowMentionPopup(false);

//     try {
//       const payload = { text: msgToSend, type: targetType, attachment };
//       await api(`/api/courses/${courseId}/chat-group`, { method: 'POST', body: payload });
//       loadMessages(); 
//     } catch (e: any) { alert('Gagal: ' + e.message); }
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setIsUploading(true);
//     try {
//         const fd = new FormData(); fd.append('file', file);
//         const res = await apiUpload('/api/upload', fd);
//         setAttachment({ url: res.url || res.file.url, type: file.type.startsWith('image') ? 'image' : 'file', name: file.name });
//     } catch (e) { alert('Gagal upload'); } finally { setIsUploading(false); }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     setNewMessage(val);
    
//     const lastWord = val.split(' ').pop();
//     if (lastWord && lastWord.startsWith('@') && lastWord.length > 1) {
//         const query = lastWord.substring(1).toLowerCase();
//         setMentionQuery(query);
//         const matches = activeMembers.filter((u: any) => u.name && u.name.toLowerCase().includes(query));
//         setFilteredMembers(matches);
//         setShowMentionPopup(matches.length > 0);
//     } else {
//         setShowMentionPopup(false);
//     }
//   };

//   const insertMention = (name: string) => {
//     const words = newMessage.split(' ');
//     words.pop(); 
//     const newText = words.join(' ') + ` @${name} `;
//     setNewMessage(newText);
//     setShowMentionPopup(false);
//     inputRef.current?.focus();
//   };

//   const renderMessageText = (text: string) => {
//     const parts = text.split(/(@[\w\s]+)/g);
//     return parts.map((part, i) => part.startsWith('@') ? <span key={i} className="text-blue-600 font-bold bg-blue-50 px-1 rounded">{part}</span> : part);
//   };

//   const renderMessageBubble = (msg: any) => {
//     const myId = currentUser.id || currentUser._id;
//     const msgSenderId = typeof msg.sender === 'object' ? (msg.sender._id || msg.sender.id) : msg.sender;
//     const isMe = msg.sender?.role === 'me' || String(msgSenderId) === String(myId);

//     return (
//         <div key={msg._id} className={`flex w-full mb-4 ${isMe ? 'justify-end' : 'justify-start'}`}>
//             <div className={`flex max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
//                 <div className="flex-shrink-0">
//                     <img 
//                         src={getImageUrl(msg.sender?.avatarUrl)} 
//                         className="w-8 h-8 rounded-full object-cover border border-gray-200 mt-1" 
//                         onError={(e:any) => e.target.src = `https://ui-avatars.com/api/?name=${msg.sender?.name}&background=random`}
//                         alt={msg.sender?.name}
//                     />
//                 </div>
//                 <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
//                     <div className="flex items-center gap-2 mb-1">
//                         <span className="text-[10px] font-bold text-gray-600">{msg.sender?.name}</span>
//                         <span className="text-[9px] text-gray-400">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
//                     </div>
//                     <div className={`px-3 py-2 text-sm rounded-2xl shadow-sm ${isMe ? 'bg-red-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>
//                         {msg.attachment && (
//                             <div className="mb-2 p-1 bg-black/10 rounded">
//                                 {msg.attachment.type === 'image' ? <a href={getImageUrl(msg.attachment.url)} target="_blank" title="Lihat"><img src={getImageUrl(msg.attachment.url)} className="max-h-32 rounded object-cover" alt="img"/></a> : <a href={getImageUrl(msg.attachment.url)} target="_blank" className="flex items-center gap-1 text-xs underline" title="Download"><FileText size={12}/> {msg.attachment.name}</a>}
//                             </div>
//                         )}
//                         <p className="whitespace-pre-wrap">{msg.message}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
//   };

//   const InputArea = () => (
//     <div className="p-2 border-t bg-white relative" onClick={preventScroll}>
//         {showEmoji && <div className="absolute bottom-16 left-0 z-50"><EmojiPicker onEmojiClick={(e)=>setNewMessage(prev=>prev+e.emoji)} height={300} width={300}/></div>}
//         {showMentionPopup && (
//             <div className="absolute bottom-16 left-4 bg-white border border-gray-200 shadow-xl rounded-lg w-64 max-h-48 overflow-y-auto z-50">
//                 {filteredMembers.map((u: any) => (
//                     <button key={u._id} type="button" onClick={() => insertMention(u.name)} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-xs" title={`Mention ${u.name}`}>
//                         <img src={getImageUrl(u.avatarUrl)} className="w-5 h-5 rounded-full" alt="" />
//                         <span className="truncate font-bold">{u.name}</span>
//                     </button>
//                 ))}
//             </div>
//         )}
//         {attachment && (
//             <div className="flex justify-between items-center bg-gray-100 px-3 py-1 mb-2 rounded text-xs">
//                 <span className="flex items-center gap-1 truncate"><Paperclip size={12}/> {attachment.name}</span>
//                 <button type="button" onClick={() => setAttachment(null)} title="Hapus"><X size={12}/></button>
//             </div>
//         )}
//         <form onSubmit={handleSend} className="flex gap-2 items-center">
//             <button type="button" onClick={()=>setShowEmoji(!showEmoji)} className="text-gray-400 hover:text-yellow-500" title="Emoji" aria-label="Buka Emoji"><Smile size={20}/></button>
//             <button type="button" onClick={()=>fileInputRef.current?.click()} className="text-gray-400 hover:text-blue-600" title="Upload" aria-label="Upload File"><Paperclip size={20}/></button>
//             <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} title="Upload Input" aria-label="Upload Input"/>
            
//             <input 
//                 ref={inputRef} 
//                 className="flex-1 border rounded-full px-3 py-2 text-sm outline-none focus:border-blue-500 bg-gray-50" 
//                 placeholder={activeTab==='public' ? "Kirim ke kelas..." : "Chat fasilitator..."} 
//                 value={newMessage} 
//                 onChange={handleInputChange} 
//                 title="Pesan" 
//                 aria-label="Ketik Pesan"
//                 autoComplete="off" 
//             />
//             <button type="submit" disabled={!newMessage.trim() && !attachment} className="text-blue-600 hover:bg-blue-50 p-2 rounded-full" title="Kirim" aria-label="Kirim Pesan"><Send size={20}/></button>
//         </form>
//     </div>
//   );

//   if (isFloating) {
//       if (!isOpen) {
//           return (
//               <button 
//                 type="button"
//                 onClick={() => setIsOpen(true)}
//                 className="fixed bottom-40 right-6 w-14 h-14 bg-red-700 hover:bg-red-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 z-[9999] animate-in zoom-in"
//                 title="Buka Ruang Diskusi"
//                 aria-label="Buka Ruang Diskusi"
//               >
//                   <MessageSquare size={28} />
//               </button>
//           );
//       }
//   }

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Ruang Diskusi" onClick={() => !isFloating && onClose && onClose()}>
//         <div className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 border border-gray-200" onClick={(e) => e.stopPropagation()}>
//             <div className="bg-red-700 text-white p-4 flex justify-between items-center shadow-md shrink-0">
//                 <div className="flex items-center gap-4">
//                     <h3 className="font-bold text-lg flex gap-2"><MessageSquare/> Ruang Diskusi</h3>
//                     <div className="bg-red-800/50 p-1 rounded-lg flex text-xs">
//                         <button type="button" onClick={()=>setActiveTab('public')} className={`px-3 py-1.5 rounded font-bold transition-all ${activeTab==='public'?'bg-white text-red-700 shadow':'text-red-100 hover:text-white'}`} title="Buka Tab Kelas">Kelas (Publik)</button>
//                         {currentUser.role !== 'PARTICIPANT' && (
//                             <button type="button" onClick={()=>setActiveTab('internal')} className={`px-3 py-1.5 rounded font-bold transition-all ${activeTab==='internal'?'bg-white text-red-700 shadow':'text-red-100 hover:text-white'}`} title="Buka Tab Fasilitator">Fasilitator</button>
//                         )}
//                     </div>
//                 </div>
//                 <div className="flex gap-2">
//                     <button type="button" onClick={()=>setShowSidebar(!showSidebar)} className={`p-2 rounded-full transition-colors ${showSidebar?'bg-white text-red-700':'hover:bg-red-800 text-white'}`} title="Toggle Sidebar" aria-label="Toggle Sidebar"><Users size={20}/></button>
//                     <button type="button" onClick={isFloating ? () => setIsOpen(false) : onClose} className="hover:bg-red-800 p-2 rounded-full" title="Tutup" aria-label="Tutup"><X size={20}/></button>
//                 </div>
//             </div>

//             <div className="flex flex-1 overflow-hidden">
//                 <div className="flex-1 flex flex-col bg-gray-50 relative min-w-0">
//                     <div className="flex-1 p-4 overflow-y-auto custom-scrollbar" onClick={()=>setShowEmoji(false)}>
//                         {messages.length === 0 && <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-50"><MessageSquare size={64} className="mb-2"/><p>Belum ada percakapan.</p></div>}
//                         {messages.map(renderMessageBubble)}
//                         <div ref={messagesEndRef} />
//                     </div>
//                     <InputArea />
//                 </div>

//                 {showSidebar && (
//                     <div className="w-72 bg-white border-l border-gray-200 flex flex-col shrink-0 animate-in slide-in-from-right">
//                         <div className="p-3 border-b bg-gray-50 font-bold text-gray-700 text-xs uppercase tracking-wider flex justify-between items-center">
//                             <span>Anggota ({activeMembers.length})</span>
//                         </div>
//                         <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
//                             {activeMembers.map((m: any, idx: number) => (
//                                 <button type="button" key={idx} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 group cursor-pointer transition-colors text-left" onClick={() => insertMention(m.name)} title={`Mention ${m.name}`}>
//                                     <div className="relative flex-shrink-0">
//                                         <img src={getImageUrl(m.avatarUrl)} className="w-8 h-8 rounded-full object-cover border border-gray-200" onError={(e:any)=>e.target.src=`https://ui-avatars.com/api/?name=${m.name}`} alt={m.name} />
//                                         <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full ${m.role==='Fasilitator'?'bg-purple-500':'bg-green-500'}`}></span>
//                                     </div>
//                                     <div className="flex-1 min-w-0 overflow-hidden">
//                                         <p className="text-sm font-bold text-gray-800 truncate">{m.name}</p>
//                                         <p className={`text-[10px] uppercase font-bold truncate ${m.role==='Fasilitator'?'text-purple-600':'text-gray-400'}`}>{m.role}</p>
//                                     </div>
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import { api, getImageUrl, apiUpload } from '@/lib/api';
import dynamic from 'next/dynamic';
import {
  MessageSquare, Send, X, Smile, Paperclip, 
  FileText, Users, Image as ImageIcon, Minimize2
} from 'lucide-react';

// Dynamic import untuk EmojiPicker agar tidak error saat SSR
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface Props {
  courseId: string;
  currentUser: any;
  onClose?: () => void;
  isFloating?: boolean; 
  participants?: any[]; 
  facilitators?: any[]; 
}

export default function CourseGroupChat({ courseId, currentUser, onClose, isFloating = false, participants = [], facilitators = [] }: Props) {
  const [activeTab, setActiveTab] = useState<'internal' | 'public'>('public');
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [attachment, setAttachment] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [isOpen, setIsOpen] = useState(!isFloating); 
  const [showSidebar, setShowSidebar] = useState(true); 

  const [mentionQuery, setMentionQuery] = useState('');
  const [showMentionPopup, setShowMentionPopup] = useState(false);
  const [filteredMembers, setFilteredMembers] = useState<any[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // [FIX] Cegah scroll parent saat scroll di dalam chat
  const preventScroll = (e: React.MouseEvent) => e.stopPropagation();

  // --- MEMBER LIST LOGIC ---
  const getActiveMembers = () => {
    const facs = (facilitators || []).map((f: any) => ({
      _id: String(f._id || f.id),
      name: f.name || 'Fasilitator',
      avatarUrl: f.avatarUrl,
      role: 'Fasilitator'
    }));

    const students = (participants || []).map((p: any) => {
        const user = p.user ? p.user : p; 
        if (!user || (!user._id && !user.id)) return null;
        return {
            _id: String(user._id || user.id),
            name: user.name || 'Peserta',
            avatarUrl: user.avatarUrl,
            role: 'Peserta'
        };
    }).filter((u: any) => u !== null);

    let displayList: any[] = [];
    if (activeTab === 'public') {
        displayList = [...facs, ...students];
    } else {
        displayList = [...facs];
    }
    
    const uniqueMap = new Map();
    displayList.forEach(item => {
        if (item && item._id) uniqueMap.set(String(item._id), item);
    });
    
    return Array.from(uniqueMap.values()).sort((a: any, b: any) => (a.name || '').localeCompare(b.name || ''));
  };

  const activeMembers = getActiveMembers();

  // Scroll ke bawah saat pesan baru masuk
  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Polling pesan baru setiap 3 detik
  useEffect(() => {
    if (!isOpen) return;
    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [courseId, activeTab, isOpen]);

  const loadMessages = async () => {
    try {
      const res = await api(`/api/courses/${courseId}/groups/messages?type=${activeTab}`);
      // Cek kesamaan data sederhana (berdasarkan panjang array) untuk meminimalkan re-render
      // Idealnya gunakan deep comparison atau memo, tapi length check + last ID check cukup efisien
      setMessages(prev => {
          if (res && res.length !== prev.length) return res;
          if (res && res.length > 0 && prev.length > 0 && res[res.length-1]._id !== prev[prev.length-1]._id) return res;
          return prev; // Kembalikan state lama jika tidak ada perubahan signifikan
      });
    } catch (e) { console.error(e); }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!newMessage.trim() && !attachment) || isUploading) return;

    let targetType = activeTab;
    // Jika peserta, paksa ke public karena tidak punya akses internal
    if (currentUser.role === 'PARTICIPANT') targetType = 'public';

    // Optimistic UI Update
    const tempMsg = {
      _id: Date.now(),
      sender: { name: currentUser.name, role: 'me', avatarUrl: currentUser.avatarUrl, _id: currentUser.id || currentUser._id },
      message: newMessage,
      attachment,
      createdAt: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, tempMsg]);
    const msgToSend = newMessage; 
    setNewMessage(''); 
    setAttachment(null); 
    setShowEmoji(false); 
    setShowMentionPopup(false);

    try {
      const payload = { text: msgToSend, type: targetType, attachment };
      await api(`/api/courses/${courseId}/groups/send`, { method: 'POST', body: payload });
      loadMessages(); // Refresh data asli dari server
    } catch (e: any) { alert('Gagal kirim pesan: ' + e.message); }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
        const fd = new FormData(); fd.append('file', file);
        const res = await apiUpload('/api/upload', fd);
        const url = res.url || res.file?.url || res.imageUrl;
        setAttachment({ url, type: file.type.startsWith('image') ? 'image' : 'file', name: file.name });
    } catch (e) { alert('Gagal upload file'); } finally { 
        setIsUploading(false);
        if(fileInputRef.current) fileInputRef.current.value = ''; // Reset input file
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNewMessage(val);
    
    // Logika Mention (@nama)
    const cursorPosition = e.target.selectionStart || 0;
    const textBeforeCursor = val.slice(0, cursorPosition);
    const lastWord = textBeforeCursor.split(' ').pop();
    
    if (lastWord && lastWord.startsWith('@') && lastWord.length > 1) {
        const query = lastWord.substring(1).toLowerCase();
        setMentionQuery(query);
        const matches = activeMembers.filter((u: any) => u.name && u.name.toLowerCase().includes(query));
        setFilteredMembers(matches);
        setShowMentionPopup(matches.length > 0);
    } else {
        setShowMentionPopup(false);
    }
  };

  const insertMention = (name: string) => {
    const cursorPosition = inputRef.current?.selectionStart || 0;
    const textBeforeCursor = newMessage.slice(0, cursorPosition);
    const textAfterCursor = newMessage.slice(cursorPosition);
    
    const lastAtPos = textBeforeCursor.lastIndexOf('@');
    const newTextBefore = textBeforeCursor.substring(0, lastAtPos) + `@${name} `;
    
    setNewMessage(newTextBefore + textAfterCursor);
    setShowMentionPopup(false);
    inputRef.current?.focus();
  };

  // Komponen Bubble Pesan
  const renderMessageBubble = (msg: any) => {
    const myId = currentUser.id || currentUser._id;
    const msgSenderId = typeof msg.sender === 'object' ? (msg.sender._id || msg.sender.id) : msg.sender;
    const isMe = msg.sender?.role === 'me' || String(msgSenderId) === String(myId);

    // Format waktu
    const timeString = new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    return (
        <div key={msg._id} className={`flex w-full mb-4 ${isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
                <div className="flex-shrink-0">
                    {msg.sender?.avatarUrl ? (
                        <img 
                            src={getImageUrl(msg.sender.avatarUrl)} 
                            className="w-8 h-8 rounded-full object-cover border border-gray-200 mt-1" 
                            alt={msg.sender?.name || 'User'}
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-200 mt-1">
                            {msg.sender?.name?.charAt(0) || '?'}
                        </div>
                    )}
                </div>
                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-gray-600">{msg.sender?.name || 'Unknown'}</span>
                        <span className="text-[9px] text-gray-400">{timeString}</span>
                    </div>
                    <div className={`px-3 py-2 text-sm rounded-2xl shadow-sm ${isMe ? 'bg-red-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>
                        {msg.attachment && (
                            <div className="mb-2 p-1 bg-black/10 rounded overflow-hidden">
                                {msg.attachment.type === 'image' ? (
                                    <a href={getImageUrl(msg.attachment.url)} target="_blank" rel="noopener noreferrer" title="Lihat Gambar">
                                        <img src={getImageUrl(msg.attachment.url)} className="max-h-32 rounded object-cover" alt="Attachment"/>
                                    </a>
                                ) : (
                                    <a href={getImageUrl(msg.attachment.url)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs underline" title={`Download ${msg.attachment.name}`}>
                                        <FileText size={12}/> {msg.attachment.name}
                                    </a>
                                )}
                            </div>
                        )}
                        <p className="whitespace-pre-wrap">{msg.message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  // Komponen Floating Button (Jika kondisi floating dan tertutup)
  if (isFloating && !isOpen) {
      return (
          <button 
            type="button"
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 w-14 h-14 bg-red-700 hover:bg-red-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 z-[50] animate-in zoom-in"
            title="Buka Ruang Diskusi"
            aria-label="Buka Ruang Diskusi"
          >
              <MessageSquare size={28} />
          </button>
      );
  }

  if (!isOpen) return null;

  // --- RENDER MODAL UTAMA ---
  return (
    // [FIX ARIA] Tambahkan role="dialog" dan aria-modal="true" pada container modal
    <div 
        className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${isFloating ? 'pointer-events-none' : 'bg-black/60 backdrop-blur-sm'}`} 
        role={!isFloating ? "dialog" : undefined}
        aria-modal={!isFloating ? "true" : undefined}
        aria-label="Ruang Diskusi"
        onClick={() => !isFloating && onClose && onClose()}
    >
        {/* Container Chat Box */}
        <div 
            className={`${isFloating ? 'pointer-events-auto fixed bottom-24 right-6 w-[90vw] md:w-[450px] h-[600px] shadow-2xl' : 'w-full max-w-5xl h-[85vh] shadow-2xl'} bg-white rounded-2xl flex flex-col overflow-hidden animate-in zoom-in-95 border border-gray-200`} 
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header Chat */}
            <div className="bg-red-700 text-white p-4 flex justify-between items-center shadow-md shrink-0">
                <div className="flex items-center gap-4">
                    <h3 className="font-bold text-lg flex items-center gap-2"><MessageSquare size={20}/> Ruang Diskusi</h3>
                    
                    {/* Tab Switcher */}
                    <div className="bg-red-800/50 p-1 rounded-lg flex text-xs">
                        <button 
                            type="button" 
                            onClick={()=>setActiveTab('public')} 
                            className={`px-3 py-1.5 rounded font-bold transition-all ${activeTab==='public'?'bg-white text-red-700 shadow':'text-red-100 hover:text-white'}`} 
                            title="Buka Tab Kelas"
                        >
                            Kelas
                        </button>
                        {currentUser.role !== 'PARTICIPANT' && (
                            <button 
                                type="button" 
                                onClick={()=>setActiveTab('internal')} 
                                className={`px-3 py-1.5 rounded font-bold transition-all ${activeTab==='internal'?'bg-white text-red-700 shadow':'text-red-100 hover:text-white'}`} 
                                title="Buka Tab Fasilitator"
                            >
                                Fasilitator
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    {/* Toggle Sidebar Member (hanya jika bukan mode floating kecil) */}
                    {!isFloating && (
                        <button 
                            type="button" 
                            onClick={()=>setShowSidebar(!showSidebar)} 
                            className={`p-2 rounded-full transition-colors ${showSidebar?'bg-white text-red-700':'hover:bg-red-800 text-white'}`} 
                            title="Toggle Daftar Anggota" 
                            aria-label="Toggle Daftar Anggota"
                        >
                            <Users size={20}/>
                        </button>
                    )}
                    {/* Tombol Tutup / Minimize */}
                    <button 
                        type="button" 
                        onClick={isFloating ? () => setIsOpen(false) : onClose} 
                        className="hover:bg-red-800 p-2 rounded-full text-white" 
                        title="Tutup Chat" 
                        aria-label="Tutup Chat"
                    >
                        {isFloating ? <Minimize2 size={20}/> : <X size={20}/>}
                    </button>
                </div>
            </div>

            {/* Body Chat */}
            <div className="flex flex-1 overflow-hidden">
                {/* Area Pesan Utama */}
                <div className="flex-1 flex flex-col bg-gray-50 relative min-w-0">
                    <div className="flex-1 p-4 overflow-y-auto custom-scrollbar" onClick={()=>setShowEmoji(false)}>
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-50">
                                <MessageSquare size={64} className="mb-2"/>
                                <p>Belum ada percakapan. Mulai diskusi!</p>
                            </div>
                        )}
                        {messages.map(renderMessageBubble)}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Area Input Pesan */}
                    <div className="p-3 border-t bg-white relative" onClick={preventScroll}>
                        {/* Emoji Picker Popup */}
                        {showEmoji && (
                            <div className="absolute bottom-16 left-0 z-50 shadow-xl border rounded-lg">
                                <EmojiPicker onEmojiClick={(e)=>setNewMessage(prev=>prev+e.emoji)} height={350} width={300} searchDisabled={false} skinTonesDisabled />
                            </div>
                        )}
                        
                        {/* Mention Popup */}
                        {showMentionPopup && (
                            <div className="absolute bottom-16 left-4 bg-white border border-gray-200 shadow-xl rounded-lg w-64 max-h-48 overflow-y-auto z-50">
                                {filteredMembers.map((u: any) => (
                                    <button 
                                        key={u._id} 
                                        type="button" 
                                        onClick={() => insertMention(u.name)} 
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-xs" 
                                        title={`Mention ${u.name}`}
                                    >
                                        {u.avatarUrl ? <img src={getImageUrl(u.avatarUrl)} className="w-5 h-5 rounded-full object-cover" alt="" /> : <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold">{u.name.charAt(0)}</div>}
                                        <span className="truncate font-bold">{u.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Attachment Preview Bar */}
                        {attachment && (
                            <div className="flex justify-between items-center bg-gray-100 px-3 py-2 mb-2 rounded-lg text-xs border border-gray-200">
                                <span className="flex items-center gap-2 truncate font-medium text-gray-700">
                                    {attachment.type === 'image' ? <ImageIcon size={14}/> : <Paperclip size={14}/>} 
                                    {attachment.name}
                                </span>
                                <button type="button" onClick={() => setAttachment(null)} title="Hapus Lampiran" className="text-gray-500 hover:text-red-500"><X size={14}/></button>
                            </div>
                        )}

                        {/* Form Input */}
                        <form onSubmit={handleSend} className="flex gap-2 items-center">
                            <div className="flex gap-1">
                                <button 
                                    type="button" 
                                    onClick={()=>setShowEmoji(!showEmoji)} 
                                    className="text-gray-400 hover:text-yellow-500 p-2 rounded-full hover:bg-yellow-50 transition-colors" 
                                    title="Emoji" 
                                    aria-label="Buka Emoji"
                                >
                                    <Smile size={20}/>
                                </button>
                                <button 
                                    type="button" 
                                    onClick={()=>fileInputRef.current?.click()} 
                                    className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors" 
                                    title="Upload File" 
                                    aria-label="Upload File"
                                >
                                    <Paperclip size={20}/>
                                </button>
                                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                            </div>
                            
                            <input 
                                ref={inputRef} 
                                className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-gray-50 transition-all" 
                                placeholder={activeTab==='public' ? "Kirim pesan ke kelas..." : "Chat internal fasilitator..."} 
                                value={newMessage} 
                                onChange={handleInputChange} 
                                title="Input Pesan" 
                                aria-label="Ketik Pesan"
                                autoComplete="off" 
                            />
                            
                            <button 
                                type="submit" 
                                disabled={!newMessage.trim() && !attachment} 
                                className="text-white bg-red-600 hover:bg-red-700 p-2.5 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
                                title="Kirim Pesan" 
                                aria-label="Kirim Pesan"
                            >
                                <Send size={18}/>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Sidebar Anggota (Hanya tampil jika mode full/modal dan sidebar aktif) */}
                {showSidebar && !isFloating && (
                    <div className="w-72 bg-white border-l border-gray-200 flex flex-col shrink-0 animate-in slide-in-from-right">
                        <div className="p-3 border-b bg-gray-50 font-bold text-gray-700 text-xs uppercase tracking-wider flex justify-between items-center">
                            <span>Anggota ({activeMembers.length})</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                            {activeMembers.map((m: any, idx: number) => (
                                <button 
                                    type="button" 
                                    key={idx} 
                                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 group cursor-pointer transition-colors text-left" 
                                    onClick={() => insertMention(m.name)} 
                                    title={`Mention ${m.name}`}
                                >
                                    <div className="relative flex-shrink-0">
                                        {m.avatarUrl ? (
                                            <img src={getImageUrl(m.avatarUrl)} className="w-8 h-8 rounded-full object-cover border border-gray-200" alt={m.name} />
                                        ) : (
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${m.role==='Fasilitator'?'bg-purple-500':'bg-green-500'}`}>
                                                {m.name.charAt(0)}
                                            </div>
                                        )}
                                        {/* Status Dot (Optional) */}
                                        {/* <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full ${m.role==='Fasilitator'?'bg-purple-500':'bg-green-500'}`}></span> */}
                                    </div>
                                    <div className="flex-1 min-w-0 overflow-hidden">
                                        <p className="text-sm font-bold text-gray-800 truncate">{m.name}</p>
                                        <p className={`text-[10px] uppercase font-bold truncate ${m.role==='Fasilitator'?'text-purple-600':'text-gray-400'}`}>{m.role}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
// // // // // // 'use client';

// // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // import { Send, X, MessageCircle, ChevronLeft } from 'lucide-react';

// // // // // // export default function GlobalChatModal({ onClose }: { onClose: () => void }) {
// // // // // //   const { user } = useAuth();
  
// // // // // //   // STATE VIEW: 'list' = Daftar Chat, 'room' = Isi Chat
// // // // // //   const [view, setView] = useState<'list' | 'room'>('list');
// // // // // //   const [conversations, setConversations] = useState<any[]>([]);
// // // // // //   const [selectedUser, setSelectedUser] = useState<any>(null); // Lawan bicara
  
// // // // // //   // STATE CHAT ROOM
// // // // // //   const [messages, setMessages] = useState<any[]>([]);
// // // // // //   const [newMessage, setNewMessage] = useState('');
// // // // // //   const [sending, setSending] = useState(false);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // // //   // 1. LOAD DAFTAR PERCAKAPAN
// // // // // //   useEffect(() => {
// // // // // //     loadConversations();
// // // // // //   }, []);

// // // // // //   const loadConversations = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const res = await api('/api/chat/conversations');
// // // // // //       setConversations(res.conversations || []);
// // // // // //     } catch (e) {
// // // // // //       console.error(e);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // 2. LOAD ISI CHAT
// // // // // //   useEffect(() => {
// // // // // //     if (selectedUser && view === 'room') {
// // // // // //       loadMessages(selectedUser._id);
// // // // // //       const interval = setInterval(() => loadMessages(selectedUser._id), 3000);
// // // // // //       return () => clearInterval(interval);
// // // // // //     }
// // // // // //   }, [selectedUser, view]);

// // // // // //   useEffect(() => {
// // // // // //     if (view === 'room') messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // // //   }, [messages, view]);

// // // // // //   const loadMessages = async (userId: string) => {
// // // // // //     try {
// // // // // //       const res = await api(`/api/chat/${userId}`);
// // // // // //       setMessages(res.messages || []);
// // // // // //     } catch (e) { console.error(e); }
// // // // // //   };

// // // // // //   // 3. KIRIM PESAN
// // // // // //   const handleSend = async (e: React.FormEvent) => {
// // // // // //     e.preventDefault();
// // // // // //     if (!newMessage.trim() || !selectedUser) return;

// // // // // //     const tempMsg = { _id: Date.now(), sender: 'me', message: newMessage, createdAt: new Date().toISOString() };
// // // // // //     setMessages(prev => [...prev, tempMsg]);
// // // // // //     setNewMessage('');
// // // // // //     setSending(true);

// // // // // //     try {
// // // // // //       await api('/api/chat/send', {
// // // // // //         method: 'POST',
// // // // // //         body: { recipientId: selectedUser._id, message: tempMsg.message }
// // // // // //       });
// // // // // //       loadMessages(selectedUser._id); 
// // // // // //     } catch (e: any) { alert(e.message); } finally { setSending(false); }
// // // // // //   };

// // // // // //   const openChat = (targetUser: any) => {
// // // // // //     setSelectedUser(targetUser);
// // // // // //     setView('room');
// // // // // //   };

// // // // // //   const isMe = (msg: any) => {
// // // // // //     if (msg.sender === 'me') return true;
// // // // // //     const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
// // // // // //     return senderId === user?.id;
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200 backdrop-blur-sm">
// // // // // //       <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] border border-gray-200">
        
// // // // // //         {/* === HEADER === */}
// // // // // //         <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
// // // // // //           <div className="flex items-center gap-3">
// // // // // //             {view === 'room' && (
// // // // // //                /* [FIX A11Y] Added aria-label */
// // // // // //                <button 
// // // // // //                  onClick={() => { setView('list'); loadConversations(); }} 
// // // // // //                  className="hover:bg-indigo-700 p-1 rounded-full transition-colors"
// // // // // //                  aria-label="Kembali ke daftar pesan"
// // // // // //                >
// // // // // //                  <ChevronLeft size={24} />
// // // // // //                </button>
// // // // // //             )}
// // // // // //             <div className="font-bold flex items-center gap-2 text-lg">
// // // // // //                 {view === 'list' ? (
// // // // // //                     <> <MessageCircle size={20}/> Pesan Masuk </>
// // // // // //                 ) : (
// // // // // //                     <div className="flex items-center gap-3">
// // // // // //                         {/* [FIX A11Y] Added alt text */}
// // // // // //                         <img 
// // // // // //                             src={getImageUrl(selectedUser?.avatarUrl)} 
// // // // // //                             className="w-8 h-8 rounded-full bg-white/20 object-cover border border-white/50" 
// // // // // //                             alt={selectedUser?.name || "User Avatar"} 
// // // // // //                         />
// // // // // //                         <span className="truncate max-w-[150px]">{selectedUser?.name}</span>
// // // // // //                     </div>
// // // // // //                 )}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //           {/* [FIX A11Y] Added aria-label */}
// // // // // //           <button onClick={onClose} className="hover:bg-indigo-700 p-1.5 rounded-full transition-colors bg-white/10" aria-label="Tutup Chat">
// // // // // //             <X size={20} />
// // // // // //           </button>
// // // // // //         </div>

// // // // // //         {/* === BODY CONTENT === */}
// // // // // //         <div className="flex-1 bg-gray-50 overflow-hidden relative flex flex-col">
            
// // // // // //             {/* VIEW 1: DAFTAR CHAT (LIST) */}
// // // // // //             {view === 'list' && (
// // // // // //                 <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
// // // // // //                     {loading ? (
// // // // // //                         <div className="flex justify-center mt-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
// // // // // //                     ) : conversations.length === 0 ? (
// // // // // //                         <div className="text-center text-gray-400 mt-20 flex flex-col items-center">
// // // // // //                             <span className="text-4xl mb-2">📭</span>
// // // // // //                             <p>Belum ada pesan masuk.</p>
// // // // // //                         </div>
// // // // // //                     ) : (
// // // // // //                         conversations.map((conv: any) => (
// // // // // //                             <button 
// // // // // //                                 key={conv.user._id} 
// // // // // //                                 onClick={() => openChat(conv.user)}
// // // // // //                                 className="w-full flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-indigo-300 transition-all text-left group"
// // // // // //                             >
// // // // // //                                 <div className="relative">
// // // // // //                                     <img src={getImageUrl(conv.user.avatarUrl)} className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 group-hover:border-indigo-200" alt={conv.user.name} />
// // // // // //                                 </div>
// // // // // //                                 <div className="flex-1 min-w-0">
// // // // // //                                     <div className="flex justify-between items-center mb-1">
// // // // // //                                         <h4 className="font-bold text-gray-800 truncate text-sm">{conv.user.name}</h4>
// // // // // //                                         <span className="text-[10px] text-gray-400">{new Date(conv.lastMessage.createdAt).toLocaleDateString()}</span>
// // // // // //                                     </div>
// // // // // //                                     <p className="text-xs text-gray-500 truncate group-hover:text-indigo-600 transition-colors">
// // // // // //                                         {conv.lastMessage.sender === user?.id ? 'Anda: ' : ''}{conv.lastMessage.message}
// // // // // //                                     </p>
// // // // // //                                 </div>
// // // // // //                             </button>
// // // // // //                         ))
// // // // // //                     )}
// // // // // //                 </div>
// // // // // //             )}

// // // // // //             {/* VIEW 2: RUANG CHAT (ROOM) */}
// // // // // //             {view === 'room' && (
// // // // // //                 <>
// // // // // //                     <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3 bg-slate-100">
// // // // // //                         {messages.length === 0 ? (
// // // // // //                             <div className="text-center text-gray-400 text-xs mt-10">Mulai percakapan baru.</div>
// // // // // //                         ) : (
// // // // // //                             messages.map((msg: any, idx: number) => {
// // // // // //                                 const me = isMe(msg);
// // // // // //                                 return (
// // // // // //                                     <div key={idx} className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
// // // // // //                                         <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm relative ${me ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>
// // // // // //                                             <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
// // // // // //                                             <span className={`text-[9px] block text-right mt-1 ${me ? 'text-indigo-200' : 'text-gray-400'}`}>
// // // // // //                                                 {new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
// // // // // //                                             </span>
// // // // // //                                         </div>
// // // // // //                                     </div>
// // // // // //                                 );
// // // // // //                             })
// // // // // //                         )}
// // // // // //                         <div ref={messagesEndRef} />
// // // // // //                     </div>

// // // // // //                     {/* INPUT AREA */}
// // // // // //                     <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2 items-center">
// // // // // //                         <input 
// // // // // //                             className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 transition-all"
// // // // // //                             placeholder="Tulis pesan..."
// // // // // //                             value={newMessage}
// // // // // //                             onChange={e => setNewMessage(e.target.value)}
// // // // // //                             autoFocus
// // // // // //                         />
// // // // // //                         {/* [FIX A11Y] Added aria-label */}
// // // // // //                         <button 
// // // // // //                             disabled={sending || !newMessage.trim()} 
// // // // // //                             type="submit" 
// // // // // //                             className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 shadow-md transition-transform active:scale-95"
// // // // // //                             aria-label="Kirim Pesan"
// // // // // //                         >
// // // // // //                             <Send size={18} />
// // // // // //                         </button>
// // // // // //                     </form>
// // // // // //                 </>
// // // // // //             )}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // 'use client';

// // // // // import { useState, useEffect, useRef } from 'react';
// // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // import { Send, X, MessageCircle, ChevronLeft, Globe, Users } from 'lucide-react';

// // // // // export default function GlobalChatModal({ onClose }: { onClose: () => void }) {
// // // // //   const { user } = useAuth();
// // // // //   const [view, setView] = useState<'list' | 'room' | 'global'>('list');
// // // // //   const [conversations, setConversations] = useState<any[]>([]);
// // // // //   const [selectedUser, setSelectedUser] = useState<any>(null);
// // // // //   const [messages, setMessages] = useState<any[]>([]);
// // // // //   const [newMessage, setNewMessage] = useState('');
// // // // //   const [sending, setSending] = useState(false);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // //   useEffect(() => {
// // // // //     if (view === 'list') loadConversations();
// // // // //     if (view === 'global') loadGlobalMessages();
// // // // //   }, [view]);

// // // // //   useEffect(() => {
// // // // //     if (selectedUser && view === 'room') {
// // // // //       loadMessages(selectedUser._id);
// // // // //       const interval = setInterval(() => loadMessages(selectedUser._id), 3000);
// // // // //       return () => clearInterval(interval);
// // // // //     }
// // // // //   }, [selectedUser, view]);

// // // // //   useEffect(() => {
// // // // //     if (view !== 'list') messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // //   }, [messages, view]);

// // // // //   const loadConversations = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const res = await api('/api/chat/conversations');
// // // // //       setConversations(res.conversations || []);
// // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // //   };

// // // // //   const loadMessages = async (userId: string) => {
// // // // //     try {
// // // // //       const res = await api(`/api/chat/${userId}`);
// // // // //       setMessages(res.messages || []);
// // // // //     } catch (e) { console.error(e); }
// // // // //   };

// // // // //   const loadGlobalMessages = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const res = await api('/api/chat/global');
// // // // //       setMessages(res.messages || []);
// // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // //   };

// // // // //   const handleSend = async (e: React.FormEvent) => {
// // // // //     e.preventDefault();
// // // // //     if (!newMessage.trim()) return;

// // // // //     const isGlobalMode = view === 'global';
// // // // //     const tempMsg = { 
// // // // //       _id: Date.now().toString(), 
// // // // //       sender: { _id: user?.id, name: user?.name, avatarUrl: user?.avatarUrl }, 
// // // // //       message: newMessage, 
// // // // //       createdAt: new Date().toISOString() 
// // // // //     };

// // // // //     setMessages(prev => [...prev, tempMsg]);
// // // // //     setNewMessage('');
// // // // //     setSending(true);

// // // // //     try {
// // // // //       await api('/api/chat/send', {
// // // // //         method: 'POST',
// // // // //         body: { 
// // // // //           recipientId: isGlobalMode ? undefined : selectedUser?._id, 
// // // // //           message: tempMsg.message,
// // // // //           isGlobal: isGlobalMode
// // // // //         }
// // // // //       });
// // // // //       isGlobalMode ? loadGlobalMessages() : loadMessages(selectedUser._id);
// // // // //     } catch (e: any) { alert(e.message); } finally { setSending(false); }
// // // // //   };

// // // // //   const isMe = (msg: any) => {
// // // // //     const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
// // // // //     return senderId === user?.id || msg.sender === 'me';
// // // // //   };

// // // // //   return (
// // // // //     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60] p-4 backdrop-blur-sm animate-in fade-in duration-200">
// // // // //       <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] border border-gray-200">
        
// // // // //         {/* HEADER */}
// // // // //         <div className="bg-red-700 p-4 flex justify-between items-center text-white shadow-md">
// // // // //           <div className="flex items-center gap-3">
// // // // //             {view !== 'list' && (
// // // // //               <button onClick={() => setView('list')} className="hover:bg-red-800 p-1 rounded-full"><ChevronLeft size={24} /></button>
// // // // //             )}
// // // // //             <div className="font-bold flex items-center gap-2 text-lg">
// // // // //               {view === 'list' ? 'Pesan Masuk' : view === 'global' ? 'Global Chat' : selectedUser?.name}
// // // // //             </div>
// // // // //           </div>
// // // // //           <button onClick={onClose} className="hover:bg-red-800 p-1.5 rounded-full bg-white/10"><X size={20} /></button>
// // // // //         </div>

// // // // //         {/* TAB NAVIGATION (Hanya di List) */}
// // // // //         {view === 'list' && (
// // // // //           <div className="flex border-b bg-white text-sm">
// // // // //             <button onClick={() => setView('list')} className="flex-1 py-3 border-b-2 border-red-700 text-red-700 font-bold flex items-center justify-center gap-2 uppercase tracking-wider">
// // // // //               <Users size={16}/> Pribadi
// // // // //             </button>
// // // // //             <button onClick={() => setView('global')} className="flex-1 py-3 border-b-2 border-transparent text-gray-500 hover:text-red-700 font-bold flex items-center justify-center gap-2 uppercase tracking-wider transition-all">
// // // // //               <Globe size={16}/> Global
// // // // //             </button>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* BODY */}
// // // // //         <div className="flex-1 bg-gray-50 overflow-hidden flex flex-col">
// // // // //           {view === 'list' ? (
// // // // //             <div className="flex-1 overflow-y-auto p-2 space-y-2">
// // // // //               {loading ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700 mx-auto mt-10" /> :
// // // // //                 conversations.map((conv: any) => (
// // // // //                   <button key={conv.user._id} onClick={() => { setSelectedUser(conv.user); setView('room'); }} className="w-full flex items-center gap-4 p-3 bg-white border rounded-xl hover:shadow-md transition-all text-left">
// // // // //                     <img src={getImageUrl(conv.user.avatarUrl)} className="w-12 h-12 rounded-full object-cover" alt="" />
// // // // //                     <div className="flex-1 min-w-0">
// // // // //                       <h4 className="font-bold text-sm truncate">{conv.user.name}</h4>
// // // // //                       <p className="text-xs text-gray-500 truncate">{conv.lastMessage.message}</p>
// // // // //                     </div>
// // // // //                   </button>
// // // // //                 ))
// // // // //               }
// // // // //             </div>
// // // // //           ) : (
// // // // //             <>
// // // // //               <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-100 flex flex-col">
// // // // //                 {messages.map((msg, idx) => {
// // // // //                   const me = isMe(msg);
// // // // //                   return (
// // // // //                     <div key={idx} className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
// // // // //                       {!me && view === 'global' && (
// // // // //                         <img src={getImageUrl(msg.sender?.avatarUrl)} className="w-6 h-6 rounded-full mr-2 mt-auto mb-1" alt="" />
// // // // //                       )}
// // // // //                       <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${me ? 'bg-red-700 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'}`}>
// // // // //                         {view === 'global' && !me && <p className="text-[10px] font-bold text-red-700 mb-1">{msg.sender?.name}</p>}
// // // // //                         <p className="leading-relaxed">{msg.message}</p>
// // // // //                         <span className="text-[9px] block text-right mt-1 opacity-70">{new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   );
// // // // //                 })}
// // // // //                 <div ref={messagesEndRef} />
// // // // //               </div>
// // // // //               <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
// // // // //                 <input className="flex-1 border rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none" placeholder="Tulis pesan..." value={newMessage} onChange={e => setNewMessage(e.target.value)} />
// // // // //                 <button disabled={sending || !newMessage.trim()} type="submit" className="bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-800 transition-all active:scale-90 shadow-md">
// // // // //                   <Send size={18} />
// // // // //                 </button>
// // // // //               </form>
// // // // //             </>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import { useState, useEffect, useRef } from 'react';
// // // // import { api, getImageUrl } from '@/lib/api';
// // // // import { useAuth } from '@/lib/AuthProvider';
// // // // import { Send, X, MessageCircle, ChevronLeft, Users, Globe } from 'lucide-react';

// // // // export default function GlobalChatModal({ onClose }: { onClose: () => void }) {
// // // //   const { user } = useAuth();
  
// // // //   const [view, setView] = useState<'list' | 'room' | 'global'>('list');
// // // //   const [conversations, setConversations] = useState<any[]>([]);
// // // //   const [selectedUser, setSelectedUser] = useState<any>(null);
// // // //   const [messages, setMessages] = useState<any[]>([]);
// // // //   const [newMessage, setNewMessage] = useState('');
// // // //   const [sending, setSending] = useState(false);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const messagesEndRef = useRef<HTMLDivElement>(null);

// // // //   useEffect(() => {
// // // //     if (view === 'list') loadConversations();
// // // //     if (view === 'global') loadGlobalMessages();
// // // //   }, [view]);

// // // //   useEffect(() => {
// // // //     if (selectedUser && view === 'room') {
// // // //       loadMessages(selectedUser._id);
// // // //       const interval = setInterval(() => loadMessages(selectedUser._id), 3000);
// // // //       return () => clearInterval(interval);
// // // //     }
// // // //   }, [selectedUser, view]);

// // // //   useEffect(() => {
// // // //     if (view !== 'list') messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // //   }, [messages, view]);

// // // //   const loadConversations = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const res = await api('/api/chat/conversations');
// // // //       setConversations(res.conversations || []);
// // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // //   };

// // // //   const loadMessages = async (userId: string) => {
// // // //     try {
// // // //       const res = await api(`/api/chat/${userId}`);
// // // //       setMessages(res.messages || []);
// // // //     } catch (e) { console.error(e); }
// // // //   };

// // // //   const loadGlobalMessages = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const res = await api('/api/chat/global');
// // // //       setMessages(res.messages || []);
// // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // //   };

// // // //   const handleSend = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     if (!newMessage.trim()) return;

// // // //     const isGlobalMode = view === 'global';
// // // //     const tempMsg = { 
// // // //         _id: Date.now().toString(), 
// // // //         sender: { _id: user?.id, name: user?.name, avatarUrl: user?.avatarUrl }, 
// // // //         message: newMessage, 
// // // //         createdAt: new Date().toISOString() 
// // // //     };

// // // //     setMessages(prev => [...prev, tempMsg]);
// // // //     setNewMessage('');
// // // //     setSending(true);

// // // //     try {
// // // //       await api('/api/chat/send', {
// // // //         method: 'POST',
// // // //         body: { 
// // // //             recipientId: isGlobalMode ? undefined : selectedUser?._id, 
// // // //             message: tempMsg.message,
// // // //             isGlobal: isGlobalMode
// // // //         }
// // // //       });
// // // //       isGlobalMode ? loadGlobalMessages() : loadMessages(selectedUser._id); 
// // // //     } catch (e: any) { alert(e.message); } finally { setSending(false); }
// // // //   };

// // // //   const isMe = (msg: any) => {
// // // //     const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
// // // //     return senderId === user?.id || msg.sender === 'me';
// // // //   };

// // // //   return (
// // // //     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200 backdrop-blur-sm">
// // // //       <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] border border-gray-200">
        
// // // //         {/* === HEADER === */}
// // // //         <div className="bg-red-700 p-4 flex justify-between items-center text-white shadow-md z-10">
// // // //           <div className="flex items-center gap-3">
// // // //             {view !== 'list' && (
// // // //                <button 
// // // //                  onClick={() => { setView('list'); loadConversations(); }} 
// // // //                  className="hover:bg-red-800 p-1 rounded-full transition-colors"
// // // //                  aria-label="Kembali ke Daftar Chat"
// // // //                >
// // // //                  <ChevronLeft size={24} />
// // // //                </button>
// // // //             )}
// // // //             <div className="font-bold flex items-center gap-2 text-lg">
// // // //                 {view === 'list' ? (
// // // //                     <> <MessageCircle size={20}/> Chat </>
// // // //                 ) : (
// // // //                     <div className="flex items-center gap-3">
// // // //                         {view === 'global' ? <Globe size={20}/> : (
// // // //                             <img 
// // // //                                 src={getImageUrl(selectedUser?.avatarUrl)} 
// // // //                                 className="w-8 h-8 rounded-full bg-white/20 object-cover border border-white/50" 
// // // //                                 alt={selectedUser?.name || "User"} 
// // // //                             />
// // // //                         )}
// // // //                         <span className="truncate max-w-[150px]">{view === 'global' ? 'Global Chat' : selectedUser?.name}</span>
// // // //                     </div>
// // // //                 )}
// // // //             </div>
// // // //           </div>
// // // //           <button 
// // // //             onClick={onClose} 
// // // //             className="hover:bg-red-800 p-1.5 rounded-full transition-colors bg-white/10"
// // // //             aria-label="Tutup Chat"
// // // //           >
// // // //             <X size={20} />
// // // //           </button>
// // // //         </div>

// // // //         {/* TAB NAVIGATION (Hanya di List) */}
// // // //         {view === 'list' && (
// // // //           <div className="flex border-b bg-white text-sm">
// // // //             <button onClick={() => setView('list')} className="flex-1 py-3 border-b-2 border-red-700 text-red-700 font-bold flex items-center justify-center gap-2 uppercase tracking-wider">
// // // //               <Users size={16}/> Pribadi
// // // //             </button>
// // // //             <button onClick={() => setView('global')} className="flex-1 py-3 border-b-2 border-transparent text-gray-500 hover:text-red-700 font-bold flex items-center justify-center gap-2 uppercase tracking-wider transition-all">
// // // //               <Globe size={16}/> Global
// // // //             </button>
// // // //           </div>
// // // //         )}

// // // //         {/* === BODY CONTENT === */}
// // // //         <div className="flex-1 bg-gray-50 overflow-hidden relative flex flex-col">
            
// // // //             {/* VIEW 1: DAFTAR CHAT (LIST) */}
// // // //             {view === 'list' && (
// // // //                 <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
// // // //                     {loading ? (
// // // //                         <div className="flex justify-center mt-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div></div>
// // // //                     ) : conversations.length === 0 ? (
// // // //                         <div className="text-center text-gray-400 mt-20 flex flex-col items-center">
// // // //                             <span className="text-4xl mb-2">📭</span>
// // // //                             <p>Belum ada pesan masuk.</p>
// // // //                         </div>
// // // //                     ) : (
// // // //                         conversations.map((conv: any) => (
// // // //                             <button 
// // // //                                 key={conv.user._id} 
// // // //                                 onClick={() => { setSelectedUser(conv.user); setView('room'); }}
// // // //                                 className="w-full flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-red-300 transition-all text-left group"
// // // //                             >
// // // //                                 <div className="relative">
// // // //                                     <img src={getImageUrl(conv.user.avatarUrl)} className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 group-hover:border-red-200" alt={conv.user.name} />
// // // //                                 </div>
// // // //                                 <div className="flex-1 min-w-0">
// // // //                                     <div className="flex justify-between items-center mb-1">
// // // //                                         <h4 className="font-bold text-gray-800 truncate text-sm">{conv.user.name}</h4>
// // // //                                         <span className="text-[10px] text-gray-400">{new Date(conv.lastMessage.createdAt).toLocaleDateString()}</span>
// // // //                                     </div>
// // // //                                     <p className="text-xs text-gray-500 truncate group-hover:text-red-600 transition-colors">
// // // //                                         {conv.lastMessage.sender === user?.id ? 'Anda: ' : ''}{conv.lastMessage.message}
// // // //                                     </p>
// // // //                                 </div>
// // // //                             </button>
// // // //                         ))
// // // //                     )}
// // // //                 </div>
// // // //             )}

// // // //             {/* VIEW 2: RUANG CHAT (ROOM / GLOBAL) */}
// // // //             {view !== 'list' && (
// // // //                 <>
// // // //                     <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3 bg-slate-100">
// // // //                         {messages.length === 0 ? (
// // // //                             <div className="text-center text-gray-400 text-xs mt-10">Mulai percakapan baru.</div>
// // // //                         ) : (
// // // //                             messages.map((msg: any, idx: number) => {
// // // //                                 const me = isMe(msg);
// // // //                                 return (
// // // //                                     <div key={idx} className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
// // // //                                         {!me && view === 'global' && (
// // // //                                             <img src={getImageUrl(msg.sender?.avatarUrl)} className="w-6 h-6 rounded-full mr-2 mt-auto mb-1 object-cover" alt="" />
// // // //                                         )}
// // // //                                         <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm relative ${me ? 'bg-red-700 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>
// // // //                                             {view === 'global' && !me && <p className="text-[10px] font-bold text-red-700 mb-1">{msg.sender?.name}</p>}
// // // //                                             <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
// // // //                                             <span className={`text-[9px] block text-right mt-1 ${me ? 'text-red-200' : 'text-gray-400'}`}>
// // // //                                                 {new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
// // // //                                             </span>
// // // //                                         </div>
// // // //                                     </div>
// // // //                                 );
// // // //                             })
// // // //                         )}
// // // //                         <div ref={messagesEndRef} />
// // // //                     </div>

// // // //                     {/* INPUT AREA */}
// // // //                     <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2 items-center">
// // // //                         <input 
// // // //                             className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none bg-gray-50 transition-all"
// // // //                             placeholder="Tulis pesan..."
// // // //                             value={newMessage}
// // // //                             onChange={e => setNewMessage(e.target.value)}
// // // //                             autoFocus
// // // //                         />
// // // //                         <button 
// // // //                             disabled={sending || !newMessage.trim()} 
// // // //                             type="submit" 
// // // //                             className="bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-800 disabled:opacity-50 shadow-md transition-transform active:scale-95"
// // // //                             aria-label="Kirim Pesan"
// // // //                         >
// // // //                             <Send size={18} />
// // // //                         </button>
// // // //                     </form>
// // // //                 </>
// // // //             )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect, useRef } from 'react';
// // // import { api, getImageUrl } from '@/lib/api';
// // // import { useAuth } from '@/lib/AuthProvider';
// // // import { Send, X, MessageCircle, ChevronLeft, Users, Globe, Smile, Search } from 'lucide-react';
// // // import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'; // Import Emoji

// // // export default function GlobalChatModal({ onClose }: { onClose: () => void }) {
// // //   const { user } = useAuth();
  
// // //   // STATE VIEW
// // //   const [view, setView] = useState<'list' | 'room' | 'global'>('list');
// // //   const [conversations, setConversations] = useState<any[]>([]);
// // //   const [userDirectory, setUserDirectory] = useState<any[]>([]); // Daftar semua user
// // //   const [selectedUser, setSelectedUser] = useState<any>(null);
  
// // //   // STATE CHAT
// // //   const [messages, setMessages] = useState<any[]>([]);
// // //   const [newMessage, setNewMessage] = useState('');
// // //   const [sending, setSending] = useState(false);
// // //   const [loading, setLoading] = useState(true);
// // //   const [showEmoji, setShowEmoji] = useState(false); // State Emoji
// // //   const messagesEndRef = useRef<HTMLDivElement>(null);

// // //   // LOAD DATA AWAL
// // //   useEffect(() => {
// // //     if (view === 'list') loadConversations();
// // //     if (view === 'global') {
// // //         loadGlobalMessages();
// // //         loadUserDirectory(); // Load daftar user saat tab Global dibuka
// // //     }
// // //   }, [view]);

// // //   // AUTO REFRESH CHAT
// // //   useEffect(() => {
// // //     if (selectedUser && view === 'room') {
// // //       loadMessages(selectedUser._id);
// // //       const interval = setInterval(() => loadMessages(selectedUser._id), 3000);
// // //       return () => clearInterval(interval);
// // //     }
// // //     if (view === 'global') {
// // //         const interval = setInterval(loadGlobalMessages, 3000);
// // //         return () => clearInterval(interval);
// // //     }
// // //   }, [selectedUser, view]);

// // //   // SCROLL TO BOTTOM
// // //   useEffect(() => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   }, [messages, view]);

// // //   // --- API CALLS ---
// // //   const loadConversations = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await api('/api/chat/conversations');
// // //       setConversations(res.conversations || []);
// // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // //   };

// // //   const loadUserDirectory = async () => {
// // //     try {
// // //         const res = await api('/api/chat/users');
// // //         setUserDirectory(res.users || []);
// // //     } catch (e) { console.error(e); }
// // //   };

// // //   const loadMessages = async (userId: string) => {
// // //     try {
// // //       const res = await api(`/api/chat/${userId}`);
// // //       setMessages(res.messages || []);
// // //     } catch (e) { console.error(e); }
// // //   };

// // //   const loadGlobalMessages = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await api('/api/chat/global');
// // //       setMessages(res.messages || []);
// // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // //   };

// // //   // --- HANDLERS ---
// // //   const handleSend = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!newMessage.trim()) return;

// // //     const isGlobalMode = view === 'global';
// // //     setShowEmoji(false); // Tutup emoji saat kirim

// // //     const tempMsg = { 
// // //         _id: Date.now().toString(), 
// // //         sender: { _id: user?.id, name: user?.name, avatarUrl: user?.avatarUrl }, 
// // //         message: newMessage, 
// // //         createdAt: new Date().toISOString() 
// // //     };

// // //     setMessages(prev => [...prev, tempMsg]);
// // //     setNewMessage('');
// // //     setSending(true);

// // //     try {
// // //       await api('/api/chat/send', {
// // //         method: 'POST',
// // //         body: { 
// // //             recipientId: isGlobalMode ? undefined : selectedUser?._id, 
// // //             message: tempMsg.message,
// // //             isGlobal: isGlobalMode
// // //         }
// // //       });
// // //       isGlobalMode ? loadGlobalMessages() : loadMessages(selectedUser._id); 
// // //     } catch (e: any) { alert(e.message); } finally { setSending(false); }
// // //   };

// // //   const handleEmojiClick = (emojiData: EmojiClickData) => {
// // //     setNewMessage((prev) => prev + emojiData.emoji);
// // //   };

// // //   const handleMention = (name: string) => {
// // //     setNewMessage((prev) => prev + `@${name} `);
// // //   };

// // //   const isMe = (msg: any) => {
// // //     const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
// // //     return senderId === user?.id || msg.sender === 'me';
// // //   };

// // //   // PARSER TEXT UNTUK MENTION (Warna Biru)
// // //   const renderMessageContent = (text: string) => {
// // //     const parts = text.split(/(@\w+)/g); // Split berdasarkan @Nama
// // //     return parts.map((part, index) => 
// // //       part.match(/^@\w+/) ? (
// // //         <span key={index} className="text-blue-600 font-bold bg-blue-50 px-1 rounded">{part}</span>
// // //       ) : (
// // //         part
// // //       )
// // //     );
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200 backdrop-blur-sm">
// // //       {/* Lebarkan modal untuk Global View agar muat sidebar */}
// // //       <div className={`bg-white w-full ${view === 'global' ? 'max-w-4xl' : 'max-w-md'} rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] border border-gray-200 transition-all duration-300`}>
        
// // //         {/* HEADER */}
// // //         <div className="bg-red-700 p-4 flex justify-between items-center text-white shadow-md z-20">
// // //           <div className="flex items-center gap-3">
// // //             {view !== 'list' && (
// // //                <button onClick={() => { setView('list'); loadConversations(); }} className="hover:bg-red-800 p-1 rounded-full transition-colors" aria-label="Back">
// // //                  <ChevronLeft size={24} />
// // //                </button>
// // //             )}
// // //             <div className="font-bold flex items-center gap-2 text-lg">
// // //                 {view === 'list' && <><MessageCircle size={20}/> Pesan Masuk</>}
// // //                 {view === 'global' && <><Globe size={20}/> Global Room</>}
// // //                 {view === 'room' && (
// // //                     <div className="flex items-center gap-2">
// // //                         <img src={getImageUrl(selectedUser?.avatarUrl)} className="w-8 h-8 rounded-full border border-white" alt="u" />
// // //                         <span className="truncate max-w-[150px]">{selectedUser?.name}</span>
// // //                     </div>
// // //                 )}
// // //             </div>
// // //           </div>
// // //           <button onClick={onClose} className="hover:bg-red-800 p-1.5 rounded-full transition-colors bg-white/10" aria-label="Close">
// // //             <X size={20} />
// // //           </button>
// // //         </div>

// // //         {/* TAB NAVIGATION (Only in List) */}
// // //         {view === 'list' && (
// // //           <div className="flex border-b bg-white text-sm">
// // //             <button onClick={() => setView('list')} className="flex-1 py-3 border-b-2 border-red-700 text-red-700 font-bold flex items-center justify-center gap-2 uppercase tracking-wider">
// // //               <Users size={16}/> Pribadi
// // //             </button>
// // //             <button onClick={() => setView('global')} className="flex-1 py-3 border-b-2 border-transparent text-gray-500 hover:text-red-700 font-bold flex items-center justify-center gap-2 uppercase tracking-wider transition-all">
// // //               <Globe size={16}/> Global
// // //             </button>
// // //           </div>
// // //         )}

// // //         {/* MAIN BODY */}
// // //         <div className="flex-1 bg-gray-50 overflow-hidden relative flex flex-row">
            
// // //             {/* LEFT SIDE: CHAT AREA */}
// // //             <div className="flex-1 flex flex-col relative">
                
// // //                 {/* 1. LIST CONVERSATION VIEW */}
// // //                 {view === 'list' && (
// // //                     <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
// // //                         {loading ? (
// // //                             <div className="flex justify-center mt-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div></div>
// // //                         ) : conversations.length === 0 ? (
// // //                             <div className="text-center text-gray-400 mt-20 flex flex-col items-center">
// // //                                 <span className="text-4xl mb-2">📭</span>
// // //                                 <p>Belum ada pesan masuk.</p>
// // //                             </div>
// // //                         ) : (
// // //                             conversations.map((conv: any) => (
// // //                                 <button key={conv.user._id} onClick={() => { setSelectedUser(conv.user); setView('room'); }} className="w-full flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-red-300 transition-all text-left group">
// // //                                     <img src={getImageUrl(conv.user.avatarUrl)} className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 group-hover:border-red-200" alt={conv.user.name} />
// // //                                     <div className="flex-1 min-w-0">
// // //                                         <div className="flex justify-between items-center mb-1">
// // //                                             <h4 className="font-bold text-gray-800 truncate text-sm">{conv.user.name}</h4>
// // //                                             <span className="text-[10px] text-gray-400">{new Date(conv.lastMessage.createdAt).toLocaleDateString()}</span>
// // //                                         </div>
// // //                                         <p className="text-xs text-gray-500 truncate group-hover:text-red-600 transition-colors">
// // //                                             {conv.lastMessage.sender === user?.id ? 'Anda: ' : ''}{conv.lastMessage.message}
// // //                                         </p>
// // //                                     </div>
// // //                                 </button>
// // //                             ))
// // //                         )}
// // //                     </div>
// // //                 )}

// // //                 {/* 2. CHAT ROOM VIEW (GLOBAL / PRIVATE) */}
// // //                 {view !== 'list' && (
// // //                     <>
// // //                         <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3 bg-slate-100">
// // //                             {messages.map((msg: any, idx: number) => {
// // //                                 const me = isMe(msg);
// // //                                 return (
// // //                                     <div key={idx} className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
// // //                                         {!me && view === 'global' && (
// // //                                             <img src={getImageUrl(msg.sender?.avatarUrl)} className="w-8 h-8 rounded-full mr-2 mt-auto mb-1 object-cover border border-gray-300" alt="" />
// // //                                         )}
// // //                                         <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm relative ${me ? 'bg-red-700 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>
// // //                                             {view === 'global' && !me && (
// // //                                                 <div className="flex justify-between items-center mb-1 gap-2">
// // //                                                     <p className="text-[10px] font-bold text-red-700 cursor-pointer hover:underline" onClick={() => handleMention(msg.sender?.name)}>
// // //                                                         {msg.sender?.name}
// // //                                                     </p>
// // //                                                     {/* Tombol PM dari Global Chat */}
// // //                                                     <button onClick={() => { setSelectedUser(msg.sender); setView('room'); }} className="text-[9px] bg-gray-100 px-1.5 rounded border hover:bg-gray-200 text-gray-500">
// // //                                                         PM
// // //                                                     </button>
// // //                                                 </div>
// // //                                             )}
                                            
// // //                                             {/* RENDER PESAN DENGAN PARSER MENTION */}
// // //                                             <p className="leading-relaxed whitespace-pre-wrap">{renderMessageContent(msg.message)}</p>
                                            
// // //                                             <span className={`text-[9px] block text-right mt-1 ${me ? 'text-red-200' : 'text-gray-400'}`}>
// // //                                                 {new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
// // //                                             </span>
// // //                                         </div>
// // //                                     </div>
// // //                                 );
// // //                             })}
// // //                             <div ref={messagesEndRef} />
// // //                         </div>

// // //                         {/* INPUT AREA */}
// // //                         <div className="p-3 bg-white border-t relative">
// // //                             {showEmoji && (
// // //                                 <div className="absolute bottom-16 left-2 z-30 shadow-2xl">
// // //                                     <EmojiPicker onEmojiClick={handleEmojiClick} height={350} width={300} />
// // //                                 </div>
// // //                             )}
// // //                             <form onSubmit={handleSend} className="flex gap-2 items-center">
// // //                                 <button 
// // //                                     type="button" 
// // //                                     onClick={() => setShowEmoji(!showEmoji)} 
// // //                                     className="text-gray-400 hover:text-yellow-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
// // //                                     aria-label="Emoji"
// // //                                 >
// // //                                     <Smile size={24} />
// // //                                 </button>
// // //                                 <input 
// // //                                     className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none bg-gray-50 transition-all"
// // //                                     placeholder={view === 'global' ? "Kirim ke semua orang... (@user untuk mention)" : "Tulis pesan pribadi..."}
// // //                                     value={newMessage}
// // //                                     onChange={e => setNewMessage(e.target.value)}
// // //                                     autoFocus
// // //                                 />
// // //                                 <button 
// // //                                     disabled={sending || !newMessage.trim()} 
// // //                                     type="submit" 
// // //                                     className="bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-800 disabled:opacity-50 shadow-md transition-transform active:scale-95"
// // //                                     aria-label="Send"
// // //                                 >
// // //                                     <Send size={18} />
// // //                                 </button>
// // //                             </form>
// // //                         </div>
// // //                     </>
// // //                 )}
// // //             </div>

// // //             {/* RIGHT SIDE: USER LIST (ONLY IN GLOBAL VIEW) */}
// // //             {view === 'global' && (
// // //                 <div className="w-1/3 min-w-[200px] border-l border-gray-200 bg-white flex flex-col hidden md:flex">
// // //                     <div className="p-3 border-b bg-gray-50 font-bold text-gray-700 text-sm flex items-center gap-2">
// // //                         <Users size={16}/> Peserta ({userDirectory.length})
// // //                     </div>
// // //                     <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
// // //                         {userDirectory.map((usr: any) => (
// // //                             <button 
// // //                                 key={usr._id} 
// // //                                 onClick={() => { setSelectedUser(usr); setView('room'); }}
// // //                                 className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all text-left group"
// // //                             >
// // //                                 <div className="relative">
// // //                                     <img src={getImageUrl(usr.avatarUrl)} className="w-8 h-8 rounded-full object-cover border border-gray-200" alt={usr.name} />
// // //                                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
// // //                                 </div>
// // //                                 <div className="flex-1 min-w-0">
// // //                                     <p className="text-sm font-medium text-gray-700 truncate group-hover:text-red-700">{usr.name}</p>
// // //                                     <p className="text-[10px] text-gray-400 capitalize">{usr.role?.toLowerCase()}</p>
// // //                                 </div>
// // //                             </button>
// // //                         ))}
// // //                     </div>
// // //                 </div>
// // //             )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { api, getImageUrl } from '@/lib/api';
// // import { useAuth } from '@/lib/AuthProvider';
// // import { Send, X, MessageCircle, ChevronLeft, Users, Globe, Smile, ChevronRight } from 'lucide-react';
// // import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

// // export default function GlobalChatModal({ onClose }: { onClose: () => void }) {
// //   const { user } = useAuth();
  
// //   // STATE VIEW
// //   const [view, setView] = useState<'list' | 'room' | 'global'>('list');
// //   const [conversations, setConversations] = useState<any[]>([]);
// //   const [userDirectory, setUserDirectory] = useState<any[]>([]); // Daftar semua user untuk Member List
// //   const [selectedUser, setSelectedUser] = useState<any>(null);
  
// //   // STATE UI
// //   const [showMembers, setShowMembers] = useState(false); // Toggle Sidebar Member
  
// //   // STATE CHAT & MENTION
// //   const [messages, setMessages] = useState<any[]>([]);
// //   const [newMessage, setNewMessage] = useState('');
// //   const [sending, setSending] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [showEmoji, setShowEmoji] = useState(false);
  
// //   // Mention States
// //   const [mentionQuery, setMentionQuery] = useState('');
// //   const [showMentionPopup, setShowMentionPopup] = useState(false);
// //   const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

// //   const messagesEndRef = useRef<HTMLDivElement>(null);
// //   const inputRef = useRef<HTMLInputElement>(null);

// //   // LOAD DATA AWAL
// //   useEffect(() => {
// //     loadUserDirectory(); // Selalu load user untuk keperluan Mention & Member List
// //     if (view === 'list') loadConversations();
// //     if (view === 'global') {
// //         loadGlobalMessages();
// //     }
// //   }, [view]);

// //   // AUTO REFRESH CHAT
// //   useEffect(() => {
// //     if (selectedUser && view === 'room') {
// //       loadMessages(selectedUser._id);
// //       const interval = setInterval(() => loadMessages(selectedUser._id), 3000);
// //       return () => clearInterval(interval);
// //     }
// //     if (view === 'global') {
// //         const interval = setInterval(loadGlobalMessages, 3000);
// //         return () => clearInterval(interval);
// //     }
// //   }, [selectedUser, view]);

// //   // SCROLL TO BOTTOM
// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages, view]);

// //   // --- API CALLS ---
// //   const loadConversations = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await api('/api/chat/conversations');
// //       setConversations(res.conversations || []);
// //     } catch (e) { console.error(e); } finally { setLoading(false); }
// //   };

// //   const loadUserDirectory = async () => {
// //     try {
// //         const res = await api('/api/chat/users');
// //         setUserDirectory(res.users || []);
// //     } catch (e) { console.error(e); }
// //   };

// //   const loadMessages = async (userId: string) => {
// //     try {
// //       const res = await api(`/api/chat/${userId}`);
// //       setMessages(res.messages || []);
// //     } catch (e) { console.error(e); }
// //   };

// //   const loadGlobalMessages = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await api('/api/chat/global');
// //       setMessages(res.messages || []);
// //     } catch (e) { console.error(e); } finally { setLoading(false); }
// //   };

// //   // --- HANDLERS ---
// //   const handleSend = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!newMessage.trim()) return;

// //     const isGlobalMode = view === 'global';
// //     setShowEmoji(false); 
// //     setShowMentionPopup(false);

// //     const tempMsg = { 
// //         _id: Date.now().toString(),
// //         sender: { _id: user?.id, name: user?.name, avatarUrl: user?.avatarUrl }, 
// //         message: newMessage, 
// //         createdAt: new Date().toISOString()
// //     };

// //     setMessages(prev => [...prev, tempMsg]);
// //     setNewMessage('');
// //     setSending(true);

// //     try {
// //       await api('/api/chat/send', {
// //         method: 'POST',
// //         body: { 
// //             recipientId: isGlobalMode ? undefined : selectedUser?._id, 
// //             message: tempMsg.message,
// //             isGlobal: isGlobalMode
// //         }
// //       });
// //       isGlobalMode ? loadGlobalMessages() : loadMessages(selectedUser._id); 
// //     } catch (e: any) { alert(e.message); } finally { setSending(false); }
// //   };

// //   // --- MENTION LOGIC ---
// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //       const val = e.target.value;
// //       setNewMessage(val);

// //       // Cek kata terakhir untuk mention
// //       const lastWord = val.split(' ').pop();
// //       if (lastWord && lastWord.startsWith('@') && lastWord.length > 1) {
// //           const query = lastWord.substring(1).toLowerCase();
// //           setMentionQuery(query);
// //           const filtered = userDirectory.filter(u => u.name.toLowerCase().includes(query));
// //           setFilteredUsers(filtered);
// //           setShowMentionPopup(filtered.length > 0);
// //       } else {
// //           setShowMentionPopup(false);
// //       }
// //   };

// //   const insertMention = (name: string) => {
// //       const words = newMessage.split(' ');
// //       words.pop(); // Hapus @query terakhir
// //       const newText = words.join(' ') + ` @${name} `;
// //       setNewMessage(newText);
// //       setShowMentionPopup(false);
// //       inputRef.current?.focus();
// //   };

// //   const handleEmojiClick = (emojiData: EmojiClickData) => {
// //     setNewMessage((prev) => prev + emojiData.emoji);
// //   };

// //   const isMe = (msg: any) => {
// //     const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
// //     return senderId === user?.id || msg.sender === 'me';
// //   };

// //   // PARSER TEXT UNTUK MENTION (Warna Biru)
// //   const renderMessageContent = (text: string) => {
// //     const parts = text.split(/(@[\w\s]+)/g); // Split sederhana
// //     return parts.map((part, index) => {
// //         // Cek apakah part adalah mention valid (ada di directory atau format @Nama)
// //         if (part.startsWith('@')) {
// //              return <span key={index} className="text-blue-600 font-bold bg-blue-50 px-1 rounded cursor-pointer hover:underline">{part}</span>
// //         }
// //         return part;
// //     });
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200 backdrop-blur-sm">
// //       <div className={`bg-white w-full ${view === 'global' || view === 'room' ? 'max-w-5xl' : 'max-w-md'} rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[650px] border border-gray-200 transition-all duration-300`}>
        
// //         {/* HEADER */}
// //         <div className="bg-red-700 p-4 flex justify-between items-center text-white shadow-md z-20">
// //           <div className="flex items-center gap-3">
// //             {view !== 'list' && (
// //               <button 
// //                 onClick={() => { setView('list'); loadConversations(); }} 
// //                 className="hover:bg-red-800 p-1 rounded-full transition-colors" 
// //                 aria-label="Kembali ke Daftar Pesan"
// //                 title="Kembali"
// //               >
// //                 <ChevronLeft size={24} />
// //               </button>
// //             )}
// //             <div className="font-bold flex items-center gap-2 text-lg">
// //               {view === 'list' && <><MessageCircle size={20}/> Pesan Masuk</>}
// //               {view === 'global' && <><Globe size={20}/> Global Room</>}
// //               {view === 'room' && (
// //                   <div className="flex items-center gap-2">
// //                       <img src={getImageUrl(selectedUser?.avatarUrl)} className="w-8 h-8 rounded-full border border-white" alt="u" />
// //                       <span className="truncate max-w-[150px]">{selectedUser?.name}</span>
// //                   </div>
// //               )}
// //             </div>
// //           </div>
          
// //           <div className="flex items-center gap-2">
// //               {/* Tombol Toggle Member List (Hanya di mode Room/Global) */}
// //               {(view === 'global' || view === 'room') && (
// //                   <button 
// //                     onClick={() => setShowMembers(!showMembers)} 
// //                     className={`p-2 rounded-full transition-colors ${showMembers ? 'bg-white text-red-700' : 'hover:bg-red-800 text-white'}`} 
// //                     title="Daftar Anggota"
// //                     aria-label="Daftar Anggota"
// //                   >
// //                       <Users size={20} />
// //                   </button>
// //               )}
// //               <button 
// //                 onClick={onClose} 
// //                 className="hover:bg-red-800 p-1.5 rounded-full transition-colors bg-white/10" 
// //                 aria-label="Tutup Modal Chat"
// //                 title="Tutup"
// //               >
// //                 <X size={20} />
// //               </button>
// //           </div>
// //         </div>

// //         {/* TAB NAVIGATION (Only in List) */}
// //         {view === 'list' && (
// //           <div className="flex border-b bg-white text-sm">
// //             <button 
// //                 onClick={() => setView('list')} 
// //                 className="flex-1 py-3 border-b-2 border-red-700 text-red-700 font-bold flex items-center justify-center gap-2 uppercase tracking-wider"
// //                 title="Chat Pribadi"
// //             >
// //               <Users size={16}/> Pribadi
// //             </button>
// //             <button 
// //                 onClick={() => setView('global')} 
// //                 className="flex-1 py-3 border-b-2 border-transparent text-gray-500 hover:text-red-700 font-bold flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
// //                 title="Chat Global"
// //             >
// //               <Globe size={16}/> Global
// //             </button>
// //           </div>
// //         )}

// //         {/* MAIN BODY (FLEX ROW) */}
// //         <div className="flex-1 bg-gray-50 overflow-hidden relative flex flex-row">
            
// //             {/* LEFT SIDE: CHAT AREA */}
// //             <div className="flex-1 flex flex-col relative min-w-0">
              
// //               {/* 1. LIST CONVERSATION VIEW */}
// //               {view === 'list' && (
// //                   <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
// //                       {loading ? (
// //                           <div className="flex justify-center mt-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div></div>
// //                       ) : conversations.length === 0 ? (
// //                           <div className="text-center text-gray-400 mt-20 flex flex-col items-center">
// //                               <span className="text-4xl mb-2">📭</span>
// //                               <p>Belum ada pesan masuk.</p>
// //                           </div>
// //                       ) : (
// //                           conversations.map((conv: any) => (
// //                               <button key={conv.user._id} onClick={() => { setSelectedUser(conv.user); setView('room'); }} className="w-full flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-red-300 transition-all text-left group" title={`Chat dengan ${conv.user.name}`}>
// //                                   <img src={getImageUrl(conv.user.avatarUrl)} className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 group-hover:border-red-200" alt={conv.user.name} />
// //                                   <div className="flex-1 min-w-0">
// //                                       <div className="flex justify-between items-center mb-1">
// //                                           <h4 className="font-bold text-gray-800 truncate text-sm">{conv.user.name}</h4>
// //                                           <span className="text-[10px] text-gray-400">{new Date(conv.lastMessage.createdAt).toLocaleDateString()}</span>
// //                                       </div>
// //                                       <p className="text-xs text-gray-500 truncate group-hover:text-red-600 transition-colors">
// //                                           {conv.lastMessage.sender === user?.id ? 'Anda: ' : ''}{conv.lastMessage.message}
// //                                       </p>
// //                                   </div>
// //                               </button>
// //                           ))
// //                       )}
// //                   </div>
// //               )}

// //               {/* 2. CHAT ROOM VIEW (GLOBAL / PRIVATE) */}
// //               {view !== 'list' && (
// //                   <>
// //                       <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3 bg-slate-100 relative">
// //                           {messages.map((msg: any, idx: number) => {
// //                               const me = isMe(msg);
// //                               return (
// //                                   <div key={idx} className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
// //                                       {!me && (
// //                                           <img src={getImageUrl(msg.sender?.avatarUrl)} className="w-8 h-8 rounded-full mr-2 mt-auto mb-1 object-cover border border-gray-300" alt="" />
// //                                       )}
// //                                       <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm relative ${me ? 'bg-red-700 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>
// //                                           {!me && (
// //                                               <div className="flex justify-between items-center mb-1 gap-2">
// //                                                   <p className="text-[10px] font-bold text-red-700 cursor-pointer hover:underline" onClick={() => insertMention(msg.sender?.name)}>
// //                                                       {msg.sender?.name}
// //                                                   </p>
// //                                                   {view === 'global' && (
// //                                                       <button 
// //                                                         onClick={() => { setSelectedUser(msg.sender); setView('room'); }} 
// //                                                         className="text-[9px] bg-gray-100 px-1.5 rounded border hover:bg-gray-200 text-gray-500"
// //                                                         title="Kirim Pesan Pribadi"
// //                                                       >
// //                                                         PM
// //                                                       </button>
// //                                                   )}
// //                                               </div>
// //                                           )}
// //                                           <p className="leading-relaxed whitespace-pre-wrap">{renderMessageContent(msg.message)}</p>
// //                                           <span className={`text-[9px] block text-right mt-1 ${me ? 'text-red-200' : 'text-gray-400'}`}>
// //                                               {new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
// //                                           </span>
// //                                       </div>
// //                                   </div>
// //                               );
// //                           })}
// //                           <div ref={messagesEndRef} />
                          
// //                           {/* MENTION POPUP */}
// //                           {showMentionPopup && (
// //                               <div className="absolute bottom-2 left-4 bg-white border border-gray-200 shadow-xl rounded-lg w-64 max-h-48 overflow-y-auto z-50">
// //                                   {filteredUsers.map(u => (
// //                                       <button key={u._id} onClick={() => insertMention(u.name)} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm" title={`Mention @${u.name}`}>
// //                                           <img src={getImageUrl(u.avatarUrl)} className="w-6 h-6 rounded-full" alt="" />
// //                                           <span className="truncate font-medium">{u.name}</span>
// //                                       </button>
// //                                   ))}
// //                               </div>
// //                           )}
// //                       </div>

// //                       {/* INPUT AREA */}
// //                       <div className="p-3 bg-white border-t relative">
// //                           {showEmoji && (
// //                               <div className="absolute bottom-16 left-2 z-30 shadow-2xl">
// //                                   <EmojiPicker onEmojiClick={handleEmojiClick} height={350} width={300} />
// //                               </div>
// //                           )}
// //                           <form onSubmit={handleSend} className="flex gap-2 items-center">
// //                               <button 
// //                                 type="button" 
// //                                 onClick={() => setShowEmoji(!showEmoji)} 
// //                                 className="text-gray-400 hover:text-yellow-500 p-2 rounded-full hover:bg-gray-100 transition-colors" 
// //                                 aria-label="Buka Emoji"
// //                                 title="Buka Emoji"
// //                               >
// //                                   <Smile size={24} />
// //                               </button>
// //                               <input 
// //                                   ref={inputRef}
// //                                   className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none bg-gray-50 transition-all"
// //                                   placeholder={view === 'global' ? "Kirim ke semua orang... (@user untuk mention)" : "Tulis pesan pribadi..."}
// //                                   value={newMessage}
// //                                   onChange={handleInputChange}
// //                                   autoFocus
// //                                   aria-label="Ketik Pesan"
// //                                   title="Ketik Pesan"
// //                               />
// //                               <button 
// //                                 disabled={sending || !newMessage.trim()} 
// //                                 type="submit" 
// //                                 className="bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-800 disabled:opacity-50 shadow-md transition-transform active:scale-95" 
// //                                 aria-label="Kirim Pesan"
// //                                 title="Kirim"
// //                               >
// //                                   <Send size={18} />
// //                               </button>
// //                           </form>
// //                       </div>
// //                   </>
// //               )}
// //             </div>

// //             {/* RIGHT SIDE: USER LIST (SIDEBAR) */}
// //             {/* Muncul jika showMembers=true di mode Room/Global */}
// //             {(view !== 'list' && showMembers) && (
// //               <div className="w-64 border-l border-gray-200 bg-white flex flex-col animate-in slide-in-from-right-10">
// //                   <div className="p-3 border-b bg-gray-50 font-bold text-gray-700 text-sm flex items-center justify-between">
// //                       <div className="flex items-center gap-2"><Users size={16}/> Anggota ({userDirectory.length})</div>
                      
// //                       {/* [FIXED] Added title and aria-label for accessibility */}
// //                       <button 
// //                         onClick={() => setShowMembers(false)} 
// //                         className="md:hidden text-gray-500 hover:bg-gray-200 p-1 rounded"
// //                         title="Tutup Sidebar"
// //                         aria-label="Tutup Sidebar"
// //                       >
// //                         <X size={16}/>
// //                       </button>
// //                   </div>
// //                   <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
// //                       {userDirectory.map((usr: any) => (
// //                           <button key={usr._id} onClick={() => { setSelectedUser(usr); setView('room'); }} className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all text-left group" title={`Chat dengan ${usr.name}`}>
// //                               <div className="relative">
// //                                   <img src={getImageUrl(usr.avatarUrl)} className="w-8 h-8 rounded-full object-cover border border-gray-200" alt={usr.name} />
// //                                   <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
// //                               </div>
// //                               <div className="flex-1 min-w-0">
// //                                   <p className="text-sm font-medium text-gray-700 truncate group-hover:text-red-700">{usr.name}</p>
// //                                   <p className="text-[10px] text-gray-400 capitalize">{usr.role?.toLowerCase()}</p>
// //                               </div>
// //                           </button>
// //                       ))}
// //                   </div>
// //               </div>
// //             )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { api, getImageUrl } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';
// import { 
//     X, Send, MessageCircle, Globe, Smile, User, ChevronLeft
// } from 'lucide-react';
// import dynamic from 'next/dynamic';

// const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

// interface GlobalChatModalProps {
//     onClose: () => void;
// }

// export default function GlobalChatModal({ onClose }: GlobalChatModalProps) {
//     const { user } = useAuth();
    
//     // UI State
//     const [activeTab, setActiveTab] = useState<'global' | 'personal'>('global');
//     const [selectedUser, setSelectedUser] = useState<any>(null); // User yang dipilih di tab personal
    
//     // Chat Data
//     const [messages, setMessages] = useState<any[]>([]);
//     const [conversations, setConversations] = useState<any[]>([]); // List user untuk tab personal
    
//     // Input State
//     const [inputText, setInputText] = useState('');
//     const [isSending, setIsSending] = useState(false);
//     const messagesEndRef = useRef<HTMLDivElement>(null);
//     const [showEmoji, setShowEmoji] = useState(false);
    
//     // --- LOAD DATA ---
    
//     // 1. Load Conversations (List User)
//     const loadConversations = async () => {
//         try {
//             const res = await api('/api/chat/conversations');
//             setConversations(Array.isArray(res) ? res : []);
//         } catch (e) { console.error("Gagal load conversations", e); }
//     };

//     // 2. Load Messages (Global or Personal)
//     const loadMessages = async () => {
//         try {
//             let res;
//             if (activeTab === 'global') {
//                 res = await api('/api/chat/global');
//             } else if (activeTab === 'personal' && selectedUser) {
//                 res = await api(`/api/chat/${selectedUser._id}`);
//             }

//             // Normalisasi response
//             const newMsgs = activeTab === 'personal' ? (res.messages || []) : (Array.isArray(res) ? res : []);
            
//             setMessages(prev => {
//                 if (JSON.stringify(newMsgs) !== JSON.stringify(prev)) {
//                     setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
//                     return newMsgs;
//                 }
//                 return prev;
//             });
//         } catch (e) { console.error("Gagal load messages", e); }
//     };

//     // Polling & Initial Load
//     useEffect(() => {
//         if (activeTab === 'personal' && !selectedUser) {
//             loadConversations();
//         } else {
//             loadMessages();
//             const interval = setInterval(loadMessages, 3000);
//             return () => clearInterval(interval);
//         }
//     }, [activeTab, selectedUser]);

//     // --- SEND MESSAGE ---
//     const handleSend = async (e?: React.FormEvent) => {
//         e?.preventDefault();
//         if (!inputText.trim() || isSending) return;

//         setIsSending(true);
//         try {
//             const payload: any = { message: inputText };
            
//             if (activeTab === 'global') {
//                 payload.type = 'global';
//                 payload.topic = null;
//             } else if (selectedUser) {
//                 payload.type = 'personal';
//                 payload.recipientId = selectedUser._id;
//             }

//             await api('/api/chat/send', { method: 'POST', body: payload });
//             setInputText('');
//             setShowEmoji(false);
//             loadMessages();
//         } catch (error: any) {
//             alert("Gagal kirim: " + error.message);
//         } finally {
//             setIsSending(false);
//         }
//     };

//     const onEmojiClick = (emojiData: any) => {
//         setInputText(prev => prev + emojiData.emoji);
//     };

//     return (
//         <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Global Chat">
//             <div className="bg-white w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex overflow-hidden animate-in zoom-in-95 flex-col md:flex-row">
                
//                 {/* --- SIDEBAR (TAB SWITCHER & USER LIST) --- */}
//                 <div className="w-full md:w-1/4 bg-gray-50 border-r border-gray-200 flex flex-col">
//                     {/* Header Tabs */}
//                     <div className="flex border-b border-gray-200">
//                         <button 
//                             onClick={() => { setActiveTab('global'); setSelectedUser(null); }}
//                             className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'global' ? 'bg-white text-red-700 border-b-2 border-red-700' : 'text-gray-500 hover:bg-gray-100'}`}
//                         >
//                             Global
//                         </button>
//                         <button 
//                             onClick={() => setActiveTab('personal')}
//                             className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'personal' ? 'bg-white text-red-700 border-b-2 border-red-700' : 'text-gray-500 hover:bg-gray-100'}`}
//                         >
//                             Pribadi
//                         </button>
//                     </div>

//                     {/* Content Sidebar */}
//                     <div className="flex-1 overflow-y-auto custom-scrollbar">
//                         {activeTab === 'global' ? (
//                             <div className="p-6 text-center text-gray-400">
//                                 <Globe size={48} className="mx-auto mb-3 opacity-20"/>
//                                 <p className="text-xs">Chat publik untuk semua pengguna.</p>
//                             </div>
//                         ) : (
//                             // List User untuk Personal Chat
//                             <div className="flex flex-col">
//                                 {conversations.map(u => (
//                                     <button 
//                                         key={u._id} 
//                                         onClick={() => setSelectedUser(u)}
//                                         className={`flex items-center gap-3 p-3 text-left hover:bg-gray-100 border-b border-gray-100 transition-colors ${selectedUser?._id === u._id ? 'bg-red-50' : ''}`}
//                                     >
//                                         {u.avatarUrl ? <img src={getImageUrl(u.avatarUrl)} className="w-8 h-8 rounded-full object-cover" alt={u.name}/> : <div className="w-8 h-8 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xs">{u.name?.charAt(0)}</div>}
//                                         <div>
//                                             <p className="text-sm font-bold text-gray-800 truncate max-w-[120px]">{u.name}</p>
//                                             <p className="text-[10px] text-gray-500 uppercase">{u.role}</p>
//                                         </div>
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* --- CHAT AREA --- */}
//                 <div className="flex-1 flex flex-col min-w-0 bg-white relative">
                    
//                     {/* Header Chat Area */}
//                     <div className="h-16 bg-red-900 text-white px-6 flex items-center justify-between shrink-0 shadow-md">
//                         <div className="flex items-center gap-3">
//                             {/* [FIX] Added Title & Aria-Label for Back Button */}
//                             {selectedUser && (
//                                 <button onClick={() => setSelectedUser(null)} className="md:hidden mr-2" title="Kembali" aria-label="Kembali"><ChevronLeft/></button>
//                             )}
                            
//                             {activeTab === 'global' ? <Globe size={24} className="text-red-200" /> : <User size={24} className="text-red-200" />}
//                             <div>
//                                 <h3 className="font-bold text-lg leading-none">
//                                     {activeTab === 'global' ? 'Global Room' : (selectedUser ? selectedUser.name : 'Pilih Pengguna')}
//                                 </h3>
//                                 <span className="text-[10px] text-red-200 uppercase tracking-wider">
//                                     {activeTab === 'global' ? 'Semua Pengguna' : (selectedUser ? 'Chat Pribadi' : 'Daftar Kontak')}
//                                 </span>
//                             </div>
//                         </div>
                        
//                         {/* [FIX] Added Title & Aria-Label for Close Button */}
//                         <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Tutup Chat" aria-label="Tutup Chat">
//                             <X size={24}/>
//                         </button>
//                     </div>

//                     {/* Logic Tampilan Tengah */}
//                     {activeTab === 'personal' && !selectedUser ? (
//                         <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
//                             <MessageCircle size={64} className="opacity-10 mb-4"/>
//                             <p>Pilih pengguna dari daftar di sebelah kiri untuk memulai chat.</p>
//                         </div>
//                     ) : (
//                         <>
//                             {/* LIST PESAN */}
//                             <div className="flex-1 bg-slate-100 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4">
//                                 {messages.length === 0 ? (
//                                     <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
//                                         <MessageCircle size={48} className="opacity-20"/>
//                                         <p className="text-sm font-medium">Belum ada pesan.</p>
//                                     </div>
//                                 ) : (
//                                     messages.map((msg, idx) => {
//                                         const isMe = msg.sender?._id === user?.id;
//                                         return (
//                                             <div key={idx} className={`flex gap-4 max-w-[80%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'}`}>
//                                                 <div className="shrink-0 flex flex-col items-center">
//                                                     {msg.sender?.avatarUrl ? <img src={getImageUrl(msg.sender.avatarUrl)} className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm" alt="Avt" /> : <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-indigo-500">{msg.sender?.name?.charAt(0) || '?'}</div>}
//                                                 </div>
//                                                 <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
//                                                     <div className="flex items-center gap-2 mb-1 px-1">
//                                                         <span className="text-xs font-bold text-gray-700">{msg.sender?.name || 'Unknown'}</span>
//                                                         <span className="text-[10px] text-gray-400">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
//                                                     </div>
//                                                     <div className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-red-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none'}`}>{msg.message}</div>
//                                                 </div>
//                                             </div>
//                                         );
//                                     })
//                                 )}
//                                 <div ref={messagesEndRef} />
//                             </div>

//                             {/* INPUT FORM */}
//                             <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200 flex gap-3 items-center shrink-0 relative">
//                                 {showEmoji && <div className="absolute bottom-20 left-4 z-50"><EmojiPicker onEmojiClick={onEmojiClick} width={300} height={350} /></div>}
                                
//                                 {/* [FIX] Added Title & Aria-Label for Emoji Button */}
//                                 <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-2 text-gray-400 hover:text-yellow-500 transition-colors" title="Emoji" aria-label="Emoji">
//                                     <Smile size={24}/>
//                                 </button>
                                
//                                 <input className="flex-1 bg-gray-50 border border-gray-300 text-sm rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-red-500" placeholder="Ketik pesan..." value={inputText} onChange={e => setInputText(e.target.value)} disabled={isSending} autoFocus/>
                                
//                                 {/* [FIX] Added Title & Aria-Label for Send Button */}
//                                 <button type="submit" disabled={!inputText.trim() || isSending} className="bg-red-700 text-white p-3 rounded-full hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="Kirim Pesan" aria-label="Kirim Pesan">
//                                     <Send size={20}/>
//                                 </button>
//                             </form>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import { api, getImageUrl } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import { 
    X, Send, MessageCircle, Globe, Smile, User, ChevronLeft, Search, Users
} from 'lucide-react';
import dynamic from 'next/dynamic';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface GlobalChatModalProps {
    onClose: () => void;
}

export default function GlobalChatModal({ onClose }: GlobalChatModalProps) {
    const { user } = useAuth();
    
    // UI State
    const [activeTab, setActiveTab] = useState<'global' | 'personal'>('global');
    const [selectedUser, setSelectedUser] = useState<any>(null); 
    
    // Data
    const [messages, setMessages] = useState<any[]>([]);
    const [allUsers, setAllUsers] = useState<any[]>([]); // List Semua Member (Untuk Tab Global)
    const [conversations, setConversations] = useState<any[]>([]); // List Chat History (Untuk Tab Pribadi)
    
    // Input
    const [inputText, setInputText] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [showEmoji, setShowEmoji] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // --- LOAD DATA ---
    const loadAllUsers = async () => {
        try {
            const res = await api('/api/chat/users');
            setAllUsers(Array.isArray(res) ? res : []);
        } catch (e) { console.error("Gagal load users", e); }
    };

    const loadConversations = async () => {
        try {
            const res = await api('/api/chat/conversations');
            setConversations(Array.isArray(res) ? res : []);
        } catch (e) { console.error("Gagal load history", e); }
    };

    const loadMessages = async () => {
        try {
            let res;
            if (activeTab === 'global' && !selectedUser) {
                res = await api('/api/chat/global');
            } else if (selectedUser) {
                res = await api(`/api/chat/${selectedUser._id}`);
            } else {
                return;
            }

            const newMsgs = selectedUser ? (res.messages || []) : (Array.isArray(res) ? res : []);
            
            setMessages(prev => {
                if (JSON.stringify(newMsgs) !== JSON.stringify(prev)) {
                    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
                    return newMsgs;
                }
                return prev;
            });
        } catch (e) { console.error("Gagal load messages", e); }
    };

    // Initial Load
    useEffect(() => {
        loadAllUsers();
        loadConversations();
    }, []);

    // Polling Messages
    useEffect(() => {
        if ((activeTab === 'global' && !selectedUser) || selectedUser) {
            loadMessages();
            const interval = setInterval(loadMessages, 3000);
            return () => clearInterval(interval);
        }
    }, [activeTab, selectedUser]);

    // --- HANDLERS ---
    
    // [FIX 1] DEFINISIKAN FUNGSI EMOJI KLIK
    const onEmojiClick = (emojiData: any) => {
        setInputText(prev => prev + emojiData.emoji);
        setShowEmoji(false); // Opsional: tutup picker setelah pilih
    };

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim() || isSending) return;

        setIsSending(true);
        try {
            const payload: any = { message: inputText };
            if (selectedUser) {
                payload.type = 'personal';
                payload.recipientId = selectedUser._id;
            } else {
                payload.type = 'global';
                payload.topic = null;
            }

            await api('/api/chat/send', { method: 'POST', body: payload });
            setInputText('');
            setShowEmoji(false);
            loadMessages();
            if(selectedUser) loadConversations();
        } catch (error: any) { alert("Gagal kirim: " + error.message); } 
        finally { setIsSending(false); }
    };

    const handleUserSelect = (u: any) => {
        setSelectedUser(u);
    };

    const filteredUsers = activeTab === 'global' 
        ? allUsers.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : conversations.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Chat Modal">
            <div className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex overflow-hidden animate-in zoom-in-95 flex-col md:flex-row border border-gray-200">
                
                {/* --- SIDEBAR --- */}
                <div className={`w-full md:w-80 bg-gray-50 border-r border-gray-200 flex flex-col ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 bg-white">
                        <button 
                            onClick={() => { setActiveTab('global'); setSelectedUser(null); }}
                            className={`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'global' ? 'border-red-600 text-red-700 bg-red-50/50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
                        >
                            Global
                        </button>
                        <button 
                            onClick={() => { setActiveTab('personal'); setSelectedUser(null); }}
                            className={`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'personal' ? 'border-red-600 text-red-700 bg-red-50/50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
                        >
                            Pribadi
                        </button>
                    </div>

                    {/* Search */}
                    <div className="p-4 border-b border-gray-200 bg-white">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text" 
                                placeholder={activeTab === 'global' ? "Cari anggota..." : "Cari riwayat..."}
                                className="w-full bg-gray-100 border border-transparent focus:bg-white focus:border-red-300 rounded-lg pl-9 pr-4 py-2 text-sm outline-none transition-all"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* List Users */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {activeTab === 'global' ? (
                            <>
                                <button 
                                    onClick={() => setSelectedUser(null)}
                                    className={`w-full flex items-center gap-3 p-3 hover:bg-red-50 transition-colors border-b border-gray-100 ${!selectedUser && activeTab === 'global' ? 'bg-red-100 border-l-4 border-l-red-600' : ''}`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-sm"><Globe size={20}/></div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-gray-800">Global Room</p>
                                        <p className="text-xs text-gray-500">Chat Publik</p>
                                    </div>
                                </button>
                                
                                <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50">Daftar Anggota ({filteredUsers.length})</div>
                                {filteredUsers.map(u => (
                                    <button key={u._id} onClick={() => handleUserSelect(u)} className="w-full flex items-center gap-3 p-3 hover:bg-white transition-colors border-b border-gray-100">
                                        {u.avatarUrl ? <img src={getImageUrl(u.avatarUrl)} className="w-8 h-8 rounded-full object-cover" alt={u.name}/> : <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">{u.name?.charAt(0)}</div>}
                                        <div className="text-left min-w-0">
                                            <p className="text-sm font-medium text-gray-800 truncate">{u.name}</p>
                                            <p className="text-[10px] text-gray-500 truncate">{u.email}</p>
                                        </div>
                                    </button>
                                ))}
                            </>
                        ) : (
                            filteredUsers.length === 0 ? (
                                <div className="p-8 text-center text-gray-400 flex flex-col items-center">
                                    <MessageCircle size={32} className="mb-2 opacity-20"/>
                                    <p className="text-xs">Belum ada riwayat chat.</p>
                                    <p className="text-[10px]">Cari teman di tab Global untuk memulai.</p>
                                </div>
                            ) : (
                                filteredUsers.map(u => (
                                    <button key={u._id} onClick={() => handleUserSelect(u)} className={`w-full flex items-center gap-3 p-3 hover:bg-white transition-colors border-b border-gray-100 ${selectedUser?._id === u._id ? 'bg-red-50 border-l-4 border-l-red-600' : ''}`}>
                                        {u.avatarUrl ? <img src={getImageUrl(u.avatarUrl)} className="w-10 h-10 rounded-full object-cover" alt={u.name}/> : <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">{u.name?.charAt(0)}</div>}
                                        <div className="text-left min-w-0">
                                            <p className="text-sm font-medium text-gray-800 truncate">{u.name}</p>
                                            <p className="text-[10px] text-gray-500 uppercase">{u.role}</p>
                                        </div>
                                    </button>
                                ))
                            )
                        )}
                    </div>
                </div>

                {/* --- CHAT MAIN AREA --- */}
                <div className={`flex-1 flex flex-col min-w-0 bg-white relative ${!selectedUser && activeTab === 'personal' ? 'hidden md:flex' : 'flex'}`}>
                    
                    {/* Header Chat */}
                    <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            {(selectedUser || activeTab === 'personal') && (
                                // [FIX 2] Menambahkan Aria-Label pada Tombol Back
                                <button onClick={() => setSelectedUser(null)} className="md:hidden mr-1 p-1 hover:bg-gray-100 rounded-full" title="Kembali" aria-label="Kembali"><ChevronLeft size={20}/></button>
                            )}
                            
                            {selectedUser ? (
                                <>
                                    {selectedUser.avatarUrl ? <img src={getImageUrl(selectedUser.avatarUrl)} className="w-9 h-9 rounded-full object-cover" alt="User"/> : <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">{selectedUser.name?.charAt(0)}</div>}
                                    <div>
                                        <h3 className="font-bold text-gray-800 leading-none">{selectedUser.name}</h3>
                                        <span className="text-xs text-green-600 flex items-center gap-1">● Online</span>
                                    </div>
                                </>
                            ) : activeTab === 'global' ? (
                                <>
                                    <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center"><Globe size={20}/></div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 leading-none">Global Room</h3>
                                        <span className="text-xs text-gray-500">Chat Publik Semua Member</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-gray-400 italic text-sm">Pilih percakapan...</div>
                            )}
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Tutup" aria-label="Tutup"><X size={20}/></button>
                    </div>

                    {/* Messages Area */}
                    {(activeTab === 'global' && !selectedUser) || selectedUser ? (
                        <>
                            <div className="flex-1 bg-slate-50 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4">
                                {messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
                                        <MessageCircle size={48} className="opacity-10"/>
                                        <p className="text-sm font-medium">Belum ada pesan.</p>
                                    </div>
                                ) : (
                                    messages.map((msg, idx) => {
                                        const isMe = msg.sender?._id === user?.id;
                                        return (
                                            <div key={idx} className={`flex gap-3 max-w-[85%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'}`}>
                                                <div className="shrink-0 flex flex-col items-center">
                                                    {msg.sender?.avatarUrl ? <img src={getImageUrl(msg.sender.avatarUrl)} className="w-8 h-8 rounded-full object-cover shadow-sm" alt="Avt" /> : <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-gray-400">{msg.sender?.name?.charAt(0)}</div>}
                                                </div>
                                                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                                    {!isMe && <span className="text-[10px] font-bold text-gray-600 mb-1 ml-1">{msg.sender?.name}</span>}
                                                    <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm leading-relaxed ${isMe ? 'bg-red-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>
                                                        {msg.message}
                                                    </div>
                                                    <span className="text-[9px] text-gray-400 mt-1 mx-1">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Form */}
                            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200 flex gap-3 items-center shrink-0 relative">
                                {showEmoji && <div className="absolute bottom-20 left-4 z-50"><EmojiPicker onEmojiClick={onEmojiClick} width={300} height={350} /></div>}
                                
                                {/* [FIX 2] Menambahkan Aria-Label pada Tombol Emoji */}
                                <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-2 text-gray-400 hover:text-yellow-500 transition-colors" title="Emoji" aria-label="Buka Emoji"><Smile size={24}/></button>
                                
                                <input className="flex-1 bg-gray-100 border-0 focus:ring-2 focus:ring-red-100 focus:bg-white rounded-full px-5 py-3 text-sm outline-none transition-all" placeholder="Ketik pesan..." value={inputText} onChange={e => setInputText(e.target.value)} disabled={isSending} autoFocus/>
                                
                                {/* [FIX 2] Menambahkan Aria-Label pada Tombol Kirim */}
                                <button type="submit" disabled={!inputText.trim() || isSending} className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 shadow-md transition-transform active:scale-95 disabled:opacity-50" title="Kirim" aria-label="Kirim Pesan"><Send size={18}/></button>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
                            <Users size={64} className="opacity-20 mb-4"/>
                            <p className="text-sm">Pilih kontak untuk mulai chat</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
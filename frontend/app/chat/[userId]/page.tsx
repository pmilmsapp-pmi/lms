// // // 'use client';

// // // import { useState, useEffect, useRef } from 'react';
// // // import { useParams, useRouter } from 'next/navigation';
// // // import { api, getImageUrl } from '@/lib/api';
// // // import Protected from '@/components/Protected';

// // // export default function ChatDetailPage() {
// // //   const params = useParams();
// // //   const router = useRouter();
// // //   const otherUserId = params?.userId as string; // ID lawan bicara

// // //   const [messages, setMessages] = useState<any[]>([]);
// // //   const [otherUser, setOtherUser] = useState<any>(null);
// // //   const [newMessage, setNewMessage] = useState('');
// // //   const [loading, setLoading] = useState(true);
// // //   const [sending, setSending] = useState(false);
// // //   const messagesEndRef = useRef<HTMLDivElement>(null);

// // //   // 1. Load User Detail & History Awal
// // //   useEffect(() => {
// // //     if (otherUserId) {
// // //       loadInitialData();
// // //     }
// // //   }, [otherUserId]);

// // //   // 2. Polling Pesan Baru setiap 3 detik (Real-time sederhana)
// // //   useEffect(() => {
// // //     const interval = setInterval(loadMessages, 3000);
// // //     return () => clearInterval(interval);
// // //   }, [otherUserId]);

// // //   // 3. Auto Scroll ke bawah saat ada pesan baru
// // //   useEffect(() => {
// // //     scrollToBottom();
// // //   }, [messages]);

// // //   const scrollToBottom = () => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   };

// // //   const loadInitialData = async () => {
// // //     try {
// // //       setLoading(true);
// // //       // Ambil detail user lawan bicara (bisa pakai endpoint admin atau public user info)
// // //       // Disini kita pakai endpoint chat history, biasanya backend belum return user info detail
// // //       // Jadi kita fetch user dulu (opsional, atau ambil dari history jika ada populate)
      
// // //       // Ambil History Chat
// // //       await loadMessages();
      
// // //       // Ambil Info User (Hack: ambil dari sender/recipient di pesan pertama jika ada, atau fetch khusus)
// // //       // Untuk amannya, kita fetch detail user target
// // //       const userRes = await api(`/api/users/${otherUserId}/detail`); // Pastikan endpoint ini ada/dibuat
// // //       // Jika endpoint detail user public belum ada, kita bisa skip atau mock nama dari history chat
// // //       if(userRes) setOtherUser(userRes);

// // //     } catch (e) {
// // //       console.error(e);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const loadMessages = async () => {
// // //     try {
// // //       const res = await api(`/api/chat/${otherUserId}`);
// // //       setMessages(res.messages || []);
      
// // //       // Set info user dari pesan jika state user masih kosong
// // //       if (!otherUser && res.messages.length > 0) {
// // //          // Cari pesan di mana sender ADALAH otherUserId
// // //          const incomingMsg = res.messages.find((m:any) => m.sender === otherUserId || m.sender._id === otherUserId);
// // //          if (incomingMsg) {
// // //              // Backend populate sender?
// // //              setOtherUser(typeof incomingMsg.sender === 'object' ? incomingMsg.sender : { name: 'User', _id: otherUserId });
// // //          }
// // //       }

// // //       // Tandai semua sebagai 'read' saat membuka halaman ini
// // //       await api('/api/chat/read', { method: 'PUT', body: { senderId: otherUserId } });
// // //     } catch (e) {
// // //       console.error("Gagal memuat pesan", e);
// // //     }
// // //   };

// // //   const handleSend = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!newMessage.trim()) return;

// // //     const tempMsg = {
// // //         _id: Date.now(), // ID sementara
// // //         sender: 'me', // Penanda ini pesan kita
// // //         message: newMessage,
// // //         createdAt: new Date().toISOString()
// // //     };

// // //     // Optimistic Update: Tampilkan pesan langsung
// // //     setMessages(prev => [...prev, tempMsg]);
// // //     setNewMessage('');
// // //     setSending(true);

// // //     try {
// // //       await api('/api/chat/send', {
// // //         method: 'POST',
// // //         body: { recipientId: otherUserId, message: tempMsg.message }
// // //       });
// // //       // Refresh untuk sync ID asli dari server
// // //       loadMessages();
// // //     } catch (error: any) {
// // //       alert("Gagal kirim: " + error.message);
// // //     } finally {
// // //       setSending(false);
// // //     }
// // //   };

// // //   // Helper untuk cek apakah pesan dari "Saya"
// // //   // Logic: Jika sender === 'me' (optimistic) ATAU sender !== otherUserId (pesan dari DB)
// // //   const isMe = (msg: any) => {
// // //       if (msg.sender === 'me') return true;
// // //       const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
// // //       return senderId !== otherUserId;
// // //   };

// // //   return (
// // //     <Protected>
// // //       <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-100"> {/* Asumsi tinggi navbar 64px */}
        
// // //         {/* HEADER CHAT */}
// // //         <div className="bg-white px-6 py-3 border-b flex items-center gap-4 shadow-sm z-10 sticky top-0">
// // //             <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-800 text-xl font-bold">←</button>
// // //             <div className="relative">
// // //                 <img 
// // //                     src={getImageUrl(otherUser?.avatarUrl) || `https://ui-avatars.com/api/?name=${otherUser?.name || 'User'}`} 
// // //                     className="w-10 h-10 rounded-full object-cover border"
// // //                     alt="Avatar"
// // //                 />
// // //                 <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
// // //             </div>
// // //             <div>
// // //                 <h1 className="font-bold text-gray-800 text-sm md:text-base">
// // //                     {otherUser?.name || 'Memuat...'}
// // //                 </h1>
// // //                 <p className="text-xs text-gray-500">{otherUser?.role || 'Online'}</p>
// // //             </div>
// // //         </div>

// // //         {/* AREA PESAN (SCROLLABLE) */}
// // //         <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
// // //             {loading && messages.length === 0 ? (
// // //                 <div className="text-center text-gray-400 mt-10 text-sm">Memuat percakapan...</div>
// // //             ) : (
// // //                 messages.map((msg, idx) => {
// // //                     const me = isMe(msg);
// // //                     return (
// // //                         <div key={idx} className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
// // //                             <div className={`max-w-[75%] md:max-w-[60%] px-4 py-2 rounded-2xl text-sm shadow-sm relative group ${
// // //                                 me 
// // //                                 ? 'bg-indigo-600 text-white rounded-tr-none' 
// // //                                 : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
// // //                             }`}>
// // //                                 <p>{msg.message}</p>
// // //                                 <span className={`text-[10px] block text-right mt-1 opacity-70 ${me ? 'text-indigo-200' : 'text-gray-400'}`}>
// // //                                     {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// // //                                     {me && <span className="ml-1">✓</span>}
// // //                                 </span>
// // //                             </div>
// // //                         </div>
// // //                     );
// // //                 })
// // //             )}
// // //             <div ref={messagesEndRef} />
// // //         </div>

// // //         {/* INPUT AREA */}
// // //         <div className="bg-white p-4 border-t sticky bottom-0 z-10">
// // //             <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-2 items-center">
// // //                 <input 
// // //                     className="flex-1 border border-gray-300 rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
// // //                     placeholder="Tulis pesan..."
// // //                     value={newMessage}
// // //                     onChange={e => setNewMessage(e.target.value)}
// // //                     autoFocus
// // //                 />
// // //                 <button 
// // //                     disabled={sending || !newMessage.trim()} 
// // //                     type="submit" 
// // //                     className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all active:scale-95"
// // //                 >
// // //                     <span className="ml-1 text-lg">➤</span>
// // //                 </button>
// // //             </form>
// // //         </div>

// // //       </div>
// // //     </Protected>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import { api, getImageUrl } from '@/lib/api';
// // import Protected from '@/components/Protected';

// // export default function ChatDetailPage() {
// //   const params = useParams();
// //   const router = useRouter();
// //   const otherUserId = params?.userId as string; 

// //   const [messages, setMessages] = useState<any[]>([]);
// //   const [otherUser, setOtherUser] = useState<any>(null);
// //   const [newMessage, setNewMessage] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [sending, setSending] = useState(false);
// //   const messagesEndRef = useRef<HTMLDivElement>(null);

// //   // Load Data
// //   useEffect(() => {
// //     if (otherUserId) {
// //       loadInitialData();
// //       const interval = setInterval(loadMessages, 3000);
// //       return () => clearInterval(interval);
// //     }
// //   }, [otherUserId]);

// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages]);

// //   const loadInitialData = async () => {
// //     try {
// //       setLoading(true);
// //       await loadMessages();
// //       // Fetch user detail untuk header
// //       try {
// //           const userRes = await api(`/api/users/${otherUserId}/detail`);
// //           setOtherUser(userRes);
// //       } catch (e) { console.log("User detail fetch failed"); }
// //     } catch (e) {
// //       console.error(e);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const loadMessages = async () => {
// //     try {
// //       const res = await api(`/api/chat/${otherUserId}`);
// //       setMessages(res.messages || []);
// //       // Mark as read
// //       await api('/api/chat/read', { method: 'PUT', body: { senderId: otherUserId } });
// //     } catch (e) { console.error(e); }
// //   };

// //   const handleSend = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!newMessage.trim()) return;

// //     const tempMsg = {
// //         _id: Date.now(),
// //         sender: 'me',
// //         message: newMessage,
// //         createdAt: new Date().toISOString()
// //     };

// //     setMessages(prev => [...prev, tempMsg]);
// //     setNewMessage('');
// //     setSending(true);

// //     try {
// //       await api('/api/chat/send', {
// //         method: 'POST',
// //         body: { recipientId: otherUserId, message: tempMsg.message }
// //       });
// //       loadMessages();
// //     } catch (error: any) {
// //       alert("Gagal: " + error.message);
// //     } finally {
// //       setSending(false);
// //     }
// //   };

// //   const isMe = (msg: any) => {
// //       if (msg.sender === 'me') return true;
// //       const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
// //       return senderId !== otherUserId;
// //   };

// //   return (
// //     <Protected>
// //       <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50"> 
        
// //         {/* HEADER */}
// //         <div className="bg-white px-6 py-4 border-b flex items-center gap-4 shadow-sm z-10 sticky top-0">
// //             <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
// //                 <span className="text-xl font-bold">←</span>
// //             </button>
// //             <div className="relative">
// //                 <img 
// //                     src={getImageUrl(otherUser?.avatarUrl) || `https://ui-avatars.com/api/?name=${otherUser?.name || 'User'}`} 
// //                     className="w-10 h-10 rounded-full object-cover border border-gray-200"
// //                     alt="Avatar"
// //                 />
// //                 <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
// //             </div>
// //             <div>
// //                 <h1 className="font-bold text-gray-800 text-base">
// //                     {otherUser?.name || 'Memuat...'}
// //                 </h1>
// //                 <p className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
// //                     {otherUser?.role || 'Online'}
// //                 </p>
// //             </div>
// //         </div>

// //         {/* CHAT AREA */}
// //         <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
// //             {loading && messages.length === 0 ? (
// //                 <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
// //             ) : (
// //                 messages.map((msg, idx) => {
// //                     const me = isMe(msg);
// //                     return (
// //                         <div key={idx} className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
// //                             {/* --- PERBAIKAN STYLE BUBBLE --- */}
// //                             <div className={`max-w-[75%] md:max-w-[60%] px-5 py-3 rounded-2xl text-sm shadow-sm relative ${
// //                                 me 
// //                                 ? 'bg-indigo-600 text-white rounded-br-none' 
// //                                 : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
// //                             }`}>
// //                                 <p className="leading-relaxed">{msg.message}</p>
// //                                 <span className={`text-[10px] block text-right mt-1.5 opacity-80 ${me ? 'text-indigo-100' : 'text-gray-400'}`}>
// //                                     {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// //                                     {me && <span className="ml-1 opacity-100">✓</span>}
// //                                 </span>
// //                             </div>
// //                         </div>
// //                     );
// //                 })
// //             )}
// //             <div ref={messagesEndRef} className="h-4" />
// //         </div>

// //         {/* INPUT AREA */}
// //         <div className="bg-white p-4 border-t sticky bottom-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
// //             <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-3 items-center">
// //                 <input 
// //                     className="flex-1 bg-gray-50 border border-gray-300 rounded-full px-6 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-400 text-gray-800"
// //                     placeholder="Tulis pesan..."
// //                     value={newMessage}
// //                     onChange={e => setNewMessage(e.target.value)}
// //                     autoFocus
// //                 />
// //                 <button 
// //                     disabled={sending || !newMessage.trim()} 
// //                     type="submit" 
// //                     className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all active:scale-95 flex-shrink-0"
// //                 >
// //                     <span className="text-xl ml-0.5 mb-0.5">➤</span>
// //                 </button>
// //             </form>
// //         </div>

// //       </div>
// //     </Protected>
// //   );
// // }
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { api, getImageUrl } from '@/lib/api';
// import Protected from '@/components/Protected';

// export default function ChatDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const otherUserId = params?.userId as string; 

//   const [messages, setMessages] = useState<any[]>([]);
//   const [otherUser, setOtherUser] = useState<any>(null);
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [sending, setSending] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Load Data & Polling
//   useEffect(() => {
//     if (otherUserId) {
//       loadInitialData();
//       const interval = setInterval(loadMessages, 3000);
//       return () => clearInterval(interval);
//     }
//   }, [otherUserId]);

//   // Auto-scroll ke bawah saat ada pesan baru
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const loadInitialData = async () => {
//     try {
//       setLoading(true);
//       await loadMessages();
//       // Fetch user detail untuk header dan avatar di chat
//       try {
//           const userRes = await api(`/api/users/${otherUserId}/detail`);
//           setOtherUser(userRes);
//       } catch (e) { console.log("User detail fetch failed"); }
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMessages = async () => {
//     try {
//       const res = await api(`/api/chat/${otherUserId}`);
//       setMessages(res.messages || []);
//       // Mark as read
//       await api('/api/chat/read', { method: 'PUT', body: { senderId: otherUserId } });
//     } catch (e) { console.error(e); }
//   };

//   const handleSend = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     const tempMsg = {
//         _id: Date.now(),
//         sender: 'me',
//         message: newMessage,
//         createdAt: new Date().toISOString()
//     };

//     setMessages(prev => [...prev, tempMsg]);
//     setNewMessage('');
//     setSending(true);

//     try {
//       await api('/api/chat/send', {
//         method: 'POST',
//         body: { recipientId: otherUserId, message: tempMsg.message }
//       });
//       loadMessages(); // Refresh untuk sync ID asli
//     } catch (error: any) {
//       alert("Gagal: " + error.message);
//     } finally {
//       setSending(false);
//     }
//   };

//   const isMe = (msg: any) => {
//       if (msg.sender === 'me') return true;
//       const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
//       return senderId !== otherUserId;
//   };

//   return (
//     <Protected>
//       <div className="flex flex-col h-screen bg-gray-50 relative"> 
        
//         {/* HEADER - Sticky Top */}
//         <div className="bg-white px-6 py-4 border-b flex items-center gap-4 shadow-sm z-20 sticky top-0 absolute w-full">
//             <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
//                 <span className="text-xl font-bold">←</span>
//             </button>
//             <div className="relative flex-shrink-0">
//                 <img 
//                     src={getImageUrl(otherUser?.avatarUrl) || `https://ui-avatars.com/api/?name=${otherUser?.name || 'User'}`} 
//                     className="w-10 h-10 rounded-full object-cover border border-gray-200"
//                     alt="Avatar"
//                 />
//                 <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//             </div>
//             <div className="min-w-0 flex-1">
//                 <h1 className="font-bold text-gray-800 text-base truncate">
//                     {otherUser?.name || 'Memuat...'}
//                 </h1>
//                 <p className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
//                     {otherUser?.role || 'Online'}
//                 </p>
//             </div>
//         </div>

//         {/* CHAT AREA - Scrollable */}
//         {/* PERBAIKAN: Ditambahkan pt-24 agar tidak tertutup header, dan pb-24 agar tidak tertutup input */}
//         <div className="flex-1 overflow-y-auto px-6 pt-24 pb-24 space-y-6 custom-scrollbar z-10">
//             {loading && messages.length === 0 ? (
//                 <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
//             ) : (
//                 messages.map((msg, idx) => {
//                     const me = isMe(msg);
//                     return (
//                         // PERBAIKAN: Gunakan flex items-end dan gap-3 untuk alignment avatar dan bubble
//                         <div key={idx} className={`flex ${me ? 'justify-end' : 'justify-start items-end gap-3'}`}>
                            
//                             {/* --- AVATAR LAWAN BICARA (DITAMBAHKAN) --- */}
//                             {!me && (
//                                 <div className="flex-shrink-0">
//                                     <img 
//                                         src={getImageUrl(otherUser?.avatarUrl) || `https://ui-avatars.com/api/?name=${otherUser?.name || 'User'}`} 
//                                         className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-sm"
//                                         alt={otherUser?.name || 'Avatar'}
//                                     />
//                                 </div>
//                             )}

//                             {/* BUBBLE CHAT */}
//                             <div className={`max-w-[75%] md:max-w-[65%] px-5 py-3 rounded-2xl text-sm shadow-sm relative group transition-all ${
//                                 me 
//                                 ? 'bg-indigo-600 text-white rounded-br-none hover:bg-indigo-700' 
//                                 : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none hover:border-gray-300'
//                             }`}>
//                                 <p className="leading-relaxed whitespace-pre-wrap break-words">{msg.message}</p>
//                                 <span className={`text-[10px] block text-right mt-1.5 opacity-80 ${me ? 'text-indigo-100' : 'text-gray-400'}`}>
//                                     {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                     {me && <span className="ml-1 opacity-100">✓</span>}
//                                 </span>
//                             </div>
//                         </div>
//                     );
//                 })
//             )}
//             <div ref={messagesEndRef} className="h-1" />
//         </div>

//         {/* INPUT AREA - Sticky Bottom */}
//         <div className="bg-white p-4 border-t sticky bottom-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] absolute w-full">
//             <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-3 items-center">
//                 <input 
//                     className="flex-1 bg-gray-50 border border-gray-300 rounded-full px-6 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-400 text-gray-800"
//                     placeholder="Tulis pesan..."
//                     value={newMessage}
//                     onChange={e => setNewMessage(e.target.value)}
//                     autoFocus
//                 />
//                 <button 
//                     disabled={sending || !newMessage.trim()} 
//                     type="submit" 
//                     className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all active:scale-95 flex-shrink-0"
//                 >
//                     <span className="text-xl ml-0.5 mb-0.5">➤</span>
//                 </button>
//             </form>
//         </div>

//       </div>
//     </Protected>
//   );
// }
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api, getImageUrl } from '@/lib/api';
import Protected from '@/components/Protected';

export default function ChatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const otherUserId = params?.userId as string; 

  const [messages, setMessages] = useState<any[]>([]);
  const [otherUser, setOtherUser] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Load Data & Polling
  useEffect(() => {
    if (otherUserId) {
      loadInitialData();
      const interval = setInterval(loadMessages, 3000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherUserId]);

  // 2. Auto-scroll ke bawah saat ada pesan baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      await loadMessages();
      // Fetch user detail untuk header
      try {
          const userRes = await api(`/api/users/${otherUserId}/detail`);
          setOtherUser(userRes);
      } catch (e) { console.log("User detail fetch failed"); }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    try {
      const res = await api(`/api/chat/${otherUserId}`);
      setMessages(res.messages || []);
      // Mark as read
      await api('/api/chat/read', { method: 'PUT', body: { senderId: otherUserId } });
    } catch (e) { console.error(e); }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const tempMsg = {
        _id: Date.now(),
        sender: 'me',
        message: newMessage,
        createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, tempMsg]);
    setNewMessage('');
    setSending(true);

    try {
      await api('/api/chat/send', {
        method: 'POST',
        body: { recipientId: otherUserId, message: tempMsg.message }
      });
      loadMessages(); 
    } catch (error: any) {
      alert("Gagal: " + error.message);
    } finally {
      setSending(false);
    }
  };

  const isMe = (msg: any) => {
      if (msg.sender === 'me') return true;
      const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
      return senderId !== otherUserId;
  };

  return (
    <Protected>
      {/* PERBAIKAN LAYOUT: 
          Menggunakan flex-col h-[calc(100vh-64px)] untuk menyesuaikan dengan Navbar utama.
          Header dan Input menggunakan 'flex-shrink-0' agar ukurannya tetap.
          Chat area menggunakan 'flex-1' agar mengisi sisa ruang.
      */}
      <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50"> 
        
        {/* === HEADER (Block Tetap) === */}
        <div className="flex-shrink-0 bg-white px-6 py-3 border-b flex items-center gap-4 shadow-sm z-20">
            <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                <span className="text-xl font-bold">←</span>
            </button>
            <div className="relative">
                <img 
                    src={getImageUrl(otherUser?.avatarUrl) || `https://ui-avatars.com/api/?name=${otherUser?.name || 'User'}`} 
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    alt="Avatar"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
                <h1 className="font-bold text-gray-800 text-base">
                    {otherUser?.name || 'Memuat...'}
                </h1>
                <p className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    {otherUser?.role || 'Online'}
                </p>
            </div>
        </div>

        {/* === CHAT AREA (Scrollable) === */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            {loading && messages.length === 0 ? (
                <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
            ) : (
                messages.map((msg, idx) => {
                    const me = isMe(msg);
                    return (
                        // Menggunakan items-end agar avatar sejajar dengan bagian bawah bubble
                        <div key={idx} className={`flex ${me ? 'justify-end' : 'justify-start items-end gap-3'}`}>
                            
                            {/* AVATAR LAWAN BICARA (KIRI) */}
                            {!me && (
                                <div className="flex-shrink-0 mb-1">
                                    <img 
                                        src={getImageUrl(otherUser?.avatarUrl) || `https://ui-avatars.com/api/?name=${otherUser?.name || 'User'}`} 
                                        className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-sm"
                                        alt="Avatar Lawan"
                                    />
                                </div>
                            )}

                            {/* BUBBLE CHAT */}
                            <div className={`max-w-[75%] md:max-w-[65%] px-5 py-3 rounded-2xl text-sm shadow-sm relative group transition-all ${
                                me 
                                ? 'bg-indigo-600 text-white rounded-br-none hover:bg-indigo-700' 
                                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none hover:border-gray-300'
                            }`}>
                                <p className="leading-relaxed whitespace-pre-wrap break-words">{msg.message}</p>
                                <span className={`text-[10px] block text-right mt-1.5 opacity-80 ${me ? 'text-indigo-100' : 'text-gray-400'}`}>
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    {me && <span className="ml-1 opacity-100">✓</span>}
                                </span>
                            </div>
                        </div>
                    );
                })
            )}
            <div ref={messagesEndRef} className="h-2" />
        </div>

        {/* === INPUT AREA (Block Tetap di Bawah) === */}
        <div className="flex-shrink-0 bg-white p-4 border-t z-20">
            <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-3 items-center">
                <input 
                    className="flex-1 bg-gray-50 border border-gray-300 rounded-full px-6 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-400 text-gray-800"
                    placeholder="Tulis pesan..."
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    autoFocus
                />
                <button 
                    disabled={sending || !newMessage.trim()} 
                    type="submit" 
                    className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all active:scale-95 flex-shrink-0"
                >
                    <span className="text-xl ml-0.5 mb-0.5">➤</span>
                </button>
            </form>
        </div>

      </div>
    </Protected>
  );
}
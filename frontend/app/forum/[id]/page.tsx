// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import { api, getImageUrl } from '@/lib/api';
// // import Protected from '@/components/Protected';
// // import { ArrowLeft, Send, Trash2, CheckCircle, XCircle, AlertCircle, Smile } from 'lucide-react';
// // import { useAuth } from '@/lib/AuthProvider';
// // import EmojiPicker from 'emoji-picker-react';

// // export default function ForumDetail() {
// //   const { id } = useParams();
// //   const router = useRouter();
// //   const { user } = useAuth();
  
// //   const [topic, setTopic] = useState<any>(null);
// //   const [reply, setReply] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [submitting, setSubmitting] = useState(false);
  
// //   // State untuk Emoji & Mention
// //   const [showEmoji, setShowEmoji] = useState(false);
// //   const [mentionQuery, setMentionQuery] = useState('');
// //   const [showMentions, setShowMentions] = useState(false);
// //   const inputRef = useRef<HTMLInputElement>(null);

// //   useEffect(() => {
// //     if(id) {
// //         loadTopic();
// //         markNotificationsAsRead();
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [id]);

// //   const loadTopic = async () => {
// //     try {
// //         setLoading(true);
// //         // Tambahkan timestamp agar tidak cache
// //         const data = await api(`/api/forum/${id}?t=${Date.now()}`);
// //         setTopic(data);
// //     } catch (e: any) { 
// //         alert(e.message || "Gagal memuat topik.");
// //         router.push('/forum');
// //     } finally { setLoading(false); }
// //   };

// //   const markNotificationsAsRead = async () => {
// //       try {
// //           await api(`/api/notifications/mark-read/topic/${id}`, { method: 'PATCH' });
// //           window.dispatchEvent(new Event('notification-updated')); 
// //       } catch (e) {
// //           console.error("Gagal update status notifikasi", e);
// //       }
// //   };

// //   const getParticipants = () => {
// //       if (!topic) return [];
// //       const users = [topic.author];
// //       topic.replies.forEach((r: any) => users.push(r.user));
// //       const uniqueUsers = Array.from(new Map(users.filter(u => u).map(u => [u._id, u])).values())
// //         .filter((u: any) => u._id !== user?.id);
// //       return !mentionQuery ? uniqueUsers : uniqueUsers.filter((u: any) => u.name.toLowerCase().includes(mentionQuery.toLowerCase()));
// //   };

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //       const val = e.target.value;
// //       setReply(val);
// //       const lastWord = val.split(' ').pop();
// //       if (lastWord && lastWord.startsWith('@')) {
// //           setMentionQuery(lastWord.substring(1));
// //           setShowMentions(true);
// //       } else {
// //           setShowMentions(false);
// //       }
// //   };

// //   const insertMention = (name: string) => {
// //       const words = reply.split(' ');
// //       words.pop(); 
// //       setReply(words.join(' ') + ` @${name} `);
// //       setShowMentions(false);
// //       inputRef.current?.focus();
// //   };

// //   // --- LOGIKA EMOJI ---
// //   const onEmojiClick = (emojiData: any) => {
// //       setReply(prev => prev + emojiData.emoji);
// //       // Jangan tutup emoji picker agar bisa pilih banyak, atau tutup jika mau (opsional)
// //       // setShowEmoji(false); 
// //   };

// //   const handleReply = async (e: React.FormEvent) => {
// //       e.preventDefault();
// //       if (!reply.trim()) return;
// //       setSubmitting(true);
// //       try {
// //           await api(`/api/forum/${id}/reply`, { method: 'POST', body: { content: reply } });
// //           setReply('');
// //           setShowEmoji(false);
// //           loadTopic(); 
// //       } catch (e: any) { alert(e.message); } 
// //       finally { setSubmitting(false); }
// //   };

// //   const handleStatus = async (newStatus: 'approved' | 'rejected') => {
// //       if(!confirm(`Ubah status menjadi ${newStatus}?`)) return;
// //       try {
// //           await api(`/api/forum/${id}/status`, { method: 'PATCH', body: { status: newStatus } });
// //           loadTopic(); 
// //       } catch (e: any) { alert(e.message); }
// //   };

// //   const handleDeleteTopic = async () => {
// //       if(!confirm("Hapus topik ini?")) return;
// //       try {
// //           await api(`/api/forum/${id}`, { method: 'DELETE' });
// //           router.push('/forum');
// //       } catch (e: any) { alert(e.message); }
// //   };

// //   const handleDeleteReply = async (replyId: string) => {
// //       if(!confirm("Hapus komentar ini karena melanggar aturan?")) return;
// //       try {
// //           await api(`/api/forum/${id}/reply/${replyId}`, { method: 'DELETE' });
// //           loadTopic();
// //       } catch (e: any) { alert(e.message); }
// //   };

// //   // --- HELPER UNTUK BADGE ROLE ---
// //   const renderRoleBadge = (role: string) => {
// //       const r = role ? role.toUpperCase() : 'USER';
// //       if (r === 'SUPER_ADMIN') {
// //           return <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.5 rounded font-bold border border-red-200">SUPER ADMIN</span>;
// //       } else if (r === 'FACILITATOR') {
// //           return <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-bold border border-blue-200">FASILITATOR</span>;
// //       } else {
// //           return <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-bold border border-green-200">PESERTA</span>;
// //       }
// //   };

// //   const Avatar = ({ u, size = "w-10 h-10" }: { u: any, size?: string }) => {
// //       if (!u) return <div className={`${size} bg-gray-200 rounded-full`} />;
// //       if (u.avatarUrl) return <img src={getImageUrl(u.avatarUrl)} className={`${size} rounded-full object-cover border border-gray-200`} alt={u.name || "Avatar"} />;
// //       const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
// //       const initials = u.name?.substring(0, 2).toUpperCase() || "UN";
// //       return <div className={`${size} rounded-full ${colors[u.name?.length % colors.length]} text-white flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm`}>{initials}</div>;
// //   };

// //   if (loading) return <div className="p-20 text-center">Memuat...</div>;
// //   if (!topic) return null;

// //   const userRole = user?.role?.toUpperCase() || '';
// //   const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// //   const isOwner = user?.id === topic.author?._id;

// //   return (
// //     <Protected>
// //       <div className="max-w-4xl mx-auto p-6 font-sans min-h-screen pb-40">
// //         <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-bold mb-6 text-sm">
// //             <ArrowLeft size={16}/> Kembali
// //         </button>

// //         {topic.status === 'pending' && (
// //             <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-6 flex justify-between items-center">
// //                 <div className="flex items-center gap-3"><AlertCircle size={24} /><div><h3 className="font-bold">Menunggu Moderasi</h3><p className="text-sm">Hanya Admin yang dapat melihat ini.</p></div></div>
// //                 {isAdmin && <div className="flex gap-2">
// //                     <button onClick={() => handleStatus('approved')} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 flex gap-1"><CheckCircle size={14}/> Setujui</button>
// //                     <button onClick={() => handleStatus('rejected')} className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 flex gap-1"><XCircle size={14}/> Tolak</button>
// //                 </div>}
// //             </div>
// //         )}

// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
// //             <div className="flex justify-between items-start mb-6">
// //                 <div className="flex items-center gap-4">
// //                     <Avatar u={topic.author} size="w-12 h-12" />
// //                     <div>
// //                         <h1 className="text-2xl font-bold text-gray-800 leading-tight">{topic.title}</h1>
// //                         <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
// //                             <span className="font-bold text-red-700">{topic.author?.name || 'Anonim'}</span>
// //                             <span>•</span>
// //                             {/* Format Tanggal Indonesia */}
// //                             <span>{new Date(topic.createdAt).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</span>
// //                             <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase font-bold text-[10px]">{topic.category}</span>
// //                             {/* Badge Role Penulis Topik */}
// //                             {topic.author && renderRoleBadge(topic.author.role)}
// //                         </div>
// //                     </div>
// //                 </div>
// //                 {(isAdmin || isOwner) && (
// //                     <button onClick={handleDeleteTopic} className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition" aria-label="Hapus Topik"><Trash2 size={18}/></button>
// //                 )}
// //             </div>
// //             <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">{topic.content}</div>
// //         </div>

// //         <div className="space-y-6 mb-24">
// //             <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">Komentar <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{topic.replies?.length || 0}</span></h3>
// //             {topic.replies?.map((r: any, i: number) => (
// //                 <div key={r._id || i} className="bg-white p-6 rounded-xl border border-gray-100 flex gap-4 group">
// //                     <div className="flex-shrink-0"><Avatar u={r.user} size="w-10 h-10" /></div>
// //                     <div className="flex-1">
// //                         <div className="flex items-center justify-between mb-1">
// //                             <div className="flex items-center gap-2">
// //                                 <span className="font-bold text-sm text-gray-900">{r.user?.name || 'User'}</span>
// //                                 <span className="text-xs text-gray-400">• {new Date(r.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                                
// //                                 {/* --- BAGIAN INI YANG DIUPDATE: BADGE ROLE DINAMIS --- */}
// //                                 {r.user && renderRoleBadge(r.user.role)}
// //                                 {/* --------------------------------------------------- */}

// //                             </div>
// //                             {/* TOMBOL HAPUS KOMENTAR UNTUK ADMIN */}
// //                             {isAdmin && (
// //                                 <button 
// //                                     onClick={() => handleDeleteReply(r._id)}
// //                                     className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 p-1 transition-all"
// //                                     title="Hapus Komentar"
// //                                     aria-label="Hapus Komentar"
// //                                 >
// //                                     <Trash2 size={14} />
// //                                 </button>
// //                             )}
// //                         </div>
// //                         <p className="text-gray-700 text-sm whitespace-pre-wrap">
// //                             {r.content.split(' ').map((word: string, idx: number) => word.startsWith('@') ? <span key={idx} className="text-blue-600 font-bold">{word} </span> : word + ' ')}
// //                         </p>
// //                     </div>
// //                 </div>
// //             ))}
// //         </div>

// //         {/* INPUT BAR */}
// //         <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg z-20">
// //             <div className="max-w-4xl mx-auto relative">
                
// //                 {/* POPUP MENTIONS */}
// //                 {showMentions && (
// //                     <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-30">
// //                         <div className="bg-gray-50 px-3 py-2 text-xs font-bold text-gray-500 border-b">Mention</div>
// //                         {getParticipants().map((u: any) => (
// //                             <button key={u._id} onClick={() => insertMention(u.name)} className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-sm">
// //                                 <Avatar u={u} size="w-6 h-6" /><span className="truncate font-medium">{u.name}</span>
// //                             </button>
// //                         ))}
// //                     </div>
// //                 )}
                
// //                 {/* POPUP EMOJI */}
// //                 {showEmoji && (
// //                     <div className="absolute bottom-full right-0 mb-2 z-30 shadow-2xl rounded-xl">
// //                         <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={400} />
// //                     </div>
// //                 )}
                
// //                 <form onSubmit={handleReply} className="flex gap-3 items-center">
// //                     {/* TOMBOL BUKA EMOJI */}
// //                     <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-2 text-gray-400 hover:text-yellow-500 rounded-full transition-colors" aria-label="Emoji">
// //                         <Smile size={24}/>
// //                     </button>
                    
// //                     <input ref={inputRef} className="flex-1 bg-gray-50 border rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500" placeholder="Balas... (@mention)" value={reply} onChange={handleInputChange} />
// //                     <button disabled={!reply.trim() || submitting} className="bg-red-700 text-white px-6 py-2 rounded-full font-bold hover:bg-red-800 disabled:opacity-50 flex items-center gap-2">
// //                         <Send size={18}/> {submitting ? '...' : 'Kirim'}
// //                     </button>
// //                 </form>
// //             </div>
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
// import { ArrowLeft, Send, Trash2, CheckCircle, XCircle, AlertCircle, Smile, User, Clock, MessageCircle, Loader2 } from 'lucide-react';
// import { useAuth } from '@/lib/AuthProvider';
// import dynamic from 'next/dynamic';

// const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

// export default function ForumDetail() {
//   const { id } = useParams();
//   const router = useRouter();
//   const { user } = useAuth();
  
//   const [topic, setTopic] = useState<any>(null);
//   const [reply, setReply] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
  
//   // State untuk Emoji & Mention
//   const [showEmoji, setShowEmoji] = useState(false);
//   const [mentionQuery, setMentionQuery] = useState('');
//   const [showMentions, setShowMentions] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const commentsEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if(id) {
//         loadTopic();
//         markNotificationsAsRead();
//     }
//   }, [id]);

//   const loadTopic = async () => {
//     try {
//         setLoading(true);
//         const data = await api(`/api/forum/${id}?t=${Date.now()}`);
//         setTopic(data.topic || data); 
//     } catch (e: any) { 
//         alert(e.message || "Gagal memuat topik.");
//         router.push('/forum');
//     } finally { setLoading(false); }
//   };

//   const markNotificationsAsRead = async () => {
//       try {
//           await api(`/api/notifications/mark-read/topic/${id}`, { method: 'PATCH' });
//           window.dispatchEvent(new Event('notification-updated')); 
//       } catch (e) { console.error(e); }
//   };

//   const getParticipants = () => {
//       if (!topic) return [];
//       const users = [topic.author];
//       topic.replies?.forEach((r: any) => users.push(r.user));
//       const uniqueUsers = Array.from(new Map(users.filter(u => u).map(u => [u._id, u])).values()).filter((u: any) => u._id !== user?.id);
//       return !mentionQuery ? uniqueUsers : uniqueUsers.filter((u: any) => u.name.toLowerCase().includes(mentionQuery.toLowerCase()));
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const val = e.target.value;
//       setReply(val);
//       const lastWord = val.split(' ').pop();
//       if (lastWord && lastWord.startsWith('@')) {
//           setMentionQuery(lastWord.substring(1));
//           setShowMentions(true);
//       } else {
//           setShowMentions(false);
//       }
//   };

//   const insertMention = (name: string) => {
//       const words = reply.split(' ');
//       words.pop(); setReply(words.join(' ') + ` @${name} `);
//       setShowMentions(false); inputRef.current?.focus();
//   };

//   const onEmojiClick = (emojiData: any) => {
//       setReply(prev => prev + emojiData.emoji);
//   };

//   const handleReply = async (e: React.FormEvent) => {
//       e.preventDefault();
//       if (!reply.trim()) return;
//       setSubmitting(true);
//       try {
//           await api(`/api/forum/${id}/reply`, { method: 'POST', body: { content: reply } });
//           setReply(''); setShowEmoji(false);
//           loadTopic(); 
//           setTimeout(() => commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
//       } catch (e: any) { alert(e.message); } 
//       finally { setSubmitting(false); }
//   };

//   // Actions Admin
//   const handleStatus = async (newStatus: 'approved' | 'rejected') => {
//       if(!confirm(`Ubah status menjadi ${newStatus}?`)) return;
//       try {
//           await api(`/api/forum/${id}/status`, { method: 'PATCH', body: { status: newStatus } });
//           loadTopic(); 
//       } catch (e: any) { alert(e.message); }
//   };

//   const handleDeleteTopic = async () => {
//       if(!confirm("Hapus topik ini?")) return;
//       try {
//           await api(`/api/forum/${id}`, { method: 'DELETE' });
//           router.push('/forum');
//       } catch (e: any) { alert(e.message); }
//   };

//   const handleDeleteReply = async (replyId: string) => {
//       if(!confirm("Hapus komentar ini?")) return;
//       try {
//           await api(`/api/forum/${id}/reply/${replyId}`, { method: 'DELETE' });
//           loadTopic();
//       } catch (e: any) { alert(e.message); }
//   };

//   // --- UI HELPER ---
//   const renderRoleBadge = (role: string) => {
//       const r = role ? role.toUpperCase() : 'USER';
//       if (['SUPER_ADMIN', 'FACILITATOR', 'ADMIN'].includes(r)) {
//           // [FIX] Properti title dipindahkan ke span untuk menghindari error TypeScript pada Icon
//           return (
//             <span title="Terverifikasi (Admin/Fasilitator)">
//                 <CheckCircle size={14} className="text-blue-500 fill-blue-50" />
//             </span>
//           );
//       }
//       return null;
//   };

//   const Avatar = ({ u, size = "w-10 h-10" }: { u: any, size?: string }) => {
//       if (!u) return <div className={`${size} bg-gray-200 rounded-full`} />;
//       if (u.avatarUrl) return <img src={getImageUrl(u.avatarUrl)} className={`${size} rounded-full object-cover border border-gray-200`} alt={u.name} />;
//       const initials = u.name?.substring(0, 2).toUpperCase() || "UN";
//       return <div className={`${size} rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-xs border border-gray-200`}>{initials}</div>;
//   };

//   if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin inline text-red-600"/> Memuat...</div>;
//   if (!topic) return null;

//   const userRole = user?.role?.toUpperCase() || '';
//   const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
//   const isOwner = user?.id === topic.author?._id;

//   return (
//     <Protected>
//       <div className="bg-gray-50 min-h-screen pb-32 font-sans">
        
//         {/* HEADER NAV */}
//         <div className="bg-white border-b border-gray-200 sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-sm">
//             <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-red-700 font-bold text-sm transition-colors" aria-label="Kembali ke Forum">
//                 <ArrowLeft size={18}/> Kembali ke Forum
//             </button>
//             {/* Menu Aksi (Delete) */}
//             {(isAdmin || isOwner) && (
//                 <button onClick={handleDeleteTopic} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Hapus Topik" aria-label="Hapus Topik">
//                     <Trash2 size={18}/>
//                 </button>
//             )}
//         </div>

//         <div className="max-w-3xl mx-auto px-4 py-8">

//             {/* STATUS ALERT (Jika Pending) */}
//             {topic.status === 'pending' && (
//                 <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-xl mb-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm animate-in fade-in zoom-in">
//                     <div className="flex items-center gap-3">
//                         <AlertCircle size={24} className="text-orange-600" />
//                         <div>
//                             <h3 className="font-bold text-sm">Menunggu Persetujuan Admin</h3>
//                             <p className="text-xs opacity-80">Topik ini belum terlihat oleh publik.</p>
//                         </div>
//                     </div>
//                     {isAdmin && (
//                         <div className="flex gap-2">
//                             <button onClick={() => handleStatus('approved')} className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-700 flex items-center gap-1 shadow-sm" aria-label="Setujui Topik"><CheckCircle size={14}/> Setujui</button>
//                             <button onClick={() => handleStatus('rejected')} className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-700 flex items-center gap-1 shadow-sm" aria-label="Tolak Topik"><XCircle size={14}/> Tolak</button>
//                         </div>
//                     )}
//                 </div>
//             )}

//             {/* MAIN CARD: TOPIK */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
//                 <div className="p-6 md:p-8">
//                     {/* Header Topik */}
//                     <div className="flex items-start gap-4 mb-6">
//                         <Avatar u={topic.author} size="w-12 h-12" />
//                         <div className="flex-1">
//                             <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{topic.title}</h1>
//                             <div className="flex items-center gap-2 text-xs text-gray-500">
//                                 <span className="font-bold text-gray-800 flex items-center gap-1">
//                                     {topic.author?.name || 'Anonim'} {renderRoleBadge(topic.author?.role)}
//                                 </span>
//                                 <span>•</span>
//                                 <span>{new Date(topic.createdAt).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</span>
//                                 <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] ml-2">
//                                     {topic.category}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Isi Konten */}
//                     <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap text-base border-t border-gray-100 pt-6">
//                         {topic.content}
//                     </div>
//                 </div>
//             </div>

//             {/* LIST KOMENTAR (TIMELINE STYLE) */}
//             <div className="mb-6 flex items-center gap-2 text-gray-800 font-bold text-lg px-2">
//                 <MessageCircle className="text-red-600"/> {topic.replies?.length || 0} Balasan
//             </div>

//             <div className="space-y-6 mb-24 relative">
//                 {/* Garis vertikal timeline */}
//                 <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 -z-10 hidden md:block"></div>

//                 {topic.replies?.length === 0 ? (
//                     <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
//                         Belum ada balasan. Yuk, mulai diskusi!
//                     </div>
//                 ) : (
//                     topic.replies.map((r: any, i: number) => {
//                         const isMe = user && (user.id === r.user?._id);
//                         return (
//                             <div key={r._id || i} className={`flex gap-4 md:pl-0 ${isMe ? 'flex-row-reverse' : ''}`}>
//                                 <div className="flex-shrink-0 z-10">
//                                     <Avatar u={r.user} size="w-10 h-10" />
//                                 </div>
                                
//                                 <div className={`flex-1 max-w-[90%] ${isMe ? 'text-right' : ''}`}>
//                                     <div className={`bg-white p-4 rounded-2xl shadow-sm border border-gray-100 inline-block text-left ${isMe ? 'bg-red-50 border-red-100 rounded-tr-none' : 'rounded-tl-none'}`}>
//                                         <div className="flex items-center gap-2 mb-1 justify-between">
//                                             <div className="flex items-center gap-1">
//                                                 <span className="font-bold text-xs text-gray-900">{r.user?.name}</span>
//                                                 {renderRoleBadge(r.user?.role)}
//                                             </div>
//                                             {isAdmin && (
//                                                 <button onClick={() => handleDeleteReply(r._id)} className="text-gray-300 hover:text-red-500 transition-colors" title="Hapus" aria-label="Hapus Komentar">
//                                                     <Trash2 size={12}/>
//                                                 </button>
//                                             )}
//                                         </div>
//                                         <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
//                                             {r.content.split(' ').map((word: string, idx: number) => 
//                                                 word.startsWith('@') ? <span key={idx} className="text-blue-600 font-bold">{word} </span> : word + ' '
//                                             )}
//                                         </p>
//                                         <div className="mt-2 text-[10px] text-gray-400 text-right">
//                                             {new Date(r.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })
//                 )}
//                 <div ref={commentsEndRef} />
//             </div>

//         </div>

//         {/* INPUT BAR (STICKY BOTTOM) */}
//         <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 md:p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
//             <div className="max-w-3xl mx-auto relative">
                
//                 {/* POPUP MENTIONS */}
//                 {showMentions && (
//                     <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-30 max-h-48 overflow-y-auto">
//                         <div className="bg-gray-50 px-3 py-2 text-xs font-bold text-gray-500 border-b">Mention Pengguna</div>
//                         {getParticipants().map((u: any) => (
//                             <button key={u._id} onClick={() => insertMention(u.name)} className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-sm transition-colors" aria-label={`Mention ${u.name}`}>
//                                 <Avatar u={u} size="w-6 h-6" /><span className="truncate font-medium">{u.name}</span>
//                             </button>
//                         ))}
//                     </div>
//                 )}
                
//                 {/* POPUP EMOJI */}
//                 {showEmoji && (
//                     <div className="absolute bottom-full right-0 mb-2 z-30 shadow-2xl rounded-xl border border-gray-200">
//                         <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={350} />
//                     </div>
//                 )}
                
//                 <form onSubmit={handleReply} className="flex gap-2 md:gap-3 items-end">
//                     <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-3 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-full transition-colors hidden md:block" aria-label="Buka Emoji">
//                         <Smile size={24}/>
//                     </button>
                    
//                     <div className="flex-1 bg-gray-100 border border-transparent focus-within:border-red-300 focus-within:bg-white rounded-2xl flex items-center px-4 py-2 transition-all">
//                         <input 
//                             ref={inputRef} 
//                             className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400 py-1"
//                             placeholder="Tulis balasan... (@ untuk mention)"
//                             value={reply}
//                             onChange={handleInputChange}
//                             disabled={submitting}
//                             aria-label="Input Balasan"
//                         />
//                     </div>

//                     <button 
//                         type="submit" 
//                         disabled={!reply.trim() || submitting}
//                         className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-transform active:scale-95 flex-shrink-0"
//                         title="Kirim Balasan"
//                         aria-label="Kirim Balasan"
//                     >
//                         <Send size={20}/>
//                     </button>
//                 </form>
//             </div>
//         </div>

//       </div>
//     </Protected>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api, getImageUrl } from '@/lib/api';
import Protected from '@/components/Protected'; // Komponen proteksi halaman
import ForumCommentSection from '@/components/ForumCommentSection'; // Komponen komentar
import { 
    ArrowLeft, Calendar, User, MessageCircle, Share2, MoreVertical 
} from 'lucide-react';
import Link from 'next/link';

export default function ForumDetailPage() {
    const params = useParams();
    const router = useRouter();
    const forumId = params?.id as string;

    const [forum, setForum] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!forumId) return;

        const fetchForum = async () => {
            try {
                setLoading(true);
                const data = await api(`/api/forum/${forumId}`);
                setForum(data);
            } catch (err: any) {
                console.error("Gagal load forum:", err);
                setError('Diskusi tidak ditemukan atau telah dihapus.');
            } finally {
                setLoading(false);
            }
        };

        fetchForum();
    }, [forumId]);

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        alert('Link diskusi berhasil disalin!');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || !forum) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h2>
                <p className="text-gray-500 mb-6">{error}</p>
                <Link href="/forum" className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors">
                    Kembali ke Daftar Diskusi
                </Link>
            </div>
        );
    }

    return (
        <Protected>
            <div className="min-h-screen bg-gray-50 pb-20 font-sans">
                {/* HEADER NAVIGASI */}
                <header className="bg-white sticky top-0 z-40 border-b border-gray-200 shadow-sm">
                    <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                        <button 
                            onClick={() => router.back()} 
                            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors font-medium text-sm"
                        >
                            <ArrowLeft size={18} /> Kembali
                        </button>
                        <h1 className="text-sm font-bold text-gray-500 uppercase tracking-widest hidden md:block">Forum Diskusi</h1>
                        {/* [FIX] Added aria-label & title to More Button */}
                        <button 
                            className="p-2 hover:bg-gray-100 rounded-full text-gray-500" 
                            aria-label="Opsi Lainnya" 
                            title="Opsi Lainnya"
                        >
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto px-4 py-8">
                    {/* KONTEN UTAMA DISKUSI */}
                    <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                        <div className="p-6 md:p-8">
                            <span className="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
                                {forum.category || 'Diskusi Umum'}
                            </span>

                            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
                                {forum.title}
                            </h1>

                            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                                <div className="relative">
                                    {forum.author?.avatarUrl ? (
                                        <img 
                                            src={getImageUrl(forum.author.avatarUrl)} 
                                            alt={forum.author.name} 
                                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                                            {forum.author?.name?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{forum.author?.name || 'Anonim'}</p>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                        <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(forum.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><ClockIconTime time={forum.createdAt} /></span>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleShare}
                                    className="ml-auto flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    <Share2 size={14} /> Share
                                </button>
                            </div>

                            <div className="prose max-w-none text-gray-700 leading-relaxed text-base">
                                <div dangerouslySetInnerHTML={{ __html: forum.content }} />
                            </div>
                        </div>
                    </article>

                    {/* KOMENTAR SECTION */}
                    <div id="comments-section">
                        <ForumCommentSection forumId={forumId} />
                    </div>
                </main>
            </div>
        </Protected>
    );
}

function ClockIconTime({ time }: { time: string }) {
    const date = new Date(time);
    return <>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</>;
}
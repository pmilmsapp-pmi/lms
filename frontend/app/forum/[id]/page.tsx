// // // // // // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // // // // // // // // // // import { api } from '@/lib/api';
// // // // // // // // // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';

// // // // // // // // // // // // // // // // // export default function ForumDetailPage() {
// // // // // // // // // // // // // // // // //   const { id } = useParams();
// // // // // // // // // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // // // // // // // // //   const router = useRouter();
  
// // // // // // // // // // // // // // // // //   const [topic, setTopic] = useState<any>(null);
// // // // // // // // // // // // // // // // //   const [replyContent, setReplyContent] = useState('');
// // // // // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // // // // // // // // // // // //   useEffect(() => { loadTopic(); }, [id]);

// // // // // // // // // // // // // // // // //   const loadTopic = async () => {
// // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // //       const data = await api(`/api/forum/${id}`);
// // // // // // // // // // // // // // // // //       setTopic(data);
// // // // // // // // // // // // // // // // //     } catch (err) { console.error(err); } 
// // // // // // // // // // // // // // // // //     finally { setLoading(false); }
// // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // //   const handleReply = async (e: React.FormEvent) => {
// // // // // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // // // // //     if(!replyContent.trim()) return;
// // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // //       await api(`/api/forum/${id}/reply`, { method: 'POST', body: { content: replyContent } });
// // // // // // // // // // // // // // // // //       setReplyContent('');
// // // // // // // // // // // // // // // // //       loadTopic(); // Refresh balasan
// // // // // // // // // // // // // // // // //     } catch (err) { alert('Gagal mengirim balasan'); }
// // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // //   if (loading) return <div className="p-10 text-center">Memuat...</div>;
// // // // // // // // // // // // // // // // //   if (!topic) return <div className="p-10 text-center">Topik tidak ditemukan</div>;

// // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // //     <div className="min-h-screen bg-gray-50 py-10">
// // // // // // // // // // // // // // // // //       <div className="max-w-4xl mx-auto px-6">
// // // // // // // // // // // // // // // // //         <button onClick={() => router.back()} className="text-sm font-bold text-gray-500 mb-4 hover:text-red-700">← Kembali ke Forum</button>

// // // // // // // // // // // // // // // // //         {/* MAIN POST */}
// // // // // // // // // // // // // // // // //         <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
// // // // // // // // // // // // // // // // //           <h1 className="text-2xl font-bold text-gray-900 mb-4">{topic.title}</h1>
// // // // // // // // // // // // // // // // //           <div className="flex items-center gap-3 mb-6 pb-6 border-b">
// // // // // // // // // // // // // // // // //             <div className="w-10 h-10 rounded-full bg-red-100 overflow-hidden">
// // // // // // // // // // // // // // // // //                {/* eslint-disable-next-line @next/next/no-img-element */}
// // // // // // // // // // // // // // // // //               <img src={topic.author?.avatarUrl || `https://ui-avatars.com/api/?name=${topic.author?.name}`} alt="av" />
// // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // //             <div>
// // // // // // // // // // // // // // // // //               <p className="font-bold text-sm">{topic.author?.name}</p>
// // // // // // // // // // // // // // // // //               <p className="text-xs text-gray-500">{new Date(topic.createdAt).toLocaleString('id-ID')}</p>
// // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //           <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
// // // // // // // // // // // // // // // // //             {topic.content}
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // // // //         {/* REPLIES LIST */}
// // // // // // // // // // // // // // // // //         <h3 className="font-bold text-gray-700 mb-4">Balasan ({topic.replies?.length})</h3>
// // // // // // // // // // // // // // // // //         <div className="space-y-6 mb-10">
// // // // // // // // // // // // // // // // //           {topic.replies?.map((reply: any, idx: number) => (
// // // // // // // // // // // // // // // // //             <div key={idx} className="flex gap-4">
// // // // // // // // // // // // // // // // //               <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 mt-1">
// // // // // // // // // // // // // // // // //                  {/* eslint-disable-next-line @next/next/no-img-element */}
// // // // // // // // // // // // // // // // //                 <img src={reply.author?.avatarUrl || `https://ui-avatars.com/api/?name=${reply.author?.name}`} alt="av" />
// // // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // // //               <div className="bg-white p-4 rounded-r-2xl rounded-bl-2xl shadow-sm border border-gray-100 flex-1">
// // // // // // // // // // // // // // // // //                 <div className="flex justify-between items-center mb-2">
// // // // // // // // // // // // // // // // //                   <span className="font-bold text-sm">{reply.author?.name}</span>
// // // // // // // // // // // // // // // // //                   <span className="text-xs text-gray-400">{new Date(reply.createdAt).toLocaleDateString('id-ID')}</span>
// // // // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // // // //                 <p className="text-gray-700 text-sm whitespace-pre-wrap">{reply.content}</p>
// // // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // //           ))}
// // // // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // // // //         {/* REPLY FORM */}
// // // // // // // // // // // // // // // // //         {user ? (
// // // // // // // // // // // // // // // // //           <div className="bg-white p-4 rounded-2xl shadow-lg border sticky bottom-6">
// // // // // // // // // // // // // // // // //             <form onSubmit={handleReply} className="flex gap-4">
// // // // // // // // // // // // // // // // //               <input 
// // // // // // // // // // // // // // // // //                 className="flex-1 p-3 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none"
// // // // // // // // // // // // // // // // //                 placeholder="Tulis balasan Anda..."
// // // // // // // // // // // // // // // // //                 value={replyContent}
// // // // // // // // // // // // // // // // //                 onChange={e => setReplyContent(e.target.value)}
// // // // // // // // // // // // // // // // //               />
// // // // // // // // // // // // // // // // //               <button className="bg-red-700 text-white px-6 rounded-xl font-bold hover:bg-red-800">
// // // // // // // // // // // // // // // // //                 Kirim
// // // // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // // // //             </form>
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //         ) : (
// // // // // // // // // // // // // // // // //           <div className="text-center p-4 bg-red-50 rounded-xl text-red-800 font-medium">
// // // // // // // // // // // // // // // // //             Silakan login untuk membalas diskusi.
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //         )}

// // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // // // // import { useEffect, useState, useRef } from 'react';
// // // // // // // // // // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // // // // // // // // // import { ArrowLeft, Send, MessageCircle, User, Reply } from 'lucide-react';

// // // // // // // // // // // // // // // // export default function ForumDetailPage() {
// // // // // // // // // // // // // // // //   const { id } = useParams();
// // // // // // // // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // // // // // // // //   const router = useRouter();
  
// // // // // // // // // // // // // // // //   const [topic, setTopic] = useState<any>(null);
// // // // // // // // // // // // // // // //   const [replyContent, setReplyContent] = useState('');
// // // // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // // // //   const [submitting, setSubmitting] = useState(false);

// // // // // // // // // // // // // // // //   // Ref untuk input balasan agar bisa auto-focus saat klik "Balas"
// // // // // // // // // // // // // // // //   const replyInputRef = useRef<HTMLTextAreaElement>(null);

// // // // // // // // // // // // // // // //   useEffect(() => { loadTopic(); }, [id]);

// // // // // // // // // // // // // // // //   const loadTopic = async () => {
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //       const data = await api(`/api/forum/${id}`);
// // // // // // // // // // // // // // // //       setTopic(data);
// // // // // // // // // // // // // // // //     } catch (err) { console.error(err); } 
// // // // // // // // // // // // // // // //     finally { setLoading(false); }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   const handleReply = async (e: React.FormEvent) => {
// // // // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // // // //     if(!replyContent.trim()) return;
    
// // // // // // // // // // // // // // // //     setSubmitting(true);
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //       await api(`/api/forum/${id}/reply`, { method: 'POST', body: { content: replyContent } });
// // // // // // // // // // // // // // // //       setReplyContent('');
// // // // // // // // // // // // // // // //       loadTopic(); // Refresh komentar
// // // // // // // // // // // // // // // //     } catch (err: any) { 
// // // // // // // // // // // // // // // //         alert('Gagal mengirim balasan: ' + err.message); 
// // // // // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // // // // //         setSubmitting(false);
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // --- FITUR MENTION ---
// // // // // // // // // // // // // // // //   const handleMention = (userName: string) => {
// // // // // // // // // // // // // // // //       const mentionText = `@${userName} `;
// // // // // // // // // // // // // // // //       setReplyContent((prev) => prev + mentionText);
// // // // // // // // // // // // // // // //       replyInputRef.current?.focus(); // Fokus ke textarea
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // --- HELPER AVATAR AMAN (Fallback ke Inisial) ---
// // // // // // // // // // // // // // // //   const renderAvatar = (imgUrl: string | null, name: string) => {
// // // // // // // // // // // // // // // //       return (
// // // // // // // // // // // // // // // //           <img 
// // // // // // // // // // // // // // // //               src={getImageUrl(imgUrl) || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`} 
// // // // // // // // // // // // // // // //               alt={name}
// // // // // // // // // // // // // // // //               className="w-full h-full object-cover"
// // // // // // // // // // // // // // // //               onError={(e) => { 
// // // // // // // // // // // // // // // //                   (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`; 
// // // // // // // // // // // // // // // //               }}
// // // // // // // // // // // // // // // //           />
// // // // // // // // // // // // // // // //       );
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   if (loading) return <div className="p-20 text-center"><div className="animate-spin h-8 w-8 border-4 border-red-700 border-t-transparent rounded-full mx-auto"></div></div>;
// // // // // // // // // // // // // // // //   if (!topic) return <div className="p-20 text-center">Topik tidak ditemukan</div>;

// // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // //     <Protected>
// // // // // // // // // // // // // // // //       <div className="max-w-5xl mx-auto p-6 min-h-screen pb-32 font-sans">
        
// // // // // // // // // // // // // // // //         {/* Tombol Kembali */}
// // // // // // // // // // // // // // // //         <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-6 hover:text-red-700 transition">
// // // // // // // // // // // // // // // //             <ArrowLeft size={18} /> Kembali ke Forum
// // // // // // // // // // // // // // // //         </button>

// // // // // // // // // // // // // // // //         {/* --- 1. KONTEN UTAMA (POSTINGAN) --- */}
// // // // // // // // // // // // // // // //         <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-8">
          
// // // // // // // // // // // // // // // //           {/* Header Post */}
// // // // // // // // // // // // // // // //           <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
// // // // // // // // // // // // // // // //             <div className="w-14 h-14 rounded-full border border-gray-100 overflow-hidden flex-shrink-0">
// // // // // // // // // // // // // // // //                {renderAvatar(topic.creator?.avatarUrl, topic.creator?.name || 'User')}
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //             <div className="flex-1">
// // // // // // // // // // // // // // // //                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{topic.title}</h1>
// // // // // // // // // // // // // // // //                <div className="flex items-center gap-3 text-sm text-gray-500">
// // // // // // // // // // // // // // // //                   <span className="font-bold text-gray-800">{topic.creator?.name}</span>
// // // // // // // // // // // // // // // //                   <span>•</span>
// // // // // // // // // // // // // // // //                   <span>{new Date(topic.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
// // // // // // // // // // // // // // // //                   <span>•</span>
// // // // // // // // // // // // // // // //                   <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">{topic.category}</span>
// // // // // // // // // // // // // // // //                </div>
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //           </div>

// // // // // // // // // // // // // // // //           {/* Isi Post */}
// // // // // // // // // // // // // // // //           <div className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
// // // // // // // // // // // // // // // //             {topic.content}
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // // //         {/* --- 2. LIST BALASAN (KOMENTAR) --- */}
// // // // // // // // // // // // // // // //         <div className="mb-8">
// // // // // // // // // // // // // // // //             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
// // // // // // // // // // // // // // // //                 <MessageCircle size={20} className="text-red-700"/> 
// // // // // // // // // // // // // // // //                 {topic.replies?.length || 0} Balasan
// // // // // // // // // // // // // // // //             </h3>
            
// // // // // // // // // // // // // // // //             <div className="space-y-4">
// // // // // // // // // // // // // // // //                 {topic.replies?.map((reply: any, idx: number) => (
// // // // // // // // // // // // // // // //                     <div key={idx} className="flex gap-4 group">
// // // // // // // // // // // // // // // //                         <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 mt-1 border border-gray-200">
// // // // // // // // // // // // // // // //                             {renderAvatar(reply.author?.avatarUrl, reply.author?.name || 'User')}
// // // // // // // // // // // // // // // //                         </div>
                        
// // // // // // // // // // // // // // // //                         <div className="flex-1 bg-white p-5 rounded-r-2xl rounded-bl-2xl shadow-sm border border-gray-100 relative">
// // // // // // // // // // // // // // // //                             {/* Header Komentar */}
// // // // // // // // // // // // // // // //                             <div className="flex justify-between items-start mb-2">
// // // // // // // // // // // // // // // //                                 <div>
// // // // // // // // // // // // // // // //                                     <span className="font-bold text-gray-900 text-sm mr-2">{reply.author?.name}</span>
// // // // // // // // // // // // // // // //                                     <span className="text-xs text-gray-400">{new Date(reply.createdAt).toLocaleDateString('id-ID')}</span>
// // // // // // // // // // // // // // // //                                 </div>
// // // // // // // // // // // // // // // //                                 {/* TOMBOL REPLY / MENTION */}
// // // // // // // // // // // // // // // //                                 {user && (
// // // // // // // // // // // // // // // //                                     <button 
// // // // // // // // // // // // // // // //                                         onClick={() => handleMention(reply.author?.name)}
// // // // // // // // // // // // // // // //                                         className="text-gray-400 hover:text-red-700 flex items-center gap-1 text-xs font-bold transition-colors opacity-0 group-hover:opacity-100"
// // // // // // // // // // // // // // // //                                         title="Balas dengan mention"
// // // // // // // // // // // // // // // //                                     >
// // // // // // // // // // // // // // // //                                         <Reply size={14} /> Balas
// // // // // // // // // // // // // // // //                                     </button>
// // // // // // // // // // // // // // // //                                 )}
// // // // // // // // // // // // // // // //                             </div>
                            
// // // // // // // // // // // // // // // //                             {/* Isi Komentar dengan Highlight Mention */}
// // // // // // // // // // // // // // // //                             <p className="text-gray-700 text-sm whitespace-pre-wrap">
// // // // // // // // // // // // // // // //                                 {reply.content.split(' ').map((word: string, i: number) => 
// // // // // // // // // // // // // // // //                                     word.startsWith('@') ? <span key={i} className="text-blue-600 font-bold">{word} </span> : word + ' '
// // // // // // // // // // // // // // // //                                 )}
// // // // // // // // // // // // // // // //                             </p>
// // // // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // // //                 ))}

// // // // // // // // // // // // // // // //                 {(!topic.replies || topic.replies.length === 0) && (
// // // // // // // // // // // // // // // //                     <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-400">
// // // // // // // // // // // // // // // //                         Belum ada balasan. Jadilah yang pertama!
// // // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // // //         {/* --- 3. FORM INPUT BALASAN --- */}
// // // // // // // // // // // // // // // //         {user ? (
// // // // // // // // // // // // // // // //           <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 sticky bottom-6 z-30">
// // // // // // // // // // // // // // // //             <form onSubmit={handleReply} className="flex flex-col gap-3">
// // // // // // // // // // // // // // // //                {/* Info User yang sedang mengetik */}
// // // // // // // // // // // // // // // //                <div className="flex items-center gap-2 text-xs text-gray-400 px-1">
// // // // // // // // // // // // // // // //                   <User size={12}/> Membalas sebagai <span className="font-bold text-gray-600">{user.name}</span>
// // // // // // // // // // // // // // // //                </div>

// // // // // // // // // // // // // // // //                <div className="flex gap-3">
// // // // // // // // // // // // // // // //                   <textarea 
// // // // // // // // // // // // // // // //                     ref={replyInputRef}
// // // // // // // // // // // // // // // //                     className="flex-1 p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition text-sm resize-none"
// // // // // // // // // // // // // // // //                     placeholder="Tulis balasan Anda disini... (Gunakan @ untuk mention)"
// // // // // // // // // // // // // // // //                     rows={2}
// // // // // // // // // // // // // // // //                     value={replyContent}
// // // // // // // // // // // // // // // //                     onChange={e => setReplyContent(e.target.value)}
// // // // // // // // // // // // // // // //                   />
// // // // // // // // // // // // // // // //                   <button 
// // // // // // // // // // // // // // // //                     disabled={submitting}
// // // // // // // // // // // // // // // //                     className="bg-red-700 text-white px-6 rounded-xl font-bold hover:bg-red-800 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-1 min-w-[80px]"
// // // // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // // // //                     {submitting ? (
// // // // // // // // // // // // // // // //                         <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
// // // // // // // // // // // // // // // //                     ) : (
// // // // // // // // // // // // // // // //                         <>
// // // // // // // // // // // // // // // //                             <Send size={20} />
// // // // // // // // // // // // // // // //                             <span className="text-[10px]">Kirim</span>
// // // // // // // // // // // // // // // //                         </>
// // // // // // // // // // // // // // // //                     )}
// // // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // // //                </div>
// // // // // // // // // // // // // // // //             </form>
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //         ) : (
// // // // // // // // // // // // // // // //           <div className="text-center p-4 bg-red-50 rounded-xl text-red-800 font-medium sticky bottom-6 shadow-md border border-red-100">
// // // // // // // // // // // // // // // //             Silakan login untuk ikut berdiskusi.
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //         )}

// // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // //     </Protected>
// // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // // // import { useEffect, useState, useRef } from 'react';
// // // // // // // // // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // // // // // // // // import { ArrowLeft, Send, MessageCircle, User, Reply } from 'lucide-react';

// // // // // // // // // // // // // // // export default function ForumDetailPage() {
// // // // // // // // // // // // // // //   const { id } = useParams();
// // // // // // // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // // // // // // //   const router = useRouter();
  
// // // // // // // // // // // // // // //   const [topic, setTopic] = useState<any>(null);
// // // // // // // // // // // // // // //   const [replyContent, setReplyContent] = useState('');
// // // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // // //   const [submitting, setSubmitting] = useState(false);
// // // // // // // // // // // // // // //   const replyInputRef = useRef<HTMLTextAreaElement>(null);

// // // // // // // // // // // // // // //   useEffect(() => { loadTopic(); }, [id]);

// // // // // // // // // // // // // // //   const loadTopic = async () => {
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       const data = await api(`/api/forum/${id}`);
// // // // // // // // // // // // // // //       setTopic(data);
// // // // // // // // // // // // // // //     } catch (err) { console.error(err); } finally { setLoading(false); }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleReply = async (e: React.FormEvent) => {
// // // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // // //     if(!replyContent.trim()) return;
// // // // // // // // // // // // // // //     setSubmitting(true);
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       await api(`/api/forum/${id}/reply`, { method: 'POST', body: { content: replyContent } });
// // // // // // // // // // // // // // //       setReplyContent('');
// // // // // // // // // // // // // // //       loadTopic();
// // // // // // // // // // // // // // //     } catch (err: any) { alert('Gagal: ' + err.message); } finally { setSubmitting(false); }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleMention = (userName: string) => {
// // // // // // // // // // // // // // //       setReplyContent((prev) => prev + `@${userName} `);
// // // // // // // // // // // // // // //       replyInputRef.current?.focus();
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const renderAvatar = (topicImg: string | null, userImg: string | null, name: string) => {
// // // // // // // // // // // // // // //       const src = (topicImg && getImageUrl(topicImg)) || 
// // // // // // // // // // // // // // //                   (userImg && getImageUrl(userImg)) || 
// // // // // // // // // // // // // // //                   `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
      
// // // // // // // // // // // // // // //       return <img src={src} alt={name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`; }} />;
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat...</div>;
// // // // // // // // // // // // // // //   if (!topic) return <div className="p-20 text-center">Topik tidak ditemukan</div>;

// // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // //     <Protected>
// // // // // // // // // // // // // // //       <div className="max-w-5xl mx-auto p-6 min-h-screen pb-32 font-sans">
// // // // // // // // // // // // // // //         <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-6 hover:text-red-700 transition"><ArrowLeft size={18} /> Kembali</button>

// // // // // // // // // // // // // // //         {/* POST UTAMA */}
// // // // // // // // // // // // // // //         <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-8">
// // // // // // // // // // // // // // //           <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
// // // // // // // // // // // // // // //             <div className="w-14 h-14 rounded-full border border-gray-100 overflow-hidden flex-shrink-0">
// // // // // // // // // // // // // // //                {renderAvatar(topic.avatarUrl, topic.creator?.avatarUrl, topic.creator?.name || 'User')}
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //             <div className="flex-1">
// // // // // // // // // // // // // // //                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{topic.title}</h1>
// // // // // // // // // // // // // // //                <div className="flex items-center gap-3 text-sm text-gray-500">
// // // // // // // // // // // // // // //                   <span className="font-bold text-gray-800">{topic.creator?.name}</span>
// // // // // // // // // // // // // // //                   <span>•</span><span>{new Date(topic.createdAt).toLocaleString()}</span>
// // // // // // // // // // // // // // //                   <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-bold uppercase">{topic.category}</span>
// // // // // // // // // // // // // // //                </div>
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //           <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">{topic.content}</div>
// // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // //         {/* KOMENTAR */}
// // // // // // // // // // // // // // //         <div className="mb-8">
// // // // // // // // // // // // // // //             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><MessageCircle size={20} className="text-red-700"/> {topic.replies?.length || 0} Balasan</h3>
// // // // // // // // // // // // // // //             <div className="space-y-4">
// // // // // // // // // // // // // // //                 {topic.replies?.map((reply: any, idx: number) => (
// // // // // // // // // // // // // // //                     <div key={idx} className="flex gap-4 group">
// // // // // // // // // // // // // // //                         <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 mt-1 border border-gray-200">
// // // // // // // // // // // // // // //                             {renderAvatar(null, reply.author?.avatarUrl, reply.author?.name || 'User')}
// // // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // // //                         <div className="flex-1 bg-white p-5 rounded-r-2xl rounded-bl-2xl shadow-sm border border-gray-100">
// // // // // // // // // // // // // // //                             <div className="flex justify-between items-start mb-2">
// // // // // // // // // // // // // // //                                 <div><span className="font-bold text-gray-900 text-sm mr-2">{reply.author?.name}</span><span className="text-xs text-gray-400">{new Date(reply.createdAt).toLocaleDateString()}</span></div>
// // // // // // // // // // // // // // //                                 {user && <button onClick={() => handleMention(reply.author?.name)} className="text-gray-400 hover:text-red-700 flex items-center gap-1 text-xs font-bold transition-colors opacity-0 group-hover:opacity-100"><Reply size={14} /> Balas</button>}
// // // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // // //                             <p className="text-gray-700 text-sm whitespace-pre-wrap">
// // // // // // // // // // // // // // //                                 {reply.content.split(' ').map((word: string, i: number) => word.startsWith('@') ? <span key={i} className="text-blue-600 font-bold">{word} </span> : word + ' ')}
// // // // // // // // // // // // // // //                             </p>
// // // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // //         {/* INPUT FORM */}
// // // // // // // // // // // // // // //         {user ? (
// // // // // // // // // // // // // // //           <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 sticky bottom-6 z-30">
// // // // // // // // // // // // // // //             <form onSubmit={handleReply} className="flex flex-col gap-3">
// // // // // // // // // // // // // // //                <div className="flex gap-3">
// // // // // // // // // // // // // // //                   <textarea ref={replyInputRef} className="flex-1 p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500" placeholder="Tulis balasan..." rows={2} value={replyContent} onChange={e => setReplyContent(e.target.value)} />
// // // // // // // // // // // // // // //                   <button disabled={submitting} className="bg-red-700 text-white px-6 rounded-xl font-bold hover:bg-red-800 disabled:opacity-50"><Send size={20} /></button>
// // // // // // // // // // // // // // //                </div>
// // // // // // // // // // // // // // //             </form>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         ) : (<div className="text-center p-4 bg-red-50 rounded-xl text-red-800 font-medium sticky bottom-6">Login untuk membalas.</div>)}
// // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // //     </Protected>
// // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // // import { useEffect, useState, useRef } from 'react';
// // // // // // // // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // // // // // // // import { ArrowLeft, Send, MessageCircle, Reply } from 'lucide-react';

// // // // // // // // // // // // // // export default function ForumDetailPage() {
// // // // // // // // // // // // // //   const { id } = useParams();
// // // // // // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // // // // // //   const router = useRouter();
  
// // // // // // // // // // // // // //   const [topic, setTopic] = useState<any>(null);
// // // // // // // // // // // // // //   const [replyContent, setReplyContent] = useState('');
// // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // //   const [submitting, setSubmitting] = useState(false);
// // // // // // // // // // // // // //   const replyInputRef = useRef<HTMLTextAreaElement>(null);

// // // // // // // // // // // // // //   useEffect(() => { loadTopic(); }, [id]);

// // // // // // // // // // // // // //   const loadTopic = async () => {
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const data = await api(`/api/forum/${id}`);
// // // // // // // // // // // // // //       setTopic(data);
// // // // // // // // // // // // // //     } catch (err) { console.error(err); } finally { setLoading(false); }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handleReply = async (e: React.FormEvent) => {
// // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // //     if(!replyContent.trim()) return;
// // // // // // // // // // // // // //     setSubmitting(true);
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       await api(`/api/forum/${id}/reply`, { method: 'POST', body: { content: replyContent } });
// // // // // // // // // // // // // //       setReplyContent('');
// // // // // // // // // // // // // //       loadTopic();
// // // // // // // // // // // // // //     } catch (err: any) { alert('Gagal: ' + err.message); } finally { setSubmitting(false); }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handleMention = (userName: string) => {
// // // // // // // // // // // // // //       setReplyContent((prev) => prev + `@${userName} `);
// // // // // // // // // // // // // //       replyInputRef.current?.focus();
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const renderAvatar = (topicImg: string | null, userImg: string | null, name: string) => {
// // // // // // // // // // // // // //       const src = (topicImg && getImageUrl(topicImg)) || 
// // // // // // // // // // // // // //                   (userImg && getImageUrl(userImg)) || 
// // // // // // // // // // // // // //                   `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
      
// // // // // // // // // // // // // //       return <img src={src} alt={name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`; }} />;
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat...</div>;
// // // // // // // // // // // // // //   if (!topic) return <div className="p-20 text-center">Topik tidak ditemukan</div>;

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <Protected>
// // // // // // // // // // // // // //       <div className="max-w-5xl mx-auto p-6 min-h-screen pb-32 font-sans">
// // // // // // // // // // // // // //         {/* PERBAIKAN 1: Tambah aria-label pada tombol Kembali */}
// // // // // // // // // // // // // //         <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-6 hover:text-red-700 transition" aria-label="Kembali ke halaman sebelumnya">
// // // // // // // // // // // // // //             <ArrowLeft size={18} /> Kembali
// // // // // // // // // // // // // //         </button>

// // // // // // // // // // // // // //         <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-8">
// // // // // // // // // // // // // //           <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
// // // // // // // // // // // // // //             <div className="w-14 h-14 rounded-full border border-gray-100 overflow-hidden flex-shrink-0">
// // // // // // // // // // // // // //                {renderAvatar(topic.avatarUrl, topic.creator?.avatarUrl, topic.creator?.name || 'User')}
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //             <div className="flex-1">
// // // // // // // // // // // // // //                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{topic.title}</h1>
// // // // // // // // // // // // // //                <div className="flex items-center gap-3 text-sm text-gray-500">
// // // // // // // // // // // // // //                   <span className="font-bold text-gray-800">{topic.creator?.name}</span>
// // // // // // // // // // // // // //                   <span>•</span><span>{new Date(topic.createdAt).toLocaleString()}</span>
// // // // // // // // // // // // // //                   <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-bold uppercase">{topic.category}</span>
// // // // // // // // // // // // // //                </div>
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //           <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">{topic.content}</div>
// // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // //         <div className="mb-8">
// // // // // // // // // // // // // //             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><MessageCircle size={20} className="text-red-700"/> {topic.replies?.length || 0} Balasan</h3>
// // // // // // // // // // // // // //             <div className="space-y-4">
// // // // // // // // // // // // // //                 {topic.replies?.map((reply: any, idx: number) => (
// // // // // // // // // // // // // //                     <div key={idx} className="flex gap-4 group">
// // // // // // // // // // // // // //                         <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 mt-1 border border-gray-200">
// // // // // // // // // // // // // //                             {renderAvatar(null, reply.author?.avatarUrl, reply.author?.name || 'User')}
// // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // //                         <div className="flex-1 bg-white p-5 rounded-r-2xl rounded-bl-2xl shadow-sm border border-gray-100">
// // // // // // // // // // // // // //                             <div className="flex justify-between items-start mb-2">
// // // // // // // // // // // // // //                                 <div><span className="font-bold text-gray-900 text-sm mr-2">{reply.author?.name}</span><span className="text-xs text-gray-400">{new Date(reply.createdAt).toLocaleDateString()}</span></div>
// // // // // // // // // // // // // //                                 {/* PERBAIKAN 2: Tambah aria-label pada tombol Reply */}
// // // // // // // // // // // // // //                                 {user && <button onClick={() => handleMention(reply.author?.name)} className="text-gray-400 hover:text-red-700 flex items-center gap-1 text-xs font-bold transition-colors opacity-0 group-hover:opacity-100" aria-label={`Balas komentar ${reply.author?.name}`}><Reply size={14} /> Balas</button>}
// // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // //                             <p className="text-gray-700 text-sm whitespace-pre-wrap">
// // // // // // // // // // // // // //                                 {reply.content.split(' ').map((word: string, i: number) => word.startsWith('@') ? <span key={i} className="text-blue-600 font-bold">{word} </span> : word + ' ')}
// // // // // // // // // // // // // //                             </p>
// // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // //         {user ? (
// // // // // // // // // // // // // //           <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 sticky bottom-6 z-30">
// // // // // // // // // // // // // //             <form onSubmit={handleReply} className="flex flex-col gap-3">
// // // // // // // // // // // // // //                <div className="flex gap-3">
// // // // // // // // // // // // // //                   <textarea ref={replyInputRef} className="flex-1 p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500" placeholder="Tulis balasan..." rows={2} value={replyContent} onChange={e => setReplyContent(e.target.value)} />
// // // // // // // // // // // // // //                   {/* PERBAIKAN 3: Tambah aria-label pada tombol Kirim */}
// // // // // // // // // // // // // //                   <button disabled={submitting} className="bg-red-700 text-white px-6 rounded-xl font-bold hover:bg-red-800 disabled:opacity-50" aria-label="Kirim Balasan"><Send size={20} /></button>
// // // // // // // // // // // // // //                </div>
// // // // // // // // // // // // // //             </form>
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //         ) : (<div className="text-center p-4 bg-red-50 rounded-xl text-red-800 font-medium sticky bottom-6">Login untuk membalas.</div>)}
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //     </Protected>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // }
// // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // import { useEffect, useState, useRef } from 'react';
// // // // // // // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // // // // // // import { ArrowLeft, Send, MessageCircle, Reply, User as UserIcon } from 'lucide-react';

// // // // // // // // // // // // // export default function ForumDetailPage() {
// // // // // // // // // // // // //   const { id } = useParams();
// // // // // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // // // // //   const router = useRouter();
  
// // // // // // // // // // // // //   const [topic, setTopic] = useState<any>(null);
// // // // // // // // // // // // //   const [replyContent, setReplyContent] = useState('');
// // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // //   const [submitting, setSubmitting] = useState(false);
  
// // // // // // // // // // // // //   // -- STATE MENTION --
// // // // // // // // // // // // //   const [showMentions, setShowMentions] = useState(false);
// // // // // // // // // // // // //   const [mentionQuery, setMentionQuery] = useState('');
// // // // // // // // // // // // //   const [mentionResults, setMentionResults] = useState<any[]>([]);
// // // // // // // // // // // // //   const [mentionedIds, setMentionedIds] = useState<string[]>([]); // Simpan ID user yang dimention
  
// // // // // // // // // // // // //   const replyInputRef = useRef<HTMLTextAreaElement>(null);

// // // // // // // // // // // // //   useEffect(() => { loadTopic(); }, [id]);

// // // // // // // // // // // // //   // Effect untuk pencarian user saat mengetik @
// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     const searchUsers = async () => {
// // // // // // // // // // // // //         if (mentionQuery.length < 1) return;
// // // // // // // // // // // // //         try {
// // // // // // // // // // // // //             const res = await api(`/api/users/search?q=${mentionQuery}`);
// // // // // // // // // // // // //             setMentionResults(res);
// // // // // // // // // // // // //         } catch (e) { console.error(e); }
// // // // // // // // // // // // //     };

// // // // // // // // // // // // //     const delay = setTimeout(searchUsers, 300); // Debounce
// // // // // // // // // // // // //     return () => clearTimeout(delay);
// // // // // // // // // // // // //   }, [mentionQuery]);

// // // // // // // // // // // // //   const loadTopic = async () => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const data = await api(`/api/forum/${id}`);
// // // // // // // // // // // // //       setTopic(data);
// // // // // // // // // // // // //     } catch (err) { console.error(err); } finally { setLoading(false); }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Handler Input Textarea
// // // // // // // // // // // // //   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
// // // // // // // // // // // // //       const val = e.target.value;
// // // // // // // // // // // // //       setReplyContent(val);

// // // // // // // // // // // // //       // Deteksi kata terakhir
// // // // // // // // // // // // //       const lastWord = val.split(/(\s+)/).pop(); 
// // // // // // // // // // // // //       if (lastWord && lastWord.startsWith('@')) {
// // // // // // // // // // // // //           setMentionQuery(lastWord.substring(1)); // Ambil teks setelah @
// // // // // // // // // // // // //           setShowMentions(true);
// // // // // // // // // // // // //       } else {
// // // // // // // // // // // // //           setShowMentions(false);
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Handler saat User dipilih dari Dropdown
// // // // // // // // // // // // //   const selectMention = (u: any) => {
// // // // // // // // // // // // //       const parts = replyContent.split(/(\s+)/);
// // // // // // // // // // // // //       // Ganti kata terakhir (@ka...) dengan (@NamaLengkap )
// // // // // // // // // // // // //       parts.pop(); 
// // // // // // // // // // // // //       const newContent = parts.join('') + `@${u.name} `;
      
// // // // // // // // // // // // //       setReplyContent(newContent);
// // // // // // // // // // // // //       setMentionedIds(prev => [...prev, u._id]); // Simpan ID untuk backend
// // // // // // // // // // // // //       setShowMentions(false);
// // // // // // // // // // // // //       replyInputRef.current?.focus();
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleReply = async (e: React.FormEvent) => {
// // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // //     if(!replyContent.trim()) return;
// // // // // // // // // // // // //     setSubmitting(true);
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       // Kirim Content DAN ID User yang dimention
// // // // // // // // // // // // //       await api(`/api/forum/${id}/reply`, { 
// // // // // // // // // // // // //           method: 'POST', 
// // // // // // // // // // // // //           body: { 
// // // // // // // // // // // // //               content: replyContent,
// // // // // // // // // // // // //               mentionedUserIds: mentionedIds 
// // // // // // // // // // // // //           } 
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //       setReplyContent('');
// // // // // // // // // // // // //       setMentionedIds([]); // Reset
// // // // // // // // // // // // //       loadTopic();
// // // // // // // // // // // // //     } catch (err: any) { alert('Gagal: ' + err.message); } finally { setSubmitting(false); }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleManualMentionClick = (userName: string, userId: string) => {
// // // // // // // // // // // // //       setReplyContent((prev) => prev + `@${userName} `);
// // // // // // // // // // // // //       if(userId) setMentionedIds(prev => [...prev, userId]);
// // // // // // // // // // // // //       replyInputRef.current?.focus();
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const renderAvatar = (topicImg: string | null, userImg: string | null, name: string) => {
// // // // // // // // // // // // //       const src = (topicImg && getImageUrl(topicImg)) || 
// // // // // // // // // // // // //                   (userImg && getImageUrl(userImg)) || 
// // // // // // // // // // // // //                   `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
      
// // // // // // // // // // // // //       return <img src={src} alt={name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`; }} />;
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat...</div>;
// // // // // // // // // // // // //   if (!topic) return <div className="p-20 text-center">Topik tidak ditemukan</div>;

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <Protected>
// // // // // // // // // // // // //       <div className="max-w-5xl mx-auto p-6 min-h-screen pb-32 font-sans">
// // // // // // // // // // // // //         <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-6 hover:text-red-700 transition" aria-label="Kembali">
// // // // // // // // // // // // //             <ArrowLeft size={18} /> Kembali
// // // // // // // // // // // // //         </button>

// // // // // // // // // // // // //         {/* TOPIC CONTENT */}
// // // // // // // // // // // // //         <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-8">
// // // // // // // // // // // // //           <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
// // // // // // // // // // // // //             <div className="w-14 h-14 rounded-full border border-gray-100 overflow-hidden flex-shrink-0">
// // // // // // // // // // // // //                {renderAvatar(topic.avatarUrl, topic.creator?.avatarUrl, topic.creator?.name || 'User')}
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //             <div className="flex-1">
// // // // // // // // // // // // //                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{topic.title}</h1>
// // // // // // // // // // // // //                <div className="flex items-center gap-3 text-sm text-gray-500">
// // // // // // // // // // // // //                   <span className="font-bold text-gray-800">{topic.creator?.name}</span>
// // // // // // // // // // // // //                   <span>•</span><span>{new Date(topic.createdAt).toLocaleString()}</span>
// // // // // // // // // // // // //                   <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-bold uppercase">{topic.category}</span>
// // // // // // // // // // // // //                </div>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //           <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">{topic.content}</div>
// // // // // // // // // // // // //         </div>

// // // // // // // // // // // // //         {/* REPLIES */}
// // // // // // // // // // // // //         <div className="mb-8">
// // // // // // // // // // // // //             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><MessageCircle size={20} className="text-red-700"/> {topic.replies?.length || 0} Balasan</h3>
// // // // // // // // // // // // //             <div className="space-y-4">
// // // // // // // // // // // // //                 {topic.replies?.map((reply: any, idx: number) => (
// // // // // // // // // // // // //                     <div key={idx} className="flex gap-4 group">
// // // // // // // // // // // // //                         <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 mt-1 border border-gray-200">
// // // // // // // // // // // // //                             {renderAvatar(null, reply.author?.avatarUrl, reply.author?.name || 'User')}
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                         <div className="flex-1 bg-white p-5 rounded-r-2xl rounded-bl-2xl shadow-sm border border-gray-100">
// // // // // // // // // // // // //                             <div className="flex justify-between items-start mb-2">
// // // // // // // // // // // // //                                 <div><span className="font-bold text-gray-900 text-sm mr-2">{reply.author?.name}</span><span className="text-xs text-gray-400">{new Date(reply.createdAt).toLocaleDateString()}</span></div>
// // // // // // // // // // // // //                                 {user && (
// // // // // // // // // // // // //                                     <button 
// // // // // // // // // // // // //                                         onClick={() => handleManualMentionClick(reply.author?.name, reply.author?._id)} 
// // // // // // // // // // // // //                                         className="text-gray-400 hover:text-red-700 flex items-center gap-1 text-xs font-bold transition-colors opacity-0 group-hover:opacity-100" 
// // // // // // // // // // // // //                                         aria-label={`Balas ${reply.author?.name}`}
// // // // // // // // // // // // //                                     >
// // // // // // // // // // // // //                                         <Reply size={14} /> Balas
// // // // // // // // // // // // //                                     </button>
// // // // // // // // // // // // //                                 )}
// // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // //                             <p className="text-gray-700 text-sm whitespace-pre-wrap">
// // // // // // // // // // // // //                                 {reply.content.split(' ').map((word: string, i: number) => word.startsWith('@') ? <span key={i} className="text-blue-600 font-bold bg-blue-50 px-1 rounded">{word} </span> : word + ' ')}
// // // // // // // // // // // // //                             </p>
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //         </div>

// // // // // // // // // // // // //         {/* REPLY INPUT AREA */}
// // // // // // // // // // // // //         {user ? (
// // // // // // // // // // // // //           <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 sticky bottom-6 z-30">
            
// // // // // // // // // // // // //             {/* --- MENTION DROPDOWN (POPUP) --- */}
// // // // // // // // // // // // //             {showMentions && mentionResults.length > 0 && (
// // // // // // // // // // // // //                 <div className="absolute bottom-full left-4 mb-2 bg-white border border-gray-200 shadow-xl rounded-xl w-64 overflow-hidden z-50">
// // // // // // // // // // // // //                     <div className="p-2 bg-gray-50 border-b text-xs font-bold text-gray-500">Saran Pengguna:</div>
// // // // // // // // // // // // //                     {mentionResults.map(u => (
// // // // // // // // // // // // //                         <button 
// // // // // // // // // // // // //                             key={u._id} 
// // // // // // // // // // // // //                             onClick={() => selectMention(u)}
// // // // // // // // // // // // //                             className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-3 transition"
// // // // // // // // // // // // //                         >
// // // // // // // // // // // // //                              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 border">
// // // // // // // // // // // // //                                 {renderAvatar(null, u.avatarUrl, u.name)}
// // // // // // // // // // // // //                              </div>
// // // // // // // // // // // // //                              <div>
// // // // // // // // // // // // //                                  <p className="text-sm font-bold text-gray-800">{u.name}</p>
// // // // // // // // // // // // //                                  <p className="text-[10px] text-gray-500 uppercase">{u.role}</p>
// // // // // // // // // // // // //                              </div>
// // // // // // // // // // // // //                         </button>
// // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //             )}

// // // // // // // // // // // // //             <form onSubmit={handleReply} className="flex flex-col gap-3 relative">
// // // // // // // // // // // // //                <div className="flex gap-3">
// // // // // // // // // // // // //                   <textarea 
// // // // // // // // // // // // //                     ref={replyInputRef} 
// // // // // // // // // // // // //                     className="flex-1 p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500 resize-none" 
// // // // // // // // // // // // //                     placeholder="Tulis balasan... (Ketik @ untuk mention)" 
// // // // // // // // // // // // //                     rows={2} 
// // // // // // // // // // // // //                     value={replyContent} 
// // // // // // // // // // // // //                     onChange={handleInputChange} 
// // // // // // // // // // // // //                   />
// // // // // // // // // // // // //                   <button disabled={submitting} className="bg-red-700 text-white px-6 rounded-xl font-bold hover:bg-red-800 disabled:opacity-50 transition shadow-md" aria-label="Kirim">
// // // // // // // // // // // // //                     <Send size={20} />
// // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // //                </div>
// // // // // // // // // // // // //                <div className="text-[10px] text-gray-400 px-1">
// // // // // // // // // // // // //                    Tip: Ketik <b>@</b> untuk memanggil pengguna lain.
// // // // // // // // // // // // //                </div>
// // // // // // // // // // // // //             </form>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         ) : (<div className="text-center p-4 bg-red-50 rounded-xl text-red-800 font-medium sticky bottom-6">Login untuk membalas.</div>)}
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </Protected>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // }
// // // // // // // // // // // // 'use client';

// // // // // // // // // // // // import { useEffect, useState, useRef } from 'react';
// // // // // // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // // // // // import { ArrowLeft, Send, MessageCircle, Reply, Trash2, Pencil, X, Save } from 'lucide-react';

// // // // // // // // // // // // export default function ForumDetailPage() {
// // // // // // // // // // // //   const { id } = useParams();
// // // // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // // // //   const router = useRouter();
  
// // // // // // // // // // // //   const [topic, setTopic] = useState<any>(null);
// // // // // // // // // // // //   const [replyContent, setReplyContent] = useState('');
// // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // //   const [submitting, setSubmitting] = useState(false);
  
// // // // // // // // // // // //   // -- STATE MENTION --
// // // // // // // // // // // //   const [showMentions, setShowMentions] = useState(false);
// // // // // // // // // // // //   const [mentionQuery, setMentionQuery] = useState('');
// // // // // // // // // // // //   const [mentionResults, setMentionResults] = useState<any[]>([]);
// // // // // // // // // // // //   const [mentionedIds, setMentionedIds] = useState<string[]>([]);
  
// // // // // // // // // // // //   // -- STATE ADMIN EDIT --
// // // // // // // // // // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // // // // // // // // // // //   const [editingTopic, setEditingTopic] = useState<any>(null);
// // // // // // // // // // // //   const [cmsIcons, setCmsIcons] = useState<{name: string, iconUrl: string}[]>([]);
// // // // // // // // // // // //   const [cmsCategories, setCmsCategories] = useState<string[]>([]);
  
// // // // // // // // // // // //   const replyInputRef = useRef<HTMLTextAreaElement>(null);
// // // // // // // // // // // //   const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'FACILITATOR';

// // // // // // // // // // // //   useEffect(() => { 
// // // // // // // // // // // //       loadTopic(); 
// // // // // // // // // // // //       if(isAdmin) loadCmsSettings(); 
// // // // // // // // // // // //   }, [id, isAdmin]);

// // // // // // // // // // // //   // Effect pencarian user mention
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const searchUsers = async () => {
// // // // // // // // // // // //         if (mentionQuery.length < 1) return;
// // // // // // // // // // // //         try {
// // // // // // // // // // // //             const res = await api(`/api/users/search?q=${mentionQuery}`);
// // // // // // // // // // // //             setMentionResults(res);
// // // // // // // // // // // //         } catch (e) { console.error(e); }
// // // // // // // // // // // //     };
// // // // // // // // // // // //     const delay = setTimeout(searchUsers, 300);
// // // // // // // // // // // //     return () => clearTimeout(delay);
// // // // // // // // // // // //   }, [mentionQuery]);

// // // // // // // // // // // //   const loadTopic = async () => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const data = await api(`/api/forum/${id}`);
// // // // // // // // // // // //       setTopic(data);
// // // // // // // // // // // //     } catch (err) { console.error(err); } finally { setLoading(false); }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const loadCmsSettings = async () => {
// // // // // // // // // // // //       try {
// // // // // // // // // // // //           const content = await api('/api/content'); 
// // // // // // // // // // // //           if (content && content.forumCategories) {
// // // // // // // // // // // //               setCmsCategories(content.forumCategories.map((c: any) => c.name));
// // // // // // // // // // // //               setCmsIcons(content.forumCategories);
// // // // // // // // // // // //           }
// // // // // // // // // // // //       } catch (e) { console.error("Gagal load CMS:", e); }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // --- HANDLERS MENTION ---
// // // // // // // // // // // //   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
// // // // // // // // // // // //       const val = e.target.value;
// // // // // // // // // // // //       setReplyContent(val);
// // // // // // // // // // // //       const lastWord = val.split(/(\s+)/).pop(); 
// // // // // // // // // // // //       if (lastWord && lastWord.startsWith('@')) {
// // // // // // // // // // // //           setMentionQuery(lastWord.substring(1));
// // // // // // // // // // // //           setShowMentions(true);
// // // // // // // // // // // //       } else {
// // // // // // // // // // // //           setShowMentions(false);
// // // // // // // // // // // //       }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const selectMention = (u: any) => {
// // // // // // // // // // // //       const parts = replyContent.split(/(\s+)/);
// // // // // // // // // // // //       parts.pop(); 
// // // // // // // // // // // //       const newContent = parts.join('') + `@${u.name} `;
// // // // // // // // // // // //       setReplyContent(newContent);
// // // // // // // // // // // //       setMentionedIds(prev => [...prev, u._id]);
// // // // // // // // // // // //       setShowMentions(false);
// // // // // // // // // // // //       replyInputRef.current?.focus();
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // --- HANDLERS ACTION ---
// // // // // // // // // // // //   const handleReply = async (e: React.FormEvent) => {
// // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // //     if(!replyContent.trim()) return;
// // // // // // // // // // // //     setSubmitting(true);
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       await api(`/api/forum/${id}/reply`, { 
// // // // // // // // // // // //           method: 'POST', 
// // // // // // // // // // // //           body: { content: replyContent, mentionedUserIds: mentionedIds } 
// // // // // // // // // // // //       });
// // // // // // // // // // // //       setReplyContent('');
// // // // // // // // // // // //       setMentionedIds([]);
// // // // // // // // // // // //       loadTopic();
// // // // // // // // // // // //     } catch (err: any) { alert('Gagal: ' + err.message); } finally { setSubmitting(false); }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleManualMentionClick = (userName: string, userId: string) => {
// // // // // // // // // // // //       setReplyContent((prev) => prev + `@${userName} `);
// // // // // // // // // // // //       if(userId) setMentionedIds(prev => [...prev, userId]);
// // // // // // // // // // // //       replyInputRef.current?.focus();
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // --- HANDLERS ADMIN (DELETE REPLY & EDIT TOPIC) ---
// // // // // // // // // // // //   const handleDeleteReply = async (replyId: string) => {
// // // // // // // // // // // //       if(!confirm("Hapus pesan ini? Tindakan tidak dapat dibatalkan.")) return;
// // // // // // // // // // // //       try {
// // // // // // // // // // // //           await api(`/api/forum/${id}/reply/${replyId}`, { method: 'DELETE' });
// // // // // // // // // // // //           loadTopic(); // Reload
// // // // // // // // // // // //       } catch (e: any) { alert("Gagal hapus: " + e.message); }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleEditTopicOpen = () => {
// // // // // // // // // // // //       setEditingTopic({
// // // // // // // // // // // //           title: topic.title,
// // // // // // // // // // // //           category: topic.category,
// // // // // // // // // // // //           avatarUrl: topic.avatarUrl
// // // // // // // // // // // //       });
// // // // // // // // // // // //       setIsEditModalOpen(true);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleUpdateTopic = async () => {
// // // // // // // // // // // //       try {
// // // // // // // // // // // //           await api(`/api/forum/${id}`, {
// // // // // // // // // // // //               method: 'PATCH',
// // // // // // // // // // // //               body: editingTopic
// // // // // // // // // // // //           });
// // // // // // // // // // // //           setIsEditModalOpen(false);
// // // // // // // // // // // //           loadTopic();
// // // // // // // // // // // //           alert("Topik berhasil diperbarui!");
// // // // // // // // // // // //       } catch (e: any) { alert("Gagal update: " + e.message); }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const renderAvatar = (topicImg: string | null, userImg: string | null, name: string) => {
// // // // // // // // // // // //       const src = (topicImg && getImageUrl(topicImg)) || 
// // // // // // // // // // // //                   (userImg && getImageUrl(userImg)) || 
// // // // // // // // // // // //                   `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
// // // // // // // // // // // //       return <img src={src} alt={name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`; }} />;
// // // // // // // // // // // //   };

// // // // // // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat...</div>;
// // // // // // // // // // // //   if (!topic) return <div className="p-20 text-center">Topik tidak ditemukan</div>;

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <Protected>
// // // // // // // // // // // //       <div className="max-w-5xl mx-auto p-6 min-h-screen pb-32 font-sans">
// // // // // // // // // // // //         <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-6 hover:text-red-700 transition" aria-label="Kembali">
// // // // // // // // // // // //             <ArrowLeft size={18} /> Kembali
// // // // // // // // // // // //         </button>

// // // // // // // // // // // //         {/* TOPIC HEADER */}
// // // // // // // // // // // //         <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-8 relative group/header">
          
// // // // // // // // // // // //           {/* [ADMIN] TOMBOL EDIT TOPIK */}
// // // // // // // // // // // //           {isAdmin && (
// // // // // // // // // // // //               <button 
// // // // // // // // // // // //                 onClick={handleEditTopicOpen}
// // // // // // // // // // // //                 className="absolute top-4 right-4 bg-gray-100 hover:bg-amber-100 text-gray-500 hover:text-amber-600 p-2 rounded-lg transition"
// // // // // // // // // // // //                 aria-label="Edit Topik"
// // // // // // // // // // // //                 title="Edit Judul & Cover"
// // // // // // // // // // // //               >
// // // // // // // // // // // //                   <Pencil size={18} />
// // // // // // // // // // // //               </button>
// // // // // // // // // // // //           )}

// // // // // // // // // // // //           <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
// // // // // // // // // // // //             <div className="w-14 h-14 rounded-full border border-gray-100 overflow-hidden flex-shrink-0">
// // // // // // // // // // // //                {renderAvatar(topic.avatarUrl, topic.creator?.avatarUrl, topic.creator?.name || 'User')}
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //             <div className="flex-1">
// // // // // // // // // // // //                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2 pr-10">{topic.title}</h1>
// // // // // // // // // // // //                <div className="flex items-center gap-3 text-sm text-gray-500">
// // // // // // // // // // // //                   <span className="font-bold text-gray-800">{topic.creator?.name}</span>
// // // // // // // // // // // //                   <span>•</span><span>{new Date(topic.createdAt).toLocaleString()}</span>
// // // // // // // // // // // //                   <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-bold uppercase">{topic.category}</span>
// // // // // // // // // // // //                </div>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //           <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">{topic.content}</div>
// // // // // // // // // // // //         </div>

// // // // // // // // // // // //         {/* REPLIES LIST */}
// // // // // // // // // // // //         <div className="mb-8">
// // // // // // // // // // // //             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><MessageCircle size={20} className="text-red-700"/> {topic.replies?.length || 0} Balasan</h3>
// // // // // // // // // // // //             <div className="space-y-4">
// // // // // // // // // // // //                 {topic.replies?.map((reply: any, idx: number) => (
// // // // // // // // // // // //                     <div key={idx} className="flex gap-4 group">
// // // // // // // // // // // //                         <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 mt-1 border border-gray-200">
// // // // // // // // // // // //                             {renderAvatar(null, reply.author?.avatarUrl, reply.author?.name || 'User')}
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                         <div className="flex-1 bg-white p-5 rounded-r-2xl rounded-bl-2xl shadow-sm border border-gray-100 relative">
                            
// // // // // // // // // // // //                             {/* [ADMIN] TOMBOL HAPUS REPLY */}
// // // // // // // // // // // //                             {isAdmin && (
// // // // // // // // // // // //                                 <button 
// // // // // // // // // // // //                                     onClick={() => handleDeleteReply(reply._id)}
// // // // // // // // // // // //                                     className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded transition"
// // // // // // // // // // // //                                     title="Hapus Pesan"
// // // // // // // // // // // //                                 >
// // // // // // // // // // // //                                     <Trash2 size={14} />
// // // // // // // // // // // //                                 </button>
// // // // // // // // // // // //                             )}

// // // // // // // // // // // //                             <div className="flex justify-between items-start mb-2">
// // // // // // // // // // // //                                 <div><span className="font-bold text-gray-900 text-sm mr-2">{reply.author?.name}</span><span className="text-xs text-gray-400">{new Date(reply.createdAt).toLocaleDateString()}</span></div>
// // // // // // // // // // // //                                 {user && (
// // // // // // // // // // // //                                     <button 
// // // // // // // // // // // //                                         onClick={() => handleManualMentionClick(reply.author?.name, reply.author?._id)} 
// // // // // // // // // // // //                                         className="text-gray-400 hover:text-red-700 flex items-center gap-1 text-xs font-bold transition-colors opacity-0 group-hover:opacity-100 mr-6" 
// // // // // // // // // // // //                                         aria-label={`Balas ${reply.author?.name}`}
// // // // // // // // // // // //                                     >
// // // // // // // // // // // //                                         <Reply size={14} /> Balas
// // // // // // // // // // // //                                     </button>
// // // // // // // // // // // //                                 )}
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                             <p className="text-gray-700 text-sm whitespace-pre-wrap">
// // // // // // // // // // // //                                 {reply.content.split(' ').map((word: string, i: number) => word.startsWith('@') ? <span key={i} className="text-blue-600 font-bold bg-blue-50 px-1 rounded">{word} </span> : word + ' ')}
// // // // // // // // // // // //                             </p>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                 ))}
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //         </div>

// // // // // // // // // // // //         {/* INPUT AREA */}
// // // // // // // // // // // //         {user ? (
// // // // // // // // // // // //           <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 sticky bottom-6 z-30">
// // // // // // // // // // // //             {showMentions && mentionResults.length > 0 && (
// // // // // // // // // // // //                 <div className="absolute bottom-full left-4 mb-2 bg-white border border-gray-200 shadow-xl rounded-xl w-64 overflow-hidden z-50">
// // // // // // // // // // // //                     <div className="p-2 bg-gray-50 border-b text-xs font-bold text-gray-500">Saran Pengguna:</div>
// // // // // // // // // // // //                     {mentionResults.map(u => (
// // // // // // // // // // // //                         <button 
// // // // // // // // // // // //                             key={u._id} onClick={() => selectMention(u)}
// // // // // // // // // // // //                             className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-3 transition"
// // // // // // // // // // // //                         >
// // // // // // // // // // // //                              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 border">{renderAvatar(null, u.avatarUrl, u.name)}</div>
// // // // // // // // // // // //                              <div><p className="text-sm font-bold text-gray-800">{u.name}</p><p className="text-[10px] text-gray-500 uppercase">{u.role}</p></div>
// // // // // // // // // // // //                         </button>
// // // // // // // // // // // //                     ))}
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //             )}
// // // // // // // // // // // //             <form onSubmit={handleReply} className="flex flex-col gap-3 relative">
// // // // // // // // // // // //                <div className="flex gap-3">
// // // // // // // // // // // //                   <textarea 
// // // // // // // // // // // //                     ref={replyInputRef} 
// // // // // // // // // // // //                     className="flex-1 p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500 resize-none" 
// // // // // // // // // // // //                     placeholder="Tulis balasan... (Ketik @ untuk mention)" rows={2} 
// // // // // // // // // // // //                     value={replyContent} onChange={handleInputChange} 
// // // // // // // // // // // //                   />
// // // // // // // // // // // //                   <button disabled={submitting} className="bg-red-700 text-white px-6 rounded-xl font-bold hover:bg-red-800 disabled:opacity-50 transition shadow-md" aria-label="Kirim"><Send size={20} /></button>
// // // // // // // // // // // //                </div>
// // // // // // // // // // // //             </form>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         ) : (<div className="text-center p-4 bg-red-50 rounded-xl text-red-800 font-medium sticky bottom-6">Login untuk membalas.</div>)}

// // // // // // // // // // // //         {/* MODAL EDIT TOPIK (ADMIN) */}
// // // // // // // // // // // //         {isEditModalOpen && editingTopic && (
// // // // // // // // // // // //             <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4 backdrop-blur-sm">
// // // // // // // // // // // //                 <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl">
// // // // // // // // // // // //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
// // // // // // // // // // // //                         <h3 className="text-lg font-bold flex items-center gap-2"><Pencil size={18}/> Edit Topik</h3>
// // // // // // // // // // // //                         <button onClick={() => setIsEditModalOpen(false)}><X size={20} className="text-gray-400 hover:text-red-600"/></button>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     <div className="p-6 space-y-4">
// // // // // // // // // // // //                          <div>
// // // // // // // // // // // //                              <label className="text-xs font-bold text-gray-500 mb-1 block">Judul Topik</label>
// // // // // // // // // // // //                              <input type="text" value={editingTopic.title} onChange={(e) => setEditingTopic({...editingTopic, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Judul"/>
// // // // // // // // // // // //                          </div>
// // // // // // // // // // // //                          <div>
// // // // // // // // // // // //                              <label className="text-xs font-bold text-gray-500 mb-1 block">Kategori</label>
// // // // // // // // // // // //                              <select value={editingTopic.category} onChange={(e) => setEditingTopic({...editingTopic, category: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-white">
// // // // // // // // // // // //                                 {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
// // // // // // // // // // // //                              </select>
// // // // // // // // // // // //                          </div>
// // // // // // // // // // // //                          <div>
// // // // // // // // // // // //                              <label className="text-xs font-bold text-gray-500 mb-2 block">Cover / Icon Topik</label>
// // // // // // // // // // // //                              <div className="grid grid-cols-5 gap-3">
// // // // // // // // // // // //                                 <button onClick={() => setEditingTopic({...editingTopic, avatarUrl: null})} className={`aspect-square border-2 rounded-xl flex items-center justify-center text-[10px] font-bold ${!editingTopic.avatarUrl ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200'}`}>No Icon</button>
// // // // // // // // // // // //                                 {cmsIcons.map((cat, idx) => cat.iconUrl && (
// // // // // // // // // // // //                                     <button key={idx} onClick={() => setEditingTopic({...editingTopic, avatarUrl: cat.iconUrl})} className={`relative aspect-square border-2 rounded-xl overflow-hidden ${editingTopic.avatarUrl === cat.iconUrl ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'}`}>
// // // // // // // // // // // //                                         <img src={getImageUrl(cat.iconUrl)} alt="icon" className="w-full h-full object-cover" />
// // // // // // // // // // // //                                     </button>
// // // // // // // // // // // //                                 ))}
// // // // // // // // // // // //                              </div>
// // // // // // // // // // // //                          </div>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-2">
// // // // // // // // // // // //                         <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-bold text-sm">Batal</button>
// // // // // // // // // // // //                         <button onClick={handleUpdateTopic} className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-bold text-sm flex items-center gap-2"><Save size={16}/> Simpan Perubahan</button>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //         )}

// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </Protected>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }
// // // // // // // // // // // 'use client';

// // // // // // // // // // // import { useEffect, useState, useRef } from 'react';
// // // // // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // // // // import { ArrowLeft, Send, MessageCircle, Reply, Trash2, Pencil, X, Save } from 'lucide-react';

// // // // // // // // // // // export default function ForumDetailPage() {
// // // // // // // // // // //   const { id } = useParams();
// // // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // // //   const router = useRouter();
  
// // // // // // // // // // //   const [topic, setTopic] = useState<any>(null);
// // // // // // // // // // //   const [replyContent, setReplyContent] = useState('');
// // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // //   const [submitting, setSubmitting] = useState(false);
  
// // // // // // // // // // //   // -- STATE MENTION --
// // // // // // // // // // //   const [showMentions, setShowMentions] = useState(false);
// // // // // // // // // // //   const [mentionQuery, setMentionQuery] = useState('');
// // // // // // // // // // //   const [mentionResults, setMentionResults] = useState<any[]>([]);
// // // // // // // // // // //   const [mentionedIds, setMentionedIds] = useState<string[]>([]);
  
// // // // // // // // // // //   // -- STATE ADMIN EDIT --
// // // // // // // // // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // // // // // // // // // //   const [editingTopic, setEditingTopic] = useState<any>(null);
// // // // // // // // // // //   const [cmsIcons, setCmsIcons] = useState<{name: string, iconUrl: string}[]>([]);
// // // // // // // // // // //   const [cmsCategories, setCmsCategories] = useState<string[]>([]);
  
// // // // // // // // // // //   const replyInputRef = useRef<HTMLTextAreaElement>(null);
// // // // // // // // // // //   const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'FACILITATOR';

// // // // // // // // // // //   useEffect(() => { 
// // // // // // // // // // //       loadTopic(); 
// // // // // // // // // // //       if(isAdmin) loadCmsSettings(); 
// // // // // // // // // // //   }, [id, isAdmin]);

// // // // // // // // // // //   // Effect pencarian user mention
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const searchUsers = async () => {
// // // // // // // // // // //         if (mentionQuery.length < 1) return;
// // // // // // // // // // //         try {
// // // // // // // // // // //             const res = await api(`/api/users/search?q=${mentionQuery}`);
// // // // // // // // // // //             setMentionResults(res);
// // // // // // // // // // //         } catch (e) { console.error(e); }
// // // // // // // // // // //     };
// // // // // // // // // // //     const delay = setTimeout(searchUsers, 300);
// // // // // // // // // // //     return () => clearTimeout(delay);
// // // // // // // // // // //   }, [mentionQuery]);

// // // // // // // // // // //   const loadTopic = async () => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       const data = await api(`/api/forum/${id}`);
// // // // // // // // // // //       setTopic(data);
// // // // // // // // // // //     } catch (err) { console.error(err); } finally { setLoading(false); }
// // // // // // // // // // //   };

// // // // // // // // // // //   const loadCmsSettings = async () => {
// // // // // // // // // // //       try {
// // // // // // // // // // //           const content = await api('/api/content'); 
// // // // // // // // // // //           if (content && content.forumCategories) {
// // // // // // // // // // //               setCmsCategories(content.forumCategories.map((c: any) => c.name));
// // // // // // // // // // //               setCmsIcons(content.forumCategories);
// // // // // // // // // // //           }
// // // // // // // // // // //       } catch (e) { console.error("Gagal load CMS:", e); }
// // // // // // // // // // //   };

// // // // // // // // // // //   // --- HANDLERS MENTION ---
// // // // // // // // // // //   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
// // // // // // // // // // //       const val = e.target.value;
// // // // // // // // // // //       setReplyContent(val);
// // // // // // // // // // //       const lastWord = val.split(/(\s+)/).pop(); 
// // // // // // // // // // //       if (lastWord && lastWord.startsWith('@')) {
// // // // // // // // // // //           setMentionQuery(lastWord.substring(1));
// // // // // // // // // // //           setShowMentions(true);
// // // // // // // // // // //       } else {
// // // // // // // // // // //           setShowMentions(false);
// // // // // // // // // // //       }
// // // // // // // // // // //   };

// // // // // // // // // // //   const selectMention = (u: any) => {
// // // // // // // // // // //       const parts = replyContent.split(/(\s+)/);
// // // // // // // // // // //       parts.pop(); 
// // // // // // // // // // //       const newContent = parts.join('') + `@${u.name} `;
// // // // // // // // // // //       setReplyContent(newContent);
// // // // // // // // // // //       setMentionedIds(prev => [...prev, u._id]);
// // // // // // // // // // //       setShowMentions(false);
// // // // // // // // // // //       replyInputRef.current?.focus();
// // // // // // // // // // //   };

// // // // // // // // // // //   // --- HANDLERS ACTION ---
// // // // // // // // // // //   const handleReply = async (e: React.FormEvent) => {
// // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // //     if(!replyContent.trim()) return;
// // // // // // // // // // //     setSubmitting(true);
// // // // // // // // // // //     try {
// // // // // // // // // // //       await api(`/api/forum/${id}/reply`, { 
// // // // // // // // // // //           method: 'POST', 
// // // // // // // // // // //           body: { content: replyContent, mentionedUserIds: mentionedIds } 
// // // // // // // // // // //       });
// // // // // // // // // // //       setReplyContent('');
// // // // // // // // // // //       setMentionedIds([]);
// // // // // // // // // // //       loadTopic();
// // // // // // // // // // //     } catch (err: any) { alert('Gagal: ' + err.message); } finally { setSubmitting(false); }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleManualMentionClick = (userName: string, userId: string) => {
// // // // // // // // // // //       setReplyContent((prev) => prev + `@${userName} `);
// // // // // // // // // // //       if(userId) setMentionedIds(prev => [...prev, userId]);
// // // // // // // // // // //       replyInputRef.current?.focus();
// // // // // // // // // // //   };

// // // // // // // // // // //   // --- HANDLERS ADMIN (DELETE REPLY & EDIT TOPIC) ---
// // // // // // // // // // //   const handleDeleteReply = async (replyId: string) => {
// // // // // // // // // // //       if(!confirm("Hapus pesan ini? Tindakan tidak dapat dibatalkan.")) return;
// // // // // // // // // // //       try {
// // // // // // // // // // //           await api(`/api/forum/${id}/reply/${replyId}`, { method: 'DELETE' });
// // // // // // // // // // //           loadTopic(); // Reload
// // // // // // // // // // //       } catch (e: any) { alert("Gagal hapus: " + e.message); }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleEditTopicOpen = () => {
// // // // // // // // // // //       setEditingTopic({
// // // // // // // // // // //           title: topic.title,
// // // // // // // // // // //           category: topic.category,
// // // // // // // // // // //           avatarUrl: topic.avatarUrl
// // // // // // // // // // //       });
// // // // // // // // // // //       setIsEditModalOpen(true);
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleUpdateTopic = async () => {
// // // // // // // // // // //       try {
// // // // // // // // // // //           await api(`/api/forum/${id}`, {
// // // // // // // // // // //               method: 'PATCH',
// // // // // // // // // // //               body: editingTopic
// // // // // // // // // // //           });
// // // // // // // // // // //           setIsEditModalOpen(false);
// // // // // // // // // // //           loadTopic();
// // // // // // // // // // //           alert("Topik berhasil diperbarui!");
// // // // // // // // // // //       } catch (e: any) { alert("Gagal update: " + e.message); }
// // // // // // // // // // //   };

// // // // // // // // // // //   const renderAvatar = (topicImg: string | null, userImg: string | null, name: string) => {
// // // // // // // // // // //       const src = (topicImg && getImageUrl(topicImg)) || 
// // // // // // // // // // //                   (userImg && getImageUrl(userImg)) || 
// // // // // // // // // // //                   `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
// // // // // // // // // // //       return <img src={src} alt={name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`; }} />;
// // // // // // // // // // //   };

// // // // // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat...</div>;
// // // // // // // // // // //   if (!topic) return <div className="p-20 text-center">Topik tidak ditemukan</div>;

// // // // // // // // // // //   return (
// // // // // // // // // // //     <Protected>
// // // // // // // // // // //       <div className="max-w-5xl mx-auto p-6 min-h-screen pb-32 font-sans">
// // // // // // // // // // //         <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-6 hover:text-red-700 transition" aria-label="Kembali">
// // // // // // // // // // //             <ArrowLeft size={18} /> Kembali
// // // // // // // // // // //         </button>

// // // // // // // // // // //         {/* TOPIC HEADER */}
// // // // // // // // // // //         <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-8 relative group/header">
          
// // // // // // // // // // //           {/* [ADMIN] TOMBOL EDIT TOPIK */}
// // // // // // // // // // //           {isAdmin && (
// // // // // // // // // // //               <button 
// // // // // // // // // // //                 onClick={handleEditTopicOpen}
// // // // // // // // // // //                 className="absolute top-4 right-4 bg-gray-100 hover:bg-amber-100 text-gray-500 hover:text-amber-600 p-2 rounded-lg transition"
// // // // // // // // // // //                 aria-label="Edit Topik"
// // // // // // // // // // //                 title="Edit Judul & Cover"
// // // // // // // // // // //               >
// // // // // // // // // // //                   <Pencil size={18} />
// // // // // // // // // // //               </button>
// // // // // // // // // // //           )}

// // // // // // // // // // //           <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
// // // // // // // // // // //             <div className="w-14 h-14 rounded-full border border-gray-100 overflow-hidden flex-shrink-0">
// // // // // // // // // // //                {renderAvatar(topic.avatarUrl, topic.creator?.avatarUrl, topic.creator?.name || 'User')}
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <div className="flex-1">
// // // // // // // // // // //                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2 pr-10">{topic.title}</h1>
// // // // // // // // // // //                <div className="flex items-center gap-3 text-sm text-gray-500">
// // // // // // // // // // //                   <span className="font-bold text-gray-800">{topic.creator?.name}</span>
// // // // // // // // // // //                   <span>•</span><span>{new Date(topic.createdAt).toLocaleString()}</span>
// // // // // // // // // // //                   <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-bold uppercase">{topic.category}</span>
// // // // // // // // // // //                </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //           <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">{topic.content}</div>
// // // // // // // // // // //         </div>

// // // // // // // // // // //         {/* REPLIES LIST */}
// // // // // // // // // // //         <div className="mb-8">
// // // // // // // // // // //             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><MessageCircle size={20} className="text-red-700"/> {topic.replies?.length || 0} Balasan</h3>
// // // // // // // // // // //             <div className="space-y-4">
// // // // // // // // // // //                 {topic.replies?.map((reply: any, idx: number) => (
// // // // // // // // // // //                     <div key={idx} className="flex gap-4 group">
// // // // // // // // // // //                         <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 mt-1 border border-gray-200">
// // // // // // // // // // //                             {renderAvatar(null, reply.author?.avatarUrl, reply.author?.name || 'User')}
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                         <div className="flex-1 bg-white p-5 rounded-r-2xl rounded-bl-2xl shadow-sm border border-gray-100 relative">
                            
// // // // // // // // // // //                             {/* [ADMIN] TOMBOL HAPUS REPLY */}
// // // // // // // // // // //                             {isAdmin && (
// // // // // // // // // // //                                 <button 
// // // // // // // // // // //                                     onClick={() => handleDeleteReply(reply._id)}
// // // // // // // // // // //                                     className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded transition"
// // // // // // // // // // //                                     title="Hapus Pesan"
// // // // // // // // // // //                                 >
// // // // // // // // // // //                                     <Trash2 size={14} />
// // // // // // // // // // //                                 </button>
// // // // // // // // // // //                             )}

// // // // // // // // // // //                             <div className="flex justify-between items-start mb-2">
// // // // // // // // // // //                                 <div><span className="font-bold text-gray-900 text-sm mr-2">{reply.author?.name}</span><span className="text-xs text-gray-400">{new Date(reply.createdAt).toLocaleDateString()}</span></div>
// // // // // // // // // // //                                 {user && (
// // // // // // // // // // //                                     <button 
// // // // // // // // // // //                                         onClick={() => handleManualMentionClick(reply.author?.name, reply.author?._id)} 
// // // // // // // // // // //                                         className="text-gray-400 hover:text-red-700 flex items-center gap-1 text-xs font-bold transition-colors opacity-0 group-hover:opacity-100 mr-6" 
// // // // // // // // // // //                                         aria-label={`Balas ${reply.author?.name}`}
// // // // // // // // // // //                                     >
// // // // // // // // // // //                                         <Reply size={14} /> Balas
// // // // // // // // // // //                                     </button>
// // // // // // // // // // //                                 )}
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                             <p className="text-gray-700 text-sm whitespace-pre-wrap">
// // // // // // // // // // //                                 {reply.content.split(' ').map((word: string, i: number) => word.startsWith('@') ? <span key={i} className="text-blue-600 font-bold bg-blue-50 px-1 rounded">{word} </span> : word + ' ')}
// // // // // // // // // // //                             </p>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 ))}
// // // // // // // // // // //             </div>
// // // // // // // // // // //         </div>

// // // // // // // // // // //         {/* INPUT AREA */}
// // // // // // // // // // //         {user ? (
// // // // // // // // // // //           <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 sticky bottom-6 z-30">
// // // // // // // // // // //             {showMentions && mentionResults.length > 0 && (
// // // // // // // // // // //                 <div className="absolute bottom-full left-4 mb-2 bg-white border border-gray-200 shadow-xl rounded-xl w-64 overflow-hidden z-50">
// // // // // // // // // // //                     <div className="p-2 bg-gray-50 border-b text-xs font-bold text-gray-500">Saran Pengguna:</div>
// // // // // // // // // // //                     {mentionResults.map(u => (
// // // // // // // // // // //                         <button 
// // // // // // // // // // //                             key={u._id} onClick={() => selectMention(u)}
// // // // // // // // // // //                             className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-3 transition"
// // // // // // // // // // //                         >
// // // // // // // // // // //                              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 border">{renderAvatar(null, u.avatarUrl, u.name)}</div>
// // // // // // // // // // //                              <div><p className="text-sm font-bold text-gray-800">{u.name}</p><p className="text-[10px] text-gray-500 uppercase">{u.role}</p></div>
// // // // // // // // // // //                         </button>
// // // // // // // // // // //                     ))}
// // // // // // // // // // //                 </div>
// // // // // // // // // // //             )}
// // // // // // // // // // //             <form onSubmit={handleReply} className="flex flex-col gap-3 relative">
// // // // // // // // // // //                <div className="flex gap-3">
// // // // // // // // // // //                   <textarea 
// // // // // // // // // // //                     ref={replyInputRef} 
// // // // // // // // // // //                     className="flex-1 p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500 resize-none" 
// // // // // // // // // // //                     placeholder="Tulis balasan... (Ketik @ untuk mention)" rows={2} 
// // // // // // // // // // //                     value={replyContent} onChange={handleInputChange} 
// // // // // // // // // // //                   />
// // // // // // // // // // //                   <button disabled={submitting} className="bg-red-700 text-white px-6 rounded-xl font-bold hover:bg-red-800 disabled:opacity-50 transition shadow-md" aria-label="Kirim"><Send size={20} /></button>
// // // // // // // // // // //                </div>
// // // // // // // // // // //             </form>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         ) : (<div className="text-center p-4 bg-red-50 rounded-xl text-red-800 font-medium sticky bottom-6">Login untuk membalas.</div>)}

// // // // // // // // // // //         {/* MODAL EDIT TOPIK (ADMIN) */}
// // // // // // // // // // //         {isEditModalOpen && editingTopic && (
// // // // // // // // // // //             <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4 backdrop-blur-sm">
// // // // // // // // // // //                 <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl">
// // // // // // // // // // //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
// // // // // // // // // // //                         <h3 className="text-lg font-bold flex items-center gap-2"><Pencil size={18}/> Edit Topik</h3>
// // // // // // // // // // //                         <button onClick={() => setIsEditModalOpen(false)}><X size={20} className="text-gray-400 hover:text-red-600"/></button>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div className="p-6 space-y-4">
// // // // // // // // // // //                          <div>
// // // // // // // // // // //                              <label className="text-xs font-bold text-gray-500 mb-1 block">Judul Topik</label>
// // // // // // // // // // //                              <input type="text" value={editingTopic.title} onChange={(e) => setEditingTopic({...editingTopic, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Judul"/>
// // // // // // // // // // //                          </div>
// // // // // // // // // // //                          <div>
// // // // // // // // // // //                              <label className="text-xs font-bold text-gray-500 mb-1 block">Kategori</label>
// // // // // // // // // // //                              <select value={editingTopic.category} onChange={(e) => setEditingTopic({...editingTopic, category: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-white">
// // // // // // // // // // //                                 {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
// // // // // // // // // // //                              </select>
// // // // // // // // // // //                          </div>
// // // // // // // // // // //                          <div>
// // // // // // // // // // //                              <label className="text-xs font-bold text-gray-500 mb-2 block">Cover / Icon Topik</label>
// // // // // // // // // // //                              <div className="grid grid-cols-5 gap-3">
// // // // // // // // // // //                                 <button onClick={() => setEditingTopic({...editingTopic, avatarUrl: null})} className={`aspect-square border-2 rounded-xl flex items-center justify-center text-[10px] font-bold ${!editingTopic.avatarUrl ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200'}`}>No Icon</button>
// // // // // // // // // // //                                 {cmsIcons.map((cat, idx) => cat.iconUrl && (
// // // // // // // // // // //                                     <button key={idx} onClick={() => setEditingTopic({...editingTopic, avatarUrl: cat.iconUrl})} className={`relative aspect-square border-2 rounded-xl overflow-hidden ${editingTopic.avatarUrl === cat.iconUrl ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'}`}>
// // // // // // // // // // //                                         <img src={getImageUrl(cat.iconUrl)} alt="icon" className="w-full h-full object-cover" />
// // // // // // // // // // //                                     </button>
// // // // // // // // // // //                                 ))}
// // // // // // // // // // //                              </div>
// // // // // // // // // // //                          </div>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-2">
// // // // // // // // // // //                         <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-bold text-sm">Batal</button>
// // // // // // // // // // //                         <button onClick={handleUpdateTopic} className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-bold text-sm flex items-center gap-2"><Save size={16}/> Simpan Perubahan</button>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //         )}

// // // // // // // // // // //       </div>
// // // // // // // // // // //     </Protected>
// // // // // // // // // // //   );
// // // // // // // // // // // }
// // // // // // // // // // 'use client';

// // // // // // // // // // import { useEffect, useState, useRef } from 'react';
// // // // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // // // import { ArrowLeft, Send, MessageCircle, Reply, Trash2, Pencil, X, Save } from 'lucide-react';

// // // // // // // // // // export default function ForumDetailPage() {
// // // // // // // // // //   const { id } = useParams();
// // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // //   const router = useRouter();
  
// // // // // // // // // //   const [topic, setTopic] = useState<any>(null);
// // // // // // // // // //   const [replyContent, setReplyContent] = useState('');
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [submitting, setSubmitting] = useState(false);
  
// // // // // // // // // //   // -- STATE MENTION --
// // // // // // // // // //   const [showMentions, setShowMentions] = useState(false);
// // // // // // // // // //   const [mentionQuery, setMentionQuery] = useState('');
// // // // // // // // // //   const [mentionResults, setMentionResults] = useState<any[]>([]);
// // // // // // // // // //   const [mentionedIds, setMentionedIds] = useState<string[]>([]);
  
// // // // // // // // // //   // -- STATE ADMIN EDIT --
// // // // // // // // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // // // // // // // // //   const [editingTopic, setEditingTopic] = useState<any>(null);
// // // // // // // // // //   const [cmsIcons, setCmsIcons] = useState<{name: string, iconUrl: string}[]>([]);
// // // // // // // // // //   const [cmsCategories, setCmsCategories] = useState<string[]>([]);
  
// // // // // // // // // //   const replyInputRef = useRef<HTMLTextAreaElement>(null);
// // // // // // // // // //   const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'FACILITATOR';

// // // // // // // // // //   useEffect(() => { 
// // // // // // // // // //       loadTopic(); 
// // // // // // // // // //       if(isAdmin) loadCmsSettings(); 
// // // // // // // // // //   }, [id, isAdmin]);

// // // // // // // // // //   // Effect pencarian user mention
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const searchUsers = async () => {
// // // // // // // // // //         if (mentionQuery.length < 1) return;
// // // // // // // // // //         try {
// // // // // // // // // //             const res = await api(`/api/users/search?q=${mentionQuery}`);
// // // // // // // // // //             setMentionResults(res);
// // // // // // // // // //         } catch (e) { console.error(e); }
// // // // // // // // // //     };
// // // // // // // // // //     const delay = setTimeout(searchUsers, 300);
// // // // // // // // // //     return () => clearTimeout(delay);
// // // // // // // // // //   }, [mentionQuery]);

// // // // // // // // // //   const loadTopic = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       const data = await api(`/api/forum/${id}`);
// // // // // // // // // //       setTopic(data);
// // // // // // // // // //     } catch (err) { console.error(err); } finally { setLoading(false); }
// // // // // // // // // //   };

// // // // // // // // // //   const loadCmsSettings = async () => {
// // // // // // // // // //       try {
// // // // // // // // // //           const content = await api('/api/content'); 
// // // // // // // // // //           if (content && content.forumCategories) {
// // // // // // // // // //               setCmsCategories(content.forumCategories.map((c: any) => c.name));
// // // // // // // // // //               setCmsIcons(content.forumCategories);
// // // // // // // // // //           }
// // // // // // // // // //       } catch (e) { console.error("Gagal load CMS:", e); }
// // // // // // // // // //   };

// // // // // // // // // //   // --- HANDLERS MENTION ---
// // // // // // // // // //   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
// // // // // // // // // //       const val = e.target.value;
// // // // // // // // // //       setReplyContent(val);
// // // // // // // // // //       const lastWord = val.split(/(\s+)/).pop(); 
// // // // // // // // // //       if (lastWord && lastWord.startsWith('@')) {
// // // // // // // // // //           setMentionQuery(lastWord.substring(1));
// // // // // // // // // //           setShowMentions(true);
// // // // // // // // // //       } else {
// // // // // // // // // //           setShowMentions(false);
// // // // // // // // // //       }
// // // // // // // // // //   };

// // // // // // // // // //   const selectMention = (u: any) => {
// // // // // // // // // //       const parts = replyContent.split(/(\s+)/);
// // // // // // // // // //       parts.pop(); 
// // // // // // // // // //       const newContent = parts.join('') + `@${u.name} `;
// // // // // // // // // //       setReplyContent(newContent);
// // // // // // // // // //       setMentionedIds(prev => [...prev, u._id]);
// // // // // // // // // //       setShowMentions(false);
// // // // // // // // // //       replyInputRef.current?.focus();
// // // // // // // // // //   };

// // // // // // // // // //   // --- HANDLERS ACTION ---
// // // // // // // // // //   const handleReply = async (e: React.FormEvent) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     if(!replyContent.trim()) return;
// // // // // // // // // //     setSubmitting(true);
// // // // // // // // // //     try {
// // // // // // // // // //       await api(`/api/forum/${id}/reply`, { 
// // // // // // // // // //           method: 'POST', 
// // // // // // // // // //           body: { content: replyContent, mentionedUserIds: mentionedIds } 
// // // // // // // // // //       });
// // // // // // // // // //       setReplyContent('');
// // // // // // // // // //       setMentionedIds([]);
// // // // // // // // // //       loadTopic();
// // // // // // // // // //     } catch (err: any) { alert('Gagal: ' + err.message); } finally { setSubmitting(false); }
// // // // // // // // // //   };

// // // // // // // // // //   const handleManualMentionClick = (userName: string, userId: string) => {
// // // // // // // // // //       setReplyContent((prev) => prev + `@${userName} `);
// // // // // // // // // //       if(userId) setMentionedIds(prev => [...prev, userId]);
// // // // // // // // // //       replyInputRef.current?.focus();
// // // // // // // // // //   };

// // // // // // // // // //   // --- HANDLERS ADMIN (DELETE REPLY & EDIT TOPIC) ---
// // // // // // // // // //   const handleDeleteReply = async (replyId: string) => {
// // // // // // // // // //       if(!confirm("Hapus pesan ini? Tindakan tidak dapat dibatalkan.")) return;
// // // // // // // // // //       try {
// // // // // // // // // //           await api(`/api/forum/${id}/reply/${replyId}`, { method: 'DELETE' });
// // // // // // // // // //           loadTopic(); // Reload
// // // // // // // // // //       } catch (e: any) { alert("Gagal hapus: " + e.message); }
// // // // // // // // // //   };

// // // // // // // // // //   const handleEditTopicOpen = () => {
// // // // // // // // // //       setEditingTopic({
// // // // // // // // // //           title: topic.title,
// // // // // // // // // //           category: topic.category,
// // // // // // // // // //           avatarUrl: topic.avatarUrl
// // // // // // // // // //       });
// // // // // // // // // //       setIsEditModalOpen(true);
// // // // // // // // // //   };

// // // // // // // // // //   const handleUpdateTopic = async () => {
// // // // // // // // // //       try {
// // // // // // // // // //           await api(`/api/forum/${id}`, {
// // // // // // // // // //               method: 'PATCH',
// // // // // // // // // //               body: editingTopic
// // // // // // // // // //           });
// // // // // // // // // //           setIsEditModalOpen(false);
// // // // // // // // // //           loadTopic();
// // // // // // // // // //           alert("Topik berhasil diperbarui!");
// // // // // // // // // //       } catch (e: any) { alert("Gagal update: " + e.message); }
// // // // // // // // // //   };

// // // // // // // // // //   const renderAvatar = (topicImg: string | null, userImg: string | null, name: string) => {
// // // // // // // // // //       const src = (topicImg && getImageUrl(topicImg)) || 
// // // // // // // // // //                   (userImg && getImageUrl(userImg)) || 
// // // // // // // // // //                   `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
// // // // // // // // // //       return <img src={src} alt={name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`; }} />;
// // // // // // // // // //   };

// // // // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat...</div>;
// // // // // // // // // //   if (!topic) return <div className="p-20 text-center">Topik tidak ditemukan</div>;

// // // // // // // // // //   return (
// // // // // // // // // //     <Protected>
// // // // // // // // // //       <div className="max-w-5xl mx-auto p-6 min-h-screen pb-32 font-sans">
// // // // // // // // // //         {/* FIX ACCESSIBILITY: Added aria-label */}
// // // // // // // // // //         <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-6 hover:text-red-700 transition" aria-label="Kembali ke halaman sebelumnya">
// // // // // // // // // //             <ArrowLeft size={18} /> Kembali
// // // // // // // // // //         </button>

// // // // // // // // // //         {/* TOPIC HEADER */}
// // // // // // // // // //         <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-8 relative group/header">
          
// // // // // // // // // //           {/* [ADMIN] TOMBOL EDIT TOPIK */}
// // // // // // // // // //           {isAdmin && (
// // // // // // // // // //               // FIX ACCESSIBILITY: Added aria-label
// // // // // // // // // //               <button 
// // // // // // // // // //                 onClick={handleEditTopicOpen}
// // // // // // // // // //                 className="absolute top-4 right-4 bg-gray-100 hover:bg-amber-100 text-gray-500 hover:text-amber-600 p-2 rounded-lg transition"
// // // // // // // // // //                 aria-label="Edit Topik"
// // // // // // // // // //                 title="Edit Judul & Cover"
// // // // // // // // // //               >
// // // // // // // // // //                   <Pencil size={18} />
// // // // // // // // // //               </button>
// // // // // // // // // //           )}

// // // // // // // // // //           <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
// // // // // // // // // //             <div className="w-14 h-14 rounded-full border border-gray-100 overflow-hidden flex-shrink-0">
// // // // // // // // // //                {renderAvatar(topic.avatarUrl, topic.creator?.avatarUrl, topic.creator?.name || 'User')}
// // // // // // // // // //             </div>
// // // // // // // // // //             <div className="flex-1">
// // // // // // // // // //                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2 pr-10">{topic.title}</h1>
// // // // // // // // // //                <div className="flex items-center gap-3 text-sm text-gray-500">
// // // // // // // // // //                   <span className="font-bold text-gray-800">{topic.creator?.name}</span>
// // // // // // // // // //                   <span>•</span><span>{new Date(topic.createdAt).toLocaleString()}</span>
// // // // // // // // // //                   <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-bold uppercase">{topic.category}</span>
// // // // // // // // // //                </div>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">{topic.content}</div>
// // // // // // // // // //         </div>

// // // // // // // // // //         {/* REPLIES LIST */}
// // // // // // // // // //         <div className="mb-8">
// // // // // // // // // //             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><MessageCircle size={20} className="text-red-700"/> {topic.replies?.length || 0} Balasan</h3>
// // // // // // // // // //             <div className="space-y-4">
// // // // // // // // // //                 {topic.replies?.map((reply: any, idx: number) => (
// // // // // // // // // //                     <div key={idx} className="flex gap-4 group">
// // // // // // // // // //                         <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 mt-1 border border-gray-200">
// // // // // // // // // //                             {renderAvatar(null, reply.author?.avatarUrl, reply.author?.name || 'User')}
// // // // // // // // // //                         </div>
// // // // // // // // // //                         <div className="flex-1 bg-white p-5 rounded-r-2xl rounded-bl-2xl shadow-sm border border-gray-100 relative">
                            
// // // // // // // // // //                             {/* [ADMIN] TOMBOL HAPUS REPLY */}
// // // // // // // // // //                             {isAdmin && (
// // // // // // // // // //                                 // FIX ACCESSIBILITY: Added aria-label
// // // // // // // // // //                                 <button 
// // // // // // // // // //                                     onClick={() => handleDeleteReply(reply._id)}
// // // // // // // // // //                                     className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded transition"
// // // // // // // // // //                                     title="Hapus Pesan"
// // // // // // // // // //                                     aria-label="Hapus Balasan"
// // // // // // // // // //                                 >
// // // // // // // // // //                                     <Trash2 size={14} />
// // // // // // // // // //                                 </button>
// // // // // // // // // //                             )}

// // // // // // // // // //                             <div className="flex justify-between items-start mb-2">
// // // // // // // // // //                                 <div><span className="font-bold text-gray-900 text-sm mr-2">{reply.author?.name}</span><span className="text-xs text-gray-400">{new Date(reply.createdAt).toLocaleDateString()}</span></div>
// // // // // // // // // //                                 {user && (
// // // // // // // // // //                                     // FIX ACCESSIBILITY: Added aria-label
// // // // // // // // // //                                     <button 
// // // // // // // // // //                                         onClick={() => handleManualMentionClick(reply.author?.name, reply.author?._id)} 
// // // // // // // // // //                                         className="text-gray-400 hover:text-red-700 flex items-center gap-1 text-xs font-bold transition-colors opacity-0 group-hover:opacity-100 mr-6" 
// // // // // // // // // //                                         aria-label={`Balas pesan dari ${reply.author?.name}`}
// // // // // // // // // //                                     >
// // // // // // // // // //                                         <Reply size={14} /> Balas
// // // // // // // // // //                                     </button>
// // // // // // // // // //                                 )}
// // // // // // // // // //                             </div>
// // // // // // // // // //                             <p className="text-gray-700 text-sm whitespace-pre-wrap">
// // // // // // // // // //                                 {reply.content.split(' ').map((word: string, i: number) => word.startsWith('@') ? <span key={i} className="text-blue-600 font-bold bg-blue-50 px-1 rounded">{word} </span> : word + ' ')}
// // // // // // // // // //                             </p>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 ))}
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>

// // // // // // // // // //         {/* INPUT AREA */}
// // // // // // // // // //         {user ? (
// // // // // // // // // //           <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 sticky bottom-6 z-30">
// // // // // // // // // //             {showMentions && mentionResults.length > 0 && (
// // // // // // // // // //                 <div className="absolute bottom-full left-4 mb-2 bg-white border border-gray-200 shadow-xl rounded-xl w-64 overflow-hidden z-50">
// // // // // // // // // //                     <div className="p-2 bg-gray-50 border-b text-xs font-bold text-gray-500">Saran Pengguna:</div>
// // // // // // // // // //                     {mentionResults.map(u => (
// // // // // // // // // //                         <button 
// // // // // // // // // //                             key={u._id} onClick={() => selectMention(u)}
// // // // // // // // // //                             className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-3 transition"
// // // // // // // // // //                             aria-label={`Pilih ${u.name}`}
// // // // // // // // // //                         >
// // // // // // // // // //                              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 border">{renderAvatar(null, u.avatarUrl, u.name)}</div>
// // // // // // // // // //                              <div><p className="text-sm font-bold text-gray-800">{u.name}</p><p className="text-[10px] text-gray-500 uppercase">{u.role}</p></div>
// // // // // // // // // //                         </button>
// // // // // // // // // //                     ))}
// // // // // // // // // //                 </div>
// // // // // // // // // //             )}
// // // // // // // // // //             <form onSubmit={handleReply} className="flex flex-col gap-3 relative">
// // // // // // // // // //                <div className="flex gap-3">
// // // // // // // // // //                   <textarea 
// // // // // // // // // //                     ref={replyInputRef} 
// // // // // // // // // //                     className="flex-1 p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500 resize-none" 
// // // // // // // // // //                     placeholder="Tulis balasan... (Ketik @ untuk mention)" rows={2} 
// // // // // // // // // //                     value={replyContent} onChange={handleInputChange} 
// // // // // // // // // //                   />
// // // // // // // // // //                   {/* FIX ACCESSIBILITY: Added aria-label */}
// // // // // // // // // //                   <button disabled={submitting} className="bg-red-700 text-white px-6 rounded-xl font-bold hover:bg-red-800 disabled:opacity-50 transition shadow-md" aria-label="Kirim Balasan"><Send size={20} /></button>
// // // // // // // // // //                </div>
// // // // // // // // // //             </form>
// // // // // // // // // //           </div>
// // // // // // // // // //         ) : (<div className="text-center p-4 bg-red-50 rounded-xl text-red-800 font-medium sticky bottom-6">Login untuk membalas.</div>)}

// // // // // // // // // //         {/* MODAL EDIT TOPIK (ADMIN) */}
// // // // // // // // // //         {isEditModalOpen && editingTopic && (
// // // // // // // // // //             <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4 backdrop-blur-sm">
// // // // // // // // // //                 <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl">
// // // // // // // // // //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
// // // // // // // // // //                         <h3 className="text-lg font-bold flex items-center gap-2"><Pencil size={18}/> Edit Topik</h3>
// // // // // // // // // //                         {/* FIX ACCESSIBILITY: Added aria-label */}
// // // // // // // // // //                         <button onClick={() => setIsEditModalOpen(false)} aria-label="Tutup Modal Edit"><X size={20} className="text-gray-400 hover:text-red-600"/></button>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="p-6 space-y-4">
// // // // // // // // // //                          <div>
// // // // // // // // // //                              <label className="text-xs font-bold text-gray-500 mb-1 block">Judul Topik</label>
// // // // // // // // // //                              <input type="text" value={editingTopic.title} onChange={(e) => setEditingTopic({...editingTopic, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Judul" aria-label="Edit Judul Topik"/>
// // // // // // // // // //                          </div>
// // // // // // // // // //                          <div>
// // // // // // // // // //                              <label className="text-xs font-bold text-gray-500 mb-1 block">Kategori</label>
// // // // // // // // // //                              {/* FIX ACCESSIBILITY: Added aria-label */}
// // // // // // // // // //                              <select 
// // // // // // // // // //                                 value={editingTopic.category} 
// // // // // // // // // //                                 onChange={(e) => setEditingTopic({...editingTopic, category: e.target.value})} 
// // // // // // // // // //                                 className="w-full px-3 py-2 border rounded-lg bg-white"
// // // // // // // // // //                                 aria-label="Pilih Kategori"
// // // // // // // // // //                              >
// // // // // // // // // //                                 {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
// // // // // // // // // //                              </select>
// // // // // // // // // //                          </div>
// // // // // // // // // //                          <div>
// // // // // // // // // //                              <label className="text-xs font-bold text-gray-500 mb-2 block">Cover / Icon Topik</label>
// // // // // // // // // //                              <div className="grid grid-cols-5 gap-3">
// // // // // // // // // //                                 {/* FIX ACCESSIBILITY: Added aria-label */}
// // // // // // // // // //                                 <button onClick={() => setEditingTopic({...editingTopic, avatarUrl: null})} className={`aspect-square border-2 rounded-xl flex items-center justify-center text-[10px] font-bold ${!editingTopic.avatarUrl ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200'}`} aria-label="Hapus Icon Avatar">No Icon</button>
// // // // // // // // // //                                 {cmsIcons.map((cat, idx) => cat.iconUrl && (
// // // // // // // // // //                                     // FIX ACCESSIBILITY: Added aria-label
// // // // // // // // // //                                     <button key={idx} onClick={() => setEditingTopic({...editingTopic, avatarUrl: cat.iconUrl})} className={`relative aspect-square border-2 rounded-xl overflow-hidden ${editingTopic.avatarUrl === cat.iconUrl ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'}`} aria-label={`Pilih Icon ${cat.name}`}>
// // // // // // // // // //                                         <img src={getImageUrl(cat.iconUrl)} alt="icon" className="w-full h-full object-cover" />
// // // // // // // // // //                                     </button>
// // // // // // // // // //                                 ))}
// // // // // // // // // //                              </div>
// // // // // // // // // //                          </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-2">
// // // // // // // // // //                         <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-bold text-sm" aria-label="Batal Edit">Batal</button>
// // // // // // // // // //                         <button onClick={handleUpdateTopic} className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-bold text-sm flex items-center gap-2" aria-label="Simpan Perubahan"><Save size={16}/> Simpan Perubahan</button>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>
// // // // // // // // // //             </div>
// // // // // // // // // //         )}

// // // // // // // // // //       </div>
// // // // // // // // // //     </Protected>
// // // // // // // // // //   );
// // // // // // // // // // }
// // // // // // // // // 'use client';

// // // // // // // // // import { useEffect, useState, useRef } from 'react';
// // // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // // import { ArrowLeft, Send, MessageCircle, Reply, Trash2, Pencil, X, Save, Smile } from 'lucide-react';
// // // // // // // // // import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'; // Import Library Emoji

// // // // // // // // // export default function ForumDetailPage() {
// // // // // // // // //   const { id } = useParams();
// // // // // // // // //   const { user } = useAuth();
// // // // // // // // //   const router = useRouter();
  
// // // // // // // // //   const [topic, setTopic] = useState<any>(null);
// // // // // // // // //   const [replyContent, setReplyContent] = useState('');
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [submitting, setSubmitting] = useState(false);
  
// // // // // // // // //   // -- STATE MENTION --
// // // // // // // // //   const [showMentions, setShowMentions] = useState(false);
// // // // // // // // //   const [mentionQuery, setMentionQuery] = useState('');
// // // // // // // // //   const [mentionResults, setMentionResults] = useState<any[]>([]);
// // // // // // // // //   const [mentionedIds, setMentionedIds] = useState<string[]>([]);
  
// // // // // // // // //   // -- STATE ADMIN EDIT --
// // // // // // // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // // // // // // // //   const [editingTopic, setEditingTopic] = useState<any>(null);
// // // // // // // // //   const [cmsIcons, setCmsIcons] = useState<{name: string, iconUrl: string}[]>([]);
// // // // // // // // //   const [cmsCategories, setCmsCategories] = useState<string[]>([]);

// // // // // // // // //   // -- STATE EMOJI --
// // // // // // // // //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
// // // // // // // // //   const replyInputRef = useRef<HTMLTextAreaElement>(null);
// // // // // // // // //   const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'FACILITATOR';

// // // // // // // // //   useEffect(() => { 
// // // // // // // // //       loadTopic(); 
// // // // // // // // //       if(isAdmin) loadCmsSettings(); 
// // // // // // // // //   }, [id, isAdmin]);

// // // // // // // // //   // Effect pencarian user mention
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const searchUsers = async () => {
// // // // // // // // //         if (mentionQuery.length < 1) return;
// // // // // // // // //         try {
// // // // // // // // //             const res = await api(`/api/users/search?q=${mentionQuery}`);
// // // // // // // // //             setMentionResults(res);
// // // // // // // // //         } catch (e) { console.error(e); }
// // // // // // // // //     };
// // // // // // // // //     const delay = setTimeout(searchUsers, 300);
// // // // // // // // //     return () => clearTimeout(delay);
// // // // // // // // //   }, [mentionQuery]);

// // // // // // // // //   const loadTopic = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const data = await api(`/api/forum/${id}`);
// // // // // // // // //       setTopic(data);
// // // // // // // // //     } catch (err) { console.error(err); } finally { setLoading(false); }
// // // // // // // // //   };

// // // // // // // // //   const loadCmsSettings = async () => {
// // // // // // // // //       try {
// // // // // // // // //           const content = await api('/api/content'); 
// // // // // // // // //           if (content && content.forumCategories) {
// // // // // // // // //               setCmsCategories(content.forumCategories.map((c: any) => c.name));
// // // // // // // // //               setCmsIcons(content.forumCategories);
// // // // // // // // //           }
// // // // // // // // //       } catch (e) { console.error("Gagal load CMS:", e); }
// // // // // // // // //   };

// // // // // // // // //   // --- HANDLERS MENTION ---
// // // // // // // // //   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
// // // // // // // // //       const val = e.target.value;
// // // // // // // // //       setReplyContent(val);
// // // // // // // // //       const lastWord = val.split(/(\s+)/).pop(); 
// // // // // // // // //       if (lastWord && lastWord.startsWith('@')) {
// // // // // // // // //           setMentionQuery(lastWord.substring(1));
// // // // // // // // //           setShowMentions(true);
// // // // // // // // //       } else {
// // // // // // // // //           setShowMentions(false);
// // // // // // // // //       }
// // // // // // // // //   };

// // // // // // // // //   const selectMention = (u: any) => {
// // // // // // // // //       const parts = replyContent.split(/(\s+)/);
// // // // // // // // //       parts.pop(); 
// // // // // // // // //       const newContent = parts.join('') + `@${u.name} `;
// // // // // // // // //       setReplyContent(newContent);
// // // // // // // // //       setMentionedIds(prev => [...prev, u._id]);
// // // // // // // // //       setShowMentions(false);
// // // // // // // // //       replyInputRef.current?.focus();
// // // // // // // // //   };

// // // // // // // // //   // --- HANDLER EMOJI ---
// // // // // // // // //   const onEmojiClick = (emojiObject: any) => {
// // // // // // // // //     setReplyContent((prev) => prev + emojiObject.emoji);
// // // // // // // // //     // Kita tidak menutup picker agar user bisa pilih banyak emoji sekaligus
// // // // // // // // //     // setShowEmojiPicker(false); 
// // // // // // // // //   };

// // // // // // // // //   // --- HANDLERS ACTION ---
// // // // // // // // //   const handleReply = async (e: React.FormEvent) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     if(!replyContent.trim()) return;
// // // // // // // // //     setSubmitting(true);
// // // // // // // // //     try {
// // // // // // // // //       await api(`/api/forum/${id}/reply`, { 
// // // // // // // // //           method: 'POST', 
// // // // // // // // //           body: { content: replyContent, mentionedUserIds: mentionedIds } 
// // // // // // // // //       });
// // // // // // // // //       setReplyContent('');
// // // // // // // // //       setMentionedIds([]);
// // // // // // // // //       setShowEmojiPicker(false); // Tutup emoji picker setelah kirim
// // // // // // // // //       loadTopic();
// // // // // // // // //     } catch (err: any) { alert('Gagal: ' + err.message); } finally { setSubmitting(false); }
// // // // // // // // //   };

// // // // // // // // //   const handleManualMentionClick = (userName: string, userId: string) => {
// // // // // // // // //       setReplyContent((prev) => prev + `@${userName} `);
// // // // // // // // //       if(userId) setMentionedIds(prev => [...prev, userId]);
// // // // // // // // //       replyInputRef.current?.focus();
// // // // // // // // //   };

// // // // // // // // //   // --- HANDLERS ADMIN (DELETE REPLY & EDIT TOPIC) ---
// // // // // // // // //   const handleDeleteReply = async (replyId: string) => {
// // // // // // // // //       if(!confirm("Hapus pesan ini? Tindakan tidak dapat dibatalkan.")) return;
// // // // // // // // //       try {
// // // // // // // // //           await api(`/api/forum/${id}/reply/${replyId}`, { method: 'DELETE' });
// // // // // // // // //           loadTopic(); 
// // // // // // // // //       } catch (e: any) { alert("Gagal hapus: " + e.message); }
// // // // // // // // //   };

// // // // // // // // //   const handleEditTopicOpen = () => {
// // // // // // // // //       setEditingTopic({
// // // // // // // // //           title: topic.title,
// // // // // // // // //           category: topic.category,
// // // // // // // // //           avatarUrl: topic.avatarUrl
// // // // // // // // //       });
// // // // // // // // //       setIsEditModalOpen(true);
// // // // // // // // //   };

// // // // // // // // //   const handleUpdateTopic = async () => {
// // // // // // // // //       try {
// // // // // // // // //           await api(`/api/forum/${id}`, {
// // // // // // // // //               method: 'PATCH',
// // // // // // // // //               body: editingTopic
// // // // // // // // //           });
// // // // // // // // //           setIsEditModalOpen(false);
// // // // // // // // //           loadTopic();
// // // // // // // // //           alert("Topik berhasil diperbarui!");
// // // // // // // // //       } catch (e: any) { alert("Gagal update: " + e.message); }
// // // // // // // // //   };

// // // // // // // // //   const renderAvatar = (topicImg: string | null, userImg: string | null, name: string) => {
// // // // // // // // //       const src = (topicImg && getImageUrl(topicImg)) || 
// // // // // // // // //                   (userImg && getImageUrl(userImg)) || 
// // // // // // // // //                   `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
// // // // // // // // //       return <img src={src} alt={name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`; }} />;
// // // // // // // // //   };

// // // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat...</div>;
// // // // // // // // //   if (!topic) return <div className="p-20 text-center">Topik tidak ditemukan</div>;

// // // // // // // // //   return (
// // // // // // // // //     <Protected>
// // // // // // // // //       <div className="max-w-5xl mx-auto p-6 min-h-screen pb-32 font-sans">
// // // // // // // // //         <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-6 hover:text-red-700 transition" aria-label="Kembali ke halaman sebelumnya">
// // // // // // // // //             <ArrowLeft size={18} /> Kembali
// // // // // // // // //         </button>

// // // // // // // // //         {/* TOPIC HEADER */}
// // // // // // // // //         <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-8 relative group/header">
// // // // // // // // //           {isAdmin && (
// // // // // // // // //               <button 
// // // // // // // // //                 onClick={handleEditTopicOpen}
// // // // // // // // //                 className="absolute top-4 right-4 bg-gray-100 hover:bg-amber-100 text-gray-500 hover:text-amber-600 p-2 rounded-lg transition"
// // // // // // // // //                 aria-label="Edit Topik"
// // // // // // // // //                 title="Edit Judul & Cover"
// // // // // // // // //               >
// // // // // // // // //                   <Pencil size={18} />
// // // // // // // // //               </button>
// // // // // // // // //           )}

// // // // // // // // //           <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
// // // // // // // // //             <div className="w-14 h-14 rounded-full border border-gray-100 overflow-hidden flex-shrink-0">
// // // // // // // // //                {renderAvatar(topic.avatarUrl, topic.creator?.avatarUrl, topic.creator?.name || 'User')}
// // // // // // // // //             </div>
// // // // // // // // //             <div className="flex-1">
// // // // // // // // //                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2 pr-10">{topic.title}</h1>
// // // // // // // // //                <div className="flex items-center gap-3 text-sm text-gray-500">
// // // // // // // // //                   <span className="font-bold text-gray-800">{topic.creator?.name}</span>
// // // // // // // // //                   <span>•</span><span>{new Date(topic.createdAt).toLocaleString()}</span>
// // // // // // // // //                   <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-bold uppercase">{topic.category}</span>
// // // // // // // // //                </div>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //           <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">{topic.content}</div>
// // // // // // // // //         </div>

// // // // // // // // //         {/* REPLIES LIST */}
// // // // // // // // //         <div className="mb-8">
// // // // // // // // //             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><MessageCircle size={20} className="text-red-700"/> {topic.replies?.length || 0} Balasan</h3>
// // // // // // // // //             <div className="space-y-4">
// // // // // // // // //                 {topic.replies?.map((reply: any, idx: number) => (
// // // // // // // // //                     <div key={idx} className="flex gap-4 group">
// // // // // // // // //                         <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 mt-1 border border-gray-200">
// // // // // // // // //                             {renderAvatar(null, reply.author?.avatarUrl, reply.author?.name || 'User')}
// // // // // // // // //                         </div>
// // // // // // // // //                         <div className="flex-1 bg-white p-5 rounded-r-2xl rounded-bl-2xl shadow-sm border border-gray-100 relative">
// // // // // // // // //                             {isAdmin && (
// // // // // // // // //                                 <button 
// // // // // // // // //                                     onClick={() => handleDeleteReply(reply._id)}
// // // // // // // // //                                     className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded transition"
// // // // // // // // //                                     title="Hapus Pesan"
// // // // // // // // //                                     aria-label="Hapus Balasan"
// // // // // // // // //                                 >
// // // // // // // // //                                     <Trash2 size={14} />
// // // // // // // // //                                 </button>
// // // // // // // // //                             )}
// // // // // // // // //                             <div className="flex justify-between items-start mb-2">
// // // // // // // // //                                 <div><span className="font-bold text-gray-900 text-sm mr-2">{reply.author?.name}</span><span className="text-xs text-gray-400">{new Date(reply.createdAt).toLocaleDateString()}</span></div>
// // // // // // // // //                                 {user && (
// // // // // // // // //                                     <button 
// // // // // // // // //                                         onClick={() => handleManualMentionClick(reply.author?.name, reply.author?._id)} 
// // // // // // // // //                                         className="text-gray-400 hover:text-red-700 flex items-center gap-1 text-xs font-bold transition-colors opacity-0 group-hover:opacity-100 mr-6" 
// // // // // // // // //                                         aria-label={`Balas pesan dari ${reply.author?.name}`}
// // // // // // // // //                                     >
// // // // // // // // //                                         <Reply size={14} /> Balas
// // // // // // // // //                                     </button>
// // // // // // // // //                                 )}
// // // // // // // // //                             </div>
// // // // // // // // //                             <p className="text-gray-700 text-sm whitespace-pre-wrap">
// // // // // // // // //                                 {reply.content.split(' ').map((word: string, i: number) => word.startsWith('@') ? <span key={i} className="text-blue-600 font-bold bg-blue-50 px-1 rounded">{word} </span> : word + ' ')}
// // // // // // // // //                             </p>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 ))}
// // // // // // // // //             </div>
// // // // // // // // //         </div>

// // // // // // // // //         {/* INPUT AREA */}
// // // // // // // // //         {user ? (
// // // // // // // // //           <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 sticky bottom-6 z-30">
// // // // // // // // //             {/* MENTION SUGGESTION */}
// // // // // // // // //             {showMentions && mentionResults.length > 0 && (
// // // // // // // // //                 <div className="absolute bottom-full left-4 mb-2 bg-white border border-gray-200 shadow-xl rounded-xl w-64 overflow-hidden z-50">
// // // // // // // // //                     <div className="p-2 bg-gray-50 border-b text-xs font-bold text-gray-500">Saran Pengguna:</div>
// // // // // // // // //                     {mentionResults.map(u => (
// // // // // // // // //                         <button 
// // // // // // // // //                             key={u._id} onClick={() => selectMention(u)}
// // // // // // // // //                             className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-3 transition"
// // // // // // // // //                             aria-label={`Pilih ${u.name}`}
// // // // // // // // //                         >
// // // // // // // // //                              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 border">{renderAvatar(null, u.avatarUrl, u.name)}</div>
// // // // // // // // //                              <div><p className="text-sm font-bold text-gray-800">{u.name}</p><p className="text-[10px] text-gray-500 uppercase">{u.role}</p></div>
// // // // // // // // //                         </button>
// // // // // // // // //                     ))}
// // // // // // // // //                 </div>
// // // // // // // // //             )}
            
// // // // // // // // //             {/* EMOJI PICKER POPUP */}
// // // // // // // // //             {showEmojiPicker && (
// // // // // // // // //                 <div className="absolute bottom-full right-0 mb-4 z-50 shadow-2xl rounded-2xl">
// // // // // // // // //                     <EmojiPicker 
// // // // // // // // //                         onEmojiClick={onEmojiClick} 
// // // // // // // // //                         emojiStyle={EmojiStyle.NATIVE} 
// // // // // // // // //                         width={350}
// // // // // // // // //                         height={400}
// // // // // // // // //                     />
// // // // // // // // //                 </div>
// // // // // // // // //             )}

// // // // // // // // //             <form onSubmit={handleReply} className="flex flex-col gap-3 relative">
// // // // // // // // //                <div className="flex gap-3 items-end">
// // // // // // // // //                   <textarea 
// // // // // // // // //                     ref={replyInputRef} 
// // // // // // // // //                     className="flex-1 p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500 resize-none min-h-[50px]" 
// // // // // // // // //                     placeholder="Tulis balasan... (Ketik @ untuk mention)" rows={2} 
// // // // // // // // //                     value={replyContent} onChange={handleInputChange} 
// // // // // // // // //                   />
                  
// // // // // // // // //                   {/* TOMBOL EMOJI */}
// // // // // // // // //                   <button 
// // // // // // // // //                     type="button"
// // // // // // // // //                     onClick={() => setShowEmojiPicker(!showEmojiPicker)}
// // // // // // // // //                     className="bg-gray-100 text-gray-500 p-3 rounded-xl hover:bg-yellow-100 hover:text-yellow-600 transition shadow-sm h-[50px] w-[50px] flex items-center justify-center"
// // // // // // // // //                     aria-label="Pilih Emoticon"
// // // // // // // // //                   >
// // // // // // // // //                     <Smile size={24} />
// // // // // // // // //                   </button>

// // // // // // // // //                   <button disabled={submitting} className="bg-red-700 text-white px-6 rounded-xl font-bold hover:bg-red-800 disabled:opacity-50 transition shadow-md h-[50px] flex items-center gap-2" aria-label="Kirim Balasan">
// // // // // // // // //                     <Send size={20} /> <span className="hidden sm:inline">Kirim</span>
// // // // // // // // //                   </button>
// // // // // // // // //                </div>
// // // // // // // // //             </form>
// // // // // // // // //           </div>
// // // // // // // // //         ) : (<div className="text-center p-4 bg-red-50 rounded-xl text-red-800 font-medium sticky bottom-6">Login untuk membalas.</div>)}

// // // // // // // // //         {/* MODAL EDIT TOPIK */}
// // // // // // // // //         {isEditModalOpen && editingTopic && (
// // // // // // // // //             <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4 backdrop-blur-sm">
// // // // // // // // //                 <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl">
// // // // // // // // //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
// // // // // // // // //                         <h3 className="text-lg font-bold flex items-center gap-2"><Pencil size={18}/> Edit Topik</h3>
// // // // // // // // //                         <button onClick={() => setIsEditModalOpen(false)} aria-label="Tutup Modal Edit"><X size={20} className="text-gray-400 hover:text-red-600"/></button>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="p-6 space-y-4">
// // // // // // // // //                          <div>
// // // // // // // // //                              <label className="text-xs font-bold text-gray-500 mb-1 block">Judul Topik</label>
// // // // // // // // //                              <input type="text" value={editingTopic.title} onChange={(e) => setEditingTopic({...editingTopic, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Judul" aria-label="Edit Judul Topik"/>
// // // // // // // // //                          </div>
// // // // // // // // //                          <div>
// // // // // // // // //                              <label className="text-xs font-bold text-gray-500 mb-1 block">Kategori</label>
// // // // // // // // //                              <select 
// // // // // // // // //                                 value={editingTopic.category} 
// // // // // // // // //                                 onChange={(e) => setEditingTopic({...editingTopic, category: e.target.value})} 
// // // // // // // // //                                 className="w-full px-3 py-2 border rounded-lg bg-white"
// // // // // // // // //                                 aria-label="Pilih Kategori"
// // // // // // // // //                              >
// // // // // // // // //                                 {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
// // // // // // // // //                              </select>
// // // // // // // // //                          </div>
// // // // // // // // //                          <div>
// // // // // // // // //                              <label className="text-xs font-bold text-gray-500 mb-2 block">Cover / Icon Topik</label>
// // // // // // // // //                              <div className="grid grid-cols-5 gap-3">
// // // // // // // // //                                 <button onClick={() => setEditingTopic({...editingTopic, avatarUrl: null})} className={`aspect-square border-2 rounded-xl flex items-center justify-center text-[10px] font-bold ${!editingTopic.avatarUrl ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200'}`} aria-label="Hapus Icon Avatar">No Icon</button>
// // // // // // // // //                                 {cmsIcons.map((cat, idx) => cat.iconUrl && (
// // // // // // // // //                                     <button key={idx} onClick={() => setEditingTopic({...editingTopic, avatarUrl: cat.iconUrl})} className={`relative aspect-square border-2 rounded-xl overflow-hidden ${editingTopic.avatarUrl === cat.iconUrl ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'}`} aria-label={`Pilih Icon ${cat.name}`}>
// // // // // // // // //                                         <img src={getImageUrl(cat.iconUrl)} alt="icon" className="w-full h-full object-cover" />
// // // // // // // // //                                     </button>
// // // // // // // // //                                 ))}
// // // // // // // // //                              </div>
// // // // // // // // //                          </div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-2">
// // // // // // // // //                         <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-bold text-sm" aria-label="Batal Edit">Batal</button>
// // // // // // // // //                         <button onClick={handleUpdateTopic} className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-bold text-sm flex items-center gap-2" aria-label="Simpan Perubahan"><Save size={16}/> Simpan Perubahan</button>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     </Protected>
// // // // // // // // //   );
// // // // // // // // // }
// // // // // // // // 'use client';

// // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // import { ArrowLeft, Send, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
// // // // // // // // import { useAuth } from '@/lib/AuthProvider';

// // // // // // // // export default function ForumDetail() {
// // // // // // // //   const { id } = useParams();
// // // // // // // //   const router = useRouter();
// // // // // // // //   const { user } = useAuth();
  
// // // // // // // //   const [topic, setTopic] = useState<any>(null);
// // // // // // // //   const [reply, setReply] = useState('');
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [submitting, setSubmitting] = useState(false);

// // // // // // // //   useEffect(() => {
// // // // // // // //     loadTopic();
// // // // // // // //   }, [id]);

// // // // // // // //   const loadTopic = async () => {
// // // // // // // //     try {
// // // // // // // //         setLoading(true);
// // // // // // // //         // Tambahkan timestamp untuk hindari cache browser
// // // // // // // //         const data = await api(`/api/forum/${id}?t=${new Date().getTime()}`);
// // // // // // // //         setTopic(data);
// // // // // // // //     } catch (e) { 
// // // // // // // //         console.error(e);
// // // // // // // //         // Jika error (misal 404), redirect balik
// // // // // // // //         alert("Topik tidak ditemukan atau Anda tidak memiliki akses.");
// // // // // // // //         router.push('/forum');
// // // // // // // //     } finally { 
// // // // // // // //         setLoading(false); 
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleReply = async (e: React.FormEvent) => {
// // // // // // // //       e.preventDefault();
// // // // // // // //       if (!reply.trim()) return;
// // // // // // // //       setSubmitting(true);
// // // // // // // //       try {
// // // // // // // //           await api(`/api/forum/${id}/reply`, { method: 'POST', body: { content: reply } });
// // // // // // // //           setReply('');
// // // // // // // //           loadTopic(); // Reload untuk lihat komentar baru
// // // // // // // //       } catch (e: any) { alert(e.message); } 
// // // // // // // //       finally { setSubmitting(false); }
// // // // // // // //   };

// // // // // // // //   // FUNGSI ADMIN: Approve / Reject
// // // // // // // //   const handleStatus = async (newStatus: 'approved' | 'rejected') => {
// // // // // // // //       if(!confirm(`Apakah Anda yakin ingin mengubah status menjadi ${newStatus}?`)) return;
// // // // // // // //       try {
// // // // // // // //           await api(`/api/forum/${id}/status`, { method: 'PATCH', body: { status: newStatus } });
// // // // // // // //           alert(`Status berhasil diubah menjadi ${newStatus}`);
// // // // // // // //           router.push('/forum'); // Balik ke list agar data refresh
// // // // // // // //       } catch (e: any) { alert(e.message); }
// // // // // // // //   };

// // // // // // // //   // FUNGSI ADMIN/OWNER: Delete
// // // // // // // //   const handleDelete = async () => {
// // // // // // // //       if(!confirm("Hapus topik ini secara permanen?")) return;
// // // // // // // //       try {
// // // // // // // //           await api(`/api/forum/${id}`, { method: 'DELETE' });
// // // // // // // //           alert("Topik dihapus.");
// // // // // // // //           router.push('/forum');
// // // // // // // //       } catch (e: any) { alert(e.message); }
// // // // // // // //   };

// // // // // // // //   if (loading) return <div className="p-10 text-center">Memuat diskusi...</div>;
// // // // // // // //   if (!topic) return null;

// // // // // // // //   const isAdmin = user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR');
// // // // // // // //   const isOwner = user && user.id === topic.author._id;

// // // // // // // //   return (
// // // // // // // //     <Protected>
// // // // // // // //       <div className="max-w-4xl mx-auto p-6 font-sans min-h-screen">
        
// // // // // // // //         {/* HEADER & NAVIGASI */}
// // // // // // // //         <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-bold mb-6 text-sm">
// // // // // // // //             <ArrowLeft size={16}/> Kembali ke Forum
// // // // // // // //         </button>

// // // // // // // //         {/* STATUS ALERT (Jika Pending) */}
// // // // // // // //         {topic.status === 'pending' && (
// // // // // // // //             <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-6 flex items-center gap-3">
// // // // // // // //                 <AlertCircle size={24} />
// // // // // // // //                 <div>
// // // // // // // //                     <h3 className="font-bold">Menunggu Persetujuan</h3>
// // // // // // // //                     <p className="text-sm">Topik ini belum tampil di publik. Hanya Admin dan Penulis yang bisa melihatnya.</p>
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         )}

// // // // // // // //         {/* TOPIC CONTENT */}
// // // // // // // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
// // // // // // // //             <div className="flex justify-between items-start mb-6">
// // // // // // // //                 <div className="flex items-center gap-4">
// // // // // // // //                     <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border">
// // // // // // // //                          <img src={topic.author?.avatarUrl ? getImageUrl(topic.author.avatarUrl) : `https://ui-avatars.com/api/?name=${topic.author?.name}`} className="w-full h-full object-cover" alt="Avatar"/>
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                         <h1 className="text-2xl font-bold text-gray-800 leading-tight">{topic.title}</h1>
// // // // // // // //                         <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
// // // // // // // //                             <span className="font-bold text-red-700">{topic.author?.name}</span>
// // // // // // // //                             <span>•</span>
// // // // // // // //                             <span>{new Date(topic.createdAt).toLocaleDateString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</span>
// // // // // // // //                             <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase font-bold text-[10px]">{topic.category}</span>
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
                
// // // // // // // //                 {/* MENU ADMIN / OWNER */}
// // // // // // // //                 <div className="flex gap-2">
// // // // // // // //                     {/* Jika Pending & Admin -> Tampilkan Tombol Approve */}
// // // // // // // //                     {topic.status === 'pending' && isAdmin && (
// // // // // // // //                         <>
// // // // // // // //                             <button onClick={() => handleStatus('approved')} className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-200 transition">
// // // // // // // //                                 <CheckCircle size={14}/> Setujui
// // // // // // // //                             </button>
// // // // // // // //                             <button onClick={() => handleStatus('rejected')} className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-200 transition">
// // // // // // // //                                 <XCircle size={14}/> Tolak
// // // // // // // //                             </button>
// // // // // // // //                         </>
// // // // // // // //                     )}
                    
// // // // // // // //                     {/* Tombol Hapus (Admin atau Pemilik) */}
// // // // // // // //                     {(isAdmin || isOwner) && (
// // // // // // // //                         <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition" title="Hapus Topik">
// // // // // // // //                             <Trash2 size={18}/>
// // // // // // // //                         </button>
// // // // // // // //                     )}
// // // // // // // //                 </div>
// // // // // // // //             </div>

// // // // // // // //             <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
// // // // // // // //                 {topic.content}
// // // // // // // //             </div>
// // // // // // // //         </div>

// // // // // // // //         {/* REPLIES SECTION */}
// // // // // // // //         <div className="space-y-6">
// // // // // // // //             <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
// // // // // // // //                 Komentar <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{topic.replies?.length || 0}</span>
// // // // // // // //             </h3>

// // // // // // // //             {topic.replies?.map((r: any, i: number) => (
// // // // // // // //                 <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 flex gap-4">
// // // // // // // //                     <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
// // // // // // // //                         <img src={r.user?.avatarUrl ? getImageUrl(r.user.avatarUrl) : `https://ui-avatars.com/api/?name=${r.user?.name}`} className="w-full h-full object-cover" alt="User"/>
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                         <div className="flex items-center gap-2 mb-1">
// // // // // // // //                             <span className="font-bold text-sm text-gray-900">{r.user?.name || 'User'}</span>
// // // // // // // //                             <span className="text-xs text-gray-400">• {new Date(r.createdAt).toLocaleDateString()}</span>
// // // // // // // //                             {r.user?.role === 'SUPER_ADMIN' || r.user?.role === 'FACILITATOR' ? (
// // // // // // // //                                 <span className="bg-red-100 text-red-700 text-[10px] px-1.5 rounded font-bold">STAFF</span>
// // // // // // // //                             ) : null}
// // // // // // // //                         </div>
// // // // // // // //                         <p className="text-gray-700 text-sm">{r.content}</p>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             ))}

// // // // // // // //             {/* FORM BALASAN */}
// // // // // // // //             <form onSubmit={handleReply} className="bg-white p-4 rounded-xl border border-gray-200 flex gap-3 shadow-sm sticky bottom-6 z-10">
// // // // // // // //                 <input 
// // // // // // // //                     className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
// // // // // // // //                     placeholder="Tulis balasan..."
// // // // // // // //                     value={reply}
// // // // // // // //                     onChange={e => setReply(e.target.value)}
// // // // // // // //                 />
// // // // // // // //                 <button 
// // // // // // // //                     disabled={!reply.trim() || submitting}
// // // // // // // //                     className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition"
// // // // // // // //                 >
// // // // // // // //                     <Send size={16}/> {submitting ? '...' : 'Kirim'}
// // // // // // // //                 </button>
// // // // // // // //             </form>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </Protected>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // 'use client';

// // // // // // // import { useState, useEffect } from 'react';
// // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // import Protected from '@/components/Protected';
// // // // // // // import { ArrowLeft, Send, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
// // // // // // // import { useAuth } from '@/lib/AuthProvider';

// // // // // // // export default function ForumDetail() {
// // // // // // //   const { id } = useParams();
// // // // // // //   const router = useRouter();
// // // // // // //   const { user } = useAuth();
  
// // // // // // //   const [topic, setTopic] = useState<any>(null);
// // // // // // //   const [reply, setReply] = useState('');
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [submitting, setSubmitting] = useState(false);

// // // // // // //   useEffect(() => { loadTopic(); }, [id]);

// // // // // // //   const loadTopic = async () => {
// // // // // // //     try {
// // // // // // //         setLoading(true);
// // // // // // //         // Timestamp penting untuk bypass cache browser!
// // // // // // //         const data = await api(`/api/forum/${id}?t=${Date.now()}`);
// // // // // // //         setTopic(data);
// // // // // // //     } catch (e: any) { 
// // // // // // //         console.error("Load error:", e);
// // // // // // //         // Tampilkan pesan error spesifik dari backend
// // // // // // //         alert(e.message || "Gagal memuat topik.");
// // // // // // //         router.push('/forum');
// // // // // // //     } finally { 
// // // // // // //         setLoading(false); 
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleReply = async (e: React.FormEvent) => {
// // // // // // //       e.preventDefault();
// // // // // // //       if (!reply.trim()) return;
// // // // // // //       setSubmitting(true);
// // // // // // //       try {
// // // // // // //           await api(`/api/forum/${id}/reply`, { method: 'POST', body: { content: reply } });
// // // // // // //           setReply('');
// // // // // // //           loadTopic(); 
// // // // // // //       } catch (e: any) { alert(e.message); } 
// // // // // // //       finally { setSubmitting(false); }
// // // // // // //   };

// // // // // // //   const handleStatus = async (newStatus: 'approved' | 'rejected') => {
// // // // // // //       if(!confirm(`Ubah status menjadi ${newStatus}?`)) return;
// // // // // // //       try {
// // // // // // //           await api(`/api/forum/${id}/status`, { method: 'PATCH', body: { status: newStatus } });
// // // // // // //           alert("Status berhasil diperbarui!");
// // // // // // //           // Redirect ke list agar refresh
// // // // // // //           router.push('/forum'); 
// // // // // // //       } catch (e: any) { alert(e.message); }
// // // // // // //   };

// // // // // // //   const handleDelete = async () => {
// // // // // // //       if(!confirm("Hapus topik ini permanen?")) return;
// // // // // // //       try {
// // // // // // //           await api(`/api/forum/${id}`, { method: 'DELETE' });
// // // // // // //           alert("Topik dihapus.");
// // // // // // //           router.push('/forum');
// // // // // // //       } catch (e: any) { alert(e.message); }
// // // // // // //   };

// // // // // // //   if (loading) return <div className="p-20 text-center">Memuat...</div>;
// // // // // // //   if (!topic) return null;

// // // // // // //   // Cek Role (Case Insensitive di Frontend juga biar aman)
// // // // // // //   const userRole = user?.role?.toUpperCase() || '';
// // // // // // //   const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// // // // // // //   const isOwner = user?.id === topic.author._id;

// // // // // // //   return (
// // // // // // //     <Protected>
// // // // // // //       <div className="max-w-4xl mx-auto p-6 font-sans min-h-screen">
        
// // // // // // //         <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-bold mb-6 text-sm">
// // // // // // //             <ArrowLeft size={16}/> Kembali ke Forum
// // // // // // //         </button>

// // // // // // //         {/* ALERT STATUS PENDING */}
// // // // // // //         {topic.status === 'pending' && (
// // // // // // //             <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-6 flex items-center gap-3">
// // // // // // //                 <AlertCircle size={24} />
// // // // // // //                 <div className="flex-1">
// // // // // // //                     <h3 className="font-bold">Menunggu Persetujuan Admin</h3>
// // // // // // //                     <p className="text-sm">Topik ini belum tampil di publik.</p>
// // // // // // //                 </div>
// // // // // // //                 {/* TOMBOL APPROVE KHUSUS ADMIN DI SINI */}
// // // // // // //                 {isAdmin && (
// // // // // // //                     <div className="flex gap-2">
// // // // // // //                         <button onClick={() => handleStatus('approved')} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 flex items-center gap-1">
// // // // // // //                             <CheckCircle size={14}/> Setujui
// // // // // // //                         </button>
// // // // // // //                         <button onClick={() => handleStatus('rejected')} className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 flex items-center gap-1">
// // // // // // //                             <XCircle size={14}/> Tolak
// // // // // // //                         </button>
// // // // // // //                     </div>
// // // // // // //                 )}
// // // // // // //             </div>
// // // // // // //         )}

// // // // // // //         {/* KONTEN UTAMA */}
// // // // // // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
// // // // // // //             <div className="flex justify-between items-start mb-6">
// // // // // // //                 <div className="flex items-center gap-4">
// // // // // // //                     <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border">
// // // // // // //                          <img src={topic.author?.avatarUrl ? getImageUrl(topic.author.avatarUrl) : `https://ui-avatars.com/api/?name=${topic.author?.name}`} className="w-full h-full object-cover" alt="Avatar"/>
// // // // // // //                     </div>
// // // // // // //                     <div>
// // // // // // //                         <h1 className="text-2xl font-bold text-gray-800 leading-tight">{topic.title}</h1>
// // // // // // //                         <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
// // // // // // //                             <span className="font-bold text-red-700">{topic.author?.name}</span>
// // // // // // //                             <span>•</span>
// // // // // // //                             <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
// // // // // // //                             <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase font-bold text-[10px]">{topic.category}</span>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 </div>
                
// // // // // // //                 {/* TOMBOL HAPUS (ADMIN/OWNER) */}
// // // // // // //                 {(isAdmin || isOwner) && (
// // // // // // //                     <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition" title="Hapus Topik">
// // // // // // //                         <Trash2 size={18}/>
// // // // // // //                     </button>
// // // // // // //                 )}
// // // // // // //             </div>

// // // // // // //             <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
// // // // // // //                 {topic.content}
// // // // // // //             </div>
// // // // // // //         </div>

// // // // // // //         {/* KOLOM KOMENTAR */}
// // // // // // //         <div className="space-y-6">
// // // // // // //             <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
// // // // // // //                 Komentar <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{topic.replies?.length || 0}</span>
// // // // // // //             </h3>

// // // // // // //             {topic.replies?.map((r: any, i: number) => (
// // // // // // //                 <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 flex gap-4">
// // // // // // //                     <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
// // // // // // //                         <img src={r.user?.avatarUrl ? getImageUrl(r.user.avatarUrl) : `https://ui-avatars.com/api/?name=${r.user?.name}`} className="w-full h-full object-cover"/>
// // // // // // //                     </div>
// // // // // // //                     <div>
// // // // // // //                         <div className="flex items-center gap-2 mb-1">
// // // // // // //                             <span className="font-bold text-sm text-gray-900">{r.user?.name || 'User'}</span>
// // // // // // //                             <span className="text-xs text-gray-400">• {new Date(r.createdAt).toLocaleDateString()}</span>
// // // // // // //                         </div>
// // // // // // //                         <p className="text-gray-700 text-sm">{r.content}</p>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             ))}

// // // // // // //             <form onSubmit={handleReply} className="bg-white p-4 rounded-xl border border-gray-200 flex gap-3 shadow-sm sticky bottom-6 z-10">
// // // // // // //                 <input 
// // // // // // //                     className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
// // // // // // //                     placeholder="Tulis balasan..."
// // // // // // //                     value={reply}
// // // // // // //                     onChange={e => setReply(e.target.value)}
// // // // // // //                 />
// // // // // // //                 <button 
// // // // // // //                     disabled={!reply.trim() || submitting}
// // // // // // //                     className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-red-800 disabled:opacity-50 flex items-center gap-2"
// // // // // // //                 >
// // // // // // //                     <Send size={16}/> {submitting ? '...' : 'Kirim'}
// // // // // // //                 </button>
// // // // // // //             </form>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </Protected>
// // // // // // //   );
// // // // // // // }
// // // // // // 'use client';

// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // import Protected from '@/components/Protected';
// // // // // // import { ArrowLeft, Send, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
// // // // // // import { useAuth } from '@/lib/AuthProvider';

// // // // // // export default function ForumDetail() {
// // // // // //   const { id } = useParams();
// // // // // //   const router = useRouter();
// // // // // //   const { user } = useAuth();
  
// // // // // //   const [topic, setTopic] = useState<any>(null);
// // // // // //   const [reply, setReply] = useState('');
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [submitting, setSubmitting] = useState(false);

// // // // // //   useEffect(() => { loadTopic(); }, [id]);

// // // // // //   const loadTopic = async () => {
// // // // // //     try {
// // // // // //         setLoading(true);
// // // // // //         // Timestamp penting untuk bypass cache browser!
// // // // // //         const data = await api(`/api/forum/${id}?t=${Date.now()}`);
// // // // // //         setTopic(data);
// // // // // //     } catch (e: any) { 
// // // // // //         console.error("Load error:", e);
// // // // // //         // Tampilkan pesan error spesifik dari backend
// // // // // //         alert(e.message || "Gagal memuat topik.");
// // // // // //         router.push('/forum');
// // // // // //     } finally { 
// // // // // //         setLoading(false); 
// // // // // //     }
// // // // // //   };

// // // // // //   const handleReply = async (e: React.FormEvent) => {
// // // // // //       e.preventDefault();
// // // // // //       if (!reply.trim()) return;
// // // // // //       setSubmitting(true);
// // // // // //       try {
// // // // // //           await api(`/api/forum/${id}/reply`, { method: 'POST', body: { content: reply } });
// // // // // //           setReply('');
// // // // // //           loadTopic(); 
// // // // // //       } catch (e: any) { alert(e.message); } 
// // // // // //       finally { setSubmitting(false); }
// // // // // //   };

// // // // // //   const handleStatus = async (newStatus: 'approved' | 'rejected') => {
// // // // // //       if(!confirm(`Ubah status menjadi ${newStatus}?`)) return;
// // // // // //       try {
// // // // // //           await api(`/api/forum/${id}/status`, { method: 'PATCH', body: { status: newStatus } });
// // // // // //           alert("Status berhasil diperbarui!");
// // // // // //           // Redirect ke list agar refresh
// // // // // //           router.push('/forum'); 
// // // // // //       } catch (e: any) { alert(e.message); }
// // // // // //   };

// // // // // //   const handleDelete = async () => {
// // // // // //       if(!confirm("Hapus topik ini permanen?")) return;
// // // // // //       try {
// // // // // //           await api(`/api/forum/${id}`, { method: 'DELETE' });
// // // // // //           alert("Topik dihapus.");
// // // // // //           router.push('/forum');
// // // // // //       } catch (e: any) { alert(e.message); }
// // // // // //   };

// // // // // //   if (loading) return <div className="p-20 text-center">Memuat...</div>;
// // // // // //   if (!topic) return null;

// // // // // //   // Cek Role (Case Insensitive di Frontend juga biar aman)
// // // // // //   const userRole = user?.role?.toUpperCase() || '';
// // // // // //   const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// // // // // //   const isOwner = user?.id === topic.author._id;

// // // // // //   return (
// // // // // //     <Protected>
// // // // // //       <div className="max-w-4xl mx-auto p-6 font-sans min-h-screen">
        
// // // // // //         <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-bold mb-6 text-sm">
// // // // // //             <ArrowLeft size={16}/> Kembali ke Forum
// // // // // //         </button>

// // // // // //         {/* ALERT STATUS PENDING */}
// // // // // //         {topic.status === 'pending' && (
// // // // // //             <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-6 flex items-center gap-3">
// // // // // //                 <AlertCircle size={24} />
// // // // // //                 <div className="flex-1">
// // // // // //                     <h3 className="font-bold">Menunggu Persetujuan Admin</h3>
// // // // // //                     <p className="text-sm">Topik ini belum tampil di publik.</p>
// // // // // //                 </div>
// // // // // //                 {/* TOMBOL APPROVE KHUSUS ADMIN DI SINI */}
// // // // // //                 {isAdmin && (
// // // // // //                     <div className="flex gap-2">
// // // // // //                         <button onClick={() => handleStatus('approved')} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 flex items-center gap-1">
// // // // // //                             <CheckCircle size={14}/> Setujui
// // // // // //                         </button>
// // // // // //                         <button onClick={() => handleStatus('rejected')} className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 flex items-center gap-1">
// // // // // //                             <XCircle size={14}/> Tolak
// // // // // //                         </button>
// // // // // //                     </div>
// // // // // //                 )}
// // // // // //             </div>
// // // // // //         )}

// // // // // //         {/* KONTEN UTAMA */}
// // // // // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
// // // // // //             <div className="flex justify-between items-start mb-6">
// // // // // //                 <div className="flex items-center gap-4">
// // // // // //                     <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border">
// // // // // //                          <img src={topic.author?.avatarUrl ? getImageUrl(topic.author.avatarUrl) : `https://ui-avatars.com/api/?name=${topic.author?.name}`} className="w-full h-full object-cover" alt={topic.author?.name || "Avatar Penulis"}/>
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                         <h1 className="text-2xl font-bold text-gray-800 leading-tight">{topic.title}</h1>
// // // // // //                         <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
// // // // // //                             <span className="font-bold text-red-700">{topic.author?.name}</span>
// // // // // //                             <span>•</span>
// // // // // //                             <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
// // // // // //                             <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase font-bold text-[10px]">{topic.category}</span>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 </div>
                
// // // // // //                 {/* TOMBOL HAPUS (ADMIN/OWNER) */}
// // // // // //                 {(isAdmin || isOwner) && (
// // // // // //                     <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition" title="Hapus Topik">
// // // // // //                         <Trash2 size={18}/>
// // // // // //                     </button>
// // // // // //                 )}
// // // // // //             </div>

// // // // // //             <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
// // // // // //                 {topic.content}
// // // // // //             </div>
// // // // // //         </div>

// // // // // //         {/* KOLOM KOMENTAR */}
// // // // // //         <div className="space-y-6">
// // // // // //             <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
// // // // // //                 Komentar <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{topic.replies?.length || 0}</span>
// // // // // //             </h3>

// // // // // //             {topic.replies?.map((r: any, i: number) => (
// // // // // //                 <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 flex gap-4">
// // // // // //                     <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
// // // // // //                         {/* FIX: Added alt attribute */}
// // // // // //                         <img 
// // // // // //                             src={r.user?.avatarUrl ? getImageUrl(r.user.avatarUrl) : `https://ui-avatars.com/api/?name=${r.user?.name}`} 
// // // // // //                             className="w-full h-full object-cover" 
// // // // // //                             alt={r.user?.name || "User Avatar"}
// // // // // //                         />
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                         <div className="flex items-center gap-2 mb-1">
// // // // // //                             <span className="font-bold text-sm text-gray-900">{r.user?.name || 'User'}</span>
// // // // // //                             <span className="text-xs text-gray-400">• {new Date(r.createdAt).toLocaleDateString()}</span>
// // // // // //                         </div>
// // // // // //                         <p className="text-gray-700 text-sm">{r.content}</p>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             ))}

// // // // // //             <form onSubmit={handleReply} className="bg-white p-4 rounded-xl border border-gray-200 flex gap-3 shadow-sm sticky bottom-6 z-10">
// // // // // //                 <input 
// // // // // //                     className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
// // // // // //                     placeholder="Tulis balasan..."
// // // // // //                     value={reply}
// // // // // //                     onChange={e => setReply(e.target.value)}
// // // // // //                 />
// // // // // //                 <button 
// // // // // //                     disabled={!reply.trim() || submitting}
// // // // // //                     className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-red-800 disabled:opacity-50 flex items-center gap-2"
// // // // // //                 >
// // // // // //                     <Send size={16}/> {submitting ? '...' : 'Kirim'}
// // // // // //                 </button>
// // // // // //             </form>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </Protected>
// // // // // //   );
// // // // // // }
// // // // // 'use client';

// // // // // import { useState, useEffect, useRef } from 'react';
// // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // import Protected from '@/components/Protected';
// // // // // import { ArrowLeft, Send, Trash2, CheckCircle, XCircle, AlertCircle, Smile, MoreVertical } from 'lucide-react';
// // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // import EmojiPicker from 'emoji-picker-react';

// // // // // export default function ForumDetail() {
// // // // //   const { id } = useParams();
// // // // //   const router = useRouter();
// // // // //   const { user } = useAuth();
  
// // // // //   const [topic, setTopic] = useState<any>(null);
// // // // //   const [reply, setReply] = useState('');
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [submitting, setSubmitting] = useState(false);
  
// // // // //   // STATE BARU: EMOJI & MENTION
// // // // //   const [showEmoji, setShowEmoji] = useState(false);
// // // // //   const [mentionQuery, setMentionQuery] = useState('');
// // // // //   const [showMentions, setShowMentions] = useState(false);
// // // // //   const inputRef = useRef<HTMLInputElement>(null);

// // // // //   useEffect(() => { loadTopic(); }, [id]);

// // // // //   const loadTopic = async () => {
// // // // //     try {
// // // // //         setLoading(true);
// // // // //         const data = await api(`/api/forum/${id}?t=${Date.now()}`);
// // // // //         setTopic(data);
// // // // //     } catch (e: any) { 
// // // // //         alert(e.message || "Gagal memuat topik.");
// // // // //         router.push('/forum');
// // // // //     } finally { setLoading(false); }
// // // // //   };

// // // // //   // --- LOGIKA MENTION ---
// // // // //   // Ambil daftar user unik yang terlibat di diskusi ini (Penulis Topik + Yang Komen)
// // // // //   const getParticipants = () => {
// // // // //       if (!topic) return [];
// // // // //       const users = [topic.author];
// // // // //       topic.replies.forEach((r: any) => users.push(r.user));
      
// // // // //       // Hapus duplikat berdasarkan ID
// // // // //       const uniqueUsers = Array.from(new Map(users.map(u => [u?._id, u])).values()).filter(u => u?._id !== user?.id);
      
// // // // //       if (!mentionQuery) return uniqueUsers;
// // // // //       return uniqueUsers.filter(u => u.name.toLowerCase().includes(mentionQuery.toLowerCase()));
// // // // //   };

// // // // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //       const val = e.target.value;
// // // // //       setReply(val);

// // // // //       // Deteksi ketikan '@' terakhir
// // // // //       const lastWord = val.split(' ').pop();
// // // // //       if (lastWord && lastWord.startsWith('@')) {
// // // // //           setMentionQuery(lastWord.substring(1)); // Ambil teks setelah @
// // // // //           setShowMentions(true);
// // // // //       } else {
// // // // //           setShowMentions(false);
// // // // //       }
// // // // //   };

// // // // //   const insertMention = (name: string) => {
// // // // //       const words = reply.split(' ');
// // // // //       words.pop(); // Hapus @teks terakhir
// // // // //       const newText = words.join(' ') + ` @${name} `;
// // // // //       setReply(newText);
// // // // //       setShowMentions(false);
// // // // //       inputRef.current?.focus();
// // // // //   };

// // // // //   // --- LOGIKA EMOJI ---
// // // // //   const onEmojiClick = (emojiData: any) => {
// // // // //       setReply(prev => prev + emojiData.emoji);
// // // // //       setShowEmoji(false);
// // // // //   };

// // // // //   // --- LOGIKA REPLY ---
// // // // //   const handleReply = async (e: React.FormEvent) => {
// // // // //       e.preventDefault();
// // // // //       if (!reply.trim()) return;
// // // // //       setSubmitting(true);
// // // // //       try {
// // // // //           await api(`/api/forum/${id}/reply`, { method: 'POST', body: { content: reply } });
// // // // //           setReply('');
// // // // //           setShowEmoji(false);
// // // // //           loadTopic(); 
// // // // //       } catch (e: any) { alert(e.message); } 
// // // // //       finally { setSubmitting(false); }
// // // // //   };

// // // // //   // --- HELPER UI ---
// // // // //   // Fungsi untuk Avatar Fallback (Warna-warni sesuai nama)
// // // // //   const Avatar = ({ u, size = "w-10 h-10" }: { u: any, size?: string }) => {
// // // // //       if (!u) return <div className={`${size} bg-gray-200 rounded-full`} />;
      
// // // // //       if (u.avatarUrl) {
// // // // //           return <img src={getImageUrl(u.avatarUrl)} className={`${size} rounded-full object-cover border border-gray-200`} alt={u.name} />;
// // // // //       }
      
// // // // //       // Generate warna random dari nama
// // // // //       const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
// // // // //       const colorIndex = u.name.length % colors.length;
// // // // //       const initials = u.name.substring(0, 2).toUpperCase();

// // // // //       return (
// // // // //           <div className={`${size} rounded-full ${colors[colorIndex]} text-white flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm`}>
// // // // //               {initials}
// // // // //           </div>
// // // // //       );
// // // // //   };

// // // // //   // --- ADMIN ACTIONS ---
// // // // //   const handleStatus = async (newStatus: 'approved' | 'rejected') => {
// // // // //       if(!confirm(`Ubah status menjadi ${newStatus}?`)) return;
// // // // //       try {
// // // // //           await api(`/api/forum/${id}/status`, { method: 'PATCH', body: { status: newStatus } });
// // // // //           loadTopic(); // Refresh di tempat saja
// // // // //       } catch (e: any) { alert(e.message); }
// // // // //   };

// // // // //   const handleDelete = async () => {
// // // // //       if(!confirm("Hapus topik ini?")) return;
// // // // //       try {
// // // // //           await api(`/api/forum/${id}`, { method: 'DELETE' });
// // // // //           router.push('/forum');
// // // // //       } catch (e: any) { alert(e.message); }
// // // // //   };

// // // // //   if (loading) return <div className="p-20 text-center">Memuat...</div>;
// // // // //   if (!topic) return null;

// // // // //   const isAdmin = user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR');
// // // // //   const isOwner = user?.id === topic.author._id;

// // // // //   return (
// // // // //     <Protected>
// // // // //       <div className="max-w-4xl mx-auto p-6 font-sans min-h-screen pb-40">
        
// // // // //         <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-bold mb-6 text-sm">
// // // // //             <ArrowLeft size={16}/> Kembali ke Forum
// // // // //         </button>

// // // // //         {/* STATUS ALERT */}
// // // // //         {topic.status === 'pending' && (
// // // // //             <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-6 flex justify-between items-center">
// // // // //                 <div className="flex items-center gap-3">
// // // // //                     <AlertCircle size={24} />
// // // // //                     <div>
// // // // //                         <h3 className="font-bold">Menunggu Persetujuan Admin</h3>
// // // // //                         <p className="text-sm">Topik ini belum tampil di publik.</p>
// // // // //                     </div>
// // // // //                 </div>
// // // // //                 {isAdmin && (
// // // // //                     <div className="flex gap-2">
// // // // //                         <button onClick={() => handleStatus('approved')} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 flex gap-1"><CheckCircle size={14}/> Setujui</button>
// // // // //                         <button onClick={() => handleStatus('rejected')} className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 flex gap-1"><XCircle size={14}/> Tolak</button>
// // // // //                     </div>
// // // // //                 )}
// // // // //             </div>
// // // // //         )}

// // // // //         {/* KONTEN UTAMA */}
// // // // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
// // // // //             <div className="flex justify-between items-start mb-6">
// // // // //                 <div className="flex items-center gap-4">
// // // // //                     <Avatar u={topic.author} size="w-12 h-12" />
// // // // //                     <div>
// // // // //                         <h1 className="text-2xl font-bold text-gray-800 leading-tight">{topic.title}</h1>
// // // // //                         <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
// // // // //                             <span className="font-bold text-red-700">{topic.author?.name}</span>
// // // // //                             <span>•</span>
// // // // //                             <span>{new Date(topic.createdAt).toLocaleDateString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</span>
// // // // //                             <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase font-bold text-[10px]">{topic.category}</span>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>
// // // // //                 {(isAdmin || isOwner) && (
// // // // //                     <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition"><Trash2 size={18}/></button>
// // // // //                 )}
// // // // //             </div>
// // // // //             <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">{topic.content}</div>
// // // // //         </div>

// // // // //         {/* KOMENTAR */}
// // // // //         <div className="space-y-6 mb-24">
// // // // //             <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
// // // // //                 Komentar <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{topic.replies?.length || 0}</span>
// // // // //             </h3>

// // // // //             {topic.replies?.map((r: any, i: number) => (
// // // // //                 <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 flex gap-4">
// // // // //                     <div className="flex-shrink-0">
// // // // //                         <Avatar u={r.user} size="w-10 h-10" />
// // // // //                     </div>
// // // // //                     <div className="flex-1">
// // // // //                         <div className="flex items-center gap-2 mb-1">
// // // // //                             <span className="font-bold text-sm text-gray-900">{r.user?.name || 'User'}</span>
// // // // //                             <span className="text-xs text-gray-400">• {new Date(r.createdAt).toLocaleDateString()}</span>
// // // // //                             {(r.user?.role === 'SUPER_ADMIN' || r.user?.role === 'FACILITATOR') && (
// // // // //                                 <span className="bg-red-100 text-red-700 text-[10px] px-1.5 rounded font-bold">STAFF</span>
// // // // //                             )}
// // // // //                         </div>
// // // // //                         {/* Render text with Highlighted Mentions */}
// // // // //                         <p className="text-gray-700 text-sm whitespace-pre-wrap">
// // // // //                             {r.content.split(' ').map((word: string, idx: number) => 
// // // // //                                 word.startsWith('@') ? <span key={idx} className="text-blue-600 font-bold">{word} </span> : word + ' '
// // // // //                             )}
// // // // //                         </p>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             ))}
// // // // //         </div>

// // // // //         {/* FORM BALASAN FIXED BOTTOM */}
// // // // //         <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg z-20">
// // // // //             <div className="max-w-4xl mx-auto relative">
                
// // // // //                 {/* POPUP MENTION */}
// // // // //                 {showMentions && (
// // // // //                     <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-30">
// // // // //                         <div className="bg-gray-50 px-3 py-2 text-xs font-bold text-gray-500 border-b">Mention User</div>
// // // // //                         {getParticipants().map((u: any) => (
// // // // //                             <button 
// // // // //                                 key={u._id} 
// // // // //                                 onClick={() => insertMention(u.name)}
// // // // //                                 className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-sm"
// // // // //                             >
// // // // //                                 <Avatar u={u} size="w-6 h-6" />
// // // // //                                 <span className="truncate font-medium">{u.name}</span>
// // // // //                             </button>
// // // // //                         ))}
// // // // //                         {getParticipants().length === 0 && <div className="px-4 py-2 text-xs text-gray-400">User tidak ditemukan di thread ini.</div>}
// // // // //                     </div>
// // // // //                 )}

// // // // //                 {/* POPUP EMOJI */}
// // // // //                 {showEmoji && (
// // // // //                     <div className="absolute bottom-full right-0 mb-2 z-30 shadow-2xl rounded-xl">
// // // // //                         <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={400} />
// // // // //                     </div>
// // // // //                 )}

// // // // //                 <form onSubmit={handleReply} className="flex gap-3 items-center">
// // // // //                     <button 
// // // // //                         type="button" 
// // // // //                         onClick={() => setShowEmoji(!showEmoji)} 
// // // // //                         className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-full transition"
// // // // //                     >
// // // // //                         <Smile size={24}/>
// // // // //                     </button>
                    
// // // // //                     <input 
// // // // //                         ref={inputRef}
// // // // //                         className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
// // // // //                         placeholder="Tulis balasan... (Ketik @ untuk mention)"
// // // // //                         value={reply}
// // // // //                         onChange={handleInputChange}
// // // // //                     />
                    
// // // // //                     <button 
// // // // //                         disabled={!reply.trim() || submitting}
// // // // //                         className="bg-red-700 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-red-800 disabled:opacity-50 flex items-center gap-2 shadow-md"
// // // // //                     >
// // // // //                         <Send size={18}/> {submitting ? '...' : 'Kirim'}
// // // // //                     </button>
// // // // //                 </form>
// // // // //             </div>
// // // // //         </div>

// // // // //       </div>
// // // // //     </Protected>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import { useState, useEffect, useRef } from 'react';
// // // // import { useParams, useRouter } from 'next/navigation';
// // // // import { api, getImageUrl } from '@/lib/api';
// // // // import Protected from '@/components/Protected';
// // // // import { ArrowLeft, Send, Trash2, CheckCircle, XCircle, AlertCircle, Smile } from 'lucide-react';
// // // // import { useAuth } from '@/lib/AuthProvider';
// // // // import EmojiPicker from 'emoji-picker-react';

// // // // export default function ForumDetail() {
// // // //   const { id } = useParams();
// // // //   const router = useRouter();
// // // //   const { user } = useAuth();
  
// // // //   const [topic, setTopic] = useState<any>(null);
// // // //   const [reply, setReply] = useState('');
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [submitting, setSubmitting] = useState(false);
  
// // // //   // STATE BARU: EMOJI & MENTION
// // // //   const [showEmoji, setShowEmoji] = useState(false);
// // // //   const [mentionQuery, setMentionQuery] = useState('');
// // // //   const [showMentions, setShowMentions] = useState(false);
// // // //   const inputRef = useRef<HTMLInputElement>(null);

// // // //   useEffect(() => { loadTopic(); }, [id]);

// // // //   const loadTopic = async () => {
// // // //     try {
// // // //         setLoading(true);
// // // //         const data = await api(`/api/forum/${id}?t=${Date.now()}`);
// // // //         setTopic(data);
// // // //     } catch (e: any) { 
// // // //         alert(e.message || "Gagal memuat topik.");
// // // //         router.push('/forum');
// // // //     } finally { setLoading(false); }
// // // //   };

// // // //   // --- LOGIKA MENTION ---
// // // //   const getParticipants = () => {
// // // //       if (!topic) return [];
// // // //       const users = [topic.author];
// // // //       topic.replies.forEach((r: any) => users.push(r.user));
      
// // // //       const uniqueUsers = Array.from(new Map(users.filter(u => u).map(u => [u._id, u])).values())
// // // //         .filter((u: any) => u._id !== user?.id);
      
// // // //       if (!mentionQuery) return uniqueUsers;
// // // //       return uniqueUsers.filter((u: any) => u.name.toLowerCase().includes(mentionQuery.toLowerCase()));
// // // //   };

// // // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //       const val = e.target.value;
// // // //       setReply(val);

// // // //       const lastWord = val.split(' ').pop();
// // // //       if (lastWord && lastWord.startsWith('@')) {
// // // //           setMentionQuery(lastWord.substring(1));
// // // //           setShowMentions(true);
// // // //       } else {
// // // //           setShowMentions(false);
// // // //       }
// // // //   };

// // // //   const insertMention = (name: string) => {
// // // //       const words = reply.split(' ');
// // // //       words.pop(); 
// // // //       const newText = words.join(' ') + ` @${name} `;
// // // //       setReply(newText);
// // // //       setShowMentions(false);
// // // //       inputRef.current?.focus();
// // // //   };

// // // //   // --- LOGIKA EMOJI ---
// // // //   const onEmojiClick = (emojiData: any) => {
// // // //       setReply(prev => prev + emojiData.emoji);
// // // //       setShowEmoji(false);
// // // //   };

// // // //   // --- LOGIKA REPLY ---
// // // //   const handleReply = async (e: React.FormEvent) => {
// // // //       e.preventDefault();
// // // //       if (!reply.trim()) return;
// // // //       setSubmitting(true);
// // // //       try {
// // // //           await api(`/api/forum/${id}/reply`, { method: 'POST', body: { content: reply } });
// // // //           setReply('');
// // // //           setShowEmoji(false);
// // // //           loadTopic(); 
// // // //       } catch (e: any) { alert(e.message); } 
// // // //       finally { setSubmitting(false); }
// // // //   };

// // // //   // --- HELPER UI ---
// // // //   const Avatar = ({ u, size = "w-10 h-10" }: { u: any, size?: string }) => {
// // // //       if (!u) return <div className={`${size} bg-gray-200 rounded-full`} />;
      
// // // //       if (u.avatarUrl) {
// // // //           return <img src={getImageUrl(u.avatarUrl)} className={`${size} rounded-full object-cover border border-gray-200`} alt={u.name || "Avatar"} />;
// // // //       }
      
// // // //       const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
// // // //       const colorIndex = (u.name?.length || 0) % colors.length;
// // // //       const initials = u.name?.substring(0, 2).toUpperCase() || "UN";

// // // //       return (
// // // //           <div className={`${size} rounded-full ${colors[colorIndex]} text-white flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm`}>
// // // //               {initials}
// // // //           </div>
// // // //       );
// // // //   };

// // // //   // --- ADMIN ACTIONS ---
// // // //   const handleStatus = async (newStatus: 'approved' | 'rejected') => {
// // // //       if(!confirm(`Ubah status menjadi ${newStatus}?`)) return;
// // // //       try {
// // // //           await api(`/api/forum/${id}/status`, { method: 'PATCH', body: { status: newStatus } });
// // // //           loadTopic(); 
// // // //       } catch (e: any) { alert(e.message); }
// // // //   };

// // // //   const handleDelete = async () => {
// // // //       if(!confirm("Hapus topik ini?")) return;
// // // //       try {
// // // //           await api(`/api/forum/${id}`, { method: 'DELETE' });
// // // //           router.push('/forum');
// // // //       } catch (e: any) { alert(e.message); }
// // // //   };

// // // //   if (loading) return <div className="p-20 text-center">Memuat...</div>;
// // // //   if (!topic) return null;

// // // //   const isAdmin = user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR');
// // // //   const isOwner = user?.id === topic.author?._id;

// // // //   return (
// // // //     <Protected>
// // // //       <div className="max-w-4xl mx-auto p-6 font-sans min-h-screen pb-40">
        
// // // //         <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-bold mb-6 text-sm">
// // // //             <ArrowLeft size={16}/> Kembali ke Forum
// // // //         </button>

// // // //         {/* STATUS ALERT */}
// // // //         {topic.status === 'pending' && (
// // // //             <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-6 flex justify-between items-center">
// // // //                 <div className="flex items-center gap-3">
// // // //                     <AlertCircle size={24} />
// // // //                     <div>
// // // //                         <h3 className="font-bold">Menunggu Persetujuan Admin</h3>
// // // //                         <p className="text-sm">Topik ini belum tampil di publik.</p>
// // // //                     </div>
// // // //                 </div>
// // // //                 {isAdmin && (
// // // //                     <div className="flex gap-2">
// // // //                         <button onClick={() => handleStatus('approved')} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 flex gap-1"><CheckCircle size={14}/> Setujui</button>
// // // //                         <button onClick={() => handleStatus('rejected')} className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 flex gap-1"><XCircle size={14}/> Tolak</button>
// // // //                     </div>
// // // //                 )}
// // // //             </div>
// // // //         )}

// // // //         {/* KONTEN UTAMA */}
// // // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
// // // //             <div className="flex justify-between items-start mb-6">
// // // //                 <div className="flex items-center gap-4">
// // // //                     <Avatar u={topic.author} size="w-12 h-12" />
// // // //                     <div>
// // // //                         <h1 className="text-2xl font-bold text-gray-800 leading-tight">{topic.title}</h1>
// // // //                         <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
// // // //                             <span className="font-bold text-red-700">{topic.author?.name || 'Anonim'}</span>
// // // //                             <span>•</span>
// // // //                             <span>{new Date(topic.createdAt).toLocaleDateString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</span>
// // // //                             <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase font-bold text-[10px]">{topic.category}</span>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //                 {(isAdmin || isOwner) && (
// // // //                     // FIX: Added aria-label untuk tombol hapus
// // // //                     <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition" aria-label="Hapus Topik">
// // // //                         <Trash2 size={18}/>
// // // //                     </button>
// // // //                 )}
// // // //             </div>
// // // //             <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">{topic.content}</div>
// // // //         </div>

// // // //         {/* KOMENTAR */}
// // // //         <div className="space-y-6 mb-24">
// // // //             <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
// // // //                 Komentar <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{topic.replies?.length || 0}</span>
// // // //             </h3>

// // // //             {topic.replies?.map((r: any, i: number) => (
// // // //                 <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 flex gap-4">
// // // //                     <div className="flex-shrink-0">
// // // //                         <Avatar u={r.user} size="w-10 h-10" />
// // // //                     </div>
// // // //                     <div className="flex-1">
// // // //                         <div className="flex items-center gap-2 mb-1">
// // // //                             <span className="font-bold text-sm text-gray-900">{r.user?.name || 'User'}</span>
// // // //                             <span className="text-xs text-gray-400">• {new Date(r.createdAt).toLocaleDateString()}</span>
// // // //                             {(r.user?.role === 'SUPER_ADMIN' || r.user?.role === 'FACILITATOR') && (
// // // //                                 <span className="bg-red-100 text-red-700 text-[10px] px-1.5 rounded font-bold">STAFF</span>
// // // //                             )}
// // // //                         </div>
// // // //                         <p className="text-gray-700 text-sm whitespace-pre-wrap">
// // // //                             {r.content.split(' ').map((word: string, idx: number) => 
// // // //                                 word.startsWith('@') ? <span key={idx} className="text-blue-600 font-bold">{word} </span> : word + ' '
// // // //                             )}
// // // //                         </p>
// // // //                     </div>
// // // //                 </div>
// // // //             ))}
// // // //         </div>

// // // //         {/* FORM BALASAN FIXED BOTTOM */}
// // // //         <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg z-20">
// // // //             <div className="max-w-4xl mx-auto relative">
                
// // // //                 {/* POPUP MENTION */}
// // // //                 {showMentions && (
// // // //                     <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-30">
// // // //                         <div className="bg-gray-50 px-3 py-2 text-xs font-bold text-gray-500 border-b">Mention User</div>
// // // //                         {getParticipants().map((u: any) => (
// // // //                             <button 
// // // //                                 key={u._id} 
// // // //                                 onClick={() => insertMention(u.name)}
// // // //                                 className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-sm"
// // // //                             >
// // // //                                 <Avatar u={u} size="w-6 h-6" />
// // // //                                 <span className="truncate font-medium">{u.name}</span>
// // // //                             </button>
// // // //                         ))}
// // // //                         {getParticipants().length === 0 && <div className="px-4 py-2 text-xs text-gray-400">User tidak ditemukan di thread ini.</div>}
// // // //                     </div>
// // // //                 )}

// // // //                 {/* POPUP EMOJI */}
// // // //                 {showEmoji && (
// // // //                     <div className="absolute bottom-full right-0 mb-2 z-30 shadow-2xl rounded-xl">
// // // //                         <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={400} />
// // // //                     </div>
// // // //                 )}

// // // //                 <form onSubmit={handleReply} className="flex gap-3 items-center">
// // // //                     {/* FIX: Added aria-label untuk tombol emoji */}
// // // //                     <button 
// // // //                         type="button" 
// // // //                         onClick={() => setShowEmoji(!showEmoji)} 
// // // //                         className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-full transition"
// // // //                         aria-label="Buka Emoji Picker"
// // // //                     >
// // // //                         <Smile size={24}/>
// // // //                     </button>
                    
// // // //                     <input 
// // // //                         ref={inputRef}
// // // //                         className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
// // // //                         placeholder="Tulis balasan... (Ketik @ untuk mention)"
// // // //                         value={reply}
// // // //                         onChange={handleInputChange}
// // // //                     />
                    
// // // //                     <button 
// // // //                         disabled={!reply.trim() || submitting}
// // // //                         className="bg-red-700 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-red-800 disabled:opacity-50 flex items-center gap-2 shadow-md"
// // // //                     >
// // // //                         <Send size={18}/> {submitting ? '...' : 'Kirim'}
// // // //                     </button>
// // // //                 </form>
// // // //             </div>
// // // //         </div>

// // // //       </div>
// // // //     </Protected>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect, useRef } from 'react';
// // // import { useParams, useRouter } from 'next/navigation';
// // // import { api, getImageUrl } from '@/lib/api';
// // // import Protected from '@/components/Protected';
// // // import { ArrowLeft, Send, Trash2, CheckCircle, XCircle, AlertCircle, Smile } from 'lucide-react';
// // // import { useAuth } from '@/lib/AuthProvider';
// // // import EmojiPicker from 'emoji-picker-react';

// // // export default function ForumDetail() {
// // //   const { id } = useParams();
// // //   const router = useRouter();
// // //   const { user } = useAuth();
  
// // //   const [topic, setTopic] = useState<any>(null);
// // //   const [reply, setReply] = useState('');
// // //   const [loading, setLoading] = useState(true);
// // //   const [submitting, setSubmitting] = useState(false);
  
// // //   const [showEmoji, setShowEmoji] = useState(false);
// // //   const [mentionQuery, setMentionQuery] = useState('');
// // //   const [showMentions, setShowMentions] = useState(false);
// // //   const inputRef = useRef<HTMLInputElement>(null);

// // //   useEffect(() => { loadTopic(); }, [id]);

// // //   const loadTopic = async () => {
// // //     try {
// // //         setLoading(true);
// // //         const data = await api(`/api/forum/${id}?t=${Date.now()}`);
// // //         setTopic(data);
// // //     } catch (e: any) { 
// // //         alert(e.message || "Gagal memuat topik.");
// // //         router.push('/forum');
// // //     } finally { setLoading(false); }
// // //   };

// // //   const getParticipants = () => {
// // //       if (!topic) return [];
// // //       const users = [topic.author];
// // //       topic.replies.forEach((r: any) => users.push(r.user));
// // //       const uniqueUsers = Array.from(new Map(users.filter(u => u).map(u => [u._id, u])).values())
// // //         .filter((u: any) => u._id !== user?.id);
// // //       return !mentionQuery ? uniqueUsers : uniqueUsers.filter((u: any) => u.name.toLowerCase().includes(mentionQuery.toLowerCase()));
// // //   };

// // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //       const val = e.target.value;
// // //       setReply(val);
// // //       const lastWord = val.split(' ').pop();
// // //       if (lastWord && lastWord.startsWith('@')) {
// // //           setMentionQuery(lastWord.substring(1));
// // //           setShowMentions(true);
// // //       } else {
// // //           setShowMentions(false);
// // //       }
// // //   };

// // //   const insertMention = (name: string) => {
// // //       const words = reply.split(' ');
// // //       words.pop(); 
// // //       setReply(words.join(' ') + ` @${name} `);
// // //       setShowMentions(false);
// // //       inputRef.current?.focus();
// // //   };

// // //   const onEmojiClick = (emojiData: any) => {
// // //       setReply(prev => prev + emojiData.emoji);
// // //       setShowEmoji(false);
// // //   };

// // //   const handleReply = async (e: React.FormEvent) => {
// // //       e.preventDefault();
// // //       if (!reply.trim()) return;
// // //       setSubmitting(true);
// // //       try {
// // //           await api(`/api/forum/${id}/reply`, { method: 'POST', body: { content: reply } });
// // //           setReply('');
// // //           setShowEmoji(false);
// // //           loadTopic(); 
// // //       } catch (e: any) { alert(e.message); } 
// // //       finally { setSubmitting(false); }
// // //   };

// // //   const handleStatus = async (newStatus: 'approved' | 'rejected') => {
// // //       if(!confirm(`Ubah status menjadi ${newStatus}?`)) return;
// // //       try {
// // //           await api(`/api/forum/${id}/status`, { method: 'PATCH', body: { status: newStatus } });
// // //           loadTopic(); 
// // //       } catch (e: any) { alert(e.message); }
// // //   };

// // //   const handleDeleteTopic = async () => {
// // //       if(!confirm("Hapus topik ini?")) return;
// // //       try {
// // //           await api(`/api/forum/${id}`, { method: 'DELETE' });
// // //           router.push('/forum');
// // //       } catch (e: any) { alert(e.message); }
// // //   };

// // //   // FUNGSI BARU: Hapus Balasan (Moderasi)
// // //   const handleDeleteReply = async (replyId: string) => {
// // //       if(!confirm("Hapus komentar ini karena melanggar aturan?")) return;
// // //       try {
// // //           await api(`/api/forum/${id}/reply/${replyId}`, { method: 'DELETE' });
// // //           loadTopic();
// // //       } catch (e: any) { alert(e.message); }
// // //   };

// // //   const Avatar = ({ u, size = "w-10 h-10" }: { u: any, size?: string }) => {
// // //       if (!u) return <div className={`${size} bg-gray-200 rounded-full`} />;
// // //       if (u.avatarUrl) return <img src={getImageUrl(u.avatarUrl)} className={`${size} rounded-full object-cover border border-gray-200`} alt={u.name || "Avatar"} />;
// // //       const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
// // //       const initials = u.name?.substring(0, 2).toUpperCase() || "UN";
// // //       return <div className={`${size} rounded-full ${colors[u.name?.length % colors.length]} text-white flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm`}>{initials}</div>;
// // //   };

// // //   if (loading) return <div className="p-20 text-center">Memuat...</div>;
// // //   if (!topic) return null;

// // //   const userRole = user?.role?.toUpperCase() || '';
// // //   const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// // //   const isOwner = user?.id === topic.author?._id;

// // //   return (
// // //     <Protected>
// // //       <div className="max-w-4xl mx-auto p-6 font-sans min-h-screen pb-40">
// // //         <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-bold mb-6 text-sm">
// // //             <ArrowLeft size={16}/> Kembali
// // //         </button>

// // //         {topic.status === 'pending' && (
// // //             <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-6 flex justify-between items-center">
// // //                 <div className="flex items-center gap-3"><AlertCircle size={24} /><div><h3 className="font-bold">Menunggu Moderasi</h3><p className="text-sm">Hanya Admin yang dapat melihat ini.</p></div></div>
// // //                 {isAdmin && <div className="flex gap-2">
// // //                     <button onClick={() => handleStatus('approved')} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 flex gap-1"><CheckCircle size={14}/> Setujui</button>
// // //                     <button onClick={() => handleStatus('rejected')} className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 flex gap-1"><XCircle size={14}/> Tolak</button>
// // //                 </div>}
// // //             </div>
// // //         )}

// // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
// // //             <div className="flex justify-between items-start mb-6">
// // //                 <div className="flex items-center gap-4">
// // //                     <Avatar u={topic.author} size="w-12 h-12" />
// // //                     <div>
// // //                         <h1 className="text-2xl font-bold text-gray-800 leading-tight">{topic.title}</h1>
// // //                         <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
// // //                             <span className="font-bold text-red-700">{topic.author?.name || 'Anonim'}</span>
// // //                             <span>•</span>
// // //                             {/* FIX: Menggunakan toLocaleString untuk mendukung timeStyle */}
// // //                             <span>{new Date(topic.createdAt).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</span>
// // //                             <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase font-bold text-[10px]">{topic.category}</span>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //                 {(isAdmin || isOwner) && (
// // //                     <button onClick={handleDeleteTopic} className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition" aria-label="Hapus Topik"><Trash2 size={18}/></button>
// // //                 )}
// // //             </div>
// // //             <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">{topic.content}</div>
// // //         </div>

// // //         <div className="space-y-6 mb-24">
// // //             <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">Komentar <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{topic.replies?.length || 0}</span></h3>
// // //             {topic.replies?.map((r: any, i: number) => (
// // //                 <div key={r._id || i} className="bg-white p-6 rounded-xl border border-gray-100 flex gap-4 group">
// // //                     <div className="flex-shrink-0"><Avatar u={r.user} size="w-10 h-10" /></div>
// // //                     <div className="flex-1">
// // //                         <div className="flex items-center justify-between mb-1">
// // //                             <div className="flex items-center gap-2">
// // //                                 <span className="font-bold text-sm text-gray-900">{r.user?.name || 'User'}</span>
// // //                                 <span className="text-xs text-gray-400">• {new Date(r.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
// // //                                 {isAdmin && <span className="bg-red-100 text-red-700 text-[10px] px-1.5 rounded font-bold">STAFF</span>}
// // //                             </div>
// // //                             {/* TOMBOL HAPUS KOMENTAR UNTUK ADMIN */}
// // //                             {isAdmin && (
// // //                                 <button 
// // //                                     onClick={() => handleDeleteReply(r._id)}
// // //                                     className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 p-1 transition-all"
// // //                                     title="Hapus Komentar"
// // //                                     aria-label="Hapus Komentar"
// // //                                 >
// // //                                     <Trash2 size={14} />
// // //                                 </button>
// // //                             )}
// // //                         </div>
// // //                         <p className="text-gray-700 text-sm whitespace-pre-wrap">
// // //                             {r.content.split(' ').map((word: string, idx: number) => word.startsWith('@') ? <span key={idx} className="text-blue-600 font-bold">{word} </span> : word + ' ')}
// // //                         </p>
// // //                     </div>
// // //                 </div>
// // //             ))}
// // //         </div>

// // //         <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg z-20">
// // //             <div className="max-w-4xl mx-auto relative">
// // //                 {showMentions && (
// // //                     <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-30">
// // //                         <div className="bg-gray-50 px-3 py-2 text-xs font-bold text-gray-500 border-b">Mention</div>
// // //                         {getParticipants().map((u: any) => (
// // //                             <button key={u._id} onClick={() => insertMention(u.name)} className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-sm">
// // //                                 <Avatar u={u} size="w-6 h-6" /><span className="truncate font-medium">{u.name}</span>
// // //                             </button>
// // //                         ))}
// // //                     </div>
// // //                 )}
// // //                 {showEmoji && <div className="absolute bottom-full right-0 mb-2 z-30 shadow-2xl rounded-xl"><EmojiPicker onEmojiClick={onEmojiClick} width={300} height={400} /></div>}
// // //                 <form onSubmit={handleReply} className="flex gap-3 items-center">
// // //                     <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-2 text-gray-400 hover:text-yellow-500 rounded-full" aria-label="Emoji"><Smile size={24}/></button>
// // //                     <input ref={inputRef} className="flex-1 bg-gray-50 border rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500" placeholder="Balas... (@mention)" value={reply} onChange={handleInputChange} />
// // //                     <button disabled={!reply.trim() || submitting} className="bg-red-700 text-white px-6 py-2 rounded-full font-bold hover:bg-red-800 disabled:opacity-50 flex items-center gap-2"><Send size={18}/> {submitting ? '...' : 'Kirim'}</button>
// // //                 </form>
// // //             </div>
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
  
// //   const [showEmoji, setShowEmoji] = useState(false);
// //   const [mentionQuery, setMentionQuery] = useState('');
// //   const [showMentions, setShowMentions] = useState(false);
// //   const inputRef = useRef<HTMLInputElement>(null);

// //   useEffect(() => {
// //     loadTopic();
// //     markNotificationsAsRead(); // <--- FUNGSI BARU DIPANGGIL DISINI
// //   }, [id]);

// //   const loadTopic = async () => {
// //     try {
// //         setLoading(true);
// //         const data = await api(`/api/forum/${id}?t=${Date.now()}`);
// //         setTopic(data);
// //     } catch (e: any) { 
// //         alert(e.message || "Gagal memuat topik.");
// //         router.push('/forum');
// //     } finally { setLoading(false); }
// //   };

// //   // --- FUNGSI BARU: Tandai Notifikasi Dibaca ---
// //   const markNotificationsAsRead = async () => {
// //       if (!id) return;
// //       try {
// //           // Panggil endpoint backend yang baru kita buat
// //           await api(`/api/notifications/mark-read/topic/${id}`, { method: 'PATCH' });
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

// //   const onEmojiClick = (emojiData: any) => {
// //       setReply(prev => prev + emojiData.emoji);
// //       setShowEmoji(false);
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

// //   // FUNGSI BARU: Hapus Balasan (Moderasi)
// //   const handleDeleteReply = async (replyId: string) => {
// //       if(!confirm("Hapus komentar ini karena melanggar aturan?")) return;
// //       try {
// //           await api(`/api/forum/${id}/reply/${replyId}`, { method: 'DELETE' });
// //           loadTopic();
// //       } catch (e: any) { alert(e.message); }
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
// //                             <span>{new Date(topic.createdAt).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</span>
// //                             <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase font-bold text-[10px]">{topic.category}</span>
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
// //                                 {isAdmin && <span className="bg-red-100 text-red-700 text-[10px] px-1.5 rounded font-bold">STAFF</span>}
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

// //         <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg z-20">
// //             <div className="max-w-4xl mx-auto relative">
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
// //                 {showEmoji && <div className="absolute bottom-full right-0 mb-2 z-30 shadow-2xl rounded-xl"><EmojiPicker onEmojiClick={onEmojiClick} width={300} height={400} /></div>}
// //                 <form onSubmit={handleReply} className="flex gap-3 items-center">
// //                     <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-2 text-gray-400 hover:text-yellow-500 rounded-full" aria-label="Emoji"><Smile size={24}/></button>
// //                     <input ref={inputRef} className="flex-1 bg-gray-50 border rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500" placeholder="Balas... (@mention)" value={reply} onChange={handleInputChange} />
// //                     <button disabled={!reply.trim() || submitting} className="bg-red-700 text-white px-6 py-2 rounded-full font-bold hover:bg-red-800 disabled:opacity-50 flex items-center gap-2"><Send size={18}/> {submitting ? '...' : 'Kirim'}</button>
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
// import { ArrowLeft, Send, Trash2, CheckCircle, XCircle, AlertCircle, Smile } from 'lucide-react';
// import { useAuth } from '@/lib/AuthProvider';
// import EmojiPicker from 'emoji-picker-react';

// export default function ForumDetail() {
//   const { id } = useParams();
//   const router = useRouter();
//   const { user } = useAuth();
  
//   const [topic, setTopic] = useState<any>(null);
//   const [reply, setReply] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
  
//   const [showEmoji, setShowEmoji] = useState(false);
//   const [mentionQuery, setMentionQuery] = useState('');
//   const [showMentions, setShowMentions] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if(id) {
//         loadTopic();
//         markNotificationsAsRead();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const loadTopic = async () => {
//     try {
//         setLoading(true);
//         const data = await api(`/api/forum/${id}?t=${Date.now()}`);
//         setTopic(data);
//     } catch (e: any) { 
//         alert(e.message || "Gagal memuat topik.");
//         router.push('/forum');
//     } finally { setLoading(false); }
//   };

//   // --- FUNGSI PENTING: TANDAI DIBACA ---
//   const markNotificationsAsRead = async () => {
//       try {
//           await api(`/api/notifications/mark-read/topic/${id}`, { method: 'PATCH' });
//           // TRIGGER EVENT AGAR BADGE DAN HALAMAN DEPAN UPDATE INSTAN
//           window.dispatchEvent(new Event('notification-updated')); 
//       } catch (e) {
//           console.error("Gagal update status notifikasi", e);
//       }
//   };

//   const getParticipants = () => {
//       if (!topic) return [];
//       const users = [topic.author];
//       topic.replies.forEach((r: any) => users.push(r.user));
//       const uniqueUsers = Array.from(new Map(users.filter(u => u).map(u => [u._id, u])).values())
//         .filter((u: any) => u._id !== user?.id);
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
//       words.pop(); 
//       setReply(words.join(' ') + ` @${name} `);
//       setShowMentions(false);
//       inputRef.current?.focus();
//   };

//   const onEmojiClick = (emojiData: any) => {
//       setReply(prev => prev + emojiData.emoji);
//       setShowEmoji(false);
//   };

//   const handleReply = async (e: React.FormEvent) => {
//       e.preventDefault();
//       if (!reply.trim()) return;
//       setSubmitting(true);
//       try {
//           await api(`/api/forum/${id}/reply`, { method: 'POST', body: { content: reply } });
//           setReply('');
//           setShowEmoji(false);
//           loadTopic(); 
//       } catch (e: any) { alert(e.message); } 
//       finally { setSubmitting(false); }
//   };

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
//       if(!confirm("Hapus komentar ini karena melanggar aturan?")) return;
//       try {
//           await api(`/api/forum/${id}/reply/${replyId}`, { method: 'DELETE' });
//           loadTopic();
//       } catch (e: any) { alert(e.message); }
//   };

//   const Avatar = ({ u, size = "w-10 h-10" }: { u: any, size?: string }) => {
//       if (!u) return <div className={`${size} bg-gray-200 rounded-full`} />;
//       if (u.avatarUrl) return <img src={getImageUrl(u.avatarUrl)} className={`${size} rounded-full object-cover border border-gray-200`} alt={u.name || "Avatar"} />;
//       const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
//       const initials = u.name?.substring(0, 2).toUpperCase() || "UN";
//       return <div className={`${size} rounded-full ${colors[u.name?.length % colors.length]} text-white flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm`}>{initials}</div>;
//   };

//   if (loading) return <div className="p-20 text-center">Memuat...</div>;
//   if (!topic) return null;

//   const userRole = user?.role?.toUpperCase() || '';
//   const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
//   const isOwner = user?.id === topic.author?._id;

//   return (
//     <Protected>
//       <div className="max-w-4xl mx-auto p-6 font-sans min-h-screen pb-40">
//         <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-bold mb-6 text-sm">
//             <ArrowLeft size={16}/> Kembali
//         </button>

//         {topic.status === 'pending' && (
//             <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-6 flex justify-between items-center">
//                 <div className="flex items-center gap-3"><AlertCircle size={24} /><div><h3 className="font-bold">Menunggu Moderasi</h3><p className="text-sm">Hanya Admin yang dapat melihat ini.</p></div></div>
//                 {isAdmin && <div className="flex gap-2">
//                     <button onClick={() => handleStatus('approved')} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 flex gap-1"><CheckCircle size={14}/> Setujui</button>
//                     <button onClick={() => handleStatus('rejected')} className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 flex gap-1"><XCircle size={14}/> Tolak</button>
//                 </div>}
//             </div>
//         )}

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
//             <div className="flex justify-between items-start mb-6">
//                 <div className="flex items-center gap-4">
//                     <Avatar u={topic.author} size="w-12 h-12" />
//                     <div>
//                         <h1 className="text-2xl font-bold text-gray-800 leading-tight">{topic.title}</h1>
//                         <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
//                             <span className="font-bold text-red-700">{topic.author?.name || 'Anonim'}</span>
//                             <span>•</span>
//                             <span>{new Date(topic.createdAt).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</span>
//                             <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase font-bold text-[10px]">{topic.category}</span>
//                         </div>
//                     </div>
//                 </div>
//                 {(isAdmin || isOwner) && (
//                     <button onClick={handleDeleteTopic} className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition" aria-label="Hapus Topik"><Trash2 size={18}/></button>
//                 )}
//             </div>
//             <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">{topic.content}</div>
//         </div>

//         <div className="space-y-6 mb-24">
//             <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">Komentar <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{topic.replies?.length || 0}</span></h3>
//             {topic.replies?.map((r: any, i: number) => (
//                 <div key={r._id || i} className="bg-white p-6 rounded-xl border border-gray-100 flex gap-4 group">
//                     <div className="flex-shrink-0"><Avatar u={r.user} size="w-10 h-10" /></div>
//                     <div className="flex-1">
//                         <div className="flex items-center justify-between mb-1">
//                             <div className="flex items-center gap-2">
//                                 <span className="font-bold text-sm text-gray-900">{r.user?.name || 'User'}</span>
//                                 <span className="text-xs text-gray-400">• {new Date(r.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
//                                 {isAdmin && <span className="bg-red-100 text-red-700 text-[10px] px-1.5 rounded font-bold">STAFF</span>}
//                             </div>
//                             {isAdmin && (
//                                 <button 
//                                     onClick={() => handleDeleteReply(r._id)}
//                                     className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 p-1 transition-all"
//                                     title="Hapus Komentar"
//                                     aria-label="Hapus Komentar"
//                                 >
//                                     <Trash2 size={14} />
//                                 </button>
//                             )}
//                         </div>
//                         <p className="text-gray-700 text-sm whitespace-pre-wrap">
//                             {r.content.split(' ').map((word: string, idx: number) => word.startsWith('@') ? <span key={idx} className="text-blue-600 font-bold">{word} </span> : word + ' ')}
//                         </p>
//                     </div>
//                 </div>
//             ))}
//         </div>

//         <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg z-20">
//             <div className="max-w-4xl mx-auto relative">
//                 {showMentions && (
//                     <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-30">
//                         <div className="bg-gray-50 px-3 py-2 text-xs font-bold text-gray-500 border-b">Mention</div>
//                         {getParticipants().map((u: any) => (
//                             <button key={u._id} onClick={() => insertMention(u.name)} className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-sm">
//                                 <Avatar u={u} size="w-6 h-6" /><span className="truncate font-medium">{u.name}</span>
//                             </button>
//                         ))}
//                     </div>
//                 )}
//                 {showEmoji && <div className="absolute bottom-full right-0 mb-2 z-30 shadow-2xl rounded-xl"><EmojiPicker onEmojiClick={onEmojiClick} width={300} height={400} /></div>}
//                 <form onSubmit={handleReply} className="flex gap-3 items-center">
//                     <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-2 text-gray-400 hover:text-yellow-500 rounded-full" aria-label="Emoji"><Smile size={24}/></button>
//                     <input ref={inputRef} className="flex-1 bg-gray-50 border rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500" placeholder="Balas... (@mention)" value={reply} onChange={handleInputChange} />
//                     <button disabled={!reply.trim() || submitting} className="bg-red-700 text-white px-6 py-2 rounded-full font-bold hover:bg-red-800 disabled:opacity-50 flex items-center gap-2"><Send size={18}/> {submitting ? '...' : 'Kirim'}</button>
//                 </form>
//             </div>
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
import { ArrowLeft, Send, Trash2, CheckCircle, XCircle, AlertCircle, Smile } from 'lucide-react';
import { useAuth } from '@/lib/AuthProvider';
import EmojiPicker from 'emoji-picker-react';

export default function ForumDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [topic, setTopic] = useState<any>(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // State untuk Emoji & Mention
  const [showEmoji, setShowEmoji] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(id) {
        loadTopic();
        markNotificationsAsRead();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadTopic = async () => {
    try {
        setLoading(true);
        // Tambahkan timestamp agar tidak cache
        const data = await api(`/api/forum/${id}?t=${Date.now()}`);
        setTopic(data);
    } catch (e: any) { 
        alert(e.message || "Gagal memuat topik.");
        router.push('/forum');
    } finally { setLoading(false); }
  };

  const markNotificationsAsRead = async () => {
      try {
          await api(`/api/notifications/mark-read/topic/${id}`, { method: 'PATCH' });
          window.dispatchEvent(new Event('notification-updated')); 
      } catch (e) {
          console.error("Gagal update status notifikasi", e);
      }
  };

  const getParticipants = () => {
      if (!topic) return [];
      const users = [topic.author];
      topic.replies.forEach((r: any) => users.push(r.user));
      const uniqueUsers = Array.from(new Map(users.filter(u => u).map(u => [u._id, u])).values())
        .filter((u: any) => u._id !== user?.id);
      return !mentionQuery ? uniqueUsers : uniqueUsers.filter((u: any) => u.name.toLowerCase().includes(mentionQuery.toLowerCase()));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setReply(val);
      const lastWord = val.split(' ').pop();
      if (lastWord && lastWord.startsWith('@')) {
          setMentionQuery(lastWord.substring(1));
          setShowMentions(true);
      } else {
          setShowMentions(false);
      }
  };

  const insertMention = (name: string) => {
      const words = reply.split(' ');
      words.pop(); 
      setReply(words.join(' ') + ` @${name} `);
      setShowMentions(false);
      inputRef.current?.focus();
  };

  // --- LOGIKA EMOJI ---
  const onEmojiClick = (emojiData: any) => {
      setReply(prev => prev + emojiData.emoji);
      // Jangan tutup emoji picker agar bisa pilih banyak, atau tutup jika mau (opsional)
      // setShowEmoji(false); 
  };

  const handleReply = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!reply.trim()) return;
      setSubmitting(true);
      try {
          await api(`/api/forum/${id}/reply`, { method: 'POST', body: { content: reply } });
          setReply('');
          setShowEmoji(false);
          loadTopic(); 
      } catch (e: any) { alert(e.message); } 
      finally { setSubmitting(false); }
  };

  const handleStatus = async (newStatus: 'approved' | 'rejected') => {
      if(!confirm(`Ubah status menjadi ${newStatus}?`)) return;
      try {
          await api(`/api/forum/${id}/status`, { method: 'PATCH', body: { status: newStatus } });
          loadTopic(); 
      } catch (e: any) { alert(e.message); }
  };

  const handleDeleteTopic = async () => {
      if(!confirm("Hapus topik ini?")) return;
      try {
          await api(`/api/forum/${id}`, { method: 'DELETE' });
          router.push('/forum');
      } catch (e: any) { alert(e.message); }
  };

  const handleDeleteReply = async (replyId: string) => {
      if(!confirm("Hapus komentar ini karena melanggar aturan?")) return;
      try {
          await api(`/api/forum/${id}/reply/${replyId}`, { method: 'DELETE' });
          loadTopic();
      } catch (e: any) { alert(e.message); }
  };

  // --- HELPER UNTUK BADGE ROLE ---
  const renderRoleBadge = (role: string) => {
      const r = role ? role.toUpperCase() : 'USER';
      if (r === 'SUPER_ADMIN') {
          return <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.5 rounded font-bold border border-red-200">SUPER ADMIN</span>;
      } else if (r === 'FACILITATOR') {
          return <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-bold border border-blue-200">FASILITATOR</span>;
      } else {
          return <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-bold border border-green-200">PESERTA</span>;
      }
  };

  const Avatar = ({ u, size = "w-10 h-10" }: { u: any, size?: string }) => {
      if (!u) return <div className={`${size} bg-gray-200 rounded-full`} />;
      if (u.avatarUrl) return <img src={getImageUrl(u.avatarUrl)} className={`${size} rounded-full object-cover border border-gray-200`} alt={u.name || "Avatar"} />;
      const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
      const initials = u.name?.substring(0, 2).toUpperCase() || "UN";
      return <div className={`${size} rounded-full ${colors[u.name?.length % colors.length]} text-white flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm`}>{initials}</div>;
  };

  if (loading) return <div className="p-20 text-center">Memuat...</div>;
  if (!topic) return null;

  const userRole = user?.role?.toUpperCase() || '';
  const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
  const isOwner = user?.id === topic.author?._id;

  return (
    <Protected>
      <div className="max-w-4xl mx-auto p-6 font-sans min-h-screen pb-40">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-bold mb-6 text-sm">
            <ArrowLeft size={16}/> Kembali
        </button>

        {topic.status === 'pending' && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-6 flex justify-between items-center">
                <div className="flex items-center gap-3"><AlertCircle size={24} /><div><h3 className="font-bold">Menunggu Moderasi</h3><p className="text-sm">Hanya Admin yang dapat melihat ini.</p></div></div>
                {isAdmin && <div className="flex gap-2">
                    <button onClick={() => handleStatus('approved')} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 flex gap-1"><CheckCircle size={14}/> Setujui</button>
                    <button onClick={() => handleStatus('rejected')} className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 flex gap-1"><XCircle size={14}/> Tolak</button>
                </div>}
            </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <Avatar u={topic.author} size="w-12 h-12" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 leading-tight">{topic.title}</h1>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <span className="font-bold text-red-700">{topic.author?.name || 'Anonim'}</span>
                            <span>•</span>
                            {/* Format Tanggal Indonesia */}
                            <span>{new Date(topic.createdAt).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</span>
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase font-bold text-[10px]">{topic.category}</span>
                            {/* Badge Role Penulis Topik */}
                            {topic.author && renderRoleBadge(topic.author.role)}
                        </div>
                    </div>
                </div>
                {(isAdmin || isOwner) && (
                    <button onClick={handleDeleteTopic} className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition" aria-label="Hapus Topik"><Trash2 size={18}/></button>
                )}
            </div>
            <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">{topic.content}</div>
        </div>

        <div className="space-y-6 mb-24">
            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">Komentar <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{topic.replies?.length || 0}</span></h3>
            {topic.replies?.map((r: any, i: number) => (
                <div key={r._id || i} className="bg-white p-6 rounded-xl border border-gray-100 flex gap-4 group">
                    <div className="flex-shrink-0"><Avatar u={r.user} size="w-10 h-10" /></div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-gray-900">{r.user?.name || 'User'}</span>
                                <span className="text-xs text-gray-400">• {new Date(r.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                                
                                {/* --- BAGIAN INI YANG DIUPDATE: BADGE ROLE DINAMIS --- */}
                                {r.user && renderRoleBadge(r.user.role)}
                                {/* --------------------------------------------------- */}

                            </div>
                            {/* TOMBOL HAPUS KOMENTAR UNTUK ADMIN */}
                            {isAdmin && (
                                <button 
                                    onClick={() => handleDeleteReply(r._id)}
                                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 p-1 transition-all"
                                    title="Hapus Komentar"
                                    aria-label="Hapus Komentar"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                        <p className="text-gray-700 text-sm whitespace-pre-wrap">
                            {r.content.split(' ').map((word: string, idx: number) => word.startsWith('@') ? <span key={idx} className="text-blue-600 font-bold">{word} </span> : word + ' ')}
                        </p>
                    </div>
                </div>
            ))}
        </div>

        {/* INPUT BAR */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg z-20">
            <div className="max-w-4xl mx-auto relative">
                
                {/* POPUP MENTIONS */}
                {showMentions && (
                    <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-30">
                        <div className="bg-gray-50 px-3 py-2 text-xs font-bold text-gray-500 border-b">Mention</div>
                        {getParticipants().map((u: any) => (
                            <button key={u._id} onClick={() => insertMention(u.name)} className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-sm">
                                <Avatar u={u} size="w-6 h-6" /><span className="truncate font-medium">{u.name}</span>
                            </button>
                        ))}
                    </div>
                )}
                
                {/* POPUP EMOJI */}
                {showEmoji && (
                    <div className="absolute bottom-full right-0 mb-2 z-30 shadow-2xl rounded-xl">
                        <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={400} />
                    </div>
                )}
                
                <form onSubmit={handleReply} className="flex gap-3 items-center">
                    {/* TOMBOL BUKA EMOJI */}
                    <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-2 text-gray-400 hover:text-yellow-500 rounded-full transition-colors" aria-label="Emoji">
                        <Smile size={24}/>
                    </button>
                    
                    <input ref={inputRef} className="flex-1 bg-gray-50 border rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500" placeholder="Balas... (@mention)" value={reply} onChange={handleInputChange} />
                    <button disabled={!reply.trim() || submitting} className="bg-red-700 text-white px-6 py-2 rounded-full font-bold hover:bg-red-800 disabled:opacity-50 flex items-center gap-2">
                        <Send size={18}/> {submitting ? '...' : 'Kirim'}
                    </button>
                </form>
            </div>
        </div>
      </div>
    </Protected>
  );
}
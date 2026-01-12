
// // // 'use client';

// // // import { useState, useEffect, useRef } from 'react';
// // // import { useParams, useRouter } from 'next/navigation';
// // // import Link from 'next/link';
// // // import { api, getImageUrl } from '@/lib/api';
// // // import { useAuth } from '@/lib/AuthProvider';
// // // import QuizPlayer from '@/components/QuizPlayer';
// // // import { Calendar, PlayCircle, CheckCircle, FileText, MessageCircle, X, Menu, Send } from 'lucide-react';

// // // // --- 1. KOMPONEN TOAST NOTIFIKASI CHAT ---
// // // function ChatToast({ data, onOpen, onClose }: any) {
// // //   useEffect(() => {
// // //     const timer = setTimeout(onClose, 10000);
// // //     return () => clearTimeout(timer);
// // //   }, [onClose]);

// // //   return (
// // //     <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
// // //       <div 
// // //         className="bg-white rounded-xl shadow-2xl border-l-4 border-l-green-500 border-y border-r border-gray-100 p-4 w-80 flex items-start gap-3 relative cursor-pointer hover:bg-gray-50 transition-colors"
// // //         onClick={onOpen}
// // //       >
// // //         <button 
// // //             onClick={(e) => { e.stopPropagation(); onClose(); }} 
// // //             className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 bg-white rounded-full"
// // //             aria-label="Tutup notifikasi"
// // //         >
// // //             <X size={14} />
// // //         </button>

// // //         <div className="relative flex-shrink-0">
// // //             <img 
// // //                 src={getImageUrl(data.senderAvatar)} 
// // //                 alt={data.senderName} 
// // //                 className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
// // //             />
// // //             <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
// // //         </div>

// // //         <div className="flex-1 min-w-0">
// // //             <div className="flex justify-between items-center mb-0.5">
// // //                 <h4 className="font-bold text-sm text-gray-800 truncate pr-4">{data.senderName}</h4>
// // //                 <span className="text-[10px] text-gray-400">Baru saja</span>
// // //             </div>
// // //             <p className="text-xs text-green-600 font-bold mb-0.5">Pesan Baru!</p>
// // //             <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed italic">
// // //                 "{data.message}"
// // //             </p>
// // //             <div className="mt-2 text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
// // //                 Balas Sekarang <span>→</span>
// // //             </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // --- 2. KOMPONEN MODAL CHAT ---
// // // function ChatWithFacilitatorModal({ facilitators, initialSelectedId, unreadSenderId, onClose }: any) {
// // //   const [selectedFacilitator, setSelectedFacilitator] = useState<any>(
// // //     initialSelectedId 
// // //         ? facilitators.find((f: any) => f._id === initialSelectedId)
// // //         : (unreadSenderId 
// // //             ? facilitators.find((f: any) => f._id === unreadSenderId) 
// // //             : (facilitators.length === 1 ? facilitators[0] : null))
// // //   );

// // //   const [messages, setMessages] = useState<any[]>([]);
// // //   const [message, setMessage] = useState('');
// // //   const [sending, setSending] = useState(false);
// // //   const messagesEndRef = useRef<HTMLDivElement>(null);

// // //   useEffect(() => {
// // //       if (selectedFacilitator?._id) {
// // //           loadHistory();
// // //           const interval = setInterval(loadHistory, 3000); 
// // //           return () => clearInterval(interval);
// // //       }
// // //   }, [selectedFacilitator]);

// // //   useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// // //   const loadHistory = async () => {
// // //       try {
// // //           const res = await api(`/api/chat/${selectedFacilitator._id}`); 
// // //           setMessages(res.messages || []);
// // //       } catch (e) { console.error(e); }
// // //   };

// // //   const handleSend = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!message.trim() || !selectedFacilitator) return;
    
// // //     const tempMsg = { _id: Date.now(), sender: 'me', message: message, createdAt: new Date().toISOString() };
// // //     setMessages(prev => [...prev, tempMsg]);
// // //     setMessage('');
// // //     setSending(true);

// // //     try {
// // //       await api('/api/chat/send', {
// // //         method: 'POST',
// // //         body: { recipientId: selectedFacilitator._id, message: tempMsg.message }
// // //       });
// // //       loadHistory(); 
// // //     } catch (error: any) {
// // //       alert("Gagal kirim pesan: " + error.message);
// // //     } finally {
// // //       setSending(false);
// // //     }
// // //   };

// // //   const isMe = (msg: any) => {
// // //       if (msg.sender === 'me') return true;
// // //       const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
// // //       return senderId !== selectedFacilitator._id; 
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in duration-200 backdrop-blur-sm">
// // //       <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]">
// // //         {/* Header Modal */}
// // //         <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
// // //           <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18}/> Hubungi Pengajar</h3>
// // //           <button onClick={onClose} className="hover:bg-indigo-700 p-1.5 rounded-full transition-colors" aria-label="Tutup Chat">
// // //             <X size={20} />
// // //           </button>
// // //         </div>
        
// // //         {!selectedFacilitator ? (
// // //             <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
// // //                 <div className="p-4 bg-white border-b shadow-sm z-10">
// // //                     <p className="text-sm text-gray-700 font-bold">Pilih Fasilitator untuk diskusi:</p>
// // //                     <p className="text-xs text-gray-500">Klik nama pengajar untuk memulai chat.</p>
// // //                 </div>
// // //                 <div className="p-4 overflow-y-auto custom-scrollbar space-y-2 flex-1">
// // //                     {facilitators.map((fac: any) => {
// // //                         const isUnreadSender = fac._id === unreadSenderId;
// // //                         return (
// // //                             <button 
// // //                                 key={fac._id} 
// // //                                 onClick={() => setSelectedFacilitator(fac)} 
// // //                                 className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left group relative
// // //                                     ${isUnreadSender ? 'bg-green-50 border-green-500 ring-1 ring-green-500 shadow-md' : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm'}
// // //                                 `}
// // //                             >
// // //                                 <div className="relative">
// // //                                     <img src={getImageUrl(fac.avatarUrl)} className={`w-12 h-12 rounded-full object-cover border-2 ${isUnreadSender ? 'border-green-500' : 'border-gray-200 group-hover:border-indigo-300'}`} alt={fac.name} />
// // //                                     {isUnreadSender && (
// // //                                         <span className="absolute -top-1 -right-1 flex h-4 w-4">
// // //                                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
// // //                                             <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
// // //                                         </span>
// // //                                     )}
// // //                                 </div>
// // //                                 <div className="flex-1 min-w-0">
// // //                                     <div className="flex justify-between items-center">
// // //                                         <p className={`font-bold text-sm truncate ${isUnreadSender ? 'text-green-800' : 'text-gray-800 group-hover:text-indigo-600'}`}>{fac.name}</p>
// // //                                         {isUnreadSender && <span className="text-[9px] font-bold text-white bg-green-600 px-2 py-0.5 rounded-full shadow-sm">Pesan Baru</span>}
// // //                                     </div>
// // //                                     <p className="text-xs text-gray-500">{fac.role || 'Fasilitator'}</p>
// // //                                 </div>
// // //                             </button>
// // //                         );
// // //                     })}
// // //                 </div>
// // //             </div>
// // //         ) : (
// // //             <>
// // //                 <div className="p-3 bg-white border-b flex items-center gap-3 shadow-sm z-10">
// // //                     <button onClick={() => setSelectedFacilitator(null)} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 text-xs font-bold flex items-center gap-1">
// // //                         ← Kembali
// // //                     </button>
// // //                     <div className="flex items-center gap-2 border-l pl-3">
// // //                         <img src={getImageUrl(selectedFacilitator.avatarUrl)} className="w-9 h-9 rounded-full bg-gray-200 object-cover border border-gray-200" alt={selectedFacilitator.name} />
// // //                         <div>
// // //                             <p className="text-sm font-bold text-gray-800 leading-tight">{selectedFacilitator.name}</p>
// // //                             <span className="text-[10px] text-green-600 bg-green-50 px-1.5 rounded-full border border-green-100">Online</span>
// // //                         </div>
// // //                     </div>
// // //                 </div>
                
// // //                 <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// // //                     {messages.length === 0 ? (
// // //                         <div className="text-center text-gray-400 text-xs mt-10">Belum ada pesan.<br/>Mulai diskusi dengan pengajar!</div>
// // //                     ) : (
// // //                         messages.map((msg: any, idx: number) => {
// // //                             const me = isMe(msg);
// // //                             return (
// // //                                 <div key={idx} className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
// // //                                     <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm relative ${me ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>
// // //                                         <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
// // //                                         <span className={`text-[9px] block text-right mt-1 ${me ? 'text-indigo-200' : 'text-gray-400'}`}>
// // //                                             {new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
// // //                                         </span>
// // //                                     </div>
// // //                                 </div>
// // //                             );
// // //                         })
// // //                     )}
// // //                     <div ref={messagesEndRef} />
// // //                 </div>

// // //                 <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
// // //                     <input 
// // //                         className="flex-1 border rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 transition-all"
// // //                         placeholder="Tulis pesan..."
// // //                         value={message}
// // //                         onChange={e => setMessage(e.target.value)}
// // //                         autoFocus
// // //                     />
// // //                     <button 
// // //                         disabled={sending} 
// // //                         type="submit" 
// // //                         className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-transform active:scale-95 shadow-md"
// // //                         aria-label="Kirim Pesan"
// // //                     >
// // //                         <Send size={16}/>
// // //                     </button>
// // //                 </form>
// // //             </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // --- 3. MAIN PAGE ---
// // // export default function StudentCoursePlayPage() {
// // //   const router = useRouter();
// // //   const params = useParams();
// // //   const { user } = useAuth();
// // //   const { courseId } = params as { courseId: string };

// // //   const [course, setCourse] = useState<any>(null);
// // //   const [activeLesson, setActiveLesson] = useState<any>(null);
// // //   const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // //   const [progressPercent, setProgressPercent] = useState(0);
// // //   const [loading, setLoading] = useState(true);
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
// // //   // STATE CHAT
// // //   const [showChat, setShowChat] = useState(false);
// // //   const [chatableFacilitators, setChatableFacilitators] = useState<any[]>([]);
// // //   const [unreadSenderId, setUnreadSenderId] = useState<string | null>(null);
// // //   const [toastData, setToastData] = useState<any>(null);
// // //   const lastMsgIdRef = useRef<string | null>(null);

// // //   useEffect(() => {
// // //     const loadData = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const [resCourse, resProgress] = await Promise.all([
// // //             api(`/api/courses/${courseId}`),
// // //             api(`/api/progress/${courseId}`).catch(() => ({ completedLessons: [] }))
// // //         ]);

// // //         const courseData = resCourse.course || resCourse;
// // //         setCourse(courseData);
// // //         setCompletedLessonIds(resProgress.completedLessons || []);

// // //         if (courseData.facilitatorIds && Array.isArray(courseData.facilitatorIds)) {
// // //             const validFacs = courseData.facilitatorIds.filter((f: any) => f && f.name && f._id !== user?.id);
// // //             setChatableFacilitators(validFacs);
// // //         }

// // //         if (courseData.modules?.[0]?.lessons?.[0]) {
// // //             setActiveLesson(courseData.modules[0].lessons[0]);
// // //         }
// // //       } catch (e: any) { console.error(e); } finally { setLoading(false); }
// // //     };
// // //     if (courseId && user) loadData();
// // //   }, [courseId, user]);

// // //   // POLLING CHAT
// // //   useEffect(() => {
// // //       if (!user) return;
// // //       const checkNewMessages = async () => {
// // //           try {
// // //               const res = await api('/api/chat/conversations');
// // //               if (res.conversations && res.conversations.length > 0) {
// // //                   const latestConv = res.conversations[0];
// // //                   const latestMsg = latestConv.lastMessage;
// // //                   if (!latestMsg) return;
// // //                   const senderId = typeof latestMsg.sender === 'object' ? latestMsg.sender._id : latestMsg.sender;
// // //                   if (senderId !== user.id) {
// // //                       setUnreadSenderId(senderId); 
// // //                       if (latestMsg._id !== lastMsgIdRef.current) {
// // //                           lastMsgIdRef.current = latestMsg._id;
// // //                           if (!showChat) {
// // //                               setToastData({
// // //                                   senderId,
// // //                                   senderName: latestConv.user?.name || 'Pengajar',
// // //                                   senderAvatar: latestConv.user?.avatarUrl,
// // //                                   message: latestMsg.message
// // //                               });
// // //                           }
// // //                       }
// // //                   }
// // //               }
// // //           } catch (e) { /* Silent */ }
// // //       };
      
// // //       checkNewMessages(); 
// // //       const interval = setInterval(checkNewMessages, 5000);
// // //       return () => clearInterval(interval);
// // //   }, [user, showChat]);

// // //   // LOGIKA PROGRESS
// // //   useEffect(() => {
// // //     if (course) {
// // //         let total = 0; let completed = 0;
// // //         course.modules.forEach((m: any) => {
// // //             if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) { total++; if (completedLessonIds.includes(l._id)) completed++; } });
// // //         });
// // //         setProgressPercent(total === 0 ? 0 : Math.round((completed / total) * 100));
// // //     }
// // //   }, [completedLessonIds, course]);

// // //   const markLessonAsComplete = async (lessonId: string) => {
// // //     if (!completedLessonIds.includes(lessonId)) {
// // //         try {
// // //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId } });
// // //             setCompletedLessonIds(prev => [...prev, lessonId]);
// // //         } catch(e) { console.error(e); }
// // //     }
// // //   };

// // //   const handleNextLesson = () => {
// // //     const allLessons: any[] = [];
// // //     course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // //     const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // //     if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // //     else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // //   };

// // //   const handleManualComplete = async () => { await markLessonAsComplete(activeLesson._id); handleNextLesson(); };
// // //   const handleQuizCompleted = async () => { await markLessonAsComplete(activeLesson._id); };

// // //   const renderContent = () => {
// // //     if (!activeLesson) return null;
// // //     switch (activeLesson.type) {
// // //         case 'video_url':
// // //             let embedUrl = activeLesson.videoUrl;
// // //             if (activeLesson.videoUrl?.includes('youtube.com') || activeLesson.videoUrl?.includes('youtu.be')) {
// // //                 const vId = activeLesson.videoUrl.split(activeLesson.videoUrl.includes('v=') ? 'v=' : '/').pop().split('&')[0];
// // //                 embedUrl = `https://www.youtube.com/embed/${vId}`;
// // //             }
// // //             return (
// // //                 <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
// // //                     <iframe src={embedUrl} className="w-full h-full" allowFullScreen title={`Video: ${activeLesson.title}`}/>
// // //                 </div>
// // //             );
// // //         case 'quiz': return <QuizPlayer quizId={activeLesson._id} courseId={courseId} onComplete={handleQuizCompleted} />;
// // //         case 'pdf': case 'download_doc': 
// // //             return (
// // //                 <div className="p-10 bg-gray-100 border-2 border-dashed rounded-xl text-center hover:bg-gray-50 transition-colors">
// // //                     <div className="text-5xl mb-4">📄</div>
// // //                     <h3 className="font-bold text-gray-700 mb-2">Materi Dokumen</h3>
// // //                     <a href={activeLesson.fileUrl} target="_blank" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-transform active:scale-95 shadow">Buka / Download</a>
// // //                 </div>
// // //             );
// // //         default: return <div className="prose max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />;
// // //     }
// // //   };

// // //   if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // //   if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;

// // //   // [FIX] Validasi Safe Percent untuk menghindari error ARIA
// // //   const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;

// // //   return (
// // //     <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
      
// // //       <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 flex flex-col md:relative absolute z-30 h-full shadow-xl md:shadow-none`}>
// // //         <div className="p-5 border-b border-gray-100 bg-white">
// // //             <Link href="/courses" className="text-[10px] font-bold text-gray-400 hover:text-indigo-600 mb-3 flex items-center gap-1 uppercase tracking-wide"><span>←</span> Kembali ke Katalog</Link>
// // //             <h2 className="font-bold text-gray-800 text-lg leading-tight mb-4 line-clamp-2">{course.title}</h2>
// // //             <div className="space-y-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
// // //                 <div className="flex justify-between text-xs font-bold text-gray-600 mb-1"><span>Progress Belajar</span><span className="text-indigo-600">{safePercent}%</span></div>
                
// // //                 {/* [FIX] Progress Bar Tanpa Error ARIA */}
// // //                 <div className="w-full bg-gray-200 rounded-full h-2 relative">
// // //                     <div 
// // //                         className="bg-green-500 h-2 rounded-full transition-all duration-500 shadow-sm" 
// // //                         style={{ width: `${safePercent}%` }}
// // //                     ></div>
// // //                     {/* Screen Reader Only Text - Solusi Terbaik untuk A11y tanpa error linter */}
// // //                     <span className="sr-only">Progress: {safePercent}%</span>
// // //                 </div>

// // //                 {chatableFacilitators.length > 0 && (
// // //                     <button onClick={() => setShowChat(true)} className="w-full mt-2 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2.5 rounded-lg text-xs font-bold hover:bg-indigo-50 border border-indigo-200 transition-all shadow-sm active:scale-95 relative">
// // //                         <MessageCircle size={16}/> Hubungi Pengajar
// // //                         {unreadSenderId && <span className="absolute top-2 right-4 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-bounce"></span>}
// // //                     </button>
// // //                 )}
// // //             </div>
// // //         </div>

// // //         <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24 custom-scrollbar">
// // //             {course.modules?.map((module: any, mIdx: number) => (
// // //                 <div key={module._id}>
// // //                     <div className="mb-2 pl-1">
// // //                         <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-wider">MODUL {mIdx + 1}</h3>
// // //                         <h4 className="font-bold text-gray-800 text-sm leading-tight">{module.title}</h4>
// // //                         <div className="flex flex-wrap items-center gap-2 mt-1">
// // //                             {module.scheduleDate && <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold border border-blue-100 flex items-center gap-1"><Calendar size={10}/> {new Date(module.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // //                             {module.facilitatorId && <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-bold border border-indigo-100 flex items-center gap-1">👨‍🏫 {module.facilitatorId.name || 'Fasilitator'}</span>}
// // //                         </div>
// // //                     </div>
// // //                     <div className="space-y-1">
// // //                         {module.lessons?.map((lesson: any) => {
// // //                             const isCompleted = completedLessonIds.includes(lesson._id);
// // //                             const isActive = activeLesson?._id === lesson._id;
// // //                             let icon = <FileText size={14}/>; if (lesson.type === 'video_url') icon = <PlayCircle size={14}/>; if (lesson.type === 'quiz') icon = <span>📝</span>;
// // //                             return (
// // //                                 <button key={lesson._id} onClick={() => setActiveLesson(lesson)} className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group ${isActive ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-200' : 'hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200'}`}>
// // //                                     <div className="flex items-center gap-3 overflow-hidden">
// // //                                         <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors ${isActive ? 'border-white/30 bg-white/20 text-white' : isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 bg-white text-transparent'}`}><CheckCircle size={12} /></div>
// // //                                         <div className="min-w-0">
// // //                                             <span className={`text-xs font-bold truncate block ${isActive ? 'text-white' : 'text-gray-700'}`}>{lesson.title}</span>
// // //                                             <div className="flex items-center gap-2 mt-0.5">
// // //                                                 <span className={`text-[10px] opacity-70 block ${isActive ? 'text-indigo-100' : 'text-gray-400'}`}>{lesson.type === 'quiz' ? `${lesson.quizDuration} Menit` : `${lesson.jp} JP`}</span>
// // //                                                 {lesson.scheduleDate && <span className={`text-[9px] flex items-center gap-0.5 ${isActive ? 'text-indigo-100' : 'text-blue-600'}`}><Calendar size={8}/> {new Date(lesson.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // //                                             </div>
// // //                                         </div>
// // //                                     </div>
// // //                                     <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity">{icon}</span>
// // //                                 </button>
// // //                             );
// // //                         })}
// // //                     </div>
// // //                 </div>
// // //             ))}
// // //         </div>
// // //       </aside>

// // //       <main className="flex-1 flex flex-col bg-gray-50 relative h-full overflow-hidden w-full">
// // //         <div className="md:hidden p-4 bg-white border-b flex justify-between items-center flex-shrink-0 z-20 shadow-sm">
// // //             <div className="min-w-0"><h1 className="font-bold text-gray-800 truncate text-sm">{activeLesson?.title}</h1></div>
// // //             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200" aria-label="Toggle Sidebar">{isSidebarOpen ? <X size={20}/> : <Menu size={20}/>}</button>
// // //         </div>
// // //         <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 w-full custom-scrollbar">
// // //             <div className="max-w-4xl mx-auto space-y-6">
// // //                 <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 mb-2">
// // //                     <span className="uppercase tracking-wider text-xs font-bold bg-gray-200 px-2 py-0.5 rounded text-gray-600">{activeLesson?.type === 'quiz' ? 'KUIS' : 'MATERI'}</span>
// // //                     <span className="text-gray-300">/</span>
// // //                     <h1 className="text-gray-900 font-bold text-lg">{activeLesson?.title}</h1>
// // //                 </div>
// // //                 {renderContent()}
// // //             </div>
// // //         </div>
// // //         {activeLesson?.type !== 'quiz' && (
// // //             <div className="bg-white border-t p-4 absolute bottom-0 w-full z-20 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
// // //                 <div className="max-w-4xl mx-auto flex justify-between items-center">
// // //                     <button className="text-gray-500 font-bold text-sm hover:text-gray-800 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">← Sebelumnya</button>
// // //                     <button onClick={handleManualComplete} className={`px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-transform active:scale-95 text-white ${completedLessonIds.includes(activeLesson?._id) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}>
// // //                         <span>{completedLessonIds.includes(activeLesson?._id) ? 'Lanjut Berikutnya' : 'Selesai & Lanjut'}</span><span>→</span>
// // //                     </button>
// // //                 </div>
// // //             </div>
// // //         )}
// // //       </main>

// // //       {showChat && (
// // //         <ChatWithFacilitatorModal 
// // //             facilitators={chatableFacilitators} 
// // //             unreadSenderId={unreadSenderId} 
// // //             initialSelectedId={toastData?.senderId} 
// // //             onClose={() => { setShowChat(false); setToastData(null); }} 
// // //         />
// // //       )}
      
// // //       {toastData && !showChat && (
// // //           <ChatToast 
// // //             data={toastData} 
// // //             onOpen={() => { setToastData(null); setShowChat(true); }} 
// // //             onClose={() => setToastData(null)} 
// // //           />
// // //       )}

// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import Link from 'next/link';
// // import { api, getImageUrl } from '@/lib/api';
// // import { useAuth } from '@/lib/AuthProvider';
// // import QuizPlayer from '@/components/QuizPlayer';
// // import { Calendar, PlayCircle, CheckCircle, FileText, MessageCircle, X, Menu, Send } from 'lucide-react';

// // // --- 1. KOMPONEN TOAST NOTIFIKASI CHAT ---
// // function ChatToast({ data, onOpen, onClose }: any) {
// //   useEffect(() => {
// //     const timer = setTimeout(onClose, 10000);
// //     return () => clearTimeout(timer);
// //   }, [onClose]);

// //   return (
// //     <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
// //       <div 
// //         className="bg-white rounded-xl shadow-2xl border-l-4 border-l-green-500 border-y border-r border-gray-100 p-4 w-80 flex items-start gap-3 relative cursor-pointer hover:bg-gray-50 transition-colors"
// //         onClick={onOpen}
// //       >
// //         <button 
// //             onClick={(e) => { e.stopPropagation(); onClose(); }} 
// //             className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 bg-white rounded-full"
// //             aria-label="Tutup notifikasi"
// //         >
// //             <X size={14} />
// //         </button>

// //         <div className="relative flex-shrink-0">
// //             <img 
// //                 src={getImageUrl(data.senderAvatar)} 
// //                 alt={data.senderName} 
// //                 className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
// //             />
// //             <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
// //         </div>

// //         <div className="flex-1 min-w-0">
// //             <div className="flex justify-between items-center mb-0.5">
// //                 <h4 className="font-bold text-sm text-gray-800 truncate pr-4">{data.senderName}</h4>
// //                 <span className="text-[10px] text-gray-400">Baru saja</span>
// //             </div>
// //             <p className="text-xs text-green-600 font-bold mb-0.5">Pesan Baru!</p>
// //             <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed italic">
// //                 "{data.message}"
// //             </p>
// //             <div className="mt-2 text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
// //                 Balas Sekarang <span>→</span>
// //             </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // --- 2. KOMPONEN MODAL CHAT ---
// // function ChatWithFacilitatorModal({ facilitators, initialSelectedId, unreadSenderId, onClose }: any) {
// //   const [selectedFacilitator, setSelectedFacilitator] = useState<any>(
// //     initialSelectedId 
// //         ? facilitators.find((f: any) => f._id === initialSelectedId)
// //         : (unreadSenderId 
// //             ? facilitators.find((f: any) => f._id === unreadSenderId) 
// //             : (facilitators.length === 1 ? facilitators[0] : null))
// //   );

// //   const [messages, setMessages] = useState<any[]>([]);
// //   const [message, setMessage] = useState('');
// //   const [sending, setSending] = useState(false);
// //   const messagesEndRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //       if (selectedFacilitator?._id) {
// //           loadHistory();
// //           const interval = setInterval(loadHistory, 3000); 
// //           return () => clearInterval(interval);
// //       }
// //   }, [selectedFacilitator]);

// //   useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// //   const loadHistory = async () => {
// //       try {
// //           const res = await api(`/api/chat/${selectedFacilitator._id}`); 
// //           setMessages(res.messages || []);
// //       } catch (e) { console.error(e); }
// //   };

// //   const handleSend = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!message.trim() || !selectedFacilitator) return;
    
// //     const tempMsg = { _id: Date.now(), sender: 'me', message: message, createdAt: new Date().toISOString() };
// //     setMessages(prev => [...prev, tempMsg]);
// //     setMessage('');
// //     setSending(true);

// //     try {
// //       await api('/api/chat/send', {
// //         method: 'POST',
// //         body: { recipientId: selectedFacilitator._id, message: tempMsg.message }
// //       });
// //       loadHistory(); 
// //     } catch (error: any) {
// //       alert("Gagal kirim pesan: " + error.message);
// //     } finally {
// //       setSending(false);
// //     }
// //   };

// //   const isMe = (msg: any) => {
// //       if (msg.sender === 'me') return true;
// //       const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
// //       return senderId !== selectedFacilitator._id; 
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in duration-200 backdrop-blur-sm">
// //       <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]">
// //         {/* Header Modal */}
// //         <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
// //           <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18}/> Hubungi Pengajar</h3>
// //           <button onClick={onClose} className="hover:bg-indigo-700 p-1.5 rounded-full transition-colors" aria-label="Tutup Chat">
// //             <X size={20} />
// //           </button>
// //         </div>
        
// //         {!selectedFacilitator ? (
// //             <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
// //                 <div className="p-4 bg-white border-b shadow-sm z-10">
// //                     <p className="text-sm text-gray-700 font-bold">Pilih Fasilitator untuk diskusi:</p>
// //                     <p className="text-xs text-gray-500">Klik nama pengajar untuk memulai chat.</p>
// //                 </div>
// //                 <div className="p-4 overflow-y-auto custom-scrollbar space-y-2 flex-1">
// //                     {facilitators.map((fac: any) => {
// //                         const isUnreadSender = fac._id === unreadSenderId;
// //                         return (
// //                             <button 
// //                                 key={fac._id} 
// //                                 onClick={() => setSelectedFacilitator(fac)} 
// //                                 className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left group relative
// //                                     ${isUnreadSender ? 'bg-green-50 border-green-500 ring-1 ring-green-500 shadow-md' : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm'}
// //                                 `}
// //                             >
// //                                 <div className="relative">
// //                                     <img src={getImageUrl(fac.avatarUrl)} className={`w-12 h-12 rounded-full object-cover border-2 ${isUnreadSender ? 'border-green-500' : 'border-gray-200 group-hover:border-indigo-300'}`} alt={fac.name} />
// //                                     {isUnreadSender && (
// //                                         <span className="absolute -top-1 -right-1 flex h-4 w-4">
// //                                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
// //                                             <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
// //                                         </span>
// //                                     )}
// //                                 </div>
// //                                 <div className="flex-1 min-w-0">
// //                                     <div className="flex justify-between items-center">
// //                                         <p className={`font-bold text-sm truncate ${isUnreadSender ? 'text-green-800' : 'text-gray-800 group-hover:text-indigo-600'}`}>{fac.name}</p>
// //                                         {isUnreadSender && <span className="text-[9px] font-bold text-white bg-green-600 px-2 py-0.5 rounded-full shadow-sm">Pesan Baru</span>}
// //                                     </div>
// //                                     <p className="text-xs text-gray-500">{fac.role || 'Fasilitator'}</p>
// //                                 </div>
// //                             </button>
// //                         );
// //                     })}
// //                 </div>
// //             </div>
// //         ) : (
// //             <>
// //                 <div className="p-3 bg-white border-b flex items-center gap-3 shadow-sm z-10">
// //                     <button onClick={() => setSelectedFacilitator(null)} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 text-xs font-bold flex items-center gap-1">
// //                         ← Kembali
// //                     </button>
// //                     <div className="flex items-center gap-2 border-l pl-3">
// //                         <img src={getImageUrl(selectedFacilitator.avatarUrl)} className="w-9 h-9 rounded-full bg-gray-200 object-cover border border-gray-200" alt={selectedFacilitator.name} />
// //                         <div>
// //                             <p className="text-sm font-bold text-gray-800 leading-tight">{selectedFacilitator.name}</p>
// //                             <span className="text-[10px] text-green-600 bg-green-50 px-1.5 rounded-full border border-green-100">Online</span>
// //                         </div>
// //                     </div>
// //                 </div>
                
// //                 <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// //                     {messages.length === 0 ? (
// //                         <div className="text-center text-gray-400 text-xs mt-10">Belum ada pesan.<br/>Mulai diskusi dengan pengajar!</div>
// //                     ) : (
// //                         messages.map((msg: any, idx: number) => {
// //                             const me = isMe(msg);
// //                             return (
// //                                 <div key={idx} className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
// //                                     <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm relative ${me ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>
// //                                         <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
// //                                         <span className={`text-[9px] block text-right mt-1 ${me ? 'text-indigo-200' : 'text-gray-400'}`}>
// //                                             {new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
// //                                         </span>
// //                                     </div>
// //                                 </div>
// //                             );
// //                         })
// //                     )}
// //                     <div ref={messagesEndRef} />
// //                 </div>

// //                 <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
// //                     <input 
// //                         className="flex-1 border rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 transition-all"
// //                         placeholder="Tulis pesan..."
// //                         value={message}
// //                         onChange={e => setMessage(e.target.value)}
// //                         autoFocus
// //                     />
// //                     <button 
// //                         disabled={sending} 
// //                         type="submit" 
// //                         className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-transform active:scale-95 shadow-md"
// //                         aria-label="Kirim Pesan"
// //                     >
// //                         <Send size={16}/>
// //                     </button>
// //                 </form>
// //             </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // // --- 3. MAIN PAGE ---
// // export default function StudentCoursePlayPage() {
// //   const router = useRouter();
// //   const params = useParams();
// //   const { user } = useAuth();
// //   const { courseId } = params as { courseId: string };

// //   const [course, setCourse] = useState<any>(null);
// //   const [activeLesson, setActiveLesson] = useState<any>(null);
// //   const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// //   const [progressPercent, setProgressPercent] = useState(0);
// //   const [loading, setLoading] = useState(true);
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
// //   // STATE CHAT
// //   const [showChat, setShowChat] = useState(false);
// //   const [chatableFacilitators, setChatableFacilitators] = useState<any[]>([]);
// //   const [unreadSenderId, setUnreadSenderId] = useState<string | null>(null);
// //   const [toastData, setToastData] = useState<any>(null);
// //   const lastMsgIdRef = useRef<string | null>(null);

// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         setLoading(true);
// //         const [resCourse, resProgress] = await Promise.all([
// //             api(`/api/courses/${courseId}`),
// //             api(`/api/progress/${courseId}`).catch(() => ({ completedLessons: [] }))
// //         ]);

// //         const courseData = resCourse.course || resCourse;
// //         setCourse(courseData);
// //         setCompletedLessonIds(resProgress.completedLessons || []);

// //         if (courseData.facilitatorIds && Array.isArray(courseData.facilitatorIds)) {
// //             const validFacs = courseData.facilitatorIds.filter((f: any) => f && f.name && f._id !== user?.id);
// //             setChatableFacilitators(validFacs);
// //         }

// //         if (courseData.modules?.[0]?.lessons?.[0]) {
// //             setActiveLesson(courseData.modules[0].lessons[0]);
// //         }
// //       } catch (e: any) { console.error(e); } finally { setLoading(false); }
// //     };
// //     if (courseId && user) loadData();
// //   }, [courseId, user]);

// //   // POLLING CHAT
// //   useEffect(() => {
// //       if (!user) return;
// //       const checkNewMessages = async () => {
// //           try {
// //               const res = await api('/api/chat/conversations');
// //               if (res.conversations && res.conversations.length > 0) {
// //                   const latestConv = res.conversations[0];
// //                   const latestMsg = latestConv.lastMessage;
// //                   if (!latestMsg) return;
// //                   const senderId = typeof latestMsg.sender === 'object' ? latestMsg.sender._id : latestMsg.sender;
// //                   if (senderId !== user.id) {
// //                       setUnreadSenderId(senderId); 
// //                       if (latestMsg._id !== lastMsgIdRef.current) {
// //                           lastMsgIdRef.current = latestMsg._id;
// //                           if (!showChat) {
// //                               setToastData({
// //                                   senderId,
// //                                   senderName: latestConv.user?.name || 'Pengajar',
// //                                   senderAvatar: latestConv.user?.avatarUrl,
// //                                   message: latestMsg.message
// //                               });
// //                           }
// //                       }
// //                   }
// //               }
// //           } catch (e) { /* Silent */ }
// //       };
      
// //       checkNewMessages(); 
// //       const interval = setInterval(checkNewMessages, 5000);
// //       return () => clearInterval(interval);
// //   }, [user, showChat]);

// //   // LOGIKA PROGRESS
// //   useEffect(() => {
// //     if (course) {
// //         let total = 0; let completed = 0;
// //         course.modules.forEach((m: any) => {
// //             if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) { total++; if (completedLessonIds.includes(l._id)) completed++; } });
// //         });
// //         setProgressPercent(total === 0 ? 0 : Math.round((completed / total) * 100));
// //     }
// //   }, [completedLessonIds, course]);

// //   const markLessonAsComplete = async (lessonId: string) => {
// //     if (!completedLessonIds.includes(lessonId)) {
// //         try {
// //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId } });
// //             setCompletedLessonIds(prev => [...prev, lessonId]);
// //         } catch(e) { console.error(e); }
// //     }
// //   };

// //   const handleNextLesson = () => {
// //     const allLessons: any[] = [];
// //     course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// //     const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// //     if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// //     else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// //   };

// //   const handleManualComplete = async () => { await markLessonAsComplete(activeLesson._id); handleNextLesson(); };
// //   const handleQuizCompleted = async () => { await markLessonAsComplete(activeLesson._id); };

// //   const renderContent = () => {
// //     if (!activeLesson) return null;
// //     switch (activeLesson.type) {
// //         case 'video_url':
// //             let embedUrl = activeLesson.videoUrl;
// //             if (activeLesson.videoUrl?.includes('youtube.com') || activeLesson.videoUrl?.includes('youtu.be')) {
// //                 const vId = activeLesson.videoUrl.split(activeLesson.videoUrl.includes('v=') ? 'v=' : '/').pop().split('&')[0];
// //                 embedUrl = `https://www.youtube.com/embed/${vId}`;
// //             }
// //             return (
// //                 <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
// //                     <iframe src={embedUrl} className="w-full h-full" allowFullScreen title={`Video: ${activeLesson.title}`}/>
// //                 </div>
// //             );
// //         case 'quiz': return <QuizPlayer quizId={activeLesson._id} courseId={courseId} onComplete={handleQuizCompleted} />;
        
// //         // [BARU] RENDER GOOGLE CLASSROOM
// //         case 'google_classroom':
// //             return (
// //                 <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100 text-center space-y-6">
// //                     <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl shadow-inner">
// //                         🏫
// //                     </div>
// //                     <div>
// //                         <h3 className="text-xl font-bold text-gray-800 mb-2">Materi via Google Classroom</h3>
// //                         <p className="text-gray-500 max-w-md mx-auto">
// //                             Materi ini diselenggarakan melalui Google Classroom. Silakan klik tombol di bawah untuk mengakses kelas:
// //                             <br/>
// //                             <strong className="text-green-700">{activeLesson.classroomData?.name}</strong>
// //                         </p>
// //                     </div>
                    
// //                     {activeLesson.classroomData?.alternateLink ? (
// //                         <a 
// //                             href={activeLesson.classroomData.alternateLink} 
// //                             target="_blank" 
// //                             rel="noopener noreferrer"
// //                             className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 transition-transform hover:scale-105 flex items-center gap-2"
// //                         >
// //                             Buka Google Classroom <span>↗</span>
// //                         </a>
// //                     ) : (
// //                         <div className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded">Link kelas tidak tersedia.</div>
// //                     )}
// //                 </div>
// //             );

// //         case 'pdf': case 'download_doc': 
// //             return (
// //                 <div className="p-10 bg-gray-100 border-2 border-dashed rounded-xl text-center hover:bg-gray-50 transition-colors">
// //                     <div className="text-5xl mb-4">📄</div>
// //                     <h3 className="font-bold text-gray-700 mb-2">Materi Dokumen</h3>
// //                     <a href={activeLesson.fileUrl} target="_blank" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-transform active:scale-95 shadow">Buka / Download</a>
// //                 </div>
// //             );
// //         default: return <div className="prose max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />;
// //     }
// //   };

// //   if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// //   if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;

// //   // [FIX] Validasi Safe Percent untuk menghindari error ARIA
// //   const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;

// //   return (
// //     <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
      
// //       <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 flex flex-col md:relative absolute z-30 h-full shadow-xl md:shadow-none`}>
// //         <div className="p-5 border-b border-gray-100 bg-white">
// //             <Link href="/courses" className="text-[10px] font-bold text-gray-400 hover:text-indigo-600 mb-3 flex items-center gap-1 uppercase tracking-wide"><span>←</span> Kembali ke Katalog</Link>
// //             <h2 className="font-bold text-gray-800 text-lg leading-tight mb-4 line-clamp-2">{course.title}</h2>
// //             <div className="space-y-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
// //                 <div className="flex justify-between text-xs font-bold text-gray-600 mb-1"><span>Progress Belajar</span><span className="text-indigo-600">{safePercent}%</span></div>
                
// //                 {/* [FIX] Progress Bar Tanpa Error ARIA */}
// //                 <div className="w-full bg-gray-200 rounded-full h-2 relative">
// //                     <div 
// //                         className="bg-green-500 h-2 rounded-full transition-all duration-500 shadow-sm" 
// //                         style={{ width: `${safePercent}%` }}
// //                     ></div>
// //                     {/* Screen Reader Only Text - Solusi Terbaik untuk A11y tanpa error linter */}
// //                     <span className="sr-only">Progress: {safePercent}%</span>
// //                 </div>

// //                 {chatableFacilitators.length > 0 && (
// //                     <button onClick={() => setShowChat(true)} className="w-full mt-2 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2.5 rounded-lg text-xs font-bold hover:bg-indigo-50 border border-indigo-200 transition-all shadow-sm active:scale-95 relative">
// //                         <MessageCircle size={16}/> Hubungi Pengajar
// //                         {unreadSenderId && <span className="absolute top-2 right-4 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-bounce"></span>}
// //                     </button>
// //                 )}
// //             </div>
// //         </div>

// //         <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24 custom-scrollbar">
// //             {course.modules?.map((module: any, mIdx: number) => (
// //                 <div key={module._id}>
// //                     <div className="mb-2 pl-1">
// //                         <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-wider">MODUL {mIdx + 1}</h3>
// //                         <h4 className="font-bold text-gray-800 text-sm leading-tight">{module.title}</h4>
// //                         <div className="flex flex-wrap items-center gap-2 mt-1">
// //                             {module.scheduleDate && <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold border border-blue-100 flex items-center gap-1"><Calendar size={10}/> {new Date(module.scheduleDate).toLocaleDateString('id-ID')}</span>}
// //                             {module.facilitatorId && <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-bold border border-indigo-100 flex items-center gap-1">👨‍🏫 {module.facilitatorId.name || 'Fasilitator'}</span>}
// //                         </div>
// //                     </div>
// //                     <div className="space-y-1">
// //                         {module.lessons?.map((lesson: any) => {
// //                             const isCompleted = completedLessonIds.includes(lesson._id);
// //                             const isActive = activeLesson?._id === lesson._id;
// //                             let icon = <FileText size={14}/>; 
// //                             if (lesson.type === 'video_url') icon = <PlayCircle size={14}/>; 
// //                             if (lesson.type === 'quiz') icon = <span>📝</span>;
// //                             if (lesson.type === 'google_classroom') icon = <span>🏫</span>; // Icon Baru

// //                             return (
// //                                 <button key={lesson._id} onClick={() => setActiveLesson(lesson)} className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group ${isActive ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-200' : 'hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200'}`}>
// //                                     <div className="flex items-center gap-3 overflow-hidden">
// //                                         <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors ${isActive ? 'border-white/30 bg-white/20 text-white' : isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 bg-white text-transparent'}`}><CheckCircle size={12} /></div>
// //                                         <div className="min-w-0">
// //                                             <span className={`text-xs font-bold truncate block ${isActive ? 'text-white' : 'text-gray-700'}`}>{lesson.title}</span>
// //                                             <div className="flex items-center gap-2 mt-0.5">
// //                                                 <span className={`text-[10px] opacity-70 block ${isActive ? 'text-indigo-100' : 'text-gray-400'}`}>{lesson.type === 'quiz' ? `${lesson.quizDuration} Menit` : `${lesson.jp} JP`}</span>
// //                                                 {lesson.scheduleDate && <span className={`text-[9px] flex items-center gap-0.5 ${isActive ? 'text-indigo-100' : 'text-blue-600'}`}><Calendar size={8}/> {new Date(lesson.scheduleDate).toLocaleDateString('id-ID')}</span>}
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                     <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity">{icon}</span>
// //                                 </button>
// //                             );
// //                         })}
// //                     </div>
// //                 </div>
// //             ))}
// //         </div>
// //       </aside>

// //       <main className="flex-1 flex flex-col bg-gray-50 relative h-full overflow-hidden w-full">
// //         <div className="md:hidden p-4 bg-white border-b flex justify-between items-center flex-shrink-0 z-20 shadow-sm">
// //             <div className="min-w-0"><h1 className="font-bold text-gray-800 truncate text-sm">{activeLesson?.title}</h1></div>
// //             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200" aria-label="Toggle Sidebar">{isSidebarOpen ? <X size={20}/> : <Menu size={20}/>}</button>
// //         </div>
// //         <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 w-full custom-scrollbar">
// //             <div className="max-w-4xl mx-auto space-y-6">
// //                 <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 mb-2">
// //                     <span className="uppercase tracking-wider text-xs font-bold bg-gray-200 px-2 py-0.5 rounded text-gray-600">{activeLesson?.type === 'quiz' ? 'KUIS' : activeLesson?.type === 'google_classroom' ? 'E-CLASS' : 'MATERI'}</span>
// //                     <span className="text-gray-300">/</span>
// //                     <h1 className="text-gray-900 font-bold text-lg">{activeLesson?.title}</h1>
// //                 </div>
// //                 {renderContent()}
// //             </div>
// //         </div>
// //         {activeLesson?.type !== 'quiz' && (
// //             <div className="bg-white border-t p-4 absolute bottom-0 w-full z-20 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
// //                 <div className="max-w-4xl mx-auto flex justify-between items-center">
// //                     <button className="text-gray-500 font-bold text-sm hover:text-gray-800 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">← Sebelumnya</button>
// //                     <button onClick={handleManualComplete} className={`px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-transform active:scale-95 text-white ${completedLessonIds.includes(activeLesson?._id) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}>
// //                         <span>{completedLessonIds.includes(activeLesson?._id) ? 'Lanjut Berikutnya' : 'Selesai & Lanjut'}</span><span>→</span>
// //                     </button>
// //                 </div>
// //             </div>
// //         )}
// //       </main>

// //       {showChat && (
// //         <ChatWithFacilitatorModal 
// //             facilitators={chatableFacilitators} 
// //             unreadSenderId={unreadSenderId} 
// //             initialSelectedId={toastData?.senderId} 
// //             onClose={() => { setShowChat(false); setToastData(null); }} 
// //         />
// //       )}
      
// //       {toastData && !showChat && (
// //           <ChatToast 
// //             data={toastData} 
// //             onOpen={() => { setToastData(null); setShowChat(true); }} 
// //             onClose={() => setToastData(null)} 
// //           />
// //       )}

// //     </div>
// //   );
// // }
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { api, getImageUrl, apiUpload } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';
// import QuizPlayer from '@/components/QuizPlayer';
// import { 
//     Calendar, PlayCircle, CheckCircle, FileText, MessageCircle, X, Menu, Send, 
//     ChevronDown, ChevronRight, Clock, UploadCloud, File, AlertCircle, Paperclip, 
//     Smile, Users, Mail, ExternalLink
// } from 'lucide-react';

// // --- COMPONENT: GLOBAL ROOM CHAT MODAL (STUDENT VERSION) ---
// function RoomChatModal({ title, members, onClose, currentUser }: any) {
//     const [messages, setMessages] = useState<any[]>([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [showEmoji, setShowEmoji] = useState(false);
//     const [mentionQuery, setMentionQuery] = useState<string | null>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null);
    
//     const messagesEndRef = useRef<HTMLDivElement>(null);
//     const inputRef = useRef<HTMLInputElement>(null);
//     const emojis = ["😀", "😂", "🥰", "😎", "🤔", "👍", "👎", "❤️", "🔥", "🎉", "📚", "✅"];

//     useEffect(() => {
//         setMessages([
//             { id: 1, sender: 'System', text: `Selamat datang di ${title}`, time: '08:00', isMe: false, isSystem: true }
//         ]);
//     }, [title]);

//     const handleSend = (e: any) => {
//         e.preventDefault();
//         if(!newMessage.trim()) return;
//         setMessages(prev => [...prev, { 
//             id: Date.now(), 
//             sender: currentUser?.name || 'Saya', 
//             text: newMessage, 
//             time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), 
//             isMe: true 
//         }]);
//         setNewMessage('');
//         setShowEmoji(false);
//         setMentionQuery(null);
//         setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
//     };

//     const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             setMessages(prev => [...prev, { 
//                 id: Date.now(), 
//                 sender: currentUser?.name || 'Saya', 
//                 text: `Mengirim file: ${file.name}`, 
//                 isAttachment: true,
//                 time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), 
//                 isMe: true 
//             }]);
//         }
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const val = e.target.value;
//         setNewMessage(val);
//         const lastWord = val.split(' ').pop();
//         if (lastWord && lastWord.startsWith('@') && lastWord.length > 1) { 
//             setMentionQuery(lastWord.substring(1)); 
//         } else { 
//             setMentionQuery(null); 
//         }
//     };

//     const addEmoji = (emoji: string) => { setNewMessage(prev => prev + emoji); inputRef.current?.focus(); };
//     const addMention = (name: string) => { 
//         const words = newMessage.split(' '); 
//         words.pop(); 
//         setNewMessage(words.join(' ') + ` @${name} `); 
//         setMentionQuery(null); 
//         inputRef.current?.focus(); 
//     };

//     const filteredMembers = mentionQuery 
//         ? members.filter((m: any) => (m.name || 'User').toLowerCase().includes(mentionQuery.toLowerCase())) 
//         : [];

//     return (
//         <div className="fixed inset-0 bg-black/60 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
//             <div className="bg-white w-full max-w-5xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative">
//                 {/* Header */}
//                 <div className="bg-red-700 p-4 text-white flex justify-between items-center shadow-md shrink-0">
//                     <div className="flex items-center gap-3">
//                         <div className="bg-white/20 p-2 rounded-full"><MessageCircle size={20} aria-hidden="true"/></div>
//                         <div>
//                             <h3 className="font-bold text-lg">{title}</h3>
//                             <p className="text-[10px] opacity-90">{members.length} Anggota Online</p>
//                         </div>
//                     </div>
//                     <button type="button" onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Tutup Chat" title="Tutup">
//                         <X size={24}/>
//                     </button>
//                 </div>

//                 <div className="flex flex-1 overflow-hidden relative">
//                     {/* Chat Area */}
//                     <div className="flex-1 flex flex-col bg-gray-100 relative">
//                         <div className="flex-1 p-4 overflow-y-auto space-y-4" onClick={() => { setShowEmoji(false); setMentionQuery(null); }}>
//                             {messages.map((msg) => (
//                                 <div key={msg.id} className={`flex ${msg.isSystem ? 'justify-center' : (msg.isMe ? 'justify-end' : 'justify-start')}`}>
//                                     {msg.isSystem ? (
//                                         <span className="text-xs bg-gray-300 text-gray-600 px-3 py-1 rounded-full font-medium">{msg.text}</span>
//                                     ) : (
//                                         <div className={`max-w-[75%] flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
//                                             <div className={`px-4 py-2.5 rounded-xl text-sm shadow-sm ${msg.isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border'}`}>
//                                                 {!msg.isMe && <div className="text-[10px] font-bold opacity-70 mb-1 text-blue-600">{msg.sender}</div>}
//                                                 {msg.isAttachment ? (
//                                                     <div className="flex items-center gap-2 italic bg-black/10 p-2 rounded">
//                                                         <Paperclip size={16}/> {msg.text}
//                                                     </div>
//                                                 ) : (
//                                                     <p className="leading-relaxed">{msg.text}</p>
//                                                 )}
//                                             </div>
//                                             <span className="text-[10px] text-gray-400 mt-1 mx-1">{msg.time}</span>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                             <div ref={messagesEndRef}/>
//                         </div>

//                         {/* Mention List Popup */}
//                         {mentionQuery !== null && filteredMembers.length > 0 && (
//                             <div className="absolute bottom-20 left-4 bg-white border shadow-xl rounded-lg max-h-40 overflow-y-auto w-64 z-20 animate-in slide-in-from-bottom-2">
//                                 {filteredMembers.map((m: any, i: number) => (
//                                     <button type="button" key={i} onClick={() => addMention(m.name)} className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm flex items-center gap-2 border-b last:border-0">
//                                         <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold shrink-0">{m.name?.charAt(0)}</div>
//                                         <span className="truncate">{m.name}</span>
//                                     </button>
//                                 ))}
//                             </div>
//                         )}

//                         {/* Emoji Picker */}
//                         {showEmoji && (
//                             <div className="absolute bottom-16 left-2 bg-white border shadow-xl rounded-xl p-3 grid grid-cols-4 gap-2 z-20 w-64 animate-in zoom-in-95">
//                                 {emojis.map(e => (
//                                     <button type="button" key={e} onClick={() => addEmoji(e)} className="text-2xl hover:bg-gray-100 p-2 rounded transition">{e}</button>
//                                 ))}
//                             </div>
//                         )}

//                         {/* Input Bar */}
//                         <div className="p-3 bg-white border-t flex gap-2 items-center relative z-10">
//                             {/* FIX: Aria-Label untuk input file */}
//                             <input 
//                                 type="file" 
//                                 ref={fileInputRef} 
//                                 className="hidden" 
//                                 onChange={handleFileUpload}
//                                 title="Lampirkan File" 
//                                 aria-label="Lampirkan File" 
//                             />
//                             <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100" aria-label="Tombol Lampirkan File" title="Lampirkan File">
//                                 <Paperclip size={20}/>
//                             </button>
//                             <button type="button" onClick={() => setShowEmoji(!showEmoji)} className={`p-2 rounded-full transition-colors ${showEmoji ? 'bg-yellow-100 text-yellow-600' : 'text-gray-400 hover:text-gray-600'}`} aria-label="Emoticon" title="Emoticon">
//                                 <Smile size={24}/>
//                             </button>
//                             <form onSubmit={handleSend} className="flex-1 flex gap-2">
//                                 <input 
//                                     ref={inputRef}
//                                     className="flex-1 bg-gray-100 border-0 rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" 
//                                     placeholder="Ketik pesan... (@ mention)" 
//                                     value={newMessage} 
//                                     onChange={handleInputChange}
//                                     aria-label="Input pesan chat" 
//                                     title="Input pesan chat"
//                                 />
//                                 <button type="submit" className="bg-red-700 text-white p-3 rounded-full hover:opacity-90 shadow-lg transition-transform active:scale-95 disabled:opacity-50" disabled={!newMessage.trim()} aria-label="Kirim" title="Kirim">
//                                     <Send size={18}/>
//                                 </button>
//                             </form>
//                         </div>
//                     </div>

//                     {/* Member List Sidebar */}
//                     <div className="w-72 bg-white border-l border-gray-200 flex flex-col shrink-0 hidden md:flex">
//                         <div className="p-4 border-b bg-gray-50"><h4 className="font-bold text-gray-700 flex items-center gap-2 text-sm"><Users size={16}/> Peserta ({members.length})</h4></div>
//                         <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
//                             {members.map((member: any, idx: number) => {
//                                 const isFacilitator = member.role === 'Facilitator' || member.role === 'SUPER_ADMIN';
//                                 return (
//                                     <div key={idx} className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors group cursor-default">
//                                         <div className="relative shrink-0">
//                                             {member.avatarUrl ? (
//                                                 <img src={getImageUrl(member.avatarUrl)} alt={member.name} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
//                                             ) : (
//                                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${isFacilitator ? 'bg-orange-100 text-orange-600 border-orange-200' : 'bg-green-100 text-green-600 border-green-200'}`}>
//                                                     {member.name?.charAt(0).toUpperCase()}
//                                                 </div>
//                                             )}
//                                             <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-white rounded-full"></span>
//                                         </div>
//                                         <div className="flex-1 min-w-0">
//                                             <p className="text-sm font-bold text-gray-800 truncate">{member.name}</p>
//                                             <p className={`text-[10px] truncate ${isFacilitator ? 'text-orange-600 font-bold' : 'text-gray-500'}`}>
//                                                 {isFacilitator ? 'Fasilitator' : 'Peserta'}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // --- MAIN PAGE COMPONENT ---
// export default function StudentCoursePlayPage() {
//   const router = useRouter();
//   const params = useParams();
//   const { user } = useAuth();
//   const { courseId } = params as { courseId: string };

//   const [course, setCourse] = useState<any>(null);
//   const [activeLesson, setActiveLesson] = useState<any>(null);
//   const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
//   const [progressPercent, setProgressPercent] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [expandedModules, setExpandedModules] = useState<string[]>([]); 

//   // State Esai & Upload
//   const [essayAnswers, setEssayAnswers] = useState<{[key: string]: string}>({});
//   const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File | null}>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // State Chat Global
//   const [showGlobalChat, setShowGlobalChat] = useState(false);
//   const [chatMembers, setChatMembers] = useState<any[]>([]);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);
//         const [resCourse, resProgress] = await Promise.all([
//             api(`/api/courses/${courseId}`),
//             api(`/api/progress/${courseId}`).catch(() => ({ completedLessons: [] }))
//         ]);

//         const courseData = resCourse.course || resCourse;
//         setCourse(courseData);
//         setCompletedLessonIds(resProgress.completedLessons || []);

//         // --- LOAD ANGGOTA CHAT (Fasilitator + Peserta) ---
//         let membersList = [];
//         // 1. Masukkan Fasilitator (Dari data course)
//         if (courseData.facilitatorIds && Array.isArray(courseData.facilitatorIds)) {
//             const facs = courseData.facilitatorIds.map((f: any) => ({
//                 name: f.name || 'Fasilitator',
//                 avatarUrl: f.avatarUrl,
//                 role: 'Facilitator',
//                 id: f._id
//             }));
//             membersList.push(...facs);
//         }
        
//         // 2. Masukkan Peserta Lain (Fetch Participants)
//         try {
//             const resParts = await api(`/api/courses/${courseId}/participants`);
//             const parts = resParts.participants || resParts.data || [];
//             const students = parts.map((p: any) => {
//                 const u = p.user || p.student || p;
//                 return {
//                     name: u.name || 'Peserta',
//                     avatarUrl: u.avatarUrl,
//                     role: 'Student',
//                     id: u._id
//                 };
//             });
//             membersList.push(...students);
//         } catch (err) { console.error("Gagal load peserta chat"); }
        
//         // Hapus duplikat berdasarkan ID
//         const uniqueMembers = Array.from(new Map(membersList.map(m => [m.id, m])).values());
//         setChatMembers(uniqueMembers);

//         // Set Active Lesson Default & Expand First Module
//         if (courseData.modules?.[0]) {
//             setExpandedModules([courseData.modules[0]._id]);
//             if (courseData.modules[0].lessons?.[0]) {
//                 setActiveLesson(courseData.modules[0].lessons[0]);
//             }
//         }
//       } catch (e: any) { console.error(e); } finally { setLoading(false); }
//     };
//     if (courseId && user) loadData();
//   }, [courseId, user]);

//   // PROGRESS CALCULATOR
//   useEffect(() => {
//     if (course) {
//         let total = 0; let completed = 0;
//         course.modules.forEach((m: any) => {
//             if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) { total++; if (completedLessonIds.includes(l._id)) completed++; } });
//         });
//         setProgressPercent(total === 0 ? 0 : Math.round((completed / total) * 100));
//     }
//   }, [completedLessonIds, course]);

//   const toggleModule = (modId: string) => {
//       setExpandedModules(prev => prev.includes(modId) ? prev.filter(id => id !== modId) : [...prev, modId]);
//   };

//   const markLessonAsComplete = async (lessonId: string) => {
//     if (!completedLessonIds.includes(lessonId)) {
//         try {
//             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId } });
//             setCompletedLessonIds(prev => [...prev, lessonId]);
//         } catch(e) { console.error(e); }
//     }
//   };

//   const handleNextLesson = () => {
//     const allLessons: any[] = [];
//     course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
//     const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
//     if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
//     else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
//   };

//   const handleManualComplete = async () => { await markLessonAsComplete(activeLesson._id); handleNextLesson(); };
//   const handleQuizCompleted = async () => { await markLessonAsComplete(activeLesson._id); };

//   // --- LOGIC ESAI & UPLOAD ---
//   const handleEssayChange = (qIndex: number, val: string) => {
//       setEssayAnswers(prev => ({ ...prev, [`${activeLesson._id}-${qIndex}`]: val }));
//   };

//   const submitEssay = async () => {
//       if (!confirm("Kirim jawaban esai?")) return;
//       setIsSubmitting(true);
//       try {
//           const answers = activeLesson.questions.map((q: any, idx: number) => ({
//               question: q.question,
//               answer: essayAnswers[`${activeLesson._id}-${idx}`] || ''
//           }));
          
//           await api(`/api/progress/${courseId}/submit-essay`, { 
//               method: 'POST', 
//               body: { lessonId: activeLesson._id, answers } 
//           });
          
//           alert("Jawaban terkirim!");
//           await markLessonAsComplete(activeLesson._id);
//       } catch (e: any) { alert("Gagal kirim: " + e.message); } 
//       finally { setIsSubmitting(false); }
//   };

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//       if (e.target.files?.[0]) {
//           setUploadedFiles(prev => ({ ...prev, [activeLesson._id]: e.target.files![0] }));
//       }
//   };

//   const submitTask = async () => {
//       const file = uploadedFiles[activeLesson._id];
//       if (!file) return alert("Pilih file dulu!");
//       if (!confirm("Kumpulkan tugas ini?")) return;

//       setIsSubmitting(true);
//       try {
//           const fd = new FormData();
//           fd.append('file', file);
//           const uploadRes = await apiUpload('/api/upload', fd); 
          
//           await api(`/api/progress/${courseId}/submit-task`, {
//               method: 'POST', 
//               body: { 
//                   lessonId: activeLesson._id, 
//                   fileUrl: uploadRes.url || uploadRes.file.url,
//                   fileName: file.name
//               }
//           });
          
//           alert("Tugas berhasil dikumpulkan!");
//           await markLessonAsComplete(activeLesson._id);
//       } catch (e: any) { alert("Gagal kumpul tugas: " + e.message); }
//       finally { setIsSubmitting(false); }
//   };

//   const renderContent = () => {
//     if (!activeLesson) return null;
    
//     // --- 1. ESAI RENDERER ---
//     const isEssay = activeLesson.type === 'essay' || (activeLesson.type === 'quiz' && activeLesson.questions?.[0]?.options?.length === 0);

//     if (isEssay) {
//         return (
//             <div className="space-y-6">
//                 <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r shadow-sm">
//                     <h3 className="font-bold text-blue-800 text-lg mb-1 flex items-center gap-2">📝 Tugas Esai</h3>
//                     <p className="text-sm text-blue-600">Jawab pertanyaan berikut. {activeLesson.quizDuration ? `Waktu pengerjaan: ${activeLesson.quizDuration} menit.` : ''}</p>
//                 </div>
                
//                 <div className="space-y-6">
//                     {activeLesson.questions?.map((q: any, idx: number) => (
//                         <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//                             <p className="font-bold text-gray-800 mb-3 text-lg">{idx + 1}. {q.question}</p>
//                             <textarea 
//                                 className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[150px] text-gray-700 leading-relaxed"
//                                 placeholder="Tulis jawaban Anda di sini..."
//                                 value={essayAnswers[`${activeLesson._id}-${idx}`] || ''}
//                                 onChange={(e) => handleEssayChange(idx, e.target.value)}
//                                 disabled={completedLessonIds.includes(activeLesson._id)}
//                                 aria-label={`Jawaban untuk pertanyaan ${idx + 1}`}
//                             />
//                         </div>
//                     ))}
//                 </div>

//                 {!completedLessonIds.includes(activeLesson._id) ? (
//                     <div className="flex justify-end">
//                         <button 
//                             type="button"
//                             onClick={submitEssay} 
//                             disabled={isSubmitting}
//                             className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-transform active:scale-95 disabled:opacity-50 flex items-center gap-2"
//                         >
//                             {isSubmitting ? 'Mengirim...' : 'Kirim Jawaban'} <Send size={18}/>
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 font-bold text-center flex items-center justify-center gap-2">
//                         <CheckCircle size={20}/> Jawaban telah dikirim.
//                     </div>
//                 )}
//             </div>
//         );
//     }

//     // --- 2. UPLOAD TUGAS RENDERER ---
//     if (activeLesson.type === 'upload_doc') {
//         return (
//             <div className="space-y-6">
//                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
//                     <div className="flex items-center gap-3 mb-4">
//                         <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><UploadCloud size={24}/></div>
//                         <div>
//                             <h3 className="text-xl font-bold text-gray-800">Pengumpulan Tugas</h3>
//                             <p className="text-sm text-gray-500">Silakan unduh soal/instruksi dan upload hasil pekerjaan.</p>
//                         </div>
//                     </div>

//                     <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
//                         <h4 className="font-bold text-gray-700 mb-2">Instruksi:</h4>
//                         <div className="prose text-sm text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: activeLesson.content || '-' }} />
                        
//                         {activeLesson.fileUrl && (
//                             <a href={activeLesson.fileUrl} target="_blank" className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors">
//                                 <FileText size={16} className="text-red-500"/> Download Dokumen Soal
//                             </a>
//                         )}
//                     </div>

//                     {!completedLessonIds.includes(activeLesson._id) ? (
//                         <div className="border-2 border-dashed border-indigo-200 rounded-xl p-8 text-center hover:bg-indigo-50/50 transition-colors relative">
//                             {/* FIX: Accessibility for File Input */}
//                             <input 
//                                 type="file" 
//                                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                                 onChange={handleFileUpload}
//                                 accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.rar"
//                                 title="Pilih File Tugas"
//                                 aria-label="Pilih File Tugas"
//                             />
//                             <div className="pointer-events-none">
//                                 {uploadedFiles[activeLesson._id] ? (
//                                     <div className="text-green-600 font-bold flex flex-col items-center">
//                                         <FileText size={48} className="mb-2"/>
//                                         {uploadedFiles[activeLesson._id]?.name}
//                                         <span className="text-xs font-normal text-gray-500 mt-1">Klik untuk ganti file</span>
//                                     </div>
//                                 ) : (
//                                     <div className="text-gray-400 flex flex-col items-center">
//                                         <UploadCloud size={48} className="mb-2 text-indigo-300"/>
//                                         <p className="font-bold text-indigo-600">Klik atau Drag file ke sini</p>
//                                         <p className="text-xs mt-1">Mendukung PDF, Word, PPT, ZIP (Max 10MB)</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="p-6 bg-green-50 rounded-xl border border-green-200 text-center">
//                             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-3"><CheckCircle size={32}/></div>
//                             <h3 className="font-bold text-green-800 text-lg">Tugas Berhasil Dikumpulkan!</h3>
//                             <p className="text-green-600 text-sm">Fasilitator akan segera memeriksa tugas Anda.</p>
//                         </div>
//                     )}

//                     {!completedLessonIds.includes(activeLesson._id) && (
//                         <div className="mt-6 flex justify-end">
//                             <button 
//                                 type="button"
//                                 onClick={submitTask}
//                                 disabled={!uploadedFiles[activeLesson._id] || isSubmitting}
//                                 className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95"
//                             >
//                                 {isSubmitting ? 'Mengupload...' : 'Kumpulkan Tugas'}
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         );
//     }

//     // --- 3. GOOGLE CLASSROOM (Renderer) ---
//     if (activeLesson.type === 'google_classroom') {
//          return (
//              <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100 text-center space-y-6">
//                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-5xl shadow-inner border border-green-100">🏫</div>
//                  <div>
//                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Google Classroom</h3>
//                      <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
//                          Materi ini diselenggarakan di Google Classroom. <br/>
//                          Kelas: <strong className="text-green-700">{activeLesson.classroomData?.name || 'Nama Kelas'}</strong>
//                      </p>
//                  </div>
//                  {activeLesson.classroomData?.alternateLink ? (
//                      <a href={activeLesson.classroomData.alternateLink} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:bg-green-700 hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-2">
//                          Masuk ke Kelas <ExternalLink size={16}/>
//                      </a>
//                  ) : (
//                      <div className="text-red-500 bg-red-50 px-4 py-2 rounded-lg font-medium flex items-center gap-2"><AlertCircle size={16}/> Link kelas belum dikonfigurasi.</div>
//                  )}
//              </div>
//          );
//     }

//     // --- 4. VIDEO & QUIZ ---
//     if (activeLesson.type === 'video_url') {
//          let embedUrl = activeLesson.videoUrl;
//          if (activeLesson.videoUrl?.includes('youtube.com') || activeLesson.videoUrl?.includes('youtu.be')) {
//              const vId = activeLesson.videoUrl.split(activeLesson.videoUrl.includes('v=') ? 'v=' : '/').pop().split('&')[0];
//              embedUrl = `https://www.youtube.com/embed/${vId}`;
//          }
//          return (
//             <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
//                 <iframe src={embedUrl} className="w-full h-full" allowFullScreen title={`Video: ${activeLesson.title}`}/>
//             </div>
//          );
//     }
    
//     if (activeLesson.type === 'quiz') return <QuizPlayer quizId={activeLesson._id} courseId={courseId} onComplete={handleQuizCompleted} />;

//     // --- DEFAULT / TEXT ---
//     return <div className="prose max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-100 leading-loose text-gray-700" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />;
//   };

//   if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
//   if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;
//   const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;

//   return (
//     <div className="flex h-screen flex-col md:flex-row bg-[#F8FAFC] font-sans">
      
//       {/* SIDEBAR NAVIGATION */}
//       <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 flex flex-col md:relative absolute z-40 h-full shadow-2xl md:shadow-none`}>
//           <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
//               <Link href="/courses" className="text-xs font-bold text-gray-400 hover:text-indigo-600 mb-4 flex items-center gap-1 uppercase tracking-wider transition-colors"><span>←</span> Kembali ke Katalog</Link>
//               <h2 className="font-extrabold text-gray-800 text-xl leading-tight mb-6">{course?.title}</h2>
//               <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
//                   <div className="flex justify-between items-end mb-2">
//                       <span className="text-xs font-bold text-gray-500 uppercase">Progress</span>
//                       <span className="text-lg font-black text-indigo-600">{safePercent}%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
//                       <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-700" style={{ width: `${safePercent}%` }}></div>
//                   </div>
                  
//                   {/* [FIX] Hubungi Pengajar Button (Don't remove!) */}
//                   <button 
//                       onClick={() => alert("Fitur private chat sedang dalam pengembangan.")} 
//                       className="w-full mt-4 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2.5 rounded-lg text-xs font-bold hover:bg-indigo-50 border border-indigo-200 transition-all shadow-sm active:scale-95"
//                   >
//                       <MessageCircle size={16}/> Hubungi Pengajar
//                   </button>
//               </div>
//           </div>
          
//           <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
//               {course?.modules?.map((module: any, mIdx: number) => {
//                   const isExpanded = expandedModules.includes(module._id);
//                   return (
//                       <div key={module._id} className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
//                           {/* [FIX] ARIA-EXPANDED must be string "true"/"false" or boolean. React handles boolean. */}
//                           <button onClick={() => toggleModule(module._id)} className="w-full flex items-center justify-between p-4 text-left bg-gray-50/50 hover:bg-gray-100 transition-colors" aria-expanded={isExpanded}>
//                               <div><h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">MODUL {mIdx + 1}</h3><h4 className="font-bold text-gray-800 text-sm">{module.title}</h4></div>
//                               {isExpanded ? <ChevronDown size={16} className="text-gray-400"/> : <ChevronRight size={16} className="text-gray-400"/>}
//                           </button>
//                           {isExpanded && (
//                               <div className="divide-y divide-gray-50">
//                                   {module.lessons?.map((lesson: any) => {
//                                       const isActive = activeLesson?._id === lesson._id;
//                                       const isCompleted = completedLessonIds.includes(lesson._id);
//                                       let TypeIcon = FileText;
//                                       if (lesson.type === 'video_url') TypeIcon = PlayCircle;
//                                       if (lesson.type === 'quiz' || lesson.type === 'essay') TypeIcon = AlertCircle;
//                                       if (lesson.type === 'upload_doc') TypeIcon = UploadCloud;
//                                       return (
//                                           <button key={lesson._id} onClick={() => { setActiveLesson(lesson); if(window.innerWidth < 768) setIsSidebarOpen(false); }} className={`w-full flex items-start gap-3 p-3.5 pl-5 text-left transition-all relative ${isActive ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}>
//                                               {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r-full"></div>}
//                                               <div className={`mt-0.5 ${isCompleted ? 'text-green-500' : isActive ? 'text-indigo-600' : 'text-gray-300'}`}>{isCompleted ? <CheckCircle size={16} fill="currentColor" className="text-white"/> : <div className="w-4 h-4 rounded-full border-2 border-current"></div>}</div>
//                                               <div className="flex-1 min-w-0">
//                                                   <p className={`text-sm font-medium truncate ${isActive ? 'text-indigo-700' : 'text-gray-600'}`}>{lesson.title}</p>
//                                                   <div className="flex items-center gap-2 mt-1">
//                                                       <TypeIcon size={12} className={isActive ? 'text-indigo-400' : 'text-gray-400'}/>
//                                                       <span className="text-[10px] text-gray-400 uppercase">{lesson.type === 'google_classroom' ? 'E-Class' : lesson.type}</span>
//                                                       {/* [FIX] Keep JP & Facilitator Info */}
//                                                       {lesson.jp > 0 && <span className="text-[9px] bg-gray-100 px-1 rounded text-gray-500">{lesson.jp} JP</span>}
//                                                   </div>
//                                               </div>
//                                           </button>
//                                       );
//                                   })}
//                               </div>
//                           )}
//                       </div>
//                   );
//               })}
//           </div>
//       </aside>
      
//       {/* MAIN CONTENT AREA */}
//       <main className="flex-1 flex flex-col relative h-full overflow-hidden w-full">
//           <div className="md:hidden p-4 bg-white border-b flex justify-between items-center z-20 shadow-sm">
//               <h1 className="font-bold text-gray-800 truncate text-sm max-w-[200px]">{activeLesson?.title}</h1>
//               <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-100 rounded-lg text-gray-600" aria-label="Menu"><Menu size={20}/></button>
//           </div>
//           <div className="flex-1 overflow-y-auto p-5 md:p-10 pb-32 w-full custom-scrollbar">
//               <div className="max-w-5xl mx-auto">
//                   <div className="hidden md:flex items-center gap-2 text-sm text-gray-400 mb-6 font-medium"><span>{course?.title}</span><ChevronRight size={14}/><span className="text-gray-600">{activeLesson?.title}</span></div>
//                   {renderContent()}
//               </div>
//           </div>
//           {activeLesson?.type !== 'quiz' && activeLesson?.type !== 'essay' && activeLesson?.type !== 'upload_doc' && (
//               <div className="bg-white border-t p-4 absolute bottom-0 w-full z-20 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
//                   <div className="max-w-4xl mx-auto flex justify-end">
//                       <button onClick={handleManualComplete} className={`px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-transform active:scale-95 text-white ${completedLessonIds.includes(activeLesson?._id) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}><span>{completedLessonIds.includes(activeLesson?._id) ? 'Lanjut Berikutnya' : 'Selesai & Lanjut'}</span><span>→</span></button>
//                   </div>
//               </div>
//           )}
//       </main>

//       {/* FLOATING ACTION BUTTON CHAT */}
//       <button 
//           onClick={() => setShowGlobalChat(true)} 
//           className="fixed bottom-6 right-6 z-50 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all hover:scale-110 group"
//           title="Global Room Chat"
//           aria-label="Buka Chat Global"
//       >
//           <MessageCircle size={24} />
//           <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Chat Room</span>
//       </button>

//       {/* GLOBAL CHAT MODAL */}
//       {showGlobalChat && (
//           <RoomChatModal 
//               title="Global Room (Peserta & Fasilitator)" 
//               members={chatMembers} 
//               onClose={() => setShowGlobalChat(false)} 
//               currentUser={user}
//               themeColor="bg-red-700" 
//           />
//       )}
//     </div>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, getImageUrl, apiUpload } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import QuizPlayer from '@/components/QuizPlayer';
import { 
    Calendar, PlayCircle, CheckCircle, FileText, MessageCircle, X, Menu, Send, 
    ChevronDown, ChevronRight, Clock, UploadCloud, File, AlertCircle, Paperclip, 
    Smile, Users, Mail, ExternalLink, User
} from 'lucide-react';

// --- 1. KOMPONEN: CHAT TOAST (Notifikasi Pesan Masuk Private) ---
function ChatToast({ data, onOpen, onClose }: any) {
  useEffect(() => {
    const timer = setTimeout(onClose, 10000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-32 right-20 z-[60] animate-in slide-in-from-bottom-5 duration-300">
      <div 
        className="bg-white rounded-xl shadow-2xl border-l-4 border-l-green-500 border-y border-r border-gray-100 p-4 w-72 flex items-start gap-3 relative cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onOpen}
      >
        <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }} 
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 bg-white rounded-full"
            aria-label="Tutup notifikasi"
            title="Tutup Notifikasi"
        >
            <X size={14} />
        </button>

        <div className="relative flex-shrink-0">
            <img 
                src={getImageUrl(data.senderAvatar)} 
                alt={data.senderName} 
                className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
        </div>

        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-0.5">
                <h4 className="font-bold text-sm text-gray-800 truncate pr-4">{data.senderName}</h4>
                <span className="text-[10px] text-gray-400">Baru saja</span>
            </div>
            <p className="text-xs text-green-600 font-bold mb-0.5">Pesan Baru!</p>
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed italic">"{data.message}"</p>
        </div>
      </div>
    </div>
  );
}

// --- 2. KOMPONEN: PRIVATE CHAT MODAL (Hubungi Pengajar) ---
function ChatWithFacilitatorModal({ facilitators, initialSelectedId, unreadSenderId, onClose }: any) {
  const [selectedFacilitator, setSelectedFacilitator] = useState<any>(
    initialSelectedId 
        ? facilitators.find((f: any) => f._id === initialSelectedId)
        : (unreadSenderId 
            ? facilitators.find((f: any) => f._id === unreadSenderId) 
            : (facilitators.length === 1 ? facilitators[0] : null))
  );

  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (selectedFacilitator?._id) {
          loadHistory();
          const interval = setInterval(loadHistory, 3000); 
          return () => clearInterval(interval);
      }
  }, [selectedFacilitator]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const loadHistory = async () => {
      try {
          const res = await api(`/api/chat/${selectedFacilitator._id}`); 
          setMessages(res.messages || []);
      } catch (e) { console.error(e); }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedFacilitator) return;
    const tempMsg = { _id: Date.now(), sender: 'me', message: message, createdAt: new Date().toISOString() };
    setMessages(prev => [...prev, tempMsg]);
    setMessage('');
    setSending(true);
    try {
      await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message: tempMsg.message } });
      loadHistory(); 
    } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } 
    finally { setSending(false); }
  };

  const isMe = (msg: any) => {
      if (msg.sender === 'me') return true;
      const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
      return senderId !== selectedFacilitator._id; 
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4 animate-in fade-in zoom-in duration-200 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]">
        <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
          <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18}/> Hubungi Pengajar</h3>
          <button onClick={onClose} className="hover:bg-indigo-700 p-1.5 rounded-full transition-colors" aria-label="Tutup Chat" title="Tutup"><X size={20} /></button>
        </div>
        
        {!selectedFacilitator ? (
            <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
                <div className="p-4 bg-white border-b shadow-sm z-10"><p className="text-sm text-gray-700 font-bold">Pilih Fasilitator:</p></div>
                <div className="p-4 overflow-y-auto custom-scrollbar space-y-2 flex-1">
                    {facilitators.map((fac: any) => {
                        const isUnreadSender = fac._id === unreadSenderId;
                        return (
                            <button key={fac._id} onClick={() => setSelectedFacilitator(fac)} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left group relative ${isUnreadSender ? 'bg-green-50 border-green-500 ring-1 ring-green-500 shadow-md' : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm'}`} aria-label={`Chat dengan ${fac.name}`}>
                                <div className="relative"><img src={getImageUrl(fac.avatarUrl)} className={`w-12 h-12 rounded-full object-cover border-2 ${isUnreadSender ? 'border-green-500' : 'border-gray-200 group-hover:border-indigo-300'}`} alt={fac.name} />{isUnreadSender && (<span className="absolute -top-1 -right-1 flex h-4 w-4"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span></span>)}</div>
                                <div className="flex-1 min-w-0"><div className="flex justify-between items-center"><p className={`font-bold text-sm truncate ${isUnreadSender ? 'text-green-800' : 'text-gray-800 group-hover:text-indigo-600'}`}>{fac.name}</p>{isUnreadSender && <span className="text-[9px] font-bold text-white bg-green-600 px-2 py-0.5 rounded-full shadow-sm">Pesan Baru</span>}</div><p className="text-xs text-gray-500">{fac.role || 'Fasilitator'}</p></div>
                            </button>
                        );
                    })}
                </div>
            </div>
        ) : (
            <>
                <div className="p-3 bg-white border-b flex items-center gap-3 shadow-sm z-10">
                    <button onClick={() => setSelectedFacilitator(null)} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 text-xs font-bold flex items-center gap-1" aria-label="Kembali ke daftar">← Kembali</button>
                    <div className="flex items-center gap-2 border-l pl-3"><img src={getImageUrl(selectedFacilitator.avatarUrl)} className="w-9 h-9 rounded-full bg-gray-200 object-cover border border-gray-200" alt={selectedFacilitator.name} /><div><p className="text-sm font-bold text-gray-800 leading-tight">{selectedFacilitator.name}</p><span className="text-[10px] text-green-600 bg-green-50 px-1.5 rounded-full border border-green-100">Online</span></div></div>
                </div>
                <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
                    {messages.length === 0 ? (<div className="text-center text-gray-400 text-xs mt-10">Belum ada pesan.<br/>Mulai diskusi dengan pengajar!</div>) : (messages.map((msg: any, idx: number) => { const me = isMe(msg); return (<div key={idx} className={`flex ${me ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm relative ${me ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}><p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p><span className={`text-[9px] block text-right mt-1 ${me ? 'text-indigo-200' : 'text-gray-400'}`}>{new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span></div></div>); }))}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2"><input className="flex-1 border rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 transition-all" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus aria-label="Input pesan private" title="Input pesan private"/><button disabled={sending} type="submit" className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-transform active:scale-95 shadow-md" aria-label="Kirim Pesan Private" title="Kirim"><Send size={16}/></button></form>
            </>
        )}
      </div>
    </div>
  );
}

// --- 3. KOMPONEN: GLOBAL ROOM CHAT (STUDENT VERSION) ---
function RoomChatModal({ title, members, onClose, currentUser }: any) {
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const [mentionQuery, setMentionQuery] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const emojis = ["😀", "😂", "🥰", "😎", "🤔", "👍", "👎", "❤️", "🔥", "🎉", "📚", "✅"];

    useEffect(() => {
        setMessages([
            { id: 1, sender: 'System', text: `Selamat datang di ${title}`, time: '08:00', isMe: false, isSystem: true }
        ]);
    }, [title]);

    const handleSend = (e: any) => {
        e.preventDefault();
        if(!newMessage.trim()) return;
        setMessages(prev => [...prev, { id: Date.now(), sender: currentUser?.name || 'Saya', text: newMessage, time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), isMe: true }]);
        setNewMessage(''); setShowEmoji(false); setMentionQuery(null);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMessages(prev => [...prev, { id: Date.now(), sender: currentUser?.name || 'Saya', text: `Mengirim file: ${file.name}`, isAttachment: true, time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), isMe: true }]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setNewMessage(val);
        const lastWord = val.split(' ').pop();
        if (lastWord && lastWord.startsWith('@') && lastWord.length > 1) { setMentionQuery(lastWord.substring(1)); } else { setMentionQuery(null); }
    };

    const addEmoji = (emoji: string) => { setNewMessage(prev => prev + emoji); inputRef.current?.focus(); };
    const addMention = (name: string) => { const words = newMessage.split(' '); words.pop(); setNewMessage(words.join(' ') + ` @${name} `); setMentionQuery(null); inputRef.current?.focus(); };
    const filteredMembers = mentionQuery ? members.filter((m: any) => (m.name || 'User').toLowerCase().includes(mentionQuery.toLowerCase())) : [];

    return (
        <div className="fixed inset-0 bg-black/60 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-5xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative">
                <div className="bg-red-700 p-4 text-white flex justify-between items-center shadow-md shrink-0">
                    <div className="flex items-center gap-3"><div className="bg-white/20 p-2 rounded-full"><MessageCircle size={20} aria-hidden="true"/></div><div><h3 className="font-bold text-lg">{title}</h3><p className="text-[10px] opacity-90">{members.length} Anggota Online</p></div></div>
                    <button type="button" onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Tutup Chat" title="Tutup"><X size={24}/></button>
                </div>
                <div className="flex flex-1 overflow-hidden relative">
                    <div className="flex-1 flex flex-col bg-gray-100 relative">
                        <div className="flex-1 p-4 overflow-y-auto space-y-4" onClick={() => { setShowEmoji(false); setMentionQuery(null); }}>
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.isSystem ? 'justify-center' : (msg.isMe ? 'justify-end' : 'justify-start')}`}>
                                    {msg.isSystem ? (<span className="text-xs bg-gray-300 text-gray-600 px-3 py-1 rounded-full font-medium">{msg.text}</span>) : (<div className={`max-w-[75%] flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}><div className={`px-4 py-2.5 rounded-xl text-sm shadow-sm ${msg.isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border'}`}>{!msg.isMe && <div className="text-[10px] font-bold opacity-70 mb-1 text-blue-600">{msg.sender}</div>}{msg.isAttachment ? (<div className="flex items-center gap-2 italic bg-black/10 p-2 rounded"><Paperclip size={16}/> {msg.text}</div>) : (<p className="leading-relaxed">{msg.text}</p>)}</div><span className="text-[10px] text-gray-400 mt-1 mx-1">{msg.time}</span></div>)}
                                </div>
                            ))}
                            <div ref={messagesEndRef}/>
                        </div>
                        {mentionQuery !== null && filteredMembers.length > 0 && (<div className="absolute bottom-20 left-4 bg-white border shadow-xl rounded-lg max-h-40 overflow-y-auto w-64 z-20 animate-in slide-in-from-bottom-2">{filteredMembers.map((m: any, i: number) => (<button type="button" key={i} onClick={() => addMention(m.name)} className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm flex items-center gap-2 border-b last:border-0"><div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold shrink-0">{m.name?.charAt(0)}</div><span className="truncate">{m.name}</span></button>))}</div>)}
                        {showEmoji && (<div className="absolute bottom-16 left-2 bg-white border shadow-xl rounded-xl p-3 grid grid-cols-4 gap-2 z-20 w-64 animate-in zoom-in-95">{emojis.map(e => (<button type="button" key={e} onClick={() => addEmoji(e)} className="text-2xl hover:bg-gray-100 p-2 rounded transition">{e}</button>))}</div>)}
                        <div className="p-3 bg-white border-t flex gap-2 items-center relative z-10">
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} title="Lampirkan File" aria-label="Lampirkan File"/>
                            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100" aria-label="Tombol Lampirkan File" title="Lampirkan File"><Paperclip size={20}/></button>
                            <button type="button" onClick={() => setShowEmoji(!showEmoji)} className={`p-2 rounded-full transition-colors ${showEmoji ? 'bg-yellow-100 text-yellow-600' : 'text-gray-400 hover:text-gray-600'}`} aria-label="Emoticon" title="Emoticon"><Smile size={24}/></button>
                            <form onSubmit={handleSend} className="flex-1 flex gap-2"><input ref={inputRef} className="flex-1 bg-gray-100 border-0 rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="Ketik pesan... (@ mention)" value={newMessage} onChange={handleInputChange} aria-label="Input pesan chat" title="Input pesan chat"/><button type="submit" className="bg-red-700 text-white p-3 rounded-full hover:opacity-90 shadow-lg transition-transform active:scale-95 disabled:opacity-50" disabled={!newMessage.trim()} aria-label="Kirim" title="Kirim"><Send size={18}/></button></form>
                        </div>
                    </div>
                    {/* [FIX] Hidden on Mobile, Flex on Desktop */}
                    <div className="w-72 bg-white border-l border-gray-200 flex-col shrink-0 hidden md:flex">
                        <div className="p-4 border-b bg-gray-50"><h4 className="font-bold text-gray-700 flex items-center gap-2 text-sm"><Users size={16}/> Anggota ({members.length})</h4></div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                            {members.map((member: any, idx: number) => {
                                const isFacilitator = member.role === 'Facilitator' || member.role === 'SUPER_ADMIN';
                                return (
                                    <div key={idx} className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors group cursor-default">
                                        <div className="relative shrink-0">{member.avatarUrl ? (<img src={getImageUrl(member.avatarUrl)} alt={member.name} className="w-8 h-8 rounded-full object-cover border border-gray-200" />) : (<div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${isFacilitator ? 'bg-orange-100 text-orange-600 border-orange-200' : 'bg-green-100 text-green-600 border-green-200'}`}>{member.name?.charAt(0).toUpperCase()}</div>)}<span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-white rounded-full"></span></div>
                                        <div className="flex-1 min-w-0"><p className="text-sm font-bold text-gray-800 truncate">{member.name}</p><p className={`text-[10px] truncate ${isFacilitator ? 'text-orange-600 font-bold' : 'text-gray-500'}`}>{isFacilitator ? 'Fasilitator' : 'Peserta'}</p></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- MAIN PAGE COMPONENT ---
export default function StudentCoursePlayPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const { courseId } = params as { courseId: string };

  const [course, setCourse] = useState<any>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<string[]>([]); 

  // State Private Chat (Hubungi Pengajar)
  const [showPrivateChat, setShowPrivateChat] = useState(false);
  const [chatableFacilitators, setChatableFacilitators] = useState<any[]>([]);
  const [unreadSenderId, setUnreadSenderId] = useState<string | null>(null);
  const [toastData, setToastData] = useState<any>(null);
  const lastMsgIdRef = useRef<string | null>(null);

  // State Global Chat & Content
  const [showGlobalChat, setShowGlobalChat] = useState(false);
  const [chatMembers, setChatMembers] = useState<any[]>([]);
  
  // State Esai & Upload
  const [essayAnswers, setEssayAnswers] = useState<{[key: string]: string}>({});
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File | null}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [resCourse, resProgress] = await Promise.all([
            api(`/api/courses/${courseId}`),
            api(`/api/progress/${courseId}`).catch(() => ({ completedLessons: [] }))
        ]);

        const courseData = resCourse.course || resCourse;
        setCourse(courseData);
        
        // [FIX] Mengambil data progress dengan benar untuk menghindari 0% jika sudah ada
        const completed = resProgress.completedLessons || [];
        setCompletedLessonIds(completed);

        // --- 1. LOAD FASILITATOR (Untuk Private Chat) ---
        if (courseData.facilitatorIds && Array.isArray(courseData.facilitatorIds)) {
            const validFacs = courseData.facilitatorIds.filter((f: any) => f && f.name && f._id !== user?.id);
            setChatableFacilitators(validFacs);
        }

        // --- 2. LOAD GLOBAL CHAT MEMBERS (Fasilitator + Peserta) ---
        let membersList = [];
        
        // Masukkan Fasilitator
        if (courseData.facilitatorIds && Array.isArray(courseData.facilitatorIds)) {
            const facs = courseData.facilitatorIds.map((f: any) => ({
                name: f.name || 'Fasilitator',
                avatarUrl: f.avatarUrl,
                role: 'Facilitator',
                id: f._id
            }));
            membersList.push(...facs);
        }
        
        // Masukkan Peserta
        try {
            const resParts = await api(`/api/courses/${courseId}/participants`);
            const parts = resParts.participants || resParts.data || [];
            const students = parts.map((p: any) => {
                const u = p.user || p.student || p;
                return {
                    name: u.name || 'Peserta',
                    avatarUrl: u.avatarUrl,
                    role: 'Student',
                    id: u._id
                };
            });
            membersList.push(...students);
        } catch (err) { console.error("Gagal load peserta chat"); }
        
        // Hapus Duplikat & Set State
        const uniqueMembers = Array.from(new Map(membersList.map(m => [m.id, m])).values());
        setChatMembers(uniqueMembers);

        // Set Active Lesson
        if (courseData.modules?.[0]) {
            setExpandedModules([courseData.modules[0]._id]);
            if (courseData.modules[0].lessons?.[0]) {
                setActiveLesson(courseData.modules[0].lessons[0]);
            }
        }
    
      } catch (e: any) { console.error(e); } finally { setLoading(false); }
    };
    if (courseId && user) loadData();
  }, [courseId, user]);

  // Polling Private Chat
  useEffect(() => {
      if (!user) return;
      const checkNewMessages = async () => {
          try {
              const res = await api('/api/chat/conversations');
              if (res.conversations && res.conversations.length > 0) {
                  const latestConv = res.conversations[0];
                  const latestMsg = latestConv.lastMessage;
                  if (!latestMsg) return;
                  const senderId = typeof latestMsg.sender === 'object' ? latestMsg.sender._id : latestMsg.sender;
                  if (senderId !== user.id) {
                      setUnreadSenderId(senderId); 
                      if (latestMsg._id !== lastMsgIdRef.current) {
                          lastMsgIdRef.current = latestMsg._id;
                          if (!showPrivateChat) {
                              setToastData({
                                  senderId,
                                  senderName: latestConv.user?.name || 'Pengajar',
                                  senderAvatar: latestConv.user?.avatarUrl,
                                  message: latestMsg.message
                              });
                          }
                      }
                  }
              }
          } catch (e) { /* Silent */ }
      };
      checkNewMessages(); 
      const interval = setInterval(checkNewMessages, 5000);
      return () => clearInterval(interval);
  }, [user, showPrivateChat]);

  // PROGRESS CALCULATOR
  useEffect(() => {
    if (course) {
        let total = 0; let completed = 0;
        course.modules.forEach((m: any) => {
            if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) { total++; if (completedLessonIds.includes(l._id)) completed++; } });
        });
        // [FIX] Update Progress Percent Realtime
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
        setProgressPercent(percent);
    }
  }, [completedLessonIds, course]);

  const toggleModule = (modId: string) => {
      setExpandedModules(prev => prev.includes(modId) ? prev.filter(id => id !== modId) : [...prev, modId]);
  };

  const markLessonAsComplete = async (lessonId: string) => {
    if (!completedLessonIds.includes(lessonId)) {
        try {
            await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId } });
            setCompletedLessonIds(prev => [...prev, lessonId]);
        } catch(e) { console.error(e); }
    }
  };

  const handleNextLesson = () => {
    const allLessons: any[] = [];
    course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
    const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
    if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
    else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
  };

  const handleManualComplete = async () => { await markLessonAsComplete(activeLesson._id); handleNextLesson(); };
  const handleQuizCompleted = async () => { await markLessonAsComplete(activeLesson._id); };

  // --- LOGIC ESAI & UPLOAD ---
  const handleEssayChange = (qIndex: number, val: string) => {
      setEssayAnswers(prev => ({ ...prev, [`${activeLesson._id}-${qIndex}`]: val }));
  };

  const submitEssay = async () => {
      if (!confirm("Kirim jawaban esai?")) return;
      setIsSubmitting(true);
      try {
          const answers = activeLesson.questions.map((q: any, idx: number) => ({
              question: q.question,
              answer: essayAnswers[`${activeLesson._id}-${idx}`] || ''
          }));
          await api(`/api/progress/${courseId}/submit-essay`, { method: 'POST', body: { lessonId: activeLesson._id, answers } });
          alert("Jawaban terkirim!");
          await markLessonAsComplete(activeLesson._id);
      } catch (e: any) { alert("Gagal kirim: " + e.message); } 
      finally { setIsSubmitting(false); }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
          setUploadedFiles(prev => ({ ...prev, [activeLesson._id]: e.target.files![0] }));
      }
  };

  const submitTask = async () => {
      const file = uploadedFiles[activeLesson._id];
      if (!file) return alert("Pilih file dulu!");
      if (!confirm("Kumpulkan tugas ini?")) return;
      setIsSubmitting(true);
      try {
          const fd = new FormData();
          fd.append('file', file);
          const uploadRes = await apiUpload('/api/upload', fd); 
          await api(`/api/progress/${courseId}/submit-task`, { method: 'POST', body: { lessonId: activeLesson._id, fileUrl: uploadRes.url || uploadRes.file.url, fileName: file.name } });
          alert("Tugas berhasil dikumpulkan!");
          await markLessonAsComplete(activeLesson._id);
      } catch (e: any) { alert("Gagal kumpul tugas: " + e.message); }
      finally { setIsSubmitting(false); }
  };

  const renderContent = () => {
    if (!activeLesson) return null;
    
    // --- 1. ESAI RENDERER ---
    const isEssay = activeLesson.type === 'essay' || (activeLesson.type === 'quiz' && activeLesson.questions?.[0]?.options?.length === 0);
    if (isEssay) {
        return (
            <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r shadow-sm">
                    <h3 className="font-bold text-blue-800 text-lg mb-1 flex items-center gap-2">📝 Tugas Esai</h3>
                    <p className="text-sm text-blue-600">Jawab pertanyaan berikut. {activeLesson.quizDuration ? `Waktu pengerjaan: ${activeLesson.quizDuration} menit.` : ''}</p>
                </div>
                <div className="space-y-6">
                    {activeLesson.questions?.map((q: any, idx: number) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <p className="font-bold text-gray-800 mb-3 text-lg">{idx + 1}. {q.question}</p>
                            <textarea 
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[150px] text-gray-700 leading-relaxed"
                                placeholder="Tulis jawaban Anda di sini..."
                                value={essayAnswers[`${activeLesson._id}-${idx}`] || ''}
                                onChange={(e) => handleEssayChange(idx, e.target.value)}
                                disabled={completedLessonIds.includes(activeLesson._id)}
                                aria-label={`Jawaban untuk pertanyaan ${idx + 1}`}
                            />
                        </div>
                    ))}
                </div>
                {!completedLessonIds.includes(activeLesson._id) ? (
                    <div className="flex justify-end"><button type="button" onClick={submitEssay} disabled={isSubmitting} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-transform active:scale-95 disabled:opacity-50 flex items-center gap-2">{isSubmitting ? 'Mengirim...' : 'Kirim Jawaban'} <Send size={18}/></button></div>
                ) : (
                    <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 font-bold text-center flex items-center justify-center gap-2"><CheckCircle size={20}/> Jawaban telah dikirim.</div>
                )}
            </div>
        );
    }

    // --- 2. UPLOAD TUGAS RENDERER ---
    if (activeLesson.type === 'upload_doc') {
        return (
            <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><UploadCloud size={24}/></div>
                        <div><h3 className="text-xl font-bold text-gray-800">Pengumpulan Tugas</h3><p className="text-sm text-gray-500">Silakan unduh soal/instruksi dan upload hasil pekerjaan.</p></div>
                    </div>
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <h4 className="font-bold text-gray-700 mb-2">Instruksi:</h4>
                        <div className="prose text-sm text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: activeLesson.content || '-' }} />
                        {activeLesson.fileUrl && (
                            <a href={activeLesson.fileUrl} target="_blank" className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"><File size={16} className="text-red-500"/> Download Dokumen Soal</a>
                        )}
                    </div>
                    {!completedLessonIds.includes(activeLesson._id) ? (
                        <div className="border-2 border-dashed border-indigo-200 rounded-xl p-8 text-center hover:bg-indigo-50/50 transition-colors relative">
                            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.rar" title="Pilih File Tugas" aria-label="Pilih File Tugas"/>
                            <div className="pointer-events-none">
                                {uploadedFiles[activeLesson._id] ? (
                                    <div className="text-green-600 font-bold flex flex-col items-center"><FileText size={48} className="mb-2"/>{uploadedFiles[activeLesson._id]?.name}<span className="text-xs font-normal text-gray-500 mt-1">Klik untuk ganti file</span></div>
                                ) : (
                                    <div className="text-gray-400 flex flex-col items-center"><UploadCloud size={48} className="mb-2 text-indigo-300"/><p className="font-bold text-indigo-600">Klik atau Drag file ke sini</p><p className="text-xs mt-1">Mendukung PDF, Word, PPT, ZIP (Max 10MB)</p></div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 bg-green-50 rounded-xl border border-green-200 text-center"><div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-3"><CheckCircle size={32}/></div><h3 className="font-bold text-green-800 text-lg">Tugas Berhasil Dikumpulkan!</h3><p className="text-green-600 text-sm">Fasilitator akan segera memeriksa tugas Anda.</p></div>
                    )}
                    {!completedLessonIds.includes(activeLesson._id) && (
                        <div className="mt-6 flex justify-end"><button type="button" onClick={submitTask} disabled={!uploadedFiles[activeLesson._id] || isSubmitting} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95">{isSubmitting ? 'Mengupload...' : 'Kumpulkan Tugas'}</button></div>
                    )}
                </div>
            </div>
        );
    }

    // --- 3. GOOGLE CLASSROOM ---
    if (activeLesson.type === 'google_classroom') {
         return (
             <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100 text-center space-y-6">
                 <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-5xl shadow-inner border border-green-100">🏫</div>
                 <div><h3 className="text-2xl font-bold text-gray-800 mb-2">Google Classroom</h3><p className="text-gray-500 max-w-lg mx-auto leading-relaxed">Materi ini diselenggarakan di Google Classroom. <br/>Kelas: <strong className="text-green-700">{activeLesson.classroomData?.name || 'Nama Kelas'}</strong></p></div>
                 <a href={activeLesson.classroomData?.alternateLink || '#'} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:bg-green-700 hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-2" onClick={(e) => { if(!activeLesson.classroomData?.alternateLink) { e.preventDefault(); alert("Link kelas belum tersedia."); } }}>Masuk ke Kelas <ExternalLink size={16}/></a>
             </div>
         );
    }

    // --- 4. VIDEO & QUIZ ---
    if (activeLesson.type === 'video_url') {
         let embedUrl = activeLesson.videoUrl;
         if (activeLesson.videoUrl?.includes('youtube.com') || activeLesson.videoUrl?.includes('youtu.be')) {
             const vId = activeLesson.videoUrl.split(activeLesson.videoUrl.includes('v=') ? 'v=' : '/').pop().split('&')[0];
             embedUrl = `https://www.youtube.com/embed/${vId}`;
         }
         return (
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg"><iframe src={embedUrl} className="w-full h-full" allowFullScreen title={`Video: ${activeLesson.title}`}/></div>
         );
    }
    
    if (activeLesson.type === 'quiz') return <QuizPlayer quizId={activeLesson._id} courseId={courseId} onComplete={handleQuizCompleted} />;

    // --- DEFAULT / TEXT ---
    return <div className="prose max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-100 leading-loose text-gray-700" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />;
  };

  if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;
  const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;

  return (
    <div className="flex h-screen flex-col md:flex-row bg-[#F8FAFC] font-sans">
      
      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 flex flex-col md:relative absolute z-40 h-full shadow-2xl md:shadow-none`}>
          <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
              <Link href="/courses" className="text-xs font-bold text-gray-400 hover:text-indigo-600 mb-4 flex items-center gap-1 uppercase tracking-wider transition-colors"><span>←</span> Kembali ke Katalog</Link>
              <h2 className="font-extrabold text-gray-800 text-xl leading-tight mb-6">{course?.title}</h2>
              <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 relative">
                  <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-gray-500 uppercase">Progress</span>
                      {/* [FIX] Compact Icon Button for Private Chat */}
                      <div className="flex items-center gap-2">
                         <button 
                             onClick={() => setShowPrivateChat(true)}
                             className="bg-white text-indigo-600 p-1.5 rounded-full border border-indigo-200 shadow-sm hover:bg-indigo-50 relative group transition-all"
                             aria-label="Hubungi Pengajar"
                             title="Hubungi Pengajar (Private Chat)"
                         >
                             <MessageCircle size={16}/>
                             {unreadSenderId && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>}
                         </button>
                         <span className="text-lg font-black text-indigo-600">{safePercent}%</span>
                      </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-700" style={{ width: `${safePercent}%` }}></div>
                  </div>
              </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
              {course?.modules?.map((module: any, mIdx: number) => {
                  const isExpanded = expandedModules.includes(module._id);
                  return (
                      <div key={module._id} className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
                          {/* [FIX] ARIA-EXPANDED STRING */}
                          <button onClick={() => toggleModule(module._id)} className="w-full flex items-center justify-between p-4 text-left bg-gray-50/50 hover:bg-gray-100 transition-colors" aria-expanded={isExpanded ? "true" : "false"}>
                              <div><h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">MODUL {mIdx + 1}</h3><h4 className="font-bold text-gray-800 text-sm">{module.title}</h4></div>
                              {isExpanded ? <ChevronDown size={16} className="text-gray-400"/> : <ChevronRight size={16} className="text-gray-400"/>}
                          </button>
                          {isExpanded && (
                              <div className="divide-y divide-gray-50">
                                  {module.lessons?.map((lesson: any) => {
                                      const isActive = activeLesson?._id === lesson._id;
                                      const isCompleted = completedLessonIds.includes(lesson._id);
                                      let TypeIcon = FileText;
                                      if (lesson.type === 'video_url') TypeIcon = PlayCircle;
                                      if (lesson.type === 'quiz' || lesson.type === 'essay') TypeIcon = AlertCircle;
                                      if (lesson.type === 'upload_doc') TypeIcon = UploadCloud;
                                      return (
                                          <button key={lesson._id} onClick={() => { setActiveLesson(lesson); if(window.innerWidth < 768) setIsSidebarOpen(false); }} className={`w-full flex items-start gap-3 p-3.5 pl-5 text-left transition-all relative ${isActive ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}>
                                              {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r-full"></div>}
                                              <div className={`mt-0.5 ${isCompleted ? 'text-green-500' : isActive ? 'text-indigo-600' : 'text-gray-300'}`}>{isCompleted ? <CheckCircle size={16} fill="currentColor" className="text-white"/> : <div className="w-4 h-4 rounded-full border-2 border-current"></div>}</div>
                                              <div className="flex-1 min-w-0">
                                                  <p className={`text-sm font-medium truncate ${isActive ? 'text-indigo-700' : 'text-gray-600'}`}>{lesson.title}</p>
                                                  <div className="flex flex-col gap-0.5 mt-1">
                                                      <div className="flex items-center gap-2">
                                                          <TypeIcon size={12} className={isActive ? 'text-indigo-400' : 'text-gray-400'}/>
                                                          <span className="text-[10px] text-gray-400 uppercase">{lesson.type === 'google_classroom' ? 'E-Class' : lesson.type}</span>
                                                          {/* [FIX] RESTORED: Date & Facilitator Metadata */}
                                                          {lesson.jp > 0 && <span className="text-[9px] bg-gray-100 px-1 rounded text-gray-500">{lesson.jp} JP</span>}
                                                          {lesson.scheduleDate && (
                                                              <span className="text-[9px] bg-blue-50 text-blue-600 px-1 rounded">
                                                                  {new Date(lesson.scheduleDate).toLocaleDateString('id-ID', {day: '2-digit', month: '2-digit', year: 'numeric'})}
                                                              </span>
                                                          )}
                                                          {(lesson.facilitatorId || lesson.facilitator) && (
                                                              <span className="text-[9px] bg-purple-50 text-purple-600 px-1 rounded font-bold truncate max-w-[80px]">
                                                                  {lesson.facilitatorId?.name || lesson.facilitator?.name || 'Fasil'}
                                                              </span>
                                                          )}
                                                      </div>
                                                  </div>
                                              </div>
                                          </button>
                                      );
                                  })}
                              </div>
                          )}
                      </div>
                  );
              })}
          </div>
      </aside>
      
      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col relative h-full overflow-hidden w-full">
          <div className="md:hidden p-4 bg-white border-b flex justify-between items-center z-20 shadow-sm">
              <h1 className="font-bold text-gray-800 truncate text-sm max-w-[200px]">{activeLesson?.title}</h1>
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-100 rounded-lg text-gray-600" aria-label="Menu"><Menu size={20}/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 md:p-10 pb-32 w-full custom-scrollbar">
              <div className="max-w-5xl mx-auto">
                  <div className="hidden md:flex items-center gap-2 text-sm text-gray-400 mb-6 font-medium"><span>{course?.title}</span><ChevronRight size={14}/><span className="text-gray-600">{activeLesson?.title}</span></div>
                  {renderContent()}
              </div>
          </div>
          {activeLesson?.type !== 'quiz' && activeLesson?.type !== 'essay' && activeLesson?.type !== 'upload_doc' && (
              <div className="bg-white border-t p-4 absolute bottom-0 w-full z-20 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
                  <div className="max-w-4xl mx-auto flex justify-end">
                      <button onClick={handleManualComplete} className={`px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-transform active:scale-95 text-white ${completedLessonIds.includes(activeLesson?._id) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}><span>{completedLessonIds.includes(activeLesson?._id) ? 'Lanjut Berikutnya' : 'Selesai & Lanjut'}</span><span>→</span></button>
                  </div>
              </div>
          )}
      </main>

      {/* FABs STACK */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
          {/* Private Chat FAB */}
          <button 
              onClick={() => setShowPrivateChat(true)} 
              className="bg-white text-indigo-600 p-3 rounded-full shadow-lg hover:bg-indigo-50 border border-indigo-200 transition-all hover:scale-105 group relative"
              title="Hubungi Pengajar"
              aria-label="Hubungi Pengajar"
          >
              <MessageCircle size={20} />
              {unreadSenderId && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-bounce"></span>}
          </button>
          
          {/* Global Chat FAB */}
          <button 
              onClick={() => setShowGlobalChat(true)} 
              className="bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all hover:scale-110 group relative"
              title="Global Room Chat"
              aria-label="Buka Chat Global"
          >
              <MessageCircle size={24} />
          </button>
      </div>

      {/* MODALS */}
      {showGlobalChat && <RoomChatModal title="Global Room (Peserta & Fasilitator)" members={chatMembers} onClose={() => setShowGlobalChat(false)} currentUser={user} />}
      {showPrivateChat && <ChatWithFacilitatorModal facilitators={chatableFacilitators} unreadSenderId={unreadSenderId} initialSelectedId={toastData?.senderId} onClose={() => { setShowPrivateChat(false); setToastData(null); }} />}
      {toastData && !showPrivateChat && <ChatToast data={toastData} onOpen={() => { setToastData(null); setShowPrivateChat(true); }} onClose={() => setToastData(null)} />}
    </div>
  );
}

// // // // // // // // // 'use client';

// // // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // // import Link from 'next/link';
// // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // // // // // // import { Calendar, PlayCircle, CheckCircle, FileText, MessageCircle, X, Menu, Send } from 'lucide-react';

// // // // // // // // // // --- 1. KOMPONEN TOAST NOTIFIKASI CHAT ---
// // // // // // // // // function ChatToast({ data, onOpen, onClose }: any) {
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const timer = setTimeout(onClose, 10000);
// // // // // // // // //     return () => clearTimeout(timer);
// // // // // // // // //   }, [onClose]);

// // // // // // // // //   return (
// // // // // // // // //     <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
// // // // // // // // //       <div 
// // // // // // // // //         className="bg-white rounded-xl shadow-2xl border-l-4 border-l-green-500 border-y border-r border-gray-100 p-4 w-80 flex items-start gap-3 relative cursor-pointer hover:bg-gray-50 transition-colors"
// // // // // // // // //         onClick={onOpen}
// // // // // // // // //       >
// // // // // // // // //         <button 
// // // // // // // // //             onClick={(e) => { e.stopPropagation(); onClose(); }} 
// // // // // // // // //             className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 bg-white rounded-full"
// // // // // // // // //             aria-label="Tutup notifikasi"
// // // // // // // // //         >
// // // // // // // // //             <X size={14} />
// // // // // // // // //         </button>

// // // // // // // // //         <div className="relative flex-shrink-0">
// // // // // // // // //             <img 
// // // // // // // // //                 src={getImageUrl(data.senderAvatar)} 
// // // // // // // // //                 alt={data.senderName} 
// // // // // // // // //                 className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
// // // // // // // // //             />
// // // // // // // // //             <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
// // // // // // // // //         </div>

// // // // // // // // //         <div className="flex-1 min-w-0">
// // // // // // // // //             <div className="flex justify-between items-center mb-0.5">
// // // // // // // // //                 <h4 className="font-bold text-sm text-gray-800 truncate pr-4">{data.senderName}</h4>
// // // // // // // // //                 <span className="text-[10px] text-gray-400">Baru saja</span>
// // // // // // // // //             </div>
// // // // // // // // //             <p className="text-xs text-green-600 font-bold mb-0.5">Pesan Baru!</p>
// // // // // // // // //             <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed italic">
// // // // // // // // //                 "{data.message}"
// // // // // // // // //             </p>
// // // // // // // // //             <div className="mt-2 text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
// // // // // // // // //                 Balas Sekarang <span>→</span>
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // // --- 2. KOMPONEN MODAL CHAT ---
// // // // // // // // // function ChatWithFacilitatorModal({ facilitators, initialSelectedId, unreadSenderId, onClose }: any) {
// // // // // // // // //   const [selectedFacilitator, setSelectedFacilitator] = useState<any>(
// // // // // // // // //     initialSelectedId 
// // // // // // // // //         ? facilitators.find((f: any) => f._id === initialSelectedId)
// // // // // // // // //         : (unreadSenderId 
// // // // // // // // //             ? facilitators.find((f: any) => f._id === unreadSenderId) 
// // // // // // // // //             : (facilitators.length === 1 ? facilitators[0] : null))
// // // // // // // // //   );

// // // // // // // // //   const [messages, setMessages] = useState<any[]>([]);
// // // // // // // // //   const [message, setMessage] = useState('');
// // // // // // // // //   const [sending, setSending] = useState(false);
// // // // // // // // //   const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //       if (selectedFacilitator?._id) {
// // // // // // // // //           loadHistory();
// // // // // // // // //           const interval = setInterval(loadHistory, 3000); 
// // // // // // // // //           return () => clearInterval(interval);
// // // // // // // // //       }
// // // // // // // // //   }, [selectedFacilitator]);

// // // // // // // // //   useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// // // // // // // // //   const loadHistory = async () => {
// // // // // // // // //       try {
// // // // // // // // //           const res = await api(`/api/chat/${selectedFacilitator._id}`); 
// // // // // // // // //           setMessages(res.messages || []);
// // // // // // // // //       } catch (e) { console.error(e); }
// // // // // // // // //   };

// // // // // // // // //   const handleSend = async (e: React.FormEvent) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     if (!message.trim() || !selectedFacilitator) return;
    
// // // // // // // // //     const tempMsg = { _id: Date.now(), sender: 'me', message: message, createdAt: new Date().toISOString() };
// // // // // // // // //     setMessages(prev => [...prev, tempMsg]);
// // // // // // // // //     setMessage('');
// // // // // // // // //     setSending(true);

// // // // // // // // //     try {
// // // // // // // // //       await api('/api/chat/send', {
// // // // // // // // //         method: 'POST',
// // // // // // // // //         body: { recipientId: selectedFacilitator._id, message: tempMsg.message }
// // // // // // // // //       });
// // // // // // // // //       loadHistory(); 
// // // // // // // // //     } catch (error: any) {
// // // // // // // // //       alert("Gagal kirim pesan: " + error.message);
// // // // // // // // //     } finally {
// // // // // // // // //       setSending(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const isMe = (msg: any) => {
// // // // // // // // //       if (msg.sender === 'me') return true;
// // // // // // // // //       const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
// // // // // // // // //       return senderId !== selectedFacilitator._id; 
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in duration-200 backdrop-blur-sm">
// // // // // // // // //       <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]">
// // // // // // // // //         {/* Header Modal */}
// // // // // // // // //         <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
// // // // // // // // //           <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18}/> Hubungi Pengajar</h3>
// // // // // // // // //           <button onClick={onClose} className="hover:bg-indigo-700 p-1.5 rounded-full transition-colors" aria-label="Tutup Chat">
// // // // // // // // //             <X size={20} />
// // // // // // // // //           </button>
// // // // // // // // //         </div>
        
// // // // // // // // //         {!selectedFacilitator ? (
// // // // // // // // //             <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
// // // // // // // // //                 <div className="p-4 bg-white border-b shadow-sm z-10">
// // // // // // // // //                     <p className="text-sm text-gray-700 font-bold">Pilih Fasilitator untuk diskusi:</p>
// // // // // // // // //                     <p className="text-xs text-gray-500">Klik nama pengajar untuk memulai chat.</p>
// // // // // // // // //                 </div>
// // // // // // // // //                 <div className="p-4 overflow-y-auto custom-scrollbar space-y-2 flex-1">
// // // // // // // // //                     {facilitators.map((fac: any) => {
// // // // // // // // //                         const isUnreadSender = fac._id === unreadSenderId;
// // // // // // // // //                         return (
// // // // // // // // //                             <button 
// // // // // // // // //                                 key={fac._id} 
// // // // // // // // //                                 onClick={() => setSelectedFacilitator(fac)} 
// // // // // // // // //                                 className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left group relative
// // // // // // // // //                                     ${isUnreadSender ? 'bg-green-50 border-green-500 ring-1 ring-green-500 shadow-md' : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm'}
// // // // // // // // //                                 `}
// // // // // // // // //                             >
// // // // // // // // //                                 <div className="relative">
// // // // // // // // //                                     <img src={getImageUrl(fac.avatarUrl)} className={`w-12 h-12 rounded-full object-cover border-2 ${isUnreadSender ? 'border-green-500' : 'border-gray-200 group-hover:border-indigo-300'}`} alt={fac.name} />
// // // // // // // // //                                     {isUnreadSender && (
// // // // // // // // //                                         <span className="absolute -top-1 -right-1 flex h-4 w-4">
// // // // // // // // //                                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
// // // // // // // // //                                             <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
// // // // // // // // //                                         </span>
// // // // // // // // //                                     )}
// // // // // // // // //                                 </div>
// // // // // // // // //                                 <div className="flex-1 min-w-0">
// // // // // // // // //                                     <div className="flex justify-between items-center">
// // // // // // // // //                                         <p className={`font-bold text-sm truncate ${isUnreadSender ? 'text-green-800' : 'text-gray-800 group-hover:text-indigo-600'}`}>{fac.name}</p>
// // // // // // // // //                                         {isUnreadSender && <span className="text-[9px] font-bold text-white bg-green-600 px-2 py-0.5 rounded-full shadow-sm">Pesan Baru</span>}
// // // // // // // // //                                     </div>
// // // // // // // // //                                     <p className="text-xs text-gray-500">{fac.role || 'Fasilitator'}</p>
// // // // // // // // //                                 </div>
// // // // // // // // //                             </button>
// // // // // // // // //                         );
// // // // // // // // //                     })}
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //         ) : (
// // // // // // // // //             <>
// // // // // // // // //                 <div className="p-3 bg-white border-b flex items-center gap-3 shadow-sm z-10">
// // // // // // // // //                     <button onClick={() => setSelectedFacilitator(null)} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 text-xs font-bold flex items-center gap-1">
// // // // // // // // //                         ← Kembali
// // // // // // // // //                     </button>
// // // // // // // // //                     <div className="flex items-center gap-2 border-l pl-3">
// // // // // // // // //                         <img src={getImageUrl(selectedFacilitator.avatarUrl)} className="w-9 h-9 rounded-full bg-gray-200 object-cover border border-gray-200" alt={selectedFacilitator.name} />
// // // // // // // // //                         <div>
// // // // // // // // //                             <p className="text-sm font-bold text-gray-800 leading-tight">{selectedFacilitator.name}</p>
// // // // // // // // //                             <span className="text-[10px] text-green-600 bg-green-50 px-1.5 rounded-full border border-green-100">Online</span>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
                
// // // // // // // // //                 <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// // // // // // // // //                     {messages.length === 0 ? (
// // // // // // // // //                         <div className="text-center text-gray-400 text-xs mt-10">Belum ada pesan.<br/>Mulai diskusi dengan pengajar!</div>
// // // // // // // // //                     ) : (
// // // // // // // // //                         messages.map((msg: any, idx: number) => {
// // // // // // // // //                             const me = isMe(msg);
// // // // // // // // //                             return (
// // // // // // // // //                                 <div key={idx} className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
// // // // // // // // //                                     <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm relative ${me ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>
// // // // // // // // //                                         <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
// // // // // // // // //                                         <span className={`text-[9px] block text-right mt-1 ${me ? 'text-indigo-200' : 'text-gray-400'}`}>
// // // // // // // // //                                             {new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
// // // // // // // // //                                         </span>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 </div>
// // // // // // // // //                             );
// // // // // // // // //                         })
// // // // // // // // //                     )}
// // // // // // // // //                     <div ref={messagesEndRef} />
// // // // // // // // //                 </div>

// // // // // // // // //                 <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
// // // // // // // // //                     <input 
// // // // // // // // //                         className="flex-1 border rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 transition-all"
// // // // // // // // //                         placeholder="Tulis pesan..."
// // // // // // // // //                         value={message}
// // // // // // // // //                         onChange={e => setMessage(e.target.value)}
// // // // // // // // //                         autoFocus
// // // // // // // // //                     />
// // // // // // // // //                     <button 
// // // // // // // // //                         disabled={sending} 
// // // // // // // // //                         type="submit" 
// // // // // // // // //                         className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-transform active:scale-95 shadow-md"
// // // // // // // // //                         aria-label="Kirim Pesan"
// // // // // // // // //                     >
// // // // // // // // //                         <Send size={16}/>
// // // // // // // // //                     </button>
// // // // // // // // //                 </form>
// // // // // // // // //             </>
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // // --- 3. MAIN PAGE ---
// // // // // // // // // export default function StudentCoursePlayPage() {
// // // // // // // // //   const router = useRouter();
// // // // // // // // //   const params = useParams();
// // // // // // // // //   const { user } = useAuth();
// // // // // // // // //   const { courseId } = params as { courseId: string };

// // // // // // // // //   const [course, setCourse] = useState<any>(null);
// // // // // // // // //   const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // // // // //   const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // // // // // // // //   const [progressPercent, setProgressPercent] = useState(0);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
// // // // // // // // //   // STATE CHAT
// // // // // // // // //   const [showChat, setShowChat] = useState(false);
// // // // // // // // //   const [chatableFacilitators, setChatableFacilitators] = useState<any[]>([]);
// // // // // // // // //   const [unreadSenderId, setUnreadSenderId] = useState<string | null>(null);
// // // // // // // // //   const [toastData, setToastData] = useState<any>(null);
// // // // // // // // //   const lastMsgIdRef = useRef<string | null>(null);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const loadData = async () => {
// // // // // // // // //       try {
// // // // // // // // //         setLoading(true);
// // // // // // // // //         const [resCourse, resProgress] = await Promise.all([
// // // // // // // // //             api(`/api/courses/${courseId}`),
// // // // // // // // //             api(`/api/progress/${courseId}`).catch(() => ({ completedLessons: [] }))
// // // // // // // // //         ]);

// // // // // // // // //         const courseData = resCourse.course || resCourse;
// // // // // // // // //         setCourse(courseData);
// // // // // // // // //         setCompletedLessonIds(resProgress.completedLessons || []);

// // // // // // // // //         if (courseData.facilitatorIds && Array.isArray(courseData.facilitatorIds)) {
// // // // // // // // //             const validFacs = courseData.facilitatorIds.filter((f: any) => f && f.name && f._id !== user?.id);
// // // // // // // // //             setChatableFacilitators(validFacs);
// // // // // // // // //         }

// // // // // // // // //         if (courseData.modules?.[0]?.lessons?.[0]) {
// // // // // // // // //             setActiveLesson(courseData.modules[0].lessons[0]);
// // // // // // // // //         }
// // // // // // // // //       } catch (e: any) { console.error(e); } finally { setLoading(false); }
// // // // // // // // //     };
// // // // // // // // //     if (courseId && user) loadData();
// // // // // // // // //   }, [courseId, user]);

// // // // // // // // //   // POLLING CHAT
// // // // // // // // //   useEffect(() => {
// // // // // // // // //       if (!user) return;
// // // // // // // // //       const checkNewMessages = async () => {
// // // // // // // // //           try {
// // // // // // // // //               const res = await api('/api/chat/conversations');
// // // // // // // // //               if (res.conversations && res.conversations.length > 0) {
// // // // // // // // //                   const latestConv = res.conversations[0];
// // // // // // // // //                   const latestMsg = latestConv.lastMessage;
// // // // // // // // //                   if (!latestMsg) return;
// // // // // // // // //                   const senderId = typeof latestMsg.sender === 'object' ? latestMsg.sender._id : latestMsg.sender;
// // // // // // // // //                   if (senderId !== user.id) {
// // // // // // // // //                       setUnreadSenderId(senderId); 
// // // // // // // // //                       if (latestMsg._id !== lastMsgIdRef.current) {
// // // // // // // // //                           lastMsgIdRef.current = latestMsg._id;
// // // // // // // // //                           if (!showChat) {
// // // // // // // // //                               setToastData({
// // // // // // // // //                                   senderId,
// // // // // // // // //                                   senderName: latestConv.user?.name || 'Pengajar',
// // // // // // // // //                                   senderAvatar: latestConv.user?.avatarUrl,
// // // // // // // // //                                   message: latestMsg.message
// // // // // // // // //                               });
// // // // // // // // //                           }
// // // // // // // // //                       }
// // // // // // // // //                   }
// // // // // // // // //               }
// // // // // // // // //           } catch (e) { /* Silent */ }
// // // // // // // // //       };
      
// // // // // // // // //       checkNewMessages(); 
// // // // // // // // //       const interval = setInterval(checkNewMessages, 5000);
// // // // // // // // //       return () => clearInterval(interval);
// // // // // // // // //   }, [user, showChat]);

// // // // // // // // //   // LOGIKA PROGRESS
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (course) {
// // // // // // // // //         let total = 0; let completed = 0;
// // // // // // // // //         course.modules.forEach((m: any) => {
// // // // // // // // //             if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) { total++; if (completedLessonIds.includes(l._id)) completed++; } });
// // // // // // // // //         });
// // // // // // // // //         setProgressPercent(total === 0 ? 0 : Math.round((completed / total) * 100));
// // // // // // // // //     }
// // // // // // // // //   }, [completedLessonIds, course]);

// // // // // // // // //   const markLessonAsComplete = async (lessonId: string) => {
// // // // // // // // //     if (!completedLessonIds.includes(lessonId)) {
// // // // // // // // //         try {
// // // // // // // // //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId } });
// // // // // // // // //             setCompletedLessonIds(prev => [...prev, lessonId]);
// // // // // // // // //         } catch(e) { console.error(e); }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleNextLesson = () => {
// // // // // // // // //     const allLessons: any[] = [];
// // // // // // // // //     course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // // // //     const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // // // //     if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // // // // // // // //     else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // // // // // // // //   };

// // // // // // // // //   const handleManualComplete = async () => { await markLessonAsComplete(activeLesson._id); handleNextLesson(); };
// // // // // // // // //   const handleQuizCompleted = async () => { await markLessonAsComplete(activeLesson._id); };

// // // // // // // // //   const renderContent = () => {
// // // // // // // // //     if (!activeLesson) return null;
// // // // // // // // //     switch (activeLesson.type) {
// // // // // // // // //         case 'video_url':
// // // // // // // // //             let embedUrl = activeLesson.videoUrl;
// // // // // // // // //             if (activeLesson.videoUrl?.includes('youtube.com') || activeLesson.videoUrl?.includes('youtu.be')) {
// // // // // // // // //                 const vId = activeLesson.videoUrl.split(activeLesson.videoUrl.includes('v=') ? 'v=' : '/').pop().split('&')[0];
// // // // // // // // //                 embedUrl = `https://www.youtube.com/embed/${vId}`;
// // // // // // // // //             }
// // // // // // // // //             return (
// // // // // // // // //                 <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
// // // // // // // // //                     <iframe src={embedUrl} className="w-full h-full" allowFullScreen title={`Video: ${activeLesson.title}`}/>
// // // // // // // // //                 </div>
// // // // // // // // //             );
// // // // // // // // //         case 'quiz': return <QuizPlayer quizId={activeLesson._id} courseId={courseId} onComplete={handleQuizCompleted} />;
        
// // // // // // // // //         // [BARU] RENDER GOOGLE CLASSROOM
// // // // // // // // //         case 'google_classroom':
// // // // // // // // //             return (
// // // // // // // // //                 <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100 text-center space-y-6">
// // // // // // // // //                     <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl shadow-inner">
// // // // // // // // //                         🏫
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <h3 className="text-xl font-bold text-gray-800 mb-2">Materi via Google Classroom</h3>
// // // // // // // // //                         <p className="text-gray-500 max-w-md mx-auto">
// // // // // // // // //                             Materi ini diselenggarakan melalui Google Classroom. Silakan klik tombol di bawah untuk mengakses kelas:
// // // // // // // // //                             <br/>
// // // // // // // // //                             <strong className="text-green-700">{activeLesson.classroomData?.name}</strong>
// // // // // // // // //                         </p>
// // // // // // // // //                     </div>
                    
// // // // // // // // //                     {activeLesson.classroomData?.alternateLink ? (
// // // // // // // // //                         <a 
// // // // // // // // //                             href={activeLesson.classroomData.alternateLink} 
// // // // // // // // //                             target="_blank" 
// // // // // // // // //                             rel="noopener noreferrer"
// // // // // // // // //                             className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 transition-transform hover:scale-105 flex items-center gap-2"
// // // // // // // // //                         >
// // // // // // // // //                             Buka Google Classroom <span>↗</span>
// // // // // // // // //                         </a>
// // // // // // // // //                     ) : (
// // // // // // // // //                         <div className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded">Link kelas tidak tersedia.</div>
// // // // // // // // //                     )}
// // // // // // // // //                 </div>
// // // // // // // // //             );

// // // // // // // // //         case 'pdf': case 'download_doc': 
// // // // // // // // //             return (
// // // // // // // // //                 <div className="p-10 bg-gray-100 border-2 border-dashed rounded-xl text-center hover:bg-gray-50 transition-colors">
// // // // // // // // //                     <div className="text-5xl mb-4">📄</div>
// // // // // // // // //                     <h3 className="font-bold text-gray-700 mb-2">Materi Dokumen</h3>
// // // // // // // // //                     <a href={activeLesson.fileUrl} target="_blank" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-transform active:scale-95 shadow">Buka / Download</a>
// // // // // // // // //                 </div>
// // // // // // // // //             );
// // // // // // // // //         default: return <div className="prose max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />;
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // // // // // // //   if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;

// // // // // // // // //   // [FIX] Validasi Safe Percent untuk menghindari error ARIA
// // // // // // // // //   const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;

// // // // // // // // //   return (
// // // // // // // // //     <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
      
// // // // // // // // //       <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 flex flex-col md:relative absolute z-30 h-full shadow-xl md:shadow-none`}>
// // // // // // // // //         <div className="p-5 border-b border-gray-100 bg-white">
// // // // // // // // //             <Link href="/courses" className="text-[10px] font-bold text-gray-400 hover:text-indigo-600 mb-3 flex items-center gap-1 uppercase tracking-wide"><span>←</span> Kembali ke Katalog</Link>
// // // // // // // // //             <h2 className="font-bold text-gray-800 text-lg leading-tight mb-4 line-clamp-2">{course.title}</h2>
// // // // // // // // //             <div className="space-y-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
// // // // // // // // //                 <div className="flex justify-between text-xs font-bold text-gray-600 mb-1"><span>Progress Belajar</span><span className="text-indigo-600">{safePercent}%</span></div>
                
// // // // // // // // //                 {/* [FIX] Progress Bar Tanpa Error ARIA */}
// // // // // // // // //                 <div className="w-full bg-gray-200 rounded-full h-2 relative">
// // // // // // // // //                     <div 
// // // // // // // // //                         className="bg-green-500 h-2 rounded-full transition-all duration-500 shadow-sm" 
// // // // // // // // //                         style={{ width: `${safePercent}%` }}
// // // // // // // // //                     ></div>
// // // // // // // // //                     {/* Screen Reader Only Text - Solusi Terbaik untuk A11y tanpa error linter */}
// // // // // // // // //                     <span className="sr-only">Progress: {safePercent}%</span>
// // // // // // // // //                 </div>

// // // // // // // // //                 {chatableFacilitators.length > 0 && (
// // // // // // // // //                     <button onClick={() => setShowChat(true)} className="w-full mt-2 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2.5 rounded-lg text-xs font-bold hover:bg-indigo-50 border border-indigo-200 transition-all shadow-sm active:scale-95 relative">
// // // // // // // // //                         <MessageCircle size={16}/> Hubungi Pengajar
// // // // // // // // //                         {unreadSenderId && <span className="absolute top-2 right-4 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-bounce"></span>}
// // // // // // // // //                     </button>
// // // // // // // // //                 )}
// // // // // // // // //             </div>
// // // // // // // // //         </div>

// // // // // // // // //         <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24 custom-scrollbar">
// // // // // // // // //             {course.modules?.map((module: any, mIdx: number) => (
// // // // // // // // //                 <div key={module._id}>
// // // // // // // // //                     <div className="mb-2 pl-1">
// // // // // // // // //                         <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-wider">MODUL {mIdx + 1}</h3>
// // // // // // // // //                         <h4 className="font-bold text-gray-800 text-sm leading-tight">{module.title}</h4>
// // // // // // // // //                         <div className="flex flex-wrap items-center gap-2 mt-1">
// // // // // // // // //                             {module.scheduleDate && <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold border border-blue-100 flex items-center gap-1"><Calendar size={10}/> {new Date(module.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // // // // // // //                             {module.facilitatorId && <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-bold border border-indigo-100 flex items-center gap-1">👨‍🏫 {module.facilitatorId.name || 'Fasilitator'}</span>}
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="space-y-1">
// // // // // // // // //                         {module.lessons?.map((lesson: any) => {
// // // // // // // // //                             const isCompleted = completedLessonIds.includes(lesson._id);
// // // // // // // // //                             const isActive = activeLesson?._id === lesson._id;
// // // // // // // // //                             let icon = <FileText size={14}/>; 
// // // // // // // // //                             if (lesson.type === 'video_url') icon = <PlayCircle size={14}/>; 
// // // // // // // // //                             if (lesson.type === 'quiz') icon = <span>📝</span>;
// // // // // // // // //                             if (lesson.type === 'google_classroom') icon = <span>🏫</span>; // Icon Baru

// // // // // // // // //                             return (
// // // // // // // // //                                 <button key={lesson._id} onClick={() => setActiveLesson(lesson)} className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group ${isActive ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-200' : 'hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200'}`}>
// // // // // // // // //                                     <div className="flex items-center gap-3 overflow-hidden">
// // // // // // // // //                                         <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors ${isActive ? 'border-white/30 bg-white/20 text-white' : isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 bg-white text-transparent'}`}><CheckCircle size={12} /></div>
// // // // // // // // //                                         <div className="min-w-0">
// // // // // // // // //                                             <span className={`text-xs font-bold truncate block ${isActive ? 'text-white' : 'text-gray-700'}`}>{lesson.title}</span>
// // // // // // // // //                                             <div className="flex items-center gap-2 mt-0.5">
// // // // // // // // //                                                 <span className={`text-[10px] opacity-70 block ${isActive ? 'text-indigo-100' : 'text-gray-400'}`}>{lesson.type === 'quiz' ? `${lesson.quizDuration} Menit` : `${lesson.jp} JP`}</span>
// // // // // // // // //                                                 {lesson.scheduleDate && <span className={`text-[9px] flex items-center gap-0.5 ${isActive ? 'text-indigo-100' : 'text-blue-600'}`}><Calendar size={8}/> {new Date(lesson.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // // // // // // //                                             </div>
// // // // // // // // //                                         </div>
// // // // // // // // //                                     </div>
// // // // // // // // //                                     <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity">{icon}</span>
// // // // // // // // //                                 </button>
// // // // // // // // //                             );
// // // // // // // // //                         })}
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
// // // // // // // // //             ))}
// // // // // // // // //         </div>
// // // // // // // // //       </aside>

// // // // // // // // //       <main className="flex-1 flex flex-col bg-gray-50 relative h-full overflow-hidden w-full">
// // // // // // // // //         <div className="md:hidden p-4 bg-white border-b flex justify-between items-center flex-shrink-0 z-20 shadow-sm">
// // // // // // // // //             <div className="min-w-0"><h1 className="font-bold text-gray-800 truncate text-sm">{activeLesson?.title}</h1></div>
// // // // // // // // //             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200" aria-label="Toggle Sidebar">{isSidebarOpen ? <X size={20}/> : <Menu size={20}/>}</button>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 w-full custom-scrollbar">
// // // // // // // // //             <div className="max-w-4xl mx-auto space-y-6">
// // // // // // // // //                 <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 mb-2">
// // // // // // // // //                     <span className="uppercase tracking-wider text-xs font-bold bg-gray-200 px-2 py-0.5 rounded text-gray-600">{activeLesson?.type === 'quiz' ? 'KUIS' : activeLesson?.type === 'google_classroom' ? 'E-CLASS' : 'MATERI'}</span>
// // // // // // // // //                     <span className="text-gray-300">/</span>
// // // // // // // // //                     <h1 className="text-gray-900 font-bold text-lg">{activeLesson?.title}</h1>
// // // // // // // // //                 </div>
// // // // // // // // //                 {renderContent()}
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //         {activeLesson?.type !== 'quiz' && (
// // // // // // // // //             <div className="bg-white border-t p-4 absolute bottom-0 w-full z-20 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
// // // // // // // // //                 <div className="max-w-4xl mx-auto flex justify-between items-center">
// // // // // // // // //                     <button className="text-gray-500 font-bold text-sm hover:text-gray-800 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">← Sebelumnya</button>
// // // // // // // // //                     <button onClick={handleManualComplete} className={`px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-transform active:scale-95 text-white ${completedLessonIds.includes(activeLesson?._id) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}>
// // // // // // // // //                         <span>{completedLessonIds.includes(activeLesson?._id) ? 'Lanjut Berikutnya' : 'Selesai & Lanjut'}</span><span>→</span>
// // // // // // // // //                     </button>
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //         )}
// // // // // // // // //       </main>

// // // // // // // // //       {showChat && (
// // // // // // // // //         <ChatWithFacilitatorModal 
// // // // // // // // //             facilitators={chatableFacilitators} 
// // // // // // // // //             unreadSenderId={unreadSenderId} 
// // // // // // // // //             initialSelectedId={toastData?.senderId} 
// // // // // // // // //             onClose={() => { setShowChat(false); setToastData(null); }} 
// // // // // // // // //         />
// // // // // // // // //       )}
      
// // // // // // // // //       {toastData && !showChat && (
// // // // // // // // //           <ChatToast 
// // // // // // // // //             data={toastData} 
// // // // // // // // //             onOpen={() => { setToastData(null); setShowChat(true); }} 
// // // // // // // // //             onClose={() => setToastData(null)} 
// // // // // // // // //           />
// // // // // // // // //       )}

// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }
// // // // // // // // 'use client';

// // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // import Link from 'next/link';
// // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // // // // // import { Calendar, PlayCircle, CheckCircle, FileText, MessageCircle, X, Menu, Send, BookOpen, Users, Lock, Tag, Award, Clock } from 'lucide-react';
// // // // // // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';

// // // // // // // // // --- 1. KOMPONEN TOAST NOTIFIKASI CHAT ---
// // // // // // // // function ChatToast({ data, onOpen, onClose }: any) {
// // // // // // // //   useEffect(() => {
// // // // // // // //     const timer = setTimeout(onClose, 10000);
// // // // // // // //     return () => clearTimeout(timer);
// // // // // // // //   }, [onClose]);

// // // // // // // //   return (
// // // // // // // //     <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
// // // // // // // //       <div 
// // // // // // // //         className="bg-white rounded-xl shadow-2xl border-l-4 border-l-green-500 border-y border-r border-gray-100 p-4 w-80 flex items-start gap-3 relative cursor-pointer hover:bg-gray-50 transition-colors"
// // // // // // // //         onClick={onOpen}
// // // // // // // //       >
// // // // // // // //         <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 bg-white rounded-full" aria-label="Tutup Notifikasi" title="Tutup Notifikasi"><X size={14} /></button>
// // // // // // // //         <div className="relative flex-shrink-0">
// // // // // // // //             <img src={getImageUrl(data.senderAvatar)} alt={data.senderName} className="w-10 h-10 rounded-full object-cover border-2 border-green-500"/>
// // // // // // // //             <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
// // // // // // // //         </div>
// // // // // // // //         <div className="flex-1 min-w-0">
// // // // // // // //             <div className="flex justify-between items-center mb-0.5"><h4 className="font-bold text-sm text-gray-800 truncate pr-4">{data.senderName}</h4><span className="text-[10px] text-gray-400">Baru saja</span></div>
// // // // // // // //             <p className="text-xs text-green-600 font-bold mb-0.5">Pesan Baru!</p>
// // // // // // // //             <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed italic">"{data.message}"</p>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // // --- 2. KOMPONEN MODAL CHAT ---
// // // // // // // // function ChatWithFacilitatorModal({ facilitators, initialSelectedId, unreadSenderId, onClose }: any) {
// // // // // // // //   const [selectedFacilitator, setSelectedFacilitator] = useState<any>(
// // // // // // // //     initialSelectedId ? facilitators.find((f: any) => f._id === initialSelectedId) : (unreadSenderId ? facilitators.find((f: any) => f._id === unreadSenderId) : (facilitators.length === 1 ? facilitators[0] : null))
// // // // // // // //   );
// // // // // // // //   const [messages, setMessages] = useState<any[]>([]);
// // // // // // // //   const [message, setMessage] = useState('');
// // // // // // // //   const [sending, setSending] = useState(false);
// // // // // // // //   const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // // // // //   useEffect(() => {
// // // // // // // //       if (selectedFacilitator?._id) {
// // // // // // // //           loadHistory();
// // // // // // // //           const interval = setInterval(loadHistory, 3000); 
// // // // // // // //           return () => clearInterval(interval);
// // // // // // // //       }
// // // // // // // //   }, [selectedFacilitator]);

// // // // // // // //   useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// // // // // // // //   const loadHistory = async () => { try { const res = await api(`/api/chat/${selectedFacilitator._id}`); setMessages(res.messages || []); } catch (e) { console.error(e); } };
// // // // // // // //   const handleSend = async (e: React.FormEvent) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     if (!message.trim() || !selectedFacilitator) return;
// // // // // // // //     const tempMsg = { _id: Date.now(), sender: 'me', message: message, createdAt: new Date().toISOString() };
// // // // // // // //     setMessages(prev => [...prev, tempMsg]); setMessage(''); setSending(true);
// // // // // // // //     try { await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message: tempMsg.message } }); loadHistory(); } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); }
// // // // // // // //   };
// // // // // // // //   const isMe = (msg: any) => { if (msg.sender === 'me') return true; const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender; return senderId !== selectedFacilitator._id; };

// // // // // // // //   return (
// // // // // // // //     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in duration-200 backdrop-blur-sm">
// // // // // // // //       <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]">
// // // // // // // //         {/* [FIX] Tambahkan aria-label pada tombol Close */}
// // // // // // // //         <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
// // // // // // // //             <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18}/> Hubungi Pengajar</h3>
// // // // // // // //             <button onClick={onClose} aria-label="Tutup Chat" title="Tutup Chat"><X size={20} /></button>
// // // // // // // //         </div>
// // // // // // // //         {!selectedFacilitator ? (
// // // // // // // //             <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
// // // // // // // //                 <div className="p-4 bg-white border-b shadow-sm z-10"><p className="text-sm text-gray-700 font-bold">Pilih Fasilitator:</p></div>
// // // // // // // //                 <div className="p-4 overflow-y-auto custom-scrollbar space-y-2 flex-1">
// // // // // // // //                     {facilitators.map((fac: any) => (
// // // // // // // //                         <button key={fac._id} onClick={() => setSelectedFacilitator(fac)} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left group relative ${fac._id === unreadSenderId ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200 hover:border-indigo-300'}`}>
// // // // // // // //                             <img src={getImageUrl(fac.avatarUrl)} className="w-12 h-12 rounded-full object-cover" alt={fac.name} />
// // // // // // // //                             <div className="flex-1 min-w-0"><p className="font-bold text-sm truncate">{fac.name}</p><p className="text-xs text-gray-500">{fac.role || 'Fasilitator'}</p></div>
// // // // // // // //                         </button>
// // // // // // // //                     ))}
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         ) : (
// // // // // // // //             <>
// // // // // // // //                 {/* [FIX] Tambahkan aria-label pada tombol Kembali */}
// // // // // // // //                 <div className="p-3 bg-white border-b flex items-center gap-3 shadow-sm z-10">
// // // // // // // //                     <button onClick={() => setSelectedFacilitator(null)} className="text-xs font-bold" aria-label="Kembali" title="Kembali">← Kembali</button>
// // // // // // // //                     <div className="flex items-center gap-2 border-l pl-3"><img src={getImageUrl(selectedFacilitator.avatarUrl)} className="w-9 h-9 rounded-full bg-gray-200 object-cover" alt={selectedFacilitator.name} /><div><p className="text-sm font-bold text-gray-800 leading-tight">{selectedFacilitator.name}</p><span className="text-[10px] text-green-600 bg-green-50 px-1.5 rounded-full border border-green-100">Online</span></div></div>
// // // // // // // //                 </div>
// // // // // // // //                 <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// // // // // // // //                     {messages.length === 0 ? <div className="text-center text-gray-400 text-xs mt-10">Mulai diskusi!</div> : messages.map((msg: any, idx: number) => (<div key={idx} className={`flex ${isMe(msg) ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe(msg) ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800'}`}><p>{msg.message}</p></div></div>))}
// // // // // // // //                     <div ref={messagesEndRef} />
// // // // // // // //                 </div>
// // // // // // // //                 {/* [FIX] Tambahkan aria-label pada tombol Kirim */}
// // // // // // // //                 <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
// // // // // // // //                     <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus />
// // // // // // // //                     <button disabled={sending} type="submit" className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center" aria-label="Kirim Pesan" title="Kirim Pesan"><Send size={16}/></button>
// // // // // // // //                 </form>
// // // // // // // //             </>
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // // --- 3. MAIN PAGE ---
// // // // // // // // export default function StudentCoursePlayPage() {
// // // // // // // //   const router = useRouter();
// // // // // // // //   const params = useParams();
// // // // // // // //   const { user } = useAuth();
// // // // // // // //   const { courseId } = params as { courseId: string };

// // // // // // // //   const [course, setCourse] = useState<any>(null);
// // // // // // // //   const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // // // //   const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // // // // // // //   const [progressPercent, setProgressPercent] = useState(0);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
// // // // // // // //   const [isEnrolled, setIsEnrolled] = useState(false); 
// // // // // // // //   const [showRegisterModal, setShowRegisterModal] = useState(false); 
  
// // // // // // // //   const [showChat, setShowChat] = useState(false);
// // // // // // // //   const [chatableFacilitators, setChatableFacilitators] = useState<any[]>([]);
// // // // // // // //   const [unreadSenderId, setUnreadSenderId] = useState<string | null>(null);
// // // // // // // //   const [toastData, setToastData] = useState<any>(null);
// // // // // // // //   const lastMsgIdRef = useRef<string | null>(null);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const loadData = async () => {
// // // // // // // //       try {
// // // // // // // //         setLoading(true);
// // // // // // // //         const resCourse = await api(`/api/courses/${courseId}`);
// // // // // // // //         const courseData = resCourse.course || resCourse;
// // // // // // // //         setCourse(courseData);

// // // // // // // //         try {
// // // // // // // //             const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// // // // // // // //             setIsEnrolled(enrollRes.isEnrolled);
// // // // // // // //             if (enrollRes.isEnrolled) {
// // // // // // // //                 const resProgress = await api(`/api/progress/${courseId}`).catch(() => ({ completedLessons: [] }));
// // // // // // // //                 setCompletedLessonIds(resProgress.completedLessons || []);
// // // // // // // //             }
// // // // // // // //         } catch (e) {
// // // // // // // //             console.error("Gagal cek enrollment", e);
// // // // // // // //         }

// // // // // // // //         if (courseData.facilitatorIds && Array.isArray(courseData.facilitatorIds)) {
// // // // // // // //             const validFacs = courseData.facilitatorIds.filter((f: any) => f && f.name && f._id !== user?.id);
// // // // // // // //             setChatableFacilitators(validFacs);
// // // // // // // //         }

// // // // // // // //         if (courseData.modules?.[0]?.lessons?.[0]) {
// // // // // // // //             setActiveLesson(courseData.modules[0].lessons[0]);
// // // // // // // //         }
// // // // // // // //       } catch (e: any) { console.error(e); } finally { setLoading(false); }
// // // // // // // //     };
// // // // // // // //     if (courseId && user) loadData();
// // // // // // // //   }, [courseId, user]);

// // // // // // // //   useEffect(() => {
// // // // // // // //       if (!user) return;
// // // // // // // //       const checkNewMessages = async () => {
// // // // // // // //           try {
// // // // // // // //               const res = await api('/api/chat/conversations');
// // // // // // // //               if (res.conversations && res.conversations.length > 0) {
// // // // // // // //                   const latestConv = res.conversations[0];
// // // // // // // //                   const latestMsg = latestConv.lastMessage;
// // // // // // // //                   if (!latestMsg) return;
// // // // // // // //                   const senderId = typeof latestMsg.sender === 'object' ? latestMsg.sender._id : latestMsg.sender;
// // // // // // // //                   if (senderId !== user.id) {
// // // // // // // //                       setUnreadSenderId(senderId); 
// // // // // // // //                       if (latestMsg._id !== lastMsgIdRef.current) {
// // // // // // // //                           lastMsgIdRef.current = latestMsg._id;
// // // // // // // //                           if (!showChat) {
// // // // // // // //                               setToastData({
// // // // // // // //                                   senderId,
// // // // // // // //                                   senderName: latestConv.user?.name || 'Pengajar',
// // // // // // // //                                   senderAvatar: latestConv.user?.avatarUrl,
// // // // // // // //                                   message: latestMsg.message
// // // // // // // //                               });
// // // // // // // //                           }
// // // // // // // //                       }
// // // // // // // //                   }
// // // // // // // //               }
// // // // // // // //           } catch (e) { /* Silent */ }
// // // // // // // //       };
      
// // // // // // // //       checkNewMessages(); 
// // // // // // // //       const interval = setInterval(checkNewMessages, 5000);
// // // // // // // //       return () => clearInterval(interval);
// // // // // // // //   }, [user, showChat]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (course) {
// // // // // // // //         let total = 0; let completed = 0;
// // // // // // // //         course.modules.forEach((m: any) => {
// // // // // // // //             if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) { total++; if (completedLessonIds.includes(l._id)) completed++; } });
// // // // // // // //         });
// // // // // // // //         setProgressPercent(total === 0 ? 0 : Math.round((completed / total) * 100));
// // // // // // // //     }
// // // // // // // //   }, [completedLessonIds, course]);

// // // // // // // //   const markLessonAsComplete = async (lessonId: string) => {
// // // // // // // //     if (!completedLessonIds.includes(lessonId)) {
// // // // // // // //         try {
// // // // // // // //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId } });
// // // // // // // //             setCompletedLessonIds(prev => [...prev, lessonId]);
// // // // // // // //         } catch(e) { console.error(e); }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleNextLesson = () => {
// // // // // // // //     const allLessons: any[] = [];
// // // // // // // //     course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // // //     const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // // //     if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // // // // // // //     else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // // // // // // //   };

// // // // // // // //   const handleManualComplete = async () => { await markLessonAsComplete(activeLesson._id); handleNextLesson(); };
// // // // // // // //   const handleQuizCompleted = async () => { await markLessonAsComplete(activeLesson._id); };

// // // // // // // //   const renderContent = () => {
// // // // // // // //     if (!activeLesson) return null;
// // // // // // // //     return <div className="prose max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100" dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} />;
// // // // // // // //   };

// // // // // // // //   if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // // // // // //   if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;

// // // // // // // //   if (!isEnrolled) {
// // // // // // // //       return (
// // // // // // // //         <div className="min-h-screen bg-gray-50 pb-20">
// // // // // // // //             {showRegisterModal && (
// // // // // // // //                 <CourseRegistrationModal 
// // // // // // // //                     courseId={courseId}
// // // // // // // //                     courseTitle={course.title}
// // // // // // // //                     user={user}
// // // // // // // //                     onClose={() => setShowRegisterModal(false)}
// // // // // // // //                     onSuccess={() => {
// // // // // // // //                         setShowRegisterModal(false);
// // // // // // // // //                         setIsEnrolled(true);
// // // // // // // // //                         alert("Pendaftaran Berhasil! Selamat belajar.");
// // // // // // // // //                         window.location.reload(); 
// // // // // // // // //                     }}
// // // // // // // // //                 />
// // // // // // // // //             )}
// // // // // // // // //             <div className="bg-gray-900 text-white relative">
// // // // // // // // //                 <div className="absolute inset-0 bg-black/60 z-0"></div>
// // // // // // // // //                 {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" alt="bg" />}
// // // // // // // // //                 <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
// // // // // // // // //                     <div className="lg:col-span-2 space-y-6">
// // // // // // // // //                         <div className="inline-block bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{course.programType === 'training' ? 'Diklat' : 'Kursus'}</div>
// // // // // // // // //                         <h1 className="text-4xl font-extrabold leading-tight">{course.title}</h1>
// // // // // // // // //                         <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
// // // // // // // // //                             <div className="flex items-center gap-2"><Users size={18}/> {course.facilitatorIds?.length || 1} Fasilitator</div>
// // // // // // // // //                             <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
// // // // // // // // //                             <div className="flex items-center gap-2"><Clock size={18}/> Fleksibel</div>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="lg:col-span-1 bg-white text-gray-900 p-6 rounded-2xl shadow-xl">
// // // // // // // // //                         <div className="text-center mb-6">
// // // // // // // // //                             <p className="text-gray-500 text-sm">Biaya Pelatihan</p>
// // // // // // // // //                             <p className="text-3xl font-extrabold text-green-600">{course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}</p>
// // // // // // // // //                         </div>
// // // // // // // // //                         <button onClick={() => setShowRegisterModal(true)} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2">📝 Daftar Sekarang</button>
// // // // // // // // //                         <p className="text-xs text-center text-gray-400 mt-4">Klik daftar untuk mengisi formulir peserta.</p>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //             <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
// // // // // // // // //                 <div className="lg:col-span-2 space-y-8">
// // // // // // // // //                     <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
// // // // // // // // //                         <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="text-red-600"/> Tentang Pelatihan</h3>
// // // // // // // // //                         <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: course.description || '<p>Tidak ada deskripsi.</p>' }} />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
// // // // // // // // //                         <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><BookOpen className="text-red-600"/> Kurikulum (Terkunci)</h3>
// // // // // // // // //                         <div className="space-y-4">
// // // // // // // // //                             {course.modules?.map((mod: any, idx: number) => (
// // // // // // // // //                                 <div key={mod._id} className="border rounded-xl overflow-hidden opacity-70">
// // // // // // // // //                                     <div className="bg-gray-50 p-4 font-bold text-gray-700 flex justify-between"><span>Modul {idx+1}: {mod.title}</span><Lock size={16} className="text-gray-400"/></div>
// // // // // // // // //                                     <div className="bg-white p-4 text-sm text-gray-500 italic flex items-center gap-2"><Lock size={14}/> {mod.lessons?.length || 0} Materi (Daftar untuk akses)</div>
// // // // // // // // //                                 </div>
// // // // // // // // //                             ))}
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //       );
// // // // // // // // //   }

// // // // // // // // //   const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;

// // // // // // // // //   return (
// // // // // // // // //     <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // // // // // // // //       <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 flex flex-col md:relative absolute z-30 h-full shadow-xl md:shadow-none`}>
// // // // // // // // //         <div className="p-5 border-b border-gray-100 bg-white">
// // // // // // // // //             <Link href="/courses" className="text-[10px] font-bold text-gray-400 hover:text-indigo-600 mb-3 flex items-center gap-1 uppercase tracking-wide"><span>←</span> Kembali ke Katalog</Link>
// // // // // // // // //             <h2 className="font-bold text-gray-800 text-lg leading-tight mb-4 line-clamp-2">{course.title}</h2>
// // // // // // // // //             <div className="space-y-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
// // // // // // // // //                 <div className="flex justify-between text-xs font-bold text-gray-600 mb-1"><span>Progress Belajar</span><span className="text-indigo-600">{safePercent}%</span></div>
// // // // // // // // //                 <div className="w-full bg-gray-200 rounded-full h-2 relative"><div className="bg-green-500 h-2 rounded-full transition-all duration-500 shadow-sm" style={{ width: `${safePercent}%` }}></div></div>
// // // // // // // // //                 <button onClick={() => setShowChat(true)} className="w-full mt-2 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2.5 rounded-lg text-xs font-bold hover:bg-indigo-50 border border-indigo-200 transition-all shadow-sm active:scale-95 relative">
// // // // // // // // //                     <MessageCircle size={16}/> Hubungi Pengajar
// // // // // // // // //                 </button>
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24 custom-scrollbar">
// // // // // // // // // //             {course.modules?.map((module: any, mIdx: number) => (
// // // // // // // // // //                 <div key={module._id}>
// // // // // // // // // //                     <div className="mb-2 pl-1"><h3 className="text-[11px] font-black text-gray-400 uppercase tracking-wider">MODUL {mIdx + 1}</h3><h4 className="font-bold text-gray-800 text-sm leading-tight">{module.title}</h4></div>
// // // // // // // // // //                     <div className="space-y-1">
// // // // // // // // // //                         {module.lessons?.map((lesson: any) => {
// // // // // // // // // //                             const isActive = activeLesson?._id === lesson._id;
// // // // // // // // // //                             const isCompleted = completedLessonIds.includes(lesson._id);
// // // // // // // // // //                             return (
// // // // // // // // // //                                 <button key={lesson._id} onClick={() => setActiveLesson(lesson)} className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group ${isActive ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-200' : 'hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200'}`}>
// // // // // // // // // //                                     <div className="flex items-center gap-3 overflow-hidden">
// // // // // // // // // //                                         <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors ${isActive ? 'border-white/30 bg-white/20 text-white' : isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 bg-white text-transparent'}`}><CheckCircle size={12} /></div>
// // // // // // // // // //                                         <div className="min-w-0"><span className={`text-xs font-bold truncate block ${isActive ? 'text-white' : 'text-gray-700'}`}>{lesson.title}</span></div>
// // // // // // // // // //                                     </div>
// // // // // // // // // //                                     <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity">{lesson.type === 'video_url' ? <PlayCircle size={14}/> : <FileText size={14}/>}</span>
// // // // // // // // // //                                 </button>
// // // // // // // // // //                             );
// // // // // // // // // //                         })}
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>
// // // // // // // // // //             ))}
// // // // // // // // // //         </div>
// // // // // // // // // //       </aside>

// // // // // // // // // //       <main className="flex-1 flex flex-col bg-gray-50 relative h-full overflow-hidden w-full">
// // // // // // // // // //         {/* [FIX] Tambahkan aria-label pada tombol Menu Mobile */}
// // // // // // // // // //         <div className="md:hidden p-4 bg-white border-b flex justify-between items-center flex-shrink-0 z-20 shadow-sm"><div className="min-w-0"><h1 className="font-bold text-gray-800 truncate text-sm">{activeLesson?.title}</h1></div><button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200" aria-label="Menu" title="Menu"><Menu size={20}/></button></div>
// // // // // // // // // //         <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 w-full custom-scrollbar">
// // // // // // // // // //             <div className="max-w-4xl mx-auto space-y-6">
// // // // // // // // // //                 <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 mb-2"><span className="uppercase tracking-wider text-xs font-bold bg-gray-200 px-2 py-0.5 rounded text-gray-600">MATERI</span><span className="text-gray-300">/</span><h1 className="text-gray-900 font-bold text-lg">{activeLesson?.title}</h1></div>
// // // // // // // // // //                 {renderContent()}
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>
// // // // // // // // // //         {activeLesson?.type !== 'quiz' && (
// // // // // // // // // //             <div className="bg-white border-t p-4 absolute bottom-0 w-full z-20 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
// // // // // // // // // //                 <div className="max-w-4xl mx-auto flex justify-between items-center">
// // // // // // // // // //                     <button className="text-gray-500 font-bold text-sm hover:text-gray-800 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">← Sebelumnya</button>
// // // // // // // // // //                     <button onClick={handleManualComplete} className={`px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-transform active:scale-95 text-white ${completedLessonIds.includes(activeLesson?._id) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}>
// // // // // // // // // //                         <span>{completedLessonIds.includes(activeLesson?._id) ? 'Lanjut Berikutnya' : 'Selesai & Lanjut'}</span><span>→</span>
// // // // // // // // // //                     </button>
// // // // // // // // // //                 </div>
// // // // // // // // // //             </div>
// // // // // // // // // //         )}
// // // // // // // // // //       </main>

// // // // // // // // // //       {showChat && <ChatWithFacilitatorModal facilitators={chatableFacilitators} unreadSenderId={unreadSenderId} initialSelectedId={toastData?.senderId} onClose={() => { setShowChat(false); setToastData(null); }} />}
// // // // // // // // // //       {toastData && !showChat && <ChatToast data={toastData} onOpen={() => { setToastData(null); setShowChat(true); }} onClose={() => setToastData(null)} />}
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }
// // // // // // // // // 'use client';

// // // // // // // // // import { useState, useEffect, useRef, useMemo } from 'react';
// // // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // // import Link from 'next/link';
// // // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // // // // // // import { Calendar, PlayCircle, CheckCircle, FileText, MessageCircle, X, Menu, Send, BookOpen, Users, Lock, Clock, Video, UploadCloud, Download, Image as ImageIcon, BarChart, MonitorPlay } from 'lucide-react';
// // // // // // // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';

// // // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // // import 'react-quill/dist/quill.snow.css';

// // // // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // // // //     ssr: false,
// // // // // // // // //     loading: () => <div className="h-20 bg-gray-100 animate-pulse rounded-lg border border-gray-200"></div>
// // // // // // // // // });

// // // // // // // // // function ChatToast({ data, onOpen, onClose }: any) {
// // // // // // // // //   useEffect(() => { const timer = setTimeout(onClose, 10000); return () => clearTimeout(timer); }, [onClose]);
// // // // // // // // //   return (
// // // // // // // // //     <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
// // // // // // // // //       <div className="bg-white rounded-xl shadow-2xl border-l-4 border-l-green-500 border-y border-r border-gray-100 p-4 w-80 flex items-start gap-3 relative cursor-pointer hover:bg-gray-50 transition-colors" onClick={onOpen}>
// // // // // // // // //         <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 bg-white rounded-full" aria-label="Tutup Notifikasi" title="Tutup Notifikasi"><X size={14} /></button>
// // // // // // // // //         <div className="relative flex-shrink-0"><img src={getImageUrl(data.senderAvatar)} alt={data.senderName} className="w-10 h-10 rounded-full object-cover border-2 border-green-500"/><span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span></div>
// // // // // // // // //         <div className="flex-1 min-w-0"><div className="flex justify-between items-center mb-0.5"><h4 className="font-bold text-sm text-gray-800 truncate pr-4">{data.senderName}</h4><span className="text-[10px] text-gray-400">Baru saja</span></div><p className="text-xs text-green-600 font-bold mb-0.5">Pesan Baru!</p><p className="text-xs text-gray-500 line-clamp-2 leading-relaxed italic">"{data.message}"</p></div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // function ChatWithFacilitatorModal({ facilitators, initialSelectedId, unreadSenderId, onClose }: any) {
// // // // // // // // //     const [selectedFacilitator, setSelectedFacilitator] = useState<any>(initialSelectedId ? facilitators.find((f: any) => f._id === initialSelectedId) : (unreadSenderId ? facilitators.find((f: any) => f._id === unreadSenderId) : (facilitators.length === 1 ? facilitators[0] : null)));
// // // // // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // // // // //     const [message, setMessage] = useState('');
// // // // // // // // //     const [sending, setSending] = useState(false);
// // // // // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);
// // // // // // // // //     useEffect(() => { if (selectedFacilitator?._id) { loadHistory(); const interval = setInterval(loadHistory, 3000); return () => clearInterval(interval); } }, [selectedFacilitator]);
// // // // // // // // //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
// // // // // // // // //     const loadHistory = async () => { try { const res = await api(`/api/chat/${selectedFacilitator._id}`); setMessages(res.messages || []); } catch (e) { console.error(e); } };
// // // // // // // // //     const handleSend = async (e: React.FormEvent) => { e.preventDefault(); if (!message.trim() || !selectedFacilitator) return; const tempMsg = { _id: Date.now(), sender: 'me', message: message, createdAt: new Date().toISOString() }; setMessages(prev => [...prev, tempMsg]); setMessage(''); setSending(true); try { await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message: tempMsg.message } }); loadHistory(); } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); } };
// // // // // // // // //     return (<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"><div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]"><div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10"><h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18}/> Hubungi Pengajar</h3><button onClick={onClose} aria-label="Tutup Chat" title="Tutup Chat"><X size={20} /></button></div>{!selectedFacilitator ? (<div className="flex-1 flex flex-col bg-gray-50 overflow-hidden"><div className="p-4 bg-white border-b shadow-sm z-10"><p className="text-sm text-gray-700 font-bold">Pilih Fasilitator:</p></div><div className="p-4 overflow-y-auto custom-scrollbar space-y-2 flex-1">{facilitators.map((fac: any) => (<button key={fac._id} onClick={() => setSelectedFacilitator(fac)} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left group relative ${fac._id === unreadSenderId ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200 hover:border-indigo-300'}`} aria-label={`Chat ${fac.name}`}><img src={getImageUrl(fac.avatarUrl)} className="w-12 h-12 rounded-full object-cover" alt={fac.name} /><div className="flex-1 min-w-0"><p className="font-bold text-sm truncate">{fac.name}</p><p className="text-xs text-gray-500">{fac.role || 'Fasilitator'}</p></div></button>))}</div></div>) : (<><div className="p-3 bg-white border-b flex items-center gap-3 shadow-sm z-10"><button onClick={() => setSelectedFacilitator(null)} className="text-xs font-bold" aria-label="Kembali" title="Kembali">← Kembali</button><div className="flex items-center gap-2 border-l pl-3"><img src={getImageUrl(selectedFacilitator.avatarUrl)} className="w-9 h-9 rounded-full bg-gray-200 object-cover" alt={selectedFacilitator.name} /><div><p className="text-sm font-bold text-gray-800 leading-tight">{selectedFacilitator.name}</p><span className="text-[10px] text-green-600 bg-green-50 px-1.5 rounded-full border border-green-100">Online</span></div></div></div><div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">{messages.length === 0 ? <div className="text-center text-gray-400 text-xs mt-10">Mulai diskusi!</div> : messages.map((msg: any, idx: number) => (<div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${msg.sender === 'me' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800'}`}><p>{msg.message}</p></div></div>))}<div ref={messagesEndRef} /></div><form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2"><input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus aria-label="Ketik Pesan" /><button disabled={sending} type="submit" className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center" aria-label="Kirim" title="Kirim"><Send size={16}/></button></form></>)}</div></div>);
// // // // // // // // // }

// // // // // // // // // // --- MAIN PAGE ---
// // // // // // // // // export default function StudentCoursePlayPage() {
// // // // // // // // //   const router = useRouter();
// // // // // // // // //   const params = useParams();
// // // // // // // // //   const { user } = useAuth();
// // // // // // // // //   const { courseId } = params as { courseId: string };

// // // // // // // // //   const [course, setCourse] = useState<any>(null);
// // // // // // // // //   const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // // // // //   const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // // // // // // // //   const [progressPercent, setProgressPercent] = useState(0);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
// // // // // // // // //   const [isEnrolled, setIsEnrolled] = useState(false);
// // // // // // // // //   const [showRegisterModal, setShowRegisterModal] = useState(false);
// // // // // // // // //   const [showChat, setShowChat] = useState(false);
// // // // // // // // //   const [chatableFacilitators, setChatableFacilitators] = useState<any[]>([]);
// // // // // // // // //   const [unreadSenderId, setUnreadSenderId] = useState<string | null>(null);
// // // // // // // // //   const [toastData, setToastData] = useState<any>(null);
// // // // // // // // //   const lastMsgIdRef = useRef<string | null>(null);

// // // // // // // // //   const [essayAnswer, setEssayAnswer] = useState('');
// // // // // // // // //   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// // // // // // // // //   const [pollSelected, setPollSelected] = useState<number | null>(null);
// // // // // // // // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // // // // // // // //   const quillModules = useMemo(() => ({ toolbar: [['bold', 'italic', 'underline', 'strike'], [{'list': 'ordered'}, {'list': 'bullet'}], ['clean']] }), []);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const loadData = async () => {
// // // // // // // // //       try {
// // // // // // // // //         setLoading(true);
// // // // // // // // //         const resCourse = await api(`/api/courses/${courseId}`);
// // // // // // // // //         const courseData = resCourse.course || resCourse;
// // // // // // // // //         setCourse(courseData);
// // // // // // // // //         try {
// // // // // // // // //             const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// // // // // // // // //             setIsEnrolled(enrollRes.isEnrolled);
// // // // // // // // //             if (enrollRes.isEnrolled) {
// // // // // // // // //                 const resProgress = await api(`/api/progress/${courseId}`).catch(() => ({ completedLessons: [] }));
// // // // // // // // //                 setCompletedLessonIds(resProgress.completedLessons || []);
// // // // // // // // //             }
// // // // // // // // //         } catch (e) { console.error("Gagal cek enrollment", e); }
// // // // // // // // //         if (courseData.facilitatorIds && Array.isArray(courseData.facilitatorIds)) {
// // // // // // // // //             const validFacs = courseData.facilitatorIds.filter((f: any) => f && f.name && f._id !== user?.id);
// // // // // // // // //             setChatableFacilitators(validFacs);
// // // // // // // // //         }
// // // // // // // // //         if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
// // // // // // // // //       } catch (e: any) { console.error(e); } finally { setLoading(false); }
// // // // // // // // //     };
// // // // // // // // //     if (courseId && user) loadData();
// // // // // // // // //   }, [courseId, user]);

// // // // // // // // //   useEffect(() => { setEssayAnswer(''); setUploadedFile(null); setPollSelected(null); setIsSubmitting(false); }, [activeLesson]);

// // // // // // // // //   // Polling Chat
// // // // // // // // //   useEffect(() => {
// // // // // // // // //       if (!user) return;
// // // // // // // // //       const checkNewMessages = async () => {
// // // // // // // // //           try {
// // // // // // // // //               const res = await api('/api/chat/conversations');
// // // // // // // // //               if (res.conversations && res.conversations.length > 0) {
// // // // // // // // //                   const latestConv = res.conversations[0];
// // // // // // // // //                   const latestMsg = latestConv.lastMessage;
// // // // // // // // //                   if (!latestMsg) return;
// // // // // // // // //                   const senderId = typeof latestMsg.sender === 'object' ? latestMsg.sender._id : latestMsg.sender;
// // // // // // // // //                   if (senderId !== user.id) {
// // // // // // // // //                       setUnreadSenderId(senderId); 
// // // // // // // // //                       if (latestMsg._id !== lastMsgIdRef.current) {
// // // // // // // // //                           lastMsgIdRef.current = latestMsg._id;
// // // // // // // // //                           if (!showChat) setToastData({ senderId, senderName: latestConv.user?.name || 'Pengajar', senderAvatar: latestConv.user?.avatarUrl, message: latestMsg.message });
// // // // // // // // //                       }
// // // // // // // // //                   }
// // // // // // // // //               }
// // // // // // // // //           } catch (e) { /* Silent */ }
// // // // // // // // //       };
// // // // // // // // //       checkNewMessages(); 
// // // // // // // // //       const interval = setInterval(checkNewMessages, 5000);
// // // // // // // // //       return () => clearInterval(interval);
// // // // // // // // //   }, [user, showChat]);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (course) {
// // // // // // // // //         let total = 0; let completed = 0;
// // // // // // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) { total++; if (completedLessonIds.includes(l._id)) completed++; } }); });
// // // // // // // // //         setProgressPercent(total === 0 ? 0 : Math.round((completed / total) * 100));
// // // // // // // // //     }
// // // // // // // // //   }, [completedLessonIds, course]);

// // // // // // // // //   const markLessonAsComplete = async (lessonId: string) => {
// // // // // // // // //     if (!completedLessonIds.includes(lessonId)) {
// // // // // // // // //         try { await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId } }); setCompletedLessonIds(prev => [...prev, lessonId]); } catch(e) { console.error(e); }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleNextLesson = () => {
// // // // // // // // //     const allLessons: any[] = [];
// // // // // // // // //     course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // // // //     const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // // // //     if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // // // // // // // //     else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // // // // // // // //   };

// // // // // // // // //   const handleSubmitTask = async () => {
// // // // // // // // //       setIsSubmitting(true);
// // // // // // // // //       try {
// // // // // // // // //           if (activeLesson.type === 'essay') { if (!essayAnswer.trim()) return alert("Jawaban tidak boleh kosong."); alert("Jawaban Esai Terkirim!"); } 
// // // // // // // // //           else if (activeLesson.type === 'upload_doc') { if (!uploadedFile) return alert("Pilih file terlebih dahulu."); alert("File Berhasil Diupload!"); }
// // // // // // // // //           else if (activeLesson.type === 'poll') { if (pollSelected === null) return alert("Pilih salah satu opsi."); alert("Terima kasih atas partisipasi polling Anda!"); }
// // // // // // // // //           await markLessonAsComplete(activeLesson._id);
// // // // // // // // //           handleNextLesson();
// // // // // // // // //       } catch (e: any) { alert("Gagal mengirim: " + e.message); } finally { setIsSubmitting(false); setEssayAnswer(''); setUploadedFile(null); setPollSelected(null); }
// // // // // // // // //   };

// // // // // // // // //   const handleManualComplete = async () => { await markLessonAsComplete(activeLesson._id); handleNextLesson(); };
// // // // // // // // //   const handleQuizCompleted = async () => { await markLessonAsComplete(activeLesson._id); };

// // // // // // // // //   const renderContent = () => {
// // // // // // // // //     if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping untuk mulai belajar.</div>;

// // // // // // // // //     if (activeLesson.type === 'quiz') return <QuizPlayer quizId={activeLesson._id} courseId={courseId} onComplete={handleQuizCompleted} />;

// // // // // // // // //     if (activeLesson.type === 'essay') {
// // // // // // // // //         return (
// // // // // // // // //             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // //                 <div className="prose max-w-none mb-6">
// // // // // // // // //                     <h2 className="text-2xl font-bold text-gray-900 mb-2">{activeLesson.title}</h2>
// // // // // // // // //                     {activeLesson.questions && activeLesson.questions.length > 0 ? (
// // // // // // // // //                         <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-blue-900 font-medium space-y-4">
// // // // // // // // //                             {activeLesson.questions.map((q: any, i: number) => (<div key={i} className="flex gap-3"><span className="font-bold">{i+1}.</span><div>{q.question}</div></div>))}
// // // // // // // // //                         </div>
// // // // // // // // //                     ) : (<div dangerouslySetInnerHTML={{ __html: activeLesson.content }} />)}
// // // // // // // // //                 </div>
// // // // // // // // //                 <div className="mt-6 border-t pt-6">
// // // // // // // // //                     <label className="block text-sm font-bold text-gray-700 mb-2">Jawaban Anda:</label>
// // // // // // // // //                     <div className="bg-white rounded-lg border border-gray-300 overflow-hidden"><ReactQuill theme="snow" value={essayAnswer} onChange={setEssayAnswer} modules={quillModules} placeholder="Ketik jawaban Anda di sini..." className="h-40 mb-12"/></div>
// // // // // // // // //                     <button onClick={handleSubmitTask} disabled={isSubmitting} className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center gap-2" aria-label="Kirim Jawaban"><Send size={18}/> {isSubmitting ? 'Mengirim...' : 'Kirim Jawaban'}</button>
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //         );
// // // // // // // // //     }

// // // // // // // // //     if (activeLesson.type === 'video_url') {
// // // // // // // // //         let embedUrl = activeLesson.videoUrl;
// // // // // // // // //         if (activeLesson.videoUrl?.includes('youtube.com') || activeLesson.videoUrl?.includes('youtu.be')) {
// // // // // // // // //             const vId = activeLesson.videoUrl.split(activeLesson.videoUrl.includes('v=') ? 'v=' : '/').pop().split('&')[0];
// // // // // // // // //             embedUrl = `https://www.youtube.com/embed/${vId}`;
// // // // // // // // //         }
// // // // // // // // //         return <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg"><iframe src={embedUrl} className="w-full h-full" allowFullScreen title={`Video: ${activeLesson.title}`}/></div>;
// // // // // // // // //     }

// // // // // // // // //     if (activeLesson.type === 'poll') {
// // // // // // // // //         return (
// // // // // // // // //             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
// // // // // // // // //                 <BarChart size={48} className="mx-auto text-indigo-500 mb-4"/>
// // // // // // // // //                 <h2 className="text-2xl font-bold text-gray-900 mb-2">{activeLesson.pollQuestion || activeLesson.title}</h2>
// // // // // // // // //                 <div className="space-y-3 max-w-md mx-auto my-6">{activeLesson.pollOptions?.map((opt: string, idx: number) => (<button key={idx} onClick={() => setPollSelected(idx)} className={`w-full p-4 rounded-xl border text-left font-medium transition-all ${pollSelected === idx ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-2 ring-indigo-500' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>))}</div>
// // // // // // // // //                 <button onClick={handleSubmitTask} disabled={pollSelected === null || isSubmitting} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50" aria-label="Kirim Polling">Kirim Polling</button>
// // // // // // // // //             </div>
// // // // // // // // //         );
// // // // // // // // //     }

// // // // // // // // //     if (activeLesson.type === 'slide' || activeLesson.type === 'pdf' || activeLesson.type === 'download_doc') {
// // // // // // // // //         const fullFileUrl = getImageUrl(activeLesson.fileUrl); 
// // // // // // // // //         const isPdf = fullFileUrl.toLowerCase().endsWith('.pdf');
// // // // // // // // //         return (
// // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col min-h-[60vh]">
// // // // // // // // //                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><FileText className="text-red-500"/> {activeLesson.title}</h2>
// // // // // // // // //                 {isPdf ? (<iframe src={fullFileUrl} className="w-full flex-1 rounded-lg border bg-gray-100" title="Document Viewer"></iframe>) : (<div className="flex-1 flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"><FileText size={64} className="text-gray-400 mb-4"/><p className="text-gray-500 mb-4 text-center font-medium">File ini tidak dapat dipreview langsung.</p><a href={fullFileUrl} target="_blank" rel="noreferrer" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg" aria-label="Download File"><Download size={20}/> Download File</a></div>)}
// // // // // // // // //             </div>
// // // // // // // // //         );
// // // // // // // // //     }

// // // // // // // // //     if (activeLesson.type === 'image') {
// // // // // // // // //         return (
// // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
// // // // // // // // //                 <h2 className="text-xl font-bold text-gray-800 mb-4">{activeLesson.title}</h2>
// // // // // // // // //                 {activeLesson.fileUrl ? (<img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto rounded-lg shadow-md mx-auto" />) : (<div className="p-10 bg-gray-100 rounded-lg text-gray-400">Gambar tidak ditemukan</div>)}
// // // // // // // // //             </div>
// // // // // // // // //         );
// // // // // // // // //     }

// // // // // // // // //     if (activeLesson.type === 'upload_doc') {
// // // // // // // // //         return (
// // // // // // // // //             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // //                 <h2 className="text-2xl font-bold text-gray-900 mb-4">{activeLesson.title}</h2>
// // // // // // // // //                 <div className="prose max-w-none mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-900" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
// // // // // // // // //                 <div className="border-2 border-dashed border-indigo-200 rounded-xl p-8 text-center bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer relative">
// // // // // // // // //                     <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setUploadedFile(e.target.files?.[0] || null)} aria-label="Upload File" />
// // // // // // // // //                     <UploadCloud size={48} className="mx-auto text-indigo-400 mb-2"/>
// // // // // // // // //                     <p className="text-indigo-800 font-bold">{uploadedFile ? uploadedFile.name : "Klik atau Tarik File ke Sini"}</p>
// // // // // // // // //                 </div>
// // // // // // // // //                 <button onClick={handleSubmitTask} disabled={!uploadedFile || isSubmitting} className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50" aria-label="Kirim Tugas">{isSubmitting ? 'Mengupload...' : 'Kirim Tugas'}</button>
// // // // // // // // //             </div>
// // // // // // // // //         );
// // // // // // // // //     }

// // // // // // // // //     if (activeLesson.type === 'virtual_class') {
// // // // // // // // //         const meetingLink = activeLesson.meetingLink || activeLesson.content; 
// // // // // // // // //         return (
// // // // // // // // //             <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100 text-center space-y-6">
// // // // // // // // //                 <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-5xl shadow-inner text-blue-600"><MonitorPlay size={48}/></div>
// // // // // // // // //                 <div><h3 className="text-2xl font-bold text-gray-800 mb-2">Meeting Virtual</h3><p className="text-gray-500 max-w-md mx-auto">Silakan klik tombol di bawah untuk bergabung ke meeting (Zoom / Teams / GMeet).</p></div>
// // // // // // // // //                 {meetingLink ? (<a href={meetingLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-blue-700 transition-transform hover:scale-105 flex items-center gap-2 text-lg" aria-label="Gabung Meeting">Gabung Meeting Sekarang <span>↗</span></a>) : (<div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold">Link meeting belum tersedia.</div>)}
// // // // // // // // //             </div>
// // // // // // // // //         );
// // // // // // // // //     }

// // // // // // // // //     if (activeLesson.type === 'google_classroom') {
// // // // // // // // //         return (
// // // // // // // // //             <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100 text-center space-y-6">
// // // // // // // // //                 <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl shadow-inner">🏫</div>
// // // // // // // // //                 <div><h3 className="text-2xl font-bold text-gray-800 mb-2">Google Classroom</h3><p className="text-gray-500 max-w-md mx-auto">Materi ini diselenggarakan via Google Classroom.</p></div>
// // // // // // // // //                 <a href={activeLesson.classroomData?.alternateLink || '#'} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-green-700 transition-transform hover:scale-105 flex items-center gap-2 text-lg" aria-label="Buka Classroom">Buka Classroom <span>↗</span></a>
// // // // // // // // //             </div>
// // // // // // // // //         );
// // // // // // // // //     }

// // // // // // // // //     return (
// // // // // // // // //         <div className="prose max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-gray-800 leading-relaxed">
// // // // // // // // //             <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2">{activeLesson.title}</h2>
// // // // // // // // //             <div dangerouslySetInnerHTML={{ __html: activeLesson.content || '<p class="text-gray-400 italic">Belum ada konten materi.</p>' }} />
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // //   };

// // // // // // // // //   if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // // // // // // //   if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;

// // // // // // // // //   if (!isEnrolled) {
// // // // // // // // //       return (
// // // // // // // // //         <div className="min-h-screen bg-gray-50 pb-20">
// // // // // // // // //             {showRegisterModal && (<CourseRegistrationModal courseId={courseId} courseTitle={course.title} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => { setShowRegisterModal(false); setIsEnrolled(true); alert("Pendaftaran Berhasil! Selamat belajar."); window.location.reload(); }} />)}
// // // // // // // // //             <div className="bg-gray-900 text-white relative">
// // // // // // // // //                 <div className="absolute inset-0 bg-black/60 z-0"></div>
// // // // // // // // //                 {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" alt="bg" />}
// // // // // // // // //                 <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
// // // // // // // // //                     <div className="lg:col-span-2 space-y-6">
// // // // // // // // //                         <div className="inline-block bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{course.programType === 'training' ? 'Diklat' : 'Kursus'}</div>
// // // // // // // // //                         <h1 className="text-4xl font-extrabold leading-tight">{course.title}</h1>
// // // // // // // // //                         <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
// // // // // // // // //                             <div className="flex items-center gap-2"><Users size={18}/> {course.facilitatorIds?.length || 1} Fasilitator</div>
// // // // // // // // //                             <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
// // // // // // // // //                             <div className="flex items-center gap-2"><Clock size={18}/> Fleksibel</div>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="lg:col-span-1 bg-white text-gray-900 p-6 rounded-2xl shadow-xl">
// // // // // // // // //                         <div className="text-center mb-6"><p className="text-gray-500 text-sm">Biaya Pelatihan</p><p className="text-3xl font-extrabold text-green-600">{course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}</p></div>
// // // // // // // // //                         <button onClick={() => setShowRegisterModal(true)} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2" aria-label="Daftar Sekarang">📝 Daftar Sekarang</button>
// // // // // // // // //                         <p className="text-xs text-center text-gray-400 mt-4">Klik daftar untuk mengisi formulir peserta.</p>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //             <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
// // // // // // // // //                 <div className="lg:col-span-2 space-y-8">
// // // // // // // // //                     <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"><h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="text-red-600"/> Tentang Pelatihan</h3><div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: course.description || '<p>Tidak ada deskripsi.</p>' }} /></div>
// // // // // // // // //                     <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"><h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><BookOpen className="text-red-600"/> Kurikulum (Terkunci)</h3><div className="space-y-4">{course.modules?.map((mod: any, idx: number) => (<div key={mod._id} className="border rounded-xl overflow-hidden opacity-70"><div className="bg-gray-50 p-4 font-bold text-gray-700 flex justify-between"><span>Modul {idx+1}: {mod.title}</span><Lock size={16} className="text-gray-400"/></div><div className="bg-white p-4 text-sm text-gray-500 italic flex items-center gap-2"><Lock size={14}/> {mod.lessons?.length || 0} Materi (Daftar untuk akses)</div></div>))}</div></div>
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //       );
// // // // // // // // //   }

// // // // // // // // //   const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;

// // // // // // // // //   return (
// // // // // // // // //     <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // // // // // // // //       <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 flex flex-col md:relative absolute z-30 h-full shadow-xl md:shadow-none`}>
// // // // // // // // //         <div className="p-5 border-b border-gray-100 bg-white">
// // // // // // // // //             <Link href="/courses" className="text-[10px] font-bold text-gray-400 hover:text-indigo-600 mb-3 flex items-center gap-1 uppercase tracking-wide" aria-label="Kembali ke Katalog"><span>←</span> Kembali ke Katalog</Link>
// // // // // // // // //             <h2 className="font-bold text-gray-800 text-lg leading-tight mb-4 line-clamp-2">{course.title}</h2>
// // // // // // // // //             <div className="space-y-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
// // // // // // // // //                 <div className="flex justify-between text-xs font-bold text-gray-600 mb-1"><span>Progress Belajar</span><span className="text-indigo-600">{safePercent}%</span></div>
// // // // // // // // //                 <div className="w-full bg-gray-200 rounded-full h-2 relative"><div className="bg-green-500 h-2 rounded-full transition-all duration-500 shadow-sm" style={{ width: `${safePercent}%` }}></div></div>
// // // // // // // // //                 <button onClick={() => setShowChat(true)} className="w-full mt-2 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2.5 rounded-lg text-xs font-bold hover:bg-indigo-50 border border-indigo-200 transition-all shadow-sm active:scale-95 relative" aria-label="Hubungi Pengajar">
// // // // // // // // //                     <MessageCircle size={16}/> Hubungi Pengajar
// // // // // // // // //                 </button>
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24 custom-scrollbar">
// // // // // // // // //             {course.modules?.map((module: any, mIdx: number) => (
// // // // // // // // //                 <div key={module._id}>
// // // // // // // // //                     <div className="mb-2 pl-1"><h3 className="text-[11px] font-black text-gray-400 uppercase tracking-wider">MODUL {mIdx + 1}</h3><h4 className="font-bold text-gray-800 text-sm leading-tight">{module.title}</h4></div>
// // // // // // // // //                     <div className="space-y-1">
// // // // // // // // //                         {module.lessons?.map((lesson: any) => {
// // // // // // // // //                             const isActive = activeLesson?._id === lesson._id;
// // // // // // // // //                             const isCompleted = completedLessonIds.includes(lesson._id);
// // // // // // // // //                             return (
// // // // // // // // //                                 <button key={lesson._id} onClick={() => setActiveLesson(lesson)} className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group ${isActive ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-200' : 'hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200'}`} aria-label={`Buka materi ${lesson.title}`}>
// // // // // // // // //                                     <div className="flex items-center gap-3 overflow-hidden">
// // // // // // // // //                                         <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors ${isActive ? 'border-white/30 bg-white/20 text-white' : isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 bg-white text-transparent'}`}><CheckCircle size={12} /></div>
// // // // // // // // //                                         <div className="min-w-0"><span className={`text-xs font-bold truncate block ${isActive ? 'text-white' : 'text-gray-700'}`}>{lesson.title}</span></div>
// // // // // // // // //                                     </div>
// // // // // // // // //                                     <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity">{lesson.type === 'video_url' ? <PlayCircle size={14}/> : <FileText size={14}/>}</span>
// // // // // // // // //                                 </button>
// // // // // // // // //                             );
// // // // // // // // //                         })}
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
// // // // // // // // //             ))}
// // // // // // // // //         </div>
// // // // // // // // //       </aside>

// // // // // // // // //       <main className="flex-1 flex flex-col bg-gray-50 relative h-full overflow-hidden w-full">
// // // // // // // // //         <div className="md:hidden p-4 bg-white border-b flex justify-between items-center flex-shrink-0 z-20 shadow-sm">
// // // // // // // // //             <div className="min-w-0"><h1 className="font-bold text-gray-800 truncate text-sm">{activeLesson?.title}</h1></div>
// // // // // // // // //             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200" aria-label="Toggle Menu" title="Menu"><Menu size={20}/></button>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 w-full custom-scrollbar">
// // // // // // // // //             <div className="max-w-4xl mx-auto space-y-6">
// // // // // // // // //                 <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 mb-2">
// // // // // // // // //                     <span className="uppercase tracking-wider text-xs font-bold bg-gray-200 px-2 py-0.5 rounded text-gray-600">{activeLesson?.type?.replace('_', ' ') || 'MATERI'}</span>
// // // // // // // // //                     <span className="text-gray-300">/</span>
// // // // // // // // //                     <h1 className="text-gray-900 font-bold text-lg">{activeLesson?.title}</h1>
// // // // // // // // //                 </div>
// // // // // // // // //                 {renderContent()}
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //         {activeLesson?.type !== 'quiz' && (
// // // // // // // // //             <div className="bg-white border-t p-4 absolute bottom-0 w-full z-20 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
// // // // // // // // //                 <div className="max-w-4xl mx-auto flex justify-between items-center">
// // // // // // // // //                     <button className="text-gray-500 font-bold text-sm hover:text-gray-800 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Sebelumnya">← Sebelumnya</button>
// // // // // // // // //                     <button onClick={handleManualComplete} className={`px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-transform active:scale-95 text-white ${completedLessonIds.includes(activeLesson?._id) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Lanjut">
// // // // // // // // //                         <span>{completedLessonIds.includes(activeLesson?._id) ? 'Lanjut Berikutnya' : 'Selesai & Lanjut'}</span><span>→</span>
// // // // // // // // //                     </button>
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //         )}
// // // // // // // // //       </main>

// // // // // // // // //       {showChat && <ChatWithFacilitatorModal facilitators={chatableFacilitators} unreadSenderId={unreadSenderId} initialSelectedId={toastData?.senderId} onClose={() => { setShowChat(false); setToastData(null); }} />}
// // // // // // // // //       {toastData && !showChat && <ChatToast data={toastData} onOpen={() => { setToastData(null); setShowChat(true); }} onClose={() => setToastData(null)} />}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }
// // // // // // // // 'use client';

// // // // // // // // import { useState, useEffect, useRef, useMemo } from 'react';
// // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // import Link from 'next/link';
// // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // // // // // import { 
// // // // // // // //     Calendar, PlayCircle, CheckCircle, FileText, MessageCircle, 
// // // // // // // //     X, Menu, Send, BookOpen, Users, Lock, Clock,
// // // // // // // //     UploadCloud, Download, BarChart, MonitorPlay, ChevronLeft, ChevronRight, School
// // // // // // // // } from 'lucide-react';
// // // // // // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';

// // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // import 'react-quill/dist/quill.snow.css';

// // // // // // // // // Editor text untuk jawaban peserta (Load lazy agar ringan)
// // // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // // //     ssr: false,
// // // // // // // //     loading: () => <div className="h-24 bg-gray-50 animate-pulse rounded-lg border border-gray-200"></div>
// // // // // // // // });

// // // // // // // // // --- HELPER: FORMAT TANGGAL & NAMA ---
// // // // // // // // const formatDate = (dateString: string) => {
// // // // // // // //     if (!dateString) return '-';
// // // // // // // //     return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
// // // // // // // // };

// // // // // // // // const getFacilitatorName = (fac: any) => {
// // // // // // // //     if (!fac) return '-';
// // // // // // // //     if (typeof fac === 'string') return 'Fasilitator';
// // // // // // // //     return fac.name || 'Fasilitator';
// // // // // // // // };

// // // // // // // // // --- KOMPONEN PENDUKUNG ---
// // // // // // // // function ChatToast({ data, onOpen, onClose }: any) {
// // // // // // // //   useEffect(() => { const timer = setTimeout(onClose, 10000); return () => clearTimeout(timer); }, [onClose]);
// // // // // // // //   return (
// // // // // // // //     <div className="fixed bottom-32 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
// // // // // // // //       <div className="bg-white rounded-xl shadow-2xl border-l-4 border-l-green-500 border-y border-r border-gray-100 p-4 w-80 flex items-start gap-3 relative cursor-pointer hover:bg-gray-50 transition-colors" onClick={onOpen}>
// // // // // // // //         <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 bg-white rounded-full" aria-label="Tutup Notifikasi" title="Tutup Notifikasi"><X size={14} /></button>
// // // // // // // //         <div className="relative flex-shrink-0"><img src={getImageUrl(data.senderAvatar)} alt={data.senderName} className="w-10 h-10 rounded-full object-cover border-2 border-green-500"/><span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span></div>
// // // // // // // //         <div className="flex-1 min-w-0"><div className="flex justify-between items-center mb-0.5"><h4 className="font-bold text-sm text-gray-800 truncate pr-4">{data.senderName}</h4><span className="text-[10px] text-gray-400">Baru saja</span></div><p className="text-xs text-green-600 font-bold mb-0.5">Pesan Baru!</p><p className="text-xs text-gray-500 line-clamp-2 leading-relaxed italic">"{data.message}"</p></div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // function ChatWithFacilitatorModal({ facilitators, initialSelectedId, unreadSenderId, onClose }: any) {
// // // // // // // //     const [selectedFacilitator, setSelectedFacilitator] = useState<any>(initialSelectedId ? facilitators.find((f: any) => f._id === initialSelectedId) : (unreadSenderId ? facilitators.find((f: any) => f._id === unreadSenderId) : (facilitators.length === 1 ? facilitators[0] : null)));
// // // // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // // // //     const [message, setMessage] = useState('');
// // // // // // // //     const [sending, setSending] = useState(false);
// // // // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);
// // // // // // // //     useEffect(() => { if (selectedFacilitator?._id) { loadHistory(); const interval = setInterval(loadHistory, 3000); return () => clearInterval(interval); } }, [selectedFacilitator]);
// // // // // // // //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
// // // // // // // //     const loadHistory = async () => { try { const res = await api(`/api/chat/${selectedFacilitator._id}`); setMessages(res.messages || []); } catch (e) { console.error(e); } };
// // // // // // // //     const handleSend = async (e: React.FormEvent) => { e.preventDefault(); if (!message.trim() || !selectedFacilitator) return; const tempMsg = { _id: Date.now(), sender: 'me', message: message, createdAt: new Date().toISOString() }; setMessages(prev => [...prev, tempMsg]); setMessage(''); setSending(true); try { await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message: tempMsg.message } }); loadHistory(); } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); } };
// // // // // // // //     return (<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm"><div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]"><div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10"><h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18}/> Hubungi Pengajar</h3><button onClick={onClose} aria-label="Tutup Chat" title="Tutup Chat"><X size={20} /></button></div>{!selectedFacilitator ? (<div className="flex-1 flex flex-col bg-gray-50 overflow-hidden"><div className="p-4 bg-white border-b shadow-sm z-10"><p className="text-sm text-gray-700 font-bold">Pilih Fasilitator:</p></div><div className="p-4 overflow-y-auto custom-scrollbar space-y-2 flex-1">{facilitators.map((fac: any) => (<button key={fac._id} onClick={() => setSelectedFacilitator(fac)} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left group relative ${fac._id === unreadSenderId ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200 hover:border-indigo-300'}`} aria-label={`Chat ${fac.name}`}><img src={getImageUrl(fac.avatarUrl)} className="w-12 h-12 rounded-full object-cover" alt={fac.name} /><div className="flex-1 min-w-0"><p className="font-bold text-sm truncate">{fac.name}</p><p className="text-xs text-gray-500">{fac.role || 'Fasilitator'}</p></div></button>))}</div></div>) : (<><div className="p-3 bg-white border-b flex items-center gap-3 shadow-sm z-10"><button onClick={() => setSelectedFacilitator(null)} className="text-xs font-bold" aria-label="Kembali" title="Kembali">← Kembali</button><div className="flex items-center gap-2 border-l pl-3"><img src={getImageUrl(selectedFacilitator.avatarUrl)} className="w-9 h-9 rounded-full bg-gray-200 object-cover" alt={selectedFacilitator.name} /><div><p className="text-sm font-bold text-gray-800 leading-tight">{selectedFacilitator.name}</p><span className="text-[10px] text-green-600 bg-green-50 px-1.5 rounded-full border border-green-100">Online</span></div></div></div><div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">{messages.length === 0 ? <div className="text-center text-gray-400 text-xs mt-10">Mulai diskusi!</div> : messages.map((msg: any, idx: number) => (<div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${msg.sender === 'me' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800'}`}><p>{msg.message}</p></div></div>))}<div ref={messagesEndRef} /></div><form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2"><input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus aria-label="Ketik Pesan" /><button disabled={sending} type="submit" className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center" aria-label="Kirim" title="Kirim"><Send size={16}/></button></form></>)}</div></div>);
// // // // // // // // }

// // // // // // // // // --- MAIN PAGE ---
// // // // // // // // export default function StudentCoursePlayPage() {
// // // // // // // //   const router = useRouter();
// // // // // // // //   const params = useParams();
// // // // // // // //   const { user } = useAuth();
// // // // // // // //   const { courseId } = params as { courseId: string };

// // // // // // // //   const [course, setCourse] = useState<any>(null);
// // // // // // // //   const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // // // //   const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // // // // // // //   const [progressPercent, setProgressPercent] = useState(0);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
// // // // // // // //   // STATE PENDAFTARAN & CHAT
// // // // // // // //   const [isEnrolled, setIsEnrolled] = useState(false);
// // // // // // // //   const [showRegisterModal, setShowRegisterModal] = useState(false);
// // // // // // // //   const [showChat, setShowChat] = useState(false);
// // // // // // // //   const [chatableFacilitators, setChatableFacilitators] = useState<any[]>([]);
// // // // // // // //   const [unreadSenderId, setUnreadSenderId] = useState<string | null>(null);
// // // // // // // //   const [toastData, setToastData] = useState<any>(null);

// // // // // // // //   // STATE INTERAKTIF
// // // // // // // //   const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// // // // // // // //   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// // // // // // // //   const [pollSelected, setPollSelected] = useState<number | null>(null);
// // // // // // // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // // // // // // //   const quillModules = useMemo(() => ({
// // // // // // // //     toolbar: [['bold', 'italic', 'underline'], [{'list': 'ordered'}, {'list': 'bullet'}], ['clean']]
// // // // // // // //   }), []);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const loadData = async () => {
// // // // // // // //       try {
// // // // // // // //         setLoading(true);
// // // // // // // //         const resCourse = await api(`/api/courses/${courseId}`);
// // // // // // // //         const courseData = resCourse.course || resCourse;
// // // // // // // //         setCourse(courseData);

// // // // // // // //         // Cek Pendaftaran
// // // // // // // //         try {
// // // // // // // //             const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// // // // // // // //             setIsEnrolled(enrollRes.isEnrolled);
// // // // // // // //             if (enrollRes.isEnrolled) {
// // // // // // // //                 const resProgress = await api(`/api/progress/${courseId}`).catch(() => ({ completedLessons: [] }));
// // // // // // // //                 setCompletedLessonIds(resProgress.completedLessons || []);
// // // // // // // //             }
// // // // // // // //         } catch (e) { console.error("Gagal cek enrollment", e); }

// // // // // // // //         if (courseData.facilitatorIds && Array.isArray(courseData.facilitatorIds)) {
// // // // // // // //             const validFacs = courseData.facilitatorIds.filter((f: any) => f && f.name && f._id !== user?.id);
// // // // // // // //             setChatableFacilitators(validFacs);
// // // // // // // //         }

// // // // // // // //         if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
// // // // // // // //       } catch (e: any) { console.error(e); } finally { setLoading(false); }
// // // // // // // //     };
// // // // // // // //     if (courseId && user) loadData();
// // // // // // // //   }, [courseId, user]);

// // // // // // // //   // RESET STATE SAAT GANTI MATERI
// // // // // // // //   useEffect(() => {
// // // // // // // //       setUploadedFile(null);
// // // // // // // //       setPollSelected(null);
// // // // // // // //       setIsSubmitting(false);

// // // // // // // //       if (activeLesson?.type === 'essay' && activeLesson.questions) {
// // // // // // // //           setEssayAnswers(new Array(activeLesson.questions.length).fill(''));
// // // // // // // //       } else {
// // // // // // // //           setEssayAnswers([]);
// // // // // // // //       }
// // // // // // // //   }, [activeLesson]);

// // // // // // // //   const handleEssayChange = (index: number, value: string) => {
// // // // // // // //       const newAnswers = [...essayAnswers];
// // // // // // // //       newAnswers[index] = value;
// // // // // // // //       setEssayAnswers(newAnswers);
// // // // // // // //   };

// // // // // // // //   // Polling Chat
// // // // // // // //   useEffect(() => {
// // // // // // // //       if (!user) return;
// // // // // // // //       const checkNewMessages = async () => {
// // // // // // // //           try {
// // // // // // // //               const res = await api('/api/chat/conversations');
// // // // // // // //               if (res.conversations && res.conversations.length > 0) {
// // // // // // // //                   const latestConv = res.conversations[0];
// // // // // // // //                   const latestMsg = latestConv.lastMessage;
// // // // // // // //                   if (!latestMsg) return;
// // // // // // // //                   const senderId = typeof latestMsg.sender === 'object' ? latestMsg.sender._id : latestMsg.sender;
// // // // // // // //                   if (senderId !== user.id) {
// // // // // // // //                       setUnreadSenderId(senderId); 
// // // // // // // //                   }
// // // // // // // //               }
// // // // // // // //           } catch (e) { /* Silent */ }
// // // // // // // //       };
// // // // // // // //       checkNewMessages(); 
// // // // // // // //       const interval = setInterval(checkNewMessages, 10000);
// // // // // // // //       return () => clearInterval(interval);
// // // // // // // //   }, [user]);

// // // // // // // //   // Progress Bar
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (course) {
// // // // // // // //         let total = 0; let completed = 0;
// // // // // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) { total++; if (completedLessonIds.includes(l._id)) completed++; } }); });
// // // // // // // //         setProgressPercent(total === 0 ? 0 : Math.round((completed / total) * 100));
// // // // // // // //     }
// // // // // // // //   }, [completedLessonIds, course]);

// // // // // // // //   const markLessonAsComplete = async (lessonId: string) => {
// // // // // // // //     if (!completedLessonIds.includes(lessonId)) {
// // // // // // // //         try { await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId } }); setCompletedLessonIds(prev => [...prev, lessonId]); } catch(e) { console.error(e); }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleNextLesson = () => {
// // // // // // // //     const allLessons: any[] = [];
// // // // // // // //     course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // // //     const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // // //     if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // // // // // // //     else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // // // // // // //   };

// // // // // // // //   const handlePrevLesson = () => {
// // // // // // // //     const allLessons: any[] = [];
// // // // // // // //     course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // // //     const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // // //     if (currIdx > 0) { setActiveLesson(allLessons[currIdx - 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }
// // // // // // // //   };

// // // // // // // //   const handleSubmitTask = async () => {
// // // // // // // //       setIsSubmitting(true);
// // // // // // // //       try {
// // // // // // // //           if (activeLesson.type === 'essay') {
// // // // // // // //               if (essayAnswers.some(ans => ans.trim() === '')) return alert("Mohon jawab semua pertanyaan.");
// // // // // // // //               alert("Jawaban Esai Terkirim!");
// // // // // // // //           } 
// // // // // // // //           else if (activeLesson.type === 'upload_doc') { if (!uploadedFile) return alert("Pilih file terlebih dahulu."); alert("File Berhasil Diupload!"); }
// // // // // // // //           else if (activeLesson.type === 'poll') { if (pollSelected === null) return alert("Pilih salah satu opsi."); alert("Terima kasih atas partisipasi polling Anda!"); }
          
// // // // // // // //           await markLessonAsComplete(activeLesson._id);
// // // // // // // //           handleNextLesson();
// // // // // // // //       } catch (e: any) { alert("Gagal mengirim: " + e.message); } finally { setIsSubmitting(false); }
// // // // // // // //   };

// // // // // // // //   const handleManualComplete = async () => { await markLessonAsComplete(activeLesson._id); handleNextLesson(); };
// // // // // // // //   const handleQuizCompleted = async () => { await markLessonAsComplete(activeLesson._id); };

// // // // // // // //   // ==========================================
// // // // // // // //   // RENDER CONTENT HEADER (TITLE & METADATA)
// // // // // // // //   // ==========================================
// // // // // // // //   const renderContentHeader = (title: string) => {
// // // // // // // //       return (
// // // // // // // //         <div className="mb-6 border-b border-gray-100 pb-4">
// // // // // // // //             {/* Breadcrumb */}
// // // // // // // //             <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// // // // // // // //                 <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600">{activeLesson?.type?.replace('_', ' ') || 'MATERI'}</span>
// // // // // // // //             </div>

// // // // // // // //             {/* Title & Metadata */}
// // // // // // // //             <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
// // // // // // // //                 <h1 className="text-gray-900 font-bold text-2xl flex-1 leading-tight">{title}</h1>
// // // // // // // //                 <div className="flex-shrink-0">
// // // // // // // //                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
// // // // // // // //                         <div className="flex items-center gap-1 truncate max-w-[150px]" title={getFacilitatorName(activeLesson.facilitatorId || activeLesson.facilitator)}><Users size={12} className="text-indigo-500 shrink-0"/> <span className="truncate">{getFacilitatorName(activeLesson.facilitatorId || activeLesson.facilitator)}</span></div>
// // // // // // // //                         {activeLesson.jp > 0 && <div className="flex items-center gap-1 border-l border-gray-200 pl-3"><Clock size={12} className="text-indigo-500 shrink-0"/> <span>{activeLesson.jp} JP</span></div>}
// // // // // // // //                         {activeLesson.scheduleDate && <div className="flex items-center gap-1 border-l border-gray-200 pl-3"><Calendar size={12} className="text-indigo-500 shrink-0"/> <span>{formatDate(activeLesson.scheduleDate)}</span></div>}
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //       );
// // // // // // // //   }

// // // // // // // //   // ==========================================
// // // // // // // //   // RENDER CONTENT BODY
// // // // // // // //   // ==========================================
// // // // // // // //   const renderContent = () => {
// // // // // // // //     if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping untuk mulai belajar.</div>;
// // // // // // // //     if (activeLesson.type === 'quiz') return <QuizPlayer quizId={activeLesson._id} courseId={courseId} onComplete={handleQuizCompleted} />;

// // // // // // // //     if (activeLesson.type === 'essay') {
// // // // // // // //         return (
// // // // // // // //             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // //                 <div className="prose max-w-none mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
// // // // // // // //                 <div className="space-y-8">
// // // // // // // //                     {activeLesson.questions && activeLesson.questions.map((q: any, i: number) => (
// // // // // // // //                         <div key={i} className="border border-gray-200 rounded-xl p-6 shadow-sm">
// // // // // // // //                             <div className="flex gap-3 mb-4">
// // // // // // // //                                 <span className="flex-shrink-0 bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">{i+1}</span>
// // // // // // // //                                 <div className="font-medium text-gray-800 pt-1 text-lg">{q.question}</div>
// // // // // // // //                             </div>
// // // // // // // //                             <div className="ml-11">
// // // // // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Jawaban Anda:</label>
// // // // // // // //                                 <div className="bg-white border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition-shadow">
// // // // // // // //                                     <ReactQuill theme="snow" value={essayAnswers[i] || ''} onChange={(val) => handleEssayChange(i, val)} modules={quillModules} placeholder="Ketik jawaban di sini..." className="bg-white" />
// // // // // // // //                                 </div>
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                     ))}
// // // // // // // //                 </div>
// // // // // // // //                 <div className="mt-8 flex justify-end"><button onClick={handleSubmitTask} disabled={isSubmitting} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center gap-2" aria-label="Kirim Semua Jawaban"><Send size={18}/> {isSubmitting ? 'Mengirim...' : 'Kirim Semua Jawaban'}</button></div>
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     }

// // // // // // // //     if (activeLesson.type === 'video_url') {
// // // // // // // //         let embedUrl = activeLesson.videoUrl;
// // // // // // // //         if (activeLesson.videoUrl?.includes('youtube.com') || activeLesson.videoUrl?.includes('youtu.be')) {
// // // // // // // //             const vId = activeLesson.videoUrl.split(activeLesson.videoUrl.includes('v=') ? 'v=' : '/').pop().split('&')[0];
// // // // // // // //             embedUrl = `https://www.youtube.com/embed/${vId}`;
// // // // // // // //         }
// // // // // // // //         return (
// // // // // // // //             <div className="bg-white p-6 rounded-xl border border-gray-100">
// // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // //                 <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg"><iframe src={embedUrl} className="w-full h-full" allowFullScreen title={`Video: ${activeLesson.title}`}/></div>
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     }

// // // // // // // //     if (activeLesson.type === 'poll') {
// // // // // // // //         return (
// // // // // // // //             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
// // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // //                 <BarChart size={48} className="mx-auto text-indigo-500 mb-4"/>
// // // // // // // //                 <h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.pollQuestion || activeLesson.title}</h2>
// // // // // // // //                 <div className="space-y-3 max-w-md mx-auto my-6">{activeLesson.pollOptions?.map((opt: string, idx: number) => (<button key={idx} onClick={() => setPollSelected(idx)} className={`w-full p-4 rounded-xl border text-left font-medium transition-all ${pollSelected === idx ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-2 ring-indigo-500' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>))}</div>
// // // // // // // //                 <button onClick={handleSubmitTask} disabled={pollSelected === null || isSubmitting} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95" aria-label="Kirim Polling">Kirim Polling</button>
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     }

// // // // // // // //     if (activeLesson.type === 'slide' || activeLesson.type === 'pdf' || activeLesson.type === 'download_doc') {
// // // // // // // //         const fullFileUrl = getImageUrl(activeLesson.fileUrl); 
// // // // // // // //         const isPdf = fullFileUrl.toLowerCase().endsWith('.pdf');
// // // // // // // //         return (
// // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col min-h-[60vh]">
// // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // //                 {isPdf ? (<iframe src={fullFileUrl} className="w-full flex-1 rounded-lg border bg-gray-100" title="Document Viewer"></iframe>) : (<div className="flex-1 flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"><FileText size={64} className="text-gray-400 mb-4"/><p className="text-gray-500 mb-4 text-center font-medium">File ini tidak dapat dipreview langsung.</p><a href={fullFileUrl} target="_blank" rel="noreferrer" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg" aria-label="Download File"><Download size={20}/> Download File</a></div>)}
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     }

// // // // // // // //     if (activeLesson.type === 'image') {
// // // // // // // //         return (
// // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
// // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // //                 {activeLesson.fileUrl ? (<img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto rounded-lg shadow-md mx-auto" />) : (<div className="p-10 bg-gray-100 rounded-lg text-gray-400">Gambar tidak ditemukan</div>)}
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     }

// // // // // // // //     if (activeLesson.type === 'upload_doc') {
// // // // // // // //         return (
// // // // // // // //             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // //                 <div className="prose max-w-none mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-900" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
// // // // // // // //                 <div className="border-2 border-dashed border-indigo-200 rounded-xl p-8 text-center bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer relative">
// // // // // // // //                     <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setUploadedFile(e.target.files?.[0] || null)} aria-label="Upload File" />
// // // // // // // //                     <UploadCloud size={48} className="mx-auto text-indigo-400 mb-2"/>
// // // // // // // //                     <p className="text-indigo-800 font-bold">{uploadedFile ? uploadedFile.name : "Klik atau Tarik File ke Sini"}</p>
// // // // // // // //                     <p className="text-xs text-indigo-500 mt-1">PDF, DOCX, JPG, PNG (Max 10MB)</p>
// // // // // // // //                 </div>
// // // // // // // //                 <button onClick={handleSubmitTask} disabled={!uploadedFile || isSubmitting} className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition-all active:scale-95" aria-label="Kirim Tugas">{isSubmitting ? 'Mengupload...' : 'Kirim Tugas'}</button>
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     }

// // // // // // // //     if (activeLesson.type === 'virtual_class') {
// // // // // // // //         const meetingLink = activeLesson.meetingLink || activeLesson.content; 
// // // // // // // //         return (
// // // // // // // //             <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100 text-center space-y-6">
// // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // //                 <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-5xl shadow-inner text-blue-600"><MonitorPlay size={48}/></div>
// // // // // // // //                 <div><h3 className="text-2xl font-bold text-gray-800 mb-2">Meeting Virtual</h3><p className="text-gray-500 max-w-md mx-auto">Silakan klik tombol di bawah untuk bergabung ke meeting (Zoom / Teams / GMeet).</p></div>
// // // // // // // //                 {meetingLink ? (<a href={meetingLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-blue-700 transition-transform hover:scale-105 flex items-center gap-2 text-lg" aria-label="Gabung Meeting">Gabung Meeting Sekarang <span>↗</span></a>) : (<div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold">Link meeting belum tersedia.</div>)}
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     }

// // // // // // // //     if (activeLesson.type === 'google_classroom') {
// // // // // // // //         return (
// // // // // // // //             <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100 text-center space-y-6">
// // // // // // // //                  {renderContentHeader(activeLesson.title)}
// // // // // // // //                 <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl shadow-inner">🏫</div>
// // // // // // // //                 <div><h3 className="text-2xl font-bold text-gray-800 mb-2">Google Classroom</h3><p className="text-gray-500 max-w-md mx-auto">Materi ini diselenggarakan via Google Classroom.</p></div>
// // // // // // // //                 <a href={activeLesson.classroomData?.alternateLink || '#'} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-green-700 transition-transform hover:scale-105 flex items-center gap-2 text-lg" aria-label="Buka Classroom">Buka Classroom <span>↗</span></a>
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     }

// // // // // // // //     return (
// // // // // // // //         <div className="prose max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-gray-800 leading-relaxed">
// // // // // // // //             {renderContentHeader(activeLesson.title)}
// // // // // // // //             <div dangerouslySetInnerHTML={{ __html: activeLesson.content || '<p class="text-gray-400 italic">Belum ada konten materi.</p>' }} />
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // //   };

// // // // // // // //   if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // // // // // //   if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;

// // // // // // // //   if (!isEnrolled) {
// // // // // // // //       return (
// // // // // // // //         <div className="min-h-screen bg-gray-50 pb-20">
// // // // // // // //             {showRegisterModal && (<CourseRegistrationModal courseId={courseId} courseTitle={course.title} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => { setShowRegisterModal(false); setIsEnrolled(true); alert("Pendaftaran Berhasil! Selamat belajar."); window.location.reload(); }} />)}
// // // // // // // //             <div className="bg-gray-900 text-white relative">
// // // // // // // //                 <div className="absolute inset-0 bg-black/60 z-0"></div>
// // // // // // // //                 {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" alt="bg" />}
// // // // // // // //                 <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
// // // // // // // //                     <div className="lg:col-span-2 space-y-6">
// // // // // // // //                         <div className="inline-block bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{course.programType === 'training' ? 'Diklat' : 'Kursus'}</div>
// // // // // // // //                         <h1 className="text-4xl font-extrabold leading-tight">{course.title}</h1>
// // // // // // // //                         <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
// // // // // // // //                             <div className="flex items-center gap-2"><Users size={18}/> {course.facilitatorIds?.length || 1} Fasilitator</div>
// // // // // // // //                             <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
// // // // // // // //                             <div className="flex items-center gap-2"><Clock size={18}/> Fleksibel</div>
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="lg:col-span-1 bg-white text-gray-900 p-6 rounded-2xl shadow-xl">
// // // // // // // //                         <div className="text-center mb-6"><p className="text-gray-500 text-sm">Biaya Pelatihan</p><p className="text-3xl font-extrabold text-green-600">{course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}</p></div>
// // // // // // // //                         <button onClick={() => setShowRegisterModal(true)} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2" aria-label="Daftar Sekarang">📝 Daftar Sekarang</button>
// // // // // // // //                         <p className="text-xs text-center text-gray-400 mt-4">Klik daftar untuk mengisi formulir peserta.</p>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //             <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
// // // // // // // //                 <div className="lg:col-span-2 space-y-8">
// // // // // // // //                     <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"><h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="text-red-600"/> Tentang Pelatihan</h3><div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: course.description || '<p>Tidak ada deskripsi.</p>' }} /></div>
// // // // // // // //                     <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"><h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><BookOpen className="text-red-600"/> Kurikulum (Terkunci)</h3><div className="space-y-4">{course.modules?.map((mod: any, idx: number) => (<div key={mod._id} className="border rounded-xl overflow-hidden opacity-70"><div className="bg-gray-50 p-4 font-bold text-gray-700 flex justify-between"><span>Modul {idx+1}: {mod.title}</span><Lock size={16} className="text-gray-400"/></div><div className="bg-white p-4 text-sm text-gray-500 italic flex items-center gap-2"><Lock size={14}/> {mod.lessons?.length || 0} Materi (Daftar untuk akses)</div></div>))}</div></div>
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //       );
// // // // // // // //   }

// // // // // // // //   const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;
// // // // // // // //   const isFirstLesson = course?.modules?.[0]?.lessons?.[0]?._id === activeLesson?._id;

// // // // // // // //   return (
// // // // // // // //     <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // // // // // // //       <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 flex flex-col md:relative absolute z-30 h-full shadow-xl md:shadow-none`}>
// // // // // // // //         <div className="p-5 border-b border-gray-100 bg-white">
// // // // // // // //             <Link href="/courses" className="text-[10px] font-bold text-gray-400 hover:text-indigo-600 mb-3 flex items-center gap-1 uppercase tracking-wide" aria-label="Kembali ke Katalog"><span>←</span> Kembali ke Katalog</Link>
// // // // // // // //             <h2 className="font-bold text-gray-800 text-lg leading-tight mb-4 line-clamp-2">{course.title}</h2>
// // // // // // // //             <div className="space-y-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
// // // // // // // //                 <div className="flex justify-between text-xs font-bold text-gray-600 mb-1"><span>Progress Belajar</span><span className="text-indigo-600">{safePercent}%</span></div>
// // // // // // // //                 <div className="w-full bg-gray-200 rounded-full h-2 relative"><div className="bg-green-500 h-2 rounded-full transition-all duration-500 shadow-sm" style={{ width: `${safePercent}%` }}></div></div>
// // // // // // // //                 <button onClick={() => setShowChat(true)} className="w-full mt-2 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2.5 rounded-lg text-xs font-bold hover:bg-indigo-50 border border-indigo-200 transition-all shadow-sm active:scale-95 relative" aria-label="Hubungi Pengajar">
// // // // // // // //                     <MessageCircle size={16}/> Hubungi Pengajar
// // // // // // // //                 </button>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //         <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24 custom-scrollbar">
// // // // // // // //             {course.modules?.map((module: any, mIdx: number) => (
// // // // // // // //                 <div key={module._id}>
// // // // // // // //                     {/* HEADER MODUL DI SIDEBAR */}
// // // // // // // //                     <div className="mb-2 pl-1">
// // // // // // // //                         <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-wider">MODUL {mIdx + 1}</h3>
// // // // // // // //                         <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1">{module.title}</h4>
// // // // // // // //                         <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-500">
// // // // // // // //                              {module.jp > 0 && <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100 font-bold">{module.jp} JP</span>}
// // // // // // // //                              {module.facilitatorId && <span className="flex items-center gap-0.5 truncate max-w-[100px]" title={getFacilitatorName(module.facilitatorId)}>👤 {getFacilitatorName(module.facilitatorId)}</span>}
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="space-y-1">
// // // // // // // //                         {module.lessons?.map((lesson: any) => {
// // // // // // // //                             const isActive = activeLesson?._id === lesson._id;
// // // // // // // //                             const isCompleted = completedLessonIds.includes(lesson._id);
// // // // // // // //                             return (
// // // // // // // //                                 <button key={lesson._id} onClick={() => setActiveLesson(lesson)} className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group ${isActive ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-200' : 'hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200'}`} aria-label={`Buka materi ${lesson.title}`}>
// // // // // // // //                                     <div className="flex items-center gap-3 overflow-hidden">
// // // // // // // //                                         <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors ${isActive ? 'border-white/30 bg-white/20 text-white' : isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 bg-white text-transparent'}`}><CheckCircle size={12} /></div>
// // // // // // // //                                         <div className="min-w-0">
// // // // // // // //                                             <span className={`text-xs font-bold truncate block ${isActive ? 'text-white' : 'text-gray-700'}`}>{lesson.title}</span>
// // // // // // // //                                         </div>
// // // // // // // //                                     </div>
// // // // // // // //                                     <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity">{lesson.type === 'video_url' ? <PlayCircle size={14}/> : <FileText size={14}/>}</span>
// // // // // // // //                                 </button>
// // // // // // // //                             );
// // // // // // // //                         })}
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             ))}
// // // // // // // //         </div>
// // // // // // // //       </aside>

// // // // // // // //       <main className="flex-1 flex flex-col bg-gray-50 relative h-full overflow-hidden w-full">
// // // // // // // //         <div className="md:hidden p-4 bg-white border-b flex justify-between items-center flex-shrink-0 z-20 shadow-sm">
// // // // // // // //             <div className="min-w-0"><h1 className="font-bold text-gray-800 truncate text-sm">{activeLesson?.title}</h1></div>
// // // // // // // //             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200" aria-label="Toggle Menu" title="Menu"><Menu size={20}/></button>
// // // // // // // //         </div>
        
// // // // // // // //         {/* [NEW] FLOATING NAV BUTTONS (FIXED AT BOTTOM RIGHT) */}
// // // // // // // //         {activeLesson?.type !== 'quiz' && (
// // // // // // // //             <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
// // // // // // // //                 <button 
// // // // // // // //                     onClick={handlePrevLesson} 
// // // // // // // //                     disabled={isFirstLesson} 
// // // // // // // //                     className="w-12 h-12 rounded-full bg-white text-gray-600 border border-gray-200 shadow-lg flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all" 
// // // // // // // //                     aria-label="Materi Sebelumnya" 
// // // // // // // //                     title="Sebelumnya"
// // // // // // // //                 >
// // // // // // // //                     <ChevronLeft size={20}/>
// // // // // // // //                 </button>
// // // // // // // //                 <button 
// // // // // // // //                     onClick={handleManualComplete} 
// // // // // // // //                     className={`h-12 px-6 rounded-full font-bold text-white shadow-xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 ${completedLessonIds.includes(activeLesson?._id) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`} 
// // // // // // // //                     aria-label="Lanjut Berikutnya" 
// // // // // // // //                     title="Lanjut"
// // // // // // // //                 >
// // // // // // // //                     <span>{completedLessonIds.includes(activeLesson?._id) ? 'Next' : 'Selesai'}</span>
// // // // // // // //                     <ChevronRight size={20}/>
// // // // // // // //                 </button>
// // // // // // // //             </div>
// // // // // // // //         )}

// // // // // // // //         <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 w-full custom-scrollbar relative">
// // // // // // // //             <div className="max-w-4xl mx-auto space-y-6">
// // // // // // // //                 {renderContent()}
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //       </main>

// // // // // // // //       {showChat && <ChatWithFacilitatorModal facilitators={chatableFacilitators} unreadSenderId={unreadSenderId} initialSelectedId={toastData?.senderId} onClose={() => { setShowChat(false); setToastData(null); }} />}
// // // // // // // //       {toastData && !showChat && <ChatToast data={toastData} onOpen={() => { setToastData(null); setShowChat(true); }} onClose={() => setToastData(null)} />}
// // // // // // // //     </div>
// // // // // // // //   );

// // // // // // // // 'use client';

// // // // // // // // import { useState, useEffect, useRef, useMemo } from 'react';
// // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // import Link from 'next/link';
// // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // // // // // import { 
// // // // // // // //     Calendar, PlayCircle, CheckCircle, FileText, MessageCircle, 
// // // // // // // //     X, Menu, Send, BookOpen, Users, Lock, Clock,
// // // // // // // //     UploadCloud, Download, BarChart, MonitorPlay, ChevronLeft, ChevronRight, School
// // // // // // // // } from 'lucide-react';
// // // // // // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';

// // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // import 'react-quill/dist/quill.snow.css';

// // // // // // // // // Editor text untuk jawaban peserta (Load lazy agar ringan)
// // // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // // //     ssr: false,
// // // // // // // //     loading: () => <div className="h-24 bg-gray-50 animate-pulse rounded-lg border border-gray-200"></div>
// // // // // // // // });

// // // // // // // // // --- HELPER: FORMAT TANGGAL & NAMA ---
// // // // // // // // const formatDate = (dateString: string) => {
// // // // // // // //     if (!dateString) return '-';
// // // // // // // //     return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
// // // // // // // // };

// // // // // // // // const getFacilitatorName = (fac: any) => {
// // // // // // // //     if (!fac) return '-';
// // // // // // // //     if (typeof fac === 'string') return 'Fasilitator';
// // // // // // // //     return fac.name || 'Fasilitator';
// // // // // // // // };

// // // // // // // // // --- KOMPONEN PENDUKUNG ---
// // // // // // // // function ChatToast({ data, onOpen, onClose }: any) {
// // // // // // // //   useEffect(() => { const timer = setTimeout(onClose, 10000); return () => clearTimeout(timer); }, [onClose]);
// // // // // // // //   return (
// // // // // // // //     <div className="fixed bottom-32 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
// // // // // // // //       <div className="bg-white rounded-xl shadow-2xl border-l-4 border-l-green-500 border-y border-r border-gray-100 p-4 w-80 flex items-start gap-3 relative cursor-pointer hover:bg-gray-50 transition-colors" onClick={onOpen}>
// // // // // // // //         <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 bg-white rounded-full" aria-label="Tutup Notifikasi" title="Tutup Notifikasi"><X size={14} /></button>
// // // // // // // //         <div className="relative flex-shrink-0"><img src={getImageUrl(data.senderAvatar)} alt={data.senderName} className="w-10 h-10 rounded-full object-cover border-2 border-green-500"/><span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span></div>
// // // // // // // //         <div className="flex-1 min-w-0"><div className="flex justify-between items-center mb-0.5"><h4 className="font-bold text-sm text-gray-800 truncate pr-4">{data.senderName}</h4><span className="text-[10px] text-gray-400">Baru saja</span></div><p className="text-xs text-green-600 font-bold mb-0.5">Pesan Baru!</p><p className="text-xs text-gray-500 line-clamp-2 leading-relaxed italic">"{data.message}"</p></div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // function ChatWithFacilitatorModal({ facilitators, initialSelectedId, unreadSenderId, onClose }: any) {
// // // // // // // //     const [selectedFacilitator, setSelectedFacilitator] = useState<any>(initialSelectedId ? facilitators.find((f: any) => f._id === initialSelectedId) : (unreadSenderId ? facilitators.find((f: any) => f._id === unreadSenderId) : (facilitators.length === 1 ? facilitators[0] : null)));
// // // // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // // // //     const [message, setMessage] = useState('');
// // // // // // // //     const [sending, setSending] = useState(false);
// // // // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);
// // // // // // // //     useEffect(() => { if (selectedFacilitator?._id) { loadHistory(); const interval = setInterval(loadHistory, 3000); return () => clearInterval(interval); } }, [selectedFacilitator]);
// // // // // // // //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
// // // // // // // //     const loadHistory = async () => { try { const res = await api(`/api/chat/${selectedFacilitator._id}`); setMessages(res.messages || []); } catch (e) { console.error(e); } };
// // // // // // // //     const handleSend = async (e: React.FormEvent) => { e.preventDefault(); if (!message.trim() || !selectedFacilitator) return; const tempMsg = { _id: Date.now(), sender: 'me', message: message, createdAt: new Date().toISOString() }; setMessages(prev => [...prev, tempMsg]); setMessage(''); setSending(true); try { await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message: tempMsg.message } }); loadHistory(); } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); } };
// // // // // // // //     return (<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm"><div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]"><div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10"><h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18}/> Hubungi Pengajar</h3><button onClick={onClose} aria-label="Tutup Chat" title="Tutup Chat"><X size={20} /></button></div>{!selectedFacilitator ? (<div className="flex-1 flex flex-col bg-gray-50 overflow-hidden"><div className="p-4 bg-white border-b shadow-sm z-10"><p className="text-sm text-gray-700 font-bold">Pilih Fasilitator:</p></div><div className="p-4 overflow-y-auto custom-scrollbar space-y-2 flex-1">{facilitators.map((fac: any) => (<button key={fac._id} onClick={() => setSelectedFacilitator(fac)} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left group relative ${fac._id === unreadSenderId ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200 hover:border-indigo-300'}`} aria-label={`Chat ${fac.name}`}><img src={getImageUrl(fac.avatarUrl)} className="w-12 h-12 rounded-full object-cover" alt={fac.name} /><div className="flex-1 min-w-0"><p className="font-bold text-sm truncate">{fac.name}</p><p className="text-xs text-gray-500">{fac.role || 'Fasilitator'}</p></div></button>))}</div></div>) : (<><div className="p-3 bg-white border-b flex items-center gap-3 shadow-sm z-10"><button onClick={() => setSelectedFacilitator(null)} className="text-xs font-bold" aria-label="Kembali" title="Kembali">← Kembali</button><div className="flex items-center gap-2 border-l pl-3"><img src={getImageUrl(selectedFacilitator.avatarUrl)} className="w-9 h-9 rounded-full bg-gray-200 object-cover" alt={selectedFacilitator.name} /><div><p className="text-sm font-bold text-gray-800 leading-tight">{selectedFacilitator.name}</p><span className="text-[10px] text-green-600 bg-green-50 px-1.5 rounded-full border border-green-100">Online</span></div></div></div><div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">{messages.length === 0 ? <div className="text-center text-gray-400 text-xs mt-10">Mulai diskusi!</div> : messages.map((msg: any, idx: number) => (<div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${msg.sender === 'me' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800'}`}><p>{msg.message}</p></div></div>))}<div ref={messagesEndRef} /></div><form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2"><input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus aria-label="Ketik Pesan" /><button disabled={sending} type="submit" className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center" aria-label="Kirim" title="Kirim"><Send size={16}/></button></form></>)}</div></div>);
// // // // // // // // }

// // // // // // // // // --- MAIN PAGE ---
// // // // // // // // export default function StudentCoursePlayPage() {
// // // // // // // //   const router = useRouter();
// // // // // // // //   const params = useParams();
// // // // // // // //   const { user } = useAuth();
// // // // // // // //   const { courseId } = params as { courseId: string };

// // // // // // // //   const [course, setCourse] = useState<any>(null);
// // // // // // // //   const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // // // //   const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // // // // // // //   const [progressPercent, setProgressPercent] = useState(0);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
// // // // // // // //   // STATE PENDAFTARAN & CHAT
// // // // // // // //   const [isEnrolled, setIsEnrolled] = useState(false);
// // // // // // // //   const [showRegisterModal, setShowRegisterModal] = useState(false);
// // // // // // // //   const [showChat, setShowChat] = useState(false);
// // // // // // // //   const [chatableFacilitators, setChatableFacilitators] = useState<any[]>([]);
// // // // // // // //   const [unreadSenderId, setUnreadSenderId] = useState<string | null>(null);
// // // // // // // //   const [toastData, setToastData] = useState<any>(null);

// // // // // // // //   // STATE INTERAKTIF
// // // // // // // //   const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// // // // // // // //   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// // // // // // // //   const [pollSelected, setPollSelected] = useState<number | null>(null);
// // // // // // // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // // // // // // //   const quillModules = useMemo(() => ({
// // // // // // // //     toolbar: [['bold', 'italic', 'underline'], [{'list': 'ordered'}, {'list': 'bullet'}], ['clean']]
// // // // // // // //   }), []);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const loadData = async () => {
// // // // // // // //       try {
// // // // // // // //         setLoading(true);
// // // // // // // //         const resCourse = await api(`/api/courses/${courseId}`);
// // // // // // // //         const courseData = resCourse.course || resCourse;
// // // // // // // //         setCourse(courseData);

// // // // // // // //         // Cek Pendaftaran
// // // // // // // //         try {
// // // // // // // //             const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// // // // // // // //             setIsEnrolled(enrollRes.isEnrolled);
// // // // // // // //             if (enrollRes.isEnrolled) {
// // // // // // // //                 const resProgress = await api(`/api/progress/${courseId}`).catch(() => ({ completedLessons: [] }));
// // // // // // // //                 setCompletedLessonIds(resProgress.completedLessons || []);
// // // // // // // //             }
// // // // // // // //         } catch (e) { console.error("Gagal cek enrollment", e); }

// // // // // // // //         if (courseData.facilitatorIds && Array.isArray(courseData.facilitatorIds)) {
// // // // // // // //             const validFacs = courseData.facilitatorIds.filter((f: any) => f && f.name && f._id !== user?.id);
// // // // // // // //             setChatableFacilitators(validFacs);
// // // // // // // //         }

// // // // // // // //         if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
// // // // // // // //       } catch (e: any) { console.error(e); } finally { setLoading(false); }
// // // // // // // //     };
// // // // // // // //     if (courseId && user) loadData();
// // // // // // // //   }, [courseId, user]);

// // // // // // // //   // RESET STATE SAAT GANTI MATERI
// // // // // // // //   useEffect(() => {
// // // // // // // //       setUploadedFile(null);
// // // // // // // //       setPollSelected(null);
// // // // // // // //       setIsSubmitting(false);

// // // // // // // //       if (activeLesson?.type === 'essay' && activeLesson.questions) {
// // // // // // // //           setEssayAnswers(new Array(activeLesson.questions.length).fill(''));
// // // // // // // //       } else {
// // // // // // // //           setEssayAnswers([]);
// // // // // // // //       }
// // // // // // // //   }, [activeLesson]);

// // // // // // // //   const handleEssayChange = (index: number, value: string) => {
// // // // // // // //       const newAnswers = [...essayAnswers];
// // // // // // // //       newAnswers[index] = value;
// // // // // // // //       setEssayAnswers(newAnswers);
// // // // // // // //   };

// // // // // // // //   // Polling Chat
// // // // // // // //   useEffect(() => {
// // // // // // // //       if (!user) return;
// // // // // // // //       const checkNewMessages = async () => {
// // // // // // // //           try {
// // // // // // // //               const res = await api('/api/chat/conversations');
// // // // // // // //               if (res.conversations && res.conversations.length > 0) {
// // // // // // // //                   const latestConv = res.conversations[0];
// // // // // // // //                   const latestMsg = latestConv.lastMessage;
// // // // // // // //                   if (!latestMsg) return;
// // // // // // // //                   const senderId = typeof latestMsg.sender === 'object' ? latestMsg.sender._id : latestMsg.sender;
// // // // // // // //                   if (senderId !== user.id) {
// // // // // // // //                       setUnreadSenderId(senderId); 
// // // // // // // //                   }
// // // // // // // //               }
// // // // // // // //           } catch (e) { /* Silent */ }
// // // // // // // //       };
// // // // // // // //       checkNewMessages(); 
// // // // // // // //       const interval = setInterval(checkNewMessages, 10000);
// // // // // // // //       return () => clearInterval(interval);
// // // // // // // //   }, [user]);

// // // // // // // //   // Progress Bar
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (course) {
// // // // // // // //         let total = 0; let completed = 0;
// // // // // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) { total++; if (completedLessonIds.includes(l._id)) completed++; } }); });
// // // // // // // //         setProgressPercent(total === 0 ? 0 : Math.round((completed / total) * 100));
// // // // // // // //     }
// // // // // // // //   }, [completedLessonIds, course]);

// // // // // // // //   const markLessonAsComplete = async (lessonId: string) => {
// // // // // // // //     if (!completedLessonIds.includes(lessonId)) {
// // // // // // // //         try { await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId } }); setCompletedLessonIds(prev => [...prev, lessonId]); } catch(e) { console.error(e); }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleNextLesson = () => {
// // // // // // // //     const allLessons: any[] = [];
// // // // // // // //     course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // // //     const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // // //     if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // // // // // // //     else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // // // // // // //   };

// // // // // // // //   const handlePrevLesson = () => {
// // // // // // // //     const allLessons: any[] = [];
// // // // // // // //     course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // // //     const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // // //     if (currIdx > 0) { setActiveLesson(allLessons[currIdx - 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }
// // // // // // // //   };

// // // // // // // //   const handleSubmitTask = async () => {
// // // // // // // //       setIsSubmitting(true);
// // // // // // // //       try {
// // // // // // // //           if (activeLesson.type === 'essay') {
// // // // // // // //               if (essayAnswers.some(ans => ans.trim() === '')) return alert("Mohon jawab semua pertanyaan.");
// // // // // // // //               alert("Jawaban Esai Terkirim!");
// // // // // // // //           } 
// // // // // // // //           else if (activeLesson.type === 'upload_doc') { if (!uploadedFile) return alert("Pilih file terlebih dahulu."); alert("File Berhasil Diupload!"); }
// // // // // // // //           else if (activeLesson.type === 'poll') { if (pollSelected === null) return alert("Pilih salah satu opsi."); alert("Terima kasih atas partisipasi polling Anda!"); }
          
// // // // // // // //           await markLessonAsComplete(activeLesson._id);
// // // // // // // //           handleNextLesson();
// // // // // // // //       } catch (e: any) { alert("Gagal mengirim: " + e.message); } finally { setIsSubmitting(false); }
// // // // // // // //   };

// // // // // // // //   const handleManualComplete = async () => { await markLessonAsComplete(activeLesson._id); handleNextLesson(); };
// // // // // // // //   const handleQuizCompleted = async () => { await markLessonAsComplete(activeLesson._id); };

// // // // // // // //   // ==========================================
// // // // // // // //   // RENDER CONTENT HEADER (TITLE & METADATA)
// // // // // // // //   // ==========================================
// // // // // // // //   const renderContentHeader = (title: string) => {
// // // // // // // //       return (
// // // // // // // //         <div className="mb-6 border-b border-gray-100 pb-4">
// // // // // // // //             {/* Breadcrumb */}
// // // // // // // //             <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// // // // // // // //                 <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600">{activeLesson?.type?.replace('_', ' ') || 'MATERI'}</span>
// // // // // // // //             </div>

// // // // // // // //             {/* Title & Metadata */}
// // // // // // // //             <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
// // // // // // // //                 <h1 className="text-gray-900 font-bold text-2xl flex-1 leading-tight">{title}</h1>
// // // // // // // //                 <div className="flex-shrink-0">
// // // // // // // //                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
// // // // // // // //                         <div className="flex items-center gap-1 truncate max-w-[150px]" title={getFacilitatorName(activeLesson.facilitatorId || activeLesson.facilitator)}><Users size={12} className="text-indigo-500 shrink-0"/> <span className="truncate">{getFacilitatorName(activeLesson.facilitatorId || activeLesson.facilitator)}</span></div>
// // // // // // // //                         {activeLesson.jp > 0 && <div className="flex items-center gap-1 border-l border-gray-200 pl-3"><Clock size={12} className="text-indigo-500 shrink-0"/> <span>{activeLesson.jp} JP</span></div>}
// // // // // // // //                         {activeLesson.scheduleDate && <div className="flex items-center gap-1 border-l border-gray-200 pl-3"><Calendar size={12} className="text-indigo-500 shrink-0"/> <span>{formatDate(activeLesson.scheduleDate)}</span></div>}
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //       );
// // // // // // // //   }

// // // // // // // //   // ==========================================
// // // // // // // //   // RENDER CONTENT BODY
// // // // // // // //   // ==========================================
// // // // // // // //   const renderContent = () => {
// // // // // // // //     if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping untuk mulai belajar.</div>;
// // // // // // // //     if (activeLesson.type === 'quiz') return <QuizPlayer quizId={activeLesson._id} courseId={courseId} onComplete={handleQuizCompleted} />;

// // // // // // // //     if (activeLesson.type === 'essay') {
// // // // // // // //         return (
// // // // // // // //             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // //                 <div className="prose max-w-none mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
// // // // // // // //                 <div className="space-y-8">
// // // // // // // //                     {activeLesson.questions && activeLesson.questions.map((q: any, i: number) => (
// // // // // // // //                         <div key={i} className="border border-gray-200 rounded-xl p-6 shadow-sm">
// // // // // // // //                             <div className="flex gap-3 mb-4">
// // // // // // // //                                 <span className="flex-shrink-0 bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">{i+1}</span>
// // // // // // // //                                 <div className="font-medium text-gray-800 pt-1 text-lg">{q.question}</div>
// // // // // // // //                             </div>
// // // // // // // //                             <div className="ml-11">
// // // // // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Jawaban Anda:</label>
// // // // // // // //                                 <div className="bg-white border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition-shadow">
// // // // // // // //                                     <ReactQuill theme="snow" value={essayAnswers[i] || ''} onChange={(val) => handleEssayChange(i, val)} modules={quillModules} placeholder="Ketik jawaban di sini..." className="bg-white" />
// // // // // // // //                                 </div>
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                     ))}
// // // // // // // //                 </div>
// // // // // // // //                 <div className="mt-8 flex justify-end"><button onClick={handleSubmitTask} disabled={isSubmitting} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center gap-2" aria-label="Kirim Semua Jawaban"><Send size={18}/> {isSubmitting ? 'Mengirim...' : 'Kirim Semua Jawaban'}</button></div>
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     }

// // // // // // // //     if (activeLesson.type === 'video_url') {
// // // // // // // //         let embedUrl = activeLesson.videoUrl;
// // // // // // // //         if (activeLesson.videoUrl?.includes('youtube.com') || activeLesson.videoUrl?.includes('youtu.be')) {
// // // // // // // //             const vId = activeLesson.videoUrl.split(activeLesson.videoUrl.includes('v=') ? 'v=' : '/').pop().split('&')[0];
// // // // // // // //             embedUrl = `https://www.youtube.com/embed/${vId}`;
// // // // // // // //         }
// // // // // // // //         return (
// // // // // // // //             <div className="bg-white p-6 rounded-xl border border-gray-100">
// // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // //                 <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg"><iframe src={embedUrl} className="w-full h-full" allowFullScreen title={`Video: ${activeLesson.title}`}/></div>
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     }

// // // // // // // //     if (activeLesson.type === 'poll') {
// // // // // // // //         return (
// // // // // // // //             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
// // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // //                 <BarChart size={48} className="mx-auto text-indigo-500 mb-4"/>
// // // // // // // //                 <h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.pollQuestion || activeLesson.title}</h2>
// // // // // // // //                 <div className="space-y-3 max-w-md mx-auto my-6">{activeLesson.pollOptions?.map((opt: string, idx: number) => (<button key={idx} onClick={() => setPollSelected(idx)} className={`w-full p-4 rounded-xl border text-left font-medium transition-all ${pollSelected === idx ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-2 ring-indigo-500' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>))}</div>
// // // // // // // //                 <button onClick={handleSubmitTask} disabled={pollSelected === null || isSubmitting} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95" aria-label="Kirim Polling">Kirim Polling</button>
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     }

// // // // // // // //     if (activeLesson.type === 'slide' || activeLesson.type === 'pdf' || activeLesson.type === 'download_doc') {
// // // // // // // //         const fullFileUrl = getImageUrl(activeLesson.fileUrl); 
// // // // // // // //         const isPdf = fullFileUrl.toLowerCase().endsWith('.pdf');
// // // // // // // //         return (
// // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col min-h-[60vh]">
// // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // //                 {isPdf ? (<iframe src={fullFileUrl} className="w-full flex-1 rounded-lg border bg-gray-100" title="Document Viewer"></iframe>) : (<div className="flex-1 flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"><FileText size={64} className="text-gray-400 mb-4"/><p className="text-gray-500 mb-4 text-center font-medium">File ini tidak dapat dipreview langsung.</p><a href={fullFileUrl} target="_blank" rel="noreferrer" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg" aria-label="Download File"><Download size={20}/> Download File</a></div>)}
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     }

// // // // // // // //     if (activeLesson.type === 'image') {
// // // // // // // //         return (
// // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
// // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // //                 {activeLesson.fileUrl ? (<img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto rounded-lg shadow-md mx-auto" />) : (<div className="p-10 bg-gray-100 rounded-lg text-gray-400">Gambar tidak ditemukan</div>)}
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     }

// // // // // // // //     if (activeLesson.type === 'upload_doc') {
// // // // // // // //         return (
// // // // // // // //             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // //                 <div className="prose max-w-none mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-900" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
// // // // // // // //                 <div className="border-2 border-dashed border-indigo-200 rounded-xl p-8 text-center bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer relative">
// // // // // // // //                     <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setUploadedFile(e.target.files?.[0] || null)} aria-label="Upload File" />
// // // // // // // //                     <UploadCloud size={48} className="mx-auto text-indigo-400 mb-2"/>
// // // // // // // //                     <p className="text-indigo-800 font-bold">{uploadedFile ? uploadedFile.name : "Klik atau Tarik File ke Sini"}</p>
// // // // // // // //                     <p className="text-xs text-indigo-500 mt-1">PDF, DOCX, JPG, PNG (Max 10MB)</p>
// // // // // // // //                 </div>
// // // // // // // //                 <button onClick={handleSubmitTask} disabled={!uploadedFile || isSubmitting} className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition-all active:scale-95" aria-label="Kirim Tugas">{isSubmitting ? 'Mengupload...' : 'Kirim Tugas'}</button>
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     }

// // // // // // // //     if (activeLesson.type === 'virtual_class') {
// // // // // // // //         const meetingLink = activeLesson.meetingLink || activeLesson.content; 
// // // // // // // //         return (
// // // // // // // //             <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100 text-center space-y-6">
// // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // //                 <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-5xl shadow-inner text-blue-600"><MonitorPlay size={48}/></div>
// // // // // // // //                 <div><h3 className="text-2xl font-bold text-gray-800 mb-2">Meeting Virtual</h3><p className="text-gray-500 max-w-md mx-auto">Silakan klik tombol di bawah untuk bergabung ke meeting (Zoom / Teams / GMeet).</p></div>
// // // // // // // //                 {meetingLink ? (<a href={meetingLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-blue-700 transition-transform hover:scale-105 flex items-center gap-2 text-lg" aria-label="Gabung Meeting">Gabung Meeting Sekarang <span>↗</span></a>) : (<div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold">Link meeting belum tersedia.</div>)}
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     }

// // // // // // // //     if (activeLesson.type === 'google_classroom') {
// // // // // // // //         return (
// // // // // // // //             <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100 text-center space-y-6">
// // // // // // // //                  {renderContentHeader(activeLesson.title)}
// // // // // // // //                 <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl shadow-inner">🏫</div>
// // // // // // // //                 <div><h3 className="text-2xl font-bold text-gray-800 mb-2">Google Classroom</h3><p className="text-gray-500 max-w-md mx-auto">Materi ini diselenggarakan via Google Classroom.</p></div>
// // // // // // // //                 <a href={activeLesson.classroomData?.alternateLink || '#'} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-green-700 transition-transform hover:scale-105 flex items-center gap-2 text-lg" aria-label="Buka Classroom">Buka Classroom <span>↗</span></a>
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     }

// // // // // // // //     return (
// // // // // // // //         <div className="prose max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-gray-800 leading-relaxed">
// // // // // // // //             {renderContentHeader(activeLesson.title)}
// // // // // // // //             <div dangerouslySetInnerHTML={{ __html: activeLesson.content || '<p class="text-gray-400 italic">Belum ada konten materi.</p>' }} />
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // //   };

// // // // // // // //   if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // // // // // //   if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;

// // // // // // // //   if (!isEnrolled) {
// // // // // // // //       return (
// // // // // // // //         <div className="min-h-screen bg-gray-50 pb-20">
// // // // // // // //             {showRegisterModal && (<CourseRegistrationModal courseId={courseId} courseTitle={course.title} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => { setShowRegisterModal(false); setIsEnrolled(true); alert("Pendaftaran Berhasil! Selamat belajar."); window.location.reload(); }} />)}
// // // // // // // //             <div className="bg-gray-900 text-white relative">
// // // // // // // //                 <div className="absolute inset-0 bg-black/60 z-0"></div>
// // // // // // // //                 {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" alt="bg" />}
// // // // // // // //                 <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
// // // // // // // //                     <div className="lg:col-span-2 space-y-6">
// // // // // // // //                         <div className="inline-block bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{course.programType === 'training' ? 'Diklat' : 'Kursus'}</div>
// // // // // // // //                         <h1 className="text-4xl font-extrabold leading-tight">{course.title}</h1>
// // // // // // // //                         <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
// // // // // // // //                             <div className="flex items-center gap-2"><Users size={18}/> {course.facilitatorIds?.length || 1} Fasilitator</div>
// // // // // // // //                             <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
// // // // // // // //                             <div className="flex items-center gap-2"><Clock size={18}/> Fleksibel</div>
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="lg:col-span-1 bg-white text-gray-900 p-6 rounded-2xl shadow-xl">
// // // // // // // //                         <div className="text-center mb-6"><p className="text-gray-500 text-sm">Biaya Pelatihan</p><p className="text-3xl font-extrabold text-green-600">{course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}</p></div>
// // // // // // // //                         <button onClick={() => setShowRegisterModal(true)} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2" aria-label="Daftar Sekarang">📝 Daftar Sekarang</button>
// // // // // // // //                         <p className="text-xs text-center text-gray-400 mt-4">Klik daftar untuk mengisi formulir peserta.</p>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //             <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
// // // // // // // //                 <div className="lg:col-span-2 space-y-8">
// // // // // // // //                     <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"><h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="text-red-600"/> Tentang Pelatihan</h3><div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: course.description || '<p>Tidak ada deskripsi.</p>' }} /></div>
// // // // // // // //                     <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"><h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><BookOpen className="text-red-600"/> Kurikulum (Terkunci)</h3><div className="space-y-4">{course.modules?.map((mod: any, idx: number) => (<div key={mod._id} className="border rounded-xl overflow-hidden opacity-70"><div className="bg-gray-50 p-4 font-bold text-gray-700 flex justify-between"><span>Modul {idx+1}: {mod.title}</span><Lock size={16} className="text-gray-400"/></div><div className="bg-white p-4 text-sm text-gray-500 italic flex items-center gap-2"><Lock size={14}/> {mod.lessons?.length || 0} Materi (Daftar untuk akses)</div></div>))}</div></div>
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //       );
// // // // // // // //   }

// // // // // // // //   const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;
// // // // // // // //   const isFirstLesson = course?.modules?.[0]?.lessons?.[0]?._id === activeLesson?._id;

// // // // // // // //   return (
// // // // // // // //     <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // // // // // // //       <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 flex flex-col md:relative absolute z-30 h-full shadow-xl md:shadow-none`}>
// // // // // // // //         <div className="p-5 border-b border-gray-100 bg-white">
// // // // // // // //             <Link href="/courses" className="text-[10px] font-bold text-gray-400 hover:text-indigo-600 mb-3 flex items-center gap-1 uppercase tracking-wide" aria-label="Kembali ke Katalog"><span>←</span> Kembali ke Katalog</Link>
// // // // // // // //             <h2 className="font-bold text-gray-800 text-lg leading-tight mb-4 line-clamp-2">{course.title}</h2>
// // // // // // // //             <div className="space-y-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
// // // // // // // //                 <div className="flex justify-between text-xs font-bold text-gray-600 mb-1"><span>Progress Belajar</span><span className="text-indigo-600">{safePercent}%</span></div>
// // // // // // // //                 <div className="w-full bg-gray-200 rounded-full h-2 relative"><div className="bg-green-500 h-2 rounded-full transition-all duration-500 shadow-sm" style={{ width: `${safePercent}%` }}></div></div>
// // // // // // // //                 <button onClick={() => setShowChat(true)} className="w-full mt-2 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2.5 rounded-lg text-xs font-bold hover:bg-indigo-50 border border-indigo-200 transition-all shadow-sm active:scale-95 relative" aria-label="Hubungi Pengajar">
// // // // // // // //                     <MessageCircle size={16}/> Hubungi Pengajar
// // // // // // // //                 </button>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //         <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24 custom-scrollbar">
// // // // // // // //             {course.modules?.map((module: any, mIdx: number) => (
// // // // // // // //                 <div key={module._id}>
// // // // // // // //                     {/* HEADER MODUL DI SIDEBAR */}
// // // // // // // //                     <div className="mb-2 pl-1">
// // // // // // // //                         <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-wider">MODUL {mIdx + 1}</h3>
// // // // // // // //                         <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1">{module.title}</h4>
// // // // // // // //                         <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-500">
// // // // // // // //                              {module.jp > 0 && <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100 font-bold">{module.jp} JP</span>}
// // // // // // // //                              {module.facilitatorId && <span className="flex items-center gap-0.5 truncate max-w-[100px]" title={getFacilitatorName(module.facilitatorId)}>👤 {getFacilitatorName(module.facilitatorId)}</span>}
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="space-y-1">
// // // // // // // //                         {module.lessons?.map((lesson: any) => {
// // // // // // // //                             const isActive = activeLesson?._id === lesson._id;
// // // // // // // //                             const isCompleted = completedLessonIds.includes(lesson._id);
// // // // // // // //                             return (
// // // // // // // //                                 <button key={lesson._id} onClick={() => setActiveLesson(lesson)} className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group ${isActive ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-200' : 'hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200'}`} aria-label={`Buka materi ${lesson.title}`}>
// // // // // // // //                                     <div className="flex items-center gap-3 overflow-hidden">
// // // // // // // //                                         <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors ${isActive ? 'border-white/30 bg-white/20 text-white' : isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 bg-white text-transparent'}`}><CheckCircle size={12} /></div>
// // // // // // // //                                         <div className="min-w-0">
// // // // // // // //                                             <span className={`text-xs font-bold truncate block ${isActive ? 'text-white' : 'text-gray-700'}`}>{lesson.title}</span>
// // // // // // // //                                         </div>
// // // // // // // //                                     </div>
// // // // // // // //                                     <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity">{lesson.type === 'video_url' ? <PlayCircle size={14}/> : <FileText size={14}/>}</span>
// // // // // // // //                                 </button>
// // // // // // // //                             );
// // // // // // // //                         })}
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             ))}
// // // // // // // //         </div>
// // // // // // // //       </aside>

// // // // // // // //       <main className="flex-1 flex flex-col bg-gray-50 relative h-full overflow-hidden w-full">
// // // // // // // //         <div className="md:hidden p-4 bg-white border-b flex justify-between items-center flex-shrink-0 z-20 shadow-sm">
// // // // // // // //             <div className="min-w-0"><h1 className="font-bold text-gray-800 truncate text-sm">{activeLesson?.title}</h1></div>
// // // // // // // //             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200" aria-label="Toggle Menu" title="Menu"><Menu size={20}/></button>
// // // // // // // //         </div>
        
// // // // // // // //         {/* [NEW] FLOATING NAV BUTTONS (FIXED AT BOTTOM RIGHT) */}
// // // // // // // //         {activeLesson?.type !== 'quiz' && (
// // // // // // // //             <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
// // // // // // // //                 <button 
// // // // // // // //                     onClick={handlePrevLesson} 
// // // // // // // //                     disabled={isFirstLesson} 
// // // // // // // //                     className="w-12 h-12 rounded-full bg-white text-gray-600 border border-gray-200 shadow-lg flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all" 
// // // // // // // //                     aria-label="Materi Sebelumnya" 
// // // // // // // //                     title="Sebelumnya"
// // // // // // // //                 >
// // // // // // // //                     <ChevronLeft size={20}/>
// // // // // // // //                 </button>
// // // // // // // //                 <button 
// // // // // // // //                     onClick={handleManualComplete} 
// // // // // // // //                     className={`h-12 px-6 rounded-full font-bold text-white shadow-xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 ${completedLessonIds.includes(activeLesson?._id) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`} 
// // // // // // // //                     aria-label="Lanjut Berikutnya" 
// // // // // // // //                     title="Lanjut"
// // // // // // // //                 >
// // // // // // // //                     <span>{completedLessonIds.includes(activeLesson?._id) ? 'Next' : 'Selesai'}</span>
// // // // // // // //                     <ChevronRight size={20}/>
// // // // // // // //                 </button>
// // // // // // // //             </div>
// // // // // // // //         )}

// // // // // // // //         <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 w-full custom-scrollbar relative">
// // // // // // // //             <div className="max-w-4xl mx-auto space-y-6">
// // // // // // // //                 {renderContent()}
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //       </main>

// // // // // // // //       {showChat && <ChatWithFacilitatorModal facilitators={chatableFacilitators} unreadSenderId={unreadSenderId} initialSelectedId={toastData?.senderId} onClose={() => { setShowChat(false); setToastData(null); }} />}
// // // // // // // //       {toastData && !showChat && <ChatToast data={toastData} onOpen={() => { setToastData(null); setShowChat(true); }} onClose={() => setToastData(null)} />}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // 'use client';

// // // // // // // import { useState, useEffect, useRef, useMemo } from 'react';
// // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // import Link from 'next/link';
// // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // // // // import { 
// // // // // // //     Calendar, PlayCircle, CheckCircle, FileText, MessageCircle, 
// // // // // // //     X, Menu, Send, Users, Clock, BookOpen,
// // // // // // //     UploadCloud, Download, BarChart, MonitorPlay, ChevronLeft, ChevronRight,
// // // // // // //     AlertCircle, Hourglass
// // // // // // // } from 'lucide-react';
// // // // // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';

// // // // // // // import dynamic from 'next/dynamic';
// // // // // // // import 'react-quill/dist/quill.snow.css';

// // // // // // // // Load Lazy Editor
// // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // //     ssr: false,
// // // // // // //     loading: () => <div className="h-24 bg-gray-50 animate-pulse rounded-lg border border-gray-200"></div>
// // // // // // // });

// // // // // // // // --- HELPER FUNCTIONS ---
// // // // // // // const formatDate = (dateString: string) => {
// // // // // // //     if (!dateString) return '-';
// // // // // // //     return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
// // // // // // // };

// // // // // // // const getFacilitatorName = (fac: any) => {
// // // // // // //     if (!fac) return '-';
// // // // // // //     if (typeof fac === 'string') return 'Fasilitator';
// // // // // // //     return fac.name || 'Fasilitator';
// // // // // // // };

// // // // // // // // --- SUB-COMPONENTS ---

// // // // // // // function ChatToast({ data, onOpen, onClose }: any) {
// // // // // // //   useEffect(() => { const timer = setTimeout(onClose, 10000); return () => clearTimeout(timer); }, [onClose]);
// // // // // // //   return (
// // // // // // //     <div 
// // // // // // //       className="fixed bottom-32 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300"
// // // // // // //       role="alert"
// // // // // // //       aria-live="assertive"
// // // // // // //     >
// // // // // // //       <div 
// // // // // // //         className="bg-white rounded-xl shadow-2xl border-l-4 border-l-green-500 border-y border-r border-gray-100 p-4 w-80 flex items-start gap-3 relative cursor-pointer hover:bg-gray-50 transition-colors" 
// // // // // // //         onClick={onOpen}
// // // // // // //         onKeyDown={(e) => e.key === 'Enter' && onOpen()}
// // // // // // //         tabIndex={0}
// // // // // // //         role="button"
// // // // // // //         aria-label={`Pesan baru dari ${data.senderName}: ${data.message}`}
// // // // // // //       >
// // // // // // //         <button 
// // // // // // //             onClick={(e) => { e.stopPropagation(); onClose(); }} 
// // // // // // //             className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 bg-white rounded-full" 
// // // // // // //             aria-label="Tutup Notifikasi" 
// // // // // // //             title="Tutup Notifikasi"
// // // // // // //         >
// // // // // // //             <X size={14} />
// // // // // // //         </button>
// // // // // // //         <div className="relative flex-shrink-0">
// // // // // // //             <img src={getImageUrl(data.senderAvatar)} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-green-500"/>
// // // // // // //             <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
// // // // // // //         </div>
// // // // // // //         <div className="flex-1 min-w-0">
// // // // // // //             <div className="flex justify-between items-center mb-0.5">
// // // // // // //                 <h4 className="font-bold text-sm text-gray-800 truncate pr-4">{data.senderName}</h4>
// // // // // // //                 <span className="text-[10px] text-gray-400">Baru saja</span>
// // // // // // //             </div>
// // // // // // //             <p className="text-xs text-green-600 font-bold mb-0.5">Pesan Baru!</p>
// // // // // // //             <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed italic">"{data.message}"</p>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // function ChatWithFacilitatorModal({ facilitators, initialSelectedId, unreadSenderId, onClose }: any) {
// // // // // // //     const [selectedFacilitator, setSelectedFacilitator] = useState<any>(initialSelectedId ? facilitators.find((f: any) => f._id === initialSelectedId) : (unreadSenderId ? facilitators.find((f: any) => f._id === unreadSenderId) : (facilitators.length === 1 ? facilitators[0] : null)));
// // // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // // //     const [message, setMessage] = useState('');
// // // // // // //     const [sending, setSending] = useState(false);
// // // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // // // //     useEffect(() => { if (selectedFacilitator?._id) { loadHistory(); const interval = setInterval(loadHistory, 3000); return () => clearInterval(interval); } }, [selectedFacilitator]);
// // // // // // //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// // // // // // //     const loadHistory = async () => { try { const res = await api(`/api/chat/${selectedFacilitator._id}`); setMessages(res.messages || []); } catch (e) { console.error(e); } };
    
// // // // // // //     const handleSend = async (e: React.FormEvent) => { 
// // // // // // //         e.preventDefault(); 
// // // // // // //         if (!message.trim() || !selectedFacilitator) return; 
// // // // // // //         const tempMsg = { _id: Date.now(), sender: 'me', message: message, createdAt: new Date().toISOString() }; 
// // // // // // //         setMessages(prev => [...prev, tempMsg]); 
// // // // // // //         setMessage(''); 
// // // // // // //         setSending(true); 
// // // // // // //         try { await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message: tempMsg.message } }); loadHistory(); } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); } 
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
// // // // // // //             <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]" role="dialog" aria-modal="true" aria-label="Chat dengan Pengajar">
// // // // // // //                 <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
// // // // // // //                     <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18} aria-hidden="true"/> Hubungi Pengajar</h3>
// // // // // // //                     <button onClick={onClose} aria-label="Tutup Chat" className="hover:bg-indigo-700 p-1 rounded"><X size={20} /></button>
// // // // // // //                 </div>
// // // // // // //                 {!selectedFacilitator ? (
// // // // // // //                     <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
// // // // // // //                         <div className="p-4 bg-white border-b shadow-sm z-10"><p className="text-sm text-gray-700 font-bold">Pilih Fasilitator:</p></div>
// // // // // // //                         <div className="p-4 overflow-y-auto custom-scrollbar space-y-2 flex-1">
// // // // // // //                             {facilitators.map((fac: any) => (
// // // // // // //                                 <button key={fac._id} onClick={() => setSelectedFacilitator(fac)} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left group relative ${fac._id === unreadSenderId ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200 hover:border-indigo-300'}`} aria-label={`Chat dengan ${fac.name}`}>
// // // // // // //                                     <img src={getImageUrl(fac.avatarUrl)} className="w-12 h-12 rounded-full object-cover" alt="" />
// // // // // // //                                     <div className="flex-1 min-w-0"><p className="font-bold text-sm truncate">{fac.name}</p><p className="text-xs text-gray-500">{fac.role || 'Fasilitator'}</p></div>
// // // // // // //                                 </button>
// // // // // // //                             ))}
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 ) : (
// // // // // // //                     <>
// // // // // // //                         <div className="p-3 bg-white border-b flex items-center gap-3 shadow-sm z-10">
// // // // // // //                             <button onClick={() => setSelectedFacilitator(null)} className="text-xs font-bold px-2 py-1 bg-gray-100 rounded hover:bg-gray-200" aria-label="Kembali ke daftar fasilitator">← Kembali</button>
// // // // // // //                             <div className="flex items-center gap-2 border-l pl-3">
// // // // // // //                                 <img src={getImageUrl(selectedFacilitator.avatarUrl)} className="w-9 h-9 rounded-full bg-gray-200 object-cover" alt="" />
// // // // // // //                                 <div><p className="text-sm font-bold text-gray-800 leading-tight">{selectedFacilitator.name}</p><span className="text-[10px] text-green-600 bg-green-50 px-1.5 rounded-full border border-green-100">Online</span></div>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                         <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// // // // // // //                             {messages.length === 0 ? <div className="text-center text-gray-400 text-xs mt-10">Mulai diskusi!</div> : messages.map((msg: any, idx: number) => (
// // // // // // //                                 <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
// // // // // // //                                     <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${msg.sender === 'me' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800'}`}><p>{msg.message}</p></div>
// // // // // // //                                 </div>
// // // // // // //                             ))}
// // // // // // //                             <div ref={messagesEndRef} />
// // // // // // //                         </div>
// // // // // // //                         <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
// // // // // // //                             <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus aria-label="Ketik pesan chat" />
// // // // // // //                             <button disabled={sending} type="submit" className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700" aria-label="Kirim Pesan"><Send size={16}/></button>
// // // // // // //                         </form>
// // // // // // //                     </>
// // // // // // //                 )}
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // }

// // // // // // // // --- MAIN PAGE COMPONENT ---
// // // // // // // export default function StudentCoursePlayPage() {
// // // // // // //   const router = useRouter();
// // // // // // //   const params = useParams();
// // // // // // //   const { user } = useAuth();
// // // // // // //   const { courseId } = params as { courseId: string };

// // // // // // //   // Data States
// // // // // // //   const [course, setCourse] = useState<any>(null);
// // // // // // //   const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // // //   const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // // // // // //   const [progressPercent, setProgressPercent] = useState(0);
  
// // // // // // //   // UI States
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
// // // // // // //   // Auth & Enrollment States
// // // // // // //   const [isEnrolled, setIsEnrolled] = useState(false);
// // // // // // //   const [enrollmentStatus, setEnrollmentStatus] = useState<string>(''); // 'pending' | 'active'
// // // // // // //   const [showRegisterModal, setShowRegisterModal] = useState(false);
  
// // // // // // //   // Chat States
// // // // // // //   const [showChat, setShowChat] = useState(false);
// // // // // // //   const [chatableFacilitators, setChatableFacilitators] = useState<any[]>([]);
// // // // // // //   const [unreadSenderId, setUnreadSenderId] = useState<string | null>(null);
// // // // // // //   const [toastData, setToastData] = useState<any>(null);

// // // // // // //   // Interaction States
// // // // // // //   const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// // // // // // //   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// // // // // // //   const [pollSelected, setPollSelected] = useState<number | null>(null);
// // // // // // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // // // // // //   const quillModules = useMemo(() => ({
// // // // // // //     toolbar: [['bold', 'italic', 'underline'], [{'list': 'ordered'}, {'list': 'bullet'}], ['clean']]
// // // // // // //   }), []);

// // // // // // //   // --- 1. INITIAL LOAD (Course & Status) ---
// // // // // // //   useEffect(() => {
// // // // // // //     const initData = async () => {
// // // // // // //       try {
// // // // // // //         setLoading(true);
// // // // // // //         // Load Course Content
// // // // // // //         const resCourse = await api(`/api/courses/${courseId}`);
// // // // // // //         const courseData = resCourse.course || resCourse;
// // // // // // //         setCourse(courseData);

// // // // // // //         // Load Enrollment & Progress (Only if user exists)
// // // // // // //         if (user) {
// // // // // // //             try {
// // // // // // //                 const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// // // // // // //                 setIsEnrolled(enrollRes.isEnrolled);
                
// // // // // // //                 if (enrollRes.isEnrolled) {
// // // // // // //                     // Set Status Pendaftaran
// // // // // // //                     setEnrollmentStatus(enrollRes.status || 'pending'); 

// // // // // // //                     // Fetch Progress HANYA jika status ACTIVE atau APPROVED
// // // // // // //                     if (enrollRes.status === 'active' || enrollRes.status === 'approved') {
// // // // // // //                         const resProgress = await api(`/api/progress/${courseId}`);
// // // // // // //                         setCompletedLessonIds(resProgress.completedLessons || []);
// // // // // // //                     }
// // // // // // //                 }
// // // // // // //             } catch (e) { console.error("Enroll check failed", e); }
// // // // // // //         }

// // // // // // //         // Set Facilitators for Chat
// // // // // // //         if (courseData.facilitatorIds && Array.isArray(courseData.facilitatorIds)) {
// // // // // // //             const validFacs = courseData.facilitatorIds.filter((f: any) => f && f.name && f._id !== user?.id);
// // // // // // //             setChatableFacilitators(validFacs);
// // // // // // //         }

// // // // // // //         // Set Default Lesson
// // // // // // //         if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);

// // // // // // //       } catch (e) { 
// // // // // // //           console.error("Init failed", e); 
// // // // // // //       } finally { 
// // // // // // //           setLoading(false); 
// // // // // // //       }
// // // // // // //     };

// // // // // // //     if (courseId) initData();
// // // // // // //   }, [courseId, user]); // Dependency on user ensures re-fetch on auth load

// // // // // // //   // --- 2. PROGRESS CALCULATION (Realtime) ---
// // // // // // //   useEffect(() => {
// // // // // // //     if (course && !loading) {
// // // // // // //         let total = 0; 
// // // // // // //         let completed = 0;
        
// // // // // // //         course.modules?.forEach((m: any) => { 
// // // // // // //             if(m.isActive) {
// // // // // // //                 m.lessons?.forEach((l: any) => { 
// // // // // // //                     if(l.isActive) { 
// // // // // // //                         total++; 
// // // // // // //                         if (completedLessonIds.includes(l._id)) completed++; 
// // // // // // //                     } 
// // // // // // //                 });
// // // // // // //             }
// // // // // // //         });
// // // // // // //         const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
// // // // // // //         setProgressPercent(percent);
// // // // // // //     }
// // // // // // //   }, [completedLessonIds, course, loading]);

// // // // // // //   // --- 3. RESET INTERACTION STATE ---
// // // // // // //   useEffect(() => {
// // // // // // //       setUploadedFile(null);
// // // // // // //       setPollSelected(null);
// // // // // // //       setIsSubmitting(false);
// // // // // // //       if (activeLesson?.type === 'essay' && activeLesson.questions) {
// // // // // // //           setEssayAnswers(new Array(activeLesson.questions.length).fill(''));
// // // // // // //       } else {
// // // // // // //           setEssayAnswers([]);
// // // // // // //       }
// // // // // // //   }, [activeLesson]);

// // // // // // //   // --- 4. CHAT POLLING ---
// // // // // // //   useEffect(() => {
// // // // // // //       if (!user) return;
// // // // // // //       const interval = setInterval(async () => {
// // // // // // //           try {
// // // // // // //               const res = await api('/api/chat/conversations');
// // // // // // //               if (res.conversations?.[0]?.lastMessage) {
// // // // // // //                   const msg = res.conversations[0].lastMessage;
// // // // // // //                   const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
// // // // // // //                   if (senderId !== user.id) setUnreadSenderId(senderId); 
// // // // // // //               }
// // // // // // //           } catch (e) { /* Silent */ }
// // // // // // //       }, 10000);
// // // // // // //       return () => clearInterval(interval);
// // // // // // //   }, [user]);

// // // // // // //   // --- HANDLERS ---

// // // // // // //   const handleEssayChange = (index: number, value: string) => {
// // // // // // //       const newAnswers = [...essayAnswers];
// // // // // // //       newAnswers[index] = value;
// // // // // // //       setEssayAnswers(newAnswers);
// // // // // // //   };

// // // // // // //   const markLessonAsComplete = async (lessonId: string) => {
// // // // // // //     if (!completedLessonIds.includes(lessonId)) {
// // // // // // //         try { 
// // // // // // //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId } }); 
// // // // // // //             setCompletedLessonIds(prev => [...prev, lessonId]); 
// // // // // // //         } catch(e) { console.error("Save progress failed", e); }
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleNextLesson = () => {
// // // // // // //     const allLessons: any[] = [];
// // // // // // //     course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // //     const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // //     if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // // // // // //     else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // // // // // //   };

// // // // // // //   const handlePrevLesson = () => {
// // // // // // //     const allLessons: any[] = [];
// // // // // // //     course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // //     const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // //     if (currIdx > 0) { setActiveLesson(allLessons[currIdx - 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }
// // // // // // //   };

// // // // // // //   const handleManualComplete = async () => { await markLessonAsComplete(activeLesson._id); handleNextLesson(); };
// // // // // // //   const handleQuizCompleted = async () => { await markLessonAsComplete(activeLesson._id); };

// // // // // // //   const handleSubmitTask = async () => {
// // // // // // //       setIsSubmitting(true);
// // // // // // //       try {
// // // // // // //           if (activeLesson.type === 'essay' && essayAnswers.some(ans => ans.trim() === '')) return alert("Mohon jawab semua pertanyaan.");
// // // // // // //           if (activeLesson.type === 'upload_doc' && !uploadedFile) return alert("Pilih file terlebih dahulu.");
// // // // // // //           if (activeLesson.type === 'poll' && pollSelected === null) return alert("Pilih salah satu opsi.");
// // // // // // //           await markLessonAsComplete(activeLesson._id);
// // // // // // //           alert("Berhasil dikirim!");
// // // // // // //           handleNextLesson();
// // // // // // //       } catch (e: any) { alert("Gagal mengirim: " + e.message); } finally { setIsSubmitting(false); }
// // // // // // //   };

// // // // // // //   const renderContentHeader = (title: string) => (
// // // // // // //     <div className="mb-6 border-b border-gray-100 pb-4">
// // // // // // //         <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// // // // // // //             <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600">{activeLesson?.type?.replace('_', ' ') || 'MATERI'}</span>
// // // // // // //         </div>
// // // // // // //         <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
// // // // // // //             <h1 className="text-gray-900 font-bold text-2xl flex-1 leading-tight">{title}</h1>
// // // // // // //             <div className="flex-shrink-0 flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
// // // // // // //                 <div className="flex items-center gap-1"><Users size={12} className="text-indigo-500"/> <span>{getFacilitatorName(activeLesson.facilitatorId)}</span></div>
// // // // // // //                 {activeLesson.jp > 0 && <div className="flex items-center gap-1 border-l pl-3"><Clock size={12} className="text-indigo-500"/> <span>{activeLesson.jp} JP</span></div>}
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     </div>
// // // // // // //   );

// // // // // // //   const renderContent = () => {
// // // // // // //     if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping.</div>;
// // // // // // //     if (activeLesson.type === 'quiz') return <QuizPlayer quizId={activeLesson._id} courseId={courseId} onComplete={handleQuizCompleted} />;
    
// // // // // // //     if (activeLesson.type === 'video_url') {
// // // // // // //         const embedUrl = activeLesson.videoUrl?.includes('youtu') ? `https://www.youtube.com/embed/${activeLesson.videoUrl.split('/').pop().replace('watch?v=', '')}` : activeLesson.videoUrl;
// // // // // // //         return (
// // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
// // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // //                 <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg"><iframe src={embedUrl} className="w-full h-full" allowFullScreen title={`Video ${activeLesson.title}`} /></div>
// // // // // // //             </div>
// // // // // // //         );
// // // // // // //     }

// // // // // // //     if (activeLesson.type === 'pdf' || activeLesson.type === 'slide') {
// // // // // // //         return (
// // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[80vh] flex flex-col">
// // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // //                 <iframe src={getImageUrl(activeLesson.fileUrl)} className="w-full flex-1 rounded border bg-gray-100" title={`Dokumen ${activeLesson.title}`}></iframe>
// // // // // // //             </div>
// // // // // // //         );
// // // // // // //     }
    
// // // // // // //     return (
// // // // // // //         <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // //             {renderContentHeader(activeLesson.title)}
// // // // // // //             <div className="prose max-w-none mb-8 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content || 'Konten belum tersedia.' }} />
            
// // // // // // //             {activeLesson.type === 'essay' && (
// // // // // // //                 <div className="space-y-6">
// // // // // // //                     {activeLesson.questions?.map((q:any,i:number)=>(
// // // // // // //                         <div key={i} className="border p-4 rounded-lg bg-gray-50"><p className="font-bold mb-2 text-sm text-gray-700">{i+1}. {q.question}</p><div className="bg-white"><ReactQuill theme="snow" value={essayAnswers[i]||''} onChange={(v)=>handleEssayChange(i,v)} placeholder="Tulis jawaban..."/></div></div>
// // // // // // //                     ))}
// // // // // // //                     <button onClick={handleSubmitTask} disabled={isSubmitting} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold w-full hover:bg-indigo-700 transition-colors" aria-label="Kirim Jawaban">{isSubmitting?'Mengirim...':'Kirim Jawaban'}</button>
// // // // // // //                 </div>
// // // // // // //             )}
            
// // // // // // //             {activeLesson.type === 'upload_doc' && (
// // // // // // //                 <div className="border-2 border-dashed p-8 text-center rounded-xl bg-gray-50 border-indigo-200">
// // // // // // //                     <UploadCloud className="mx-auto text-indigo-400 mb-2" size={32}/>
// // // // // // //                     <p className="text-sm text-gray-500 mb-4">Upload tugas Anda di sini (PDF/DOCX/JPG)</p>
// // // // // // //                     <input type="file" aria-label="Pilih file tugas" onChange={(e)=>setUploadedFile(e.target.files?.[0]||null)} className="mb-4 text-sm block mx-auto text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
// // // // // // //                     <button onClick={handleSubmitTask} disabled={!uploadedFile||isSubmitting} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold block mx-auto hover:bg-indigo-700 transition-colors" aria-label="Upload File">{isSubmitting?'Mengupload...':'Upload Tugas'}</button>
// // // // // // //                 </div>
// // // // // // //             )}

// // // // // // //             {activeLesson.type === 'poll' && (
// // // // // // //                 <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
// // // // // // //                     <h3 className="font-bold text-lg mb-4">{activeLesson.pollQuestion || "Polling"}</h3>
// // // // // // //                     <div className="space-y-3 max-w-sm mx-auto">
// // // // // // //                         {activeLesson.pollOptions?.map((opt:string, idx:number) => (
// // // // // // //                             <button key={idx} onClick={()=>setPollSelected(idx)} className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${pollSelected===idx ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-100 border-gray-300'}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>
// // // // // // //                         ))}
// // // // // // //                     </div>
// // // // // // //                     <button onClick={handleSubmitTask} disabled={pollSelected===null||isSubmitting} className="mt-6 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition-colors" aria-label="Kirim Polling">Kirim Polling</button>
// // // // // // //                 </div>
// // // // // // //             )}
// // // // // // //         </div>
// // // // // // //     );
// // // // // // //   };

// // // // // // //   if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // // // // //   if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;

// // // // // // //   if (!isEnrolled) {
// // // // // // //       return (
// // // // // // //         <div className="min-h-screen bg-gray-50 pb-20">
// // // // // // //             {showRegisterModal && (
// // // // // // //                 <CourseRegistrationModal 
// // // // // // //                     courseId={courseId} 
// // // // // // //                     courseTitle={course.title} 
// // // // // // //                     user={user} 
// // // // // // //                     onClose={() => setShowRegisterModal(false)} 
// // // // // // //                     onSuccess={() => { 
// // // // // // //                         setShowRegisterModal(false); 
// // // // // // //                         alert("Pendaftaran Berhasil! Mohon tunggu persetujuan Admin."); 
// // // // // // //                         router.push('/courses'); 
// // // // // // //                     }} 
// // // // // // //                 />
// // // // // // //             )}
// // // // // // //             <div className="bg-gray-900 text-white relative">
// // // // // // //                 <div className="absolute inset-0 bg-black/60 z-0"></div>
// // // // // // //                 {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" alt="" />}
// // // // // // //                 <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
// // // // // // //                     <div className="lg:col-span-2 space-y-6">
// // // // // // //                         <div className="inline-block bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{course.programType === 'training' ? 'Diklat' : 'Kursus'}</div>
// // // // // // //                         <h1 className="text-4xl font-extrabold leading-tight">{course.title}</h1>
// // // // // // //                         <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
// // // // // // //                             <div className="flex items-center gap-2"><Users size={18}/> {course.facilitatorIds?.length || 1} Fasilitator</div>
// // // // // // //                             <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
// // // // // // //                             <div className="flex items-center gap-2"><Clock size={18}/> Fleksibel</div>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                     <div className="lg:col-span-1 bg-white text-gray-900 p-6 rounded-2xl shadow-xl">
// // // // // // //                         <div className="text-center mb-6"><p className="text-gray-500 text-sm">Biaya Pelatihan</p><p className="text-3xl font-extrabold text-green-600">{course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}</p></div>
// // // // // // //                         <button onClick={() => setShowRegisterModal(true)} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2" aria-label="Daftar Sekarang">📝 Daftar Sekarang</button>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //             <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
// // // // // // //                 <div className="lg:col-span-2 space-y-8">
// // // // // // //                     <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"><h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="text-red-600"/> Tentang Pelatihan</h3><div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: course.description || '<p>Tidak ada deskripsi.</p>' }} /></div>
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //       );
// // // // // // //   }

// // // // // // //   if (enrollmentStatus === 'pending') {
// // // // // // //       return (
// // // // // // //         <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
// // // // // // //             <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full text-center border border-gray-100 animate-in zoom-in-95">
// // // // // // //                 <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
// // // // // // //                     <Hourglass size={48} className="animate-pulse" />
// // // // // // //                 </div>
// // // // // // //                 <h1 className="text-2xl font-bold text-gray-900 mb-2">Menunggu Persetujuan</h1>
// // // // // // //                 <p className="text-gray-500 mb-8 leading-relaxed">
// // // // // // //                     Pendaftaran Anda di kelas <strong>{course.title}</strong> sedang diverifikasi oleh Admin.
// // // // // // //                 </p>
// // // // // // //                 <Link href="/courses" className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors w-full block">
// // // // // // //                     Kembali ke Katalog
// // // // // // //                 </Link>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //       );
// // // // // // //   }

// // // // // // //   const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;
// // // // // // //   const isFirstLesson = course?.modules?.[0]?.lessons?.[0]?._id === activeLesson?._id;

// // // // // // //   return (
// // // // // // //     <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // // // // // //       <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
// // // // // // //         <div className="p-5 border-b bg-white">
// // // // // // //             <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" aria-label="Kembali ke katalog"><span>←</span> KEMBALI KE KATALOG</Link>
// // // // // // //             <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
// // // // // // //             <div className="space-y-2">
// // // // // // //                 <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{safePercent}%</span></div>
// // // // // // //                 <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: `${safePercent}%`}}></div></div>
// // // // // // //             </div>
// // // // // // //             <button onClick={() => setShowChat(true)} className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50" aria-label="Hubungi Pengajar"><MessageCircle size={16}/> Hubungi Pengajar</button>
// // // // // // //         </div>
// // // // // // //         <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
// // // // // // //             {course.modules?.map((mod:any, i:number)=>(
// // // // // // //                 <div key={mod._id}>
// // // // // // //                     <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
// // // // // // //                     <div className="space-y-1">
// // // // // // //                         {mod.lessons?.map((les:any)=>(
// // // // // // //                             <button key={les._id} onClick={()=>setActiveLesson(les)} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left text-xs font-bold transition-all ${activeLesson?._id===les._id ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`} aria-label={`Buka materi ${les.title}`}>
// // // // // // //                                 {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
// // // // // // //                                 <span className="truncate">{les.title}</span>
// // // // // // //                             </button>
// // // // // // //                         ))}
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             ))}
// // // // // // //         </div>
// // // // // // //       </aside>

// // // // // // //       <main className="flex-1 flex flex-col relative h-full overflow-hidden bg-gray-50">
// // // // // // //         <div className="md:hidden p-4 bg-white border-b flex justify-between items-center"><span className="font-bold truncate">{activeLesson?.title}</span><button onClick={()=>setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle Menu"><Menu/></button></div>
// // // // // // //         <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
// // // // // // //             <div className="max-w-4xl mx-auto">{renderContent()}</div>
// // // // // // //         </div>
        
// // // // // // //         <div className="fixed bottom-8 right-8 flex gap-3 z-30">
// // // // // // //             <button onClick={handlePrevLesson} disabled={isFirstLesson} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50" aria-label="Materi Sebelumnya"><ChevronLeft/></button>
// // // // // // //             <button onClick={handleManualComplete} className="h-12 px-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 font-bold hover:scale-105 transition-transform" aria-label="Lanjut Materi"><span>{completedLessonIds.includes(activeLesson?._id)?'Lanjut':'Selesai & Lanjut'}</span><ChevronRight/></button>
// // // // // // //         </div>
// // // // // // //       </main>
      
// // // // // // //       {showChat && <ChatWithFacilitatorModal facilitators={chatableFacilitators} unreadSenderId={unreadSenderId} initialSelectedId={toastData?.senderId} onClose={()=>setShowChat(false)} />}
// // // // // // //       {toastData && !showChat && <ChatToast data={toastData} onOpen={() => { setToastData(null); setShowChat(true); }} onClose={() => setToastData(null)} />}
      
// // // // // // //       {/* Tombol Floating Chat di Kiri Bawah (Penyebab utama error AXE) */}
// // // // // // //       <button 
// // // // // // //         onClick={() => setShowChat(true)} 
// // // // // // //         className="fixed bottom-8 left-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform z-30" 
// // // // // // //         aria-label="Buka Chat Fasilitator" 
// // // // // // //         title="Chat"
// // // // // // //       >
// // // // // // //         <MessageCircle size={24} />
// // // // // // //       </button>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // 'use client';

// // // // // // import { useState, useEffect, useRef, useMemo } from 'react';
// // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // import Link from 'next/link';
// // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // // // import CourseGroupChat from '@/components/CourseGroupChat'; 
// // // // // // import { 
// // // // // //     Users, Clock, BookOpen, MessageCircle,
// // // // // //     ChevronLeft, ChevronRight, Menu, Send, X,
// // // // // //     AlertCircle, Hourglass, FileText, PlayCircle, CheckCircle, UploadCloud, Calendar
// // // // // // } from 'lucide-react';
// // // // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';
// // // // // // import dynamic from 'next/dynamic';
// // // // // // import 'react-quill/dist/quill.snow.css';

// // // // // // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <div className="h-24 bg-gray-50 animate-pulse rounded-lg border border-gray-200"></div> });

// // // // // // // [FIX] Helper function
// // // // // // const getFacilitatorName = (activeFacilitatorId: any, facilitatorsList: any[]) => {
// // // // // //     if (!activeFacilitatorId) return '-';
// // // // // //     if (typeof activeFacilitatorId === 'object' && activeFacilitatorId.name) {
// // // // // //         return activeFacilitatorId.name;
// // // // // //     }
// // // // // //     const found = facilitatorsList.find(f => (f._id === activeFacilitatorId) || (f.id === activeFacilitatorId));
// // // // // //     return found ? found.name : 'Fasilitator';
// // // // // // };

// // // // // // const formatDate = (dateString: string) => {
// // // // // //     if (!dateString) return '';
// // // // // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // // // // //         day: 'numeric', month: 'long', year: 'numeric'
// // // // // //     });
// // // // // // };

// // // // // // // ... ChatWithFacilitatorModal (sama seperti sebelumnya) ...
// // // // // // function ChatWithFacilitatorModal({ facilitators, onClose }: any) {
// // // // // //     const { user } = useAuth();
// // // // // //     const [selectedFacilitator, setSelectedFacilitator] = useState<any>(facilitators[0] || null);
// // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // //     const [message, setMessage] = useState('');
// // // // // //     const [sending, setSending] = useState(false);
// // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // // //     useEffect(() => {
// // // // // //         if (selectedFacilitator?._id) {
// // // // // //             loadHistory();
// // // // // //             const interval = setInterval(loadHistory, 3000);
// // // // // //             return () => clearInterval(interval);
// // // // // //         }
// // // // // //     }, [selectedFacilitator]);

// // // // // //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// // // // // //     const loadHistory = async () => {
// // // // // //         try {
// // // // // //             const res = await api(`/api/chat/${selectedFacilitator._id}?t=${Date.now()}`);
// // // // // //             setMessages(res.messages || []);
// // // // // //         } catch (e) { console.error(e); }
// // // // // //     };

// // // // // //     const handleSend = async (e: React.FormEvent) => {
// // // // // //         e.preventDefault();
// // // // // //         if (!message.trim() || !selectedFacilitator) return;
// // // // // //         setSending(true);
// // // // // //         try {
// // // // // //             await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message } });
// // // // // //             setMessage('');
// // // // // //             loadHistory();
// // // // // //         } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); }
// // // // // //     };

// // // // // //     return (
// // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
// // // // // //             <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]" role="dialog" aria-modal="true" aria-label="Chat dengan Pengajar">
// // // // // //                 <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
// // // // // //                     <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18} aria-hidden="true" /> Hubungi Pengajar</h3>
// // // // // //                     <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" aria-label="Tutup Chat" title="Tutup Chat"><X size={20} aria-hidden="true" /></button>
// // // // // //                 </div>
// // // // // //                 {!selectedFacilitator ? (
// // // // // //                     <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center text-gray-500">Tidak ada fasilitator aktif.</div>
// // // // // //                 ) : (
// // // // // //                     <>
// // // // // //                         {facilitators.length > 1 && (
// // // // // //                             <div className="p-3 bg-gray-50 border-b flex gap-2 overflow-x-auto">
// // // // // //                                 {facilitators.map((f:any) => (
// // // // // //                                     <button type="button" key={f._id} onClick={()=>setSelectedFacilitator(f)} className={`px-3 py-1 text-xs rounded-full border ${selectedFacilitator._id===f._id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300'}`} title={`Pilih ${f.name}`}>{f.name}</button>
// // // // // //                                 ))}
// // // // // //                             </div>
// // // // // //                         )}
// // // // // //                         <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// // // // // //                             {messages.map((msg: any, idx: number) => {
// // // // // //                                 const isMe = msg.sender === 'me' || msg.sender?._id === user?.id;
// // // // // //                                 return (
// // // // // //                                     <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
// // // // // //                                         <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
// // // // // //                                             <p>{msg.message}</p>
// // // // // //                                         </div>
// // // // // //                                     </div>
// // // // // //                                 );
// // // // // //                             })}
// // // // // //                             <div ref={messagesEndRef} />
// // // // // //                         </div>
// // // // // //                         <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
// // // // // //                             <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus aria-label="Ketik pesan personal" />
// // // // // //                             <button type="submit" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700" aria-label="Kirim Pesan" title="Kirim"><Send size={16} aria-hidden="true"/></button>
// // // // // //                         </form>
// // // // // //                     </>
// // // // // //                 )}
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // }

// // // // // // export default function StudentCoursePlayPage() {
// // // // // //   const router = useRouter();
// // // // // //   const params = useParams();
// // // // // //   const { user } = useAuth();
// // // // // //   const { courseId } = params as { courseId: string };

// // // // // //   const [course, setCourse] = useState<any>(null);
// // // // // //   const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // //   const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // // // // //   const [progressPercent, setProgressPercent] = useState(0);
// // // // // //   const [courseFacilitators, setCourseFacilitators] = useState<any[]>([]); 
// // // // // //   const [courseParticipants, setCourseParticipants] = useState<any[]>([]); 
  
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // // // //   const [isEnrolled, setIsEnrolled] = useState(false);
// // // // // //   const [enrollmentStatus, setEnrollmentStatus] = useState<string>(''); 
// // // // // //   const [showRegisterModal, setShowRegisterModal] = useState(false);
// // // // // //   const [showPersonalChat, setShowPersonalChat] = useState(false); 

// // // // // //   const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// // // // // //   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// // // // // //   const [pollSelected, setPollSelected] = useState<number | null>(null);
// // // // // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // // // // //   useEffect(() => {
// // // // // //     const initData = async () => {
// // // // // //       try {
// // // // // //         setLoading(true);
// // // // // //         const resCourse = await api(`/api/courses/${courseId}`);
// // // // // //         const courseData = resCourse.course || resCourse;
// // // // // //         setCourse(courseData);
// // // // // //         setCourseFacilitators(courseData.facilitatorIds || []); 

// // // // // //         if (user) {
// // // // // //             try {
// // // // // //                 const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// // // // // //                 setIsEnrolled(enrollRes.isEnrolled);
                
// // // // // //                 if (enrollRes.isEnrolled) {
// // // // // //                     setEnrollmentStatus(enrollRes.status || 'pending'); 
// // // // // //                     if (enrollRes.status === 'active' || enrollRes.status === 'approved') {
// // // // // //                         const resProgress = await api(`/api/progress/${courseId}`);
// // // // // //                         setCompletedLessonIds(resProgress.completedLessons || []);
                        
// // // // // //                         try {
// // // // // //                             const resPart = await api(`/api/courses/${courseId}/participants`);
// // // // // //                             const parts = resPart.participants?.map((p:any) => p.user || p) || [];
// // // // // //                             setCourseParticipants(parts);
// // // // // //                         } catch(e) {}
// // // // // //                     }
// // // // // //                 }
// // // // // //             } catch (e) { console.error("Enroll check failed", e); }
// // // // // //         }

// // // // // //         if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);

// // // // // //       } catch (e) { console.error("Init failed", e); } finally { setLoading(false); }
// // // // // //     };
// // // // // //     if (courseId) initData();
// // // // // //   }, [courseId, user]);

// // // // // //   useEffect(() => {
// // // // // //     if (course && !loading) {
// // // // // //         let total = 0; let completed = 0;
// // // // // //         course.modules?.forEach((m: any) => { 
// // // // // //             if(m.isActive) {
// // // // // //                 m.lessons?.forEach((l: any) => { 
// // // // // //                     if(l.isActive) { 
// // // // // //                         total++; 
// // // // // //                         if (completedLessonIds.includes(l._id)) completed++; 
// // // // // //                     } 
// // // // // //                 });
// // // // // //             }
// // // // // //         });
// // // // // //         const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
// // // // // //         setProgressPercent(percent);
// // // // // //     }
// // // // // //   }, [completedLessonIds, course, loading]);

// // // // // //   useEffect(() => {
// // // // // //       setUploadedFile(null);
// // // // // //       setPollSelected(null);
// // // // // //       setIsSubmitting(false);
// // // // // //       if (activeLesson?.type === 'essay' && activeLesson.questions) {
// // // // // //           setEssayAnswers(new Array(activeLesson.questions.length).fill(''));
// // // // // //       } else {
// // // // // //           setEssayAnswers([]);
// // // // // //       }
// // // // // //   }, [activeLesson]);

// // // // // //   const handleEssayChange = (index: number, value: string) => {
// // // // // //       const newAnswers = [...essayAnswers];
// // // // // //       newAnswers[index] = value;
// // // // // //       setEssayAnswers(newAnswers);
// // // // // //   };

// // // // // //   const markLessonAsComplete = async (lessonId: string) => {
// // // // // //     if (!completedLessonIds.includes(lessonId)) {
// // // // // //         try { 
// // // // // //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId } }); 
// // // // // //             setCompletedLessonIds(prev => [...prev, lessonId]); 
// // // // // //         } catch(e) { console.error("Save progress failed", e); }
// // // // // //     }
// // // // // //   };

// // // // // //   const handleNextLesson = () => {
// // // // // //     const allLessons: any[] = [];
// // // // // //     course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // //     const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // //     if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // // // // //     else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // // // // //   };

// // // // // //   const handlePrevLesson = () => {
// // // // // //     const allLessons: any[] = [];
// // // // // //     course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // //     const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // //     if (currIdx > 0) { setActiveLesson(allLessons[currIdx - 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }
// // // // // //   };

// // // // // //   const handleManualComplete = async () => { await markLessonAsComplete(activeLesson._id); handleNextLesson(); };
// // // // // //   const handleQuizCompleted = async () => { await markLessonAsComplete(activeLesson._id); };

// // // // // //   const handleSubmitTask = async () => {
// // // // // //       setIsSubmitting(true);
// // // // // //       try {
// // // // // //           if (activeLesson.type === 'essay' && essayAnswers.some(ans => ans.trim() === '')) return alert("Mohon jawab semua pertanyaan.");
// // // // // //           if (activeLesson.type === 'upload_doc' && !uploadedFile) return alert("Pilih file terlebih dahulu.");
// // // // // //           if (activeLesson.type === 'poll' && pollSelected === null) return alert("Pilih salah satu opsi.");
// // // // // //           await markLessonAsComplete(activeLesson._id);
// // // // // //           alert("Berhasil dikirim!");
// // // // // //           handleNextLesson();
// // // // // //       } catch (e: any) { alert("Gagal mengirim: " + e.message); } finally { setIsSubmitting(false); }
// // // // // //   };

// // // // // //   // [FIX] Header Lengkap dengan Icon, Nama Fasilitator, JP, Tanggal
// // // // // //   const renderContentHeader = (title: string) => (
// // // // // //     <div className="mb-6 border-b border-gray-100 pb-4">
// // // // // //         <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// // // // // //             <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 flex items-center gap-1">
// // // // // //                 {activeLesson?.type === 'video_url' && <PlayCircle size={12}/>}
// // // // // //                 {activeLesson?.type === 'pdf' && <FileText size={12}/>}
// // // // // //                 {activeLesson?.type === 'quiz' && <CheckCircle size={12}/>}
// // // // // //                 {activeLesson?.type?.replace('_', ' ') || 'MATERI'}
// // // // // //             </span>
// // // // // //         </div>
// // // // // //         <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
// // // // // //             <h1 className="text-gray-900 font-bold text-2xl flex-1 leading-tight">{title}</h1>
// // // // // //             <div className="flex-shrink-0 flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
// // // // // //                 <div className="flex items-center gap-1"><Users size={12} className="text-indigo-500"/> <span>{getFacilitatorName(activeLesson.facilitatorId, courseFacilitators)}</span></div>
// // // // // //                 {activeLesson.jp > 0 && <div className="flex items-center gap-1 border-l pl-3"><Clock size={12} className="text-indigo-500"/> <span>{activeLesson.jp} JP</span></div>}
                
// // // // // //                 {/* [FIX] Tanggal Pelaksanaan dari scheduleDate */}
// // // // // //                 {(activeLesson.scheduleDate) && (
// // // // // //                     <div className="flex items-center gap-1 border-l pl-3">
// // // // // //                         <Calendar size={12} className="text-indigo-500"/> 
// // // // // //                         <span>{formatDate(activeLesson.scheduleDate)}</span>
// // // // // //                     </div>
// // // // // //                 )}
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     </div>
// // // // // //   );

// // // // // //   const renderContent = () => {
// // // // // //     if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping.</div>;
// // // // // //     if (activeLesson.type === 'quiz') return <QuizPlayer quizId={activeLesson._id} courseId={courseId} onComplete={handleQuizCompleted} />;
    
// // // // // //     if (activeLesson.type === 'video_url') {
// // // // // //         const embedUrl = activeLesson.videoUrl?.includes('youtu') ? `https://www.youtube.com/embed/${activeLesson.videoUrl.split('/').pop().replace('watch?v=', '')}` : activeLesson.videoUrl;
// // // // // //         return (
// // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
// // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // //                 <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg"><iframe src={embedUrl} className="w-full h-full" allowFullScreen title={`Video ${activeLesson.title}`} /></div>
// // // // // //             </div>
// // // // // //         );
// // // // // //     }

// // // // // //     if (activeLesson.type === 'pdf' || activeLesson.type === 'slide') {
// // // // // //         return (
// // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[80vh] flex flex-col">
// // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // //                 <iframe src={getImageUrl(activeLesson.fileUrl)} className="w-full flex-1 rounded border bg-gray-100" title={`Dokumen ${activeLesson.title}`}></iframe>
// // // // // //             </div>
// // // // // //         );
// // // // // //     }
    
// // // // // //     return (
// // // // // //         <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // //             {renderContentHeader(activeLesson.title)}
// // // // // //             <div className="prose max-w-none mb-8 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content || 'Konten belum tersedia.' }} />
// // // // // //             {activeLesson.type === 'essay' && (
// // // // // //                 <div className="space-y-6">
// // // // // //                     {activeLesson.questions?.map((q:any,i:number)=>(
// // // // // //                         <div key={i} className="border p-4 rounded-lg bg-gray-50"><p className="font-bold mb-2 text-sm text-gray-700">{i+1}. {q.question}</p><div className="bg-white"><ReactQuill theme="snow" value={essayAnswers[i]||''} onChange={(v)=>handleEssayChange(i,v)} placeholder="Tulis jawaban..."/></div></div>
// // // // // //                     ))}
// // // // // //                     <button onClick={handleSubmitTask} disabled={isSubmitting} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold w-full hover:bg-indigo-700 transition-colors" aria-label="Kirim Jawaban">{isSubmitting?'Mengirim...':'Kirim Jawaban'}</button>
// // // // // //                 </div>
// // // // // //             )}
// // // // // //             {activeLesson.type === 'upload_doc' && (
// // // // // //                 <div className="border-2 border-dashed p-8 text-center rounded-xl bg-gray-50 border-indigo-200">
// // // // // //                     <UploadCloud className="mx-auto text-indigo-400 mb-2" size={32}/>
// // // // // //                     <p className="text-sm text-gray-500 mb-4">Upload tugas Anda di sini (PDF/DOCX/JPG)</p>
// // // // // //                     <input type="file" aria-label="Pilih file tugas" onChange={(e)=>setUploadedFile(e.target.files?.[0]||null)} className="mb-4 text-sm block mx-auto text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
// // // // // //                     <button onClick={handleSubmitTask} disabled={!uploadedFile||isSubmitting} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold block mx-auto hover:bg-indigo-700 transition-colors" aria-label="Upload File">{isSubmitting?'Mengupload...':'Upload Tugas'}</button>
// // // // // //                 </div>
// // // // // //             )}
// // // // // //             {activeLesson.type === 'poll' && (
// // // // // //                 <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
// // // // // //                     <h3 className="font-bold text-lg mb-4">{activeLesson.pollQuestion || "Polling"}</h3>
// // // // // //                     <div className="space-y-3 max-w-sm mx-auto">
// // // // // //                         {activeLesson.pollOptions?.map((opt:string, idx:number) => (
// // // // // //                             <button key={idx} onClick={()=>setPollSelected(idx)} className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${pollSelected===idx ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-100 border-gray-300'}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>
// // // // // //                         ))}
// // // // // //                     </div>
// // // // // //                     <button onClick={handleSubmitTask} disabled={pollSelected===null||isSubmitting} className="mt-6 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition-colors" aria-label="Kirim Polling">Kirim Polling</button>
// // // // // //                 </div>
// // // // // //             )}
// // // // // //         </div>
// // // // // //     );
// // // // // //   };

// // // // // //   if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // // // //   if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;

// // // // // //   if (!isEnrolled || enrollmentStatus === 'pending') {
// // // // // //       return (
// // // // // //         <div className="min-h-screen bg-gray-50 pb-20">
// // // // // //             {showRegisterModal && (<CourseRegistrationModal courseId={courseId} courseTitle={course.title} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil!"); router.push('/courses'); }} />)}
// // // // // //             <div className="p-10 text-center">Silakan Daftar Terlebih Dahulu</div>
// // // // // //         </div>
// // // // // //       );
// // // // // //   }

// // // // // //   const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;

// // // // // //   return (
// // // // // //     <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // // // // //       <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
// // // // // //         <div className="p-5 border-b bg-white">
// // // // // //             <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" aria-label="Kembali" title="Kembali"><span>←</span> KEMBALI</Link>
// // // // // //             <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
// // // // // //             {/* [FIX] Progress Bar di Sidebar Dikembalikan */}
// // // // // //             <div className="space-y-2">
// // // // // //                 <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{safePercent}%</span></div>
// // // // // //                 <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: `${safePercent}%`}}></div></div>
// // // // // //             </div>
            
// // // // // //             <button onClick={() => setShowPersonalChat(true)} className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50" aria-label="Hubungi Pengajar" title="Hubungi Pengajar">
// // // // // //                 <MessageCircle size={16}/> Hubungi Pengajar
// // // // // //             </button>
// // // // // //         </div>
// // // // // //         <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
// // // // // //             {/* Module List dengan Icon */}
// // // // // //             {course.modules?.map((mod:any, i:number)=>(
// // // // // //                 <div key={mod._id}>
// // // // // //                     <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
// // // // // //                     {mod.lessons?.map((les:any) => (
// // // // // //                         <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`} title={les.title}>
// // // // // //                             {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
// // // // // //                             {les.title}
// // // // // //                         </button>
// // // // // //                     ))}
// // // // // //                 </div>
// // // // // //             ))}
// // // // // //         </div>
// // // // // //       </aside>

// // // // // //       <main className="flex-1 flex flex-col relative h-full overflow-hidden bg-gray-50">
// // // // // //         <div className="md:hidden p-4 bg-white border-b flex justify-between items-center"><button type="button" onClick={()=>setIsSidebarOpen(!isSidebarOpen)} aria-label="Menu" title="Menu"><Menu/></button></div>
// // // // // //         <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
// // // // // //             {renderContent()}
// // // // // //         </div>
        
// // // // // //         <div className="fixed bottom-8 right-8 flex gap-3 z-30">
// // // // // //             <button type="button" onClick={handlePrevLesson} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center" aria-label="Previous" title="Sebelumnya"><ChevronLeft/></button>
// // // // // //             <button type="button" onClick={handleManualComplete} className="h-12 px-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 font-bold" aria-label="Next" title="Lanjut"><span>Lanjut</span><ChevronRight/></button>
// // // // // //         </div>
// // // // // //       </main>
      
// // // // // //       {showPersonalChat && <ChatWithFacilitatorModal facilitators={courseFacilitators} onClose={() => setShowPersonalChat(false)} />}

// // // // // //       {/* [FIX] GROUP CHAT FLOATING */}
// // // // // //       {user && (
// // // // // //         <CourseGroupChat 
// // // // // //             courseId={courseId} 
// // // // // //             currentUser={user} 
// // // // // //             participants={courseParticipants} // Data Peserta
// // // // // //             facilitators={courseFacilitators} // Data Fasilitator
// // // // // //             isFloating={true} 
// // // // // //         />
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // 'use client';

// // // // // import { useState, useEffect, useRef, useMemo } from 'react';
// // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // import Link from 'next/link';
// // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // // import CourseGroupChat from '@/components/CourseGroupChat'; 
// // // // // import { 
// // // // //     Users, Clock, MessageCircle, ChevronLeft, ChevronRight, Menu, Send, X,
// // // // //     FileText, PlayCircle, CheckCircle, UploadCloud, Calendar, Download, 
// // // // //     Image as ImageIcon, Video, School, MonitorPlay, BookOpen
// // // // // } from 'lucide-react';
// // // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';
// // // // // import dynamic from 'next/dynamic';
// // // // // import 'react-quill/dist/quill.snow.css';

// // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // //     ssr: false, 
// // // // //     loading: () => <div className="h-24 bg-gray-50 animate-pulse rounded-lg border border-gray-200"></div> 
// // // // // });

// // // // // // --- HELPER FUNCTIONS ---
// // // // // const getFacilitatorName = (activeFacilitatorId: any, facilitatorsList: any[]) => {
// // // // //     if (!activeFacilitatorId) return '-';
// // // // //     if (typeof activeFacilitatorId === 'object' && activeFacilitatorId.name) return activeFacilitatorId.name;
// // // // //     const found = facilitatorsList.find(f => (f._id === activeFacilitatorId) || (f.id === activeFacilitatorId));
// // // // //     return found ? found.name : 'Fasilitator';
// // // // // };

// // // // // const formatDate = (dateString: string) => {
// // // // //     if (!dateString) return '';
// // // // //     return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // // // };

// // // // // // --- CHAT MODAL ---
// // // // // function ChatWithFacilitatorModal({ facilitators, onClose }: any) {
// // // // //     const { user } = useAuth();
// // // // //     const [selectedFacilitator, setSelectedFacilitator] = useState<any>(facilitators[0] || null);
// // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // //     const [message, setMessage] = useState('');
// // // // //     const [sending, setSending] = useState(false);
// // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // //     useEffect(() => {
// // // // //         if (selectedFacilitator?._id) {
// // // // //             loadHistory();
// // // // //             const interval = setInterval(loadHistory, 3000);
// // // // //             return () => clearInterval(interval);
// // // // //         }
// // // // //     }, [selectedFacilitator]);

// // // // //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// // // // //     const loadHistory = async () => {
// // // // //         try {
// // // // //             const res = await api(`/api/chat/${selectedFacilitator._id}?t=${Date.now()}`);
// // // // //             setMessages(res.messages || []);
// // // // //         } catch (e) { console.error(e); }
// // // // //     };

// // // // //     const handleSend = async (e: React.FormEvent) => {
// // // // //         e.preventDefault();
// // // // //         if (!message.trim() || !selectedFacilitator) return;
// // // // //         setSending(true);
// // // // //         try {
// // // // //             await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message } });
// // // // //             setMessage('');
// // // // //             loadHistory();
// // // // //         } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); }
// // // // //     };

// // // // //     return (
// // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
// // // // //             <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]" role="dialog" aria-modal="true" aria-label="Chat Personal">
// // // // //                 <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
// // // // //                     <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18} /> Hubungi Pengajar</h3>
// // // // //                     <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20} /></button>
// // // // //                 </div>
// // // // //                 {!selectedFacilitator ? (
// // // // //                     <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center text-gray-500">Tidak ada fasilitator.</div>
// // // // //                 ) : (
// // // // //                     <>
// // // // //                         {facilitators.length > 1 && (
// // // // //                             <div className="p-3 bg-gray-50 border-b flex gap-2 overflow-x-auto">
// // // // //                                 {facilitators.map((f:any) => (
// // // // //                                     <button type="button" key={f._id} onClick={()=>setSelectedFacilitator(f)} className={`px-3 py-1 text-xs rounded-full border ${selectedFacilitator._id===f._id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300'}`} title={`Pilih ${f.name}`}>{f.name}</button>
// // // // //                                 ))}
// // // // //                             </div>
// // // // //                         )}
// // // // //                         <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// // // // //                             {messages.map((msg: any, idx: number) => {
// // // // //                                 const isMe = msg.sender === 'me' || msg.sender?._id === user?.id;
// // // // //                                 return (
// // // // //                                     <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
// // // // //                                         <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
// // // // //                                             <p>{msg.message}</p>
// // // // //                                         </div>
// // // // //                                     </div>
// // // // //                                 );
// // // // //                             })}
// // // // //                             <div ref={messagesEndRef} />
// // // // //                         </div>
// // // // //                         <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
// // // // //                             <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus title="Input Pesan" aria-label="Ketik pesan" />
// // // // //                             <button type="submit" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button>
// // // // //                         </form>
// // // // //                     </>
// // // // //                 )}
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // }

// // // // // // --- MAIN PAGE COMPONENT ---
// // // // // export default function StudentCoursePlayPage() {
// // // // //     const router = useRouter();
// // // // //     const params = useParams();
// // // // //     const { user } = useAuth();
// // // // //     const { courseId } = params as { courseId: string };
  
// // // // //     const [course, setCourse] = useState<any>(null);
// // // // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // //     const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // // // //     const [progressPercent, setProgressPercent] = useState(0);
// // // // //     const [courseFacilitators, setCourseFacilitators] = useState<any[]>([]); 
// // // // //     const [courseParticipants, setCourseParticipants] = useState<any[]>([]); 
    
// // // // //     const [loading, setLoading] = useState(true);
// // // // //     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // // //     const [isEnrolled, setIsEnrolled] = useState(false);
// // // // //     const [enrollmentStatus, setEnrollmentStatus] = useState<string>(''); 
// // // // //     const [showRegisterModal, setShowRegisterModal] = useState(false);
// // // // //     const [showPersonalChat, setShowPersonalChat] = useState(false); 
  
// // // // //     const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// // // // //     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// // // // //     const [pollSelected, setPollSelected] = useState<number | null>(null);
// // // // //     const [isSubmitting, setIsSubmitting] = useState(false);
  
// // // // //     useEffect(() => {
// // // // //         const initData = async () => {
// // // // //           try {
// // // // //             setLoading(true);
// // // // //             const resCourse = await api(`/api/courses/${courseId}`);
// // // // //             const courseData = resCourse.course || resCourse;
// // // // //             setCourse(courseData);
// // // // //             setCourseFacilitators(courseData.facilitatorIds || []); 
    
// // // // //             if (user) {
// // // // //                 try {
// // // // //                     const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// // // // //                     setIsEnrolled(enrollRes.isEnrolled);
                    
// // // // //                     if (enrollRes.isEnrolled) {
// // // // //                         setEnrollmentStatus(enrollRes.status || 'pending'); 
// // // // //                         if (enrollRes.status === 'active' || enrollRes.status === 'approved') {
// // // // //                             const resProgress = await api(`/api/progress/${courseId}`);
// // // // //                             setCompletedLessonIds(resProgress.completedLessons || []);
// // // // //                             try {
// // // // //                                 const resPart = await api(`/api/courses/${courseId}/participants`);
// // // // //                                 const parts = resPart.participants?.map((p:any) => p.user || p) || [];
// // // // //                                 setCourseParticipants(parts);
// // // // //                             } catch(e) {}
// // // // //                         }
// // // // //                     }
// // // // //                 } catch (e) { console.error("Enroll check failed", e); }
// // // // //             }
// // // // //             if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
// // // // //           } catch (e) { console.error("Init failed", e); } finally { setLoading(false); }
// // // // //         };
// // // // //         if (courseId) initData();
// // // // //     }, [courseId, user]);
    
// // // // //     useEffect(() => {
// // // // //         if (course && !loading) {
// // // // //             let total = 0; let completed = 0;
// // // // //             course.modules?.forEach((m: any) => { 
// // // // //                 if(m.isActive) {
// // // // //                     m.lessons?.forEach((l: any) => { 
// // // // //                         if(l.isActive) { 
// // // // //                             total++; 
// // // // //                             if (completedLessonIds.includes(l._id)) completed++; 
// // // // //                         } 
// // // // //                     });
// // // // //                 }
// // // // //             });
// // // // //             const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
// // // // //             setProgressPercent(percent);
// // // // //         }
// // // // //     }, [completedLessonIds, course, loading]);
    
// // // // //     useEffect(() => {
// // // // //           setUploadedFile(null);
// // // // //           setPollSelected(null);
// // // // //           setIsSubmitting(false);
// // // // //           if (activeLesson?.type === 'essay' && activeLesson.questions) {
// // // // //               setEssayAnswers(new Array(activeLesson.questions.length).fill(''));
// // // // //           } else {
// // // // //               setEssayAnswers([]);
// // // // //           }
// // // // //     }, [activeLesson]);

// // // // //     const handleEssayChange = (index: number, value: string) => {
// // // // //         const newAnswers = [...essayAnswers];
// // // // //         newAnswers[index] = value;
// // // // //         setEssayAnswers(newAnswers);
// // // // //     };

// // // // //     const markLessonAsComplete = async (lessonId: string) => {
// // // // //         if (!completedLessonIds.includes(lessonId)) {
// // // // //             try { 
// // // // //                 await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId } }); 
// // // // //                 setCompletedLessonIds(prev => [...prev, lessonId]); 
// // // // //             } catch(e) { console.error("Save progress failed", e); }
// // // // //         }
// // // // //     };
    
// // // // //     const handleNextLesson = () => {
// // // // //         const allLessons: any[] = [];
// // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // //         if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // // // //         else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // // // //     };
    
// // // // //     const handlePrevLesson = () => {
// // // // //         const allLessons: any[] = [];
// // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // //         if (currIdx > 0) { setActiveLesson(allLessons[currIdx - 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }
// // // // //     };

// // // // //     const handleManualComplete = async () => { await markLessonAsComplete(activeLesson._id); handleNextLesson(); };
// // // // //     const handleQuizCompleted = async () => { await markLessonAsComplete(activeLesson._id); };
    
// // // // //     const handleSubmitTask = async () => {
// // // // //         setIsSubmitting(true);
// // // // //         try {
// // // // //             if (activeLesson.type === 'essay' && essayAnswers.some(ans => ans.trim() === '')) return alert("Mohon jawab semua pertanyaan.");
// // // // //             if (activeLesson.type === 'upload_doc' && !uploadedFile) return alert("Pilih file terlebih dahulu.");
// // // // //             if (activeLesson.type === 'poll' && pollSelected === null) return alert("Pilih salah satu opsi.");
// // // // //             await markLessonAsComplete(activeLesson._id);
// // // // //             alert("Berhasil dikirim!");
// // // // //             handleNextLesson();
// // // // //         } catch (e: any) { alert("Gagal mengirim: " + e.message); } finally { setIsSubmitting(false); }
// // // // //     };

// // // // //     const renderContentHeader = (title: string) => (
// // // // //         <div className="mb-6 border-b border-gray-100 pb-4">
// // // // //             <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// // // // //                 <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 flex items-center gap-1">
// // // // //                     {activeLesson?.type === 'video_url' && <PlayCircle size={12}/>}
// // // // //                     {activeLesson?.type === 'pdf' && <FileText size={12}/>}
// // // // //                     {activeLesson?.type === 'quiz' && <CheckCircle size={12}/>}
// // // // //                     {activeLesson?.type === 'image' && <ImageIcon size={12}/>}
// // // // //                     {activeLesson?.type === 'slide' && <FileText size={12}/>}
// // // // //                     {activeLesson?.type === 'virtual_class' && <MonitorPlay size={12}/>}
// // // // //                     {activeLesson?.type?.replace(/_/g, ' ') || 'MATERI'}
// // // // //                 </span>
// // // // //             </div>
// // // // //             <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
// // // // //                 <h1 className="text-gray-900 font-bold text-2xl flex-1 leading-tight">{title}</h1>
// // // // //                 <div className="flex-shrink-0 flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
// // // // //                     <div className="flex items-center gap-1"><Users size={12} className="text-indigo-500"/> <span>{getFacilitatorName(activeLesson.facilitatorId, courseFacilitators)}</span></div>
// // // // //                     {activeLesson.jp > 0 && <div className="flex items-center gap-1 border-l pl-3"><Clock size={12} className="text-indigo-500"/> <span>{activeLesson.jp} JP</span></div>}
// // // // //                     {(activeLesson.scheduleDate) && <div className="flex items-center gap-1 border-l pl-3"><Calendar size={12} className="text-indigo-500"/> <span>{formatDate(activeLesson.scheduleDate)}</span></div>}
// // // // //                 </div>
// // // // //             </div>
// // // // //         </div>
// // // // //     );

// // // // //     const renderContent = () => {
// // // // //         if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping.</div>;
// // // // //         if (activeLesson.type === 'quiz') return <QuizPlayer quizId={activeLesson._id} courseId={courseId} onComplete={handleQuizCompleted} />;
        
// // // // //         if (activeLesson.type === 'slide') {
// // // // //             return (
// // // // //                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // //                     {renderContentHeader(activeLesson.title)}
                    
// // // // //                     <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center mb-6">
// // // // //                         <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4"><FileText size={32} /></div>
// // // // //                         <h3 className="text-lg font-bold text-gray-800 mb-2">{activeLesson.title}</h3>
// // // // //                         <p className="text-sm text-gray-500 mb-6">Materi ini berupa dokumen slide/presentasi.</p>
                        
// // // // //                         <a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-transform active:scale-95" title="Download Slide" aria-label="Download Slide">
// // // // //                             <Download size={18} /> Download Slide
// // // // //                         </a>
// // // // //                     </div>

// // // // //                     {activeLesson.fileUrl && activeLesson.fileUrl.endsWith('.pdf') && (
// // // // //                         <div className="mt-8 border rounded-xl overflow-hidden h-[800px] shadow-sm">
// // // // //                              <iframe src={getImageUrl(activeLesson.fileUrl)} className="w-full h-full" title="Preview Slide"></iframe>
// // // // //                         </div>
// // // // //                     )}
// // // // //                 </div>
// // // // //             );
// // // // //         }

// // // // //         if (activeLesson.type === 'video_url') {
// // // // //             const embedUrl = activeLesson.videoUrl?.includes('youtu') ? `https://www.youtube.com/embed/${activeLesson.videoUrl.split('/').pop().replace('watch?v=', '')}` : activeLesson.videoUrl;
// // // // //             return (
// // // // //                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
// // // // //                     {renderContentHeader(activeLesson.title)}
// // // // //                     <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg"><iframe src={embedUrl} className="w-full h-full" allowFullScreen title={`Video ${activeLesson.title}`} /></div>
// // // // //                 </div>
// // // // //             );
// // // // //         }

// // // // //         if (activeLesson.type === 'pdf') {
// // // // //             return (
// // // // //                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[80vh] flex flex-col">
// // // // //                     {renderContentHeader(activeLesson.title)}
// // // // //                     <iframe src={getImageUrl(activeLesson.fileUrl)} className="w-full flex-1 rounded border bg-gray-100" title={`Dokumen ${activeLesson.title}`}></iframe>
// // // // //                 </div>
// // // // //             );
// // // // //         }

// // // // //         if (activeLesson.type === 'image') {
// // // // //             return (
// // // // //                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // //                     {renderContentHeader(activeLesson.title)}
// // // // //                     <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
// // // // //                         <img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="w-full h-auto object-contain" />
// // // // //                     </div>
// // // // //                 </div>
// // // // //             );
// // // // //         }
        
// // // // //         return (
// // // // //             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // //                 {renderContentHeader(activeLesson.title)}
// // // // //                 <div className="prose max-w-none mb-8 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content || 'Konten belum tersedia.' }} />
                
// // // // //                 {activeLesson.type === 'essay' && (
// // // // //                     <div className="space-y-6">
// // // // //                         {activeLesson.questions?.map((q:any,i:number)=>(
// // // // //                             <div key={i} className="border p-4 rounded-lg bg-gray-50">
// // // // //                                 <p className="font-bold mb-2 text-sm text-gray-700">{i+1}. {q.question}</p>
// // // // //                                 <div className="bg-white">
// // // // //                                     <ReactQuill theme="snow" value={essayAnswers[i]||''} onChange={(v)=>handleEssayChange(i,v)} placeholder="Tulis jawaban..."/>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         ))}
// // // // //                         <button onClick={handleSubmitTask} disabled={isSubmitting} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold w-full hover:bg-indigo-700 transition-colors" title="Kirim Jawaban" aria-label="Kirim Jawaban">{isSubmitting?'Mengirim...':'Kirim Jawaban'}</button>
// // // // //                     </div>
// // // // //                 )}
// // // // //                 {activeLesson.type === 'upload_doc' && (
// // // // //                     <div className="border-2 border-dashed p-8 text-center rounded-xl bg-gray-50 border-indigo-200">
// // // // //                         <UploadCloud className="mx-auto text-indigo-400 mb-2" size={32}/>
// // // // //                         <p className="text-sm text-gray-500 mb-4">Upload tugas Anda di sini (PDF/DOCX/JPG)</p>
// // // // //                         <input type="file" title="Pilih file tugas" aria-label="Pilih file tugas" onChange={(e)=>setUploadedFile(e.target.files?.[0]||null)} className="mb-4 text-sm block mx-auto text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
// // // // //                         <button onClick={handleSubmitTask} disabled={!uploadedFile||isSubmitting} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold block mx-auto hover:bg-indigo-700 transition-colors" title="Upload Tugas" aria-label="Upload Tugas">{isSubmitting?'Mengupload...':'Upload Tugas'}</button>
// // // // //                     </div>
// // // // //                 )}
// // // // //                 {activeLesson.type === 'poll' && (
// // // // //                     <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
// // // // //                         <h3 className="font-bold text-lg mb-4">{activeLesson.pollQuestion || "Polling"}</h3>
// // // // //                         <div className="space-y-3 max-w-sm mx-auto">
// // // // //                             {activeLesson.pollOptions?.map((opt:string, idx:number) => (
// // // // //                                 <button key={idx} onClick={()=>setPollSelected(idx)} className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${pollSelected===idx ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-100 border-gray-300'}`} title={`Pilih ${opt}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>
// // // // //                             ))}
// // // // //                         </div>
// // // // //                         <button onClick={handleSubmitTask} disabled={pollSelected===null||isSubmitting} className="mt-6 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition-colors" title="Kirim Polling" aria-label="Kirim Polling">Kirim Polling</button>
// // // // //                     </div>
// // // // //                 )}
// // // // //             </div>
// // // // //         );
// // // // //     };
  
// // // // //     if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // // //     if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;
  
// // // // //     if (!isEnrolled || enrollmentStatus === 'pending') {
// // // // //         return (
// // // // //           <div className="min-h-screen bg-gray-50 pb-20">
// // // // //               {showRegisterModal && (<CourseRegistrationModal courseId={courseId} courseTitle={course.title} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil!"); router.push('/courses'); }} />)}
// // // // //               <div className="bg-gray-900 text-white relative">
// // // // //                   <div className="absolute inset-0 bg-black/60 z-0"></div>
// // // // //                   {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" alt="" />}
// // // // //                   <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
// // // // //                       <div className="lg:col-span-2 space-y-6">
// // // // //                           <div className="inline-block bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{course.programType === 'training' ? 'Diklat' : 'Kursus'}</div>
// // // // //                           <h1 className="text-4xl font-extrabold leading-tight">{course.title}</h1>
// // // // //                           <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
// // // // //                               <div className="flex items-center gap-2"><Users size={18}/> {course.facilitatorIds?.length || 1} Fasilitator</div>
// // // // //                               <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
// // // // //                               <div className="flex items-center gap-2"><Clock size={18}/> Fleksibel</div>
// // // // //                           </div>
// // // // //                       </div>
// // // // //                       <div className="lg:col-span-1 bg-white text-gray-900 p-6 rounded-2xl shadow-xl">
// // // // //                           <div className="text-center mb-6"><p className="text-gray-500 text-sm">Biaya Pelatihan</p><p className="text-3xl font-extrabold text-green-600">{course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}</p></div>
// // // // //                           <button onClick={() => setShowRegisterModal(true)} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2" title="Daftar Sekarang" aria-label="Daftar Sekarang">📝 Daftar Sekarang</button>
// // // // //                       </div>
// // // // //                   </div>
// // // // //               </div>
// // // // //           </div>
// // // // //         );
// // // // //     }
  
// // // // //     const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;
  
// // // // //     return (
// // // // //       <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // // // //         <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
// // // // //           <div className="p-5 border-b bg-white">
// // // // //               <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" title="Kembali ke Katalog" aria-label="Kembali ke Katalog"><span>←</span> KEMBALI KE KATALOG</Link>
// // // // //               <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
// // // // //               <div className="space-y-2">
// // // // //                   <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{safePercent}%</span></div>
// // // // //                   <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: `${safePercent}%`}}></div></div>
// // // // //               </div>
// // // // //               <button onClick={() => setShowPersonalChat(true)} className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50" title="Hubungi Pengajar" aria-label="Hubungi Pengajar">
// // // // //                   <MessageCircle size={16}/> Hubungi Pengajar
// // // // //               </button>
// // // // //           </div>
// // // // //           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
// // // // //               {course.modules?.map((mod:any, i:number)=>(
// // // // //                   <div key={mod._id}>
// // // // //                       <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
// // // // //                       <div className="space-y-1">
// // // // //                           {mod.lessons?.map((les:any) => (
// // // // //                               <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`} title={les.title} aria-label={`Buka materi ${les.title}`}>
// // // // //                                   {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
// // // // //                                   {les.title}
// // // // //                               </button>
// // // // //                           ))}
// // // // //                       </div>
// // // // //                   </div>
// // // // //               ))}
// // // // //           </div>
// // // // //         </aside>
  
// // // // //         <main className="flex-1 flex flex-col relative h-full overflow-hidden bg-gray-50">
// // // // //           <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
// // // // //               <button type="button" onClick={()=>setIsSidebarOpen(!isSidebarOpen)} title="Buka Menu Sidebar" aria-label="Buka Menu Sidebar"><Menu/></button>
// // // // //           </div>
// // // // //           <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
// // // // //               {renderContent()}
// // // // //           </div>
          
// // // // //           <div className="fixed bottom-8 right-8 flex gap-3 z-30">
// // // // //               <button type="button" onClick={handlePrevLesson} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105" title="Materi Sebelumnya" aria-label="Materi Sebelumnya"><ChevronLeft/></button>
// // // // //               <button type="button" onClick={handleManualComplete} className="h-12 px-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 font-bold hover:scale-105" title="Lanjut Materi" aria-label="Lanjut Materi"><span>Lanjut</span><ChevronRight/></button>
// // // // //           </div>
// // // // //         </main>
        
// // // // //         {showPersonalChat && <ChatWithFacilitatorModal facilitators={courseFacilitators} onClose={() => setShowPersonalChat(false)} />}
  
// // // // //         {user && (
// // // // //           <CourseGroupChat 
// // // // //               courseId={courseId} 
// // // // //               currentUser={user} 
// // // // //               participants={courseParticipants} 
// // // // //               facilitators={courseFacilitators} 
// // // // //               isFloating={true} 
// // // // //           />
// // // // //         )}
// // // // //       </div>
// // // // //     );
// // // // // }
// // // // 'use client';

// // // // import { useState, useEffect, useRef, useMemo } from 'react';
// // // // import { useParams, useRouter } from 'next/navigation';
// // // // import Link from 'next/link';
// // // // import { api, getImageUrl } from '@/lib/api';
// // // // import { useAuth } from '@/lib/AuthProvider';
// // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // import CourseGroupChat from '@/components/CourseGroupChat'; 
// // // // import { 
// // // //     Users, Clock, MessageCircle, ChevronLeft, ChevronRight, Menu, Send, X,
// // // //     FileText, PlayCircle, CheckCircle, UploadCloud, Calendar, Download, 
// // // //     Image as ImageIcon, Video, School, MonitorPlay, BookOpen
// // // // } from 'lucide-react';
// // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';
// // // // import dynamic from 'next/dynamic';
// // // // import 'react-quill/dist/quill.snow.css';

// // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // //     ssr: false, 
// // // //     loading: () => <div className="h-24 bg-gray-50 animate-pulse rounded-lg border border-gray-200"></div> 
// // // // });

// // // // // --- HELPER FUNCTIONS ---
// // // // const getFacilitatorName = (activeFacilitatorId: any, facilitatorsList: any[]) => {
// // // //     if (!activeFacilitatorId) return '-';
// // // //     if (typeof activeFacilitatorId === 'object' && activeFacilitatorId.name) return activeFacilitatorId.name;
// // // //     const found = facilitatorsList.find(f => (f._id === activeFacilitatorId) || (f.id === activeFacilitatorId));
// // // //     return found ? found.name : 'Fasilitator';
// // // // };

// // // // const formatDate = (dateString: string) => {
// // // //     if (!dateString) return '';
// // // //     return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // // };

// // // // // --- CHAT MODAL ---
// // // // function ChatWithFacilitatorModal({ facilitators, onClose }: any) {
// // // //     const { user } = useAuth();
// // // //     const [selectedFacilitator, setSelectedFacilitator] = useState<any>(facilitators[0] || null);
// // // //     const [messages, setMessages] = useState<any[]>([]);
// // // //     const [message, setMessage] = useState('');
// // // //     const [sending, setSending] = useState(false);
// // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // //     useEffect(() => {
// // // //         if (selectedFacilitator?._id) {
// // // //             loadHistory();
// // // //             const interval = setInterval(loadHistory, 3000);
// // // //             return () => clearInterval(interval);
// // // //         }
// // // //     }, [selectedFacilitator]);

// // // //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// // // //     const loadHistory = async () => {
// // // //         try {
// // // //             const res = await api(`/api/chat/${selectedFacilitator._id}?t=${Date.now()}`);
// // // //             setMessages(res.messages || []);
// // // //         } catch (e) { console.error(e); }
// // // //     };

// // // //     const handleSend = async (e: React.FormEvent) => {
// // // //         e.preventDefault();
// // // //         if (!message.trim() || !selectedFacilitator) return;
// // // //         setSending(true);
// // // //         try {
// // // //             await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message } });
// // // //             setMessage('');
// // // //             loadHistory();
// // // //         } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); }
// // // //     };

// // // //     return (
// // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
// // // //             <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]" role="dialog" aria-modal="true" aria-label="Chat Personal">
// // // //                 <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
// // // //                     <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18} /> Hubungi Pengajar</h3>
// // // //                     <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20} /></button>
// // // //                 </div>
// // // //                 {!selectedFacilitator ? (
// // // //                     <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center text-gray-500">Tidak ada fasilitator.</div>
// // // //                 ) : (
// // // //                     <>
// // // //                         {facilitators.length > 1 && (
// // // //                             <div className="p-3 bg-gray-50 border-b flex gap-2 overflow-x-auto">
// // // //                                 {facilitators.map((f:any) => (
// // // //                                     <button type="button" key={f._id} onClick={()=>setSelectedFacilitator(f)} className={`px-3 py-1 text-xs rounded-full border ${selectedFacilitator._id===f._id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300'}`} title={`Pilih ${f.name}`}>{f.name}</button>
// // // //                                 ))}
// // // //                             </div>
// // // //                         )}
// // // //                         <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// // // //                             {messages.map((msg: any, idx: number) => {
// // // //                                 const isMe = msg.sender === 'me' || msg.sender?._id === user?.id;
// // // //                                 return (
// // // //                                     <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
// // // //                                         <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
// // // //                                             <p>{msg.message}</p>
// // // //                                         </div>
// // // //                                     </div>
// // // //                                 );
// // // //                             })}
// // // //                             <div ref={messagesEndRef} />
// // // //                         </div>
// // // //                         <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
// // // //                             <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus title="Input Pesan" aria-label="Ketik pesan" />
// // // //                             <button type="submit" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button>
// // // //                         </form>
// // // //                     </>
// // // //                 )}
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }

// // // // // --- MAIN PAGE COMPONENT ---
// // // // export default function StudentCoursePlayPage() {
// // // //     const router = useRouter();
// // // //     const params = useParams();
// // // //     const { user } = useAuth();
// // // //     const { courseId } = params as { courseId: string };
  
// // // //     const [course, setCourse] = useState<any>(null);
// // // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // // //     const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // // //     const [progressPercent, setProgressPercent] = useState(0);
// // // //     const [courseFacilitators, setCourseFacilitators] = useState<any[]>([]); 
// // // //     const [courseParticipants, setCourseParticipants] = useState<any[]>([]); 
    
// // // //     const [loading, setLoading] = useState(true);
// // // //     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // //     const [isEnrolled, setIsEnrolled] = useState(false);
// // // //     const [enrollmentStatus, setEnrollmentStatus] = useState<string>(''); 
// // // //     const [showRegisterModal, setShowRegisterModal] = useState(false);
// // // //     const [showPersonalChat, setShowPersonalChat] = useState(false); 
  
// // // //     const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// // // //     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// // // //     const [pollSelected, setPollSelected] = useState<number | null>(null);
// // // //     const [isSubmitting, setIsSubmitting] = useState(false);
  
// // // //     useEffect(() => {
// // // //         const initData = async () => {
// // // //           try {
// // // //             setLoading(true);
// // // //             const resCourse = await api(`/api/courses/${courseId}`);
// // // //             const courseData = resCourse.course || resCourse;
// // // //             setCourse(courseData);
// // // //             setCourseFacilitators(courseData.facilitatorIds || []); 
    
// // // //             if (user) {
// // // //                 try {
// // // //                     const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// // // //                     setIsEnrolled(enrollRes.isEnrolled);
                    
// // // //                     if (enrollRes.isEnrolled) {
// // // //                         setEnrollmentStatus(enrollRes.status || 'pending'); 
// // // //                         if (enrollRes.status === 'active' || enrollRes.status === 'approved') {
// // // //                             const resProgress = await api(`/api/progress/${courseId}`);
// // // //                             setCompletedLessonIds(resProgress.completedLessons || []);
// // // //                             try {
// // // //                                 const resPart = await api(`/api/courses/${courseId}/participants`);
// // // //                                 const parts = resPart.participants?.map((p:any) => p.user || p) || [];
// // // //                                 setCourseParticipants(parts);
// // // //                             } catch(e) {}
// // // //                         }
// // // //                     }
// // // //                 } catch (e) { console.error("Enroll check failed", e); }
// // // //             }
// // // //             if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
// // // //           } catch (e) { console.error("Init failed", e); } finally { setLoading(false); }
// // // //         };
// // // //         if (courseId) initData();
// // // //     }, [courseId, user]);
    
// // // //     useEffect(() => {
// // // //         if (course && !loading) {
// // // //             let total = 0; let completed = 0;
// // // //             course.modules?.forEach((m: any) => { 
// // // //                 if(m.isActive) {
// // // //                     m.lessons?.forEach((l: any) => { 
// // // //                         if(l.isActive) { 
// // // //                             total++; 
// // // //                             if (completedLessonIds.includes(l._id)) completed++; 
// // // //                         } 
// // // //                     });
// // // //                 }
// // // //             });
// // // //             const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
// // // //             setProgressPercent(percent);
// // // //         }
// // // //     }, [completedLessonIds, course, loading]);
    
// // // //     useEffect(() => {
// // // //           setUploadedFile(null);
// // // //           setPollSelected(null);
// // // //           setIsSubmitting(false);
// // // //           if (activeLesson?.type === 'essay' && activeLesson.questions) {
// // // //               setEssayAnswers(new Array(activeLesson.questions.length).fill(''));
// // // //           } else {
// // // //               setEssayAnswers([]);
// // // //           }
// // // //     }, [activeLesson]);

// // // //     const handleEssayChange = (index: number, value: string) => {
// // // //         const newAnswers = [...essayAnswers];
// // // //         newAnswers[index] = value;
// // // //         setEssayAnswers(newAnswers);
// // // //     };

// // // //     const markLessonAsComplete = async (lessonId: string) => {
// // // //         if (!completedLessonIds.includes(lessonId)) {
// // // //             try { 
// // // //                 await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId } }); 
// // // //                 setCompletedLessonIds(prev => [...prev, lessonId]); 
// // // //             } catch(e) { console.error("Save progress failed", e); }
// // // //         }
// // // //     };
    
// // // //     const handleNextLesson = () => {
// // // //         const allLessons: any[] = [];
// // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // //         if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // // //         else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // // //     };
    
// // // //     const handlePrevLesson = () => {
// // // //         const allLessons: any[] = [];
// // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // //         if (currIdx > 0) { setActiveLesson(allLessons[currIdx - 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }
// // // //     };

// // // //     const handleManualComplete = async () => { await markLessonAsComplete(activeLesson._id); handleNextLesson(); };
// // // //     const handleQuizCompleted = async () => { await markLessonAsComplete(activeLesson._id); };
    
// // // //     const handleSubmitTask = async () => {
// // // //         setIsSubmitting(true);
// // // //         try {
// // // //             if (activeLesson.type === 'essay' && essayAnswers.some(ans => ans.trim() === '')) return alert("Mohon jawab semua pertanyaan.");
// // // //             if (activeLesson.type === 'upload_doc' && !uploadedFile) return alert("Pilih file terlebih dahulu.");
// // // //             if (activeLesson.type === 'poll' && pollSelected === null) return alert("Pilih salah satu opsi.");
// // // //             await markLessonAsComplete(activeLesson._id);
// // // //             alert("Berhasil dikirim!");
// // // //             handleNextLesson();
// // // //         } catch (e: any) { alert("Gagal mengirim: " + e.message); } finally { setIsSubmitting(false); }
// // // //     };

// // // //     const renderContentHeader = (title: string) => (
// // // //         <div className="mb-6 border-b border-gray-100 pb-4">
// // // //             <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// // // //                 <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 flex items-center gap-1">
// // // //                     {activeLesson?.type === 'video_url' && <PlayCircle size={12}/>}
// // // //                     {activeLesson?.type === 'pdf' && <FileText size={12}/>}
// // // //                     {activeLesson?.type === 'quiz' && <CheckCircle size={12}/>}
// // // //                     {activeLesson?.type === 'image' && <ImageIcon size={12}/>}
// // // //                     {activeLesson?.type === 'slide' && <FileText size={12}/>}
// // // //                     {activeLesson?.type === 'virtual_class' && <MonitorPlay size={12}/>}
// // // //                     {activeLesson?.type?.replace(/_/g, ' ') || 'MATERI'}
// // // //                 </span>
// // // //             </div>
// // // //             <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
// // // //                 <h1 className="text-gray-900 font-bold text-2xl flex-1 leading-tight">{title}</h1>
// // // //                 <div className="flex-shrink-0 flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
// // // //                     {/* [FIX] Label Timer di Header Peserta */}
// // // //                     {activeLesson.quizDuration > 0 && (
// // // //                         <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded border border-yellow-200">
// // // //                             <Clock size={12} /> <span className="font-bold">{activeLesson.quizDuration} Menit</span>
// // // //                         </div>
// // // //                     )}
                    
// // // //                     <div className="flex items-center gap-1"><Users size={12} className="text-indigo-500"/> <span>{getFacilitatorName(activeLesson.facilitatorId, courseFacilitators)}</span></div>
// // // //                     {activeLesson.jp > 0 && <div className="flex items-center gap-1 border-l pl-3"><Clock size={12} className="text-indigo-500"/> <span>{activeLesson.jp} JP</span></div>}
// // // //                     {(activeLesson.scheduleDate) && <div className="flex items-center gap-1 border-l pl-3"><Calendar size={12} className="text-indigo-500"/> <span>{formatDate(activeLesson.scheduleDate)}</span></div>}
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );

// // // //     const renderContent = () => {
// // // //         if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping.</div>;
// // // //         if (activeLesson.type === 'quiz') return <QuizPlayer quizId={activeLesson._id} courseId={courseId} onComplete={handleQuizCompleted} />;
        
// // // //         // [FIX] IMAGE
// // // //         if (activeLesson.type === 'image') {
// // // //             return (
// // // //                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // //                     {renderContentHeader(activeLesson.title)}
// // // //                     <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
// // // //                         <img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="w-full h-auto object-contain" />
// // // //                     </div>
// // // //                     {activeLesson.content && <div className="prose max-w-none mt-6 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />}
// // // //                 </div>
// // // //             );
// // // //         }

// // // //         // [FIX] SLIDE / DOCUMENT DOWNLOAD
// // // //         if (activeLesson.type === 'slide' || activeLesson.type === 'download_doc') {
// // // //             return (
// // // //                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // //                     {renderContentHeader(activeLesson.title)}
// // // //                     <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center mb-6">
// // // //                         <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4"><FileText size={32} /></div>
// // // //                         <h3 className="text-lg font-bold text-gray-800 mb-2">{activeLesson.title}</h3>
// // // //                         <p className="text-sm text-gray-500 mb-6">Materi ini berupa dokumen slide/presentasi.</p>
// // // //                         <a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-transform active:scale-95" aria-label="Download File">
// // // //                             <Download size={18} /> Download Materi
// // // //                         </a>
// // // //                     </div>
// // // //                     {activeLesson.fileUrl && activeLesson.fileUrl.endsWith('.pdf') && (
// // // //                         <div className="mt-8 border rounded-xl overflow-hidden h-[800px] shadow-sm">
// // // //                              <iframe src={getImageUrl(activeLesson.fileUrl)} className="w-full h-full" title="Preview"></iframe>
// // // //                         </div>
// // // //                     )}
// // // //                 </div>
// // // //             );
// // // //         }

// // // //         // [FIX] VIDEO
// // // //         if (activeLesson.type === 'video_url') {
// // // //             const embedUrl = activeLesson.videoUrl?.includes('youtu') ? `https://www.youtube.com/embed/${activeLesson.videoUrl.split('/').pop().replace('watch?v=', '')}` : activeLesson.videoUrl;
// // // //             return (
// // // //                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
// // // //                     {renderContentHeader(activeLesson.title)}
// // // //                     <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg"><iframe src={embedUrl} className="w-full h-full" allowFullScreen title={`Video ${activeLesson.title}`} /></div>
// // // //                 </div>
// // // //             );
// // // //         }

// // // //         // [FIX] VIRTUAL CLASS
// // // //         if (activeLesson.type === 'virtual_class') {
// // // //             return (
// // // //                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // //                     {renderContentHeader(activeLesson.title)}
// // // //                     <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
// // // //                         <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"><Video size={40}/></div>
// // // //                         <h3 className="text-xl font-bold text-gray-900 mb-2">Kelas Virtual (Zoom/Meet)</h3>
// // // //                         <p className="text-gray-600 mb-6">Silakan bergabung ke pertemuan virtual melalui tombol di bawah ini.</p>
// // // //                         <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg">
// // // //                             <Video size={20}/> Gabung Meeting
// // // //                         </a>
// // // //                     </div>
// // // //                 </div>
// // // //             );
// // // //         }
        
// // // //         // [FIX] GOOGLE CLASSROOM
// // // //         if (activeLesson.type === 'google_classroom') {
// // // //              return (
// // // //                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // //                     {renderContentHeader(activeLesson.title)}
// // // //                     <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
// // // //                         <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border"><School size={40} className="text-green-600"/></div>
// // // //                         <h3 className="text-xl font-bold text-gray-900 mb-2">Google Classroom</h3>
// // // //                         <p className="text-gray-600 mb-2">Materi ini terhubung dengan Google Classroom.</p>
// // // //                         {activeLesson.classroomData ? (
// // // //                             <div className="mt-4">
// // // //                                 <p className="font-bold text-lg">{activeLesson.classroomData.name}</p>
// // // //                                 <p className="text-sm text-gray-500 mb-6">Kode Kelas: <span className="font-mono bg-white px-2 py-1 border rounded">{activeLesson.classroomData.enrollmentCode || '-'}</span></p>
// // // //                                 <a href={activeLesson.classroomData.alternateLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 shadow-lg">Buka Google Classroom ↗</a>
// // // //                             </div>
// // // //                         ) : <p className="text-red-500 italic">Data kelas tidak ditemukan.</p>}
// // // //                     </div>
// // // //                 </div>
// // // //              );
// // // //         }

// // // //         // DEFAULT / TEXT LESSON
// // // //         return (
// // // //             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // //                 {renderContentHeader(activeLesson.title)}
// // // //                 <div className="prose max-w-none mb-8 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content || 'Konten belum tersedia.' }} />
                
// // // //                 {activeLesson.type === 'essay' && (
// // // //                     <div className="space-y-6">
// // // //                         {activeLesson.questions?.map((q:any,i:number)=>(
// // // //                             <div key={i} className="border p-4 rounded-lg bg-gray-50">
// // // //                                 <p className="font-bold mb-2 text-sm text-gray-700">{i+1}. {q.question}</p>
// // // //                                 <div className="bg-white">
// // // //                                     <ReactQuill theme="snow" value={essayAnswers[i]||''} onChange={(v)=>handleEssayChange(i,v)} placeholder="Tulis jawaban..."/>
// // // //                                 </div>
// // // //                             </div>
// // // //                         ))}
// // // //                         <button onClick={handleSubmitTask} disabled={isSubmitting} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold w-full hover:bg-indigo-700 transition-colors" title="Kirim Jawaban" aria-label="Kirim Jawaban">{isSubmitting?'Mengirim...':'Kirim Jawaban'}</button>
// // // //                     </div>
// // // //                 )}
// // // //                 {activeLesson.type === 'upload_doc' && (
// // // //                     <div className="border-2 border-dashed p-8 text-center rounded-xl bg-gray-50 border-indigo-200">
// // // //                         <UploadCloud className="mx-auto text-indigo-400 mb-2" size={32}/>
// // // //                         <p className="text-sm text-gray-500 mb-4">Upload tugas Anda di sini (PDF/DOCX/JPG)</p>
// // // //                         <input type="file" title="Pilih file tugas" aria-label="Pilih file tugas" onChange={(e)=>setUploadedFile(e.target.files?.[0]||null)} className="mb-4 text-sm block mx-auto text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
// // // //                         <button onClick={handleSubmitTask} disabled={!uploadedFile||isSubmitting} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold block mx-auto hover:bg-indigo-700 transition-colors" title="Upload Tugas" aria-label="Upload Tugas">{isSubmitting?'Mengupload...':'Upload Tugas'}</button>
// // // //                     </div>
// // // //                 )}
// // // //                 {activeLesson.type === 'poll' && (
// // // //                     <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
// // // //                         <h3 className="font-bold text-lg mb-4">{activeLesson.pollQuestion || "Polling"}</h3>
// // // //                         <div className="space-y-3 max-w-sm mx-auto">
// // // //                             {activeLesson.pollOptions?.map((opt:string, idx:number) => (
// // // //                                 <button key={idx} onClick={()=>setPollSelected(idx)} className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${pollSelected===idx ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-100 border-gray-300'}`} title={`Pilih ${opt}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>
// // // //                             ))}
// // // //                         </div>
// // // //                         <button onClick={handleSubmitTask} disabled={pollSelected===null||isSubmitting} className="mt-6 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition-colors" title="Kirim Polling" aria-label="Kirim Polling">Kirim Polling</button>
// // // //                     </div>
// // // //                 )}
// // // //             </div>
// // // //         );
// // // //     };
  
// // // //     if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // //     if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;
  
// // // //     if (!isEnrolled || enrollmentStatus === 'pending') {
// // // //         return (
// // // //           <div className="min-h-screen bg-gray-50 pb-20">
// // // //               {showRegisterModal && (<CourseRegistrationModal courseId={courseId} courseTitle={course.title} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil!"); router.push('/courses'); }} />)}
// // // //               <div className="bg-gray-900 text-white relative">
// // // //                   <div className="absolute inset-0 bg-black/60 z-0"></div>
// // // //                   {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" alt="" />}
// // // //                   <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
// // // //                       <div className="lg:col-span-2 space-y-6">
// // // //                           <div className="inline-block bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{course.programType === 'training' ? 'Diklat' : 'Kursus'}</div>
// // // //                           <h1 className="text-4xl font-extrabold leading-tight">{course.title}</h1>
// // // //                           <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
// // // //                               <div className="flex items-center gap-2"><Users size={18}/> {course.facilitatorIds?.length || 1} Fasilitator</div>
// // // //                               <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
// // // //                               <div className="flex items-center gap-2"><Clock size={18}/> Fleksibel</div>
// // // //                           </div>
// // // //                       </div>
// // // //                       <div className="lg:col-span-1 bg-white text-gray-900 p-6 rounded-2xl shadow-xl">
// // // //                           <div className="text-center mb-6"><p className="text-gray-500 text-sm">Biaya Pelatihan</p><p className="text-3xl font-extrabold text-green-600">{course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}</p></div>
// // // //                           <button onClick={() => setShowRegisterModal(true)} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2" title="Daftar Sekarang" aria-label="Daftar Sekarang">📝 Daftar Sekarang</button>
// // // //                       </div>
// // // //                   </div>
// // // //               </div>
// // // //           </div>
// // // //         );
// // // //     }
  
// // // //     const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;
  
// // // //     return (
// // // //       <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // // //         <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
// // // //           <div className="p-5 border-b bg-white">
// // // //               <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" title="Kembali ke Katalog" aria-label="Kembali ke Katalog"><span>←</span> KEMBALI KE KATALOG</Link>
// // // //               <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
// // // //               {/* [FIX] Progress Bar Dikembalikan */}
// // // //               <div className="space-y-2">
// // // //                   <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{safePercent}%</span></div>
// // // //                   <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: `${safePercent}%`}}></div></div>
// // // //               </div>
// // // //               <button onClick={() => setShowPersonalChat(true)} className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50" title="Hubungi Pengajar" aria-label="Hubungi Pengajar">
// // // //                   <MessageCircle size={16}/> Hubungi Pengajar
// // // //               </button>
// // // //           </div>
// // // //           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
// // // //               {course.modules?.map((mod:any, i:number)=>(
// // // //                   <div key={mod._id}>
// // // //                       <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
// // // //                       <div className="space-y-1">
// // // //                           {mod.lessons?.map((les:any) => (
// // // //                               <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`} title={les.title} aria-label={`Buka materi ${les.title}`}>
// // // //                                   {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
// // // //                                   {les.title}
// // // //                               </button>
// // // //                           ))}
// // // //                       </div>
// // // //                   </div>
// // // //               ))}
// // // //           </div>
// // // //         </aside>
  
// // // //         <main className="flex-1 flex flex-col relative h-full overflow-hidden bg-gray-50">
// // // //           <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
// // // //               <button type="button" onClick={()=>setIsSidebarOpen(!isSidebarOpen)} title="Buka Menu Sidebar" aria-label="Buka Menu Sidebar"><Menu/></button>
// // // //           </div>
// // // //           <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
// // // //               {renderContent()}
// // // //           </div>
          
// // // //           <div className="fixed bottom-8 right-8 flex gap-3 z-30">
// // // //               <button type="button" onClick={handlePrevLesson} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105" title="Materi Sebelumnya" aria-label="Materi Sebelumnya"><ChevronLeft/></button>
// // // //               <button type="button" onClick={handleManualComplete} className="h-12 px-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 font-bold hover:scale-105" title="Lanjut Materi" aria-label="Lanjut Materi"><span>Lanjut</span><ChevronRight/></button>
// // // //           </div>
// // // //         </main>
        
// // // //         {showPersonalChat && <ChatWithFacilitatorModal facilitators={courseFacilitators} onClose={() => setShowPersonalChat(false)} />}
  
// // // //         {user && (
// // // //           <CourseGroupChat 
// // // //               courseId={courseId} 
// // // //               currentUser={user} 
// // // //               participants={courseParticipants} 
// // // //               facilitators={courseFacilitators} 
// // // //               isFloating={true} 
// // // //           />
// // // //         )}
// // // //       </div>
// // // //     );
// // // // }
// // // 'use client';

// // // import { useState, useEffect, useRef, useMemo } from 'react';
// // // import { useParams, useRouter } from 'next/navigation';
// // // import Link from 'next/link';
// // // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // // import { useAuth } from '@/lib/AuthProvider';
// // // import QuizPlayer from '@/components/QuizPlayer';
// // // import CourseGroupChat from '@/components/CourseGroupChat'; 
// // // import { 
// // //     Users, Clock, MessageCircle, ChevronLeft, ChevronRight, Menu, Send, X,
// // //     FileText, PlayCircle, CheckCircle, UploadCloud, Calendar, Download, 
// // //     Image as ImageIcon, Video, School, MonitorPlay, BookOpen
// // // } from 'lucide-react';
// // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';
// // // import dynamic from 'next/dynamic';
// // // import 'react-quill/dist/quill.snow.css';

// // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // //     ssr: false, 
// // //     loading: () => <div className="h-24 bg-gray-50 animate-pulse rounded-lg border border-gray-200"></div> 
// // // });

// // // // --- HELPER FUNCTIONS ---
// // // const getFacilitatorName = (activeFacilitatorId: any, facilitatorsList: any[]) => {
// // //     if (!activeFacilitatorId) return '-';
// // //     if (typeof activeFacilitatorId === 'object' && activeFacilitatorId.name) return activeFacilitatorId.name;
// // //     const found = facilitatorsList.find(f => (f._id === activeFacilitatorId) || (f.id === activeFacilitatorId));
// // //     return found ? found.name : 'Fasilitator';
// // // };

// // // const formatDate = (dateString: string) => {
// // //     if (!dateString) return '';
// // //     return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // };

// // // // --- CHAT MODAL ---
// // // function ChatWithFacilitatorModal({ facilitators, onClose }: any) {
// // //     const { user } = useAuth();
// // //     const [selectedFacilitator, setSelectedFacilitator] = useState<any>(facilitators[0] || null);
// // //     const [messages, setMessages] = useState<any[]>([]);
// // //     const [message, setMessage] = useState('');
// // //     const [sending, setSending] = useState(false);
// // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // //     useEffect(() => {
// // //         if (selectedFacilitator?._id) {
// // //             loadHistory();
// // //             const interval = setInterval(loadHistory, 3000);
// // //             return () => clearInterval(interval);
// // //         }
// // //     }, [selectedFacilitator]);

// // //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// // //     const loadHistory = async () => {
// // //         try {
// // //             const res = await api(`/api/chat/${selectedFacilitator._id}?t=${Date.now()}`);
// // //             setMessages(res.messages || []);
// // //         } catch (e) { console.error(e); }
// // //     };

// // //     const handleSend = async (e: React.FormEvent) => {
// // //         e.preventDefault();
// // //         if (!message.trim() || !selectedFacilitator) return;
// // //         setSending(true);
// // //         try {
// // //             await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message } });
// // //             setMessage('');
// // //             loadHistory();
// // //         } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); }
// // //     };

// // //     return (
// // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
// // //             <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]" role="dialog" aria-modal="true" aria-label="Chat Personal">
// // //                 <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
// // //                     <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18} /> Hubungi Pengajar</h3>
// // //                     <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20} /></button>
// // //                 </div>
// // //                 {!selectedFacilitator ? (
// // //                     <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center text-gray-500">Tidak ada fasilitator.</div>
// // //                 ) : (
// // //                     <>
// // //                         {facilitators.length > 1 && (
// // //                             <div className="p-3 bg-gray-50 border-b flex gap-2 overflow-x-auto">
// // //                                 {facilitators.map((f:any) => (
// // //                                     <button type="button" key={f._id} onClick={()=>setSelectedFacilitator(f)} className={`px-3 py-1 text-xs rounded-full border ${selectedFacilitator._id===f._id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300'}`} title={`Pilih ${f.name}`}>{f.name}</button>
// // //                                 ))}
// // //                             </div>
// // //                         )}
// // //                         <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// // //                             {messages.map((msg: any, idx: number) => {
// // //                                 const isMe = msg.sender === 'me' || msg.sender?._id === user?.id;
// // //                                 return (
// // //                                     <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
// // //                                         <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
// // //                                             <p>{msg.message}</p>
// // //                                         </div>
// // //                                     </div>
// // //                                 );
// // //                             })}
// // //                             <div ref={messagesEndRef} />
// // //                         </div>
// // //                         <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
// // //                             <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus title="Input Pesan" aria-label="Ketik pesan" />
// // //                             <button type="submit" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button>
// // //                         </form>
// // //                     </>
// // //                 )}
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // // // --- MAIN PAGE COMPONENT ---
// // // export default function StudentCoursePlayPage() {
// // //     const router = useRouter();
// // //     const params = useParams();
// // //     const { user } = useAuth();
// // //     const { courseId } = params as { courseId: string };
  
// // //     const [course, setCourse] = useState<any>(null);
// // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // //     const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // //     const [progressPercent, setProgressPercent] = useState(0);
// // //     const [courseFacilitators, setCourseFacilitators] = useState<any[]>([]); 
// // //     const [courseParticipants, setCourseParticipants] = useState<any[]>([]); 
    
// // //     const [loading, setLoading] = useState(true);
// // //     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // //     const [isEnrolled, setIsEnrolled] = useState(false);
// // //     const [enrollmentStatus, setEnrollmentStatus] = useState<string>(''); 
// // //     const [showRegisterModal, setShowRegisterModal] = useState(false);
// // //     const [showPersonalChat, setShowPersonalChat] = useState(false); 
  
// // //     const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// // //     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// // //     const [pollSelected, setPollSelected] = useState<number | null>(null);
// // //     const [isSubmitting, setIsSubmitting] = useState(false);
  
// // //     useEffect(() => {
// // //         const initData = async () => {
// // //           try {
// // //             setLoading(true);
// // //             const resCourse = await api(`/api/courses/${courseId}`);
// // //             const courseData = resCourse.course || resCourse;
// // //             setCourse(courseData);
// // //             setCourseFacilitators(courseData.facilitatorIds || []); 
    
// // //             if (user) {
// // //                 try {
// // //                     const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// // //                     setIsEnrolled(enrollRes.isEnrolled);
                    
// // //                     if (enrollRes.isEnrolled) {
// // //                         setEnrollmentStatus(enrollRes.status || 'pending'); 
// // //                         if (enrollRes.status === 'active' || enrollRes.status === 'approved') {
// // //                             const resProgress = await api(`/api/progress/${courseId}`);
// // //                             setCompletedLessonIds(resProgress.completedLessons || []);
// // //                         }
// // //                     }
// // //                 } catch (e) { console.error("Enroll check failed", e); }
// // //             }
// // //             if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
// // //           } catch (e) { console.error("Init failed", e); } finally { setLoading(false); }
// // //         };
// // //         if (courseId) initData();
// // //     }, [courseId, user]);
    
// // //     useEffect(() => {
// // //         if (course && !loading) {
// // //             let total = 0; let completed = 0;
// // //             course.modules?.forEach((m: any) => { 
// // //                 if(m.isActive) {
// // //                     m.lessons?.forEach((l: any) => { 
// // //                         if(l.isActive) { 
// // //                             total++; 
// // //                             if (completedLessonIds.includes(l._id)) completed++; 
// // //                         } 
// // //                     });
// // //                 }
// // //             });
// // //             const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
// // //             setProgressPercent(percent);
// // //         }
// // //     }, [completedLessonIds, course, loading]);
    
// // //     useEffect(() => {
// // //           setUploadedFile(null);
// // //           setPollSelected(null);
// // //           setIsSubmitting(false);
// // //           if (activeLesson?.type === 'essay' && activeLesson.questions) {
// // //               setEssayAnswers(new Array(activeLesson.questions.length).fill(''));
// // //           } else {
// // //               setEssayAnswers([]);
// // //           }
// // //     }, [activeLesson]);

// // //     const handleEssayChange = (index: number, value: string) => {
// // //         const newAnswers = [...essayAnswers];
// // //         newAnswers[index] = value;
// // //         setEssayAnswers(newAnswers);
// // //     };

// // //     const markLessonAsComplete = async (lessonId: string, extraData: any = {}) => {
// // //         try { 
// // //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId, ...extraData } }); 
// // //             if (!completedLessonIds.includes(lessonId)) {
// // //                 setCompletedLessonIds(prev => [...prev, lessonId]); 
// // //             }
// // //         } catch(e) { console.error("Save progress failed", e); throw e; }
// // //     };
    
// // //     const handleNextLesson = () => {
// // //         const allLessons: any[] = [];
// // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // //         if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // //         else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // //     };
    
// // //     const handlePrevLesson = () => {
// // //         const allLessons: any[] = [];
// // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // //         if (currIdx > 0) { setActiveLesson(allLessons[currIdx - 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }
// // //     };

// // //     const handleManualComplete = async () => { 
// // //         await markLessonAsComplete(activeLesson._id); 
// // //         handleNextLesson(); 
// // //     };
    
// // //     const handleQuizCompleted = async () => { 
// // //         if (!completedLessonIds.includes(activeLesson._id)) {
// // //             setCompletedLessonIds(prev => [...prev, activeLesson._id]); 
// // //         }
// // //     };
    
// // //     const handleSubmitTask = async () => {
// // //         setIsSubmitting(true);
// // //         try {
// // //             // 1. ESAI
// // //             if (activeLesson.type === 'essay') {
// // //                 if (essayAnswers.some(ans => ans.trim() === '')) throw new Error("Mohon jawab semua pertanyaan.");
// // //                 await api(`/api/progress/${courseId}/submit-essay`, { 
// // //                     method: 'POST', 
// // //                     body: { lessonId: activeLesson._id, answers: essayAnswers } 
// // //                 });
                
// // //             // 2. UPLOAD DOKUMEN / GAMBAR
// // //             } else if (activeLesson.type === 'upload_doc' || activeLesson.type === 'image') {
// // //                 if (!uploadedFile) throw new Error("Pilih file terlebih dahulu.");
                
// // //                 const fd = new FormData();
// // //                 fd.append('file', uploadedFile);
// // //                 const uploadRes = await apiUpload('/api/upload', fd);
// // //                 const fileUrl = uploadRes.url || uploadRes.file?.url || uploadRes.imageUrl;
                
// // //                 await api(`/api/progress/${courseId}/submit-task`, { 
// // //                     method: 'POST', 
// // //                     body: { lessonId: activeLesson._id, fileUrl, fileName: uploadedFile.name } 
// // //                 });

// // //             // 3. POLLING
// // //             } else if (activeLesson.type === 'poll') {
// // //                 if (pollSelected === null) throw new Error("Pilih salah satu opsi.");
// // //                 const answerText = activeLesson.pollOptions[pollSelected];
// // //                 await markLessonAsComplete(activeLesson._id, { pollAnswer: answerText });
            
// // //             } else {
// // //                 await markLessonAsComplete(activeLesson._id);
// // //             }

// // //             if (!completedLessonIds.includes(activeLesson._id)) {
// // //                 setCompletedLessonIds(prev => [...prev, activeLesson._id]);
// // //             }
// // //             alert("Berhasil dikirim!");
// // //             handleNextLesson();
// // //         } catch (e: any) { alert("Gagal mengirim: " + e.message); } finally { setIsSubmitting(false); }
// // //     };

// // //     const renderContentHeader = (title: string) => (
// // //         <div className="mb-6 border-b border-gray-100 pb-4">
// // //             <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// // //                 <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 flex items-center gap-1">
// // //                     {activeLesson?.type === 'video_url' && <PlayCircle size={12}/>}
// // //                     {activeLesson?.type === 'pdf' && <FileText size={12}/>}
// // //                     {activeLesson?.type === 'quiz' && <CheckCircle size={12}/>}
// // //                     {activeLesson?.type === 'image' && <ImageIcon size={12}/>}
// // //                     {activeLesson?.type === 'slide' && <FileText size={12}/>}
// // //                     {activeLesson?.type === 'virtual_class' && <MonitorPlay size={12}/>}
// // //                     {activeLesson?.type?.replace(/_/g, ' ') || 'MATERI'}
// // //                 </span>
// // //             </div>
// // //             <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
// // //                 <h1 className="text-gray-900 font-bold text-2xl flex-1 leading-tight">{title}</h1>
// // //                 <div className="flex-shrink-0 flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
// // //                     {activeLesson.quizDuration > 0 && (
// // //                         <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded border border-yellow-200">
// // //                             <Clock size={12} /> <span className="font-bold">{activeLesson.quizDuration} Menit</span>
// // //                         </div>
// // //                     )}
// // //                     <div className="flex items-center gap-1"><Users size={12} className="text-indigo-500"/> <span>{getFacilitatorName(activeLesson.facilitatorId, courseFacilitators)}</span></div>
// // //                     {activeLesson.jp > 0 && <div className="flex items-center gap-1 border-l pl-3"><Clock size={12} className="text-indigo-500"/> <span>{activeLesson.jp} JP</span></div>}
// // //                     {(activeLesson.scheduleDate) && <div className="flex items-center gap-1 border-l pl-3"><Calendar size={12} className="text-indigo-500"/> <span>{formatDate(activeLesson.scheduleDate)}</span></div>}
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );

// // //     const renderContent = () => {
// // //         if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping.</div>;
// // //         if (activeLesson.type === 'quiz') return <QuizPlayer quizId={activeLesson._id} courseId={courseId} onComplete={handleQuizCompleted} />;
        
// // //         if (activeLesson.type === 'image') {
// // //             return (
// // //                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // //                     {renderContentHeader(activeLesson.title)}
// // //                     <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
// // //                         <img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="w-full h-auto object-contain" />
// // //                     </div>
// // //                     {activeLesson.content && <div className="prose max-w-none mt-6 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />}
// // //                 </div>
// // //             );
// // //         }

// // //         if (activeLesson.type === 'slide' || activeLesson.type === 'download_doc') {
// // //             return (
// // //                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // //                     {renderContentHeader(activeLesson.title)}
// // //                     <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center mb-6">
// // //                         <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4"><FileText size={32} /></div>
// // //                         <h3 className="text-lg font-bold text-gray-800 mb-2">{activeLesson.title}</h3>
// // //                         <p className="text-sm text-gray-500 mb-6">Dokumen Materi Pembelajaran.</p>
// // //                         <a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-transform active:scale-95" aria-label="Download File">
// // //                             <Download size={18} /> Download Materi
// // //                         </a>
// // //                     </div>
// // //                     {activeLesson.fileUrl && activeLesson.fileUrl.endsWith('.pdf') && (
// // //                         <div className="mt-8 border rounded-xl overflow-hidden h-[800px] shadow-sm">
// // //                              <iframe src={getImageUrl(activeLesson.fileUrl)} className="w-full h-full" title="Preview"></iframe>
// // //                         </div>
// // //                     )}
// // //                 </div>
// // //             );
// // //         }

// // //         if (activeLesson.type === 'video_url') {
// // //             const embedUrl = activeLesson.videoUrl?.includes('youtu') ? `https://www.youtube.com/embed/${activeLesson.videoUrl.split('/').pop().replace('watch?v=', '')}` : activeLesson.videoUrl;
// // //             return (
// // //                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
// // //                     {renderContentHeader(activeLesson.title)}
// // //                     <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg"><iframe src={embedUrl} className="w-full h-full" allowFullScreen title={`Video ${activeLesson.title}`} /></div>
// // //                 </div>
// // //             );
// // //         }

// // //         if (activeLesson.type === 'virtual_class') {
// // //             return (
// // //                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // //                     {renderContentHeader(activeLesson.title)}
// // //                     <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
// // //                         <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"><Video size={40}/></div>
// // //                         <h3 className="text-xl font-bold text-gray-900 mb-2">Kelas Virtual (Zoom/Meet)</h3>
// // //                         <p className="text-gray-600 mb-6">Silakan bergabung ke pertemuan virtual melalui tombol di bawah ini.</p>
// // //                         <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg">
// // //                             <Video size={20}/> Gabung Meeting
// // //                         </a>
// // //                     </div>
// // //                 </div>
// // //             );
// // //         }
        
// // //         if (activeLesson.type === 'google_classroom') {
// // //              return (
// // //                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // //                     {renderContentHeader(activeLesson.title)}
// // //                     <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
// // //                         <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border"><School size={40} className="text-green-600"/></div>
// // //                         <h3 className="text-xl font-bold text-gray-900 mb-2">Google Classroom</h3>
// // //                         <p className="text-gray-600 mb-2">Materi ini terhubung dengan Google Classroom.</p>
// // //                         {activeLesson.classroomData ? (
// // //                             <div className="mt-4">
// // //                                 <p className="font-bold text-lg">{activeLesson.classroomData.name}</p>
// // //                                 <p className="text-sm text-gray-500 mb-6">Kode Kelas: <span className="font-mono bg-white px-2 py-1 border rounded">{activeLesson.classroomData.enrollmentCode || '-'}</span></p>
// // //                                 <a href={activeLesson.classroomData.alternateLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 shadow-lg">Buka Google Classroom ↗</a>
// // //                             </div>
// // //                         ) : <p className="text-red-500 italic">Data kelas tidak ditemukan.</p>}
// // //                     </div>
// // //                 </div>
// // //              );
// // //         }

// // //         return (
// // //             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // //                 {renderContentHeader(activeLesson.title)}
// // //                 <div className="prose max-w-none mb-8 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content || 'Konten belum tersedia.' }} />
                
// // //                 {activeLesson.type === 'essay' && (
// // //                     <div className="space-y-6">
// // //                         {activeLesson.questions?.map((q:any,i:number)=>(
// // //                             <div key={i} className="border p-4 rounded-lg bg-gray-50">
// // //                                 <p className="font-bold mb-2 text-sm text-gray-700">{i+1}. {q.question}</p>
// // //                                 <div className="bg-white">
// // //                                     <ReactQuill theme="snow" value={essayAnswers[i]||''} onChange={(v)=>handleEssayChange(i,v)} placeholder="Tulis jawaban..."/>
// // //                                 </div>
// // //                             </div>
// // //                         ))}
// // //                         <button onClick={handleSubmitTask} disabled={isSubmitting} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold w-full hover:bg-indigo-700 transition-colors" title="Kirim Jawaban" aria-label="Kirim Jawaban">{isSubmitting?'Mengirim...':'Kirim Jawaban'}</button>
// // //                     </div>
// // //                 )}
// // //                 {/* [FIX] Handle 'upload_doc' dan 'image' sebagai tugas yang perlu upload */}
// // //                 {(activeLesson.type === 'upload_doc' || activeLesson.type === 'image') && (
// // //                     <div className="border-2 border-dashed p-8 text-center rounded-xl bg-gray-50 border-indigo-200">
// // //                         <UploadCloud className="mx-auto text-indigo-400 mb-2" size={32}/>
// // //                         <p className="text-sm text-gray-500 mb-4">Upload tugas Anda di sini (PDF/DOCX/JPG)</p>
// // //                         <input type="file" title="Pilih file tugas" aria-label="Pilih file tugas" onChange={(e)=>setUploadedFile(e.target.files?.[0]||null)} className="mb-4 text-sm block mx-auto text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
// // //                         <button onClick={handleSubmitTask} disabled={!uploadedFile||isSubmitting} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold block mx-auto hover:bg-indigo-700 transition-colors" title="Upload Tugas" aria-label="Upload Tugas">{isSubmitting?'Mengupload...':'Upload Tugas'}</button>
// // //                     </div>
// // //                 )}
// // //                 {activeLesson.type === 'poll' && (
// // //                     <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
// // //                         <h3 className="font-bold text-lg mb-4">{activeLesson.pollQuestion || "Polling"}</h3>
// // //                         <div className="space-y-3 max-w-sm mx-auto">
// // //                             {activeLesson.pollOptions?.map((opt:string, idx:number) => (
// // //                                 <button key={idx} onClick={()=>setPollSelected(idx)} className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${pollSelected===idx ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-100 border-gray-300'}`} title={`Pilih ${opt}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>
// // //                             ))}
// // //                         </div>
// // //                         <button onClick={handleSubmitTask} disabled={pollSelected===null||isSubmitting} className="mt-6 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition-colors" title="Kirim Polling" aria-label="Kirim Polling">Kirim Polling</button>
// // //                     </div>
// // //                 )}
// // //             </div>
// // //         );
// // //     };
  
// // //     if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // //     if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;
  
// // //     if (!isEnrolled || enrollmentStatus === 'pending') {
// // //         return (
// // //           <div className="min-h-screen bg-gray-50 pb-20">
// // //               {showRegisterModal && (<CourseRegistrationModal courseId={courseId} courseTitle={course.title} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil!"); router.push('/courses'); }} />)}
// // //               <div className="bg-gray-900 text-white relative">
// // //                   <div className="absolute inset-0 bg-black/60 z-0"></div>
// // //                   {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" alt="" />}
// // //                   <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
// // //                       <div className="lg:col-span-2 space-y-6">
// // //                           <div className="inline-block bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{course.programType === 'training' ? 'Diklat' : 'Kursus'}</div>
// // //                           <h1 className="text-4xl font-extrabold leading-tight">{course.title}</h1>
// // //                           <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
// // //                               <div className="flex items-center gap-2"><Users size={18}/> {course.facilitatorIds?.length || 1} Fasilitator</div>
// // //                               <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
// // //                               <div className="flex items-center gap-2"><Clock size={18}/> Fleksibel</div>
// // //                           </div>
// // //                       </div>
// // //                       <div className="lg:col-span-1 bg-white text-gray-900 p-6 rounded-2xl shadow-xl">
// // //                           <div className="text-center mb-6"><p className="text-gray-500 text-sm">Biaya Pelatihan</p><p className="text-3xl font-extrabold text-green-600">{course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}</p></div>
// // //                           <button onClick={() => setShowRegisterModal(true)} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2" title="Daftar Sekarang" aria-label="Daftar Sekarang">📝 Daftar Sekarang</button>
// // //                       </div>
// // //                   </div>
// // //               </div>
// // //           </div>
// // //         );
// // //     }
  
// // //     const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;
  
// // //     return (
// // //       <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // //         <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
// // //           <div className="p-5 border-b bg-white">
// // //               <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" title="Kembali ke Katalog" aria-label="Kembali ke Katalog"><span>←</span> KEMBALI KE KATALOG</Link>
// // //               <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
// // //               <div className="space-y-2">
// // //                   <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{safePercent}%</span></div>
// // //                   <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: `${safePercent}%`}}></div></div>
// // //               </div>
// // //               <button onClick={() => setShowPersonalChat(true)} className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50" title="Hubungi Pengajar" aria-label="Hubungi Pengajar">
// // //                   <MessageCircle size={16}/> Hubungi Pengajar
// // //               </button>
// // //           </div>
// // //           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
// // //               {course.modules?.map((mod:any, i:number)=>(
// // //                   <div key={mod._id}>
// // //                       <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
// // //                       <div className="space-y-1">
// // //                           {mod.lessons?.map((les:any) => (
// // //                               <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`} title={les.title} aria-label={`Buka materi ${les.title}`}>
// // //                                   {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
// // //                                   {les.title}
// // //                               </button>
// // //                           ))}
// // //                       </div>
// // //                   </div>
// // //               ))}
// // //           </div>
// // //         </aside>
  
// // //         <main className="flex-1 flex flex-col relative h-full overflow-hidden bg-gray-50">
// // //           <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
// // //               <button type="button" onClick={()=>setIsSidebarOpen(!isSidebarOpen)} title="Buka Menu Sidebar" aria-label="Buka Menu Sidebar"><Menu/></button>
// // //           </div>
// // //           <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
// // //               {renderContent()}
// // //           </div>
          
// // //           <div className="fixed bottom-8 right-8 flex gap-3 z-30">
// // //               <button type="button" onClick={handlePrevLesson} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105" title="Materi Sebelumnya" aria-label="Materi Sebelumnya"><ChevronLeft/></button>
// // //               <button type="button" onClick={handleManualComplete} className="h-12 px-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 font-bold hover:scale-105" title="Lanjut Materi" aria-label="Lanjut Materi"><span>Lanjut</span><ChevronRight/></button>
// // //           </div>
// // //         </main>
        
// // //         {showPersonalChat && <ChatWithFacilitatorModal facilitators={courseFacilitators} onClose={() => setShowPersonalChat(false)} />}
  
// // //         {user && (
// // //           <CourseGroupChat 
// // //               courseId={courseId} 
// // //               currentUser={user} 
// // //               participants={courseParticipants} 
// // //               facilitators={courseFacilitators} 
// // //               isFloating={true} 
// // //           />
// // //         )}
// // //       </div>
// // //     );
// // // }
// // 'use client';

// // import { useState, useEffect, useRef, useMemo } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import Link from 'next/link';
// // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // import { useAuth } from '@/lib/AuthProvider';
// // import QuizPlayer from '@/components/QuizPlayer';
// // import CourseGroupChat from '@/components/CourseGroupChat'; 
// // import { 
// //     Users, Clock, MessageCircle, ChevronLeft, ChevronRight, Menu, Send, X,
// //     FileText, PlayCircle, CheckCircle, UploadCloud, Calendar, Download, 
// //     Image as ImageIcon, Video, School, MonitorPlay, BookOpen
// // } from 'lucide-react';
// // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';
// // import dynamic from 'next/dynamic';
// // import 'react-quill/dist/quill.snow.css';

// // const ReactQuill = dynamic(() => import('react-quill'), { 
// //     ssr: false, 
// //     loading: () => <div className="h-24 bg-gray-50 animate-pulse rounded-lg border border-gray-200"></div> 
// // });

// // // --- HELPER FUNCTIONS ---
// // const getFacilitatorName = (activeFacilitatorId: any, facilitatorsList: any[]) => {
// //     if (!activeFacilitatorId) return '-';
// //     if (typeof activeFacilitatorId === 'object' && activeFacilitatorId.name) return activeFacilitatorId.name;
// //     const found = facilitatorsList.find(f => (f._id === activeFacilitatorId) || (f.id === activeFacilitatorId));
// //     return found ? found.name : 'Fasilitator';
// // };

// // const formatDate = (dateString: string) => {
// //     if (!dateString) return '';
// //     return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // };

// // // --- CHAT MODAL ---
// // function ChatWithFacilitatorModal({ facilitators, onClose }: any) {
// //     const { user } = useAuth();
// //     const [selectedFacilitator, setSelectedFacilitator] = useState<any>(facilitators[0] || null);
// //     const [messages, setMessages] = useState<any[]>([]);
// //     const [message, setMessage] = useState('');
// //     const [sending, setSending] = useState(false);
// //     const messagesEndRef = useRef<HTMLDivElement>(null);

// //     useEffect(() => {
// //         if (selectedFacilitator?._id) {
// //             loadHistory();
// //             const interval = setInterval(loadHistory, 3000);
// //             return () => clearInterval(interval);
// //         }
// //     }, [selectedFacilitator]);

// //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// //     const loadHistory = async () => {
// //         try {
// //             const res = await api(`/api/chat/${selectedFacilitator._id}?t=${Date.now()}`);
// //             setMessages(res.messages || []);
// //         } catch (e) { console.error(e); }
// //     };

// //     const handleSend = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!message.trim() || !selectedFacilitator) return;
// //         setSending(true);
// //         try {
// //             await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message } });
// //             setMessage('');
// //             loadHistory();
// //         } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); }
// //     };

// //     return (
// //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
// //             <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]" role="dialog" aria-modal="true" aria-label="Chat Personal">
// //                 <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
// //                     <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18} /> Hubungi Pengajar</h3>
// //                     <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20} /></button>
// //                 </div>
// //                 {!selectedFacilitator ? (
// //                     <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center text-gray-500">Tidak ada fasilitator.</div>
// //                 ) : (
// //                     <>
// //                         {facilitators.length > 1 && (
// //                             <div className="p-3 bg-gray-50 border-b flex gap-2 overflow-x-auto">
// //                                 {facilitators.map((f:any) => (
// //                                     <button type="button" key={f._id} onClick={()=>setSelectedFacilitator(f)} className={`px-3 py-1 text-xs rounded-full border ${selectedFacilitator._id===f._id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300'}`} title={`Pilih ${f.name}`}>{f.name}</button>
// //                                 ))}
// //                             </div>
// //                         )}
// //                         <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// //                             {messages.map((msg: any, idx: number) => {
// //                                 const isMe = msg.sender === 'me' || msg.sender?._id === user?.id;
// //                                 return (
// //                                     <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
// //                                         <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
// //                                             <p>{msg.message}</p>
// //                                         </div>
// //                                     </div>
// //                                 );
// //                             })}
// //                             <div ref={messagesEndRef} />
// //                         </div>
// //                         <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
// //                             <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus title="Input Pesan" aria-label="Ketik pesan" />
// //                             <button type="submit" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button>
// //                         </form>
// //                     </>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }

// // // --- MAIN PAGE COMPONENT ---
// // export default function StudentCoursePlayPage() {
// //     const router = useRouter();
// //     const params = useParams();
// //     const { user } = useAuth();
// //     const { courseId } = params as { courseId: string };
  
// //     const [course, setCourse] = useState<any>(null);
// //     const [activeLesson, setActiveLesson] = useState<any>(null);
// //     const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// //     const [progressPercent, setProgressPercent] = useState(0);
// //     const [courseFacilitators, setCourseFacilitators] = useState<any[]>([]); 
// //     const [courseParticipants, setCourseParticipants] = useState<any[]>([]); 
    
// //     const [loading, setLoading] = useState(true);
// //     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// //     const [isEnrolled, setIsEnrolled] = useState(false);
// //     const [enrollmentStatus, setEnrollmentStatus] = useState<string>(''); 
// //     const [showRegisterModal, setShowRegisterModal] = useState(false);
// //     const [showPersonalChat, setShowPersonalChat] = useState(false); 
  
// //     const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// //     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// //     const [pollSelected, setPollSelected] = useState<number | null>(null);
// //     const [isSubmitting, setIsSubmitting] = useState(false);
  
// //     useEffect(() => {
// //         const initData = async () => {
// //           try {
// //             setLoading(true);
// //             const resCourse = await api(`/api/courses/${courseId}`);
// //             const courseData = resCourse.course || resCourse;
// //             setCourse(courseData);
// //             setCourseFacilitators(courseData.facilitatorIds || []); 
    
// //             if (user) {
// //                 try {
// //                     const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// //                     setIsEnrolled(enrollRes.isEnrolled);
                    
// //                     if (enrollRes.isEnrolled) {
// //                         setEnrollmentStatus(enrollRes.status || 'pending'); 
// //                         if (enrollRes.status === 'active' || enrollRes.status === 'approved') {
// //                             const resProgress = await api(`/api/progress/${courseId}`);
// //                             setCompletedLessonIds(resProgress.completedLessons || []);
// //                         }
// //                     }
// //                 } catch (e) { console.error("Enroll check failed", e); }
// //             }
// //             if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
// //           } catch (e) { console.error("Init failed", e); } finally { setLoading(false); }
// //         };
// //         if (courseId) initData();
// //     }, [courseId, user]);
    
// //     useEffect(() => {
// //         if (course && !loading) {
// //             let total = 0; let completed = 0;
// //             course.modules?.forEach((m: any) => { 
// //                 if(m.isActive) {
// //                     m.lessons?.forEach((l: any) => { 
// //                         if(l.isActive) { 
// //                             total++; 
// //                             if (completedLessonIds.includes(l._id)) completed++; 
// //                         } 
// //                     });
// //                 }
// //             });
// //             const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
// //             setProgressPercent(percent);
// //         }
// //     }, [completedLessonIds, course, loading]);
    
// //     useEffect(() => {
// //           setUploadedFile(null);
// //           setPollSelected(null);
// //           setIsSubmitting(false);
// //           if (activeLesson?.type === 'essay' && activeLesson.questions) {
// //               setEssayAnswers(new Array(activeLesson.questions.length).fill(''));
// //           } else {
// //               setEssayAnswers([]);
// //           }
// //     }, [activeLesson]);

// //     const handleEssayChange = (index: number, value: string) => {
// //         const newAnswers = [...essayAnswers];
// //         newAnswers[index] = value;
// //         setEssayAnswers(newAnswers);
// //     };

// //     const markLessonAsComplete = async (lessonId: string, extraData: any = {}) => {
// //         try { 
// //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId, ...extraData } }); 
// //             if (!completedLessonIds.includes(lessonId)) {
// //                 setCompletedLessonIds(prev => [...prev, lessonId]); 
// //             }
// //         } catch(e) { console.error("Save progress failed", e); throw e; }
// //     };
    
// //     const handleNextLesson = () => {
// //         const allLessons: any[] = [];
// //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// //         if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// //         else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// //     };
    
// //     const handlePrevLesson = () => {
// //         const allLessons: any[] = [];
// //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// //         if (currIdx > 0) { setActiveLesson(allLessons[currIdx - 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }
// //     };

// //     const handleManualComplete = async () => { 
// //         await markLessonAsComplete(activeLesson._id); 
// //         handleNextLesson(); 
// //     };
    
// //     // [FIX] HANDLER KUIS SELESAI
// //     // Menerima parameter score dari QuizPlayer
// //     const handleQuizCompleted = async (result: any) => { 
// //         try {
// //             // result bisa berupa { score: 80, attempts: 1 } atau hanya angka score
// //             const scoreVal = typeof result === 'object' ? result.score : result;
            
// //             // Panggil API markComplete dengan data score agar tersimpan di lessonDetails
// //             await markLessonAsComplete(activeLesson._id, { 
// //                 score: scoreVal, 
// //                 attempts: result.attempts || 1 
// //             });

// //             if (!completedLessonIds.includes(activeLesson._id)) {
// //                 setCompletedLessonIds(prev => [...prev, activeLesson._id]); 
// //             }
// //         } catch (e) {
// //             console.error("Gagal simpan skor kuis", e);
// //         }
// //     };
    
// //     const handleSubmitTask = async () => {
// //         setIsSubmitting(true);
// //         try {
// //             // 1. ESAI
// //             if (activeLesson.type === 'essay') {
// //                 if (essayAnswers.some(ans => ans.trim() === '')) throw new Error("Mohon jawab semua pertanyaan.");
// //                 await api(`/api/progress/${courseId}/submit-essay`, { 
// //                     method: 'POST', 
// //                     body: { lessonId: activeLesson._id, answers: essayAnswers } 
// //                 });
                
// //             // 2. UPLOAD DOKUMEN / GAMBAR
// //             } else if (activeLesson.type === 'upload_doc' || activeLesson.type === 'image') {
// //                 if (!uploadedFile) throw new Error("Pilih file terlebih dahulu.");
                
// //                 const fd = new FormData();
// //                 fd.append('file', uploadedFile);
// //                 const uploadRes = await apiUpload('/api/upload', fd);
// //                 const fileUrl = uploadRes.url || uploadRes.file?.url || uploadRes.imageUrl;
                
// //                 await api(`/api/progress/${courseId}/submit-task`, { 
// //                     method: 'POST', 
// //                     body: { lessonId: activeLesson._id, fileUrl, fileName: uploadedFile.name } 
// //                 });

// //             // 3. POLLING
// //             } else if (activeLesson.type === 'poll') {
// //                 if (pollSelected === null) throw new Error("Pilih salah satu opsi.");
// //                 const answerText = activeLesson.pollOptions[pollSelected];
// //                 await markLessonAsComplete(activeLesson._id, { pollAnswer: answerText });
            
// //             } else {
// //                 await markLessonAsComplete(activeLesson._id);
// //             }

// //             if (!completedLessonIds.includes(activeLesson._id)) {
// //                 setCompletedLessonIds(prev => [...prev, activeLesson._id]);
// //             }
// //             alert("Berhasil dikirim!");
// //             handleNextLesson();
// //         } catch (e: any) { alert("Gagal mengirim: " + e.message); } finally { setIsSubmitting(false); }
// //     };

// //     const renderContentHeader = (title: string) => (
// //         <div className="mb-6 border-b border-gray-100 pb-4">
// //             <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// //                 <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 flex items-center gap-1">
// //                     {activeLesson?.type === 'video_url' && <PlayCircle size={12}/>}
// //                     {activeLesson?.type === 'pdf' && <FileText size={12}/>}
// //                     {activeLesson?.type === 'quiz' && <CheckCircle size={12}/>}
// //                     {activeLesson?.type === 'image' && <ImageIcon size={12}/>}
// //                     {activeLesson?.type === 'slide' && <FileText size={12}/>}
// //                     {activeLesson?.type === 'virtual_class' && <MonitorPlay size={12}/>}
// //                     {activeLesson?.type?.replace(/_/g, ' ') || 'MATERI'}
// //                 </span>
// //             </div>
// //             <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
// //                 <h1 className="text-gray-900 font-bold text-2xl flex-1 leading-tight">{title}</h1>
// //                 <div className="flex-shrink-0 flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
// //                     {activeLesson.quizDuration > 0 && (
// //                         <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded border border-yellow-200">
// //                             <Clock size={12} /> <span className="font-bold">{activeLesson.quizDuration} Menit</span>
// //                         </div>
// //                     )}
// //                     <div className="flex items-center gap-1"><Users size={12} className="text-indigo-500"/> <span>{getFacilitatorName(activeLesson.facilitatorId, courseFacilitators)}</span></div>
// //                     {activeLesson.jp > 0 && <div className="flex items-center gap-1 border-l pl-3"><Clock size={12} className="text-indigo-500"/> <span>{activeLesson.jp} JP</span></div>}
// //                     {(activeLesson.scheduleDate) && <div className="flex items-center gap-1 border-l pl-3"><Calendar size={12} className="text-indigo-500"/> <span>{formatDate(activeLesson.scheduleDate)}</span></div>}
// //                 </div>
// //             </div>
// //         </div>
// //     );

// //     const renderContent = () => {
// //         if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping.</div>;
        
// //         // [FIX] QUIZ PLAYER INTEGRATION
// //         // Pastikan QuizPlayer menerima prop onComplete yang mengirimkan score
// //         if (activeLesson.type === 'quiz') return <QuizPlayer quizId={activeLesson._id} courseId={courseId} onComplete={handleQuizCompleted} />;
        
// //         if (activeLesson.type === 'image') {
// //             return (
// //                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// //                     {renderContentHeader(activeLesson.title)}
// //                     <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
// //                         <img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="w-full h-auto object-contain" />
// //                     </div>
// //                     {activeLesson.content && <div className="prose max-w-none mt-6 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />}
// //                 </div>
// //             );
// //         }

// //         if (activeLesson.type === 'slide' || activeLesson.type === 'download_doc') {
// //             return (
// //                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// //                     {renderContentHeader(activeLesson.title)}
// //                     <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center mb-6">
// //                         <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4"><FileText size={32} /></div>
// //                         <h3 className="text-lg font-bold text-gray-800 mb-2">{activeLesson.title}</h3>
// //                         <p className="text-sm text-gray-500 mb-6">Dokumen Materi Pembelajaran.</p>
// //                         <a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-transform active:scale-95" aria-label="Download File">
// //                             <Download size={18} /> Download Materi
// //                         </a>
// //                     </div>
// //                     {activeLesson.fileUrl && activeLesson.fileUrl.endsWith('.pdf') && (
// //                         <div className="mt-8 border rounded-xl overflow-hidden h-[800px] shadow-sm">
// //                              <iframe src={getImageUrl(activeLesson.fileUrl)} className="w-full h-full" title="Preview"></iframe>
// //                         </div>
// //                     )}
// //                 </div>
// //             );
// //         }

// //         if (activeLesson.type === 'video_url') {
// //             const embedUrl = activeLesson.videoUrl?.includes('youtu') ? `https://www.youtube.com/embed/${activeLesson.videoUrl.split('/').pop().replace('watch?v=', '')}` : activeLesson.videoUrl;
// //             return (
// //                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
// //                     {renderContentHeader(activeLesson.title)}
// //                     <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg"><iframe src={embedUrl} className="w-full h-full" allowFullScreen title={`Video ${activeLesson.title}`} /></div>
// //                 </div>
// //             );
// //         }

// //         // [FIX] TOMBOL VIRTUAL MEETING
// //         // Menggunakan meetingLink dari database (activeLesson.meetingLink) atau fallback ke content
// //         if (activeLesson.type === 'virtual_class') {
// //             const meetingUrl = activeLesson.meetingLink || activeLesson.content || '#';
// //             return (
// //                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// //                     {renderContentHeader(activeLesson.title)}
// //                     <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
// //                         <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"><Video size={40}/></div>
// //                         <h3 className="text-xl font-bold text-gray-900 mb-2">Kelas Virtual (Zoom/Meet)</h3>
// //                         <p className="text-gray-600 mb-6">Silakan bergabung ke pertemuan virtual melalui tombol di bawah ini.</p>
                        
// //                         {meetingUrl !== '#' ? (
// //                             <a href={meetingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg">
// //                                 <Video size={20}/> Gabung Meeting
// //                             </a>
// //                         ) : (
// //                             <button disabled className="inline-flex items-center gap-2 bg-gray-400 text-white px-8 py-3 rounded-full font-bold cursor-not-allowed">
// //                                 <Video size={20}/> Link Belum Tersedia
// //                             </button>
// //                         )}
// //                     </div>
// //                 </div>
// //             );
// //         }
        
// //         if (activeLesson.type === 'google_classroom') {
// //              return (
// //                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// //                     {renderContentHeader(activeLesson.title)}
// //                     <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
// //                         <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border"><School size={40} className="text-green-600"/></div>
// //                         <h3 className="text-xl font-bold text-gray-900 mb-2">Google Classroom</h3>
// //                         <p className="text-gray-600 mb-2">Materi ini terhubung dengan Google Classroom.</p>
// //                         {activeLesson.classroomData ? (
// //                             <div className="mt-4">
// //                                 <p className="font-bold text-lg">{activeLesson.classroomData.name}</p>
// //                                 <p className="text-sm text-gray-500 mb-6">Kode Kelas: <span className="font-mono bg-white px-2 py-1 border rounded">{activeLesson.classroomData.enrollmentCode || '-'}</span></p>
// //                                 <a href={activeLesson.classroomData.alternateLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 shadow-lg">Buka Google Classroom ↗</a>
// //                             </div>
// //                         ) : <p className="text-red-500 italic">Data kelas tidak ditemukan.</p>}
// //                     </div>
// //                 </div>
// //              );
// //         }

// //         return (
// //             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// //                 {renderContentHeader(activeLesson.title)}
// //                 <div className="prose max-w-none mb-8 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content || 'Konten belum tersedia.' }} />
                
// //                 {activeLesson.type === 'essay' && (
// //                     <div className="space-y-6">
// //                         {activeLesson.questions?.map((q:any,i:number)=>(
// //                             <div key={i} className="border p-4 rounded-lg bg-gray-50">
// //                                 <p className="font-bold mb-2 text-sm text-gray-700">{i+1}. {q.question}</p>
// //                                 <div className="bg-white">
// //                                     <ReactQuill theme="snow" value={essayAnswers[i]||''} onChange={(v)=>handleEssayChange(i,v)} placeholder="Tulis jawaban..."/>
// //                                 </div>
// //                             </div>
// //                         ))}
// //                         <button onClick={handleSubmitTask} disabled={isSubmitting} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold w-full hover:bg-indigo-700 transition-colors" title="Kirim Jawaban" aria-label="Kirim Jawaban">{isSubmitting?'Mengirim...':'Kirim Jawaban'}</button>
// //                     </div>
// //                 )}
// //                 {/* [FIX] UPLOAD TASK (DOC / IMAGE) */}
// //                 {(activeLesson.type === 'upload_doc' || activeLesson.type === 'image') && (
// //                     <div className="border-2 border-dashed p-8 text-center rounded-xl bg-gray-50 border-indigo-200">
// //                         <UploadCloud className="mx-auto text-indigo-400 mb-2" size={32}/>
// //                         <p className="text-sm text-gray-500 mb-4">Upload tugas Anda di sini (PDF/DOCX/JPG)</p>
// //                         <input type="file" title="Pilih file tugas" aria-label="Pilih file tugas" onChange={(e)=>setUploadedFile(e.target.files?.[0]||null)} className="mb-4 text-sm block mx-auto text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
// //                         <button onClick={handleSubmitTask} disabled={!uploadedFile||isSubmitting} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold block mx-auto hover:bg-indigo-700 transition-colors" title="Upload Tugas" aria-label="Upload Tugas">{isSubmitting?'Mengupload...':'Upload Tugas'}</button>
// //                     </div>
// //                 )}
// //                 {activeLesson.type === 'poll' && (
// //                     <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
// //                         <h3 className="font-bold text-lg mb-4">{activeLesson.pollQuestion || "Polling"}</h3>
// //                         <div className="space-y-3 max-w-sm mx-auto">
// //                             {activeLesson.pollOptions?.map((opt:string, idx:number) => (
// //                                 <button key={idx} onClick={()=>setPollSelected(idx)} className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${pollSelected===idx ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-100 border-gray-300'}`} title={`Pilih ${opt}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>
// //                             ))}
// //                         </div>
// //                         <button onClick={handleSubmitTask} disabled={pollSelected===null||isSubmitting} className="mt-6 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition-colors" title="Kirim Polling" aria-label="Kirim Polling">Kirim Polling</button>
// //                     </div>
// //                 )}
// //             </div>
// //         );
// //     };
  
// //     if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// //     if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;
  
// //     if (!isEnrolled || enrollmentStatus === 'pending') {
// //         return (
// //           <div className="min-h-screen bg-gray-50 pb-20">
// //               {showRegisterModal && (<CourseRegistrationModal courseId={courseId} courseTitle={course.title} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil!"); router.push('/courses'); }} />)}
// //               <div className="bg-gray-900 text-white relative">
// //                   <div className="absolute inset-0 bg-black/60 z-0"></div>
// //                   {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" alt="" />}
// //                   <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
// //                       <div className="lg:col-span-2 space-y-6">
// //                           <div className="inline-block bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{course.programType === 'training' ? 'Diklat' : 'Kursus'}</div>
// //                           <h1 className="text-4xl font-extrabold leading-tight">{course.title}</h1>
// //                           <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
// //                               <div className="flex items-center gap-2"><Users size={18}/> {course.facilitatorIds?.length || 1} Fasilitator</div>
// //                               <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
// //                               <div className="flex items-center gap-2"><Clock size={18}/> Fleksibel</div>
// //                           </div>
// //                       </div>
// //                       <div className="lg:col-span-1 bg-white text-gray-900 p-6 rounded-2xl shadow-xl">
// //                           <div className="text-center mb-6"><p className="text-gray-500 text-sm">Biaya Pelatihan</p><p className="text-3xl font-extrabold text-green-600">{course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}</p></div>
// //                           <button onClick={() => setShowRegisterModal(true)} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2" title="Daftar Sekarang" aria-label="Daftar Sekarang">📝 Daftar Sekarang</button>
// //                       </div>
// //                   </div>
// //               </div>
// //           </div>
// //         );
// //     }
  
// //     const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;
  
// //     return (
// //       <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// //         <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
// //           <div className="p-5 border-b bg-white">
// //               <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" title="Kembali ke Katalog" aria-label="Kembali ke Katalog"><span>←</span> KEMBALI KE KATALOG</Link>
// //               <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
// //               <div className="space-y-2">
// //                   <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{safePercent}%</span></div>
// //                   <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: `${safePercent}%`}}></div></div>
// //               </div>
// //               <button onClick={() => setShowPersonalChat(true)} className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50" title="Hubungi Pengajar" aria-label="Hubungi Pengajar">
// //                   <MessageCircle size={16}/> Hubungi Pengajar
// //               </button>
// //           </div>
// //           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
// //               {course.modules?.map((mod:any, i:number)=>(
// //                   <div key={mod._id}>
// //                       <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
// //                       <div className="space-y-1">
// //                           {mod.lessons?.map((les:any) => (
// //                               <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`} title={les.title} aria-label={`Buka materi ${les.title}`}>
// //                                   {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
// //                                   {les.title}
// //                               </button>
// //                           ))}
// //                       </div>
// //                   </div>
// //               ))}
// //           </div>
// //         </aside>
  
// //         <main className="flex-1 flex flex-col relative h-full overflow-hidden bg-gray-50">
// //           <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
// //               <button type="button" onClick={()=>setIsSidebarOpen(!isSidebarOpen)} title="Buka Menu Sidebar" aria-label="Buka Menu Sidebar"><Menu/></button>
// //           </div>
// //           <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
// //               {renderContent()}
// //           </div>
          
// //           <div className="fixed bottom-8 right-8 flex gap-3 z-30">
// //               <button type="button" onClick={handlePrevLesson} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105" title="Materi Sebelumnya" aria-label="Materi Sebelumnya"><ChevronLeft/></button>
// //               <button type="button" onClick={handleManualComplete} className="h-12 px-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 font-bold hover:scale-105" title="Lanjut Materi" aria-label="Lanjut Materi"><span>Lanjut</span><ChevronRight/></button>
// //           </div>
// //         </main>
        
// //         {showPersonalChat && <ChatWithFacilitatorModal facilitators={courseFacilitators} onClose={() => setShowPersonalChat(false)} />}
  
// //         {user && (
// //           <CourseGroupChat 
// //               courseId={courseId} 
// //               currentUser={user} 
// //               participants={courseParticipants} 
// //               facilitators={courseFacilitators} 
// //               isFloating={true} 
// //           />
// //         )}
// //       </div>
// //     );
// // }

// 'use client';

// import { useState, useEffect, useRef, useMemo } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { api, getImageUrl, apiUpload } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';
// import QuizPlayer from '@/components/QuizPlayer';
// import CourseGroupChat from '@/components/CourseGroupChat'; 
// import { 
//     Users, Clock, MessageCircle, ChevronLeft, ChevronRight, Menu, Send, X,
//     FileText, PlayCircle, CheckCircle, UploadCloud, Calendar, Download, 
//     Image as ImageIcon, Video, School, MonitorPlay, BookOpen, Play, AlertCircle
// } from 'lucide-react';
// import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';
// import dynamic from 'next/dynamic';
// import 'react-quill/dist/quill.snow.css';

// const ReactQuill = dynamic(() => import('react-quill'), { 
//     ssr: false, 
//     loading: () => <div className="h-24 bg-gray-50 animate-pulse rounded-lg border border-gray-200"></div> 
// });

// // --- HELPER FUNCTIONS ---
// const getFacilitatorName = (activeFacilitatorId: any, facilitatorsList: any[]) => {
//     if (!activeFacilitatorId) return '-';
//     if (typeof activeFacilitatorId === 'object' && activeFacilitatorId.name) return activeFacilitatorId.name;
//     const found = facilitatorsList.find(f => (f._id === activeFacilitatorId) || (f.id === activeFacilitatorId));
//     return found ? found.name : 'Fasilitator';
// };

// const formatDate = (dateString: string) => {
//     if (!dateString) return '';
//     return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// };

// // --- CHAT MODAL ---
// function ChatWithFacilitatorModal({ facilitators, onClose }: any) {
//     const { user } = useAuth();
//     const [selectedFacilitator, setSelectedFacilitator] = useState<any>(facilitators[0] || null);
//     const [messages, setMessages] = useState<any[]>([]);
//     const [message, setMessage] = useState('');
//     const [sending, setSending] = useState(false);
//     const messagesEndRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (selectedFacilitator?._id) {
//             loadHistory();
//             const interval = setInterval(loadHistory, 3000);
//             return () => clearInterval(interval);
//         }
//     }, [selectedFacilitator]);

//     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

//     const loadHistory = async () => {
//         try {
//             const res = await api(`/api/chat/${selectedFacilitator._id}?t=${Date.now()}`);
//             setMessages(res.messages || []);
//         } catch (e) { console.error(e); }
//     };

//     const handleSend = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!message.trim() || !selectedFacilitator) return;
//         setSending(true);
//         try {
//             await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message } });
//             setMessage('');
//             loadHistory();
//         } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); }
//     };

//     return (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
//             <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]" role="dialog" aria-modal="true" aria-label="Chat Personal">
//                 <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
//                     <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18} /> Hubungi Pengajar</h3>
//                     <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20} /></button>
//                 </div>
//                 {!selectedFacilitator ? (
//                     <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center text-gray-500">Tidak ada fasilitator.</div>
//                 ) : (
//                     <>
//                         {facilitators.length > 1 && (
//                             <div className="p-3 bg-gray-50 border-b flex gap-2 overflow-x-auto">
//                                 {facilitators.map((f:any) => (
//                                     <button type="button" key={f._id} onClick={()=>setSelectedFacilitator(f)} className={`px-3 py-1 text-xs rounded-full border ${selectedFacilitator._id===f._id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300'}`} title={`Pilih ${f.name}`}>{f.name}</button>
//                                 ))}
//                             </div>
//                         )}
//                         <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
//                             {messages.map((msg: any, idx: number) => {
//                                 const isMe = msg.sender === 'me' || msg.sender?._id === user?.id;
//                                 return (
//                                     <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
//                                         <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
//                                             <p>{msg.message}</p>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                             <div ref={messagesEndRef} />
//                         </div>
//                         <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
//                             <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus title="Input Pesan" aria-label="Ketik pesan" />
//                             <button type="submit" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700" title="Kirim Pesan"><Send size={16}/></button>
//                         </form>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

// // --- MAIN PAGE COMPONENT ---
// export default function StudentCoursePlayPage() {
//     const router = useRouter();
//     const params = useParams();
//     const { user } = useAuth();
//     const { courseId } = params as { courseId: string };
  
//     const [course, setCourse] = useState<any>(null);
//     const [activeLesson, setActiveLesson] = useState<any>(null);
//     const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
//     const [progressPercent, setProgressPercent] = useState(0);
//     const [courseFacilitators, setCourseFacilitators] = useState<any[]>([]); 
//     const [courseParticipants, setCourseParticipants] = useState<any[]>([]); 
    
//     const [loading, setLoading] = useState(true);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [isEnrolled, setIsEnrolled] = useState(false);
//     const [enrollmentStatus, setEnrollmentStatus] = useState<string>(''); 
//     const [showRegisterModal, setShowRegisterModal] = useState(false);
//     const [showPersonalChat, setShowPersonalChat] = useState(false); 
  
//     const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
//     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
//     const [pollSelected, setPollSelected] = useState<number | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // STATE TIMER & START
//     const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
//     const [isStarted, setIsStarted] = useState(false); 
  
//     // 1. INIT DATA
//     useEffect(() => {
//         const initData = async () => {
//           try {
//             setLoading(true);
//             const resCourse = await api(`/api/courses/${courseId}`);
//             const courseData = resCourse.course || resCourse;
//             setCourse(courseData);
//             setCourseFacilitators(courseData.facilitatorIds || []); 
    
//             if (user) {
//                 try {
//                     const enrollRes = await api(`/api/enrollments/check/${courseId}`);
//                     setIsEnrolled(enrollRes.isEnrolled);
                    
//                     if (enrollRes.isEnrolled) {
//                         setEnrollmentStatus(enrollRes.status || 'pending'); 
//                         if (enrollRes.status === 'active' || enrollRes.status === 'approved') {
//                             const resProgress = await api(`/api/progress/${courseId}`);
//                             setCompletedLessonIds(resProgress.completedLessons || []);
//                         }
//                     }
//                 } catch (e) { console.error("Enroll check failed", e); }
//             }
//             if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
//           } catch (e) { console.error("Init failed", e); } finally { setLoading(false); }
//         };
//         if (courseId) initData();
//     }, [courseId, user]);
    
//     // 2. LOGIKA TIMER & TOMBOL MULAI
//     useEffect(() => {
//         setTimerSeconds(null);
        
//         if (activeLesson) {
//             if (!activeLesson.quizDuration || activeLesson.quizDuration <= 0 || completedLessonIds.includes(activeLesson._id)) {
//                 setIsStarted(true);
//                 return;
//             }

//             const storageKey = `timer_${user?.id}_${activeLesson._id}`;
//             const storedEndTime = localStorage.getItem(storageKey);

//             if (storedEndTime) {
//                 const endTime = parseInt(storedEndTime, 10);
//                 if (endTime > Date.now()) {
//                     setIsStarted(true); 
//                     startTicker(endTime); 
//                 } else {
//                     localStorage.removeItem(storageKey);
//                     setIsStarted(true); 
//                     setTimerSeconds(0);
//                 }
//             } else {
//                 setIsStarted(false);
//             }
//         }
//     }, [activeLesson, completedLessonIds, user]);

//     const startTicker = (endTime: number) => {
//         const update = () => {
//             const now = Date.now();
//             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
//             setTimerSeconds(remaining);
//         };
//         update(); 

//         const interval = setInterval(() => {
//             const now = Date.now();
//             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
//             setTimerSeconds(remaining);

//             if (remaining <= 0) {
//                 clearInterval(interval);
//             }
//         }, 1000);
        
//         return interval;
//     };

//     const handleStartLesson = () => {
//         setIsStarted(true);
//         if (activeLesson.quizDuration > 0) {
//             const endTime = Date.now() + activeLesson.quizDuration * 60 * 1000;
//             localStorage.setItem(`timer_${user?.id}_${activeLesson._id}`, endTime.toString());
//             startTicker(endTime);
//         }
//     };

//     const formatTimer = (seconds: number) => {
//         const m = Math.floor(seconds / 60);
//         const s = seconds % 60;
//         return `${m}:${s < 10 ? '0' : ''}${s}`;
//     };

//     // 3. PROGRESS BAR LOGIC
//     useEffect(() => {
//         if (course && !loading) {
//             let total = 0; let completed = 0;
//             course.modules?.forEach((m: any) => { 
//                 if(m.isActive) {
//                     m.lessons?.forEach((l: any) => { 
//                         if(l.isActive) { 
//                             total++; 
//                             if (completedLessonIds.includes(l._id)) completed++; 
//                         } 
//                     });
//                 }
//             });
//             const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
//             setProgressPercent(percent);
//         }
//     }, [completedLessonIds, course, loading]);
    
//     // 4. RESET INPUT FIELDS
//     useEffect(() => {
//           setUploadedFile(null);
//           setPollSelected(null);
//           setIsSubmitting(false);
//           if (activeLesson?.type === 'essay' && activeLesson.questions) {
//               setEssayAnswers(new Array(activeLesson.questions.length).fill(''));
//           } else {
//               setEssayAnswers([]);
//           }
//     }, [activeLesson]);

//     const handleEssayChange = (index: number, value: string) => {
//         const newAnswers = [...essayAnswers];
//         newAnswers[index] = value;
//         setEssayAnswers(newAnswers);
//     };

//     const markLessonAsComplete = async (lessonId: string, extraData: any = {}) => {
//         try { 
//             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId, ...extraData } }); 
//             if (!completedLessonIds.includes(lessonId)) {
//                 setCompletedLessonIds(prev => [...prev, lessonId]); 
//             }
//             if(user) localStorage.removeItem(`timer_${user.id}_${lessonId}`);
//         } catch(e) { console.error("Save progress failed", e); throw e; }
//     };
    
//     const handleNextLesson = () => {
//         const allLessons: any[] = [];
//         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
//         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
//         if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
//         else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
//     };
    
//     const handlePrevLesson = () => {
//         const allLessons: any[] = [];
//         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
//         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
//         if (currIdx > 0) { setActiveLesson(allLessons[currIdx - 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }
//     };

//     const handleManualComplete = async () => { 
//         await markLessonAsComplete(activeLesson._id); 
//         handleNextLesson(); 
//     };
    
//     const handleQuizCompleted = async (result: { score: number, attempts: number }) => { 
//         try {
//             await markLessonAsComplete(activeLesson._id, { 
//                 score: result.score, 
//                 attempts: result.attempts 
//             });

//             if (!completedLessonIds.includes(activeLesson._id)) {
//                 setCompletedLessonIds(prev => [...prev, activeLesson._id]); 
//             }
//         } catch (e) { console.error("Gagal simpan skor kuis", e); }
//     };
    
//     const handleSubmitTask = async () => {
//         setIsSubmitting(true);
//         try {
//             if (activeLesson.type === 'essay') {
//                 if (essayAnswers.some(ans => ans.trim() === '')) throw new Error("Mohon jawab semua pertanyaan.");
//                 await api(`/api/progress/${courseId}/submit-essay`, { 
//                     method: 'POST', 
//                     body: { lessonId: activeLesson._id, answers: essayAnswers } 
//                 });
//             } else if (activeLesson.type === 'upload_doc' || activeLesson.type === 'image') {
//                 if (!uploadedFile) throw new Error("Pilih file terlebih dahulu.");
//                 const fd = new FormData();
//                 fd.append('file', uploadedFile);
//                 const uploadRes = await apiUpload('/api/upload', fd);
//                 const fileUrl = uploadRes.url || uploadRes.file?.url || uploadRes.imageUrl;
                
//                 await api(`/api/progress/${courseId}/submit-task`, { 
//                     method: 'POST', 
//                     body: { lessonId: activeLesson._id, fileUrl, fileName: uploadedFile.name } 
//                 });
//             } else if (activeLesson.type === 'poll') {
//                 if (pollSelected === null) throw new Error("Pilih salah satu opsi.");
//                 const answerText = activeLesson.pollOptions[pollSelected];
//                 await markLessonAsComplete(activeLesson._id, { pollAnswer: answerText });
//             } else {
//                 await markLessonAsComplete(activeLesson._id);
//             }

//             if (!completedLessonIds.includes(activeLesson._id)) {
//                 setCompletedLessonIds(prev => [...prev, activeLesson._id]);
//             }
//             alert("Berhasil dikirim!");
//             handleNextLesson();
//         } catch (e: any) { alert("Gagal mengirim: " + e.message); } finally { setIsSubmitting(false); }
//     };

//     const renderContentHeader = (title: string) => (
//         <div className="mb-6 border-b border-gray-100 pb-4">
//             <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
//                 <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 flex items-center gap-1">
//                     {activeLesson?.type?.replace(/_/g, ' ') || 'MATERI'}
//                 </span>
//             </div>
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
//                 <h1 className="text-gray-900 font-bold text-2xl flex-1 leading-tight">{title}</h1>
//                 <div className="flex-shrink-0 flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
//                     {activeLesson.quizDuration > 0 && (
//                         <div className={`flex items-center gap-1 px-2 py-0.5 rounded border ${timerSeconds !== null && timerSeconds < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
//                             <Clock size={14} /> 
//                             <span className="font-bold text-sm">
//                                 {timerSeconds !== null 
//                                     ? `Sisa: ${formatTimer(timerSeconds)}` 
//                                     : `${activeLesson.quizDuration} Menit`
//                                 }
//                             </span>
//                         </div>
//                     )}
//                     <div className="flex items-center gap-1"><Users size={12} className="text-indigo-500"/> <span>{getFacilitatorName(activeLesson.facilitatorId, courseFacilitators)}</span></div>
//                     {activeLesson.jp > 0 && <div className="flex items-center gap-1 border-l pl-3"><Clock size={12} className="text-indigo-500"/> <span>{activeLesson.jp} JP</span></div>}
//                     {(activeLesson.scheduleDate) && <div className="flex items-center gap-1 border-l pl-3"><Calendar size={12} className="text-indigo-500"/> <span>{formatDate(activeLesson.scheduleDate)}</span></div>}
//                 </div>
//             </div>
//         </div>
//     );

//     const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
//         if (activeLesson.quizDuration > 0 && !isStarted && !completedLessonIds.includes(activeLesson._id)) {
//             return (
//                 <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-200 text-center min-h-[300px] animate-in fade-in zoom-in duration-300">
//                     <div className="bg-indigo-100 p-5 rounded-full mb-6 text-indigo-600 shadow-inner">
//                         <Clock size={48} />
//                     </div>
//                     <h2 className="text-2xl font-bold text-gray-800 mb-3">Materi dengan Batas Waktu</h2>
//                     <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
//                         Materi <strong>"{activeLesson.title}"</strong> memiliki batas waktu pengerjaan selama <span className="font-bold text-gray-800">{activeLesson.quizDuration} Menit</span>. 
//                         <br/><span className="text-xs text-red-500 mt-2 block">*Waktu akan berjalan otomatis setelah Anda menekan tombol di bawah.</span>
//                     </p>
//                     <button 
//                         onClick={handleStartLesson} 
//                         className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95"
//                     >
//                         <Play size={20} fill="currentColor" /> Mulai Kerjakan Sekarang
//                     </button>
//                 </div>
//             );
//         }
        
//         if (timerSeconds !== null && timerSeconds <= 0 && !completedLessonIds.includes(activeLesson._id)) {
//              return (
//                 <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-xl shadow-sm border border-red-200 text-center min-h-[300px]">
//                     <div className="bg-red-100 p-4 rounded-full mb-4 text-red-600">
//                         <AlertCircle size={40} />
//                     </div>
//                     <h2 className="text-xl font-bold text-red-800 mb-2">Waktu Habis!</h2>
//                     <p className="text-red-600 mb-6">Waktu pengerjaan untuk materi ini telah berakhir.</p>
//                     <button onClick={handleNextLesson} className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">Lanjut Materi Berikutnya</button>
//                 </div>
//              );
//         }

//         return <>{children}</>;
//     };

//     const renderContent = () => {
//         if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping.</div>;
        
//         const content = (
//             <>
//                 {activeLesson.type === 'quiz' && (
//                     <QuizPlayer 
//                         quizId={activeLesson._id} 
//                         courseId={courseId} 
//                         lessonData={activeLesson}
//                         onComplete={handleQuizCompleted} 
//                     />
//                 )}
                
//                 {activeLesson.type === 'image' && (
//                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
//                         <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
//                             <img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="w-full h-auto object-contain" />
//                         </div>
//                         {activeLesson.content && <div className="prose max-w-none mt-6 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />}
//                     </div>
//                 )}

//                 {(activeLesson.type === 'slide' || activeLesson.type === 'download_doc') && (
//                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
//                         <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center mb-6">
//                             <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4"><FileText size={32} /></div>
//                             <h3 className="text-lg font-bold text-gray-800 mb-2">{activeLesson.title}</h3>
//                             <p className="text-sm text-gray-500 mb-6">Dokumen Materi Pembelajaran.</p>
//                             <a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-transform active:scale-95" aria-label="Download File">
//                                 <Download size={18} /> Download Materi
//                             </a>
//                         </div>
//                         {activeLesson.fileUrl && activeLesson.fileUrl.endsWith('.pdf') && (
//                             <div className="mt-8 border rounded-xl overflow-hidden h-[800px] shadow-sm">
//                                 <iframe src={getImageUrl(activeLesson.fileUrl)} className="w-full h-full" title="Preview"></iframe>
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 {activeLesson.type === 'video_url' && (
//                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//                         <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
//                             <iframe 
//                                 src={activeLesson.videoUrl?.includes('youtu') ? `https://www.youtube.com/embed/${activeLesson.videoUrl.split('/').pop().replace('watch?v=', '')}` : activeLesson.videoUrl} 
//                                 className="w-full h-full" 
//                                 allowFullScreen 
//                                 title={`Video ${activeLesson.title}`} 
//                             />
//                         </div>
//                     </div>
//                 )}

//                 {activeLesson.type === 'virtual_class' && (
//                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
//                         <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
//                             <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"><Video size={40}/></div>
//                             <h3 className="text-xl font-bold text-gray-900 mb-2">Kelas Virtual (Zoom/Meet)</h3>
//                             <p className="text-gray-600 mb-6">Silakan bergabung ke pertemuan virtual melalui tombol di bawah ini.</p>
                            
//                             {(activeLesson.meetingLink || activeLesson.content) ? (
//                                 <div className="space-y-3">
//                                     <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg">
//                                         <Video size={20}/> Gabung Meeting
//                                     </a>
//                                     <div className="text-xs text-gray-500">
//                                         Link: <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" className="text-purple-600 underline">{activeLesson.meetingLink || activeLesson.content}</a>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <button disabled className="inline-flex items-center gap-2 bg-gray-400 text-white px-8 py-3 rounded-full font-bold cursor-not-allowed">
//                                     <Video size={20}/> Link Belum Tersedia
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 )}
                
//                 {activeLesson.type === 'google_classroom' && (
//                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
//                         <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
//                             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border"><School size={40} className="text-green-600"/></div>
//                             <h3 className="text-xl font-bold text-gray-900 mb-2">Google Classroom</h3>
//                             <p className="text-gray-600 mb-2">Materi ini terhubung dengan Google Classroom.</p>
//                             {activeLesson.classroomData ? (
//                                 <div className="mt-4">
//                                     <p className="font-bold text-lg">{activeLesson.classroomData.name}</p>
//                                     <p className="text-sm text-gray-500 mb-6">Kode Kelas: <span className="font-mono bg-white px-2 py-1 border rounded">{activeLesson.classroomData.enrollmentCode || '-'}</span></p>
//                                     <a href={activeLesson.classroomData.alternateLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 shadow-lg">Buka Google Classroom ↗</a>
//                                 </div>
//                             ) : <p className="text-red-500 italic">Data kelas tidak ditemukan.</p>}
//                         </div>
//                     </div>
//                 )}

//                 {['essay', 'upload_doc', 'image', 'poll', 'lesson'].includes(activeLesson.type) && (
//                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6">
//                         {activeLesson.content && activeLesson.type !== 'image' && (
//                             <div className="prose max-w-none mb-8 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
//                         )}
                        
//                         {/* [FIX] TAMPILKAN SOAL SEBAGAI HTML (AGAR TAG <P> TIDAK MUNCUL MENTAH) */}
//                         {activeLesson.type === 'essay' && (
//                             <div className="space-y-6">
//                                 {activeLesson.questions?.map((q:any,i:number)=>(
//                                     <div key={i} className="border p-4 rounded-lg bg-gray-50">
//                                         <div className="font-bold mb-2 text-sm text-gray-700 flex gap-2">
//                                             <span>{i+1}.</span>
//                                             {/* Render HTML Question */}
//                                             <div dangerouslySetInnerHTML={{ __html: q.question }} />
//                                         </div>
//                                         <div className="bg-white">
//                                             <ReactQuill theme="snow" value={essayAnswers[i]||''} onChange={(v)=>handleEssayChange(i,v)} placeholder="Tulis jawaban..."/>
//                                         </div>
//                                     </div>
//                                 ))}
//                                 <button onClick={handleSubmitTask} disabled={isSubmitting} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold w-full hover:bg-indigo-700 transition-colors" title="Kirim Jawaban" aria-label="Kirim Jawaban">{isSubmitting?'Mengirim...':'Kirim Jawaban'}</button>
//                             </div>
//                         )}
                        
//                         {(activeLesson.type === 'upload_doc' || activeLesson.type === 'image') && (
//                             <div className="border-2 border-dashed p-8 text-center rounded-xl bg-gray-50 border-indigo-200">
//                                 <UploadCloud className="mx-auto text-indigo-400 mb-2" size={32}/>
//                                 <p className="text-sm text-gray-500 mb-4">Upload tugas Anda di sini (PDF/DOCX/JPG)</p>
//                                 <input type="file" title="Pilih file tugas" aria-label="Pilih file tugas" onChange={(e)=>setUploadedFile(e.target.files?.[0]||null)} className="mb-4 text-sm block mx-auto text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
//                                 <button onClick={handleSubmitTask} disabled={!uploadedFile||isSubmitting} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold block mx-auto hover:bg-indigo-700 transition-colors" title="Upload Tugas" aria-label="Upload Tugas">{isSubmitting?'Mengupload...':'Upload Tugas'}</button>
//                             </div>
//                         )}
                        
//                         {activeLesson.type === 'poll' && (
//                             <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
//                                 <h3 className="font-bold text-lg mb-4">{activeLesson.pollQuestion || "Polling"}</h3>
//                                 <div className="space-y-3 max-w-sm mx-auto">
//                                     {activeLesson.pollOptions?.map((opt:string, idx:number) => (
//                                         <button key={idx} onClick={()=>setPollSelected(idx)} className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${pollSelected===idx ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-100 border-gray-300'}`} title={`Pilih ${opt}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>
//                                     ))}
//                                 </div>
//                                 <button onClick={handleSubmitTask} disabled={pollSelected===null||isSubmitting} className="mt-6 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition-colors" title="Kirim Polling" aria-label="Kirim Polling">Kirim Polling</button>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </>
//         );

//         return (
//             <div>
//                 {renderContentHeader(activeLesson.title)}
//                 <ContentWrapper>
//                     {content}
//                 </ContentWrapper>
//             </div>
//         );
//     };
  
//     if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
//     if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;
  
//     if (!isEnrolled || enrollmentStatus === 'pending') {
//         return (
//           <div className="min-h-screen bg-gray-50 pb-20">
//               {showRegisterModal && (<CourseRegistrationModal courseId={courseId} courseTitle={course.title} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil!"); router.push('/courses'); }} />)}
//               <div className="bg-gray-900 text-white relative">
//                   <div className="absolute inset-0 bg-black/60 z-0"></div>
//                   {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" alt="" />}
//                   <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
//                       <div className="lg:col-span-2 space-y-6">
//                           <div className="inline-block bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{course.programType === 'training' ? 'Diklat' : 'Kursus'}</div>
//                           <h1 className="text-4xl font-extrabold leading-tight">{course.title}</h1>
//                           <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
//                               <div className="flex items-center gap-2"><Users size={18}/> {course.facilitatorIds?.length || 1} Fasilitator</div>
//                               <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
//                               <div className="flex items-center gap-2"><Clock size={18}/> Fleksibel</div>
//                           </div>
//                       </div>
//                       <div className="lg:col-span-1 bg-white text-gray-900 p-6 rounded-2xl shadow-xl">
//                           <div className="text-center mb-6"><p className="text-gray-500 text-sm">Biaya Pelatihan</p><p className="text-3xl font-extrabold text-green-600">{course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}</p></div>
//                           <button onClick={() => setShowRegisterModal(true)} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2" title="Daftar Sekarang" aria-label="Daftar Sekarang">📝 Daftar Sekarang</button>
//                       </div>
//                   </div>
//               </div>
//           </div>
//         );
//     }
  
//     const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;
  
//     return (
//       <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
//         <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
//           <div className="p-5 border-b bg-white">
//               <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" title="Kembali ke Katalog" aria-label="Kembali ke Katalog"><span>←</span> KEMBALI KE KATALOG</Link>
//               <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
//               <div className="space-y-2">
//                   <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{safePercent}%</span></div>
//                   <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: `${safePercent}%`}}></div></div>
//               </div>
//               <button onClick={() => setShowPersonalChat(true)} className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50" title="Hubungi Pengajar" aria-label="Hubungi Pengajar">
//                   <MessageCircle size={16}/> Hubungi Pengajar
//               </button>
//           </div>
//           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
//               {course.modules?.map((mod:any, i:number)=>(
//                   <div key={mod._id}>
//                       <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
//                       <div className="space-y-1">
//                           {mod.lessons?.map((les:any) => (
//                               <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`} title={les.title} aria-label={`Buka materi ${les.title}`}>
//                                   {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
//                                   {les.title}
//                               </button>
//                           ))}
//                       </div>
//                   </div>
//               ))}
//           </div>
//         </aside>
  
//         <main className="flex-1 flex flex-col relative h-full overflow-hidden bg-gray-50">
//           <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
//               <button type="button" onClick={()=>setIsSidebarOpen(!isSidebarOpen)} title="Buka Menu Sidebar" aria-label="Buka Menu Sidebar"><Menu/></button>
//           </div>
//           <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
//               {renderContent()}
//           </div>
          
//           <div className="fixed bottom-8 right-8 flex gap-3 z-30">
//               <button type="button" onClick={handlePrevLesson} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105" title="Materi Sebelumnya" aria-label="Materi Sebelumnya"><ChevronLeft/></button>
//               <button type="button" onClick={handleManualComplete} className="h-12 px-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 font-bold hover:scale-105" title="Lanjut Materi" aria-label="Lanjut Materi"><span>Lanjut</span><ChevronRight/></button>
//           </div>
//         </main>
        
//         {showPersonalChat && <ChatWithFacilitatorModal facilitators={courseFacilitators} onClose={() => setShowPersonalChat(false)} />}
  
//         {user && (
//           <CourseGroupChat 
//               courseId={courseId} 
//               currentUser={user} 
//               participants={courseParticipants} 
//               facilitators={courseFacilitators} 
//               isFloating={true} 
//           />
//         )}
//       </div>
//     );
// }
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, getImageUrl, apiUpload } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import QuizPlayer from '@/components/QuizPlayer';
import CourseGroupChat from '@/components/CourseGroupChat'; 
import { 
    Users, Clock, MessageCircle, ChevronLeft, ChevronRight, Menu, Send, X,
    FileText, PlayCircle, CheckCircle, UploadCloud, Calendar, Download, 
    Image as ImageIcon, Video, School, MonitorPlay, BookOpen, Play, AlertCircle
} from 'lucide-react';
import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { 
    ssr: false, 
    loading: () => <div className="h-24 bg-gray-50 animate-pulse rounded-lg border border-gray-200"></div> 
});

// --- HELPER FUNCTIONS ---
const getFacilitatorName = (activeFacilitatorId: any, facilitatorsList: any[]) => {
    if (!activeFacilitatorId) return '-';
    if (typeof activeFacilitatorId === 'object' && activeFacilitatorId.name) return activeFacilitatorId.name;
    const found = facilitatorsList.find(f => (f._id === activeFacilitatorId) || (f.id === activeFacilitatorId));
    return found ? found.name : 'Fasilitator';
};

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

// --- CHAT MODAL (Personal) ---
function ChatWithFacilitatorModal({ facilitators, onClose }: any) {
    const { user } = useAuth();
    const [selectedFacilitator, setSelectedFacilitator] = useState<any>(facilitators[0] || null);
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
            const res = await api(`/api/chat/${selectedFacilitator._id}?t=${Date.now()}`);
            setMessages(res.messages || []);
        } catch (e) { console.error(e); }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !selectedFacilitator) return;
        setSending(true);
        try {
            await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message } });
            setMessage('');
            loadHistory();
        } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]" role="dialog" aria-modal="true" aria-label="Chat Personal">
                <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
                    <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18} /> Hubungi Pengajar</h3>
                    <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20} /></button>
                </div>
                {!selectedFacilitator ? (
                    <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center text-gray-500">Tidak ada fasilitator.</div>
                ) : (
                    <>
                        {facilitators.length > 1 && (
                            <div className="p-3 bg-gray-50 border-b flex gap-2 overflow-x-auto">
                                {facilitators.map((f:any) => (
                                    <button type="button" key={f._id} onClick={()=>setSelectedFacilitator(f)} className={`px-3 py-1 text-xs rounded-full border ${selectedFacilitator._id===f._id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300'}`} title={`Pilih ${f.name}`}>{f.name}</button>
                                ))}
                            </div>
                        )}
                        <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
                            {messages.map((msg: any, idx: number) => {
                                const isMe = msg.sender === 'me' || msg.sender?._id === user?.id;
                                return (
                                    <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                                            <p>{msg.message}</p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
                            <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus title="Input Pesan" aria-label="Ketik pesan" />
                            <button type="submit" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700" title="Kirim Pesan"><Send size={16}/></button>
                        </form>
                    </>
                )}
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
    const [courseFacilitators, setCourseFacilitators] = useState<any[]>([]); 
    // [FIX] State untuk menyimpan daftar peserta (User Object)
    const [courseParticipants, setCourseParticipants] = useState<any[]>([]); 
    
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [enrollmentStatus, setEnrollmentStatus] = useState<string>(''); 
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showPersonalChat, setShowPersonalChat] = useState(false); 
  
    const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [pollSelected, setPollSelected] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // STATE TIMER & START
    const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
    const [isStarted, setIsStarted] = useState(false); 
  
    // 1. INIT DATA
    useEffect(() => {
        const initData = async () => {
          try {
            setLoading(true);
            const resCourse = await api(`/api/courses/${courseId}`);
            const courseData = resCourse.course || resCourse;
            setCourse(courseData);
            setCourseFacilitators(courseData.facilitatorIds || []); 
    
            if (user) {
                try {
                    const enrollRes = await api(`/api/enrollments/check/${courseId}`);
                    setIsEnrolled(enrollRes.isEnrolled);
                    
                    if (enrollRes.isEnrolled) {
                        setEnrollmentStatus(enrollRes.status || 'pending'); 
                        if (enrollRes.status === 'active' || enrollRes.status === 'approved') {
                            const resProgress = await api(`/api/progress/${courseId}`);
                            setCompletedLessonIds(resProgress.completedLessons || []);

                            // [FIX] FETCH PARTICIPANTS UNTUK RUANG DISKUSI
                            try {
                                const resPart = await api(`/api/courses/${courseId}/participants`);
                                // Backend mengirim array enrollment, kita ambil user-nya saja
                                const userList = resPart.participants?.map((p: any) => p.user) || [];
                                setCourseParticipants(userList);
                            } catch (e) { console.error("Gagal load peserta chat", e); }
                        }
                    }
                } catch (e) { console.error("Enroll check failed", e); }
            }
            if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
          } catch (e) { console.error("Init failed", e); } finally { setLoading(false); }
        };
        if (courseId) initData();
    }, [courseId, user]);
    
    // 2. LOGIKA TIMER & TOMBOL MULAI
    useEffect(() => {
        setTimerSeconds(null);
        
        if (activeLesson) {
            if (!activeLesson.quizDuration || activeLesson.quizDuration <= 0 || completedLessonIds.includes(activeLesson._id)) {
                setIsStarted(true);
                return;
            }

            const storageKey = `timer_${user?.id}_${activeLesson._id}`;
            const storedEndTime = localStorage.getItem(storageKey);

            if (storedEndTime) {
                const endTime = parseInt(storedEndTime, 10);
                if (endTime > Date.now()) {
                    setIsStarted(true); 
                    startTicker(endTime); 
                } else {
                    localStorage.removeItem(storageKey);
                    setIsStarted(true); 
                    setTimerSeconds(0);
                }
            } else {
                setIsStarted(false);
            }
        }
    }, [activeLesson, completedLessonIds, user]);

    const startTicker = (endTime: number) => {
        const update = () => {
            const now = Date.now();
            const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
            setTimerSeconds(remaining);
        };
        update(); 

        const interval = setInterval(() => {
            const now = Date.now();
            const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
            setTimerSeconds(remaining);

            if (remaining <= 0) {
                clearInterval(interval);
            }
        }, 1000);
        
        return interval;
    };

    const handleStartLesson = () => {
        setIsStarted(true);
        if (activeLesson.quizDuration > 0) {
            const endTime = Date.now() + activeLesson.quizDuration * 60 * 1000;
            localStorage.setItem(`timer_${user?.id}_${activeLesson._id}`, endTime.toString());
            startTicker(endTime);
        }
    };

    const formatTimer = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // 3. PROGRESS BAR LOGIC
    useEffect(() => {
        if (course && !loading) {
            let total = 0; let completed = 0;
            course.modules?.forEach((m: any) => { 
                if(m.isActive) {
                    m.lessons?.forEach((l: any) => { 
                        if(l.isActive) { 
                            total++; 
                            if (completedLessonIds.includes(l._id)) completed++; 
                        } 
                    });
                }
            });
            const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
            setProgressPercent(percent);
        }
    }, [completedLessonIds, course, loading]);
    
    // 4. RESET INPUT FIELDS
    useEffect(() => {
          setUploadedFile(null);
          setPollSelected(null);
          setIsSubmitting(false);
          if (activeLesson?.type === 'essay' && activeLesson.questions) {
              setEssayAnswers(new Array(activeLesson.questions.length).fill(''));
          } else {
              setEssayAnswers([]);
          }
    }, [activeLesson]);

    const handleEssayChange = (index: number, value: string) => {
        const newAnswers = [...essayAnswers];
        newAnswers[index] = value;
        setEssayAnswers(newAnswers);
    };

    const markLessonAsComplete = async (lessonId: string, extraData: any = {}) => {
        try { 
            await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId, ...extraData } }); 
            if (!completedLessonIds.includes(lessonId)) {
                setCompletedLessonIds(prev => [...prev, lessonId]); 
            }
            if(user) localStorage.removeItem(`timer_${user.id}_${lessonId}`);
        } catch(e) { console.error("Save progress failed", e); throw e; }
    };
    
    const handleNextLesson = () => {
        const allLessons: any[] = [];
        course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
        const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
        if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
        else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
    };
    
    const handlePrevLesson = () => {
        const allLessons: any[] = [];
        course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
        const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
        if (currIdx > 0) { setActiveLesson(allLessons[currIdx - 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    };

    const handleManualComplete = async () => { 
        await markLessonAsComplete(activeLesson._id); 
        handleNextLesson(); 
    };
    
    const handleQuizCompleted = async (result: { score: number, attempts: number }) => { 
        try {
            await markLessonAsComplete(activeLesson._id, { 
                score: result.score, 
                attempts: result.attempts 
            });

            if (!completedLessonIds.includes(activeLesson._id)) {
                setCompletedLessonIds(prev => [...prev, activeLesson._id]); 
            }
        } catch (e) { console.error("Gagal simpan skor kuis", e); }
    };
    
    const handleSubmitTask = async () => {
        setIsSubmitting(true);
        try {
            if (activeLesson.type === 'essay') {
                if (essayAnswers.some(ans => ans.trim() === '')) throw new Error("Mohon jawab semua pertanyaan.");
                await api(`/api/progress/${courseId}/submit-essay`, { 
                    method: 'POST', 
                    body: { lessonId: activeLesson._id, answers: essayAnswers } 
                });
            } else if (activeLesson.type === 'upload_doc' || activeLesson.type === 'image') {
                if (!uploadedFile) throw new Error("Pilih file terlebih dahulu.");
                const fd = new FormData();
                fd.append('file', uploadedFile);
                const uploadRes = await apiUpload('/api/upload', fd);
                const fileUrl = uploadRes.url || uploadRes.file?.url || uploadRes.imageUrl;
                
                await api(`/api/progress/${courseId}/submit-task`, { 
                    method: 'POST', 
                    body: { lessonId: activeLesson._id, fileUrl, fileName: uploadedFile.name } 
                });
            } else if (activeLesson.type === 'poll') {
                if (pollSelected === null) throw new Error("Pilih salah satu opsi.");
                const answerText = activeLesson.pollOptions[pollSelected];
                await markLessonAsComplete(activeLesson._id, { pollAnswer: answerText });
            } else {
                await markLessonAsComplete(activeLesson._id);
            }

            if (!completedLessonIds.includes(activeLesson._id)) {
                setCompletedLessonIds(prev => [...prev, activeLesson._id]);
            }
            alert("Berhasil dikirim!");
            handleNextLesson();
        } catch (e: any) { alert("Gagal mengirim: " + e.message); } finally { setIsSubmitting(false); }
    };

    const renderContentHeader = (title: string) => (
        <div className="mb-6 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 flex items-center gap-1">
                    {activeLesson?.type?.replace(/_/g, ' ') || 'MATERI'}
                </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <h1 className="text-gray-900 font-bold text-2xl flex-1 leading-tight">{title}</h1>
                <div className="flex-shrink-0 flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                    {activeLesson.quizDuration > 0 && (
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded border ${timerSeconds !== null && timerSeconds < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                            <Clock size={14} /> 
                            <span className="font-bold text-sm">
                                {timerSeconds !== null 
                                    ? `Sisa: ${formatTimer(timerSeconds)}` 
                                    : `${activeLesson.quizDuration} Menit`
                                }
                            </span>
                        </div>
                    )}
                    <div className="flex items-center gap-1"><Users size={12} className="text-indigo-500"/> <span>{getFacilitatorName(activeLesson.facilitatorId, courseFacilitators)}</span></div>
                    {activeLesson.jp > 0 && <div className="flex items-center gap-1 border-l pl-3"><Clock size={12} className="text-indigo-500"/> <span>{activeLesson.jp} JP</span></div>}
                    {(activeLesson.scheduleDate) && <div className="flex items-center gap-1 border-l pl-3"><Calendar size={12} className="text-indigo-500"/> <span>{formatDate(activeLesson.scheduleDate)}</span></div>}
                </div>
            </div>
        </div>
    );

    const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
        if (activeLesson.quizDuration > 0 && !isStarted && !completedLessonIds.includes(activeLesson._id)) {
            return (
                <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-200 text-center min-h-[300px] animate-in fade-in zoom-in duration-300">
                    <div className="bg-indigo-100 p-5 rounded-full mb-6 text-indigo-600 shadow-inner">
                        <Clock size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Materi dengan Batas Waktu</h2>
                    <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
                        Materi <strong>"{activeLesson.title}"</strong> memiliki batas waktu pengerjaan selama <span className="font-bold text-gray-800">{activeLesson.quizDuration} Menit</span>. 
                        <br/><span className="text-xs text-red-500 mt-2 block">*Waktu akan berjalan otomatis setelah Anda menekan tombol di bawah.</span>
                    </p>
                    <button 
                        onClick={handleStartLesson} 
                        className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95"
                    >
                        <Play size={20} fill="currentColor" /> Mulai Kerjakan Sekarang
                    </button>
                </div>
            );
        }
        
        if (timerSeconds !== null && timerSeconds <= 0 && !completedLessonIds.includes(activeLesson._id)) {
             return (
                <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-xl shadow-sm border border-red-200 text-center min-h-[300px]">
                    <div className="bg-red-100 p-4 rounded-full mb-4 text-red-600">
                        <AlertCircle size={40} />
                    </div>
                    <h2 className="text-xl font-bold text-red-800 mb-2">Waktu Habis!</h2>
                    <p className="text-red-600 mb-6">Waktu pengerjaan untuk materi ini telah berakhir.</p>
                    <button onClick={handleNextLesson} className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">Lanjut Materi Berikutnya</button>
                </div>
             );
        }

        return <>{children}</>;
    };

    const renderContent = () => {
        if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping.</div>;
        
        const content = (
            <>
                {activeLesson.type === 'quiz' && (
                    <QuizPlayer 
                        quizId={activeLesson._id} 
                        courseId={courseId} 
                        lessonData={activeLesson}
                        onComplete={handleQuizCompleted} 
                    />
                )}
                
                {activeLesson.type === 'image' && (
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
                            <img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="w-full h-auto object-contain" />
                        </div>
                        {activeLesson.content && <div className="prose max-w-none mt-6 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />}
                    </div>
                )}

                {(activeLesson.type === 'slide' || activeLesson.type === 'download_doc') && (
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center mb-6">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4"><FileText size={32} /></div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{activeLesson.title}</h3>
                            <p className="text-sm text-gray-500 mb-6">Dokumen Materi Pembelajaran.</p>
                            <a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-transform active:scale-95" aria-label="Download File">
                                <Download size={18} /> Download Materi
                            </a>
                        </div>
                        {activeLesson.fileUrl && activeLesson.fileUrl.endsWith('.pdf') && (
                            <div className="mt-8 border rounded-xl overflow-hidden h-[800px] shadow-sm">
                                <iframe src={getImageUrl(activeLesson.fileUrl)} className="w-full h-full" title="Preview"></iframe>
                            </div>
                        )}
                    </div>
                )}

                {activeLesson.type === 'video_url' && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                            <iframe 
                                src={activeLesson.videoUrl?.includes('youtu') ? `https://www.youtube.com/embed/${activeLesson.videoUrl.split('/').pop().replace('watch?v=', '')}` : activeLesson.videoUrl} 
                                className="w-full h-full" 
                                allowFullScreen 
                                title={`Video ${activeLesson.title}`} 
                            />
                        </div>
                    </div>
                )}

                {activeLesson.type === 'virtual_class' && (
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
                            <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"><Video size={40}/></div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Kelas Virtual (Zoom/Meet)</h3>
                            <p className="text-gray-600 mb-6">Silakan bergabung ke pertemuan virtual melalui tombol di bawah ini.</p>
                            
                            {(activeLesson.meetingLink || activeLesson.content) ? (
                                <div className="space-y-3">
                                    <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg">
                                        <Video size={20}/> Gabung Meeting
                                    </a>
                                    <div className="text-xs text-gray-500">
                                        Link: <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" className="text-purple-600 underline">{activeLesson.meetingLink || activeLesson.content}</a>
                                    </div>
                                </div>
                            ) : (
                                <button disabled className="inline-flex items-center gap-2 bg-gray-400 text-white px-8 py-3 rounded-full font-bold cursor-not-allowed">
                                    <Video size={20}/> Link Belum Tersedia
                                </button>
                            )}
                        </div>
                    </div>
                )}
                
                {activeLesson.type === 'google_classroom' && (
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border"><School size={40} className="text-green-600"/></div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Google Classroom</h3>
                            <p className="text-gray-600 mb-2">Materi ini terhubung dengan Google Classroom.</p>
                            {activeLesson.classroomData ? (
                                <div className="mt-4">
                                    <p className="font-bold text-lg">{activeLesson.classroomData.name}</p>
                                    <p className="text-sm text-gray-500 mb-6">Kode Kelas: <span className="font-mono bg-white px-2 py-1 border rounded">{activeLesson.classroomData.enrollmentCode || '-'}</span></p>
                                    <a href={activeLesson.classroomData.alternateLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 shadow-lg">Buka Google Classroom ↗</a>
                                </div>
                            ) : <p className="text-red-500 italic">Data kelas tidak ditemukan.</p>}
                        </div>
                    </div>
                )}

                {['essay', 'upload_doc', 'image', 'poll', 'lesson'].includes(activeLesson.type) && (
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6">
                        {activeLesson.content && activeLesson.type !== 'image' && (
                            <div className="prose max-w-none mb-8 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
                        )}
                        
                        {activeLesson.type === 'essay' && (
                            <div className="space-y-6">
                                {activeLesson.questions?.map((q:any,i:number)=>(
                                    <div key={i} className="border p-4 rounded-lg bg-gray-50">
                                        <div className="font-bold mb-2 text-sm text-gray-700 flex gap-2">
                                            <span>{i+1}.</span>
                                            <div dangerouslySetInnerHTML={{ __html: q.question }} />
                                        </div>
                                        <div className="bg-white">
                                            <ReactQuill theme="snow" value={essayAnswers[i]||''} onChange={(v)=>handleEssayChange(i,v)} placeholder="Tulis jawaban..."/>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={handleSubmitTask} disabled={isSubmitting} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold w-full hover:bg-indigo-700 transition-colors" title="Kirim Jawaban" aria-label="Kirim Jawaban">{isSubmitting?'Mengirim...':'Kirim Jawaban'}</button>
                            </div>
                        )}
                        
                        {(activeLesson.type === 'upload_doc' || activeLesson.type === 'image') && (
                            <div className="border-2 border-dashed p-8 text-center rounded-xl bg-gray-50 border-indigo-200">
                                <UploadCloud className="mx-auto text-indigo-400 mb-2" size={32}/>
                                <p className="text-sm text-gray-500 mb-4">Upload tugas Anda di sini (PDF/DOCX/JPG)</p>
                                <input type="file" title="Pilih file tugas" aria-label="Pilih file tugas" onChange={(e)=>setUploadedFile(e.target.files?.[0]||null)} className="mb-4 text-sm block mx-auto text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                                <button onClick={handleSubmitTask} disabled={!uploadedFile||isSubmitting} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold block mx-auto hover:bg-indigo-700 transition-colors" title="Upload Tugas" aria-label="Upload Tugas">{isSubmitting?'Mengupload...':'Upload Tugas'}</button>
                            </div>
                        )}
                        
                        {activeLesson.type === 'poll' && (
                            <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                                <h3 className="font-bold text-lg mb-4">{activeLesson.pollQuestion || "Polling"}</h3>
                                <div className="space-y-3 max-w-sm mx-auto">
                                    {activeLesson.pollOptions?.map((opt:string, idx:number) => (
                                        <button key={idx} onClick={()=>setPollSelected(idx)} className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${pollSelected===idx ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-100 border-gray-300'}`} title={`Pilih ${opt}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>
                                    ))}
                                </div>
                                <button onClick={handleSubmitTask} disabled={pollSelected===null||isSubmitting} className="mt-6 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition-colors" title="Kirim Polling" aria-label="Kirim Polling">Kirim Polling</button>
                            </div>
                        )}
                    </div>
                )}
            </>
        );

        return (
            <div>
                {renderContentHeader(activeLesson.title)}
                <ContentWrapper>
                    {content}
                </ContentWrapper>
            </div>
        );
    };
  
    if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
    if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;
  
    if (!isEnrolled || enrollmentStatus === 'pending') {
        return (
          <div className="min-h-screen bg-gray-50 pb-20">
              {showRegisterModal && (<CourseRegistrationModal courseId={courseId} courseTitle={course.title} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil!"); router.push('/courses'); }} />)}
              <div className="bg-gray-900 text-white relative">
                  <div className="absolute inset-0 bg-black/60 z-0"></div>
                  {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" alt="" />}
                  <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                      <div className="lg:col-span-2 space-y-6">
                          <div className="inline-block bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{course.programType === 'training' ? 'Diklat' : 'Kursus'}</div>
                          <h1 className="text-4xl font-extrabold leading-tight">{course.title}</h1>
                          <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
                              <div className="flex items-center gap-2"><Users size={18}/> {course.facilitatorIds?.length || 1} Fasilitator</div>
                              <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
                              <div className="flex items-center gap-2"><Clock size={18}/> Fleksibel</div>
                          </div>
                      </div>
                      <div className="lg:col-span-1 bg-white text-gray-900 p-6 rounded-2xl shadow-xl">
                          <div className="text-center mb-6"><p className="text-gray-500 text-sm">Biaya Pelatihan</p><p className="text-3xl font-extrabold text-green-600">{course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}</p></div>
                          <button onClick={() => setShowRegisterModal(true)} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2" title="Daftar Sekarang" aria-label="Daftar Sekarang">📝 Daftar Sekarang</button>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
  
    const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;
  
    return (
      <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
        <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
          <div className="p-5 border-b bg-white">
              <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" title="Kembali ke Katalog" aria-label="Kembali ke Katalog"><span>←</span> KEMBALI KE KATALOG</Link>
              <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
              <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{safePercent}%</span></div>
                  <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: `${safePercent}%`}}></div></div>
              </div>
              <button onClick={() => setShowPersonalChat(true)} className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50" title="Hubungi Pengajar" aria-label="Hubungi Pengajar">
                  <MessageCircle size={16}/> Hubungi Pengajar
              </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              {course.modules?.map((mod:any, i:number)=>(
                  <div key={mod._id}>
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
                      <div className="space-y-1">
                          {mod.lessons?.map((les:any) => (
                              <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`} title={les.title} aria-label={`Buka materi ${les.title}`}>
                                  {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
                                  {les.title}
                              </button>
                          ))}
                      </div>
                  </div>
              ))}
          </div>
        </aside>
  
        <main className="flex-1 flex flex-col relative h-full overflow-hidden bg-gray-50">
          <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
              <button type="button" onClick={()=>setIsSidebarOpen(!isSidebarOpen)} title="Buka Menu Sidebar" aria-label="Buka Menu Sidebar"><Menu/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
              {renderContent()}
          </div>
          
          <div className="fixed bottom-8 right-8 flex gap-3 z-30">
              <button type="button" onClick={handlePrevLesson} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105" title="Materi Sebelumnya" aria-label="Materi Sebelumnya"><ChevronLeft/></button>
              <button type="button" onClick={handleManualComplete} className="h-12 px-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 font-bold hover:scale-105" title="Lanjut Materi" aria-label="Lanjut Materi"><span>Lanjut</span><ChevronRight/></button>
          </div>
        </main>
        
        {showPersonalChat && <ChatWithFacilitatorModal facilitators={courseFacilitators} onClose={() => setShowPersonalChat(false)} />}
  
        {user && (
          <CourseGroupChat 
              courseId={courseId} 
              currentUser={user} 
              participants={courseParticipants} 
              facilitators={courseFacilitators} 
              isFloating={true} 
          />
        )}
      </div>
    );
}
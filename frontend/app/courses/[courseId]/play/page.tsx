// // // // // // // // // 'use client';

// // // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // import { useAuth } from '@/lib/AuthProvider'; // Import Auth
// // // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // // import { 
// // // // // // // // //     ArrowLeft, CheckCircle, PlayCircle, Lock, 
// // // // // // // // //     MessageSquare, FileText, Send, Loader2, 
// // // // // // // // //     HelpCircle, HeadphonesIcon, Monitor, ExternalLink, 
// // // // // // // // //     Menu, X, BarChart2, Paperclip 
// // // // // // // // // } from 'lucide-react';
// // // // // // // // // import Link from 'next/link';

// // // // // // // // // export default function CoursePlayPage() {
// // // // // // // // //     const params = useParams();
// // // // // // // // //     const router = useRouter();
// // // // // // // // //     const { user } = useAuth(); // [FIX TS: Tambahkan ini agar variabel user dikenali]
// // // // // // // // //     const courseId = params?.courseId as string;

// // // // // // // // //     // --- STATE ---
// // // // // // // // //     const [course, setCourse] = useState<any>(null);
// // // // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // // // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // // // // //     const [progressData, setProgressData] = useState<any>(null);
// // // // // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // // // // //     const [chatMessage, setChatMessage] = useState('');
// // // // // // // // //     const [showChat, setShowChat] = useState(false);
// // // // // // // // //     const [showMobileMenu, setShowMobileMenu] = useState(false);

// // // // // // // // //     // --- REFS ---
// // // // // // // // //     const progressBarRef = useRef<HTMLDivElement>(null);
// // // // // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // // // // // //     useEffect(() => {
// // // // // // // // //         if (courseId) loadData();
// // // // // // // // //     }, [courseId, user]);

// // // // // // // // //     // FIX ARIA ERROR: Update DOM Manual
// // // // // // // // //     useEffect(() => {
// // // // // // // // //         if (progressBarRef.current) {
// // // // // // // // //             const percent = Math.round(progressData?.percent || 0);
// // // // // // // // //             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
// // // // // // // // //             progressBarRef.current.style.width = `${percent}%`;
// // // // // // // // //         }
// // // // // // // // //     }, [progressData]);

// // // // // // // // //     useEffect(() => {
// // // // // // // // //         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // // // // // //     }, [messages, showChat]);

// // // // // // // // //     const loadData = async () => {
// // // // // // // // //         try {
// // // // // // // // //             setLoading(true);
// // // // // // // // //             const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
// // // // // // // // //             const cData = res.course || res;
// // // // // // // // //             setCourse(cData);

// // // // // // // // //             const [prog, msg] = await Promise.all([
// // // // // // // // //                 api(`/api/progress/${courseId}`),
// // // // // // // // //                 api(`/api/courses/${courseId}/messages`)
// // // // // // // // //             ]);
// // // // // // // // //             setProgressData(prog);
// // // // // // // // //             setMessages(msg || []);

// // // // // // // // //             const firstMod = cData.modules?.find((m: any) => m.isActive);
// // // // // // // // //             const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
// // // // // // // // //             if (firstLes) setActiveLesson(firstLes);

// // // // // // // // //         } catch (e) {
// // // // // // // // //             console.error("Gagal memuat data", e);
// // // // // // // // //         } finally {
// // // // // // // // //             setLoading(false);
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     const handleMarkComplete = async (lessonId: string) => {
// // // // // // // // //         try {
// // // // // // // // //             await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
// // // // // // // // //             const updated = await api(`/api/progress/${courseId}`);
// // // // // // // // //             setProgressData(updated);
// // // // // // // // //         } catch (e) { alert("Gagal update progres"); }
// // // // // // // // //     };

// // // // // // // // //     const handleSendChat = async (e: React.FormEvent) => {
// // // // // // // // //         e.preventDefault();
// // // // // // // // //         if (!chatMessage.trim()) return;
// // // // // // // // //         try {
// // // // // // // // //             const res = await api(`/api/courses/${courseId}/messages`, { method: 'POST', body: { text: chatMessage } });
// // // // // // // // //             setMessages([...messages, res]);
// // // // // // // // //             setChatMessage('');
// // // // // // // // //         } catch (e) { alert("Gagal kirim pesan"); }
// // // // // // // // //     };

// // // // // // // // //     const isDone = (id: string) => progressData?.completedLessons?.includes(id);

// // // // // // // // //     // --- RENDERER KONTEN ---
// // // // // // // // //     const renderContent = () => {
// // // // // // // // //         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;

// // // // // // // // //         switch (activeLesson.type) {
// // // // // // // // //             case 'video_url':
// // // // // // // // //                 return (
// // // // // // // // //                     <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
// // // // // // // // //                         <iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/>
// // // // // // // // //                     </div>
// // // // // // // // //                 );
// // // // // // // // //             case 'slide':
// // // // // // // // //                 return (
// // // // // // // // //                     <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg">
// // // // // // // // //                         <iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/>
// // // // // // // // //                     </div>
// // // // // // // // //                 );
// // // // // // // // //             case 'pdf':
// // // // // // // // //                 return (
// // // // // // // // //                     <div className="aspect-[3/4] md:aspect-video bg-gray-50 rounded-2xl overflow-hidden border shadow-lg">
// // // // // // // // //                         <iframe src={`${getImageUrl(activeLesson.fileUrl)}#toolbar=0`} className="w-full h-full" title="Dokumen"/>
// // // // // // // // //                     </div>
// // // // // // // // //                 );
// // // // // // // // //             case 'image':
// // // // // // // // //                 return (
// // // // // // // // //                     <div className="rounded-2xl overflow-hidden border shadow-lg">
// // // // // // // // //                         <img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="w-full h-auto"/>
// // // // // // // // //                     </div>
// // // // // // // // //                 );
// // // // // // // // //             case 'poll':
// // // // // // // // //                 return (
// // // // // // // // //                     <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm">
// // // // // // // // //                         <div className="flex items-center gap-4 mb-6">
// // // // // // // // //                             <div className="p-3 bg-purple-100 text-purple-600 rounded-full"><BarChart2 size={32}/></div>
// // // // // // // // //                             <h2 className="text-xl font-bold text-gray-900">{activeLesson.pollQuestion || activeLesson.title}</h2>
// // // // // // // // //                         </div>
// // // // // // // // //                         <div className="space-y-3">
// // // // // // // // //                             {activeLesson.pollOptions?.map((opt: string, i: number) => (
// // // // // // // // //                                 <button key={i} className="w-full text-left p-4 bg-purple-50 border-2 border-purple-100 rounded-xl hover:border-purple-300 transition-all font-bold text-purple-900">
// // // // // // // // //                                     {opt}
// // // // // // // // //                                 </button>
// // // // // // // // //                             ))}
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 );
// // // // // // // // //             case 'essay': 
// // // // // // // // //             case 'quiz':
// // // // // // // // //                 return (
// // // // // // // // //                     <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm">
// // // // // // // // //                         <div className="flex items-center gap-4 mb-6">
// // // // // // // // //                             <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full"><FileText size={32}/></div>
// // // // // // // // //                             <h2 className="text-xl font-bold text-gray-900">{activeLesson.title}</h2>
// // // // // // // // //                         </div>
// // // // // // // // //                         <div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6">
// // // // // // // // //                             <div dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
// // // // // // // // //                         </div>
// // // // // // // // //                         <div className="border-t pt-6">
// // // // // // // // //                             <button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-indigo-300 rounded-xl p-8 text-indigo-500 hover:bg-indigo-50 transition-colors">
// // // // // // // // //                                 <Paperclip className="mb-1"/> <span className="font-bold">Upload Jawaban Tugas</span>
// // // // // // // // //                             </button>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 );
// // // // // // // // //             default:
// // // // // // // // //                 return (
// // // // // // // // //                     <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex items-center gap-6 mb-6">
// // // // // // // // //                         <div className="bg-red-600 text-white p-4 rounded-2xl shadow-lg"><FileText size={32}/></div>
// // // // // // // // //                         <div><h2 className="text-2xl font-black text-gray-800">{activeLesson.title}</h2><p className="text-red-600 font-bold text-xs uppercase tracking-widest mt-1">{activeLesson.jp} JP</p></div>
// // // // // // // // //                     </div>
// // // // // // // // //                 );
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;

// // // // // // // // //     const percent = Math.round(progressData?.percent || 0);

// // // // // // // // //     return (
// // // // // // // // //         <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
// // // // // // // // //             <div className="flex flex-col h-screen bg-white font-sans overflow-hidden">
// // // // // // // // //                 {/* --- HEADER --- */}
// // // // // // // // //                 <header className="bg-gray-900 text-white p-4 flex items-center justify-between shrink-0 shadow-md z-40">
// // // // // // // // //                     <div className="flex items-center gap-4">
// // // // // // // // //                         {/* [FIX AXE] Tambahkan title */}
// // // // // // // // //                         <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali"><ArrowLeft size={20}/></Link>
// // // // // // // // //                         <div>
// // // // // // // // //                             <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1>
// // // // // // // // //                             <div className="flex items-center gap-2 mt-0.5">
// // // // // // // // //                                 <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
// // // // // // // // //                                     {/* [FIX AXE] Tambahkan aria-label */}
// // // // // // // // //                                     <div ref={progressBarRef} className="h-full bg-green-500 rounded-full" role="progressbar" aria-label="Progres Belajar"></div>
// // // // // // // // //                                 </div>
// // // // // // // // //                                 <span className="text-[10px] font-bold text-green-400">{percent}% SELESAI</span>
// // // // // // // // //                             </div>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="flex items-center gap-2">
// // // // // // // // //                          <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center font-bold text-xs uppercase shadow-lg border border-white/20">{course?.organizer?.charAt(0)}</div>
// // // // // // // // //                          {/* [FIX AXE] Tambahkan title */}
// // // // // // // // //                          <button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu"><Menu size={18}/></button>
// // // // // // // // //                     </div>
// // // // // // // // //                 </header>

// // // // // // // // //                 <div className="flex flex-1 overflow-hidden relative">
// // // // // // // // //                     {/* --- SIDEBAR KIRI --- */}
// // // // // // // // //                     <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none`}>
// // // // // // // // //                         <div className="p-5 border-b bg-gray-50/50"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3></div>
// // // // // // // // //                         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
// // // // // // // // //                             {course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
// // // // // // // // //                                 <div key={mod._id}>
// // // // // // // // //                                     <div className="flex items-center gap-2 mb-3 px-2">
// // // // // // // // //                                         <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
// // // // // // // // //                                         <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4>
// // // // // // // // //                                     </div>
// // // // // // // // //                                     <div className="space-y-1">
// // // // // // // // //                                         {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
// // // // // // // // //                                             <button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`}>
// // // // // // // // //                                                 {isDone(les._id) ? <CheckCircle className="text-green-500 shrink-0" size={18}/> : <PlayCircle className="text-gray-300 shrink-0" size={18}/>}
// // // // // // // // //                                                 <div className="overflow-hidden">
// // // // // // // // //                                                     <p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p>
// // // // // // // // //                                                     <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')} • {les.jp || 0} JP</p>
// // // // // // // // //                                                 </div>
// // // // // // // // //                                             </button>
// // // // // // // // //                                         ))}
// // // // // // // // //                                     </div>
// // // // // // // // //                                 </div>
// // // // // // // // //                             ))}
// // // // // // // // //                         </div>
// // // // // // // // //                         <div className="p-4 border-t bg-gray-50">
// // // // // // // // //                             <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200">
// // // // // // // // //                                 <HeadphonesIcon size={16}/> Konsultasi Pengajar
// // // // // // // // //                             </button>
// // // // // // // // //                         </div>
// // // // // // // // //                     </aside>

// // // // // // // // //                     {/* --- KONTEN TENGAH --- */}
// // // // // // // // //                     <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar relative">
// // // // // // // // //                         <div className="max-w-4xl mx-auto pb-32">
// // // // // // // // //                             <div className="mb-8 transition-all duration-500 ease-in-out">{renderContent()}</div>
// // // // // // // // //                             {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && (
// // // // // // // // //                                 <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
// // // // // // // // //                                     <div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} />
// // // // // // // // //                                 </div>
// // // // // // // // //                             )}
// // // // // // // // //                         </div>
// // // // // // // // //                         <div className="fixed bottom-0 left-0 lg:left-80 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 md:p-6 flex justify-between items-center z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
// // // // // // // // //                             <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
// // // // // // // // //                             {!isDone(activeLesson?._id) ? (
// // // // // // // // //                                 <button onClick={() => handleMarkComplete(activeLesson?._id)} className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-black text-xs shadow-xl shadow-red-200 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"><CheckCircle size={18}/> Tandai Selesai</button>
// // // // // // // // //                             ) : (
// // // // // // // // //                                 <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-8 py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"><CheckCircle size={18}/> Materi Lulus</div>
// // // // // // // // //                             )}
// // // // // // // // //                         </div>
// // // // // // // // //                     </main>

// // // // // // // // //                     {/* --- CHAT FLYING & POPUP --- */}
// // // // // // // // //                     {/* [FIX AXE] Tambahkan title */}
// // // // // // // // //                     <button onClick={() => setShowChat(!showChat)} className="absolute bottom-24 right-6 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi">
// // // // // // // // //                         <MessageSquare size={24}/>
// // // // // // // // //                         {messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}
// // // // // // // // //                     </button>

// // // // // // // // //                     {showChat && (
// // // // // // // // //                         <div className="absolute bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
// // // // // // // // //                             <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0">
// // // // // // // // //                                 <div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div>
// // // // // // // // //                                 {/* [FIX AXE] Tambahkan title */}
// // // // // // // // //                                 <button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat"><X size={18}/></button>
// // // // // // // // //                             </div>
// // // // // // // // //                             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">
// // // // // // // // //                                 {messages.map((m, i) => (
// // // // // // // // //                                     // [FIX TS] Pastikan user ada sebelum akses _id
// // // // // // // // //                                     <div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}>
// // // // // // // // //                                         <span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span>
// // // // // // // // //                                         <div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>
// // // // // // // // //                                             {m.message}
// // // // // // // // //                                         </div>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 ))}
// // // // // // // // //                                 <div ref={messagesEndRef} />
// // // // // // // // //                             </div>
// // // // // // // // //                             <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0">
// // // // // // // // //                                 <input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} />
// // // // // // // // //                                 {/* [FIX AXE] Tambahkan title */}
// // // // // // // // //                                 <button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim"><Send size={16}/></button>
// // // // // // // // //                             </form>
// // // // // // // // //                         </div>
// // // // // // // // //                     )}
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //         </Protected>
// // // // // // // // //     );
// // // // // // // // // }


// // // // // // // // 'use client';

// // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // import { 
// // // // // // // //     ArrowLeft, CheckCircle, PlayCircle, Lock, 
// // // // // // // //     MessageSquare, FileText, Send, Loader2, 
// // // // // // // //     HeadphonesIcon, Menu, X, BarChart2, Paperclip, 
// // // // // // // //     Mic, RotateCw, Layers, Globe, ChevronUp, ChevronDown, Maximize2, Minimize2 
// // // // // // // // } from 'lucide-react';
// // // // // // // // import Link from 'next/link';

// // // // // // // // export default function CoursePlayPage() {
// // // // // // // //     const params = useParams();
// // // // // // // //     const router = useRouter();
// // // // // // // //     const { user } = useAuth();
// // // // // // // //     const courseId = params?.courseId as string;

// // // // // // // //     // --- STATE ---
// // // // // // // //     const [course, setCourse] = useState<any>(null);
// // // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // // // //     const [progressData, setProgressData] = useState<any>(null);
// // // // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // // // //     const [chatMessage, setChatMessage] = useState('');
// // // // // // // //     const [showChat, setShowChat] = useState(false);
// // // // // // // //     const [showMobileMenu, setShowMobileMenu] = useState(false);
    
// // // // // // // //     // Default: Full Screen (Top 0), Menu Utama Tertutup
// // // // // // // //     const [isFullScreen, setIsFullScreen] = useState(true);

// // // // // // // //     const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
// // // // // // // //     const progressBarRef = useRef<HTMLDivElement>(null);
// // // // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // // // // //     // --- MAIN EFFECT ---
// // // // // // // //     useEffect(() => {
// // // // // // // //         if (!courseId || !user) return;
// // // // // // // //         if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// // // // // // // //             loadData();
// // // // // // // //             return;
// // // // // // // //         }
// // // // // // // //         checkEnrollmentAndLoad();
// // // // // // // //     }, [courseId, user]);

// // // // // // // //     useEffect(() => {
// // // // // // // //         if (progressBarRef.current) {
// // // // // // // //             const percent = Math.round(progressData?.percent || 0);
// // // // // // // //             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
// // // // // // // //             progressBarRef.current.style.width = `${percent}%`;
// // // // // // // //         }
// // // // // // // //     }, [progressData]);

// // // // // // // //     useEffect(() => {
// // // // // // // //         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // // // // //     }, [messages, showChat]);

// // // // // // // //     useEffect(() => {
// // // // // // // //         setFlippedCards({});
// // // // // // // //     }, [activeLesson]);

// // // // // // // //     // --- FUNCTIONS ---
// // // // // // // //     const checkEnrollmentAndLoad = async () => {
// // // // // // // //         try {
// // // // // // // //             setLoading(true);
// // // // // // // //             const statusRes = await api(`/api/courses/${courseId}/enrollment-status`);
// // // // // // // //             if (!statusRes.isEnrolled) {
// // // // // // // //                 alert("Anda belum terdaftar di kursus ini.");
// // // // // // // //                 router.push(`/courses/${courseId}`);
// // // // // // // //             } else {
// // // // // // // //                 loadData();
// // // // // // // //             }
// // // // // // // //         } catch (e) {
// // // // // // // //             console.error("Gagal cek enrollment", e);
// // // // // // // //             router.push(`/courses/${courseId}`);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const loadData = async () => {
// // // // // // // //         try {
// // // // // // // //             setLoading(true);
// // // // // // // //             const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
// // // // // // // //             const cData = res.course || res;
// // // // // // // //             setCourse(cData);
// // // // // // // //             const [prog, msg] = await Promise.all([
// // // // // // // //                 api(`/api/progress/${courseId}`),
// // // // // // // //                 api(`/api/courses/${courseId}/messages`)
// // // // // // // //             ]);
// // // // // // // //             setProgressData(prog);
// // // // // // // //             setMessages(msg || []);
// // // // // // // //             const firstMod = cData.modules?.find((m: any) => m.isActive);
// // // // // // // //             const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
// // // // // // // //             if (firstLes) setActiveLesson(firstLes);
// // // // // // // //         } catch (e) {
// // // // // // // //             console.error("Gagal memuat data", e);
// // // // // // // //         } finally {
// // // // // // // //             setLoading(false);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const handleMarkComplete = async (lessonId: string) => {
// // // // // // // //         try {
// // // // // // // //             await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
// // // // // // // //             const updated = await api(`/api/progress/${courseId}`);
// // // // // // // //             setProgressData(updated);
// // // // // // // //         } catch (e) { alert("Gagal update progres"); }
// // // // // // // //     };

// // // // // // // //     const handleSendChat = async (e: React.FormEvent) => {
// // // // // // // //         e.preventDefault();
// // // // // // // //         if (!chatMessage.trim()) return;
// // // // // // // //         try {
// // // // // // // //             const res = await api(`/api/courses/${courseId}/messages`, { method: 'POST', body: { text: chatMessage } });
// // // // // // // //             setMessages([...messages, res]);
// // // // // // // //             setChatMessage('');
// // // // // // // //         } catch (e) { alert("Gagal kirim pesan"); }
// // // // // // // //     };

// // // // // // // //     const isDone = (id: string) => progressData?.completedLessons?.includes(id);

// // // // // // // //     // --- RENDERER KONTEN ---
// // // // // // // //     const renderContent = () => {
// // // // // // // //         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
// // // // // // // //         switch (activeLesson.type) {
// // // // // // // //             case 'video_url': return <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
// // // // // // // //             case 'embed': return <div className="aspect-[4/3] md:aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg relative"><iframe src={activeLesson.videoUrl || activeLesson.content} className="w-full h-full" title="Embedded Content" allowFullScreen /></div>;
// // // // // // // //             case 'audio': return <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl text-white flex flex-col items-center justify-center min-h-[300px]"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse"><Mic size={48} /></div><h2 className="text-2xl font-bold mb-2 text-center">{activeLesson.title}</h2><p className="text-pink-100 text-sm mb-8">Dengarkan materi audio ini.</p><audio controls src={getImageUrl(activeLesson.fileUrl)} className="w-full max-w-lg rounded-full shadow-lg" /></div>;
// // // // // // // //             case 'flashcard': 
// // // // // // // //                 let cards = []; try { cards = JSON.parse(activeLesson.content || '[]'); } catch (e) { cards = []; }
// // // // // // // //                 return <div className="space-y-6"><div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 mb-4"><Layers size={24}/><div><h3 className="font-bold">Mode Hafalan</h3><p className="text-xs">Klik kartu untuk membalik.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card:any, idx:number) => (<div key={idx} onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))} className="relative h-64 w-full cursor-pointer perspective-1000 group"><div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${flippedCards[idx] ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pertanyaan</span><p className="text-lg font-bold text-gray-800">{card.front}</p></div><div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180"><span className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-4">Jawaban</span><p className="text-lg font-bold">{card.back}</p></div></div></div>))}</div></div>;
// // // // // // // //             case 'slide': return <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/></div>;
// // // // // // // //             case 'image': return <div className="rounded-2xl overflow-hidden border shadow-lg bg-gray-900 flex items-center justify-center"><img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto max-h-[500px]"/></div>;
// // // // // // // //             case 'download_doc': return <div className="bg-green-50 p-8 rounded-3xl border border-green-200 flex flex-col items-center justify-center gap-4 text-center"><div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={32}/></div><h2 className="text-xl font-bold text-green-900">{activeLesson.title}</h2><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2">Download Dokumen</a></div>;
// // // // // // // //             case 'poll': return <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.pollQuestion}</h2><div className="space-y-3">{activeLesson.pollOptions?.map((opt:string, i:number) => <button key={i} className="w-full text-left p-4 bg-purple-50 border-2 border-purple-100 rounded-xl font-bold text-purple-900">{opt}</button>)}</div></div>;
// // // // // // // //             case 'essay': case 'quiz': return <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2><div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6"><div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /></div><div className="border-t pt-6">{activeLesson.type === 'quiz' ? <Link href={`/courses/${courseId}/quiz/${activeLesson._id}`} className="block w-full text-center bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">Mulai Kuis</Link> : <button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-indigo-300 rounded-xl p-8 text-indigo-500 font-bold"><Paperclip className="mb-1"/> Upload Jawaban</button>}</div></div>;
// // // // // // // //             default: return <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex flex-col gap-6"><h2 className="text-2xl font-black text-gray-800">{activeLesson.title}</h2><div className="prose prose-red max-w-none bg-white p-6 rounded-2xl border border-red-100"><div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} /></div></div>;
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// // // // // // // //     const percent = Math.round(progressData?.percent || 0);

// // // // // // // //     return (
// // // // // // // //         <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
// // // // // // // //             {/* CONTAINER UTAMA (Slide Up/Down) */}
// // // // // // // //             <div className={`fixed left-0 right-0 bottom-0 z-[9999] bg-white flex flex-col font-sans transition-all duration-500 ease-in-out shadow-2xl ${isFullScreen ? 'top-0' : 'top-[80px]'}`}>
                
// // // // // // // //                 {/* --- HEADER PLAYER (MERAH) --- */}
// // // // // // // //                 <header className="bg-[#B91C1C] text-white p-4 flex items-center justify-between shrink-0 shadow-md relative z-50">
                    
// // // // // // // //                     {/* [FIX] TOMBOL LIDAH (HANDLE) */}
// // // // // // // //                     {/* Warna: bg-white (Putih), Icon: text-red (Merah) */}
// // // // // // // //                     {/* Posisi: top-0 (Menempel di bibir atas header) */}
// // // // // // // //                     <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] flex justify-center">
// // // // // // // //                         <button 
// // // // // // // //                             onClick={() => setIsFullScreen(!isFullScreen)} 
// // // // // // // //                             className="w-16 h-6 bg-white border-x border-b border-white/50 rounded-b-xl shadow-lg flex items-center justify-center text-[#B91C1C] hover:bg-gray-100 hover:h-7 transition-all group"
// // // // // // // //                             title={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// // // // // // // //                             aria-label={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// // // // // // // //                         >
// // // // // // // //                             {/* Jika FullScreen (Menu Tertutup) -> Icon Turun (Buka Menu) */}
// // // // // // // //                             {/* Jika Menu Terbuka -> Icon Naik (Tutup Menu) */}
// // // // // // // //                             {isFullScreen ? (
// // // // // // // //                                 <ChevronDown size={20} className="group-hover:mt-1 transition-all font-bold"/>
// // // // // // // //                             ) : (
// // // // // // // //                                 <ChevronUp size={20} className="group-hover:-mt-1 transition-all font-bold"/>
// // // // // // // //                             )}
// // // // // // // //                         </button>
// // // // // // // //                     </div>

// // // // // // // //                     <div className="flex items-center gap-4">
// // // // // // // //                         <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali ke Kursus"><ArrowLeft size={20}/></Link>
// // // // // // // //                         <div>
// // // // // // // //                             <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1>
// // // // // // // //                             <div className="flex items-center gap-2 mt-0.5">
// // // // // // // //                                 <div className="w-24 h-1.5 bg-red-800 rounded-full overflow-hidden border border-red-700">
// // // // // // // //                                     <div ref={progressBarRef} className="h-full bg-white rounded-full" role="progressbar" aria-label="Progres Belajar"></div>
// // // // // // // //                                 </div>
// // // // // // // //                                 <span className="text-[10px] font-bold text-red-100">{percent}% SELESAI</span>
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                     </div>
                    
// // // // // // // //                     <div className="flex items-center gap-3">
// // // // // // // //                         <div className="w-8 h-8 rounded bg-white text-[#B91C1C] flex items-center justify-center font-bold text-xs uppercase shadow-lg">{course?.organizer?.charAt(0)}</div>
// // // // // // // //                         <button 
// // // // // // // //                             className="lg:hidden p-2 bg-white/10 rounded-xl" 
// // // // // // // //                             onClick={() => setShowMobileMenu(!showMobileMenu)} 
// // // // // // // //                             title="Menu"
// // // // // // // //                             aria-label="Buka Menu"
// // // // // // // //                         >
// // // // // // // //                             <Menu size={18}/>
// // // // // // // //                         </button>
// // // // // // // //                     </div>
// // // // // // // //                 </header>

// // // // // // // //                 <div className="flex flex-1 overflow-hidden relative">
// // // // // // // //                     {/* SIDEBAR KIRI */}
// // // // // // // //                     <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
// // // // // // // //                         <div className="p-5 border-b bg-gray-50/50 flex justify-between items-center">
// // // // // // // //                             <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3>
// // // // // // // //                             <button 
// // // // // // // //                                 onClick={() => setShowMobileMenu(false)} 
// // // // // // // //                                 className="lg:hidden text-gray-400 hover:text-red-600"
// // // // // // // //                                 title="Tutup Menu"
// // // // // // // //                                 aria-label="Tutup Menu"
// // // // // // // //                             >
// // // // // // // //                                 <X size={18}/>
// // // // // // // //                             </button>
// // // // // // // //                         </div>
// // // // // // // //                         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
// // // // // // // //                             {course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
// // // // // // // //                                 <div key={mod._id}>
// // // // // // // //                                     <div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div>
// // // // // // // //                                     <div className="space-y-1">
// // // // // // // //                                         {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
// // // // // // // //                                             <button 
// // // // // // // //                                                 key={les._id} 
// // // // // // // //                                                 onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} 
// // // // // // // //                                                 className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`}
// // // // // // // //                                                 aria-label={`Pilih materi ${les.title}`}
// // // // // // // //                                             >
// // // // // // // //                                                 {isDone(les._id) ? <CheckCircle className="text-green-500 shrink-0" size={18}/> : <PlayCircle className="text-gray-300 shrink-0" size={18}/>}
// // // // // // // //                                                 <div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div>
// // // // // // // //                                             </button>
// // // // // // // //                                         ))}
// // // // // // // //                                     </div>
// // // // // // // //                                 </div>
// // // // // // // //                             ))}
// // // // // // // //                         </div>
// // // // // // // //                         <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
// // // // // // // //                     </aside>

// // // // // // // //                     {/* MAIN CONTENT */}
// // // // // // // //                     <main className="flex-1 relative flex flex-col min-w-0">
// // // // // // // //                         <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar pb-32">
// // // // // // // //                             <div className="max-w-4xl mx-auto">
// // // // // // // //                                 <div className="mb-8 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">{renderContent()}</div>
// // // // // // // //                                 {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && activeLesson?.content && !['flashcard', 'audio', 'embed'].includes(activeLesson.type) && (
// // // // // // // //                                     <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"><div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} /></div>
// // // // // // // //                                 )}
// // // // // // // //                             </div>
// // // // // // // //                         </div>
                        
// // // // // // // //                         {/* FOOTER PLAYER */}
// // // // // // // //                         <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 md:p-6 flex justify-between items-center z-20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
// // // // // // // //                             <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
// // // // // // // //                             {!isDone(activeLesson?._id) ? (
// // // // // // // //                                 <button onClick={() => handleMarkComplete(activeLesson?._id)} className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-black text-xs shadow-xl shadow-red-200 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"><CheckCircle size={18}/> Tandai Selesai</button>
// // // // // // // //                             ) : (
// // // // // // // //                                 <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-8 py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"><CheckCircle size={18}/> Materi Lulus</div>
// // // // // // // //                             )}
// // // // // // // //                         </div>
// // // // // // // //                     </main>

// // // // // // // //                     {/* CHAT BUTTON */}
// // // // // // // //                     <button 
// // // // // // // //                         onClick={() => setShowChat(!showChat)} 
// // // // // // // //                         className="absolute right-6 bottom-28 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center"
// // // // // // // //                         title="Buka Ruang Diskusi"
// // // // // // // //                         aria-label="Buka Ruang Diskusi"
// // // // // // // //                     >
// // // // // // // //                         <MessageSquare size={24}/>
// // // // // // // //                         {messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}
// // // // // // // //                     </button>

// // // // // // // //                     {showChat && (
// // // // // // // //                         <div className="absolute right-6 bottom-28 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
// // // // // // // //                             <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0">
// // // // // // // //                                 <div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div>
// // // // // // // //                                 <button 
// // // // // // // //                                     onClick={() => setShowChat(false)} 
// // // // // // // //                                     className="hover:bg-white/20 p-1 rounded-full"
// // // // // // // //                                     title="Tutup Chat"
// // // // // // // //                                     aria-label="Tutup Chat"
// // // // // // // //                                 >
// // // // // // // //                                     <X size={18}/>
// // // // // // // //                                 </button>
// // // // // // // //                             </div>
// // // // // // // //                             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">
// // // // // // // //                                 {messages.map((m, i) => (
// // // // // // // //                                     <div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}>
// // // // // // // //                                         <span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span>
// // // // // // // //                                         <div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>
// // // // // // // //                                             {m.message}
// // // // // // // //                                         </div>
// // // // // // // //                                     </div>
// // // // // // // //                                 ))}
// // // // // // // //                                 <div ref={messagesEndRef} />
// // // // // // // //                             </div>
// // // // // // // //                             <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0">
// // // // // // // //                                 <input 
// // // // // // // //                                     className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" 
// // // // // // // //                                     placeholder="Ketik pesan..." 
// // // // // // // //                                     value={chatMessage} 
// // // // // // // //                                     onChange={e => setChatMessage(e.target.value)} 
// // // // // // // //                                     aria-label="Ketik pesan chat"
// // // // // // // //                                 />
// // // // // // // //                                 <button 
// // // // // // // //                                     type="submit" 
// // // // // // // //                                     className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all"
// // // // // // // //                                     title="Kirim Pesan"
// // // // // // // //                                     aria-label="Kirim Pesan"
// // // // // // // //                                 >
// // // // // // // //                                     <Send size={16}/>
// // // // // // // //                                 </button>
// // // // // // // //                             </form>
// // // // // // // //                         </div>
// // // // // // // //                     )}
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         </Protected>
// // // // // // // //     );
// // // // // // // // }

// // // // // // // 'use client';

// // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // import Protected from '@/components/Protected';
// // // // // // // import { 
// // // // // // //     ArrowLeft, CheckCircle, PlayCircle, Lock, 
// // // // // // //     MessageSquare, FileText, Send, Loader2, 
// // // // // // //     HeadphonesIcon, Menu, X, BarChart2, Paperclip, 
// // // // // // //     Mic, RotateCw, Layers, Globe, ChevronUp, ChevronDown, Maximize2, Minimize2 
// // // // // // // } from 'lucide-react';
// // // // // // // import Link from 'next/link';

// // // // // // // // [BARU] Import komponen Game
// // // // // // // import GameMemory from '@/components/course/GameMemory';

// // // // // // // export default function CoursePlayPage() {
// // // // // // //     const params = useParams();
// // // // // // //     const router = useRouter();
// // // // // // //     const { user } = useAuth();
// // // // // // //     const courseId = params?.courseId as string;

// // // // // // //     // --- STATE ---
// // // // // // //     const [course, setCourse] = useState<any>(null);
// // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // // //     const [progressData, setProgressData] = useState<any>(null);
// // // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // // //     const [chatMessage, setChatMessage] = useState('');
// // // // // // //     const [showChat, setShowChat] = useState(false);
// // // // // // //     const [showMobileMenu, setShowMobileMenu] = useState(false);
// // // // // // //     const [isFullScreen, setIsFullScreen] = useState(true);

// // // // // // //     const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
// // // // // // //     const progressBarRef = useRef<HTMLDivElement>(null);
// // // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // // // //     // --- MAIN EFFECT ---
// // // // // // //     useEffect(() => {
// // // // // // //         if (!courseId || !user) return;
// // // // // // //         if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// // // // // // //             loadData();
// // // // // // //             return;
// // // // // // //         }
// // // // // // //         checkEnrollmentAndLoad();
// // // // // // //     }, [courseId, user]);

// // // // // // //     useEffect(() => {
// // // // // // //         if (progressBarRef.current) {
// // // // // // //             const percent = Math.round(progressData?.percent || 0);
// // // // // // //             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
// // // // // // //             progressBarRef.current.style.width = `${percent}%`;
// // // // // // //         }
// // // // // // //     }, [progressData]);

// // // // // // //     useEffect(() => {
// // // // // // //         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // // // //     }, [messages, showChat]);

// // // // // // //     useEffect(() => {
// // // // // // //         setFlippedCards({});
// // // // // // //     }, [activeLesson]);

// // // // // // //     // --- FUNCTIONS ---
// // // // // // //     const checkEnrollmentAndLoad = async () => {
// // // // // // //         try {
// // // // // // //             setLoading(true);
// // // // // // //             const statusRes = await api(`/api/courses/${courseId}/enrollment-status`);
// // // // // // //             if (!statusRes.isEnrolled) {
// // // // // // //                 alert("Anda belum terdaftar di kursus ini.");
// // // // // // //                 router.push(`/courses/${courseId}`);
// // // // // // //             } else {
// // // // // // //                 loadData();
// // // // // // //             }
// // // // // // //         } catch (e) {
// // // // // // //             console.error("Gagal cek enrollment", e);
// // // // // // //             router.push(`/courses/${courseId}`);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const loadData = async () => {
// // // // // // //         try {
// // // // // // //             setLoading(true);
// // // // // // //             const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
// // // // // // //             const cData = res.course || res;
// // // // // // //             setCourse(cData);
// // // // // // //             const [prog, msg] = await Promise.all([
// // // // // // //                 api(`/api/progress/${courseId}`),
// // // // // // //                 api(`/api/courses/${courseId}/messages`)
// // // // // // //             ]);
// // // // // // //             setProgressData(prog);
// // // // // // //             setMessages(msg || []);
// // // // // // //             const firstMod = cData.modules?.find((m: any) => m.isActive);
// // // // // // //             const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
// // // // // // //             if (firstLes) setActiveLesson(firstLes);
// // // // // // //         } catch (e) {
// // // // // // //             console.error("Gagal memuat data", e);
// // // // // // //         } finally {
// // // // // // //             setLoading(false);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const handleMarkComplete = async (lessonId: string) => {
// // // // // // //         try {
// // // // // // //             await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
// // // // // // //             const updated = await api(`/api/progress/${courseId}`);
// // // // // // //             setProgressData(updated);
// // // // // // //         } catch (e) { alert("Gagal update progres"); }
// // // // // // //     };

// // // // // // //     const handleSendChat = async (e: React.FormEvent) => {
// // // // // // //         e.preventDefault();
// // // // // // //         if (!chatMessage.trim()) return;
// // // // // // //         try {
// // // // // // //             const res = await api(`/api/courses/${courseId}/messages`, { method: 'POST', body: { text: chatMessage } });
// // // // // // //             setMessages([...messages, res]);
// // // // // // //             setChatMessage('');
// // // // // // //         } catch (e) { alert("Gagal kirim pesan"); }
// // // // // // //     };

// // // // // // //     const isDone = (id: string) => progressData?.completedLessons?.includes(id);

// // // // // // //     // --- RENDERER KONTEN ---
// // // // // // //     const renderContent = () => {
// // // // // // //         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
// // // // // // //         switch (activeLesson.type) {
// // // // // // //             case 'video_url': return <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
// // // // // // //             case 'embed': return <div className="aspect-[4/3] md:aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg relative"><iframe src={activeLesson.videoUrl || activeLesson.content} className="w-full h-full" title="Embedded Content" allowFullScreen /></div>;
// // // // // // //             case 'audio': return <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl text-white flex flex-col items-center justify-center min-h-[300px]"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse"><Mic size={48} /></div><h2 className="text-2xl font-bold mb-2 text-center">{activeLesson.title}</h2><p className="text-pink-100 text-sm mb-8">Dengarkan materi audio ini.</p><audio controls src={getImageUrl(activeLesson.fileUrl)} className="w-full max-w-lg rounded-full shadow-lg" /></div>;
            
// // // // // // //             // [BARU] INTEGRASI GAME MEMORY
// // // // // // //             case 'game_memory': 
// // // // // // //                 return (
// // // // // // //                     <GameMemory 
// // // // // // //                         content={activeLesson.content} 
// // // // // // //                         lessonId={activeLesson._id}
// // // // // // //                         onComplete={handleMarkComplete} 
// // // // // // //                     />
// // // // // // //                 );

// // // // // // //             case 'flashcard': 
// // // // // // //                 let cards = []; try { cards = JSON.parse(activeLesson.content || '[]'); } catch (e) { cards = []; }
// // // // // // //                 return <div className="space-y-6"><div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 mb-4"><Layers size={24}/><div><h3 className="font-bold">Mode Hafalan</h3><p className="text-xs">Klik kartu untuk membalik.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card:any, idx:number) => (<div key={idx} onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))} className="relative h-64 w-full cursor-pointer perspective-1000 group"><div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${flippedCards[idx] ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pertanyaan</span><p className="text-lg font-bold text-gray-800">{card.front}</p></div><div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180"><span className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-4">Jawaban</span><p className="text-lg font-bold">{card.back}</p></div></div></div>))}</div></div>;
// // // // // // //             case 'slide': return <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/></div>;
// // // // // // //             case 'image': return <div className="rounded-2xl overflow-hidden border shadow-lg bg-gray-900 flex items-center justify-center"><img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto max-h-[500px]"/></div>;
// // // // // // //             case 'download_doc': return <div className="bg-green-50 p-8 rounded-3xl border border-green-200 flex flex-col items-center justify-center gap-4 text-center"><div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={32}/></div><h2 className="text-xl font-bold text-green-900">{activeLesson.title}</h2><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2">Download Dokumen</a></div>;
// // // // // // //             case 'poll': return <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.pollQuestion}</h2><div className="space-y-3">{activeLesson.pollOptions?.map((opt:string, i:number) => <button key={i} className="w-full text-left p-4 bg-purple-50 border-2 border-purple-100 rounded-xl font-bold text-purple-900">{opt}</button>)}</div></div>;
// // // // // // //             case 'essay': case 'quiz': return <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2><div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6"><div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /></div><div className="border-t pt-6">{activeLesson.type === 'quiz' ? <Link href={`/courses/${courseId}/quiz/${activeLesson._id}`} className="block w-full text-center bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">Mulai Kuis</Link> : <button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-indigo-300 rounded-xl p-8 text-indigo-500 font-bold"><Paperclip className="mb-1"/> Upload Jawaban</button>}</div></div>;
// // // // // // //             default: return <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex flex-col gap-6"><h2 className="text-2xl font-black text-gray-800">{activeLesson.title}</h2><div className="prose prose-red max-w-none bg-white p-6 rounded-2xl border border-red-100"><div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} /></div></div>;
// // // // // // //         }
// // // // // // //     };

// // // // // // //     if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// // // // // // //     const percent = Math.round(progressData?.percent || 0);

// // // // // // //     return (
// // // // // // //         <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
// // // // // // //             <div className={`fixed left-0 right-0 bottom-0 z-[9999] bg-white flex flex-col font-sans transition-all duration-500 ease-in-out shadow-2xl ${isFullScreen ? 'top-0' : 'top-[80px]'}`}>
                
// // // // // // //                 <header className="bg-[#B91C1C] text-white p-4 flex items-center justify-between shrink-0 shadow-md relative z-50">
                    
// // // // // // //                     <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] flex justify-center">
// // // // // // //                         <button 
// // // // // // //                             onClick={() => setIsFullScreen(!isFullScreen)} 
// // // // // // //                             className="w-16 h-6 bg-white border-x border-b border-white/50 rounded-b-xl shadow-lg flex items-center justify-center text-[#B91C1C] hover:bg-gray-100 hover:h-7 transition-all group"
// // // // // // //                             title={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// // // // // // //                             aria-label={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// // // // // // //                         >
// // // // // // //                             {isFullScreen ? <ChevronDown size={20} className="group-hover:mt-1 transition-all font-bold"/> : <ChevronUp size={20} className="group-hover:-mt-1 transition-all font-bold"/>}
// // // // // // // //                         </button>
// // // // // // // //                     </div>

// // // // // // // //                     <div className="flex items-center gap-4">
// // // // // // // //                         <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali ke Kursus"><ArrowLeft size={20}/></Link>
// // // // // // // //                         <div>
// // // // // // // //                             <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1>
// // // // // // // //                             <div className="flex items-center gap-2 mt-0.5">
// // // // // // // //                                 <div className="w-24 h-1.5 bg-red-800 rounded-full overflow-hidden border border-red-700">
// // // // // // // //                                     <div ref={progressBarRef} className="h-full bg-white rounded-full" role="progressbar" aria-label="Progres Belajar"></div>
// // // // // // // //                                 </div>
// // // // // // // //                                 <span className="text-[10px] font-bold text-red-100">{percent}% SELESAI</span>
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                     </div>
                    
// // // // // // // //                     <div className="flex items-center gap-3">
// // // // // // // //                         <div className="w-8 h-8 rounded bg-white text-[#B91C1C] flex items-center justify-center font-bold text-xs uppercase shadow-lg">{course?.organizer?.charAt(0)}</div>
// // // // // // // //                         <button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu" aria-label="Buka Menu"><Menu size={18}/></button>
// // // // // // // //                     </div>
// // // // // // // //                 </header>

// // // // // // // //                 <div className="flex flex-1 overflow-hidden relative">
// // // // // // // //                     <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
// // // // // // // //                         <div className="p-5 border-b bg-gray-50/50 flex justify-between items-center"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3><button onClick={() => setShowMobileMenu(false)} className="lg:hidden text-gray-400 hover:text-red-600" title="Tutup Menu" aria-label="Tutup Menu"><X size={18}/></button></div>
// // // // // // // //                         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
// // // // // // // //                             {course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
// // // // // // // //                                 <div key={mod._id}>
// // // // // // // //                                     <div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div>
// // // // // // // //                                     <div className="space-y-1">
// // // // // // // //                                         {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
// // // // // // // //                                             <button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`} aria-label={`Pilih materi ${les.title}`}>
// // // // // // // //                                                 {isDone(les._id) ? <CheckCircle className="text-green-500 shrink-0" size={18}/> : <PlayCircle className="text-gray-300 shrink-0" size={18}/>}
// // // // // // // //                                                 <div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div>
// // // // // // // //                                             </button>
// // // // // // // //                                         ))}
// // // // // // // //                                     </div>
// // // // // // // //                                 </div>
// // // // // // // //                             ))}
// // // // // // // //                         </div>
// // // // // // // //                         <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
// // // // // // // //                     </aside>

// // // // // // // //                     <main className="flex-1 relative flex flex-col min-w-0">
// // // // // // // //                         <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar pb-32">
// // // // // // // //                             <div className="max-w-4xl mx-auto">
// // // // // // // //                                 <div className="mb-8 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">{renderContent()}</div>
// // // // // // // //                                 {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && activeLesson?.content && !['flashcard', 'audio', 'embed', 'game_memory'].includes(activeLesson.type) && (
// // // // // // // //                                     <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"><div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} /></div>
// // // // // // // //                                 )}
// // // // // // // //                             </div>
// // // // // // // //                         </div>
                        
// // // // // // // //                         <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 md:p-6 flex justify-between items-center z-20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
// // // // // // // //                             <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
// // // // // // // //                             {!isDone(activeLesson?._id) ? (
// // // // // // // //                                 <button onClick={() => handleMarkComplete(activeLesson?._id)} className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-black text-xs shadow-xl shadow-red-200 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"><CheckCircle size={18}/> Tandai Selesai</button>
// // // // // // // //                             ) : (
// // // // // // // //                                 <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-8 py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"><CheckCircle size={18}/> Materi Lulus</div>
// // // // // // // //                             )}
// // // // // // // //                         </div>
// // // // // // // //                     </main>

// // // // // // // //                     <button onClick={() => setShowChat(!showChat)} className="absolute right-6 bottom-28 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi"><MessageSquare size={24}/>{messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}</button>
// // // // // // // //                     {showChat && (
// // // // // // // //                         <div className="absolute right-6 bottom-28 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
// // // // // // // //                             <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0"><div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div><button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat" aria-label="Tutup Chat"><X size={18}/></button></div>
// // // // // // // //                             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">{messages.map((m, i) => (<div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}><span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span><div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div></div>))}<div ref={messagesEndRef} /></div>
// // // // // // // //                             <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0"><input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} aria-label="Ketik pesan chat"/><button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button></form>
// // // // // // // //                         </div>
// // // // // // // //                     )}
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         </Protected>
// // // // // // // //     );
// // // // // // // // }

// // // // // // // 'use client';

// // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // import Protected from '@/components/Protected';
// // // // // // // import { 
// // // // // // //     ArrowLeft, CheckCircle, PlayCircle, Lock, 
// // // // // // //     MessageSquare, FileText, Send, Loader2, 
// // // // // // //     HeadphonesIcon, Menu, X, BarChart2, Paperclip, 
// // // // // // //     Mic, RotateCw, Layers, Globe, ChevronUp, ChevronDown, Maximize2, Minimize2,
// // // // // // //     Smile 
// // // // // // // } from 'lucide-react';
// // // // // // // import Link from 'next/link';

// // // // // // // // Import komponen Game
// // // // // // // import GameMemory from '@/components/course/GameMemory';
// // // // // // // import GameScavenger from '@/components/course/GameScavenger';

// // // // // // // export default function CoursePlayPage() {
// // // // // // //     const params = useParams();
// // // // // // //     const router = useRouter();
// // // // // // //     const { user } = useAuth();
// // // // // // //     const courseId = params?.courseId as string;

// // // // // // //     // --- STATE ---
// // // // // // //     const [course, setCourse] = useState<any>(null);
// // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // // //     const [progressData, setProgressData] = useState<any>(null);
// // // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // // //     const [chatMessage, setChatMessage] = useState('');
// // // // // // //     const [showChat, setShowChat] = useState(false);
// // // // // // //     const [showMobileMenu, setShowMobileMenu] = useState(false);
// // // // // // //     const [isFullScreen, setIsFullScreen] = useState(true);

// // // // // // //     const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
// // // // // // //     const progressBarRef = useRef<HTMLDivElement>(null);
// // // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // // // //     // --- MAIN EFFECT ---
// // // // // // //     useEffect(() => {
// // // // // // //         if (!courseId || !user) return;
// // // // // // //         if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// // // // // // //             loadData();
// // // // // // //             return;
// // // // // // //         }
// // // // // // //         checkEnrollmentAndLoad();
// // // // // // //     }, [courseId, user]);

// // // // // // //     useEffect(() => {
// // // // // // //         if (progressBarRef.current) {
// // // // // // //             const percent = Math.round(progressData?.percent || 0);
// // // // // // //             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
// // // // // // //             progressBarRef.current.style.width = `${percent}%`;
// // // // // // //         }
// // // // // // //     }, [progressData]);

// // // // // // //     useEffect(() => {
// // // // // // //         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // // // //     }, [messages, showChat]);

// // // // // // //     useEffect(() => {
// // // // // // //         setFlippedCards({});
// // // // // // //     }, [activeLesson]);

// // // // // // //     // --- FUNCTIONS ---
// // // // // // //     const checkEnrollmentAndLoad = async () => {
// // // // // // //         try {
// // // // // // //             setLoading(true);
// // // // // // //             const statusRes = await api(`/api/courses/${courseId}/enrollment-status`);
// // // // // // //             if (!statusRes.isEnrolled) {
// // // // // // //                 alert("Anda belum terdaftar di kursus ini.");
// // // // // // //                 router.push(`/courses/${courseId}`);
// // // // // // //             } else {
// // // // // // //                 loadData();
// // // // // // //             }
// // // // // // //         } catch (e) {
// // // // // // //             console.error("Gagal cek enrollment", e);
// // // // // // //             router.push(`/courses/${courseId}`);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const loadData = async () => {
// // // // // // //         try {
// // // // // // //             setLoading(true);
// // // // // // //             const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
// // // // // // //             const cData = res.course || res;
// // // // // // //             setCourse(cData);
// // // // // // //             const [prog, msg] = await Promise.all([
// // // // // // //                 api(`/api/progress/${courseId}`),
// // // // // // //                 api(`/api/courses/${courseId}/messages`)
// // // // // // //             ]);
// // // // // // //             setProgressData(prog);
// // // // // // //             setMessages(msg || []);
// // // // // // //             const firstMod = cData.modules?.find((m: any) => m.isActive);
// // // // // // //             const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
// // // // // // //             if (firstLes) setActiveLesson(firstLes);
// // // // // // //         } catch (e) {
// // // // // // //             console.error("Gagal memuat data", e);
// // // // // // //         } finally {
// // // // // // //             setLoading(false);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const handleMarkComplete = async (lessonId: string) => {
// // // // // // //         try {
// // // // // // //             await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
// // // // // // //             const updated = await api(`/api/progress/${courseId}`);
// // // // // // //             setProgressData(updated);
// // // // // // //         } catch (e) { alert("Gagal update progres"); }
// // // // // // //     };

// // // // // // //     const handleSendChat = async (e: React.FormEvent) => {
// // // // // // //         e.preventDefault();
// // // // // // //         if (!chatMessage.trim()) return;
// // // // // // //         try {
// // // // // // //             const res = await api(`/api/courses/${courseId}/messages`, { method: 'POST', body: { text: chatMessage } });
// // // // // // //             setMessages([...messages, res]);
// // // // // // //             setChatMessage('');
// // // // // // //         } catch (e) { alert("Gagal kirim pesan"); }
// // // // // // //     };

// // // // // // //     const isDone = (id: string) => progressData?.completedLessons?.includes(id);

// // // // // // //     // --- RENDERER KONTEN ---
// // // // // // //     const renderContent = () => {
// // // // // // //         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
// // // // // // //         switch (activeLesson.type) {
// // // // // // //             case 'video_url': return <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
// // // // // // //             case 'embed': return <div className="aspect-[4/3] md:aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg relative"><iframe src={activeLesson.videoUrl || activeLesson.content} className="w-full h-full" title="Embedded Content" allowFullScreen /></div>;
// // // // // // //             case 'audio': return <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl text-white flex flex-col items-center justify-center min-h-[300px]"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse"><Mic size={48} /></div><h2 className="text-2xl font-bold mb-2 text-center">{activeLesson.title}</h2><p className="text-pink-100 text-sm mb-8">Dengarkan materi audio ini.</p><audio controls src={getImageUrl(activeLesson.fileUrl)} className="w-full max-w-lg rounded-full shadow-lg" /></div>;
            
// // // // // // //             // GAMES INTEGRATION
// // // // // // //             case 'game_memory': return <GameMemory content={activeLesson.content} lessonId={activeLesson._id} onComplete={handleMarkComplete} />;
// // // // // // //             case 'game_scavenger': return <GameScavenger content={activeLesson.content} lessonId={activeLesson._id} onComplete={handleMarkComplete} />;
// // // // // // //             case 'game_emoji': 
// // // // // // //                 return (
// // // // // // //                     <div className="bg-yellow-50 p-8 rounded-3xl border-2 border-yellow-200 shadow-sm relative overflow-hidden">
// // // // // // //                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
// // // // // // //                         <div className="text-center mb-8 relative z-10">
// // // // // // //                             <div className="inline-block p-3 bg-white rounded-full shadow-md mb-3 text-yellow-500 border border-yellow-100"><Smile size={32} /></div>
// // // // // // //                             <h2 className="text-2xl font-black text-yellow-800">🤔 Tebak Kode Emoji</h2>
// // // // // // //                             <p className="text-yellow-700 text-sm">Pecahkan teka-teki emoji di bawah ini!</p>
// // // // // // //                         </div>
// // // // // // //                         <div className="space-y-6 max-w-2xl mx-auto relative z-10">
// // // // // // //                             {activeLesson.questions?.map((q: any, idx: number) => (
// // // // // // //                                 <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100 text-center">
// // // // // // //                                     <div className="text-6xl mb-4 animate-bounce" dangerouslySetInnerHTML={{__html: q.question}}></div>
// // // // // // //                                     <input className="w-full p-3 border-2 border-gray-200 rounded-xl text-center font-bold text-lg focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 outline-none uppercase tracking-widest placeholder:normal-case placeholder:font-normal placeholder:tracking-normal transition-all" placeholder="Ketik jawabanmu..."/>
// // // // // // //                                 </div>
// // // // // // //                             ))}
// // // // // // //                         </div>
// // // // // // //                         <div className="mt-8 text-center"><button onClick={() => handleMarkComplete(activeLesson._id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-yellow-200 transition-all active:scale-95">Kirim Jawaban</button></div>
// // // // // // //                     </div>
// // // // // // //                 );

// // // // // // //             case 'flashcard': 
// // // // // // //                 let cards = []; try { cards = JSON.parse(activeLesson.content || '[]'); } catch (e) { cards = []; }
// // // // // // //                 return <div className="space-y-6"><div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 mb-4"><Layers size={24}/><div><h3 className="font-bold">Mode Hafalan</h3><p className="text-xs">Klik kartu untuk membalik.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card:any, idx:number) => (<div key={idx} onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))} className="relative h-64 w-full cursor-pointer perspective-1000 group"><div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${flippedCards[idx] ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pertanyaan</span><p className="text-lg font-bold text-gray-800">{card.front}</p></div><div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180"><span className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-4">Jawaban</span><p className="text-lg font-bold">{card.back}</p></div></div></div>))}</div></div>;
// // // // // // //             case 'slide': return <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/></div>;
// // // // // // //             case 'image': return <div className="rounded-2xl overflow-hidden border shadow-lg bg-gray-900 flex items-center justify-center"><img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto max-h-[500px]"/></div>;
// // // // // // //             case 'download_doc': return <div className="bg-green-50 p-8 rounded-3xl border border-green-200 flex flex-col items-center justify-center gap-4 text-center"><div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={32}/></div><h2 className="text-xl font-bold text-green-900">{activeLesson.title}</h2><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2">Download Dokumen</a></div>;
// // // // // // //             case 'poll': return <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.pollQuestion}</h2><div className="space-y-3">{activeLesson.pollOptions?.map((opt:string, i:number) => <button key={i} className="w-full text-left p-4 bg-purple-50 border-2 border-purple-100 rounded-xl font-bold text-purple-900">{opt}</button>)}</div></div>;
// // // // // // //             case 'essay': case 'quiz': return <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2><div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6"><div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /></div><div className="border-t pt-6">{activeLesson.type === 'quiz' ? <Link href={`/courses/${courseId}/quiz/${activeLesson._id}`} className="block w-full text-center bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">Mulai Kuis</Link> : <button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-indigo-300 rounded-xl p-8 text-indigo-500 font-bold"><Paperclip className="mb-1"/> Upload Jawaban</button>}</div></div>;
// // // // // // //             default: return <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex flex-col gap-6"><h2 className="text-2xl font-black text-gray-800">{activeLesson.title}</h2><div className="prose prose-red max-w-none bg-white p-6 rounded-2xl border border-red-100"><div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} /></div></div>;
// // // // // // //         }
// // // // // // //     };

// // // // // // //     if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// // // // // // //     const percent = Math.round(progressData?.percent || 0);

// // // // // // //     return (
// // // // // // //         <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
// // // // // // //             <div className={`fixed left-0 right-0 bottom-0 z-[9999] bg-white flex flex-col font-sans transition-all duration-500 ease-in-out shadow-2xl ${isFullScreen ? 'top-0' : 'top-[80px]'}`}>
                
// // // // // // //                 <header className="bg-[#B91C1C] text-white p-4 flex items-center justify-between shrink-0 shadow-md relative z-50">
                    
// // // // // // //                     <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] flex justify-center">
// // // // // // //                         <button 
// // // // // // //                             onClick={() => setIsFullScreen(!isFullScreen)} 
// // // // // // //                             className="w-16 h-6 bg-white border-x border-b border-white/50 rounded-b-xl shadow-lg flex items-center justify-center text-[#B91C1C] hover:bg-gray-100 hover:h-7 transition-all group"
// // // // // // //                             title={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// // // // // // //                             aria-label={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// // // // // // //                         >
// // // // // // //                             {isFullScreen ? <ChevronDown size={20} className="group-hover:mt-1 transition-all font-bold"/> : <ChevronUp size={20} className="group-hover:-mt-1 transition-all font-bold"/>}
// // // // // // //                         </button>
// // // // // // //                     </div>

// // // // // // //                     <div className="flex items-center gap-4">
// // // // // // //                         <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali ke Kursus"><ArrowLeft size={20}/></Link>
// // // // // // //                         <div>
// // // // // // //                             <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1>
// // // // // // //                             <div className="flex items-center gap-2 mt-0.5">
// // // // // // //                                 <div className="w-24 h-1.5 bg-red-800 rounded-full overflow-hidden border border-red-700">
// // // // // // //                                     <div ref={progressBarRef} className="h-full bg-white rounded-full" role="progressbar" aria-label="Progres Belajar"></div>
// // // // // // //                                 </div>
// // // // // // //                                 <span className="text-[10px] font-bold text-red-100">{percent}% SELESAI</span>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     </div>
                    
// // // // // // //                     <div className="flex items-center gap-3">
// // // // // // //                         <div className="w-8 h-8 rounded bg-white text-[#B91C1C] flex items-center justify-center font-bold text-xs uppercase shadow-lg">{course?.organizer?.charAt(0)}</div>
// // // // // // //                         <button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu" aria-label="Buka Menu"><Menu size={18}/></button>
// // // // // // //                     </div>
// // // // // // //                 </header>

// // // // // // //                 <div className="flex flex-1 overflow-hidden relative">
// // // // // // //                     <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
// // // // // // //                         <div className="p-5 border-b bg-gray-50/50 flex justify-between items-center"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3><button onClick={() => setShowMobileMenu(false)} className="lg:hidden text-gray-400 hover:text-red-600" title="Tutup Menu" aria-label="Tutup Menu"><X size={18}/></button></div>
// // // // // // //                         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
// // // // // // //                             {course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
// // // // // // //                                 <div key={mod._id}>
// // // // // // //                                     <div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div>
// // // // // // //                                     <div className="space-y-1">
// // // // // // //                                         {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
// // // // // // //                                             <button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`} aria-label={`Pilih materi ${les.title}`}>
// // // // // // //                                                 {isDone(les._id) ? <CheckCircle className="text-green-500 shrink-0" size={18}/> : <PlayCircle className="text-gray-300 shrink-0" size={18}/>}
// // // // // // //                                                 <div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div>
// // // // // // //                                             </button>
// // // // // // //                                         ))}
// // // // // // //                                     </div>
// // // // // // //                                 </div>
// // // // // // //                             ))}
// // // // // // //                         </div>
// // // // // // //                         <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
// // // // // // //                     </aside>

// // // // // // //                     <main className="flex-1 relative flex flex-col min-w-0">
// // // // // // //                         <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar pb-32">
// // // // // // //                             <div className="max-w-4xl mx-auto">
// // // // // // //                                 <div className="mb-8 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">{renderContent()}</div>
// // // // // // //                                 {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && activeLesson?.content && !['flashcard', 'audio', 'embed', 'game_memory', 'game_scavenger', 'game_emoji'].includes(activeLesson.type) && (
// // // // // // //                                     <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"><div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} /></div>
// // // // // // //                                 )}
// // // // // // //                             </div>
// // // // // // //                         </div>
                        
// // // // // // //                         <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 md:p-6 flex justify-between items-center z-20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
// // // // // // //                             <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
// // // // // // //                             {!isDone(activeLesson?._id) ? (
// // // // // // //                                 <button onClick={() => handleMarkComplete(activeLesson?._id)} className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-black text-xs shadow-xl shadow-red-200 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"><CheckCircle size={18}/> Tandai Selesai</button>
// // // // // // //                             ) : (
// // // // // // //                                 <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-8 py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"><CheckCircle size={18}/> Materi Lulus</div>
// // // // // // //                             )}
// // // // // // //                         </div>
// // // // // // //                     </main>

// // // // // // //                     <button onClick={() => setShowChat(!showChat)} className="absolute right-6 bottom-28 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi"><MessageSquare size={24}/>{messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}</button>
// // // // // // //                     {showChat && (
// // // // // // //                         <div className="absolute right-6 bottom-28 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
// // // // // // //                             <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0"><div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div><button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat" aria-label="Tutup Chat"><X size={18}/></button></div>
// // // // // // //                             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">{messages.map((m, i) => (<div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}><span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span><div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div></div>))}<div ref={messagesEndRef} /></div>
// // // // // // //                             <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0"><input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} aria-label="Ketik pesan chat"/><button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button></form>
// // // // // // //                         </div>
// // // // // // //                     )}
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         </Protected>
// // // // // // //     );
// // // // // // // }

// // // // // // 'use client';

// // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // import Protected from '@/components/Protected';
// // // // // // import { 
// // // // // //     ArrowLeft, CheckCircle, PlayCircle, Lock, 
// // // // // //     MessageSquare, FileText, Send, Loader2, 
// // // // // //     HeadphonesIcon, Menu, X, BarChart2, Paperclip, 
// // // // // //     Mic, RotateCw, Layers, Globe, ChevronUp, ChevronDown, 
// // // // // //     Maximize2, Minimize2, Smile, Gamepad2, Camera
// // // // // // } from 'lucide-react';
// // // // // // import Link from 'next/link';

// // // // // // // Import komponen Game
// // // // // // // Sesuaikan dengan lokasi file Anda di folder 'course'
// // // // // // import GameMemory from '@/components/course/GameMemory';
// // // // // // import GameScavenger from '@/components/course/GameScavenger';

// // // // // // // [FIX] Helper Icon Sidebar
// // // // // // const getSidebarIcon = (type: string, isCompleted: boolean) => {
// // // // // //     if (isCompleted) return <CheckCircle className="text-green-500 shrink-0" size={18}/>;
// // // // // //     switch (type) {
// // // // // //         case 'video_url': return <PlayCircle className="text-red-500 shrink-0" size={18}/>;
// // // // // //         case 'game_memory': return <Gamepad2 className="text-violet-500 shrink-0" size={18}/>;
// // // // // //         case 'game_scavenger': return <Camera className="text-rose-500 shrink-0" size={18}/>;
// // // // // //         case 'game_emoji': return <Smile className="text-yellow-500 shrink-0" size={18}/>;
// // // // // //         case 'audio': return <Mic className="text-pink-500 shrink-0" size={18}/>;
// // // // // //         case 'quiz': return <FileText className="text-orange-500 shrink-0" size={18}/>;
// // // // // //         default: return <PlayCircle className="text-gray-300 shrink-0" size={18}/>;
// // // // // //     }
// // // // // // };

// // // // // // export default function CoursePlayPage() {
// // // // // //     const params = useParams();
// // // // // //     const router = useRouter();
// // // // // //     const { user } = useAuth();
// // // // // //     const courseId = params?.courseId as string;

// // // // // //     // --- STATE ---
// // // // // //     const [course, setCourse] = useState<any>(null);
// // // // // //     const [loading, setLoading] = useState(true);
// // // // // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // //     const [progressData, setProgressData] = useState<any>(null);
// // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // //     const [chatMessage, setChatMessage] = useState('');
// // // // // //     const [showChat, setShowChat] = useState(false);
// // // // // //     const [showMobileMenu, setShowMobileMenu] = useState(false);
// // // // // //     const [isFullScreen, setIsFullScreen] = useState(true);

// // // // // //     const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
// // // // // //     const progressBarRef = useRef<HTMLDivElement>(null);
// // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // // //     // --- MAIN EFFECT ---
// // // // // //     useEffect(() => {
// // // // // //         if (!courseId || !user) return;
// // // // // //         if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// // // // // //             loadData();
// // // // // //             return;
// // // // // //         }
// // // // // //         checkEnrollmentAndLoad();
// // // // // //     }, [courseId, user]);

// // // // // //     useEffect(() => {
// // // // // //         if (progressBarRef.current) {
// // // // // //             const percent = Math.round(progressData?.percent || 0);
// // // // // //             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
// // // // // //             progressBarRef.current.style.width = `${percent}%`;
// // // // // //         }
// // // // // //     }, [progressData]);

// // // // // //     useEffect(() => {
// // // // // //         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // // //     }, [messages, showChat]);

// // // // // //     useEffect(() => {
// // // // // //         setFlippedCards({});
// // // // // //     }, [activeLesson]);

// // // // // //     // --- FUNCTIONS ---
// // // // // //     const checkEnrollmentAndLoad = async () => {
// // // // // //         try {
// // // // // //             setLoading(true);
// // // // // //             const statusRes = await api(`/api/courses/${courseId}/enrollment-status`);
// // // // // //             if (!statusRes.isEnrolled) {
// // // // // //                 alert("Anda belum terdaftar di kursus ini.");
// // // // // //                 router.push(`/courses/${courseId}`);
// // // // // //             } else {
// // // // // //                 loadData();
// // // // // //             }
// // // // // //         } catch (e) {
// // // // // //             console.error("Gagal cek enrollment", e);
// // // // // //             router.push(`/courses/${courseId}`);
// // // // // //         }
// // // // // //     };

// // // // // //     const loadData = async () => {
// // // // // //         try {
// // // // // //             setLoading(true);
// // // // // //             const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
// // // // // //             const cData = res.course || res;
// // // // // //             setCourse(cData);
// // // // // //             const [prog, msg] = await Promise.all([
// // // // // //                 api(`/api/progress/${courseId}`),
// // // // // //                 api(`/api/courses/${courseId}/messages`)
// // // // // //             ]);
// // // // // //             setProgressData(prog);
// // // // // //             setMessages(msg || []);
// // // // // //             const firstMod = cData.modules?.find((m: any) => m.isActive);
// // // // // //             const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
// // // // // //             if (firstLes) setActiveLesson(firstLes);
// // // // // //         } catch (e) {
// // // // // //             console.error("Gagal memuat data", e);
// // // // // //         } finally {
// // // // // //             setLoading(false);
// // // // // //         }
// // // // // //     };

// // // // // //     const handleMarkComplete = async (lessonId: string) => {
// // // // // //         try {
// // // // // //             await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
// // // // // //             const updated = await api(`/api/progress/${courseId}`);
// // // // // //             setProgressData(updated);
// // // // // //         } catch (e) { alert("Gagal update progres"); }
// // // // // //     };

// // // // // //     const handleSendChat = async (e: React.FormEvent) => {
// // // // // //         e.preventDefault();
// // // // // //         if (!chatMessage.trim()) return;
// // // // // //         try {
// // // // // //             const res = await api(`/api/courses/${courseId}/messages`, { method: 'POST', body: { text: chatMessage } });
// // // // // //             setMessages([...messages, res]);
// // // // // //             setChatMessage('');
// // // // // //         } catch (e) { alert("Gagal kirim pesan"); }
// // // // // //     };

// // // // // //     const isDone = (id: string) => progressData?.completedLessons?.includes(id);

// // // // // //     // --- RENDERER KONTEN ---
// // // // // //     const renderContent = () => {
// // // // // //         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
// // // // // //         switch (activeLesson.type) {
// // // // // //             case 'video_url': return <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
// // // // // //             case 'embed': return <div className="aspect-[4/3] md:aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg relative"><iframe src={activeLesson.videoUrl || activeLesson.content} className="w-full h-full" title="Embedded Content" allowFullScreen /></div>;
// // // // // //             case 'audio': return <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl text-white flex flex-col items-center justify-center min-h-[300px]"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse"><Mic size={48} /></div><h2 className="text-2xl font-bold mb-2 text-center">{activeLesson.title}</h2><p className="text-pink-100 text-sm mb-8">Dengarkan materi audio ini.</p><audio controls src={getImageUrl(activeLesson.fileUrl)} className="w-full max-w-lg rounded-full shadow-lg" /></div>;
            
// // // // // //             // GAMES INTEGRATION
// // // // // //             case 'game_memory': return <GameMemory content={activeLesson.content} lessonId={activeLesson._id} onComplete={handleMarkComplete} />;
// // // // // //             case 'game_scavenger': return <GameScavenger content={activeLesson.content} lessonId={activeLesson._id} onComplete={handleMarkComplete} />;
// // // // // //             case 'game_emoji': 
// // // // // //                 return (
// // // // // //                     <div className="bg-yellow-50 p-8 rounded-3xl border-2 border-yellow-200 shadow-sm relative overflow-hidden">
// // // // // //                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
// // // // // //                         <div className="text-center mb-8 relative z-10">
// // // // // //                             <div className="inline-block p-3 bg-white rounded-full shadow-md mb-3 text-yellow-500 border border-yellow-100"><Smile size={32} /></div>
// // // // // //                             <h2 className="text-2xl font-black text-yellow-800">🤔 Tebak Kode Emoji</h2>
// // // // // //                             <p className="text-yellow-700 text-sm">Pecahkan teka-teki emoji di bawah ini!</p>
// // // // // //                         </div>
// // // // // //                         <div className="space-y-6 max-w-2xl mx-auto relative z-10">
// // // // // //                             {activeLesson.questions?.map((q: any, idx: number) => (
// // // // // //                                 <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100 text-center">
// // // // // //                                     {/* Gunakan dangerouslySetInnerHTML untuk merender emoji yang tersimpan */}
// // // // // //                                     <div className="text-6xl mb-4 animate-bounce" dangerouslySetInnerHTML={{__html: q.question}}></div>
// // // // // //                                     <input className="w-full p-3 border-2 border-gray-200 rounded-xl text-center font-bold text-lg focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 outline-none uppercase tracking-widest placeholder:normal-case placeholder:font-normal placeholder:tracking-normal transition-all" placeholder="Ketik jawabanmu..."/>
// // // // // //                                 </div>
// // // // // //                             ))}
// // // // // //                         </div>
// // // // // //                         <div className="mt-8 text-center"><button onClick={() => handleMarkComplete(activeLesson._id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-yellow-200 transition-all active:scale-95">Kirim Jawaban</button></div>
// // // // // //                     </div>
// // // // // //                 );

// // // // // //             case 'flashcard': 
// // // // // //                 let cards = []; try { cards = JSON.parse(activeLesson.content || '[]'); } catch (e) { cards = []; }
// // // // // //                 return <div className="space-y-6"><div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 mb-4"><Layers size={24}/><div><h3 className="font-bold">Mode Hafalan</h3><p className="text-xs">Klik kartu untuk membalik.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card:any, idx:number) => (<div key={idx} onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))} className="relative h-64 w-full cursor-pointer perspective-1000 group"><div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${flippedCards[idx] ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pertanyaan</span><p className="text-lg font-bold text-gray-800">{card.front}</p></div><div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180"><span className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-4">Jawaban</span><p className="text-lg font-bold">{card.back}</p></div></div></div>))}</div></div>;
// // // // // //             case 'slide': return <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/></div>;
// // // // // //             case 'image': return <div className="rounded-2xl overflow-hidden border shadow-lg bg-gray-900 flex items-center justify-center"><img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto max-h-[500px]"/></div>;
// // // // // //             case 'download_doc': return <div className="bg-green-50 p-8 rounded-3xl border border-green-200 flex flex-col items-center justify-center gap-4 text-center"><div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={32}/></div><h2 className="text-xl font-bold text-green-900">{activeLesson.title}</h2><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2">Download Dokumen</a></div>;
// // // // // //             case 'poll': return <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.pollQuestion}</h2><div className="space-y-3">{activeLesson.pollOptions?.map((opt:string, i:number) => <button key={i} className="w-full text-left p-4 bg-purple-50 border-2 border-purple-100 rounded-xl font-bold text-purple-900">{opt}</button>)}</div></div>;
// // // // // //             case 'essay': case 'quiz': return <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2><div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6"><div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /></div><div className="border-t pt-6">{activeLesson.type === 'quiz' ? <Link href={`/courses/${courseId}/quiz/${activeLesson._id}`} className="block w-full text-center bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">Mulai Kuis</Link> : <button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-indigo-300 rounded-xl p-8 text-indigo-500 font-bold"><Paperclip className="mb-1"/> Upload Jawaban</button>}</div></div>;
// // // // // //             default: return <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex flex-col gap-6"><h2 className="text-2xl font-black text-gray-800">{activeLesson.title}</h2><div className="prose prose-red max-w-none bg-white p-6 rounded-2xl border border-red-100"><div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} /></div></div>;
// // // // // //         }
// // // // // //     };

// // // // // //     if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// // // // // //     const percent = Math.round(progressData?.percent || 0);

// // // // // //     return (
// // // // // //         <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
// // // // // //             <div className={`fixed left-0 right-0 bottom-0 z-[9999] bg-white flex flex-col font-sans transition-all duration-500 ease-in-out shadow-2xl ${isFullScreen ? 'top-0' : 'top-[80px]'}`}>
                
// // // // // //                 <header className="bg-[#B91C1C] text-white p-4 flex items-center justify-between shrink-0 shadow-md relative z-50">
                    
// // // // // //                     <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] flex justify-center">
// // // // // //                         <button 
// // // // // //                             onClick={() => setIsFullScreen(!isFullScreen)} 
// // // // // //                             className="w-16 h-6 bg-white border-x border-b border-white/50 rounded-b-xl shadow-lg flex items-center justify-center text-[#B91C1C] hover:bg-gray-100 hover:h-7 transition-all group"
// // // // // //                             title={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// // // // // //                             aria-label={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// // // // // //                         >
// // // // // //                             {isFullScreen ? <ChevronDown size={20} className="group-hover:mt-1 transition-all font-bold"/> : <ChevronUp size={20} className="group-hover:-mt-1 transition-all font-bold"/>}
// // // // // //                         </button>
// // // // // //                     </div>

// // // // // //                     <div className="flex items-center gap-4">
// // // // // //                         <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali ke Kursus"><ArrowLeft size={20}/></Link>
// // // // // //                         <div>
// // // // // //                             <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1>
// // // // // //                             <div className="flex items-center gap-2 mt-0.5">
// // // // // //                                 <div className="w-24 h-1.5 bg-red-800 rounded-full overflow-hidden border border-red-700">
// // // // // //                                     <div ref={progressBarRef} className="h-full bg-white rounded-full" role="progressbar" aria-label="Progres Belajar"></div>
// // // // // //                                 </div>
// // // // // //                                 <span className="text-[10px] font-bold text-red-100">{percent}% SELESAI</span>
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     </div>
                    
// // // // // //                     <div className="flex items-center gap-3">
// // // // // //                         <div className="w-8 h-8 rounded bg-white text-[#B91C1C] flex items-center justify-center font-bold text-xs uppercase shadow-lg">{course?.organizer?.charAt(0)}</div>
// // // // // //                         <button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu" aria-label="Buka Menu"><Menu size={18}/></button>
// // // // // //                     </div>
// // // // // //                 </header>

// // // // // //                 <div className="flex flex-1 overflow-hidden relative">
// // // // // //                     <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
// // // // // //                         <div className="p-5 border-b bg-gray-50/50 flex justify-between items-center"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3><button onClick={() => setShowMobileMenu(false)} className="lg:hidden text-gray-400 hover:text-red-600" title="Tutup Menu" aria-label="Tutup Menu"><X size={18}/></button></div>
// // // // // //                         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
// // // // // //                             {course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
// // // // // //                                 <div key={mod._id}>
// // // // // //                                     <div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div>
// // // // // //                                     <div className="space-y-1">
// // // // // //                                         {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
// // // // // //                                             <button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`} aria-label={`Pilih materi ${les.title}`}>
// // // // // //                                                 {/* [FIX] GUNAKAN ICON SIDEBAR YANG SESUAI */}
// // // // // //                                                 {getSidebarIcon(les.type, isDone(les._id))}
// // // // // //                                                 <div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div>
// // // // // //                                             </button>
// // // // // //                                         ))}
// // // // // //                                     </div>
// // // // // //                                 </div>
// // // // // //                             ))}
// // // // // //                         </div>
// // // // // //                         <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
// // // // // //                     </aside>

// // // // // //                     <main className="flex-1 relative flex flex-col min-w-0">
// // // // // //                         <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar pb-32">
// // // // // //                             <div className="max-w-4xl mx-auto">
// // // // // //                                 <div className="mb-8 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">{renderContent()}</div>
// // // // // //                                 {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && activeLesson?.content && !['flashcard', 'audio', 'embed', 'game_memory', 'game_scavenger', 'game_emoji'].includes(activeLesson.type) && (
// // // // // //                                     <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"><div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} /></div>
// // // // // //                                 )}
// // // // // //                             </div>
// // // // // //                         </div>
                        
// // // // // //                         {/* [FIX] FOOTER LEBIH KECIL (p-4 md:p-6 -> p-3 md:p-4) & (py-3.5 -> py-2) */}
// // // // // //                         <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 md:p-4 flex justify-between items-center z-20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
// // // // // //                             <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
// // // // // //                             {!isDone(activeLesson?._id) ? (
// // // // // //                                 <button onClick={() => handleMarkComplete(activeLesson?._id)} className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-black text-xs shadow-xl shadow-red-200 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"><CheckCircle size={16}/> Tandai Selesai</button>
// // // // // //                             ) : (
// // // // // //                                 <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-6 py-2 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"><CheckCircle size={16}/> Materi Lulus</div>
// // // // // //                             )}
// // // // // //                         </div>
// // // // // //                     </main>

// // // // // //                     <button onClick={() => setShowChat(!showChat)} className="absolute right-6 bottom-28 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi"><MessageSquare size={24}/>{messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}</button>
// // // // // //                     {showChat && (
// // // // // //                         <div className="absolute right-6 bottom-28 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
// // // // // //                             <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0"><div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div><button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat" aria-label="Tutup Chat"><X size={18}/></button></div>
// // // // // //                             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">{messages.map((m, i) => (<div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}><span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span><div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div></div>))}<div ref={messagesEndRef} /></div>
// // // // // //                             <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0"><input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} aria-label="Ketik pesan chat"/><button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button></form>
// // // // // //                         </div>
// // // // // //                     )}
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </Protected>
// // // // // //     );
// // // // // // }


// // // // // 'use client';

// // // // // import { useState, useEffect, useRef } from 'react';
// // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // import Protected from '@/components/Protected';
// // // // // import { 
// // // // //     ArrowLeft, CheckCircle, PlayCircle, Lock, 
// // // // //     MessageSquare, FileText, Send, Loader2, 
// // // // //     HeadphonesIcon, Menu, X, BarChart2, Paperclip, 
// // // // //     Mic, RotateCw, Layers, Globe, ChevronUp, ChevronDown, 
// // // // //     Maximize2, Minimize2, Smile, Gamepad2, Camera, Video
// // // // // } from 'lucide-react';
// // // // // import Link from 'next/link';

// // // // // // Import komponen Game
// // // // // import GameMemory from '@/components/course/GameMemory';
// // // // // import GameScavenger from '@/components/course/GameScavenger';

// // // // // // [FIX] Helper untuk menampilkan Icon yang sesuai di Sidebar
// // // // // const getSidebarIcon = (type: string, isCompleted: boolean) => {
// // // // //     if (isCompleted) return <CheckCircle className="text-green-500 shrink-0" size={18}/>;
// // // // //     switch (type) {
// // // // //         case 'video_url': return <Video className="text-red-500 shrink-0" size={18}/>;
// // // // //         case 'game_memory': return <Gamepad2 className="text-violet-500 shrink-0" size={18}/>;
// // // // //         case 'game_scavenger': return <Camera className="text-rose-500 shrink-0" size={18}/>;
// // // // //         case 'game_emoji': return <Smile className="text-yellow-500 shrink-0" size={18}/>;
// // // // //         case 'audio': return <Mic className="text-pink-500 shrink-0" size={18}/>;
// // // // //         case 'quiz': return <FileText className="text-orange-500 shrink-0" size={18}/>;
// // // // //         case 'poll': return <BarChart2 className="text-emerald-500 shrink-0" size={18}/>;
// // // // //         case 'flashcard': return <Layers className="text-orange-500 shrink-0" size={18}/>;
// // // // //         case 'embed': return <Globe className="text-teal-500 shrink-0" size={18}/>;
// // // // //         default: return <PlayCircle className="text-gray-300 shrink-0" size={18}/>;
// // // // //     }
// // // // // };

// // // // // export default function CoursePlayPage() {
// // // // //     const params = useParams();
// // // // //     const router = useRouter();
// // // // //     const { user } = useAuth();
// // // // //     const courseId = params?.courseId as string;

// // // // //     // --- STATE ---
// // // // //     const [course, setCourse] = useState<any>(null);
// // // // //     const [loading, setLoading] = useState(true);
// // // // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // //     const [progressData, setProgressData] = useState<any>(null);
// // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // //     const [chatMessage, setChatMessage] = useState('');
// // // // //     const [showChat, setShowChat] = useState(false);
// // // // //     const [showMobileMenu, setShowMobileMenu] = useState(false);
// // // // //     const [isFullScreen, setIsFullScreen] = useState(true);

// // // // //     // State Game Emoji
// // // // //     const [emojiAnswer, setEmojiAnswer] = useState('');
// // // // //     const [isEmojiCorrect, setIsEmojiCorrect] = useState<boolean | null>(null);

// // // // //     const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
// // // // //     const progressBarRef = useRef<HTMLDivElement>(null);
// // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // //     // --- MAIN EFFECT ---
// // // // //     useEffect(() => {
// // // // //         if (!courseId || !user) return;
// // // // //         if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// // // // //             loadData();
// // // // //             return;
// // // // //         }
// // // // //         checkEnrollmentAndLoad();
// // // // //     }, [courseId, user]);

// // // // //     useEffect(() => {
// // // // //         if (progressBarRef.current) {
// // // // //             const percent = Math.round(progressData?.percent || 0);
// // // // //             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
// // // // //             progressBarRef.current.style.width = `${percent}%`;
// // // // //         }
// // // // //     }, [progressData]);

// // // // //     useEffect(() => {
// // // // //         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // //     }, [messages, showChat]);

// // // // //     useEffect(() => {
// // // // //         setFlippedCards({});
// // // // //         setEmojiAnswer('');
// // // // //         setIsEmojiCorrect(null);
// // // // //     }, [activeLesson]);

// // // // //     // --- FUNCTIONS ---
// // // // //     const checkEnrollmentAndLoad = async () => {
// // // // //         try {
// // // // //             setLoading(true);
// // // // //             const statusRes = await api(`/api/courses/${courseId}/enrollment-status`);
// // // // //             if (!statusRes.isEnrolled) {
// // // // //                 alert("Anda belum terdaftar di kursus ini.");
// // // // //                 router.push(`/courses/${courseId}`);
// // // // //             } else {
// // // // //                 loadData();
// // // // //             }
// // // // //         } catch (e) {
// // // // //             console.error("Gagal cek enrollment", e);
// // // // //             router.push(`/courses/${courseId}`);
// // // // //         }
// // // // //     };

// // // // //     const loadData = async () => {
// // // // //         try {
// // // // //             setLoading(true);
// // // // //             const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
// // // // //             const cData = res.course || res;
// // // // //             setCourse(cData);
            
// // // // //             // Load Progress & Chat secara paralel
// // // // //             const [prog, msg] = await Promise.all([
// // // // //                 api(`/api/progress/${courseId}`),
// // // // //                 api(`/api/courses/${courseId}/messages`)
// // // // //             ]);
            
// // // // //             setProgressData(prog);
// // // // //             setMessages(msg || []);
            
// // // // //             const firstMod = cData.modules?.find((m: any) => m.isActive);
// // // // //             const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
// // // // //             if (firstLes) setActiveLesson(firstLes);
// // // // //         } catch (e) {
// // // // //             console.error("Gagal memuat data", e);
// // // // //         } finally {
// // // // //             setLoading(false);
// // // // //         }
// // // // //     };

// // // // //     const handleMarkComplete = async (lessonId: string) => {
// // // // //         try {
// // // // //             await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
// // // // //             // Refresh local progress data
// // // // //             const updated = await api(`/api/progress/${courseId}`);
// // // // //             setProgressData(updated);
// // // // //         } catch (e: any) { 
// // // // //             console.error("Progress Error:", e);
// // // // //             // Ignore error jika lesson sudah selesai sebelumnya
// // // // //             if(!e.message?.includes('already')) {
// // // // //                 // alert("Gagal koneksi ke server. Cek internet anda.");
// // // // //             }
// // // // //         }
// // // // //     };

// // // // //     const checkEmojiAnswer = () => {
// // // // //         // Hapus tag HTML dari jawaban kunci (karena dari text editor)
// // // // //         const correctAnswer = activeLesson.content?.replace(/<[^>]*>?/gm, '').trim(); 
        
// // // // //         if (!correctAnswer) {
// // // // //             // Auto correct jika tidak ada kunci
// // // // //             handleMarkComplete(activeLesson._id);
// // // // //             setIsEmojiCorrect(true);
// // // // //             return;
// // // // //         }

// // // // //         if (emojiAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
// // // // //             setIsEmojiCorrect(true);
// // // // //             handleMarkComplete(activeLesson._id); 
// // // // //         } else {
// // // // //             setIsEmojiCorrect(false);
// // // // //             setTimeout(() => setIsEmojiCorrect(null), 2000); 
// // // // //         }
// // // // //     };

// // // // //     const handleSendChat = async (e: React.FormEvent) => {
// // // // //         e.preventDefault();
// // // // //         if (!chatMessage.trim()) return;
// // // // //         try {
// // // // //             const res = await api(`/api/courses/${courseId}/messages`, { method: 'POST', body: { text: chatMessage } });
// // // // //             setMessages([...messages, res]);
// // // // //             setChatMessage('');
// // // // //         } catch (e) { alert("Gagal kirim pesan"); }
// // // // //     };

// // // // //     const isDone = (id: string) => progressData?.completedLessons?.includes(id);

// // // // //     // --- RENDERER ---
// // // // //     const renderContent = () => {
// // // // //         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
// // // // //         switch (activeLesson.type) {
// // // // //             case 'video_url': return <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
// // // // //             case 'embed': return <div className="aspect-[4/3] md:aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg relative"><iframe src={activeLesson.videoUrl || activeLesson.content} className="w-full h-full" title="Embedded Content" allowFullScreen /></div>;
// // // // //             case 'audio': return <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl text-white flex flex-col items-center justify-center min-h-[300px]"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse"><Mic size={48} /></div><h2 className="text-2xl font-bold mb-2 text-center">{activeLesson.title}</h2><p className="text-pink-100 text-sm mb-8">Dengarkan materi audio ini.</p><audio controls src={getImageUrl(activeLesson.fileUrl)} className="w-full max-w-lg rounded-full shadow-lg" /></div>;
            
// // // // //             // GAMES
// // // // //             case 'game_memory': return <GameMemory content={activeLesson.content} lessonId={activeLesson._id} onComplete={handleMarkComplete} />;
// // // // //             case 'game_scavenger': return <GameScavenger content={activeLesson.content} lessonId={activeLesson._id} onComplete={handleMarkComplete} />;
            
// // // // //             // GAME EMOJI
// // // // //             case 'game_emoji': 
// // // // //                 return (
// // // // //                     <div className="bg-yellow-50 p-8 rounded-3xl border-2 border-yellow-200 shadow-sm relative overflow-hidden transition-all">
// // // // //                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
// // // // //                         <div className="text-center mb-8 relative z-10">
// // // // //                             <div className="inline-block p-3 bg-white rounded-full shadow-md mb-3 text-yellow-500 border border-yellow-100"><Smile size={32} /></div>
// // // // //                             <h2 className="text-2xl font-black text-yellow-800">🤔 Tebak Kode Emoji</h2>
// // // // //                             <p className="text-yellow-700 text-sm">Pecahkan teka-teki emoji di bawah ini!</p>
// // // // //                         </div>
// // // // //                         <div className="space-y-6 max-w-2xl mx-auto relative z-10">
// // // // //                             {activeLesson.questions?.map((q: any, idx: number) => (
// // // // //                                 <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100 text-center">
// // // // //                                     <div className="text-6xl mb-6 animate-bounce select-none" dangerouslySetInnerHTML={{__html: q.question}}></div>
// // // // //                                     <input 
// // // // //                                         className={`w-full p-4 border-2 rounded-xl text-center font-bold text-lg outline-none transition-all ${isEmojiCorrect === false ? 'border-red-400 bg-red-50 text-red-600 shake' : isEmojiCorrect === true ? 'border-green-400 bg-green-50 text-green-600' : 'border-gray-200 focus:border-yellow-400'}`} 
// // // // //                                         placeholder="Ketik jawabanmu..."
// // // // //                                         value={emojiAnswer}
// // // // //                                         onChange={(e) => setEmojiAnswer(e.target.value)}
// // // // //                                         onKeyDown={(e) => e.key === 'Enter' && checkEmojiAnswer()}
// // // // //                                         disabled={isDone(activeLesson._id) || isEmojiCorrect === true}
// // // // //                                     />
// // // // //                                     {isEmojiCorrect === false && <p className="text-red-500 text-sm font-bold mt-2 animate-pulse">Salah, coba lagi!</p>}
// // // // //                                     {(isEmojiCorrect === true || isDone(activeLesson._id)) && <p className="text-green-600 text-sm font-bold mt-2 flex items-center justify-center gap-1"><CheckCircle size={16}/> Jawaban Benar!</p>}
// // // // //                                 </div>
// // // // //                             ))}
// // // // //                         </div>
// // // // //                         {!isDone(activeLesson._id) && (
// // // // //                             <div className="mt-8 text-center"><button onClick={checkEmojiAnswer} className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-yellow-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!emojiAnswer}>Kirim Jawaban</button></div>
// // // // //                         )}
// // // // //                     </div>
// // // // //                 );

// // // // //             case 'flashcard': 
// // // // //                 let cards = []; try { cards = JSON.parse(activeLesson.content || '[]'); } catch (e) { cards = []; }
// // // // //                 return <div className="space-y-6"><div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 mb-4"><Layers size={24}/><div><h3 className="font-bold">Mode Hafalan</h3><p className="text-xs">Klik kartu untuk membalik.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card:any, idx:number) => (<div key={idx} onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))} className="relative h-64 w-full cursor-pointer perspective-1000 group"><div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${flippedCards[idx] ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pertanyaan</span><p className="text-lg font-bold text-gray-800">{card.front}</p></div><div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180"><span className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-4">Jawaban</span><p className="text-lg font-bold">{card.back}</p></div></div></div>))}</div></div>;
// // // // //             case 'slide': return <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/></div>;
// // // // //             case 'image': return <div className="rounded-2xl overflow-hidden border shadow-lg bg-gray-900 flex items-center justify-center"><img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto max-h-[500px]"/></div>;
// // // // //             case 'download_doc': return <div className="bg-green-50 p-8 rounded-3xl border border-green-200 flex flex-col items-center justify-center gap-4 text-center"><div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={32}/></div><h2 className="text-xl font-bold text-green-900">{activeLesson.title}</h2><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2">Download Dokumen</a></div>;
// // // // //             case 'poll': return <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.pollQuestion}</h2><div className="space-y-3">{activeLesson.pollOptions?.map((opt:string, i:number) => <button key={i} className="w-full text-left p-4 bg-purple-50 border-2 border-purple-100 rounded-xl font-bold text-purple-900">{opt}</button>)}</div></div>;
// // // // //             case 'essay': case 'quiz': return <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2><div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6"><div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /></div><div className="border-t pt-6">{activeLesson.type === 'quiz' ? <Link href={`/courses/${courseId}/quiz/${activeLesson._id}`} className="block w-full text-center bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">Mulai Kuis</Link> : <button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-indigo-300 rounded-xl p-8 text-indigo-500 font-bold"><Paperclip className="mb-1"/> Upload Jawaban</button>}</div></div>;
// // // // //             default: return <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex flex-col gap-6"><h2 className="text-2xl font-black text-gray-800">{activeLesson.title}</h2><div className="prose prose-red max-w-none bg-white p-6 rounded-2xl border border-red-100"><div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} /></div></div>;
// // // // //         }
// // // // //     };

// // // // //     if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// // // // //     const percent = Math.round(progressData?.percent || 0);

// // // // //     return (
// // // // //         <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
// // // // //             <div className={`fixed left-0 right-0 bottom-0 z-[9999] bg-white flex flex-col font-sans transition-all duration-500 ease-in-out shadow-2xl ${isFullScreen ? 'top-0' : 'top-[80px]'}`}>
                
// // // // //                 <header className="bg-[#B91C1C] text-white p-4 flex items-center justify-between shrink-0 shadow-md relative z-50">
                    
// // // // //                     <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] flex justify-center">
// // // // //                         <button 
// // // // //                             onClick={() => setIsFullScreen(!isFullScreen)} 
// // // // //                             className="w-16 h-6 bg-white border-x border-b border-white/50 rounded-b-xl shadow-lg flex items-center justify-center text-[#B91C1C] hover:bg-gray-100 hover:h-7 transition-all group"
// // // // //                             title={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// // // // //                             aria-label={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// // // // //                         >
// // // // //                             {isFullScreen ? <ChevronDown size={20} className="group-hover:mt-1 transition-all font-bold"/> : <ChevronUp size={20} className="group-hover:-mt-1 transition-all font-bold"/>}
// // // // //                         </button>
// // // // //                     </div>

// // // // //                     <div className="flex items-center gap-4">
// // // // //                         <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali ke Kursus"><ArrowLeft size={20}/></Link>
// // // // //                         <div>
// // // // //                             <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1>
// // // // //                             <div className="flex items-center gap-2 mt-0.5">
// // // // //                                 <div className="w-24 h-1.5 bg-red-800 rounded-full overflow-hidden border border-red-700">
// // // // //                                     <div ref={progressBarRef} className="h-full bg-white rounded-full" role="progressbar" aria-label="Progres Belajar"></div>
// // // // //                                 </div>
// // // // //                                 <span className="text-[10px] font-bold text-red-100">{percent}% SELESAI</span>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
                    
// // // // //                     <div className="flex items-center gap-3">
// // // // //                         <div className="w-8 h-8 rounded bg-white text-[#B91C1C] flex items-center justify-center font-bold text-xs uppercase shadow-lg">{course?.organizer?.charAt(0)}</div>
// // // // //                         <button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu" aria-label="Buka Menu"><Menu size={18}/></button>
// // // // //                     </div>
// // // // //                 </header>

// // // // //                 <div className="flex flex-1 overflow-hidden relative">
// // // // //                     <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
// // // // //                         <div className="p-5 border-b bg-gray-50/50 flex justify-between items-center"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3><button onClick={() => setShowMobileMenu(false)} className="lg:hidden text-gray-400 hover:text-red-600" title="Tutup Menu" aria-label="Tutup Menu"><X size={18}/></button></div>
// // // // //                         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
// // // // //                             {course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
// // // // //                                 <div key={mod._id}>
// // // // //                                     <div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div>
// // // // //                                     <div className="space-y-1">
// // // // //                                         {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
// // // // //                                             <button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`} aria-label={`Pilih materi ${les.title}`}>
// // // // //                                                 {/* [FIX] GUNAKAN ICON SIDEBAR DARI FUNGSI getSidebarIcon */}
// // // // //                                                 {getSidebarIcon(les.type, isDone(les._id))}
// // // // //                                                 <div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div>
// // // // //                                             </button>
// // // // //                                         ))}
// // // // //                                     </div>
// // // // //                                 </div>
// // // // //                             ))}
// // // // //                         </div>
// // // // //                         <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
// // // // //                     </aside>

// // // // //                     <main className="flex-1 relative flex flex-col min-w-0">
// // // // //                         <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar pb-32">
// // // // //                             <div className="max-w-4xl mx-auto">
// // // // //                                 <div className="mb-8 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">{renderContent()}</div>
// // // // //                                 {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && activeLesson?.content && !['flashcard', 'audio', 'embed', 'game_memory', 'game_scavenger', 'game_emoji'].includes(activeLesson.type) && (
// // // // //                                     <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"><div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} /></div>
// // // // //                                 )}
// // // // //                             </div>
// // // // //                         </div>
                        
// // // // //                         {/* [FIX] Footer lebih compact (p-3 md:p-4) */}
// // // // //                         <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 md:p-4 flex justify-between items-center z-20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
// // // // //                             <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
// // // // //                             {!isDone(activeLesson?._id) ? (
// // // // //                                 <button 
// // // // //                                     onClick={() => handleMarkComplete(activeLesson?._id)} 
// // // // //                                     // Disable tombol jika Game Emoji dan belum benar
// // // // //                                     disabled={activeLesson?.type === 'game_emoji' && !isEmojiCorrect}
// // // // //                                     className={`w-full md:w-auto px-6 py-2 rounded-xl font-black text-xs shadow-xl transition-all uppercase tracking-widest flex items-center justify-center gap-2 ${activeLesson?.type === 'game_emoji' && !isEmojiCorrect ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white shadow-red-200 active:scale-95'}`}
// // // // //                                 >
// // // // //                                     <CheckCircle size={16}/> {activeLesson?.type === 'game_emoji' ? 'Selesaikan Game' : 'Tandai Selesai'}
// // // // //                                 </button>
// // // // //                             ) : (
// // // // //                                 <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-6 py-2 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"><CheckCircle size={16}/> Materi Lulus</div>
// // // // //                             )}
// // // // //                         </div>
// // // // //                     </main>

// // // // //                     <button onClick={() => setShowChat(!showChat)} className="absolute right-6 bottom-28 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi"><MessageSquare size={24}/>{messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}</button>
// // // // //                     {showChat && (
// // // // //                         <div className="absolute right-6 bottom-28 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
// // // // //                             <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0"><div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div><button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat" aria-label="Tutup Chat"><X size={18}/></button></div>
// // // // //                             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">{messages.map((m, i) => (<div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}><span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span><div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div></div>))}<div ref={messagesEndRef} /></div>
// // // // //                             <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0"><input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} aria-label="Ketik pesan chat"/><button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button></form>
// // // // //                         </div>
// // // // //                     )}
// // // // //                 </div>
// // // // //             </div>
// // // // //         </Protected>
// // // // //     );
// // // // // }

// // // // 'use client';

// // // // import { useState, useEffect, useRef } from 'react';
// // // // import { useParams, useRouter } from 'next/navigation';
// // // // import { api, getImageUrl } from '@/lib/api';
// // // // import { useAuth } from '@/lib/AuthProvider';
// // // // import Protected from '@/components/Protected';
// // // // import { 
// // // //     ArrowLeft, CheckCircle, PlayCircle, Lock, 
// // // //     MessageSquare, FileText, Send, Loader2, 
// // // //     HeadphonesIcon, Menu, X, BarChart2, Paperclip, 
// // // //     Mic, RotateCw, Layers, Globe, ChevronUp, ChevronDown, 
// // // //     Maximize2, Minimize2, Smile, Gamepad2, Camera, Video
// // // // } from 'lucide-react';
// // // // import Link from 'next/link';

// // // // import GameMemory from '@/components/course/GameMemory';
// // // // import GameScavenger from '@/components/course/GameScavenger';

// // // // const getSidebarIcon = (type: string, isCompleted: boolean) => {
// // // //     if (isCompleted) return <CheckCircle className="text-green-500 shrink-0" size={18}/>;
// // // //     switch (type) {
// // // //         case 'video_url': return <Video className="text-red-500 shrink-0" size={18}/>;
// // // //         case 'game_memory': return <Gamepad2 className="text-violet-500 shrink-0" size={18}/>;
// // // //         case 'game_scavenger': return <Camera className="text-rose-500 shrink-0" size={18}/>;
// // // //         case 'game_emoji': return <Smile className="text-yellow-500 shrink-0" size={18}/>;
// // // //         case 'audio': return <Mic className="text-pink-500 shrink-0" size={18}/>;
// // // //         case 'quiz': return <FileText className="text-orange-500 shrink-0" size={18}/>;
// // // //         case 'poll': return <BarChart2 className="text-emerald-500 shrink-0" size={18}/>;
// // // //         case 'flashcard': return <Layers className="text-orange-500 shrink-0" size={18}/>;
// // // //         case 'embed': return <Globe className="text-teal-500 shrink-0" size={18}/>;
// // // //         default: return <PlayCircle className="text-gray-300 shrink-0" size={18}/>;
// // // //     }
// // // // };

// // // // export default function CoursePlayPage() {
// // // //     const params = useParams();
// // // //     const router = useRouter();
// // // //     const { user } = useAuth();
// // // //     const courseId = params?.courseId as string;

// // // //     const [course, setCourse] = useState<any>(null);
// // // //     const [loading, setLoading] = useState(true);
// // // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // // //     const [progressData, setProgressData] = useState<any>(null);
// // // //     const [messages, setMessages] = useState<any[]>([]);
// // // //     const [chatMessage, setChatMessage] = useState('');
// // // //     const [showChat, setShowChat] = useState(false);
// // // //     const [showMobileMenu, setShowMobileMenu] = useState(false);
// // // //     const [isFullScreen, setIsFullScreen] = useState(true);

// // // //     const [emojiAnswer, setEmojiAnswer] = useState('');
// // // //     const [isEmojiCorrect, setIsEmojiCorrect] = useState<boolean | null>(null);

// // // //     const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
// // // //     const progressBarRef = useRef<HTMLDivElement>(null);
// // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // //     // --- EFFECT: INITIAL LOAD ---
// // // //     useEffect(() => {
// // // //         if (!courseId || !user) return;
// // // //         if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// // // //             loadData();
// // // //             return;
// // // //         }
// // // //         checkEnrollmentAndLoad();
// // // //     }, [courseId, user]);

// // // //     // --- EFFECT: PROGRESS BAR UI ---
// // // //     useEffect(() => {
// // // //         if (progressBarRef.current) {
// // // //             const percent = Math.round(progressData?.percent || 0);
// // // //             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
// // // //             progressBarRef.current.style.width = `${percent}%`;
// // // //         }
// // // //     }, [progressData]);

// // // //     // --- EFFECT: AUTO SCROLL CHAT ---
// // // //     useEffect(() => {
// // // //         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // //     }, [messages, showChat]);

// // // //     // --- [FIX] EFFECT: RESET GAME STATE JIKA STATUS BERUBAH ---
// // // //     useEffect(() => {
// // // //         // Reset kartu memori
// // // //         setFlippedCards({});

// // // //         // Cek apakah lesson ini sudah selesai menurut data terbaru
// // // //         const isCompleted = activeLesson && progressData?.completedLessons?.includes(activeLesson._id);

// // // //         if (!isCompleted) {
// // // //             // Jika BELUM selesai (atau baru di-reset), bersihkan input
// // // //             setEmojiAnswer('');
// // // //             setIsEmojiCorrect(null);
// // // //         } else {
// // // //             // Jika SUDAH selesai, set status benar agar UI hijau
// // // //             setIsEmojiCorrect(true);
// // // //         }
// // // //     }, [activeLesson, progressData]); // Dependency penting: progressData

// // // //     const checkEnrollmentAndLoad = async () => {
// // // //         try {
// // // //             setLoading(true);
// // // //             const statusRes = await api(`/api/courses/${courseId}/enrollment-status`);
// // // //             if (!statusRes.isEnrolled) {
// // // //                 alert("Anda belum terdaftar di kursus ini.");
// // // //                 router.push(`/courses/${courseId}`);
// // // //             } else {
// // // //                 loadData();
// // // //             }
// // // //         } catch (e) {
// // // //             console.error("Gagal cek enrollment", e);
// // // //             router.push(`/courses/${courseId}`);
// // // //         }
// // // //     };

// // // //     const loadData = async () => {
// // // //         try {
// // // //             setLoading(true);
// // // //             const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
// // // //             const cData = res.course || res;
// // // //             setCourse(cData);
            
// // // //             const [prog, msg] = await Promise.all([
// // // //                 api(`/api/progress/${courseId}`),
// // // //                 api(`/api/courses/${courseId}/messages`)
// // // //             ]);
// // // //             setProgressData(prog);
// // // //             setMessages(msg || []);
// // // //             const firstMod = cData.modules?.find((m: any) => m.isActive);
// // // //             const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
// // // //             if (firstLes) setActiveLesson(firstLes);
// // // //         } catch (e) {
// // // //             console.error("Gagal memuat data", e);
// // // //         } finally {
// // // //             setLoading(false);
// // // //         }
// // // //     };

// // // //     const handleMarkComplete = async (lessonId: string) => {
// // // //         try {
// // // //             const res = await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
// // // //             // Update state lokal instan
// // // //             setProgressData((prev: any) => ({
// // // //                 ...prev,
// // // //                 completedLessons: res.completedLessons,
// // // //                 percent: res.percent
// // // //             }));
// // // //         } catch (e: any) { 
// // // //             if (!e.message?.includes('already')) {
// // // //                 // silent
// // // //             }
// // // //         }
// // // //     };

// // // //     const checkEmojiAnswer = () => {
// // // //         // Bersihkan HTML tag dari kunci jawaban
// // // //         const correctAnswer = activeLesson.content?.replace(/<[^>]*>?/gm, '').trim(); 
        
// // // //         if (!correctAnswer) {
// // // //             handleMarkComplete(activeLesson._id);
// // // //             setIsEmojiCorrect(true);
// // // //             return;
// // // //         }

// // // //         if (emojiAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
// // // //             setIsEmojiCorrect(true);
// // // //             handleMarkComplete(activeLesson._id); 
// // // //         } else {
// // // //             setIsEmojiCorrect(false);
// // // //             setTimeout(() => setIsEmojiCorrect(null), 2000); 
// // // //         }
// // // //     };

// // // //     const handleSendChat = async (e: React.FormEvent) => {
// // // //         e.preventDefault();
// // // //         if (!chatMessage.trim()) return;
// // // //         try {
// // // //             const res = await api(`/api/courses/${courseId}/messages`, { method: 'POST', body: { text: chatMessage } });
// // // //             setMessages([...messages, res]);
// // // //             setChatMessage('');
// // // //         } catch (e) { alert("Gagal kirim pesan"); }
// // // //     };

// // // //     const isDone = (id: string) => progressData?.completedLessons?.includes(id);

// // // //     const renderContent = () => {
// // // //         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
// // // //         switch (activeLesson.type) {
// // // //             case 'video_url': return <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
// // // //             case 'embed': return <div className="aspect-[4/3] md:aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg relative"><iframe src={activeLesson.videoUrl || activeLesson.content} className="w-full h-full" title="Embedded Content" allowFullScreen /></div>;
// // // //             case 'audio': return <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl text-white flex flex-col items-center justify-center min-h-[300px]"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse"><Mic size={48} /></div><h2 className="text-2xl font-bold mb-2 text-center">{activeLesson.title}</h2><p className="text-pink-100 text-sm mb-8">Dengarkan materi audio ini.</p><audio controls src={getImageUrl(activeLesson.fileUrl)} className="w-full max-w-lg rounded-full shadow-lg" /></div>;
            
// // // //             case 'game_memory': return <GameMemory content={activeLesson.content} lessonId={activeLesson._id} onComplete={handleMarkComplete} />;
// // // //             case 'game_scavenger': return <GameScavenger content={activeLesson.content} lessonId={activeLesson._id} onComplete={handleMarkComplete} />;
            
// // // //             case 'game_emoji': 
// // // //                 return (
// // // //                     <div className="bg-yellow-50 p-8 rounded-3xl border-2 border-yellow-200 shadow-sm relative overflow-hidden transition-all">
// // // //                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
// // // //                         <div className="text-center mb-8 relative z-10">
// // // //                             <div className="inline-block p-3 bg-white rounded-full shadow-md mb-3 text-yellow-500 border border-yellow-100"><Smile size={32} /></div>
// // // //                             <h2 className="text-2xl font-black text-yellow-800">🤔 Tebak Kode Emoji</h2>
// // // //                             <p className="text-yellow-700 text-sm">Pecahkan teka-teki emoji di bawah ini!</p>
// // // //                         </div>
// // // //                         <div className="space-y-6 max-w-2xl mx-auto relative z-10">
// // // //                             {activeLesson.questions?.map((q: any, idx: number) => (
// // // //                                 <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100 text-center">
// // // //                                     <div className="text-6xl mb-6 animate-bounce select-none" dangerouslySetInnerHTML={{__html: q.question}}></div>
// // // //                                     <input 
// // // //                                         className={`w-full p-4 border-2 rounded-xl text-center font-bold text-lg outline-none transition-all ${
// // // //                                             // Logic Styling berdasarkan State
// // // //                                             (isDone(activeLesson._id) || isEmojiCorrect) ? 'border-green-400 bg-green-50 text-green-600' :
// // // //                                             isEmojiCorrect === false ? 'border-red-400 bg-red-50 text-red-600 shake' : 
// // // //                                             'border-gray-200 focus:border-yellow-400'
// // // //                                         }`} 
// // // //                                         placeholder="Ketik jawabanmu..."
// // // //                                         value={emojiAnswer}
// // // //                                         onChange={(e) => setEmojiAnswer(e.target.value)}
// // // //                                         onKeyDown={(e) => e.key === 'Enter' && checkEmojiAnswer()}
// // // //                                         // Disable jika sudah selesai ATAU jawaban benar
// // // //                                         disabled={isDone(activeLesson._id) || isEmojiCorrect === true}
// // // //                                     />
// // // //                                     {isEmojiCorrect === false && <p className="text-red-500 text-sm font-bold mt-2 animate-pulse">Salah, coba lagi!</p>}
                                    
// // // //                                     {/* Tampilkan pesan sukses jika progressData mengatakan selesai */}
// // // //                                     {(isDone(activeLesson._id) || isEmojiCorrect === true) && (
// // // //                                         <p className="text-green-600 text-sm font-bold mt-2 flex items-center justify-center gap-1">
// // // //                                             <CheckCircle size={16}/> Jawaban Benar!
// // // //                                         </p>
// // // //                                     )}
// // // //                                 </div>
// // // //                             ))}
// // // //                         </div>
                        
// // // //                         {/* Tombol hanya muncul jika BELUM selesai */}
// // // //                         {!isDone(activeLesson._id) && !isEmojiCorrect && (
// // // //                             <div className="mt-8 text-center">
// // // //                                 <button 
// // // //                                     onClick={checkEmojiAnswer} 
// // // //                                     className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-yellow-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" 
// // // //                                     disabled={!emojiAnswer}
// // // //                                 >
// // // //                                     Kirim Jawaban
// // // //                                 </button>
// // // //                             </div>
// // // //                         )}
// // // //                     </div>
// // // //                 );

// // // //             case 'flashcard': let cards = []; try { cards = JSON.parse(activeLesson.content || '[]'); } catch (e) { cards = []; } return <div className="space-y-6"><div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 mb-4"><Layers size={24}/><div><h3 className="font-bold">Mode Hafalan</h3><p className="text-xs">Klik kartu untuk membalik.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card:any, idx:number) => (<div key={idx} onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))} className="relative h-64 w-full cursor-pointer perspective-1000 group"><div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${flippedCards[idx] ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pertanyaan</span><p className="text-lg font-bold text-gray-800">{card.front}</p></div><div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180"><span className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-4">Jawaban</span><p className="text-lg font-bold">{card.back}</p></div></div></div>))}</div></div>;
// // // //             case 'slide': return <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/></div>;
// // // //             case 'image': return <div className="rounded-2xl overflow-hidden border shadow-lg bg-gray-900 flex items-center justify-center"><img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto max-h-[500px]"/></div>;
// // // //             case 'download_doc': return <div className="bg-green-50 p-8 rounded-3xl border border-green-200 flex flex-col items-center justify-center gap-4 text-center"><div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={32}/></div><h2 className="text-xl font-bold text-green-900">{activeLesson.title}</h2><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2">Download Dokumen</a></div>;
// // // //             case 'poll': return <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.pollQuestion}</h2><div className="space-y-3">{activeLesson.pollOptions?.map((opt:string, i:number) => <button key={i} className="w-full text-left p-4 bg-purple-50 border-2 border-purple-100 rounded-xl font-bold text-purple-900">{opt}</button>)}</div></div>;
// // // //             case 'essay': case 'quiz': return <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2><div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6"><div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /></div><div className="border-t pt-6">{activeLesson.type === 'quiz' ? <Link href={`/courses/${courseId}/quiz/${activeLesson._id}`} className="block w-full text-center bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">Mulai Kuis</Link> : <button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-indigo-300 rounded-xl p-8 text-indigo-500 font-bold"><Paperclip className="mb-1"/> Upload Jawaban</button>}</div></div>;
// // // //             default: return <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex flex-col gap-6"><h2 className="text-2xl font-black text-gray-800">{activeLesson.title}</h2><div className="prose prose-red max-w-none bg-white p-6 rounded-2xl border border-red-100"><div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} /></div></div>;
// // // //         }
// // // //     };

// // // //     if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// // // //     const percent = Math.round(progressData?.percent || 0);

// // // //     return (
// // // //         <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
// // // //             <div className={`fixed left-0 right-0 bottom-0 z-[9999] bg-white flex flex-col font-sans transition-all duration-500 ease-in-out shadow-2xl ${isFullScreen ? 'top-0' : 'top-[80px]'}`}>
// // // //                 <header className="bg-[#B91C1C] text-white p-4 flex items-center justify-between shrink-0 shadow-md relative z-50">
// // // //                     <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] flex justify-center"><button onClick={() => setIsFullScreen(!isFullScreen)} className="w-16 h-6 bg-white border-x border-b border-white/50 rounded-b-xl shadow-lg flex items-center justify-center text-[#B91C1C] hover:bg-gray-100 hover:h-7 transition-all group" title={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"} aria-label={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}>{isFullScreen ? <ChevronDown size={20} className="group-hover:mt-1 transition-all font-bold"/> : <ChevronUp size={20} className="group-hover:-mt-1 transition-all font-bold"/>}</button></div>
// // // //                     <div className="flex items-center gap-4"><Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali ke Kursus"><ArrowLeft size={20}/></Link><div><h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1><div className="flex items-center gap-2 mt-0.5"><div className="w-24 h-1.5 bg-red-800 rounded-full overflow-hidden border border-red-700"><div ref={progressBarRef} className="h-full bg-white rounded-full" role="progressbar" aria-label="Progres Belajar"></div></div><span className="text-[10px] font-bold text-red-100">{percent}% SELESAI</span></div></div></div>
// // // //                     <div className="flex items-center gap-3"><div className="w-8 h-8 rounded bg-white text-[#B91C1C] flex items-center justify-center font-bold text-xs uppercase shadow-lg">{course?.organizer?.charAt(0)}</div><button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu" aria-label="Buka Menu"><Menu size={18}/></button></div>
// // // //                 </header>

// // // //                 <div className="flex flex-1 overflow-hidden relative">
// // // //                     <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
// // // //                         <div className="p-5 border-b bg-gray-50/50 flex justify-between items-center"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3><button onClick={() => setShowMobileMenu(false)} className="lg:hidden text-gray-400 hover:text-red-600" title="Tutup Menu" aria-label="Tutup Menu"><X size={18}/></button></div>
// // // //                         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">{course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (<div key={mod._id}><div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div><div className="space-y-1">{mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (<button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`} aria-label={`Pilih materi ${les.title}`}>{getSidebarIcon(les.type, isDone(les._id))}<div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div></button>))}</div></div>))}</div>
// // // //                         <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
// // // //                     </aside>

// // // //                     <main className="flex-1 relative flex flex-col min-w-0">
// // // //                         <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar pb-32">
// // // //                             <div className="max-w-4xl mx-auto">
// // // //                                 <div className="mb-8 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">{renderContent()}</div>
// // // //                                 {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && activeLesson?.content && !['flashcard', 'audio', 'embed', 'game_memory', 'game_scavenger', 'game_emoji'].includes(activeLesson.type) && (<div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"><div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} /></div>)}
// // // //                             </div>
// // // //                         </div>
                        
// // // //                         <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 md:p-4 flex justify-between items-center z-20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
// // // //                             <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
// // // //                             {!isDone(activeLesson?._id) ? (<button onClick={() => handleMarkComplete(activeLesson?._id)} disabled={activeLesson?.type === 'game_emoji' && !isEmojiCorrect} className={`w-full md:w-auto px-6 py-2 rounded-xl font-black text-xs shadow-xl transition-all uppercase tracking-widest flex items-center justify-center gap-2 ${activeLesson?.type === 'game_emoji' && !isEmojiCorrect ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white shadow-red-200 active:scale-95'}`}><CheckCircle size={16}/> {activeLesson?.type === 'game_emoji' ? 'Selesaikan Game' : 'Tandai Selesai'}</button>) : (<div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-6 py-2 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"><CheckCircle size={16}/> Materi Lulus</div>)}
// // // //                         </div>
// // // //                     </main>

// // // //                     <button onClick={() => setShowChat(!showChat)} className="absolute right-6 bottom-28 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi"><MessageSquare size={24}/>{messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}</button>
// // // //                     {showChat && (<div className="absolute right-6 bottom-28 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden"><div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0"><div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div><button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat" aria-label="Tutup Chat"><X size={18}/></button></div><div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">{messages.map((m, i) => (<div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}><span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span><div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div></div>))}<div ref={messagesEndRef} /></div><form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0"><input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} aria-label="Ketik pesan chat"/><button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button></form></div>)}
// // // //                 </div>
// // // //             </div>
// // // //         </Protected>
// // // //     );
// // // // }


// // // 'use client';

// // // import { useState, useEffect, useRef } from 'react';
// // // import { useParams, useRouter } from 'next/navigation';
// // // import { api, getImageUrl } from '@/lib/api';
// // // import { useAuth } from '@/lib/AuthProvider';
// // // import Protected from '@/components/Protected';
// // // import { 
// // //     ArrowLeft, CheckCircle, PlayCircle, Lock, 
// // //     MessageSquare, FileText, Send, Loader2, 
// // //     HeadphonesIcon, Menu, X, BarChart2, Paperclip, 
// // //     Mic, RotateCw, Layers, Globe, ChevronUp, ChevronDown, 
// // //     Maximize2, Minimize2, Smile, Gamepad2, Camera, Video
// // // } from 'lucide-react';
// // // import Link from 'next/link';

// // // import GameMemory from '@/components/course/GameMemory';
// // // import GameScavenger from '@/components/course/GameScavenger';

// // // const getSidebarIcon = (type: string, isCompleted: boolean) => {
// // //     if (isCompleted) return <CheckCircle className="text-green-500 shrink-0" size={18}/>;
// // //     switch (type) {
// // //         case 'video_url': return <Video className="text-red-500 shrink-0" size={18}/>;
// // //         case 'game_memory': return <Gamepad2 className="text-violet-500 shrink-0" size={18}/>;
// // //         case 'game_scavenger': return <Camera className="text-rose-500 shrink-0" size={18}/>;
// // //         case 'game_emoji': return <Smile className="text-yellow-500 shrink-0" size={18}/>;
// // //         case 'audio': return <Mic className="text-pink-500 shrink-0" size={18}/>;
// // //         case 'quiz': return <FileText className="text-orange-500 shrink-0" size={18}/>;
// // //         case 'poll': return <BarChart2 className="text-emerald-500 shrink-0" size={18}/>;
// // //         case 'flashcard': return <Layers className="text-orange-500 shrink-0" size={18}/>;
// // //         case 'embed': return <Globe className="text-teal-500 shrink-0" size={18}/>;
// // //         default: return <PlayCircle className="text-gray-300 shrink-0" size={18}/>;
// // //     }
// // // };

// // // export default function CoursePlayPage() {
// // //     const params = useParams();
// // //     const router = useRouter();
// // //     const { user } = useAuth();
// // //     const courseId = params?.courseId as string;

// // //     const [course, setCourse] = useState<any>(null);
// // //     const [loading, setLoading] = useState(true);
// // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // //     const [progressData, setProgressData] = useState<any>(null);
// // //     const [messages, setMessages] = useState<any[]>([]);
// // //     const [chatMessage, setChatMessage] = useState('');
// // //     const [showChat, setShowChat] = useState(false);
// // //     const [showMobileMenu, setShowMobileMenu] = useState(false);
// // //     const [isFullScreen, setIsFullScreen] = useState(true);

// // //     // Game States
// // //     const [emojiAnswer, setEmojiAnswer] = useState('');
// // //     const [isEmojiCorrect, setIsEmojiCorrect] = useState<boolean | null>(null);
// // //     const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
    
// // //     // Polling State (Local Optimistic UI)
// // //     const [selectedPollOption, setSelectedPollOption] = useState<string | null>(null);

// // //     const progressBarRef = useRef<HTMLDivElement>(null);
// // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // //     // --- EFFECT: INITIAL LOAD ---
// // //     useEffect(() => {
// // //         if (!courseId || !user) return;
// // //         if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// // //             loadData();
// // //             return;
// // //         }
// // //         checkEnrollmentAndLoad();
// // //     }, [courseId, user]);

// // //     // --- EFFECT: PROGRESS BAR UI ---
// // //     useEffect(() => {
// // //         if (progressBarRef.current) {
// // //             const percent = Math.round(progressData?.percent || 0);
// // //             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
// // //             progressBarRef.current.style.width = `${percent}%`;
// // //         }
// // //     }, [progressData]);

// // //     // --- EFFECT: AUTO SCROLL CHAT ---
// // //     useEffect(() => {
// // //         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //     }, [messages, showChat]);

// // //     // --- EFFECT: RESET STATE SAAT GANTI MATERI ---
// // //     useEffect(() => {
// // //         setFlippedCards({});
// // //         setEmojiAnswer('');
// // //         setIsEmojiCorrect(null);
// // //         setSelectedPollOption(null);

// // //         // Cek apakah materi ini sudah pernah dikerjakan (untuk restore jawaban polling, dll)
// // //         if (activeLesson && progressData?.lessonDetails) {
// // //             const detail = progressData.lessonDetails.find((d: any) => d.lessonId === activeLesson._id);
// // //             if (detail?.pollAnswer) setSelectedPollOption(detail.pollAnswer);
// // //         }
// // //     }, [activeLesson, progressData]);

// // //     const checkEnrollmentAndLoad = async () => {
// // //         try {
// // //             setLoading(true);
// // //             const statusRes = await api(`/api/courses/${courseId}/enrollment-status`);
// // //             if (!statusRes.isEnrolled) {
// // //                 alert("Anda belum terdaftar di kursus ini.");
// // //                 router.push(`/courses/${courseId}`);
// // //             } else {
// // //                 loadData();
// // //             }
// // //         } catch (e) {
// // //             console.error("Gagal cek enrollment", e);
// // //             router.push(`/courses/${courseId}`);
// // //         }
// // //     };

// // //     const loadData = async () => {
// // //         try {
// // //             setLoading(true);
// // //             const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
// // //             const cData = res.course || res;
// // //             setCourse(cData);
            
// // //             // Ambil data progress user yang sedang login
// // //             // Gunakan endpoint yang sama dengan dashboard operator jika memungkinkan, tapi disini pakai endpoint student
// // //             const [prog, msg] = await Promise.all([
// // //                 api(`/api/progress/${courseId}`),
// // //                 api(`/api/courses/${courseId}/messages`)
// // //             ]);
            
// // //             setProgressData(prog);
// // //             setMessages(msg || []);
            
// // //             // Set materi pertama jika belum ada yang aktif
// // //             if (!activeLesson) {
// // //                 const firstMod = cData.modules?.find((m: any) => m.isActive);
// // //                 const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
// // //                 if (firstLes) setActiveLesson(firstLes);
// // //             }
// // //         } catch (e) {
// // //             console.error("Gagal memuat data", e);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     // --- FUNGSI UTAMA: KIRIM DATA KE BACKEND ---
// // //     const handleMarkComplete = async (lessonId: string, extraData: any = {}) => {
// // //         try {
// // //             // Gabungkan lessonId dengan data tambahan (pollAnswer, score, dll)
// // //             const body = { courseId, lessonId, ...extraData };
            
// // //             const res = await api(`/api/progress/complete`, { method: 'POST', body });
            
// // //             // Update state lokal instan agar UI responsif
// // //             setProgressData((prev: any) => ({
// // //                 ...prev,
// // //                 completedLessons: res.completedLessons,
// // //                 percent: res.percent,
// // //                 // Update lessonDetails secara lokal juga jika perlu, tapi biasanya refetch lebih aman
// // //             }));

// // //             // Refetch silent untuk memastikan data sinkron
// // //             const prog = await api(`/api/progress/${courseId}`);
// // //             setProgressData(prog);

// // //         } catch (e: any) { 
// // //             console.error("Gagal update progress:", e);
// // //         }
// // //     };

// // //     // --- HANDLER KHUSUS POLLING ---
// // //     const handlePollSubmit = (option: string) => {
// // //         setSelectedPollOption(option);
// // //         // Kirim jawaban polling ke backend agar Dashboard Operator bisa menghitung
// // //         handleMarkComplete(activeLesson._id, { pollAnswer: option });
// // //     };

// // //     // --- HANDLER KHUSUS GAME EMOJI ---
// // //     const checkEmojiAnswer = () => {
// // //         // Bersihkan HTML tag dari kunci jawaban (yang dibuat di Editor)
// // //         const correctAnswer = activeLesson.content?.replace(/<[^>]*>?/gm, '').trim(); 
        
// // //         // Jika tidak ada kunci jawaban (mungkin lupa diisi admin), anggap benar
// // //         if (!correctAnswer) {
// // //             handleMarkComplete(activeLesson._id);
// // //             setIsEmojiCorrect(true);
// // //             return;
// // //         }

// // //         if (emojiAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
// // //             setIsEmojiCorrect(true);
// // //             handleMarkComplete(activeLesson._id); 
// // //         } else {
// // //             setIsEmojiCorrect(false);
// // //             setTimeout(() => setIsEmojiCorrect(null), 2000); 
// // //         }
// // //     };

// // //     const handleSendChat = async (e: React.FormEvent) => {
// // //         e.preventDefault();
// // //         if (!chatMessage.trim()) return;
// // //         try {
// // //             const res = await api(`/api/courses/${courseId}/messages`, { method: 'POST', body: { text: chatMessage } });
// // //             setMessages([...messages, res]);
// // //             setChatMessage('');
// // //         } catch (e) { alert("Gagal kirim pesan"); }
// // //     };

// // //     const isDone = (id: string) => progressData?.completedLessons?.includes(id);

// // //     const renderContent = () => {
// // //         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
        
// // //         switch (activeLesson.type) {
// // //             case 'video_url': return <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
// // //             case 'embed': return <div className="aspect-[4/3] md:aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg relative"><iframe src={activeLesson.videoUrl || activeLesson.content} className="w-full h-full" title="Embedded Content" allowFullScreen /></div>;
// // //             case 'audio': return <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl text-white flex flex-col items-center justify-center min-h-[300px]"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse"><Mic size={48} /></div><h2 className="text-2xl font-bold mb-2 text-center">{activeLesson.title}</h2><p className="text-pink-100 text-sm mb-8">Dengarkan materi audio ini.</p><audio controls src={getImageUrl(activeLesson.fileUrl)} className="w-full max-w-lg rounded-full shadow-lg" onEnded={() => handleMarkComplete(activeLesson._id)} /></div>;
            
// // //             case 'game_memory': return <GameMemory content={activeLesson.content} lessonId={activeLesson._id} onComplete={() => handleMarkComplete(activeLesson._id)} />;
// // //             case 'game_scavenger': return <GameScavenger content={activeLesson.content} lessonId={activeLesson._id} onComplete={() => handleMarkComplete(activeLesson._id)} />;
            
// // //             case 'game_emoji': 
// // //                 return (
// // //                     <div className="bg-yellow-50 p-8 rounded-3xl border-2 border-yellow-200 shadow-sm relative overflow-hidden transition-all">
// // //                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
// // //                         <div className="text-center mb-8 relative z-10">
// // //                             <div className="inline-block p-3 bg-white rounded-full shadow-md mb-3 text-yellow-500 border border-yellow-100"><Smile size={32} /></div>
// // //                             <h2 className="text-2xl font-black text-yellow-800">🤔 Tebak Kode Emoji</h2>
// // //                             <p className="text-yellow-700 text-sm">Pecahkan teka-teki emoji di bawah ini!</p>
// // //                         </div>
// // //                         <div className="space-y-6 max-w-2xl mx-auto relative z-10">
// // //                             {activeLesson.questions?.map((q: any, idx: number) => (
// // //                                 <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100 text-center">
// // //                                     <div className="text-6xl mb-6 animate-bounce select-none" dangerouslySetInnerHTML={{__html: q.question}}></div>
// // //                                     <input 
// // //                                         className={`w-full p-4 border-2 rounded-xl text-center font-bold text-lg outline-none transition-all ${
// // //                                             (isDone(activeLesson._id) || isEmojiCorrect) ? 'border-green-400 bg-green-50 text-green-600' :
// // //                                             isEmojiCorrect === false ? 'border-red-400 bg-red-50 text-red-600 shake' : 
// // //                                             'border-gray-200 focus:border-yellow-400'
// // //                                         }`} 
// // //                                         placeholder="Ketik jawabanmu..."
// // //                                         value={emojiAnswer}
// // //                                         onChange={(e) => setEmojiAnswer(e.target.value)}
// // //                                         onKeyDown={(e) => e.key === 'Enter' && checkEmojiAnswer()}
// // //                                         disabled={isDone(activeLesson._id) || isEmojiCorrect === true}
// // //                                     />
// // //                                     {isEmojiCorrect === false && <p className="text-red-500 text-sm font-bold mt-2 animate-pulse">Salah, coba lagi!</p>}
// // //                                     {(isDone(activeLesson._id) || isEmojiCorrect === true) && (
// // //                                         <p className="text-green-600 text-sm font-bold mt-2 flex items-center justify-center gap-1">
// // //                                             <CheckCircle size={16}/> Jawaban Benar!
// // //                                         </p>
// // //                                     )}
// // //                                 </div>
// // //                             ))}
// // //                         </div>
                        
// // //                         {!isDone(activeLesson._id) && !isEmojiCorrect && (
// // //                             <div className="mt-8 text-center">
// // //                                 <button 
// // //                                     onClick={checkEmojiAnswer} 
// // //                                     className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-yellow-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" 
// // //                                     disabled={!emojiAnswer}
// // //                                 >
// // //                                     Kirim Jawaban
// // //                                 </button>
// // //                             </div>
// // //                         )}
// // //                     </div>
// // //                 );

// // //             case 'flashcard': 
// // //                 let cards = []; try { cards = JSON.parse(activeLesson.content || '[]'); } catch (e) { cards = []; } 
// // //                 return <div className="space-y-6"><div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 mb-4"><Layers size={24}/><div><h3 className="font-bold">Mode Hafalan</h3><p className="text-xs">Klik kartu untuk membalik.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card:any, idx:number) => (<div key={idx} onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))} className="relative h-64 w-full cursor-pointer perspective-1000 group"><div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${flippedCards[idx] ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pertanyaan</span><p className="text-lg font-bold text-gray-800">{card.front}</p></div><div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180"><span className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-4">Jawaban</span><p className="text-lg font-bold">{card.back}</p></div></div></div>))}</div></div>;
            
// // //             case 'slide': return <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/></div>;
// // //             case 'image': return <div className="rounded-2xl overflow-hidden border shadow-lg bg-gray-900 flex items-center justify-center"><img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto max-h-[500px]"/></div>;
            
// // //             case 'download_doc': return <div className="bg-green-50 p-8 rounded-3xl border border-green-200 flex flex-col items-center justify-center gap-4 text-center"><div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={32}/></div><h2 className="text-xl font-bold text-green-900">{activeLesson.title}</h2><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download onClick={() => handleMarkComplete(activeLesson._id)} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2">Download Dokumen</a></div>;
            
// // //             // [FIX] POLL RENDER & SUBMIT
// // //             case 'poll': return (
// // //                 <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm">
// // //                     <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
// // //                         <BarChart2 className="text-purple-600"/> {activeLesson.pollQuestion}
// // //                     </h2>
// // //                     <div className="space-y-3">
// // //                         {activeLesson.pollOptions?.map((opt:string, i:number) => {
// // //                             const isSelected = selectedPollOption === opt;
// // //                             return (
// // //                                 <button 
// // //                                     key={i} 
// // //                                     onClick={() => handlePollSubmit(opt)}
// // //                                     disabled={isDone(activeLesson._id)}
// // //                                     className={`w-full text-left p-4 rounded-xl font-bold border-2 transition-all flex justify-between items-center ${isSelected ? 'bg-purple-100 border-purple-500 text-purple-900' : 'bg-purple-50 border-purple-100 text-purple-900 hover:bg-purple-100'}`}
// // //                                 >
// // //                                     <span>{opt}</span>
// // //                                     {isSelected && <CheckCircle size={20} className="text-purple-600"/>}
// // //                                 </button>
// // //                             );
// // //                         })}
// // //                     </div>
// // //                     {isDone(activeLesson._id) && <p className="mt-4 text-center text-sm text-gray-500 italic">Terima kasih atas partisipasi Anda.</p>}
// // //                 </div>
// // //             );

// // //             case 'essay': case 'quiz': return <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2><div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6"><div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /></div><div className="border-t pt-6">{activeLesson.type === 'quiz' ? <Link href={`/courses/${courseId}/quiz/${activeLesson._id}`} className="block w-full text-center bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">Mulai Kuis</Link> : <button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-indigo-300 rounded-xl p-8 text-indigo-500 font-bold"><Paperclip className="mb-1"/> Upload Jawaban</button>}</div></div>;
            
// // //             default: return <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex flex-col gap-6"><h2 className="text-2xl font-black text-gray-800">{activeLesson.title}</h2><div className="prose prose-red max-w-none bg-white p-6 rounded-2xl border border-red-100"><div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} /></div></div>;
// // //         }
// // //     };

// // //     if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// // //     const percent = Math.round(progressData?.percent || 0);

// // //     return (
// // //         <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
// // //             <div className={`fixed left-0 right-0 bottom-0 z-[9999] bg-white flex flex-col font-sans transition-all duration-500 ease-in-out shadow-2xl ${isFullScreen ? 'top-0' : 'top-[80px]'}`}>
// // //                 <header className="bg-[#B91C1C] text-white p-4 flex items-center justify-between shrink-0 shadow-md relative z-50">
// // //                     <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] flex justify-center"><button onClick={() => setIsFullScreen(!isFullScreen)} className="w-16 h-6 bg-white border-x border-b border-white/50 rounded-b-xl shadow-lg flex items-center justify-center text-[#B91C1C] hover:bg-gray-100 hover:h-7 transition-all group" title={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"} aria-label={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}>{isFullScreen ? <ChevronDown size={20} className="group-hover:mt-1 transition-all font-bold"/> : <ChevronUp size={20} className="group-hover:-mt-1 transition-all font-bold"/>}</button></div>
// // //                     <div className="flex items-center gap-4"><Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali ke Kursus"><ArrowLeft size={20}/></Link><div><h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1><div className="flex items-center gap-2 mt-0.5"><div className="w-24 h-1.5 bg-red-800 rounded-full overflow-hidden border border-red-700"><div ref={progressBarRef} className="h-full bg-white rounded-full" role="progressbar" aria-label="Progres Belajar"></div></div><span className="text-[10px] font-bold text-red-100">{percent}% SELESAI</span></div></div></div>
// // //                     <div className="flex items-center gap-3"><div className="w-8 h-8 rounded bg-white text-[#B91C1C] flex items-center justify-center font-bold text-xs uppercase shadow-lg">{course?.organizer?.charAt(0)}</div><button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu" aria-label="Buka Menu"><Menu size={18}/></button></div>
// // //                 </header>

// // //                 <div className="flex flex-1 overflow-hidden relative">
// // //                     <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
// // //                         <div className="p-5 border-b bg-gray-50/50 flex justify-between items-center"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3><button onClick={() => setShowMobileMenu(false)} className="lg:hidden text-gray-400 hover:text-red-600" title="Tutup Menu" aria-label="Tutup Menu"><X size={18}/></button></div>
// // //                         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">{course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (<div key={mod._id}><div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div><div className="space-y-1">{mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (<button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`} aria-label={`Pilih materi ${les.title}`}>{getSidebarIcon(les.type, isDone(les._id))}<div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div></button>))}</div></div>))}</div>
// // //                         <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
// // //                     </aside>

// // //                     <main className="flex-1 relative flex flex-col min-w-0">
// // //                         <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar pb-32">
// // //                             <div className="max-w-4xl mx-auto">
// // //                                 <div className="mb-8 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">{renderContent()}</div>
// // //                                 {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && activeLesson?.content && !['flashcard', 'audio', 'embed', 'game_memory', 'game_scavenger', 'game_emoji'].includes(activeLesson.type) && (<div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"><div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} /></div>)}
// // //                             </div>
// // //                         </div>
                        
// // //                         <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 md:p-4 flex justify-between items-center z-20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
// // //                             <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
// // //                             {!isDone(activeLesson?._id) ? (<button onClick={() => handleMarkComplete(activeLesson?._id)} disabled={activeLesson?.type === 'game_emoji' && !isEmojiCorrect} className={`w-full md:w-auto px-6 py-2 rounded-xl font-black text-xs shadow-xl transition-all uppercase tracking-widest flex items-center justify-center gap-2 ${activeLesson?.type === 'game_emoji' && !isEmojiCorrect ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white shadow-red-200 active:scale-95'}`}><CheckCircle size={16}/> {activeLesson?.type === 'game_emoji' ? 'Selesaikan Game' : 'Tandai Selesai'}</button>) : (<div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-6 py-2 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"><CheckCircle size={16}/> Materi Lulus</div>)}
// // //                         </div>
// // //                     </main>

// // //                     <button onClick={() => setShowChat(!showChat)} className="absolute right-6 bottom-28 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi"><MessageSquare size={24}/>{messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}</button>
// // //                     {showChat && (<div className="absolute right-6 bottom-28 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden"><div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0"><div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div><button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat" aria-label="Tutup Chat"><X size={18}/></button></div><div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">{messages.map((m, i) => (<div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}><span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span><div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div></div>))}<div ref={messagesEndRef} /></div><form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0"><input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} aria-label="Ketik pesan chat"/><button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button></form></div>)}
// // //                 </div>
// // //             </div>
// // //         </Protected>
// // //     );
// // // }

// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import { api, getImageUrl } from '@/lib/api';
// // import { useAuth } from '@/lib/AuthProvider';
// // import Protected from '@/components/Protected';
// // import { 
// //     ArrowLeft, CheckCircle, PlayCircle, Lock, 
// //     MessageSquare, FileText, Send, Loader2, 
// //     HeadphonesIcon, Menu, X, BarChart2, Paperclip, 
// //     Mic, RotateCw, Layers, Globe, ChevronUp, ChevronDown, 
// //     Maximize2, Minimize2, Smile, Gamepad2, Camera, Video, Clock,
// //     RefreshCw // Ditambahkan untuk tombol soft refresh
// // } from 'lucide-react';
// // import Link from 'next/link';

// // import GameMemory from '@/components/course/GameMemory';
// // import GameScavenger from '@/components/course/GameScavenger';

// // const getSidebarIcon = (type: string, isCompleted: boolean) => {
// //     if (isCompleted) return <CheckCircle className="text-green-500 shrink-0" size={18}/>;
// //     switch (type) {
// //         case 'video_url': return <Video className="text-red-500 shrink-0" size={18}/>;
// //         case 'game_memory': return <Gamepad2 className="text-violet-500 shrink-0" size={18}/>;
// //         case 'game_scavenger': return <Camera className="text-rose-500 shrink-0" size={18}/>;
// //         case 'game_emoji': return <Smile className="text-yellow-500 shrink-0" size={18}/>;
// //         case 'audio': return <Mic className="text-pink-500 shrink-0" size={18}/>;
// //         case 'quiz': return <FileText className="text-orange-500 shrink-0" size={18}/>;
// //         case 'poll': return <BarChart2 className="text-emerald-500 shrink-0" size={18}/>;
// //         case 'flashcard': return <Layers className="text-orange-500 shrink-0" size={18}/>;
// //         case 'embed': return <Globe className="text-teal-500 shrink-0" size={18}/>;
// //         default: return <PlayCircle className="text-gray-300 shrink-0" size={18}/>;
// //     }
// // };

// // export default function CoursePlayPage() {
// //     const params = useParams();
// //     const router = useRouter();
// //     const { user } = useAuth();
// //     const courseId = params?.courseId as string;

// //     const [course, setCourse] = useState<any>(null);
// //     const [loading, setLoading] = useState(true);
// //     const [isSoftRefreshing, setIsSoftRefreshing] = useState(false); // State untuk loading soft refresh
// //     const [activeLesson, setActiveLesson] = useState<any>(null);
// //     const [progressData, setProgressData] = useState<any>(null);
// //     const [messages, setMessages] = useState<any[]>([]);
// //     const [chatMessage, setChatMessage] = useState('');
// //     const [showChat, setShowChat] = useState(false);
// //     const [showMobileMenu, setShowMobileMenu] = useState(false);
// //     const [isFullScreen, setIsFullScreen] = useState(true);

// //     // Game States
// //     const [emojiAnswer, setEmojiAnswer] = useState('');
// //     const [isEmojiCorrect, setIsEmojiCorrect] = useState<boolean | null>(null);
// //     const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
    
// //     // Polling State
// //     const [selectedPollOption, setSelectedPollOption] = useState<string | null>(null);

// //     // Timer State
// //     const [timeLeft, setTimeLeft] = useState<number | null>(null);

// //     const progressBarRef = useRef<HTMLDivElement>(null);
// //     const messagesEndRef = useRef<HTMLDivElement>(null);

// //     const isDone = (id: string) => {
// //         if (!progressData?.completedLessons) return false;
// //         return progressData.completedLessons.some((lId: any) => String(lId) === String(id));
// //     };

// //     // Helper untuk membuat Key unik per materi per user di LocalStorage
// //     const getTimerKey = () => `timer_${courseId}_${activeLesson?._id}_${(user as any)?._id}`;

// //     // --- EFFECT: INITIAL LOAD ---
// //     useEffect(() => {
// //         if (!courseId || !user) return;
// //         if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// //             loadData();
// //             return;
// //         }
// //         checkEnrollmentAndLoad();
// //     }, [courseId, user]);

// //     // --- EFFECT: AUTO SYNC PROGRESS ---
// //     useEffect(() => {
// //         if (!courseId) return;
// //         const interval = setInterval(async () => {
// //             try {
// //                 const prog = await api(`/api/progress/${courseId}?t=${Date.now()}`);
// //                 setProgressData(prog);
// //             } catch (e) {}
// //         }, 5000); 
// //         return () => clearInterval(interval);
// //     }, [courseId]);

// //     // --- EFFECT: PROGRESS BAR UI ---
// //     useEffect(() => {
// //         if (progressBarRef.current) {
// //             const percent = Math.round(progressData?.percent || 0);
// //             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
// //             progressBarRef.current.style.width = `${percent}%`;
// //         }
// //     }, [progressData]);

// //     // --- EFFECT: AUTO SCROLL CHAT ---
// //     useEffect(() => {
// //         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //     }, [messages, showChat]);

// //     // --- EFFECT: INIT MATERI BARU & PERSISTENT TIMER ---
// //     useEffect(() => {
// //         if (!activeLesson) return;

// //         const completed = isDone(activeLesson._id);

// //         if (!completed) {
// //             setSelectedPollOption(null);
// //             setEmojiAnswer('');
// //             setIsEmojiCorrect(null);
// //             setFlippedCards({});
            
// //             // LOGIKA PERSISTENT TIMER
// //             if (activeLesson.quizDuration > 0) {
// //                 const timerKey = getTimerKey();
// //                 const savedEndTime = localStorage.getItem(timerKey);
// //                 const now = Date.now();

// //                 if (savedEndTime) {
// //                     // Jika sudah ada waktu berakhir di memori browser, hitung sisanya
// //                     const remainingSec = Math.floor((parseInt(savedEndTime) - now) / 1000);
// //                     if (remainingSec > 0) {
// //                         setTimeLeft(remainingSec);
// //                     } else {
// //                         setTimeLeft(0); // Waktu sudah habis
// //                     }
// //                 } else {
// //                     // Jika baru pertama kali buka materi ini, set waktu berakhir ke depan
// //                     const durationSec = activeLesson.quizDuration * 60;
// //                     const endTime = now + (durationSec * 1000);
// //                     localStorage.setItem(timerKey, endTime.toString());
// //                     setTimeLeft(durationSec);
// //                 }
// //             } else {
// //                 setTimeLeft(null); // Tidak ada timer
// //             }
// //         } else {
// //             setTimeLeft(null); // Matikan timer jika sudah selesai
// //             if (progressData?.lessonDetails) {
// //                 const detail = progressData.lessonDetails.find((d: any) => String(d.lessonId) === String(activeLesson._id));
// //                 if (detail?.pollAnswer) setSelectedPollOption(detail.pollAnswer);
// //                 if (activeLesson.type === 'game_emoji') setIsEmojiCorrect(true);
// //             }
// //         }
// //     }, [activeLesson?._id, progressData?.completedLessons?.length]);

// //     // --- EFFECT: COUNTDOWN TIMER TICK REALTIME ---
// //     useEffect(() => {
// //         if (timeLeft === null || timeLeft <= 0) return;
        
// //         const timerKey = getTimerKey();
// //         const timer = setInterval(() => {
// //             const savedEndTime = localStorage.getItem(timerKey);
// //             if (savedEndTime) {
// //                 // Selalu hitung berdasarkan waktu nyata komputer, bukan dikurangi manual
// //                 const remaining = Math.floor((parseInt(savedEndTime) - Date.now()) / 1000);
// //                 if (remaining <= 0) {
// //                     setTimeLeft(0);
// //                     clearInterval(timer);
// //                 } else {
// //                     setTimeLeft(remaining);
// //                 }
// //             }
// //         }, 1000);

// //         return () => clearInterval(timer);
// //     }, [timeLeft, activeLesson]);

// //     const formatTime = (seconds: number) => {
// //         const m = Math.floor(seconds / 60).toString().padStart(2, '0');
// //         const s = (seconds % 60).toString().padStart(2, '0');
// //         return `${m}:${s}`;
// //     };

// //     const handleRestartTimer = () => {
// //         if (activeLesson?.quizDuration) {
// //             const now = Date.now();
// //             const durationSec = activeLesson.quizDuration * 60;
// //             const endTime = now + (durationSec * 1000);
            
// //             // Set ulang localStorage
// //             localStorage.setItem(getTimerKey(), endTime.toString());
// //             setTimeLeft(durationSec);
// //         }
// //     };

// //     // --- FUNGSI SOFT REFRESH ---
// //     const handleSoftRefresh = async () => {
// //         setIsSoftRefreshing(true);
// //         try {
// //             // Ambil data progress terbaru tanpa reload halaman
// //             const prog = await api(`/api/progress/${courseId}?t=${Date.now()}`);
// //             setProgressData(prog);
// //         } catch (e) {
// //             console.error("Gagal refresh data");
// //         } finally {
// //             // Beri jeda sedikit agar putaran ikon terlihat
// //             setTimeout(() => setIsSoftRefreshing(false), 500);
// //         }
// //     };

// //     const checkEnrollmentAndLoad = async () => {
// //         try {
// //             setLoading(true);
// //             const statusRes = await api(`/api/courses/${courseId}/enrollment-status?t=${Date.now()}`);
// //             if (!statusRes.isEnrolled) {
// //                 alert("Anda belum terdaftar di kursus ini.");
// //                 router.push(`/courses/${courseId}`);
// //             } else {
// //                 loadData();
// //             }
// //         } catch (e) {
// //             console.error("Gagal cek enrollment", e);
// //             router.push(`/courses/${courseId}`);
// //         }
// //     };

// //     const loadData = async () => {
// //         try {
// //             setLoading(true);
// //             const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
// //             const cData = res.course || res;
// //             setCourse(cData);
            
// //             const [prog, msg] = await Promise.all([
// //                 api(`/api/progress/${courseId}?t=${Date.now()}`),
// //                 api(`/api/courses/${courseId}/messages?t=${Date.now()}`)
// //             ]);
            
// //             setProgressData(prog);
// //             setMessages(msg || []);
            
// //             if (!activeLesson) {
// //                 const firstMod = cData.modules?.find((m: any) => m.isActive);
// //                 const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
// //                 if (firstLes) setActiveLesson(firstLes);
// //             }
// //         } catch (e) {
// //             console.error("Gagal memuat data", e);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleMarkComplete = async (lessonId: string, extraData: any = {}) => {
// //         try {
// //             const body = { courseId, lessonId, ...extraData };
// //             const res = await api(`/api/progress/complete`, { method: 'POST', body });
            
// //             setProgressData((prev: any) => ({
// //                 ...prev,
// //                 completedLessons: res.completedLessons,
// //                 percent: res.percent,
// //             }));

// //             // Hapus timer dari localStorage karena sudah selesai
// //             localStorage.removeItem(getTimerKey());
// //             setTimeLeft(null); 

// //             // Force refetch untuk mendapat struktur utuh lessonDetails yang baru
// //             const prog = await api(`/api/progress/${courseId}?t=${Date.now()}`);
// //             setProgressData(prog);

// //         } catch (e: any) { 
// //             console.error("Gagal update progress:", e);
// //         }
// //     };

// //     const handlePollSubmit = (option: string) => {
// //         if (timeLeft === 0) return; // Block jika waktu habis
// //         setSelectedPollOption(option);
// //         handleMarkComplete(activeLesson._id, { pollAnswer: option });
// //     };

// //     const checkEmojiAnswer = () => {
// //         if (timeLeft === 0) return; // Block jika waktu habis
// //         const correctAnswer = activeLesson.content?.replace(/<[^>]*>?/gm, '').trim(); 
// //         if (!correctAnswer) {
// //             handleMarkComplete(activeLesson._id);
// //             setIsEmojiCorrect(true);
// //             return;
// //         }

// //         if (emojiAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
// //             setIsEmojiCorrect(true);
// //             handleMarkComplete(activeLesson._id); 
// //         } else {
// //             setIsEmojiCorrect(false);
// //             setTimeout(() => setIsEmojiCorrect(null), 2000); 
// //         }
// //     };

// //     const handleSendChat = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!chatMessage.trim()) return;
// //         try {
// //             const res = await api(`/api/courses/${courseId}/messages`, { method: 'POST', body: { text: chatMessage } });
// //             setMessages([...messages, res]);
// //             setChatMessage('');
// //         } catch (e) { alert("Gagal kirim pesan"); }
// //     };

// //     const renderContent = () => {
// //         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
        
// //         const isTimeUp = timeLeft === 0;

// //         switch (activeLesson.type) {
// //             case 'video_url': return <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
// //             case 'embed': return <div className="aspect-[4/3] md:aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg relative"><iframe src={activeLesson.videoUrl || activeLesson.content} className="w-full h-full" title="Embedded Content" allowFullScreen /></div>;
// //             case 'audio': return <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl text-white flex flex-col items-center justify-center min-h-[300px]"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse"><Mic size={48} /></div><h2 className="text-2xl font-bold mb-2 text-center">{activeLesson.title}</h2><p className="text-pink-100 text-sm mb-8">Dengarkan materi audio ini.</p><audio controls src={getImageUrl(activeLesson.fileUrl)} className="w-full max-w-lg rounded-full shadow-lg" onEnded={() => { if(!isTimeUp) handleMarkComplete(activeLesson._id) }} /></div>;
            
// //             case 'game_memory': return <GameMemory content={activeLesson.content} lessonId={activeLesson._id} onComplete={() => { if(!isTimeUp) handleMarkComplete(activeLesson._id) }} />;
// //             case 'game_scavenger': return <GameScavenger content={activeLesson.content} lessonId={activeLesson._id} onComplete={() => { if(!isTimeUp) handleMarkComplete(activeLesson._id) }} />;
            
// //             case 'game_emoji': 
// //                 return (
// //                     <div className="bg-yellow-50 p-8 rounded-3xl border-2 border-yellow-200 shadow-sm relative overflow-hidden transition-all">
// //                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
// //                         <div className="text-center mb-8 relative z-10">
// //                             <div className="inline-block p-3 bg-white rounded-full shadow-md mb-3 text-yellow-500 border border-yellow-100"><Smile size={32} /></div>
// //                             <h2 className="text-2xl font-black text-yellow-800">🤔 Tebak Kode Emoji</h2>
// //                             <p className="text-yellow-700 text-sm">Pecahkan teka-teki emoji di bawah ini!</p>
// //                         </div>
// //                         <div className="space-y-6 max-w-2xl mx-auto relative z-10">
// //                             {activeLesson.questions?.map((q: any, idx: number) => (
// //                                 <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100 text-center">
// //                                     <div className="text-6xl mb-6 animate-bounce select-none" dangerouslySetInnerHTML={{__html: q.question}}></div>
// //                                     <input 
// //                                         className={`w-full p-4 border-2 rounded-xl text-center font-bold text-lg outline-none transition-all ${
// //                                             (isDone(activeLesson._id) || isEmojiCorrect) ? 'border-green-400 bg-green-50 text-green-600' :
// //                                             isEmojiCorrect === false ? 'border-red-400 bg-red-50 text-red-600 shake' : 
// //                                             isTimeUp ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed' :
// //                                             'border-gray-200 focus:border-yellow-400'
// //                                         }`} 
// //                                         placeholder={isTimeUp ? "Waktu Habis!" : "Ketik jawabanmu..."}
// //                                         value={emojiAnswer}
// //                                         onChange={(e) => setEmojiAnswer(e.target.value)}
// //                                         onKeyDown={(e) => e.key === 'Enter' && !isTimeUp && checkEmojiAnswer()}
// //                                         disabled={isDone(activeLesson._id) || isEmojiCorrect === true || isTimeUp}
// //                                     />
// //                                     {isEmojiCorrect === false && <p className="text-red-500 text-sm font-bold mt-2 animate-pulse">Salah, coba lagi!</p>}
// //                                     {(isDone(activeLesson._id) || isEmojiCorrect === true) && (
// //                                         <p className="text-green-600 text-sm font-bold mt-2 flex items-center justify-center gap-1">
// //                                             <CheckCircle size={16}/> Jawaban Benar!
// //                                         </p>
// //                                     )}
// //                                 </div>
// //                             ))}
// //                         </div>
                        
// //                         {!isDone(activeLesson._id) && !isEmojiCorrect && (
// //                             <div className="mt-8 text-center">
// //                                 <button 
// //                                     onClick={checkEmojiAnswer} 
// //                                     className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 ${
// //                                         !emojiAnswer || isTimeUp
// //                                         ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
// //                                         : 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-yellow-200'
// //                                     }`} 
// //                                     disabled={!emojiAnswer || isTimeUp}
// //                                 >
// //                                     Kirim Jawaban
// //                                 </button>
// //                             </div>
// //                         )}
// //                     </div>
// //                 );

// //             case 'flashcard': 
// //                 let cards = []; try { cards = JSON.parse(activeLesson.content || '[]'); } catch (e) { cards = []; } 
// //                 return <div className="space-y-6"><div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 mb-4"><Layers size={24}/><div><h3 className="font-bold">Mode Hafalan</h3><p className="text-xs">Klik kartu untuk membalik.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card:any, idx:number) => (<div key={idx} onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))} className="relative h-64 w-full cursor-pointer perspective-1000 group"><div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${flippedCards[idx] ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pertanyaan</span><p className="text-lg font-bold text-gray-800">{card.front}</p></div><div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180"><span className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-4">Jawaban</span><p className="text-lg font-bold">{card.back}</p></div></div></div>))}</div></div>;
            
// //             case 'slide': return <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/></div>;
// //             case 'image': return <div className="rounded-2xl overflow-hidden border shadow-lg bg-gray-900 flex items-center justify-center"><img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto max-h-[500px]"/></div>;
            
// //             case 'download_doc': return <div className="bg-green-50 p-8 rounded-3xl border border-green-200 flex flex-col items-center justify-center gap-4 text-center"><div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={32}/></div><h2 className="text-xl font-bold text-green-900">{activeLesson.title}</h2><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download onClick={() => { if(!isTimeUp) handleMarkComplete(activeLesson._id) }} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2">Download Dokumen</a></div>;
            
// //             case 'poll': return (
// //                 <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm">
// //                     <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
// //                         <BarChart2 className="text-purple-600"/> {activeLesson.pollQuestion}
// //                     </h2>
// //                     <div className="space-y-3">
// //                         {activeLesson.pollOptions?.map((opt:string, i:number) => {
// //                             const isSelected = selectedPollOption === opt;
// //                             return (
// //                                 <button 
// //                                     key={i} 
// //                                     onClick={() => handlePollSubmit(opt)}
// //                                     disabled={isDone(activeLesson._id) || isTimeUp}
// //                                     className={`w-full text-left p-4 rounded-xl font-bold border-2 transition-all flex justify-between items-center ${
// //                                         isSelected ? 'bg-purple-100 border-purple-500 text-purple-900' : 
// //                                         isTimeUp && !isSelected ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed' :
// //                                         'bg-purple-50 border-purple-100 text-purple-900 hover:bg-purple-100'
// //                                     }`}
// //                                 >
// //                                     <span>{opt}</span>
// //                                     {isSelected && <CheckCircle size={20} className="text-purple-600"/>}
// //                                 </button>
// //                             );
// //                         })}
// //                     </div>
// //                     {isDone(activeLesson._id) && <p className="mt-4 text-center text-sm text-gray-500 italic">Terima kasih atas partisipasi Anda.</p>}
// //                 </div>
// //             );

// //             case 'essay': case 'quiz': return <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2><div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6"><div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /></div><div className="border-t pt-6">{activeLesson.type === 'quiz' ? <Link href={`/courses/${courseId}/quiz/${activeLesson._id}`} className="block w-full text-center bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">Mulai Kuis</Link> : <button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-indigo-300 rounded-xl p-8 text-indigo-500 font-bold"><Paperclip className="mb-1"/> Upload Jawaban</button>}</div></div>;
            
// //             default: return (
// //                 <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex flex-col gap-6">
// //                     <h2 className="text-2xl font-black text-gray-800">{activeLesson.title}</h2>
// //                     <div className="prose prose-red max-w-none bg-white p-6 rounded-2xl border border-red-100">
// //                         <div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} />
// //                     </div>
// //                 </div>
// //             );
// //         }
// //     };

// //     if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
    
// //     const percent = Math.round(progressData?.percent || 0);
// //     const isTimeUp = timeLeft === 0;

// //     return (
// //         <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
// //             <div className={`fixed left-0 right-0 bottom-0 z-[9999] bg-white flex flex-col font-sans transition-all duration-500 ease-in-out shadow-2xl ${isFullScreen ? 'top-0' : 'top-[80px]'}`}>
// //                 <header className="bg-[#B91C1C] text-white p-4 flex items-center justify-between shrink-0 shadow-md relative z-50">
// //                     <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] flex justify-center"><button onClick={() => setIsFullScreen(!isFullScreen)} className="w-16 h-6 bg-white border-x border-b border-white/50 rounded-b-xl shadow-lg flex items-center justify-center text-[#B91C1C] hover:bg-gray-100 hover:h-7 transition-all group" title={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"} aria-label={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}>{isFullScreen ? <ChevronDown size={20} className="group-hover:mt-1 transition-all font-bold"/> : <ChevronUp size={20} className="group-hover:-mt-1 transition-all font-bold"/>}</button></div>
// //                     <div className="flex items-center gap-4">
// //                         <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali ke Kursus"><ArrowLeft size={20}/></Link>
// //                         <div>
// //                             <div className="flex items-center gap-2">
// //                                 <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1>
// //                                 {/* TOMBOL SOFT REFRESH */}
// //                                 <button 
// //                                     onClick={handleSoftRefresh} 
// //                                     className={`p-1 hover:bg-white/20 rounded-md transition-all ${isSoftRefreshing ? 'animate-spin opacity-50' : ''}`} 
// //                                     title="Refresh Data Terkini"
// //                                     aria-label="Refresh Data"
// //                                 >
// //                                     <RefreshCw size={14} />
// //                                 </button>
// //                             </div>
// //                             <div className="flex items-center gap-2 mt-0.5"><div className="w-24 h-1.5 bg-red-800 rounded-full overflow-hidden border border-red-700"><div ref={progressBarRef} className="h-full bg-white rounded-full" role="progressbar" aria-label="Progres Belajar"></div></div><span className="text-[10px] font-bold text-red-100">{percent}% SELESAI</span></div>
// //                         </div>
// //                     </div>
// //                     <div className="flex items-center gap-3"><div className="w-8 h-8 rounded bg-white text-[#B91C1C] flex items-center justify-center font-bold text-xs uppercase shadow-lg">{course?.organizer?.charAt(0)}</div><button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu" aria-label="Buka Menu"><Menu size={18}/></button></div>
// //                 </header>

// //                 <div className="flex flex-1 overflow-hidden relative">
// //                     <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
// //                         <div className="p-5 border-b bg-gray-50/50 flex justify-between items-center"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3><button onClick={() => setShowMobileMenu(false)} className="lg:hidden text-gray-400 hover:text-red-600" title="Tutup Menu" aria-label="Tutup Menu"><X size={18}/></button></div>
// //                         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">{course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (<div key={mod._id}><div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div><div className="space-y-1">{mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (<button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`} aria-label={`Pilih materi ${les.title}`}>{getSidebarIcon(les.type, isDone(les._id))}<div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div></button>))}</div></div>))}</div>
// //                         <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
// //                     </aside>

// //                     <main className="flex-1 relative flex flex-col min-w-0">
// //                         <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar pb-32">
// //                             <div className="max-w-4xl mx-auto">
// //                                 <div className="mb-8 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">
// //                                     {renderContent()}
// //                                 </div>
                                
// //                                 {activeLesson?.content && 
// //                                  !['lesson', 'upload_doc', 'virtual_class', 'google_classroom', 'essay', 'quiz', 'poll', 'flashcard', 'audio', 'embed', 'game_memory', 'game_scavenger', 'game_emoji'].includes(activeLesson.type) && (
// //                                     <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mt-6">
// //                                         <div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} />
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         </div>
                        
// //                         <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 md:p-4 flex justify-between items-center z-20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
// //                             <div className="flex items-center gap-4">
// //                                 <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
                                
// //                                 {/* WIDGET TIMER */}
// //                                 {timeLeft !== null && !isDone(activeLesson?._id) && (
// //                                     <div className={`flex items-center gap-2 font-bold px-3 py-1.5 rounded-lg text-xs border ${isTimeUp ? 'bg-red-50 text-red-600 border-red-200' : 'bg-orange-50 text-orange-600 border-orange-200 animate-pulse'}`}>
// //                                         <Clock size={16} />
// //                                         {isTimeUp ? 'Waktu Habis!' : `Sisa Waktu: ${formatTime(timeLeft)}`}
// //                                     </div>
// //                                 )}
// //                             </div>

// //                             <div className="flex items-center gap-2">
// //                                 {/* TOMBOL RESTART TIMER */}
// //                                 {isTimeUp && !isDone(activeLesson?._id) && (
// //                                     <button 
// //                                         onClick={handleRestartTimer} 
// //                                         className="px-4 py-2 rounded-xl font-bold text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center gap-2 transition-all shadow-sm"
// //                                         title="Ulangi Waktu"
// //                                     >
// //                                         <RotateCw size={14}/> Ulangi Waktu
// //                                     </button>
// //                                 )}

// //                                 {!isDone(activeLesson?._id) ? (
// //                                     <button 
// //                                         onClick={() => handleMarkComplete(activeLesson?._id)} 
// //                                         disabled={(activeLesson?.type === 'game_emoji' && !isEmojiCorrect) || isTimeUp} 
// //                                         className={`w-full md:w-auto px-6 py-2 rounded-xl font-black text-xs shadow-xl transition-all uppercase tracking-widest flex items-center justify-center gap-2 ${
// //                                             (activeLesson?.type === 'game_emoji' && !isEmojiCorrect) || isTimeUp 
// //                                             ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
// //                                             : 'bg-red-600 hover:bg-red-700 text-white shadow-red-200 active:scale-95'
// //                                         }`}
// //                                     >
// //                                         <CheckCircle size={16}/> {activeLesson?.type === 'game_emoji' ? 'Selesaikan Game' : 'Tandai Selesai'}
// //                                     </button>
// //                                 ) : (
// //                                     <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-6 py-2 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm">
// //                                         <CheckCircle size={16}/> Materi Lulus
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     </main>

// //                     <button onClick={() => setShowChat(!showChat)} className="absolute right-6 bottom-28 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi"><MessageSquare size={24}/>{messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}</button>
// //                     {showChat && (<div className="absolute right-6 bottom-28 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden"><div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0"><div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div><button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat" aria-label="Tutup Chat"><X size={18}/></button></div><div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">{messages.map((m, i) => (<div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}><span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span><div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div></div>))}<div ref={messagesEndRef} /></div><form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0"><input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} aria-label="Ketik pesan chat"/><button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button></form></div>)}
// //                 </div>
// //             </div>
// //         </Protected>
// //     );
// // }

// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { api, getImageUrl, apiUpload } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';
// import Protected from '@/components/Protected';
// import { 
//     ArrowLeft, CheckCircle, PlayCircle, Lock, 
//     MessageSquare, FileText, Send, Loader2, 
//     HeadphonesIcon, Menu, X, BarChart2, Paperclip, 
//     Mic, RotateCw, Layers, Globe, ChevronUp, ChevronDown, 
//     Smile, Gamepad2, Camera, Video, Clock,
//     RefreshCw, UploadCloud
// } from 'lucide-react';
// import Link from 'next/link';

// import GameMemory from '@/components/course/GameMemory';
// import GameScavenger from '@/components/course/GameScavenger';

// const getSidebarIcon = (type: string, isCompleted: boolean) => {
//     if (isCompleted) return <CheckCircle className="text-green-500 shrink-0" size={18}/>;
//     switch (type) {
//         case 'video_url': return <Video className="text-red-500 shrink-0" size={18}/>;
//         case 'game_memory': return <Gamepad2 className="text-violet-500 shrink-0" size={18}/>;
//         case 'game_scavenger': return <Camera className="text-rose-500 shrink-0" size={18}/>;
//         case 'game_emoji': return <Smile className="text-yellow-500 shrink-0" size={18}/>;
//         case 'audio': return <Mic className="text-pink-500 shrink-0" size={18}/>;
//         case 'quiz': return <FileText className="text-orange-500 shrink-0" size={18}/>;
//         case 'poll': return <BarChart2 className="text-emerald-500 shrink-0" size={18}/>;
//         case 'flashcard': return <Layers className="text-orange-500 shrink-0" size={18}/>;
//         case 'embed': return <Globe className="text-teal-500 shrink-0" size={18}/>;
//         default: return <PlayCircle className="text-gray-300 shrink-0" size={18}/>;
//     }
// };

// export default function CoursePlayPage() {
//     const params = useParams();
//     const router = useRouter();
//     const { user } = useAuth();
//     const courseId = params?.courseId as string;

//     const [course, setCourse] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const [isSoftRefreshing, setIsSoftRefreshing] = useState(false);
//     const [activeLesson, setActiveLesson] = useState<any>(null);
//     const [progressData, setProgressData] = useState<any>(null);
//     const [messages, setMessages] = useState<any[]>([]);
//     const [chatMessage, setChatMessage] = useState('');
//     const [showChat, setShowChat] = useState(false);
//     const [showMobileMenu, setShowMobileMenu] = useState(false);
//     const [isFullScreen, setIsFullScreen] = useState(true);

//     // --- INTERACTIVE STATES ---
//     const [emojiAnswer, setEmojiAnswer] = useState('');
//     const [isEmojiCorrect, setIsEmojiCorrect] = useState<boolean | null>(null);
//     const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
//     const [selectedPollOption, setSelectedPollOption] = useState<string | null>(null);
//     const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
//     const [taskFile, setTaskFile] = useState<File | null>(null);
//     const [isSubmittingTask, setIsSubmittingTask] = useState(false);

//     // --- TIMER STATES ---
//     const [timeLeft, setTimeLeft] = useState<number | null>(null);
//     const [isTimerStarted, setIsTimerStarted] = useState<boolean>(true); 

//     const progressBarRef = useRef<HTMLDivElement>(null);
//     const messagesEndRef = useRef<HTMLDivElement>(null);

//     const isDone = (id: string) => {
//         if (!progressData?.completedLessons) return false;
//         return progressData.completedLessons.some((lId: any) => String(lId) === String(id));
//     };

//     const getTimerKey = () => `timer_${courseId}_${activeLesson?._id}_${(user as any)?._id}`;

//     // --- EFFECT: INITIAL LOAD ---
//     useEffect(() => {
//         if (!courseId || !user) return;
//         if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
//             loadData();
//             return;
//         }
//         checkEnrollmentAndLoad();
//     }, [courseId, user]);

//     // --- EFFECT: AUTO SYNC PROGRESS DARI ADMIN ---
//     useEffect(() => {
//         if (!courseId) return;
//         const interval = setInterval(async () => {
//             try {
//                 const prog = await api(`/api/progress/${courseId}?t=${Date.now()}`);
//                 // Hanya perbarui jika ada perubahan data kelulusan agar tidak mengganggu ketikan peserta
//                 setProgressData((prev: any) => {
//                     if (JSON.stringify(prev?.completedLessons) !== JSON.stringify(prog?.completedLessons)) {
//                         return prog;
//                     }
//                     return prev;
//                 });
//             } catch (e) {}
//         }, 5000); 
//         return () => clearInterval(interval);
//     }, [courseId]);

//     // --- EFFECT: PROGRESS BAR UI ---
//     useEffect(() => {
//         if (progressBarRef.current) {
//             const percent = Math.round(progressData?.percent || 0);
//             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
//             progressBarRef.current.style.width = `${percent}%`;
//         }
//     }, [progressData?.percent]);

//     // --- EFFECT: AUTO SCROLL CHAT ---
//     useEffect(() => {
//         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages, showChat]);

//     // Variabel penentu aman apakah lesson saat ini sudah lulus
//     const isCurrentLessonDone = activeLesson ? isDone(activeLesson._id) : false;

//     // --- EFFECT: INIT MATERI BARU & PERSISTENT TIMER ---
//     useEffect(() => {
//         if (!activeLesson) return;

//         if (!isCurrentLessonDone) {
//             // MATERI BELUM LULUS (Atau baru saja di-reset admin) -> Bersihkan UI
//             setSelectedPollOption(null);
//             setEmojiAnswer('');
//             setIsEmojiCorrect(null);
//             setFlippedCards({});
//             setEssayAnswers(activeLesson.questions?.map(() => '') || []);
//             setTaskFile(null);
//             setIsSubmittingTask(false);
            
//             // LOGIKA PERSISTENT TIMER
//             const duration = Number(activeLesson.quizDuration) || 0;
//             if (duration > 0) {
//                 const timerKey = getTimerKey();
//                 const savedEndTime = localStorage.getItem(timerKey);
//                 const now = Date.now();

//                 if (savedEndTime) {
//                     const remainingSec = Math.floor((parseInt(savedEndTime) - now) / 1000);
//                     if (remainingSec > 0) {
//                         setTimeLeft(remainingSec);
//                         setIsTimerStarted(true); 
//                     } else {
//                         setTimeLeft(0); 
//                         setIsTimerStarted(true); 
//                     }
//                 } else {
//                     setTimeLeft(duration * 60); 
//                     setIsTimerStarted(false); // Buka layar "Mulai Kerjakan"
//                 }
//             } else {
//                 setTimeLeft(null); 
//                 setIsTimerStarted(true); 
//             }
//         } else {
//             // MATERI SUDAH LULUS -> Matikan Timer & Tarik Kembali Jawaban dari Server
//             setTimeLeft(null); 
//             setIsTimerStarted(true); 
            
//             if (progressData?.lessonDetails) {
//                 const detail = progressData.lessonDetails.find((d: any) => String(d.lessonId) === String(activeLesson._id));
//                 if (detail?.pollAnswer) setSelectedPollOption(detail.pollAnswer);
//                 if (activeLesson.type === 'game_emoji') setIsEmojiCorrect(true);
//             }
//         }
//     }, [activeLesson?._id, isCurrentLessonDone]); // Sangat presisi, mencegah reset UI saat mengetik

//     // --- EFFECT: COUNTDOWN TIMER TICK REALTIME ---
//     useEffect(() => {
//         if (timeLeft === null || timeLeft <= 0 || !isTimerStarted) return;
        
//         const timerKey = getTimerKey();
//         const timer = setInterval(() => {
//             const savedEndTime = localStorage.getItem(timerKey);
//             if (savedEndTime) {
//                 const remaining = Math.floor((parseInt(savedEndTime) - Date.now()) / 1000);
//                 if (remaining <= 0) {
//                     setTimeLeft(0);
//                     clearInterval(timer);
//                 } else {
//                     setTimeLeft(remaining);
//                 }
//             } else {
//                 setTimeLeft(0);
//             }
//         }, 1000);

//         return () => clearInterval(timer);
//     }, [timeLeft, activeLesson, isTimerStarted]);

//     const formatTime = (seconds: number) => {
//         const m = Math.floor(seconds / 60).toString().padStart(2, '0');
//         const s = (seconds % 60).toString().padStart(2, '0');
//         return `${m}:${s}`;
//     };

//     const handleStartTimedLesson = () => {
//         const duration = Number(activeLesson?.quizDuration) || 0;
//         if (duration > 0) {
//             const timerKey = getTimerKey();
//             const now = Date.now();
//             const durationSec = duration * 60;
//             const endTime = now + (durationSec * 1000);
            
//             localStorage.setItem(timerKey, endTime.toString()); 
//             setTimeLeft(durationSec); 
//             setIsTimerStarted(true);  
//         }
//     };

//     const handleRestartTimer = () => {
//         const duration = Number(activeLesson?.quizDuration) || 0;
//         if (duration > 0) {
//             const now = Date.now();
//             const durationSec = duration * 60;
//             const endTime = now + (durationSec * 1000);
            
//             localStorage.setItem(getTimerKey(), endTime.toString());
//             setTimeLeft(durationSec);
//             setIsTimerStarted(true);
//         }
//     };

//     const handleSoftRefresh = async () => {
//         setIsSoftRefreshing(true);
//         try {
//             const prog = await api(`/api/progress/${courseId}?t=${Date.now()}`);
//             setProgressData(prog);
//         } catch (e) {
//             console.error("Gagal refresh data");
//         } finally {
//             setTimeout(() => setIsSoftRefreshing(false), 500);
//         }
//     };

//     const checkEnrollmentAndLoad = async () => {
//         try {
//             setLoading(true);
//             const statusRes = await api(`/api/courses/${courseId}/enrollment-status?t=${Date.now()}`);
//             if (!statusRes.isEnrolled) {
//                 alert("Anda belum terdaftar di kursus ini.");
//                 router.push(`/courses/${courseId}`);
//             } else {
//                 loadData();
//             }
//         } catch (e) {
//             console.error("Gagal cek enrollment", e);
//             router.push(`/courses/${courseId}`);
//         }
//     };

//     const loadData = async () => {
//         try {
//             setLoading(true);
//             const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
//             const cData = res.course || res;
//             setCourse(cData);
            
//             const [prog, msg] = await Promise.all([
//                 api(`/api/progress/${courseId}?t=${Date.now()}`),
//                 api(`/api/courses/${courseId}/messages?t=${Date.now()}`)
//             ]);
            
//             setProgressData(prog);
//             setMessages(msg || []);
            
//             if (!activeLesson) {
//                 const firstMod = cData.modules?.find((m: any) => m.isActive);
//                 const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
//                 if (firstLes) setActiveLesson(firstLes);
//             }
//         } catch (e) {
//             console.error("Gagal memuat data", e);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // --- FUNGSI SUBMIT BERBAGAI TIPE INTERAKTIF ---
    
//     // 1. Submit Umum (Tandai Selesai)
//     const handleMarkComplete = async (lessonId: string, extraData: any = {}) => {
//         try {
//             const body = { courseId, lessonId, ...extraData };
//             const res = await api(`/api/progress/complete`, { method: 'POST', body });
            
//             setProgressData((prev: any) => ({
//                 ...prev,
//                 completedLessons: res.completedLessons,
//                 percent: res.percent,
//             }));

//             localStorage.removeItem(getTimerKey());
//             setTimeLeft(null); 

//             const prog = await api(`/api/progress/${courseId}?t=${Date.now()}`);
//             setProgressData(prog);

//         } catch (e: any) { 
//             console.error("Gagal update progress:", e);
//         }
//     };

//     // 2. Submit Polling
//     const handlePollSubmit = (option: string) => {
//         if (timeLeft === 0) return; 
//         setSelectedPollOption(option);
//         handleMarkComplete(activeLesson._id, { pollAnswer: option });
//     };

//     // 3. Submit Esai
//     const handleEssaySubmit = async () => {
//         if (essayAnswers.some(a => !a.trim())) return alert("Harap isi semua jawaban.");
//         setIsSubmittingTask(true);
//         try {
//             const body = { courseId, lessonId: activeLesson._id, answers: essayAnswers };
//             const res = await api(`/api/progress/submit-essay`, { method: 'POST', body });
            
//             setProgressData((prev: any) => ({ ...prev, completedLessons: res.completedLessons }));
//             localStorage.removeItem(getTimerKey());
//             setTimeLeft(null); 
            
//             const prog = await api(`/api/progress/${courseId}?t=${Date.now()}`);
//             setProgressData(prog);
//         } catch (e: any) {
//             alert("Gagal kirim: " + e.message);
//         } finally {
//             setIsSubmittingTask(false);
//         }
//     };

//     // 4. Submit Upload Tugas
//     const handleTaskSubmit = async () => {
//         if (!taskFile) return alert("Pilih file terlebih dahulu.");
//         setIsSubmittingTask(true);
//         try {
//             const formData = new FormData();
//             formData.append('file', taskFile);
            
//             const uploadRes = await apiUpload('/api/upload', formData);
//             const fileUrl = uploadRes.url || uploadRes.file?.url || uploadRes.imageUrl || uploadRes.secure_url;

//             const body = { courseId, lessonId: activeLesson._id, fileUrl, fileName: taskFile.name };
//             const res = await api(`/api/progress/submit-task`, { method: 'POST', body });
            
//             setProgressData((prev: any) => ({ ...prev, completedLessons: res.completedLessons }));
//             localStorage.removeItem(getTimerKey());
//             setTimeLeft(null); 
            
//             const prog = await api(`/api/progress/${courseId}?t=${Date.now()}`);
//             setProgressData(prog);
//         } catch (e: any) {
//             alert("Gagal upload: " + e.message);
//         } finally {
//             setIsSubmittingTask(false);
//         }
//     };

//     // 5. Submit Emoji Game
//     const checkEmojiAnswer = () => {
//         if (timeLeft === 0) return; 
//         const correctAnswer = activeLesson.content?.replace(/<[^>]*>?/gm, '').trim(); 
//         if (!correctAnswer) {
//             handleMarkComplete(activeLesson._id);
//             setIsEmojiCorrect(true);
//             return;
//         }

//         if (emojiAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
//             setIsEmojiCorrect(true);
//             handleMarkComplete(activeLesson._id); 
//         } else {
//             setIsEmojiCorrect(false);
//             setTimeout(() => setIsEmojiCorrect(null), 2000); 
//         }
//     };

//     const handleSendChat = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!chatMessage.trim()) return;
//         try {
//             const res = await api(`/api/courses/${courseId}/messages`, { method: 'POST', body: { text: chatMessage } });
//             setMessages([...messages, res]);
//             setChatMessage('');
//         } catch (e) { alert("Gagal kirim pesan"); }
//     };

//     // Variabel penentu apakah materi ini WAJIB DIISI/DIRESPON (Tombol Tandai Selesai terkunci)
//     const isInteractive = ['quiz', 'essay', 'poll', 'upload_doc', 'game_memory', 'game_scavenger', 'game_emoji'].includes(activeLesson?.type);
//     const isTimeUp = timeLeft === 0;

//     const renderContent = () => {
//         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
        
//         switch (activeLesson.type) {
//             case 'video_url': return <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
//             case 'embed': return <div className="aspect-[4/3] md:aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg relative"><iframe src={activeLesson.videoUrl || activeLesson.content} className="w-full h-full" title="Embedded Content" allowFullScreen /></div>;
//             case 'audio': return <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl text-white flex flex-col items-center justify-center min-h-[300px]"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse"><Mic size={48} /></div><h2 className="text-2xl font-bold mb-2 text-center">{activeLesson.title}</h2><p className="text-pink-100 text-sm mb-8">Dengarkan materi audio ini.</p><audio controls src={getImageUrl(activeLesson.fileUrl)} className="w-full max-w-lg rounded-full shadow-lg" onEnded={() => { if(!isTimeUp) handleMarkComplete(activeLesson._id) }} /></div>;
            
//             case 'game_memory': return <GameMemory content={activeLesson.content} lessonId={activeLesson._id} onComplete={() => { if(!isTimeUp) handleMarkComplete(activeLesson._id) }} />;
//             case 'game_scavenger': return <GameScavenger content={activeLesson.content} lessonId={activeLesson._id} onComplete={() => { if(!isTimeUp) handleMarkComplete(activeLesson._id) }} />;
            
//             case 'game_emoji': 
//                 return (
//                     <div className="bg-yellow-50 p-8 rounded-3xl border-2 border-yellow-200 shadow-sm relative overflow-hidden transition-all">
//                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
//                         <div className="text-center mb-8 relative z-10">
//                             <div className="inline-block p-3 bg-white rounded-full shadow-md mb-3 text-yellow-500 border border-yellow-100"><Smile size={32} /></div>
//                             <h2 className="text-2xl font-black text-yellow-800">🤔 Tebak Kode Emoji</h2>
//                             <p className="text-yellow-700 text-sm">Pecahkan teka-teki emoji di bawah ini!</p>
//                         </div>
//                         <div className="space-y-6 max-w-2xl mx-auto relative z-10">
//                             {activeLesson.questions?.map((q: any, idx: number) => (
//                                 <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100 text-center">
//                                     <div className="text-6xl mb-6 animate-bounce select-none" dangerouslySetInnerHTML={{__html: q.question}}></div>
//                                     <input 
//                                         className={`w-full p-4 border-2 rounded-xl text-center font-bold text-lg outline-none transition-all ${
//                                             (isCurrentLessonDone || isEmojiCorrect) ? 'border-green-400 bg-green-50 text-green-600' :
//                                             isEmojiCorrect === false ? 'border-red-400 bg-red-50 text-red-600 shake' : 
//                                             isTimeUp ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed' :
//                                             'border-gray-200 focus:border-yellow-400'
//                                         }`} 
//                                         placeholder={isTimeUp ? "Waktu Habis!" : "Ketik jawabanmu..."}
//                                         value={emojiAnswer}
//                                         onChange={(e) => setEmojiAnswer(e.target.value)}
//                                         onKeyDown={(e) => e.key === 'Enter' && !isTimeUp && checkEmojiAnswer()}
//                                         disabled={isCurrentLessonDone || isEmojiCorrect === true || isTimeUp}
//                                     />
//                                     {isEmojiCorrect === false && <p className="text-red-500 text-sm font-bold mt-2 animate-pulse">Salah, coba lagi!</p>}
//                                     {(isCurrentLessonDone || isEmojiCorrect === true) && (
//                                         <p className="text-green-600 text-sm font-bold mt-2 flex items-center justify-center gap-1">
//                                             <CheckCircle size={16}/> Jawaban Benar!
//                                         </p>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
                        
//                         {!isCurrentLessonDone && !isEmojiCorrect && (
//                             <div className="mt-8 text-center">
//                                 <button 
//                                     onClick={checkEmojiAnswer} 
//                                     className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 ${
//                                         !emojiAnswer || isTimeUp
//                                         ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
//                                         : 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-yellow-200'
//                                     }`} 
//                                     disabled={!emojiAnswer || isTimeUp}
//                                 >
//                                     Kirim Jawaban
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 );

//             case 'flashcard': 
//                 let cards = []; try { cards = JSON.parse(activeLesson.content || '[]'); } catch (e) { cards = []; } 
//                 return <div className="space-y-6"><div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 mb-4"><Layers size={24}/><div><h3 className="font-bold">Mode Hafalan</h3><p className="text-xs">Klik kartu untuk membalik.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card:any, idx:number) => (<div key={idx} onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))} className="relative h-64 w-full cursor-pointer perspective-1000 group"><div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${flippedCards[idx] ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pertanyaan</span><p className="text-lg font-bold text-gray-800">{card.front}</p></div><div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180"><span className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-4">Jawaban</span><p className="text-lg font-bold">{card.back}</p></div></div></div>))}</div></div>;
            
//             case 'slide': return <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/></div>;
//             case 'image': return <div className="rounded-2xl overflow-hidden border shadow-lg bg-gray-900 flex items-center justify-center"><img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto max-h-[500px]"/></div>;
            
//             case 'download_doc': return <div className="bg-green-50 p-8 rounded-3xl border border-green-200 flex flex-col items-center justify-center gap-4 text-center"><div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={32}/></div><h2 className="text-xl font-bold text-green-900">{activeLesson.title}</h2><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download onClick={() => { if(!isTimeUp) handleMarkComplete(activeLesson._id) }} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2">Download Dokumen</a></div>;
            
//             case 'poll': return (
//                 <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm">
//                     <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//                         <BarChart2 className="text-purple-600"/> {activeLesson.pollQuestion}
//                     </h2>
//                     <div className="space-y-3">
//                         {activeLesson.pollOptions?.map((opt:string, i:number) => {
//                             const isSelected = selectedPollOption === opt;
//                             return (
//                                 <button 
//                                     key={i} 
//                                     onClick={() => handlePollSubmit(opt)}
//                                     disabled={isCurrentLessonDone || isTimeUp}
//                                     className={`w-full text-left p-4 rounded-xl font-bold border-2 transition-all flex justify-between items-center ${
//                                         isSelected ? 'bg-purple-100 border-purple-500 text-purple-900' : 
//                                         isTimeUp && !isSelected ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed' :
//                                         'bg-purple-50 border-purple-100 text-purple-900 hover:bg-purple-100'
//                                     }`}
//                                 >
//                                     <span>{opt}</span>
//                                     {isSelected && <CheckCircle size={20} className="text-purple-600"/>}
//                                 </button>
//                             );
//                         })}
//                     </div>
//                     {isCurrentLessonDone && <p className="mt-4 text-center text-sm text-gray-500 italic">Terima kasih atas partisipasi Anda.</p>}
//                 </div>
//             );

//             case 'essay': 
//                 return (
//                     <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm">
//                         <h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2>
//                         <div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6">
//                             <div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} />
//                         </div>
//                         <div className="space-y-6 border-t border-gray-200 pt-6">
//                             {activeLesson.questions?.map((q: any, idx: number) => (
//                                 <div key={idx} className="space-y-2">
//                                     <div className="font-bold text-gray-800" dangerouslySetInnerHTML={{__html: q.question}}></div>
//                                     <textarea 
//                                         className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none min-h-[120px] ${isCurrentLessonDone ? 'bg-gray-100 text-gray-500 border-gray-200' : 'border-gray-300 bg-white'}`}
//                                         placeholder={isTimeUp ? "Waktu Habis!" : "Tulis jawaban Anda di sini..."}
//                                         value={essayAnswers[idx] || ''}
//                                         onChange={(e) => {
//                                             const newAns = [...essayAnswers];
//                                             newAns[idx] = e.target.value;
//                                             setEssayAnswers(newAns);
//                                         }}
//                                         disabled={isCurrentLessonDone || isTimeUp}
//                                     />
//                                 </div>
//                             ))}
//                             {!isCurrentLessonDone ? (
//                                 <button 
//                                     onClick={handleEssaySubmit}
//                                     disabled={essayAnswers.some(a => !a.trim()) || isSubmittingTask || isTimeUp}
//                                     className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all active:scale-95"
//                                 >
//                                     {isSubmittingTask ? 'Mengirim...' : 'Kirim Jawaban Esai'}
//                                 </button>
//                             ) : (
//                                 <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 font-bold flex items-center justify-center gap-2">
//                                     <CheckCircle size={20}/> Esai Telah Dikumpulkan
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 );

//             case 'upload_doc':
//                 return (
//                     <div className="bg-white p-8 rounded-3xl border border-cyan-100 shadow-sm">
//                         <h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2>
//                         <div className="prose prose-cyan max-w-none bg-cyan-50 p-6 rounded-2xl border border-cyan-200 mb-6">
//                             <div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} />
//                         </div>
//                         <div className="border-t border-gray-200 pt-6">
//                             {!isCurrentLessonDone ? (
//                                 <div className="flex flex-col gap-4">
//                                     <input 
//                                         type="file" 
//                                         onChange={(e) => setTaskFile(e.target.files?.[0] || null)}
//                                         className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
//                                         disabled={isSubmittingTask || isTimeUp}
//                                     />
//                                     <button 
//                                         onClick={handleTaskSubmit}
//                                         disabled={!taskFile || isSubmittingTask || isTimeUp}
//                                         className="w-full bg-cyan-600 text-white py-4 rounded-xl font-bold hover:bg-cyan-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
//                                     >
//                                         <UploadCloud size={20}/> {isSubmittingTask ? 'Mengupload...' : 'Upload & Kumpulkan Tugas'}
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 font-bold flex items-center justify-center gap-2">
//                                     <CheckCircle size={20}/> Tugas Telah Dikumpulkan
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 );

//             case 'quiz': 
//                 return (
//                     <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm">
//                         <h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2>
//                         <div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6">
//                             <div dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
//                         </div>
//                         <div className="border-t pt-6">
//                             {!isCurrentLessonDone ? (
//                                 <Link href={`/courses/${courseId}/quiz/${activeLesson._id}`} className={`block w-full text-center py-4 rounded-xl font-bold shadow-md transition-all ${isTimeUp ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
//                                     {isTimeUp ? 'Waktu Habis' : 'Mulai Kuis'}
//                                 </Link>
//                             ) : (
//                                 <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 font-bold flex items-center justify-center gap-2">
//                                     <CheckCircle size={20}/> Kuis Telah Diselesaikan
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 );
            
//             default: return (
//                 <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex flex-col gap-6">
//                     <h2 className="text-2xl font-black text-gray-800">{activeLesson.title}</h2>
//                     <div className="prose prose-red max-w-none bg-white p-6 rounded-2xl border border-red-100">
//                         <div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} />
//                     </div>
//                 </div>
//             );
//         }
//     };

//     if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
    
//     const percent = Math.round(progressData?.percent || 0);

//     return (
//         <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
//             <div className={`fixed left-0 right-0 bottom-0 z-[9999] bg-white flex flex-col font-sans transition-all duration-500 ease-in-out shadow-2xl ${isFullScreen ? 'top-0' : 'top-[80px]'}`}>
//                 <header className="bg-[#B91C1C] text-white p-4 flex items-center justify-between shrink-0 shadow-md relative z-50">
//                     <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] flex justify-center"><button onClick={() => setIsFullScreen(!isFullScreen)} className="w-16 h-6 bg-white border-x border-b border-white/50 rounded-b-xl shadow-lg flex items-center justify-center text-[#B91C1C] hover:bg-gray-100 hover:h-7 transition-all group" title={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"} aria-label={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}>{isFullScreen ? <ChevronDown size={20} className="group-hover:mt-1 transition-all font-bold"/> : <ChevronUp size={20} className="group-hover:-mt-1 transition-all font-bold"/>}</button></div>
//                     <div className="flex items-center gap-4">
//                         <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali ke Kursus"><ArrowLeft size={20}/></Link>
//                         <div>
//                             <div className="flex items-center gap-2">
//                                 <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1>
//                                 <button 
//                                     onClick={handleSoftRefresh} 
//                                     className={`p-1 hover:bg-white/20 rounded-md transition-all ${isSoftRefreshing ? 'animate-spin opacity-50' : ''}`} 
//                                     title="Refresh Data Terkini"
//                                     aria-label="Refresh Data"
//                                 >
//                                     <RefreshCw size={14} />
//                                 </button>
//                             </div>
//                             <div className="flex items-center gap-2 mt-0.5"><div className="w-24 h-1.5 bg-red-800 rounded-full overflow-hidden border border-red-700"><div ref={progressBarRef} className="h-full bg-white rounded-full" role="progressbar" aria-label="Progres Belajar"></div></div><span className="text-[10px] font-bold text-red-100">{percent}% SELESAI</span></div>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-3"><div className="w-8 h-8 rounded bg-white text-[#B91C1C] flex items-center justify-center font-bold text-xs uppercase shadow-lg">{course?.organizer?.charAt(0)}</div><button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu" aria-label="Buka Menu"><Menu size={18}/></button></div>
//                 </header>

//                 <div className="flex flex-1 overflow-hidden relative">
//                     <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
//                         <div className="p-5 border-b bg-gray-50/50 flex justify-between items-center"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3><button onClick={() => setShowMobileMenu(false)} className="lg:hidden text-gray-400 hover:text-red-600" title="Tutup Menu" aria-label="Tutup Menu"><X size={18}/></button></div>
//                         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">{course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (<div key={mod._id}><div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div><div className="space-y-1">{mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (<button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`} aria-label={`Pilih materi ${les.title}`}>{getSidebarIcon(les.type, isDone(les._id))}<div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div></button>))}</div></div>))}</div>
//                         <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
//                     </aside>

//                     <main className="flex-1 relative flex flex-col min-w-0">
//                         {/* JIKA MATERI MEMILIKI TIMER TETAPI USER BELUM KLIK MULAI -> Tampilkan Layar Persiapan */}
//                         {!isTimerStarted ? (
//                             <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gray-50/30">
//                                 <div className="max-w-lg w-full bg-white p-10 rounded-[2rem] border border-yellow-200 shadow-2xl text-center animate-in zoom-in-95 duration-300">
//                                     <div className="w-24 h-24 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
//                                         <Clock size={48} />
//                                     </div>
//                                     <h2 className="text-3xl font-black text-gray-900 mb-4">Materi Berwaktu</h2>
//                                     <p className="text-gray-600 mb-8 text-lg leading-relaxed">
//                                         Materi ini memiliki batas waktu pengerjaan <strong className="text-gray-900 text-xl">{activeLesson?.quizDuration} menit</strong>.<br/>
//                                         <span className="text-sm text-red-500 font-medium">Waktu akan terus berjalan (meskipun browser ditutup) setelah Anda memulai.</span>
//                                     </p>
//                                     <button 
//                                         onClick={handleStartTimedLesson} 
//                                         className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-yellow-200 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-3"
//                                     >
//                                         <PlayCircle size={24}/> Mulai & Kerjakan
//                                     </button>
//                                 </div>
//                             </div>
//                         ) : (
//                             // KONTEN MATERI UTAMA
//                             <>
//                                 <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar pb-32">
//                                     <div className="max-w-4xl mx-auto">
//                                         <div className="mb-8 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">
//                                             {renderContent()}
//                                         </div>
                                        
//                                         {/* Tampilkan Teks Konten Tambahan (Instruksi) jika ada */}
//                                         {activeLesson?.content && 
//                                          !['lesson', 'upload_doc', 'virtual_class', 'google_classroom', 'essay', 'quiz', 'poll', 'flashcard', 'audio', 'embed', 'game_memory', 'game_scavenger', 'game_emoji'].includes(activeLesson.type) && (
//                                             <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mt-6">
//                                                 <div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} />
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
                                
//                                 {/* BOTTOM BAR: TIMER & TOMBOL STATUS */}
//                                 <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 md:p-4 flex justify-between items-center z-20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
//                                     <div className="flex items-center gap-4">
//                                         <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
                                        
//                                         {timeLeft !== null && !isCurrentLessonDone && (
//                                             <div className={`flex items-center gap-2 font-bold px-3 py-1.5 rounded-lg text-xs border ${isTimeUp ? 'bg-red-50 text-red-600 border-red-200' : 'bg-orange-50 text-orange-600 border-orange-200 animate-pulse'}`}>
//                                                 <Clock size={16} />
//                                                 {isTimeUp ? 'Waktu Habis!' : `Sisa Waktu: ${formatTime(timeLeft)}`}
//                                             </div>
//                                         )}
//                                     </div>

//                                     <div className="flex items-center gap-2">
//                                         {/* TOMBOL RESTART TIMER JIKA WAKTU HABIS */}
//                                         {isTimeUp && !isCurrentLessonDone && (
//                                             <button 
//                                                 onClick={handleRestartTimer} 
//                                                 className="px-4 py-2 rounded-xl font-bold text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center gap-2 transition-all shadow-sm"
//                                                 title="Ulangi Waktu"
//                                             >
//                                                 <RotateCw size={14}/> Ulangi Waktu
//                                             </button>
//                                         )}

//                                         {/* TOMBOL TANDAI SELESAI (Dikunci untuk tipe interaktif) */}
//                                         {!isCurrentLessonDone ? (
//                                             <button 
//                                                 onClick={() => handleMarkComplete(activeLesson?._id)} 
//                                                 disabled={isInteractive || isTimeUp} 
//                                                 className={`w-full md:w-auto px-6 py-2 rounded-xl font-black text-xs shadow-xl transition-all uppercase tracking-widest flex items-center justify-center gap-2 ${
//                                                     isInteractive || isTimeUp 
//                                                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//                                                     : 'bg-red-600 hover:bg-red-700 text-white shadow-red-200 active:scale-95'
//                                                 }`}
//                                             >
//                                                 {isInteractive ? (
//                                                     <><Lock size={16}/> Lengkapi Tugas</>
//                                                 ) : (
//                                                     <><CheckCircle size={16}/> Tandai Selesai</>
//                                                 )}
//                                             </button>
//                                         ) : (
//                                             <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-6 py-2 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm">
//                                                 <CheckCircle size={16}/> Materi Lulus
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </>
//                         )}
//                     </main>

//                     <button onClick={() => setShowChat(!showChat)} className="absolute right-6 bottom-28 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi"><MessageSquare size={24}/>{messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}</button>
//                     {showChat && (<div className="absolute right-6 bottom-28 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden"><div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0"><div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div><button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat" aria-label="Tutup Chat"><X size={18}/></button></div><div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">{messages.map((m, i) => (<div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}><span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span><div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div></div>))}<div ref={messagesEndRef} /></div><form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0"><input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} aria-label="Ketik pesan chat"/><button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button></form></div>)}
//                 </div>
//             </div>
//         </Protected>
//     );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api, getImageUrl, apiUpload } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import Protected from '@/components/Protected';
import { 
    ArrowLeft, CheckCircle, PlayCircle, Lock, 
    MessageSquare, FileText, Send, Loader2, 
    HeadphonesIcon, Menu, X, BarChart2, Paperclip, 
    Mic, RotateCw, Layers, Globe, ChevronUp, ChevronDown, 
    Maximize2, Minimize2, Smile, Gamepad2, Camera, Video, Clock,
    RefreshCw, UploadCloud
} from 'lucide-react';
import Link from 'next/link';

import GameMemory from '@/components/course/GameMemory';
import GameScavenger from '@/components/course/GameScavenger';

const getSidebarIcon = (type: string, isCompleted: boolean) => {
    if (isCompleted) return <CheckCircle className="text-green-500 shrink-0" size={18}/>;
    switch (type) {
        case 'video_url': return <Video className="text-red-500 shrink-0" size={18}/>;
        case 'game_memory': return <Gamepad2 className="text-violet-500 shrink-0" size={18}/>;
        case 'game_scavenger': return <Camera className="text-rose-500 shrink-0" size={18}/>;
        case 'game_emoji': return <Smile className="text-yellow-500 shrink-0" size={18}/>;
        case 'audio': return <Mic className="text-pink-500 shrink-0" size={18}/>;
        case 'quiz': return <FileText className="text-orange-500 shrink-0" size={18}/>;
        case 'poll': return <BarChart2 className="text-emerald-500 shrink-0" size={18}/>;
        case 'flashcard': return <Layers className="text-orange-500 shrink-0" size={18}/>;
        case 'embed': return <Globe className="text-teal-500 shrink-0" size={18}/>;
        default: return <PlayCircle className="text-gray-300 shrink-0" size={18}/>;
    }
};

export default function CoursePlayPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const courseId = params?.courseId as string;

    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSoftRefreshing, setIsSoftRefreshing] = useState(false);
    const [activeLesson, setActiveLesson] = useState<any>(null);
    const [progressData, setProgressData] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [chatMessage, setChatMessage] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(true);

    // --- INTERACTIVE STATES ---
    const [emojiAnswer, setEmojiAnswer] = useState('');
    const [isEmojiCorrect, setIsEmojiCorrect] = useState<boolean | null>(null);
    const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
    const [selectedPollOption, setSelectedPollOption] = useState<string | null>(null);
    const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
    const [taskFile, setTaskFile] = useState<File | null>(null);
    const [isSubmittingTask, setIsSubmittingTask] = useState(false);

    // --- TIMER STATES ---
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [isTimerStarted, setIsTimerStarted] = useState<boolean>(true); 

    const progressBarRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const isDone = (id: string) => {
        if (!progressData?.completedLessons) return false;
        return progressData.completedLessons.some((lId: any) => String(lId) === String(id));
    };

    const getTimerKey = () => `timer_${courseId}_${activeLesson?._id}_${(user as any)?._id}`;

    // --- EFFECT: INITIAL LOAD ---
    useEffect(() => {
        if (!courseId || !user) return;
        if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
            loadData();
            return;
        }
        checkEnrollmentAndLoad();
    }, [courseId, user]);

    // --- EFFECT: AUTO SYNC PROGRESS ---
    useEffect(() => {
        if (!courseId) return;
        const interval = setInterval(async () => {
            try {
                const prog = await api(`/api/progress/${courseId}?t=${Date.now()}`);
                setProgressData((prev: any) => {
                    if (JSON.stringify(prev?.completedLessons) !== JSON.stringify(prog?.completedLessons)) {
                        return prog;
                    }
                    return prev;
                });
            } catch (e) {}
        }, 5000); 
        return () => clearInterval(interval);
    }, [courseId]);

    // --- EFFECT: PROGRESS BAR UI ---
    useEffect(() => {
        if (progressBarRef.current) {
            const percent = Math.round(progressData?.percent || 0);
            progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
            progressBarRef.current.style.width = `${percent}%`;
        }
    }, [progressData?.percent]);

    // --- EFFECT: AUTO SCROLL CHAT ---
    useEffect(() => {
        if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, showChat]);

    const isCurrentLessonDone = activeLesson ? isDone(activeLesson._id) : false;

    // --- EFFECT: INIT MATERI BARU & PERSISTENT TIMER ---
    useEffect(() => {
        if (!activeLesson) return;

        if (!isCurrentLessonDone) {
            setSelectedPollOption(null);
            setEmojiAnswer('');
            setIsEmojiCorrect(null);
            setFlippedCards({});
            setEssayAnswers(activeLesson.questions?.map(() => '') || []);
            setTaskFile(null);
            setIsSubmittingTask(false);
            
            const duration = Number(activeLesson.quizDuration) || 0;
            if (duration > 0) {
                const timerKey = getTimerKey();
                const savedEndTime = localStorage.getItem(timerKey);
                const now = Date.now();

                if (savedEndTime) {
                    const remainingSec = Math.floor((parseInt(savedEndTime) - now) / 1000);
                    if (remainingSec > 0) {
                        setTimeLeft(remainingSec);
                        setIsTimerStarted(true); 
                    } else {
                        setTimeLeft(0); 
                        setIsTimerStarted(true); 
                    }
                } else {
                    setTimeLeft(duration * 60); 
                    setIsTimerStarted(false); 
                }
            } else {
                setTimeLeft(null); 
                setIsTimerStarted(true); 
            }
        } else {
            setTimeLeft(null); 
            setIsTimerStarted(true); 
            
            if (progressData?.lessonDetails) {
                const detail = progressData.lessonDetails.find((d: any) => String(d.lessonId) === String(activeLesson._id));
                if (detail?.pollAnswer) setSelectedPollOption(detail.pollAnswer);
                if (activeLesson.type === 'game_emoji') setIsEmojiCorrect(true);
            }
        }
    }, [activeLesson?._id, isCurrentLessonDone]); 

    // --- EFFECT: COUNTDOWN TIMER TICK REALTIME ---
    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0 || !isTimerStarted) return;
        
        const timerKey = getTimerKey();
        const timer = setInterval(() => {
            const savedEndTime = localStorage.getItem(timerKey);
            if (savedEndTime) {
                const remaining = Math.floor((parseInt(savedEndTime) - Date.now()) / 1000);
                if (remaining <= 0) {
                    setTimeLeft(0);
                    clearInterval(timer);
                } else {
                    setTimeLeft(remaining);
                }
            } else {
                setTimeLeft(0);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, activeLesson, isTimerStarted]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleStartTimedLesson = () => {
        const duration = Number(activeLesson?.quizDuration) || 0;
        if (duration > 0) {
            const timerKey = getTimerKey();
            const now = Date.now();
            const durationSec = duration * 60;
            const endTime = now + (durationSec * 1000);
            
            localStorage.setItem(timerKey, endTime.toString()); 
            setTimeLeft(durationSec); 
            setIsTimerStarted(true);  
        }
    };

    const handleRestartTimer = () => {
        const duration = Number(activeLesson?.quizDuration) || 0;
        if (duration > 0) {
            const now = Date.now();
            const durationSec = duration * 60;
            const endTime = now + (durationSec * 1000);
            
            localStorage.setItem(getTimerKey(), endTime.toString());
            setTimeLeft(durationSec);
            setIsTimerStarted(true);
        }
    };

    const handleSoftRefresh = async () => {
        setIsSoftRefreshing(true);
        try {
            const prog = await api(`/api/progress/${courseId}?t=${Date.now()}`);
            setProgressData(prog);
        } catch (e) {
            console.error("Gagal refresh data");
        } finally {
            setTimeout(() => setIsSoftRefreshing(false), 500);
        }
    };

    const checkEnrollmentAndLoad = async () => {
        try {
            setLoading(true);
            const statusRes = await api(`/api/courses/${courseId}/enrollment-status?t=${Date.now()}`);
            if (!statusRes.isEnrolled) {
                alert("Anda belum terdaftar di kursus ini.");
                router.push(`/courses/${courseId}`);
            } else {
                loadData();
            }
        } catch (e) {
            console.error("Gagal cek enrollment", e);
            router.push(`/courses/${courseId}`);
        }
    };

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
            const cData = res.course || res;
            setCourse(cData);
            
            const [prog, msg] = await Promise.all([
                api(`/api/progress/${courseId}?t=${Date.now()}`),
                api(`/api/courses/${courseId}/messages?t=${Date.now()}`)
            ]);
            
            setProgressData(prog);
            setMessages(msg || []);
            
            if (!activeLesson) {
                const firstMod = cData.modules?.find((m: any) => m.isActive);
                const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
                if (firstLes) setActiveLesson(firstLes);
            }
        } catch (e) {
            console.error("Gagal memuat data", e);
        } finally {
            setLoading(false);
        }
    };

    // --- FUNGSI SUBMIT BERBAGAI TIPE INTERAKTIF ---
    const handleMarkComplete = async (lessonId: string, extraData: any = {}) => {
        try {
            const body = { courseId, lessonId, ...extraData };
            const res = await api(`/api/progress/complete`, { method: 'POST', body });
            
            setProgressData((prev: any) => ({
                ...prev,
                completedLessons: res.completedLessons,
                percent: res.percent,
            }));

            localStorage.removeItem(getTimerKey());
            setTimeLeft(null); 

            const prog = await api(`/api/progress/${courseId}?t=${Date.now()}`);
            setProgressData(prog);

        } catch (e: any) { 
            console.error("Gagal update progress:", e);
        }
    };

    const handlePollSubmit = (option: string) => {
        if (timeLeft === 0) return; 
        setSelectedPollOption(option);
        handleMarkComplete(activeLesson._id, { pollAnswer: option });
    };

    const handleEssaySubmit = async () => {
        if (essayAnswers.some(a => !a.trim())) return alert("Harap isi semua jawaban.");
        setIsSubmittingTask(true);
        try {
            const body = { courseId, lessonId: activeLesson._id, answers: essayAnswers };
            const res = await api(`/api/progress/submit-essay`, { method: 'POST', body });
            
            setProgressData((prev: any) => ({ ...prev, completedLessons: res.completedLessons }));
            localStorage.removeItem(getTimerKey());
            setTimeLeft(null); 
            
            const prog = await api(`/api/progress/${courseId}?t=${Date.now()}`);
            setProgressData(prog);
        } catch (e: any) {
            alert("Gagal kirim: " + e.message);
        } finally {
            setIsSubmittingTask(false);
        }
    };

    const handleTaskSubmit = async () => {
        if (!taskFile) return alert("Pilih file terlebih dahulu.");
        setIsSubmittingTask(true);
        try {
            const formData = new FormData();
            formData.append('file', taskFile);
            
            const uploadRes = await apiUpload('/api/upload', formData);
            const fileUrl = uploadRes.url || uploadRes.file?.url || uploadRes.imageUrl || uploadRes.secure_url;

            const body = { courseId, lessonId: activeLesson._id, fileUrl, fileName: taskFile.name };
            const res = await api(`/api/progress/submit-task`, { method: 'POST', body });
            
            setProgressData((prev: any) => ({ ...prev, completedLessons: res.completedLessons }));
            localStorage.removeItem(getTimerKey());
            setTimeLeft(null); 
            
            const prog = await api(`/api/progress/${courseId}?t=${Date.now()}`);
            setProgressData(prog);
        } catch (e: any) {
            alert("Gagal upload: " + e.message);
        } finally {
            setIsSubmittingTask(false);
        }
    };

    const checkEmojiAnswer = () => {
        if (timeLeft === 0) return; 
        const correctAnswer = activeLesson.content?.replace(/<[^>]*>?/gm, '').trim(); 
        if (!correctAnswer) {
            handleMarkComplete(activeLesson._id);
            setIsEmojiCorrect(true);
            return;
        }

        if (emojiAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
            setIsEmojiCorrect(true);
            handleMarkComplete(activeLesson._id); 
        } else {
            setIsEmojiCorrect(false);
            setTimeout(() => setIsEmojiCorrect(null), 2000); 
        }
    };

    const handleSendChat = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatMessage.trim()) return;
        try {
            const res = await api(`/api/courses/${courseId}/messages`, { method: 'POST', body: { text: chatMessage } });
            setMessages([...messages, res]);
            setChatMessage('');
        } catch (e) { alert("Gagal kirim pesan"); }
    };

    const isInteractive = ['quiz', 'essay', 'poll', 'upload_doc', 'game_memory', 'game_scavenger', 'game_emoji'].includes(activeLesson?.type);
    const isTimeUp = timeLeft === 0;

    const renderContent = () => {
        if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
        
        switch (activeLesson.type) {
            case 'video_url': return <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
            
            // [UPDATE] TINGGI BINGKAI DI-ADJUST JADI 60vh dan min-450px
            case 'embed': 
                return (
                    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex justify-between items-center bg-teal-50 px-4 py-3 rounded-xl border border-teal-100 shadow-sm">
                            <div className="flex items-center gap-3 text-teal-800">
                                <div className="p-1.5 bg-teal-100 rounded-lg"><Globe size={20} className="text-teal-600" /></div>
                                <div>
                                    <h2 className="font-bold text-base leading-tight">{activeLesson.title}</h2>
                                    <p className="text-[10px] text-teal-600 font-medium">Interactive Embed Content</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => {
                                    const iframe = document.getElementById('content-iframe') as HTMLIFrameElement;
                                    if (iframe) {
                                        if (iframe.requestFullscreen) {
                                            iframe.requestFullscreen();
                                        } else if ((iframe as any).webkitRequestFullscreen) { /* Safari */
                                            (iframe as any).webkitRequestFullscreen();
                                        } else if ((iframe as any).msRequestFullscreen) { /* IE11 */
                                            (iframe as any).msRequestFullscreen();
                                        }
                                    }
                                }}
                                className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-black transition-all active:scale-95 flex items-center gap-1.5 shadow-sm uppercase tracking-wider"
                                title="Buka Layar Penuh"
                                aria-label="Buka Layar Penuh"
                            >
                                <Maximize2 size={14} /> Layar Penuh
                            </button>
                        </div>
                        {/* Height disesuaikan jadi h-[60vh] min-h-[450px] agar pas tapi tidak terlalu pendek */}
                        <div className="w-full h-[60vh] min-h-[450px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-md relative group">
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
                                <Loader2 className="animate-spin text-teal-500 mb-2" size={32} />
                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Memuat Konten...</span>
                            </div>
                            <iframe 
                                id="content-iframe"
                                src={activeLesson.videoUrl || activeLesson.content} 
                                className="w-full h-full relative z-10 bg-white" 
                                title="Embedded Content" 
                                allowFullScreen 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                        </div>
                    </div>
                );

            case 'audio': return <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl text-white flex flex-col items-center justify-center min-h-[300px]"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse"><Mic size={48} /></div><h2 className="text-2xl font-bold mb-2 text-center">{activeLesson.title}</h2><p className="text-pink-100 text-sm mb-8">Dengarkan materi audio ini.</p><audio controls src={getImageUrl(activeLesson.fileUrl)} className="w-full max-w-lg rounded-full shadow-lg" onEnded={() => { if(!isTimeUp) handleMarkComplete(activeLesson._id) }} aria-label="Pemutar Audio" title="Audio Player"/></div>;
            
            case 'game_memory': return <GameMemory content={activeLesson.content} lessonId={activeLesson._id} onComplete={() => { if(!isTimeUp) handleMarkComplete(activeLesson._id) }} />;
            case 'game_scavenger': return <GameScavenger content={activeLesson.content} lessonId={activeLesson._id} onComplete={() => { if(!isTimeUp) handleMarkComplete(activeLesson._id) }} />;
            
            case 'game_emoji': 
                return (
                    <div className="bg-yellow-50 p-8 rounded-3xl border-2 border-yellow-200 shadow-sm relative overflow-hidden transition-all">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
                        <div className="text-center mb-8 relative z-10">
                            <div className="inline-block p-3 bg-white rounded-full shadow-md mb-3 text-yellow-500 border border-yellow-100"><Smile size={32} /></div>
                            <h2 className="text-2xl font-black text-yellow-800">🤔 Tebak Kode Emoji</h2>
                            <p className="text-yellow-700 text-sm">Pecahkan teka-teki emoji di bawah ini!</p>
                        </div>
                        <div className="space-y-6 max-w-2xl mx-auto relative z-10">
                            {activeLesson.questions?.map((q: any, idx: number) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100 text-center">
                                    <div className="text-6xl mb-6 animate-bounce select-none" dangerouslySetInnerHTML={{__html: q.question}}></div>
                                    <input 
                                        className={`w-full p-4 border-2 rounded-xl text-center font-bold text-lg outline-none transition-all ${
                                            (isCurrentLessonDone || isEmojiCorrect) ? 'border-green-400 bg-green-50 text-green-600' :
                                            isEmojiCorrect === false ? 'border-red-400 bg-red-50 text-red-600 shake' : 
                                            isTimeUp ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed' :
                                            'border-gray-200 focus:border-yellow-400'
                                        }`} 
                                        placeholder={isTimeUp ? "Waktu Habis!" : "Ketik jawabanmu..."}
                                        value={emojiAnswer}
                                        onChange={(e) => setEmojiAnswer(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && !isTimeUp && checkEmojiAnswer()}
                                        disabled={isCurrentLessonDone || isEmojiCorrect === true || isTimeUp}
                                        aria-label="Jawaban Tebak Emoji"
                                        title="Jawaban Tebak Emoji"
                                    />
                                    {isEmojiCorrect === false && <p className="text-red-500 text-sm font-bold mt-2 animate-pulse">Salah, coba lagi!</p>}
                                    {(isCurrentLessonDone || isEmojiCorrect === true) && (
                                        <p className="text-green-600 text-sm font-bold mt-2 flex items-center justify-center gap-1">
                                            <CheckCircle size={16}/> Jawaban Benar!
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        {!isCurrentLessonDone && !isEmojiCorrect && (
                            <div className="mt-8 text-center">
                                <button 
                                    onClick={checkEmojiAnswer} 
                                    className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 ${
                                        !emojiAnswer || isTimeUp
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                                        : 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-yellow-200'
                                    }`} 
                                    disabled={!emojiAnswer || isTimeUp}
                                    title="Kirim Jawaban"
                                >
                                    Kirim Jawaban
                                </button>
                            </div>
                        )}
                    </div>
                );

            case 'flashcard': 
                let cards = []; try { cards = JSON.parse(activeLesson.content || '[]'); } catch (e) { cards = []; } 
                return <div className="space-y-6"><div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 mb-4"><Layers size={24}/><div><h3 className="font-bold">Mode Hafalan</h3><p className="text-xs">Klik kartu untuk membalik.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card:any, idx:number) => (<div key={idx} onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))} className="relative h-64 w-full cursor-pointer perspective-1000 group"><div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${flippedCards[idx] ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pertanyaan</span><p className="text-lg font-bold text-gray-800">{card.front}</p></div><div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180"><span className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-4">Jawaban</span><p className="text-lg font-bold">{card.back}</p></div></div></div>))}</div></div>;
            
            case 'slide': return <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/></div>;
            case 'image': return <div className="rounded-2xl overflow-hidden border shadow-lg bg-gray-900 flex items-center justify-center"><img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto max-h-[500px]"/></div>;
            
            case 'download_doc': return <div className="bg-green-50 p-8 rounded-3xl border border-green-200 flex flex-col items-center justify-center gap-4 text-center"><div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={32}/></div><h2 className="text-xl font-bold text-green-900">{activeLesson.title}</h2><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download onClick={() => { if(!isTimeUp) handleMarkComplete(activeLesson._id) }} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2">Download Dokumen</a></div>;
            
            case 'poll': return (
                <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <BarChart2 className="text-purple-600"/> {activeLesson.pollQuestion}
                    </h2>
                    <div className="space-y-3">
                        {activeLesson.pollOptions?.map((opt:string, i:number) => {
                            const isSelected = selectedPollOption === opt;
                            return (
                                <button 
                                    key={i} 
                                    onClick={() => handlePollSubmit(opt)}
                                    disabled={isCurrentLessonDone || isTimeUp}
                                    className={`w-full text-left p-4 rounded-xl font-bold border-2 transition-all flex justify-between items-center ${
                                        isSelected ? 'bg-purple-100 border-purple-500 text-purple-900' : 
                                        isTimeUp && !isSelected ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed' :
                                        'bg-purple-50 border-purple-100 text-purple-900 hover:bg-purple-100'
                                    }`}
                                    title={`Pilih opsi ${opt}`}
                                >
                                    <span>{opt}</span>
                                    {isSelected && <CheckCircle size={20} className="text-purple-600"/>}
                                </button>
                            );
                        })}
                    </div>
                    {isCurrentLessonDone && <p className="mt-4 text-center text-sm text-gray-500 italic">Terima kasih atas partisipasi Anda.</p>}
                </div>
            );

            case 'essay': 
                return (
                    <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2>
                        <div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6">
                            <div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} />
                        </div>
                        <div className="space-y-6 border-t border-gray-200 pt-6">
                            {activeLesson.questions?.map((q: any, idx: number) => (
                                <div key={idx} className="space-y-2">
                                    <div className="font-bold text-gray-800" dangerouslySetInnerHTML={{__html: q.question}}></div>
                                    <textarea 
                                        className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none min-h-[120px] ${isCurrentLessonDone ? 'bg-gray-100 text-gray-500 border-gray-200' : 'border-gray-300 bg-white'}`}
                                        placeholder={isTimeUp ? "Waktu Habis!" : "Tulis jawaban Anda di sini..."}
                                        value={essayAnswers[idx] || ''}
                                        onChange={(e) => {
                                            const newAns = [...essayAnswers];
                                            newAns[idx] = e.target.value;
                                            setEssayAnswers(newAns);
                                        }}
                                        disabled={isCurrentLessonDone || isTimeUp}
                                        aria-label={`Jawaban Esai ${idx + 1}`}
                                        title={`Jawaban Esai ${idx + 1}`}
                                    />
                                </div>
                            ))}
                            {!isCurrentLessonDone ? (
                                <button 
                                    onClick={handleEssaySubmit}
                                    disabled={essayAnswers.some(a => !a.trim()) || isSubmittingTask || isTimeUp}
                                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all active:scale-95"
                                    title="Kirim Jawaban Esai"
                                >
                                    {isSubmittingTask ? 'Mengirim...' : 'Kirim Jawaban Esai'}
                                </button>
                            ) : (
                                <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 font-bold flex items-center justify-center gap-2">
                                    <CheckCircle size={20}/> Esai Telah Dikumpulkan
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'upload_doc':
                return (
                    <div className="bg-white p-8 rounded-3xl border border-cyan-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2>
                        <div className="prose prose-cyan max-w-none bg-cyan-50 p-6 rounded-2xl border border-cyan-200 mb-6">
                            <div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} />
                        </div>
                        <div className="border-t border-gray-200 pt-6">
                            {!isCurrentLessonDone ? (
                                <div className="flex flex-col gap-4">
                                    <input 
                                        type="file" 
                                        onChange={(e) => setTaskFile(e.target.files?.[0] || null)}
                                        className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
                                        disabled={isSubmittingTask || isTimeUp}
                                        aria-label="Upload File Tugas"
                                        title="Upload File Tugas"
                                    />
                                    <button 
                                        onClick={handleTaskSubmit}
                                        disabled={!taskFile || isSubmittingTask || isTimeUp}
                                        className="w-full bg-cyan-600 text-white py-4 rounded-xl font-bold hover:bg-cyan-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                                        title="Upload & Kumpulkan Tugas"
                                    >
                                        <UploadCloud size={20}/> {isSubmittingTask ? 'Mengupload...' : 'Upload & Kumpulkan Tugas'}
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 font-bold flex items-center justify-center gap-2">
                                    <CheckCircle size={20}/> Tugas Telah Dikumpulkan
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'quiz': 
                return (
                    <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2>
                        <div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6">
                            <div dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
                        </div>
                        <div className="border-t pt-6">
                            {!isCurrentLessonDone ? (
                                <Link href={`/courses/${courseId}/quiz/${activeLesson._id}`} className={`block w-full text-center py-4 rounded-xl font-bold shadow-md transition-all ${isTimeUp ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                                    {isTimeUp ? 'Waktu Habis' : 'Mulai Kuis'}
                                </Link>
                            ) : (
                                <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 font-bold flex items-center justify-center gap-2">
                                    <CheckCircle size={20}/> Kuis Telah Diselesaikan
                                </div>
                            )}
                        </div>
                    </div>
                );
            
            default: return (
                <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex flex-col gap-6">
                    <h2 className="text-2xl font-black text-gray-800">{activeLesson.title}</h2>
                    <div className="prose prose-red max-w-none bg-white p-6 rounded-2xl border border-red-100">
                        <div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} />
                    </div>
                </div>
            );
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
    
    const percent = Math.round(progressData?.percent || 0);

    return (
        <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
            <div className={`fixed left-0 right-0 bottom-0 z-[9999] bg-white flex flex-col font-sans transition-all duration-500 ease-in-out shadow-2xl ${isFullScreen ? 'top-0' : 'top-[80px]'}`}>
                <header className="bg-[#B91C1C] text-white p-4 flex items-center justify-between shrink-0 shadow-md relative z-50">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] flex justify-center"><button onClick={() => setIsFullScreen(!isFullScreen)} className="w-16 h-6 bg-white border-x border-b border-white/50 rounded-b-xl shadow-lg flex items-center justify-center text-[#B91C1C] hover:bg-gray-100 hover:h-7 transition-all group" title={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"} aria-label={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}>{isFullScreen ? <ChevronDown size={20} className="group-hover:mt-1 transition-all font-bold"/> : <ChevronUp size={20} className="group-hover:-mt-1 transition-all font-bold"/>}</button></div>
                    <div className="flex items-center gap-4">
                        <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali ke Kursus"><ArrowLeft size={20}/></Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1>
                                <button 
                                    onClick={handleSoftRefresh} 
                                    className={`p-1 hover:bg-white/20 rounded-md transition-all ${isSoftRefreshing ? 'animate-spin opacity-50' : ''}`} 
                                    title="Refresh Data Terkini"
                                    aria-label="Refresh Data"
                                >
                                    <RefreshCw size={14} />
                                </button>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5"><div className="w-24 h-1.5 bg-red-800 rounded-full overflow-hidden border border-red-700"><div ref={progressBarRef} className="h-full bg-white rounded-full" role="progressbar" aria-label="Progres Belajar"></div></div><span className="text-[10px] font-bold text-red-100">{percent}% SELESAI</span></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3"><div className="w-8 h-8 rounded bg-white text-[#B91C1C] flex items-center justify-center font-bold text-xs uppercase shadow-lg">{course?.organizer?.charAt(0)}</div><button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu" aria-label="Buka Menu"><Menu size={18}/></button></div>
                </header>

                <div className="flex flex-1 overflow-hidden relative">
                    <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                        <div className="p-5 border-b bg-gray-50/50 flex justify-between items-center"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3><button onClick={() => setShowMobileMenu(false)} className="lg:hidden text-gray-400 hover:text-red-600" title="Tutup Menu" aria-label="Tutup Menu"><X size={18}/></button></div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">{course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (<div key={mod._id}><div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div><div className="space-y-1">{mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (<button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`} aria-label={`Pilih materi ${les.title}`}>{getSidebarIcon(les.type, isDone(les._id))}<div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div></button>))}</div></div>))}</div>
                        <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
                    </aside>

                    <main className="flex-1 relative flex flex-col min-w-0">
                        {!isTimerStarted ? (
                            <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gray-50/30">
                                <div className="max-w-lg w-full bg-white p-10 rounded-[2rem] border border-yellow-200 shadow-2xl text-center animate-in zoom-in-95 duration-300">
                                    <div className="w-24 h-24 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                        <Clock size={48} />
                                    </div>
                                    <h2 className="text-3xl font-black text-gray-900 mb-4">Materi Berwaktu</h2>
                                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                        Materi ini memiliki batas waktu pengerjaan <strong className="text-gray-900 text-xl">{activeLesson?.quizDuration} menit</strong>.<br/>
                                        <span className="text-sm text-red-500 font-medium">Waktu akan terus berjalan (meskipun browser ditutup) setelah Anda memulai.</span>
                                    </p>
                                    <button 
                                        onClick={handleStartTimedLesson} 
                                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-yellow-200 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-3"
                                        title="Mulai & Kerjakan"
                                    >
                                        <PlayCircle size={24}/> Mulai & Kerjakan
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar pb-32">
                                    <div className="max-w-4xl mx-auto">
                                        <div className="mb-8 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">
                                            {renderContent()}
                                        </div>
                                        
                                        {activeLesson?.content && 
                                         !['lesson', 'embed', 'upload_doc', 'virtual_class', 'google_classroom', 'essay', 'quiz', 'poll', 'flashcard', 'audio', 'game_memory', 'game_scavenger', 'game_emoji'].includes(activeLesson.type) && (
                                            <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mt-6">
                                                <div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 md:p-4 flex justify-between items-center z-20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
                                    <div className="flex items-center gap-4">
                                        <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
                                        
                                        {timeLeft !== null && !isCurrentLessonDone && (
                                            <div className={`flex items-center gap-2 font-bold px-3 py-1.5 rounded-lg text-xs border ${isTimeUp ? 'bg-red-50 text-red-600 border-red-200' : 'bg-orange-50 text-orange-600 border-orange-200 animate-pulse'}`}>
                                                <Clock size={16} />
                                                {isTimeUp ? 'Waktu Habis!' : `Sisa Waktu: ${formatTime(timeLeft)}`}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {isTimeUp && !isCurrentLessonDone && (
                                            <button 
                                                onClick={handleRestartTimer} 
                                                className="px-4 py-2 rounded-xl font-bold text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center gap-2 transition-all shadow-sm"
                                                title="Ulangi Waktu"
                                                aria-label="Ulangi Waktu"
                                            >
                                                <RotateCw size={14}/> Ulangi Waktu
                                            </button>
                                        )}

                                        {!isCurrentLessonDone ? (
                                            <button 
                                                onClick={() => handleMarkComplete(activeLesson?._id)} 
                                                disabled={isInteractive || isTimeUp} 
                                                className={`w-full md:w-auto px-6 py-2 rounded-xl font-black text-xs shadow-xl transition-all uppercase tracking-widest flex items-center justify-center gap-2 ${
                                                    isInteractive || isTimeUp 
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                                    : 'bg-red-600 hover:bg-red-700 text-white shadow-red-200 active:scale-95'
                                                }`}
                                                title={isInteractive ? 'Lengkapi Tugas Terlebih Dahulu' : 'Tandai Selesai'}
                                            >
                                                {isInteractive ? (
                                                    <><Lock size={16}/> Lengkapi Tugas</>
                                                ) : (
                                                    <><CheckCircle size={16}/> Tandai Selesai</>
                                                )}
                                            </button>
                                        ) : (
                                            <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-6 py-2 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm">
                                                <CheckCircle size={16}/> Materi Lulus
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </main>

                    <button onClick={() => setShowChat(!showChat)} className="absolute right-6 bottom-28 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi"><MessageSquare size={24}/>{messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}</button>
                    {showChat && (<div className="absolute right-6 bottom-28 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden"><div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0"><div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div><button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat" aria-label="Tutup Chat"><X size={18}/></button></div><div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">{messages.map((m, i) => (<div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}><span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span><div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div></div>))}<div ref={messagesEndRef} /></div><form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0"><input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} aria-label="Ketik pesan chat" title="Ketik pesan chat"/><button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button></form></div>)}
                </div>
            </div>
        </Protected>
    );
}
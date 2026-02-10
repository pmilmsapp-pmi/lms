// // // // // 'use client';

// // // // // import { useState, useEffect, useRef } from 'react';
// // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // import { useAuth } from '@/lib/AuthProvider'; // Import Auth
// // // // // import Protected from '@/components/Protected';
// // // // // import { 
// // // // //     ArrowLeft, CheckCircle, PlayCircle, Lock, 
// // // // //     MessageSquare, FileText, Send, Loader2, 
// // // // //     HelpCircle, HeadphonesIcon, Monitor, ExternalLink, 
// // // // //     Menu, X, BarChart2, Paperclip 
// // // // // } from 'lucide-react';
// // // // // import Link from 'next/link';

// // // // // export default function CoursePlayPage() {
// // // // //     const params = useParams();
// // // // //     const router = useRouter();
// // // // //     const { user } = useAuth(); // [FIX TS: Tambahkan ini agar variabel user dikenali]
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

// // // // //     // --- REFS ---
// // // // //     const progressBarRef = useRef<HTMLDivElement>(null);
// // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // //     useEffect(() => {
// // // // //         if (courseId) loadData();
// // // // //     }, [courseId, user]);

// // // // //     // FIX ARIA ERROR: Update DOM Manual
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

// // // // //     const loadData = async () => {
// // // // //         try {
// // // // //             setLoading(true);
// // // // //             const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
// // // // //             const cData = res.course || res;
// // // // //             setCourse(cData);

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
// // // // //             const updated = await api(`/api/progress/${courseId}`);
// // // // //             setProgressData(updated);
// // // // //         } catch (e) { alert("Gagal update progres"); }
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

// // // // //     // --- RENDERER KONTEN ---
// // // // //     const renderContent = () => {
// // // // //         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;

// // // // //         switch (activeLesson.type) {
// // // // //             case 'video_url':
// // // // //                 return (
// // // // //                     <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
// // // // //                         <iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/>
// // // // //                     </div>
// // // // //                 );
// // // // //             case 'slide':
// // // // //                 return (
// // // // //                     <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg">
// // // // //                         <iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/>
// // // // //                     </div>
// // // // //                 );
// // // // //             case 'pdf':
// // // // //                 return (
// // // // //                     <div className="aspect-[3/4] md:aspect-video bg-gray-50 rounded-2xl overflow-hidden border shadow-lg">
// // // // //                         <iframe src={`${getImageUrl(activeLesson.fileUrl)}#toolbar=0`} className="w-full h-full" title="Dokumen"/>
// // // // //                     </div>
// // // // //                 );
// // // // //             case 'image':
// // // // //                 return (
// // // // //                     <div className="rounded-2xl overflow-hidden border shadow-lg">
// // // // //                         <img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="w-full h-auto"/>
// // // // //                     </div>
// // // // //                 );
// // // // //             case 'poll':
// // // // //                 return (
// // // // //                     <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm">
// // // // //                         <div className="flex items-center gap-4 mb-6">
// // // // //                             <div className="p-3 bg-purple-100 text-purple-600 rounded-full"><BarChart2 size={32}/></div>
// // // // //                             <h2 className="text-xl font-bold text-gray-900">{activeLesson.pollQuestion || activeLesson.title}</h2>
// // // // //                         </div>
// // // // //                         <div className="space-y-3">
// // // // //                             {activeLesson.pollOptions?.map((opt: string, i: number) => (
// // // // //                                 <button key={i} className="w-full text-left p-4 bg-purple-50 border-2 border-purple-100 rounded-xl hover:border-purple-300 transition-all font-bold text-purple-900">
// // // // //                                     {opt}
// // // // //                                 </button>
// // // // //                             ))}
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 );
// // // // //             case 'essay': 
// // // // //             case 'quiz':
// // // // //                 return (
// // // // //                     <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm">
// // // // //                         <div className="flex items-center gap-4 mb-6">
// // // // //                             <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full"><FileText size={32}/></div>
// // // // //                             <h2 className="text-xl font-bold text-gray-900">{activeLesson.title}</h2>
// // // // //                         </div>
// // // // //                         <div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6">
// // // // //                             <div dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
// // // // //                         </div>
// // // // //                         <div className="border-t pt-6">
// // // // //                             <button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-indigo-300 rounded-xl p-8 text-indigo-500 hover:bg-indigo-50 transition-colors">
// // // // //                                 <Paperclip className="mb-1"/> <span className="font-bold">Upload Jawaban Tugas</span>
// // // // //                             </button>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 );
// // // // //             default:
// // // // //                 return (
// // // // //                     <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex items-center gap-6 mb-6">
// // // // //                         <div className="bg-red-600 text-white p-4 rounded-2xl shadow-lg"><FileText size={32}/></div>
// // // // //                         <div><h2 className="text-2xl font-black text-gray-800">{activeLesson.title}</h2><p className="text-red-600 font-bold text-xs uppercase tracking-widest mt-1">{activeLesson.jp} JP</p></div>
// // // // //                     </div>
// // // // //                 );
// // // // //         }
// // // // //     };

// // // // //     if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;

// // // // //     const percent = Math.round(progressData?.percent || 0);

// // // // //     return (
// // // // //         <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
// // // // //             <div className="flex flex-col h-screen bg-white font-sans overflow-hidden">
// // // // //                 {/* --- HEADER --- */}
// // // // //                 <header className="bg-gray-900 text-white p-4 flex items-center justify-between shrink-0 shadow-md z-40">
// // // // //                     <div className="flex items-center gap-4">
// // // // //                         {/* [FIX AXE] Tambahkan title */}
// // // // //                         <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali"><ArrowLeft size={20}/></Link>
// // // // //                         <div>
// // // // //                             <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1>
// // // // //                             <div className="flex items-center gap-2 mt-0.5">
// // // // //                                 <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
// // // // //                                     {/* [FIX AXE] Tambahkan aria-label */}
// // // // //                                     <div ref={progressBarRef} className="h-full bg-green-500 rounded-full" role="progressbar" aria-label="Progres Belajar"></div>
// // // // //                                 </div>
// // // // //                                 <span className="text-[10px] font-bold text-green-400">{percent}% SELESAI</span>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                     <div className="flex items-center gap-2">
// // // // //                          <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center font-bold text-xs uppercase shadow-lg border border-white/20">{course?.organizer?.charAt(0)}</div>
// // // // //                          {/* [FIX AXE] Tambahkan title */}
// // // // //                          <button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu"><Menu size={18}/></button>
// // // // //                     </div>
// // // // //                 </header>

// // // // //                 <div className="flex flex-1 overflow-hidden relative">
// // // // //                     {/* --- SIDEBAR KIRI --- */}
// // // // //                     <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none`}>
// // // // //                         <div className="p-5 border-b bg-gray-50/50"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3></div>
// // // // //                         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
// // // // //                             {course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
// // // // //                                 <div key={mod._id}>
// // // // //                                     <div className="flex items-center gap-2 mb-3 px-2">
// // // // //                                         <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
// // // // //                                         <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4>
// // // // //                                     </div>
// // // // //                                     <div className="space-y-1">
// // // // //                                         {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
// // // // //                                             <button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`}>
// // // // //                                                 {isDone(les._id) ? <CheckCircle className="text-green-500 shrink-0" size={18}/> : <PlayCircle className="text-gray-300 shrink-0" size={18}/>}
// // // // //                                                 <div className="overflow-hidden">
// // // // //                                                     <p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p>
// // // // //                                                     <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')} • {les.jp || 0} JP</p>
// // // // //                                                 </div>
// // // // //                                             </button>
// // // // //                                         ))}
// // // // //                                     </div>
// // // // //                                 </div>
// // // // //                             ))}
// // // // //                         </div>
// // // // //                         <div className="p-4 border-t bg-gray-50">
// // // // //                             <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200">
// // // // //                                 <HeadphonesIcon size={16}/> Konsultasi Pengajar
// // // // //                             </button>
// // // // //                         </div>
// // // // //                     </aside>

// // // // //                     {/* --- KONTEN TENGAH --- */}
// // // // //                     <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar relative">
// // // // //                         <div className="max-w-4xl mx-auto pb-32">
// // // // //                             <div className="mb-8 transition-all duration-500 ease-in-out">{renderContent()}</div>
// // // // //                             {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && (
// // // // //                                 <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
// // // // //                                     <div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} />
// // // // //                                 </div>
// // // // //                             )}
// // // // //                         </div>
// // // // //                         <div className="fixed bottom-0 left-0 lg:left-80 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 md:p-6 flex justify-between items-center z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
// // // // //                             <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
// // // // //                             {!isDone(activeLesson?._id) ? (
// // // // //                                 <button onClick={() => handleMarkComplete(activeLesson?._id)} className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-black text-xs shadow-xl shadow-red-200 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"><CheckCircle size={18}/> Tandai Selesai</button>
// // // // //                             ) : (
// // // // //                                 <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-8 py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"><CheckCircle size={18}/> Materi Lulus</div>
// // // // //                             )}
// // // // //                         </div>
// // // // //                     </main>

// // // // //                     {/* --- CHAT FLYING & POPUP --- */}
// // // // //                     {/* [FIX AXE] Tambahkan title */}
// // // // //                     <button onClick={() => setShowChat(!showChat)} className="absolute bottom-24 right-6 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi">
// // // // //                         <MessageSquare size={24}/>
// // // // //                         {messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}
// // // // //                     </button>

// // // // //                     {showChat && (
// // // // //                         <div className="absolute bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
// // // // //                             <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0">
// // // // //                                 <div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div>
// // // // //                                 {/* [FIX AXE] Tambahkan title */}
// // // // //                                 <button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat"><X size={18}/></button>
// // // // //                             </div>
// // // // //                             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">
// // // // //                                 {messages.map((m, i) => (
// // // // //                                     // [FIX TS] Pastikan user ada sebelum akses _id
// // // // //                                     <div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}>
// // // // //                                         <span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span>
// // // // //                                         <div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>
// // // // //                                             {m.message}
// // // // //                                         </div>
// // // // //                                     </div>
// // // // //                                 ))}
// // // // //                                 <div ref={messagesEndRef} />
// // // // //                             </div>
// // // // //                             <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0">
// // // // //                                 <input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} />
// // // // //                                 {/* [FIX AXE] Tambahkan title */}
// // // // //                                 <button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim"><Send size={16}/></button>
// // // // //                             </form>
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
// // // //     Mic, RotateCw, Layers, Globe, ChevronUp, ChevronDown, Maximize2, Minimize2 
// // // // } from 'lucide-react';
// // // // import Link from 'next/link';

// // // // export default function CoursePlayPage() {
// // // //     const params = useParams();
// // // //     const router = useRouter();
// // // //     const { user } = useAuth();
// // // //     const courseId = params?.courseId as string;

// // // //     // --- STATE ---
// // // //     const [course, setCourse] = useState<any>(null);
// // // //     const [loading, setLoading] = useState(true);
// // // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // // //     const [progressData, setProgressData] = useState<any>(null);
// // // //     const [messages, setMessages] = useState<any[]>([]);
// // // //     const [chatMessage, setChatMessage] = useState('');
// // // //     const [showChat, setShowChat] = useState(false);
// // // //     const [showMobileMenu, setShowMobileMenu] = useState(false);
    
// // // //     // Default: Full Screen (Top 0), Menu Utama Tertutup
// // // //     const [isFullScreen, setIsFullScreen] = useState(true);

// // // //     const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
// // // //     const progressBarRef = useRef<HTMLDivElement>(null);
// // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // //     // --- MAIN EFFECT ---
// // // //     useEffect(() => {
// // // //         if (!courseId || !user) return;
// // // //         if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// // // //             loadData();
// // // //             return;
// // // //         }
// // // //         checkEnrollmentAndLoad();
// // // //     }, [courseId, user]);

// // // //     useEffect(() => {
// // // //         if (progressBarRef.current) {
// // // //             const percent = Math.round(progressData?.percent || 0);
// // // //             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
// // // //             progressBarRef.current.style.width = `${percent}%`;
// // // //         }
// // // //     }, [progressData]);

// // // //     useEffect(() => {
// // // //         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // //     }, [messages, showChat]);

// // // //     useEffect(() => {
// // // //         setFlippedCards({});
// // // //     }, [activeLesson]);

// // // //     // --- FUNCTIONS ---
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
// // // //             await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
// // // //             const updated = await api(`/api/progress/${courseId}`);
// // // //             setProgressData(updated);
// // // //         } catch (e) { alert("Gagal update progres"); }
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

// // // //     // --- RENDERER KONTEN ---
// // // //     const renderContent = () => {
// // // //         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
// // // //         switch (activeLesson.type) {
// // // //             case 'video_url': return <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
// // // //             case 'embed': return <div className="aspect-[4/3] md:aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg relative"><iframe src={activeLesson.videoUrl || activeLesson.content} className="w-full h-full" title="Embedded Content" allowFullScreen /></div>;
// // // //             case 'audio': return <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl text-white flex flex-col items-center justify-center min-h-[300px]"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse"><Mic size={48} /></div><h2 className="text-2xl font-bold mb-2 text-center">{activeLesson.title}</h2><p className="text-pink-100 text-sm mb-8">Dengarkan materi audio ini.</p><audio controls src={getImageUrl(activeLesson.fileUrl)} className="w-full max-w-lg rounded-full shadow-lg" /></div>;
// // // //             case 'flashcard': 
// // // //                 let cards = []; try { cards = JSON.parse(activeLesson.content || '[]'); } catch (e) { cards = []; }
// // // //                 return <div className="space-y-6"><div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 mb-4"><Layers size={24}/><div><h3 className="font-bold">Mode Hafalan</h3><p className="text-xs">Klik kartu untuk membalik.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card:any, idx:number) => (<div key={idx} onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))} className="relative h-64 w-full cursor-pointer perspective-1000 group"><div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${flippedCards[idx] ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pertanyaan</span><p className="text-lg font-bold text-gray-800">{card.front}</p></div><div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180"><span className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-4">Jawaban</span><p className="text-lg font-bold">{card.back}</p></div></div></div>))}</div></div>;
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
// // // //             {/* CONTAINER UTAMA (Slide Up/Down) */}
// // // //             <div className={`fixed left-0 right-0 bottom-0 z-[9999] bg-white flex flex-col font-sans transition-all duration-500 ease-in-out shadow-2xl ${isFullScreen ? 'top-0' : 'top-[80px]'}`}>
                
// // // //                 {/* --- HEADER PLAYER (MERAH) --- */}
// // // //                 <header className="bg-[#B91C1C] text-white p-4 flex items-center justify-between shrink-0 shadow-md relative z-50">
                    
// // // //                     {/* [FIX] TOMBOL LIDAH (HANDLE) */}
// // // //                     {/* Warna: bg-white (Putih), Icon: text-red (Merah) */}
// // // //                     {/* Posisi: top-0 (Menempel di bibir atas header) */}
// // // //                     <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] flex justify-center">
// // // //                         <button 
// // // //                             onClick={() => setIsFullScreen(!isFullScreen)} 
// // // //                             className="w-16 h-6 bg-white border-x border-b border-white/50 rounded-b-xl shadow-lg flex items-center justify-center text-[#B91C1C] hover:bg-gray-100 hover:h-7 transition-all group"
// // // //                             title={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// // // //                             aria-label={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// // // //                         >
// // // //                             {/* Jika FullScreen (Menu Tertutup) -> Icon Turun (Buka Menu) */}
// // // //                             {/* Jika Menu Terbuka -> Icon Naik (Tutup Menu) */}
// // // //                             {isFullScreen ? (
// // // //                                 <ChevronDown size={20} className="group-hover:mt-1 transition-all font-bold"/>
// // // //                             ) : (
// // // //                                 <ChevronUp size={20} className="group-hover:-mt-1 transition-all font-bold"/>
// // // //                             )}
// // // //                         </button>
// // // //                     </div>

// // // //                     <div className="flex items-center gap-4">
// // // //                         <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali ke Kursus"><ArrowLeft size={20}/></Link>
// // // //                         <div>
// // // //                             <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1>
// // // //                             <div className="flex items-center gap-2 mt-0.5">
// // // //                                 <div className="w-24 h-1.5 bg-red-800 rounded-full overflow-hidden border border-red-700">
// // // //                                     <div ref={progressBarRef} className="h-full bg-white rounded-full" role="progressbar" aria-label="Progres Belajar"></div>
// // // //                                 </div>
// // // //                                 <span className="text-[10px] font-bold text-red-100">{percent}% SELESAI</span>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
                    
// // // //                     <div className="flex items-center gap-3">
// // // //                         <div className="w-8 h-8 rounded bg-white text-[#B91C1C] flex items-center justify-center font-bold text-xs uppercase shadow-lg">{course?.organizer?.charAt(0)}</div>
// // // //                         <button 
// // // //                             className="lg:hidden p-2 bg-white/10 rounded-xl" 
// // // //                             onClick={() => setShowMobileMenu(!showMobileMenu)} 
// // // //                             title="Menu"
// // // //                             aria-label="Buka Menu"
// // // //                         >
// // // //                             <Menu size={18}/>
// // // //                         </button>
// // // //                     </div>
// // // //                 </header>

// // // //                 <div className="flex flex-1 overflow-hidden relative">
// // // //                     {/* SIDEBAR KIRI */}
// // // //                     <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
// // // //                         <div className="p-5 border-b bg-gray-50/50 flex justify-between items-center">
// // // //                             <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3>
// // // //                             <button 
// // // //                                 onClick={() => setShowMobileMenu(false)} 
// // // //                                 className="lg:hidden text-gray-400 hover:text-red-600"
// // // //                                 title="Tutup Menu"
// // // //                                 aria-label="Tutup Menu"
// // // //                             >
// // // //                                 <X size={18}/>
// // // //                             </button>
// // // //                         </div>
// // // //                         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
// // // //                             {course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
// // // //                                 <div key={mod._id}>
// // // //                                     <div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div>
// // // //                                     <div className="space-y-1">
// // // //                                         {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
// // // //                                             <button 
// // // //                                                 key={les._id} 
// // // //                                                 onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} 
// // // //                                                 className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`}
// // // //                                                 aria-label={`Pilih materi ${les.title}`}
// // // //                                             >
// // // //                                                 {isDone(les._id) ? <CheckCircle className="text-green-500 shrink-0" size={18}/> : <PlayCircle className="text-gray-300 shrink-0" size={18}/>}
// // // //                                                 <div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div>
// // // //                                             </button>
// // // //                                         ))}
// // // //                                     </div>
// // // //                                 </div>
// // // //                             ))}
// // // //                         </div>
// // // //                         <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
// // // //                     </aside>

// // // //                     {/* MAIN CONTENT */}
// // // //                     <main className="flex-1 relative flex flex-col min-w-0">
// // // //                         <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar pb-32">
// // // //                             <div className="max-w-4xl mx-auto">
// // // //                                 <div className="mb-8 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">{renderContent()}</div>
// // // //                                 {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && activeLesson?.content && !['flashcard', 'audio', 'embed'].includes(activeLesson.type) && (
// // // //                                     <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"><div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} /></div>
// // // //                                 )}
// // // //                             </div>
// // // //                         </div>
                        
// // // //                         {/* FOOTER PLAYER */}
// // // //                         <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 md:p-6 flex justify-between items-center z-20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
// // // //                             <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
// // // //                             {!isDone(activeLesson?._id) ? (
// // // //                                 <button onClick={() => handleMarkComplete(activeLesson?._id)} className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-black text-xs shadow-xl shadow-red-200 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"><CheckCircle size={18}/> Tandai Selesai</button>
// // // //                             ) : (
// // // //                                 <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-8 py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"><CheckCircle size={18}/> Materi Lulus</div>
// // // //                             )}
// // // //                         </div>
// // // //                     </main>

// // // //                     {/* CHAT BUTTON */}
// // // //                     <button 
// // // //                         onClick={() => setShowChat(!showChat)} 
// // // //                         className="absolute right-6 bottom-28 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center"
// // // //                         title="Buka Ruang Diskusi"
// // // //                         aria-label="Buka Ruang Diskusi"
// // // //                     >
// // // //                         <MessageSquare size={24}/>
// // // //                         {messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}
// // // //                     </button>

// // // //                     {showChat && (
// // // //                         <div className="absolute right-6 bottom-28 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
// // // //                             <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0">
// // // //                                 <div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div>
// // // //                                 <button 
// // // //                                     onClick={() => setShowChat(false)} 
// // // //                                     className="hover:bg-white/20 p-1 rounded-full"
// // // //                                     title="Tutup Chat"
// // // //                                     aria-label="Tutup Chat"
// // // //                                 >
// // // //                                     <X size={18}/>
// // // //                                 </button>
// // // //                             </div>
// // // //                             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">
// // // //                                 {messages.map((m, i) => (
// // // //                                     <div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}>
// // // //                                         <span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span>
// // // //                                         <div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>
// // // //                                             {m.message}
// // // //                                         </div>
// // // //                                     </div>
// // // //                                 ))}
// // // //                                 <div ref={messagesEndRef} />
// // // //                             </div>
// // // //                             <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0">
// // // //                                 <input 
// // // //                                     className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" 
// // // //                                     placeholder="Ketik pesan..." 
// // // //                                     value={chatMessage} 
// // // //                                     onChange={e => setChatMessage(e.target.value)} 
// // // //                                     aria-label="Ketik pesan chat"
// // // //                                 />
// // // //                                 <button 
// // // //                                     type="submit" 
// // // //                                     className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all"
// // // //                                     title="Kirim Pesan"
// // // //                                     aria-label="Kirim Pesan"
// // // //                                 >
// // // //                                     <Send size={16}/>
// // // //                                 </button>
// // // //                             </form>
// // // //                         </div>
// // // //                     )}
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
// // //     Mic, RotateCw, Layers, Globe, ChevronUp, ChevronDown, Maximize2, Minimize2 
// // // } from 'lucide-react';
// // // import Link from 'next/link';

// // // // [BARU] Import komponen Game
// // // import GameMemory from '@/components/course/GameMemory';

// // // export default function CoursePlayPage() {
// // //     const params = useParams();
// // //     const router = useRouter();
// // //     const { user } = useAuth();
// // //     const courseId = params?.courseId as string;

// // //     // --- STATE ---
// // //     const [course, setCourse] = useState<any>(null);
// // //     const [loading, setLoading] = useState(true);
// // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // //     const [progressData, setProgressData] = useState<any>(null);
// // //     const [messages, setMessages] = useState<any[]>([]);
// // //     const [chatMessage, setChatMessage] = useState('');
// // //     const [showChat, setShowChat] = useState(false);
// // //     const [showMobileMenu, setShowMobileMenu] = useState(false);
// // //     const [isFullScreen, setIsFullScreen] = useState(true);

// // //     const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
// // //     const progressBarRef = useRef<HTMLDivElement>(null);
// // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // //     // --- MAIN EFFECT ---
// // //     useEffect(() => {
// // //         if (!courseId || !user) return;
// // //         if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// // //             loadData();
// // //             return;
// // //         }
// // //         checkEnrollmentAndLoad();
// // //     }, [courseId, user]);

// // //     useEffect(() => {
// // //         if (progressBarRef.current) {
// // //             const percent = Math.round(progressData?.percent || 0);
// // //             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
// // //             progressBarRef.current.style.width = `${percent}%`;
// // //         }
// // //     }, [progressData]);

// // //     useEffect(() => {
// // //         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //     }, [messages, showChat]);

// // //     useEffect(() => {
// // //         setFlippedCards({});
// // //     }, [activeLesson]);

// // //     // --- FUNCTIONS ---
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
// // //             const [prog, msg] = await Promise.all([
// // //                 api(`/api/progress/${courseId}`),
// // //                 api(`/api/courses/${courseId}/messages`)
// // //             ]);
// // //             setProgressData(prog);
// // //             setMessages(msg || []);
// // //             const firstMod = cData.modules?.find((m: any) => m.isActive);
// // //             const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
// // //             if (firstLes) setActiveLesson(firstLes);
// // //         } catch (e) {
// // //             console.error("Gagal memuat data", e);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     const handleMarkComplete = async (lessonId: string) => {
// // //         try {
// // //             await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
// // //             const updated = await api(`/api/progress/${courseId}`);
// // //             setProgressData(updated);
// // //         } catch (e) { alert("Gagal update progres"); }
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

// // //     // --- RENDERER KONTEN ---
// // //     const renderContent = () => {
// // //         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
// // //         switch (activeLesson.type) {
// // //             case 'video_url': return <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
// // //             case 'embed': return <div className="aspect-[4/3] md:aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg relative"><iframe src={activeLesson.videoUrl || activeLesson.content} className="w-full h-full" title="Embedded Content" allowFullScreen /></div>;
// // //             case 'audio': return <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl text-white flex flex-col items-center justify-center min-h-[300px]"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse"><Mic size={48} /></div><h2 className="text-2xl font-bold mb-2 text-center">{activeLesson.title}</h2><p className="text-pink-100 text-sm mb-8">Dengarkan materi audio ini.</p><audio controls src={getImageUrl(activeLesson.fileUrl)} className="w-full max-w-lg rounded-full shadow-lg" /></div>;
            
// // //             // [BARU] INTEGRASI GAME MEMORY
// // //             case 'game_memory': 
// // //                 return (
// // //                     <GameMemory 
// // //                         content={activeLesson.content} 
// // //                         lessonId={activeLesson._id}
// // //                         onComplete={handleMarkComplete} 
// // //                     />
// // //                 );

// // //             case 'flashcard': 
// // //                 let cards = []; try { cards = JSON.parse(activeLesson.content || '[]'); } catch (e) { cards = []; }
// // //                 return <div className="space-y-6"><div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 mb-4"><Layers size={24}/><div><h3 className="font-bold">Mode Hafalan</h3><p className="text-xs">Klik kartu untuk membalik.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card:any, idx:number) => (<div key={idx} onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))} className="relative h-64 w-full cursor-pointer perspective-1000 group"><div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${flippedCards[idx] ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pertanyaan</span><p className="text-lg font-bold text-gray-800">{card.front}</p></div><div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180"><span className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-4">Jawaban</span><p className="text-lg font-bold">{card.back}</p></div></div></div>))}</div></div>;
// // //             case 'slide': return <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/></div>;
// // //             case 'image': return <div className="rounded-2xl overflow-hidden border shadow-lg bg-gray-900 flex items-center justify-center"><img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto max-h-[500px]"/></div>;
// // //             case 'download_doc': return <div className="bg-green-50 p-8 rounded-3xl border border-green-200 flex flex-col items-center justify-center gap-4 text-center"><div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={32}/></div><h2 className="text-xl font-bold text-green-900">{activeLesson.title}</h2><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2">Download Dokumen</a></div>;
// // //             case 'poll': return <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.pollQuestion}</h2><div className="space-y-3">{activeLesson.pollOptions?.map((opt:string, i:number) => <button key={i} className="w-full text-left p-4 bg-purple-50 border-2 border-purple-100 rounded-xl font-bold text-purple-900">{opt}</button>)}</div></div>;
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
                    
// // //                     <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] flex justify-center">
// // //                         <button 
// // //                             onClick={() => setIsFullScreen(!isFullScreen)} 
// // //                             className="w-16 h-6 bg-white border-x border-b border-white/50 rounded-b-xl shadow-lg flex items-center justify-center text-[#B91C1C] hover:bg-gray-100 hover:h-7 transition-all group"
// // //                             title={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// // //                             aria-label={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// // //                         >
// // //                             {isFullScreen ? <ChevronDown size={20} className="group-hover:mt-1 transition-all font-bold"/> : <ChevronUp size={20} className="group-hover:-mt-1 transition-all font-bold"/>}
// // // //                         </button>
// // // //                     </div>

// // // //                     <div className="flex items-center gap-4">
// // // //                         <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali ke Kursus"><ArrowLeft size={20}/></Link>
// // // //                         <div>
// // // //                             <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1>
// // // //                             <div className="flex items-center gap-2 mt-0.5">
// // // //                                 <div className="w-24 h-1.5 bg-red-800 rounded-full overflow-hidden border border-red-700">
// // // //                                     <div ref={progressBarRef} className="h-full bg-white rounded-full" role="progressbar" aria-label="Progres Belajar"></div>
// // // //                                 </div>
// // // //                                 <span className="text-[10px] font-bold text-red-100">{percent}% SELESAI</span>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
                    
// // // //                     <div className="flex items-center gap-3">
// // // //                         <div className="w-8 h-8 rounded bg-white text-[#B91C1C] flex items-center justify-center font-bold text-xs uppercase shadow-lg">{course?.organizer?.charAt(0)}</div>
// // // //                         <button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu" aria-label="Buka Menu"><Menu size={18}/></button>
// // // //                     </div>
// // // //                 </header>

// // // //                 <div className="flex flex-1 overflow-hidden relative">
// // // //                     <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
// // // //                         <div className="p-5 border-b bg-gray-50/50 flex justify-between items-center"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3><button onClick={() => setShowMobileMenu(false)} className="lg:hidden text-gray-400 hover:text-red-600" title="Tutup Menu" aria-label="Tutup Menu"><X size={18}/></button></div>
// // // //                         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
// // // //                             {course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
// // // //                                 <div key={mod._id}>
// // // //                                     <div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div>
// // // //                                     <div className="space-y-1">
// // // //                                         {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
// // // //                                             <button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`} aria-label={`Pilih materi ${les.title}`}>
// // // //                                                 {isDone(les._id) ? <CheckCircle className="text-green-500 shrink-0" size={18}/> : <PlayCircle className="text-gray-300 shrink-0" size={18}/>}
// // // //                                                 <div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div>
// // // //                                             </button>
// // // //                                         ))}
// // // //                                     </div>
// // // //                                 </div>
// // // //                             ))}
// // // //                         </div>
// // // //                         <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
// // // //                     </aside>

// // // //                     <main className="flex-1 relative flex flex-col min-w-0">
// // // //                         <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar pb-32">
// // // //                             <div className="max-w-4xl mx-auto">
// // // //                                 <div className="mb-8 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">{renderContent()}</div>
// // // //                                 {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && activeLesson?.content && !['flashcard', 'audio', 'embed', 'game_memory'].includes(activeLesson.type) && (
// // // //                                     <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"><div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} /></div>
// // // //                                 )}
// // // //                             </div>
// // // //                         </div>
                        
// // // //                         <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 md:p-6 flex justify-between items-center z-20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
// // // //                             <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
// // // //                             {!isDone(activeLesson?._id) ? (
// // // //                                 <button onClick={() => handleMarkComplete(activeLesson?._id)} className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-black text-xs shadow-xl shadow-red-200 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"><CheckCircle size={18}/> Tandai Selesai</button>
// // // //                             ) : (
// // // //                                 <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-8 py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"><CheckCircle size={18}/> Materi Lulus</div>
// // // //                             )}
// // // //                         </div>
// // // //                     </main>

// // // //                     <button onClick={() => setShowChat(!showChat)} className="absolute right-6 bottom-28 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi"><MessageSquare size={24}/>{messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}</button>
// // // //                     {showChat && (
// // // //                         <div className="absolute right-6 bottom-28 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
// // // //                             <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0"><div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div><button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat" aria-label="Tutup Chat"><X size={18}/></button></div>
// // // //                             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">{messages.map((m, i) => (<div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}><span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span><div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div></div>))}<div ref={messagesEndRef} /></div>
// // // //                             <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0"><input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} aria-label="Ketik pesan chat"/><button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button></form>
// // // //                         </div>
// // // //                     )}
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
// // //     Mic, RotateCw, Layers, Globe, ChevronUp, ChevronDown, Maximize2, Minimize2,
// // //     Smile 
// // // } from 'lucide-react';
// // // import Link from 'next/link';

// // // // Import komponen Game
// // // import GameMemory from '@/components/course/GameMemory';
// // // import GameScavenger from '@/components/course/GameScavenger';

// // // export default function CoursePlayPage() {
// // //     const params = useParams();
// // //     const router = useRouter();
// // //     const { user } = useAuth();
// // //     const courseId = params?.courseId as string;

// // //     // --- STATE ---
// // //     const [course, setCourse] = useState<any>(null);
// // //     const [loading, setLoading] = useState(true);
// // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // //     const [progressData, setProgressData] = useState<any>(null);
// // //     const [messages, setMessages] = useState<any[]>([]);
// // //     const [chatMessage, setChatMessage] = useState('');
// // //     const [showChat, setShowChat] = useState(false);
// // //     const [showMobileMenu, setShowMobileMenu] = useState(false);
// // //     const [isFullScreen, setIsFullScreen] = useState(true);

// // //     const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
// // //     const progressBarRef = useRef<HTMLDivElement>(null);
// // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // //     // --- MAIN EFFECT ---
// // //     useEffect(() => {
// // //         if (!courseId || !user) return;
// // //         if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// // //             loadData();
// // //             return;
// // //         }
// // //         checkEnrollmentAndLoad();
// // //     }, [courseId, user]);

// // //     useEffect(() => {
// // //         if (progressBarRef.current) {
// // //             const percent = Math.round(progressData?.percent || 0);
// // //             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
// // //             progressBarRef.current.style.width = `${percent}%`;
// // //         }
// // //     }, [progressData]);

// // //     useEffect(() => {
// // //         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //     }, [messages, showChat]);

// // //     useEffect(() => {
// // //         setFlippedCards({});
// // //     }, [activeLesson]);

// // //     // --- FUNCTIONS ---
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
// // //             const [prog, msg] = await Promise.all([
// // //                 api(`/api/progress/${courseId}`),
// // //                 api(`/api/courses/${courseId}/messages`)
// // //             ]);
// // //             setProgressData(prog);
// // //             setMessages(msg || []);
// // //             const firstMod = cData.modules?.find((m: any) => m.isActive);
// // //             const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
// // //             if (firstLes) setActiveLesson(firstLes);
// // //         } catch (e) {
// // //             console.error("Gagal memuat data", e);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     const handleMarkComplete = async (lessonId: string) => {
// // //         try {
// // //             await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
// // //             const updated = await api(`/api/progress/${courseId}`);
// // //             setProgressData(updated);
// // //         } catch (e) { alert("Gagal update progres"); }
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

// // //     // --- RENDERER KONTEN ---
// // //     const renderContent = () => {
// // //         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
// // //         switch (activeLesson.type) {
// // //             case 'video_url': return <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
// // //             case 'embed': return <div className="aspect-[4/3] md:aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg relative"><iframe src={activeLesson.videoUrl || activeLesson.content} className="w-full h-full" title="Embedded Content" allowFullScreen /></div>;
// // //             case 'audio': return <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl text-white flex flex-col items-center justify-center min-h-[300px]"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse"><Mic size={48} /></div><h2 className="text-2xl font-bold mb-2 text-center">{activeLesson.title}</h2><p className="text-pink-100 text-sm mb-8">Dengarkan materi audio ini.</p><audio controls src={getImageUrl(activeLesson.fileUrl)} className="w-full max-w-lg rounded-full shadow-lg" /></div>;
            
// // //             // GAMES INTEGRATION
// // //             case 'game_memory': return <GameMemory content={activeLesson.content} lessonId={activeLesson._id} onComplete={handleMarkComplete} />;
// // //             case 'game_scavenger': return <GameScavenger content={activeLesson.content} lessonId={activeLesson._id} onComplete={handleMarkComplete} />;
// // //             case 'game_emoji': 
// // //                 return (
// // //                     <div className="bg-yellow-50 p-8 rounded-3xl border-2 border-yellow-200 shadow-sm relative overflow-hidden">
// // //                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
// // //                         <div className="text-center mb-8 relative z-10">
// // //                             <div className="inline-block p-3 bg-white rounded-full shadow-md mb-3 text-yellow-500 border border-yellow-100"><Smile size={32} /></div>
// // //                             <h2 className="text-2xl font-black text-yellow-800">🤔 Tebak Kode Emoji</h2>
// // //                             <p className="text-yellow-700 text-sm">Pecahkan teka-teki emoji di bawah ini!</p>
// // //                         </div>
// // //                         <div className="space-y-6 max-w-2xl mx-auto relative z-10">
// // //                             {activeLesson.questions?.map((q: any, idx: number) => (
// // //                                 <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100 text-center">
// // //                                     <div className="text-6xl mb-4 animate-bounce" dangerouslySetInnerHTML={{__html: q.question}}></div>
// // //                                     <input className="w-full p-3 border-2 border-gray-200 rounded-xl text-center font-bold text-lg focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 outline-none uppercase tracking-widest placeholder:normal-case placeholder:font-normal placeholder:tracking-normal transition-all" placeholder="Ketik jawabanmu..."/>
// // //                                 </div>
// // //                             ))}
// // //                         </div>
// // //                         <div className="mt-8 text-center"><button onClick={() => handleMarkComplete(activeLesson._id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-yellow-200 transition-all active:scale-95">Kirim Jawaban</button></div>
// // //                     </div>
// // //                 );

// // //             case 'flashcard': 
// // //                 let cards = []; try { cards = JSON.parse(activeLesson.content || '[]'); } catch (e) { cards = []; }
// // //                 return <div className="space-y-6"><div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 mb-4"><Layers size={24}/><div><h3 className="font-bold">Mode Hafalan</h3><p className="text-xs">Klik kartu untuk membalik.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card:any, idx:number) => (<div key={idx} onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))} className="relative h-64 w-full cursor-pointer perspective-1000 group"><div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${flippedCards[idx] ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pertanyaan</span><p className="text-lg font-bold text-gray-800">{card.front}</p></div><div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180"><span className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-4">Jawaban</span><p className="text-lg font-bold">{card.back}</p></div></div></div>))}</div></div>;
// // //             case 'slide': return <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/></div>;
// // //             case 'image': return <div className="rounded-2xl overflow-hidden border shadow-lg bg-gray-900 flex items-center justify-center"><img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto max-h-[500px]"/></div>;
// // //             case 'download_doc': return <div className="bg-green-50 p-8 rounded-3xl border border-green-200 flex flex-col items-center justify-center gap-4 text-center"><div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={32}/></div><h2 className="text-xl font-bold text-green-900">{activeLesson.title}</h2><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2">Download Dokumen</a></div>;
// // //             case 'poll': return <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.pollQuestion}</h2><div className="space-y-3">{activeLesson.pollOptions?.map((opt:string, i:number) => <button key={i} className="w-full text-left p-4 bg-purple-50 border-2 border-purple-100 rounded-xl font-bold text-purple-900">{opt}</button>)}</div></div>;
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
                    
// // //                     <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] flex justify-center">
// // //                         <button 
// // //                             onClick={() => setIsFullScreen(!isFullScreen)} 
// // //                             className="w-16 h-6 bg-white border-x border-b border-white/50 rounded-b-xl shadow-lg flex items-center justify-center text-[#B91C1C] hover:bg-gray-100 hover:h-7 transition-all group"
// // //                             title={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// // //                             aria-label={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// // //                         >
// // //                             {isFullScreen ? <ChevronDown size={20} className="group-hover:mt-1 transition-all font-bold"/> : <ChevronUp size={20} className="group-hover:-mt-1 transition-all font-bold"/>}
// // //                         </button>
// // //                     </div>

// // //                     <div className="flex items-center gap-4">
// // //                         <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali ke Kursus"><ArrowLeft size={20}/></Link>
// // //                         <div>
// // //                             <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1>
// // //                             <div className="flex items-center gap-2 mt-0.5">
// // //                                 <div className="w-24 h-1.5 bg-red-800 rounded-full overflow-hidden border border-red-700">
// // //                                     <div ref={progressBarRef} className="h-full bg-white rounded-full" role="progressbar" aria-label="Progres Belajar"></div>
// // //                                 </div>
// // //                                 <span className="text-[10px] font-bold text-red-100">{percent}% SELESAI</span>
// // //                             </div>
// // //                         </div>
// // //                     </div>
                    
// // //                     <div className="flex items-center gap-3">
// // //                         <div className="w-8 h-8 rounded bg-white text-[#B91C1C] flex items-center justify-center font-bold text-xs uppercase shadow-lg">{course?.organizer?.charAt(0)}</div>
// // //                         <button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu" aria-label="Buka Menu"><Menu size={18}/></button>
// // //                     </div>
// // //                 </header>

// // //                 <div className="flex flex-1 overflow-hidden relative">
// // //                     <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
// // //                         <div className="p-5 border-b bg-gray-50/50 flex justify-between items-center"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3><button onClick={() => setShowMobileMenu(false)} className="lg:hidden text-gray-400 hover:text-red-600" title="Tutup Menu" aria-label="Tutup Menu"><X size={18}/></button></div>
// // //                         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
// // //                             {course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
// // //                                 <div key={mod._id}>
// // //                                     <div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div>
// // //                                     <div className="space-y-1">
// // //                                         {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
// // //                                             <button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`} aria-label={`Pilih materi ${les.title}`}>
// // //                                                 {isDone(les._id) ? <CheckCircle className="text-green-500 shrink-0" size={18}/> : <PlayCircle className="text-gray-300 shrink-0" size={18}/>}
// // //                                                 <div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div>
// // //                                             </button>
// // //                                         ))}
// // //                                     </div>
// // //                                 </div>
// // //                             ))}
// // //                         </div>
// // //                         <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
// // //                     </aside>

// // //                     <main className="flex-1 relative flex flex-col min-w-0">
// // //                         <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar pb-32">
// // //                             <div className="max-w-4xl mx-auto">
// // //                                 <div className="mb-8 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">{renderContent()}</div>
// // //                                 {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && activeLesson?.content && !['flashcard', 'audio', 'embed', 'game_memory', 'game_scavenger', 'game_emoji'].includes(activeLesson.type) && (
// // //                                     <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"><div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} /></div>
// // //                                 )}
// // //                             </div>
// // //                         </div>
                        
// // //                         <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 md:p-6 flex justify-between items-center z-20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
// // //                             <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
// // //                             {!isDone(activeLesson?._id) ? (
// // //                                 <button onClick={() => handleMarkComplete(activeLesson?._id)} className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-black text-xs shadow-xl shadow-red-200 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"><CheckCircle size={18}/> Tandai Selesai</button>
// // //                             ) : (
// // //                                 <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-8 py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"><CheckCircle size={18}/> Materi Lulus</div>
// // //                             )}
// // //                         </div>
// // //                     </main>

// // //                     <button onClick={() => setShowChat(!showChat)} className="absolute right-6 bottom-28 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi"><MessageSquare size={24}/>{messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}</button>
// // //                     {showChat && (
// // //                         <div className="absolute right-6 bottom-28 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
// // //                             <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0"><div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div><button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat" aria-label="Tutup Chat"><X size={18}/></button></div>
// // //                             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">{messages.map((m, i) => (<div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}><span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span><div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div></div>))}<div ref={messagesEndRef} /></div>
// // //                             <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0"><input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} aria-label="Ketik pesan chat"/><button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button></form>
// // //                         </div>
// // //                     )}
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
// //     Maximize2, Minimize2, Smile, Gamepad2, Camera
// // } from 'lucide-react';
// // import Link from 'next/link';

// // // Import komponen Game
// // // Sesuaikan dengan lokasi file Anda di folder 'course'
// // import GameMemory from '@/components/course/GameMemory';
// // import GameScavenger from '@/components/course/GameScavenger';

// // // [FIX] Helper Icon Sidebar
// // const getSidebarIcon = (type: string, isCompleted: boolean) => {
// //     if (isCompleted) return <CheckCircle className="text-green-500 shrink-0" size={18}/>;
// //     switch (type) {
// //         case 'video_url': return <PlayCircle className="text-red-500 shrink-0" size={18}/>;
// //         case 'game_memory': return <Gamepad2 className="text-violet-500 shrink-0" size={18}/>;
// //         case 'game_scavenger': return <Camera className="text-rose-500 shrink-0" size={18}/>;
// //         case 'game_emoji': return <Smile className="text-yellow-500 shrink-0" size={18}/>;
// //         case 'audio': return <Mic className="text-pink-500 shrink-0" size={18}/>;
// //         case 'quiz': return <FileText className="text-orange-500 shrink-0" size={18}/>;
// //         default: return <PlayCircle className="text-gray-300 shrink-0" size={18}/>;
// //     }
// // };

// // export default function CoursePlayPage() {
// //     const params = useParams();
// //     const router = useRouter();
// //     const { user } = useAuth();
// //     const courseId = params?.courseId as string;

// //     // --- STATE ---
// //     const [course, setCourse] = useState<any>(null);
// //     const [loading, setLoading] = useState(true);
// //     const [activeLesson, setActiveLesson] = useState<any>(null);
// //     const [progressData, setProgressData] = useState<any>(null);
// //     const [messages, setMessages] = useState<any[]>([]);
// //     const [chatMessage, setChatMessage] = useState('');
// //     const [showChat, setShowChat] = useState(false);
// //     const [showMobileMenu, setShowMobileMenu] = useState(false);
// //     const [isFullScreen, setIsFullScreen] = useState(true);

// //     const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
// //     const progressBarRef = useRef<HTMLDivElement>(null);
// //     const messagesEndRef = useRef<HTMLDivElement>(null);

// //     // --- MAIN EFFECT ---
// //     useEffect(() => {
// //         if (!courseId || !user) return;
// //         if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// //             loadData();
// //             return;
// //         }
// //         checkEnrollmentAndLoad();
// //     }, [courseId, user]);

// //     useEffect(() => {
// //         if (progressBarRef.current) {
// //             const percent = Math.round(progressData?.percent || 0);
// //             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
// //             progressBarRef.current.style.width = `${percent}%`;
// //         }
// //     }, [progressData]);

// //     useEffect(() => {
// //         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //     }, [messages, showChat]);

// //     useEffect(() => {
// //         setFlippedCards({});
// //     }, [activeLesson]);

// //     // --- FUNCTIONS ---
// //     const checkEnrollmentAndLoad = async () => {
// //         try {
// //             setLoading(true);
// //             const statusRes = await api(`/api/courses/${courseId}/enrollment-status`);
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
// //                 api(`/api/progress/${courseId}`),
// //                 api(`/api/courses/${courseId}/messages`)
// //             ]);
// //             setProgressData(prog);
// //             setMessages(msg || []);
// //             const firstMod = cData.modules?.find((m: any) => m.isActive);
// //             const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
// //             if (firstLes) setActiveLesson(firstLes);
// //         } catch (e) {
// //             console.error("Gagal memuat data", e);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleMarkComplete = async (lessonId: string) => {
// //         try {
// //             await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
// //             const updated = await api(`/api/progress/${courseId}`);
// //             setProgressData(updated);
// //         } catch (e) { alert("Gagal update progres"); }
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

// //     const isDone = (id: string) => progressData?.completedLessons?.includes(id);

// //     // --- RENDERER KONTEN ---
// //     const renderContent = () => {
// //         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
// //         switch (activeLesson.type) {
// //             case 'video_url': return <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
// //             case 'embed': return <div className="aspect-[4/3] md:aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg relative"><iframe src={activeLesson.videoUrl || activeLesson.content} className="w-full h-full" title="Embedded Content" allowFullScreen /></div>;
// //             case 'audio': return <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl text-white flex flex-col items-center justify-center min-h-[300px]"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse"><Mic size={48} /></div><h2 className="text-2xl font-bold mb-2 text-center">{activeLesson.title}</h2><p className="text-pink-100 text-sm mb-8">Dengarkan materi audio ini.</p><audio controls src={getImageUrl(activeLesson.fileUrl)} className="w-full max-w-lg rounded-full shadow-lg" /></div>;
            
// //             // GAMES INTEGRATION
// //             case 'game_memory': return <GameMemory content={activeLesson.content} lessonId={activeLesson._id} onComplete={handleMarkComplete} />;
// //             case 'game_scavenger': return <GameScavenger content={activeLesson.content} lessonId={activeLesson._id} onComplete={handleMarkComplete} />;
// //             case 'game_emoji': 
// //                 return (
// //                     <div className="bg-yellow-50 p-8 rounded-3xl border-2 border-yellow-200 shadow-sm relative overflow-hidden">
// //                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
// //                         <div className="text-center mb-8 relative z-10">
// //                             <div className="inline-block p-3 bg-white rounded-full shadow-md mb-3 text-yellow-500 border border-yellow-100"><Smile size={32} /></div>
// //                             <h2 className="text-2xl font-black text-yellow-800">🤔 Tebak Kode Emoji</h2>
// //                             <p className="text-yellow-700 text-sm">Pecahkan teka-teki emoji di bawah ini!</p>
// //                         </div>
// //                         <div className="space-y-6 max-w-2xl mx-auto relative z-10">
// //                             {activeLesson.questions?.map((q: any, idx: number) => (
// //                                 <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100 text-center">
// //                                     {/* Gunakan dangerouslySetInnerHTML untuk merender emoji yang tersimpan */}
// //                                     <div className="text-6xl mb-4 animate-bounce" dangerouslySetInnerHTML={{__html: q.question}}></div>
// //                                     <input className="w-full p-3 border-2 border-gray-200 rounded-xl text-center font-bold text-lg focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 outline-none uppercase tracking-widest placeholder:normal-case placeholder:font-normal placeholder:tracking-normal transition-all" placeholder="Ketik jawabanmu..."/>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                         <div className="mt-8 text-center"><button onClick={() => handleMarkComplete(activeLesson._id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-yellow-200 transition-all active:scale-95">Kirim Jawaban</button></div>
// //                     </div>
// //                 );

// //             case 'flashcard': 
// //                 let cards = []; try { cards = JSON.parse(activeLesson.content || '[]'); } catch (e) { cards = []; }
// //                 return <div className="space-y-6"><div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 mb-4"><Layers size={24}/><div><h3 className="font-bold">Mode Hafalan</h3><p className="text-xs">Klik kartu untuk membalik.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card:any, idx:number) => (<div key={idx} onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))} className="relative h-64 w-full cursor-pointer perspective-1000 group"><div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${flippedCards[idx] ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pertanyaan</span><p className="text-lg font-bold text-gray-800">{card.front}</p></div><div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180"><span className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-4">Jawaban</span><p className="text-lg font-bold">{card.back}</p></div></div></div>))}</div></div>;
// //             case 'slide': return <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/></div>;
// //             case 'image': return <div className="rounded-2xl overflow-hidden border shadow-lg bg-gray-900 flex items-center justify-center"><img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto max-h-[500px]"/></div>;
// //             case 'download_doc': return <div className="bg-green-50 p-8 rounded-3xl border border-green-200 flex flex-col items-center justify-center gap-4 text-center"><div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={32}/></div><h2 className="text-xl font-bold text-green-900">{activeLesson.title}</h2><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2">Download Dokumen</a></div>;
// //             case 'poll': return <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.pollQuestion}</h2><div className="space-y-3">{activeLesson.pollOptions?.map((opt:string, i:number) => <button key={i} className="w-full text-left p-4 bg-purple-50 border-2 border-purple-100 rounded-xl font-bold text-purple-900">{opt}</button>)}</div></div>;
// //             case 'essay': case 'quiz': return <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2><div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6"><div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /></div><div className="border-t pt-6">{activeLesson.type === 'quiz' ? <Link href={`/courses/${courseId}/quiz/${activeLesson._id}`} className="block w-full text-center bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">Mulai Kuis</Link> : <button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-indigo-300 rounded-xl p-8 text-indigo-500 font-bold"><Paperclip className="mb-1"/> Upload Jawaban</button>}</div></div>;
// //             default: return <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex flex-col gap-6"><h2 className="text-2xl font-black text-gray-800">{activeLesson.title}</h2><div className="prose prose-red max-w-none bg-white p-6 rounded-2xl border border-red-100"><div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} /></div></div>;
// //         }
// //     };

// //     if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// //     const percent = Math.round(progressData?.percent || 0);

// //     return (
// //         <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
// //             <div className={`fixed left-0 right-0 bottom-0 z-[9999] bg-white flex flex-col font-sans transition-all duration-500 ease-in-out shadow-2xl ${isFullScreen ? 'top-0' : 'top-[80px]'}`}>
                
// //                 <header className="bg-[#B91C1C] text-white p-4 flex items-center justify-between shrink-0 shadow-md relative z-50">
                    
// //                     <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] flex justify-center">
// //                         <button 
// //                             onClick={() => setIsFullScreen(!isFullScreen)} 
// //                             className="w-16 h-6 bg-white border-x border-b border-white/50 rounded-b-xl shadow-lg flex items-center justify-center text-[#B91C1C] hover:bg-gray-100 hover:h-7 transition-all group"
// //                             title={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// //                             aria-label={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
// //                         >
// //                             {isFullScreen ? <ChevronDown size={20} className="group-hover:mt-1 transition-all font-bold"/> : <ChevronUp size={20} className="group-hover:-mt-1 transition-all font-bold"/>}
// //                         </button>
// //                     </div>

// //                     <div className="flex items-center gap-4">
// //                         <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali ke Kursus"><ArrowLeft size={20}/></Link>
// //                         <div>
// //                             <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1>
// //                             <div className="flex items-center gap-2 mt-0.5">
// //                                 <div className="w-24 h-1.5 bg-red-800 rounded-full overflow-hidden border border-red-700">
// //                                     <div ref={progressBarRef} className="h-full bg-white rounded-full" role="progressbar" aria-label="Progres Belajar"></div>
// //                                 </div>
// //                                 <span className="text-[10px] font-bold text-red-100">{percent}% SELESAI</span>
// //                             </div>
// //                         </div>
// //                     </div>
                    
// //                     <div className="flex items-center gap-3">
// //                         <div className="w-8 h-8 rounded bg-white text-[#B91C1C] flex items-center justify-center font-bold text-xs uppercase shadow-lg">{course?.organizer?.charAt(0)}</div>
// //                         <button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu" aria-label="Buka Menu"><Menu size={18}/></button>
// //                     </div>
// //                 </header>

// //                 <div className="flex flex-1 overflow-hidden relative">
// //                     <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
// //                         <div className="p-5 border-b bg-gray-50/50 flex justify-between items-center"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3><button onClick={() => setShowMobileMenu(false)} className="lg:hidden text-gray-400 hover:text-red-600" title="Tutup Menu" aria-label="Tutup Menu"><X size={18}/></button></div>
// //                         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
// //                             {course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
// //                                 <div key={mod._id}>
// //                                     <div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div>
// //                                     <div className="space-y-1">
// //                                         {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
// //                                             <button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`} aria-label={`Pilih materi ${les.title}`}>
// //                                                 {/* [FIX] GUNAKAN ICON SIDEBAR YANG SESUAI */}
// //                                                 {getSidebarIcon(les.type, isDone(les._id))}
// //                                                 <div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div>
// //                                             </button>
// //                                         ))}
// //                                     </div>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                         <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
// //                     </aside>

// //                     <main className="flex-1 relative flex flex-col min-w-0">
// //                         <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar pb-32">
// //                             <div className="max-w-4xl mx-auto">
// //                                 <div className="mb-8 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">{renderContent()}</div>
// //                                 {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && activeLesson?.content && !['flashcard', 'audio', 'embed', 'game_memory', 'game_scavenger', 'game_emoji'].includes(activeLesson.type) && (
// //                                     <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"><div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} /></div>
// //                                 )}
// //                             </div>
// //                         </div>
                        
// //                         {/* [FIX] FOOTER LEBIH KECIL (p-4 md:p-6 -> p-3 md:p-4) & (py-3.5 -> py-2) */}
// //                         <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 md:p-4 flex justify-between items-center z-20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
// //                             <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
// //                             {!isDone(activeLesson?._id) ? (
// //                                 <button onClick={() => handleMarkComplete(activeLesson?._id)} className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-black text-xs shadow-xl shadow-red-200 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"><CheckCircle size={16}/> Tandai Selesai</button>
// //                             ) : (
// //                                 <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-6 py-2 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"><CheckCircle size={16}/> Materi Lulus</div>
// //                             )}
// //                         </div>
// //                     </main>

// //                     <button onClick={() => setShowChat(!showChat)} className="absolute right-6 bottom-28 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi"><MessageSquare size={24}/>{messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}</button>
// //                     {showChat && (
// //                         <div className="absolute right-6 bottom-28 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
// //                             <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0"><div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div><button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat" aria-label="Tutup Chat"><X size={18}/></button></div>
// //                             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">{messages.map((m, i) => (<div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}><span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span><div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div></div>))}<div ref={messagesEndRef} /></div>
// //                             <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0"><input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} aria-label="Ketik pesan chat"/><button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button></form>
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>
// //         </Protected>
// //     );
// // }


// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { api, getImageUrl } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';
// import Protected from '@/components/Protected';
// import { 
//     ArrowLeft, CheckCircle, PlayCircle, Lock, 
//     MessageSquare, FileText, Send, Loader2, 
//     HeadphonesIcon, Menu, X, BarChart2, Paperclip, 
//     Mic, RotateCw, Layers, Globe, ChevronUp, ChevronDown, 
//     Maximize2, Minimize2, Smile, Gamepad2, Camera, Video
// } from 'lucide-react';
// import Link from 'next/link';

// // Import komponen Game
// import GameMemory from '@/components/course/GameMemory';
// import GameScavenger from '@/components/course/GameScavenger';

// // [FIX] Helper untuk menampilkan Icon yang sesuai di Sidebar
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

//     // --- STATE ---
//     const [course, setCourse] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const [activeLesson, setActiveLesson] = useState<any>(null);
//     const [progressData, setProgressData] = useState<any>(null);
//     const [messages, setMessages] = useState<any[]>([]);
//     const [chatMessage, setChatMessage] = useState('');
//     const [showChat, setShowChat] = useState(false);
//     const [showMobileMenu, setShowMobileMenu] = useState(false);
//     const [isFullScreen, setIsFullScreen] = useState(true);

//     // State Game Emoji
//     const [emojiAnswer, setEmojiAnswer] = useState('');
//     const [isEmojiCorrect, setIsEmojiCorrect] = useState<boolean | null>(null);

//     const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
//     const progressBarRef = useRef<HTMLDivElement>(null);
//     const messagesEndRef = useRef<HTMLDivElement>(null);

//     // --- MAIN EFFECT ---
//     useEffect(() => {
//         if (!courseId || !user) return;
//         if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
//             loadData();
//             return;
//         }
//         checkEnrollmentAndLoad();
//     }, [courseId, user]);

//     useEffect(() => {
//         if (progressBarRef.current) {
//             const percent = Math.round(progressData?.percent || 0);
//             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
//             progressBarRef.current.style.width = `${percent}%`;
//         }
//     }, [progressData]);

//     useEffect(() => {
//         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages, showChat]);

//     useEffect(() => {
//         setFlippedCards({});
//         setEmojiAnswer('');
//         setIsEmojiCorrect(null);
//     }, [activeLesson]);

//     // --- FUNCTIONS ---
//     const checkEnrollmentAndLoad = async () => {
//         try {
//             setLoading(true);
//             const statusRes = await api(`/api/courses/${courseId}/enrollment-status`);
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
            
//             // Load Progress & Chat secara paralel
//             const [prog, msg] = await Promise.all([
//                 api(`/api/progress/${courseId}`),
//                 api(`/api/courses/${courseId}/messages`)
//             ]);
            
//             setProgressData(prog);
//             setMessages(msg || []);
            
//             const firstMod = cData.modules?.find((m: any) => m.isActive);
//             const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
//             if (firstLes) setActiveLesson(firstLes);
//         } catch (e) {
//             console.error("Gagal memuat data", e);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleMarkComplete = async (lessonId: string) => {
//         try {
//             await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
//             // Refresh local progress data
//             const updated = await api(`/api/progress/${courseId}`);
//             setProgressData(updated);
//         } catch (e: any) { 
//             console.error("Progress Error:", e);
//             // Ignore error jika lesson sudah selesai sebelumnya
//             if(!e.message?.includes('already')) {
//                 // alert("Gagal koneksi ke server. Cek internet anda.");
//             }
//         }
//     };

//     const checkEmojiAnswer = () => {
//         // Hapus tag HTML dari jawaban kunci (karena dari text editor)
//         const correctAnswer = activeLesson.content?.replace(/<[^>]*>?/gm, '').trim(); 
        
//         if (!correctAnswer) {
//             // Auto correct jika tidak ada kunci
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

//     const isDone = (id: string) => progressData?.completedLessons?.includes(id);

//     // --- RENDERER ---
//     const renderContent = () => {
//         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
//         switch (activeLesson.type) {
//             case 'video_url': return <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
//             case 'embed': return <div className="aspect-[4/3] md:aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg relative"><iframe src={activeLesson.videoUrl || activeLesson.content} className="w-full h-full" title="Embedded Content" allowFullScreen /></div>;
//             case 'audio': return <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl text-white flex flex-col items-center justify-center min-h-[300px]"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse"><Mic size={48} /></div><h2 className="text-2xl font-bold mb-2 text-center">{activeLesson.title}</h2><p className="text-pink-100 text-sm mb-8">Dengarkan materi audio ini.</p><audio controls src={getImageUrl(activeLesson.fileUrl)} className="w-full max-w-lg rounded-full shadow-lg" /></div>;
            
//             // GAMES
//             case 'game_memory': return <GameMemory content={activeLesson.content} lessonId={activeLesson._id} onComplete={handleMarkComplete} />;
//             case 'game_scavenger': return <GameScavenger content={activeLesson.content} lessonId={activeLesson._id} onComplete={handleMarkComplete} />;
            
//             // GAME EMOJI
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
//                                         className={`w-full p-4 border-2 rounded-xl text-center font-bold text-lg outline-none transition-all ${isEmojiCorrect === false ? 'border-red-400 bg-red-50 text-red-600 shake' : isEmojiCorrect === true ? 'border-green-400 bg-green-50 text-green-600' : 'border-gray-200 focus:border-yellow-400'}`} 
//                                         placeholder="Ketik jawabanmu..."
//                                         value={emojiAnswer}
//                                         onChange={(e) => setEmojiAnswer(e.target.value)}
//                                         onKeyDown={(e) => e.key === 'Enter' && checkEmojiAnswer()}
//                                         disabled={isDone(activeLesson._id) || isEmojiCorrect === true}
//                                     />
//                                     {isEmojiCorrect === false && <p className="text-red-500 text-sm font-bold mt-2 animate-pulse">Salah, coba lagi!</p>}
//                                     {(isEmojiCorrect === true || isDone(activeLesson._id)) && <p className="text-green-600 text-sm font-bold mt-2 flex items-center justify-center gap-1"><CheckCircle size={16}/> Jawaban Benar!</p>}
//                                 </div>
//                             ))}
//                         </div>
//                         {!isDone(activeLesson._id) && (
//                             <div className="mt-8 text-center"><button onClick={checkEmojiAnswer} className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-yellow-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!emojiAnswer}>Kirim Jawaban</button></div>
//                         )}
//                     </div>
//                 );

//             case 'flashcard': 
//                 let cards = []; try { cards = JSON.parse(activeLesson.content || '[]'); } catch (e) { cards = []; }
//                 return <div className="space-y-6"><div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 mb-4"><Layers size={24}/><div><h3 className="font-bold">Mode Hafalan</h3><p className="text-xs">Klik kartu untuk membalik.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card:any, idx:number) => (<div key={idx} onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))} className="relative h-64 w-full cursor-pointer perspective-1000 group"><div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${flippedCards[idx] ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pertanyaan</span><p className="text-lg font-bold text-gray-800">{card.front}</p></div><div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180"><span className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-4">Jawaban</span><p className="text-lg font-bold">{card.back}</p></div></div></div>))}</div></div>;
//             case 'slide': return <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/></div>;
//             case 'image': return <div className="rounded-2xl overflow-hidden border shadow-lg bg-gray-900 flex items-center justify-center"><img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto max-h-[500px]"/></div>;
//             case 'download_doc': return <div className="bg-green-50 p-8 rounded-3xl border border-green-200 flex flex-col items-center justify-center gap-4 text-center"><div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={32}/></div><h2 className="text-xl font-bold text-green-900">{activeLesson.title}</h2><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2">Download Dokumen</a></div>;
//             case 'poll': return <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.pollQuestion}</h2><div className="space-y-3">{activeLesson.pollOptions?.map((opt:string, i:number) => <button key={i} className="w-full text-left p-4 bg-purple-50 border-2 border-purple-100 rounded-xl font-bold text-purple-900">{opt}</button>)}</div></div>;
//             case 'essay': case 'quiz': return <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2><div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6"><div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /></div><div className="border-t pt-6">{activeLesson.type === 'quiz' ? <Link href={`/courses/${courseId}/quiz/${activeLesson._id}`} className="block w-full text-center bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">Mulai Kuis</Link> : <button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-indigo-300 rounded-xl p-8 text-indigo-500 font-bold"><Paperclip className="mb-1"/> Upload Jawaban</button>}</div></div>;
//             default: return <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex flex-col gap-6"><h2 className="text-2xl font-black text-gray-800">{activeLesson.title}</h2><div className="prose prose-red max-w-none bg-white p-6 rounded-2xl border border-red-100"><div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} /></div></div>;
//         }
//     };

//     if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
//     const percent = Math.round(progressData?.percent || 0);

//     return (
//         <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
//             <div className={`fixed left-0 right-0 bottom-0 z-[9999] bg-white flex flex-col font-sans transition-all duration-500 ease-in-out shadow-2xl ${isFullScreen ? 'top-0' : 'top-[80px]'}`}>
                
//                 <header className="bg-[#B91C1C] text-white p-4 flex items-center justify-between shrink-0 shadow-md relative z-50">
                    
//                     <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] flex justify-center">
//                         <button 
//                             onClick={() => setIsFullScreen(!isFullScreen)} 
//                             className="w-16 h-6 bg-white border-x border-b border-white/50 rounded-b-xl shadow-lg flex items-center justify-center text-[#B91C1C] hover:bg-gray-100 hover:h-7 transition-all group"
//                             title={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
//                             aria-label={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}
//                         >
//                             {isFullScreen ? <ChevronDown size={20} className="group-hover:mt-1 transition-all font-bold"/> : <ChevronUp size={20} className="group-hover:-mt-1 transition-all font-bold"/>}
//                         </button>
//                     </div>

//                     <div className="flex items-center gap-4">
//                         <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali ke Kursus"><ArrowLeft size={20}/></Link>
//                         <div>
//                             <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1>
//                             <div className="flex items-center gap-2 mt-0.5">
//                                 <div className="w-24 h-1.5 bg-red-800 rounded-full overflow-hidden border border-red-700">
//                                     <div ref={progressBarRef} className="h-full bg-white rounded-full" role="progressbar" aria-label="Progres Belajar"></div>
//                                 </div>
//                                 <span className="text-[10px] font-bold text-red-100">{percent}% SELESAI</span>
//                             </div>
//                         </div>
//                     </div>
                    
//                     <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded bg-white text-[#B91C1C] flex items-center justify-center font-bold text-xs uppercase shadow-lg">{course?.organizer?.charAt(0)}</div>
//                         <button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu" aria-label="Buka Menu"><Menu size={18}/></button>
//                     </div>
//                 </header>

//                 <div className="flex flex-1 overflow-hidden relative">
//                     <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
//                         <div className="p-5 border-b bg-gray-50/50 flex justify-between items-center"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3><button onClick={() => setShowMobileMenu(false)} className="lg:hidden text-gray-400 hover:text-red-600" title="Tutup Menu" aria-label="Tutup Menu"><X size={18}/></button></div>
//                         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
//                             {course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
//                                 <div key={mod._id}>
//                                     <div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div>
//                                     <div className="space-y-1">
//                                         {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
//                                             <button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`} aria-label={`Pilih materi ${les.title}`}>
//                                                 {/* [FIX] GUNAKAN ICON SIDEBAR DARI FUNGSI getSidebarIcon */}
//                                                 {getSidebarIcon(les.type, isDone(les._id))}
//                                                 <div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div>
//                                             </button>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
//                     </aside>

//                     <main className="flex-1 relative flex flex-col min-w-0">
//                         <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar pb-32">
//                             <div className="max-w-4xl mx-auto">
//                                 <div className="mb-8 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">{renderContent()}</div>
//                                 {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && activeLesson?.content && !['flashcard', 'audio', 'embed', 'game_memory', 'game_scavenger', 'game_emoji'].includes(activeLesson.type) && (
//                                     <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"><div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} /></div>
//                                 )}
//                             </div>
//                         </div>
                        
//                         {/* [FIX] Footer lebih compact (p-3 md:p-4) */}
//                         <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 md:p-4 flex justify-between items-center z-20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
//                             <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
//                             {!isDone(activeLesson?._id) ? (
//                                 <button 
//                                     onClick={() => handleMarkComplete(activeLesson?._id)} 
//                                     // Disable tombol jika Game Emoji dan belum benar
//                                     disabled={activeLesson?.type === 'game_emoji' && !isEmojiCorrect}
//                                     className={`w-full md:w-auto px-6 py-2 rounded-xl font-black text-xs shadow-xl transition-all uppercase tracking-widest flex items-center justify-center gap-2 ${activeLesson?.type === 'game_emoji' && !isEmojiCorrect ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white shadow-red-200 active:scale-95'}`}
//                                 >
//                                     <CheckCircle size={16}/> {activeLesson?.type === 'game_emoji' ? 'Selesaikan Game' : 'Tandai Selesai'}
//                                 </button>
//                             ) : (
//                                 <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-6 py-2 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"><CheckCircle size={16}/> Materi Lulus</div>
//                             )}
//                         </div>
//                     </main>

//                     <button onClick={() => setShowChat(!showChat)} className="absolute right-6 bottom-28 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi"><MessageSquare size={24}/>{messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}</button>
//                     {showChat && (
//                         <div className="absolute right-6 bottom-28 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
//                             <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0"><div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div><button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat" aria-label="Tutup Chat"><X size={18}/></button></div>
//                             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">{messages.map((m, i) => (<div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}><span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span><div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div></div>))}<div ref={messagesEndRef} /></div>
//                             <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0"><input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} aria-label="Ketik pesan chat"/><button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button></form>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </Protected>
//     );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api, getImageUrl } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import Protected from '@/components/Protected';
import { 
    ArrowLeft, CheckCircle, PlayCircle, Lock, 
    MessageSquare, FileText, Send, Loader2, 
    HeadphonesIcon, Menu, X, BarChart2, Paperclip, 
    Mic, RotateCw, Layers, Globe, ChevronUp, ChevronDown, 
    Maximize2, Minimize2, Smile, Gamepad2, Camera, Video
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
    const [activeLesson, setActiveLesson] = useState<any>(null);
    const [progressData, setProgressData] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [chatMessage, setChatMessage] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(true);

    const [emojiAnswer, setEmojiAnswer] = useState('');
    const [isEmojiCorrect, setIsEmojiCorrect] = useState<boolean | null>(null);

    const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
    const progressBarRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // --- EFFECT: INITIAL LOAD ---
    useEffect(() => {
        if (!courseId || !user) return;
        if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
            loadData();
            return;
        }
        checkEnrollmentAndLoad();
    }, [courseId, user]);

    // --- EFFECT: PROGRESS BAR UI ---
    useEffect(() => {
        if (progressBarRef.current) {
            const percent = Math.round(progressData?.percent || 0);
            progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
            progressBarRef.current.style.width = `${percent}%`;
        }
    }, [progressData]);

    // --- EFFECT: AUTO SCROLL CHAT ---
    useEffect(() => {
        if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, showChat]);

    // --- [FIX] EFFECT: RESET GAME STATE JIKA STATUS BERUBAH ---
    useEffect(() => {
        // Reset kartu memori
        setFlippedCards({});

        // Cek apakah lesson ini sudah selesai menurut data terbaru
        const isCompleted = activeLesson && progressData?.completedLessons?.includes(activeLesson._id);

        if (!isCompleted) {
            // Jika BELUM selesai (atau baru di-reset), bersihkan input
            setEmojiAnswer('');
            setIsEmojiCorrect(null);
        } else {
            // Jika SUDAH selesai, set status benar agar UI hijau
            setIsEmojiCorrect(true);
        }
    }, [activeLesson, progressData]); // Dependency penting: progressData

    const checkEnrollmentAndLoad = async () => {
        try {
            setLoading(true);
            const statusRes = await api(`/api/courses/${courseId}/enrollment-status`);
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
                api(`/api/progress/${courseId}`),
                api(`/api/courses/${courseId}/messages`)
            ]);
            setProgressData(prog);
            setMessages(msg || []);
            const firstMod = cData.modules?.find((m: any) => m.isActive);
            const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
            if (firstLes) setActiveLesson(firstLes);
        } catch (e) {
            console.error("Gagal memuat data", e);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkComplete = async (lessonId: string) => {
        try {
            const res = await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
            // Update state lokal instan
            setProgressData((prev: any) => ({
                ...prev,
                completedLessons: res.completedLessons,
                percent: res.percent
            }));
        } catch (e: any) { 
            if (!e.message?.includes('already')) {
                // silent
            }
        }
    };

    const checkEmojiAnswer = () => {
        // Bersihkan HTML tag dari kunci jawaban
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

    const isDone = (id: string) => progressData?.completedLessons?.includes(id);

    const renderContent = () => {
        if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
        switch (activeLesson.type) {
            case 'video_url': return <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
            case 'embed': return <div className="aspect-[4/3] md:aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg relative"><iframe src={activeLesson.videoUrl || activeLesson.content} className="w-full h-full" title="Embedded Content" allowFullScreen /></div>;
            case 'audio': return <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl text-white flex flex-col items-center justify-center min-h-[300px]"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse"><Mic size={48} /></div><h2 className="text-2xl font-bold mb-2 text-center">{activeLesson.title}</h2><p className="text-pink-100 text-sm mb-8">Dengarkan materi audio ini.</p><audio controls src={getImageUrl(activeLesson.fileUrl)} className="w-full max-w-lg rounded-full shadow-lg" /></div>;
            
            case 'game_memory': return <GameMemory content={activeLesson.content} lessonId={activeLesson._id} onComplete={handleMarkComplete} />;
            case 'game_scavenger': return <GameScavenger content={activeLesson.content} lessonId={activeLesson._id} onComplete={handleMarkComplete} />;
            
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
                                            // Logic Styling berdasarkan State
                                            (isDone(activeLesson._id) || isEmojiCorrect) ? 'border-green-400 bg-green-50 text-green-600' :
                                            isEmojiCorrect === false ? 'border-red-400 bg-red-50 text-red-600 shake' : 
                                            'border-gray-200 focus:border-yellow-400'
                                        }`} 
                                        placeholder="Ketik jawabanmu..."
                                        value={emojiAnswer}
                                        onChange={(e) => setEmojiAnswer(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && checkEmojiAnswer()}
                                        // Disable jika sudah selesai ATAU jawaban benar
                                        disabled={isDone(activeLesson._id) || isEmojiCorrect === true}
                                    />
                                    {isEmojiCorrect === false && <p className="text-red-500 text-sm font-bold mt-2 animate-pulse">Salah, coba lagi!</p>}
                                    
                                    {/* Tampilkan pesan sukses jika progressData mengatakan selesai */}
                                    {(isDone(activeLesson._id) || isEmojiCorrect === true) && (
                                        <p className="text-green-600 text-sm font-bold mt-2 flex items-center justify-center gap-1">
                                            <CheckCircle size={16}/> Jawaban Benar!
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        {/* Tombol hanya muncul jika BELUM selesai */}
                        {!isDone(activeLesson._id) && !isEmojiCorrect && (
                            <div className="mt-8 text-center">
                                <button 
                                    onClick={checkEmojiAnswer} 
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-yellow-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" 
                                    disabled={!emojiAnswer}
                                >
                                    Kirim Jawaban
                                </button>
                            </div>
                        )}
                    </div>
                );

            case 'flashcard': let cards = []; try { cards = JSON.parse(activeLesson.content || '[]'); } catch (e) { cards = []; } return <div className="space-y-6"><div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3 text-orange-800 mb-4"><Layers size={24}/><div><h3 className="font-bold">Mode Hafalan</h3><p className="text-xs">Klik kartu untuk membalik.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card:any, idx:number) => (<div key={idx} onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))} className="relative h-64 w-full cursor-pointer perspective-1000 group"><div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-2xl ${flippedCards[idx] ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pertanyaan</span><p className="text-lg font-bold text-gray-800">{card.front}</p></div><div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180"><span className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-4">Jawaban</span><p className="text-lg font-bold">{card.back}</p></div></div></div>))}</div></div>;
            case 'slide': return <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/></div>;
            case 'image': return <div className="rounded-2xl overflow-hidden border shadow-lg bg-gray-900 flex items-center justify-center"><img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="max-w-full h-auto max-h-[500px]"/></div>;
            case 'download_doc': return <div className="bg-green-50 p-8 rounded-3xl border border-green-200 flex flex-col items-center justify-center gap-4 text-center"><div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><FileText size={32}/></div><h2 className="text-xl font-bold text-green-900">{activeLesson.title}</h2><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2">Download Dokumen</a></div>;
            case 'poll': return <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.pollQuestion}</h2><div className="space-y-3">{activeLesson.pollOptions?.map((opt:string, i:number) => <button key={i} className="w-full text-left p-4 bg-purple-50 border-2 border-purple-100 rounded-xl font-bold text-purple-900">{opt}</button>)}</div></div>;
            case 'essay': case 'quiz': return <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm"><h2 className="text-xl font-bold text-gray-900 mb-6">{activeLesson.title}</h2><div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6"><div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /></div><div className="border-t pt-6">{activeLesson.type === 'quiz' ? <Link href={`/courses/${courseId}/quiz/${activeLesson._id}`} className="block w-full text-center bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">Mulai Kuis</Link> : <button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-indigo-300 rounded-xl p-8 text-indigo-500 font-bold"><Paperclip className="mb-1"/> Upload Jawaban</button>}</div></div>;
            default: return <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex flex-col gap-6"><h2 className="text-2xl font-black text-gray-800">{activeLesson.title}</h2><div className="prose prose-red max-w-none bg-white p-6 rounded-2xl border border-red-100"><div dangerouslySetInnerHTML={{ __html: activeLesson.content || '' }} /></div></div>;
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
    const percent = Math.round(progressData?.percent || 0);

    return (
        <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
            <div className={`fixed left-0 right-0 bottom-0 z-[9999] bg-white flex flex-col font-sans transition-all duration-500 ease-in-out shadow-2xl ${isFullScreen ? 'top-0' : 'top-[80px]'}`}>
                <header className="bg-[#B91C1C] text-white p-4 flex items-center justify-between shrink-0 shadow-md relative z-50">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60] flex justify-center"><button onClick={() => setIsFullScreen(!isFullScreen)} className="w-16 h-6 bg-white border-x border-b border-white/50 rounded-b-xl shadow-lg flex items-center justify-center text-[#B91C1C] hover:bg-gray-100 hover:h-7 transition-all group" title={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"} aria-label={isFullScreen ? "Tampilkan Menu Utama Web" : "Mode Layar Penuh"}>{isFullScreen ? <ChevronDown size={20} className="group-hover:mt-1 transition-all font-bold"/> : <ChevronUp size={20} className="group-hover:-mt-1 transition-all font-bold"/>}</button></div>
                    <div className="flex items-center gap-4"><Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali ke Kursus"><ArrowLeft size={20}/></Link><div><h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1><div className="flex items-center gap-2 mt-0.5"><div className="w-24 h-1.5 bg-red-800 rounded-full overflow-hidden border border-red-700"><div ref={progressBarRef} className="h-full bg-white rounded-full" role="progressbar" aria-label="Progres Belajar"></div></div><span className="text-[10px] font-bold text-red-100">{percent}% SELESAI</span></div></div></div>
                    <div className="flex items-center gap-3"><div className="w-8 h-8 rounded bg-white text-[#B91C1C] flex items-center justify-center font-bold text-xs uppercase shadow-lg">{course?.organizer?.charAt(0)}</div><button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu" aria-label="Buka Menu"><Menu size={18}/></button></div>
                </header>

                <div className="flex flex-1 overflow-hidden relative">
                    <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                        <div className="p-5 border-b bg-gray-50/50 flex justify-between items-center"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3><button onClick={() => setShowMobileMenu(false)} className="lg:hidden text-gray-400 hover:text-red-600" title="Tutup Menu" aria-label="Tutup Menu"><X size={18}/></button></div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">{course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (<div key={mod._id}><div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div><div className="space-y-1">{mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (<button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`} aria-label={`Pilih materi ${les.title}`}>{getSidebarIcon(les.type, isDone(les._id))}<div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div></button>))}</div></div>))}</div>
                        <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
                    </aside>

                    <main className="flex-1 relative flex flex-col min-w-0">
                        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar pb-32">
                            <div className="max-w-4xl mx-auto">
                                <div className="mb-8 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">{renderContent()}</div>
                                {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && activeLesson?.content && !['flashcard', 'audio', 'embed', 'game_memory', 'game_scavenger', 'game_emoji'].includes(activeLesson.type) && (<div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"><div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} /></div>)}
                            </div>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 md:p-4 flex justify-between items-center z-20 shadow-[0_-5px_30px_rgba(0,0,0,0.05)]">
                            <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
                            {!isDone(activeLesson?._id) ? (<button onClick={() => handleMarkComplete(activeLesson?._id)} disabled={activeLesson?.type === 'game_emoji' && !isEmojiCorrect} className={`w-full md:w-auto px-6 py-2 rounded-xl font-black text-xs shadow-xl transition-all uppercase tracking-widest flex items-center justify-center gap-2 ${activeLesson?.type === 'game_emoji' && !isEmojiCorrect ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white shadow-red-200 active:scale-95'}`}><CheckCircle size={16}/> {activeLesson?.type === 'game_emoji' ? 'Selesaikan Game' : 'Tandai Selesai'}</button>) : (<div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-6 py-2 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"><CheckCircle size={16}/> Materi Lulus</div>)}
                        </div>
                    </main>

                    <button onClick={() => setShowChat(!showChat)} className="absolute right-6 bottom-28 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi"><MessageSquare size={24}/>{messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}</button>
                    {showChat && (<div className="absolute right-6 bottom-28 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden"><div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0"><div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div><button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat" aria-label="Tutup Chat"><X size={18}/></button></div><div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">{messages.map((m, i) => (<div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}><span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span><div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div></div>))}<div ref={messagesEndRef} /></div><form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0"><input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} aria-label="Ketik pesan chat"/><button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button></form></div>)}
                </div>
            </div>
        </Protected>
    );
}
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api, getImageUrl } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider'; // Import Auth
import Protected from '@/components/Protected';
import { 
    ArrowLeft, CheckCircle, PlayCircle, Lock, 
    MessageSquare, FileText, Send, Loader2, 
    HelpCircle, HeadphonesIcon, Monitor, ExternalLink, 
    Menu, X, BarChart2, Paperclip 
} from 'lucide-react';
import Link from 'next/link';

export default function CoursePlayPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth(); // [FIX TS: Tambahkan ini agar variabel user dikenali]
    const courseId = params?.courseId as string;

    // --- STATE ---
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeLesson, setActiveLesson] = useState<any>(null);
    const [progressData, setProgressData] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [chatMessage, setChatMessage] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // --- REFS ---
    const progressBarRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (courseId) loadData();
    }, [courseId, user]);

    // FIX ARIA ERROR: Update DOM Manual
    useEffect(() => {
        if (progressBarRef.current) {
            const percent = Math.round(progressData?.percent || 0);
            progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
            progressBarRef.current.style.width = `${percent}%`;
        }
    }, [progressData]);

    useEffect(() => {
        if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, showChat]);

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
            await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
            const updated = await api(`/api/progress/${courseId}`);
            setProgressData(updated);
        } catch (e) { alert("Gagal update progres"); }
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

    // --- RENDERER KONTEN ---
    const renderContent = () => {
        if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;

        switch (activeLesson.type) {
            case 'video_url':
                return (
                    <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                        <iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/>
                    </div>
                );
            case 'slide':
                return (
                    <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border shadow-lg">
                        <iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide Presentation"/>
                    </div>
                );
            case 'pdf':
                return (
                    <div className="aspect-[3/4] md:aspect-video bg-gray-50 rounded-2xl overflow-hidden border shadow-lg">
                        <iframe src={`${getImageUrl(activeLesson.fileUrl)}#toolbar=0`} className="w-full h-full" title="Dokumen"/>
                    </div>
                );
            case 'image':
                return (
                    <div className="rounded-2xl overflow-hidden border shadow-lg">
                        <img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="w-full h-auto"/>
                    </div>
                );
            case 'poll':
                return (
                    <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-full"><BarChart2 size={32}/></div>
                            <h2 className="text-xl font-bold text-gray-900">{activeLesson.pollQuestion || activeLesson.title}</h2>
                        </div>
                        <div className="space-y-3">
                            {activeLesson.pollOptions?.map((opt: string, i: number) => (
                                <button key={i} className="w-full text-left p-4 bg-purple-50 border-2 border-purple-100 rounded-xl hover:border-purple-300 transition-all font-bold text-purple-900">
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'essay': 
            case 'quiz':
                return (
                    <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full"><FileText size={32}/></div>
                            <h2 className="text-xl font-bold text-gray-900">{activeLesson.title}</h2>
                        </div>
                        <div className="prose prose-indigo max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6">
                            <div dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
                        </div>
                        <div className="border-t pt-6">
                            <button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-indigo-300 rounded-xl p-8 text-indigo-500 hover:bg-indigo-50 transition-colors">
                                <Paperclip className="mb-1"/> <span className="font-bold">Upload Jawaban Tugas</span>
                            </button>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex items-center gap-6 mb-6">
                        <div className="bg-red-600 text-white p-4 rounded-2xl shadow-lg"><FileText size={32}/></div>
                        <div><h2 className="text-2xl font-black text-gray-800">{activeLesson.title}</h2><p className="text-red-600 font-bold text-xs uppercase tracking-widest mt-1">{activeLesson.jp} JP</p></div>
                    </div>
                );
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;

    const percent = Math.round(progressData?.percent || 0);

    return (
        <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
            <div className="flex flex-col h-screen bg-white font-sans overflow-hidden">
                {/* --- HEADER --- */}
                <header className="bg-gray-900 text-white p-4 flex items-center justify-between shrink-0 shadow-md z-40">
                    <div className="flex items-center gap-4">
                        {/* [FIX AXE] Tambahkan title */}
                        <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali"><ArrowLeft size={20}/></Link>
                        <div>
                            <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course?.title}</h1>
                            <div className="flex items-center gap-2 mt-0.5">
                                <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                    {/* [FIX AXE] Tambahkan aria-label */}
                                    <div ref={progressBarRef} className="h-full bg-green-500 rounded-full" role="progressbar" aria-label="Progres Belajar"></div>
                                </div>
                                <span className="text-[10px] font-bold text-green-400">{percent}% SELESAI</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center font-bold text-xs uppercase shadow-lg border border-white/20">{course?.organizer?.charAt(0)}</div>
                         {/* [FIX AXE] Tambahkan title */}
                         <button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu"><Menu size={18}/></button>
                    </div>
                </header>

                <div className="flex flex-1 overflow-hidden relative">
                    {/* --- SIDEBAR KIRI --- */}
                    <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none`}>
                        <div className="p-5 border-b bg-gray-50/50"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3></div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                            {course?.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
                                <div key={mod._id}>
                                    <div className="flex items-center gap-2 mb-3 px-2">
                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                        <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4>
                                    </div>
                                    <div className="space-y-1">
                                        {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
                                            <button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`}>
                                                {isDone(les._id) ? <CheckCircle className="text-green-500 shrink-0" size={18}/> : <PlayCircle className="text-gray-300 shrink-0" size={18}/>}
                                                <div className="overflow-hidden">
                                                    <p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p>
                                                    <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')} • {les.jp || 0} JP</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t bg-gray-50">
                            <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg shadow-indigo-200">
                                <HeadphonesIcon size={16}/> Konsultasi Pengajar
                            </button>
                        </div>
                    </aside>

                    {/* --- KONTEN TENGAH --- */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar relative">
                        <div className="max-w-4xl mx-auto pb-32">
                            <div className="mb-8 transition-all duration-500 ease-in-out">{renderContent()}</div>
                            {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && (
                                <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                    <div dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} />
                                </div>
                            )}
                        </div>
                        <div className="fixed bottom-0 left-0 lg:left-80 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 md:p-6 flex justify-between items-center z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                            <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
                            {!isDone(activeLesson?._id) ? (
                                <button onClick={() => handleMarkComplete(activeLesson?._id)} className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-black text-xs shadow-xl shadow-red-200 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"><CheckCircle size={18}/> Tandai Selesai</button>
                            ) : (
                                <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-8 py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"><CheckCircle size={18}/> Materi Lulus</div>
                            )}
                        </div>
                    </main>

                    {/* --- CHAT FLYING & POPUP --- */}
                    {/* [FIX AXE] Tambahkan title */}
                    <button onClick={() => setShowChat(!showChat)} className="absolute bottom-24 right-6 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Ruang Diskusi">
                        <MessageSquare size={24}/>
                        {messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}
                    </button>

                    {showChat && (
                        <div className="absolute bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
                            <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0">
                                <div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div>
                                {/* [FIX AXE] Tambahkan title */}
                                <button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup Chat"><X size={18}/></button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">
                                {messages.map((m, i) => (
                                    // [FIX TS] Pastikan user ada sebelum akses _id
                                    <div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'items-end' : 'items-start'}`}>
                                        <span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span>
                                        <div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm leading-relaxed ${(m.sender?._id === (user as any)?._id || m.sender?.email === user?.email) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>
                                            {m.message}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0">
                                <input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-red-800" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} />
                                {/* [FIX AXE] Tambahkan title */}
                                <button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md hover:bg-red-900 transition-all" title="Kirim"><Send size={16}/></button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </Protected>
    );
}
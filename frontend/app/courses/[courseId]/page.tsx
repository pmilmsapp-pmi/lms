'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, getImageUrl, apiUpload } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import QuizPlayer from '@/components/QuizPlayer';
import CourseGroupChat from '@/components/CourseGroupChat'; 
import { 
    Users, Clock, MessageCircle, ChevronLeft, ChevronRight, Menu, Send, X,
    FileText, PlayCircle, CheckCircle, UploadCloud, Calendar, Download, 
    Image as ImageIcon, Video, School, MonitorPlay, BookOpen, Play, AlertCircle, Award
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
    if (!dateString) return '-';
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
                            <button type="button" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button>
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

                            try {
                                const resPart = await api(`/api/courses/${courseId}/participants`);
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
            if (remaining <= 0) clearInterval(interval);
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
                    <button onClick={handleStartLesson} className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95">
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
              {showRegisterModal && (
                  <CourseRegistrationModal 
                    courseId={courseId} 
                    courseTitle={course.title} 
                    programType={course.programType} // Kirim tipe program (training/course)
                    user={user} 
                    onClose={() => setShowRegisterModal(false)} 
                    onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil! Menunggu Verifikasi."); window.location.reload(); }} 
                  />
              )}
              
              {/* HERO SECTION */}
              <div className="relative bg-gray-900 text-white">
                  <div className="absolute inset-0 bg-black/60 z-0"></div>
                  {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" alt="" />}
                  
                  <div className="max-w-6xl mx-auto px-6 py-24 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="lg:col-span-2 space-y-6">
                          <div className="flex items-center gap-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${course.programType === 'training' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                                  {course.programType === 'training' ? 'Diklat / Pelatihan' : 'Kursus Mandiri'}
                              </span>
                              {course.category && <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">{course.category}</span>}
                          </div>
                          
                          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{course.title}</h1>
                          
                          <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300 pt-2">
                              <div className="flex items-center gap-2"><Users size={18}/> {courseFacilitators.length} Fasilitator</div>
                              <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
                              <div className="flex items-center gap-2"><Clock size={18}/> {course.programType === 'training' ? 'Terjadwal' : 'Fleksibel'}</div>
                              {course.certificateConfig && <div className="flex items-center gap-2 text-yellow-400"><Award size={18}/> Sertifikat Tersedia</div>}
                          </div>
                      </div>

                      {/* CARD PENDAFTARAN */}
                      <div className="lg:col-span-1">
                          <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-100 sticky top-24">
                              <div className="text-center mb-8">
                                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Biaya Investasi</p>
                                  <p className="text-4xl font-black text-green-600">
                                      {course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}
                                  </p>
                              </div>

                              {enrollmentStatus === 'pending' ? (
                                  <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-center border border-yellow-200">
                                      <h3 className="font-bold mb-1">Menunggu Verifikasi</h3>
                                      <p className="text-xs">Pendaftaran Anda sedang diproses admin.</p>
                                  </div>
                              ) : (
                                  <button 
                                    onClick={() => setShowRegisterModal(true)} 
                                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-lg"
                                    title="Daftar Sekarang"
                                    aria-label="Daftar Sekarang"
                                  >
                                      📝 Daftar Sekarang
                                  </button>
                              )}
                              
                              <p className="text-xs text-center text-gray-400 mt-4">
                                  *Akses selamanya setelah terdaftar
                              </p>
                          </div>
                      </div>
                  </div>
              </div>

              {/* DETAIL CONTENT */}
              <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-12">
                      {/* DESKRIPSI */}
                      <section>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="text-red-600"/> Tentang Program Ini</h3>
                          <div className="prose max-w-none text-gray-600 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm" dangerouslySetInnerHTML={{ __html: course.description || "<p>Belum ada deskripsi.</p>" }} />
                      </section>

                      {/* KURIKULUM */}
                      <section>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="text-red-600"/> Kurikulum & Materi</h3>
                          <div className="space-y-4">
                              {course.modules?.map((mod: any, idx: number) => (
                                  <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                      <div className="bg-gray-50 px-6 py-4 border-b font-bold text-gray-800 flex justify-between">
                                          <span>Modul {idx + 1}: {mod.title}</span>
                                          <span className="text-xs font-normal text-gray-500 bg-white px-2 py-1 rounded border">{mod.lessons?.length || 0} Materi</span>
                                      </div>
                                      <div className="divide-y">
                                          {mod.lessons?.map((les: any, lIdx: number) => (
                                              <div key={lIdx} className="px-6 py-3 flex items-center gap-3 text-sm text-gray-600">
                                                  {les.type === 'video_url' ? <PlayCircle size={16} className="text-blue-500"/> : <FileText size={16} className="text-gray-400"/>}
                                                  {les.title}
                                                  {les.jp > 0 && <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{les.jp} JP</span>}
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </section>
                  </div>

                  {/* SIDEBAR INFO */}
                  <div className="space-y-8">
                      {/* FASILITATOR */}
                      <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Users className="text-red-600"/> Tim Fasilitator</h4>
                          <div className="space-y-4">
                              {courseFacilitators.map((fac: any) => (
                                  <div key={fac._id} className="flex items-center gap-3">
                                      {fac.avatarUrl ? (
                                          <img src={getImageUrl(fac.avatarUrl)} className="w-10 h-10 rounded-full object-cover border" alt={fac.name}/>
                                      ) : (
                                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">{fac.name.charAt(0)}</div>
                                      )}
                                      <div>
                                          <p className="font-bold text-sm text-gray-800">{fac.name}</p>
                                          <p className="text-xs text-gray-500">Fasilitator</p>
                                      </div>
                                  </div>
                              ))}
                              {courseFacilitators.length === 0 && <p className="text-sm text-gray-500 italic">Belum ditentukan.</p>}
                          </div>
                      </section>

                      {/* INFO TAMBAHAN */}
                      <section className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                          <h4 className="font-bold text-indigo-900 mb-4">Fasilitas Program</h4>
                          <ul className="space-y-3 text-sm text-indigo-800">
                              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Akses Materi Seumur Hidup</li>
                              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Grup Diskusi Eksklusif</li>
                              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Sertifikat Kelulusan</li>
                              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Konsultasi Fasilitator</li>
                          </ul>
                      </section>
                  </div>
              </div>
          </div>
        );
    }
  
    // TAMPILAN DASHBOARD BELAJAR (JIKA SUDAH DAFTAR & AKTIF)
    const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;
  
    return (
      <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
        <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
          <div className="p-5 border-b bg-white">
              <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" title="Kembali ke Katalog" aria-label="Kembali"><span>←</span> KEMBALI KE KATALOG</Link>
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
                              <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`} title={`Buka Materi ${les.title}`} aria-label={`Buka Materi ${les.title}`}>
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
              <button type="button" onClick={()=>setIsSidebarOpen(!isSidebarOpen)} aria-label="Menu" title="Menu"><Menu/></button>
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
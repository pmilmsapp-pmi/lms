// // // // // // // // // 'use client';

// // // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // // import Link from 'next/link';
// // // // // // // // // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // // // // // // import CourseGroupChat from '@/components/CourseGroupChat'; 
// // // // // // // // // import { 
// // // // // // // // //     Users, Clock, MessageCircle, ChevronLeft, ChevronRight, Menu, Send, X,
// // // // // // // // //     FileText, PlayCircle, CheckCircle, UploadCloud, Calendar, Download, 
// // // // // // // // //     Image as ImageIcon, Video, School, MonitorPlay, BookOpen, Play, AlertCircle, Award
// // // // // // // // // } from 'lucide-react';
// // // // // // // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';
// // // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // // import 'react-quill/dist/quill.snow.css';

// // // // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // // // //     ssr: false, 
// // // // // // // // //     loading: () => <div className="h-24 bg-gray-50 animate-pulse rounded-lg border border-gray-200"></div> 
// // // // // // // // // });

// // // // // // // // // // --- HELPER FUNCTIONS ---
// // // // // // // // // const getFacilitatorName = (activeFacilitatorId: any, facilitatorsList: any[]) => {
// // // // // // // // //     if (!activeFacilitatorId) return '-';
// // // // // // // // //     if (typeof activeFacilitatorId === 'object' && activeFacilitatorId.name) return activeFacilitatorId.name;
// // // // // // // // //     const found = facilitatorsList.find(f => (f._id === activeFacilitatorId) || (f.id === activeFacilitatorId));
// // // // // // // // //     return found ? found.name : 'Fasilitator';
// // // // // // // // // };

// // // // // // // // // const formatDate = (dateString: string) => {
// // // // // // // // //     if (!dateString) return '-';
// // // // // // // // //     return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // // // // // // // };

// // // // // // // // // // --- CHAT MODAL (Personal) ---
// // // // // // // // // function ChatWithFacilitatorModal({ facilitators, onClose }: any) {
// // // // // // // // //     const { user } = useAuth();
// // // // // // // // //     const [selectedFacilitator, setSelectedFacilitator] = useState<any>(facilitators[0] || null);
// // // // // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // // // // //     const [message, setMessage] = useState('');
// // // // // // // // //     const [sending, setSending] = useState(false);
// // // // // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // // // // // //     useEffect(() => {
// // // // // // // // //         if (selectedFacilitator?._id) {
// // // // // // // // //             loadHistory();
// // // // // // // // //             const interval = setInterval(loadHistory, 3000);
// // // // // // // // //             return () => clearInterval(interval);
// // // // // // // // //         }
// // // // // // // // //     }, [selectedFacilitator]);

// // // // // // // // //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// // // // // // // // //     const loadHistory = async () => {
// // // // // // // // //         try {
// // // // // // // // //             const res = await api(`/api/chat/${selectedFacilitator._id}?t=${Date.now()}`);
// // // // // // // // //             setMessages(res.messages || []);
// // // // // // // // //         } catch (e) { console.error(e); }
// // // // // // // // //     };

// // // // // // // // //     const handleSend = async (e: React.FormEvent) => {
// // // // // // // // //         e.preventDefault();
// // // // // // // // //         if (!message.trim() || !selectedFacilitator) return;
// // // // // // // // //         setSending(true);
// // // // // // // // //         try {
// // // // // // // // //             await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message } });
// // // // // // // // //             setMessage('');
// // // // // // // // //             loadHistory();
// // // // // // // // //         } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); }
// // // // // // // // //     };

// // // // // // // // //     return (
// // // // // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
// // // // // // // // //             <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]" role="dialog" aria-modal="true" aria-label="Chat Personal">
// // // // // // // // //                 <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
// // // // // // // // //                     <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18} /> Hubungi Pengajar</h3>
// // // // // // // // //                     <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20} /></button>
// // // // // // // // //                 </div>
// // // // // // // // //                 {!selectedFacilitator ? (
// // // // // // // // //                     <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center text-gray-500">Tidak ada fasilitator.</div>
// // // // // // // // //                 ) : (
// // // // // // // // //                     <>
// // // // // // // // //                         {facilitators.length > 1 && (
// // // // // // // // //                             <div className="p-3 bg-gray-50 border-b flex gap-2 overflow-x-auto">
// // // // // // // // //                                 {facilitators.map((f:any) => (
// // // // // // // // //                                     <button type="button" key={f._id} onClick={()=>setSelectedFacilitator(f)} className={`px-3 py-1 text-xs rounded-full border ${selectedFacilitator._id===f._id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300'}`} title={`Pilih ${f.name}`}>{f.name}</button>
// // // // // // // // //                                 ))}
// // // // // // // // //                             </div>
// // // // // // // // //                         )}
// // // // // // // // //                         <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// // // // // // // // //                             {messages.map((msg: any, idx: number) => {
// // // // // // // // //                                 const isMe = msg.sender === 'me' || msg.sender?._id === user?.id;
// // // // // // // // //                                 return (
// // // // // // // // //                                     <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
// // // // // // // // //                                         <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
// // // // // // // // //                                             <p>{msg.message}</p>
// // // // // // // // //                                         </div>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 );
// // // // // // // // //                             })}
// // // // // // // // //                             <div ref={messagesEndRef} />
// // // // // // // // //                         </div>
// // // // // // // // //                         <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
// // // // // // // // //                             <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus title="Input Pesan" aria-label="Ketik pesan" />
// // // // // // // // //                             <button type="button" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button>
// // // // // // // // //                         </form>
// // // // // // // // //                     </>
// // // // // // // // //                 )}
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // }

// // // // // // // // // // --- MAIN PAGE COMPONENT ---
// // // // // // // // // export default function StudentCoursePlayPage() {
// // // // // // // // //     const router = useRouter();
// // // // // // // // //     const params = useParams();
// // // // // // // // //     const { user } = useAuth();
// // // // // // // // //     const { courseId } = params as { courseId: string };
  
// // // // // // // // //     const [course, setCourse] = useState<any>(null);
// // // // // // // // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // // // // //     const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // // // // // // // //     const [progressPercent, setProgressPercent] = useState(0);
// // // // // // // // //     const [courseFacilitators, setCourseFacilitators] = useState<any[]>([]); 
// // // // // // // // //     const [courseParticipants, setCourseParticipants] = useState<any[]>([]); 
    
// // // // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // // // //     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // // // // // // //     const [isEnrolled, setIsEnrolled] = useState(false);
// // // // // // // // //     const [enrollmentStatus, setEnrollmentStatus] = useState<string>(''); 
// // // // // // // // //     const [showRegisterModal, setShowRegisterModal] = useState(false);
// // // // // // // // //     const [showPersonalChat, setShowPersonalChat] = useState(false); 
  
// // // // // // // // //     const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// // // // // // // // //     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// // // // // // // // //     const [pollSelected, setPollSelected] = useState<number | null>(null);
// // // // // // // // //     const [isSubmitting, setIsSubmitting] = useState(false);

// // // // // // // // //     // STATE TIMER & START
// // // // // // // // //     const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
// // // // // // // // //     const [isStarted, setIsStarted] = useState(false); 
  
// // // // // // // // //     // 1. INIT DATA
// // // // // // // // //     useEffect(() => {
// // // // // // // // //         const initData = async () => {
// // // // // // // // //           try {
// // // // // // // // //             setLoading(true);
// // // // // // // // //             const resCourse = await api(`/api/courses/${courseId}`);
// // // // // // // // //             const courseData = resCourse.course || resCourse;
// // // // // // // // //             setCourse(courseData);
// // // // // // // // //             setCourseFacilitators(courseData.facilitatorIds || []); 
    
// // // // // // // // //             if (user) {
// // // // // // // // //                 try {
// // // // // // // // //                     const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// // // // // // // // //                     setIsEnrolled(enrollRes.isEnrolled);
                    
// // // // // // // // //                     if (enrollRes.isEnrolled) {
// // // // // // // // //                         setEnrollmentStatus(enrollRes.status || 'pending'); 
// // // // // // // // //                         if (enrollRes.status === 'active' || enrollRes.status === 'approved') {
// // // // // // // // //                             const resProgress = await api(`/api/progress/${courseId}`);
// // // // // // // // //                             setCompletedLessonIds(resProgress.completedLessons || []);

// // // // // // // // //                             try {
// // // // // // // // //                                 const resPart = await api(`/api/courses/${courseId}/participants`);
// // // // // // // // //                                 const userList = resPart.participants?.map((p: any) => p.user) || [];
// // // // // // // // //                                 setCourseParticipants(userList);
// // // // // // // // //                             } catch (e) { console.error("Gagal load peserta chat", e); }
// // // // // // // // //                         }
// // // // // // // // //                     }
// // // // // // // // //                 } catch (e) { console.error("Enroll check failed", e); }
// // // // // // // // //             }
// // // // // // // // //             if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
// // // // // // // // //           } catch (e) { console.error("Init failed", e); } finally { setLoading(false); }
// // // // // // // // //         };
// // // // // // // // //         if (courseId) initData();
// // // // // // // // //     }, [courseId, user]);
    
// // // // // // // // //     // 2. LOGIKA TIMER & TOMBOL MULAI
// // // // // // // // //     useEffect(() => {
// // // // // // // // //         setTimerSeconds(null);
// // // // // // // // //         if (activeLesson) {
// // // // // // // // //             if (!activeLesson.quizDuration || activeLesson.quizDuration <= 0 || completedLessonIds.includes(activeLesson._id)) {
// // // // // // // // //                 setIsStarted(true);
// // // // // // // // //                 return;
// // // // // // // // //             }
// // // // // // // // //             const storageKey = `timer_${user?.id}_${activeLesson._id}`;
// // // // // // // // //             const storedEndTime = localStorage.getItem(storageKey);
// // // // // // // // //             if (storedEndTime) {
// // // // // // // // //                 const endTime = parseInt(storedEndTime, 10);
// // // // // // // // //                 if (endTime > Date.now()) {
// // // // // // // // //                     setIsStarted(true); 
// // // // // // // // //                     startTicker(endTime); 
// // // // // // // // //                 } else {
// // // // // // // // //                     localStorage.removeItem(storageKey);
// // // // // // // // //                     setIsStarted(true); 
// // // // // // // // //                     setTimerSeconds(0);
// // // // // // // // //                 }
// // // // // // // // //             } else {
// // // // // // // // //                 setIsStarted(false);
// // // // // // // // //             }
// // // // // // // // //         }
// // // // // // // // //     }, [activeLesson, completedLessonIds, user]);

// // // // // // // // //     const startTicker = (endTime: number) => {
// // // // // // // // //         const update = () => {
// // // // // // // // //             const now = Date.now();
// // // // // // // // //             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
// // // // // // // // //             setTimerSeconds(remaining);
// // // // // // // // //         };
// // // // // // // // //         update(); 
// // // // // // // // //         const interval = setInterval(() => {
// // // // // // // // //             const now = Date.now();
// // // // // // // // //             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
// // // // // // // // //             setTimerSeconds(remaining);
// // // // // // // // //             if (remaining <= 0) clearInterval(interval);
// // // // // // // // //         }, 1000);
// // // // // // // // //         return interval;
// // // // // // // // //     };

// // // // // // // // //     const handleStartLesson = () => {
// // // // // // // // //         setIsStarted(true);
// // // // // // // // //         if (activeLesson.quizDuration > 0) {
// // // // // // // // //             const endTime = Date.now() + activeLesson.quizDuration * 60 * 1000;
// // // // // // // // //             localStorage.setItem(`timer_${user?.id}_${activeLesson._id}`, endTime.toString());
// // // // // // // // //             startTicker(endTime);
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     const formatTimer = (seconds: number) => {
// // // // // // // // //         const m = Math.floor(seconds / 60);
// // // // // // // // //         const s = seconds % 60;
// // // // // // // // //         return `${m}:${s < 10 ? '0' : ''}${s}`;
// // // // // // // // //     };

// // // // // // // // //     useEffect(() => {
// // // // // // // // //         if (course && !loading) {
// // // // // // // // //             let total = 0; let completed = 0;
// // // // // // // // //             course.modules?.forEach((m: any) => { 
// // // // // // // // //                 if(m.isActive) {
// // // // // // // // //                     m.lessons?.forEach((l: any) => { 
// // // // // // // // //                         if(l.isActive) { 
// // // // // // // // //                             total++; 
// // // // // // // // //                             if (completedLessonIds.includes(l._id)) completed++; 
// // // // // // // // //                         } 
// // // // // // // // //                     });
// // // // // // // // //                 }
// // // // // // // // //             });
// // // // // // // // //             const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
// // // // // // // // //             setProgressPercent(percent);
// // // // // // // // //         }
// // // // // // // // //     }, [completedLessonIds, course, loading]);
    
// // // // // // // // //     useEffect(() => {
// // // // // // // // //           setUploadedFile(null);
// // // // // // // // //           setPollSelected(null);
// // // // // // // // //           setIsSubmitting(false);
// // // // // // // // //           if (activeLesson?.type === 'essay' && activeLesson.questions) {
// // // // // // // // //               setEssayAnswers(new Array(activeLesson.questions.length).fill(''));
// // // // // // // // //           } else {
// // // // // // // // //               setEssayAnswers([]);
// // // // // // // // //           }
// // // // // // // // //     }, [activeLesson]);

// // // // // // // // //     const handleEssayChange = (index: number, value: string) => {
// // // // // // // // //         const newAnswers = [...essayAnswers];
// // // // // // // // //         newAnswers[index] = value;
// // // // // // // // //         setEssayAnswers(newAnswers);
// // // // // // // // //     };

// // // // // // // // //     const markLessonAsComplete = async (lessonId: string, extraData: any = {}) => {
// // // // // // // // //         try { 
// // // // // // // // //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId, ...extraData } }); 
// // // // // // // // //             if (!completedLessonIds.includes(lessonId)) {
// // // // // // // // //                 setCompletedLessonIds(prev => [...prev, lessonId]); 
// // // // // // // // //             }
// // // // // // // // //             if(user) localStorage.removeItem(`timer_${user.id}_${lessonId}`);
// // // // // // // // //         } catch(e) { console.error("Save progress failed", e); throw e; }
// // // // // // // // //     };
    
// // // // // // // // //     const handleNextLesson = () => {
// // // // // // // // //         const allLessons: any[] = [];
// // // // // // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // // // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // // // //         if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // // // // // // // //         else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // // // // // // // //     };
    
// // // // // // // // //     const handlePrevLesson = () => {
// // // // // // // // //         const allLessons: any[] = [];
// // // // // // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // // // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // // // //         if (currIdx > 0) { setActiveLesson(allLessons[currIdx - 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }
// // // // // // // // //     };

// // // // // // // // //     const handleManualComplete = async () => { 
// // // // // // // // //         await markLessonAsComplete(activeLesson._id); 
// // // // // // // // //         handleNextLesson(); 
// // // // // // // // //     };
    
// // // // // // // // //     const handleQuizCompleted = async (result: { score: number, attempts: number }) => { 
// // // // // // // // //         try {
// // // // // // // // //             await markLessonAsComplete(activeLesson._id, { 
// // // // // // // // //                 score: result.score, 
// // // // // // // // //                 attempts: result.attempts 
// // // // // // // // //             });
// // // // // // // // //             if (!completedLessonIds.includes(activeLesson._id)) {
// // // // // // // // //                 setCompletedLessonIds(prev => [...prev, activeLesson._id]); 
// // // // // // // // //             }
// // // // // // // // //         } catch (e) { console.error("Gagal simpan skor kuis", e); }
// // // // // // // // //     };
    
// // // // // // // // //     const handleSubmitTask = async () => {
// // // // // // // // //         setIsSubmitting(true);
// // // // // // // // //         try {
// // // // // // // // //             if (activeLesson.type === 'essay') {
// // // // // // // // //                 if (essayAnswers.some(ans => ans.trim() === '')) throw new Error("Mohon jawab semua pertanyaan.");
// // // // // // // // //                 await api(`/api/progress/${courseId}/submit-essay`, { 
// // // // // // // // //                     method: 'POST', 
// // // // // // // // //                     body: { lessonId: activeLesson._id, answers: essayAnswers } 
// // // // // // // // //                 });
// // // // // // // // //             } else if (activeLesson.type === 'upload_doc' || activeLesson.type === 'image') {
// // // // // // // // //                 if (!uploadedFile) throw new Error("Pilih file terlebih dahulu.");
// // // // // // // // //                 const fd = new FormData();
// // // // // // // // //                 fd.append('file', uploadedFile);
// // // // // // // // //                 const uploadRes = await apiUpload('/api/upload', fd);
// // // // // // // // //                 const fileUrl = uploadRes.url || uploadRes.file?.url || uploadRes.imageUrl;
                
// // // // // // // // //                 await api(`/api/progress/${courseId}/submit-task`, { 
// // // // // // // // //                     method: 'POST', 
// // // // // // // // //                     body: { lessonId: activeLesson._id, fileUrl, fileName: uploadedFile.name } 
// // // // // // // // //                 });
// // // // // // // // //             } else if (activeLesson.type === 'poll') {
// // // // // // // // //                 if (pollSelected === null) throw new Error("Pilih salah satu opsi.");
// // // // // // // // //                 const answerText = activeLesson.pollOptions[pollSelected];
// // // // // // // // //                 await markLessonAsComplete(activeLesson._id, { pollAnswer: answerText });
// // // // // // // // //             } else {
// // // // // // // // //                 await markLessonAsComplete(activeLesson._id);
// // // // // // // // //             }

// // // // // // // // //             if (!completedLessonIds.includes(activeLesson._id)) {
// // // // // // // // //                 setCompletedLessonIds(prev => [...prev, activeLesson._id]);
// // // // // // // // //             }
// // // // // // // // //             alert("Berhasil dikirim!");
// // // // // // // // //             handleNextLesson();
// // // // // // // // //         } catch (e: any) { alert("Gagal mengirim: " + e.message); } finally { setIsSubmitting(false); }
// // // // // // // // //     };

// // // // // // // // //     const renderContentHeader = (title: string) => (
// // // // // // // // //         <div className="mb-6 border-b border-gray-100 pb-4">
// // // // // // // // //             <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// // // // // // // // //                 <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 flex items-center gap-1">
// // // // // // // // //                     {activeLesson?.type?.replace(/_/g, ' ') || 'MATERI'}
// // // // // // // // //                 </span>
// // // // // // // // //             </div>
// // // // // // // // //             <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
// // // // // // // // //                 <h1 className="text-gray-900 font-bold text-2xl flex-1 leading-tight">{title}</h1>
// // // // // // // // //                 <div className="flex-shrink-0 flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
// // // // // // // // //                     {activeLesson.quizDuration > 0 && (
// // // // // // // // //                         <div className={`flex items-center gap-1 px-2 py-0.5 rounded border ${timerSeconds !== null && timerSeconds < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
// // // // // // // // //                             <Clock size={14} /> 
// // // // // // // // //                             <span className="font-bold text-sm">
// // // // // // // // //                                 {timerSeconds !== null 
// // // // // // // // //                                     ? `Sisa: ${formatTimer(timerSeconds)}` 
// // // // // // // // //                                     : `${activeLesson.quizDuration} Menit`
// // // // // // // // //                                 }
// // // // // // // // //                             </span>
// // // // // // // // //                         </div>
// // // // // // // // //                     )}
// // // // // // // // //                     <div className="flex items-center gap-1"><Users size={12} className="text-indigo-500"/> <span>{getFacilitatorName(activeLesson.facilitatorId, courseFacilitators)}</span></div>
// // // // // // // // //                     {activeLesson.jp > 0 && <div className="flex items-center gap-1 border-l pl-3"><Clock size={12} className="text-indigo-500"/> <span>{activeLesson.jp} JP</span></div>}
// // // // // // // // //                     {(activeLesson.scheduleDate) && <div className="flex items-center gap-1 border-l pl-3"><Calendar size={12} className="text-indigo-500"/> <span>{formatDate(activeLesson.scheduleDate)}</span></div>}
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //     );

// // // // // // // // //     const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
// // // // // // // // //         if (activeLesson.quizDuration > 0 && !isStarted && !completedLessonIds.includes(activeLesson._id)) {
// // // // // // // // //             return (
// // // // // // // // //                 <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-200 text-center min-h-[300px] animate-in fade-in zoom-in duration-300">
// // // // // // // // //                     <div className="bg-indigo-100 p-5 rounded-full mb-6 text-indigo-600 shadow-inner">
// // // // // // // // //                         <Clock size={48} />
// // // // // // // // //                     </div>
// // // // // // // // //                     <h2 className="text-2xl font-bold text-gray-800 mb-3">Materi dengan Batas Waktu</h2>
// // // // // // // // //                     <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
// // // // // // // // //                         Materi <strong>"{activeLesson.title}"</strong> memiliki batas waktu pengerjaan selama <span className="font-bold text-gray-800">{activeLesson.quizDuration} Menit</span>. 
// // // // // // // // //                         <br/><span className="text-xs text-red-500 mt-2 block">*Waktu akan berjalan otomatis setelah Anda menekan tombol di bawah.</span>
// // // // // // // // //                     </p>
// // // // // // // // //                     <button onClick={handleStartLesson} className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95">
// // // // // // // // //                         <Play size={20} fill="currentColor" /> Mulai Kerjakan Sekarang
// // // // // // // // //                     </button>
// // // // // // // // //                 </div>
// // // // // // // // //             );
// // // // // // // // //         }
        
// // // // // // // // //         if (timerSeconds !== null && timerSeconds <= 0 && !completedLessonIds.includes(activeLesson._id)) {
// // // // // // // // //              return (
// // // // // // // // //                 <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-xl shadow-sm border border-red-200 text-center min-h-[300px]">
// // // // // // // // //                     <div className="bg-red-100 p-4 rounded-full mb-4 text-red-600">
// // // // // // // // //                         <AlertCircle size={40} />
// // // // // // // // //                     </div>
// // // // // // // // //                     <h2 className="text-xl font-bold text-red-800 mb-2">Waktu Habis!</h2>
// // // // // // // // //                     <p className="text-red-600 mb-6">Waktu pengerjaan untuk materi ini telah berakhir.</p>
// // // // // // // // //                     <button onClick={handleNextLesson} className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">Lanjut Materi Berikutnya</button>
// // // // // // // // //                 </div>
// // // // // // // // //              );
// // // // // // // // //         }

// // // // // // // // //         return <>{children}</>;
// // // // // // // // //     };

// // // // // // // // //     const renderContent = () => {
// // // // // // // // //         if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping.</div>;
        
// // // // // // // // //         const content = (
// // // // // // // // //             <>
// // // // // // // // //                 {activeLesson.type === 'quiz' && (
// // // // // // // // //                     <QuizPlayer 
// // // // // // // // //                         quizId={activeLesson._id} 
// // // // // // // // //                         courseId={courseId} 
// // // // // // // // //                         lessonData={activeLesson}
// // // // // // // // //                         onComplete={handleQuizCompleted} 
// // // // // // // // //                     />
// // // // // // // // //                 )}
                
// // // // // // // // //                 {activeLesson.type === 'image' && (
// // // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // //                         <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
// // // // // // // // //                             <img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="w-full h-auto object-contain" />
// // // // // // // // //                         </div>
// // // // // // // // //                         {activeLesson.content && <div className="prose max-w-none mt-6 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />}
// // // // // // // // //                     </div>
// // // // // // // // //                 )}

// // // // // // // // //                 {(activeLesson.type === 'slide' || activeLesson.type === 'download_doc') && (
// // // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // //                         <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center mb-6">
// // // // // // // // //                             <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4"><FileText size={32} /></div>
// // // // // // // // //                             <h3 className="text-lg font-bold text-gray-800 mb-2">{activeLesson.title}</h3>
// // // // // // // // //                             <p className="text-sm text-gray-500 mb-6">Dokumen Materi Pembelajaran.</p>
// // // // // // // // //                             <a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-transform active:scale-95" aria-label="Download File">
// // // // // // // // //                                 <Download size={18} /> Download Materi
// // // // // // // // //                             </a>
// // // // // // // // //                         </div>
// // // // // // // // //                         {activeLesson.fileUrl && activeLesson.fileUrl.endsWith('.pdf') && (
// // // // // // // // //                             <div className="mt-8 border rounded-xl overflow-hidden h-[800px] shadow-sm">
// // // // // // // // //                                 <iframe src={getImageUrl(activeLesson.fileUrl)} className="w-full h-full" title="Preview"></iframe>
// // // // // // // // //                             </div>
// // // // // // // // //                         )}
// // // // // // // // //                     </div>
// // // // // // // // //                 )}

// // // // // // // // //                 {activeLesson.type === 'video_url' && (
// // // // // // // // //                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // //                         <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
// // // // // // // // //                             <iframe 
// // // // // // // // //                                 src={activeLesson.videoUrl?.includes('youtu') ? `https://www.youtube.com/embed/${activeLesson.videoUrl.split('/').pop().replace('watch?v=', '')}` : activeLesson.videoUrl} 
// // // // // // // // //                                 className="w-full h-full" 
// // // // // // // // //                                 allowFullScreen 
// // // // // // // // //                                 title={`Video ${activeLesson.title}`} 
// // // // // // // // //                             />
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 )}

// // // // // // // // //                 {activeLesson.type === 'virtual_class' && (
// // // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // //                         <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
// // // // // // // // //                             <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"><Video size={40}/></div>
// // // // // // // // //                             <h3 className="text-xl font-bold text-gray-900 mb-2">Kelas Virtual (Zoom/Meet)</h3>
// // // // // // // // //                             <p className="text-gray-600 mb-6">Silakan bergabung ke pertemuan virtual melalui tombol di bawah ini.</p>
                            
// // // // // // // // //                             {(activeLesson.meetingLink || activeLesson.content) ? (
// // // // // // // // //                                 <div className="space-y-3">
// // // // // // // // //                                     <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg">
// // // // // // // // //                                         <Video size={20}/> Gabung Meeting
// // // // // // // // //                                     </a>
// // // // // // // // //                                     <div className="text-xs text-gray-500">
// // // // // // // // //                                         Link: <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" className="text-purple-600 underline">{activeLesson.meetingLink || activeLesson.content}</a>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 </div>
// // // // // // // // //                             ) : (
// // // // // // // // //                                 <button disabled className="inline-flex items-center gap-2 bg-gray-400 text-white px-8 py-3 rounded-full font-bold cursor-not-allowed">
// // // // // // // // //                                     <Video size={20}/> Link Belum Tersedia
// // // // // // // // //                                 </button>
// // // // // // // // //                             )}
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 )}
                
// // // // // // // // //                 {activeLesson.type === 'google_classroom' && (
// // // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // //                         <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
// // // // // // // // //                             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border"><School size={40} className="text-green-600"/></div>
// // // // // // // // //                             <h3 className="text-xl font-bold text-gray-900 mb-2">Google Classroom</h3>
// // // // // // // // //                             <p className="text-gray-600 mb-2">Materi ini terhubung dengan Google Classroom.</p>
// // // // // // // // //                             {activeLesson.classroomData ? (
// // // // // // // // //                                 <div className="mt-4">
// // // // // // // // //                                     <p className="font-bold text-lg">{activeLesson.classroomData.name}</p>
// // // // // // // // //                                     <p className="text-sm text-gray-500 mb-6">Kode Kelas: <span className="font-mono bg-white px-2 py-1 border rounded">{activeLesson.classroomData.enrollmentCode || '-'}</span></p>
// // // // // // // // //                                     <a href={activeLesson.classroomData.alternateLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 shadow-lg">Buka Google Classroom ↗</a>
// // // // // // // // //                                 </div>
// // // // // // // // //                             ) : <p className="text-red-500 italic">Data kelas tidak ditemukan.</p>}
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 )}

// // // // // // // // //                 {['essay', 'upload_doc', 'image', 'poll', 'lesson'].includes(activeLesson.type) && (
// // // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6">
// // // // // // // // //                         {activeLesson.content && activeLesson.type !== 'image' && (
// // // // // // // // //                             <div className="prose max-w-none mb-8 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
// // // // // // // // //                         )}
                        
// // // // // // // // //                         {activeLesson.type === 'essay' && (
// // // // // // // // //                             <div className="space-y-6">
// // // // // // // // //                                 {activeLesson.questions?.map((q:any,i:number)=>(
// // // // // // // // //                                     <div key={i} className="border p-4 rounded-lg bg-gray-50">
// // // // // // // // //                                         <div className="font-bold mb-2 text-sm text-gray-700 flex gap-2">
// // // // // // // // //                                             <span>{i+1}.</span>
// // // // // // // // //                                             <div dangerouslySetInnerHTML={{ __html: q.question }} />
// // // // // // // // //                                         </div>
// // // // // // // // //                                         <div className="bg-white">
// // // // // // // // //                                             <ReactQuill theme="snow" value={essayAnswers[i]||''} onChange={(v)=>handleEssayChange(i,v)} placeholder="Tulis jawaban..."/>
// // // // // // // // //                                         </div>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 ))}
// // // // // // // // //                                 <button onClick={handleSubmitTask} disabled={isSubmitting} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold w-full hover:bg-indigo-700 transition-colors" title="Kirim Jawaban" aria-label="Kirim Jawaban">{isSubmitting?'Mengirim...':'Kirim Jawaban'}</button>
// // // // // // // // //                             </div>
// // // // // // // // //                         )}
                        
// // // // // // // // //                         {(activeLesson.type === 'upload_doc' || activeLesson.type === 'image') && (
// // // // // // // // //                             <div className="border-2 border-dashed p-8 text-center rounded-xl bg-gray-50 border-indigo-200">
// // // // // // // // //                                 <UploadCloud className="mx-auto text-indigo-400 mb-2" size={32}/>
// // // // // // // // //                                 <p className="text-sm text-gray-500 mb-4">Upload tugas Anda di sini (PDF/DOCX/JPG)</p>
// // // // // // // // //                                 <input type="file" title="Pilih file tugas" aria-label="Pilih file tugas" onChange={(e)=>setUploadedFile(e.target.files?.[0]||null)} className="mb-4 text-sm block mx-auto text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
// // // // // // // // //                                 <button onClick={handleSubmitTask} disabled={!uploadedFile||isSubmitting} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold block mx-auto hover:bg-indigo-700 transition-colors" title="Upload Tugas" aria-label="Upload Tugas">{isSubmitting?'Mengupload...':'Upload Tugas'}</button>
// // // // // // // // //                             </div>
// // // // // // // // //                         )}
                        
// // // // // // // // //                         {activeLesson.type === 'poll' && (
// // // // // // // // //                             <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
// // // // // // // // //                                 <h3 className="font-bold text-lg mb-4">{activeLesson.pollQuestion || "Polling"}</h3>
// // // // // // // // //                                 <div className="space-y-3 max-w-sm mx-auto">
// // // // // // // // //                                     {activeLesson.pollOptions?.map((opt:string, idx:number) => (
// // // // // // // // //                                         <button key={idx} onClick={()=>setPollSelected(idx)} className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${pollSelected===idx ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-100 border-gray-300'}`} title={`Pilih ${opt}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>
// // // // // // // // //                                     ))}
// // // // // // // // //                                 </div>
// // // // // // // // //                                 <button onClick={handleSubmitTask} disabled={pollSelected===null||isSubmitting} className="mt-6 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition-colors" title="Kirim Polling" aria-label="Kirim Polling">Kirim Polling</button>
// // // // // // // // //                             </div>
// // // // // // // // //                         )}
// // // // // // // // //                     </div>
// // // // // // // // //                 )}
// // // // // // // // //             </>
// // // // // // // // //         );

// // // // // // // // //         return (
// // // // // // // // //             <div>
// // // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // // //                 <ContentWrapper>
// // // // // // // // //                     {content}
// // // // // // // // //                 </ContentWrapper>
// // // // // // // // //             </div>
// // // // // // // // //         );
// // // // // // // // //     };
  
// // // // // // // // //     if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // // // // // // //     if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;
  
// // // // // // // // //     if (!isEnrolled || enrollmentStatus === 'pending') {
// // // // // // // // //         return (
// // // // // // // // //           <div className="min-h-screen bg-gray-50 pb-20">
// // // // // // // // //               {showRegisterModal && (
// // // // // // // // //                   <CourseRegistrationModal 
// // // // // // // // //                     courseId={courseId} 
// // // // // // // // //                     courseTitle={course.title} 
// // // // // // // // //                     programType={course.programType} // Kirim tipe program (training/course)
// // // // // // // // //                     user={user} 
// // // // // // // // //                     onClose={() => setShowRegisterModal(false)} 
// // // // // // // // //                     onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil! Menunggu Verifikasi."); window.location.reload(); }} 
// // // // // // // // //                   />
// // // // // // // // //               )}
              
// // // // // // // // //               {/* HERO SECTION */}
// // // // // // // // //               <div className="relative bg-gray-900 text-white">
// // // // // // // // //                   <div className="absolute inset-0 bg-black/60 z-0"></div>
// // // // // // // // //                   {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" alt="" />}
                  
// // // // // // // // //                   <div className="max-w-6xl mx-auto px-6 py-24 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
// // // // // // // // //                       <div className="lg:col-span-2 space-y-6">
// // // // // // // // //                           <div className="flex items-center gap-3">
// // // // // // // // //                               <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${course.programType === 'training' ? 'bg-orange-500' : 'bg-blue-500'}`}>
// // // // // // // // //                                   {course.programType === 'training' ? 'Diklat / Pelatihan' : 'Kursus Mandiri'}
// // // // // // // // //                               </span>
// // // // // // // // //                               {course.category && <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">{course.category}</span>}
// // // // // // // // //                           </div>
                          
// // // // // // // // //                           <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{course.title}</h1>
                          
// // // // // // // // //                           <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300 pt-2">
// // // // // // // // //                               <div className="flex items-center gap-2"><Users size={18}/> {courseFacilitators.length} Fasilitator</div>
// // // // // // // // //                               <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
// // // // // // // // //                               <div className="flex items-center gap-2"><Clock size={18}/> {course.programType === 'training' ? 'Terjadwal' : 'Fleksibel'}</div>
// // // // // // // // //                               {course.certificateConfig && <div className="flex items-center gap-2 text-yellow-400"><Award size={18}/> Sertifikat Tersedia</div>}
// // // // // // // // //                           </div>
// // // // // // // // //                       </div>

// // // // // // // // //                       {/* CARD PENDAFTARAN */}
// // // // // // // // //                       <div className="lg:col-span-1">
// // // // // // // // //                           <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-100 sticky top-24">
// // // // // // // // //                               <div className="text-center mb-8">
// // // // // // // // //                                   <p className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Biaya Investasi</p>
// // // // // // // // //                                   <p className="text-4xl font-black text-green-600">
// // // // // // // // //                                       {course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}
// // // // // // // // //                                   </p>
// // // // // // // // //                               </div>

// // // // // // // // //                               {enrollmentStatus === 'pending' ? (
// // // // // // // // //                                   <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-center border border-yellow-200">
// // // // // // // // //                                       <h3 className="font-bold mb-1">Menunggu Verifikasi</h3>
// // // // // // // // //                                       <p className="text-xs">Pendaftaran Anda sedang diproses admin.</p>
// // // // // // // // //                                   </div>
// // // // // // // // //                               ) : (
// // // // // // // // //                                   <button 
// // // // // // // // //                                     onClick={() => setShowRegisterModal(true)} 
// // // // // // // // //                                     className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-lg"
// // // // // // // // //                                     title="Daftar Sekarang"
// // // // // // // // //                                     aria-label="Daftar Sekarang"
// // // // // // // // //                                   >
// // // // // // // // //                                       📝 Daftar Sekarang
// // // // // // // // //                                   </button>
// // // // // // // // //                               )}
                              
// // // // // // // // //                               <p className="text-xs text-center text-gray-400 mt-4">
// // // // // // // // //                                   *Akses selamanya setelah terdaftar
// // // // // // // // //                               </p>
// // // // // // // // //                           </div>
// // // // // // // // //                       </div>
// // // // // // // // //                   </div>
// // // // // // // // //               </div>

// // // // // // // // //               {/* DETAIL CONTENT */}
// // // // // // // // //               <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
// // // // // // // // //                   <div className="lg:col-span-2 space-y-12">
// // // // // // // // //                       {/* DESKRIPSI */}
// // // // // // // // //                       <section>
// // // // // // // // //                           <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="text-red-600"/> Tentang Program Ini</h3>
// // // // // // // // //                           <div className="prose max-w-none text-gray-600 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm" dangerouslySetInnerHTML={{ __html: course.description || "<p>Belum ada deskripsi.</p>" }} />
// // // // // // // // //                       </section>

// // // // // // // // //                       {/* KURIKULUM */}
// // // // // // // // //                       <section>
// // // // // // // // //                           <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="text-red-600"/> Kurikulum & Materi</h3>
// // // // // // // // //                           <div className="space-y-4">
// // // // // // // // //                               {course.modules?.map((mod: any, idx: number) => (
// // // // // // // // //                                   <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
// // // // // // // // //                                       <div className="bg-gray-50 px-6 py-4 border-b font-bold text-gray-800 flex justify-between">
// // // // // // // // //                                           <span>Modul {idx + 1}: {mod.title}</span>
// // // // // // // // //                                           <span className="text-xs font-normal text-gray-500 bg-white px-2 py-1 rounded border">{mod.lessons?.length || 0} Materi</span>
// // // // // // // // //                                       </div>
// // // // // // // // //                                       <div className="divide-y">
// // // // // // // // //                                           {mod.lessons?.map((les: any, lIdx: number) => (
// // // // // // // // //                                               <div key={lIdx} className="px-6 py-3 flex items-center gap-3 text-sm text-gray-600">
// // // // // // // // // //                                                   {les.type === 'video_url' ? <PlayCircle size={16} className="text-blue-500"/> : <FileText size={16} className="text-gray-400"/>}
// // // // // // // // // //                                                   {les.title}
// // // // // // // // // //                                                   {les.jp > 0 && <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{les.jp} JP</span>}
// // // // // // // // // //                                               </div>
// // // // // // // // // //                                           ))}
// // // // // // // // // //                                       </div>
// // // // // // // // // //                                   </div>
// // // // // // // // // //                               ))}
// // // // // // // // // //                           </div>
// // // // // // // // // //                       </section>
// // // // // // // // // //                   </div>

// // // // // // // // // //                   {/* SIDEBAR INFO */}
// // // // // // // // // //                   <div className="space-y-8">
// // // // // // // // // //                       {/* FASILITATOR */}
// // // // // // // // // //                       <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
// // // // // // // // // //                           <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Users className="text-red-600"/> Tim Fasilitator</h4>
// // // // // // // // // //                           <div className="space-y-4">
// // // // // // // // // //                               {courseFacilitators.map((fac: any) => (
// // // // // // // // // //                                   <div key={fac._id} className="flex items-center gap-3">
// // // // // // // // // //                                       {fac.avatarUrl ? (
// // // // // // // // // //                                           <img src={getImageUrl(fac.avatarUrl)} className="w-10 h-10 rounded-full object-cover border" alt={fac.name}/>
// // // // // // // // // //                                       ) : (
// // // // // // // // // //                                           <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">{fac.name.charAt(0)}</div>
// // // // // // // // // //                                       )}
// // // // // // // // // //                                       <div>
// // // // // // // // // //                                           <p className="font-bold text-sm text-gray-800">{fac.name}</p>
// // // // // // // // // //                                           <p className="text-xs text-gray-500">Fasilitator</p>
// // // // // // // // // //                                       </div>
// // // // // // // // // //                                   </div>
// // // // // // // // // //                               ))}
// // // // // // // // // //                               {courseFacilitators.length === 0 && <p className="text-sm text-gray-500 italic">Belum ditentukan.</p>}
// // // // // // // // // //                           </div>
// // // // // // // // // //                       </section>

// // // // // // // // // //                       {/* INFO TAMBAHAN */}
// // // // // // // // // //                       <section className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
// // // // // // // // // //                           <h4 className="font-bold text-indigo-900 mb-4">Fasilitas Program</h4>
// // // // // // // // // //                           <ul className="space-y-3 text-sm text-indigo-800">
// // // // // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Akses Materi Seumur Hidup</li>
// // // // // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Grup Diskusi Eksklusif</li>
// // // // // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Sertifikat Kelulusan</li>
// // // // // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Konsultasi Fasilitator</li>
// // // // // // // // // //                           </ul>
// // // // // // // // // //                       </section>
// // // // // // // // // //                   </div>
// // // // // // // // // //               </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         );
// // // // // // // // // //     }
  
// // // // // // // // // //     // TAMPILAN DASHBOARD BELAJAR (JIKA SUDAH DAFTAR & AKTIF)
// // // // // // // // // //     const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;
  
// // // // // // // // // //     return (
// // // // // // // // // //       <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // // // // // // // // //         <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
// // // // // // // // // //           <div className="p-5 border-b bg-white">
// // // // // // // // // //               <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" title="Kembali ke Katalog" aria-label="Kembali"><span>←</span> KEMBALI KE KATALOG</Link>
// // // // // // // // // //               <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
// // // // // // // // // //               <div className="space-y-2">
// // // // // // // // // //                   <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{safePercent}%</span></div>
// // // // // // // // // //                   <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: `${safePercent}%`}}></div></div>
// // // // // // // // // //               </div>
// // // // // // // // // //               <button onClick={() => setShowPersonalChat(true)} className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50" title="Hubungi Pengajar" aria-label="Hubungi Pengajar">
// // // // // // // // // //                   <MessageCircle size={16}/> Hubungi Pengajar
// // // // // // // // // //               </button>
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
// // // // // // // // // //               {course.modules?.map((mod:any, i:number)=>(
// // // // // // // // // //                   <div key={mod._id}>
// // // // // // // // // //                       <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
// // // // // // // // // //                       <div className="space-y-1">
// // // // // // // // // //                           {mod.lessons?.map((les:any) => (
// // // // // // // // // //                               <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`} title={`Buka Materi ${les.title}`} aria-label={`Buka Materi ${les.title}`}>
// // // // // // // // // //                                   {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
// // // // // // // // // //                                   {les.title}
// // // // // // // // // //                               </button>
// // // // // // // // // //                           ))}
// // // // // // // // // //                       </div>
// // // // // // // // // //                   </div>
// // // // // // // // // //               ))}
// // // // // // // // // //           </div>
// // // // // // // // // //         </aside>
  
// // // // // // // // // //         <main className="flex-1 flex flex-col relative h-full overflow-hidden bg-gray-50">
// // // // // // // // // //           <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
// // // // // // // // // //               <button type="button" onClick={()=>setIsSidebarOpen(!isSidebarOpen)} aria-label="Menu" title="Menu"><Menu/></button>
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
// // // // // // // // // //               {renderContent()}
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className="fixed bottom-8 right-8 flex gap-3 z-30">
// // // // // // // // // //               <button type="button" onClick={handlePrevLesson} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105" title="Materi Sebelumnya" aria-label="Materi Sebelumnya"><ChevronLeft/></button>
// // // // // // // // // //               <button type="button" onClick={handleManualComplete} className="h-12 px-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 font-bold hover:scale-105" title="Lanjut Materi" aria-label="Lanjut Materi"><span>Lanjut</span><ChevronRight/></button>
// // // // // // // // // //           </div>
// // // // // // // // // //         </main>
        
// // // // // // // // // //         {showPersonalChat && <ChatWithFacilitatorModal facilitators={courseFacilitators} onClose={() => setShowPersonalChat(false)} />}
  
// // // // // // // // // //         {user && (
// // // // // // // // // //           <CourseGroupChat 
// // // // // // // // // //               courseId={courseId} 
// // // // // // // // // //               currentUser={user} 
// // // // // // // // // //               participants={courseParticipants} 
// // // // // // // // // //               facilitators={courseFacilitators} 
// // // // // // // // // //               isFloating={true} 
// // // // // // // // // //           />
// // // // // // // // // //         )}
// // // // // // // // // //       </div>
// // // // // // // // // //     );
// // // // // // // // // // }
// // // // // // // // // 'use client';

// // // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // // import Link from 'next/link';
// // // // // // // // // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // // // // // // import CourseGroupChat from '@/components/CourseGroupChat'; 
// // // // // // // // // import { 
// // // // // // // // //     Users, Clock, MessageCircle, ChevronLeft, ChevronRight, Menu, Send, X,
// // // // // // // // //     FileText, PlayCircle, CheckCircle, UploadCloud, Calendar, Download, 
// // // // // // // // //     Image as ImageIcon, Video, School, MonitorPlay, BookOpen, Play, AlertCircle, Award, FileCheck 
// // // // // // // // // } from 'lucide-react';
// // // // // // // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';
// // // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // // import 'react-quill/dist/quill.snow.css';

// // // // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // // // //     ssr: false, 
// // // // // // // // //     loading: () => <div className="h-24 bg-gray-50 animate-pulse rounded-lg border border-gray-200"></div> 
// // // // // // // // // });

// // // // // // // // // // --- HELPER FUNCTIONS ---
// // // // // // // // // const getFacilitatorName = (activeFacilitatorId: any, facilitatorsList: any[]) => {
// // // // // // // // //     if (!activeFacilitatorId) return '-';
// // // // // // // // //     if (typeof activeFacilitatorId === 'object' && activeFacilitatorId.name) return activeFacilitatorId.name;
// // // // // // // // //     const found = facilitatorsList.find(f => (f._id === activeFacilitatorId) || (f.id === activeFacilitatorId));
// // // // // // // // //     return found ? found.name : 'Fasilitator';
// // // // // // // // // };

// // // // // // // // // // const formatDate = (dateString: string) => {
// // // // // // // // // //     if (!dateString) return '-';
// // // // // // // // // //     return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // // // // // // // // };

// // // // // // // // // // // --- CHAT MODAL (Personal) ---
// // // // // // // // // // function ChatWithFacilitatorModal({ facilitators, onClose }: any) {
// // // // // // // // // //     const { user } = useAuth();
// // // // // // // // // //     const [selectedFacilitator, setSelectedFacilitator] = useState<any>(facilitators[0] || null);
// // // // // // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // // // // // //     const [message, setMessage] = useState('');
// // // // // // // // // //     const [sending, setSending] = useState(false);
// // // // // // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         if (selectedFacilitator?._id) {
// // // // // // // // // //             loadHistory();
// // // // // // // // // //             const interval = setInterval(loadHistory, 3000);
// // // // // // // // // //             return () => clearInterval(interval);
// // // // // // // // // //         }
// // // // // // // // // //     }, [selectedFacilitator]);

// // // // // // // // // //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// // // // // // // // // //     const loadHistory = async () => {
// // // // // // // // // //         try {
// // // // // // // // // //             const res = await api(`/api/chat/${selectedFacilitator._id}?t=${Date.now()}`);
// // // // // // // // // //             setMessages(res.messages || []);
// // // // // // // // // //         } catch (e) { console.error(e); }
// // // // // // // // // //     };

// // // // // // // // // //     const handleSend = async (e: React.FormEvent) => {
// // // // // // // // // //         e.preventDefault();
// // // // // // // // // //         if (!message.trim() || !selectedFacilitator) return;
// // // // // // // // // //         setSending(true);
// // // // // // // // // //         try {
// // // // // // // // // //             await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message } });
// // // // // // // // // //             setMessage('');
// // // // // // // // // //             loadHistory();
// // // // // // // // // //         } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); }
// // // // // // // // // //     };

// // // // // // // // // //     return (
// // // // // // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
// // // // // // // // // //             <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]" role="dialog" aria-modal="true" aria-label="Chat Personal">
// // // // // // // // // //                 <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
// // // // // // // // // //                     <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18} /> Hubungi Pengajar</h3>
// // // // // // // // // //                     <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20} /></button>
// // // // // // // // // //                 </div>
// // // // // // // // // //                 {!selectedFacilitator ? (
// // // // // // // // // //                     <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center text-gray-500">Tidak ada fasilitator.</div>
// // // // // // // // // //                 ) : (
// // // // // // // // // //                     <>
// // // // // // // // // //                         {facilitators.length > 1 && (
// // // // // // // // // //                             <div className="p-3 bg-gray-50 border-b flex gap-2 overflow-x-auto">
// // // // // // // // // //                                 {facilitators.map((f:any) => (
// // // // // // // // // //                                     <button type="button" key={f._id} onClick={()=>setSelectedFacilitator(f)} className={`px-3 py-1 text-xs rounded-full border ${selectedFacilitator._id===f._id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300'}`} title={`Pilih ${f.name}`}>{f.name}</button>
// // // // // // // // // //                                 ))}
// // // // // // // // // //                             </div>
// // // // // // // // // //                         )}
// // // // // // // // // //                         <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// // // // // // // // // //                             {messages.map((msg: any, idx: number) => {
// // // // // // // // // //                                 const isMe = msg.sender === 'me' || msg.sender?._id === user?.id;
// // // // // // // // // //                                 return (
// // // // // // // // // //                                     <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
// // // // // // // // // //                                         <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
// // // // // // // // // //                                             <p>{msg.message}</p>
// // // // // // // // // //                                         </div>
// // // // // // // // // //                                     </div>
// // // // // // // // // //                                 );
// // // // // // // // // //                             })}
// // // // // // // // // //                             <div ref={messagesEndRef} />
// // // // // // // // // //                         </div>
// // // // // // // // // //                         <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
// // // // // // // // // //                             <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus title="Input Pesan" aria-label="Ketik pesan" />
// // // // // // // // // //                             <button type="button" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button>
// // // // // // // // // //                         </form>
// // // // // // // // // //                     </>
// // // // // // // // // //                 )}
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>
// // // // // // // // // //     );
// // // // // // // // // // }

// // // // // // // // // // // --- MAIN PAGE COMPONENT ---
// // // // // // // // // // export default function StudentCoursePlayPage() {
// // // // // // // // // //     const router = useRouter();
// // // // // // // // // //     const params = useParams();
// // // // // // // // // //     const { user } = useAuth();
// // // // // // // // // //     const { courseId } = params as { courseId: string };
  
// // // // // // // // // //     const [course, setCourse] = useState<any>(null);
// // // // // // // // // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // // // // // //     const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // // // // // // // // //     const [progressPercent, setProgressPercent] = useState(0);
// // // // // // // // // //     const [courseFacilitators, setCourseFacilitators] = useState<any[]>([]); 
// // // // // // // // // //     const [courseParticipants, setCourseParticipants] = useState<any[]>([]); 
    
// // // // // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // // // // //     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // // // // // // // //     const [isEnrolled, setIsEnrolled] = useState(false);
// // // // // // // // // //     const [enrollmentStatus, setEnrollmentStatus] = useState<string>(''); 
// // // // // // // // // //     const [showRegisterModal, setShowRegisterModal] = useState(false);
// // // // // // // // // //     const [showPersonalChat, setShowPersonalChat] = useState(false); 
  
// // // // // // // // // //     const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// // // // // // // // // //     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// // // // // // // // // //     const [pollSelected, setPollSelected] = useState<number | null>(null);
// // // // // // // // // //     const [isSubmitting, setIsSubmitting] = useState(false);
    
// // // // // // // // // //     // [NEW] State untuk Revisi (memunculkan form upload ulang)
// // // // // // // // // //     const [isReuploading, setIsReuploading] = useState(false);

// // // // // // // // // //     // STATE TIMER & START
// // // // // // // // // //     const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
// // // // // // // // // //     const [isStarted, setIsStarted] = useState(false); 
  
// // // // // // // // // //     // 1. INIT DATA
// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         const initData = async () => {
// // // // // // // // // //           try {
// // // // // // // // // //             setLoading(true);
// // // // // // // // // //             const resCourse = await api(`/api/courses/${courseId}`);
// // // // // // // // // //             const courseData = resCourse.course || resCourse;
// // // // // // // // // //             setCourse(courseData);
// // // // // // // // // //             setCourseFacilitators(courseData.facilitatorIds || []); 
    
// // // // // // // // // //             if (user) {
// // // // // // // // // //                 try {
// // // // // // // // // //                     const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// // // // // // // // // //                     setIsEnrolled(enrollRes.isEnrolled);
                    
// // // // // // // // // //                     if (enrollRes.isEnrolled) {
// // // // // // // // // //                         setEnrollmentStatus(enrollRes.status || 'pending'); 
// // // // // // // // // //                         if (enrollRes.status === 'active' || enrollRes.status === 'approved') {
// // // // // // // // // //                             const resProgress = await api(`/api/progress/${courseId}`);
// // // // // // // // // //                             setCompletedLessonIds(resProgress.completedLessons || []);

// // // // // // // // // //                             try {
// // // // // // // // // //                                 const resPart = await api(`/api/courses/${courseId}/participants`);
// // // // // // // // // //                                 const userList = resPart.participants?.map((p: any) => p.user) || [];
// // // // // // // // // //                                 setCourseParticipants(userList);
// // // // // // // // // //                             } catch (e) { console.error("Gagal load peserta chat", e); }
// // // // // // // // // //                         }
// // // // // // // // // //                     }
// // // // // // // // // //                 } catch (e) { console.error("Enroll check failed", e); }
// // // // // // // // // //             }
// // // // // // // // // //             if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
// // // // // // // // // //           } catch (e) { console.error("Init failed", e); } finally { setLoading(false); }
// // // // // // // // // //         };
// // // // // // // // // //         if (courseId) initData();
// // // // // // // // // //     }, [courseId, user]);
    
// // // // // // // // // //     // 2. LOGIKA TIMER & TOMBOL MULAI
// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         setTimerSeconds(null);
// // // // // // // // // //         if (activeLesson) {
// // // // // // // // // //             if (!activeLesson.quizDuration || activeLesson.quizDuration <= 0 || completedLessonIds.includes(activeLesson._id)) {
// // // // // // // // // //                 setIsStarted(true);
// // // // // // // // // //                 return;
// // // // // // // // // //             }
// // // // // // // // // //             const storageKey = `timer_${user?.id}_${activeLesson._id}`;
// // // // // // // // // //             const storedEndTime = localStorage.getItem(storageKey);
// // // // // // // // // //             if (storedEndTime) {
// // // // // // // // // //                 const endTime = parseInt(storedEndTime, 10);
// // // // // // // // // //                 if (endTime > Date.now()) {
// // // // // // // // // //                     setIsStarted(true); 
// // // // // // // // // //                     startTicker(endTime); 
// // // // // // // // // //                 } else {
// // // // // // // // // //                     localStorage.removeItem(storageKey);
// // // // // // // // // //                     setIsStarted(true); 
// // // // // // // // // //                     setTimerSeconds(0);
// // // // // // // // // //                 }
// // // // // // // // // //             } else {
// // // // // // // // // //                 setIsStarted(false);
// // // // // // // // // //             }
// // // // // // // // // //         }
// // // // // // // // // //     }, [activeLesson, completedLessonIds, user]);

// // // // // // // // // //     const startTicker = (endTime: number) => {
// // // // // // // // // //         const update = () => {
// // // // // // // // // //             const now = Date.now();
// // // // // // // // // //             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
// // // // // // // // // //             setTimerSeconds(remaining);
// // // // // // // // // //         };
// // // // // // // // // //         update(); 
// // // // // // // // // //         const interval = setInterval(() => {
// // // // // // // // // //             const now = Date.now();
// // // // // // // // // //             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
// // // // // // // // // //             setTimerSeconds(remaining);
// // // // // // // // // //             if (remaining <= 0) clearInterval(interval);
// // // // // // // // // //         }, 1000);
// // // // // // // // // //         return interval;
// // // // // // // // // //     };

// // // // // // // // // //     const handleStartLesson = () => {
// // // // // // // // // //         setIsStarted(true);
// // // // // // // // // //         if (activeLesson.quizDuration > 0) {
// // // // // // // // // //             const endTime = Date.now() + activeLesson.quizDuration * 60 * 1000;
// // // // // // // // // //             localStorage.setItem(`timer_${user?.id}_${activeLesson._id}`, endTime.toString());
// // // // // // // // // //             startTicker(endTime);
// // // // // // // // // //         }
// // // // // // // // // //     };

// // // // // // // // // //     const formatTimer = (seconds: number) => {
// // // // // // // // // //         const m = Math.floor(seconds / 60);
// // // // // // // // // //         const s = seconds % 60;
// // // // // // // // // //         return `${m}:${s < 10 ? '0' : ''}${s}`;
// // // // // // // // // //     };

// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         if (course && !loading) {
// // // // // // // // // //             let total = 0; let completed = 0;
// // // // // // // // // //             course.modules?.forEach((m: any) => { 
// // // // // // // // // //                 if(m.isActive) {
// // // // // // // // // //                     m.lessons?.forEach((l: any) => { 
// // // // // // // // // //                         if(l.isActive) { 
// // // // // // // // // //                             total++; 
// // // // // // // // // //                             if (completedLessonIds.includes(l._id)) completed++; 
// // // // // // // // // //                         } 
// // // // // // // // // //                     });
// // // // // // // // // //                 }
// // // // // // // // // //             });
// // // // // // // // // //             const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
// // // // // // // // // //             setProgressPercent(percent);
// // // // // // // // // //         }
// // // // // // // // // //     }, [completedLessonIds, course, loading]);
    
// // // // // // // // // //     // [FIX] Reset UI upload saat ganti materi
// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //           setUploadedFile(null);
// // // // // // // // // //           setPollSelected(null);
// // // // // // // // // //           setIsSubmitting(false);
// // // // // // // // // //           setIsReuploading(false); // Reset mode revisi
// // // // // // // // // //           if (activeLesson?.type === 'essay' && activeLesson.questions) {
// // // // // // // // // //               setEssayAnswers(new Array(activeLesson.questions.length).fill(''));
// // // // // // // // // //           } else {
// // // // // // // // // //               setEssayAnswers([]);
// // // // // // // // // //           }
// // // // // // // // // //     }, [activeLesson]);

// // // // // // // // // //     const handleEssayChange = (index: number, value: string) => {
// // // // // // // // // //         const newAnswers = [...essayAnswers];
// // // // // // // // // //         newAnswers[index] = value;
// // // // // // // // // //         setEssayAnswers(newAnswers);
// // // // // // // // // //     };

// // // // // // // // // //     // --- HANDLE FILE CHANGE ---
// // // // // // // // // //     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // //         const file = e.target.files?.[0];
// // // // // // // // // //         if (!file) return;
// // // // // // // // // //         if (file.size > 10 * 1024 * 1024) {
// // // // // // // // // //             alert(`File terlalu besar (${(file.size / 1024 / 1024).toFixed(2)} MB).\nMaksimal upload 10 MB agar tidak ditolak server.`);
// // // // // // // // // //             e.target.value = ''; 
// // // // // // // // // //             return;
// // // // // // // // // //         }
// // // // // // // // // //         setUploadedFile(file);
// // // // // // // // // //     };

// // // // // // // // // //     const markLessonAsComplete = async (lessonId: string, extraData: any = {}) => {
// // // // // // // // // //         try { 
// // // // // // // // // //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId, ...extraData } }); 
// // // // // // // // // //             if (!completedLessonIds.includes(lessonId)) {
// // // // // // // // // //                 setCompletedLessonIds(prev => [...prev, lessonId]); 
// // // // // // // // // //             }
// // // // // // // // // //             if(user) localStorage.removeItem(`timer_${user.id}_${lessonId}`);
// // // // // // // // // //         } catch(e) { console.error("Save progress failed", e); throw e; }
// // // // // // // // // //     };
    
// // // // // // // // // //     const handleNextLesson = () => {
// // // // // // // // // //         const allLessons: any[] = [];
// // // // // // // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // // // // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // // // // //         if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // // // // // // // // //         else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // // // // // // // // //     };
    
// // // // // // // // // //     const handlePrevLesson = () => {
// // // // // // // // // //         const allLessons: any[] = [];
// // // // // // // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // // // // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // // // // //         if (currIdx > 0) { setActiveLesson(allLessons[currIdx - 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }
// // // // // // // // // //     };

// // // // // // // // // //     const handleManualComplete = async () => { 
// // // // // // // // // //         await markLessonAsComplete(activeLesson._id); 
// // // // // // // // // //         handleNextLesson(); 
// // // // // // // // // //     };
    
// // // // // // // // // //     const handleQuizCompleted = async (result: { score: number, attempts: number }) => { 
// // // // // // // // // //         try {
// // // // // // // // // //             await markLessonAsComplete(activeLesson._id, { 
// // // // // // // // // //                 score: result.score, 
// // // // // // // // // //                 attempts: result.attempts 
// // // // // // // // // //             });
// // // // // // // // // //             if (!completedLessonIds.includes(activeLesson._id)) {
// // // // // // // // // //                 setCompletedLessonIds(prev => [...prev, activeLesson._id]); 
// // // // // // // // // //             }
// // // // // // // // // //         } catch (e) { console.error("Gagal simpan skor kuis", e); }
// // // // // // // // // //     };
    
// // // // // // // // // //     const handleSubmitTask = async () => {
// // // // // // // // // //         setIsSubmitting(true);
// // // // // // // // // //         try {
// // // // // // // // // //             if (activeLesson.type === 'essay') {
// // // // // // // // // //                 if (essayAnswers.some(ans => ans.trim() === '')) throw new Error("Mohon jawab semua pertanyaan.");
// // // // // // // // // //                 await api(`/api/progress/${courseId}/submit-essay`, { 
// // // // // // // // // //                     method: 'POST', 
// // // // // // // // // //                     body: { lessonId: activeLesson._id, answers: essayAnswers } 
// // // // // // // // // //                 });
// // // // // // // // // //             } else if (activeLesson.type === 'upload_doc' || activeLesson.type === 'image') {
// // // // // // // // // //                 if (!uploadedFile) throw new Error("Pilih file terlebih dahulu.");
// // // // // // // // // //                 const fd = new FormData();
// // // // // // // // // //                 fd.append('file', uploadedFile);
// // // // // // // // // //                 const uploadRes = await apiUpload('/api/upload', fd);
// // // // // // // // // //                 const fileUrl = uploadRes.url || uploadRes.file?.url || uploadRes.imageUrl;
                
// // // // // // // // // //                 await api(`/api/progress/${courseId}/submit-task`, { 
// // // // // // // // // //                     method: 'POST', 
// // // // // // // // // //                     body: { lessonId: activeLesson._id, fileUrl, fileName: uploadedFile.name } 
// // // // // // // // // //                 });
// // // // // // // // // //             } else if (activeLesson.type === 'poll') {
// // // // // // // // // //                 if (pollSelected === null) throw new Error("Pilih salah satu opsi.");
// // // // // // // // // //                 const answerText = activeLesson.pollOptions[pollSelected];
// // // // // // // // // //                 await markLessonAsComplete(activeLesson._id, { pollAnswer: answerText });
// // // // // // // // // //             } else {
// // // // // // // // // //                 await markLessonAsComplete(activeLesson._id);
// // // // // // // // // //             }

// // // // // // // // // //             if (!completedLessonIds.includes(activeLesson._id)) {
// // // // // // // // // //                 setCompletedLessonIds(prev => [...prev, activeLesson._id]);
// // // // // // // // // //             }
// // // // // // // // // //             setIsReuploading(false); // Keluar mode revisi setelah sukses
// // // // // // // // // //             alert("Berhasil dikirim!");
// // // // // // // // // //             handleNextLesson();
// // // // // // // // // //         } catch (e: any) { alert("Gagal mengirim: " + e.message); } finally { setIsSubmitting(false); }
// // // // // // // // // //     };

// // // // // // // // // //     const renderContentHeader = (title: string) => (
// // // // // // // // // //         <div className="mb-6 border-b border-gray-100 pb-4">
// // // // // // // // // //             <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// // // // // // // // // //                 <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 flex items-center gap-1">
// // // // // // // // // //                     {activeLesson?.type?.replace(/_/g, ' ') || 'MATERI'}
// // // // // // // // // //                 </span>
// // // // // // // // // //             </div>
// // // // // // // // // //             <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
// // // // // // // // // //                 <h1 className="text-gray-900 font-bold text-2xl flex-1 leading-tight">{title}</h1>
// // // // // // // // // //                 <div className="flex-shrink-0 flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
// // // // // // // // // //                     {activeLesson.quizDuration > 0 && (
// // // // // // // // // //                         <div className={`flex items-center gap-1 px-2 py-0.5 rounded border ${timerSeconds !== null && timerSeconds < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
// // // // // // // // // //                             <Clock size={14} /> 
// // // // // // // // // //                             <span className="font-bold text-sm">
// // // // // // // // // //                                 {timerSeconds !== null 
// // // // // // // // // //                                     ? `Sisa: ${formatTimer(timerSeconds)}` 
// // // // // // // // // //                                     : `${activeLesson.quizDuration} Menit`
// // // // // // // // // //                                 }
// // // // // // // // // //                             </span>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     )}
// // // // // // // // // //                     <div className="flex items-center gap-1"><Users size={12} className="text-indigo-500"/> <span>{getFacilitatorName(activeLesson.facilitatorId, courseFacilitators)}</span></div>
// // // // // // // // // //                     {activeLesson.jp > 0 && <div className="flex items-center gap-1 border-l pl-3"><Clock size={12} className="text-indigo-500"/> <span>{activeLesson.jp} JP</span></div>}
// // // // // // // // // //                     {(activeLesson.scheduleDate) && <div className="flex items-center gap-1 border-l pl-3"><Calendar size={12} className="text-indigo-500"/> <span>{formatDate(activeLesson.scheduleDate)}</span></div>}
// // // // // // // // // //                 </div>
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>
// // // // // // // // // //     );

// // // // // // // // // //     const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
// // // // // // // // // //         if (activeLesson.quizDuration > 0 && !isStarted && !completedLessonIds.includes(activeLesson._id)) {
// // // // // // // // // //             return (
// // // // // // // // // //                 <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-200 text-center min-h-[300px] animate-in fade-in zoom-in duration-300">
// // // // // // // // // //                     <div className="bg-indigo-100 p-5 rounded-full mb-6 text-indigo-600 shadow-inner">
// // // // // // // // // //                         <Clock size={48} />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <h2 className="text-2xl font-bold text-gray-800 mb-3">Materi dengan Batas Waktu</h2>
// // // // // // // // // //                     <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
// // // // // // // // // //                         Materi <strong>"{activeLesson.title}"</strong> memiliki batas waktu pengerjaan selama <span className="font-bold text-gray-800">{activeLesson.quizDuration} Menit</span>. 
// // // // // // // // // //                         <br/><span className="text-xs text-red-500 mt-2 block">*Waktu akan berjalan otomatis setelah Anda menekan tombol di bawah.</span>
// // // // // // // // // //                     </p>
// // // // // // // // // //                     <button onClick={handleStartLesson} className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95">
// // // // // // // // // //                         <Play size={20} fill="currentColor" /> Mulai Kerjakan Sekarang
// // // // // // // // // //                     </button>
// // // // // // // // // //                 </div>
// // // // // // // // // //             );
// // // // // // // // // //         }
        
// // // // // // // // // //         if (timerSeconds !== null && timerSeconds <= 0 && !completedLessonIds.includes(activeLesson._id)) {
// // // // // // // // // //              return (
// // // // // // // // // //                 <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-xl shadow-sm border border-red-200 text-center min-h-[300px]">
// // // // // // // // // //                     <div className="bg-red-100 p-4 rounded-full mb-4 text-red-600">
// // // // // // // // // //                         <AlertCircle size={40} />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <h2 className="text-xl font-bold text-red-800 mb-2">Waktu Habis!</h2>
// // // // // // // // // //                     <p className="text-red-600 mb-6">Waktu pengerjaan untuk materi ini telah berakhir.</p>
// // // // // // // // // //                     <button onClick={handleNextLesson} className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">Lanjut Materi Berikutnya</button>
// // // // // // // // // //                 </div>
// // // // // // // // // //              );
// // // // // // // // // //         }

// // // // // // // // // //         return <>{children}</>;
// // // // // // // // // //     };

// // // // // // // // // //     const renderContent = () => {
// // // // // // // // // //         if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping.</div>;
        
// // // // // // // // // //         const isLessonCompleted = completedLessonIds.includes(activeLesson._id);

// // // // // // // // // //         const content = (
// // // // // // // // // //             <>
// // // // // // // // // //                 {activeLesson.type === 'quiz' && (
// // // // // // // // // //                     <QuizPlayer 
// // // // // // // // // //                         quizId={activeLesson._id} 
// // // // // // // // // //                         courseId={courseId} 
// // // // // // // // // //                         lessonData={activeLesson}
// // // // // // // // // //                         onComplete={handleQuizCompleted} 
// // // // // // // // // //                     />
// // // // // // // // // //                 )}
                
// // // // // // // // // //                 {activeLesson.type === 'image' && (
// // // // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // // //                         <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
// // // // // // // // // //                             <img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="w-full h-auto object-contain" />
// // // // // // // // // //                         </div>
// // // // // // // // // //                         {activeLesson.content && <div className="prose max-w-none mt-6 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />}
// // // // // // // // // //                     </div>
// // // // // // // // // //                 )}

// // // // // // // // // //                 {(activeLesson.type === 'slide' || activeLesson.type === 'download_doc') && (
// // // // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // // //                         <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center mb-6">
// // // // // // // // // //                             <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4"><FileText size={32} /></div>
// // // // // // // // // //                             <h3 className="text-lg font-bold text-gray-800 mb-2">{activeLesson.title}</h3>
// // // // // // // // // //                             <p className="text-sm text-gray-500 mb-6">Dokumen Materi Pembelajaran.</p>
// // // // // // // // // //                             <a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-transform active:scale-95" aria-label="Download File">
// // // // // // // // // //                                 <Download size={18} /> Download Materi
// // // // // // // // // //                             </a>
// // // // // // // // // //                         </div>
// // // // // // // // // //                         {activeLesson.fileUrl && activeLesson.fileUrl.endsWith('.pdf') && (
// // // // // // // // // //                             <div className="mt-8 border rounded-xl overflow-hidden h-[800px] shadow-sm">
// // // // // // // // // //                                 <iframe src={getImageUrl(activeLesson.fileUrl)} className="w-full h-full" title="Preview"></iframe>
// // // // // // // // // //                             </div>
// // // // // // // // // //                         )}
// // // // // // // // // //                     </div>
// // // // // // // // // //                 )}

// // // // // // // // // //                 {activeLesson.type === 'video_url' && (
// // // // // // // // // //                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // // //                         <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
// // // // // // // // // //                             <iframe 
// // // // // // // // // //                                 src={activeLesson.videoUrl?.includes('youtu') ? `https://www.youtube.com/embed/${activeLesson.videoUrl.split('/').pop().replace('watch?v=', '')}` : activeLesson.videoUrl} 
// // // // // // // // // //                                 className="w-full h-full" 
// // // // // // // // // //                                 allowFullScreen 
// // // // // // // // // //                                 title={`Video ${activeLesson.title}`} 
// // // // // // // // // //                             />
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 )}

// // // // // // // // // //                 {activeLesson.type === 'virtual_class' && (
// // // // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // // //                         <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
// // // // // // // // // //                             <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"><Video size={40}/></div>
// // // // // // // // // //                             <h3 className="text-xl font-bold text-gray-900 mb-2">Kelas Virtual (Zoom/Meet)</h3>
// // // // // // // // // //                             <p className="text-gray-600 mb-6">Silakan bergabung ke pertemuan virtual melalui tombol di bawah ini.</p>
                            
// // // // // // // // // //                             {(activeLesson.meetingLink || activeLesson.content) ? (
// // // // // // // // // //                                 <div className="space-y-3">
// // // // // // // // // //                                     <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg">
// // // // // // // // // //                                         <Video size={20}/> Gabung Meeting
// // // // // // // // // //                                     </a>
// // // // // // // // // //                                     <div className="text-xs text-gray-500">
// // // // // // // // // //                                         Link: <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" className="text-purple-600 underline">{activeLesson.meetingLink || activeLesson.content}</a>
// // // // // // // // // //                                     </div>
// // // // // // // // // //                                 </div>
// // // // // // // // // //                             ) : (
// // // // // // // // // //                                 <button disabled className="inline-flex items-center gap-2 bg-gray-400 text-white px-8 py-3 rounded-full font-bold cursor-not-allowed">
// // // // // // // // // //                                     <Video size={20}/> Link Belum Tersedia
// // // // // // // // // //                                 </button>
// // // // // // // // // //                             )}
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 )}
                
// // // // // // // // // //                 {activeLesson.type === 'google_classroom' && (
// // // // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // // //                         <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
// // // // // // // // // //                             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border"><School size={40} className="text-green-600"/></div>
// // // // // // // // // //                             <h3 className="text-xl font-bold text-gray-900 mb-2">Google Classroom</h3>
// // // // // // // // // //                             <p className="text-gray-600 mb-2">Materi ini terhubung dengan Google Classroom.</p>
// // // // // // // // // //                             {activeLesson.classroomData ? (
// // // // // // // // // //                                 <div className="mt-4">
// // // // // // // // // //                                     <p className="font-bold text-lg">{activeLesson.classroomData.name}</p>
// // // // // // // // // //                                     <p className="text-sm text-gray-500 mb-6">Kode Kelas: <span className="font-mono bg-white px-2 py-1 border rounded">{activeLesson.classroomData.enrollmentCode || '-'}</span></p>
// // // // // // // // // //                                     <a href={activeLesson.classroomData.alternateLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 shadow-lg">Buka Google Classroom ↗</a>
// // // // // // // // // //                                 </div>
// // // // // // // // // //                             ) : <p className="text-red-500 italic">Data kelas tidak ditemukan.</p>}
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 )}

// // // // // // // // // //                 {['essay', 'upload_doc', 'image', 'poll', 'lesson'].includes(activeLesson.type) && (
// // // // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6">
// // // // // // // // // //                         {activeLesson.content && activeLesson.type !== 'image' && (
// // // // // // // // // //                             <div className="prose max-w-none mb-8 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
// // // // // // // // // //                         )}
                        
// // // // // // // // // //                         {activeLesson.type === 'essay' && (
// // // // // // // // // //                             <div className="space-y-6">
// // // // // // // // // //                                 {activeLesson.questions?.map((q:any,i:number)=>(
// // // // // // // // // //                                     <div key={i} className="border p-4 rounded-lg bg-gray-50">
// // // // // // // // // //                                         <div className="font-bold mb-2 text-sm text-gray-700 flex gap-2">
// // // // // // // // // //                                             <span>{i+1}.</span>
// // // // // // // // // //                                             <div dangerouslySetInnerHTML={{ __html: q.question }} />
// // // // // // // // // //                                         </div>
// // // // // // // // // //                                         <div className="bg-white">
// // // // // // // // // //                                             <ReactQuill theme="snow" value={essayAnswers[i]||''} onChange={(v)=>handleEssayChange(i,v)} placeholder="Tulis jawaban..."/>
// // // // // // // // // //                                         </div>
// // // // // // // // // //                                     </div>
// // // // // // // // // //                                 ))}
// // // // // // // // // //                                 <button onClick={handleSubmitTask} disabled={isSubmitting} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold w-full hover:bg-indigo-700 transition-colors" title="Kirim Jawaban" aria-label="Kirim Jawaban">{isSubmitting?'Mengirim...':'Kirim Jawaban'}</button>
// // // // // // // // // //                             </div>
// // // // // // // // // //                         )}
                        
// // // // // // // // // //                         {/* UPDATE: UI UPLOAD (Cek sudah selesai atau belum) */}
// // // // // // // // // //                         {(activeLesson.type === 'upload_doc' || activeLesson.type === 'image') && (
// // // // // // // // // //                             <div className="border-2 border-dashed p-8 text-center rounded-xl bg-gray-50 border-indigo-200">
// // // // // // // // // //                                 {/* JIKA SUDAH SELESAI DAN TIDAK SEDANG REVISI */}
// // // // // // // // // //                                 {isLessonCompleted && !uploadedFile && !isReuploading ? (
// // // // // // // // // //                                     <div className="animate-in fade-in zoom-in duration-300">
// // // // // // // // // //                                         <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
// // // // // // // // // //                                             <CheckCircle size={32} />
// // // // // // // // // //                                         </div>
// // // // // // // // // //                                         <h3 className="text-xl font-bold text-gray-800 mb-2">Tugas Sudah Dikirim!</h3>
// // // // // // // // // //                                         <p className="text-gray-500 mb-6 text-sm">Anda telah menyelesaikan tugas ini.</p>
                                        
// // // // // // // // // //                                         <button 
// // // // // // // // // //                                             onClick={() => setIsReuploading(true)} 
// // // // // // // // // //                                             className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-50 shadow-sm transition-colors text-sm"
// // // // // // // // // //                                         >
// // // // // // // // // //                                             Kirim Ulang / Ganti File
// // // // // // // // // //                                         </button>
// // // // // // // // // //                                     </div>
// // // // // // // // // //                                 ) : (
// // // // // // // // // //                                     /* TAMPILAN FORM UPLOAD (Default atau Revisi) */
// // // // // // // // // //                                     <>
// // // // // // // // // //                                         {uploadedFile ? (
// // // // // // // // // //                                             <div className="text-center w-full animate-in fade-in zoom-in duration-300">
// // // // // // // // // //                                                  <div className="text-green-600 font-bold text-lg mb-2 flex items-center justify-center gap-2">
// // // // // // // // // //                                                     <FileCheck className="w-8 h-8" />
// // // // // // // // // //                                                     File Siap Upload!
// // // // // // // // // //                                                  </div>
// // // // // // // // // //                                                  <p className="text-gray-700 font-medium break-all mb-4 px-4 bg-white py-2 rounded border inline-block shadow-sm">
// // // // // // // // // //                                                     {uploadedFile.name}
// // // // // // // // // //                                                     <span className="block text-[10px] text-gray-400 font-normal">
// // // // // // // // // //                                                         ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
// // // // // // // // // //                                                     </span>
// // // // // // // // // //                                                  </p>
// // // // // // // // // //                                                  <div className="flex justify-center gap-3">
// // // // // // // // // //                                                     <button 
// // // // // // // // // //                                                         onClick={() => setUploadedFile(null)} 
// // // // // // // // // //                                                         className="text-red-500 hover:text-red-700 text-sm font-bold underline"
// // // // // // // // // //                                                     >
// // // // // // // // // //                                                         Ganti File
// // // // // // // // // //                                                     </button>
// // // // // // // // // //                                                  </div>
// // // // // // // // // //                                             </div>
// // // // // // // // // //                                         ) : (
// // // // // // // // // //                                             <>
// // // // // // // // // //                                                 <UploadCloud className="mx-auto text-indigo-400 mb-2" size={32}/>
// // // // // // // // // //                                                 <p className="text-sm text-gray-500 mb-4">Upload tugas Anda di sini (PDF/DOCX/JPG)</p>
// // // // // // // // // //                                                 <label className="cursor-pointer bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 inline-flex items-center gap-2 transition-transform active:scale-95 shadow-md">
// // // // // // // // // //                                                     <UploadCloud size={18}/> Pilih File
// // // // // // // // // //                                                     <input 
// // // // // // // // // //                                                         type="file" 
// // // // // // // // // //                                                         className="hidden" 
// // // // // // // // // //                                                         onChange={handleFileChange} 
// // // // // // // // // //                                                         accept={activeLesson.type === 'image' ? "image/*" : ".pdf,.doc,.docx,.jpg,.jpeg,.png"}
// // // // // // // // // //                                                     />
// // // // // // // // // //                                                 </label>
// // // // // // // // // //                                                 <p className="text-[10px] text-gray-400 mt-3">Maksimal Ukuran File: 10 MB</p>
// // // // // // // // // //                                             </>
// // // // // // // // // //                                         )}

// // // // // // // // // //                                         <button 
// // // // // // // // // //                                             onClick={handleSubmitTask} 
// // // // // // // // // //                                             disabled={!uploadedFile || isSubmitting} 
// // // // // // // // // //                                             className={`mt-6 px-10 py-3 mx-auto block rounded-xl font-bold text-white shadow-lg transition-all ${!uploadedFile ? 'bg-gray-300 cursor-not-allowed hidden' : 'bg-green-600 hover:bg-green-700 hover:scale-[1.02]'}`}
// // // // // // // // // //                                             title="Upload Tugas" 
// // // // // // // // // //                                             aria-label="Upload Tugas"
// // // // // // // // // //                                         >
// // // // // // // // // //                                             {isSubmitting ? 'Sedang Mengirim...' : 'Kirim Tugas Sekarang'}
// // // // // // // // // //                                         </button>
                                        
// // // // // // // // // //                                         {/* Tombol batal jika sedang revisi */}
// // // // // // // // // //                                         {isReuploading && !uploadedFile && (
// // // // // // // // // //                                             <button 
// // // // // // // // // //                                                 onClick={() => setIsReuploading(false)} 
// // // // // // // // // //                                                 className="mt-4 text-xs text-gray-500 hover:text-gray-700 underline"
// // // // // // // // // //                                             >
// // // // // // // // // //                                                 Batal, kembali ke status selesai
// // // // // // // // // //                                             </button>
// // // // // // // // // //                                         )}
// // // // // // // // // //                                     </>
// // // // // // // // // //                                 )}
// // // // // // // // // //                             </div>
// // // // // // // // // //                         )}
                        
// // // // // // // // // //                         {activeLesson.type === 'poll' && (
// // // // // // // // // //                             <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
// // // // // // // // // //                                 <h3 className="font-bold text-lg mb-4">{activeLesson.pollQuestion || "Polling"}</h3>
// // // // // // // // // //                                 <div className="space-y-3 max-w-sm mx-auto">
// // // // // // // // // //                                     {activeLesson.pollOptions?.map((opt:string, idx:number) => (
// // // // // // // // // //                                         <button key={idx} onClick={()=>setPollSelected(idx)} className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${pollSelected===idx ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-100 border-gray-300'}`} title={`Pilih ${opt}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>
// // // // // // // // // //                                     ))}
// // // // // // // // // //                                 </div>
// // // // // // // // // //                                 <button onClick={handleSubmitTask} disabled={pollSelected===null||isSubmitting} className="mt-6 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition-colors" title="Kirim Polling" aria-label="Kirim Polling">Kirim Polling</button>
// // // // // // // // // //                             </div>
// // // // // // // // // //                         )}
// // // // // // // // // //                     </div>
// // // // // // // // // //                 )}
// // // // // // // // // //             </>
// // // // // // // // // //         );

// // // // // // // // // //         return (
// // // // // // // // // //             <div>
// // // // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // // // //                 <ContentWrapper>
// // // // // // // // // //                     {content}
// // // // // // // // // //                 </ContentWrapper>
// // // // // // // // // //             </div>
// // // // // // // // // //         );
// // // // // // // // // //     };
  
// // // // // // // // // //     if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // // // // // // // //     if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;
  
// // // // // // // // // //     if (!isEnrolled || enrollmentStatus === 'pending') {
// // // // // // // // // //         return (
// // // // // // // // // //           <div className="min-h-screen bg-gray-50 pb-20">
// // // // // // // // // //               {showRegisterModal && (
// // // // // // // // // //                   <CourseRegistrationModal 
// // // // // // // // // //                     courseId={courseId} 
// // // // // // // // // //                     courseTitle={course.title} 
// // // // // // // // // //                     programType={course.programType} 
// // // // // // // // // //                     user={user} 
// // // // // // // // // //                     onClose={() => setShowRegisterModal(false)} 
// // // // // // // // // //                     onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil! Menunggu Verifikasi."); window.location.reload(); }} 
// // // // // // // // // //                   />
// // // // // // // // // //               )}
              
// // // // // // // // // //               {/* HERO SECTION */}
// // // // // // // // // //               <div className="relative bg-gray-900 text-white">
// // // // // // // // // //                   <div className="absolute inset-0 bg-black/60 z-0"></div>
// // // // // // // // // //                   {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" alt="" />}
                  
// // // // // // // // // //                   <div className="max-w-6xl mx-auto px-6 py-24 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
// // // // // // // // // //                       <div className="lg:col-span-2 space-y-6">
// // // // // // // // // //                           <div className="flex items-center gap-3">
// // // // // // // // // //                               <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${course.programType === 'training' ? 'bg-orange-500' : 'bg-blue-500'}`}>
// // // // // // // // // //                                   {course.programType === 'training' ? 'Diklat / Pelatihan' : 'Kursus Mandiri'}
// // // // // // // // // //                               </span>
// // // // // // // // // //                               {course.category && <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">{course.category}</span>}
// // // // // // // // // //                           </div>
                          
// // // // // // // // // //                           <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{course.title}</h1>
                          
// // // // // // // // // //                           <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300 pt-2">
// // // // // // // // // //                               <div className="flex items-center gap-2"><Users size={18}/> {courseFacilitators.length} Fasilitator</div>
// // // // // // // // // //                               <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
// // // // // // // // // //                               <div className="flex items-center gap-2"><Clock size={18}/> {course.programType === 'training' ? 'Terjadwal' : 'Fleksibel'}</div>
// // // // // // // // // //                               {course.certificateConfig && <div className="flex items-center gap-2 text-yellow-400"><Award size={18}/> Sertifikat Tersedia</div>}
// // // // // // // // // //                           </div>
// // // // // // // // // //                       </div>

// // // // // // // // // //                       {/* CARD PENDAFTARAN */}
// // // // // // // // // //                       <div className="lg:col-span-1">
// // // // // // // // // //                           <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-100 sticky top-24">
// // // // // // // // // //                               <div className="text-center mb-8">
// // // // // // // // // //                                   <p className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Biaya Investasi</p>
// // // // // // // // // //                                   <p className="text-4xl font-black text-green-600">
// // // // // // // // // //                                       {course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}
// // // // // // // // // //                                   </p>
// // // // // // // // // //                               </div>

// // // // // // // // // //                               {enrollmentStatus === 'pending' ? (
// // // // // // // // // //                                   <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-center border border-yellow-200">
// // // // // // // // // //                                       <h3 className="font-bold mb-1">Menunggu Verifikasi</h3>
// // // // // // // // // //                                       <p className="text-xs">Pendaftaran Anda sedang diproses admin.</p>
// // // // // // // // // //                                   </div>
// // // // // // // // // //                               ) : (
// // // // // // // // // //                                   <button 
// // // // // // // // // //                                     onClick={() => setShowRegisterModal(true)} 
// // // // // // // // // //                                     className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-lg"
// // // // // // // // // //                                     title="Daftar Sekarang"
// // // // // // // // // //                                     aria-label="Daftar Sekarang"
// // // // // // // // // //                                   >
// // // // // // // // // //                                       📝 Daftar Sekarang
// // // // // // // // // //                                   </button>
// // // // // // // // // //                               )}
                              
// // // // // // // // // //                               <p className="text-xs text-center text-gray-400 mt-4">
// // // // // // // // // //                                   *Akses selamanya setelah terdaftar
// // // // // // // // // //                               </p>
// // // // // // // // // //                           </div>
// // // // // // // // // //                       </div>
// // // // // // // // // //                   </div>
// // // // // // // // // //               </div>

// // // // // // // // // //               {/* DETAIL CONTENT */}
// // // // // // // // // //               <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
// // // // // // // // // //                   <div className="lg:col-span-2 space-y-12">
// // // // // // // // // //                       {/* DESKRIPSI */}
// // // // // // // // // //                       <section>
// // // // // // // // // //                           <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="text-red-600"/> Tentang Program Ini</h3>
// // // // // // // // // //                           <div className="prose max-w-none text-gray-600 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm" dangerouslySetInnerHTML={{ __html: course.description || "<p>Belum ada deskripsi.</p>" }} />
// // // // // // // // // //                       </section>

// // // // // // // // // //                       {/* KURIKULUM */}
// // // // // // // // // //                       <section>
// // // // // // // // // //                           <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="text-red-600"/> Kurikulum & Materi</h3>
// // // // // // // // // //                           <div className="space-y-4">
// // // // // // // // // //                               {course.modules?.map((mod: any, idx: number) => (
// // // // // // // // // //                                   <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
// // // // // // // // // //                                       <div className="bg-gray-50 px-6 py-4 border-b font-bold text-gray-800 flex justify-between">
// // // // // // // // // //                                           <span>Modul {idx + 1}: {mod.title}</span>
// // // // // // // // // //                                           <span className="text-xs font-normal text-gray-500 bg-white px-2 py-1 rounded border">{mod.lessons?.length || 0} Materi</span>
// // // // // // // // // //                                       </div>
// // // // // // // // // //                                       <div className="divide-y">
// // // // // // // // // //                                           {mod.lessons?.map((les: any, lIdx: number) => (
// // // // // // // // // //                                               <div key={lIdx} className="px-6 py-3 flex items-center gap-3 text-sm text-gray-600">
// // // // // // // // // //                                                   {les.type === 'video_url' ? <PlayCircle size={16} className="text-blue-500"/> : <FileText size={16} className="text-gray-400"/>}
// // // // // // // // // //                                                   {les.title}
// // // // // // // // // //                                                   {les.jp > 0 && <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{les.jp} JP</span>}
// // // // // // // // // //                                               </div>
// // // // // // // // // //                                           ))}
// // // // // // // // // //                                       </div>
// // // // // // // // // //                                   </div>
// // // // // // // // // //                               ))}
// // // // // // // // // //                           </div>
// // // // // // // // // //                       </section>
// // // // // // // // // //                   </div>

// // // // // // // // // //                   {/* SIDEBAR INFO */}
// // // // // // // // // //                   <div className="space-y-8">
// // // // // // // // // //                       {/* FASILITATOR */}
// // // // // // // // // //                       <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
// // // // // // // // // //                           <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Users className="text-red-600"/> Tim Fasilitator</h4>
// // // // // // // // // //                           <div className="space-y-4">
// // // // // // // // // //                               {courseFacilitators.map((fac: any) => (
// // // // // // // // // //                                   <div key={fac._id} className="flex items-center gap-3">
// // // // // // // // // //                                       {fac.avatarUrl ? (
// // // // // // // // // //                                           <img src={getImageUrl(fac.avatarUrl)} className="w-10 h-10 rounded-full object-cover border" alt={fac.name}/>
// // // // // // // // // //                                       ) : (
// // // // // // // // // //                                           <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">{fac.name.charAt(0)}</div>
// // // // // // // // // //                                       )}
// // // // // // // // // //                                       <div>
// // // // // // // // // //                                           <p className="font-bold text-sm text-gray-800">{fac.name}</p>
// // // // // // // // // //                                           <p className="text-xs text-gray-500">Fasilitator</p>
// // // // // // // // // //                                       </div>
// // // // // // // // // //                                   </div>
// // // // // // // // // //                               ))}
// // // // // // // // // //                               {courseFacilitators.length === 0 && <p className="text-sm text-gray-500 italic">Belum ditentukan.</p>}
// // // // // // // // // //                           </div>
// // // // // // // // // //                       </section>

// // // // // // // // // //                       {/* INFO TAMBAHAN */}
// // // // // // // // // //                       <section className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
// // // // // // // // // //                           <h4 className="font-bold text-indigo-900 mb-4">Fasilitas Program</h4>
// // // // // // // // // //                           <ul className="space-y-3 text-sm text-indigo-800">
// // // // // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Akses Materi Seumur Hidup</li>
// // // // // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Grup Diskusi Eksklusif</li>
// // // // // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Sertifikat Kelulusan</li>
// // // // // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Konsultasi Fasilitator</li>
// // // // // // // // // //                           </ul>
// // // // // // // // // //                       </section>
// // // // // // // // // //                   </div>
// // // // // // // // // //               </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         );
// // // // // // // // // //     }
  
// // // // // // // // // //     // TAMPILAN DASHBOARD BELAJAR
// // // // // // // // // //     const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;
  
// // // // // // // // // //     return (
// // // // // // // // // //       <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // // // // // // // // //         <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
// // // // // // // // // //           <div className="p-5 border-b bg-white">
// // // // // // // // // //               <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" title="Kembali ke Katalog" aria-label="Kembali"><span>←</span> KEMBALI KE KATALOG</Link>
// // // // // // // // // //               <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
// // // // // // // // // //               <div className="space-y-2">
// // // // // // // // // //                   <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{safePercent}%</span></div>
// // // // // // // // // //                   <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: `${safePercent}%`}}></div></div>
// // // // // // // // // //               </div>
// // // // // // // // // //               <button onClick={() => setShowPersonalChat(true)} className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50" title="Hubungi Pengajar" aria-label="Hubungi Pengajar">
// // // // // // // // // //                   <MessageCircle size={16}/> Hubungi Pengajar
// // // // // // // // // //               </button>
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
// // // // // // // // // //               {course.modules?.map((mod:any, i:number)=>(
// // // // // // // // // //                   <div key={mod._id}>
// // // // // // // // // //                       <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
// // // // // // // // // //                       <div className="space-y-1">
// // // // // // // // // //                           {mod.lessons?.map((les:any) => (
// // // // // // // // // //                               <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`} title={`Buka Materi ${les.title}`} aria-label={`Buka Materi ${les.title}`}>
// // // // // // // // // //                                   {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
// // // // // // // // // //                                   {les.title}
// // // // // // // // // //                               </button>
// // // // // // // // // //                           ))}
// // // // // // // // // //                       </div>
// // // // // // // // // //                   </div>
// // // // // // // // // //               ))}
// // // // // // // // // //           </div>
// // // // // // // // // //         </aside>
  
// // // // // // // // // //         <main className="flex-1 flex flex-col relative h-full overflow-hidden bg-gray-50">
// // // // // // // // // //           <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
// // // // // // // // // //               <button type="button" onClick={()=>setIsSidebarOpen(!isSidebarOpen)} aria-label="Menu" title="Menu"><Menu/></button>
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
// // // // // // // // // //               {renderContent()}
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className="fixed bottom-8 right-8 flex gap-3 z-30">
// // // // // // // // // //               <button type="button" onClick={handlePrevLesson} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105" title="Materi Sebelumnya" aria-label="Materi Sebelumnya"><ChevronLeft/></button>
// // // // // // // // // //               <button type="button" onClick={handleManualComplete} className="h-12 px-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 font-bold hover:scale-105" title="Lanjut Materi" aria-label="Lanjut Materi"><span>Lanjut</span><ChevronRight/></button>
// // // // // // // // // //           </div>
// // // // // // // // // //         </main>
        
// // // // // // // // // //         {showPersonalChat && <ChatWithFacilitatorModal facilitators={courseFacilitators} onClose={() => setShowPersonalChat(false)} />}
  
// // // // // // // // // //         {user && (
// // // // // // // // // //           <CourseGroupChat 
// // // // // // // // // //               courseId={courseId} 
// // // // // // // // // //               currentUser={user} 
// // // // // // // // // //               participants={courseParticipants} 
// // // // // // // // // //               facilitators={courseFacilitators} 
// // // // // // // // // //               isFloating={true} 
// // // // // // // // // //           />
// // // // // // // // // //         )}
// // // // // // // // // //       </div>
// // // // // // // // // //     );
// // // // // // // // // // }
// // // // // // // // // 'use client';

// // // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // // import Link from 'next/link';
// // // // // // // // // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // // // // // // import CourseGroupChat from '@/components/CourseGroupChat'; 
// // // // // // // // // import { 
// // // // // // // // //     Users, Clock, MessageCircle, ChevronLeft, ChevronRight, Menu, Send, X,
// // // // // // // // //     FileText, PlayCircle, CheckCircle, UploadCloud, Calendar, Download, 
// // // // // // // // //     Image as ImageIcon, Video, School, MonitorPlay, BookOpen, Play, AlertCircle, Award, FileCheck 
// // // // // // // // // } from 'lucide-react';
// // // // // // // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';
// // // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // // import 'react-quill/dist/quill.snow.css';

// // // // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // // // //     ssr: false, 
// // // // // // // // //     loading: () => <div className="h-24 bg-gray-50 animate-pulse rounded-lg border border-gray-200"></div> 
// // // // // // // // // });

// // // // // // // // // // --- HELPER FUNCTIONS ---
// // // // // // // // // const getFacilitatorName = (activeFacilitatorId: any, facilitatorsList: any[]) => {
// // // // // // // // //     if (!activeFacilitatorId) return '-';
// // // // // // // // //     if (typeof activeFacilitatorId === 'object' && activeFacilitatorId.name) return activeFacilitatorId.name;
// // // // // // // // //     const found = facilitatorsList.find(f => (f._id === activeFacilitatorId) || (f.id === activeFacilitatorId));
// // // // // // // // //     return found ? found.name : 'Fasilitator';
// // // // // // // // // };

// // // // // // // // // const formatDate = (dateString: string) => {
// // // // // // // // //     if (!dateString) return '-';
// // // // // // // // //     return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // // // // // // // };

// // // // // // // // // // --- CHAT MODAL (Personal) ---
// // // // // // // // // function ChatWithFacilitatorModal({ facilitators, onClose }: any) {
// // // // // // // // //     const { user } = useAuth();
// // // // // // // // //     const [selectedFacilitator, setSelectedFacilitator] = useState<any>(facilitators[0] || null);
// // // // // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // // // // //     const [message, setMessage] = useState('');
// // // // // // // // //     const [sending, setSending] = useState(false);
// // // // // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // // // // // //     useEffect(() => {
// // // // // // // // //         if (selectedFacilitator?._id) {
// // // // // // // // //             loadHistory();
// // // // // // // // //             const interval = setInterval(loadHistory, 3000);
// // // // // // // // //             return () => clearInterval(interval);
// // // // // // // // //         }
// // // // // // // // //     }, [selectedFacilitator]);

// // // // // // // // //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// // // // // // // // //     const loadHistory = async () => {
// // // // // // // // //         try {
// // // // // // // // //             const res = await api(`/api/chat/${selectedFacilitator._id}?t=${Date.now()}`);
// // // // // // // // //             setMessages(res.messages || []);
// // // // // // // // //         } catch (e) { console.error(e); }
// // // // // // // // //     };

// // // // // // // // //     const handleSend = async (e: React.FormEvent) => {
// // // // // // // // //         e.preventDefault();
// // // // // // // // //         if (!message.trim() || !selectedFacilitator) return;
// // // // // // // // //         setSending(true);
// // // // // // // // //         try {
// // // // // // // // //             await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message } });
// // // // // // // // //             setMessage('');
// // // // // // // // //             loadHistory();
// // // // // // // // //         } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); }
// // // // // // // // //     };

// // // // // // // // //     return (
// // // // // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
// // // // // // // // //             <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]" role="dialog" aria-modal="true" aria-label="Chat Personal">
// // // // // // // // //                 <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10">
// // // // // // // // //                     <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18} /> Hubungi Pengajar</h3>
// // // // // // // // //                     <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20} /></button>
// // // // // // // // //                 </div>
// // // // // // // // //                 {!selectedFacilitator ? (
// // // // // // // // //                     <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center text-gray-500">Tidak ada fasilitator.</div>
// // // // // // // // //                 ) : (
// // // // // // // // //                     <>
// // // // // // // // //                         {facilitators.length > 1 && (
// // // // // // // // //                             <div className="p-3 bg-gray-50 border-b flex gap-2 overflow-x-auto">
// // // // // // // // //                                 {facilitators.map((f:any) => (
// // // // // // // // //                                     <button type="button" key={f._id} onClick={()=>setSelectedFacilitator(f)} className={`px-3 py-1 text-xs rounded-full border ${selectedFacilitator._id===f._id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300'}`} title={`Pilih ${f.name}`}>{f.name}</button>
// // // // // // // // //                                 ))}
// // // // // // // // //                             </div>
// // // // // // // // //                         )}
// // // // // // // // //                         <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// // // // // // // // //                             {messages.map((msg: any, idx: number) => {
// // // // // // // // //                                 const isMe = msg.sender === 'me' || msg.sender?._id === user?.id;
// // // // // // // // //                                 return (
// // // // // // // // //                                     <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
// // // // // // // // //                                         <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
// // // // // // // // //                                             <p>{msg.message}</p>
// // // // // // // // //                                         </div>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 );
// // // // // // // // //                             })}
// // // // // // // // //                             <div ref={messagesEndRef} />
// // // // // // // // //                         </div>
// // // // // // // // //                         <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
// // // // // // // // //                             <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus title="Input Pesan" aria-label="Ketik pesan" />
// // // // // // // // //                             <button type="button" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button>
// // // // // // // // //                         </form>
// // // // // // // // //                     </>
// // // // // // // // //                 )}
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // }

// // // // // // // // // // --- MAIN PAGE COMPONENT ---
// // // // // // // // // export default function StudentCoursePlayPage() {
// // // // // // // // //     const router = useRouter();
// // // // // // // // //     const params = useParams();
// // // // // // // // //     const { user } = useAuth();
// // // // // // // // //     const { courseId } = params as { courseId: string };
  
// // // // // // // // //     const [course, setCourse] = useState<any>(null);
// // // // // // // // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // // // // //     const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // // // // // // // //     const [progressPercent, setProgressPercent] = useState(0);
// // // // // // // // //     const [courseFacilitators, setCourseFacilitators] = useState<any[]>([]); 
// // // // // // // // //     const [courseParticipants, setCourseParticipants] = useState<any[]>([]); 
    
// // // // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // // // //     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // // // // // // //     const [isEnrolled, setIsEnrolled] = useState(false);
// // // // // // // // //     const [enrollmentStatus, setEnrollmentStatus] = useState<string>(''); 
// // // // // // // // //     const [showRegisterModal, setShowRegisterModal] = useState(false);
// // // // // // // // //     const [showPersonalChat, setShowPersonalChat] = useState(false); 
  
// // // // // // // // //     const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// // // // // // // // //     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// // // // // // // // //     const [pollSelected, setPollSelected] = useState<number | null>(null);
// // // // // // // // //     const [isSubmitting, setIsSubmitting] = useState(false);
    
// // // // // // // // //     const [isReuploading, setIsReuploading] = useState(false);

// // // // // // // // //     // STATE TIMER & START
// // // // // // // // //     const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
// // // // // // // // //     const [isStarted, setIsStarted] = useState(false); 
  
// // // // // // // // //     // 1. INIT DATA
// // // // // // // // //     useEffect(() => {
// // // // // // // // //         const initData = async () => {
// // // // // // // // //           try {
// // // // // // // // //             setLoading(true);
// // // // // // // // //             const resCourse = await api(`/api/courses/${courseId}`);
// // // // // // // // //             const courseData = resCourse.course || resCourse;
// // // // // // // // //             setCourse(courseData);
// // // // // // // // //             setCourseFacilitators(courseData.facilitatorIds || []); 
    
// // // // // // // // //             if (user) {
// // // // // // // // //                 try {
// // // // // // // // //                     const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// // // // // // // // //                     setIsEnrolled(enrollRes.isEnrolled);
                    
// // // // // // // // //                     if (enrollRes.isEnrolled) {
// // // // // // // // //                         setEnrollmentStatus(enrollRes.status || 'pending'); 
// // // // // // // // //                         if (enrollRes.status === 'active' || enrollRes.status === 'approved') {
// // // // // // // // //                             const resProgress = await api(`/api/progress/${courseId}`);
// // // // // // // // //                             setCompletedLessonIds(resProgress.completedLessons || []);

// // // // // // // // //                             try {
// // // // // // // // //                                 const resPart = await api(`/api/courses/${courseId}/participants`);
// // // // // // // // //                                 const userList = resPart.participants?.map((p: any) => p.user) || [];
// // // // // // // // //                                 setCourseParticipants(userList);
// // // // // // // // //                             } catch (e) { console.error("Gagal load peserta chat", e); }
// // // // // // // // //                         }
// // // // // // // // //                     }
// // // // // // // // //                 } catch (e) { console.error("Enroll check failed", e); }
// // // // // // // // //             }
// // // // // // // // //             if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
// // // // // // // // //           } catch (e) { console.error("Init failed", e); } finally { setLoading(false); }
// // // // // // // // //         };
// // // // // // // // //         if (courseId) initData();
// // // // // // // // //     }, [courseId, user]);
    
// // // // // // // // //     // 2. LOGIKA TIMER & TOMBOL MULAI
// // // // // // // // //     useEffect(() => {
// // // // // // // // //         setTimerSeconds(null);
// // // // // // // // //         if (activeLesson) {
// // // // // // // // //             if (!activeLesson.quizDuration || activeLesson.quizDuration <= 0 || completedLessonIds.includes(activeLesson._id)) {
// // // // // // // // //                 setIsStarted(true);
// // // // // // // // //                 return;
// // // // // // // // //             }
// // // // // // // // //             const storageKey = `timer_${user?.id}_${activeLesson._id}`;
// // // // // // // // //             const storedEndTime = localStorage.getItem(storageKey);
// // // // // // // // //             if (storedEndTime) {
// // // // // // // // //                 const endTime = parseInt(storedEndTime, 10);
// // // // // // // // //                 if (endTime > Date.now()) {
// // // // // // // // //                     setIsStarted(true); 
// // // // // // // // //                     startTicker(endTime); 
// // // // // // // // //                 } else {
// // // // // // // // //                     localStorage.removeItem(storageKey);
// // // // // // // // //                     setIsStarted(true); 
// // // // // // // // //                     setTimerSeconds(0);
// // // // // // // // //                 }
// // // // // // // // //             } else {
// // // // // // // // //                 setIsStarted(false);
// // // // // // // // //             }
// // // // // // // // //         }
// // // // // // // // //     }, [activeLesson, completedLessonIds, user]);

// // // // // // // // //     const startTicker = (endTime: number) => {
// // // // // // // // //         const update = () => {
// // // // // // // // //             const now = Date.now();
// // // // // // // // //             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
// // // // // // // // //             setTimerSeconds(remaining);
// // // // // // // // //         };
// // // // // // // // //         update(); 
// // // // // // // // //         const interval = setInterval(() => {
// // // // // // // // //             const now = Date.now();
// // // // // // // // //             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
// // // // // // // // //             setTimerSeconds(remaining);
// // // // // // // // //             if (remaining <= 0) clearInterval(interval);
// // // // // // // // //         }, 1000);
// // // // // // // // //         return interval;
// // // // // // // // //     };

// // // // // // // // //     const handleStartLesson = () => {
// // // // // // // // //         setIsStarted(true);
// // // // // // // // //         if (activeLesson.quizDuration > 0) {
// // // // // // // // //             const endTime = Date.now() + activeLesson.quizDuration * 60 * 1000;
// // // // // // // // //             localStorage.setItem(`timer_${user?.id}_${activeLesson._id}`, endTime.toString());
// // // // // // // // //             startTicker(endTime);
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     const formatTimer = (seconds: number) => {
// // // // // // // // //         const m = Math.floor(seconds / 60);
// // // // // // // // //         const s = seconds % 60;
// // // // // // // // //         return `${m}:${s < 10 ? '0' : ''}${s}`;
// // // // // // // // //     };

// // // // // // // // //     useEffect(() => {
// // // // // // // // //         if (course && !loading) {
// // // // // // // // //             let total = 0; let completed = 0;
// // // // // // // // //             course.modules?.forEach((m: any) => { 
// // // // // // // // //                 if(m.isActive) {
// // // // // // // // //                     m.lessons?.forEach((l: any) => { 
// // // // // // // // //                         if(l.isActive) { 
// // // // // // // // //                             total++; 
// // // // // // // // //                             if (completedLessonIds.includes(l._id)) completed++; 
// // // // // // // // //                         } 
// // // // // // // // //                     });
// // // // // // // // //                 }
// // // // // // // // //             });
// // // // // // // // //             const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
// // // // // // // // //             setProgressPercent(percent);
// // // // // // // // //         }
// // // // // // // // //     }, [completedLessonIds, course, loading]);
    
// // // // // // // // //     useEffect(() => {
// // // // // // // // //           setUploadedFile(null);
// // // // // // // // //           setPollSelected(null);
// // // // // // // // //           setIsSubmitting(false);
// // // // // // // // //           setIsReuploading(false); 
// // // // // // // // //           if (activeLesson?.type === 'essay' && activeLesson.questions) {
// // // // // // // // //               setEssayAnswers(new Array(activeLesson.questions.length).fill(''));
// // // // // // // // //           } else {
// // // // // // // // //               setEssayAnswers([]);
// // // // // // // // //           }
// // // // // // // // //     }, [activeLesson]);

// // // // // // // // //     const handleEssayChange = (index: number, value: string) => {
// // // // // // // // //         const newAnswers = [...essayAnswers];
// // // // // // // // //         newAnswers[index] = value;
// // // // // // // // //         setEssayAnswers(newAnswers);
// // // // // // // // //     };

// // // // // // // // //     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //         const file = e.target.files?.[0];
// // // // // // // // //         if (!file) return;
// // // // // // // // //         if (file.size > 10 * 1024 * 1024) {
// // // // // // // // //             alert(`File terlalu besar (${(file.size / 1024 / 1024).toFixed(2)} MB).\nMaksimal upload 10 MB agar tidak ditolak server.`);
// // // // // // // // //             e.target.value = ''; 
// // // // // // // // //             return;
// // // // // // // // //         }
// // // // // // // // //         setUploadedFile(file);
// // // // // // // // //     };

// // // // // // // // //     const markLessonAsComplete = async (lessonId: string, extraData: any = {}) => {
// // // // // // // // //         try { 
// // // // // // // // //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId, ...extraData } }); 
// // // // // // // // //             if (!completedLessonIds.includes(lessonId)) {
// // // // // // // // //                 setCompletedLessonIds(prev => [...prev, lessonId]); 
// // // // // // // // //             }
// // // // // // // // //             if(user) localStorage.removeItem(`timer_${user.id}_${lessonId}`);
// // // // // // // // //         } catch(e) { console.error("Save progress failed", e); throw e; }
// // // // // // // // //     };
    
// // // // // // // // //     const handleNextLesson = () => {
// // // // // // // // //         const allLessons: any[] = [];
// // // // // // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // // // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // // // //         if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // // // // // // // //         else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // // // // // // // //     };
    
// // // // // // // // //     const handlePrevLesson = () => {
// // // // // // // // //         const allLessons: any[] = [];
// // // // // // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // // // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // // // //         if (currIdx > 0) { setActiveLesson(allLessons[currIdx - 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }
// // // // // // // // //     };

// // // // // // // // //     const handleManualComplete = async () => { 
// // // // // // // // //         await markLessonAsComplete(activeLesson._id); 
// // // // // // // // //         handleNextLesson(); 
// // // // // // // // //     };
    
// // // // // // // // //     const handleQuizCompleted = async (result: { score: number, attempts: number }) => { 
// // // // // // // // //         try {
// // // // // // // // //             await markLessonAsComplete(activeLesson._id, { 
// // // // // // // // //                 score: result.score, 
// // // // // // // // //                 attempts: result.attempts 
// // // // // // // // //             });
// // // // // // // // //             if (!completedLessonIds.includes(activeLesson._id)) {
// // // // // // // // //                 setCompletedLessonIds(prev => [...prev, activeLesson._id]); 
// // // // // // // // //             }
// // // // // // // // //         } catch (e) { console.error("Gagal simpan skor kuis", e); }
// // // // // // // // //     };
    
// // // // // // // // //     // --- [FIXED FINAL] HANDLE SUBMIT TASK (Smart URL Extraction) ---
// // // // // // // // //     const handleSubmitTask = async () => {
// // // // // // // // //         setIsSubmitting(true);
// // // // // // // // //         try {
// // // // // // // // //             if (activeLesson.type === 'essay') {
// // // // // // // // //                 if (essayAnswers.some(ans => ans.trim() === '')) throw new Error("Mohon jawab semua pertanyaan.");
// // // // // // // // //                 await api(`/api/progress/${courseId}/submit-essay`, { 
// // // // // // // // //                     method: 'POST', 
// // // // // // // // //                     body: { lessonId: activeLesson._id, answers: essayAnswers } 
// // // // // // // // //                 });
// // // // // // // // //             } else if (activeLesson.type === 'upload_doc' || activeLesson.type === 'image') {
// // // // // // // // //                 if (!uploadedFile) throw new Error("Pilih file terlebih dahulu.");
                
// // // // // // // // //                 // 1. Upload ke Backend
// // // // // // // // //                 const fd = new FormData();
// // // // // // // // //                 fd.append('file', uploadedFile);
                
// // // // // // // // //                 // Gunakan 'any' agar TS tidak rewel soal struktur
// // // // // // // // //                 const uploadRes: any = await apiUpload('/api/upload', fd); 
                
// // // // // // // // //                 // 2. DEBUGGING & EKSTRAKSI URL CERDAS
// // // // // // // // //                 // Cek console browser (F12) untuk melihat struktur asli respons
// // // // // // // // //                 console.log("Upload Response Full:", uploadRes);

// // // // // // // // //                 let fileUrl = "";

// // // // // // // // //                 // SKENARIO 1: Struktur { data: { url: "..." } } (Sesuai Controller Anda)
// // // // // // // // //                 if (uploadRes.data && uploadRes.data.url) {
// // // // // // // // //                     fileUrl = uploadRes.data.url;
// // // // // // // // //                 }
// // // // // // // // //                 // SKENARIO 2: Struktur { url: "..." }
// // // // // // // // //                 else if (uploadRes.url) {
// // // // // // // // //                     fileUrl = uploadRes.url;
// // // // // // // // //                 }
// // // // // // // // //                 // SKENARIO 3: Struktur { file: { path: "..." } }
// // // // // // // // //                 else if (uploadRes.file && uploadRes.file.path) {
// // // // // // // // //                     fileUrl = uploadRes.file.path;
// // // // // // // // //                 }
// // // // // // // // //                 // SKENARIO 4: Struktur { file: { secure_url: "..." } }
// // // // // // // // //                 else if (uploadRes.file && uploadRes.file.secure_url) {
// // // // // // // // //                     fileUrl = uploadRes.file.secure_url;
// // // // // // // // //                 }

// // // // // // // // //                 // 3. Validasi Akhir
// // // // // // // // //                 if (!fileUrl) {
// // // // // // // // //                     // Tampilkan pesan error detail (bisa dilihat di alert)
// // // // // // // // //                     throw new Error(`Gagal membaca URL. Response server tidak memiliki field url yang dikenali. Cek Console.`);
// // // // // // // // //                 }

// // // // // // // // //                 // 4. Kirim URL Valid ke Database Progress
// // // // // // // // //                 await api(`/api/progress/${courseId}/submit-task`, { 
// // // // // // // // //                     method: 'POST', 
// // // // // // // // //                     body: { 
// // // // // // // // //                         lessonId: activeLesson._id, 
// // // // // // // // //                         fileUrl: fileUrl, 
// // // // // // // // //                         fileName: uploadedFile.name 
// // // // // // // // //                     } 
// // // // // // // // //                 });

// // // // // // // // //             } else if (activeLesson.type === 'poll') {
// // // // // // // // //                 if (pollSelected === null) throw new Error("Pilih salah satu opsi.");
// // // // // // // // //                 const answerText = activeLesson.pollOptions[pollSelected];
// // // // // // // // //                 await markLessonAsComplete(activeLesson._id, { pollAnswer: answerText });
// // // // // // // // //             } else {
// // // // // // // // //                 await markLessonAsComplete(activeLesson._id);
// // // // // // // // //             }

// // // // // // // // //             if (!completedLessonIds.includes(activeLesson._id)) {
// // // // // // // // //                 setCompletedLessonIds(prev => [...prev, activeLesson._id]);
// // // // // // // // //             }
// // // // // // // // //             setIsReuploading(false);
// // // // // // // // //             alert("Berhasil dikirim!");
// // // // // // // // //             handleNextLesson();
// // // // // // // // //         } catch (e: any) { 
// // // // // // // // //             console.error("Submit Error:", e);
// // // // // // // // //             alert("Gagal mengirim: " + e.message); 
// // // // // // // // //         } finally { 
// // // // // // // // //             setIsSubmitting(false); 
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     const renderContentHeader = (title: string) => (
// // // // // // // // //         <div className="mb-6 border-b border-gray-100 pb-4">
// // // // // // // // //             <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// // // // // // // // //                 <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 flex items-center gap-1">
// // // // // // // // //                     {activeLesson?.type?.replace(/_/g, ' ') || 'MATERI'}
// // // // // // // // //                 </span>
// // // // // // // // //             </div>
// // // // // // // // //             <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
// // // // // // // // //                 <h1 className="text-gray-900 font-bold text-2xl flex-1 leading-tight">{title}</h1>
// // // // // // // // //                 <div className="flex-shrink-0 flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
// // // // // // // // //                     {activeLesson.quizDuration > 0 && (
// // // // // // // // //                         <div className={`flex items-center gap-1 px-2 py-0.5 rounded border ${timerSeconds !== null && timerSeconds < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
// // // // // // // // //                             <Clock size={14} /> 
// // // // // // // // //                             <span className="font-bold text-sm">
// // // // // // // // //                                 {timerSeconds !== null 
// // // // // // // // //                                     ? `Sisa: ${formatTimer(timerSeconds)}` 
// // // // // // // // //                                     : `${activeLesson.quizDuration} Menit`
// // // // // // // // //                                 }
// // // // // // // // //                             </span>
// // // // // // // // //                         </div>
// // // // // // // // //                     )}
// // // // // // // // //                     <div className="flex items-center gap-1"><Users size={12} className="text-indigo-500"/> <span>{getFacilitatorName(activeLesson.facilitatorId, courseFacilitators)}</span></div>
// // // // // // // // //                     {activeLesson.jp > 0 && <div className="flex items-center gap-1 border-l pl-3"><Clock size={12} className="text-indigo-500"/> <span>{activeLesson.jp} JP</span></div>}
// // // // // // // // //                     {(activeLesson.scheduleDate) && <div className="flex items-center gap-1 border-l pl-3"><Calendar size={12} className="text-indigo-500"/> <span>{formatDate(activeLesson.scheduleDate)}</span></div>}
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //     );

// // // // // // // // //     const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
// // // // // // // // //         if (activeLesson.quizDuration > 0 && !isStarted && !completedLessonIds.includes(activeLesson._id)) {
// // // // // // // // //             return (
// // // // // // // // //                 <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-200 text-center min-h-[300px] animate-in fade-in zoom-in duration-300">
// // // // // // // // //                     <div className="bg-indigo-100 p-5 rounded-full mb-6 text-indigo-600 shadow-inner">
// // // // // // // // //                         <Clock size={48} />
// // // // // // // // //                     </div>
// // // // // // // // //                     <h2 className="text-2xl font-bold text-gray-800 mb-3">Materi dengan Batas Waktu</h2>
// // // // // // // // //                     <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
// // // // // // // // //                         Materi <strong>"{activeLesson.title}"</strong> memiliki batas waktu pengerjaan selama <span className="font-bold text-gray-800">{activeLesson.quizDuration} Menit</span>. 
// // // // // // // // //                         <br/><span className="text-xs text-red-500 mt-2 block">*Waktu akan berjalan otomatis setelah Anda menekan tombol di bawah.</span>
// // // // // // // // //                     </p>
// // // // // // // // //                     <button onClick={handleStartLesson} className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95">
// // // // // // // // //                         <Play size={20} fill="currentColor" /> Mulai Kerjakan Sekarang
// // // // // // // // //                     </button>
// // // // // // // // //                 </div>
// // // // // // // // //             );
// // // // // // // // //         }
        
// // // // // // // // //         if (timerSeconds !== null && timerSeconds <= 0 && !completedLessonIds.includes(activeLesson._id)) {
// // // // // // // // //              return (
// // // // // // // // //                 <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-xl shadow-sm border border-red-200 text-center min-h-[300px]">
// // // // // // // // //                     <div className="bg-red-100 p-4 rounded-full mb-4 text-red-600">
// // // // // // // // //                         <AlertCircle size={40} />
// // // // // // // // //                     </div>
// // // // // // // // //                     <h2 className="text-xl font-bold text-red-800 mb-2">Waktu Habis!</h2>
// // // // // // // // //                     <p className="text-red-600 mb-6">Waktu pengerjaan untuk materi ini telah berakhir.</p>
// // // // // // // // //                     <button onClick={handleNextLesson} className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">Lanjut Materi Berikutnya</button>
// // // // // // // // //                 </div>
// // // // // // // // //              );
// // // // // // // // //         }

// // // // // // // // //         return <>{children}</>;
// // // // // // // // //     };

// // // // // // // // //     const renderContent = () => {
// // // // // // // // //         if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping.</div>;
        
// // // // // // // // //         const isLessonCompleted = completedLessonIds.includes(activeLesson._id);

// // // // // // // // //         const content = (
// // // // // // // // //             <>
// // // // // // // // //                 {activeLesson.type === 'quiz' && (
// // // // // // // // //                     <QuizPlayer 
// // // // // // // // //                         quizId={activeLesson._id} 
// // // // // // // // //                         courseId={courseId} 
// // // // // // // // //                         lessonData={activeLesson}
// // // // // // // // //                         onComplete={handleQuizCompleted} 
// // // // // // // // //                     />
// // // // // // // // //                 )}
                
// // // // // // // // //                 {activeLesson.type === 'image' && (
// // // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // //                         <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
// // // // // // // // //                             <img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="w-full h-auto object-contain" />
// // // // // // // // //                         </div>
// // // // // // // // //                         {activeLesson.content && <div className="prose max-w-none mt-6 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />}
// // // // // // // // //                     </div>
// // // // // // // // //                 )}

// // // // // // // // //                 {(activeLesson.type === 'slide' || activeLesson.type === 'download_doc') && (
// // // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // //                         <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center mb-6">
// // // // // // // // //                             <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4"><FileText size={32} /></div>
// // // // // // // // //                             <h3 className="text-lg font-bold text-gray-800 mb-2">{activeLesson.title}</h3>
// // // // // // // // //                             <p className="text-sm text-gray-500 mb-6">Dokumen Materi Pembelajaran.</p>
// // // // // // // // //                             <a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-transform active:scale-95" aria-label="Download File">
// // // // // // // // //                                 <Download size={18} /> Download Materi
// // // // // // // // //                             </a>
// // // // // // // // //                         </div>
// // // // // // // // //                         {activeLesson.fileUrl && activeLesson.fileUrl.endsWith('.pdf') && (
// // // // // // // // //                             <div className="mt-8 border rounded-xl overflow-hidden h-[800px] shadow-sm">
// // // // // // // // //                                 <iframe src={getImageUrl(activeLesson.fileUrl)} className="w-full h-full" title="Preview"></iframe>
// // // // // // // // //                             </div>
// // // // // // // // //                         )}
// // // // // // // // //                     </div>
// // // // // // // // //                 )}

// // // // // // // // //                 {activeLesson.type === 'video_url' && (
// // // // // // // // //                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // //                         <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
// // // // // // // // //                             <iframe 
// // // // // // // // //                                 src={activeLesson.videoUrl?.includes('youtu') ? `https://www.youtube.com/embed/${activeLesson.videoUrl.split('/').pop().replace('watch?v=', '')}` : activeLesson.videoUrl} 
// // // // // // // // //                                 className="w-full h-full" 
// // // // // // // // //                                 allowFullScreen 
// // // // // // // // //                                 title={`Video ${activeLesson.title}`} 
// // // // // // // // //                             />
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 )}

// // // // // // // // //                 {activeLesson.type === 'virtual_class' && (
// // // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // //                         <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
// // // // // // // // //                             <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"><Video size={40}/></div>
// // // // // // // // //                             <h3 className="text-xl font-bold text-gray-900 mb-2">Kelas Virtual (Zoom/Meet)</h3>
// // // // // // // // //                             <p className="text-gray-600 mb-6">Silakan bergabung ke pertemuan virtual melalui tombol di bawah ini.</p>
                            
// // // // // // // // //                             {(activeLesson.meetingLink || activeLesson.content) ? (
// // // // // // // // //                                 <div className="space-y-3">
// // // // // // // // //                                     <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg">
// // // // // // // // //                                         <Video size={20}/> Gabung Meeting
// // // // // // // // //                                     </a>
// // // // // // // // //                                     <div className="text-xs text-gray-500">
// // // // // // // // //                                         Link: <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" className="text-purple-600 underline">{activeLesson.meetingLink || activeLesson.content}</a>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 </div>
// // // // // // // // //                             ) : (
// // // // // // // // //                                 <button disabled className="inline-flex items-center gap-2 bg-gray-400 text-white px-8 py-3 rounded-full font-bold cursor-not-allowed">
// // // // // // // // //                                     <Video size={20}/> Link Belum Tersedia
// // // // // // // // //                                 </button>
// // // // // // // // //                             )}
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 )}
                
// // // // // // // // //                 {activeLesson.type === 'google_classroom' && (
// // // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // // //                         <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
// // // // // // // // //                             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border"><School size={40} className="text-green-600"/></div>
// // // // // // // // //                             <h3 className="text-xl font-bold text-gray-900 mb-2">Google Classroom</h3>
// // // // // // // // //                             <p className="text-gray-600 mb-2">Materi ini terhubung dengan Google Classroom.</p>
// // // // // // // // //                             {activeLesson.classroomData ? (
// // // // // // // // //                                 <div className="mt-4">
// // // // // // // // //                                     <p className="font-bold text-lg">{activeLesson.classroomData.name}</p>
// // // // // // // // //                                     <p className="text-sm text-gray-500 mb-6">Kode Kelas: <span className="font-mono bg-white px-2 py-1 border rounded">{activeLesson.classroomData.enrollmentCode || '-'}</span></p>
// // // // // // // // //                                     <a href={activeLesson.classroomData.alternateLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 shadow-lg">Buka Google Classroom ↗</a>
// // // // // // // // //                                 </div>
// // // // // // // // //                             ) : <p className="text-red-500 italic">Data kelas tidak ditemukan.</p>}
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 )}

// // // // // // // // //                 {['essay', 'upload_doc', 'image', 'poll', 'lesson'].includes(activeLesson.type) && (
// // // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6">
// // // // // // // // //                         {activeLesson.content && activeLesson.type !== 'image' && (
// // // // // // // // //                             <div className="prose max-w-none mb-8 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
// // // // // // // // //                         )}
                        
// // // // // // // // //                         {activeLesson.type === 'essay' && (
// // // // // // // // //                             <div className="space-y-6">
// // // // // // // // //                                 {activeLesson.questions?.map((q:any,i:number)=>(
// // // // // // // // //                                     <div key={i} className="border p-4 rounded-lg bg-gray-50">
// // // // // // // // //                                             <div className="font-bold mb-2 text-sm text-gray-700 flex gap-2">
// // // // // // // // //                                                 <span>{i+1}.</span>
// // // // // // // // //                                                 <div dangerouslySetInnerHTML={{ __html: q.question }} />
// // // // // // // // //                                             </div>
// // // // // // // // //                                             <div className="bg-white">
// // // // // // // // //                                                 <ReactQuill theme="snow" value={essayAnswers[i]||''} onChange={(v)=>handleEssayChange(i,v)} placeholder="Tulis jawaban..."/>
// // // // // // // // //                                             </div>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 ))}
// // // // // // // // //                                 <button onClick={handleSubmitTask} disabled={isSubmitting} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold w-full hover:bg-indigo-700 transition-colors" title="Kirim Jawaban" aria-label="Kirim Jawaban">{isSubmitting?'Mengirim...':'Kirim Jawaban'}</button>
// // // // // // // // //                             </div>
// // // // // // // // //                         )}
                        
// // // // // // // // //                         {/* UPDATE: UI UPLOAD (Cek sudah selesai atau belum) */}
// // // // // // // // //                         {(activeLesson.type === 'upload_doc' || activeLesson.type === 'image') && (
// // // // // // // // //                             <div className="border-2 border-dashed p-8 text-center rounded-xl bg-gray-50 border-indigo-200">
// // // // // // // // //                                 {/* JIKA SUDAH SELESAI DAN TIDAK SEDANG REVISI */}
// // // // // // // // //                                 {isLessonCompleted && !uploadedFile && !isReuploading ? (
// // // // // // // // //                                     <div className="animate-in fade-in zoom-in duration-300">
// // // // // // // // //                                         <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
// // // // // // // // //                                             <CheckCircle size={32} />
// // // // // // // // //                                         </div>
// // // // // // // // //                                         <h3 className="text-xl font-bold text-gray-800 mb-2">Tugas Sudah Dikirim!</h3>
// // // // // // // // //                                         <p className="text-gray-500 mb-6 text-sm">Anda telah menyelesaikan tugas ini.</p>
                                        
// // // // // // // // //                                         <button 
// // // // // // // // //                                             onClick={() => setIsReuploading(true)} 
// // // // // // // // //                                             className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-50 shadow-sm transition-colors text-sm"
// // // // // // // // //                                         >
// // // // // // // // //                                             Kirim Ulang / Ganti File
// // // // // // // // //                                         </button>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 ) : (
// // // // // // // // //                                     /* TAMPILAN FORM UPLOAD (Default atau Revisi) */
// // // // // // // // //                                     <>
// // // // // // // // //                                         {uploadedFile ? (
// // // // // // // // //                                             <div className="text-center w-full animate-in fade-in zoom-in duration-300">
// // // // // // // // //                                                  <div className="text-green-600 font-bold text-lg mb-2 flex items-center justify-center gap-2">
// // // // // // // // //                                                     <FileCheck className="w-8 h-8" />
// // // // // // // // //                                                     File Siap Upload!
// // // // // // // // //                                                  </div>
// // // // // // // // //                                                  <p className="text-gray-700 font-medium break-all mb-4 px-4 bg-white py-2 rounded border inline-block shadow-sm">
// // // // // // // // //                                                     {uploadedFile.name}
// // // // // // // // //                                                     <span className="block text-[10px] text-gray-400 font-normal">
// // // // // // // // //                                                         ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
// // // // // // // // //                                                     </span>
// // // // // // // // //                                                  </p>
// // // // // // // // //                                                  <div className="flex justify-center gap-3">
// // // // // // // // //                                                     <button 
// // // // // // // // //                                                         onClick={() => setUploadedFile(null)} 
// // // // // // // // //                                                         className="text-red-500 hover:text-red-700 text-sm font-bold underline"
// // // // // // // // //                                                     >
// // // // // // // // //                                                         Ganti File
// // // // // // // // //                                                     </button>
// // // // // // // // //                                                  </div>
// // // // // // // // //                                             </div>
// // // // // // // // //                                         ) : (
// // // // // // // // //                                             <>
// // // // // // // // //                                                 <UploadCloud className="mx-auto text-indigo-400 mb-2" size={32}/>
// // // // // // // // //                                                 <p className="text-sm text-gray-500 mb-4">Upload tugas Anda di sini (PDF/DOCX/JPG)</p>
// // // // // // // // //                                                 <label className="cursor-pointer bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 inline-flex items-center gap-2 transition-transform active:scale-95 shadow-md">
// // // // // // // // //                                                     <UploadCloud size={18}/> Pilih File
// // // // // // // // //                                                     <input 
// // // // // // // // //                                                         type="file" 
// // // // // // // // //                                                         className="hidden" 
// // // // // // // // //                                                         onChange={handleFileChange} 
// // // // // // // // //                                                         accept={activeLesson.type === 'image' ? "image/*" : ".pdf,.doc,.docx,.jpg,.jpeg,.png"}
// // // // // // // // //                                                     />
// // // // // // // // //                                                 </label>
// // // // // // // // //                                                 <p className="text-[10px] text-gray-400 mt-3">Maksimal Ukuran File: 10 MB</p>
// // // // // // // // //                                             </>
// // // // // // // // //                                         )}

// // // // // // // // //                                         <button 
// // // // // // // // //                                             onClick={handleSubmitTask} 
// // // // // // // // //                                             disabled={!uploadedFile || isSubmitting} 
// // // // // // // // //                                             className={`mt-6 px-10 py-3 mx-auto block rounded-xl font-bold text-white shadow-lg transition-all ${!uploadedFile ? 'bg-gray-300 cursor-not-allowed hidden' : 'bg-green-600 hover:bg-green-700 hover:scale-[1.02]'}`}
// // // // // // // // //                                             title="Upload Tugas" 
// // // // // // // // //                                             aria-label="Upload Tugas"
// // // // // // // // //                                         >
// // // // // // // // //                                             {isSubmitting ? 'Sedang Mengirim...' : 'Kirim Tugas Sekarang'}
// // // // // // // // //                                         </button>
                                        
// // // // // // // // //                                         {/* Tombol batal jika sedang revisi */}
// // // // // // // // //                                         {isReuploading && !uploadedFile && (
// // // // // // // // //                                             <button 
// // // // // // // // //                                                 onClick={() => setIsReuploading(false)} 
// // // // // // // // //                                                 className="mt-4 text-xs text-gray-500 hover:text-gray-700 underline"
// // // // // // // // //                                             >
// // // // // // // // //                                                 Batal, kembali ke status selesai
// // // // // // // // //                                             </button>
// // // // // // // // //                                         )}
// // // // // // // // //                                     </>
// // // // // // // // //                                 )}
// // // // // // // // //                             </div>
// // // // // // // // //                         )}
                        
// // // // // // // // //                         {activeLesson.type === 'poll' && (
// // // // // // // // //                             <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
// // // // // // // // //                                 <h3 className="font-bold text-lg mb-4">{activeLesson.pollQuestion || "Polling"}</h3>
// // // // // // // // //                                 <div className="space-y-3 max-w-sm mx-auto">
// // // // // // // // //                                     {activeLesson.pollOptions?.map((opt:string, idx:number) => (
// // // // // // // // //                                         <button key={idx} onClick={()=>setPollSelected(idx)} className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${pollSelected===idx ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-100 border-gray-300'}`} title={`Pilih ${opt}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>
// // // // // // // // //                                     ))}
// // // // // // // // //                                 </div>
// // // // // // // // //                                 <button onClick={handleSubmitTask} disabled={pollSelected===null||isSubmitting} className="mt-6 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition-colors" title="Kirim Polling" aria-label="Kirim Polling">Kirim Polling</button>
// // // // // // // // //                             </div>
// // // // // // // // //                         )}
// // // // // // // // //                     </div>
// // // // // // // // //                 )}
// // // // // // // // //             </>
// // // // // // // // //         );

// // // // // // // // //         return (
// // // // // // // // //             <div>
// // // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // // //                 <ContentWrapper>
// // // // // // // // //                     {content}
// // // // // // // // //                 </ContentWrapper>
// // // // // // // // //             </div>
// // // // // // // // //         );
// // // // // // // // //     };
  
// // // // // // // // //     if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // // // // // // //     if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;
  
// // // // // // // // //     if (!isEnrolled || enrollmentStatus === 'pending') {
// // // // // // // // //         return (
// // // // // // // // //           <div className="min-h-screen bg-gray-50 pb-20">
// // // // // // // // //               {showRegisterModal && (
// // // // // // // // //                   <CourseRegistrationModal 
// // // // // // // // //                     courseId={courseId} 
// // // // // // // // //                     courseTitle={course.title} 
// // // // // // // // //                     programType={course.programType} 
// // // // // // // // //                     user={user} 
// // // // // // // // //                     onClose={() => setShowRegisterModal(false)} 
// // // // // // // // //                     onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil! Menunggu Verifikasi."); window.location.reload(); }} 
// // // // // // // // //                   />
// // // // // // // // //               )}
              
// // // // // // // // //               {/* HERO SECTION */}
// // // // // // // // //               <div className="relative bg-gray-900 text-white">
// // // // // // // // //                   <div className="absolute inset-0 bg-black/60 z-0"></div>
// // // // // // // // //                   {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" alt="" />}
                  
// // // // // // // // //                   <div className="max-w-6xl mx-auto px-6 py-24 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
// // // // // // // // //                       <div className="lg:col-span-2 space-y-6">
// // // // // // // // //                           <div className="flex items-center gap-3">
// // // // // // // // //                               <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${course.programType === 'training' ? 'bg-orange-500' : 'bg-blue-500'}`}>
// // // // // // // // //                                   {course.programType === 'training' ? 'Diklat / Pelatihan' : 'Kursus Mandiri'}
// // // // // // // // //                               </span>
// // // // // // // // //                               {course.category && <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">{course.category}</span>}
// // // // // // // // //                           </div>
                          
// // // // // // // // //                           <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{course.title}</h1>
                          
// // // // // // // // //                           <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300 pt-2">
// // // // // // // // //                               <div className="flex items-center gap-2"><Users size={18}/> {courseFacilitators.length} Fasilitator</div>
// // // // // // // // //                               <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
// // // // // // // // //                               <div className="flex items-center gap-2"><Clock size={18}/> {course.programType === 'training' ? 'Terjadwal' : 'Fleksibel'}</div>
// // // // // // // // //                               {course.certificateConfig && <div className="flex items-center gap-2 text-yellow-400"><Award size={18}/> Sertifikat Tersedia</div>}
// // // // // // // // //                           </div>
// // // // // // // // //                       </div>

// // // // // // // // //                       {/* CARD PENDAFTARAN */}
// // // // // // // // //                       <div className="lg:col-span-1">
// // // // // // // // //                           <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-100 sticky top-24">
// // // // // // // // //                               <div className="text-center mb-8">
// // // // // // // // //                                   <p className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Biaya Investasi</p>
// // // // // // // // //                                   <p className="text-4xl font-black text-green-600">
// // // // // // // // //                                       {course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}
// // // // // // // // //                                   </p>
// // // // // // // // //                               </div>

// // // // // // // // //                               {enrollmentStatus === 'pending' ? (
// // // // // // // // //                                   <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-center border border-yellow-200">
// // // // // // // // //                                       <h3 className="font-bold mb-1">Menunggu Verifikasi</h3>
// // // // // // // // //                                       <p className="text-xs">Pendaftaran Anda sedang diproses admin.</p>
// // // // // // // // //                                   </div>
// // // // // // // // //                               ) : (
// // // // // // // // //                                   <button 
// // // // // // // // //                                     onClick={() => setShowRegisterModal(true)} 
// // // // // // // // //                                     className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-lg"
// // // // // // // // //                                     title="Daftar Sekarang"
// // // // // // // // //                                     aria-label="Daftar Sekarang"
// // // // // // // // //                                   >
// // // // // // // // //                                       📝 Daftar Sekarang
// // // // // // // // //                                   </button>
// // // // // // // // //                               )}
                              
// // // // // // // // //                               <p className="text-xs text-center text-gray-400 mt-4">
// // // // // // // // //                                   *Akses selamanya setelah terdaftar
// // // // // // // // //                               </p>
// // // // // // // // //                           </div>
// // // // // // // // //                       </div>
// // // // // // // // //                   </div>
// // // // // // // // //               </div>

// // // // // // // // //               {/* DETAIL CONTENT */}
// // // // // // // // //               <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
// // // // // // // // //                   <div className="lg:col-span-2 space-y-12">
// // // // // // // // //                       {/* DESKRIPSI */}
// // // // // // // // //                       <section>
// // // // // // // // //                           <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="text-red-600"/> Tentang Program Ini</h3>
// // // // // // // // //                           <div className="prose max-w-none text-gray-600 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm" dangerouslySetInnerHTML={{ __html: course.description || "<p>Belum ada deskripsi.</p>" }} />
// // // // // // // // //                       </section>

// // // // // // // // //                       {/* KURIKULUM */}
// // // // // // // // //                       <section>
// // // // // // // // //                           <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="text-red-600"/> Kurikulum & Materi</h3>
// // // // // // // // //                           <div className="space-y-4">
// // // // // // // // //                               {course.modules?.map((mod: any, idx: number) => (
// // // // // // // // //                                   <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
// // // // // // // // //                                       <div className="bg-gray-50 px-6 py-4 border-b font-bold text-gray-800 flex justify-between">
// // // // // // // // //                                           <span>Modul {idx + 1}: {mod.title}</span>
// // // // // // // // //                                           <span className="text-xs font-normal text-gray-500 bg-white px-2 py-1 rounded border">{mod.lessons?.length || 0} Materi</span>
// // // // // // // // //                                       </div>
// // // // // // // // //                                       <div className="divide-y">
// // // // // // // // //                                           {mod.lessons?.map((les: any, lIdx: number) => (
// // // // // // // // //                                               <div key={lIdx} className="px-6 py-3 flex items-center gap-3 text-sm text-gray-600">
// // // // // // // // //                                                   {les.type === 'video_url' ? <PlayCircle size={16} className="text-blue-500"/> : <FileText size={16} className="text-gray-400"/>}
// // // // // // // // //                                                   {les.title}
// // // // // // // // //                                                   {les.jp > 0 && <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{les.jp} JP</span>}
// // // // // // // // //                                               </div>
// // // // // // // // //                                           ))}
// // // // // // // // //                                       </div>
// // // // // // // // //                                   </div>
// // // // // // // // //                               ))}
// // // // // // // // //                           </div>
// // // // // // // // //                       </section>
// // // // // // // // //                   </div>

// // // // // // // // //                   {/* SIDEBAR INFO */}
// // // // // // // // //                   <div className="space-y-8">
// // // // // // // // //                       {/* FASILITATOR */}
// // // // // // // // //                       <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
// // // // // // // // //                           <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Users className="text-red-600"/> Tim Fasilitator</h4>
// // // // // // // // //                           <div className="space-y-4">
// // // // // // // // //                               {courseFacilitators.map((fac: any) => (
// // // // // // // // //                                   <div key={fac._id} className="flex items-center gap-3">
// // // // // // // // //                                       {fac.avatarUrl ? (
// // // // // // // // //                                           <img src={getImageUrl(fac.avatarUrl)} className="w-10 h-10 rounded-full object-cover border" alt={fac.name}/>
// // // // // // // // //                                       ) : (
// // // // // // // // //                                           <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">{fac.name.charAt(0)}</div>
// // // // // // // // //                                       )}
// // // // // // // // //                                       <div>
// // // // // // // // //                                           <p className="font-bold text-sm text-gray-800">{fac.name}</p>
// // // // // // // // //                                           <p className="text-xs text-gray-500">Fasilitator</p>
// // // // // // // // //                                       </div>
// // // // // // // // //                                   </div>
// // // // // // // // //                               ))}
// // // // // // // // //                               {courseFacilitators.length === 0 && <p className="text-sm text-gray-500 italic">Belum ditentukan.</p>}
// // // // // // // // //                           </div>
// // // // // // // // //                       </section>

// // // // // // // // //                       {/* INFO TAMBAHAN */}
// // // // // // // // //                       <section className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
// // // // // // // // //                           <h4 className="font-bold text-indigo-900 mb-4">Fasilitas Program</h4>
// // // // // // // // //                           <ul className="space-y-3 text-sm text-indigo-800">
// // // // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Akses Materi Seumur Hidup</li>
// // // // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Grup Diskusi Eksklusif</li>
// // // // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Sertifikat Kelulusan</li>
// // // // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Konsultasi Fasilitator</li>
// // // // // // // // //                           </ul>
// // // // // // // // //                       </section>
// // // // // // // // //                   </div>
// // // // // // // // //               </div>
// // // // // // // // //           </div>
// // // // // // // // //         );
// // // // // // // // //     }
  
// // // // // // // // //     // TAMPILAN DASHBOARD BELAJAR
// // // // // // // // //     const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;
  
// // // // // // // // //     return (
// // // // // // // // //       <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // // // // // // // //         <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
// // // // // // // // //           <div className="p-5 border-b bg-white">
// // // // // // // // //               <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" title="Kembali ke Katalog" aria-label="Kembali"><span>←</span> KEMBALI KE KATALOG</Link>
// // // // // // // // //               <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
// // // // // // // // //               <div className="space-y-2">
// // // // // // // // //                   <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{safePercent}%</span></div>
// // // // // // // // //                   <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: `${safePercent}%`}}></div></div>
// // // // // // // // //               </div>
// // // // // // // // //               <button onClick={() => setShowPersonalChat(true)} className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50" title="Hubungi Pengajar" aria-label="Hubungi Pengajar">
// // // // // // // // //                   <MessageCircle size={16}/> Hubungi Pengajar
// // // // // // // // //               </button>
// // // // // // // // //           </div>
// // // // // // // // //           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
// // // // // // // // //               {course.modules?.map((mod:any, i:number)=>(
// // // // // // // // //                   <div key={mod._id}>
// // // // // // // // //                       <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
// // // // // // // // //                       <div className="space-y-1">
// // // // // // // // //                           {mod.lessons?.map((les:any) => (
// // // // // // // // //                               <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`} title={`Buka Materi ${les.title}`} aria-label={`Buka Materi ${les.title}`}>
// // // // // // // // //                                   {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
// // // // // // // // //                                   {les.title}
// // // // // // // // //                               </button>
// // // // // // // // //                           ))}
// // // // // // // // //                       </div>
// // // // // // // // //                   </div>
// // // // // // // // //               ))}
// // // // // // // // //           </div>
// // // // // // // // //         </aside>
  
// // // // // // // // //         <main className="flex-1 flex flex-col relative h-full overflow-hidden bg-gray-50">
// // // // // // // // //           <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
// // // // // // // // //               <button type="button" onClick={()=>setIsSidebarOpen(!isSidebarOpen)} aria-label="Menu" title="Menu"><Menu/></button>
// // // // // // // // //           </div>
// // // // // // // // //           <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
// // // // // // // // //               {renderContent()}
// // // // // // // // //           </div>
// // // // // // // // //           <div className="fixed bottom-8 right-8 flex gap-3 z-30">
// // // // // // // // //               <button type="button" onClick={handlePrevLesson} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105" title="Materi Sebelumnya" aria-label="Materi Sebelumnya"><ChevronLeft/></button>
// // // // // // // // //               <button type="button" onClick={handleManualComplete} className="h-12 px-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 font-bold hover:scale-105" title="Lanjut Materi" aria-label="Lanjut Materi"><span>Lanjut</span><ChevronRight/></button>
// // // // // // // // //           </div>
// // // // // // // // //         </main>
        
// // // // // // // // //         {showPersonalChat && <ChatWithFacilitatorModal facilitators={courseFacilitators} onClose={() => setShowPersonalChat(false)} />}
  
// // // // // // // // //         {user && (
// // // // // // // // //           <CourseGroupChat 
// // // // // // // // //               courseId={courseId} 
// // // // // // // // //               currentUser={user} 
// // // // // // // // //               participants={courseParticipants} 
// // // // // // // // //               facilitators={courseFacilitators} 
// // // // // // // // //               isFloating={true} 
// // // // // // // // //           />
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // // }
// // // // // // // // 'use client';

// // // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // import Link from 'next/link';
// // // // // // // // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // // // // // import CourseGroupChat from '@/components/CourseGroupChat'; 
// // // // // // // // import { 
// // // // // // // //     Users, Clock, MessageCircle, ChevronLeft, ChevronRight, Menu, Send, X,
// // // // // // // //     FileText, PlayCircle, CheckCircle, UploadCloud, Calendar, Download, 
// // // // // // // //     Image as ImageIcon, Video, School, MonitorPlay, BookOpen, Play, AlertCircle, Award, FileCheck 
// // // // // // // // } from 'lucide-react';
// // // // // // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';
// // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // import 'react-quill/dist/quill.snow.css';

// // // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // // //     ssr: false, 
// // // // // // // //     loading: () => <div className="h-24 bg-gray-50 animate-pulse rounded-lg border border-gray-200"></div> 
// // // // // // // // });

// // // // // // // // // --- HELPER FUNCTIONS ---
// // // // // // // // const getFacilitatorName = (activeFacilitatorId: any, facilitatorsList: any[]) => {
// // // // // // // //     if (!activeFacilitatorId) return '-';
// // // // // // // //     if (typeof activeFacilitatorId === 'object' && activeFacilitatorId.name) return activeFacilitatorId.name;
// // // // // // // //     const found = facilitatorsList.find(f => (f._id === activeFacilitatorId) || (f.id === activeFacilitatorId));
// // // // // // // //     return found ? found.name : 'Fasilitator';
// // // // // // // // };

// // // // // // // // const formatDate = (dateString: string) => {
// // // // // // // //     if (!dateString) return '-';
// // // // // // // //     return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // // // // // // };

// // // // // // // // // [FIX] Helper URL Video YouTube yang lebih kuat
// // // // // // // // const getEmbedUrl = (url: string) => {
// // // // // // // //     if (!url) return '';
    
// // // // // // // //     // Jika sudah format embed, kembalikan langsung
// // // // // // // //     if (url.includes('youtube.com/embed/')) return url;

// // // // // // // //     try {
// // // // // // // //         let videoId = '';
        
// // // // // // // //         // Handle youtu.be (short link)
// // // // // // // //         if (url.includes('youtu.be/')) {
// // // // // // // //             videoId = url.split('youtu.be/')[1]?.split('?')[0];
// // // // // // // //         }
// // // // // // // //         // Handle youtube.com/watch?v=
// // // // // // // //         else if (url.includes('youtube.com/watch')) {
// // // // // // // //             const urlParams = new URL(url).searchParams;
// // // // // // // //             videoId = urlParams.get('v') || '';
// // // // // // // //         }

// // // // // // // //         if (videoId) {
// // // // // // // //             return `https://www.youtube.com/embed/${videoId}`;
// // // // // // // //         }
// // // // // // // //     } catch (e) {
// // // // // // // //         console.error("Error parsing YouTube URL:", e);
// // // // // // // //     }

// // // // // // // //     // Kembalikan URL asli jika gagal parsing (fallback)
// // // // // // // //     return url;
// // // // // // // // };

// // // // // // // // // --- CHAT MODAL (Personal) ---
// // // // // // // // function ChatWithFacilitatorModal({ facilitators, onClose }: any) {
// // // // // // // //     const { user } = useAuth();
// // // // // // // //     const [selectedFacilitator, setSelectedFacilitator] = useState<any>(facilitators[0] || null);
// // // // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // // // //     const [message, setMessage] = useState('');
// // // // // // // //     const [sending, setSending] = useState(false);
// // // // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // // // // //     useEffect(() => {
// // // // // // // //         if (selectedFacilitator?._id) {
// // // // // // // //             loadHistory();
// // // // // // // //             const interval = setInterval(loadHistory, 3000);
// // // // // // // //             return () => clearInterval(interval);
// // // // // // // //         }
// // // // // // // //     }, [selectedFacilitator]);

// // // // // // // //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// // // // // // // //     const loadHistory = async () => {
// // // // // // // //         try {
// // // // // // // //             const res = await api(`/api/chat/${selectedFacilitator._id}?t=${Date.now()}`);
// // // // // // // //             setMessages(res.messages || []);
// // // // // // // //         } catch (e) { console.error(e); }
// // // // // // // //     };

// // // // // // // //     const handleSend = async (e: React.FormEvent) => {
// // // // // // // //         e.preventDefault();
// // // // // // // //         if (!message.trim() || !selectedFacilitator) return;
// // // // // // // //         setSending(true);
// // // // // // // //         try {
// // // // // // // //             await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message } });
// // // // // // // //             setMessage('');
// // // // // // // //             loadHistory();
// // // // // // // //         } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); }
// // // // // // // //     };

// // // // // // // //     return (
// // // // // // // //         // [FIX] Z-Index sangat tinggi dan position fixed untuk menimpa header
// // // // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center !z-[99999] p-4 backdrop-blur-sm">
// // // // // // // //             <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px] animate-in zoom-in-95" role="dialog" aria-modal="true" aria-label="Chat Personal">
// // // // // // // //                 <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10 shrink-0">
// // // // // // // //                     <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18} /> Hubungi Pengajar</h3>
// // // // // // // //                     <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20} /></button>
// // // // // // // //                 </div>
// // // // // // // //                 {!selectedFacilitator ? (
// // // // // // // //                     <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center text-gray-500">Tidak ada fasilitator.</div>
// // // // // // // //                 ) : (
// // // // // // // //                     <>
// // // // // // // //                         {facilitators.length > 1 && (
// // // // // // // //                             <div className="p-3 bg-gray-50 border-b flex gap-2 overflow-x-auto shrink-0">
// // // // // // // //                                 {facilitators.map((f:any) => (
// // // // // // // //                                     <button type="button" key={f._id} onClick={()=>setSelectedFacilitator(f)} className={`px-3 py-1 text-xs rounded-full border ${selectedFacilitator._id===f._id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300'}`} title={`Pilih ${f.name}`}>{f.name}</button>
// // // // // // // //                                 ))}
// // // // // // // //                             </div>
// // // // // // // //                         )}
// // // // // // // //                         <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// // // // // // // //                             {messages.map((msg: any, idx: number) => {
// // // // // // // //                                 const isMe = msg.sender === 'me' || msg.sender?._id === user?.id;
// // // // // // // //                                 return (
// // // // // // // //                                     <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
// // // // // // // //                                         <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
// // // // // // // //                                             <p>{msg.message}</p>
// // // // // // // //                                         </div>
// // // // // // // //                                     </div>
// // // // // // // //                                 );
// // // // // // // //                             })}
// // // // // // // //                             <div ref={messagesEndRef} />
// // // // // // // //                         </div>
// // // // // // // //                         <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2 shrink-0">
// // // // // // // //                             <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50 outline-none focus:border-indigo-500" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus title="Input Pesan" aria-label="Ketik pesan" />
// // // // // // // //                             <button type="submit" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button>
// // // // // // // //                         </form>
// // // // // // // //                     </>
// // // // // // // //                 )}
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // }

// // // // // // // // // --- MAIN PAGE COMPONENT ---
// // // // // // // // export default function StudentCoursePlayPage() {
// // // // // // // //     const router = useRouter();
// // // // // // // //     const params = useParams();
// // // // // // // //     const { user } = useAuth();
// // // // // // // //     const { courseId } = params as { courseId: string };
  
// // // // // // // //     const [course, setCourse] = useState<any>(null);
// // // // // // // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // // // //     const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // // // // // // //     const [progressPercent, setProgressPercent] = useState(0);
// // // // // // // //     const [courseFacilitators, setCourseFacilitators] = useState<any[]>([]); 
// // // // // // // //     const [courseParticipants, setCourseParticipants] = useState<any[]>([]); 
    
// // // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // // //     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // // // // // //     const [isEnrolled, setIsEnrolled] = useState(false);
// // // // // // // //     const [enrollmentStatus, setEnrollmentStatus] = useState<string>(''); 
// // // // // // // //     const [showRegisterModal, setShowRegisterModal] = useState(false);
// // // // // // // //     const [showPersonalChat, setShowPersonalChat] = useState(false); 
  
// // // // // // // //     const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// // // // // // // //     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// // // // // // // //     const [pollSelected, setPollSelected] = useState<number | null>(null);
// // // // // // // //     const [isSubmitting, setIsSubmitting] = useState(false);
    
// // // // // // // //     const [isReuploading, setIsReuploading] = useState(false);

// // // // // // // //     // STATE TIMER & START
// // // // // // // //     const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
// // // // // // // //     const [isStarted, setIsStarted] = useState(false); 
  
// // // // // // // //     // 1. INIT DATA
// // // // // // // //     useEffect(() => {
// // // // // // // //         const initData = async () => {
// // // // // // // //           try {
// // // // // // // //             setLoading(true);
// // // // // // // //             const resCourse = await api(`/api/courses/${courseId}`);
// // // // // // // //             const courseData = resCourse.course || resCourse;
// // // // // // // //             setCourse(courseData);
// // // // // // // //             setCourseFacilitators(courseData.facilitatorIds || []); 
    
// // // // // // // //             if (user) {
// // // // // // // //                 try {
// // // // // // // //                     const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// // // // // // // //                     setIsEnrolled(enrollRes.isEnrolled);
                    
// // // // // // // //                     if (enrollRes.isEnrolled) {
// // // // // // // //                         setEnrollmentStatus(enrollRes.status || 'pending'); 
// // // // // // // //                         if (enrollRes.status === 'active' || enrollRes.status === 'approved') {
// // // // // // // //                             const resProgress = await api(`/api/progress/${courseId}`);
// // // // // // // //                             setCompletedLessonIds(resProgress.completedLessons || []);

// // // // // // // //                             try {
// // // // // // // //                                 const resPart = await api(`/api/courses/${courseId}/participants`);
// // // // // // // //                                 const userList = resPart.participants?.map((p: any) => p.user) || [];
// // // // // // // //                                 setCourseParticipants(userList);
// // // // // // // //                             } catch (e) { console.error("Gagal load peserta chat", e); }
// // // // // // // //                         }
// // // // // // // //                     }
// // // // // // // //                 } catch (e) { console.error("Enroll check failed", e); }
// // // // // // // //             }
// // // // // // // //             if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
// // // // // // // //           } catch (e) { console.error("Init failed", e); } finally { setLoading(false); }
// // // // // // // //         };
// // // // // // // //         if (courseId) initData();
// // // // // // // //     }, [courseId, user]);
    
// // // // // // // //     // 2. LOGIKA TIMER & TOMBOL MULAI
// // // // // // // //     useEffect(() => {
// // // // // // // //         setTimerSeconds(null);
// // // // // // // //         if (activeLesson) {
// // // // // // // //             if (!activeLesson.quizDuration || activeLesson.quizDuration <= 0 || completedLessonIds.includes(activeLesson._id)) {
// // // // // // // //                 setIsStarted(true);
// // // // // // // //                 return;
// // // // // // // //             }
// // // // // // // //             const storageKey = `timer_${user?.id}_${activeLesson._id}`;
// // // // // // // //             const storedEndTime = localStorage.getItem(storageKey);
// // // // // // // //             if (storedEndTime) {
// // // // // // // //                 const endTime = parseInt(storedEndTime, 10);
// // // // // // // //                 if (endTime > Date.now()) {
// // // // // // // //                     setIsStarted(true); 
// // // // // // // //                     startTicker(endTime); 
// // // // // // // //                 } else {
// // // // // // // //                     localStorage.removeItem(storageKey);
// // // // // // // //                     setIsStarted(true); 
// // // // // // // //                     setTimerSeconds(0);
// // // // // // // //                 }
// // // // // // // //             } else {
// // // // // // // //                 setIsStarted(false);
// // // // // // // //             }
// // // // // // // //         }
// // // // // // // //     }, [activeLesson, completedLessonIds, user]);

// // // // // // // //     const startTicker = (endTime: number) => {
// // // // // // // //         const update = () => {
// // // // // // // //             const now = Date.now();
// // // // // // // //             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
// // // // // // // //             setTimerSeconds(remaining);
// // // // // // // //         };
// // // // // // // //         update(); 
// // // // // // // //         const interval = setInterval(() => {
// // // // // // // //             const now = Date.now();
// // // // // // // //             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
// // // // // // // //             setTimerSeconds(remaining);
// // // // // // // //             if (remaining <= 0) clearInterval(interval);
// // // // // // // //         }, 1000);
// // // // // // // //         return interval;
// // // // // // // //     };

// // // // // // // //     const handleStartLesson = () => {
// // // // // // // //         setIsStarted(true);
// // // // // // // //         if (activeLesson.quizDuration > 0) {
// // // // // // // //             const endTime = Date.now() + activeLesson.quizDuration * 60 * 1000;
// // // // // // // //             localStorage.setItem(`timer_${user?.id}_${activeLesson._id}`, endTime.toString());
// // // // // // // //             startTicker(endTime);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const formatTimer = (seconds: number) => {
// // // // // // // //         const m = Math.floor(seconds / 60);
// // // // // // // //         const s = seconds % 60;
// // // // // // // //         return `${m}:${s < 10 ? '0' : ''}${s}`;
// // // // // // // //     };

// // // // // // // //     useEffect(() => {
// // // // // // // //         if (course && !loading) {
// // // // // // // //             let total = 0; let completed = 0;
// // // // // // // //             course.modules?.forEach((m: any) => { 
// // // // // // // //                 if(m.isActive) {
// // // // // // // //                     m.lessons?.forEach((l: any) => { 
// // // // // // // //                         if(l.isActive) { 
// // // // // // // //                             total++; 
// // // // // // // //                             if (completedLessonIds.includes(l._id)) completed++; 
// // // // // // // //                         } 
// // // // // // // //                     });
// // // // // // // //                 }
// // // // // // // //             });
// // // // // // // //             const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
// // // // // // // //             setProgressPercent(percent);
// // // // // // // //         }
// // // // // // // //     }, [completedLessonIds, course, loading]);
    
// // // // // // // //     useEffect(() => {
// // // // // // // //           setUploadedFile(null);
// // // // // // // //           setPollSelected(null);
// // // // // // // //           setIsSubmitting(false);
// // // // // // // //           setIsReuploading(false); 
// // // // // // // //           if (activeLesson?.type === 'essay' && activeLesson.questions) {
// // // // // // // //               setEssayAnswers(new Array(activeLesson.questions.length).fill(''));
// // // // // // // //           } else {
// // // // // // // //               setEssayAnswers([]);
// // // // // // // //           }
// // // // // // // //     }, [activeLesson]);

// // // // // // // //     const handleEssayChange = (index: number, value: string) => {
// // // // // // // //         const newAnswers = [...essayAnswers];
// // // // // // // //         newAnswers[index] = value;
// // // // // // // //         setEssayAnswers(newAnswers);
// // // // // // // //     };

// // // // // // // //     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //         const file = e.target.files?.[0];
// // // // // // // //         if (!file) return;
// // // // // // // //         if (file.size > 10 * 1024 * 1024) {
// // // // // // // //             alert(`File terlalu besar (${(file.size / 1024 / 1024).toFixed(2)} MB).\nMaksimal upload 10 MB agar tidak ditolak server.`);
// // // // // // // //             e.target.value = ''; 
// // // // // // // //             return;
// // // // // // // //         }
// // // // // // // //         setUploadedFile(file);
// // // // // // // //     };

// // // // // // // //     const markLessonAsComplete = async (lessonId: string, extraData: any = {}) => {
// // // // // // // //         try { 
// // // // // // // //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId, ...extraData } }); 
// // // // // // // //             if (!completedLessonIds.includes(lessonId)) {
// // // // // // // //                 setCompletedLessonIds(prev => [...prev, lessonId]); 
// // // // // // // //             }
// // // // // // // //             if(user) localStorage.removeItem(`timer_${user.id}_${lessonId}`);
// // // // // // // //         } catch(e) { console.error("Save progress failed", e); throw e; }
// // // // // // // //     };
    
// // // // // // // //     const handleNextLesson = () => {
// // // // // // // //         const allLessons: any[] = [];
// // // // // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // // //         if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // // // // // // //         else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // // // // // // //     };
    
// // // // // // // //     const handlePrevLesson = () => {
// // // // // // // //         const allLessons: any[] = [];
// // // // // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // // //         if (currIdx > 0) { setActiveLesson(allLessons[currIdx - 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }
// // // // // // // //     };

// // // // // // // //     const handleManualComplete = async () => { 
// // // // // // // //         await markLessonAsComplete(activeLesson._id); 
// // // // // // // //         handleNextLesson(); 
// // // // // // // //     };
    
// // // // // // // //     const handleQuizCompleted = async (result: { score: number, attempts: number }) => { 
// // // // // // // //         try {
// // // // // // // //             await markLessonAsComplete(activeLesson._id, { 
// // // // // // // //                 score: result.score, 
// // // // // // // //                 attempts: result.attempts 
// // // // // // // //             });
// // // // // // // //             if (!completedLessonIds.includes(activeLesson._id)) {
// // // // // // // //                 setCompletedLessonIds(prev => [...prev, activeLesson._id]); 
// // // // // // // //             }
// // // // // // // //         } catch (e) { console.error("Gagal simpan skor kuis", e); }
// // // // // // // //     };
    
// // // // // // // //     // --- [FIXED FINAL] HANDLE SUBMIT TASK ---
// // // // // // // //     const handleSubmitTask = async () => {
// // // // // // // //         setIsSubmitting(true);
// // // // // // // //         try {
// // // // // // // //             if (activeLesson.type === 'essay') {
// // // // // // // //                 if (essayAnswers.some(ans => ans.trim() === '')) throw new Error("Mohon jawab semua pertanyaan.");
// // // // // // // //                 await api(`/api/progress/${courseId}/submit-essay`, { 
// // // // // // // //                     method: 'POST', 
// // // // // // // //                     body: { lessonId: activeLesson._id, answers: essayAnswers } 
// // // // // // // //                 });
// // // // // // // //             } else if (activeLesson.type === 'upload_doc' || activeLesson.type === 'image') {
// // // // // // // //                 if (!uploadedFile) throw new Error("Pilih file terlebih dahulu.");
                
// // // // // // // //                 const fd = new FormData();
// // // // // // // //                 fd.append('file', uploadedFile);
                
// // // // // // // //                 const uploadRes: any = await apiUpload('/api/upload', fd); 
                
// // // // // // // //                 console.log("Upload Response Full:", uploadRes);

// // // // // // // //                 let fileUrl = "";

// // // // // // // //                 // SKENARIO 1
// // // // // // // //                 if (uploadRes.data && uploadRes.data.url) {
// // // // // // // //                     fileUrl = uploadRes.data.url;
// // // // // // // //                 }
// // // // // // // //                 // SKENARIO 2
// // // // // // // //                 else if (uploadRes.url) {
// // // // // // // //                     fileUrl = uploadRes.url;
// // // // // // // //                 }
// // // // // // // //                 // SKENARIO 3
// // // // // // // //                 else if (uploadRes.file && uploadRes.file.path) {
// // // // // // // //                     fileUrl = uploadRes.file.path;
// // // // // // // //                 }
// // // // // // // //                 // SKENARIO 4
// // // // // // // //                 else if (uploadRes.file && uploadRes.file.secure_url) {
// // // // // // // //                     fileUrl = uploadRes.file.secure_url;
// // // // // // // //                 }

// // // // // // // //                 if (!fileUrl) {
// // // // // // // //                     throw new Error(`Gagal membaca URL. Response server tidak memiliki field url yang dikenali.`);
// // // // // // // //                 }

// // // // // // // //                 await api(`/api/progress/${courseId}/submit-task`, { 
// // // // // // // //                     method: 'POST', 
// // // // // // // //                     body: { 
// // // // // // // //                         lessonId: activeLesson._id, 
// // // // // // // //                         fileUrl: fileUrl, 
// // // // // // // //                         fileName: uploadedFile.name 
// // // // // // // //                     } 
// // // // // // // //                 });

// // // // // // // //             } else if (activeLesson.type === 'poll') {
// // // // // // // //                 if (pollSelected === null) throw new Error("Pilih salah satu opsi.");
// // // // // // // //                 const answerText = activeLesson.pollOptions[pollSelected];
// // // // // // // //                 await markLessonAsComplete(activeLesson._id, { pollAnswer: answerText });
// // // // // // // //             } else {
// // // // // // // //                 await markLessonAsComplete(activeLesson._id);
// // // // // // // //             }

// // // // // // // //             if (!completedLessonIds.includes(activeLesson._id)) {
// // // // // // // //                 setCompletedLessonIds(prev => [...prev, activeLesson._id]);
// // // // // // // //             }
// // // // // // // //             setIsReuploading(false);
// // // // // // // //             alert("Berhasil dikirim!");
// // // // // // // //             handleNextLesson();
// // // // // // // //         } catch (e: any) { 
// // // // // // // //             console.error("Submit Error:", e);
// // // // // // // //             alert("Gagal mengirim: " + e.message); 
// // // // // // // //         } finally { 
// // // // // // // //             setIsSubmitting(false); 
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const renderContentHeader = (title: string) => (
// // // // // // // //         <div className="mb-6 border-b border-gray-100 pb-4">
// // // // // // // //             <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// // // // // // // //                 <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 flex items-center gap-1">
// // // // // // // //                     {activeLesson?.type?.replace(/_/g, ' ') || 'MATERI'}
// // // // // // // //                 </span>
// // // // // // // //             </div>
// // // // // // // //             <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
// // // // // // // //                 <h1 className="text-gray-900 font-bold text-2xl flex-1 leading-tight">{title}</h1>
// // // // // // // //                 <div className="flex-shrink-0 flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
// // // // // // // //                     {activeLesson.quizDuration > 0 && (
// // // // // // // //                         <div className={`flex items-center gap-1 px-2 py-0.5 rounded border ${timerSeconds !== null && timerSeconds < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
// // // // // // // //                             <Clock size={14} /> 
// // // // // // // //                             <span className="font-bold text-sm">
// // // // // // // //                                 {timerSeconds !== null 
// // // // // // // //                                     ? `Sisa: ${formatTimer(timerSeconds)}` 
// // // // // // // //                                     : `${activeLesson.quizDuration} Menit`
// // // // // // // //                                 }
// // // // // // // //                             </span>
// // // // // // // //                         </div>
// // // // // // // //                     )}
// // // // // // // //                     <div className="flex items-center gap-1"><Users size={12} className="text-indigo-500"/> <span>{getFacilitatorName(activeLesson.facilitatorId, courseFacilitators)}</span></div>
// // // // // // // //                     {activeLesson.jp > 0 && <div className="flex items-center gap-1 border-l pl-3"><Clock size={12} className="text-indigo-500"/> <span>{activeLesson.jp} JP</span></div>}
// // // // // // // //                     {(activeLesson.scheduleDate) && <div className="flex items-center gap-1 border-l pl-3"><Calendar size={12} className="text-indigo-500"/> <span>{formatDate(activeLesson.scheduleDate)}</span></div>}
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //     );

// // // // // // // //     const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
// // // // // // // //         if (activeLesson.quizDuration > 0 && !isStarted && !completedLessonIds.includes(activeLesson._id)) {
// // // // // // // //             return (
// // // // // // // //                 <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-200 text-center min-h-[300px] animate-in fade-in zoom-in duration-300">
// // // // // // // //                     <div className="bg-indigo-100 p-5 rounded-full mb-6 text-indigo-600 shadow-inner">
// // // // // // // //                         <Clock size={48} />
// // // // // // // //                     </div>
// // // // // // // //                     <h2 className="text-2xl font-bold text-gray-800 mb-3">Materi dengan Batas Waktu</h2>
// // // // // // // //                     <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
// // // // // // // //                         Materi <strong>"{activeLesson.title}"</strong> memiliki batas waktu pengerjaan selama <span className="font-bold text-gray-800">{activeLesson.quizDuration} Menit</span>. 
// // // // // // // //                         <br/><span className="text-xs text-red-500 mt-2 block">*Waktu akan berjalan otomatis setelah Anda menekan tombol di bawah.</span>
// // // // // // // //                     </p>
// // // // // // // //                     <button onClick={handleStartLesson} className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95">
// // // // // // // //                         <Play size={20} fill="currentColor" /> Mulai Kerjakan Sekarang
// // // // // // // //                     </button>
// // // // // // // //                 </div>
// // // // // // // //             );
// // // // // // // //         }
        
// // // // // // // //         if (timerSeconds !== null && timerSeconds <= 0 && !completedLessonIds.includes(activeLesson._id)) {
// // // // // // // //              return (
// // // // // // // //                 <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-xl shadow-sm border border-red-200 text-center min-h-[300px]">
// // // // // // // //                     <div className="bg-red-100 p-4 rounded-full mb-4 text-red-600">
// // // // // // // //                         <AlertCircle size={40} />
// // // // // // // //                     </div>
// // // // // // // //                     <h2 className="text-xl font-bold text-red-800 mb-2">Waktu Habis!</h2>
// // // // // // // //                     <p className="text-red-600 mb-6">Waktu pengerjaan untuk materi ini telah berakhir.</p>
// // // // // // // //                     <button onClick={handleNextLesson} className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">Lanjut Materi Berikutnya</button>
// // // // // // // //                 </div>
// // // // // // // //              );
// // // // // // // //         }

// // // // // // // //         return <>{children}</>;
// // // // // // // //     };

// // // // // // // //     const renderContent = () => {
// // // // // // // //         if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping.</div>;
        
// // // // // // // //         const isLessonCompleted = completedLessonIds.includes(activeLesson._id);

// // // // // // // //         const content = (
// // // // // // // //             <>
// // // // // // // //                 {activeLesson.type === 'quiz' && (
// // // // // // // //                     <QuizPlayer 
// // // // // // // //                         quizId={activeLesson._id} 
// // // // // // // //                         courseId={courseId} 
// // // // // // // //                         lessonData={activeLesson}
// // // // // // // //                         onComplete={handleQuizCompleted} 
// // // // // // // //                     />
// // // // // // // //                 )}
                
// // // // // // // //                 {activeLesson.type === 'image' && (
// // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // //                         <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
// // // // // // // //                             <img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="w-full h-auto object-contain" />
// // // // // // // //                         </div>
// // // // // // // //                         {activeLesson.content && <div className="prose max-w-none mt-6 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />}
// // // // // // // //                     </div>
// // // // // // // //                 )}

// // // // // // // //                 {(activeLesson.type === 'slide' || activeLesson.type === 'download_doc') && (
// // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // //                         <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center mb-6">
// // // // // // // //                             <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4"><FileText size={32} /></div>
// // // // // // // //                             <h3 className="text-lg font-bold text-gray-800 mb-2">{activeLesson.title}</h3>
// // // // // // // //                             <p className="text-sm text-gray-500 mb-6">Dokumen Materi Pembelajaran.</p>
// // // // // // // //                             <a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-transform active:scale-95" aria-label="Download File">
// // // // // // // //                                 <Download size={18} /> Download Materi
// // // // // // // //                             </a>
// // // // // // // //                         </div>
// // // // // // // //                         {activeLesson.fileUrl && activeLesson.fileUrl.endsWith('.pdf') && (
// // // // // // // //                             <div className="mt-8 border rounded-xl overflow-hidden h-[800px] shadow-sm">
// // // // // // // //                                 <iframe src={getImageUrl(activeLesson.fileUrl)} className="w-full h-full" title="Preview"></iframe>
// // // // // // // //                             </div>
// // // // // // // //                         )}
// // // // // // // //                     </div>
// // // // // // // //                 )}

// // // // // // // //                 {/* [FIX] Video Embed yang lebih kuat */}
// // // // // // // //                 {activeLesson.type === 'video_url' && (
// // // // // // // //                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
// // // // // // // //                         <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
// // // // // // // //                             <iframe 
// // // // // // // //                                 src={getEmbedUrl(activeLesson.videoUrl)} 
// // // // // // // //                                 className="w-full h-full" 
// // // // // // // //                                 allowFullScreen 
// // // // // // // //                                 title={`Video ${activeLesson.title}`} 
// // // // // // // //                             />
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                 )}

// // // // // // // //                 {activeLesson.type === 'virtual_class' && (
// // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // //                         <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
// // // // // // // //                             <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"><Video size={40}/></div>
// // // // // // // //                             <h3 className="text-xl font-bold text-gray-900 mb-2">Kelas Virtual (Zoom/Meet)</h3>
// // // // // // // //                             <p className="text-gray-600 mb-6">Silakan bergabung ke pertemuan virtual melalui tombol di bawah ini.</p>
                            
// // // // // // // //                             {(activeLesson.meetingLink || activeLesson.content) ? (
// // // // // // // //                                 <div className="space-y-3">
// // // // // // // //                                     <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg">
// // // // // // // //                                         <Video size={20}/> Gabung Meeting
// // // // // // // //                                     </a>
// // // // // // // //                                     <div className="text-xs text-gray-500">
// // // // // // // //                                         Link: <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" className="text-purple-600 underline">{activeLesson.meetingLink || activeLesson.content}</a>
// // // // // // // //                                     </div>
// // // // // // // //                                 </div>
// // // // // // // //                             ) : (
// // // // // // // //                                 <button disabled className="inline-flex items-center gap-2 bg-gray-400 text-white px-8 py-3 rounded-full font-bold cursor-not-allowed">
// // // // // // // //                                     <Video size={20}/> Link Belum Tersedia
// // // // // // // //                                 </button>
// // // // // // // //                             )}
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                 )}
                
// // // // // // // //                 {activeLesson.type === 'google_classroom' && (
// // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // // //                         <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
// // // // // // // //                             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border"><School size={40} className="text-green-600"/></div>
// // // // // // // //                             <h3 className="text-xl font-bold text-gray-900 mb-2">Google Classroom</h3>
// // // // // // // //                             <p className="text-gray-600 mb-2">Materi ini terhubung dengan Google Classroom.</p>
// // // // // // // //                             {activeLesson.classroomData ? (
// // // // // // // //                                 <div className="mt-4">
// // // // // // // //                                     <p className="font-bold text-lg">{activeLesson.classroomData.name}</p>
// // // // // // // //                                     <p className="text-sm text-gray-500 mb-6">Kode Kelas: <span className="font-mono bg-white px-2 py-1 border rounded">{activeLesson.classroomData.enrollmentCode || '-'}</span></p>
// // // // // // // //                                     <a href={activeLesson.classroomData.alternateLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 shadow-lg">Buka Google Classroom ↗</a>
// // // // // // // //                                 </div>
// // // // // // // //                             ) : <p className="text-red-500 italic">Data kelas tidak ditemukan.</p>}
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                 )}

// // // // // // // //                 {['essay', 'upload_doc', 'image', 'poll', 'lesson'].includes(activeLesson.type) && (
// // // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6">
// // // // // // // //                         {activeLesson.content && activeLesson.type !== 'image' && (
// // // // // // // //                             <div className="prose max-w-none mb-8 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
// // // // // // // //                         )}
                        
// // // // // // // //                         {activeLesson.type === 'essay' && (
// // // // // // // //                             <div className="space-y-6">
// // // // // // // //                                 {activeLesson.questions?.map((q:any,i:number)=>(
// // // // // // // //                                     <div key={i} className="border p-4 rounded-lg bg-gray-50">
// // // // // // // //                                             <div className="font-bold mb-2 text-sm text-gray-700 flex gap-2">
// // // // // // // //                                                 <span>{i+1}.</span>
// // // // // // // //                                                 <div dangerouslySetInnerHTML={{ __html: q.question }} />
// // // // // // // //                                             </div>
// // // // // // // //                                             <div className="bg-white">
// // // // // // // //                                                 <ReactQuill theme="snow" value={essayAnswers[i]||''} onChange={(v)=>handleEssayChange(i,v)} placeholder="Tulis jawaban..."/>
// // // // // // // //                                             </div>
// // // // // // // //                                     </div>
// // // // // // // //                                 ))}
// // // // // // // //                                 <button onClick={handleSubmitTask} disabled={isSubmitting} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold w-full hover:bg-indigo-700 transition-colors" title="Kirim Jawaban" aria-label="Kirim Jawaban">{isSubmitting?'Mengirim...':'Kirim Jawaban'}</button>
// // // // // // // //                             </div>
// // // // // // // //                         )}
                        
// // // // // // // //                         {/* UPDATE: UI UPLOAD (Cek sudah selesai atau belum) */}
// // // // // // // //                         {(activeLesson.type === 'upload_doc' || activeLesson.type === 'image') && (
// // // // // // // //                             <div className="border-2 border-dashed p-8 text-center rounded-xl bg-gray-50 border-indigo-200">
// // // // // // // //                                 {/* JIKA SUDAH SELESAI DAN TIDAK SEDANG REVISI */}
// // // // // // // //                                 {isLessonCompleted && !uploadedFile && !isReuploading ? (
// // // // // // // //                                     <div className="animate-in fade-in zoom-in duration-300">
// // // // // // // //                                         <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
// // // // // // // //                                             <CheckCircle size={32} />
// // // // // // // //                                         </div>
// // // // // // // //                                         <h3 className="text-xl font-bold text-gray-800 mb-2">Tugas Sudah Dikirim!</h3>
// // // // // // // //                                         <p className="text-gray-500 mb-6 text-sm">Anda telah menyelesaikan tugas ini.</p>
                                        
// // // // // // // //                                         <button 
// // // // // // // //                                             onClick={() => setIsReuploading(true)} 
// // // // // // // //                                             className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-50 shadow-sm transition-colors text-sm"
// // // // // // // //                                         >
// // // // // // // //                                             Kirim Ulang / Ganti File
// // // // // // // //                                         </button>
// // // // // // // //                                     </div>
// // // // // // // //                                 ) : (
// // // // // // // //                                     /* TAMPILAN FORM UPLOAD (Default atau Revisi) */
// // // // // // // //                                     <>
// // // // // // // //                                         {uploadedFile ? (
// // // // // // // //                                             <div className="text-center w-full animate-in fade-in zoom-in duration-300">
// // // // // // // //                                                  <div className="text-green-600 font-bold text-lg mb-2 flex items-center justify-center gap-2">
// // // // // // // //                                                     <FileCheck className="w-8 h-8" />
// // // // // // // //                                                     File Siap Upload!
// // // // // // // //                                                  </div>
// // // // // // // //                                                  <p className="text-gray-700 font-medium break-all mb-4 px-4 bg-white py-2 rounded border inline-block shadow-sm">
// // // // // // // //                                                     {uploadedFile.name}
// // // // // // // //                                                     <span className="block text-[10px] text-gray-400 font-normal">
// // // // // // // //                                                         ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
// // // // // // // //                                                     </span>
// // // // // // // //                                                  </p>
// // // // // // // //                                                  <div className="flex justify-center gap-3">
// // // // // // // //                                                     <button 
// // // // // // // //                                                         onClick={() => setUploadedFile(null)} 
// // // // // // // //                                                         className="text-red-500 hover:text-red-700 text-sm font-bold underline"
// // // // // // // //                                                     >
// // // // // // // //                                                         Ganti File
// // // // // // // //                                                     </button>
// // // // // // // //                                                  </div>
// // // // // // // //                                             </div>
// // // // // // // //                                         ) : (
// // // // // // // //                                             <>
// // // // // // // //                                                 <UploadCloud className="mx-auto text-indigo-400 mb-2" size={32}/>
// // // // // // // //                                                 <p className="text-sm text-gray-500 mb-4">Upload tugas Anda di sini (PDF/DOCX/JPG)</p>
// // // // // // // //                                                 <label className="cursor-pointer bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 inline-flex items-center gap-2 transition-transform active:scale-95 shadow-md">
// // // // // // // //                                                     <UploadCloud size={18}/> Pilih File
// // // // // // // //                                                     <input 
// // // // // // // //                                                         type="file" 
// // // // // // // //                                                         className="hidden" 
// // // // // // // //                                                         onChange={handleFileChange} 
// // // // // // // //                                                         accept={activeLesson.type === 'image' ? "image/*" : ".pdf,.doc,.docx,.jpg,.jpeg,.png"}
// // // // // // // //                                                     />
// // // // // // // //                                                 </label>
// // // // // // // //                                                 <p className="text-[10px] text-gray-400 mt-3">Maksimal Ukuran File: 10 MB</p>
// // // // // // // //                                             </>
// // // // // // // //                                         )}

// // // // // // // //                                         <button 
// // // // // // // //                                             onClick={handleSubmitTask} 
// // // // // // // //                                             disabled={!uploadedFile || isSubmitting} 
// // // // // // // //                                             className={`mt-6 px-10 py-3 mx-auto block rounded-xl font-bold text-white shadow-lg transition-all ${!uploadedFile ? 'bg-gray-300 cursor-not-allowed hidden' : 'bg-green-600 hover:bg-green-700 hover:scale-[1.02]'}`}
// // // // // // // //                                             title="Upload Tugas" 
// // // // // // // //                                             aria-label="Upload Tugas"
// // // // // // // //                                         >
// // // // // // // //                                             {isSubmitting ? 'Sedang Mengirim...' : 'Kirim Tugas Sekarang'}
// // // // // // // //                                         </button>
                                        
// // // // // // // //                                         {/* Tombol batal jika sedang revisi */}
// // // // // // // //                                         {isReuploading && !uploadedFile && (
// // // // // // // //                                             <button 
// // // // // // // //                                                 onClick={() => setIsReuploading(false)} 
// // // // // // // //                                                 className="mt-4 text-xs text-gray-500 hover:text-gray-700 underline"
// // // // // // // //                                             >
// // // // // // // //                                                 Batal, kembali ke status selesai
// // // // // // // //                                             </button>
// // // // // // // //                                         )}
// // // // // // // //                                     </>
// // // // // // // //                                 )}
// // // // // // // //                             </div>
// // // // // // // //                         )}
                        
// // // // // // // //                         {activeLesson.type === 'poll' && (
// // // // // // // //                             <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
// // // // // // // //                                 <h3 className="font-bold text-lg mb-4">{activeLesson.pollQuestion || "Polling"}</h3>
// // // // // // // //                                 <div className="space-y-3 max-w-sm mx-auto">
// // // // // // // //                                     {activeLesson.pollOptions?.map((opt:string, idx:number) => (
// // // // // // // //                                         <button key={idx} onClick={()=>setPollSelected(idx)} className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${pollSelected===idx ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-100 border-gray-300'}`} title={`Pilih ${opt}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>
// // // // // // // //                                     ))}
// // // // // // // //                                 </div>
// // // // // // // //                                 <button onClick={handleSubmitTask} disabled={pollSelected===null||isSubmitting} className="mt-6 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition-colors" title="Kirim Polling" aria-label="Kirim Polling">Kirim Polling</button>
// // // // // // // //                             </div>
// // // // // // // //                         )}
// // // // // // // //                     </div>
// // // // // // // //                 )}
// // // // // // // //             </>
// // // // // // // //         );

// // // // // // // //         return (
// // // // // // // //             <div>
// // // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // // //                 <ContentWrapper>
// // // // // // // //                     {content}
// // // // // // // //                 </ContentWrapper>
// // // // // // // //             </div>
// // // // // // // //         );
// // // // // // // //     };
  
// // // // // // // //     if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // // // // // //     if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;
  
// // // // // // // //     if (!isEnrolled || enrollmentStatus === 'pending') {
// // // // // // // //         return (
// // // // // // // //           <div className="min-h-screen bg-gray-50 pb-20">
// // // // // // // //               {showRegisterModal && (
// // // // // // // //                   <CourseRegistrationModal 
// // // // // // // //                     courseId={courseId} 
// // // // // // // //                     courseTitle={course.title} 
// // // // // // // //                     programType={course.programType} 
// // // // // // // //                     user={user} 
// // // // // // // //                     onClose={() => setShowRegisterModal(false)} 
// // // // // // // //                     onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil! Menunggu Verifikasi."); window.location.reload(); }} 
// // // // // // // //                   />
// // // // // // // //               )}
              
// // // // // // // //               {/* HERO SECTION */}
// // // // // // // //               <div className="relative bg-gray-900 text-white">
// // // // // // // //                   <div className="absolute inset-0 bg-black/60 z-0"></div>
// // // // // // // //                   {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" alt="" />}
                  
// // // // // // // //                   <div className="max-w-6xl mx-auto px-6 py-24 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
// // // // // // // //                       <div className="lg:col-span-2 space-y-6">
// // // // // // // //                           <div className="flex items-center gap-3">
// // // // // // // //                               <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${course.programType === 'training' ? 'bg-orange-500' : 'bg-blue-500'}`}>
// // // // // // // //                                   {course.programType === 'training' ? 'Diklat / Pelatihan' : 'Kursus Mandiri'}
// // // // // // // //                               </span>
// // // // // // // //                               {course.category && <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">{course.category}</span>}
// // // // // // // //                           </div>
                          
// // // // // // // //                           <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{course.title}</h1>
                          
// // // // // // // //                           <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300 pt-2">
// // // // // // // //                               <div className="flex items-center gap-2"><Users size={18}/> {courseFacilitators.length} Fasilitator</div>
// // // // // // // //                               <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
// // // // // // // //                               <div className="flex items-center gap-2"><Clock size={18}/> {course.programType === 'training' ? 'Terjadwal' : 'Fleksibel'}</div>
// // // // // // // //                               {course.certificateConfig && <div className="flex items-center gap-2 text-yellow-400"><Award size={18}/> Sertifikat Tersedia</div>}
// // // // // // // //                           </div>
// // // // // // // //                       </div>

// // // // // // // //                       {/* CARD PENDAFTARAN */}
// // // // // // // //                       <div className="lg:col-span-1">
// // // // // // // //                           <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-100 sticky top-24">
// // // // // // // //                               <div className="text-center mb-8">
// // // // // // // //                                   <p className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Biaya Investasi</p>
// // // // // // // //                                   <p className="text-4xl font-black text-green-600">
// // // // // // // //                                       {course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}
// // // // // // // //                                   </p>
// // // // // // // //                               </div>

// // // // // // // //                               {enrollmentStatus === 'pending' ? (
// // // // // // // //                                   <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-center border border-yellow-200">
// // // // // // // //                                       <h3 className="font-bold mb-1">Menunggu Verifikasi</h3>
// // // // // // // //                                       <p className="text-xs">Pendaftaran Anda sedang diproses admin.</p>
// // // // // // // //                                   </div>
// // // // // // // //                               ) : (
// // // // // // // //                                   <button 
// // // // // // // //                                     onClick={() => setShowRegisterModal(true)} 
// // // // // // // //                                     className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-lg"
// // // // // // // //                                     title="Daftar Sekarang"
// // // // // // // //                                     aria-label="Daftar Sekarang"
// // // // // // // //                                   >
// // // // // // // //                                       📝 Daftar Sekarang
// // // // // // // //                                   </button>
// // // // // // // //                               )}
                              
// // // // // // // //                               <p className="text-xs text-center text-gray-400 mt-4">
// // // // // // // //                                   *Akses selamanya setelah terdaftar
// // // // // // // //                               </p>
// // // // // // // //                           </div>
// // // // // // // //                       </div>
// // // // // // // //                   </div>
// // // // // // // //               </div>

// // // // // // // //               {/* DETAIL CONTENT */}
// // // // // // // //               <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
// // // // // // // //                   <div className="lg:col-span-2 space-y-12">
// // // // // // // //                       {/* DESKRIPSI */}
// // // // // // // //                       <section>
// // // // // // // //                           <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="text-red-600"/> Tentang Program Ini</h3>
// // // // // // // //                           <div className="prose max-w-none text-gray-600 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm" dangerouslySetInnerHTML={{ __html: course.description || "<p>Belum ada deskripsi.</p>" }} />
// // // // // // // //                       </section>

// // // // // // // //                       {/* KURIKULUM */}
// // // // // // // //                       <section>
// // // // // // // //                           <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="text-red-600"/> Kurikulum & Materi</h3>
// // // // // // // //                           <div className="space-y-4">
// // // // // // // //                               {course.modules?.map((mod: any, idx: number) => (
// // // // // // // //                                   <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
// // // // // // // //                                       <div className="bg-gray-50 px-6 py-4 border-b font-bold text-gray-800 flex justify-between">
// // // // // // // //                                           <span>Modul {idx + 1}: {mod.title}</span>
// // // // // // // //                                           <span className="text-xs font-normal text-gray-500 bg-white px-2 py-1 rounded border">{mod.lessons?.length || 0} Materi</span>
// // // // // // // //                                       </div>
// // // // // // // //                                       <div className="divide-y">
// // // // // // // //                                           {mod.lessons?.map((les: any, lIdx: number) => (
// // // // // // // //                                               <div key={lIdx} className="px-6 py-3 flex items-center gap-3 text-sm text-gray-600">
// // // // // // // //                                                   {les.type === 'video_url' ? <PlayCircle size={16} className="text-blue-500"/> : <FileText size={16} className="text-gray-400"/>}
// // // // // // // //                                                   {les.title}
// // // // // // // //                                                   {les.jp > 0 && <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{les.jp} JP</span>}
// // // // // // // //                                               </div>
// // // // // // // //                                           ))}
// // // // // // // //                                       </div>
// // // // // // // //                                   </div>
// // // // // // // //                               ))}
// // // // // // // //                           </div>
// // // // // // // //                       </section>
// // // // // // // //                   </div>

// // // // // // // //                   {/* SIDEBAR INFO */}
// // // // // // // //                   <div className="space-y-8">
// // // // // // // //                       {/* FASILITATOR */}
// // // // // // // //                       <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
// // // // // // // //                           <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Users className="text-red-600"/> Tim Fasilitator</h4>
// // // // // // // //                           <div className="space-y-4">
// // // // // // // //                               {courseFacilitators.map((fac: any) => (
// // // // // // // //                                   <div key={fac._id} className="flex items-center gap-3">
// // // // // // // //                                       {fac.avatarUrl ? (
// // // // // // // //                                           <img src={getImageUrl(fac.avatarUrl)} className="w-10 h-10 rounded-full object-cover border" alt={fac.name}/>
// // // // // // // //                                       ) : (
// // // // // // // //                                           <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">{fac.name.charAt(0)}</div>
// // // // // // // //                                       )}
// // // // // // // //                                       <div>
// // // // // // // //                                           <p className="font-bold text-sm text-gray-800">{fac.name}</p>
// // // // // // // //                                           <p className="text-xs text-gray-500">Fasilitator</p>
// // // // // // // //                                       </div>
// // // // // // // //                                   </div>
// // // // // // // //                               ))}
// // // // // // // //                               {courseFacilitators.length === 0 && <p className="text-sm text-gray-500 italic">Belum ditentukan.</p>}
// // // // // // // //                           </div>
// // // // // // // //                       </section>

// // // // // // // //                       {/* INFO TAMBAHAN */}
// // // // // // // //                       <section className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
// // // // // // // //                           <h4 className="font-bold text-indigo-900 mb-4">Fasilitas Program</h4>
// // // // // // // //                           <ul className="space-y-3 text-sm text-indigo-800">
// // // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Akses Materi Seumur Hidup</li>
// // // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Grup Diskusi Eksklusif</li>
// // // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Sertifikat Kelulusan</li>
// // // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Konsultasi Fasilitator</li>
// // // // // // // //                           </ul>
// // // // // // // //                       </section>
// // // // // // // //                   </div>
// // // // // // // //               </div>
// // // // // // // //           </div>
// // // // // // // //         );
// // // // // // // //     }
  
// // // // // // // //     // TAMPILAN DASHBOARD BELAJAR
// // // // // // // //     const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;
  
// // // // // // // //     return (
// // // // // // // //       <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // // // // // // //         <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
// // // // // // // //           <div className="p-5 border-b bg-white">
// // // // // // // //               <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" title="Kembali ke Katalog" aria-label="Kembali"><span>←</span> KEMBALI KE KATALOG</Link>
// // // // // // // //               <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
// // // // // // // //               <div className="space-y-2">
// // // // // // // //                   <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{safePercent}%</span></div>
// // // // // // // //                   <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: `${safePercent}%`}}></div></div>
// // // // // // // //               </div>
// // // // // // // //               <button onClick={() => setShowPersonalChat(true)} className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50" title="Hubungi Pengajar" aria-label="Hubungi Pengajar">
// // // // // // // //                   <MessageCircle size={16}/> Hubungi Pengajar
// // // // // // // //               </button>
// // // // // // // //           </div>
// // // // // // // //           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
// // // // // // // //               {course.modules?.map((mod:any, i:number)=>(
// // // // // // // //                   <div key={mod._id}>
// // // // // // // //                       <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
// // // // // // // //                       <div className="space-y-1">
// // // // // // // //                           {mod.lessons?.map((les:any) => (
// // // // // // // //                               <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`} title={`Buka Materi ${les.title}`} aria-label={`Buka Materi ${les.title}`}>
// // // // // // // //                                   {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
// // // // // // // //                                   {les.title}
// // // // // // // //                               </button>
// // // // // // // //                           ))}
// // // // // // // //                       </div>
// // // // // // // //                   </div>
// // // // // // // //               ))}
// // // // // // // //           </div>
// // // // // // // //         </aside>
  
// // // // // // // //         <main className="flex-1 flex flex-col relative h-full overflow-hidden bg-gray-50">
// // // // // // // //           <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
// // // // // // // //               <button type="button" onClick={()=>setIsSidebarOpen(!isSidebarOpen)} aria-label="Menu" title="Menu"><Menu/></button>
// // // // // // // //           </div>
// // // // // // // //           <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
// // // // // // // //               {renderContent()}
// // // // // // // //           </div>
// // // // // // // //           <div className="fixed bottom-8 right-8 flex gap-3 z-30">
// // // // // // // //               <button type="button" onClick={handlePrevLesson} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105" title="Materi Sebelumnya" aria-label="Materi Sebelumnya"><ChevronLeft/></button>
// // // // // // // //               <button type="button" onClick={handleManualComplete} className="h-12 px-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 font-bold hover:scale-105" title="Lanjut Materi" aria-label="Lanjut Materi"><span>Lanjut</span><ChevronRight/></button>
// // // // // // // //           </div>
// // // // // // // //         </main>
        
// // // // // // // //         {showPersonalChat && <ChatWithFacilitatorModal facilitators={courseFacilitators} onClose={() => setShowPersonalChat(false)} />}
  
// // // // // // // //         {user && (
// // // // // // // //           <CourseGroupChat 
// // // // // // // //               courseId={courseId} 
// // // // // // // //               currentUser={user} 
// // // // // // // //               participants={courseParticipants} 
// // // // // // // //               facilitators={courseFacilitators} 
// // // // // // // //               isFloating={true} 
// // // // // // // //           />
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // // }


// // // // // // // 'use client';

// // // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // import Link from 'next/link';
// // // // // // // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // // // // import CourseGroupChat from '@/components/CourseGroupChat'; 
// // // // // // // import { 
// // // // // // //     Users, Clock, MessageCircle, ChevronLeft, ChevronRight, Menu, Send, X,
// // // // // // //     FileText, PlayCircle, CheckCircle, UploadCloud, Calendar, Download, 
// // // // // // //     Image as ImageIcon, Video, School, MonitorPlay, BookOpen, Play, AlertCircle, Award, FileCheck 
// // // // // // // } from 'lucide-react';
// // // // // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';
// // // // // // // import dynamic from 'next/dynamic';
// // // // // // // import 'react-quill/dist/quill.snow.css';

// // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // //     ssr: false, 
// // // // // // //     loading: () => <div className="h-24 bg-gray-50 animate-pulse rounded-lg border border-gray-200"></div> 
// // // // // // // });

// // // // // // // // --- HELPER FUNCTIONS ---
// // // // // // // const getFacilitatorName = (activeFacilitatorId: any, facilitatorsList: any[]) => {
// // // // // // //     if (!activeFacilitatorId) return '-';
// // // // // // //     if (typeof activeFacilitatorId === 'object' && activeFacilitatorId.name) return activeFacilitatorId.name;
// // // // // // //     const found = facilitatorsList.find(f => (f._id === activeFacilitatorId) || (f.id === activeFacilitatorId));
// // // // // // //     return found ? found.name : 'Fasilitator';
// // // // // // // };

// // // // // // // const formatDate = (dateString: string) => {
// // // // // // //     if (!dateString) return '-';
// // // // // // //     return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // // // // // };

// // // // // // // // [FIX] Helper URL Video YouTube yang lebih kuat
// // // // // // // const getEmbedUrl = (url: string) => {
// // // // // // //     if (!url) return '';
// // // // // // //     if (url.includes('youtube.com/embed/')) return url;
// // // // // // //     try {
// // // // // // //         let videoId = '';
// // // // // // //         if (url.includes('youtu.be/')) {
// // // // // // //             videoId = url.split('youtu.be/')[1]?.split('?')[0];
// // // // // // //         } else if (url.includes('youtube.com/watch')) {
// // // // // // //             const urlParams = new URL(url).searchParams;
// // // // // // //             videoId = urlParams.get('v') || '';
// // // // // // //         }
// // // // // // //         if (videoId) return `https://www.youtube.com/embed/${videoId}`;
// // // // // // //     } catch (e) { console.error("Error parsing YouTube URL:", e); }
// // // // // // //     return url;
// // // // // // // };

// // // // // // // // --- CHAT MODAL (Personal) ---
// // // // // // // function ChatWithFacilitatorModal({ facilitators, onClose }: any) {
// // // // // // //     const { user } = useAuth();
// // // // // // //     const [selectedFacilitator, setSelectedFacilitator] = useState<any>(facilitators[0] || null);
// // // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // // //     const [message, setMessage] = useState('');
// // // // // // //     const [sending, setSending] = useState(false);
// // // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // // // // // //     useEffect(() => {
// // // // // // //         if (selectedFacilitator?._id) {
// // // // // // //             loadHistory();
// // // // // // //             const interval = setInterval(loadHistory, 3000);
// // // // // // //             return () => clearInterval(interval);
// // // // // // //         }
// // // // // // //     }, [selectedFacilitator]);

// // // // // // //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// // // // // // //     const loadHistory = async () => {
// // // // // // //         try {
// // // // // // //             const res = await api(`/api/chat/${selectedFacilitator._id}?t=${Date.now()}`);
// // // // // // //             setMessages(res.messages || []);
// // // // // // //         } catch (e) { console.error(e); }
// // // // // // //     };

// // // // // // //     const handleSend = async (e: React.FormEvent) => {
// // // // // // //         e.preventDefault();
// // // // // // //         if (!message.trim() || !selectedFacilitator) return;
// // // // // // //         setSending(true);
// // // // // // //         try {
// // // // // // //             await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message } });
// // // // // // //             setMessage('');
// // // // // // //             loadHistory();
// // // // // // //         } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); }
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center !z-[99999] p-4 backdrop-blur-sm">
// // // // // // //             <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px] animate-in zoom-in-95" role="dialog" aria-modal="true" aria-label="Chat Personal">
// // // // // // //                 <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10 shrink-0">
// // // // // // //                     <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18} /> Hubungi Pengajar</h3>
// // // // // // //                     <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20} /></button>
// // // // // // //                 </div>
// // // // // // //                 {!selectedFacilitator ? (
// // // // // // //                     <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center text-gray-500">Tidak ada fasilitator.</div>
// // // // // // //                 ) : (
// // // // // // //                     <>
// // // // // // //                         {facilitators.length > 1 && (
// // // // // // //                             <div className="p-3 bg-gray-50 border-b flex gap-2 overflow-x-auto shrink-0">
// // // // // // //                                 {facilitators.map((f:any) => (
// // // // // // //                                     <button type="button" key={f._id} onClick={()=>setSelectedFacilitator(f)} className={`px-3 py-1 text-xs rounded-full border ${selectedFacilitator._id===f._id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300'}`} title={`Pilih ${f.name}`}>{f.name}</button>
// // // // // // //                                 ))}
// // // // // // //                             </div>
// // // // // // //                         )}
// // // // // // //                         <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// // // // // // //                             {messages.map((msg: any, idx: number) => {
// // // // // // //                                 const isMe = msg.sender === 'me' || msg.sender?._id === user?.id;
// // // // // // //                                 return (
// // // // // // //                                     <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
// // // // // // //                                         <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
// // // // // // //                                             <p>{msg.message}</p>
// // // // // // //                                         </div>
// // // // // // //                                     </div>
// // // // // // //                                 );
// // // // // // //                             })}
// // // // // // //                             <div ref={messagesEndRef} />
// // // // // // //                         </div>
// // // // // // //                         <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2 shrink-0">
// // // // // // //                             <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50 outline-none focus:border-indigo-500" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus title="Input Pesan" aria-label="Ketik pesan" />
// // // // // // //                             <button type="submit" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button>
// // // // // // //                         </form>
// // // // // // //                     </>
// // // // // // //                 )}
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // }

// // // // // // // // --- MAIN PAGE COMPONENT ---
// // // // // // // export default function StudentCoursePlayPage() {
// // // // // // //     const router = useRouter();
// // // // // // //     const params = useParams();
// // // // // // //     const { user } = useAuth();
// // // // // // //     const { courseId } = params as { courseId: string };
  
// // // // // // //     const [course, setCourse] = useState<any>(null);
// // // // // // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // // //     const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // // // // // //     const [progressPercent, setProgressPercent] = useState(0);
// // // // // // //     const [courseFacilitators, setCourseFacilitators] = useState<any[]>([]); 
// // // // // // //     const [courseParticipants, setCourseParticipants] = useState<any[]>([]); 
    
// // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // //     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // // // // //     const [isEnrolled, setIsEnrolled] = useState(false);
// // // // // // //     const [enrollmentStatus, setEnrollmentStatus] = useState<string>(''); 
// // // // // // //     const [showRegisterModal, setShowRegisterModal] = useState(false);
// // // // // // //     const [showPersonalChat, setShowPersonalChat] = useState(false); 
  
// // // // // // //     const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// // // // // // //     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// // // // // // //     const [pollSelected, setPollSelected] = useState<number | null>(null);
// // // // // // //     const [isSubmitting, setIsSubmitting] = useState(false);
    
// // // // // // //     const [isReuploading, setIsReuploading] = useState(false);

// // // // // // //     // STATE TIMER & START
// // // // // // //     const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
// // // // // // //     const [isStarted, setIsStarted] = useState(false); 
  
// // // // // // //     // 1. INIT DATA
// // // // // // //     useEffect(() => {
// // // // // // //         const initData = async () => {
// // // // // // //           try {
// // // // // // //             setLoading(true);
// // // // // // //             const resCourse = await api(`/api/courses/${courseId}`);
// // // // // // //             const courseData = resCourse.course || resCourse;
// // // // // // //             setCourse(courseData);
// // // // // // //             setCourseFacilitators(courseData.facilitatorIds || []); 
    
// // // // // // //             if (user) {
// // // // // // //                 try {
// // // // // // //                     const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// // // // // // //                     setIsEnrolled(enrollRes.isEnrolled);
                    
// // // // // // //                     if (enrollRes.isEnrolled) {
// // // // // // //                         setEnrollmentStatus(enrollRes.status || 'pending'); 
// // // // // // //                         if (enrollRes.status === 'active' || enrollRes.status === 'approved') {
// // // // // // //                             const resProgress = await api(`/api/progress/${courseId}`);
// // // // // // //                             setCompletedLessonIds(resProgress.completedLessons || []);

// // // // // // //                             try {
// // // // // // //                                 const resPart = await api(`/api/courses/${courseId}/participants`);
// // // // // // //                                 const userList = resPart.participants?.map((p: any) => p.user) || [];
// // // // // // //                                 setCourseParticipants(userList);
// // // // // // //                             } catch (e) { console.error("Gagal load peserta chat", e); }
// // // // // // //                         }
// // // // // // //                     }
// // // // // // //                 } catch (e) { console.error("Enroll check failed", e); }
// // // // // // //             }
// // // // // // //             if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
// // // // // // //           } catch (e) { console.error("Init failed", e); } finally { setLoading(false); }
// // // // // // //         };
// // // // // // //         if (courseId) initData();
// // // // // // //     }, [courseId, user]);
    
// // // // // // //     // 2. LOGIKA TIMER & TOMBOL MULAI
// // // // // // //     useEffect(() => {
// // // // // // //         setTimerSeconds(null);
// // // // // // //         if (activeLesson) {
// // // // // // //             if (!activeLesson.quizDuration || activeLesson.quizDuration <= 0 || completedLessonIds.includes(activeLesson._id)) {
// // // // // // //                 setIsStarted(true);
// // // // // // //                 return;
// // // // // // //             }
// // // // // // //             const storageKey = `timer_${user?.id}_${activeLesson._id}`;
// // // // // // //             const storedEndTime = localStorage.getItem(storageKey);
// // // // // // //             if (storedEndTime) {
// // // // // // //                 const endTime = parseInt(storedEndTime, 10);
// // // // // // //                 if (endTime > Date.now()) {
// // // // // // //                     setIsStarted(true); 
// // // // // // //                     startTicker(endTime); 
// // // // // // //                 } else {
// // // // // // //                     localStorage.removeItem(storageKey);
// // // // // // //                     setIsStarted(true); 
// // // // // // //                     setTimerSeconds(0);
// // // // // // //                 }
// // // // // // //             } else {
// // // // // // //                 setIsStarted(false);
// // // // // // //             }
// // // // // // //         }
// // // // // // //     }, [activeLesson, completedLessonIds, user]);

// // // // // // //     const startTicker = (endTime: number) => {
// // // // // // //         const update = () => {
// // // // // // //             const now = Date.now();
// // // // // // //             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
// // // // // // //             setTimerSeconds(remaining);
// // // // // // //         };
// // // // // // //         update(); 
// // // // // // //         const interval = setInterval(() => {
// // // // // // //             const now = Date.now();
// // // // // // //             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
// // // // // // //             setTimerSeconds(remaining);
// // // // // // //             if (remaining <= 0) clearInterval(interval);
// // // // // // //         }, 1000);
// // // // // // //         return interval;
// // // // // // //     };

// // // // // // //     const handleStartLesson = () => {
// // // // // // //         setIsStarted(true);
// // // // // // //         if (activeLesson.quizDuration > 0) {
// // // // // // //             const endTime = Date.now() + activeLesson.quizDuration * 60 * 1000;
// // // // // // //             localStorage.setItem(`timer_${user?.id}_${activeLesson._id}`, endTime.toString());
// // // // // // //             startTicker(endTime);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const formatTimer = (seconds: number) => {
// // // // // // //         const m = Math.floor(seconds / 60);
// // // // // // //         const s = seconds % 60;
// // // // // // //         return `${m}:${s < 10 ? '0' : ''}${s}`;
// // // // // // //     };

// // // // // // //     useEffect(() => {
// // // // // // //         if (course && !loading) {
// // // // // // //             let total = 0; let completed = 0;
// // // // // // //             course.modules?.forEach((m: any) => { 
// // // // // // //                 if(m.isActive) {
// // // // // // //                     m.lessons?.forEach((l: any) => { 
// // // // // // //                         if(l.isActive) { 
// // // // // // //                             total++; 
// // // // // // //                             if (completedLessonIds.includes(l._id)) completed++; 
// // // // // // //                         } 
// // // // // // //                     });
// // // // // // //                 }
// // // // // // //             });
// // // // // // //             const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
// // // // // // //             setProgressPercent(percent);
// // // // // // //         }
// // // // // // //     }, [completedLessonIds, course, loading]);
    
// // // // // // //     useEffect(() => {
// // // // // // //           setUploadedFile(null);
// // // // // // //           setPollSelected(null);
// // // // // // //           setIsSubmitting(false);
// // // // // // //           setIsReuploading(false); 
// // // // // // //           if (activeLesson?.type === 'essay' && activeLesson.questions) {
// // // // // // //               setEssayAnswers(new Array(activeLesson.questions.length).fill(''));
// // // // // // //           } else {
// // // // // // //               setEssayAnswers([]);
// // // // // // //           }
// // // // // // //     }, [activeLesson]);

// // // // // // //     const handleEssayChange = (index: number, value: string) => {
// // // // // // //         const newAnswers = [...essayAnswers];
// // // // // // //         newAnswers[index] = value;
// // // // // // //         setEssayAnswers(newAnswers);
// // // // // // //     };

// // // // // // //     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //         const file = e.target.files?.[0];
// // // // // // //         if (!file) return;
// // // // // // //         if (file.size > 10 * 1024 * 1024) {
// // // // // // //             alert(`File terlalu besar (${(file.size / 1024 / 1024).toFixed(2)} MB).\nMaksimal upload 10 MB agar tidak ditolak server.`);
// // // // // // //             e.target.value = ''; 
// // // // // // //             return;
// // // // // // //         }
// // // // // // //         setUploadedFile(file);
// // // // // // //     };

// // // // // // //     const markLessonAsComplete = async (lessonId: string, extraData: any = {}) => {
// // // // // // //         try { 
// // // // // // //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId, ...extraData } }); 
// // // // // // //             if (!completedLessonIds.includes(lessonId)) {
// // // // // // //                 setCompletedLessonIds(prev => [...prev, lessonId]); 
// // // // // // //             }
// // // // // // //             if(user) localStorage.removeItem(`timer_${user.id}_${lessonId}`);
// // // // // // //         } catch(e) { console.error("Save progress failed", e); throw e; }
// // // // // // //     };
    
// // // // // // //     const handleNextLesson = () => {
// // // // // // //         const allLessons: any[] = [];
// // // // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // //         if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // // // // // //         else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // // // // // //     };
    
// // // // // // //     const handlePrevLesson = () => {
// // // // // // //         const allLessons: any[] = [];
// // // // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // // //         if (currIdx > 0) { setActiveLesson(allLessons[currIdx - 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }
// // // // // // //     };

// // // // // // //     const handleManualComplete = async () => { 
// // // // // // //         await markLessonAsComplete(activeLesson._id); 
// // // // // // //         handleNextLesson(); 
// // // // // // //     };
    
// // // // // // //     const handleQuizCompleted = async (result: { score: number, attempts: number }) => { 
// // // // // // //         try {
// // // // // // //             await markLessonAsComplete(activeLesson._id, { 
// // // // // // //                 score: result.score, 
// // // // // // //                 attempts: result.attempts 
// // // // // // //             });
// // // // // // //             if (!completedLessonIds.includes(activeLesson._id)) {
// // // // // // //                 setCompletedLessonIds(prev => [...prev, activeLesson._id]); 
// // // // // // //             }
// // // // // // //         } catch (e) { console.error("Gagal simpan skor kuis", e); }
// // // // // // //     };
    
// // // // // // //     const handleSubmitTask = async () => {
// // // // // // //         setIsSubmitting(true);
// // // // // // //         try {
// // // // // // //             if (activeLesson.type === 'essay') {
// // // // // // //                 if (essayAnswers.some(ans => ans.trim() === '')) throw new Error("Mohon jawab semua pertanyaan.");
// // // // // // //                 await api(`/api/progress/${courseId}/submit-essay`, { 
// // // // // // //                     method: 'POST', 
// // // // // // //                     body: { lessonId: activeLesson._id, answers: essayAnswers } 
// // // // // // //                 });
// // // // // // //             } else if (activeLesson.type === 'upload_doc' || activeLesson.type === 'image') {
// // // // // // //                 if (!uploadedFile) throw new Error("Pilih file terlebih dahulu.");
                
// // // // // // //                 const fd = new FormData();
// // // // // // //                 fd.append('file', uploadedFile);
                
// // // // // // //                 const uploadRes: any = await apiUpload('/api/upload', fd); 
// // // // // // //                 let fileUrl = "";
// // // // // // //                 if (uploadRes.data && uploadRes.data.url) fileUrl = uploadRes.data.url;
// // // // // // //                 else if (uploadRes.url) fileUrl = uploadRes.url;
// // // // // // //                 else if (uploadRes.file && uploadRes.file.path) fileUrl = uploadRes.file.path;
// // // // // // //                 else if (uploadRes.file && uploadRes.file.secure_url) fileUrl = uploadRes.file.secure_url;

// // // // // // //                 if (!fileUrl) throw new Error(`Gagal membaca URL. Response server tidak memiliki field url yang dikenali.`);

// // // // // // //                 await api(`/api/progress/${courseId}/submit-task`, { 
// // // // // // //                     method: 'POST', 
// // // // // // //                     body: { lessonId: activeLesson._id, fileUrl: fileUrl, fileName: uploadedFile.name } 
// // // // // // //                 });

// // // // // // //             } else if (activeLesson.type === 'poll') {
// // // // // // //                 if (pollSelected === null) throw new Error("Pilih salah satu opsi.");
// // // // // // //                 const answerText = activeLesson.pollOptions[pollSelected];
// // // // // // //                 await markLessonAsComplete(activeLesson._id, { pollAnswer: answerText });
// // // // // // //             } else {
// // // // // // //                 await markLessonAsComplete(activeLesson._id);
// // // // // // //             }

// // // // // // //             if (!completedLessonIds.includes(activeLesson._id)) {
// // // // // // //                 setCompletedLessonIds(prev => [...prev, activeLesson._id]);
// // // // // // //             }
// // // // // // //             setIsReuploading(false);
// // // // // // //             alert("Berhasil dikirim!");
// // // // // // //             handleNextLesson();
// // // // // // //         } catch (e: any) { 
// // // // // // //             console.error("Submit Error:", e);
// // // // // // //             alert("Gagal mengirim: " + e.message); 
// // // // // // //         } finally { 
// // // // // // //             setIsSubmitting(false); 
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const renderContentHeader = (title: string) => (
// // // // // // //         <div className="mb-6 border-b border-gray-100 pb-4">
// // // // // // //             <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// // // // // // //                 <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 flex items-center gap-1">
// // // // // // //                     {activeLesson?.type?.replace(/_/g, ' ') || 'MATERI'}
// // // // // // //                 </span>
// // // // // // //             </div>
// // // // // // //             <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
// // // // // // //                 <h1 className="text-gray-900 font-bold text-2xl flex-1 leading-tight">{title}</h1>
// // // // // // //                 <div className="flex-shrink-0 flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
// // // // // // //                     {activeLesson.quizDuration > 0 && (
// // // // // // //                         <div className={`flex items-center gap-1 px-2 py-0.5 rounded border ${timerSeconds !== null && timerSeconds < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
// // // // // // //                             <Clock size={14} /> 
// // // // // // //                             <span className="font-bold text-sm">
// // // // // // //                                 {timerSeconds !== null ? `Sisa: ${formatTimer(timerSeconds)}` : `${activeLesson.quizDuration} Menit`}
// // // // // // //                             </span>
// // // // // // //                         </div>
// // // // // // //                     )}
// // // // // // //                     <div className="flex items-center gap-1"><Users size={12} className="text-indigo-500"/> <span>{getFacilitatorName(activeLesson.facilitatorId, courseFacilitators)}</span></div>
// // // // // // //                     {activeLesson.jp > 0 && <div className="flex items-center gap-1 border-l pl-3"><Clock size={12} className="text-indigo-500"/> <span>{activeLesson.jp} JP</span></div>}
// // // // // // //                     {(activeLesson.scheduleDate) && <div className="flex items-center gap-1 border-l pl-3"><Calendar size={12} className="text-indigo-500"/> <span>{formatDate(activeLesson.scheduleDate)}</span></div>}
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );

// // // // // // //     const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
// // // // // // //         if (activeLesson.quizDuration > 0 && !isStarted && !completedLessonIds.includes(activeLesson._id)) {
// // // // // // //             return (
// // // // // // //                 <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-200 text-center min-h-[300px] animate-in fade-in zoom-in duration-300">
// // // // // // //                     <div className="bg-indigo-100 p-5 rounded-full mb-6 text-indigo-600 shadow-inner"><Clock size={48} /></div>
// // // // // // //                     <h2 className="text-2xl font-bold text-gray-800 mb-3">Materi dengan Batas Waktu</h2>
// // // // // // //                     <p className="text-gray-500 mb-8 max-w-md leading-relaxed">Materi <strong>"{activeLesson.title}"</strong> memiliki batas waktu pengerjaan selama <span className="font-bold text-gray-800">{activeLesson.quizDuration} Menit</span>.<br/><span className="text-xs text-red-500 mt-2 block">*Waktu akan berjalan otomatis setelah Anda menekan tombol di bawah.</span></p>
// // // // // // //                     <button onClick={handleStartLesson} className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95"><Play size={20} fill="currentColor" /> Mulai Kerjakan Sekarang</button>
// // // // // // //                 </div>
// // // // // // //             );
// // // // // // //         }
// // // // // // //         if (timerSeconds !== null && timerSeconds <= 0 && !completedLessonIds.includes(activeLesson._id)) {
// // // // // // //              return (
// // // // // // //                 <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-xl shadow-sm border border-red-200 text-center min-h-[300px]">
// // // // // // //                     <div className="bg-red-100 p-4 rounded-full mb-4 text-red-600"><AlertCircle size={40} /></div>
// // // // // // //                     <h2 className="text-xl font-bold text-red-800 mb-2">Waktu Habis!</h2>
// // // // // // //                     <p className="text-red-600 mb-6">Waktu pengerjaan untuk materi ini telah berakhir.</p>
// // // // // // //                     <button onClick={handleNextLesson} className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">Lanjut Materi Berikutnya</button>
// // // // // // //                 </div>
// // // // // // //              );
// // // // // // //         }
// // // // // // //         return <>{children}</>;
// // // // // // //     };

// // // // // // //     const renderContent = () => {
// // // // // // //         if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping.</div>;
        
// // // // // // //         const isLessonCompleted = completedLessonIds.includes(activeLesson._id);

// // // // // // //         const content = (
// // // // // // //             <>
// // // // // // //                 {activeLesson.type === 'quiz' && (
// // // // // // //                     <QuizPlayer 
// // // // // // //                         quizId={activeLesson._id} 
// // // // // // //                         courseId={courseId} 
// // // // // // //                         lessonData={activeLesson}
// // // // // // //                         onComplete={handleQuizCompleted} 
// // // // // // //                     />
// // // // // // //                 )}
                
// // // // // // //                 {activeLesson.type === 'image' && (
// // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // //                         <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
// // // // // // //                             <img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="w-full h-auto object-contain" />
// // // // // // //                         </div>
// // // // // // //                         {activeLesson.content && <div className="prose max-w-none mt-6 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />}
// // // // // // //                     </div>
// // // // // // //                 )}

// // // // // // //                 {(activeLesson.type === 'slide' || activeLesson.type === 'download_doc') && (
// // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // //                         <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center mb-6">
// // // // // // //                             <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4"><FileText size={32} /></div>
// // // // // // //                             <h3 className="text-lg font-bold text-gray-800 mb-2">{activeLesson.title}</h3>
// // // // // // //                             <p className="text-sm text-gray-500 mb-6">Dokumen Materi Pembelajaran.</p>
// // // // // // //                             <a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-transform active:scale-95" aria-label="Download File">
// // // // // // //                                 <Download size={18} /> Download Materi
// // // // // // //                             </a>
// // // // // // //                         </div>
// // // // // // //                         {activeLesson.fileUrl && activeLesson.fileUrl.endsWith('.pdf') && (
// // // // // // //                             <div className="mt-8 border rounded-xl overflow-hidden h-[800px] shadow-sm">
// // // // // // //                                 <iframe src={getImageUrl(activeLesson.fileUrl)} className="w-full h-full" title="Preview"></iframe>
// // // // // // //                             </div>
// // // // // // //                         )}
// // // // // // //                     </div>
// // // // // // //                 )}

// // // // // // //                 {activeLesson.type === 'video_url' && (
// // // // // // //                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
// // // // // // //                         <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
// // // // // // //                             <iframe src={getEmbedUrl(activeLesson.videoUrl)} className="w-full h-full" allowFullScreen title={`Video ${activeLesson.title}`} />
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 )}

// // // // // // //                 {activeLesson.type === 'virtual_class' && (
// // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // //                         <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
// // // // // // //                             <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"><Video size={40}/></div>
// // // // // // //                             <h3 className="text-xl font-bold text-gray-900 mb-2">Kelas Virtual (Zoom/Meet)</h3>
// // // // // // //                             <p className="text-gray-600 mb-6">Silakan bergabung ke pertemuan virtual melalui tombol di bawah ini.</p>
                            
// // // // // // //                             {(activeLesson.meetingLink || activeLesson.content) ? (
// // // // // // //                                 <div className="space-y-3">
// // // // // // //                                     <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg"><Video size={20}/> Gabung Meeting</a>
// // // // // // //                                     <div className="text-xs text-gray-500">Link: <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" className="text-purple-600 underline">{activeLesson.meetingLink || activeLesson.content}</a></div>
// // // // // // //                                 </div>
// // // // // // //                             ) : (
// // // // // // //                                 <button disabled className="inline-flex items-center gap-2 bg-gray-400 text-white px-8 py-3 rounded-full font-bold cursor-not-allowed"><Video size={20}/> Link Belum Tersedia</button>
// // // // // // //                             )}
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 )}
                
// // // // // // //                 {activeLesson.type === 'google_classroom' && (
// // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // // //                         <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
// // // // // // //                             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border"><School size={40} className="text-green-600"/></div>
// // // // // // //                             <h3 className="text-xl font-bold text-gray-900 mb-2">Google Classroom</h3>
// // // // // // //                             <p className="text-gray-600 mb-2">Materi ini terhubung dengan Google Classroom.</p>
// // // // // // //                             {activeLesson.classroomData ? (
// // // // // // //                                 <div className="mt-4">
// // // // // // //                                     <p className="font-bold text-lg">{activeLesson.classroomData.name}</p>
// // // // // // //                                     <p className="text-sm text-gray-500 mb-6">Kode Kelas: <span className="font-mono bg-white px-2 py-1 border rounded">{activeLesson.classroomData.enrollmentCode || '-'}</span></p>
// // // // // // //                                     <a href={activeLesson.classroomData.alternateLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 shadow-lg">Buka Google Classroom ↗</a>
// // // // // // //                                 </div>
// // // // // // //                             ) : <p className="text-red-500 italic">Data kelas tidak ditemukan.</p>}
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 )}

// // // // // // //                 {['essay', 'upload_doc', 'image', 'poll', 'lesson'].includes(activeLesson.type) && (
// // // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6">
// // // // // // //                         {activeLesson.content && activeLesson.type !== 'image' && (
// // // // // // //                             <div className="prose max-w-none mb-8 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
// // // // // // //                         )}
                        
// // // // // // //                         {activeLesson.type === 'essay' && (
// // // // // // //                             <div className="space-y-6">
// // // // // // //                                 {activeLesson.questions?.map((q:any,i:number)=>(
// // // // // // //                                     <div key={i} className="border p-4 rounded-lg bg-gray-50">
// // // // // // //                                             <div className="font-bold mb-2 text-sm text-gray-700 flex gap-2"><span>{i+1}.</span><div dangerouslySetInnerHTML={{ __html: q.question }} /></div>
// // // // // // //                                             <div className="bg-white"><ReactQuill theme="snow" value={essayAnswers[i]||''} onChange={(v)=>handleEssayChange(i,v)} placeholder="Tulis jawaban..."/></div>
// // // // // // //                                     </div>
// // // // // // //                                 ))}
// // // // // // //                                 <button onClick={handleSubmitTask} disabled={isSubmitting} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold w-full hover:bg-indigo-700 transition-colors" title="Kirim Jawaban" aria-label="Kirim Jawaban">{isSubmitting?'Mengirim...':'Kirim Jawaban'}</button>
// // // // // // //                             </div>
// // // // // // //                         )}
                        
// // // // // // //                         {(activeLesson.type === 'upload_doc' || activeLesson.type === 'image') && (
// // // // // // //                             <div className="border-2 border-dashed p-8 text-center rounded-xl bg-gray-50 border-indigo-200">
// // // // // // //                                 {isLessonCompleted && !uploadedFile && !isReuploading ? (
// // // // // // //                                     <div className="animate-in fade-in zoom-in duration-300">
// // // // // // //                                         <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"><CheckCircle size={32} /></div>
// // // // // // //                                         <h3 className="text-xl font-bold text-gray-800 mb-2">Tugas Sudah Dikirim!</h3>
// // // // // // //                                         <p className="text-gray-500 mb-6 text-sm">Anda telah menyelesaikan tugas ini.</p>
// // // // // // //                                         <button onClick={() => setIsReuploading(true)} className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-50 shadow-sm transition-colors text-sm">Kirim Ulang / Ganti File</button>
// // // // // // //                                     </div>
// // // // // // //                                 ) : (
// // // // // // //                                     <>
// // // // // // //                                         {uploadedFile ? (
// // // // // // //                                             <div className="text-center w-full animate-in fade-in zoom-in duration-300">
// // // // // // //                                                  <div className="text-green-600 font-bold text-lg mb-2 flex items-center justify-center gap-2"><FileCheck className="w-8 h-8" /> File Siap Upload!</div>
// // // // // // //                                                  <p className="text-gray-700 font-medium break-all mb-4 px-4 bg-white py-2 rounded border inline-block shadow-sm">{uploadedFile.name}<span className="block text-[10px] text-gray-400 font-normal">({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)</span></p>
// // // // // // //                                                  <div className="flex justify-center gap-3"><button onClick={() => setUploadedFile(null)} className="text-red-500 hover:text-red-700 text-sm font-bold underline">Ganti File</button></div>
// // // // // // //                                             </div>
// // // // // // //                                         ) : (
// // // // // // //                                             <>
// // // // // // //                                                 <UploadCloud className="mx-auto text-indigo-400 mb-2" size={32}/>
// // // // // // //                                                 <p className="text-sm text-gray-500 mb-4">Upload tugas Anda di sini (PDF/DOCX/JPG)</p>
// // // // // // //                                                 <label className="cursor-pointer bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 inline-flex items-center gap-2 transition-transform active:scale-95 shadow-md">
// // // // // // //                                                     <UploadCloud size={18}/> Pilih File
// // // // // // //                                                     <input type="file" className="hidden" onChange={handleFileChange} accept={activeLesson.type === 'image' ? "image/*" : ".pdf,.doc,.docx,.jpg,.jpeg,.png"}/>
// // // // // // //                                                 </label>
// // // // // // //                                                 <p className="text-[10px] text-gray-400 mt-3">Maksimal Ukuran File: 10 MB</p>
// // // // // // //                                             </>
// // // // // // //                                         )}
// // // // // // //                                         <button onClick={handleSubmitTask} disabled={!uploadedFile || isSubmitting} className={`mt-6 px-10 py-3 mx-auto block rounded-xl font-bold text-white shadow-lg transition-all ${!uploadedFile ? 'bg-gray-300 cursor-not-allowed hidden' : 'bg-green-600 hover:bg-green-700 hover:scale-[1.02]'}`} title="Upload Tugas" aria-label="Upload Tugas">{isSubmitting ? 'Sedang Mengirim...' : 'Kirim Tugas Sekarang'}</button>
// // // // // // //                                         {isReuploading && !uploadedFile && (<button onClick={() => setIsReuploading(false)} className="mt-4 text-xs text-gray-500 hover:text-gray-700 underline">Batal, kembali ke status selesai</button>)}
// // // // // // //                                     </>
// // // // // // //                                 )}
// // // // // // //                             </div>
// // // // // // //                         )}
                        
// // // // // // //                         {activeLesson.type === 'poll' && (
// // // // // // //                             <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
// // // // // // //                                 <h3 className="font-bold text-lg mb-4">{activeLesson.pollQuestion || "Polling"}</h3>
// // // // // // //                                 <div className="space-y-3 max-w-sm mx-auto">
// // // // // // //                                     {activeLesson.pollOptions?.map((opt:string, idx:number) => (
// // // // // // //                                         <button key={idx} onClick={()=>setPollSelected(idx)} className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${pollSelected===idx ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-100 border-gray-300'}`} title={`Pilih ${opt}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>
// // // // // // //                                     ))}
// // // // // // //                                 </div>
// // // // // // //                                 <button onClick={handleSubmitTask} disabled={pollSelected===null||isSubmitting} className="mt-6 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition-colors" title="Kirim Polling" aria-label="Kirim Polling">Kirim Polling</button>
// // // // // // //                             </div>
// // // // // // //                         )}
// // // // // // //                     </div>
// // // // // // //                 )}
// // // // // // //             </>
// // // // // // //         );

// // // // // // //         return (
// // // // // // //             <div>
// // // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // // //                 <ContentWrapper>
// // // // // // //                     {content}
// // // // // // //                 </ContentWrapper>
// // // // // // //             </div>
// // // // // // //         );
// // // // // // //     };
  
// // // // // // //     if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // // // // //     if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;
  
// // // // // // //     if (!isEnrolled || enrollmentStatus === 'pending') {
// // // // // // //         return (
// // // // // // //           <div className="min-h-screen bg-gray-50 pb-20">
// // // // // // //               {showRegisterModal && (
// // // // // // //                   <CourseRegistrationModal 
// // // // // // //                     courseId={courseId} 
// // // // // // //                     courseTitle={course.title} 
// // // // // // //                     programType={course.programType} 
// // // // // // //                     user={user} 
// // // // // // //                     onClose={() => setShowRegisterModal(false)} 
// // // // // // //                     onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil! Menunggu Verifikasi."); window.location.reload(); }} 
// // // // // // //                   />
// // // // // // //               )}
              
// // // // // // //               <div className="relative bg-gray-900 text-white">
// // // // // // //                   <div className="absolute inset-0 bg-black/60 z-0"></div>
// // // // // // //                   {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" alt="" />}
                  
// // // // // // //                   <div className="max-w-6xl mx-auto px-6 py-24 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
// // // // // // //                       <div className="lg:col-span-2 space-y-6">
// // // // // // //                           <div className="flex items-center gap-3">
// // // // // // //                               <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${course.programType === 'training' ? 'bg-orange-500' : 'bg-blue-500'}`}>
// // // // // // //                                   {course.programType === 'training' ? 'Diklat / Pelatihan' : 'Kursus Mandiri'}
// // // // // // //                               </span>
// // // // // // //                               {course.category && <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">{course.category}</span>}
// // // // // // //                           </div>
// // // // // // //                           <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{course.title}</h1>
// // // // // // //                           <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300 pt-2">
// // // // // // //                               <div className="flex items-center gap-2"><Users size={18}/> {courseFacilitators.length} Fasilitator</div>
// // // // // // //                               <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
// // // // // // //                               <div className="flex items-center gap-2"><Clock size={18}/> {course.programType === 'training' ? 'Terjadwal' : 'Fleksibel'}</div>
// // // // // // //                               {course.certificateConfig && <div className="flex items-center gap-2 text-yellow-400"><Award size={18}/> Sertifikat Tersedia</div>}
// // // // // // //                           </div>
// // // // // // //                       </div>

// // // // // // //                       <div className="lg:col-span-1">
// // // // // // //                           <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-100 sticky top-24">
// // // // // // //                               <div className="text-center mb-8">
// // // // // // //                                   <p className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Biaya Investasi</p>
// // // // // // //                                   <p className="text-4xl font-black text-green-600">{course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}</p>
// // // // // // //                               </div>

// // // // // // //                               {enrollmentStatus === 'pending' ? (
// // // // // // //                                   <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-center border border-yellow-200">
// // // // // // //                                       <h3 className="font-bold mb-1">Menunggu Verifikasi</h3>
// // // // // // //                                       <p className="text-xs">Pendaftaran Anda sedang diproses admin.</p>
// // // // // // //                                   </div>
// // // // // // //                               ) : (
// // // // // // //                                   <button onClick={() => setShowRegisterModal(true)} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-lg" title="Daftar Sekarang" aria-label="Daftar Sekarang">📝 Daftar Sekarang</button>
// // // // // // //                               )}
// // // // // // //                               <p className="text-xs text-center text-gray-400 mt-4">*Akses selamanya setelah terdaftar</p>
// // // // // // //                           </div>
// // // // // // //                       </div>
// // // // // // //                   </div>
// // // // // // //               </div>

// // // // // // //               <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
// // // // // // //                   <div className="lg:col-span-2 space-y-12">
// // // // // // //                       <section>
// // // // // // //                           <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="text-red-600"/> Tentang Program Ini</h3>
// // // // // // //                           <div className="prose max-w-none text-gray-600 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm" dangerouslySetInnerHTML={{ __html: course.description || "<p>Belum ada deskripsi.</p>" }} />
// // // // // // //                       </section>

// // // // // // //                       <section>
// // // // // // //                           <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="text-red-600"/> Kurikulum & Materi</h3>
// // // // // // //                           <div className="space-y-4">
// // // // // // //                               {course.modules?.map((mod: any, idx: number) => (
// // // // // // //                                   <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
// // // // // // //                                       <div className="bg-gray-50 px-6 py-4 border-b font-bold text-gray-800 flex justify-between">
// // // // // // //                                           <span>Modul {idx + 1}: {mod.title}</span>
// // // // // // //                                           <span className="text-xs font-normal text-gray-500 bg-white px-2 py-1 rounded border">{mod.lessons?.length || 0} Materi</span>
// // // // // // //                                       </div>
// // // // // // //                                       <div className="divide-y">
// // // // // // //                                           {mod.lessons?.map((les: any, lIdx: number) => (
// // // // // // //                                               <div key={lIdx} className="px-6 py-3 flex items-center gap-3 text-sm text-gray-600">
// // // // // // //                                                   {les.type === 'video_url' ? <PlayCircle size={16} className="text-blue-500"/> : <FileText size={16} className="text-gray-400"/>}
// // // // // // //                                                   {les.title}
// // // // // // //                                                   {les.jp > 0 && <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{les.jp} JP</span>}
// // // // // // //                                               </div>
// // // // // // //                                           ))}
// // // // // // //                                       </div>
// // // // // // //                                   </div>
// // // // // // //                               ))}
// // // // // // //                           </div>
// // // // // // //                       </section>
// // // // // // //                   </div>

// // // // // // //                   <div className="space-y-8">
// // // // // // //                       <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
// // // // // // //                           <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Users className="text-red-600"/> Tim Fasilitator</h4>
// // // // // // //                           <div className="space-y-4">
// // // // // // //                               {courseFacilitators.map((fac: any) => (
// // // // // // //                                   <div key={fac._id} className="flex items-center gap-3">
// // // // // // //                                       {fac.avatarUrl ? (<img src={getImageUrl(fac.avatarUrl)} className="w-10 h-10 rounded-full object-cover border" alt={fac.name}/>) : (<div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">{fac.name.charAt(0)}</div>)}
// // // // // // //                                       <div><p className="font-bold text-sm text-gray-800">{fac.name}</p><p className="text-xs text-gray-500">Fasilitator</p></div>
// // // // // // //                                   </div>
// // // // // // //                               ))}
// // // // // // //                               {courseFacilitators.length === 0 && <p className="text-sm text-gray-500 italic">Belum ditentukan.</p>}
// // // // // // //                           </div>
// // // // // // //                       </section>

// // // // // // //                       <section className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
// // // // // // //                           <h4 className="font-bold text-indigo-900 mb-4">Fasilitas Program</h4>
// // // // // // //                           <ul className="space-y-3 text-sm text-indigo-800">
// // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Akses Materi Seumur Hidup</li>
// // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Grup Diskusi Eksklusif</li>
// // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Sertifikat Kelulusan</li>
// // // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Konsultasi Fasilitator</li>
// // // // // // //                           </ul>
// // // // // // //                       </section>
// // // // // // //                   </div>
// // // // // // //               </div>
// // // // // // //           </div>
// // // // // // //         );
// // // // // // //     }
  
// // // // // // //     // TAMPILAN DASHBOARD BELAJAR
// // // // // // //     const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;
  
// // // // // // //     return (
// // // // // // //       <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // // // // // //         <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
// // // // // // //           <div className="p-5 border-b bg-white">
// // // // // // //               <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" title="Kembali ke Katalog" aria-label="Kembali"><span>←</span> KEMBALI KE KATALOG</Link>
// // // // // // //               <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
// // // // // // //               <div className="space-y-2">
// // // // // // //                   <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{safePercent}%</span></div>
// // // // // // //                   <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: `${safePercent}%`}}></div></div>
// // // // // // //               </div>
// // // // // // //               <button onClick={() => setShowPersonalChat(true)} className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50" title="Hubungi Pengajar" aria-label="Hubungi Pengajar">
// // // // // // //                   <MessageCircle size={16}/> Hubungi Pengajar
// // // // // // //               </button>
// // // // // // //           </div>
// // // // // // //           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
// // // // // // //               {course.modules?.map((mod:any, i:number) => {
// // // // // // //                   // FILTER 1: JIKA MODUL TIDAK AKTIF, SKIP
// // // // // // //                   if (!mod.isActive) return null;

// // // // // // //                   // FILTER 2: AMBIL HANYA LESSON YG AKTIF
// // // // // // //                   const activeLessons = mod.lessons?.filter((l: any) => l.isActive) || [];

// // // // // // //                   return (
// // // // // // //                       <div key={mod._id}>
// // // // // // //                           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
// // // // // // //                           <div className="space-y-1">
// // // // // // //                               {activeLessons.map((les:any) => (
// // // // // // //                                   <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`} title={`Buka Materi ${les.title}`} aria-label={`Buka Materi ${les.title}`}>
// // // // // // //                                       {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
// // // // // // //                                       {les.title}
// // // // // // //                                   </button>
// // // // // // //                               ))}
// // // // // // //                           </div>
// // // // // // //                       </div>
// // // // // // //                   );
// // // // // // //               })}
// // // // // // //           </div>
// // // // // // //         </aside>
  
// // // // // // //         <main className="flex-1 flex flex-col relative h-full overflow-hidden bg-gray-50">
// // // // // // //           <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
// // // // // // //               <button type="button" onClick={()=>setIsSidebarOpen(!isSidebarOpen)} aria-label="Menu" title="Menu"><Menu/></button>
// // // // // // //           </div>
// // // // // // //           <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
// // // // // // //               {renderContent()}
// // // // // // //           </div>
// // // // // // //           <div className="fixed bottom-8 right-8 flex gap-3 z-30">
// // // // // // //               <button type="button" onClick={handlePrevLesson} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105" title="Materi Sebelumnya" aria-label="Materi Sebelumnya"><ChevronLeft/></button>
// // // // // // //               <button type="button" onClick={handleManualComplete} className="h-12 px-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 font-bold hover:scale-105" title="Lanjut Materi" aria-label="Lanjut Materi"><span>Lanjut</span><ChevronRight/></button>
// // // // // // //           </div>
// // // // // // //         </main>
        
// // // // // // //         {showPersonalChat && <ChatWithFacilitatorModal facilitators={courseFacilitators} onClose={() => setShowPersonalChat(false)} />}
  
// // // // // // //         {user && (
// // // // // // //           <CourseGroupChat 
// // // // // // //               courseId={courseId} 
// // // // // // //               currentUser={user} 
// // // // // // //               participants={courseParticipants} 
// // // // // // //               facilitators={courseFacilitators} 
// // // // // // //               isFloating={true} 
// // // // // // //           />
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     );
// // // // // // // }



// // // // // // 'use client';

// // // // // // import { useState, useEffect, useRef } from 'react'; // useMemo dihapus karena modules dipindah keluar
// // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // import Link from 'next/link';
// // // // // // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // // // import CourseGroupChat from '@/components/CourseGroupChat'; 
// // // // // // import ChatNotificationBadge from '@/components/ChatNotificationBadge'; // Import Badge
// // // // // // import { 
// // // // // //     Users, Clock, MessageCircle, ChevronLeft, ChevronRight, Menu, Send, X,
// // // // // //     FileText, PlayCircle, CheckCircle, UploadCloud, Calendar, Download, 
// // // // // //     Image as ImageIcon, Video, School, MonitorPlay, BookOpen, Play, AlertCircle, Award, FileCheck 
// // // // // // } from 'lucide-react';
// // // // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';
// // // // // // import dynamic from 'next/dynamic';
// // // // // // import 'react-quill/dist/quill.snow.css';

// // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // //     ssr: false, 
// // // // // //     loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg border border-gray-200">Loading Editor...</div> 
// // // // // // });

// // // // // // // --- [FIX 1] STATIC QUILL MODULES (Diluar Komponen agar kursor tidak lari saat spasi) ---
// // // // // // const QUILL_MODULES = {
// // // // // //     toolbar: [
// // // // // //         [{ 'header': [1, 2, 3, false] }],
// // // // // //         ['bold', 'italic', 'underline', 'strike'],
// // // // // //         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
// // // // // //         ['clean']
// // // // // //     ]
// // // // // // };

// // // // // // // --- HELPER FUNCTIONS ---
// // // // // // const getFacilitatorName = (activeFacilitatorId: any, facilitatorsList: any[]) => {
// // // // // //     if (!activeFacilitatorId) return '-';
// // // // // //     if (typeof activeFacilitatorId === 'object' && activeFacilitatorId.name) return activeFacilitatorId.name;
// // // // // //     const found = facilitatorsList.find(f => (f._id === activeFacilitatorId) || (f.id === activeFacilitatorId));
// // // // // //     return found ? found.name : 'Fasilitator';
// // // // // // };

// // // // // // const formatDate = (dateString: string) => {
// // // // // //     if (!dateString) return '-';
// // // // // //     return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // // // // };

// // // // // // // Helper URL Video YouTube
// // // // // // const getEmbedUrl = (url: string) => {
// // // // // //     if (!url) return '';
// // // // // //     if (url.includes('youtube.com/embed/')) return url;
// // // // // //     try {
// // // // // //         let videoId = '';
// // // // // //         if (url.includes('youtu.be/')) {
// // // // // //             videoId = url.split('youtu.be/')[1]?.split('?')[0];
// // // // // //         } else if (url.includes('youtube.com/watch')) {
// // // // // //             const urlParams = new URL(url).searchParams;
// // // // // //             videoId = urlParams.get('v') || '';
// // // // // //         }
// // // // // //         if (videoId) return `https://www.youtube.com/embed/${videoId}`;
// // // // // //     } catch (e) { console.error("Error parsing YouTube URL:", e); }
// // // // // //     return url;
// // // // // // };

// // // // // // // --- CHAT MODAL (Personal) ---
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
// // // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center !z-[99999] p-4 backdrop-blur-sm">
// // // // // //             <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px] animate-in zoom-in-95" role="dialog" aria-modal="true" aria-label="Chat Personal">
// // // // // //                 <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10 shrink-0">
// // // // // //                     <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18} /> Hubungi Pengajar</h3>
// // // // // //                     <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20} /></button>
// // // // // //                 </div>
// // // // // //                 {!selectedFacilitator ? (
// // // // // //                     <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center text-gray-500">Tidak ada fasilitator.</div>
// // // // // //                 ) : (
// // // // // //                     <>
// // // // // //                         {facilitators.length > 1 && (
// // // // // //                             <div className="p-3 bg-gray-50 border-b flex gap-2 overflow-x-auto shrink-0">
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
// // // // // //                         <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2 shrink-0">
// // // // // //                             <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50 outline-none focus:border-indigo-500" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} autoFocus title="Input Pesan" aria-label="Ketik pesan" />
// // // // // //                             <button type="submit" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button>
// // // // // //                         </form>
// // // // // //                     </>
// // // // // //                 )}
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // }

// // // // // // // --- MAIN PAGE COMPONENT ---
// // // // // // export default function StudentCoursePlayPage() {
// // // // // //     const router = useRouter();
// // // // // //     const params = useParams();
// // // // // //     const { user } = useAuth();
// // // // // //     const { courseId } = params as { courseId: string };
  
// // // // // //     const [course, setCourse] = useState<any>(null);
// // // // // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // // // // //     const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// // // // // //     const [progressPercent, setProgressPercent] = useState(0);
// // // // // //     const [courseFacilitators, setCourseFacilitators] = useState<any[]>([]); 
// // // // // //     const [courseParticipants, setCourseParticipants] = useState<any[]>([]); 
    
// // // // // //     const [loading, setLoading] = useState(true);
// // // // // //     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // // // //     const [isEnrolled, setIsEnrolled] = useState(false);
// // // // // //     const [enrollmentStatus, setEnrollmentStatus] = useState<string>(''); 
// // // // // //     const [showRegisterModal, setShowRegisterModal] = useState(false);
// // // // // //     const [showPersonalChat, setShowPersonalChat] = useState(false); 
  
// // // // // //     const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// // // // // //     const [currentEssayQ, setCurrentEssayQ] = useState(0); 

// // // // // //     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// // // // // //     const [pollSelected, setPollSelected] = useState<number | null>(null);
// // // // // //     const [isSubmitting, setIsSubmitting] = useState(false);
    
// // // // // //     const [isReuploading, setIsReuploading] = useState(false);

// // // // // //     // STATE TIMER & START
// // // // // //     const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
// // // // // //     const [isStarted, setIsStarted] = useState(false); 
  
// // // // // //     // 1. INIT DATA
// // // // // //     useEffect(() => {
// // // // // //         const initData = async () => {
// // // // // //           try {
// // // // // //             setLoading(true);
// // // // // //             const resCourse = await api(`/api/courses/${courseId}`);
// // // // // //             const courseData = resCourse.course || resCourse;
// // // // // //             setCourse(courseData);
// // // // // //             setCourseFacilitators(courseData.facilitatorIds || []); 
    
// // // // // //             if (user) {
// // // // // //                 try {
// // // // // //                     const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// // // // // //                     setIsEnrolled(enrollRes.isEnrolled);
                    
// // // // // //                     if (enrollRes.isEnrolled) {
// // // // // //                         setEnrollmentStatus(enrollRes.status || 'pending'); 
// // // // // //                         if (enrollRes.status === 'active' || enrollRes.status === 'approved') {
// // // // // //                             const resProgress = await api(`/api/progress/${courseId}`);
// // // // // //                             setCompletedLessonIds(resProgress.completedLessons || []);

// // // // // //                             try {
// // // // // //                                 const resPart = await api(`/api/courses/${courseId}/participants`);
// // // // // //                                 const userList = resPart.participants?.map((p: any) => p.user) || [];
// // // // // //                                 setCourseParticipants(userList);
// // // // // //                             } catch (e) { console.error("Gagal load peserta chat", e); }
// // // // // //                         }
// // // // // //                     }
// // // // // //                 } catch (e) { console.error("Enroll check failed", e); }
// // // // // //             }
// // // // // //             if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
// // // // // //           } catch (e) { console.error("Init failed", e); } finally { setLoading(false); }
// // // // // //         };
// // // // // //         if (courseId) initData();
// // // // // //     }, [courseId, user]);
    
// // // // // //     // 2. LOGIKA TIMER
// // // // // //     useEffect(() => {
// // // // // //         setTimerSeconds(null);
// // // // // //         if (activeLesson) {
// // // // // //             if (!activeLesson.quizDuration || activeLesson.quizDuration <= 0 || completedLessonIds.includes(activeLesson._id)) {
// // // // // //                 setIsStarted(true);
// // // // // //                 return;
// // // // // //             }
// // // // // //             const storageKey = `timer_${user?.id}_${activeLesson._id}`;
// // // // // //             const storedEndTime = localStorage.getItem(storageKey);
// // // // // //             if (storedEndTime) {
// // // // // //                 const endTime = parseInt(storedEndTime, 10);
// // // // // //                 if (endTime > Date.now()) {
// // // // // //                     setIsStarted(true); 
// // // // // //                     startTicker(endTime); 
// // // // // //                 } else {
// // // // // //                     localStorage.removeItem(storageKey);
// // // // // //                     setIsStarted(true); 
// // // // // //                     setTimerSeconds(0);
// // // // // //                 }
// // // // // //             } else {
// // // // // //                 setIsStarted(false);
// // // // // //             }
// // // // // //         }
// // // // // //     }, [activeLesson, completedLessonIds, user]);

// // // // // //     const startTicker = (endTime: number) => {
// // // // // //         const update = () => {
// // // // // //             const now = Date.now();
// // // // // //             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
// // // // // //             setTimerSeconds(remaining);
// // // // // //         };
// // // // // //         update(); 
// // // // // //         const interval = setInterval(() => {
// // // // // //             const now = Date.now();
// // // // // //             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
// // // // // //             setTimerSeconds(remaining);
// // // // // //             if (remaining <= 0) clearInterval(interval);
// // // // // //         }, 1000);
// // // // // //         return interval;
// // // // // //     };

// // // // // //     const handleStartLesson = () => {
// // // // // //         setIsStarted(true);
// // // // // //         if (activeLesson.quizDuration > 0) {
// // // // // //             const endTime = Date.now() + activeLesson.quizDuration * 60 * 1000;
// // // // // //             localStorage.setItem(`timer_${user?.id}_${activeLesson._id}`, endTime.toString());
// // // // // //             startTicker(endTime);
// // // // // //         }
// // // // // //     };

// // // // // //     const formatTimer = (seconds: number) => {
// // // // // //         const m = Math.floor(seconds / 60);
// // // // // //         const s = seconds % 60;
// // // // // //         return `${m}:${s < 10 ? '0' : ''}${s}`;
// // // // // //     };

// // // // // //     useEffect(() => {
// // // // // //         if (course && !loading) {
// // // // // //             let total = 0; let completed = 0;
// // // // // //             course.modules?.forEach((m: any) => { 
// // // // // //                 if(m.isActive) {
// // // // // //                     m.lessons?.forEach((l: any) => { 
// // // // // //                         if(l.isActive) { 
// // // // // //                             total++; 
// // // // // //                             if (completedLessonIds.includes(l._id)) completed++; 
// // // // // //                         } 
// // // // // //                     });
// // // // // //                 }
// // // // // //             });
// // // // // //             const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
// // // // // //             setProgressPercent(percent);
// // // // // //         }
// // // // // //     }, [completedLessonIds, course, loading]);
    
// // // // // //     useEffect(() => {
// // // // // //           setUploadedFile(null);
// // // // // //           setPollSelected(null);
// // // // // //           setIsSubmitting(false);
// // // // // //           setIsReuploading(false); 
          
// // // // // //           setCurrentEssayQ(0);
          
// // // // // //           if (activeLesson?.type === 'essay' && activeLesson.questions) {
// // // // // //               setEssayAnswers(new Array(activeLesson.questions.length).fill(''));
// // // // // //           } else {
// // // // // //               setEssayAnswers([]);
// // // // // //           }
// // // // // //     }, [activeLesson]);

// // // // // //     const handleEssayChange = (index: number, value: string) => {
// // // // // //         const newAnswers = [...essayAnswers];
// // // // // //         newAnswers[index] = value;
// // // // // //         setEssayAnswers(newAnswers);
// // // // // //     };

// // // // // //     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //         const file = e.target.files?.[0];
// // // // // //         if (!file) return;
// // // // // //         if (file.size > 10 * 1024 * 1024) {
// // // // // //             alert(`File terlalu besar (${(file.size / 1024 / 1024).toFixed(2)} MB).\nMaksimal upload 10 MB agar tidak ditolak server.`);
// // // // // //             e.target.value = ''; 
// // // // // //             return;
// // // // // //         }
// // // // // //         setUploadedFile(file);
// // // // // //     };

// // // // // //     const markLessonAsComplete = async (lessonId: string, extraData: any = {}) => {
// // // // // //         try { 
// // // // // //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId, ...extraData } }); 
// // // // // //             if (!completedLessonIds.includes(lessonId)) {
// // // // // //                 setCompletedLessonIds(prev => [...prev, lessonId]); 
// // // // // //             }
// // // // // //             if(user) localStorage.removeItem(`timer_${user.id}_${lessonId}`);
// // // // // //         } catch(e) { console.error("Save progress failed", e); throw e; }
// // // // // //     };
    
// // // // // //     const handleNextLesson = () => {
// // // // // //         const allLessons: any[] = [];
// // // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // //         if (currIdx !== -1 && currIdx < allLessons.length - 1) { setActiveLesson(allLessons[currIdx + 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); } 
// // // // // //         else { alert("🎉 Selamat! Anda telah menyelesaikan semua materi."); }
// // // // // //     };
    
// // // // // //     const handlePrevLesson = () => {
// // // // // //         const allLessons: any[] = [];
// // // // // //         course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) allLessons.push(l); }); });
// // // // // //         const currIdx = allLessons.findIndex(l => l._id === activeLesson._id);
// // // // // //         if (currIdx > 0) { setActiveLesson(allLessons[currIdx - 1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }
// // // // // //     };

// // // // // //     const handleManualComplete = async () => { 
// // // // // //         await markLessonAsComplete(activeLesson._id); 
// // // // // //         handleNextLesson(); 
// // // // // //     };
    
// // // // // //     const handleQuizCompleted = async (result: { score: number, attempts: number }) => { 
// // // // // //         try {
// // // // // //             await markLessonAsComplete(activeLesson._id, { 
// // // // // //                 score: result.score, 
// // // // // //                 attempts: result.attempts 
// // // // // //             });
// // // // // //             if (!completedLessonIds.includes(activeLesson._id)) {
// // // // // //                 setCompletedLessonIds(prev => [...prev, activeLesson._id]); 
// // // // // //             }
// // // // // //         } catch (e) { console.error("Gagal simpan skor kuis", e); }
// // // // // //     };
    
// // // // // //     const handleSubmitTask = async () => {
// // // // // //         setIsSubmitting(true);
// // // // // //         try {
// // // // // //             if (activeLesson.type === 'essay') {
// // // // // //                 if (essayAnswers.some(ans => ans.trim() === '')) throw new Error("Mohon jawab semua pertanyaan.");
// // // // // //                 await api(`/api/progress/${courseId}/submit-essay`, { 
// // // // // //                     method: 'POST', 
// // // // // //                     body: { lessonId: activeLesson._id, answers: essayAnswers } 
// // // // // //                 });
// // // // // //             } else if (activeLesson.type === 'upload_doc' || activeLesson.type === 'image') {
// // // // // //                 if (!uploadedFile) throw new Error("Pilih file terlebih dahulu.");
                
// // // // // //                 const fd = new FormData();
// // // // // //                 fd.append('file', uploadedFile);
                
// // // // // //                 const uploadRes: any = await apiUpload('/api/upload', fd); 
// // // // // //                 let fileUrl = "";
// // // // // //                 if (uploadRes.data && uploadRes.data.url) fileUrl = uploadRes.data.url;
// // // // // //                 else if (uploadRes.url) fileUrl = uploadRes.url;
// // // // // //                 else if (uploadRes.file && uploadRes.file.path) fileUrl = uploadRes.file.path;
// // // // // //                 else if (uploadRes.file && uploadRes.file.secure_url) fileUrl = uploadRes.file.secure_url;

// // // // // //                 if (!fileUrl) throw new Error(`Gagal membaca URL. Response server tidak memiliki field url yang dikenali.`);

// // // // // //                 await api(`/api/progress/${courseId}/submit-task`, { 
// // // // // //                     method: 'POST', 
// // // // // //                     body: { lessonId: activeLesson._id, fileUrl: fileUrl, fileName: uploadedFile.name } 
// // // // // //                 });

// // // // // //             } else if (activeLesson.type === 'poll') {
// // // // // //                 if (pollSelected === null) throw new Error("Pilih salah satu opsi.");
// // // // // //                 const answerText = activeLesson.pollOptions[pollSelected];
// // // // // //                 await markLessonAsComplete(activeLesson._id, { pollAnswer: answerText });
// // // // // //             } else {
// // // // // //                 await markLessonAsComplete(activeLesson._id);
// // // // // //             }

// // // // // //             if (!completedLessonIds.includes(activeLesson._id)) {
// // // // // //                 setCompletedLessonIds(prev => [...prev, activeLesson._id]);
// // // // // //             }
// // // // // //             setIsReuploading(false);
// // // // // //             alert("Berhasil dikirim!");
// // // // // //             handleNextLesson();
// // // // // //         } catch (e: any) { 
// // // // // //             console.error("Submit Error:", e);
// // // // // //             alert("Gagal mengirim: " + e.message); 
// // // // // //         } finally { 
// // // // // //             setIsSubmitting(false); 
// // // // // //         }
// // // // // //     };

// // // // // //     const renderContentHeader = (title: string) => (
// // // // // //         <div className="mb-6 border-b border-gray-100 pb-4">
// // // // // //             <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
// // // // // //                 <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 flex items-center gap-1">
// // // // // //                     {activeLesson?.type?.replace(/_/g, ' ') || 'MATERI'}
// // // // // //                 </span>
// // // // // //             </div>
// // // // // //             <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
// // // // // //                 <h1 className="text-gray-900 font-bold text-2xl flex-1 leading-tight">{title}</h1>
// // // // // //                 <div className="flex-shrink-0 flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
// // // // // //                     {activeLesson.quizDuration > 0 && (
// // // // // //                         <div className={`flex items-center gap-1 px-2 py-0.5 rounded border ${timerSeconds !== null && timerSeconds < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
// // // // // //                             <Clock size={14} /> 
// // // // // //                             <span className="font-bold text-sm">
// // // // // //                                 {timerSeconds !== null ? `Sisa: ${formatTimer(timerSeconds)}` : `${activeLesson.quizDuration} Menit`}
// // // // // //                             </span>
// // // // // //                         </div>
// // // // // //                     )}
// // // // // //                     <div className="flex items-center gap-1"><Users size={12} className="text-indigo-500"/> <span>{getFacilitatorName(activeLesson.facilitatorId, courseFacilitators)}</span></div>
// // // // // //                     {activeLesson.jp > 0 && <div className="flex items-center gap-1 border-l pl-3"><Clock size={12} className="text-indigo-500"/> <span>{activeLesson.jp} JP</span></div>}
// // // // // //                     {(activeLesson.scheduleDate) && <div className="flex items-center gap-1 border-l pl-3"><Calendar size={12} className="text-indigo-500"/> <span>{formatDate(activeLesson.scheduleDate)}</span></div>}
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );

// // // // // //     const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
// // // // // //         if (activeLesson.quizDuration > 0 && !isStarted && !completedLessonIds.includes(activeLesson._id)) {
// // // // // //             return (
// // // // // //                 <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-200 text-center min-h-[300px] animate-in fade-in zoom-in duration-300">
// // // // // //                     <div className="bg-indigo-100 p-5 rounded-full mb-6 text-indigo-600 shadow-inner"><Clock size={48} /></div>
// // // // // //                     <h2 className="text-2xl font-bold text-gray-800 mb-3">Materi dengan Batas Waktu</h2>
// // // // // //                     <p className="text-gray-500 mb-8 max-w-md leading-relaxed">Materi <strong>"{activeLesson.title}"</strong> memiliki batas waktu pengerjaan selama <span className="font-bold text-gray-800">{activeLesson.quizDuration} Menit</span>.<br/><span className="text-xs text-red-500 mt-2 block">*Waktu akan berjalan otomatis setelah Anda menekan tombol di bawah.</span></p>
// // // // // //                     <button onClick={handleStartLesson} className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95"><Play size={20} fill="currentColor" /> Mulai Kerjakan Sekarang</button>
// // // // // //                 </div>
// // // // // //             );
// // // // // //         }
// // // // // //         if (timerSeconds !== null && timerSeconds <= 0 && !completedLessonIds.includes(activeLesson._id)) {
// // // // // //              return (
// // // // // //                 <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-xl shadow-sm border border-red-200 text-center min-h-[300px]">
// // // // // //                     <div className="bg-red-100 p-4 rounded-full mb-4 text-red-600"><AlertCircle size={40} /></div>
// // // // // //                     <h2 className="text-xl font-bold text-red-800 mb-2">Waktu Habis!</h2>
// // // // // //                     <p className="text-red-600 mb-6">Waktu pengerjaan untuk materi ini telah berakhir.</p>
// // // // // //                     <button onClick={handleNextLesson} className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">Lanjut Materi Berikutnya</button>
// // // // // //                 </div>
// // // // // //              );
// // // // // //         }
// // // // // //         return <>{children}</>;
// // // // // //     };

// // // // // //     const renderContent = () => {
// // // // // //         if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping.</div>;
        
// // // // // //         const isLessonCompleted = completedLessonIds.includes(activeLesson._id);

// // // // // //         const content = (
// // // // // //             <>
// // // // // //                 {activeLesson.type === 'quiz' && (
// // // // // //                     <QuizPlayer 
// // // // // //                         quizId={activeLesson._id} 
// // // // // //                         courseId={courseId} 
// // // // // //                         lessonData={activeLesson}
// // // // // //                         onComplete={handleQuizCompleted} 
// // // // // //                     />
// // // // // //                 )}
                
// // // // // //                 {activeLesson.type === 'image' && (
// // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // //                         <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
// // // // // //                             <img src={getImageUrl(activeLesson.fileUrl)} alt={activeLesson.title} className="w-full h-auto object-contain" />
// // // // // //                         </div>
// // // // // //                         {activeLesson.content && <div className="prose max-w-none mt-6 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />}
// // // // // //                     </div>
// // // // // //                 )}

// // // // // //                 {(activeLesson.type === 'slide' || activeLesson.type === 'download_doc') && (
// // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // //                         <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center mb-6">
// // // // // //                             <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4"><FileText size={32} /></div>
// // // // // //                             <h3 className="text-lg font-bold text-gray-800 mb-2">{activeLesson.title}</h3>
// // // // // //                             <p className="text-sm text-gray-500 mb-6">Dokumen Materi Pembelajaran.</p>
// // // // // //                             <a href={getImageUrl(activeLesson.fileUrl)} target="_blank" download className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-transform active:scale-95" aria-label="Download File">
// // // // // //                                 <Download size={18} /> Download Materi
// // // // // //                             </a>
// // // // // //                         </div>
// // // // // //                         {activeLesson.fileUrl && activeLesson.fileUrl.endsWith('.pdf') && (
// // // // // //                             <div className="mt-8 border rounded-xl overflow-hidden h-[800px] shadow-sm">
// // // // // //                                 <iframe src={getImageUrl(activeLesson.fileUrl)} className="w-full h-full" title="Preview"></iframe>
// // // // // //                             </div>
// // // // // //                         )}
// // // // // //                     </div>
// // // // // //                 )}

// // // // // //                 {activeLesson.type === 'video_url' && (
// // // // // //                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
// // // // // //                         <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
// // // // // //                             <iframe src={getEmbedUrl(activeLesson.videoUrl)} className="w-full h-full" allowFullScreen title={`Video ${activeLesson.title}`} />
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 )}

// // // // // //                 {activeLesson.type === 'virtual_class' && (
// // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // //                         <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
// // // // // //                             <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"><Video size={40}/></div>
// // // // // //                             <h3 className="text-xl font-bold text-gray-900 mb-2">Kelas Virtual (Zoom/Meet)</h3>
// // // // // //                             <p className="text-gray-600 mb-6">Silakan bergabung ke pertemuan virtual melalui tombol di bawah ini.</p>
                            
// // // // // //                             {(activeLesson.meetingLink || activeLesson.content) ? (
// // // // // //                                 <div className="space-y-3">
// // // // // //                                     <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg"><Video size={20}/> Gabung Meeting</a>
// // // // // //                                     <div className="text-xs text-gray-500">Link: <a href={activeLesson.meetingLink || activeLesson.content} target="_blank" className="text-purple-600 underline">{activeLesson.meetingLink || activeLesson.content}</a></div>
// // // // // //                                 </div>
// // // // // //                             ) : (
// // // // // //                                 <button disabled className="inline-flex items-center gap-2 bg-gray-400 text-white px-8 py-3 rounded-full font-bold cursor-not-allowed"><Video size={20}/> Link Belum Tersedia</button>
// // // // // //                             )}
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 )}
                
// // // // // //                 {activeLesson.type === 'google_classroom' && (
// // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
// // // // // //                         <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
// // // // // //                             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border"><School size={40} className="text-green-600"/></div>
// // // // // //                             <h3 className="text-xl font-bold text-gray-900 mb-2">Google Classroom</h3>
// // // // // //                             <p className="text-gray-600 mb-2">Materi ini terhubung dengan Google Classroom.</p>
// // // // // //                             {activeLesson.classroomData ? (
// // // // // //                                 <div className="mt-4">
// // // // // //                                     <p className="font-bold text-lg">{activeLesson.classroomData.name}</p>
// // // // // //                                     <p className="text-sm text-gray-500 mb-6">Kode Kelas: <span className="font-mono bg-white px-2 py-1 border rounded">{activeLesson.classroomData.enrollmentCode || '-'}</span></p>
// // // // // //                                     <a href={activeLesson.classroomData.alternateLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 shadow-lg">Buka Google Classroom ↗</a>
// // // // // //                                 </div>
// // // // // //                             ) : <p className="text-red-500 italic">Data kelas tidak ditemukan.</p>}
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 )}

// // // // // //                 {['essay', 'upload_doc', 'image', 'poll', 'lesson'].includes(activeLesson.type) && (
// // // // // //                     <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6">
// // // // // //                         {activeLesson.content && activeLesson.type !== 'image' && (
// // // // // //                             <div className="prose max-w-none mb-8 text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
// // // // // //                         )}
                        
// // // // // //                         {/* [UPDATE] ESSAY - TAMPILAN LEBIH LUAS */}
// // // // // //                         {activeLesson.type === 'essay' && (
// // // // // //                             <div className="space-y-6">
// // // // // //                                 {/* Navigasi Soal */}
// // // // // //                                 <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200 mb-6">
// // // // // //                                     <button 
// // // // // //                                         onClick={() => setCurrentEssayQ(Math.max(0, currentEssayQ - 1))} 
// // // // // //                                         disabled={currentEssayQ === 0}
// // // // // //                                         className="px-4 py-2 text-xs font-bold bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
// // // // // //                                     >
// // // // // //                                         &larr; Soal Sebelumnya
// // // // // //                                     </button>
                                    
// // // // // //                                     <span className="text-sm font-bold text-gray-700">
// // // // // //                                         Soal {currentEssayQ + 1} dari {activeLesson.questions.length}
// // // // // //                                     </span>
                                    
// // // // // //                                     <button 
// // // // // //                                         onClick={() => setCurrentEssayQ(Math.min(activeLesson.questions.length - 1, currentEssayQ + 1))} 
// // // // // //                                         disabled={currentEssayQ === activeLesson.questions.length - 1}
// // // // // //                                         className="px-4 py-2 text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
// // // // // //                                     >
// // // // // //                                         Soal Selanjutnya &rarr;
// // // // // //                                     </button>
// // // // // //                                 </div>

// // // // // //                                 <div className="border p-6 rounded-xl bg-gray-50/50">
// // // // // //                                     <div className="font-bold mb-4 text-sm text-gray-800 flex flex-col gap-2">
// // // // // //                                         <span className="text-xs text-gray-500 uppercase tracking-wide">Pertanyaan:</span>
// // // // // //                                         <div dangerouslySetInnerHTML={{ __html: activeLesson.questions[currentEssayQ].question }} className="text-base" />
// // // // // //                                     </div>
                                    
// // // // // //                                     {/* EDITOR DIPERBESAR */}
// // // // // //                                     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// // // // // //                                         <ReactQuill 
// // // // // //                                             key={`essay-q-${currentEssayQ}`} 
// // // // // //                                             theme="snow" 
// // // // // //                                             value={essayAnswers[currentEssayQ] || ''} 
// // // // // //                                             onChange={(v) => handleEssayChange(currentEssayQ, v)} 
// // // // // //                                             placeholder="Tulis jawaban Anda di sini..."
// // // // // //                                             className="h-96 mb-12 bg-white" // TINGGI EDITOR 96 (sekitar 384px)
// // // // // //                                             modules={QUILL_MODULES} // Pakai static modules
// // // // // //                                         />
// // // // // //                                     </div>
// // // // // //                                 </div>

// // // // // //                                 {/* [FIX 2] TOMBOL KIRIM KECIL DI KANAN */}
// // // // // //                                 <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
// // // // // //                                     <button 
// // // // // //                                         onClick={handleSubmitTask} 
// // // // // //                                         disabled={isSubmitting} 
// // // // // //                                         className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg active:scale-95 text-sm w-fit" 
// // // // // //                                         title="Kirim Semua Jawaban" 
// // // // // //                                         aria-label="Kirim Semua Jawaban"
// // // // // //                                     >
// // // // // //                                         {isSubmitting ? 'Mengirim...' : 'Kirim Semua Jawaban'}
// // // // // //                                     </button>
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         )}
                        
// // // // // //                         {(activeLesson.type === 'upload_doc' || activeLesson.type === 'image') && (
// // // // // //                             <div className="border-2 border-dashed p-8 text-center rounded-xl bg-gray-50 border-indigo-200">
// // // // // //                                 {isLessonCompleted && !uploadedFile && !isReuploading ? (
// // // // // //                                     <div className="animate-in fade-in zoom-in duration-300">
// // // // // //                                         <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"><CheckCircle size={32} /></div>
// // // // // //                                         <h3 className="text-xl font-bold text-gray-800 mb-2">Tugas Sudah Dikirim!</h3>
// // // // // //                                         <p className="text-gray-500 mb-6 text-sm">Anda telah menyelesaikan tugas ini.</p>
// // // // // //                                         <button onClick={() => setIsReuploading(true)} className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-50 shadow-sm transition-colors text-sm">Kirim Ulang / Ganti File</button>
// // // // // //                                     </div>
// // // // // //                                 ) : (
// // // // // //                                     <>
// // // // // //                                         {uploadedFile ? (
// // // // // //                                             <div className="text-center w-full animate-in fade-in zoom-in duration-300">
// // // // // //                                                  <div className="text-green-600 font-bold text-lg mb-2 flex items-center justify-center gap-2"><FileCheck className="w-8 h-8" /> File Siap Upload!</div>
// // // // // //                                                  <p className="text-gray-700 font-medium break-all mb-4 px-4 bg-white py-2 rounded border inline-block shadow-sm">{uploadedFile.name}<span className="block text-[10px] text-gray-400 font-normal">({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)</span></p>
// // // // // //                                                  <div className="flex justify-center gap-3"><button onClick={() => setUploadedFile(null)} className="text-red-500 hover:text-red-700 text-sm font-bold underline">Ganti File</button></div>
// // // // // //                                             </div>
// // // // // //                                         ) : (
// // // // // //                                             <>
// // // // // //                                                 <UploadCloud className="mx-auto text-indigo-400 mb-2" size={32}/>
// // // // // //                                                 <p className="text-sm text-gray-500 mb-4">Upload tugas Anda di sini (PDF/DOCX/JPG)</p>
// // // // // //                                                 <label className="cursor-pointer bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 inline-flex items-center gap-2 transition-transform active:scale-95 shadow-md">
// // // // // //                                                     <UploadCloud size={18}/> Pilih File
// // // // // //                                                     <input type="file" className="hidden" onChange={handleFileChange} accept={activeLesson.type === 'image' ? "image/*" : ".pdf,.doc,.docx,.jpg,.jpeg,.png"}/>
// // // // // //                                                 </label>
// // // // // //                                                 <p className="text-[10px] text-gray-400 mt-3">Maksimal Ukuran File: 10 MB</p>
// // // // // //                                             </>
// // // // // //                                         )}
// // // // // //                                         <button onClick={handleSubmitTask} disabled={!uploadedFile || isSubmitting} className={`mt-6 px-10 py-3 mx-auto block rounded-xl font-bold text-white shadow-lg transition-all ${!uploadedFile ? 'bg-gray-300 cursor-not-allowed hidden' : 'bg-green-600 hover:bg-green-700 hover:scale-[1.02]'}`} title="Upload Tugas" aria-label="Upload Tugas">{isSubmitting ? 'Sedang Mengirim...' : 'Kirim Tugas Sekarang'}</button>
// // // // // //                                         {isReuploading && !uploadedFile && (<button onClick={() => setIsReuploading(false)} className="mt-4 text-xs text-gray-500 hover:text-gray-700 underline">Batal, kembali ke status selesai</button>)}
// // // // // //                                     </>
// // // // // //                                 )}
// // // // // //                             </div>
// // // // // //                         )}
                        
// // // // // //                         {activeLesson.type === 'poll' && (
// // // // // //                             <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
// // // // // //                                 <h3 className="font-bold text-lg mb-4">{activeLesson.pollQuestion || "Polling"}</h3>
// // // // // //                                 <div className="space-y-3 max-w-sm mx-auto">
// // // // // //                                     {activeLesson.pollOptions?.map((opt:string, idx:number) => (
// // // // // //                                         <button key={idx} onClick={()=>setPollSelected(idx)} className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${pollSelected===idx ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-100 border-gray-300'}`} title={`Pilih ${opt}`} aria-label={`Pilih opsi ${opt}`}>{opt}</button>
// // // // // //                                     ))}
// // // // // //                                 </div>
// // // // // //                                 <button onClick={handleSubmitTask} disabled={pollSelected===null||isSubmitting} className="mt-6 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition-colors" title="Kirim Polling" aria-label="Kirim Polling">Kirim Polling</button>
// // // // // //                             </div>
// // // // // //                         )}
// // // // // //                     </div>
// // // // // //                 )}
// // // // // //             </>
// // // // // //         );

// // // // // //         return (
// // // // // //             <div>
// // // // // //                 {renderContentHeader(activeLesson.title)}
// // // // // //                 <ContentWrapper>
// // // // // //                     {content}
// // // // // //                 </ContentWrapper>
// // // // // //             </div>
// // // // // //         );
// // // // // //     };
  
// // // // // //     if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // // // //     if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;
  
// // // // // //     if (!isEnrolled || enrollmentStatus === 'pending') {
// // // // // //         return (
// // // // // //           <div className="min-h-screen bg-gray-50 pb-20">
// // // // // //               {showRegisterModal && (
// // // // // //                   <CourseRegistrationModal 
// // // // // //                     courseId={courseId} 
// // // // // //                     courseTitle={course.title} 
// // // // // //                     programType={course.programType} 
// // // // // //                     user={user} 
// // // // // //                     onClose={() => setShowRegisterModal(false)} 
// // // // // //                     onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil! Menunggu Verifikasi."); window.location.reload(); }} 
// // // // // //                   />
// // // // // //               )}
              
// // // // // //               <div className="relative bg-gray-900 text-white">
// // // // // //                   <div className="absolute inset-0 bg-black/60 z-0"></div>
// // // // // //                   {course.thumbnailUrl && <img src={getImageUrl(course.thumbnailUrl)} className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" alt="" />}
                  
// // // // // //                   <div className="max-w-6xl mx-auto px-6 py-24 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
// // // // // //                       <div className="lg:col-span-2 space-y-6">
// // // // // //                           <div className="flex items-center gap-3">
// // // // // //                               <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${course.programType === 'training' ? 'bg-orange-500' : 'bg-blue-500'}`}>
// // // // // //                                   {course.programType === 'training' ? 'Diklat / Pelatihan' : 'Kursus Mandiri'}
// // // // // //                               </span>
// // // // // //                               {course.category && <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">{course.category}</span>}
// // // // // //                           </div>
// // // // // //                           <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{course.title}</h1>
// // // // // //                           <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300 pt-2">
// // // // // //                               <div className="flex items-center gap-2"><Users size={18}/> {courseFacilitators.length} Fasilitator</div>
// // // // // //                               <div className="flex items-center gap-2"><BookOpen size={18}/> {course.modules?.length || 0} Modul</div>
// // // // // //                               <div className="flex items-center gap-2"><Clock size={18}/> {course.programType === 'training' ? 'Terjadwal' : 'Fleksibel'}</div>
// // // // // //                               {course.certificateConfig && <div className="flex items-center gap-2 text-yellow-400"><Award size={18}/> Sertifikat Tersedia</div>}
// // // // // //                           </div>
// // // // // //                       </div>

// // // // // //                       <div className="lg:col-span-1">
// // // // // //                           <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-100 sticky top-24">
// // // // // //                               <div className="text-center mb-8">
// // // // // //                                   <p className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Biaya Investasi</p>
// // // // // //                                   <p className="text-4xl font-black text-green-600">{course.price > 0 ? `Rp ${course.price.toLocaleString()}` : 'GRATIS'}</p>
// // // // // //                               </div>

// // // // // //                               {enrollmentStatus === 'pending' ? (
// // // // // //                                   <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-center border border-yellow-200">
// // // // // //                                       <h3 className="font-bold mb-1">Menunggu Verifikasi</h3>
// // // // // //                                       <p className="text-xs">Pendaftaran Anda sedang diproses admin.</p>
// // // // // //                                   </div>
// // // // // //                               ) : (
// // // // // //                                   <button onClick={() => setShowRegisterModal(true)} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-lg" title="Daftar Sekarang" aria-label="Daftar Sekarang">📝 Daftar Sekarang</button>
// // // // // //                               )}
// // // // // //                               <p className="text-xs text-center text-gray-400 mt-4">*Akses selamanya setelah terdaftar</p>
// // // // // //                           </div>
// // // // // //                       </div>
// // // // // //                   </div>
// // // // // //               </div>

// // // // // //               <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
// // // // // //                   <div className="lg:col-span-2 space-y-12">
// // // // // //                       <section>
// // // // // //                           <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="text-red-600"/> Tentang Program Ini</h3>
// // // // // //                           <div className="prose max-w-none text-gray-600 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm" dangerouslySetInnerHTML={{ __html: course.description || "<p>Belum ada deskripsi.</p>" }} />
// // // // // //                       </section>

// // // // // //                       <section>
// // // // // //                           <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="text-red-600"/> Kurikulum & Materi</h3>
// // // // // //                           <div className="space-y-4">
// // // // // //                               {course.modules?.map((mod: any, idx: number) => (
// // // // // //                                   <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
// // // // // //                                       <div className="bg-gray-50 px-6 py-4 border-b font-bold text-gray-800 flex justify-between">
// // // // // //                                           <span>Modul {idx + 1}: {mod.title}</span>
// // // // // //                                           <span className="text-xs font-normal text-gray-500 bg-white px-2 py-1 rounded border">{mod.lessons?.length || 0} Materi</span>
// // // // // //                                       </div>
// // // // // //                                       <div className="divide-y">
// // // // // //                                           {mod.lessons?.map((les: any, lIdx: number) => (
// // // // // //                                               <div key={lIdx} className="px-6 py-3 flex items-center gap-3 text-sm text-gray-600">
// // // // // //                                                   {les.type === 'video_url' ? <PlayCircle size={16} className="text-blue-500"/> : <FileText size={16} className="text-gray-400"/>}
// // // // // //                                                   {les.title}
// // // // // //                                                   {les.jp > 0 && <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{les.jp} JP</span>}
// // // // // //                                               </div>
// // // // // //                                           ))}
// // // // // //                                       </div>
// // // // // //                                   </div>
// // // // // //                               ))}
// // // // // //                           </div>
// // // // // //                       </section>
// // // // // //                   </div>

// // // // // //                   <div className="space-y-8">
// // // // // //                       <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
// // // // // //                           <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Users className="text-red-600"/> Tim Fasilitator</h4>
// // // // // //                           <div className="space-y-4">
// // // // // //                               {courseFacilitators.map((fac: any) => (
// // // // // //                                   <div key={fac._id} className="flex items-center gap-3">
// // // // // //                                       {fac.avatarUrl ? (<img src={getImageUrl(fac.avatarUrl)} className="w-10 h-10 rounded-full object-cover border" alt={fac.name}/>) : (<div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">{fac.name.charAt(0)}</div>)}
// // // // // //                                       <div><p className="font-bold text-sm text-gray-800">{fac.name}</p><p className="text-xs text-gray-500">Fasilitator</p></div>
// // // // // //                                   </div>
// // // // // //                               ))}
// // // // // //                               {courseFacilitators.length === 0 && <p className="text-sm text-gray-500 italic">Belum ditentukan.</p>}
// // // // // //                           </div>
// // // // // //                       </section>

// // // // // //                       <section className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
// // // // // //                           <h4 className="font-bold text-indigo-900 mb-4">Fasilitas Program</h4>
// // // // // //                           <ul className="space-y-3 text-sm text-indigo-800">
// // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Akses Materi Seumur Hidup</li>
// // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Grup Diskusi Eksklusif</li>
// // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Sertifikat Kelulusan</li>
// // // // // //                               <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/> Konsultasi Fasilitator</li>
// // // // // //                           </ul>
// // // // // //                       </section>
// // // // // //                   </div>
// // // // // //               </div>
// // // // // //           </div>
// // // // // //         );
// // // // // //     }
  
// // // // // //     // TAMPILAN DASHBOARD BELAJAR
// // // // // //     const safePercent = Number.isFinite(progressPercent) ? Math.round(progressPercent) : 0;
  
// // // // // //     return (
// // // // // //       <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // // // // //         <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
// // // // // //           <div className="p-5 border-b bg-white">
// // // // // //               <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" title="Kembali ke Katalog" aria-label="Kembali"><span>←</span> KEMBALI KE KATALOG</Link>
// // // // // //               <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
// // // // // //               <div className="space-y-2">
// // // // // //                   <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{safePercent}%</span></div>
// // // // // //                   <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: `${safePercent}%`}}></div></div>
// // // // // //               </div>
              
// // // // // //               {/* TOMBOL HUBUNGI PENGAJAR + BADGE */}
// // // // // //               <button onClick={() => setShowPersonalChat(true)} className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50 relative" title="Hubungi Pengajar" aria-label="Hubungi Pengajar">
// // // // // //                   <MessageCircle size={16}/> Hubungi Pengajar
// // // // // //                   {/* [FIX 3] INTEGRASI BADGE */}
// // // // // //                   <div className="absolute -top-2 -right-1">
// // // // // //                       <ChatNotificationBadge courseId={courseId} />
// // // // // //                   </div>
// // // // // //               </button>
// // // // // //           </div>
// // // // // //           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
// // // // // //               {course.modules?.map((mod:any, i:number) => {
// // // // // //                   if (!mod.isActive) return null;
// // // // // //                   const activeLessons = mod.lessons?.filter((l: any) => l.isActive) || [];
// // // // // //                   return (
// // // // // //                       <div key={mod._id}>
// // // // // //                           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
// // // // // //                           <div className="space-y-1">
// // // // // //                               {activeLessons.map((les:any) => (
// // // // // //                                   <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`} title={`Buka Materi ${les.title}`} aria-label={`Buka Materi ${les.title}`}>
// // // // // //                                       {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
// // // // // //                                       {les.title}
// // // // // //                                   </button>
// // // // // //                               ))}
// // // // // //                           </div>
// // // // // //                       </div>
// // // // // //                   );
// // // // // //               })}
// // // // // //           </div>
// // // // // //         </aside>
  
// // // // // //         <main className="flex-1 flex flex-col relative h-full overflow-hidden bg-gray-50">
// // // // // //           <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
// // // // // //               <button type="button" onClick={()=>setIsSidebarOpen(!isSidebarOpen)} aria-label="Menu" title="Menu"><Menu/></button>
// // // // // //           </div>
// // // // // //           <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
// // // // // //               {renderContent()}
// // // // // //           </div>
// // // // // //           <div className="fixed bottom-8 right-8 flex gap-3 z-30">
// // // // // //               <button type="button" onClick={handlePrevLesson} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105" title="Materi Sebelumnya" aria-label="Materi Sebelumnya"><ChevronLeft/></button>
// // // // // //               <button type="button" onClick={handleManualComplete} className="h-12 px-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 font-bold hover:scale-105" title="Lanjut Materi" aria-label="Lanjut Materi"><span>Lanjut</span><ChevronRight/></button>
// // // // // //           </div>
// // // // // //         </main>
        
// // // // // //         {showPersonalChat && <ChatWithFacilitatorModal facilitators={courseFacilitators} onClose={() => setShowPersonalChat(false)} />}
  
// // // // // //         {user && (
// // // // // //           <CourseGroupChat 
// // // // // //               courseId={courseId} 
// // // // // //               currentUser={user} 
// // // // // //               participants={courseParticipants} 
// // // // // //               facilitators={courseFacilitators} 
// // // // // //               isFloating={true} 
// // // // // //           />
// // // // // //         )}
// // // // // //       </div>
// // // // // //     );
// // // // // // }




// // // // // 'use client';

// // // // // import { useState, useEffect, useRef } from 'react';
// // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // import Link from 'next/link';
// // // // // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // // import CourseGroupChat from '@/components/CourseGroupChat'; 
// // // // // import ChatNotificationBadge from '@/components/ChatNotificationBadge'; 
// // // // // import { 
// // // // //     Users, Clock, MessageCircle, ChevronLeft, ChevronRight, Menu, 
// // // // //     FileText, PlayCircle, CheckCircle, UploadCloud, Calendar, Download, 
// // // // //     Video, School, Play, AlertCircle, Award, FileCheck,
// // // // //     X, Send, MessageSquare 
// // // // // } from 'lucide-react';
// // // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';
// // // // // import dynamic from 'next/dynamic';
// // // // // import 'react-quill/dist/quill.snow.css';

// // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // //     ssr: false, 
// // // // //     loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg border border-gray-200">Loading Editor...</div> 
// // // // // });

// // // // // // STATIC MODULES (Di luar komponen)
// // // // // const QUILL_MODULES = {
// // // // //     toolbar: [
// // // // //         [{ 'header': [1, 2, 3, false] }],
// // // // //         ['bold', 'italic', 'underline', 'strike'],
// // // // //         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
// // // // //         ['clean']
// // // // //     ]
// // // // // };

// // // // // const getFacilitatorName = (activeFacilitatorId: any, facilitatorsList: any[]) => {
// // // // //     if (!activeFacilitatorId) return '-';
// // // // //     if (typeof activeFacilitatorId === 'object' && activeFacilitatorId.name) return activeFacilitatorId.name;
// // // // //     const found = facilitatorsList.find(f => (f._id === activeFacilitatorId) || (f.id === activeFacilitatorId));
// // // // //     return found ? found.name : 'Fasilitator';
// // // // // };

// // // // // const formatDate = (dateString: string) => {
// // // // //     if (!dateString) return '-';
// // // // //     return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // // // };

// // // // // const getEmbedUrl = (url: string) => {
// // // // //     if (!url) return '';
// // // // //     if (url.includes('youtube.com/embed/')) return url;
// // // // //     try {
// // // // //         let videoId = '';
// // // // //         if (url.includes('youtu.be/')) {
// // // // //             videoId = url.split('youtu.be/')[1]?.split('?')[0];
// // // // //         } else if (url.includes('youtube.com/watch')) {
// // // // //             const urlParams = new URL(url).searchParams;
// // // // //             videoId = urlParams.get('v') || '';
// // // // //         }
// // // // //         if (videoId) return `https://www.youtube.com/embed/${videoId}`;
// // // // //     } catch (e) { console.error("Error parsing YouTube URL:", e); }
// // // // //     return url;
// // // // // };

// // // // // // --- CHAT MODAL (Personal) ---
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
// // // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center !z-[99999] p-4 backdrop-blur-sm">
// // // // //             <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px] animate-in zoom-in-95">
// // // // //                 <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10 shrink-0">
// // // // //                     <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18} /> Hubungi Pengajar</h3>
// // // // //                     {/* [FIXED] Added title and aria-label to Close Button */}
// // // // //                     <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20} /></button>
// // // // //                 </div>
// // // // //                 <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// // // // //                     {messages.map((msg: any, idx: number) => {
// // // // //                         const isMe = msg.sender === 'me' || msg.sender?._id === user?.id;
// // // // //                         return (
// // // // //                             <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
// // // // //                                 <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
// // // // //                                     <p>{msg.message}</p>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         );
// // // // //                     })}
// // // // //                     <div ref={messagesEndRef} />
// // // // //                 </div>
// // // // //                 <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2 shrink-0">
// // // // //                     <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50 outline-none focus:border-indigo-500" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} />
// // // // //                     {/* [FIXED] Added title and aria-label to Send Button */}
// // // // //                     <button type="submit" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button>
// // // // //                 </form>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // }

// // // // // // --- MAIN COMPONENT ---
// // // // // export default function StudentCoursePlayPage() {
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
// // // // //     const [showGroupChat, setShowGroupChat] = useState(false);
  
// // // // //     const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// // // // //     const [currentEssayQ, setCurrentEssayQ] = useState(0); 

// // // // //     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// // // // //     const [pollSelected, setPollSelected] = useState<number | null>(null);
// // // // //     const [isSubmitting, setIsSubmitting] = useState(false);
// // // // //     const [isReuploading, setIsReuploading] = useState(false);

// // // // //     const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
// // // // //     const [isStarted, setIsStarted] = useState(false); 
  
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
// // // // //                                 const userList = resPart.participants?.map((p: any) => p.user) || [];
// // // // //                                 setCourseParticipants(userList);
// // // // //                             } catch (e) { }
// // // // //                         }
// // // // //                     }
// // // // //                 } catch (e) { }
// // // // //             }
// // // // //             if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
// // // // //           } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // //         };
// // // // //         if (courseId) initData();
// // // // //     }, [courseId, user]);
    
// // // // //     // Timer Logic
// // // // //     useEffect(() => {
// // // // //         setTimerSeconds(null);
// // // // //         if (activeLesson) {
// // // // //             if (!activeLesson.quizDuration || activeLesson.quizDuration <= 0 || completedLessonIds.includes(activeLesson._id)) {
// // // // //                 setIsStarted(true);
// // // // //                 return;
// // // // //             }
// // // // //             const storageKey = `timer_${user?.id}_${activeLesson._id}`;
// // // // //             const storedEndTime = localStorage.getItem(storageKey);
// // // // //             if (storedEndTime) {
// // // // //                 const endTime = parseInt(storedEndTime, 10);
// // // // //                 if (endTime > Date.now()) {
// // // // //                     setIsStarted(true); 
// // // // //                     startTicker(endTime); 
// // // // //                 } else {
// // // // //                     localStorage.removeItem(storageKey);
// // // // //                     setIsStarted(true); 
// // // // //                     setTimerSeconds(0);
// // // // //                 }
// // // // //             } else {
// // // // //                 setIsStarted(false);
// // // // //             }
// // // // //         }
// // // // //     }, [activeLesson, completedLessonIds, user]);

// // // // //     const startTicker = (endTime: number) => {
// // // // //         const update = () => {
// // // // //             const now = Date.now();
// // // // //             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
// // // // //             setTimerSeconds(remaining);
// // // // //         };
// // // // //         update(); 
// // // // //         const interval = setInterval(() => {
// // // // //             const now = Date.now();
// // // // //             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
// // // // //             setTimerSeconds(remaining);
// // // // //             if (remaining <= 0) clearInterval(interval);
// // // // //         }, 1000);
// // // // //         return interval;
// // // // //     };

// // // // //     const handleStartLesson = () => {
// // // // //         if (activeLesson.quizDuration > 0) {
// // // // //             const endTime = Date.now() + activeLesson.quizDuration * 60 * 1000;
// // // // //             const storageKey = `timer_${user?.id}_${activeLesson._id}`;
// // // // //             localStorage.setItem(storageKey, endTime.toString());
// // // // //             setIsStarted(true);
// // // // //             startTicker(endTime);
// // // // //         } else {
// // // // //             setIsStarted(true);
// // // // //         }
// // // // //     };

// // // // //     const formatTimer = (seconds: number) => {
// // // // //         const m = Math.floor(seconds / 60);
// // // // //         const s = seconds % 60;
// // // // //         return `${m}:${s < 10 ? '0' : ''}${s}`;
// // // // //     };

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
// // // // //           setIsReuploading(false); 
// // // // //           setCurrentEssayQ(0);
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

// // // // //     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //         const file = e.target.files?.[0];
// // // // //         if (!file) return;
// // // // //         if (file.size > 10 * 1024 * 1024) {
// // // // //             alert("File terlalu besar (Maks 10MB)");
// // // // //             e.target.value = ''; 
// // // // //             return;
// // // // //         }
// // // // //         setUploadedFile(file);
// // // // //     };

// // // // //     const markLessonAsComplete = async (lessonId: string, extraData: any = {}) => {
// // // // //         try { 
// // // // //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId, ...extraData } }); 
// // // // //             if (!completedLessonIds.includes(lessonId)) setCompletedLessonIds(prev => [...prev, lessonId]); 
// // // // //             if(user) localStorage.removeItem(`timer_${user.id}_${lessonId}`);
// // // // //         } catch(e) { console.error("Save progress failed", e); }
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
// // // // //     const handleQuizCompleted = async (result: { score: number, attempts: number }) => { try { await markLessonAsComplete(activeLesson._id, { score: result.score, attempts: result.attempts }); if (!completedLessonIds.includes(activeLesson._id)) setCompletedLessonIds(prev => [...prev, activeLesson._id]); } catch (e) { console.error("Gagal simpan skor kuis", e); } };
// // // // //     const handleSubmitTask = async () => { setIsSubmitting(true); try { if (activeLesson.type === 'essay') { if (essayAnswers.some(ans => ans.trim() === '')) throw new Error("Mohon jawab semua pertanyaan."); await api(`/api/progress/${courseId}/submit-essay`, { method: 'POST', body: { lessonId: activeLesson._id, answers: essayAnswers } }); } else if (activeLesson.type === 'upload_doc' || activeLesson.type === 'image') { if (!uploadedFile) throw new Error("Pilih file terlebih dahulu."); const fd = new FormData(); fd.append('file', uploadedFile); const uploadRes: any = await apiUpload('/api/upload', fd); let fileUrl = uploadRes.url || uploadRes.data?.url || uploadRes.file?.path || uploadRes.file?.secure_url; if (!fileUrl) throw new Error("Gagal membaca URL file."); await api(`/api/progress/${courseId}/submit-task`, { method: 'POST', body: { lessonId: activeLesson._id, fileUrl: fileUrl, fileName: uploadedFile.name } }); } else if (activeLesson.type === 'poll') { if (pollSelected === null) throw new Error("Pilih salah satu opsi."); const answerText = activeLesson.pollOptions[pollSelected]; await markLessonAsComplete(activeLesson._id, { pollAnswer: answerText }); } else { await markLessonAsComplete(activeLesson._id); } if (!completedLessonIds.includes(activeLesson._id)) setCompletedLessonIds(prev => [...prev, activeLesson._id]); setIsReuploading(false); alert("Berhasil dikirim!"); handleNextLesson(); } catch (e: any) { alert("Gagal mengirim: " + e.message); } finally { setIsSubmitting(false); } };

// // // // //     // --- RENDER CONTENT ---
// // // // //     const renderContent = () => {
// // // // //         if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping.</div>;
// // // // //         const isLessonCompleted = completedLessonIds.includes(activeLesson._id);

// // // // //         return (
// // // // //             <div>
// // // // //                 <div className="mb-6 border-b border-gray-100 pb-4">
// // // // //                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
// // // // //                         <div>
// // // // //                             <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600">{activeLesson?.type?.replace(/_/g, ' ') || 'MATERI'}</span>
// // // // //                             <h1 className="text-gray-900 font-bold text-2xl mt-2 leading-tight">{activeLesson.title}</h1>
// // // // //                         </div>
// // // // //                         <div className="flex-shrink-0 flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
// // // // //                             {activeLesson.quizDuration > 0 && (
// // // // //                                 <div className={`flex items-center gap-1 px-2 py-0.5 rounded border ${timerSeconds !== null && timerSeconds < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
// // // // //                                     <Clock size={14} /> <span className="font-bold text-sm">{timerSeconds !== null ? `Sisa: ${formatTimer(timerSeconds)}` : `${activeLesson.quizDuration} Menit`}</span>
// // // // //                                 </div>
// // // // //                             )}
// // // // //                             <div className="flex items-center gap-1"><Users size={12}/> <span>{getFacilitatorName(activeLesson.facilitatorId, courseFacilitators)}</span></div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>

// // // // //                 {/* TIMER BESAR DI TENGAH ATAS KONTEN */}
// // // // //                 {activeLesson.quizDuration > 0 && timerSeconds !== null && (
// // // // //                     <div className="mb-6 flex justify-center sticky top-0 z-20">
// // // // //                          <div className={`px-6 py-3 rounded-full shadow-lg border-2 flex items-center gap-3 transition-all transform ${timerSeconds < 60 ? 'bg-red-50 border-red-500 text-red-600 animate-pulse scale-105' : 'bg-indigo-600 border-indigo-700 text-white'}`}>
// // // // //                             <Clock size={28} className={timerSeconds < 60 ? "animate-bounce" : ""} />
// // // // //                             <div className="flex flex-col items-center leading-none">
// // // // //                                 <span className="text-2xl font-black font-mono tracking-widest">{formatTimer(timerSeconds)}</span>
// // // // //                                 <span className="text-[10px] font-bold uppercase opacity-80">Sisa Waktu</span>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 )}

// // // // //                 <div className="content-body">
// // // // //                     {/* Blocked by Timer? */}
// // // // //                     {activeLesson.quizDuration > 0 && !isStarted && !completedLessonIds.includes(activeLesson._id) ? (
// // // // //                         <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-200 text-center min-h-[300px]">
// // // // //                             <div className="bg-indigo-100 p-5 rounded-full mb-6 text-indigo-600"><Clock size={48} /></div>
// // // // //                             <h2 className="text-2xl font-bold text-gray-800 mb-3">Materi dengan Batas Waktu</h2>
// // // // //                             <p className="text-gray-500 mb-8">Waktu: <span className="font-bold">{activeLesson.quizDuration} Menit</span></p>
// // // // //                             <button onClick={handleStartLesson} className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-indigo-700 shadow-lg"><Play size={20}/> Mulai Kerjakan</button>
// // // // //                         </div>
// // // // //                     ) : timerSeconds !== null && timerSeconds <= 0 && !completedLessonIds.includes(activeLesson._id) ? (
// // // // //                         <div className="flex flex-col items-center justify-center p-12 bg-red-50 text-center"><AlertCircle size={40} className="text-red-600 mb-4"/><h2 className="text-xl font-bold text-red-800">Waktu Habis!</h2><button onClick={handleNextLesson} className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg">Lanjut</button></div>
// // // // //                     ) : (
// // // // //                         <>
// // // // //                             {/* Render Logic per Type */}
// // // // //                             {activeLesson.type === 'quiz' && <QuizPlayer quizId={activeLesson._id} courseId={courseId} lessonData={activeLesson} onComplete={handleQuizCompleted} />}
                            
// // // // //                             {(activeLesson.type === 'image' || activeLesson.type === 'slide' || activeLesson.type === 'download_doc' || activeLesson.type === 'video_url' || activeLesson.type === 'virtual_class' || activeLesson.type === 'google_classroom' || activeLesson.type === 'lesson') && (
// // // // //                                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
// // // // //                                     {activeLesson.type === 'image' && <img src={getImageUrl(activeLesson.fileUrl)} className="w-full h-auto rounded-lg shadow" alt=""/>}
// // // // //                                     {activeLesson.type === 'video_url' && <div className="aspect-video bg-black rounded-lg overflow-hidden"><iframe src={getEmbedUrl(activeLesson.videoUrl)} className="w-full h-full" allowFullScreen title="Video Player"/></div>}
// // // // //                                     {activeLesson.type === 'virtual_class' && <div className="text-center p-8 bg-purple-50 rounded-xl border border-purple-200"><h3 className="font-bold text-purple-900 mb-2">Kelas Virtual</h3><a href={activeLesson.meetingLink || activeLesson.content} target="_blank" className="bg-purple-600 text-white px-6 py-2 rounded-full inline-block hover:bg-purple-700">Gabung Meeting</a></div>}
// // // // //                                     {activeLesson.type === 'download_doc' && <div className="text-center p-8 border-2 border-dashed rounded-xl"><FileText size={40} className="mx-auto text-blue-500 mb-2"/><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" className="text-blue-600 font-bold hover:underline">Download Materi</a></div>}
// // // // //                                     {activeLesson.content && activeLesson.type !== 'image' && activeLesson.type !== 'virtual_class' && (
// // // // //                                         <div className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
// // // // //                                     )}
// // // // //                                 </div>
// // // // //                             )}

// // // // //                             {activeLesson.type === 'essay' && (
// // // // //                                 <div className="space-y-6">
// // // // //                                     <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
// // // // //                                         <button onClick={() => setCurrentEssayQ(Math.max(0, currentEssayQ - 1))} disabled={currentEssayQ === 0} className="px-4 py-2 text-xs font-bold bg-white border rounded hover:bg-gray-100 disabled:opacity-50">&larr; Soal Sebelumnya</button>
// // // // //                                         <span className="text-sm font-bold text-gray-700">Soal {currentEssayQ + 1} dari {activeLesson.questions.length}</span>
// // // // //                                         <button onClick={() => setCurrentEssayQ(Math.min(activeLesson.questions.length - 1, currentEssayQ + 1))} disabled={currentEssayQ === activeLesson.questions.length - 1} className="px-4 py-2 text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded hover:bg-indigo-100 disabled:opacity-50">Soal Selanjutnya &rarr;</button>
// // // // //                                     </div>

// // // // //                                     <div className="border p-6 rounded-xl bg-gray-50/50">
// // // // //                                         <div className="font-bold mb-4 text-sm text-gray-800"><span className="text-xs text-gray-500 block mb-1">PERTANYAAN:</span><div dangerouslySetInnerHTML={{ __html: activeLesson.questions[currentEssayQ].question }} /></div>
// // // // //                                         <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// // // // //                                             <ReactQuill 
// // // // //                                                 key={`essay-q-${currentEssayQ}`} 
// // // // //                                                 theme="snow" 
// // // // //                                                 value={essayAnswers[currentEssayQ] || ''} 
// // // // //                                                 onChange={(v) => handleEssayChange(currentEssayQ, v)} 
// // // // //                                                 placeholder="Tulis jawaban..."
// // // // //                                                 className="h-96 mb-12 bg-white" 
// // // // //                                                 modules={QUILL_MODULES} 
// // // // //                                             />
// // // // //                                         </div>
// // // // //                                     </div>

// // // // //                                     <div className="flex justify-center pt-6 pb-10"> 
// // // // //                                         <button onClick={handleSubmitTask} disabled={isSubmitting} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 shadow-lg transition-transform hover:scale-105 active:scale-95 w-auto">{isSubmitting ? 'Mengirim...' : 'Kirim Semua Jawaban'}</button>
// // // // //                                     </div>
// // // // //                                 </div>
// // // // //                             )}

// // // // //                             {(activeLesson.type === 'upload_doc' || activeLesson.type === 'image') && (
// // // // //                                 <div className="border-2 border-dashed p-8 text-center rounded-xl bg-gray-50 border-indigo-200 mt-6">
// // // // //                                     {isLessonCompleted && !uploadedFile && !isReuploading ? (
// // // // //                                         <div className="animate-in fade-in zoom-in"><CheckCircle size={32} className="mx-auto text-green-600 mb-2"/><h3 className="font-bold text-gray-800">Tugas Terkirim!</h3><button onClick={() => setIsReuploading(true)} className="mt-4 text-sm text-blue-600 underline">Kirim Ulang</button></div>
// // // // //                                     ) : (
// // // // //                                         <>
// // // // //                                             {uploadedFile ? (
// // // // //                                                 <div className="text-center"><FileCheck className="w-8 h-8 mx-auto text-green-600 mb-2"/><p className="font-bold">{uploadedFile.name}</p><button onClick={() => setUploadedFile(null)} className="text-red-500 text-sm underline mt-2">Ganti File</button></div>
// // // // //                                             ) : (
// // // // //                                                 <label className="cursor-pointer bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 inline-flex items-center gap-2 shadow-md"><UploadCloud size={18}/> Pilih File <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"/></label>
// // // // //                                             )}
// // // // //                                             <button onClick={handleSubmitTask} disabled={!uploadedFile || isSubmitting} className={`mt-6 px-8 py-2 block mx-auto rounded-lg font-bold text-white shadow-lg ${!uploadedFile ? 'bg-gray-300 hidden' : 'bg-green-600 hover:bg-green-700'}`}>Kirim Tugas</button>
// // // // //                                         </>
// // // // //                                     )}
// // // // //                                 </div>
// // // // //                             )}

// // // // //                             {activeLesson.type === 'poll' && (
// // // // //                                 <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200 mt-6">
// // // // //                                     <h3 className="font-bold text-lg mb-4">{activeLesson.pollQuestion || "Polling"}</h3>
// // // // //                                     <div className="space-y-2 max-w-md mx-auto">
// // // // //                                         {activeLesson.pollOptions?.map((opt:string, idx:number) => (
// // // // //                                             <button key={idx} onClick={()=>setPollSelected(idx)} className={`w-full p-3 rounded-lg border text-left text-sm ${pollSelected===idx ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-gray-100'}`}>{opt}</button>
// // // // //                                         ))}
// // // // //                                     </div>
// // // // //                                     <button onClick={handleSubmitTask} disabled={pollSelected===null||isSubmitting} className="mt-6 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700">Kirim Polling</button>
// // // // //                                 </div>
// // // // //                             )}
// // // // //                         </>
// // // // //                     )}
// // // // //                 </div>
// // // // //             </div>
// // // // //         );
// // // // //     };
  
// // // // //     if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // // //     if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;
  
// // // // //     if (!isEnrolled || enrollmentStatus === 'pending') {
// // // // //         return (
// // // // //           <div className="min-h-screen bg-gray-50 pb-20">
// // // // //               {showRegisterModal && <CourseRegistrationModal courseId={courseId} courseTitle={course.title} programType={course.programType} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil! Menunggu Verifikasi."); window.location.reload(); }} />}
// // // // //               <div className="relative bg-gray-900 text-white py-24 px-6 text-center"><h1 className="text-4xl font-bold mb-4">{course.title}</h1><button onClick={() => setShowRegisterModal(true)} className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 shadow-lg">Daftar Sekarang</button></div>
// // // // //           </div>
// // // // //         );
// // // // //     }
  
// // // // //     return (
// // // // //       <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // // // //         <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
// // // // //           <div className="p-5 border-b bg-white">
// // // // //               <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" title="Kembali ke Katalog" aria-label="Kembali"><span>←</span> KEMBALI KE KATALOG</Link>
// // // // //               <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
// // // // //               <div className="space-y-2 mb-4">
// // // // //                   <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{Math.round(progressPercent)}%</span></div>
// // // // //                   <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: `${progressPercent}%`}}></div></div>
// // // // //               </div>
              
// // // // //               <button onClick={() => setShowPersonalChat(true)} className="w-full flex items-center justify-center gap-2 bg-white text-indigo-600 py-2.5 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50 relative" aria-label="Hubungi Pengajar">
// // // // //                   <MessageCircle size={16}/> Hubungi Pengajar
// // // // //               </button>
// // // // //           </div>
// // // // //           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
// // // // //               {course.modules?.map((mod:any, i:number) => {
// // // // //                   if (!mod.isActive) return null;
// // // // //                   const activeLessons = mod.lessons?.filter((l: any) => l.isActive) || [];
// // // // //                   return (
// // // // //                       <div key={mod._id}>
// // // // //                           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
// // // // //                           <div className="space-y-1">
// // // // //                               {activeLessons.map((les:any) => (
// // // // //                                   <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`} aria-label={`Buka Materi ${les.title}`} title={les.title}>
// // // // //                                       {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
// // // // //                                       {les.title}
// // // // //                                   </button>
// // // // //                               ))}
// // // // //                           </div>
// // // // //                       </div>
// // // // //                   );
// // // // //               })}
// // // // //           </div>
// // // // //         </aside>
  
// // // // //         <main className="flex-1 flex flex-col relative h-full overflow-hidden bg-gray-50">
// // // // //           <div className="md:hidden p-4 bg-white border-b flex justify-between items-center"><button onClick={()=>setIsSidebarOpen(!isSidebarOpen)} aria-label="Menu"><Menu/></button></div>
// // // // //           <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
// // // // //               {renderContent()}
// // // // //           </div>
// // // // //           <div className="fixed bottom-8 right-8 flex gap-3 z-30">
// // // // //               <button onClick={handlePrevLesson} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105" aria-label="Sebelumnya" title="Sebelumnya"><ChevronLeft/></button>
// // // // //               <button onClick={handleManualComplete} className="h-12 px-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 font-bold hover:scale-105" aria-label="Lanjut" title="Lanjut"><span>Lanjut</span><ChevronRight/></button>
// // // // //           </div>
// // // // //         </main>
        
// // // // //         {user && (
// // // // //             <div className="fixed bottom-36 right-6 z-40">
// // // // //                 <button 
// // // // //                     onClick={() => setShowGroupChat(true)}
// // // // //                     className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-xl transition-transform hover:scale-105 flex items-center gap-2 relative"
// // // // //                     title="Ruang Diskusi"
// // // // //                     aria-label="Ruang Diskusi"
// // // // //                 >
// // // // //                     <MessageSquare size={24} />
// // // // //                     <span className="font-bold text-sm hidden md:inline">Ruang Diskusi</span>
// // // // //                     <ChatNotificationBadge courseId={courseId} />
// // // // //                 </button>
// // // // //             </div>
// // // // //         )}

// // // // //         {showPersonalChat && <ChatWithFacilitatorModal facilitators={courseFacilitators} onClose={() => setShowPersonalChat(false)} />}
  
// // // // //         {user && showGroupChat && (
// // // // //           <CourseGroupChat 
// // // // //               courseId={courseId} 
// // // // //               currentUser={user} 
// // // // //               participants={courseParticipants} 
// // // // //               facilitators={courseFacilitators} 
// // // // //               onClose={() => setShowGroupChat(false)}
// // // // //               isFloating={false} 
// // // // //           />
// // // // //         )}
// // // // //       </div>
// // // // //     );
// // // // // }

// // // // 'use client';

// // // // import { useState, useEffect, useRef } from 'react';
// // // // import { useParams, useRouter } from 'next/navigation';
// // // // import Link from 'next/link';
// // // // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // // // import { useAuth } from '@/lib/AuthProvider';
// // // // import QuizPlayer from '@/components/QuizPlayer';
// // // // import CourseGroupChat from '@/components/CourseGroupChat'; 
// // // // import ChatNotificationBadge from '@/components/ChatNotificationBadge'; 
// // // // import { 
// // // //     Users, Clock, MessageCircle, ChevronLeft, ChevronRight, Menu, 
// // // //     FileText, PlayCircle, CheckCircle, UploadCloud, Calendar, Download, 
// // // //     Video, School, Play, AlertCircle, Award, FileCheck,
// // // //     X, Send, MessageSquare 
// // // // } from 'lucide-react';
// // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';
// // // // import dynamic from 'next/dynamic';
// // // // import 'react-quill/dist/quill.snow.css';

// // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // //     ssr: false, 
// // // //     loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg border border-gray-200">Loading Editor...</div> 
// // // // });

// // // // // [UPDATE] MENAMBAHKAN FITUR GAMBAR & VIDEO KE TOOLBAR
// // // // const QUILL_MODULES = {
// // // //     toolbar: [
// // // //         [{ 'header': [1, 2, 3, false] }],
// // // //         ['bold', 'italic', 'underline', 'strike'],
// // // //         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
// // // //         ['link', 'image', 'video'], // Ditambahkan di sini
// // // //         ['clean']
// // // //     ]
// // // // };

// // // // // ... Helper Functions tetap sama ...
// // // // const getFacilitatorName = (activeFacilitatorId: any, facilitatorsList: any[]) => {
// // // //     if (!activeFacilitatorId) return '-';
// // // //     if (typeof activeFacilitatorId === 'object' && activeFacilitatorId.name) return activeFacilitatorId.name;
// // // //     const found = facilitatorsList.find(f => (f._id === activeFacilitatorId) || (f.id === activeFacilitatorId));
// // // //     return found ? found.name : 'Fasilitator';
// // // // };

// // // // const formatDate = (dateString: string) => {
// // // //     if (!dateString) return '-';
// // // //     return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // // };

// // // // const getEmbedUrl = (url: string) => {
// // // //     if (!url) return '';
// // // //     if (url.includes('youtube.com/embed/')) return url;
// // // //     try {
// // // //         let videoId = '';
// // // //         if (url.includes('youtu.be/')) {
// // // //             videoId = url.split('youtu.be/')[1]?.split('?')[0];
// // // //         } else if (url.includes('youtube.com/watch')) {
// // // //             const urlParams = new URL(url).searchParams;
// // // //             videoId = urlParams.get('v') || '';
// // // //         }
// // // //         if (videoId) return `https://www.youtube.com/embed/${videoId}`;
// // // //     } catch (e) { console.error("Error parsing YouTube URL:", e); }
// // // //     return url;
// // // // };

// // // // // ... ChatWithFacilitatorModal tetap sama ...
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
// // // //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center !z-[99999] p-4 backdrop-blur-sm">
// // // //             <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px] animate-in zoom-in-95">
// // // //                 <div className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md z-10 shrink-0">
// // // //                     <h3 className="font-bold flex items-center gap-2 text-sm"><MessageCircle size={18} /> Hubungi Pengajar</h3>
// // // //                     <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20} /></button>
// // // //                 </div>
// // // //                 <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
// // // //                     {messages.map((msg: any, idx: number) => {
// // // //                         const isMe = msg.sender === 'me' || msg.sender?._id === user?.id;
// // // //                         return (
// // // //                             <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
// // // //                                 <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
// // // //                                     <p>{msg.message}</p>
// // // //                                 </div>
// // // //                             </div>
// // // //                         );
// // // //                     })}
// // // //                     <div ref={messagesEndRef} />
// // // //                 </div>
// // // //                 <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2 shrink-0">
// // // //                     <input className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50 outline-none focus:border-indigo-500" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} />
// // // //                     <button type="submit" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={16}/></button>
// // // //                 </form>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }

// // // // // --- MAIN COMPONENT ---
// // // // export default function StudentCoursePlayPage() {
// // // //     const params = useParams();
// // // //     const { user } = useAuth();
// // // //     const { courseId } = params as { courseId: string };
  
// // // //     // ... State declarations same as before ...
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
// // // //     const [showGroupChat, setShowGroupChat] = useState(false);
  
// // // //     const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// // // //     const [currentEssayQ, setCurrentEssayQ] = useState(0); 

// // // //     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// // // //     const [pollSelected, setPollSelected] = useState<number | null>(null);
// // // //     const [isSubmitting, setIsSubmitting] = useState(false);
// // // //     const [isReuploading, setIsReuploading] = useState(false);

// // // //     const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
// // // //     const [isStarted, setIsStarted] = useState(false); 
  
// // // //     // ... Init Data, Timer, Progress Logic (Copy from previous) ...
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
// // // //                                 const userList = resPart.participants?.map((p: any) => p.user) || [];
// // // //                                 setCourseParticipants(userList);
// // // //                             } catch (e) { }
// // // //                         }
// // // //                     }
// // // //                 } catch (e) { }
// // // //             }
// // // //             if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
// // // //           } catch (e) { console.error(e); } finally { setLoading(false); }
// // // //         };
// // // //         if (courseId) initData();
// // // //     }, [courseId, user]);
    
// // // //     // Timer Logic
// // // //     useEffect(() => {
// // // //         setTimerSeconds(null);
// // // //         if (activeLesson) {
// // // //             if (!activeLesson.quizDuration || activeLesson.quizDuration <= 0 || completedLessonIds.includes(activeLesson._id)) {
// // // //                 setIsStarted(true);
// // // //                 return;
// // // //             }
// // // //             const storageKey = `timer_${user?.id}_${activeLesson._id}`;
// // // //             const storedEndTime = localStorage.getItem(storageKey);
// // // //             if (storedEndTime) {
// // // //                 const endTime = parseInt(storedEndTime, 10);
// // // //                 if (endTime > Date.now()) {
// // // //                     setIsStarted(true); 
// // // //                     startTicker(endTime); 
// // // //                 } else {
// // // //                     localStorage.removeItem(storageKey);
// // // //                     setIsStarted(true); 
// // // //                     setTimerSeconds(0);
// // // //                 }
// // // //             } else {
// // // //                 setIsStarted(false);
// // // //             }
// // // //         }
// // // //     }, [activeLesson, completedLessonIds, user]);

// // // //     const startTicker = (endTime: number) => {
// // // //         const update = () => {
// // // //             const now = Date.now();
// // // //             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
// // // //             setTimerSeconds(remaining);
// // // //         };
// // // //         update(); 
// // // //         const interval = setInterval(() => {
// // // //             const now = Date.now();
// // // //             const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
// // // //             setTimerSeconds(remaining);
// // // //             if (remaining <= 0) clearInterval(interval);
// // // //         }, 1000);
// // // //         return interval;
// // // //     };

// // // //     const handleStartLesson = () => {
// // // //         if (activeLesson.quizDuration > 0) {
// // // //             const endTime = Date.now() + activeLesson.quizDuration * 60 * 1000;
// // // //             const storageKey = `timer_${user?.id}_${activeLesson._id}`;
// // // //             localStorage.setItem(storageKey, endTime.toString());
// // // //             setIsStarted(true);
// // // //             startTicker(endTime);
// // // //         } else {
// // // //             setIsStarted(true);
// // // //         }
// // // //     };

// // // //     const formatTimer = (seconds: number) => {
// // // //         const m = Math.floor(seconds / 60);
// // // //         const s = seconds % 60;
// // // //         return `${m}:${s < 10 ? '0' : ''}${s}`;
// // // //     };

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
// // // //           setIsReuploading(false); 
// // // //           setCurrentEssayQ(0);
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

// // // //     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //         const file = e.target.files?.[0];
// // // //         if (!file) return;
// // // //         if (file.size > 10 * 1024 * 1024) {
// // // //             alert("File terlalu besar (Maks 10MB)");
// // // //             e.target.value = ''; 
// // // //             return;
// // // //         }
// // // //         setUploadedFile(file);
// // // //     };

// // // //     const markLessonAsComplete = async (lessonId: string, extraData: any = {}) => {
// // // //         try { 
// // // //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId, ...extraData } }); 
// // // //             if (!completedLessonIds.includes(lessonId)) setCompletedLessonIds(prev => [...prev, lessonId]); 
// // // //             if(user) localStorage.removeItem(`timer_${user.id}_${lessonId}`);
// // // //         } catch(e) { console.error("Save progress failed", e); }
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
// // // //     const handleQuizCompleted = async (result: { score: number, attempts: number }) => { try { await markLessonAsComplete(activeLesson._id, { score: result.score, attempts: result.attempts }); if (!completedLessonIds.includes(activeLesson._id)) setCompletedLessonIds(prev => [...prev, activeLesson._id]); } catch (e) { console.error("Gagal simpan skor kuis", e); } };
// // // //     const handleSubmitTask = async () => { setIsSubmitting(true); try { if (activeLesson.type === 'essay') { if (essayAnswers.some(ans => ans.trim() === '')) throw new Error("Mohon jawab semua pertanyaan."); await api(`/api/progress/${courseId}/submit-essay`, { method: 'POST', body: { lessonId: activeLesson._id, answers: essayAnswers } }); } else if (activeLesson.type === 'upload_doc' || activeLesson.type === 'image') { if (!uploadedFile) throw new Error("Pilih file terlebih dahulu."); const fd = new FormData(); fd.append('file', uploadedFile); const uploadRes: any = await apiUpload('/api/upload', fd); let fileUrl = uploadRes.url || uploadRes.data?.url || uploadRes.file?.path || uploadRes.file?.secure_url; if (!fileUrl) throw new Error("Gagal membaca URL file."); await api(`/api/progress/${courseId}/submit-task`, { method: 'POST', body: { lessonId: activeLesson._id, fileUrl: fileUrl, fileName: uploadedFile.name } }); } else if (activeLesson.type === 'poll') { if (pollSelected === null) throw new Error("Pilih salah satu opsi."); const answerText = activeLesson.pollOptions[pollSelected]; await markLessonAsComplete(activeLesson._id, { pollAnswer: answerText }); } else { await markLessonAsComplete(activeLesson._id); } if (!completedLessonIds.includes(activeLesson._id)) setCompletedLessonIds(prev => [...prev, activeLesson._id]); setIsReuploading(false); alert("Berhasil dikirim!"); handleNextLesson(); } catch (e: any) { alert("Gagal mengirim: " + e.message); } finally { setIsSubmitting(false); } };

// // // //     // --- RENDER CONTENT ---
// // // //     const renderContent = () => {
// // // //         if (!activeLesson) return <div className="text-center text-gray-400 py-10">Pilih materi di samping.</div>;
// // // //         const isLessonCompleted = completedLessonIds.includes(activeLesson._id);

// // // //         return (
// // // //             <div>
// // // //                 <div className="mb-6 border-b border-gray-100 pb-4">
// // // //                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
// // // //                         <div>
// // // //                             <span className="uppercase tracking-wider text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600">{activeLesson?.type?.replace(/_/g, ' ') || 'MATERI'}</span>
// // // //                             <h1 className="text-gray-900 font-bold text-2xl mt-2 leading-tight">{activeLesson.title}</h1>
// // // //                         </div>
// // // //                         <div className="flex-shrink-0 flex flex-wrap items-center gap-3 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
// // // //                             {activeLesson.quizDuration > 0 && (
// // // //                                 <div className={`flex items-center gap-1 px-2 py-0.5 rounded border ${timerSeconds !== null && timerSeconds < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
// // // //                                     <Clock size={14} /> <span className="font-bold text-sm">{timerSeconds !== null ? `Sisa: ${formatTimer(timerSeconds)}` : `${activeLesson.quizDuration} Menit`}</span>
// // // //                                 </div>
// // // //                             )}
// // // //                             <div className="flex items-center gap-1"><Users size={12}/> <span>{getFacilitatorName(activeLesson.facilitatorId, courseFacilitators)}</span></div>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>

// // // //                 {/* TIMER BESAR DI TENGAH ATAS KONTEN */}
// // // //                 {activeLesson.quizDuration > 0 && timerSeconds !== null && (
// // // //                     <div className="mb-6 flex justify-center sticky top-0 z-20">
// // // //                          <div className={`px-6 py-3 rounded-full shadow-lg border-2 flex items-center gap-3 transition-all transform ${timerSeconds < 60 ? 'bg-red-50 border-red-500 text-red-600 animate-pulse scale-105' : 'bg-indigo-600 border-indigo-700 text-white'}`}>
// // // //                             <Clock size={28} className={timerSeconds < 60 ? "animate-bounce" : ""} />
// // // //                             <div className="flex flex-col items-center leading-none">
// // // //                                 <span className="text-2xl font-black font-mono tracking-widest">{formatTimer(timerSeconds)}</span>
// // // //                                 <span className="text-[10px] font-bold uppercase opacity-80">Sisa Waktu</span>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 )}

// // // //                 <div className="content-body">
// // // //                     {/* Blocked by Timer? */}
// // // //                     {activeLesson.quizDuration > 0 && !isStarted && !completedLessonIds.includes(activeLesson._id) ? (
// // // //                         <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-200 text-center min-h-[300px]">
// // // //                             <div className="bg-indigo-100 p-5 rounded-full mb-6 text-indigo-600"><Clock size={48} /></div>
// // // //                             <h2 className="text-2xl font-bold text-gray-800 mb-3">Materi dengan Batas Waktu</h2>
// // // //                             <p className="text-gray-500 mb-8">Waktu: <span className="font-bold">{activeLesson.quizDuration} Menit</span></p>
// // // //                             <button onClick={handleStartLesson} className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-indigo-700 shadow-lg"><Play size={20}/> Mulai Kerjakan</button>
// // // //                         </div>
// // // //                     ) : timerSeconds !== null && timerSeconds <= 0 && !completedLessonIds.includes(activeLesson._id) ? (
// // // //                         <div className="flex flex-col items-center justify-center p-12 bg-red-50 text-center"><AlertCircle size={40} className="text-red-600 mb-4"/><h2 className="text-xl font-bold text-red-800">Waktu Habis!</h2><button onClick={handleNextLesson} className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg">Lanjut</button></div>
// // // //                     ) : (
// // // //                         <>
// // // //                             {/* Render Logic per Type (Sama) */}
// // // //                             {activeLesson.type === 'quiz' && <QuizPlayer quizId={activeLesson._id} courseId={courseId} lessonData={activeLesson} onComplete={handleQuizCompleted} />}
                            
// // // //                             {(activeLesson.type === 'image' || activeLesson.type === 'slide' || activeLesson.type === 'download_doc' || activeLesson.type === 'video_url' || activeLesson.type === 'virtual_class' || activeLesson.type === 'google_classroom' || activeLesson.type === 'lesson') && (
// // // //                                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
// // // //                                     {activeLesson.type === 'image' && <img src={getImageUrl(activeLesson.fileUrl)} className="w-full h-auto rounded-lg shadow" alt=""/>}
// // // //                                     {activeLesson.type === 'video_url' && <div className="aspect-video bg-black rounded-lg overflow-hidden"><iframe src={getEmbedUrl(activeLesson.videoUrl)} className="w-full h-full" allowFullScreen title="Video Player"/></div>}
// // // //                                     {activeLesson.type === 'virtual_class' && <div className="text-center p-8 bg-purple-50 rounded-xl border border-purple-200"><h3 className="font-bold text-purple-900 mb-2">Kelas Virtual</h3><a href={activeLesson.meetingLink || activeLesson.content} target="_blank" className="bg-purple-600 text-white px-6 py-2 rounded-full inline-block hover:bg-purple-700">Gabung Meeting</a></div>}
// // // //                                     {activeLesson.type === 'download_doc' && <div className="text-center p-8 border-2 border-dashed rounded-xl"><FileText size={40} className="mx-auto text-blue-500 mb-2"/><a href={getImageUrl(activeLesson.fileUrl)} target="_blank" className="text-blue-600 font-bold hover:underline">Download Materi</a></div>}
// // // //                                     {activeLesson.content && activeLesson.type !== 'image' && activeLesson.type !== 'virtual_class' && (
// // // //                                         <div className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
// // // //                                     )}
// // // //                                 </div>
// // // //                             )}

// // // //                             {activeLesson.type === 'essay' && (
// // // //                                 <div className="space-y-6">
// // // //                                     <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
// // // //                                         <button onClick={() => setCurrentEssayQ(Math.max(0, currentEssayQ - 1))} disabled={currentEssayQ === 0} className="px-4 py-2 text-xs font-bold bg-white border rounded hover:bg-gray-100 disabled:opacity-50">&larr; Soal Sebelumnya</button>
// // // //                                         <span className="text-sm font-bold text-gray-700">Soal {currentEssayQ + 1} dari {activeLesson.questions.length}</span>
// // // //                                         <button onClick={() => setCurrentEssayQ(Math.min(activeLesson.questions.length - 1, currentEssayQ + 1))} disabled={currentEssayQ === activeLesson.questions.length - 1} className="px-4 py-2 text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded hover:bg-indigo-100 disabled:opacity-50">Soal Selanjutnya &rarr;</button>
// // // //                                     </div>

// // // //                                     <div className="border p-6 rounded-xl bg-gray-50/50">
// // // //                                         <div className="font-bold mb-4 text-sm text-gray-800"><span className="text-xs text-gray-500 block mb-1">PERTANYAAN:</span><div dangerouslySetInnerHTML={{ __html: activeLesson.questions[currentEssayQ].question }} /></div>
// // // //                                         <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// // // //                                             <ReactQuill 
// // // //                                                 key={`essay-q-${currentEssayQ}`} 
// // // //                                                 theme="snow" 
// // // //                                                 value={essayAnswers[currentEssayQ] || ''} 
// // // //                                                 onChange={(v) => handleEssayChange(currentEssayQ, v)} 
// // // //                                                 placeholder="Tulis jawaban..."
// // // //                                                 className="h-96 mb-12 bg-white" 
// // // //                                                 modules={QUILL_MODULES} 
// // // //                                             />
// // // //                                         </div>
// // // //                                     </div>

// // // //                                     <div className="flex justify-center pt-6 pb-10"> 
// // // //                                         <button onClick={handleSubmitTask} disabled={isSubmitting} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 shadow-lg transition-transform hover:scale-105 active:scale-95 w-auto">{isSubmitting ? 'Mengirim...' : 'Kirim Semua Jawaban'}</button>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             )}

// // // //                             {(activeLesson.type === 'upload_doc' || activeLesson.type === 'image') && (
// // // //                                 <div className="border-2 border-dashed p-8 text-center rounded-xl bg-gray-50 border-indigo-200 mt-6">
// // // //                                     {isLessonCompleted && !uploadedFile && !isReuploading ? (
// // // //                                         <div className="animate-in fade-in zoom-in"><CheckCircle size={32} className="mx-auto text-green-600 mb-2"/><h3 className="font-bold text-gray-800">Tugas Terkirim!</h3><button onClick={() => setIsReuploading(true)} className="mt-4 text-sm text-blue-600 underline">Kirim Ulang</button></div>
// // // //                                     ) : (
// // // //                                         <>
// // // //                                             {uploadedFile ? (
// // // //                                                 <div className="text-center"><FileCheck className="w-8 h-8 mx-auto text-green-600 mb-2"/><p className="font-bold">{uploadedFile.name}</p><button onClick={() => setUploadedFile(null)} className="text-red-500 text-sm underline mt-2">Ganti File</button></div>
// // // //                                             ) : (
// // // //                                                 <label className="cursor-pointer bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 inline-flex items-center gap-2 shadow-md"><UploadCloud size={18}/> Pilih File <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"/></label>
// // // //                                             )}
// // // //                                             <button onClick={handleSubmitTask} disabled={!uploadedFile || isSubmitting} className={`mt-6 px-8 py-2 block mx-auto rounded-lg font-bold text-white shadow-lg ${!uploadedFile ? 'bg-gray-300 hidden' : 'bg-green-600 hover:bg-green-700'}`}>Kirim Tugas</button>
// // // //                                         </>
// // // //                                     )}
// // // //                                 </div>
// // // //                             )}

// // // //                             {activeLesson.type === 'poll' && (
// // // //                                 <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200 mt-6">
// // // //                                     <h3 className="font-bold text-lg mb-4">{activeLesson.pollQuestion || "Polling"}</h3>
// // // //                                     <div className="space-y-2 max-w-md mx-auto">
// // // //                                         {activeLesson.pollOptions?.map((opt:string, idx:number) => (
// // // //                                             <button key={idx} onClick={()=>setPollSelected(idx)} className={`w-full p-3 rounded-lg border text-left text-sm ${pollSelected===idx ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-gray-100'}`}>{opt}</button>
// // // //                                         ))}
// // // //                                     </div>
// // // //                                     <button onClick={handleSubmitTask} disabled={pollSelected===null||isSubmitting} className="mt-6 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700">Kirim Polling</button>
// // // //                                 </div>
// // // //                             )}
// // // //                         </>
// // // //                     )}
// // // //                 </div>
// // // //             </div>
// // // //         );
// // // //     };
  
// // // //     if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// // // //     if (!course) return <div className="p-10 text-center text-gray-500">Data kursus tidak ditemukan.</div>;
  
// // // //     if (!isEnrolled || enrollmentStatus === 'pending') {
// // // //         return (
// // // //           <div className="min-h-screen bg-gray-50 pb-20">
// // // //               {showRegisterModal && <CourseRegistrationModal courseId={courseId} courseTitle={course.title} programType={course.programType} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil! Menunggu Verifikasi."); window.location.reload(); }} />}
// // // //               <div className="relative bg-gray-900 text-white py-24 px-6 text-center"><h1 className="text-4xl font-bold mb-4">{course.title}</h1><button onClick={() => setShowRegisterModal(true)} className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 shadow-lg">Daftar Sekarang</button></div>
// // // //           </div>
// // // //         );
// // // //     }
  
// // // //     return (
// // // //       <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// // // //         <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300`}>
// // // //           <div className="p-5 border-b bg-white">
// // // //               <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4" title="Kembali ke Katalog" aria-label="Kembali"><span>←</span> KEMBALI KE KATALOG</Link>
// // // //               <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
// // // //               <div className="space-y-2 mb-4">
// // // //                   <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{Math.round(progressPercent)}%</span></div>
// // // //                   <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: `${progressPercent}%`}}></div></div>
// // // //               </div>
              
// // // //               <button onClick={() => setShowPersonalChat(true)} className="w-full flex items-center justify-center gap-2 bg-white text-indigo-600 py-2.5 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50 relative" aria-label="Hubungi Pengajar">
// // // //                   <MessageCircle size={16}/> Hubungi Pengajar
// // // //               </button>
// // // //           </div>
// // // //           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
// // // //               {course.modules?.map((mod:any, i:number) => {
// // // //                   if (!mod.isActive) return null;
// // // //                   const activeLessons = mod.lessons?.filter((l: any) => l.isActive) || [];
// // // //                   return (
// // // //                       <div key={mod._id}>
// // // //                           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
// // // //                           <div className="space-y-1">
// // // //                               {activeLessons.map((les:any) => (
// // // //                                   <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`} aria-label={`Buka Materi ${les.title}`} title={les.title}>
// // // //                                       {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
// // // //                                       {les.title}
// // // //                                   </button>
// // // //                               ))}
// // // //                           </div>
// // // //                       </div>
// // // //                   );
// // // //               })}
// // // //           </div>
// // // //         </aside>
  
// // // //         <main className="flex-1 flex flex-col relative h-full overflow-hidden bg-gray-50">
// // // //           <div className="md:hidden p-4 bg-white border-b flex justify-between items-center"><button onClick={()=>setIsSidebarOpen(!isSidebarOpen)} aria-label="Menu"><Menu/></button></div>
// // // //           <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
// // // //               {renderContent()}
// // // //           </div>
// // // //           <div className="fixed bottom-8 right-8 flex gap-3 z-30">
// // // //               <button onClick={handlePrevLesson} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105" aria-label="Sebelumnya" title="Sebelumnya"><ChevronLeft/></button>
// // // //               <button onClick={handleManualComplete} className="h-12 px-6 bg-green-600 text-white rounded-full shadow-lg flex items-center gap-2 font-bold hover:scale-105" aria-label="Lanjut" title="Lanjut"><span>Lanjut</span><ChevronRight/></button>
// // // //           </div>
// // // //         </main>
        
// // // //         {/* [UPDATE] FLOATING BUTTON DIKECILKAN (ICON ONLY) */}
// // // //         {user && (
// // // //             <div className="fixed bottom-36 right-6 z-40">
// // // //                 <button 
// // // //                     onClick={() => setShowGroupChat(true)}
// // // //                     className="bg-indigo-600 hover:bg-indigo-700 text-white w-14 h-14 rounded-full shadow-xl transition-transform hover:scale-110 flex items-center justify-center relative"
// // // //                     title="Ruang Diskusi"
// // // //                     aria-label="Ruang Diskusi"
// // // //                 >
// // // //                     <MessageSquare size={28} />
// // // //                     {/* Badge Notifikasi menempel di pojok kanan atas tombol */}
// // // //                     <ChatNotificationBadge courseId={courseId} className="-top-1 -right-1" />
// // // //                 </button>
// // // //             </div>
// // // //         )}

// // // //         {showPersonalChat && <ChatWithFacilitatorModal facilitators={courseFacilitators} onClose={() => setShowPersonalChat(false)} />}
  
// // // //         {user && showGroupChat && (
// // // //           <CourseGroupChat 
// // // //               courseId={courseId} 
// // // //               currentUser={user} 
// // // //               participants={courseParticipants} 
// // // //               facilitators={courseFacilitators} 
// // // //               onClose={() => setShowGroupChat(false)}
// // // //               isFloating={false} 
// // // //           />
// // // //         )}
// // // //       </div>
// // // //     );
// // // // }




// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import Link from 'next/link';
// // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // import { useAuth } from '@/lib/AuthProvider';
// // import QuizPlayer from '@/components/QuizPlayer';
// // import CourseGroupChat from '@/components/CourseGroupChat'; 
// // import ChatNotificationBadge from '@/components/ChatNotificationBadge'; 
// // import { 
// //     Users, Clock, MessageCircle, ChevronLeft, ChevronRight, Menu, 
// //     FileText, PlayCircle, CheckCircle, UploadCloud, Calendar, Download, 
// //     Video, School, Play, AlertCircle, Award, FileCheck,
// //     X, Send, MessageSquare 
// // } from 'lucide-react';
// // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';
// // import dynamic from 'next/dynamic';
// // import 'react-quill/dist/quill.snow.css';

// // const ReactQuill = dynamic(() => import('react-quill'), { 
// //     ssr: false, 
// //     loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg border border-gray-200">Loading...</div> 
// // });

// // const QUILL_MODULES = {
// //     toolbar: [
// //         [{ 'header': [1, 2, 3, false] }],
// //         ['bold', 'italic', 'underline', 'strike'],
// //         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
// //         ['link', 'image', 'video'],
// //         ['clean']
// //     ]
// // };

// // // --- Helpers ---
// // const getFacilitatorName = (activeFacilitatorId: any, facilitatorsList: any[]) => {
// //     if (!activeFacilitatorId) return '-';
// //     if (typeof activeFacilitatorId === 'object' && activeFacilitatorId.name) return activeFacilitatorId.name;
// //     const found = facilitatorsList.find(f => (f._id === activeFacilitatorId) || (f.id === activeFacilitatorId));
// //     return found ? found.name : 'Fasilitator';
// // };

// // const formatTimer = (seconds: number) => {
// //     const m = Math.floor(seconds / 60);
// //     const s = seconds % 60;
// //     return `${m}:${s < 10 ? '0' : ''}${s}`;
// // };

// // const getEmbedUrl = (url: string) => {
// //     if (!url) return '';
// //     if (url.includes('youtube.com/embed/')) return url;
// //     try {
// //         let videoId = '';
// //         if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1]?.split('?')[0];
// //         else if (url.includes('youtube.com/watch')) videoId = new URL(url).searchParams.get('v') || '';
// //         if (videoId) return `https://www.youtube.com/embed/${videoId}`;
// //     } catch (e) {}
// //     return url;
// // };

// // // --- Sub Component: Chat Modal ---
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
// //         } catch (e) {}
// //     };

// //     const handleSend = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!message.trim() || !selectedFacilitator) return;
// //         setSending(true);
// //         try {
// //             await api('/api/chat/send', { method: 'POST', body: { recipientId: selectedFacilitator._id, message, type: 'personal' } });
// //             setMessage('');
// //             loadHistory();
// //         } catch (error: any) { alert("Gagal kirim: " + error.message); } finally { setSending(false); }
// //     };

// //     return (
// //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center !z-[99999] p-4 backdrop-blur-sm">
// //             <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]">
// //                 <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
// //                     <h3 className="font-bold flex items-center gap-2"><MessageCircle size={18} /> Chat Pengajar</h3>
// //                     {/* [FIX] Menambahkan aria-label */}
// //                     <button onClick={onClose} title="Tutup" aria-label="Tutup"><X size={20} /></button>
// //                 </div>
// //                 <div className="flex-1 p-4 bg-slate-100 overflow-y-auto flex flex-col gap-2">
// //                     {messages.map((msg: any, idx: number) => {
// //                         const isMe = msg.sender === 'me' || msg.sender?._id === user?.id;
// //                         return (
// //                             <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
// //                                 <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>{msg.message}</div>
// //                             </div>
// //                         );
// //                     })}
// //                     <div ref={messagesEndRef} />
// //                 </div>
// //                 <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
// //                     <input className="flex-1 border rounded-full px-4 py-2 text-sm" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} />
// //                     {/* [FIX] Menambahkan aria-label */}
// //                     <button type="submit" disabled={sending} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700" title="Kirim" aria-label="Kirim"><Send size={16}/></button>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // }

// // // --- MAIN PAGE ---
// // export default function StudentCoursePlayPage() {
// //     const params = useParams();
// //     const { user } = useAuth();
// //     const { courseId } = params as { courseId: string };
  
// //     const [course, setCourse] = useState<any>(null);
// //     const [activeLesson, setActiveLesson] = useState<any>(null);
// //     const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
// //     const [progressPercent, setProgressPercent] = useState(0);
// //     const [courseFacilitators, setCourseFacilitators] = useState<any[]>([]); 
    
// //     const [loading, setLoading] = useState(true);
// //     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// //     const [isEnrolled, setIsEnrolled] = useState(false);
// //     const [enrollmentStatus, setEnrollmentStatus] = useState<string>(''); 
// //     const [showRegisterModal, setShowRegisterModal] = useState(false);
// //     const [showPersonalChat, setShowPersonalChat] = useState(false);
// //     const [showGroupChat, setShowGroupChat] = useState(false);
  
// //     const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
// //     const [currentEssayQ, setCurrentEssayQ] = useState(0); 
// //     const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// //     const [pollSelected, setPollSelected] = useState<number | null>(null);
// //     const [isSubmitting, setIsSubmitting] = useState(false);
// //     const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
// //     const [isStarted, setIsStarted] = useState(false); 
  
// //     useEffect(() => {
// //         if (courseId) {
// //             const init = async () => {
// //                 setLoading(true);
// //                 try {
// //                     const res = await api(`/api/courses/${courseId}`);
// //                     // Handle response structure differences
// //                     const courseData = res.course || res;
// //                     setCourse(courseData);
// //                     setCourseFacilitators(courseData.facilitatorIds || []);

// //                     if (user) {
// //                         const enrollRes = await api(`/api/enrollments/check/${courseId}`);
// //                         setIsEnrolled(enrollRes.isEnrolled);
// //                         setEnrollmentStatus(enrollRes.status || 'pending');
                        
// //                         if (enrollRes.status === 'active' || enrollRes.status === 'approved') {
// //                             const resProg = await api(`/api/progress/${courseId}`);
// //                             setCompletedLessonIds(resProg.completedLessons || []);
// //                         }
// //                     }
// //                     if (courseData.modules?.[0]?.lessons?.[0]) setActiveLesson(courseData.modules[0].lessons[0]);
// //                 } catch (e) { console.error(e); } finally { setLoading(false); }
// //             };
// //             init();
// //         }
// //     }, [courseId, user]);

// //     // Timer logic
// //     useEffect(() => {
// //         setTimerSeconds(null);
// //         if (activeLesson) {
// //             if (!activeLesson.quizDuration || activeLesson.quizDuration <= 0 || completedLessonIds.includes(activeLesson._id)) {
// //                 setIsStarted(true); return;
// //             }
// //             const key = `timer_${user?.id}_${activeLesson._id}`;
// //             const stored = localStorage.getItem(key);
// //             if (stored) {
// //                 const end = parseInt(stored, 10);
// //                 if (end > Date.now()) { setIsStarted(true); startTicker(end); }
// //                 else { localStorage.removeItem(key); setIsStarted(true); setTimerSeconds(0); }
// //             } else { setIsStarted(false); }
// //         }
// //     }, [activeLesson, completedLessonIds]);

// //     const startTicker = (end: number) => {
// //         const tick = () => {
// //             const rem = Math.max(0, Math.floor((end - Date.now()) / 1000));
// //             setTimerSeconds(rem);
// //             if (rem <= 0) clearInterval(interval);
// //         };
// //         tick();
// //         const interval = setInterval(tick, 1000);
// //         return interval;
// //     };

// //     const handleStartLesson = () => {
// //         const end = Date.now() + activeLesson.quizDuration * 60 * 1000;
// //         localStorage.setItem(`timer_${user?.id}_${activeLesson._id}`, end.toString());
// //         setIsStarted(true);
// //         startTicker(end);
// //     };

// //     useEffect(() => {
// //         if (course && !loading) {
// //             let total = 0, completed = 0;
// //             course.modules?.forEach((m: any) => { if(m.isActive) m.lessons?.forEach((l: any) => { if(l.isActive) { total++; if (completedLessonIds.includes(l._id)) completed++; } }); });
// //             setProgressPercent(total === 0 ? 0 : Math.round((completed / total) * 100));
// //         }
// //     }, [completedLessonIds, course]);

// //     const markComplete = async (lessonId: string, extra = {}) => {
// //         try {
// //             await api(`/api/progress/${courseId}/complete`, { method: 'POST', body: { lessonId, ...extra } });
// //             if (!completedLessonIds.includes(lessonId)) setCompletedLessonIds(p => [...p, lessonId]);
// //             if(user) localStorage.removeItem(`timer_${user.id}_${lessonId}`);
// //         } catch(e) {}
// //     };

// //     const handleNext = () => {
// //         const all: any[] = [];
// //         course.modules.forEach((m:any) => { if(m.isActive) m.lessons.forEach((l:any) => { if(l.isActive) all.push(l); }); });
// //         const idx = all.findIndex(l => l._id === activeLesson._id);
// //         if (idx !== -1 && idx < all.length - 1) setActiveLesson(all[idx+1]);
// //     };

// //     const handlePrev = () => {
// //         const all: any[] = [];
// //         course.modules.forEach((m:any) => { if(m.isActive) m.lessons.forEach((l:any) => { if(l.isActive) all.push(l); }); });
// //         const idx = all.findIndex(l => l._id === activeLesson._id);
// //         if (idx > 0) setActiveLesson(all[idx-1]);
// //     };

// //     const handleSubmitTask = async () => {
// //         setIsSubmitting(true);
// //         try {
// //             if (activeLesson.type === 'essay') {
// //                 await api(`/api/progress/${courseId}/submit-essay`, { method: 'POST', body: { lessonId: activeLesson._id, answers: essayAnswers } });
// //             } else if (['upload_doc','image'].includes(activeLesson.type)) {
// //                 if (!uploadedFile) return alert("Pilih file!");
// //                 const fd = new FormData(); fd.append('file', uploadedFile);
// //                 const res: any = await apiUpload('/api/upload', fd);
// //                 await api(`/api/progress/${courseId}/submit-task`, { method: 'POST', body: { lessonId: activeLesson._id, fileUrl: res.url || res.file?.path } });
// //             }
// //             await markComplete(activeLesson._id);
// //             handleNext();
// //         } catch (e: any) { alert("Gagal: " + e.message); } finally { setIsSubmitting(false); }
// //     };

// //     if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
// //     if (!course) return <div className="p-10 text-center text-gray-500">Kursus tidak ditemukan.</div>;
  
// //     if (!isEnrolled || enrollmentStatus === 'pending') {
// //         return (
// //           <div className="min-h-screen bg-gray-50 pb-20">
// //               {showRegisterModal && <CourseRegistrationModal courseId={courseId} courseTitle={course.title} programType={course.programType} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => { setShowRegisterModal(false); alert("Pendaftaran Berhasil!"); window.location.reload(); }} />}
// //               <div className="relative bg-gray-900 text-white py-24 px-6 text-center"><h1 className="text-4xl font-bold mb-4">{course.title}</h1><button onClick={() => setShowRegisterModal(true)} className="bg-red-600 px-8 py-3 rounded-xl font-bold">Daftar Sekarang</button></div>
// //           </div>
// //         );
// //     }
  
// //     return (
// //       <div className="flex h-screen flex-col md:flex-row bg-gray-50 overflow-hidden">
// //         {/* SIDEBAR */}
// //         <aside className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} bg-white border-r flex-shrink-0 flex flex-col transition-all duration-300`}>
// //           <div className="p-5 border-b">
// //               <Link href="/courses" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4"><span>←</span> KEMBALI KE KATALOG</Link>
// //               <h2 className="font-bold text-gray-900 leading-tight mb-4">{course.title}</h2>
// //               <div className="space-y-2 mb-4">
// //                   <div className="flex justify-between text-xs font-bold"><span>Progress</span><span>{progressPercent}%</span></div>
// //                   {/* [FIX] Inline style untuk dynamic width tidak bisa dihindari sepenuhnya di React, tapi ini valid */}
// //                   <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full" style={{width: `${progressPercent}%`}}></div></div>
// //               </div>
// //               <button onClick={() => setShowPersonalChat(true)} className="w-full flex items-center justify-center gap-2 bg-white text-indigo-600 py-2.5 rounded-lg text-xs font-bold border border-indigo-200 hover:bg-indigo-50"><MessageCircle size={16}/> Hubungi Pengajar</button>
// //           </div>
// //           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
// //               {course.modules?.map((mod:any, i:number) => (
// //                   <div key={mod._id}>
// //                       <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">MODUL {i+1}: {mod.title}</h3>
// //                       <div className="space-y-1">
// //                           {mod.lessons?.map((les:any) => (
// //                               <button key={les._id} onClick={()=>setActiveLesson(les)} className={`block w-full text-left p-2 rounded text-xs flex items-center gap-2 ${activeLesson?._id === les._id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
// //                                   {completedLessonIds.includes(les._id) ? <CheckCircle size={14} className="text-green-400"/> : <div className="w-3.5 h-3.5 border rounded-full border-current opacity-50"></div>}
// //                                   {les.title}
// //                               </button>
// //                           ))}
// //                       </div>
// //                   </div>
// //               ))}
// //           </div>
// //         </aside>
  
// //         {/* MAIN CONTENT */}
// //         <main className="flex-1 flex flex-col h-full overflow-hidden">
// //           {/* [FIX] Menambahkan aria-label */}
// //           <div className="md:hidden p-4 bg-white border-b flex justify-between"><button onClick={()=>setIsSidebarOpen(!isSidebarOpen)} aria-label="Menu Sidebar"><Menu/></button></div>
// //           <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
// //               {activeLesson ? (
// //                   <div>
// //                       <h1 className="text-2xl font-bold mb-6">{activeLesson.title}</h1>
// //                       {activeLesson.quizDuration > 0 && timerSeconds !== null && (
// //                           <div className="mb-6 flex justify-center sticky top-0 z-20">
// //                               <div className={`px-6 py-3 rounded-full shadow-lg border-2 flex items-center gap-3 ${timerSeconds < 60 ? 'bg-red-50 border-red-500 text-red-600 animate-pulse' : 'bg-indigo-600 border-indigo-700 text-white'}`}>
// //                                   <Clock size={28}/> <span className="text-2xl font-mono">{formatTimer(timerSeconds)}</span>
// //                               </div>
// //                           </div>
// //                       )}
                      
// //                       {activeLesson.quizDuration > 0 && !isStarted && !completedLessonIds.includes(activeLesson._id) ? (
// //                           <div className="text-center p-12 bg-white rounded-xl shadow border"><h2 className="text-xl font-bold mb-4">Materi Berwaktu</h2><button onClick={handleStartLesson} className="bg-indigo-600 text-white px-8 py-3 rounded-full">Mulai</button></div>
// //                       ) : (
// //                           <div className="prose max-w-none">
// //                               {activeLesson.type === 'quiz' ? <QuizPlayer quizId={activeLesson._id} courseId={courseId} lessonData={activeLesson} onComplete={async (res) => { await markComplete(activeLesson._id, res); handleNext(); }} /> : 
// //                                (activeLesson.type === 'video_url' ? <iframe src={getEmbedUrl(activeLesson.videoUrl)} className="w-full aspect-video rounded-lg" allowFullScreen title="Video"/> :
// //                                (activeLesson.content ? <div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /> : <p className="text-gray-500">Konten tidak tersedia.</p>))}
                              
// //                               {!['quiz','essay','upload_doc'].includes(activeLesson.type) && (
// //                                   <button onClick={() => { markComplete(activeLesson._id); handleNext(); }} className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg font-bold">Selesai & Lanjut</button>
// //                               )}
// //                           </div>
// //                       )}
// //                   </div>
// //               ) : <div className="text-center text-gray-400 mt-20">Pilih materi di sidebar.</div>}
// //           </div>
// //         </main>
        
// //         {user && (
// //             <div className="fixed bottom-10 right-6 z-40">
// //                 {/* [FIX] Menambahkan aria-label */}
// //                 <button onClick={() => setShowGroupChat(true)} className="bg-indigo-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center relative hover:scale-110 transition" title="Ruang Diskusi" aria-label="Buka Ruang Diskusi">
// //                     <MessageSquare size={28} />
// //                     <ChatNotificationBadge courseId={courseId} className="-top-1 -right-1" />
// //                 </button>
// //             </div>
// //         )}

// //         {showPersonalChat && <ChatWithFacilitatorModal facilitators={courseFacilitators} onClose={() => setShowPersonalChat(false)} />}
// //         {user && showGroupChat && <CourseGroupChat courseId={courseId} currentUser={user} participants={[]} facilitators={courseFacilitators} onClose={() => setShowGroupChat(false)} isFloating={false} />}
// //       </div>
// //     );
// // }


// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { api, getImageUrl } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';
// import { 
//     Clock, BookOpen, User, CheckCircle, Award, 
//     MessageSquare, PlayCircle, Lock, Calendar, ArrowLeft, 
//     FileText, Share2, Loader2 
// } from 'lucide-react';
// import Link from 'next/link';
// import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';

// export default function CourseDetailPage() {
//     const params = useParams();
//     const router = useRouter();
//     const { user } = useAuth();
//     const rawId = params?.id || params?.courseId;
//     const courseId = Array.isArray(rawId) ? rawId[0] : (rawId as string);

//     const [course, setCourse] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const [showRegisterModal, setShowRegisterModal] = useState(false);
//     const [isEnrolled, setIsEnrolled] = useState(false);
//     const [enrollmentStatus, setEnrollmentStatus] = useState<string>('');

//     useEffect(() => {
//         if (!courseId) return;

//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 // Fetch Data Kursus
//                 const res = await api(`/api/courses/${courseId}`);
//                 const courseData = res.course || res;
//                 setCourse(courseData);

//                 // Cek Status Enroll
//                 if (user) {
//                     try {
//                         const statusRes = await api(`/api/enrollments/check/${courseId}?t=${Date.now()}`);
//                         setIsEnrolled(statusRes.isEnrolled);
//                         setEnrollmentStatus(statusRes.status); 
//                     } catch (e) { setIsEnrolled(false); }
//                 }
//             } catch (err: any) {
//                 console.error("Error loading course:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [courseId, user]);

//     const handleRegisterClick = () => {
//         if (!user) {
//             router.push(`/login?redirect=/courses/${courseId}`);
//             return;
//         }
//         setShowRegisterModal(true); 
//     };

//     const getTotalJP = () => {
//         if (!course?.modules) return 0;
//         let total = 0;
//         course.modules.forEach((m: any) => {
//             if (m.isActive) m.lessons?.forEach((l: any) => { if (l.isActive) total += (l.jp || 0); });
//         });
//         return total;
//     };

//     const getTotalLessons = () => {
//         if (!course?.modules) return 0;
//         return course.modules.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0);
//     };

//     if (loading) return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50">
//             <Loader2 size={40} className="animate-spin text-red-600" />
//         </div>
//     );

//     if (!course) return <div className="text-center py-20">Kursus tidak ditemukan.</div>;

//     return (
//         <div className="min-h-screen bg-gray-50 pb-20 font-sans relative">
            
//             {showRegisterModal && user && (
//                 <CourseRegistrationModal 
//                     courseId={courseId} 
//                     courseTitle={course.title} 
//                     // Pass seluruh data course agar modal bisa akses registrationConfig
//                     courseData={course} 
//                     user={user} 
//                     onClose={() => setShowRegisterModal(false)} 
//                     onSuccess={() => { 
//                         setShowRegisterModal(false); 
//                         alert("Pendaftaran Berhasil Dikirim! Menunggu Verifikasi."); 
//                         window.location.reload(); 
//                     }} 
//                 />
//             )}
            
//             {/* --- [FIX #3] HERO HEADER (RED GRADIENT) --- */}
//             <div className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white overflow-hidden">
//                 <div className="absolute inset-0 mix-blend-overlay opacity-20">
//                     <img 
//                         src={getImageUrl(course.thumbnailUrl)} 
//                         alt="" 
//                         className="w-full h-full object-cover filter blur-sm scale-105"
//                         onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
//                     />
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 to-transparent"></div>

//                 <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
//                     <div className="max-w-4xl">
//                         <Link href="/courses" className="inline-flex items-center gap-2 text-red-100/80 hover:text-white mb-8 transition-colors text-sm font-bold tracking-wide group">
//                             <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/> KEMBALI KE KATALOG
//                         </Link>
                        
//                         <div className="flex items-center gap-3 mb-6">
//                             <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-sm ${course.programType === 'training' ? 'bg-white text-red-700' : 'bg-red-800 text-red-100 border border-red-400'}`}>
//                                 {course.programType === 'training' ? 'DIKLAT RESMI' : 'KURSUS MANDIRI'}
//                             </span>
// //                             {course.category && (
// //                                 <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-red-900/50 text-red-100 border border-red-400/50 uppercase tracking-wider">
// //                                     {course.category}
// //                                 </span>
// //                             )}
// //                              <span className="flex items-center gap-1.5 text-xs font-bold bg-yellow-400/20 text-yellow-300 px-4 py-1.5 rounded-full border border-yellow-400/30">
// //                                 <Award size={16} className="text-yellow-400"/> Sertifikat Tersedia
// //                             </span>
// //                         </div>

// //                         <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight drop-shadow-sm">
// //                             {course.title}
// //                         </h1>
                        
// //                         <p className="text-red-100 text-lg md:text-xl mb-10 leading-relaxed max-w-3xl opacity-90 font-medium">
// //                             {course.description ? course.description.replace(/<[^>]+>/g, '').substring(0, 180) + '...' : 'Pelajari materi ini untuk meningkatkan kompetensi dan keahlian Anda.'}
// //                         </p>

// //                         <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-white p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 inline-flex shadow-lg">
// //                             <div className="flex items-center gap-3 pr-6 border-r border-white/20">
// //                                 <div className="bg-white/20 p-2 rounded-lg"><Clock size={20}/></div>
// //                                 <div><span className="block text-[10px] text-red-200 uppercase">Durasi</span>{course.duration || 60} Menit</div>
// //                             </div>
// //                             <div className="flex items-center gap-3 pr-6 border-r border-white/20">
// //                                 <div className="bg-white/20 p-2 rounded-lg"><BookOpen size={20}/></div>
// //                                 <div><span className="block text-[10px] text-red-200 uppercase">Total JPE</span>{getTotalJP()} JP</div>
// //                             </div>
// //                              <div className="flex items-center gap-3">
// //                                 <div className="bg-white/20 p-2 rounded-lg"><User size={20}/></div>
// //                                 <div><span className="block text-[10px] text-red-200 uppercase">Pengajar</span>{course.facilitatorIds?.length || 0} Orang</div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* --- 2. CONTENT GRID --- */}
// //             <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
// //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                    
// //                     {/* LEFT: DETAIL */}
// //                     <div className="lg:col-span-2 space-y-10">
// //                         {/* Deskripsi */}
// //                         <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40">
// //                             <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3 pb-4 border-b border-gray-100">
// //                                 <span className="bg-red-100 p-2 rounded-xl"><FileText className="text-red-600" size={24}/></span>
// //                                 Tentang Program
// //                             </h3>
// //                             <div className="prose max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: course.description }} />
// //                         </section>

// //                         {/* Kurikulum */}
// //                         <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40">
// //                             <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
// //                                 <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
// //                                     <span className="bg-red-100 p-2 rounded-xl"><BookOpen className="text-red-600" size={24}/></span>
// //                                     Kurikulum
// //                                 </h3>
// //                                 <span className="text-xs font-bold text-gray-500 bg-gray-100 px-4 py-2 rounded-full border">
// //                                     {course.modules?.length || 0} Modul
// //                                 </span>
// //                             </div>
                            
// //                             <div className="space-y-6">
// //                                 {course.modules?.map((mod: any, idx: number) => (
// //                                     <div key={mod._id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm group">
// //                                         <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
// //                                             <h4 className="font-bold text-gray-800 text-lg">Modul {idx + 1}: {mod.title}</h4>
// //                                         </div>
// //                                         <div className="divide-y divide-gray-100 bg-white">
// //                                             {mod.lessons?.map((les: any) => (
// //                                                 <div key={les._id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
// //                                                     <div className="bg-gray-100 p-2 rounded-full shrink-0"><Lock size={20} className="text-gray-400"/></div>
// //                                                     <div className="flex-1"><p className="text-base font-medium text-gray-600">{les.title}</p></div>
// //                                                     <span className="text-xs text-gray-400 font-bold bg-gray-100 px-2 py-1 rounded">{les.duration || 10}m</span>
// //                                                 </div>
// //                                             ))}
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </section>

// //                         {/* Fasilitator */}
// //                         <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40">
// //                             <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3 pb-4 border-b border-gray-100">
// //                                 <span className="bg-red-100 p-2 rounded-xl"><User className="text-red-600" size={24}/></span>
// //                                 Tim Fasilitator
// //                             </h3>
// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                                 {course.facilitatorIds?.map((fac: any) => (
// //                                     <div key={fac._id} className="flex items-center gap-4 p-6 rounded-2xl border border-gray-200 bg-white hover:border-red-200 transition-all">
// //                                         {fac.avatarUrl ? (
// //                                             <img src={getImageUrl(fac.avatarUrl)} className="w-16 h-16 rounded-full object-cover border-4 border-red-50" alt={fac.name}/>
// //                                         ) : (
// //                                             <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-2xl border-4 border-white shadow-sm">
// //                                                 {fac.name?.charAt(0)}
// //                                             </div>
// //                                         )}
// //                                         <div>
// //                                             <h5 className="font-bold text-gray-900 text-lg">{fac.name}</h5>
// //                                             <p className="text-sm text-red-600 font-medium">Fasilitator PMI</p>
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </section>
// //                     </div>

// //                     {/* RIGHT: SIDEBAR */}
// //                     <div className="lg:col-span-1">
// //                         <div className="bg-white rounded-3xl shadow-2xl shadow-red-900/10 border border-gray-200 p-8 sticky top-28">
// //                             <div className="aspect-video rounded-2xl bg-gray-900 overflow-hidden mb-8 relative shadow-lg">
// //                                 <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover opacity-80" alt="Preview"/>
// //                                 <div className="absolute inset-0 flex items-center justify-center">
// //                                     <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/50">
// //                                         <PlayCircle size={36} className="text-white fill-current"/>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className="mb-8 text-center bg-gray-50 p-6 rounded-2xl border border-gray-200">
// //                                 <p className="text-gray-500 text-xs font-extrabold uppercase tracking-widest mb-2">Investasi Program</p>
// //                                 <h2 className="text-4xl font-black text-gray-900">
// //                                     {course.price === 0 ? 'GRATIS' : `Rp ${course.price.toLocaleString('id-ID')}`}
// //                                 </h2>
// //                             </div>

// //                             {/* LOGIKA TOMBOL DAFTAR */}
// //                             <div className="mb-8 space-y-4">
// //                                 {isEnrolled ? (
// //                                     enrollmentStatus === 'active' ? (
// //                                         <Link href={`/courses/${courseId}/play`} className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl">
// //                                             <PlayCircle size={24}/> Lanjutkan Belajar
// //                                         </Link>
// //                                     ) : (
// //                                         <div className="bg-yellow-50 text-yellow-800 p-6 rounded-2xl border-2 border-yellow-200 text-center">
// //                                             <Clock size={32} className="mx-auto mb-2 text-yellow-600"/>
// //                                             <h3 className="font-bold text-lg">Menunggu Verifikasi</h3>
// //                                             <p className="text-sm opacity-90">Pendaftaran sedang diperiksa.</p>
// //                                         </div>
// //                                     )
// //                                 ) : (
// //                                     <button onClick={handleRegisterClick} className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl">
// //                                         <FileText size={24}/> Daftar Sekarang
// //                                     </button>
// //                                 )}
// //                             </div>

// //                             <div className="space-y-5 pt-8 border-t-2 border-gray-100">
// //                                 <h4 className="font-extrabold text-gray-900 text-sm uppercase tracking-wider mb-4">Fasilitas:</h4>
// //                                 <ul className="space-y-4 text-sm text-gray-700 font-medium">
// //                                     <li className="flex gap-3"><CheckCircle className="text-red-500 shrink-0" size={20}/> Total {getTotalJP()} Jam Pelajaran (JPE)</li>
// //                                     <li className="flex gap-3"><CheckCircle className="text-red-500 shrink-0" size={20}/> Sertifikat Resmi PMI</li>
// //                                     <li className="flex gap-3"><CheckCircle className="text-red-500 shrink-0" size={20}/> Konsultasi Fasilitator</li>
// //                                 </ul>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }







// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { api, getImageUrl } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';
// import { 
//     Clock, BookOpen, User, CheckCircle, Award, 
//     MessageSquare, PlayCircle, Lock, Calendar, ArrowLeft, 
//     FileText, Share2, Loader2, AlertTriangle 
// } from 'lucide-react';
// import Link from 'next/link';
// import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';

// export default function CourseDetailPage() {
//     const params = useParams();
//     const router = useRouter();
//     const { user } = useAuth();
//     const rawId = params?.id || params?.courseId;
//     const courseId = Array.isArray(rawId) ? rawId[0] : (rawId as string);

//     const [course, setCourse] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const [showRegisterModal, setShowRegisterModal] = useState(false);
//     const [isEnrolled, setIsEnrolled] = useState(false);
//     const [enrollmentStatus, setEnrollmentStatus] = useState<string>('');

//     // State untuk status pendaftaran (Buka/Tutup)
//     const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

//     useEffect(() => {
//         if (!courseId) return;

//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const res = await api(`/api/courses/${courseId}`);
//                 const courseData = res.course || res;
//                 setCourse(courseData);

//                 // LOGIKA CEK TANGGAL PENDAFTARAN
//                 if (courseData.registrationPeriod) {
//                     const { isForever, startDate, endDate } = courseData.registrationPeriod;
//                     if (!isForever) {
//                         const now = new Date();
//                         const start = startDate ? new Date(startDate) : null;
//                         const end = endDate ? new Date(endDate) : null;
                        
//                         // Set jam end date ke 23:59:59 agar inclusive
//                         if (end) end.setHours(23, 59, 59, 999);

//                         let isOpen = true;
//                         if (start && now < start) isOpen = false;
//                         if (end && now > end) isOpen = false;
//                         setIsRegistrationOpen(isOpen);
//                     } else {
//                         setIsRegistrationOpen(true);
//                     }
//                 }

//                 if (user) {
//                     try {
//                         const statusRes = await api(`/api/enrollments/check/${courseId}?t=${Date.now()}`);
//                         setIsEnrolled(statusRes.isEnrolled);
//                         setEnrollmentStatus(statusRes.status); 
//                     } catch (e) { setIsEnrolled(false); }
//                 }
//             } catch (err: any) {
//                 console.error("Error loading course:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [courseId, user]);

//     const handleRegisterClick = () => {
//         if (!isRegistrationOpen) return; // Prevent click
//         if (!user) {
//             router.push(`/login?redirect=/courses/${courseId}`);
//             return;
//         }
//         setShowRegisterModal(true); 
//     };

//     const getTotalJP = () => {
//         if (!course?.modules) return 0;
//         let total = 0;
//         course.modules.forEach((m: any) => {
//             if (m.isActive) m.lessons?.forEach((l: any) => { if (l.isActive) total += (l.jp || 0); });
//         });
//         return total;
//     };

//     const getTotalLessons = () => {
//         if (!course?.modules) return 0;
//         return course.modules.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0);
//     };

//     if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 size={40} className="animate-spin text-red-600" /></div>;
//     if (!course) return <div className="text-center py-20">Kursus tidak ditemukan.</div>;

//     return (
//         <div className="min-h-screen bg-gray-50 pb-20 font-sans relative">
            
//             {showRegisterModal && user && (
//                 <CourseRegistrationModal 
//                     courseId={courseId} 
//                     courseTitle={course.title} 
//                     courseData={course} 
//                     user={user} 
//                     onClose={() => setShowRegisterModal(false)} 
//                     onSuccess={() => { 
//                         setShowRegisterModal(false); 
//                         alert("Pendaftaran Berhasil Dikirim! Menunggu Verifikasi."); 
//                         window.location.reload(); 
//                     }} 
//                 />
//             )}
            
//             {/* --- 1. HERO HEADER (HEIGHT REDUCED 70%) --- */}
//             <div className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white overflow-hidden">
//                 <div className="absolute inset-0 mix-blend-overlay opacity-20">
//                     {/* [FIX AXE] Menambahkan alt="" karena ini gambar dekoratif background */}
//                     <img 
//                         src={getImageUrl(course.thumbnailUrl)} 
//                         className="w-full h-full object-cover filter blur-sm scale-105" 
//                         alt="" 
//                     />
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 to-transparent"></div>

//                 {/* Padding dikurangi (py-10 lg:py-12) dari sebelumnya py-16 lg:py-24 */}
//                 <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 lg:py-12">
//                     <div className="max-w-4xl">
//                         <Link href="/courses" className="inline-flex items-center gap-2 text-red-100/80 hover:text-white mb-6 transition-colors text-xs font-bold tracking-wide group">
//                             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> KEMBALI KE KATALOG
//                         </Link>
                        
//                         <div className="flex items-center gap-3 mb-4">
//                             <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm ${course.programType === 'training' ? 'bg-white text-red-700' : 'bg-red-800 text-red-100 border border-red-400'}`}>
//                                 {course.programType === 'training' ? 'DIKLAT RESMI' : 'KURSUS MANDIRI'}
//                             </span>
//                              <span className="flex items-center gap-1 text-[10px] font-bold bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full border border-yellow-400/30">
//                                 <Award size={14} className="text-yellow-400"/> Sertifikat Tersedia
//                             </span>
//                         </div>

//                         <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight drop-shadow-sm">{course.title}</h1>
                        
//                         <p className="text-red-100 text-sm md:text-base mb-8 leading-relaxed max-w-3xl opacity-90 font-medium">
//                             {course.description ? course.description.replace(/<[^>]+>/g, '').substring(0, 180) + '...' : 'Pelajari materi ini untuk meningkatkan kompetensi dan keahlian Anda.'}
//                         </p>

//                         <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-white p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 inline-flex shadow-lg">
//                             <div className="flex items-center gap-2 pr-4 border-r border-white/20">
//                                 <Clock size={16}/> <span>Durasi: {course.duration || 60} Menit</span>
//                             </div>
//                             <div className="flex items-center gap-2 pr-4 border-r border-white/20">
//                                 <BookOpen size={16}/> <span>{getTotalJP()} Jam Pelajaran (JPE)</span>
//                             </div>
//                              <div className="flex items-center gap-2">
//                                 <User size={16}/> <span>{course.facilitatorIds?.length || 0} Pengajar</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* --- 2. CONTENT GRID --- */}
//             <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
//                     {/* LEFT: DETAIL */}
//                     <div className="lg:col-span-2 space-y-8">
//                         {/* Deskripsi */}
//                         <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
//                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
//                                 <FileText className="text-red-600" size={20}/> Tentang Program
//                             </h3>
//                             <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: course.description }} />
//                         </section>

//                         {/* Kurikulum */}
//                         <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
//                             <div className="flex items-center justify-between mb-6 pb-2 border-b">
//                                 <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                                     <BookOpen className="text-red-600" size={20}/> Kurikulum
//                                 </h3>
//                                 <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full border">
//                                     {course.modules?.length || 0} Modul
//                                 </span>
//                             </div>
                            
//                             <div className="space-y-4">
//                                 {course.modules?.map((mod: any, idx: number) => (
//                                     <div key={mod._id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
//                                         <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
//                                             <h4 className="font-bold text-gray-800 text-sm">Modul {idx + 1}: {mod.title}</h4>
//                                         </div>
//                                         <div className="divide-y divide-gray-100 bg-white">
//                                             {mod.lessons?.map((les: any) => (
//                                                 <div key={les._id} className="px-5 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors">
//                                                     <div className="bg-gray-100 p-1.5 rounded-full shrink-0"><Lock size={14} className="text-gray-400"/></div>
//                                                     <div className="flex-1"><p className="text-sm font-medium text-gray-600">{les.title}</p></div>
                                                    
//                                                     {/* Ubah Menit jadi JP */}
//                                                     <span className="text-[10px] text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded">
//                                                         {les.jp ? `${les.jp} JP` : '0 JP'}
//                                                     </span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </section>

//                         {/* Fasilitator */}
//                         <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
//                             <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-2">
//                                 <User className="text-red-600" size={20}/> Tim Fasilitator
//                             </h3>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 {course.facilitatorIds?.map((fac: any) => (
//                                     <div key={fac._id} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-red-200 transition-all">
//                                         {fac.avatarUrl ? (
//                                             <img src={getImageUrl(fac.avatarUrl)} className="w-12 h-12 rounded-full object-cover border-2 border-red-50" alt={fac.name}/>
//                                         ) : (
//                                             <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xl border-2 border-white shadow-sm">
//                                                 {fac.name?.charAt(0)}
//                                             </div>
//                                         )}
//                                         <div>
//                                             <h5 className="font-bold text-gray-900 text-sm">{fac.name}</h5>
//                                             <p className="text-xs text-red-600 font-medium">Fasilitator PMI</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </section>
//                     </div>

//                     {/* RIGHT: SIDEBAR */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-2xl shadow-xl shadow-red-900/5 border border-gray-200 p-6 sticky top-24">
//                             <div className="aspect-video rounded-xl bg-gray-900 overflow-hidden mb-6 relative shadow-lg">
//                                 {/* [FIX AXE] Ditambahkan alt yang deskriptif */}
//                                 <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover opacity-80" alt={`Preview Pelatihan ${course.title}`}/>
//                                 <div className="absolute inset-0 flex items-center justify-center">
//                                     <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/50">
//                                         <PlayCircle size={28} className="text-white fill-current"/>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="mb-6 text-center bg-gray-50 p-4 rounded-xl border border-gray-200">
//                                 <p className="text-gray-500 text-[10px] font-extrabold uppercase tracking-widest mb-1">Investasi Program</p>
//                                 <h2 className="text-3xl font-black text-gray-900">
//                                     {course.price === 0 ? 'GRATIS' : `Rp ${course.price.toLocaleString('id-ID')}`}
//                                 </h2>
//                             </div>

//                             {/* LOGIKA TOMBOL DAFTAR (FIX BATAS WAKTU) */}
//                             <div className="mb-6 space-y-3">
//                                 {isEnrolled ? (
//                                     enrollmentStatus === 'active' ? (
//                                         <Link href={`/courses/${courseId}`} className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg">
//                                             <PlayCircle size={20}/> Lanjutkan Belajar
//                                         </Link>
//                                     ) : (
//                                         <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl border-2 border-yellow-200 text-center">
//                                             <Clock size={24} className="mx-auto mb-2 text-yellow-600"/>
//                                             <h3 className="font-bold text-sm">Menunggu Verifikasi</h3>
//                                             <p className="text-xs opacity-90">Pendaftaran sedang diperiksa.</p>
//                                         </div>
//                                     )
//                                 ) : (
//                                     isRegistrationOpen ? (
//                                         <button onClick={handleRegisterClick} className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-red-200">
//                                             <FileText size={20}/> Daftar Sekarang
//                                         </button>
//                                     ) : (
//                                         <button disabled className="w-full bg-gray-300 text-gray-500 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed border border-gray-200">
//                                             <AlertTriangle size={20}/> Pendaftaran Ditutup
//                                         </button>
//                                     )
//                                 )}
                                
//                                 {!isRegistrationOpen && !isEnrolled && (
//                                     <p className="text-xs text-center text-red-500 font-medium bg-red-50 p-2 rounded">
//                                         Batas waktu pendaftaran telah berakhir.
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="space-y-4 pt-6 border-t-2 border-gray-100">
//                                 <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider mb-2">Fasilitas:</h4>
//                                 <ul className="space-y-3 text-xs text-gray-700 font-medium">
//                                     <li className="flex gap-2"><CheckCircle className="text-red-500 shrink-0" size={16}/> Total {getTotalJP()} Jam Pelajaran (JPE)</li>
//                                     <li className="flex gap-2"><CheckCircle className="text-red-500 shrink-0" size={16}/> Sertifikat Resmi PMI</li>
//                                     <li className="flex gap-2"><CheckCircle className="text-red-500 shrink-0" size={16}/> Konsultasi Fasilitator</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api, getImageUrl } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import { 
    Clock, BookOpen, User, CheckCircle, Award, 
    MessageSquare, PlayCircle, Lock, Calendar, ArrowLeft, 
    FileText, Share2, Loader2, AlertTriangle 
} from 'lucide-react';
import Link from 'next/link';
import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const rawId = params?.id || params?.courseId;
    const courseId = Array.isArray(rawId) ? rawId[0] : (rawId as string);

    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [enrollmentStatus, setEnrollmentStatus] = useState<string>('');

    // State untuk status pendaftaran (Buka/Tutup)
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

    useEffect(() => {
        if (!courseId) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await api(`/api/courses/${courseId}`);
                const courseData = res.course || res;
                setCourse(courseData);

                // LOGIKA CEK TANGGAL PENDAFTARAN
                if (courseData.registrationPeriod) {
                    const { isForever, startDate, endDate } = courseData.registrationPeriod;
                    if (!isForever) {
                        const now = new Date();
                        const start = startDate ? new Date(startDate) : null;
                        const end = endDate ? new Date(endDate) : null;
                        
                        // Set jam end date ke 23:59:59 agar inclusive
                        if (end) end.setHours(23, 59, 59, 999);

                        let isOpen = true;
                        if (start && now < start) isOpen = false;
                        if (end && now > end) isOpen = false;
                        setIsRegistrationOpen(isOpen);
                    } else {
                        setIsRegistrationOpen(true);
                    }
                }

                if (user) {
                    try {
                        const statusRes = await api(`/api/enrollments/check/${courseId}?t=${Date.now()}`);
                        setIsEnrolled(statusRes.isEnrolled);
                        setEnrollmentStatus(statusRes.status); 
                    } catch (e) { setIsEnrolled(false); }
                }
            } catch (err: any) {
                console.error("Error loading course:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId, user]);

    const handleRegisterClick = () => {
        if (!isRegistrationOpen) return; // Prevent click
        if (!user) {
            router.push(`/login?redirect=/courses/${courseId}`);
            return;
        }
        setShowRegisterModal(true); 
    };

    const getTotalJP = () => {
        if (!course?.modules) return 0;
        let total = 0;
        course.modules.forEach((m: any) => {
            if (m.isActive) m.lessons?.forEach((l: any) => { if (l.isActive) total += (l.jp || 0); });
        });
        return total;
    };

    const getTotalLessons = () => {
        if (!course?.modules) return 0;
        return course.modules.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 size={40} className="animate-spin text-red-600" /></div>;
    if (!course) return <div className="text-center py-20">Kursus tidak ditemukan.</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans relative">
            
            {showRegisterModal && user && (
                <CourseRegistrationModal 
                    courseId={courseId} 
                    courseTitle={course.title} 
                    courseData={course} 
                    user={user} 
                    onClose={() => setShowRegisterModal(false)} 
                    onSuccess={() => { 
                        setShowRegisterModal(false); 
                        alert("Pendaftaran Berhasil Dikirim! Menunggu Verifikasi."); 
                        window.location.reload(); 
                    }} 
                />
            )}
            
            {/* --- 1. HERO HEADER (HEIGHT REDUCED 70%) --- */}
            <div className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white overflow-hidden">
                <div className="absolute inset-0 mix-blend-overlay opacity-20">
                    {/* [FIX AXE] Menambahkan alt="" karena ini gambar dekoratif background */}
                    <img 
                        src={getImageUrl(course.thumbnailUrl)} 
                        className="w-full h-full object-cover filter blur-sm scale-105" 
                        alt="" 
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 to-transparent"></div>

                {/* Padding dikurangi (py-10 lg:py-12) dari sebelumnya py-16 lg:py-24 */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 lg:py-12">
                    <div className="max-w-4xl">
                        <Link href="/courses" className="inline-flex items-center gap-2 text-red-100/80 hover:text-white mb-6 transition-colors text-xs font-bold tracking-wide group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> KEMBALI KE KATALOG
                        </Link>
                        
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm ${course.programType === 'training' ? 'bg-white text-red-700' : 'bg-red-800 text-red-100 border border-red-400'}`}>
                                {course.programType === 'training' ? 'DIKLAT RESMI' : 'KURSUS MANDIRI'}
                            </span>
                             <span className="flex items-center gap-1 text-[10px] font-bold bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full border border-yellow-400/30">
                                <Award size={14} className="text-yellow-400"/> Sertifikat Tersedia
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight drop-shadow-sm">{course.title}</h1>
                        
                        <p className="text-red-100 text-sm md:text-base mb-8 leading-relaxed max-w-3xl opacity-90 font-medium">
                            {course.description ? course.description.replace(/<[^>]+>/g, '').substring(0, 180) + '...' : 'Pelajari materi ini untuk meningkatkan kompetensi dan keahlian Anda.'}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-white p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 inline-flex shadow-lg">
                            <div className="flex items-center gap-2 pr-4 border-r border-white/20">
                                <Clock size={16}/> <span>Durasi: {course.duration || 60} Menit</span>
                            </div>
                            <div className="flex items-center gap-2 pr-4 border-r border-white/20">
                                <BookOpen size={16}/> <span>{getTotalJP()} Jam Pelajaran (JPE)</span>
                            </div>
                             <div className="flex items-center gap-2">
                                <User size={16}/> <span>{course.facilitatorIds?.length || 0} Pengajar</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- 2. CONTENT GRID --- */}
            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* LEFT: DETAIL */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Deskripsi */}
                        <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
                                <FileText className="text-red-600" size={20}/> Tentang Program
                            </h3>
                            <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: course.description }} />
                        </section>

                        {/* Kurikulum */}
                        <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-6 pb-2 border-b">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <BookOpen className="text-red-600" size={20}/> Kurikulum
                                </h3>
                                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full border">
                                    {course.modules?.length || 0} Modul
                                </span>
                            </div>
                            
                            <div className="space-y-4">
                                {course.modules?.map((mod: any, idx: number) => (
                                    <div key={mod._id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
                                        <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                                            <h4 className="font-bold text-gray-800 text-sm">Modul {idx + 1}: {mod.title}</h4>
                                        </div>
                                        <div className="divide-y divide-gray-100 bg-white">
                                            {mod.lessons?.map((les: any) => (
                                                <div key={les._id} className="px-5 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                                                    <div className="bg-gray-100 p-1.5 rounded-full shrink-0"><Lock size={14} className="text-gray-400"/></div>
                                                    <div className="flex-1"><p className="text-sm font-medium text-gray-600">{les.title}</p></div>
                                                    
                                                    {/* Ubah Menit jadi JP */}
                                                    <span className="text-[10px] text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded">
                                                        {les.jp ? `${les.jp} JP` : '0 JP'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Fasilitator */}
                        <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-2">
                                <User className="text-red-600" size={20}/> Tim Fasilitator
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.facilitatorIds?.map((fac: any) => (
                                    <div key={fac._id} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-red-200 transition-all">
                                        {fac.avatarUrl ? (
                                            <img src={getImageUrl(fac.avatarUrl)} className="w-12 h-12 rounded-full object-cover border-2 border-red-50" alt={fac.name}/>
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xl border-2 border-white shadow-sm">
                                                {fac.name?.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <h5 className="font-bold text-gray-900 text-sm">{fac.name}</h5>
                                            <p className="text-xs text-red-600 font-medium">Fasilitator PMI</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT: SIDEBAR */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl shadow-red-900/5 border border-gray-200 p-6 sticky top-24">
                            <div className="aspect-video rounded-xl bg-gray-900 overflow-hidden mb-6 relative shadow-lg">
                                {/* [FIX AXE] Ditambahkan alt yang deskriptif */}
                                <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover opacity-80" alt={`Preview Pelatihan ${course.title}`}/>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/50">
                                        <PlayCircle size={28} className="text-white fill-current"/>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 text-center bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <p className="text-gray-500 text-[10px] font-extrabold uppercase tracking-widest mb-1">Investasi Program</p>
                                <h2 className="text-3xl font-black text-gray-900">
                                    {course.price === 0 ? 'GRATIS' : `Rp ${course.price.toLocaleString('id-ID')}`}
                                </h2>
                            </div>

                            {/* LOGIKA TOMBOL DAFTAR (FIX BATAS WAKTU) */}
                            <div className="mb-6 space-y-3">
                                {isEnrolled ? (
                                    enrollmentStatus === 'active' ? (
                                        <Link href={`/courses/${courseId}/play`} className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg">
                                            <PlayCircle size={20}/> Lanjutkan Belajar
                                        </Link>
                                    ) : (
                                        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl border-2 border-yellow-200 text-center">
                                            <Clock size={24} className="mx-auto mb-2 text-yellow-600"/>
                                            <h3 className="font-bold text-sm">Menunggu Verifikasi</h3>
                                            <p className="text-xs opacity-90">Pendaftaran sedang diperiksa.</p>
                                        </div>
                                    )
                                ) : (
                                    isRegistrationOpen ? (
                                        <button onClick={handleRegisterClick} className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-red-200">
                                            <FileText size={20}/> Daftar Sekarang
                                        </button>
                                    ) : (
                                        <button disabled className="w-full bg-gray-300 text-gray-500 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed border border-gray-200">
                                            <AlertTriangle size={20}/> Pendaftaran Ditutup
                                        </button>
                                    )
                                )}
                                
                                {!isRegistrationOpen && !isEnrolled && (
                                    <p className="text-xs text-center text-red-500 font-medium bg-red-50 p-2 rounded">
                                        Batas waktu pendaftaran telah berakhir.
                                    </p>
                                )}
                            </div>

                            <div className="space-y-4 pt-6 border-t-2 border-gray-100">
                                <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider mb-2">Fasilitas:</h4>
                                <ul className="space-y-3 text-xs text-gray-700 font-medium">
                                    <li className="flex gap-2"><CheckCircle className="text-red-500 shrink-0" size={16}/> Total {getTotalJP()} Jam Pelajaran (JPE)</li>
                                    <li className="flex gap-2"><CheckCircle className="text-red-500 shrink-0" size={16}/> Sertifikat Resmi PMI</li>
                                    <li className="flex gap-2"><CheckCircle className="text-red-500 shrink-0" size={16}/> Konsultasi Fasilitator</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
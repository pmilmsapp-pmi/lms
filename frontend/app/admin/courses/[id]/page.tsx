// // // 'use client';

// // // import { useEffect, useState, useRef, useMemo } from 'react';
// // // import { useParams, useRouter } from 'next/navigation';
// // // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // import Protected from '@/components/Protected';
// // // import CompetencyForm from '@/components/admin/CompetencyForm';
// // // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // // import {
// // //     Calendar, School, RefreshCw, LogOut, CheckCircle2, Video,
// // //     Link as LinkIcon, Users, Eye, MessageSquare, MessageCircle, X, Send, MoreHorizontal, ExternalLink,
// // //     Search, User as UserIcon, Mail, Smile, Trophy, Award, Plus, Trash2, Clock, Paperclip, FileText, Download,
// // //     FileBadge, MapPin, UserCheck, Hash, Info, UserX, BarChart3, LayoutDashboard, BookOpen, AlertCircle,
// // //     ChevronDown, ChevronRight, Check, XCircle
// // // } from 'lucide-react';

// // // import dynamic from 'next/dynamic';
// // // import 'react-quill/dist/quill.snow.css'; 

// // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // //     ssr: false,
// // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // });

// // // // --- HELPER ---
// // // const getRomanMonth = (date: Date) => {
// // //     const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
// // //     return romans[date.getMonth()];
// // // };

// // // const generateDefaultCertFormat = () => {
// // //     const now = new Date();
// // //     const dd = String(now.getDate()).padStart(2, '0');
// // //     const mm = String(now.getMonth() + 1).padStart(2, '0');
// // //     const yyyy = now.getFullYear();
// // //     const roman = getRomanMonth(now);
// // //     return `00{NO}/DIKLAT/${dd}.${mm}.${yyyy}/${roman}/${yyyy}`;
// // // };

// // // // --- CHAT COMPONENTS ---
// // // function PersonalChatModal({ student, onClose }: any) {
// // //     const [messages, setMessages] = useState<any[]>([]);
// // //     const [newMessage, setNewMessage] = useState('');
// // //     const [showEmoji, setShowEmoji] = useState(false);
// // //     const messagesEndRef = useRef<HTMLDivElement>(null);
// // //     const emojis = ["😀", "😂", "🥰", "😎", "🤔", "👍", "👎", "❤️", "🔥", "🎉", "📚", "✅", "💡", "🤝", "🙏", "💪"];

// // //     const targetId = student.user?._id || student._id;
// // //     const targetName = student.user?.name || student.name || 'User';
// // //     const targetAvatar = student.user?.avatarUrl || student.avatarUrl;
// // //     const targetEmail = student.user?.email || student.email || '-';

// // //     useEffect(() => {
// // //         if(targetId) loadHistory();
// // //         const interval = setInterval(() => { if(targetId) loadHistory(); }, 5000);
// // //         return () => clearInterval(interval);
// // //     }, [targetId]);

// // //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// // //     const loadHistory = async () => {
// // //         try {
// // //             const res = await api(`/api/chat/${targetId}?t=${Date.now()}`);
// // //             setMessages(res.messages || []);
// // //         } catch (e) { console.error(e); }
// // //     };

// // //     const handleSend = async (e: React.FormEvent) => {
// // //         e.preventDefault();
// // //         if (!newMessage.trim()) return;
// // //         const tempMsg = { _id: Date.now(), sender: 'me', message: newMessage, createdAt: new Date().toISOString() };
// // //         setMessages(prev => [...prev, tempMsg]);
// // //         const msgToSend = newMessage;
// // //         setNewMessage('');
// // //         setShowEmoji(false);
// // //         try {
// // //             await api('/api/chat/send', { method: 'POST', body: { recipientId: targetId, message: msgToSend } });
// // //             loadHistory();
// // //         } catch (error: any) { alert("Gagal: " + error.message); }
// // //     };

// // //     return (
// // //         <div className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4">
// // //             <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
// // //                 <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
// // //                     <div className="flex items-center gap-3">
// // //                         <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold border-2 border-white/30 overflow-hidden">
// // //                             {targetAvatar ? <img src={getImageUrl(targetAvatar)} alt={targetName} className="w-full h-full object-cover"/> : (targetName.charAt(0) || 'U')}
// // //                         </div>
// // //                         <div><h3 className="font-bold text-sm leading-tight">{targetName}</h3><p className="text-[10px] opacity-80">{targetEmail}</p></div>
// // //                     </div>
// // //                     <button type="button" onClick={onClose} className="hover:bg-blue-700 p-2 rounded-full font-bold" aria-label="Tutup Chat" title="Tutup Chat"><X size={18}/></button>
// // //                 </div>
// // //                 <div className="flex-1 p-4 bg-gray-100 overflow-y-auto flex flex-col gap-3 relative">
// // //                     {messages.length === 0 && <div className="text-center text-gray-400 text-xs mt-10">Belum ada pesan.</div>}
// // //                     {messages.map((msg: any, idx: number) => (
// // //                         <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
// // //                             <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${msg.sender === 'me' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800'}`}><p>{msg.message}</p></div>
// // //                         </div>
// // //                     ))}
// // //                     <div ref={messagesEndRef}/>
// // //                     {showEmoji && (<div className="absolute bottom-2 left-2 bg-white border shadow-xl rounded-xl p-3 grid grid-cols-4 gap-2 z-20 w-64 animate-in zoom-in-95">{emojis.map(e => (<button type="button" key={e} onClick={() => { setNewMessage(prev => prev + e); }} className="text-2xl hover:bg-gray-100 p-2 rounded transition" aria-label={`Pilih Emoji ${e}`} title={`Emoji ${e}`}>{e}</button>))}</div>)}
// // //                 </div>
// // //                 <div className="p-3 bg-white border-t flex gap-2 items-center relative">
// // //                     <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="text-gray-400 hover:text-yellow-500 transition-colors" aria-label="Buka Emoticon" title="Emoticon"><Smile size={24}/></button>
// // //                     <form onSubmit={handleSend} className="flex-1 flex gap-2">
// // //                         <input className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis pesan..." value={newMessage} onChange={e => setNewMessage(e.target.value)} aria-label="Input Pesan Chat" />
// // //                         <button type="submit" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700" aria-label="Kirim Pesan" title="Kirim"><Send size={18}/></button>
// // //                     </form>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // // // --- MAIN PAGE ---
// // // export default function AdminCourseDetailPage() {
// // //     const params = useParams();
// // //     const courseId = params?.id as string;
// // //     const router = useRouter();
// // //     const fileInputRef = useRef<HTMLInputElement>(null);

// // //     // --- STATE UTAMA ---
// // //     const [activeTab, setActiveTab] = useState<'content' | 'operator'>('content');
// // //     const [course, setCourse] = useState<any>(null);
// // //     const [loading, setLoading] = useState(true);
// // //     const [isBrowser, setIsBrowser] = useState(false);
// // //     const [isUploadingCover, setIsUploadingCover] = useState(false);
// // //     const [currentUserRole, setCurrentUserRole] = useState('');

// // //     // --- OPERATOR DASHBOARD STATE ---
// // //     const [participants, setParticipants] = useState<any[]>([]);
// // //     const [loadingParticipants, setLoadingParticipants] = useState(false);
// // //     const [participantFilter, setParticipantFilter] = useState('');
// // //     const [actionOptions, setActionOptions] = useState<any[]>([]);
// // //     const [selectedActionId, setSelectedActionId] = useState<string>('');
// // //     const [showStudentDetailModal, setShowStudentDetailModal] = useState(false); 
// // //     const [studentDetail, setStudentDetail] = useState<any>(null);
// // //     const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);

// // //     // --- CONTENT EDITOR STATE ---
// // //     const [showModuleForm, setShowModuleForm] = useState(false);
// // //     const [modTitle, setModTitle] = useState('');
// // //     const [modIsMandatory, setModIsMandatory] = useState(true);
// // //     const [modFacilitatorId, setModFacilitatorId] = useState('');
// // //     const [modJp, setModJp] = useState(0);
// // //     const [modSchedule, setModSchedule] = useState('');
// // //     const [editingModId, setEditingModId] = useState<string | null>(null);
// // //     const [activeModId, setActiveModId] = useState<string | null>(null);
// // //     const [editingLesId, setEditingLesId] = useState<string | null>(null);
// // //     const [lesTitle, setLesTitle] = useState('');
// // //     const [lesType, setLesType] = useState('lesson');
// // //     const [lesContent, setLesContent] = useState('');
// // //     const [lesIsMandatory, setLesIsMandatory] = useState(true);
// // //     const [lesJp, setLesJp] = useState(0);
// // //     const [lesSchedule, setLesSchedule] = useState('');
// // //     const [lesFacilitatorId, setLesFacilitatorId] = useState('');
// // //     const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // //     const [uploading, setUploading] = useState(false);
// // //     const [quizDuration, setQuizDuration] = useState(10);
// // //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// // //     const [pollQuestion, setPollQuestion] = useState('');
// // //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
// // //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// // //     const [useEssayTimer, setUseEssayTimer] = useState(false);
// // //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// // //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// // //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// // //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);
    
// // //     // --- CERTIFICATE & TEAM STATE ---
// // //     const [facilitators, setFacilitators] = useState<any[]>([]);
// // //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>([]);
// // //     const [activeTeam, setActiveTeam] = useState<any[]>([]);
// // //     const [competencies, setCompetencies] = useState<any[]>([]);
// // //     const [includeCompetencies, setIncludeCompetencies] = useState(true);
// // //     const [certConfig, setCertConfig] = useState<any>(null);
// // //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// // //     const [isSavingCert, setIsSavingCert] = useState(false);
// // //     const [searchFacilitator, setSearchFacilitator] = useState('');

// // //     const quillModules = useMemo(() => ({ toolbar: { container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'image', 'video'], [{ 'color': [] }, { 'background': [] }], ['clean']] } }), []);

// // //     useEffect(() => {
// // //         setIsBrowser(true);
// // //         if(typeof window !== 'undefined'){
// // //             const userStr = localStorage.getItem('user');
// // //             if (userStr) {
// // //                 const user = JSON.parse(userStr);
// // //                 setCurrentUserRole(user.role);
// // //             }
// // //             const savedToken = localStorage.getItem('google_class_token');
// // //             if(savedToken) setGoogleToken(savedToken);
// // //         }
// // //         if (courseId) load();
// // //     }, [courseId]);

// // //     // LOAD UTAMA
// // //     const load = async () => { 
// // //         try {
// // //             const data = await api(`/api/courses/${courseId}?t=${Date.now()}`);
// // //             const courseData = data.course || data;
// // //             setCourse(courseData);
            
// // //             const opts: any[] = [];
// // //             courseData.modules?.forEach((m: any) => {
// // //                 m.lessons?.forEach((l: any) => {
// // //                     let label = l.title;
// // //                     if(l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
// // //                     else if(l.type === 'essay') label = `📝 Esai: ${l.title}`;
// // //                     else if(l.type === 'upload_doc') label = `📤 Upload: ${l.title}`;
// // //                     opts.push({ id: l._id, label, type: l.type });
// // //                 });
// // //             });
// // //             setActionOptions(opts);

// // //             if (courseData.facilitatorIds) setSelectedFacilitatorIds(courseData.facilitatorIds.map((f: any) => (typeof f === 'object' && f !== null) ? f._id : f));
// // //             if (courseData.competencies) setCompetencies(courseData.competencies);
// // //             if (courseData.includeCompetenciesInCertificate !== undefined) setIncludeCompetencies(courseData.includeCompetenciesInCertificate);
// // //             let config = courseData.certificateConfig || {};
// // //             if (!config.certificateNumber) config = { ...config, certificateNumber: generateDefaultCertFormat() };
// // //             setCertConfig(config);

// // //             const usersRes = await api('/api/admin/users');
// // //             if (usersRes.users) {
// // //                 const facs = usersRes.users.filter((u: any) => u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN');
// // //                 setFacilitators(facs);
// // //                 const team = facs.filter((u: any) => courseData.facilitatorIds?.some((f: any) => (f._id || f) === u._id) || u.role === 'SUPER_ADMIN');
// // //                 setActiveTeam(team);
// // //             }
// // //         } catch (e) { console.error(e); } finally { setLoading(false); }
// // //     };

// // //     // --- OPERATOR LOGIC ---
// // //     const fetchParticipants = async () => {
// // //         setLoadingParticipants(true);
// // //         try {
// // //             const res = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`);
// // //             setParticipants(res.participants || []);
// // //         } catch (error) { console.error("Gagal load peserta"); } finally { setLoadingParticipants(false); }
// // //     };

// // //     useEffect(() => { if(activeTab === 'operator') fetchParticipants(); }, [activeTab]);

// // //     const handleVerifyEnrollment = async (enrollmentId: string, action: 'approve' | 'reject', studentName: string) => {
// // //         if (!confirm(`Apakah Anda yakin ingin ${action === 'approve' ? 'MENYETUJUI' : 'MENOLAK'} pendaftaran ${studentName}?`)) return;
// // //         try {
// // //             await api('/api/courses/verify-enrollment', { method: 'POST', body: { enrollmentId, action } });
// // //             alert(`Pendaftaran berhasil ${action === 'approve' ? 'disetujui' : 'ditolak'}.`);
// // //             fetchParticipants();
// // //         } catch (e: any) { alert("Gagal: " + e.message); }
// // //     };

// // //     const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => { 
// // //         if (!selectedActionId) return alert("Pilih Materi/Kuis di dropdown atas dulu!"); 
// // //         const participantObj = participants.find(p => (p.user?._id === studentId) || (p.user === studentId));
// // //         const realUserId = participantObj?.user?._id || participantObj?.user;

// // //         if (action === 'pass') { 
// // //             if(!confirm(`Luluskan peserta ini?`)) return; 
// // //             try { 
// // //                 await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId: realUserId, lessonId: selectedActionId, courseId } }); 
// // //                 setParticipants(prev => prev.map(p => {
// // //                      const uId = p.user?._id || p.user;
// // //                      if(uId === studentId || uId === realUserId) {
// // //                          const currentCompleted = p.completedLessons || [];
// // //                          if (!currentCompleted.includes(selectedActionId)) {
// // //                              const totalLessons = course?.modules?.reduce((acc:any, m:any) => acc + m.lessons.length, 0) || 1;
// // //                              const newCompleted = [...currentCompleted, selectedActionId];
// // //                              const newProgress = Math.round((newCompleted.length / totalLessons) * 100);
// // //                              return { ...p, completedLessons: newCompleted, progress: newProgress > 100 ? 100 : newProgress, isCompleted: newProgress >= 100 };
// // //                          }
// // //                      }
// // //                      return p;
// // //                 }));
// // //             } catch(e:any) { alert(e.message); } 
// // //         } else if (action === 'reset') { 
// // //             if(!confirm(`Reset progress?`)) return; 
// // //             try { 
// // //                 await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId: realUserId, quizId: selectedActionId } }); 
// // //                 alert("Reset berhasil!"); 
// // //                 fetchParticipants();
// // //             } catch(e:any) { alert(e.message); } 
// // //         }
// // //     };

// // //     const handleRejectParticipant = async (enrollmentId: string, studentName: string) => {
// // //         if (!confirm(`TOLAK / HAPUS pendaftaran "${studentName}"?`)) return;
// // //         try { await api(`/api/enrollments/${enrollmentId}`, { method: 'DELETE' }); alert(`Berhasil dihapus.`); fetchParticipants(); } catch (e: any) { alert("Gagal: " + e.message); }
// // //     };

// // //     // --- CONTENT EDITOR LOGIC ---
// // //     const handleSaveModule = async () => { if (!modTitle.trim()) return alert("Judul wajib"); const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: modFacilitatorId || null, jp: modJp, scheduleDate: modSchedule || null }; try { if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); resetModuleForm(); load(); } catch(e: any) { alert(e.message); } };
// // //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
// // //     const resetModuleForm = () => { setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false); };
// // //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); setCourse((prev: any) => ({ ...prev, isPublished: newStatus })); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); load(); } } catch (e: any) { alert(e.message); } };
    
// // //     // Helper Editor
// // //     const getFacilitatorName = (data: any) => { if (!data) return null; if (typeof data === 'object' && data.name) return data.name; const found = facilitators.find(f => f._id === data || f.id === data); return found ? found.name : 'Unknown'; };
// // //     const resetLessonForm = () => { setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesIsMandatory(true); setLesContent(''); setSelectedFile(null); setLesJp(0); setLesFacilitatorId(''); setLesSchedule(''); setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(10); setPollQuestion(''); setPollOptions(['', '']); setSelectedClassroom(null); setEssayQuestions(['']); setUseEssayTimer(false); };
// // //     const handleAddNewContent = (modId: string) => { resetLessonForm(); setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); };
    
// // //     const handleSaveLesson = async (modId: string) => {
// // //         if (!lesTitle.trim()) { alert("Judul wajib"); return; }
// // //         let fileUrl = '';
// // //         if (selectedFile) { try { setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); const res = await apiUpload('/api/upload', fd); fileUrl = res.url || res.file?.url || res.imageUrl; } catch (err) { alert("Gagal upload"); return; } finally { setUploading(false); } }
// // //         else if (editingLesId) { const mod = course?.modules.find((m: any) => m._id === modId); const les = mod?.lessons.find((l: any) => l._id === editingLesId); if (les) fileUrl = les.fileUrl; }
        
// // //         const body: any = { 
// // //             title: lesTitle, 
// // //             type: lesType, 
// // //             isActive: true, 
// // //             isMandatory: lesIsMandatory, 
// // //             jp: lesJp, 
// // //             facilitatorId: lesFacilitatorId || null, 
// // //             scheduleDate: lesSchedule || null, 
// // //             questions: (lesType === 'quiz') ? questions : undefined, 
// // //             quizDuration: (lesType === 'quiz' || (lesType === 'essay' && useEssayTimer)) ? quizDuration : undefined, 
// // //             pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, 
// // //             pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, 
// // //             classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined 
// // //         };
        
// // //         if (lesType === 'essay') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; }
// // //         if(fileUrl) body.fileUrl = fileUrl; if(lesType === 'video_url') body.videoUrl = lesContent; else if(lesType === 'virtual_class') body.meetingLink = lesContent; else if(lesType === 'upload_doc' || lesType === 'lesson') body.content = lesContent;
// // //         try { if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); resetLessonForm(); load(); } catch(e:any) { alert(e.message); }
// // //     };

// // //     const startEditLesson = (modId: string, les: any) => {
// // //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title);
// // //         // Load detail lesson
// // //         if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { setLesType('essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); if(les.quizDuration) { setUseEssayTimer(true); setQuizDuration(les.quizDuration); } else { setUseEssayTimer(false); } } else { setLesType(les.type); }
// // //         setLesIsMandatory(les.isMandatory !== false); 
// // //         setLesJp(les.jp || 0); 
// // //         setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); 
// // //         setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || ''));

// // //         if (les.type === 'video_url') setLesContent(les.videoUrl||''); else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); else if (les.type !== 'essay') setLesContent(les.content||'');
// // //         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(les.quizDuration||10); }
// // //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); }
// // //         // LOAD GOOGLE CLASSROOM DATA
// // //         if (les.type === 'google_classroom') { 
// // //             if(googleToken && classroomCourses.length === 0) fetchClassroomCourses(); 
// // //             if(les.classroomData) setSelectedClassroom(les.classroomData); 
// // //         } else { setSelectedClassroom(null); }
        
// // //         setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150);
// // //     };

// // //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); load(); };
// // //     const addPollOption = () => setPollOptions([...pollOptions, '']); const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); };
// // //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); };
// // //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); const updateEssay = (idx: number, val: string) => { const newQ = [...essayQuestions]; newQ[idx] = val; setEssayQuestions(newQ); }; const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };
// // //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); const width = 500, height = 600; const left = (window.screen.width - width) / 2; const top = (window.screen.height - height) / 2; window.open(url, 'GoogleAuthPopup', `width=${width},height=${height},top=${top},left=${left}`); } catch (e) { alert("Gagal Auth Google"); } };
// // //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } };
// // //     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const res = await fetch(`http://localhost:4000/api/classroom/courses`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'x-google-token': token } }); if (res.status === 401) { localStorage.removeItem('google_class_token'); setGoogleToken(null); return; } const data = await res.json(); if (data.courses) setClassroomCourses(data.courses); } catch (e) { console.error(e); } finally { setIsCheckingGoogle(false); } };

// // //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } setCourse(newCourse); try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); } catch (err) { load(); } };
// // //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); const res = await apiUpload(`/api/upload/course/${courseId}/cover`, formData); setCourse((prev: any) => ({ ...prev, thumbnailUrl: res.imageUrl || res.url })); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// // //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// // //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };
// // //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); };
// // //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); load(); } catch (e: any) { alert(e.message); } };

// // //     if (loading || !isBrowser) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div></div>;

// // //     // --- RENDER HELPERS ---
// // //     const pendingParticipants = participants.filter(p => p.status === 'pending');
// // //     const activeParticipants = participants.filter(p => p.status !== 'pending');
// // //     const totalStudents = participants.length;
// // //     const passedStudents = participants.filter(p => p.progress === 100 || p.isCompleted).length;
// // //     const activeStats = activeParticipants.length;

// // //     return (
// // //         <Protected roles={["FACILITATOR", "SUPER_ADMIN"]}>
// // //             <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-32">
                
// // //                 {/* --- HEADER & NAVIGATION --- */}
// // //                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
// // //                     <div>
// // //                         <h1 className="text-3xl font-bold text-gray-900">{course?.title}</h1>
// // //                         <p className="text-gray-500 mt-1 flex items-center gap-2">
// // //                             <span className={`px-2 py-0.5 rounded text-xs font-bold ${course?.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{course?.isPublished ? 'PUBLISHED' : 'DRAFT'}</span>
// // //                             • {course?.modules?.length || 0} Modul
// // //                         </p>
// // //                     </div>
// // //                     <div className="flex gap-2">
// // //                         <button type="button" onClick={() => setActiveTab('content')} className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${activeTab === 'content' ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`} aria-label="Buka Editor Materi" title="Editor Materi">
// // //                             <BookOpen size={18} aria-hidden="true"/> Editor Materi
// // //                         </button>
// // //                         <button type="button" onClick={() => setActiveTab('operator')} className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${activeTab === 'operator' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`} aria-label="Buka Dashboard Operator" title="Dashboard Operator">
// // //                             <LayoutDashboard size={18} aria-hidden="true"/> Dashboard Operator
// // //                         </button>
// // //                     </div>
// // //                 </div>

// // //                 {/* --- TAB: EDITOR MATERI (RESTORED FULL VERSION WITH HEADER INFO) --- */}
// // //                 {activeTab === 'content' && (
// // //                     <div className="animate-in fade-in duration-300 space-y-8">
// // //                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //                             {/* KIRI: Cover & Info & Tim Fasilitator */}
// // //                             <div className="md:col-span-1 space-y-6">
// // //                                 <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">{course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover Kursus" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Ganti Cover" title="Ganti Cover">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Input File Cover"/></div></div>
                                
// // //                                 {/* [RESTORED] TIM FASILITATOR */}
// // //                                 {currentUserRole === 'SUPER_ADMIN' && (<div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col"><div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" title="Simpan Tim" aria-label="Simpan Tim">Simpan</button></div><div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">{facilitators.map((user: any) => (<label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}><input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih fasilitator ${user.name}`} title={`Pilih ${user.name}`} /><div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div></label>))}</div><input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" title="Cari Fasilitator" /></div>)}
// // //                             </div>
                            
// // //                             {/* KANAN: Modul & Lesson List */}
// // //                             <div className="md:col-span-2 space-y-6">
// // //                                 <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">Struktur Modul</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 flex items-center gap-2" aria-label="Tambah Modul Baru" title="Tambah Modul">+ Tambah Modul</button></div>
                                
// // //                                 {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Judul Modul"/><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" aria-label="Jam Pelajaran"/></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih Fasilitator"><option value="">-- Pilih Fasilitator --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal Pelaksanaan Modul" /></div></div><div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetModuleForm} className="text-sm text-gray-500 font-bold" aria-label="Batal Simpan Modul">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold" aria-label="Simpan Modul">Simpan</button></div></form>)}
                                
// // //                                 <DragDropContext onDragEnd={onDragEnd}><Droppable droppableId="all-modules" type="module">{(provided) => (<div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">{course?.modules?.map((m: any, idx: number) => (<Draggable key={m._id} draggableId={m._id} index={idx}>{(provided) => (<div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-xl overflow-hidden bg-white shadow-sm"><div className="bg-gray-50 p-3 flex justify-between items-center" {...provided.dragHandleProps}>
// // //                                     <div className="flex items-center gap-3"><span className="cursor-grab text-gray-400" aria-label="Geser Modul">☰</span><div><span className="font-bold text-gray-700">{m.title}</span><div className="flex gap-2 text-[10px] mt-1 text-gray-500 font-medium">
// // //                                         <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">{m.jp} JP</span>
// // //                                         {m.facilitatorId && <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100 flex items-center gap-1">👤 {getFacilitatorName(m.facilitatorId)}</span>}
// // //                                         {m.scheduleDate && <span className="bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded border border-yellow-100 flex items-center gap-1">📅 {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // //                                     </div></div></div>
// // //                                     <div className="flex gap-2">
// // //                                         <button type="button" onClick={() => startEditModule(m)} className="text-xs text-blue-600 font-bold" aria-label="Edit Modul">Edit</button>
// // //                                         {/* [RESTORED] TOGGLE BUTTON */}
// // //                                         <button type="button" onClick={() => toggleStatus(m._id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${m.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label={m.isActive ? "Non-aktifkan Modul" : "Aktifkan Modul"}>
// // //                                             <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${m.isActive ? 'translate-x-4' : 'translate-x-1'}`} />
// // //                                         </button>
// // //                                     </div></div>
                                
// // //                                 <Droppable droppableId={m._id} type="lesson">{(provided) => (<div ref={provided.innerRef} {...provided.droppableProps} className="p-3 space-y-2">{m.lessons?.map((l: any, lIdx: number) => (<Draggable key={l._id} draggableId={l._id} index={lIdx}>{(provided) => (
// // //                                     // [FIX] LIST LESSON ITEM (LENGKAP SESUAI GAMBAR 1)
// // //                                     <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-2 bg-white border rounded hover:bg-gray-50">
// // //                                         <div className="flex gap-2 items-center">
// // //                                             <span className="cursor-grab text-gray-400" aria-hidden="true">::</span>
// // //                                             <span className="text-lg" aria-hidden="true">{l.type === 'video_url' ? '🎞️' : l.type === 'quiz' ? '📝' : l.type === 'essay' ? '✍️' : '📄'}</span>
// // //                                             <div>
// // //                                                 <p className="text-sm font-bold text-gray-800">{l.title}</p>
// // //                                                 <div className="flex gap-2 items-center flex-wrap mt-0.5">
// // //                                                     <span className="text-[10px] text-gray-500 uppercase font-bold">{l.type}</span>
// // //                                                     {l.jp > 0 && <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 rounded border border-blue-100 font-medium">{l.jp} JP</span>}
// // //                                                     {l.isMandatory ? <span className="text-[10px] bg-red-50 text-red-700 px-1.5 rounded border border-red-100 font-medium">Wajib</span> : <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 rounded border font-medium">Opsional</span>}
// // //                                                     {l.facilitatorId && <span className="text-[10px] text-purple-600 flex items-center gap-1 font-medium">👤 {getFacilitatorName(l.facilitatorId)}</span>}
// // //                                                     {l.scheduleDate && <span className="text-[10px] text-blue-600 flex items-center gap-1 font-medium">📅 {new Date(l.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // //                                                 </div>
// // //                                             </div>
// // //                                         </div>
// // //                                         <div className="flex gap-2 items-center">
// // //                                             <button type="button" onClick={() => startEditLesson(m._id, l)} className="text-blue-500 text-xs font-bold" aria-label="Edit Materi">Edit</button>
// // //                                             <button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-red-500 text-xs font-bold" aria-label="Hapus Materi">Hapus</button>
// // //                                             {/* [RESTORED] TOGGLE BUTTON */}
// // //                                             <button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${l.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label={l.isActive ? "Non-aktifkan Lesson" : "Aktifkan Lesson"}>
// // //                                                 <span className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${l.isActive ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
// // //                                             </button>
// // //                                         </div>
// // //                                     </div>
// // //                                 )}</Draggable>))}{provided.placeholder}
                                
// // //                                 {activeModId === m._id ? (
// // //                                     <div id={`form-${m._id}`} className="bg-blue-50 p-4 rounded border border-blue-200 mt-2 space-y-3">
// // //                                         {/* [FIX] FORM LESSON DENGAN URUTAN SESUAI GAMBAR 2 */}
// // //                                         <div className="grid grid-cols-12 gap-2">
// // //                                             <div className="col-span-4"><select className="w-full p-2 border rounded text-sm bg-white" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Pilih Tipe Konten"><option value="lesson">📄 Teks Materi</option><option value="video_url">🎞️ Video YouTube</option><option value="essay">📝 Esai</option><option value="quiz">🧩 Kuis Pilihan Ganda</option><option value="upload_doc">📤 Tugas Upload</option><option value="virtual_class">🎥 Kelas Virtual</option><option value="poll">📊 Polling</option><option value="google_classroom">🏫 Google Classroom</option></select></div>
// // //                                             <div className="col-span-6"><input className="w-full p-2 border rounded text-sm" placeholder="Judul Materi..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi"/></div>
// // //                                             <div className="col-span-2"><input type="number" className="w-full p-2 border rounded text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="Jam Pelajaran"/></div>
// // //                                         </div>
                                        
// // //                                         {/* SETTINGAN BARIS KE-2 (Fasilitator, Tanggal, Wajib) */}
// // //                                         <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded border border-blue-100">
// // //                                             <div><label className="text-[10px] font-bold text-gray-500 block mb-1">Fasilitator (Opsional)</label><select className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesFacilitatorId} onChange={e=>setLesFacilitatorId(e.target.value)} aria-label="Pilih Fasilitator Lesson"><option value="">-- Ikut Modul --</option>{activeTeam.map((f:any)=><option key={f._id} value={f._id}>{f.name}</option>)}</select></div>
// // //                                             <div><label className="text-[10px] font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesSchedule} onChange={e=>setLesSchedule(e.target.value)} aria-label="Tanggal Lesson"/></div>
// // //                                             <div className="flex items-center h-full pt-4"><label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e=>setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded"/> Wajib diselesaikan?</label></div>
// // //                                         </div>
                                        
// // //                                         {/* DETAIL KONTEN KHUSUS */}
// // //                                         {lesType === 'essay' && (
// // //                                             <div className="bg-white p-3 rounded border">
// // //                                                 <div className="mb-2"><label className="text-xs font-bold text-gray-500">Instruksi Soal:</label><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-32 mb-10"/></div>
// // //                                                 <label className="text-xs font-bold text-gray-500 block mt-4">Pertanyaan Esai:</label>
// // //                                                 {essayQuestions.map((q, ix) => (<div key={ix} className="flex gap-2 mb-2"><textarea className="flex-1 p-2 border rounded text-sm h-16" value={q} onChange={e=>updateEssay(ix, e.target.value)} placeholder={`Pertanyaan ${ix+1}`} aria-label={`Pertanyaan Esai ${ix+1}`}/>{essayQuestions.length > 1 && <button type="button" onClick={()=>removeEssay(ix)} className="text-red-500 font-bold" aria-label="Hapus Pertanyaan">x</button>}</div>))}
// // //                                                 <button type="button" onClick={addEssayRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Pertanyaan">+ Tambah Pertanyaan</button>
// // //                                                 <div className="mt-3 flex items-center gap-2 bg-amber-50 p-2 rounded"><label className="text-xs font-bold text-amber-800">⏱ Timer (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="w-16 border p-1 rounded text-xs" aria-label="Durasi Esai"/><label className="text-xs ml-2"><input type="checkbox" checked={useEssayTimer} onChange={e=>setUseEssayTimer(e.target.checked)}/> Aktifkan</label></div>
// // //                                             </div>
// // //                                         )}

// // //                                         {lesType === 'quiz' && (
// // //                                             <div className="bg-white p-3 rounded border">
// // //                                                 <div className="flex gap-2 items-center mb-2"><label className="text-xs font-bold">Durasi (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="w-20 border p-1 rounded" aria-label="Durasi Kuis"/></div>
// // //                                                 {questions.map((q, ix) => (
// // //                                                     <div key={ix} className="p-2 border rounded bg-gray-50 mb-2 relative">
// // //                                                         <button type="button" onClick={()=>removeQuestion(ix)} className="absolute top-1 right-1 text-red-500 font-bold text-xs" aria-label="Hapus Soal">x</button>
// // //                                                         <input className="w-full p-1 border rounded mb-1 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e=>updateQuestion(ix, 'question', e.target.value)} aria-label={`Pertanyaan ${ix+1}`}/>
// // //                                                         <div className="grid grid-cols-2 gap-2">{q.options.map((o:string, oi:number) => <input key={oi} className={`w-full p-1 border text-xs ${q.correctIndex===oi?'bg-green-100 border-green-300':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix, 'options', e.target.value, oi)} aria-label={`Opsi ${oi+1}`}/>)}</div>
// // //                                                         <div className="mt-1 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix, 'correctIndex', Number(e.target.value))} className="w-10 border" aria-label="Index Jawaban Benar"/></div>
// // //                                                     </div>
// // //                                                 ))}
// // //                                                 <button type="button" onClick={addQuestionRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Soal">+ Tambah Soal</button>
// // //                                             </div>
// // //                                         )}
                                        
// // //                                         {lesType === 'poll' && (
// // //                                             <div className="bg-white p-3 rounded border">
// // //                                                 <input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} aria-label="Pertanyaan Polling"/>
// // //                                                 {pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2 mb-1"><input className="flex-1 p-1 border rounded text-xs" value={opt} onChange={e=>updatePollOption(idx, e.target.value)} placeholder={`Opsi ${idx+1}`} aria-label={`Opsi ${idx+1}`}/>{pollOptions.length > 2 && <button onClick={()=>removePollOption(idx)} className="text-red-500 font-bold" aria-label="Hapus Opsi">x</button>}</div>))}
// // //                                                 <button type="button" onClick={addPollOption} className="text-xs text-blue-600 font-bold" aria-label="Tambah Opsi">+ Opsi</button>
// // //                                             </div>
// // //                                         )}

// // //                                         {['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded border"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-48 mb-12" placeholder="Tulis materi..."/></div>)}
// // //                                         {lesType === 'video_url' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded text-sm" placeholder="Link YouTube..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="URL Video"/></div>)}
// // //                                         {lesType === 'virtual_class' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded text-sm" placeholder="Link Zoom/Meet..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="URL Meeting"/></div>)}
                                        
// // //                                         {/* [FIX] GOOGLE CLASSROOM DENGAN TOMBOL CONNECT */}
// // //                                         {lesType === 'google_classroom' && (
// // //                                             <div className="bg-white p-4 rounded border border-green-200 space-y-3">
// // //                                                 <div className="flex items-center justify-between">
// // //                                                     <label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label>
// // //                                                     <div className="flex gap-2">
// // //                                                         {googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Kelas"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putuskan Akun"><LogOut size={12}/> Putuskan</button></>)}
// // //                                                         {(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}
// // //                                                     </div>
// // //                                                 </div>
// // //                                                 {googleToken ? (
// // //                                                     <div className="animate-in fade-in slide-in-from-top-2 duration-300">
// // //                                                         {classroomCourses.length > 0 ? (
// // //                                                             <select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>
// // //                                                         ) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}
// // //                                                         {selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas">Lihat Kelas ↗</a></div>)}
// // //                                                     </div>
// // //                                                 ) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}
// // //                                             </div>
// // //                                         )}
                                        
// // //                                         {/* FILE UPLOAD FOR SPECIFIC TYPES */}
// // //                                         {['image','download_doc','slide'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Pilih File"/></div>)}

// // //                                         <div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetLessonForm} className="text-xs font-bold text-gray-500" aria-label="Batal Simpan Materi">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" aria-label="Simpan Materi">Simpan Materi</button></div>
// // //                                     </div>
// // //                                 ) : (
// // //                                     <button type="button" onClick={()=>{handleAddNewContent(m._id)}} className="w-full py-2 border-2 border-dashed border-gray-200 rounded text-xs text-gray-400 font-bold hover:border-blue-300 hover:text-blue-600 mt-2" aria-label="Tambah Konten Baru">+ Tambah Konten</button>
// // //                                 )}
                                
// // //                                 </div>)}</Droppable></div>)}</Draggable>))}{provided.placeholder}</div>)}</Droppable></DragDropContext>
// // //                             </div>
// // //                         </div>
                        
// // //                         {/* RESTORED: KOMPETENSI & SERTIFIKAT */}
// // //                         <div className="border-t pt-8 space-y-8">
// // //                             <div>
// // //                                 <h2 className="text-xl font-bold text-gray-800 mb-4">Unit Kompetensi</h2>
// // //                                 <CompetencyForm initialData={competencies} onChange={(data) => setCompetencies(data)} />
// // //                                 <div className="mt-4 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
// // //                                     <label className="flex items-center gap-3 cursor-pointer">
// // //                                         <input type="checkbox" checked={includeCompetencies} onChange={e=>setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Tampilkan Kompetensi di Sertifikat"/>
// // //                                         <span className="text-sm font-bold text-gray-700">Tampilkan daftar kompetensi di halaman belakang sertifikat?</span>
// // //                                     </label>
// // //                                     <button type="button" onClick={handleSaveCompetencies} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button>
// // //                                 </div>
// // //                             </div>
// // //                             <div>
// // //                                 <h2 className="text-xl font-bold text-gray-800 mb-4">Pengaturan Sertifikat</h2>
// // //                                 <CertificateConfigForm initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} />
                                
// // //                                 {/* [RESTORED] TABEL PREVIEW DATA SERTIFIKAT */}
// // //                                 {certConfig && (
// // //                                     <div className="mt-6 border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 shadow-sm">
// // //                                         <div className="bg-gray-50 px-5 py-3 border-b flex items-center gap-2 font-bold text-gray-700 text-sm"><FileBadge size={16}/> Data Konfigurasi Tersimpan (Preview)</div>
// // //                                         <div className="p-5 bg-white grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
// // //                                             <div>
// // //                                                 <p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><Hash size={12}/> Format Nomor</p>
// // //                                                 <p className="font-mono bg-gray-50 border px-3 py-2 rounded text-gray-800">{certConfig.certificateNumber || '-'}</p>
// // //                                             </div>
// // //                                             <div>
// // //                                                 <p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><Calendar size={12}/> Tanggal Pelaksanaan</p>
// // //                                                 <p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{certConfig.executionDate ? new Date(certConfig.executionDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '-'}</p>
// // //                                             </div>
// // //                                             <div>
// // //                                                 <p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><MapPin size={12}/> Kota Penerbit</p>
// // //                                                 <p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{certConfig.city || '-'}</p>
// // //                                             </div>
// // //                                             <div>
// // //                                                 <p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><UserCheck size={12}/> Penanda Tangan</p>
// // //                                                 <p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{certConfig.signatoryName} <span className="font-normal text-gray-500 text-xs block">({certConfig.signatoryPosition})</span></p>
// // //                                             </div>
// // //                                         </div>
// // //                                     </div>
// // //                                 )}
// // //                             </div>
// // //                         </div>

// // //                         {/* [FIX] PUBLISH BUTTON MOVED TO BOTTOM */}
// // //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3">
// // //                             <h3 className="text-lg font-bold text-gray-800">Status Publikasi</h3>
// // //                             <button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Ubah Status Publikasi" title="Ubah Status">{course?.isPublished ? 'Tarik Kembali (Draft)' : '🚀 PUBLISH SEKARANG'}</button>
// // //                         </div>
// // //                     </div>
// // //                 )}

// // //                 {/* --- TAB: DASHBOARD OPERATOR (TETAP ADA & SINKRON) --- */}
// // //                 {activeTab === 'operator' && (
// // //                     <div className="animate-in slide-in-from-right-4 duration-300 space-y-6">
                        
// // //                         {/* 1. STATISTIC CARDS */}
// // //                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //                             <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between"><div><p className="text-gray-500 text-xs font-bold uppercase">Total Peserta</p><h3 className="text-3xl font-black text-gray-900 mt-1">{totalStudents}</h3></div><div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users size={24}/></div></div>
// // //                             <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between"><div><p className="text-gray-500 text-xs font-bold uppercase">Lulus / Selesai</p><h3 className="text-3xl font-black text-green-600 mt-1">{passedStudents}</h3></div><div className="p-3 bg-green-50 text-green-600 rounded-xl"><Award size={24}/></div></div>
// // //                             <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between"><div><p className="text-gray-500 text-xs font-bold uppercase">Sedang Aktif</p><h3 className="text-3xl font-black text-orange-500 mt-1">{activeStats}</h3></div><div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><BarChart3 size={24}/></div></div>
// // //                         </div>

// // //                         {/* 2. TABEL MENUNGGU VERIFIKASI */}
// // //                         {pendingParticipants.length > 0 && (
// // //                             <div className="bg-amber-50 border border-amber-200 rounded-2xl shadow-sm overflow-hidden mb-6">
// // //                                 <div className="px-6 py-4 border-b border-amber-200 bg-amber-100 flex items-center gap-2">
// // //                                     <AlertCircle className="text-amber-600" size={20}/>
// // //                                     <h3 className="font-bold text-amber-900">Menunggu Persetujuan ({pendingParticipants.length})</h3>
// // //                                 </div>
// // //                                 <div className="p-0">
// // //                                     <table className="w-full text-left">
// // //                                         <thead className="bg-amber-50 text-xs font-bold text-amber-800 uppercase border-b border-amber-200">
// // //                                             <tr><th className="p-4">Calon Peserta</th><th className="p-4">Tanggal Daftar</th><th className="p-4 text-center">Aksi</th></tr>
// // //                                         </thead>
// // //                                         <tbody className="divide-y divide-amber-200">
// // //                                             {pendingParticipants.map((p: any) => (
// // //                                                 <tr key={p._id} className="hover:bg-amber-100/50">
// // //                                                     <td className="p-4">
// // //                                                         <div className="font-bold text-gray-800">{p.user?.name || 'User'}</div>
// // //                                                         <div className="text-xs text-gray-500">{p.user?.email}</div>
// // //                                                     </td>
// // //                                                     <td className="p-4 text-xs text-gray-600">{new Date(p.joinedAt).toLocaleDateString()}</td>
// // //                                                     <td className="p-4 text-center flex justify-center gap-2">
// // //                                                         <button onClick={() => handleVerifyEnrollment(p._id, 'approve', p.user?.name)} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 flex items-center gap-1 shadow-sm"><Check size={14}/> Terima</button>
// // //                                                         <button onClick={() => handleVerifyEnrollment(p._id, 'reject', p.user?.name)} className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 flex items-center gap-1 shadow-sm"><XCircle size={14}/> Tolak</button>
// // //                                                     </td>
// // //                                                 </tr>
// // //                                             ))}
// // //                                         </tbody>
// // //                                     </table>
// // //                                 </div>
// // //                             </div>
// // //                         )}

// // //                         {/* 3. TABEL PESERTA AKTIF */}
// // //                         <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
// // //                             <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
// // //                                 <h3 className="font-bold text-gray-800 flex items-center gap-2"><Users size={18}/> Daftar Peserta Aktif</h3>
// // //                                 <div className="flex gap-2">
// // //                                     <input className="pl-3 pr-3 py-1.5 rounded-lg border text-xs w-48" placeholder="Cari peserta..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} />
// // //                                     <button onClick={fetchParticipants} className="bg-white border p-1.5 rounded-lg hover:bg-gray-100" aria-label="Refresh Data" title="Refresh Data"><RefreshCw size={14}/></button>
// // //                                 </div>
// // //                             </div>
// // //                             <table className="w-full text-left border-collapse">
// // //                                 <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b"><tr><th className="p-4">Peserta</th><th className="p-4">Progress Realtime</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Aksi Cepat</th><th className="p-4 text-center">Chat</th><th className="p-4 text-center">Detail</th><th className="p-4 text-center text-red-500">Hapus</th></tr></thead>
// // //                                 <tbody className="text-sm divide-y divide-gray-100">{activeParticipants.filter(p => (p.user?.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => { const userObj = p.user || {}; const isCompleted = selectedActionId && p.completedLessons?.includes(selectedActionId); const isPassed = p.progress === 100 || p.isCompleted; return ( <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group"><td className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 overflow-hidden border border-gray-300">{userObj.avatarUrl ? <img src={getImageUrl(userObj.avatarUrl)} alt={userObj.name} className="w-full h-full object-cover"/> : (userObj.name?.charAt(0) || 'U')}</div><div><div className="font-bold text-gray-900">{userObj.name || 'Tanpa Nama'}</div><div className="text-xs text-gray-500">{userObj.email}</div></div></div></td><td className="p-4"><div className="w-full max-w-[140px]"><div className="flex justify-between text-xs mb-1 font-bold"><span>{p.progress}%</span></div><div className="h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200 w-full"><div className={`h-full rounded-full transition-all duration-500 ${isPassed ? 'bg-green-500' : 'bg-indigo-500'}`} style={{width: `${p.progress}%`}}></div></div></div></td><td className="p-4 text-center">{isPassed ? <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200 inline-flex items-center gap-1"><CheckCircle2 size={12}/> LULUS</span> : <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full border border-orange-200">PROSES</span>}</td><td className="p-4 text-center">{selectedActionId ? (<button type="button" onClick={() => handleParticipantAction(userObj._id, 'pass')} disabled={isCompleted} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all shadow-sm ${isCompleted ? 'bg-green-50 text-green-600 border-green-200 cursor-default' : 'bg-white border-gray-300 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'}`} aria-label={isCompleted ? "Sudah Selesai" : "Luluskan Peserta"}>{isCompleted ? '✓ Selesai' : '⚡ Luluskan'}</button>) : <span className="text-gray-300">-</span>}</td><td className="p-4 text-center"><button type="button" onClick={() => setChatTargetStudent(p)} className="p-2 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all" aria-label="Chat Personal" title="Chat"><MessageCircle size={20}/></button></td><td className="p-4 text-center"><button type="button" onClick={() => { setStudentDetail(p); setShowStudentDetailModal(true); }} className="p-2 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all" aria-label="Lihat Detail Peserta" title="Detail"><Eye size={20}/></button></td><td className="p-4 text-center"><button type="button" onClick={() => handleRejectParticipant(p._id, userObj.name)} className="p-2 rounded-full text-gray-300 hover:text-red-600 hover:bg-red-50 transition-all" aria-label="Hapus Peserta" title="Hapus"><Trash2 size={18}/></button></td></tr> ); })}</tbody>
// // //                             </table>
// // //                         </div>
// // //                     </div>
// // //                 )}

// // //                 {/* --- MODALS --- */}
// // //                 {chatTargetStudent && <PersonalChatModal student={chatTargetStudent} onClose={() => setChatTargetStudent(null)} />}
// // //                 {showStudentDetailModal && studentDetail && (
// // //                     <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
// // //                         <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // //                             <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md"><h3 className="font-bold flex items-center gap-2"><UserIcon size={20}/> Detail: {studentDetail.user?.name}</h3><button type="button" onClick={() => setShowStudentDetailModal(false)} aria-label="Tutup Modal"><X size={24}/></button></div>
// // //                             <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
// // //                                 {course?.modules?.map((m:any) => (<div key={m._id} className="bg-white border rounded-xl overflow-hidden shadow-sm"><div className="bg-gray-100 px-4 py-2 border-b font-bold text-sm text-gray-700">{m.title}</div><div className="divide-y">{m.lessons.map((l:any) => { const isDone = studentDetail.completedLessons?.includes(l._id); return (<div key={l._id} className="p-3 flex justify-between items-center hover:bg-gray-50"><div className="flex items-center gap-3"><div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isDone ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>{isDone && <CheckCircle2 size={12}/>}</div><span className={`text-sm ${isDone ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{l.title}</span></div><span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">{l.type}</span></div>); })}</div></div>))}
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 )}
// // //             </div>
// // //         </Protected>
// // //     );
// // // }
// // 'use client';

// // import { useEffect, useState, useRef, useMemo } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // import Protected from '@/components/Protected';
// // import CompetencyForm from '@/components/admin/CompetencyForm';
// // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // import {
// //     Calendar, School, RefreshCw, LogOut, CheckCircle2, Video,
// //     Link as LinkIcon, Users, Eye, MessageSquare, MessageCircle, X, Send, MoreHorizontal, ExternalLink,
// //     Search, User as UserIcon, Mail, Smile, Trophy, Award, Plus, Trash2, Clock, Paperclip, FileText, Download,
// //     FileBadge, MapPin, UserCheck, Hash, Info, UserX, BarChart3, LayoutDashboard, BookOpen, AlertCircle,
// //     ChevronDown, ChevronRight, Check, XCircle
// // } from 'lucide-react';

// // import dynamic from 'next/dynamic';
// // import 'react-quill/dist/quill.snow.css'; 

// // const ReactQuill = dynamic(() => import('react-quill'), { 
// //     ssr: false,
// //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // });

// // // --- HELPER & CHAT COMPONENTS ---
// // const generateDefaultCertFormat = () => { const now = new Date(); return `00{NO}/DIKLAT/${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth()+1).padStart(2, '0')}.${now.getFullYear()}/.../${now.getFullYear()}`; };

// // function PersonalChatModal({ student, onClose }: any) {
// //     const [messages, setMessages] = useState<any[]>([]);
// //     const [newMessage, setNewMessage] = useState('');
// //     const [showEmoji, setShowEmoji] = useState(false);
// //     const messagesEndRef = useRef<HTMLDivElement>(null);
// //     const emojis = ["😀", "😂", "🥰", "😎", "🤔", "👍", "👎", "❤️", "🔥", "🎉", "📚", "✅", "💡", "🤝", "🙏", "💪"];
// //     const targetId = student.user?._id || student._id;
// //     const targetName = student.user?.name || student.name || 'User';
// //     const targetAvatar = student.user?.avatarUrl || student.avatarUrl;
// //     const targetEmail = student.user?.email || student.email || '-';

// //     useEffect(() => { if(targetId) loadHistory(); const interval = setInterval(() => { if(targetId) loadHistory(); }, 5000); return () => clearInterval(interval); }, [targetId]);
// //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
// //     const loadHistory = async () => { try { const res = await api(`/api/chat/${targetId}?t=${Date.now()}`); setMessages(res.messages || []); } catch (e) { console.error(e); } };
// //     const handleSend = async (e: React.FormEvent) => { e.preventDefault(); if (!newMessage.trim()) return; const tempMsg = { _id: Date.now(), sender: 'me', message: newMessage, createdAt: new Date().toISOString() }; setMessages(prev => [...prev, tempMsg]); const msgToSend = newMessage; setNewMessage(''); setShowEmoji(false); try { await api('/api/chat/send', { method: 'POST', body: { recipientId: targetId, message: msgToSend } }); loadHistory(); } catch (error: any) { alert("Gagal: " + error.message); } };

// //     return (
// //         <div className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4">
// //             <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
// //                 <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
// //                     <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold border-2 border-white/30 overflow-hidden">{targetAvatar ? <img src={getImageUrl(targetAvatar)} alt={targetName} className="w-full h-full object-cover"/> : (targetName.charAt(0) || 'U')}</div><div><h3 className="font-bold text-sm leading-tight">{targetName}</h3><p className="text-[10px] opacity-80">{targetEmail}</p></div></div>
// //                     <button type="button" onClick={onClose} className="hover:bg-blue-700 p-2 rounded-full font-bold" aria-label="Tutup Chat"><X size={18}/></button>
// //                 </div>
// //                 <div className="flex-1 p-4 bg-gray-100 overflow-y-auto flex flex-col gap-3 relative">{messages.length === 0 && <div className="text-center text-gray-400 text-xs mt-10">Belum ada pesan.</div>}{messages.map((msg: any, idx: number) => (<div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${msg.sender === 'me' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800'}`}><p>{msg.message}</p></div></div>))}<div ref={messagesEndRef}/>{showEmoji && (<div className="absolute bottom-2 left-2 bg-white border shadow-xl rounded-xl p-3 grid grid-cols-4 gap-2 z-20 w-64 animate-in zoom-in-95">{emojis.map(e => (<button type="button" key={e} onClick={() => { setNewMessage(prev => prev + e); }} className="text-2xl hover:bg-gray-100 p-2 rounded transition" aria-label={`Pilih Emoji ${e}`}>{e}</button>))}</div>)}</div>
// //                 <div className="p-3 bg-white border-t flex gap-2 items-center relative"><button type="button" onClick={() => setShowEmoji(!showEmoji)} className="text-gray-400 hover:text-yellow-500 transition-colors" aria-label="Buka Emoticon"><Smile size={24}/></button><form onSubmit={handleSend} className="flex-1 flex gap-2"><input className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis pesan..." value={newMessage} onChange={e => setNewMessage(e.target.value)} aria-label="Input Pesan Chat" /><button type="submit" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700" aria-label="Kirim Pesan"><Send size={18}/></button></form></div>
// //             </div>
// //         </div>
// //     );
// // }

// // // --- MAIN PAGE ---
// // export default function AdminCourseDetailPage() {
// //     const params = useParams();
// //     const courseId = params?.id as string;
// //     const router = useRouter();
// //     const fileInputRef = useRef<HTMLInputElement>(null);

// //     const [activeTab, setActiveTab] = useState<'content' | 'operator'>('content');
// //     const [course, setCourse] = useState<any>(null);
// //     const [loading, setLoading] = useState(true);
// //     const [isBrowser, setIsBrowser] = useState(false);
// //     const [isUploadingCover, setIsUploadingCover] = useState(false);
// //     const [currentUserRole, setCurrentUserRole] = useState('');

// //     const [participants, setParticipants] = useState<any[]>([]);
// //     const [loadingParticipants, setLoadingParticipants] = useState(false);
// //     const [participantFilter, setParticipantFilter] = useState('');
// //     const [actionOptions, setActionOptions] = useState<any[]>([]);
// //     const [selectedActionId, setSelectedActionId] = useState<string>('');
// //     const [showStudentDetailModal, setShowStudentDetailModal] = useState(false); 
// //     const [studentDetail, setStudentDetail] = useState<any>(null);
// //     const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);

// //     const [showModuleForm, setShowModuleForm] = useState(false);
// //     const [modTitle, setModTitle] = useState('');
// //     const [modIsMandatory, setModIsMandatory] = useState(true);
// //     const [modFacilitatorId, setModFacilitatorId] = useState('');
// //     const [modJp, setModJp] = useState(0);
// //     const [modSchedule, setModSchedule] = useState('');
// //     const [editingModId, setEditingModId] = useState<string | null>(null);
// //     const [activeModId, setActiveModId] = useState<string | null>(null);
// //     const [editingLesId, setEditingLesId] = useState<string | null>(null);
// //     const [lesTitle, setLesTitle] = useState('');
// //     const [lesType, setLesType] = useState('lesson');
// //     const [lesContent, setLesContent] = useState('');
// //     const [lesIsMandatory, setLesIsMandatory] = useState(true);
// //     const [lesJp, setLesJp] = useState(0);
// //     const [lesSchedule, setLesSchedule] = useState('');
// //     const [lesFacilitatorId, setLesFacilitatorId] = useState('');
// //     const [selectedFile, setSelectedFile] = useState<File | null>(null);
// //     const [uploading, setUploading] = useState(false);
// //     const [quizDuration, setQuizDuration] = useState(10);
// //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// //     const [pollQuestion, setPollQuestion] = useState('');
// //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
// //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// //     const [useEssayTimer, setUseEssayTimer] = useState(false);
// //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);
// //     const [facilitators, setFacilitators] = useState<any[]>([]);
// //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>([]);
// //     const [activeTeam, setActiveTeam] = useState<any[]>([]);
// //     const [competencies, setCompetencies] = useState<any[]>([]);
// //     const [includeCompetencies, setIncludeCompetencies] = useState(true);
// //     const [certConfig, setCertConfig] = useState<any>(null);
// //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// //     const [isSavingCert, setIsSavingCert] = useState(false);
// //     const [searchFacilitator, setSearchFacilitator] = useState('');
// //     const quillModules = useMemo(() => ({ toolbar: { container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'image', 'video'], [{ 'color': [] }, { 'background': [] }], ['clean']] } }), []);

// //     useEffect(() => {
// //         setIsBrowser(true);
// //         if(typeof window !== 'undefined'){
// //             const userStr = localStorage.getItem('user');
// //             if (userStr) { setCurrentUserRole(JSON.parse(userStr).role); }
// //             const savedToken = localStorage.getItem('google_class_token');
// //             if(savedToken) setGoogleToken(savedToken);
// //         }
// //         if (courseId) load();
// //     }, [courseId]);

// //     const load = async () => { 
// //         try {
// //             const data = await api(`/api/courses/${courseId}?t=${Date.now()}`);
// //             const courseData = data.course || data;
// //             setCourse(courseData);
// //             const opts: any[] = [];
// //             courseData.modules?.forEach((m: any) => { m.lessons?.forEach((l: any) => { let label = l.title; if(l.type === 'quiz') label = `📝 Kuis: ${l.title}`; else if(l.type === 'essay') label = `📝 Esai: ${l.title}`; else if(l.type === 'upload_doc') label = `📤 Upload: ${l.title}`; opts.push({ id: l._id, label, type: l.type }); }); });
// //             setActionOptions(opts);
// //             if (courseData.facilitatorIds) setSelectedFacilitatorIds(courseData.facilitatorIds.map((f: any) => (typeof f === 'object' && f !== null) ? f._id : f));
// //             if (courseData.competencies) setCompetencies(courseData.competencies);
// //             if (courseData.includeCompetenciesInCertificate !== undefined) setIncludeCompetencies(courseData.includeCompetenciesInCertificate);
// //             let config = courseData.certificateConfig || {};
// //             if (!config.certificateNumber) config = { ...config, certificateNumber: generateDefaultCertFormat() };
// //             setCertConfig(config);
// //             const usersRes = await api('/api/admin/users');
// //             if (usersRes.users) { const facs = usersRes.users.filter((u: any) => u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN'); setFacilitators(facs); setActiveTeam(facs.filter((u: any) => courseData.facilitatorIds?.some((f: any) => (f._id || f) === u._id) || u.role === 'SUPER_ADMIN')); }
// //         } catch (e) { console.error(e); } finally { setLoading(false); }
// //     };

// //     const fetchParticipants = async () => { setLoadingParticipants(true); try { const res = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`); setParticipants(res.participants || []); } catch (error) { console.error("Gagal load peserta"); } finally { setLoadingParticipants(false); } };
// //     useEffect(() => { if(activeTab === 'operator') fetchParticipants(); }, [activeTab]);

// //     const handleVerifyEnrollment = async (enrollmentId: string, action: 'approve' | 'reject', studentName: string) => { if (!confirm(`Apakah Anda yakin ingin ${action === 'approve' ? 'MENYETUJUI' : 'MENOLAK'} pendaftaran ${studentName}?`)) return; try { await api('/api/courses/verify-enrollment', { method: 'POST', body: { enrollmentId, action } }); alert(`Pendaftaran berhasil ${action === 'approve' ? 'disetujui' : 'ditolak'}.`); fetchParticipants(); } catch (e: any) { alert("Gagal: " + e.message); } };
// //     const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => { if (!selectedActionId) return alert("Pilih Materi/Kuis di dropdown atas dulu!"); const participantObj = participants.find(p => (p.user?._id === studentId) || (p.user === studentId)); const realUserId = participantObj?.user?._id || participantObj?.user; if (action === 'pass') { if(!confirm(`Luluskan peserta ini?`)) return; try { await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId: realUserId, lessonId: selectedActionId, courseId } }); setParticipants(prev => prev.map(p => { const uId = p.user?._id || p.user; if(uId === studentId || uId === realUserId) { const currentCompleted = p.completedLessons || []; if (!currentCompleted.includes(selectedActionId)) { const totalLessons = course?.modules?.reduce((acc:any, m:any) => acc + m.lessons.length, 0) || 1; const newCompleted = [...currentCompleted, selectedActionId]; const newProgress = Math.round((newCompleted.length / totalLessons) * 100); return { ...p, completedLessons: newCompleted, progress: newProgress > 100 ? 100 : newProgress, isCompleted: newProgress >= 100 }; } } return p; })); } catch(e:any) { alert(e.message); } } else if (action === 'reset') { if(!confirm(`Reset progress?`)) return; try { await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId: realUserId, quizId: selectedActionId } }); alert("Reset berhasil!"); fetchParticipants(); } catch(e:any) { alert(e.message); } } };
// //     const handleRejectParticipant = async (enrollmentId: string, studentName: string) => { if (!confirm(`TOLAK / HAPUS pendaftaran "${studentName}"?`)) return; try { await api(`/api/enrollments/${enrollmentId}`, { method: 'DELETE' }); alert(`Berhasil dihapus.`); fetchParticipants(); } catch (e: any) { alert("Gagal: " + e.message); } };

// //     const handleSaveModule = async () => { if (!modTitle.trim()) return alert("Judul wajib"); const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: modFacilitatorId || null, jp: modJp, scheduleDate: modSchedule || null }; try { if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); resetModuleForm(); load(); } catch(e: any) { alert(e.message); } };
// //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
// //     const resetModuleForm = () => { setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false); };
// //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); setCourse((prev: any) => ({ ...prev, isPublished: newStatus })); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); load(); } } catch (e: any) { alert(e.message); } };
// //     const getFacilitatorName = (data: any) => { if (!data) return null; if (typeof data === 'object' && data.name) return data.name; const found = facilitators.find(f => f._id === data || f.id === data); return found ? found.name : 'Unknown'; };
// //     const resetLessonForm = () => { setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesIsMandatory(true); setLesContent(''); setSelectedFile(null); setLesJp(0); setLesFacilitatorId(''); setLesSchedule(''); setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(10); setPollQuestion(''); setPollOptions(['', '']); setSelectedClassroom(null); setEssayQuestions(['']); setUseEssayTimer(false); };
// //     const handleAddNewContent = (modId: string) => { resetLessonForm(); setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); };
// //     const handleSaveLesson = async (modId: string) => { if (!lesTitle.trim()) { alert("Judul wajib"); return; } let fileUrl = ''; if (selectedFile) { try { setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); const res = await apiUpload('/api/upload', fd); fileUrl = res.url || res.file?.url || res.imageUrl; } catch (err) { alert("Gagal upload"); return; } finally { setUploading(false); } } else if (editingLesId) { const mod = course?.modules.find((m: any) => m._id === modId); const les = mod?.lessons.find((l: any) => l._id === editingLesId); if (les) fileUrl = les.fileUrl; } const body: any = { title: lesTitle, type: lesType, isActive: true, isMandatory: lesIsMandatory, jp: lesJp, facilitatorId: lesFacilitatorId || null, scheduleDate: lesSchedule || null, questions: (lesType === 'quiz') ? questions : undefined, quizDuration: (lesType === 'quiz' || (lesType === 'essay' && useEssayTimer)) ? quizDuration : undefined, pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined }; if (lesType === 'essay') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; } if(fileUrl) body.fileUrl = fileUrl; if(lesType === 'video_url') body.videoUrl = lesContent; else if(lesType === 'virtual_class') body.meetingLink = lesContent; else if(lesType === 'upload_doc' || lesType === 'lesson') body.content = lesContent; try { if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); resetLessonForm(); load(); } catch(e:any) { alert(e.message); } };
// //     const startEditLesson = (modId: string, les: any) => { setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title); if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { setLesType('essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); if(les.quizDuration) { setUseEssayTimer(true); setQuizDuration(les.quizDuration); } else { setUseEssayTimer(false); } } else { setLesType(les.type); } setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || '')); if (les.type === 'video_url') setLesContent(les.videoUrl||''); else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); else if (les.type !== 'essay') setLesContent(les.content||''); if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(les.quizDuration||10); } if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); } if (les.type === 'google_classroom') { if(googleToken && classroomCourses.length === 0) fetchClassroomCourses(); if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); } setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150); };
// //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); load(); };
// //     const addPollOption = () => setPollOptions([...pollOptions, '']); const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); };
// //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); };
// //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); const updateEssay = (idx: number, val: string) => { const newQ = [...essayQuestions]; newQ[idx] = val; setEssayQuestions(newQ); }; const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };
// //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); const width = 500, height = 600; const left = (window.screen.width - width) / 2; const top = (window.screen.height - height) / 2; window.open(url, 'GoogleAuthPopup', `width=${width},height=${height},top=${top},left=${left}`); } catch (e) { alert("Gagal Auth Google"); } };
// //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } };
// //     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const res = await fetch(`http://localhost:4000/api/classroom/courses`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'x-google-token': token } }); if (res.status === 401) { localStorage.removeItem('google_class_token'); setGoogleToken(null); return; } const data = await res.json(); if (data.courses) setClassroomCourses(data.courses); } catch (e) { console.error(e); } finally { setIsCheckingGoogle(false); } };
// //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } setCourse(newCourse); try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); } catch (err) { load(); } };
// //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); const res = await apiUpload(`/api/upload/course/${courseId}/cover`, formData); setCourse((prev: any) => ({ ...prev, thumbnailUrl: res.imageUrl || res.url })); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };
// //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); };
// //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); load(); } catch (e: any) { alert(e.message); } };

// //     if (loading || !isBrowser) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div></div>;

// //     const pendingParticipants = participants.filter(p => p.status === 'pending');
// //     const activeParticipants = participants.filter(p => p.status !== 'pending');
// //     const totalStudents = participants.length;
// //     const passedStudents = participants.filter(p => p.progress === 100 || p.isCompleted).length;
// //     const activeStats = activeParticipants.length;

// //     return (
// //         <Protected roles={["FACILITATOR", "SUPER_ADMIN"]}>
// //             <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-32">
// //                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
// //                     <div><h1 className="text-3xl font-bold text-gray-900">{course?.title}</h1><p className="text-gray-500 mt-1 flex items-center gap-2"><span className={`px-2 py-0.5 rounded text-xs font-bold ${course?.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{course?.isPublished ? 'PUBLISHED' : 'DRAFT'}</span>• {course?.modules?.length || 0} Modul</p></div>
// //                     <div className="flex gap-2"><button type="button" onClick={() => setActiveTab('content')} className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${activeTab === 'content' ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`} aria-label="Buka Editor Materi"><BookOpen size={18} aria-hidden="true"/> Editor Materi</button><button type="button" onClick={() => setActiveTab('operator')} className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${activeTab === 'operator' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`} aria-label="Buka Dashboard Operator"><LayoutDashboard size={18} aria-hidden="true"/> Dashboard Operator</button></div>
// //                 </div>

// //                 {activeTab === 'content' && (
// //                     <div className="animate-in fade-in duration-300 space-y-8">
// //                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                             <div className="md:col-span-1 space-y-6">
// //                                 <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">{course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover Kursus" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Ganti Cover">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Input File Cover"/></div></div>
// //                                 {currentUserRole === 'SUPER_ADMIN' && (<div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col"><div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" aria-label="Simpan Tim">Simpan</button></div><div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">{facilitators.map((user: any) => (<label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}><input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih ${user.name}`} /><div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div></label>))}</div><input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" /></div>)}
// //                             </div>
// //                             <div className="md:col-span-2 space-y-6">
// //                                 <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">Struktur Modul</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 flex items-center gap-2" aria-label="Tambah Modul Baru">+ Tambah Modul</button></div>
// //                                 {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Judul Modul"/><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" aria-label="Jam Pelajaran"/></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih Fasilitator"><option value="">-- Pilih Fasilitator --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal Pelaksanaan Modul" /></div></div><div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetModuleForm} className="text-sm text-gray-500 font-bold" aria-label="Batal Simpan Modul">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold" aria-label="Simpan Modul">Simpan</button></div></form>)}
// //                                 <DragDropContext onDragEnd={onDragEnd}><Droppable droppableId="all-modules" type="module">{(provided) => (<div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">{course?.modules?.map((m: any, idx: number) => (<Draggable key={m._id} draggableId={m._id} index={idx}>{(provided) => (<div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-xl overflow-hidden bg-white shadow-sm"><div className="bg-gray-50 p-3 flex justify-between items-center" {...provided.dragHandleProps}><div className="flex items-center gap-3"><span className="cursor-grab text-gray-400" aria-label="Geser Modul">☰</span><div><span className="font-bold text-gray-700">{m.title}</span><div className="flex gap-2 text-[10px] mt-1 text-gray-500 font-medium"><span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">{m.jp} JP</span>{m.facilitatorId && <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100 flex items-center gap-1">👤 {getFacilitatorName(m.facilitatorId)}</span>}{m.scheduleDate && <span className="bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded border border-yellow-100 flex items-center gap-1">📅 {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}</div></div></div><div className="flex gap-2"><button type="button" onClick={() => startEditModule(m)} className="text-xs text-blue-600 font-bold" aria-label="Edit Modul">Edit</button><button type="button" onClick={() => toggleStatus(m._id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${m.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label={m.isActive ? "Non-aktifkan Modul" : "Aktifkan Modul"}><span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${m.isActive ? 'translate-x-4' : 'translate-x-1'}`} /></button></div></div><Droppable droppableId={m._id} type="lesson">{(provided) => (<div ref={provided.innerRef} {...provided.droppableProps} className="p-3 space-y-2">{m.lessons?.map((l: any, lIdx: number) => (<Draggable key={l._id} draggableId={l._id} index={lIdx}>{(provided) => (<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-2 bg-white border rounded hover:bg-gray-50"><div className="flex gap-2 items-center"><span className="cursor-grab text-gray-400" aria-hidden="true">::</span><span className="text-lg" aria-hidden="true">{l.type === 'video_url' ? '🎞️' : l.type === 'quiz' ? '📝' : l.type === 'essay' ? '✍️' : '📄'}</span><div><p className="text-sm font-bold text-gray-800">{l.title}</p><div className="flex gap-2 items-center flex-wrap mt-0.5"><span className="text-[10px] text-gray-500 uppercase font-bold">{l.type}</span>{l.jp > 0 && <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 rounded border border-blue-100 font-medium">{l.jp} JP</span>}{l.isMandatory ? <span className="text-[10px] bg-red-50 text-red-700 px-1.5 rounded border border-red-100 font-medium">Wajib</span> : <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 rounded border font-medium">Opsional</span>}{l.facilitatorId && <span className="text-[10px] text-purple-600 flex items-center gap-1 font-medium">👤 {getFacilitatorName(l.facilitatorId)}</span>}{l.scheduleDate && <span className="text-[10px] text-blue-600 flex items-center gap-1 font-medium">📅 {new Date(l.scheduleDate).toLocaleDateString('id-ID')}</span>}</div></div></div><div className="flex gap-2 items-center"><button type="button" onClick={() => startEditLesson(m._id, l)} className="text-blue-500 text-xs font-bold" aria-label="Edit Materi">Edit</button><button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-red-500 text-xs font-bold" aria-label="Hapus Materi">Hapus</button><button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${l.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label={l.isActive ? "Non-aktifkan Lesson" : "Aktifkan Lesson"}><span className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${l.isActive ? 'translate-x-3.5' : 'translate-x-0.5'}`} /></button></div></div>)}</Draggable>))}{provided.placeholder}{activeModId === m._id ? (<div id={`form-${m._id}`} className="bg-blue-50 p-4 rounded border border-blue-200 mt-2 space-y-3"><div className="grid grid-cols-12 gap-2"><div className="col-span-4"><select className="w-full p-2 border rounded text-sm bg-white" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Pilih Tipe Konten"><option value="lesson">📄 Teks Materi</option><option value="video_url">🎞️ Video YouTube</option><option value="essay">📝 Esai</option><option value="quiz">🧩 Kuis Pilihan Ganda</option><option value="upload_doc">📤 Tugas Upload</option><option value="virtual_class">🎥 Kelas Virtual</option><option value="poll">📊 Polling</option><option value="google_classroom">🏫 Google Classroom</option></select></div><div className="col-span-6"><input className="w-full p-2 border rounded text-sm" placeholder="Judul Materi..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi"/></div><div className="col-span-2"><input type="number" className="w-full p-2 border rounded text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="Jam Pelajaran"/></div></div><div className="grid grid-cols-3 gap-3 bg-white p-3 rounded border border-blue-100"><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Fasilitator (Opsional)</label><select className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesFacilitatorId} onChange={e=>setLesFacilitatorId(e.target.value)} aria-label="Pilih Fasilitator Lesson"><option value="">-- Ikut Modul --</option>{activeTeam.map((f:any)=><option key={f._id} value={f._id}>{f.name}</option>)}</select></div><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesSchedule} onChange={e=>setLesSchedule(e.target.value)} aria-label="Tanggal Lesson"/></div><div className="flex items-center h-full pt-4"><label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e=>setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded"/> Wajib diselesaikan?</label></div></div>{lesType === 'essay' && (<div className="bg-white p-3 rounded border"><div className="mb-2"><label className="text-xs font-bold text-gray-500">Instruksi Soal:</label><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-32 mb-10"/></div><label className="text-xs font-bold text-gray-500 block mt-4">Pertanyaan Esai:</label>{essayQuestions.map((q, ix) => (<div key={ix} className="flex gap-2 mb-2"><textarea className="flex-1 p-2 border rounded text-sm h-16" value={q} onChange={e=>updateEssay(ix, e.target.value)} placeholder={`Pertanyaan ${ix+1}`} aria-label={`Pertanyaan Esai ${ix+1}`}/>{essayQuestions.length > 1 && <button type="button" onClick={()=>removeEssay(ix)} className="text-red-500 font-bold" aria-label="Hapus Pertanyaan">x</button>}</div>))}<button type="button" onClick={addEssayRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Pertanyaan">+ Tambah Pertanyaan</button><div className="mt-3 flex items-center gap-2 bg-amber-50 p-2 rounded"><label className="text-xs font-bold text-amber-800">⏱ Timer (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="w-16 border p-1 rounded text-xs" aria-label="Durasi Esai"/><label className="text-xs ml-2"><input type="checkbox" checked={useEssayTimer} onChange={e=>setUseEssayTimer(e.target.checked)}/> Aktifkan</label></div></div>)}{lesType === 'quiz' && (<div className="bg-white p-3 rounded border"><div className="flex gap-2 items-center mb-2"><label className="text-xs font-bold">Durasi (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="w-20 border p-1 rounded" aria-label="Durasi Kuis"/></div>{questions.map((q, ix) => (<div key={ix} className="p-2 border rounded bg-gray-50 mb-2 relative"><button type="button" onClick={()=>removeQuestion(ix)} className="absolute top-1 right-1 text-red-500 font-bold text-xs" aria-label="Hapus Soal">x</button><input className="w-full p-1 border rounded mb-1 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e=>updateQuestion(ix, 'question', e.target.value)} aria-label={`Pertanyaan ${ix+1}`}/><div className="grid grid-cols-2 gap-2">{q.options.map((o:string, oi:number) => <input key={oi} className={`w-full p-1 border text-xs ${q.correctIndex===oi?'bg-green-100 border-green-300':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix, 'options', e.target.value, oi)} aria-label={`Opsi ${oi+1}`}/>)}</div><div className="mt-1 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix, 'correctIndex', Number(e.target.value))} className="w-10 border" aria-label="Index Jawaban Benar"/></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}{lesType === 'poll' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} aria-label="Pertanyaan Polling"/>{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2 mb-1"><input className="flex-1 p-1 border rounded text-xs" value={opt} onChange={e=>updatePollOption(idx, e.target.value)} placeholder={`Opsi ${idx+1}`} aria-label={`Opsi ${idx+1}`}/>{pollOptions.length > 2 && <button onClick={()=>removePollOption(idx)} className="text-red-500 font-bold" aria-label="Hapus Opsi">x</button>}</div>))}<button type="button" onClick={addPollOption} className="text-xs text-blue-600 font-bold" aria-label="Tambah Opsi">+ Opsi</button></div>)}{['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded border"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-48 mb-12" placeholder="Tulis materi..."/></div>)}{lesType === 'video_url' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded text-sm" placeholder="Link YouTube..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="URL Video"/></div>)}{lesType === 'virtual_class' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded text-sm" placeholder="Link Zoom/Meet..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="URL Meeting"/></div>)}{lesType === 'google_classroom' && (<div className="bg-white p-4 rounded border border-green-200 space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Kelas"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putuskan Akun"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}</div>)}{['image','download_doc','slide'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Pilih File"/></div>)}<div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetLessonForm} className="text-xs font-bold text-gray-500" aria-label="Batal Simpan Materi">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" aria-label="Simpan Materi">Simpan Materi</button></div></div>) : (<button type="button" onClick={()=>{handleAddNewContent(m._id)}} className="w-full py-2 border-2 border-dashed border-gray-200 rounded text-xs text-gray-400 font-bold hover:border-blue-300 hover:text-blue-600 mt-2" aria-label="Tambah Konten Baru">+ Tambah Konten</button>)}</div>)}</Droppable></div>)}</Draggable>))}{provided.placeholder}</div>)}</Droppable></DragDropContext>
// //                             </div>
// //                         </div>
// //                         <div className="border-t pt-8 space-y-8">
// //                             <div><h2 className="text-xl font-bold text-gray-800 mb-4">Unit Kompetensi</h2><CompetencyForm initialData={competencies} onChange={(data) => setCompetencies(data)} /><div className="mt-4 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200"><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={includeCompetencies} onChange={e=>setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Tampilkan Kompetensi di Sertifikat"/><span className="text-sm font-bold text-gray-700">Tampilkan daftar kompetensi di halaman belakang sertifikat?</span></label><button type="button" onClick={handleSaveCompetencies} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button></div></div>
// //                             <div>
// //                                 <h2 className="text-xl font-bold text-gray-800 mb-4">Pengaturan Sertifikat</h2><CertificateConfigForm initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} />
// //                                 {certConfig && (<div className="mt-6 border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 shadow-sm"><div className="bg-gray-50 px-5 py-3 border-b flex items-center gap-2 font-bold text-gray-700 text-sm"><FileBadge size={16}/> Data Konfigurasi Tersimpan (Preview)</div><div className="p-5 bg-white grid grid-cols-1 md:grid-cols-2 gap-6 text-sm"><div><p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><Hash size={12}/> Format Nomor</p><p className="font-mono bg-gray-50 border px-3 py-2 rounded text-gray-800">{certConfig.certificateNumber || '-'}</p></div><div><p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><Calendar size={12}/> Tanggal Pelaksanaan</p><p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{certConfig.executionDate ? new Date(certConfig.executionDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '-'}</p></div><div><p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><MapPin size={12}/> Kota Penerbit</p><p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{certConfig.city || '-'}</p></div><div><p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><UserCheck size={12}/> Penanda Tangan</p><p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{certConfig.signatoryName} <span className="font-normal text-gray-500 text-xs block">({certConfig.signatoryPosition})</span></p></div></div></div>)}
// //                             </div>
// //                         </div>
// //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3"><h3 className="text-lg font-bold text-gray-800">Status Publikasi</h3><button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Ubah Status Publikasi" title="Ubah Status">{course?.isPublished ? 'Tarik Kembali (Draft)' : '🚀 PUBLISH SEKARANG'}</button></div>
// //                     </div>
// //                 )}

// //                 {activeTab === 'operator' && (
// //                     <div className="animate-in slide-in-from-right-4 duration-300 space-y-6">
// //                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                             <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between"><div><p className="text-gray-500 text-xs font-bold uppercase">Total Peserta</p><h3 className="text-3xl font-black text-gray-900 mt-1">{totalStudents}</h3></div><div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users size={24}/></div></div>
// //                             <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between"><div><p className="text-gray-500 text-xs font-bold uppercase">Lulus / Selesai</p><h3 className="text-3xl font-black text-green-600 mt-1">{passedStudents}</h3></div><div className="p-3 bg-green-50 text-green-600 rounded-xl"><Award size={24}/></div></div>
// //                             <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between"><div><p className="text-gray-500 text-xs font-bold uppercase">Sedang Aktif</p><h3 className="text-3xl font-black text-orange-500 mt-1">{activeStats}</h3></div><div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><BarChart3 size={24}/></div></div>
// //                         </div>

// //                         {pendingParticipants.length > 0 && (
// //                             <div className="bg-amber-50 border border-amber-200 rounded-2xl shadow-sm overflow-hidden mb-6">
// //                                 <div className="px-6 py-4 border-b border-amber-200 bg-amber-100 flex items-center gap-2"><AlertCircle className="text-amber-600" size={20}/><h3 className="font-bold text-amber-900">Menunggu Persetujuan ({pendingParticipants.length})</h3></div>
// //                                 <div className="p-0"><table className="w-full text-left"><thead className="bg-amber-50 text-xs font-bold text-amber-800 uppercase border-b border-amber-200"><tr><th className="p-4">Calon Peserta</th><th className="p-4">Tanggal Daftar</th><th className="p-4 text-center">Aksi</th></tr></thead><tbody className="divide-y divide-amber-200">{pendingParticipants.map((p: any) => (<tr key={p._id} className="hover:bg-amber-100/50"><td className="p-4"><div className="font-bold text-gray-800">{p.user?.name || 'User'}</div><div className="text-xs text-gray-500">{p.user?.email}</div></td><td className="p-4 text-xs text-gray-600">{new Date(p.joinedAt).toLocaleDateString()}</td><td className="p-4 text-center flex justify-center gap-2"><button onClick={() => handleVerifyEnrollment(p._id, 'approve', p.user?.name)} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 flex items-center gap-1 shadow-sm"><Check size={14}/> Terima</button><button onClick={() => handleVerifyEnrollment(p._id, 'reject', p.user?.name)} className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 flex items-center gap-1 shadow-sm"><XCircle size={14}/> Tolak</button></td></tr>))}</tbody></table></div>
// //                             </div>
// //                         )}

// //                         <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
// //                             <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
// //                                 <h3 className="font-bold text-gray-800 flex items-center gap-2"><Users size={18}/> Daftar Peserta Aktif</h3>
// //                                 <div className="flex gap-2">
// //                                     <div className="flex items-center gap-2">
// //                                         {/* [FIX] DROPDOWN AKSI CEPAT DIKEMBALIKAN */}
// //                                         <select className="p-1.5 border rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500 outline-none h-9 min-w-[150px]" value={selectedActionId} onChange={e=>setSelectedActionId(e.target.value)} aria-label="Pilih Aksi Massal"><option value="">-- Aksi Cepat --</option>{actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}</select>
// //                                         <input className="pl-3 pr-3 py-1.5 rounded-lg border text-xs w-48 h-9" placeholder="Cari peserta..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} aria-label="Cari Peserta" />
// //                                         <button onClick={fetchParticipants} className="bg-white border p-1.5 rounded-lg hover:bg-gray-100 h-9 w-9 flex items-center justify-center" aria-label="Refresh Data" title="Refresh Data"><RefreshCw size={14}/></button>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                             <table className="w-full text-left border-collapse">
// //                                 <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b"><tr><th className="p-4">Peserta</th><th className="p-4">Progress Realtime</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Aksi Cepat</th><th className="p-4 text-center">Chat</th><th className="p-4 text-center">Detail</th><th className="p-4 text-center text-red-500">Hapus</th></tr></thead>
// //                                 <tbody className="text-sm divide-y divide-gray-100">{activeParticipants.filter(p => (p.user?.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => { const userObj = p.user || {}; const isCompleted = selectedActionId && p.completedLessons?.includes(selectedActionId); const isPassed = p.progress === 100 || p.isCompleted; return ( <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group"><td className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 overflow-hidden border border-gray-300">{userObj.avatarUrl ? <img src={getImageUrl(userObj.avatarUrl)} alt={userObj.name} className="w-full h-full object-cover"/> : (userObj.name?.charAt(0) || 'U')}</div><div><div className="font-bold text-gray-900">{userObj.name || 'Tanpa Nama'}</div><div className="text-xs text-gray-500">{userObj.email}</div></div></div></td><td className="p-4"><div className="w-full max-w-[140px]"><div className="flex justify-between text-xs mb-1 font-bold"><span>{p.progress}%</span></div><div className="h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200 w-full"><div className={`h-full rounded-full transition-all duration-500 ${isPassed ? 'bg-green-500' : 'bg-indigo-500'}`} style={{width: `${p.progress}%`}}></div></div></div></td><td className="p-4 text-center">{isPassed ? <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200 inline-flex items-center gap-1"><CheckCircle2 size={12}/> LULUS</span> : <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full border border-orange-200">PROSES</span>}</td><td className="p-4 text-center">{selectedActionId ? (<button type="button" onClick={() => handleParticipantAction(userObj._id, 'pass')} disabled={isCompleted} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all shadow-sm ${isCompleted ? 'bg-green-50 text-green-600 border-green-200 cursor-default' : 'bg-white border-gray-300 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'}`} aria-label={isCompleted ? "Sudah Selesai" : "Luluskan Peserta"}>{isCompleted ? '✓ Selesai' : '⚡ Luluskan'}</button>) : <span className="text-gray-300">-</span>}</td><td className="p-4 text-center"><button type="button" onClick={() => setChatTargetStudent(p)} className="p-2 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all" aria-label="Chat Personal" title="Chat"><MessageCircle size={20}/></button></td><td className="p-4 text-center"><button type="button" onClick={() => { setStudentDetail(p); setShowStudentDetailModal(true); }} className="p-2 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all" aria-label="Lihat Detail Peserta" title="Detail"><Eye size={20}/></button></td><td className="p-4 text-center"><button type="button" onClick={() => handleRejectParticipant(p._id, userObj.name)} className="p-2 rounded-full text-gray-300 hover:text-red-600 hover:bg-red-50 transition-all" aria-label="Hapus Peserta" title="Hapus"><Trash2 size={18}/></button></td></tr> ); })}</tbody></table>
// //                         </div>
// //                     </div>
// //                 )}
// //                 {chatTargetStudent && <PersonalChatModal student={chatTargetStudent} onClose={() => setChatTargetStudent(null)} />}
// //                 {showStudentDetailModal && studentDetail && (<div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200"><div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"><div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md"><h3 className="font-bold flex items-center gap-2"><UserIcon size={20}/> Detail: {studentDetail.user?.name}</h3><button type="button" onClick={() => setShowStudentDetailModal(false)} aria-label="Tutup Modal"><X size={24}/></button></div><div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">{course?.modules?.map((m:any) => (<div key={m._id} className="bg-white border rounded-xl overflow-hidden shadow-sm"><div className="bg-gray-100 px-4 py-2 border-b font-bold text-sm text-gray-700">{m.title}</div><div className="divide-y">{m.lessons.map((l:any) => { const isDone = studentDetail.completedLessons?.includes(l._id); return (<div key={l._id} className="p-3 flex justify-between items-center hover:bg-gray-50"><div className="flex items-center gap-3"><div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isDone ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>{isDone && <CheckCircle2 size={12}/>}</div><span className={`text-sm ${isDone ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{l.title}</span></div><span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">{l.type}</span></div>); })}</div></div>))}</div></div></div>)}
// //             </div>
// //         </Protected>
// //     );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import { api } from '@/lib/api';
// import Protected from '@/components/Protected';
// import { LayoutDashboard, BookOpen } from 'lucide-react';

// // Import komponen yang sudah dipisah
// import CourseContentEditor from '@/components/admin/courses/CourseContentEditor';
// import CourseOperatorDashboard from '@/components/admin/courses/CourseOperatorDashboard';

// export default function AdminCourseDetailPage() {
//     const params = useParams();
//     const courseId = params?.id as string;
    
//     const [activeTab, setActiveTab] = useState<'content' | 'operator'>('content');
//     const [course, setCourse] = useState<any>(null);
//     const [facilitators, setFacilitators] = useState<any[]>([]); // Untuk Dropdown di Editor
//     const [loading, setLoading] = useState(true);

//     // Fungsi load data course
//     const loadCourseData = async () => {
//         try {
//             const data = await api(`/api/courses/${courseId}?t=${Date.now()}`);
//             setCourse(data.course || data);
//         } catch (e) {
//             console.error("Gagal load course", e);
//         }
//     };

//     // Fungsi load facilitators
//     const loadFacilitators = async () => {
//         try {
//             const res = await api('/api/admin/users');
//             if (res.users) {
//                 // Ambil user dengan role FACILITATOR atau SUPER_ADMIN
//                 const facs = res.users.filter((u: any) => u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN');
//                 setFacilitators(facs);
//             }
//         } catch (e) {
//             console.error("Gagal load fasilitator", e);
//         }
//     };

//     useEffect(() => {
//         if (courseId) {
//             setLoading(true);
//             Promise.all([loadCourseData(), loadFacilitators()])
//                 .finally(() => setLoading(false));
//         }
//     }, [courseId]);

//     if (loading) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

//     return (
//         <Protected roles={["FACILITATOR", "SUPER_ADMIN"]}>
//             <div className="max-w-7xl mx-auto p-4 md:p-8 pb-32">
//                 {/* Header Utama */}
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 mb-8">
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-900">{course?.title}</h1>
//                         <p className="text-gray-500 mt-1 flex items-center gap-2">
//                             <span className={`px-2 py-0.5 rounded text-xs font-bold ${course?.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
//                                 {course?.isPublished ? 'PUBLISHED' : 'DRAFT'}
//                             </span>
//                         </p>
//                     </div>
                    
//                     {/* Navigasi Tab */}
//                     <div className="flex gap-2">
//                         <button 
//                             onClick={() => setActiveTab('content')} 
//                             className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${activeTab === 'content' ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`}
//                             aria-label="Buka Editor Materi"
//                         >
//                             <BookOpen size={18} aria-hidden="true"/> Editor Materi
//                         </button>
//                         <button 
//                             onClick={() => setActiveTab('operator')} 
//                             className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${activeTab === 'operator' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`}
//                             aria-label="Buka Dashboard Operator"
//                         >
//                             <LayoutDashboard size={18} aria-hidden="true"/> Dashboard Operator
//                         </button>
//                     </div>
//                 </div>

//                 {/* Content Render */}
//                 {activeTab === 'content' ? (
//                     <CourseContentEditor 
//                         course={course} 
//                         courseId={courseId}
//                         refreshData={loadCourseData} 
//                         facilitators={facilitators}
//                     />
//                 ) : (
//                     <CourseOperatorDashboard 
//                         courseId={courseId}
//                         course={course} 
//                     />
//                 )}
//             </div>
//         </Protected>
//     );
// }
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import Protected from '@/components/Protected';
import { LayoutDashboard, BookOpen } from 'lucide-react';

// Import Komponen Pecahan
import CourseContentEditor from '@/components/admin/courses/CourseContentEditor';
import CourseOperatorDashboard from '@/components/admin/courses/CourseOperatorDashboard';

export default function AdminCourseDetailPage() {
    const params = useParams();
    const courseId = params?.id as string;
    
    const [activeTab, setActiveTab] = useState<'content' | 'operator'>('content');
    const [course, setCourse] = useState<any>(null);
    const [facilitators, setFacilitators] = useState<any[]>([]); 
    const [loading, setLoading] = useState(true);

    const loadCourseData = async () => {
        try {
            const data = await api(`/api/courses/${courseId}?t=${Date.now()}`);
            setCourse(data.course || data);
        } catch (e) {
            console.error("Gagal load course", e);
        }
    };

    const loadFacilitators = async () => {
        try {
            const res = await api('/api/admin/users');
            if (res.users) {
                const facs = res.users.filter((u: any) => u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN');
                setFacilitators(facs);
            }
        } catch (e) {
            console.error("Gagal load fasilitator", e);
        }
    };

    useEffect(() => {
        if (courseId) {
            setLoading(true);
            Promise.all([loadCourseData(), loadFacilitators()])
                .finally(() => setLoading(false));
        }
    }, [courseId]);

    if (loading) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

    return (
        <Protected roles={["FACILITATOR", "SUPER_ADMIN"]}>
            <div className="max-w-7xl mx-auto p-4 md:p-8 pb-32">
                {/* Header Halaman */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{course?.title}</h1>
                        <p className="text-gray-500 mt-1 flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${course?.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {course?.isPublished ? 'PUBLISHED' : 'DRAFT'}
                            </span>
                        </p>
                    </div>
                    
                    {/* Navigasi Tab */}
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setActiveTab('content')} 
                            className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${activeTab === 'content' ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`}
                        >
                            <BookOpen size={18}/> Editor Materi
                        </button>
                        <button 
                            onClick={() => setActiveTab('operator')} 
                            className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${activeTab === 'operator' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`}
                        >
                            <LayoutDashboard size={18}/> Dashboard Operator
                        </button>
                    </div>
                </div>

                {/* Render Komponen Berdasarkan Tab */}
                {activeTab === 'content' ? (
                    <CourseContentEditor 
                        course={course} 
                        courseId={courseId}
                        refreshData={loadCourseData} 
                        facilitators={facilitators}  
                    />
                ) : (
                    <CourseOperatorDashboard 
                        courseId={courseId} 
                        course={course}
                    />
                )}
            </div>
        </Protected>
    );
}
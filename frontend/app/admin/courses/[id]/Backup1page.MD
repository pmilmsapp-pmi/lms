// // // // // // // 'use client';

// // // // // // // import { useEffect, useState, useRef, useMemo } from 'react';
// // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // import Protected from '@/components/Protected';
// // // // // // // import CompetencyForm from '@/components/admin/CompetencyForm';
// // // // // // // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // // // // // // import {
// // // // // // //     Calendar, School, RefreshCw, LogOut, CheckCircle2, Video,
// // // // // // //     Link as LinkIcon, Users, Eye, MessageSquare, MessageCircle, X, Send, MoreHorizontal, ExternalLink,
// // // // // // //     Search, User as UserIcon, Mail, Smile, Trophy, Award, Plus, Trash2, Clock, Paperclip, FileText, Download,
// // // // // // //     FileBadge, MapPin, UserCheck, Hash, Info
// // // // // // // } from 'lucide-react';

// // // // // // // import dynamic from 'next/dynamic';
// // // // // // // import 'react-quill/dist/quill.snow.css'; 

// // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // //     ssr: false,
// // // // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // // // });

// // // // // // // // --- HELPER: ROMAN NUMERALS & DATE FORMAT ---
// // // // // // // const getRomanMonth = (date: Date) => {
// // // // // // //     const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
// // // // // // //     return romans[date.getMonth()];
// // // // // // // };

// // // // // // // const generateDefaultCertFormat = () => {
// // // // // // //     const now = new Date();
// // // // // // //     const dd = String(now.getDate()).padStart(2, '0');
// // // // // // //     const mm = String(now.getMonth() + 1).padStart(2, '0');
// // // // // // //     const yyyy = now.getFullYear();
// // // // // // //     const roman = getRomanMonth(now);
    
// // // // // // //     // FORMAT: 00{NO}/DIKLAT/dd.mm.yyyy/ROMAWI/yyyy
// // // // // // //     return `00{NO}/DIKLAT/${dd}.${mm}.${yyyy}/${roman}/${yyyy}`;
// // // // // // // };

// // // // // // // // --- COMPONENT: ROOM CHAT MODAL ---
// // // // // // // function RoomChatModal({ title, members, onClose, themeColor = 'bg-red-700' }: any) {
// // // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // // //     const [newMessage, setNewMessage] = useState('');
// // // // // // //     const [showEmoji, setShowEmoji] = useState(false);
// // // // // // //     const [mentionQuery, setMentionQuery] = useState<string | null>(null);
// // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null);
    
// // // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);
// // // // // // //     const inputRef = useRef<HTMLInputElement>(null);
// // // // // // //     const emojis = ["😀", "😂", "🥰", "😎", "🤔", "👍", "👎", "❤️", "🔥", "🎉", "📚", "✅", "💡", "🤝", "🙏", "💪"];

// // // // // // //     useEffect(() => {
// // // // // // //         setMessages([{ id: 1, sender: 'System', text: `Selamat datang di ${title}`, time: '08:00', isMe: false, isSystem: true }]);
// // // // // // //     }, [title]);

// // // // // // //     const handleSend = (e: any) => {
// // // // // // //         e.preventDefault();
// // // // // // //         if(!newMessage.trim()) return;
// // // // // // //         setMessages([...messages, { id: Date.now(), sender: 'Saya', text: newMessage, time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), isMe: true }]);
// // // // // // //         setNewMessage('');
// // // // // // //         setShowEmoji(false);
// // // // // // //         setMentionQuery(null);
// // // // // // //         setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
// // // // // // //     };

// // // // // // //     const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //         const file = e.target.files?.[0];
// // // // // // //         if (file) {
// // // // // // //             setMessages([...messages, {
// // // // // // //                 id: Date.now(),
// // // // // // //                 sender: 'Saya',
// // // // // // //                 text: `Mengirim file: ${file.name}`,
// // // // // // //                 isAttachment: true,
// // // // // // //                 time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}),
// // // // // // //                 isMe: true
// // // // // // //             }]);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //         const val = e.target.value;
// // // // // // //         setNewMessage(val);
// // // // // // //         const lastWord = val.split(' ').pop();
// // // // // // //         if (lastWord && lastWord.startsWith('@') && lastWord.length > 1) { setMentionQuery(lastWord.substring(1)); } else { setMentionQuery(null); }
// // // // // // //     };

// // // // // // //     const addEmoji = (emoji: string) => { setNewMessage(prev => prev + emoji); inputRef.current?.focus(); };
// // // // // // //     const addMention = (name: string) => { const words = newMessage.split(' '); words.pop(); setNewMessage(words.join(' ') + ` @${name} `); setMentionQuery(null); inputRef.current?.focus(); };
// // // // // // //     const filteredMembers = mentionQuery ? members.filter((m: any) => (m.name || 'User').toLowerCase().includes(mentionQuery.toLowerCase())) : [];

// // // // // // //     return (
// // // // // // //         <div className="fixed inset-0 bg-black/60 z-[80] flex items-center justify-center p-4 animate-in fade-in duration-200">
// // // // // // //             <div className="bg-white w-full max-w-6xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative">
// // // // // // //                 <div className={`${themeColor} p-4 text-white flex justify-between items-center shadow-md shrink-0`}>
// // // // // // //                     <div className="flex items-center gap-3"><div className="bg-white/20 p-2 rounded-full"><MessageCircle size={20} aria-hidden="true"/></div><div><h3 className="font-bold text-lg">{title}</h3><p className="text-[10px] opacity-90">{members.length} Anggota Terdaftar</p></div></div>
// // // // // // //                     <button type="button" onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Tutup Chat" title="Tutup"><X size={24}/></button>
// // // // // // //                 </div>
// // // // // // //                 <div className="flex flex-1 overflow-hidden relative">
// // // // // // //                     <div className="flex-1 flex flex-col bg-gray-100 relative">
// // // // // // //                         <div className="flex-1 p-4 overflow-y-auto space-y-4" onClick={() => { setShowEmoji(false); setMentionQuery(null); }}>
// // // // // // //                             {messages.map((msg) => (
// // // // // // //                                 <div key={msg.id} className={`flex ${msg.isSystem ? 'justify-center' : (msg.isMe ? 'justify-end' : 'justify-start')}`}>
// // // // // // //                                     {msg.isSystem ? (<span className="text-xs bg-gray-200 text-gray-500 px-3 py-1 rounded-full">{msg.text}</span>) : (
// // // // // // //                                         <div className={`max-w-[75%] flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
// // // // // // //                                             <div className={`px-4 py-2.5 rounded-xl text-sm shadow-sm ${msg.isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border'}`}>
// // // // // // //                                                 {!msg.isMe && <div className="text-[10px] font-bold opacity-70 mb-1 text-blue-600">{msg.sender}</div>}
// // // // // // //                                                 {msg.isAttachment ? <div className="flex items-center gap-2 italic text-gray-600"><Paperclip size={14}/> {msg.text}</div> : <p className="leading-relaxed">{msg.text}</p>}
// // // // // // //                                             </div>
// // // // // // //                                             <span className="text-[10px] text-gray-400 mt-1 mx-1">{msg.time}</span>
// // // // // // //                                         </div>
// // // // // // //                                     )}
// // // // // // //                                 </div>
// // // // // // //                             ))}
// // // // // // //                             <div ref={messagesEndRef}/>
// // // // // // //                         </div>
// // // // // // //                         {mentionQuery !== null && filteredMembers.length > 0 && (<div className="absolute bottom-20 left-4 bg-white border shadow-xl rounded-lg max-h-48 overflow-y-auto w-64 z-20 animate-in slide-in-from-bottom-2"><div className="p-2 bg-gray-50 text-[10px] font-bold text-gray-500 uppercase">Mention Pengguna</div>{filteredMembers.map((m: any, i: number) => (<button type="button" key={i} onClick={() => addMention(m.name)} className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm flex items-center gap-2 border-b last:border-0"><div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">{m.name?.charAt(0)}</div><span className="truncate font-medium">{m.name}</span></button>))}</div>)}
// // // // // // //                         {showEmoji && (<div className="absolute bottom-16 left-2 bg-white border shadow-xl rounded-xl p-3 grid grid-cols-4 gap-2 z-20 w-64 animate-in zoom-in-95">{emojis.map(e => (<button type="button" key={e} onClick={() => addEmoji(e)} className="text-2xl hover:bg-gray-100 p-2 rounded transition" aria-label={`Emoji ${e}`}>{e}</button>))}</div>)}
// // // // // // //                         <div className="p-3 bg-white border-t flex gap-3 items-center relative z-10">
// // // // // // //                             <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100" aria-label="Lampirkan File" title="Lampirkan File"><Paperclip size={20}/></button>
// // // // // // //                             <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} title="Upload File" aria-label="Upload File" />
// // // // // // //                             <button type="button" onClick={() => setShowEmoji(!showEmoji)} className={`p-2 rounded-full transition-colors ${showEmoji ? 'bg-yellow-100 text-yellow-600' : 'text-gray-400 hover:text-gray-600'}`} aria-label="Buka Emoticon" title="Buka Emoticon"><Smile size={24}/></button>
// // // // // // //                             <form onSubmit={handleSend} className="flex-1 flex gap-2">
// // // // // // //                                 <input ref={inputRef} className="flex-1 bg-gray-100 border-0 rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="Ketik pesan... (Gunakan @ untuk mention)" value={newMessage} onChange={handleInputChange} aria-label="Input pesan chat" title="Input pesan chat" />
// // // // // // //                                 <button type="submit" className={`${themeColor} text-white p-3 rounded-full hover:opacity-90 shadow-lg transition-transform active:scale-95 disabled:opacity-50`} disabled={!newMessage.trim()} aria-label="Kirim Pesan" title="Kirim Pesan"><Send size={18}/></button>
// // // // // // //                             </form>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                     <div className="w-80 bg-white border-l border-gray-200 flex flex-col shrink-0 hidden md:flex">
// // // // // // //                         <div className="p-4 border-b bg-gray-50 flex justify-between items-center"><h4 className="font-bold text-gray-700 flex items-center gap-2 text-sm"><Users size={16}/> Peserta ({members.length})</h4></div>
// // // // // // //                         <div className="flex-1 overflow-y-auto p-2 space-y-1">
// // // // // // //                             {members.map((member: any, idx: number) => {
// // // // // // //                                 const name = member.name || member.user?.name || 'User';
// // // // // // //                                 const role = member.role || (member.user ? 'Student' : 'Facilitator');
// // // // // // //                                 const avatar = member.avatarUrl || member.user?.avatarUrl || member.image;
// // // // // // //                                 const isFacilitator = role === 'Facilitator' || role === 'SUPER_ADMIN';
// // // // // // //                                 return (
// // // // // // //                                     <div key={idx} className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors group cursor-default">
// // // // // // //                                         <div className="relative shrink-0">{avatar ? (<img src={getImageUrl(avatar)} alt={name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />) : (<div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border ${isFacilitator ? 'bg-orange-100 text-orange-600 border-orange-200' : 'bg-green-100 text-green-600 border-green-200'}`}>{name.charAt(0).toUpperCase()}</div>)}<span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span></div>
// // // // // // //                                         <div className="flex-1 min-w-0"><p className="text-sm font-bold text-gray-800 truncate">{name}</p><p className={`text-[10px] truncate ${isFacilitator ? 'text-orange-600 font-semibold' : 'text-gray-500'}`}>{isFacilitator ? 'Fasilitator' : 'Peserta'}</p></div>
// // // // // // //                                     </div>
// // // // // // //                                 )
// // // // // // //                             })}
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // }

// // // // // // // // --- MAIN PAGE ---
// // // // // // // export default function AdminCourseDetailPage() {
// // // // // // //     const params = useParams();
// // // // // // //     const courseId = params?.id as string;
// // // // // // //     const router = useRouter();
// // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null);

// // // // // // //     const [course, setCourse] = useState<any>(null);
// // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // //     const [isBrowser, setIsBrowser] = useState(false);
// // // // // // //     const [isUploadingCover, setIsUploadingCover] = useState(false);
// // // // // // //     const [notification, setNotification] = useState<string | null>(null);

// // // // // // //     const [showParticipantModal, setShowParticipantModal] = useState(false);
// // // // // // //     const [showParticipantChat, setShowParticipantChat] = useState(false);
// // // // // // //     const [showTeamChat, setShowTeamChat] = useState(false);
// // // // // // //     const [showPreviewModal, setShowPreviewModal] = useState(false);
// // // // // // //     const [showWallOfFameModal, setShowWallOfFameModal] = useState(false);
// // // // // // //     const [showStudentDetailModal, setShowStudentDetailModal] = useState(false); 
// // // // // // //     const [studentDetail, setStudentDetail] = useState<any>(null);
   
// // // // // // //     const [participants, setParticipants] = useState<any[]>([]);
// // // // // // //     const [loadingParticipants, setLoadingParticipants] = useState(false);
// // // // // // //     const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);
   
// // // // // // //     const [chatMembers, setChatMembers] = useState<any[]>([]);
// // // // // // //     const [teamMembers, setTeamMembers] = useState<any[]>([]);
// // // // // // //     const [recentCompletions, setRecentCompletions] = useState<any[]>([]);

// // // // // // //     const [participantFilter, setParticipantFilter] = useState('');
// // // // // // //     const [actionOptions, setActionOptions] = useState<any[]>([]);
// // // // // // //     const [selectedActionId, setSelectedActionId] = useState<string>('');

// // // // // // //     const [facilitators, setFacilitators] = useState<any[]>([]);
// // // // // // //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>([]);
// // // // // // //     const [currentUserRole, setCurrentUserRole] = useState('');
// // // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
   
// // // // // // //     // Content State
// // // // // // //     const [showModuleForm, setShowModuleForm] = useState(false);
// // // // // // //     const [modTitle, setModTitle] = useState('');
// // // // // // //     const [modIsMandatory, setModIsMandatory] = useState(true);
// // // // // // //     const [modFacilitatorId, setModFacilitatorId] = useState('');
// // // // // // //     const [modJp, setModJp] = useState(0);
// // // // // // //     const [modSchedule, setModSchedule] = useState('');
// // // // // // //     const [editingModId, setEditingModId] = useState<string | null>(null);
   
// // // // // // //     const [activeModId, setActiveModId] = useState<string | null>(null);
// // // // // // //     const [editingLesId, setEditingLesId] = useState<string | null>(null);
// // // // // // //     const [lesTitle, setLesTitle] = useState('');
// // // // // // //     const [lesType, setLesType] = useState('lesson');
// // // // // // //     const [lesContent, setLesContent] = useState('');
// // // // // // //     const [lesIsMandatory, setLesIsMandatory] = useState(true);
// // // // // // //     const [lesJp, setLesJp] = useState(0);
// // // // // // //     const [lesSchedule, setLesSchedule] = useState('');
// // // // // // //     const [lesFacilitatorId, setLesFacilitatorId] = useState('');

// // // // // // //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// // // // // // //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// // // // // // //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// // // // // // //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// // // // // // //     const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // // // // //     const [uploading, setUploading] = useState(false);
// // // // // // //     const [quizDuration, setQuizDuration] = useState(10);
// // // // // // //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// // // // // // //     const [pollQuestion, setPollQuestion] = useState('');
// // // // // // //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
   
// // // // // // //     // Essay State
// // // // // // //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// // // // // // //     const [useEssayTimer, setUseEssayTimer] = useState(false);

// // // // // // //     const [competencies, setCompetencies] = useState<any[]>([]);
// // // // // // //     const [includeCompetencies, setIncludeCompetencies] = useState(true);
// // // // // // //     const [certConfig, setCertConfig] = useState<any>(null);
// // // // // // //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// // // // // // //     const [isSavingCert, setIsSavingCert] = useState(false);

// // // // // // //     // List Tim Yang Dipilih
// // // // // // //     const activeTeam = facilitators.filter(f => selectedFacilitatorIds.includes(f._id));

// // // // // // //     // --- KONFIGURASI EDITOR QUILL ---
// // // // // // //     const quillModules = useMemo(() => ({
// // // // // // //         toolbar: {
// // // // // // //             container: [
// // // // // // //                 [{ 'header': [1, 2, 3, false] }],
// // // // // // //                 ['bold', 'italic', 'underline', 'strike', 'blockquote'],
// // // // // // //                 [{'list': 'ordered'}, {'list': 'bullet'}],
// // // // // // //                 ['link', 'image', 'video'], 
// // // // // // //                 [{ 'color': [] }, { 'background': [] }],
// // // // // // //                 ['clean']
// // // // // // //             ]
// // // // // // //         }
// // // // // // //     }), []);

// // // // // // //     useEffect(() => {
// // // // // // //         setIsBrowser(true);
// // // // // // //         if (typeof window !== 'undefined') {
// // // // // // //             const userStr = localStorage.getItem('user');
// // // // // // //             if (userStr) {
// // // // // // //                 const user = JSON.parse(userStr);
// // // // // // //                 setCurrentUserRole(user.role);
// // // // // // //             }
// // // // // // //             const savedToken = localStorage.getItem('google_class_token');
// // // // // // //             if (savedToken) {
// // // // // // //                 setGoogleToken(savedToken);
// // // // // // //                 fetchClassroomCourses(savedToken);
// // // // // // //             }
// // // // // // //         }
// // // // // // //         if (courseId) load();
// // // // // // //     }, [courseId]);

// // // // // // //     useEffect(() => {
// // // // // // //         const checkToken = () => {
// // // // // // //             const tokenStr = localStorage.getItem('google_class_token');
// // // // // // //             if (tokenStr && tokenStr !== googleToken) {
// // // // // // //                 setGoogleToken(tokenStr);
// // // // // // //                 fetchClassroomCourses(tokenStr);
// // // // // // //             }
// // // // // // //         };
// // // // // // //         checkToken();
// // // // // // //         const handleStorage = (event: StorageEvent) => { if (event.key === 'google_class_token') checkToken(); };
// // // // // // //         const interval = setInterval(checkToken, 2000);
// // // // // // //         window.addEventListener('storage', handleStorage);
// // // // // // //         const handleMessage = (event: MessageEvent) => { if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') checkToken(); };
// // // // // // //         window.addEventListener('message', handleMessage);
// // // // // // //         return () => {
// // // // // // //             window.removeEventListener('storage', handleStorage);
// // // // // // //             window.removeEventListener('message', handleMessage);
// // // // // // //             clearInterval(interval);
// // // // // // //         };
// // // // // // //     }, [googleToken]);

// // // // // // //     const load = async () => {
// // // // // // //         try {
// // // // // // //             const data = await api(`/api/courses/${courseId}`);
            
// // // // // // //             // [FIX] Normalisasi Data
// // // // // // //             const courseData = data.course || data;
// // // // // // //             setCourse(courseData);
       
// // // // // // //             const opts: any[] = [];
// // // // // // //             courseData.modules?.forEach((m: any) => {
// // // // // // //                 m.lessons?.forEach((l: any) => {
// // // // // // //                     let label = l.title;
// // // // // // //                     if(l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
// // // // // // //                     else if(l.type === 'essay' || (l.type === 'quiz' && l.questions?.[0]?.options?.length === 0)) label = `📝 Esai: ${l.title}`;
// // // // // // //                     else if(l.type === 'upload_doc') label = `📤 Upload: ${l.title}`;
// // // // // // //                     else label = `📄 ${l.title}`;
// // // // // // //                     opts.push({ id: l._id, label, type: l.type });
// // // // // // //                 });
// // // // // // //             });
// // // // // // //             setActionOptions(opts);

// // // // // // //             // [FIX] Persistence Checkbox
// // // // // // //             if (courseData.facilitatorIds) {
// // // // // // //                 const ids = courseData.facilitatorIds.map((f: any) => 
// // // // // // //                     (typeof f === 'object' && f !== null) ? f._id : f
// // // // // // //                 );
// // // // // // //                 setSelectedFacilitatorIds(ids);
// // // // // // //             }

// // // // // // //             if (courseData.competencies) setCompetencies(courseData.competencies);
// // // // // // //             if (courseData.includeCompetenciesInCertificate !== undefined) setIncludeCompetencies(courseData.includeCompetenciesInCertificate);
            
// // // // // // //             // [FIX] DATA SERTIFIKAT DEFAULT
// // // // // // //             // Jika data config sertifikat kosong/null, isi dengan default format
// // // // // // //             let config = courseData.certificateConfig || {};
// // // // // // //             if (!config.certificateNumber) {
// // // // // // //                 config = {
// // // // // // //                     ...config,
// // // // // // //                     certificateNumber: generateDefaultCertFormat(), // Isi otomatis format 00{NO}/...
// // // // // // //                     // Bisa tambah default city dll jika perlu
// // // // // // //                 };
// // // // // // //             }
// // // // // // //             setCertConfig(config);

// // // // // // //             const userStr = localStorage.getItem('user');
// // // // // // //             if (userStr) {
// // // // // // //                 const usersRes = await api('/api/admin/users');
// // // // // // //                 if (usersRes.users) {
// // // // // // //                     const facs = usersRes.users.filter((u: any) => u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN');
// // // // // // //                     setFacilitators(facs);
// // // // // // //                     // Gunakan courseData
// // // // // // //                     const team = facs.filter((u: any) =>
// // // // // // //                         courseData.facilitatorIds?.some((f: any) => (f._id || f) === u._id) || u.role === 'SUPER_ADMIN'
// // // // // // //                     );
// // // // // // //                     setTeamMembers(team.map((t: any) => ({ ...t, role: 'Facilitator' })));
// // // // // // //                 }
// // // // // // //             }
       
// // // // // // //             fetchParticipants();
// // // // // // //         } catch (e) { console.error(e); }
// // // // // // //         finally { setLoading(false); }
// // // // // // //     };

// // // // // // //     const fetchParticipants = async () => {
// // // // // // //         if(participants.length > 0) return;
// // // // // // //         setLoadingParticipants(true);
// // // // // // //         try {
// // // // // // //             const res = await api(`/api/courses/${courseId}/participants`);
// // // // // // //             const parts = res.participants || res.data || [];
// // // // // // //             setParticipants(parts);
           
// // // // // // //             const chatList = parts.map((p: any) => {
// // // // // // //                 const userObj = p.user || p.student || p;
// // // // // // //                 return {
// // // // // // //                     name: userObj.name || 'User',
// // // // // // //                     avatarUrl: userObj.avatarUrl || userObj.image,
// // // // // // //                     role: 'Student',
// // // // // // //                     _id: userObj._id
// // // // // // //                 };
// // // // // // //             });
// // // // // // //             setChatMembers([...teamMembers, ...chatList]);

// // // // // // //             const dummyCompletions = parts.slice(0, 10).map((p: any) => ({
// // // // // // //                 name: p.user?.name || p.name || 'Peserta',
// // // // // // //                 module: `Modul ${Math.floor(Math.random() * 3) + 1}`,
// // // // // // //                 date: new Date().toLocaleDateString()
// // // // // // //             }));
// // // // // // //             setRecentCompletions(dummyCompletions);

// // // // // // //         } catch (error) { console.error("Gagal load peserta"); } finally { setLoadingParticipants(false); }
// // // // // // //     };

// // // // // // //     // --- HANDLERS ---
// // // // // // //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); const width = 500, height = 600; const left = (window.screen.width - width) / 2; const top = (window.screen.height - height) / 2; window.open(url, 'GoogleAuthPopup', `width=${width},height=${height},top=${top},left=${left}`); } catch (e) { alert("Gagal Auth Google"); } };
// // // // // // //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } };
   
// // // // // // //     const fetchClassroomCourses = async (tokenOverride?: string) => {
// // // // // // //         const token = tokenOverride || googleToken;
// // // // // // //         if (!token) return;
// // // // // // //         try {
// // // // // // //             setIsCheckingGoogle(true);
// // // // // // //             const res = await fetch(`http://localhost:4000/api/classroom/courses`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'x-google-token': token } });
// // // // // // //             if (res.status === 401) { localStorage.removeItem('google_class_token'); setGoogleToken(null); return; }
// // // // // // //             const data = await res.json();
// // // // // // //             if (data.courses) setClassroomCourses(data.courses);
// // // // // // //         } catch (e) { console.error(e); } finally { setIsCheckingGoogle(false); }
// // // // // // //     };

// // // // // // //     const getFacilitatorName = (data: any) => {
// // // // // // //         if (!data) return null;
// // // // // // //         if (typeof data === 'object' && data.name) return data.name;
// // // // // // //         const found = facilitators.find(f => f._id === data || f.id === data);
// // // // // // //         return found ? found.name : 'Unknown';
// // // // // // //     };

// // // // // // //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); const res = await apiUpload(`/api/upload/course/${courseId}/cover`, formData); setCourse((prev: any) => ({ ...prev, thumbnailUrl: res.imageUrl || res.url })); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// // // // // // //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); };
// // // // // // //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); load(); } catch (e: any) { alert(e.message); } };
// // // // // // //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } setCourse(newCourse); try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); } catch (err) { load(); } };

// // // // // // //     const handleSaveModule = async () => { 
// // // // // // //         if (!modTitle.trim()) return alert("Judul wajib"); 
        
// // // // // // //         // [FIX] Handle null
// // // // // // //         const safeFacilitatorId = modFacilitatorId || null;

// // // // // // //         const body = { 
// // // // // // //             title: modTitle, 
// // // // // // //             isActive: true, 
// // // // // // //             isMandatory: modIsMandatory, 
// // // // // // //             facilitatorId: safeFacilitatorId,
// // // // // // //             jp: modJp, 
// // // // // // //             scheduleDate: modSchedule || null 
// // // // // // //         }; 
// // // // // // //         try { 
// // // // // // //             if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); 
// // // // // // //             else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); 
// // // // // // //             resetModuleForm(); 
// // // // // // //             load(); 
// // // // // // //         } catch(e: any) { 
// // // // // // //             alert(e.message); 
// // // // // // //         } 
// // // // // // //     };

// // // // // // //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
// // // // // // //     const resetModuleForm = () => { setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false); };
// // // // // // //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); setCourse((prev: any) => ({ ...prev, isPublished: newStatus })); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); load(); } } catch (e: any) { alert(e.message); } };
   
// // // // // // //     const resetLessonForm = () => { setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesIsMandatory(true); setLesContent(''); setSelectedFile(null); setLesJp(0); setLesFacilitatorId(''); setLesSchedule(''); setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(10); setPollQuestion(''); setPollOptions(['', '']); setSelectedClassroom(null); setEssayQuestions(['']); setUseEssayTimer(false); };
   
// // // // // // //     const handleSaveLesson = async (modId: string) => {
// // // // // // //         if (!lesTitle.trim()) { alert("Judul wajib"); return; }
// // // // // // //         let fileUrl = '';
// // // // // // //         if (selectedFile) { try { setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); const res = await apiUpload('/api/upload', fd); fileUrl = res.url || res.file?.url || res.imageUrl; } catch (err) { alert("Gagal upload"); return; } finally { setUploading(false); } }
// // // // // // //         else if (editingLesId) { const mod = course?.modules.find((m: any) => m._id === modId); const les = mod?.lessons.find((l: any) => l._id === editingLesId); if (les) fileUrl = les.fileUrl; }

// // // // // // //         const finalType = lesType === 'essay' ? 'quiz' : lesType;

// // // // // // //         // [FIX] Handle null
// // // // // // //         const safeFacilitatorId = lesFacilitatorId || null;

// // // // // // //         const body: any = {
// // // // // // //             title: lesTitle,
// // // // // // //             type: finalType,
// // // // // // //             isActive: true,
// // // // // // //             isMandatory: lesIsMandatory,
// // // // // // //             jp: lesJp,
// // // // // // //             facilitatorId: safeFacilitatorId,
// // // // // // //             scheduleDate: lesSchedule || null,
// // // // // // //             questions: (lesType === 'quiz') ? questions : undefined,
// // // // // // //             quizDuration: (lesType === 'quiz' || (lesType === 'essay' && useEssayTimer)) ? quizDuration : undefined,
// // // // // // //             pollQuestion: (lesType === 'poll') ? pollQuestion : undefined,
// // // // // // //             pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined,
// // // // // // //             classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined,
// // // // // // //         };

// // // // // // //         if (lesType === 'essay') {
// // // // // // //             body.questions = essayQuestions.map(q => ({
// // // // // // //                 question: q,
// // // // // // //                 options: [], 
// // // // // // //                 correctIndex: 0
// // // // // // //             }));
// // // // // // //         }

// // // // // // //         if(fileUrl) body.fileUrl = fileUrl;
    
// // // // // // //         if(lesType === 'video_url') body.videoUrl = lesContent;
// // // // // // //         else if(lesType === 'virtual_class') body.meetingLink = lesContent;
// // // // // // //         else if(lesType === 'upload_doc') body.content = lesContent; 
// // // // // // //         else if(!['quiz','poll','image','google_classroom','essay'].includes(lesType)) body.content = lesContent;

// // // // // // //         try { if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); resetLessonForm(); load(); } catch(e:any) { alert(e.message); }
// // // // // // //     };

// // // // // // //     const startEditLesson = (modId: string, les: any) => {
// // // // // // //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title);
       
// // // // // // //         let typeToSet = les.type;
// // // // // // //         if (les.type === 'quiz' && les.questions && les.questions.length > 0 && (!les.questions[0].options || les.questions[0].options.length === 0)) {
// // // // // // //             typeToSet = 'essay';
// // // // // // //             setEssayQuestions(les.questions.map((q:any) => q.question));
// // // // // // //             if(les.quizDuration) { setUseEssayTimer(true); setQuizDuration(les.quizDuration); }
// // // // // // //             else { setUseEssayTimer(false); }
// // // // // // //         } else {
// // // // // // //             setLesType(les.type);
// // // // // // //         }
// // // // // // //         setLesType(typeToSet);

// // // // // // //         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0);
// // // // // // //         setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : '');
// // // // // // //         setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || ''));
       
// // // // // // //         if (les.type === 'video_url') setLesContent(les.videoUrl||'');
// // // // // // //         else if (les.type === 'virtual_class') setLesContent(les.meetingLink||'');
// // // // // // //         else setLesContent(les.content||'');
       
// // // // // // //         if (les.type === 'quiz' && typeToSet === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(les.quizDuration||10); }
// // // // // // //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); }
       
// // // // // // //         if (les.type === 'google_classroom') {
// // // // // // //             if(googleToken && classroomCourses.length === 0) fetchClassroomCourses();
// // // // // // //             if(les.classroomData) setSelectedClassroom(les.classroomData);
// // // // // // //         } else { setSelectedClassroom(null); }

// // // // // // //         setTimeout(() => document.getElementById(`form-${modId}`)?.scrollIntoView({ behavior: 'smooth' }), 100);
// // // // // // //     };

// // // // // // //     const deleteItem = async (modId: string, lesId: string) => {
// // // // // // //         if(!confirm("Hapus?")) return;
// // // // // // //         await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' });
// // // // // // //         load();
// // // // // // //     };

// // // // // // //     const addPollOption = () => setPollOptions([...pollOptions, '']); const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); };
// // // // // // //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); };
   
// // // // // // //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']);
// // // // // // //     const updateEssay = (idx: number, val: string) => { const newQ = [...essayQuestions]; newQ[idx] = val; setEssayQuestions(newQ); };
// // // // // // //     const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };

// // // // // // //     const handleSaveCertConfig = async (data: any) => { 
// // // // // // //         try { 
// // // // // // //             setIsSavingCert(true); 
// // // // // // //             await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); 
// // // // // // //             alert("Disimpan!"); 
// // // // // // //             load(); // [FIX] Reload agar tabel terupdate
// // // // // // //         } catch (e: any) { 
// // // // // // //             alert(e.message); 
// // // // // // //         } finally { 
// // // // // // //             setIsSavingCert(false); 
// // // // // // //         } 
// // // // // // //     };
    
// // // // // // //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };

// // // // // // //     const handleViewStudentDetail = (student: any) => {
// // // // // // //         setStudentDetail(student);
// // // // // // //         setShowStudentDetailModal(true);
// // // // // // //     };

// // // // // // //     const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => {
// // // // // // //         if (!selectedActionId) return alert("Pilih Materi/Kuis di dropdown atas dulu!");
// // // // // // //         const selectedItem = actionOptions.find(o => o.id === selectedActionId);
// // // // // // //         if (action === 'pass') {
// // // // // // //             if(!confirm(`Luluskan peserta ini di materi "${selectedItem.label}"?`)) return;
// // // // // // //             try { await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId, lessonId: selectedActionId, courseId } }); alert("Berhasil diluluskan!"); fetchParticipants(); } catch(e:any) { alert(e.message); }
// // // // // // //         } else if (action === 'reset') {
// // // // // // //             if(!confirm(`Reset progress Kuis "${selectedItem.label}" untuk peserta ini?`)) return;
// // // // // // //             try { await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId, quizId: selectedActionId } }); alert("Kuis di-reset!"); fetchParticipants(); } catch(e:any) { alert(e.message); }
// // // // // // //         }
// // // // // // //     };

// // // // // // //     if (loading || !isBrowser) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div></div>;

// // // // // // //     return (
// // // // // // //         <Protected roles={["FACILITATOR", "SUPER_ADMIN"]}>
// // // // // // //             <div className="max-w-6xl mx-auto p-6 space-y-12 pb-32 relative">
// // // // // // //                 {notification && (<div className="fixed top-20 right-6 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl font-bold animate-bounce z-50 flex items-center gap-2"><span>💾</span> {notification}</div>)}

// // // // // // //                 {/* HEADER */}
// // // // // // //                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 gap-4">
// // // // // // //                     <div className="flex-1">
// // // // // // //                         <h1 className="text-3xl font-bold text-gray-800">{course?.title}</h1>
// // // // // // //                         <div className="flex gap-2 items-center mt-2">
// // // // // // //                             <button type="button" onClick={() => toggleStatus()} className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer border transition-colors ${course?.isPublished ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`} aria-label="Toggle Publish" title="Ubah Status Publikasi">{course?.isPublished ? 'PUBLISHED' : 'DRAFT'}</button>
// // // // // // //                             <span className="text-xs text-gray-500 font-medium">{course?.modules?.length || 0} Modul • {course?.modules?.reduce((acc: number, m: any) => acc + m.lessons.length, 0) || 0} Materi</span>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                     <button type="button" onClick={() => router.push('/admin/courses')} className="text-sm font-bold text-gray-500 hover:text-gray-800 px-4 py-2 border rounded-lg hover:bg-gray-50" aria-label="Kembali" title="Kembali">← Kembali</button>
// // // // // // //                 </div>

// // // // // // //                 {/* GRID UTAMA */}
// // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // //                     {/* KIRI */}
// // // // // // //                     <div className="md:col-span-1 space-y-6">
// // // // // // //                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
// // // // // // //                             {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
// // // // // // //                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Upload Cover" title="Ganti Sampul">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Input Cover" /></div>
// // // // // // //                         </div>

// // // // // // //                         {/* TIM PENGELOLA */}
// // // // // // //                         {currentUserRole === 'SUPER_ADMIN' && (
// // // // // // //                             <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
// // // // // // //                                 <div className="flex justify-between items-center mb-4">
// // // // // // //                                     <div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div>
// // // // // // //                                     <button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" title="Simpan Tim" aria-label="Simpan Tim">Simpan</button>
// // // // // // //                                 </div>
// // // // // // //                                 <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">
// // // // // // //                                     {facilitators.map((user: any) => (
// // // // // // //                                         <label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}>
// // // // // // //                                             <input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih fasilitator ${user.name}`} title={`Pilih ${user.name}`} />
// // // // // // //                                             <div className="flex-1 overflow-hidden">
// // // // // // //                                                 <div className="text-xs font-bold truncate">{user.name}</div>
// // // // // // //                                                 <div className="text-[10px] text-gray-500 truncate">{user.email}</div>
// // // // // // //                                             </div>
// // // // // // //                                         </label>
// // // // // // //                                     ))}
// // // // // // //                                 </div>
// // // // // // //                                 <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" title="Cari Fasilitator" />
// // // // // // //                             </div>
// // // // // // //                         )}
                        
// // // // // // //                         {/* --- WALL OF FAME (TICKER) --- */}
// // // // // // //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-6 overflow-hidden">
// // // // // // //                             <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 text-yellow-600 cursor-pointer" onClick={() => setShowWallOfFameModal(true)}><Trophy size={18}/> Wall of Fame (Klik)</h3>
// // // // // // //                             <div className="relative h-40 overflow-hidden" onClick={() => setShowWallOfFameModal(true)}>
// // // // // // //                                 <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white to-transparent z-10"></div>
// // // // // // //                                 <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent z-10"></div>
// // // // // // //                                 <div className="animate-[scrollY_15s_linear_infinite] space-y-3 cursor-pointer">
// // // // // // //                                     {recentCompletions.length > 0 ? recentCompletions.map((rc:any, i:number) => (
// // // // // // //                                         <div key={i} className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg border border-yellow-100">
// // // // // // //                                             <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-bold text-xs"><Award size={14}/></div>
// // // // // // //                                             <div className="flex-1 min-w-0">
// // // // // // //                                                 <p className="text-xs font-bold text-gray-800 truncate">{rc.name}</p>
// // // // // // //                                                 <p className="text-[10px] text-gray-500 truncate">Selesai: {rc.module}</p>
// // // // // // //                                             </div>
// // // // // // //                                         </div>
// // // // // // //                                     )) : <p className="text-xs text-gray-400 text-center mt-10">Belum ada yang lulus.</p>}
// // // // // // //                                     {recentCompletions.map((rc:any, i:number) => (
// // // // // // //                                         <div key={`dup-${i}`} className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg border border-yellow-100">
// // // // // // //                                             <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-bold text-xs"><Award size={14}/></div>
// // // // // // //                                             <div className="flex-1 min-w-0">
// // // // // // //                                                 <p className="text-xs font-bold text-gray-800 truncate">{rc.name}</p>
// // // // // // //                                                 <p className="text-[10px] text-gray-500 truncate">Selesai: {rc.module}</p>
// // // // // // //                                             </div>
// // // // // // //                                         </div>
// // // // // // //                                     ))}
// // // // // // //                                 </div>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     </div>

// // // // // // //                     {/* KANAN */}
// // // // // // //                     <section className="md:col-span-2 space-y-6">
// // // // // // //                         <div className="flex justify-between items-center">
// // // // // // //                             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">📚 Modul & Materi</h2>
// // // // // // //                             <button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-red-700 text-white px-5 py-2 rounded-xl font-bold shadow-lg hover:bg-red-800 flex items-center gap-2" aria-label="Tambah Modul" title="Tambah Modul">+ Tambah Modul</button>
// // // // // // //                         </div>

// // // // // // //                         {/* FORM ADD MODULE */}
// // // // // // //                         {showModuleForm && (
// // // // // // //                             <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200">
// // // // // // //                                 <div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul" title="Nama Modul" /><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" min="0" aria-label="JP" title="Jam Pelajaran" /></div>
// // // // // // //                                 <div className="grid grid-cols-2 gap-4">
// // // // // // //                                     <div>
// // // // // // //                                         <label className="text-xs font-bold text-gray-500">Penanggung Jawab</label>
// // // // // // //                                         <select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih Fasilitator" title="Pilih Fasilitator">
// // // // // // //                                             <option value="">-- Pilih Fasilitator dari Tim --</option>
// // // // // // //                                             {activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}
// // // // // // //                                         </select>
// // // // // // //                                     </div>
// // // // // // //                                     <div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal Modul" title="Tanggal Modul" /></div>
// // // // // // //                                 </div>
// // // // // // //                                 <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={modIsMandatory} onChange={e => setModIsMandatory(e.target.checked)} className="w-4 h-4 text-red-600 rounded" aria-label="Wajib" title="Wajib" /><span>Wajib diselesaikan?</span></label>
// // // // // // //                                 <div className="flex gap-2 justify-end pt-2"><button type="button" onClick={resetModuleForm} className="text-gray-500 font-bold px-3 text-sm" aria-label="Batal" title="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700" aria-label="Simpan" title="Simpan">Simpan</button></div>
// // // // // // //                             </form>
// // // // // // //                         )}

// // // // // // //                         <DragDropContext onDragEnd={onDragEnd}>
// // // // // // //                             <Droppable droppableId="all-modules" type="module">
// // // // // // //                                 {(provided) => (
// // // // // // //                                     <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
// // // // // // //                                             {course?.modules?.map((m: any, idx: number) => (
// // // // // // //                                                 <Draggable key={m._id} draggableId={m._id} index={idx}>
// // // // // // //                                                     {(provided) => (
// // // // // // //                                                         <div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-2xl overflow-hidden shadow-sm bg-white">
// // // // // // //                                                                 {/* HEADER MODUL */}
// // // // // // //                                                                 <div className="bg-gray-100 p-4 flex justify-between items-center" {...provided.dragHandleProps}>
// // // // // // //                                                                     <div className="flex items-center gap-3">
// // // // // // //                                                                         <span className="cursor-grab text-gray-400 text-xl" aria-label="Geser Modul" title="Geser Modul">☰</span>
// // // // // // //                                                                         <span className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{idx+1}</span>
// // // // // // //                                                                         <div>
// // // // // // //                                                                             <div className="flex items-center gap-2">
// // // // // // //                                                                                 <h3 className="font-bold text-gray-800">{m.title}</h3>
// // // // // // //                                                                                 {m.jp > 0 && <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded border border-blue-200">{m.jp} JP</span>}
// // // // // // //                                                                             </div>
// // // // // // //                                                                             <div className="flex items-center gap-2 mt-1">
// // // // // // //                                                                                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${m.isMandatory ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-600'}`}>{m.isMandatory ? 'WAJIB' : 'OPSIONAL'}</span>
// // // // // // //                                                                                 {m.facilitatorId && <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded flex items-center gap-1">👤 {getFacilitatorName(m.facilitatorId)}</span>}
// // // // // // //                                                                                 {m.scheduleDate && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1"><Calendar size={10}/> {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // // // // //                                                                             </div>
// // // // // // //                                                                         </div>
// // // // // // //                                                                     </div>
// // // // // // //                                                                     <div className="flex items-center gap-2">
// // // // // // //                                                                         <button type="button" onClick={() => startEditModule(m)} className="text-blue-600 font-bold text-xs px-2" aria-label="Edit Modul" title="Edit Modul">Edit</button>
// // // // // // //                                                                         <button type="button" onClick={() => toggleStatus(m._id)} className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${m.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`} aria-label="Toggle Modul" title="Aktifkan/Nonaktifkan">{m.isActive ? 'ON' : 'OFF'}</button>
// // // // // // //                                                                     </div>
// // // // // // //                                                                 </div>
                                                               
// // // // // // //                                                                 <Droppable droppableId={m._id} type="lesson">
// // // // // // //                                                                     {(provided) => (
// // // // // // //                                                                         <div ref={provided.innerRef} {...provided.droppableProps} className="p-4 space-y-3 min-h-[50px]">
// // // // // // //                                                                                 {m.lessons?.map((l: any, lIdx: number) => (
// // // // // // //                                                                                     <Draggable key={l._id} draggableId={l._id} index={lIdx}>
// // // // // // //                                                                                         {(provided) => (
// // // // // // //                                                                                             <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-3 bg-white border rounded-xl hover:shadow-md transition-shadow">
// // // // // // //                                                                                                     <div className="flex items-center gap-3">
// // // // // // //                                                                                                         <span className="cursor-grab text-gray-300" aria-label="Geser Materi" title="Geser Materi">::</span>
// // // // // // //                                                                                                         <span className="text-xl">
// // // // // // //                                                                                                             {l.type === 'virtual_class' ? '🎥' : l.type === 'google_classroom' ? '🏫' : l.type === 'video_url' ? '🎞️' : l.type === 'quiz' ? '📝' : l.type === 'poll' ? '📊' : l.type === 'upload_doc' ? '📤' : l.type === 'image' ? '🖼️' : '📄'}
// // // // // // //                                                                                                         </span>
// // // // // // //                                                                                                         <div>
// // // // // // //                                                                                                             <div className="flex items-center gap-2">
// // // // // // //                                                                                                                 <p className="text-sm font-bold text-gray-800">{l.title}</p>
// // // // // // //                                                                                                                 {l.jp > 0 && <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 rounded border border-blue-100">{l.jp} JP</span>}
// // // // // // //                                                                                                                 {l.scheduleDate && <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-1.5 rounded border border-purple-100 flex items-center gap-1"><Calendar size={10}/> {new Date(l.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // // // // //                                                                                                             </div>
// // // // // // //                                                                                                             <div className="flex gap-2 items-center mt-0.5">
// // // // // // //                                                                                                                 <span className="text-[10px] text-blue-600 uppercase font-bold">{l.type.replace('_',' ')}</span>
// // // // // // //                                                                                                                 <span className={`text-[10px] font-bold px-1 rounded ${l.isMandatory ? 'text-red-600 bg-red-50' : 'text-gray-500 bg-gray-100'}`}>{l.isMandatory ? 'Wajib' : 'Opsional'}</span>
// // // // // // //                                                                                                                 {(l.facilitatorId || l.facilitator) && (
// // // // // // //                                                                                                                     <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
// // // // // // //                                                                                                                         👤 {getFacilitatorName(l.facilitatorId || l.facilitator)}
// // // // // // //                                                                                                                     </span>
// // // // // // //                                                                                                                 )}
// // // // // // //                                                                                                             </div>
// // // // // // //                                                                                                         </div>
// // // // // // //                                                                                                     </div>
// // // // // // //                                                                                                     <div className="flex items-center gap-2">
// // // // // // //                                                                                                         <button type="button" onClick={() => startEditLesson(m._id, l)} className="text-blue-500 p-1" aria-label="Edit Materi" title="Edit Materi">✎</button>
// // // // // // //                                                                                                         <button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`px-2 py-1 rounded text-[10px] font-bold border ${l.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`} aria-label="Toggle Materi" title="Aktifkan/Nonaktifkan">{l.isActive ? 'ON' : 'OFF'}</button>
// // // // // // //                                                                                                         <button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-gray-300 hover:text-red-500" aria-label="Hapus Materi" title="Hapus Materi">🗑️</button>
// // // // // // //                                                                                                     </div>
// // // // // // //                                                                                             </div>
// // // // // // //                                                                                         )}
// // // // // // //                                                                                     </Draggable>
// // // // // // //                                                                                 ))}
// // // // // // //                                                                                 {provided.placeholder}
                                                                               
// // // // // // //                                                                                 {/* FORM LESSON */}
// // // // // // //                                                                                 {activeModId === m._id ? (
// // // // // // //                                                                                     <div id={`form-${m._id}`} className="bg-blue-50 p-5 rounded-xl border border-blue-200 space-y-4">
// // // // // // //                                                                                             <div className="grid grid-cols-12 gap-3">
// // // // // // //                                                                                                 <div className="col-span-4">
// // // // // // //                                                                                                     <select className="w-full p-2 border rounded-lg text-sm" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Pilih Tipe Materi" title="Pilih Tipe Materi">
// // // // // // //                                                                                                         <option value="lesson">📄 Materi Teks</option>
// // // // // // //                                                                                                         <option value="essay">📝 Esai</option> {/* [NEW] Opsi Esai */}
// // // // // // //                                                                                                         <option value="slide">🖥️ Slide Presentasi</option>
// // // // // // //                                                                                                         <option value="image">🖼️ Upload Gambar</option>
// // // // // // //                                                                                                         <option value="download_doc">📥 Upload Dokumen</option>
// // // // // // //                                                                                                         <option value="upload_doc">📤 Tugas Upload</option>
// // // // // // //                                                                                                         <option value="quiz">📝 Kuis</option>
// // // // // // //                                                                                                         <option value="poll">📊 Polling</option>
// // // // // // //                                                                                                         <option value="video_url">🎞️ Video URL (YouTube)</option>
// // // // // // //                                                                                                         <option value="virtual_class">🎥 Kelas Virtual (Meet/Zoom)</option>
// // // // // // //                                                                                                         <option value="google_classroom">🏫 Google Classroom</option>
// // // // // // //                                                                                                     </select>
// // // // // // //                                                                                                 </div>
// // // // // // //                                                                                                 <div className="col-span-6"><input className="w-full p-2 border rounded-lg text-sm" placeholder="Judul..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi" title="Judul Materi" /></div>
// // // // // // //                                                                                                 <div className="col-span-2"><input type="number" className="w-full p-2 border rounded-lg text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} min="0" aria-label="JP" title="Jam Pelajaran" /></div>
// // // // // // //                                                                                             </div>

// // // // // // //                                                                                             <div className="grid grid-cols-2 gap-4">
// // // // // // //                                                                                                 <div>
// // // // // // //                                                                                                     <label className="text-xs font-bold text-gray-500 block mb-1">Fasilitator Pengampu</label>
// // // // // // //                                                                                                     {/* [FIX] Gunakan activeTeam */}
// // // // // // //                                                                                                     <select value={lesFacilitatorId} onChange={e => setLesFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm" aria-label="Pilih Fasilitator" title="Pilih Fasilitator">
// // // // // // //                                                                                                         <option value="">-- Sama dengan Modul ({getFacilitatorName(m.facilitatorId)}) --</option>
// // // // // // //                                                                                                         {activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}
// // // // // // //                                                                                                     </select>
// // // // // // //                                                                                                 </div>
// // // // // // //                                                                                                 <div>
// // // // // // //                                                                                                     <label className="text-xs font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label>
// // // // // // //                                                                                                     <input type="date" className="w-full border p-2 rounded text-sm" value={lesSchedule} onChange={e => setLesSchedule(e.target.value)} aria-label="Tanggal Materi" title="Tanggal Materi" />
// // // // // // //                                                                                                 </div>
// // // // // // //                                                                                             </div>
// // // // // // //                                                                                             <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e => setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib" title="Wajib" /><span>Materi ini wajib diselesaikan?</span></label>
                                                                                           
// // // // // // //                                                                                             {lesType === 'video_url' && (<div className="bg-white p-3 rounded border border-gray-200"><label className="text-xs font-bold text-gray-600 flex items-center gap-2 mb-1"><Video size={16}/> Link Video (YouTube)</label><input className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://youtube.com/watch?v=..." value={lesContent} onChange={e => setLesContent(e.target.value)} aria-label="Input URL Video" title="URL Video" /></div>)}
                                                                                           
// // // // // // //                                                                                             {/* [UPDATE] GANTI TEXTAREA DENGAN REACT QUILL EDITOR */}
// // // // // // //                                                                                             {['lesson', 'upload_doc'].includes(lesType) && (
// // // // // // //                                                                                                 <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
// // // // // // //                                                                                                     <ReactQuill
// // // // // // //                                                                                                         theme="snow"
// // // // // // //                                                                                                         value={lesContent}
// // // // // // //                                                                                                         onChange={setLesContent}
// // // // // // //                                                                                                         modules={quillModules}
// // // // // // //                                                                                                         placeholder={lesType === 'upload_doc' ? "Tulis instruksi tugas di sini..." : "Tulis materi lengkap di sini..."}
// // // // // // //                                                                                                         className="h-64 mb-12" // mb-12 untuk memberi ruang toolbar di mobile
// // // // // // //                                                                                                     />
// // // // // // //                                                                                                 </div>
// // // // // // //                                                                                             )}

// // // // // // //                                                                                             {lesType === 'essay' && (
// // // // // // //                                                                                                 <div className="space-y-4 bg-white p-4 rounded border border-blue-100">
// // // // // // //                                                                                                     <div className="flex items-center gap-2 mb-2 bg-amber-50 p-2 rounded border border-amber-100">
// // // // // // //                                                                                                         <label className="text-xs font-bold text-amber-800 flex items-center gap-2"><Clock size={14}/> Durasi Esai (Menit):</label>
// // // // // // //                                                                                                         <input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="p-1 border rounded w-20 text-sm" aria-label="Durasi Esai" title="Durasi Esai" />
// // // // // // //                                                                                                         <label className="text-xs ml-4 flex items-center gap-1 cursor-pointer"><input type="checkbox" checked={useEssayTimer} onChange={e => setUseEssayTimer(e.target.checked)} aria-label="Gunakan Timer" /> Gunakan Timer</label>
// // // // // // //                                                                                                     </div>
// // // // // // //                                                                                                     <h4 className="text-sm font-bold text-gray-700">Daftar Pertanyaan Esai:</h4>
// // // // // // //                                                                                                     {essayQuestions.map((q, idx) => (
// // // // // // //                                                                                                         <div key={idx} className="flex gap-2">
// // // // // // //                                                                                                             <span className="text-sm font-bold text-gray-500 py-2">{idx + 1}.</span>
// // // // // // //                                                                                                             <textarea
// // // // // // //                                                                                                                 className="flex-1 p-2 border rounded text-sm h-20"
// // // // // // //                                                                                                                 placeholder="Tulis pertanyaan..."
// // // // // // //                                                                                                                 value={q}
// // // // // // //                                                                                                                 onChange={e => updateEssay(idx, e.target.value)}
// // // // // // //                                                                                                                 aria-label={`Pertanyaan Esai ${idx + 1}`}
// // // // // // //                                                                                                                 title={`Pertanyaan Esai ${idx + 1}`}
// // // // // // //                                                                                                             />
// // // // // // //                                                                                                             {essayQuestions.length > 1 && (
// // // // // // //                                                                                                                 <button type="button" onClick={() => removeEssay(idx)} className="text-red-500 font-bold px-2 self-start mt-2" title="Hapus Pertanyaan" aria-label="Hapus Pertanyaan">✕</button>
// // // // // // //                                                                                                             )}
// // // // // // //                                                                                                         </div>
// // // // // // //                                                                                                     ))}
// // // // // // //                                                                                                     <button type="button" onClick={addEssayRow} className="text-xs font-bold text-blue-600 flex items-center gap-1" title="Tambah Pertanyaan"><Plus size={14}/> Tambah Pertanyaan</button>
// // // // // // //                                                                                                 </div>
// // // // // // //                                                                                             )}
                                                                                           
// // // // // // //                                                                                             {['image','download_doc','slide'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File ({lesType})</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Pilih File" title="Pilih File" /></div>)}
                                                                                           
// // // // // // //                                                                                             {lesType === 'upload_doc' && (
// // // // // // //                                                                                                 <div className="bg-white p-4 rounded border border-blue-50 mt-2">
// // // // // // //                                                                                                     <label className="block text-xs font-bold text-gray-600 mb-2">Lampirkan File Instruksi (Opsional)</label>
// // // // // // //                                                                                                     <input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Upload File Instruksi" title="Upload File Instruksi" />
// // // // // // //                                                                                                 </div>
// // // // // // //                                                                                             )}

// // // // // // //                                                                                             {lesType === 'virtual_class' && (<div className="bg-white p-4 rounded border border-blue-200 space-y-2"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><LinkIcon size={16}/> Link Meeting</label><input type="url" className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://meet.google.com/..." value={lesContent} onChange={e => setLesContent(e.target.value)} aria-label="Input Link Meeting" title="Link Meeting" /></div>)}
                                                                                           
// // // // // // //                                                                                             {lesType === 'quiz' && (
// // // // // // //                                                                                                 <div className="space-y-4 bg-white p-4 rounded border">
// // // // // // //                                                                                                     <div className="flex items-center gap-2 mb-2 bg-amber-50 p-2 rounded border border-amber-100">
// // // // // // //                                                                                                         <label className="text-xs font-bold text-amber-800">⏱ Durasi (Menit):</label>
// // // // // // //                                                                                                         <input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="p-1 border rounded w-20 text-sm" aria-label="Durasi Kuis" title="Durasi Kuis" />
// // // // // // //                                                                                                     </div>
// // // // // // //                                                                                                     {questions.map((q, ix) => (
// // // // // // //                                                                                                         <div key={ix} className="p-3 border rounded bg-gray-50 relative">
// // // // // // //                                                                                                             <button type="button" onClick={() => removeQuestion(ix)} className="absolute top-2 right-2 text-red-500 text-xs font-bold hover:underline" aria-label="Hapus Soal" title="Hapus Soal">Hapus</button>
// // // // // // //                                                                                                             <input className="w-full mb-2 p-2 border rounded" placeholder={`Pertanyaan ${ix+1}`} value={q.question} onChange={e=>updateQuestion(ix,'question',e.target.value)} aria-label={`Pertanyaan ${ix+1}`} title={`Pertanyaan ${ix+1}`} />
// // // // // // //                                                                                                             <div className="grid grid-cols-2 gap-2">
// // // // // // //                                                                                                                 {q.options.map((o:string,oi:number)=><input key={oi} className={`w-full p-1 border ${q.correctIndex===oi?'bg-green-100 border-green-400':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix,'options',e.target.value,oi)} aria-label={`Opsi ${oi+1}`} title={`Opsi ${oi+1}`} />)}
// // // // // // //                                                                                                             </div>
// // // // // // //                                                                                                             <div className="mt-2 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix,'correctIndex',Number(e.target.value))} className="border w-12 p-1 rounded" aria-label="Index Jawaban Benar" title="Index Jawaban Benar" /></div>
// // // // // // //                                                                                                         </div>
// // // // // // //                                                                                                     ))}
// // // // // // //                                                                                                     <button type="button" onClick={addQuestionRow} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-200">+ Tambah Soal</button>
// // // // // // //                                                                                                 </div>
// // // // // // //                                                                                             )}
                                                                                           
// // // // // // //                                                                                             {lesType === 'google_classroom' && (
// // // // // // //                                                                                                 <div className="bg-white p-4 rounded border border-green-200 space-y-3">
// // // // // // //                                                                                                     <div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Kelas" title="Refresh"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putuskan Akun" title="Putuskan"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google" title="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas" title="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas" title="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}
// // // // // // //                                                                                                 </div>
// // // // // // //                                                                                             )}

// // // // // // //                                                                                             {lesType === 'poll' && (
// // // // // // //                                                                                                 <div className="space-y-4 bg-white p-4 rounded border border-blue-100">
// // // // // // //                                                                                                     <input className="w-full p-2 border rounded text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} aria-label="Pertanyaan Polling" title="Pertanyaan Polling" />
// // // // // // //                                                                                                     {pollOptions.map((opt, idx) => (
// // // // // // //                                                                                                         <div key={idx} className="flex gap-2">
// // // // // // //                                                                                                             <input className="flex-1 p-2 border rounded text-sm" placeholder={`Opsi ${idx + 1}`} value={opt} onChange={e => updatePollOption(idx, e.target.value)} aria-label={`Opsi ${idx + 1}`} title={`Opsi ${idx + 1}`} />
// // // // // // //                                                                                                             {pollOptions.length > 2 && (<button type="button" onClick={() => removePollOption(idx)} className="text-red-500 font-bold px-2" aria-label="Hapus Opsi" title="Hapus Opsi">✕</button>)}
// // // // // // //                                                                                                         </div>
// // // // // // //                                                                                                     ))}
// // // // // // //                                                                                                     <button type="button" onClick={addPollOption} className="text-xs font-bold text-blue-600" aria-label="Tambah Opsi" title="Tambah Opsi">+ Tambah Opsi</button>
// // // // // // //                                                                                                 </div>
// // // // // // //                                                                                             )}

// // // // // // //                                                                                             <div className="flex justify-end gap-2"><button type="button" onClick={resetLessonForm} className="px-3 py-1 text-xs font-bold text-gray-500" aria-label="Batal" title="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-4 py-1 rounded text-xs font-bold" aria-label="Simpan" title="Simpan">Simpan</button></div>
// // // // // // //                                                                                     </div>
// // // // // // //                                                                                 ) : (
// // // // // // //                                                                                     <button type="button" onClick={()=>{setActiveModId(m._id); setLesType('lesson');}} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-xs hover:border-blue-300 hover:text-blue-600 transition-colors" aria-label="Tambah Konten" title="Tambah Konten">+ Tambah Konten</button>
// // // // // // //                                                                                 )}
// // // // // // //                                                                         </div>
// // // // // // //                                                                     )}
// // // // // // //                                                                 </Droppable>
// // // // // // //                                                         </div>
// // // // // // //                                                     )}
// // // // // // //                                                 </Draggable>
// // // // // // //                                             ))}
// // // // // // //                                             {provided.placeholder}
// // // // // // //                                     </div>
// // // // // // //                                 )}
// // // // // // //                             </Droppable>
// // // // // // //                         </DragDropContext>
// // // // // // //                     </section>
// // // // // // //                 </div>

// // // // // // //                 {/* --- FLOATING DASHBOARD --- */}
// // // // // // //                 <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
// // // // // // //                     <button type="button" onClick={() => { setShowTeamChat(true); }} className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 hover:text-white border border-gray-200 transition-transform hover:scale-105 flex items-center gap-2 group relative" title="Chat Tim" aria-label="Chat Tim"><MessageSquare size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Diskusi Tim</span></button>
// // // // // // //                     <button type="button" onClick={() => { setShowParticipantChat(true); fetchParticipants(); }} className="bg-emerald-600 text-white p-4 rounded-full shadow-xl hover:bg-emerald-700 flex items-center gap-2 transition-transform hover:scale-105 group relative" title="Chat Peserta" aria-label="Chat Peserta"><MessageCircle size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Chat Peserta</span></button>
// // // // // // //                     <button type="button" onClick={() => setShowPreviewModal(true)} className="bg-white text-gray-700 p-4 rounded-full shadow-xl hover:bg-gray-50 border border-gray-200 transition-transform hover:scale-105 flex items-center gap-2 group relative" title="Preview" aria-label="Preview Kelas"><Eye size={24} className="text-purple-600"/><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Preview Kelas</span></button>
// // // // // // //                     <button type="button" onClick={() => { setShowParticipantModal(true); fetchParticipants(); }} className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 flex items-center gap-2 transition-transform hover:scale-105 group relative" aria-label="Manajemen Peserta" title="Manajemen Peserta"><Users size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Manajemen Peserta</span></button>
// // // // // // //                 </div>

// // // // // // //                 {/* --- MODALS --- */}
// // // // // // //                 {showPreviewModal && (<div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200"><div className="bg-white w-[95vw] h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"><div className="bg-gray-900 text-white p-3 flex justify-between items-center px-6"><h3 className="font-bold flex items-center gap-2"><Eye size={18}/> Preview Mode</h3><div className="flex gap-3"><button type="button" onClick={() => window.open(`/courses/${courseId}`, '_blank', 'noopener,noreferrer')} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded flex items-center gap-1 transition-colors" aria-label="Buka di Tab Baru" title="Buka di Tab Baru"><ExternalLink size={14}/> Buka Tab Baru</button><button type="button" onClick={() => setShowPreviewModal(false)} className="text-gray-400 hover:text-white" aria-label="Tutup Preview" title="Tutup"><X size={24}/></button></div></div><div className="flex-1 bg-gray-100"><iframe src={`/courses/${courseId}`} className="w-full h-full border-0" title="Course Preview" /></div></div></div>)}

// // // // // // //                 {showParticipantModal && (
// // // // // // //                     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
// // // // // // //                         <div className="bg-white w-full max-w-6xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
// // // // // // //                             <div className="p-6 border-b flex justify-between items-center bg-gray-50">
// // // // // // //                                 <div><h2 className="text-xl font-bold text-gray-800">Manajemen Peserta</h2><p className="text-xs text-gray-500">Kelola kelulusan dan reset kuis.</p></div>
// // // // // // //                                 <button type="button" onClick={() => setShowParticipantModal(false)} className="bg-white p-2 rounded-full shadow hover:bg-gray-100" aria-label="Tutup Modal" title="Tutup"><X size={20}/></button>
// // // // // // //                             </div>
                           
// // // // // // //                             <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex flex-wrap gap-4 items-center justify-between">
// // // // // // //                                 <div className="flex items-center gap-3">
// // // // // // //                                     <span className="text-xs font-bold text-indigo-800">🛠 Aksi Massal:</span>
// // // // // // //                                     <select className="p-2 border rounded-lg text-sm bg-white min-w-[250px]" value={selectedActionId} onChange={e=>setSelectedActionId(e.target.value)} aria-label="Pilih Materi Aksi" title="Pilih Materi Aksi">
// // // // // // //                                         <option value="">-- Pilih Materi / Kuis --</option>
// // // // // // //                                         {actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
// // // // // // //                                     </select>
// // // // // // //                                 </div>
// // // // // // //                                 <div className="relative">
// // // // // // //                                     <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // // // // // //                                     <input className="pl-10 pr-4 py-2 rounded-full border border-gray-300 text-sm w-64 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Cari peserta..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} aria-label="Cari Peserta" title="Cari Peserta" />
// // // // // // //                                 </div>
// // // // // // //                             </div>

// // // // // // //                             <div className="flex-1 overflow-y-auto p-0 bg-gray-50/50">
// // // // // // //                                 {loadingParticipants ? (<div className="flex justify-center items-center h-full text-gray-400">Memuat data...</div>) : participants.length === 0 ? (<div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2"><Users size={48} className="opacity-20"/><p>Belum ada peserta.</p></div>) : (
// // // // // // //                                     <table className="w-full text-left border-collapse">
// // // // // // //                                         <thead className="bg-gray-100 sticky top-0 z-10 text-xs font-bold text-gray-600"><tr className="border-b"><th className="p-4">Peserta</th><th className="p-4">Tanggal Gabung</th><th className="p-4 text-center">Progres</th><th className="p-4 text-center">Aksi Konteks</th><th className="p-4 text-center">Chat</th><th className="p-4 text-center">Detail</th></tr></thead>
// // // // // // //                                         <tbody className="text-sm bg-white divide-y">
// // // // // // //                                             {participants.filter(p => (p.user?.name || p.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => {
// // // // // // //                                                 const userObj = p.user || p.student || p.participant || p;
// // // // // // //                                                 const name = userObj.name || 'Tanpa Nama';
// // // // // // //                                                 const email = userObj.email || '-';
// // // // // // //                                                 const dateRaw = p.joinedAt || p.createdAt || p.enrolledAt || userObj.joinedAt;
// // // // // // //                                                 const joinDate = dateRaw && !isNaN(new Date(dateRaw).getTime()) ? new Date(dateRaw).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';
// // // // // // //                                                 const selectedActionItem = actionOptions.find(o => o.id === selectedActionId);
// // // // // // //                                                 const isCompleted = selectedActionId && p.completedLessons?.includes(selectedActionId);

// // // // // // //                                                 return (
// // // // // // //                                                     <tr key={idx} className="hover:bg-blue-50 transition-colors">
// // // // // // //                                                         <td className="p-4 font-bold text-gray-800 flex items-center gap-3">
// // // // // // //                                                             <div className="relative">
// // // // // // //                                                                 {userObj.avatarUrl ? (<img src={getImageUrl(userObj.avatarUrl)} alt={name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />) : (<div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-200">{name.charAt(0).toUpperCase()}</div>)}
// // // // // // //                                                             </div>
// // // // // // //                                                             <div>
// // // // // // //                                                                 <div>{name}</div>
// // // // // // //                                                                 <div className="text-[10px] text-gray-400 font-normal flex items-center gap-1"><Mail size={10}/> {email}</div>
// // // // // // //                                                             </div>
// // // // // // //                                                         </td>
// // // // // // //                                                         <td className="p-4 text-xs text-gray-500">{joinDate}</td>
// // // // // // //                                                         <td className="p-4 text-center">
// // // // // // //                                                             <div className="w-24 bg-gray-200 rounded-full h-2 mx-auto overflow-hidden">
// // // // // // //                                                                 <div className="bg-green-500 h-2 rounded-full" style={{width: `${p.progress || 0}%`}}></div>
// // // // // // //                                                             </div>
// // // // // // //                                                             <span className="text-[10px] text-gray-500 mt-1 block">{p.progress || 0}%</span>
// // // // // // //                                                         </td>
// // // // // // //                                                         <td className="p-4 text-center">
// // // // // // //                                                             {selectedActionItem ? (
// // // // // // //                                                                 <button 
// // // // // // //                                                                     type="button"
// // // // // // //                                                                     onClick={() => handleParticipantAction(userObj._id, selectedActionItem.type === 'quiz' ? 'reset' : 'pass')} 
// // // // // // //                                                                     disabled={selectedActionItem.type !== 'quiz' && isCompleted}
// // // // // // //                                                                     className={`px-3 py-1 rounded text-xs font-bold border transition-all flex items-center gap-1 mx-auto ${isCompleted ? 'bg-green-100 text-green-700 border-green-200 cursor-default' : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50'}`}
// // // // // // //                                                                     aria-label="Aksi Peserta" title={selectedActionItem.type === 'quiz' ? 'Reset Kuis' : 'Luluskan Manual'}
// // // // // // //                                                                 >
// // // // // // //                                                                     {selectedActionItem.type === 'quiz' ? '↺ Reset' : (isCompleted ? '✓ Lulus' : '⚡ Luluskan')}
// // // // // // //                                                                 </button>
// // // // // // //                                                             ) : <span className="text-gray-300 text-xs">-</span>}
// // // // // // //                                                         </td>
// // // // // // //                                                         <td className="p-4 text-center"><button type="button" onClick={() => setChatTargetStudent({ name, email, _id: userObj._id })} className="p-2 rounded-full text-blue-500 hover:bg-blue-50 hover:scale-110 transition-all border border-transparent hover:border-blue-100" aria-label="Chat Peserta" title="Chat"><MessageSquare size={18}/></button></td>
// // // // // // //                                                         <td className="p-4 text-center"><button type="button" onClick={() => handleViewStudentDetail(userObj)} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-600" aria-label="Lihat Detail" title="Detail"><Eye size={18}/></button></td>
// // // // // // //                                                     </tr>
// // // // // // //                                                 );
// // // // // // //                                             })}
// // // // // // //                                         </tbody>
// // // // // // //                                     </table>
// // // // // // //                                 )}
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 )}

// // // // // // //                 {/* --- CHAT MODALS (GLOBAL ROOM STYLE) --- */}
// // // // // // //                 {showParticipantChat && (<RoomChatModal title="Global Room (Peserta)" members={[...chatMembers, ...teamMembers]} onClose={() => setShowParticipantChat(false)} themeColor="bg-red-700" />)}
// // // // // // //                 {showTeamChat && (<RoomChatModal title="Diskusi Tim Fasilitator" members={teamMembers} onClose={() => setShowTeamChat(false)} themeColor="bg-blue-600" />)}
// // // // // // //                 {chatTargetStudent && (
// // // // // // //                     <div className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-4">
// // // // // // //                         <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
// // // // // // //                             <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
// // // // // // //                                 <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold border-2 border-white/30">{chatTargetStudent.name.charAt(0)}</div><div><h3 className="font-bold text-sm leading-tight">{chatTargetStudent.name}</h3><p className="text-[10px] opacity-80">{chatTargetStudent.email}</p></div></div>
// // // // // // //                                 <button type="button" onClick={() => setChatTargetStudent(null)} className="hover:bg-blue-700 p-2 rounded-full font-bold" aria-label="Tutup Chat"><X size={18}/></button>
// // // // // // //                             </div>
// // // // // // //                             <div className="flex-1 p-4 bg-gray-100 overflow-y-auto space-y-3"><div className="flex justify-center"><span className="text-[10px] text-gray-400 bg-gray-200 px-2 py-1 rounded-full">Hari ini</span></div><div className="flex justify-start"><div className="bg-white p-3 rounded-xl rounded-bl-none text-sm shadow-sm max-w-[80%] text-gray-700">Halo {chatTargetStudent.name}, ada yang bisa dibantu?</div></div></div>
// // // // // // //                             <div className="p-3 bg-white border-t flex gap-2"><input className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis pesan..." /><button type="button" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700" aria-label="Kirim"><Send size={18}/></button></div>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 )}

// // // // // // //                 {/* --- [NEW] WALL OF FAME MODAL (FULL HISTORY) --- */}
// // // // // // //                 {showWallOfFameModal && (
// // // // // // //                     <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
// // // // // // //                         <div className="bg-white w-full max-w-lg h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // // // // // //                             <div className="bg-yellow-500 p-4 text-white flex justify-between items-center shadow-md">
// // // // // // //                                 <h3 className="font-bold text-lg flex items-center gap-2"><Trophy size={20}/> Wall of Fame History</h3>
// // // // // // //                                 <button type="button" onClick={() => setShowWallOfFameModal(false)} className="hover:bg-yellow-600 p-2 rounded-full" aria-label="Tutup"><X size={24}/></button>
// // // // // // //                             </div>
// // // // // // //                             <div className="flex-1 p-4 overflow-y-auto bg-yellow-50 space-y-3">
// // // // // // //                                 {recentCompletions.length > 0 ? recentCompletions.map((rc:any, i:number) => (
// // // // // // //                                     <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
// // // // // // //                                         <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold"><Award size={20}/></div>
// // // // // // //                                         <div>
// // // // // // //                                             <p className="font-bold text-gray-800">{rc.name}</p>
// // // // // // //                                             <p className="text-xs text-gray-500">Menyelesaikan {rc.module} pada {rc.date || 'Hari ini'}</p>
// // // // // // //                                         </div>
// // // // // // //                                     </div>
// // // // // // //                                 )) : <div className="text-center text-gray-400 mt-10">Belum ada data kelulusan.</div>}
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 )}

// // // // // // //                 {/* --- [NEW] STUDENT DETAIL MODAL (REVIEW ANSWERS) --- */}
// // // // // // //                 {showStudentDetailModal && studentDetail && (
// // // // // // //                     <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
// // // // // // //                         <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // // // // // //                             <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
// // // // // // //                                 <div className="flex items-center gap-3">
// // // // // // //                                     <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">{studentDetail.name?.charAt(0)}</div>
// // // // // // //                                     <div>
// // // // // // //                                         <h3 className="font-bold text-lg">{studentDetail.name}</h3>
// // // // // // //                                         <p className="text-xs opacity-80">{studentDetail.email}</p>
// // // // // // //                                     </div>
// // // // // // //                                 </div>
// // // // // // //                                 <button type="button" onClick={() => setShowStudentDetailModal(false)} className="hover:bg-indigo-700 p-2 rounded-full" aria-label="Tutup"><X size={24}/></button>
// // // // // // //                             </div>
// // // // // // //                             <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
// // // // // // //                                 <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><FileText size={18}/> Riwayat Pengerjaan & Upload</h4>
// // // // // // //                                 <div className="space-y-4">
// // // // // // //                                     {/* Placeholder untuk detail jawaban - Di real app, fetch data jawaban spesifik siswa ini */}
// // // // // // //                                     <div className="p-4 bg-white border rounded-xl shadow-sm">
// // // // // // //                                         <p className="text-sm font-bold text-gray-800 mb-2">Tugas Upload: Modul 1</p>
// // // // // // //                                         <a href="#" className="text-blue-600 text-xs hover:underline flex items-center gap-1"><Download size={12}/> Download File Tugas</a>
// // // // // // //                                     </div>
// // // // // // //                                     <div className="p-4 bg-white border rounded-xl shadow-sm">
// // // // // // //                                         <p className="text-sm font-bold text-gray-800 mb-2">Esai: Modul 2</p>
// // // // // // //                                         <p className="text-xs text-gray-600 italic">"Jawaban siswa akan muncul di sini..."</p>
// // // // // // //                                     </div>
// // // // // // //                                     <p className="text-center text-gray-400 text-xs mt-4">Fitur review detail sedang dalam pengembangan backend.</p>
// // // // // // //                                 </div>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 )}

// // // // // // //                 <div className="border-t-4 border-gray-100 pt-8"></div>
// // // // // // //                 <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
// // // // // // //                     <div className="flex justify-between items-start mb-6">
// // // // // // //                         <h2 className="text-2xl font-bold text-gray-800">🎓 Pengaturan Sertifikat</h2>
// // // // // // //                         {/* [UPDATE] TIPS FORMAT OTOMATIS */}
// // // // // // //                         <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg text-xs font-medium border border-blue-200 max-w-md shadow-sm">
// // // // // // //                             <div className="flex gap-2 items-start">
// // // // // // //                                 <Info size={16} className="shrink-0 mt-0.5"/>
// // // // // // //                                 <div>
// // // // // // //                                     <strong>Format Nomor Otomatis:</strong><br/>
// // // // // // //                                     Gunakan placeholder <code>{'{NO}'}</code> agar nomor urut peserta terisi otomatis.<br/>
// // // // // // //                                     Format Standard: <code>00{'{NO}'}/DIKLAT/02.01.2026/I/2026</code>
// // // // // // //                                 </div>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     </div>

// // // // // // //                     <CertificateConfigForm initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} />
                    
// // // // // // //                     {/* [NEW] TABEL KONFIRMASI DATA SERTIFIKAT TERSIMPAN */}
// // // // // // //                     {certConfig && (
// // // // // // //                         <div className="mt-8 border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 shadow-sm">
// // // // // // //                             <div className="bg-gray-100 px-4 py-3 border-b flex items-center gap-2 font-bold text-gray-700 text-sm">
// // // // // // //                                 <FileBadge size={16}/> Data Konfigurasi Tersimpan (Preview)
// // // // // // //                             </div>
// // // // // // //                             <div className="p-4 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
// // // // // // //                                 <div>
// // // // // // //                                     <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Hash size={12}/> Format Nomor</p>
// // // // // // //                                     <p className="font-mono bg-white border px-3 py-2 rounded text-gray-800 shadow-sm">{certConfig.certificateNumber || '-'}</p>
// // // // // // //                                 </div>
// // // // // // //                                 <div>
// // // // // // //                                     <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar size={12}/> Tanggal Pelaksanaan</p>
// // // // // // //                                     <p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.executionDate ? new Date(certConfig.executionDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '-'}</p>
// // // // // // //                                 </div>
// // // // // // //                                 <div>
// // // // // // //                                     <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MapPin size={12}/> Kota Penerbit</p>
// // // // // // //                                     <p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.city || '-'}</p>
// // // // // // //                                 </div>
// // // // // // //                                 <div>
// // // // // // //                                     <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><UserCheck size={12}/> Penanda Tangan</p>
// // // // // // //                                     <p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.signatoryName} <span className="font-normal text-gray-500 text-xs block">({certConfig.signatoryPosition})</span></p>
// // // // // // //                                 </div>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     )}

// // // // // // //                     <div className="my-10 border-t border-gray-100"></div>
// // // // // // //                     <CompetencyForm initialData={competencies} onChange={(data) => setCompetencies(data)} />
// // // // // // //                     <div className="mt-4 flex items-center gap-2 bg-gray-50 p-3 rounded-lg border"><input type="checkbox" id="includeComp" checked={includeCompetencies} onChange={(e) => setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Sertakan Kompetensi" title="Sertakan Kompetensi" /><label htmlFor="includeComp" className="text-sm font-bold text-gray-700 cursor-pointer">Tampilkan daftar kompetensi di halaman belakang sertifikat?</label></div>
// // // // // // //                     <div className="mt-4 flex justify-end"><button type="button" onClick={handleSaveCompetencies} disabled={isSavingCompetencies} className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi" title="Simpan">Simpan Kompetensi</button></div>
// // // // // // //                 </section>
       
// // // // // // //                 <div className="mt-8 p-6 bg-gray-50 rounded-3xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3">
// // // // // // //                     <h3 className="text-lg font-bold text-gray-800">Selesai?</h3>
// // // // // // //                     <button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Ubah Status Publikasi" title="Ubah Status">{course?.isPublished ? 'Tarik Kembali ke Draft' : '🚀 PUBLISH SEKARANG'}</button>
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         </Protected>
// // // // // // //     );
// // // // // // // }
// // // // // // 'use client';

// // // // // // import { useEffect, useState, useRef, useMemo } from 'react';
// // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // import Protected from '@/components/Protected';
// // // // // // import CompetencyForm from '@/components/admin/CompetencyForm';
// // // // // // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // // // // // import {
// // // // // //     Calendar, School, RefreshCw, LogOut, CheckCircle2, Video,
// // // // // //     Link as LinkIcon, Users, Eye, MessageSquare, MessageCircle, X, Send, MoreHorizontal, ExternalLink,
// // // // // //     Search, User as UserIcon, Mail, Smile, Trophy, Award, Plus, Trash2, Clock, Paperclip, FileText, Download,
// // // // // //     FileBadge, MapPin, UserCheck, Hash, Info
// // // // // // } from 'lucide-react';

// // // // // // import dynamic from 'next/dynamic';
// // // // // // import 'react-quill/dist/quill.snow.css'; 

// // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // //     ssr: false,
// // // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // // });

// // // // // // // --- HELPER: ROMAN NUMERALS & DATE FORMAT ---
// // // // // // const getRomanMonth = (date: Date) => {
// // // // // //     const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
// // // // // //     return romans[date.getMonth()];
// // // // // // };

// // // // // // const generateDefaultCertFormat = () => {
// // // // // //     const now = new Date();
// // // // // //     const dd = String(now.getDate()).padStart(2, '0');
// // // // // //     const mm = String(now.getMonth() + 1).padStart(2, '0');
// // // // // //     const yyyy = now.getFullYear();
// // // // // //     const roman = getRomanMonth(now);
    
// // // // // //     // FORMAT: 00{NO}/DIKLAT/dd.mm.yyyy/ROMAWI/yyyy
// // // // // //     return `00{NO}/DIKLAT/${dd}.${mm}.${yyyy}/${roman}/${yyyy}`;
// // // // // // };

// // // // // // // --- COMPONENT: ROOM CHAT MODAL ---
// // // // // // function RoomChatModal({ title, members, onClose, themeColor = 'bg-red-700' }: any) {
// // // // // //     const [messages, setMessages] = useState<any[]>([]);
// // // // // //     const [newMessage, setNewMessage] = useState('');
// // // // // //     const [showEmoji, setShowEmoji] = useState(false);
// // // // // //     const [mentionQuery, setMentionQuery] = useState<string | null>(null);
// // // // // //     const fileInputRef = useRef<HTMLInputElement>(null);
    
// // // // // //     const messagesEndRef = useRef<HTMLDivElement>(null);
// // // // // //     const inputRef = useRef<HTMLInputElement>(null);
// // // // // //     const emojis = ["😀", "😂", "🥰", "😎", "🤔", "👍", "👎", "❤️", "🔥", "🎉", "📚", "✅", "💡", "🤝", "🙏", "💪"];

// // // // // //     useEffect(() => {
// // // // // //         setMessages([{ id: 1, sender: 'System', text: `Selamat datang di ${title}`, time: '08:00', isMe: false, isSystem: true }]);
// // // // // //     }, [title]);

// // // // // //     const handleSend = (e: any) => {
// // // // // //         e.preventDefault();
// // // // // //         if(!newMessage.trim()) return;
// // // // // //         setMessages([...messages, { id: Date.now(), sender: 'Saya', text: newMessage, time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), isMe: true }]);
// // // // // //         setNewMessage('');
// // // // // //         setShowEmoji(false);
// // // // // //         setMentionQuery(null);
// // // // // //         setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
// // // // // //     };

// // // // // //     const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //         const file = e.target.files?.[0];
// // // // // //         if (file) {
// // // // // //             setMessages([...messages, {
// // // // // //                 id: Date.now(),
// // // // // //                 sender: 'Saya',
// // // // // //                 text: `Mengirim file: ${file.name}`,
// // // // // //                 isAttachment: true,
// // // // // //                 time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}),
// // // // // //                 isMe: true
// // // // // //             }]);
// // // // // //         }
// // // // // //     };

// // // // // //     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //         const val = e.target.value;
// // // // // //         setNewMessage(val);
// // // // // //         const lastWord = val.split(' ').pop();
// // // // // //         if (lastWord && lastWord.startsWith('@') && lastWord.length > 1) { setMentionQuery(lastWord.substring(1)); } else { setMentionQuery(null); }
// // // // // //     };

// // // // // //     const addEmoji = (emoji: string) => { setNewMessage(prev => prev + emoji); inputRef.current?.focus(); };
// // // // // //     const addMention = (name: string) => { const words = newMessage.split(' '); words.pop(); setNewMessage(words.join(' ') + ` @${name} `); setMentionQuery(null); inputRef.current?.focus(); };
// // // // // //     const filteredMembers = mentionQuery ? members.filter((m: any) => (m.name || 'User').toLowerCase().includes(mentionQuery.toLowerCase())) : [];

// // // // // //     return (
// // // // // //         <div className="fixed inset-0 bg-black/60 z-[80] flex items-center justify-center p-4 animate-in fade-in duration-200">
// // // // // //             <div className="bg-white w-full max-w-6xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative">
// // // // // //                 <div className={`${themeColor} p-4 text-white flex justify-between items-center shadow-md shrink-0`}>
// // // // // //                     <div className="flex items-center gap-3"><div className="bg-white/20 p-2 rounded-full"><MessageCircle size={20} aria-hidden="true"/></div><div><h3 className="font-bold text-lg">{title}</h3><p className="text-[10px] opacity-90">{members.length} Anggota Terdaftar</p></div></div>
// // // // // //                     <button type="button" onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Tutup Chat" title="Tutup"><X size={24}/></button>
// // // // // //                 </div>
// // // // // //                 <div className="flex flex-1 overflow-hidden relative">
// // // // // //                     <div className="flex-1 flex flex-col bg-gray-100 relative">
// // // // // //                         <div className="flex-1 p-4 overflow-y-auto space-y-4" onClick={() => { setShowEmoji(false); setMentionQuery(null); }}>
// // // // // //                             {messages.map((msg) => (
// // // // // //                                 <div key={msg.id} className={`flex ${msg.isSystem ? 'justify-center' : (msg.isMe ? 'justify-end' : 'justify-start')}`}>
// // // // // //                                     {msg.isSystem ? (<span className="text-xs bg-gray-200 text-gray-500 px-3 py-1 rounded-full">{msg.text}</span>) : (
// // // // // //                                         <div className={`max-w-[75%] flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
// // // // // //                                             <div className={`px-4 py-2.5 rounded-xl text-sm shadow-sm ${msg.isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border'}`}>
// // // // // //                                                 {!msg.isMe && <div className="text-[10px] font-bold opacity-70 mb-1 text-blue-600">{msg.sender}</div>}
// // // // // //                                                 {msg.isAttachment ? <div className="flex items-center gap-2 italic text-gray-600"><Paperclip size={14}/> {msg.text}</div> : <p className="leading-relaxed">{msg.text}</p>}
// // // // // //                                             </div>
// // // // // //                                             <span className="text-[10px] text-gray-400 mt-1 mx-1">{msg.time}</span>
// // // // // //                                         </div>
// // // // // //                                     )}
// // // // // //                                 </div>
// // // // // //                             ))}
// // // // // //                             <div ref={messagesEndRef}/>
// // // // // //                         </div>
// // // // // //                         {mentionQuery !== null && filteredMembers.length > 0 && (<div className="absolute bottom-20 left-4 bg-white border shadow-xl rounded-lg max-h-48 overflow-y-auto w-64 z-20 animate-in slide-in-from-bottom-2"><div className="p-2 bg-gray-50 text-[10px] font-bold text-gray-500 uppercase">Mention Pengguna</div>{filteredMembers.map((m: any, i: number) => (<button type="button" key={i} onClick={() => addMention(m.name)} className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm flex items-center gap-2 border-b last:border-0"><div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">{m.name?.charAt(0)}</div><span className="truncate font-medium">{m.name}</span></button>))}</div>)}
// // // // // //                         {showEmoji && (<div className="absolute bottom-16 left-2 bg-white border shadow-xl rounded-xl p-3 grid grid-cols-4 gap-2 z-20 w-64 animate-in zoom-in-95">{emojis.map(e => (<button type="button" key={e} onClick={() => addEmoji(e)} className="text-2xl hover:bg-gray-100 p-2 rounded transition" aria-label={`Emoji ${e}`}>{e}</button>))}</div>)}
// // // // // //                         <div className="p-3 bg-white border-t flex gap-3 items-center relative z-10">
// // // // // //                             <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100" aria-label="Lampirkan File" title="Lampirkan File"><Paperclip size={20}/></button>
// // // // // //                             <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} title="Upload File" aria-label="Upload File" />
// // // // // //                             <button type="button" onClick={() => setShowEmoji(!showEmoji)} className={`p-2 rounded-full transition-colors ${showEmoji ? 'bg-yellow-100 text-yellow-600' : 'text-gray-400 hover:text-gray-600'}`} aria-label="Buka Emoticon" title="Buka Emoticon"><Smile size={24}/></button>
// // // // // //                             <form onSubmit={handleSend} className="flex-1 flex gap-2">
// // // // // //                                 <input ref={inputRef} className="flex-1 bg-gray-100 border-0 rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="Ketik pesan... (Gunakan @ untuk mention)" value={newMessage} onChange={handleInputChange} aria-label="Input pesan chat" title="Input pesan chat" />
// // // // // //                                 <button type="submit" className={`${themeColor} text-white p-3 rounded-full hover:opacity-90 shadow-lg transition-transform active:scale-95 disabled:opacity-50`} disabled={!newMessage.trim()} aria-label="Kirim Pesan" title="Kirim Pesan"><Send size={18}/></button>
// // // // // //                             </form>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                     <div className="w-80 bg-white border-l border-gray-200 flex flex-col shrink-0 hidden md:flex">
// // // // // //                         <div className="p-4 border-b bg-gray-50 flex justify-between items-center"><h4 className="font-bold text-gray-700 flex items-center gap-2 text-sm"><Users size={16}/> Peserta ({members.length})</h4></div>
// // // // // //                         <div className="flex-1 overflow-y-auto p-2 space-y-1">
// // // // // //                             {members.map((member: any, idx: number) => {
// // // // // //                                 const name = member.name || member.user?.name || 'User';
// // // // // //                                 const role = member.role || (member.user ? 'Student' : 'Facilitator');
// // // // // //                                 const avatar = member.avatarUrl || member.user?.avatarUrl || member.image;
// // // // // //                                 const isFacilitator = role === 'Facilitator' || role === 'SUPER_ADMIN';
// // // // // //                                 return (
// // // // // //                                     <div key={idx} className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors group cursor-default">
// // // // // //                                         <div className="relative shrink-0">{avatar ? (<img src={getImageUrl(avatar)} alt={name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />) : (<div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border ${isFacilitator ? 'bg-orange-100 text-orange-600 border-orange-200' : 'bg-green-100 text-green-600 border-green-200'}`}>{name.charAt(0).toUpperCase()}</div>)}<span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span></div>
// // // // // //                                         <div className="flex-1 min-w-0"><p className="text-sm font-bold text-gray-800 truncate">{name}</p><p className={`text-[10px] truncate ${isFacilitator ? 'text-orange-600 font-semibold' : 'text-gray-500'}`}>{isFacilitator ? 'Fasilitator' : 'Peserta'}</p></div>
// // // // // //                                     </div>
// // // // // //                                 )
// // // // // //                             })}
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // }

// // // // // // // --- MAIN PAGE ---
// // // // // // export default function AdminCourseDetailPage() {
// // // // // //     const params = useParams();
// // // // // //     const courseId = params?.id as string;
// // // // // //     const router = useRouter();
// // // // // //     const fileInputRef = useRef<HTMLInputElement>(null);

// // // // // //     const [course, setCourse] = useState<any>(null);
// // // // // //     const [loading, setLoading] = useState(true);
// // // // // //     const [isBrowser, setIsBrowser] = useState(false);
// // // // // //     const [isUploadingCover, setIsUploadingCover] = useState(false);
// // // // // //     const [notification, setNotification] = useState<string | null>(null);

// // // // // //     const [showParticipantModal, setShowParticipantModal] = useState(false);
// // // // // //     const [showParticipantChat, setShowParticipantChat] = useState(false);
// // // // // //     const [showTeamChat, setShowTeamChat] = useState(false);
// // // // // //     const [showPreviewModal, setShowPreviewModal] = useState(false);
// // // // // //     const [showWallOfFameModal, setShowWallOfFameModal] = useState(false);
// // // // // //     const [showStudentDetailModal, setShowStudentDetailModal] = useState(false); 
// // // // // //     const [studentDetail, setStudentDetail] = useState<any>(null);
   
// // // // // //     const [participants, setParticipants] = useState<any[]>([]);
// // // // // //     const [loadingParticipants, setLoadingParticipants] = useState(false);
// // // // // //     const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);
   
// // // // // //     const [chatMembers, setChatMembers] = useState<any[]>([]);
// // // // // //     const [teamMembers, setTeamMembers] = useState<any[]>([]);
// // // // // //     const [recentCompletions, setRecentCompletions] = useState<any[]>([]);

// // // // // //     const [participantFilter, setParticipantFilter] = useState('');
// // // // // //     const [actionOptions, setActionOptions] = useState<any[]>([]);
// // // // // //     const [selectedActionId, setSelectedActionId] = useState<string>('');

// // // // // //     const [facilitators, setFacilitators] = useState<any[]>([]);
// // // // // //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>([]);
// // // // // //     const [currentUserRole, setCurrentUserRole] = useState('');
// // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
   
// // // // // //     // Content State
// // // // // //     const [showModuleForm, setShowModuleForm] = useState(false);
// // // // // //     const [modTitle, setModTitle] = useState('');
// // // // // //     const [modIsMandatory, setModIsMandatory] = useState(true);
// // // // // //     const [modFacilitatorId, setModFacilitatorId] = useState('');
// // // // // //     const [modJp, setModJp] = useState(0);
// // // // // //     const [modSchedule, setModSchedule] = useState('');
// // // // // //     const [editingModId, setEditingModId] = useState<string | null>(null);
   
// // // // // //     const [activeModId, setActiveModId] = useState<string | null>(null);
// // // // // //     const [editingLesId, setEditingLesId] = useState<string | null>(null);
// // // // // //     const [lesTitle, setLesTitle] = useState('');
// // // // // //     const [lesType, setLesType] = useState('lesson');
// // // // // //     const [lesContent, setLesContent] = useState('');
// // // // // //     const [lesIsMandatory, setLesIsMandatory] = useState(true);
// // // // // //     const [lesJp, setLesJp] = useState(0);
// // // // // //     const [lesSchedule, setLesSchedule] = useState('');
// // // // // //     const [lesFacilitatorId, setLesFacilitatorId] = useState('');

// // // // // //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// // // // // //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// // // // // //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// // // // // //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// // // // // //     const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // // // //     const [uploading, setUploading] = useState(false);
// // // // // //     const [quizDuration, setQuizDuration] = useState(10);
// // // // // //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// // // // // //     const [pollQuestion, setPollQuestion] = useState('');
// // // // // //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
   
// // // // // //     // Essay State
// // // // // //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// // // // // //     const [useEssayTimer, setUseEssayTimer] = useState(false);

// // // // // //     const [competencies, setCompetencies] = useState<any[]>([]);
// // // // // //     const [includeCompetencies, setIncludeCompetencies] = useState(true);
// // // // // //     const [certConfig, setCertConfig] = useState<any>(null);
// // // // // //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// // // // // //     const [isSavingCert, setIsSavingCert] = useState(false);

// // // // // //     // List Tim Yang Dipilih
// // // // // //     const activeTeam = facilitators.filter(f => selectedFacilitatorIds.includes(f._id));

// // // // // //     // --- KONFIGURASI EDITOR QUILL ---
// // // // // //     const quillModules = useMemo(() => ({
// // // // // //         toolbar: {
// // // // // //             container: [
// // // // // //                 [{ 'header': [1, 2, 3, false] }],
// // // // // //                 ['bold', 'italic', 'underline', 'strike', 'blockquote'],
// // // // // //                 [{'list': 'ordered'}, {'list': 'bullet'}],
// // // // // //                 ['link', 'image', 'video'], 
// // // // // //                 [{ 'color': [] }, { 'background': [] }],
// // // // // //                 ['clean']
// // // // // //             ]
// // // // // //         }
// // // // // //     }), []);

// // // // // //     useEffect(() => {
// // // // // //         setIsBrowser(true);
// // // // // //         if (typeof window !== 'undefined') {
// // // // // //             const userStr = localStorage.getItem('user');
// // // // // //             if (userStr) {
// // // // // //                 const user = JSON.parse(userStr);
// // // // // //                 setCurrentUserRole(user.role);
// // // // // //             }
// // // // // //             const savedToken = localStorage.getItem('google_class_token');
// // // // // //             if (savedToken) {
// // // // // //                 setGoogleToken(savedToken);
// // // // // //                 fetchClassroomCourses(savedToken);
// // // // // //             }
// // // // // //         }
// // // // // //         if (courseId) load();
// // // // // //     }, [courseId]);

// // // // // //     useEffect(() => {
// // // // // //         const checkToken = () => {
// // // // // //             const tokenStr = localStorage.getItem('google_class_token');
// // // // // //             if (tokenStr && tokenStr !== googleToken) {
// // // // // //                 setGoogleToken(tokenStr);
// // // // // //                 fetchClassroomCourses(tokenStr);
// // // // // //             }
// // // // // //         };
// // // // // //         checkToken();
// // // // // //         const handleStorage = (event: StorageEvent) => { if (event.key === 'google_class_token') checkToken(); };
// // // // // //         const interval = setInterval(checkToken, 2000);
// // // // // //         window.addEventListener('storage', handleStorage);
// // // // // //         const handleMessage = (event: MessageEvent) => { if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') checkToken(); };
// // // // // //         window.addEventListener('message', handleMessage);
// // // // // //         return () => {
// // // // // //             window.removeEventListener('storage', handleStorage);
// // // // // //             window.removeEventListener('message', handleMessage);
// // // // // //             clearInterval(interval);
// // // // // //         };
// // // // // //     }, [googleToken]);

// // // // // //     const load = async () => {
// // // // // //         try {
// // // // // //             const data = await api(`/api/courses/${courseId}`);
            
// // // // // //             // [FIX] Normalisasi Data
// // // // // //             const courseData = data.course || data;
// // // // // //             setCourse(courseData);
       
// // // // // //             const opts: any[] = [];
// // // // // //             courseData.modules?.forEach((m: any) => {
// // // // // //                 m.lessons?.forEach((l: any) => {
// // // // // //                     let label = l.title;
// // // // // //                     if(l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
// // // // // //                     else if(l.type === 'essay' || (l.type === 'quiz' && l.questions?.[0]?.options?.length === 0)) label = `📝 Esai: ${l.title}`;
// // // // // //                     else if(l.type === 'upload_doc') label = `📤 Upload: ${l.title}`;
// // // // // //                     else label = `📄 ${l.title}`;
// // // // // //                     opts.push({ id: l._id, label, type: l.type });
// // // // // //                 });
// // // // // //             });
// // // // // //             setActionOptions(opts);

// // // // // //             // [FIX] Persistence Checkbox
// // // // // //             if (courseData.facilitatorIds) {
// // // // // //                 const ids = courseData.facilitatorIds.map((f: any) => 
// // // // // //                     (typeof f === 'object' && f !== null) ? f._id : f
// // // // // //                 );
// // // // // //                 setSelectedFacilitatorIds(ids);
// // // // // //             }

// // // // // //             if (courseData.competencies) setCompetencies(courseData.competencies);
// // // // // //             if (courseData.includeCompetenciesInCertificate !== undefined) setIncludeCompetencies(courseData.includeCompetenciesInCertificate);
            
// // // // // //             // [FIX] DATA SERTIFIKAT DEFAULT
// // // // // //             // Jika data config sertifikat kosong/null, isi dengan default format
// // // // // //             let config = courseData.certificateConfig || {};
// // // // // //             if (!config.certificateNumber) {
// // // // // //                 config = {
// // // // // //                     ...config,
// // // // // //                     certificateNumber: generateDefaultCertFormat(), // Isi otomatis format 00{NO}/...
// // // // // //                     // Bisa tambah default city dll jika perlu
// // // // // //                 };
// // // // // //             }
// // // // // //             setCertConfig(config);

// // // // // //             const userStr = localStorage.getItem('user');
// // // // // //             if (userStr) {
// // // // // //                 const usersRes = await api('/api/admin/users');
// // // // // //                 if (usersRes.users) {
// // // // // //                     const facs = usersRes.users.filter((u: any) => u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN');
// // // // // //                     setFacilitators(facs);
// // // // // //                     // Gunakan courseData
// // // // // //                     const team = facs.filter((u: any) =>
// // // // // //                         courseData.facilitatorIds?.some((f: any) => (f._id || f) === u._id) || u.role === 'SUPER_ADMIN'
// // // // // //                     );
// // // // // //                     setTeamMembers(team.map((t: any) => ({ ...t, role: 'Facilitator' })));
// // // // // //                 }
// // // // // //             }
       
// // // // // //             fetchParticipants();
// // // // // //         } catch (e) { console.error(e); }
// // // // // //         finally { setLoading(false); }
// // // // // //     };

// // // // // //     const fetchParticipants = async () => {
// // // // // //         if(participants.length > 0) return;
// // // // // //         setLoadingParticipants(true);
// // // // // //         try {
// // // // // //             const res = await api(`/api/courses/${courseId}/participants`);
// // // // // //             const parts = res.participants || res.data || [];
// // // // // //             setParticipants(parts);
           
// // // // // //             const chatList = parts.map((p: any) => {
// // // // // //                 const userObj = p.user || p.student || p;
// // // // // //                 return {
// // // // // //                     name: userObj.name || 'User',
// // // // // //                     avatarUrl: userObj.avatarUrl || userObj.image,
// // // // // //                     role: 'Student',
// // // // // //                     _id: userObj._id
// // // // // //                 };
// // // // // //             });
// // // // // //             setChatMembers([...teamMembers, ...chatList]);

// // // // // //             const dummyCompletions = parts.slice(0, 10).map((p: any) => ({
// // // // // //                 name: p.user?.name || p.name || 'Peserta',
// // // // // //                 module: `Modul ${Math.floor(Math.random() * 3) + 1}`,
// // // // // //                 date: new Date().toLocaleDateString()
// // // // // //             }));
// // // // // //             setRecentCompletions(dummyCompletions);

// // // // // //         } catch (error) { console.error("Gagal load peserta"); } finally { setLoadingParticipants(false); }
// // // // // //     };

// // // // // //     // --- HANDLERS ---
// // // // // //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); const width = 500, height = 600; const left = (window.screen.width - width) / 2; const top = (window.screen.height - height) / 2; window.open(url, 'GoogleAuthPopup', `width=${width},height=${height},top=${top},left=${left}`); } catch (e) { alert("Gagal Auth Google"); } };
// // // // // //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } };
   
// // // // // //     const fetchClassroomCourses = async (tokenOverride?: string) => {
// // // // // //         const token = tokenOverride || googleToken;
// // // // // //         if (!token) return;
// // // // // //         try {
// // // // // //             setIsCheckingGoogle(true);
// // // // // //             const res = await fetch(`http://localhost:4000/api/classroom/courses`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'x-google-token': token } });
// // // // // //             if (res.status === 401) { localStorage.removeItem('google_class_token'); setGoogleToken(null); return; }
// // // // // //             const data = await res.json();
// // // // // //             if (data.courses) setClassroomCourses(data.courses);
// // // // // //         } catch (e) { console.error(e); } finally { setIsCheckingGoogle(false); }
// // // // // //     };

// // // // // //     const getFacilitatorName = (data: any) => {
// // // // // //         if (!data) return null;
// // // // // //         if (typeof data === 'object' && data.name) return data.name;
// // // // // //         const found = facilitators.find(f => f._id === data || f.id === data);
// // // // // //         return found ? found.name : 'Unknown';
// // // // // //     };

// // // // // //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); const res = await apiUpload(`/api/upload/course/${courseId}/cover`, formData); setCourse((prev: any) => ({ ...prev, thumbnailUrl: res.imageUrl || res.url })); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// // // // // //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); };
// // // // // //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); load(); } catch (e: any) { alert(e.message); } };
// // // // // //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } setCourse(newCourse); try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); } catch (err) { load(); } };

// // // // // //     const handleSaveModule = async () => { 
// // // // // //         if (!modTitle.trim()) return alert("Judul wajib"); 
        
// // // // // //         // [FIX] Handle null
// // // // // //         const safeFacilitatorId = modFacilitatorId || null;

// // // // // //         const body = { 
// // // // // //             title: modTitle, 
// // // // // //             isActive: true, 
// // // // // //             isMandatory: modIsMandatory, 
// // // // // //             facilitatorId: safeFacilitatorId,
// // // // // //             jp: modJp, 
// // // // // //             scheduleDate: modSchedule || null 
// // // // // //         }; 
// // // // // //         try { 
// // // // // //             if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); 
// // // // // //             else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); 
// // // // // //             resetModuleForm(); 
// // // // // //             load(); 
// // // // // //         } catch(e: any) { 
// // // // // //             alert(e.message); 
// // // // // //         } 
// // // // // //     };

// // // // // //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
// // // // // //     const resetModuleForm = () => { setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false); };
// // // // // //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); setCourse((prev: any) => ({ ...prev, isPublished: newStatus })); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); load(); } } catch (e: any) { alert(e.message); } };
   
// // // // // //     const resetLessonForm = () => { setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesIsMandatory(true); setLesContent(''); setSelectedFile(null); setLesJp(0); setLesFacilitatorId(''); setLesSchedule(''); setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(10); setPollQuestion(''); setPollOptions(['', '']); setSelectedClassroom(null); setEssayQuestions(['']); setUseEssayTimer(false); };
   
// // // // // //     const handleSaveLesson = async (modId: string) => {
// // // // // //         if (!lesTitle.trim()) { alert("Judul wajib"); return; }
// // // // // //         let fileUrl = '';
// // // // // //         if (selectedFile) { try { setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); const res = await apiUpload('/api/upload', fd); fileUrl = res.url || res.file?.url || res.imageUrl; } catch (err) { alert("Gagal upload"); return; } finally { setUploading(false); } }
// // // // // //         else if (editingLesId) { const mod = course?.modules.find((m: any) => m._id === modId); const les = mod?.lessons.find((l: any) => l._id === editingLesId); if (les) fileUrl = les.fileUrl; }

// // // // // //         const finalType = lesType === 'essay' ? 'quiz' : lesType;

// // // // // //         // [FIX] Handle null
// // // // // //         const safeFacilitatorId = lesFacilitatorId || null;

// // // // // //         const body: any = {
// // // // // //             title: lesTitle,
// // // // // //             type: finalType,
// // // // // //             isActive: true,
// // // // // //             isMandatory: lesIsMandatory,
// // // // // //             jp: lesJp,
// // // // // //             facilitatorId: safeFacilitatorId,
// // // // // //             scheduleDate: lesSchedule || null,
// // // // // //             questions: (lesType === 'quiz') ? questions : undefined,
// // // // // //             quizDuration: (lesType === 'quiz' || (lesType === 'essay' && useEssayTimer)) ? quizDuration : undefined,
// // // // // //             pollQuestion: (lesType === 'poll') ? pollQuestion : undefined,
// // // // // //             pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined,
// // // // // //             classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined,
// // // // // //         };

// // // // // //         if (lesType === 'essay') {
// // // // // //             body.questions = essayQuestions.map(q => ({
// // // // // //                 question: q,
// // // // // //                 options: [], 
// // // // // //                 correctIndex: 0
// // // // // //             }));
// // // // // //         }

// // // // // //         if(fileUrl) body.fileUrl = fileUrl;
    
// // // // // //         if(lesType === 'video_url') body.videoUrl = lesContent;
// // // // // //         else if(lesType === 'virtual_class') body.meetingLink = lesContent;
// // // // // //         else if(lesType === 'upload_doc') body.content = lesContent; 
// // // // // //         else if(!['quiz','poll','image','google_classroom','essay'].includes(lesType)) body.content = lesContent;

// // // // // //         try { if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); resetLessonForm(); load(); } catch(e:any) { alert(e.message); }
// // // // // //     };

// // // // // //     const startEditLesson = (modId: string, les: any) => {
// // // // // //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title);
       
// // // // // //         let typeToSet = les.type;
// // // // // //         if (les.type === 'quiz' && les.questions && les.questions.length > 0 && (!les.questions[0].options || les.questions[0].options.length === 0)) {
// // // // // //             typeToSet = 'essay';
// // // // // //             setEssayQuestions(les.questions.map((q:any) => q.question));
// // // // // //             if(les.quizDuration) { setUseEssayTimer(true); setQuizDuration(les.quizDuration); }
// // // // // //             else { setUseEssayTimer(false); }
// // // // // //         } else {
// // // // // //             setLesType(les.type);
// // // // // //         }
// // // // // //         setLesType(typeToSet);

// // // // // //         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0);
// // // // // //         setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : '');
// // // // // //         setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || ''));
       
// // // // // //         if (les.type === 'video_url') setLesContent(les.videoUrl||'');
// // // // // //         else if (les.type === 'virtual_class') setLesContent(les.meetingLink||'');
// // // // // //         else setLesContent(les.content||'');
       
// // // // // //         if (les.type === 'quiz' && typeToSet === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(les.quizDuration||10); }
// // // // // //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); }
       
// // // // // //         if (les.type === 'google_classroom') {
// // // // // //             if(googleToken && classroomCourses.length === 0) fetchClassroomCourses();
// // // // // //             if(les.classroomData) setSelectedClassroom(les.classroomData);
// // // // // //         } else { setSelectedClassroom(null); }

// // // // // //         setTimeout(() => document.getElementById(`form-${modId}`)?.scrollIntoView({ behavior: 'smooth' }), 100);
// // // // // //     };

// // // // // //     const deleteItem = async (modId: string, lesId: string) => {
// // // // // //         if(!confirm("Hapus?")) return;
// // // // // //         await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' });
// // // // // //         load();
// // // // // //     };

// // // // // //     const addPollOption = () => setPollOptions([...pollOptions, '']); const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); };
// // // // // //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); };
   
// // // // // //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']);
// // // // // //     const updateEssay = (idx: number, val: string) => { const newQ = [...essayQuestions]; newQ[idx] = val; setEssayQuestions(newQ); };
// // // // // //     const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };

// // // // // //     const handleSaveCertConfig = async (data: any) => { 
// // // // // //         try { 
// // // // // //             setIsSavingCert(true); 
// // // // // //             await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); 
// // // // // //             alert("Disimpan!"); 
// // // // // //             load(); // [FIX] Reload agar tabel terupdate
// // // // // //         } catch (e: any) { 
// // // // // //             alert(e.message); 
// // // // // //         } finally { 
// // // // // //             setIsSavingCert(false); 
// // // // // //         } 
// // // // // //     };
    
// // // // // //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };

// // // // // //     const handleViewStudentDetail = (student: any) => {
// // // // // //         setStudentDetail(student);
// // // // // //         setShowStudentDetailModal(true);
// // // // // //     };

// // // // // //     const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => {
// // // // // //         if (!selectedActionId) return alert("Pilih Materi/Kuis di dropdown atas dulu!");
// // // // // //         const selectedItem = actionOptions.find(o => o.id === selectedActionId);
// // // // // //         if (action === 'pass') {
// // // // // //             if(!confirm(`Luluskan peserta ini di materi "${selectedItem.label}"?`)) return;
// // // // // //             try { await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId, lessonId: selectedActionId, courseId } }); alert("Berhasil diluluskan!"); fetchParticipants(); } catch(e:any) { alert(e.message); }
// // // // // //         } else if (action === 'reset') {
// // // // // //             if(!confirm(`Reset progress Kuis "${selectedItem.label}" untuk peserta ini?`)) return;
// // // // // //             try { await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId, quizId: selectedActionId } }); alert("Kuis di-reset!"); fetchParticipants(); } catch(e:any) { alert(e.message); }
// // // // // //         }
// // // // // //     };

// // // // // //     if (loading || !isBrowser) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div></div>;

// // // // // //     return (
// // // // // //         <Protected roles={["FACILITATOR", "SUPER_ADMIN"]}>
// // // // // //             <div className="max-w-6xl mx-auto p-6 space-y-12 pb-32 relative">
// // // // // //                 {notification && (<div className="fixed top-20 right-6 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl font-bold animate-bounce z-50 flex items-center gap-2"><span>💾</span> {notification}</div>)}

// // // // // //                 {/* HEADER */}
// // // // // //                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 gap-4">
// // // // // //                     <div className="flex-1">
// // // // // //                         <h1 className="text-3xl font-bold text-gray-800">{course?.title}</h1>
// // // // // //                         <div className="flex gap-2 items-center mt-2">
// // // // // //                             <button type="button" onClick={() => toggleStatus()} className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer border transition-colors ${course?.isPublished ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`} aria-label="Toggle Publish" title="Ubah Status Publikasi">{course?.isPublished ? 'PUBLISHED' : 'DRAFT'}</button>
// // // // // //                             <span className="text-xs text-gray-500 font-medium">{course?.modules?.length || 0} Modul • {course?.modules?.reduce((acc: number, m: any) => acc + m.lessons.length, 0) || 0} Materi</span>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                     <button type="button" onClick={() => router.push('/admin/courses')} className="text-sm font-bold text-gray-500 hover:text-gray-800 px-4 py-2 border rounded-lg hover:bg-gray-50" aria-label="Kembali" title="Kembali">← Kembali</button>
// // // // // //                 </div>

// // // // // //                 {/* GRID UTAMA */}
// // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // //                     {/* KIRI */}
// // // // // //                     <div className="md:col-span-1 space-y-6">
// // // // // //                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
// // // // // //                             {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
// // // // // //                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Upload Cover" title="Ganti Sampul">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Input Cover" /></div>
// // // // // //                         </div>

// // // // // //                         {/* TIM PENGELOLA */}
// // // // // //                         {currentUserRole === 'SUPER_ADMIN' && (
// // // // // //                             <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
// // // // // //                                 <div className="flex justify-between items-center mb-4">
// // // // // //                                     <div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div>
// // // // // //                                     <button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" title="Simpan Tim" aria-label="Simpan Tim">Simpan</button>
// // // // // //                                 </div>
// // // // // //                                 <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">
// // // // // //                                     {facilitators.map((user: any) => (
// // // // // //                                         <label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}>
// // // // // //                                             <input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih fasilitator ${user.name}`} title={`Pilih ${user.name}`} />
// // // // // //                                             <div className="flex-1 overflow-hidden">
// // // // // //                                                 <div className="text-xs font-bold truncate">{user.name}</div>
// // // // // //                                                 <div className="text-[10px] text-gray-500 truncate">{user.email}</div>
// // // // // //                                             </div>
// // // // // //                                         </label>
// // // // // //                                     ))}
// // // // // //                                 </div>
// // // // // //                                 <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" title="Cari Fasilitator" />
// // // // // //                             </div>
// // // // // //                         )}
                        
// // // // // //                         {/* --- WALL OF FAME (TICKER) --- */}
// // // // // //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-6 overflow-hidden">
// // // // // //                             <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 text-yellow-600 cursor-pointer" onClick={() => setShowWallOfFameModal(true)}><Trophy size={18}/> Wall of Fame (Klik)</h3>
// // // // // //                             <div className="relative h-40 overflow-hidden" onClick={() => setShowWallOfFameModal(true)}>
// // // // // //                                 <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white to-transparent z-10"></div>
// // // // // //                                 <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent z-10"></div>
// // // // // //                                 <div className="animate-[scrollY_15s_linear_infinite] space-y-3 cursor-pointer">
// // // // // //                                     {recentCompletions.length > 0 ? recentCompletions.map((rc:any, i:number) => (
// // // // // //                                         <div key={i} className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg border border-yellow-100">
// // // // // //                                             <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-bold text-xs"><Award size={14}/></div>
// // // // // //                                             <div className="flex-1 min-w-0">
// // // // // //                                                 <p className="text-xs font-bold text-gray-800 truncate">{rc.name}</p>
// // // // // //                                                 <p className="text-[10px] text-gray-500 truncate">Selesai: {rc.module}</p>
// // // // // //                                             </div>
// // // // // //                                         </div>
// // // // // //                                     )) : <p className="text-xs text-gray-400 text-center mt-10">Belum ada yang lulus.</p>}
// // // // // //                                     {recentCompletions.map((rc:any, i:number) => (
// // // // // //                                         <div key={`dup-${i}`} className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg border border-yellow-100">
// // // // // //                                             <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-bold text-xs"><Award size={14}/></div>
// // // // // //                                             <div className="flex-1 min-w-0">
// // // // // //                                                 <p className="text-xs font-bold text-gray-800 truncate">{rc.name}</p>
// // // // // //                                                 <p className="text-[10px] text-gray-500 truncate">Selesai: {rc.module}</p>
// // // // // //                                             </div>
// // // // // //                                         </div>
// // // // // //                                     ))}
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     </div>

// // // // // //                     {/* KANAN */}
// // // // // //                     <section className="md:col-span-2 space-y-6">
// // // // // //                         <div className="flex justify-between items-center">
// // // // // //                             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">📚 Modul & Materi</h2>
// // // // // //                             <button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-red-700 text-white px-5 py-2 rounded-xl font-bold shadow-lg hover:bg-red-800 flex items-center gap-2" aria-label="Tambah Modul" title="Tambah Modul">+ Tambah Modul</button>
// // // // // //                         </div>

// // // // // //                         {/* FORM ADD MODULE */}
// // // // // //                         {showModuleForm && (
// // // // // //                             <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200">
// // // // // //                                 <div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul" title="Nama Modul" /><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" min="0" aria-label="JP" title="Jam Pelajaran" /></div>
// // // // // //                                 <div className="grid grid-cols-2 gap-4">
// // // // // //                                     <div>
// // // // // //                                         <label className="text-xs font-bold text-gray-500">Penanggung Jawab</label>
// // // // // //                                         <select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih Fasilitator" title="Pilih Fasilitator">
// // // // // //                                             <option value="">-- Pilih Fasilitator dari Tim --</option>
// // // // // //                                             {activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}
// // // // // //                                         </select>
// // // // // //                                     </div>
// // // // // //                                     <div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal Modul" title="Tanggal Modul" /></div>
// // // // // //                                 </div>
// // // // // //                                 <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={modIsMandatory} onChange={e => setModIsMandatory(e.target.checked)} className="w-4 h-4 text-red-600 rounded" aria-label="Wajib" title="Wajib" /><span>Wajib diselesaikan?</span></label>
// // // // // //                                 <div className="flex gap-2 justify-end pt-2"><button type="button" onClick={resetModuleForm} className="text-gray-500 font-bold px-3 text-sm" aria-label="Batal" title="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700" aria-label="Simpan" title="Simpan">Simpan</button></div>
// // // // // //                             </form>
// // // // // //                         )}

// // // // // //                         <DragDropContext onDragEnd={onDragEnd}>
// // // // // //                             <Droppable droppableId="all-modules" type="module">
// // // // // //                                 {(provided) => (
// // // // // //                                     <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
// // // // // //                                             {course?.modules?.map((m: any, idx: number) => (
// // // // // //                                                 <Draggable key={m._id} draggableId={m._id} index={idx}>
// // // // // //                                                     {(provided) => (
// // // // // //                                                         <div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-2xl overflow-hidden shadow-sm bg-white">
// // // // // //                                                                 {/* HEADER MODUL */}
// // // // // //                                                                 <div className="bg-gray-100 p-4 flex justify-between items-center" {...provided.dragHandleProps}>
// // // // // //                                                                     <div className="flex items-center gap-3">
// // // // // //                                                                         <span className="cursor-grab text-gray-400 text-xl" aria-label="Geser Modul" title="Geser Modul">☰</span>
// // // // // //                                                                         <span className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{idx+1}</span>
// // // // // //                                                                         <div>
// // // // // //                                                                             <div className="flex items-center gap-2">
// // // // // //                                                                                 <h3 className="font-bold text-gray-800">{m.title}</h3>
// // // // // //                                                                                 {m.jp > 0 && <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded border border-blue-200">{m.jp} JP</span>}
// // // // // //                                                                             </div>
// // // // // //                                                                             <div className="flex items-center gap-2 mt-1">
// // // // // //                                                                                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${m.isMandatory ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-600'}`}>{m.isMandatory ? 'WAJIB' : 'OPSIONAL'}</span>
// // // // // //                                                                                 {m.facilitatorId && <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded flex items-center gap-1">👤 {getFacilitatorName(m.facilitatorId)}</span>}
// // // // // //                                                                                 {m.scheduleDate && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1"><Calendar size={10}/> {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // // // //                                                                             </div>
// // // // // //                                                                         </div>
// // // // // //                                                                     </div>
// // // // // //                                                                     <div className="flex items-center gap-2">
// // // // // //                                                                         <button type="button" onClick={() => startEditModule(m)} className="text-blue-600 font-bold text-xs px-2" aria-label="Edit Modul" title="Edit Modul">Edit</button>
// // // // // //                                                                         <button type="button" onClick={() => toggleStatus(m._id)} className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${m.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`} aria-label="Toggle Modul" title="Aktifkan/Nonaktifkan">{m.isActive ? 'ON' : 'OFF'}</button>
// // // // // //                                                                     </div>
// // // // // //                                                                 </div>
                                                               
// // // // // //                                                                 <Droppable droppableId={m._id} type="lesson">
// // // // // //                                                                     {(provided) => (
// // // // // //                                                                         <div ref={provided.innerRef} {...provided.droppableProps} className="p-4 space-y-3 min-h-[50px]">
// // // // // //                                                                                 {m.lessons?.map((l: any, lIdx: number) => (
// // // // // //                                                                                     <Draggable key={l._id} draggableId={l._id} index={lIdx}>
// // // // // //                                                                                         {(provided) => (
// // // // // //                                                                                             <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-3 bg-white border rounded-xl hover:shadow-md transition-shadow">
// // // // // //                                                                                                     <div className="flex items-center gap-3">
// // // // // //                                                                                                         <span className="cursor-grab text-gray-300" aria-label="Geser Materi" title="Geser Materi">::</span>
// // // // // //                                                                                                         <span className="text-xl">
// // // // // //                                                                                                             {l.type === 'virtual_class' ? '🎥' : l.type === 'google_classroom' ? '🏫' : l.type === 'video_url' ? '🎞️' : l.type === 'quiz' ? '📝' : l.type === 'poll' ? '📊' : l.type === 'upload_doc' ? '📤' : l.type === 'image' ? '🖼️' : '📄'}
// // // // // //                                                                                                         </span>
// // // // // //                                                                                                         <div>
// // // // // //                                                                                                             <div className="flex items-center gap-2">
// // // // // //                                                                                                                 <p className="text-sm font-bold text-gray-800">{l.title}</p>
// // // // // //                                                                                                                 {l.jp > 0 && <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 rounded border border-blue-100">{l.jp} JP</span>}
// // // // // //                                                                                                                 {l.scheduleDate && <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-1.5 rounded border border-purple-100 flex items-center gap-1"><Calendar size={10}/> {new Date(l.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // // // //                                                                                                             </div>
// // // // // //                                                                                                             <div className="flex gap-2 items-center mt-0.5">
// // // // // //                                                                                                                 <span className="text-[10px] text-blue-600 uppercase font-bold">{l.type.replace('_',' ')}</span>
// // // // // //                                                                                                                 <span className={`text-[10px] font-bold px-1 rounded ${l.isMandatory ? 'text-red-600 bg-red-50' : 'text-gray-500 bg-gray-100'}`}>{l.isMandatory ? 'Wajib' : 'Opsional'}</span>
// // // // // //                                                                                                                 {(l.facilitatorId || l.facilitator) && (
// // // // // //                                                                                                                     <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
// // // // // //                                                                                                                         👤 {getFacilitatorName(l.facilitatorId || l.facilitator)}
// // // // // //                                                                                                                     </span>
// // // // // //                                                                                                                 )}
// // // // // //                                                                                                             </div>
// // // // // //                                                                                                         </div>
// // // // // //                                                                                                     </div>
// // // // // //                                                                                                     <div className="flex items-center gap-2">
// // // // // //                                                                                                         <button type="button" onClick={() => startEditLesson(m._id, l)} className="text-blue-500 p-1" aria-label="Edit Materi" title="Edit Materi">✎</button>
// // // // // //                                                                                                         <button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`px-2 py-1 rounded text-[10px] font-bold border ${l.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`} aria-label="Toggle Materi" title="Aktifkan/Nonaktifkan">{l.isActive ? 'ON' : 'OFF'}</button>
// // // // // //                                                                                                         <button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-gray-300 hover:text-red-500" aria-label="Hapus Materi" title="Hapus Materi">🗑️</button>
// // // // // //                                                                                                     </div>
// // // // // //                                                                                             </div>
// // // // // //                                                                                         )}
// // // // // //                                                                                     </Draggable>
// // // // // //                                                                                 ))}
// // // // // //                                                                                 {provided.placeholder}
                                                                               
// // // // // //                                                                                 {/* FORM LESSON */}
// // // // // //                                                                                 {activeModId === m._id ? (
// // // // // //                                                                                     <div id={`form-${m._id}`} className="bg-blue-50 p-5 rounded-xl border border-blue-200 space-y-4">
// // // // // //                                                                                             <div className="grid grid-cols-12 gap-3">
// // // // // //                                                                                                 <div className="col-span-4">
// // // // // //                                                                                                     <select className="w-full p-2 border rounded-lg text-sm" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Pilih Tipe Materi" title="Pilih Tipe Materi">
// // // // // //                                                                                                         <option value="lesson">📄 Materi Teks</option>
// // // // // //                                                                                                         <option value="essay">📝 Esai</option> {/* [NEW] Opsi Esai */}
// // // // // //                                                                                                         <option value="slide">🖥️ Slide Presentasi</option>
// // // // // //                                                                                                         <option value="image">🖼️ Upload Gambar</option>
// // // // // //                                                                                                         <option value="download_doc">📥 Upload Dokumen</option>
// // // // // //                                                                                                         <option value="upload_doc">📤 Tugas Upload</option>
// // // // // //                                                                                                         <option value="quiz">📝 Kuis</option>
// // // // // //                                                                                                         <option value="poll">📊 Polling</option>
// // // // // //                                                                                                         <option value="video_url">🎞️ Video URL (YouTube)</option>
// // // // // //                                                                                                         <option value="virtual_class">🎥 Kelas Virtual (Meet/Zoom)</option>
// // // // // //                                                                                                         <option value="google_classroom">🏫 Google Classroom</option>
// // // // // //                                                                                                     </select>
// // // // // //                                                                                                 </div>
// // // // // //                                                                                                 <div className="col-span-6"><input className="w-full p-2 border rounded-lg text-sm" placeholder="Judul..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi" title="Judul Materi" /></div>
// // // // // //                                                                                                 <div className="col-span-2"><input type="number" className="w-full p-2 border rounded-lg text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} min="0" aria-label="JP" title="Jam Pelajaran" /></div>
// // // // // //                                                                                             </div>

// // // // // //                                                                                             <div className="grid grid-cols-2 gap-4">
// // // // // //                                                                                                 <div>
// // // // // //                                                                                                     <label className="text-xs font-bold text-gray-500 block mb-1">Fasilitator Pengampu</label>
// // // // // //                                                                                                     {/* [FIX] Gunakan activeTeam */}
// // // // // //                                                                                                     <select value={lesFacilitatorId} onChange={e => setLesFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm" aria-label="Pilih Fasilitator" title="Pilih Fasilitator">
// // // // // //                                                                                                         <option value="">-- Sama dengan Modul ({getFacilitatorName(m.facilitatorId)}) --</option>
// // // // // //                                                                                                         {activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}
// // // // // //                                                                                                     </select>
// // // // // //                                                                                                 </div>
// // // // // //                                                                                                 <div>
// // // // // //                                                                                                     <label className="text-xs font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label>
// // // // // //                                                                                                     <input type="date" className="w-full border p-2 rounded text-sm" value={lesSchedule} onChange={e => setLesSchedule(e.target.value)} aria-label="Tanggal Materi" title="Tanggal Materi" />
// // // // // //                                                                                                 </div>
// // // // // //                                                                                             </div>
// // // // // //                                                                                             <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e => setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib" title="Wajib" /><span>Materi ini wajib diselesaikan?</span></label>
                                                                                           
// // // // // //                                                                                             {lesType === 'video_url' && (<div className="bg-white p-3 rounded border border-gray-200"><label className="text-xs font-bold text-gray-600 flex items-center gap-2 mb-1"><Video size={16}/> Link Video (YouTube)</label><input className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://youtube.com/watch?v=..." value={lesContent} onChange={e => setLesContent(e.target.value)} aria-label="Input URL Video" title="URL Video" /></div>)}
                                                                                           
// // // // // //                                                                                             {/* [UPDATE] GANTI TEXTAREA DENGAN REACT QUILL EDITOR */}
// // // // // //                                                                                             {['lesson', 'upload_doc'].includes(lesType) && (
// // // // // //                                                                                                 <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
// // // // // //                                                                                                     <ReactQuill
// // // // // //                                                                                                         theme="snow"
// // // // // //                                                                                                         value={lesContent}
// // // // // //                                                                                                         onChange={setLesContent}
// // // // // //                                                                                                         modules={quillModules}
// // // // // //                                                                                                         placeholder={lesType === 'upload_doc' ? "Tulis instruksi tugas di sini..." : "Tulis materi lengkap di sini..."}
// // // // // //                                                                                                         className="h-64 mb-12" // mb-12 untuk memberi ruang toolbar di mobile
// // // // // //                                                                                                     />
// // // // // //                                                                                                 </div>
// // // // // //                                                                                             )}

// // // // // //                                                                                             {lesType === 'essay' && (
// // // // // //                                                                                                 <div className="space-y-4 bg-white p-4 rounded border border-blue-100">
// // // // // //                                                                                                     <div className="flex items-center gap-2 mb-2 bg-amber-50 p-2 rounded border border-amber-100">
// // // // // //                                                                                                         <label className="text-xs font-bold text-amber-800 flex items-center gap-2"><Clock size={14}/> Durasi Esai (Menit):</label>
// // // // // //                                                                                                         <input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="p-1 border rounded w-20 text-sm" aria-label="Durasi Esai" title="Durasi Esai" />
// // // // // //                                                                                                         <label className="text-xs ml-4 flex items-center gap-1 cursor-pointer"><input type="checkbox" checked={useEssayTimer} onChange={e => setUseEssayTimer(e.target.checked)} aria-label="Gunakan Timer" /> Gunakan Timer</label>
// // // // // //                                                                                                     </div>
// // // // // //                                                                                                     <h4 className="text-sm font-bold text-gray-700">Daftar Pertanyaan Esai:</h4>
// // // // // //                                                                                                     {essayQuestions.map((q, idx) => (
// // // // // //                                                                                                         <div key={idx} className="flex gap-2">
// // // // // //                                                                                                             <span className="text-sm font-bold text-gray-500 py-2">{idx + 1}.</span>
// // // // // //                                                                                                             <textarea
// // // // // //                                                                                                                 className="flex-1 p-2 border rounded text-sm h-20"
// // // // // //                                                                                                                 placeholder="Tulis pertanyaan..."
// // // // // //                                                                                                                 value={q}
// // // // // //                                                                                                                 onChange={e => updateEssay(idx, e.target.value)}
// // // // // //                                                                                                                 aria-label={`Pertanyaan Esai ${idx + 1}`}
// // // // // //                                                                                                                 title={`Pertanyaan Esai ${idx + 1}`}
// // // // // //                                                                                                             />
// // // // // //                                                                                                             {essayQuestions.length > 1 && (
// // // // // //                                                                                                                 <button type="button" onClick={() => removeEssay(idx)} className="text-red-500 font-bold px-2 self-start mt-2" title="Hapus Pertanyaan" aria-label="Hapus Pertanyaan">✕</button>
// // // // // //                                                                                                             )}
// // // // // //                                                                                                         </div>
// // // // // //                                                                                                     ))}
// // // // // //                                                                                                     <button type="button" onClick={addEssayRow} className="text-xs font-bold text-blue-600 flex items-center gap-1" title="Tambah Pertanyaan"><Plus size={14}/> Tambah Pertanyaan</button>
// // // // // //                                                                                                 </div>
// // // // // //                                                                                             )}
                                                                                           
// // // // // //                                                                                             {['image','download_doc','slide'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File ({lesType})</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Pilih File" title="Pilih File" /></div>)}
                                                                                           
// // // // // //                                                                                             {lesType === 'upload_doc' && (
// // // // // //                                                                                                 <div className="bg-white p-4 rounded border border-blue-50 mt-2">
// // // // // //                                                                                                     <label className="block text-xs font-bold text-gray-600 mb-2">Lampirkan File Instruksi (Opsional)</label>
// // // // // //                                                                                                     <input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Upload File Instruksi" title="Upload File Instruksi" />
// // // // // //                                                                                                 </div>
// // // // // //                                                                                             )}

// // // // // //                                                                                             {lesType === 'virtual_class' && (<div className="bg-white p-4 rounded border border-blue-200 space-y-2"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><LinkIcon size={16}/> Link Meeting</label><input type="url" className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://meet.google.com/..." value={lesContent} onChange={e => setLesContent(e.target.value)} aria-label="Input Link Meeting" title="Link Meeting" /></div>)}
                                                                                           
// // // // // //                                                                                             {lesType === 'quiz' && (
// // // // // //                                                                                                 <div className="space-y-4 bg-white p-4 rounded border">
// // // // // //                                                                                                     <div className="flex items-center gap-2 mb-2 bg-amber-50 p-2 rounded border border-amber-100">
// // // // // //                                                                                                         <label className="text-xs font-bold text-amber-800">⏱ Durasi (Menit):</label>
// // // // // //                                                                                                         <input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="p-1 border rounded w-20 text-sm" aria-label="Durasi Kuis" title="Durasi Kuis" />
// // // // // //                                                                                                     </div>
// // // // // //                                                                                                     {questions.map((q, ix) => (
// // // // // //                                                                                                         <div key={ix} className="p-3 border rounded bg-gray-50 relative">
// // // // // //                                                                                                             <button type="button" onClick={() => removeQuestion(ix)} className="absolute top-2 right-2 text-red-500 text-xs font-bold hover:underline" aria-label="Hapus Soal" title="Hapus Soal">Hapus</button>
// // // // // //                                                                                                             <input className="w-full mb-2 p-2 border rounded" placeholder={`Pertanyaan ${ix+1}`} value={q.question} onChange={e=>updateQuestion(ix,'question',e.target.value)} aria-label={`Pertanyaan ${ix+1}`} title={`Pertanyaan ${ix+1}`} />
// // // // // //                                                                                                             <div className="grid grid-cols-2 gap-2">
// // // // // //                                                                                                                 {q.options.map((o:string,oi:number)=><input key={oi} className={`w-full p-1 border ${q.correctIndex===oi?'bg-green-100 border-green-400':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix,'options',e.target.value,oi)} aria-label={`Opsi ${oi+1}`} title={`Opsi ${oi+1}`} />)}
// // // // // //                                                                                                             </div>
// // // // // //                                                                                                             <div className="mt-2 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix,'correctIndex',Number(e.target.value))} className="border w-12 p-1 rounded" aria-label="Index Jawaban Benar" title="Index Jawaban Benar" /></div>
// // // // // //                                                                                                         </div>
// // // // // //                                                                                                     ))}
// // // // // //                                                                                                     <button type="button" onClick={addQuestionRow} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-200">+ Tambah Soal</button>
// // // // // //                                                                                                 </div>
// // // // // //                                                                                             )}
                                                                                           
// // // // // //                                                                                             {lesType === 'google_classroom' && (
// // // // // //                                                                                                 <div className="bg-white p-4 rounded border border-green-200 space-y-3">
// // // // // //                                                                                                     <div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Kelas" title="Refresh"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putuskan Akun" title="Putuskan"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google" title="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas" title="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas" title="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}
// // // // // //                                                                                                 </div>
// // // // // //                                                                                             )}

// // // // // //                                                                                             {lesType === 'poll' && (
// // // // // //                                                                                                 <div className="space-y-4 bg-white p-4 rounded border border-blue-100">
// // // // // //                                                                                                     <input className="w-full p-2 border rounded text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} aria-label="Pertanyaan Polling" title="Pertanyaan Polling" />
// // // // // //                                                                                                     {pollOptions.map((opt, idx) => (
// // // // // //                                                                                                         <div key={idx} className="flex gap-2">
// // // // // //                                                                                                             <input className="flex-1 p-2 border rounded text-sm" placeholder={`Opsi ${idx + 1}`} value={opt} onChange={e => updatePollOption(idx, e.target.value)} aria-label={`Opsi ${idx + 1}`} title={`Opsi ${idx + 1}`} />
// // // // // //                                                                                                             {pollOptions.length > 2 && (<button type="button" onClick={() => removePollOption(idx)} className="text-red-500 font-bold px-2" aria-label="Hapus Opsi" title="Hapus Opsi">✕</button>)}
// // // // // //                                                                                                         </div>
// // // // // //                                                                                                     ))}
// // // // // //                                                                                                     <button type="button" onClick={addPollOption} className="text-xs font-bold text-blue-600" aria-label="Tambah Opsi" title="Tambah Opsi">+ Tambah Opsi</button>
// // // // // //                                                                                                 </div>
// // // // // //                                                                                             )}

// // // // // //                                                                                             <div className="flex justify-end gap-2"><button type="button" onClick={resetLessonForm} className="px-3 py-1 text-xs font-bold text-gray-500" aria-label="Batal" title="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-4 py-1 rounded text-xs font-bold" aria-label="Simpan" title="Simpan">Simpan</button></div>
// // // // // //                                                                                     </div>
// // // // // //                                                                                 ) : (
// // // // // //                                                                                     <button type="button" onClick={()=>{setActiveModId(m._id); setLesType('lesson');}} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-xs hover:border-blue-300 hover:text-blue-600 transition-colors" aria-label="Tambah Konten" title="Tambah Konten">+ Tambah Konten</button>
// // // // // //                                                                                 )}
// // // // // //                                                                         </div>
// // // // // //                                                                     )}
// // // // // //                                                                 </Droppable>
// // // // // //                                                         </div>
// // // // // //                                                     )}
// // // // // //                                                 </Draggable>
// // // // // //                                             ))}
// // // // // //                                             {provided.placeholder}
// // // // // //                                     </div>
// // // // // //                                 )}
// // // // // //                             </Droppable>
// // // // // //                         </DragDropContext>
// // // // // //                     </section>
// // // // // //                 </div>

// // // // // //                 {/* --- FLOATING DASHBOARD --- */}
// // // // // //                 <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
// // // // // //                     <button type="button" onClick={() => { setShowTeamChat(true); }} className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 hover:text-white border border-gray-200 transition-transform hover:scale-105 flex items-center gap-2 group relative" title="Chat Tim" aria-label="Chat Tim"><MessageSquare size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Diskusi Tim</span></button>
// // // // // //                     <button type="button" onClick={() => { setShowParticipantChat(true); fetchParticipants(); }} className="bg-emerald-600 text-white p-4 rounded-full shadow-xl hover:bg-emerald-700 flex items-center gap-2 transition-transform hover:scale-105 group relative" title="Chat Peserta" aria-label="Chat Peserta"><MessageCircle size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Chat Peserta</span></button>
// // // // // //                     <button type="button" onClick={() => setShowPreviewModal(true)} className="bg-white text-gray-700 p-4 rounded-full shadow-xl hover:bg-gray-50 border border-gray-200 transition-transform hover:scale-105 flex items-center gap-2 group relative" title="Preview" aria-label="Preview Kelas"><Eye size={24} className="text-purple-600"/><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Preview Kelas</span></button>
// // // // // //                     <button type="button" onClick={() => { setShowParticipantModal(true); fetchParticipants(); }} className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 flex items-center gap-2 transition-transform hover:scale-105 group relative" aria-label="Manajemen Peserta" title="Manajemen Peserta"><Users size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Manajemen Peserta</span></button>
// // // // // //                 </div>

// // // // // //                 {/* --- MODALS --- */}
// // // // // //                 {showPreviewModal && (<div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200"><div className="bg-white w-[95vw] h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"><div className="bg-gray-900 text-white p-3 flex justify-between items-center px-6"><h3 className="font-bold flex items-center gap-2"><Eye size={18}/> Preview Mode</h3><div className="flex gap-3"><button type="button" onClick={() => window.open(`/courses/${courseId}`, '_blank', 'noopener,noreferrer')} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded flex items-center gap-1 transition-colors" aria-label="Buka di Tab Baru" title="Buka di Tab Baru"><ExternalLink size={14}/> Buka Tab Baru</button><button type="button" onClick={() => setShowPreviewModal(false)} className="text-gray-400 hover:text-white" aria-label="Tutup Preview" title="Tutup"><X size={24}/></button></div></div><div className="flex-1 bg-gray-100"><iframe src={`/courses/${courseId}`} className="w-full h-full border-0" title="Course Preview" /></div></div></div>)}

// // // // // //                 {showParticipantModal && (
// // // // // //                     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
// // // // // //                         <div className="bg-white w-full max-w-6xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
// // // // // //                             <div className="p-6 border-b flex justify-between items-center bg-gray-50">
// // // // // //                                 <div><h2 className="text-xl font-bold text-gray-800">Manajemen Peserta</h2><p className="text-xs text-gray-500">Kelola kelulusan dan reset kuis.</p></div>
// // // // // //                                 <button type="button" onClick={() => setShowParticipantModal(false)} className="bg-white p-2 rounded-full shadow hover:bg-gray-100" aria-label="Tutup Modal" title="Tutup"><X size={20}/></button>
// // // // // //                             </div>
                           
// // // // // //                             <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex flex-wrap gap-4 items-center justify-between">
// // // // // //                                 <div className="flex items-center gap-3">
// // // // // //                                     <span className="text-xs font-bold text-indigo-800">🛠 Aksi Massal:</span>
// // // // // //                                     <select className="p-2 border rounded-lg text-sm bg-white min-w-[250px]" value={selectedActionId} onChange={e=>setSelectedActionId(e.target.value)} aria-label="Pilih Materi Aksi" title="Pilih Materi Aksi">
// // // // // //                                         <option value="">-- Pilih Materi / Kuis --</option>
// // // // // //                                         {actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
// // // // // //                                     </select>
// // // // // //                                 </div>
// // // // // //                                 <div className="relative">
// // // // // //                                     <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // // // // //                                     <input className="pl-10 pr-4 py-2 rounded-full border border-gray-300 text-sm w-64 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Cari peserta..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} aria-label="Cari Peserta" title="Cari Peserta" />
// // // // // //                                 </div>
// // // // // //                             </div>

// // // // // //                             <div className="flex-1 overflow-y-auto p-0 bg-gray-50/50">
// // // // // //                                 {loadingParticipants ? (<div className="flex justify-center items-center h-full text-gray-400">Memuat data...</div>) : participants.length === 0 ? (<div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2"><Users size={48} className="opacity-20"/><p>Belum ada peserta.</p></div>) : (
// // // // // //                                     <table className="w-full text-left border-collapse">
// // // // // //                                         <thead className="bg-gray-100 sticky top-0 z-10 text-xs font-bold text-gray-600"><tr className="border-b"><th className="p-4">Peserta</th><th className="p-4">Tanggal Gabung</th><th className="p-4 text-center">Progres</th><th className="p-4 text-center">Aksi Konteks</th><th className="p-4 text-center">Chat</th><th className="p-4 text-center">Detail</th></tr></thead>
// // // // // //                                         <tbody className="text-sm bg-white divide-y">
// // // // // //                                             {participants.filter(p => (p.user?.name || p.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => {
// // // // // //                                                 const userObj = p.user || p.student || p.participant || p;
// // // // // //                                                 const name = userObj.name || 'Tanpa Nama';
// // // // // //                                                 const email = userObj.email || '-';
// // // // // //                                                 const dateRaw = p.joinedAt || p.createdAt || p.enrolledAt || userObj.joinedAt;
// // // // // //                                                 const joinDate = dateRaw && !isNaN(new Date(dateRaw).getTime()) ? new Date(dateRaw).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';
// // // // // //                                                 const selectedActionItem = actionOptions.find(o => o.id === selectedActionId);
// // // // // //                                                 const isCompleted = selectedActionId && p.completedLessons?.includes(selectedActionId);

// // // // // //                                                 return (
// // // // // //                                                     <tr key={idx} className="hover:bg-blue-50 transition-colors">
// // // // // //                                                         <td className="p-4 font-bold text-gray-800 flex items-center gap-3">
// // // // // //                                                             <div className="relative">
// // // // // //                                                                 {userObj.avatarUrl ? (<img src={getImageUrl(userObj.avatarUrl)} alt={name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />) : (<div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-200">{name.charAt(0).toUpperCase()}</div>)}
// // // // // //                                                             </div>
// // // // // //                                                             <div>
// // // // // //                                                                 <div>{name}</div>
// // // // // //                                                                 <div className="text-[10px] text-gray-400 font-normal flex items-center gap-1"><Mail size={10}/> {email}</div>
// // // // // //                                                             </div>
// // // // // //                                                         </td>
// // // // // //                                                         <td className="p-4 text-xs text-gray-500">{joinDate}</td>
// // // // // //                                                         <td className="p-4 text-center">
// // // // // //                                                             <div className="w-24 bg-gray-200 rounded-full h-2 mx-auto overflow-hidden">
// // // // // //                                                                 <div className="bg-green-500 h-2 rounded-full" style={{width: `${p.progress || 0}%`}}></div>
// // // // // //                                                             </div>
// // // // // //                                                             <span className="text-[10px] text-gray-500 mt-1 block">{p.progress || 0}%</span>
// // // // // //                                                         </td>
// // // // // //                                                         <td className="p-4 text-center">
// // // // // //                                                             {selectedActionItem ? (
// // // // // //                                                                 <button 
// // // // // //                                                                     type="button"
// // // // // //                                                                     onClick={() => handleParticipantAction(userObj._id, selectedActionItem.type === 'quiz' ? 'reset' : 'pass')} 
// // // // // //                                                                     disabled={selectedActionItem.type !== 'quiz' && isCompleted}
// // // // // //                                                                     className={`px-3 py-1 rounded text-xs font-bold border transition-all flex items-center gap-1 mx-auto ${isCompleted ? 'bg-green-100 text-green-700 border-green-200 cursor-default' : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50'}`}
// // // // // //                                                                     aria-label="Aksi Peserta" title={selectedActionItem.type === 'quiz' ? 'Reset Kuis' : 'Luluskan Manual'}
// // // // // //                                                                 >
// // // // // //                                                                     {selectedActionItem.type === 'quiz' ? '↺ Reset' : (isCompleted ? '✓ Lulus' : '⚡ Luluskan')}
// // // // // //                                                                 </button>
// // // // // //                                                             ) : <span className="text-gray-300 text-xs">-</span>}
// // // // // //                                                         </td>
// // // // // //                                                         <td className="p-4 text-center"><button type="button" onClick={() => setChatTargetStudent({ name, email, _id: userObj._id })} className="p-2 rounded-full text-blue-500 hover:bg-blue-50 hover:scale-110 transition-all border border-transparent hover:border-blue-100" aria-label="Chat Peserta" title="Chat"><MessageSquare size={18}/></button></td>
// // // // // //                                                         <td className="p-4 text-center"><button type="button" onClick={() => handleViewStudentDetail(userObj)} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-600" aria-label="Lihat Detail" title="Detail"><Eye size={18}/></button></td>
// // // // // //                                                     </tr>
// // // // // //                                                 );
// // // // // //                                             })}
// // // // // //                                         </tbody>
// // // // // //                                     </table>
// // // // // //                                 )}
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 )}

// // // // // //                 {/* --- CHAT MODALS (GLOBAL ROOM STYLE) --- */}
// // // // // //                 {showParticipantChat && (<RoomChatModal title="Global Room (Peserta)" members={[...chatMembers, ...teamMembers]} onClose={() => setShowParticipantChat(false)} themeColor="bg-red-700" />)}
// // // // // //                 {showTeamChat && (<RoomChatModal title="Diskusi Tim Fasilitator" members={teamMembers} onClose={() => setShowTeamChat(false)} themeColor="bg-blue-600" />)}
// // // // // //                 {chatTargetStudent && (
// // // // // //                     <div className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-4">
// // // // // //                         <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
// // // // // //                             <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
// // // // // //                                 <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold border-2 border-white/30">{chatTargetStudent.name.charAt(0)}</div><div><h3 className="font-bold text-sm leading-tight">{chatTargetStudent.name}</h3><p className="text-[10px] opacity-80">{chatTargetStudent.email}</p></div></div>
// // // // // //                                 <button type="button" onClick={() => setChatTargetStudent(null)} className="hover:bg-blue-700 p-2 rounded-full font-bold" aria-label="Tutup Chat"><X size={18}/></button>
// // // // // //                             </div>
// // // // // //                             <div className="flex-1 p-4 bg-gray-100 overflow-y-auto space-y-3"><div className="flex justify-center"><span className="text-[10px] text-gray-400 bg-gray-200 px-2 py-1 rounded-full">Hari ini</span></div><div className="flex justify-start"><div className="bg-white p-3 rounded-xl rounded-bl-none text-sm shadow-sm max-w-[80%] text-gray-700">Halo {chatTargetStudent.name}, ada yang bisa dibantu?</div></div></div>
// // // // // //                             <div className="p-3 bg-white border-t flex gap-2"><input className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis pesan..." /><button type="button" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700" aria-label="Kirim"><Send size={18}/></button></div>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 )}

// // // // // //                 {/* --- [NEW] WALL OF FAME MODAL (FULL HISTORY) --- */}
// // // // // //                 {showWallOfFameModal && (
// // // // // //                     <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
// // // // // //                         <div className="bg-white w-full max-w-lg h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // // // // //                             <div className="bg-yellow-500 p-4 text-white flex justify-between items-center shadow-md">
// // // // // //                                 <h3 className="font-bold text-lg flex items-center gap-2"><Trophy size={20}/> Wall of Fame History</h3>
// // // // // //                                 <button type="button" onClick={() => setShowWallOfFameModal(false)} className="hover:bg-yellow-600 p-2 rounded-full" aria-label="Tutup"><X size={24}/></button>
// // // // // //                             </div>
// // // // // //                             <div className="flex-1 p-4 overflow-y-auto bg-yellow-50 space-y-3">
// // // // // //                                 {recentCompletions.length > 0 ? recentCompletions.map((rc:any, i:number) => (
// // // // // //                                     <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
// // // // // //                                         <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold"><Award size={20}/></div>
// // // // // //                                         <div>
// // // // // //                                             <p className="font-bold text-gray-800">{rc.name}</p>
// // // // // //                                             <p className="text-xs text-gray-500">Menyelesaikan {rc.module} pada {rc.date || 'Hari ini'}</p>
// // // // // //                                         </div>
// // // // // //                                     </div>
// // // // // //                                 )) : <div className="text-center text-gray-400 mt-10">Belum ada data kelulusan.</div>}
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 )}

// // // // // //                 {/* --- [NEW] STUDENT DETAIL MODAL (REVIEW ANSWERS) --- */}
// // // // // //                 {showStudentDetailModal && studentDetail && (
// // // // // //                     <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
// // // // // //                         <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // // // // //                             <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
// // // // // //                                 <div className="flex items-center gap-3">
// // // // // //                                     <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">{studentDetail.name?.charAt(0)}</div>
// // // // // //                                     <div>
// // // // // //                                         <h3 className="font-bold text-lg">{studentDetail.name}</h3>
// // // // // //                                         <p className="text-xs opacity-80">{studentDetail.email}</p>
// // // // // //                                     </div>
// // // // // //                                 </div>
// // // // // //                                 <button type="button" onClick={() => setShowStudentDetailModal(false)} className="hover:bg-indigo-700 p-2 rounded-full" aria-label="Tutup"><X size={24}/></button>
// // // // // //                             </div>
// // // // // //                             <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
// // // // // //                                 <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><FileText size={18}/> Riwayat Pengerjaan & Upload</h4>
// // // // // //                                 <div className="space-y-4">
// // // // // //                                     {/* Placeholder untuk detail jawaban - Di real app, fetch data jawaban spesifik siswa ini */}
// // // // // //                                     <div className="p-4 bg-white border rounded-xl shadow-sm">
// // // // // //                                         <p className="text-sm font-bold text-gray-800 mb-2">Tugas Upload: Modul 1</p>
// // // // // //                                         <a href="#" className="text-blue-600 text-xs hover:underline flex items-center gap-1"><Download size={12}/> Download File Tugas</a>
// // // // // //                                     </div>
// // // // // //                                     <div className="p-4 bg-white border rounded-xl shadow-sm">
// // // // // //                                         <p className="text-sm font-bold text-gray-800 mb-2">Esai: Modul 2</p>
// // // // // //                                         <p className="text-xs text-gray-600 italic">"Jawaban siswa akan muncul di sini..."</p>
// // // // // //                                     </div>
// // // // // //                                     <p className="text-center text-gray-400 text-xs mt-4">Fitur review detail sedang dalam pengembangan backend.</p>
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 )}

// // // // // //                 <div className="border-t-4 border-gray-100 pt-8"></div>
// // // // // //                 <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
// // // // // //                     <div className="flex justify-between items-start mb-6">
// // // // // //                         <h2 className="text-2xl font-bold text-gray-800">🎓 Pengaturan Sertifikat</h2>
// // // // // //                         <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg text-xs font-medium border border-blue-200 max-w-md shadow-sm">
// // // // // //                             <div className="flex gap-2 items-start">
// // // // // //                                 <Info size={16} className="shrink-0 mt-0.5"/>
// // // // // //                                 <div>
// // // // // //                                     <strong>Format Nomor Otomatis:</strong><br/>
// // // // // //                                     Gunakan placeholder <code>{'{NO}'}</code> agar nomor urut peserta terisi otomatis.<br/>
// // // // // //                                     Format Standard: <code>00{'{NO}'}/DIKLAT/02.01.2026/I/2026</code>
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     </div>

// // // // // //                     {/* [FIX] KITA KIRIM DATA KOMPETENSI AGAR PREVIEW HALAMAN BELAKANG MUNCUL */}
// // // // // //                     <CertificateConfigForm 
// // // // // //                         initialData={certConfig} 
// // // // // //                         onSave={handleSaveCertConfig} 
// // // // // //                         isSaving={isSavingCert} 
// // // // // //                         competencies={competencies} 
// // // // // //                         includeCompetencies={includeCompetencies}
// // // // // //                         courseId={courseId}
// // // // // //                     />
                    
// // // // // //                     {/* [NEW] TABEL KONFIRMASI DATA SERTIFIKAT TERSIMPAN */}
// // // // // //                     {certConfig && (
// // // // // //                         <div className="mt-8 border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 shadow-sm">
// // // // // //                             <div className="bg-gray-100 px-4 py-3 border-b flex items-center gap-2 font-bold text-gray-700 text-sm">
// // // // // //                                 <FileBadge size={16}/> Data Konfigurasi Tersimpan (Preview)
// // // // // //                             </div>
// // // // // //                             <div className="p-4 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
// // // // // //                                 <div>
// // // // // //                                     <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Hash size={12}/> Format Nomor</p>
// // // // // //                                     <p className="font-mono bg-white border px-3 py-2 rounded text-gray-800 shadow-sm">{certConfig.certificateNumber || '-'}</p>
// // // // // //                                 </div>
// // // // // //                                 <div>
// // // // // //                                     <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar size={12}/> Tanggal Pelaksanaan</p>
// // // // // //                                     <p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.executionDate ? new Date(certConfig.executionDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '-'}</p>
// // // // // //                                 </div>
// // // // // //                                 <div>
// // // // // //                                     <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MapPin size={12}/> Kota Penerbit</p>
// // // // // //                                     <p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.city || '-'}</p>
// // // // // //                                 </div>
// // // // // //                                 <div>
// // // // // //                                     <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><UserCheck size={12}/> Penanda Tangan</p>
// // // // // //                                     <p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.signatoryName} <span className="font-normal text-gray-500 text-xs block">({certConfig.signatoryPosition})</span></p>
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     )}

// // // // // //                     <div className="my-10 border-t border-gray-100"></div>
// // // // // //                     <CompetencyForm initialData={competencies} onChange={(data) => setCompetencies(data)} />
// // // // // //                     <div className="mt-4 flex items-center gap-2 bg-gray-50 p-3 rounded-lg border"><input type="checkbox" id="includeComp" checked={includeCompetencies} onChange={(e) => setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Sertakan Kompetensi" title="Sertakan Kompetensi" /><label htmlFor="includeComp" className="text-sm font-bold text-gray-700 cursor-pointer">Tampilkan daftar kompetensi di halaman belakang sertifikat?</label></div>
// // // // // //                     <div className="mt-4 flex justify-end"><button type="button" onClick={handleSaveCompetencies} disabled={isSavingCompetencies} className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi" title="Simpan">Simpan Kompetensi</button></div>
// // // // // //                 </section>
       
// // // // // //                 <div className="mt-8 p-6 bg-gray-50 rounded-3xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3">
// // // // // //                     <h3 className="text-lg font-bold text-gray-800">Selesai?</h3>
// // // // // //                     <button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Ubah Status Publikasi" title="Ubah Status">{course?.isPublished ? 'Tarik Kembali ke Draft' : '🚀 PUBLISH SEKARANG'}</button>
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </Protected>
// // // // // //     );
// // // // // // }
// // // // // 'use client';

// // // // // import { useEffect, useState, useRef, useMemo } from 'react';
// // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // import Protected from '@/components/Protected';
// // // // // import CompetencyForm from '@/components/admin/CompetencyForm';
// // // // // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // // // // import {
// // // // //     Calendar, School, RefreshCw, LogOut, CheckCircle2, Video,
// // // // //     Link as LinkIcon, Users, Eye, MessageSquare, MessageCircle, X, Send, MoreHorizontal, ExternalLink,
// // // // //     Search, User as UserIcon, Mail, Smile, Trophy, Award, Plus, Trash2, Clock, Paperclip, FileText, Download,
// // // // //     FileBadge, MapPin, UserCheck, Hash, Info, UserX, ChevronDown, ChevronUp
// // // // // } from 'lucide-react';

// // // // // import dynamic from 'next/dynamic';
// // // // // import 'react-quill/dist/quill.snow.css'; 

// // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // //     ssr: false,
// // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // });

// // // // // // --- HELPER ---
// // // // // const getRomanMonth = (date: Date) => {
// // // // //     const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
// // // // //     return romans[date.getMonth()];
// // // // // };

// // // // // const generateDefaultCertFormat = () => {
// // // // //     const now = new Date();
// // // // //     const dd = String(now.getDate()).padStart(2, '0');
// // // // //     const mm = String(now.getMonth() + 1).padStart(2, '0');
// // // // //     const yyyy = now.getFullYear();
// // // // //     const roman = getRomanMonth(now);
// // // // //     return `00{NO}/DIKLAT/${dd}.${mm}.${yyyy}/${roman}/${yyyy}`;
// // // // // };

// // // // // // --- CHAT MODAL ---
// // // // // function RoomChatModal({ title, members, onClose }: any) { return <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"><div className="bg-white p-6 rounded-lg"><h3 className="font-bold mb-4">{title}</h3><button onClick={onClose} aria-label="Tutup Chat">Tutup</button></div></div> }

// // // // // // --- MAIN PAGE ---
// // // // // export default function AdminCourseDetailPage() {
// // // // //     const params = useParams();
// // // // //     const courseId = params?.id as string;
// // // // //     const router = useRouter();
// // // // //     const fileInputRef = useRef<HTMLInputElement>(null);

// // // // //     const [course, setCourse] = useState<any>(null);
// // // // //     const [loading, setLoading] = useState(true);
// // // // //     const [isBrowser, setIsBrowser] = useState(false);
// // // // //     const [isUploadingCover, setIsUploadingCover] = useState(false);
// // // // //     const [notification, setNotification] = useState<string | null>(null);

// // // // //     // Modal States
// // // // //     const [showParticipantModal, setShowParticipantModal] = useState(false);
// // // // //     const [showParticipantChat, setShowParticipantChat] = useState(false);
// // // // //     const [showTeamChat, setShowTeamChat] = useState(false);
// // // // //     const [showPreviewModal, setShowPreviewModal] = useState(false);
// // // // //     const [showWallOfFameModal, setShowWallOfFameModal] = useState(false);
// // // // //     const [showStudentDetailModal, setShowStudentDetailModal] = useState(false); 
// // // // //     const [studentDetail, setStudentDetail] = useState<any>(null);
   
// // // // //     const [participants, setParticipants] = useState<any[]>([]);
// // // // //     const [loadingParticipants, setLoadingParticipants] = useState(false);
// // // // //     const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);
   
// // // // //     const [chatMembers, setChatMembers] = useState<any[]>([]);
// // // // //     const [teamMembers, setTeamMembers] = useState<any[]>([]);
// // // // //     const [recentCompletions, setRecentCompletions] = useState<any[]>([]);

// // // // //     const [participantFilter, setParticipantFilter] = useState('');
// // // // //     const [actionOptions, setActionOptions] = useState<any[]>([]);
// // // // //     const [selectedActionId, setSelectedActionId] = useState<string>('');

// // // // //     const [facilitators, setFacilitators] = useState<any[]>([]);
// // // // //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>([]);
// // // // //     const [currentUserRole, setCurrentUserRole] = useState('');
// // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
   
// // // // //     // Content State
// // // // //     const [showModuleForm, setShowModuleForm] = useState(false);
// // // // //     const [modTitle, setModTitle] = useState('');
// // // // //     const [modIsMandatory, setModIsMandatory] = useState(true);
// // // // //     const [modFacilitatorId, setModFacilitatorId] = useState('');
// // // // //     const [modJp, setModJp] = useState(0);
// // // // //     const [modSchedule, setModSchedule] = useState('');
// // // // //     const [editingModId, setEditingModId] = useState<string | null>(null);
   
// // // // //     const [activeModId, setActiveModId] = useState<string | null>(null);
// // // // //     const [editingLesId, setEditingLesId] = useState<string | null>(null);
// // // // //     const [lesTitle, setLesTitle] = useState('');
// // // // //     const [lesType, setLesType] = useState('lesson');
// // // // //     const [lesContent, setLesContent] = useState('');
// // // // //     const [lesIsMandatory, setLesIsMandatory] = useState(true);
// // // // //     const [lesJp, setLesJp] = useState(0);
// // // // //     const [lesSchedule, setLesSchedule] = useState('');
// // // // //     const [lesFacilitatorId, setLesFacilitatorId] = useState('');

// // // // //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// // // // //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// // // // //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// // // // //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// // // // //     const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // // //     const [uploading, setUploading] = useState(false);
// // // // //     const [quizDuration, setQuizDuration] = useState(10);
// // // // //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// // // // //     const [pollQuestion, setPollQuestion] = useState('');
// // // // //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
   
// // // // //     // Essay State
// // // // //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// // // // //     const [useEssayTimer, setUseEssayTimer] = useState(false);

// // // // //     const [competencies, setCompetencies] = useState<any[]>([]);
// // // // //     const [includeCompetencies, setIncludeCompetencies] = useState(true);
// // // // //     const [certConfig, setCertConfig] = useState<any>(null);
// // // // //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// // // // //     const [isSavingCert, setIsSavingCert] = useState(false);

// // // // //     const activeTeam = facilitators.filter(f => selectedFacilitatorIds.includes(f._id));

// // // // //     const quillModules = useMemo(() => ({
// // // // //         toolbar: {
// // // // //             container: [
// // // // //                 [{ 'header': [1, 2, 3, false] }],
// // // // //                 ['bold', 'italic', 'underline', 'strike', 'blockquote'],
// // // // //                 [{'list': 'ordered'}, {'list': 'bullet'}],
// // // // //                 ['link', 'image', 'video'], 
// // // // //                 [{ 'color': [] }, { 'background': [] }],
// // // // //                 ['clean']
// // // // //             ]
// // // // //         }
// // // // //     }), []);

// // // // //     useEffect(() => {
// // // // //         setIsBrowser(true);
// // // // //         if (typeof window !== 'undefined') {
// // // // //             const userStr = localStorage.getItem('user');
// // // // //             if (userStr) {
// // // // //                 const user = JSON.parse(userStr);
// // // // //                 setCurrentUserRole(user.role);
// // // // //             }
// // // // //             const savedToken = localStorage.getItem('google_class_token');
// // // // //             if (savedToken) {
// // // // //                 setGoogleToken(savedToken);
// // // // //                 fetchClassroomCourses(savedToken);
// // // // //             }
// // // // //         }
// // // // //         if (courseId) load();
// // // // //     }, [courseId]);

// // // // //     const load = async () => { 
// // // // //         try {
// // // // //             const data = await api(`/api/courses/${courseId}`);
// // // // //             const courseData = data.course || data;
// // // // //             setCourse(courseData);
            
// // // // //             const opts: any[] = [];
// // // // //             courseData.modules?.forEach((m: any) => {
// // // // //                 m.lessons?.forEach((l: any) => {
// // // // //                     let label = l.title;
// // // // //                     if(l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
// // // // //                     else label = `📄 ${l.title}`;
// // // // //                     opts.push({ id: l._id, label, type: l.type });
// // // // //                 });
// // // // //             });
// // // // //             setActionOptions(opts);

// // // // //             if (courseData.facilitatorIds) setSelectedFacilitatorIds(courseData.facilitatorIds.map((f: any) => (typeof f === 'object' && f !== null) ? f._id : f));
// // // // //             if (courseData.competencies) setCompetencies(courseData.competencies);
// // // // //             if (courseData.includeCompetenciesInCertificate !== undefined) setIncludeCompetencies(courseData.includeCompetenciesInCertificate);
// // // // //             let config = courseData.certificateConfig || {};
// // // // //             if (!config.certificateNumber) config = { ...config, certificateNumber: generateDefaultCertFormat() };
// // // // //             setCertConfig(config);

// // // // //             const userStr = localStorage.getItem('user');
// // // // //             if (userStr) {
// // // // //                 const usersRes = await api('/api/admin/users');
// // // // //                 if (usersRes.users) {
// // // // //                     const facs = usersRes.users.filter((u: any) => u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN');
// // // // //                     setFacilitators(facs);
// // // // //                     const team = facs.filter((u: any) => courseData.facilitatorIds?.some((f: any) => (f._id || f) === u._id) || u.role === 'SUPER_ADMIN');
// // // // //                     setTeamMembers(team.map((t: any) => ({ ...t, role: 'Facilitator' })));
// // // // //                 }
// // // // //             }
// // // // //             fetchParticipants();
// // // // //         } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // //     };

// // // // //     const fetchParticipants = async () => {
// // // // //         setLoadingParticipants(true);
// // // // //         try {
// // // // //             const res = await api(`/api/courses/${courseId}/participants`);
// // // // //             const parts = res.participants || res.data || [];
// // // // //             setParticipants(parts);
            
// // // // //             const chatList = parts.map((p: any) => {
// // // // //                 const userObj = p.user || p.student || p;
// // // // //                 return { name: userObj.name || 'User', avatarUrl: userObj.avatarUrl || userObj.image, role: 'Student', _id: userObj._id };
// // // // //             });
// // // // //             setChatMembers([...teamMembers, ...chatList]);
// // // // //         } catch (error) { console.error("Gagal load peserta"); } finally { setLoadingParticipants(false); }
// // // // //     };

// // // // //     const handleRejectParticipant = async (enrollmentId: string, studentName: string) => {
// // // // //         if (!confirm(`Apakah Anda yakin ingin MENOLAK/MENGHAPUS pendaftaran "${studentName}"?`)) return;
// // // // //         try { await api(`/api/enrollments/${enrollmentId}`, { method: 'DELETE' }); alert(`Peserta ${studentName} berhasil dihapus.`); fetchParticipants(); } catch (e: any) { alert("Gagal: " + e.message); }
// // // // //     };

// // // // //     const getFacilitatorName = (data: any) => {
// // // // //         if (!data) return null;
// // // // //         if (typeof data === 'object' && data.name) return data.name;
// // // // //         const found = facilitators.find(f => f._id === data || f.id === data);
// // // // //         return found ? found.name : 'Unknown';
// // // // //     };

// // // // //     const handleSaveModule = async () => { 
// // // // //         if (!modTitle.trim()) return alert("Judul wajib"); 
// // // // //         const safeFacilitatorId = modFacilitatorId || null;
// // // // //         const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: safeFacilitatorId, jp: modJp, scheduleDate: modSchedule || null }; 
// // // // //         try { if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); resetModuleForm(); load(); } catch(e: any) { alert(e.message); } 
// // // // //     };

// // // // //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
// // // // //     const resetModuleForm = () => { setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false); };
// // // // //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); setCourse((prev: any) => ({ ...prev, isPublished: newStatus })); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); load(); } } catch (e: any) { alert(e.message); } };
// // // // //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); load(); } catch (e: any) { alert(e.message); } };
// // // // //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } setCourse(newCourse); try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); } catch (err) { load(); } };
// // // // //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); const res = await apiUpload(`/api/upload/course/${courseId}/cover`, formData); setCourse((prev: any) => ({ ...prev, thumbnailUrl: res.imageUrl || res.url })); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// // // // //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); };
// // // // //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// // // // //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };
// // // // //     const handleViewStudentDetail = (student: any) => { setStudentDetail(student); setShowStudentDetailModal(true); };
// // // // //     const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => { 
// // // // //         if (!selectedActionId) return alert("Pilih Materi/Kuis di dropdown atas dulu!"); 
// // // // //         const selectedItem = actionOptions.find(o => o.id === selectedActionId);
// // // // //         if (action === 'pass') { if(!confirm(`Luluskan peserta?`)) return; try { await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId, lessonId: selectedActionId, courseId } }); alert("Berhasil!"); fetchParticipants(); } catch(e:any) { alert(e.message); } }
// // // // //         else if (action === 'reset') { if(!confirm(`Reset progress?`)) return; try { await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId, quizId: selectedActionId } }); alert("Reset berhasil!"); fetchParticipants(); } catch(e:any) { alert(e.message); } }
// // // // //     };
    
// // // // //     // FORM LOGIC
// // // // //     const resetLessonForm = () => { setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesIsMandatory(true); setLesContent(''); setSelectedFile(null); setLesJp(0); setLesFacilitatorId(''); setLesSchedule(''); setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(10); setPollQuestion(''); setPollOptions(['', '']); setSelectedClassroom(null); setEssayQuestions(['']); setUseEssayTimer(false); };

// // // // //     const handleSaveLesson = async (modId: string) => {
// // // // //         if (!lesTitle.trim()) { alert("Judul wajib"); return; }
// // // // //         let fileUrl = '';
// // // // //         if (selectedFile) { try { setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); const res = await apiUpload('/api/upload', fd); fileUrl = res.url || res.file?.url || res.imageUrl; } catch (err) { alert("Gagal upload"); return; } finally { setUploading(false); } }
// // // // //         else if (editingLesId) { const mod = course?.modules.find((m: any) => m._id === modId); const les = mod?.lessons.find((l: any) => l._id === editingLesId); if (les) fileUrl = les.fileUrl; }

// // // // //         const finalType = lesType; // Gunakan tipe yang sedang dipilih (essay/quiz/etc)
        
// // // // //         const safeFacilitatorId = lesFacilitatorId || null;
// // // // //         const body: any = {
// // // // //             title: lesTitle, type: finalType, isActive: true, isMandatory: lesIsMandatory, jp: lesJp, facilitatorId: safeFacilitatorId, scheduleDate: lesSchedule || null,
// // // // //             questions: (lesType === 'quiz') ? questions : undefined,
// // // // //             quizDuration: (lesType === 'quiz' || (lesType === 'essay' && useEssayTimer)) ? quizDuration : undefined,
// // // // //             pollQuestion: (lesType === 'poll') ? pollQuestion : undefined,
// // // // //             pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined,
// // // // //             classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined,
// // // // //         };

// // // // //         if (lesType === 'essay') {
// // // // //             body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 }));
// // // // //             body.content = lesContent; 
// // // // //         }

// // // // //         if(fileUrl) body.fileUrl = fileUrl;
// // // // //         if(lesType === 'video_url') body.videoUrl = lesContent;
// // // // //         else if(lesType === 'virtual_class') body.meetingLink = lesContent;
// // // // //         else if(lesType === 'upload_doc' || lesType === 'lesson') body.content = lesContent;

// // // // //         try { if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); resetLessonForm(); load(); } catch(e:any) { alert(e.message); }
// // // // //     };

// // // // //     const startEditLesson = (modId: string, les: any) => {
// // // // //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title);
        
// // // // //         if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) {
// // // // //             setLesType('essay'); 
// // // // //             setEssayQuestions(les.questions.map((q:any) => q.question)); 
// // // // //             setLesContent(les.content || ''); 
// // // // //             if(les.quizDuration) { setUseEssayTimer(true); setQuizDuration(les.quizDuration); } else { setUseEssayTimer(false); }
// // // // //         } else { setLesType(les.type); }

// // // // //         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || ''));
// // // // //         if (les.type === 'video_url') setLesContent(les.videoUrl||''); else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); else if (les.type !== 'essay') setLesContent(les.content||'');
// // // // //         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(les.quizDuration||10); }
// // // // //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); }
// // // // //         if (les.type === 'google_classroom') { if(googleToken && classroomCourses.length === 0) fetchClassroomCourses(); if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); }
        
// // // // //         // [FIX] Scroll Agresif ke Form agar tidak "kejauhan"
// // // // //         setTimeout(() => {
// // // // //             const formElement = document.getElementById(`form-${modId}`);
// // // // //             if(formElement) {
// // // // //                 formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
// // // // //             }
// // // // //         }, 300);
// // // // //     };

// // // // //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); load(); };
// // // // //     const addPollOption = () => setPollOptions([...pollOptions, '']); const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); };
// // // // //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); };
// // // // //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); const updateEssay = (idx: number, val: string) => { const newQ = [...essayQuestions]; newQ[idx] = val; setEssayQuestions(newQ); }; const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };
    
// // // // //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); const width = 500, height = 600; const left = (window.screen.width - width) / 2; const top = (window.screen.height - height) / 2; window.open(url, 'GoogleAuthPopup', `width=${width},height=${height},top=${top},left=${left}`); } catch (e) { alert("Gagal Auth Google"); } };
// // // // //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } };
// // // // //     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const res = await fetch(`http://localhost:4000/api/classroom/courses`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'x-google-token': token } }); if (res.status === 401) { localStorage.removeItem('google_class_token'); setGoogleToken(null); return; } const data = await res.json(); if (data.courses) setClassroomCourses(data.courses); } catch (e) { console.error(e); } finally { setIsCheckingGoogle(false); } };

// // // // //     if (loading || !isBrowser) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div></div>;

// // // // //     return (
// // // // //         <Protected roles={["FACILITATOR", "SUPER_ADMIN"]}>
// // // // //             <div className="max-w-6xl mx-auto p-6 space-y-12 pb-32 relative">
// // // // //                 {/* HEADER */}
// // // // //                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 gap-4">
// // // // //                     <div className="flex-1">
// // // // //                         <h1 className="text-3xl font-bold text-gray-800">{course?.title}</h1>
// // // // //                         <div className="flex gap-2 items-center mt-2">
// // // // //                             <button type="button" onClick={() => toggleStatus()} className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer border transition-colors ${course?.isPublished ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`} aria-label="Toggle Publish" title="Ubah Status Publikasi">{course?.isPublished ? 'PUBLISHED' : 'DRAFT'}</button>
// // // // //                             <span className="text-xs text-gray-500 font-medium">{course?.modules?.length || 0} Modul • {course?.modules?.reduce((acc: number, m: any) => acc + m.lessons.length, 0) || 0} Materi</span>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                     <button type="button" onClick={() => router.push('/admin/courses')} className="text-sm font-bold text-gray-500 hover:text-gray-800 px-4 py-2 border rounded-lg hover:bg-gray-50" aria-label="Kembali" title="Kembali">← Kembali</button>
// // // // //                 </div>

// // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // //                     {/* KIRI: COVER & TIM */}
// // // // //                     <div className="md:col-span-1 space-y-6">
// // // // //                         {/* Cover Image */}
// // // // //                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
// // // // //                             {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
// // // // //                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Upload Cover" title="Ganti Sampul">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Input Cover" /></div>
// // // // //                         </div>

// // // // //                         {/* [RESTORED] TIM FASILITATOR */}
// // // // //                         {currentUserRole === 'SUPER_ADMIN' && (
// // // // //                             <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
// // // // //                                 <div className="flex justify-between items-center mb-4">
// // // // //                                     <div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div>
// // // // //                                     <button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" title="Simpan Tim" aria-label="Simpan Tim">Simpan</button>
// // // // //                                 </div>
// // // // //                                 <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">
// // // // //                                     {facilitators.map((user: any) => (
// // // // //                                         <label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}>
// // // // //                                             <input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih fasilitator ${user.name}`} title={`Pilih ${user.name}`} />
// // // // //                                             <div className="flex-1 overflow-hidden">
// // // // //                                                 <div className="text-xs font-bold truncate">{user.name}</div>
// // // // //                                                 <div className="text-[10px] text-gray-500 truncate">{user.email}</div>
// // // // //                                             </div>
// // // // //                                         </label>
// // // // //                                     ))}
// // // // //                                 </div>
// // // // //                                 <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" title="Cari Fasilitator" />
// // // // //                             </div>
// // // // //                         )}

// // // // //                         {/* Wall of Fame */}
// // // // //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-6 overflow-hidden">
// // // // //                             <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 text-yellow-600 cursor-pointer" onClick={() => setShowWallOfFameModal(true)}><Trophy size={18}/> Wall of Fame (Klik)</h3>
// // // // //                             <div className="space-y-2">
// // // // //                                 {recentCompletions.length > 0 ? recentCompletions.slice(0,3).map((rc:any, i:number) => (
// // // // //                                     <div key={i} className="flex items-center gap-2 p-2 bg-yellow-50 rounded border border-yellow-100 text-xs">
// // // // //                                         <Award size={12} className="text-yellow-600"/> <span>{rc.name}</span>
// // // // //                                     </div>
// // // // //                                 )) : <span className="text-xs text-gray-400">Belum ada data.</span>}
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>

// // // // //                     {/* KANAN: MODUL */}
// // // // //                     <section className="md:col-span-2 space-y-6">
// // // // //                         <div className="flex justify-between items-center"><h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">📚 Modul & Materi</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-red-700 text-white px-5 py-2 rounded-xl font-bold shadow-lg hover:bg-red-800 flex items-center gap-2" aria-label="Tambah Modul" title="Tambah Modul">+ Tambah Modul</button></div>
                        
// // // // //                         {showModuleForm && (
// // // // //                             <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200">
// // // // //                                 <div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul" title="Nama Modul" /><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" min="0" aria-label="JP" title="Jam Pelajaran" /></div>
// // // // //                                 <div className="grid grid-cols-2 gap-4">
// // // // //                                     <div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih Fasilitator" title="Pilih Fasilitator"><option value="">-- Pilih Fasilitator dari Tim --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div>
// // // // //                                     <div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal Pelaksanaan Modul" /></div>
// // // // //                                 </div>
// // // // //                                 <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={modIsMandatory} onChange={e => setModIsMandatory(e.target.checked)} className="w-4 h-4 text-red-600 rounded" aria-label="Wajib" title="Wajib" /><span>Wajib diselesaikan?</span></label>
// // // // //                                 <div className="flex gap-2 justify-end pt-2"><button type="button" onClick={resetModuleForm} className="text-gray-500 font-bold px-3 text-sm" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700" aria-label="Simpan">Simpan</button></div>
// // // // //                             </form>
// // // // //                         )}

// // // // //                         <DragDropContext onDragEnd={onDragEnd}>
// // // // //                             <Droppable droppableId="all-modules" type="module">
// // // // //                                 {(provided) => (
// // // // //                                     <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
// // // // //                                         {course?.modules?.map((m: any, idx: number) => (
// // // // //                                             <Draggable key={m._id} draggableId={m._id} index={idx}>
// // // // //                                                 {(provided) => (
// // // // //                                                     <div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-2xl overflow-hidden shadow-sm bg-white">
// // // // //                                                         {/* [RESTORED] MODULE HEADER DETAIL */}
// // // // //                                                         <div className="bg-gray-100 p-4 flex justify-between items-center" {...provided.dragHandleProps}>
// // // // //                                                             <div className="flex items-center gap-3">
// // // // //                                                                 <span className="cursor-grab text-gray-400 text-xl" aria-label="Geser Modul">☰</span>
// // // // //                                                                 <span className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{idx+1}</span>
// // // // //                                                                 <div>
// // // // //                                                                     <div className="flex items-center gap-2">
// // // // //                                                                         <h3 className="font-bold text-gray-800">{m.title}</h3>
// // // // //                                                                         {m.jp > 0 && <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded border border-blue-200">{m.jp} JP</span>}
// // // // //                                                                     </div>
// // // // //                                                                     <div className="flex items-center gap-2 mt-1">
// // // // //                                                                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${m.isMandatory ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-600'}`}>{m.isMandatory ? 'WAJIB' : 'OPSIONAL'}</span>
// // // // //                                                                         {m.facilitatorId && <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded flex items-center gap-1">👤 {getFacilitatorName(m.facilitatorId)}</span>}
// // // // //                                                                         {m.scheduleDate && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1"><Calendar size={10}/> {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // // //                                                                     </div>
// // // // //                                                                 </div>
// // // // //                                                             </div>
// // // // //                                                             <div className="flex items-center gap-2"><button type="button" onClick={() => startEditModule(m)} className="text-blue-600 font-bold text-xs px-2" aria-label="Edit Modul">Edit</button><button type="button" onClick={() => toggleStatus(m._id)} className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${m.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`} aria-label="Toggle Status Modul">{m.isActive ? 'ON' : 'OFF'}</button></div>
// // // // //                                                         </div>

// // // // //                                                         <Droppable droppableId={m._id} type="lesson">
// // // // //                                                             {(provided) => (
// // // // //                                                                 <div ref={provided.innerRef} {...provided.droppableProps} className="p-4 space-y-3 min-h-[50px]">
// // // // //                                                                     {m.lessons?.map((l: any, lIdx: number) => (
// // // // //                                                                         <Draggable key={l._id} draggableId={l._id} index={lIdx}>
// // // // //                                                                             {(provided) => (
// // // // //                                                                                 <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-3 bg-white border rounded-xl hover:shadow-md transition-shadow">
// // // // //                                                                                     <div className="flex items-center gap-3">
// // // // //                                                                                         <span className="cursor-grab text-gray-300" aria-label="Geser Lesson">::</span>
// // // // //                                                                                         <span className="text-xl">{l.type === 'virtual_class' ? '🎥' : l.type === 'google_classroom' ? '🏫' : l.type === 'video_url' ? '🎞️' : l.type === 'quiz' ? '📝' : l.type === 'poll' ? '📊' : l.type === 'upload_doc' ? '📤' : l.type === 'image' ? '🖼️' : '📄'}</span>
// // // // //                                                                                         <div>
// // // // //                                                                                             <p className="text-sm font-bold text-gray-800">{l.title}</p>
// // // // //                                                                                             {/* [RESTORED] Detail Lesson */}
// // // // //                                                                                             <div className="flex gap-2 items-center mt-0.5">
// // // // //                                                                                                 {l.jp > 0 && <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 rounded border border-blue-100">{l.jp} JP</span>}
// // // // //                                                                                                 {l.scheduleDate && <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-1.5 rounded border border-purple-100 flex items-center gap-1"><Calendar size={10}/> {new Date(l.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // // //                                                                                                 {(l.facilitatorId || l.facilitator) && (<span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">👤 {getFacilitatorName(l.facilitatorId || l.facilitator)}</span>)}
// // // // //                                                                                             </div>
// // // // //                                                                                         </div>
// // // // //                                                                                     </div>
// // // // //                                                                                     <div className="flex items-center gap-2"><button type="button" onClick={() => startEditLesson(m._id, l)} className="text-blue-500 p-1" aria-label="Edit Lesson">✎</button><button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`px-2 py-1 rounded text-[10px] font-bold border ${l.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`} aria-label="Toggle Status Lesson">{l.isActive ? 'ON' : 'OFF'}</button><button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-gray-300 hover:text-red-500" aria-label="Hapus Lesson">🗑️</button></div>
// // // // //                                                                                 </div>
// // // // //                                                                             )}
// // // // //                                                                         </Draggable>
// // // // //                                                                     ))}
// // // // //                                                                     {provided.placeholder}
                                                                    
// // // // //                                                                     {activeModId === m._id ? (
// // // // //                                                                         <div id={`form-${m._id}`} className="bg-blue-50 p-5 rounded-xl border border-blue-200 space-y-4">
// // // // //                                                                             <div className="grid grid-cols-12 gap-3">
// // // // //                                                                                 <div className="col-span-4"><select className="w-full p-2 border rounded-lg text-sm" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Pilih Tipe Konten"><option value="lesson">📄 Materi Teks</option><option value="essay">📝 Esai</option><option value="slide">🖥️ Slide Presentasi</option><option value="image">🖼️ Upload Gambar</option><option value="download_doc">📥 Upload Dokumen</option><option value="upload_doc">📤 Tugas Upload</option><option value="quiz">📝 Kuis</option><option value="poll">📊 Polling</option><option value="video_url">🎞️ Video URL (YouTube)</option><option value="virtual_class">🎥 Kelas Virtual (Zoom/Teams)</option><option value="google_classroom">🏫 Google Classroom</option></select></div>
// // // // //                                                                                 <div className="col-span-6"><input className="w-full p-2 border rounded-lg text-sm" placeholder="Judul..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Lesson" /></div>
// // // // //                                                                                 <div className="col-span-2"><input type="number" className="w-full p-2 border rounded-lg text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="Jam Pelajaran Lesson" /></div>
// // // // //                                                                             </div>
                                                                            
// // // // //                                                                             <div className="grid grid-cols-2 gap-4">
// // // // //                                                                                 <div>
// // // // //                                                                                     <label className="text-xs font-bold text-gray-500 block mb-1">Fasilitator Pengampu</label>
// // // // //                                                                                     <select value={lesFacilitatorId} onChange={e => setLesFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm" aria-label="Pilih Fasilitator" title="Pilih Fasilitator">
// // // // //                                                                                         <option value="">-- Sama dengan Modul ({getFacilitatorName(m.facilitatorId)}) --</option>
// // // // //                                                                                         {activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}
// // // // //                                                                                     </select>
// // // // //                                                                                 </div>
// // // // //                                                                                 <div>
// // // // //                                                                                     <label className="text-xs font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label>
// // // // //                                                                                     <input type="date" className="w-full border p-2 rounded text-sm" value={lesSchedule} onChange={e => setLesSchedule(e.target.value)} aria-label="Tanggal Materi" title="Tanggal Materi" />
// // // // //                                                                                 </div>
// // // // //                                                                             </div>
                                                                            
// // // // //                                                                             <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e => setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib" title="Wajib" /><span>Materi ini wajib diselesaikan?</span></label>

// // // // //                                                                             {lesType === 'essay' && (
// // // // //                                                                                 <div className="space-y-4 bg-white p-4 rounded border border-blue-100">
// // // // //                                                                                     <label className="block text-xs font-bold text-gray-500">Instruksi / Konteks Soal:</label>
// // // // //                                                                                     <div className="bg-white rounded-lg overflow-hidden border border-gray-200"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-40 mb-12" placeholder="Tulis instruksi atau bacaan soal..." /></div>
// // // // //                                                                                     <h4 className="text-sm font-bold text-gray-700 mt-4">Daftar Pertanyaan Esai:</h4>
// // // // //                                                                                     {essayQuestions.map((q, idx) => (<div key={idx} className="flex gap-2"><span className="text-sm font-bold text-gray-500 py-2">{idx + 1}.</span><textarea className="flex-1 p-2 border rounded text-sm h-20" placeholder="Tulis pertanyaan..." value={q} onChange={e => updateEssay(idx, e.target.value)} aria-label={`Pertanyaan Esai ${idx+1}`}/>{essayQuestions.length > 1 && (<button type="button" onClick={() => removeEssay(idx)} className="text-red-500 font-bold px-2 self-start mt-2" aria-label="Hapus Pertanyaan">✕</button>)}</div>))}
// // // // //                                                                                     <button type="button" onClick={addEssayRow} className="text-xs font-bold text-blue-600 flex items-center gap-1" aria-label="Tambah Pertanyaan"><Plus size={14}/> Tambah Pertanyaan</button>
// // // // //                                                                                     <div className="flex items-center gap-2 mb-2 bg-amber-50 p-2 rounded border border-amber-100"><label className="text-xs font-bold text-amber-800 flex items-center gap-2"><Clock size={14}/> Durasi (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="p-1 border rounded w-20 text-sm" aria-label="Durasi Esai"/><label className="text-xs ml-4 flex items-center gap-1 cursor-pointer"><input type="checkbox" checked={useEssayTimer} onChange={e => setUseEssayTimer(e.target.checked)} aria-label="Gunakan Timer" /> Gunakan Timer</label></div>
// // // // //                                                                                 </div>
// // // // //                                                                             )}

// // // // //                                                                             {lesType === 'virtual_class' && (<div className="bg-white p-4 rounded border border-blue-200 space-y-2"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><LinkIcon size={16}/> Link Meeting (Zoom/Teams/GMeet)</label><input type="url" className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://teams.microsoft.com/..." value={lesContent} onChange={e => setLesContent(e.target.value)} aria-label="Link Meeting" /></div>)}

// // // // //                                                                             {lesType === 'video_url' && (<div className="bg-white p-3 rounded border border-gray-200"><label className="text-xs font-bold text-gray-600 flex items-center gap-2 mb-1"><Video size={16}/> Link Video (YouTube)</label><input className="w-full p-2 border rounded text-sm outline-none" placeholder="https://youtube.com/watch?v=..." value={lesContent} onChange={e => setLesContent(e.target.value)} aria-label="URL Video" /></div>)}
                                                                            
// // // // //                                                                             {['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded-lg overflow-hidden border border-gray-200"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-64 mb-12" /></div>)}
                                                                            
// // // // //                                                                             {['image','download_doc','slide'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Pilih File"/></div>)}
                                                                            
// // // // //                                                                             {lesType === 'quiz' && (<div className="space-y-4 bg-white p-4 rounded border"><div className="flex items-center gap-2 mb-2 bg-amber-50 p-2 rounded border border-amber-100"><label className="text-xs font-bold text-amber-800">⏱ Durasi (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="p-1 border rounded w-20 text-sm" aria-label="Durasi Kuis"/></div>{questions.map((q, ix) => (<div key={ix} className="p-3 border rounded bg-gray-50 relative"><button type="button" onClick={() => removeQuestion(ix)} className="absolute top-2 right-2 text-red-500 text-xs font-bold hover:underline" aria-label="Hapus Soal">Hapus</button><input className="w-full mb-2 p-2 border rounded" placeholder={`Pertanyaan ${ix+1}`} value={q.question} onChange={e=>updateQuestion(ix,'question',e.target.value)} aria-label={`Pertanyaan ${ix+1}`} /><div className="grid grid-cols-2 gap-2">{q.options.map((o:string,oi:number)=><input key={oi} className={`w-full p-1 border ${q.correctIndex===oi?'bg-green-100 border-green-400':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix,'options',e.target.value,oi)} aria-label={`Opsi ${oi+1}`} />)}</div><div className="mt-2 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix,'correctIndex',Number(e.target.value))} className="border w-12 p-1 rounded" aria-label="Kunci Jawaban" /></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-200" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}
// // // // //                                                                             {lesType === 'poll' && (<div className="space-y-4 bg-white p-4 rounded border border-blue-100"><input className="w-full p-2 border rounded text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} aria-label="Pertanyaan Polling" />{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2"><input className="flex-1 p-2 border rounded text-sm" placeholder={`Opsi ${idx + 1}`} value={opt} onChange={e => updatePollOption(idx, e.target.value)} aria-label={`Opsi ${idx+1}`} />{pollOptions.length > 2 && (<button type="button" onClick={() => removePollOption(idx)} className="text-red-500 font-bold px-2" aria-label="Hapus Opsi">✕</button>)}</div>))}<button type="button" onClick={addPollOption} className="text-xs font-bold text-blue-600" aria-label="Tambah Opsi">+ Tambah Opsi</button></div>)}
                                                                            
// // // // //                                                                             <div className="flex justify-end gap-2"><button type="button" onClick={resetLessonForm} className="px-3 py-1 text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-4 py-1 rounded text-xs font-bold" aria-label="Simpan">Simpan</button></div>
// // // // //                                                                         </div>
// // // // //                                                                     ) : (
// // // // //                                                                         <button type="button" onClick={()=>{setActiveModId(m._id); setLesType('lesson');}} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-xs hover:border-blue-300 hover:text-blue-600 transition-colors" aria-label="Tambah Konten">+ Tambah Konten</button>
// // // // //                                                                     )}
// // // // //                                                                 </div>
// // // // //                                                             )}
// // // // //                                                         </Droppable>
// // // // //                                                     </div>
// // // // //                                                 )}
// // // // //                                             </Draggable>
// // // // //                                         ))}
// // // // //                                         {provided.placeholder}
// // // // //                                     </div>
// // // // //                                 )}
// // // // //                             </Droppable>
// // // // //                         </DragDropContext>
// // // // //                     </section>
// // // // //                 </div>

// // // // //                 {/* [RESTORED] SERTIFIKAT & KOMPETENSI */}
// // // // //                 <div className="border-t-4 border-gray-100 pt-8"></div>
// // // // //                 <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
// // // // //                     <div className="flex justify-between items-start mb-6">
// // // // //                         <h2 className="text-2xl font-bold text-gray-800">🎓 Pengaturan Sertifikat</h2>
// // // // //                         <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg text-xs font-medium border border-blue-200 max-w-md shadow-sm">
// // // // //                             <div className="flex gap-2 items-start"><Info size={16} className="shrink-0 mt-0.5"/><div><strong>Format Nomor Otomatis:</strong><br/>Gunakan placeholder <code>{'{NO}'}</code> agar nomor urut peserta terisi otomatis.<br/>Format Standard: <code>00{'{NO}'}/DIKLAT/02.01.2026/I/2026</code></div></div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                     <CertificateConfigForm initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} />
// // // // //                     {certConfig && (
// // // // //                         <div className="mt-8 border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 shadow-sm">
// // // // //                             <div className="bg-gray-100 px-4 py-3 border-b flex items-center gap-2 font-bold text-gray-700 text-sm"><FileBadge size={16}/> Data Konfigurasi Tersimpan (Preview)</div>
// // // // //                             <div className="p-4 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
// // // // //                                 <div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Hash size={12}/> Format Nomor</p><p className="font-mono bg-white border px-3 py-2 rounded text-gray-800 shadow-sm">{certConfig.certificateNumber || '-'}</p></div>
// // // // //                                 <div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar size={12}/> Tanggal Pelaksanaan</p><p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.executionDate ? new Date(certConfig.executionDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '-'}</p></div>
// // // // //                                 <div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MapPin size={12}/> Kota Penerbit</p><p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.city || '-'}</p></div>
// // // // //                                 <div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><UserCheck size={12}/> Penanda Tangan</p><p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.signatoryName} <span className="font-normal text-gray-500 text-xs block">({certConfig.signatoryPosition})</span></p></div>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     )}
// // // // //                     <div className="my-10 border-t border-gray-100"></div>
// // // // //                     <CompetencyForm initialData={competencies} onChange={(data) => setCompetencies(data)} />
// // // // //                     <div className="mt-4 flex items-center gap-2 bg-gray-50 p-3 rounded-lg border"><input type="checkbox" id="includeComp" checked={includeCompetencies} onChange={(e) => setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Sertakan Kompetensi" /><label htmlFor="includeComp" className="text-sm font-bold text-gray-700 cursor-pointer">Tampilkan daftar kompetensi di halaman belakang sertifikat?</label></div>
// // // // //                     <div className="mt-4 flex justify-end"><button type="button" onClick={handleSaveCompetencies} disabled={isSavingCompetencies} className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button></div>
// // // // //                 </section>

// // // // //                 <div className="mt-8 p-6 bg-gray-50 rounded-3xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3">
// // // // //                     <h3 className="text-lg font-bold text-gray-800">Selesai?</h3>
// // // // //                     <button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Publish Course">{course?.isPublished ? 'Tarik Kembali ke Draft' : '🚀 PUBLISH SEKARANG'}</button>
// // // // //                 </div>

// // // // //                 {/* --- FLOATING DASHBOARD --- */}
// // // // //                 <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
// // // // //                     <button type="button" onClick={() => { setShowTeamChat(true); }} className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 hover:text-white border border-gray-200 transition-transform hover:scale-105 flex items-center gap-2 group relative" title="Chat Tim" aria-label="Chat Tim"><MessageSquare size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Diskusi Tim</span></button>
// // // // //                     <button type="button" onClick={() => { setShowParticipantChat(true); fetchParticipants(); }} className="bg-emerald-600 text-white p-4 rounded-full shadow-xl hover:bg-emerald-700 flex items-center gap-2 transition-transform hover:scale-105 group relative" title="Chat Peserta" aria-label="Chat Peserta"><MessageCircle size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Chat Peserta</span></button>
// // // // //                     <button type="button" onClick={() => setShowPreviewModal(true)} className="bg-white text-gray-700 p-4 rounded-full shadow-xl hover:bg-gray-50 border border-gray-200 transition-transform hover:scale-105 flex items-center gap-2 group relative" title="Preview" aria-label="Preview Kelas"><Eye size={24} className="text-purple-600"/><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Preview Kelas</span></button>
// // // // //                     <button type="button" onClick={() => { setShowParticipantModal(true); fetchParticipants(); }} className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 flex items-center gap-2 transition-transform hover:scale-105 group relative" aria-label="Manajemen Peserta" title="Manajemen Peserta"><Users size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Manajemen Peserta</span></button>
// // // // //                 </div>

// // // // //                 {/* --- MODALS --- */}
// // // // //                 {showPreviewModal && (<div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200"><div className="bg-white w-[95vw] h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"><div className="bg-gray-900 text-white p-3 flex justify-between items-center px-6"><h3 className="font-bold flex items-center gap-2"><Eye size={18}/> Preview Mode</h3><div className="flex gap-3"><button type="button" onClick={() => window.open(`/courses/${courseId}`, '_blank', 'noopener,noreferrer')} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded flex items-center gap-1 transition-colors" aria-label="Buka di Tab Baru"><ExternalLink size={14}/> Buka Tab Baru</button><button type="button" onClick={() => setShowPreviewModal(false)} className="text-gray-400 hover:text-white" aria-label="Tutup Preview"><X size={24}/></button></div></div><div className="flex-1 bg-gray-100"><iframe src={`/courses/${courseId}`} className="w-full h-full border-0" title="Course Preview" /></div></div></div>)}
// // // // //                 {showParticipantChat && (<RoomChatModal title="Global Room (Peserta)" members={[...chatMembers, ...teamMembers]} onClose={() => setShowParticipantChat(false)} themeColor="bg-red-700" />)}
// // // // //                 {showTeamChat && (<RoomChatModal title="Diskusi Tim Fasilitator" members={teamMembers} onClose={() => setShowTeamChat(false)} themeColor="bg-blue-600" />)}
// // // // //                 {showWallOfFameModal && (
// // // // //                     <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
// // // // //                         <div className="bg-white w-full max-w-lg h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // // // //                             <div className="bg-yellow-500 p-4 text-white flex justify-between items-center shadow-md">
// // // // //                                 <h3 className="font-bold text-lg flex items-center gap-2"><Trophy size={20}/> Wall of Fame History</h3>
// // // // //                                 <button type="button" onClick={() => setShowWallOfFameModal(false)} className="hover:bg-yellow-600 p-2 rounded-full" aria-label="Tutup"><X size={24}/></button>
// // // // //                             </div>
// // // // //                             <div className="flex-1 p-4 overflow-y-auto bg-yellow-50 space-y-3">
// // // // //                                 {recentCompletions.length > 0 ? recentCompletions.map((rc:any, i:number) => (
// // // // //                                     <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
// // // // //                                         <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold"><Award size={20}/></div>
// // // // //                                         <div><p className="font-bold text-gray-800">{rc.name}</p><p className="text-xs text-gray-500">Menyelesaikan {rc.module} pada {rc.date || 'Hari ini'}</p></div>
// // // // //                                     </div>
// // // // //                                 )) : <div className="text-center text-gray-400 mt-10">Belum ada data kelulusan.</div>}
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 )}
// // // // //                 {showStudentDetailModal && studentDetail && (
// // // // //                     <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
// // // // //                         <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // // // //                             <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
// // // // //                                 <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">{studentDetail.name?.charAt(0)}</div><div><h3 className="font-bold text-lg">{studentDetail.name}</h3><p className="text-xs opacity-80">{studentDetail.email}</p></div></div>
// // // // //                                 <button type="button" onClick={() => setShowStudentDetailModal(false)} className="hover:bg-indigo-700 p-2 rounded-full" aria-label="Tutup"><X size={24}/></button>
// // // // //                             </div>
// // // // //                             <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
// // // // //                                 <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><FileText size={18}/> Riwayat Pengerjaan & Upload</h4>
// // // // //                                 <div className="space-y-4">
// // // // //                                     <div className="p-4 bg-white border rounded-xl shadow-sm"><p className="text-sm font-bold text-gray-800 mb-2">Tugas Upload: Modul 1</p><a href="#" className="text-blue-600 text-xs hover:underline flex items-center gap-1"><Download size={12}/> Download File Tugas</a></div>
// // // // //                                     <div className="p-4 bg-white border rounded-xl shadow-sm"><p className="text-sm font-bold text-gray-800 mb-2">Esai: Modul 2</p><p className="text-xs text-gray-600 italic">"Jawaban siswa akan muncul di sini..."</p></div>
// // // // //                                     <p className="text-center text-gray-400 text-xs mt-4">Fitur review detail sedang dalam pengembangan backend.</p>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 )}
// // // // //                 {showParticipantModal && (
// // // // //                     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
// // // // //                         <div className="bg-white w-full max-w-6xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
// // // // //                             <div className="p-6 border-b flex justify-between items-center bg-gray-50">
// // // // //                                 <div><h2 className="text-xl font-bold text-gray-800">Manajemen Peserta</h2><p className="text-xs text-gray-500">Kelola kelulusan dan reset kuis.</p></div>
// // // // //                                 <button type="button" onClick={() => setShowParticipantModal(false)} className="bg-white p-2 rounded-full shadow hover:bg-gray-100" aria-label="Tutup Modal" title="Tutup"><X size={20}/></button>
// // // // //                             </div>
                           
// // // // //                             <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex flex-wrap gap-4 items-center justify-between">
// // // // //                                 <div className="flex items-center gap-3">
// // // // //                                     <span className="text-xs font-bold text-indigo-800">🛠 Aksi Massal:</span>
// // // // //                                     <select className="p-2 border rounded-lg text-sm bg-white min-w-[250px]" value={selectedActionId} onChange={e=>setSelectedActionId(e.target.value)} aria-label="Pilih Materi Aksi" title="Pilih Materi Aksi">
// // // // //                                         <option value="">-- Pilih Materi / Kuis --</option>
// // // // //                                         {actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
// // // // //                                     </select>
// // // // //                                 </div>
// // // // //                                 <div className="relative">
// // // // //                                     <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // // // //                                     <input className="pl-10 pr-4 py-2 rounded-full border border-gray-300 text-sm w-64 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Cari peserta..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} aria-label="Cari Peserta" title="Cari Peserta" />
// // // // //                                 </div>
// // // // //                             </div>

// // // // //                             <div className="flex-1 overflow-y-auto p-0 bg-gray-50/50">
// // // // //                                 {loadingParticipants ? (<div className="flex justify-center items-center h-full text-gray-400">Memuat data...</div>) : participants.length === 0 ? (<div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2"><Users size={48} className="opacity-20"/><p>Belum ada peserta.</p></div>) : (
// // // // //                                     <table className="w-full text-left border-collapse">
// // // // //                                         <thead className="bg-gray-100 sticky top-0 z-10 text-xs font-bold text-gray-600"><tr className="border-b"><th className="p-4">Peserta</th><th className="p-4">Tanggal Gabung</th><th className="p-4 text-center">Progres</th><th className="p-4 text-center">Aksi Konteks</th><th className="p-4 text-center">Chat</th><th className="p-4 text-center">Detail</th><th className="p-4 text-center text-red-600">Hapus</th></tr></thead>
// // // // //                                         <tbody className="text-sm bg-white divide-y">
// // // // //                                             {participants.filter(p => (p.user?.name || p.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => {
// // // // //                                                 const userObj = p.user || p.student || p.participant || p;
// // // // //                                                 const enrollmentId = p._id; // Pastikan backend kirim _id Enrollment
// // // // //                                                 const name = userObj.name || 'Tanpa Nama';
// // // // //                                                 const email = userObj.email || '-';
// // // // //                                                 const dateRaw = p.joinedAt || p.createdAt || p.enrolledAt || userObj.joinedAt;
// // // // //                                                 const joinDate = dateRaw && !isNaN(new Date(dateRaw).getTime()) ? new Date(dateRaw).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';
// // // // //                                                 const selectedActionItem = actionOptions.find(o => o.id === selectedActionId);
// // // // //                                                 const isCompleted = selectedActionId && p.completedLessons?.includes(selectedActionId);

// // // // //                                                 return (
// // // // //                                                     <tr key={idx} className="hover:bg-blue-50 transition-colors">
// // // // //                                                         <td className="p-4 font-bold text-gray-800 flex items-center gap-3">
// // // // //                                                             <div className="relative">
// // // // //                                                                 {userObj.avatarUrl ? (<img src={getImageUrl(userObj.avatarUrl)} alt={name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />) : (<div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-200">{name.charAt(0).toUpperCase()}</div>)}
// // // // //                                                             </div>
// // // // //                                                             <div>
// // // // //                                                                 <div>{name}</div>
// // // // //                                                                 <div className="text-[10px] text-gray-400 font-normal flex items-center gap-1"><Mail size={10}/> {email}</div>
// // // // //                                                             </div>
// // // // //                                                         </td>
// // // // //                                                         <td className="p-4 text-xs text-gray-500">{joinDate}</td>
// // // // //                                                         <td className="p-4 text-center">
// // // // //                                                             <div className="w-24 bg-gray-200 rounded-full h-2 mx-auto overflow-hidden">
// // // // //                                                                 <div className="bg-green-500 h-2 rounded-full" style={{width: `${p.progress || 0}%`}}></div>
// // // // //                                                             </div>
// // // // //                                                             <span className="text-[10px] text-gray-500 mt-1 block">{p.progress || 0}%</span>
// // // // //                                                         </td>
// // // // //                                                         <td className="p-4 text-center">
// // // // //                                                             {selectedActionItem ? (
// // // // //                                                                 <button 
// // // // //                                                                     type="button" 
// // // // //                                                                     onClick={() => handleParticipantAction(userObj._id, selectedActionItem.type === 'quiz' ? 'reset' : 'pass')} 
// // // // //                                                                     disabled={selectedActionItem.type !== 'quiz' && isCompleted} 
// // // // //                                                                     className={`px-3 py-1 rounded text-xs font-bold border transition-all flex items-center gap-1 mx-auto ${isCompleted ? 'bg-green-100 text-green-700 border-green-200 cursor-default' : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50'}`}
// // // // //                                                                     aria-label="Aksi Peserta"
// // // // //                                                                     title={selectedActionItem.type === 'quiz' ? 'Reset Kuis' : 'Luluskan Manual'}
// // // // //                                                                 >
// // // // //                                                                     {selectedActionItem.type === 'quiz' ? '↺ Reset' : (isCompleted ? '✓ Lulus' : '⚡ Luluskan')}
// // // // //                                                                 </button>
// // // // //                                                             ) : <span className="text-gray-300 text-xs">-</span>}
// // // // //                                                         </td>
// // // // //                                                         <td className="p-4 text-center"><button type="button" onClick={() => setChatTargetStudent({ name, email, _id: userObj._id })} className="p-2 rounded-full text-blue-500 hover:bg-blue-50 hover:scale-110 transition-all border border-transparent hover:border-blue-100" aria-label="Chat Peserta" title="Chat"><MessageSquare size={18}/></button></td>
// // // // //                                                         <td className="p-4 text-center"><button type="button" onClick={() => handleViewStudentDetail(userObj)} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-600" aria-label="Lihat Detail" title="Detail"><Eye size={18}/></button></td>
// // // // //                                                         <td className="p-4 text-center">
// // // // //                                                             <button 
// // // // //                                                                 type="button" 
// // // // //                                                                 onClick={() => handleRejectParticipant(enrollmentId, name)} 
// // // // //                                                                 className="p-2 rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
// // // // //                                                                 title="Tolak / Hapus Peserta"
// // // // //                                                                 aria-label="Tolak Peserta"
// // // // //                                                             >
// // // // //                                                                 <UserX size={18}/>
// // // // //                                                             </button>
// // // // //                                                         </td>
// // // // //                                                     </tr>
// // // // //                                                 );
// // // // //                                             })}
// // // // //                                         </tbody>
// // // // //                                     </table>
// // // // //                                 )}
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 )}
// // // // //             </div>
// // // // //         </Protected>
// // // // //     );
// // // // // }
// // // // 'use client';

// // // // import { useEffect, useState, useRef, useMemo } from 'react';
// // // // import { useParams, useRouter } from 'next/navigation';
// // // // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // import Protected from '@/components/Protected';
// // // // import CompetencyForm from '@/components/admin/CompetencyForm';
// // // // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // // // import {
// // // //     Calendar, School, RefreshCw, LogOut, CheckCircle2, Video,
// // // //     Link as LinkIcon, Users, Eye, MessageSquare, MessageCircle, X, Send, MoreHorizontal, ExternalLink,
// // // //     Search, User as UserIcon, Mail, Smile, Trophy, Award, Plus, Trash2, Clock, Paperclip, FileText, Download,
// // // //     FileBadge, MapPin, UserCheck, Hash, Info, UserX
// // // // } from 'lucide-react';

// // // // import dynamic from 'next/dynamic';
// // // // import 'react-quill/dist/quill.snow.css'; 

// // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // //     ssr: false,
// // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // });

// // // // // --- HELPER ---
// // // // const getRomanMonth = (date: Date) => {
// // // //     const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
// // // //     return romans[date.getMonth()];
// // // // };

// // // // const generateDefaultCertFormat = () => {
// // // //     const now = new Date();
// // // //     const dd = String(now.getDate()).padStart(2, '0');
// // // //     const mm = String(now.getMonth() + 1).padStart(2, '0');
// // // //     const yyyy = now.getFullYear();
// // // //     const roman = getRomanMonth(now);
// // // //     return `00{NO}/DIKLAT/${dd}.${mm}.${yyyy}/${roman}/${yyyy}`;
// // // // };

// // // // // --- CHAT MODAL (Dari Script Asli Anda) ---
// // // // function RoomChatModal({ title, members, onClose, themeColor = 'bg-red-700' }: any) {
// // // //     const [messages, setMessages] = useState<any[]>([]);
// // // //     const [newMessage, setNewMessage] = useState('');
// // // //     const [showEmoji, setShowEmoji] = useState(false);
// // // //     const [mentionQuery, setMentionQuery] = useState<string | null>(null);
// // // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // // //     const messagesEndRef = useRef<HTMLDivElement>(null);
// // // //     const inputRef = useRef<HTMLInputElement>(null);
// // // //     const emojis = ["😀", "😂", "🥰", "😎", "🤔", "👍", "👎", "❤️", "🔥", "🎉", "📚", "✅", "💡", "🤝", "🙏", "💪"];

// // // //     useEffect(() => { setMessages([{ id: 1, sender: 'System', text: `Selamat datang di ${title}`, time: '08:00', isMe: false, isSystem: true }]); }, [title]);

// // // //     const handleSend = (e: any) => { e.preventDefault(); if(!newMessage.trim()) return; setMessages([...messages, { id: Date.now(), sender: 'Saya', text: newMessage, time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), isMe: true }]); setNewMessage(''); setShowEmoji(false); setMentionQuery(null); setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100); };
// // // //     const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (file) { setMessages([...messages, { id: Date.now(), sender: 'Saya', text: `Mengirim file: ${file.name}`, isAttachment: true, time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), isMe: true }]); } };
// // // //     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { const val = e.target.value; setNewMessage(val); const lastWord = val.split(' ').pop(); if (lastWord && lastWord.startsWith('@') && lastWord.length > 1) { setMentionQuery(lastWord.substring(1)); } else { setMentionQuery(null); } };
// // // //     const addEmoji = (emoji: string) => { setNewMessage(prev => prev + emoji); inputRef.current?.focus(); };
// // // //     const addMention = (name: string) => { const words = newMessage.split(' '); words.pop(); setNewMessage(words.join(' ') + ` @${name} `); setMentionQuery(null); inputRef.current?.focus(); };
// // // //     const filteredMembers = mentionQuery ? members.filter((m: any) => (m.name || 'User').toLowerCase().includes(mentionQuery.toLowerCase())) : [];

// // // //     return (
// // // //         <div className="fixed inset-0 bg-black/60 z-[80] flex items-center justify-center p-4 animate-in fade-in duration-200">
// // // //             <div className="bg-white w-full max-w-6xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative">
// // // //                 <div className={`${themeColor} p-4 text-white flex justify-between items-center shadow-md shrink-0`}>
// // // //                     <div className="flex items-center gap-3"><div className="bg-white/20 p-2 rounded-full"><MessageCircle size={20} aria-hidden="true"/></div><div><h3 className="font-bold text-lg">{title}</h3><p className="text-[10px] opacity-90">{members.length} Anggota Terdaftar</p></div></div>
// // // //                     <button type="button" onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Tutup Chat" title="Tutup"><X size={24}/></button>
// // // //                 </div>
// // // //                 <div className="flex flex-1 overflow-hidden relative">
// // // //                     <div className="flex-1 flex flex-col bg-gray-100 relative">
// // // //                         <div className="flex-1 p-4 overflow-y-auto space-y-4" onClick={() => { setShowEmoji(false); setMentionQuery(null); }}>
// // // //                             {messages.map((msg) => (
// // // //                                 <div key={msg.id} className={`flex ${msg.isSystem ? 'justify-center' : (msg.isMe ? 'justify-end' : 'justify-start')}`}>
// // // //                                     {msg.isSystem ? (<span className="text-xs bg-gray-200 text-gray-500 px-3 py-1 rounded-full">{msg.text}</span>) : (
// // // //                                         <div className={`max-w-[75%] flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
// // // //                                             <div className={`px-4 py-2.5 rounded-xl text-sm shadow-sm ${msg.isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border'}`}>
// // // //                                                 {!msg.isMe && <div className="text-[10px] font-bold opacity-70 mb-1 text-blue-600">{msg.sender}</div>}
// // // //                                                 {msg.isAttachment ? <div className="flex items-center gap-2 italic text-gray-600"><Paperclip size={14}/> {msg.text}</div> : <p className="leading-relaxed">{msg.text}</p>}
// // // //                                             </div>
// // // //                                             <span className="text-[10px] text-gray-400 mt-1 mx-1">{msg.time}</span>
// // // //                                         </div>
// // // //                                     )}
// // // //                                 </div>
// // // //                             ))}
// // // //                             <div ref={messagesEndRef}/>
// // // //                         </div>
// // // //                         {/* ... (Emoji and Mention logic omitted for brevity but should be here) ... */}
// // // //                         <div className="p-3 bg-white border-t flex gap-3 items-center relative z-10">
// // // //                             <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100" aria-label="Lampirkan File" title="Lampirkan File"><Paperclip size={20}/></button>
// // // //                             <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} title="Upload File" aria-label="Upload File" />
// // // //                             <form onSubmit={handleSend} className="flex-1 flex gap-2">
// // // //                                 <input ref={inputRef} className="flex-1 bg-gray-100 border-0 rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="Ketik pesan..." value={newMessage} onChange={handleInputChange} aria-label="Input pesan chat" title="Input pesan chat" />
// // // //                                 <button type="submit" className={`${themeColor} text-white p-3 rounded-full hover:opacity-90 shadow-lg transition-transform active:scale-95 disabled:opacity-50`} disabled={!newMessage.trim()} aria-label="Kirim Pesan" title="Kirim Pesan"><Send size={18}/></button>
// // // //                             </form>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }

// // // // // --- MAIN PAGE ---
// // // // export default function AdminCourseDetailPage() {
// // // //     const params = useParams();
// // // //     const courseId = params?.id as string;
// // // //     const router = useRouter();
// // // //     const fileInputRef = useRef<HTMLInputElement>(null);

// // // //     const [course, setCourse] = useState<any>(null);
// // // //     const [loading, setLoading] = useState(true);
// // // //     const [isBrowser, setIsBrowser] = useState(false);
// // // //     const [isUploadingCover, setIsUploadingCover] = useState(false);
// // // //     const [notification, setNotification] = useState<string | null>(null);

// // // //     // Modal States
// // // //     const [showParticipantModal, setShowParticipantModal] = useState(false);
// // // //     const [showParticipantChat, setShowParticipantChat] = useState(false);
// // // //     const [showTeamChat, setShowTeamChat] = useState(false);
// // // //     const [showPreviewModal, setShowPreviewModal] = useState(false);
// // // //     const [showWallOfFameModal, setShowWallOfFameModal] = useState(false);
// // // //     const [showStudentDetailModal, setShowStudentDetailModal] = useState(false); 
// // // //     const [studentDetail, setStudentDetail] = useState<any>(null);
   
// // // //     const [participants, setParticipants] = useState<any[]>([]);
// // // //     const [loadingParticipants, setLoadingParticipants] = useState(false);
// // // //     const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);
   
// // // //     const [chatMembers, setChatMembers] = useState<any[]>([]);
// // // //     const [teamMembers, setTeamMembers] = useState<any[]>([]);
// // // //     const [recentCompletions, setRecentCompletions] = useState<any[]>([]);

// // // //     const [participantFilter, setParticipantFilter] = useState('');
// // // //     const [actionOptions, setActionOptions] = useState<any[]>([]);
// // // //     const [selectedActionId, setSelectedActionId] = useState<string>('');

// // // //     const [facilitators, setFacilitators] = useState<any[]>([]);
// // // //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>([]);
// // // //     const [currentUserRole, setCurrentUserRole] = useState('');
// // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
   
// // // //     // Content State
// // // //     const [showModuleForm, setShowModuleForm] = useState(false);
// // // //     const [modTitle, setModTitle] = useState('');
// // // //     const [modIsMandatory, setModIsMandatory] = useState(true);
// // // //     const [modFacilitatorId, setModFacilitatorId] = useState('');
// // // //     const [modJp, setModJp] = useState(0);
// // // //     const [modSchedule, setModSchedule] = useState('');
// // // //     const [editingModId, setEditingModId] = useState<string | null>(null);
   
// // // //     const [activeModId, setActiveModId] = useState<string | null>(null);
// // // //     const [editingLesId, setEditingLesId] = useState<string | null>(null);
// // // //     const [lesTitle, setLesTitle] = useState('');
// // // //     const [lesType, setLesType] = useState('lesson');
// // // //     const [lesContent, setLesContent] = useState('');
// // // //     const [lesIsMandatory, setLesIsMandatory] = useState(true);
// // // //     const [lesJp, setLesJp] = useState(0);
// // // //     const [lesSchedule, setLesSchedule] = useState('');
// // // //     const [lesFacilitatorId, setLesFacilitatorId] = useState('');

// // // //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// // // //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// // // //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// // // //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// // // //     const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // //     const [uploading, setUploading] = useState(false);
// // // //     const [quizDuration, setQuizDuration] = useState(10);
// // // //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// // // //     const [pollQuestion, setPollQuestion] = useState('');
// // // //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
   
// // // //     // Essay State
// // // //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// // // //     const [useEssayTimer, setUseEssayTimer] = useState(false);

// // // //     const [competencies, setCompetencies] = useState<any[]>([]);
// // // //     const [includeCompetencies, setIncludeCompetencies] = useState(true);
// // // //     const [certConfig, setCertConfig] = useState<any>(null);
// // // //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// // // //     const [isSavingCert, setIsSavingCert] = useState(false);

// // // //     const activeTeam = facilitators.filter(f => selectedFacilitatorIds.includes(f._id));

// // // //     const quillModules = useMemo(() => ({
// // // //         toolbar: {
// // // //             container: [
// // // //                 [{ 'header': [1, 2, 3, false] }],
// // // //                 ['bold', 'italic', 'underline', 'strike', 'blockquote'],
// // // //                 [{'list': 'ordered'}, {'list': 'bullet'}],
// // // //                 ['link', 'image', 'video'], 
// // // //                 [{ 'color': [] }, { 'background': [] }],
// // // //                 ['clean']
// // // //             ]
// // // //         }
// // // //     }), []);

// // // //     useEffect(() => {
// // // //         setIsBrowser(true);
// // // //         if (typeof window !== 'undefined') {
// // // //             const userStr = localStorage.getItem('user');
// // // //             if (userStr) {
// // // //                 const user = JSON.parse(userStr);
// // // //                 setCurrentUserRole(user.role);
// // // //             }
// // // //             const savedToken = localStorage.getItem('google_class_token');
// // // //             if (savedToken) {
// // // //                 setGoogleToken(savedToken);
// // // //                 fetchClassroomCourses(savedToken);
// // // //             }
// // // //         }
// // // //         if (courseId) load();
// // // //     }, [courseId]);

// // // //     const load = async () => { 
// // // //         try {
// // // //             const data = await api(`/api/courses/${courseId}`);
// // // //             const courseData = data.course || data;
// // // //             setCourse(courseData);
            
// // // //             // Build Action Options
// // // //             const opts: any[] = [];
// // // //             courseData.modules?.forEach((m: any) => {
// // // //                 m.lessons?.forEach((l: any) => {
// // // //                     let label = l.title;
// // // //                     if(l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
// // // //                     else label = `📄 ${l.title}`;
// // // //                     opts.push({ id: l._id, label, type: l.type });
// // // //                 });
// // // //             });
// // // //             setActionOptions(opts);

// // // //             if (courseData.facilitatorIds) setSelectedFacilitatorIds(courseData.facilitatorIds.map((f: any) => (typeof f === 'object' && f !== null) ? f._id : f));
// // // //             if (courseData.competencies) setCompetencies(courseData.competencies);
// // // //             if (courseData.includeCompetenciesInCertificate !== undefined) setIncludeCompetencies(courseData.includeCompetenciesInCertificate);
// // // //             let config = courseData.certificateConfig || {};
// // // //             if (!config.certificateNumber) config = { ...config, certificateNumber: generateDefaultCertFormat() };
// // // //             setCertConfig(config);

// // // //             const userStr = localStorage.getItem('user');
// // // //             if (userStr) {
// // // //                 const usersRes = await api('/api/admin/users');
// // // //                 if (usersRes.users) {
// // // //                     const facs = usersRes.users.filter((u: any) => u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN');
// // // //                     setFacilitators(facs);
// // // //                     const team = facs.filter((u: any) => courseData.facilitatorIds?.some((f: any) => (f._id || f) === u._id) || u.role === 'SUPER_ADMIN');
// // // //                     setTeamMembers(team.map((t: any) => ({ ...t, role: 'Facilitator' })));
// // // //                 }
// // // //             }
// // // //             fetchParticipants();
// // // //         } catch (e) { console.error(e); } finally { setLoading(false); }
// // // //     };

// // // //     const fetchParticipants = async () => {
// // // //         setLoadingParticipants(true);
// // // //         try {
// // // //             const res = await api(`/api/courses/${courseId}/participants`);
// // // //             const parts = res.participants || res.data || [];
// // // //             setParticipants(parts);
            
// // // //             const chatList = parts.map((p: any) => {
// // // //                 const userObj = p.user || p.student || p;
// // // //                 return { name: userObj.name || 'User', avatarUrl: userObj.avatarUrl || userObj.image, role: 'Student', _id: userObj._id };
// // // //             });
// // // //             setChatMembers([...teamMembers, ...chatList]);
// // // //         } catch (error) { console.error("Gagal load peserta"); } finally { setLoadingParticipants(false); }
// // // //     };

// // // //     const handleRejectParticipant = async (enrollmentId: string, studentName: string) => {
// // // //         if (!confirm(`Apakah Anda yakin ingin MENOLAK/MENGHAPUS pendaftaran "${studentName}"?`)) return;
// // // //         try { await api(`/api/enrollments/${enrollmentId}`, { method: 'DELETE' }); alert(`Peserta ${studentName} berhasil dihapus.`); fetchParticipants(); } catch (e: any) { alert("Gagal: " + e.message); }
// // // //     };

// // // //     const getFacilitatorName = (data: any) => {
// // // //         if (!data) return null;
// // // //         if (typeof data === 'object' && data.name) return data.name;
// // // //         const found = facilitators.find(f => f._id === data || f.id === data);
// // // //         return found ? found.name : 'Unknown';
// // // //     };

// // // //     const handleSaveModule = async () => { 
// // // //         if (!modTitle.trim()) return alert("Judul wajib"); 
// // // //         const safeFacilitatorId = modFacilitatorId || null;
// // // //         const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: safeFacilitatorId, jp: modJp, scheduleDate: modSchedule || null }; 
// // // //         try { if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); resetModuleForm(); load(); } catch(e: any) { alert(e.message); } 
// // // //     };

// // // //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
// // // //     const resetModuleForm = () => { setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false); };
// // // //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); setCourse((prev: any) => ({ ...prev, isPublished: newStatus })); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); load(); } } catch (e: any) { alert(e.message); } };
// // // //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); load(); } catch (e: any) { alert(e.message); } };
// // // //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } setCourse(newCourse); try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); } catch (err) { load(); } };
// // // //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); const res = await apiUpload(`/api/upload/course/${courseId}/cover`, formData); setCourse((prev: any) => ({ ...prev, thumbnailUrl: res.imageUrl || res.url })); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// // // //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); };
// // // //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// // // //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };
// // // //     const handleViewStudentDetail = (student: any) => { setStudentDetail(student); setShowStudentDetailModal(true); };
// // // //     const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => { 
// // // //         if (!selectedActionId) return alert("Pilih Materi/Kuis di dropdown atas dulu!"); 
// // // //         const selectedItem = actionOptions.find(o => o.id === selectedActionId);
// // // //         if (action === 'pass') { if(!confirm(`Luluskan peserta?`)) return; try { await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId, lessonId: selectedActionId, courseId } }); alert("Berhasil!"); fetchParticipants(); } catch(e:any) { alert(e.message); } }
// // // //         else if (action === 'reset') { if(!confirm(`Reset progress?`)) return; try { await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId, quizId: selectedActionId } }); alert("Reset berhasil!"); fetchParticipants(); } catch(e:any) { alert(e.message); } }
// // // //     };
    
// // // //     // FORM LOGIC
// // // //     const resetLessonForm = () => { setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesIsMandatory(true); setLesContent(''); setSelectedFile(null); setLesJp(0); setLesFacilitatorId(''); setLesSchedule(''); setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(10); setPollQuestion(''); setPollOptions(['', '']); setSelectedClassroom(null); setEssayQuestions(['']); setUseEssayTimer(false); };

// // // //     const handleSaveLesson = async (modId: string) => {
// // // //         if (!lesTitle.trim()) { alert("Judul wajib"); return; }
// // // //         let fileUrl = '';
// // // //         if (selectedFile) { try { setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); const res = await apiUpload('/api/upload', fd); fileUrl = res.url || res.file?.url || res.imageUrl; } catch (err) { alert("Gagal upload"); return; } finally { setUploading(false); } }
// // // //         else if (editingLesId) { const mod = course?.modules.find((m: any) => m._id === modId); const les = mod?.lessons.find((l: any) => l._id === editingLesId); if (les) fileUrl = les.fileUrl; }

// // // //         const finalType = lesType === 'essay' ? 'essay' : lesType;
// // // //         const safeFacilitatorId = lesFacilitatorId || null;
        
// // // //         const body: any = {
// // // //             title: lesTitle, type: finalType, isActive: true, isMandatory: lesIsMandatory, jp: lesJp, facilitatorId: safeFacilitatorId, scheduleDate: lesSchedule || null,
// // // //             questions: (lesType === 'quiz') ? questions : undefined,
// // // //             quizDuration: (lesType === 'quiz' || (lesType === 'essay' && useEssayTimer)) ? quizDuration : undefined,
// // // //             pollQuestion: (lesType === 'poll') ? pollQuestion : undefined,
// // // //             pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined,
// // // //             classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined,
// // // //         };

// // // //         if (lesType === 'essay') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; }
// // // //         if(fileUrl) body.fileUrl = fileUrl;
// // // //         if(lesType === 'video_url') body.videoUrl = lesContent;
// // // //         else if(lesType === 'virtual_class') body.meetingLink = lesContent;
// // // //         else if(lesType === 'upload_doc' || lesType === 'lesson') body.content = lesContent;

// // // //         try { if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); resetLessonForm(); load(); } catch(e:any) { alert(e.message); }
// // // //     };

// // // //     const startEditLesson = (modId: string, les: any) => {
// // // //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title);
// // // //         if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) {
// // // //             setLesType('essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || '');
// // // //             if(les.quizDuration) { setUseEssayTimer(true); setQuizDuration(les.quizDuration); } else { setUseEssayTimer(false); }
// // // //         } else { setLesType(les.type); }

// // // //         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || ''));
// // // //         if (les.type === 'video_url') setLesContent(les.videoUrl||''); else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); else if (les.type !== 'essay') setLesContent(les.content||'');
// // // //         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(les.quizDuration||10); }
// // // //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); }
// // // //         if (les.type === 'google_classroom') { if(googleToken && classroomCourses.length === 0) fetchClassroomCourses(); if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); }
        
// // // //         // [FIX] Scroll Agresif ke Form agar tidak "kejauhan"
// // // //         setTimeout(() => {
// // // //             const formElement = document.getElementById(`form-${modId}`);
// // // //             if(formElement) {
// // // //                 formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
// // // //             }
// // // //         }, 150);
// // // //     };

// // // //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); load(); };
// // // //     const addPollOption = () => setPollOptions([...pollOptions, '']); const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); };
// // // //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); };
// // // //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); const updateEssay = (idx: number, val: string) => { const newQ = [...essayQuestions]; newQ[idx] = val; setEssayQuestions(newQ); }; const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };
    
// // // //     // --- GOOGLE CLASSROOM LOGIC (RESTORED) ---
// // // //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); const width = 500, height = 600; const left = (window.screen.width - width) / 2; const top = (window.screen.height - height) / 2; window.open(url, 'GoogleAuthPopup', `width=${width},height=${height},top=${top},left=${left}`); } catch (e) { alert("Gagal Auth Google"); } };
// // // //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } };
// // // //     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const res = await fetch(`http://localhost:4000/api/classroom/courses`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'x-google-token': token } }); if (res.status === 401) { localStorage.removeItem('google_class_token'); setGoogleToken(null); return; } const data = await res.json(); if (data.courses) setClassroomCourses(data.courses); } catch (e) { console.error(e); } finally { setIsCheckingGoogle(false); } };

// // // //     if (loading || !isBrowser) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div></div>;

// // // //     return (
// // // //         <Protected roles={["FACILITATOR", "SUPER_ADMIN"]}>
// // // //             <div className="max-w-6xl mx-auto p-6 space-y-12 pb-32 relative">
// // // //                 {/* HEADER */}
// // // //                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 gap-4">
// // // //                     <div className="flex-1">
// // // //                         <h1 className="text-3xl font-bold text-gray-800">{course?.title}</h1>
// // // //                         <div className="flex gap-2 items-center mt-2">
// // // //                             <button type="button" onClick={() => toggleStatus()} className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer border transition-colors ${course?.isPublished ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`} aria-label="Toggle Publish" title="Ubah Status Publikasi">{course?.isPublished ? 'PUBLISHED' : 'DRAFT'}</button>
// // // //                             <span className="text-xs text-gray-500 font-medium">{course?.modules?.length || 0} Modul • {course?.modules?.reduce((acc: number, m: any) => acc + m.lessons.length, 0) || 0} Materi</span>
// // // //                         </div>
// // // //                     </div>
// // // //                     <button type="button" onClick={() => router.push('/admin/courses')} className="text-sm font-bold text-gray-500 hover:text-gray-800 px-4 py-2 border rounded-lg hover:bg-gray-50" aria-label="Kembali" title="Kembali">← Kembali</button>
// // // //                 </div>

// // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // //                     {/* KIRI: COVER & TIM */}
// // // //                     <div className="md:col-span-1 space-y-6">
// // // //                         {/* Cover Image */}
// // // //                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
// // // //                             {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
// // // //                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Upload Cover" title="Ganti Sampul">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Input Cover" /></div>
// // // //                         </div>

// // // //                         {/* TIM FASILITATOR (RESTORED) */}
// // // //                         {currentUserRole === 'SUPER_ADMIN' && (
// // // //                             <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
// // // //                                 <div className="flex justify-between items-center mb-4">
// // // //                                     <div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div>
// // // //                                     <button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" title="Simpan Tim" aria-label="Simpan Tim">Simpan</button>
// // // //                                 </div>
// // // //                                 <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">
// // // //                                     {facilitators.map((user: any) => (
// // // //                                         <label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}>
// // // //                                             <input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih fasilitator ${user.name}`} title={`Pilih ${user.name}`} />
// // // //                                             <div className="flex-1 overflow-hidden">
// // // //                                                 <div className="text-xs font-bold truncate">{user.name}</div>
// // // //                                                 <div className="text-[10px] text-gray-500 truncate">{user.email}</div>
// // // //                                             </div>
// // // //                                         </label>
// // // //                                     ))}
// // // //                                 </div>
// // // //                                 <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" title="Cari Fasilitator" />
// // // //                             </div>
// // // //                         )}

// // // //                         {/* Wall of Fame */}
// // // //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-6 overflow-hidden">
// // // //                             <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 text-yellow-600 cursor-pointer" onClick={() => setShowWallOfFameModal(true)}><Trophy size={18}/> Wall of Fame (Klik)</h3>
// // // //                             <div className="space-y-2">
// // // //                                 {recentCompletions.length > 0 ? recentCompletions.slice(0,3).map((rc:any, i:number) => (
// // // //                                     <div key={i} className="flex items-center gap-2 p-2 bg-yellow-50 rounded border border-yellow-100 text-xs">
// // // //                                         <Award size={12} className="text-yellow-600"/> <span>{rc.name}</span>
// // // //                                     </div>
// // // //                                 )) : <span className="text-xs text-gray-400">Belum ada data.</span>}
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>

// // // //                     {/* KANAN: MODUL */}
// // // //                     <section className="md:col-span-2 space-y-6">
// // // //                         <div className="flex justify-between items-center"><h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">📚 Modul & Materi</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-red-700 text-white px-5 py-2 rounded-xl font-bold shadow-lg hover:bg-red-800 flex items-center gap-2" aria-label="Tambah Modul" title="Tambah Modul">+ Tambah Modul</button></div>
                        
// // // //                         {showModuleForm && (
// // // //                             <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200">
// // // //                                 <div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul" title="Nama Modul" /><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" min="0" aria-label="JP" title="Jam Pelajaran" /></div>
// // // //                                 <div className="grid grid-cols-2 gap-4">
// // // //                                     <div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih Fasilitator" title="Pilih Fasilitator"><option value="">-- Pilih Fasilitator dari Tim --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div>
// // // //                                     <div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal Pelaksanaan Modul" /></div>
// // // //                                 </div>
// // // //                                 <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={modIsMandatory} onChange={e => setModIsMandatory(e.target.checked)} className="w-4 h-4 text-red-600 rounded" aria-label="Wajib" title="Wajib" /><span>Wajib diselesaikan?</span></label>
// // // //                                 <div className="flex gap-2 justify-end pt-2"><button type="button" onClick={resetModuleForm} className="text-gray-500 font-bold px-3 text-sm" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700" aria-label="Simpan">Simpan</button></div>
// // // //                             </form>
// // // //                         )}

// // // //                         <DragDropContext onDragEnd={onDragEnd}>
// // // //                             <Droppable droppableId="all-modules" type="module">
// // // //                                 {(provided) => (
// // // //                                     <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
// // // //                                         {course?.modules?.map((m: any, idx: number) => (
// // // //                                             <Draggable key={m._id} draggableId={m._id} index={idx}>
// // // //                                                 {(provided) => (
// // // //                                                     <div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-2xl overflow-hidden shadow-sm bg-white">
// // // //                                                         {/* [RESTORED] MODULE HEADER DETAIL */}
// // // //                                                         <div className="bg-gray-100 p-4 flex justify-between items-center" {...provided.dragHandleProps}>
// // // //                                                             <div className="flex items-center gap-3">
// // // //                                                                 <span className="cursor-grab text-gray-400 text-xl" aria-label="Geser Modul">☰</span>
// // // //                                                                 <span className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{idx+1}</span>
// // // //                                                                 <div>
// // // //                                                                     <div className="flex items-center gap-2">
// // // //                                                                         <h3 className="font-bold text-gray-800">{m.title}</h3>
// // // //                                                                         {m.jp > 0 && <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded border border-blue-200">{m.jp} JP</span>}
// // // //                                                                     </div>
// // // //                                                                     <div className="flex items-center gap-2 mt-1">
// // // //                                                                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${m.isMandatory ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-600'}`}>{m.isMandatory ? 'WAJIB' : 'OPSIONAL'}</span>
// // // //                                                                         {m.facilitatorId && <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded flex items-center gap-1">👤 {getFacilitatorName(m.facilitatorId)}</span>}
// // // //                                                                         {m.scheduleDate && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1"><Calendar size={10}/> {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // //                                                                     </div>
// // // //                                                                 </div>
// // // //                                                             </div>
// // // //                                                             <div className="flex items-center gap-2"><button type="button" onClick={() => startEditModule(m)} className="text-blue-600 font-bold text-xs px-2" aria-label="Edit Modul">Edit</button><button type="button" onClick={() => toggleStatus(m._id)} className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${m.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`} aria-label="Toggle Status Modul">{m.isActive ? 'ON' : 'OFF'}</button></div>
// // // //                                                         </div>

// // // //                                                         <Droppable droppableId={m._id} type="lesson">
// // // //                                                             {(provided) => (
// // // //                                                                 <div ref={provided.innerRef} {...provided.droppableProps} className="p-4 space-y-3 min-h-[50px]">
// // // //                                                                     {m.lessons?.map((l: any, lIdx: number) => (
// // // //                                                                         <Draggable key={l._id} draggableId={l._id} index={lIdx}>
// // // //                                                                             {(provided) => (
// // // //                                                                                 <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-3 bg-white border rounded-xl hover:shadow-md transition-shadow">
// // // //                                                                                     <div className="flex items-center gap-3">
// // // //                                                                                         <span className="cursor-grab text-gray-300" aria-label="Geser Lesson">::</span>
// // // //                                                                                         <span className="text-xl">{l.type === 'virtual_class' ? '🎥' : l.type === 'google_classroom' ? '🏫' : l.type === 'video_url' ? '🎞️' : l.type === 'quiz' ? '📝' : l.type === 'poll' ? '📊' : l.type === 'upload_doc' ? '📤' : l.type === 'image' ? '🖼️' : '📄'}</span>
// // // //                                                                                         <div>
// // // //                                                                                             <p className="text-sm font-bold text-gray-800">{l.title}</p>
// // // //                                                                                             {/* [RESTORED] DETAIL LESSON HEADER */}
// // // //                                                                                             <div className="flex gap-2 items-center mt-0.5">
// // // //                                                                                                 {l.jp > 0 && <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 rounded border border-blue-100">{l.jp} JP</span>}
// // // //                                                                                                 {l.scheduleDate && <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-1.5 rounded border border-purple-100 flex items-center gap-1"><Calendar size={10}/> {new Date(l.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // //                                                                                                 {(l.facilitatorId || l.facilitator) && (<span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">👤 {getFacilitatorName(l.facilitatorId || l.facilitator)}</span>)}
// // // //                                                                                             </div>
// // // //                                                                                         </div>
// // // //                                                                                     </div>
// // // //                                                                                     <div className="flex items-center gap-2"><button type="button" onClick={() => startEditLesson(m._id, l)} className="text-blue-500 p-1" aria-label="Edit Lesson">✎</button><button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`px-2 py-1 rounded text-[10px] font-bold border ${l.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`} aria-label="Toggle Status Lesson">{l.isActive ? 'ON' : 'OFF'}</button><button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-gray-300 hover:text-red-500" aria-label="Hapus Lesson">🗑️</button></div>
// // // //                                                                                 </div>
// // // //                                                                             )}
// // // //                                                                         </Draggable>
// // // //                                                                     ))}
// // // //                                                                     {provided.placeholder}
                                                                    
// // // //                                                                     {activeModId === m._id ? (
// // // //                                                                         <div id={`form-${m._id}`} className="bg-blue-50 p-5 rounded-xl border border-blue-200 space-y-4">
// // // //                                                                             <div className="grid grid-cols-12 gap-3">
// // // //                                                                                 <div className="col-span-4"><select className="w-full p-2 border rounded-lg text-sm" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Pilih Tipe Konten"><option value="lesson">📄 Materi Teks</option><option value="essay">📝 Esai</option><option value="slide">🖥️ Slide Presentasi</option><option value="image">🖼️ Upload Gambar</option><option value="download_doc">📥 Upload Dokumen</option><option value="upload_doc">📤 Tugas Upload</option><option value="quiz">📝 Kuis</option><option value="poll">📊 Polling</option><option value="video_url">🎞️ Video URL (YouTube)</option><option value="virtual_class">🎥 Kelas Virtual (Zoom/Teams)</option><option value="google_classroom">🏫 Google Classroom</option></select></div>
// // // //                                                                                 <div className="col-span-6"><input className="w-full p-2 border rounded-lg text-sm" placeholder="Judul..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Lesson" /></div>
// // // //                                                                                 <div className="col-span-2"><input type="number" className="w-full p-2 border rounded-lg text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="Jam Pelajaran Lesson" /></div>
// // // //                                                                             </div>
                                                                            
// // // //                                                                             <div className="grid grid-cols-2 gap-4">
// // // //                                                                                 <div>
// // // //                                                                                     <label className="text-xs font-bold text-gray-500 block mb-1">Fasilitator Pengampu</label>
// // // //                                                                                     <select value={lesFacilitatorId} onChange={e => setLesFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm" aria-label="Pilih Fasilitator" title="Pilih Fasilitator">
// // // //                                                                                         <option value="">-- Sama dengan Modul ({getFacilitatorName(m.facilitatorId)}) --</option>
// // // //                                                                                         {activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}
// // // //                                                                                     </select>
// // // //                                                                                 </div>
// // // //                                                                                 <div>
// // // //                                                                                     <label className="text-xs font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label>
// // // //                                                                                     <input type="date" className="w-full border p-2 rounded text-sm" value={lesSchedule} onChange={e => setLesSchedule(e.target.value)} aria-label="Tanggal Materi" title="Tanggal Materi" />
// // // //                                                                                 </div>
// // // //                                                                             </div>
                                                                            
// // // //                                                                             <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e => setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib" title="Wajib" /><span>Materi ini wajib diselesaikan?</span></label>

// // // //                                                                             {lesType === 'essay' && (
// // // //                                                                                 <div className="space-y-4 bg-white p-4 rounded border border-blue-100">
// // // //                                                                                     <label className="block text-xs font-bold text-gray-500">Instruksi / Konteks Soal:</label>
// // // //                                                                                     <div className="bg-white rounded-lg overflow-hidden border border-gray-200"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-40 mb-12" placeholder="Tulis instruksi atau bacaan soal..." /></div>
// // // //                                                                                     <h4 className="text-sm font-bold text-gray-700 mt-4">Daftar Pertanyaan Esai:</h4>
// // // //                                                                                     {essayQuestions.map((q, idx) => (<div key={idx} className="flex gap-2"><span className="text-sm font-bold text-gray-500 py-2">{idx + 1}.</span><textarea className="flex-1 p-2 border rounded text-sm h-20" placeholder="Tulis pertanyaan..." value={q} onChange={e => updateEssay(idx, e.target.value)} aria-label={`Pertanyaan Esai ${idx+1}`}/>{essayQuestions.length > 1 && (<button type="button" onClick={() => removeEssay(idx)} className="text-red-500 font-bold px-2 self-start mt-2" aria-label="Hapus Pertanyaan">✕</button>)}</div>))}
// // // //                                                                                     <button type="button" onClick={addEssayRow} className="text-xs font-bold text-blue-600 flex items-center gap-1" aria-label="Tambah Pertanyaan"><Plus size={14}/> Tambah Pertanyaan</button>
// // // //                                                                                     <div className="flex items-center gap-2 mb-2 bg-amber-50 p-2 rounded border border-amber-100"><label className="text-xs font-bold text-amber-800 flex items-center gap-2"><Clock size={14}/> Durasi (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="p-1 border rounded w-20 text-sm" aria-label="Durasi Esai"/><label className="text-xs ml-4 flex items-center gap-1 cursor-pointer"><input type="checkbox" checked={useEssayTimer} onChange={e => setUseEssayTimer(e.target.checked)} aria-label="Gunakan Timer" /> Gunakan Timer</label></div>
// // // //                                                                                 </div>
// // // //                                                                             )}

// // // //                                                                             {lesType === 'virtual_class' && (<div className="bg-white p-4 rounded border border-blue-200 space-y-2"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><LinkIcon size={16}/> Link Meeting (Zoom/Teams/GMeet)</label><input type="url" className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://teams.microsoft.com/..." value={lesContent} onChange={e => setLesContent(e.target.value)} aria-label="Link Meeting" /></div>)}

// // // //                                                                             {lesType === 'video_url' && (<div className="bg-white p-3 rounded border border-gray-200"><label className="text-xs font-bold text-gray-600 flex items-center gap-2 mb-1"><Video size={16}/> Link Video (YouTube)</label><input className="w-full p-2 border rounded text-sm outline-none" placeholder="https://youtube.com/watch?v=..." value={lesContent} onChange={e => setLesContent(e.target.value)} aria-label="URL Video" /></div>)}
                                                                            
// // // //                                                                             {['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded-lg overflow-hidden border border-gray-200"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-64 mb-12" /></div>)}
                                                                            
// // // //                                                                             {['image','download_doc','slide'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Pilih File"/></div>)}
                                                                            
// // // //                                                                             {lesType === 'quiz' && (<div className="space-y-4 bg-white p-4 rounded border"><div className="flex items-center gap-2 mb-2 bg-amber-50 p-2 rounded border border-amber-100"><label className="text-xs font-bold text-amber-800">⏱ Durasi (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="p-1 border rounded w-20 text-sm" aria-label="Durasi Kuis"/></div>{questions.map((q, ix) => (<div key={ix} className="p-3 border rounded bg-gray-50 relative"><button type="button" onClick={() => removeQuestion(ix)} className="absolute top-2 right-2 text-red-500 text-xs font-bold hover:underline" aria-label="Hapus Soal">Hapus</button><input className="w-full mb-2 p-2 border rounded" placeholder={`Pertanyaan ${ix+1}`} value={q.question} onChange={e=>updateQuestion(ix,'question',e.target.value)} aria-label={`Pertanyaan ${ix+1}`} /><div className="grid grid-cols-2 gap-2">{q.options.map((o:string,oi:number)=><input key={oi} className={`w-full p-1 border ${q.correctIndex===oi?'bg-green-100 border-green-400':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix,'options',e.target.value,oi)} aria-label={`Opsi ${oi+1}`} />)}</div><div className="mt-2 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix,'correctIndex',Number(e.target.value))} className="border w-12 p-1 rounded" aria-label="Kunci Jawaban" /></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-200" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}
// // // //                                                                             {lesType === 'poll' && (<div className="space-y-4 bg-white p-4 rounded border border-blue-100"><input className="w-full p-2 border rounded text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} aria-label="Pertanyaan Polling" />{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2"><input className="flex-1 p-2 border rounded text-sm" placeholder={`Opsi ${idx + 1}`} value={opt} onChange={e => updatePollOption(idx, e.target.value)} aria-label={`Opsi ${idx+1}`} />{pollOptions.length > 2 && (<button type="button" onClick={() => removePollOption(idx)} className="text-red-500 font-bold px-2" aria-label="Hapus Opsi">✕</button>)}</div>))}<button type="button" onClick={addPollOption} className="text-xs font-bold text-blue-600" aria-label="Tambah Opsi">+ Tambah Opsi</button></div>)}
                                                                            
// // // //                                                                             {/* [RESTORED] GOOGLE CLASSROOM BUTTONS */}
// // // //                                                                             {lesType === 'google_classroom' && (
// // // //                                                                                 <div className="bg-white p-4 rounded border border-green-200 space-y-3">
// // // //                                                                                     <div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Kelas" title="Refresh"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putuskan Akun" title="Putuskan"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google" title="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas" title="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas" title="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}
// // // //                                                                                 </div>
// // // //                                                                             )}

// // // //                                                                             <div className="flex justify-end gap-2"><button type="button" onClick={resetLessonForm} className="px-3 py-1 text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-4 py-1 rounded text-xs font-bold" aria-label="Simpan">Simpan</button></div>
// // // //                                                                         </div>
// // // //                                                                     ) : (
// // // //                                                                         <button type="button" onClick={()=>{setActiveModId(m._id); setLesType('lesson');}} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-xs hover:border-blue-300 hover:text-blue-600 transition-colors" aria-label="Tambah Konten">+ Tambah Konten</button>
// // // //                                                                     )}
// // // //                                                                 </div>
// // // //                                                             )}
// // // //                                                         </Droppable>
// // // //                                                     </div>
// // // //                                                 )}
// // // //                                             </Draggable>
// // // //                                         ))}
// // // //                                         {provided.placeholder}
// // // //                                     </div>
// // // //                                 )}
// // // //                             </Droppable>
// // // //                         </DragDropContext>
// // // //                     </section>
// // // //                 </div>

// // // //                 {/* [RESTORED] SERTIFIKAT & KOMPETENSI */}
// // // //                 <div className="border-t-4 border-gray-100 pt-8"></div>
// // // //                 <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
// // // //                     <div className="flex justify-between items-start mb-6">
// // // //                         <h2 className="text-2xl font-bold text-gray-800">🎓 Pengaturan Sertifikat</h2>
// // // //                         <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg text-xs font-medium border border-blue-200 max-w-md shadow-sm">
// // // //                             <div className="flex gap-2 items-start"><Info size={16} className="shrink-0 mt-0.5"/><div><strong>Format Nomor Otomatis:</strong><br/>Gunakan placeholder <code>{'{NO}'}</code> agar nomor urut peserta terisi otomatis.<br/>Format Standard: <code>00{'{NO}'}/DIKLAT/02.01.2026/I/2026</code></div></div>
// // // //                         </div>
// // // //                     </div>
// // // //                     <CertificateConfigForm initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} />
// // // //                     {certConfig && (
// // // //                         <div className="mt-8 border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 shadow-sm">
// // // //                             <div className="bg-gray-100 px-4 py-3 border-b flex items-center gap-2 font-bold text-gray-700 text-sm"><FileBadge size={16}/> Data Konfigurasi Tersimpan (Preview)</div>
// // // //                             <div className="p-4 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
// // // //                                 <div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Hash size={12}/> Format Nomor</p><p className="font-mono bg-white border px-3 py-2 rounded text-gray-800 shadow-sm">{certConfig.certificateNumber || '-'}</p></div>
// // // //                                 <div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar size={12}/> Tanggal Pelaksanaan</p><p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.executionDate ? new Date(certConfig.executionDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '-'}</p></div>
// // // //                                 <div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MapPin size={12}/> Kota Penerbit</p><p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.city || '-'}</p></div>
// // // //                                 <div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><UserCheck size={12}/> Penanda Tangan</p><p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.signatoryName} <span className="font-normal text-gray-500 text-xs block">({certConfig.signatoryPosition})</span></p></div>
// // // //                             </div>
// // // //                         </div>
// // // //                     )}
// // // //                     <div className="my-10 border-t border-gray-100"></div>
// // // //                     <CompetencyForm initialData={competencies} onChange={(data) => setCompetencies(data)} />
// // // //                     <div className="mt-4 flex items-center gap-2 bg-gray-50 p-3 rounded-lg border"><input type="checkbox" id="includeComp" checked={includeCompetencies} onChange={(e) => setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Sertakan Kompetensi" /><label htmlFor="includeComp" className="text-sm font-bold text-gray-700 cursor-pointer">Tampilkan daftar kompetensi di halaman belakang sertifikat?</label></div>
// // // //                     <div className="mt-4 flex justify-end"><button type="button" onClick={handleSaveCompetencies} disabled={isSavingCompetencies} className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button></div>
// // // //                 </section>

// // // //                 <div className="mt-8 p-6 bg-gray-50 rounded-3xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3">
// // // //                     <h3 className="text-lg font-bold text-gray-800">Selesai?</h3>
// // // //                     <button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Publish Course">{course?.isPublished ? 'Tarik Kembali ke Draft' : '🚀 PUBLISH SEKARANG'}</button>
// // // //                 </div>

// // // //                 {/* --- FLOATING DASHBOARD & MODALS --- */}
// // // //                 <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
// // // //                     <button type="button" onClick={() => { setShowTeamChat(true); }} className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 hover:text-white border border-gray-200 transition-transform hover:scale-105 flex items-center gap-2 group relative" title="Chat Tim" aria-label="Chat Tim"><MessageSquare size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Diskusi Tim</span></button>
// // // //                     <button type="button" onClick={() => { setShowParticipantChat(true); fetchParticipants(); }} className="bg-emerald-600 text-white p-4 rounded-full shadow-xl hover:bg-emerald-700 flex items-center gap-2 transition-transform hover:scale-105 group relative" title="Chat Peserta" aria-label="Chat Peserta"><MessageCircle size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Chat Peserta</span></button>
// // // //                     <button type="button" onClick={() => setShowPreviewModal(true)} className="bg-white text-gray-700 p-4 rounded-full shadow-xl hover:bg-gray-50 border border-gray-200 transition-transform hover:scale-105 flex items-center gap-2 group relative" title="Preview" aria-label="Preview Kelas"><Eye size={24} className="text-purple-600"/><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Preview Kelas</span></button>
// // // //                     <button type="button" onClick={() => { setShowParticipantModal(true); fetchParticipants(); }} className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 flex items-center gap-2 transition-transform hover:scale-105 group relative" aria-label="Manajemen Peserta" title="Manajemen Peserta"><Users size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Manajemen Peserta</span></button>
// // // //                 </div>

// // // //                 {/* --- MODALS --- */}
// // // //                 {showPreviewModal && (<div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200"><div className="bg-white w-[95vw] h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"><div className="bg-gray-900 text-white p-3 flex justify-between items-center px-6"><h3 className="font-bold flex items-center gap-2"><Eye size={18}/> Preview Mode</h3><div className="flex gap-3"><button type="button" onClick={() => window.open(`/courses/${courseId}`, '_blank', 'noopener,noreferrer')} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded flex items-center gap-1 transition-colors" aria-label="Buka di Tab Baru"><ExternalLink size={14}/> Buka Tab Baru</button><button type="button" onClick={() => setShowPreviewModal(false)} className="text-gray-400 hover:text-white" aria-label="Tutup Preview"><X size={24}/></button></div></div><div className="flex-1 bg-gray-100"><iframe src={`/courses/${courseId}`} className="w-full h-full border-0" title="Course Preview" /></div></div></div>)}
// // // //                 {showParticipantChat && (<RoomChatModal title="Global Room (Peserta)" members={[...chatMembers, ...teamMembers]} onClose={() => setShowParticipantChat(false)} themeColor="bg-red-700" />)}
// // // //                 {showTeamChat && (<RoomChatModal title="Diskusi Tim Fasilitator" members={teamMembers} onClose={() => setShowTeamChat(false)} themeColor="bg-blue-600" />)}
// // // //                 {showWallOfFameModal && (
// // // //                     <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
// // // //                         <div className="bg-white w-full max-w-lg h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // // //                             <div className="bg-yellow-500 p-4 text-white flex justify-between items-center shadow-md">
// // // //                                 <h3 className="font-bold text-lg flex items-center gap-2"><Trophy size={20}/> Wall of Fame History</h3>
// // // //                                 <button type="button" onClick={() => setShowWallOfFameModal(false)} className="hover:bg-yellow-600 p-2 rounded-full" aria-label="Tutup"><X size={24}/></button>
// // // //                             </div>
// // // //                             <div className="flex-1 p-4 overflow-y-auto bg-yellow-50 space-y-3">
// // // //                                 {recentCompletions.length > 0 ? recentCompletions.map((rc:any, i:number) => (
// // // //                                     <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
// // // //                                         <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold"><Award size={20}/></div>
// // // //                                         <div><p className="font-bold text-gray-800">{rc.name}</p><p className="text-xs text-gray-500">Menyelesaikan {rc.module} pada {rc.date || 'Hari ini'}</p></div>
// // // //                                     </div>
// // // //                                 )) : <div className="text-center text-gray-400 mt-10">Belum ada data kelulusan.</div>}
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 )}
// // // //                 {showStudentDetailModal && studentDetail && (
// // // //                     <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
// // // //                         <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // // //                             <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
// // // //                                 <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">{studentDetail.name?.charAt(0)}</div><div><h3 className="font-bold text-lg">{studentDetail.name}</h3><p className="text-xs opacity-80">{studentDetail.email}</p></div></div>
// // // //                                 <button type="button" onClick={() => setShowStudentDetailModal(false)} className="hover:bg-indigo-700 p-2 rounded-full" aria-label="Tutup"><X size={24}/></button>
// // // //                             </div>
// // // //                             <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
// // // //                                 <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><FileText size={18}/> Riwayat Pengerjaan & Upload</h4>
// // // //                                 <div className="space-y-4">
// // // //                                     <div className="p-4 bg-white border rounded-xl shadow-sm"><p className="text-sm font-bold text-gray-800 mb-2">Tugas Upload: Modul 1</p><a href="#" className="text-blue-600 text-xs hover:underline flex items-center gap-1"><Download size={12}/> Download File Tugas</a></div>
// // // //                                     <div className="p-4 bg-white border rounded-xl shadow-sm"><p className="text-sm font-bold text-gray-800 mb-2">Esai: Modul 2</p><p className="text-xs text-gray-600 italic">"Jawaban siswa akan muncul di sini..."</p></div>
// // // //                                     <p className="text-center text-gray-400 text-xs mt-4">Fitur review detail sedang dalam pengembangan backend.</p>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 )}
// // // //                 {showParticipantModal && (
// // // //                     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
// // // //                         <div className="bg-white w-full max-w-6xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
// // // //                             <div className="p-6 border-b flex justify-between items-center bg-gray-50">
// // // //                                 <div><h2 className="text-xl font-bold text-gray-800">Manajemen Peserta</h2><p className="text-xs text-gray-500">Kelola kelulusan dan reset kuis.</p></div>
// // // //                                 <button type="button" onClick={() => setShowParticipantModal(false)} className="bg-white p-2 rounded-full shadow hover:bg-gray-100" aria-label="Tutup Modal" title="Tutup"><X size={20}/></button>
// // // //                             </div>
                           
// // // //                             <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex flex-wrap gap-4 items-center justify-between">
// // // //                                 <div className="flex items-center gap-3">
// // // //                                     <span className="text-xs font-bold text-indigo-800">🛠 Aksi Massal:</span>
// // // //                                     <select className="p-2 border rounded-lg text-sm bg-white min-w-[250px]" value={selectedActionId} onChange={e=>setSelectedActionId(e.target.value)} aria-label="Pilih Materi Aksi" title="Pilih Materi Aksi">
// // // //                                         <option value="">-- Pilih Materi / Kuis --</option>
// // // //                                         {actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
// // // //                                     </select>
// // // //                                 </div>
// // // //                                 <div className="relative">
// // // //                                     <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // // //                                     <input className="pl-10 pr-4 py-2 rounded-full border border-gray-300 text-sm w-64 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Cari peserta..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} aria-label="Cari Peserta" title="Cari Peserta" />
// // // //                                 </div>
// // // //                             </div>

// // // //                             <div className="flex-1 overflow-y-auto p-0 bg-gray-50/50">
// // // //                                 {loadingParticipants ? (<div className="flex justify-center items-center h-full text-gray-400">Memuat data...</div>) : participants.length === 0 ? (<div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2"><Users size={48} className="opacity-20"/><p>Belum ada peserta.</p></div>) : (
// // // //                                     <table className="w-full text-left border-collapse">
// // // //                                         <thead className="bg-gray-100 sticky top-0 z-10 text-xs font-bold text-gray-600"><tr className="border-b"><th className="p-4">Peserta</th><th className="p-4">Tanggal Gabung</th><th className="p-4 text-center">Progres</th><th className="p-4 text-center">Aksi Konteks</th><th className="p-4 text-center">Chat</th><th className="p-4 text-center">Detail</th><th className="p-4 text-center text-red-600">Hapus</th></tr></thead>
// // // //                                         <tbody className="text-sm bg-white divide-y">
// // // //                                             {participants.filter(p => (p.user?.name || p.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => {
// // // //                                                 const userObj = p.user || p.student || p.participant || p;
// // // //                                                 const enrollmentId = p._id; // Pastikan backend kirim _id Enrollment
// // // //                                                 const name = userObj.name || 'Tanpa Nama';
// // // //                                                 const email = userObj.email || '-';
// // // //                                                 const dateRaw = p.joinedAt || p.createdAt || p.enrolledAt || userObj.joinedAt;
// // // //                                                 const joinDate = dateRaw && !isNaN(new Date(dateRaw).getTime()) ? new Date(dateRaw).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';
// // // //                                                 const selectedActionItem = actionOptions.find(o => o.id === selectedActionId);
// // // //                                                 const isCompleted = selectedActionId && p.completedLessons?.includes(selectedActionId);

// // // //                                                 return (
// // // //                                                     <tr key={idx} className="hover:bg-blue-50 transition-colors">
// // // //                                                         <td className="p-4 font-bold text-gray-800 flex items-center gap-3">
// // // //                                                             <div className="relative">
// // // //                                                                 {userObj.avatarUrl ? (<img src={getImageUrl(userObj.avatarUrl)} alt={name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />) : (<div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-200">{name.charAt(0).toUpperCase()}</div>)}
// // // //                                                             </div>
// // // //                                                             <div>
// // // //                                                                 <div>{name}</div>
// // // //                                                                 <div className="text-[10px] text-gray-400 font-normal flex items-center gap-1"><Mail size={10}/> {email}</div>
// // // //                                                             </div>
// // // //                                                         </td>
// // // //                                                         <td className="p-4 text-xs text-gray-500">{joinDate}</td>
// // // //                                                         <td className="p-4 text-center">
// // // //                                                             <div className="w-24 bg-gray-200 rounded-full h-2 mx-auto overflow-hidden">
// // // //                                                                 <div className="bg-green-500 h-2 rounded-full" style={{width: `${p.progress || 0}%`}}></div>
// // // //                                                             </div>
// // // //                                                             <span className="text-[10px] text-gray-500 mt-1 block">{p.progress || 0}%</span>
// // // //                                                         </td>
// // // //                                                         <td className="p-4 text-center">
// // // //                                                             {selectedActionItem ? (
// // // //                                                                 <button 
// // // //                                                                     type="button" 
// // // //                                                                     onClick={() => handleParticipantAction(userObj._id, selectedActionItem.type === 'quiz' ? 'reset' : 'pass')} 
// // // //                                                                     disabled={selectedActionItem.type !== 'quiz' && isCompleted} 
// // // //                                                                     className={`px-3 py-1 rounded text-xs font-bold border transition-all flex items-center gap-1 mx-auto ${isCompleted ? 'bg-green-100 text-green-700 border-green-200 cursor-default' : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50'}`}
// // // //                                                                     aria-label="Aksi Peserta"
// // // //                                                                     title={selectedActionItem.type === 'quiz' ? 'Reset Kuis' : 'Luluskan Manual'}
// // // //                                                                 >
// // // //                                                                     {selectedActionItem.type === 'quiz' ? '↺ Reset' : (isCompleted ? '✓ Lulus' : '⚡ Luluskan')}
// // // //                                                                 </button>
// // // //                                                             ) : <span className="text-gray-300 text-xs">-</span>}
// // // //                                                         </td>
// // // //                                                         <td className="p-4 text-center"><button type="button" onClick={() => setChatTargetStudent({ name, email, _id: userObj._id })} className="p-2 rounded-full text-blue-500 hover:bg-blue-50 hover:scale-110 transition-all border border-transparent hover:border-blue-100" aria-label="Chat Peserta" title="Chat"><MessageSquare size={18}/></button></td>
// // // //                                                         <td className="p-4 text-center"><button type="button" onClick={() => handleViewStudentDetail(userObj)} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-600" aria-label="Lihat Detail" title="Detail"><Eye size={18}/></button></td>
                                                        
// // // //                                                         {/* [NEW] TOMBOL HAPUS PESERTA */}
// // // //                                                         <td className="p-4 text-center">
// // // //                                                             <button 
// // // //                                                                 type="button" 
// // // //                                                                 onClick={() => handleRejectParticipant(enrollmentId, name)} 
// // // //                                                                 className="p-2 rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
// // // //                                                                 title="Tolak / Hapus Peserta"
// // // //                                                                 aria-label="Tolak Peserta"
// // // //                                                             >
// // // //                                                                 <UserX size={18}/>
// // // //                                                             </button>
// // // //                                                         </td>
// // // //                                                     </tr>
// // // //                                                 );
// // // //                                             })}
// // // //                                         </tbody>
// // // //                                     </table>
// // // //                                 )}
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 )}
// // // //             </div>
// // // //         </Protected>
// // // //     );
// // // // }
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
// // //     FileBadge, MapPin, UserCheck, Hash, Info, UserX
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

// // // // --- CHAT MODAL ---
// // // function RoomChatModal({ title, members, onClose }: any) { return <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"><div className="bg-white p-6 rounded-lg"><h3 className="font-bold mb-4">{title}</h3><button onClick={onClose} aria-label="Tutup Chat">Tutup</button></div></div> }

// // // // --- MAIN PAGE ---
// // // export default function AdminCourseDetailPage() {
// // //     const params = useParams();
// // //     const courseId = params?.id as string;
// // //     const router = useRouter();
// // //     const fileInputRef = useRef<HTMLInputElement>(null);

// // //     const [course, setCourse] = useState<any>(null);
// // //     const [loading, setLoading] = useState(true);
// // //     const [isBrowser, setIsBrowser] = useState(false);
// // //     const [isUploadingCover, setIsUploadingCover] = useState(false);
// // //     const [notification, setNotification] = useState<string | null>(null);

// // //     // Modal States
// // //     const [showParticipantModal, setShowParticipantModal] = useState(false);
// // //     const [showParticipantChat, setShowParticipantChat] = useState(false);
// // //     const [showTeamChat, setShowTeamChat] = useState(false);
// // //     const [showPreviewModal, setShowPreviewModal] = useState(false);
// // //     const [showWallOfFameModal, setShowWallOfFameModal] = useState(false);
// // //     const [showStudentDetailModal, setShowStudentDetailModal] = useState(false); 
// // //     const [studentDetail, setStudentDetail] = useState<any>(null);
   
// // //     const [participants, setParticipants] = useState<any[]>([]);
// // //     const [loadingParticipants, setLoadingParticipants] = useState(false);
// // //     const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);
   
// // //     const [chatMembers, setChatMembers] = useState<any[]>([]);
// // //     const [teamMembers, setTeamMembers] = useState<any[]>([]);
// // //     const [recentCompletions, setRecentCompletions] = useState<any[]>([]);

// // //     const [participantFilter, setParticipantFilter] = useState('');
// // //     const [actionOptions, setActionOptions] = useState<any[]>([]);
// // //     const [selectedActionId, setSelectedActionId] = useState<string>('');

// // //     const [facilitators, setFacilitators] = useState<any[]>([]);
// // //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>([]);
// // //     const [currentUserRole, setCurrentUserRole] = useState('');
// // //     const [searchFacilitator, setSearchFacilitator] = useState('');
   
// // //     // Content State
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

// // //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// // //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// // //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// // //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// // //     const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // //     const [uploading, setUploading] = useState(false);
// // //     const [quizDuration, setQuizDuration] = useState(10);
// // //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// // //     const [pollQuestion, setPollQuestion] = useState('');
// // //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
   
// // //     // Essay State
// // //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// // //     const [useEssayTimer, setUseEssayTimer] = useState(false);

// // //     const [competencies, setCompetencies] = useState<any[]>([]);
// // //     const [includeCompetencies, setIncludeCompetencies] = useState(true);
// // //     const [certConfig, setCertConfig] = useState<any>(null);
// // //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// // //     const [isSavingCert, setIsSavingCert] = useState(false);

// // //     const activeTeam = facilitators.filter(f => selectedFacilitatorIds.includes(f._id));

// // //     const quillModules = useMemo(() => ({
// // //         toolbar: {
// // //             container: [
// // //                 [{ 'header': [1, 2, 3, false] }],
// // //                 ['bold', 'italic', 'underline', 'strike', 'blockquote'],
// // //                 [{'list': 'ordered'}, {'list': 'bullet'}],
// // //                 ['link', 'image', 'video'], 
// // //                 [{ 'color': [] }, { 'background': [] }],
// // //                 ['clean']
// // //             ]
// // //         }
// // //     }), []);

// // //     useEffect(() => {
// // //         setIsBrowser(true);
// // //         if (typeof window !== 'undefined') {
// // //             const userStr = localStorage.getItem('user');
// // //             if (userStr) {
// // //                 const user = JSON.parse(userStr);
// // //                 setCurrentUserRole(user.role);
// // //             }
// // //             const savedToken = localStorage.getItem('google_class_token');
// // //             if (savedToken) {
// // //                 setGoogleToken(savedToken);
// // //                 fetchClassroomCourses(savedToken);
// // //             }
// // //         }
// // //         if (courseId) load();
// // //     }, [courseId]);

// // //     const load = async () => { 
// // //         try {
// // //             const data = await api(`/api/courses/${courseId}`);
// // //             const courseData = data.course || data;
// // //             setCourse(courseData);
            
// // //             const opts: any[] = [];
// // //             courseData.modules?.forEach((m: any) => {
// // //                 m.lessons?.forEach((l: any) => {
// // //                     let label = l.title;
// // //                     if(l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
// // //                     else label = `📄 ${l.title}`;
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

// // //             const userStr = localStorage.getItem('user');
// // //             if (userStr) {
// // //                 const usersRes = await api('/api/admin/users');
// // //                 if (usersRes.users) {
// // //                     const facs = usersRes.users.filter((u: any) => u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN');
// // //                     setFacilitators(facs);
// // //                     const team = facs.filter((u: any) => courseData.facilitatorIds?.some((f: any) => (f._id || f) === u._id) || u.role === 'SUPER_ADMIN');
// // //                     setTeamMembers(team.map((t: any) => ({ ...t, role: 'Facilitator' })));
// // //                 }
// // //             }
// // //             fetchParticipants();
// // //         } catch (e) { console.error(e); } finally { setLoading(false); }
// // //     };

// // //     const fetchParticipants = async () => {
// // //         setLoadingParticipants(true);
// // //         try {
// // //             const res = await api(`/api/courses/${courseId}/participants`);
// // //             const parts = res.participants || res.data || [];
// // //             setParticipants(parts);
            
// // //             const chatList = parts.map((p: any) => {
// // //                 const userObj = p.user || p.student || p;
// // //                 return { name: userObj.name || 'User', avatarUrl: userObj.avatarUrl || userObj.image, role: 'Student', _id: userObj._id };
// // //             });
// // //             setChatMembers([...teamMembers, ...chatList]);
// // //         } catch (error) { console.error("Gagal load peserta"); } finally { setLoadingParticipants(false); }
// // //     };

// // //     const handleRejectParticipant = async (enrollmentId: string, studentName: string) => {
// // //         if (!confirm(`Apakah Anda yakin ingin MENOLAK/MENGHAPUS pendaftaran "${studentName}"?`)) return;
// // //         try { await api(`/api/enrollments/${enrollmentId}`, { method: 'DELETE' }); alert(`Peserta ${studentName} berhasil dihapus.`); fetchParticipants(); } catch (e: any) { alert("Gagal: " + e.message); }
// // //     };

// // //     const getFacilitatorName = (data: any) => {
// // //         if (!data) return null;
// // //         if (typeof data === 'object' && data.name) return data.name;
// // //         const found = facilitators.find(f => f._id === data || f.id === data);
// // //         return found ? found.name : 'Unknown';
// // //     };

// // //     const handleSaveModule = async () => { 
// // //         if (!modTitle.trim()) return alert("Judul wajib"); 
// // //         const safeFacilitatorId = modFacilitatorId || null;
// // //         const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: safeFacilitatorId, jp: modJp, scheduleDate: modSchedule || null }; 
// // //         try { if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); resetModuleForm(); load(); } catch(e: any) { alert(e.message); } 
// // //     };

// // //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
// // //     const resetModuleForm = () => { setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false); };
// // //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); setCourse((prev: any) => ({ ...prev, isPublished: newStatus })); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); load(); } } catch (e: any) { alert(e.message); } };
// // //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); load(); } catch (e: any) { alert(e.message); } };
// // //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } setCourse(newCourse); try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); } catch (err) { load(); } };
// // //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); const res = await apiUpload(`/api/upload/course/${courseId}/cover`, formData); setCourse((prev: any) => ({ ...prev, thumbnailUrl: res.imageUrl || res.url })); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// // //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); };
// // //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// // //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };
// // //     const handleViewStudentDetail = (student: any) => { setStudentDetail(student); setShowStudentDetailModal(true); };
// // //     const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => { 
// // //         if (!selectedActionId) return alert("Pilih Materi/Kuis di dropdown atas dulu!"); 
// // //         const selectedItem = actionOptions.find(o => o.id === selectedActionId);
// // //         if (action === 'pass') { if(!confirm(`Luluskan peserta?`)) return; try { await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId, lessonId: selectedActionId, courseId } }); alert("Berhasil!"); fetchParticipants(); } catch(e:any) { alert(e.message); } }
// // //         else if (action === 'reset') { if(!confirm(`Reset progress?`)) return; try { await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId, quizId: selectedActionId } }); alert("Reset berhasil!"); fetchParticipants(); } catch(e:any) { alert(e.message); } }
// // //     };
    
// // //     // FORM LOGIC
// // //     const resetLessonForm = () => { 
// // //         setActiveModId(null); 
// // //         setEditingLesId(null); 
// // //         setLesTitle(''); setLesIsMandatory(true); setLesContent(''); setSelectedFile(null); setLesJp(0); setLesFacilitatorId(''); setLesSchedule(''); setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(10); setPollQuestion(''); setPollOptions(['', '']); setSelectedClassroom(null); setEssayQuestions(['']); setUseEssayTimer(false); 
// // //     };

// // //     // [FIX] FUNGSI RESET & SCROLL untuk Tombol Tambah Konten
// // //     const handleAddNewContent = (modId: string) => {
// // //         resetLessonForm(); // Reset dulu data form
        
// // //         // Timeout agar state reset selesai sebelum form dibuka
// // //         setTimeout(() => {
// // //             setActiveModId(modId);
// // //             setLesType('lesson');
// // //             // Scroll ke form
// // //             const formEl = document.getElementById(`form-${modId}`);
// // //             formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
// // //         }, 50);
// // //     };

// // //     const handleSaveLesson = async (modId: string) => {
// // //         if (!lesTitle.trim()) { alert("Judul wajib"); return; }
// // //         let fileUrl = '';
// // //         if (selectedFile) { try { setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); const res = await apiUpload('/api/upload', fd); fileUrl = res.url || res.file?.url || res.imageUrl; } catch (err) { alert("Gagal upload"); return; } finally { setUploading(false); } }
// // //         else if (editingLesId) { const mod = course?.modules.find((m: any) => m._id === modId); const les = mod?.lessons.find((l: any) => l._id === editingLesId); if (les) fileUrl = les.fileUrl; }

// // //         const finalType = lesType; // Gunakan tipe yang sedang dipilih
// // //         const safeFacilitatorId = lesFacilitatorId || null;
        
// // //         const body: any = {
// // //             title: lesTitle, type: finalType, isActive: true, isMandatory: lesIsMandatory, jp: lesJp, facilitatorId: safeFacilitatorId, scheduleDate: lesSchedule || null,
// // //             questions: (lesType === 'quiz') ? questions : undefined,
// // //             quizDuration: (lesType === 'quiz' || (lesType === 'essay' && useEssayTimer)) ? quizDuration : undefined,
// // //             pollQuestion: (lesType === 'poll') ? pollQuestion : undefined,
// // //             pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined,
// // //             classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined,
// // //         };

// // //         if (lesType === 'essay') {
// // //             body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 }));
// // //             body.content = lesContent; 
// // //         }

// // //         if(fileUrl) body.fileUrl = fileUrl;
// // //         if(lesType === 'video_url') body.videoUrl = lesContent;
// // //         else if(lesType === 'virtual_class') body.meetingLink = lesContent;
// // //         else if(lesType === 'upload_doc' || lesType === 'lesson') body.content = lesContent;

// // //         try { if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); resetLessonForm(); load(); } catch(e:any) { alert(e.message); }
// // //     };

// // //     const startEditLesson = (modId: string, les: any) => {
// // //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title);
        
// // //         if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) {
// // //             setLesType('essay'); 
// // //             setEssayQuestions(les.questions.map((q:any) => q.question)); 
// // //             setLesContent(les.content || ''); 
// // //             if(les.quizDuration) { setUseEssayTimer(true); setQuizDuration(les.quizDuration); } else { setUseEssayTimer(false); }
// // //         } else { setLesType(les.type); }

// // //         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || ''));
// // //         if (les.type === 'video_url') setLesContent(les.videoUrl||''); else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); else if (les.type !== 'essay') setLesContent(les.content||'');
// // //         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(les.quizDuration||10); }
// // //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); }
// // //         if (les.type === 'google_classroom') { if(googleToken && classroomCourses.length === 0) fetchClassroomCourses(); if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); }
        
// // //         // [FIX] Scroll Agresif ke Form agar tidak "kejauhan"
// // //         setTimeout(() => {
// // //             const formElement = document.getElementById(`form-${modId}`);
// // //             if(formElement) {
// // //                 formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
// // //             }
// // //         }, 150);
// // //     };

// // //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); load(); };
// // //     const addPollOption = () => setPollOptions([...pollOptions, '']); const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); };
// // //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); };
// // //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); const updateEssay = (idx: number, val: string) => { const newQ = [...essayQuestions]; newQ[idx] = val; setEssayQuestions(newQ); }; const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };
    
// // //     // [RESTORED] Google Classroom Handler
// // //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); const width = 500, height = 600; const left = (window.screen.width - width) / 2; const top = (window.screen.height - height) / 2; window.open(url, 'GoogleAuthPopup', `width=${width},height=${height},top=${top},left=${left}`); } catch (e) { alert("Gagal Auth Google"); } };
// // //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } };
// // //     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const res = await fetch(`http://localhost:4000/api/classroom/courses`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'x-google-token': token } }); if (res.status === 401) { localStorage.removeItem('google_class_token'); setGoogleToken(null); return; } const data = await res.json(); if (data.courses) setClassroomCourses(data.courses); } catch (e) { console.error(e); } finally { setIsCheckingGoogle(false); } };

// // //     if (loading || !isBrowser) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div></div>;

// // //     return (
// // //         <Protected roles={["FACILITATOR", "SUPER_ADMIN"]}>
// // //             <div className="max-w-6xl mx-auto p-6 space-y-12 pb-32 relative">
// // //                 {/* HEADER */}
// // //                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 gap-4">
// // //                     <div className="flex-1">
// // //                         <h1 className="text-3xl font-bold text-gray-800">{course?.title}</h1>
// // //                         <div className="flex gap-2 items-center mt-2">
// // //                             <button type="button" onClick={() => toggleStatus()} className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer border transition-colors ${course?.isPublished ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`} aria-label="Toggle Publish" title="Ubah Status Publikasi">{course?.isPublished ? 'PUBLISHED' : 'DRAFT'}</button>
// // //                             <span className="text-xs text-gray-500 font-medium">{course?.modules?.length || 0} Modul • {course?.modules?.reduce((acc: number, m: any) => acc + m.lessons.length, 0) || 0} Materi</span>
// // //                         </div>
// // //                     </div>
// // //                     <button type="button" onClick={() => router.push('/admin/courses')} className="text-sm font-bold text-gray-500 hover:text-gray-800 px-4 py-2 border rounded-lg hover:bg-gray-50" aria-label="Kembali" title="Kembali">← Kembali</button>
// // //                 </div>

// // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //                     {/* KIRI: COVER & TIM */}
// // //                     <div className="md:col-span-1 space-y-6">
// // //                         {/* Cover Image */}
// // //                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
// // //                             {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
// // //                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Upload Cover" title="Ganti Sampul">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Input Cover" /></div>
// // //                         </div>

// // //                         {/* [RESTORED] TIM FASILITATOR */}
// // //                         {currentUserRole === 'SUPER_ADMIN' && (
// // //                             <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
// // //                                 <div className="flex justify-between items-center mb-4">
// // //                                     <div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div>
// // //                                     <button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" title="Simpan Tim" aria-label="Simpan Tim">Simpan</button>
// // //                                 </div>
// // //                                 <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">
// // //                                     {facilitators.map((user: any) => (
// // //                                         <label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}>
// // //                                             <input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih fasilitator ${user.name}`} title={`Pilih ${user.name}`} />
// // //                                             <div className="flex-1 overflow-hidden">
// // //                                                 <div className="text-xs font-bold truncate">{user.name}</div>
// // //                                                 <div className="text-[10px] text-gray-500 truncate">{user.email}</div>
// // //                                             </div>
// // //                                         </label>
// // //                                     ))}
// // //                                 </div>
// // //                                 <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" title="Cari Fasilitator" />
// // //                             </div>
// // //                         )}

// // //                         {/* Wall of Fame */}
// // //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-6 overflow-hidden">
// // //                             <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 text-yellow-600 cursor-pointer" onClick={() => setShowWallOfFameModal(true)}><Trophy size={18}/> Wall of Fame (Klik)</h3>
// // //                             <div className="space-y-2">
// // //                                 {recentCompletions.length > 0 ? recentCompletions.slice(0,3).map((rc:any, i:number) => (
// // //                                     <div key={i} className="flex items-center gap-2 p-2 bg-yellow-50 rounded border border-yellow-100 text-xs">
// // //                                         <Award size={12} className="text-yellow-600"/> <span>{rc.name}</span>
// // //                                     </div>
// // //                                 )) : <span className="text-xs text-gray-400">Belum ada data.</span>}
// // //                             </div>
// // //                         </div>
// // //                     </div>

// // //                     {/* KANAN: MODUL */}
// // //                     <section className="md:col-span-2 space-y-6">
// // //                         <div className="flex justify-between items-center"><h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">📚 Modul & Materi</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-red-700 text-white px-5 py-2 rounded-xl font-bold shadow-lg hover:bg-red-800 flex items-center gap-2" aria-label="Tambah Modul" title="Tambah Modul">+ Tambah Modul</button></div>
                        
// // //                         {showModuleForm && (
// // //                             <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200">
// // //                                 <div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul" title="Nama Modul" /><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" min="0" aria-label="JP" title="Jam Pelajaran" /></div>
// // //                                 <div className="grid grid-cols-2 gap-4">
// // //                                     <div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih Fasilitator" title="Pilih Fasilitator"><option value="">-- Pilih Fasilitator dari Tim --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div>
// // //                                     <div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal Pelaksanaan Modul" /></div>
// // //                                 </div>
// // //                                 <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={modIsMandatory} onChange={e => setModIsMandatory(e.target.checked)} className="w-4 h-4 text-red-600 rounded" aria-label="Wajib" title="Wajib" /><span>Wajib diselesaikan?</span></label>
// // //                                 <div className="flex gap-2 justify-end pt-2"><button type="button" onClick={resetModuleForm} className="text-gray-500 font-bold px-3 text-sm" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700" aria-label="Simpan">Simpan</button></div>
// // //                             </form>
// // //                         )}

// // //                         <DragDropContext onDragEnd={onDragEnd}>
// // //                             <Droppable droppableId="all-modules" type="module">
// // //                                 {(provided) => (
// // //                                     <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
// // //                                         {course?.modules?.map((m: any, idx: number) => (
// // //                                             <Draggable key={m._id} draggableId={m._id} index={idx}>
// // //                                                 {(provided) => (
// // //                                                     <div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-2xl overflow-hidden shadow-sm bg-white">
// // //                                                         {/* [RESTORED] MODULE HEADER DETAIL */}
// // //                                                         <div className="bg-gray-100 p-4 flex justify-between items-center" {...provided.dragHandleProps}>
// // //                                                             <div className="flex items-center gap-3">
// // //                                                                 <span className="cursor-grab text-gray-400 text-xl" aria-label="Geser Modul">☰</span>
// // //                                                                 <span className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{idx+1}</span>
// // //                                                                 <div>
// // //                                                                     <div className="flex items-center gap-2">
// // //                                                                         <h3 className="font-bold text-gray-800">{m.title}</h3>
// // //                                                                         {m.jp > 0 && <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded border border-blue-200">{m.jp} JP</span>}
// // //                                                                     </div>
// // //                                                                     <div className="flex items-center gap-2 mt-1">
// // //                                                                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${m.isMandatory ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-600'}`}>{m.isMandatory ? 'WAJIB' : 'OPSIONAL'}</span>
// // //                                                                         {m.facilitatorId && <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded flex items-center gap-1">👤 {getFacilitatorName(m.facilitatorId)}</span>}
// // //                                                                         {m.scheduleDate && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1"><Calendar size={10}/> {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // //                                                                     </div>
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex items-center gap-2"><button type="button" onClick={() => startEditModule(m)} className="text-blue-600 font-bold text-xs px-2" aria-label="Edit Modul">Edit</button><button type="button" onClick={() => toggleStatus(m._id)} className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${m.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`} aria-label="Toggle Status Modul">{m.isActive ? 'ON' : 'OFF'}</button></div>
// // //                                                         </div>

// // //                                                         <Droppable droppableId={m._id} type="lesson">
// // //                                                             {(provided) => (
// // //                                                                 <div ref={provided.innerRef} {...provided.droppableProps} className="p-4 space-y-3 min-h-[50px]">
// // //                                                                     {m.lessons?.map((l: any, lIdx: number) => (
// // //                                                                         <Draggable key={l._id} draggableId={l._id} index={lIdx}>
// // //                                                                             {(provided) => (
// // //                                                                                 <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-3 bg-white border rounded-xl hover:shadow-md transition-shadow">
// // //                                                                                     <div className="flex items-center gap-3">
// // //                                                                                         <span className="cursor-grab text-gray-300" aria-label="Geser Lesson">::</span>
// // //                                                                                         <span className="text-xl">{l.type === 'virtual_class' ? '🎥' : l.type === 'google_classroom' ? '🏫' : l.type === 'video_url' ? '🎞️' : l.type === 'quiz' ? '📝' : l.type === 'poll' ? '📊' : l.type === 'upload_doc' ? '📤' : l.type === 'image' ? '🖼️' : '📄'}</span>
// // //                                                                                         <div>
// // //                                                                                             <p className="text-sm font-bold text-gray-800">{l.title}</p>
// // //                                                                                             {/* [RESTORED] DETAIL LESSON HEADER */}
// // //                                                                                             <div className="flex gap-2 items-center mt-0.5">
// // //                                                                                                 {l.jp > 0 && <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 rounded border border-blue-100">{l.jp} JP</span>}
// // //                                                                                                 {l.scheduleDate && <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-1.5 rounded border border-purple-100 flex items-center gap-1"><Calendar size={10}/> {new Date(l.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // //                                                                                                 {(l.facilitatorId || l.facilitator) && (<span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">👤 {getFacilitatorName(l.facilitatorId || l.facilitator)}</span>)}
// // //                                                                                             </div>
// // //                                                                                         </div>
// // //                                                                                     </div>
// // //                                                                                     <div className="flex items-center gap-2"><button type="button" onClick={() => startEditLesson(m._id, l)} className="text-blue-500 p-1" aria-label="Edit Lesson">✎</button><button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`px-2 py-1 rounded text-[10px] font-bold border ${l.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`} aria-label="Toggle Status Lesson">{l.isActive ? 'ON' : 'OFF'}</button><button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-gray-300 hover:text-red-500" aria-label="Hapus Lesson">🗑️</button></div>
// // //                                                                                 </div>
// // //                                                                             )}
// // //                                                                         </Draggable>
// // //                                                                     ))}
// // //                                                                     {provided.placeholder}
                                                                    
// // //                                                                     {activeModId === m._id ? (
// // //                                                                         <div id={`form-${m._id}`} className="bg-blue-50 p-5 rounded-xl border border-blue-200 space-y-4">
// // //                                                                             <div className="grid grid-cols-12 gap-3">
// // //                                                                                 <div className="col-span-4"><select className="w-full p-2 border rounded-lg text-sm" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Pilih Tipe Konten"><option value="lesson">📄 Materi Teks</option><option value="essay">📝 Esai</option><option value="slide">🖥️ Slide Presentasi</option><option value="image">🖼️ Upload Gambar</option><option value="download_doc">📥 Upload Dokumen</option><option value="upload_doc">📤 Tugas Upload</option><option value="quiz">📝 Kuis</option><option value="poll">📊 Polling</option><option value="video_url">🎞️ Video URL (YouTube)</option><option value="virtual_class">🎥 Kelas Virtual (Zoom/Teams)</option><option value="google_classroom">🏫 Google Classroom</option></select></div>
// // //                                                                                 <div className="col-span-6"><input className="w-full p-2 border rounded-lg text-sm" placeholder="Judul..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Lesson" /></div>
// // //                                                                                 <div className="col-span-2"><input type="number" className="w-full p-2 border rounded-lg text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="Jam Pelajaran Lesson" /></div>
// // //                                                                             </div>
                                                                            
// // //                                                                             <div className="grid grid-cols-2 gap-4">
// // //                                                                                 <div>
// // //                                                                                     <label className="text-xs font-bold text-gray-500 block mb-1">Fasilitator Pengampu</label>
// // //                                                                                     <select value={lesFacilitatorId} onChange={e => setLesFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm" aria-label="Pilih Fasilitator" title="Pilih Fasilitator">
// // //                                                                                         <option value="">-- Sama dengan Modul ({getFacilitatorName(m.facilitatorId)}) --</option>
// // //                                                                                         {activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}
// // //                                                                                     </select>
// // //                                                                                 </div>
// // //                                                                                 <div>
// // //                                                                                     <label className="text-xs font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label>
// // //                                                                                     <input type="date" className="w-full border p-2 rounded text-sm" value={lesSchedule} onChange={e => setLesSchedule(e.target.value)} aria-label="Tanggal Materi" title="Tanggal Materi" />
// // //                                                                                 </div>
// // //                                                                             </div>
                                                                            
// // //                                                                             <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e => setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib" title="Wajib" /><span>Materi ini wajib diselesaikan?</span></label>

// // //                                                                             {lesType === 'essay' && (
// // //                                                                                 <div className="space-y-4 bg-white p-4 rounded border border-blue-100">
// // //                                                                                     <label className="block text-xs font-bold text-gray-500">Instruksi / Konteks Soal:</label>
// // //                                                                                     <div className="bg-white rounded-lg overflow-hidden border border-gray-200"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-40 mb-12" placeholder="Tulis instruksi atau bacaan soal..." /></div>
// // //                                                                                     <h4 className="text-sm font-bold text-gray-700 mt-4">Daftar Pertanyaan Esai:</h4>
// // //                                                                                     {essayQuestions.map((q, idx) => (<div key={idx} className="flex gap-2"><span className="text-sm font-bold text-gray-500 py-2">{idx + 1}.</span><textarea className="flex-1 p-2 border rounded text-sm h-20" placeholder="Tulis pertanyaan..." value={q} onChange={e => updateEssay(idx, e.target.value)} aria-label={`Pertanyaan Esai ${idx+1}`}/>{essayQuestions.length > 1 && (<button type="button" onClick={() => removeEssay(idx)} className="text-red-500 font-bold px-2 self-start mt-2" aria-label="Hapus Pertanyaan">✕</button>)}</div>))}
// // //                                                                                     <button type="button" onClick={addEssayRow} className="text-xs font-bold text-blue-600 flex items-center gap-1" aria-label="Tambah Pertanyaan"><Plus size={14}/> Tambah Pertanyaan</button>
// // //                                                                                     <div className="flex items-center gap-2 mb-2 bg-amber-50 p-2 rounded border border-amber-100"><label className="text-xs font-bold text-amber-800 flex items-center gap-2"><Clock size={14}/> Durasi (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="p-1 border rounded w-20 text-sm" aria-label="Durasi Esai"/><label className="text-xs ml-4 flex items-center gap-1 cursor-pointer"><input type="checkbox" checked={useEssayTimer} onChange={e => setUseEssayTimer(e.target.checked)} aria-label="Gunakan Timer" /> Gunakan Timer</label></div>
// // //                                                                                 </div>
// // //                                                                             )}

// // //                                                                             {lesType === 'virtual_class' && (<div className="bg-white p-4 rounded border border-blue-200 space-y-2"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><LinkIcon size={16}/> Link Meeting (Zoom/Teams/GMeet)</label><input type="url" className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://teams.microsoft.com/..." value={lesContent} onChange={e => setLesContent(e.target.value)} aria-label="Link Meeting" /></div>)}

// // //                                                                             {lesType === 'video_url' && (<div className="bg-white p-3 rounded border border-gray-200"><label className="text-xs font-bold text-gray-600 flex items-center gap-2 mb-1"><Video size={16}/> Link Video (YouTube)</label><input className="w-full p-2 border rounded text-sm outline-none" placeholder="https://youtube.com/watch?v=..." value={lesContent} onChange={e => setLesContent(e.target.value)} aria-label="URL Video" /></div>)}
                                                                            
// // //                                                                             {['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded-lg overflow-hidden border border-gray-200"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-64 mb-12" /></div>)}
                                                                            
// // //                                                                             {['image','download_doc','slide'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Pilih File"/></div>)}
                                                                            
// // //                                                                             {lesType === 'quiz' && (<div className="space-y-4 bg-white p-4 rounded border"><div className="flex items-center gap-2 mb-2 bg-amber-50 p-2 rounded border border-amber-100"><label className="text-xs font-bold text-amber-800">⏱ Durasi (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="p-1 border rounded w-20 text-sm" aria-label="Durasi Kuis"/></div>{questions.map((q, ix) => (<div key={ix} className="p-3 border rounded bg-gray-50 relative"><button type="button" onClick={() => removeQuestion(ix)} className="absolute top-2 right-2 text-red-500 text-xs font-bold hover:underline" aria-label="Hapus Soal">Hapus</button><input className="w-full mb-2 p-2 border rounded" placeholder={`Pertanyaan ${ix+1}`} value={q.question} onChange={e=>updateQuestion(ix,'question',e.target.value)} aria-label={`Pertanyaan ${ix+1}`} /><div className="grid grid-cols-2 gap-2">{q.options.map((o:string,oi:number)=><input key={oi} className={`w-full p-1 border ${q.correctIndex===oi?'bg-green-100 border-green-400':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix,'options',e.target.value,oi)} aria-label={`Opsi ${oi+1}`} />)}</div><div className="mt-2 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix,'correctIndex',Number(e.target.value))} className="border w-12 p-1 rounded" aria-label="Kunci Jawaban" /></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-200" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}
// // //                                                                             {lesType === 'poll' && (<div className="space-y-4 bg-white p-4 rounded border border-blue-100"><input className="w-full p-2 border rounded text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} aria-label="Pertanyaan Polling" />{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2"><input className="flex-1 p-2 border rounded text-sm" placeholder={`Opsi ${idx + 1}`} value={opt} onChange={e => updatePollOption(idx, e.target.value)} aria-label={`Opsi ${idx+1}`} />{pollOptions.length > 2 && (<button type="button" onClick={() => removePollOption(idx)} className="text-red-500 font-bold px-2" aria-label="Hapus Opsi">✕</button>)}</div>))}<button type="button" onClick={addPollOption} className="text-xs font-bold text-blue-600" aria-label="Tambah Opsi">+ Tambah Opsi</button></div>)}
                                                                            
// // //                                                                             {/* [RESTORED] GOOGLE CLASSROOM BUTTONS */}
// // //                                                                             {lesType === 'google_classroom' && (
// // //                                                                                 <div className="bg-white p-4 rounded border border-green-200 space-y-3">
// // //                                                                                     <div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Kelas" title="Refresh"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putuskan Akun" title="Putuskan"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google" title="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas" title="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas" title="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}
// // //                                                                                 </div>
// // //                                                                             )}

// // //                                                                             <div className="flex justify-end gap-2"><button type="button" onClick={resetLessonForm} className="px-3 py-1 text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-4 py-1 rounded text-xs font-bold" aria-label="Simpan">Simpan</button></div>
// // //                                                                         </div>
// // //                                                                     ) : (
// // //                                                                         <button type="button" onClick={()=>{ handleAddNewContent(m._id) }} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-xs hover:border-blue-300 hover:text-blue-600 transition-colors" aria-label="Tambah Konten">+ Tambah Konten</button>
// // //                                                                     )}
// // //                                                                 </div>
// // //                                                             )}
// // //                                                         </Droppable>
// // //                                                     </div>
// // //                                                 )}
// // //                                             </Draggable>
// // //                                         ))}
// // //                                         {provided.placeholder}
// // //                                     </div>
// // //                                 )}
// // //                             </Droppable>
// // //                         </DragDropContext>
// // //                     </section>
// // //                 </div>

// // //                 {/* [RESTORED] SERTIFIKAT & KOMPETENSI */}
// // //                 <div className="border-t-4 border-gray-100 pt-8"></div>
// // //                 <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
// // //                     <div className="flex justify-between items-start mb-6">
// // //                         <h2 className="text-2xl font-bold text-gray-800">🎓 Pengaturan Sertifikat</h2>
// // //                         <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg text-xs font-medium border border-blue-200 max-w-md shadow-sm">
// // //                             <div className="flex gap-2 items-start"><Info size={16} className="shrink-0 mt-0.5"/><div><strong>Format Nomor Otomatis:</strong><br/>Gunakan placeholder <code>{'{NO}'}</code> agar nomor urut peserta terisi otomatis.<br/>Format Standard: <code>00{'{NO}'}/DIKLAT/02.01.2026/I/2026</code></div></div>
// // //                         </div>
// // //                     </div>
// // //                     <CertificateConfigForm initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} />
// // //                     {certConfig && (
// // //                         <div className="mt-8 border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 shadow-sm">
// // //                             <div className="bg-gray-100 px-4 py-3 border-b flex items-center gap-2 font-bold text-gray-700 text-sm"><FileBadge size={16}/> Data Konfigurasi Tersimpan (Preview)</div>
// // //                             <div className="p-4 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
// // //                                 <div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Hash size={12}/> Format Nomor</p><p className="font-mono bg-white border px-3 py-2 rounded text-gray-800 shadow-sm">{certConfig.certificateNumber || '-'}</p></div>
// // //                                 <div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar size={12}/> Tanggal Pelaksanaan</p><p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.executionDate ? new Date(certConfig.executionDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '-'}</p></div>
// // //                                 <div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MapPin size={12}/> Kota Penerbit</p><p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.city || '-'}</p></div>
// // //                                 <div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><UserCheck size={12}/> Penanda Tangan</p><p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.signatoryName} <span className="font-normal text-gray-500 text-xs block">({certConfig.signatoryPosition})</span></p></div>
// // //                             </div>
// // //                         </div>
// // //                     )}
// // //                     <div className="my-10 border-t border-gray-100"></div>
// // //                     <CompetencyForm initialData={competencies} onChange={(data) => setCompetencies(data)} />
// // //                     <div className="mt-4 flex items-center gap-2 bg-gray-50 p-3 rounded-lg border"><input type="checkbox" id="includeComp" checked={includeCompetencies} onChange={(e) => setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Sertakan Kompetensi" /><label htmlFor="includeComp" className="text-sm font-bold text-gray-700 cursor-pointer">Tampilkan daftar kompetensi di halaman belakang sertifikat?</label></div>
// // //                     <div className="mt-4 flex justify-end"><button type="button" onClick={handleSaveCompetencies} disabled={isSavingCompetencies} className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button></div>
// // //                 </section>

// // //                 <div className="mt-8 p-6 bg-gray-50 rounded-3xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3">
// // //                     <h3 className="text-lg font-bold text-gray-800">Selesai?</h3>
// // //                     <button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Publish Course">{course?.isPublished ? 'Tarik Kembali ke Draft' : '🚀 PUBLISH SEKARANG'}</button>
// // //                 </div>

// // //                 {/* --- FLOATING DASHBOARD & MODALS --- */}
// // //                 <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
// // //                     <button type="button" onClick={() => { setShowTeamChat(true); }} className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 hover:text-white border border-gray-200 transition-transform hover:scale-105 flex items-center gap-2 group relative" title="Chat Tim" aria-label="Chat Tim"><MessageSquare size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Diskusi Tim</span></button>
// // //                     <button type="button" onClick={() => { setShowParticipantChat(true); fetchParticipants(); }} className="bg-emerald-600 text-white p-4 rounded-full shadow-xl hover:bg-emerald-700 flex items-center gap-2 transition-transform hover:scale-105 group relative" title="Chat Peserta" aria-label="Chat Peserta"><MessageCircle size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Chat Peserta</span></button>
// // //                     <button type="button" onClick={() => setShowPreviewModal(true)} className="bg-white text-gray-700 p-4 rounded-full shadow-xl hover:bg-gray-50 border border-gray-200 transition-transform hover:scale-105 flex items-center gap-2 group relative" title="Preview" aria-label="Preview Kelas"><Eye size={24} className="text-purple-600"/><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Preview Kelas</span></button>
// // //                     <button type="button" onClick={() => { setShowParticipantModal(true); fetchParticipants(); }} className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 flex items-center gap-2 transition-transform hover:scale-105 group relative" aria-label="Manajemen Peserta" title="Manajemen Peserta"><Users size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Manajemen Peserta</span></button>
// // //                 </div>

// // //                 {/* --- MODALS --- */}
// // //                 {showPreviewModal && (<div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200"><div className="bg-white w-[95vw] h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"><div className="bg-gray-900 text-white p-3 flex justify-between items-center px-6"><h3 className="font-bold flex items-center gap-2"><Eye size={18}/> Preview Mode</h3><div className="flex gap-3"><button type="button" onClick={() => window.open(`/courses/${courseId}`, '_blank', 'noopener,noreferrer')} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded flex items-center gap-1 transition-colors" aria-label="Buka di Tab Baru"><ExternalLink size={14}/> Buka Tab Baru</button><button type="button" onClick={() => setShowPreviewModal(false)} className="text-gray-400 hover:text-white" aria-label="Tutup Preview"><X size={24}/></button></div></div><div className="flex-1 bg-gray-100"><iframe src={`/courses/${courseId}`} className="w-full h-full border-0" title="Course Preview" /></div></div></div>)}
// // //                 {showParticipantChat && (<RoomChatModal title="Global Room (Peserta)" members={[...chatMembers, ...teamMembers]} onClose={() => setShowParticipantChat(false)} themeColor="bg-red-700" />)}
// // //                 {showTeamChat && (<RoomChatModal title="Diskusi Tim Fasilitator" members={teamMembers} onClose={() => setShowTeamChat(false)} themeColor="bg-blue-600" />)}
// // //                 {showWallOfFameModal && (
// // //                     <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
// // //                         <div className="bg-white w-full max-w-lg h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // //                             <div className="bg-yellow-500 p-4 text-white flex justify-between items-center shadow-md">
// // //                                 <h3 className="font-bold text-lg flex items-center gap-2"><Trophy size={20}/> Wall of Fame History</h3>
// // //                                 <button type="button" onClick={() => setShowWallOfFameModal(false)} className="hover:bg-yellow-600 p-2 rounded-full" aria-label="Tutup"><X size={24}/></button>
// // //                             </div>
// // //                             <div className="flex-1 p-4 overflow-y-auto bg-yellow-50 space-y-3">
// // //                                 {recentCompletions.length > 0 ? recentCompletions.map((rc:any, i:number) => (
// // //                                     <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
// // //                                         <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold"><Award size={20}/></div>
// // //                                         <div><p className="font-bold text-gray-800">{rc.name}</p><p className="text-xs text-gray-500">Menyelesaikan {rc.module} pada {rc.date || 'Hari ini'}</p></div>
// // //                                     </div>
// // //                                 )) : <div className="text-center text-gray-400 mt-10">Belum ada data kelulusan.</div>}
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 )}
// // //                 {showStudentDetailModal && studentDetail && (
// // //                     <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
// // //                         <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// // //                             <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
// // //                                 <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">{studentDetail.name?.charAt(0)}</div><div><h3 className="font-bold text-lg">{studentDetail.name}</h3><p className="text-xs opacity-80">{studentDetail.email}</p></div></div>
// // //                                 <button type="button" onClick={() => setShowStudentDetailModal(false)} className="hover:bg-indigo-700 p-2 rounded-full" aria-label="Tutup"><X size={24}/></button>
// // //                             </div>
// // //                             <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
// // //                                 <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><FileText size={18}/> Riwayat Pengerjaan & Upload</h4>
// // //                                 <div className="space-y-4">
// // //                                     <div className="p-4 bg-white border rounded-xl shadow-sm"><p className="text-sm font-bold text-gray-800 mb-2">Tugas Upload: Modul 1</p><a href="#" className="text-blue-600 text-xs hover:underline flex items-center gap-1"><Download size={12}/> Download File Tugas</a></div>
// // //                                     <div className="p-4 bg-white border rounded-xl shadow-sm"><p className="text-sm font-bold text-gray-800 mb-2">Esai: Modul 2</p><p className="text-xs text-gray-600 italic">"Jawaban siswa akan muncul di sini..."</p></div>
// // //                                     <p className="text-center text-gray-400 text-xs mt-4">Fitur review detail sedang dalam pengembangan backend.</p>
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 )}
// // //                 {showParticipantModal && (
// // //                     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
// // //                         <div className="bg-white w-full max-w-6xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
// // //                             <div className="p-6 border-b flex justify-between items-center bg-gray-50">
// // //                                 <div><h2 className="text-xl font-bold text-gray-800">Manajemen Peserta</h2><p className="text-xs text-gray-500">Kelola kelulusan dan reset kuis.</p></div>
// // //                                 <button type="button" onClick={() => setShowParticipantModal(false)} className="bg-white p-2 rounded-full shadow hover:bg-gray-100" aria-label="Tutup Modal" title="Tutup"><X size={20}/></button>
// // //                             </div>
                           
// // //                             <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex flex-wrap gap-4 items-center justify-between">
// // //                                 <div className="flex items-center gap-3">
// // //                                     <span className="text-xs font-bold text-indigo-800">🛠 Aksi Massal:</span>
// // //                                     <select className="p-2 border rounded-lg text-sm bg-white min-w-[250px]" value={selectedActionId} onChange={e=>setSelectedActionId(e.target.value)} aria-label="Pilih Materi Aksi" title="Pilih Materi Aksi">
// // //                                         <option value="">-- Pilih Materi / Kuis --</option>
// // //                                         {actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
// // //                                     </select>
// // //                                 </div>
// // //                                 <div className="relative">
// // //                                     <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // //                                     <input className="pl-10 pr-4 py-2 rounded-full border border-gray-300 text-sm w-64 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Cari peserta..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} aria-label="Cari Peserta" title="Cari Peserta" />
// // //                                 </div>
// // //                             </div>

// // //                             <div className="flex-1 overflow-y-auto p-0 bg-gray-50/50">
// // //                                 {loadingParticipants ? (<div className="flex justify-center items-center h-full text-gray-400">Memuat data...</div>) : participants.length === 0 ? (<div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2"><Users size={48} className="opacity-20"/><p>Belum ada peserta.</p></div>) : (
// // //                                     <table className="w-full text-left border-collapse">
// // //                                         <thead className="bg-gray-100 sticky top-0 z-10 text-xs font-bold text-gray-600"><tr className="border-b"><th className="p-4">Peserta</th><th className="p-4">Tanggal Gabung</th><th className="p-4 text-center">Progres</th><th className="p-4 text-center">Aksi Konteks</th><th className="p-4 text-center">Chat</th><th className="p-4 text-center">Detail</th><th className="p-4 text-center text-red-600">Hapus</th></tr></thead>
// // //                                         <tbody className="text-sm bg-white divide-y">
// // //                                             {participants.filter(p => (p.user?.name || p.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => {
// // //                                                 const userObj = p.user || p.student || p.participant || p;
// // //                                                 const enrollmentId = p._id; // Pastikan backend kirim _id Enrollment
// // //                                                 const name = userObj.name || 'Tanpa Nama';
// // //                                                 const email = userObj.email || '-';
// // //                                                 const dateRaw = p.joinedAt || p.createdAt || p.enrolledAt || userObj.joinedAt;
// // //                                                 const joinDate = dateRaw && !isNaN(new Date(dateRaw).getTime()) ? new Date(dateRaw).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';
// // //                                                 const selectedActionItem = actionOptions.find(o => o.id === selectedActionId);
// // //                                                 const isCompleted = selectedActionId && p.completedLessons?.includes(selectedActionId);

// // //                                                 return (
// // //                                                     <tr key={idx} className="hover:bg-blue-50 transition-colors">
// // //                                                         <td className="p-4 font-bold text-gray-800 flex items-center gap-3">
// // //                                                             <div className="relative">
// // //                                                                 {userObj.avatarUrl ? (<img src={getImageUrl(userObj.avatarUrl)} alt={name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />) : (<div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-200">{name.charAt(0).toUpperCase()}</div>)}
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <div>{name}</div>
// // //                                                                 <div className="text-[10px] text-gray-400 font-normal flex items-center gap-1"><Mail size={10}/> {email}</div>
// // //                                                             </div>
// // //                                                         </td>
// // //                                                         <td className="p-4 text-xs text-gray-500">{joinDate}</td>
// // //                                                         <td className="p-4 text-center">
// // //                                                             <div className="w-24 bg-gray-200 rounded-full h-2 mx-auto overflow-hidden">
// // //                                                                 <div className="bg-green-500 h-2 rounded-full" style={{width: `${p.progress || 0}%`}}></div>
// // //                                                             </div>
// // //                                                             <span className="text-[10px] text-gray-500 mt-1 block">{p.progress || 0}%</span>
// // //                                                         </td>
// // //                                                         <td className="p-4 text-center">
// // //                                                             {selectedActionItem ? (
// // //                                                                 <button 
// // //                                                                     type="button" 
// // //                                                                     onClick={() => handleParticipantAction(userObj._id, selectedActionItem.type === 'quiz' ? 'reset' : 'pass')} 
// // //                                                                     disabled={selectedActionItem.type !== 'quiz' && isCompleted} 
// // //                                                                     className={`px-3 py-1 rounded text-xs font-bold border transition-all flex items-center gap-1 mx-auto ${isCompleted ? 'bg-green-100 text-green-700 border-green-200 cursor-default' : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50'}`}
// // //                                                                     aria-label="Aksi Peserta"
// // //                                                                     title={selectedActionItem.type === 'quiz' ? 'Reset Kuis' : 'Luluskan Manual'}
// // //                                                                 >
// // //                                                                     {selectedActionItem.type === 'quiz' ? '↺ Reset' : (isCompleted ? '✓ Lulus' : '⚡ Luluskan')}
// // //                                                                 </button>
// // //                                                             ) : <span className="text-gray-300 text-xs">-</span>}
// // //                                                         </td>
// // //                                                         <td className="p-4 text-center"><button type="button" onClick={() => setChatTargetStudent({ name, email, _id: userObj._id })} className="p-2 rounded-full text-blue-500 hover:bg-blue-50 hover:scale-110 transition-all border border-transparent hover:border-blue-100" aria-label="Chat Peserta" title="Chat"><MessageSquare size={18}/></button></td>
// // //                                                         <td className="p-4 text-center"><button type="button" onClick={() => handleViewStudentDetail(userObj)} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-600" aria-label="Lihat Detail" title="Detail"><Eye size={18}/></button></td>
// // //                                                         <td className="p-4 text-center">
// // //                                                             <button 
// // //                                                                 type="button" 
// // //                                                                 onClick={() => handleRejectParticipant(enrollmentId, name)} 
// // //                                                                 className="p-2 rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
// // //                                                                 title="Tolak / Hapus Peserta"
// // //                                                                 aria-label="Tolak Peserta"
// // //                                                             >
// // //                                                                 <UserX size={18}/>
// // //                                                             </button>
// // //                                                         </td>
// // //                                                     </tr>
// // //                                                 );
// // //                                             })}
// // //                                         </tbody>
// // //                                     </table>
// // //                                 )}
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
// //     FileBadge, MapPin, UserCheck, Hash, Info, UserX
// // } from 'lucide-react';

// // import dynamic from 'next/dynamic';
// // import 'react-quill/dist/quill.snow.css'; 

// // const ReactQuill = dynamic(() => import('react-quill'), { 
// //     ssr: false,
// //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // });

// // // --- HELPER ---
// // const getRomanMonth = (date: Date) => {
// //     const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
// //     return romans[date.getMonth()];
// // };

// // const generateDefaultCertFormat = () => {
// //     const now = new Date();
// //     const dd = String(now.getDate()).padStart(2, '0');
// //     const mm = String(now.getMonth() + 1).padStart(2, '0');
// //     const yyyy = now.getFullYear();
// //     const roman = getRomanMonth(now);
// //     return `00{NO}/DIKLAT/${dd}.${mm}.${yyyy}/${roman}/${yyyy}`;
// // };

// // // --- CHAT MODAL (GLOBAL) ---
// // function RoomChatModal({ title, members, onClose }: any) { return <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"><div className="bg-white p-6 rounded-lg"><h3 className="font-bold mb-4">{title}</h3><button onClick={onClose} aria-label="Tutup Chat" title="Tutup">Tutup</button></div></div> }

// // // --- PERSONAL CHAT MODAL ---
// // function PersonalChatModal({ student, onClose }: any) {
// //     const [messages, setMessages] = useState<any[]>([]);
// //     const [newMessage, setNewMessage] = useState('');
// //     const [showEmoji, setShowEmoji] = useState(false);
// //     const messagesEndRef = useRef<HTMLDivElement>(null);
// //     const emojis = ["😀", "😂", "🥰", "😎", "🤔", "👍", "👎", "❤️", "🔥", "🎉", "📚", "✅", "💡", "🤝", "🙏", "💪"];

// //     useEffect(() => {
// //         if(student) loadHistory();
// //         const interval = setInterval(() => { if(student) loadHistory(); }, 3000);
// //         return () => clearInterval(interval);
// //     }, [student]);

// //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

// //     const loadHistory = async () => {
// //         try {
// //             const targetUserId = student.user?._id || student._id;
// //             const res = await api(`/api/chat/${targetUserId}`);
// //             setMessages(res.messages || []);
// //         } catch (e) { console.error(e); }
// //     };

// //     const handleSend = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!newMessage.trim()) return;
        
// //         const tempMsg = { _id: Date.now(), sender: 'me', message: newMessage, createdAt: new Date().toISOString() };
// //         setMessages(prev => [...prev, tempMsg]);
// //         const msgToSend = newMessage;
// //         setNewMessage('');
// //         setShowEmoji(false);

// //         try {
// //             const targetUserId = student.user?._id || student._id;
// //             await api('/api/chat/send', { 
// //                 method: 'POST', 
// //                 body: { recipientId: targetUserId, message: msgToSend } 
// //             });
// //             loadHistory();
// //         } catch (error: any) { alert("Gagal kirim pesan: " + error.message); }
// //     };

// //     return (
// //         <div className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-4">
// //             <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
// //                 <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
// //                     <div className="flex items-center gap-3">
// //                         <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold border-2 border-white/30">
// //                             {(student.name || student.user?.name || 'U').charAt(0)}
// //                         </div>
// //                         <div>
// //                             <h3 className="font-bold text-sm leading-tight">{student.name || student.user?.name}</h3>
// //                             <p className="text-[10px] opacity-80">{student.email || student.user?.email}</p>
// //                         </div>
// //                     </div>
// //                     <button type="button" onClick={onClose} className="hover:bg-blue-700 p-2 rounded-full font-bold" aria-label="Tutup Chat" title="Tutup Chat"><X size={18}/></button>
// //                 </div>
                
// //                 <div className="flex-1 p-4 bg-gray-100 overflow-y-auto flex flex-col gap-3 relative">
// //                     {messages.length === 0 && <div className="text-center text-gray-400 text-xs mt-10">Belum ada pesan. Mulai percakapan!</div>}
// //                     {messages.map((msg: any, idx: number) => (
// //                         <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
// //                             <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${msg.sender === 'me' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800'}`}>
// //                                 <p>{msg.message}</p>
// //                             </div>
// //                         </div>
// //                     ))}
// //                     <div ref={messagesEndRef}/>
// //                     {showEmoji && (
// //                         <div className="absolute bottom-2 left-2 bg-white border shadow-xl rounded-xl p-3 grid grid-cols-4 gap-2 z-20 w-64 animate-in zoom-in-95">
// //                             {emojis.map(e => (<button type="button" key={e} onClick={() => { setNewMessage(prev => prev + e); }} className="text-2xl hover:bg-gray-100 p-2 rounded transition">{e}</button>))}
// //                         </div>
// //                     )}
// //                 </div>

// //                 <div className="p-3 bg-white border-t flex gap-2 items-center relative">
// //                     <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="text-gray-400 hover:text-yellow-500 transition-colors" aria-label="Pilih Emoticon" title="Emoticon"><Smile size={24}/></button>
// //                     <form onSubmit={handleSend} className="flex-1 flex gap-2">
// //                         <input className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis pesan..." value={newMessage} onChange={e => setNewMessage(e.target.value)} aria-label="Input Pesan" />
// //                         <button type="submit" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700" aria-label="Kirim Pesan" title="Kirim"><Send size={18}/></button>
// //                     </form>
// //                 </div>
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

// //     const [course, setCourse] = useState<any>(null);
// //     const [loading, setLoading] = useState(true);
// //     const [isBrowser, setIsBrowser] = useState(false);
// //     const [isUploadingCover, setIsUploadingCover] = useState(false);
// //     const [notification, setNotification] = useState<string | null>(null);

// //     // Modal States
// //     const [showParticipantModal, setShowParticipantModal] = useState(false);
// //     const [showParticipantChat, setShowParticipantChat] = useState(false);
// //     const [showTeamChat, setShowTeamChat] = useState(false);
// //     const [showPreviewModal, setShowPreviewModal] = useState(false);
// //     const [showWallOfFameModal, setShowWallOfFameModal] = useState(false);
// //     const [showStudentDetailModal, setShowStudentDetailModal] = useState(false); 
// //     const [studentDetail, setStudentDetail] = useState<any>(null);
   
// //     const [participants, setParticipants] = useState<any[]>([]); 
// //     const [loadingParticipants, setLoadingParticipants] = useState(false);
// //     const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);
   
// //     const [chatMembers, setChatMembers] = useState<any[]>([]);
// //     const [teamMembers, setTeamMembers] = useState<any[]>([]);
// //     const [recentCompletions, setRecentCompletions] = useState<any[]>([]);

// //     const [participantFilter, setParticipantFilter] = useState('');
// //     const [actionOptions, setActionOptions] = useState<any[]>([]);
// //     const [selectedActionId, setSelectedActionId] = useState<string>('');

// //     const [facilitators, setFacilitators] = useState<any[]>([]);
// //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>([]);
// //     const [currentUserRole, setCurrentUserRole] = useState('');
// //     const [searchFacilitator, setSearchFacilitator] = useState('');
   
// //     // Content State
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

// //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// //     const [selectedFile, setSelectedFile] = useState<File | null>(null);
// //     const [uploading, setUploading] = useState(false);
// //     const [quizDuration, setQuizDuration] = useState(10);
// //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// //     const [pollQuestion, setPollQuestion] = useState('');
// //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
   
// //     // Essay State
// //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// //     const [useEssayTimer, setUseEssayTimer] = useState(false);

// //     const [competencies, setCompetencies] = useState<any[]>([]);
// //     const [includeCompetencies, setIncludeCompetencies] = useState(true);
// //     const [certConfig, setCertConfig] = useState<any>(null);
// //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// //     const [isSavingCert, setIsSavingCert] = useState(false);

// //     const activeTeam = facilitators.filter(f => selectedFacilitatorIds.includes(f._id));

// //     const quillModules = useMemo(() => ({
// //         toolbar: {
// //             container: [
// //                 [{ 'header': [1, 2, 3, false] }],
// //                 ['bold', 'italic', 'underline', 'strike', 'blockquote'],
// //                 [{'list': 'ordered'}, {'list': 'bullet'}],
// //                 ['link', 'image', 'video'], 
// //                 [{ 'color': [] }, { 'background': [] }],
// //                 ['clean']
// //             ]
// //         }
// //     }), []);

// //     useEffect(() => {
// //         setIsBrowser(true);
// //         if (typeof window !== 'undefined') {
// //             const userStr = localStorage.getItem('user');
// //             if (userStr) {
// //                 const user = JSON.parse(userStr);
// //                 setCurrentUserRole(user.role);
// //             }
// //             const savedToken = localStorage.getItem('google_class_token');
// //             if (savedToken) {
// //                 setGoogleToken(savedToken);
// //                 fetchClassroomCourses(savedToken);
// //             }
// //         }
// //         if (courseId) load();
// //     }, [courseId]);

// //     const load = async () => { 
// //         try {
// //             const data = await api(`/api/courses/${courseId}`);
// //             const courseData = data.course || data;
// //             setCourse(courseData);
            
// //             const opts: any[] = [];
// //             courseData.modules?.forEach((m: any) => {
// //                 m.lessons?.forEach((l: any) => {
// //                     let label = l.title;
// //                     if(l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
// //                     else if(l.type === 'essay') label = `📝 Esai: ${l.title}`;
// //                     else if(l.type === 'upload_doc') label = `📤 Upload: ${l.title}`;
// //                     else label = `📄 ${l.title}`;
// //                     opts.push({ id: l._id, label, type: l.type });
// //                 });
// //             });
// //             setActionOptions(opts);

// //             if (courseData.facilitatorIds) setSelectedFacilitatorIds(courseData.facilitatorIds.map((f: any) => (typeof f === 'object' && f !== null) ? f._id : f));
// //             if (courseData.competencies) setCompetencies(courseData.competencies);
// //             if (courseData.includeCompetenciesInCertificate !== undefined) setIncludeCompetencies(courseData.includeCompetenciesInCertificate);
// //             let config = courseData.certificateConfig || {};
// //             if (!config.certificateNumber) config = { ...config, certificateNumber: generateDefaultCertFormat() };
// //             setCertConfig(config);

// //             const userStr = localStorage.getItem('user');
// //             if (userStr) {
// //                 const usersRes = await api('/api/admin/users');
// //                 if (usersRes.users) {
// //                     const facs = usersRes.users.filter((u: any) => u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN');
// //                     setFacilitators(facs);
// //                     const team = facs.filter((u: any) => courseData.facilitatorIds?.some((f: any) => (f._id || f) === u._id) || u.role === 'SUPER_ADMIN');
// //                     setTeamMembers(team.map((t: any) => ({ ...t, role: 'Facilitator' })));
// //                 }
// //             }
// //             fetchParticipants();
// //         } catch (e) { console.error(e); } finally { setLoading(false); }
// //     };

// //     const fetchParticipants = async () => {
// //         setLoadingParticipants(true);
// //         try {
// //             const res = await api(`/api/courses/${courseId}/participants`);
// //             const parts = res.participants || res.data || [];
// //             setParticipants(parts);
            
// //             const chatList = parts.map((p: any) => {
// //                 const userObj = p.user || p.student || p;
// //                 return { name: userObj.name || 'User', avatarUrl: userObj.avatarUrl || userObj.image, role: 'Student', _id: userObj._id };
// //             });
// //             setChatMembers([...teamMembers, ...chatList]);
// //         } catch (error) { console.error("Gagal load peserta"); } finally { setLoadingParticipants(false); }
// //     };

// //     const handleRejectParticipant = async (enrollmentId: string, studentName: string) => {
// //         if (!confirm(`Apakah Anda yakin ingin MENOLAK/MENGHAPUS pendaftaran "${studentName}"?`)) return;
// //         try { await api(`/api/enrollments/${enrollmentId}`, { method: 'DELETE' }); alert(`Peserta ${studentName} berhasil dihapus.`); fetchParticipants(); } catch (e: any) { alert("Gagal: " + e.message); }
// //     };

// //     const getFacilitatorName = (data: any) => {
// //         if (!data) return null;
// //         if (typeof data === 'object' && data.name) return data.name;
// //         const found = facilitators.find(f => f._id === data || f.id === data);
// //         return found ? found.name : 'Unknown';
// //     };

// //     // ... (Handlers Standard - Tidak Diubah) ...
// //     const handleSaveModule = async () => { if (!modTitle.trim()) return alert("Judul wajib"); const safeFacilitatorId = modFacilitatorId || null; const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: safeFacilitatorId, jp: modJp, scheduleDate: modSchedule || null }; try { if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); resetModuleForm(); load(); } catch(e: any) { alert(e.message); } };
// //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
// //     const resetModuleForm = () => { setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false); };
// //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); setCourse((prev: any) => ({ ...prev, isPublished: newStatus })); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); load(); } } catch (e: any) { alert(e.message); } };
// //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); load(); } catch (e: any) { alert(e.message); } };
// //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } setCourse(newCourse); try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); } catch (err) { load(); } };
// //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); const res = await apiUpload(`/api/upload/course/${courseId}/cover`, formData); setCourse((prev: any) => ({ ...prev, thumbnailUrl: res.imageUrl || res.url })); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); };
// //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };
    
// //     // [FIX] VIEW DETAIL STUDENT
// //     const handleViewStudentDetail = (enrollment: any) => { 
// //         setStudentDetail(enrollment); 
// //         setShowStudentDetailModal(true); 
// //     };

// //     // [FIX] HANDLE PARTICIPANT ACTION (Sinkronisasi Progress)
// //     const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => { 
// //         if (!selectedActionId) return alert("Pilih Materi/Kuis di dropdown atas dulu!"); 
        
// //         // Cari Enrollment Object yang sesuai dengan ID Student
// //         const participantObj = participants.find(p => (p.user?._id === studentId) || (p.user === studentId));
// //         const realUserId = participantObj?.user?._id || participantObj?.user;

// //         if (action === 'pass') { 
// //             if(!confirm(`Luluskan peserta ini?`)) return; 
// //             try { 
// //                 await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId: realUserId, lessonId: selectedActionId, courseId } }); 
// //                 alert("Berhasil diluluskan!"); 
                
// //                 // [OPTIMISTIC UPDATE - Perhitungan Realtime]
// //                 setParticipants(prev => prev.map(p => {
// //                      const uId = p.user?._id || p.user;
// //                      if(uId === studentId || uId === realUserId) {
// //                          const currentCompleted = p.completedLessons || [];
// //                          if (!currentCompleted.includes(selectedActionId)) {
// //                              // Tambahkan ID materi ke list completed
// //                              return { ...p, completedLessons: [...currentCompleted, selectedActionId] };
// //                          }
// //                      }
// //                      return p;
// //                 }));

// //             } catch(e:any) { alert(e.message); } 
// //         }
// //         else if (action === 'reset') { 
// //             if(!confirm(`Reset progress?`)) return; 
// //             try { 
// //                 await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId: realUserId, quizId: selectedActionId } }); 
// //                 alert("Reset berhasil!"); 
// //                 fetchParticipants(); 
// //             } catch(e:any) { alert(e.message); } 
// //         }
// //     };
    
// //     // FORM LOGIC
// //     const resetLessonForm = () => { setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesIsMandatory(true); setLesContent(''); setSelectedFile(null); setLesJp(0); setLesFacilitatorId(''); setLesSchedule(''); setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(10); setPollQuestion(''); setPollOptions(['', '']); setSelectedClassroom(null); setEssayQuestions(['']); setUseEssayTimer(false); };
// //     const handleAddNewContent = (modId: string) => { resetLessonForm(); setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); };
// //     const handleSaveLesson = async (modId: string) => { if (!lesTitle.trim()) { alert("Judul wajib"); return; } let fileUrl = ''; if (selectedFile) { try { setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); const res = await apiUpload('/api/upload', fd); fileUrl = res.url || res.file?.url || res.imageUrl; } catch (err) { alert("Gagal upload"); return; } finally { setUploading(false); } } else if (editingLesId) { const mod = course?.modules.find((m: any) => m._id === modId); const les = mod?.lessons.find((l: any) => l._id === editingLesId); if (les) fileUrl = les.fileUrl; } const finalType = lesType; const safeFacilitatorId = lesFacilitatorId || null; const body: any = { title: lesTitle, type: finalType, isActive: true, isMandatory: lesIsMandatory, jp: lesJp, facilitatorId: safeFacilitatorId, scheduleDate: lesSchedule || null, questions: (lesType === 'quiz') ? questions : undefined, quizDuration: (lesType === 'quiz' || (lesType === 'essay' && useEssayTimer)) ? quizDuration : undefined, pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined, }; if (lesType === 'essay') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; } if(fileUrl) body.fileUrl = fileUrl; if(lesType === 'video_url') body.videoUrl = lesContent; else if(lesType === 'virtual_class') body.meetingLink = lesContent; else if(lesType === 'upload_doc' || lesType === 'lesson') body.content = lesContent; try { if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); resetLessonForm(); load(); } catch(e:any) { alert(e.message); } };
// //     const startEditLesson = (modId: string, les: any) => { setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title); if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { setLesType('essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); if(les.quizDuration) { setUseEssayTimer(true); setQuizDuration(les.quizDuration); } else { setUseEssayTimer(false); } } else { setLesType(les.type); } setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || '')); if (les.type === 'video_url') setLesContent(les.videoUrl||''); else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); else if (les.type !== 'essay') setLesContent(les.content||''); if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(les.quizDuration||10); } if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); } if (les.type === 'google_classroom') { if(googleToken && classroomCourses.length === 0) fetchClassroomCourses(); if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); } setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150); };
// //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); load(); };
// //     const addPollOption = () => setPollOptions([...pollOptions, '']); const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); };
// //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); };
// //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); const updateEssay = (idx: number, val: string) => { const newQ = [...essayQuestions]; newQ[idx] = val; setEssayQuestions(newQ); }; const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };
// //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); const width = 500, height = 600; const left = (window.screen.width - width) / 2; const top = (window.screen.height - height) / 2; window.open(url, 'GoogleAuthPopup', `width=${width},height=${height},top=${top},left=${left}`); } catch (e) { alert("Gagal Auth Google"); } };
// //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } };
// //     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const res = await fetch(`http://localhost:4000/api/classroom/courses`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'x-google-token': token } }); if (res.status === 401) { localStorage.removeItem('google_class_token'); setGoogleToken(null); return; } const data = await res.json(); if (data.courses) setClassroomCourses(data.courses); } catch (e) { console.error(e); } finally { setIsCheckingGoogle(false); } };

// //     if (loading || !isBrowser) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div></div>;

// //     return (
// //         <Protected roles={["FACILITATOR", "SUPER_ADMIN"]}>
// //             <div className="max-w-6xl mx-auto p-6 space-y-12 pb-32 relative">
// //                 {/* HEADER & GRID ATAS (SAMA PERSIS) */}
// //                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 gap-4">
// //                     <div className="flex-1"><h1 className="text-3xl font-bold text-gray-800">{course?.title}</h1><div className="flex gap-2 items-center mt-2"><button type="button" onClick={() => toggleStatus()} className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer border transition-colors ${course?.isPublished ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`} aria-label="Toggle Publish" title="Ubah Status Publikasi">{course?.isPublished ? 'PUBLISHED' : 'DRAFT'}</button><span className="text-xs text-gray-500 font-medium">{course?.modules?.length || 0} Modul • {course?.modules?.reduce((acc: number, m: any) => acc + m.lessons.length, 0) || 0} Materi</span></div></div>
// //                     <button type="button" onClick={() => router.push('/admin/courses')} className="text-sm font-bold text-gray-500 hover:text-gray-800 px-4 py-2 border rounded-lg hover:bg-gray-50" aria-label="Kembali" title="Kembali">← Kembali</button>
// //                 </div>
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                     <div className="md:col-span-1 space-y-6">
// //                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">{course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Upload Cover" title="Ganti Sampul">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Input Cover" /></div></div>
// //                         {currentUserRole === 'SUPER_ADMIN' && (<div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col"><div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" title="Simpan Tim" aria-label="Simpan Tim">Simpan</button></div><div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">{facilitators.map((user: any) => (<label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}><input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih fasilitator ${user.name}`} title={`Pilih ${user.name}`} /><div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div></label>))}</div><input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" title="Cari Fasilitator" /></div>)}
// //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-6 overflow-hidden"><h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 text-yellow-600 cursor-pointer" onClick={() => setShowWallOfFameModal(true)}><Trophy size={18}/> Wall of Fame (Klik)</h3><div className="space-y-2">{recentCompletions.length > 0 ? recentCompletions.slice(0,3).map((rc:any, i:number) => (<div key={i} className="flex items-center gap-2 p-2 bg-yellow-50 rounded border border-yellow-100 text-xs"><Award size={12} className="text-yellow-600"/> <span>{rc.name}</span></div>)) : <span className="text-xs text-gray-400">Belum ada data.</span>}</div></div>
// //                     </div>
// //                     {/* KANAN (MODUL) */}
// //                     <section className="md:col-span-2 space-y-6">
// //                         <div className="flex justify-between items-center"><h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">📚 Modul & Materi</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-red-700 text-white px-5 py-2 rounded-xl font-bold shadow-lg hover:bg-red-800 flex items-center gap-2" aria-label="Tambah Modul" title="Tambah Modul">+ Tambah Modul</button></div>
// //                         {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul" title="Nama Modul" /><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" min="0" aria-label="JP" title="Jam Pelajaran" /></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih Fasilitator" title="Pilih Fasilitator"><option value="">-- Pilih Fasilitator dari Tim --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal Pelaksanaan Modul" /></div></div><label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={modIsMandatory} onChange={e => setModIsMandatory(e.target.checked)} className="w-4 h-4 text-red-600 rounded" aria-label="Wajib" title="Wajib" /><span>Wajib diselesaikan?</span></label><div className="flex gap-2 justify-end pt-2"><button type="button" onClick={resetModuleForm} className="text-gray-500 font-bold px-3 text-sm" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700" aria-label="Simpan">Simpan</button></div></form>)}
// //                         <DragDropContext onDragEnd={onDragEnd}><Droppable droppableId="all-modules" type="module">{(provided) => (<div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">{course?.modules?.map((m: any, idx: number) => (<Draggable key={m._id} draggableId={m._id} index={idx}>{(provided) => (<div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-2xl overflow-hidden shadow-sm bg-white"><div className="bg-gray-100 p-4 flex justify-between items-center" {...provided.dragHandleProps}><div className="flex items-center gap-3"><span className="cursor-grab text-gray-400 text-xl" aria-label="Geser Modul">☰</span><span className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{idx+1}</span><div><div className="flex items-center gap-2"><h3 className="font-bold text-gray-800">{m.title}</h3>{m.jp > 0 && <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded border border-blue-200">{m.jp} JP</span>}</div><div className="flex items-center gap-2 mt-1"><span className={`text-[10px] font-bold px-2 py-0.5 rounded ${m.isMandatory ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-600'}`}>{m.isMandatory ? 'WAJIB' : 'OPSIONAL'}</span>{m.facilitatorId && <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded flex items-center gap-1">👤 {getFacilitatorName(m.facilitatorId)}</span>}{m.scheduleDate && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1"><Calendar size={10}/> {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}</div></div></div><div className="flex items-center gap-2"><button type="button" onClick={() => startEditModule(m)} className="text-blue-600 font-bold text-xs px-2" aria-label="Edit Modul">Edit</button><button type="button" onClick={() => toggleStatus(m._id)} className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${m.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`} aria-label="Toggle Status Modul">{m.isActive ? 'ON' : 'OFF'}</button></div></div><Droppable droppableId={m._id} type="lesson">{(provided) => (<div ref={provided.innerRef} {...provided.droppableProps} className="p-4 space-y-3 min-h-[50px]">{m.lessons?.map((l: any, lIdx: number) => (<Draggable key={l._id} draggableId={l._id} index={lIdx}>{(provided) => (<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-3 bg-white border rounded-xl hover:shadow-md transition-shadow"><div className="flex items-center gap-3"><span className="cursor-grab text-gray-300" aria-label="Geser Lesson">::</span><span className="text-xl">{l.type === 'virtual_class' ? '🎥' : l.type === 'google_classroom' ? '🏫' : l.type === 'video_url' ? '🎞️' : l.type === 'quiz' ? '📝' : l.type === 'poll' ? '📊' : l.type === 'upload_doc' ? '📤' : l.type === 'image' ? '🖼️' : '📄'}</span><div><p className="text-sm font-bold text-gray-800">{l.title}</p><div className="flex gap-2 items-center mt-0.5">{l.jp > 0 && <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 rounded border border-blue-100">{l.jp} JP</span>}{l.scheduleDate && <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-1.5 rounded border border-purple-100 flex items-center gap-1"><Calendar size={10}/> {new Date(l.scheduleDate).toLocaleDateString('id-ID')}</span>}{(l.facilitatorId || l.facilitator) && (<span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">👤 {getFacilitatorName(l.facilitatorId || l.facilitator)}</span>)}</div></div></div><div className="flex items-center gap-2"><button type="button" onClick={() => startEditLesson(m._id, l)} className="text-blue-500 p-1" aria-label="Edit Lesson">✎</button><button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`px-2 py-1 rounded text-[10px] font-bold border ${l.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`} aria-label="Toggle Status Lesson">{l.isActive ? 'ON' : 'OFF'}</button><button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-gray-300 hover:text-red-500" aria-label="Hapus Lesson">🗑️</button></div></div>)}</Draggable>))}{provided.placeholder}{activeModId === m._id ? (<div id={`form-${m._id}`} className="bg-blue-50 p-5 rounded-xl border border-blue-200 space-y-4"><div className="grid grid-cols-12 gap-3"><div className="col-span-4"><select className="w-full p-2 border rounded-lg text-sm" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Pilih Tipe Konten"><option value="lesson">📄 Materi Teks</option><option value="essay">📝 Esai</option><option value="slide">🖥️ Slide Presentasi</option><option value="image">🖼️ Upload Gambar</option><option value="download_doc">📥 Upload Dokumen</option><option value="upload_doc">📤 Tugas Upload</option><option value="quiz">📝 Kuis</option><option value="poll">📊 Polling</option><option value="video_url">🎞️ Video URL (YouTube)</option><option value="virtual_class">🎥 Kelas Virtual (Zoom/Teams)</option><option value="google_classroom">🏫 Google Classroom</option></select></div><div className="col-span-6"><input className="w-full p-2 border rounded-lg text-sm" placeholder="Judul..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Lesson" /></div><div className="col-span-2"><input type="number" className="w-full p-2 border rounded-lg text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="Jam Pelajaran Lesson" /></div></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500 block mb-1">Fasilitator Pengampu</label><select value={lesFacilitatorId} onChange={e => setLesFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm" aria-label="Pilih Fasilitator" title="Pilih Fasilitator"><option value="">-- Sama dengan Modul ({getFacilitatorName(m.facilitatorId)}) --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full border p-2 rounded text-sm" value={lesSchedule} onChange={e => setLesSchedule(e.target.value)} aria-label="Tanggal Materi" title="Tanggal Materi" /></div></div><label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e => setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib" title="Wajib" /><span>Materi ini wajib diselesaikan?</span></label>{lesType === 'essay' && (<div className="space-y-4 bg-white p-4 rounded border border-blue-100"><label className="block text-xs font-bold text-gray-500">Instruksi / Konteks Soal:</label><div className="bg-white rounded-lg overflow-hidden border border-gray-200"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-40 mb-12" placeholder="Tulis instruksi atau bacaan soal..." /></div><h4 className="text-sm font-bold text-gray-700 mt-4">Daftar Pertanyaan Esai:</h4>{essayQuestions.map((q, idx) => (<div key={idx} className="flex gap-2"><span className="text-sm font-bold text-gray-500 py-2">{idx + 1}.</span><textarea className="flex-1 p-2 border rounded text-sm h-20" placeholder="Tulis pertanyaan..." value={q} onChange={e => updateEssay(idx, e.target.value)} aria-label={`Pertanyaan Esai ${idx+1}`}/>{essayQuestions.length > 1 && (<button type="button" onClick={() => removeEssay(idx)} className="text-red-500 font-bold px-2 self-start mt-2" aria-label="Hapus Pertanyaan">✕</button>)}</div>))}<button type="button" onClick={addEssayRow} className="text-xs font-bold text-blue-600 flex items-center gap-1" aria-label="Tambah Pertanyaan"><Plus size={14}/> Tambah Pertanyaan</button><div className="flex items-center gap-2 mb-2 bg-amber-50 p-2 rounded border border-amber-100"><label className="text-xs font-bold text-amber-800 flex items-center gap-2"><Clock size={14}/> Durasi (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="p-1 border rounded w-20 text-sm" aria-label="Durasi Esai"/><label className="text-xs ml-4 flex items-center gap-1 cursor-pointer"><input type="checkbox" checked={useEssayTimer} onChange={e => setUseEssayTimer(e.target.checked)} aria-label="Gunakan Timer" /> Gunakan Timer</label></div></div>)}{lesType === 'virtual_class' && (<div className="bg-white p-4 rounded border border-blue-200 space-y-2"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><LinkIcon size={16}/> Link Meeting (Zoom/Teams/GMeet)</label><input type="url" className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://teams.microsoft.com/..." value={lesContent} onChange={e => setLesContent(e.target.value)} aria-label="Link Meeting" /></div>)}{lesType === 'video_url' && (<div className="bg-white p-3 rounded border border-gray-200"><label className="text-xs font-bold text-gray-600 flex items-center gap-2 mb-1"><Video size={16}/> Link Video (YouTube)</label><input className="w-full p-2 border rounded text-sm outline-none" placeholder="https://youtube.com/watch?v=..." value={lesContent} onChange={e => setLesContent(e.target.value)} aria-label="URL Video" /></div>)}{['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded-lg overflow-hidden border border-gray-200"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-64 mb-12" /></div>)}{['image','download_doc','slide'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Pilih File"/></div>)}{lesType === 'quiz' && (<div className="space-y-4 bg-white p-4 rounded border"><div className="flex items-center gap-2 mb-2 bg-amber-50 p-2 rounded border border-amber-100"><label className="text-xs font-bold text-amber-800">⏱ Durasi (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="p-1 border rounded w-20 text-sm" aria-label="Durasi Kuis"/></div>{questions.map((q, ix) => (<div key={ix} className="p-3 border rounded bg-gray-50 relative"><button type="button" onClick={() => removeQuestion(ix)} className="absolute top-2 right-2 text-red-500 text-xs font-bold hover:underline" aria-label="Hapus Soal">Hapus</button><input className="w-full mb-2 p-2 border rounded" placeholder={`Pertanyaan ${ix+1}`} value={q.question} onChange={e=>updateQuestion(ix,'question',e.target.value)} aria-label={`Pertanyaan ${ix+1}`} /><div className="grid grid-cols-2 gap-2">{q.options.map((o:string,oi:number)=><input key={oi} className={`w-full p-1 border ${q.correctIndex===oi?'bg-green-100 border-green-400':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix,'options',e.target.value,oi)} aria-label={`Opsi ${oi+1}`} />)}</div><div className="mt-2 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix,'correctIndex',Number(e.target.value))} className="border w-12 p-1 rounded" aria-label="Kunci Jawaban" /></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-200" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}{lesType === 'poll' && (<div className="space-y-4 bg-white p-4 rounded border border-blue-100"><input className="w-full p-2 border rounded text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} aria-label="Pertanyaan Polling" />{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2"><input className="flex-1 p-2 border rounded text-sm" placeholder={`Opsi ${idx + 1}`} value={opt} onChange={e => updatePollOption(idx, e.target.value)} aria-label={`Opsi ${idx+1}`} />{pollOptions.length > 2 && (<button type="button" onClick={() => removePollOption(idx)} className="text-red-500 font-bold px-2" aria-label="Hapus Opsi">✕</button>)}</div>))}<button type="button" onClick={addPollOption} className="text-xs font-bold text-blue-600" aria-label="Tambah Opsi">+ Tambah Opsi</button></div>)}{/* [RESTORED] GOOGLE CLASSROOM BUTTONS */}{lesType === 'google_classroom' && (<div className="bg-white p-4 rounded border border-green-200 space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Kelas" title="Refresh"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putuskan Akun" title="Putuskan"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google" title="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas" title="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas" title="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}</div>)}<div className="flex justify-end gap-2"><button type="button" onClick={resetLessonForm} className="px-3 py-1 text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-4 py-1 rounded text-xs font-bold" aria-label="Simpan">Simpan</button></div></div>) : (<button type="button" onClick={()=>{ handleAddNewContent(m._id) }} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-xs hover:border-blue-300 hover:text-blue-600 transition-colors" aria-label="Tambah Konten">+ Tambah Konten</button>)}</div>)}</Droppable></div>)}</Draggable>))}{provided.placeholder}</div>)}</Droppable></DragDropContext>
// //                     </section>
// //                 </div>

// //                 <div className="border-t-4 border-gray-100 pt-8"></div>
// //                 <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200"><div className="flex justify-between items-start mb-6"><h2 className="text-2xl font-bold text-gray-800">🎓 Pengaturan Sertifikat</h2><div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg text-xs font-medium border border-blue-200 max-w-md shadow-sm"><div className="flex gap-2 items-start"><Info size={16} className="shrink-0 mt-0.5"/><div><strong>Format Nomor Otomatis:</strong><br/>Gunakan placeholder <code>{'{NO}'}</code> agar nomor urut peserta terisi otomatis.<br/>Format Standard: <code>00{'{NO}'}/DIKLAT/02.01.2026/I/2026</code></div></div></div></div><CertificateConfigForm initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} />{certConfig && (<div className="mt-8 border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 shadow-sm"><div className="bg-gray-100 px-4 py-3 border-b flex items-center gap-2 font-bold text-gray-700 text-sm"><FileBadge size={16}/> Data Konfigurasi Tersimpan (Preview)</div><div className="p-4 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"><div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Hash size={12}/> Format Nomor</p><p className="font-mono bg-white border px-3 py-2 rounded text-gray-800 shadow-sm">{certConfig.certificateNumber || '-'}</p></div><div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar size={12}/> Tanggal Pelaksanaan</p><p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.executionDate ? new Date(certConfig.executionDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '-'}</p></div><div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MapPin size={12}/> Kota Penerbit</p><p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.city || '-'}</p></div><div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><UserCheck size={12}/> Penanda Tangan</p><p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.signatoryName} <span className="font-normal text-gray-500 text-xs block">({certConfig.signatoryPosition})</span></p></div></div></div>)}<div className="my-10 border-t border-gray-100"></div><CompetencyForm initialData={competencies} onChange={(data) => setCompetencies(data)} /><div className="mt-4 flex items-center gap-2 bg-gray-50 p-3 rounded-lg border"><input type="checkbox" id="includeComp" checked={includeCompetencies} onChange={(e) => setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Sertakan Kompetensi" /><label htmlFor="includeComp" className="text-sm font-bold text-gray-700 cursor-pointer">Tampilkan daftar kompetensi di halaman belakang sertifikat?</label></div><div className="mt-4 flex justify-end"><button type="button" onClick={handleSaveCompetencies} disabled={isSavingCompetencies} className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button></div></section>
// //                 <div className="mt-8 p-6 bg-gray-50 rounded-3xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3"><h3 className="text-lg font-bold text-gray-800">Selesai?</h3><button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Publish Course">{course?.isPublished ? 'Tarik Kembali ke Draft' : '🚀 PUBLISH SEKARANG'}</button></div>

// //                 {/* FLOATING DASHBOARD */}
// //                 <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
// //                     <button type="button" onClick={() => { setShowTeamChat(true); }} className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 hover:text-white border border-gray-200 transition-transform hover:scale-105 flex items-center gap-2 group relative" title="Chat Tim" aria-label="Chat Tim"><MessageSquare size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Diskusi Tim</span></button>
// //                     <button type="button" onClick={() => { setShowParticipantChat(true); fetchParticipants(); }} className="bg-emerald-600 text-white p-4 rounded-full shadow-xl hover:bg-emerald-700 flex items-center gap-2 transition-transform hover:scale-105 group relative" title="Chat Peserta" aria-label="Chat Peserta"><MessageCircle size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Chat Peserta</span></button>
// //                     <button type="button" onClick={() => setShowPreviewModal(true)} className="bg-white text-gray-700 p-4 rounded-full shadow-xl hover:bg-gray-50 border border-gray-200 transition-transform hover:scale-105 flex items-center gap-2 group relative" title="Preview" aria-label="Preview Kelas"><Eye size={24} className="text-purple-600"/><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Preview Kelas</span></button>
// //                     <button type="button" onClick={() => { setShowParticipantModal(true); fetchParticipants(); }} className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 flex items-center gap-2 transition-transform hover:scale-105 group relative" aria-label="Manajemen Peserta" title="Manajemen Peserta"><Users size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Manajemen Peserta</span></button>
// //                 </div>

// //                 {/* MODALS */}
// //                 {showPreviewModal && (<div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200"><div className="bg-white w-[95vw] h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"><div className="bg-gray-900 text-white p-3 flex justify-between items-center px-6"><h3 className="font-bold flex items-center gap-2"><Eye size={18}/> Preview Mode</h3><div className="flex gap-3"><button type="button" onClick={() => window.open(`/courses/${courseId}`, '_blank', 'noopener,noreferrer')} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded flex items-center gap-1 transition-colors" aria-label="Buka di Tab Baru"><ExternalLink size={14}/> Buka Tab Baru</button><button type="button" onClick={() => setShowPreviewModal(false)} className="text-gray-400 hover:text-white" aria-label="Tutup Preview"><X size={24}/></button></div></div><div className="flex-1 bg-gray-100"><iframe src={`/courses/${courseId}`} className="w-full h-full border-0" title="Course Preview" /></div></div></div>)}
// //                 {showParticipantChat && (<RoomChatModal title="Global Room (Peserta)" members={[...chatMembers, ...teamMembers]} onClose={() => setShowParticipantChat(false)} themeColor="bg-red-700" />)}
// //                 {showTeamChat && (<RoomChatModal title="Diskusi Tim Fasilitator" members={teamMembers} onClose={() => setShowTeamChat(false)} themeColor="bg-blue-600" />)}
                
// //                 {/* [FIX] Personal Chat Modal with Emoticon */}
// //                 {chatTargetStudent && <PersonalChatModal student={chatTargetStudent} onClose={() => setChatTargetStudent(null)} />}
                
// //                 {showWallOfFameModal && (<div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200"><div className="bg-white w-full max-w-lg h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"><div className="bg-yellow-500 p-4 text-white flex justify-between items-center shadow-md"><h3 className="font-bold text-lg flex items-center gap-2"><Trophy size={20}/> Wall of Fame History</h3><button type="button" onClick={() => setShowWallOfFameModal(false)} className="hover:bg-yellow-600 p-2 rounded-full" aria-label="Tutup"><X size={24}/></button></div><div className="flex-1 p-4 overflow-y-auto bg-yellow-50 space-y-3">{recentCompletions.length > 0 ? recentCompletions.map((rc:any, i:number) => (<div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-yellow-200 shadow-sm hover:shadow-md transition-shadow"><div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold"><Award size={20}/></div><div><p className="font-bold text-gray-800">{rc.name}</p><p className="text-xs text-gray-500">Menyelesaikan {rc.module} pada {rc.date || 'Hari ini'}</p></div></div>)) : <div className="text-center text-gray-400 mt-10">Belum ada data kelulusan.</div>}</div></div></div>)}
                
// //                 {/* [FIX] Detail Siswa Sinkron */}
// //                 {showStudentDetailModal && studentDetail && (
// //                     <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
// //                         <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
// //                             <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
// //                                 <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">{(studentDetail.user?.name || studentDetail.name || 'U').charAt(0)}</div><div><h3 className="font-bold text-lg">{studentDetail.user?.name || studentDetail.name}</h3><p className="text-xs opacity-80">{studentDetail.user?.email || studentDetail.email}</p></div></div>
// //                                 <button type="button" onClick={() => setShowStudentDetailModal(false)} className="hover:bg-indigo-700 p-2 rounded-full" aria-label="Tutup"><X size={24}/></button>
// //                             </div>
// //                             <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-6">
// //                                 {course?.modules?.map((m:any) => (
// //                                     <div key={m._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
// //                                         <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-bold text-gray-700 text-sm flex justify-between items-center">
// //                                             <span>{m.title}</span>
// //                                             <span className="text-[10px] bg-gray-200 px-2 py-1 rounded text-gray-500">{m.lessons.length} Materi</span>
// //                                         </div>
// //                                         <div className="divide-y divide-gray-100">
// //                                             {m.lessons.map((l:any) => {
// //                                                 const isDone = studentDetail.completedLessons?.includes(l._id);
// //                                                 return (
// //                                                     <div key={l._id} className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
// //                                                         <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center border ${isDone ? 'bg-green-500 border-green-500 text-white' : 'bg-gray-100 border-gray-300 text-transparent'}`}>
// //                                                             <CheckCircle2 size={12}/>
// //                                                         </div>
// //                                                         <div className="flex-1">
// //                                                             <p className="text-sm font-bold text-gray-800">{l.title}</p>
// //                                                             <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider">{l.type.replace('_',' ')}</p>
                                                            
// //                                                             {l.type === 'upload_doc' && isDone && (
// //                                                                 <div className="bg-blue-50 border border-blue-100 rounded p-2 flex items-center gap-2 text-xs text-blue-700 cursor-pointer hover:underline">
// //                                                                     <FileText size={14}/> <span>Lihat File Tugas</span>
// //                                                                 </div>
// //                                                             )}
// //                                                             {l.type === 'essay' && isDone && (
// //                                                                 <div className="bg-yellow-50 border border-yellow-100 rounded p-2 text-xs text-yellow-800 italic">
// //                                                                     "Jawaban esai tersimpan."
// //                                                                 </div>
// //                                                             )}
// //                                                             {l.type === 'quiz' && isDone && (
// //                                                                 <span className="text-xs font-bold text-green-600">Selesai (Skor: 100)</span>
// //                                                             )}
// //                                                         </div>
// //                                                     </div>
// //                                                 )
// //                                             })}
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}

// //                 {/* MODAL MANAJEMEN PESERTA UTAMA */}
// //                 {showParticipantModal && (
// //                     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
// //                         <div className="bg-white w-full max-w-6xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
// //                             <div className="p-6 border-b flex justify-between items-center bg-gray-50">
// //                                 <div><h2 className="text-xl font-bold text-gray-800">Manajemen Peserta</h2><p className="text-xs text-gray-500">Kelola kelulusan dan reset kuis.</p></div>
// //                                 <button type="button" onClick={() => setShowParticipantModal(false)} className="bg-white p-2 rounded-full shadow hover:bg-gray-100" aria-label="Tutup Modal" title="Tutup"><X size={20}/></button>
// //                             </div>
                           
// //                             <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex flex-wrap gap-4 items-center justify-between">
// //                                 <div className="flex items-center gap-3">
// //                                     <span className="text-xs font-bold text-indigo-800">🛠 Aksi Massal:</span>
// //                                     <select className="p-2 border rounded-lg text-sm bg-white min-w-[250px]" value={selectedActionId} onChange={e=>setSelectedActionId(e.target.value)} aria-label="Pilih Materi Aksi" title="Pilih Materi Aksi"><option value="">-- Pilih Materi / Kuis --</option>{actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}</select>
// //                                 </div>
// //                                 <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input className="pl-10 pr-4 py-2 rounded-full border border-gray-300 text-sm w-64 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Cari peserta..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} aria-label="Cari Peserta" title="Cari Peserta" /></div>
// //                             </div>

// //                             <div className="flex-1 overflow-y-auto p-0 bg-gray-50/50">
// //                                 {loadingParticipants ? (<div className="flex justify-center items-center h-full text-gray-400">Memuat data...</div>) : participants.length === 0 ? (<div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2"><Users size={48} className="opacity-20"/><p>Belum ada peserta.</p></div>) : (
// //                                     <table className="w-full text-left border-collapse">
// //                                         <thead className="bg-gray-100 sticky top-0 z-10 text-xs font-bold text-gray-600"><tr className="border-b"><th className="p-4">Peserta</th><th className="p-4">Tanggal Gabung</th><th className="p-4 text-center">Progres</th><th className="p-4 text-center">Aksi Konteks</th><th className="p-4 text-center">Chat</th><th className="p-4 text-center">Detail</th><th className="p-4 text-center text-red-600">Hapus</th></tr></thead>
// //                                         <tbody className="text-sm bg-white divide-y">
// //                                             {participants.filter(p => (p.user?.name || p.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => {
// //                                                 const userObj = p.user || p.student || p.participant || p;
// //                                                 const enrollmentId = p._id; 
// //                                                 const name = userObj.name || 'Tanpa Nama';
// //                                                 const email = userObj.email || '-';
// //                                                 const dateRaw = p.joinedAt || p.createdAt || p.enrolledAt || userObj.joinedAt;
// //                                                 const joinDate = dateRaw && !isNaN(new Date(dateRaw).getTime()) ? new Date(dateRaw).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';
// //                                                 const selectedActionItem = actionOptions.find(o => o.id === selectedActionId);
                                                
// //                                                 // [FIX] Update Real-time Status Lulus (Optimistic)
// //                                                 const isCompleted = selectedActionId && p.completedLessons?.includes(selectedActionId);

// //                                                 // [FIX] Hitung Progress Real
// //                                                 const totalLessons = course?.modules?.reduce((acc:any, m:any) => acc + m.lessons.length, 0) || 1;
// //                                                 const completedCount = p.completedLessons?.length || 0;
// //                                                 const realProgress = Math.round((completedCount / totalLessons) * 100);

// //                                                 return (
// //                                                     <tr key={idx} className="hover:bg-blue-50 transition-colors">
// //                                                         <td className="p-4 font-bold text-gray-800 flex items-center gap-3"><div className="relative">{userObj.avatarUrl ? (<img src={getImageUrl(userObj.avatarUrl)} alt={name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />) : (<div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-200">{name.charAt(0).toUpperCase()}</div>)}</div><div><div>{name}</div><div className="text-[10px] text-gray-400 font-normal flex items-center gap-1"><Mail size={10}/> {email}</div></div></td>
// //                                                         <td className="p-4 text-xs text-gray-500">{joinDate}</td>
// //                                                         <td className="p-4 text-center">
// //                                                             {/* [FIX] Progress Bar Updated */}
// //                                                             <div className="w-24 bg-gray-200 rounded-full h-2 mx-auto overflow-hidden"><div className="bg-green-500 h-2 rounded-full" style={{width: `${realProgress}%`}}></div></div><span className="text-[10px] text-gray-500 mt-1 block">{realProgress}%</span>
// //                                                         </td>
// //                                                         <td className="p-4 text-center">
// //                                                             {selectedActionItem ? (
// //                                                                 <button type="button" onClick={() => handleParticipantAction(userObj._id, selectedActionItem.type === 'quiz' ? 'reset' : 'pass')} disabled={selectedActionItem.type !== 'quiz' && isCompleted} className={`px-3 py-1 rounded text-xs font-bold border transition-all flex items-center gap-1 mx-auto ${isCompleted ? 'bg-green-100 text-green-700 border-green-200 cursor-default' : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50'}`} aria-label="Aksi Peserta" title={selectedActionItem.type === 'quiz' ? 'Reset Kuis' : 'Luluskan Manual'}>{selectedActionItem.type === 'quiz' ? '↺ Reset' : (isCompleted ? '✓ Lulus' : '⚡ Luluskan')}</button>
// //                                                             ) : <span className="text-gray-300 text-xs">-</span>}
// //                                                         </td>
// //                                                         <td className="p-4 text-center"><button type="button" onClick={() => setChatTargetStudent(p)} className="p-2 rounded-full text-blue-500 hover:bg-blue-50 hover:scale-110 transition-all border border-transparent hover:border-blue-100" aria-label="Chat Peserta" title="Chat"><MessageSquare size={18}/></button></td>
// //                                                         <td className="p-4 text-center"><button type="button" onClick={() => handleViewStudentDetail(p)} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-600" aria-label="Lihat Detail" title="Detail"><Eye size={18}/></button></td>
// //                                                         <td className="p-4 text-center"><button type="button" onClick={() => handleRejectParticipant(enrollmentId, name)} className="p-2 rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Tolak / Hapus Peserta" aria-label="Tolak Peserta"><UserX size={18}/></button></td>
// //                                                     </tr>
// //                                                 );
// //                                             })}
// //                                         </tbody>
// //                                     </table>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </Protected>
// //     );
// // }
// 'use client';

// import { useEffect, useState, useRef, useMemo } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// import { api, apiUpload, getImageUrl } from '@/lib/api';
// import Protected from '@/components/Protected';
// import CompetencyForm from '@/components/admin/CompetencyForm';
// import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// import {
//     Calendar, School, RefreshCw, LogOut, CheckCircle2, Video,
//     Link as LinkIcon, Users, Eye, MessageSquare, MessageCircle, X, Send, MoreHorizontal, ExternalLink,
//     Search, User as UserIcon, Mail, Smile, Trophy, Award, Plus, Trash2, Clock, Paperclip, FileText, Download,
//     FileBadge, MapPin, UserCheck, Hash, Info, UserX
// } from 'lucide-react';

// import dynamic from 'next/dynamic';
// import 'react-quill/dist/quill.snow.css'; 

// const ReactQuill = dynamic(() => import('react-quill'), { 
//     ssr: false,
//     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// });

// // --- HELPER ---
// const getRomanMonth = (date: Date) => {
//     const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
//     return romans[date.getMonth()];
// };

// const generateDefaultCertFormat = () => {
//     const now = new Date();
//     const dd = String(now.getDate()).padStart(2, '0');
//     const mm = String(now.getMonth() + 1).padStart(2, '0');
//     const yyyy = now.getFullYear();
//     const roman = getRomanMonth(now);
//     return `00{NO}/DIKLAT/${dd}.${mm}.${yyyy}/${roman}/${yyyy}`;
// };

// // --- CHAT MODAL (GLOBAL & TIM) ---
// function RoomChatModal({ title, members, onClose }: any) { return <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"><div className="bg-white p-6 rounded-lg"><h3 className="font-bold mb-4">{title}</h3><button onClick={onClose} aria-label="Tutup Chat">Tutup</button></div></div> }

// // --- [FIX] PERSONAL CHAT MODAL DENGAN EMOTICON ---
// function PersonalChatModal({ student, onClose }: any) {
//     const [messages, setMessages] = useState<any[]>([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [showEmoji, setShowEmoji] = useState(false);
//     const messagesEndRef = useRef<HTMLDivElement>(null);
//     const emojis = ["😀", "😂", "🥰", "😎", "🤔", "👍", "👎", "❤️", "🔥", "🎉", "📚", "✅", "💡", "🤝", "🙏", "💪"];

//     // Pastikan ID User benar (bisa dari object enrollment atau user langsung)
//     const targetId = student.user?._id || student._id;
//     const targetName = student.user?.name || student.name;
//     const targetAvatar = student.user?.avatarUrl || student.avatarUrl;
//     const targetEmail = student.user?.email || student.email;

//     useEffect(() => {
//         if(targetId) loadHistory();
//         const interval = setInterval(() => { if(targetId) loadHistory(); }, 3000);
//         return () => clearInterval(interval);
//     }, [targetId]);

//     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

//     const loadHistory = async () => {
//         try {
//             const res = await api(`/api/chat/${targetId}`);
//             setMessages(res.messages || []);
//         } catch (e) { console.error(e); }
//     };

//     const handleSend = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!newMessage.trim()) return;
        
//         const tempMsg = { _id: Date.now(), sender: 'me', message: newMessage, createdAt: new Date().toISOString() };
//         setMessages(prev => [...prev, tempMsg]);
//         const msgToSend = newMessage;
//         setNewMessage('');
//         setShowEmoji(false);

//         try {
//             await api('/api/chat/send', { 
//                 method: 'POST', 
//                 body: { recipientId: targetId, message: msgToSend } 
//             });
//             loadHistory();
//         } catch (error: any) { alert("Gagal kirim pesan: " + error.message); }
//     };

//     return (
//         <div className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-4">
//             <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
//                 <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
//                     <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold border-2 border-white/30 overflow-hidden">
//                             {targetAvatar ? <img src={getImageUrl(targetAvatar)} alt={targetName} className="w-full h-full object-cover"/> : (targetName?.charAt(0) || 'U')}
//                         </div>
//                         <div>
//                             <h3 className="font-bold text-sm leading-tight">{targetName}</h3>
//                             <p className="text-[10px] opacity-80">{targetEmail}</p>
//                         </div>
//                     </div>
//                     <button type="button" onClick={onClose} className="hover:bg-blue-700 p-2 rounded-full font-bold" aria-label="Tutup Chat" title="Tutup Chat"><X size={18}/></button>
//                 </div>
                
//                 <div className="flex-1 p-4 bg-gray-100 overflow-y-auto flex flex-col gap-3 relative">
//                     {messages.length === 0 && <div className="text-center text-gray-400 text-xs mt-10">Belum ada pesan. Mulai percakapan!</div>}
//                     {messages.map((msg: any, idx: number) => (
//                         <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
//                             <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${msg.sender === 'me' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800'}`}>
//                                 <p>{msg.message}</p>
//                             </div>
//                         </div>
//                     ))}
//                     <div ref={messagesEndRef}/>
                    
//                     {/* Emoticon Picker */}
//                     {showEmoji && (
//                         <div className="absolute bottom-2 left-2 bg-white border shadow-xl rounded-xl p-3 grid grid-cols-4 gap-2 z-20 w-64 animate-in zoom-in-95">
//                             {emojis.map(e => (
//                                 <button type="button" key={e} onClick={() => { setNewMessage(prev => prev + e); }} className="text-2xl hover:bg-gray-100 p-2 rounded transition">{e}</button>
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 <div className="p-3 bg-white border-t flex gap-2 items-center relative">
//                     <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="text-gray-400 hover:text-yellow-500 transition-colors" aria-label="Pilih Emoticon" title="Emoticon"><Smile size={24}/></button>
//                     <form onSubmit={handleSend} className="flex-1 flex gap-2">
//                         <input 
//                             className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" 
//                             placeholder="Tulis pesan..." 
//                             value={newMessage} 
//                             onChange={e => setNewMessage(e.target.value)} 
//                             aria-label="Input Pesan"
//                         />
//                         <button type="submit" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700" aria-label="Kirim Pesan" title="Kirim"><Send size={18}/></button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // --- MAIN PAGE ---
// export default function AdminCourseDetailPage() {
//     const params = useParams();
//     const courseId = params?.id as string;
//     const router = useRouter();
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const [course, setCourse] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const [isBrowser, setIsBrowser] = useState(false);
//     const [isUploadingCover, setIsUploadingCover] = useState(false);
//     const [notification, setNotification] = useState<string | null>(null);

//     // Modal States
//     const [showParticipantModal, setShowParticipantModal] = useState(false);
//     const [showParticipantChat, setShowParticipantChat] = useState(false);
//     const [showTeamChat, setShowTeamChat] = useState(false);
//     const [showPreviewModal, setShowPreviewModal] = useState(false);
//     const [showWallOfFameModal, setShowWallOfFameModal] = useState(false);
//     const [showStudentDetailModal, setShowStudentDetailModal] = useState(false); 
//     const [studentDetail, setStudentDetail] = useState<any>(null);
   
//     const [participants, setParticipants] = useState<any[]>([]); // Enrollment Data
//     const [loadingParticipants, setLoadingParticipants] = useState(false);
//     const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);
   
//     const [chatMembers, setChatMembers] = useState<any[]>([]);
//     const [teamMembers, setTeamMembers] = useState<any[]>([]);
//     const [recentCompletions, setRecentCompletions] = useState<any[]>([]);

//     const [participantFilter, setParticipantFilter] = useState('');
//     const [actionOptions, setActionOptions] = useState<any[]>([]);
//     const [selectedActionId, setSelectedActionId] = useState<string>('');

//     const [facilitators, setFacilitators] = useState<any[]>([]);
//     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>([]);
//     const [currentUserRole, setCurrentUserRole] = useState('');
//     const [searchFacilitator, setSearchFacilitator] = useState('');
   
//     // Content State
//     const [showModuleForm, setShowModuleForm] = useState(false);
//     const [modTitle, setModTitle] = useState('');
//     const [modIsMandatory, setModIsMandatory] = useState(true);
//     const [modFacilitatorId, setModFacilitatorId] = useState('');
//     const [modJp, setModJp] = useState(0);
//     const [modSchedule, setModSchedule] = useState('');
//     const [editingModId, setEditingModId] = useState<string | null>(null);
   
//     const [activeModId, setActiveModId] = useState<string | null>(null);
//     const [editingLesId, setEditingLesId] = useState<string | null>(null);
//     const [lesTitle, setLesTitle] = useState('');
//     const [lesType, setLesType] = useState('lesson');
//     const [lesContent, setLesContent] = useState('');
//     const [lesIsMandatory, setLesIsMandatory] = useState(true);
//     const [lesJp, setLesJp] = useState(0);
//     const [lesSchedule, setLesSchedule] = useState('');
//     const [lesFacilitatorId, setLesFacilitatorId] = useState('');

//     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
//     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
//     const [googleToken, setGoogleToken] = useState<string | null>(null);
//     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [uploading, setUploading] = useState(false);
//     const [quizDuration, setQuizDuration] = useState(10);
//     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
//     const [pollQuestion, setPollQuestion] = useState('');
//     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
   
//     // Essay State
//     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
//     const [useEssayTimer, setUseEssayTimer] = useState(false);

//     const [competencies, setCompetencies] = useState<any[]>([]);
//     const [includeCompetencies, setIncludeCompetencies] = useState(true);
//     const [certConfig, setCertConfig] = useState<any>(null);
//     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
//     const [isSavingCert, setIsSavingCert] = useState(false);

//     const activeTeam = facilitators.filter(f => selectedFacilitatorIds.includes(f._id));

//     const quillModules = useMemo(() => ({
//         toolbar: {
//             container: [
//                 [{ 'header': [1, 2, 3, false] }],
//                 ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//                 [{'list': 'ordered'}, {'list': 'bullet'}],
//                 ['link', 'image', 'video'], 
//                 [{ 'color': [] }, { 'background': [] }],
//                 ['clean']
//             ]
//         }
//     }), []);

//     useEffect(() => {
//         setIsBrowser(true);
//         if (typeof window !== 'undefined') {
//             const userStr = localStorage.getItem('user');
//             if (userStr) {
//                 const user = JSON.parse(userStr);
//                 setCurrentUserRole(user.role);
//             }
//             const savedToken = localStorage.getItem('google_class_token');
//             if (savedToken) {
//                 setGoogleToken(savedToken);
//                 fetchClassroomCourses(savedToken);
//             }
//         }
//         if (courseId) load();
//     }, [courseId]);

//     const load = async () => { 
//         try {
//             const data = await api(`/api/courses/${courseId}`);
//             const courseData = data.course || data;
//             setCourse(courseData);
            
//             const opts: any[] = [];
//             courseData.modules?.forEach((m: any) => {
//                 m.lessons?.forEach((l: any) => {
//                     let label = l.title;
//                     if(l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
//                     else if(l.type === 'essay') label = `📝 Esai: ${l.title}`;
//                     else if(l.type === 'upload_doc') label = `📤 Upload: ${l.title}`;
//                     else label = `📄 ${l.title}`;
//                     opts.push({ id: l._id, label, type: l.type });
//                 });
//             });
//             setActionOptions(opts);

//             if (courseData.facilitatorIds) setSelectedFacilitatorIds(courseData.facilitatorIds.map((f: any) => (typeof f === 'object' && f !== null) ? f._id : f));
//             if (courseData.competencies) setCompetencies(courseData.competencies);
//             if (courseData.includeCompetenciesInCertificate !== undefined) setIncludeCompetencies(courseData.includeCompetenciesInCertificate);
//             let config = courseData.certificateConfig || {};
//             if (!config.certificateNumber) config = { ...config, certificateNumber: generateDefaultCertFormat() };
//             setCertConfig(config);

//             const userStr = localStorage.getItem('user');
//             if (userStr) {
//                 const usersRes = await api('/api/admin/users');
//                 if (usersRes.users) {
//                     const facs = usersRes.users.filter((u: any) => u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN');
//                     setFacilitators(facs);
//                     const team = facs.filter((u: any) => courseData.facilitatorIds?.some((f: any) => (f._id || f) === u._id) || u.role === 'SUPER_ADMIN');
//                     setTeamMembers(team.map((t: any) => ({ ...t, role: 'Facilitator' })));
//                 }
//             }
//             fetchParticipants();
//         } catch (e) { console.error(e); } finally { setLoading(false); }
//     };

//     const fetchParticipants = async () => {
//         setLoadingParticipants(true);
//         try {
//             const res = await api(`/api/courses/${courseId}/participants`);
//             const parts = res.participants || res.data || [];
            
//             // [FIX] Ambil data enrollment yang lengkap (termasuk progress)
//             setParticipants(parts);
            
//             const chatList = parts.map((p: any) => {
//                 const userObj = p.user || p.student || p;
//                 return { name: userObj.name || 'User', avatarUrl: userObj.avatarUrl || userObj.image, role: 'Student', _id: userObj._id };
//             });
//             setChatMembers([...teamMembers, ...chatList]);
//         } catch (error) { console.error("Gagal load peserta"); } finally { setLoadingParticipants(false); }
//     };

//     const handleRejectParticipant = async (enrollmentId: string, studentName: string) => {
//         if (!confirm(`Apakah Anda yakin ingin MENOLAK/MENGHAPUS pendaftaran "${studentName}"?`)) return;
//         try { await api(`/api/enrollments/${enrollmentId}`, { method: 'DELETE' }); alert(`Peserta ${studentName} berhasil dihapus.`); fetchParticipants(); } catch (e: any) { alert("Gagal: " + e.message); }
//     };

//     const getFacilitatorName = (data: any) => {
//         if (!data) return null;
//         if (typeof data === 'object' && data.name) return data.name;
//         const found = facilitators.find(f => f._id === data || f.id === data);
//         return found ? found.name : 'Unknown';
//     };

//     const handleSaveModule = async () => { 
//         if (!modTitle.trim()) return alert("Judul wajib"); 
//         const safeFacilitatorId = modFacilitatorId || null;
//         const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: safeFacilitatorId, jp: modJp, scheduleDate: modSchedule || null }; 
//         try { if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); resetModuleForm(); load(); } catch(e: any) { alert(e.message); } 
//     };

//     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
//     const resetModuleForm = () => { setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false); };
//     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); setCourse((prev: any) => ({ ...prev, isPublished: newStatus })); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); load(); } } catch (e: any) { alert(e.message); } };
//     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); load(); } catch (e: any) { alert(e.message); } };
//     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } setCourse(newCourse); try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); } catch (err) { load(); } };
//     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); const res = await apiUpload(`/api/upload/course/${courseId}/cover`, formData); setCourse((prev: any) => ({ ...prev, thumbnailUrl: res.imageUrl || res.url })); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
//     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); };
//     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
//     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };
    
//     // [FIX 1] VIEW DETAIL STUDENT - SEKARANG DINAMIS (Icon Mata)
//     const handleViewStudentDetail = (enrollment: any) => { 
//         setStudentDetail(enrollment); 
//         setShowStudentDetailModal(true); 
//     };

//     // [FIX 3] HANDLE PARTICIPANT ACTION - SINKRONISASI & UPDATE LABEL WARNA
//     const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => { 
//         if (!selectedActionId) return alert("Pilih Materi/Kuis di dropdown atas dulu!"); 
        
//         // Cari ID User Asli (karena studentId di tabel kadang ID Enrollment, kadang ID User)
//         const participantObj = participants.find(p => (p.user?._id === studentId) || (p.user === studentId));
//         const realUserId = participantObj?.user?._id || participantObj?.user;

//         if (action === 'pass') { 
//             if(!confirm(`Luluskan peserta ini?`)) return; 
//             try { 
//                 await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId: realUserId, lessonId: selectedActionId, courseId } }); 
//                 alert("Berhasil diluluskan!"); 
                
//                 // [OPTIMISTIC UPDATE] Update State Lokal agar label jadi HIJAU langsung
//                 setParticipants(prev => prev.map(p => {
//                      const uId = p.user?._id || p.user;
//                      if(uId === studentId || uId === realUserId) {
//                          const currentCompleted = p.completedLessons || [];
//                          if (!currentCompleted.includes(selectedActionId)) {
//                              // Tambah ID ke daftar selesai dan update progress dummy (refresh page akan ambil real)
//                              const newCompleted = [...currentCompleted, selectedActionId];
//                              return { ...p, completedLessons: newCompleted };
//                          }
//                      }
//                      return p;
//                 }));

//             } catch(e:any) { alert(e.message); } 
//         }
//         else if (action === 'reset') { 
//             if(!confirm(`Reset progress?`)) return; 
//             try { 
//                 await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId: realUserId, quizId: selectedActionId } }); 
//                 alert("Reset berhasil!"); 
                
//                 // [OPTIMISTIC UPDATE] Hapus ID dari daftar selesai
//                 setParticipants(prev => prev.map(p => {
//                     const uId = p.user?._id || p.user;
//                     if(uId === studentId || uId === realUserId) {
//                         const currentCompleted = p.completedLessons || [];
//                         return { ...p, completedLessons: currentCompleted.filter((id:string) => id !== selectedActionId) };
//                     }
//                     return p;
//                 }));

//             } catch(e:any) { alert(e.message); } 
//         }
//     };
    
//     // FORM LOGIC
//     const resetLessonForm = () => { setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesIsMandatory(true); setLesContent(''); setSelectedFile(null); setLesJp(0); setLesFacilitatorId(''); setLesSchedule(''); setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(10); setPollQuestion(''); setPollOptions(['', '']); setSelectedClassroom(null); setEssayQuestions(['']); setUseEssayTimer(false); };
//     const handleAddNewContent = (modId: string) => { resetLessonForm(); setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); };

//     const handleSaveLesson = async (modId: string) => {
//         if (!lesTitle.trim()) { alert("Judul wajib"); return; }
//         let fileUrl = '';
//         if (selectedFile) { try { setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); const res = await apiUpload('/api/upload', fd); fileUrl = res.url || res.file?.url || res.imageUrl; } catch (err) { alert("Gagal upload"); return; } finally { setUploading(false); } }
//         else if (editingLesId) { const mod = course?.modules.find((m: any) => m._id === modId); const les = mod?.lessons.find((l: any) => l._id === editingLesId); if (les) fileUrl = les.fileUrl; }
//         const finalType = lesType; const safeFacilitatorId = lesFacilitatorId || null;
//         const body: any = { title: lesTitle, type: finalType, isActive: true, isMandatory: lesIsMandatory, jp: lesJp, facilitatorId: safeFacilitatorId, scheduleDate: lesSchedule || null, questions: (lesType === 'quiz') ? questions : undefined, quizDuration: (lesType === 'quiz' || (lesType === 'essay' && useEssayTimer)) ? quizDuration : undefined, pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined, };
//         if (lesType === 'essay') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; }
//         if(fileUrl) body.fileUrl = fileUrl; if(lesType === 'video_url') body.videoUrl = lesContent; else if(lesType === 'virtual_class') body.meetingLink = lesContent; else if(lesType === 'upload_doc' || lesType === 'lesson') body.content = lesContent;
//         try { if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); resetLessonForm(); load(); } catch(e:any) { alert(e.message); }
//     };

//     const startEditLesson = (modId: string, les: any) => {
//         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title);
//         if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { setLesType('essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); if(les.quizDuration) { setUseEssayTimer(true); setQuizDuration(les.quizDuration); } else { setUseEssayTimer(false); } } else { setLesType(les.type); }
//         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || ''));
//         if (les.type === 'video_url') setLesContent(les.videoUrl||''); else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); else if (les.type !== 'essay') setLesContent(les.content||'');
//         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(les.quizDuration||10); }
//         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); }
//         if (les.type === 'google_classroom') { if(googleToken && classroomCourses.length === 0) fetchClassroomCourses(); if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); }
//         setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150);
//     };

//     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); load(); };
//     const addPollOption = () => setPollOptions([...pollOptions, '']); const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); };
//     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); };
//     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); const updateEssay = (idx: number, val: string) => { const newQ = [...essayQuestions]; newQ[idx] = val; setEssayQuestions(newQ); }; const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };
//     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); const width = 500, height = 600; const left = (window.screen.width - width) / 2; const top = (window.screen.height - height) / 2; window.open(url, 'GoogleAuthPopup', `width=${width},height=${height},top=${top},left=${left}`); } catch (e) { alert("Gagal Auth Google"); } };
//     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } };
//     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const res = await fetch(`http://localhost:4000/api/classroom/courses`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'x-google-token': token } }); if (res.status === 401) { localStorage.removeItem('google_class_token'); setGoogleToken(null); return; } const data = await res.json(); if (data.courses) setClassroomCourses(data.courses); } catch (e) { console.error(e); } finally { setIsCheckingGoogle(false); } };

//     if (loading || !isBrowser) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div></div>;

//     return (
//         <Protected roles={["FACILITATOR", "SUPER_ADMIN"]}>
//             <div className="max-w-6xl mx-auto p-6 space-y-12 pb-32 relative">
//                 {/* HEADER & GRID ATAS (TIDAK DIUBAH) */}
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 gap-4">
//                     <div className="flex-1"><h1 className="text-3xl font-bold text-gray-800">{course?.title}</h1><div className="flex gap-2 items-center mt-2"><button type="button" onClick={() => toggleStatus()} className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer border transition-colors ${course?.isPublished ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`} aria-label="Toggle Publish" title="Ubah Status Publikasi">{course?.isPublished ? 'PUBLISHED' : 'DRAFT'}</button><span className="text-xs text-gray-500 font-medium">{course?.modules?.length || 0} Modul • {course?.modules?.reduce((acc: number, m: any) => acc + m.lessons.length, 0) || 0} Materi</span></div></div>
//                     <button type="button" onClick={() => router.push('/admin/courses')} className="text-sm font-bold text-gray-500 hover:text-gray-800 px-4 py-2 border rounded-lg hover:bg-gray-50" aria-label="Kembali" title="Kembali">← Kembali</button>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div className="md:col-span-1 space-y-6">
//                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">{course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Upload Cover" title="Ganti Sampul">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Input Cover" /></div></div>
//                         {currentUserRole === 'SUPER_ADMIN' && (<div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col"><div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" title="Simpan Tim" aria-label="Simpan Tim">Simpan</button></div><div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">{facilitators.map((user: any) => (<label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}><input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih fasilitator ${user.name}`} title={`Pilih ${user.name}`} /><div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div></label>))}</div><input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" title="Cari Fasilitator" /></div>)}
//                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-6 overflow-hidden"><h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 text-yellow-600 cursor-pointer" onClick={() => setShowWallOfFameModal(true)}><Trophy size={18}/> Wall of Fame (Klik)</h3><div className="space-y-2">{recentCompletions.length > 0 ? recentCompletions.slice(0,3).map((rc:any, i:number) => (<div key={i} className="flex items-center gap-2 p-2 bg-yellow-50 rounded border border-yellow-100 text-xs"><Award size={12} className="text-yellow-600"/> <span>{rc.name}</span></div>)) : <span className="text-xs text-gray-400">Belum ada data.</span>}</div></div>
//                     </div>
//                     {/* KANAN (MODUL) */}
//                     <section className="md:col-span-2 space-y-6">
//                         <div className="flex justify-between items-center"><h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">📚 Modul & Materi</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-red-700 text-white px-5 py-2 rounded-xl font-bold shadow-lg hover:bg-red-800 flex items-center gap-2" aria-label="Tambah Modul" title="Tambah Modul">+ Tambah Modul</button></div>
//                         {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul" title="Nama Modul" /><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" min="0" aria-label="JP" title="Jam Pelajaran" /></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih Fasilitator" title="Pilih Fasilitator"><option value="">-- Pilih Fasilitator dari Tim --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal Pelaksanaan Modul" /></div></div><label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={modIsMandatory} onChange={e => setModIsMandatory(e.target.checked)} className="w-4 h-4 text-red-600 rounded" aria-label="Wajib" title="Wajib" /><span>Wajib diselesaikan?</span></label><div className="flex gap-2 justify-end pt-2"><button type="button" onClick={resetModuleForm} className="text-gray-500 font-bold px-3 text-sm" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700" aria-label="Simpan">Simpan</button></div></form>)}
//                         <DragDropContext onDragEnd={onDragEnd}><Droppable droppableId="all-modules" type="module">{(provided) => (<div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">{course?.modules?.map((m: any, idx: number) => (<Draggable key={m._id} draggableId={m._id} index={idx}>{(provided) => (<div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-2xl overflow-hidden shadow-sm bg-white"><div className="bg-gray-100 p-4 flex justify-between items-center" {...provided.dragHandleProps}><div className="flex items-center gap-3"><span className="cursor-grab text-gray-400 text-xl" aria-label="Geser Modul">☰</span><span className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{idx+1}</span><div><div className="flex items-center gap-2"><h3 className="font-bold text-gray-800">{m.title}</h3>{m.jp > 0 && <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded border border-blue-200">{m.jp} JP</span>}</div><div className="flex items-center gap-2 mt-1"><span className={`text-[10px] font-bold px-2 py-0.5 rounded ${m.isMandatory ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-600'}`}>{m.isMandatory ? 'WAJIB' : 'OPSIONAL'}</span>{m.facilitatorId && <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded flex items-center gap-1">👤 {getFacilitatorName(m.facilitatorId)}</span>}{m.scheduleDate && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1"><Calendar size={10}/> {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}</div></div></div><div className="flex items-center gap-2"><button type="button" onClick={() => startEditModule(m)} className="text-blue-600 font-bold text-xs px-2" aria-label="Edit Modul">Edit</button><button type="button" onClick={() => toggleStatus(m._id)} className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${m.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`} aria-label="Toggle Status Modul">{m.isActive ? 'ON' : 'OFF'}</button></div></div><Droppable droppableId={m._id} type="lesson">{(provided) => (<div ref={provided.innerRef} {...provided.droppableProps} className="p-4 space-y-3 min-h-[50px]">{m.lessons?.map((l: any, lIdx: number) => (<Draggable key={l._id} draggableId={l._id} index={lIdx}>{(provided) => (<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-3 bg-white border rounded-xl hover:shadow-md transition-shadow"><div className="flex items-center gap-3"><span className="cursor-grab text-gray-300" aria-label="Geser Lesson">::</span><span className="text-xl">{l.type === 'virtual_class' ? '🎥' : l.type === 'google_classroom' ? '🏫' : l.type === 'video_url' ? '🎞️' : l.type === 'quiz' ? '📝' : l.type === 'poll' ? '📊' : l.type === 'upload_doc' ? '📤' : l.type === 'image' ? '🖼️' : '📄'}</span><div><p className="text-sm font-bold text-gray-800">{l.title}</p><div className="flex gap-2 items-center mt-0.5">{l.jp > 0 && <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 rounded border border-blue-100">{l.jp} JP</span>}{l.scheduleDate && <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-1.5 rounded border border-purple-100 flex items-center gap-1"><Calendar size={10}/> {new Date(l.scheduleDate).toLocaleDateString('id-ID')}</span>}{(l.facilitatorId || l.facilitator) && (<span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">👤 {getFacilitatorName(l.facilitatorId || l.facilitator)}</span>)}</div></div></div><div className="flex items-center gap-2"><button type="button" onClick={() => startEditLesson(m._id, l)} className="text-blue-500 p-1" aria-label="Edit Lesson">✎</button><button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`px-2 py-1 rounded text-[10px] font-bold border ${l.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`} aria-label="Toggle Status Lesson">{l.isActive ? 'ON' : 'OFF'}</button><button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-gray-300 hover:text-red-500" aria-label="Hapus Lesson">🗑️</button></div></div>)}</Draggable>))}{provided.placeholder}{activeModId === m._id ? (<div id={`form-${m._id}`} className="bg-blue-50 p-5 rounded-xl border border-blue-200 space-y-4"><div className="grid grid-cols-12 gap-3"><div className="col-span-4"><select className="w-full p-2 border rounded-lg text-sm" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Pilih Tipe Konten"><option value="lesson">📄 Materi Teks</option><option value="essay">📝 Esai</option><option value="slide">🖥️ Slide Presentasi</option><option value="image">🖼️ Upload Gambar</option><option value="download_doc">📥 Upload Dokumen</option><option value="upload_doc">📤 Tugas Upload</option><option value="quiz">📝 Kuis</option><option value="poll">📊 Polling</option><option value="video_url">🎞️ Video URL (YouTube)</option><option value="virtual_class">🎥 Kelas Virtual (Zoom/Teams)</option><option value="google_classroom">🏫 Google Classroom</option></select></div><div className="col-span-6"><input className="w-full p-2 border rounded-lg text-sm" placeholder="Judul..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Lesson" /></div><div className="col-span-2"><input type="number" className="w-full p-2 border rounded-lg text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="Jam Pelajaran Lesson" /></div></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500 block mb-1">Fasilitator Pengampu</label><select value={lesFacilitatorId} onChange={e => setLesFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm" aria-label="Pilih Fasilitator" title="Pilih Fasilitator"><option value="">-- Sama dengan Modul ({getFacilitatorName(m.facilitatorId)}) --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full border p-2 rounded text-sm" value={lesSchedule} onChange={e => setLesSchedule(e.target.value)} aria-label="Tanggal Materi" title="Tanggal Materi" /></div></div><label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e => setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib" title="Wajib" /><span>Materi ini wajib diselesaikan?</span></label>{lesType === 'essay' && (<div className="space-y-4 bg-white p-4 rounded border border-blue-100"><label className="block text-xs font-bold text-gray-500">Instruksi / Konteks Soal:</label><div className="bg-white rounded-lg overflow-hidden border border-gray-200"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-40 mb-12" placeholder="Tulis instruksi atau bacaan soal..." /></div><h4 className="text-sm font-bold text-gray-700 mt-4">Daftar Pertanyaan Esai:</h4>{essayQuestions.map((q, idx) => (<div key={idx} className="flex gap-2"><span className="text-sm font-bold text-gray-500 py-2">{idx + 1}.</span><textarea className="flex-1 p-2 border rounded text-sm h-20" placeholder="Tulis pertanyaan..." value={q} onChange={e => updateEssay(idx, e.target.value)} aria-label={`Pertanyaan Esai ${idx+1}`}/>{essayQuestions.length > 1 && (<button type="button" onClick={() => removeEssay(idx)} className="text-red-500 font-bold px-2 self-start mt-2" aria-label="Hapus Pertanyaan">✕</button>)}</div>))}<button type="button" onClick={addEssayRow} className="text-xs font-bold text-blue-600 flex items-center gap-1" aria-label="Tambah Pertanyaan"><Plus size={14}/> Tambah Pertanyaan</button><div className="flex items-center gap-2 mb-2 bg-amber-50 p-2 rounded border border-amber-100"><label className="text-xs font-bold text-amber-800 flex items-center gap-2"><Clock size={14}/> Durasi (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="p-1 border rounded w-20 text-sm" aria-label="Durasi Esai"/><label className="text-xs ml-4 flex items-center gap-1 cursor-pointer"><input type="checkbox" checked={useEssayTimer} onChange={e => setUseEssayTimer(e.target.checked)} aria-label="Gunakan Timer" /> Gunakan Timer</label></div></div>)}{lesType === 'virtual_class' && (<div className="bg-white p-4 rounded border border-blue-200 space-y-2"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><LinkIcon size={16}/> Link Meeting (Zoom/Teams/GMeet)</label><input type="url" className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://teams.microsoft.com/..." value={lesContent} onChange={e => setLesContent(e.target.value)} aria-label="Link Meeting" /></div>)}{lesType === 'video_url' && (<div className="bg-white p-3 rounded border border-gray-200"><label className="text-xs font-bold text-gray-600 flex items-center gap-2 mb-1"><Video size={16}/> Link Video (YouTube)</label><input className="w-full p-2 border rounded text-sm outline-none" placeholder="https://youtube.com/watch?v=..." value={lesContent} onChange={e => setLesContent(e.target.value)} aria-label="URL Video" /></div>)}{['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded-lg overflow-hidden border border-gray-200"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-64 mb-12" /></div>)}{['image','download_doc','slide'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Pilih File"/></div>)}{lesType === 'quiz' && (<div className="space-y-4 bg-white p-4 rounded border"><div className="flex items-center gap-2 mb-2 bg-amber-50 p-2 rounded border border-amber-100"><label className="text-xs font-bold text-amber-800">⏱ Durasi (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="p-1 border rounded w-20 text-sm" aria-label="Durasi Kuis"/></div>{questions.map((q, ix) => (<div key={ix} className="p-3 border rounded bg-gray-50 relative"><button type="button" onClick={() => removeQuestion(ix)} className="absolute top-2 right-2 text-red-500 text-xs font-bold hover:underline" aria-label="Hapus Soal">Hapus</button><input className="w-full mb-2 p-2 border rounded" placeholder={`Pertanyaan ${ix+1}`} value={q.question} onChange={e=>updateQuestion(ix,'question',e.target.value)} aria-label={`Pertanyaan ${ix+1}`} /><div className="grid grid-cols-2 gap-2">{q.options.map((o:string,oi:number)=><input key={oi} className={`w-full p-1 border ${q.correctIndex===oi?'bg-green-100 border-green-400':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix,'options',e.target.value,oi)} aria-label={`Opsi ${oi+1}`} />)}</div><div className="mt-2 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix,'correctIndex',Number(e.target.value))} className="border w-12 p-1 rounded" aria-label="Kunci Jawaban" /></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-200" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}{lesType === 'poll' && (<div className="space-y-4 bg-white p-4 rounded border border-blue-100"><input className="w-full p-2 border rounded text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} aria-label="Pertanyaan Polling" />{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2"><input className="flex-1 p-2 border rounded text-sm" placeholder={`Opsi ${idx + 1}`} value={opt} onChange={e => updatePollOption(idx, e.target.value)} aria-label={`Opsi ${idx+1}`} />{pollOptions.length > 2 && (<button type="button" onClick={() => removePollOption(idx)} className="text-red-500 font-bold px-2" aria-label="Hapus Opsi">✕</button>)}</div>))}<button type="button" onClick={addPollOption} className="text-xs font-bold text-blue-600" aria-label="Tambah Opsi">+ Tambah Opsi</button></div>)}{lesType === 'google_classroom' && (<div className="bg-white p-4 rounded border border-green-200 space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Kelas" title="Refresh"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putuskan Akun" title="Putuskan"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google" title="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas" title="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas" title="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}</div>)}<div className="flex justify-end gap-2"><button type="button" onClick={resetLessonForm} className="px-3 py-1 text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-4 py-1 rounded text-xs font-bold" aria-label="Simpan">Simpan</button></div></div>) : (<button type="button" onClick={()=>{ handleAddNewContent(m._id) }} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-xs hover:border-blue-300 hover:text-blue-600 transition-colors" aria-label="Tambah Konten">+ Tambah Konten</button>)}</div>)}</Droppable></div>)}</Draggable>))}{provided.placeholder}</div>)}</Droppable></DragDropContext>
//                     </section>
//                 </div>

//                 <div className="border-t-4 border-gray-100 pt-8"></div>
//                 <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200"><div className="flex justify-between items-start mb-6"><h2 className="text-2xl font-bold text-gray-800">🎓 Pengaturan Sertifikat</h2><div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg text-xs font-medium border border-blue-200 max-w-md shadow-sm"><div className="flex gap-2 items-start"><Info size={16} className="shrink-0 mt-0.5"/><div><strong>Format Nomor Otomatis:</strong><br/>Gunakan placeholder <code>{'{NO}'}</code> agar nomor urut peserta terisi otomatis.<br/>Format Standard: <code>00{'{NO}'}/DIKLAT/02.01.2026/I/2026</code></div></div></div></div><CertificateConfigForm initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} />{certConfig && (<div className="mt-8 border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 shadow-sm"><div className="bg-gray-100 px-4 py-3 border-b flex items-center gap-2 font-bold text-gray-700 text-sm"><FileBadge size={16}/> Data Konfigurasi Tersimpan (Preview)</div><div className="p-4 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"><div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Hash size={12}/> Format Nomor</p><p className="font-mono bg-white border px-3 py-2 rounded text-gray-800 shadow-sm">{certConfig.certificateNumber || '-'}</p></div><div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar size={12}/> Tanggal Pelaksanaan</p><p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.executionDate ? new Date(certConfig.executionDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '-'}</p></div><div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MapPin size={12}/> Kota Penerbit</p><p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.city || '-'}</p></div><div><p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><UserCheck size={12}/> Penanda Tangan</p><p className="font-bold text-gray-800 bg-white border px-3 py-2 rounded shadow-sm">{certConfig.signatoryName} <span className="font-normal text-gray-500 text-xs block">({certConfig.signatoryPosition})</span></p></div></div></div>)}<div className="my-10 border-t border-gray-100"></div><CompetencyForm initialData={competencies} onChange={(data) => setCompetencies(data)} /><div className="mt-4 flex items-center gap-2 bg-gray-50 p-3 rounded-lg border"><input type="checkbox" id="includeComp" checked={includeCompetencies} onChange={(e) => setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Sertakan Kompetensi" /><label htmlFor="includeComp" className="text-sm font-bold text-gray-700 cursor-pointer">Tampilkan daftar kompetensi di halaman belakang sertifikat?</label></div><div className="mt-4 flex justify-end"><button type="button" onClick={handleSaveCompetencies} disabled={isSavingCompetencies} className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button></div></section>
//                 <div className="mt-8 p-6 bg-gray-50 rounded-3xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3"><h3 className="text-lg font-bold text-gray-800">Selesai?</h3><button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Publish Course">{course?.isPublished ? 'Tarik Kembali ke Draft' : '🚀 PUBLISH SEKARANG'}</button></div>

//                 {/* FLOATING DASHBOARD */}
//                 <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
//                     <button type="button" onClick={() => { setShowTeamChat(true); }} className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 hover:text-white border border-gray-200 transition-transform hover:scale-105 flex items-center gap-2 group relative" title="Chat Tim" aria-label="Chat Tim"><MessageSquare size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Diskusi Tim</span></button>
//                     <button type="button" onClick={() => { setShowParticipantChat(true); fetchParticipants(); }} className="bg-emerald-600 text-white p-4 rounded-full shadow-xl hover:bg-emerald-700 flex items-center gap-2 transition-transform hover:scale-105 group relative" title="Chat Peserta" aria-label="Chat Peserta"><MessageCircle size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Chat Peserta</span></button>
//                     <button type="button" onClick={() => setShowPreviewModal(true)} className="bg-white text-gray-700 p-4 rounded-full shadow-xl hover:bg-gray-50 border border-gray-200 transition-transform hover:scale-105 flex items-center gap-2 group relative" title="Preview" aria-label="Preview Kelas"><Eye size={24} className="text-purple-600"/><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Preview Kelas</span></button>
//                     <button type="button" onClick={() => { setShowParticipantModal(true); fetchParticipants(); }} className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 flex items-center gap-2 transition-transform hover:scale-105 group relative" aria-label="Manajemen Peserta" title="Manajemen Peserta"><Users size={24} /><span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Manajemen Peserta</span></button>
//                 </div>

//                 {/* MODALS */}
//                 {showPreviewModal && (<div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200"><div className="bg-white w-[95vw] h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"><div className="bg-gray-900 text-white p-3 flex justify-between items-center px-6"><h3 className="font-bold flex items-center gap-2"><Eye size={18}/> Preview Mode</h3><div className="flex gap-3"><button type="button" onClick={() => window.open(`/courses/${courseId}`, '_blank', 'noopener,noreferrer')} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded flex items-center gap-1 transition-colors" aria-label="Buka di Tab Baru"><ExternalLink size={14}/> Buka Tab Baru</button><button type="button" onClick={() => setShowPreviewModal(false)} className="text-gray-400 hover:text-white" aria-label="Tutup Preview"><X size={24}/></button></div></div><div className="flex-1 bg-gray-100"><iframe src={`/courses/${courseId}`} className="w-full h-full border-0" title="Course Preview" /></div></div></div>)}
//                 {showParticipantChat && (<RoomChatModal title="Global Room (Peserta)" members={[...chatMembers, ...teamMembers]} onClose={() => setShowParticipantChat(false)} themeColor="bg-red-700" />)}
//                 {showTeamChat && (<RoomChatModal title="Diskusi Tim Fasilitator" members={teamMembers} onClose={() => setShowTeamChat(false)} themeColor="bg-blue-600" />)}
//                 {chatTargetStudent && <PersonalChatModal student={chatTargetStudent} onClose={() => setChatTargetStudent(null)} />}
//                 {showWallOfFameModal && (<div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200"><div className="bg-white w-full max-w-lg h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"><div className="bg-yellow-500 p-4 text-white flex justify-between items-center shadow-md"><h3 className="font-bold text-lg flex items-center gap-2"><Trophy size={20}/> Wall of Fame History</h3><button type="button" onClick={() => setShowWallOfFameModal(false)} className="hover:bg-yellow-600 p-2 rounded-full" aria-label="Tutup"><X size={24}/></button></div><div className="flex-1 p-4 overflow-y-auto bg-yellow-50 space-y-3">{recentCompletions.length > 0 ? recentCompletions.map((rc:any, i:number) => (<div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-yellow-200 shadow-sm hover:shadow-md transition-shadow"><div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold"><Award size={20}/></div><div><p className="font-bold text-gray-800">{rc.name}</p><p className="text-xs text-gray-500">Menyelesaikan {rc.module} pada {rc.date || 'Hari ini'}</p></div></div>)) : <div className="text-center text-gray-400 mt-10">Belum ada data kelulusan.</div>}</div></div></div>)}
                
//                 {/* [FIX] Detail Siswa Sinkron */}
//                 {showStudentDetailModal && studentDetail && (
//                     <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
//                         <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
//                             <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
//                                 <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">{studentDetail.user?.name?.charAt(0) || studentDetail.name?.charAt(0)}</div><div><h3 className="font-bold text-lg">{studentDetail.user?.name || studentDetail.name}</h3><p className="text-xs opacity-80">{studentDetail.user?.email || studentDetail.email}</p></div></div>
//                                 <button type="button" onClick={() => setShowStudentDetailModal(false)} className="hover:bg-indigo-700 p-2 rounded-full" aria-label="Tutup"><X size={24}/></button>
//                             </div>
//                             <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-6">
//                                 {course?.modules?.map((m:any) => (
//                                     <div key={m._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
//                                         <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-bold text-gray-700 text-sm flex justify-between items-center">
//                                             <span>{m.title}</span>
//                                             <span className="text-[10px] bg-gray-200 px-2 py-1 rounded text-gray-500">{m.lessons.length} Materi</span>
//                                         </div>
//                                         <div className="divide-y divide-gray-100">
//                                             {m.lessons.map((l:any) => {
//                                                 const isDone = studentDetail.completedLessons?.includes(l._id);
//                                                 return (
//                                                     <div key={l._id} className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
//                                                         <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center border ${isDone ? 'bg-green-500 border-green-500 text-white' : 'bg-gray-100 border-gray-300 text-transparent'}`}>
//                                                             <CheckCircle2 size={12}/>
//                                                         </div>
//                                                         <div className="flex-1">
//                                                             <div className="flex justify-between">
//                                                                 <p className="text-sm font-bold text-gray-800">{l.title}</p>
//                                                                 {isDone && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">Selesai</span>}
//                                                             </div>
//                                                             <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider">{l.type.replace('_',' ')}</p>
                                                            
//                                                             {l.type === 'upload_doc' && isDone && (
//                                                                 <div className="bg-blue-50 border border-blue-100 rounded p-2 flex items-center gap-2 text-xs text-blue-700 cursor-pointer hover:underline">
//                                                                     <FileText size={14}/> <span>Lihat File Tugas</span>
//                                                                 </div>
//                                                             )}
//                                                             {l.type === 'essay' && isDone && (
//                                                                 <div className="bg-yellow-50 border border-yellow-100 rounded p-2 text-xs text-yellow-800 italic mt-1">
//                                                                     "Jawaban esai tersimpan."
//                                                                 </div>
//                                                             )}
//                                                             {l.type === 'quiz' && isDone && (
//                                                                 <span className="text-xs font-bold text-green-600">Selesai (Skor: 100)</span>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 )
//                                             })}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* MODAL MANAJEMEN PESERTA UTAMA */}
//                 {showParticipantModal && (
//                     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
//                         <div className="bg-white w-full max-w-6xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
//                             <div className="p-6 border-b flex justify-between items-center bg-gray-50">
//                                 <div><h2 className="text-xl font-bold text-gray-800">Manajemen Peserta</h2><p className="text-xs text-gray-500">Kelola kelulusan dan reset kuis.</p></div>
//                                 <button type="button" onClick={() => setShowParticipantModal(false)} className="bg-white p-2 rounded-full shadow hover:bg-gray-100" aria-label="Tutup Modal" title="Tutup"><X size={20}/></button>
//                             </div>
                           
//                             <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex flex-wrap gap-4 items-center justify-between">
//                                 <div className="flex items-center gap-3">
//                                     <span className="text-xs font-bold text-indigo-800">🛠 Aksi Massal:</span>
//                                     <select className="p-2 border rounded-lg text-sm bg-white min-w-[250px]" value={selectedActionId} onChange={e=>setSelectedActionId(e.target.value)} aria-label="Pilih Materi Aksi" title="Pilih Materi Aksi"><option value="">-- Pilih Materi / Kuis --</option>{actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}</select>
//                                 </div>
//                                 <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input className="pl-10 pr-4 py-2 rounded-full border border-gray-300 text-sm w-64 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Cari peserta..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} aria-label="Cari Peserta" title="Cari Peserta" /></div>
//                             </div>

//                             <div className="flex-1 overflow-y-auto p-0 bg-gray-50/50">
//                                 {loadingParticipants ? (<div className="flex justify-center items-center h-full text-gray-400">Memuat data...</div>) : participants.length === 0 ? (<div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2"><Users size={48} className="opacity-20"/><p>Belum ada peserta.</p></div>) : (
//                                     <table className="w-full text-left border-collapse">
//                                         <thead className="bg-gray-100 sticky top-0 z-10 text-xs font-bold text-gray-600"><tr className="border-b"><th className="p-4">Peserta</th><th className="p-4">Tanggal Gabung</th><th className="p-4 text-center">Progres</th><th className="p-4 text-center">Aksi Konteks</th><th className="p-4 text-center">Chat</th><th className="p-4 text-center">Detail</th><th className="p-4 text-center text-red-600">Hapus</th></tr></thead>
//                                         <tbody className="text-sm bg-white divide-y">
//                                             {participants.filter(p => (p.user?.name || p.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => {
//                                                 const userObj = p.user || p.student || p.participant || p;
//                                                 const enrollmentId = p._id; 
//                                                 const name = userObj.name || 'Tanpa Nama';
//                                                 const email = userObj.email || '-';
//                                                 const dateRaw = p.joinedAt || p.createdAt || p.enrolledAt || userObj.joinedAt;
//                                                 const joinDate = dateRaw && !isNaN(new Date(dateRaw).getTime()) ? new Date(dateRaw).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';
//                                                 const selectedActionItem = actionOptions.find(o => o.id === selectedActionId);
                                                
//                                                 // [FIX] Update Real-time Status Lulus (Optimistic)
//                                                 const isCompleted = selectedActionId && p.completedLessons?.includes(selectedActionId);

//                                                 // [FIX] Hitung Progress Real
//                                                 const totalLessons = course?.modules?.reduce((acc:any, m:any) => acc + m.lessons.length, 0) || 1;
//                                                 const completedCount = p.completedLessons?.length || 0;
//                                                 const realProgress = Math.round((completedCount / totalLessons) * 100);

//                                                 return (
//                                                     <tr key={idx} className="hover:bg-blue-50 transition-colors">
//                                                         <td className="p-4 font-bold text-gray-800 flex items-center gap-3"><div className="relative">{userObj.avatarUrl ? (<img src={getImageUrl(userObj.avatarUrl)} alt={name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />) : (<div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-200">{name.charAt(0).toUpperCase()}</div>)}</div><div><div>{name}</div><div className="text-[10px] text-gray-400 font-normal flex items-center gap-1"><Mail size={10}/> {email}</div></div></td>
//                                                         <td className="p-4 text-xs text-gray-500">{joinDate}</td>
//                                                         <td className="p-4 text-center">
//                                                             {/* [FIX] Progress Bar Updated */}
//                                                             <div className="w-24 bg-gray-200 rounded-full h-2 mx-auto overflow-hidden"><div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{width: `${realProgress}%`}}></div></div><span className="text-[10px] text-gray-500 mt-1 block">{realProgress}%</span>
//                                                         </td>
//                                                         <td className="p-4 text-center">
//                                                             {selectedActionItem ? (
//                                                                 <button type="button" onClick={() => handleParticipantAction(userObj._id, selectedActionItem.type === 'quiz' ? 'reset' : 'pass')} disabled={selectedActionItem.type !== 'quiz' && isCompleted} className={`px-3 py-1 rounded text-xs font-bold border transition-all flex items-center gap-1 mx-auto ${isCompleted ? 'bg-green-100 text-green-700 border-green-200 cursor-default' : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50'}`} aria-label="Aksi Peserta" title={selectedActionItem.type === 'quiz' ? 'Reset Kuis' : 'Luluskan Manual'}>{selectedActionItem.type === 'quiz' ? '↺ Reset' : (isCompleted ? '✓ Lulus' : '⚡ Luluskan')}</button>
//                                                             ) : <span className="text-gray-300 text-xs">-</span>}
//                                                         </td>
//                                                         {/* [FIX 2] CHAT BUTTON FIX (OPEN PERSONAL CHAT) */}
//                                                         <td className="p-4 text-center"><button type="button" onClick={() => setChatTargetStudent(p)} className="p-2 rounded-full text-blue-500 hover:bg-blue-50 hover:scale-110 transition-all border border-transparent hover:border-blue-100" aria-label="Chat Peserta" title="Chat"><MessageSquare size={18}/></button></td>
//                                                         <td className="p-4 text-center"><button type="button" onClick={() => handleViewStudentDetail(p)} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-600" aria-label="Lihat Detail" title="Detail"><Eye size={18}/></button></td>
//                                                         <td className="p-4 text-center"><button type="button" onClick={() => handleRejectParticipant(enrollmentId, name)} className="p-2 rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Tolak / Hapus Peserta" aria-label="Tolak Peserta"><UserX size={18}/></button></td>
//                                                     </tr>
//                                                 );
//                                             })}
//                                         </tbody>
//                                     </table>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </Protected>
//     );
// }
'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { api, apiUpload, getImageUrl } from '@/lib/api';
import Protected from '@/components/Protected';
import CompetencyForm from '@/components/admin/CompetencyForm';
import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
import {
    Calendar, School, RefreshCw, LogOut, CheckCircle2, Video,
    Link as LinkIcon, Users, Eye, MessageSquare, MessageCircle, X, Send, MoreHorizontal, ExternalLink,
    Search, User as UserIcon, Mail, Smile, Trophy, Award, Plus, Trash2, Clock, Paperclip, FileText, Download,
    FileBadge, MapPin, UserCheck, Hash, Info, UserX, BarChart3, LayoutDashboard, BookOpen, AlertCircle,
    ChevronDown, ChevronRight
} from 'lucide-react';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; 

const ReactQuill = dynamic(() => import('react-quill'), { 
    ssr: false,
    loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
});

// --- HELPER ---
const getRomanMonth = (date: Date) => {
    const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    return romans[date.getMonth()];
};

const generateDefaultCertFormat = () => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    const roman = getRomanMonth(now);
    return `00{NO}/DIKLAT/${dd}.${mm}.${yyyy}/${roman}/${yyyy}`;
};

// --- CHAT COMPONENTS ---
function PersonalChatModal({ student, onClose }: any) {
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const emojis = ["😀", "😂", "🥰", "😎", "🤔", "👍", "👎", "❤️", "🔥", "🎉", "📚", "✅", "💡", "🤝", "🙏", "💪"];

    const targetId = student.user?._id || student._id;
    const targetName = student.user?.name || student.name || 'User';
    const targetAvatar = student.user?.avatarUrl || student.avatarUrl;
    const targetEmail = student.user?.email || student.email || '-';

    useEffect(() => {
        if(targetId) loadHistory();
        const interval = setInterval(() => { if(targetId) loadHistory(); }, 5000);
        return () => clearInterval(interval);
    }, [targetId]);

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    const loadHistory = async () => {
        try {
            const res = await api(`/api/chat/${targetId}?t=${Date.now()}`);
            setMessages(res.messages || []);
        } catch (e) { console.error(e); }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        const tempMsg = { _id: Date.now(), sender: 'me', message: newMessage, createdAt: new Date().toISOString() };
        setMessages(prev => [...prev, tempMsg]);
        const msgToSend = newMessage;
        setNewMessage('');
        setShowEmoji(false);
        try {
            await api('/api/chat/send', { method: 'POST', body: { recipientId: targetId, message: msgToSend } });
            loadHistory();
        } catch (error: any) { alert("Gagal: " + error.message); }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
                <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold border-2 border-white/30 overflow-hidden">
                            {targetAvatar ? <img src={getImageUrl(targetAvatar)} alt={targetName} className="w-full h-full object-cover"/> : (targetName.charAt(0) || 'U')}
                        </div>
                        <div><h3 className="font-bold text-sm leading-tight">{targetName}</h3><p className="text-[10px] opacity-80">{targetEmail}</p></div>
                    </div>
                    <button type="button" onClick={onClose} className="hover:bg-blue-700 p-2 rounded-full font-bold" aria-label="Tutup Chat" title="Tutup Chat"><X size={18}/></button>
                </div>
                <div className="flex-1 p-4 bg-gray-100 overflow-y-auto flex flex-col gap-3 relative">
                    {messages.length === 0 && <div className="text-center text-gray-400 text-xs mt-10">Belum ada pesan.</div>}
                    {messages.map((msg: any, idx: number) => (
                        <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${msg.sender === 'me' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800'}`}><p>{msg.message}</p></div>
                        </div>
                    ))}
                    <div ref={messagesEndRef}/>
                    {showEmoji && (<div className="absolute bottom-2 left-2 bg-white border shadow-xl rounded-xl p-3 grid grid-cols-4 gap-2 z-20 w-64 animate-in zoom-in-95">{emojis.map(e => (<button type="button" key={e} onClick={() => { setNewMessage(prev => prev + e); }} className="text-2xl hover:bg-gray-100 p-2 rounded transition" aria-label={`Pilih Emoji ${e}`}>{e}</button>))}</div>)}
                </div>
                <div className="p-3 bg-white border-t flex gap-2 items-center relative">
                    <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="text-gray-400 hover:text-yellow-500 transition-colors" aria-label="Buka Emoticon" title="Emoticon"><Smile size={24}/></button>
                    <form onSubmit={handleSend} className="flex-1 flex gap-2">
                        <input className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis pesan..." value={newMessage} onChange={e => setNewMessage(e.target.value)} aria-label="Input Pesan Chat" />
                        <button type="submit" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700" aria-label="Kirim Pesan" title="Kirim"><Send size={18}/></button>
                    </form>
                </div>
            </div>
        </div>
    );
}

// --- MAIN PAGE ---
export default function AdminCourseDetailPage() {
    const params = useParams();
    const courseId = params?.id as string;
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- STATE UTAMA ---
    const [activeTab, setActiveTab] = useState<'content' | 'operator'>('content');
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isBrowser, setIsBrowser] = useState(false);
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    const [currentUserRole, setCurrentUserRole] = useState('');

    // --- OPERATOR DASHBOARD STATE ---
    const [participants, setParticipants] = useState<any[]>([]);
    const [loadingParticipants, setLoadingParticipants] = useState(false);
    const [participantFilter, setParticipantFilter] = useState('');
    const [actionOptions, setActionOptions] = useState<any[]>([]);
    const [selectedActionId, setSelectedActionId] = useState<string>('');
    const [showStudentDetailModal, setShowStudentDetailModal] = useState(false); 
    const [studentDetail, setStudentDetail] = useState<any>(null);
    const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);

    // --- CONTENT EDITOR STATE ---
    const [showModuleForm, setShowModuleForm] = useState(false);
    const [modTitle, setModTitle] = useState('');
    const [modIsMandatory, setModIsMandatory] = useState(true);
    const [modFacilitatorId, setModFacilitatorId] = useState('');
    const [modJp, setModJp] = useState(0);
    const [modSchedule, setModSchedule] = useState('');
    const [editingModId, setEditingModId] = useState<string | null>(null);
    const [activeModId, setActiveModId] = useState<string | null>(null);
    const [editingLesId, setEditingLesId] = useState<string | null>(null);
    const [lesTitle, setLesTitle] = useState('');
    const [lesType, setLesType] = useState('lesson');
    const [lesContent, setLesContent] = useState('');
    const [lesIsMandatory, setLesIsMandatory] = useState(true);
    const [lesJp, setLesJp] = useState(0);
    const [lesSchedule, setLesSchedule] = useState('');
    const [lesFacilitatorId, setLesFacilitatorId] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [quizDuration, setQuizDuration] = useState(10);
    const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
    const [pollQuestion, setPollQuestion] = useState('');
    const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
    const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
    const [useEssayTimer, setUseEssayTimer] = useState(false);
    const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
    const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
    const [googleToken, setGoogleToken] = useState<string | null>(null);
    const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);
    
    // --- CERTIFICATE & TEAM STATE ---
    const [facilitators, setFacilitators] = useState<any[]>([]);
    const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>([]);
    const [activeTeam, setActiveTeam] = useState<any[]>([]);
    const [competencies, setCompetencies] = useState<any[]>([]);
    const [includeCompetencies, setIncludeCompetencies] = useState(true);
    const [certConfig, setCertConfig] = useState<any>(null);
    const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
    const [isSavingCert, setIsSavingCert] = useState(false);
    const [searchFacilitator, setSearchFacilitator] = useState('');

    const quillModules = useMemo(() => ({ toolbar: { container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'image', 'video'], [{ 'color': [] }, { 'background': [] }], ['clean']] } }), []);

    useEffect(() => {
        setIsBrowser(true);
        if(typeof window !== 'undefined'){
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                setCurrentUserRole(user.role);
            }
            const savedToken = localStorage.getItem('google_class_token');
            if(savedToken) setGoogleToken(savedToken);
        }
        if (courseId) load();
    }, [courseId]);

    // LOAD UTAMA
    const load = async () => { 
        try {
            const data = await api(`/api/courses/${courseId}?t=${Date.now()}`);
            const courseData = data.course || data;
            setCourse(courseData);
            
            const opts: any[] = [];
            courseData.modules?.forEach((m: any) => {
                m.lessons?.forEach((l: any) => {
                    let label = l.title;
                    if(l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
                    else if(l.type === 'essay') label = `📝 Esai: ${l.title}`;
                    else if(l.type === 'upload_doc') label = `📤 Upload: ${l.title}`;
                    opts.push({ id: l._id, label, type: l.type });
                });
            });
            setActionOptions(opts);

            if (courseData.facilitatorIds) setSelectedFacilitatorIds(courseData.facilitatorIds.map((f: any) => (typeof f === 'object' && f !== null) ? f._id : f));
            if (courseData.competencies) setCompetencies(courseData.competencies);
            if (courseData.includeCompetenciesInCertificate !== undefined) setIncludeCompetencies(courseData.includeCompetenciesInCertificate);
            let config = courseData.certificateConfig || {};
            if (!config.certificateNumber) config = { ...config, certificateNumber: generateDefaultCertFormat() };
            setCertConfig(config);

            const usersRes = await api('/api/admin/users');
            if (usersRes.users) {
                const facs = usersRes.users.filter((u: any) => u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN');
                setFacilitators(facs);
                // Active team untuk dropdown di module form
                const team = facs.filter((u: any) => courseData.facilitatorIds?.some((f: any) => (f._id || f) === u._id) || u.role === 'SUPER_ADMIN');
                setActiveTeam(team);
            }
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    // --- OPERATOR LOGIC ---
    const fetchParticipants = async () => {
        setLoadingParticipants(true);
        try {
            const res = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`);
            setParticipants(res.participants || []);
        } catch (error) { console.error("Gagal load peserta"); } finally { setLoadingParticipants(false); }
    };

    useEffect(() => { if(activeTab === 'operator') fetchParticipants(); }, [activeTab]);

    const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => { 
        if (!selectedActionId) return alert("Pilih Materi/Kuis di dropdown atas dulu!"); 
        const participantObj = participants.find(p => (p.user?._id === studentId) || (p.user === studentId));
        const realUserId = participantObj?.user?._id || participantObj?.user;

        if (action === 'pass') { 
            if(!confirm(`Luluskan peserta ini?`)) return; 
            try { 
                await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId: realUserId, lessonId: selectedActionId, courseId } }); 
                setParticipants(prev => prev.map(p => {
                     const uId = p.user?._id || p.user;
                     if(uId === studentId || uId === realUserId) {
                         const currentCompleted = p.completedLessons || [];
                         if (!currentCompleted.includes(selectedActionId)) {
                             const totalLessons = course?.modules?.reduce((acc:any, m:any) => acc + m.lessons.length, 0) || 1;
                             const newCompleted = [...currentCompleted, selectedActionId];
                             const newProgress = Math.round((newCompleted.length / totalLessons) * 100);
                             return { ...p, completedLessons: newCompleted, progress: newProgress > 100 ? 100 : newProgress, isCompleted: newProgress >= 100 };
                         }
                     }
                     return p;
                }));
            } catch(e:any) { alert(e.message); } 
        } else if (action === 'reset') { 
            if(!confirm(`Reset progress?`)) return; 
            try { 
                await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId: realUserId, quizId: selectedActionId } }); 
                alert("Reset berhasil!"); 
                fetchParticipants();
            } catch(e:any) { alert(e.message); } 
        }
    };

    const handleRejectParticipant = async (enrollmentId: string, studentName: string) => {
        if (!confirm(`TOLAK / HAPUS pendaftaran "${studentName}"?`)) return;
        try { await api(`/api/enrollments/${enrollmentId}`, { method: 'DELETE' }); alert(`Berhasil dihapus.`); fetchParticipants(); } catch (e: any) { alert("Gagal: " + e.message); }
    };

    // --- CONTENT EDITOR LOGIC ---
    const handleSaveModule = async () => { if (!modTitle.trim()) return alert("Judul wajib"); const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: modFacilitatorId || null, jp: modJp, scheduleDate: modSchedule || null }; try { if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); resetModuleForm(); load(); } catch(e: any) { alert(e.message); } };
    const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
    const resetModuleForm = () => { setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false); };
    const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); setCourse((prev: any) => ({ ...prev, isPublished: newStatus })); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); load(); } } catch (e: any) { alert(e.message); } };
    
    // Helper Editor
    const getFacilitatorName = (data: any) => { if (!data) return null; if (typeof data === 'object' && data.name) return data.name; const found = facilitators.find(f => f._id === data || f.id === data); return found ? found.name : 'Unknown'; };
    const resetLessonForm = () => { setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesIsMandatory(true); setLesContent(''); setSelectedFile(null); setLesJp(0); setLesFacilitatorId(''); setLesSchedule(''); setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(10); setPollQuestion(''); setPollOptions(['', '']); setSelectedClassroom(null); setEssayQuestions(['']); setUseEssayTimer(false); };
    const handleAddNewContent = (modId: string) => { resetLessonForm(); setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); };
    
    const handleSaveLesson = async (modId: string) => {
        if (!lesTitle.trim()) { alert("Judul wajib"); return; }
        let fileUrl = '';
        if (selectedFile) { try { setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); const res = await apiUpload('/api/upload', fd); fileUrl = res.url || res.file?.url || res.imageUrl; } catch (err) { alert("Gagal upload"); return; } finally { setUploading(false); } }
        else if (editingLesId) { const mod = course?.modules.find((m: any) => m._id === modId); const les = mod?.lessons.find((l: any) => l._id === editingLesId); if (les) fileUrl = les.fileUrl; }
        
        const body: any = { 
            title: lesTitle, 
            type: lesType, 
            isActive: true, 
            isMandatory: lesIsMandatory, 
            jp: lesJp, 
            facilitatorId: lesFacilitatorId || null, 
            scheduleDate: lesSchedule || null, 
            questions: (lesType === 'quiz') ? questions : undefined, 
            quizDuration: (lesType === 'quiz' || (lesType === 'essay' && useEssayTimer)) ? quizDuration : undefined, 
            pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, 
            pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, 
            classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined 
        };
        
        if (lesType === 'essay') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; }
        if(fileUrl) body.fileUrl = fileUrl; if(lesType === 'video_url') body.videoUrl = lesContent; else if(lesType === 'virtual_class') body.meetingLink = lesContent; else if(lesType === 'upload_doc' || lesType === 'lesson') body.content = lesContent;
        try { if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); resetLessonForm(); load(); } catch(e:any) { alert(e.message); }
    };

    const startEditLesson = (modId: string, les: any) => {
        setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title);
        // Load detail lesson
        if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { setLesType('essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); if(les.quizDuration) { setUseEssayTimer(true); setQuizDuration(les.quizDuration); } else { setUseEssayTimer(false); } } else { setLesType(les.type); }
        setLesIsMandatory(les.isMandatory !== false); 
        setLesJp(les.jp || 0); 
        setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); 
        setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || ''));

        if (les.type === 'video_url') setLesContent(les.videoUrl||''); else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); else if (les.type !== 'essay') setLesContent(les.content||'');
        if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(les.quizDuration||10); }
        if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); }
        // LOAD GOOGLE CLASSROOM DATA
        if (les.type === 'google_classroom') { 
            if(googleToken && classroomCourses.length === 0) fetchClassroomCourses(); 
            if(les.classroomData) setSelectedClassroom(les.classroomData); 
        } else { setSelectedClassroom(null); }
        
        setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150);
    };

    const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); load(); };
    const addPollOption = () => setPollOptions([...pollOptions, '']); const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); };
    const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); };
    const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); const updateEssay = (idx: number, val: string) => { const newQ = [...essayQuestions]; newQ[idx] = val; setEssayQuestions(newQ); }; const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };
    
    // --- GOOGLE CLASSROOM CONNECT ---
    const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); const width = 500, height = 600; const left = (window.screen.width - width) / 2; const top = (window.screen.height - height) / 2; window.open(url, 'GoogleAuthPopup', `width=${width},height=${height},top=${top},left=${left}`); } catch (e) { alert("Gagal Auth Google"); } };
    const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } };
    const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const res = await fetch(`http://localhost:4000/api/classroom/courses`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'x-google-token': token } }); if (res.status === 401) { localStorage.removeItem('google_class_token'); setGoogleToken(null); return; } const data = await res.json(); if (data.courses) setClassroomCourses(data.courses); } catch (e) { console.error(e); } finally { setIsCheckingGoogle(false); } };

    const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } setCourse(newCourse); try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); } catch (err) { load(); } };
    const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); const res = await apiUpload(`/api/upload/course/${courseId}/cover`, formData); setCourse((prev: any) => ({ ...prev, thumbnailUrl: res.imageUrl || res.url })); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
    const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
    const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Disimpan!"); load(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };
    const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); };
    const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); load(); } catch (e: any) { alert(e.message); } };

    if (loading || !isBrowser) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div></div>;

    // --- RENDER HELPERS ---
    const totalStudents = participants.length;
    const passedStudents = participants.filter(p => p.progress === 100 || p.isCompleted).length;
    const activeStudents = totalStudents - passedStudents;

    return (
        <Protected roles={["FACILITATOR", "SUPER_ADMIN"]}>
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-32">
                
                {/* --- HEADER & NAVIGATION --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{course?.title}</h1>
                        <p className="text-gray-500 mt-1 flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${course?.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{course?.isPublished ? 'PUBLISHED' : 'DRAFT'}</span>
                            • {course?.modules?.length || 0} Modul
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setActiveTab('content')} className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${activeTab === 'content' ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`} aria-label="Buka Editor Materi" title="Editor Materi">
                            <BookOpen size={18} aria-hidden="true"/> Editor Materi
                        </button>
                        <button type="button" onClick={() => setActiveTab('operator')} className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${activeTab === 'operator' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`} aria-label="Buka Dashboard Operator" title="Dashboard Operator">
                            <LayoutDashboard size={18} aria-hidden="true"/> Dashboard Operator
                        </button>
                    </div>
                </div>

                {/* --- TAB: EDITOR MATERI (FULL RESTORED) --- */}
                {activeTab === 'content' && (
                    <div className="animate-in fade-in duration-300 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* KIRI: Cover & Info & Tim Fasilitator */}
                            <div className="md:col-span-1 space-y-6">
                                <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">{course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover Kursus" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Ganti Cover" title="Ganti Cover">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Input File Cover"/></div></div>
                                
                                {/* [RESTORED] TIM FASILITATOR */}
                                {currentUserRole === 'SUPER_ADMIN' && (<div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col"><div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" title="Simpan Tim" aria-label="Simpan Tim">Simpan</button></div><div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">{facilitators.map((user: any) => (<label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}><input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih fasilitator ${user.name}`} title={`Pilih ${user.name}`} /><div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div></label>))}</div><input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" title="Cari Fasilitator" /></div>)}
                            </div>
                            
                            {/* KANAN: Modul & Lesson List */}
                            <div className="md:col-span-2 space-y-6">
                                <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">Struktur Modul</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 flex items-center gap-2" aria-label="Tambah Modul Baru" title="Tambah Modul">+ Tambah Modul</button></div>
                                
                                {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Judul Modul"/><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" aria-label="Jam Pelajaran"/></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih Fasilitator"><option value="">-- Pilih Fasilitator --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal Pelaksanaan Modul" /></div></div><div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetModuleForm} className="text-sm text-gray-500 font-bold" aria-label="Batal Simpan Modul">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold" aria-label="Simpan Modul">Simpan</button></div></form>)}
                                
                                <DragDropContext onDragEnd={onDragEnd}><Droppable droppableId="all-modules" type="module">{(provided) => (<div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">{course?.modules?.map((m: any, idx: number) => (<Draggable key={m._id} draggableId={m._id} index={idx}>{(provided) => (<div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-xl overflow-hidden bg-white shadow-sm"><div className="bg-gray-50 p-3 flex justify-between items-center" {...provided.dragHandleProps}>
                                    <div className="flex items-center gap-3"><span className="cursor-grab text-gray-400" aria-label="Geser Modul">☰</span><div><span className="font-bold text-gray-700">{m.title}</span><div className="flex gap-2 text-[10px] mt-1 text-gray-500 font-medium">
                                        <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">{m.jp} JP</span>
                                        {m.facilitatorId && <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100 flex items-center gap-1">👤 {getFacilitatorName(m.facilitatorId)}</span>}
                                        {m.scheduleDate && <span className="bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded border border-yellow-100 flex items-center gap-1">📅 {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}
                                    </div></div></div>
                                    <div className="flex gap-2"><button type="button" onClick={() => startEditModule(m)} className="text-xs text-blue-600 font-bold" aria-label="Edit Modul">Edit</button><button type="button" onClick={() => toggleStatus(m._id)} className={`text-[10px] px-2 py-0.5 rounded font-bold ${m.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`} aria-label="Toggle Status Modul">{m.isActive ? 'AKTIF' : 'NON-AKTIF'}</button></div></div>
                                
                                <Droppable droppableId={m._id} type="lesson">{(provided) => (<div ref={provided.innerRef} {...provided.droppableProps} className="p-3 space-y-2">{m.lessons?.map((l: any, lIdx: number) => (<Draggable key={l._id} draggableId={l._id} index={lIdx}>{(provided) => (
                                    // [FIX] LIST LESSON ITEM (LENGKAP SESUAI GAMBAR 1)
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-2 bg-white border rounded hover:bg-gray-50">
                                        <div className="flex gap-2 items-center">
                                            <span className="cursor-grab text-gray-400" aria-hidden="true">::</span>
                                            <span className="text-lg" aria-hidden="true">{l.type === 'video_url' ? '🎞️' : l.type === 'quiz' ? '📝' : l.type === 'essay' ? '✍️' : '📄'}</span>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">{l.title}</p>
                                                <div className="flex gap-2 items-center flex-wrap mt-0.5">
                                                    <span className="text-[10px] text-gray-500 uppercase font-bold">{l.type}</span>
                                                    {l.jp > 0 && <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 rounded border border-blue-100 font-medium">{l.jp} JP</span>}
                                                    {l.isMandatory ? <span className="text-[10px] bg-red-50 text-red-700 px-1.5 rounded border border-red-100 font-medium">Wajib</span> : <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 rounded border font-medium">Opsional</span>}
                                                    {l.facilitatorId && <span className="text-[10px] text-purple-600 flex items-center gap-1 font-medium">👤 {getFacilitatorName(l.facilitatorId)}</span>}
                                                    {l.scheduleDate && <span className="text-[10px] text-blue-600 flex items-center gap-1 font-medium">📅 {new Date(l.scheduleDate).toLocaleDateString('id-ID')}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button type="button" onClick={() => startEditLesson(m._id, l)} className="text-blue-500 text-xs font-bold" aria-label="Edit Materi">Edit</button>
                                            <button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-red-500 text-xs font-bold" aria-label="Hapus Materi">Hapus</button>
                                        </div>
                                    </div>
                                )}</Draggable>))}{provided.placeholder}
                                
                                {activeModId === m._id ? (
                                    <div id={`form-${m._id}`} className="bg-blue-50 p-4 rounded border border-blue-200 mt-2 space-y-3">
                                        {/* [FIX] FORM LESSON DENGAN URUTAN SESUAI GAMBAR 2 */}
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="col-span-4"><select className="w-full p-2 border rounded text-sm bg-white" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Pilih Tipe Konten"><option value="lesson">📄 Teks Materi</option><option value="video_url">🎞️ Video YouTube</option><option value="essay">📝 Esai</option><option value="quiz">🧩 Kuis Pilihan Ganda</option><option value="upload_doc">📤 Tugas Upload</option><option value="virtual_class">🎥 Kelas Virtual</option><option value="poll">📊 Polling</option><option value="google_classroom">🏫 Google Classroom</option></select></div>
                                            <div className="col-span-6"><input className="w-full p-2 border rounded text-sm" placeholder="Judul Materi..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi"/></div>
                                            <div className="col-span-2"><input type="number" className="w-full p-2 border rounded text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="Jam Pelajaran"/></div>
                                        </div>
                                        
                                        {/* SETTINGAN BARIS KE-2 (Fasilitator, Tanggal, Wajib) */}
                                        <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded border border-blue-100">
                                            <div><label className="text-[10px] font-bold text-gray-500 block mb-1">Fasilitator (Opsional)</label><select className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesFacilitatorId} onChange={e=>setLesFacilitatorId(e.target.value)} aria-label="Pilih Fasilitator Lesson"><option value="">-- Ikut Modul --</option>{activeTeam.map((f:any)=><option key={f._id} value={f._id}>{f.name}</option>)}</select></div>
                                            <div><label className="text-[10px] font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesSchedule} onChange={e=>setLesSchedule(e.target.value)} aria-label="Tanggal Lesson"/></div>
                                            <div className="flex items-center h-full pt-4"><label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e=>setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded"/> Wajib diselesaikan?</label></div>
                                        </div>
                                        
                                        {/* DETAIL KONTEN KHUSUS */}
                                        {lesType === 'essay' && (
                                            <div className="bg-white p-3 rounded border">
                                                <div className="mb-2"><label className="text-xs font-bold text-gray-500">Instruksi Soal:</label><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-32 mb-10"/></div>
                                                <label className="text-xs font-bold text-gray-500 block mt-4">Pertanyaan Esai:</label>
                                                {essayQuestions.map((q, ix) => (<div key={ix} className="flex gap-2 mb-2"><textarea className="flex-1 p-2 border rounded text-sm h-16" value={q} onChange={e=>updateEssay(ix, e.target.value)} placeholder={`Pertanyaan ${ix+1}`} aria-label={`Pertanyaan Esai ${ix+1}`}/>{essayQuestions.length > 1 && <button type="button" onClick={()=>removeEssay(ix)} className="text-red-500 font-bold" aria-label="Hapus Pertanyaan">x</button>}</div>))}
                                                <button type="button" onClick={addEssayRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Pertanyaan">+ Tambah Pertanyaan</button>
                                                <div className="mt-3 flex items-center gap-2 bg-amber-50 p-2 rounded"><label className="text-xs font-bold text-amber-800">⏱ Timer (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="w-16 border p-1 rounded text-xs" aria-label="Durasi Esai"/><label className="text-xs ml-2"><input type="checkbox" checked={useEssayTimer} onChange={e=>setUseEssayTimer(e.target.checked)}/> Aktifkan</label></div>
                                            </div>
                                        )}

                                        {lesType === 'quiz' && (
                                            <div className="bg-white p-3 rounded border">
                                                <div className="flex gap-2 items-center mb-2"><label className="text-xs font-bold">Durasi (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="w-20 border p-1 rounded" aria-label="Durasi Kuis"/></div>
                                                {questions.map((q, ix) => (
                                                    <div key={ix} className="p-2 border rounded bg-gray-50 mb-2 relative">
                                                        <button type="button" onClick={()=>removeQuestion(ix)} className="absolute top-1 right-1 text-red-500 font-bold text-xs" aria-label="Hapus Soal">x</button>
                                                        <input className="w-full p-1 border rounded mb-1 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e=>updateQuestion(ix, 'question', e.target.value)} aria-label={`Pertanyaan ${ix+1}`}/>
                                                        <div className="grid grid-cols-2 gap-2">{q.options.map((o:string, oi:number) => <input key={oi} className={`w-full p-1 border text-xs ${q.correctIndex===oi?'bg-green-100 border-green-300':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix, 'options', e.target.value, oi)} aria-label={`Opsi ${oi+1}`}/>)}</div>
                                                        <div className="mt-1 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix, 'correctIndex', Number(e.target.value))} className="w-10 border" aria-label="Index Jawaban Benar"/></div>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={addQuestionRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Soal">+ Tambah Soal</button>
                                            </div>
                                        )}
                                        
                                        {lesType === 'poll' && (
                                            <div className="bg-white p-3 rounded border">
                                                <input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} aria-label="Pertanyaan Polling"/>
                                                {pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2 mb-1"><input className="flex-1 p-1 border rounded text-xs" value={opt} onChange={e=>updatePollOption(idx, e.target.value)} placeholder={`Opsi ${idx+1}`} aria-label={`Opsi ${idx+1}`}/>{pollOptions.length > 2 && <button onClick={()=>removePollOption(idx)} className="text-red-500 font-bold" aria-label="Hapus Opsi">x</button>}</div>))}
                                                <button type="button" onClick={addPollOption} className="text-xs text-blue-600 font-bold" aria-label="Tambah Opsi">+ Opsi</button>
                                            </div>
                                        )}

                                        {['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded border"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-48 mb-12" placeholder="Tulis materi..."/></div>)}
                                        {lesType === 'video_url' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded text-sm" placeholder="Link YouTube..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="URL Video"/></div>)}
                                        {lesType === 'virtual_class' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded text-sm" placeholder="Link Zoom/Meet..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="URL Meeting"/></div>)}
                                        
                                        {/* [FIX] GOOGLE CLASSROOM DENGAN TOMBOL CONNECT */}
                                        {lesType === 'google_classroom' && (
                                            <div className="bg-white p-4 rounded border border-green-200 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label>
                                                    <div className="flex gap-2">
                                                        {googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Kelas"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putuskan Akun"><LogOut size={12}/> Putuskan</button></>)}
                                                        {(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}
                                                    </div>
                                                </div>
                                                {googleToken ? (
                                                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                                        {classroomCourses.length > 0 ? (
                                                            <select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>
                                                        ) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}
                                                        {selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas">Lihat Kelas ↗</a></div>)}
                                                    </div>
                                                ) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}
                                            </div>
                                        )}
                                        
                                        {/* FILE UPLOAD FOR SPECIFIC TYPES */}
                                        {['image','download_doc','slide'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Pilih File"/></div>)}

                                        <div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetLessonForm} className="text-xs font-bold text-gray-500" aria-label="Batal Simpan Materi">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" aria-label="Simpan Materi">Simpan Materi</button></div>
                                    </div>
                                ) : (
                                    <button type="button" onClick={()=>{handleAddNewContent(m._id)}} className="w-full py-2 border-2 border-dashed border-gray-200 rounded text-xs text-gray-400 font-bold hover:border-blue-300 hover:text-blue-600 mt-2" aria-label="Tambah Konten Baru">+ Tambah Konten</button>
                                )}
                                
                                </div>)}</Droppable></div>)}</Draggable>))}{provided.placeholder}</div>)}</Droppable></DragDropContext>
                            </div>
                        </div>
                        
                        {/* RESTORED: KOMPETENSI & SERTIFIKAT */}
                        <div className="border-t pt-8 space-y-8">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Unit Kompetensi</h2>
                                <CompetencyForm initialData={competencies} onChange={(data) => setCompetencies(data)} />
                                <div className="mt-4 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" checked={includeCompetencies} onChange={e=>setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Tampilkan Kompetensi di Sertifikat"/>
                                        <span className="text-sm font-bold text-gray-700">Tampilkan daftar kompetensi di halaman belakang sertifikat?</span>
                                    </label>
                                    <button type="button" onClick={handleSaveCompetencies} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Pengaturan Sertifikat</h2>
                                <CertificateConfigForm initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} />
                                
                                {/* [RESTORED] TABEL PREVIEW DATA SERTIFIKAT */}
                                {certConfig && (
                                    <div className="mt-6 border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 shadow-sm">
                                        <div className="bg-gray-50 px-5 py-3 border-b flex items-center gap-2 font-bold text-gray-700 text-sm"><FileBadge size={16}/> Data Konfigurasi Tersimpan (Preview)</div>
                                        <div className="p-5 bg-white grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                            <div>
                                                <p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><Hash size={12}/> Format Nomor</p>
                                                <p className="font-mono bg-gray-50 border px-3 py-2 rounded text-gray-800">{certConfig.certificateNumber || '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><Calendar size={12}/> Tanggal Pelaksanaan</p>
                                                <p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{certConfig.executionDate ? new Date(certConfig.executionDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><MapPin size={12}/> Kota Penerbit</p>
                                                <p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{certConfig.city || '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><UserCheck size={12}/> Penanda Tangan</p>
                                                <p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{certConfig.signatoryName} <span className="font-normal text-gray-500 text-xs block">({certConfig.signatoryPosition})</span></p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* [FIX] PUBLISH BUTTON MOVED TO BOTTOM */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3">
                            <h3 className="text-lg font-bold text-gray-800">Status Publikasi</h3>
                            <button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Ubah Status Publikasi" title="Ubah Status">{course?.isPublished ? 'Tarik Kembali (Draft)' : '🚀 PUBLISH SEKARANG'}</button>
                        </div>
                    </div>
                )}

                {/* --- TAB: DASHBOARD OPERATOR (TETAP ADA & SINKRON) --- */}
                {activeTab === 'operator' && (
                    <div className="animate-in slide-in-from-right-4 duration-300 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between"><div><p className="text-gray-500 text-xs font-bold uppercase">Total Peserta</p><h3 className="text-3xl font-black text-gray-900 mt-1">{totalStudents}</h3></div><div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users size={24}/></div></div>
                            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between"><div><p className="text-gray-500 text-xs font-bold uppercase">Lulus / Selesai</p><h3 className="text-3xl font-black text-green-600 mt-1">{passedStudents}</h3></div><div className="p-3 bg-green-50 text-green-600 rounded-xl"><Award size={24}/></div></div>
                            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between"><div><p className="text-gray-500 text-xs font-bold uppercase">Sedang Aktif</p><h3 className="text-3xl font-black text-orange-500 mt-1">{activeStudents}</h3></div><div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><BarChart3 size={24}/></div></div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap gap-4 justify-between items-center sticky top-4 z-30">
                            <div className="flex items-center gap-3 flex-1 min-w-[300px]">
                                <div className="relative flex-1"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Cari nama peserta..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} aria-label="Cari Peserta" /></div>
                                <select className="p-2.5 border border-gray-300 rounded-xl text-sm bg-gray-50 min-w-[200px]" value={selectedActionId} onChange={e=>setSelectedActionId(e.target.value)} aria-label="Pilih Aksi Massal"><option value="">-- Pilih Materi Aksi Massal --</option>{actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}</select>
                            </div>
                            <button type="button" onClick={fetchParticipants} disabled={loadingParticipants} className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors shadow-lg" aria-label="Refresh Data"><RefreshCw size={16} className={loadingParticipants ? 'animate-spin' : ''}/> {loadingParticipants ? 'Loading...' : 'Refresh Data'}</button>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b"><tr><th className="p-4">Peserta</th><th className="p-4">Progress Realtime</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Aksi Cepat</th><th className="p-4 text-center">Chat</th><th className="p-4 text-center">Detail</th><th className="p-4 text-center text-red-500">Hapus</th></tr></thead>
                                <tbody className="text-sm divide-y divide-gray-100">{participants.filter(p => (p.user?.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => { const userObj = p.user || {}; const isCompleted = selectedActionId && p.completedLessons?.includes(selectedActionId); const isPassed = p.progress === 100 || p.isCompleted; return ( <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group"><td className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 overflow-hidden border border-gray-300">{userObj.avatarUrl ? <img src={getImageUrl(userObj.avatarUrl)} alt={userObj.name} className="w-full h-full object-cover"/> : (userObj.name?.charAt(0) || 'U')}</div><div><div className="font-bold text-gray-900">{userObj.name || 'Tanpa Nama'}</div><div className="text-xs text-gray-500">{userObj.email}</div></div></div></td><td className="p-4"><div className="w-full max-w-[140px]"><div className="flex justify-between text-xs mb-1 font-bold"><span>{p.progress}%</span></div><div className="h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200"><div className={`h-full rounded-full transition-all duration-500 ${isPassed ? 'bg-green-500' : 'bg-indigo-500'}`} style={{width: `${p.progress}%`}}></div></div></div></td><td className="p-4 text-center">{isPassed ? <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200 inline-flex items-center gap-1"><CheckCircle2 size={12}/> LULUS</span> : <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full border border-orange-200">PROSES</span>}</td><td className="p-4 text-center">{selectedActionId ? (<button type="button" onClick={() => handleParticipantAction(userObj._id, 'pass')} disabled={isCompleted} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all shadow-sm ${isCompleted ? 'bg-green-50 text-green-600 border-green-200 cursor-default' : 'bg-white border-gray-300 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'}`} aria-label={isCompleted ? "Sudah Selesai" : "Luluskan Peserta"}>{isCompleted ? '✓ Selesai' : '⚡ Luluskan'}</button>) : <span className="text-gray-300">-</span>}</td><td className="p-4 text-center"><button type="button" onClick={() => setChatTargetStudent(p)} className="p-2 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all" aria-label="Chat Personal" title="Chat"><MessageCircle size={20}/></button></td><td className="p-4 text-center"><button type="button" onClick={() => { setStudentDetail(p); setShowStudentDetailModal(true); }} className="p-2 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all" aria-label="Lihat Detail Peserta" title="Detail"><Eye size={20}/></button></td><td className="p-4 text-center"><button type="button" onClick={() => handleRejectParticipant(p._id, userObj.name)} className="p-2 rounded-full text-gray-300 hover:text-red-600 hover:bg-red-50 transition-all" aria-label="Hapus Peserta" title="Hapus"><Trash2 size={18}/></button></td></tr> ); })}</tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- MODALS --- */}
                {chatTargetStudent && <PersonalChatModal student={chatTargetStudent} onClose={() => setChatTargetStudent(null)} />}
                {showStudentDetailModal && studentDetail && (
                    <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                            <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md"><h3 className="font-bold flex items-center gap-2"><UserIcon size={20}/> Detail: {studentDetail.user?.name}</h3><button type="button" onClick={() => setShowStudentDetailModal(false)} aria-label="Tutup Modal"><X size={24}/></button></div>
                            <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
                                {course?.modules?.map((m:any) => (<div key={m._id} className="bg-white border rounded-xl overflow-hidden shadow-sm"><div className="bg-gray-100 px-4 py-2 border-b font-bold text-sm text-gray-700">{m.title}</div><div className="divide-y">{m.lessons.map((l:any) => { const isDone = studentDetail.completedLessons?.includes(l._id); return (<div key={l._id} className="p-3 flex justify-between items-center hover:bg-gray-50"><div className="flex items-center gap-3"><div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isDone ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>{isDone && <CheckCircle2 size={12}/>}</div><span className={`text-sm ${isDone ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{l.title}</span></div><span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">{l.type}</span></div>); })}</div></div>))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Protected>
    );
}

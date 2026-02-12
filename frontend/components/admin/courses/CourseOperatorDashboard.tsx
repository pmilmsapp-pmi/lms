'use client';

import { useState, useEffect, useMemo } from 'react';
import { api, getImageUrl, getFileUrl, API_BASE_URL } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import { 
    RefreshCw, Users, Eye, MessageCircle, Trash2, Award, 
    Send, X, Check, CheckCircle, FileText, Download, BarChart2, PieChart,
    UserCheck, XCircle, FileSearch, User, ExternalLink,
    // Import Icon yang sama dengan Play Page
    Video, MonitorPlay, FileBadge, Layout, Image as ImageIcon, UploadCloud, 
    School, Mic, Globe, Layers, Gamepad2, Camera, Smile, BookOpen
} from 'lucide-react';
import CourseGroupChat from '@/components/CourseGroupChat'; 
import ChatNotificationBadge from '@/components/ChatNotificationBadge';

// --- [FIX] HELPER: IKON SINKRON DENGAN EDITOR/PLAY (BERWARNA) ---
const getLessonIcon = (type: string) => {
    switch (type) {
        case 'video_url': return <Video size={16} className="text-red-600" />;
        case 'virtual_class': return <MonitorPlay size={16} className="text-purple-600" />;
        case 'quiz': return <FileBadge size={16} className="text-orange-600" />;
        case 'essay': return <FileText size={16} className="text-indigo-600" />;
        case 'poll': return <BarChart2 size={16} className="text-emerald-600" />;
        case 'slide': return <Layout size={16} className="text-blue-600" />;
        case 'image': return <ImageIcon size={16} className="text-pink-600" />;
        case 'upload_doc': return <UploadCloud size={16} className="text-cyan-600" />;
        case 'download_doc': return <Download size={16} className="text-green-600" />;
        case 'google_classroom': return <School size={16} className="text-yellow-600" />;
        case 'audio': return <Mic size={16} className="text-pink-500" />;
        case 'embed': return <Globe size={16} className="text-teal-600" />;
        case 'flashcard': return <Layers size={16} className="text-orange-500" />;
        case 'game_memory': return <Gamepad2 size={16} className="text-violet-600" />;
        case 'game_scavenger': return <Camera size={16} className="text-rose-600" />;
        case 'game_emoji': return <Smile size={16} className="text-yellow-600" />;
        default: return <BookOpen size={16} className="text-slate-500" />;
    }
};

const cleanId = (id: any) => {
    if (!id) return '';
    if (typeof id === 'object') {
        if (id._id) return String(id._id).trim();
        if (id.id) return String(id.id).trim();
        if (id.toString) return id.toString().trim();
    }
    return String(id).trim();
};

const bruteForceMatch = (item: any, targetId: string): boolean => {
    if (!item || !targetId) return false;
    const cleanTarget = String(targetId).trim();
    if (String(item) === cleanTarget) return true;
    if (cleanId(item) === cleanTarget) return true;
    try {
        const stringified = JSON.stringify(item);
        return stringified.includes(cleanTarget);
    } catch (e) { return false; }
};

// --- [FIX] URL EXTRACTOR UNTUK BERBAGAI STRUKTUR DATA ---
const getSafeUrl = (input: any): string => {
    if (!input) return '';

    // 1. Jika String
    if (typeof input === 'string') {
        const trimmed = input.trim().replace(/^"|"$/g, ''); 
        if (trimmed.startsWith('http') || trimmed.startsWith('/') || trimmed.startsWith('/uploads')) {
            return trimmed;
        }
        try { return getSafeUrl(JSON.parse(trimmed)); } catch (e) { return ''; }
    }

    // 2. Jika Object
    if (typeof input === 'object' && input !== null) {
        // Cek struktur dari UploadController (backend)
        if (input.data && input.data.url) return input.data.url;
        
        // Cek struktur DB (Progress)
        if (input.url && typeof input.url === 'string') return input.url;
        
        // Cek variasi lain
        if (input.secure_url) return input.secure_url;
        if (input.fileUrl) return input.fileUrl;
        
        // Cek nested uploadedFile
        if (input.uploadedFile) return getSafeUrl(input.uploadedFile);
    }

    return '';
};

// --- 1. MODAL DETAIL PENDAFTARAN ---
function RegistrationDetailModal({ data, onClose }: any) {
    if (!data) return null;
    const { user, registrationData, joinedAt } = data;
    const formatLabel = (key: string) => key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Detail Pendaftaran">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shrink-0">
                    <h3 className="font-bold flex items-center gap-2"><FileSearch size={20} /> Detail Pendaftaran</h3>
                    <button onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup" aria-label="Tutup"><X size={20}/></button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                        {user.avatarUrl ? (
                            <img src={getImageUrl(user.avatarUrl)} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100 shadow-sm" alt={user.name}/>
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600"><User size={32} /></div>
                        )}
                        <div>
                            <h4 className="text-lg font-bold text-gray-900">{user.name}</h4>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <span className="inline-block mt-1 text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded border border-indigo-100 font-bold uppercase">{user.role || 'Peserta'}</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {registrationData && Object.entries(registrationData).map(([key, value]: any) => {
                            if (key === 'uploadedFormUrl') {
                                const safeUrl = getSafeUrl(value);
                                return (
                                    <div key={key} className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                        <span className="text-xs text-blue-500 block mb-1 font-bold">📄 Formulir Pendaftaran (Scan)</span>
                                        {safeUrl ? (
                                            <a href={getFileUrl(safeUrl)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-700 font-bold text-sm hover:underline mt-1">
                                                <Download size={16}/> Lihat / Download File
                                            </a>
                                        ) : (
                                            <span className="text-red-500 text-xs italic">File tidak valid</span>
                                        )}
                                    </div>
                                );
                            }
                            return (
                                <div key={key} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <span className="text-xs text-gray-500 block mb-1">{formatLabel(key)}</span>
                                    <span className="text-sm font-medium text-gray-800 break-words">{value?.toString() || '-'}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="p-4 border-t bg-gray-50 flex justify-end">
                    <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-bold" title="Tutup">Tutup</button>
                </div>
            </div>
        </div>
    );
}

// --- 2. PERSONAL CHAT MODAL ---
function PersonalChatModal({ student, onClose }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const targetId = student.user?._id || student._id || student.user; 
  const targetName = student.user?.name || student.name || 'User';

  useEffect(() => {
    if (targetId) loadHistory();
    const interval = setInterval(() => { if (targetId) loadHistory(); }, 3000); 
    return () => clearInterval(interval);
  }, [targetId]);

  const loadHistory = async () => {
    try {
      const res = await api(`/api/chat/${targetId}?t=${Date.now()}`);
      setMessages(res.messages || []);
    } catch (e) { console.error(e); }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      await api('/api/chat/send', { method: 'POST', body: { recipientId: targetId, message: newMessage } });
      setNewMessage('');
      loadHistory();
    } catch (error: any) { alert('Gagal: ' + error.message); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Chat dengan ${targetName}`}>
      <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95">
        <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
          <div className="font-bold flex items-center gap-2"><MessageCircle size={18}/> Chat: {targetName}</div>
          <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup"><X size={20}/></button>
        </div>
        <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-2">
          {messages.map((msg: any, i: number) => (
            <div key={i} className={`p-2 rounded-lg text-sm max-w-[80%] ${msg.sender === 'me' ? 'bg-indigo-100 ml-auto text-right' : 'bg-white border'}`}>{msg.message}</div>
          ))}
        </div>
        <form onSubmit={handleSend} className="p-3 border-t flex gap-2 bg-white">
          <input className="flex-1 border rounded-full px-3 py-1.5 text-sm outline-none focus:border-indigo-500" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Tulis pesan..." aria-label="Tulis Pesan" />
          <button type="submit" className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700" title="Kirim Pesan" aria-label="Kirim"><Send size={14}/></button>
        </form>
      </div>
    </div>
  );
}

// --- 3. STUDENT DETAIL MODAL ---
function StudentDetailModal({ student, course, onClose, onRefresh }: any) {
    const [activeTab, setActiveTab] = useState<'progress' | 'answers'>('progress');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [progressData, setProgressData] = useState<any>(null); 
    const [debugStatus, setDebugStatus] = useState("Loading...");

    useEffect(() => {
        const fetchDeepProgress = async () => {
            if (!student?.user?._id) return;
            const userId = student.user._id;
            const courseId = student.course || course._id;
            
            setDebugStatus(`Fetching via /api/courses/${courseId}/student/${userId}/debug ...`);

            try {
                const res = await api(`/api/courses/${courseId}/student/${userId}/debug`);
                
                if (res && res.progressData && res.progressData !== 'No Progress') {
                    setProgressData(res.progressData);
                    setDebugStatus(`✅ Data Ditemukan! ${res.progressData.completedCount} materi selesai.`);
                } else {
                    setDebugStatus("⚠️ User belum memulai materi.");
                    setProgressData({ completedIDs: [], details: [] }); 
                }
            } catch (e: any) {
                setDebugStatus(`Error Fetching: ${e.message}`);
                setProgressData({ completedIDs: [], details: [] });
            }
        };
        fetchDeepProgress();
    }, [student]);

    const completedLessons = progressData?.completedIDs || student.completedLessons || [];
    const lessonDetails = progressData?.details || student.lessonDetails || [];
    
    const getQuizScore = (lessonId: string) => {
        let detail = lessonDetails.find((d: any) => 
            (bruteForceMatch(d.lessonId, lessonId) || bruteForceMatch(d, lessonId)) && d.type === 'quiz'
        );

        if (!detail && progressData?.quizScores) {
            const legacyScore = progressData.quizScores.find((q: any) => 
                bruteForceMatch(q.lessonId, lessonId)
            );
            if (legacyScore) {
                detail = {
                    score: legacyScore.score,
                    attempts: legacyScore.attempts,
                    submittedAt: legacyScore.createdAt || legacyScore.updatedAt
                };
            }
        }
        return detail;
    };

    const getLessonAnswer = (lessonId: string) => {
        return lessonDetails.find((d: any) => bruteForceMatch(d.lessonId, lessonId) || bruteForceMatch(d, lessonId));
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await onRefresh();
        const userId = student.user._id;
        const courseId = student.course || course._id;
        try {
            const res = await api(`/api/courses/${courseId}/student/${userId}/debug`);
            if(res?.progressData) setProgressData(res.progressData);
        } catch(e) {}
        setTimeout(() => setIsRefreshing(false), 500);
    };

    if (!student) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Detail Siswa">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
            <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md shrink-0">
                <div className="flex items-center gap-3">
                    <h3 className="font-bold flex items-center gap-2"><Users size={20} /> Detail: {student.user?.name}</h3>
                    <button onClick={handleRefresh} className={`bg-indigo-500 hover:bg-indigo-400 p-1.5 rounded-full transition-all ${isRefreshing ? 'animate-spin' : ''}`} title="Refresh" aria-label="Refresh">
                        <RefreshCw size={16} />
                    </button>
                </div>
                <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Modal" aria-label="Tutup"><X size={24} /></button>
            </div>
            
            <div className="flex border-b bg-gray-50 shrink-0">
                <button onClick={() => setActiveTab('progress')} className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === 'progress' ? 'border-indigo-600 text-indigo-700 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100'}`}>📊 Progress Belajar</button>
                <button onClick={() => setActiveTab('answers')} className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === 'answers' ? 'border-indigo-600 text-indigo-700 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100'}`}>📝 Jawaban</button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-6">
                {activeTab === 'progress' && (
                    <div className="space-y-4">
                        {course?.modules?.map((m: any) => (
                            <div key={m._id} className="bg-white border rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-gray-100 px-4 py-2 border-b font-bold text-sm text-gray-700 flex justify-between"><span>{m.title}</span><span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded text-gray-600 uppercase">Modul</span></div>
                                <div className="divide-y">
                                    {m.lessons.map((l: any) => { 
                                        const isDone = completedLessons.some((id: any) => bruteForceMatch(id, l._id));
                                        return (
                                            <div key={l._id} className="p-3 flex justify-between items-center hover:bg-gray-50">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isDone ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>
                                                        {isDone && <Check size={12} />}
                                                    </div>
                                                    <span className={`text-sm ${isDone ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{l.title}</span>
                                                </div>
                                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${isDone ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                                    {l.type?.replace('game_', 'Game ')}
                                                </span>
                                            </div>
                                        ); 
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {activeTab === 'answers' && (
                    <div className="space-y-6">
                        {course?.modules?.map((m: any) => (
                            <div key={m._id} className="space-y-3">
                                <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider sticky top-0 bg-gray-50 py-2 z-10">Modul: {m.title}</h4>
                                {m.lessons.map((l: any) => {
                                    if (!['quiz', 'essay', 'upload_doc', 'poll', 'game_memory', 'game_scavenger', 'game_emoji'].includes(l.type)) return null;
                                    
                                    const answerData = getLessonAnswer(l._id);
                                    const quizData = getQuizScore(l._id);
                                    
                                    return (
                                        <div key={l._id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                            <div className="flex justify-between items-start mb-3 border-b pb-2">
                                                <div><h5 className="font-bold text-gray-800 text-sm">{l.title}</h5><span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase font-bold flex items-center gap-1 mt-1 w-fit">{getLessonIcon(l.type)} {l.type.replace('game_', 'Game ')}</span></div>
                                                <span className="text-[10px] text-gray-400">
                                                    {(answerData?.submittedAt || quizData?.submittedAt) 
                                                        ? new Date(answerData?.submittedAt || quizData?.submittedAt).toLocaleString('id-ID') 
                                                        : 'Belum dikerjakan'}
                                                </span>
                                            </div>

                                            {!answerData && !quizData ? (<div className="text-sm text-gray-400 italic">Belum ada data jawaban.</div>) : (
                                                <div className="text-sm space-y-3">
                                                    {l.type === 'upload_doc' && answerData?.uploadedFile && (
                                                        <div className="flex flex-col gap-2">
                                                            {/* [FIX] Gunakan getSafeUrl yang aman */}
                                                            {(() => {
                                                                const safeUrl = getSafeUrl(answerData.uploadedFile);
                                                                // Raw data untuk debug jika tetap error
                                                                const rawData = JSON.stringify(answerData.uploadedFile);
                                                                
                                                                return (
                                                                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded border border-blue-100">
                                                                        <FileText className="text-blue-500 shrink-0" size={24} />
                                                                        <div className="flex-1 overflow-hidden"><p className="font-bold truncate text-sm">Dokumen Jawaban</p></div>
                                                                        {safeUrl ? (
                                                                            <a href={getFileUrl(safeUrl)} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 hover:bg-blue-700 transition-colors" title="Lihat/Download File">
                                                                                <ExternalLink size={14}/> Buka File
                                                                            </a>
                                                                        ) : (
                                                                            <div className="flex flex-col">
                                                                                <span className="text-red-500 text-xs italic font-bold">Link tidak valid</span>
                                                                                <span className="text-[9px] text-gray-400 break-all" title={rawData}>
                                                                                    Raw: {rawData.substring(0, 30)}...
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })()}
                                                        </div>
                                                    )}
                                                    {l.type === 'essay' && answerData?.essayAnswers && (<div className="space-y-4">{answerData.essayAnswers.map((ans: any, idx: number) => (<div key={idx} className="bg-gray-50 p-3 rounded border"><p className="text-xs font-bold text-gray-500 mb-1">Jawab:</p><div className="bg-white p-2 rounded border border-gray-200 text-gray-700" dangerouslySetInnerHTML={{ __html: ans }} /></div>))}</div>)}
                                                    
                                                    {l.type === 'quiz' && quizData && (
                                                        <div className="flex items-center gap-4 bg-yellow-50 p-3 rounded border border-yellow-200">
                                                            <div className="text-center"><div className="text-3xl font-extrabold text-yellow-700">{quizData.score}</div></div>
                                                            <div className="text-xs text-gray-600 border-l pl-4 border-yellow-200 space-y-1">
                                                                <p>Status: <span className={`font-bold ${quizData.score >= 70 ? 'text-green-600' : 'text-red-500'}`}>{quizData.score >= 70 ? 'Lulus' : 'Belum Lulus'}</span></p>
                                                                <p>Percobaan: {quizData.attempts || 1}x</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    
                                                    {l.type === 'poll' && answerData && (
                                                        <div className="flex items-center gap-2 bg-purple-50 p-3 rounded border border-purple-200 text-purple-800"><BarChart2 size={18} /><span>Pilihan: <strong>{answerData.pollAnswer || '-'}</strong></span></div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8 border-t pt-4">
                    <div className="bg-blue-50 p-4 rounded text-xs font-mono text-blue-800 border border-blue-200">
                        <strong className="block mb-2">🔍 STATUS SINKRONISASI API (Debug Endpoint):</strong>
                        <div className="mb-2 bg-white p-2 rounded border">{debugStatus}</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
    );
}

// --- MAIN COMPONENT ---
interface CourseOperatorProps { courseId: string; course: any; facilitators?: any[]; }

export default function CourseOperatorDashboard({ courseId, course, facilitators = [] }: CourseOperatorProps) {
  const { user } = useAuth();
  const [participants, setParticipants] = useState<any[]>([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [participantFilter, setParticipantFilter] = useState('');
  const [actionOptions, setActionOptions] = useState<any[]>([]);
  const [selectedActionId, setSelectedActionId] = useState<string>('');
  
  const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
  const [showGroupChat, setShowGroupChat] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);
  const [processingAction, setProcessingAction] = useState(false);
  const [registrationDetail, setRegistrationDetail] = useState<any>(null);
  const [pollStats, setPollStats] = useState<any>({});

  const activeFacilitators = (course.facilitatorIds && course.facilitatorIds.length > 0) ? course.facilitatorIds : facilitators;

  const currentStudentDetail = useMemo(() => {
      if (!participants || participants.length === 0) return null;
      return participants.find(p => p.user?._id === selectedStudentId) || null;
  }, [participants, selectedStudentId]);

  useEffect(() => {
    if (course?.modules) {
      const opts: any[] = [];
      course.modules.forEach((m: any) => {
        m.lessons?.forEach((l: any) => {
          let label = l.title;
          const typeMap: any = { 
              quiz: '📝 Kuis', essay: '📝 Esai', upload_doc: '📤 Upload', 
              poll: '📊 Polling', game_memory: '🎮 Memory', game_scavenger: '📸 Scavenger' 
          };
          label = `${typeMap[l.type] || '📄'} ${l.title}`;
          opts.push({ id: l._id, label, type: l.type });
        });
      });
      setActionOptions(opts);
    }
  }, [course]);

  // --- FORCE FETCH DENGAN DEBUG ENDPOINT AGAR POLLING MUNCUL ---
  const fetchParticipants = async (isBackground = false) => {
    if (!isBackground) setLoadingParticipants(true);
    try {
      // 1. Ambil List Peserta Dasar (Enrollments)
      const res = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`);
      const rawParticipants = res.participants || [];
      
      setParticipants(rawParticipants); 

      // 2. BACKGROUND: Coba cari data progress via DEBUG endpoint satu-persatu
      if (rawParticipants.length > 0) {
          const hydratedData = await Promise.all(rawParticipants.map(async (p: any) => {
              if (p.status === 'active') {
                  try {
                      const debugRes = await api(`/api/courses/${courseId}/student/${p.user._id}/debug`);
                      if (debugRes && debugRes.progressData && debugRes.progressData !== 'No Progress') {
                          return { 
                              ...p, 
                              completedLessons: debugRes.progressData.completedIDs || [],
                              lessonDetails: debugRes.progressData.details || [],
                              quizScores: debugRes.progressData.quizScores || []
                          };
                      }
                  } catch (e) { }
              }
              return p; 
          }));
          
          setParticipants(hydratedData); 
          calculatePollStats(hydratedData);
      } else {
          calculatePollStats([]);
      }

    } catch (error) { console.error('Gagal load peserta'); } finally { if (!isBackground) setLoadingParticipants(false); }
  };

  const calculatePollStats = (data: any[]) => {
      const stats: any = {};
      if (!course?.modules) return;

      course.modules.forEach((m: any) => {
          m.lessons.forEach((l: any) => {
              if (l.type === 'poll') {
                  const lessonId = l._id;
                  const counts: any = {};
                  let totalVotes = 0;
                  l.pollOptions?.forEach((opt: any) => { 
                      const label = typeof opt === 'string' ? opt : (opt.text || 'Option');
                      counts[label] = 0; 
                  });

                  data.forEach((p: any) => {
                      const details = p.lessonDetails || [];
                      const detail = details.find((d: any) => bruteForceMatch(d, lessonId) || bruteForceMatch(d.lessonId, lessonId));
                      const ans = detail?.pollAnswer;
                      if (ans) {
                          const matchedKey = Object.keys(counts).find(key => bruteForceMatch(key, ans) || bruteForceMatch(ans, key));
                          if (matchedKey) { counts[matchedKey]++; totalVotes++; }
                      }
                  });
                  stats[lessonId] = { counts, totalVotes, title: l.title };
              }
          });
      });
      setPollStats(stats);
  };

  useEffect(() => {
    fetchParticipants();
    const interval = setInterval(() => fetchParticipants(true), 30000); 
    return () => clearInterval(interval);
  }, [courseId]);

  const handleVerifyEnrollment = async (enrollmentId: string, action: 'approve' | 'reject', name: string) => {
    if (!confirm(`Konfirmasi ${action === 'approve' ? 'Setujui' : 'Tolak'} pendaftaran ${name}?`)) return;
    try { 
        await api('/api/courses/verify-enrollment', { method: 'POST', body: { enrollmentId, action } }); 
        fetchParticipants(); 
    } catch (e: any) { alert(e.message); }
  };
  
  const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => {
    if (!selectedActionId) return alert('Pilih Materi dulu!');
    setProcessingAction(true);
    const realUserId = participants.find(p => (p.user?._id === studentId) || (p.user === studentId))?.user?._id || studentId;
    try {
        const endpoint = action === 'pass' ? 'mark-complete-lesson' : 'reset-quiz';
        const body = action === 'pass' 
            ? { studentId: realUserId, lessonId: selectedActionId, courseId }
            : { studentId: realUserId, quizId: selectedActionId, courseId };
        await api(`/api/courses/${endpoint}`, { method: 'POST', body });
        await fetchParticipants(); 
        alert("Berhasil!");
    } catch(e:any){ alert("Gagal: " + e.message); } finally { setProcessingAction(false); }
  };

  const handleDownloadCertificate = async (sid: string) => { 
    try {
      const token = localStorage.getItem('token');
      // [FIX] Menggunakan endpoint fallback jika API_BASE_URL undefined
      const BACKEND_URL = (API_BASE_URL || 'http://localhost:4000').replace(/\/$/, '');
      const url = `${BACKEND_URL}/api/courses/certificate/download-admin/${courseId}/${sid}`;
      const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      if (!res.ok) throw new Error("Gagal download");
      const blob = await res.blob();
      const a = document.createElement('a'); a.href = window.URL.createObjectURL(blob); a.download = `Sertifikat-${sid}.pdf`;
      document.body.appendChild(a); a.click(); a.remove();
    } catch (e: any) { alert("Gagal Download: " + e.message); }
  };

  const activeParticipants = participants.filter(p => p.status === 'active' || p.status === 'approved');
  const pendingParticipants = participants.filter(p => !p.status || p.status === 'pending' || p.status === 'waiting');
  const passedStudents = participants.filter(p => p.progress >= 100 || p.isCompleted).length;

  if (loadingParticipants && participants.length === 0) return <div className="p-10 text-center flex flex-col items-center gap-2"><RefreshCw className="animate-spin text-indigo-500" size={24} /><span className="text-gray-500">Memuat data peserta...</span></div>;

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4">
      {/* ... (Layout Header dan Statistik) ... */}
      <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-sm">
        <div className="flex gap-8">
          <div className="text-center"><span className="block text-2xl font-bold text-gray-800">{participants.length}</span><span className="text-[10px] uppercase font-bold text-gray-500">Total</span></div>
          <div className="text-center"><span className="block text-2xl font-bold text-green-600">{passedStudents}</span><span className="text-[10px] uppercase font-bold text-gray-500">Lulus</span></div>
          <div className="text-center"><span className="block text-2xl font-bold text-orange-500">{activeParticipants.length}</span><span className="text-[10px] uppercase font-bold text-gray-500">Aktif</span></div>
        </div>
        <div className="flex gap-2">
            <button onClick={() => fetchParticipants()} className="bg-white border border-indigo-200 text-indigo-700 px-4 py-2 rounded-lg font-bold hover:bg-indigo-50 flex items-center gap-2 text-sm shadow-sm" title="Refresh Data" aria-label="Refresh Data">
                <RefreshCw size={16} className={loadingParticipants ? "animate-spin" : ""} /> Refresh
            </button>
            <button onClick={() => setShowGroupChat(true)} className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold shadow-md hover:bg-indigo-700 flex items-center gap-2 text-sm relative" title="Buka Diskusi" aria-label="Buka Diskusi">
                <MessageCircle size={18} /> Diskusi
                <div className="absolute -top-2 -right-2"><ChatNotificationBadge courseId={courseId} /></div>
            </button>
        </div>
      </div>

      {pendingParticipants.length > 0 && (
        <div className="bg-white border border-yellow-200 rounded-2xl overflow-hidden shadow-sm animate-pulse-once">
            <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-100 flex justify-between items-center">
                <h3 className="font-bold text-yellow-800 flex items-center gap-2">
                    <UserCheck size={20} /> Calon Peserta Menunggu Persetujuan ({pendingParticipants.length})
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Nama Peserta</th>
                            <th className="px-6 py-3">Tanggal Daftar</th>
                            <th className="px-6 py-3 text-center">Data</th> 
                            <th className="px-6 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {pendingParticipants.map((p) => (
                            <tr key={p._id} className="hover:bg-yellow-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-800 flex items-center gap-3">
                                    <img src={getImageUrl(p.user.avatarUrl)} className="w-8 h-8 rounded-full bg-gray-200 object-cover" alt=""/>
                                    <div>
                                        <div>{p.user.name}</div>
                                        <div className="text-xs text-gray-400 font-normal">{p.user.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{new Date(p.joinedAt || Date.now()).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-center">
                                    <button onClick={() => setRegistrationDetail(p)} className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg text-xs font-bold border border-indigo-200 flex items-center gap-1 mx-auto transition-colors" title="Lihat Detail Pendaftaran" aria-label="Lihat Detail">
                                        <FileSearch size={14} /> Lihat Detail
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleVerifyEnrollment(p._id, 'approve', p.user.name)} className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-200 flex items-center gap-1 transition-colors" title="Setujui Peserta" aria-label="Setujui">
                                            <CheckCircle size={14}/> Setujui
                                        </button>
                                        <button onClick={() => handleVerifyEnrollment(p._id, 'reject', p.user.name)} className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-200 flex items-center gap-1 transition-colors" title="Tolak Peserta" aria-label="Tolak">
                                            <XCircle size={14}/> Tolak
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-wrap gap-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2"><Users size={18}/> Peserta Aktif ({activeParticipants.length})</h3>
          <div className="flex gap-2 items-center bg-white p-1 rounded border shadow-sm">
            <label htmlFor="action-select" className="text-xs font-bold text-gray-500 ml-2">Aksi Cepat:</label>
            <select id="action-select" className="p-1.5 border rounded text-xs bg-gray-50 h-9 outline-none min-w-[200px]" value={selectedActionId} onChange={e => setSelectedActionId(e.target.value)} title="Pilih Materi" aria-label="Pilih Materi">
                <option value="">-- Pilih Materi / Kuis --</option>
                {actionOptions.map(opt => (
                    // [FIX] GUNAKAN ICON YANG SAMA DENGAN EDITOR/PLAY
                    <option key={opt.id} value={opt.id}>
                        {opt.label} 
                    </option>
                ))}
            </select>
            <input className="px-3 py-1.5 rounded border text-xs h-9 outline-none min-w-[150px]" placeholder="Cari Nama..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} title="Cari Peserta" aria-label="Cari Peserta"/>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-gray-100 text-xs font-bold text-gray-600 uppercase border-b">
              <tr>
                <th className="p-4">Peserta</th>
                <th className="p-4 w-48">Progress</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Aksi Cepat</th> 
                <th className="p-4 text-center">Sertifikat</th>
                <th className="p-4 text-center">Detail</th>
                <th className="p-4 text-center">Chat / Hapus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activeParticipants.filter(p => (p.user?.name || '').toLowerCase().includes(participantFilter.toLowerCase())).map((p: any, idx: number) => {
                const rawProgress = Number(p.progress);
                const progressValue = Number.isFinite(rawProgress) ? Math.max(0, Math.min(100, Math.round(rawProgress))) : 0;
                const isLulus = progressValue >= 100 || p.isCompleted === true;
                const progressBarStyle = { width: `${progressValue}%` };
                return (
                  <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="p-4"><div className="font-bold text-gray-900">{p.user?.name}</div><div className="text-xs text-gray-500">{p.user?.email}</div></td>
                    <td className="p-4"><div className="flex items-center gap-2"><span className="text-xs font-bold text-gray-600 w-8">{progressValue}%</span><div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-500 ${isLulus ? 'bg-green-500' : 'bg-blue-500'}`} style={progressBarStyle}></div></div></div></td>
                    <td className="p-4 text-center"><div className="flex flex-col items-center">{isLulus ? <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">LULUS</span> : <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">PROSES</span>}</div></td>
                    <td className="p-4 text-center">{selectedActionId ? (<div className="flex gap-1 justify-center"><button onClick={() => handleParticipantAction(p.user?._id, 'pass')} disabled={processingAction} className="bg-green-600 text-white px-2 py-1.5 rounded text-[10px] font-bold" title="Luluskan" aria-label="Luluskan">Lulus</button><button onClick={() => handleParticipantAction(p.user?._id, 'reset')} disabled={processingAction} className="bg-red-600 text-white px-2 py-1.5 rounded text-[10px] font-bold" title="Reset" aria-label="Reset">Reset</button></div>) : <span className="text-gray-300 text-xs italic">-</span>}</td>
                    <td className="p-4 text-center">{isLulus ? (<button onClick={() => handleDownloadCertificate(p.user?._id)} className="text-blue-600 hover:text-blue-800" title="Download Sertifikat" aria-label="Download"><Award size={18}/></button>) : <span className="text-gray-300 text-xs">-</span>}</td>
                    <td className="p-4 text-center"><button onClick={() => { setSelectedStudentId(p.user?._id); setShowStudentDetailModal(true); }} className="text-gray-400 hover:text-indigo-600" title="Lihat Detail" aria-label="Detail"><Eye size={18} /></button></td>
                    <td className="p-4 text-center"><div className="flex justify-center gap-2"><button onClick={() => setChatTargetStudent(p)} className="text-indigo-600" title="Chat Personal" aria-label="Chat"><MessageCircle size={18}/></button><button onClick={() => confirm('Hapus?') && api(`/api/enrollments/${p._id}`, {method:'DELETE'}).then(fetchParticipants)} className="text-red-600" title="Hapus Peserta" aria-label="Hapus"><Trash2 size={18}/></button></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {chatTargetStudent && <PersonalChatModal student={chatTargetStudent} onClose={() => setChatTargetStudent(null)} />}
      {showGroupChat && <CourseGroupChat courseId={courseId} currentUser={user} participants={participants} facilitators={activeFacilitators} onClose={() => setShowGroupChat(false)} isFloating={false} />}
      {showStudentDetailModal && currentStudentDetail && <StudentDetailModal student={currentStudentDetail} course={course} onClose={() => { setShowStudentDetailModal(false); setSelectedStudentId(null); }} onRefresh={() => fetchParticipants(true)} />}
      {registrationDetail && <RegistrationDetailModal data={registrationDetail} onClose={() => setRegistrationDetail(null)} />}
    </div>
  );
}
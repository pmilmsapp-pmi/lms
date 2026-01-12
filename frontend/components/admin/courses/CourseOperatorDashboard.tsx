'use client';

import { useState, useEffect, useRef } from 'react';
import { api, getImageUrl } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import { 
    RefreshCw, Users, Eye, MessageCircle, Trash2, AlertCircle, Award, 
    Send, X, Check, CheckCircle, FileText, Download, BarChart2, PieChart,
    UserCheck, XCircle, Clock, FileSearch, User
} from 'lucide-react';
import CourseGroupChat from '@/components/CourseGroupChat'; 

// --- 1. MODAL DETAIL PENDAFTARAN ---
function RegistrationDetailModal({ data, onClose }: any) {
    if (!data) return null;
    const { user, registrationData, joinedAt } = data;

    const formatLabel = (key: string) => {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Detail Pendaftaran">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[90vh]">
                <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shrink-0">
                    <h3 className="font-bold flex items-center gap-2"><FileSearch size={20} /> Detail Pendaftaran</h3>
                    <button onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup" aria-label="Tutup Modal"><X size={20}/></button>
                </div>
                
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {/* Profil Singkat */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                        {user.avatarUrl ? (
                            <img 
                                src={getImageUrl(user.avatarUrl)} 
                                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100 shadow-sm"
                                alt={user.name}
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                <User size={32} />
                            </div>
                        )}
                        <div>
                            <h4 className="text-lg font-bold text-gray-900">{user.name}</h4>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <span className="inline-block mt-1 text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded border border-indigo-100 font-bold uppercase">
                                {user.role || 'Peserta'}
                            </span>
                        </div>
                    </div>

                    {/* Data Formulir */}
                    <div className="space-y-4">
                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Data Formulir</h5>
                        
                        <div className="grid grid-cols-1 gap-3">
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="text-xs text-gray-500 block mb-1">Tanggal Mendaftar</span>
                                <span className="text-sm font-medium text-gray-800">{new Date(joinedAt).toLocaleString('id-ID')}</span>
                            </div>

                            {registrationData && Object.keys(registrationData).length > 0 ? (
                                Object.entries(registrationData).map(([key, value]: any) => {
                                    if (key === 'uploadedFormUrl') {
                                        return (
                                            <div key={key} className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                                <span className="text-xs text-blue-500 block mb-1 font-bold">📄 Formulir Pendaftaran (Scan)</span>
                                                <a 
                                                    href={getImageUrl(value)} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-blue-700 font-bold text-sm hover:underline mt-1"
                                                >
                                                    <Download size={16}/> Lihat / Download File
                                                </a>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div key={key} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <span className="text-xs text-gray-500 block mb-1">{formatLabel(key)}</span>
                                            <span className="text-sm font-medium text-gray-800 break-words">{value?.toString() || '-'}</span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center text-gray-400 text-sm italic py-4">Tidak ada data formulir tambahan.</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t bg-gray-50 flex justify-end">
                    <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-bold" aria-label="Tutup">Tutup</button>
                </div>
            </div>
        </div>
    );
}

// --- 2. PERSONAL CHAT MODAL ---
function PersonalChatModal({ student, onClose }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const targetId = student.user?._id || student._id || student.user; 
  const targetName = student.user?.name || student.name || 'User';

  useEffect(() => {
    if (targetId) loadHistory();
    const interval = setInterval(() => { if (targetId) loadHistory(); }, 3000); 
    return () => clearInterval(interval);
  }, [targetId]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

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
          <button type="button" onClick={onClose} className="hover:bg-indigo-700 p-1 rounded" title="Tutup Chat" aria-label="Tutup Chat"><X size={20}/></button>
        </div>
        <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-2">
          {messages.map((msg: any, i: number) => (
            <div key={i} className={`p-2 rounded-lg text-sm max-w-[80%] ${msg.sender === 'me' ? 'bg-indigo-100 ml-auto text-right' : 'bg-white border'}`}>{msg.message}</div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} className="p-3 border-t flex gap-2 bg-white">
          <input className="flex-1 border rounded-full px-3 py-1.5 text-sm outline-none focus:border-indigo-500" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Tulis pesan..." aria-label="Input Pesan" />
          <button type="submit" className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700" title="Kirim Pesan" aria-label="Kirim Pesan"><Send size={14}/></button>
        </form>
      </div>
    </div>
  );
}

// --- 3. STUDENT DETAIL MODAL ---
function StudentDetailModal({ student, course, onClose, onRefresh }: any) {
    const [activeTab, setActiveTab] = useState<'progress' | 'answers'>('progress');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const getLessonAnswer = (lessonId: string) => {
        return student.lessonDetails?.find((d: any) => d.lessonId === lessonId);
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await onRefresh();
        setTimeout(() => setIsRefreshing(false), 500);
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Detail Siswa">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
            <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md shrink-0">
                <div className="flex items-center gap-3">
                    <h3 className="font-bold flex items-center gap-2"><Users size={20} /> Detail: {student.user?.name}</h3>
                    <button 
                        onClick={handleRefresh} 
                        className={`bg-indigo-500 hover:bg-indigo-400 p-1.5 rounded-full transition-all ${isRefreshing ? 'animate-spin' : ''}`} 
                        title="Refresh Data Peserta"
                        aria-label="Refresh Data Peserta"
                    >
                        <RefreshCw size={16} />
                    </button>
                </div>
                <button type="button" onClick={onClose} title="Tutup" aria-label="Tutup Detail" className="hover:bg-indigo-700 p-1 rounded"><X size={24} /></button>
            </div>
            <div className="flex border-b bg-gray-50 shrink-0">
                <button onClick={() => setActiveTab('progress')} className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === 'progress' ? 'border-indigo-600 text-indigo-700 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100'}`}>📊 Progress Belajar</button>
                <button onClick={() => setActiveTab('answers')} className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === 'answers' ? 'border-indigo-600 text-indigo-700 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100'}`}>📝 Jawaban & Tugas</button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-6">
                {activeTab === 'progress' && (
                    <div className="space-y-4">
                        {course?.modules?.map((m: any) => (
                            <div key={m._id} className="bg-white border rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-gray-100 px-4 py-2 border-b font-bold text-sm text-gray-700 flex justify-between"><span>{m.title}</span><span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded text-gray-600">MODUL</span></div>
                                <div className="divide-y">
                                    {m.lessons.map((l: any) => { 
                                        const isDone = student.completedLessons?.includes(l._id); 
                                        return (
                                            <div key={l._id} className="p-3 flex justify-between items-center hover:bg-gray-50">
                                                <div className="flex items-center gap-3"><div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isDone ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>{isDone && <Check size={12} />}</div><span className={`text-sm ${isDone ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{l.title}</span></div>
                                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${isDone ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>{l.type}</span>
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
                                    if (!['quiz', 'essay', 'upload_doc', 'poll'].includes(l.type)) return null;
                                    const answerData = getLessonAnswer(l._id);
                                    return (
                                        <div key={l._id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                            <div className="flex justify-between items-start mb-3 border-b pb-2"><div><h5 className="font-bold text-gray-800 text-sm">{l.title}</h5><span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase font-bold">{l.type}</span></div><span className="text-[10px] text-gray-400">{answerData?.submittedAt ? new Date(answerData.submittedAt).toLocaleString('id-ID') : 'Belum dikerjakan'}</span></div>
                                            {!answerData ? (<div className="text-sm text-gray-400 italic">Belum ada data jawaban.</div>) : (
                                                <div className="text-sm space-y-3">
                                                    {l.type === 'upload_doc' && answerData.uploadedFile && (<div className="flex items-center gap-3 bg-gray-50 p-3 rounded border"><FileText className="text-blue-500" size={24} /><div className="flex-1 overflow-hidden"><p className="font-bold text-gray-700 truncate">{answerData.uploadedFile.name}</p><p className="text-xs text-gray-500">Diunggah pada {new Date(answerData.uploadedFile.uploadedAt).toLocaleDateString()}</p></div><a href={getImageUrl(answerData.uploadedFile.url)} target="_blank" download className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1" aria-label="Unduh File"><Download size={14}/> Unduh</a></div>)}
                                                    {l.type === 'essay' && answerData.essayAnswers && (<div className="space-y-4">{answerData.essayAnswers.map((ans: any, idx: number) => (<div key={idx} className="bg-gray-50 p-3 rounded border"><p className="text-xs font-bold text-gray-500 mb-1">Pertanyaan {idx + 1}:</p><div className="mb-2 font-medium text-gray-800" dangerouslySetInnerHTML={{ __html: l.questions?.[idx]?.question || `Soal ${idx+1}` }} /><p className="text-xs font-bold text-green-600 mb-1">Jawaban Peserta:</p><div className="bg-white p-2 rounded border border-gray-200 text-gray-700" dangerouslySetInnerHTML={{ __html: ans }} /></div>))}</div>)}
                                                    {l.type === 'quiz' && (<div className="flex items-center gap-4 bg-yellow-50 p-3 rounded border border-yellow-200"><div className="text-center"><div className="text-3xl font-extrabold text-yellow-700">{answerData.score !== undefined ? answerData.score : '-'}</div><div className="text-[10px] text-yellow-600 font-bold uppercase">Skor Akhir</div></div><div className="text-xs text-gray-600 border-l pl-4 border-yellow-200 space-y-1"><p>Status: <span className={`font-bold ${answerData.score >= 70 ? 'text-green-600' : 'text-red-500'}`}>{answerData.score >= 70 ? 'Lulus' : 'Belum Lulus'}</span></p><p>Percobaan: <strong>{answerData.attempts || 1}x</strong></p></div></div>)}
                                                    {l.type === 'poll' && (<div className="flex items-center gap-2 bg-purple-50 p-3 rounded border border-purple-200 text-purple-800"><BarChart2 size={18} /><span>Pilihan Peserta: <strong>{answerData.pollAnswer || '-'}</strong></span></div>)}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                )}
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
  const [studentDetail, setStudentDetail] = useState<any>(null);
  const [chatTargetStudent, setChatTargetStudent] = useState<any>(null);
  const [processingAction, setProcessingAction] = useState(false);
  
  // State untuk Modal Detail Pendaftaran
  const [registrationDetail, setRegistrationDetail] = useState<any>(null);

  const [pollStats, setPollStats] = useState<any>({});

  const activeFacilitators = (course.facilitatorIds && course.facilitatorIds.length > 0) ? course.facilitatorIds : facilitators;

  useEffect(() => {
    if (course?.modules) {
      const opts: any[] = [];
      course.modules.forEach((m: any) => {
        m.lessons?.forEach((l: any) => {
          let label = l.title;
          if (l.type === 'quiz') label = `📝 Kuis: ${l.title}`;
          else if (l.type === 'essay') label = `📝 Esai: ${l.title}`;
          else if (l.type === 'upload_doc') label = `📤 Upload: ${l.title}`;
          else if (l.type === 'poll') label = `📊 Polling: ${l.title}`; 
          opts.push({ id: l._id, label, type: l.type });
        });
      });
      setActionOptions(opts);
    }
  }, [course]);

  const fetchParticipants = async (isBackground = false) => {
    if (!isBackground) setLoadingParticipants(true);
    try {
      const res = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`);
      setParticipants(res.participants || []);
      calculatePollStats(res.participants || []);
    } catch (error) { console.error('Gagal load peserta'); } finally { if (!isBackground) setLoadingParticipants(false); }
  };

  const calculatePollStats = (data: any[]) => {
      const stats: any = {};
      course.modules.forEach((m: any) => {
          m.lessons.forEach((l: any) => {
              if (l.type === 'poll') {
                  const lessonId = l._id;
                  const counts: any = {};
                  let totalVotes = 0;
                  l.pollOptions.forEach((opt: string) => { counts[opt] = 0; });
                  data.forEach((p: any) => {
                      const ans = p.lessonDetails?.find((d: any) => d.lessonId === lessonId)?.pollAnswer;
                      if (ans && counts[ans] !== undefined) {
                          counts[ans]++;
                          totalVotes++;
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
    const interval = setInterval(() => fetchParticipants(true), 5000); 
    return () => clearInterval(interval);
  }, [courseId]);

  const handleVerifyEnrollment = async (enrollmentId: string, action: 'approve' | 'reject', studentName: string) => {
    if (!confirm(`Konfirmasi ${action === 'approve' ? 'Setujui' : 'Tolak'} untuk ${studentName}?`)) return;
    try { 
        await api('/api/courses/verify-enrollment', { method: 'POST', body: { enrollmentId, action } }); 
        alert('Berhasil diproses.'); fetchParticipants(); 
    } catch (e: any) { alert(e.message); }
  };
  
  const handleParticipantAction = async (studentId: string, action: 'pass' | 'reset') => {
    if (!selectedActionId) return alert('Pilih Materi di dropdown Aksi Cepat terlebih dahulu!');
    setProcessingAction(true);
    const realUserId = participants.find(p => (p.user?._id === studentId) || (p.user === studentId))?.user?._id || studentId;
    try {
        if(action === 'pass') await api(`/api/courses/mark-complete-lesson`, { method: 'POST', body: { studentId: realUserId, lessonId: selectedActionId, courseId } });
        else await api(`/api/courses/reset-quiz`, { method: 'POST', body: { studentId: realUserId, quizId: selectedActionId } }); 
        await fetchParticipants(); 
    } catch(e:any){ alert("Gagal: " + e.message); } finally { setProcessingAction(false); }
  };

  const handleRejectParticipant = async (id: string) => { 
      if(confirm('Yakin ingin menghapus peserta ini dari kelas?')) { 
          await api(`/api/enrollments/${id}`, { method: 'DELETE' }); 
          alert('Peserta dihapus.'); fetchParticipants(); 
      }
  };
  
  const handleDownloadCertificate = async (sid: string) => { 
    try {
      const token = localStorage.getItem('token');
      const BACKEND_URL = 'http://localhost:4000'; 
      const url = `${BACKEND_URL}/api/courses/certificate/download-admin/${courseId}/${sid}`;
      const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || "Gagal download"); }
      const blob = await res.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = urlBlob; a.download = `Sertifikat-${sid}.pdf`;
      document.body.appendChild(a); a.click(); a.remove();
    } catch (e: any) { alert("Gagal Download Sertifikat: " + e.message); }
  };

  const pendingParticipants = participants.filter(p => !p.status || p.status === 'pending' || p.status === 'waiting');
  const activeParticipants = participants.filter(p => p.status === 'active' || p.status === 'approved');
  const passedStudents = participants.filter(p => p.progress >= 100 || p.isCompleted).length;

  if (loadingParticipants && participants.length === 0) return <div className="p-10 text-center flex flex-col items-center gap-2"><RefreshCw className="animate-spin text-indigo-500" size={24} /><span className="text-gray-500">Memuat data peserta...</span></div>;

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4">
      {/* HEADER STATS */}
      <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-sm">
        <div className="flex gap-8">
          <div className="text-center"><span className="block text-2xl font-bold text-gray-800">{participants.length}</span><span className="text-[10px] uppercase font-bold text-gray-500">Total Peserta</span></div>
          <div className="text-center"><span className="block text-2xl font-bold text-green-600">{passedStudents}</span><span className="text-[10px] uppercase font-bold text-gray-500">Lulus</span></div>
          <div className="text-center"><span className="block text-2xl font-bold text-orange-500">{activeParticipants.length}</span><span className="text-[10px] uppercase font-bold text-gray-500">Aktif Belajar</span></div>
        </div>
        <div className="flex gap-2">
            <button onClick={() => fetchParticipants()} className="bg-white border border-indigo-200 text-indigo-700 px-4 py-2 rounded-lg font-bold hover:bg-indigo-50 flex items-center gap-2 text-sm shadow-sm" title="Refresh Data" aria-label="Refresh Data">
                <RefreshCw size={16} className={loadingParticipants ? "animate-spin" : ""} /> Refresh
            </button>
            <button onClick={() => setShowGroupChat(true)} className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold shadow-md hover:bg-indigo-700 flex items-center gap-2 text-sm" title="Buka Ruang Diskusi" aria-label="Buka Ruang Diskusi">
                <MessageCircle size={18} /> Ruang Diskusi
            </button>
        </div>
      </div>

      {/* TABEL MENUNGGU PERSETUJUAN (CALON PESERTA) */}
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
                                
                                {/* TOMBOL LIHAT DETAIL PENDAFTARAN */}
                                <td className="px-6 py-4 text-center">
                                    <button 
                                        onClick={() => setRegistrationDetail(p)}
                                        className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg text-xs font-bold border border-indigo-200 flex items-center gap-1 mx-auto transition-colors"
                                        title="Lihat Formulir & Profil"
                                        aria-label="Lihat Detail Pendaftaran"
                                    >
                                        <FileSearch size={14} /> Lihat Detail
                                    </button>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleVerifyEnrollment(p._id, 'approve', p.user.name)} className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-200 flex items-center gap-1 transition-colors" title="Setujui Peserta" aria-label="Setujui Peserta">
                                            <CheckCircle size={14}/> Setujui
                                        </button>
                                        <button onClick={() => handleVerifyEnrollment(p._id, 'reject', p.user.name)} className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-200 flex items-center gap-1 transition-colors" title="Tolak Peserta" aria-label="Tolak Peserta">
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

      {/* STATISTIK POLLING */}
      {Object.keys(pollStats).length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><PieChart size={20} className="text-purple-600"/> Hasil Polling Kelas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(pollStats).map(([lessonId, stat]: any) => (
                      <div key={lessonId} className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                          <h4 className="font-bold text-purple-900 text-sm mb-3">{stat.title}</h4>
                          <div className="space-y-2">
                              {Object.entries(stat.counts).map(([opt, count]: any) => {
                                  const percent = stat.totalVotes > 0 ? Math.round((count / stat.totalVotes) * 100) : 0;
                                  return (
                                      <div key={opt} className="text-xs">
                                          <div className="flex justify-between mb-1">
                                              <span className="font-medium text-gray-700">{opt}</span>
                                              <span className="font-bold text-purple-700">{count} suara ({percent}%)</span>
                                          </div>
                                          <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                                              <div className="h-full bg-purple-600" style={{ width: `${percent}%` }}></div>
                                          </div>
                                      </div>
                                  );
                              })}
                          </div>
                          <div className="mt-3 text-xs text-right text-gray-500 italic">Total: {stat.totalVotes} suara</div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* TABEL PESERTA AKTIF */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-wrap gap-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2"><Users size={18}/> Peserta Aktif ({activeParticipants.length})</h3>
          
          <div className="flex gap-2 items-center bg-white p-1 rounded border shadow-sm">
            <span className="text-xs font-bold text-gray-500 ml-2">Aksi Cepat:</span>
            <select 
                className="p-1.5 border rounded text-xs bg-gray-50 h-9 outline-none min-w-[200px] focus:border-indigo-500" 
                value={selectedActionId} 
                onChange={e => setSelectedActionId(e.target.value)} 
                title="Pilih Materi untuk Aksi Cepat"
                aria-label="Pilih Aksi Cepat"
            >
                <option value="">-- Pilih Materi / Kuis --</option>
                {actionOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
            </select>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <input className="px-3 py-1.5 rounded border text-xs h-9 outline-none min-w-[150px]" placeholder="Cari Nama Peserta..." value={participantFilter} onChange={e => setParticipantFilter(e.target.value)} aria-label="Cari Peserta" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-gray-100 text-xs font-bold text-gray-600 uppercase border-b">
              <tr>
                <th className="p-4">Peserta</th>
                <th className="p-4 w-48">Progress Belajar</th>
                <th className="p-4 text-center">Status & Posisi</th>
                <th className="p-4 text-center bg-indigo-50/50 border-x border-indigo-100 text-indigo-700">Aksi Cepat</th> 
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
                return (
                  <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="p-4">
                        <div className="font-bold text-gray-900">{p.user?.name}</div>
                        <div className="text-xs text-gray-500">{p.user?.email}</div>
                    </td>
                    <td className="p-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-600 w-8">{progressValue}%</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-500 ${isLulus ? 'bg-green-500' : 'bg-blue-500'}`} style={{width: `${progressValue}%`}}></div></div>
                        </div>
                    </td>
                    <td className="p-4 text-center">
                        <div className="flex flex-col items-center">
                            {isLulus 
                                ? <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded"><CheckCircle size={12}/> LULUS</span> 
                                : <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded"><RefreshCw size={12} className="animate-spin-slow"/> PROSES</span>
                            }
                            {!isLulus && p.currentPosition && (<span className="text-[10px] text-gray-500 font-medium italic mt-1 max-w-[150px] truncate" title={p.currentPosition}>{p.currentPosition}</span>)}
                        </div>
                    </td>
                    <td className="p-4 text-center bg-indigo-50/20 border-x border-indigo-50">
                        {selectedActionId ? (
                            <div className="flex gap-1 justify-center">
                                <button onClick={() => handleParticipantAction(p.user?._id, 'pass')} disabled={processingAction} className="bg-green-600 hover:bg-green-700 text-white px-2 py-1.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm disabled:opacity-50" title="Tandai Lulus Manual" aria-label="Luluskan Manual"><Check size={12}/> Lulus</button>
                                <button onClick={() => handleParticipantAction(p.user?._id, 'reset')} disabled={processingAction} className="bg-red-600 hover:bg-red-700 text-white px-2 py-1.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm disabled:opacity-50" title="Reset Progres" aria-label="Reset Progress"><RefreshCw size={12}/> Reset</button>
                            </div>
                        ) : <span className="text-gray-300 text-xs italic">- Pilih Materi -</span>}
                    </td>
                    <td className="p-4 text-center">{isLulus ? (<button onClick={() => handleDownloadCertificate(p.user?._id)} className="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50 border border-blue-200 transition-colors" title="Download Sertifikat" aria-label="Download Sertifikat"><Award size={18}/></button>) : <span className="text-gray-300 text-xs">-</span>}</td>
                    <td className="p-4 text-center"><button onClick={() => { setStudentDetail(p); setShowStudentDetailModal(true); }} className="text-gray-400 hover:text-indigo-600 transition-colors" title="Lihat Detail Belajar" aria-label="Lihat Detail Belajar"><Eye size={18} /></button></td>
                    <td className="p-4 text-center"><div className="flex justify-center gap-2"><button onClick={() => setChatTargetStudent(p)} className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded transition-colors" title="Chat Personal" aria-label="Chat Personal"><MessageCircle size={18}/></button><button onClick={() => handleRejectParticipant(p._id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded transition-colors" title="Hapus Peserta" aria-label="Hapus Peserta"><Trash2 size={18}/></button></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODALS --- */}
      {chatTargetStudent && <PersonalChatModal student={chatTargetStudent} onClose={() => setChatTargetStudent(null)} />}
      
      {showGroupChat && (
        <CourseGroupChat 
            courseId={courseId}
            currentUser={user} 
            participants={participants} 
            facilitators={activeFacilitators} 
            onClose={() => setShowGroupChat(false)} 
            isFloating={false} 
        />
      )}
      
      {showStudentDetailModal && studentDetail && (
        <StudentDetailModal 
            student={studentDetail} 
            course={course} 
            onClose={() => setShowStudentDetailModal(false)}
            onRefresh={() => fetchParticipants(true)}
        />
      )}

      {/* MODAL DETAIL PENDAFTARAN */}
      {registrationDetail && (
          <RegistrationDetailModal 
              data={registrationDetail} 
              onClose={() => setRegistrationDetail(null)} 
          />
      )}
    </div>
  );
}
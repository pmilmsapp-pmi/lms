
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, getImageUrl } from '@/lib/api';
import Protected from '@/components/Protected';

// Remove unused inline style variable

// --- 1. KOMPONEN TOMBOL LULUSKAN ---
function MarkCompleteButton({ lessonId, studentId, courseId, isCompleted, onSuccess }: any) {
  const [loading, setLoading] = useState(false);

  const handleMarkComplete = async () => {
    if (isCompleted) return;
    if (!confirm("Tandai materi ini sebagai SELESAI untuk siswa ini secara manual?")) return;
    
    setLoading(true);
    try {
      await api(`/api/courses/mark-complete-lesson`, {
        method: 'POST',
        body: { studentId, lessonId, courseId }
      });
      if (onSuccess) onSuccess();
    } catch (e: any) {
      alert("Gagal: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  if (isCompleted) {
    return (
      <button disabled className="bg-green-600 text-white px-4 py-1.5 rounded text-xs font-bold border border-green-600 flex items-center gap-2 opacity-90 cursor-default shadow-sm">
        <span>✓</span> Sudah Lulus
      </button>
    );
  }

  return (
    <button onClick={handleMarkComplete} disabled={loading} className="bg-white text-green-600 px-4 py-1.5 rounded text-xs font-bold hover:bg-green-50 border border-green-200 transition-all flex items-center gap-2 hover:shadow-md active:scale-95">
      {loading ? '...' : '⚡ Luluskan Manual'}
    </button>
  );
}

// --- 2. KOMPONEN RESET KUIS ---
function ResetQuizButton({ quizId, studentId, onSuccess }: any) {
    const handleReset = async () => {
        if(!confirm("Reset Timer & Jawaban Kuis peserta ini? Mereka harus mengerjakan ulang dari awal.")) return;
        try {
            await api(`/api/courses/reset-quiz`, {
                method: 'POST',
                body: { studentId, quizId }
            });
            alert("Kuis berhasil di-reset!");
            if(onSuccess) onSuccess();
        } catch(e: any) { alert("Gagal reset: " + e.message); }
    };

    return (
        <button onClick={handleReset} className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded text-xs font-bold border border-orange-200 hover:bg-orange-100 transition-all flex items-center gap-1 shadow-sm">
            ↺ Reset Timer
        </button>
    );
}

// --- 3. KOMPONEN POPUP CHAT ---
function ChatModal({ student, onClose, onMessageSent }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (student._id) {
        loadHistory();
        const interval = setInterval(loadHistory, 3000);
        return () => clearInterval(interval);
    }
  }, [student._id]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const loadHistory = async () => {
    try {
      const res = await api(`/api/chat/${student._id}`);
      setMessages(res.messages || []);
    } catch (e) { console.error("Gagal load chat", e); } finally { setLoading(false); }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const tempMsg = { _id: Date.now(), sender: 'me', message: newMessage, createdAt: new Date().toISOString() };
    setMessages(prev => [...prev, tempMsg]);
    setNewMessage('');
    setSending(true);

    try {
      await api('/api/chat/send', { method: 'POST', body: { recipientId: student._id, message: tempMsg.message } });
      loadHistory();
      if (onMessageSent) onMessageSent(student._id);
    } catch (error: any) { alert("Gagal kirim pesan: " + error.message); } finally { setSending(false); }
  };

  const isMe = (msg: any) => {
      if (msg.sender === 'me') return true;
      const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
      return senderId !== student._id; 
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white shadow-md z-10">
          <div className="flex items-center gap-3">
             <div className="relative">
                <img src={getImageUrl(student.avatarUrl)} className="w-10 h-10 rounded-full bg-white/20 object-cover border-2 border-white/30" alt={student.name} />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-blue-600 rounded-full"></span>
             </div>
             <div><h3 className="font-bold text-sm leading-tight">{student.name}</h3><p className="text-[10px] opacity-90">Peserta Pelatihan</p></div>
          </div>
          <button onClick={onClose} className="hover:bg-blue-700 p-2 rounded-full transition-colors font-bold text-lg">✕</button>
        </div>

        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto flex flex-col gap-3">
            {loading && messages.length === 0 ? (
                <div className="flex justify-center mt-10"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div></div>
            ) : messages.length === 0 ? (
                <div className="text-center text-gray-400 text-sm mt-10 flex flex-col items-center"><span className="text-4xl mb-2">👋</span>Belum ada riwayat pesan.<br/>Sapa peserta ini sekarang!</div>
            ) : (
                messages.map((msg: any, idx: number) => {
                    const me = isMe(msg);
                    return (
                        <div key={idx} className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm shadow-sm relative ${me ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>
                                <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                                <span className={`text-[10px] block text-right mt-1 ${me ? 'text-blue-200' : 'text-gray-400'}`}>{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                        </div>
                    );
                })
            )}
            <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2 items-center">
          <input className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-gray-50" placeholder="Tulis pesan..." value={newMessage} onChange={e => setNewMessage(e.target.value)} autoFocus />
          <button disabled={sending || !newMessage.trim()} type="submit" className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 shadow-md transition-transform active:scale-95">➤</button>
        </form>
      </div>
    </div>
  );
}

// --- 4. MAIN PAGE ---
export default function CourseParticipantsPage() {
  const params = useParams();
  const courseId = params?.id as string;
  const router = useRouter();

  const [participants, setParticipants] = useState<any[]>([]);
  const [actionOptions, setActionOptions] = useState<any[]>([]); 
  const [selectedOptionId, setSelectedOptionId] = useState<string>(''); 
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  
  const [chattedUserIds, setChattedUserIds] = useState<Set<string>>(new Set());
  const [chatTarget, setChatTarget] = useState<any | null>(null);

  useEffect(() => { if (courseId) loadData(); }, [courseId]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // 1. Ambil Course & Options Dropdown
      const courseRes = await api(`/api/courses/${courseId}`);
      const course = courseRes.course || courseRes;
      
      const options: any[] = [];
      course.modules?.forEach((mod: any) => {
        mod.lessons?.forEach((les: any) => {
            let label = `📄 ${les.title}`;
            if (les.type === 'quiz') label = `📝 KUIS: ${les.title}`;
            options.push({ id: les._id, title: les.title, type: les.type, label });
        });
      });
      setActionOptions(options);

      // 2. Ambil Peserta & Progress
      const participantsRes = await api(`/api/courses/${courseId}/participants`);
      setParticipants(participantsRes.participants || []);

      // 3. Chat History (untuk warna ikon)
      try {
          const chatRes = await api('/api/chat/conversations');
          const chattedIds = new Set<string>();
          chatRes.conversations.forEach((c: any) => { if (c.user && c.user._id) chattedIds.add(c.user._id); });
          setChattedUserIds(chattedIds);
      } catch (err) { console.error("Chat history error", err); }

    } catch (e: any) {
      console.error(e);
      alert('Gagal memuat data peserta.');
    } finally {
      setLoading(false);
    }
  };

  const handleMessageSent = (studentId: string) => { setChattedUserIds(prev => new Set(prev).add(studentId)); };

  const filteredData = participants.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
  const selectedOption = actionOptions.find(o => o.id === selectedOptionId);

  if (loading) return <div className="p-20 text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div><p className="mt-4 text-gray-500">Memuat Data...</p></div>;

  return (
    <Protected roles={['FACILITATOR', 'SUPER_ADMIN']}>
      <div className="max-w-7xl mx-auto p-6 relative min-h-screen pb-20">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
            <div><h1 className="text-2xl font-bold text-gray-800">Manajemen Peserta</h1><p className="text-gray-500 text-sm">Kelola progres dan komunikasi.</p></div>
            <button onClick={() => router.back()} className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm font-bold text-gray-600">← Kembali ke Kursus</button>
        </div>

        {/* Toolbar */}
        <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3 w-full md:w-auto">
                <span className="text-indigo-900 font-bold whitespace-nowrap text-sm">🛠 Pilih Aksi Massal / Spesifik:</span>
                {/* [FIX] Accessibility: Added aria-label */}
                <select 
                    value={selectedOptionId} 
                    onChange={(e) => setSelectedOptionId(e.target.value)}
                    className="p-2.5 border border-indigo-300 rounded-lg text-sm w-full md:w-80 bg-white focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                    aria-label="Pilih Materi atau Kuis untuk Aksi"
                >
                    <option value="">-- Pilih Materi / Kuis --</option>
                    {actionOptions.map((opt) => (<option key={opt.id} value={opt.id}>{opt.label}</option>))}
                </select>
            </div>
            <div className="relative w-full md:w-auto">
                <input 
                    type="text" 
                    placeholder="🔍 Cari nama peserta..." 
                    className="border border-gray-300 rounded-full px-5 py-2 text-sm w-full md:w-64 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
        </div>

        {/* Info Mode Aksi */}
        {selectedOption && (
            <div className={`mb-6 text-sm font-medium px-4 py-3 rounded-lg border flex items-center gap-2 animate-in slide-in-from-top-2 ${selectedOption.type === 'quiz' ? 'bg-orange-50 text-orange-800 border-orange-200' : 'bg-green-50 text-green-800 border-green-200'}`}>
                <span>{selectedOption.type === 'quiz' ? '⚡' : '📦'}</span>
                Mode Aksi Aktif: 
                {selectedOption.type === 'quiz' ? <strong> Reset Timer Kuis</strong> : <strong> Meluluskan Modul Manual</strong>}
                {' '} untuk <u>{selectedOption.title}</u>
            </div>
        )}

        {/* Tabel Peserta */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs font-bold tracking-wider">
                    <tr><th className="p-4 w-12 text-center">No</th><th className="p-4">Peserta</th><th className="p-4">Tanggal Gabung</th><th className="p-4 text-center">Progress</th><th className="p-4 text-center">Aksi Konteks</th><th className="p-4 text-center">Komunikasi</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredData.map((user, idx) => {
                        const hasChatted = chattedUserIds.has(user._id);
                        // Cek apakah completedLessons mengandung selectedOptionId
                        const isModulePassed = user.completedLessons && user.completedLessons.includes(selectedOptionId);

                        return (
                            <tr key={user._id} className="hover:bg-gray-50 transition-colors group">
                                <td className="p-4 text-center text-gray-500">{idx + 1}</td>
                                
                                <td className="p-4">
                                    <Link href={`/profile`} className="flex items-center gap-3">
                                        <img src={getImageUrl(user.avatarUrl) || `https://ui-avatars.com/api/?name=${user.name}`} className="w-10 h-10 rounded-full bg-gray-200 object-cover border group-hover:border-indigo-500 transition-colors" alt={user.name} />
                                        <div><p className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{user.name}</p><p className="text-xs text-gray-500">{user.email}</p></div>
                                    </Link>
                                </td>

                                <td className="p-4 text-gray-600">{new Date(user.joinDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td>

                                <td className="p-4 text-center">
                                    {/* Dynamic progress width using CSS custom property */}
                                    <div className="w-24 h-2 bg-gray-200 rounded-full mx-auto mb-1 overflow-hidden">
                                        <div
                                            className={`progress-bar h-full rounded-full transition-all duration-500 ${user.progress === 100 ? 'bg-green-500' : 'bg-blue-600'}`}
                                            data-progress={user.progress || 0}
                                        ></div>
                                    </div>
                                    <span className={`text-xs font-bold ${user.progress === 100 ? 'text-green-600' : 'text-blue-600'}`}>{user.progress || 0}%</span>
                                </td>

                                {/* KOLOM AKSI (Reset Timer / Luluskan) */}
                                <td className="p-4 flex justify-center">
                                    {selectedOption ? (
                                        selectedOption.type === 'quiz' ? (
                                            <div className="flex gap-2">
                                                <MarkCompleteButton lessonId={selectedOption.id} studentId={user._id} courseId={courseId} isCompleted={isModulePassed} onSuccess={loadData} />
                                                <ResetQuizButton quizId={selectedOption.id} studentId={user._id} onSuccess={loadData} />
                                            </div>
                                        ) : (
                                            <MarkCompleteButton lessonId={selectedOption.id} studentId={user._id} courseId={courseId} isCompleted={isModulePassed} onSuccess={loadData} />
                                        )
                                    ) : (
                                        <span className="text-xs text-gray-400 italic">-- Pilih aksi diatas --</span>
                                    )}
                                </td>

                                <td className="p-4 text-center">
                                    <button onClick={() => setChatTarget(user)} className={`p-2 rounded-full border transition-all shadow-sm group-hover:shadow-md relative ${hasChatted ? 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100' : 'bg-white border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400'}`} title={`Chat dengan ${user.name}`}>
                                        <span className="text-lg">💬</span>
                                        {hasChatted && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white"></span>}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    {filteredData.length === 0 && <tr><td colSpan={6} className="p-10 text-center text-gray-400">Tidak ada peserta ditemukan.</td></tr>}
                </tbody>
            </table>
        </div>

        {chatTarget && <ChatModal student={chatTarget} onClose={() => setChatTarget(null)} onMessageSent={handleMessageSent} />}
      </div>
    </Protected>
  );
}
// // // // // // 'use client';

// // // // // // import { useState, useRef, useMemo, useEffect } from 'react';
// // // // // // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // import CompetencyForm from '@/components/admin/CompetencyForm';
// // // // // // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // // // // // import {
// // // // // //     Calendar, School, RefreshCw, LogOut, CheckCircle2, 
// // // // // //     Link as LinkIcon, Users, FileText, Download,
// // // // // //     FileBadge, MapPin, UserCheck, Hash, BarChart3, 
// // // // // //     BookOpen, Trash2, Plus, Video, Image as ImageIcon,
// // // // // //     Award, Layout, Clock, ExternalLink
// // // // // // } from 'lucide-react';

// // // // // // import dynamic from 'next/dynamic';
// // // // // // import 'react-quill/dist/quill.snow.css'; 

// // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // //     ssr: false,
// // // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // // });

// // // // // // interface CourseContentEditorProps {
// // // // // //     course: any;
// // // // // //     courseId: string;
// // // // // //     refreshData: () => void;
// // // // // //     facilitators: any[]; 
// // // // // // }

// // // // // // export default function CourseContentEditor({ course, courseId, refreshData, facilitators }: CourseContentEditorProps) {
// // // // // //     const [activeEditorTab, setActiveEditorTab] = useState<'curriculum' | 'certificate'>('curriculum');
// // // // // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // // // // //     const [isUploadingCover, setIsUploadingCover] = useState(false);
    
// // // // // //     // --- STATE MODUL ---
// // // // // //     const [showModuleForm, setShowModuleForm] = useState(false);
// // // // // //     const [modTitle, setModTitle] = useState('');
// // // // // //     const [modIsMandatory, setModIsMandatory] = useState(true);
// // // // // //     const [modFacilitatorId, setModFacilitatorId] = useState('');
// // // // // //     const [modJp, setModJp] = useState(0);
// // // // // //     const [modSchedule, setModSchedule] = useState('');
// // // // // //     const [editingModId, setEditingModId] = useState<string | null>(null);

// // // // // //     // --- STATE LESSON (MATERI) ---
// // // // // //     const [activeModId, setActiveModId] = useState<string | null>(null); 
// // // // // //     const [editingLesId, setEditingLesId] = useState<string | null>(null);
// // // // // //     const [lesTitle, setLesTitle] = useState('');
// // // // // //     const [lesType, setLesType] = useState('lesson');
// // // // // //     const [lesContent, setLesContent] = useState('');
// // // // // //     const [lesIsMandatory, setLesIsMandatory] = useState(true);
// // // // // //     const [lesJp, setLesJp] = useState(0);
// // // // // //     const [lesSchedule, setLesSchedule] = useState('');
// // // // // //     const [lesFacilitatorId, setLesFacilitatorId] = useState('');
// // // // // //     const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // // // //     const [uploading, setUploading] = useState(false);
// // // // // //     // [NEW] Untuk preview file/link yang tersimpan
// // // // // //     const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);

// // // // // //     // --- STATE TIMER / QUIZ / POLL ---
// // // // // //     const [quizDuration, setQuizDuration] = useState(0); 
// // // // // //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// // // // // //     const [pollQuestion, setPollQuestion] = useState('');
// // // // // //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
// // // // // //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// // // // // //     const [useEssayTimer, setUseEssayTimer] = useState(false);

// // // // // //     // --- STATE GOOGLE CLASSROOM ---
// // // // // //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// // // // // //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// // // // // //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// // // // // //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// // // // // //     // --- STATE SETTINGS ---
// // // // // //     const [competencies, setCompetencies] = useState<any[]>(course?.competencies || []);
// // // // // //     const [includeCompetencies, setIncludeCompetencies] = useState(course?.includeCompetenciesInCertificate ?? true);
// // // // // //     const [certConfig, setCertConfig] = useState<any>(course?.certificateConfig || {});
// // // // // //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>(
// // // // // //         course?.facilitatorIds?.map((f: any) => (typeof f === 'object' ? f._id : f)) || []
// // // // // //     );
// // // // // //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// // // // // //     const [isSavingCert, setIsSavingCert] = useState(false);
// // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');

// // // // // //     useEffect(() => {
// // // // // //         if (course) {
// // // // // //             setCompetencies(course.competencies || []);
// // // // // //             setIncludeCompetencies(course.includeCompetenciesInCertificate ?? true);
// // // // // //             setCertConfig(course.certificateConfig || {});
// // // // // //             if (course.facilitatorIds) {
// // // // // //                 setSelectedFacilitatorIds(course.facilitatorIds.map((f: any) => (typeof f === 'object' ? f._id : f)));
// // // // // //             }
// // // // // //         }
// // // // // //     }, [course]);

// // // // // //     const activeTeam = facilitators.filter((u: any) => selectedFacilitatorIds.includes(u._id) || u.role === 'SUPER_ADMIN');
// // // // // //     const quillModules = useMemo(() => ({ toolbar: { container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'image', 'video'], [{ 'color': [] }, { 'background': [] }], ['clean']] } }), []);
// // // // // //     const getFacilitatorNameLabel = (data: any) => { if (!data) return null; if (typeof data === 'object' && data.name) return data.name; const found = facilitators.find(f => f._id === data || f.id === data); return found ? found.name : 'Unknown'; };

// // // // // //     // --- HELPER FUNCTIONS ---
// // // // // //     const addPollOption = () => setPollOptions([...pollOptions, '']); 
// // // // // //     const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; 
// // // // // //     const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); }; 
// // // // // //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // // // // //     const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; 
// // // // // //     const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); }; 
// // // // // //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); 
    
// // // // // //     // [FIX] Update Essay dengan pengecekan strict untuk mencegah infinite loop
// // // // // //     const updateEssay = (idx: number, val: string) => { 
// // // // // //         setEssayQuestions(prev => {
// // // // // //             // Jika nilai sama persis, kembalikan state lama agar tidak re-render
// // // // // //             if (prev[idx] === val) return prev;
            
// // // // // //             // Jika berbeda, buat copy baru dan update
// // // // // //             const newQ = [...prev];
// // // // // //             newQ[idx] = val;
// // // // // //             return newQ;
// // // // // //         });
// // // // // //     }; 
    
// // // // // //     const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };

// // // // // //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); window.open(url, 'GoogleAuthPopup', `width=500,height=600`); } catch (e) { alert("Gagal Auth Google"); } }; 
// // // // // //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } }; 
// // // // // //     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const data = await api('/api/classroom/courses', { headers: { 'x-google-token': token } }); if (data.courses) setClassroomCourses(data.courses); } catch (e: any) { if(e.status === 401 || e.message?.includes('401')) { localStorage.removeItem('google_class_token'); setGoogleToken(null); } } finally { setIsCheckingGoogle(false); } };
    
// // // // // //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); await apiUpload(`/api/upload/course/${courseId}/cover`, formData); refreshData(); alert("Cover berhasil diperbarui!"); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// // // // // //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); }; 
// // // // // //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } };
// // // // // //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); setCertConfig(data); alert("Pengaturan Sertifikat Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// // // // // //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Kompetensi Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };

// // // // // //     // --- MAIN LOGIC ---
// // // // // //     const resetLessonForm = () => {
// // // // // //         setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesType('lesson'); setLesContent(''); setLesIsMandatory(true); setLesJp(0); setLesSchedule(''); setLesFacilitatorId(''); setSelectedFile(null);
// // // // // //         setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // // // // //         setQuizDuration(0); 
// // // // // //         setPollQuestion(''); setPollOptions(['', '']); setEssayQuestions(['']); setUseEssayTimer(false);
// // // // // //         setExistingFileUrl(null); // Reset preview url
// // // // // //     };

// // // // // //     const resetModuleForm = () => {
// // // // // //         setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false);
// // // // // //     };

// // // // // //     const handleSaveModule = async () => { 
// // // // // //         if (!modTitle.trim()) return alert("Judul modul wajib diisi"); 
// // // // // //         const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: modFacilitatorId || null, jp: modJp, scheduleDate: modSchedule || null }; 
// // // // // //         try { 
// // // // // //             if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); 
// // // // // //             else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); 
// // // // // //             alert("Modul berhasil disimpan!"); resetModuleForm(); refreshData(); 
// // // // // //         } catch(e: any) { alert(e.message); } 
// // // // // //     };

// // // // // //     const handleSaveLesson = async (modId: string) => { 
// // // // // //         if (!lesTitle.trim()) { alert("Judul materi wajib diisi!"); return; } 
// // // // // //         let fileUrl = ''; 
// // // // // //         if (selectedFile) { 
// // // // // //             try { 
// // // // // //                 setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); 
// // // // // //                 const res = await apiUpload('/api/upload', fd); 
// // // // // //                 fileUrl = res.url || res.file?.url || res.imageUrl; 
// // // // // //             } catch (err) { alert("Gagal upload file!"); return; } finally { setUploading(false); } 
// // // // // //         } else if (editingLesId) { 
// // // // // //             // Gunakan URL yang sudah ada jika tidak ada file baru
// // // // // //             fileUrl = existingFileUrl || ''; 
// // // // // //         } 
        
// // // // // //         const body: any = { 
// // // // // //             title: lesTitle, type: lesType, isActive: true, isMandatory: lesIsMandatory, 
// // // // // //             jp: lesJp, facilitatorId: lesFacilitatorId || null, scheduleDate: lesSchedule || null, 
// // // // // //             quizDuration: quizDuration, 
// // // // // //             questions: (lesType === 'quiz') ? questions : undefined, 
// // // // // //             pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, 
// // // // // //             pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, 
// // // // // //             classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined 
// // // // // //         }; 
        
// // // // // //         if (lesType === 'essay') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; } 
// // // // // //         if(fileUrl) body.fileUrl = fileUrl; 
// // // // // //         if(lesType === 'video_url') body.videoUrl = lesContent; 
        
// // // // // //         // Handle Virtual Class: Simpan meetingLink dari lesContent
// // // // // //         else if(lesType === 'virtual_class') {
// // // // // //             body.meetingLink = lesContent; 
// // // // // //             body.content = lesContent; // Backup di content
// // // // // //         }
// // // // // //         else if(['lesson', 'upload_doc', 'download_doc', 'image', 'slide'].includes(lesType)) body.content = lesContent; 
        
// // // // // //         try { 
// // // // // //             if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); 
// // // // // //             else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); 
// // // // // //             alert("Materi berhasil disimpan!"); resetLessonForm(); refreshData(); 
// // // // // //         } catch(e: any) { alert("Gagal menyimpan: " + e.message); } 
// // // // // //     };

// // // // // //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); alert("Dihapus!"); refreshData(); };
// // // // // //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); alert(newStatus ? "Dipublikasikan!" : "Jadi Draft"); refreshData(); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); refreshData(); } } catch (e: any) { alert(e.message); } };
// // // // // //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); refreshData(); } catch (err) { refreshData(); } };

// // // // // //     const handleAddNewContent = (modId: string) => { resetLessonForm(); setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); };
    
// // // // // //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
    
// // // // // //     const startEditLesson = (modId: string, les: any) => { 
// // // // // //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title); 
        
// // // // // //         // Load Timer Data
// // // // // //         setQuizDuration(les.quizDuration || 0);
// // // // // //         // Load File Data (agar bisa preview)
// // // // // //         setExistingFileUrl(les.fileUrl || null);

// // // // // //         if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { 
// // // // // //             setLesType('essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); 
// // // // // //         } else { setLesType(les.type); } 
        
// // // // // //         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || '')); 
// // // // // //         if (les.type === 'video_url') setLesContent(les.videoUrl||''); else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); else if (les.type !== 'essay') setLesContent(les.content||''); 
// // // // // //         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); } 
// // // // // //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); } 
// // // // // //         if (les.type === 'google_classroom') { const token = localStorage.getItem('google_class_token'); if(token) { setGoogleToken(token); fetchClassroomCourses(token); } if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); } 
        
// // // // // //         setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150); 
// // // // // //     };

// // // // // //     return (
// // // // // //         <div className="animate-in fade-in duration-300 space-y-6">
// // // // // //             <div className="flex border-b border-gray-200">
// // // // // //                 <button onClick={() => setActiveEditorTab('curriculum')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeEditorTab === 'curriculum' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Kurikulum"><Layout size={18}/> Kurikulum & Materi</button>
// // // // // //                 <button onClick={() => setActiveEditorTab('certificate')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeEditorTab === 'certificate' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Sertifikat"><Award size={18}/> Sertifikat & Kompetensi</button>
// // // // // //             </div>

// // // // // //             {activeEditorTab === 'curriculum' && (
// // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-left-4">
// // // // // //                     <div className="md:col-span-1 space-y-6">
// // // // // //                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
// // // // // //                             {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
// // // // // //                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Ganti Cover">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Upload Cover"/></div>
// // // // // //                         </div>
// // // // // //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
// // // // // //                             <div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" aria-label="Simpan Tim">Simpan</button></div>
// // // // // //                             <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">{facilitators.map((user: any) => (<label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}><input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih ${user.name}`} /><div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div></label>))}</div>
// // // // // //                             <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" />
// // // // // //                         </div>
// // // // // //                     </div>

// // // // // //                     <div className="md:col-span-2 space-y-6">
// // // // // //                         <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">Struktur Modul</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 flex items-center gap-2" aria-label="Tambah Modul">+ Tambah Modul</button></div>
// // // // // //                         {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul"/><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" aria-label="JP"/></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih PJ"><option value="">-- Pilih Fasilitator --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal" /></div></div><div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetModuleForm} className="text-sm text-gray-500 font-bold" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold" aria-label="Simpan">Simpan</button></div></form>)}
                        
// // // // // //                         <DragDropContext onDragEnd={onDragEnd}>
// // // // // //                             <Droppable droppableId="all-modules" type="module">
// // // // // //                                 {(provided) => (
// // // // // //                                     <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
// // // // // //                                             {course?.modules?.map((m: any, idx: number) => (
// // // // // //                                                 <Draggable key={m._id} draggableId={m._id} index={idx}>
// // // // // //                                                     {(provided) => (
// // // // // //                                                         <div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-xl overflow-hidden bg-white shadow-sm">
// // // // // //                                                             <div className="bg-gray-50 p-3 flex justify-between items-center" {...provided.dragHandleProps}>
// // // // // //                                                                 <div className="flex items-center gap-3"><span className="cursor-grab text-gray-400" aria-label="Drag Modul">☰</span><div><span className="font-bold text-gray-700">{m.title}</span><div className="flex gap-2 text-[10px] mt-1 text-gray-500 font-medium"><span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">{m.jp} JP</span>{m.facilitatorId && <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100 flex items-center gap-1">👤 {getFacilitatorNameLabel(m.facilitatorId)}</span>}{m.scheduleDate && <span className="bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded border border-yellow-100 flex items-center gap-1">📅 {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}</div></div></div>
// // // // // //                                                                 <div className="flex gap-2"><button type="button" onClick={() => startEditModule(m)} className="text-xs text-blue-600 font-bold" aria-label="Edit">Edit</button><button type="button" onClick={() => toggleStatus(m._id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${m.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Modul"><span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${m.isActive ? 'translate-x-4' : 'translate-x-1'}`} /></button></div>
// // // // // //                                                             </div>
// // // // // //                                                             <Droppable droppableId={m._id} type="lesson">
// // // // // //                                                                 {(provided) => (
// // // // // //                                                                     <div ref={provided.innerRef} {...provided.droppableProps} className="p-3 space-y-2">
// // // // // //                                                                             {m.lessons?.map((l: any, lIdx: number) => (
// // // // // //                                                                                 <Draggable key={l._id} draggableId={l._id} index={lIdx}>
// // // // // //                                                                                     {(provided) => (
// // // // // //                                                                                         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-2 bg-white border rounded hover:bg-gray-50">
// // // // // //                                                                                             <div className="flex gap-2 items-center">
// // // // // //                                                                                                 <span className="cursor-grab text-gray-400" aria-label="Drag">::</span>
// // // // // //                                                                                                 <span className="text-lg">{l.type === 'video_url' ? '🎞️' : l.type === 'quiz' ? '📝' : l.type === 'essay' ? '✍️' : l.type === 'slide' ? '📑' : '📄'}</span>
// // // // // //                                                                                                 <div>
// // // // // //                                                                                                     <p className="text-sm font-bold text-gray-800">{l.title}</p>
// // // // // //                                                                                                     <div className="flex gap-2 items-center flex-wrap mt-0.5">
// // // // // //                                                                                                         <span className="text-[10px] text-gray-500 uppercase font-bold">{l.type}</span>
// // // // // //                                                                                                         {l.quizDuration > 0 && (
// // // // // //                                                                                                             <span className="text-[10px] bg-yellow-50 text-yellow-700 px-1.5 rounded border border-yellow-100 font-medium flex items-center gap-1">
// // // // // //                                                                                                                 <Clock size={10} /> {l.quizDuration} Menit
// // // // // //                                                                                                             </span>
// // // // // //                                                                                                         )}
// // // // // //                                                                                                         {l.jp > 0 && <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 rounded border border-blue-100 font-medium">{l.jp} JP</span>}
// // // // // //                                                                                                         {l.isMandatory ? <span className="text-[10px] bg-red-50 text-red-700 px-1.5 rounded border border-red-100 font-medium">Wajib</span> : <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 rounded border font-medium">Opsional</span>}
// // // // // //                                                                                                         {l.facilitatorId && <span className="text-[10px] text-purple-600 flex items-center gap-1 font-medium">👤 {getFacilitatorNameLabel(l.facilitatorId)}</span>}
// // // // // //                                                                                                         {l.scheduleDate && <span className="text-[10px] text-blue-600 flex items-center gap-1 font-medium">📅 {new Date(l.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // // // //                                                                                                     </div>
// // // // // //                                                                                                 </div>
// // // // // //                                                                                             </div>
// // // // // //                                                                                             <div className="flex gap-2 items-center"><button type="button" onClick={() => startEditLesson(m._id, l)} className="text-blue-500 text-xs font-bold" aria-label="Edit">Edit</button><button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-red-500 text-xs font-bold" aria-label="Hapus">Hapus</button><button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${l.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Lesson"><span className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${l.isActive ? 'translate-x-3.5' : 'translate-x-0.5'}`} /></button></div>
// // // // // //                                                                                         </div>
// // // // // //                                                                                     )}
// // // // // //                                                                                 </Draggable>
// // // // // //                                                                             ))}
// // // // // //                                                                         {provided.placeholder}
// // // // // //                                                                         {activeModId === m._id ? (
// // // // // //                                                                             <div id={`form-${m._id}`} className="bg-blue-50 p-4 rounded border border-blue-200 mt-2 space-y-3">
// // // // // //                                                                                 <div className="grid grid-cols-12 gap-2">
// // // // // //                                                                                     <div className="col-span-4">
// // // // // //                                                                                         <select className="w-full p-2 border rounded text-sm bg-white" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Tipe Konten">
// // // // // //                                                                                             <option value="lesson">📄 Materi Teks</option>
// // // // // //                                                                                             <option value="essay">📝 Esai</option>
// // // // // //                                                                                             <option value="slide">🖥️ Slide Presentasi</option>
// // // // // //                                                                                             <option value="image">🖼️ Upload Gambar</option>
// // // // // //                                                                                             <option value="download_doc">📥 Upload Dokumen</option>
// // // // // //                                                                                             <option value="upload_doc">📤 Tugas Upload</option>
// // // // // //                                                                                             <option value="quiz">📝 Kuis</option>
// // // // // //                                                                                             <option value="poll">📊 Polling</option>
// // // // // //                                                                                             <option value="video_url">🎞️ Video URL (YouTube)</option>
// // // // // //                                                                                             <option value="virtual_class">🎥 Kelas Virtual (Meet/Zoom)</option>
// // // // // //                                                                                             <option value="google_classroom">🏫 Google Classroom</option>
// // // // // //                                                                                         </select>
// // // // // //                                                                                     </div>
// // // // // //                                                                                     <div className="col-span-6"><input className="w-full p-2 border rounded text-sm" placeholder="Judul Materi..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi"/></div>
// // // // // //                                                                                     <div className="col-span-2"><input type="number" className="w-full p-2 border rounded text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="JP"/></div>
// // // // // //                                                                                 </div>

// // // // // //                                                                                 <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded border border-yellow-200">
// // // // // //                                                                                     <Clock size={18} className="text-yellow-700"/>
// // // // // //                                                                                     <div className="flex items-center gap-2 text-sm text-yellow-800">
// // // // // //                                                                                         <span className="font-bold">Durasi Timer (Opsional):</span>
// // // // // //                                                                                         <input type="number" min="0" className="w-20 p-1 border border-yellow-400 rounded text-center font-bold bg-white" value={quizDuration} onChange={(e) => setQuizDuration(Number(e.target.value))} placeholder="0" aria-label="Durasi Timer"/>
// // // // // //                                                                                         <span>menit (0 = Tidak ada batas)</span>
// // // // // //                                                                                     </div>
// // // // // //                                                                                 </div>

// // // // // //                                                                                 <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded border border-blue-100"><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Fasilitator (Opsional)</label><select className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesFacilitatorId} onChange={e=>setLesFacilitatorId(e.target.value)} aria-label="Pilih Fasilitator"><option value="">-- Ikut Modul --</option>{activeTeam.map((f:any)=><option key={f._id} value={f._id}>{f.name}</option>)}</select></div><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesSchedule} onChange={e=>setLesSchedule(e.target.value)} aria-label="Tanggal" /></div><div className="flex items-center h-full pt-4"><label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e=>setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib"/> Wajib diselesaikan?</label></div></div>
                                                                                
// // // // // //                                                                                 {/* [UPDATE] FORM ESAI MENGGUNAKAN RICH TEXT EDITOR DENGAN SAFETY UPDATE */}
// // // // // //                                                                                 {lesType === 'essay' && (
// // // // // //                                                                                     <div className="bg-white p-3 rounded border">
// // // // // //                                                                                         <div className="mb-2">
// // // // // //                                                                                             <label className="text-xs font-bold text-gray-500">Instruksi Soal:</label>
// // // // // //                                                                                             <ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-32 mb-10"/>
// // // // // //                                                                                         </div>
// // // // // //                                                                                         <label className="text-xs font-bold text-gray-500 block mt-4 mb-2">Pertanyaan Esai:</label>
// // // // // //                                                                                         {essayQuestions.map((q, ix) => (
// // // // // //                                                                                             <div key={ix} className="flex gap-2 mb-4 items-start">
// // // // // //                                                                                                 <div className="flex-1">
// // // // // //                                                                                                     <ReactQuill 
// // // // // //                                                                                                         theme="snow" 
// // // // // //                                                                                                         value={q} 
// // // // // //                                                                                                         onChange={(val) => updateEssay(ix, val)} 
// // // // // //                                                                                                         modules={quillModules}
// // // // // //                                                                                                         placeholder={`Pertanyaan ${ix + 1}`}
// // // // // //                                                                                                         className="h-24 mb-10 bg-white"
// // // // // //                                                                                                     />
// // // // // //                                                                                                 </div>
// // // // // //                                                                                                 {essayQuestions.length > 1 && (
// // // // // //                                                                                                     <button type="button" onClick={()=>removeEssay(ix)} className="text-red-500 font-bold p-2 bg-red-50 rounded hover:bg-red-100" aria-label="Hapus">
// // // // // //                                                                                                         <Trash2 size={16} />
// // // // // //                                                                                                     </button>
// // // // // //                                                                                                 )}
// // // // // //                                                                                             </div>
// // // // // //                                                                                         ))}
// // // // // //                                                                                         <button type="button" onClick={addEssayRow} className="text-xs text-blue-600 font-bold flex items-center gap-1 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50" aria-label="Tambah Tanya">
// // // // // //                                                                                             <Plus size={14} /> Tambah Pertanyaan
// // // // // //                                                                                         </button>
// // // // // //                                                                                     </div>
// // // // // //                                                                                 )}

// // // // // //                                                                                 {lesType === 'quiz' && (<div className="bg-white p-3 rounded border">{questions.map((q, ix) => (<div key={ix} className="p-2 border rounded bg-gray-50 mb-2 relative"><button type="button" onClick={()=>removeQuestion(ix)} className="absolute top-1 right-1 text-red-500 font-bold text-xs" aria-label="Hapus Soal">x</button><input className="w-full p-1 border rounded mb-1 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e=>updateQuestion(ix, 'question', e.target.value)} aria-label={`Pertanyaan ${ix+1}`}/><div className="grid grid-cols-2 gap-2">{q.options.map((o:string, oi:number) => <input key={oi} className={`w-full p-1 border text-xs ${q.correctIndex===oi?'bg-green-100 border-green-300':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix, 'options', e.target.value, oi)} aria-label={`Opsi ${oi+1}`}/>)}</div><div className="mt-1 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix, 'correctIndex', Number(e.target.value))} className="w-10 border" aria-label="Jawaban Benar"/></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}
// // // // // //                                                                                 {lesType === 'poll' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} aria-label="Tanya Polling"/>{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2 mb-1"><input className="flex-1 p-1 border rounded text-xs" value={opt} onChange={e=>updatePollOption(idx, e.target.value)} placeholder={`Opsi ${idx+1}`} aria-label={`Opsi ${idx+1}`}/>{pollOptions.length > 2 && <button onClick={()=>removePollOption(idx)} className="text-red-500 font-bold" aria-label="Hapus">x</button>}</div>))}<button type="button" onClick={addPollOption} className="text-xs text-blue-600 font-bold" aria-label="Tambah Opsi">+ Opsi</button></div>)}
// // // // // //                                                                                 {['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded border"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-48 mb-12" placeholder="Tulis materi..."/></div>)}
                                                                                
// // // // // //                                                                                 {lesType === 'video_url' && (
// // // // // //                                                                                     <div className="bg-white p-3 rounded border space-y-2">
// // // // // //                                                                                         <input className="w-full p-2 border rounded text-sm" placeholder="Link YouTube..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Video"/>
// // // // // //                                                                                         {lesContent && (<div className="bg-gray-100 p-2 rounded text-xs text-gray-500 flex items-center gap-2"><Video size={14}/> <span className="truncate flex-1">{lesContent}</span><span className="bg-green-100 text-green-700 px-1.5 rounded">Tersimpan</span></div>)}
// // // // // //                                                                                     </div>
// // // // // //                                                                                 )}

// // // // // //                                                                                 {lesType === 'virtual_class' && (
// // // // // //                                                                                     <div className="bg-white p-3 rounded border space-y-2">
// // // // // //                                                                                         <input className="w-full p-2 border rounded text-sm" placeholder="Link Zoom/Meet..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Zoom"/>
// // // // // //                                                                                         {lesContent && (<a href={lesContent} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:underline bg-blue-50 p-2 rounded border border-blue-100"><ExternalLink size={14} /> <span className="truncate">Coba Link: {lesContent}</span></a>)}
// // // // // //                                                                                     </div>
// // // // // //                                                                                 )}

// // // // // //                                                                                 {['image','upload_doc','slide','download_doc'].includes(lesType) && (
// // // // // //                                                                                     <div className="bg-white p-4 rounded border border-gray-200">
// // // // // //                                                                                         <label className="block text-xs font-bold text-gray-600 mb-2">Upload File (Gambar/Dokumen)</label>
// // // // // //                                                                                         <input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Upload File"/>
// // // // // //                                                                                         {existingFileUrl && !selectedFile && (
// // // // // //                                                                                             <div className="mt-2 flex items-center gap-3 bg-gray-50 p-2 rounded border border-gray-200">
// // // // // //                                                                                                 {lesType === 'image' ? (<img src={getImageUrl(existingFileUrl)} alt="Preview" className="h-12 w-12 object-cover rounded border" />) : (<FileText className="text-gray-400" size={24} />)}
// // // // // //                                                                                                 <div className="flex-1 overflow-hidden"><div className="text-xs font-bold text-gray-600">File Tersimpan</div><a href={getImageUrl(existingFileUrl)} target="_blank" className="text-[10px] text-blue-600 truncate block hover:underline">{existingFileUrl.split('/').pop()}</a></div>
// // // // // //                                                                                             </div>
// // // // // //                                                                                         )}
// // // // // //                                                                                     </div>
// // // // // //                                                                                 )}

// // // // // //                                                                                 {lesType === 'google_classroom' && (<div className="bg-white p-4 rounded border border-green-200 space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Class"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putus Akun"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}</div>)}

// // // // // //                                                                                 <div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetLessonForm} className="text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" aria-label="Simpan Materi">Simpan Materi</button></div>
// // // // // //                                                                             </div>
// // // // // //                                                                         ) : (
// // // // // //                                                                             <button type="button" onClick={() => { handleAddNewContent(m._id) }} className="w-full py-2 border-2 border-dashed border-gray-200 rounded text-xs text-gray-400 font-bold hover:border-blue-300 hover:text-blue-600 mt-2" aria-label="Tambah Konten">+ Tambah Konten</button>
// // // // // //                                                                         )}
// // // // // //                                                                 </div>
// // // // // //                                                             )}
// // // // // //                                                         </Droppable>
// // // // // //                                                     </div>
// // // // // //                                                 )}
// // // // // //                                             </Draggable>
// // // // // //                                         ))}
// // // // // //                                         {provided.placeholder}
// // // // // //                                     </div>
// // // // // //                                 )}
// // // // // //                             </Droppable>
// // // // // //                         </DragDropContext>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             )}

// // // // // //             {activeEditorTab === 'certificate' && (
// // // // // //                 <div className="space-y-8 animate-in slide-in-from-right-4">
// // // // // //                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
// // // // // //                         <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">1. Unit Kompetensi</h2>
// // // // // //                         <CompetencyForm initialData={competencies} onChange={(data) => setCompetencies(data)} />
// // // // // //                         <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
// // // // // //                             <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={includeCompetencies} onChange={e=>setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Tampilkan Kompetensi"/><span className="text-sm font-bold text-gray-700">Tampilkan daftar kompetensi di halaman belakang sertifikat?</span></label>
// // // // // //                             <button type="button" onClick={handleSaveCompetencies} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                     <div><h2 className="text-xl font-bold text-gray-800 mb-4 px-2">2. Pengaturan Sertifikat</h2><CertificateConfigForm initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} courseTitle={course?.title || 'Judul Pelatihan'} /></div>
// // // // // //                 </div>
// // // // // //             )}
            
// // // // // //             <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3 mt-8"><h3 className="text-lg font-bold text-gray-800">Status Publikasi</h3><button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Ubah Status">{course?.isPublished ? 'Tarik Kembali (Draft)' : '🚀 PUBLISH SEKARANG'}</button></div>
// // // // // //         </div>
// // // // // //     );
// // // // // // }
// // // // // 'use client';

// // // // // import { useState, useRef, useMemo, useEffect } from 'react';
// // // // // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // import CompetencyForm from '@/components/admin/CompetencyForm';
// // // // // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // // // // import GradingSchemeForm from '@/components/admin/GradingSchemeForm'; // [NEW] Import Grading Form
// // // // // import {
// // // // //     Calendar, School, RefreshCw, LogOut, CheckCircle2, 
// // // // //     Link as LinkIcon, Users, FileText, Download,
// // // // //     FileBadge, MapPin, UserCheck, Hash, BarChart3, 
// // // // //     BookOpen, Trash2, Plus, Video, Image as ImageIcon,
// // // // //     Award, Layout, Clock, ExternalLink, Calculator // [NEW] Add Calculator Icon
// // // // // } from 'lucide-react';

// // // // // import dynamic from 'next/dynamic';
// // // // // import 'react-quill/dist/quill.snow.css'; 

// // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // //     ssr: false,
// // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // });

// // // // // interface CourseContentEditorProps {
// // // // //     course: any;
// // // // //     courseId: string;
// // // // //     refreshData: () => void;
// // // // //     facilitators: any[]; 
// // // // // }

// // // // // export default function CourseContentEditor({ course, courseId, refreshData, facilitators }: CourseContentEditorProps) {
// // // // //     // [UPDATE] Tambahkan 'grading' ke tipe state tab
// // // // //     const [activeEditorTab, setActiveEditorTab] = useState<'curriculum' | 'certificate' | 'grading'>('curriculum');
// // // // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // // // //     const [isUploadingCover, setIsUploadingCover] = useState(false);
    
// // // // //     // --- STATE MODUL ---
// // // // //     const [showModuleForm, setShowModuleForm] = useState(false);
// // // // //     const [modTitle, setModTitle] = useState('');
// // // // //     const [modIsMandatory, setModIsMandatory] = useState(true);
// // // // //     const [modFacilitatorId, setModFacilitatorId] = useState('');
// // // // //     const [modJp, setModJp] = useState(0);
// // // // //     const [modSchedule, setModSchedule] = useState('');
// // // // //     const [editingModId, setEditingModId] = useState<string | null>(null);

// // // // //     // --- STATE LESSON (MATERI) ---
// // // // //     const [activeModId, setActiveModId] = useState<string | null>(null); 
// // // // //     const [editingLesId, setEditingLesId] = useState<string | null>(null);
// // // // //     const [lesTitle, setLesTitle] = useState('');
// // // // //     const [lesType, setLesType] = useState('lesson');
// // // // //     const [lesContent, setLesContent] = useState('');
// // // // //     const [lesIsMandatory, setLesIsMandatory] = useState(true);
// // // // //     const [lesJp, setLesJp] = useState(0);
// // // // //     const [lesSchedule, setLesSchedule] = useState('');
// // // // //     const [lesFacilitatorId, setLesFacilitatorId] = useState('');
// // // // //     const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // // //     const [uploading, setUploading] = useState(false);
// // // // //     const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);

// // // // //     // --- STATE TIMER / QUIZ / POLL ---
// // // // //     const [quizDuration, setQuizDuration] = useState(0); 
// // // // //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// // // // //     const [pollQuestion, setPollQuestion] = useState('');
// // // // //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
// // // // //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// // // // //     const [useEssayTimer, setUseEssayTimer] = useState(false);

// // // // //     // --- STATE GOOGLE CLASSROOM ---
// // // // //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// // // // //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// // // // //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// // // // //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// // // // //     // --- STATE SETTINGS ---
// // // // //     const [competencies, setCompetencies] = useState<any[]>(course?.competencies || []);
// // // // //     const [includeCompetencies, setIncludeCompetencies] = useState(course?.includeCompetenciesInCertificate ?? true);
// // // // //     const [certConfig, setCertConfig] = useState<any>(course?.certificateConfig || {});
// // // // //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>(
// // // // //         course?.facilitatorIds?.map((f: any) => (typeof f === 'object' ? f._id : f)) || []
// // // // //     );
// // // // //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// // // // //     const [isSavingCert, setIsSavingCert] = useState(false);
// // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');

// // // // //     useEffect(() => {
// // // // //         if (course) {
// // // // //             setCompetencies(course.competencies || []);
// // // // // //             setIncludeCompetencies(course.includeCompetenciesInCertificate ?? true);
// // // // // // //             setCertConfig(course.certificateConfig || {});
// // // // // // //             if (course.facilitatorIds) {
// // // // // // //                 setSelectedFacilitatorIds(course.facilitatorIds.map((f: any) => (typeof f === 'object' ? f._id : f)));
// // // // // // //             }
// // // // // // //         }
// // // // // // //     }, [course]);

// // // // // // //     const activeTeam = facilitators.filter((u: any) => selectedFacilitatorIds.includes(u._id) || u.role === 'SUPER_ADMIN');
// // // // // // //     const quillModules = useMemo(() => ({ toolbar: { container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'image', 'video'], [{ 'color': [] }, { 'background': [] }], ['clean']] } }), []);
// // // // // // //     const getFacilitatorNameLabel = (data: any) => { if (!data) return null; if (typeof data === 'object' && data.name) return data.name; const found = facilitators.find(f => f._id === data || f.id === data); return found ? found.name : 'Unknown'; };

// // // // // // //     // --- HELPER FUNCTIONS ---
// // // // // // //     const addPollOption = () => setPollOptions([...pollOptions, '']); 
// // // // // // //     const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; 
// // // // // // //     const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); }; 
// // // // // // //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // // // // // // //     const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; 
// // // // // // // // //     const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); }; 
// // // // // // // // //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); 
    
// // // // // // // // //     // Update Essay dengan pengecekan strict untuk mencegah infinite loop
// // // // // // // // //     const updateEssay = (idx: number, val: string) => { 
// // // // // // // // //         setEssayQuestions(prev => {
// // // // // // // // //             if (prev[idx] === val) return prev;
// // // // // // // // //             const newQ = [...prev];
// // // // // // // // //             newQ[idx] = val;
// // // // // // // // //             return newQ;
// // // // // // // // //         });
// // // // // // // // //     }; 
    
// // // // // // // // //     const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };

// // // // // // // // //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); window.open(url, 'GoogleAuthPopup', `width=500,height=600`); } catch (e) { alert("Gagal Auth Google"); } }; 
// // // // // // // // //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } }; 
// // // // // // // // //     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const data = await api('/api/classroom/courses', { headers: { 'x-google-token': token } }); if (data.courses) setClassroomCourses(data.courses); } catch (e: any) { if(e.status === 401 || e.message?.includes('401')) { localStorage.removeItem('google_class_token'); setGoogleToken(null); } } finally { setIsCheckingGoogle(false); } };
    
// // // // // // // // //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); await apiUpload(`/api/upload/course/${courseId}/cover`, formData); refreshData(); alert("Cover berhasil diperbarui!"); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// // // // // // // // //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); }; 
// // // // // // // // //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } };
// // // // // // // // //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); setCertConfig(data); alert("Pengaturan Sertifikat Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// // // // // // // // //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Kompetensi Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };

// // // // // // // // //     // --- MAIN LOGIC ---
// // // // // // // // //     const resetLessonForm = () => {
// // // // // // // // //         setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesType('lesson'); setLesContent(''); setLesIsMandatory(true); setLesJp(0); setLesSchedule(''); setLesFacilitatorId(''); setSelectedFile(null);
// // // // // // // // //         setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // // // // // // // //         setQuizDuration(0); 
// // // // // // // // //         setPollQuestion(''); setPollOptions(['', '']); setEssayQuestions(['']); setUseEssayTimer(false);
// // // // // // // // //         setExistingFileUrl(null); 
// // // // // // // // //     };

// // // // // // // // //     const resetModuleForm = () => {
// // // // // // // // //         setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false);
// // // // // // // // //     };

// // // // // // // // //     const handleSaveModule = async () => { 
// // // // // // // // //         if (!modTitle.trim()) return alert("Judul modul wajib diisi"); 
// // // // // // // // //         const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: modFacilitatorId || null, jp: modJp, scheduleDate: modSchedule || null }; 
// // // // // // // // //         try { 
// // // // // // // // //             if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); 
// // // // // // // // //             else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); 
// // // // // // // // //             alert("Modul berhasil disimpan!"); resetModuleForm(); refreshData(); 
// // // // // // // // //         } catch(e: any) { alert(e.message); } 
// // // // // // // // //     };

// // // // // // // // //     const handleSaveLesson = async (modId: string) => { 
// // // // // // // // //         if (!lesTitle.trim()) { alert("Judul materi wajib diisi!"); return; } 
// // // // // // // // //         let fileUrl = ''; 
// // // // // // // // //         if (selectedFile) { 
// // // // // // // // //             try { 
// // // // // // // // //                 setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); 
// // // // // // // // //                 const res = await apiUpload('/api/upload', fd); 
// // // // // // // // //                 fileUrl = res.url || res.file?.url || res.imageUrl; 
// // // // // // // // //             } catch (err) { alert("Gagal upload file!"); return; } finally { setUploading(false); } 
// // // // // // // // //         } else if (editingLesId) { 
// // // // // // // // //             fileUrl = existingFileUrl || ''; 
// // // // // // // // //         } 
        
// // // // // // // // //         const body: any = { 
// // // // // // // // //             title: lesTitle, type: lesType, isActive: true, isMandatory: lesIsMandatory, 
// // // // // // // // //             jp: lesJp, facilitatorId: lesFacilitatorId || null, scheduleDate: lesSchedule || null, 
// // // // // // // // //             quizDuration: quizDuration, 
// // // // // // // // //             questions: (lesType === 'quiz') ? questions : undefined, 
// // // // // // // // //             pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, 
// // // // // // // // //             pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, 
// // // // // // // // //             classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined 
// // // // // // // // //         }; 
        
// // // // // // // // //         if (lesType === 'essay') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; } 
// // // // // // // // //         if(fileUrl) body.fileUrl = fileUrl; 
// // // // // // // // //         if(lesType === 'video_url') body.videoUrl = lesContent; 
// // // // // // // // //         else if(lesType === 'virtual_class') {
// // // // // // // // //             body.meetingLink = lesContent; 
// // // // // // // // //             body.content = lesContent; 
// // // // // // // // //         }
// // // // // // // // //         else if(['lesson', 'upload_doc', 'download_doc', 'image', 'slide'].includes(lesType)) body.content = lesContent; 
        
// // // // // // // // //         try { 
// // // // // // // // //             if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); 
// // // // // // // // //             else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); 
// // // // // // // // //             alert("Materi berhasil disimpan!"); resetLessonForm(); refreshData(); 
// // // // // // // // //         } catch(e: any) { alert("Gagal menyimpan: " + e.message); } 
// // // // // // // // //     };

// // // // // // // // //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); alert("Dihapus!"); refreshData(); };
// // // // // // // // //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); alert(newStatus ? "Dipublikasikan!" : "Jadi Draft"); refreshData(); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); refreshData(); } } catch (e: any) { alert(e.message); } };
// // // // // // // // //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); refreshData(); } catch (err) { refreshData(); } };

// // // // // // // // //     const handleAddNewContent = (modId: string) => { resetLessonForm(); setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); };
    
// // // // // // // // //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
    
// // // // // // // // //     const startEditLesson = (modId: string, les: any) => { 
// // // // // // // // //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title); 
// // // // // // // // //         setQuizDuration(les.quizDuration || 0);
// // // // // // // // //         setExistingFileUrl(les.fileUrl || null);

// // // // // // // // //         if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { 
// // // // // // // // //             setLesType('essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); 
// // // // // // // // //         } else { setLesType(les.type); } 
        
// // // // // // // // //         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || '')); 
// // // // // // // // //         if (les.type === 'video_url') setLesContent(les.videoUrl||''); else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); else if (les.type !== 'essay') setLesContent(les.content||''); 
// // // // // // // // //         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); } 
// // // // // // // // //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); } 
// // // // // // // // //         if (les.type === 'google_classroom') { const token = localStorage.getItem('google_class_token'); if(token) { setGoogleToken(token); fetchClassroomCourses(token); } if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); } 
        
// // // // // // // // //         setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150); 
// // // // // // // // //     };

// // // // // // // // //     return (
// // // // // // // // //         <div className="animate-in fade-in duration-300 space-y-6">
// // // // // // // // //             <div className="flex border-b border-gray-200 overflow-x-auto">
// // // // // // // // //                 <button onClick={() => setActiveEditorTab('curriculum')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'curriculum' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Kurikulum"><Layout size={18}/> Kurikulum & Materi</button>
// // // // // // // // //                 {/* [NEW] TAB SKEMA PENILAIAN */}
// // // // // // // // //                 <button onClick={() => setActiveEditorTab('grading')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'grading' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Skema Penilaian"><Calculator size={18}/> Skema Penilaian</button>
// // // // // // // // //                 <button onClick={() => setActiveEditorTab('certificate')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'certificate' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Sertifikat"><Award size={18}/> Sertifikat & Kompetensi</button>
// // // // // // // // //             </div>

// // // // // // // // //             {activeEditorTab === 'curriculum' && (
// // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-left-4">
// // // // // // // // //                     <div className="md:col-span-1 space-y-6">
// // // // // // // // //                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
// // // // // // // // //                             {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
// // // // // // // // //                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Ganti Cover">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Upload Cover"/></div>
// // // // // // // // //                         </div>
// // // // // // // // //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
// // // // // // // // //                             <div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" aria-label="Simpan Tim">Simpan</button></div>
// // // // // // // // //                             <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">{facilitators.map((user: any) => (<label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}><input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih ${user.name}`} /><div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div></label>))}</div>
// // // // // // // // //                             <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" />
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>

// // // // // // // // //                     <div className="md:col-span-2 space-y-6">
// // // // // // // // //                         <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">Struktur Modul</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 flex items-center gap-2" aria-label="Tambah Modul">+ Tambah Modul</button></div>
// // // // // // // // //                         {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul"/><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" aria-label="JP"/></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih PJ"><option value="">-- Pilih Fasilitator --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal" /></div></div><div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetModuleForm} className="text-sm text-gray-500 font-bold" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold" aria-label="Simpan">Simpan</button></div></form>)}
                        
// // // // // // // // //                         <DragDropContext onDragEnd={onDragEnd}>
// // // // // // // // //                             <Droppable droppableId="all-modules" type="module">
// // // // // // // // //                                 {(provided) => (
// // // // // // // // //                                     <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
// // // // // // // // //                                             {course?.modules?.map((m: any, idx: number) => (
// // // // // // // // //                                                 <Draggable key={m._id} draggableId={m._id} index={idx}>
// // // // // // // // //                                                     {(provided) => (
// // // // // // // // //                                                         <div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-xl overflow-hidden bg-white shadow-sm">
// // // // // // // // //                                                             <div className="bg-gray-50 p-3 flex justify-between items-center" {...provided.dragHandleProps}>
// // // // // // // // //                                                                 <div className="flex items-center gap-3"><span className="cursor-grab text-gray-400" aria-label="Drag Modul">☰</span><div><span className="font-bold text-gray-700">{m.title}</span><div className="flex gap-2 text-[10px] mt-1 text-gray-500 font-medium"><span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">{m.jp} JP</span>{m.facilitatorId && <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100 flex items-center gap-1">👤 {getFacilitatorNameLabel(m.facilitatorId)}</span>}{m.scheduleDate && <span className="bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded border border-yellow-100 flex items-center gap-1">📅 {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}</div></div></div>
// // // // // // // // //                                                                 <div className="flex gap-2"><button type="button" onClick={() => startEditModule(m)} className="text-xs text-blue-600 font-bold" aria-label="Edit">Edit</button><button type="button" onClick={() => toggleStatus(m._id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${m.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Modul"><span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${m.isActive ? 'translate-x-4' : 'translate-x-1'}`} /></button></div>
// // // // // // // // //                                                             </div>
// // // // // // // // //                                                             <Droppable droppableId={m._id} type="lesson">
// // // // // // // // //                                                                 {(provided) => (
// // // // // // // // //                                                                     <div ref={provided.innerRef} {...provided.droppableProps} className="p-3 space-y-2">
// // // // // // // // //                                                                             {m.lessons?.map((l: any, lIdx: number) => (
// // // // // // // // //                                                                                 <Draggable key={l._id} draggableId={l._id} index={lIdx}>
// // // // // // // // //                                                                                     {(provided) => (
// // // // // // // // //                                                                                         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-2 bg-white border rounded hover:bg-gray-50">
// // // // // // // // //                                                                                             <div className="flex gap-2 items-center">
// // // // // // // // //                                                                                                 <span className="cursor-grab text-gray-400" aria-label="Drag">::</span>
// // // // // // // // //                                                                                                 <span className="text-lg">{l.type === 'video_url' ? '🎞️' : l.type === 'quiz' ? '📝' : l.type === 'essay' ? '✍️' : l.type === 'slide' ? '📑' : '📄'}</span>
// // // // // // // // //                                                                                                 <div>
// // // // // // // // //                                                                                                     <p className="text-sm font-bold text-gray-800">{l.title}</p>
// // // // // // // // //                                                                                                     <div className="flex gap-2 items-center flex-wrap mt-0.5">
// // // // // // // // //                                                                                                         <span className="text-[10px] text-gray-500 uppercase font-bold">{l.type}</span>
// // // // // // // // //                                                                                                         {l.quizDuration > 0 && <span className="text-[10px] bg-yellow-50 text-yellow-700 px-1.5 rounded border border-yellow-100 font-medium flex items-center gap-1"><Clock size={10} /> {l.quizDuration} Menit</span>}
// // // // // // // // //                                                                                                         {l.jp > 0 && <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 rounded border border-blue-100 font-medium">{l.jp} JP</span>}
// // // // // // // // //                                                                                                         {l.isMandatory ? <span className="text-[10px] bg-red-50 text-red-700 px-1.5 rounded border border-red-100 font-medium">Wajib</span> : <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 rounded border font-medium">Opsional</span>}
// // // // // // // // //                                                                                                         {l.facilitatorId && <span className="text-[10px] text-purple-600 flex items-center gap-1 font-medium">👤 {getFacilitatorNameLabel(l.facilitatorId)}</span>}
// // // // // // // // //                                                                                                         {l.scheduleDate && <span className="text-[10px] text-blue-600 flex items-center gap-1 font-medium">📅 {new Date(l.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // // // // // // //                                                                                                     </div>
// // // // // // // // //                                                                                                 </div>
// // // // // // // // //                                                                                             </div>
// // // // // // // // //                                                                                             <div className="flex gap-2 items-center"><button type="button" onClick={() => startEditLesson(m._id, l)} className="text-blue-500 text-xs font-bold" aria-label="Edit">Edit</button><button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-red-500 text-xs font-bold" aria-label="Hapus">Hapus</button><button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${l.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Lesson"><span className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${l.isActive ? 'translate-x-3.5' : 'translate-x-0.5'}`} /></button></div>
// // // // // // // // //                                                                                         </div>
// // // // // // // // //                                                                                     )}
// // // // // // // // //                                                                                 </Draggable>
// // // // // // // // //                                                                             ))}
// // // // // // // // //                                                                         {provided.placeholder}
// // // // // // // // //                                                                         {activeModId === m._id ? (
// // // // // // // // //                                                                             <div id={`form-${m._id}`} className="bg-blue-50 p-4 rounded border border-blue-200 mt-2 space-y-3">
// // // // // // // // //                                                                                 <div className="grid grid-cols-12 gap-2"><div className="col-span-4"><select className="w-full p-2 border rounded text-sm bg-white" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Tipe Konten"><option value="lesson">📄 Materi Teks</option><option value="essay">📝 Esai</option><option value="slide">🖥️ Slide Presentasi</option><option value="image">🖼️ Upload Gambar</option><option value="download_doc">📥 Upload Dokumen</option><option value="upload_doc">📤 Tugas Upload</option><option value="quiz">📝 Kuis</option><option value="poll">📊 Polling</option><option value="video_url">🎞️ Video URL (YouTube)</option><option value="virtual_class">🎥 Kelas Virtual (Meet/Zoom)</option><option value="google_classroom">🏫 Google Classroom</option></select></div><div className="col-span-6"><input className="w-full p-2 border rounded text-sm" placeholder="Judul Materi..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi"/></div><div className="col-span-2"><input type="number" className="w-full p-2 border rounded text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="JP"/></div></div>
// // // // // // // // //                                                                                 <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded border border-yellow-200"><Clock size={18} className="text-yellow-700"/><div className="flex items-center gap-2 text-sm text-yellow-800"><span className="font-bold">Durasi Timer (Opsional):</span><input type="number" min="0" className="w-20 p-1 border border-yellow-400 rounded text-center font-bold bg-white" value={quizDuration} onChange={(e) => setQuizDuration(Number(e.target.value))} placeholder="0" aria-label="Durasi Timer"/><span>menit (0 = Tidak ada batas)</span></div></div>
// // // // // // // // //                                                                                 <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded border border-blue-100"><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Fasilitator (Opsional)</label><select className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesFacilitatorId} onChange={e=>setLesFacilitatorId(e.target.value)} aria-label="Pilih Fasilitator"><option value="">-- Ikut Modul --</option>{activeTeam.map((f:any)=><option key={f._id} value={f._id}>{f.name}</option>)}</select></div><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesSchedule} onChange={e=>setLesSchedule(e.target.value)} aria-label="Tanggal" /></div><div className="flex items-center h-full pt-4"><label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e=>setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib"/> Wajib diselesaikan?</label></div></div>
// // // // // // // // //                                                                                 {lesType === 'essay' && (<div className="bg-white p-3 rounded border"><div className="mb-2"><label className="text-xs font-bold text-gray-500">Instruksi Soal:</label><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-32 mb-10"/></div><label className="text-xs font-bold text-gray-500 block mt-4 mb-2">Pertanyaan Esai:</label>{essayQuestions.map((q, ix) => (<div key={ix} className="flex gap-2 mb-4 items-start"><div className="flex-1"><ReactQuill theme="snow" value={q} onChange={(val) => updateEssay(ix, val)} modules={quillModules} placeholder={`Pertanyaan ${ix + 1}`} className="h-24 mb-10 bg-white"/></div>{essayQuestions.length > 1 && (<button type="button" onClick={()=>removeEssay(ix)} className="text-red-500 font-bold p-2 bg-red-50 rounded hover:bg-red-100" aria-label="Hapus"><Trash2 size={16} /></button>)}</div>))}<button type="button" onClick={addEssayRow} className="text-xs text-blue-600 font-bold flex items-center gap-1 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50" aria-label="Tambah Tanya"><Plus size={14} /> Tambah Pertanyaan</button></div>)}
// // // // // // // // //                                                                                 {lesType === 'quiz' && (<div className="bg-white p-3 rounded border">{questions.map((q, ix) => (<div key={ix} className="p-2 border rounded bg-gray-50 mb-2 relative"><button type="button" onClick={()=>removeQuestion(ix)} className="absolute top-1 right-1 text-red-500 font-bold text-xs" aria-label="Hapus Soal">x</button><input className="w-full p-1 border rounded mb-1 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e=>updateQuestion(ix, 'question', e.target.value)} aria-label={`Pertanyaan ${ix+1}`}/><div className="grid grid-cols-2 gap-2">{q.options.map((o:string, oi:number) => <input key={oi} className={`w-full p-1 border text-xs ${q.correctIndex===oi?'bg-green-100 border-green-300':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix, 'options', e.target.value, oi)} aria-label={`Opsi ${oi+1}`}/>)}</div><div className="mt-1 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix, 'correctIndex', Number(e.target.value))} className="w-10 border" aria-label="Jawaban Benar"/></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}
// // // // // // // // //                                                                                 {lesType === 'poll' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} aria-label="Tanya Polling"/>{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2 mb-1"><input className="flex-1 p-1 border rounded text-xs" value={opt} onChange={e=>updatePollOption(idx, e.target.value)} placeholder={`Opsi ${idx+1}`} aria-label={`Opsi ${idx+1}`}/>{pollOptions.length > 2 && <button onClick={()=>removePollOption(idx)} className="text-red-500 font-bold" aria-label="Hapus">x</button>}</div>))}<button type="button" onClick={addPollOption} className="text-xs text-blue-600 font-bold" aria-label="Tambah Opsi">+ Opsi</button></div>)}
// // // // // // // // //                                                                                 {['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded border"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-48 mb-12" placeholder="Tulis materi..."/></div>)}
// // // // // // // // //                                                                                 {lesType === 'video_url' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link YouTube..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Video"/>{lesContent && (<div className="bg-gray-100 p-2 rounded text-xs text-gray-500 flex items-center gap-2"><Video size={14}/> <span className="truncate flex-1">{lesContent}</span><span className="bg-green-100 text-green-700 px-1.5 rounded">Tersimpan</span></div>)}</div>)}
// // // // // // // // //                                                                                 {lesType === 'virtual_class' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link Zoom/Meet..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Zoom"/>{lesContent && (<a href={lesContent} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:underline bg-blue-50 p-2 rounded border border-blue-100"><ExternalLink size={14} /> <span className="truncate">Coba Link: {lesContent}</span></a>)}</div>)}
// // // // // // // // //                                                                                 {['image','upload_doc','slide','download_doc'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File (Gambar/Dokumen)</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Upload File"/>{existingFileUrl && !selectedFile && (<div className="mt-2 flex items-center gap-3 bg-gray-50 p-2 rounded border border-gray-200">{lesType === 'image' ? (<img src={getImageUrl(existingFileUrl)} alt="Preview" className="h-12 w-12 object-cover rounded border" />) : (<FileText className="text-gray-400" size={24} />)}<div className="flex-1 overflow-hidden"><div className="text-xs font-bold text-gray-600">File Tersimpan</div><a href={getImageUrl(existingFileUrl)} target="_blank" className="text-[10px] text-blue-600 truncate block hover:underline">{existingFileUrl.split('/').pop()}</a></div></div>)}</div>)}
// // // // // // // // //                                                                                 {lesType === 'google_classroom' && (<div className="bg-white p-4 rounded border border-green-200 space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Class"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putus Akun"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}</div>)}

// // // // // // // // //                                                                                 <div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetLessonForm} className="text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" aria-label="Simpan Materi">Simpan Materi</button></div>
// // // // // // // // //                                                                             </div>
// // // // // // // // //                                                                         ) : (
// // // // // // // // //                                                                             <button type="button" onClick={() => { handleAddNewContent(m._id) }} className="w-full py-2 border-2 border-dashed border-gray-200 rounded text-xs text-gray-400 font-bold hover:border-blue-300 hover:text-blue-600 mt-2" aria-label="Tambah Konten">+ Tambah Konten</button>
// // // // // // // // //                                                                         )}
// // // // // // // // //                                                                 </div>
// // // // // // // // //                                                             )}
// // // // // // // // //                                                         </Droppable>
// // // // // // // // //                                                     </div>
// // // // // // // // //                                                 )}
// // // // // // // // //                                             </Draggable>
// // // // // // // // //                                         ))}
// // // // // // // // //                                         {provided.placeholder}
// // // // // // // // //                                     </div>
// // // // // // // // //                                 )}
// // // // // // // // //                             </Droppable>
// // // // // // // // //                         </DragDropContext>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
// // // // // // // // //             )}

// // // // // // // // //             {/* [NEW] KONTEN TAB SKEMA PENILAIAN */}
// // // // // // // // //             {activeEditorTab === 'grading' && (
// // // // // // // // //                 <GradingSchemeForm 
// // // // // // // // //                     courseId={courseId} 
// // // // // // // // //                     modules={course.modules} 
// // // // // // // // //                     refreshData={refreshData} 
// // // // // // // // //                 />
// // // // // // // // //             )}

// // // // // // // // //             {activeEditorTab === 'certificate' && (
// // // // // // // // //                 <div className="space-y-8 animate-in slide-in-from-right-4">
// // // // // // // // //                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
// // // // // // // // //                         <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">1. Unit Kompetensi</h2>
// // // // // // // // //                         <CompetencyForm initialData={competencies} onChange={(data) => setCompetencies(data)} />
// // // // // // // // //                         <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
// // // // // // // // //                             <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={includeCompetencies} onChange={e=>setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Tampilkan Kompetensi"/><span className="text-sm font-bold text-gray-700">Tampilkan daftar kompetensi di halaman belakang sertifikat?</span></label>
// // // // // // // // //                             <button type="button" onClick={handleSaveCompetencies} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div><h2 className="text-xl font-bold text-gray-800 mb-4 px-2">2. Pengaturan Sertifikat</h2><CertificateConfigForm initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} courseTitle={course?.title || 'Judul Pelatihan'} /></div>
// // // // // // // // //                 </div>
// // // // // // // // //             )}
            
// // // // // // // // //             <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3 mt-8"><h3 className="text-lg font-bold text-gray-800">Status Publikasi</h3><button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Ubah Status">{course?.isPublished ? 'Tarik Kembali (Draft)' : '🚀 PUBLISH SEKARANG'}</button></div>
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // }
// // // // // // // // 'use client';

// // // // // // // // import { useState, useRef, useMemo, useEffect } from 'react';
// // // // // // // // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // import CompetencyForm from '@/components/admin/CompetencyForm';
// // // // // // // // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // // // // // // // import GradingSchemeForm from '@/components/admin/GradingSchemeForm'; 
// // // // // // // // import {
// // // // // // // //     Calendar, School, RefreshCw, LogOut, CheckCircle2, 
// // // // // // // //     Link as LinkIcon, Users, FileText, Download,
// // // // // // // //     FileBadge, MapPin, UserCheck, Hash, BarChart3, 
// // // // // // // //     BookOpen, Trash2, Plus, Video, Image as ImageIcon,
// // // // // // // //     Award, Layout, Clock, ExternalLink, Calculator
// // // // // // // // } from 'lucide-react';

// // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // import 'react-quill/dist/quill.snow.css'; 

// // // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // // //     ssr: false,
// // // // // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // // // // });

// // // // // // // // interface CourseContentEditorProps {
// // // // // // // //     course: any;
// // // // // // // //     courseId: string;
// // // // // // // //     refreshData: () => void;
// // // // // // // //     facilitators: any[]; 
// // // // // // // // }

// // // // // // // // export default function CourseContentEditor({ course, courseId, refreshData, facilitators }: CourseContentEditorProps) {
// // // // // // // //     const [activeEditorTab, setActiveEditorTab] = useState<'curriculum' | 'certificate' | 'grading'>('curriculum');
// // // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // // // // // // //     const [isUploadingCover, setIsUploadingCover] = useState(false);
    
// // // // // // // //     // --- STATE MODUL ---
// // // // // // // //     const [showModuleForm, setShowModuleForm] = useState(false);
// // // // // // // //     const [modTitle, setModTitle] = useState('');
// // // // // // // //     const [modIsMandatory, setModIsMandatory] = useState(true);
// // // // // // // //     const [modFacilitatorId, setModFacilitatorId] = useState('');
// // // // // // // //     const [modJp, setModJp] = useState(0);
// // // // // // // //     const [modSchedule, setModSchedule] = useState('');
// // // // // // // //     const [editingModId, setEditingModId] = useState<string | null>(null);

// // // // // // // //     // --- STATE LESSON (MATERI) ---
// // // // // // // //     const [activeModId, setActiveModId] = useState<string | null>(null); 
// // // // // // // //     const [editingLesId, setEditingLesId] = useState<string | null>(null);
// // // // // // // //     const [lesTitle, setLesTitle] = useState('');
// // // // // // // //     const [lesType, setLesType] = useState('lesson');
// // // // // // // //     const [lesContent, setLesContent] = useState('');
// // // // // // // //     const [lesIsMandatory, setLesIsMandatory] = useState(true);
// // // // // // // //     const [lesJp, setLesJp] = useState(0);
// // // // // // // //     const [lesSchedule, setLesSchedule] = useState('');
// // // // // // // //     const [lesFacilitatorId, setLesFacilitatorId] = useState('');
// // // // // // // //     const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // // // // // //     const [uploading, setUploading] = useState(false);
// // // // // // // //     const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);

// // // // // // // //     // --- STATE TIMER / QUIZ / POLL ---
// // // // // // // //     const [quizDuration, setQuizDuration] = useState(0); 
// // // // // // // //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// // // // // // // //     const [pollQuestion, setPollQuestion] = useState('');
// // // // // // // //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
// // // // // // // //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// // // // // // // //     const [useEssayTimer, setUseEssayTimer] = useState(false);

// // // // // // // //     // --- STATE GOOGLE CLASSROOM ---
// // // // // // // //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// // // // // // // //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// // // // // // // //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// // // // // // // //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// // // // // // // //     // --- STATE SETTINGS ---
// // // // // // // //     const [competencies, setCompetencies] = useState<any[]>(course?.competencies || []);
// // // // // // // //     const [includeCompetencies, setIncludeCompetencies] = useState(course?.includeCompetenciesInCertificate ?? true);
// // // // // // // //     const [certConfig, setCertConfig] = useState<any>(course?.certificateConfig || {});
// // // // // // // //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>(
// // // // // // // //         course?.facilitatorIds?.map((f: any) => (typeof f === 'object' ? f._id : f)) || []
// // // // // // // //     );
// // // // // // // //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// // // // // // // //     const [isSavingCert, setIsSavingCert] = useState(false);
// // // // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');

// // // // // // // //     useEffect(() => {
// // // // // // // //         if (course) {
// // // // // // // //             setCompetencies(course.competencies || []);
// // // // // // // //             setIncludeCompetencies(course.includeCompetenciesInCertificate ?? true);
// // // // // // // //             setCertConfig(course.certificateConfig || {});
// // // // // // // //             if (course.facilitatorIds) {
// // // // // // // //                 setSelectedFacilitatorIds(course.facilitatorIds.map((f: any) => (typeof f === 'object' ? f._id : f)));
// // // // // // // //             }
// // // // // // // //         }
// // // // // // // //     }, [course]);

// // // // // // // //     const activeTeam = facilitators.filter((u: any) => selectedFacilitatorIds.includes(u._id) || u.role === 'SUPER_ADMIN');
// // // // // // // //     const quillModules = useMemo(() => ({ toolbar: { container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'image', 'video'], [{ 'color': [] }, { 'background': [] }], ['clean']] } }), []);
// // // // // // // //     const getFacilitatorNameLabel = (data: any) => { if (!data) return null; if (typeof data === 'object' && data.name) return data.name; const found = facilitators.find(f => f._id === data || f.id === data); return found ? found.name : 'Unknown'; };

// // // // // // // //     // --- HELPER FUNCTIONS ---
// // // // // // // //     const addPollOption = () => setPollOptions([...pollOptions, '']); 
// // // // // // // //     const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; 
// // // // // // // //     const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); }; 
// // // // // // // //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // // // // // // //     const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; 
// // // // // // // //     const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); }; 
// // // // // // // //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); 
    
// // // // // // // //     const updateEssay = (idx: number, val: string) => { 
// // // // // // // //         setEssayQuestions(prev => {
// // // // // // // //             if (prev[idx] === val) return prev;
// // // // // // // //             const newQ = [...prev];
// // // // // // // //             newQ[idx] = val;
// // // // // // // //             return newQ;
// // // // // // // //         });
// // // // // // // //     }; 
    
// // // // // // // //     const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };

// // // // // // // //     // [NEW] Helper Hitung JP Komulatif
// // // // // // // //     const calculateModuleJP = (lessons: any[]) => {
// // // // // // // //         if (!lessons) return 0;
// // // // // // // //         return lessons.reduce((acc, curr) => acc + (curr.isActive ? (curr.jp || 0) : 0), 0);
// // // // // // // //     };

// // // // // // // //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); window.open(url, 'GoogleAuthPopup', `width=500,height=600`); } catch (e) { alert("Gagal Auth Google"); } }; 
// // // // // // // //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } }; 
// // // // // // // //     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const data = await api('/api/classroom/courses', { headers: { 'x-google-token': token } }); if (data.courses) setClassroomCourses(data.courses); } catch (e: any) { if(e.status === 401 || e.message?.includes('401')) { localStorage.removeItem('google_class_token'); setGoogleToken(null); } } finally { setIsCheckingGoogle(false); } };
    
// // // // // // // //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); await apiUpload(`/api/upload/course/${courseId}/cover`, formData); refreshData(); alert("Cover berhasil diperbarui!"); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// // // // // // // //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); }; 
// // // // // // // //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } };
// // // // // // // //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); setCertConfig(data); alert("Pengaturan Sertifikat Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// // // // // // // //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Kompetensi Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };

// // // // // // // //     // --- MAIN LOGIC ---
// // // // // // // //     const resetLessonForm = () => {
// // // // // // // //         setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesType('lesson'); setLesContent(''); setLesIsMandatory(true); setLesJp(0); setLesSchedule(''); setLesFacilitatorId(''); setSelectedFile(null);
// // // // // // // //         setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // // // // // // //         setQuizDuration(0); 
// // // // // // // //         setPollQuestion(''); setPollOptions(['', '']); setEssayQuestions(['']); setUseEssayTimer(false);
// // // // // // // //         setExistingFileUrl(null); 
// // // // // // // //     };

// // // // // // // //     const resetModuleForm = () => {
// // // // // // // //         setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false);
// // // // // // // //     };

// // // // // // // //     const handleSaveModule = async () => { 
// // // // // // // //         if (!modTitle.trim()) return alert("Judul modul wajib diisi"); 
// // // // // // // //         const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: modFacilitatorId || null, jp: modJp, scheduleDate: modSchedule || null }; 
// // // // // // // //         try { 
// // // // // // // //             if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); 
// // // // // // // //             else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); 
// // // // // // // //             alert("Modul berhasil disimpan!"); resetModuleForm(); refreshData(); 
// // // // // // // //         } catch(e: any) { alert(e.message); } 
// // // // // // // //     };

// // // // // // // //     const handleSaveLesson = async (modId: string) => { 
// // // // // // // //         if (!lesTitle.trim()) { alert("Judul materi wajib diisi!"); return; } 
// // // // // // // //         let fileUrl = ''; 
// // // // // // // //         if (selectedFile) { 
// // // // // // // //             try { 
// // // // // // // //                 setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); 
// // // // // // // //                 const res = await apiUpload('/api/upload', fd); 
// // // // // // // //                 fileUrl = res.url || res.file?.url || res.imageUrl; 
// // // // // // // //             } catch (err) { alert("Gagal upload file!"); return; } finally { setUploading(false); } 
// // // // // // // //         } else if (editingLesId) { 
// // // // // // // //             fileUrl = existingFileUrl || ''; 
// // // // // // // //         } 
        
// // // // // // // //         const body: any = { 
// // // // // // // //             title: lesTitle, type: lesType, isActive: true, isMandatory: lesIsMandatory, 
// // // // // // // //             jp: lesJp, facilitatorId: lesFacilitatorId || null, scheduleDate: lesSchedule || null, 
// // // // // // // //             quizDuration: quizDuration, 
// // // // // // // //             questions: (lesType === 'quiz') ? questions : undefined, 
// // // // // // // //             pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, 
// // // // // // // //             pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, 
// // // // // // // //             classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined 
// // // // // // // //         }; 
        
// // // // // // // //         if (lesType === 'essay') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; } 
// // // // // // // //         if(fileUrl) body.fileUrl = fileUrl; 
// // // // // // // //         if(lesType === 'video_url') body.videoUrl = lesContent; 
// // // // // // // //         else if(lesType === 'virtual_class') {
// // // // // // // //             body.meetingLink = lesContent; 
// // // // // // // //             body.content = lesContent; 
// // // // // // // //         }
// // // // // // // //         else if(['lesson', 'upload_doc', 'download_doc', 'image', 'slide'].includes(lesType)) body.content = lesContent; 
        
// // // // // // // //         try { 
// // // // // // // //             if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); 
// // // // // // // //             else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); 
// // // // // // // //             alert("Materi berhasil disimpan!"); resetLessonForm(); refreshData(); 
// // // // // // // //         } catch(e: any) { alert("Gagal menyimpan: " + e.message); } 
// // // // // // // //     };

// // // // // // // //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); alert("Dihapus!"); refreshData(); };
// // // // // // // //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); alert(newStatus ? "Dipublikasikan!" : "Jadi Draft"); refreshData(); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); refreshData(); } } catch (e: any) { alert(e.message); } };
// // // // // // // //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); refreshData(); } catch (err) { refreshData(); } };

// // // // // // // //     const handleAddNewContent = (modId: string) => { resetLessonForm(); setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); };
    
// // // // // // // //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
    
// // // // // // // //     const startEditLesson = (modId: string, les: any) => { 
// // // // // // // //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title); 
// // // // // // // //         setQuizDuration(les.quizDuration || 0);
// // // // // // // //         setExistingFileUrl(les.fileUrl || null);

// // // // // // // //         if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { 
// // // // // // // //             setLesType('essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); 
// // // // // // // //         } else { setLesType(les.type); } 
        
// // // // // // // //         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || '')); 
// // // // // // // //         if (les.type === 'video_url') setLesContent(les.videoUrl||''); else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); else if (les.type !== 'essay') setLesContent(les.content||''); 
// // // // // // // //         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); } 
// // // // // // // //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); } 
// // // // // // // //         if (les.type === 'google_classroom') { const token = localStorage.getItem('google_class_token'); if(token) { setGoogleToken(token); fetchClassroomCourses(token); } if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); } 
        
// // // // // // // //         setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150); 
// // // // // // // //     };

// // // // // // // //     return (
// // // // // // // //         <div className="animate-in fade-in duration-300 space-y-6">
// // // // // // // //             <div className="flex border-b border-gray-200 overflow-x-auto">
// // // // // // // //                 <button onClick={() => setActiveEditorTab('curriculum')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'curriculum' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Kurikulum"><Layout size={18}/> Kurikulum & Materi</button>
// // // // // // // //                 <button onClick={() => setActiveEditorTab('grading')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'grading' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Skema Penilaian"><Calculator size={18}/> Skema Penilaian</button>
// // // // // // // //                 <button onClick={() => setActiveEditorTab('certificate')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'certificate' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Sertifikat"><Award size={18}/> Sertifikat & Kompetensi</button>
// // // // // // // //             </div>

// // // // // // // //             {activeEditorTab === 'curriculum' && (
// // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-left-4">
// // // // // // // //                     <div className="md:col-span-1 space-y-6">
// // // // // // // //                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
// // // // // // // //                             {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
// // // // // // // //                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Ganti Cover">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Upload Cover"/></div>
// // // // // // // //                         </div>
// // // // // // // //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
// // // // // // // //                             <div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" aria-label="Simpan Tim">Simpan</button></div>
// // // // // // // //                             <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">{facilitators.map((user: any) => (<label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}><input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih ${user.name}`} /><div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div></label>))}</div>
// // // // // // // //                             <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" />
// // // // // // // //                         </div>
// // // // // // // //                     </div>

// // // // // // // //                     <div className="md:col-span-2 space-y-6">
// // // // // // // //                         <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">Struktur Modul</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 flex items-center gap-2" aria-label="Tambah Modul">+ Tambah Modul</button></div>
// // // // // // // //                         {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul"/><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" aria-label="JP"/></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih PJ"><option value="">-- Pilih Fasilitator --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal" /></div></div><div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetModuleForm} className="text-sm text-gray-500 font-bold" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold" aria-label="Simpan">Simpan</button></div></form>)}
                        
// // // // // // // //                         <DragDropContext onDragEnd={onDragEnd}>
// // // // // // // //                             <Droppable droppableId="all-modules" type="module">
// // // // // // // //                                 {(provided) => (
// // // // // // // //                                     <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
// // // // // // // //                                             {course?.modules?.map((m: any, idx: number) => {
// // // // // // // //                                                 // [NEW] Hitung Total JP Komulatif dari Lesson di dalam modul ini
// // // // // // // //                                                 const cumulativeJp = calculateModuleJP(m.lessons);

// // // // // // // //                                                 return (
// // // // // // // //                                                     <Draggable key={m._id} draggableId={m._id} index={idx}>
// // // // // // // //                                                         {(provided) => (
// // // // // // // //                                                             <div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-xl overflow-hidden bg-white shadow-sm">
// // // // // // // //                                                                 <div className="bg-gray-50 p-3 flex justify-between items-center" {...provided.dragHandleProps}>
// // // // // // // //                                                                     <div className="flex items-center gap-3">
// // // // // // // //                                                                         <span className="cursor-grab text-gray-400" aria-label="Drag Modul">☰</span>
// // // // // // // //                                                                         <div>
// // // // // // // //                                                                             <span className="font-bold text-gray-700">{m.title}</span>
// // // // // // // //                                                                             <div className="flex gap-2 text-[10px] mt-1 text-gray-500 font-medium">
// // // // // // // //                                                                                 {/* [NEW] Tampilkan JP Komulatif */}
// // // // // // // //                                                                                 <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">{cumulativeJp} JP</span>
// // // // // // // //                                                                                 {m.facilitatorId && <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100 flex items-center gap-1">👤 {getFacilitatorNameLabel(m.facilitatorId)}</span>}
// // // // // // // //                                                                                 {m.scheduleDate && <span className="bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded border border-yellow-100 flex items-center gap-1">📅 {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // // // // // //                                                                             </div>
// // // // // // // //                                                                         </div>
// // // // // // // //                                                                     </div>
// // // // // // // //                                                                     <div className="flex gap-2"><button type="button" onClick={() => startEditModule(m)} className="text-xs text-blue-600 font-bold" aria-label="Edit">Edit</button><button type="button" onClick={() => toggleStatus(m._id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${m.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Modul"><span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${m.isActive ? 'translate-x-4' : 'translate-x-1'}`} /></button></div>
// // // // // // // //                                                                 </div>
// // // // // // // //                                                                 <Droppable droppableId={m._id} type="lesson">
// // // // // // // //                                                                     {(provided) => (
// // // // // // // //                                                                         <div ref={provided.innerRef} {...provided.droppableProps} className="p-3 space-y-2">
// // // // // // // //                                                                             {m.lessons?.map((l: any, lIdx: number) => (
// // // // // // // //                                                                                 <Draggable key={l._id} draggableId={l._id} index={lIdx}>
// // // // // // // //                                                                                     {(provided) => (
// // // // // // // //                                                                                         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-2 bg-white border rounded hover:bg-gray-50">
// // // // // // // //                                                                                             <div className="flex gap-2 items-center">
// // // // // // // //                                                                                                 <span className="cursor-grab text-gray-400" aria-label="Drag">::</span>
// // // // // // // //                                                                                                 <span className="text-lg">{l.type === 'video_url' ? '🎞️' : l.type === 'quiz' ? '📝' : l.type === 'essay' ? '✍️' : l.type === 'slide' ? '📑' : '📄'}</span>
// // // // // // // //                                                                                                 <div>
// // // // // // // //                                                                                                     <p className="text-sm font-bold text-gray-800">{l.title}</p>
// // // // // // // //                                                                                                     <div className="flex gap-2 items-center flex-wrap mt-0.5">
// // // // // // // //                                                                                                         <span className="text-[10px] text-gray-500 uppercase font-bold">{l.type}</span>
// // // // // // // //                                                                                                         {l.quizDuration > 0 && <span className="text-[10px] bg-yellow-50 text-yellow-700 px-1.5 rounded border border-yellow-100 font-medium flex items-center gap-1"><Clock size={10} /> {l.quizDuration} Menit</span>}
// // // // // // // //                                                                                                         {l.jp > 0 && <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 rounded border border-blue-100 font-medium">{l.jp} JP</span>}
// // // // // // // //                                                                                                         {l.isMandatory ? <span className="text-[10px] bg-red-50 text-red-700 px-1.5 rounded border border-red-100 font-medium">Wajib</span> : <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 rounded border font-medium">Opsional</span>}
// // // // // // // //                                                                                                         {l.facilitatorId && <span className="text-[10px] text-purple-600 flex items-center gap-1 font-medium">👤 {getFacilitatorNameLabel(l.facilitatorId)}</span>}
// // // // // // // //                                                                                                         {l.scheduleDate && <span className="text-[10px] text-blue-600 flex items-center gap-1 font-medium">📅 {new Date(l.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // // // // // //                                                                                                     </div>
// // // // // // // //                                                                                                 </div>
// // // // // // // //                                                                                             </div>
// // // // // // // //                                                                                             <div className="flex gap-2 items-center"><button type="button" onClick={() => startEditLesson(m._id, l)} className="text-blue-500 text-xs font-bold" aria-label="Edit">Edit</button><button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-red-500 text-xs font-bold" aria-label="Hapus">Hapus</button><button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${l.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Lesson"><span className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${l.isActive ? 'translate-x-3.5' : 'translate-x-0.5'}`} /></button></div>
// // // // // // // //                                                                                         </div>
// // // // // // // //                                                                                     )}
// // // // // // // //                                                                                 </Draggable>
// // // // // // // //                                                                             ))}
// // // // // // // //                                                                             {provided.placeholder}
// // // // // // // //                                                                             {activeModId === m._id ? (
// // // // // // // //                                                                                 <div id={`form-${m._id}`} className="bg-blue-50 p-4 rounded border border-blue-200 mt-2 space-y-3">
// // // // // // // //                                                                                     <div className="grid grid-cols-12 gap-2"><div className="col-span-4"><select className="w-full p-2 border rounded text-sm bg-white" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Tipe Konten"><option value="lesson">📄 Materi Teks</option><option value="essay">📝 Esai</option><option value="slide">🖥️ Slide Presentasi</option><option value="image">🖼️ Upload Gambar</option><option value="download_doc">📥 Upload Dokumen</option><option value="upload_doc">📤 Tugas Upload</option><option value="quiz">📝 Kuis</option><option value="poll">📊 Polling</option><option value="video_url">🎞️ Video URL (YouTube)</option><option value="virtual_class">🎥 Kelas Virtual (Meet/Zoom)</option><option value="google_classroom">🏫 Google Classroom</option></select></div><div className="col-span-6"><input className="w-full p-2 border rounded text-sm" placeholder="Judul Materi..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi"/></div><div className="col-span-2"><input type="number" className="w-full p-2 border rounded text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="JP"/></div></div>
// // // // // // // //                                                                                     <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded border border-yellow-200"><Clock size={18} className="text-yellow-700"/><div className="flex items-center gap-2 text-sm text-yellow-800"><span className="font-bold">Durasi Timer (Opsional):</span><input type="number" min="0" className="w-20 p-1 border border-yellow-400 rounded text-center font-bold bg-white" value={quizDuration} onChange={(e) => setQuizDuration(Number(e.target.value))} placeholder="0" aria-label="Durasi Timer"/><span>menit (0 = Tidak ada batas)</span></div></div>
// // // // // // // //                                                                                     <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded border border-blue-100"><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Fasilitator (Opsional)</label><select className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesFacilitatorId} onChange={e=>setLesFacilitatorId(e.target.value)} aria-label="Pilih Fasilitator"><option value="">-- Ikut Modul --</option>{activeTeam.map((f:any)=><option key={f._id} value={f._id}>{f.name}</option>)}</select></div><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesSchedule} onChange={e=>setLesSchedule(e.target.value)} aria-label="Tanggal" /></div><div className="flex items-center h-full pt-4"><label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e=>setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib"/> Wajib diselesaikan?</label></div></div>
// // // // // // // //                                                                                     {lesType === 'essay' && (<div className="bg-white p-3 rounded border"><div className="mb-2"><label className="text-xs font-bold text-gray-500">Instruksi Soal:</label><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-32 mb-10"/></div><label className="text-xs font-bold text-gray-500 block mt-4 mb-2">Pertanyaan Esai:</label>{essayQuestions.map((q, ix) => (<div key={ix} className="flex gap-2 mb-4 items-start"><div className="flex-1"><ReactQuill theme="snow" value={q} onChange={(val) => updateEssay(ix, val)} modules={quillModules} placeholder={`Pertanyaan ${ix + 1}`} className="h-24 mb-10 bg-white"/></div>{essayQuestions.length > 1 && (<button type="button" onClick={()=>removeEssay(ix)} className="text-red-500 font-bold p-2 bg-red-50 rounded hover:bg-red-100" aria-label="Hapus"><Trash2 size={16} /></button>)}</div>))}<button type="button" onClick={addEssayRow} className="text-xs text-blue-600 font-bold flex items-center gap-1 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50" aria-label="Tambah Tanya"><Plus size={14} /> Tambah Pertanyaan</button></div>)}
// // // // // // // //                                                                                     {lesType === 'quiz' && (<div className="bg-white p-3 rounded border">{questions.map((q, ix) => (<div key={ix} className="p-2 border rounded bg-gray-50 mb-2 relative"><button type="button" onClick={()=>removeQuestion(ix)} className="absolute top-1 right-1 text-red-500 font-bold text-xs" aria-label="Hapus Soal">x</button><input className="w-full p-1 border rounded mb-1 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e=>updateQuestion(ix, 'question', e.target.value)} aria-label={`Pertanyaan ${ix+1}`}/><div className="grid grid-cols-2 gap-2">{q.options.map((o:string, oi:number) => <input key={oi} className={`w-full p-1 border text-xs ${q.correctIndex===oi?'bg-green-100 border-green-300':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix, 'options', e.target.value, oi)} aria-label={`Opsi ${oi+1}`}/>)}</div><div className="mt-1 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix, 'correctIndex', Number(e.target.value))} className="w-10 border" aria-label="Jawaban Benar"/></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}
// // // // // // // //                                                                                     {lesType === 'poll' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} aria-label="Tanya Polling"/>{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2 mb-1"><input className="flex-1 p-1 border rounded text-xs" value={opt} onChange={e=>updatePollOption(idx, e.target.value)} placeholder={`Opsi ${idx+1}`} aria-label={`Opsi ${idx+1}`}/>{pollOptions.length > 2 && <button onClick={()=>removePollOption(idx)} className="text-red-500 font-bold" aria-label="Hapus">x</button>}</div>))}<button type="button" onClick={addPollOption} className="text-xs text-blue-600 font-bold" aria-label="Tambah Opsi">+ Opsi</button></div>)}
// // // // // // // //                                                                                     {['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded border"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-48 mb-12" placeholder="Tulis materi..."/></div>)}
// // // // // // // //                                                                                     {lesType === 'video_url' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link YouTube..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Video"/>{lesContent && (<div className="bg-gray-100 p-2 rounded text-xs text-gray-500 flex items-center gap-2"><Video size={14}/> <span className="truncate flex-1">{lesContent}</span><span className="bg-green-100 text-green-700 px-1.5 rounded">Tersimpan</span></div>)}</div>)}
// // // // // // // //                                                                                     {lesType === 'virtual_class' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link Zoom/Meet..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Zoom"/>{lesContent && (<a href={lesContent} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:underline bg-blue-50 p-2 rounded border border-blue-100"><ExternalLink size={14} /> <span className="truncate">Coba Link: {lesContent}</span></a>)}</div>)}
// // // // // // // //                                                                                     {['image','upload_doc','slide','download_doc'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File (Gambar/Dokumen)</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Upload File"/>{existingFileUrl && !selectedFile && (<div className="mt-2 flex items-center gap-3 bg-gray-50 p-2 rounded border border-gray-200">{lesType === 'image' ? (<img src={getImageUrl(existingFileUrl)} alt="Preview" className="h-12 w-12 object-cover rounded border" />) : (<FileText className="text-gray-400" size={24} />)}<div className="flex-1 overflow-hidden"><div className="text-xs font-bold text-gray-600">File Tersimpan</div><a href={getImageUrl(existingFileUrl)} target="_blank" className="text-[10px] text-blue-600 truncate block hover:underline">{existingFileUrl.split('/').pop()}</a></div></div>)}</div>)}
// // // // // // // //                                                                                     {lesType === 'google_classroom' && (<div className="bg-white p-4 rounded border border-green-200 space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Class"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putus Akun"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}</div>)}

// // // // // // // //                                                                                     <div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetLessonForm} className="text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" aria-label="Simpan Materi">Simpan Materi</button></div>
// // // // // // // //                                                                                 </div>
// // // // // // // //                                                                             ) : (
// // // // // // // //                                                                                 <button type="button" onClick={() => { handleAddNewContent(m._id) }} className="w-full py-2 border-2 border-dashed border-gray-200 rounded text-xs text-gray-400 font-bold hover:border-blue-300 hover:text-blue-600 mt-2" aria-label="Tambah Konten">+ Tambah Konten</button>
// // // // // // // //                                                                             )}
// // // // // // // //                                                                     </div>
// // // // // // // //                                                                 )}
// // // // // // // //                                                             </Droppable>
// // // // // // // //                                                         </div>
// // // // // // // //                                                     )}
// // // // // // // //                                                 </Draggable>
// // // // // // // //                                             );
// // // // // // // //                                         })}
// // // // // // // //                                         {provided.placeholder}
// // // // // // // //                                     </div>
// // // // // // // //                                 )}
// // // // // // // //                             </Droppable>
// // // // // // // //                         </DragDropContext>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             )}

// // // // // // // //             {activeEditorTab === 'grading' && (
// // // // // // // //                 <GradingSchemeForm 
// // // // // // // //                     courseId={courseId} 
// // // // // // // //                     modules={course.modules} 
// // // // // // // //                     refreshData={refreshData} 
// // // // // // // //                     facilitators={facilitators} 
// // // // // // // //                 />
// // // // // // // //             )}

// // // // // // // //             {activeEditorTab === 'certificate' && (
// // // // // // // //                 <div className="space-y-8 animate-in slide-in-from-right-4">
// // // // // // // //                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
// // // // // // // //                         <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">1. Unit Kompetensi</h2>
// // // // // // // //                         <CompetencyForm initialData={competencies} onChange={(data) => setCompetencies(data)} />
// // // // // // // //                         <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
// // // // // // // //                             <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={includeCompetencies} onChange={e=>setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Tampilkan Kompetensi"/><span className="text-sm font-bold text-gray-700">Tampilkan daftar kompetensi di halaman belakang sertifikat?</span></label>
// // // // // // // //                             <button type="button" onClick={handleSaveCompetencies} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button>
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                     <div><h2 className="text-xl font-bold text-gray-800 mb-4 px-2">2. Pengaturan Sertifikat</h2><CertificateConfigForm initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} courseTitle={course?.title || 'Judul Pelatihan'} /></div>
// // // // // // // //                 </div>
// // // // // // // //             )}
            
// // // // // // // //             <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3 mt-8"><h3 className="text-lg font-bold text-gray-800">Status Publikasi</h3><button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Ubah Status">{course?.isPublished ? 'Tarik Kembali (Draft)' : '🚀 PUBLISH SEKARANG'}</button></div>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // }




// // // // // // 'use client';

// // // // // // import { useState, useRef, useMemo, useEffect } from 'react';
// // // // // // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // import CompetencyForm from '@/components/admin/CompetencyForm';
// // // // // // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // // // // // import GradingSchemeForm from '@/components/admin/GradingSchemeForm'; 
// // // // // // import {
// // // // // //     Calendar, School, RefreshCw, LogOut, CheckCircle2, 
// // // // // //     Link as LinkIcon, Users, FileText, Download,
// // // // // //     FileBadge, MapPin, UserCheck, Hash, BarChart3, 
// // // // // //     BookOpen, Trash2, Plus, Video, Image as ImageIcon,
// // // // // //     Award, Layout, Clock, ExternalLink, Calculator
// // // // // // } from 'lucide-react';

// // // // // // import dynamic from 'next/dynamic';
// // // // // // import 'react-quill/dist/quill.snow.css'; 

// // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // //     ssr: false,
// // // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // // });

// // // // // // interface CourseContentEditorProps {
// // // // // //     course: any;
// // // // // //     courseId: string;
// // // // // //     refreshData: () => void;
// // // // // //     facilitators: any[]; 
// // // // // // }

// // // // // // export default function CourseContentEditor({ course, courseId, refreshData, facilitators }: CourseContentEditorProps) {
// // // // // //     const [activeEditorTab, setActiveEditorTab] = useState<'curriculum' | 'certificate' | 'grading'>('curriculum');
// // // // // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // // // // //     const [isUploadingCover, setIsUploadingCover] = useState(false);
    
// // // // // //     // --- STATE MODUL ---
// // // // // //     const [showModuleForm, setShowModuleForm] = useState(false);
// // // // // //     const [modTitle, setModTitle] = useState('');
// // // // // //     const [modIsMandatory, setModIsMandatory] = useState(true);
// // // // // //     const [modFacilitatorId, setModFacilitatorId] = useState('');
// // // // // //     const [modJp, setModJp] = useState(0);
// // // // // //     const [modSchedule, setModSchedule] = useState('');
// // // // // //     const [editingModId, setEditingModId] = useState<string | null>(null);

// // // // // //     // --- STATE LESSON (MATERI) ---
// // // // // //     const [activeModId, setActiveModId] = useState<string | null>(null); 
// // // // // //     const [editingLesId, setEditingLesId] = useState<string | null>(null);
// // // // // //     const [lesTitle, setLesTitle] = useState('');
// // // // // //     const [lesType, setLesType] = useState('lesson');
// // // // // //     const [lesContent, setLesContent] = useState('');
// // // // // //     const [lesIsMandatory, setLesIsMandatory] = useState(true);
// // // // // //     const [lesJp, setLesJp] = useState(0);
// // // // // //     const [lesSchedule, setLesSchedule] = useState('');
// // // // // //     const [lesFacilitatorId, setLesFacilitatorId] = useState('');
// // // // // //     const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // // // //     const [uploading, setUploading] = useState(false);
// // // // // //     const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);

// // // // // //     // --- STATE TIMER / QUIZ / POLL ---
// // // // // //     const [quizDuration, setQuizDuration] = useState(0); 
// // // // // //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// // // // // //     const [pollQuestion, setPollQuestion] = useState('');
// // // // // //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
// // // // // //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// // // // // //     const [useEssayTimer, setUseEssayTimer] = useState(false);

// // // // // //     // --- STATE GOOGLE CLASSROOM ---
// // // // // //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// // // // // //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// // // // // //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// // // // // //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// // // // // //     // --- STATE SETTINGS ---
// // // // // //     const [competencies, setCompetencies] = useState<any[]>(course?.competencies || []);
// // // // // //     const [includeCompetencies, setIncludeCompetencies] = useState(course?.includeCompetenciesInCertificate ?? true);
// // // // // //     const [certConfig, setCertConfig] = useState<any>(course?.certificateConfig || {});
// // // // // //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>(
// // // // // //         course?.facilitatorIds?.map((f: any) => (typeof f === 'object' ? f._id : f)) || []
// // // // // //     );
// // // // // //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// // // // // //     const [isSavingCert, setIsSavingCert] = useState(false);
// // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');

// // // // // //     // [FIX] useEffect ini memastikan saat prop 'course' berubah, state lokal ikut berubah total
// // // // // //     useEffect(() => {
// // // // // //         if (course) {
// // // // // //             setCompetencies(course.competencies || []);
// // // // // //             setIncludeCompetencies(course.includeCompetenciesInCertificate ?? true);
// // // // // //             setCertConfig(course.certificateConfig || {});
            
// // // // // //             if (course.facilitatorIds) {
// // // // // //                 setSelectedFacilitatorIds(course.facilitatorIds.map((f: any) => (typeof f === 'object' ? f._id : f)));
// // // // // //             }
// // // // // //         }
// // // // // //     }, [course]); // Dependency ke course object

// // // // // //     const activeTeam = facilitators.filter((u: any) => selectedFacilitatorIds.includes(u._id) || u.role === 'SUPER_ADMIN');
// // // // // //     const quillModules = useMemo(() => ({ toolbar: { container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'image', 'video'], [{ 'color': [] }, { 'background': [] }], ['clean']] } }), []);
// // // // // //     const getFacilitatorNameLabel = (data: any) => { if (!data) return null; if (typeof data === 'object' && data.name) return data.name; const found = facilitators.find(f => f._id === data || f.id === data); return found ? found.name : 'Unknown'; };

// // // // // //     // --- HELPER FUNCTIONS ---
// // // // // //     const addPollOption = () => setPollOptions([...pollOptions, '']); 
// // // // // //     const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; 
// // // // // //     const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); }; 
// // // // // //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // // // // //     const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; 
// // // // // //     const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); }; 
// // // // // //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); 
    
// // // // // //     // Update Essay dengan pengecekan strict untuk mencegah infinite loop
// // // // // //     const updateEssay = (idx: number, val: string) => { 
// // // // // //         setEssayQuestions(prev => {
// // // // // //             if (prev[idx] === val) return prev;
// // // // // //             const newQ = [...prev];
// // // // // //             newQ[idx] = val;
// // // // // //             return newQ;
// // // // // //         });
// // // // // //     }; 
    
// // // // // //     const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };

// // // // // //     // [NEW] Helper Hitung JP Komulatif
// // // // // //     const calculateModuleJP = (lessons: any[]) => {
// // // // // //         if (!lessons) return 0;
// // // // // //         return lessons.reduce((acc, curr) => acc + (curr.isActive ? (curr.jp || 0) : 0), 0);
// // // // // //     };

// // // // // //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); window.open(url, 'GoogleAuthPopup', `width=500,height=600`); } catch (e) { alert("Gagal Auth Google"); } }; 
// // // // // //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } }; 
// // // // // //     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const data = await api('/api/classroom/courses', { headers: { 'x-google-token': token } }); if (data.courses) setClassroomCourses(data.courses); } catch (e: any) { if(e.status === 401 || e.message?.includes('401')) { localStorage.removeItem('google_class_token'); setGoogleToken(null); } } finally { setIsCheckingGoogle(false); } };
    
// // // // // //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); await apiUpload(`/api/upload/course/${courseId}/cover`, formData); refreshData(); alert("Cover berhasil diperbarui!"); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// // // // // //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); }; 
// // // // // //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } };
// // // // // //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); setCertConfig(data); alert("Pengaturan Sertifikat Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// // // // // //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Kompetensi Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };

// // // // // //     // --- MAIN LOGIC ---
// // // // // //     const resetLessonForm = () => {
// // // // // //         setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesType('lesson'); setLesContent(''); setLesIsMandatory(true); setLesJp(0); setLesSchedule(''); setLesFacilitatorId(''); setSelectedFile(null);
// // // // // //         setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // // // // //         setQuizDuration(0); 
// // // // // //         setPollQuestion(''); setPollOptions(['', '']); setEssayQuestions(['']); setUseEssayTimer(false);
// // // // // //         setExistingFileUrl(null); 
// // // // // //     };

// // // // // //     const resetModuleForm = () => {
// // // // // //         setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false);
// // // // // //     };

// // // // // //     const handleSaveModule = async () => { 
// // // // // //         if (!modTitle.trim()) return alert("Judul modul wajib diisi"); 
// // // // // //         const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: modFacilitatorId || null, jp: modJp, scheduleDate: modSchedule || null }; 
// // // // // //         try { 
// // // // // //             if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); 
// // // // // //             else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); 
// // // // // //             alert("Modul berhasil disimpan!"); resetModuleForm(); refreshData(); 
// // // // // //         } catch(e: any) { alert(e.message); } 
// // // // // //     };

// // // // // //     const handleSaveLesson = async (modId: string) => { 
// // // // // //         if (!lesTitle.trim()) { alert("Judul materi wajib diisi!"); return; } 
// // // // // //         let fileUrl = ''; 
// // // // // //         if (selectedFile) { 
// // // // // //             try { 
// // // // // //                 setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); 
// // // // // //                 const res = await apiUpload('/api/upload', fd); 
// // // // // //                 fileUrl = res.url || res.file?.url || res.imageUrl; 
// // // // // //             } catch (err) { alert("Gagal upload file!"); return; } finally { setUploading(false); } 
// // // // // //         } else if (editingLesId) { 
// // // // // //             fileUrl = existingFileUrl || ''; 
// // // // // //         } 
        
// // // // // //         const body: any = { 
// // // // // //             title: lesTitle, type: lesType, isActive: true, isMandatory: lesIsMandatory, 
// // // // // //             jp: lesJp, facilitatorId: lesFacilitatorId || null, scheduleDate: lesSchedule || null, 
// // // // // //             quizDuration: quizDuration, 
// // // // // //             questions: (lesType === 'quiz') ? questions : undefined, 
// // // // // //             pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, 
// // // // // //             pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, 
// // // // // //             classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined 
// // // // // //         }; 
        
// // // // // //         if (lesType === 'essay') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; } 
// // // // // //         if(fileUrl) body.fileUrl = fileUrl; 
// // // // // //         if(lesType === 'video_url') body.videoUrl = lesContent; 
// // // // // //         else if(lesType === 'virtual_class') {
// // // // // //             body.meetingLink = lesContent; 
// // // // // //             body.content = lesContent; 
// // // // // //         }
// // // // // //         else if(['lesson', 'upload_doc', 'download_doc', 'image', 'slide'].includes(lesType)) body.content = lesContent; 
        
// // // // // //         try { 
// // // // // //             if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); 
// // // // // //             else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); 
// // // // // //             alert("Materi berhasil disimpan!"); resetLessonForm(); refreshData(); 
// // // // // //         } catch(e: any) { alert("Gagal menyimpan: " + e.message); } 
// // // // // //     };

// // // // // //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); alert("Dihapus!"); refreshData(); };
// // // // // //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); alert(newStatus ? "Dipublikasikan!" : "Jadi Draft"); refreshData(); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); refreshData(); } } catch (e: any) { alert(e.message); } };
// // // // // //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); refreshData(); } catch (err) { refreshData(); } };

// // // // // //     const handleAddNewContent = (modId: string) => { resetLessonForm(); setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); };
    
// // // // // //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
    
// // // // // //     const startEditLesson = (modId: string, les: any) => { 
// // // // // //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title); 
// // // // // //         setQuizDuration(les.quizDuration || 0);
// // // // // //         setExistingFileUrl(les.fileUrl || null);

// // // // // //         if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { 
// // // // // //             setLesType('essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); 
// // // // // //         } else { setLesType(les.type); } 
        
// // // // // //         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || '')); 
// // // // // //         if (les.type === 'video_url') setLesContent(les.videoUrl||''); else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); else if (les.type !== 'essay') setLesContent(les.content||''); 
// // // // // //         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); } 
// // // // // //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); } 
// // // // // //         if (les.type === 'google_classroom') { const token = localStorage.getItem('google_class_token'); if(token) { setGoogleToken(token); fetchClassroomCourses(token); } if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); } 
        
// // // // // //         setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150); 
// // // // // //     };

// // // // // //     return (
// // // // // //         <div className="animate-in fade-in duration-300 space-y-6">
// // // // // //             <div className="flex border-b border-gray-200 overflow-x-auto">
// // // // // //                 <button onClick={() => setActiveEditorTab('curriculum')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'curriculum' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Kurikulum"><Layout size={18}/> Kurikulum & Materi</button>
// // // // // //                 <button onClick={() => setActiveEditorTab('grading')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'grading' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Skema Penilaian"><Calculator size={18}/> Skema Penilaian</button>
// // // // // //                 <button onClick={() => setActiveEditorTab('certificate')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'certificate' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Sertifikat"><Award size={18}/> Sertifikat & Kompetensi</button>
// // // // // //             </div>

// // // // // //             {activeEditorTab === 'curriculum' && (
// // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-left-4">
// // // // // //                     <div className="md:col-span-1 space-y-6">
// // // // // //                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
// // // // // //                             {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
// // // // // //                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Ganti Cover">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Upload Cover"/></div>
// // // // // //                         </div>
// // // // // //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
// // // // // //                             <div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" aria-label="Simpan Tim">Simpan</button></div>
// // // // // //                             <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">{facilitators.map((user: any) => (<label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}><input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih ${user.name}`} /><div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div></label>))}</div>
// // // // // //                             <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" />
// // // // // //                         </div>
// // // // // //                     </div>

// // // // // //                     <div className="md:col-span-2 space-y-6">
// // // // // //                         <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">Struktur Modul</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 flex items-center gap-2" aria-label="Tambah Modul">+ Tambah Modul</button></div>
// // // // // //                         {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul"/><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" aria-label="JP"/></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih PJ"><option value="">-- Pilih Fasilitator --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal" /></div></div><div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetModuleForm} className="text-sm text-gray-500 font-bold" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold" aria-label="Simpan">Simpan</button></div></form>)}
                        
// // // // // //                         <DragDropContext onDragEnd={onDragEnd}>
// // // // // //                             <Droppable droppableId="all-modules" type="module">
// // // // // //                                 {(provided) => (
// // // // // //                                     <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
// // // // // //                                             {course?.modules?.map((m: any, idx: number) => {
// // // // // //                                                 const cumulativeJp = calculateModuleJP(m.lessons);
// // // // // //                                                 return (
// // // // // //                                                     <Draggable key={m._id} draggableId={m._id} index={idx}>
// // // // // //                                                         {(provided) => (
// // // // // //                                                             <div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-xl overflow-hidden bg-white shadow-sm">
// // // // // //                                                                 <div className="bg-gray-50 p-3 flex justify-between items-center" {...provided.dragHandleProps}>
// // // // // //                                                                     <div className="flex items-center gap-3">
// // // // // //                                                                         <span className="cursor-grab text-gray-400" aria-label="Drag Modul">☰</span>
// // // // // //                                                                         <div>
// // // // // //                                                                             <span className="font-bold text-gray-700">{m.title}</span>
// // // // // //                                                                             <div className="flex gap-2 text-[10px] mt-1 text-gray-500 font-medium">
// // // // // //                                                                                 <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">{cumulativeJp} JP</span>
// // // // // //                                                                                 {m.facilitatorId && <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100 flex items-center gap-1">👤 {getFacilitatorNameLabel(m.facilitatorId)}</span>}
// // // // // //                                                                                 {m.scheduleDate && <span className="bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded border border-yellow-100 flex items-center gap-1">📅 {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // // // //                                                                             </div>
// // // // // //                                                                         </div>
// // // // // //                                                                     </div>
// // // // // //                                                                     <div className="flex gap-2"><button type="button" onClick={() => startEditModule(m)} className="text-xs text-blue-600 font-bold" aria-label="Edit">Edit</button><button type="button" onClick={() => toggleStatus(m._id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${m.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Modul"><span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${m.isActive ? 'translate-x-4' : 'translate-x-1'}`} /></button></div>
// // // // // //                                                                 </div>
// // // // // //                                                                 <Droppable droppableId={m._id} type="lesson">
// // // // // //                                                                     {(provided) => (
// // // // // //                                                                         <div ref={provided.innerRef} {...provided.droppableProps} className="p-3 space-y-2">
// // // // // //                                                                             {m.lessons?.map((l: any, lIdx: number) => (
// // // // // //                                                                                 <Draggable key={l._id} draggableId={l._id} index={lIdx}>
// // // // // //                                                                                     {(provided) => (
// // // // // //                                                                                         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-2 bg-white border rounded hover:bg-gray-50">
// // // // // //                                                                                             <div className="flex gap-2 items-center">
// // // // // //                                                                                                 <span className="cursor-grab text-gray-400" aria-label="Drag">::</span>
// // // // // //                                                                                                 <span className="text-lg">{l.type === 'video_url' ? '🎞️' : l.type === 'quiz' ? '📝' : l.type === 'essay' ? '✍️' : l.type === 'slide' ? '📑' : '📄'}</span>
// // // // // //                                                                                                 <div>
// // // // // //                                                                                                     <p className="text-sm font-bold text-gray-800">{l.title}</p>
// // // // // //                                                                                                     <div className="flex gap-2 items-center flex-wrap mt-0.5">
// // // // // //                                                                                                         <span className="text-[10px] text-gray-500 uppercase font-bold">{l.type}</span>
// // // // // //                                                                                                         {l.quizDuration > 0 && <span className="text-[10px] bg-yellow-50 text-yellow-700 px-1.5 rounded border border-yellow-100 font-medium flex items-center gap-1"><Clock size={10} /> {l.quizDuration} Menit</span>}
// // // // // //                                                                                                         {l.jp > 0 && <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 rounded border border-blue-100 font-medium">{l.jp} JP</span>}
// // // // // //                                                                                                         {l.isMandatory ? <span className="text-[10px] bg-red-50 text-red-700 px-1.5 rounded border border-red-100 font-medium">Wajib</span> : <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 rounded border font-medium">Opsional</span>}
// // // // // //                                                                                                         {l.facilitatorId && <span className="text-[10px] text-purple-600 flex items-center gap-1 font-medium">👤 {getFacilitatorNameLabel(l.facilitatorId)}</span>}
// // // // // //                                                                                                         {l.scheduleDate && <span className="text-[10px] text-blue-600 flex items-center gap-1 font-medium">📅 {new Date(l.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // // // //                                                                                                     </div>
// // // // // //                                                                                                 </div>
// // // // // //                                                                                             </div>
// // // // // //                                                                                             <div className="flex gap-2 items-center"><button type="button" onClick={() => startEditLesson(m._id, l)} className="text-blue-500 text-xs font-bold" aria-label="Edit">Edit</button><button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-red-500 text-xs font-bold" aria-label="Hapus">Hapus</button><button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${l.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Lesson"><span className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${l.isActive ? 'translate-x-3.5' : 'translate-x-0.5'}`} /></button></div>
// // // // // //                                                                                         </div>
// // // // // //                                                                                     )}
// // // // // //                                                                                 </Draggable>
// // // // // //                                                                             ))}
// // // // // //                                                                             {provided.placeholder}
// // // // // //                                                                             {activeModId === m._id ? (
// // // // // //                                                                                 <div id={`form-${m._id}`} className="bg-blue-50 p-4 rounded border border-blue-200 mt-2 space-y-3">
// // // // // //                                                                                     <div className="grid grid-cols-12 gap-2"><div className="col-span-4"><select className="w-full p-2 border rounded text-sm bg-white" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Tipe Konten"><option value="lesson">📄 Materi Teks</option><option value="essay">📝 Esai</option><option value="slide">🖥️ Slide Presentasi</option><option value="image">🖼️ Upload Gambar</option><option value="download_doc">📥 Upload Dokumen</option><option value="upload_doc">📤 Tugas Upload</option><option value="quiz">📝 Kuis</option><option value="poll">📊 Polling</option><option value="video_url">🎞️ Video URL (YouTube)</option><option value="virtual_class">🎥 Kelas Virtual (Meet/Zoom)</option><option value="google_classroom">🏫 Google Classroom</option></select></div><div className="col-span-6"><input className="w-full p-2 border rounded text-sm" placeholder="Judul Materi..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi"/></div><div className="col-span-2"><input type="number" className="w-full p-2 border rounded text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="JP"/></div></div>
// // // // // //                                                                                     <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded border border-yellow-200"><Clock size={18} className="text-yellow-700"/><div className="flex items-center gap-2 text-sm text-yellow-800"><span className="font-bold">Durasi Timer (Opsional):</span><input type="number" min="0" className="w-20 p-1 border border-yellow-400 rounded text-center font-bold bg-white" value={quizDuration} onChange={(e) => setQuizDuration(Number(e.target.value))} placeholder="0" aria-label="Durasi Timer"/><span>menit (0 = Tidak ada batas)</span></div></div>
// // // // // //                                                                                     <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded border border-blue-100"><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Fasilitator (Opsional)</label><select className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesFacilitatorId} onChange={e=>setLesFacilitatorId(e.target.value)} aria-label="Pilih Fasilitator"><option value="">-- Ikut Modul --</option>{activeTeam.map((f:any)=><option key={f._id} value={f._id}>{f.name}</option>)}</select></div><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesSchedule} onChange={e=>setLesSchedule(e.target.value)} aria-label="Tanggal" /></div><div className="flex items-center h-full pt-4"><label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e=>setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib"/> Wajib diselesaikan?</label></div></div>
// // // // // //                                                                                     {lesType === 'essay' && (<div className="bg-white p-3 rounded border"><div className="mb-2"><label className="text-xs font-bold text-gray-500">Instruksi Soal:</label><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-32 mb-10"/></div><label className="text-xs font-bold text-gray-500 block mt-4 mb-2">Pertanyaan Esai:</label>{essayQuestions.map((q, ix) => (<div key={ix} className="flex gap-2 mb-4 items-start"><div className="flex-1"><ReactQuill theme="snow" value={q} onChange={(val) => updateEssay(ix, val)} modules={quillModules} placeholder={`Pertanyaan ${ix + 1}`} className="h-24 mb-10 bg-white"/></div>{essayQuestions.length > 1 && (<button type="button" onClick={()=>removeEssay(ix)} className="text-red-500 font-bold p-2 bg-red-50 rounded hover:bg-red-100" aria-label="Hapus"><Trash2 size={16} /></button>)}</div>))}<button type="button" onClick={addEssayRow} className="text-xs text-blue-600 font-bold flex items-center gap-1 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50" aria-label="Tambah Tanya"><Plus size={14} /> Tambah Pertanyaan</button></div>)}
// // // // // //                                                                                     {lesType === 'quiz' && (<div className="bg-white p-3 rounded border">{questions.map((q, ix) => (<div key={ix} className="p-2 border rounded bg-gray-50 mb-2 relative"><button type="button" onClick={()=>removeQuestion(ix)} className="absolute top-1 right-1 text-red-500 font-bold text-xs" aria-label="Hapus Soal">x</button><input className="w-full p-1 border rounded mb-1 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e=>updateQuestion(ix, 'question', e.target.value)} aria-label={`Pertanyaan ${ix+1}`}/><div className="grid grid-cols-2 gap-2">{q.options.map((o:string, oi:number) => <input key={oi} className={`w-full p-1 border text-xs ${q.correctIndex===oi?'bg-green-100 border-green-300':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix, 'options', e.target.value, oi)} aria-label={`Opsi ${oi+1}`}/>)}</div><div className="mt-1 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix, 'correctIndex', Number(e.target.value))} className="w-10 border" aria-label="Jawaban Benar"/></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}
// // // // // //                                                                                     {lesType === 'poll' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} aria-label="Tanya Polling"/>{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2 mb-1"><input className="flex-1 p-1 border rounded text-xs" value={opt} onChange={e=>updatePollOption(idx, e.target.value)} placeholder={`Opsi ${idx+1}`} aria-label={`Opsi ${idx+1}`}/>{pollOptions.length > 2 && <button onClick={()=>removePollOption(idx)} className="text-red-500 font-bold" aria-label="Hapus">x</button>}</div>))}<button type="button" onClick={addPollOption} className="text-xs text-blue-600 font-bold" aria-label="Tambah Opsi">+ Opsi</button></div>)}
// // // // // //                                                                                     {['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded border"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-48 mb-12" placeholder="Tulis materi..."/></div>)}
// // // // // //                                                                                     {lesType === 'video_url' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link YouTube..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Video"/>{lesContent && (<div className="bg-gray-100 p-2 rounded text-xs text-gray-500 flex items-center gap-2"><Video size={14}/> <span className="truncate flex-1">{lesContent}</span><span className="bg-green-100 text-green-700 px-1.5 rounded">Tersimpan</span></div>)}</div>)}
// // // // // //                                                                                     {lesType === 'virtual_class' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link Zoom/Meet..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Zoom"/>{lesContent && (<a href={lesContent} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:underline bg-blue-50 p-2 rounded border border-blue-100"><ExternalLink size={14} /> <span className="truncate">Coba Link: {lesContent}</span></a>)}</div>)}
// // // // // //                                                                                     {['image','upload_doc','slide','download_doc'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File (Gambar/Dokumen)</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Upload File"/>{existingFileUrl && !selectedFile && (<div className="mt-2 flex items-center gap-3 bg-gray-50 p-2 rounded border border-gray-200">{lesType === 'image' ? (<img src={getImageUrl(existingFileUrl)} alt="Preview" className="h-12 w-12 object-cover rounded border" />) : (<FileText className="text-gray-400" size={24} />)}<div className="flex-1 overflow-hidden"><div className="text-xs font-bold text-gray-600">File Tersimpan</div><a href={getImageUrl(existingFileUrl)} target="_blank" className="text-[10px] text-blue-600 truncate block hover:underline">{existingFileUrl.split('/').pop()}</a></div></div>)}</div>)}
// // // // // //                                                                                     {lesType === 'google_classroom' && (<div className="bg-white p-4 rounded border border-green-200 space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Class"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putus Akun"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}</div>)}

// // // // // //                                                                                     <div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetLessonForm} className="text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" aria-label="Simpan Materi">Simpan Materi</button></div>
// // // // // //                                                                                 </div>
// // // // // //                                                                             ) : (
// // // // // //                                                                                 <button type="button" onClick={() => { handleAddNewContent(m._id) }} className="w-full py-2 border-2 border-dashed border-gray-200 rounded text-xs text-gray-400 font-bold hover:border-blue-300 hover:text-blue-600 mt-2" aria-label="Tambah Konten">+ Tambah Konten</button>
// // // // // //                                                                             )}
// // // // // //                                                                     </div>
// // // // // //                                                                 )}
// // // // // //                                                             </Droppable>
// // // // // //                                                         </div>
// // // // // //                                                     )}
// // // // // //                                                 </Draggable>
// // // // // //                                             );
// // // // // //                                         })}
// // // // // //                                         {provided.placeholder}
// // // // // //                                     </div>
// // // // // //                                 )}
// // // // // //                             </Droppable>
// // // // // //                         </DragDropContext>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             )}

// // // // // //             {/* [NEW] KONTEN TAB SKEMA PENILAIAN DENGAN KEY UNTUK RESET */}
// // // // // //             {activeEditorTab === 'grading' && (
// // // // // //                 <GradingSchemeForm 
// // // // // //                     key={`grading-${courseId}`} // Key ditambahkan agar reset saat ganti courseId
// // // // // //                     courseId={courseId} 
// // // // // //                     modules={course.modules} 
// // // // // //                     refreshData={refreshData} 
// // // // // //                     facilitators={facilitators} 
// // // // // //                 />
// // // // // //             )}

// // // // // //             {/* [NEW] KONTEN TAB SERTIFIKAT DENGAN KEY UNTUK RESET */}
// // // // // //             {activeEditorTab === 'certificate' && (
// // // // // //                 <div className="space-y-8 animate-in slide-in-from-right-4">
// // // // // //                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
// // // // // //                         <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">1. Unit Kompetensi</h2>
// // // // // //                         <CompetencyForm 
// // // // // //                             key={`comp-${courseId}`} // Key ditambahkan
// // // // // //                             initialData={competencies} 
// // // // // //                             onChange={(data) => setCompetencies(data)} 
// // // // // //                         />
// // // // // //                         <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
// // // // // //                             <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={includeCompetencies} onChange={e=>setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Tampilkan Kompetensi"/><span className="text-sm font-bold text-gray-700">Tampilkan daftar kompetensi di halaman belakang sertifikat?</span></label>
// // // // // //                             <button type="button" onClick={handleSaveCompetencies} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                         <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">2. Pengaturan Sertifikat</h2>
// // // // // //                         <CertificateConfigForm 
// // // // // //                             key={`cert-${courseId}`} // Key ditambahkan
// // // // // //                             initialData={certConfig} 
// // // // // //                             onSave={handleSaveCertConfig} 
// // // // // //                             isSaving={isSavingCert} 
// // // // // //                             competencies={competencies} 
// // // // // //                             includeCompetencies={includeCompetencies} 
// // // // // //                             courseId={courseId} 
// // // // // //                             courseTitle={course?.title || 'Judul Pelatihan'} 
// // // // // //                         />
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             )}
            
// // // // // //             <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3 mt-8"><h3 className="text-lg font-bold text-gray-800">Status Publikasi</h3><button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Ubah Status">{course?.isPublished ? 'Tarik Kembali (Draft)' : '🚀 PUBLISH SEKARANG'}</button></div>
// // // // // //         </div>
// // // // // //     );
// // // // // // }


// // // // // 'use client';

// // // // // import { useState, useRef, useMemo, useEffect } from 'react';
// // // // // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // import CompetencyForm from '@/components/admin/CompetencyForm';
// // // // // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // // // // import GradingSchemeForm from '@/components/admin/GradingSchemeForm'; 
// // // // // import {
// // // // //     Calendar, School, RefreshCw, LogOut, CheckCircle2, 
// // // // //     Link as LinkIcon, Users, FileText, Download,
// // // // //     FileBadge, MapPin, UserCheck, Hash, BarChart3, 
// // // // //     BookOpen, Trash2, Plus, Video, Image as ImageIcon,
// // // // //     Award, Layout, Clock, ExternalLink, Calculator,
// // // // //     MonitorPlay, UploadCloud, GripVertical, Pencil // Icon tambahan
// // // // // } from 'lucide-react';

// // // // // import dynamic from 'next/dynamic';
// // // // // import 'react-quill/dist/quill.snow.css'; 

// // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // //     ssr: false,
// // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // });

// // // // // interface CourseContentEditorProps {
// // // // //     course: any;
// // // // //     courseId: string;
// // // // //     refreshData: () => void;
// // // // //     facilitators: any[]; 
// // // // // }

// // // // // // --- HELPER: ICON MAPPER (PERUBAHAN UI ICON) ---
// // // // // const getLessonIcon = (type: string) => {
// // // // //     switch (type) {
// // // // //         case 'video_url': return <Video size={18} className="text-red-600" />;
// // // // //         case 'virtual_class': return <MonitorPlay size={18} className="text-purple-600" />;
// // // // //         case 'quiz': return <FileBadge size={18} className="text-orange-600" />;
// // // // //         case 'essay': return <FileText size={18} className="text-indigo-600" />;
// // // // //         case 'poll': return <BarChart3 size={18} className="text-emerald-600" />;
// // // // //         case 'slide': return <Layout size={18} className="text-blue-600" />;
// // // // //         case 'image': return <ImageIcon size={18} className="text-pink-600" />;
// // // // //         case 'upload_doc': return <UploadCloud size={18} className="text-cyan-600" />;
// // // // //         case 'download_doc': return <Download size={18} className="text-green-600" />;
// // // // //         case 'google_classroom': return <School size={18} className="text-yellow-600" />;
// // // // //         default: return <BookOpen size={18} className="text-slate-500" />;
// // // // //     }
// // // // // };

// // // // // export default function CourseContentEditor({ course, courseId, refreshData, facilitators }: CourseContentEditorProps) {
// // // // //     const [activeEditorTab, setActiveEditorTab] = useState<'curriculum' | 'certificate' | 'grading'>('curriculum');
// // // // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // // // //     const [isUploadingCover, setIsUploadingCover] = useState(false);
    
// // // // //     // --- STATE MODUL ---
// // // // //     const [showModuleForm, setShowModuleForm] = useState(false);
// // // // //     const [modTitle, setModTitle] = useState('');
// // // // //     const [modIsMandatory, setModIsMandatory] = useState(true);
// // // // //     const [modFacilitatorId, setModFacilitatorId] = useState('');
// // // // //     const [modJp, setModJp] = useState(0);
// // // // //     const [modSchedule, setModSchedule] = useState('');
// // // // //     const [editingModId, setEditingModId] = useState<string | null>(null);

// // // // //     // --- STATE LESSON (MATERI) ---
// // // // //     const [activeModId, setActiveModId] = useState<string | null>(null); 
// // // // //     const [editingLesId, setEditingLesId] = useState<string | null>(null);
// // // // //     const [lesTitle, setLesTitle] = useState('');
// // // // //     const [lesType, setLesType] = useState('lesson');
// // // // //     const [lesContent, setLesContent] = useState('');
// // // // //     const [lesIsMandatory, setLesIsMandatory] = useState(true);
// // // // //     const [lesJp, setLesJp] = useState(0);
// // // // //     const [lesSchedule, setLesSchedule] = useState('');
// // // // //     const [lesFacilitatorId, setLesFacilitatorId] = useState('');
// // // // //     const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // // //     const [uploading, setUploading] = useState(false);
// // // // //     const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);

// // // // //     // --- STATE TIMER / QUIZ / POLL ---
// // // // //     const [quizDuration, setQuizDuration] = useState(0); 
// // // // //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// // // // //     const [pollQuestion, setPollQuestion] = useState('');
// // // // //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
// // // // //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// // // // //     const [useEssayTimer, setUseEssayTimer] = useState(false);

// // // // //     // --- STATE GOOGLE CLASSROOM ---
// // // // //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// // // // //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// // // // //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// // // // //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// // // // //     // --- STATE SETTINGS ---
// // // // //     const [competencies, setCompetencies] = useState<any[]>(course?.competencies || []);
// // // // //     const [includeCompetencies, setIncludeCompetencies] = useState(course?.includeCompetenciesInCertificate ?? true);
// // // // //     const [certConfig, setCertConfig] = useState<any>(course?.certificateConfig || {});
// // // // //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>(
// // // // //         course?.facilitatorIds?.map((f: any) => (typeof f === 'object' ? f._id : f)) || []
// // // // //     );
// // // // //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// // // // //     const [isSavingCert, setIsSavingCert] = useState(false);
// // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');

// // // // //     useEffect(() => {
// // // // //         if (course) {
// // // // //             setCompetencies(course.competencies || []);
// // // // //             setIncludeCompetencies(course.includeCompetenciesInCertificate ?? true);
// // // // //             setCertConfig(course.certificateConfig || {});
            
// // // // //             if (course.facilitatorIds) {
// // // // //                 setSelectedFacilitatorIds(course.facilitatorIds.map((f: any) => (typeof f === 'object' ? f._id : f)));
// // // // //             }
// // // // //         }
// // // // //     }, [course]);

// // // // //     const activeTeam = facilitators.filter((u: any) => selectedFacilitatorIds.includes(u._id) || u.role === 'SUPER_ADMIN');
// // // // //     const quillModules = useMemo(() => ({ toolbar: { container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'image', 'video'], [{ 'color': [] }, { 'background': [] }], ['clean']] } }), []);
// // // // //     const getFacilitatorNameLabel = (data: any) => { if (!data) return null; if (typeof data === 'object' && data.name) return data.name; const found = facilitators.find(f => f._id === data || f.id === data); return found ? found.name : 'Unknown'; };

// // // // //     // --- HELPER FUNCTIONS ---
// // // // //     const addPollOption = () => setPollOptions([...pollOptions, '']); 
// // // // //     const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; 
// // // // //     const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); }; 
// // // // //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // // // //     const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; 
// // // // //     const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); }; 
// // // // //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); 
    
// // // // //     const updateEssay = (idx: number, val: string) => { 
// // // // //         setEssayQuestions(prev => {
// // // // //             if (prev[idx] === val) return prev;
// // // // //             const newQ = [...prev];
// // // // //             newQ[idx] = val;
// // // // //             return newQ;
// // // // //         });
// // // // //     }; 
    
// // // // //     const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };

// // // // //     const calculateModuleJP = (lessons: any[]) => {
// // // // //         if (!lessons) return 0;
// // // // //         return lessons.reduce((acc, curr) => acc + (curr.isActive ? (curr.jp || 0) : 0), 0);
// // // // //     };

// // // // //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); window.open(url, 'GoogleAuthPopup', `width=500,height=600`); } catch (e) { alert("Gagal Auth Google"); } }; 
// // // // //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } }; 
// // // // //     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const data = await api('/api/classroom/courses', { headers: { 'x-google-token': token } }); if (data.courses) setClassroomCourses(data.courses); } catch (e: any) { if(e.status === 401 || e.message?.includes('401')) { localStorage.removeItem('google_class_token'); setGoogleToken(null); } } finally { setIsCheckingGoogle(false); } };
    
// // // // //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); await apiUpload(`/api/upload/course/${courseId}/cover`, formData); refreshData(); alert("Cover berhasil diperbarui!"); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// // // // //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); }; 
// // // // //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } };
// // // // //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); setCertConfig(data); alert("Pengaturan Sertifikat Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// // // // //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Kompetensi Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };

// // // // //     // --- MAIN LOGIC ---
// // // // //     const resetLessonForm = () => {
// // // // //         setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesType('lesson'); setLesContent(''); setLesIsMandatory(true); setLesJp(0); setLesSchedule(''); setLesFacilitatorId(''); setSelectedFile(null);
// // // // //         setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // // // //         setQuizDuration(0); 
// // // // //         setPollQuestion(''); setPollOptions(['', '']); setEssayQuestions(['']); setUseEssayTimer(false);
// // // // //         setExistingFileUrl(null); 
// // // // //     };

// // // // //     const resetModuleForm = () => {
// // // // //         setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false);
// // // // //     };

// // // // //     const handleSaveModule = async () => { 
// // // // //         if (!modTitle.trim()) return alert("Judul modul wajib diisi"); 
// // // // //         const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: modFacilitatorId || null, jp: modJp, scheduleDate: modSchedule || null }; 
// // // // //         try { 
// // // // //             if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); 
// // // // //             else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); 
// // // // //             alert("Modul berhasil disimpan!"); resetModuleForm(); refreshData(); 
// // // // //         } catch(e: any) { alert(e.message); } 
// // // // //     };

// // // // //     const handleSaveLesson = async (modId: string) => { 
// // // // //         if (!lesTitle.trim()) { alert("Judul materi wajib diisi!"); return; } 
// // // // //         let fileUrl = ''; 
// // // // //         if (selectedFile) { 
// // // // //             try { 
// // // // //                 setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); 
// // // // //                 const res = await apiUpload('/api/upload', fd); 
// // // // //                 fileUrl = res.url || res.file?.url || res.imageUrl; 
// // // // //             } catch (err) { alert("Gagal upload file!"); return; } finally { setUploading(false); } 
// // // // //         } else if (editingLesId) { 
// // // // //             fileUrl = existingFileUrl || ''; 
// // // // //         } 
        
// // // // //         const body: any = { 
// // // // //             title: lesTitle, type: lesType, isActive: true, isMandatory: lesIsMandatory, 
// // // // //             jp: lesJp, facilitatorId: lesFacilitatorId || null, scheduleDate: lesSchedule || null, 
// // // // //             quizDuration: quizDuration, 
// // // // //             questions: (lesType === 'quiz') ? questions : undefined, 
// // // // //             pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, 
// // // // //             pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, 
// // // // //             classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined 
// // // // //         }; 
        
// // // // //         if (lesType === 'essay') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; } 
// // // // //         if(fileUrl) body.fileUrl = fileUrl; 
// // // // //         if(lesType === 'video_url') body.videoUrl = lesContent; 
// // // // //         else if(lesType === 'virtual_class') {
// // // // //             body.meetingLink = lesContent; 
// // // // //             body.content = lesContent; 
// // // // //         }
// // // // //         else if(['lesson', 'upload_doc', 'download_doc', 'image', 'slide'].includes(lesType)) body.content = lesContent; 
        
// // // // //         try { 
// // // // //             if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); 
// // // // //             else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); 
// // // // //             alert("Materi berhasil disimpan!"); resetLessonForm(); refreshData(); 
// // // // //         } catch(e: any) { alert("Gagal menyimpan: " + e.message); } 
// // // // //     };

// // // // //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); alert("Dihapus!"); refreshData(); };
// // // // //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); alert(newStatus ? "Dipublikasikan!" : "Jadi Draft"); refreshData(); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); refreshData(); } } catch (e: any) { alert(e.message); } };
// // // // //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); refreshData(); } catch (err) { refreshData(); } };

// // // // //     const handleAddNewContent = (modId: string) => { resetLessonForm(); setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); };
    
// // // // //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
    
// // // // //     const startEditLesson = (modId: string, les: any) => { 
// // // // //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title); 
// // // // //         setQuizDuration(les.quizDuration || 0);
// // // // //         setExistingFileUrl(les.fileUrl || null);

// // // // //         if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { 
// // // // //             setLesType('essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); 
// // // // //         } else { setLesType(les.type); } 
        
// // // // //         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || '')); 
// // // // //         if (les.type === 'video_url') setLesContent(les.videoUrl||''); else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); else if (les.type !== 'essay') setLesContent(les.content||''); 
// // // // //         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); } 
// // // // //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); } 
// // // // //         if (les.type === 'google_classroom') { const token = localStorage.getItem('google_class_token'); if(token) { setGoogleToken(token); fetchClassroomCourses(token); } if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); } 
        
// // // // //         setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150); 
// // // // //     };

// // // // //     return (
// // // // //         <div className="animate-in fade-in duration-300 space-y-6">
// // // // //             <div className="flex border-b border-gray-200 overflow-x-auto">
// // // // //                 <button onClick={() => setActiveEditorTab('curriculum')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'curriculum' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Kurikulum"><Layout size={18}/> Kurikulum & Materi</button>
// // // // //                 <button onClick={() => setActiveEditorTab('grading')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'grading' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Skema Penilaian"><Calculator size={18}/> Skema Penilaian</button>
// // // // //                 <button onClick={() => setActiveEditorTab('certificate')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'certificate' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Sertifikat"><Award size={18}/> Sertifikat & Kompetensi</button>
// // // // //             </div>

// // // // //             {activeEditorTab === 'curriculum' && (
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-left-4">
// // // // //                     <div className="md:col-span-1 space-y-6">
// // // // //                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
// // // // //                             {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
// // // // //                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Ganti Cover">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Upload Cover"/></div>
// // // // //                         </div>
// // // // //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
// // // // //                             <div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" aria-label="Simpan Tim">Simpan</button></div>
// // // // //                             <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">{facilitators.map((user: any) => (<label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}><input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih ${user.name}`} /><div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div></label>))}</div>
// // // // //                             <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" />
// // // // //                         </div>
// // // // //                     </div>

// // // // //                     <div className="md:col-span-2 space-y-6">
// // // // //                         <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">Struktur Modul</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 flex items-center gap-2" aria-label="Tambah Modul">+ Tambah Modul</button></div>
// // // // //                         {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul"/><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" aria-label="JP"/></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih PJ"><option value="">-- Pilih Fasilitator --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal" /></div></div><div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetModuleForm} className="text-sm text-gray-500 font-bold" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold" aria-label="Simpan">Simpan</button></div></form>)}
                        
// // // // //                         <DragDropContext onDragEnd={onDragEnd}>
// // // // //                             <Droppable droppableId="all-modules" type="module">
// // // // //                                 {(provided) => (
// // // // //                                     <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
// // // // //                                             {course?.modules?.map((m: any, idx: number) => {
// // // // //                                                 const cumulativeJp = calculateModuleJP(m.lessons);
// // // // //                                                 return (
// // // // //                                                     <Draggable key={m._id} draggableId={m._id} index={idx}>
// // // // //                                                         {(provided) => (
// // // // //                                                             <div ref={provided.innerRef} {...provided.draggableProps} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm mb-4">
// // // // //                                                                 {/* --- MODUL HEADER (DIPERBAIKI UI) --- */}
// // // // //                                                                 <div className="bg-slate-50 p-4 flex justify-between items-center border-b border-gray-100" {...provided.dragHandleProps}>
// // // // //                                                                     <div className="flex items-center gap-4">
// // // // //                                                                         <span className="cursor-grab text-gray-400 hover:text-gray-600 transition-colors" aria-label="Drag Modul">
// // // // //                                                                             <GripVertical size={20} />
// // // // //                                                                         </span>
// // // // //                                                                         <div className="flex items-center gap-3">
// // // // //                                                                             {/* Icon Folder / Module */}
// // // // //                                                                             <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-blue-600 shadow-sm">
// // // // //                                                                                 <Layout size={20} strokeWidth={2.5} />
// // // // //                                                                             </div>
// // // // //                                                                             <div>
// // // // //                                                                                 <span className="font-bold text-gray-800 text-base">{m.title}</span>
// // // // //                                                                                 <div className="flex gap-2 text-[10px] mt-1 text-gray-500 font-medium">
// // // // //                                                                                     <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{cumulativeJp} JP</span>
// // // // //                                                                                     {m.facilitatorId && <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100 flex items-center gap-1">👤 {getFacilitatorNameLabel(m.facilitatorId)}</span>}
// // // // //                                                                                     {m.scheduleDate && <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded border border-yellow-100 flex items-center gap-1">📅 {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // // //                                                                                 </div>
// // // // //                                                                             </div>
// // // // //                                                                         </div>
// // // // //                                                                     </div>
// // // // //                                                                     <div className="flex gap-3 items-center">
// // // // //                                                                         <button type="button" onClick={() => startEditModule(m)} className="text-xs text-gray-600 font-bold hover:text-blue-600 bg-white border px-3 py-1.5 rounded-lg shadow-sm" aria-label="Edit">Edit</button>
// // // // //                                                                         <button type="button" onClick={() => toggleStatus(m._id)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${m.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Modul"><span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${m.isActive ? 'translate-x-6' : 'translate-x-1'}`} /></button>
// // // // //                                                                     </div>
// // // // //                                                                 </div>

// // // // //                                                                 <Droppable droppableId={m._id} type="lesson">
// // // // //                                                                     {(provided) => (
// // // // //                                                                         <div ref={provided.innerRef} {...provided.droppableProps} className="p-3 bg-white space-y-2">
// // // // //                                                                             {m.lessons?.map((l: any, lIdx: number) => (
// // // // //                                                                                 <Draggable key={l._id} draggableId={l._id} index={lIdx}>
// // // // //                                                                                     {(provided) => (
// // // // //                                                                                         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
// // // // //                                                                                              className={`flex justify-between items-center p-3 rounded-lg border transition-all hover:shadow-md ${activeModId === m._id && editingLesId === l._id ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 bg-white hover:border-gray-300'}`}>
                                                                                            
// // // // //                                                                                             <div className="flex gap-3 items-center flex-1">
// // // // //                                                                                                 <span className="cursor-grab text-gray-300 hover:text-gray-500"><GripVertical size={16}/></span>
                                                                                                
// // // // //                                                                                                 {/* --- ICON LESSON (DIPERBAIKI UI) --- */}
// // // // //                                                                                                 <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
// // // // //                                                                                                     {getLessonIcon(l.type)}
// // // // //                                                                                                 </div>

// // // // //                                                                                                 <div className="flex-1">
// // // // //                                                                                                     <p className={`text-sm font-bold ${!l.isActive ? 'text-gray-400' : 'text-gray-700'}`}>
// // // // //                                                                                                         {l.title}
// // // // //                                                                                                         {!l.isActive && <span className="text-[10px] ml-2 italic text-red-400">(Draft)</span>}
// // // // //                                                                                                     </p>
// // // // //                                                                                                     <div className="flex gap-2 items-center flex-wrap mt-1">
// // // // //                                                                                                         <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border uppercase font-bold tracking-wide">{l.type.replace('_', ' ')}</span>
// // // // //                                                                                                         {l.quizDuration > 0 && <span className="text-[9px] text-orange-600 flex items-center gap-1 font-medium"><Clock size={10} /> {l.quizDuration}m</span>}
// // // // //                                                                                                         {l.jp > 0 && <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 rounded border border-blue-100 font-medium">{l.jp} JP</span>}
// // // // //                                                                                                         {l.isMandatory ? <span className="text-[9px] bg-red-50 text-red-700 px-1.5 rounded border border-red-100 font-medium">Wajib</span> : <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 rounded border font-medium">Opsional</span>}
// // // // //                                                                                                     </div>
// // // // //                                                                                                 </div>
// // // // //                                                                                             </div>

// // // // //                                                                                             <div className="flex gap-2 items-center ml-2">
// // // // //                                                                                                 <button type="button" onClick={() => startEditLesson(m._id, l)} className="text-gray-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded" title="Edit"><Pencil size={16} /></button>
// // // // //                                                                                                 <button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-gray-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded" title="Hapus"><Trash2 size={16} /></button>
// // // // //                                                                                                 <button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${l.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Lesson"><span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm ${l.isActive ? 'translate-x-4' : 'translate-x-1'}`} /></button>
// // // // //                                                                                             </div>
// // // // //                                                                                         </div>
// // // // //                                                                                     )}
// // // // //                                                                                 </Draggable>
// // // // //                                                                             ))}
// // // // //                                                                             {provided.placeholder}
// // // // //                                                                             {activeModId === m._id ? (
// // // // //                                                                                 <div id={`form-${m._id}`} className="bg-blue-50 p-4 rounded border border-blue-200 mt-2 space-y-3">
// // // // //                                                                                     <div className="grid grid-cols-12 gap-2"><div className="col-span-4"><select className="w-full p-2 border rounded text-sm bg-white" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Tipe Konten"><option value="lesson">📄 Materi Teks</option><option value="essay">📝 Esai</option><option value="slide">🖥️ Slide Presentasi</option><option value="image">🖼️ Upload Gambar</option><option value="download_doc">📥 Upload Dokumen</option><option value="upload_doc">📤 Tugas Upload</option><option value="quiz">📝 Kuis</option><option value="poll">📊 Polling</option><option value="video_url">🎞️ Video URL (YouTube)</option><option value="virtual_class">🎥 Kelas Virtual (Meet/Zoom)</option><option value="google_classroom">🏫 Google Classroom</option></select></div><div className="col-span-6"><input className="w-full p-2 border rounded text-sm" placeholder="Judul Materi..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi"/></div><div className="col-span-2"><input type="number" className="w-full p-2 border rounded text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="JP"/></div></div>
// // // // //                                                                                     <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded border border-yellow-200"><Clock size={18} className="text-yellow-700"/><div className="flex items-center gap-2 text-sm text-yellow-800"><span className="font-bold">Durasi Timer (Opsional):</span><input type="number" min="0" className="w-20 p-1 border border-yellow-400 rounded text-center font-bold bg-white" value={quizDuration} onChange={(e) => setQuizDuration(Number(e.target.value))} placeholder="0" aria-label="Durasi Timer"/><span>menit (0 = Tidak ada batas)</span></div></div>
// // // // //                                                                                     <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded border border-blue-100"><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Fasilitator (Opsional)</label><select className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesFacilitatorId} onChange={e=>setLesFacilitatorId(e.target.value)} aria-label="Pilih Fasilitator"><option value="">-- Ikut Modul --</option>{activeTeam.map((f:any)=><option key={f._id} value={f._id}>{f.name}</option>)}</select></div><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesSchedule} onChange={e=>setLesSchedule(e.target.value)} aria-label="Tanggal" /></div><div className="flex items-center h-full pt-4"><label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e=>setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib"/> Wajib diselesaikan?</label></div></div>
// // // // //                                                                                     {lesType === 'essay' && (<div className="bg-white p-3 rounded border"><div className="mb-2"><label className="text-xs font-bold text-gray-500">Instruksi Soal:</label><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-32 mb-10"/></div><label className="text-xs font-bold text-gray-500 block mt-4 mb-2">Pertanyaan Esai:</label>{essayQuestions.map((q, ix) => (<div key={ix} className="flex gap-2 mb-4 items-start"><div className="flex-1"><ReactQuill theme="snow" value={q} onChange={(val) => updateEssay(ix, val)} modules={quillModules} placeholder={`Pertanyaan ${ix + 1}`} className="h-24 mb-10 bg-white"/></div>{essayQuestions.length > 1 && (<button type="button" onClick={()=>removeEssay(ix)} className="text-red-500 font-bold p-2 bg-red-50 rounded hover:bg-red-100" aria-label="Hapus"><Trash2 size={16} /></button>)}</div>))}<button type="button" onClick={addEssayRow} className="text-xs text-blue-600 font-bold flex items-center gap-1 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50" aria-label="Tambah Tanya"><Plus size={14} /> Tambah Pertanyaan</button></div>)}
// // // // //                                                                                     {lesType === 'quiz' && (<div className="bg-white p-3 rounded border">{questions.map((q, ix) => (<div key={ix} className="p-2 border rounded bg-gray-50 mb-2 relative"><button type="button" onClick={()=>removeQuestion(ix)} className="absolute top-1 right-1 text-red-500 font-bold text-xs" aria-label="Hapus Soal">x</button><input className="w-full p-1 border rounded mb-1 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e=>updateQuestion(ix, 'question', e.target.value)} aria-label={`Pertanyaan ${ix+1}`}/><div className="grid grid-cols-2 gap-2">{q.options.map((o:string, oi:number) => <input key={oi} className={`w-full p-1 border text-xs ${q.correctIndex===oi?'bg-green-100 border-green-300':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix, 'options', e.target.value, oi)} aria-label={`Opsi ${oi+1}`}/>)}</div><div className="mt-1 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix, 'correctIndex', Number(e.target.value))} className="w-10 border" aria-label="Jawaban Benar"/></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}
// // // // //                                                                                     {lesType === 'poll' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} aria-label="Tanya Polling"/>{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2 mb-1"><input className="flex-1 p-1 border rounded text-xs" value={opt} onChange={e=>updatePollOption(idx, e.target.value)} placeholder={`Opsi ${idx+1}`} aria-label={`Opsi ${idx+1}`}/>{pollOptions.length > 2 && <button onClick={()=>removePollOption(idx)} className="text-red-500 font-bold" aria-label="Hapus">x</button>}</div>))}<button type="button" onClick={addPollOption} className="text-xs text-blue-600 font-bold" aria-label="Tambah Opsi">+ Opsi</button></div>)}
// // // // //                                                                                     {['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded border"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-48 mb-12" placeholder="Tulis materi..."/></div>)}
// // // // //                                                                                     {lesType === 'video_url' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link YouTube..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Video"/>{lesContent && (<div className="bg-gray-100 p-2 rounded text-xs text-gray-500 flex items-center gap-2"><Video size={14}/> <span className="truncate flex-1">{lesContent}</span><span className="bg-green-100 text-green-700 px-1.5 rounded">Tersimpan</span></div>)}</div>)}
// // // // //                                                                                     {lesType === 'virtual_class' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link Zoom/Meet..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Zoom"/>{lesContent && (<a href={lesContent} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:underline bg-blue-50 p-2 rounded border border-blue-100"><ExternalLink size={14} /> <span className="truncate">Coba Link: {lesContent}</span></a>)}</div>)}
// // // // //                                                                                     {['image','upload_doc','slide','download_doc'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File (Gambar/Dokumen)</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Upload File"/>{existingFileUrl && !selectedFile && (<div className="mt-2 flex items-center gap-3 bg-gray-50 p-2 rounded border border-gray-200">{lesType === 'image' ? (<img src={getImageUrl(existingFileUrl)} alt="Preview" className="h-12 w-12 object-cover rounded border" />) : (<FileText className="text-gray-400" size={24} />)}<div className="flex-1 overflow-hidden"><div className="text-xs font-bold text-gray-600">File Tersimpan</div><a href={getImageUrl(existingFileUrl)} target="_blank" className="text-[10px] text-blue-600 truncate block hover:underline">{existingFileUrl.split('/').pop()}</a></div></div>)}</div>)}
// // // // //                                                                                     {lesType === 'google_classroom' && (<div className="bg-white p-4 rounded border border-green-200 space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Class"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putus Akun"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}</div>)}

// // // // //                                                                                     <div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetLessonForm} className="text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" aria-label="Simpan Materi">Simpan Materi</button></div>
// // // // //                                                                                 </div>
// // // // //                                                                             ) : (
// // // // //                                                                                 <button type="button" onClick={() => { handleAddNewContent(m._id) }} className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-400 font-bold hover:border-blue-300 hover:text-blue-600 mt-2 transition-colors flex items-center justify-center gap-2" aria-label="Tambah Konten"><Plus size={16}/> Tambah Konten</button>
// // // // //                                                                             )}
// // // // //                                                                         </div>
// // // // //                                                                     )}
// // // // //                                                                 </Droppable>
// // // // //                                                             </div>
// // // // //                                                         )}
// // // // //                                                     </Draggable>
// // // // //                                                 );
// // // // //                                             })}
// // // // //                                             {provided.placeholder}
// // // // //                                     </div>
// // // // //                                 )}
// // // // //                             </Droppable>
// // // // //                         </DragDropContext>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             )}

// // // // //             {/* [NEW] KONTEN TAB SKEMA PENILAIAN DENGAN KEY UNTUK RESET */}
// // // // //             {activeEditorTab === 'grading' && (
// // // // //                 <GradingSchemeForm 
// // // // //                     key={`grading-${courseId}`} // Key ditambahkan agar reset saat ganti courseId
// // // // //                     courseId={courseId} 
// // // // //                     modules={course.modules} 
// // // // //                     refreshData={refreshData} 
// // // // //                     facilitators={facilitators} 
// // // // //                 />
// // // // //             )}

// // // // //             {/* [NEW] KONTEN TAB SERTIFIKAT DENGAN KEY UNTUK RESET */}
// // // // //             {activeEditorTab === 'certificate' && (
// // // // //                 <div className="space-y-8 animate-in slide-in-from-right-4">
// // // // //                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
// // // // //                         <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">1. Unit Kompetensi</h2>
// // // // //                         <CompetencyForm 
// // // // //                             key={`comp-${courseId}`} // Key ditambahkan
// // // // //                             initialData={competencies} 
// // // // //                             onChange={(data) => setCompetencies(data)} 
// // // // //                         />
// // // // //                         <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
// // // // //                             <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={includeCompetencies} onChange={e=>setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Tampilkan Kompetensi"/><span className="text-sm font-bold text-gray-700">Tampilkan daftar kompetensi di halaman belakang sertifikat?</span></label>
// // // // //                             <button type="button" onClick={handleSaveCompetencies} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                         <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">2. Pengaturan Sertifikat</h2>
// // // // //                         <CertificateConfigForm 
// // // // //                             key={`cert-${courseId}`} // Key ditambahkan
// // // // //                             initialData={certConfig} 
// // // // //                             onSave={handleSaveCertConfig} 
// // // // //                             isSaving={isSavingCert} 
// // // // //                             competencies={competencies} 
// // // // //                             includeCompetencies={includeCompetencies} 
// // // // //                             courseId={courseId} 
// // // // //                             courseTitle={course?.title || 'Judul Pelatihan'} 
// // // // //                         />
// // // // //                     </div>
// // // // //                 </div>
// // // // //             )}
            
// // // // //             <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3 mt-8"><h3 className="text-lg font-bold text-gray-800">Status Publikasi</h3><button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Ubah Status">{course?.isPublished ? 'Tarik Kembali (Draft)' : '🚀 PUBLISH SEKARANG'}</button></div>
// // // // //         </div>
// // // // //     );
// // // // // }

// // // // 'use client';

// // // // import { useState, useRef, useMemo, useEffect } from 'react';
// // // // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // import CompetencyForm from '@/components/admin/CompetencyForm';
// // // // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // // // import GradingSchemeForm from '@/components/admin/GradingSchemeForm'; 
// // // // import {
// // // //     Calendar, School, RefreshCw, LogOut, CheckCircle2, 
// // // //     Link as LinkIcon, Users, FileText, Download,
// // // //     FileBadge, MapPin, UserCheck, Hash, BarChart3, 
// // // //     BookOpen, Trash2, Plus, Video, Image as ImageIcon,
// // // //     Award, Layout, Clock, ExternalLink, Calculator,
// // // //     MonitorPlay, UploadCloud, GripVertical, Pencil, MessageSquare // Icon tambahan
// // // // } from 'lucide-react';

// // // // import dynamic from 'next/dynamic';
// // // // import 'react-quill/dist/quill.snow.css'; 

// // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // //     ssr: false,
// // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // });

// // // // interface CourseContentEditorProps {
// // // //     course: any;
// // // //     courseId: string;
// // // //     refreshData: () => void;
// // // //     facilitators: any[]; 
// // // // }

// // // // // --- HELPER: ICON MAPPER ---
// // // // const getLessonIcon = (type: string) => {
// // // //     switch (type) {
// // // //         case 'video_url': return <Video size={18} className="text-red-600" />;
// // // //         case 'virtual_class': return <MonitorPlay size={18} className="text-purple-600" />;
// // // //         case 'quiz': return <FileBadge size={18} className="text-orange-600" />;
// // // //         case 'essay': return <FileText size={18} className="text-indigo-600" />;
// // // //         case 'poll': return <BarChart3 size={18} className="text-emerald-600" />;
// // // //         case 'slide': return <Layout size={18} className="text-blue-600" />;
// // // //         case 'image': return <ImageIcon size={18} className="text-pink-600" />;
// // // //         case 'upload_doc': return <UploadCloud size={18} className="text-cyan-600" />;
// // // //         case 'download_doc': return <Download size={18} className="text-green-600" />;
// // // //         case 'google_classroom': return <School size={18} className="text-yellow-600" />;
// // // //         default: return <BookOpen size={18} className="text-slate-500" />;
// // // //     }
// // // // };

// // // // export default function CourseContentEditor({ course, courseId, refreshData, facilitators }: CourseContentEditorProps) {
// // // //     const [activeEditorTab, setActiveEditorTab] = useState<'curriculum' | 'certificate' | 'grading'>('curriculum');
// // // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // // //     const [isUploadingCover, setIsUploadingCover] = useState(false);
    
// // // //     // --- STATE MODUL ---
// // // //     const [showModuleForm, setShowModuleForm] = useState(false);
// // // //     const [modTitle, setModTitle] = useState('');
// // // //     const [modIsMandatory, setModIsMandatory] = useState(true);
// // // //     const [modFacilitatorId, setModFacilitatorId] = useState('');
// // // //     const [modJp, setModJp] = useState(0);
// // // //     const [modSchedule, setModSchedule] = useState('');
// // // //     const [editingModId, setEditingModId] = useState<string | null>(null);

// // // //     // --- STATE LESSON (MATERI) ---
// // // //     const [activeModId, setActiveModId] = useState<string | null>(null); 
// // // //     const [editingLesId, setEditingLesId] = useState<string | null>(null);
// // // //     const [lesTitle, setLesTitle] = useState('');
// // // //     const [lesType, setLesType] = useState('lesson');
// // // //     const [lesContent, setLesContent] = useState('');
// // // //     const [lesIsMandatory, setLesIsMandatory] = useState(true);
// // // //     const [lesJp, setLesJp] = useState(0);
// // // //     const [lesSchedule, setLesSchedule] = useState('');
// // // //     const [lesFacilitatorId, setLesFacilitatorId] = useState('');
// // // //     const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // //     const [uploading, setUploading] = useState(false);
// // // //     const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);

// // // //     // --- STATE TIMER / QUIZ / POLL ---
// // // //     const [quizDuration, setQuizDuration] = useState(0); 
// // // //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// // // //     const [pollQuestion, setPollQuestion] = useState('');
// // // //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
// // // //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// // // //     const [useEssayTimer, setUseEssayTimer] = useState(false);

// // // //     // --- STATE GOOGLE CLASSROOM ---
// // // //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// // // //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// // // //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// // // //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// // // //     // --- STATE SETTINGS ---
// // // //     const [competencies, setCompetencies] = useState<any[]>(course?.competencies || []);
// // // //     const [includeCompetencies, setIncludeCompetencies] = useState(course?.includeCompetenciesInCertificate ?? true);
// // // //     const [certConfig, setCertConfig] = useState<any>(course?.certificateConfig || {});
// // // //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>(
// // // //         course?.facilitatorIds?.map((f: any) => (typeof f === 'object' ? f._id : f)) || []
// // // //     );
// // // //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// // // //     const [isSavingCert, setIsSavingCert] = useState(false);
// // // //     const [searchFacilitator, setSearchFacilitator] = useState('');

// // // //     useEffect(() => {
// // // //         if (course) {
// // // //             setCompetencies(course.competencies || []);
// // // //             setIncludeCompetencies(course.includeCompetenciesInCertificate ?? true);
// // // //             setCertConfig(course.certificateConfig || {});
            
// // // //             if (course.facilitatorIds) {
// // // //                 setSelectedFacilitatorIds(course.facilitatorIds.map((f: any) => (typeof f === 'object' ? f._id : f)));
// // // //             }
// // // //         }
// // // //     }, [course]);

// // // //     const activeTeam = facilitators.filter((u: any) => selectedFacilitatorIds.includes(u._id) || u.role === 'SUPER_ADMIN');
// // // //     const quillModules = useMemo(() => ({ toolbar: { container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'image', 'video'], [{ 'color': [] }, { 'background': [] }], ['clean']] } }), []);
// // // //     const getFacilitatorNameLabel = (data: any) => { if (!data) return null; if (typeof data === 'object' && data.name) return data.name; const found = facilitators.find(f => f._id === data || f.id === data); return found ? found.name : 'Unknown'; };

// // // //     // --- HELPER FUNCTIONS ---
// // // //     const addPollOption = () => setPollOptions([...pollOptions, '']); 
// // // //     const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; 
// // // //     const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); }; 
// // // //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // // //     const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; 
// // // //     const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); }; 
// // // //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); 
    
// // // //     const updateEssay = (idx: number, val: string) => { 
// // // //         setEssayQuestions(prev => {
// // // //             if (prev[idx] === val) return prev;
// // // //             const newQ = [...prev];
// // // //             newQ[idx] = val;
// // // //             return newQ;
// // // //         });
// // // //     }; 
    
// // // //     const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };

// // // //     const calculateModuleJP = (lessons: any[]) => {
// // // //         if (!lessons) return 0;
// // // //         return lessons.reduce((acc, curr) => acc + (curr.isActive ? (curr.jp || 0) : 0), 0);
// // // //     };

// // // //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); window.open(url, 'GoogleAuthPopup', `width=500,height=600`); } catch (e) { alert("Gagal Auth Google"); } }; 
// // // //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } }; 
// // // //     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const data = await api('/api/classroom/courses', { headers: { 'x-google-token': token } }); if (data.courses) setClassroomCourses(data.courses); } catch (e: any) { if(e.status === 401 || e.message?.includes('401')) { localStorage.removeItem('google_class_token'); setGoogleToken(null); } } finally { setIsCheckingGoogle(false); } };
    
// // // //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); await apiUpload(`/api/upload/course/${courseId}/cover`, formData); refreshData(); alert("Cover berhasil diperbarui!"); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// // // //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); }; 
// // // //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } };
// // // //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); setCertConfig(data); alert("Pengaturan Sertifikat Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// // // //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Kompetensi Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };

// // // //     // --- MAIN LOGIC ---
// // // //     const resetLessonForm = () => {
// // // //         setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesType('lesson'); setLesContent(''); setLesIsMandatory(true); setLesJp(0); setLesSchedule(''); setLesFacilitatorId(''); setSelectedFile(null);
// // // //         setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // // //         setQuizDuration(0); 
// // // //         setPollQuestion(''); setPollOptions(['', '']); setEssayQuestions(['']); setUseEssayTimer(false);
// // // //         setExistingFileUrl(null); 
// // // //     };

// // // //     const resetModuleForm = () => {
// // // //         setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false);
// // // //     };

// // // //     const handleSaveModule = async () => { 
// // // //         if (!modTitle.trim()) return alert("Judul modul wajib diisi"); 
// // // //         const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: modFacilitatorId || null, jp: modJp, scheduleDate: modSchedule || null }; 
// // // //         try { 
// // // //             if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); 
// // // //             else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); 
// // // //             alert("Modul berhasil disimpan!"); resetModuleForm(); refreshData(); 
// // // //         } catch(e: any) { alert(e.message); } 
// // // //     };

// // // //     const handleSaveLesson = async (modId: string) => { 
// // // //         if (!lesTitle.trim()) { alert("Judul materi wajib diisi!"); return; } 
// // // //         let fileUrl = ''; 
// // // //         if (selectedFile) { 
// // // //             try { 
// // // //                 setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); 
// // // //                 const res = await apiUpload('/api/upload', fd); 
// // // //                 fileUrl = res.url || res.file?.url || res.imageUrl; 
// // // //             } catch (err) { alert("Gagal upload file!"); return; } finally { setUploading(false); } 
// // // //         } else if (editingLesId) { 
// // // //             fileUrl = existingFileUrl || ''; 
// // // //         } 
        
// // // //         const body: any = { 
// // // //             title: lesTitle, type: lesType, isActive: true, isMandatory: lesIsMandatory, 
// // // //             jp: lesJp, facilitatorId: lesFacilitatorId || null, scheduleDate: lesSchedule || null, 
// // // //             quizDuration: quizDuration, 
// // // //             questions: (lesType === 'quiz') ? questions : undefined, 
// // // //             pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, 
// // // //             pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, 
// // // //             classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined 
// // // //         }; 
        
// // // //         if (lesType === 'essay') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; } 
// // // //         if(fileUrl) body.fileUrl = fileUrl; 
// // // //         if(lesType === 'video_url') body.videoUrl = lesContent; 
// // // //         else if(lesType === 'virtual_class') {
// // // //             body.meetingLink = lesContent; 
// // // //             body.content = lesContent; 
// // // //         }
// // // //         else if(['lesson', 'upload_doc', 'download_doc', 'image', 'slide'].includes(lesType)) body.content = lesContent; 
        
// // // //         try { 
// // // //             if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); 
// // // //             else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); 
// // // //             alert("Materi berhasil disimpan!"); resetLessonForm(); refreshData(); 
// // // //         } catch(e: any) { alert("Gagal menyimpan: " + e.message); } 
// // // //     };

// // // //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); alert("Dihapus!"); refreshData(); };
// // // //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); alert(newStatus ? "Dipublikasikan!" : "Jadi Draft"); refreshData(); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); refreshData(); } } catch (e: any) { alert(e.message); } };
// // // //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); refreshData(); } catch (err) { refreshData(); } };

// // // //     const handleAddNewContent = (modId: string) => { resetLessonForm(); setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); };
    
// // // //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
    
// // // //     const startEditLesson = (modId: string, les: any) => { 
// // // //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title); 
// // // //         setQuizDuration(les.quizDuration || 0);
// // // //         setExistingFileUrl(les.fileUrl || null);

// // // //         if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { 
// // // //             setLesType('essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); 
// // // //         } else { setLesType(les.type); } 
        
// // // //         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || '')); 
// // // //         if (les.type === 'video_url') setLesContent(les.videoUrl||''); else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); else if (les.type !== 'essay') setLesContent(les.content||''); 
// // // //         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); } 
// // // //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); } 
// // // //         if (les.type === 'google_classroom') { const token = localStorage.getItem('google_class_token'); if(token) { setGoogleToken(token); fetchClassroomCourses(token); } if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); } 
        
// // // //         setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150); 
// // // //     };

// // // //     return (
// // // //         <div className="animate-in fade-in duration-300 space-y-6">
// // // //             <div className="flex border-b border-gray-200 overflow-x-auto">
// // // //                 <button onClick={() => setActiveEditorTab('curriculum')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'curriculum' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Kurikulum"><Layout size={18}/> Kurikulum & Materi</button>
// // // //                 <button onClick={() => setActiveEditorTab('grading')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'grading' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Skema Penilaian"><Calculator size={18}/> Skema Penilaian</button>
// // // //                 <button onClick={() => setActiveEditorTab('certificate')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'certificate' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Sertifikat"><Award size={18}/> Sertifikat & Kompetensi</button>
// // // //             </div>

// // // //             {activeEditorTab === 'curriculum' && (
// // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-left-4">
// // // //                     <div className="md:col-span-1 space-y-6">
// // // //                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
// // // //                             {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
// // // //                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Ganti Cover">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Upload Cover"/></div>
// // // //                         </div>
// // // //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
// // // //                             <div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" aria-label="Simpan Tim">Simpan</button></div>
// // // //                             <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">{facilitators.map((user: any) => (<label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}><input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih ${user.name}`} /><div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div></label>))}</div>
// // // //                             <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" />
// // // //                         </div>
// // // //                     </div>

// // // //                     <div className="md:col-span-2 space-y-6">
// // // //                         <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">Struktur Modul</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 flex items-center gap-2" aria-label="Tambah Modul">+ Tambah Modul</button></div>
// // // //                         {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul"/><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" aria-label="JP"/></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih PJ"><option value="">-- Pilih Fasilitator --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal" /></div></div><div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetModuleForm} className="text-sm text-gray-500 font-bold" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold" aria-label="Simpan">Simpan</button></div></form>)}
                        
// // // //                         <DragDropContext onDragEnd={onDragEnd}>
// // // //                             <Droppable droppableId="all-modules" type="module">
// // // //                                 {(provided) => (
// // // //                                     <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
// // // //                                             {course?.modules?.map((m: any, idx: number) => {
// // // //                                                 const cumulativeJp = calculateModuleJP(m.lessons);
// // // //                                                 return (
// // // //                                                     <Draggable key={m._id} draggableId={m._id} index={idx}>
// // // //                                                         {(provided) => (
// // // //                                                             <div ref={provided.innerRef} {...provided.draggableProps} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm mb-4">
// // // //                                                                 {/* --- MODUL HEADER (DIPERBAIKI UI) --- */}
// // // //                                                                 <div className="bg-slate-50 p-4 flex justify-between items-center border-b border-gray-100" {...provided.dragHandleProps}>
// // // //                                                                     <div className="flex items-center gap-4">
// // // //                                                                         <span className="cursor-grab text-gray-400 hover:text-gray-600 transition-colors" aria-label="Drag Modul">
// // // //                                                                             <GripVertical size={20} />
// // // //                                                                         </span>
// // // //                                                                         <div className="flex items-center gap-3">
// // // //                                                                             {/* Icon Folder / Module */}
// // // //                                                                             <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-blue-600 shadow-sm">
// // // //                                                                                 <Layout size={20} strokeWidth={2.5} />
// // // //                                                                             </div>
// // // //                                                                             <div>
// // // //                                                                                 <span className="font-bold text-gray-800 text-base">{m.title}</span>
// // // //                                                                                 <div className="flex gap-2 text-[10px] mt-1 text-gray-500 font-medium">
// // // //                                                                                     <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{cumulativeJp} JP</span>
// // // //                                                                                     {m.facilitatorId && <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100 flex items-center gap-1">👤 {getFacilitatorNameLabel(m.facilitatorId)}</span>}
// // // //                                                                                     {m.scheduleDate && <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded border border-yellow-100 flex items-center gap-1">📅 {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // // //                                                                                 </div>
// // // //                                                                             </div>
// // // //                                                                         </div>
// // // //                                                                     </div>
// // // //                                                                     <div className="flex gap-3 items-center">
// // // //                                                                         <button type="button" onClick={() => startEditModule(m)} className="text-xs text-gray-600 font-bold hover:text-blue-600 bg-white border px-3 py-1.5 rounded-lg shadow-sm" aria-label="Edit">Edit</button>
// // // //                                                                         <button type="button" onClick={() => toggleStatus(m._id)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${m.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Modul"><span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${m.isActive ? 'translate-x-6' : 'translate-x-1'}`} /></button>
// // // //                                                                     </div>
// // // //                                                                 </div>

// // // //                                                                 <Droppable droppableId={m._id} type="lesson">
// // // //                                                                     {(provided) => (
// // // //                                                                         <div ref={provided.innerRef} {...provided.droppableProps} className="p-3 bg-white space-y-2">
// // // //                                                                             {m.lessons?.map((l: any, lIdx: number) => (
// // // //                                                                                 <Draggable key={l._id} draggableId={l._id} index={lIdx}>
// // // //                                                                                     {(provided) => (
// // // //                                                                                         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
// // // //                                                                                              className={`flex justify-between items-center p-3 rounded-lg border transition-all hover:shadow-md ${activeModId === m._id && editingLesId === l._id ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 bg-white hover:border-gray-300'}`}>
                                                                                            
// // // //                                                                                             <div className="flex gap-3 items-center flex-1">
// // // //                                                                                                 <span className="cursor-grab text-gray-300 hover:text-gray-500"><GripVertical size={16}/></span>
                                                                                                
// // // //                                                                                                 {/* --- ICON LESSON (DIPERBAIKI UI) --- */}
// // // //                                                                                                 <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
// // // //                                                                                                     {getLessonIcon(l.type)}
// // // //                                                                                                 </div>

// // // //                                                                                                 <div className="flex-1">
// // // //                                                                                                     <p className={`text-sm font-bold ${!l.isActive ? 'text-gray-400' : 'text-gray-700'}`}>
// // // //                                                                                                         {l.title}
// // // //                                                                                                         {!l.isActive && <span className="text-[10px] ml-2 italic text-red-400">(Draft)</span>}
// // // //                                                                                                     </p>
// // // //                                                                                                     <div className="flex gap-2 items-center flex-wrap mt-1">
// // // //                                                                                                         <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border uppercase font-bold tracking-wide">{l.type.replace('_', ' ')}</span>
// // // //                                                                                                         {l.quizDuration > 0 && <span className="text-[9px] text-orange-600 flex items-center gap-1 font-medium"><Clock size={10} /> {l.quizDuration}m</span>}
// // // //                                                                                                         {l.jp > 0 && <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 rounded border border-blue-100 font-medium">{l.jp} JP</span>}
// // // //                                                                                                         {l.isMandatory ? <span className="text-[9px] bg-red-50 text-red-700 px-1.5 rounded border border-red-100 font-medium">Wajib</span> : <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 rounded border font-medium">Opsional</span>}
// // // //                                                                                                     </div>
// // // //                                                                                                 </div>
// // // //                                                                                             </div>

// // // //                                                                                             <div className="flex gap-2 items-center ml-2">
// // // //                                                                                                 <button type="button" onClick={() => startEditLesson(m._id, l)} className="text-gray-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded" title="Edit"><Pencil size={16} /></button>
// // // //                                                                                                 <button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-gray-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded" title="Hapus"><Trash2 size={16} /></button>
// // // //                                                                                                 <button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${l.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Lesson"><span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm ${l.isActive ? 'translate-x-4' : 'translate-x-1'}`} /></button>
// // // //                                                                                             </div>
// // // //                                                                                         </div>
// // // //                                                                                     )}
// // // //                                                                                 </Draggable>
// // // //                                                                             ))}
// // // //                                                                             {provided.placeholder}
// // // //                                                                             {activeModId === m._id ? (
// // // //                                                                                 <div id={`form-${m._id}`} className="bg-blue-50 p-4 rounded border border-blue-200 mt-2 space-y-3">
// // // //                                                                                     <div className="grid grid-cols-12 gap-2"><div className="col-span-4"><select className="w-full p-2 border rounded text-sm bg-white" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Tipe Konten"><option value="lesson">📄 Materi Teks</option><option value="essay">📝 Esai</option><option value="slide">🖥️ Slide Presentasi</option><option value="image">🖼️ Upload Gambar</option><option value="download_doc">📥 Upload Dokumen</option><option value="upload_doc">📤 Tugas Upload</option><option value="quiz">📝 Kuis</option><option value="poll">📊 Polling</option><option value="video_url">🎞️ Video URL (YouTube)</option><option value="virtual_class">🎥 Kelas Virtual (Meet/Zoom)</option><option value="google_classroom">🏫 Google Classroom</option></select></div><div className="col-span-6"><input className="w-full p-2 border rounded text-sm" placeholder="Judul Materi..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi"/></div><div className="col-span-2"><input type="number" className="w-full p-2 border rounded text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="JP"/></div></div>
// // // //                                                                                     <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded border border-yellow-200"><Clock size={18} className="text-yellow-700"/><div className="flex items-center gap-2 text-sm text-yellow-800"><span className="font-bold">Durasi Timer (Opsional):</span><input type="number" min="0" className="w-20 p-1 border border-yellow-400 rounded text-center font-bold bg-white" value={quizDuration} onChange={(e) => setQuizDuration(Number(e.target.value))} placeholder="0" aria-label="Durasi Timer"/><span>menit (0 = Tidak ada batas)</span></div></div>
// // // //                                                                                     <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded border border-blue-100"><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Fasilitator (Opsional)</label><select className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesFacilitatorId} onChange={e=>setLesFacilitatorId(e.target.value)} aria-label="Pilih Fasilitator"><option value="">-- Ikut Modul --</option>{activeTeam.map((f:any)=><option key={f._id} value={f._id}>{f.name}</option>)}</select></div><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesSchedule} onChange={e=>setLesSchedule(e.target.value)} aria-label="Tanggal" /></div><div className="flex items-center h-full pt-4"><label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e=>setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib"/> Wajib diselesaikan?</label></div></div>
// // // //                                                                                     {lesType === 'essay' && (<div className="bg-white p-3 rounded border"><div className="mb-2"><label className="text-xs font-bold text-gray-500">Instruksi Soal:</label><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-32 mb-10"/></div><label className="text-xs font-bold text-gray-500 block mt-4 mb-2">Pertanyaan Esai:</label>{essayQuestions.map((q, ix) => (<div key={ix} className="flex gap-2 mb-4 items-start"><div className="flex-1"><ReactQuill theme="snow" value={q} onChange={(val) => updateEssay(ix, val)} modules={quillModules} placeholder={`Pertanyaan ${ix + 1}`} className="h-24 mb-10 bg-white"/></div>{essayQuestions.length > 1 && (<button type="button" onClick={()=>removeEssay(ix)} className="text-red-500 font-bold p-2 bg-red-50 rounded hover:bg-red-100" aria-label="Hapus"><Trash2 size={16} /></button>)}</div>))}<button type="button" onClick={addEssayRow} className="text-xs text-blue-600 font-bold flex items-center gap-1 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50" aria-label="Tambah Tanya"><Plus size={14} /> Tambah Pertanyaan</button></div>)}
// // // //                                                                                     {lesType === 'quiz' && (<div className="bg-white p-3 rounded border">{questions.map((q, ix) => (<div key={ix} className="p-2 border rounded bg-gray-50 mb-2 relative"><button type="button" onClick={()=>removeQuestion(ix)} className="absolute top-1 right-1 text-red-500 font-bold text-xs" aria-label="Hapus Soal">x</button><input className="w-full p-1 border rounded mb-1 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e=>updateQuestion(ix, 'question', e.target.value)} aria-label={`Pertanyaan ${ix+1}`}/><div className="grid grid-cols-2 gap-2">{q.options.map((o:string, oi:number) => <input key={oi} className={`w-full p-1 border text-xs ${q.correctIndex===oi?'bg-green-100 border-green-300':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix, 'options', e.target.value, oi)} aria-label={`Opsi ${oi+1}`}/>)}</div><div className="mt-1 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix, 'correctIndex', Number(e.target.value))} className="w-10 border" aria-label="Jawaban Benar"/></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}
// // // //                                                                                     {lesType === 'poll' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} aria-label="Tanya Polling"/>{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2 mb-1"><input className="flex-1 p-1 border rounded text-xs" value={opt} onChange={e=>updatePollOption(idx, e.target.value)} placeholder={`Opsi ${idx+1}`} aria-label={`Opsi ${idx+1}`}/>{pollOptions.length > 2 && <button onClick={()=>removePollOption(idx)} className="text-red-500 font-bold" aria-label="Hapus">x</button>}</div>))}<button type="button" onClick={addPollOption} className="text-xs text-blue-600 font-bold" aria-label="Tambah Opsi">+ Opsi</button></div>)}
// // // //                                                                                     {['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded border"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-48 mb-12" placeholder="Tulis materi..."/></div>)}
// // // //                                                                                     {lesType === 'video_url' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link YouTube..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Video"/>{lesContent && (<div className="bg-gray-100 p-2 rounded text-xs text-gray-500 flex items-center gap-2"><Video size={14}/> <span className="truncate flex-1">{lesContent}</span><span className="bg-green-100 text-green-700 px-1.5 rounded">Tersimpan</span></div>)}</div>)}
// // // //                                                                                     {lesType === 'virtual_class' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link Zoom/Meet..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Zoom"/>{lesContent && (<a href={lesContent} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:underline bg-blue-50 p-2 rounded border border-blue-100"><ExternalLink size={14} /> <span className="truncate">Coba Link: {lesContent}</span></a>)}</div>)}
// // // //                                                                                     {['image','upload_doc','slide','download_doc'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File (Gambar/Dokumen)</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Upload File"/>{existingFileUrl && !selectedFile && (<div className="mt-2 flex items-center gap-3 bg-gray-50 p-2 rounded border border-gray-200">{lesType === 'image' ? (<img src={getImageUrl(existingFileUrl)} alt="Preview" className="h-12 w-12 object-cover rounded border" />) : (<FileText className="text-gray-400" size={24} />)}<div className="flex-1 overflow-hidden"><div className="text-xs font-bold text-gray-600">File Tersimpan</div><a href={getImageUrl(existingFileUrl)} target="_blank" className="text-[10px] text-blue-600 truncate block hover:underline">{existingFileUrl.split('/').pop()}</a></div></div>)}</div>)}
// // // //                                                                                     {lesType === 'google_classroom' && (<div className="bg-white p-4 rounded border border-green-200 space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Class"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putus Akun"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}</div>)}

// // // //                                                                                     <div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetLessonForm} className="text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" aria-label="Simpan Materi">Simpan Materi</button></div>
// // // //                                                                                 </div>
// // // //                                                                             ) : (
// // // //                                                                                 <button type="button" onClick={() => { handleAddNewContent(m._id) }} className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-400 font-bold hover:border-blue-300 hover:text-blue-600 mt-2 transition-colors flex items-center justify-center gap-2" aria-label="Tambah Konten"><Plus size={16}/> Tambah Konten</button>
// // // //                                                                             )}
// // // //                                                                         </div>
// // // //                                                                     )}
// // // //                                                                 </Droppable>
// // // //                                                             </div>
// // // //                                                         )}
// // // //                                                     </Draggable>
// // // //                                                 );
// // // //                                             })}
// // // //                                             {provided.placeholder}
// // // //                                     </div>
// // // //                                 )}
// // // //                             </Droppable>
// // // //                         </DragDropContext>
// // // //                     </div>
// // // //                 </div>
// // // //             )}

// // // //             {/* [NEW] KONTEN TAB SKEMA PENILAIAN DENGAN KEY UNTUK RESET */}
// // // //             {activeEditorTab === 'grading' && (
// // // //                 <GradingSchemeForm 
// // // //                     key={`grading-${courseId}`} // Key ditambahkan agar reset saat ganti courseId
// // // //                     courseId={courseId} 
// // // //                     modules={course.modules} 
// // // //                     refreshData={refreshData} 
// // // //                     facilitators={facilitators} 
// // // //                 />
// // // //             )}

// // // //             {/* [NEW] KONTEN TAB SERTIFIKAT DENGAN KEY UNTUK RESET */}
// // // //             {activeEditorTab === 'certificate' && (
// // // //                 <div className="space-y-8 animate-in slide-in-from-right-4">
// // // //                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
// // // //                         <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">1. Unit Kompetensi</h2>
// // // //                         <CompetencyForm 
// // // //                             key={`comp-${courseId}`} // Key ditambahkan
// // // //                             initialData={competencies} 
// // // //                             onChange={(data) => setCompetencies(data)} 
// // // //                         />
// // // //                         <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
// // // //                             <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={includeCompetencies} onChange={e=>setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Tampilkan Kompetensi"/><span className="text-sm font-bold text-gray-700">Tampilkan daftar kompetensi di halaman belakang sertifikat?</span></label>
// // // //                             <button type="button" onClick={handleSaveCompetencies} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button>
// // // //                         </div>
// // // //                     </div>
// // // //                     <div>
// // // //                         <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">2. Pengaturan Sertifikat</h2>
// // // //                         <CertificateConfigForm 
// // // //                             key={`cert-${courseId}`} // Key ditambahkan
// // // //                             initialData={certConfig} 
// // // //                             onSave={handleSaveCertConfig} 
// // // //                             isSaving={isSavingCert} 
// // // //                             competencies={competencies} 
// // // //                             includeCompetencies={includeCompetencies} 
// // // //                             courseId={courseId} 
// // // //                             courseTitle={course?.title || 'Judul Pelatihan'} 
// // // //                         />
// // // //                     </div>
// // // //                 </div>
// // // //             )}
            
// // // //             <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3 mt-8"><h3 className="text-lg font-bold text-gray-800">Status Publikasi</h3><button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Ubah Status">{course?.isPublished ? 'Tarik Kembali (Draft)' : '🚀 PUBLISH SEKARANG'}</button></div>
// // // //         </div>
// // // //     );
// // // // }



// // // // ======================================================================
// // // // PEMBAHARUAN KONEKSI PUBLISH DI HALAMAN MANAJEMEN PELATIHAN
// // // // ======================================================================


// // // 'use client';

// // // import { useState, useRef, useMemo, useEffect } from 'react';
// // // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // import CompetencyForm from '@/components/admin/CompetencyForm';
// // // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // // import GradingSchemeForm from '@/components/admin/GradingSchemeForm'; 
// // // import {
// // //     Calendar, School, RefreshCw, LogOut, CheckCircle2, 
// // //     Link as LinkIcon, Users, FileText, Download,
// // //     FileBadge, MapPin, UserCheck, Hash, BarChart3, 
// // //     BookOpen, Trash2, Plus, Video, Image as ImageIcon,
// // //     Award, Layout, Clock, ExternalLink, Calculator,
// // //     MonitorPlay, UploadCloud, GripVertical, Pencil, MessageSquare,
// // //     Rocket, ShieldCheck, X, Bell, CheckCircle
// // // } from 'lucide-react';

// // // import dynamic from 'next/dynamic';
// // // import 'react-quill/dist/quill.snow.css'; 

// // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // //     ssr: false,
// // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // });

// // // interface CourseContentEditorProps {
// // //     course: any;
// // //     courseId: string;
// // //     refreshData: () => void;
// // //     facilitators: any[]; 
// // // }

// // // const getLessonIcon = (type: string) => {
// // //     switch (type) {
// // //         case 'video_url': return <Video size={18} className="text-red-600" />;
// // //         case 'virtual_class': return <MonitorPlay size={18} className="text-purple-600" />;
// // //         case 'quiz': return <FileBadge size={18} className="text-orange-600" />;
// // //         case 'essay': return <FileText size={18} className="text-indigo-600" />;
// // //         case 'poll': return <BarChart3 size={18} className="text-emerald-600" />;
// // //         case 'slide': return <Layout size={18} className="text-blue-600" />;
// // //         case 'image': return <ImageIcon size={18} className="text-pink-600" />;
// // //         case 'upload_doc': return <UploadCloud size={18} className="text-cyan-600" />;
// // //         case 'download_doc': return <Download size={18} className="text-green-600" />;
// // //         case 'google_classroom': return <School size={18} className="text-yellow-600" />;
// // //         default: return <BookOpen size={18} className="text-slate-500" />;
// // //     }
// // // };

// // // export default function CourseContentEditor({ course, courseId, refreshData, facilitators }: CourseContentEditorProps) {
// // //     const [activeEditorTab, setActiveEditorTab] = useState<'curriculum' | 'certificate' | 'grading'>('curriculum');
// // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // //     const [isUploadingCover, setIsUploadingCover] = useState(false);
    
// // //     // --- STATE MODUL ---
// // //     const [showModuleForm, setShowModuleForm] = useState(false);
// // //     const [modTitle, setModTitle] = useState('');
// // //     const [modIsMandatory, setModIsMandatory] = useState(true);
// // //     const [modFacilitatorId, setModFacilitatorId] = useState('');
// // //     const [modJp, setModJp] = useState(0);
// // //     const [modSchedule, setModSchedule] = useState('');
// // //     const [editingModId, setEditingModId] = useState<string | null>(null);

// // //     // --- STATE LESSON (MATERI) ---
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
// // //     const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);

// // //     // --- STATE TIMER / QUIZ / POLL ---
// // //     const [quizDuration, setQuizDuration] = useState(0); 
// // //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// // //     const [pollQuestion, setPollQuestion] = useState('');
// // //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
// // //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// // //     const [useEssayTimer, setUseEssayTimer] = useState(false);

// // //     // --- STATE GOOGLE CLASSROOM ---
// // //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// // //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// // //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// // //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// // //     // --- STATE PUBLISH DISCLAIMER ---
// // //     const [showPublishDisclaimer, setShowPublishDisclaimer] = useState(false);
// // //     const [isDisclaimerChecked, setIsDisclaimerChecked] = useState(false);
// // //     const [isPublishing, setIsPublishing] = useState(false);

// // //     // --- STATE SETTINGS ---
// // //     const [competencies, setCompetencies] = useState<any[]>(course?.competencies || []);
// // //     const [includeCompetencies, setIncludeCompetencies] = useState(course?.includeCompetenciesInCertificate ?? true);
// // //     const [certConfig, setCertConfig] = useState<any>(course?.certificateConfig || {});
// // //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>(
// // //         course?.facilitatorIds?.map((f: any) => (typeof f === 'object' ? f._id : f)) || []
// // //     );
// // //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// // //     const [isSavingCert, setIsSavingCert] = useState(false);
// // //     const [searchFacilitator, setSearchFacilitator] = useState('');

// // //     useEffect(() => {
// // //         if (course) {
// // //             setCompetencies(course.competencies || []);
// // //             setIncludeCompetencies(course.includeCompetenciesInCertificate ?? true);
// // //             setCertConfig(course.certificateConfig || {});
            
// // //             if (course.facilitatorIds) {
// // //                 setSelectedFacilitatorIds(course.facilitatorIds.map((f: any) => (typeof f === 'object' ? f._id : f)));
// // //             }
// // //         }
// // //     }, [course]);

// // //     const activeTeam = facilitators.filter((u: any) => selectedFacilitatorIds.includes(u._id) || u.role === 'SUPER_ADMIN');
// // //     const quillModules = useMemo(() => ({ toolbar: { container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'image', 'video'], [{ 'color': [] }, { 'background': [] }], ['clean']] } }), []);
// // //     const getFacilitatorNameLabel = (data: any) => { if (!data) return null; if (typeof data === 'object' && data.name) return data.name; const found = facilitators.find(f => f._id === data || f.id === data); return found ? found.name : 'Unknown'; };

// // //     // --- HELPER FUNCTIONS ---
// // //     const addPollOption = () => setPollOptions([...pollOptions, '']); 
// // //     const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; 
// // //     const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); }; 
// // //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // //     const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; 
// // //     const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); }; 
// // //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); 
    
// // //     const updateEssay = (idx: number, val: string) => { 
// // //         setEssayQuestions(prev => {
// // //             if (prev[idx] === val) return prev;
// // //             const newQ = [...prev];
// // //             newQ[idx] = val;
// // //             return newQ;
// // //         });
// // //     }; 
    
// // //     const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };

// // //     const calculateModuleJP = (lessons: any[]) => {
// // //         if (!lessons) return 0;
// // //         return lessons.reduce((acc, curr) => acc + (curr.isActive ? (curr.jp || 0) : 0), 0);
// // //     };

// // //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); window.open(url, 'GoogleAuthPopup', `width=500,height=600`); } catch (e) { alert("Gagal Auth Google"); } }; 
// // //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } }; 
// // //     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const data = await api('/api/classroom/courses', { headers: { 'x-google-token': token } }); if (data.courses) setClassroomCourses(data.courses); } catch (e: any) { if(e.status === 401 || e.message?.includes('401')) { localStorage.removeItem('google_class_token'); setGoogleToken(null); } } finally { setIsCheckingGoogle(false); } };
    
// // //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); await apiUpload(`/api/upload/course/${courseId}/cover`, formData); refreshData(); alert("Cover berhasil diperbarui!"); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// // //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); }; 
// // //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } };
// // //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); setCertConfig(data); alert("Pengaturan Sertifikat Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// // //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Kompetensi Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };

// // //     // --- MAIN LOGIC ---
// // //     const resetLessonForm = () => {
// // //         setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesType('lesson'); setLesContent(''); setLesIsMandatory(true); setLesJp(0); setLesSchedule(''); setLesFacilitatorId(''); setSelectedFile(null);
// // //         setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // //         setQuizDuration(0); 
// // //         setPollQuestion(''); setPollOptions(['', '']); setEssayQuestions(['']); setUseEssayTimer(false);
// // //         setExistingFileUrl(null); 
// // //     };

// // //     const resetModuleForm = () => {
// // //         setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false);
// // //     };

// // //     const handleSaveModule = async () => { 
// // //         if (!modTitle.trim()) return alert("Judul modul wajib diisi"); 
// // //         const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: modFacilitatorId || null, jp: modJp, scheduleDate: modSchedule || null }; 
// // //         try { 
// // //             if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); 
// // //             else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); 
// // //             alert("Modul berhasil disimpan!"); resetModuleForm(); refreshData(); 
// // //         } catch(e: any) { alert(e.message); } 
// // //     };

// // //     const handleSaveLesson = async (modId: string) => { 
// // //         if (!lesTitle.trim()) { alert("Judul materi wajib diisi!"); return; } 
// // //         let fileUrl = ''; 
// // //         if (selectedFile) { 
// // //             try { 
// // //                 setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); 
// // //                 const res = await apiUpload('/api/upload', fd); 
// // //                 fileUrl = res.url || res.file?.url || res.imageUrl; 
// // //             } catch (err) { alert("Gagal upload file!"); return; } finally { setUploading(false); } 
// // //         } else if (editingLesId) { 
// // //             fileUrl = existingFileUrl || ''; 
// // //         } 
        
// // //         const body: any = { 
// // //             title: lesTitle, type: lesType, isActive: true, isMandatory: lesIsMandatory, 
// // //             jp: lesJp, facilitatorId: lesFacilitatorId || null, scheduleDate: lesSchedule || null, 
// // //             quizDuration: quizDuration, 
// // //             questions: (lesType === 'quiz') ? questions : undefined, 
// // //             pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, 
// // //             pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, 
// // //             classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined 
// // //         }; 
        
// // //         if (lesType === 'essay') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; } 
// // //         if(fileUrl) body.fileUrl = fileUrl; 
// // //         if(lesType === 'video_url') body.videoUrl = lesContent; 
// // //         else if(lesType === 'virtual_class') {
// // //             body.meetingLink = lesContent; 
// // //             body.content = lesContent; 
// // //         }
// // //         else if(['lesson', 'upload_doc', 'download_doc', 'image', 'slide'].includes(lesType)) body.content = lesContent; 
        
// // //         try { 
// // //             if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); 
// // //             else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); 
// // //             alert("Materi berhasil disimpan!"); resetLessonForm(); refreshData(); 
// // //         } catch(e: any) { alert("Gagal menyimpan: " + e.message); } 
// // //     };

// // //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); alert("Dihapus!"); refreshData(); };
    
// // //     // [LOGIC STATUS BARU]
// // //     const handleFinalizeContent = async () => {
// // //         setIsPublishing(true);
// // //         try {
// // //             await api(`/api/courses/${courseId}`, { 
// // //                 method: 'PUT', 
// // //                 body: { isPublished: true, status: 'published' } // Langsung LIVE
// // //             });
// // //             alert("✅ Pelatihan BERHASIL DIPUBLIKASIKAN dan LIVE!");
// // //             setShowPublishDisclaimer(false);
// // //             refreshData();
// // //         } catch (e: any) {
// // //             alert("Gagal publish: " + e.message);
// // //         } finally {
// // //             setIsPublishing(false);
// // //         }
// // //     };

// // //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); alert(newStatus ? "Dipublikasikan!" : "Jadi Draft"); refreshData(); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); refreshData(); } } catch (e: any) { alert(e.message); } };
// // //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); refreshData(); } catch (err) { refreshData(); } };

// // //     const handleAddNewContent = (modId: string) => { resetLessonForm(); setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); };
    
// // //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
    
// // //     const startEditLesson = (modId: string, les: any) => { 
// // //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title); 
// // //         setQuizDuration(les.quizDuration || 0);
// // //         setExistingFileUrl(les.fileUrl || null);

// // //         if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { 
// // //             setLesType('essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); 
// // //         } else { setLesType(les.type); } 
        
// // //         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || '')); 
// // //         if (les.type === 'video_url') setLesContent(les.videoUrl||''); else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); else if (les.type !== 'essay') setLesContent(les.content||''); 
// // //         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); } 
// // //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); } 
// // //         if (les.type === 'google_classroom') { const token = localStorage.getItem('google_class_token'); if(token) { setGoogleToken(token); fetchClassroomCourses(token); } if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); } 
        
// // //         setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150); 
// // //     };

// // //     const isPublished = course?.isPublished === true;

// // //     return (
// // //         <div className="animate-in fade-in duration-300 space-y-6 relative">
// // //             <div className="flex border-b border-gray-200 overflow-x-auto">
// // //                 <button onClick={() => setActiveEditorTab('curriculum')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'curriculum' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Kurikulum"><Layout size={18}/> Kurikulum & Materi</button>
// // //                 <button onClick={() => setActiveEditorTab('grading')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'grading' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Skema Penilaian"><Calculator size={18}/> Skema Penilaian</button>
// // //                 <button onClick={() => setActiveEditorTab('certificate')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'certificate' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Sertifikat"><Award size={18}/> Sertifikat & Kompetensi</button>
// // //             </div>

// // //             {activeEditorTab === 'curriculum' && (
// // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-left-4">
// // //                     <div className="md:col-span-1 space-y-6">
// // //                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
// // //                             {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
// // //                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Ganti Cover">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Upload Cover"/></div>
// // //                         </div>
// // //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
// // //                             <div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" aria-label="Simpan Tim">Simpan</button></div>
// // //                             <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">{facilitators.map((user: any) => (<label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}><input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih ${user.name}`} /><div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div></label>))}</div>
// // //                             <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" />
// // //                         </div>
// // //                     </div>

// // //                     <div className="md:col-span-2 space-y-6">
// // //                         <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">Struktur Modul</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 flex items-center gap-2" aria-label="Tambah Modul">+ Tambah Modul</button></div>
// // //                         {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul"/><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" aria-label="JP"/></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih PJ"><option value="">-- Pilih Fasilitator --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal" /></div></div><div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetModuleForm} className="text-sm text-gray-500 font-bold" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold" aria-label="Simpan">Simpan</button></div></form>)}
                        
// // //                         <DragDropContext onDragEnd={onDragEnd}>
// // //                             <Droppable droppableId="all-modules" type="module">
// // //                                 {(provided) => (
// // //                                     <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
// // //                                             {course?.modules?.map((m: any, idx: number) => {
// // //                                                 const cumulativeJp = calculateModuleJP(m.lessons);
// // //                                                 return (
// // //                                                     <Draggable key={m._id} draggableId={m._id} index={idx}>
// // //                                                         {(provided) => (
// // //                                                             <div ref={provided.innerRef} {...provided.draggableProps} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm mb-4">
// // //                                                                 <div className="bg-slate-50 p-4 flex justify-between items-center border-b border-gray-100" {...provided.dragHandleProps}>
// // //                                                                     <div className="flex items-center gap-4">
// // //                                                                         <span className="cursor-grab text-gray-400 hover:text-gray-600 transition-colors" aria-label="Drag Modul">
// // //                                                                             <GripVertical size={20} />
// // //                                                                         </span>
// // //                                                                         <div className="flex items-center gap-3">
// // //                                                                             <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-blue-600 shadow-sm">
// // //                                                                                 <Layout size={20} strokeWidth={2.5} />
// // //                                                                             </div>
// // //                                                                             <div>
// // //                                                                                 <span className="font-bold text-gray-800 text-base">{m.title}</span>
// // //                                                                                 <div className="flex gap-2 text-[10px] mt-1 text-gray-500 font-medium">
// // //                                                                                     <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{cumulativeJp} JP</span>
// // //                                                                                     {m.facilitatorId && <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100 flex items-center gap-1">👤 {getFacilitatorNameLabel(m.facilitatorId)}</span>}
// // //                                                                                     {m.scheduleDate && <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded border border-yellow-100 flex items-center gap-1">📅 {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}
// // //                                                                                 </div>
// // //                                                                             </div>
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex gap-3 items-center">
// // //                                                                         <button type="button" onClick={() => startEditModule(m)} className="text-xs text-gray-600 font-bold hover:text-blue-600 bg-white border px-3 py-1.5 rounded-lg shadow-sm" aria-label="Edit">Edit</button>
// // //                                                                         <button type="button" onClick={() => toggleStatus(m._id)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${m.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Modul"><span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${m.isActive ? 'translate-x-6' : 'translate-x-1'}`} /></button>
// // //                                                                     </div>
// // //                                                                 </div>

// // //                                                                 <Droppable droppableId={m._id} type="lesson">
// // //                                                                     {(provided) => (
// // //                                                                         <div ref={provided.innerRef} {...provided.droppableProps} className="p-3 bg-white space-y-2">
// // //                                                                             {m.lessons?.map((l: any, lIdx: number) => (
// // //                                                                                 <Draggable key={l._id} draggableId={l._id} index={lIdx}>
// // //                                                                                     {(provided) => (
// // //                                                                                         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
// // //                                                                                              className={`flex justify-between items-center p-3 rounded-lg border transition-all hover:shadow-md ${activeModId === m._id && editingLesId === l._id ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 bg-white hover:border-gray-300'}`}>
                                                                                            
// // //                                                                                             <div className="flex gap-3 items-center flex-1">
// // //                                                                                                 <span className="cursor-grab text-gray-300 hover:text-gray-500"><GripVertical size={16}/></span>
                                                                                                
// // //                                                                                                 <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
// // //                                                                                                     {getLessonIcon(l.type)}
// // //                                                                                                 </div>

// // //                                                                                                 <div className="flex-1">
// // //                                                                                                     <p className={`text-sm font-bold ${!l.isActive ? 'text-gray-400' : 'text-gray-700'}`}>
// // //                                                                                                         {l.title}
// // //                                                                                                         {!l.isActive && <span className="text-[10px] ml-2 italic text-red-400">(Draft)</span>}
// // //                                                                                                     </p>
// // //                                                                                                     <div className="flex gap-2 items-center flex-wrap mt-1">
// // //                                                                                                         <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border uppercase font-bold tracking-wide">{l.type.replace('_', ' ')}</span>
// // //                                                                                                         {l.quizDuration > 0 && <span className="text-[9px] text-orange-600 flex items-center gap-1 font-medium"><Clock size={10} /> {l.quizDuration}m</span>}
// // //                                                                                                         {l.jp > 0 && <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 rounded border border-blue-100 font-medium">{l.jp} JP</span>}
// // //                                                                                                         {l.isMandatory ? <span className="text-[9px] bg-red-50 text-red-700 px-1.5 rounded border border-red-100 font-medium">Wajib</span> : <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 rounded border font-medium">Opsional</span>}
// // //                                                                                                     </div>
// // //                                                                                                 </div>
// // //                                                                                             </div>

// // //                                                                                             <div className="flex gap-2 items-center ml-2">
// // //                                                                                                 <button type="button" onClick={() => startEditLesson(m._id, l)} className="text-gray-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded" title="Edit" aria-label="Edit"><Pencil size={16} /></button>
// // //                                                                                                 <button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-gray-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded" title="Hapus" aria-label="Hapus"><Trash2 size={16} /></button>
// // //                                                                                                 <button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${l.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Lesson"><span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm ${l.isActive ? 'translate-x-4' : 'translate-x-1'}`} /></button>
// // //                                                                                             </div>
// // //                                                                                         </div>
// // //                                                                                     )}
// // //                                                                                 </Draggable>
// // //                                                                             ))}
// // //                                                                             {provided.placeholder}
// // //                                                                             {activeModId === m._id ? (
// // //                                                                                 <div id={`form-${m._id}`} className="bg-blue-50 p-4 rounded border border-blue-200 mt-2 space-y-3">
// // //                                                                                     <div className="grid grid-cols-12 gap-2"><div className="col-span-4"><select className="w-full p-2 border rounded text-sm bg-white" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Tipe Konten"><option value="lesson">📄 Materi Teks</option><option value="essay">📝 Esai</option><option value="slide">🖥️ Slide Presentasi</option><option value="image">🖼️ Upload Gambar</option><option value="download_doc">📥 Upload Dokumen</option><option value="upload_doc">📤 Tugas Upload</option><option value="quiz">📝 Kuis</option><option value="poll">📊 Polling</option><option value="video_url">🎞️ Video URL (YouTube)</option><option value="virtual_class">🎥 Kelas Virtual (Meet/Zoom)</option><option value="google_classroom">🏫 Google Classroom</option></select></div><div className="col-span-6"><input className="w-full p-2 border rounded text-sm" placeholder="Judul Materi..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi"/></div><div className="col-span-2"><input type="number" className="w-full p-2 border rounded text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="JP"/></div></div>
// // //                                                                                     <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded border border-yellow-200"><Clock size={18} className="text-yellow-700"/><div className="flex items-center gap-2 text-sm text-yellow-800"><span className="font-bold">Durasi Timer (Opsional):</span><input type="number" min="0" className="w-20 p-1 border border-yellow-400 rounded text-center font-bold bg-white" value={quizDuration} onChange={(e) => setQuizDuration(Number(e.target.value))} placeholder="0" aria-label="Durasi Timer"/><span>menit (0 = Tidak ada batas)</span></div></div>
// // //                                                                                     <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded border border-blue-100"><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Fasilitator (Opsional)</label><select className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesFacilitatorId} onChange={e=>setLesFacilitatorId(e.target.value)} aria-label="Pilih Fasilitator"><option value="">-- Ikut Modul --</option>{activeTeam.map((f:any)=><option key={f._id} value={f._id}>{f.name}</option>)}</select></div><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesSchedule} onChange={e=>setLesSchedule(e.target.value)} aria-label="Tanggal" /></div><div className="flex items-center h-full pt-4"><label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e=>setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib"/> Wajib diselesaikan?</label></div></div>
                                                                                    
// // //                                                                                     {lesType === 'essay' && (<div className="bg-white p-3 rounded border"><div className="mb-2"><label className="text-xs font-bold text-gray-500">Instruksi Soal:</label><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-32 mb-10"/></div>{essayQuestions.map((q, ix) => (<div key={ix} className="flex gap-2 mb-4 items-start"><div className="flex-1"><ReactQuill theme="snow" value={q} onChange={(val) => updateEssay(ix, val)} modules={quillModules} placeholder={`Pertanyaan ${ix + 1}`} className="h-24 mb-10 bg-white"/></div>{essayQuestions.length > 1 && (<button type="button" onClick={()=>removeEssay(ix)} className="text-red-500 font-bold p-2 bg-red-50 rounded hover:bg-red-100" aria-label="Hapus"><Trash2 size={16} /></button>)}</div>))}<button type="button" onClick={addEssayRow} className="text-xs text-blue-600 font-bold flex items-center gap-1 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50" aria-label="Tambah Tanya"><Plus size={14} /> Tambah Pertanyaan</button></div>)}
// // //                                                                                     {lesType === 'quiz' && (<div className="bg-white p-3 rounded border">{questions.map((q, ix) => (<div key={ix} className="p-2 border rounded bg-gray-50 mb-2 relative"><button type="button" onClick={()=>removeQuestion(ix)} className="absolute top-1 right-1 text-red-500 font-bold text-xs" aria-label="Hapus Soal">x</button><input className="w-full p-1 border rounded mb-1 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e=>updateQuestion(ix, 'question', e.target.value)} aria-label={`Pertanyaan ${ix+1}`}/><div className="grid grid-cols-2 gap-2">{q.options.map((o:string, oi:number) => <input key={oi} className={`w-full p-1 border text-xs ${q.correctIndex===oi?'bg-green-100 border-green-300':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix, 'options', e.target.value, oi)} aria-label={`Opsi ${oi+1}`}/>)}</div><div className="mt-1 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix, 'correctIndex', Number(e.target.value))} className="w-10 border" aria-label="Jawaban Benar"/></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}
// // //                                                                                     {lesType === 'poll' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} aria-label="Tanya Polling"/>{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2 mb-1"><input className="flex-1 p-1 border rounded text-xs" value={opt} onChange={e=>updatePollOption(idx, e.target.value)} placeholder={`Opsi ${idx+1}`} aria-label={`Opsi ${idx+1}`}/>{pollOptions.length > 2 && <button onClick={()=>removePollOption(idx)} className="text-red-500 font-bold" aria-label="Hapus">x</button>}</div>))}<button type="button" onClick={addPollOption} className="text-xs text-blue-600 font-bold" aria-label="Tambah Opsi">+ Opsi</button></div>)}
// // //                                                                                     {['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded border"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-48 mb-12" placeholder="Tulis materi..."/></div>)}
// // //                                                                                     {lesType === 'video_url' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link YouTube..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Video"/>{lesContent && (<div className="bg-gray-100 p-2 rounded text-xs text-gray-500 flex items-center gap-2"><Video size={14}/> <span className="truncate flex-1">{lesContent}</span><span className="bg-green-100 text-green-700 px-1.5 rounded">Tersimpan</span></div>)}</div>)}
// // //                                                                                     {lesType === 'virtual_class' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link Zoom/Meet..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Zoom"/>{lesContent && (<a href={lesContent} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:underline bg-blue-50 p-2 rounded border border-blue-100"><ExternalLink size={14} /> <span className="truncate">Coba Link: {lesContent}</span></a>)}</div>)}
// // //                                                                                     {['image','upload_doc','slide','download_doc'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File (Gambar/Dokumen)</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Upload File"/>{existingFileUrl && !selectedFile && (<div className="mt-2 flex items-center gap-3 bg-gray-50 p-2 rounded border border-gray-200">{lesType === 'image' ? (<img src={getImageUrl(existingFileUrl)} alt="Preview" className="h-12 w-12 object-cover rounded border" />) : (<FileText className="text-gray-400" size={24} />)}<div className="flex-1 overflow-hidden"><div className="text-xs font-bold text-gray-600">File Tersimpan</div><a href={getImageUrl(existingFileUrl)} target="_blank" className="text-[10px] text-blue-600 truncate block hover:underline">{existingFileUrl.split('/').pop()}</a></div></div>)}</div>)}
// // //                                                                                     {lesType === 'google_classroom' && (<div className="bg-white p-4 rounded border border-green-200 space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Class"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putus Akun"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}</div>)}

// // //                                                                                     <div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetLessonForm} className="text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" aria-label="Simpan Materi">Simpan Materi</button></div>
// // //                                                                                 </div>
// // //                                                                             ) : (
// // //                                                                                 <button type="button" onClick={() => { handleAddNewContent(m._id) }} className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-400 font-bold hover:border-blue-300 hover:text-blue-600 mt-2 transition-colors flex items-center justify-center gap-2" aria-label="Tambah Konten"><Plus size={16}/> Tambah Konten</button>
// // //                                                                             )}
// // //                                                                         </div>
// // //                                                                     )}
// // //                                                                 </Droppable>
// // //                                                             </div>
// // //                                                         )}
// // //                                                     </Draggable>
// // //                                                 );
// // //                                             })}
// // //                                             {provided.placeholder}
// // //                                     </div>
// // //                                 )}
// // //                             </Droppable>
// // //                         </DragDropContext>
// // //                     </div>
// // //                 </div>
// // //             )}

// // //             {activeEditorTab === 'grading' && (
// // //                 <GradingSchemeForm 
// // //                     key={`grading-${courseId}`}
// // //                     courseId={courseId} 
// // //                     modules={course.modules} 
// // //                     refreshData={refreshData} 
// // //                     facilitators={facilitators} 
// // //                 />
// // //             )}

// // //             {activeEditorTab === 'certificate' && (
// // //                 <div className="space-y-8 animate-in slide-in-from-right-4">
// // //                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
// // //                         <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">1. Unit Kompetensi</h2>
// // //                         <CompetencyForm key={`comp-${courseId}`} initialData={competencies} onChange={(data) => setCompetencies(data)} />
// // //                         <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
// // //                             <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={includeCompetencies} onChange={e=>setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Tampilkan Kompetensi"/><span className="text-sm font-bold text-gray-700">Tampilkan daftar kompetensi di halaman belakang sertifikat?</span></label>
// // //                             <button type="button" onClick={handleSaveCompetencies} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button>
// // //                         </div>
// // //                     </div>
// // //                     <div>
// // //                         <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">2. Pengaturan Sertifikat</h2>
// // //                         <CertificateConfigForm key={`cert-${courseId}`} initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} courseTitle={course?.title || 'Judul Pelatihan'} />
// // //                     </div>
// // //                 </div>
// // //             )}
            
// // //             {/* TOMBOL PUBLIKASI & DISCLAIMER (BAGIAN BAWAH) */}
// // //             <div className="bg-white p-8 rounded-[32px] border border-gray-200 text-center flex flex-col items-center justify-center gap-4 mt-12 shadow-lg relative overflow-hidden">
// // //                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>
                
// // //                 {!isPublished ? (
// // //                     <>
// // //                         <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2">
// // //                             <Rocket size={32} />
// // //                         </div>
// // //                         <h3 className="text-2xl font-black text-gray-900">Publikasi Pelatihan</h3>
// // //                         <p className="text-gray-500 max-w-lg">
// // //                             Pastikan seluruh modul, materi, kuis, dan pengaturan sertifikat sudah lengkap sebelum mempublikasikan pelatihan ini.
// // //                         </p>
// // //                         <button 
// // //                             type="button" 
// // //                             onClick={() => { setIsDisclaimerChecked(false); setShowPublishDisclaimer(true); }}
// // //                             className="px-10 py-4 rounded-2xl font-black text-white shadow-xl bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-3 uppercase tracking-wider text-sm mt-2" 
// // //                             aria-label="Publish Sekarang"
// // //                         >
// // //                             <UploadCloud size={20}/> PUBLISH SEKARANG
// // //                         </button>
// // //                     </>
// // //                 ) : (
// // //                     <div className="flex flex-col items-center animate-in zoom-in">
// // //                         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 shadow-inner">
// // //                             <CheckCircle2 size={40}/>
// // //                         </div>
// // //                         <h3 className="text-2xl font-black text-green-800">Pelatihan Sedang Live</h3>
// // //                         <p className="text-green-600 font-medium mt-1">Peserta sudah dapat mengakses materi ini.</p>
// // //                         <button 
// // //                             onClick={() => toggleStatus()} 
// // //                             className="mt-6 text-xs text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-lg border border-red-100"
// // //                         >
// // //                             Tarik Kembali (Unpublish)
// // //                         </button>
// // //                     </div>
// // //                 )}
// // //             </div>

// // //             {/* POPUP DISCLAIMER PUBLISH */}
// // //             {showPublishDisclaimer && (
// // //                 <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
// // //                     <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 relative animate-in zoom-in-95">
// // //                         <button type="button" onClick={() => setShowPublishDisclaimer(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-400" aria-label="Tutup"><X size={20}/></button>
                        
// // //                         <div className="flex flex-col items-center text-center space-y-4">
// // //                             <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
// // //                                 <ShieldCheck size={32}/>
// // //                             </div>
// // //                             <h3 className="text-xl font-bold text-gray-900">Konfirmasi Publikasi</h3>
// // //                             <p className="text-sm text-gray-500 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
// // //                                 "Saya menyatakan bahwa materi pelatihan ini telah disusun dengan benar, tidak melanggar hak cipta, dan siap untuk dipublikasikan kepada peserta."
// // //                             </p>
                            
// // //                             <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-blue-50 rounded-xl transition-colors w-full border border-gray-200">
// // //                                 <input 
// // //                                     type="checkbox" 
// // //                                     className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
// // //                                     checked={isDisclaimerChecked} 
// // //                                     onChange={(e) => setIsDisclaimerChecked(e.target.checked)}
// // //                                 />
// // //                                 <span className="font-bold text-sm text-gray-700">Saya Setuju & Bertanggung Jawab</span>
// // //                             </label>

// // //                             <button 
// // //                                 onClick={handleFinalizeContent} 
// // //                                 disabled={!isDisclaimerChecked || isPublishing} 
// // //                                 className="w-full py-4 rounded-xl bg-green-600 text-white font-bold shadow-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
// // //                             >
// // //                                 {isPublishing ? 'Memproses...' : '🚀 YA, PUBLISH PELATIHAN'}
// // //                             </button>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // }


// // 'use client';

// // import { useState, useRef, useMemo, useEffect } from 'react';
// // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // import CompetencyForm from '@/components/admin/CompetencyForm';
// // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // import GradingSchemeForm from '@/components/admin/GradingSchemeForm'; 
// // import {
// //     Calendar, School, RefreshCw, LogOut, CheckCircle2, 
// //     Link as LinkIcon, Users, FileText, Download,
// //     FileBadge, MapPin, UserCheck, Hash, BarChart3, 
// //     BookOpen, Trash2, Plus, Video, Image as ImageIcon,
// //     Award, Layout, Clock, ExternalLink, Calculator,
// //     MonitorPlay, UploadCloud, GripVertical, Pencil, MessageSquare,
// //     Rocket, ShieldCheck, X, Bell, CheckCircle,
// //     Mic, Globe, Zap, Layers, Trash // [BARU] Icon tambahan
// // } from 'lucide-react';

// // import dynamic from 'next/dynamic';
// // import 'react-quill/dist/quill.snow.css'; 

// // const ReactQuill = dynamic(() => import('react-quill'), { 
// //     ssr: false,
// //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // });

// // interface CourseContentEditorProps {
// //     course: any;
// //     courseId: string;
// //     refreshData: () => void;
// //     facilitators: any[]; 
// // }

// // const getLessonIcon = (type: string) => {
// //     switch (type) {
// //         case 'video_url': return <Video size={18} className="text-red-600" />;
// //         case 'virtual_class': return <MonitorPlay size={18} className="text-purple-600" />;
// //         case 'quiz': return <FileBadge size={18} className="text-orange-600" />;
// //         case 'essay': return <FileText size={18} className="text-indigo-600" />;
// //         case 'poll': return <BarChart3 size={18} className="text-emerald-600" />;
// //         case 'slide': return <Layout size={18} className="text-blue-600" />;
// //         case 'image': return <ImageIcon size={18} className="text-pink-600" />;
// //         case 'upload_doc': return <UploadCloud size={18} className="text-cyan-600" />;
// //         case 'download_doc': return <Download size={18} className="text-green-600" />;
// //         case 'google_classroom': return <School size={18} className="text-yellow-600" />;
// //         // [BARU] Icon untuk tipe baru
// //         case 'audio': return <Mic size={18} className="text-pink-500" />;
// //         case 'embed': return <Globe size={18} className="text-teal-600" />;
// //         case 'flashcard': return <Layers size={18} className="text-orange-500" />;
// //         default: return <BookOpen size={18} className="text-slate-500" />;
// //     }
// // };

// // export default function CourseContentEditor({ course, courseId, refreshData, facilitators }: CourseContentEditorProps) {
// //     const [activeEditorTab, setActiveEditorTab] = useState<'curriculum' | 'certificate' | 'grading'>('curriculum');
// //     const fileInputRef = useRef<HTMLInputElement>(null);
// //     const [isUploadingCover, setIsUploadingCover] = useState(false);
    
// //     // --- STATE MODUL ---
// //     const [showModuleForm, setShowModuleForm] = useState(false);
// //     const [modTitle, setModTitle] = useState('');
// //     const [modIsMandatory, setModIsMandatory] = useState(true);
// //     const [modFacilitatorId, setModFacilitatorId] = useState('');
// //     const [modJp, setModJp] = useState(0);
// //     const [modSchedule, setModSchedule] = useState('');
// //     const [editingModId, setEditingModId] = useState<string | null>(null);

// //     // --- STATE LESSON (MATERI) ---
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
// //     const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);

// //     // --- STATE TIMER / QUIZ / POLL / FLASHCARD ---
// //     const [quizDuration, setQuizDuration] = useState(0); 
// //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// //     const [pollQuestion, setPollQuestion] = useState('');
// //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
// //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// //     const [useEssayTimer, setUseEssayTimer] = useState(false);
// //     // [BARU] State Flashcard
// //     const [flashcards, setFlashcards] = useState<any[]>([{ front: '', back: '' }]);

// //     // --- STATE GOOGLE CLASSROOM ---
// //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// //     // --- STATE PUBLISH DISCLAIMER ---
// //     const [showPublishDisclaimer, setShowPublishDisclaimer] = useState(false);
// //     const [isDisclaimerChecked, setIsDisclaimerChecked] = useState(false);
// //     const [isPublishing, setIsPublishing] = useState(false);

// //     // --- STATE SETTINGS ---
// //     const [competencies, setCompetencies] = useState<any[]>(course?.competencies || []);
// //     const [includeCompetencies, setIncludeCompetencies] = useState(course?.includeCompetenciesInCertificate ?? true);
// //     const [certConfig, setCertConfig] = useState<any>(course?.certificateConfig || {});
// //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>(
// //         course?.facilitatorIds?.map((f: any) => (typeof f === 'object' ? f._id : f)) || []
// //     );
// //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// //     const [isSavingCert, setIsSavingCert] = useState(false);
// //     const [searchFacilitator, setSearchFacilitator] = useState('');

// //     useEffect(() => {
// //         if (course) {
// //             setCompetencies(course.competencies || []);
// //             setIncludeCompetencies(course.includeCompetenciesInCertificate ?? true);
// //             setCertConfig(course.certificateConfig || {});
            
// //             if (course.facilitatorIds) {
// //                 setSelectedFacilitatorIds(course.facilitatorIds.map((f: any) => (typeof f === 'object' ? f._id : f)));
// //             }
// //         }
// //     }, [course]);

// //     const activeTeam = facilitators.filter((u: any) => selectedFacilitatorIds.includes(u._id) || u.role === 'SUPER_ADMIN');
// //     const quillModules = useMemo(() => ({ toolbar: { container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'image', 'video'], [{ 'color': [] }, { 'background': [] }], ['clean']] } }), []);
// //     const getFacilitatorNameLabel = (data: any) => { if (!data) return null; if (typeof data === 'object' && data.name) return data.name; const found = facilitators.find(f => f._id === data || f.id === data); return found ? found.name : 'Unknown'; };

// //     // --- HELPER FUNCTIONS ---
// //     const addPollOption = () => setPollOptions([...pollOptions, '']); 
// //     const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; 
// //     const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); }; 
// //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// //     const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; 
// //     const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); }; 
// //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); 
    
// //     // [BARU] Helper Flashcard
// //     const addFlashcard = () => setFlashcards([...flashcards, { front: '', back: '' }]);
// //     const updateFlashcard = (idx: number, field: 'front' | 'back', val: string) => {
// //         const newCards = [...flashcards];
// //         newCards[idx][field] = val;
// //         setFlashcards(newCards);
// //     };
// //     const removeFlashcard = (idx: number) => {
// //         if (flashcards.length > 1) setFlashcards(flashcards.filter((_, i) => i !== idx));
// //     };

// //     const updateEssay = (idx: number, val: string) => { 
// //         setEssayQuestions(prev => {
// //             if (prev[idx] === val) return prev;
// //             const newQ = [...prev];
// //             newQ[idx] = val;
// //             return newQ;
// //         });
// //     }; 
    
// //     const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };

// //     const calculateModuleJP = (lessons: any[]) => {
// //         if (!lessons) return 0;
// //         return lessons.reduce((acc, curr) => acc + (curr.isActive ? (curr.jp || 0) : 0), 0);
// //     };

// //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); window.open(url, 'GoogleAuthPopup', `width=500,height=600`); } catch (e) { alert("Gagal Auth Google"); } }; 
// //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } }; 
// //     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const data = await api('/api/classroom/courses', { headers: { 'x-google-token': token } }); if (data.courses) setClassroomCourses(data.courses); } catch (e: any) { if(e.status === 401 || e.message?.includes('401')) { localStorage.removeItem('google_class_token'); setGoogleToken(null); } } finally { setIsCheckingGoogle(false); } };
    
// //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); await apiUpload(`/api/upload/course/${courseId}/cover`, formData); refreshData(); alert("Cover berhasil diperbarui!"); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); }; 
// //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } };
// //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); setCertConfig(data); alert("Pengaturan Sertifikat Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Kompetensi Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };

// //     // --- MAIN LOGIC ---
// //     const resetLessonForm = () => {
// //         setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesType('lesson'); setLesContent(''); setLesIsMandatory(true); setLesJp(0); setLesSchedule(''); setLesFacilitatorId(''); setSelectedFile(null);
// //         setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// //         setQuizDuration(0); 
// //         setPollQuestion(''); setPollOptions(['', '']); setEssayQuestions(['']); setUseEssayTimer(false);
// //         setFlashcards([{ front: '', back: '' }]);
// //         setExistingFileUrl(null); 
// //     };

// //     const resetModuleForm = () => {
// //         setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false);
// //     };

// //     const handleSaveModule = async () => { 
// //         if (!modTitle.trim()) return alert("Judul modul wajib diisi"); 
// //         const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: modFacilitatorId || null, jp: modJp, scheduleDate: modSchedule || null }; 
// //         try { 
// //             if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); 
// //             else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); 
// //             alert("Modul berhasil disimpan!"); resetModuleForm(); refreshData(); 
// //         } catch(e: any) { alert(e.message); } 
// //     };

// //     const handleSaveLesson = async (modId: string) => { 
// //         if (!lesTitle.trim()) { alert("Judul materi wajib diisi!"); return; } 
// //         let fileUrl = ''; 
// //         if (selectedFile) { 
// //             try { 
// //                 setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); 
// //                 const res = await apiUpload('/api/upload', fd); 
// //                 fileUrl = res.url || res.file?.url || res.imageUrl; 
// //             } catch (err) { alert("Gagal upload file!"); return; } finally { setUploading(false); } 
// //         } else if (editingLesId) { 
// //             fileUrl = existingFileUrl || ''; 
// //         } 
        
// //         const body: any = { 
// //             title: lesTitle, type: lesType, isActive: true, isMandatory: lesIsMandatory, 
// //             jp: lesJp, facilitatorId: lesFacilitatorId || null, scheduleDate: lesSchedule || null, 
// //             quizDuration: quizDuration, 
// //             questions: (lesType === 'quiz') ? questions : undefined, 
// //             pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, 
// //             pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, 
// //             classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined 
// //         }; 
        
// //         if (lesType === 'essay') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; } 
// //         if (lesType === 'flashcard') { 
// //             // Simpan flashcards sebagai JSON string di field content
// //             body.content = JSON.stringify(flashcards); 
// //         }

// //         if(fileUrl) body.fileUrl = fileUrl; 
        
// //         // [UPDATE] Logic Mapping Content untuk Tipe Baru
// //         if(lesType === 'video_url') body.videoUrl = lesContent; 
// //         else if(lesType === 'embed') body.videoUrl = lesContent; // Pakai field videoUrl untuk menyimpan Link Embed
// //         else if(lesType === 'virtual_class') {
// //             body.meetingLink = lesContent; 
// //             body.content = lesContent; 
// //         }
// //         else if(['lesson', 'upload_doc', 'download_doc', 'image', 'slide', 'audio'].includes(lesType)) body.content = lesContent; 
        
// //         try { 
// //             if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); 
// //             else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); 
// //             alert("Materi berhasil disimpan!"); resetLessonForm(); refreshData(); 
// //         } catch(e: any) { alert("Gagal menyimpan: " + e.message); } 
// //     };

// //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); alert("Dihapus!"); refreshData(); };
    
// //     // [LOGIC STATUS BARU]
// //     const handleFinalizeContent = async () => {
// //         setIsPublishing(true);
// //         try {
// //             await api(`/api/courses/${courseId}`, { 
// //                 method: 'PUT', 
// //                 body: { isPublished: true, status: 'published' } // Langsung LIVE
// //             });
// //             alert("✅ Pelatihan BERHASIL DIPUBLIKASIKAN dan LIVE!");
// //             setShowPublishDisclaimer(false);
// //             refreshData();
// //         } catch (e: any) {
// //             alert("Gagal publish: " + e.message);
// //         } finally {
// //             setIsPublishing(false);
// //         }
// //     };

// //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); alert(newStatus ? "Dipublikasikan!" : "Jadi Draft"); refreshData(); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); refreshData(); } } catch (e: any) { alert(e.message); } };
// //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); refreshData(); } catch (err) { refreshData(); } };

// //     const handleAddNewContent = (modId: string) => { resetLessonForm(); setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); };
    
// //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
    
// //     const startEditLesson = (modId: string, les: any) => { 
// //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title); 
// //         setQuizDuration(les.quizDuration || 0);
// //         setExistingFileUrl(les.fileUrl || null);

// //         // Map tipe konten
// //         if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { 
// //             setLesType('essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); 
// //         } else if (les.type === 'embed') {
// //             setLesType('embed'); setLesContent(les.videoUrl || ''); // Map videoUrl back to content for input
// //         } else if (les.type === 'flashcard') {
// //             setLesType('flashcard');
// //             try {
// //                 setFlashcards(JSON.parse(les.content || '[]'));
// //             } catch (e) {
// //                 setFlashcards([{ front: '', back: '' }]);
// //             }
// //         } else { setLesType(les.type); } 
        
// //         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || '')); 
        
// //         if (les.type === 'video_url') setLesContent(les.videoUrl||''); 
// //         else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); 
// //         else if (['lesson', 'upload_doc', 'download_doc', 'image', 'slide', 'audio'].includes(les.type)) setLesContent(les.content||''); 
        
// //         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); } 
// //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); } 
// //         if (les.type === 'google_classroom') { const token = localStorage.getItem('google_class_token'); if(token) { setGoogleToken(token); fetchClassroomCourses(token); } if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); } 
        
// //         setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150); 
// //     };

// //     const isPublished = course?.isPublished === true;

// //     return (
// //         <div className="animate-in fade-in duration-300 space-y-6 relative">
// //             <div className="flex border-b border-gray-200 overflow-x-auto">
// //                 <button onClick={() => setActiveEditorTab('curriculum')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'curriculum' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Kurikulum"><Layout size={18}/> Kurikulum & Materi</button>
// //                 <button onClick={() => setActiveEditorTab('grading')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'grading' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Skema Penilaian"><Calculator size={18}/> Skema Penilaian</button>
// //                 <button onClick={() => setActiveEditorTab('certificate')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'certificate' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Sertifikat"><Award size={18}/> Sertifikat & Kompetensi</button>
// //             </div>

// //             {activeEditorTab === 'curriculum' && (
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-left-4">
// //                     <div className="md:col-span-1 space-y-6">
// //                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
// //                             {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
// //                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Ganti Cover">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Upload Cover"/></div>
// //                         </div>
// //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
// //                             <div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" aria-label="Simpan Tim">Simpan</button></div>
// //                             <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">{facilitators.map((user: any) => (<label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}><input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih ${user.name}`} /><div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div></label>))}</div>
// //                             <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" />
// //                         </div>
// //                     </div>

// //                     <div className="md:col-span-2 space-y-6">
// //                         <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">Struktur Modul</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 flex items-center gap-2" aria-label="Tambah Modul">+ Tambah Modul</button></div>
// //                         {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul"/><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" aria-label="JP"/></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih PJ"><option value="">-- Pilih Fasilitator --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal" /></div></div><div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetModuleForm} className="text-sm text-gray-500 font-bold" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold" aria-label="Simpan">Simpan</button></div></form>)}
                        
// //                         <DragDropContext onDragEnd={onDragEnd}>
// //                             <Droppable droppableId="all-modules" type="module">
// //                                 {(provided) => (
// //                                     <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
// //                                             {course?.modules?.map((m: any, idx: number) => {
// //                                                 const cumulativeJp = calculateModuleJP(m.lessons);
// //                                                 return (
// //                                                     <Draggable key={m._id} draggableId={m._id} index={idx}>
// //                                                         {(provided) => (
// //                                                             <div ref={provided.innerRef} {...provided.draggableProps} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm mb-4">
// //                                                                 <div className="bg-slate-50 p-4 flex justify-between items-center border-b border-gray-100" {...provided.dragHandleProps}>
// //                                                                     <div className="flex items-center gap-4">
// //                                                                         <span className="cursor-grab text-gray-400 hover:text-gray-600 transition-colors" aria-label="Drag Modul">
// //                                                                             <GripVertical size={20} />
// //                                                                         </span>
// //                                                                         <div className="flex items-center gap-3">
// //                                                                             <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-blue-600 shadow-sm">
// //                                                                                 <Layout size={20} strokeWidth={2.5} />
// //                                                                             </div>
// //                                                                             <div>
// //                                                                                 <span className="font-bold text-gray-800 text-base">{m.title}</span>
// //                                                                                 <div className="flex gap-2 text-[10px] mt-1 text-gray-500 font-medium">
// //                                                                                     <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{cumulativeJp} JP</span>
// //                                                                                     {m.facilitatorId && <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100 flex items-center gap-1">👤 {getFacilitatorNameLabel(m.facilitatorId)}</span>}
// //                                                                                     {m.scheduleDate && <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded border border-yellow-100 flex items-center gap-1">📅 {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}
// //                                                                                 </div>
// //                                                                             </div>
// //                                                                         </div>
// //                                                                     </div>
// //                                                                     <div className="flex gap-3 items-center">
// //                                                                         <button type="button" onClick={() => startEditModule(m)} className="text-xs text-gray-600 font-bold hover:text-blue-600 bg-white border px-3 py-1.5 rounded-lg shadow-sm" aria-label="Edit">Edit</button>
// //                                                                         <button type="button" onClick={() => toggleStatus(m._id)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${m.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Modul"><span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${m.isActive ? 'translate-x-6' : 'translate-x-1'}`} /></button>
// //                                                                     </div>
// //                                                                 </div>

// //                                                                 <Droppable droppableId={m._id} type="lesson">
// //                                                                     {(provided) => (
// //                                                                         <div ref={provided.innerRef} {...provided.droppableProps} className="p-3 bg-white space-y-2">
// //                                                                             {m.lessons?.map((l: any, lIdx: number) => (
// //                                                                                 <Draggable key={l._id} draggableId={l._id} index={lIdx}>
// //                                                                                     {(provided) => (
// //                                                                                         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
// //                                                                                              className={`flex justify-between items-center p-3 rounded-lg border transition-all hover:shadow-md ${activeModId === m._id && editingLesId === l._id ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 bg-white hover:border-gray-300'}`}>
                                                                                            
// //                                                                                             <div className="flex gap-3 items-center flex-1">
// //                                                                                                 <span className="cursor-grab text-gray-300 hover:text-gray-500"><GripVertical size={16}/></span>
                                                                                                
// //                                                                                                 <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
// //                                                                                                     {getLessonIcon(l.type)}
// //                                                                                                 </div>

// //                                                                                                 <div className="flex-1">
// //                                                                                                     <p className={`text-sm font-bold ${!l.isActive ? 'text-gray-400' : 'text-gray-700'}`}>
// //                                                                                                         {l.title}
// //                                                                                                         {!l.isActive && <span className="text-[10px] ml-2 italic text-red-400">(Draft)</span>}
// //                                                                                                     </p>
// //                                                                                                     <div className="flex gap-2 items-center flex-wrap mt-1">
// //                                                                                                         <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border uppercase font-bold tracking-wide">{l.type.replace('_', ' ')}</span>
// //                                                                                                         {l.quizDuration > 0 && <span className="text-[9px] text-orange-600 flex items-center gap-1 font-medium"><Clock size={10} /> {l.quizDuration}m</span>}
// //                                                                                                         {l.jp > 0 && <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 rounded border border-blue-100 font-medium">{l.jp} JP</span>}
// //                                                                                                         {l.isMandatory ? <span className="text-[9px] bg-red-50 text-red-700 px-1.5 rounded border border-red-100 font-medium">Wajib</span> : <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 rounded border font-medium">Opsional</span>}
// //                                                                                                     </div>
// //                                                                                                 </div>
// //                                                                                             </div>

// //                                                                                             <div className="flex gap-2 items-center ml-2">
// //                                                                                                 <button type="button" onClick={() => startEditLesson(m._id, l)} className="text-gray-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded" title="Edit" aria-label="Edit"><Pencil size={16} /></button>
// //                                                                                                 <button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-gray-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded" title="Hapus" aria-label="Hapus"><Trash2 size={16} /></button>
// //                                                                                                 <button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${l.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Lesson"><span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm ${l.isActive ? 'translate-x-4' : 'translate-x-1'}`} /></button>
// //                                                                                             </div>
// //                                                                                         </div>
// //                                                                                     )}
// //                                                                                 </Draggable>
// //                                                                             ))}
// //                                                                             {provided.placeholder}
// //                                                                             {activeModId === m._id ? (
// //                                                                                 <div id={`form-${m._id}`} className="bg-blue-50 p-4 rounded border border-blue-200 mt-2 space-y-3">
// //                                                                                     <div className="grid grid-cols-12 gap-2">
// //                                                                                         <div className="col-span-4">
// //                                                                                             <select className="w-full p-2 border rounded text-sm bg-white" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Tipe Konten">
// //                                                                                                 <option value="lesson">📄 Materi Teks</option>
// //                                                                                                 <option value="video_url">🎞️ Video URL (YouTube)</option>
// //                                                                                                 <option value="audio">🎧 Audio / Podcast</option>
// //                                                                                                 <option value="embed">🌐 Smart Embed (PDF/Web)</option>
// //                                                                                                 <option value="flashcard">🃏 Flashcards (Hafalan)</option>
// //                                                                                                 <option value="slide">🖥️ Slide Presentasi (Lama)</option>
// //                                                                                                 <option value="quiz">📝 Kuis Pilihan Ganda</option>
// //                                                                                                 <option value="essay">✍️ Esai / Uraian</option>
// //                                                                                                 <option value="poll">📊 Polling</option>
// //                                                                                                 <option value="upload_doc">📤 Tugas Upload</option>
// //                                                                                                 <option value="download_doc">📥 Download Dokumen</option>
// //                                                                                                 <option value="image">🖼️ Gambar</option>
// //                                                                                                 <option value="virtual_class">🎥 Kelas Virtual (Zoom)</option>
// //                                                                                                 <option value="google_classroom">🏫 Google Classroom</option>
// //                                                                                             </select>
// //                                                                                         </div>
// //                                                                                         <div className="col-span-6 flex gap-1">
// //                                                                                             <input className="w-full p-2 border rounded text-sm" placeholder="Judul Materi..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi"/>
// //                                                                                             {/* [BARU] Tombol AI Generator Trigger */}
// //                                                                                             <button type="button" className="bg-purple-100 text-purple-600 px-3 rounded hover:bg-purple-200 flex items-center gap-1 text-xs font-bold" title="Generate with AI (Coming Soon)" onClick={() => alert("Fitur AI Generator akan segera hadir!")} aria-label="Generate AI">
// //                                                                                                 <Zap size={14} /> AI
// //                                                                                             </button>
// //                                                                                         </div>
// //                                                                                         <div className="col-span-2">
// //                                                                                             <input type="number" className="w-full p-2 border rounded text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="JP"/>
// //                                                                                         </div>
// //                                                                                     </div>
                                                                                    
// //                                                                                     <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded border border-yellow-200"><Clock size={18} className="text-yellow-700"/><div className="flex items-center gap-2 text-sm text-yellow-800"><span className="font-bold">Durasi Timer (Opsional):</span><input type="number" min="0" className="w-20 p-1 border border-yellow-400 rounded text-center font-bold bg-white" value={quizDuration} onChange={(e) => setQuizDuration(Number(e.target.value))} placeholder="0" aria-label="Durasi Timer"/><span>menit (0 = Tidak ada batas)</span></div></div>
                                                                                    
// //                                                                                     <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded border border-blue-100"><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Fasilitator (Opsional)</label><select className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesFacilitatorId} onChange={e=>setLesFacilitatorId(e.target.value)} aria-label="Pilih Fasilitator"><option value="">-- Ikut Modul --</option>{activeTeam.map((f:any)=><option key={f._id} value={f._id}>{f.name}</option>)}</select></div><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesSchedule} onChange={e=>setLesSchedule(e.target.value)} aria-label="Tanggal" /></div><div className="flex items-center h-full pt-4"><label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e=>setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib"/> Wajib diselesaikan?</label></div></div>
                                                                                    
// //                                                                                     {lesType === 'essay' && (<div className="bg-white p-3 rounded border"><div className="mb-2"><label className="text-xs font-bold text-gray-500">Instruksi Soal:</label><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-32 mb-10"/></div>{essayQuestions.map((q, ix) => (<div key={ix} className="flex gap-2 mb-4 items-start"><div className="flex-1"><ReactQuill theme="snow" value={q} onChange={(val) => updateEssay(ix, val)} modules={quillModules} placeholder={`Pertanyaan ${ix + 1}`} className="h-24 mb-10 bg-white"/></div>{essayQuestions.length > 1 && (<button type="button" onClick={()=>removeEssay(ix)} className="text-red-500 font-bold p-2 bg-red-50 rounded hover:bg-red-100" aria-label="Hapus"><Trash2 size={16} /></button>)}</div>))}<button type="button" onClick={addEssayRow} className="text-xs text-blue-600 font-bold flex items-center gap-1 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50" aria-label="Tambah Tanya"><Plus size={14} /> Tambah Pertanyaan</button></div>)}
                                                                                    
// //                                                                                     {lesType === 'quiz' && (<div className="bg-white p-3 rounded border">{questions.map((q, ix) => (<div key={ix} className="p-2 border rounded bg-gray-50 mb-2 relative"><button type="button" onClick={()=>removeQuestion(ix)} className="absolute top-1 right-1 text-red-500 font-bold text-xs" aria-label="Hapus Soal">x</button><input className="w-full p-1 border rounded mb-1 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e=>updateQuestion(ix, 'question', e.target.value)} aria-label={`Pertanyaan ${ix+1}`}/><div className="grid grid-cols-2 gap-2">{q.options.map((o:string, oi:number) => <input key={oi} className={`w-full p-1 border text-xs ${q.correctIndex===oi?'bg-green-100 border-green-300':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix, 'options', e.target.value, oi)} aria-label={`Opsi ${oi+1}`}/>)}</div><div className="mt-1 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix, 'correctIndex', Number(e.target.value))} className="w-10 border" aria-label="Jawaban Benar"/></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}
                                                                                    
// //                                                                                     {lesType === 'poll' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} aria-label="Tanya Polling"/>{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2 mb-1"><input className="flex-1 p-1 border rounded text-xs" value={opt} onChange={e=>updatePollOption(idx, e.target.value)} placeholder={`Opsi ${idx+1}`} aria-label={`Opsi ${idx+1}`}/>{pollOptions.length > 2 && <button onClick={()=>removePollOption(idx)} className="text-red-500 font-bold" aria-label="Hapus">x</button>}</div>))}<button type="button" onClick={addPollOption} className="text-xs text-blue-600 font-bold" aria-label="Tambah Opsi">+ Opsi</button></div>)}
                                                                                    
// //                                                                                     {/* [BARU] FLASHCARD EDITOR */}
// //                                                                                     {lesType === 'flashcard' && (
// //                                                                                         <div className="bg-white p-3 rounded border">
// //                                                                                             <div className="text-xs text-gray-500 mb-2">Buat kartu hafalan (Depan: Pertanyaan/Istilah, Belakang: Jawaban/Definisi)</div>
// //                                                                                             {flashcards.map((card, idx) => (
// //                                                                                                 <div key={idx} className="flex gap-2 mb-2 p-2 bg-gray-50 rounded border items-start">
// //                                                                                                     <span className="text-xs font-bold text-gray-400 mt-2">#{idx+1}</span>
// //                                                                                                     <div className="flex-1 space-y-2">
// //                                                                                                         <input className="w-full p-2 border rounded text-xs" placeholder="Sisi Depan (Pertanyaan)" value={card.front} onChange={e => updateFlashcard(idx, 'front', e.target.value)} aria-label={`Flashcard Depan ${idx+1}`} />
// //                                                                                                         <input className="w-full p-2 border rounded text-xs" placeholder="Sisi Belakang (Jawaban)" value={card.back} onChange={e => updateFlashcard(idx, 'back', e.target.value)} aria-label={`Flashcard Belakang ${idx+1}`} />
// //                                                                                                     </div>
// //                                                                                                     <button type="button" onClick={() => removeFlashcard(idx)} className="text-red-500 hover:bg-red-100 p-1 rounded" title="Hapus Kartu"><Trash size={16}/></button>
// //                                                                                                 </div>
// //                                                                                             ))}
// //                                                                                             <button type="button" onClick={addFlashcard} className="text-xs text-blue-600 font-bold flex items-center gap-1 mt-2" aria-label="Tambah Flashcard"><Plus size={14}/> Tambah Kartu</button>
// //                                                                                         </div>
// //                                                                                     )}

// //                                                                                     {['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded border"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-48 mb-12" placeholder="Tulis materi..."/></div>)}
                                                                                    
// //                                                                                     {lesType === 'video_url' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link YouTube..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Video"/>{lesContent && (<div className="bg-gray-100 p-2 rounded text-xs text-gray-500 flex items-center gap-2"><Video size={14}/> <span className="truncate flex-1">{lesContent}</span><span className="bg-green-100 text-green-700 px-1.5 rounded">Tersimpan</span></div>)}</div>)}
                                                                                    
// //                                                                                     {/* [BARU] FORM AUDIO */}
// //                                                                                     {lesType === 'audio' && (
// //                                                                                         <div className="bg-white p-4 rounded border border-pink-200 space-y-3">
// //                                                                                             <label className="block text-xs font-bold text-gray-600">Upload File Audio (MP3/WAV)</label>
// //                                                                                             <div className="flex gap-2 items-center">
// //                                                                                                 <input type="file" accept="audio/*" onChange={e => setSelectedFile(e.target.files?.[0] || null)} className="text-sm w-full border p-2 rounded" aria-label="Upload Audio"/>
// //                                                                                             </div>
// //                                                                                             {existingFileUrl && !selectedFile && (
// //                                                                                                 <div className="bg-pink-50 p-2 rounded flex items-center gap-2 text-xs text-pink-700">
// //                                                                                                     <Mic size={14}/> <span>Audio tersimpan: </span>
// //                                                                                                     <a href={getImageUrl(existingFileUrl)} target="_blank" className="underline font-bold">Dengar Preview</a>
// //                                                                                                 </div>
// //                                                                                             )}
// //                                                                                             <div className="mt-2">
// //                                                                                                 <label className="block text-xs font-bold text-gray-600 mb-1">Deskripsi / Transkrip (Opsional)</label>
// //                                                                                                 <ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-24 mb-10 bg-white"/>
// //                                                                                             </div>
// //                                                                                         </div>
// //                                                                                     )}

// //                                                                                     {/* [BARU] FORM EMBED */}
// //                                                                                     {lesType === 'embed' && (
// //                                                                                         <div className="bg-white p-4 rounded border border-teal-200 space-y-3">
// //                                                                                             <div className="bg-teal-50 p-3 rounded text-xs text-teal-800 mb-2">
// //                                                                                                 <strong>Tips:</strong> Masukkan URL Google Drive (Public), Spotify Embed, Canva Embed, atau link PDF langsung.
// //                                                                                             </div>
// //                                                                                             <input className="w-full p-2 border rounded text-sm" placeholder="Paste URL Embed disini..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="URL Embed"/>
// //                                                                                             {lesContent && (
// //                                                                                                 <div className="aspect-video bg-gray-100 rounded border overflow-hidden relative">
// //                                                                                                     <p className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs z-0">Preview Area</p>
// //                                                                                                     <iframe src={lesContent} className="w-full h-full relative z-10" title="Preview Embed" />
// //                                                                                                 </div>
// //                                                                                             )}
// //                                                                                         </div>
// //                                                                                     )}

// //                                                                                     {lesType === 'virtual_class' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link Zoom/Meet..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Zoom"/>{lesContent && (<a href={lesContent} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:underline bg-blue-50 p-2 rounded border border-blue-100"><ExternalLink size={14} /> <span className="truncate">Coba Link: {lesContent}</span></a>)}</div>)}
                                                                                    
// //                                                                                     {['image','upload_doc','slide','download_doc'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File (Gambar/Dokumen)</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Upload File"/>{existingFileUrl && !selectedFile && (<div className="mt-2 flex items-center gap-3 bg-gray-50 p-2 rounded border border-gray-200">{lesType === 'image' ? (<img src={getImageUrl(existingFileUrl)} alt="Preview" className="h-12 w-12 object-cover rounded border" />) : (<FileText className="text-gray-400" size={24} />)}<div className="flex-1 overflow-hidden"><div className="text-xs font-bold text-gray-600">File Tersimpan</div><a href={getImageUrl(existingFileUrl)} target="_blank" className="text-[10px] text-blue-600 truncate block hover:underline">{existingFileUrl.split('/').pop()}</a></div></div>)}</div>)}
// //                                                                                     {lesType === 'google_classroom' && (<div className="bg-white p-4 rounded border border-green-200 space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Class"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putus Akun"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}</div>)}

// //                                                                                     <div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetLessonForm} className="text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" aria-label="Simpan Materi">Simpan Materi</button></div>
// //                                                                                 </div>
// //                                                                             ) : (
// //                                                                                 <button type="button" onClick={() => { handleAddNewContent(m._id) }} className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-400 font-bold hover:border-blue-300 hover:text-blue-600 mt-2 transition-colors flex items-center justify-center gap-2" aria-label="Tambah Konten"><Plus size={16}/> Tambah Konten</button>
// //                                                                             )}
// //                                                                         </div>
// //                                                                     )}
// //                                                                 </Droppable>
// //                                                             </div>
// //                                                         )}
// //                                                     </Draggable>
// //                                                 );
// //                                             })}
// //                                             {provided.placeholder}
// //                                     </div>
// //                                 )}
// //                             </Droppable>
// //                         </DragDropContext>
// //                     </div>
// //                 </div>
// //             )}

// //             {activeEditorTab === 'grading' && (
// //                 <GradingSchemeForm 
// //                     key={`grading-${courseId}`}
// //                     courseId={courseId} 
// //                     modules={course.modules} 
// //                     refreshData={refreshData} 
// //                     facilitators={facilitators} 
// //                 />
// //             )}

// //             {activeEditorTab === 'certificate' && (
// //                 <div className="space-y-8 animate-in slide-in-from-right-4">
// //                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
// //                         <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">1. Unit Kompetensi</h2>
// //                         <CompetencyForm key={`comp-${courseId}`} initialData={competencies} onChange={(data) => setCompetencies(data)} />
// //                         <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
// //                             <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={includeCompetencies} onChange={e=>setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Tampilkan Kompetensi"/><span className="text-sm font-bold text-gray-700">Tampilkan daftar kompetensi di halaman belakang sertifikat?</span></label>
// //                             <button type="button" onClick={handleSaveCompetencies} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button>
// //                         </div>
// //                     </div>
// //                     <div>
// //                         <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">2. Pengaturan Sertifikat</h2>
// //                         <CertificateConfigForm key={`cert-${courseId}`} initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} courseTitle={course?.title || 'Judul Pelatihan'} />
// //                     </div>
// //                 </div>
// //             )}
            
// //             {/* TOMBOL PUBLIKASI & DISCLAIMER (BAGIAN BAWAH) */}
// //             <div className="bg-white p-8 rounded-[32px] border border-gray-200 text-center flex flex-col items-center justify-center gap-4 mt-12 shadow-lg relative overflow-hidden">
// //                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>
                
// //                 {!isPublished ? (
// //                     <>
// //                         <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2">
// //                             <Rocket size={32} />
// //                         </div>
// //                         <h3 className="text-2xl font-black text-gray-900">Publikasi Pelatihan</h3>
// //                         <p className="text-gray-500 max-w-lg">
// //                             Pastikan seluruh modul, materi, kuis, dan pengaturan sertifikat sudah lengkap sebelum mempublikasikan pelatihan ini.
// //                         </p>
// //                         <button 
// //                             type="button" 
// //                             onClick={() => { setIsDisclaimerChecked(false); setShowPublishDisclaimer(true); }}
// //                             className="px-10 py-4 rounded-2xl font-black text-white shadow-xl bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-3 uppercase tracking-wider text-sm mt-2" 
// //                             aria-label="Publish Sekarang"
// //                         >
// //                             <UploadCloud size={20}/> PUBLISH SEKARANG
// //                         </button>
// //                     </>
// //                 ) : (
// //                     <div className="flex flex-col items-center animate-in zoom-in">
// //                         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 shadow-inner">
// //                             <CheckCircle2 size={40}/>
// //                         </div>
// //                         <h3 className="text-2xl font-black text-green-800">Pelatihan Sedang Live</h3>
// //                         <p className="text-green-600 font-medium mt-1">Peserta sudah dapat mengakses materi ini.</p>
// //                         <button 
// //                             onClick={() => toggleStatus()} 
// //                             className="mt-6 text-xs text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-lg border border-red-100"
// //                         >
// //                             Tarik Kembali (Unpublish)
// //                         </button>
// //                     </div>
// //                 )}
// //             </div>

// //             {/* POPUP DISCLAIMER PUBLISH */}
// //             {showPublishDisclaimer && (
// //                 <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
// //                     <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 relative animate-in zoom-in-95">
// //                         <button type="button" onClick={() => setShowPublishDisclaimer(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-400" aria-label="Tutup"><X size={20}/></button>
                        
// //                         <div className="flex flex-col items-center text-center space-y-4">
// //                             <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
// //                                 <ShieldCheck size={32}/>
// //                             </div>
// //                             <h3 className="text-xl font-bold text-gray-900">Konfirmasi Publikasi</h3>
// //                             <p className="text-sm text-gray-500 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
// //                                 "Saya menyatakan bahwa materi pelatihan ini telah disusun dengan benar, tidak melanggar hak cipta, dan siap untuk dipublikasikan kepada peserta."
// //                             </p>
                            
// //                             <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-blue-50 rounded-xl transition-colors w-full border border-gray-200">
// //                                 <input 
// //                                     type="checkbox" 
// //                                     className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
// //                                     checked={isDisclaimerChecked} 
// //                                     onChange={(e) => setIsDisclaimerChecked(e.target.checked)}
// //                                 />
// //                                 <span className="font-bold text-sm text-gray-700">Saya Setuju & Bertanggung Jawab</span>
// //                             </label>

// //                             <button 
// //                                 onClick={handleFinalizeContent} 
// //                                 disabled={!isDisclaimerChecked || isPublishing} 
// //                                 className="w-full py-4 rounded-xl bg-green-600 text-white font-bold shadow-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
// //                             >
// //                                 {isPublishing ? 'Memproses...' : '🚀 YA, PUBLISH PELATIHAN'}
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }


// // 'use client';

// // import { useState, useRef, useMemo, useEffect } from 'react';
// // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // import CompetencyForm from '@/components/admin/CompetencyForm';
// // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // import GradingSchemeForm from '@/components/admin/GradingSchemeForm'; 
// // import {
// //     Calendar, School, RefreshCw, LogOut, CheckCircle2, 
// //     Link as LinkIcon, Users, FileText, Download,
// //     FileBadge, MapPin, UserCheck, Hash, BarChart3, 
// //     BookOpen, Trash2, Plus, Video, Image as ImageIcon,
// //     Award, Layout, Clock, ExternalLink, Calculator,
// //     MonitorPlay, UploadCloud, GripVertical, Pencil, MessageSquare,
// //     Rocket, ShieldCheck, X, Bell, CheckCircle,
// //     Mic, Globe, Zap, Layers, Trash, Gamepad2, Camera, Smile // [BARU] Icon Lengkap
// // } from 'lucide-react';

// // import dynamic from 'next/dynamic';
// // import 'react-quill/dist/quill.snow.css'; 

// // const ReactQuill = dynamic(() => import('react-quill'), { 
// //     ssr: false,
// //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // });

// // interface CourseContentEditorProps {
// //     course: any;
// //     courseId: string;
// //     refreshData: () => void;
// //     facilitators: any[]; 
// // }

// // const getLessonIcon = (type: string) => {
// //     switch (type) {
// //         case 'video_url': return <Video size={18} className="text-red-600" />;
// //         case 'virtual_class': return <MonitorPlay size={18} className="text-purple-600" />;
// //         case 'quiz': return <FileBadge size={18} className="text-orange-600" />;
// //         case 'essay': return <FileText size={18} className="text-indigo-600" />;
// //         case 'poll': return <BarChart3 size={18} className="text-emerald-600" />;
// //         case 'slide': return <Layout size={18} className="text-blue-600" />;
// //         case 'image': return <ImageIcon size={18} className="text-pink-600" />;
// //         case 'upload_doc': return <UploadCloud size={18} className="text-cyan-600" />;
// //         case 'download_doc': return <Download size={18} className="text-green-600" />;
// //         case 'google_classroom': return <School size={18} className="text-yellow-600" />;
// //         case 'audio': return <Mic size={18} className="text-pink-500" />;
// //         case 'embed': return <Globe size={18} className="text-teal-600" />;
// //         case 'flashcard': return <Layers size={18} className="text-orange-500" />;
// //         // [BARU] Icons Games
// //         case 'game_memory': return <Gamepad2 size={18} className="text-violet-600" />;
// //         case 'game_scavenger': return <Camera size={18} className="text-rose-600" />;
// //         case 'game_emoji': return <Smile size={18} className="text-yellow-600" />;
// //         default: return <BookOpen size={18} className="text-slate-500" />;
// //     }
// // };

// // export default function CourseContentEditor({ course, courseId, refreshData, facilitators }: CourseContentEditorProps) {
// //     const [activeEditorTab, setActiveEditorTab] = useState<'curriculum' | 'certificate' | 'grading'>('curriculum');
// //     const fileInputRef = useRef<HTMLInputElement>(null);
// //     const [isUploadingCover, setIsUploadingCover] = useState(false);
    
// //     // --- STATE ---
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
// //     const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);

// //     const [quizDuration, setQuizDuration] = useState(0); 
// //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// //     const [pollQuestion, setPollQuestion] = useState('');
// //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
// //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
    
// //     const [flashcards, setFlashcards] = useState<any[]>([{ front: '', back: '' }]);
// //     const [memoryPairs, setMemoryPairs] = useState<{id: number, text: string, image: string, pairId: string}[]>([]);

// //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// //     const [showPublishDisclaimer, setShowPublishDisclaimer] = useState(false);
// //     const [isDisclaimerChecked, setIsDisclaimerChecked] = useState(false);
// //     const [isPublishing, setIsPublishing] = useState(false);

// //     const [competencies, setCompetencies] = useState<any[]>(course?.competencies || []);
// //     const [includeCompetencies, setIncludeCompetencies] = useState(course?.includeCompetenciesInCertificate ?? true);
// //     const [certConfig, setCertConfig] = useState<any>(course?.certificateConfig || {});
// //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>(
// //         course?.facilitatorIds?.map((f: any) => (typeof f === 'object' ? f._id : f)) || []
// //     );
// //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// //     const [isSavingCert, setIsSavingCert] = useState(false);
// //     const [searchFacilitator, setSearchFacilitator] = useState('');

// //     useEffect(() => {
// //         if (course) {
// //             setCompetencies(course.competencies || []);
// //             setIncludeCompetencies(course.includeCompetenciesInCertificate ?? true);
// //             setCertConfig(course.certificateConfig || {});
// //             if (course.facilitatorIds) setSelectedFacilitatorIds(course.facilitatorIds.map((f: any) => (typeof f === 'object' ? f._id : f)));
// //         }
// //     }, [course]);

// //     const activeTeam = facilitators.filter((u: any) => selectedFacilitatorIds.includes(u._id) || u.role === 'SUPER_ADMIN');
// //     const quillModules = useMemo(() => ({ toolbar: { container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'image', 'video'], [{ 'color': [] }, { 'background': [] }], ['clean']] } }), []);
// //     const getFacilitatorNameLabel = (data: any) => { if (!data) return null; if (typeof data === 'object' && data.name) return data.name; const found = facilitators.find(f => f._id === data || f.id === data); return found ? found.name : 'Unknown'; };

// //     // --- HELPER FUNCTIONS ---
// //     const addPollOption = () => setPollOptions([...pollOptions, '']); 
// //     const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; 
// //     const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); }; 
// //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// //     const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; 
// //     const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); }; 
// //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); 
    
// //     const addFlashcard = () => setFlashcards([...flashcards, { front: '', back: '' }]);
// //     const updateFlashcard = (idx: number, field: 'front' | 'back', val: string) => { const newCards = [...flashcards]; newCards[idx][field] = val; setFlashcards(newCards); };
// //     const removeFlashcard = (idx: number) => { if (flashcards.length > 1) setFlashcards(flashcards.filter((_, i) => i !== idx)); };

// //     const addMemoryPair = () => { const pairId = Date.now().toString(); setMemoryPairs([...memoryPairs, { id: Date.now(), text: '', image: '', pairId }, { id: Date.now() + 1, text: '', image: '', pairId }]); };
// //     const updateMemoryCard = (index: number, val: string) => { const newCards = [...memoryPairs]; newCards[index].text = val; setMemoryPairs(newCards); };
// //     const removeMemoryPair = (idxA: number, idxB: number) => { setMemoryPairs(prev => prev.filter((_, i) => i !== idxA && i !== idxB)); };

// //     const updateEssay = (idx: number, val: string) => { setEssayQuestions(prev => { if (prev[idx] === val) return prev; const newQ = [...prev]; newQ[idx] = val; return newQ; }); }; 
// //     const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };

// //     const calculateModuleJP = (lessons: any[]) => (!lessons) ? 0 : lessons.reduce((acc, curr) => acc + (curr.isActive ? (curr.jp || 0) : 0), 0);

// //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); window.open(url, 'GoogleAuthPopup', `width=500,height=600`); } catch (e) { alert("Gagal Auth Google"); } }; 
// //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } }; 
// //     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const data = await api('/api/classroom/courses', { headers: { 'x-google-token': token } }); if (data.courses) setClassroomCourses(data.courses); } catch (e: any) { if(e.status === 401 || e.message?.includes('401')) { localStorage.removeItem('google_class_token'); setGoogleToken(null); } } finally { setIsCheckingGoogle(false); } };
    
// //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); await apiUpload(`/api/upload/course/${courseId}/cover`, formData); refreshData(); alert("Cover berhasil diperbarui!"); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
// //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); }; 
// //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } };
// //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); setCertConfig(data); alert("Pengaturan Sertifikat Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Kompetensi Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };

// //     const resetLessonForm = () => {
// //         setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesType('lesson'); setLesContent(''); setLesIsMandatory(true); setLesJp(0); setLesSchedule(''); setLesFacilitatorId(''); setSelectedFile(null);
// //         setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(0); setPollQuestion(''); setPollOptions(['', '']); setEssayQuestions(['']); 
// //         setFlashcards([{ front: '', back: '' }]); setMemoryPairs([]); setExistingFileUrl(null); 
// //     };

// //     const resetModuleForm = () => { setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false); };

// //     const handleSaveModule = async () => { 
// //         if (!modTitle.trim()) return alert("Judul modul wajib diisi"); 
// //         const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: modFacilitatorId || null, jp: modJp, scheduleDate: modSchedule || null }; 
// //         try { 
// //             if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); 
// //             else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); 
// //             alert("Modul berhasil disimpan!"); resetModuleForm(); refreshData(); 
// //         } catch(e: any) { alert(e.message); } 
// //     };

// //     const handleSaveLesson = async (modId: string) => { 
// //         if (!lesTitle.trim()) { alert("Judul materi wajib diisi!"); return; } 
// //         let fileUrl = ''; 
// //         if (selectedFile) { try { setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); const res = await apiUpload('/api/upload', fd); fileUrl = res.url || res.file?.url || res.imageUrl; } catch (err) { alert("Gagal upload file!"); return; } finally { setUploading(false); } } else if (editingLesId) { fileUrl = existingFileUrl || ''; } 
        
// //         const body: any = { 
// //             title: lesTitle, type: lesType, isActive: true, isMandatory: lesIsMandatory, 
// //             jp: lesJp, facilitatorId: lesFacilitatorId || null, scheduleDate: lesSchedule || null, 
// //             quizDuration: quizDuration, 
// //             questions: (lesType === 'quiz') ? questions : undefined, 
// //             pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, 
// //             pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, 
// //             classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined 
// //         }; 
        
// //         if (lesType === 'essay' || lesType === 'game_emoji') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; } 
// //         if (lesType === 'flashcard') { body.content = JSON.stringify(flashcards); }
// //         if (lesType === 'game_memory') { body.content = JSON.stringify(memoryPairs); }

// //         if(fileUrl) body.fileUrl = fileUrl; 
// //         if(lesType === 'video_url' || lesType === 'embed') body.videoUrl = lesContent;
// //         else if(lesType === 'virtual_class') { body.meetingLink = lesContent; body.content = lesContent; }
// //         else if(['lesson', 'upload_doc', 'download_doc', 'image', 'slide', 'audio', 'game_scavenger'].includes(lesType)) body.content = lesContent; 
        
// //         try { 
// //             if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); 
// //             else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); 
// //             alert("Materi berhasil disimpan!"); resetLessonForm(); refreshData(); 
// //         } catch(e: any) { alert("Gagal menyimpan: " + e.message); } 
// //     };

// //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); alert("Dihapus!"); refreshData(); };
    
// //     const handleFinalizeContent = async () => {
// //         setIsPublishing(true);
// //         try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: true, status: 'published' } }); alert("✅ Pelatihan BERHASIL DIPUBLIKASIKAN!"); setShowPublishDisclaimer(false); refreshData(); } catch (e: any) { alert("Gagal publish: " + e.message); } finally { setIsPublishing(false); }
// //     };

// //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); alert(newStatus ? "Dipublikasikan!" : "Jadi Draft"); refreshData(); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); refreshData(); } } catch (e: any) { alert(e.message); } };
// //     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); refreshData(); } catch (err) { refreshData(); } };

// //     const handleAddNewContent = (modId: string) => { resetLessonForm(); setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); };
// //     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
    
// //     const startEditLesson = (modId: string, les: any) => { 
// //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title); 
// //         setQuizDuration(les.quizDuration || 0); setExistingFileUrl(les.fileUrl || null);

// //         if (les.type === 'essay' || les.type === 'game_emoji' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { 
// //             setLesType(les.type === 'game_emoji' ? 'game_emoji' : 'essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); 
// //         } else if (les.type === 'embed') { setLesType('embed'); setLesContent(les.videoUrl || '');
// //         } else if (les.type === 'flashcard') { setLesType('flashcard'); try { setFlashcards(JSON.parse(les.content || '[]')); } catch (e) { setFlashcards([{ front: '', back: '' }]); }
// //         } else if (les.type === 'game_memory') { setLesType('game_memory'); try { setMemoryPairs(JSON.parse(les.content || '[]')); } catch (e) { setMemoryPairs([]); }
// //         } else { setLesType(les.type); } 
        
// //         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || '')); 
        
// //         if (les.type === 'video_url') setLesContent(les.videoUrl||''); 
// //         else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); 
// //         else if (['lesson', 'upload_doc', 'download_doc', 'image', 'slide', 'audio', 'game_scavenger'].includes(les.type)) setLesContent(les.content||''); 
        
// //         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); } 
// //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); } 
// //         if (les.type === 'google_classroom') { const token = localStorage.getItem('google_class_token'); if(token) { setGoogleToken(token); fetchClassroomCourses(token); } if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); } 
        
// //         setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150); 
// //     };

// //     const isPublished = course?.isPublished === true;

// //     return (
// //         <div className="animate-in fade-in duration-300 space-y-6 relative">
// //             <div className="flex border-b border-gray-200 overflow-x-auto">
// //                 <button onClick={() => setActiveEditorTab('curriculum')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'curriculum' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Kurikulum"><Layout size={18}/> Kurikulum & Materi</button>
// //                 <button onClick={() => setActiveEditorTab('grading')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'grading' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Skema Penilaian"><Calculator size={18}/> Skema Penilaian</button>
// //                 <button onClick={() => setActiveEditorTab('certificate')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'certificate' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Sertifikat"><Award size={18}/> Sertifikat & Kompetensi</button>
// //             </div>

// //             {activeEditorTab === 'curriculum' && (
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-left-4">
// //                     <div className="md:col-span-1 space-y-6">
// //                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
// //                             {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
// //                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Ganti Cover">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Upload Cover"/></div>
// //                         </div>
// //                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
// //                             <div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" aria-label="Simpan Tim">Simpan</button></div>
// //                             <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">{facilitators.map((user: any) => (<label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}><input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih ${user.name}`} /><div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div></label>))}</div>
// //                             <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" />
// //                         </div>
// //                     </div>

// //                     <div className="md:col-span-2 space-y-6">
// //                         <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">Struktur Modul</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 flex items-center gap-2" aria-label="Tambah Modul">+ Tambah Modul</button></div>
// //                         {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul"/><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" aria-label="JP"/></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih PJ"><option value="">-- Pilih Fasilitator --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal" /></div></div><div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetModuleForm} className="text-sm text-gray-500 font-bold" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold" aria-label="Simpan">Simpan</button></div></form>)}
                        
// //                         <DragDropContext onDragEnd={onDragEnd}>
// //                             <Droppable droppableId="all-modules" type="module">
// //                                 {(provided) => (
// //                                     <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
// //                                             {course?.modules?.map((m: any, idx: number) => {
// //                                                 const cumulativeJp = calculateModuleJP(m.lessons);
// //                                                 return (
// //                                                     <Draggable key={m._id} draggableId={m._id} index={idx}>
// //                                                         {(provided) => (
// //                                                             <div ref={provided.innerRef} {...provided.draggableProps} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm mb-4">
// //                                                                 <div className="bg-slate-50 p-4 flex justify-between items-center border-b border-gray-100" {...provided.dragHandleProps}>
// //                                                                     <div className="flex items-center gap-4">
// //                                                                         <span className="cursor-grab text-gray-400 hover:text-gray-600 transition-colors" aria-label="Drag Modul"><GripVertical size={20} /></span>
// //                                                                         <div className="flex items-center gap-3">
// //                                                                             <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-blue-600 shadow-sm"><Layout size={20} strokeWidth={2.5} /></div>
// //                                                                             <div><span className="font-bold text-gray-800 text-base">{m.title}</span><div className="flex gap-2 text-[10px] mt-1 text-gray-500 font-medium"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{cumulativeJp} JP</span>{m.facilitatorId && <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100 flex items-center gap-1">👤 {getFacilitatorNameLabel(m.facilitatorId)}</span>}{m.scheduleDate && <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded border border-yellow-100 flex items-center gap-1">📅 {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}</div></div>
// //                                                                         </div>
// //                                                                     </div>
// //                                                                     <div className="flex gap-3 items-center">
// //                                                                         <button type="button" onClick={() => startEditModule(m)} className="text-xs text-gray-600 font-bold hover:text-blue-600 bg-white border px-3 py-1.5 rounded-lg shadow-sm" aria-label="Edit">Edit</button>
// //                                                                         <button type="button" onClick={() => toggleStatus(m._id)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${m.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Modul"><span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${m.isActive ? 'translate-x-6' : 'translate-x-1'}`} /></button>
// //                                                                     </div>
// //                                                                 </div>

// //                                                                 <Droppable droppableId={m._id} type="lesson">
// //                                                                     {(provided) => (
// //                                                                         <div ref={provided.innerRef} {...provided.droppableProps} className="p-3 bg-white space-y-2">
// //                                                                             {m.lessons?.map((l: any, lIdx: number) => (
// //                                                                                 <Draggable key={l._id} draggableId={l._id} index={lIdx}>
// //                                                                                     {(provided) => (
// //                                                                                         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`flex justify-between items-center p-3 rounded-lg border transition-all hover:shadow-md ${activeModId === m._id && editingLesId === l._id ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 bg-white hover:border-gray-300'}`}>
// //                                                                                             <div className="flex gap-3 items-center flex-1">
// //                                                                                                 <span className="cursor-grab text-gray-300 hover:text-gray-500"><GripVertical size={16}/></span>
// //                                                                                                 <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">{getLessonIcon(l.type)}</div>
// //                                                                                                 <div className="flex-1"><p className={`text-sm font-bold ${!l.isActive ? 'text-gray-400' : 'text-gray-700'}`}>{l.title}{!l.isActive && <span className="text-[10px] ml-2 italic text-red-400">(Draft)</span>}</p><div className="flex gap-2 items-center flex-wrap mt-1"><span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border uppercase font-bold tracking-wide">{l.type.replace('_', ' ')}</span>{l.quizDuration > 0 && <span className="text-[9px] text-orange-600 flex items-center gap-1 font-medium"><Clock size={10} /> {l.quizDuration}m</span>}{l.jp > 0 && <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 rounded border border-blue-100 font-medium">{l.jp} JP</span>}{l.isMandatory ? <span className="text-[9px] bg-red-50 text-red-700 px-1.5 rounded border border-red-100 font-medium">Wajib</span> : <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 rounded border font-medium">Opsional</span>}</div></div>
// //                                                                                             </div>
// //                                                                                             <div className="flex gap-2 items-center ml-2"><button type="button" onClick={() => startEditLesson(m._id, l)} className="text-gray-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded" title="Edit" aria-label="Edit"><Pencil size={16} /></button><button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-gray-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded" title="Hapus" aria-label="Hapus"><Trash2 size={16} /></button><button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${l.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Lesson"><span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm ${l.isActive ? 'translate-x-4' : 'translate-x-1'}`} /></button></div>
// //                                                                                         </div>
// //                                                                                     )}
// //                                                                                 </Draggable>
// //                                                                             ))}
// //                                                                             {provided.placeholder}
// //                                                                             {activeModId === m._id ? (
// //                                                                                 <div id={`form-${m._id}`} className="bg-blue-50 p-4 rounded border border-blue-200 mt-2 space-y-3">
// //                                                                                     <div className="grid grid-cols-12 gap-2">
// //                                                                                         <div className="col-span-4">
// //                                                                                             <select className="w-full p-2 border rounded text-sm bg-white" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Tipe Konten">
// //                                                                                                 <option value="lesson">📄 Materi Teks</option>
// //                                                                                                 <option value="video_url">🎞️ Video URL (YouTube)</option>
// //                                                                                                 <option value="audio">🎧 Audio / Podcast</option>
// //                                                                                                 <option value="embed">🌐 Smart Embed (PDF/Web)</option>
// //                                                                                                 <option value="flashcard">🃏 Flashcards (Hafalan)</option>
// //                                                                                                 {/* GAMES */}
// //                                                                                                 <option value="game_memory">🎮 Game: Memory Match</option>
// //                                                                                                 <option value="game_scavenger">📸 Game: Misi Foto (Scavenger)</option>
// //                                                                                                 <option value="game_emoji">🤔 Game: Tebak Emoji/Kata</option>
                                                                                                
// //                                                                                                 <option value="slide">🖥️ Slide Presentasi (Lama)</option>
// //                                                                                                 <option value="quiz">📝 Kuis Pilihan Ganda</option>
// //                                                                                                 <option value="essay">✍️ Esai / Uraian</option>
// //                                                                                                 <option value="poll">📊 Polling</option>
// //                                                                                                 <option value="upload_doc">📤 Tugas Upload</option>
// //                                                                                                 <option value="download_doc">📥 Download Dokumen</option>
// //                                                                                                 <option value="image">🖼️ Gambar</option>
// //                                                                                                 <option value="virtual_class">🎥 Kelas Virtual (Zoom)</option>
// //                                                                                                 <option value="google_classroom">🏫 Google Classroom</option>
// //                                                                                             </select>
// //                                                                                         </div>
// //                                                                                         <div className="col-span-6 flex gap-1">
// //                                                                                             <input className="w-full p-2 border rounded text-sm" placeholder="Judul Materi..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi"/>
// //                                                                                             <button type="button" className="bg-purple-100 text-purple-600 px-3 rounded hover:bg-purple-200 flex items-center gap-1 text-xs font-bold" title="Generate with AI (Coming Soon)" onClick={() => alert("Fitur AI Generator akan segera hadir!")} aria-label="Generate AI"><Zap size={14} /> AI</button>
// //                                                                                         </div>
// //                                                                                         <div className="col-span-2"><input type="number" className="w-full p-2 border rounded text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="JP"/></div>
// //                                                                                     </div>
                                                                                    
// //                                                                                     <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded border border-yellow-200"><Clock size={18} className="text-yellow-700"/><div className="flex items-center gap-2 text-sm text-yellow-800"><span className="font-bold">Durasi Timer (Opsional):</span><input type="number" min="0" className="w-20 p-1 border border-yellow-400 rounded text-center font-bold bg-white" value={quizDuration} onChange={(e) => setQuizDuration(Number(e.target.value))} placeholder="0" aria-label="Durasi Timer"/><span>menit (0 = Tidak ada batas)</span></div></div>
// //                                                                                     <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded border border-blue-100"><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Fasilitator (Opsional)</label><select className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesFacilitatorId} onChange={e=>setLesFacilitatorId(e.target.value)} aria-label="Pilih Fasilitator"><option value="">-- Ikut Modul --</option>{activeTeam.map((f:any)=><option key={f._id} value={f._id}>{f.name}</option>)}</select></div><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesSchedule} onChange={e=>setLesSchedule(e.target.value)} aria-label="Tanggal" /></div><div className="flex items-center h-full pt-4"><label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e=>setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib"/> Wajib diselesaikan?</label></div></div>
                                                                                    
// //                                                                                     {/* LOGIC FORM BARU UNTUK GAMES & CONTENT */}
// //                                                                                     {['lesson', 'upload_doc', 'game_scavenger'].includes(lesType) && (
// //                                                                                         <div className="bg-white rounded border">
// //                                                                                             {lesType === 'game_scavenger' && <div className="p-2 bg-rose-50 text-rose-700 text-xs font-bold border-b border-rose-100">Tuliskan instruksi misi foto di bawah ini (Contoh: "Foto selfie dengan kotak P3K!")</div>}
// //                                                                                             <ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-48 mb-12" placeholder="Tulis materi/instruksi..."/>
// //                                                                                         </div>
// //                                                                                     )}

// //                                                                                     {(lesType === 'essay' || lesType === 'game_emoji') && (<div className="bg-white p-3 rounded border">{lesType === 'game_emoji' && <div className="mb-4 bg-yellow-50 p-3 rounded border border-yellow-200 text-xs text-yellow-800"><strong>Cara Buat Tebak Emoji:</strong><br/>Masukkan Emoji di kolom pertanyaan, dan kunci jawaban di kolom instruksi atau biarkan terbuka.</div>}<div className="mb-2"><label className="text-xs font-bold text-gray-500">Instruksi Soal:</label><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-32 mb-10"/></div>{essayQuestions.map((q, ix) => (<div key={ix} className="flex gap-2 mb-4 items-start"><div className="flex-1"><ReactQuill theme="snow" value={q} onChange={(val) => updateEssay(ix, val)} modules={quillModules} placeholder={lesType === 'game_emoji' ? 'Masukkan EMOJI soal disini...' : `Pertanyaan ${ix + 1}`} className="h-24 mb-10 bg-white"/></div>{essayQuestions.length > 1 && (<button type="button" onClick={()=>removeEssay(ix)} className="text-red-500 font-bold p-2 bg-red-50 rounded hover:bg-red-100" aria-label="Hapus"><Trash2 size={16} /></button>)}</div>))}<button type="button" onClick={addEssayRow} className="text-xs text-blue-600 font-bold flex items-center gap-1 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50" aria-label="Tambah Tanya"><Plus size={14} /> Tambah Pertanyaan</button></div>)}
                                                                                    
// //                                                                                     {/* Memory Game Form */}
// //                                                                                     {lesType === 'game_memory' && (
// //                                                                                         <div className="bg-violet-50 p-4 rounded-xl border border-violet-200">
// //                                                                                             <div className="flex justify-between items-center mb-4"><h4 className="font-bold text-violet-900 flex items-center gap-2 text-sm"><Gamepad2 size={16}/> Konfigurasi Memory Game</h4><button type="button" onClick={addMemoryPair} className="text-xs bg-violet-600 text-white px-3 py-1.5 rounded-lg hover:bg-violet-700 font-bold">+ Tambah Pasangan</button></div>
// //                                                                                             <div className="space-y-3">{memoryPairs.map((card, idx) => (idx % 2 === 0 ? (<div key={idx} className="flex gap-3 items-center bg-white p-3 rounded-lg border border-violet-100 shadow-sm relative"><div className="flex-1"><label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Kartu A</label><input type="text" className="w-full border-b border-gray-300 focus:border-violet-500 outline-none py-1 text-sm font-medium" value={memoryPairs[idx].text} onChange={(e) => updateMemoryCard(idx, e.target.value)} placeholder="Teks Kartu 1"/></div><div className="text-violet-300 font-bold mx-1">=</div><div className="flex-1"><label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Kartu B</label><input type="text" className="w-full border-b border-gray-300 focus:border-violet-500 outline-none py-1 text-sm font-medium" value={memoryPairs[idx+1]?.text || ''} onChange={(e) => updateMemoryCard(idx+1, e.target.value)} placeholder="Teks Kartu 2"/></div><button type="button" onClick={() => removeMemoryPair(idx, idx+1)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-full transition-colors ml-1" title="Hapus Pasangan"><Trash2 size={14}/></button></div>) : null))}</div>{memoryPairs.length === 0 && (<div className="text-center py-6 text-gray-400 text-xs italic border-2 border-dashed border-violet-100 rounded-lg">Belum ada kartu. Klik "Tambah Pasangan".</div>)}
// //                                                                                         </div>
// //                                                                                     )}

// //                                                                                     {lesType === 'quiz' && (<div className="bg-white p-3 rounded border">{questions.map((q, ix) => (<div key={ix} className="p-2 border rounded bg-gray-50 mb-2 relative"><button type="button" onClick={()=>removeQuestion(ix)} className="absolute top-1 right-1 text-red-500 font-bold text-xs" aria-label="Hapus Soal">x</button><input className="w-full p-1 border rounded mb-1 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e=>updateQuestion(ix, 'question', e.target.value)} aria-label={`Pertanyaan ${ix+1}`}/><div className="grid grid-cols-2 gap-2">{q.options.map((o:string, oi:number) => <input key={oi} className={`w-full p-1 border text-xs ${q.correctIndex===oi?'bg-green-100 border-green-300':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix, 'options', e.target.value, oi)} aria-label={`Opsi ${oi+1}`}/>)}</div><div className="mt-1 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix, 'correctIndex', Number(e.target.value))} className="w-10 border" aria-label="Jawaban Benar"/></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}
// //                                                                                     {lesType === 'poll' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} aria-label="Tanya Polling"/>{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2 mb-1"><input className="flex-1 p-1 border rounded text-xs" value={opt} onChange={e=>updatePollOption(idx, e.target.value)} placeholder={`Opsi ${idx+1}`} aria-label={`Opsi ${idx+1}`}/>{pollOptions.length > 2 && <button onClick={()=>removePollOption(idx)} className="text-red-500 font-bold" aria-label="Hapus">x</button>}</div>))}<button type="button" onClick={addPollOption} className="text-xs text-blue-600 font-bold" aria-label="Tambah Opsi">+ Opsi</button></div>)}
// //                                                                                     {lesType === 'flashcard' && (<div className="bg-white p-3 rounded border"><div className="text-xs text-gray-500 mb-2">Buat kartu hafalan (Depan: Pertanyaan/Istilah, Belakang: Jawaban/Definisi)</div>{flashcards.map((card, idx) => (<div key={idx} className="flex gap-2 mb-2 p-2 bg-gray-50 rounded border items-start"><span className="text-xs font-bold text-gray-400 mt-2">#{idx+1}</span><div className="flex-1 space-y-2"><input className="w-full p-2 border rounded text-xs" placeholder="Sisi Depan (Pertanyaan)" value={card.front} onChange={e => updateFlashcard(idx, 'front', e.target.value)} aria-label={`Flashcard Depan ${idx+1}`} /><input className="w-full p-2 border rounded text-xs" placeholder="Sisi Belakang (Jawaban)" value={card.back} onChange={e => updateFlashcard(idx, 'back', e.target.value)} aria-label={`Flashcard Belakang ${idx+1}`} /></div><button type="button" onClick={() => removeFlashcard(idx)} className="text-red-500 hover:bg-red-100 p-1 rounded" title="Hapus Kartu"><Trash size={16}/></button></div>))}<button type="button" onClick={addFlashcard} className="text-xs text-blue-600 font-bold flex items-center gap-1 mt-2" aria-label="Tambah Flashcard"><Plus size={14}/> Tambah Kartu</button></div>)}
                                                                                    
// //                                                                                     {lesType === 'video_url' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link YouTube..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Video"/>{lesContent && (<div className="bg-gray-100 p-2 rounded text-xs text-gray-500 flex items-center gap-2"><Video size={14}/> <span className="truncate flex-1">{lesContent}</span><span className="bg-green-100 text-green-700 px-1.5 rounded">Tersimpan</span></div>)}</div>)}
// //                                                                                     {lesType === 'audio' && (<div className="bg-white p-4 rounded border border-pink-200 space-y-3"><label className="block text-xs font-bold text-gray-600">Upload File Audio (MP3/WAV)</label><div className="flex gap-2 items-center"><input type="file" accept="audio/*" onChange={e => setSelectedFile(e.target.files?.[0] || null)} className="text-sm w-full border p-2 rounded" aria-label="Upload Audio"/></div>{existingFileUrl && !selectedFile && (<div className="bg-pink-50 p-2 rounded flex items-center gap-2 text-xs text-pink-700"><Mic size={14}/> <span>Audio tersimpan: </span><a href={getImageUrl(existingFileUrl)} target="_blank" className="underline font-bold">Dengar Preview</a></div>)}<div className="mt-2"><label className="block text-xs font-bold text-gray-600 mb-1">Deskripsi / Transkrip (Opsional)</label><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-24 mb-10 bg-white"/></div></div>)}
// //                                                                                     {lesType === 'embed' && (<div className="bg-white p-4 rounded border border-teal-200 space-y-3"><div className="bg-teal-50 p-3 rounded text-xs text-teal-800 mb-2"><strong>Tips:</strong> Masukkan URL Google Drive (Public), Spotify Embed, Canva Embed, atau link PDF langsung.</div><input className="w-full p-2 border rounded text-sm" placeholder="Paste URL Embed disini..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="URL Embed"/>{lesContent && (<div className="aspect-video bg-gray-100 rounded border overflow-hidden relative"><p className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs z-0">Preview Area</p><iframe src={lesContent} className="w-full h-full relative z-10" title="Preview Embed" /></div>)}</div>)}
// //                                                                                     {lesType === 'virtual_class' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link Zoom/Meet..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Zoom"/>{lesContent && (<a href={lesContent} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:underline bg-blue-50 p-2 rounded border border-blue-100"><ExternalLink size={14} /> <span className="truncate">Coba Link: {lesContent}</span></a>)}</div>)}
// //                                                                                     {['image','upload_doc','slide','download_doc'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File (Gambar/Dokumen)</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Upload File"/>{existingFileUrl && !selectedFile && (<div className="mt-2 flex items-center gap-3 bg-gray-50 p-2 rounded border border-gray-200">{lesType === 'image' ? (<img src={getImageUrl(existingFileUrl)} alt="Preview" className="h-12 w-12 object-cover rounded border" />) : (<FileText className="text-gray-400" size={24} />)}<div className="flex-1 overflow-hidden"><div className="text-xs font-bold text-gray-600">File Tersimpan</div><a href={getImageUrl(existingFileUrl)} target="_blank" className="text-[10px] text-blue-600 truncate block hover:underline">{existingFileUrl.split('/').pop()}</a></div></div>)}</div>)}
// //                                                                                     {lesType === 'google_classroom' && (<div className="bg-white p-4 rounded border border-green-200 space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Class"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putus Akun"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}</div>)}

// //                                                                                     <div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetLessonForm} className="text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" aria-label="Simpan Materi">Simpan Materi</button></div>
// //                                                                                 </div>
// //                                                                             ) : (
// //                                                                                 <button type="button" onClick={() => { handleAddNewContent(m._id) }} className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-400 font-bold hover:border-blue-300 hover:text-blue-600 mt-2 transition-colors flex items-center justify-center gap-2" aria-label="Tambah Konten"><Plus size={16}/> Tambah Konten</button>
// //                                                                             )}
// //                                                                         </div>
// //                                                                     )}
// //                                                                 </Droppable>
// //                                                             </div>
// //                                                         )}
// //                                                     </Draggable>
// //                                                 );
// //                                             })}
// //                                             {provided.placeholder}
// //                                     </div>
// //                                 )}
// //                             </Droppable>
// //                         </DragDropContext>
// //                     </div>
// //                 </div>
// //             )}

// //             {activeEditorTab === 'grading' && <GradingSchemeForm key={`grading-${courseId}`} courseId={courseId} modules={course.modules} refreshData={refreshData} facilitators={facilitators} />}
// //             {activeEditorTab === 'certificate' && <div className="space-y-8 animate-in slide-in-from-right-4"><div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"><h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">1. Unit Kompetensi</h2><CompetencyForm key={`comp-${courseId}`} initialData={competencies} onChange={(data) => setCompetencies(data)} /><div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200"><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={includeCompetencies} onChange={e=>setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Tampilkan Kompetensi"/><span className="text-sm font-bold text-gray-700">Tampilkan daftar kompetensi di halaman belakang sertifikat?</span></label><button type="button" onClick={handleSaveCompetencies} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button></div></div><div><h2 className="text-xl font-bold text-gray-800 mb-4 px-2">2. Pengaturan Sertifikat</h2><CertificateConfigForm key={`cert-${courseId}`} initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} courseTitle={course?.title || 'Judul Pelatihan'} /></div></div>}
            
// //             <div className="bg-white p-8 rounded-[32px] border border-gray-200 text-center flex flex-col items-center justify-center gap-4 mt-12 shadow-lg relative overflow-hidden">
// //                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>
// //                 {!isPublished ? (
// //                     <><div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2"><Rocket size={32} /></div><h3 className="text-2xl font-black text-gray-900">Publikasi Pelatihan</h3><p className="text-gray-500 max-w-lg">Pastikan seluruh modul, materi, kuis, dan pengaturan sertifikat sudah lengkap sebelum mempublikasikan pelatihan ini.</p><button type="button" onClick={() => { setIsDisclaimerChecked(false); setShowPublishDisclaimer(true); }} className="px-10 py-4 rounded-2xl font-black text-white shadow-xl bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-3 uppercase tracking-wider text-sm mt-2" aria-label="Publish Sekarang"><UploadCloud size={20}/> PUBLISH SEKARANG</button></>
// //                 ) : (
// //                     <div className="flex flex-col items-center animate-in zoom-in"><div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 shadow-inner"><CheckCircle2 size={40}/></div><h3 className="text-2xl font-black text-green-800">Pelatihan Sedang Live</h3><p className="text-green-600 font-medium mt-1">Peserta sudah dapat mengakses materi ini.</p><button onClick={() => toggleStatus()} className="mt-6 text-xs text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-lg border border-red-100">Tarik Kembali (Unpublish)</button></div>
// //                 )}
// //             </div>

// //             {showPublishDisclaimer && (
// //                 <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
// //                     <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 relative animate-in zoom-in-95">
// //                         <button type="button" onClick={() => setShowPublishDisclaimer(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-400" aria-label="Tutup"><X size={20}/></button>
// //                         <div className="flex flex-col items-center text-center space-y-4"><div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"><ShieldCheck size={32}/></div><h3 className="text-xl font-bold text-gray-900">Konfirmasi Publikasi</h3><p className="text-sm text-gray-500 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">"Saya menyatakan bahwa materi pelatihan ini telah disusun dengan benar, tidak melanggar hak cipta, dan siap untuk dipublikasikan kepada peserta."</p><label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-blue-50 rounded-xl transition-colors w-full border border-gray-200"><input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" checked={isDisclaimerChecked} onChange={(e) => setIsDisclaimerChecked(e.target.checked)}/><span className="font-bold text-sm text-gray-700">Saya Setuju & Bertanggung Jawab</span></label><button onClick={handleFinalizeContent} disabled={!isDisclaimerChecked || isPublishing} className="w-full py-4 rounded-xl bg-green-600 text-white font-bold shadow-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2">{isPublishing ? 'Memproses...' : '🚀 YA, PUBLISH PELATIHAN'}</button></div>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }

// 'use client';

// import { useState, useRef, useMemo, useEffect } from 'react';
// import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// import { api, apiUpload, getImageUrl } from '@/lib/api';
// import CompetencyForm from '@/components/admin/CompetencyForm';
// import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// import GradingSchemeForm from '@/components/admin/GradingSchemeForm'; 
// import {
//     Calendar, School, RefreshCw, LogOut, CheckCircle2, 
//     Link as LinkIcon, Users, FileText, Download,
//     FileBadge, MapPin, UserCheck, Hash, BarChart3, 
//     BookOpen, Trash2, Plus, Video, Image as ImageIcon,
//     Award, Layout, Clock, ExternalLink, Calculator,
//     MonitorPlay, UploadCloud, GripVertical, Pencil, MessageSquare,
//     Rocket, ShieldCheck, X, Bell, CheckCircle,
//     Mic, Globe, Zap, Layers, Trash, Gamepad2, Camera, Smile 
// } from 'lucide-react';

// import dynamic from 'next/dynamic';
// import 'react-quill/dist/quill.snow.css'; 

// // Import Emoji Picker
// import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';

// const ReactQuill = dynamic(() => import('react-quill'), { 
//     ssr: false,
//     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// });

// interface CourseContentEditorProps {
//     course: any;
//     courseId: string;
//     refreshData: () => void;
//     facilitators: any[]; 
// }

// const getLessonIcon = (type: string) => {
//     switch (type) {
//         case 'video_url': return <Video size={18} className="text-red-600" />;
//         case 'virtual_class': return <MonitorPlay size={18} className="text-purple-600" />;
//         case 'quiz': return <FileBadge size={18} className="text-orange-600" />;
//         case 'essay': return <FileText size={18} className="text-indigo-600" />;
//         case 'poll': return <BarChart3 size={18} className="text-emerald-600" />;
//         case 'slide': return <Layout size={18} className="text-blue-600" />;
//         case 'image': return <ImageIcon size={18} className="text-pink-600" />;
//         case 'upload_doc': return <UploadCloud size={18} className="text-cyan-600" />;
//         case 'download_doc': return <Download size={18} className="text-green-600" />;
//         case 'google_classroom': return <School size={18} className="text-yellow-600" />;
//         case 'audio': return <Mic size={18} className="text-pink-500" />;
//         case 'embed': return <Globe size={18} className="text-teal-600" />;
//         case 'flashcard': return <Layers size={18} className="text-orange-500" />;
//         case 'game_memory': return <Gamepad2 size={18} className="text-violet-600" />;
//         case 'game_scavenger': return <Camera size={18} className="text-rose-600" />;
//         case 'game_emoji': return <Smile size={18} className="text-yellow-600" />;
//         default: return <BookOpen size={18} className="text-slate-500" />;
//     }
// };

// export default function CourseContentEditor({ course, courseId, refreshData, facilitators }: CourseContentEditorProps) {
//     const [activeEditorTab, setActiveEditorTab] = useState<'curriculum' | 'certificate' | 'grading'>('curriculum');
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const [isUploadingCover, setIsUploadingCover] = useState(false);
    
//     // --- STATE ---
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
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [uploading, setUploading] = useState(false);
//     const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);

//     const [quizDuration, setQuizDuration] = useState(0); 
//     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
//     const [pollQuestion, setPollQuestion] = useState('');
//     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
//     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
    
//     const [flashcards, setFlashcards] = useState<any[]>([{ front: '', back: '' }]);
//     const [memoryPairs, setMemoryPairs] = useState<{id: number, text: string, image: string, pairId: string}[]>([]);

//     // State untuk Emoji Picker
//     const [activeEmojiIndex, setActiveEmojiIndex] = useState<number | null>(null);

//     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
//     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
//     const [googleToken, setGoogleToken] = useState<string | null>(null);
//     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

//     const [showPublishDisclaimer, setShowPublishDisclaimer] = useState(false);
//     const [isDisclaimerChecked, setIsDisclaimerChecked] = useState(false);
//     const [isPublishing, setIsPublishing] = useState(false);

//     const [competencies, setCompetencies] = useState<any[]>(course?.competencies || []);
//     const [includeCompetencies, setIncludeCompetencies] = useState(course?.includeCompetenciesInCertificate ?? true);
//     const [certConfig, setCertConfig] = useState<any>(course?.certificateConfig || {});
//     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>(
//         course?.facilitatorIds?.map((f: any) => (typeof f === 'object' ? f._id : f)) || []
//     );
//     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
//     const [isSavingCert, setIsSavingCert] = useState(false);
//     const [searchFacilitator, setSearchFacilitator] = useState('');

//     useEffect(() => {
//         if (course) {
//             setCompetencies(course.competencies || []);
//             setIncludeCompetencies(course.includeCompetenciesInCertificate ?? true);
//             setCertConfig(course.certificateConfig || {});
//             if (course.facilitatorIds) setSelectedFacilitatorIds(course.facilitatorIds.map((f: any) => (typeof f === 'object' ? f._id : f)));
//         }
//     }, [course]);

//     const activeTeam = facilitators.filter((u: any) => selectedFacilitatorIds.includes(u._id) || u.role === 'SUPER_ADMIN');
//     const quillModules = useMemo(() => ({ toolbar: { container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'image', 'video'], [{ 'color': [] }, { 'background': [] }], ['clean']] } }), []);
//     const getFacilitatorNameLabel = (data: any) => { if (!data) return null; if (typeof data === 'object' && data.name) return data.name; const found = facilitators.find(f => f._id === data || f.id === data); return found ? found.name : 'Unknown'; };

//     // --- HELPER FUNCTIONS ---
//     const addPollOption = () => setPollOptions([...pollOptions, '']); 
//     const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; 
//     const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); }; 
//     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
//     const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; 
//     const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); }; 
//     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); 
    
//     const addFlashcard = () => setFlashcards([...flashcards, { front: '', back: '' }]);
//     const updateFlashcard = (idx: number, field: 'front' | 'back', val: string) => { const newCards = [...flashcards]; newCards[idx][field] = val; setFlashcards(newCards); };
//     const removeFlashcard = (idx: number) => { if (flashcards.length > 1) setFlashcards(flashcards.filter((_, i) => i !== idx)); };

//     const addMemoryPair = () => { const pairId = Date.now().toString(); setMemoryPairs([...memoryPairs, { id: Date.now(), text: '', image: '', pairId }, { id: Date.now() + 1, text: '', image: '', pairId }]); };
//     const updateMemoryCard = (index: number, val: string) => { const newCards = [...memoryPairs]; newCards[index].text = val; setMemoryPairs(newCards); };
//     const removeMemoryPair = (idxA: number, idxB: number) => { setMemoryPairs(prev => prev.filter((_, i) => i !== idxA && i !== idxB)); };

//     // [FIX] Update Essay Logic
//     const updateEssay = (idx: number, val: string) => { 
//         setEssayQuestions(prev => { 
//             const newQ = [...prev]; 
//             newQ[idx] = val; 
//             return newQ; 
//         }); 
//     }; 
    
//     const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };

//     // [FIX] Handle Emoji Click
//     const handleEmojiClick = (emojiData: EmojiClickData) => {
//         if (activeEmojiIndex !== null) {
//             const currentVal = essayQuestions[activeEmojiIndex] || '';
//             const newVal = currentVal + emojiData.emoji;
//             updateEssay(activeEmojiIndex, newVal);
//             // Kita TIDAK menutup picker agar user bisa pilih banyak emoji sekaligus
//         }
//     };

//     const calculateModuleJP = (lessons: any[]) => (!lessons) ? 0 : lessons.reduce((acc, curr) => acc + (curr.isActive ? (curr.jp || 0) : 0), 0);

//     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); window.open(url, 'GoogleAuthPopup', `width=500,height=600`); } catch (e) { alert("Gagal Auth Google"); } }; 
//     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } }; 
//     const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const data = await api('/api/classroom/courses', { headers: { 'x-google-token': token } }); if (data.courses) setClassroomCourses(data.courses); } catch (e: any) { if(e.status === 401 || e.message?.includes('401')) { localStorage.removeItem('google_class_token'); setGoogleToken(null); } } finally { setIsCheckingGoogle(false); } };
    
//     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); await apiUpload(`/api/upload/course/${courseId}/cover`, formData); refreshData(); alert("Cover berhasil diperbarui!"); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
    
//     // Gunakan PATCH untuk update
//     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); }; 
//     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PATCH', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } };
//     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PATCH', body: { certificateConfig: data } }); setCertConfig(data); alert("Pengaturan Sertifikat Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
//     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PATCH', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Kompetensi Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };

//     const resetLessonForm = () => {
//         setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesType('lesson'); setLesContent(''); setLesIsMandatory(true); setLesJp(0); setLesSchedule(''); setLesFacilitatorId(''); setSelectedFile(null);
//         setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(0); setPollQuestion(''); setPollOptions(['', '']); setEssayQuestions(['']); 
//         setFlashcards([{ front: '', back: '' }]); setMemoryPairs([]); setExistingFileUrl(null); setExistingFileUrl(null);
//         setActiveEmojiIndex(null); 
//     };

//     const resetModuleForm = () => { setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false); };

//     const handleSaveModule = async () => { 
//         if (!modTitle.trim()) return alert("Judul modul wajib diisi"); 
//         const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: modFacilitatorId || null, jp: modJp, scheduleDate: modSchedule || null }; 
//         try { 
//             if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PATCH', body }); 
//             else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); 
//             alert("Modul berhasil disimpan!"); resetModuleForm(); refreshData(); 
//         } catch(e: any) { alert(e.message); } 
//     };

//     const handleSaveLesson = async (modId: string) => { 
//         if (!lesTitle.trim()) { alert("Judul materi wajib diisi!"); return; } 
//         let fileUrl = ''; 
//         if (selectedFile) { try { setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); const res = await apiUpload('/api/upload', fd); fileUrl = res.url || res.file?.url || res.imageUrl; } catch (err) { alert("Gagal upload file!"); return; } finally { setUploading(false); } } else if (editingLesId) { fileUrl = existingFileUrl || ''; } 
        
//         const body: any = { 
//             title: lesTitle, type: lesType, isActive: true, isMandatory: lesIsMandatory, 
//             jp: lesJp, facilitatorId: lesFacilitatorId || null, scheduleDate: lesSchedule || null, 
//             quizDuration: quizDuration, 
//             questions: (lesType === 'quiz') ? questions : undefined, 
//             pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, 
//             pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, 
//             classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined 
//         }; 
        
//         if (lesType === 'essay' || lesType === 'game_emoji') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; } 
//         if (lesType === 'flashcard') { body.content = JSON.stringify(flashcards); }
//         if (lesType === 'game_memory') { body.content = JSON.stringify(memoryPairs); }

//         if(fileUrl) body.fileUrl = fileUrl; 
//         if(lesType === 'video_url' || lesType === 'embed') body.videoUrl = lesContent;
//         else if(lesType === 'virtual_class') { body.meetingLink = lesContent; body.content = lesContent; }
//         else if(['lesson', 'upload_doc', 'download_doc', 'image', 'slide', 'audio', 'game_scavenger'].includes(lesType)) body.content = lesContent; 
        
//         try { 
//             if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PATCH', body }); 
//             else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); 
//             alert("Materi berhasil disimpan!"); resetLessonForm(); refreshData(); 
//         } catch(e: any) { alert("Gagal menyimpan: " + e.message); } 
//     };

//     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); alert("Dihapus!"); refreshData(); };
    
//     const handleFinalizeContent = async () => {
//         setIsPublishing(true);
//         try { await api(`/api/courses/${courseId}`, { method: 'PATCH', body: { isPublished: true, status: 'published' } }); alert("✅ Pelatihan BERHASIL DIPUBLIKASIKAN!"); setShowPublishDisclaimer(false); refreshData(); } catch (e: any) { alert("Gagal publish: " + e.message); } finally { setIsPublishing(false); }
//     };

//     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PATCH', body: { isPublished: newStatus } }); alert(newStatus ? "Dipublikasikan!" : "Jadi Draft"); refreshData(); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); refreshData(); } } catch (e: any) { alert(e.message); } };
//     const onDragEnd = async (result: DropResult) => { const { source, destination, type } = result; if (!destination) return; const newCourse = JSON.parse(JSON.stringify(course)); if (type === 'module') { const [removed] = newCourse.modules.splice(source.index, 1); newCourse.modules.splice(destination.index, 0, removed); } else if (type === 'lesson') { const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); if (sourceModIdx === -1 || destModIdx === -1) return; const sourceLessons = newCourse.modules[sourceModIdx].lessons; const [removed] = sourceLessons.splice(source.index, 1); newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); } try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); refreshData(); } catch (err) { refreshData(); } };

//     const handleAddNewContent = (modId: string) => { resetLessonForm(); setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); };
//     const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
    
//     const startEditLesson = (modId: string, les: any) => { 
//         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title); 
//         setQuizDuration(les.quizDuration || 0); setExistingFileUrl(les.fileUrl || null);

//         if (les.type === 'essay' || les.type === 'game_emoji' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { 
//             setLesType(les.type === 'game_emoji' ? 'game_emoji' : 'essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); 
//         } else if (les.type === 'embed') { setLesType('embed'); setLesContent(les.videoUrl || '');
//         } else if (les.type === 'flashcard') { setLesType('flashcard'); try { setFlashcards(JSON.parse(les.content || '[]')); } catch (e) { setFlashcards([{ front: '', back: '' }]); }
//         } else if (les.type === 'game_memory') { setLesType('game_memory'); try { setMemoryPairs(JSON.parse(les.content || '[]')); } catch (e) { setMemoryPairs([]); }
//         } else { setLesType(les.type); } 
        
//         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || '')); 
        
//         if (les.type === 'video_url') setLesContent(les.videoUrl||''); 
//         else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); 
//         else if (['lesson', 'upload_doc', 'download_doc', 'image', 'slide', 'audio', 'game_scavenger'].includes(les.type)) setLesContent(les.content||''); 
        
//         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); } 
//         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); } 
//         if (les.type === 'google_classroom') { const token = localStorage.getItem('google_class_token'); if(token) { setGoogleToken(token); fetchClassroomCourses(token); } if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); } 
        
//         setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150); 
//     };

//     const isPublished = course?.isPublished === true;

//     return (
//         <div className="animate-in fade-in duration-300 space-y-6 relative">
//             <div className="flex border-b border-gray-200 overflow-x-auto">
//                 <button onClick={() => setActiveEditorTab('curriculum')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'curriculum' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Kurikulum"><Layout size={18}/> Kurikulum & Materi</button>
//                 <button onClick={() => setActiveEditorTab('grading')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'grading' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Skema Penilaian"><Calculator size={18}/> Skema Penilaian</button>
//                 <button onClick={() => setActiveEditorTab('certificate')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'certificate' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Sertifikat"><Award size={18}/> Sertifikat & Kompetensi</button>
//             </div>

//             {activeEditorTab === 'curriculum' && (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-left-4">
//                     <div className="md:col-span-1 space-y-6">
//                         <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
//                             {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
//                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Ganti Cover">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Upload Cover"/></div>
//                         </div>
//                         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
//                             <div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" aria-label="Simpan Tim">Simpan</button></div>
//                             <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">{facilitators.map((user: any) => (<label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}><input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih ${user.name}`} /><div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div></label>))}</div>
//                             <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" />
//                         </div>
//                     </div>

//                     <div className="md:col-span-2 space-y-6">
//                         <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">Struktur Modul</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 flex items-center gap-2" aria-label="Tambah Modul">+ Tambah Modul</button></div>
//                         {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul"/><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" aria-label="JP"/></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih PJ"><option value="">-- Pilih Fasilitator --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal" /></div></div><div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetModuleForm} className="text-sm text-gray-500 font-bold" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold" aria-label="Simpan">Simpan</button></div></form>)}
                        
//                         <DragDropContext onDragEnd={onDragEnd}>
//                             <Droppable droppableId="all-modules" type="module">
//                                 {(provided) => (
//                                     <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
//                                             {course?.modules?.map((m: any, idx: number) => {
//                                                 const cumulativeJp = calculateModuleJP(m.lessons);
//                                                 return (
//                                                     <Draggable key={m._id} draggableId={m._id} index={idx}>
//                                                         {(provided) => (
//                                                             <div ref={provided.innerRef} {...provided.draggableProps} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm mb-4">
//                                                                 <div className="bg-slate-50 p-4 flex justify-between items-center border-b border-gray-100" {...provided.dragHandleProps}>
//                                                                     <div className="flex items-center gap-4">
//                                                                         <span className="cursor-grab text-gray-400 hover:text-gray-600 transition-colors" aria-label="Drag Modul"><GripVertical size={20} /></span>
//                                                                         <div className="flex items-center gap-3">
//                                                                             <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-blue-600 shadow-sm"><Layout size={20} strokeWidth={2.5} /></div>
//                                                                             <div><span className="font-bold text-gray-800 text-base">{m.title}</span><div className="flex gap-2 text-[10px] mt-1 text-gray-500 font-medium"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{cumulativeJp} JP</span>{m.facilitatorId && <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100 flex items-center gap-1">👤 {getFacilitatorNameLabel(m.facilitatorId)}</span>}{m.scheduleDate && <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded border border-yellow-100 flex items-center gap-1">📅 {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}</div></div>
//                                                                         </div>
//                                                                     </div>
//                                                                     <div className="flex gap-3 items-center">
//                                                                         <button type="button" onClick={() => startEditModule(m)} className="text-xs text-gray-600 font-bold hover:text-blue-600 bg-white border px-3 py-1.5 rounded-lg shadow-sm" aria-label="Edit">Edit</button>
//                                                                         <button type="button" onClick={() => toggleStatus(m._id)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${m.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Modul"><span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${m.isActive ? 'translate-x-6' : 'translate-x-1'}`} /></button>
//                                                                     </div>
//                                                                 </div>

//                                                                 <Droppable droppableId={m._id} type="lesson">
//                                                                     {(provided) => (
//                                                                         <div ref={provided.innerRef} {...provided.droppableProps} className="p-3 bg-white space-y-2">
//                                                                             {m.lessons?.map((l: any, lIdx: number) => (
//                                                                                 <Draggable key={l._id} draggableId={l._id} index={lIdx}>
//                                                                                     {(provided) => (
//                                                                                         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`flex justify-between items-center p-3 rounded-lg border transition-all hover:shadow-md ${activeModId === m._id && editingLesId === l._id ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 bg-white hover:border-gray-300'}`}>
//                                                                                             <div className="flex gap-3 items-center flex-1">
//                                                                                                 <span className="cursor-grab text-gray-300 hover:text-gray-500"><GripVertical size={16}/></span>
//                                                                                                 <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">{getLessonIcon(l.type)}</div>
//                                                                                                 <div className="flex-1"><p className={`text-sm font-bold ${!l.isActive ? 'text-gray-400' : 'text-gray-700'}`}>{l.title}{!l.isActive && <span className="text-[10px] ml-2 italic text-red-400">(Draft)</span>}</p><div className="flex gap-2 items-center flex-wrap mt-1"><span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border uppercase font-bold tracking-wide">{l.type.replace('_', ' ')}</span>{l.quizDuration > 0 && <span className="text-[9px] text-orange-600 flex items-center gap-1 font-medium"><Clock size={10} /> {l.quizDuration}m</span>}{l.jp > 0 && <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 rounded border border-blue-100 font-medium">{l.jp} JP</span>}{l.isMandatory ? <span className="text-[9px] bg-red-50 text-red-700 px-1.5 rounded border border-red-100 font-medium">Wajib</span> : <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 rounded border font-medium">Opsional</span>}</div></div>
//                                                                                             </div>
//                                                                                             <div className="flex gap-2 items-center ml-2"><button type="button" onClick={() => startEditLesson(m._id, l)} className="text-gray-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded" title="Edit" aria-label="Edit"><Pencil size={16} /></button><button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-gray-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded" title="Hapus" aria-label="Hapus"><Trash2 size={16} /></button><button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${l.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Lesson"><span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-md ${m.isActive ? 'translate-x-4' : 'translate-x-1'}`} /></button></div>
//                                                                                         </div>
//                                                                                     )}
//                                                                                 </Draggable>
//                                                                             ))}
//                                                                             {provided.placeholder}
//                                                                             {activeModId === m._id ? (
//                                                                                 <div id={`form-${m._id}`} className="bg-blue-50 p-4 rounded border border-blue-200 mt-2 space-y-3">
//                                                                                     <div className="grid grid-cols-12 gap-2">
//                                                                                         <div className="col-span-4">
//                                                                                             <select className="w-full p-2 border rounded text-sm bg-white" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Tipe Konten">
//                                                                                                 <option value="lesson">📄 Materi Teks</option>
//                                                                                                 <option value="video_url">🎞️ Video URL (YouTube)</option>
//                                                                                                 <option value="audio">🎧 Audio / Podcast</option>
//                                                                                                 <option value="embed">🌐 Smart Embed (PDF/Web)</option>
//                                                                                                 <option value="flashcard">🃏 Flashcards (Hafalan)</option>
//                                                                                                 <option value="game_memory">🎮 Game: Memory Match</option>
//                                                                                                 <option value="game_scavenger">📸 Game: Misi Foto (Scavenger)</option>
//                                                                                                 <option value="game_emoji">🤔 Game: Tebak Emoji/Kata</option>
                                                                                                
//                                                                                                 <option value="slide">🖥️ Slide Presentasi (Lama)</option>
//                                                                                                 <option value="quiz">📝 Kuis Pilihan Ganda</option>
//                                                                                                 <option value="essay">✍️ Esai / Uraian</option>
//                                                                                                 <option value="poll">📊 Polling</option>
//                                                                                                 <option value="upload_doc">📤 Tugas Upload</option>
//                                                                                                 <option value="download_doc">📥 Download Dokumen</option>
//                                                                                                 <option value="image">🖼️ Gambar</option>
//                                                                                                 <option value="virtual_class">🎥 Kelas Virtual (Zoom)</option>
//                                                                                                 <option value="google_classroom">🏫 Google Classroom</option>
//                                                                                             </select>
//                                                                                         </div>
//                                                                                         <div className="col-span-6 flex gap-1">
//                                                                                             <input className="w-full p-2 border rounded text-sm" placeholder="Judul Materi..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi"/>
//                                                                                             <button type="button" className="bg-purple-100 text-purple-600 px-3 rounded hover:bg-purple-200 flex items-center gap-1 text-xs font-bold" title="Generate with AI (Coming Soon)" onClick={() => alert("Fitur AI Generator akan segera hadir!")} aria-label="Generate AI"><Zap size={14} /> AI</button>
//                                                                                         </div>
//                                                                                         <div className="col-span-2"><input type="number" className="w-full p-2 border rounded text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="JP"/></div>
//                                                                                     </div>
                                                                                    
//                                                                                     <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded border border-yellow-200"><Clock size={18} className="text-yellow-700"/><div className="flex items-center gap-2 text-sm text-yellow-800"><span className="font-bold">Durasi Timer (Opsional):</span><input type="number" min="0" className="w-20 p-1 border border-yellow-400 rounded text-center font-bold bg-white" value={quizDuration} onChange={(e) => setQuizDuration(Number(e.target.value))} placeholder="0" aria-label="Durasi Timer"/><span>menit (0 = Tidak ada batas)</span></div></div>
//                                                                                     <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded border border-blue-100"><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Fasilitator (Opsional)</label><select className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesFacilitatorId} onChange={e=>setLesFacilitatorId(e.target.value)} aria-label="Pilih Fasilitator"><option value="">-- Ikut Modul --</option>{activeTeam.map((f:any)=><option key={f._id} value={f._id}>{f.name}</option>)}</select></div><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesSchedule} onChange={e=>setLesSchedule(e.target.value)} aria-label="Tanggal" /></div><div className="flex items-center h-full pt-4"><label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e=>setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib"/> Wajib diselesaikan?</label></div></div>
                                                                                    
//                                                                                     {['lesson', 'upload_doc', 'game_scavenger'].includes(lesType) && (
//                                                                                         <div className="bg-white rounded border">
//                                                                                             {lesType === 'game_scavenger' && <div className="p-2 bg-rose-50 text-rose-700 text-xs font-bold border-b border-rose-100">Tuliskan instruksi misi foto di bawah ini (Contoh: "Foto selfie dengan kotak P3K!")</div>}
//                                                                                             <ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-48 mb-12" placeholder="Tulis materi/instruksi..."/>
//                                                                                         </div>
//                                                                                     )}

//                                                                                     {/* [FIX] INTEGRASI EMOJI PICKER (POPUP TENGAH LAYAR) */}
//                                                                                     {(lesType === 'essay' || lesType === 'game_emoji') && (<div className="bg-white p-3 rounded border">
//                                                                                         {lesType === 'game_emoji' && <div className="mb-4 bg-yellow-50 p-3 rounded border border-yellow-200 text-xs text-yellow-800"><strong>Cara Buat Tebak Emoji:</strong><br/>Klik tombol smiley untuk memilih emoji, atau ketik langsung.</div>}
                                                                                        
//                                                                                         <div className="mb-2">
//                                                                                             <label className="text-xs font-bold text-gray-500">Instruksi / Kunci Jawaban:</label>
//                                                                                             <ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-32 mb-10"/>
//                                                                                         </div>
                                                                                        
//                                                                                         {essayQuestions.map((q, ix) => (
//                                                                                             <div key={ix} className="flex gap-2 mb-4 items-start relative">
//                                                                                                 <div className="flex-1 relative">
//                                                                                                     {lesType === 'game_emoji' ? (
//                                                                                                         <div className="flex gap-2">
//                                                                                                             <div className="relative flex-1">
//                                                                                                                 <input 
//                                                                                                                     className="w-full p-4 border-2 border-yellow-200 rounded-xl text-3xl text-center focus:border-yellow-400 outline-none"
//                                                                                                                     placeholder="Klik tombol emoji 👉"
//                                                                                                                     value={q}
//                                                                                                                     onChange={(e) => updateEssay(ix, e.target.value)}
//                                                                                                                     aria-label="Input Emoji"
//                                                                                                                 />
//                                                                                                             </div>
//                                                                                                             <button 
//                                                                                                                 type="button"
//                                                                                                                 onClick={() => setActiveEmojiIndex(activeEmojiIndex === ix ? null : ix)}
//                                                                                                                 className={`p-3 rounded-xl border-2 transition-all ${activeEmojiIndex === ix ? 'bg-yellow-200 border-yellow-400' : 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'}`}
//                                                                                                                 title="Pilih Emoji"      
//                                                                                                                 aria-label="Pilih Emoji"
//                                                                                                             >
//                                                                                                                 <Smile size={24} className="text-yellow-600"/>
//                                                                                                             </button>
//                                                                                                         </div>
//                                                                                                     ) : (
//                                                                                                         <ReactQuill theme="snow" value={q} onChange={(val) => updateEssay(ix, val)} modules={quillModules} placeholder={`Pertanyaan ${ix + 1}`} className="h-24 mb-10 bg-white"/>
//                                                                                                     )}
//                                                                                                 </div>
//                                                                                                 {essayQuestions.length > 1 && (<button type="button" onClick={()=>removeEssay(ix)} className="text-red-500 font-bold p-2 bg-red-50 rounded hover:bg-red-100" aria-label="Hapus"><Trash2 size={16} /></button>)}
//                                                                                             </div>
//                                                                                         ))}
//                                                                                         <button type="button" onClick={addEssayRow} className="text-xs text-blue-600 font-bold flex items-center gap-1 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50" aria-label="Tambah Tanya"><Plus size={14} /> Tambah Soal</button>
//                                                                                     </div>)}

//                                                                                     {/* MODAL EMOJI PICKER (FIXED CENTER) */}
//                                                                                     {activeEmojiIndex !== null && (
//                                                                                         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
//                                                                                             <div className="bg-white rounded-2xl shadow-2xl p-4 relative animate-in zoom-in-95">
//                                                                                                 <button 
//                                                                                                     onClick={() => setActiveEmojiIndex(null)}
//                                                                                                     className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all border border-gray-200 z-50"
//                                                                                                     title="Tutup"
//                                                                                                 >
//                                                                                                     <X size={20} />
//                                                                                                 </button>
//                                                                                                 <EmojiPicker
//                                                                                                     onEmojiClick={handleEmojiClick}
//                                                                                                     autoFocusSearch={false}
//                                                                                                     width={350}
//                                                                                                     height={450}
//                                                                                                     lazyLoadEmojis={true}
//                                                                                                 />
//                                                                                             </div>
//                                                                                         </div>
//                                                                                     )}
                                                                                    
//                                                                                     {lesType === 'game_memory' && (
//                                                                                         <div className="bg-violet-50 p-4 rounded-xl border border-violet-200">
//                                                                                             <div className="flex justify-between items-center mb-4"><h4 className="font-bold text-violet-900 flex items-center gap-2 text-sm"><Gamepad2 size={16}/> Konfigurasi Memory Game</h4><button type="button" onClick={addMemoryPair} className="text-xs bg-violet-600 text-white px-3 py-1.5 rounded-lg hover:bg-violet-700 font-bold">+ Tambah Pasangan</button></div>
//                                                                                             <div className="space-y-3">{memoryPairs.map((card, idx) => (idx % 2 === 0 ? (<div key={idx} className="flex gap-3 items-center bg-white p-3 rounded-lg border border-violet-100 shadow-sm relative"><div className="flex-1"><label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Kartu A</label><input type="text" className="w-full border-b border-gray-300 focus:border-violet-500 outline-none py-1 text-sm font-medium" value={memoryPairs[idx].text} onChange={(e) => updateMemoryCard(idx, e.target.value)} placeholder="Teks Kartu 1"/></div><div className="text-violet-300 font-bold mx-1">=</div><div className="flex-1"><label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Kartu B</label><input type="text" className="w-full border-b border-gray-300 focus:border-violet-500 outline-none py-1 text-sm font-medium" value={memoryPairs[idx+1]?.text || ''} onChange={(e) => updateMemoryCard(idx+1, e.target.value)} placeholder="Teks Kartu 2"/></div><button type="button" onClick={() => removeMemoryPair(idx, idx+1)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-full transition-colors ml-1" title="Hapus Pasangan"><Trash2 size={14}/></button></div>) : null))}</div>{memoryPairs.length === 0 && (<div className="text-center py-6 text-gray-400 text-xs italic border-2 border-dashed border-violet-100 rounded-lg">Belum ada kartu. Klik "Tambah Pasangan".</div>)}
//                                                                                         </div>
//                                                                                     )}

//                                                                                     {lesType === 'quiz' && (<div className="bg-white p-3 rounded border">{questions.map((q, ix) => (<div key={ix} className="p-2 border rounded bg-gray-50 mb-2 relative"><button type="button" onClick={()=>removeQuestion(ix)} className="absolute top-1 right-1 text-red-500 font-bold text-xs" aria-label="Hapus Soal">x</button><input className="w-full p-1 border rounded mb-1 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e=>updateQuestion(ix, 'question', e.target.value)} aria-label={`Pertanyaan ${ix+1}`}/><div className="grid grid-cols-2 gap-2">{q.options.map((o:string, oi:number) => <input key={oi} className={`w-full p-1 border text-xs ${q.correctIndex===oi?'bg-green-100 border-green-300':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix, 'options', e.target.value, oi)} aria-label={`Opsi ${oi+1}`}/>)}</div><div className="mt-1 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix, 'correctIndex', Number(e.target.value))} className="w-10 border" aria-label="Jawaban Benar"/></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}
//                                                                                     {lesType === 'poll' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} aria-label="Tanya Polling"/>{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2 mb-1"><input className="flex-1 p-1 border rounded text-xs" value={opt} onChange={e=>updatePollOption(idx, e.target.value)} placeholder={`Opsi ${idx+1}`} aria-label={`Opsi ${idx+1}`}/>{pollOptions.length > 2 && <button onClick={()=>removePollOption(idx)} className="text-red-500 font-bold" aria-label="Hapus">x</button>}</div>))}<button type="button" onClick={addPollOption} className="text-xs text-blue-600 font-bold" aria-label="Tambah Opsi">+ Opsi</button></div>)}
//                                                                                     {lesType === 'flashcard' && (<div className="bg-white p-3 rounded border"><div className="text-xs text-gray-500 mb-2">Buat kartu hafalan (Depan: Pertanyaan/Istilah, Belakang: Jawaban/Definisi)</div>{flashcards.map((card, idx) => (<div key={idx} className="flex gap-2 mb-2 p-2 bg-gray-50 rounded border items-start"><span className="text-xs font-bold text-gray-400 mt-2">#{idx+1}</span><div className="flex-1 space-y-2"><input className="w-full p-2 border rounded text-xs" placeholder="Sisi Depan (Pertanyaan)" value={card.front} onChange={e => updateFlashcard(idx, 'front', e.target.value)} aria-label={`Flashcard Depan ${idx+1}`} /><input className="w-full p-2 border rounded text-xs" placeholder="Sisi Belakang (Jawaban)" value={card.back} onChange={e => updateFlashcard(idx, 'back', e.target.value)} aria-label={`Flashcard Belakang ${idx+1}`} /></div><button type="button" onClick={() => removeFlashcard(idx)} className="text-red-500 hover:bg-red-100 p-1 rounded" title="Hapus Kartu"><Trash size={16}/></button></div>))}<button type="button" onClick={addFlashcard} className="text-xs text-blue-600 font-bold flex items-center gap-1 mt-2" aria-label="Tambah Flashcard"><Plus size={14}/> Tambah Kartu</button></div>)}
                                                                                    
//                                                                                     {lesType === 'video_url' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link YouTube..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Video"/>{lesContent && (<div className="bg-gray-100 p-2 rounded text-xs text-gray-500 flex items-center gap-2"><Video size={14}/> <span className="truncate flex-1">{lesContent}</span><span className="bg-green-100 text-green-700 px-1.5 rounded">Tersimpan</span></div>)}</div>)}
//                                                                                     {lesType === 'audio' && (<div className="bg-white p-4 rounded border border-pink-200 space-y-3"><label className="block text-xs font-bold text-gray-600">Upload File Audio (MP3/WAV)</label><div className="flex gap-2 items-center"><input type="file" accept="audio/*" onChange={e => setSelectedFile(e.target.files?.[0] || null)} className="text-sm w-full border p-2 rounded" aria-label="Upload Audio"/></div>{existingFileUrl && !selectedFile && (<div className="bg-pink-50 p-2 rounded flex items-center gap-2 text-xs text-pink-700"><Mic size={14}/> <span>Audio tersimpan: </span><a href={getImageUrl(existingFileUrl)} target="_blank" className="underline font-bold">Dengar Preview</a></div>)}<div className="mt-2"><label className="block text-xs font-bold text-gray-600 mb-1">Deskripsi / Transkrip (Opsional)</label><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-24 mb-10 bg-white"/></div></div>)}
//                                                                                     {lesType === 'embed' && (<div className="bg-white p-4 rounded border border-teal-200 space-y-3"><div className="bg-teal-50 p-3 rounded text-xs text-teal-800 mb-2"><strong>Tips:</strong> Masukkan URL Google Drive (Public), Spotify Embed, Canva Embed, atau link PDF langsung.</div><input className="w-full p-2 border rounded text-sm" placeholder="Paste URL Embed disini..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="URL Embed"/>{lesContent && (<div className="aspect-video bg-gray-100 rounded border overflow-hidden relative"><p className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs z-0">Preview Area</p><iframe src={lesContent} className="w-full h-full relative z-10" title="Preview Embed" /></div>)}</div>)}
//                                                                                     {lesType === 'virtual_class' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link Zoom/Meet..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Zoom"/>{lesContent && (<a href={lesContent} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:underline bg-blue-50 p-2 rounded border border-blue-100"><ExternalLink size={14} /> <span className="truncate">Coba Link: {lesContent}</span></a>)}</div>)}
//                                                                                     {['image','upload_doc','slide','download_doc'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File (Gambar/Dokumen)</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Upload File"/>{existingFileUrl && !selectedFile && (<div className="mt-2 flex items-center gap-3 bg-gray-50 p-2 rounded border border-gray-200">{lesType === 'image' ? (<img src={getImageUrl(existingFileUrl)} alt="Preview" className="h-12 w-12 object-cover rounded border" />) : (<FileText className="text-gray-400" size={24} />)}<div className="flex-1 overflow-hidden"><div className="text-xs font-bold text-gray-600">File Tersimpan</div><a href={getImageUrl(existingFileUrl)} target="_blank" className="text-[10px] text-blue-600 truncate block hover:underline">{existingFileUrl.split('/').pop()}</a></div></div>)}</div>)}
//                                                                                     {lesType === 'google_classroom' && (<div className="bg-white p-4 rounded border border-green-200 space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Class"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putus Akun"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}</div>)}

//                                                                                     <div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetLessonForm} className="text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" aria-label="Simpan Materi">Simpan Materi</button></div>
//                                                                                 </div>
//                                                                             ) : (
//                                                                                 <button type="button" onClick={() => { handleAddNewContent(m._id) }} className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-400 font-bold hover:border-blue-300 hover:text-blue-600 mt-2 transition-colors flex items-center justify-center gap-2" aria-label="Tambah Konten"><Plus size={16}/> Tambah Konten</button>
//                                                                             )}
//                                                                         </div>
//                                                                     )}
//                                                                 </Droppable>
//                                                             </div>
//                                                         )}
//                                                     </Draggable>
//                                                 );
//                                             })}
//                                             {provided.placeholder}
//                                     </div>
//                                 )}
//                             </Droppable>
//                         </DragDropContext>
//                     </div>
//                 </div>
//             )}

//             {activeEditorTab === 'grading' && <GradingSchemeForm key={`grading-${courseId}`} courseId={courseId} modules={course.modules} refreshData={refreshData} facilitators={facilitators} />}
//             {activeEditorTab === 'certificate' && <div className="space-y-8 animate-in slide-in-from-right-4"><div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"><h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">1. Unit Kompetensi</h2><CompetencyForm key={`comp-${courseId}`} initialData={competencies} onChange={(data) => setCompetencies(data)} /><div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200"><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={includeCompetencies} onChange={e=>setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Tampilkan Kompetensi"/><span className="text-sm font-bold text-gray-700">Tampilkan daftar kompetensi di halaman belakang sertifikat?</span></label><button type="button" onClick={handleSaveCompetencies} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button></div></div><div><h2 className="text-xl font-bold text-gray-800 mb-4 px-2">2. Pengaturan Sertifikat</h2><CertificateConfigForm key={`cert-${courseId}`} initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} courseTitle={course?.title || 'Judul Pelatihan'} /></div></div>}
            
//             <div className="bg-white p-8 rounded-[32px] border border-gray-200 text-center flex flex-col items-center justify-center gap-4 mt-12 shadow-lg relative overflow-hidden">
//                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>
//                 {!isPublished ? (
//                     <><div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2"><Rocket size={32} /></div><h3 className="text-2xl font-black text-gray-900">Publikasi Pelatihan</h3><p className="text-gray-500 max-w-lg">Pastikan seluruh modul, materi, kuis, dan pengaturan sertifikat sudah lengkap sebelum mempublikasikan pelatihan ini.</p><button type="button" onClick={() => { setIsDisclaimerChecked(false); setShowPublishDisclaimer(true); }} className="px-10 py-4 rounded-2xl font-black text-white shadow-xl bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-3 uppercase tracking-wider text-sm mt-2" aria-label="Publish Sekarang"><UploadCloud size={20}/> PUBLISH SEKARANG</button></>
//                 ) : (
//                     <div className="flex flex-col items-center animate-in zoom-in"><div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 shadow-inner"><CheckCircle2 size={40}/></div><h3 className="text-2xl font-black text-green-800">Pelatihan Sedang Live</h3><p className="text-green-600 font-medium mt-1">Peserta sudah dapat mengakses materi ini.</p><button onClick={() => toggleStatus()} className="mt-6 text-xs text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-lg border border-red-100">Tarik Kembali (Unpublish)</button></div>
//                 )}
//             </div>

//             {showPublishDisclaimer && (
//                 <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
//                     <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 relative animate-in zoom-in-95">
//                         <button type="button" onClick={() => setShowPublishDisclaimer(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-400" aria-label="Tutup"><X size={20}/></button>
//                         <div className="flex flex-col items-center text-center space-y-4"><div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"><ShieldCheck size={32}/></div><h3 className="text-xl font-bold text-gray-900">Konfirmasi Publikasi</h3><p className="text-sm text-gray-500 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">"Saya menyatakan bahwa materi pelatihan ini telah disusun dengan benar, tidak melanggar hak cipta, dan siap untuk dipublikasikan kepada peserta."</p><label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-blue-50 rounded-xl transition-colors w-full border border-gray-200"><input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" checked={isDisclaimerChecked} onChange={(e) => setIsDisclaimerChecked(e.target.checked)}/><span className="font-bold text-sm text-gray-700">Saya Setuju & Bertanggung Jawab</span></label><button onClick={handleFinalizeContent} disabled={!isDisclaimerChecked || isPublishing} className="w-full py-4 rounded-xl bg-green-600 text-white font-bold shadow-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2">{isPublishing ? 'Memproses...' : '🚀 YA, PUBLISH PELATIHAN'}</button></div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { api, apiUpload, getImageUrl } from '@/lib/api';
import CompetencyForm from '@/components/admin/CompetencyForm';
import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
import GradingSchemeForm from '@/components/admin/GradingSchemeForm'; 
import {
    Calendar, School, RefreshCw, LogOut, CheckCircle2, 
    Link as LinkIcon, Users, FileText, Download,
    FileBadge, MapPin, UserCheck, Hash, BarChart3, 
    BookOpen, Trash2, Plus, Video, Image as ImageIcon,
    Award, Layout, Clock, ExternalLink, Calculator,
    MonitorPlay, UploadCloud, GripVertical, Pencil, MessageSquare,
    Rocket, ShieldCheck, X, Bell, CheckCircle,
    Mic, Globe, Zap, Layers, Trash, Gamepad2, Camera, Smile 
} from 'lucide-react';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; 

// Import Emoji Picker
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';

const ReactQuill = dynamic(() => import('react-quill'), { 
    ssr: false,
    loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
});

interface CourseContentEditorProps {
    course: any;
    courseId: string;
    refreshData: () => void;
    facilitators: any[]; 
}

const getLessonIcon = (type: string) => {
    switch (type) {
        case 'video_url': return <Video size={18} className="text-red-600" />;
        case 'virtual_class': return <MonitorPlay size={18} className="text-purple-600" />;
        case 'quiz': return <FileBadge size={18} className="text-orange-600" />;
        case 'essay': return <FileText size={18} className="text-indigo-600" />;
        case 'poll': return <BarChart3 size={18} className="text-emerald-600" />;
        case 'slide': return <Layout size={18} className="text-blue-600" />;
        case 'image': return <ImageIcon size={18} className="text-pink-600" />;
        case 'upload_doc': return <UploadCloud size={18} className="text-cyan-600" />;
        case 'download_doc': return <Download size={18} className="text-green-600" />;
        case 'google_classroom': return <School size={18} className="text-yellow-600" />;
        case 'audio': return <Mic size={18} className="text-pink-500" />;
        case 'embed': return <Globe size={18} className="text-teal-600" />;
        case 'flashcard': return <Layers size={18} className="text-orange-500" />;
        case 'game_memory': return <Gamepad2 size={18} className="text-violet-600" />;
        case 'game_scavenger': return <Camera size={18} className="text-rose-600" />;
        case 'game_emoji': return <Smile size={18} className="text-yellow-600" />;
        default: return <BookOpen size={18} className="text-slate-500" />;
    }
};

export default function CourseContentEditor({ course, courseId, refreshData, facilitators }: CourseContentEditorProps) {
    const [activeEditorTab, setActiveEditorTab] = useState<'curriculum' | 'certificate' | 'grading'>('curriculum');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    
    // --- STATE ---
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
    const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);
    const [isSavingContent, setIsSavingContent] = useState(false);

    const [quizDuration, setQuizDuration] = useState(0); 
    const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
    const [pollQuestion, setPollQuestion] = useState('');
    const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
    const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
    
    const [flashcards, setFlashcards] = useState<any[]>([{ front: '', back: '' }]);
    const [memoryPairs, setMemoryPairs] = useState<{id: number, text: string, image: string, pairId: string}[]>([]);

    const [activeEmojiIndex, setActiveEmojiIndex] = useState<number | null>(null);

    const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
    const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
    const [googleToken, setGoogleToken] = useState<string | null>(null);
    const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

    const [showPublishDisclaimer, setShowPublishDisclaimer] = useState(false);
    const [isDisclaimerChecked, setIsDisclaimerChecked] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    const [competencies, setCompetencies] = useState<any[]>(course?.competencies || []);
    const [includeCompetencies, setIncludeCompetencies] = useState(course?.includeCompetenciesInCertificate ?? true);
    const [certConfig, setCertConfig] = useState<any>(course?.certificateConfig || {});
    const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>(
        course?.facilitatorIds?.map((f: any) => (typeof f === 'object' ? f._id : f)) || []
    );
    const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
    const [isSavingCert, setIsSavingCert] = useState(false);
    const [searchFacilitator, setSearchFacilitator] = useState('');

    useEffect(() => {
        if (course) {
            setCompetencies(course.competencies || []);
            setIncludeCompetencies(course.includeCompetenciesInCertificate ?? true);
            setCertConfig(course.certificateConfig || {});
            if (course.facilitatorIds) setSelectedFacilitatorIds(course.facilitatorIds.map((f: any) => (typeof f === 'object' ? f._id : f)));
        }
    }, [course]);

    const activeTeam = facilitators.filter((u: any) => selectedFacilitatorIds.includes(u._id) || u.role === 'SUPER_ADMIN');
    const quillModules = useMemo(() => ({ toolbar: { container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'image', 'video'], [{ 'color': [] }, { 'background': [] }], ['clean']] } }), []);
    const getFacilitatorNameLabel = (data: any) => { if (!data) return null; if (typeof data === 'object' && data.name) return data.name; const found = facilitators.find(f => f._id === data || f.id === data); return found ? found.name : 'Unknown'; };

    // --- HELPER FUNCTIONS ---
    const addPollOption = () => setPollOptions([...pollOptions, '']); 
    const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; 
    const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); }; 
    const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
    const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; 
    const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); }; 
    const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); 
    
    const addFlashcard = () => setFlashcards([...flashcards, { front: '', back: '' }]);
    const updateFlashcard = (idx: number, field: 'front' | 'back', val: string) => { const newCards = [...flashcards]; newCards[idx][field] = val; setFlashcards(newCards); };
    const removeFlashcard = (idx: number) => { if (flashcards.length > 1) setFlashcards(flashcards.filter((_, i) => i !== idx)); };

    const addMemoryPair = () => { const pairId = Date.now().toString(); setMemoryPairs([...memoryPairs, { id: Date.now(), text: '', image: '', pairId }, { id: Date.now() + 1, text: '', image: '', pairId }]); };
    const updateMemoryCard = (index: number, val: string) => { const newCards = [...memoryPairs]; newCards[index].text = val; setMemoryPairs(newCards); };
    const removeMemoryPair = (idxA: number, idxB: number) => { setMemoryPairs(prev => prev.filter((_, i) => i !== idxA && i !== idxB)); };

    const updateEssay = (idx: number, val: string) => { 
        setEssayQuestions(prev => { 
            const newQ = [...prev]; 
            newQ[idx] = val; 
            return newQ; 
        }); 
    }; 
    
    const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        if (activeEmojiIndex !== null) {
            const currentVal = essayQuestions[activeEmojiIndex] || '';
            const newVal = currentVal + emojiData.emoji;
            updateEssay(activeEmojiIndex, newVal);
        }
    };

    const calculateModuleJP = (lessons: any[]) => (!lessons) ? 0 : lessons.reduce((acc, curr) => acc + (curr.isActive ? (curr.jp || 0) : 0), 0);

    const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); window.open(url, 'GoogleAuthPopup', `width=500,height=600`); } catch (e) { alert("Gagal Auth Google"); } }; 
    const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } }; 
    const fetchClassroomCourses = async (tokenOverride?: string) => { const token = tokenOverride || googleToken; if (!token) return; try { setIsCheckingGoogle(true); const data = await api('/api/classroom/courses', { headers: { 'x-google-token': token } }); if (data.courses) setClassroomCourses(data.courses); } catch (e: any) { if(e.status === 401 || e.message?.includes('401')) { localStorage.removeItem('google_class_token'); setGoogleToken(null); } } finally { setIsCheckingGoogle(false); } };
    
    const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); await apiUpload(`/api/upload/course/${courseId}/cover`, formData); refreshData(); alert("Cover berhasil diperbarui!"); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } };
    
    const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); }; 
    const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PATCH', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } };
    const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PATCH', body: { certificateConfig: data } }); setCertConfig(data); alert("Pengaturan Sertifikat Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
    const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PATCH', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Kompetensi Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };

    const resetLessonForm = () => {
        setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesType('lesson'); setLesContent(''); setLesIsMandatory(true); setLesJp(0); setLesSchedule(''); setLesFacilitatorId(''); setSelectedFile(null);
        setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(0); setPollQuestion(''); setPollOptions(['', '']); setEssayQuestions(['']); 
        setFlashcards([{ front: '', back: '' }]); setMemoryPairs([]); setExistingFileUrl(null); setExistingFileUrl(null);
        setActiveEmojiIndex(null); 
    };

    const resetModuleForm = () => { setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false); };

    // --- [TRIK JITU 1] MENYIMPAN MODUL TANPA BUG BACKEND ---
    const handleSaveModule = async () => { 
        if (!modTitle.trim()) return alert("Judul modul wajib diisi"); 
        
        setIsSavingContent(true); 
        const newModuleData = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: modFacilitatorId || null, jp: modJp, scheduleDate: modSchedule || null }; 
        
        try { 
            if (editingModId) {
                // BYPASS Mongoose bug dengan menimpa seluruh array modules
                const updatedModules = JSON.parse(JSON.stringify(course.modules));
                const modIdx = updatedModules.findIndex((m: any) => m._id === editingModId);
                if (modIdx > -1) {
                    updatedModules[modIdx] = { ...updatedModules[modIdx], ...newModuleData };
                    await api(`/api/courses/${courseId}`, { method: 'PATCH', body: { modules: updatedModules } });
                }
            } else { 
                await api(`/api/courses/${courseId}/modules`, { method: 'POST', body: newModuleData }); 
            }
            
            alert("Modul berhasil disimpan!"); 
            resetModuleForm(); 
            refreshData(); 
        } catch(e: any) { 
            alert(e.message); 
        } finally {
            setIsSavingContent(false);
        }
    };

    // --- [TRIK JITU 2] MENYIMPAN LESSON TANPA BUG BACKEND ---
    const handleSaveLesson = async (modId: string) => { 
        if (!lesTitle.trim()) { alert("Judul materi wajib diisi!"); return; } 
        
        setIsSavingContent(true); 

        let fileUrl = ''; 
        if (selectedFile) { 
            try { 
                setUploading(true); 
                const fd = new FormData(); 
                fd.append('file', selectedFile); 
                const res = await apiUpload('/api/upload', fd); 
                fileUrl = res.url || res.file?.url || res.imageUrl; 
            } catch (err) { 
                alert("Gagal upload file!"); setIsSavingContent(false); return; 
            } finally { setUploading(false); } 
        } else if (editingLesId) { fileUrl = existingFileUrl || ''; } 
        
        const newLessonData: any = { 
            title: lesTitle, type: lesType, isActive: true, isMandatory: lesIsMandatory, 
            jp: lesJp, facilitatorId: lesFacilitatorId || null, scheduleDate: lesSchedule || null, 
            quizDuration: quizDuration, 
            questions: (lesType === 'quiz') ? questions : undefined, 
            pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, 
            pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, 
            classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined 
        }; 
        
        if (lesType === 'essay' || lesType === 'game_emoji') { newLessonData.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); newLessonData.content = lesContent; } 
        if (lesType === 'flashcard') { newLessonData.content = JSON.stringify(flashcards); }
        if (lesType === 'game_memory') { newLessonData.content = JSON.stringify(memoryPairs); }

        if(fileUrl) newLessonData.fileUrl = fileUrl; 
        if(lesType === 'video_url' || lesType === 'embed') newLessonData.videoUrl = lesContent;
        else if(lesType === 'virtual_class') { newLessonData.meetingLink = lesContent; newLessonData.content = lesContent; }
        else if(['lesson', 'upload_doc', 'download_doc', 'image', 'slide', 'audio', 'game_scavenger'].includes(lesType)) {
            newLessonData.content = lesContent; 
        }
        
        try { 
            if (editingLesId) { 
                // BYPASS Mongoose subdocument saving bug
                // Kita ambil array modules secara utuh, ubah satu isinya, lalu timpa ke root database.
                const updatedModules = JSON.parse(JSON.stringify(course.modules));
                const modIdx = updatedModules.findIndex((m: any) => m._id === modId);
                if (modIdx > -1) {
                    const lesIdx = updatedModules[modIdx].lessons.findIndex((l: any) => l._id === editingLesId);
                    if (lesIdx > -1) {
                        updatedModules[modIdx].lessons[lesIdx] = {
                            ...updatedModules[modIdx].lessons[lesIdx],
                            ...newLessonData
                        };
                        // Menembak endpoint Course utama untuk menimpa field modules
                        await api(`/api/courses/${courseId}`, {
                            method: 'PATCH',
                            body: { modules: updatedModules }
                        });
                    }
                }
            } else { 
                await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body: newLessonData }); 
            }
            
            alert("Materi berhasil disimpan!"); 
            resetLessonForm(); 
            refreshData(); 
        } catch(e: any) { 
            alert("Gagal menyimpan: " + e.message); 
        } finally {
            setIsSavingContent(false);
        }
    };

    // --- [TRIK JITU 3] DELETE MENGGUNAKAN BYPASS ---
    const deleteItem = async (modId: string, lesId: string) => { 
        if(!confirm("Hapus?")) return; 
        try {
            const updatedModules = JSON.parse(JSON.stringify(course.modules));
            const modIdx = updatedModules.findIndex((m: any) => m._id === modId);
            if (modIdx > -1) {
                updatedModules[modIdx].lessons = updatedModules[modIdx].lessons.filter((l: any) => l._id !== lesId);
                await api(`/api/courses/${courseId}`, { method: 'PATCH', body: { modules: updatedModules } });
                alert("Dihapus!");
                refreshData();
            }
        } catch(e: any) {
            alert("Gagal menghapus: " + e.message);
        }
    };
    
    const handleFinalizeContent = async () => {
        setIsPublishing(true);
        try { await api(`/api/courses/${courseId}`, { method: 'PATCH', body: { isPublished: true, status: 'published' } }); alert("✅ Pelatihan BERHASIL DIPUBLIKASIKAN!"); setShowPublishDisclaimer(false); refreshData(); } catch (e: any) { alert("Gagal publish: " + e.message); } finally { setIsPublishing(false); }
    };

    const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PATCH', body: { isPublished: newStatus } }); alert(newStatus ? "Dipublikasikan!" : "Jadi Draft"); refreshData(); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); refreshData(); } } catch (e: any) { alert(e.message); } };
    
    // --- [FIX 4] DRAG AND DROP JUGA PAKAI BYPASS ---
    const onDragEnd = async (result: DropResult) => { 
        const { source, destination, type } = result; 
        if (!destination) return; 
        const newCourse = JSON.parse(JSON.stringify(course)); 
        if (type === 'module') { 
            const [removed] = newCourse.modules.splice(source.index, 1); 
            newCourse.modules.splice(destination.index, 0, removed); 
        } else if (type === 'lesson') { 
            const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); 
            const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); 
            if (sourceModIdx === -1 || destModIdx === -1) return; 
            const sourceLessons = newCourse.modules[sourceModIdx].lessons; 
            const [removed] = sourceLessons.splice(source.index, 1); 
            newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); 
        } 
        try { 
            // Ubah dari /reorder (yang mungkin 404) ke /PATCH root
            await api(`/api/courses/${courseId}`, { method: 'PATCH', body: { modules: newCourse.modules } }); 
            refreshData(); 
        } catch (err) { refreshData(); } 
    };

    const handleAddNewContent = (modId: string) => { resetLessonForm(); setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); };
    const startEditModule = (mod: any) => { setModTitle(mod.title); setModIsMandatory(mod.isMandatory !== false); setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); setModJp(mod.jp || 0); setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); setEditingModId(mod._id); setShowModuleForm(true); };
    
    const startEditLesson = (modId: string, les: any) => { 
        setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title); 
        setQuizDuration(les.quizDuration || 0); setExistingFileUrl(les.fileUrl || null);

        let contentType = les.type;
        if (les.type === 'game_emoji') contentType = 'game_emoji';
        else if (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0) contentType = 'essay';
        setLesType(contentType);

        if (contentType === 'essay' || contentType === 'game_emoji') { 
            setEssayQuestions(les.questions.map((q:any) => q.question)); 
            setLesContent(les.content || ''); 
        } else if (contentType === 'embed') { 
            setLesContent(les.videoUrl || '');
        } else if (contentType === 'flashcard') { 
            try { setFlashcards(JSON.parse(les.content || '[]')); } catch (e) { setFlashcards([{ front: '', back: '' }]); }
        } else if (contentType === 'game_memory') { 
            try { setMemoryPairs(JSON.parse(les.content || '[]')); } catch (e) { setMemoryPairs([]); }
        } else if (contentType === 'video_url') {
            setLesContent(les.videoUrl||''); 
        } else if (contentType === 'virtual_class') {
            setLesContent(les.meetingLink||''); 
        } else if (['lesson', 'upload_doc', 'download_doc', 'image', 'slide', 'audio', 'game_scavenger'].includes(contentType)) {
            setLesContent(les.content||''); 
        }
        
        setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || '')); 
        
        if (contentType === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); } 
        if (contentType === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); } 
        if (contentType === 'google_classroom') { const token = localStorage.getItem('google_class_token'); if(token) { setGoogleToken(token); fetchClassroomCourses(token); } if(les.classroomData) setSelectedClassroom(les.classroomData); } else { setSelectedClassroom(null); } 
        
        setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150); 
    };

    const isPublished = course?.isPublished === true;

    return (
        <div className="animate-in fade-in duration-300 space-y-6 relative">
            <div className="flex border-b border-gray-200 overflow-x-auto">
                <button onClick={() => setActiveEditorTab('curriculum')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'curriculum' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Kurikulum"><Layout size={18}/> Kurikulum & Materi</button>
                <button onClick={() => setActiveEditorTab('grading')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'grading' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Skema Penilaian"><Calculator size={18}/> Skema Penilaian</button>
                <button onClick={() => setActiveEditorTab('certificate')} className={`px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeEditorTab === 'certificate' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} aria-label="Tab Sertifikat"><Award size={18}/> Sertifikat & Kompetensi</button>
            </div>

            {activeEditorTab === 'curriculum' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-left-4">
                    <div className="md:col-span-1 space-y-6">
                        <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
                            {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Ganti Cover">{isUploadingCover ? '...' : '📷 Ganti'}</button><input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Upload Cover"/></div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
                            <div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" aria-label="Simpan Tim">Simpan</button></div>
                            <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">{facilitators.map((user: any) => (<label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}><input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih ${user.name}`} /><div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div></label>))}</div>
                            <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" />
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">Struktur Modul</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 flex items-center gap-2" aria-label="Tambah Modul">+ Tambah Modul</button></div>
                        {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul"/><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" aria-label="JP"/></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih PJ"><option value="">-- Pilih Fasilitator --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal" /></div></div><div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetModuleForm} className="text-sm text-gray-500 font-bold" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold" aria-label="Simpan">{isSavingContent ? 'Menyimpan...' : 'Simpan'}</button></div></form>)}
                        
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="all-modules" type="module">
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                                            {course?.modules?.map((m: any, idx: number) => {
                                                const cumulativeJp = calculateModuleJP(m.lessons);
                                                return (
                                                    <Draggable key={m._id} draggableId={m._id} index={idx}>
                                                        {(provided) => (
                                                            <div ref={provided.innerRef} {...provided.draggableProps} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm mb-4">
                                                                <div className="bg-slate-50 p-4 flex justify-between items-center border-b border-gray-100" {...provided.dragHandleProps}>
                                                                    <div className="flex items-center gap-4">
                                                                        <span className="cursor-grab text-gray-400 hover:text-gray-600 transition-colors" title="Seret Modul" aria-label="Drag Modul"><GripVertical size={20} /></span>
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-blue-600 shadow-sm"><Layout size={20} strokeWidth={2.5} /></div>
                                                                            <div><span className="font-bold text-gray-800 text-base">{m.title}</span><div className="flex gap-2 text-[10px] mt-1 text-gray-500 font-medium"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{cumulativeJp} JP</span>{m.facilitatorId && <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100 flex items-center gap-1">👤 {getFacilitatorNameLabel(m.facilitatorId)}</span>}{m.scheduleDate && <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded border border-yellow-100 flex items-center gap-1">📅 {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}</div></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-3 items-center">
                                                                        <button type="button" onClick={() => startEditModule(m)} className="text-xs text-gray-600 font-bold hover:text-blue-600 bg-white border px-3 py-1.5 rounded-lg shadow-sm" title="Edit Modul" aria-label="Edit">Edit</button>
                                                                        <button type="button" onClick={() => toggleStatus(m._id)} title={m.isActive ? "Nonaktifkan Modul" : "Aktifkan Modul"} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${m.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Modul"><span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${m.isActive ? 'translate-x-6' : 'translate-x-1'}`} /></button>
                                                                    </div>
                                                                </div>

                                                                <Droppable droppableId={m._id} type="lesson">
                                                                    {(provided) => (
                                                                        <div ref={provided.innerRef} {...provided.droppableProps} className="p-3 bg-white space-y-2">
                                                                            {m.lessons?.map((l: any, lIdx: number) => (
                                                                                <Draggable key={l._id} draggableId={l._id} index={lIdx}>
                                                                                    {(provided) => (
                                                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`flex justify-between items-center p-3 rounded-lg border transition-all hover:shadow-md ${activeModId === m._id && editingLesId === l._id ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 bg-white hover:border-gray-300'}`}>
                                                                                            <div className="flex gap-3 items-center flex-1">
                                                                                                <span className="cursor-grab text-gray-300 hover:text-gray-500" title="Seret Materi" aria-label="Seret Materi"><GripVertical size={16}/></span>
                                                                                                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">{getLessonIcon(l.type)}</div>
                                                                                                <div className="flex-1"><p className={`text-sm font-bold ${!l.isActive ? 'text-gray-400' : 'text-gray-700'}`}>{l.title}{!l.isActive && <span className="text-[10px] ml-2 italic text-red-400">(Draft)</span>}</p><div className="flex gap-2 items-center flex-wrap mt-1"><span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border uppercase font-bold tracking-wide">{l.type.replace('_', ' ')}</span>{l.quizDuration > 0 && <span className="text-[9px] text-orange-600 flex items-center gap-1 font-medium"><Clock size={10} /> {l.quizDuration}m</span>}{l.jp > 0 && <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 rounded border border-blue-100 font-medium">{l.jp} JP</span>}{l.isMandatory ? <span className="text-[9px] bg-red-50 text-red-700 px-1.5 rounded border border-red-100 font-medium">Wajib</span> : <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 rounded border font-medium">Opsional</span>}</div></div>
                                                                                            </div>
                                                                                            <div className="flex gap-2 items-center ml-2"><button type="button" onClick={() => startEditLesson(m._id, l)} className="text-gray-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded" title="Edit Materi" aria-label="Edit"><Pencil size={16} /></button><button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-gray-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded" title="Hapus Materi" aria-label="Hapus"><Trash2 size={16} /></button><button type="button" onClick={() => toggleStatus(m._id, l._id)} title={l.isActive ? "Nonaktifkan Materi" : "Aktifkan Materi"} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${l.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Lesson"><span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-md ${l.isActive ? 'translate-x-4' : 'translate-x-1'}`} /></button></div>
                                                                                        </div>
                                                                                    )}
                                                                                </Draggable>
                                                                            ))}
                                                                            {provided.placeholder}
                                                                            {activeModId === m._id ? (
                                                                                <div id={`form-${m._id}`} className="bg-blue-50 p-4 rounded border border-blue-200 mt-2 space-y-3">
                                                                                    <div className="grid grid-cols-12 gap-2">
                                                                                        <div className="col-span-4">
                                                                                            <select className="w-full p-2 border rounded text-sm bg-white" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Tipe Konten">
                                                                                                <option value="lesson">📄 Materi Teks</option>
                                                                                                <option value="video_url">🎞️ Video URL (YouTube)</option>
                                                                                                <option value="audio">🎧 Audio / Podcast</option>
                                                                                                <option value="embed">🌐 Smart Embed (PDF/Web)</option>
                                                                                                <option value="flashcard">🃏 Flashcards (Hafalan)</option>
                                                                                                <option value="game_memory">🎮 Game: Memory Match</option>
                                                                                                <option value="game_scavenger">📸 Game: Misi Foto (Scavenger)</option>
                                                                                                <option value="game_emoji">🤔 Game: Tebak Emoji/Kata</option>
                                                                                                
                                                                                                <option value="slide">🖥️ Slide Presentasi (Lama)</option>
                                                                                                <option value="quiz">📝 Kuis Pilihan Ganda</option>
                                                                                                <option value="essay">✍️ Esai / Uraian</option>
                                                                                                <option value="poll">📊 Polling</option>
                                                                                                <option value="upload_doc">📤 Tugas Upload</option>
                                                                                                <option value="download_doc">📥 Download Dokumen</option>
                                                                                                <option value="image">🖼️ Gambar</option>
                                                                                                <option value="virtual_class">🎥 Kelas Virtual (Zoom)</option>
                                                                                                <option value="google_classroom">🏫 Google Classroom</option>
                                                                                            </select>
                                                                                        </div>
                                                                                        <div className="col-span-6 flex gap-1">
                                                                                            <input className="w-full p-2 border rounded text-sm" placeholder="Judul Materi..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi"/>
                                                                                            <button type="button" className="bg-purple-100 text-purple-600 px-3 rounded hover:bg-purple-200 flex items-center gap-1 text-xs font-bold" title="Generate with AI (Coming Soon)" onClick={() => alert("Fitur AI Generator akan segera hadir!")} aria-label="Generate AI"><Zap size={14} /> AI</button>
                                                                                        </div>
                                                                                        <div className="col-span-2"><input type="number" className="w-full p-2 border rounded text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="JP"/></div>
                                                                                    </div>
                                                                                    
                                                                                    <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded border border-yellow-200"><Clock size={18} className="text-yellow-700"/><div className="flex items-center gap-2 text-sm text-yellow-800"><span className="font-bold">Durasi Timer (Opsional):</span><input type="number" min="0" className="w-20 p-1 border border-yellow-400 rounded text-center font-bold bg-white" value={quizDuration} onChange={(e) => setQuizDuration(Number(e.target.value))} placeholder="0" aria-label="Durasi Timer"/><span>menit (0 = Tidak ada batas)</span></div></div>
                                                                                    <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded border border-blue-100"><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Fasilitator (Opsional)</label><select className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesFacilitatorId} onChange={e=>setLesFacilitatorId(e.target.value)} aria-label="Pilih Fasilitator"><option value="">-- Ikut Modul --</option>{activeTeam.map((f:any)=><option key={f._id} value={f._id}>{f.name}</option>)}</select></div><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesSchedule} onChange={e=>setLesSchedule(e.target.value)} aria-label="Tanggal" /></div><div className="flex items-center h-full pt-4"><label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e=>setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib"/> Wajib diselesaikan?</label></div></div>
                                                                                    
                                                                                    {['lesson', 'upload_doc', 'game_scavenger'].includes(lesType) && (
                                                                                        <div className="bg-white rounded border">
                                                                                            {lesType === 'game_scavenger' && <div className="p-2 bg-rose-50 text-rose-700 text-xs font-bold border-b border-rose-100">Tuliskan instruksi misi foto di bawah ini (Contoh: "Foto selfie dengan kotak P3K!")</div>}
                                                                                            <ReactQuill 
                                                                                                key={editingLesId || 'new-content'} 
                                                                                                theme="snow" 
                                                                                                value={lesContent} 
                                                                                                onChange={setLesContent} 
                                                                                                modules={quillModules} 
                                                                                                className="h-48 mb-12" 
                                                                                                placeholder="Tulis materi/instruksi..."
                                                                                            />
                                                                                        </div>
                                                                                    )}

                                                                                    {(lesType === 'essay' || lesType === 'game_emoji') && (<div className="bg-white p-3 rounded border">
                                                                                        {lesType === 'game_emoji' && (
                                                                                            <div className="mb-4 bg-yellow-50 p-3 rounded border border-yellow-200 text-xs text-yellow-800 space-y-1">
                                                                                                <p><strong>🤖 Cara Konfigurasi Game Emoji:</strong></p>
                                                                                                <ul className="list-disc pl-4">
                                                                                                    <li><strong>Kolom Editor (Bawah):</strong> Tuliskan <u>KUNCI JAWABAN</u> yang benar (satu kata/kalimat).</li>
                                                                                                    <li><strong>Kolom Pertanyaan:</strong> Masukkan Emoji Clue menggunakan tombol smiley.</li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        )}
                                                                                        
                                                                                        <div className="mb-2">
                                                                                            <label className="text-xs font-bold text-gray-500">
                                                                                                {lesType === 'game_emoji' ? 'KUNCI JAWABAN (User harus mengetik ini persis):' : 'Instruksi / Materi Pendukung:'}
                                                                                            </label>
                                                                                            <ReactQuill 
                                                                                                key={editingLesId || 'new-essay'}
                                                                                                theme="snow" 
                                                                                                value={lesContent} 
                                                                                                onChange={setLesContent} 
                                                                                                modules={quillModules} 
                                                                                                className="h-32 mb-10"
                                                                                            />
                                                                                        </div>
                                                                                        
                                                                                        {essayQuestions.map((q, ix) => (
                                                                                            <div key={ix} className="flex gap-2 mb-4 items-start relative">
                                                                                                <div className="flex-1 relative">
                                                                                                    {lesType === 'game_emoji' ? (
                                                                                                        <div className="flex gap-2">
                                                                                                            <div className="relative flex-1">
                                                                                                                <input 
                                                                                                                    className="w-full p-4 border-2 border-yellow-200 rounded-xl text-3xl text-center focus:border-yellow-400 outline-none"
                                                                                                                    placeholder="Klik tombol emoji 👉"
                                                                                                                    value={q}
                                                                                                                    onChange={(e) => updateEssay(ix, e.target.value)}
                                                                                                                />
                                                                                                            </div>
                                                                                                            <button 
                                                                                                                type="button"
                                                                                                                onClick={() => setActiveEmojiIndex(activeEmojiIndex === ix ? null : ix)}
                                                                                                                className={`p-3 rounded-xl border-2 transition-all ${activeEmojiIndex === ix ? 'bg-yellow-200 border-yellow-400' : 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'}`}
                                                                                                                title="Pilih Emoji"
                                                                                                                aria-label="Pilih Emoji"
                                                                                                            >
                                                                                                                <Smile size={24} className="text-yellow-600"/>
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    ) : (
                                                                                                        <ReactQuill theme="snow" value={q} onChange={(val) => updateEssay(ix, val)} modules={quillModules} placeholder={`Pertanyaan ${ix + 1}`} className="h-24 mb-10 bg-white"/>
                                                                                                    )}
                                                                                                </div>
                                                                                                {essayQuestions.length > 1 && (<button type="button" onClick={()=>removeEssay(ix)} className="text-red-500 font-bold p-2 bg-red-50 rounded hover:bg-red-100" title="Hapus Soal" aria-label="Hapus"><Trash2 size={16} /></button>)}
                                                                                            </div>
                                                                                        ))}
                                                                                        <button type="button" onClick={addEssayRow} className="text-xs text-blue-600 font-bold flex items-center gap-1 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50" title="Tambah Soal" aria-label="Tambah Soal"><Plus size={14} /> Tambah Soal</button>
                                                                                    </div>)}

                                                                                    {activeEmojiIndex !== null && (
                                                                                        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
                                                                                            <div className="bg-white rounded-2xl shadow-2xl p-4 relative animate-in zoom-in-95">
                                                                                                <button 
                                                                                                    onClick={() => setActiveEmojiIndex(null)}
                                                                                                    className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all border border-gray-200 z-50"
                                                                                                    title="Tutup Emoji"
                                                                                                    aria-label="Tutup Emoji"
                                                                                                >
                                                                                                    <X size={20} />
                                                                                                </button>
                                                                                                <EmojiPicker
                                                                                                    onEmojiClick={handleEmojiClick}
                                                                                                    autoFocusSearch={false}
                                                                                                    width={350}
                                                                                                    height={450}
                                                                                                    lazyLoadEmojis={true}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                    
                                                                                    {lesType === 'game_memory' && (
                                                                                        <div className="bg-violet-50 p-4 rounded-xl border border-violet-200">
                                                                                            <div className="flex justify-between items-center mb-4"><h4 className="font-bold text-violet-900 flex items-center gap-2 text-sm"><Gamepad2 size={16}/> Konfigurasi Memory Game</h4><button type="button" onClick={addMemoryPair} className="text-xs bg-violet-600 text-white px-3 py-1.5 rounded-lg hover:bg-violet-700 font-bold" title="Tambah Pasangan">+ Tambah Pasangan</button></div>
                                                                                            <div className="space-y-3">{memoryPairs.map((card, idx) => (idx % 2 === 0 ? (<div key={idx} className="flex gap-3 items-center bg-white p-3 rounded-lg border border-violet-100 shadow-sm relative"><div className="flex-1"><label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Kartu A</label><input type="text" className="w-full border-b border-gray-300 focus:border-violet-500 outline-none py-1 text-sm font-medium" value={memoryPairs[idx].text} onChange={(e) => updateMemoryCard(idx, e.target.value)} placeholder="Teks Kartu 1"/></div><div className="text-violet-300 font-bold mx-1">=</div><div className="flex-1"><label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Kartu B</label><input type="text" className="w-full border-b border-gray-300 focus:border-violet-500 outline-none py-1 text-sm font-medium" value={memoryPairs[idx+1]?.text || ''} onChange={(e) => updateMemoryCard(idx+1, e.target.value)} placeholder="Teks Kartu 2"/></div><button type="button" onClick={() => removeMemoryPair(idx, idx+1)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-full transition-colors ml-1" title="Hapus Pasangan" aria-label="Hapus Pasangan"><Trash2 size={14}/></button></div>) : null))}</div>{memoryPairs.length === 0 && (<div className="text-center py-6 text-gray-400 text-xs italic border-2 border-dashed border-violet-100 rounded-lg">Belum ada kartu. Klik "Tambah Pasangan".</div>)}
                                                                                        </div>
                                                                                    )}

                                                                                    {lesType === 'quiz' && (<div className="bg-white p-3 rounded border">{questions.map((q, ix) => (<div key={ix} className="p-2 border rounded bg-gray-50 mb-2 relative"><button type="button" onClick={()=>removeQuestion(ix)} className="absolute top-1 right-1 text-red-500 font-bold text-xs" title="Hapus Soal" aria-label="Hapus Soal">x</button><input className="w-full p-1 border rounded mb-1 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e=>updateQuestion(ix, 'question', e.target.value)} aria-label={`Pertanyaan ${ix+1}`}/><div className="grid grid-cols-2 gap-2">{q.options.map((o:string, oi:number) => <input key={oi} className={`w-full p-1 border text-xs ${q.correctIndex===oi?'bg-green-100 border-green-300':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix, 'options', e.target.value, oi)} aria-label={`Opsi ${oi+1}`}/>)}</div><div className="mt-1 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix, 'correctIndex', Number(e.target.value))} className="w-10 border" aria-label="Jawaban Benar"/></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs text-blue-600 font-bold" title="Tambah Soal" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}
                                                                                    {lesType === 'poll' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} aria-label="Tanya Polling"/>{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2 mb-1"><input className="flex-1 p-1 border rounded text-xs" value={opt} onChange={e=>updatePollOption(idx, e.target.value)} placeholder={`Opsi ${idx+1}`} aria-label={`Opsi ${idx+1}`}/>{pollOptions.length > 2 && <button onClick={()=>removePollOption(idx)} className="text-red-500 font-bold" title="Hapus Opsi" aria-label="Hapus">x</button>}</div>))}<button type="button" onClick={addPollOption} className="text-xs text-blue-600 font-bold" title="Tambah Opsi" aria-label="Tambah Opsi">+ Opsi</button></div>)}
                                                                                    {lesType === 'flashcard' && (<div className="bg-white p-3 rounded border"><div className="text-xs text-gray-500 mb-2">Buat kartu hafalan (Depan: Pertanyaan/Istilah, Belakang: Jawaban/Definisi)</div>{flashcards.map((card, idx) => (<div key={idx} className="flex gap-2 mb-2 p-2 bg-gray-50 rounded border items-start"><span className="text-xs font-bold text-gray-400 mt-2">#{idx+1}</span><div className="flex-1 space-y-2"><input className="w-full p-2 border rounded text-xs" placeholder="Sisi Depan (Pertanyaan)" value={card.front} onChange={e => updateFlashcard(idx, 'front', e.target.value)} aria-label={`Flashcard Depan ${idx+1}`} /><input className="w-full p-2 border rounded text-xs" placeholder="Sisi Belakang (Jawaban)" value={card.back} onChange={e => updateFlashcard(idx, 'back', e.target.value)} aria-label={`Flashcard Belakang ${idx+1}`} /></div><button type="button" onClick={() => removeFlashcard(idx)} className="text-red-500 hover:bg-red-100 p-1 rounded" title="Hapus Kartu" aria-label="Hapus Kartu"><Trash size={16}/></button></div>))}<button type="button" onClick={addFlashcard} className="text-xs text-blue-600 font-bold flex items-center gap-1 mt-2" title="Tambah Kartu" aria-label="Tambah Flashcard"><Plus size={14}/> Tambah Kartu</button></div>)}
                                                                                    
                                                                                    {lesType === 'video_url' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link YouTube..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Video"/>{lesContent && (<div className="bg-gray-100 p-2 rounded text-xs text-gray-500 flex items-center gap-2"><Video size={14}/> <span className="truncate flex-1">{lesContent}</span><span className="bg-green-100 text-green-700 px-1.5 rounded">Tersimpan</span></div>)}</div>)}
                                                                                    {lesType === 'audio' && (<div className="bg-white p-4 rounded border border-pink-200 space-y-3"><label className="block text-xs font-bold text-gray-600">Upload File Audio (MP3/WAV)</label><div className="flex gap-2 items-center"><input type="file" accept="audio/*" onChange={e => setSelectedFile(e.target.files?.[0] || null)} className="text-sm w-full border p-2 rounded" aria-label="Upload Audio"/></div>{existingFileUrl && !selectedFile && (<div className="bg-pink-50 p-2 rounded flex items-center gap-2 text-xs text-pink-700"><Mic size={14}/> <span>Audio tersimpan: </span><a href={getImageUrl(existingFileUrl)} target="_blank" className="underline font-bold">Dengar Preview</a></div>)}<div className="mt-2"><label className="block text-xs font-bold text-gray-600 mb-1">Deskripsi / Transkrip (Opsional)</label><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-24 mb-10 bg-white"/></div></div>)}
                                                                                    {lesType === 'embed' && (<div className="bg-white p-4 rounded border border-teal-200 space-y-3"><div className="bg-teal-50 p-3 rounded text-xs text-teal-800 mb-2"><strong>Tips:</strong> Masukkan URL Google Drive (Public), Spotify Embed, Canva Embed, atau link PDF langsung.</div><input className="w-full p-2 border rounded text-sm" placeholder="Paste URL Embed disini..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="URL Embed"/>{lesContent && (<div className="aspect-video bg-gray-100 rounded border overflow-hidden relative"><p className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs z-0">Preview Area</p><iframe src={lesContent} className="w-full h-full relative z-10" title="Preview Embed" /></div>)}</div>)}
                                                                                    {lesType === 'virtual_class' && (<div className="bg-white p-3 rounded border space-y-2"><input className="w-full p-2 border rounded text-sm" placeholder="Link Zoom/Meet..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Zoom"/>{lesContent && (<a href={lesContent} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:underline bg-blue-50 p-2 rounded border border-blue-100"><ExternalLink size={14} /> <span className="truncate">Coba Link: {lesContent}</span></a>)}</div>)}
                                                                                    {['image','upload_doc','slide','download_doc'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File (Gambar/Dokumen)</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Upload File"/>{existingFileUrl && !selectedFile && (<div className="mt-2 flex items-center gap-3 bg-gray-50 p-2 rounded border border-gray-200">{lesType === 'image' ? (<img src={getImageUrl(existingFileUrl)} alt="Preview" className="h-12 w-12 object-cover rounded border" />) : (<FileText className="text-gray-400" size={24} />)}<div className="flex-1 overflow-hidden"><div className="text-xs font-bold text-gray-600">File Tersimpan</div><a href={getImageUrl(existingFileUrl)} target="_blank" className="text-[10px] text-blue-600 truncate block hover:underline">{existingFileUrl.split('/').pop()}</a></div></div>)}</div>)}
                                                                                    {lesType === 'google_classroom' && (<div className="bg-white p-4 rounded border border-green-200 space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" title="Refresh Class" aria-label="Refresh Class"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" title="Putuskan Akun" aria-label="Putus Akun"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" title="Hubungkan Google" aria-label="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}</div>)}

                                                                                    <div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetLessonForm} className="text-xs font-bold text-gray-500" title="Batal" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" title="Simpan Materi" aria-label="Simpan Materi">
                                                                                        {isSavingContent ? 'Menyimpan...' : 'Simpan Materi'}
                                                                                    </button></div>
                                                                                </div>
                                                                            ) : (
                                                                                <button type="button" onClick={() => { handleAddNewContent(m._id) }} className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-400 font-bold hover:border-blue-300 hover:text-blue-600 mt-2 transition-colors flex items-center justify-center gap-2" aria-label="Tambah Konten"><Plus size={16}/> Tambah Konten</button>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
            )}

            {activeEditorTab === 'grading' && <GradingSchemeForm key={`grading-${courseId}`} courseId={courseId} modules={course.modules} refreshData={refreshData} facilitators={facilitators} />}
            {activeEditorTab === 'certificate' && <div className="space-y-8 animate-in slide-in-from-right-4"><div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"><h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">1. Unit Kompetensi</h2><CompetencyForm key={`comp-${courseId}`} initialData={competencies} onChange={(data) => setCompetencies(data)} /><div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200"><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={includeCompetencies} onChange={e=>setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Tampilkan Kompetensi"/><span className="text-sm font-bold text-gray-700">Tampilkan daftar kompetensi di halaman belakang sertifikat?</span></label><button type="button" onClick={handleSaveCompetencies} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors" title="Simpan Kompetensi" aria-label="Simpan Kompetensi">Simpan Kompetensi</button></div></div><div><h2 className="text-xl font-bold text-gray-800 mb-4 px-2">2. Pengaturan Sertifikat</h2><CertificateConfigForm key={`cert-${courseId}`} initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} courseTitle={course?.title || 'Judul Pelatihan'} /></div></div>}
            
            <div className="bg-white p-8 rounded-[32px] border border-gray-200 text-center flex flex-col items-center justify-center gap-4 mt-12 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>
                {!isPublished ? (
                    <><div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2"><Rocket size={32} /></div><h3 className="text-2xl font-black text-gray-900">Publikasi Pelatihan</h3><p className="text-gray-500 max-w-lg">Pastikan seluruh modul, materi, kuis, dan pengaturan sertifikat sudah lengkap sebelum mempublikasikan pelatihan ini.</p><button type="button" onClick={() => { setIsDisclaimerChecked(false); setShowPublishDisclaimer(true); }} className="px-10 py-4 rounded-2xl font-black text-white shadow-xl bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-3 uppercase tracking-wider text-sm mt-2" title="Publish Sekarang" aria-label="Publish Sekarang"><UploadCloud size={20}/> PUBLISH SEKARANG</button></>
                ) : (
                    <div className="flex flex-col items-center animate-in zoom-in"><div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 shadow-inner"><CheckCircle2 size={40}/></div><h3 className="text-2xl font-black text-green-800">Pelatihan Sedang Live</h3><p className="text-green-600 font-medium mt-1">Peserta sudah dapat mengakses materi ini.</p><button onClick={() => toggleStatus()} className="mt-6 text-xs text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-lg border border-red-100" title="Tarik Kembali (Unpublish)">Tarik Kembali (Unpublish)</button></div>
                )}
            </div>

            {showPublishDisclaimer && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 relative animate-in zoom-in-95">
                        <button type="button" onClick={() => setShowPublishDisclaimer(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-400" title="Tutup" aria-label="Tutup"><X size={20}/></button>
                        <div className="flex flex-col items-center text-center space-y-4"><div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"><ShieldCheck size={32}/></div><h3 className="text-xl font-bold text-gray-900">Konfirmasi Publikasi</h3><p className="text-sm text-gray-500 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">"Saya menyatakan bahwa materi pelatihan ini telah disusun dengan benar, tidak melanggar hak cipta, dan siap untuk dipublikasikan kepada peserta."</p><label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-blue-50 rounded-xl transition-colors w-full border border-gray-200"><input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" checked={isDisclaimerChecked} onChange={(e) => setIsDisclaimerChecked(e.target.checked)}/><span className="font-bold text-sm text-gray-700">Saya Setuju & Bertanggung Jawab</span></label><button onClick={handleFinalizeContent} disabled={!isDisclaimerChecked || isPublishing} className="w-full py-4 rounded-xl bg-green-600 text-white font-bold shadow-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2" title={isPublishing ? 'Memproses...' : '🚀 YA, PUBLISH PELATIHAN'}>{isPublishing ? 'Memproses...' : '🚀 YA, PUBLISH PELATIHAN'}</button></div>
                    </div>
                </div>
            )}
        </div>
    );
}
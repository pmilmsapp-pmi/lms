// // // // // // // // 'use client';

// // // // // // // // import { useState, useRef, useMemo } from 'react';
// // // // // // // // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // import CompetencyForm from '@/components/admin/CompetencyForm';
// // // // // // // // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // // // // // // // import {
// // // // // // // //     Calendar, School, RefreshCw, LogOut, CheckCircle2, 
// // // // // // // //     Link as LinkIcon, Users, FileText, Download,
// // // // // // // //     FileBadge, MapPin, UserCheck, Hash, BarChart3, 
// // // // // // // //     BookOpen, Trash2, Plus, Video, Image as ImageIcon
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
// // // // // // // //     facilitators: any[]; // List user fasilitator untuk dropdown
// // // // // // // // }

// // // // // // // // export default function CourseContentEditor({ course, courseId, refreshData, facilitators }: CourseContentEditorProps) {
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
// // // // // // // //     const [activeModId, setActiveModId] = useState<string | null>(null); // Modul mana yang sedang dibuka form-nya
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

// // // // // // // //     // --- STATE QUIZ / POLL / ESSAY ---
// // // // // // // //     const [quizDuration, setQuizDuration] = useState(10);
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

// // // // // // // //     // --- STATE SETTINGS LAIN ---
// // // // // // // //     const [competencies, setCompetencies] = useState<any[]>(course?.competencies || []);
// // // // // // // //     const [includeCompetencies, setIncludeCompetencies] = useState(course?.includeCompetenciesInCertificate ?? true);
// // // // // // // //     const [certConfig, setCertConfig] = useState<any>(course?.certificateConfig || {});
// // // // // // // //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// // // // // // // //     const [isSavingCert, setIsSavingCert] = useState(false);
// // // // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
// // // // // // // //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>(
// // // // // // // //         course?.facilitatorIds?.map((f: any) => (typeof f === 'object' ? f._id : f)) || []
// // // // // // // //     );

// // // // // // // //     // Filter tim fasilitator yang aktif di course ini
// // // // // // // //     const activeTeam = facilitators.filter((u: any) => selectedFacilitatorIds.includes(u._id) || u.role === 'SUPER_ADMIN');

// // // // // // // //     const quillModules = useMemo(() => ({ 
// // // // // // // //         toolbar: { container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'image', 'video'], [{ 'color': [] }, { 'background': [] }], ['clean']] } 
// // // // // // // //     }), []);

// // // // // // // //     // --- HELPER FUNCTIONS ---
// // // // // // // //     const getFacilitatorName = (data: any) => { 
// // // // // // // //         if (!data) return null; 
// // // // // // // //         if (typeof data === 'object' && data.name) return data.name; 
// // // // // // // //         const found = facilitators.find(f => f._id === data || f.id === data); 
// // // // // // // //         return found ? found.name : 'Unknown'; 
// // // // // // // //     };

// // // // // // // //     // --- LOGIC MODUL ---
// // // // // // // //     const resetModuleForm = () => { setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false); };
    
// // // // // // // //     const startEditModule = (mod: any) => { 
// // // // // // // //         setModTitle(mod.title); 
// // // // // // // //         setModIsMandatory(mod.isMandatory !== false); 
// // // // // // // //         setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); 
// // // // // // // //         setModJp(mod.jp || 0); 
// // // // // // // //         setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); 
// // // // // // // //         setEditingModId(mod._id); 
// // // // // // // //         setShowModuleForm(true); 
// // // // // // // //     };

// // // // // // // //     const handleSaveModule = async () => { 
// // // // // // // //         if (!modTitle.trim()) return alert("Judul wajib"); 
// // // // // // // //         const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: modFacilitatorId || null, jp: modJp, scheduleDate: modSchedule || null }; 
// // // // // // // //         try { 
// // // // // // // //             if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); 
// // // // // // // //             else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); 
// // // // // // // //             resetModuleForm(); 
// // // // // // // //             refreshData(); 
// // // // // // // //         } catch(e: any) { alert(e.message); } 
// // // // // // // //     };

// // // // // // // //     // --- LOGIC LESSON ---
// // // // // // // //     const resetLessonForm = () => { 
// // // // // // // //         setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesIsMandatory(true); setLesContent(''); setSelectedFile(null); setLesJp(0); setLesFacilitatorId(''); setLesSchedule(''); 
// // // // // // // //         setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // // // // // // //         setQuizDuration(10); setPollQuestion(''); setPollOptions(['', '']); setSelectedClassroom(null); setEssayQuestions(['']); setUseEssayTimer(false); 
// // // // // // // //     };

// // // // // // // //     const handleAddNewContent = (modId: string) => { 
// // // // // // // //         resetLessonForm(); 
// // // // // // // //         setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); 
// // // // // // // //     };

// // // // // // // //     const startEditLesson = (modId: string, les: any) => { 
// // // // // // // //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title); 
// // // // // // // //         if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { 
// // // // // // // //             setLesType('essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); 
// // // // // // // //             if(les.quizDuration) { setUseEssayTimer(true); setQuizDuration(les.quizDuration); } else { setUseEssayTimer(false); } 
// // // // // // // //         } else { setLesType(les.type); } 
// // // // // // // //         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); 
// // // // // // // //         setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || '')); 
// // // // // // // //         if (les.type === 'video_url') setLesContent(les.videoUrl||''); 
// // // // // // // //         else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); 
// // // // // // // //         else if (les.type !== 'essay') setLesContent(les.content||''); 
// // // // // // // //         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(les.quizDuration||10); } 
// // // // // // // //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); } 
// // // // // // // //         if (les.type === 'google_classroom') { 
// // // // // // // //             const token = localStorage.getItem('google_class_token');
// // // // // // // //             if(token) { setGoogleToken(token); fetchClassroomCourses(token); }
// // // // // // // //             if(les.classroomData) setSelectedClassroom(les.classroomData); 
// // // // // // // //         } else { setSelectedClassroom(null); } 
// // // // // // // //         setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150); 
// // // // // // // //     };

// // // // // // // //     const handleSaveLesson = async (modId: string) => { 
// // // // // // // //         if (!lesTitle.trim()) { alert("Judul wajib"); return; } 
// // // // // // // //         let fileUrl = ''; 
// // // // // // // //         if (selectedFile) { 
// // // // // // // //             try { 
// // // // // // // //                 setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); 
// // // // // // // //                 const res = await apiUpload('/api/upload', fd); fileUrl = res.url || res.file?.url || res.imageUrl; 
// // // // // // // //             } catch (err) { alert("Gagal upload"); return; } finally { setUploading(false); } 
// // // // // // // //         } else if (editingLesId) { 
// // // // // // // //             const mod = course?.modules.find((m: any) => m._id === modId); 
// // // // // // // //             const les = mod?.lessons.find((l: any) => l._id === editingLesId); 
// // // // // // // //             if (les) fileUrl = les.fileUrl; 
// // // // // // // //         } 
// // // // // // // //         const body: any = { title: lesTitle, type: lesType, isActive: true, isMandatory: lesIsMandatory, jp: lesJp, facilitatorId: lesFacilitatorId || null, scheduleDate: lesSchedule || null, questions: (lesType === 'quiz') ? questions : undefined, quizDuration: (lesType === 'quiz' || (lesType === 'essay' && useEssayTimer)) ? quizDuration : undefined, pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined }; 
// // // // // // // //         if (lesType === 'essay') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; } 
// // // // // // // //         if(fileUrl) body.fileUrl = fileUrl; 
// // // // // // // //         if(lesType === 'video_url') body.videoUrl = lesContent; 
// // // // // // // //         else if(lesType === 'virtual_class') body.meetingLink = lesContent; 
// // // // // // // //         else if(lesType === 'upload_doc' || lesType === 'lesson') body.content = lesContent; 
// // // // // // // //         try { 
// // // // // // // //             if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); 
// // // // // // // //             else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); 
// // // // // // // //             resetLessonForm(); 
// // // // // // // //             refreshData(); 
// // // // // // // //         } catch(e:any) { alert(e.message); } 
// // // // // // // //     };

// // // // // // // //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); refreshData(); };
// // // // // // // //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); refreshData(); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); refreshData(); } } catch (e: any) { alert(e.message); } };

// // // // // // // //     // --- DRAG & DROP ---
// // // // // // // //     const onDragEnd = async (result: DropResult) => { 
// // // // // // // //         const { source, destination, type } = result; 
// // // // // // // //         if (!destination) return; 
// // // // // // // //         const newCourse = JSON.parse(JSON.stringify(course)); 
// // // // // // // //         if (type === 'module') { 
// // // // // // // //             const [removed] = newCourse.modules.splice(source.index, 1); 
// // // // // // // //             newCourse.modules.splice(destination.index, 0, removed); 
// // // // // // // //         } else if (type === 'lesson') { 
// // // // // // // //             const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); 
// // // // // // // //             const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); 
// // // // // // // //             if (sourceModIdx === -1 || destModIdx === -1) return; 
// // // // // // // //             const sourceLessons = newCourse.modules[sourceModIdx].lessons; 
// // // // // // // //             const [removed] = sourceLessons.splice(source.index, 1); 
// // // // // // // //             newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); 
// // // // // // // //         } 
// // // // // // // //         // Optimistic UI Update not implemented here to keep props clean, relying on refreshData
// // // // // // // //         try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); refreshData(); } catch (err) { refreshData(); } 
// // // // // // // //     };

// // // // // // // //     // --- UTILS (Form Handlers) ---
// // // // // // // //     const addPollOption = () => setPollOptions([...pollOptions, '']); 
// // // // // // // //     const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; 
// // // // // // // //     const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); };
// // // // // // // //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // // // // // // //     const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; 
// // // // // // // //     const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); };
// // // // // // // //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); 
// // // // // // // //     const updateEssay = (idx: number, val: string) => { const newQ = [...essayQuestions]; newQ[idx] = val; setEssayQuestions(newQ); }; 
// // // // // // // //     const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };

// // // // // // // //     // --- GOOGLE CLASSROOM ---
// // // // // // // //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); window.open(url, 'GoogleAuthPopup', `width=500,height=600`); } catch (e) { alert("Gagal Auth Google"); } };
// // // // // // // //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } };
// // // // // // // //     const fetchClassroomCourses = async (tokenOverride?: string) => { 
// // // // // // // //         const token = tokenOverride || googleToken; 
// // // // // // // //         if (!token) return; 
// // // // // // // //         try { 
// // // // // // // //             setIsCheckingGoogle(true); 
// // // // // // // //             const data = await api('/api/classroom/courses', { headers: { 'x-google-token': token } });
// // // // // // // //             if (data.courses) setClassroomCourses(data.courses); 
// // // // // // // //         } catch (e: any) { 
// // // // // // // //             if(e.status === 401 || e.message?.includes('401')) { localStorage.removeItem('google_class_token'); setGoogleToken(null); }
// // // // // // // //         } finally { setIsCheckingGoogle(false); } 
// // // // // // // //     };

// // // // // // // //     // --- SETTINGS LAIN ---
// // // // // // // //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { 
// // // // // // // //         const file = e.target.files?.[0]; if (!file) return; 
// // // // // // // //         try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); await apiUpload(`/api/upload/course/${courseId}/cover`, formData); refreshData(); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } 
// // // // // // // //     };
// // // // // // // //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); alert("Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// // // // // // // //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };
    
// // // // // // // //     // --- TIM FACILITATOR ---
// // // // // // // //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); };
// // // // // // // //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } };

// // // // // // // //     return (
// // // // // // // //         <div className="animate-in fade-in duration-300 space-y-8">
// // // // // // // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // // //                 {/* KOLOM KIRI: COVER & TIM */}
// // // // // // // //                 <div className="md:col-span-1 space-y-6">
// // // // // // // //                     <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
// // // // // // // //                         {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
// // // // // // // //                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
// // // // // // // //                             <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Ganti Cover">{isUploadingCover ? '...' : '📷 Ganti'}</button>
// // // // // // // //                             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Upload Cover"/>
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
// // // // // // // //                         <div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" aria-label="Simpan Tim">Simpan</button></div>
// // // // // // // //                         <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">
// // // // // // // //                             {facilitators.map((user: any) => (
// // // // // // // //                                 <label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}>
// // // // // // // //                                     <input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih ${user.name}`} />
// // // // // // // //                                     <div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div>
// // // // // // // //                                 </label>
// // // // // // // //                             ))}
// // // // // // // //                         </div>
// // // // // // // //                         <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" />
// // // // // // // //                     </div>
// // // // // // // //                 </div>

// // // // // // // //                 {/* KOLOM KANAN: STRUKTUR MODUL */}
// // // // // // // //                 <div className="md:col-span-2 space-y-6">
// // // // // // // //                     <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">Struktur Modul</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 flex items-center gap-2" aria-label="Tambah Modul">+ Tambah Modul</button></div>
// // // // // // // //                     {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul"/><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" aria-label="JP"/></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih PJ"><option value="">-- Pilih Fasilitator --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal" /></div></div><div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetModuleForm} className="text-sm text-gray-500 font-bold" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold" aria-label="Simpan">Simpan</button></div></form>)}
                    
// // // // // // // //                     <DragDropContext onDragEnd={onDragEnd}>
// // // // // // // //                         <Droppable droppableId="all-modules" type="module">
// // // // // // // //                             {(provided) => (
// // // // // // // //                                 <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
// // // // // // // //                                     {course?.modules?.map((m: any, idx: number) => (
// // // // // // // //                                         <Draggable key={m._id} draggableId={m._id} index={idx}>
// // // // // // // //                                             {(provided) => (
// // // // // // // //                                                 <div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-xl overflow-hidden bg-white shadow-sm">
// // // // // // // //                                                     <div className="bg-gray-50 p-3 flex justify-between items-center" {...provided.dragHandleProps}>
// // // // // // // //                                                         <div className="flex items-center gap-3"><span className="cursor-grab text-gray-400" aria-label="Drag Modul">☰</span><div><span className="font-bold text-gray-700">{m.title}</span><div className="flex gap-2 text-[10px] mt-1 text-gray-500 font-medium"><span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">{m.jp} JP</span>{m.facilitatorId && <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100 flex items-center gap-1">👤 {getFacilitatorName(m.facilitatorId)}</span>}{m.scheduleDate && <span className="bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded border border-yellow-100 flex items-center gap-1">📅 {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}</div></div></div>
// // // // // // // //                                                         <div className="flex gap-2"><button type="button" onClick={() => startEditModule(m)} className="text-xs text-blue-600 font-bold" aria-label="Edit">Edit</button><button type="button" onClick={() => toggleStatus(m._id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${m.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Modul"><span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${m.isActive ? 'translate-x-4' : 'translate-x-1'}`} /></button></div>
// // // // // // // //                                                     </div>
// // // // // // // //                                                     <Droppable droppableId={m._id} type="lesson">
// // // // // // // //                                                         {(provided) => (
// // // // // // // //                                                             <div ref={provided.innerRef} {...provided.droppableProps} className="p-3 space-y-2">
// // // // // // // //                                                                 {m.lessons?.map((l: any, lIdx: number) => (
// // // // // // // //                                                                     <Draggable key={l._id} draggableId={l._id} index={lIdx}>
// // // // // // // //                                                                         {(provided) => (
// // // // // // // //                                                                             <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-2 bg-white border rounded hover:bg-gray-50">
// // // // // // // //                                                                                 <div className="flex gap-2 items-center"><span className="cursor-grab text-gray-400" aria-hidden="true">::</span><span className="text-lg" aria-hidden="true">{l.type === 'video_url' ? '🎞️' : l.type === 'quiz' ? '📝' : l.type === 'essay' ? '✍️' : '📄'}</span><div><p className="text-sm font-bold text-gray-800">{l.title}</p><div className="flex gap-2 items-center flex-wrap mt-0.5"><span className="text-[10px] text-gray-500 uppercase font-bold">{l.type}</span>{l.jp > 0 && <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 rounded border border-blue-100 font-medium">{l.jp} JP</span>}{l.isMandatory ? <span className="text-[10px] bg-red-50 text-red-700 px-1.5 rounded border border-red-100 font-medium">Wajib</span> : <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 rounded border font-medium">Opsional</span>}{l.facilitatorId && <span className="text-[10px] text-purple-600 flex items-center gap-1 font-medium">👤 {getFacilitatorName(l.facilitatorId)}</span>}{l.scheduleDate && <span className="text-[10px] text-blue-600 flex items-center gap-1 font-medium">📅 {new Date(l.scheduleDate).toLocaleDateString('id-ID')}</span>}</div></div></div>
// // // // // // // //                                                                                 <div className="flex gap-2 items-center"><button type="button" onClick={() => startEditLesson(m._id, l)} className="text-blue-500 text-xs font-bold" aria-label="Edit">Edit</button><button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-red-500 text-xs font-bold" aria-label="Hapus">Hapus</button><button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${l.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Lesson"><span className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${l.isActive ? 'translate-x-3.5' : 'translate-x-0.5'}`} /></button></div>
// // // // // // // //                                                                             </div>
// // // // // // // //                                                                         )}
// // // // // // // //                                                                     </Draggable>
// // // // // // // //                                                                 ))}
// // // // // // // //                                                                 {provided.placeholder}
// // // // // // // //                                                                 {activeModId === m._id ? (
// // // // // // // //                                                                     <div id={`form-${m._id}`} className="bg-blue-50 p-4 rounded border border-blue-200 mt-2 space-y-3">
// // // // // // // //                                                                         <div className="grid grid-cols-12 gap-2"><div className="col-span-4"><select className="w-full p-2 border rounded text-sm bg-white" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Tipe Konten"><option value="lesson">📄 Teks Materi</option><option value="video_url">🎞️ Video YouTube</option><option value="essay">📝 Esai</option><option value="quiz">🧩 Kuis Pilihan Ganda</option><option value="upload_doc">📤 Tugas Upload</option><option value="virtual_class">🎥 Kelas Virtual</option><option value="poll">📊 Polling</option><option value="google_classroom">🏫 Google Classroom</option></select></div><div className="col-span-6"><input className="w-full p-2 border rounded text-sm" placeholder="Judul Materi..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi"/></div><div className="col-span-2"><input type="number" className="w-full p-2 border rounded text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="JP"/></div></div>
// // // // // // // //                                                                         <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded border border-blue-100"><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Fasilitator (Opsional)</label><select className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesFacilitatorId} onChange={e=>setLesFacilitatorId(e.target.value)} aria-label="Pilih Fasilitator"><option value="">-- Ikut Modul --</option>{activeTeam.map((f:any)=><option key={f._id} value={f._id}>{f.name}</option>)}</select></div><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesSchedule} onChange={e=>setLesSchedule(e.target.value)} aria-label="Tanggal" /></div><div className="flex items-center h-full pt-4"><label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e=>setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib"/> Wajib diselesaikan?</label></div></div>
// // // // // // // //                                                                         {lesType === 'essay' && (<div className="bg-white p-3 rounded border"><div className="mb-2"><label className="text-xs font-bold text-gray-500">Instruksi Soal:</label><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-32 mb-10"/></div><label className="text-xs font-bold text-gray-500 block mt-4">Pertanyaan Esai:</label>{essayQuestions.map((q, ix) => (<div key={ix} className="flex gap-2 mb-2"><textarea className="flex-1 p-2 border rounded text-sm h-16" value={q} onChange={e=>updateEssay(ix, e.target.value)} placeholder={`Pertanyaan ${ix+1}`} aria-label={`Tanya ${ix+1}`}/>{essayQuestions.length > 1 && <button type="button" onClick={()=>removeEssay(ix)} className="text-red-500 font-bold" aria-label="Hapus">x</button>}</div>))}<button type="button" onClick={addEssayRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Tanya">+ Tambah Pertanyaan</button><div className="mt-3 flex items-center gap-2 bg-amber-50 p-2 rounded"><label className="text-xs font-bold text-amber-800">⏱ Timer (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="w-16 border p-1 rounded text-xs" aria-label="Durasi"/><label className="text-xs ml-2"><input type="checkbox" checked={useEssayTimer} onChange={e=>setUseEssayTimer(e.target.checked)} aria-label="Aktifkan Timer"/> Aktifkan</label></div></div>)}
// // // // // // // //                                                                         {lesType === 'quiz' && (<div className="bg-white p-3 rounded border"><div className="flex gap-2 items-center mb-2"><label className="text-xs font-bold">Durasi (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="w-20 border p-1 rounded" aria-label="Durasi"/></div>{questions.map((q, ix) => (<div key={ix} className="p-2 border rounded bg-gray-50 mb-2 relative"><button type="button" onClick={()=>removeQuestion(ix)} className="absolute top-1 right-1 text-red-500 font-bold text-xs" aria-label="Hapus Soal">x</button><input className="w-full p-1 border rounded mb-1 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e=>updateQuestion(ix, 'question', e.target.value)} aria-label={`Pertanyaan ${ix+1}`}/><div className="grid grid-cols-2 gap-2">{q.options.map((o:string, oi:number) => <input key={oi} className={`w-full p-1 border text-xs ${q.correctIndex===oi?'bg-green-100 border-green-300':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix, 'options', e.target.value, oi)} aria-label={`Opsi ${oi+1}`}/>)}</div><div className="mt-1 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix, 'correctIndex', Number(e.target.value))} className="w-10 border" aria-label="Jawaban Benar"/></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}
// // // // // // // //                                                                         {lesType === 'poll' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} aria-label="Tanya Polling"/>{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2 mb-1"><input className="flex-1 p-1 border rounded text-xs" value={opt} onChange={e=>updatePollOption(idx, e.target.value)} placeholder={`Opsi ${idx+1}`} aria-label={`Opsi ${idx+1}`}/>{pollOptions.length > 2 && <button onClick={()=>removePollOption(idx)} className="text-red-500 font-bold" aria-label="Hapus">x</button>}</div>))}<button type="button" onClick={addPollOption} className="text-xs text-blue-600 font-bold" aria-label="Tambah Opsi">+ Opsi</button></div>)}
// // // // // // // //                                                                         {['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded border"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-48 mb-12" placeholder="Tulis materi..."/></div>)}
// // // // // // // //                                                                         {lesType === 'video_url' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded text-sm" placeholder="Link YouTube..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Video"/></div>)}
// // // // // // // //                                                                         {lesType === 'virtual_class' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded text-sm" placeholder="Link Zoom/Meet..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Zoom"/></div>)}
// // // // // // // //                                                                         {lesType === 'google_classroom' && (<div className="bg-white p-4 rounded border border-green-200 space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Class"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putus Akun"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}</div>)}
// // // // // // // //                                                                         {['image','download_doc','slide'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Upload File"/></div>)}
// // // // // // // //                                                                         <div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetLessonForm} className="text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" aria-label="Simpan Materi">Simpan Materi</button></div>
// // // // // // // //                                                                     </div>
// // // // // // // //                                                                 ) : (
// // // // // // // //                                                                     <button type="button" onClick={()=>{handleAddNewContent(m._id)}} className="w-full py-2 border-2 border-dashed border-gray-200 rounded text-xs text-gray-400 font-bold hover:border-blue-300 hover:text-blue-600 mt-2" aria-label="Tambah Konten">+ Tambah Konten</button>
// // // // // // // //                                                                 )}
// // // // // // // //                                                             </div>
// // // // // // // //                                                         )}
// // // // // // // //                                                     </Droppable>
// // // // // // // //                                                 </div>
// // // // // // // //                                             )}
// // // // // // // //                                         </Draggable>
// // // // // // // //                                     ))}
// // // // // // // //                                     {provided.placeholder}
// // // // // // // //                                 </div>
// // // // // // // //                             )}
// // // // // // // //                         </Droppable>
// // // // // // // //                     </DragDropContext>
// // // // // // // //                 </div>
// // // // // // // //             </div>

// // // // // // // //             {/* SETTINGS BAWAH */}
// // // // // // // //             <div className="border-t pt-8 space-y-8">
// // // // // // // //                 <div><h2 className="text-xl font-bold text-gray-800 mb-4">Unit Kompetensi</h2><CompetencyForm initialData={competencies} onChange={(data) => setCompetencies(data)} /><div className="mt-4 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200"><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={includeCompetencies} onChange={e=>setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Tampilkan Kompetensi"/><span className="text-sm font-bold text-gray-700">Tampilkan daftar kompetensi di halaman belakang sertifikat?</span></label><button type="button" onClick={handleSaveCompetencies} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button></div></div>
// // // // // // // //                 <div><h2 className="text-xl font-bold text-gray-800 mb-4">Pengaturan Sertifikat</h2><CertificateConfigForm initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} />{certConfig && (<div className="mt-6 border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 shadow-sm"><div className="bg-gray-50 px-5 py-3 border-b flex items-center gap-2 font-bold text-gray-700 text-sm"><FileBadge size={16}/> Data Konfigurasi Tersimpan (Preview)</div><div className="p-5 bg-white grid grid-cols-1 md:grid-cols-2 gap-6 text-sm"><div><p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><Hash size={12}/> Format Nomor</p><p className="font-mono bg-gray-50 border px-3 py-2 rounded text-gray-800">{certConfig.certificateNumber || '-'}</p></div><div><p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><Calendar size={12}/> Tanggal Pelaksanaan</p><p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{certConfig.executionDate ? new Date(certConfig.executionDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '-'}</p></div><div><p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><MapPin size={12}/> Kota Penerbit</p><p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{certConfig.city || '-'}</p></div><div><p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><UserCheck size={12}/> Penanda Tangan</p><p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{certConfig.signatoryName} <span className="font-normal text-gray-500 text-xs block">({certConfig.signatoryPosition})</span></p></div></div></div>)}</div>
// // // // // // // //             </div>
            
// // // // // // // //             <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3"><h3 className="text-lg font-bold text-gray-800">Status Publikasi</h3><button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Ubah Status">{course?.isPublished ? 'Tarik Kembali (Draft)' : '🚀 PUBLISH SEKARANG'}</button></div>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // }
// // // // // // // 'use client';

// // // // // // // import { useState, useRef, useMemo } from 'react';
// // // // // // // import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // import CompetencyForm from '@/components/admin/CompetencyForm';
// // // // // // // import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
// // // // // // // import {
// // // // // // //     Calendar, School, RefreshCw, LogOut, CheckCircle2, 
// // // // // // //     Link as LinkIcon, Users, FileText, Download,
// // // // // // //     FileBadge, MapPin, UserCheck, Hash, BarChart3, 
// // // // // // //     BookOpen, Trash2, Plus, Video, Image as ImageIcon
// // // // // // // } from 'lucide-react';

// // // // // // // import dynamic from 'next/dynamic';
// // // // // // // import 'react-quill/dist/quill.snow.css'; 

// // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // //     ssr: false,
// // // // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // // // });

// // // // // // // interface CourseContentEditorProps {
// // // // // // //     course: any;
// // // // // // //     courseId: string;
// // // // // // //     refreshData: () => void;
// // // // // // //     facilitators: any[]; 
// // // // // // // }

// // // // // // // export default function CourseContentEditor({ course, courseId, refreshData, facilitators }: CourseContentEditorProps) {
// // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // // // // // //     const [isUploadingCover, setIsUploadingCover] = useState(false);
    
// // // // // // //     // --- STATE MODUL ---
// // // // // // //     const [showModuleForm, setShowModuleForm] = useState(false);
// // // // // // //     const [modTitle, setModTitle] = useState('');
// // // // // // //     const [modIsMandatory, setModIsMandatory] = useState(true);
// // // // // // //     const [modFacilitatorId, setModFacilitatorId] = useState('');
// // // // // // //     const [modJp, setModJp] = useState(0);
// // // // // // //     const [modSchedule, setModSchedule] = useState('');
// // // // // // //     const [editingModId, setEditingModId] = useState<string | null>(null);

// // // // // // //     // --- STATE LESSON (MATERI) ---
// // // // // // //     const [activeModId, setActiveModId] = useState<string | null>(null); 
// // // // // // //     const [editingLesId, setEditingLesId] = useState<string | null>(null);
    
// // // // // // //     const [lesTitle, setLesTitle] = useState('');
// // // // // // //     const [lesType, setLesType] = useState('lesson');
// // // // // // //     const [lesContent, setLesContent] = useState('');
// // // // // // //     const [lesIsMandatory, setLesIsMandatory] = useState(true);
// // // // // // //     const [lesJp, setLesJp] = useState(0);
// // // // // // //     const [lesSchedule, setLesSchedule] = useState('');
// // // // // // //     const [lesFacilitatorId, setLesFacilitatorId] = useState('');
// // // // // // //     const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // // // // //     const [uploading, setUploading] = useState(false);

// // // // // // //     // --- STATE QUIZ / POLL / ESSAY ---
// // // // // // //     const [quizDuration, setQuizDuration] = useState(10);
// // // // // // //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// // // // // // //     const [pollQuestion, setPollQuestion] = useState('');
// // // // // // //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
// // // // // // //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// // // // // // //     const [useEssayTimer, setUseEssayTimer] = useState(false);

// // // // // // //     // --- STATE GOOGLE CLASSROOM ---
// // // // // // //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// // // // // // //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// // // // // // //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// // // // // // //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// // // // // // //     // --- STATE SETTINGS LAIN ---
// // // // // // //     const [competencies, setCompetencies] = useState<any[]>(course?.competencies || []);
// // // // // // //     const [includeCompetencies, setIncludeCompetencies] = useState(course?.includeCompetenciesInCertificate ?? true);
// // // // // // //     const [certConfig, setCertConfig] = useState<any>(course?.certificateConfig || {});
// // // // // // //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// // // // // // //     const [isSavingCert, setIsSavingCert] = useState(false);
// // // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
// // // // // // //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>(
// // // // // // //         course?.facilitatorIds?.map((f: any) => (typeof f === 'object' ? f._id : f)) || []
// // // // // // //     );

// // // // // // //     // Filter tim fasilitator yang aktif di course ini
// // // // // // //     const activeTeam = facilitators.filter((u: any) => selectedFacilitatorIds.includes(u._id) || u.role === 'SUPER_ADMIN');

// // // // // // //     const quillModules = useMemo(() => ({ 
// // // // // // //         toolbar: { container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'image', 'video'], [{ 'color': [] }, { 'background': [] }], ['clean']] } 
// // // // // // //     }), []);

// // // // // // //     // --- HELPER FUNCTIONS ---
// // // // // // //     const getFacilitatorName = (data: any) => { 
// // // // // // //         if (!data) return null; 
// // // // // // //         if (typeof data === 'object' && data.name) return data.name; 
// // // // // // //         const found = facilitators.find(f => f._id === data || f.id === data); 
// // // // // // //         return found ? found.name : 'Unknown'; 
// // // // // // //     };

// // // // // // //     // --- LOGIC MODUL ---
// // // // // // //     const resetModuleForm = () => { setModTitle(''); setModIsMandatory(true); setModFacilitatorId(''); setModJp(0); setModSchedule(''); setEditingModId(null); setShowModuleForm(false); };
    
// // // // // // //     const startEditModule = (mod: any) => { 
// // // // // // //         setModTitle(mod.title); 
// // // // // // //         setModIsMandatory(mod.isMandatory !== false); 
// // // // // // //         setModFacilitatorId((mod.facilitatorId?._id) || (mod.facilitatorId || '')); 
// // // // // // //         setModJp(mod.jp || 0); 
// // // // // // //         setModSchedule(mod.scheduleDate ? new Date(mod.scheduleDate).toISOString().split('T')[0] : ''); 
// // // // // // //         setEditingModId(mod._id); 
// // // // // // //         setShowModuleForm(true); 
// // // // // // //     };

// // // // // // //     const handleSaveModule = async () => { 
// // // // // // //         if (!modTitle.trim()) return alert("Judul wajib"); 
// // // // // // //         const body = { title: modTitle, isActive: true, isMandatory: modIsMandatory, facilitatorId: modFacilitatorId || null, jp: modJp, scheduleDate: modSchedule || null }; 
// // // // // // //         try { 
// // // // // // //             if (editingModId) await api(`/api/courses/${courseId}/modules/${editingModId}`, { method: 'PUT', body }); 
// // // // // // //             else await api(`/api/courses/${courseId}/modules`, { method: 'POST', body }); 
// // // // // // //             resetModuleForm(); 
// // // // // // //             refreshData(); 
// // // // // // //         } catch(e: any) { alert(e.message); } 
// // // // // // //     };

// // // // // // //     // --- LOGIC LESSON ---
// // // // // // //     const resetLessonForm = () => { 
// // // // // // //         setActiveModId(null); setEditingLesId(null); setLesTitle(''); setLesIsMandatory(true); setLesContent(''); setSelectedFile(null); setLesJp(0); setLesFacilitatorId(''); setLesSchedule(''); 
// // // // // // //         setQuestions([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // // // // // //         setQuizDuration(10); setPollQuestion(''); setPollOptions(['', '']); setSelectedClassroom(null); setEssayQuestions(['']); setUseEssayTimer(false); 
// // // // // // //     };

// // // // // // //     const handleAddNewContent = (modId: string) => { 
// // // // // // //         resetLessonForm(); 
// // // // // // //         setTimeout(() => { setActiveModId(modId); setLesType('lesson'); const formEl = document.getElementById(`form-${modId}`); formEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); 
// // // // // // //     };

// // // // // // //     const startEditLesson = (modId: string, les: any) => { 
// // // // // // //         setActiveModId(modId); setEditingLesId(les._id); setLesTitle(les.title); 
// // // // // // //         if (les.type === 'essay' || (les.type === 'quiz' && les.questions && les.questions[0]?.options?.length === 0)) { 
// // // // // // //             setLesType('essay'); setEssayQuestions(les.questions.map((q:any) => q.question)); setLesContent(les.content || ''); 
// // // // // // //             if(les.quizDuration) { setUseEssayTimer(true); setQuizDuration(les.quizDuration); } else { setUseEssayTimer(false); } 
// // // // // // //         } else { setLesType(les.type); } 
// // // // // // //         setLesIsMandatory(les.isMandatory !== false); setLesJp(les.jp || 0); setLesSchedule(les.scheduleDate ? new Date(les.scheduleDate).toISOString().split('T')[0] : ''); 
// // // // // // //         setLesFacilitatorId((les.facilitatorId?._id) || (les.facilitatorId || '')); 
// // // // // // //         if (les.type === 'video_url') setLesContent(les.videoUrl||''); 
// // // // // // //         else if (les.type === 'virtual_class') setLesContent(les.meetingLink||''); 
// // // // // // //         else if (les.type !== 'essay') setLesContent(les.content||''); 
// // // // // // //         if (les.type === 'quiz') { setQuestions(les.questions||[{ question: '', options: ['', '', '', ''], correctIndex: 0 }]); setQuizDuration(les.quizDuration||10); } 
// // // // // // //         if (les.type === 'poll') { setPollQuestion(les.pollQuestion || ''); setPollOptions(les.pollOptions?.length ? les.pollOptions : ['', '']); } 
// // // // // // //         if (les.type === 'google_classroom') { 
// // // // // // //             const token = localStorage.getItem('google_class_token');
// // // // // // //             if(token) { setGoogleToken(token); fetchClassroomCourses(token); }
// // // // // // //             if(les.classroomData) setSelectedClassroom(les.classroomData); 
// // // // // // //         } else { setSelectedClassroom(null); } 
// // // // // // //         setTimeout(() => { const formElement = document.getElementById(`form-${modId}`); if(formElement) { formElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, 150); 
// // // // // // //     };

// // // // // // //     const handleSaveLesson = async (modId: string) => { 
// // // // // // //         if (!lesTitle.trim()) { alert("Judul wajib"); return; } 
// // // // // // //         let fileUrl = ''; 
// // // // // // //         if (selectedFile) { 
// // // // // // //             try { 
// // // // // // //                 setUploading(true); const fd = new FormData(); fd.append('file', selectedFile); 
// // // // // // //                 const res = await apiUpload('/api/upload', fd); fileUrl = res.url || res.file?.url || res.imageUrl; 
// // // // // // //             } catch (err) { alert("Gagal upload"); return; } finally { setUploading(false); } 
// // // // // // //         } else if (editingLesId) { 
// // // // // // //             const mod = course?.modules.find((m: any) => m._id === modId); 
// // // // // // //             const les = mod?.lessons.find((l: any) => l._id === editingLesId); 
// // // // // // //             if (les) fileUrl = les.fileUrl; 
// // // // // // //         } 
// // // // // // //         const body: any = { title: lesTitle, type: lesType, isActive: true, isMandatory: lesIsMandatory, jp: lesJp, facilitatorId: lesFacilitatorId || null, scheduleDate: lesSchedule || null, questions: (lesType === 'quiz') ? questions : undefined, quizDuration: (lesType === 'quiz' || (lesType === 'essay' && useEssayTimer)) ? quizDuration : undefined, pollQuestion: (lesType === 'poll') ? pollQuestion : undefined, pollOptions: (lesType === 'poll') ? pollOptions.filter(o => o.trim() !== '') : undefined, classroomData: (lesType === 'google_classroom' && selectedClassroom) ? selectedClassroom : undefined }; 
// // // // // // //         if (lesType === 'essay') { body.questions = essayQuestions.map(q => ({ question: q, options: [], correctIndex: 0 })); body.content = lesContent; } 
// // // // // // //         if(fileUrl) body.fileUrl = fileUrl; 
// // // // // // //         if(lesType === 'video_url') body.videoUrl = lesContent; 
// // // // // // //         else if(lesType === 'virtual_class') body.meetingLink = lesContent; 
// // // // // // //         else if(lesType === 'upload_doc' || lesType === 'lesson') body.content = lesContent; 
// // // // // // //         try { 
// // // // // // //             if (editingLesId) await api(`/api/courses/${courseId}/modules/${modId}/lessons/${editingLesId}`, { method: 'PUT', body }); 
// // // // // // //             else await api(`/api/courses/${courseId}/modules/${modId}/lessons`, { method: 'POST', body }); 
// // // // // // //             resetLessonForm(); 
// // // // // // //             refreshData(); 
// // // // // // //         } catch(e:any) { alert(e.message); } 
// // // // // // //     };

// // // // // // //     const deleteItem = async (modId: string, lesId: string) => { if(!confirm("Hapus?")) return; await api(`/api/courses/${courseId}/modules/${modId}/lessons/${lesId}`, { method: 'DELETE' }); refreshData(); };
// // // // // // //     const toggleStatus = async (modId?: string, lesId?: string) => { try { if (!modId && !lesId) { const newStatus = !course?.isPublished; await api(`/api/courses/${courseId}`, { method: 'PUT', body: { isPublished: newStatus } }); refreshData(); } else { await api(`/api/courses/${courseId}/toggle-status`, { method: 'PATCH', body: { moduleId: modId, lessonId: lesId } }); refreshData(); } } catch (e: any) { alert(e.message); } };

// // // // // // //     // --- DRAG & DROP ---
// // // // // // //     const onDragEnd = async (result: DropResult) => { 
// // // // // // //         const { source, destination, type } = result; 
// // // // // // //         if (!destination) return; 
// // // // // // //         const newCourse = JSON.parse(JSON.stringify(course)); 
// // // // // // //         if (type === 'module') { 
// // // // // // //             const [removed] = newCourse.modules.splice(source.index, 1); 
// // // // // // //             newCourse.modules.splice(destination.index, 0, removed); 
// // // // // // //         } else if (type === 'lesson') { 
// // // // // // //             const sourceModIdx = newCourse.modules.findIndex((m: any) => m._id === source.droppableId); 
// // // // // // //             const destModIdx = newCourse.modules.findIndex((m: any) => m._id === destination.droppableId); 
// // // // // // //             if (sourceModIdx === -1 || destModIdx === -1) return; 
// // // // // // //             const sourceLessons = newCourse.modules[sourceModIdx].lessons; 
// // // // // // //             const [removed] = sourceLessons.splice(source.index, 1); 
// // // // // // //             newCourse.modules[destModIdx].lessons.splice(destination.index, 0, removed); 
// // // // // // //         } 
// // // // // // //         try { await api(`/api/courses/${courseId}/reorder`, { method: 'PATCH', body: { modules: newCourse.modules } }); refreshData(); } catch (err) { refreshData(); } 
// // // // // // //     };

// // // // // // //     // --- UTILS (Form Handlers) ---
// // // // // // //     const addPollOption = () => setPollOptions([...pollOptions, '']); 
// // // // // // //     const removePollOption = (idx: number) => { if (pollOptions.length <= 2) return; setPollOptions(pollOptions.filter((_, i) => i !== idx)); }; 
// // // // // // //     const updatePollOption = (idx: number, val: string) => { const newOpts = [...pollOptions]; newOpts[idx] = val; setPollOptions(newOpts); };
// // // // // // //     const addQuestionRow = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctIndex: 0 }]); 
// // // // // // //     const updateQuestion = (idx: number, field: string, value: any, optIdx?: number) => { const newQ = [...questions]; if (field === 'options' && typeof optIdx === 'number') newQ[idx].options[optIdx] = value; else newQ[idx][field] = value; setQuestions(newQ); }; 
// // // // // // //     const removeQuestion = (idx: number) => { if(questions.length > 1) setQuestions(questions.filter((_,i)=>i!==idx)); };
// // // // // // //     const addEssayRow = () => setEssayQuestions([...essayQuestions, '']); 
// // // // // // //     const updateEssay = (idx: number, val: string) => { const newQ = [...essayQuestions]; newQ[idx] = val; setEssayQuestions(newQ); }; 
// // // // // // //     const removeEssay = (idx: number) => { if(essayQuestions.length > 1) setEssayQuestions(essayQuestions.filter((_, i) => i !== idx)); };

// // // // // // //     // --- GOOGLE CLASSROOM ---
// // // // // // //     const handleConnectGoogle = async () => { try { const { url } = await api('/api/classroom/auth'); window.open(url, 'GoogleAuthPopup', `width=500,height=600`); } catch (e) { alert("Gagal Auth Google"); } };
// // // // // // //     const handleDisconnectGoogle = () => { if(confirm("Putuskan akun Google?")) { localStorage.removeItem('google_class_token'); setGoogleToken(null); setClassroomCourses([]); setSelectedClassroom(null); } };
// // // // // // //     const fetchClassroomCourses = async (tokenOverride?: string) => { 
// // // // // // //         const token = tokenOverride || googleToken; 
// // // // // // //         if (!token) return; 
// // // // // // //         try { 
// // // // // // //             setIsCheckingGoogle(true); 
// // // // // // //             const data = await api('/api/classroom/courses', { headers: { 'x-google-token': token } });
// // // // // // //             if (data.courses) setClassroomCourses(data.courses); 
// // // // // // //         } catch (e: any) { 
// // // // // // //             if(e.status === 401 || e.message?.includes('401')) { localStorage.removeItem('google_class_token'); setGoogleToken(null); }
// // // // // // //         } finally { setIsCheckingGoogle(false); } 
// // // // // // //     };

// // // // // // //     // --- SETTINGS LAIN ---
// // // // // // //     const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => { 
// // // // // // //         const file = e.target.files?.[0]; if (!file) return; 
// // // // // // //         try { setIsUploadingCover(true); const formData = new FormData(); formData.append('file', file); await apiUpload(`/api/upload/course/${courseId}/cover`, formData); refreshData(); } catch (error: any) { alert("Gagal: " + error.message); } finally { setIsUploadingCover(false); } 
// // // // // // //     };
// // // // // // //     const handleSaveCertConfig = async (data: any) => { try { setIsSavingCert(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { certificateConfig: data } }); alert("Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCert(false); } };
// // // // // // //     const handleSaveCompetencies = async () => { try { setIsSavingCompetencies(true); await api(`/api/courses/${courseId}`, { method: 'PUT', body: { competencies: competencies, includeCompetenciesInCertificate: includeCompetencies } }); alert("Disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } finally { setIsSavingCompetencies(false); } };
    
// // // // // // //     // --- TIM FACILITATOR ---
// // // // // // //     const handleToggleFacilitator = (id: string) => { if (selectedFacilitatorIds.includes(id)) setSelectedFacilitatorIds(prev => prev.filter(fid => fid !== id)); else setSelectedFacilitatorIds(prev => [...prev, id]); };
// // // // // // //     const handleUpdateFacilitators = async () => { if (selectedFacilitatorIds.length === 0) { alert("Minimal 1 pengelola!"); return; } try { await api(`/api/courses/${courseId}`, { method: 'PUT', body: { facilitatorIds: selectedFacilitatorIds } }); alert("Tim disimpan!"); refreshData(); } catch (e: any) { alert(e.message); } };

// // // // // // //     return (
// // // // // // //         <div className="animate-in fade-in duration-300 space-y-8">
// // // // // // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // //                 {/* KOLOM KIRI: COVER & TIM */}
// // // // // // //                 <div className="md:col-span-1 space-y-6">
// // // // // // //                     <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-video bg-gray-100">
// // // // // // //                         {course?.thumbnailUrl ? (<img src={getImageUrl(course.thumbnailUrl)} alt="Cover" className="w-full h-full object-cover" />) : (<div className="flex items-center justify-center h-full text-gray-300 text-5xl">🖼️</div>)}
// // // // // // //                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
// // // // // // //                             <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploadingCover} className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100" aria-label="Ganti Cover">{isUploadingCover ? '...' : '📷 Ganti'}</button>
// // // // // // //                             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} aria-label="Upload Cover"/>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
// // // // // // //                         <div className="flex justify-between items-center mb-4"><div><h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👥 Tim Fasilitator</h2></div><button type="button" onClick={handleUpdateFacilitators} className="text-blue-600 text-xs font-bold hover:underline" aria-label="Simpan Tim">Simpan</button></div>
// // // // // // //                         <div className="flex-1 overflow-y-auto max-h-40 bg-gray-50 rounded-xl border border-gray-200 p-2 space-y-1">
// // // // // // //                             {facilitators.map((user: any) => (
// // // // // // //                                 <label key={user._id} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedFacilitatorIds.includes(user._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}>
// // // // // // //                                     <input type="checkbox" checked={selectedFacilitatorIds.includes(user._id)} onChange={() => handleToggleFacilitator(user._id)} className="w-4 h-4 text-blue-600 rounded" aria-label={`Pilih ${user.name}`} />
// // // // // // //                                     <div className="flex-1 overflow-hidden"><div className="text-xs font-bold truncate">{user.name}</div><div className="text-[10px] text-gray-500 truncate">{user.email}</div></div>
// // // // // // //                                 </label>
// // // // // // //                             ))}
// // // // // // //                         </div>
// // // // // // //                         <input type="text" placeholder="Cari nama..." className="mt-2 w-full p-2 text-xs rounded border" value={searchFacilitator} onChange={(e)=>setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator" />
// // // // // // //                     </div>
// // // // // // //                 </div>

// // // // // // //                 {/* KOLOM KANAN: STRUKTUR MODUL */}
// // // // // // //                 <div className="md:col-span-2 space-y-6">
// // // // // // //                     <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">Struktur Modul</h2><button type="button" onClick={() => { resetModuleForm(); setShowModuleForm(true); }} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 flex items-center gap-2" aria-label="Tambah Modul">+ Tambah Modul</button></div>
// // // // // // //                     {showModuleForm && (<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 p-5 bg-red-50 rounded-xl border-dashed border-2 border-red-200"><div className="flex gap-4"><input className="flex-1 p-3 border rounded-lg" value={modTitle} onChange={e=>setModTitle(e.target.value)} placeholder="Nama Modul..." autoFocus aria-label="Nama Modul"/><input type="number" className="w-24 p-3 border rounded-lg" value={modJp} onChange={e=>setModJp(Number(e.target.value))} placeholder="JP" aria-label="JP"/></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Penanggung Jawab</label><select value={modFacilitatorId} onChange={e => setModFacilitatorId(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" aria-label="Pilih PJ"><option value="">-- Pilih Fasilitator --</option>{activeTeam.map((f: any) => (<option key={f._id} value={f._id}>{f.name}</option>))}</select></div><div><label className="text-xs font-bold text-gray-500">Tanggal Pelaksanaan</label><input type="date" className="w-full border p-2 rounded text-sm" value={modSchedule} onChange={e => setModSchedule(e.target.value)} aria-label="Tanggal" /></div></div><div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetModuleForm} className="text-sm text-gray-500 font-bold" aria-label="Batal">Batal</button><button type="button" onClick={handleSaveModule} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold" aria-label="Simpan">Simpan</button></div></form>)}
                    
// // // // // // //                     <DragDropContext onDragEnd={onDragEnd}>
// // // // // // //                         <Droppable droppableId="all-modules" type="module">
// // // // // // //                             {(provided) => (
// // // // // // //                                 <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
// // // // // // //                                     {course?.modules?.map((m: any, idx: number) => (
// // // // // // //                                         <Draggable key={m._id} draggableId={m._id} index={idx}>
// // // // // // //                                             {(provided) => (
// // // // // // //                                                 <div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-xl overflow-hidden bg-white shadow-sm">
// // // // // // //                                                     <div className="bg-gray-50 p-3 flex justify-between items-center" {...provided.dragHandleProps}>
// // // // // // //                                                         <div className="flex items-center gap-3"><span className="cursor-grab text-gray-400" aria-label="Drag Modul">☰</span><div><span className="font-bold text-gray-700">{m.title}</span><div className="flex gap-2 text-[10px] mt-1 text-gray-500 font-medium"><span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">{m.jp} JP</span>{m.facilitatorId && <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100 flex items-center gap-1">👤 {getFacilitatorName(m.facilitatorId)}</span>}{m.scheduleDate && <span className="bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded border border-yellow-100 flex items-center gap-1">📅 {new Date(m.scheduleDate).toLocaleDateString('id-ID')}</span>}</div></div></div>
// // // // // // //                                                         <div className="flex gap-2"><button type="button" onClick={() => startEditModule(m)} className="text-xs text-blue-600 font-bold" aria-label="Edit">Edit</button><button type="button" onClick={() => toggleStatus(m._id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${m.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Modul"><span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${m.isActive ? 'translate-x-4' : 'translate-x-1'}`} /></button></div>
// // // // // // //                                                     </div>
// // // // // // //                                                     <Droppable droppableId={m._id} type="lesson">
// // // // // // //                                                         {(provided) => (
// // // // // // //                                                             <div ref={provided.innerRef} {...provided.droppableProps} className="p-3 space-y-2">
// // // // // // //                                                                 {m.lessons?.map((l: any, lIdx: number) => (
// // // // // // //                                                                     <Draggable key={l._id} draggableId={l._id} index={lIdx}>
// // // // // // //                                                                         {(provided) => (
// // // // // // //                                                                             <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-2 bg-white border rounded hover:bg-gray-50">
// // // // // // //                                                                                 <div className="flex gap-2 items-center"><span className="cursor-grab text-gray-400" aria-hidden="true">::</span><span className="text-lg" aria-hidden="true">{l.type === 'video_url' ? '🎞️' : l.type === 'quiz' ? '📝' : l.type === 'essay' ? '✍️' : '📄'}</span><div><p className="text-sm font-bold text-gray-800">{l.title}</p><div className="flex gap-2 items-center flex-wrap mt-0.5"><span className="text-[10px] text-gray-500 uppercase font-bold">{l.type}</span>{l.jp > 0 && <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 rounded border border-blue-100 font-medium">{l.jp} JP</span>}{l.isMandatory ? <span className="text-[10px] bg-red-50 text-red-700 px-1.5 rounded border border-red-100 font-medium">Wajib</span> : <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 rounded border font-medium">Opsional</span>}{l.facilitatorId && <span className="text-[10px] text-purple-600 flex items-center gap-1 font-medium">👤 {getFacilitatorName(l.facilitatorId)}</span>}{l.scheduleDate && <span className="text-[10px] text-blue-600 flex items-center gap-1 font-medium">📅 {new Date(l.scheduleDate).toLocaleDateString('id-ID')}</span>}</div></div></div>
// // // // // // //                                                                                 <div className="flex gap-2 items-center"><button type="button" onClick={() => startEditLesson(m._id, l)} className="text-blue-500 text-xs font-bold" aria-label="Edit">Edit</button><button type="button" onClick={() => deleteItem(m._id, l._id)} className="text-red-500 text-xs font-bold" aria-label="Hapus">Hapus</button><button type="button" onClick={() => toggleStatus(m._id, l._id)} className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${l.isActive ? 'bg-green-500' : 'bg-gray-300'}`} aria-label="Toggle Lesson"><span className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${l.isActive ? 'translate-x-3.5' : 'translate-x-0.5'}`} /></button></div>
// // // // // // //                                                                             </div>
// // // // // // //                                                                         )}
// // // // // // //                                                                     </Draggable>
// // // // // // //                                                                 ))}
// // // // // // //                                                                 {provided.placeholder}
// // // // // // //                                                                 {activeModId === m._id ? (
// // // // // // //                                                                     <div id={`form-${m._id}`} className="bg-blue-50 p-4 rounded border border-blue-200 mt-2 space-y-3">
// // // // // // //                                                                         <div className="grid grid-cols-12 gap-2"><div className="col-span-4"><select className="w-full p-2 border rounded text-sm bg-white" value={lesType} onChange={e=>setLesType(e.target.value)} aria-label="Tipe Konten"><option value="lesson">📄 Teks Materi</option><option value="video_url">🎞️ Video YouTube</option><option value="essay">📝 Esai</option><option value="quiz">🧩 Kuis Pilihan Ganda</option><option value="upload_doc">📤 Tugas Upload</option><option value="virtual_class">🎥 Kelas Virtual</option><option value="poll">📊 Polling</option><option value="google_classroom">🏫 Google Classroom</option></select></div><div className="col-span-6"><input className="w-full p-2 border rounded text-sm" placeholder="Judul Materi..." value={lesTitle} onChange={e=>setLesTitle(e.target.value)} aria-label="Judul Materi"/></div><div className="col-span-2"><input type="number" className="w-full p-2 border rounded text-sm" placeholder="JP" value={lesJp} onChange={e=>setLesJp(Number(e.target.value))} aria-label="JP"/></div></div>
// // // // // // //                                                                         <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded border border-blue-100"><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Fasilitator (Opsional)</label><select className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesFacilitatorId} onChange={e=>setLesFacilitatorId(e.target.value)} aria-label="Pilih Fasilitator"><option value="">-- Ikut Modul --</option>{activeTeam.map((f:any)=><option key={f._id} value={f._id}>{f.name}</option>)}</select></div><div><label className="text-[10px] font-bold text-gray-500 block mb-1">Tanggal (Opsional)</label><input type="date" className="w-full p-1.5 border rounded text-xs bg-gray-50" value={lesSchedule} onChange={e=>setLesSchedule(e.target.value)} aria-label="Tanggal" /></div><div className="flex items-center h-full pt-4"><label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer"><input type="checkbox" checked={lesIsMandatory} onChange={e=>setLesIsMandatory(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" aria-label="Wajib"/> Wajib diselesaikan?</label></div></div>
// // // // // // //                                                                         {lesType === 'essay' && (<div className="bg-white p-3 rounded border"><div className="mb-2"><label className="text-xs font-bold text-gray-500">Instruksi Soal:</label><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-32 mb-10"/></div><label className="text-xs font-bold text-gray-500 block mt-4">Pertanyaan Esai:</label>{essayQuestions.map((q, ix) => (<div key={ix} className="flex gap-2 mb-2"><textarea className="flex-1 p-2 border rounded text-sm h-16" value={q} onChange={e=>updateEssay(ix, e.target.value)} placeholder={`Pertanyaan ${ix+1}`} aria-label={`Tanya ${ix+1}`}/>{essayQuestions.length > 1 && <button type="button" onClick={()=>removeEssay(ix)} className="text-red-500 font-bold" aria-label="Hapus">x</button>}</div>))}<button type="button" onClick={addEssayRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Tanya">+ Tambah Pertanyaan</button><div className="mt-3 flex items-center gap-2 bg-amber-50 p-2 rounded"><label className="text-xs font-bold text-amber-800">⏱ Timer (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="w-16 border p-1 rounded text-xs" aria-label="Durasi"/><label className="text-xs ml-2"><input type="checkbox" checked={useEssayTimer} onChange={e=>setUseEssayTimer(e.target.checked)} aria-label="Aktifkan Timer"/> Aktifkan</label></div></div>)}
// // // // // // //                                                                         {lesType === 'quiz' && (<div className="bg-white p-3 rounded border"><div className="flex gap-2 items-center mb-2"><label className="text-xs font-bold">Durasi (Menit):</label><input type="number" value={quizDuration} onChange={e=>setQuizDuration(Number(e.target.value))} className="w-20 border p-1 rounded" aria-label="Durasi"/></div>{questions.map((q, ix) => (<div key={ix} className="p-2 border rounded bg-gray-50 mb-2 relative"><button type="button" onClick={()=>removeQuestion(ix)} className="absolute top-1 right-1 text-red-500 font-bold text-xs" aria-label="Hapus Soal">x</button><input className="w-full p-1 border rounded mb-1 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e=>updateQuestion(ix, 'question', e.target.value)} aria-label={`Pertanyaan ${ix+1}`}/><div className="grid grid-cols-2 gap-2">{q.options.map((o:string, oi:number) => <input key={oi} className={`w-full p-1 border text-xs ${q.correctIndex===oi?'bg-green-100 border-green-300':''}`} placeholder={`Opsi ${oi+1}`} value={o} onChange={e=>updateQuestion(ix, 'options', e.target.value, oi)} aria-label={`Opsi ${oi+1}`}/>)}</div><div className="mt-1 text-xs flex items-center gap-2">Jawaban Benar (0-3): <input type="number" min="0" max="3" value={q.correctIndex} onChange={e=>updateQuestion(ix, 'correctIndex', Number(e.target.value))} className="w-10 border" aria-label="Jawaban Benar"/></div></div>))}<button type="button" onClick={addQuestionRow} className="text-xs text-blue-600 font-bold" aria-label="Tambah Soal">+ Tambah Soal</button></div>)}
// // // // // // //                                                                         {lesType === 'poll' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Pertanyaan Polling..." value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} aria-label="Tanya Polling"/>{pollOptions.map((opt, idx) => (<div key={idx} className="flex gap-2 mb-1"><input className="flex-1 p-1 border rounded text-xs" value={opt} onChange={e=>updatePollOption(idx, e.target.value)} placeholder={`Opsi ${idx+1}`} aria-label={`Opsi ${idx+1}`}/>{pollOptions.length > 2 && <button onClick={()=>removePollOption(idx)} className="text-red-500 font-bold" aria-label="Hapus">x</button>}</div>))}<button type="button" onClick={addPollOption} className="text-xs text-blue-600 font-bold" aria-label="Tambah Opsi">+ Opsi</button></div>)}
// // // // // // //                                                                         {['lesson', 'upload_doc'].includes(lesType) && (<div className="bg-white rounded border"><ReactQuill theme="snow" value={lesContent} onChange={setLesContent} modules={quillModules} className="h-48 mb-12" placeholder="Tulis materi..."/></div>)}
// // // // // // //                                                                         {lesType === 'video_url' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded text-sm" placeholder="Link YouTube..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Video"/></div>)}
// // // // // // //                                                                         {lesType === 'virtual_class' && (<div className="bg-white p-3 rounded border"><input className="w-full p-2 border rounded text-sm" placeholder="Link Zoom/Meet..." value={lesContent} onChange={e=>setLesContent(e.target.value)} aria-label="Link Zoom"/></div>)}
// // // // // // //                                                                         {lesType === 'google_classroom' && (<div className="bg-white p-4 rounded border border-green-200 space-y-3"><div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-600 flex items-center gap-2"><School size={18}/> Integrasi Google Classroom</label><div className="flex gap-2">{googleToken && (<><button type="button" onClick={() => fetchClassroomCourses()} className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 flex items-center gap-1" aria-label="Refresh Class"><RefreshCw size={12}/> Refresh</button><button type="button" onClick={handleDisconnectGoogle} className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded hover:bg-red-100 flex items-center gap-1" aria-label="Putus Akun"><LogOut size={12}/> Putuskan</button></>)}{(!googleToken || classroomCourses.length === 0) && (<button type="button" onClick={handleConnectGoogle} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2" aria-label="Hubungkan Google"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={14} alt="G" />{googleToken ? 'Ganti Akun' : 'Hubungkan Akun'}</button>)}</div></div>{googleToken ? (<div className="animate-in fade-in slide-in-from-top-2 duration-300">{classroomCourses.length > 0 ? (<select className="w-full p-2 border rounded text-sm mt-1 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all" value={selectedClassroom?.id || ''} onChange={(e) => { const selected = classroomCourses.find(c => c.id === e.target.value); setSelectedClassroom(selected); }} aria-label="Pilih Kelas"><option value="">-- Pilih Kelas --</option>{classroomCourses.map(c => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''} — Kode: {c.enrollmentCode || '-'}</option>))}</select>) : (<p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">Tidak ada kelas aktif ditemukan.</p>)}{selectedClassroom && (<div className="mt-2 text-xs text-green-800 bg-green-50 p-3 rounded border border-green-100 flex flex-col gap-1"><div className="flex items-center gap-2"><div className="mt-0.5 text-green-600"><CheckCircle2 size={16}/></div><strong>{selectedClassroom.name}</strong> terpilih.</div><div className="ml-6"><span className="bg-white border px-2 py-1 rounded font-mono font-bold select-all">Kode Kelas: {selectedClassroom.enrollmentCode || 'Tidak Ada'}</span><span className="text-gray-500 ml-2">(Bagikan ke siswa)</span></div><a href={selectedClassroom.alternateLink} target="_blank" rel="noopener noreferrer" className="ml-6 underline text-green-600 hover:text-green-800 mt-1 inline-block" aria-label="Lihat Kelas">Lihat Kelas ↗</a></div>)}</div>) : (<p className="text-xs text-gray-400 p-2 border border-dashed rounded text-center">Silakan hubungkan akun Google untuk memilih kelas.</p>)}</div>)}
// // // // // // //                                                                         {['image','download_doc','slide'].includes(lesType) && (<div className="bg-white p-4 rounded border border-gray-200"><label className="block text-xs font-bold text-gray-600 mb-2">Upload File</label><input type="file" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className="text-sm w-full" aria-label="Upload File"/></div>)}
// // // // // // //                                                                         <div className="flex justify-end gap-2 mt-2"><button type="button" onClick={resetLessonForm} className="text-xs font-bold text-gray-500" aria-label="Batal">Batal</button><button type="button" onClick={()=>handleSaveLesson(m._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold" aria-label="Simpan Materi">Simpan Materi</button></div>
// // // // // // //                                                                     </div>
// // // // // // //                                                                 ) : (
// // // // // // //                                                                     <button type="button" onClick={()=>{handleAddNewContent(m._id)}} className="w-full py-2 border-2 border-dashed border-gray-200 rounded text-xs text-gray-400 font-bold hover:border-blue-300 hover:text-blue-600 mt-2" aria-label="Tambah Konten">+ Tambah Konten</button>
// // // // // // //                                                                 )}
// // // // // // //                                                             </div>
// // // // // // //                                                         )}
// // // // // // //                                                     </Droppable>
// // // // // // //                                                 </div>
// // // // // // //                                             )}
// // // // // // //                                         </Draggable>
// // // // // // //                                     ))}
// // // // // // //                                     {provided.placeholder}
// // // // // // //                                 </div>
// // // // // // //                             )}
// // // // // // //                         </Droppable>
// // // // // // //                     </DragDropContext>
// // // // // // //                 </div>
// // // // // // //             </div>

// // // // // // //             {/* SETTINGS BAWAH */}
// // // // // // //             <div className="border-t pt-8 space-y-8">
// // // // // // //                 <div><h2 className="text-xl font-bold text-gray-800 mb-4">Unit Kompetensi</h2><CompetencyForm initialData={competencies} onChange={(data) => setCompetencies(data)} /><div className="mt-4 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200"><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={includeCompetencies} onChange={e=>setIncludeCompetencies(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" aria-label="Tampilkan Kompetensi"/><span className="text-sm font-bold text-gray-700">Tampilkan daftar kompetensi di halaman belakang sertifikat?</span></label><button type="button" onClick={handleSaveCompetencies} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors" aria-label="Simpan Kompetensi">Simpan Kompetensi</button></div></div>
// // // // // // //                 <div><h2 className="text-xl font-bold text-gray-800 mb-4">Pengaturan Sertifikat</h2><CertificateConfigForm initialData={certConfig} onSave={handleSaveCertConfig} isSaving={isSavingCert} competencies={competencies} includeCompetencies={includeCompetencies} courseId={courseId} />{certConfig && (<div className="mt-6 border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 shadow-sm"><div className="bg-gray-50 px-5 py-3 border-b flex items-center gap-2 font-bold text-gray-700 text-sm"><FileBadge size={16}/> Data Konfigurasi Tersimpan (Preview)</div><div className="p-5 bg-white grid grid-cols-1 md:grid-cols-2 gap-6 text-sm"><div><p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><Hash size={12}/> Format Nomor</p><p className="font-mono bg-gray-50 border px-3 py-2 rounded text-gray-800">{certConfig.certificateNumber || '-'}</p></div><div><p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><Calendar size={12}/> Tanggal Pelaksanaan</p><p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{certConfig.executionDate ? new Date(certConfig.executionDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '-'}</p></div><div><p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><MapPin size={12}/> Kota Penerbit</p><p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{certConfig.city || '-'}</p></div><div><p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><UserCheck size={12}/> Penanda Tangan</p><p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{certConfig.signatoryName} <span className="font-normal text-gray-500 text-xs block">({certConfig.signatoryPosition})</span></p></div></div></div>)}</div>
// // // // // // //             </div>
            
// // // // // // //             <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center gap-3"><h3 className="text-lg font-bold text-gray-800">Status Publikasi</h3><button type="button" onClick={() => toggleStatus()} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${course?.isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`} aria-label="Ubah Status">{course?.isPublished ? 'Tarik Kembali (Draft)' : '🚀 PUBLISH SEKARANG'}</button></div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // }

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
// // // // // //     BookOpen, Trash2, Plus, Video, Image as ImageIcon
// // // // // // } from 'lucide-react';

// // // // // // import dynamic from 'next/dynamic';
// // // // // // import 'react-quill/dist/quill.snow.css'; 

// // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // //     ssr: false,
// // // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // // });

// // // // // // // interface CourseContentEditorProps {
// // // // // // //     course: any;
// // // // // // //     courseId: string;
// // // // // // //     refreshData: () => void;
// // // // // // //     facilitators: any[]; 
// // // // // // // }

// // // // // // // export default function CourseContentEditor({ course, courseId, refreshData, facilitators }: CourseContentEditorProps) {
// // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // // // // // //     const [isUploadingCover, setIsUploadingCover] = useState(false);
    
// // // // // // //     // --- STATE MODUL ---
// // // // // // //     const [showModuleForm, setShowModuleForm] = useState(false);
// // // // // // //     const [modTitle, setModTitle] = useState('');
// // // // // // //     const [modIsMandatory, setModIsMandatory] = useState(true);
// // // // // // //     const [modFacilitatorId, setModFacilitatorId] = useState('');
// // // // // // //     const [modJp, setModJp] = useState(0);
// // // // // // //     const [modSchedule, setModSchedule] = useState('');
// // // // // // //     const [editingModId, setEditingModId] = useState<string | null>(null);

// // // // // // //     // --- STATE LESSON (MATERI) ---
// // // // // // //     const [activeModId, setActiveModId] = useState<string | null>(null); 
// // // // // // //     const [editingLesId, setEditingLesId] = useState<string | null>(null);
    
// // // // // // //     const [lesTitle, setLesTitle] = useState('');
// // // // // // //     const [lesType, setLesType] = useState('lesson');
// // // // // // //     const [lesContent, setLesContent] = useState('');
// // // // // // //     const [lesIsMandatory, setLesIsMandatory] = useState(true);
// // // // // // //     const [lesJp, setLesJp] = useState(0);
// // // // // // //     const [lesSchedule, setLesSchedule] = useState('');
// // // // // // //     const [lesFacilitatorId, setLesFacilitatorId] = useState('');
// // // // // // //     const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // // // // //     const [uploading, setUploading] = useState(false);

// // // // // // //     // --- STATE QUIZ / POLL / ESSAY ---
// // // // // // //     const [quizDuration, setQuizDuration] = useState(10);
// // // // // // //     const [questions, setQuestions] = useState<any[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0 }]);
// // // // // // //     const [pollQuestion, setPollQuestion] = useState('');
// // // // // // //     const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
// // // // // // //     const [essayQuestions, setEssayQuestions] = useState<string[]>(['']);
// // // // // // //     const [useEssayTimer, setUseEssayTimer] = useState(false);

// // // // // // //     // --- STATE GOOGLE CLASSROOM ---
// // // // // // //     const [classroomCourses, setClassroomCourses] = useState<any[]>([]);
// // // // // // //     const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
// // // // // // //     const [googleToken, setGoogleToken] = useState<string | null>(null);
// // // // // // //     const [isCheckingGoogle, setIsCheckingGoogle] = useState(false);

// // // // // // //     // --- STATE SETTINGS (SERTIFIKAT & KOMPETENSI) ---
// // // // // // //     // [FIX] Inisialisasi state dengan nilai default yang aman
// // // // // // //     const [competencies, setCompetencies] = useState<any[]>(course?.competencies || []);
// // // // // // //     const [includeCompetencies, setIncludeCompetencies] = useState(course?.includeCompetenciesInCertificate ?? true);
// // // // // // //     const [certConfig, setCertConfig] = useState<any>(course?.certificateConfig || {});
    
// // // // // // //     const [isSavingCompetencies, setIsSavingCompetencies] = useState(false);
// // // // // // //     const [isSavingCert, setIsSavingCert] = useState(false);
    
// // // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
// // // // // // //     const [selectedFacilitatorIds, setSelectedFacilitatorIds] = useState<string[]>(
// // // // // // //         course?.facilitatorIds?.map((f: any) => (typeof f === 'object' ? f._id : f)) || []
// // // // // // //     );

// // // // // // //     // [FIX PENTING] Sinkronisasi Data saat props 'course' berubah (misal setelah refreshData)
// // // // // // //     useEffect(() => {
// // // // // // //         if (course) {
// // // // // // //             setCompetencies(course.competencies || []);
// // // // // // //             setIncludeCompetencies(course.includeCompetenciesInCertificate ?? true);
// // // // // // //             setCertConfig(course.certificateConfig || {});
// // // // // // //             setSelectedFacilitatorIds(course.facilitatorIds?.map((f: any) => (typeof f === 'object' ? f._id : f)) || []);
// // // // // // //         }
// // // // // // //     }, [course]);

// // // // // // //     // Filt
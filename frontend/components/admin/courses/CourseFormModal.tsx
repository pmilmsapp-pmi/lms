// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { 
//     X, Upload, Plus, Trash2, Save, Calendar, 
//     Video, Image as ImageIcon, Users, FileText, 
//     CheckCircle, AlertCircle, Award, Clock, Search, 
//     Download, File, Loader2, UserPlus, 
//     ShieldCheck, CheckSquare, Building, MapPin, Lock, UserCircle, LayoutGrid, Book, CheckCircle2, Info
// } from 'lucide-react';
// import { api, apiUpload } from '@/lib/api'; 
// import dynamic from 'next/dynamic';
// import 'react-quill/dist/quill.snow.css';
// import axios from 'axios'; 
// import BaseModal from '@/components/ui/BaseModal'; 

// const ReactQuill = dynamic(() => import('react-quill'), { 
//     ssr: false,
//     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// });

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// interface CourseFormModalProps {
//     course?: any; 
//     onClose: () => void;
//     onSuccess: () => void;
//     facilitators: any[]; 
//     currentUser: any; 
// }

// const MEMBER_TYPES = ['PMR', 'KSR', 'TSR', 'Pegawai', 'Pengurus', 'Umum'];

// export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
//     const [activeTab, setActiveTab] = useState('info');
//     const [loading, setLoading] = useState(false);
//     const [fetchingDetail, setFetchingDetail] = useState(false);
    
//     // Refs
//     const fileInputRef = useRef<HTMLInputElement>(null); 
//     const templateInputRef = useRef<HTMLInputElement>(null); 
    
//     // State Search
//     const [searchFacilitator, setSearchFacilitator] = useState('');
//     const [searchPic, setSearchPic] = useState('');
//     const [allSystemUsers, setAllSystemUsers] = useState<any[]>([]);
    
//     // State UI
//     const [showDisclaimer, setShowDisclaimer] = useState(false);
//     const [isAgreed, setIsAgreed] = useState(false);
//     const [organizerDisplay, setOrganizerDisplay] = useState('');
//     const [regionCodeDisplay, setRegionCodeDisplay] = useState('');
//     const [newFacility, setNewFacility] = useState('');
//     const [uploadingCover, setUploadingCover] = useState(false);
//     const [uploadingTemplate, setUploadingTemplate] = useState(false);
//     const [showManualInput, setShowManualInput] = useState<string | null>(null);
//     const [manualName, setManualName] = useState('');
//     const [manualEmail, setManualEmail] = useState('');

//     const [selectedFacilitatorsList, setSelectedFacilitatorsList] = useState<any[]>([]);

//     // --- LOCKING LOGIC VARIABLES ---
//     // 1. Program & Peserta: Selalu terkunci jika course sudah ada (edit mode)
//     const isProgramLocked = !!course?._id; 
//     const isParticipantsLocked = !!course?._id;

//     // 2. Jadwal: Terkunci jika tanggal sudah tersimpan di DB (bukan null/string kosong)
//     const isScheduleLocked = !!(course?.registrationPeriod?.startDate && course?.executionPeriod?.startDate);

//     // 3. Tim: Terkunci jika fasilitator sudah ada.
//     const isTeamLocked = !!(course?.facilitatorIds && course.facilitatorIds.length > 0);

//     // --- HELPER FUNCTION ---
//     const getUserLocation = (u: any) => {
//         if (!u) return '-';
//         const city = u.city || u.memberData?.regency;
//         const prov = u.province || u.memberData?.province;
        
//         if (city) return `${city}, ${prov || ''}`;
//         if (prov) return prov;
//         return 'Nasional';
//     };

//     const getLocalDisplayUrl = (url: string) => {
//         if (!url) return '';
//         if (url.startsWith('http')) return url;
//         const cleanPath = url.startsWith('/') ? url : `/${url}`;
//         return `${API_BASE_URL}${cleanPath}`;
//     };

//     // --- INITIAL STATE ---
//     const defaultState = {
//         title: '', description: '', 
//         programType: 'training', 
//         hasCertificate: true,
//         regIsForever: false, regStartDate: '', regEndDate: '',
//         execIsForever: false, execStartDate: '', execEndDate: '',
//         thumbnailUrl: '', promoVideoUrl: '',
//         registrationMethod: 'auto', 
//         requireDocs: true, 
//         registrationTemplates: [] as any[], 
//         price: 0, estimatedDuration: 0, totalJp: 0, 
//         facilities: [] as string[], 
//         facilitatorIds: [] as string[],
//         pics: [] as any[], 
//         creatorInfo: null as any,
//         contactName: '', contactPhone: '', contactEmail: '',
//         targetParticipants: [] as string[] 
//     };

//     const [formData, setFormData] = useState(defaultState);

//     // --- LOAD ALL USERS ---
//     useEffect(() => {
//         const loadAllData = async () => {
//             try {
//                 let res = await api('/api/admin/users?limit=3000').catch(() => null);
//                 if (!res) res = await api('/api/users?limit=3000').catch(() => ({ users: [] }));
                
//                 let cleanUsers = [];
//                 if (res.users && Array.isArray(res.users)) cleanUsers = res.users;
//                 else if (Array.isArray(res)) cleanUsers = res;
                
//                 if (cleanUsers.length === 0 && facilitators) cleanUsers = facilitators;
//                 setAllSystemUsers(cleanUsers);
//             } catch (e) {
//                 setAllSystemUsers(facilitators || []);
//             }
//         };
//         loadAllData();
//     }, [facilitators]);

//     // --- LOAD COURSE DETAIL ---
//     useEffect(() => {
//         const initData = async () => {
//             if (course && course._id) {
//                 setFetchingDetail(true);
//                 try {
//                     const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
//                     const fullData = res.course || res.data || res;
//                     populateForm(fullData);
//                 } catch (e) {
//                     populateForm(course);
//                 } finally {
//                     setFetchingDetail(false);
//                 }
//             } else {
//                 if (currentUser) {
//                      setFormData(prev => ({
//                         ...prev,
//                         contactName: currentUser.name,
//                         contactEmail: currentUser.email,
//                         contactPhone: currentUser.phoneNumber || ''
//                       }));
//                       const org = currentUser.role === 'SUPER_ADMIN' ? 'PMI Pusat' : (currentUser.organizer || 'PMI Wilayah');
//                       setOrganizerDisplay(org);
//                       setRegionCodeDisplay('Menunggu Proposal');
//                 }
//             }
//         };
//         initData();
//     }, [course]);

//     const populateForm = (data: any) => {
//         const formatDate = (d: string) => {
//             if (!d) return '';
//             try { return new Date(d).toISOString().split('T')[0]; } catch (e) { return ''; }
//         };

//         let initialPics = Array.isArray(data.pics) ? data.pics : [];
//         if (Array.isArray(data.picIds) && data.picIds.length > 0) {
//             initialPics = data.picIds.map((p: any) => ({
//                 id: p._id || p.id,
//                 name: p.name,
//                 email: p.email,
//                 role: p.role,
//                 avatarUrl: p.avatarUrl
//             }));
//         }

//         const facIds = Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [];
        
//         let initialSelectedFacs: any[] = [];
//         if (data.facilitatorIds && data.facilitatorIds.length > 0 && typeof data.facilitatorIds[0] === 'object') {
//              initialSelectedFacs = data.facilitatorIds;
//         }
//         setSelectedFacilitatorsList(initialSelectedFacs);

//         setFormData({
//             title: data.title || '', description: data.description || '', 
//             programType: data.programType || 'training', 
//             hasCertificate: data.hasCertificate ?? true,
//             regIsForever: data.registrationPeriod?.isForever ?? false,
//             regStartDate: formatDate(data.registrationPeriod?.startDate),
//             regEndDate: formatDate(data.registrationPeriod?.endDate),
//             execIsForever: data.executionPeriod?.isForever ?? false,
//             execStartDate: formatDate(data.executionPeriod?.startDate),
//             execEndDate: formatDate(data.executionPeriod?.endDate),
//             thumbnailUrl: data.thumbnailUrl || '', promoVideoUrl: data.promoVideoUrl || '',
//             registrationMethod: data.registrationMethod || 'auto',
//             requireDocs: data.registrationConfig?.requireDocs !== false,
//             registrationTemplates: Array.isArray(data.registrationConfig?.templates) ? data.registrationConfig.templates : [],
//             price: Number(data.price) || 0, estimatedDuration: Number(data.estimatedDuration) || 0, totalJp: Number(data.totalJp) || 0,
//             facilities: Array.isArray(data.facilities) ? data.facilities : [],
//             facilitatorIds: facIds,
//             pics: initialPics, 
//             creatorInfo: data.creatorInfo || null,
//             contactName: data.contact?.name || data.creatorInfo?.name || '',
//             contactEmail: data.contact?.email || data.creatorInfo?.email || '',
//             contactPhone: data.contact?.phone || data.creatorInfo?.contact || '',
//             targetParticipants: data.targetParticipants || [] 
//         });

//         setOrganizerDisplay(data.organizer || 'PMI Pusat');
//         setRegionCodeDisplay(data.regionCode || 'Nasional');
//     }

//     // --- EFFECT SYNC FACILITATOR ---
//     useEffect(() => {
//         if (allSystemUsers.length > 0 && formData.facilitatorIds.length > 0) {
//             const matched = allSystemUsers.filter(u => formData.facilitatorIds.includes(u._id || u.id));
//             const map = new Map();
//             [...selectedFacilitatorsList, ...matched].forEach(u => map.set(u._id || u.id, u));
//             setSelectedFacilitatorsList(Array.from(map.values()));
//         }
//     }, [allSystemUsers]);

//     // --- HANDLERS ---
//     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
//     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
//     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };

//     const addFacilitator = (user: any) => {
//         const uid = user._id || user.id;
//         if (formData.facilitatorIds.includes(uid)) return;
//         setFormData(prev => ({ ...prev, facilitatorIds: [...prev.facilitatorIds, uid] }));
//         setSelectedFacilitatorsList(prev => [...prev, user]);
//         setSearchFacilitator(''); 
//     };

//     const removeFacilitator = (uid: string) => {
//         setFormData(prev => ({ ...prev, facilitatorIds: prev.facilitatorIds.filter(id => id !== uid) }));
//         setSelectedFacilitatorsList(prev => prev.filter(u => (u._id || u.id) !== uid));
//     };

//     const handleAddPicFromSearch = (user: any) => {
//         if (formData.pics.length >= 3) return alert("Maksimal 3 PIC Tambahan");
//         if (formData.pics.some((p: any) => p.email === user.email)) return alert("User ini sudah ditambahkan.");
//         const newPic = { id: user._id || user.id, name: user.name, pmiStatus: user.role, email: user.email, avatarUrl: user.avatarUrl };
//         setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
//         setSearchPic('');
//     };

//     const removePic = (idx: number) => { setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); };
    
//     // Toggle Unsur Peserta
//     const toggleParticipant = (type: string) => {
//         if (isParticipantsLocked) return; // Prevent change if locked
//         setFormData(prev => ({
//             ...prev,
//             targetParticipants: prev.targetParticipants.includes(type)
//                 ? prev.targetParticipants.filter((t:string) => t !== type)
//                 : [...prev.targetParticipants, type]
//         }));
//     };

//     // Manual Add Logic
//     const handleManualAdd = () => { 
//         if (!manualName || !manualEmail) return alert("Isi nama dan email."); 
//         const newEntry = { id: `manual_${Date.now()}`, name: manualName, email: manualEmail, role: 'GUEST', avatarUrl: '' }; 
//         if (showManualInput === 'facilitator') { 
//             setFormData(prev => ({ ...prev, facilitatorIds: [...prev.facilitatorIds, newEntry.id] })); 
//             setSelectedFacilitatorsList(prev => [...prev, newEntry]); 
//         } else { 
//             if (formData.pics.length >= 3) return alert("Maksimal 3 PIC."); 
//             setFormData(prev => ({ ...prev, pics: [...prev.pics, { ...newEntry, pmiStatus: 'EKSTERNAL' }] })); 
//         } 
//         setManualName(''); setManualEmail(''); setShowManualInput(null); 
//     };

//     // Upload Handlers
//     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0]; if (!file) return;
//         try {
//             setUploadingCover(true); const fd = new FormData(); fd.append('file', file);
//             const res = await apiUpload('/api/upload', fd); 
//             const url = res.url || res.file?.url || res.data?.url;
//             if (url) handleChange('thumbnailUrl', url);
//         } catch (err: any) { alert('Gagal: ' + err.message); } finally { setUploadingCover(false); }
//     };

//     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0]; if (!file) return;
//         setUploadingTemplate(true);
//         try {
//             const fd = new FormData(); fd.append('file', file);
//             const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
//             const token = userStr ? JSON.parse(userStr).token : '';
//             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }, withCredentials: true });
//             const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url;
//             if (!rawUrl) throw new Error("Gagal dapat URL.");
//             setFormData(prev => ({ ...prev, registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }] }));
//         } catch (err: any) { console.error(err); alert('Upload Gagal: ' + (err.response?.data?.message || err.message)); } finally { setUploadingTemplate(false); if (templateInputRef.current) templateInputRef.current.value = ''; }
//     };

//     const removeTemplate = (idx: number) => { if(!confirm("Hapus dokumen ini?")) return; setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) })); };
//     const updateTemplateTitle = (idx: number, v: string) => { const t = [...formData.registrationTemplates]; t[idx].title = v; setFormData(prev => ({ ...prev, registrationTemplates: t })); };
    
//     const handlePreSubmit = () => { 
//         if (!formData.title) return alert("Judul wajib diisi!"); 
//         if (formData.targetParticipants.length === 0) return alert("Pilih minimal satu unsur peserta.");
//         setShowDisclaimer(true); 
//     };
    
//     const handleFinalSubmit = async () => {
//         if (!isAgreed) return alert("Mohon setujui pernyataan disclaimer.");
//         setLoading(true);
//         try {
//             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
//             const picIds = validPics.map((p: any) => p.id || p._id).filter((id: any) => id && !id.toString().startsWith('manual_'));
//             const parseDate = (d: string) => d ? new Date(d) : null;

//             const payload = {
//                 title: formData.title, description: formData.description, programType: formData.programType, hasCertificate: formData.hasCertificate,
//                 price: Number(formData.price), estimatedDuration: Number(formData.estimatedDuration), totalJp: Number(formData.totalJp),
//                 thumbnailUrl: formData.thumbnailUrl, promoVideoUrl: formData.promoVideoUrl, 
//                 organizer: organizerDisplay, 
//                 registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
//                 executionPeriod: { isForever: formData.execIsForever, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
//                 registrationMethod: formData.registrationMethod,
//                 registrationConfig: { requireDocs: formData.requireDocs, templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) },
//                 facilities: formData.facilities, facilitatorIds: formData.facilitatorIds.filter(id => !id.toString().startsWith('manual_')), pics: validPics, picIds: picIds, 
//                 creatorInfo: formData.creatorInfo, contact: { name: formData.contactName, email: formData.contactEmail, phone: formData.contactPhone },
//                 targetParticipants: formData.targetParticipants
//             };

//             if (course?._id) await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
//             else await api('/api/courses', { method: 'POST', body: payload });
//             alert("Berhasil disimpan!"); onSuccess();
//         } catch (err: any) { console.error(err); alert("Gagal: " + (err.response?.data?.message || err.message)); } finally { setLoading(false); setShowDisclaimer(false); }
//     };

//     const handleAdminApproveInfo = async () => {
//         if(!confirm("Yakin data informasi pelatihan ini sudah valid?")) return;
//         setLoading(true);
//         try { 
//             await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { isInfoCompleted: true } }); 
//             alert("✅ Informasi Disetujui! Gear Modul Terbuka."); 
//             onSuccess(); onClose(); 
//         } catch (err: any) { alert("Gagal: " + err.message); } finally { setLoading(false); }
//     };

//     const handleAdminRejectInfo = async () => {
//         const reason = prompt("Masukkan alasan pengembalian (revisi):");
//         if (!reason) return;
//         setLoading(true);
//         try {
//             await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { status: 'revision', isInfoCompleted: false, rejectionReason: reason } });
//             alert("⚠️ Pelatihan dikembalikan untuk revisi.");
//             onSuccess(); onClose();
//         } catch (e: any) { alert("Gagal: " + e.message); } finally { setLoading(false); }
//     };

//     const filteredFacilitators = allSystemUsers.filter(u => {
//         const keyword = searchFacilitator.toLowerCase();
//         const role = (u.role || '').toUpperCase();
//         if (!['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'].includes(role)) return false;
//         if (formData.facilitatorIds.includes(u._id || u.id)) return false;
//         return (u.name || '').toLowerCase().includes(keyword) || (u.email || '').toLowerCase().includes(keyword);
//     });

//     const filteredPics = allSystemUsers.filter(u => {
//         const keyword = searchPic.toLowerCase();
//         if (formData.pics.some((p: any) => p.email === u.email)) return false;
//         return (u.name || '').toLowerCase().includes(keyword) || (u.email || '').toLowerCase().includes(keyword);
//     });

//     const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'ADMIN';
//     const isInfoCompleted = course?.isInfoCompleted === true;

//     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><Loader2 className="animate-spin text-white"/></div>;

//     const footerButtons = (
//         <>
//             <div className="flex-1 text-xs text-gray-500 hidden md:block text-left">Status: <span className="font-bold uppercase">{course?.status || 'Baru'}</span></div>
//             <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50">Batal</button>
//             {isSuperAdmin && !isInfoCompleted && course?._id && (
//                 <>
//                     <button onClick={handleAdminRejectInfo} disabled={loading} className="px-5 py-2.5 rounded-xl bg-orange-100 text-orange-700 font-bold text-sm hover:bg-orange-200 border border-orange-200">Revisi</button>
//                     <button onClick={handleAdminApproveInfo} disabled={loading} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-md flex items-center gap-2">{loading ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18}/>} Setujui Informasi</button>
//                 </>
//             )}
//             <button onClick={handlePreSubmit} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] shadow-lg flex items-center gap-2 disabled:opacity-50">{loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Simpan Perubahan</button>
//         </>
//     );

//     return (
//         <BaseModal isOpen={true} onClose={onClose} title={course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'} subTitle="Lengkapi data pelatihan." size="full" footer={footerButtons}>
//             <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0 mb-6 -mx-6 px-6 pt-2">
//                 {[{ id: 'info', label: '1. Informasi Dasar', icon: FileText }, { id: 'media', label: '2. Media & Visual', icon: ImageIcon }, { id: 'registration', label: '3. Jadwal & Pelaksana', icon: Calendar }, { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award }, { id: 'team', label: '5. Tim & PIC', icon: Users }].map((tab) => (
//                     <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}><tab.icon size={16} /> {tab.label}</button>
//                 ))}
//             </div>

//             {activeTab === 'info' && (
//                 <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-2">
//                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
//                         <div>
//                             <label className="block text-sm font-bold text-gray-700 mb-1">Judul Pelatihan *</label>
//                             <input required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" value={formData.title} onChange={e => handleChange('title', e.target.value)} placeholder="Contoh: Pelatihan Dasar KSR" aria-label="Judul"/>
//                         </div>
                        
//                         <div>
//                             <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
//                                 Kategori Program 
//                                 {isProgramLocked && <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded border flex items-center gap-1"><Lock size={10}/> Terkunci dari Proposal</span>}
//                             </label>
//                             <div className="flex gap-4">
//                                 <button onClick={() => !isProgramLocked && handleChange('programType', 'training')} disabled={isProgramLocked} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${formData.programType === 'training' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-gray-200 text-gray-500'} ${isProgramLocked ? 'cursor-not-allowed opacity-80' : 'hover:bg-gray-50'}`}>
//                                     <LayoutGrid size={16}/> Diklat Resmi
//                                 </button>
//                                 <button onClick={() => !isProgramLocked && handleChange('programType', 'course')} disabled={isProgramLocked} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${formData.programType === 'course' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-500'} ${isProgramLocked ? 'cursor-not-allowed opacity-80' : 'hover:bg-gray-50'}`}>
//                                     <Book size={16}/> Kursus Mandiri
//                                 </button>
//                             </div>
//                         </div>

//                         {/* [BARU] UNSUR PESERTA LOCKED */}
//                         <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
//                             <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center justify-between">
//                                 <span className="flex items-center gap-2"><Users size={16}/> Unsur Peserta (Wajib)</span>
//                                 {isParticipantsLocked && <span className="text-[10px] bg-white border px-2 py-0.5 rounded flex items-center gap-1 text-gray-500"><Lock size={10}/> Terkunci</span>}
//                             </label>
//                             <div className="flex flex-wrap gap-2 mb-1">
//                                 {MEMBER_TYPES.map(type => {
//                                     const isSelected = formData.targetParticipants.includes(type);
//                                     return (
//                                         <button
//                                             key={type}
//                                             onClick={() => toggleParticipant(type)}
//                                             disabled={isParticipantsLocked}
//                                             className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${isSelected ? 'bg-gray-800 text-white border-gray-900 shadow-sm' : 'bg-white text-gray-400 border-gray-200'} ${isParticipantsLocked ? 'cursor-not-allowed opacity-70' : 'hover:border-gray-400'}`}
//                                         >
//                                             {isSelected && <CheckCircle2 size={12} className="inline mr-1 -mt-0.5"/>}
//                                             {type}
//                                         </button>
//                                     );
//                                 })}
//                             </div>
//                             <p className="text-[10px] text-gray-400 mt-2 italic">* Diatur saat pengajuan proposal.</p>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap *</label>
//                             <div className="bg-white border rounded-lg overflow-hidden">
//                                 <ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" aria-label="Deskripsi"/>
//                             </div>
//                         </div>
//                      </div>
                     
//                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
//                         <div className="flex items-center gap-3">
//                             <div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none">
//                                 <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div>
//                                 <span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span>
//                             </div>
//                         </div>
//                      </div>
//                 </div>
//             )}
            
//             {activeTab === 'media' && (
//                 <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) *</label><div className="flex gap-6 items-start"><div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">{formData.thumbnailUrl ? <img src={getLocalDisplayUrl(formData.thumbnailUrl)} alt="Preview" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1"/><span className="text-xs">Belum ada gambar</span></div>}{uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}</div><div className="flex-1"><p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p><input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" aria-label="Input Gambar"/><button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2"><Upload size={16}/> Upload Gambar</button></div></div></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label><input type="text" className="w-full p-2.5 border rounded-lg" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} aria-label="URL Video"/></div></div>
//             )}
            
//             {activeTab === 'registration' && (
//                 <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2">
//                     {isScheduleLocked && <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-xs text-blue-700 flex items-center gap-2 mb-2"><Info size={14}/> Jadwal pelatihan terkunci karena sudah disimpan sebelumnya. Hubungi admin pusat jika ada perubahan mendesak.</div>}
                    
//                     <div className="grid grid-cols-2 gap-6">
//                         {/* REGISTRATION PERIOD */}
//                         <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 ${isScheduleLocked ? 'opacity-70 pointer-events-none' : ''}`}>
//                             <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
//                             <div className="flex items-center gap-2 mb-2"><div onClick={() => !isScheduleLocked && handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-sm text-gray-600">Buka Selamanya</span></div></div>
//                             {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3"><div><span className="text-xs text-gray-500 block mb-1">Mulai *</span><input type="date" disabled={isScheduleLocked} className="w-full p-2 border rounded bg-white text-gray-800" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} aria-label="Mulai Pendaftaran"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai *</span><input type="date" disabled={isScheduleLocked} className="w-full p-2 border rounded bg-white text-gray-800" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} aria-label="Selesai Pendaftaran"/></div></div>)}
//                         </div>
                        
//                         {/* EXECUTION PERIOD */}
//                         <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 ${isScheduleLocked ? 'opacity-70 pointer-events-none' : ''}`}>
//                             <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
//                             <div className="flex items-center gap-2 mb-2"><div onClick={() => !isScheduleLocked && handleChange('execIsForever', !formData.execIsForever)} className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.execIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-sm text-gray-600">Fleksibel</span></div></div>
//                             {!formData.execIsForever && (<div className="grid grid-cols-2 gap-3"><div><span className="text-xs text-gray-500 block mb-1">Mulai *</span><input type="date" disabled={isScheduleLocked} className="w-full p-2 border rounded bg-white text-gray-800" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} aria-label="Mulai Pelaksanaan"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai *</span><input type="date" disabled={isScheduleLocked} className="w-full p-2 border rounded bg-white text-gray-800" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} aria-label="Selesai Pelaksanaan"/></div></div>)}
//                         </div>
//                     </div>
                    
//                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 relative overflow-hidden"><div className="absolute top-0 right-0 p-4"><Lock className="text-gray-300" size={20}/></div><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan *</label><div className="p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Wilayah / Organizer</p><h3 className="text-lg font-bold text-gray-800">{organizerDisplay}</h3><p className="text-xs text-gray-500 mt-1">Kode Wilayah: {regionCodeDisplay !== 'national' ? regionCodeDisplay : 'NASIONAL'}</p></div><p className="text-[10px] text-orange-600 flex items-center gap-1 bg-orange-50 p-2 rounded"><AlertCircle size={12}/> Pelaksana sudah ditentukan saat pengajuan dan tidak dapat diubah di sini.</p></div>
//                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3"><label className="text-sm font-bold text-gray-700">Metode Penerimaan Peserta</label><div className="flex gap-4 mb-4"><div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex-1 p-3 border rounded cursor-pointer ${formData.registrationMethod==='auto'?'bg-green-50 border-green-500':''}`}><p className="font-bold text-sm">Otomatis (Langsung Aktif)</p><p className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</p></div><div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex-1 p-3 border rounded cursor-pointer ${formData.registrationMethod==='manual'?'bg-yellow-50 border-yellow-500':''}`}><p className="font-bold text-sm">Manual (Verifikasi Admin)</p><p className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</p></div></div></div>
//                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="flex justify-between items-start mb-4"><div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div><div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer"><div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs?'bg-red-600 border-red-600':''}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span></div></div>{formData.requireDocs && (<div className="space-y-3"><div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} aria-label="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50"><Upload size={14}/> Upload Template Baru</button></div>{formData.registrationTemplates.map((item: any, idx: number) => (<div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg"><div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div><div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} aria-label="Nama Dokumen"/><a href={getLocalDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()}><Download size={10} /> Lihat File Uploaded</a></div><button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" aria-label="Hapus Template"><Trash2 size={16} /></button></div>))}</div>)}</div>
//                 </div>
//             )}
            
//             {activeTab === 'facilities' && (
//                 <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2"><div className="space-y-6"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" aria-label="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded" value={formData.estimatedDuration} disabled aria-label="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded" value={formData.totalJp} disabled aria-label="Total JP"/></div></div></div></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas *</label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} aria-label="Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" aria-label="Tambah"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" aria-label="Hapus"><X size={14}/></button></div>))}</div></div></div>
//             )}

//             {/* TAB 5 - TIM (LOCKED LOGIC) */}
//             {activeTab === 'team' && (
//                 <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2">
//                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="font-bold text-gray-800 flex items-center gap-2"><Users size={18}/> Tim Fasilitator</h3>
//                             {isTeamLocked && <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded border flex items-center gap-1"><Lock size={10}/> Terkunci</span>}
//                         </div>
                        
//                         {isTeamLocked && (
//                             <div className="mb-4 bg-blue-50 text-blue-700 text-xs p-3 rounded-lg border border-blue-100">
//                                 <strong>Info:</strong> Tim fasilitator sudah ditetapkan. Penambahan anggota tim lebih lanjut dilakukan melalui menu <strong>"Susun Modul (Content Editor)"</strong> pada masing-masing modul.
//                             </div>
//                         )}

//                         <div className="mb-4 space-y-2">
//                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Anggota Tim ({selectedFacilitatorsList.length})</p>
//                             {selectedFacilitatorsList.map(fac => (
//                                 <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-200 hover:border-green-200 transition-colors">
//                                     <div className="flex items-center gap-3">
//                                         <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-bold text-xs border border-green-100">{fac.name?.charAt(0)}</div>
//                                         <div>
//                                             <span className="text-sm font-bold text-gray-800 block">{fac.name}</span>
//                                             <span className="text-[10px] text-gray-500 flex items-center gap-1"><MapPin size={10}/> {getUserLocation(fac)}</span>
//                                         </div>
//                                     </div>
//                                     {!isTeamLocked && (
//                                         <button type="button" onClick={() => removeFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-50 border border-gray-100 shadow-sm" title="Hapus"><X size={14}/></button>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Search hanya muncul jika tim belum dilock */}
//                         {!isTeamLocked && (
//                             <div className="relative">
//                                 <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//                                 <input type="text" placeholder="Cari nama atau email..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchFacilitator} onChange={(e) => setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator"/>
//                                 {searchFacilitator && (
//                                     <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-60 overflow-y-auto z-20">
//                                         {filteredFacilitators.length > 0 ? filteredFacilitators.map(fac => (
//                                             <button key={fac._id || fac.id} type="button" onClick={() => addFacilitator(fac)} className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-0 flex items-center justify-between group">
//                                                 <div className="flex items-center gap-3">
//                                                     <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{fac.name?.charAt(0)}</div>
//                                                     <div>
//                                                         <p className="text-sm font-bold text-gray-700">{fac.name}</p>
//                                                         <p className="text-[10px] text-gray-500 flex items-center gap-1"><MapPin size={10}/> {getUserLocation(fac)}</p>
//                                                     </div>
//                                                 </div>
//                                                 <Plus size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
//                                             </button>
//                                         )) : (
//                                             <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>
//                                         )}
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>
                    
//                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
//                         <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between"><div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div><div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div></div>
//                         <div className="space-y-2 mb-4">
//                             <label className="text-sm font-bold text-gray-700 block">Daftar PIC Tambahan</label>
//                             {formData.pics.map((pic: any, idx: number) => (
//                                 <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in slide-in-from-top-1">
//                                     <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">{pic.name?.charAt(0)}</div><div><span className="text-sm font-bold text-blue-900 block">{pic.name}</span><div className="flex gap-2"><span className="text-[10px] text-blue-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full border border-blue-100">PIC</span><span className="text-[10px] text-gray-500">{pic.email}</span></div></div></div>
//                                     {!isTeamLocked && <button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>}
//                                 </div>
//                             ))}
//                         </div>
//                         {!isTeamLocked && formData.pics.length < 3 ? (
//                             <div className="relative">
//                                 <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//                                 <input type="text" placeholder="Cari PIC (Ketik nama)..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchPic} onChange={(e) => setSearchPic(e.target.value)} aria-label="Cari PIC"/>
//                                 {searchPic && (
//                                     <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-60 overflow-y-auto z-20">
//                                         {filteredPics.length > 0 ? filteredPics.map(user => (
//                                             <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-0 flex items-center justify-between group">
//                                                 <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div></div><UserPlus size={16} className="text-green-500"/>
//                                             </button>
//                                         )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
//                                     </div>
//                                 )}
//                             </div>
//                         ) : null}
//                     </div>

//                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckSquare size={18}/> Kontak Utama (Landing Page)</h3></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Nama Kontak *</label><input name="contactName" value={formData.contactName} onChange={(e) => handleChange('contactName', e.target.value)} className="w-full p-2 border rounded" aria-label="Nama Kontak"/></div><div><label className="text-xs font-bold text-gray-500">Email Kontak *</label><input name="contactEmail" value={formData.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} className="w-full p-2 border rounded" aria-label="Email Kontak"/></div><div className="md:col-span-2"><label className="text-xs font-bold text-gray-500">Nomor Telepon/WA *</label><input name="contactPhone" value={formData.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} className="w-full p-2 border rounded" placeholder="628..." aria-label="Telepon Kontak"/></div></div></div>
//                 </div>
//             )}
            
//             {showManualInput && (
//                 <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-black/50">
//                     <div className="bg-white p-6 rounded-xl w-full max-w-sm">
//                         <h3 className="font-bold text-lg mb-4">Tambah Manual</h3>
//                         <input className="w-full p-2 border rounded mb-2" placeholder="Nama Lengkap" value={manualName} onChange={e=>setManualName(e.target.value)} aria-label="Manual Nama"/>
//                         <input className="w-full p-2 border rounded mb-4" placeholder="Email" value={manualEmail} onChange={e=>setManualEmail(e.target.value)} aria-label="Manual Email"/>
//                         <div className="flex justify-end gap-2">
//                             <button onClick={() => setShowManualInput(null)} className="px-4 py-2 border rounded">Batal</button>
//                             <button onClick={handleManualAdd} className="px-4 py-2 bg-blue-600 text-white rounded">Simpan</button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {showDisclaimer && (
//                 <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in"><div className="absolute inset-0 bg-black/80"></div><div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 text-center space-y-4"><div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2"><ShieldCheck size={32} className="text-orange-600"/></div><h3 className="text-xl font-bold text-gray-900">Pernyataan Disclaimer</h3><p className="text-sm text-gray-500 leading-relaxed">Saya menyatakan bahwa data pelatihan ini benar.</p><label className="flex items-center justify-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors"><input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} className="w-5 h-5 accent-orange-600" aria-label="Setuju"/><span className="font-bold text-sm text-orange-800">Saya Setuju</span></label><div className="flex gap-3 pt-2"><button onClick={() => setShowDisclaimer(false)} className="flex-1 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50">Kembali</button><button onClick={handleFinalSubmit} disabled={!isAgreed || loading} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">{loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Proses Simpan</button></div></div></div>
//             )}
//         </BaseModal>
//     );
// }
'use client';

import { useState, useRef, useEffect } from 'react';
import { 
    X, Upload, Plus, Trash2, Save, Calendar, 
    Video, Image as ImageIcon, Users, FileText, 
    CheckCircle, AlertCircle, Award, Clock, Search, 
    Download, File, Loader2, UserPlus, 
    ShieldCheck, CheckSquare, Building, MapPin, Lock, 
    UserCircle, LayoutGrid, Book, CheckCircle2, Info 
} from 'lucide-react';
import { api, apiUpload } from '@/lib/api'; 
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'; 
import BaseModal from '@/components/ui/BaseModal'; 

const ReactQuill = dynamic(() => import('react-quill'), { 
    ssr: false,
    loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface CourseFormModalProps {
    course?: any; 
    onClose: () => void;
    onSuccess: () => void;
    facilitators: any[]; 
    currentUser: any; 
}

const MEMBER_TYPES = ['PMR', 'KSR', 'TSR', 'Pegawai', 'Pengurus', 'Umum'];

export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
    const [activeTab, setActiveTab] = useState('info');
    const [loading, setLoading] = useState(false);
    const [fetchingDetail, setFetchingDetail] = useState(false);
    
    // Refs
    const fileInputRef = useRef<HTMLInputElement>(null); 
    const templateInputRef = useRef<HTMLInputElement>(null); 
    
    // State Search
    const [searchFacilitator, setSearchFacilitator] = useState('');
    const [searchPic, setSearchPic] = useState('');
    const [allSystemUsers, setAllSystemUsers] = useState<any[]>([]);
    
    // State UI
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const [organizerDisplay, setOrganizerDisplay] = useState('');
    const [regionCodeDisplay, setRegionCodeDisplay] = useState('');
    const [newFacility, setNewFacility] = useState('');
    const [uploadingCover, setUploadingCover] = useState(false);
    const [uploadingTemplate, setUploadingTemplate] = useState(false);
    const [showManualInput, setShowManualInput] = useState<string | null>(null);
    const [manualName, setManualName] = useState('');
    const [manualEmail, setManualEmail] = useState('');

    const [selectedFacilitatorsList, setSelectedFacilitatorsList] = useState<any[]>([]);

    // --- LOCKING LOGIC ---
    const isProgramLocked = !!course?._id; 
    const isParticipantsLocked = !!course?._id;
    const isScheduleLocked = !!(course?.registrationPeriod?.startDate && course?.executionPeriod?.startDate);
    const isTeamLocked = !!(course?.facilitatorIds && course.facilitatorIds.length > 0);

    // --- HELPER FUNCTION ---
    const getUserLocation = (u: any) => {
        if (!u) return '-';
        const city = u.city || u.memberData?.regency;
        const prov = u.province || u.memberData?.province;
        
        if (city) return `${city}, ${prov || ''}`;
        if (prov) return prov;
        
        if (u.managedRegencies?.length > 0) return `Admin: ${u.managedRegencies[0]}`;
        if (u.managedProvinces?.length > 0) return `Admin: ${u.managedProvinces[0]}`;

        return 'Nasional';
    };

    const getLocalDisplayUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        const cleanPath = url.startsWith('/') ? url : `/${url}`;
        return `${API_BASE_URL}${cleanPath}`;
    };

    // --- INITIAL STATE ---
    const defaultState = {
        title: '', description: '', 
        programType: 'training', 
        hasCertificate: true,
        regIsForever: false, regStartDate: '', regEndDate: '',
        execIsForever: false, execStartDate: '', execEndDate: '',
        thumbnailUrl: '', promoVideoUrl: '',
        registrationMethod: 'auto', 
        requireDocs: true, 
        registrationTemplates: [] as any[], 
        price: 0, estimatedDuration: 0, totalJp: 0, 
        facilities: [] as string[], 
        facilitatorIds: [] as string[],
        pics: [] as any[], 
        creatorInfo: null as any,
        contactName: '', contactPhone: '', contactEmail: '',
        targetParticipants: [] as string[] 
    };

    const [formData, setFormData] = useState(defaultState);

    // --- LOAD ALL USERS ---
    useEffect(() => {
        const loadAllData = async () => {
            try {
                let res = await api('/api/admin/users?limit=3000').catch(() => null);
                if (!res) res = await api('/api/users?limit=3000').catch(() => ({ users: [] }));
                
                let cleanUsers = [];
                if (res.users && Array.isArray(res.users)) cleanUsers = res.users;
                else if (Array.isArray(res)) cleanUsers = res;
                
                if (cleanUsers.length === 0 && facilitators) cleanUsers = facilitators;
                setAllSystemUsers(cleanUsers);
            } catch (e) {
                setAllSystemUsers(facilitators || []);
            }
        };
        loadAllData();
    }, [facilitators]);

    // --- LOAD COURSE DETAIL ---
    useEffect(() => {
        const initData = async () => {
            if (course && course._id) {
                setFetchingDetail(true);
                try {
                    const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
                    const fullData = res.course || res.data || res;
                    populateForm(fullData);
                } catch (e) {
                    populateForm(course);
                } finally {
                    setFetchingDetail(false);
                }
            } else {
                if (currentUser) {
                     setFormData(prev => ({
                        ...prev,
                        contactName: currentUser.name,
                        contactEmail: currentUser.email,
                        contactPhone: currentUser.phoneNumber || ''
                      }));
                      const org = currentUser.role === 'SUPER_ADMIN' ? 'PMI Pusat' : (currentUser.organizer || 'PMI Wilayah');
                      setOrganizerDisplay(org);
                      setRegionCodeDisplay('Menunggu Proposal');
                }
            }
        };
        initData();
    }, [course]);

    const populateForm = (data: any) => {
        const formatDate = (d: string) => {
            if (!d) return '';
            try { return new Date(d).toISOString().split('T')[0]; } catch (e) { return ''; }
        };

        let initialPics = Array.isArray(data.pics) ? data.pics : [];
        if (Array.isArray(data.picIds) && data.picIds.length > 0) {
            initialPics = data.picIds.map((p: any) => ({
                id: p._id || p.id,
                name: p.name,
                email: p.email,
                role: p.role,
                avatarUrl: p.avatarUrl
            }));
        }

        const facIds = Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [];
        
        let initialSelectedFacs: any[] = [];
        if (data.facilitatorIds && data.facilitatorIds.length > 0 && typeof data.facilitatorIds[0] === 'object') {
             initialSelectedFacs = data.facilitatorIds;
        }
        setSelectedFacilitatorsList(initialSelectedFacs);

        setFormData({
            title: data.title || '', description: data.description || '', 
            programType: data.programType || 'training', 
            hasCertificate: data.hasCertificate ?? true,
            regIsForever: data.registrationPeriod?.isForever ?? false,
            regStartDate: formatDate(data.registrationPeriod?.startDate),
            regEndDate: formatDate(data.registrationPeriod?.endDate),
            execIsForever: data.executionPeriod?.isForever ?? false,
            execStartDate: formatDate(data.executionPeriod?.startDate),
            execEndDate: formatDate(data.executionPeriod?.endDate),
            thumbnailUrl: data.thumbnailUrl || '', promoVideoUrl: data.promoVideoUrl || '',
            registrationMethod: data.registrationMethod || 'auto',
            requireDocs: data.registrationConfig?.requireDocs !== false,
            registrationTemplates: Array.isArray(data.registrationConfig?.templates) ? data.registrationConfig.templates : [],
            price: Number(data.price) || 0, estimatedDuration: Number(data.estimatedDuration) || 0, totalJp: Number(data.totalJp) || 0,
            facilities: Array.isArray(data.facilities) ? data.facilities : [],
            facilitatorIds: facIds,
            pics: initialPics, 
            creatorInfo: data.creatorInfo || null,
            contactName: data.contact?.name || data.creatorInfo?.name || '',
            contactEmail: data.contact?.email || data.creatorInfo?.email || '',
            contactPhone: data.contact?.phone || data.creatorInfo?.contact || '',
            targetParticipants: data.targetParticipants || [] 
        });

        setOrganizerDisplay(data.organizer || 'PMI Pusat');
        setRegionCodeDisplay(data.regionCode || 'Nasional');
    }

    // --- EFFECT SYNC FACILITATOR ---
    useEffect(() => {
        if (allSystemUsers.length > 0 && formData.facilitatorIds.length > 0) {
            const matched = allSystemUsers.filter(u => formData.facilitatorIds.includes(u._id || u.id));
            const map = new Map();
            [...selectedFacilitatorsList, ...matched].forEach(u => map.set(u._id || u.id, u));
            setSelectedFacilitatorsList(Array.from(map.values()));
        }
    }, [allSystemUsers]);

    // --- HANDLERS ---
    const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
    const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
    const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };

    const addFacilitator = (user: any) => {
        const uid = user._id || user.id;
        if (formData.facilitatorIds.includes(uid)) return;
        setFormData(prev => ({ ...prev, facilitatorIds: [...prev.facilitatorIds, uid] }));
        setSelectedFacilitatorsList(prev => [...prev, user]);
        setSearchFacilitator(''); 
    };

    const removeFacilitator = (uid: string) => {
        setFormData(prev => ({ ...prev, facilitatorIds: prev.facilitatorIds.filter(id => id !== uid) }));
        setSelectedFacilitatorsList(prev => prev.filter(u => (u._id || u.id) !== uid));
    };

    const handleAddPicFromSearch = (user: any) => {
        if (formData.pics.length >= 3) return alert("Maksimal 3 PIC Tambahan");
        if (formData.pics.some((p: any) => p.email === user.email)) return alert("User ini sudah ditambahkan.");
        const newPic = { id: user._id || user.id, name: user.name, pmiStatus: user.role, email: user.email, avatarUrl: user.avatarUrl };
        setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
        setSearchPic('');
    };

    const removePic = (idx: number) => { setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); };
    
    // Toggle Unsur Peserta
    const toggleParticipant = (type: string) => {
        if (isParticipantsLocked) return; 
        setFormData(prev => ({
            ...prev,
            targetParticipants: prev.targetParticipants.includes(type)
                ? prev.targetParticipants.filter((t:string) => t !== type)
                : [...prev.targetParticipants, type]
        }));
    };

    // Manual Add Logic
    const handleManualAdd = () => { 
        if (!manualName || !manualEmail) return alert("Isi nama dan email."); 
        const newEntry = { id: `manual_${Date.now()}`, name: manualName, email: manualEmail, role: 'GUEST', avatarUrl: '' }; 
        if (showManualInput === 'facilitator') { 
            setFormData(prev => ({ ...prev, facilitatorIds: [...prev.facilitatorIds, newEntry.id] })); 
            setSelectedFacilitatorsList(prev => [...prev, newEntry]); 
        } else { 
            if (formData.pics.length >= 3) return alert("Maksimal 3 PIC."); 
            setFormData(prev => ({ ...prev, pics: [...prev.pics, { ...newEntry, pmiStatus: 'EKSTERNAL' }] })); 
        } 
        setManualName(''); setManualEmail(''); setShowManualInput(null); 
    };

    // Upload Handlers
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        try {
            setUploadingCover(true); const fd = new FormData(); fd.append('file', file);
            const res = await apiUpload('/api/upload', fd); 
            const url = res.url || res.file?.url || res.data?.url;
            if (url) handleChange('thumbnailUrl', url);
        } catch (err: any) { alert('Gagal: ' + err.message); } finally { setUploadingCover(false); }
    };

    const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        setUploadingTemplate(true);
        try {
            const fd = new FormData(); fd.append('file', file);
            const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
            const token = userStr ? JSON.parse(userStr).token : '';
            const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }, withCredentials: true });
            const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url;
            if (!rawUrl) throw new Error("Gagal dapat URL.");
            setFormData(prev => ({ ...prev, registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }] }));
        } catch (err: any) { console.error(err); alert('Upload Gagal: ' + (err.response?.data?.message || err.message)); } finally { setUploadingTemplate(false); if (templateInputRef.current) templateInputRef.current.value = ''; }
    };

    const removeTemplate = (idx: number) => { if(!confirm("Hapus dokumen ini?")) return; setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) })); };
    const updateTemplateTitle = (idx: number, v: string) => { const t = [...formData.registrationTemplates]; t[idx].title = v; setFormData(prev => ({ ...prev, registrationTemplates: t })); };
    
    const handlePreSubmit = () => { 
        if (!formData.title) return alert("Judul wajib diisi!"); 
        if (formData.targetParticipants.length === 0) return alert("Pilih minimal satu unsur peserta.");
        setShowDisclaimer(true); 
    };
    
    const handleFinalSubmit = async () => {
        if (!isAgreed) return alert("Mohon setujui pernyataan disclaimer.");
        setLoading(true);
        try {
            const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
            const picIds = validPics.map((p: any) => p.id || p._id).filter((id: any) => id && !id.toString().startsWith('manual_'));
            const parseDate = (d: string) => d ? new Date(d) : null;

            const payload = {
                title: formData.title, description: formData.description, programType: formData.programType, hasCertificate: formData.hasCertificate,
                price: Number(formData.price), estimatedDuration: Number(formData.estimatedDuration), totalJp: Number(formData.totalJp),
                thumbnailUrl: formData.thumbnailUrl, promoVideoUrl: formData.promoVideoUrl, 
                organizer: organizerDisplay, 
                registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
                executionPeriod: { isForever: formData.execIsForever, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
                registrationMethod: formData.registrationMethod,
                registrationConfig: { requireDocs: formData.requireDocs, templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) },
                facilities: formData.facilities, facilitatorIds: formData.facilitatorIds.filter(id => !id.toString().startsWith('manual_')), pics: validPics, picIds: picIds, 
                creatorInfo: formData.creatorInfo, contact: { name: formData.contactName, email: formData.contactEmail, phone: formData.contactPhone },
                targetParticipants: formData.targetParticipants
            };

            if (course?._id) await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
            else await api('/api/courses', { method: 'POST', body: payload });
            alert("Berhasil disimpan!"); onSuccess();
        } catch (err: any) { console.error(err); alert("Gagal: " + (err.response?.data?.message || err.message)); } finally { setLoading(false); setShowDisclaimer(false); }
    };

    const handleAdminApproveInfo = async () => {
        if(!confirm("Yakin data informasi pelatihan ini sudah valid?")) return;
        setLoading(true);
        try { 
            await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { isInfoCompleted: true } }); 
            alert("✅ Informasi Disetujui! Gear Modul Terbuka."); 
            onSuccess(); onClose(); 
        } catch (err: any) { alert("Gagal: " + err.message); } finally { setLoading(false); }
    };

    const handleAdminRejectInfo = async () => {
        const reason = prompt("Masukkan alasan pengembalian (revisi):");
        if (!reason) return;
        setLoading(true);
        try {
            await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { status: 'revision', isInfoCompleted: false, rejectionReason: reason } });
            alert("⚠️ Pelatihan dikembalikan untuk revisi.");
            onSuccess(); onClose();
        } catch (e: any) { alert("Gagal: " + e.message); } finally { setLoading(false); }
    };

    const filteredFacilitators = allSystemUsers.filter(u => {
        const keyword = searchFacilitator.toLowerCase();
        const role = (u.role || '').toUpperCase();
        if (!['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'].includes(role)) return false;
        if (formData.facilitatorIds.includes(u._id || u.id)) return false;
        return (u.name || '').toLowerCase().includes(keyword) || (u.email || '').toLowerCase().includes(keyword);
    });

    const filteredPics = allSystemUsers.filter(u => {
        const keyword = searchPic.toLowerCase();
        if (formData.pics.some((p: any) => p.email === u.email)) return false;
        return (u.name || '').toLowerCase().includes(keyword) || (u.email || '').toLowerCase().includes(keyword);
    });

    const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'ADMIN';
    const isInfoCompleted = course?.isInfoCompleted === true;

    if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><Loader2 className="animate-spin text-white"/></div>;

    const footerButtons = (
        <>
            <div className="flex-1 text-xs text-gray-500 hidden md:block text-left">Status: <span className="font-bold uppercase">{course?.status || 'Baru'}</span></div>
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50">Batal</button>
            {isSuperAdmin && !isInfoCompleted && course?._id && (
                <>
                    <button onClick={handleAdminRejectInfo} disabled={loading} className="px-5 py-2.5 rounded-xl bg-orange-100 text-orange-700 font-bold text-sm hover:bg-orange-200 border border-orange-200">Revisi</button>
                    <button onClick={handleAdminApproveInfo} disabled={loading} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-md flex items-center gap-2">{loading ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18}/>} Setujui Informasi</button>
                </>
            )}
            <button onClick={handlePreSubmit} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] shadow-lg flex items-center gap-2 disabled:opacity-50">{loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Simpan Perubahan</button>
        </>
    );

    return (
        <BaseModal isOpen={true} onClose={onClose} title={course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'} subTitle="Lengkapi data pelatihan." size="full" footer={footerButtons}>
            <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0 mb-6 -mx-6 px-6 pt-2">
                {[{ id: 'info', label: '1. Informasi Dasar', icon: FileText }, { id: 'media', label: '2. Media & Visual', icon: ImageIcon }, { id: 'registration', label: '3. Jadwal & Pelaksana', icon: Calendar }, { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award }, { id: 'team', label: '5. Tim & PIC', icon: Users }].map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}><tab.icon size={16} /> {tab.label}</button>
                ))}
            </div>

            {/* TAB 1 */}
            {activeTab === 'info' && (
                <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-2">
                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Judul Pelatihan *</label>
                            <input required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" value={formData.title} onChange={e => handleChange('title', e.target.value)} placeholder="Contoh: Pelatihan Dasar KSR" aria-label="Judul"/>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                Kategori Program 
                                {isProgramLocked && <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded border flex items-center gap-1"><Lock size={10}/> Terkunci dari Proposal</span>}
                            </label>
                            <div className="flex gap-4">
                                <button onClick={() => !isProgramLocked && handleChange('programType', 'training')} disabled={isProgramLocked} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${formData.programType === 'training' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-gray-200 text-gray-500'} ${isProgramLocked ? 'cursor-not-allowed opacity-80' : 'hover:bg-gray-50'}`}>
                                    <LayoutGrid size={16}/> Diklat Resmi
                                </button>
                                <button onClick={() => !isProgramLocked && handleChange('programType', 'course')} disabled={isProgramLocked} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${formData.programType === 'course' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-500'} ${isProgramLocked ? 'cursor-not-allowed opacity-80' : 'hover:bg-gray-50'}`}>
                                    <Book size={16}/> Kursus Mandiri
                                </button>
                            </div>
                        </div>

                        {/* [BARU] UNSUR PESERTA LOCKED */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <label className="text-sm font-bold text-gray-700 mb-3 flex items-center justify-between">
                                <span className="flex items-center gap-2"><Users size={16}/> Unsur Peserta (Wajib)</span>
                                {isParticipantsLocked && <span className="text-[10px] bg-white border px-2 py-0.5 rounded flex items-center gap-1 text-gray-500"><Lock size={10}/> Terkunci</span>}
                            </label>
                            <div className="flex flex-wrap gap-2 mb-1">
                                {MEMBER_TYPES.map(type => {
                                    const isSelected = formData.targetParticipants.includes(type);
                                    return (
                                        <button
                                            key={type}
                                            onClick={() => toggleParticipant(type)}
                                            disabled={isParticipantsLocked}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${isSelected ? 'bg-gray-800 text-white border-gray-900 shadow-sm' : 'bg-white text-gray-400 border-gray-200'} ${isParticipantsLocked ? 'cursor-not-allowed opacity-70' : 'hover:border-gray-400'}`}
                                        >
                                            {isSelected && <CheckCircle2 size={12} className="inline mr-1 -mt-0.5"/>}
                                            {type}
                                        </button>
                                    );
                                })}
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2 italic">* Diatur saat pengajuan proposal.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap *</label>
                            <div className="bg-white border rounded-lg overflow-hidden">
                                <ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" aria-label="Deskripsi"/>
                            </div>
                        </div>
                     </div>
                     
                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
                        <div className="flex items-center gap-3">
                            <div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div>
                                <span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span>
                            </div>
                        </div>
                     </div>
                </div>
            )}
            
            {/* TAB 2 */}
            {activeTab === 'media' && (
                <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) *</label><div className="flex gap-6 items-start"><div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">{formData.thumbnailUrl ? <img src={getLocalDisplayUrl(formData.thumbnailUrl)} alt="Preview" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1"/><span className="text-xs">Belum ada gambar</span></div>}{uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}</div><div className="flex-1"><p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p><input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" aria-label="Input Gambar"/><button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2"><Upload size={16}/> Upload Gambar</button></div></div></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label><input type="text" className="w-full p-2.5 border rounded-lg" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} aria-label="URL Video"/></div></div>
            )}
            
            {/* TAB 3 */}
            {activeTab === 'registration' && (
                <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    {isScheduleLocked && <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-xs text-blue-700 flex items-center gap-2 mb-2"><Info size={14}/> Jadwal pelatihan terkunci karena sudah disimpan sebelumnya. Hubungi admin pusat jika ada perubahan mendesak.</div>}
                    
                    <div className="grid grid-cols-2 gap-6">
                        {/* REGISTRATION PERIOD */}
                        <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 ${isScheduleLocked ? 'opacity-70 pointer-events-none' : ''}`}>
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
                            <div className="flex items-center gap-2 mb-2"><div onClick={() => !isScheduleLocked && handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-sm text-gray-600">Buka Selamanya</span></div></div>
                            {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3"><div><span className="text-xs text-gray-500 block mb-1">Mulai *</span><input type="date" disabled={isScheduleLocked} className="w-full p-2 border rounded bg-white text-gray-800" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} aria-label="Mulai Pendaftaran"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai *</span><input type="date" disabled={isScheduleLocked} className="w-full p-2 border rounded bg-white text-gray-800" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} aria-label="Selesai Pendaftaran"/></div></div>)}
                        </div>
                        
                        {/* EXECUTION PERIOD */}
                        <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 ${isScheduleLocked ? 'opacity-70 pointer-events-none' : ''}`}>
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
                            <div className="flex items-center gap-2 mb-2"><div onClick={() => !isScheduleLocked && handleChange('execIsForever', !formData.execIsForever)} className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.execIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-sm text-gray-600">Fleksibel</span></div></div>
                            {!formData.execIsForever && (<div className="grid grid-cols-2 gap-3"><div><span className="text-xs text-gray-500 block mb-1">Mulai *</span><input type="date" disabled={isScheduleLocked} className="w-full p-2 border rounded bg-white text-gray-800" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} aria-label="Mulai Pelaksanaan"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai *</span><input type="date" disabled={isScheduleLocked} className="w-full p-2 border rounded bg-white text-gray-800" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} aria-label="Selesai Pelaksanaan"/></div></div>)}
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 relative overflow-hidden"><div className="absolute top-0 right-0 p-4"><Lock className="text-gray-300" size={20}/></div><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan *</label><div className="p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Wilayah / Organizer</p><h3 className="text-lg font-bold text-gray-800">{organizerDisplay}</h3><p className="text-xs text-gray-500 mt-1">Kode Wilayah: {regionCodeDisplay !== 'national' ? regionCodeDisplay : 'NASIONAL'}</p></div><p className="text-[10px] text-orange-600 flex items-center gap-1 bg-orange-50 p-2 rounded"><AlertCircle size={12}/> Pelaksana sudah ditentukan saat pengajuan dan tidak dapat diubah di sini.</p></div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3"><label className="text-sm font-bold text-gray-700">Metode Penerimaan Peserta</label><div className="flex gap-4 mb-4"><div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex-1 p-3 border rounded cursor-pointer ${formData.registrationMethod==='auto'?'bg-green-50 border-green-500':''}`}><p className="font-bold text-sm">Otomatis (Langsung Aktif)</p><p className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</p></div><div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex-1 p-3 border rounded cursor-pointer ${formData.registrationMethod==='manual'?'bg-yellow-50 border-yellow-500':''}`}><p className="font-bold text-sm">Manual (Verifikasi Admin)</p><p className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</p></div></div></div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="flex justify-between items-start mb-4"><div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div><div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer"><div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs?'bg-red-600 border-red-600':''}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span></div></div>{formData.requireDocs && (<div className="space-y-3"><div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} aria-label="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50"><Upload size={14}/> Upload Template Baru</button></div>{formData.registrationTemplates.map((item: any, idx: number) => (<div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg"><div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div><div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} aria-label="Nama Dokumen"/><a href={getLocalDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()}><Download size={10} /> Lihat File Uploaded</a></div><button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" aria-label="Hapus Template"><Trash2 size={16} /></button></div>))}</div>)}</div>
                </div>
            )}
            
            {/* TAB 4 */}
            {activeTab === 'facilities' && (
                <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2"><div className="space-y-6"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" aria-label="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded" value={formData.estimatedDuration} disabled aria-label="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded" value={formData.totalJp} disabled aria-label="Total JP"/></div></div></div></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas *</label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} aria-label="Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" aria-label="Tambah"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" aria-label="Hapus"><X size={14}/></button></div>))}</div></div></div>
            )}

            {/* TAB 5 - TIM (LOCKED LOGIC) */}
            {activeTab === 'team' && (
                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2"><Users size={18}/> Tim Fasilitator</h3>
                            {isTeamLocked && <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded border flex items-center gap-1"><Lock size={10}/> Terkunci</span>}
                        </div>
                        
                        {isTeamLocked && (
                            <div className="mb-4 bg-blue-50 text-blue-700 text-xs p-3 rounded-lg border border-blue-100">
                                <strong>Info:</strong> Tim fasilitator sudah ditetapkan. Penambahan anggota tim lebih lanjut dilakukan melalui menu <strong>"Susun Modul (Content Editor)"</strong> pada masing-masing modul.
                            </div>
                        )}

                        <div className="mb-4 space-y-2">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Anggota Tim ({selectedFacilitatorsList.length})</p>
                            {selectedFacilitatorsList.map(fac => (
                                <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-200 hover:border-green-200 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-bold text-xs border border-green-100">{fac.name?.charAt(0)}</div>
                                        <div>
                                            <span className="text-sm font-bold text-gray-800 block">{fac.name}</span>
                                            <span className="text-[10px] text-gray-500 flex items-center gap-1"><MapPin size={10}/> {getUserLocation(fac)}</span>
                                        </div>
                                    </div>
                                    {!isTeamLocked && (
                                        <button type="button" onClick={() => removeFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-50 border border-gray-100 shadow-sm" title="Hapus"><X size={14}/></button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {!isTeamLocked && (
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                                <input type="text" placeholder="Cari nama atau email..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchFacilitator} onChange={(e) => setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator"/>
                                {searchFacilitator && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-60 overflow-y-auto z-20">
                                        {filteredFacilitators.length > 0 ? filteredFacilitators.map(fac => (
                                            <button key={fac._id || fac.id} type="button" onClick={() => addFacilitator(fac)} className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-0 flex items-center justify-between group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{fac.name?.charAt(0)}</div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-700">{fac.name}</p>
                                                        <p className="text-[10px] text-gray-500 flex items-center gap-1"><MapPin size={10}/> {getUserLocation(fac)}</p>
                                                        <p className="text-[9px] text-gray-400">{fac.email} • {fac.role}</p>
                                                    </div>
                                                </div>
                                                <Plus size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                            </button>
                                        )) : (
                                            <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
                        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between"><div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div><div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div></div>
                        <div className="space-y-2 mb-4">
                            <label className="text-sm font-bold text-gray-700 block">Daftar PIC Tambahan</label>
                            {formData.pics.map((pic: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in slide-in-from-top-1">
                                    <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">{pic.name?.charAt(0)}</div><div><span className="text-sm font-bold text-blue-900 block">{pic.name}</span><div className="flex gap-2"><span className="text-[10px] text-blue-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full border border-blue-100">PIC</span><span className="text-[10px] text-gray-500">{pic.email}</span></div></div></div>
                                    {!isTeamLocked && <button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>}
                                </div>
                            ))}
                        </div>
                        {!isTeamLocked && formData.pics.length < 3 ? (
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                                <input type="text" placeholder="Cari PIC (Ketik nama)..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchPic} onChange={(e) => setSearchPic(e.target.value)} aria-label="Cari PIC"/>
                                {searchPic && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-60 overflow-y-auto z-20">
                                        {filteredPics.length > 0 ? filteredPics.map(user => (
                                            <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-0 flex items-center justify-between group">
                                                <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div></div><UserPlus size={16} className="text-green-500"/>
                                            </button>
                                        )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckSquare size={18}/> Kontak Utama (Landing Page)</h3></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Nama Kontak *</label><input name="contactName" value={formData.contactName} onChange={(e) => handleChange('contactName', e.target.value)} className="w-full p-2 border rounded" aria-label="Nama Kontak"/></div><div><label className="text-xs font-bold text-gray-500">Email Kontak *</label><input name="contactEmail" value={formData.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} className="w-full p-2 border rounded" aria-label="Email Kontak"/></div><div className="md:col-span-2"><label className="text-xs font-bold text-gray-500">Nomor Telepon/WA *</label><input name="contactPhone" value={formData.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} className="w-full p-2 border rounded" placeholder="628..." aria-label="Telepon Kontak"/></div></div></div>
                </div>
            )}
            
            {showManualInput && (
                <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-sm">
                        <h3 className="font-bold text-lg mb-4">Tambah Manual</h3>
                        <input className="w-full p-2 border rounded mb-2" placeholder="Nama Lengkap" value={manualName} onChange={e=>setManualName(e.target.value)} aria-label="Manual Nama"/>
                        <input className="w-full p-2 border rounded mb-4" placeholder="Email" value={manualEmail} onChange={e=>setManualEmail(e.target.value)} aria-label="Manual Email"/>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowManualInput(null)} className="px-4 py-2 border rounded">Batal</button>
                            <button onClick={handleManualAdd} className="px-4 py-2 bg-blue-600 text-white rounded">Simpan</button>
                        </div>
                    </div>
                </div>
            )}

            {showDisclaimer && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in"><div className="absolute inset-0 bg-black/80"></div><div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 text-center space-y-4"><div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2"><ShieldCheck size={32} className="text-orange-600"/></div><h3 className="text-xl font-bold text-gray-900">Pernyataan Disclaimer</h3><p className="text-sm text-gray-500 leading-relaxed">Saya menyatakan bahwa data pelatihan ini benar.</p><label className="flex items-center justify-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors"><input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} className="w-5 h-5 accent-orange-600" aria-label="Setuju"/><span className="font-bold text-sm text-orange-800">Saya Setuju</span></label><div className="flex gap-3 pt-2"><button onClick={() => setShowDisclaimer(false)} className="flex-1 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50">Kembali</button><button onClick={handleFinalSubmit} disabled={!isAgreed || loading} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">{loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Proses Simpan</button></div></div></div>
            )}
        </BaseModal>
    );
}

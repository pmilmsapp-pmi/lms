
// // // // // // // // // // // // 'use client';

// // // // // // // // // // // // import { useState, useRef } from 'react';
// // // // // // // // // // // // import { 
// // // // // // // // // // // //     X, Upload, Plus, Trash2, Save, Calendar, 
// // // // // // // // // // // //     Video, Image as ImageIcon, Users, FileText, 
// // // // // // // // // // // //     CheckCircle, AlertCircle, Award, Clock, Search, 
// // // // // // // // // // // //     Download, File, Info 
// // // // // // // // // // // // } from 'lucide-react';
// // // // // // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // // // // // import 'react-quill/dist/quill.snow.css';

// // // // // // // // // // // // // Load ReactQuill client-side only
// // // // // // // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // // // // // // //     ssr: false,
// // // // // // // // // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // // // // // // // // });

// // // // // // // // // // // // interface CourseFormModalProps {
// // // // // // // // // // // //     course?: any; 
// // // // // // // // // // // //     onClose: () => void;
// // // // // // // // // // // //     onSuccess: () => void;
// // // // // // // // // // // //     facilitators: any[]; 
// // // // // // // // // // // //     currentUser: any; 
// // // // // // // // // // // // }

// // // // // // // // // // // // export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
// // // // // // // // // // // //     const [activeTab, setActiveTab] = useState('info');
// // // // // // // // // // // //     const [loading, setLoading] = useState(false);
    
// // // // // // // // // // // //     // Refs
// // // // // // // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null); 
// // // // // // // // // // // //     const templateInputRef = useRef<HTMLInputElement>(null); 

// // // // // // // // // // // //     // State Search Fasilitator
// // // // // // // // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');

// // // // // // // // // // // //     // --- INITIAL STATE ---
// // // // // // // // // // // //     const [formData, setFormData] = useState({
// // // // // // // // // // // //         // 1. INFO DASAR
// // // // // // // // // // // //         title: course?.title || '',
// // // // // // // // // // // //         description: course?.description || '', 
// // // // // // // // // // // //         programType: course?.programType || 'training', 
// // // // // // // // // // // //         hasCertificate: course?.hasCertificate ?? true,
        
// // // // // // // // // // // //         // Periode Pendaftaran
// // // // // // // // // // // //         regIsForever: course?.registrationPeriod?.isForever ?? false,
// // // // // // // // // // // //         regStartDate: course?.registrationPeriod?.startDate ? new Date(course.registrationPeriod.startDate).toISOString().split('T')[0] : '',
// // // // // // // // // // // //         regEndDate: course?.registrationPeriod?.endDate ? new Date(course.registrationPeriod.endDate).toISOString().split('T')[0] : '',

// // // // // // // // // // // //         // Periode Pelaksanaan
// // // // // // // // // // // //         execIsForever: course?.executionPeriod?.isForever ?? false,
// // // // // // // // // // // //         execStartDate: course?.executionPeriod?.startDate ? new Date(course.executionPeriod.startDate).toISOString().split('T')[0] : '',
// // // // // // // // // // // //         execEndDate: course?.executionPeriod?.endDate ? new Date(course.executionPeriod.endDate).toISOString().split('T')[0] : '',

// // // // // // // // // // // //         // 2. MEDIA
// // // // // // // // // // // //         thumbnailUrl: course?.thumbnailUrl || '',
// // // // // // // // // // // //         promoVideoUrl: course?.promoVideoUrl || '',

// // // // // // // // // // // //         // 3. PENGATURAN PENDAFTARAN
// // // // // // // // // // // //         registrationMethod: course?.registrationMethod || 'auto', 
        
// // // // // // // // // // // //         // Dokumen Template
// // // // // // // // // // // //         registrationTemplates: course?.registrationConfig?.templates || [], 

// // // // // // // // // // // //         // 4. DETAIL & FASILITAS
// // // // // // // // // // // //         price: course?.price || 0,
// // // // // // // // // // // //         estimatedDuration: course?.estimatedDuration || 60, 
// // // // // // // // // // // //         totalJp: course?.totalJp || 0, 
// // // // // // // // // // // //         facilities: course?.facilities || [], 

// // // // // // // // // // // //         // 5. TIM & PIC
// // // // // // // // // // // //         facilitatorIds: course?.facilitatorIds?.map((f:any) => typeof f === 'object' ? f._id : f) || [],
// // // // // // // // // // // //         pics: course?.pics || [], 
// // // // // // // // // // // //     });

// // // // // // // // // // // //     // State UI Tambahan
// // // // // // // // // // // //     const [newFacility, setNewFacility] = useState('');
// // // // // // // // // // // //     const [uploadingCover, setUploadingCover] = useState(false);
// // // // // // // // // // // //     const [uploadingTemplate, setUploadingTemplate] = useState(false);

// // // // // // // // // // // //     // --- HANDLERS ---

// // // // // // // // // // // //     const handleChange = (field: string, value: any) => {
// // // // // // // // // // // //         setFormData(prev => ({ ...prev, [field]: value }));
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const addFacility = () => {
// // // // // // // // // // // //         if (!newFacility.trim()) return;
// // // // // // // // // // // //         setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] }));
// // // // // // // // // // // //         setNewFacility('');
// // // // // // // // // // // //     };
    
// // // // // // // // // // // //     const removeFacility = (idx: number) => {
// // // // // // // // // // // //         setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_: any, i: number) => i !== idx) }));
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const addPic = () => {
// // // // // // // // // // // //         if (formData.pics.length >= 3) return alert("Maksimal 3 Penanggung Jawab");
// // // // // // // // // // // //         setFormData(prev => ({
// // // // // // // // // // // //             ...prev,
// // // // // // // // // // // //             pics: [...prev.pics, { name: '', pmiStatus: '', email: '' }]
// // // // // // // // // // // //         }));
// // // // // // // // // // // //     };
    
// // // // // // // // // // // //     const updatePic = (idx: number, field: string, val: string) => {
// // // // // // // // // // // //         const newPics = [...formData.pics];
// // // // // // // // // // // //         newPics[idx] = { ...newPics[idx], [field]: val };
// // // // // // // // // // // //         setFormData(prev => ({ ...prev, pics: newPics }));
// // // // // // // // // // // //     };
    
// // // // // // // // // // // //     const removePic = (idx: number) => {
// // // // // // // // // // // //         setFormData(prev => ({ ...prev, pics: prev.pics.filter((_: any, i: number) => i !== idx) }));
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const toggleFacilitator = (id: string) => {
// // // // // // // // // // // //         const current = formData.facilitatorIds;
// // // // // // // // // // // //         if (current.includes(id)) {
// // // // // // // // // // // //             handleChange('facilitatorIds', current.filter((fid: string) => fid !== id));
// // // // // // // // // // // //         } else {
// // // // // // // // // // // //             handleChange('facilitatorIds', [...current, id]);
// // // // // // // // // // // //         }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // // //         const file = e.target.files?.[0];
// // // // // // // // // // // //         if (!file) return;
// // // // // // // // // // // //         try {
// // // // // // // // // // // //             setUploadingCover(true);
// // // // // // // // // // // //             const fd = new FormData();
// // // // // // // // // // // //             fd.append('file', file);
// // // // // // // // // // // //             const res = await apiUpload('/api/upload', fd); 
// // // // // // // // // // // //             handleChange('thumbnailUrl', res.url || res.file?.url); 
// // // // // // // // // // // //         } catch (err: any) {
// // // // // // // // // // // //             alert('Gagal upload cover: ' + err.message);
// // // // // // // // // // // //         } finally {
// // // // // // // // // // // //             setUploadingCover(false);
// // // // // // // // // // // //         }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // // //         const file = e.target.files?.[0];
// // // // // // // // // // // //         if (!file) return;
// // // // // // // // // // // //         try {
// // // // // // // // // // // //             setUploadingTemplate(true);
// // // // // // // // // // // //             const fd = new FormData();
// // // // // // // // // // // //             fd.append('file', file);
// // // // // // // // // // // //             const res = await apiUpload('/api/upload', fd); 
// // // // // // // // // // // //             const url = res.url || res.file?.url;
            
// // // // // // // // // // // //             const newTemplate = {
// // // // // // // // // // // //                 title: file.name, 
// // // // // // // // // // // //                 url: url
// // // // // // // // // // // //             };
            
// // // // // // // // // // // //             setFormData(prev => ({
// // // // // // // // // // // //                 ...prev,
// // // // // // // // // // // //                 registrationTemplates: [...prev.registrationTemplates, newTemplate]
// // // // // // // // // // // //             }));

// // // // // // // // // // // //         } catch (err: any) {
// // // // // // // // // // // //             alert('Gagal upload dokumen: ' + err.message);
// // // // // // // // // // // //         } finally {
// // // // // // // // // // // //             setUploadingTemplate(false);
// // // // // // // // // // // //             if (templateInputRef.current) templateInputRef.current.value = '';
// // // // // // // // // // // //         }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const removeTemplate = (idx: number) => {
// // // // // // // // // // // //         if(!confirm("Hapus dokumen ini?")) return;
// // // // // // // // // // // //         setFormData(prev => ({
// // // // // // // // // // // //             ...prev,
// // // // // // // // // // // //             registrationTemplates: prev.registrationTemplates.filter((_: any, i: number) => i !== idx)
// // // // // // // // // // // //         }));
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const updateTemplateTitle = (idx: number, newTitle: string) => {
// // // // // // // // // // // //         const newTemplates = [...formData.registrationTemplates];
// // // // // // // // // // // //         newTemplates[idx].title = newTitle;
// // // // // // // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: newTemplates }));
// // // // // // // // // // // //     };

// // // // // // // // // // // //     // --- SUBMIT FORM (LOGIC FIX) ---
// // // // // // // // // // // //     const handleSubmit = async (e: React.FormEvent) => {
// // // // // // // // // // // //         e.preventDefault();
// // // // // // // // // // // //         if (!formData.title) return alert("Judul Pelatihan wajib diisi!");

// // // // // // // // // // // //         setLoading(true);
// // // // // // // // // // // //         try {
// // // // // // // // // // // //             // Konversi Data Agar Sesuai Schema Database
// // // // // // // // // // // //             const payload = {
// // // // // // // // // // // //                 ...formData,
// // // // // // // // // // // //                 price: Number(formData.price),
// // // // // // // // // // // //                 estimatedDuration: Number(formData.estimatedDuration),
// // // // // // // // // // // //                 registrationPeriod: {
// // // // // // // // // // // //                     isForever: formData.regIsForever,
// // // // // // // // // // // //                     startDate: formData.regStartDate ? new Date(formData.regStartDate) : null,
// // // // // // // // // // // //                     endDate: formData.regEndDate ? new Date(formData.regEndDate) : null
// // // // // // // // // // // //                 },
// // // // // // // // // // // //                 executionPeriod: {
// // // // // // // // // // // //                     isForever: formData.execIsForever,
// // // // // // // // // // // //                     startDate: formData.execStartDate ? new Date(formData.execStartDate) : null,
// // // // // // // // // // // //                     endDate: formData.execEndDate ? new Date(formData.execEndDate) : null
// // // // // // // // // // // //                 },
// // // // // // // // // // // //                 registrationConfig: {
// // // // // // // // // // // //                     templates: formData.registrationTemplates 
// // // // // // // // // // // //                 },
// // // // // // // // // // // //                 creatorInfo: {
// // // // // // // // // // // //                     name: currentUser?.name,
// // // // // // // // // // // //                     email: currentUser?.email,
// // // // // // // // // // // //                     contact: currentUser?.phoneNumber || '-' 
// // // // // // // // // // // //                 }
// // // // // // // // // // // //             };

// // // // // // // // // // // //             if (course?._id) {
// // // // // // // // // // // //                 await api(`/api/courses/${course._id}`, { method: 'PUT', body: payload });
// // // // // // // // // // // //                 alert("Pelatihan berhasil diperbarui!");
// // // // // // // // // // // //             } else {
// // // // // // // // // // // //                 await api('/api/courses', { method: 'POST', body: payload });
// // // // // // // // // // // //                 alert("Pelatihan baru berhasil dibuat!");
// // // // // // // // // // // //             }
// // // // // // // // // // // //             onSuccess();
// // // // // // // // // // // //         } catch (err: any) {
// // // // // // // // // // // //             console.error("Submit Error:", err);
// // // // // // // // // // // //             alert("Gagal menyimpan: " + (err.response?.data?.message || err.message));
// // // // // // // // // // // //         } finally {
// // // // // // // // // // // //             setLoading(false);
// // // // // // // // // // // //         }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const filteredFacilitators = facilitators.filter(f => 
// // // // // // // // // // // //         f.name.toLowerCase().includes(searchFacilitator.toLowerCase()) || 
// // // // // // // // // // // //         f.email.toLowerCase().includes(searchFacilitator.toLowerCase())
// // // // // // // // // // // //     );

// // // // // // // // // // // //     return (
// // // // // // // // // // // //         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-hidden" role="dialog" aria-modal="true">
// // // // // // // // // // // //             <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
                
// // // // // // // // // // // //                 {/* HEADER */}
// // // // // // // // // // // //                 <div className="bg-gray-900 text-white p-5 flex justify-between items-center shrink-0">
// // // // // // // // // // // //                     <div>
// // // // // // // // // // // //                         <h2 className="text-xl font-bold">{course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2>
// // // // // // // // // // // //                         <p className="text-xs text-gray-400 mt-1">Lengkapi data agar halaman informasi pelatihan tampil sempurna.</p>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" title="Tutup Modal" aria-label="Tutup"><X size={24}/></button>
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                 {/* TABS NAVIGATION */}
// // // // // // // // // // // //                 <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0">
// // // // // // // // // // // //                     {[
// // // // // // // // // // // //                         { id: 'info', label: '1. Informasi Dasar', icon: FileText },
// // // // // // // // // // // //                         { id: 'media', label: '2. Media & Visual', icon: ImageIcon },
// // // // // // // // // // // //                         { id: 'registration', label: '3. Pendaftaran', icon: Users },
// // // // // // // // // // // //                         { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award },
// // // // // // // // // // // //                         { id: 'team', label: '5. Tim & PIC', icon: Users },
// // // // // // // // // // // //                     ].map((tab) => (
// // // // // // // // // // // //                         <button
// // // // // // // // // // // //                             key={tab.id}
// // // // // // // // // // // //                             onClick={() => setActiveTab(tab.id)}
// // // // // // // // // // // //                             className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap outline-none focus:bg-gray-100
// // // // // // // // // // // //                                 ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}
// // // // // // // // // // // //                             `}
// // // // // // // // // // // //                         >
// // // // // // // // // // // //                             <tab.icon size={16} /> {tab.label}
// // // // // // // // // // // //                         </button>
// // // // // // // // // // // //                     ))}
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                 {/* FORM CONTENT (SCROLLABLE) */}
// // // // // // // // // // // //                 <form id="courseForm" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    
// // // // // // // // // // // //                     {/* TAB 1: INFORMASI DASAR */}
// // // // // // // // // // // //                     {activeTab === 'info' && (
// // // // // // // // // // // //                         <div className="space-y-6 max-w-4xl mx-auto">
// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // // // // //                                 <div>
// // // // // // // // // // // //                                     <label htmlFor="courseTitle" className="block text-sm font-bold text-gray-700 mb-1">Judul Pelatihan <span className="text-red-500">*</span></label>
// // // // // // // // // // // //                                     <input id="courseTitle" required type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: Orientasi Kepalangmerahan" value={formData.title} onChange={e => handleChange('title', e.target.value)} />
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                                 <div>
// // // // // // // // // // // //                                     <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap</label>
// // // // // // // // // // // //                                     <div className="bg-white rounded-lg border overflow-hidden">
// // // // // // // // // // // //                                         <ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" placeholder="Tulis deskripsi pelatihan..." />
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>

// // // // // // // // // // // //                             <div className="grid grid-cols-2 gap-6">
// // // // // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // // // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
// // // // // // // // // // // //                                     <div className="flex items-center gap-2 mb-2">
// // // // // // // // // // // //                                         <input type="checkbox" id="regForever" checked={formData.regIsForever} onChange={e => handleChange('regIsForever', e.target.checked)} className="w-4 h-4 text-red-600 rounded"/>
// // // // // // // // // // // //                                         <label htmlFor="regForever" className="text-sm text-gray-600 cursor-pointer">Buka Selamanya (Tanpa Batas Waktu)</label>
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                     {!formData.regIsForever && (
// // // // // // // // // // // //                                         <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2">
// // // // // // // // // // // //                                             <div><span className="text-xs text-gray-500 block mb-1">Mulai</span><input title="Tanggal Mulai Pendaftaran" type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} /></div>
// // // // // // // // // // // //                                             <div><span className="text-xs text-gray-500 block mb-1">Selesai</span><input title="Tanggal Selesai Pendaftaran" type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} /></div>
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                     )}
// // // // // // // // // // // //                                 </div>

// // // // // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // // // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
// // // // // // // // // // // //                                     <div className="flex items-center gap-2 mb-2">
// // // // // // // // // // // //                                         <input type="checkbox" id="execForever" checked={formData.execIsForever} onChange={e => handleChange('execIsForever', e.target.checked)} className="w-4 h-4 text-red-600 rounded"/>
// // // // // // // // // // // //                                         <label htmlFor="execForever" className="text-sm text-gray-600 cursor-pointer">Fleksibel (Sesuai Kecepatan Peserta)</label>
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                     {!formData.execIsForever && (
// // // // // // // // // // // //                                         <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2">
// // // // // // // // // // // //                                             <div><span className="text-xs text-gray-500 block mb-1">Mulai</span><input title="Tanggal Mulai Pelaksanaan" type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} /></div>
// // // // // // // // // // // //                                             <div><span className="text-xs text-gray-500 block mb-1">Selesai</span><input title="Tanggal Selesai Pelaksanaan" type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} /></div>
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                     )}
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>

// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
// // // // // // // // // // // //                                 <div>
// // // // // // // // // // // //                                     <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label>
// // // // // // // // // // // //                                     <div className="flex gap-4">
// // // // // // // // // // // //                                         <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="progType" value="training" checked={formData.programType === 'training'} onChange={() => handleChange('programType', 'training')} className="text-red-600"/> Diklat Resmi</label>
// // // // // // // // // // // //                                         <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="progType" value="course" checked={formData.programType === 'course'} onChange={() => handleChange('programType', 'course')} className="text-red-600"/> Kursus Mandiri</label>
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                                 <div className="w-px bg-gray-200"></div>
// // // // // // // // // // // //                                 <div className="flex items-center gap-3">
// // // // // // // // // // // //                                     <input type="checkbox" id="hasCert" checked={formData.hasCertificate} onChange={e => handleChange('hasCertificate', e.target.checked)} className="w-5 h-5 text-red-600 rounded" />
// // // // // // // // // // // //                                     <label htmlFor="hasCert" className="text-sm font-bold text-gray-700 cursor-pointer">Sertifikat Tersedia?</label>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     )}

// // // // // // // // // // // //                     {/* TAB 2: MEDIA & VISUAL */}
// // // // // // // // // // // //                     {activeTab === 'media' && (
// // // // // // // // // // // //                         <div className="max-w-3xl mx-auto space-y-6">
// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // // //                                 <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) <span className="text-red-500">*</span></label>
// // // // // // // // // // // //                                 <div className="flex gap-6 items-start">
// // // // // // // // // // // //                                     <div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
// // // // // // // // // // // //                                         {formData.thumbnailUrl ? (
// // // // // // // // // // // //                                             <img src={getImageUrl(formData.thumbnailUrl)} alt="Preview Cover" className="w-full h-full object-cover" />
// // // // // // // // // // // //                                         ) : (
// // // // // // // // // // // //                                             <div className="text-center text-gray-400">
// // // // // // // // // // // //                                                 <ImageIcon className="mx-auto mb-1" />
// // // // // // // // // // // //                                                 <span className="text-xs">Belum ada gambar</span>
// // // // // // // // // // // //                                             </div>
// // // // // // // // // // // //                                         )}
// // // // // // // // // // // //                                         {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                     <div className="flex-1">
// // // // // // // // // // // //                                         <p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px. Gambar ini akan menjadi background merah di Landing Page.</p>

// // // // // // // // // // // //                                         {/* Label sr-only + id untuk input file cover */}
// // // // // // // // // // // //                                         <label htmlFor="coverUploader" className="sr-only">Upload Gambar Cover</label>
// // // // // // // // // // // //                                         <input
// // // // // // // // // // // //                                             id="coverUploader"
// // // // // // // // // // // //                                             type="file"
// // // // // // // // // // // //                                             ref={fileInputRef}
// // // // // // // // // // // //                                             onChange={handleFileChange}
// // // // // // // // // // // //                                             accept="image/*"
// // // // // // // // // // // //                                             className="hidden"
// // // // // // // // // // // //                                             title="Upload Gambar Cover"
// // // // // // // // // // // //                                             aria-label="Upload Gambar Cover"
// // // // // // // // // // // //                                         />
// // // // // // // // // // // //                                         <button
// // // // // // // // // // // //                                             type="button"
// // // // // // // // // // // //                                             onClick={() => fileInputRef.current?.click()}
// // // // // // // // // // // //                                             aria-controls="coverUploader"
// // // // // // // // // // // //                                             className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2"
// // // // // // // // // // // //                                         >
// // // // // // // // // // // //                                             <Upload size={16}/> Upload Gambar
// // // // // // // // // // // //                                         </button>
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>

// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // // //                                 <label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label>
// // // // // // // // // // // //                                 <div className="flex gap-2">
// // // // // // // // // // // //                                     <div className="p-3 bg-gray-100 rounded-l-lg border border-r-0 text-gray-500"><Video size={18}/></div>
// // // // // // // // // // // //                                     <input type="text" className="flex-1 p-2.5 border rounded-r-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} aria-label="Video URL" />
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                                 <p className="text-xs text-gray-500 mt-2">Jika diisi, video akan muncul di kotak kanan bawah Landing Page menggantikan cover.</p>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     )}

// // // // // // // // // // // //                     {/* TAB 3: PENDAFTARAN */}
// // // // // // // // // // // //                     {activeTab === 'registration' && (
// // // // // // // // // // // //                         <div className="max-w-4xl mx-auto space-y-6">
// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // // //                                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan Peserta</h3>
// // // // // // // // // // // //                                 <div className="space-y-4">
// // // // // // // // // // // //                                     <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'auto' ? 'bg-green-50 border-green-200 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
// // // // // // // // // // // //                                         <input type="radio" name="regMethod" value="auto" checked={formData.registrationMethod === 'auto'} onChange={() => handleChange('registrationMethod', 'auto')} className="mt-1 text-red-600" />
// // // // // // // // // // // //                                         <div>
// // // // // // // // // // // //                                             <span className="block font-bold text-gray-800">Otomatis (Langsung Aktif)</span>
// // // // // // // // // // // //                                             <span className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</span>
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                     </label>

// // // // // // // // // // // //                                     <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'manual' ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
// // // // // // // // // // // //                                         <input type="radio" name="regMethod" value="manual" checked={formData.registrationMethod === 'manual'} onChange={() => handleChange('registrationMethod', 'manual')} className="mt-1 text-red-600" />
// // // // // // // // // // // //                                         <div>
// // // // // // // // // // // //                                             <span className="block font-bold text-gray-800">Manual (Verifikasi Admin)</span>
// // // // // // // // // // // //                                             <span className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi oleh Admin/Operator.</span>
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                     </label>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>

// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // // //                                 <div className="flex justify-between items-start mb-4">
// // // // // // // // // // // //                                     <div>
// // // // // // // // // // // //                                         <h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3>
// // // // // // // // // // // //                                         <p className="text-xs text-gray-500 mt-1" id="templateHelpText">
// // // // // // // // // // // //                                             Upload file (PDF/Doc) yang harus didownload, diisi, dan diupload ulang oleh peserta saat mendaftar.
// // // // // // // // // // // //                                         </p>
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                     <div className="relative">
// // // // // // // // // // // //                                         {/* Label sr-only untuk aksesibilitas */}
// // // // // // // // // // // //                                         <label htmlFor="templateUploader" className="sr-only">Upload Dokumen Template</label>

// // // // // // // // // // // //                                         <input 
// // // // // // // // // // // //                                             id="templateUploader"
// // // // // // // // // // // //                                             type="file" 
// // // // // // // // // // // //                                             ref={templateInputRef} 
// // // // // // // // // // // //                                             className="hidden" 
// // // // // // // // // // // //                                             onChange={handleTemplateUpload} 
// // // // // // // // // // // //                                             disabled={uploadingTemplate}
// // // // // // // // // // // //                                             accept=".pdf,.doc,.docx,.odt"
// // // // // // // // // // // //                                             aria-label="Upload Dokumen Template"
// // // // // // // // // // // //                                             title="Upload Dokumen Template"
// // // // // // // // // // // //                                             aria-describedby="templateHelpText"
// // // // // // // // // // // //                                         />
// // // // // // // // // // // //                                         <button 
// // // // // // // // // // // //                                             type="button" 
// // // // // // // // // // // //                                             onClick={() => templateInputRef.current?.click()} 
// // // // // // // // // // // //                                             disabled={uploadingTemplate}
// // // // // // // // // // // //                                             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50"
// // // // // // // // // // // //                                             aria-controls="templateUploader"
// // // // // // // // // // // //                                             aria-label="Buka dialog pilih file template"
// // // // // // // // // // // //                                         >
// // // // // // // // // // // //                                             {uploadingTemplate ? 'Mengupload...' : <><Upload size={14}/> Upload Template Baru</>}
// // // // // // // // // // // //                                         </button>
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                 </div>

// // // // // // // // // // // //                                 <div className="space-y-3">
// // // // // // // // // // // //                                     {formData.registrationTemplates.length === 0 ? (
// // // // // // // // // // // //                                         <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">
// // // // // // // // // // // //                                             Belum ada dokumen persyaratan yang diupload.
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                     ) : (
// // // // // // // // // // // //                                         formData.registrationTemplates.map((item: any, idx: number) => (
// // // // // // // // // // // //                                             <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg animate-in slide-in-from-bottom-2">
// // // // // // // // // // // //                                                 <div className="p-2 bg-white rounded border border-gray-200 text-blue-600">
// // // // // // // // // // // //                                                     <File size={20} />
// // // // // // // // // // // //                                                 </div>
// // // // // // // // // // // //                                                 <div className="flex-1">
// // // // // // // // // // // //                                                     <input 
// // // // // // // // // // // //                                                         type="text" 
// // // // // // // // // // // //                                                         className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full"
// // // // // // // // // // // //                                                         value={item.title}
// // // // // // // // // // // //                                                         onChange={(e) => updateTemplateTitle(idx, e.target.value)}
// // // // // // // // // // // //                                                         placeholder="Nama Dokumen (Contoh: Formulir Pendaftaran)"
// // // // // // // // // // // //                                                     />
// // // // // // // // // // // //                                                     <a href={getImageUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5">
// // // // // // // // // // // //                                                         <Download size={10} /> Lihat File Uploaded
// // // // // // // // // // // //                                                     </a>
// // // // // // // // // // // //                                                 </div>
// // // // // // // // // // // //                                                 <button 
// // // // // // // // // // // //                                                     type="button" 
// // // // // // // // // // // //                                                     onClick={() => removeTemplate(idx)} 
// // // // // // // // // // // //                                                     className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
// // // // // // // // // // // //                                                     title="Hapus Dokumen"
// // // // // // // // // // // //                                                     aria-label="Hapus Dokumen Template"
// // // // // // // // // // // //                                                 >
// // // // // // // // // // // //                                                     <Trash2 size={16} />
// // // // // // // // // // // //                                                 </button>
// // // // // // // // // // // //                                             </div>
// // // // // // // // // // // //                                         ))
// // // // // // // // // // // //                                     )}
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     )}

// // // // // // // // // // // //                     {/* TAB 4: FASILITAS & DETAIL */}
// // // // // // // // // // // //                     {activeTab === 'facilities' && (
// // // // // // // // // // // //                         <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
// // // // // // // // // // // //                             <div className="space-y-6">
// // // // // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // // //                                     <label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label>
// // // // // // // // // // // //                                     <div className="relative">
// // // // // // // // // // // //                                         <span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span>
// // // // // // // // // // // //                                         <input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" aria-label="Harga" />
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                     <p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p>
// // // // // // // // // // // //                                 </div>

// // // // // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // // //                                     <div className="grid grid-cols-2 gap-4">
// // // // // // // // // // // //                                         <div>
// // // // // // // // // // // //                                             <label htmlFor="durationInput" className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label>
// // // // // // // // // // // //                                             <input 
// // // // // // // // // // // //                                                 id="durationInput"
// // // // // // // // // // // //                                                 type="number" 
// // // // // // // // // // // //                                                 className="w-full p-2 border rounded" 
// // // // // // // // // // // //                                                 value={formData.estimatedDuration} 
// // // // // // // // // // // //                                                 onChange={e => handleChange('estimatedDuration', Number(e.target.value))} 
// // // // // // // // // // // //                                                 aria-label="Durasi Menit"
// // // // // // // // // // // //                                             />
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                         <div>
// // // // // // // // // // // //                                             <label htmlFor="totalJpInput" className="block text-xs font-bold text-gray-600 mb-1 flex items-center gap-1">
// // // // // // // // // // // //                                                 Total JP (Otomatis) <Info size={12} className="text-blue-500"/>
// // // // // // // // // // // //                                             </label>
// // // // // // // // // // // //                                             <input 
// // // // // // // // // // // //                                                 id="totalJpInput"
// // // // // // // // // // // //                                                 type="number" 
// // // // // // // // // // // //                                                 className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" 
// // // // // // // // // // // //                                                 value={formData.totalJp} 
// // // // // // // // // // // //                                                 disabled 
// // // // // // // // // // // //                                                 placeholder="0"
// // // // // // // // // // // //                                                 title="Total Jam Pelajaran (Otomatis)" 
// // // // // // // // // // // //                                                 aria-label="Total Jam Pelajaran (Otomatis)"
// // // // // // // // // // // //                                             />
// // // // // // // // // // // //                                             <p className="text-[10px] text-gray-400 mt-1 italic">
// // // // // // // // // // // //                                                 *Diambil otomatis dari Editor Materi.
// // // // // // // // // // // //                                             </p>
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>

// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
// // // // // // // // // // // //                                 <label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas</label>
// // // // // // // // // // // //                                 <div className="flex gap-2 mb-4">
// // // // // // // // // // // //                                     <input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} aria-label="Input Fasilitas Baru"/>
// // // // // // // // // // // //                                     <button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" title="Tambah Fasilitas" aria-label="Tambah Fasilitas"><Plus size={18}/></button>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                                 <div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">
// // // // // // // // // // // //                                     {formData.facilities.length === 0 && <p className="text-center text-xs text-gray-400 py-4">Belum ada fasilitas ditambahkan.</p>}
// // // // // // // // // // // //                                     {formData.facilities.map((item: string, idx: number) => (
// // // // // // // // // // // //                                         <div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm">
// // // // // // // // // // // //                                             <span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span>
// // // // // // // // // // // //                                             <button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" title="Hapus Fasilitas" aria-label="Hapus Fasilitas"><X size={14}/></button>
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                     ))}
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     )}

// // // // // // // // // // // //                     {/* TAB 5: TIM & PIC */}
// // // // // // // // // // // //                     {activeTab === 'team' && (
// // // // // // // // // // // //                         <div className="max-w-4xl mx-auto space-y-8">
                            
// // // // // // // // // // // //                             {/* Fasilitator Selection */}
// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // // //                                 <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
// // // // // // // // // // // //                                 <p className="text-xs text-gray-500 mb-4">*Berdasarkan data user Admin & Fasilitator di sistem.</p>
                                
// // // // // // // // // // // //                                 {/* Search Bar Fasilitator */}
// // // // // // // // // // // //                                 <div className="relative mb-4">
// // // // // // // // // // // //                                     <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // // // // // // // // // //                                     <label htmlFor="facilitatorSearch" className="sr-only">Cari Fasilitator</label>
// // // // // // // // // // // //                                     <input 
// // // // // // // // // // // //                                         id="facilitatorSearch"
// // // // // // // // // // // //                                         type="text" 
// // // // // // // // // // // //                                         placeholder="Cari nama atau email fasilitator..." 
// // // // // // // // // // // //                                         className="w-full pl-9 p-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
// // // // // // // // // // // //                                         value={searchFacilitator}
// // // // // // // // // // // //                                         onChange={(e) => setSearchFacilitator(e.target.value)}
// // // // // // // // // // // //                                         aria-label="Cari Fasilitator"
// // // // // // // // // // // //                                     />
// // // // // // // // // // // //                                 </div>

// // // // // // // // // // // //                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-2 bg-gray-50 rounded-lg border">
// // // // // // // // // // // //                                     {filteredFacilitators.length === 0 ? (
// // // // // // // // // // // //                                         <div className="col-span-3 text-center py-4 text-xs text-gray-400">Tidak ditemukan fasilitator dengan nama tersebut.</div>
// // // // // // // // // // // //                                     ) : (
// // // // // // // // // // // //                                         filteredFacilitators.map(fac => (
// // // // // // // // // // // //                                             <label key={fac._id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.facilitatorIds.includes(fac._id) ? 'bg-red-50 border-red-200 ring-1 ring-red-500' : 'bg-white hover:bg-gray-100'}`}>
// // // // // // // // // // // // //                                                 <input type="checkbox" checked={formData.facilitatorIds.includes(fac._id)} onChange={() => toggleFacilitator(fac._id)} className="w-4 h-4 text-red-600 rounded" aria-label={`Pilih ${fac.name}`} />
// // // // // // // // // // // // //                                                 <div className="flex items-center gap-2 overflow-hidden">
// // // // // // // // // // // // //                                                     <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0 overflow-hidden">
// // // // // // // // // // // // //                                                         {fac.avatarUrl ? <img src={getImageUrl(fac.avatarUrl)} alt={fac.name} className="w-full h-full object-cover"/> : <div className="flex items-center justify-center h-full font-bold text-xs">{fac.name.charAt(0)}</div>}
// // // // // // // // // // // // //                                                     </div>
// // // // // // // // // // // // //                                                     <div className="truncate">
// // // // // // // // // // // // //                                                         <div className="text-xs font-bold truncate">{fac.name}</div>
// // // // // // // // // // // // //                                                         <div className="text-[9px] text-gray-500 truncate">{fac.email}</div>
// // // // // // // // // // // // //                                                     </div>
// // // // // // // // // // // // //                                                 </div>
// // // // // // // // // // // // //                                             </label>
// // // // // // // // // // // // //                                         ))
// // // // // // // // // // // // //                                     )}
// // // // // // // // // // // // //                                 </div>
// // // // // // // // // // // // //                             </div>

// // // // // // // // // // // // //                             {/* Penanggung Jawab (PIC) */}
// // // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // // // //                                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab & Kontak</h3>
                                
// // // // // // // // // // // // //                                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6 flex items-center justify-between">
// // // // // // // // // // // // //                                     <div>
// // // // // // // // // // // // //                                         <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Pembuat Pelatihan</span>
// // // // // // // // // // // // //                                         <div className="font-bold text-gray-800">{currentUser?.name}</div>
// // // // // // // // // // // // //                                         <div className="text-xs text-gray-600">{currentUser?.email}</div>
// // // // // // // // // // // // //                                     </div>
// // // // // // // // // // // // //                                     <div className="text-right">
// // // // // // // // // // // // //                                         <span className="text-xs bg-white px-2 py-1 rounded border border-blue-200 text-blue-700 font-bold">Admin</span>
// // // // // // // // // // // // //                                     </div>
// // // // // // // // // // // // //                                 </div>

// // // // // // // // // // // // //                                 <div className="space-y-4">
// // // // // // // // // // // // //                                     <div className="flex justify-between items-center">
// // // // // // // // // // // // //                                         <label className="text-sm font-bold text-gray-700">Daftar PIC Tambahan (Maks 3)</label>
// // // // // // // // // // // // //                                         <button type="button" onClick={addPic} className="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 font-bold flex items-center gap-1" aria-label="Tambah PIC"><Plus size={12}/> Tambah PIC</button>
// // // // // // // // // // // // //                                     </div>
                                    
// // // // // // // // // // // // //                                     {formData.pics.map((pic: any, idx: number) => (
// // // // // // // // // // // // //                                         <div key={idx} className="flex gap-3 items-start animate-in slide-in-from-left-2">
// // // // // // // // // // // // //                                             <div className="flex-1 grid grid-cols-3 gap-3">
// // // // // // // // // // // // //                                                 <input placeholder="Nama Lengkap" className="p-2 border rounded text-sm" value={pic.name} onChange={e => updatePic(idx, 'name', e.target.value)} aria-label="Nama PIC"/>
// // // // // // // // // // // // //                                                 <input placeholder="Status di PMI" className="p-2 border rounded text-sm" value={pic.pmiStatus} onChange={e => updatePic(idx, 'pmiStatus', e.target.value)} aria-label="Status PIC"/>
// // // // // // // // // // // // //                                                 <input placeholder="Email Kontak" className="p-2 border rounded text-sm" value={pic.email} onChange={e => updatePic(idx, 'email', e.target.value)} aria-label="Email PIC"/>
// // // // // // // // // // // // //                                             </div>
// // // // // // // // // // // // //                                             <button type="button" onClick={() => removePic(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded" title="Hapus PIC" aria-label="Hapus PIC"><Trash2 size={16}/></button>
// // // // // // // // // // // // //                                         </div>
// // // // // // // // // // // // //                                     ))}
// // // // // // // // // // // // //                                     {formData.pics.length === 0 && <p className="text-xs text-gray-400 italic">Belum ada PIC tambahan.</p>}
// // // // // // // // // // // // //                                 </div>
// // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                     )}

// // // // // // // // // // // // //                 </form>

// // // // // // // // // // // // //                 {/* FOOTER ACTIONS */}
// // // // // // // // // // // // //                 <div className="bg-white border-t p-4 flex justify-end gap-3 shrink-0">
// // // // // // // // // // // // //                     <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50" aria-label="Batal">Batal</button>
// // // // // // // // // // // // //                     <button type="button" onClick={handleSubmit} disabled={loading} className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 shadow-lg flex items-center gap-2 disabled:opacity-50" aria-label="Simpan Pelatihan">
// // // // // // // // // // // // //                         {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"/> : <Save size={18}/>}
// // // // // // // // // // // // //                         Simpan Pelatihan
// // // // // // // // // // // // //                     </button>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // // }



// // // // // // // // // // // // 'use client';

// // // // // // // // // // // // import { useState, useRef, useEffect } from 'react';
// // // // // // // // // // // // import { 
// // // // // // // // // // // //     X, Upload, Plus, Trash2, Save, Calendar, 
// // // // // // // // // // // //     Video, Image as ImageIcon, Users, FileText, 
// // // // // // // // // // // //     CheckCircle, AlertCircle, Award, Clock, Search, 
// // // // // // // // // // // //     Download, File, Info, Loader2 
// // // // // // // // // // // // } from 'lucide-react';
// // // // // // // // // // // // import { api, apiUpload } from '@/lib/api';
// // // // // // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // // // // // import 'react-quill/dist/quill.snow.css';
// // // // // // // // // // // // import axios from 'axios'; 

// // // // // // // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // // // // // // //     ssr: false,
// // // // // // // // // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // // // // // // // // });

// // // // // // // // // // // // interface CourseFormModalProps {
// // // // // // // // // // // //     course?: any; 
// // // // // // // // // // // //     onClose: () => void;
// // // // // // // // // // // //     onSuccess: () => void;
// // // // // // // // // // // //     facilitators: any[]; 
// // // // // // // // // // // //     currentUser: any; 
// // // // // // // // // // // // }

// // // // // // // // // // // // export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
// // // // // // // // // // // //     const [activeTab, setActiveTab] = useState('info');
// // // // // // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // // // // // //     const [fetchingDetail, setFetchingDetail] = useState(false); 
    
// // // // // // // // // // // //     // Refs
// // // // // // // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null); 
// // // // // // // // // // // //     const templateInputRef = useRef<HTMLInputElement>(null); 

// // // // // // // // // // // //     // State Search Fasilitator
// // // // // // // // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');

// // // // // // // // // // // //     // --- INITIAL STATE ---
// // // // // // // // // // // //     const defaultState = {
// // // // // // // // // // // //         title: '',
// // // // // // // // // // // //         description: '', 
// // // // // // // // // // // //         programType: 'training', 
// // // // // // // // // // // //         hasCertificate: true,
// // // // // // // // // // // //         regIsForever: false,
// // // // // // // // // // // //         regStartDate: '',
// // // // // // // // // // // //         regEndDate: '',
// // // // // // // // // // // //         execIsForever: false,
// // // // // // // // // // // //         execStartDate: '',
// // // // // // // // // // // //         execEndDate: '',
// // // // // // // // // // // //         thumbnailUrl: '',
// // // // // // // // // // // //         promoVideoUrl: '',
// // // // // // // // // // // //         registrationMethod: 'auto', 
// // // // // // // // // // // //         requireDocs: true, 
// // // // // // // // // // // //         registrationTemplates: [] as any[], 
// // // // // // // // // // // //         price: 0,
// // // // // // // // // // // //         estimatedDuration: 0, 
// // // // // // // // // // // //         totalJp: 0, 
// // // // // // // // // // // //         facilities: [] as string[], 
// // // // // // // // // // // //         facilitatorIds: [] as string[],
// // // // // // // // // // // //         pics: [] as any[], 
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const [formData, setFormData] = useState(defaultState);

// // // // // // // // // // // //     // --- FETCH DETAIL DATA ---
// // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // //         const initData = async () => {
// // // // // // // // // // // //             if (course && course._id) {
// // // // // // // // // // // //                 setFetchingDetail(true);
// // // // // // // // // // // //                 try {
// // // // // // // // // // // //                     const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
// // // // // // // // // // // //                     const fullData = res.course || res;
// // // // // // // // // // // //                     populateForm(fullData);
// // // // // // // // // // // //                 } catch (e) {
// // // // // // // // // // // //                     console.error("Gagal ambil detail, fallback ke props", e);
// // // // // // // // // // // //                     populateForm(course);
// // // // // // // // // // // //                 } finally {
// // // // // // // // // // // //                     setFetchingDetail(false);
// // // // // // // // // // // //                 }
// // // // // // // // // // // //             } else {
// // // // // // // // // // // //                 setFormData(defaultState);
// // // // // // // // // // // //             }
// // // // // // // // // // // //         };

// // // // // // // // // // // //         initData();
// // // // // // // // // // // //     }, [course]); 

// // // // // // // // // // // //     const populateForm = (data: any) => {
// // // // // // // // // // // //         const formatDate = (dateString: string) => {
// // // // // // // // // // // //             if (!dateString) return '';
// // // // // // // // // // // //             try { return new Date(dateString).toISOString().split('T')[0]; } catch (e) { return ''; }
// // // // // // // // // // // //         };

// // // // // // // // // // // //         setFormData({
// // // // // // // // // // // //             title: data.title || '',
// // // // // // // // // // // //             description: data.description || '',
// // // // // // // // // // // //             programType: data.programType || 'training',
// // // // // // // // // // // //             hasCertificate: data.hasCertificate ?? true,
            
// // // // // // // // // // // //             regIsForever: data.registrationPeriod?.isForever ?? false,
// // // // // // // // // // // //             regStartDate: formatDate(data.registrationPeriod?.startDate),
// // // // // // // // // // // //             regEndDate: formatDate(data.registrationPeriod?.endDate),

// // // // // // // // // // // //             execIsForever: data.executionPeriod?.isForever ?? false,
// // // // // // // // // // // //             execStartDate: formatDate(data.executionPeriod?.startDate),
// // // // // // // // // // // //             execEndDate: formatDate(data.executionPeriod?.endDate),

// // // // // // // // // // // //             thumbnailUrl: data.thumbnailUrl || '',
// // // // // // // // // // // //             promoVideoUrl: data.promoVideoUrl || '',

// // // // // // // // // // // //             registrationMethod: data.registrationMethod || 'auto',
            
// // // // // // // // // // // //             requireDocs: data.registrationConfig?.requireDocs ?? true,
// // // // // // // // // // // //             registrationTemplates: data.registrationConfig?.templates || [],

// // // // // // // // // // // //             price: data.price || 0,
// // // // // // // // // // // //             estimatedDuration: data.estimatedDuration || 0,
// // // // // // // // // // // //             totalJp: data.totalJp || 0,
// // // // // // // // // // // //             facilities: data.facilities || [],

// // // // // // // // // // // //             facilitatorIds: data.facilitatorIds?.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) || [],
// // // // // // // // // // // //             pics: Array.isArray(data.pics) ? data.pics : []
// // // // // // // // // // // //         });
// // // // // // // // // // // //     }

// // // // // // // // // // // //     const handleChange = (field: string, value: any) => {
// // // // // // // // // // // //         setFormData(prev => ({ ...prev, [field]: value }));
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const addFacility = () => {
// // // // // // // // // // // //         if (!newFacility.trim()) return;
// // // // // // // // // // // //         setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] }));
// // // // // // // // // // // //         setNewFacility('');
// // // // // // // // // // // //     };
    
// // // // // // // // // // // //     const removeFacility = (idx: number) => {
// // // // // // // // // // // //         setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_: any, i: number) => i !== idx) }));
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const addPic = () => {
// // // // // // // // // // // //         if (formData.pics.length >= 3) return alert("Maksimal 3 Penanggung Jawab");
// // // // // // // // // // // //         setFormData(prev => ({ ...prev, pics: [...prev.pics, { name: '', pmiStatus: '', email: '' }] }));
// // // // // // // // // // // //     };
    
// // // // // // // // // // // //     const updatePic = (idx: number, field: string, val: string) => {
// // // // // // // // // // // //         const newPics = [...formData.pics];
// // // // // // // // // // // //         newPics[idx] = { ...newPics[idx], [field]: val };
// // // // // // // // // // // //         setFormData(prev => ({ ...prev, pics: newPics }));
// // // // // // // // // // // //     };
    
// // // // // // // // // // // //     const removePic = (idx: number) => {
// // // // // // // // // // // //         setFormData(prev => ({ ...prev, pics: prev.pics.filter((_: any, i: number) => i !== idx) }));
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const toggleFacilitator = (id: string) => {
// // // // // // // // // // // //         const current = formData.facilitatorIds;
// // // // // // // // // // // //         if (current.includes(id)) {
// // // // // // // // // // // //             handleChange('facilitatorIds', current.filter((fid: string) => fid !== id));
// // // // // // // // // // // //         } else {
// // // // // // // // // // // //             handleChange('facilitatorIds', [...current, id]);
// // // // // // // // // // // //         }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // // //         const file = e.target.files?.[0];
// // // // // // // // // // // //         if (!file) return;
// // // // // // // // // // // //         try {
// // // // // // // // // // // //             setUploadingCover(true);
// // // // // // // // // // // //             const fd = new FormData();
// // // // // // // // // // // //             fd.append('file', file);
// // // // // // // // // // // //             const res = await apiUpload('/api/upload', fd); 
// // // // // // // // // // // //             handleChange('thumbnailUrl', res.url || res.file?.url); 
// // // // // // // // // // // //         } catch (err: any) {
// // // // // // // // // // // //             alert('Gagal upload cover: ' + err.message);
// // // // // // // // // // // //         } finally {
// // // // // // // // // // // //             setUploadingCover(false);
// // // // // // // // // // // //         }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     // [FIX] Upload Dokumen ke Endpoint Materi
// // // // // // // // // // // //     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // // //         const file = e.target.files?.[0];
// // // // // // // // // // // //         if (!file) return;
        
// // // // // // // // // // // //         setUploadingTemplate(true);
// // // // // // // // // // // //         const fd = new FormData();
// // // // // // // // // // // //         fd.append('file', file);

// // // // // // // // // // // //         try {
// // // // // // // // // // // //             const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// // // // // // // // // // // //             const endpoint = `${backendUrl}/api/materials/upload`;
            
// // // // // // // // // // // //             const response = await axios.post(endpoint, fd, {
// // // // // // // // // // // //                 headers: { 'Content-Type': 'multipart/form-data' },
// // // // // // // // // // // //             });

// // // // // // // // // // // //             const result = response.data;
// // // // // // // // // // // //             const rawUrl = result.data?.url || result.url || result.secure_url;

// // // // // // // // // // // //             if (!rawUrl) throw new Error("Gagal mendapatkan URL file.");

// // // // // // // // // // // //             const newTemplate = { title: file.name, url: rawUrl };
            
// // // // // // // // // // // //             setFormData(prev => ({
// // // // // // // // // // // //                 ...prev,
// // // // // // // // // // // //                 registrationTemplates: [...prev.registrationTemplates, newTemplate]
// // // // // // // // // // // //             }));

// // // // // // // // // // // //         } catch (err: any) {
// // // // // // // // // // // //             console.error("Upload Error:", err);
// // // // // // // // // // // //             alert('Gagal upload dokumen: ' + (err.response?.data?.message || err.message));
// // // // // // // // // // // //         } finally {
// // // // // // // // // // // //             setUploadingTemplate(false);
// // // // // // // // // // // //             if (templateInputRef.current) templateInputRef.current.value = '';
// // // // // // // // // // // //         }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const removeTemplate = (idx: number) => {
// // // // // // // // // // // //         if(!confirm("Hapus dokumen ini?")) return;
// // // // // // // // // // // //         setFormData(prev => ({
// // // // // // // // // // // //             ...prev,
// // // // // // // // // // // //             registrationTemplates: prev.registrationTemplates.filter((_: any, i: number) => i !== idx)
// // // // // // // // // // // //         }));
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const updateTemplateTitle = (idx: number, newTitle: string) => {
// // // // // // // // // // // //         const newTemplates = [...formData.registrationTemplates];
// // // // // // // // // // // //         newTemplates[idx].title = newTitle;
// // // // // // // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: newTemplates }));
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const handleSubmit = async (e: React.FormEvent) => {
// // // // // // // // // // // //         e.preventDefault();
// // // // // // // // // // // //         if (!formData.title) return alert("Judul Pelatihan wajib diisi!");

// // // // // // // // // // // //         setLoading(true);
// // // // // // // // // // // //         try {
// // // // // // // // // // // //             // [FIX] Sanitasi Data PIC
// // // // // // // // // // // //             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');

// // // // // // // // // // // //             const payload = {
// // // // // // // // // // // //                 ...formData,
// // // // // // // // // // // //                 pics: validPics,
// // // // // // // // // // // //                 price: Number(formData.price) || 0, 
// // // // // // // // // // // //                 estimatedDuration: Number(formData.estimatedDuration) || 0,
// // // // // // // // // // // //                 totalJp: Number(formData.totalJp) || 0,
                
// // // // // // // // // // // //                 registrationPeriod: {
// // // // // // // // // // // //                     isForever: formData.regIsForever,
// // // // // // // // // // // //                     startDate: formData.regStartDate ? new Date(formData.regStartDate) : null,
// // // // // // // // // // // //                     endDate: formData.regEndDate ? new Date(formData.regEndDate) : null
// // // // // // // // // // // //                 },
// // // // // // // // // // // //                 executionPeriod: {
// // // // // // // // // // // //                     isForever: formData.execIsForever,
// // // // // // // // // // // //                     startDate: formData.execStartDate ? new Date(formData.execStartDate) : null,
// // // // // // // // // // // //                     endDate: formData.execEndDate ? new Date(formData.execEndDate) : null
// // // // // // // // // // // //                 },
// // // // // // // // // // // //                 registrationConfig: {
// // // // // // // // // // // //                     requireDocs: formData.requireDocs,
// // // // // // // // // // // //                     templates: formData.registrationTemplates 
// // // // // // // // // // // //                 },
// // // // // // // // // // // //                 creatorInfo: {
// // // // // // // // // // // //                     name: currentUser?.name || 'Admin',
// // // // // // // // // // // //                     email: currentUser?.email || '-',
// // // // // // // // // // // //                     contact: currentUser?.phoneNumber || '-' 
// // // // // // // // // // // //                 }
// // // // // // // // // // // //             };

// // // // // // // // // // // //             if (course?._id) {
// // // // // // // // // // // //                 await api(`/api/courses/${course._id}`, { method: 'PUT', body: payload });
// // // // // // // // // // // //                 alert("Pelatihan berhasil diperbarui!");
// // // // // // // // // // // //             } else {
// // // // // // // // // // // //                 await api('/api/courses', { method: 'POST', body: payload });
// // // // // // // // // // // //                 alert("Pelatihan baru berhasil dibuat!");
// // // // // // // // // // // //             }
// // // // // // // // // // // //             onSuccess();
// // // // // // // // // // // //         } catch (err: any) {
// // // // // // // // // // // //             console.error("Submit Error:", err);
// // // // // // // // // // // //             alert("Gagal menyimpan: " + (err.response?.data?.message || err.message));
// // // // // // // // // // // //         } finally {
// // // // // // // // // // // //             setLoading(false);
// // // // // // // // // // // //         }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     // State UI Tambahan
// // // // // // // // // // // //     const [newFacility, setNewFacility] = useState('');
// // // // // // // // // // // //     const [uploadingCover, setUploadingCover] = useState(false);
// // // // // // // // // // // //     const [uploadingTemplate, setUploadingTemplate] = useState(false);

// // // // // // // // // // // //     const filteredFacilitators = facilitators.filter(f => 
// // // // // // // // // // // //         (f.name || '').toLowerCase().includes(searchFacilitator.toLowerCase()) || 
// // // // // // // // // // // //         (f.email || '').toLowerCase().includes(searchFacilitator.toLowerCase())
// // // // // // // // // // // //     );

// // // // // // // // // // // //     if (fetchingDetail && course) {
// // // // // // // // // // // //         return (
// // // // // // // // // // // //             <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm">
// // // // // // // // // // // //                 <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center">
// // // // // // // // // // // //                     <Loader2 className="animate-spin text-red-600 mb-2" size={32} />
// // // // // // // // // // // //                     <p className="text-sm font-bold text-gray-700">Memuat Data Lengkap...</p>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //         );
// // // // // // // // // // // //     }

// // // // // // // // // // // //     return (
// // // // // // // // // // // //         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-hidden" role="dialog" aria-modal="true">
// // // // // // // // // // // //             <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
                
// // // // // // // // // // // //                 {/* HEADER */}
// // // // // // // // // // // //                 <div className="bg-gray-900 text-white p-5 flex justify-between items-center shrink-0">
// // // // // // // // // // // //                     <div>
// // // // // // // // // // // //                         <h2 className="text-xl font-bold">{course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2>
// // // // // // // // // // // //                         <p className="text-xs text-gray-400 mt-1">Lengkapi data agar halaman informasi pelatihan tampil sempurna.</p>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     {/* [FIX A11Y] Title & Aria Label */}
// // // // // // // // // // // //                     <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" title="Tutup Modal" aria-label="Tutup"><X size={24}/></button>
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                 {/* TABS */}
// // // // // // // // // // // //                 <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0">
// // // // // // // // // // // //                     {[
// // // // // // // // // // // //                         { id: 'info', label: '1. Informasi Dasar', icon: FileText },
// // // // // // // // // // // //                         { id: 'media', label: '2. Media & Visual', icon: ImageIcon },
// // // // // // // // // // // //                         { id: 'registration', label: '3. Pendaftaran', icon: Users },
// // // // // // // // // // // //                         { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award },
// // // // // // // // // // // //                         { id: 'team', label: '5. Tim & PIC', icon: Users },
// // // // // // // // // // // //                     ].map((tab) => (
// // // // // // // // // // // //                         <button
// // // // // // // // // // // //                             key={tab.id}
// // // // // // // // // // // //                             onClick={() => setActiveTab(tab.id)}
// // // // // // // // // // // //                             className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap outline-none focus:bg-gray-100
// // // // // // // // // // // //                                 ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}
// // // // // // // // // // // //                             `}
// // // // // // // // // // // //                         >
// // // // // // // // // // // //                             <tab.icon size={16} /> {tab.label}
// // // // // // // // // // // //                         </button>
// // // // // // // // // // // //                     ))}
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                 {/* CONTENT */}
// // // // // // // // // // // //                 <form id="courseForm" className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    
// // // // // // // // // // // //                     {/* TAB 1: INFO */}
// // // // // // // // // // // //                     {activeTab === 'info' && (
// // // // // // // // // // // //                         <div className="space-y-6 max-w-4xl mx-auto">
// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // // // // //                                 <div>
// // // // // // // // // // // //                                     <label htmlFor="courseTitle" className="block text-sm font-bold text-gray-700 mb-1">Judul Pelatihan <span className="text-red-500">*</span></label>
// // // // // // // // // // // //                                     <input id="courseTitle" name="title" required type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" value={formData.title} onChange={e => handleChange('title', e.target.value)} />
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                                 <div>
// // // // // // // // // // // //                                     <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap</label>
// // // // // // // // // // // //                                     <div className="bg-white rounded-lg border overflow-hidden">
// // // // // // // // // // // //                                         <ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" />
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>
                            
// // // // // // // // // // // //                             <div className="grid grid-cols-2 gap-6">
// // // // // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // // // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
// // // // // // // // // // // //                                     <div className="flex items-center gap-2 mb-2">
// // // // // // // // // // // //                                         <input type="checkbox" id="regForever" checked={formData.regIsForever} onChange={e => handleChange('regIsForever', e.target.checked)} className="w-4 h-4 text-red-600 rounded shrink-0 focus:ring-0 accent-red-600" title="Buka Selamanya"/>
// // // // // // // // // // // //                                         <label htmlFor="regForever" className="text-sm text-gray-600 cursor-pointer">Buka Selamanya</label>
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                     {!formData.regIsForever && (
// // // // // // // // // // // //                                         <div className="grid grid-cols-2 gap-3">
// // // // // // // // // // // //                                             {/* [FIX A11Y] Title Attribute */}
// // // // // // // // // // // //                                             <div><label className="text-xs text-gray-500 block mb-1">Mulai</label><input type="date" title="Mulai Pendaftaran" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} /></div>
// // // // // // // // // // // //                                             <div><label className="text-xs text-gray-500 block mb-1">Selesai</label><input type="date" title="Selesai Pendaftaran" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} /></div>
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                     )}
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // // // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
// // // // // // // // // // // //                                     <div className="flex items-center gap-2 mb-2">
// // // // // // // // // // // //                                         <input type="checkbox" id="execForever" checked={formData.execIsForever} onChange={e => handleChange('execIsForever', e.target.checked)} className="w-4 h-4 text-red-600 rounded shrink-0 focus:ring-0 accent-red-600" title="Fleksibel"/>
// // // // // // // // // // // //                                         <label htmlFor="execForever" className="text-sm text-gray-600 cursor-pointer">Fleksibel</label>
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                     {!formData.execIsForever && (
// // // // // // // // // // // //                                         <div className="grid grid-cols-2 gap-3">
// // // // // // // // // // // //                                             {/* [FIX A11Y] Title Attribute */}
// // // // // // // // // // // //                                             <div><label className="text-xs text-gray-500 block mb-1">Mulai</label><input type="date" title="Mulai Pelaksanaan" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} /></div>
// // // // // // // // // // // //                                             <div><label className="text-xs text-gray-500 block mb-1">Selesai</label><input type="date" title="Selesai Pelaksanaan" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} /></div>
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                     )}
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>

// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
// // // // // // // // // // // //                                 <div>
// // // // // // // // // // // //                                     <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label>
// // // // // // // // // // // //                                     <div className="flex gap-4">
// // // // // // // // // // // //                                         <label className="flex items-start gap-2 cursor-pointer"><input type="radio" name="progType" value="training" checked={formData.programType === 'training'} onChange={() => handleChange('programType', 'training')} className="mt-1 w-4 h-4 text-red-600 focus:ring-0 accent-red-600 shrink-0"/> Diklat Resmi</label>
// // // // // // // // // // // //                                         <label className="flex items-start gap-2 cursor-pointer"><input type="radio" name="progType" value="course" checked={formData.programType === 'course'} onChange={() => handleChange('programType', 'course')} className="mt-1 w-4 h-4 text-red-600 focus:ring-0 accent-red-600 shrink-0"/> Kursus Mandiri</label>
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                                 <div className="flex items-start gap-3 mt-1">
// // // // // // // // // // // //                                     <input type="checkbox" id="hasCert" checked={formData.hasCertificate} onChange={e => handleChange('hasCertificate', e.target.checked)} className="mt-1 w-4 h-4 text-red-600 rounded focus:ring-0 accent-red-600 shrink-0" title="Sertifikat Tersedia"/>
// // // // // // // // // // // //                                     <label htmlFor="hasCert" className="text-sm font-bold text-gray-700 cursor-pointer">Sertifikat Tersedia?</label>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     )}

// // // // // // // // // // // //                     {/* TAB 2: MEDIA */}
// // // // // // // // // // // //                     {activeTab === 'media' && (
// // // // // // // // // // // //                         <div className="max-w-3xl mx-auto space-y-6">
// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // // //                                 <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image</label>
// // // // // // // // // // // //                                 <div className="flex gap-6 items-start">
// // // // // // // // // // // //                                     <div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
// // // // // // // // // // // //                                         {/* [FIX A11Y] Alt Text */}
// // // // // // // // // // // //                                         {formData.thumbnailUrl ? <img src={formData.thumbnailUrl} alt="Cover Preview" className="w-full h-full object-cover"/> : <ImageIcon className="text-gray-400"/>}
// // // // // // // // // // // //                                         {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                     <div className="flex-1">
// // // // // // // // // // // //                                         <input id="coverUploader" type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" title="Upload Cover"/>
// // // // // // // // // // // //                                         <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2" title="Pilih Gambar"><Upload size={16}/> Upload Gambar</button>
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // // //                                 <label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi</label>
// // // // // // // // // // // //                                 <input className="w-full p-2.5 border rounded-lg" placeholder="URL Video Youtube" value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} title="URL Video Promosi"/>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     )}

// // // // // // // // // // // //                     {/* TAB 3: PENDAFTARAN */}
// // // // // // // // // // // //                     {activeTab === 'registration' && (
// // // // // // // // // // // //                         <div className="max-w-4xl mx-auto space-y-6">
// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // // //                                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan</h3>
// // // // // // // // // // // //                                 <div className="space-y-4">
// // // // // // // // // // // //                                     <label className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer hover:bg-gray-50">
// // // // // // // // // // // //                                         <input type="radio" name="regMethod" value="auto" checked={formData.registrationMethod === 'auto'} onChange={() => handleChange('registrationMethod', 'auto')} className="mt-1 w-4 h-4 text-red-600 focus:ring-0 accent-red-600 shrink-0" />
// // // // // // // // // // // //                                         <div><span className="block font-bold text-gray-800">Otomatis (Langsung Aktif)</span></div>
// // // // // // // // // // // //                                     </label>
// // // // // // // // // // // //                                     <label className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer hover:bg-gray-50">
// // // // // // // // // // // //                                         <input type="radio" name="regMethod" value="manual" checked={formData.registrationMethod === 'manual'} onChange={() => handleChange('registrationMethod', 'manual')} className="mt-1 w-4 h-4 text-red-600 focus:ring-0 accent-red-600 shrink-0" />
// // // // // // // // // // // //                                         <div><span className="block font-bold text-gray-800">Manual (Verifikasi Admin)</span></div>
// // // // // // // // // // // //                                     </label>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>

// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // // //                                 <div className="flex justify-between items-start mb-4">
// // // // // // // // // // // //                                     <div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan</h3><p className="text-xs text-gray-500">Template dokumen untuk peserta.</p></div>
// // // // // // // // // // // //                                     <div className="flex items-center gap-2">
// // // // // // // // // // // //                                         <input id="checkNoDocs" type="checkbox" checked={!formData.requireDocs} onChange={(e) => handleChange('requireDocs', !e.target.checked)} className="w-4 h-4 text-red-600 rounded focus:ring-0 accent-red-600 shrink-0" title="Tidak butuh dokumen"/>
// // // // // // // // // // // //                                         <label htmlFor="checkNoDocs" className="text-xs font-bold text-gray-700 cursor-pointer">Tidak butuh dokumen</label>
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                 </div>

// // // // // // // // // // // //                                 {formData.requireDocs && (
// // // // // // // // // // // //                                     <div className="animate-in slide-in-from-top-2">
// // // // // // // // // // // //                                         <div className="flex justify-end mb-3">
// // // // // // // // // // // //                                             {/* [FIX A11Y] Title & Aria Label */}
// // // // // // // // // // // //                                             <input id="templateUploader" type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} title="Upload Template"/>
// // // // // // // // // // // //                                             <button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50" title="Pilih File Template">
// // // // // // // // // // // //                                                 {uploadingTemplate ? 'Mengupload...' : <><Upload size={14}/> Upload Template Baru</>}
// // // // // // // // // // // //                                             </button>
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                         <div className="space-y-3">
// // // // // // // // // // // //                                             {formData.registrationTemplates.map((item: any, idx: number) => (
// // // // // // // // // // // //                                                 <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
// // // // // // // // // // // //                                                     <div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div>
// // // // // // // // // // // //                                                     <div className="flex-1">
// // // // // // // // // // // //                                                         <input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} title="Nama Dokumen Template"/>
// // // // // // // // // // // //                                                         <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5 relative z-20 cursor-pointer w-fit" onClick={(e) => e.stopPropagation()}>
// // // // // // // // // // // //                                                             <Download size={10} /> Lihat File
// // // // // // // // // // // //                                                         </a>
// // // // // // // // // // // //                                                     </div>
// // // // // // // // // // // //                                                     {/* [FIX A11Y] Title Attribute */}
// // // // // // // // // // // //                                                     <button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 rounded" title="Hapus Template"><Trash2 size={16} /></button>
// // // // // // // // // // // //                                                 </div>
// // // // // // // // // // // //                                             ))}
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                 )}
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     )}

// // // // // // // // // // // //                     {/* TAB 4: FASILITAS */}
// // // // // // // // // // // //                     {activeTab === 'facilities' && (
// // // // // // // // // // // //                         <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
// // // // // // // // // // // //                             <div className="space-y-6">
// // // // // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // // //                                     <label className="block text-sm font-bold text-gray-700 mb-2">Harga</label>
// // // // // // // // // // // //                                     <input type="number" className="w-full p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} title="Harga Pelatihan"/>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // // //                                     <div className="grid grid-cols-2 gap-4">
// // // // // // // // // // // //                                         <div>
// // // // // // // // // // // //                                             <label className="block text-xs font-bold text-gray-600 mb-1">Durasi (Menit)</label>
// // // // // // // // // // // //                                             <input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.estimatedDuration} disabled title="Estimasi Durasi (Otomatis)"/>
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                         <div>
// // // // // // // // // // // //                                             <label className="block text-xs font-bold text-gray-600 mb-1">Total JP</label>
// // // // // // // // // // // //                                             <input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.totalJp} disabled title="Total JP (Otomatis)"/>
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                     </div>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
// // // // // // // // // // // //                                 <label className="block text-sm font-bold text-gray-700 mb-3">Fasilitas</label>
// // // // // // // // // // // //                                 <div className="flex gap-2 mb-4">
// // // // // // // // // // // //                                     <input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} title="Nama Fasilitas"/>
// // // // // // // // // // // //                                     <button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" title="Tambah Fasilitas"><Plus size={18}/></button>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                                 <div className="flex-1 space-y-2">
// // // // // // // // // // // //                                     {formData.facilities.map((item: string, idx: number) => (
// // // // // // // // // // // //                                         <div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm">
// // // // // // // // // // // //                                             <span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span>
// // // // // // // // // // // //                                             {/* [FIX A11Y] Title Attribute */}
// // // // // // // // // // // //                                             <button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" title="Hapus Fasilitas"><X size={14}/></button>
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                     ))}
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     )}

// // // // // // // // // // // //                     {/* TAB 5: TIM */}
// // // // // // // // // // // //                     {activeTab === 'team' && (
// // // // // // // // // // // //                         <div className="max-w-4xl mx-auto space-y-8">
// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // // //                                 <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
// // // // // // // // // // // //                                 <input type="text" placeholder="Cari nama..." className="w-full mb-4 p-2 border rounded-lg text-sm" value={searchFacilitator} onChange={(e) => setSearchFacilitator(e.target.value)} title="Cari Fasilitator"/>
// // // // // // // // // // // //                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-2 bg-gray-50 rounded-lg border">
// // // // // // // // // // // //                                     {filteredFacilitators.map(fac => (
// // // // // // // // // // // //                                         <label key={fac._id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer ${formData.facilitatorIds.includes(fac._id) ? 'bg-red-50 border-red-200 ring-1 ring-red-500' : 'bg-white hover:bg-gray-100'}`}>
// // // // // // // // // // // //                                             <input type="checkbox" checked={formData.facilitatorIds.includes(fac._id)} onChange={() => toggleFacilitator(fac._id)} className="mt-1 w-4 h-4 text-red-600 rounded focus:ring-0 accent-red-600 shrink-0" title={`Pilih ${fac.name}`}/>
// // // // // // // // // // // //                                             <div className="flex items-center gap-2 overflow-hidden">
// // // // // // // // // // // //                                                 <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0 overflow-hidden">{/* [FIX A11Y] Alt Text */}{fac.avatarUrl ? <img src={fac.avatarUrl} alt={fac.name} className="w-full h-full object-cover"/> : <div className="flex items-center justify-center h-full font-bold text-xs">{fac.name.charAt(0)}</div>}</div>
// // // // // // // // // // // //                                                 <div className="truncate"><div className="text-xs font-bold truncate">{fac.name}</div><div className="text-[9px] text-gray-500 truncate">{fac.email}</div></div>
// // // // // // // // // // // //                                             </div>
// // // // // // // // // // // //                                         </label>
// // // // // // // // // // // //                                     ))}
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // // //                                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab & Kontak</h3>
// // // // // // // // // // // //                                 <div className="space-y-4">
// // // // // // // // // // // //                                     <div className="flex justify-between items-center"><label className="text-sm font-bold text-gray-700">Daftar PIC Tambahan</label><button type="button" onClick={addPic} className="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 font-bold flex items-center gap-1" title="Tambah PIC"><Plus size={12}/> Tambah PIC</button></div>
// // // // // // // // // // // //                                     {formData.pics.map((pic: any, idx: number) => (
// // // // // // // // // // // //                                         <div key={idx} className="flex gap-3 items-start">
// // // // // // // // // // // //                                             <div className="flex-1 grid grid-cols-3 gap-3">
// // // // // // // // // // // //                                                 <input placeholder="Nama" className="p-2 border rounded text-sm" value={pic.name} onChange={e => updatePic(idx, 'name', e.target.value)} title="Nama PIC"/>
// // // // // // // // // // // //                                                 <input placeholder="Status" className="p-2 border rounded text-sm" value={pic.pmiStatus} onChange={e => updatePic(idx, 'pmiStatus', e.target.value)} title="Status PIC"/>
// // // // // // // // // // // //                                                 <input placeholder="Email" className="p-2 border rounded text-sm" value={pic.email} onChange={e => updatePic(idx, 'email', e.target.value)} title="Email PIC"/>
// // // // // // // // // // // //                                             </div>
// // // // // // // // // // // //                                             <button type="button" onClick={() => removePic(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded" title="Hapus PIC"><Trash2 size={16}/></button>
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                     ))}
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     )}
// // // // // // // // // // // //                 </form>

// // // // // // // // // // // //                 {/* FOOTER */}
// // // // // // // // // // // //                 <div className="bg-white border-t p-4 flex justify-end gap-3 shrink-0">
// // // // // // // // // // // //                     <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50" title="Batal">Batal</button>
// // // // // // // // // // // //                     <button type="button" onClick={handleSubmit} disabled={loading} className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 shadow-lg flex items-center gap-2 disabled:opacity-50" title="Simpan">
// // // // // // // // // // // //                         {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"/> : <Save size={18}/>}
// // // // // // // // // // // //                         Simpan Pelatihan
// // // // // // // // // // // //                     </button>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //     );
// // // // // // // // // // // // }
// // // // // // // // // // // 'use client';

// // // // // // // // // // // import { useState, useRef, useEffect } from 'react';
// // // // // // // // // // // import { 
// // // // // // // // // // //     X, Upload, Plus, Trash2, Save, Calendar, 
// // // // // // // // // // //     Video, Image as ImageIcon, Users, FileText, 
// // // // // // // // // // //     CheckCircle, AlertCircle, Award, Clock, Search, 
// // // // // // // // // // //     Download, File, Info, Loader2 
// // // // // // // // // // // } from 'lucide-react';
// // // // // // // // // // // // Gunakan api wrapper bawaan untuk GET/PUT agar Auth aman
// // // // // // // // // // // import { api, apiUpload } from '@/lib/api'; 
// // // // // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // // // // import 'react-quill/dist/quill.snow.css';
// // // // // // // // // // // import axios from 'axios'; 

// // // // // // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // // // // // //     ssr: false,
// // // // // // // // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // // // // // // // });

// // // // // // // // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // // // // // // // interface CourseFormModalProps {
// // // // // // // // // // //     course?: any; 
// // // // // // // // // // //     onClose: () => void;
// // // // // // // // // // //     onSuccess: () => void;
// // // // // // // // // // //     facilitators: any[]; 
// // // // // // // // // // //     currentUser: any; 
// // // // // // // // // // // }

// // // // // // // // // // // export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
// // // // // // // // // // //     const [activeTab, setActiveTab] = useState('info');
// // // // // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // // // // //     const [fetchingDetail, setFetchingDetail] = useState(false);
    
// // // // // // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null); 
// // // // // // // // // // //     const templateInputRef = useRef<HTMLInputElement>(null); 
// // // // // // // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');

// // // // // // // // // // //     // --- INITIAL STATE ---
// // // // // // // // // // //     const defaultState = {
// // // // // // // // // // //         title: '',
// // // // // // // // // // //         description: '', 
// // // // // // // // // // //         programType: 'training', 
// // // // // // // // // // //         hasCertificate: true,
// // // // // // // // // // //         regIsForever: false,
// // // // // // // // // // //         regStartDate: '',
// // // // // // // // // // //         regEndDate: '',
// // // // // // // // // // //         execIsForever: false,
// // // // // // // // // // //         execStartDate: '',
// // // // // // // // // // //         execEndDate: '',
// // // // // // // // // // //         thumbnailUrl: '',
// // // // // // // // // // //         promoVideoUrl: '',
// // // // // // // // // // //         registrationMethod: 'auto', 
// // // // // // // // // // //         requireDocs: true, 
// // // // // // // // // // //         registrationTemplates: [] as any[], 
// // // // // // // // // // //         price: 0,
// // // // // // // // // // //         estimatedDuration: 0, 
// // // // // // // // // // //         totalJp: 0, 
// // // // // // // // // // //         facilities: [] as string[], 
// // // // // // // // // // //         facilitatorIds: [] as string[],
// // // // // // // // // // //         pics: [] as any[], 
// // // // // // // // // // //     };

// // // // // // // // // // //     const [formData, setFormData] = useState(defaultState);

// // // // // // // // // // //     // State UI Tambahan
// // // // // // // // // // //     const [newFacility, setNewFacility] = useState('');
// // // // // // // // // // //     const [uploadingCover, setUploadingCover] = useState(false);
// // // // // // // // // // //     const [uploadingTemplate, setUploadingTemplate] = useState(false);

// // // // // // // // // // //     // Helper URL
// // // // // // // // // // //     const getDisplayUrl = (url: string) => {
// // // // // // // // // // //         if (!url) return '';
// // // // // // // // // // //         if (url.startsWith('http')) return url;
// // // // // // // // // // //         return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
// // // // // // // // // // //     };

// // // // // // // // // // //     // --- FETCH DETAIL DATA ---
// // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // //         const initData = async () => {
// // // // // // // // // // //             if (course && course._id) {
// // // // // // // // // // //                 setFetchingDetail(true);
// // // // // // // // // // //                 try {
// // // // // // // // // // //                     const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
// // // // // // // // // // //                     const fullData = res.course || res.data || res;
// // // // // // // // // // //                     populateForm(fullData);
// // // // // // // // // // //                 } catch (e) {
// // // // // // // // // // //                     console.error("Fetch error, fallback props:", e);
// // // // // // // // // // //                     populateForm(course);
// // // // // // // // // // //                 } finally {
// // // // // // // // // // //                     setFetchingDetail(false);
// // // // // // // // // // //                 }
// // // // // // // // // // //             } else {
// // // // // // // // // // //                 setFormData(defaultState);
// // // // // // // // // // //             }
// // // // // // // // // // //         };
// // // // // // // // // // //         initData();
// // // // // // // // // // //     }, [course]);

// // // // // // // // // // //     const populateForm = (data: any) => {
// // // // // // // // // // //         const formatDate = (d: string) => {
// // // // // // // // // // //             if (!d) return '';
// // // // // // // // // // //             try { return new Date(d).toISOString().split('T')[0]; } catch (e) { return ''; }
// // // // // // // // // // //         };

// // // // // // // // // // //         setFormData({
// // // // // // // // // // //             title: data.title || '',
// // // // // // // // // // //             description: data.description || '',
// // // // // // // // // // //             programType: data.programType || 'training',
// // // // // // // // // // //             hasCertificate: data.hasCertificate ?? true,
            
// // // // // // // // // // //             regIsForever: data.registrationPeriod?.isForever ?? false,
// // // // // // // // // // //             regStartDate: formatDate(data.registrationPeriod?.startDate),
// // // // // // // // // // //             regEndDate: formatDate(data.registrationPeriod?.endDate),

// // // // // // // // // // //             execIsForever: data.executionPeriod?.isForever ?? false,
// // // // // // // // // // //             execStartDate: formatDate(data.executionPeriod?.startDate),
// // // // // // // // // // //             execEndDate: formatDate(data.executionPeriod?.endDate),

// // // // // // // // // // //             thumbnailUrl: data.thumbnailUrl || '',
// // // // // // // // // // //             promoVideoUrl: data.promoVideoUrl || '',

// // // // // // // // // // //             registrationMethod: data.registrationMethod || 'auto',
            
// // // // // // // // // // //             requireDocs: data.registrationConfig?.requireDocs !== false,
// // // // // // // // // // //             registrationTemplates: Array.isArray(data.registrationConfig?.templates) ? data.registrationConfig.templates : (data.registrationTemplates || []),

// // // // // // // // // // //             price: Number(data.price) || 0,
// // // // // // // // // // //             estimatedDuration: Number(data.estimatedDuration) || 0,
// // // // // // // // // // //             totalJp: Number(data.totalJp) || 0,
            
// // // // // // // // // // //             facilities: Array.isArray(data.facilities) ? data.facilities : [],
// // // // // // // // // // //             facilitatorIds: Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [],
// // // // // // // // // // //             pics: Array.isArray(data.pics) ? data.pics : []
// // // // // // // // // // //         });
// // // // // // // // // // //     }

// // // // // // // // // // //     // --- HANDLERS ---
// // // // // // // // // // //     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
// // // // // // // // // // //     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
// // // // // // // // // // //     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };
// // // // // // // // // // //     const addPic = () => { if (formData.pics.length >= 3) return alert("Maksimal 3 PIC"); setFormData(prev => ({ ...prev, pics: [...prev.pics, { name: '', pmiStatus: '', email: '' }] })); };
// // // // // // // // // // //     const updatePic = (idx: number, field: string, val: string) => { const newPics = [...formData.pics]; newPics[idx] = { ...newPics[idx], [field]: val }; setFormData(prev => ({ ...prev, pics: newPics })); };
// // // // // // // // // // //     const removePic = (idx: number) => { setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); };
    
// // // // // // // // // // //     const toggleFacilitator = (id: string) => {
// // // // // // // // // // //         const current = formData.facilitatorIds;
// // // // // // // // // // //         setFormData(prev => ({ ...prev, facilitatorIds: current.includes(id) ? current.filter(fid => fid !== id) : [...current, id] }));
// // // // // // // // // // //     };

// // // // // // // // // // //     // Upload Cover (apiUpload bawaan)
// // // // // // // // // // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // // // // // // // //         try {
// // // // // // // // // // //             setUploadingCover(true); const fd = new FormData(); fd.append('file', file);
// // // // // // // // // // //             const res = await apiUpload('/api/upload', fd); 
// // // // // // // // // // //             const url = res.url || res.file?.url || res.data?.url;
// // // // // // // // // // //             if (url) handleChange('thumbnailUrl', url);
// // // // // // // // // // //         } catch (err: any) { alert('Gagal: ' + err.message); } finally { setUploadingCover(false); }
// // // // // // // // // // //     };

// // // // // // // // // // //     // Upload Dokumen (Axios Manual ke /api/materials/upload)
// // // // // // // // // // //     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // // // // // // // //         setUploadingTemplate(true);
// // // // // // // // // // //         try {
// // // // // // // // // // //             const fd = new FormData(); fd.append('file', file);
            
// // // // // // // // // // //             const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
// // // // // // // // // // //             const token = userStr ? JSON.parse(userStr).token : '';

// // // // // // // // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { 
// // // // // // // // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
// // // // // // // // // // //                 withCredentials: true 
// // // // // // // // // // //             });
            
// // // // // // // // // // //             const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url;
// // // // // // // // // // //             if (!rawUrl) throw new Error("Gagal dapat URL.");

// // // // // // // // // // //             setFormData(prev => ({
// // // // // // // // // // //                 ...prev,
// // // // // // // // // // //                 registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }]
// // // // // // // // // // //             }));
// // // // // // // // // // //         } catch (err: any) {
// // // // // // // // // // //             console.error(err);
// // // // // // // // // // //             alert('Upload Gagal: ' + (err.response?.data?.message || err.message));
// // // // // // // // // // //         } finally {
// // // // // // // // // // //             setUploadingTemplate(false);
// // // // // // // // // // //             if (templateInputRef.current) templateInputRef.current.value = '';
// // // // // // // // // // //         }
// // // // // // // // // // //     };

// // // // // // // // // // //     const removeTemplate = (idx: number) => {
// // // // // // // // // // //         if(!confirm("Hapus dokumen ini?")) return;
// // // // // // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) }));
// // // // // // // // // // //     };

// // // // // // // // // // //     const updateTemplateTitle = (idx: number, newTitle: string) => {
// // // // // // // // // // //         const newTemplates = [...formData.registrationTemplates];
// // // // // // // // // // //         newTemplates[idx].title = newTitle;
// // // // // // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: newTemplates }));
// // // // // // // // // // //     };

// // // // // // // // // // //     // --- SUBMIT ---
// // // // // // // // // // //     const handleSubmit = async (e: React.FormEvent) => {
// // // // // // // // // // //         e.preventDefault();
// // // // // // // // // // //         if (!formData.title) return alert("Judul wajib diisi!");

// // // // // // // // // // //         setLoading(true);
// // // // // // // // // // //         try {
// // // // // // // // // // //             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
// // // // // // // // // // //             const parseDate = (d: string) => d ? new Date(d) : null;

// // // // // // // // // // //             const payload = {
// // // // // // // // // // //                 title: formData.title,
// // // // // // // // // // //                 description: formData.description,
// // // // // // // // // // //                 programType: formData.programType,
// // // // // // // // // // //                 hasCertificate: formData.hasCertificate,
// // // // // // // // // // //                 price: Number(formData.price),
// // // // // // // // // // //                 estimatedDuration: Number(formData.estimatedDuration),
// // // // // // // // // // //                 totalJp: Number(formData.totalJp),
// // // // // // // // // // //                 thumbnailUrl: formData.thumbnailUrl,
// // // // // // // // // // //                 promoVideoUrl: formData.promoVideoUrl,
                
// // // // // // // // // // //                 registrationPeriod: {
// // // // // // // // // // //                     isForever: formData.regIsForever,
// // // // // // // // // // //                     startDate: parseDate(formData.regStartDate),
// // // // // // // // // // //                     endDate: parseDate(formData.regEndDate)
// // // // // // // // // // //                 },
// // // // // // // // // // //                 executionPeriod: {
// // // // // // // // // // //                     isForever: formData.execIsForever,
// // // // // // // // // // //                     startDate: parseDate(formData.execStartDate),
// // // // // // // // // // //                     endDate: parseDate(formData.execEndDate)
// // // // // // // // // // //                 },
                
// // // // // // // // // // //                 registrationMethod: formData.registrationMethod,
// // // // // // // // // // //                 registrationConfig: {
// // // // // // // // // // //                     requireDocs: formData.requireDocs,
// // // // // // // // // // //                     templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url }))
// // // // // // // // // // //                 },
                
// // // // // // // // // // //                 facilities: formData.facilities,
// // // // // // // // // // //                 facilitatorIds: formData.facilitatorIds,
// // // // // // // // // // //                 pics: validPics,
// // // // // // // // // // //                 creatorInfo: {
// // // // // // // // // // //                     name: currentUser?.name || 'Admin',
// // // // // // // // // // //                     email: currentUser?.email || '-',
// // // // // // // // // // //                     contact: currentUser?.phoneNumber || '-' 
// // // // // // // // // // //                 }
// // // // // // // // // // //             };

// // // // // // // // // // //             console.log("PAYLOAD:", payload);

// // // // // // // // // // //             let res;
// // // // // // // // // // //             if (course?._id) {
// // // // // // // // // // //                 res = await api(`/api/courses/${course._id}`, { method: 'PUT', body: payload });
// // // // // // // // // // //             } else {
// // // // // // // // // // //                 res = await api('/api/courses', { method: 'POST', body: payload });
// // // // // // // // // // //             }

// // // // // // // // // // //             if(res && (res.course || res.data)) populateForm(res.course || res.data);

// // // // // // // // // // //             alert("Berhasil disimpan!");
// // // // // // // // // // //             onSuccess();
// // // // // // // // // // //         } catch (err: any) {
// // // // // // // // // // //             console.error(err);
// // // // // // // // // // //             alert("Gagal: " + (err.response?.data?.message || err.message));
// // // // // // // // // // //         } finally {
// // // // // // // // // // //             setLoading(false);
// // // // // // // // // // //         }
// // // // // // // // // // //     };

// // // // // // // // // // //     const filteredFacilitators = facilitators.filter(f => 
// // // // // // // // // // //         (f.name || '').toLowerCase().includes(searchFacilitator.toLowerCase()) || 
// // // // // // // // // // //         (f.email || '').toLowerCase().includes(searchFacilitator.toLowerCase())
// // // // // // // // // // //     );

// // // // // // // // // // //     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><div className="bg-white p-5 rounded-lg flex items-center gap-3"><Loader2 className="animate-spin text-red-600"/> Memuat data...</div></div>;

// // // // // // // // // // //     return (
// // // // // // // // // // //         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-hidden" role="dialog" aria-modal="true">
// // // // // // // // // // //             <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
                
// // // // // // // // // // //                 {/* HEADER */}
// // // // // // // // // // //                 <div className="bg-gray-900 text-white p-5 flex justify-between items-center shrink-0">
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <h2 className="text-xl font-bold">{course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2>
// // // // // // // // // // //                         <p className="text-xs text-gray-400 mt-1">Lengkapi data agar halaman informasi pelatihan tampil sempurna.</p>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" title="Tutup" aria-label="Tutup"><X size={24}/></button>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 {/* TABS */}
// // // // // // // // // // //                 <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0">
// // // // // // // // // // //                     {[
// // // // // // // // // // //                         { id: 'info', label: '1. Informasi Dasar', icon: FileText },
// // // // // // // // // // //                         { id: 'media', label: '2. Media & Visual', icon: ImageIcon },
// // // // // // // // // // //                         { id: 'registration', label: '3. Pendaftaran', icon: Users },
// // // // // // // // // // //                         { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award },
// // // // // // // // // // //                         { id: 'team', label: '5. Tim & PIC', icon: Users },
// // // // // // // // // // //                     ].map((tab) => (
// // // // // // // // // // //                         <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap outline-none ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
// // // // // // // // // // //                             <tab.icon size={16} /> {tab.label}
// // // // // // // // // // //                         </button>
// // // // // // // // // // //                     ))}
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 {/* FORM CONTENT */}
// // // // // // // // // // //                 <form id="courseForm" className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    
// // // // // // // // // // //                     {/* TAB 1 */}
// // // // // // // // // // //                     {activeTab === 'info' && (
// // // // // // // // // // //                         <div className="space-y-6 max-w-4xl mx-auto">
// // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // // // //                                 <div><label htmlFor="courseTitle" className="block text-sm font-bold text-gray-700 mb-1">Judul Pelatihan <span className="text-red-500">*</span></label><input id="courseTitle" required type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: Orientasi Kepalangmerahan" value={formData.title} onChange={e => handleChange('title', e.target.value)} title="Judul" /></div>
// // // // // // // // // // //                                 <div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap</label><div className="bg-white rounded-lg border overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" placeholder="Tulis deskripsi..." /></div></div>
// // // // // // // // // // //                             </div>

// // // // // // // // // // //                             <div className="grid grid-cols-2 gap-6">
// // // // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
// // // // // // // // // // //                                     <div className="flex items-center gap-2 mb-2"><input type="checkbox" checked={formData.regIsForever} onChange={e => handleChange('regIsForever', e.target.checked)} className="w-4 h-4 text-red-600 rounded" title="Selamanya"/><label className="text-sm text-gray-600 cursor-pointer">Buka Selamanya (Tanpa Batas Waktu)</label></div>
// // // // // // // // // // //                                     {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai</span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} title="Mulai" /></div><div><span className="text-xs text-gray-500 block mb-1">Selesai</span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} title="Selesai" /></div></div>)}
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
// // // // // // // // // // //                                     <div className="flex items-center gap-2 mb-2"><input type="checkbox" checked={formData.execIsForever} onChange={e => handleChange('execIsForever', e.target.checked)} className="w-4 h-4 text-red-600 rounded" title="Fleksibel"/><label className="text-sm text-gray-600 cursor-pointer">Fleksibel (Sesuai Kecepatan Peserta)</label></div>
// // // // // // // // // // //                                     {!formData.execIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai</span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} title="Mulai" /></div><div><span className="text-xs text-gray-500 block mb-1">Selesai</span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} title="Selesai" /></div></div>)}
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                             </div>

// // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
// // // // // // // // // // //                                 <div><label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label><div className="flex gap-4"><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="progType" value="training" checked={formData.programType === 'training'} onChange={() => handleChange('programType', 'training')} className="text-red-600" title="Training"/> Diklat Resmi</label><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="progType" value="course" checked={formData.programType === 'course'} onChange={() => handleChange('programType', 'course')} className="text-red-600" title="Course"/> Kursus Mandiri</label></div></div>
// // // // // // // // // // //                                 <div className="w-px bg-gray-200"></div>
// // // // // // // // // // //                                 <div className="flex items-center gap-3"><input type="checkbox" checked={formData.hasCertificate} onChange={e => handleChange('hasCertificate', e.target.checked)} className="w-5 h-5 text-red-600 rounded" title="Sertifikat"/><label className="text-sm font-bold text-gray-700 cursor-pointer">Sertifikat Tersedia?</label></div>
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     )}

// // // // // // // // // // //                     {/* TAB 2 */}
// // // // // // // // // // //                     {activeTab === 'media' && (
// // // // // // // // // // //                         <div className="max-w-3xl mx-auto space-y-6">
// // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // //                                 <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) <span className="text-red-500">*</span></label>
// // // // // // // // // // //                                 <div className="flex gap-6 items-start">
// // // // // // // // // // //                                     <div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
// // // // // // // // // // //                                         {formData.thumbnailUrl ? <img src={getDisplayUrl(formData.thumbnailUrl)} className="w-full h-full object-cover" alt="Cover"/> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1" /><span className="text-xs">Belum ada gambar</span></div>}
// // // // // // // // // // //                                         {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
// // // // // // // // // // //                                     </div>
// // // // // // // // // // //                                     <div className="flex-1">
// // // // // // // // // // //                                         <p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p>
// // // // // // // // // // //                                         <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" title="Input Gambar"/>
// // // // // // // // // // //                                         <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2" title="Upload Gambar"><Upload size={16}/> Upload Gambar</button>
// // // // // // // // // // //                                     </div>
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // //                                 <label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label>
// // // // // // // // // // //                                 <div className="flex gap-2"><div className="p-3 bg-gray-100 rounded-l-lg border border-r-0 text-gray-500"><Video size={18}/></div><input type="text" className="flex-1 p-2.5 border rounded-r-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} title="URL Video"/></div>
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     )}

// // // // // // // // // // //                     {/* TAB 3 */}
// // // // // // // // // // //                     {activeTab === 'registration' && (
// // // // // // // // // // //                         <div className="max-w-4xl mx-auto space-y-6">
// // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // //                                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan Peserta</h3>
// // // // // // // // // // //                                 <div className="space-y-4">
// // // // // // // // // // //                                     <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'auto' ? 'bg-green-50 border-green-200 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><input type="radio" name="regMethod" value="auto" checked={formData.registrationMethod === 'auto'} onChange={() => handleChange('registrationMethod', 'auto')} className="mt-1 text-red-600" title="Otomatis"/><div><span className="block font-bold text-gray-800">Otomatis (Langsung Aktif)</span><span className="text-xs text-gray-500">Peserta langsung aktif setelah daftar.</span></div></label>
// // // // // // // // // // //                                     <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'manual' ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><input type="radio" name="regMethod" value="manual" checked={formData.registrationMethod === 'manual'} onChange={() => handleChange('registrationMethod', 'manual')} className="mt-1 text-red-600" title="Manual"/><div><span className="block font-bold text-gray-800">Manual (Verifikasi Admin)</span><span className="text-xs text-gray-500">Peserta menunggu verifikasi admin.</span></div></label>
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                             </div>

// // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // // //                                 <div className="flex justify-between items-start mb-4">
// // // // // // // // // // //                                     <div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload, diisi, dan diupload ulang oleh peserta.</p></div>
// // // // // // // // // // //                                     <div className="flex items-center gap-2"><input type="checkbox" checked={!formData.requireDocs} onChange={(e) => handleChange('requireDocs', !e.target.checked)} className="w-4 h-4 text-red-600 rounded" title="Tidak butuh dokumen"/><label className="text-xs font-bold text-gray-700 cursor-pointer">Tidak butuh dokumen persyaratan</label></div>
// // // // // // // // // // //                                 </div>

// // // // // // // // // // //                                 {formData.requireDocs && (
// // // // // // // // // // //                                     <div className="space-y-3">
// // // // // // // // // // //                                         <div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} title="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50" title="Upload Template">{uploadingTemplate ? 'Mengupload...' : <><Upload size={14}/> Upload Template Baru</>}</button></div>
// // // // // // // // // // //                                         {formData.registrationTemplates.length === 0 ? <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">Belum ada dokumen.</div> : formData.registrationTemplates.map((item: any, idx: number) => (
// // // // // // // // // // //                                             <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
// // // // // // // // // // //                                                 <div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div>
// // // // // // // // // // //                                                 <div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} title="Nama Dokumen"/>
// // // // // // // // // // //                                                 <a href={getDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()} title="Lihat File"><Download size={10} /> Lihat File Uploaded</a></div>
// // // // // // // // // // //                                                 <button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Hapus Dokumen"><Trash2 size={16} /></button>
// // // // // // // // // // //                                             </div>
// // // // // // // // // // //                                         ))}
// // // // // // // // // // //                                     </div>
// // // // // // // // // // //                                 )}
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     )}

// // // // // // // // // // //                     {/* TAB 4 */}
// // // // // // // // // // //                     {activeTab === 'facilities' && (
// // // // // // // // // // //                         <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
// // // // // // // // // // //                             <div className="space-y-6">
// // // // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" title="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div>
// // // // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.estimatedDuration} disabled title="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.totalJp} disabled title="Total JP"/></div></div></div>
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas</label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} title="Nama Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" title="Tambah Fasilitas"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" title="Hapus Fasilitas"><X size={14}/></button></div>))}</div></div>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     )}

// // // // // // // // // // //                     {/* TAB 5 */}
// // // // // // // // // // //                     {activeTab === 'team' && (
// // // // // // // // // // //                         <div className="max-w-4xl mx-auto space-y-8">
// // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3><div className="relative mb-4"><Search className="absolute left-3 top-2.5 text-gray-400" size={16} /><input type="text" placeholder="Cari nama atau email..." className="w-full pl-9 p-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchFacilitator} onChange={(e) => setSearchFacilitator(e.target.value)} title="Cari Fasilitator"/></div><div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-2 bg-gray-50 rounded-lg border">{filteredFacilitators.map(fac => (<label key={fac._id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.facilitatorIds.includes(fac._id) ? 'bg-red-50 border-red-200 ring-1 ring-red-500' : 'bg-white hover:bg-gray-100'}`}><input type="checkbox" checked={formData.facilitatorIds.includes(fac._id)} onChange={() => toggleFacilitator(fac._id)} className="w-4 h-4 text-red-600 rounded" title={`Pilih ${fac.name}`}/><div className="flex items-center gap-2 overflow-hidden"><div className="w-8 h-8 rounded-full bg-gray-200 shrink-0 overflow-hidden">{fac.avatarUrl ? <img src={getDisplayUrl(fac.avatarUrl)} alt={fac.name} className="w-full h-full object-cover"/> : <div className="flex items-center justify-center h-full font-bold text-xs">{fac.name.charAt(0)}</div>}</div><div className="truncate"><div className="text-xs font-bold truncate">{fac.name}</div><div className="text-[9px] text-gray-500 truncate">{fac.email}</div></div></div></label>))}</div></div>
// // // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab & Kontak</h3><div className="space-y-4"><div className="flex justify-between items-center"><label className="text-sm font-bold text-gray-700">Daftar PIC Tambahan (Maks 3)</label><button type="button" onClick={addPic} className="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 font-bold flex items-center gap-1" title="Tambah PIC"><Plus size={12}/> Tambah PIC</button></div>{formData.pics.map((pic: any, idx: number) => (<div key={idx} className="flex gap-3 items-start animate-in slide-in-from-left-2"><div className="flex-1 grid grid-cols-3 gap-3"><input placeholder="Nama Lengkap" className="p-2 border rounded text-sm" value={pic.name} onChange={e => updatePic(idx, 'name', e.target.value)} title="Nama PIC"/><input placeholder="Status di PMI" className="p-2 border rounded text-sm" value={pic.pmiStatus} onChange={e => updatePic(idx, 'pmiStatus', e.target.value)} title="Status PIC"/><input placeholder="Email Kontak" className="p-2 border rounded text-sm" value={pic.email} onChange={e => updatePic(idx, 'email', e.target.value)} title="Email PIC"/></div><button type="button" onClick={() => removePic(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded" title="Hapus PIC"><Trash2 size={16}/></button></div>))}</div></div>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     )}
// // // // // // // // // // //                 </form>

// // // // // // // // // // //                 <div className="bg-white border-t p-4 flex justify-end gap-3 shrink-0">
// // // // // // // // // // //                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50" title="Batal">Batal</button>
// // // // // // // // // // //                     <button onClick={handleSubmit} disabled={loading} className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 shadow-lg flex items-center gap-2 disabled:opacity-50" title="Simpan">
// // // // // // // // // // //                         {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"/> : <Save size={18}/>} Simpan Pelatihan
// // // // // // // // // // //                     </button>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //     );
// // // // // // // // // // // }
// // // // // // // // // // 'use client';

// // // // // // // // // // import { useState, useRef, useEffect } from 'react';
// // // // // // // // // // import { 
// // // // // // // // // //     X, Upload, Plus, Trash2, Save, Calendar, 
// // // // // // // // // //     Video, Image as ImageIcon, Users, FileText, 
// // // // // // // // // //     CheckCircle, AlertCircle, Award, Clock, Search, 
// // // // // // // // // //     Download, File, Info, Loader2 
// // // // // // // // // // } from 'lucide-react';
// // // // // // // // // // import { api, apiUpload } from '@/lib/api'; 
// // // // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // // // import 'react-quill/dist/quill.snow.css';
// // // // // // // // // // import axios from 'axios'; 

// // // // // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // // // // //     ssr: false,
// // // // // // // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // // // // // // });

// // // // // // // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // // // // // // interface CourseFormModalProps {
// // // // // // // // // //     course?: any; 
// // // // // // // // // //     onClose: () => void;
// // // // // // // // // //     onSuccess: () => void;
// // // // // // // // // //     facilitators: any[]; 
// // // // // // // // // //     currentUser: any; 
// // // // // // // // // // }

// // // // // // // // // // export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
// // // // // // // // // //     const [activeTab, setActiveTab] = useState('info');
// // // // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // // // //     const [fetchingDetail, setFetchingDetail] = useState(false);
    
// // // // // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null); 
// // // // // // // // // //     const templateInputRef = useRef<HTMLInputElement>(null); 
// // // // // // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');

// // // // // // // // // //     // --- INITIAL STATE ---
// // // // // // // // // //     const defaultState = {
// // // // // // // // // //         title: '',
// // // // // // // // // //         description: '', 
// // // // // // // // // //         programType: 'training', 
// // // // // // // // // //         hasCertificate: true,
// // // // // // // // // //         regIsForever: false,
// // // // // // // // // //         regStartDate: '',
// // // // // // // // // //         regEndDate: '',
// // // // // // // // // //         execIsForever: false,
// // // // // // // // // //         execStartDate: '',
// // // // // // // // // //         execEndDate: '',
// // // // // // // // // //         thumbnailUrl: '',
// // // // // // // // // //         promoVideoUrl: '',
// // // // // // // // // //         registrationMethod: 'auto', 
// // // // // // // // // //         requireDocs: true, 
// // // // // // // // // //         registrationTemplates: [] as any[], 
// // // // // // // // // //         price: 0,
// // // // // // // // // //         estimatedDuration: 0, 
// // // // // // // // // //         totalJp: 0, 
// // // // // // // // // //         facilities: [] as string[], 
// // // // // // // // // //         facilitatorIds: [] as string[],
// // // // // // // // // //         pics: [] as any[], 
// // // // // // // // // //         creatorInfo: null as any
// // // // // // // // // //     };

// // // // // // // // // //     const [formData, setFormData] = useState(defaultState);

// // // // // // // // // //     // State UI Tambahan
// // // // // // // // // //     const [newFacility, setNewFacility] = useState('');
// // // // // // // // // //     const [uploadingCover, setUploadingCover] = useState(false);
// // // // // // // // // //     const [uploadingTemplate, setUploadingTemplate] = useState(false);

// // // // // // // // // //     // Helper URL
// // // // // // // // // //     const getDisplayUrl = (url: string) => {
// // // // // // // // // //         if (!url) return '';
// // // // // // // // // //         if (url.startsWith('http')) return url;
// // // // // // // // // //         const cleanPath = url.startsWith('/') ? url : `/${url}`;
// // // // // // // // // //         return `${API_BASE_URL}${cleanPath}`;
// // // // // // // // // //     };

// // // // // // // // // //     const getYoutubeEmbed = (url: string) => {
// // // // // // // // // //         try {
// // // // // // // // // //             if (!url) return '';
// // // // // // // // // //             if (url.includes('embed')) return url;
// // // // // // // // // //             const videoId = url.split('v=')[1]?.split('&')[0];
// // // // // // // // // //             if (videoId) return `https://www.youtube.com/embed/${videoId}`;
// // // // // // // // // //             if (url.includes('youtu.be')) return `https://www.youtube.com/embed/${url.split('/').pop()}`;
// // // // // // // // // //             return url;
// // // // // // // // // //         } catch { return url; }
// // // // // // // // // //     };

// // // // // // // // // //     // --- FETCH DATA ---
// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         const initData = async () => {
// // // // // // // // // //             if (course && course._id) {
// // // // // // // // // //                 setFetchingDetail(true);
// // // // // // // // // //                 try {
// // // // // // // // // //                     const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
// // // // // // // // // //                     const fullData = res.course || res.data || res;
// // // // // // // // // //                     populateForm(fullData);
// // // // // // // // // //                 } catch (e) {
// // // // // // // // // //                     console.error("Gagal fetch detail, pakai fallback:", e);
// // // // // // // // // //                     populateForm(course);
// // // // // // // // // //                 } finally {
// // // // // // // // // //                     setFetchingDetail(false);
// // // // // // // // // //                 }
// // // // // // // // // //             } else {
// // // // // // // // // //                 setFormData(defaultState);
// // // // // // // // // //             }
// // // // // // // // // //         };
// // // // // // // // // //         initData();
// // // // // // // // // //     }, [course]);

// // // // // // // // // //     const populateForm = (data: any) => {
// // // // // // // // // //         const formatDate = (d: string) => {
// // // // // // // // // //             if (!d) return '';
// // // // // // // // // //             try { return new Date(d).toISOString().split('T')[0]; } catch (e) { return ''; }
// // // // // // // // // //         };

// // // // // // // // // //         setFormData({
// // // // // // // // // //             title: data.title || '',
// // // // // // // // // //             description: data.description || '',
// // // // // // // // // //             programType: data.programType || 'training',
// // // // // // // // // //             hasCertificate: data.hasCertificate ?? true,
            
// // // // // // // // // //             regIsForever: data.registrationPeriod?.isForever ?? false,
// // // // // // // // // //             regStartDate: formatDate(data.registrationPeriod?.startDate),
// // // // // // // // // //             regEndDate: formatDate(data.registrationPeriod?.endDate),

// // // // // // // // // //             execIsForever: data.executionPeriod?.isForever ?? false,
// // // // // // // // // //             execStartDate: formatDate(data.executionPeriod?.startDate),
// // // // // // // // // //             execEndDate: formatDate(data.executionPeriod?.endDate),

// // // // // // // // // //             thumbnailUrl: data.thumbnailUrl || '',
// // // // // // // // // //             promoVideoUrl: data.promoVideoUrl || '',

// // // // // // // // // //             registrationMethod: data.registrationMethod || 'auto',
            
// // // // // // // // // //             requireDocs: data.registrationConfig?.requireDocs !== false,
// // // // // // // // // //             registrationTemplates: Array.isArray(data.registrationConfig?.templates) ? data.registrationConfig.templates : [],

// // // // // // // // // //             price: Number(data.price) || 0,
// // // // // // // // // //             estimatedDuration: Number(data.estimatedDuration) || 0,
// // // // // // // // // //             totalJp: Number(data.totalJp) || 0,
            
// // // // // // // // // //             facilities: Array.isArray(data.facilities) ? data.facilities : [],
// // // // // // // // // //             facilitatorIds: Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [],
// // // // // // // // // //             pics: Array.isArray(data.pics) ? data.pics : [],
// // // // // // // // // //             creatorInfo: data.creatorInfo || null
// // // // // // // // // //         });
// // // // // // // // // //     }

// // // // // // // // // //     // --- HANDLERS ---
// // // // // // // // // //     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
// // // // // // // // // //     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
// // // // // // // // // //     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };
// // // // // // // // // //     const addPic = () => { if (formData.pics.length >= 3) return alert("Maksimal 3 PIC"); setFormData(prev => ({ ...prev, pics: [...prev.pics, { name: '', pmiStatus: '', email: '' }] })); };
// // // // // // // // // //     const updatePic = (idx: number, field: string, val: string) => { const newPics = [...formData.pics]; newPics[idx] = { ...newPics[idx], [field]: val }; setFormData(prev => ({ ...prev, pics: newPics })); };
// // // // // // // // // //     const removePic = (idx: number) => { setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); };
    
// // // // // // // // // //     const toggleFacilitator = (id: string) => {
// // // // // // // // // //         const current = formData.facilitatorIds;
// // // // // // // // // //         setFormData(prev => ({ ...prev, facilitatorIds: current.includes(id) ? current.filter(fid => fid !== id) : [...current, id] }));
// // // // // // // // // //     };

// // // // // // // // // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // // // // // // //         try {
// // // // // // // // // //             setUploadingCover(true); const fd = new FormData(); fd.append('file', file);
// // // // // // // // // //             const res = await apiUpload('/api/upload', fd); 
// // // // // // // // // //             const url = res.url || res.file?.url || res.data?.url;
// // // // // // // // // //             if (url) handleChange('thumbnailUrl', url);
// // // // // // // // // //         } catch (err: any) { alert('Gagal: ' + err.message); } finally { setUploadingCover(false); }
// // // // // // // // // //     };

// // // // // // // // // //     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // // // // // // //         setUploadingTemplate(true);
// // // // // // // // // //         try {
// // // // // // // // // //             const fd = new FormData(); fd.append('file', file);
// // // // // // // // // //             const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
// // // // // // // // // //             const token = userStr ? JSON.parse(userStr).token : '';

// // // // // // // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { 
// // // // // // // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
// // // // // // // // // //                 withCredentials: true 
// // // // // // // // // //             });
            
// // // // // // // // // //             const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url;
// // // // // // // // // //             if (!rawUrl) throw new Error("Gagal dapat URL.");

// // // // // // // // // //             setFormData(prev => ({
// // // // // // // // // //                 ...prev,
// // // // // // // // // //                 registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }]
// // // // // // // // // //             }));
// // // // // // // // // //         } catch (err: any) {
// // // // // // // // // //             console.error(err);
// // // // // // // // // //             alert('Upload Gagal: ' + (err.response?.data?.message || err.message));
// // // // // // // // // //         } finally {
// // // // // // // // // //             setUploadingTemplate(false);
// // // // // // // // // //             if (templateInputRef.current) templateInputRef.current.value = '';
// // // // // // // // // //         }
// // // // // // // // // //     };

// // // // // // // // // //     const removeTemplate = (idx: number) => {
// // // // // // // // // //         if(!confirm("Hapus dokumen ini?")) return;
// // // // // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) }));
// // // // // // // // // //     };

// // // // // // // // // //     const updateTemplateTitle = (idx: number, v: string) => {
// // // // // // // // // //         const t = [...formData.registrationTemplates]; t[idx].title = v;
// // // // // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: t }));
// // // // // // // // // //     };

// // // // // // // // // //     // --- SUBMIT ---
// // // // // // // // // //     const handleSubmit = async (e: React.FormEvent) => {
// // // // // // // // // //         e.preventDefault();
// // // // // // // // // //         if (!formData.title) return alert("Judul wajib diisi!");

// // // // // // // // // //         setLoading(true);
// // // // // // // // // //         try {
// // // // // // // // // //             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
// // // // // // // // // //             const parseDate = (d: string) => d ? new Date(d) : null;

// // // // // // // // // //             const payload = {
// // // // // // // // // //                 title: formData.title,
// // // // // // // // // //                 description: formData.description,
// // // // // // // // // //                 programType: formData.programType,
// // // // // // // // // //                 hasCertificate: formData.hasCertificate,
// // // // // // // // // //                 price: Number(formData.price),
// // // // // // // // // //                 estimatedDuration: Number(formData.estimatedDuration),
// // // // // // // // // //                 totalJp: Number(formData.totalJp),
// // // // // // // // // //                 thumbnailUrl: formData.thumbnailUrl,
// // // // // // // // // //                 promoVideoUrl: formData.promoVideoUrl,
// // // // // // // // // //                 registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
// // // // // // // // // //                 executionPeriod: { isForever: formData.execIsForever, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
// // // // // // // // // //                 registrationMethod: formData.registrationMethod,
// // // // // // // // // //                 registrationConfig: { requireDocs: formData.requireDocs, templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) },
// // // // // // // // // //                 facilities: formData.facilities,
// // // // // // // // // //                 facilitatorIds: formData.facilitatorIds,
// // // // // // // // // //                 pics: validPics,
// // // // // // // // // //                 creatorInfo: formData.creatorInfo || {
// // // // // // // // // //                     name: currentUser?.name || 'Admin',
// // // // // // // // // //                     email: currentUser?.email || '-',
// // // // // // // // // //                     contact: currentUser?.phoneNumber || '-' 
// // // // // // // // // //                 }
// // // // // // // // // //             };

// // // // // // // // // //             let res;
// // // // // // // // // //             if (course?._id) res = await api(`/api/courses/${course._id}`, { method: 'PUT', body: payload });
// // // // // // // // // //             else res = await api('/api/courses', { method: 'POST', body: payload });

// // // // // // // // // //             if(res && (res.course || res.data)) populateForm(res.course || res.data);
// // // // // // // // // //             alert("Berhasil disimpan!");
// // // // // // // // // //             onSuccess();
// // // // // // // // // //         } catch (err: any) {
// // // // // // // // // //             console.error(err);
// // // // // // // // // //             alert("Gagal: " + (err.response?.data?.message || err.message));
// // // // // // // // // //         } finally {
// // // // // // // // // //             setLoading(false);
// // // // // // // // // //         }
// // // // // // // // // //     };

// // // // // // // // // //     const filteredFacilitators = facilitators.filter(f => 
// // // // // // // // // //         (f.name || '').toLowerCase().includes(searchFacilitator.toLowerCase()) || 
// // // // // // // // // //         (f.email || '').toLowerCase().includes(searchFacilitator.toLowerCase())
// // // // // // // // // //     );

// // // // // // // // // //     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><div className="bg-white p-5 rounded-lg flex items-center gap-3"><Loader2 className="animate-spin text-red-600"/> Memuat data...</div></div>;

// // // // // // // // // //     return (
// // // // // // // // // //         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-hidden" role="dialog" aria-modal="true">
// // // // // // // // // //             <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
                
// // // // // // // // // //                 {/* HEADER */}
// // // // // // // // // //                 <div className="bg-gray-900 text-white p-5 flex justify-between items-center shrink-0">
// // // // // // // // // //                     <div><h2 className="text-xl font-bold">{course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2><p className="text-xs text-gray-400 mt-1">Lengkapi data pelatihan.</p></div>
// // // // // // // // // //                     <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" title="Tutup" aria-label="Tutup"><X size={24}/></button>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0">
// // // // // // // // // //                     {[
// // // // // // // // // //                         { id: 'info', label: '1. Informasi Dasar', icon: FileText },
// // // // // // // // // //                         { id: 'media', label: '2. Media & Visual', icon: ImageIcon },
// // // // // // // // // //                         { id: 'registration', label: '3. Pendaftaran', icon: Users },
// // // // // // // // // //                         { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award },
// // // // // // // // // //                         { id: 'team', label: '5. Tim & PIC', icon: Users },
// // // // // // // // // //                     ].map((tab) => (
// // // // // // // // // //                         <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap outline-none ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
// // // // // // // // // //                             <tab.icon size={16} /> {tab.label}
// // // // // // // // // //                         </button>
// // // // // // // // // //                     ))}
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <form id="courseForm" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    
// // // // // // // // // //                     {/* TAB 1 */}
// // // // // // // // // //                     {activeTab === 'info' && (
// // // // // // // // // //                         <div className="space-y-6 max-w-4xl mx-auto">
// // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // // //                                 <div><label htmlFor="courseTitle" className="block text-sm font-bold text-gray-700 mb-1">Judul Pelatihan <span className="text-red-500">*</span></label><input id="courseTitle" required type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: Orientasi Kepalangmerahan" value={formData.title} onChange={e => handleChange('title', e.target.value)} title="Judul Pelatihan" /></div>
// // // // // // // // // //                                 <div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap</label><div className="bg-white rounded-lg border overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" placeholder="Tulis deskripsi..." /></div></div>
// // // // // // // // // //                             </div>
// // // // // // // // // //                             <div className="grid grid-cols-2 gap-6">
// // // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
// // // // // // // // // //                                     <div className="flex items-center gap-2 mb-2"><input type="checkbox" id="regForever" checked={formData.regIsForever} onChange={e => handleChange('regIsForever', e.target.checked)} className="w-4 h-4 text-red-600 rounded" title="Selamanya"/><label htmlFor="regForever" className="text-sm text-gray-600 cursor-pointer">Buka Selamanya (Tanpa Batas Waktu)</label></div>
// // // // // // // // // //                                     {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai</span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} title="Mulai Pendaftaran" /></div><div><span className="text-xs text-gray-500 block mb-1">Selesai</span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} title="Selesai Pendaftaran" /></div></div>)}
// // // // // // // // // //                                 </div>
// // // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
// // // // // // // // // //                                     <div className="flex items-center gap-2 mb-2"><input type="checkbox" id="execForever" checked={formData.execIsForever} onChange={e => handleChange('execIsForever', e.target.checked)} className="w-4 h-4 text-red-600 rounded" title="Fleksibel"/><label htmlFor="execForever" className="text-sm text-gray-600 cursor-pointer">Fleksibel (Sesuai Kecepatan Peserta)</label></div>
// // // // // // // // // //                                     {!formData.execIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai</span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} title="Mulai Pelaksanaan" /></div><div><span className="text-xs text-gray-500 block mb-1">Selesai</span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} title="Selesai Pelaksanaan" /></div></div>)}
// // // // // // // // // //                                 </div>
// // // // // // // // // //                             </div>
// // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
// // // // // // // // // //                                 <div><label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label><div className="flex gap-4"><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="progType" value="training" checked={formData.programType === 'training'} onChange={() => handleChange('programType', 'training')} className="text-red-600" title="Training"/> Diklat Resmi</label><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="progType" value="course" checked={formData.programType === 'course'} onChange={() => handleChange('programType', 'course')} className="text-red-600" title="Course"/> Kursus Mandiri</label></div></div>
// // // // // // // // // //                                 <div className="w-px bg-gray-200"></div>
// // // // // // // // // //                                 <div className="flex items-center gap-3"><input type="checkbox" id="hasCert" checked={formData.hasCertificate} onChange={e => handleChange('hasCertificate', e.target.checked)} className="w-5 h-5 text-red-600 rounded" title="Sertifikat"/><label htmlFor="hasCert" className="text-sm font-bold text-gray-700 cursor-pointer">Sertifikat Tersedia?</label></div>
// // // // // // // // // //                             </div>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     )}

// // // // // // // // // //                     {/* TAB 2 */}
// // // // // // // // // //                     {activeTab === 'media' && (
// // // // // // // // // //                         <div className="max-w-3xl mx-auto space-y-6">
// // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // //                                 <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) <span className="text-red-500">*</span></label>
// // // // // // // // // //                                 <div className="flex gap-6 items-start">
// // // // // // // // // //                                     <div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
// // // // // // // // // //                                         {formData.thumbnailUrl ? <img src={getDisplayUrl(formData.thumbnailUrl)} alt="Preview Cover" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1" /><span className="text-xs">Belum ada gambar</span></div>}
// // // // // // // // // //                                         {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
// // // // // // // // // //                                     </div>
// // // // // // // // // //                                     <div className="flex-1">
// // // // // // // // // //                                         <p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p>
// // // // // // // // // //                                         <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" title="Input Gambar"/>
// // // // // // // // // //                                         <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2" title="Upload Gambar"><Upload size={16}/> Upload Gambar</button>
// // // // // // // // // //                                     </div>
// // // // // // // // // //                                 </div>
// // // // // // // // // //                             </div>
// // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // //                                 <label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label>
// // // // // // // // // //                                 <div className="flex gap-2"><div className="p-3 bg-gray-100 rounded-l-lg border border-r-0 text-gray-500"><Video size={18}/></div><input type="text" className="flex-1 p-2.5 border rounded-r-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} title="URL Video Youtube" /></div>
// // // // // // // // // //                                 {formData.promoVideoUrl && formData.promoVideoUrl.includes('youtube') && (
// // // // // // // // // //                                     <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 aspect-video w-full max-w-sm bg-black">
// // // // // // // // // //                                         <iframe width="100%" height="100%" src={getYoutubeEmbed(formData.promoVideoUrl)} title="Preview Video" frameBorder="0" allowFullScreen></iframe>
// // // // // // // // // //                                     </div>
// // // // // // // // // //                                 )}
// // // // // // // // // //                             </div>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     )}

// // // // // // // // // //                     {/* TAB 3 */}
// // // // // // // // // //                     {activeTab === 'registration' && (
// // // // // // // // // //                         <div className="max-w-4xl mx-auto space-y-6">
// // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // //                                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan Peserta</h3>
// // // // // // // // // //                                 <div className="space-y-4">
// // // // // // // // // //                                     <label className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'auto' ? 'bg-green-50 border-green-200 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
// // // // // // // // // //                                         <input type="radio" name="regMethod" value="auto" checked={formData.registrationMethod === 'auto'} onChange={() => handleChange('registrationMethod', 'auto')} className="mt-1 w-5 h-5 text-green-600 focus:ring-green-500 accent-green-600" title="Otomatis"/>
// // // // // // // // // //                                         <div><span className="block font-bold text-gray-800 text-sm mb-1">Otomatis (Langsung Aktif)</span><span className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</span></div>
// // // // // // // // // //                                     </label>
// // // // // // // // // //                                     <label className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'manual' ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
// // // // // // // // // //                                         <input type="radio" name="regMethod" value="manual" checked={formData.registrationMethod === 'manual'} onChange={() => handleChange('registrationMethod', 'manual')} className="mt-1 w-5 h-5 text-yellow-600 focus:ring-yellow-500 accent-yellow-600" title="Manual"/>
// // // // // // // // // //                                         <div><span className="block font-bold text-gray-800 text-sm mb-1">Manual (Verifikasi Admin)</span><span className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</span></div>
// // // // // // // // // //                                     </label>
// // // // // // // // // //                                 </div>
// // // // // // // // // //                             </div>
// // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // //                                 <div className="flex justify-between items-start mb-4">
// // // // // // // // // //                                     <div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div>
// // // // // // // // // //                                     <div className="flex items-center gap-2"><input type="checkbox" id="noDocs" checked={!formData.requireDocs} onChange={(e) => handleChange('requireDocs', !e.target.checked)} className="w-4 h-4 text-red-600 rounded" title="Tidak butuh dokumen"/><label htmlFor="noDocs" className="text-xs font-bold text-gray-700 cursor-pointer">Tidak butuh dokumen</label></div>
// // // // // // // // // //                                 </div>
// // // // // // // // // //                                 {formData.requireDocs && (
// // // // // // // // // //                                     <div className="space-y-3">
// // // // // // // // // //                                         <div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} title="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50" title="Upload Template">{uploadingTemplate ? 'Mengupload...' : <><Upload size={14}/> Upload Template Baru</>}</button></div>
// // // // // // // // // //                                         {formData.registrationTemplates.map((item: any, idx: number) => (
// // // // // // // // // //                                             <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
// // // // // // // // // //                                                 <div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div>
// // // // // // // // // //                                                 <div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} title="Nama Dokumen"/>
// // // // // // // // // //                                                 <a href={getDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()} title="Lihat File"><Download size={10} /> Lihat File Uploaded</a></div>
// // // // // // // // // //                                                 <button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Hapus Dokumen"><Trash2 size={16} /></button>
// // // // // // // // // //                                             </div>
// // // // // // // // // //                                         ))}
// // // // // // // // // //                                     </div>
// // // // // // // // // //                                 )}
// // // // // // // // // //                             </div>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     )}

// // // // // // // // // //                     {/* TAB 4 */}
// // // // // // // // // //                     {activeTab === 'facilities' && (
// // // // // // // // // //                         <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
// // // // // // // // // //                             <div className="space-y-6">
// // // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" title="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div>
// // // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.estimatedDuration} disabled title="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.totalJp} disabled title="Total JP"/></div></div></div>
// // // // // // // // // //                             </div>
// // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas</label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} title="Input Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" title="Tambah Fasilitas"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" title="Hapus Fasilitas"><X size={14}/></button></div>))}</div></div>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     )}

// // // // // // // // // //                     {/* TAB 5 */}
// // // // // // // // // //                     {activeTab === 'team' && (
// // // // // // // // // //                         <div className="max-w-4xl mx-auto space-y-8">
// // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3><div className="relative mb-4"><Search className="absolute left-3 top-2.5 text-gray-400" size={16} /><input type="text" placeholder="Cari nama atau email..." className="w-full pl-9 p-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchFacilitator} onChange={(e) => setSearchFacilitator(e.target.value)} title="Cari Fasilitator"/></div><div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-2 bg-gray-50 rounded-lg border">{filteredFacilitators.map(fac => (<label key={fac._id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.facilitatorIds.includes(fac._id) ? 'bg-red-50 border-red-200 ring-1 ring-red-500' : 'bg-white hover:bg-gray-100'}`}><input type="checkbox" checked={formData.facilitatorIds.includes(fac._id)} onChange={() => toggleFacilitator(fac._id)} className="w-4 h-4 text-red-600 rounded" title={`Pilih ${fac.name}`}/><div className="flex items-center gap-2 overflow-hidden"><div className="w-8 h-8 rounded-full bg-gray-200 shrink-0 overflow-hidden">{fac.avatarUrl ? <img src={getDisplayUrl(fac.avatarUrl)} alt={fac.name} className="w-full h-full object-cover"/> : <div className="flex items-center justify-center h-full font-bold text-xs">{fac.name.charAt(0)}</div>}</div><div className="truncate"><div className="text-xs font-bold truncate">{fac.name}</div><div className="text-[9px] text-gray-500 truncate">{fac.email}</div></div></div></label>))}</div></div>
// // // // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // // //                                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab & Kontak</h3>
                                
// // // // // // // // // //                                 <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
// // // // // // // // // //                                     <div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div>
// // // // // // // // // //                                     <div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div>
// // // // // // // // // //                                 </div>

// // // // // // // // // //                                 <div className="space-y-4">
// // // // // // // // // //                                     <div className="flex justify-between items-center"><label className="text-sm font-bold text-gray-700">Daftar PIC Tambahan (Maks 3)</label><button type="button" onClick={addPic} className="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 font-bold flex items-center gap-1" title="Tambah PIC"><Plus size={12}/> Tambah PIC</button></div>
// // // // // // // // // //                                     {formData.pics.map((pic: any, idx: number) => (
// // // // // // // // // //                                         <div key={idx} className="flex gap-3 items-start animate-in slide-in-from-left-2">
// // // // // // // // // //                                             <div className="flex-1 grid grid-cols-3 gap-3">
// // // // // // // // // //                                                 <input placeholder="Nama Lengkap" className="p-2 border rounded text-sm" value={pic.name} onChange={e => updatePic(idx, 'name', e.target.value)} title="Nama PIC"/>
// // // // // // // // // //                                                 <input placeholder="Status di PMI" className="p-2 border rounded text-sm" value={pic.pmiStatus} onChange={e => updatePic(idx, 'pmiStatus', e.target.value)} title="Status PIC"/>
// // // // // // // // // //                                                 <input placeholder="Email Kontak" className="p-2 border rounded text-sm" value={pic.email} onChange={e => updatePic(idx, 'email', e.target.value)} title="Email PIC"/>
// // // // // // // // // //                                             </div>
// // // // // // // // // //                                             <button type="button" onClick={() => removePic(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded" title="Hapus PIC"><Trash2 size={16}/></button>
// // // // // // // // // //                                         </div>
// // // // // // // // // //                                     ))}
// // // // // // // // // //                                 </div>
// // // // // // // // // //                             </div>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     )}
// // // // // // // // // //                 </form>

// // // // // // // // // //                 <div className="bg-white border-t p-4 flex justify-end gap-3 shrink-0">
// // // // // // // // // //                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50" title="Batal">Batal</button>
// // // // // // // // // //                     <button onClick={handleSubmit} disabled={loading} className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 shadow-lg flex items-center gap-2 disabled:opacity-50" title="Simpan">
// // // // // // // // // //                         {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"/> : <Save size={18}/>} Simpan Pelatihan
// // // // // // // // // //                     </button>
// // // // // // // // // //                 </div>
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>
// // // // // // // // // //     );
// // // // // // // // // // }

// // // // // // // // 'use client';

// // // // // // // // import { useState, useRef, useEffect } from 'react';
// // // // // // // // import { 
// // // // // // // //     X, Upload, Plus, Trash2, Save, Calendar, 
// // // // // // // //     Video, Image as ImageIcon, Users, FileText, 
// // // // // // // //     CheckCircle, AlertCircle, Award, Clock, Search, 
// // // // // // // //     Download, File, Info, Loader2, MessageCircle, UserPlus 
// // // // // // // // } from 'lucide-react';
// // // // // // // // import { api, apiUpload } from '@/lib/api'; 
// // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // import 'react-quill/dist/quill.snow.css';
// // // // // // // // import axios from 'axios'; 

// // // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // // //     ssr: false,
// // // // // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // // // // });

// // // // // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // // // // interface CourseFormModalProps {
// // // // // // // //     course?: any; 
// // // // // // // //     onClose: () => void;
// // // // // // // //     onSuccess: () => void;
// // // // // // // //     facilitators: any[]; 
// // // // // // // //     currentUser: any; 
// // // // // // // // }

// // // // // // // // export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
// // // // // // // //     const [activeTab, setActiveTab] = useState('info');
// // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // //     const [fetchingDetail, setFetchingDetail] = useState(false);
    
// // // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null); 
// // // // // // // //     const templateInputRef = useRef<HTMLInputElement>(null); 
    
// // // // // // // //     // State Search
// // // // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
// // // // // // // //     const [searchPic, setSearchPic] = useState('');
    
// // // // // // // //     // State untuk menyimpan semua user
// // // // // // // //     const [allUsers, setAllUsers] = useState<any[]>([]);

// // // // // // // //     // --- INITIAL STATE ---
// // // // // // // //     const defaultState = {
// // // // // // // //         title: '',
// // // // // // // //         description: '', 
// // // // // // // //         programType: 'training', 
// // // // // // // //         hasCertificate: true,
// // // // // // // //         regIsForever: false,
// // // // // // // //         regStartDate: '',
// // // // // // // //         regEndDate: '',
// // // // // // // //         execIsForever: false,
// // // // // // // //         execStartDate: '',
// // // // // // // //         execEndDate: '',
// // // // // // // //         thumbnailUrl: '',
// // // // // // // //         promoVideoUrl: '',
// // // // // // // //         registrationMethod: 'auto', 
// // // // // // // //         requireDocs: true, 
// // // // // // // //         registrationTemplates: [] as any[], 
// // // // // // // //         price: 0,
// // // // // // // //         estimatedDuration: 0, 
// // // // // // // //         totalJp: 0, 
// // // // // // // //         facilities: [] as string[], 
// // // // // // // //         facilitatorIds: [] as string[],
// // // // // // // //         pics: [] as any[], 
// // // // // // // //         creatorInfo: null as any
// // // // // // // //     };

// // // // // // // //     const [formData, setFormData] = useState(defaultState);

// // // // // // // //     const [newFacility, setNewFacility] = useState('');
// // // // // // // //     const [uploadingCover, setUploadingCover] = useState(false);
// // // // // // // //     const [uploadingTemplate, setUploadingTemplate] = useState(false);

// // // // // // // //     // Helper URL
// // // // // // // //     const getDisplayUrl = (url: string) => {
// // // // // // // //         if (!url) return '';
// // // // // // // //         if (url.startsWith('http')) return url;
// // // // // // // //         const cleanPath = url.startsWith('/') ? url : `/${url}`;
// // // // // // // //         return `${API_BASE_URL}${cleanPath}`;
// // // // // // // //     };

// // // // // // // //     const getYoutubeEmbed = (url: string) => {
// // // // // // // //         try {
// // // // // // // //             if (!url) return '';
// // // // // // // //             if (url.includes('embed')) return url;
// // // // // // // //             const videoId = url.split('v=')[1]?.split('&')[0];
// // // // // // // //             if (videoId) return `https://www.youtube.com/embed/${videoId}`;
// // // // // // // //             if (url.includes('youtu.be')) return `https://www.youtube.com/embed/${url.split('/').pop()}`;
// // // // // // // //             return url;
// // // // // // // //         } catch { return url; }
// // // // // // // //     };

// // // // // // // //     // --- FETCH DATA ---
// // // // // // // //     useEffect(() => {
// // // // // // // //         const initData = async () => {
// // // // // // // //             if (course && course._id) {
// // // // // // // //                 setFetchingDetail(true);
// // // // // // // //                 try {
// // // // // // // //                     const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
// // // // // // // //                     const fullData = res.course || res.data || res;
// // // // // // // //                     populateForm(fullData);
// // // // // // // //                 } catch (e) {
// // // // // // // //                     console.error("Gagal fetch detail, pakai fallback:", e);
// // // // // // // //                     populateForm(course);
// // // // // // // //                 } finally {
// // // // // // // //                     setFetchingDetail(false);
// // // // // // // //                 }
// // // // // // // //             } else {
// // // // // // // //                 setFormData(defaultState);
// // // // // // // //             }
// // // // // // // //         };
// // // // // // // //         initData();
// // // // // // // //     }, [course]);

// // // // // // // //     // FETCH ALL USERS
// // // // // // // //     useEffect(() => {
// // // // // // // //         const fetchAllUsers = async () => {
// // // // // // // //             try {
// // // // // // // //                 const res = await api('/api/users'); 
// // // // // // // //                 const users = res.users || res.data || [];
// // // // // // // //                 setAllUsers(users);
// // // // // // // //             } catch (err) {
// // // // // // // //                 console.error("Gagal load users:", err);
// // // // // // // //                 setAllUsers(facilitators);
// // // // // // // //             }
// // // // // // // //         };
// // // // // // // //         fetchAllUsers();
// // // // // // // //     }, []);

// // // // // // // //     const populateForm = (data: any) => {
// // // // // // // //         const formatDate = (d: string) => {
// // // // // // // //             if (!d) return '';
// // // // // // // //             try { return new Date(d).toISOString().split('T')[0]; } catch (e) { return ''; }
// // // // // // // //         };

// // // // // // // //         setFormData({
// // // // // // // //             title: data.title || '',
// // // // // // // //             description: data.description || '',
// // // // // // // //             programType: data.programType || 'training',
// // // // // // // //             hasCertificate: data.hasCertificate ?? true,
// // // // // // // //             regIsForever: data.registrationPeriod?.isForever ?? false,
// // // // // // // //             regStartDate: formatDate(data.registrationPeriod?.startDate),
// // // // // // // //             regEndDate: formatDate(data.registrationPeriod?.endDate),
// // // // // // // //             execIsForever: data.executionPeriod?.isForever ?? false,
// // // // // // // //             execStartDate: formatDate(data.executionPeriod?.startDate),
// // // // // // // //             execEndDate: formatDate(data.executionPeriod?.endDate),
// // // // // // // //             thumbnailUrl: data.thumbnailUrl || '',
// // // // // // // //             promoVideoUrl: data.promoVideoUrl || '',
// // // // // // // //             registrationMethod: data.registrationMethod || 'auto',
// // // // // // // //             requireDocs: data.registrationConfig?.requireDocs !== false,
// // // // // // // //             registrationTemplates: Array.isArray(data.registrationConfig?.templates) ? data.registrationConfig.templates : [],
// // // // // // // //             price: Number(data.price) || 0,
// // // // // // // //             estimatedDuration: Number(data.estimatedDuration) || 0,
// // // // // // // //             totalJp: Number(data.totalJp) || 0,
// // // // // // // //             facilities: Array.isArray(data.facilities) ? data.facilities : [],
// // // // // // // //             facilitatorIds: Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [],
// // // // // // // //             pics: Array.isArray(data.pics) ? data.pics : [],
// // // // // // // //             creatorInfo: data.creatorInfo || null
// // // // // // // //         });
// // // // // // // //     }

// // // // // // // //     // --- HANDLERS ---
// // // // // // // //     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
// // // // // // // //     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
// // // // // // // //     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };
    
// // // // // // // //     // Handler Tambah PIC
// // // // // // // //     const handleAddPicFromSearch = (user: any) => {
// // // // // // // //         if (formData.pics.length >= 3) return alert("Maksimal 3 PIC Tambahan");
// // // // // // // //         const exists = formData.pics.some((p: any) => p.email === user.email);
// // // // // // // //         if (exists) return alert("User ini sudah ditambahkan.");

// // // // // // // //         const newPic = {
// // // // // // // //             name: user.name,
// // // // // // // //             pmiStatus: user.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()) : 'Anggota', 
// // // // // // // //             email: user.email,
// // // // // // // //             avatarUrl: user.avatarUrl 
// // // // // // // //         };

// // // // // // // //         setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
// // // // // // // //         setSearchPic(''); 
// // // // // // // //     };

// // // // // // // //     const removePic = (idx: number) => { setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); };
    
// // // // // // // //     const toggleFacilitator = (id: string) => {
// // // // // // // //         const current = formData.facilitatorIds;
// // // // // // // //         setFormData(prev => ({ ...prev, facilitatorIds: current.includes(id) ? current.filter(fid => fid !== id) : [...current, id] }));
// // // // // // // //     };

// // // // // // // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // // // // //         try {
// // // // // // // //             setUploadingCover(true); const fd = new FormData(); fd.append('file', file);
// // // // // // // //             const res = await apiUpload('/api/upload', fd); 
// // // // // // // //             const url = res.url || res.file?.url || res.data?.url;
// // // // // // // //             if (url) handleChange('thumbnailUrl', url);
// // // // // // // //         } catch (err: any) { alert('Gagal: ' + err.message); } finally { setUploadingCover(false); }
// // // // // // // //     };

// // // // // // // //     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // // // // //         setUploadingTemplate(true);
// // // // // // // //         try {
// // // // // // // //             const fd = new FormData(); fd.append('file', file);
// // // // // // // //             const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
// // // // // // // //             const token = userStr ? JSON.parse(userStr).token : '';

// // // // // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { 
// // // // // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
// // // // // // // //                 withCredentials: true 
// // // // // // // //             });
            
// // // // // // // //             const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url;
// // // // // // // //             if (!rawUrl) throw new Error("Gagal dapat URL.");

// // // // // // // //             setFormData(prev => ({
// // // // // // // //                 ...prev,
// // // // // // // //                 registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }]
// // // // // // // //             }));
// // // // // // // //         } catch (err: any) {
// // // // // // // //             console.error(err);
// // // // // // // //             alert('Upload Gagal: ' + (err.response?.data?.message || err.message));
// // // // // // // //         } finally {
// // // // // // // //             setUploadingTemplate(false);
// // // // // // // //             if (templateInputRef.current) templateInputRef.current.value = '';
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const removeTemplate = (idx: number) => {
// // // // // // // //         if(!confirm("Hapus dokumen ini?")) return;
// // // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) }));
// // // // // // // //     };

// // // // // // // //     const updateTemplateTitle = (idx: number, v: string) => {
// // // // // // // //         const t = [...formData.registrationTemplates]; t[idx].title = v;
// // // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: t }));
// // // // // // // //     };

// // // // // // // //     // --- SUBMIT ---
// // // // // // // //     const handleSubmit = async (e: React.FormEvent) => {
// // // // // // // //         e.preventDefault();
// // // // // // // //         if (!formData.title) return alert("Judul wajib diisi!");

// // // // // // // //         setLoading(true);
// // // // // // // //         try {
// // // // // // // //             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
// // // // // // // //             const parseDate = (d: string) => d ? new Date(d) : null;

// // // // // // // //             const payload = {
// // // // // // // //                 title: formData.title,
// // // // // // // //                 description: formData.description,
// // // // // // // //                 programType: formData.programType,
// // // // // // // //                 hasCertificate: formData.hasCertificate,
// // // // // // // //                 price: Number(formData.price),
// // // // // // // //                 estimatedDuration: Number(formData.estimatedDuration),
// // // // // // // //                 totalJp: Number(formData.totalJp),
// // // // // // // //                 thumbnailUrl: formData.thumbnailUrl,
// // // // // // // //                 promoVideoUrl: formData.promoVideoUrl,
// // // // // // // //                 registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
// // // // // // // //                 executionPeriod: { isForever: formData.execIsForever, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
// // // // // // // //                 registrationMethod: formData.registrationMethod,
// // // // // // // //                 registrationConfig: { requireDocs: formData.requireDocs, templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) },
// // // // // // // //                 facilities: formData.facilities,
// // // // // // // //                 facilitatorIds: formData.facilitatorIds,
// // // // // // // //                 pics: validPics,
// // // // // // // //                 creatorInfo: formData.creatorInfo || {
// // // // // // // //                     name: currentUser?.name || 'Admin',
// // // // // // // //                     email: currentUser?.email || '-',
// // // // // // // //                     contact: currentUser?.phoneNumber || '-' 
// // // // // // // //                 }
// // // // // // // //             };

// // // // // // // //             let res;
// // // // // // // //             if (course?._id) res = await api(`/api/courses/${course._id}`, { method: 'PUT', body: payload });
// // // // // // // //             else res = await api('/api/courses', { method: 'POST', body: payload });

// // // // // // // //             if(res && (res.course || res.data)) populateForm(res.course || res.data);
// // // // // // // //             alert("Berhasil disimpan!");
// // // // // // // //             onSuccess();
// // // // // // // //         } catch (err: any) {
// // // // // // // //             console.error(err);
// // // // // // // //             alert("Gagal: " + (err.response?.data?.message || err.message));
// // // // // // // //         } finally {
// // // // // // // //             setLoading(false);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const filteredFacilitators = facilitators.filter(f => 
// // // // // // // //         (f.name || '').toLowerCase().includes(searchFacilitator.toLowerCase()) || 
// // // // // // // //         (f.email || '').toLowerCase().includes(searchFacilitator.toLowerCase())
// // // // // // // //     );

// // // // // // // //     const filteredPicCandidates = allUsers.filter(u => 
// // // // // // // //         ((u.name || '').toLowerCase().includes(searchPic.toLowerCase()) || 
// // // // // // // //         (u.email || '').toLowerCase().includes(searchPic.toLowerCase())) &&
// // // // // // // //         !formData.pics.some((p: any) => p.email === u.email)
// // // // // // // //     );

// // // // // // // //     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><div className="bg-white p-5 rounded-lg flex items-center gap-3"><Loader2 className="animate-spin text-red-600"/> Memuat data...</div></div>;

// // // // // // // //     return (
// // // // // // // //         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-hidden" role="dialog" aria-modal="true">
// // // // // // // //             <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
                
// // // // // // // //                 {/* HEADER */}
// // // // // // // //                 <div className="bg-gray-900 text-white p-5 flex justify-between items-center shrink-0">
// // // // // // // //                     <div><h2 className="text-xl font-bold">{course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2><p className="text-xs text-gray-400 mt-1">Lengkapi data pelatihan.</p></div>
// // // // // // // //                     <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" title="Tutup" aria-label="Tutup"><X size={24}/></button>
// // // // // // // //                 </div>

// // // // // // // //                 <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0">
// // // // // // // //                     {[
// // // // // // // //                         { id: 'info', label: '1. Informasi Dasar', icon: FileText },
// // // // // // // //                         { id: 'media', label: '2. Media & Visual', icon: ImageIcon },
// // // // // // // //                         { id: 'registration', label: '3. Pendaftaran', icon: Users },
// // // // // // // //                         { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award },
// // // // // // // //                         { id: 'team', label: '5. Tim & PIC', icon: Users },
// // // // // // // //                     ].map((tab) => (
// // // // // // // //                         <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap outline-none ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
// // // // // // // //                             <tab.icon size={16} /> {tab.label}
// // // // // // // //                         </button>
// // // // // // // //                     ))}
// // // // // // // //                 </div>

// // // // // // // //                 <form id="courseForm" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    
// // // // // // // //                     {/* TAB 1 */}
// // // // // // // //                     {activeTab === 'info' && (
// // // // // // // //                         <div className="space-y-6 max-w-4xl mx-auto">
// // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // //                                 <div><label htmlFor="courseTitle" className="block text-sm font-bold text-gray-700 mb-1">Judul Pelatihan <span className="text-red-500">*</span></label><input id="courseTitle" required type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: Orientasi Kepalangmerahan" value={formData.title} onChange={e => handleChange('title', e.target.value)} title="Judul Pelatihan" /></div>
// // // // // // // //                                 <div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap</label><div className="bg-white rounded-lg border overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" placeholder="Tulis deskripsi..." /></div></div>
// // // // // // // //                             </div>
// // // // // // // //                             <div className="grid grid-cols-2 gap-6">
// // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
// // // // // // // //                                     <div className="flex items-center gap-2 mb-2"><input type="checkbox" id="regForever" checked={formData.regIsForever} onChange={e => handleChange('regIsForever', e.target.checked)} className="w-4 h-4 text-red-600 rounded" title="Selamanya"/><label htmlFor="regForever" className="text-sm text-gray-600 cursor-pointer">Buka Selamanya (Tanpa Batas Waktu)</label></div>
// // // // // // // //                                     {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai</span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} title="Mulai Pendaftaran" /></div><div><span className="text-xs text-gray-500 block mb-1">Selesai</span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} title="Selesai Pendaftaran" /></div></div>)}
// // // // // // // //                                 </div>
// // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
// // // // // // // //                                     <div className="flex items-center gap-2 mb-2"><input type="checkbox" id="execForever" checked={formData.execIsForever} onChange={e => handleChange('execIsForever', e.target.checked)} className="w-4 h-4 text-red-600 rounded" title="Fleksibel"/><label htmlFor="execForever" className="text-sm text-gray-600 cursor-pointer">Fleksibel (Sesuai Kecepatan Peserta)</label></div>
// // // // // // // //                                     {!formData.execIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai</span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} title="Mulai Pelaksanaan" /></div><div><span className="text-xs text-gray-500 block mb-1">Selesai</span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} title="Selesai Pelaksanaan" /></div></div>)}
// // // // // // // //                                 </div>
// // // // // // // //                             </div>
// // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
// // // // // // // //                                 <div><label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label><div className="flex gap-4"><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="progType" value="training" checked={formData.programType === 'training'} onChange={() => handleChange('programType', 'training')} className="text-red-600" title="Training"/> Diklat Resmi</label><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="progType" value="course" checked={formData.programType === 'course'} onChange={() => handleChange('programType', 'course')} className="text-red-600" title="Course"/> Kursus Mandiri</label></div></div>
// // // // // // // //                                 <div className="w-px bg-gray-200"></div>
// // // // // // // //                                 <div className="flex items-center gap-3"><input type="checkbox" id="hasCert" checked={formData.hasCertificate} onChange={e => handleChange('hasCertificate', e.target.checked)} className="w-5 h-5 text-red-600 rounded" title="Sertifikat"/><label htmlFor="hasCert" className="text-sm font-bold text-gray-700 cursor-pointer">Sertifikat Tersedia?</label></div>
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                     )}

// // // // // // // //                     {/* TAB 2 */}
// // // // // // // //                     {activeTab === 'media' && (
// // // // // // // //                         <div className="max-w-3xl mx-auto space-y-6">
// // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // //                                 <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) <span className="text-red-500">*</span></label>
// // // // // // // //                                 <div className="flex gap-6 items-start">
// // // // // // // //                                     <div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
// // // // // // // //                                         {formData.thumbnailUrl ? <img src={getDisplayUrl(formData.thumbnailUrl)} alt="Preview Cover" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1" /><span className="text-xs">Belum ada gambar</span></div>}
// // // // // // // //                                         {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
// // // // // // // //                                     </div>
// // // // // // // //                                     <div className="flex-1">
// // // // // // // //                                         <p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p>
// // // // // // // //                                         <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" title="Input Gambar"/>
// // // // // // // //                                         <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2" title="Upload Gambar"><Upload size={16}/> Upload Gambar</button>
// // // // // // // //                                     </div>
// // // // // // // //                                 </div>
// // // // // // // //                             </div>
// // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // //                                 <label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label>
// // // // // // // //                                 <div className="flex gap-2"><div className="p-3 bg-gray-100 rounded-l-lg border border-r-0 text-gray-500"><Video size={18}/></div><input type="text" className="flex-1 p-2.5 border rounded-r-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} title="URL Video Youtube" /></div>
// // // // // // // //                                 {formData.promoVideoUrl && formData.promoVideoUrl.includes('youtube') && (
// // // // // // // //                                     <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 aspect-video w-full max-w-sm bg-black">
// // // // // // // //                                         <iframe width="100%" height="100%" src={getYoutubeEmbed(formData.promoVideoUrl)} title="Preview Video" frameBorder="0" allowFullScreen></iframe>
// // // // // // // //                                     </div>
// // // // // // // //                                 )}
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                     )}

// // // // // // // //                     {/* TAB 3 */}
// // // // // // // //                     {activeTab === 'registration' && (
// // // // // // // //                         <div className="max-w-4xl mx-auto space-y-6">
// // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // //                                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan Peserta</h3>
// // // // // // // //                                 <div className="space-y-4">
// // // // // // // //                                     <label className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'auto' ? 'bg-green-50 border-green-200 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
// // // // // // // //                                         <input type="radio" name="regMethod" value="auto" checked={formData.registrationMethod === 'auto'} onChange={() => handleChange('registrationMethod', 'auto')} className="mt-1 w-5 h-5 text-green-600 focus:ring-green-500 accent-green-600" title="Otomatis"/>
// // // // // // // //                                         <div><span className="block font-bold text-gray-800 text-sm mb-1">Otomatis (Langsung Aktif)</span><span className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</span></div>
// // // // // // // //                                     </label>
// // // // // // // //                                     <label className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'manual' ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
// // // // // // // //                                         <input type="radio" name="regMethod" value="manual" checked={formData.registrationMethod === 'manual'} onChange={() => handleChange('registrationMethod', 'manual')} className="mt-1 w-5 h-5 text-yellow-600 focus:ring-yellow-500 accent-yellow-600" title="Manual"/>
// // // // // // // //                                         <div><span className="block font-bold text-gray-800 text-sm mb-1">Manual (Verifikasi Admin)</span><span className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</span></div>
// // // // // // // //                                     </label>
// // // // // // // //                                 </div>
// // // // // // // //                             </div>
// // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // //                                 <div className="flex justify-between items-start mb-4">
// // // // // // // //                                     <div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div>
// // // // // // // //                                     <div className="flex items-center gap-2"><input type="checkbox" id="noDocs" checked={!formData.requireDocs} onChange={(e) => handleChange('requireDocs', !e.target.checked)} className="w-4 h-4 text-red-600 rounded" title="Tidak butuh dokumen"/><label htmlFor="noDocs" className="text-xs font-bold text-gray-700 cursor-pointer">Tidak butuh dokumen</label></div>
// // // // // // // //                                 </div>
// // // // // // // //                                 {formData.requireDocs && (
// // // // // // // //                                     <div className="space-y-3">
// // // // // // // //                                         <div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} title="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50" title="Upload Template">{uploadingTemplate ? 'Mengupload...' : <><Upload size={14}/> Upload Template Baru</>}</button></div>
// // // // // // // //                                         {formData.registrationTemplates.map((item: any, idx: number) => (
// // // // // // // //                                             <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
// // // // // // // //                                                 <div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div>
// // // // // // // //                                                 <div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} title="Nama Dokumen"/>
// // // // // // // //                                                 <a href={getDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()} title="Lihat File"><Download size={10} /> Lihat File Uploaded</a></div>
// // // // // // // //                                                 <button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Hapus Dokumen"><Trash2 size={16} /></button>
// // // // // // // //                                             </div>
// // // // // // // //                                         ))}
// // // // // // // //                                     </div>
// // // // // // // //                                 )}
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                     )}

// // // // // // // //                     {/* TAB 4 */}
// // // // // // // //                     {activeTab === 'facilities' && (
// // // // // // // //                         <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
// // // // // // // //                             <div className="space-y-6">
// // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" title="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div>
// // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.estimatedDuration} disabled title="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.totalJp} disabled title="Total JP"/></div></div></div>
// // // // // // // //                             </div>
// // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas</label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} title="Input Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" title="Tambah Fasilitas"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" title="Hapus Fasilitas"><X size={14}/></button></div>))}</div></div>
// // // // // // // //                         </div>
// // // // // // // //                     )}

// // // // // // // //                     {/* TAB 5 (UPDATED) */}
// // // // // // // //                     {activeTab === 'team' && (
// // // // // // // //                         <div className="max-w-4xl mx-auto space-y-8">
                            
// // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3><div className="relative mb-4"><Search className="absolute left-3 top-2.5 text-gray-400" size={16} /><input type="text" placeholder="Cari nama atau email..." className="w-full pl-9 p-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchFacilitator} onChange={(e) => setSearchFacilitator(e.target.value)} title="Cari Fasilitator"/></div><div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-2 bg-gray-50 rounded-lg border">{filteredFacilitators.map(fac => (<label key={fac._id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.facilitatorIds.includes(fac._id) ? 'bg-red-50 border-red-200 ring-1 ring-red-500' : 'bg-white hover:bg-gray-100'}`}><input type="checkbox" checked={formData.facilitatorIds.includes(fac._id)} onChange={() => toggleFacilitator(fac._id)} className="w-4 h-4 text-red-600 rounded" title={`Pilih ${fac.name}`}/><div className="flex items-center gap-2 overflow-hidden"><div className="w-8 h-8 rounded-full bg-gray-200 shrink-0 overflow-hidden">{fac.avatarUrl ? <img src={getDisplayUrl(fac.avatarUrl)} alt={fac.name} className="w-full h-full object-cover"/> : <div className="flex items-center justify-center h-full font-bold text-xs">{fac.name.charAt(0)}</div>}</div><div className="truncate"><div className="text-xs font-bold truncate">{fac.name}</div><div className="text-[9px] text-gray-500 truncate">{fac.email}</div></div></div></label>))}</div></div>
                            
// // // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // //                                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab & Kontak</h3>
                                
// // // // // // // //                                 <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
// // // // // // // //                                     <div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div>
// // // // // // // //                                     <div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div>
// // // // // // // //                                 </div>

// // // // // // // //                                 <div className="space-y-4">
// // // // // // // //                                     <label className="text-sm font-bold text-gray-700">Daftar PIC Tambahan (Maks 3)</label>
                                    
// // // // // // // //                                     {formData.pics.length < 3 && (
// // // // // // // //                                         <div className="relative">
// // // // // // // //                                             <div className="relative">
// // // // // // // //                                                 <Search className="absolute left-3 top-3 text-gray-400" size={16} />
// // // // // // // //                                                 <input 
// // // // // // // //                                                     type="text" 
// // // // // // // //                                                     placeholder="Cari User untuk jadi PIC..." 
// // // // // // // //                                                     className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
// // // // // // // //                                                     value={searchPic} 
// // // // // // // //                                                     onChange={(e) => setSearchPic(e.target.value)} 
// // // // // // // //                                                     title="Cari PIC"
// // // // // // // //                                                 />
// // // // // // // //                                             </div>
// // // // // // // //                                             {searchPic && (
// // // // // // // //                                                 <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
// // // // // // // //                                                     {filteredPicCandidates.length > 0 ? (
// // // // // // // //                                                         filteredPicCandidates.map(user => (
// // // // // // // //                                                             <button 
// // // // // // // //                                                                 key={user._id} 
// // // // // // // //                                                                 onClick={() => handleAddPicFromSearch(user)}
// // // // // // // //                                                                 className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 transition-colors"
// // // // // // // //                                                                 type="button"
// // // // // // // //                                                             >
// // // // // // // //                                                                 <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
// // // // // // // //                                                                     {user.name.charAt(0)}
// // // // // // // //                                                                 </div>
// // // // // // // //                                                                 <div className="flex-1 overflow-hidden">
// // // // // // // //                                                                     <p className="text-xs font-bold text-gray-800 truncate">{user.name}</p>
// // // // // // // //                                                                     <p className="text-[10px] text-gray-500 truncate">{user.email} - {user.role}</p>
// // // // // // // //                                                                 </div>
// // // // // // // //                                                                 <UserPlus size={14} className="ml-auto text-blue-500"/>
// // // // // // // //                                                             </button>
// // // // // // // //                                                         ))
// // // // // // // //                                                     ) : (
// // // // // // // //                                                         <div className="p-3 text-xs text-gray-400 text-center">User tidak ditemukan.</div>
// // // // // // // //                                                     )}
// // // // // // // //                                                 </div>
// // // // // // // //                                             )}
// // // // // // // //                                         </div>
// // // // // // // //                                     )}

// // // // // // // //                                     <div className="space-y-3">
// // // // // // // //                                         {formData.pics.map((pic: any, idx: number) => (
// // // // // // // //                                             <div key={idx} className="flex gap-4 items-center p-3 rounded-xl border border-gray-200 bg-white animate-in slide-in-from-left-2">
// // // // // // // //                                                 <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-100">
// // // // // // // //                                                     {pic.avatarUrl ? <img src={getDisplayUrl(pic.avatarUrl)} className="w-full h-full rounded-full object-cover" alt={pic.name}/> : pic.name?.charAt(0)}
// // // // // // // //                                                 </div>
// // // // // // // //                                                 <div className="flex-1 overflow-hidden">
// // // // // // // //                                                     <div className="flex items-center gap-2">
// // // // // // // //                                                         <span className="font-bold text-sm text-gray-800 truncate">{pic.name}</span>
// // // // // // // //                                                         <div className="text-green-500 fill-green-100" title="Bisa dichat"><MessageCircle size={14} /></div>
// // // // // // // //                                                     </div>
// // // // // // // //                                                     <div className="text-xs text-gray-500 truncate flex gap-2">
// // // // // // // //                                                         <span className="bg-gray-100 px-1.5 rounded">{pic.pmiStatus}</span> <span>{pic.email}</span>
// // // // // // // //                                                     </div>
// // // // // // // //                                                 </div>
// // // // // // // //                                                 <button type="button" onClick={() => removePic(idx)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus PIC"><Trash2 size={16}/></button>
// // // // // // // //                                             </div>
// // // // // // // //                                         ))}
// // // // // // // //                                         {formData.pics.length === 0 && <p className="text-xs text-gray-400 italic text-center py-2">Belum ada PIC tambahan.</p>}
// // // // // // // //                                     </div>
// // // // // // // //                                 </div>
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                     )}
// // // // // // // //                 </form>

// // // // // // // //                 <div className="bg-white border-t p-4 flex justify-end gap-3 shrink-0">
// // // // // // // //                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50" title="Batal">Batal</button>
// // // // // // // //                     <button onClick={handleSubmit} disabled={loading} className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 shadow-lg flex items-center gap-2 disabled:opacity-50" title="Simpan">
// // // // // // // //                         {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"/> : <Save size={18}/>} Simpan Pelatihan
// // // // // // // //                     </button>
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // }


// // // // // // // 'use client';

// // // // // // // import { useState, useRef, useEffect } from 'react';
// // // // // // // import { 
// // // // // // //     X, Upload, Plus, Trash2, Save, Calendar, 
// // // // // // //     Video, Image as ImageIcon, Users, FileText, 
// // // // // // //     CheckCircle, AlertCircle, Award, Clock, Search, 
// // // // // // //     Download, File, Info, Loader2, MessageCircle, UserPlus 
// // // // // // // } from 'lucide-react';
// // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // import dynamic from 'next/dynamic';
// // // // // // // import 'react-quill/dist/quill.snow.css';
// // // // // // // import axios from 'axios'; 

// // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // //     ssr: false,
// // // // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // // // });

// // // // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // // // interface CourseFormModalProps {
// // // // // // //     course?: any; 
// // // // // // //     onClose: () => void;
// // // // // // //     onSuccess: () => void;
// // // // // // //     facilitators: any[]; 
// // // // // // //     currentUser: any; 
// // // // // // // }

// // // // // // // export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
// // // // // // //     const [activeTab, setActiveTab] = useState('info');
// // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // //     const [fetchingDetail, setFetchingDetail] = useState(false);
    
// // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null); 
// // // // // // //     const templateInputRef = useRef<HTMLInputElement>(null); 
    
// // // // // // //     // State Search untuk Fasilitator (Tab 5 Part A)
// // // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
    
// // // // // // //     // State untuk PIC Manual (Tab 5 Part B)
// // // // // // //     const [newPic, setNewPic] = useState({ name: '', email: '', pmiStatus: '' });

// // // // // // //     // --- INITIAL STATE ---
// // // // // // //     const defaultState = {
// // // // // // //         title: '',
// // // // // // //         description: '', 
// // // // // // //         programType: 'training', 
// // // // // // //         hasCertificate: true,
// // // // // // //         regIsForever: false,
// // // // // // //         regStartDate: '',
// // // // // // //         regEndDate: '',
// // // // // // //         execIsForever: false,
// // // // // // //         execStartDate: '',
// // // // // // //         execEndDate: '',
// // // // // // //         thumbnailUrl: '',
// // // // // // //         promoVideoUrl: '',
// // // // // // //         registrationMethod: 'auto', 
// // // // // // //         requireDocs: true, 
// // // // // // //         registrationTemplates: [] as any[], 
// // // // // // //         price: 0,
// // // // // // //         estimatedDuration: 0, 
// // // // // // //         totalJp: 0, 
// // // // // // //         facilities: [] as string[], 
// // // // // // //         facilitatorIds: [] as string[],
// // // // // // //         pics: [] as any[], 
// // // // // // //         creatorInfo: null as any
// // // // // // //     };

// // // // // // //     const [formData, setFormData] = useState(defaultState);

// // // // // // //     // State UI Tambahan
// // // // // // //     const [newFacility, setNewFacility] = useState('');
// // // // // // //     const [uploadingCover, setUploadingCover] = useState(false);
// // // // // // //     const [uploadingTemplate, setUploadingTemplate] = useState(false);

// // // // // // //     // Helper URL
// // // // // // //     const getDisplayUrl = (url: string) => {
// // // // // // //         if (!url) return '';
// // // // // // //         if (url.startsWith('http')) return url;
// // // // // // //         const cleanPath = url.startsWith('/') ? url : `/${url}`;
// // // // // // //         return `${API_BASE_URL}${cleanPath}`;
// // // // // // //     };

// // // // // // //     const getYoutubeEmbed = (url: string) => {
// // // // // // //         try {
// // // // // // //             if (!url) return '';
// // // // // // //             if (url.includes('embed')) return url;
// // // // // // //             const videoId = url.split('v=')[1]?.split('&')[0];
// // // // // // //             if (videoId) return `https://www.youtube.com/embed/${videoId}`;
// // // // // // //             if (url.includes('youtu.be')) return `https://www.youtube.com/embed/${url.split('/').pop()}`;
// // // // // // //             return url;
// // // // // // //         } catch { return url; }
// // // // // // //     };

// // // // // // //     // --- FETCH DATA ---
// // // // // // //     useEffect(() => {
// // // // // // //         const initData = async () => {
// // // // // // //             if (course && course._id) {
// // // // // // //                 setFetchingDetail(true);
// // // // // // //                 try {
// // // // // // //                     const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
// // // // // // //                     const fullData = res.course || res.data || res;
// // // // // // //                     populateForm(fullData);
// // // // // // //                 } catch (e) {
// // // // // // //                     console.error("Gagal fetch detail, pakai fallback:", e);
// // // // // // //                     populateForm(course);
// // // // // // //                 } finally {
// // // // // // //                     setFetchingDetail(false);
// // // // // // //                 }
// // // // // // //             } else {
// // // // // // //                 setFormData(defaultState);
// // // // // // //             }
// // // // // // //         };
// // // // // // //         initData();
// // // // // // //     }, [course]);

// // // // // // //     const populateForm = (data: any) => {
// // // // // // //         const formatDate = (d: string) => {
// // // // // // //             if (!d) return '';
// // // // // // //             try { return new Date(d).toISOString().split('T')[0]; } catch (e) { return ''; }
// // // // // // //         };

// // // // // // //         setFormData({
// // // // // // //             title: data.title || '',
// // // // // // //             description: data.description || '',
// // // // // // //             programType: data.programType || 'training',
// // // // // // //             hasCertificate: data.hasCertificate ?? true,
            
// // // // // // //             regIsForever: data.registrationPeriod?.isForever ?? false,
// // // // // // //             regStartDate: formatDate(data.registrationPeriod?.startDate),
// // // // // // //             regEndDate: formatDate(data.registrationPeriod?.endDate),

// // // // // // //             execIsForever: data.executionPeriod?.isForever ?? false,
// // // // // // //             execStartDate: formatDate(data.executionPeriod?.startDate),
// // // // // // //             execEndDate: formatDate(data.executionPeriod?.endDate),

// // // // // // //             thumbnailUrl: data.thumbnailUrl || '',
// // // // // // //             promoVideoUrl: data.promoVideoUrl || '',

// // // // // // //             registrationMethod: data.registrationMethod || 'auto',
            
// // // // // // //             requireDocs: data.registrationConfig?.requireDocs !== false,
// // // // // // //             registrationTemplates: Array.isArray(data.registrationConfig?.templates) ? data.registrationConfig.templates : [],

// // // // // // //             price: Number(data.price) || 0,
// // // // // // //             estimatedDuration: Number(data.estimatedDuration) || 0,
// // // // // // //             totalJp: Number(data.totalJp) || 0,
            
// // // // // // //             facilities: Array.isArray(data.facilities) ? data.facilities : [],
// // // // // // //             facilitatorIds: Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [],
// // // // // // //             pics: Array.isArray(data.pics) ? data.pics : [],
// // // // // // //             creatorInfo: data.creatorInfo || null
// // // // // // //         });
// // // // // // //     }

// // // // // // //     // --- HANDLERS DASAR ---
// // // // // // //     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
// // // // // // //     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
// // // // // // //     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };
    
// // // // // // //     // --- HANDLER FASILITATOR (SEARCH & SELECT) ---
// // // // // // //     const toggleFacilitator = (id: string) => {
// // // // // // //         const current = formData.facilitatorIds;
// // // // // // //         setFormData(prev => ({ ...prev, facilitatorIds: current.includes(id) ? current.filter(fid => fid !== id) : [...current, id] }));
// // // // // // //     };

// // // // // // //     // --- HANDLER PIC (MANUAL ADD/REMOVE) ---
// // // // // // //     // [FIX] Fungsi ini dikembalikan agar tidak error
// // // // // // //     const addPic = () => {
// // // // // // //         if (!newPic.name || !newPic.email) return alert("Nama dan Email PIC wajib diisi");
// // // // // // //         setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
// // // // // // //         setNewPic({ name: '', email: '', pmiStatus: '' });
// // // // // // //     };

// // // // // // //     const updatePic = (idx: number, field: string, val: string) => {
// // // // // // //         const newPics = [...formData.pics];
// // // // // // //         newPics[idx] = { ...newPics[idx], [field]: val };
// // // // // // //         setFormData(prev => ({ ...prev, pics: newPics }));
// // // // // // //     };

// // // // // // //     const removePic = (idx: number) => { 
// // // // // // //         setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); 
// // // // // // //     };

// // // // // // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // // // //         try {
// // // // // // //             setUploadingCover(true); const fd = new FormData(); fd.append('file', file);
// // // // // // //             const res = await apiUpload('/api/upload', fd); 
// // // // // // //             const url = res.url || res.file?.url || res.data?.url;
// // // // // // //             if (url) handleChange('thumbnailUrl', url);
// // // // // // //         } catch (err: any) { alert('Gagal: ' + err.message); } finally { setUploadingCover(false); }
// // // // // // //     };

// // // // // // //     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // // // //         setUploadingTemplate(true);
// // // // // // //         try {
// // // // // // //             const fd = new FormData(); fd.append('file', file);
// // // // // // //             const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
// // // // // // //             const token = userStr ? JSON.parse(userStr).token : '';

// // // // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { 
// // // // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
// // // // // // //                 withCredentials: true 
// // // // // // //             });
            
// // // // // // //             const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url;
// // // // // // //             if (!rawUrl) throw new Error("Gagal dapat URL.");

// // // // // // //             setFormData(prev => ({
// // // // // // //                 ...prev,
// // // // // // //                 registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }]
// // // // // // //             }));
// // // // // // //         } catch (err: any) {
// // // // // // //             console.error(err);
// // // // // // //             alert('Upload Gagal: ' + (err.response?.data?.message || err.message));
// // // // // // //         } finally {
// // // // // // //             setUploadingTemplate(false);
// // // // // // //             if (templateInputRef.current) templateInputRef.current.value = '';
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const removeTemplate = (idx: number) => {
// // // // // // //         if(!confirm("Hapus dokumen ini?")) return;
// // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) }));
// // // // // // //     };

// // // // // // //     const updateTemplateTitle = (idx: number, v: string) => {
// // // // // // //         const t = [...formData.registrationTemplates]; t[idx].title = v;
// // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: t }));
// // // // // // //     };

// // // // // // //     // --- SUBMIT ---
// // // // // // //     const handleSubmit = async (e: React.FormEvent) => {
// // // // // // //         e.preventDefault();
// // // // // // //         if (!formData.title) return alert("Judul wajib diisi!");

// // // // // // //         setLoading(true);
// // // // // // //         try {
// // // // // // //             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
// // // // // // //             const parseDate = (d: string) => d ? new Date(d) : null;

// // // // // // //             const payload = {
// // // // // // //                 title: formData.title,
// // // // // // //                 description: formData.description,
// // // // // // //                 programType: formData.programType,
// // // // // // //                 hasCertificate: formData.hasCertificate,
// // // // // // //                 price: Number(formData.price),
// // // // // // //                 estimatedDuration: Number(formData.estimatedDuration),
// // // // // // //                 totalJp: Number(formData.totalJp),
// // // // // // //                 thumbnailUrl: formData.thumbnailUrl,
// // // // // // //                 promoVideoUrl: formData.promoVideoUrl,
                
// // // // // // //                 registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
// // // // // // //                 executionPeriod: { isForever: formData.execIsForever, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
// // // // // // //                 registrationMethod: formData.registrationMethod,
// // // // // // //                 registrationConfig: { requireDocs: formData.requireDocs, templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) },
// // // // // // //                 facilities: formData.facilities,
// // // // // // //                 facilitatorIds: formData.facilitatorIds,
// // // // // // //                 pics: validPics,
// // // // // // //                 creatorInfo: formData.creatorInfo || {
// // // // // // //                     name: currentUser?.name || 'Admin',
// // // // // // //                     email: currentUser?.email || '-',
// // // // // // //                     contact: currentUser?.phoneNumber || '-' 
// // // // // // //                 }
// // // // // // //             };

// // // // // // //             let res;
// // // // // // //             if (course?._id) res = await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
// // // // // // //             else res = await api('/api/courses', { method: 'POST', body: payload });

// // // // // // //             if(res && (res.course || res.data)) populateForm(res.course || res.data);
// // // // // // //             alert("Berhasil disimpan!");
// // // // // // //             onSuccess();
// // // // // // //         } catch (err: any) {
// // // // // // //             console.error(err);
// // // // // // //             alert("Gagal: " + (err.response?.data?.message || err.message));
// // // // // // //         } finally {
// // // // // // //             setLoading(false);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     // Filter Logic untuk Tab 5 (Fasilitator Search)
// // // // // // //     const selectedFacilitators = facilitators.filter(f => formData.facilitatorIds.includes(f.id || f._id));
// // // // // // //     const availableFacilitators = facilitators.filter(f => 
// // // // // // //         !formData.facilitatorIds.includes(f.id || f._id) && 
// // // // // // //         (f.name?.toLowerCase().includes(searchFacilitator.toLowerCase()) || f.email?.toLowerCase().includes(searchFacilitator.toLowerCase()))
// // // // // // //     );

// // // // // // //     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><div className="bg-white p-5 rounded-lg flex items-center gap-3"><Loader2 className="animate-spin text-red-600"/> Memuat data...</div></div>;

// // // // // // //     return (
// // // // // // //         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-hidden" role="dialog" aria-modal="true">
// // // // // // //             <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
                
// // // // // // //                 {/* HEADER */}
// // // // // // //                 <div className="bg-gray-900 text-white p-5 flex justify-between items-center shrink-0">
// // // // // // //                     <div><h2 className="text-xl font-bold">{course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2><p className="text-xs text-gray-400 mt-1">Lengkapi data pelatihan.</p></div>
// // // // // // //                     <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" title="Tutup" aria-label="Tutup"><X size={24}/></button>
// // // // // // //                 </div>

// // // // // // //                 <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0">
// // // // // // //                     {[
// // // // // // //                         { id: 'info', label: '1. Informasi Dasar', icon: FileText },
// // // // // // //                         { id: 'media', label: '2. Media & Visual', icon: ImageIcon },
// // // // // // //                         { id: 'registration', label: '3. Pendaftaran', icon: Users },
// // // // // // //                         { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award },
// // // // // // //                         { id: 'team', label: '5. Tim & PIC', icon: Users },
// // // // // // //                     ].map((tab) => (
// // // // // // //                         <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap outline-none ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
// // // // // // //                             <tab.icon size={16} /> {tab.label}
// // // // // // //                         </button>
// // // // // // //                     ))}
// // // // // // //                 </div>

// // // // // // //                 <form id="courseForm" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    
// // // // // // //                     {/* TAB 1: INFO (FIX: Custom Radio Buttons agar tidak ada kotak biru) */}
// // // // // // //                     {activeTab === 'info' && (
// // // // // // //                         <div className="space-y-6 max-w-4xl mx-auto">
// // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // //                                 <div><label htmlFor="courseTitle" className="block text-sm font-bold text-gray-700 mb-1">Judul Pelatihan <span className="text-red-500">*</span></label><input id="courseTitle" required type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: Orientasi Kepalangmerahan" value={formData.title} onChange={e => handleChange('title', e.target.value)} title="Judul Pelatihan" /></div>
// // // // // // //                                 <div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap</label><div className="bg-white rounded-lg border overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" placeholder="Tulis deskripsi..." /></div></div>
// // // // // // //                             </div>

// // // // // // //                             <div className="grid grid-cols-2 gap-6">
// // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
// // // // // // //                                     <div className="flex items-center gap-2 mb-2">
// // // // // // //                                         <div onClick={() => handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // // // //                                             <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>
// // // // // // //                                                 {formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}
// // // // // // //                                             </div>
// // // // // // //                                             <span className="text-sm text-gray-600">Buka Selamanya (Tanpa Batas Waktu)</span>
// // // // // // //                                         </div>
// // // // // // //                                     </div>
// // // // // // //                                     {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai</span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} title="Mulai Pendaftaran" /></div><div><span className="text-xs text-gray-500 block mb-1">Selesai</span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} title="Selesai Pendaftaran" /></div></div>)}
// // // // // // //                                 </div>
// // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
// // // // // // //                                     <div className="flex items-center gap-2 mb-2">
// // // // // // //                                         <div onClick={() => handleChange('execIsForever', !formData.execIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // // // //                                             <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>
// // // // // // //                                                 {formData.execIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}
// // // // // // //                                             </div>
// // // // // // //                                             <span className="text-sm text-gray-600">Fleksibel (Sesuai Kecepatan Peserta)</span>
// // // // // // //                                         </div>
// // // // // // //                                     </div>
// // // // // // //                                     {!formData.execIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai</span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} title="Mulai Pelaksanaan" /></div><div><span className="text-xs text-gray-500 block mb-1">Selesai</span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} title="Selesai Pelaksanaan" /></div></div>)}
// // // // // // //                                 </div>
// // // // // // //                             </div>

// // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
// // // // // // //                                 <div>
// // // // // // //                                     <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label>
// // // // // // //                                     <div className="flex gap-4">
// // // // // // //                                         {/* Custom Radio Button - No Native Input to avoid blue box */}
// // // // // // //                                         <div onClick={() => handleChange('programType', 'training')} className={`flex items-center gap-2 cursor-pointer select-none px-3 py-2 rounded-lg border ${formData.programType === 'training' ? 'bg-red-50 border-red-200' : 'border-transparent'}`}>
// // // // // // //                                             <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'training' ? 'border-red-600' : 'border-gray-400'}`}>
// // // // // // //                                                 {formData.programType === 'training' && <div className="w-2 h-2 bg-red-600 rounded-full"></div>}
// // // // // // //                                             </div>
// // // // // // //                                             <span className="text-sm text-gray-700">Diklat Resmi</span>
// // // // // // //                                         </div>
// // // // // // //                                         <div onClick={() => handleChange('programType', 'course')} className={`flex items-center gap-2 cursor-pointer select-none px-3 py-2 rounded-lg border ${formData.programType === 'course' ? 'bg-red-50 border-red-200' : 'border-transparent'}`}>
// // // // // // //                                             <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'course' ? 'border-red-600' : 'border-gray-400'}`}>
// // // // // // //                                                 {formData.programType === 'course' && <div className="w-2 h-2 bg-red-600 rounded-full"></div>}
// // // // // // //                                             </div>
// // // // // // //                                             <span className="text-sm text-gray-700">Kursus Mandiri</span>
// // // // // // //                                         </div>
// // // // // // //                                     </div>
// // // // // // //                                 </div>
// // // // // // //                                 <div className="w-px bg-gray-200"></div>
// // // // // // //                                 <div className="flex items-center gap-3">
// // // // // // //                                     <div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // // // //                                         <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>
// // // // // // //                                             {formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}
// // // // // // //                                         </div>
// // // // // // //                                         <span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span>
// // // // // // //                                     </div>
// // // // // // //                                 </div>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     )}

// // // // // // //                     {/* TAB 2: MEDIA */}
// // // // // // //                     {activeTab === 'media' && (
// // // // // // //                         <div className="max-w-3xl mx-auto space-y-6">
// // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // //                                 <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) <span className="text-red-500">*</span></label>
// // // // // // //                                 <div className="flex gap-6 items-start">
// // // // // // //                                     <div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
// // // // // // //                                         {formData.thumbnailUrl ? <img src={getDisplayUrl(formData.thumbnailUrl)} alt="Preview Cover" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1" /><span className="text-xs">Belum ada gambar</span></div>}
// // // // // // //                                         {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
// // // // // // //                                     </div>
// // // // // // //                                     <div className="flex-1">
// // // // // // //                                         <p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p>
// // // // // // //                                         <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" title="Input Gambar"/>
// // // // // // //                                         <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2" title="Upload Gambar"><Upload size={16}/> Upload Gambar</button>
// // // // // // //                                     </div>
// // // // // // //                                 </div>
// // // // // // //                             </div>
// // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // //                                 <label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label>
// // // // // // //                                 <div className="flex gap-2"><div className="p-3 bg-gray-100 rounded-l-lg border border-r-0 text-gray-500"><Video size={18}/></div><input type="text" className="flex-1 p-2.5 border rounded-r-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} title="URL Video Youtube" /></div>
// // // // // // //                                 {formData.promoVideoUrl && formData.promoVideoUrl.includes('youtube') && (
// // // // // // //                                     <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 aspect-video w-full max-w-sm bg-black">
// // // // // // //                                         <iframe width="100%" height="100%" src={getYoutubeEmbed(formData.promoVideoUrl)} title="Preview Video" frameBorder="0" allowFullScreen></iframe>
// // // // // // //                                     </div>
// // // // // // //                                 )}
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     )}

// // // // // // //                     {/* TAB 3: PENDAFTARAN */}
// // // // // // //                     {activeTab === 'registration' && (
// // // // // // //                         <div className="max-w-4xl mx-auto space-y-6">
// // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // //                                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan Peserta</h3>
// // // // // // //                                 <div className="space-y-4">
// // // // // // //                                     {/* Custom Radio Button */}
// // // // // // //                                     <div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'auto' ? 'bg-green-50 border-green-200 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
// // // // // // //                                         <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'auto' ? 'border-green-600' : 'border-gray-400'}`}>
// // // // // // //                                             {formData.registrationMethod === 'auto' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}
// // // // // // //                                         </div>
// // // // // // //                                         <div><span className="block font-bold text-gray-800 text-sm mb-1">Otomatis (Langsung Aktif)</span><span className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</span></div>
// // // // // // //                                     </div>
// // // // // // //                                     <div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'manual' ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
// // // // // // //                                         <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'manual' ? 'border-yellow-600' : 'border-gray-400'}`}>
// // // // // // //                                             {formData.registrationMethod === 'manual' && <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full"></div>}
// // // // // // //                                         </div>
// // // // // // //                                         <div><span className="block font-bold text-gray-800 text-sm mb-1">Manual (Verifikasi Admin)</span><span className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</span></div>
// // // // // // //                                     </div>
// // // // // // //                                 </div>
// // // // // // //                             </div>

// // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // //                                 <div className="flex justify-between items-start mb-4">
// // // // // // //                                     <div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div>
// // // // // // //                                     <div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer">
// // // // // // //                                         <div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>
// // // // // // //                                             {!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}
// // // // // // //                                         </div>
// // // // // // //                                         <span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span>
// // // // // // //                                     </div>
// // // // // // //                                 </div>

// // // // // // //                                 {formData.requireDocs && (
// // // // // // //                                     <div className="space-y-3">
// // // // // // //                                         <div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} title="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50" title="Upload Template">{uploadingTemplate ? 'Mengupload...' : <><Upload size={14}/> Upload Template Baru</>}</button></div>
// // // // // // //                                         {formData.registrationTemplates.length === 0 ? <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">Belum ada dokumen.</div> : formData.registrationTemplates.map((item: any, idx: number) => (
// // // // // // //                                             <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
// // // // // // //                                                 <div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div>
// // // // // // //                                                 <div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} title="Nama Dokumen"/>
// // // // // // //                                                 <a href={getDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()} title="Lihat File"><Download size={10} /> Lihat File Uploaded</a></div>
// // // // // // //                                                 <button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Hapus Dokumen"><Trash2 size={16} /></button>
// // // // // // //                                             </div>
// // // // // // //                                         ))}
// // // // // // //                                     </div>
// // // // // // //                                 )}
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     )}

// // // // // // //                     {/* TAB 4 */}
// // // // // // //                     {activeTab === 'facilities' && (
// // // // // // //                         <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
// // // // // // //                             <div className="space-y-6">
// // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" title="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div>
// // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.estimatedDuration} disabled title="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.totalJp} disabled title="Total JP"/></div></div></div>
// // // // // // //                             </div>
// // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas</label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} title="Input Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" title="Tambah Fasilitas"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" title="Hapus Fasilitas"><X size={14}/></button></div>))}</div></div>
// // // // // // //                         </div>
// // // // // // //                     )}

// // // // // // //                     {/* TAB 5: TIM & PIC - [PERBAIKAN UTAMA DISINI] */}
// // // // // // //                     {activeTab === 'team' && (
// // // // // // //                         <div className="max-w-4xl mx-auto space-y-8">
                            
// // // // // // //                             {/* A. PILIH TIM FASILITATOR (SEARCH & SELECT) */}
// // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // //                                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
                                
// // // // // // //                                 {/* 1. List Fasilitator Terpilih (Diatas) */}
// // // // // // //                                 <div className="mb-6">
// // // // // // //                                     <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Fasilitator Terpilih ({selectedFacilitators.length})</label>
// // // // // // //                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// // // // // // //                                         {selectedFacilitators.map(fac => (
// // // // // // //                                             <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100 shadow-sm animate-in fade-in slide-in-from-left-2">
// // // // // // //                                                 <div className="flex items-center gap-3 overflow-hidden">
// // // // // // //                                                     <div className="w-8 h-8 rounded-full bg-white border border-red-200 flex items-center justify-center font-bold text-xs text-red-600">
// // // // // // //                                                         {fac.name?.charAt(0)}
// // // // // // //                                                     </div>
// // // // // // //                                                     <div className="truncate">
// // // // // // //                                                         <p className="text-sm font-bold text-gray-800 truncate">{fac.name}</p>
// // // // // // //                                                         <p className="text-[10px] text-gray-500 truncate">{fac.email}</p>
// // // // // // //                                                     </div>
// // // // // // //                                                 </div>
// // // // // // //                                                 <button type="button" onClick={() => toggleFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-100 transition-colors shadow-sm" title="Hapus">
// // // // // // //                                                     <X size={14}/>
// // // // // // //                                                 </button>
// // // // // // //                                             </div>
// // // // // // //                                         ))}
// // // // // // //                                         {selectedFacilitators.length === 0 && (
// // // // // // //                                             <div className="col-span-2 text-center py-6 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">
// // // // // // //                                                 Belum ada fasilitator dipilih. Gunakan pencarian di bawah.
// // // // // // //                                             </div>
// // // // // // //                                         )}
// // // // // // //                                     </div>
// // // // // // //                                 </div>

// // // // // // //                                 {/* 2. Search & Add (Dibawah) */}
// // // // // // //                                 <div className="relative">
// // // // // // //                                     <div className="relative">
// // // // // // //                                         <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // // // // //                                         <input 
// // // // // // //                                             type="text" 
// // // // // // //                                             placeholder="Cari nama atau email fasilitator untuk ditambahkan..." 
// // // // // // //                                             className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" 
// // // // // // //                                             value={searchFacilitator} 
// // // // // // //                                             onChange={(e) => setSearchFacilitator(e.target.value)} 
// // // // // // //                                             title="Cari Fasilitator"
// // // // // // //                                         />
// // // // // // //                                     </div>
                                    
// // // // // // //                                     {/* Dropdown Hasil Pencarian */}
// // // // // // //                                     {searchFacilitator && (
// // // // // // //                                         <div className="mt-2 border rounded-xl overflow-hidden shadow-lg bg-white max-h-60 overflow-y-auto">
// // // // // // //                                             {availableFacilitators.length === 0 ? (
// // // // // // //                                                 <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan fasilitator dengan nama tersebut.</div>
// // // // // // //                                             ) : (
// // // // // // //                                                 availableFacilitators.map(fac => (
// // // // // // //                                                     <button 
// // // // // // //                                                         key={fac._id || fac.id} 
// // // // // // //                                                         type="button"
// // // // // // //                                                         onClick={() => { toggleFacilitator(fac._id || fac.id); setSearchFacilitator(''); }}
// // // // // // //                                                         className="flex items-center justify-between w-full p-3 hover:bg-gray-50 border-b last:border-0 text-left transition-colors group"
// // // // // // //                                                     >
// // // // // // //                                                         <div className="flex items-center gap-3 overflow-hidden">
// // // // // // //                                                             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600">
// // // // // // //                                                                 {fac.name?.charAt(0)}
// // // // // // //                                                             </div>
// // // // // // //                                                             <div className="truncate">
// // // // // // //                                                                 <p className="text-sm font-bold text-gray-700 group-hover:text-blue-700">{fac.name}</p>
// // // // // // //                                                                 <p className="text-[10px] text-gray-400">{fac.email}</p>
// // // // // // //                                                             </div>
// // // // // // //                                                         </div>
// // // // // // //                                                         <div className="text-gray-400 group-hover:text-blue-600"><Plus size={16}/></div>
// // // // // // //                                                     </button>
// // // // // // //                                                 ))
// // // // // // //                                             )}
// // // // // // //                                         </div>
// // // // // // //                                     )}
// // // // // // //                                 </div>
// // // // // // //                             </div>
                            
// // // // // // //                             {/* Bagian PIC (Penanggung Jawab) - MANUAL ADDITION RESTORED */}
// // // // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // //                                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab & Kontak</h3>
                                
// // // // // // //                                 <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
// // // // // // //                                     <div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div>
// // // // // // //                                     <div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div>
// // // // // // //                                 </div>

// // // // // // //                                 <div className="space-y-4">
// // // // // // //                                     <div className="flex justify-between items-center"><label className="text-sm font-bold text-gray-700">Daftar PIC Tambahan (Maks 3)</label><button type="button" onClick={addPic} className="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 font-bold flex items-center gap-1" title="Tambah PIC"><Plus size={12}/> Tambah PIC</button></div>
                                    
// // // // // // //                                     {/* Manual PIC List */}
// // // // // // //                                     {formData.pics.map((pic: any, idx: number) => (
// // // // // // //                                         <div key={idx} className="flex gap-3 items-start animate-in slide-in-from-left-2">
// // // // // // //                                             <div className="flex-1 grid grid-cols-3 gap-3">
// // // // // // //                                                 <input placeholder="Nama Lengkap" className="p-2 border rounded text-sm" value={pic.name} onChange={e => updatePic(idx, 'name', e.target.value)} title="Nama PIC"/>
// // // // // // //                                                 <input placeholder="Status di PMI" className="p-2 border rounded text-sm" value={pic.pmiStatus} onChange={e => updatePic(idx, 'pmiStatus', e.target.value)} title="Status PIC"/>
// // // // // // //                                                 <input placeholder="Email Kontak" className="p-2 border rounded text-sm" value={pic.email} onChange={e => updatePic(idx, 'email', e.target.value)} title="Email PIC"/>
// // // // // // //                                             </div>
// // // // // // //                                             <button type="button" onClick={() => removePic(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded" title="Hapus PIC"><Trash2 size={16}/></button>
// // // // // // //                                         </div>
// // // // // // //                                     ))}
// // // // // // //                                     {formData.pics.length === 0 && <p className="text-xs text-gray-400 italic text-center py-2">Belum ada PIC tambahan.</p>}
// // // // // // //                                 </div>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     )}
// // // // // // //                 </form>

// // // // // // //                 <div className="bg-white border-t p-4 flex justify-end gap-3 shrink-0">
// // // // // // //                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50" title="Batal">Batal</button>
// // // // // // //                     <button onClick={handleSubmit} disabled={loading} className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 shadow-lg flex items-center gap-2 disabled:opacity-50" title="Simpan">
// // // // // // //                         {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"/> : <Save size={18}/>} Simpan Pelatihan
// // // // // // //                     </button>
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // }


// // // // // 'use client';

// // // // // import { useState, useRef, useEffect } from 'react';
// // // // // import { 
// // // // //     X, Upload, Plus, Trash2, Save, Calendar, 
// // // // //     Video, Image as ImageIcon, Users, FileText, 
// // // // //     CheckCircle, AlertCircle, Award, Clock, Search, 
// // // // //     Download, File, Info, Loader2, MessageCircle, UserPlus, 
// // // // //     ShieldCheck, CheckSquare, Building
// // // // // } from 'lucide-react';
// // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // import dynamic from 'next/dynamic';
// // // // // import 'react-quill/dist/quill.snow.css';
// // // // // import axios from 'axios'; 

// // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // //     ssr: false,
// // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // });

// // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // interface CourseFormModalProps {
// // // // //     course?: any; 
// // // // //     onClose: () => void;
// // // // //     onSuccess: () => void;
// // // // //     facilitators: any[]; 
// // // // //     currentUser: any; 
// // // // // }

// // // // // export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
// // // // //     const [activeTab, setActiveTab] = useState('info');
// // // // //     const [loading, setLoading] = useState(false);
// // // // //     const [fetchingDetail, setFetchingDetail] = useState(false);
    
// // // // //     const fileInputRef = useRef<HTMLInputElement>(null); 
// // // // //     const templateInputRef = useRef<HTMLInputElement>(null); 
    
// // // // //     // State Search
// // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
// // // // //     const [searchPic, setSearchPic] = useState('');
// // // // //     const [allUsers, setAllUsers] = useState<any[]>([]);
// // // // //     const [isAgreed, setIsAgreed] = useState(false); 

// // // // //     // State UI Tambahan
// // // // //     const [newFacility, setNewFacility] = useState('');
// // // // //     const [uploadingCover, setUploadingCover] = useState(false);
// // // // //     const [uploadingTemplate, setUploadingTemplate] = useState(false);

// // // // //     // State Pelaksana
// // // // //     const [organizerType, setOrganizerType] = useState('PMI Pusat');
// // // // //     const [organizerName, setOrganizerName] = useState('');

// // // // //     // --- INITIAL STATE LENGKAP ---
// // // // //     const [formData, setFormData] = useState({
// // // // //         title: '',
// // // // //         description: '', 
// // // // //         programType: 'training', 
// // // // //         hasCertificate: true,
        
// // // // //         regIsForever: false,
// // // // //         regStartDate: '',
// // // // //         regEndDate: '',
        
// // // // //         execIsFlexible: true,
// // // // //         execStartDate: '',
// // // // //         execEndDate: '',
        
// // // // //         thumbnailUrl: '',
// // // // //         promoVideoUrl: '',
        
// // // // //         registrationMethod: 'auto', 
// // // // //         requireDocs: true, 
// // // // //         registrationTemplates: [] as any[], 
        
// // // // //         price: 0,
// // // // //         estimatedDuration: 0, 
// // // // //         totalJp: 0, 
        
// // // // //         facilities: [] as string[], 
// // // // //         facilitatorIds: [] as string[],
// // // // //         pics: [] as any[], 
        
// // // // //         creatorInfo: null as any,
// // // // //         contactName: '',
// // // // //         contactPhone: '',
// // // // //         contactEmail: ''
// // // // //     });

// // // // //     // Helper URL
// // // // //     const getDisplayUrl = (url: string) => {
// // // // //         if (!url) return '';
// // // // //         if (url.startsWith('http')) return url;
// // // // //         const cleanPath = url.startsWith('/') ? url : `/${url}`;
// // // // //         return `${API_BASE_URL}${cleanPath}`;
// // // // //     };

// // // // //     const getYoutubeEmbed = (url: string) => {
// // // // //         try {
// // // // //             if (!url) return '';
// // // // //             if (url.includes('embed')) return url;
// // // // //             const videoId = url.split('v=')[1]?.split('&')[0];
// // // // //             if (videoId) return `https://www.youtube.com/embed/${videoId}`;
// // // // //             if (url.includes('youtu.be')) return `https://www.youtube.com/embed/${url.split('/').pop()}`;
// // // // //             return url;
// // // // //         } catch { return url; }
// // // // //     };

// // // // //     // --- FETCH DATA ---
// // // // //     useEffect(() => {
// // // // //         const initData = async () => {
// // // // //             if (course && course._id) {
// // // // //                 setFetchingDetail(true);
// // // // //                 try {
// // // // //                     const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
// // // // //                     const fullData = res.course || res.data || res;
// // // // //                     populateForm(fullData);
// // // // //                 } catch (e) {
// // // // //                     console.error("Gagal fetch detail, pakai fallback:", e);
// // // // //                     populateForm(course);
// // // // //                 } finally {
// // // // //                     setFetchingDetail(false);
// // // // //                 }
// // // // //             } else {
// // // // //                 // Default Creator Info
// // // // //                 if (currentUser) {
// // // // //                      setFormData(prev => ({
// // // // //                         ...prev,
// // // // //                         contactName: currentUser.name,
// // // // //                         contactEmail: currentUser.email,
// // // // //                         contactPhone: currentUser.phoneNumber || ''
// // // // //                      }));
// // // // //                 }
// // // // //             }
// // // // //         };
// // // // //         initData();
// // // // //     }, [course]);

// // // // //     // FETCH ALL USERS
// // // // //     useEffect(() => {
// // // // //         const fetchAllUsers = async () => {
// // // // //             try {
// // // // //                 const res = await api('/api/users'); 
// // // // //                 const users = res.users || res.data || [];
// // // // //                 setAllUsers(users);
// // // // //             } catch (err) {
// // // // //                 console.error("Gagal load users:", err);
// // // // //                 setAllUsers(facilitators);
// // // // //             }
// // // // //         };
// // // // //         fetchAllUsers();
// // // // //     }, []);

// // // // //     const populateForm = (data: any) => {
// // // // //         const formatDate = (d: string) => {
// // // // //             if (!d) return '';
// // // // //             try { return new Date(d).toISOString().split('T')[0]; } catch (e) { return ''; }
// // // // //         };

// // // // //         setFormData({
// // // // //             title: data.title || '',
// // // // //             description: data.description || '',
// // // // //             programType: data.programType || 'training',
// // // // //             hasCertificate: data.hasCertificate ?? true,
            
// // // // //             regIsForever: data.registrationPeriod?.isForever ?? false,
// // // // //             regStartDate: formatDate(data.registrationPeriod?.startDate),
// // // // //             regEndDate: formatDate(data.registrationPeriod?.endDate),

// // // // //             execIsFlexible: data.executionPeriod?.isForever ?? false,
// // // // //             execStartDate: formatDate(data.executionPeriod?.startDate),
// // // // //             execEndDate: formatDate(data.executionPeriod?.endDate),

// // // // //             thumbnailUrl: data.thumbnailUrl || '',
// // // // //             promoVideoUrl: data.promoVideoUrl || '',

// // // // //             registrationMethod: data.registrationMethod || 'auto',
            
// // // // //             requireDocs: data.registrationConfig?.requireDocs !== false,
// // // // //             registrationTemplates: Array.isArray(data.registrationConfig?.templates) ? data.registrationConfig.templates : (data.registrationTemplates || []),

// // // // //             price: Number(data.price) || 0,
// // // // //             estimatedDuration: Number(data.estimatedDuration) || 0,
// // // // //             totalJp: Number(data.totalJp) || 0,
            
// // // // //             facilities: Array.isArray(data.facilities) ? data.facilities : [],
// // // // //             facilitatorIds: Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [],
// // // // //             pics: Array.isArray(data.pics) ? data.pics : [],
            
// // // // //             creatorInfo: data.creatorInfo || null,
// // // // //             contactName: data.contact?.name || data.creatorInfo?.name || '',
// // // // //             contactEmail: data.contact?.email || data.creatorInfo?.email || '',
// // // // //             contactPhone: data.contact?.phone || data.creatorInfo?.contact || ''
// // // // //         });

// // // // //         // Parse Organizer
// // // // //         if (data.organizer) {
// // // // //             const parts = data.organizer.split(':');
// // // // //             const type = parts[0];
// // // // //             if (['Unit PMR', 'Relawan', 'External'].includes(type)) {
// // // // //                 setOrganizerType(type);
// // // // //                 setOrganizerName(parts[1]?.trim() || '');
// // // // //             } else {
// // // // //                 setOrganizerType(data.organizer);
// // // // //             }
// // // // //         }
// // // // //     }

// // // // //     // --- HANDLERS ---
// // // // //     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
// // // // //     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
// // // // //     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };
    
// // // // //     // --- HANDLER FASILITATOR ---
// // // // //     const toggleFacilitator = (id: string) => {
// // // // //         const current = formData.facilitatorIds;
// // // // //         setFormData(prev => ({ ...prev, facilitatorIds: current.includes(id) ? current.filter(fid => fid !== id) : [...current, id] }));
// // // // //     };

// // // // //     // --- HANDLER PIC (SEARCH & SELECT) ---
// // // // //     const handleAddPicFromSearch = (user: any) => {
// // // // //         if (formData.pics.length >= 3) return alert("Maksimal 3 PIC Tambahan");
// // // // //         if (formData.pics.some((p: any) => p.email === user.email)) return alert("User ini sudah ditambahkan.");

// // // // //         const newPic = {
// // // // //             name: user.name,
// // // // //             pmiStatus: user.role, 
// // // // //             email: user.email,
// // // // //             avatarUrl: user.avatarUrl
// // // // //         };
// // // // //         setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
// // // // //         setSearchPic('');
// // // // //     };

// // // // //     const removePic = (idx: number) => { 
// // // // //         setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); 
// // // // //     };

// // // // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // //         try {
// // // // //             setUploadingCover(true); const fd = new FormData(); fd.append('file', file);
// // // // //             const res = await apiUpload('/api/upload', fd); 
// // // // //             const url = res.url || res.file?.url || res.data?.url;
// // // // //             if (url) handleChange('thumbnailUrl', url);
// // // // //         } catch (err: any) { alert('Gagal: ' + err.message); } finally { setUploadingCover(false); }
// // // // //     };

// // // // //     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // //         setUploadingTemplate(true);
// // // // //         try {
// // // // //             const fd = new FormData(); fd.append('file', file);
// // // // //             const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
// // // // //             const token = userStr ? JSON.parse(userStr).token : '';

// // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { 
// // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
// // // // //                 withCredentials: true 
// // // // //             });
            
// // // // //             const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url;
// // // // //             if (!rawUrl) throw new Error("Gagal dapat URL.");

// // // // //             setFormData(prev => ({
// // // // //                 ...prev,
// // // // //                 registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }]
// // // // //             }));
// // // // //         } catch (err: any) {
// // // // //             console.error(err);
// // // // //             alert('Upload Gagal: ' + (err.response?.data?.message || err.message));
// // // // //         } finally {
// // // // //             setUploadingTemplate(false);
// // // // //             if (templateInputRef.current) templateInputRef.current.value = '';
// // // // //         }
// // // // //     };

// // // // //     const removeTemplate = (idx: number) => {
// // // // //         if(!confirm("Hapus dokumen ini?")) return;
// // // // //         setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) }));
// // // // //     };

// // // // //     const updateTemplateTitle = (idx: number, v: string) => {
// // // // //         const t = [...formData.registrationTemplates]; t[idx].title = v;
// // // // //         setFormData(prev => ({ ...prev, registrationTemplates: t }));
// // // // //     };

// // // // //     // --- SUBMIT DENGAN VALIDASI MANDATORI ---
// // // // //     const handleSubmit = async (e: React.FormEvent) => {
// // // // //         e.preventDefault();

// // // // //         // 1. VALIDASI DATA MANDATORI
// // // // //         const missingFields = [];
        
// // // // //         if (!formData.title.trim()) missingFields.push("Judul Pelatihan");
// // // // //         if (!formData.description || formData.description === '<p><br></p>') missingFields.push("Deskripsi Lengkap");
// // // // //         if (!formData.thumbnailUrl) missingFields.push("Gambar Cover (Media)");
        
// // // // //         // Validasi Tanggal Pendaftaran
// // // // //         if (!formData.regIsForever) {
// // // // //             if (!formData.regStartDate || !formData.regEndDate) missingFields.push("Tanggal Pendaftaran (Mulai & Selesai)");
// // // // //         }

// // // // //         // Validasi Tanggal Pelaksanaan
// // // // //         if (!formData.execIsFlexible) {
// // // // //             if (!formData.execStartDate || !formData.execEndDate) missingFields.push("Tanggal Pelaksanaan (Mulai & Selesai)");
// // // // //         }

// // // // //         // Validasi Pelaksana (Identitas Unit)
// // // // //         if (['Unit PMR', 'Relawan', 'External'].includes(organizerType) && !organizerName.trim()) {
// // // // //             missingFields.push("Nama Identitas Pelaksana (Unit/External)");
// // // // //         }

// // // // //         // Validasi Fasilitator
// // // // //         if (formData.facilitatorIds.length === 0) missingFields.push("Tim Fasilitator (Minimal 1)");

// // // // //         // Validasi Kontak
// // // // //         if (!formData.contactName.trim() || !formData.contactEmail.trim() || !formData.contactPhone.trim()) {
// // // // //             missingFields.push("Kontak Utama (Nama, Email, & Telepon)");
// // // // //         }

// // // // //         if (missingFields.length > 0) {
// // // // //             alert("Harap lengkapi data wajib berikut:\n\n- " + missingFields.join("\n- "));
// // // // //             return;
// // // // //         }

// // // // //         if (!isAgreed) return alert("Mohon setujui pernyataan disclaimer.");

// // // // //         setLoading(true);
// // // // //         try {
// // // // //             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
// // // // //             const parseDate = (d: string) => d ? new Date(d) : null;

// // // // //             // Konstruksi Pelaksana
// // // // //             let finalOrganizer = organizerType;
// // // // //             if (['Unit PMR', 'Relawan', 'External'].includes(organizerType)) {
// // // // //                 finalOrganizer = `${organizerType}: ${organizerName}`;
// // // // //             }

// // // // //             const payload = {
// // // // //                 title: formData.title,
// // // // //                 description: formData.description,
// // // // //                 programType: formData.programType,
// // // // //                 hasCertificate: formData.hasCertificate,
// // // // //                 price: Number(formData.price),
// // // // //                 estimatedDuration: Number(formData.estimatedDuration),
// // // // //                 totalJp: Number(formData.totalJp),
// // // // //                 thumbnailUrl: formData.thumbnailUrl,
// // // // //                 promoVideoUrl: formData.promoVideoUrl,
                
// // // // //                 organizer: finalOrganizer,

// // // // //                 registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
// // // // //                 executionPeriod: { isForever: formData.execIsFlexible, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
// // // // //                 registrationMethod: formData.registrationMethod,
                
// // // // //                 registrationConfig: { 
// // // // //                     requireDocs: formData.requireDocs, 
// // // // //                     templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) 
// // // // //                 },
                
// // // // //                 facilities: formData.facilities,
// // // // //                 facilitatorIds: formData.facilitatorIds,
// // // // //                 pics: validPics,
// // // // //                 // Data Kontak & Creator
// // // // //                 creatorInfo: formData.creatorInfo,
// // // // //                 contact: {
// // // // //                     name: formData.contactName,
// // // // //                     email: formData.contactEmail,
// // // // //                     phone: formData.contactPhone
// // // // //                 }
// // // // //             };

// // // // //             let res;
// // // // //             if (course?._id) res = await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
// // // // //             else res = await api('/api/courses', { method: 'POST', body: payload });

// // // // //             if(res && (res.course || res.data)) populateForm(res.course || res.data);
// // // // //             alert("Berhasil disimpan! Notifikasi persetujuan dikirim.");
// // // // //             onSuccess();
// // // // //         } catch (err: any) {
// // // // //             console.error(err);
// // // // //             alert("Gagal: " + (err.response?.data?.message || err.message));
// // // // //         } finally {
// // // // //             setLoading(false);
// // // // //         }
// // // // //     };

// // // // //     // --- FILTER LOGIC ---
// // // // //     const selectedFacilitators = facilitators.filter(f => formData.facilitatorIds.includes(f.id || f._id));
// // // // //     const availableFacilitators = facilitators.filter(f => 
// // // // //         !formData.facilitatorIds.includes(f.id || f._id) && 
// // // // //         (f.name?.toLowerCase().includes(searchFacilitator.toLowerCase()) || f.email?.toLowerCase().includes(searchFacilitator.toLowerCase()))
// // // // //     );

// // // // //     const filteredPicCandidates = allUsers.filter(u => 
// // // // //         ((u.name || '').toLowerCase().includes(searchPic.toLowerCase()) || 
// // // // //         (u.email || '').toLowerCase().includes(searchPic.toLowerCase())) &&
// // // // //         !formData.pics.some((p: any) => p.email === u.email)
// // // // //     );

// // // // //     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><div className="bg-white p-5 rounded-lg flex items-center gap-3"><Loader2 className="animate-spin text-red-600"/> Memuat data...</div></div>;

// // // // //     return (
// // // // //         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-hidden" role="dialog" aria-modal="true">
// // // // //             <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
                
// // // // //                 {/* HEADER */}
// // // // //                 <div className="bg-gray-900 text-white p-5 flex justify-between items-center shrink-0">
// // // // //                     <div><h2 className="text-xl font-bold">{course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2><p className="text-xs text-gray-400 mt-1">Lengkapi data pelatihan.</p></div>
// // // // //                     <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" title="Tutup" aria-label="Tutup"><X size={24}/></button>
// // // // //                 </div>

// // // // //                 <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0">
// // // // //                     {[
// // // // //                         { id: 'info', label: '1. Informasi Dasar', icon: FileText },
// // // // //                         { id: 'media', label: '2. Media & Visual', icon: ImageIcon },
// // // // //                         { id: 'registration', label: '3. Jadwal & Pelaksana', icon: Calendar },
// // // // //                         { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award },
// // // // //                         { id: 'team', label: '5. Tim & PIC', icon: Users },
// // // // //                     ].map((tab) => (
// // // // //                         <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap outline-none ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
// // // // //                             <tab.icon size={16} /> {tab.label}
// // // // //                         </button>
// // // // //                     ))}
// // // // //                 </div>

// // // // //                 <form id="courseForm" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    
// // // // //                     {/* TAB 1: INFO */}
// // // // //                     {activeTab === 'info' && (
// // // // //                         <div className="space-y-6 max-w-4xl mx-auto">
// // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // //                                 <div><label htmlFor="courseTitle" className="block text-sm font-bold text-gray-700 mb-1">Judul Pelatihan <span className="text-red-500">*</span></label><input id="courseTitle" required type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: Orientasi Kepalangmerahan" value={formData.title} onChange={e => handleChange('title', e.target.value)} title="Judul Pelatihan" /></div>
// // // // //                                 <div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap <span className="text-red-500">*</span></label><div className="bg-white rounded-lg border overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" placeholder="Tulis deskripsi..." /></div></div>
// // // // //                             </div>

// // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
// // // // //                                 <div>
// // // // //                                     <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label>
// // // // //                                     <div className="flex gap-4">
// // // // //                                         <div onClick={() => handleChange('programType', 'training')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'training' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// // // // //                                             <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'training' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'training' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// // // // //                                             <span className="text-sm text-gray-700 font-medium">Diklat Resmi</span>
// // // // //                                         </div>
// // // // //                                         <div onClick={() => handleChange('programType', 'course')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'course' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// // // // //                                             <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'course' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'course' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// // // // //                                             <span className="text-sm text-gray-700 font-medium">Kursus Mandiri</span>
// // // // //                                         </div>
// // // // //                                     </div>
// // // // //                                 </div>
// // // // //                                 <div className="w-px bg-gray-200"></div>
// // // // //                                 <div className="flex items-center gap-3">
// // // // //                                     <div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // //                                         <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div>
// // // // //                                         <span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span>
// // // // //                                     </div>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     )}

// // // // //                     {/* TAB 2: MEDIA */}
// // // // //                     {activeTab === 'media' && (
// // // // //                         <div className="max-w-3xl mx-auto space-y-6">
// // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                                 <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) <span className="text-red-500">*</span></label>
// // // // //                                 <div className="flex gap-6 items-start">
// // // // //                                     <div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
// // // // //                                         {formData.thumbnailUrl ? <img src={getDisplayUrl(formData.thumbnailUrl)} alt="Preview Cover" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1" /><span className="text-xs">Belum ada gambar</span></div>}
// // // // //                                         {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
// // // // //                                     </div>
// // // // //                                     <div className="flex-1">
// // // // //                                         <p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p>
// // // // //                                         <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" title="Input Gambar"/>
// // // // //                                         <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2" title="Upload Gambar"><Upload size={16}/> Upload Gambar</button>
// // // // //                                     </div>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                                 <label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label>
// // // // //                                 <div className="flex gap-2"><div className="p-3 bg-gray-100 rounded-l-lg border border-r-0 text-gray-500"><Video size={18}/></div><input type="text" className="flex-1 p-2.5 border rounded-r-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} title="URL Video Youtube" /></div>
// // // // //                                 {formData.promoVideoUrl && formData.promoVideoUrl.includes('youtube') && (
// // // // //                                     <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 aspect-video w-full max-w-sm bg-black">
// // // // //                                         <iframe width="100%" height="100%" src={getYoutubeEmbed(formData.promoVideoUrl)} title="Preview Video" frameBorder="0" allowFullScreen></iframe>
// // // // //                                     </div>
// // // // //                                 )}
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     )}

// // // // //                     {/* TAB 3: JADWAL & PELAKSANA */}
// // // // //                     {activeTab === 'registration' && (
// // // // //                         <div className="max-w-4xl mx-auto space-y-6">
// // // // //                             {/* Jadwal */}
// // // // //                             <div className="grid grid-cols-2 gap-6">
// // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
// // // // //                                     <div className="flex items-center gap-2 mb-2">
// // // // //                                         <div onClick={() => handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // //                                             <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // //                                             <span className="text-sm text-gray-600">Buka Selamanya</span>
// // // // //                                         </div>
// // // // //                                     </div>
// // // // //                                     {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} title="Mulai Pendaftaran" /></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} title="Selesai Pendaftaran" /></div></div>)}
// // // // //                                 </div>
// // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
// // // // //                                     <div className="flex items-center gap-2 mb-2">
// // // // //                                         <div onClick={() => handleChange('execIsFlexible', !formData.execIsFlexible)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // //                                             <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsFlexible ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.execIsFlexible && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // //                                             <span className="text-sm text-gray-600">Fleksibel</span>
// // // // //                                         </div>
// // // // //                                     </div>
// // // // //                                     {!formData.execIsFlexible && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} title="Mulai Pelaksanaan" /></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} title="Selesai Pelaksanaan" /></div></div>)}
// // // // //                                 </div>
// // // // //                             </div>

// // // // //                             {/* [FITUR BARU] PELAKSANA PELATIHAN */}
// // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // //                                 <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan</label>
// // // // //                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                                     <select 
// // // // //                                         className="w-full p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
// // // // //                                         value={organizerType}
// // // // //                                         onChange={(e) => setOrganizerType(e.target.value)}
// // // // //                                     >
// // // // //                                         <option value="PMI Pusat">PMI Pusat</option>
// // // // //                                         <option value="PMI Provinsi">PMI Provinsi</option>
// // // // //                                         <option value="PMI Kabupaten/Kota">PMI Kabupaten/Kota</option>
// // // // //                                         <option value="PMI Kecamatan">PMI Kecamatan</option>
// // // // //                                         <option value="Unit PMR">Unit PMR</option>
// // // // //                                         <option value="Relawan">Relawan</option>
// // // // //                                         <option value="External">External</option>
// // // // //                                     </select>
                                    
// // // // //                                     {['Unit PMR', 'Relawan', 'External'].includes(organizerType) && (
// // // // //                                         <input 
// // // // //                                             type="text" 
// // // // //                                             className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 animate-in fade-in"
// // // // //                                             placeholder={`Nama ${organizerType} / Identitas...`}
// // // // //                                             value={organizerName}
// // // // //                                             onChange={(e) => setOrganizerName(e.target.value)}
// // // // //                                         />
// // // // //                                     )}
// // // // //                                 </div>
// // // // //                             </div>

// // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan Peserta</h3>
// // // // //                                 <div className="space-y-4">
// // // // //                                     <div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'auto' ? 'bg-green-50 border-green-200 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'auto' ? 'border-green-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'auto' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Otomatis (Langsung Aktif)</span><span className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</span></div></div>
// // // // //                                     <div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'manual' ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'manual' ? 'border-yellow-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'manual' && <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Manual (Verifikasi Admin)</span><span className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</span></div></div>
// // // // //                                 </div>
// // // // //                             </div>

// // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                                 <div className="flex justify-between items-start mb-4">
// // // // //                                     <div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div>
// // // // //                                     <div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer">
// // // // //                                         <div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // //                                         <span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span>
// // // // //                                     </div>
// // // // //                                 </div>
// // // // //                                 {formData.requireDocs && (
// // // // //                                     <div className="space-y-3">
// // // // //                                         <div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} title="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50" title="Upload Template">{uploadingTemplate ? 'Mengupload...' : <><Upload size={14}/> Upload Template Baru</>}</button></div>
// // // // //                                         {formData.registrationTemplates.length === 0 ? <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">Belum ada dokumen.</div> : formData.registrationTemplates.map((item: any, idx: number) => (
// // // // //                                             <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
// // // // //                                                 <div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div>
// // // // //                                                 <div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} title="Nama Dokumen"/>
// // // // //                                                 <a href={getDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()} title="Lihat File"><Download size={10} /> Lihat File Uploaded</a></div>
// // // // //                                                 <button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Hapus Dokumen"><Trash2 size={16} /></button>
// // // // //                                             </div>
// // // // //                                         ))}
// // // // //                                     </div>
// // // // //                                 )}
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     )}

// // // // //                     {/* TAB 4: FASILITAS & DETAIL (RESTORED) */}
// // // // //                     {activeTab === 'facilities' && (
// // // // //                         <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
// // // // //                             <div className="space-y-6">
// // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" title="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div>
// // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.estimatedDuration} disabled title="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.totalJp} disabled title="Total JP"/></div></div></div>
// // // // //                             </div>
// // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas <span className="text-red-500">*</span></label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} title="Input Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" title="Tambah Fasilitas"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" title="Hapus Fasilitas"><X size={14}/></button></div>))}</div></div>
// // // // //                         </div>
// // // // //                     )}

// // // // //                     {/* TAB 5: TIM & PIC */}
// // // // //                     {activeTab === 'team' && (
// // // // //                         <div className="max-w-4xl mx-auto space-y-8">
                            
// // // // //                             {/* A. PILIH TIM FASILITATOR (SEARCH & SELECT) */}
// // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                                 <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
// // // // //                                 <p className="text-xs text-gray-500 mb-4">*Mencakup Admin, Superadmin, dan Fasilitator.</p>
                                
// // // // //                                 {/* List Terpilih */}
// // // // //                                 <div className="mb-4 space-y-2">
// // // // //                                     {selectedFacilitators.map(fac => (
// // // // //                                         <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100 animate-in slide-in-from-top-1">
// // // // //                                             <div className="flex items-center gap-3">
// // // // //                                                 <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-xs border border-red-200">{fac.name?.charAt(0)}</div>
// // // // //                                                 <div>
// // // // //                                                     <span className="text-sm font-bold text-red-900 block">{fac.name}</span>
// // // // //                                                     <span className="text-[10px] text-red-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full w-fit border border-red-100"><Clock size={10}/> Menunggu Persetujuan</span>
// // // // //                                                 </div>
// // // // //                                             </div>
// // // // //                                             <button type="button" onClick={() => toggleFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
// // // // //                                         </div>
// // // // //                                     ))}
// // // // //                                 </div>

// // // // //                                 {/* Search Bar */}
// // // // //                                 <div className="relative">
// // // // //                                     <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // // //                                     <input 
// // // // //                                         type="text" 
// // // // //                                         placeholder="Cari nama atau email fasilitator untuk diundang..." 
// // // // //                                         className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" 
// // // // //                                         value={searchFacilitator} 
// // // // //                                         onChange={(e) => setSearchFacilitator(e.target.value)} 
// // // // //                                         title="Cari Fasilitator"
// // // // //                                     />
// // // // //                                     {searchFacilitator && (
// // // // //                                         <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// // // // //                                             {availableFacilitators.length > 0 ? availableFacilitators.map(fac => (
// // // // //                                                 <button key={fac._id || fac.id} type="button" onClick={() => { toggleFacilitator(fac._id || fac.id); setSearchFacilitator(''); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// // // // //                                                     <div className="flex items-center gap-3">
// // // // //                                                         <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{fac.name?.charAt(0)}</div>
// // // // //                                                         <div><p className="text-sm font-bold text-gray-700">{fac.name}</p><p className="text-[10px] text-gray-400">{fac.email} • {fac.role}</p></div>
// // // // //                                                     </div>
// // // // //                                                     <Plus size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // // // //                                                 </button>
// // // // //                                             )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // // // //                                         </div>
// // // // //                                     )}
// // // // //                                 </div>
// // // // //                             </div>
                            
// // // // //                             {/* B. PENANGGUNG JAWAB & KONTAK */}
// // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                                 <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
                                
// // // // //                                 {/* 1. PEMBUAT PELATIHAN (AUTO) - DIKEMBALIKAN SESUAI REQUEST */}
// // // // //                                 <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
// // // // //                                     <div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div>
// // // // //                                     <div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div>
// // // // //                                 </div>

// // // // //                                 {/* 2. List PIC Tambahan */}
// // // // //                                 <div className="space-y-2 mb-4">
// // // // //                                     <label className="text-sm font-bold text-gray-700 block">Daftar PIC Tambahan (Maks 3)</label>
// // // // //                                     {formData.pics.map((pic: any, idx: number) => (
// // // // //                                         <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in slide-in-from-top-1">
// // // // //                                             <div className="flex items-center gap-3">
// // // // //                                                 <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">{pic.name?.charAt(0)}</div>
// // // // //                                                 <div>
// // // // //                                                     <span className="text-sm font-bold text-blue-900 block">{pic.name}</span>
// // // // //                                                     <div className="flex gap-2">
// // // // //                                                         <span className="text-[10px] text-blue-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full border border-blue-100"><Clock size={10}/> Menunggu Persetujuan</span>
// // // // //                                                         <span className="text-[10px] text-gray-500">{pic.email}</span>
// // // // //                                                     </div>
// // // // //                                                 </div>
// // // // //                                             </div>
// // // // //                                             <button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
// // // // //                                         </div>
// // // // //                                     ))}
// // // // //                                 </div>

// // // // //                                 {/* 3. Search PIC (Hanya jika < 3) */}
// // // // //                                 {formData.pics.length < 3 ? (
// // // // //                                     <div className="relative">
// // // // //                                         <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // // //                                         <input 
// // // // //                                             type="text" 
// // // // //                                             placeholder="Cari user untuk dijadikan PIC..." 
// // // // //                                             className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" 
// // // // //                                             value={searchPic} 
// // // // //                                             onChange={(e) => setSearchPic(e.target.value)} 
// // // // //                                             title="Cari PIC"
// // // // //                                         />
// // // // //                                         {searchPic && (
// // // // //                                             <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// // // // //                                                 {filteredPicCandidates.length > 0 ? filteredPicCandidates.map(user => (
// // // // //                                                     <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// // // // //                                                         <div className="flex items-center gap-3">
// // // // //                                                             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div>
// // // // //                                                             <div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div>
// // // // //                                                         </div>
// // // // //                                                         <UserPlus size={16} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // // // //                                                     </button>
// // // // //                                                 )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // // // //                                             </div>
// // // // //                                         )}
// // // // //                                     </div>
// // // // //                                 ) : (
// // // // //                                     <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 rounded-lg border border-gray-200">Kuota PIC penuh (Maksimal 3).</div>
// // // // //                                 )}
// // // // //                             </div>

// // // // //                             {/* C. KONTAK UTAMA (Sesuai Script Lama) */}
// // // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                                 <div className="flex justify-between items-center mb-4">
// // // // //                                     <h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckSquare size={18}/> Kontak Utama (Landing Page)</h3>
// // // // //                                 </div>
// // // // //                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                                     <div><label className="text-xs font-bold text-gray-500">Nama Kontak <span className="text-red-500">*</span></label><input name="contactName" value={formData.contactName} onChange={handleChange} className="w-full p-2 border rounded" title="Nama Kontak" /></div>
// // // // //                                     <div><label className="text-xs font-bold text-gray-500">Email Kontak <span className="text-red-500">*</span></label><input name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="w-full p-2 border rounded" title="Email Kontak" /></div>
// // // // //                                     <div className="md:col-span-2"><label className="text-xs font-bold text-gray-500">Nomor Telepon/WA <span className="text-red-500">*</span></label><input name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="w-full p-2 border rounded" placeholder="628..." title="Telepon Kontak" /></div>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     )}
// // // // //                 </form>

// // // // //                 {/* DISCLAIMER CHECKBOX */}
// // // // //                 <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
// // // // //                     <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-orange-200 bg-orange-50 hover:bg-orange-100 transition-colors">
// // // // //                         <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 ${isAgreed ? 'bg-orange-500 border-orange-600' : 'bg-white border-orange-300'}`}>
// // // // //                             <input type="checkbox" className="hidden" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} />
// // // // //                             {isAgreed && <CheckCircle size={14} className="text-white" />}
// // // // //                         </div>
// // // // //                         <div className="text-xs text-orange-900 leading-relaxed">
// // // // //                             <span className="font-bold block mb-0.5 flex items-center gap-1"><ShieldCheck size={14}/> Pernyataan Disclaimer</span>
// // // // //                             Saya menyatakan bahwa data pelatihan ini benar dan bertanggung jawab atas konten yang disajikan. Saya memahami bahwa Fasilitator dan PIC yang ditambahkan akan menerima notifikasi persetujuan di dashboard mereka.
// // // // //                         </div>
// // // // //                     </label>
// // // // //                 </div>

// // // // //                 <div className="bg-white border-t p-4 flex justify-end gap-3 shrink-0">
// // // // //                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50" title="Batal">Batal</button>
// // // // //                     <button onClick={handleSubmit} disabled={loading || !isAgreed} className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" title="Simpan">
// // // // //                         {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"/> : <Save size={18}/>} Simpan Pelatihan
// // // // //                     </button>
// // // // //                 </div>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // }



// // // // 'use client';

// // // // import { useState, useRef, useEffect } from 'react';
// // // // import { 
// // // //     X, Upload, Plus, Trash2, Save, Calendar, 
// // // //     Video, Image as ImageIcon, Users, FileText, 
// // // //     CheckCircle, AlertCircle, Award, Clock, Search, 
// // // //     Download, File, Info, Loader2, MessageCircle, UserPlus, 
// // // //     ShieldCheck, CheckSquare, Building
// // // // } from 'lucide-react';
// // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // [BARU] Import Helper Wilayah
// // // // import { getProvinces, getRegencies } from '@/lib/indonesia';
// // // // import dynamic from 'next/dynamic';
// // // // import 'react-quill/dist/quill.snow.css';
// // // // import axios from 'axios'; 

// // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // //     ssr: false,
// // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // });

// // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // interface CourseFormModalProps {
// // // //     course?: any; 
// // // //     onClose: () => void;
// // // //     onSuccess: () => void;
// // // //     facilitators: any[]; 
// // // //     currentUser: any; 
// // // // }

// // // // export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
// // // //     const [activeTab, setActiveTab] = useState('info');
// // // //     const [loading, setLoading] = useState(false);
// // // //     const [fetchingDetail, setFetchingDetail] = useState(false);
    
// // // //     const fileInputRef = useRef<HTMLInputElement>(null); 
// // // //     const templateInputRef = useRef<HTMLInputElement>(null); 
    
// // // //     // State Search
// // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
// // // //     const [searchPic, setSearchPic] = useState('');
// // // //     const [allUsers, setAllUsers] = useState<any[]>([]);
// // // //     const [isAgreed, setIsAgreed] = useState(false); 

// // // //     // State UI Tambahan
// // // //     const [newFacility, setNewFacility] = useState('');
// // // //     const [uploadingCover, setUploadingCover] = useState(false);
// // // //     const [uploadingTemplate, setUploadingTemplate] = useState(false);

// // // //     // [BARU] State Pelaksana & Wilayah
// // // //     const [organizerType, setOrganizerType] = useState('PMI Pusat');
// // // //     const [organizerName, setOrganizerName] = useState('');
// // // //     const [provinces, setProvinces] = useState<any[]>([]);
// // // //     const [regencies, setRegencies] = useState<any[]>([]);
// // // //     const [selectedProvId, setSelectedProvId] = useState('');
// // // //     const [selectedCityId, setSelectedCityId] = useState('');
// // // //     const [cmsCategories, setCmsCategories] = useState<string[]>([]);

// // // //     // --- INITIAL STATE LENGKAP ---
// // // //     const [formData, setFormData] = useState({
// // // //         title: '',
// // // //         description: '', 
// // // //         programType: 'training', 
// // // //         hasCertificate: true,
        
// // // //         regIsForever: false,
// // // //         regStartDate: '',
// // // //         regEndDate: '',
        
// // // //         execIsFlexible: true,
// // // //         execStartDate: '',
// // // //         execEndDate: '',
        
// // // //         thumbnailUrl: '',
// // // //         promoVideoUrl: '',
        
// // // //         registrationMethod: 'auto', 
// // // //         requireDocs: true, 
// // // //         registrationTemplates: [] as any[], 
        
// // // //         price: 0,
// // // //         estimatedDuration: 0, 
// // // //         totalJp: 0, 
        
// // // //         facilities: [] as string[], 
// // // //         facilitatorIds: [] as string[],
// // // //         pics: [] as any[], 
        
// // // //         creatorInfo: null as any,
// // // //         contactName: '',
// // // //         contactPhone: '',
// // // //         contactEmail: ''
// // // //     });

// // // //     // Helper URL
// // // //     const getDisplayUrl = (url: string) => {
// // // //         if (!url) return '';
// // // //         if (url.startsWith('http')) return url;
// // // //         const cleanPath = url.startsWith('/') ? url : `/${url}`;
// // // //         return `${API_BASE_URL}${cleanPath}`;
// // // //     };

// // // //     const getYoutubeEmbed = (url: string) => {
// // // //         try {
// // // //             if (!url) return '';
// // // //             if (url.includes('embed')) return url;
// // // //             const videoId = url.split('v=')[1]?.split('&')[0];
// // // //             if (videoId) return `https://www.youtube.com/embed/${videoId}`;
// // // //             if (url.includes('youtu.be')) return `https://www.youtube.com/embed/${url.split('/').pop()}`;
// // // //             return url;
// // // //         } catch { return url; }
// // // //     };

// // // //     // [BARU] LOAD DATA WILAYAH & CMS
// // // //     useEffect(() => {
// // // //         const provs = getProvinces();
// // // //         setProvinces(provs);
// // // //         // Load Kategori dari CMS jika ada
// // // //         api('/api/content').then(res => {
// // // //             if (res && res.organizerCategories) setCmsCategories(res.organizerCategories);
// // // //         }).catch(() => {});
// // // //     }, []);

// // // //     // [BARU] LOAD KOTA SAAT PROVINSI BERUBAH
// // // //     useEffect(() => {
// // // //         if (selectedProvId) {
// // // //             const regs = getRegencies(selectedProvId);
// // // //             setRegencies(regs);
// // // //         } else {
// // // //             setRegencies([]);
// // // //         }
// // // //     }, [selectedProvId]);

// // // //     // --- FETCH DATA ---
// // // //     useEffect(() => {
// // // //         const initData = async () => {
// // // //             if (course && course._id) {
// // // //                 setFetchingDetail(true);
// // // //                 try {
// // // //                     const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
// // // //                     const fullData = res.course || res.data || res;
// // // //                     populateForm(fullData);
// // // //                 } catch (e) {
// // // //                     console.error("Gagal fetch detail, pakai fallback:", e);
// // // //                     populateForm(course);
// // // //                 } finally {
// // // //                     setFetchingDetail(false);
// // // //                 }
// // // //             } else {
// // // //                 if (currentUser) {
// // // //                      setFormData(prev => ({
// // // //                         ...prev,
// // // //                         contactName: currentUser.name,
// // // //                         contactEmail: currentUser.email,
// // // //                         contactPhone: currentUser.phoneNumber || ''
// // // //                      }));
// // // //                 }
// // // //             }
// // // //         };
// // // //         initData();
// // // //     }, [course]);

// // // //     // FETCH ALL USERS
// // // //     useEffect(() => {
// // // //         const fetchAllUsers = async () => {
// // // //             try {
// // // //                 const res = await api('/api/users'); 
// // // //                 const users = res.users || res.data || [];
// // // //                 setAllUsers(users);
// // // //             } catch (err) {
// // // //                 console.error("Gagal load users:", err);
// // // //                 setAllUsers(facilitators);
// // // //             }
// // // //         };
// // // //         fetchAllUsers();
// // // //     }, []);

// // // //     const populateForm = (data: any) => {
// // // //         const formatDate = (d: string) => {
// // // //             if (!d) return '';
// // // //             try { return new Date(d).toISOString().split('T')[0]; } catch (e) { return ''; }
// // // //         };

// // // //         setFormData({
// // // //             title: data.title || '',
// // // //             description: data.description || '',
// // // //             programType: data.programType || 'training',
// // // //             hasCertificate: data.hasCertificate ?? true,
            
// // // //             regIsForever: data.registrationPeriod?.isForever ?? false,
// // // //             regStartDate: formatDate(data.registrationPeriod?.startDate),
// // // //             regEndDate: formatDate(data.registrationPeriod?.endDate),

// // // //             execIsFlexible: data.executionPeriod?.isForever ?? false,
// // // //             execStartDate: formatDate(data.executionPeriod?.startDate),
// // // //             execEndDate: formatDate(data.executionPeriod?.endDate),

// // // //             thumbnailUrl: data.thumbnailUrl || '',
// // // //             promoVideoUrl: data.promoVideoUrl || '',

// // // //             registrationMethod: data.registrationMethod || 'auto',
            
// // // //             requireDocs: data.registrationConfig?.requireDocs !== false,
// // // //             registrationTemplates: Array.isArray(data.registrationConfig?.templates) ? data.registrationConfig.templates : (data.registrationTemplates || []),

// // // //             price: Number(data.price) || 0,
// // // //             estimatedDuration: Number(data.estimatedDuration) || 0,
// // // //             totalJp: Number(data.totalJp) || 0,
            
// // // //             facilities: Array.isArray(data.facilities) ? data.facilities : [],
// // // //             facilitatorIds: Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [],
// // // //             pics: Array.isArray(data.pics) ? data.pics : [],
            
// // // //             creatorInfo: data.creatorInfo || null,
// // // //             contactName: data.contact?.name || data.creatorInfo?.name || '',
// // // //             contactEmail: data.contact?.email || data.creatorInfo?.email || '',
// // // //             contactPhone: data.contact?.phone || data.creatorInfo?.contact || ''
// // // //         });

// // // //         // [BARU] PARSE ORGANIZER KE DROPDOWN
// // // //         if (data.organizer) {
// // // //             const org = data.organizer;
// // // //             // Cek tipe standar
// // // //             if (org === 'PMI Pusat') {
// // // //                 setOrganizerType('PMI Pusat');
// // // //             } else if (org.startsWith('PMI Provinsi')) {
// // // //                 setOrganizerType('PMI Provinsi');
// // // //                 const pName = org.split(': ')[1]?.trim();
// // // //                 const foundProv = getProvinces().find((p: any) => p.name === pName);
// // // //                 if (foundProv) setSelectedProvId(foundProv.code);
// // // //             } else if (org.startsWith('PMI Kabupaten/Kota')) {
// // // //                 setOrganizerType('PMI Kabupaten/Kota');
// // // //                 // Format DB: "PMI Kabupaten/Kota: Kota Bandung, Jawa Barat"
// // // //                 // Kita simpan string penuh sementara jika logic split rumit, 
// // // //                 // atau coba parse:
// // // //                 const locParts = org.split(': ')[1]?.split(','); // [" Kota Bandung", " Jawa Barat"]
// // // //                 if (locParts && locParts.length > 1) {
// // // //                     const cityName = locParts[0].trim();
// // // //                     const provName = locParts[1].trim();
// // // //                     const foundProv = getProvinces().find((p: any) => p.name === provName);
// // // //                     if (foundProv) {
// // // //                         setSelectedProvId(foundProv.code);
// // // //                         // Trigger load regency manual atau biarkan useEffect
// // // //                         // Kita set selectedCityId nanti setelah regencies loaded, tapi karena async, 
// // // //                         // untuk simplifikasi kita set organizerName sebagai fallback display
// // // //                         // atau biarkan user pilih ulang jika ingin edit detail.
// // // //                         // Disini kita set organizerName sebagai "Kota Bandung" agar input text terisi jika mode custom.
// // // //                     }
// // // //                 }
// // // //                 setOrganizerName(org.split(': ')[1] || ''); 
// // // //             } else {
// // // //                 // Custom Type
// // // //                 const parts = org.split(': ');
// // // //                 setOrganizerType(parts[0]);
// // // //                 setOrganizerName(parts[1] || '');
// // // //             }
// // // //         }
// // // //     }

// // // //     // --- HANDLERS ---
// // // //     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
// // // //     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
// // // //     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };
    
// // // //     // --- HANDLER FASILITATOR ---
// // // //     const toggleFacilitator = (id: string) => {
// // // //         const current = formData.facilitatorIds;
// // // //         setFormData(prev => ({ ...prev, facilitatorIds: current.includes(id) ? current.filter(fid => fid !== id) : [...current, id] }));
// // // //     };

// // // //     // --- HANDLER PIC (SEARCH & SELECT) ---
// // // //     const handleAddPicFromSearch = (user: any) => {
// // // //         if (formData.pics.length >= 3) return alert("Maksimal 3 PIC Tambahan");
// // // //         if (formData.pics.some((p: any) => p.email === user.email)) return alert("User ini sudah ditambahkan.");

// // // //         const newPic = {
// // // //             name: user.name,
// // // //             pmiStatus: user.role, 
// // // //             email: user.email,
// // // //             avatarUrl: user.avatarUrl
// // // //         };
// // // //         setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
// // // //         setSearchPic('');
// // // //     };

// // // //     const removePic = (idx: number) => { 
// // // //         setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); 
// // // //     };

// // // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //         const file = e.target.files?.[0]; if (!file) return;
// // // //         try {
// // // //             setUploadingCover(true); const fd = new FormData(); fd.append('file', file);
// // // //             const res = await apiUpload('/api/upload', fd); 
// // // //             const url = res.url || res.file?.url || res.data?.url;
// // // //             if (url) handleChange('thumbnailUrl', url);
// // // //         } catch (err: any) { alert('Gagal: ' + err.message); } finally { setUploadingCover(false); }
// // // //     };

// // // //     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //         const file = e.target.files?.[0]; if (!file) return;
// // // //         setUploadingTemplate(true);
// // // //         try {
// // // //             const fd = new FormData(); fd.append('file', file);
// // // //             const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
// // // //             const token = userStr ? JSON.parse(userStr).token : '';

// // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { 
// // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
// // // //                 withCredentials: true 
// // // //             });
            
// // // //             const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url;
// // // //             if (!rawUrl) throw new Error("Gagal dapat URL.");

// // // //             setFormData(prev => ({
// // // //                 ...prev,
// // // //                 registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }]
// // // //             }));
// // // //         } catch (err: any) {
// // // //             console.error(err);
// // // //             alert('Upload Gagal: ' + (err.response?.data?.message || err.message));
// // // //         } finally {
// // // //             setUploadingTemplate(false);
// // // //             if (templateInputRef.current) templateInputRef.current.value = '';
// // // //         }
// // // //     };

// // // //     const removeTemplate = (idx: number) => {
// // // //         if(!confirm("Hapus dokumen ini?")) return;
// // // //         setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) }));
// // // //     };

// // // //     const updateTemplateTitle = (idx: number, v: string) => {
// // // //         const t = [...formData.registrationTemplates]; t[idx].title = v;
// // // //         setFormData(prev => ({ ...prev, registrationTemplates: t }));
// // // //     };

// // // //     // --- SUBMIT DENGAN VALIDASI MANDATORI ---
// // // //     const handleSubmit = async (e: React.FormEvent) => {
// // // //         e.preventDefault();

// // // //         // 1. VALIDASI DATA MANDATORI
// // // //         const missingFields = [];
        
// // // //         if (!formData.title.trim()) missingFields.push("Judul Pelatihan");
// // // //         if (!formData.description || formData.description === '<p><br></p>') missingFields.push("Deskripsi Lengkap");
// // // //         if (!formData.thumbnailUrl) missingFields.push("Gambar Cover (Media)");
        
// // // //         // Validasi Pelaksana (Identitas Unit) - [BARU]
// // // //         if (organizerType === 'PMI Provinsi' && !selectedProvId) missingFields.push("Pilih Provinsi Pelaksana");
// // // //         if (organizerType === 'PMI Kabupaten/Kota' && (!selectedProvId || !selectedCityId)) missingFields.push("Pilih Kab/Kota Pelaksana");
// // // //         if (!['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota'].includes(organizerType) && !organizerName.trim()) {
// // // //             missingFields.push("Nama Identitas Pelaksana");
// // // //         }

// // // //         // Validasi Tanggal Pendaftaran
// // // //         if (!formData.regIsForever) {
// // // //             if (!formData.regStartDate || !formData.regEndDate) missingFields.push("Tanggal Pendaftaran (Mulai & Selesai)");
// // // //         }

// // // //         // Validasi Tanggal Pelaksanaan
// // // //         if (!formData.execIsFlexible) {
// // // //             if (!formData.execStartDate || !formData.execEndDate) missingFields.push("Tanggal Pelaksanaan (Mulai & Selesai)");
// // // //         }

// // // //         // Validasi Fasilitator
// // // //         if (formData.facilitatorIds.length === 0) missingFields.push("Tim Fasilitator (Minimal 1)");

// // // //         // Validasi Kontak
// // // //         if (!formData.contactName.trim() || !formData.contactEmail.trim() || !formData.contactPhone.trim()) {
// // // //             missingFields.push("Kontak Utama (Nama, Email, & Telepon)");
// // // //         }

// // // //         if (missingFields.length > 0) {
// // // //             alert("Harap lengkapi data wajib berikut:\n\n- " + missingFields.join("\n- "));
// // // //             return;
// // // //         }

// // // //         if (!isAgreed) return alert("Mohon setujui pernyataan disclaimer.");

// // // //         setLoading(true);
// // // //         try {
// // // //             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
// // // //             const parseDate = (d: string) => d ? new Date(d) : null;

// // // //             // [BARU] KONSTRUKSI PELAKSANA
// // // //             let finalOrganizer = organizerType;
// // // //             if (organizerType === 'PMI Provinsi') {
// // // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
// // // //                 finalOrganizer = `PMI Provinsi: ${provName}`;
// // // //             } else if (organizerType === 'PMI Kabupaten/Kota') {
// // // //                 const cityName = regencies.find(r => r.code === selectedCityId)?.name || '';
// // // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
// // // //                 finalOrganizer = `PMI Kabupaten/Kota: ${cityName}, ${provName}`;
// // // //             } else if (organizerType !== 'PMI Pusat') {
// // // //                 finalOrganizer = `${organizerType}: ${organizerName}`;
// // // //             }

// // // //             const payload = {
// // // //                 title: formData.title,
// // // //                 description: formData.description,
// // // //                 programType: formData.programType,
// // // //                 hasCertificate: formData.hasCertificate,
// // // //                 price: Number(formData.price),
// // // //                 estimatedDuration: Number(formData.estimatedDuration),
// // // //                 totalJp: Number(formData.totalJp),
// // // //                 thumbnailUrl: formData.thumbnailUrl,
// // // //                 promoVideoUrl: formData.promoVideoUrl,
                
// // // //                 // Field Organizer Baru
// // // //                 organizer: finalOrganizer,

// // // //                 registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
// // // //                 executionPeriod: { isForever: formData.execIsFlexible, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
// // // //                 registrationMethod: formData.registrationMethod,
                
// // // //                 registrationConfig: { 
// // // //                     requireDocs: formData.requireDocs, 
// // // //                     templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) 
// // // //                 },
                
// // // //                 facilities: formData.facilities,
// // // //                 facilitatorIds: formData.facilitatorIds,
// // // //                 pics: validPics,
// // // //                 // Data Kontak & Creator
// // // //                 creatorInfo: formData.creatorInfo,
// // // //                 contact: {
// // // //                     name: formData.contactName,
// // // //                     email: formData.contactEmail,
// // // //                     phone: formData.contactPhone
// // // //                 }
// // // //             };

// // // //             let res;
// // // //             if (course?._id) res = await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
// // // //             else res = await api('/api/courses', { method: 'POST', body: payload });

// // // //             if(res && (res.course || res.data)) populateForm(res.course || res.data);
// // // //             alert("Berhasil disimpan! Notifikasi persetujuan dikirim.");
// // // //             onSuccess();
// // // //         } catch (err: any) {
// // // //             console.error(err);
// // // //             alert("Gagal: " + (err.response?.data?.message || err.message));
// // // //         } finally {
// // // //             setLoading(false);
// // // //         }
// // // //     };

// // // //     // --- FILTER LOGIC ---
// // // //     const selectedFacilitators = facilitators.filter(f => formData.facilitatorIds.includes(f.id || f._id));
// // // //     const availableFacilitators = facilitators.filter(f => 
// // // //         !formData.facilitatorIds.includes(f.id || f._id) && 
// // // //         (f.name?.toLowerCase().includes(searchFacilitator.toLowerCase()) || f.email?.toLowerCase().includes(searchFacilitator.toLowerCase()))
// // // //     );

// // // //     const filteredPicCandidates = allUsers.filter(u => 
// // // //         ((u.name || '').toLowerCase().includes(searchPic.toLowerCase()) || 
// // // //         (u.email || '').toLowerCase().includes(searchPic.toLowerCase())) &&
// // // //         !formData.pics.some((p: any) => p.email === u.email)
// // // //     );
    
// // // //     // Gabungan Kategori Pelaksana (Default + CMS)
// // // //     const allOrgTypes = ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota', ...cmsCategories];

// // // //     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><div className="bg-white p-5 rounded-lg flex items-center gap-3"><Loader2 className="animate-spin text-red-600"/> Memuat data...</div></div>;

// // // //     return (
// // // //         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-hidden" role="dialog" aria-modal="true">
// // // //             <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
                
// // // //                 {/* HEADER */}
// // // //                 <div className="bg-gray-900 text-white p-5 flex justify-between items-center shrink-0">
// // // //                     <div><h2 className="text-xl font-bold">{course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2><p className="text-xs text-gray-400 mt-1">Lengkapi data pelatihan.</p></div>
// // // //                     <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" title="Tutup" aria-label="Tutup"><X size={24}/></button>
// // // //                 </div>

// // // //                 <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0">
// // // //                     {[
// // // //                         { id: 'info', label: '1. Informasi Dasar', icon: FileText },
// // // //                         { id: 'media', label: '2. Media & Visual', icon: ImageIcon },
// // // //                         { id: 'registration', label: '3. Jadwal & Pelaksana', icon: Calendar },
// // // //                         { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award },
// // // //                         { id: 'team', label: '5. Tim & PIC', icon: Users },
// // // //                     ].map((tab) => (
// // // //                         <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap outline-none ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
// // // //                             <tab.icon size={16} /> {tab.label}
// // // //                         </button>
// // // //                     ))}
// // // //                 </div>

// // // //                 <form id="courseForm" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    
// // // //                     {/* TAB 1: INFO */}
// // // //                     {activeTab === 'info' && (
// // // //                         <div className="space-y-6 max-w-4xl mx-auto">
// // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // //                                 <div><label htmlFor="courseTitle" className="block text-sm font-bold text-gray-700 mb-1">Judul Pelatihan <span className="text-red-500">*</span></label><input id="courseTitle" required type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: Orientasi Kepalangmerahan" value={formData.title} onChange={e => handleChange('title', e.target.value)} title="Judul Pelatihan" /></div>
// // // //                                 <div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap</label><div className="bg-white rounded-lg border overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" placeholder="Tulis deskripsi..." /></div></div>
// // // //                             </div>

// // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
// // // //                                 <div>
// // // //                                     <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label>
// // // //                                     <div className="flex gap-4">
// // // //                                         <div onClick={() => handleChange('programType', 'training')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'training' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// // // //                                             <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'training' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'training' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// // // //                                             <span className="text-sm text-gray-700 font-medium">Diklat Resmi</span>
// // // //                                         </div>
// // // //                                         <div onClick={() => handleChange('programType', 'course')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'course' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// // // //                                             <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'course' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'course' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// // // //                                             <span className="text-sm text-gray-700 font-medium">Kursus Mandiri</span>
// // // //                                         </div>
// // // //                                     </div>
// // // //                                 </div>
// // // //                                 <div className="w-px bg-gray-200"></div>
// // // //                                 <div className="flex items-center gap-3">
// // // //                                     <div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none">
// // // //                                         <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div>
// // // //                                         <span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     )}

// // // //                     {/* TAB 2: MEDIA */}
// // // //                     {activeTab === 'media' && (
// // // //                         <div className="max-w-3xl mx-auto space-y-6">
// // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                                 <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) <span className="text-red-500">*</span></label>
// // // //                                 <div className="flex gap-6 items-start">
// // // //                                     <div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
// // // //                                         {formData.thumbnailUrl ? <img src={getDisplayUrl(formData.thumbnailUrl)} alt="Preview Cover" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1" /><span className="text-xs">Belum ada gambar</span></div>}
// // // //                                         {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
// // // //                                     </div>
// // // //                                     <div className="flex-1">
// // // //                                         <p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p>
// // // //                                         <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" title="Input Gambar"/>
// // // //                                         <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2" title="Upload Gambar"><Upload size={16}/> Upload Gambar</button>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             </div>
// // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                                 <label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label>
// // // //                                 <div className="flex gap-2"><div className="p-3 bg-gray-100 rounded-l-lg border border-r-0 text-gray-500"><Video size={18}/></div><input type="text" className="flex-1 p-2.5 border rounded-r-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} title="URL Video Youtube" /></div>
// // // //                                 {formData.promoVideoUrl && formData.promoVideoUrl.includes('youtube') && (
// // // //                                     <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 aspect-video w-full max-w-sm bg-black">
// // // //                                         <iframe width="100%" height="100%" src={getYoutubeEmbed(formData.promoVideoUrl)} title="Preview Video" frameBorder="0" allowFullScreen></iframe>
// // // //                                     </div>
// // // //                                 )}
// // // //                             </div>
// // // //                         </div>
// // // //                     )}

// // // //                     {/* TAB 3: JADWAL & PELAKSANA (PENDAFTARAN) */}
// // // //                     {activeTab === 'registration' && (
// // // //                         <div className="max-w-4xl mx-auto space-y-6">
                            
// // // //                             {/* Jadwal */}
// // // //                             <div className="grid grid-cols-2 gap-6">
// // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
// // // //                                     <div className="flex items-center gap-2 mb-2">
// // // //                                         <div onClick={() => handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// // // //                                             <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // //                                             <span className="text-sm text-gray-600">Buka Selamanya</span>
// // // //                                         </div>
// // // //                                     </div>
// // // //                                     {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai</span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} title="Mulai Pendaftaran" /></div><div><span className="text-xs text-gray-500 block mb-1">Selesai</span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} title="Selesai Pendaftaran" /></div></div>)}
// // // //                                 </div>
// // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
// // // //                                     <div className="flex items-center gap-2 mb-2">
// // // //                                         <div onClick={() => handleChange('execIsFlexible', !formData.execIsFlexible)} className="flex items-center gap-2 cursor-pointer select-none">
// // // //                                             <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsFlexible ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.execIsFlexible && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // //                                             <span className="text-sm text-gray-600">Fleksibel</span>
// // // //                                         </div>
// // // //                                     </div>
// // // //                                     {!formData.execIsFlexible && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai</span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} title="Mulai Pelaksanaan" /></div><div><span className="text-xs text-gray-500 block mb-1">Selesai</span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} title="Selesai Pelaksanaan" /></div></div>)}
// // // //                                 </div>
// // // //                             </div>
                            
// // // //                             {/* [FITUR BARU] PELAKSANA (DATA WILAYAH) */}
// // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // //                                 <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan</label>
// // // //                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                                     <select className="w-full p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500" value={organizerType} onChange={(e) => { setOrganizerType(e.target.value); setSelectedProvId(''); setSelectedCityId(''); }} aria-label="Tipe Pelaksana">
// // // //                                         {allOrgTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
// // // //                                     </select>
// // // //                                     {organizerType === 'PMI Provinsi' && (
// // // //                                         <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi">
// // // //                                             <option value="">-- Pilih Provinsi --</option>
// // // //                                             {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// // // //                                         </select>
// // // //                                     )}
// // // //                                     {organizerType === 'PMI Kabupaten/Kota' && (
// // // //                                         <>
// // // //                                             <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi">
// // // //                                                 <option value="">-- Pilih Provinsi --</option>
// // // //                                                 {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// // // //                                             </select>
// // // //                                             <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedCityId} onChange={e => setSelectedCityId(e.target.value)} disabled={!selectedProvId} aria-label="Pilih Kab/Kota">
// // // //                                                 <option value="">-- Pilih Kab/Kota --</option>
// // // //                                                 {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
// // // //                                             </select>
// // // //                                         </>
// // // //                                     )}
// // // //                                     {!['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota'].includes(organizerType) && (
// // // //                                         <input className="w-full p-2.5 border rounded-lg" placeholder="Nama Unit / Organisasi..." value={organizerName} onChange={e => setOrganizerName(e.target.value)} title="Nama Organisasi" />
// // // //                                     )}
// // // //                                 </div>
// // // //                             </div>
                            
// // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan Peserta</h3>
// // // //                                 <div className="space-y-4">
// // // //                                      <div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'auto' ? 'bg-green-50 border-green-200 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'auto' ? 'border-green-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'auto' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Otomatis (Langsung Aktif)</span><span className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</span></div></div>
// // // //                                      <div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'manual' ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'manual' ? 'border-yellow-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'manual' && <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Manual (Verifikasi Admin)</span><span className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</span></div></div>
// // // //                                 </div>
// // // //                             </div>

// // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                                 <div className="flex justify-between items-start mb-4">
// // // //                                     <div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div>
// // // //                                     <div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer">
// // // //                                         <div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // //                                         <span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span>
// // // //                                     </div>
// // // //                                 </div>
// // // //                                 {formData.requireDocs && (
// // // //                                     <div className="space-y-3">
// // // //                                         <div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} title="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50" title="Upload Template">{uploadingTemplate ? 'Mengupload...' : <><Upload size={14}/> Upload Template Baru</>}</button></div>
// // // //                                         {formData.registrationTemplates.map((item: any, idx: number) => (
// // // //                                             <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
// // // //                                                 <div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div>
// // // //                                                 <div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} title="Nama Dokumen"/>
// // // //                                                 <a href={getDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()} title="Lihat File"><Download size={10} /> Lihat File Uploaded</a></div>
// // // //                                                 <button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Hapus Dokumen"><Trash2 size={16} /></button>
// // // //                                             </div>
// // // //                                         ))}
// // // //                                     </div>
// // // //                                 )}
// // // //                             </div>
// // // //                         </div>
// // // //                     )}

// // // //                     {/* TAB 4: FASILITAS */}
// // // //                     {activeTab === 'facilities' && (
// // // //                         <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
// // // //                             <div className="space-y-6">
// // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" title="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div>
// // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.estimatedDuration} disabled title="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.totalJp} disabled title="Total JP"/></div></div></div>
// // // //                             </div>
// // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas</label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} title="Input Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" title="Tambah Fasilitas"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" title="Hapus Fasilitas"><X size={14}/></button></div>))}</div></div>
// // // //                         </div>
// // // //                     )}

// // // //                     {/* TAB 5: TIM & PIC */}
// // // //                     {activeTab === 'team' && (
// // // //                         <div className="max-w-4xl mx-auto space-y-8">
                            
// // // //                             {/* A. PILIH TIM FASILITATOR (SEARCH & SELECT) */}
// // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                                 <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
// // // //                                 <p className="text-xs text-gray-500 mb-4">*Mencakup Admin, Superadmin, dan Fasilitator.</p>
                                
// // // //                                 {/* List Terpilih */}
// // // //                                 <div className="mb-4 space-y-2">
// // // //                                     {selectedFacilitators.map(fac => (
// // // //                                         <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100 animate-in slide-in-from-top-1">
// // // //                                             <div className="flex items-center gap-3">
// // // //                                                 <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-xs border border-red-200">{fac.name?.charAt(0)}</div>
// // // //                                                 <div>
// // // //                                                     <span className="text-sm font-bold text-red-900 block">{fac.name}</span>
// // // //                                                     <span className="text-[10px] text-red-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full w-fit border border-red-100"><Clock size={10}/> Menunggu Persetujuan</span>
// // // //                                                 </div>
// // // //                                             </div>
// // // //                                             <button type="button" onClick={() => toggleFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
// // // //                                         </div>
// // // //                                     ))}
// // // //                                 </div>

// // // //                                 {/* Search Bar */}
// // // //                                 <div className="relative">
// // // //                                     <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // //                                     <input 
// // // //                                         type="text" 
// // // //                                         placeholder="Cari nama atau email fasilitator untuk diundang..." 
// // // //                                         className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" 
// // // //                                         value={searchFacilitator} 
// // // //                                         onChange={(e) => setSearchFacilitator(e.target.value)} 
// // // //                                         title="Cari Fasilitator"
// // // //                                     />
// // // //                                     {searchFacilitator && (
// // // //                                         <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// // // //                                             {availableFacilitators.length > 0 ? availableFacilitators.map(fac => (
// // // //                                                 <button key={fac._id || fac.id} type="button" onClick={() => { toggleFacilitator(fac._id || fac.id); setSearchFacilitator(''); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// // // //                                                     <div className="flex items-center gap-3">
// // // //                                                         <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{fac.name?.charAt(0)}</div>
// // // //                                                         <div><p className="text-sm font-bold text-gray-700">{fac.name}</p><p className="text-[10px] text-gray-400">{fac.email} • {fac.role}</p></div>
// // // //                                                     </div>
// // // //                                                     <Plus size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // // //                                                 </button>
// // // //                                             )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // // //                                         </div>
// // // //                                     )}
// // // //                                 </div>
// // // //                             </div>
                            
// // // //                             {/* B. PENANGGUNG JAWAB & KONTAK */}
// // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                                 <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
                                
// // // //                                 <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
// // // //                                     <div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div>
// // // //                                     <div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div>
// // // //                                 </div>

// // // //                                 <div className="space-y-4">
// // // //                                     <div className="flex justify-between items-center"><label className="text-sm font-bold text-gray-700">Daftar PIC Tambahan (Maks 3)</label></div>
// // // //                                     {formData.pics.map((pic: any, idx: number) => (
// // // //                                         <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-200 animate-in slide-in-from-top-1">
// // // //                                             <div className="flex items-center gap-3">
// // // //                                                 <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-xs">{pic.name?.charAt(0)}</div>
// // // //                                                 <div>
// // // //                                                     <span className="text-sm font-bold text-gray-900 block">{pic.name}</span>
// // // //                                                     <div className="flex gap-2">
// // // //                                                         <span className="text-[10px] text-blue-600 flex items-center gap-1 bg-blue-50 px-1.5 py-0.5 rounded-full border border-blue-100"><Clock size={10}/> Menunggu Persetujuan</span>
// // // //                                                         <span className="text-[10px] text-gray-500">{pic.email}</span>
// // // //                                                     </div>
// // // //                                                 </div>
// // // //                                             </div>
// // // //                                             <button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
// // // //                                         </div>
// // // //                                     ))}
// // // //                                     {formData.pics.length < 3 && (
// // // //                                         <div className="relative">
// // // //                                             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // //                                             <input 
// // // //                                                 type="text" 
// // // //                                                 placeholder="Cari user untuk dijadikan PIC..." 
// // // //                                                 className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" 
// // // //                                                 value={searchPic} 
// // // //                                                 onChange={(e) => setSearchPic(e.target.value)} 
// // // //                                                 title="Cari PIC"
// // // //                                             />
// // // //                                             {searchPic && (
// // // //                                                 <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// // // //                                                     {filteredPicCandidates.length > 0 ? filteredPicCandidates.map(user => (
// // // //                                                         <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// // // //                                                             <div className="flex items-center gap-3">
// // // //                                                                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div>
// // // //                                                                 <div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div>
// // // //                                                             </div>
// // // //                                                             <UserPlus size={16} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // // //                                                         </button>
// // // //                                                     )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // // //                                                 </div>
// // // //                                             )}
// // // //                                         </div>
// // // //                                     )}
// // // //                                 </div>
// // // //                             </div>

// // // //                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                                 <div className="flex justify-between items-center mb-4">
// // // //                                     <h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckSquare size={18}/> Kontak Utama (Landing Page)</h3>
// // // //                                 </div>
// // // //                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                                     <div><label className="text-xs font-bold text-gray-500">Nama Kontak</label><input name="contactName" value={formData.contactName} onChange={handleChange} className="w-full p-2 border rounded" title="Nama Kontak" /></div>
// // // //                                     <div><label className="text-xs font-bold text-gray-500">Email Kontak</label><input name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="w-full p-2 border rounded" title="Email Kontak" /></div>
// // // //                                     <div className="md:col-span-2"><label className="text-xs font-bold text-gray-500">Nomor Telepon/WA</label><input name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="w-full p-2 border rounded" placeholder="628..." title="Telepon Kontak" /></div>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     )}
// // // //                 </form>

// // // //                 <div className="bg-white border-t p-4 flex justify-end gap-3 shrink-0">
// // // //                     <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-orange-200 bg-orange-50 hover:bg-orange-100 transition-colors mr-auto max-w-lg">
// // // //                         <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 ${isAgreed ? 'bg-orange-500 border-orange-600' : 'bg-white border-orange-300'}`}>
// // // //                             <input type="checkbox" className="hidden" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} title="Disclaimer"/>
// // // //                             {isAgreed && <CheckCircle size={14} className="text-white" />}
// // // //                         </div>
// // // //                         <div className="text-xs text-orange-900 leading-relaxed">
// // // //                             <span className="font-bold block mb-0.5 flex items-center gap-1"><ShieldCheck size={14}/> Pernyataan Disclaimer</span>
// // // //                             Saya menyatakan bahwa data pelatihan ini benar dan bertanggung jawab atas konten yang disajikan.
// // // //                         </div>
// // // //                     </label>

// // // //                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50" title="Batal">Batal</button>
// // // //                     <button onClick={handleSubmit} disabled={loading || !isAgreed} className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" title="Simpan">
// // // //                         {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"/> : <Save size={18}/>} Simpan Pelatihan
// // // //                     </button>
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }




// // 'use client';

// // import { useState, useRef, useEffect } from 'react';
// // import { 
// //     X, Upload, Plus, Trash2, Save, Calendar, 
// //     Video, Image as ImageIcon, Users, FileText, 
// //     CheckCircle, AlertCircle, Award, Clock, Search, 
// //     Download, File, Info, Loader2, MessageCircle, UserPlus, 
// //     ShieldCheck, CheckSquare, Building
// // } from 'lucide-react';
// // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // import { getProvinces, getRegencies } from '@/lib/indonesia';
// // import dynamic from 'next/dynamic';
// // import 'react-quill/dist/quill.snow.css';
// // import axios from 'axios'; 

// // const ReactQuill = dynamic(() => import('react-quill'), { 
// //     ssr: false,
// //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // });

// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // interface CourseFormModalProps {
// //     course?: any; 
// //     onClose: () => void;
// //     onSuccess: () => void;
// //     facilitators: any[]; 
// //     currentUser: any; 
// // }

// // export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
// //     const [activeTab, setActiveTab] = useState('info');
// //     const [loading, setLoading] = useState(false);
// //     const [fetchingDetail, setFetchingDetail] = useState(false);
    
// //     // Refs
// //     const fileInputRef = useRef<HTMLInputElement>(null); 
// //     const templateInputRef = useRef<HTMLInputElement>(null); 
    
// //     // State Search & Users
// //     const [searchFacilitator, setSearchFacilitator] = useState('');
// //     const [searchPic, setSearchPic] = useState('');
// //     const [allUsers, setAllUsers] = useState<any[]>([]);
    
// //     // State Disclaimer Popup
// //     const [showDisclaimer, setShowDisclaimer] = useState(false);
// //     const [isAgreed, setIsAgreed] = useState(false);

// //     // State Pelaksana & Wilayah
// //     const [organizerType, setOrganizerType] = useState('PMI Pusat');
// //     const [organizerName, setOrganizerName] = useState(''); 
// //     const [provinces, setProvinces] = useState<any[]>([]);
// //     const [regencies, setRegencies] = useState<any[]>([]);
// //     const [selectedProvId, setSelectedProvId] = useState('');
// //     const [selectedCityId, setSelectedCityId] = useState('');
// //     const [cmsCategories, setCmsCategories] = useState<string[]>([]);

// //     // State UI Tambahan
// //     const [newFacility, setNewFacility] = useState('');
// //     const [uploadingCover, setUploadingCover] = useState(false);
// //     const [uploadingTemplate, setUploadingTemplate] = useState(false);

// //     // --- INITIAL STATE (Sesuai Script Lama) ---
// //     const defaultState = {
// //         title: '', description: '', 
// //         programType: 'training', 
// //         hasCertificate: true,
        
// //         regIsForever: false, regStartDate: '', regEndDate: '',
// //         execIsForever: false, execStartDate: '', execEndDate: '', // execIsForever = Flexible
        
// //         thumbnailUrl: '', promoVideoUrl: '',
        
// //         registrationMethod: 'auto', 
// //         requireDocs: true, 
// //         registrationTemplates: [] as any[], 
        
// //         price: 0, estimatedDuration: 0, totalJp: 0, 
// //         facilities: [] as string[], 
// //         facilitatorIds: [] as string[],
// //         pics: [] as any[], 
        
// //         creatorInfo: null as any,
// //         contactName: '', contactPhone: '', contactEmail: ''
// //     };

// //     const [formData, setFormData] = useState(defaultState);

// //     // Helper URL
// //     const getDisplayUrl = (url: string) => {
// //         if (!url) return '';
// //         if (url.startsWith('http')) return url;
// //         const cleanPath = url.startsWith('/') ? url : `/${url}`;
// //         return `${API_BASE_URL}${cleanPath}`;
// //     };

// //     const getYoutubeEmbed = (url: string) => {
// //         try {
// //             if (!url) return '';
// //             if (url.includes('embed')) return url;
// //             const videoId = url.split('v=')[1]?.split('&')[0];
// //             if (videoId) return `https://www.youtube.com/embed/${videoId}`;
// //             if (url.includes('youtu.be')) return `https://www.youtube.com/embed/${url.split('/').pop()}`;
// //             return url;
// //         } catch { return url; }
// //     };

// //     // --- LOAD DATA AWAL ---
// //     useEffect(() => {
// //         const provs = getProvinces();
// //         setProvinces(provs);
        
// //         api('/api/content').then(res => {
// //             if (res && res.organizerCategories) setCmsCategories(res.organizerCategories);
// //         }).catch(() => {});
        
// //         // Fetch All Users for PIC Search
// //         api('/api/users').then(res => setAllUsers(res.users || [])).catch(() => setAllUsers(facilitators));
// //     }, []);

// //     // Load Kota saat Provinsi berubah
// //     useEffect(() => {
// //         if (selectedProvId) {
// //             const regs = getRegencies(selectedProvId);
// //             setRegencies(regs);
// //         } else {
// //             setRegencies([]);
// //         }
// //     }, [selectedProvId]);

// //     // Fetch Course Data Detail
// //     useEffect(() => {
// //         const initData = async () => {
// //             if (course && course._id) {
// //                 setFetchingDetail(true);
// //                 try {
// //                     const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
// //                     const fullData = res.course || res.data || res;
// //                     populateForm(fullData);
// //                 } catch (e) {
// //                     populateForm(course);
// //                 } finally {
// //                     setFetchingDetail(false);
// //                 }
// //             } else {
// //                 if (currentUser) {
// //                      setFormData(prev => ({
// //                         ...prev,
// //                         contactName: currentUser.name,
// //                         contactEmail: currentUser.email,
// //                         contactPhone: currentUser.phoneNumber || ''
// //                      }));
// //                 }
// //             }
// //         };
// //         initData();
// //     }, [course]);

// //     const populateForm = (data: any) => {
// //         const formatDate = (d: string) => {
// //             if (!d) return '';
// //             try { return new Date(d).toISOString().split('T')[0]; } catch (e) { return ''; }
// //         };

// //         setFormData({
// //             title: data.title || '', description: data.description || '', 
// //             programType: data.programType || 'training', 
// //             hasCertificate: data.hasCertificate ?? true,
            
// //             regIsForever: data.registrationPeriod?.isForever ?? false,
// //             regStartDate: formatDate(data.registrationPeriod?.startDate),
// //             regEndDate: formatDate(data.registrationPeriod?.endDate),

// //             execIsForever: data.executionPeriod?.isForever ?? false,
// //             execStartDate: formatDate(data.executionPeriod?.startDate),
// //             execEndDate: formatDate(data.executionPeriod?.endDate),

// //             thumbnailUrl: data.thumbnailUrl || '', promoVideoUrl: data.promoVideoUrl || '',

// //             registrationMethod: data.registrationMethod || 'auto',
// //             requireDocs: data.registrationConfig?.requireDocs !== false,
// //             registrationTemplates: Array.isArray(data.registrationConfig?.templates) ? data.registrationConfig.templates : [],

// //             price: Number(data.price) || 0, 
// //             estimatedDuration: Number(data.estimatedDuration) || 0, 
// //             totalJp: Number(data.totalJp) || 0,
            
// //             facilities: Array.isArray(data.facilities) ? data.facilities : [],
// //             facilitatorIds: Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [],
// //             pics: Array.isArray(data.pics) ? data.pics : [],
            
// //             creatorInfo: data.creatorInfo || null,
// //             contactName: data.contact?.name || data.creatorInfo?.name || '',
// //             contactEmail: data.contact?.email || data.creatorInfo?.email || '',
// //             contactPhone: data.contact?.phone || data.creatorInfo?.contact || ''
// //         });

// //         // Parse Organizer Data
// //         if (data.organizer) {
// //             const org = data.organizer;
// //             if (org === 'PMI Pusat') {
// //                 setOrganizerType('PMI Pusat');
// //             } else if (org.startsWith('PMI Provinsi')) {
// //                 setOrganizerType('PMI Provinsi');
// //                 const pName = org.split(': ')[1]?.trim();
// //                 const foundProv = getProvinces().find((p: any) => p.name === pName);
// //                 if (foundProv) setSelectedProvId(foundProv.code);
// //             } else if (org.startsWith('PMI Kab/Kota')) {
// //                 setOrganizerType('PMI Kabupaten/Kota');
// //                 const locParts = org.split(': ')[1]?.split(',');
// //                 if (locParts && locParts.length > 1) {
// //                      const cityName = locParts[0]?.trim();
// //                      const provName = locParts[1]?.trim();
// //                      const foundProv = getProvinces().find((p: any) => p.name === provName);
// //                      if (foundProv) {
// //                          setSelectedProvId(foundProv.code);
// //                          const regs = getRegencies(foundProv.code);
// //                          setRegencies(regs);
// //                          const foundCity = regs.find((r: any) => r.name === cityName);
// //                          if (foundCity) setSelectedCityId(foundCity.code);
// //                      }
// //                 }
// //             } else {
// //                 const parts = org.split(': ');
// //                 setOrganizerType(parts[0]);
// //                 setOrganizerName(parts[1] || '');
// //             }
// //         }
// //     }

// //     // --- HANDLERS ---
// //     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
    
// //     // Facility Handlers
// //     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
// //     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };
    
// //     // Facilitator Handlers
// //     const toggleFacilitator = (id: string) => {
// //         const current = formData.facilitatorIds;
// //         setFormData(prev => ({ ...prev, facilitatorIds: current.includes(id) ? current.filter(fid => fid !== id) : [...current, id] }));
// //     };

// //     // PIC Handlers
// //     const handleAddPicFromSearch = (user: any) => {
// //         if (formData.pics.length >= 3) return alert("Maksimal 3 PIC Tambahan");
// //         if (formData.pics.some((p: any) => p.email === user.email)) return alert("User ini sudah ditambahkan.");

// //         const newPic = {
// //             name: user.name,
// //             pmiStatus: user.role, 
// //             email: user.email,
// //             avatarUrl: user.avatarUrl
// //         };
// //         setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
// //         setSearchPic('');
// //     };

// //     const removePic = (idx: number) => { setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); };
    
// //     // Manual fallback for PIC
// //     const addPic = () => { if (formData.pics.length >= 3) return; setFormData(prev => ({ ...prev, pics: [...prev.pics, { name: '', pmiStatus: '', email: '' }] })); };
// //     const updatePic = (idx: number, field: string, val: string) => { const newPics = [...formData.pics]; newPics[idx] = { ...newPics[idx], [field]: val }; setFormData(prev => ({ ...prev, pics: newPics })); };


// //     // Upload Handlers
// //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const file = e.target.files?.[0]; if (!file) return;
// //         try {
// //             setUploadingCover(true); const fd = new FormData(); fd.append('file', file);
// //             const res = await apiUpload('/api/upload', fd); 
// //             const url = res.url || res.file?.url || res.data?.url;
// //             if (url) handleChange('thumbnailUrl', url);
// //         } catch (err: any) { alert('Gagal: ' + err.message); } finally { setUploadingCover(false); }
// //     };

// //     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const file = e.target.files?.[0]; if (!file) return;
// //         setUploadingTemplate(true);
// //         try {
// //             const fd = new FormData(); fd.append('file', file);
// //             const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
// //             const token = userStr ? JSON.parse(userStr).token : '';

// //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { 
// //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
// //                 withCredentials: true 
// //             });
            
// //             const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url;
// //             if (!rawUrl) throw new Error("Gagal dapat URL.");

// //             setFormData(prev => ({
// //                 ...prev,
// //                 registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }]
// //             }));
// //         } catch (err: any) {
// //             console.error(err);
// //             alert('Upload Gagal: ' + (err.response?.data?.message || err.message));
// //         } finally {
// //             setUploadingTemplate(false);
// //             if (templateInputRef.current) templateInputRef.current.value = '';
// //         }
// //     };

// //     const removeTemplate = (idx: number) => {
// //         if(!confirm("Hapus dokumen ini?")) return;
// //         setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) }));
// //     };

// //     const updateTemplateTitle = (idx: number, v: string) => {
// //         const t = [...formData.registrationTemplates]; t[idx].title = v;
// //         setFormData(prev => ({ ...prev, registrationTemplates: t }));
// //     };

// //     // --- LOGIKA SIMPAN ---
// //     const handlePreSubmit = () => {
// //         if (!formData.title) return alert("Judul wajib diisi!");
// //         // Buka Modal Disclaimer
// //         setShowDisclaimer(true);
// //     };

// //     const handleFinalSubmit = async () => {
// //         if (!isAgreed) return alert("Mohon setujui pernyataan disclaimer.");
        
// //         setLoading(true);
// //         try {
// //             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
// //             const parseDate = (d: string) => d ? new Date(d) : null;

// //             // Konstruksi Pelaksana
// //             let finalOrganizer = organizerType;
// //             if (organizerType === 'PMI Provinsi') {
// //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
// //                 finalOrganizer = `PMI Provinsi: ${provName}`;
// //             } else if (organizerType === 'PMI Kabupaten/Kota') {
// //                 const cityName = regencies.find(r => r.code === selectedCityId)?.name || '';
// //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
// //                 finalOrganizer = `PMI Kabupaten/Kota: ${cityName}, ${provName}`;
// //             } else if (organizerType !== 'PMI Pusat') {
// //                 finalOrganizer = `${organizerType}: ${organizerName}`;
// //             }

// //             const payload = {
// //                 title: formData.title,
// //                 description: formData.description,
// //                 programType: formData.programType,
// //                 hasCertificate: formData.hasCertificate,
// //                 price: Number(formData.price),
// //                 estimatedDuration: Number(formData.estimatedDuration),
// //                 totalJp: Number(formData.totalJp),
// //                 thumbnailUrl: formData.thumbnailUrl,
// //                 promoVideoUrl: formData.promoVideoUrl,
                
// //                 organizer: finalOrganizer,

// //                 registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
// //                 executionPeriod: { isForever: formData.execIsForever, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
// //                 registrationMethod: formData.registrationMethod,
                
// //                 registrationConfig: { 
// //                     requireDocs: formData.requireDocs, 
// //                     templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) 
// //                 },
                
// //                 facilities: formData.facilities,
// //                 facilitatorIds: formData.facilitatorIds,
// //                 pics: validPics,
// //                 creatorInfo: formData.creatorInfo,
// //                 contact: {
// //                     name: formData.contactName,
// //                     email: formData.contactEmail,
// //                     phone: formData.contactPhone
// //                 }
// //             };

// //             if (course?._id) await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
// //             else await api('/api/courses', { method: 'POST', body: payload });

// //             alert("Berhasil disimpan!");
// //             onSuccess();
// //         } catch (err: any) {
// //             console.error(err);
// //             alert("Gagal: " + (err.response?.data?.message || err.message));
// //         } finally {
// //             setLoading(false);
// //             setShowDisclaimer(false);
// //         }
// //     };

// //     // Filter Logic
// //     const selectedFacilitators = facilitators.filter(f => formData.facilitatorIds.includes(f.id || f._id));
// //     const availableFacilitators = facilitators.filter(f => !formData.facilitatorIds.includes(f.id || f._id) && (f.name?.toLowerCase().includes(searchFacilitator.toLowerCase()) || f.email?.toLowerCase().includes(searchFacilitator.toLowerCase())));
// //     const filteredPicCandidates = allUsers.filter(u => ((u.name || '').toLowerCase().includes(searchPic.toLowerCase()) || (u.email || '').toLowerCase().includes(searchPic.toLowerCase())) && !formData.pics.some((p: any) => p.email === u.email));
    
// //     // Gabungan Kategori Pelaksana
// //     const allOrgTypes = ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota', ...cmsCategories];

// //     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><Loader2 className="animate-spin text-white"/></div>;

// //     return (
// //         <>
// //             {/* --- MAIN MODAL --- */}
// //             <div className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
// //                 <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
                    
// //                     {/* HEADER */}
// //                     <div className="bg-gray-900 text-white p-5 flex justify-between items-center shrink-0">
// //                         <div><h2 className="text-xl font-bold">{course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2><p className="text-xs text-gray-400 mt-1">Lengkapi data pelatihan.</p></div>
// //                         <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" title="Tutup" aria-label="Tutup"><X size={24}/></button>
// //                     </div>

// //                     {/* TABS */}
// //                     <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0">
// //                         {[{ id: 'info', label: '1. Informasi Dasar', icon: FileText }, { id: 'media', label: '2. Media & Visual', icon: ImageIcon }, { id: 'registration', label: '3. Jadwal & Pelaksana', icon: Calendar }, { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award }, { id: 'team', label: '5. Tim & PIC', icon: Users }].map((tab) => (
// //                             <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`} aria-label={`Tab ${tab.label}`}><tab.icon size={16} /> {tab.label}</button>
// //                         ))}
// //                     </div>

// //                     <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                        
// //                         {/* TAB 1: INFO */}
// //                         {activeTab === 'info' && (
// //                             <div className="space-y-6 max-w-4xl mx-auto">
// //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// //                                     <div><label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="inpTitle">Judul Pelatihan <span className="text-red-500">*</span></label><input id="inpTitle" required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: Orientasi Kepalangmerahan" value={formData.title} onChange={e => handleChange('title', e.target.value)} aria-label="Judul"/></div>
// //                                     <div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap <span className="text-red-500">*</span></label><div className="bg-white border rounded-lg overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" aria-label="Deskripsi" /></div></div>
// //                                 </div>

// //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
// //                                     <div>
// //                                         <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label>
// //                                         <div className="flex gap-4">
// //                                             <div onClick={() => handleChange('programType', 'training')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'training' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// //                                                 <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'training' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'training' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// //                                                 <span className="text-sm text-gray-700 font-medium">Diklat Resmi</span>
// //                                             </div>
// //                                             <div onClick={() => handleChange('programType', 'course')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'course' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// //                                                 <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'course' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'course' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// //                                                 <span className="text-sm text-gray-700 font-medium">Kursus Mandiri</span>
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                     <div className="w-px bg-gray-200"></div>
// //                                     <div className="flex items-center gap-3">
// //                                         <div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none">
// //                                             <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div>
// //                                             <span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         )}

// //                         {/* TAB 2: MEDIA */}
// //                         {activeTab === 'media' && (
// //                             <div className="max-w-3xl mx-auto space-y-6">
// //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// //                                     <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) <span className="text-red-500">*</span></label>
// //                                     <div className="flex gap-6 items-start">
// //                                         <div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
// //                                             {formData.thumbnailUrl ? <img src={getDisplayUrl(formData.thumbnailUrl)} alt="Preview Cover" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1" /><span className="text-xs">Belum ada gambar</span></div>}
// //                                             {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
// //                                         </div>
// //                                         <div className="flex-1">
// //                                             <p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p>
// //                                             <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" title="Input Gambar"/>
// //                                             <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2" title="Upload Gambar"><Upload size={16}/> Upload Gambar</button>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// //                                     <label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label>
// //                                     <div className="flex gap-2"><div className="p-3 bg-gray-100 rounded-l-lg border border-r-0 text-gray-500"><Video size={18}/></div><input type="text" className="flex-1 p-2.5 border rounded-r-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} aria-label="URL Video Youtube" /></div>
// //                                 </div>
// //                             </div>
// //                         )}

// //                         {/* TAB 3: JADWAL & PELAKSANA */}
// //                         {activeTab === 'registration' && (
// //                             <div className="max-w-4xl mx-auto space-y-6">
// //                                 <div className="grid grid-cols-2 gap-6">
// //                                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// //                                         <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
// //                                         <div className="flex items-center gap-2 mb-2">
// //                                             <div onClick={() => handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// //                                                 <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// //                                                 <span className="text-sm text-gray-600">Buka Selamanya</span>
// //                                             </div>
// //                                         </div>
// //                                         {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} title="Mulai Pendaftaran" /></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} title="Selesai Pendaftaran" /></div></div>)}
// //                                     </div>
// //                                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// //                                         <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
// //                                         <div className="flex items-center gap-2 mb-2">
// //                                             <div onClick={() => handleChange('execIsForever', !formData.execIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// //                                                 <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.execIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// //                                                 <span className="text-sm text-gray-600">Fleksibel</span>
// //                                             </div>
// //                                         </div>
// //                                         {!formData.execIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} aria-label="Pelaksanaan Mulai"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} aria-label="Pelaksanaan Selesai"/></div></div>)}
// //                                     </div>
// //                                 </div>

// //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan <span className="text-red-500">*</span></label>
// //                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                                         <select className="w-full p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500" value={organizerType} onChange={(e) => { setOrganizerType(e.target.value); setSelectedProvId(''); setSelectedCityId(''); }} title="Tipe Pelaksana">
// //                                             {allOrgTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
// //                                         </select>
// //                                         {organizerType === 'PMI Provinsi' && (
// //                                             <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi">
// //                                                 <option value="">-- Pilih Provinsi --</option>
// //                                                 {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// //                                             </select>
// //                                         )}
// //                                         {organizerType === 'PMI Kabupaten/Kota' && (
// //                                             <>
// //                                                 <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi">
// //                                                     <option value="">-- Pilih Provinsi --</option>
// //                                                     {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// //                                                 </select>
// //                                                 <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedCityId} onChange={e => setSelectedCityId(e.target.value)} disabled={!selectedProvId} aria-label="Pilih Kab/Kota">
// //                                                     <option value="">-- Pilih Kab/Kota --</option>
// //                                                     {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
// //                                                 </select>
// //                                             </>
// //                                         )}
// //                                         {!['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota'].includes(organizerType) && (
// //                                             <input type="text" className="w-full p-2.5 border rounded-lg" placeholder="Nama Unit / Organisasi..." value={organizerName} onChange={e => setOrganizerName(e.target.value)} aria-label="Nama Organisasi"/>
// //                                         )}
// //                                     </div>
// //                                 </div>
                                
// //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// //                                     <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan Peserta</h3>
// //                                     <div className="space-y-4">
// //                                          <div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'auto' ? 'bg-green-50 border-green-200 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'auto' ? 'border-green-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'auto' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Otomatis (Langsung Aktif)</span><span className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</span></div></div>
// //                                          <div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'manual' ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'manual' ? 'border-yellow-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'manual' && <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Manual (Verifikasi Admin)</span><span className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</span></div></div>
// //                                     </div>
// //                                 </div>

// //                                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// //                                     <div className="flex justify-between items-start mb-4">
// //                                         <div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div>
// //                                         <div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer">
// //                                             <div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// //                                             <span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span>
// //                                         </div>
// //                                     </div>
// //                                     {formData.requireDocs && (
// //                                         <div className="space-y-3">
// //                                             <div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} title="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50" title="Upload Template">{uploadingTemplate ? 'Mengupload...' : <><Upload size={14}/> Upload Template Baru</>}</button></div>
// //                                             {formData.registrationTemplates.length === 0 ? <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">Belum ada dokumen.</div> : formData.registrationTemplates.map((item: any, idx: number) => (
// //                                                 <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
// //                                                     <div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div>
// //                                                     <div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} title="Nama Dokumen"/><a href={getDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()} title="Lihat File"><Download size={10} /> Lihat File Uploaded</a></div>
// //                                                     <button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Hapus Dokumen"><Trash2 size={16} /></button>
// //                                                 </div>
// //                                             ))}
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                             </div>
// //                         )}

// //                         {/* TAB 4: FASILITAS */}
// //                         {activeTab === 'facilities' && (
// //                             <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
// //                                 <div className="space-y-6">
// //                                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" aria-label="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div>
// //                                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.estimatedDuration} disabled aria-label="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.totalJp} disabled aria-label="Total JP"/></div></div></div>
// //                                 </div>
// //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas <span className="text-red-500">*</span></label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} title="Input Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" title="Tambah Fasilitas"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" title="Hapus Fasilitas"><X size={14}/></button></div>))}</div></div>
// //                             </div>
// //                         )}

// //                         {/* TAB 5: TIM & PIC */}
// //                         {activeTab === 'team' && (
// //                             <div className="max-w-4xl mx-auto space-y-8">
                                
// //                                 {/* A. PILIH TIM FASILITATOR (SEARCH & SELECT) */}
// //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// //                                     <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
// //                                     <p className="text-xs text-gray-500 mb-4">*Mencakup Admin, Superadmin, dan Fasilitator.</p>
                                    
// //                                     {/* List Terpilih */}
// //                                     <div className="mb-4 space-y-2">
// //                                         {selectedFacilitators.map(fac => (
// //                                             <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100 animate-in slide-in-from-top-1">
// //                                                 <div className="flex items-center gap-3">
// //                                                     <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-xs border border-red-200">{fac.name?.charAt(0)}</div>
// //                                                     <div>
// //                                                         <span className="text-sm font-bold text-red-900 block">{fac.name}</span>
// //                                                         <span className="text-[10px] text-red-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full w-fit border border-red-100"><Clock size={10}/> Menunggu Persetujuan</span>
// //                                                     </div>
// //                                                 </div>
// //                                                 <button type="button" onClick={() => toggleFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
// //                                             </div>
// //                                         ))}
// //                                     </div>

// //                                     {/* Search Bar */}
// //                                     <div className="relative">
// //                                         <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// //                                         <input 
// //                                             type="text" 
// //                                             placeholder="Cari nama atau email fasilitator untuk diundang..." 
// //                                             className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" 
// //                                             value={searchFacilitator} 
// //                                             onChange={(e) => setSearchFacilitator(e.target.value)} 
// //                                             title="Cari Fasilitator"
// //                                         />
// //                                         {searchFacilitator && (
// //                                             <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// //                                                 {availableFacilitators.length > 0 ? availableFacilitators.map(fac => (
// //                                                     <button key={fac._id || fac.id} type="button" onClick={() => { toggleFacilitator(fac._id || fac.id); setSearchFacilitator(''); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// //                                                         <div className="flex items-center gap-3">
// //                                                             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{fac.name?.charAt(0)}</div>
// //                                                             <div><p className="text-sm font-bold text-gray-700">{fac.name}</p><p className="text-[10px] text-gray-400">{fac.email} • {fac.role}</p></div>
// //                                                         </div>
// //                                                         <Plus size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// //                                                     </button>
// //                                                 )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// //                                             </div>
// //                                         )}
// //                                     </div>
// //                                 </div>
                                
// //                                 {/* B. PENANGGUNG JAWAB & KONTAK */}
// //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// //                                     <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
                                    
// //                                     <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
// //                                         <div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div>
// //                                         <div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div>
// //                                     </div>

// //                                     <div className="space-y-2 mb-4">
// //                                         <label className="text-sm font-bold text-gray-700 block">Daftar PIC Tambahan (Maks 3)</label>
// //                                         {formData.pics.map((pic: any, idx: number) => (
// //                                             <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in slide-in-from-top-1">
// //                                                 <div className="flex items-center gap-3">
// //                                                     <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">{pic.name?.charAt(0)}</div>
// //                                                     <div>
// //                                                         <span className="text-sm font-bold text-blue-900 block">{pic.name}</span>
// //                                                         <div className="flex gap-2">
// //                                                             <span className="text-[10px] text-blue-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full border border-blue-100"><Clock size={10}/> Menunggu Persetujuan</span>
// //                                                             <span className="text-[10px] text-gray-500">{pic.email}</span>
// //                                                         </div>
// //                                                     </div>
// //                                                 </div>
// //                                                 <button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
// //                                             </div>
// //                                         ))}
// //                                     </div>

// //                                     {/* 3. Search PIC (Hanya jika < 3) */}
// //                                     {formData.pics.length < 3 ? (
// //                                         <div className="relative">
// //                                             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// //                                             <input 
// //                                                 type="text" 
// //                                                 placeholder="Cari user untuk dijadikan PIC..." 
// //                                                 className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" 
// //                                                 value={searchPic} 
// //                                                 onChange={(e) => setSearchPic(e.target.value)} 
// //                                                 title="Cari PIC"
// //                                             />
// //                                             {searchPic && (
// //                                                 <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// //                                                     {filteredPicCandidates.length > 0 ? filteredPicCandidates.map(user => (
// //                                                         <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// //                                                             <div className="flex items-center gap-3">
// //                                                                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div>
// //                                                                 <div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div>
// //                                                             </div>
// //                                                             <UserPlus size={16} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// //                                                         </button>
// //                                                     )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// //                                                 </div>
// //                                             )}
// //                                         </div>
// //                                     ) : (
// //                                         <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 rounded-lg border border-gray-200">Kuota PIC penuh (Maksimal 3).</div>
// //                                     )}
// //                                 </div>

// //                                 {/* C. KONTAK UTAMA (Sesuai Script Lama) */}
// //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// //                                     <div className="flex justify-between items-center mb-4">
// //                                         <h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckSquare size={18}/> Kontak Utama (Landing Page)</h3>
// //                                     </div>
// //                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                                         <div><label className="text-xs font-bold text-gray-500">Nama Kontak <span className="text-red-500">*</span></label><input name="contactName" value={formData.contactName} onChange={(e) => handleChange('contactName', e.target.value)} className="w-full p-2 border rounded" title="Nama Kontak" /></div>
// //                                         <div><label className="text-xs font-bold text-gray-500">Email Kontak <span className="text-red-500">*</span></label><input name="contactEmail" value={formData.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} className="w-full p-2 border rounded" title="Email Kontak" /></div>
// //                                         <div className="md:col-span-2"><label className="text-xs font-bold text-gray-500">Nomor Telepon/WA <span className="text-red-500">*</span></label><input name="contactPhone" value={formData.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} className="w-full p-2 border rounded" placeholder="628..." title="Telepon Kontak" /></div>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         )}
// //                     </div>

// //                     <div className="bg-white border-t p-4 flex justify-end gap-3 shrink-0">
// //                         <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50" title="Batal">Batal</button>
// //                         <button onClick={handlePreSubmit} className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" title="Simpan">
// //                             {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"/> : <Save size={18}/>} Simpan Pelatihan
// //                         </button>
// //                     </div>
// //                 </div>

// //                 {/* --- DISCLAIMER POPUP (MODAL DI ATAS MODAL) --- */}
// //                 {showDisclaimer && (
// //                     <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in">
// //                         <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 text-center space-y-4">
// //                             <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2"><ShieldCheck size={32} className="text-orange-600"/></div>
// //                             <h3 className="text-xl font-bold text-gray-900">Pernyataan Disclaimer</h3>
// //                             <p className="text-sm text-gray-500 leading-relaxed">Saya menyatakan bahwa data pelatihan ini benar dan bertanggung jawab atas konten yang disajikan. Saya memahami bahwa Fasilitator dan PIC yang ditambahkan akan menerima notifikasi persetujuan di dashboard mereka.</p>
                            
// //                             <label className="flex items-center justify-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors">
// //                                 <input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} className="w-5 h-5 accent-orange-600" aria-label="Setuju"/>
// //                                 <span className="font-bold text-sm text-orange-800">Saya Setuju & Lanjutkan</span>
// //                             </label>

// //                             <div className="flex gap-3 pt-2">
// //                                 <button onClick={() => setShowDisclaimer(false)} className="flex-1 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50">Kembali</button>
// //                                 <button onClick={handleFinalSubmit} disabled={!isAgreed || loading} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
// //                                     {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Proses Simpan
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </>
// //     );
// // }

// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { 
//     X, Upload, Plus, Trash2, Save, Calendar, 
//     Video, Image as ImageIcon, Users, FileText, 
//     CheckCircle, AlertCircle, Award, Clock, Search, 
//     Download, File, Info, Loader2, MessageCircle, UserPlus, 
//     ShieldCheck, CheckSquare, Building
// } from 'lucide-react';
// import { api, apiUpload, getImageUrl } from '@/lib/api';
// import { getProvinces, getRegencies } from '@/lib/indonesia';
// import dynamic from 'next/dynamic';
// import 'react-quill/dist/quill.snow.css';
// import axios from 'axios'; 

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
//     const [allUsers, setAllUsers] = useState<any[]>([]);
    
//     // State Disclaimer Popup
//     const [showDisclaimer, setShowDisclaimer] = useState(false);
//     const [isAgreed, setIsAgreed] = useState(false);

//     // State Pelaksana & Wilayah
//     const [organizerType, setOrganizerType] = useState('PMI Pusat');
//     const [organizerName, setOrganizerName] = useState(''); 
//     const [provinces, setProvinces] = useState<any[]>([]);
//     const [regencies, setRegencies] = useState<any[]>([]);
//     const [selectedProvId, setSelectedProvId] = useState('');
//     const [selectedCityId, setSelectedCityId] = useState('');
//     const [cmsCategories, setCmsCategories] = useState<string[]>([]);

//     // State UI Tambahan
//     const [newFacility, setNewFacility] = useState('');
//     const [uploadingCover, setUploadingCover] = useState(false);
//     const [uploadingTemplate, setUploadingTemplate] = useState(false);

//     // --- INITIAL STATE ---
//     const [formData, setFormData] = useState({
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
//         contactName: '', contactPhone: '', contactEmail: ''
//     });

//     const getDisplayUrl = (url: string) => {
//         if (!url) return '';
//         if (url.startsWith('http')) return url;
//         const cleanPath = url.startsWith('/') ? url : `/${url}`;
//         return `${API_BASE_URL}${cleanPath}`;
//     };

//     // --- LOAD DATA ---
//     useEffect(() => {
//         const provs = getProvinces();
//         setProvinces(provs);
        
//         api('/api/content').then(res => {
//             if (res && res.organizerCategories) setCmsCategories(res.organizerCategories);
//         }).catch(() => {});
        
//         api('/api/users').then(res => setAllUsers(res.users || [])).catch(() => setAllUsers(facilitators));
//     }, []);

//     // Load Kota
//     useEffect(() => {
//         if (selectedProvId) {
//             const regs = getRegencies(selectedProvId);
//             setRegencies(regs);
//         } else {
//             setRegencies([]);
//         }
//     }, [selectedProvId]);

//     // Fetch Detail
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
//                      }));
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
//             facilitatorIds: Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [],
//             pics: Array.isArray(data.pics) ? data.pics : [],
//             creatorInfo: data.creatorInfo || null,
//             contactName: data.contact?.name || data.creatorInfo?.name || '',
//             contactEmail: data.contact?.email || data.creatorInfo?.email || '',
//             contactPhone: data.contact?.phone || data.creatorInfo?.contact || ''
//         });

//         if (data.organizer) {
//             const org = data.organizer;
//             if (org === 'PMI Pusat') { setOrganizerType('PMI Pusat'); }
//             else if (org.startsWith('PMI Provinsi')) {
//                 setOrganizerType('PMI Provinsi');
//                 const pName = org.split(': ')[1]?.trim();
//                 const foundProv = getProvinces().find((p: any) => p.name === pName);
//                 if (foundProv) setSelectedProvId(foundProv.code);
//             } else if (org.startsWith('PMI Kab/Kota')) {
//                 setOrganizerType('PMI Kabupaten/Kota');
//                 const locParts = org.split(': ')[1]?.split(',');
//                 if (locParts && locParts.length > 1) {
//                      const cityName = locParts[0]?.trim();
//                      const provName = locParts[1]?.trim();
//                      const foundProv = getProvinces().find((p: any) => p.name === provName);
//                      if (foundProv) {
//                          setSelectedProvId(foundProv.code);
//                          const regs = getRegencies(foundProv.code);
//                          setRegencies(regs);
//                          const foundCity = regs.find((r: any) => r.name === cityName);
//                          if (foundCity) setSelectedCityId(foundCity.code);
//                      }
//                 }
//             } else {
//                 const parts = org.split(': ');
//                 setOrganizerType(parts[0]);
//                 setOrganizerName(parts[1] || '');
//             }
//         }
//     }

//     // --- HANDLERS ---
//     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
//     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
//     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };
//     const toggleFacilitator = (id: string) => { const current = formData.facilitatorIds; setFormData(prev => ({ ...prev, facilitatorIds: current.includes(id) ? current.filter(fid => fid !== id) : [...current, id] })); };

//     const handleAddPicFromSearch = (user: any) => {
//         if (formData.pics.length >= 3) return alert("Maksimal 3 PIC Tambahan");
//         if (formData.pics.some((p: any) => p.email === user.email)) return alert("User ini sudah ditambahkan.");
//         const newPic = { name: user.name, pmiStatus: user.role, email: user.email, avatarUrl: user.avatarUrl };
//         setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
//         setSearchPic('');
//     };

//     const removePic = (idx: number) => { setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); };
    
//     // Upload
//     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0]; if (!file) return;
//         try { setUploadingCover(true); const fd = new FormData(); fd.append('file', file); const res = await apiUpload('/api/upload', fd); if (res.url) handleChange('thumbnailUrl', res.url); } catch (err: any) { alert('Gagal: ' + err.message); } finally { setUploadingCover(false); }
//     };

//     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0]; if (!file) return;
//         setUploadingTemplate(true);
//         try { const fd = new FormData(); fd.append('file', file); const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null; const token = userStr ? JSON.parse(userStr).token : ''; const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }, withCredentials: true }); const rawUrl = response.data?.data?.url || response.data?.url; if (!rawUrl) throw new Error("Gagal dapat URL."); setFormData(prev => ({ ...prev, registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }] })); } catch (err: any) { alert('Upload Gagal'); } finally { setUploadingTemplate(false); if (templateInputRef.current) templateInputRef.current.value = ''; }
//     };

//     const removeTemplate = (idx: number) => { if(!confirm("Hapus dokumen ini?")) return; setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) })); };
//     const updateTemplateTitle = (idx: number, v: string) => { const t = [...formData.registrationTemplates]; t[idx].title = v; setFormData(prev => ({ ...prev, registrationTemplates: t })); };

//     // --- SIMPAN ---
//     const handlePreSubmit = () => { if (!formData.title) return alert("Judul wajib diisi!"); setShowDisclaimer(true); };

//     const handleFinalSubmit = async () => {
//         if (!isAgreed) return alert("Mohon setujui pernyataan disclaimer.");
//         setLoading(true);
//         try {
//             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
//             const parseDate = (d: string) => d ? new Date(d) : null;

//             let finalOrganizer = organizerType;
//             if (organizerType === 'PMI Provinsi') {
//                 const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
//                 finalOrganizer = `PMI Provinsi: ${provName}`;
//             } else if (organizerType === 'PMI Kabupaten/Kota') {
//                 const cityName = regencies.find(r => r.code === selectedCityId)?.name || '';
//                 const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
//                 finalOrganizer = `PMI Kabupaten/Kota: ${cityName}, ${provName}`;
//             } else if (organizerType !== 'PMI Pusat') {
//                 finalOrganizer = `${organizerType}: ${organizerName}`;
//             }

//             const payload = {
//                 title: formData.title, description: formData.description, programType: formData.programType, hasCertificate: formData.hasCertificate,
//                 price: Number(formData.price), estimatedDuration: Number(formData.estimatedDuration), totalJp: Number(formData.totalJp),
//                 thumbnailUrl: formData.thumbnailUrl, promoVideoUrl: formData.promoVideoUrl,
//                 organizer: finalOrganizer,
//                 registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
//                 executionPeriod: { isForever: formData.execIsForever, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
//                 registrationMethod: formData.registrationMethod,
//                 registrationConfig: { requireDocs: formData.requireDocs, templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) },
//                 facilities: formData.facilities, facilitatorIds: formData.facilitatorIds, pics: validPics,
//                 creatorInfo: formData.creatorInfo, contact: { name: formData.contactName, email: formData.contactEmail, phone: formData.contactPhone }
//             };

//             if (course?._id) await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
//             else await api('/api/courses', { method: 'POST', body: payload });

//             alert("Berhasil disimpan!");
//             onSuccess();
//         } catch (err: any) { alert("Gagal: " + err.message); } finally { setLoading(false); setShowDisclaimer(false); }
//     };

//     // Filter Logic
//     const selectedFacilitators = facilitators.filter(f => formData.facilitatorIds.includes(f.id || f._id));
//     const availableFacilitators = facilitators.filter(f => !formData.facilitatorIds.includes(f.id || f._id) && (f.name?.toLowerCase().includes(searchFacilitator.toLowerCase()) || f.email?.toLowerCase().includes(searchFacilitator.toLowerCase())));
//     const filteredPicCandidates = allUsers.filter(u => ((u.name || '').toLowerCase().includes(searchPic.toLowerCase()) || (u.email || '').toLowerCase().includes(searchPic.toLowerCase())) && !formData.pics.some((p: any) => p.email === u.email));
//     const allOrgTypes = ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota', ...cmsCategories];

//     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><Loader2 className="animate-spin text-white"/></div>;

//     return (
//         <div className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
//             <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
                
//                 {/* HEADER MERAH */}
//                 <div className="bg-[#990000] text-white p-5 flex justify-between items-center shrink-0">
//                     <div><h2 className="text-xl font-bold">{course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2><p className="text-xs text-red-100 mt-1">Lengkapi data pelatihan.</p></div>
//                     <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" title="Tutup" aria-label="Tutup"><X size={24}/></button>
//                 </div>

//                 {/* TABS */}
//                 <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0">
//                     {[{ id: 'info', label: '1. Informasi Dasar', icon: FileText }, { id: 'media', label: '2. Media & Visual', icon: ImageIcon }, { id: 'registration', label: '3. Jadwal & Pelaksana', icon: Calendar }, { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award }, { id: 'team', label: '5. Tim & PIC', icon: Users }].map((tab) => (
//                         <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`} aria-label={tab.label}><tab.icon size={16} /> {tab.label}</button>
//                     ))}
//                 </div>

//                 <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
//                     {activeTab === 'info' && (
//                         <div className="space-y-6 max-w-4xl mx-auto">
//                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
//                                 <div><label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="inpTitle">Judul Pelatihan <span className="text-red-500">*</span></label><input id="inpTitle" required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" value={formData.title} onChange={e => handleChange('title', e.target.value)} aria-label="Judul"/></div>
//                                 <div><label className="block text-sm font-bold text-gray-700 block mb-1">Deskripsi Lengkap <span className="text-red-500">*</span></label><div className="bg-white border rounded-lg overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" aria-label="Deskripsi" /></div></div>
//                             </div>
//                             <div className="bg-white p-6 rounded-xl border flex gap-8">
//                                 <div>
//                                     <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
//                                     <div className="flex gap-4">
//                                         <label className={`flex items-center gap-2 cursor-pointer p-3 rounded-xl border-2 transition-all ${formData.programType === 'training' ? 'bg-red-50 border-red-200' : 'border-gray-200'}`}>
//                                             <input type="radio" name="programType" className="hidden" checked={formData.programType === 'training'} onChange={() => handleChange('programType', 'training')} title="Diklat Resmi"/>
//                                             <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'training' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'training' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
//                                             <span className="text-sm text-gray-700 font-medium">Diklat Resmi</span>
//                                         </label>
//                                         <label className={`flex items-center gap-2 cursor-pointer p-3 rounded-xl border-2 transition-all ${formData.programType === 'course' ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}>
//                                             <input type="radio" name="programType" className="hidden" checked={formData.programType === 'course'} onChange={() => handleChange('programType', 'course')} title="Kursus Mandiri"/>
//                                             <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'course' ? 'border-blue-600' : 'border-gray-400'}`}>{formData.programType === 'course' && <div className="w-2 h-2 bg-blue-600 rounded-full"/>}</div>
//                                             <span className="text-sm text-gray-700 font-medium">Kursus Mandiri</span>
//                                         </label>
//                                     </div>
//                                 </div>
//                                 <div className="w-px bg-gray-200"></div>
//                                 <div className="flex items-center gap-3">
//                                     <label className="flex items-center gap-2 cursor-pointer select-none">
//                                         <input type="checkbox" className="hidden" checked={formData.hasCertificate} onChange={e => handleChange('hasCertificate', e.target.checked)} title="Sertifikat"/>
//                                         <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div>
//                                         <span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span>
//                                     </label>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {activeTab === 'media' && (
//                         <div className="max-w-3xl mx-auto space-y-6">
//                             <div className="bg-white p-6 rounded-xl border"><label className="text-sm font-bold mb-3 block">Cover Image <span className="text-red-500">*</span></label><div className="flex gap-6"><div className="w-64 aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative border border-gray-200">{formData.thumbnailUrl ? <img src={getDisplayUrl(formData.thumbnailUrl)} className="w-full h-full object-cover" alt="Preview"/> : <ImageIcon className="text-gray-400"/>}</div><div className="flex-1"><input id="fileInp" type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" title="File"/><button onClick={() => fileInputRef.current?.click()} className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-bold flex gap-2" title="Upload Gambar"><Upload size={16}/> Upload Gambar</button></div></div></div>
//                             <div className="bg-white p-6 rounded-xl border"><label className="text-sm font-bold mb-2 block">Video Promosi</label><input className="w-full p-2.5 border rounded-lg" value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} aria-label="Video URL"/></div>
//                         </div>
//                     )}

//                     {activeTab === 'registration' && (
//                         <div className="max-w-4xl mx-auto space-y-6">
//                             <div className="grid grid-cols-2 gap-6">
//                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
//                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <label className="flex items-center gap-2 cursor-pointer select-none">
//                                             <input type="checkbox" className="hidden" checked={formData.regIsForever} onChange={e => handleChange('regIsForever', e.target.checked)} title="Buka Selamanya"/>
//                                             <div className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-all ${formData.regIsForever ? 'bg-[#990000] border-[#990000]' : 'bg-gray-100 border-gray-200'}`}>{formData.regIsForever && <CheckCircle className="text-white" size={24} />}</div><span className="text-sm font-bold text-gray-600">Buka Selamanya</span>
//                                         </label>
//                                     </div>
//                                     {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} title="Start"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} title="End"/></div></div>)}
//                                 </div>
//                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
//                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <label className="flex items-center gap-2 cursor-pointer select-none">
//                                             <input type="checkbox" className="hidden" checked={formData.execIsForever} onChange={e => handleChange('execIsForever', e.target.checked)} title="Fleksibel"/>
//                                             <div className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-all ${formData.execIsForever ? 'bg-[#990000] border-[#990000]' : 'bg-gray-100 border-gray-200'}`}>{formData.execIsForever && <CheckCircle className="text-white" size={24} />}</div><span className="text-sm font-bold text-gray-600">Fleksibel</span>
//                                         </label>
//                                     </div>
//                                     {!formData.execIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} aria-label="Pelaksanaan Mulai"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} aria-label="Pelaksanaan Selesai"/></div></div>)}
//                                 </div>
//                             </div>

//                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
//                                 <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan <span className="text-red-500">*</span></label>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <select className="w-full p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500" value={organizerType} onChange={(e) => { setOrganizerType(e.target.value); setSelectedProvId(''); setSelectedCityId(''); }} title="Tipe Pelaksana">
//                                         {allOrgTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                                     </select>
//                                     {organizerType === 'PMI Provinsi' && (<select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi"><option value="">-- Pilih Provinsi --</option>{provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}</select>)}
//                                     {organizerType === 'PMI Kabupaten/Kota' && (<><select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi"><option value="">-- Pilih Provinsi --</option>{provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}</select><select className="w-full p-2.5 border rounded-lg bg-white" value={selectedCityId} onChange={e => setSelectedCityId(e.target.value)} disabled={!selectedProvId} aria-label="Pilih Kab/Kota"><option value="">-- Pilih Kab/Kota --</option>{regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}</select></>)}
//                                     {!['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota'].includes(organizerType) && (<input type="text" className="w-full p-2.5 border rounded-lg" placeholder="Nama Unit / Organisasi..." value={organizerName} onChange={e => setOrganizerName(e.target.value)} aria-label="Nama Organisasi"/>)}
//                                 </div>
//                             </div>
                            
//                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//                                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan Peserta</h3>
//                                 <div className="space-y-4">
//                                      <label className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'auto' ? 'bg-green-50 border-green-200 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
//                                         <input type="radio" name="regMethod" value="auto" checked={formData.registrationMethod === 'auto'} onChange={() => handleChange('registrationMethod', 'auto')} className="hidden" title="Otomatis"/>
//                                         <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'auto' ? 'border-green-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'auto' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Otomatis (Langsung Aktif)</span><span className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</span></div>
//                                      </label>
//                                      <label className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'manual' ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
//                                         <input type="radio" name="regMethod" value="manual" checked={formData.registrationMethod === 'manual'} onChange={() => handleChange('registrationMethod', 'manual')} className="hidden" title="Manual"/>
//                                         <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'manual' ? 'border-yellow-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'manual' && <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Manual (Verifikasi Admin)</span><span className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</span></div>
//                                      </label>
//                                 </div>
//                             </div>

//                              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//                                 <div className="flex justify-between items-center mb-4">
//                                     <div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan</h3></div>
//                                     <label className="flex items-center gap-2 cursor-pointer text-xs">
//                                         <input type="checkbox" className="hidden" checked={!formData.requireDocs} onChange={e => handleChange('requireDocs', !e.target.checked)} title="Tidak Butuh"/>
//                                         <div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
//                                         Tidak Butuh
//                                     </label>
//                                 </div>
//                                 {formData.requireDocs && (
//                                     <div className="space-y-3">
//                                         <div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} title="File"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50" title="Upload Template" aria-label="Upload Template"><Upload size={14}/> Upload Template Baru</button></div>
//                                         {formData.registrationTemplates.map((item: any, idx: number) => (
//                                             <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
//                                                 <div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div>
//                                                 <div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} title="Nama Dokumen" aria-label="Nama Dokumen"/><a href={getDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()} title="Lihat File" aria-label="Lihat File"><Download size={10} /> Lihat File Uploaded</a></div>
//                                                 <button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Hapus Dokumen" aria-label="Hapus Dokumen"><Trash2 size={16} /></button>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     )}

//                     {/* TAB 4: FASILITAS */}
//                     {activeTab === 'facilities' && (
//                         <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
//                             <div className="space-y-6">
//                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" aria-label="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div>
//                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.estimatedDuration} disabled aria-label="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.totalJp} disabled aria-label="Total JP"/></div></div></div>
//                             </div>
//                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas <span className="text-red-500">*</span></label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} title="Input Fasilitas" aria-label="Input Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" title="Tambah Fasilitas" aria-label="Tambah Fasilitas"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" title="Hapus Fasilitas" aria-label="Hapus Fasilitas"><X size={14}/></button></div>))}</div></div>
//                         </div>
//                     )}

//                     {/* TAB 5: TIM & PIC */}
//                     {activeTab === 'team' && (
//                         <div className="max-w-4xl mx-auto space-y-8">
//                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//                                 <h3 className="font-bold mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
//                                 <p className="text-xs text-gray-500 mb-4">*Mencakup Admin, Superadmin, dan Fasilitator.</p>
                                
//                                 <div className="mb-4 space-y-2">
//                                     {selectedFacilitators.map(fac => (
//                                         <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100 animate-in slide-in-from-top-1">
//                                             <div className="flex items-center gap-3">
//                                                 <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-xs border border-red-200">{fac.name?.charAt(0)}</div>
//                                                 <div><span className="text-sm font-bold text-red-900 block">{fac.name}</span><span className="text-[10px] text-red-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full w-fit border border-red-100"><Clock size={10}/> Menunggu Persetujuan</span></div>
//                                             </div>
//                                             <button type="button" onClick={() => toggleFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus Fasilitator" aria-label="Hapus Fasilitator"><X size={14}/></button>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <div className="relative">
//                                     <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//                                     <input type="text" placeholder="Cari nama atau email fasilitator untuk diundang..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchFacilitator} onChange={(e) => setSearchFacilitator(e.target.value)} title="Cari Fasilitator" aria-label="Cari Fasilitator"/>
//                                     {searchFacilitator && (
//                                         <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
//                                             {availableFacilitators.length > 0 ? availableFacilitators.map(fac => (
//                                                 <button key={fac._id || fac.id} type="button" onClick={() => { toggleFacilitator(fac._id || fac.id); setSearchFacilitator(''); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group" title={`Pilih ${fac.name}`} aria-label={`Pilih ${fac.name}`}>
//                                                     <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{fac.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{fac.name}</p><p className="text-[10px] text-gray-400">{fac.email} • {fac.role}</p></div></div><Plus size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
//                                                 </button>
//                                             )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
                            
//                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//                                 <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
                                
//                                 <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
//                                     <div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div>
//                                     <div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div>
//                                 </div>

//                                 <div className="space-y-2 mb-4">
//                                     <label className="text-sm font-bold text-gray-700 block">Daftar PIC Tambahan (Maks 3)</label>
//                                     {formData.pics.map((pic: any, idx: number) => (
//                                         <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in slide-in-from-top-1">
//                                             <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">{pic.name?.charAt(0)}</div><div><span className="text-sm font-bold text-blue-900 block">{pic.name}</span><div className="flex gap-2"><span className="text-[10px] text-blue-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full border border-blue-100"><Clock size={10}/> Menunggu Persetujuan</span><span className="text-[10px] text-gray-500">{pic.email}</span></div></div></div><button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus PIC" aria-label="Hapus PIC"><X size={14}/></button>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {formData.pics.length < 3 ? (
//                                     <div className="relative">
//                                         <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//                                         <input type="text" placeholder="Cari user untuk dijadikan PIC..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchPic} onChange={(e) => setSearchPic(e.target.value)} title="Cari PIC" aria-label="Cari PIC"/>
//                                         {searchPic && (
//                                             <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
//                                                 {filteredPicCandidates.length > 0 ? filteredPicCandidates.map(user => (
//                                                     <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group" aria-label={`Pilih PIC ${user.name}`}>
//                                                         <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div></div><UserPlus size={16} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
//                                                     </button>
//                                                 )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
//                                             </div>
//                                         )}
//                                     </div>
//                                 ) : <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 rounded-lg border border-gray-200">Kuota PIC penuh (Maksimal 3).</div>}
//                             </div>

//                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//                                 <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckSquare size={18}/> Kontak Utama (Landing Page)</h3></div>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div><label className="text-xs font-bold text-gray-500">Nama Kontak <span className="text-red-500">*</span></label><input name="contactName" value={formData.contactName} onChange={(e) => handleChange('contactName', e.target.value)} className="w-full p-2 border rounded" title="Nama Kontak" aria-label="Nama Kontak" /></div>
//                                     <div><label className="text-xs font-bold text-gray-500">Email Kontak <span className="text-red-500">*</span></label><input name="contactEmail" value={formData.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} className="w-full p-2 border rounded" title="Email Kontak" aria-label="Email Kontak" /></div>
//                                     <div className="md:col-span-2"><label className="text-xs font-bold text-gray-500">Nomor Telepon/WA <span className="text-red-500">*</span></label><input name="contactPhone" value={formData.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} className="w-full p-2 border rounded" placeholder="628..." title="Telepon Kontak" aria-label="Telepon Kontak" /></div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 <div className="bg-white border-t p-4 flex justify-end gap-3 shrink-0">
//                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50" title="Batal" aria-label="Batal">Batal</button>
//                     <button onClick={handlePreSubmit} className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 shadow-lg flex items-center gap-2 disabled:opacity-50" title="Simpan" aria-label="Simpan Pelatihan">
//                         {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"/> : <Save size={18}/>} Simpan Pelatihan
//                     </button>
//                 </div>
//             </div>

//             {/* --- DISCLAIMER POPUP --- */}
//             {showDisclaimer && (
//                 <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in">
//                     <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 text-center space-y-4">
//                         <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2"><ShieldCheck size={32} className="text-orange-600"/></div>
//                         <h3 className="text-xl font-bold text-gray-900">Pernyataan Disclaimer</h3>
//                         <p className="text-sm text-gray-500 leading-relaxed">Saya menyatakan bahwa data pelatihan ini benar dan bertanggung jawab atas konten yang disajikan. Saya memahami bahwa Fasilitator dan PIC yang ditambahkan akan menerima notifikasi persetujuan di dashboard mereka.</p>
                        
//                         <label className="flex items-center justify-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors">
//                             <input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} className="w-5 h-5 accent-orange-600" aria-label="Setuju"/>
//                             <span className="font-bold text-sm text-orange-800">Saya Setuju & Lanjutkan</span>
//                         </label>

//                         <div className="flex gap-3 pt-2">
//                             <button onClick={() => setShowDisclaimer(false)} className="flex-1 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50" aria-label="Kembali">Kembali</button>
//                             <button onClick={handleFinalSubmit} disabled={!isAgreed || loading} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2" aria-label="Proses Simpan">
//                                 {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Proses Simpan
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

'use client';

import { useState, useRef, useEffect } from 'react';
import { 
    X, Upload, Plus, Trash2, Save, Calendar, 
    Video, Image as ImageIcon, Users, FileText, 
    CheckCircle, AlertCircle, Award, Clock, Search, 
    Download, File, Info, Loader2, MessageCircle, UserPlus, 
    ShieldCheck, CheckSquare, Building
} from 'lucide-react';
import { api, apiUpload, getImageUrl } from '@/lib/api';
import { getProvinces, getRegencies } from '@/lib/indonesia';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'; 

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

export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
    const [activeTab, setActiveTab] = useState('info');
    const [loading, setLoading] = useState(false);
    const [fetchingDetail, setFetchingDetail] = useState(false);
    
    // Refs
    const fileInputRef = useRef<HTMLInputElement>(null); 
    const templateInputRef = useRef<HTMLInputElement>(null); 
    
    // State Search & Users
    const [searchFacilitator, setSearchFacilitator] = useState('');
    const [searchPic, setSearchPic] = useState('');
    const [allUsers, setAllUsers] = useState<any[]>([]);
    
    // State Disclaimer Popup
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);

    // State Pelaksana & Wilayah
    const [organizerType, setOrganizerType] = useState('PMI Pusat');
    const [organizerName, setOrganizerName] = useState(''); 
    const [provinces, setProvinces] = useState<any[]>([]);
    const [regencies, setRegencies] = useState<any[]>([]);
    const [selectedProvId, setSelectedProvId] = useState('');
    const [selectedCityId, setSelectedCityId] = useState('');
    const [cmsCategories, setCmsCategories] = useState<string[]>([]);

    // State UI Tambahan
    const [newFacility, setNewFacility] = useState('');
    const [uploadingCover, setUploadingCover] = useState(false);
    const [uploadingTemplate, setUploadingTemplate] = useState(false);

    // --- INITIAL STATE (Sesuai Script Lama) ---
    const defaultState = {
        title: '', description: '', 
        programType: 'training', 
        hasCertificate: true,
        
        regIsForever: false, regStartDate: '', regEndDate: '',
        execIsForever: false, execStartDate: '', execEndDate: '', // execIsForever = Flexible
        
        thumbnailUrl: '', promoVideoUrl: '',
        
        registrationMethod: 'auto', 
        requireDocs: true, 
        registrationTemplates: [] as any[], 
        
        price: 0, estimatedDuration: 0, totalJp: 0, 
        facilities: [] as string[], 
        facilitatorIds: [] as string[],
        pics: [] as any[], 
        
        creatorInfo: null as any,
        contactName: '', contactPhone: '', contactEmail: ''
    };

    const [formData, setFormData] = useState(defaultState);

    // Helper URL
    const getDisplayUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        const cleanPath = url.startsWith('/') ? url : `/${url}`;
        return `${API_BASE_URL}${cleanPath}`;
    };

    const getYoutubeEmbed = (url: string) => {
        try {
            if (!url) return '';
            if (url.includes('embed')) return url;
            const videoId = url.split('v=')[1]?.split('&')[0];
            if (videoId) return `https://www.youtube.com/embed/${videoId}`;
            if (url.includes('youtu.be')) return `https://www.youtube.com/embed/${url.split('/').pop()}`;
            return url;
        } catch { return url; }
    };

    // --- LOAD DATA AWAL ---
    useEffect(() => {
        const provs = getProvinces();
        setProvinces(provs);
        
        api('/api/content').then(res => {
            if (res && res.organizerCategories) setCmsCategories(res.organizerCategories);
        }).catch(() => {});
        
        // Fetch All Users for PIC Search
        api('/api/users').then(res => setAllUsers(res.users || [])).catch(() => setAllUsers(facilitators));
    }, []);

    // Load Kota saat Provinsi berubah
    useEffect(() => {
        if (selectedProvId) {
            const regs = getRegencies(selectedProvId);
            setRegencies(regs);
        } else {
            setRegencies([]);
        }
    }, [selectedProvId]);

    // Fetch Course Data Detail
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

            price: Number(data.price) || 0, 
            estimatedDuration: Number(data.estimatedDuration) || 0, 
            totalJp: Number(data.totalJp) || 0,
            
            facilities: Array.isArray(data.facilities) ? data.facilities : [],
            facilitatorIds: Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [],
            pics: Array.isArray(data.pics) ? data.pics : [],
            
            creatorInfo: data.creatorInfo || null,
            contactName: data.contact?.name || data.creatorInfo?.name || '',
            contactEmail: data.contact?.email || data.creatorInfo?.email || '',
            contactPhone: data.contact?.phone || data.creatorInfo?.contact || ''
        });

        // Parse Organizer Data
        if (data.organizer) {
            const org = data.organizer;
            if (org === 'PMI Pusat') {
                setOrganizerType('PMI Pusat');
            } else if (org.startsWith('PMI Provinsi')) {
                setOrganizerType('PMI Provinsi');
                const pName = org.split(': ')[1]?.trim();
                const foundProv = getProvinces().find((p: any) => p.name === pName);
                if (foundProv) setSelectedProvId(foundProv.code);
            } else if (org.startsWith('PMI Kab/Kota')) {
                setOrganizerType('PMI Kabupaten/Kota');
                const locParts = org.split(': ')[1]?.split(',');
                if (locParts && locParts.length > 1) {
                     const cityName = locParts[0]?.trim();
                     const provName = locParts[1]?.trim();
                     const foundProv = getProvinces().find((p: any) => p.name === provName);
                     if (foundProv) {
                         setSelectedProvId(foundProv.code);
                         const regs = getRegencies(foundProv.code);
                         setRegencies(regs);
                         const foundCity = regs.find((r: any) => r.name === cityName);
                         if (foundCity) setSelectedCityId(foundCity.code);
                     }
                }
            } else {
                const parts = org.split(': ');
                setOrganizerType(parts[0]);
                setOrganizerName(parts[1] || '');
            }
        }
    }

    // --- HANDLERS ---
    const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
    
    // Facility Handlers
    const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
    const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };
    
    // Facilitator Handlers
    const toggleFacilitator = (id: string) => {
        const current = formData.facilitatorIds;
        setFormData(prev => ({ ...prev, facilitatorIds: current.includes(id) ? current.filter(fid => fid !== id) : [...current, id] }));
    };

    // PIC Handlers
    const handleAddPicFromSearch = (user: any) => {
        if (formData.pics.length >= 3) return alert("Maksimal 3 PIC Tambahan");
        if (formData.pics.some((p: any) => p.email === user.email)) return alert("User ini sudah ditambahkan.");

        const newPic = {
            name: user.name,
            pmiStatus: user.role, 
            email: user.email,
            avatarUrl: user.avatarUrl
        };
        setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
        setSearchPic('');
    };

    const removePic = (idx: number) => { setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); };
    
    // Manual fallback for PIC
    const addPic = () => { if (formData.pics.length >= 3) return; setFormData(prev => ({ ...prev, pics: [...prev.pics, { name: '', pmiStatus: '', email: '' }] })); };
    const updatePic = (idx: number, field: string, val: string) => { const newPics = [...formData.pics]; newPics[idx] = { ...newPics[idx], [field]: val }; setFormData(prev => ({ ...prev, pics: newPics })); };


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

            const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { 
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
                withCredentials: true 
            });
            
            const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url;
            if (!rawUrl) throw new Error("Gagal dapat URL.");

            setFormData(prev => ({
                ...prev,
                registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }]
            }));
        } catch (err: any) {
            console.error(err);
            alert('Upload Gagal: ' + (err.response?.data?.message || err.message));
        } finally {
            setUploadingTemplate(false);
            if (templateInputRef.current) templateInputRef.current.value = '';
        }
    };

    const removeTemplate = (idx: number) => {
        if(!confirm("Hapus dokumen ini?")) return;
        setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) }));
    };

    const updateTemplateTitle = (idx: number, v: string) => {
        const t = [...formData.registrationTemplates]; t[idx].title = v;
        setFormData(prev => ({ ...prev, registrationTemplates: t }));
    };

    // --- LOGIKA SIMPAN ---
    const handlePreSubmit = () => {
        if (!formData.title) return alert("Judul wajib diisi!");
        // Buka Modal Disclaimer
        setShowDisclaimer(true);
    };

    const handleFinalSubmit = async () => {
        if (!isAgreed) return alert("Mohon setujui pernyataan disclaimer.");
        
        setLoading(true);
        try {
            const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
            const parseDate = (d: string) => d ? new Date(d) : null;

            // Konstruksi Pelaksana
            let finalOrganizer = organizerType;
            if (organizerType === 'PMI Provinsi') {
                const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
                finalOrganizer = `PMI Provinsi: ${provName}`;
            } else if (organizerType === 'PMI Kabupaten/Kota') {
                const cityName = regencies.find(r => r.code === selectedCityId)?.name || '';
                const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
                finalOrganizer = `PMI Kabupaten/Kota: ${cityName}, ${provName}`;
            } else if (organizerType !== 'PMI Pusat') {
                finalOrganizer = `${organizerType}: ${organizerName}`;
            }

            const payload = {
                title: formData.title,
                description: formData.description,
                programType: formData.programType,
                hasCertificate: formData.hasCertificate,
                price: Number(formData.price),
                estimatedDuration: Number(formData.estimatedDuration),
                totalJp: Number(formData.totalJp),
                thumbnailUrl: formData.thumbnailUrl,
                promoVideoUrl: formData.promoVideoUrl,
                
                organizer: finalOrganizer,

                registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
                executionPeriod: { isForever: formData.execIsForever, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
                registrationMethod: formData.registrationMethod,
                
                registrationConfig: { 
                    requireDocs: formData.requireDocs, 
                    templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) 
                },
                
                facilities: formData.facilities,
                facilitatorIds: formData.facilitatorIds,
                pics: validPics,
                creatorInfo: formData.creatorInfo,
                contact: {
                    name: formData.contactName,
                    email: formData.contactEmail,
                    phone: formData.contactPhone
                }
            };

            if (course?._id) await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
            else await api('/api/courses', { method: 'POST', body: payload });

            alert("Berhasil disimpan!");
            onSuccess();
        } catch (err: any) {
            console.error(err);
            alert("Gagal: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
            setShowDisclaimer(false);
        }
    };

    // Filter Logic
    const selectedFacilitators = facilitators.filter(f => formData.facilitatorIds.includes(f.id || f._id));
    const availableFacilitators = facilitators.filter(f => !formData.facilitatorIds.includes(f.id || f._id) && (f.name?.toLowerCase().includes(searchFacilitator.toLowerCase()) || f.email?.toLowerCase().includes(searchFacilitator.toLowerCase())));
    const filteredPicCandidates = allUsers.filter(u => ((u.name || '').toLowerCase().includes(searchPic.toLowerCase()) || (u.email || '').toLowerCase().includes(searchPic.toLowerCase())) && !formData.pics.some((p: any) => p.email === u.email));
    
    // Gabungan Kategori Pelaksana
    const allOrgTypes = ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota', ...cmsCategories];

    if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><Loader2 className="animate-spin text-white"/></div>;

    return (
        <>
            {/* --- MAIN MODAL --- */}
            {/* MODIFIKASI DISINI: z-40 diganti z-[100] agar paling atas */}
            <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
                <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
                    
                    {/* HEADER */}
                    {/* MODIFIKASI DISINI: bg-gray-900 diganti bg-[#990000] (Merah) */}
                    <div className="bg-[#990000] text-white p-5 flex justify-between items-center shrink-0">
                        <div><h2 className="text-xl font-bold">{course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2><p className="text-xs text-gray-100 mt-1">Lengkapi data pelatihan.</p></div>
                        <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" title="Tutup" aria-label="Tutup"><X size={24}/></button>
                    </div>

                    {/* TABS */}
                    <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0">
                        {[{ id: 'info', label: '1. Informasi Dasar', icon: FileText }, { id: 'media', label: '2. Media & Visual', icon: ImageIcon }, { id: 'registration', label: '3. Jadwal & Pelaksana', icon: Calendar }, { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award }, { id: 'team', label: '5. Tim & PIC', icon: Users }].map((tab) => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`} aria-label={`Tab ${tab.label}`}><tab.icon size={16} /> {tab.label}</button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                        
                        {/* TAB 1: INFO */}
                        {activeTab === 'info' && (
                            <div className="space-y-6 max-w-4xl mx-auto">
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                                    <div><label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="inpTitle">Judul Pelatihan <span className="text-red-500">*</span></label><input id="inpTitle" required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: Orientasi Kepalangmerahan" value={formData.title} onChange={e => handleChange('title', e.target.value)} aria-label="Judul"/></div>
                                    <div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap <span className="text-red-500">*</span></label><div className="bg-white border rounded-lg overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" aria-label="Deskripsi" /></div></div>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label>
                                        <div className="flex gap-4">
                                            <div onClick={() => handleChange('programType', 'training')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'training' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'training' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'training' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
                                                <span className="text-sm text-gray-700 font-medium">Diklat Resmi</span>
                                            </div>
                                            <div onClick={() => handleChange('programType', 'course')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'course' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'course' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'course' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
                                                <span className="text-sm text-gray-700 font-medium">Kursus Mandiri</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-px bg-gray-200"></div>
                                    <div className="flex items-center gap-3">
                                        <div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div>
                                            <span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: MEDIA */}
                        {activeTab === 'media' && (
                            <div className="max-w-3xl mx-auto space-y-6">
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) <span className="text-red-500">*</span></label>
                                    <div className="flex gap-6 items-start">
                                        <div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
                                            {formData.thumbnailUrl ? <img src={getDisplayUrl(formData.thumbnailUrl)} alt="Preview Cover" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1" /><span className="text-xs">Belum ada gambar</span></div>}
                                            {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p>
                                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" title="Input Gambar"/>
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2" title="Upload Gambar"><Upload size={16}/> Upload Gambar</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label>
                                    <div className="flex gap-2"><div className="p-3 bg-gray-100 rounded-l-lg border border-r-0 text-gray-500"><Video size={18}/></div><input type="text" className="flex-1 p-2.5 border rounded-r-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} aria-label="URL Video Youtube" /></div>
                                </div>
                            </div>
                        )}

                        {/* TAB 3: JADWAL & PELAKSANA */}
                        {activeTab === 'registration' && (
                            <div className="max-w-4xl mx-auto space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div onClick={() => handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
                                                <span className="text-sm text-gray-600">Buka Selamanya</span>
                                            </div>
                                        </div>
                                        {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} title="Mulai Pendaftaran" /></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} title="Selesai Pendaftaran" /></div></div>)}
                                    </div>
                                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div onClick={() => handleChange('execIsForever', !formData.execIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.execIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
                                                <span className="text-sm text-gray-600">Fleksibel</span>
                                            </div>
                                        </div>
                                        {!formData.execIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} aria-label="Pelaksanaan Mulai"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} aria-label="Pelaksanaan Selesai"/></div></div>)}
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan <span className="text-red-500">*</span></label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <select className="w-full p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500" value={organizerType} onChange={(e) => { setOrganizerType(e.target.value); setSelectedProvId(''); setSelectedCityId(''); }} title="Tipe Pelaksana">
                                            {allOrgTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                        {organizerType === 'PMI Provinsi' && (
                                            <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi">
                                                <option value="">-- Pilih Provinsi --</option>
                                                {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
                                            </select>
                                        )}
                                        {organizerType === 'PMI Kabupaten/Kota' && (
                                            <>
                                                <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi">
                                                    <option value="">-- Pilih Provinsi --</option>
                                                    {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
                                                </select>
                                                <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedCityId} onChange={e => setSelectedCityId(e.target.value)} disabled={!selectedProvId} aria-label="Pilih Kota">
                                                    <option value="">-- Pilih Kab/Kota --</option>
                                                    {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
                                                </select>
                                            </>
                                        )}
                                        {!['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota'].includes(organizerType) && (
                                            <input type="text" className="w-full p-2.5 border rounded-lg" placeholder="Nama Unit / Organisasi..." value={organizerName} onChange={e => setOrganizerName(e.target.value)} aria-label="Nama Organisasi"/>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan Peserta</h3>
                                    <div className="space-y-4">
                                         <div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'auto' ? 'bg-green-50 border-green-200 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'auto' ? 'border-green-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'auto' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Otomatis (Langsung Aktif)</span><span className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</span></div></div>
                                         <div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'manual' ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'manual' ? 'border-yellow-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'manual' && <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Manual (Verifikasi Admin)</span><span className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</span></div></div>
                                    </div>
                                </div>

                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div>
                                        <div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
                                            <span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span>
                                        </div>
                                    </div>
                                    {formData.requireDocs && (
                                        <div className="space-y-3">
                                            <div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} title="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50" aria-label="Upload Template"><Upload size={14}/> Upload Template Baru</button></div>
                                            {formData.registrationTemplates.map((item: any, idx: number) => (
                                                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                                    <div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div>
                                                    <div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} aria-label="Nama Dokumen"/><a href={getDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()} aria-label="Download File"><Download size={10} /> Lihat File Uploaded</a></div>
                                                    <button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" aria-label="Hapus Dokumen"><Trash2 size={16} /></button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* TAB 4: FASILITAS */}
                        {activeTab === 'facilities' && (
                            <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" aria-label="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div>
                                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.estimatedDuration} disabled aria-label="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.totalJp} disabled aria-label="Total JP"/></div></div></div>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas <span className="text-red-500">*</span></label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} aria-label="Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" aria-label="Tambah Fasilitas"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" aria-label="Hapus Fasilitas"><X size={14}/></button></div>))}</div></div>
                            </div>
                        )}

                        {/* TAB 5: TIM & PIC */}
                        {activeTab === 'team' && (
                            <div className="max-w-4xl mx-auto space-y-8">
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
                                    <p className="text-xs text-gray-500 mb-4">*Mencakup Admin, Superadmin, dan Fasilitator.</p>
                                    
                                    <div className="mb-4 space-y-2">
                                        {selectedFacilitators.map(fac => (
                                            <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100 animate-in slide-in-from-top-1">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-xs border border-red-200">{fac.name?.charAt(0)}</div>
                                                    <div><span className="text-sm font-bold text-red-900 block">{fac.name}</span><span className="text-[10px] text-red-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full w-fit border border-red-100"><Clock size={10}/> Menunggu Persetujuan</span></div>
                                                </div>
                                                <button type="button" onClick={() => toggleFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus" aria-label="Hapus"><X size={14}/></button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="relative">
                                        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                                        <input type="text" placeholder="Cari nama atau email..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchFacilitator} onChange={(e) => setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator"/>
                                        {searchFacilitator && (
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
                                                {availableFacilitators.length > 0 ? availableFacilitators.map(fac => (
                                                    <button key={fac._id || fac.id} type="button" onClick={() => { toggleFacilitator(fac._id || fac.id); setSearchFacilitator(''); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
                                                        <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{fac.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{fac.name}</p><p className="text-[10px] text-gray-400">{fac.email} • {fac.role}</p></div></div><Plus size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                                    </button>
                                                )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
                                    
                                    <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                                        <div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div>
                                        <div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <label className="text-sm font-bold text-gray-700 block">Daftar PIC Tambahan (Maks 3)</label>
                                        {formData.pics.map((pic: any, idx: number) => (
                                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in slide-in-from-top-1">
                                                <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">{pic.name?.charAt(0)}</div><div><span className="text-sm font-bold text-blue-900 block">{pic.name}</span><div className="flex gap-2"><span className="text-[10px] text-blue-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full border border-blue-100"><Clock size={10}/> Menunggu Persetujuan</span><span className="text-[10px] text-gray-500">{pic.email}</span></div></div></div><button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
                                            </div>
                                        ))}
                                    </div>

                                    {formData.pics.length < 3 ? (
                                        <div className="relative">
                                            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                                            <input type="text" placeholder="Cari user untuk dijadikan PIC..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchPic} onChange={(e) => setSearchPic(e.target.value)} aria-label="Cari PIC"/>
                                            {searchPic && (
                                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
                                                    {filteredPicCandidates.length > 0 ? filteredPicCandidates.map(user => (
                                                        <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
                                                            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div></div><UserPlus size={16} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                                        </button>
                                                    )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
                                                </div>
                                            )}
                                        </div>
                                    ) : <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 rounded-lg border border-gray-200">Kuota PIC penuh (Maksimal 3).</div>}
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckSquare size={18}/> Kontak Utama (Landing Page)</h3></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><label className="text-xs font-bold text-gray-500">Nama Kontak <span className="text-red-500">*</span></label><input name="contactName" value={formData.contactName} onChange={(e) => handleChange('contactName', e.target.value)} className="w-full p-2 border rounded" aria-label="Nama Kontak" /></div>
                                        <div><label className="text-xs font-bold text-gray-500">Email Kontak <span className="text-red-500">*</span></label><input name="contactEmail" value={formData.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} className="w-full p-2 border rounded" aria-label="Email Kontak" /></div>
                                        <div className="md:col-span-2"><label className="text-xs font-bold text-gray-500">Nomor Telepon/WA <span className="text-red-500">*</span></label><input name="contactPhone" value={formData.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} className="w-full p-2 border rounded" placeholder="628..." aria-label="Telepon Kontak" /></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white border-t p-4 flex justify-end gap-3 shrink-0">
                        <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50" title="Batal">Batal</button>
                        <button onClick={handlePreSubmit} className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 shadow-lg flex items-center gap-2 disabled:opacity-50" aria-label="Simpan Pelatihan">Simpan Pelatihan</button>
                    </div>
                </div>

                {/* --- DISCLAIMER POPUP --- */}
                {showDisclaimer && (
                    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in">
                        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 text-center space-y-4">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2"><ShieldCheck size={32} className="text-orange-600"/></div>
                            <h3 className="text-xl font-bold text-gray-900">Pernyataan Disclaimer</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Saya menyatakan bahwa data pelatihan ini benar dan bertanggung jawab atas konten yang disajikan. Saya memahami bahwa Fasilitator dan PIC yang ditambahkan akan menerima notifikasi persetujuan di dashboard mereka.</p>
                            
                            <label className="flex items-center justify-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors">
                                <input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} className="w-5 h-5 accent-orange-600" aria-label="Setuju"/>
                                <span className="font-bold text-sm text-orange-800">Saya Setuju & Lanjutkan</span>
                            </label>

                            <div className="flex gap-3 pt-2">
                                <button onClick={() => setShowDisclaimer(false)} className="flex-1 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50">Kembali</button>
                                <button onClick={handleFinalSubmit} disabled={!isAgreed || loading} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
                                    {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Proses Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
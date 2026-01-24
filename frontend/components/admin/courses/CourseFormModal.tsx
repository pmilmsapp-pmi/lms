
// // // // // // // // // 'use client';

// // // // // // // // // import { useState, useRef, useEffect } from 'react';
// // // // // // // // // import { 
// // // // // // // // //     X, Upload, Plus, Trash2, Save, Calendar, 
// // // // // // // // //     Video, Image as ImageIcon, Users, FileText, 
// // // // // // // // //     CheckCircle, AlertCircle, Award, Clock, Search, 
// // // // // // // // //     Download, File, Loader2, UserPlus, 
// // // // // // // // //     ShieldCheck, CheckSquare, Building
// // // // // // // // // } from 'lucide-react';
// // // // // // // // // import { api, apiUpload, getDisplayUrl } from '@/lib/api'; // Pastikan helper ini ada atau sesuaikan
// // // // // // // // // import { getProvinces, getRegencies } from '@/lib/indonesia';
// // // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // // import 'react-quill/dist/quill.snow.css';
// // // // // // // // // import axios from 'axios'; 

// // // // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // // // //     ssr: false,
// // // // // // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // // // // // });

// // // // // // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // // // // // interface CourseFormModalProps {
// // // // // // // // //     course?: any; 
// // // // // // // // //     onClose: () => void;
// // // // // // // // //     onSuccess: () => void;
// // // // // // // // //     facilitators: any[]; 
// // // // // // // // //     currentUser: any; 
// // // // // // // // // }

// // // // // // // // // export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
// // // // // // // // //     const [activeTab, setActiveTab] = useState('info');
// // // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // // //     const [fetchingDetail, setFetchingDetail] = useState(false);
    
// // // // // // // // //     // Refs
// // // // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null); 
// // // // // // // // //     const templateInputRef = useRef<HTMLInputElement>(null); 
    
// // // // // // // // //     // State Search & Users
// // // // // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
// // // // // // // // //     const [searchPic, setSearchPic] = useState('');
// // // // // // // // //     const [allUsers, setAllUsers] = useState<any[]>([]);
    
// // // // // // // // //     // State Disclaimer Popup
// // // // // // // // //     const [showDisclaimer, setShowDisclaimer] = useState(false);
// // // // // // // // //     const [isAgreed, setIsAgreed] = useState(false);

// // // // // // // // //     // State Pelaksana & Wilayah
// // // // // // // // //     const [organizerType, setOrganizerType] = useState('PMI Pusat');
// // // // // // // // //     const [organizerName, setOrganizerName] = useState(''); 
// // // // // // // // //     const [provinces, setProvinces] = useState<any[]>([]);
// // // // // // // // //     const [regencies, setRegencies] = useState<any[]>([]);
// // // // // // // // //     const [selectedProvId, setSelectedProvId] = useState('');
// // // // // // // // //     const [selectedCityId, setSelectedCityId] = useState('');
// // // // // // // // //     const [cmsCategories, setCmsCategories] = useState<string[]>([]);

// // // // // // // // //     // State UI Tambahan
// // // // // // // // //     const [newFacility, setNewFacility] = useState('');
// // // // // // // // //     const [uploadingCover, setUploadingCover] = useState(false);
// // // // // // // // //     const [uploadingTemplate, setUploadingTemplate] = useState(false);

// // // // // // // // //     // --- INITIAL STATE ---
// // // // // // // // //     const defaultState = {
// // // // // // // // //         title: '', description: '', 
// // // // // // // // //         programType: 'training', 
// // // // // // // // //         hasCertificate: true,
        
// // // // // // // // //         regIsForever: false, regStartDate: '', regEndDate: '',
// // // // // // // // //         execIsForever: false, execStartDate: '', execEndDate: '', // execIsForever = Flexible
        
// // // // // // // // //         thumbnailUrl: '', promoVideoUrl: '',
        
// // // // // // // // //         registrationMethod: 'auto', 
// // // // // // // // //         requireDocs: true, 
// // // // // // // // //         registrationTemplates: [] as any[], 
        
// // // // // // // // //         price: 0, estimatedDuration: 0, totalJp: 0, 
// // // // // // // // //         facilities: [] as string[], 
// // // // // // // // //         facilitatorIds: [] as string[],
// // // // // // // // //         pics: [] as any[], 
        
// // // // // // // // //         creatorInfo: null as any,
// // // // // // // // //         contactName: '', contactPhone: '', contactEmail: ''
// // // // // // // // //     };

// // // // // // // // //     const [formData, setFormData] = useState(defaultState);

// // // // // // // // //     // Helper URL (Local override jika belum ada di lib/api)
// // // // // // // // //     const getLocalDisplayUrl = (url: string) => {
// // // // // // // // //         if (!url) return '';
// // // // // // // // //         if (url.startsWith('http')) return url;
// // // // // // // // //         const cleanPath = url.startsWith('/') ? url : `/${url}`;
// // // // // // // // //         return `${API_BASE_URL}${cleanPath}`;
// // // // // // // // //     };

// // // // // // // // //     // --- LOAD DATA AWAL ---
// // // // // // // // //     useEffect(() => {
// // // // // // // // //         const provs = getProvinces();
// // // // // // // // //         setProvinces(provs);
        
// // // // // // // // //         api('/api/content').then(res => {
// // // // // // // // //             if (res && res.organizerCategories) setCmsCategories(res.organizerCategories);
// // // // // // // // //         }).catch(() => {});
        
// // // // // // // // //         // Fetch All Users for PIC Search
// // // // // // // // //         api('/api/users').then(res => setAllUsers(res.users || [])).catch(() => setAllUsers(facilitators));
// // // // // // // // //     }, []);

// // // // // // // // //     // Load Kota saat Provinsi berubah
// // // // // // // // //     useEffect(() => {
// // // // // // // // //         if (selectedProvId) {
// // // // // // // // //             const regs = getRegencies(selectedProvId);
// // // // // // // // //             setRegencies(regs);
// // // // // // // // //         } else {
// // // // // // // // //             setRegencies([]);
// // // // // // // // //         }
// // // // // // // // //     }, [selectedProvId]);

// // // // // // // // //     // Fetch Course Data Detail
// // // // // // // // //     useEffect(() => {
// // // // // // // // //         const initData = async () => {
// // // // // // // // //             if (course && course._id) {
// // // // // // // // //                 setFetchingDetail(true);
// // // // // // // // //                 try {
// // // // // // // // //                     const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
// // // // // // // // //                     const fullData = res.course || res.data || res;
// // // // // // // // //                     populateForm(fullData);
// // // // // // // // //                 } catch (e) {
// // // // // // // // //                     populateForm(course);
// // // // // // // // //                 } finally {
// // // // // // // // //                     setFetchingDetail(false);
// // // // // // // // //                 }
// // // // // // // // //             } else {
// // // // // // // // //                 if (currentUser) {
// // // // // // // // //                      setFormData(prev => ({
// // // // // // // // //                         ...prev,
// // // // // // // // //                         contactName: currentUser.name,
// // // // // // // // //                         contactEmail: currentUser.email,
// // // // // // // // //                         contactPhone: currentUser.phoneNumber || ''
// // // // // // // // //                       }));
// // // // // // // // //                 }
// // // // // // // // //             }
// // // // // // // // //         };
// // // // // // // // //         initData();
// // // // // // // // //     }, [course]);

// // // // // // // // //     const populateForm = (data: any) => {
// // // // // // // // //         const formatDate = (d: string) => {
// // // // // // // // //             if (!d) return '';
// // // // // // // // //             try { return new Date(d).toISOString().split('T')[0]; } catch (e) { return ''; }
// // // // // // // // //         };

// // // // // // // // //         // [FIX] Handle PICs: Combine legacy 'pics' and relation 'picIds'
// // // // // // // // //         let initialPics = Array.isArray(data.pics) ? data.pics : [];
// // // // // // // // //         if (Array.isArray(data.picIds) && data.picIds.length > 0) {
// // // // // // // // //             // Jika ada data relation picIds (populated), gunakan itu
// // // // // // // // //             initialPics = data.picIds.map((p: any) => ({
// // // // // // // // //                 id: p._id || p.id,
// // // // // // // // //                 name: p.name,
// // // // // // // // //                 email: p.email,
// // // // // // // // //                 role: p.role,
// // // // // // // // //                 avatarUrl: p.avatarUrl
// // // // // // // // //             }));
// // // // // // // // //         }

// // // // // // // // //         setFormData({
// // // // // // // // //             title: data.title || '', description: data.description || '', 
// // // // // // // // //             programType: data.programType || 'training', 
// // // // // // // // //             hasCertificate: data.hasCertificate ?? true,
            
// // // // // // // // //             regIsForever: data.registrationPeriod?.isForever ?? false,
// // // // // // // // //             regStartDate: formatDate(data.registrationPeriod?.startDate),
// // // // // // // // //             regEndDate: formatDate(data.registrationPeriod?.endDate),

// // // // // // // // //             execIsForever: data.executionPeriod?.isForever ?? false,
// // // // // // // // //             execStartDate: formatDate(data.executionPeriod?.startDate),
// // // // // // // // //             execEndDate: formatDate(data.executionPeriod?.endDate),

// // // // // // // // //             thumbnailUrl: data.thumbnailUrl || '', promoVideoUrl: data.promoVideoUrl || '',

// // // // // // // // //             registrationMethod: data.registrationMethod || 'auto',
// // // // // // // // //             requireDocs: data.registrationConfig?.requireDocs !== false,
// // // // // // // // //             registrationTemplates: Array.isArray(data.registrationConfig?.templates) ? data.registrationConfig.templates : [],

// // // // // // // // //             price: Number(data.price) || 0, 
// // // // // // // // //             estimatedDuration: Number(data.estimatedDuration) || 0, 
// // // // // // // // //             totalJp: Number(data.totalJp) || 0,
            
// // // // // // // // //             facilities: Array.isArray(data.facilities) ? data.facilities : [],
// // // // // // // // //             facilitatorIds: Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [],
// // // // // // // // //             pics: initialPics, 
            
// // // // // // // // //             creatorInfo: data.creatorInfo || null,
// // // // // // // // //             contactName: data.contact?.name || data.creatorInfo?.name || '',
// // // // // // // // //             contactEmail: data.contact?.email || data.creatorInfo?.email || '',
// // // // // // // // //             contactPhone: data.contact?.phone || data.creatorInfo?.contact || ''
// // // // // // // // //         });

// // // // // // // // //         // Parse Organizer Data
// // // // // // // // //         if (data.organizer) {
// // // // // // // // //             const org = data.organizer;
// // // // // // // // //             if (org === 'PMI Pusat') {
// // // // // // // // //                 setOrganizerType('PMI Pusat');
// // // // // // // // //             } else if (org.startsWith('PMI Provinsi')) {
// // // // // // // // //                 setOrganizerType('PMI Provinsi');
// // // // // // // // //                 const pName = org.split(': ')[1]?.trim();
// // // // // // // // //                 const foundProv = getProvinces().find((p: any) => p.name === pName);
// // // // // // // // //                 if (foundProv) setSelectedProvId(foundProv.code);
// // // // // // // // //             } else if (org.startsWith('PMI Kab/Kota')) {
// // // // // // // // //                 setOrganizerType('PMI Kabupaten/Kota');
// // // // // // // // //                 const locParts = org.split(': ')[1]?.split(',');
// // // // // // // // //                 if (locParts && locParts.length > 1) {
// // // // // // // // //                      const cityName = locParts[0]?.trim();
// // // // // // // // //                      const provName = locParts[1]?.trim();
// // // // // // // // //                      const foundProv = getProvinces().find((p: any) => p.name === provName);
// // // // // // // // //                      if (foundProv) {
// // // // // // // // //                          setSelectedProvId(foundProv.code);
// // // // // // // // //                          const regs = getRegencies(foundProv.code);
// // // // // // // // //                          setRegencies(regs);
// // // // // // // // //                          const foundCity = regs.find((r: any) => r.name === cityName);
// // // // // // // // //                          if (foundCity) setSelectedCityId(foundCity.code);
// // // // // // // // //                      }
// // // // // // // // //                 }
// // // // // // // // //             } else {
// // // // // // // // //                 const parts = org.split(': ');
// // // // // // // // //                 setOrganizerType(parts[0]);
// // // // // // // // //                 setOrganizerName(parts[1] || '');
// // // // // // // // //             }
// // // // // // // // //         }
// // // // // // // // //     }

// // // // // // // // //     // --- HANDLERS ---
// // // // // // // // //     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
    
// // // // // // // // //     // Facility Handlers
// // // // // // // // //     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
// // // // // // // // //     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };
    
// // // // // // // // //     // Facilitator Handlers
// // // // // // // // //     const toggleFacilitator = (id: string) => {
// // // // // // // // //         const current = formData.facilitatorIds;
// // // // // // // // //         setFormData(prev => ({ ...prev, facilitatorIds: current.includes(id) ? current.filter(fid => fid !== id) : [...current, id] }));
// // // // // // // // //     };

// // // // // // // // //     // PIC Handlers
// // // // // // // // //     const handleAddPicFromSearch = (user: any) => {
// // // // // // // // //         if (formData.pics.length >= 3) return alert("Maksimal 3 PIC Tambahan");
// // // // // // // // //         if (formData.pics.some((p: any) => p.email === user.email)) return alert("User ini sudah ditambahkan.");

// // // // // // // // //         const newPic = {
// // // // // // // // //             id: user._id || user.id, // [FIX] SIMPAN ID USER
// // // // // // // // //             name: user.name,
// // // // // // // // //             pmiStatus: user.role, 
// // // // // // // // //             email: user.email,
// // // // // // // // //             avatarUrl: user.avatarUrl
// // // // // // // // //         };
// // // // // // // // //         setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
// // // // // // // // //         setSearchPic('');
// // // // // // // // //     };

// // // // // // // // //     const removePic = (idx: number) => { setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); };
    
// // // // // // // // //     // Upload Handlers
// // // // // // // // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // // // // // //         try {
// // // // // // // // //             setUploadingCover(true); const fd = new FormData(); fd.append('file', file);
// // // // // // // // //             const res = await apiUpload('/api/upload', fd); 
// // // // // // // // //             const url = res.url || res.file?.url || res.data?.url;
// // // // // // // // //             if (url) handleChange('thumbnailUrl', url);
// // // // // // // // //         } catch (err: any) { alert('Gagal: ' + err.message); } finally { setUploadingCover(false); }
// // // // // // // // //     };

// // // // // // // // //     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // // // // // //         setUploadingTemplate(true);
// // // // // // // // //         try {
// // // // // // // // //             const fd = new FormData(); fd.append('file', file);
// // // // // // // // //             const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
// // // // // // // // //             const token = userStr ? JSON.parse(userStr).token : '';

// // // // // // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { 
// // // // // // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
// // // // // // // // //                 withCredentials: true 
// // // // // // // // //             });
            
// // // // // // // // //             const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url;
// // // // // // // // //             if (!rawUrl) throw new Error("Gagal dapat URL.");

// // // // // // // // //             setFormData(prev => ({
// // // // // // // // //                 ...prev,
// // // // // // // // //                 registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }]
// // // // // // // // //             }));
// // // // // // // // //         } catch (err: any) {
// // // // // // // // //             console.error(err);
// // // // // // // // //             alert('Upload Gagal: ' + (err.response?.data?.message || err.message));
// // // // // // // // //         } finally {
// // // // // // // // //             setUploadingTemplate(false);
// // // // // // // // //             if (templateInputRef.current) templateInputRef.current.value = '';
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     const removeTemplate = (idx: number) => {
// // // // // // // // //         if(!confirm("Hapus dokumen ini?")) return;
// // // // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) }));
// // // // // // // // //     };

// // // // // // // // //     const updateTemplateTitle = (idx: number, v: string) => {
// // // // // // // // //         const t = [...formData.registrationTemplates]; t[idx].title = v;
// // // // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: t }));
// // // // // // // // //     };

// // // // // // // // //     // --- LOGIKA SIMPAN ---
// // // // // // // // //     const handlePreSubmit = () => {
// // // // // // // // //         if (!formData.title) return alert("Judul wajib diisi!");
// // // // // // // // //         setShowDisclaimer(true);
// // // // // // // // //     };

// // // // // // // // //     const handleFinalSubmit = async () => {
// // // // // // // // //         if (!isAgreed) return alert("Mohon setujui pernyataan disclaimer.");
        
// // // // // // // // //         setLoading(true);
// // // // // // // // //         try {
// // // // // // // // //             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
// // // // // // // // //             const picIds = validPics.map((p: any) => p.id || p._id).filter((id: any) => id);

// // // // // // // // //             const parseDate = (d: string) => d ? new Date(d) : null;

// // // // // // // // //             // Konstruksi Pelaksana
// // // // // // // // //             let finalOrganizer = organizerType;
// // // // // // // // //             if (organizerType === 'PMI Provinsi') {
// // // // // // // // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
// // // // // // // // //                 finalOrganizer = `PMI Provinsi: ${provName}`;
// // // // // // // // //             } else if (organizerType === 'PMI Kabupaten/Kota') {
// // // // // // // // //                 const cityName = regencies.find(r => r.code === selectedCityId)?.name || '';
// // // // // // // // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
// // // // // // // // //                 finalOrganizer = `PMI Kabupaten/Kota: ${cityName}, ${provName}`;
// // // // // // // // //             } else if (organizerType !== 'PMI Pusat') {
// // // // // // // // //                 finalOrganizer = `${organizerType}: ${organizerName}`;
// // // // // // // // //             }

// // // // // // // // //             const payload = {
// // // // // // // // //                 title: formData.title,
// // // // // // // // //                 description: formData.description,
// // // // // // // // //                 programType: formData.programType,
// // // // // // // // //                 hasCertificate: formData.hasCertificate,
// // // // // // // // //                 price: Number(formData.price),
// // // // // // // // //                 estimatedDuration: Number(formData.estimatedDuration),
// // // // // // // // //                 totalJp: Number(formData.totalJp),
// // // // // // // // //                 thumbnailUrl: formData.thumbnailUrl,
// // // // // // // // //                 promoVideoUrl: formData.promoVideoUrl,
                
// // // // // // // // //                 organizer: finalOrganizer,

// // // // // // // // //                 registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
// // // // // // // // //                 executionPeriod: { isForever: formData.execIsForever, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
// // // // // // // // //                 registrationMethod: formData.registrationMethod,
                
// // // // // // // // //                 registrationConfig: { 
// // // // // // // // //                     requireDocs: formData.requireDocs, 
// // // // // // // // //                     templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) 
// // // // // // // // //                 },
                
// // // // // // // // //                 facilities: formData.facilities,
// // // // // // // // //                 facilitatorIds: formData.facilitatorIds,
                
// // // // // // // // //                 pics: validPics,
// // // // // // // // //                 picIds: picIds, 

// // // // // // // // //                 creatorInfo: formData.creatorInfo,
// // // // // // // // //                 contact: {
// // // // // // // // //                     name: formData.contactName,
// // // // // // // // //                     email: formData.contactEmail,
// // // // // // // // //                     phone: formData.contactPhone
// // // // // // // // //                 }
// // // // // // // // //             };

// // // // // // // // //             if (course?._id) await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
// // // // // // // // //             else await api('/api/courses', { method: 'POST', body: payload });

// // // // // // // // //             alert("Berhasil disimpan!");
// // // // // // // // //             onSuccess();
// // // // // // // // //         } catch (err: any) {
// // // // // // // // //             console.error(err);
// // // // // // // // //             alert("Gagal: " + (err.response?.data?.message || err.message));
// // // // // // // // //         } finally {
// // // // // // // // //             setLoading(false);
// // // // // // // // //             setShowDisclaimer(false);
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     // --- LOGIKA APPROVAL KONTEN (REVIEW 2) ---
// // // // // // // // //     const handleAdminApproveContent = async () => {
// // // // // // // // //         if(!confirm("Apakah Anda yakin konten pelatihan ini sudah lengkap dan SIAP UNTUK DIPUBLISH oleh Pengaju?")) return;
        
// // // // // // // // //         setLoading(true);
// // // // // // // // //         try {
// // // // // // // // //             await api(`/api/courses/${course._id}`, { 
// // // // // // // // //                 method: 'PATCH', 
// // // // // // // // //                 body: { status: 'ready' } // Update status ke READY (Step 2 selesai)
// // // // // // // // //             });
            
// // // // // // // // //             alert("✅ Konten disetujui! Status pelatihan sekarang: SIAP PUBLISH.\nPengaju sekarang bisa melihat tombol Publish di dashboard mereka.");
// // // // // // // // //             onSuccess();
// // // // // // // // //             onClose();
// // // // // // // // //         } catch (err: any) {
// // // // // // // // //             console.error(err);
// // // // // // // // //             alert("Gagal mengubah status: " + err.message);
// // // // // // // // //         } finally {
// // // // // // // // //             setLoading(false);
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     // Filter Logic
// // // // // // // // //     const selectedFacilitators = facilitators.filter(f => formData.facilitatorIds.includes(f.id || f._id));
// // // // // // // // //     const availableFacilitators = facilitators.filter(f => !formData.facilitatorIds.includes(f.id || f._id) && (f.name?.toLowerCase().includes(searchFacilitator.toLowerCase()) || f.email?.toLowerCase().includes(searchFacilitator.toLowerCase())));
// // // // // // // // //     const filteredPicCandidates = allUsers.filter(u => ((u.name || '').toLowerCase().includes(searchPic.toLowerCase()) || (u.email || '').toLowerCase().includes(searchPic.toLowerCase())) && !formData.pics.some((p: any) => p.email === u.email));
// // // // // // // // //     const allOrgTypes = ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota', ...cmsCategories];

// // // // // // // // //     // Cek Role & Status
// // // // // // // // //     const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN' || currentUser?.permissions?.includes('manage_courses');
// // // // // // // // //     const isDraftStatus = course?.status === 'draft';

// // // // // // // // //     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><Loader2 className="animate-spin text-white"/></div>;

// // // // // // // // //     return (
// // // // // // // // //         <>
// // // // // // // // //             <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
// // // // // // // // //                 <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
                    
// // // // // // // // //                     {/* HEADER */}
// // // // // // // // //                     <div className="bg-[#990000] text-white p-5 flex justify-between items-center shrink-0">
// // // // // // // // //                         <div>
// // // // // // // // //                             <h2 className="text-xl font-bold">{course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2>
// // // // // // // // //                             <p className="text-xs text-gray-100 mt-1">
// // // // // // // // //                                 {isDraftStatus && isSuperAdmin ? 'Review Kelengkapan Materi Pelatihan' : 'Lengkapi data pelatihan.'}
// // // // // // // // //                             </p>
// // // // // // // // //                         </div>
// // // // // // // // //                         <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" title="Tutup" aria-label="Tutup"><X size={24}/></button>
// // // // // // // // //                     </div>

// // // // // // // // //                     {/* TABS */}
// // // // // // // // //                     <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0">
// // // // // // // // //                         {[{ id: 'info', label: '1. Informasi Dasar', icon: FileText }, { id: 'media', label: '2. Media & Visual', icon: ImageIcon }, { id: 'registration', label: '3. Jadwal & Pelaksana', icon: Calendar }, { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award }, { id: 'team', label: '5. Tim & PIC', icon: Users }].map((tab) => (
// // // // // // // // //                             <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`} aria-label={`Tab ${tab.label}`}><tab.icon size={16} /> {tab.label}</button>
// // // // // // // // //                         ))}
// // // // // // // // //                     </div>

// // // // // // // // //                     <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
// // // // // // // // //                         {/* TAB 1: INFO */}
// // // // // // // // //                         {activeTab === 'info' && (
// // // // // // // // //                             <div className="space-y-6 max-w-4xl mx-auto">
// // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // //                                     <div><label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="inpTitle">Judul Pelatihan <span className="text-red-500">*</span></label><input id="inpTitle" required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: Orientasi Kepalangmerahan" value={formData.title} onChange={e => handleChange('title', e.target.value)} aria-label="Judul"/></div>
// // // // // // // // //                                     <div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap <span className="text-red-500">*</span></label><div className="bg-white border rounded-lg overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" aria-label="Deskripsi" /></div></div>
// // // // // // // // //                                 </div>

// // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
// // // // // // // // //                                     <div>
// // // // // // // // //                                         <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label>
// // // // // // // // //                                         <div className="flex gap-4">
// // // // // // // // //                                             <div onClick={() => handleChange('programType', 'training')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'training' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// // // // // // // // //                                                 <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'training' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'training' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// // // // // // // // //                                                 <span className="text-sm text-gray-700 font-medium">Diklat Resmi</span>
// // // // // // // // //                                             </div>
// // // // // // // // //                                             <div onClick={() => handleChange('programType', 'course')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'course' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// // // // // // // // //                                                 <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'course' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'course' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// // // // // // // // //                                                 <span className="text-sm text-gray-700 font-medium">Kursus Mandiri</span>
// // // // // // // // //                                             </div>
// // // // // // // // //                                         </div>
// // // // // // // // //                                     </div>
// // // // // // // // //                                     <div className="w-px bg-gray-200"></div>
// // // // // // // // //                                     <div className="flex items-center gap-3">
// // // // // // // // //                                         <div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // // // // // //                                             <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div>
// // // // // // // // //                                             <span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span>
// // // // // // // // //                                         </div>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 </div>
// // // // // // // // //                             </div>
// // // // // // // // //                         )}

// // // // // // // // //                         {/* TAB 2: MEDIA */}
// // // // // // // // //                         {activeTab === 'media' && (
// // // // // // // // //                             <div className="max-w-3xl mx-auto space-y-6">
// // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // //                                     <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) <span className="text-red-500">*</span></label>
// // // // // // // // //                                     <div className="flex gap-6 items-start">
// // // // // // // // //                                         <div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
// // // // // // // // //                                             {formData.thumbnailUrl ? <img src={getLocalDisplayUrl(formData.thumbnailUrl)} alt="Preview Cover" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1" /><span className="text-xs">Belum ada gambar</span></div>}
// // // // // // // // //                                             {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
// // // // // // // // //                                         </div>
// // // // // // // // //                                         <div className="flex-1">
// // // // // // // // //                                             <p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p>
// // // // // // // // //                                             <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" title="Input Gambar"/>
// // // // // // // // //                                             <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2" title="Upload Gambar"><Upload size={16}/> Upload Gambar</button>
// // // // // // // // //                                         </div>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 </div>
// // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // //                                     <label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label>
// // // // // // // // //                                     <div className="flex gap-2"><div className="p-3 bg-gray-100 rounded-l-lg border border-r-0 text-gray-500"><Video size={18}/></div><input type="text" className="flex-1 p-2.5 border rounded-r-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} aria-label="URL Video Youtube" /></div>
// // // // // // // // //                                 </div>
// // // // // // // // //                             </div>
// // // // // // // // //                         )}

// // // // // // // // //                         {/* TAB 3: JADWAL & PELAKSANA */}
// // // // // // // // //                         {activeTab === 'registration' && (
// // // // // // // // //                             <div className="max-w-4xl mx-auto space-y-6">
// // // // // // // // //                                 <div className="grid grid-cols-2 gap-6">
// // // // // // // // //                                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // //                                         <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
// // // // // // // // //                                         <div className="flex items-center gap-2 mb-2">
// // // // // // // // //                                             <div onClick={() => handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // // // // // //                                                 <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // // // // // //                                                 <span className="text-sm text-gray-600">Buka Selamanya</span>
// // // // // // // // //                                             </div>
// // // // // // // // //                                         </div>
// // // // // // // // //                                         {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} title="Mulai Pendaftaran" /></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} title="Selesai Pendaftaran" /></div></div>)}
// // // // // // // // //                                     </div>
// // // // // // // // //                                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // //                                         <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
// // // // // // // // //                                         <div className="flex items-center gap-2 mb-2">
// // // // // // // // //                                             <div onClick={() => handleChange('execIsForever', !formData.execIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // // // // // //                                                 <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.execIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // // // // // //                                                 <span className="text-sm text-gray-600">Fleksibel</span>
// // // // // // // // //                                             </div>
// // // // // // // // //                                         </div>
// // // // // // // // //                                         {!formData.execIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} aria-label="Pelaksanaan Mulai"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} aria-label="Pelaksanaan Selesai"/></div></div>)}
// // // // // // // // //                                     </div>
// // // // // // // // //                                 </div>

// // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // //                                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan <span className="text-red-500">*</span></label>
// // // // // // // // //                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // // // //                                         <select className="w-full p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500" value={organizerType} onChange={(e) => { setOrganizerType(e.target.value); setSelectedProvId(''); setSelectedCityId(''); }} title="Tipe Pelaksana">
// // // // // // // // //                                             {allOrgTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
// // // // // // // // //                                         </select>
// // // // // // // // //                                         {organizerType === 'PMI Provinsi' && (
// // // // // // // // //                                             <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi">
// // // // // // // // //                                                 <option value="">-- Pilih Provinsi --</option>
// // // // // // // // //                                                 {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// // // // // // // // //                                             </select>
// // // // // // // // //                                         )}
// // // // // // // // //                                         {organizerType === 'PMI Kabupaten/Kota' && (
// // // // // // // // //                                             <>
// // // // // // // // //                                                 <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi">
// // // // // // // // //                                                     <option value="">-- Pilih Provinsi --</option>
// // // // // // // // //                                                     {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// // // // // // // // //                                                 </select>
// // // // // // // // //                                                 <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedCityId} onChange={e => setSelectedCityId(e.target.value)} disabled={!selectedProvId} aria-label="Pilih Kota">
// // // // // // // // //                                                     <option value="">-- Pilih Kab/Kota --</option>
// // // // // // // // //                                                     {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
// // // // // // // // //                                                 </select>
// // // // // // // // //                                             </>
// // // // // // // // //                                         )}
// // // // // // // // //                                         {!['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota'].includes(organizerType) && (
// // // // // // // // //                                             <input type="text" className="w-full p-2.5 border rounded-lg" placeholder="Nama Unit / Organisasi..." value={organizerName} onChange={e => setOrganizerName(e.target.value)} aria-label="Nama Organisasi"/>
// // // // // // // // //                                         )}
// // // // // // // // //                                     </div>
// // // // // // // // //                                 </div>
                                
// // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // //                                     <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan Peserta</h3>
// // // // // // // // //                                     <div className="space-y-4">
// // // // // // // // //                                          <div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'auto' ? 'bg-green-50 border-green-200 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'auto' ? 'border-green-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'auto' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Otomatis (Langsung Aktif)</span><span className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</span></div></div>
// // // // // // // // //                                          <div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'manual' ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'manual' ? 'border-yellow-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'manual' && <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Manual (Verifikasi Admin)</span><span className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</span></div></div>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 </div>

// // // // // // // // //                                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // //                                     <div className="flex justify-between items-start mb-4">
// // // // // // // // //                                         <div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div>
// // // // // // // // //                                         <div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer">
// // // // // // // // //                                             <div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // // // // // //                                             <span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span>
// // // // // // // // //                                         </div>
// // // // // // // // //                                     </div>
// // // // // // // // //                                     {formData.requireDocs && (
// // // // // // // // //                                         <div className="space-y-3">
// // // // // // // // //                                             <div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} title="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50" aria-label="Upload Template"><Upload size={14}/> Upload Template Baru</button></div>
// // // // // // // // //                                             {formData.registrationTemplates.map((item: any, idx: number) => (
// // // // // // // // //                                                 <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
// // // // // // // // //                                                     <div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div>
// // // // // // // // //                                                     <div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} aria-label="Nama Dokumen"/><a href={getLocalDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()} aria-label="Download File"><Download size={10} /> Lihat File Uploaded</a></div>
// // // // // // // // //                                                     <button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" aria-label="Hapus Dokumen"><Trash2 size={16} /></button>
// // // // // // // // //                                                 </div>
// // // // // // // // //                                             ))}
// // // // // // // // //                                         </div>
// // // // // // // // //                                     )}
// // // // // // // // //                                 </div>
// // // // // // // // //                             </div>
// // // // // // // // //                         )}

// // // // // // // // //                         {/* TAB 4: FASILITAS */}
// // // // // // // // //                         {activeTab === 'facilities' && (
// // // // // // // // //                             <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
// // // // // // // // //                                 <div className="space-y-6">
// // // // // // // // //                                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" aria-label="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div>
// // // // // // // // //                                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.estimatedDuration} disabled aria-label="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.totalJp} disabled aria-label="Total JP"/></div></div></div>
// // // // // // // // //                                 </div>
// // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas <span className="text-red-500">*</span></label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} aria-label="Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" aria-label="Tambah Fasilitas"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" aria-label="Hapus Fasilitas"><X size={14}/></button></div>))}</div></div>
// // // // // // // // //                             </div>
// // // // // // // // //                         )}

// // // // // // // // //                         {/* TAB 5: TIM & PIC */}
// // // // // // // // //                         {activeTab === 'team' && (
// // // // // // // // //                             <div className="max-w-4xl mx-auto space-y-8">
// // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // //                                     <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
// // // // // // // // //                                     <p className="text-xs text-gray-500 mb-4">*Mencakup Admin, Superadmin, dan Fasilitator.</p>
                                    
// // // // // // // // //                                     <div className="mb-4 space-y-2">
// // // // // // // // //                                         {selectedFacilitators.map(fac => (
// // // // // // // // //                                             <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100 animate-in slide-in-from-top-1">
// // // // // // // // //                                                 <div className="flex items-center gap-3">
// // // // // // // // //                                                     <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-xs border border-red-200">{fac.name?.charAt(0)}</div>
// // // // // // // // //                                                     <div><span className="text-sm font-bold text-red-900 block">{fac.name}</span><span className="text-[10px] text-red-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full w-fit border border-red-100"><Clock size={10}/> Menunggu Persetujuan</span></div>
// // // // // // // // //                                                 </div>
// // // // // // // // //                                                 <button type="button" onClick={() => toggleFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus" aria-label="Hapus"><X size={14}/></button>
// // // // // // // // //                                             </div>
// // // // // // // // //                                         ))}
// // // // // // // // //                                     </div>

// // // // // // // // //                                     <div className="relative">
// // // // // // // // //                                         <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // // // // // // //                                         <input type="text" placeholder="Cari nama atau email..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchFacilitator} onChange={(e) => setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator"/>
// // // // // // // // //                                         {searchFacilitator && (
// // // // // // // // //                                             <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// // // // // // // // //                                                 {availableFacilitators.length > 0 ? availableFacilitators.map(fac => (
// // // // // // // // //                                                     <button key={fac._id || fac.id} type="button" onClick={() => { toggleFacilitator(fac._id || fac.id); setSearchFacilitator(''); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// // // // // // // // //                                                         <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{fac.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{fac.name}</p><p className="text-[10px] text-gray-400">{fac.email} • {fac.role}</p></div></div><Plus size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // // // // // // // //                                                     </button>
// // // // // // // // //                                                 )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // // // // // // // //                                             </div>
// // // // // // // // //                                         )}
// // // // // // // // //                                     </div>
// // // // // // // // //                                 </div>
                                
// // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // //                                     <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
                                    
// // // // // // // // //                                     <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
// // // // // // // // //                                         <div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div>
// // // // // // // // //                                         <div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div>
// // // // // // // // //                                     </div>

// // // // // // // // //                                     <div className="space-y-2 mb-4">
// // // // // // // // //                                         <label className="text-sm font-bold text-gray-700 block">Daftar PIC Tambahan (Maks 3)</label>
// // // // // // // // //                                         {formData.pics.map((pic: any, idx: number) => (
// // // // // // // // //                                             <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in slide-in-from-top-1">
// // // // // // // // //                                                 <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">{pic.name?.charAt(0)}</div><div><span className="text-sm font-bold text-blue-900 block">{pic.name}</span><div className="flex gap-2"><span className="text-[10px] text-blue-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full border border-blue-100"><Clock size={10}/> Menunggu Persetujuan</span><span className="text-[10px] text-gray-500">{pic.email}</span></div></div></div><button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
// // // // // // // // //                                             </div>
// // // // // // // // //                                         ))}
// // // // // // // // //                                     </div>

// // // // // // // // //                                     {formData.pics.length < 3 ? (
// // // // // // // // //                                         <div className="relative">
// // // // // // // // //                                             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // // // // // // //                                             <input type="text" placeholder="Cari user untuk dijadikan PIC..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchPic} onChange={(e) => setSearchPic(e.target.value)} aria-label="Cari PIC"/>
// // // // // // // // //                                             {searchPic && (
// // // // // // // // //                                                 <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// // // // // // // // //                                                     {filteredPicCandidates.length > 0 ? filteredPicCandidates.map(user => (
// // // // // // // // //                                                         <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// // // // // // // // //                                                             <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div></div><UserPlus size={16} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // // // // // // // //                                                         </button>
// // // // // // // // //                                                     )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // // // // // // // //                                                 </div>
// // // // // // // // //                                             )}
// // // // // // // // //                                         </div>
// // // // // // // // //                                     ) : <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 rounded-lg border border-gray-200">Kuota PIC penuh (Maksimal 3).</div>}
// // // // // // // // //                                 </div>

// // // // // // // // //                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // //                                     <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckSquare size={18}/> Kontak Utama (Landing Page)</h3></div>
// // // // // // // // //                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // // // //                                         <div><label className="text-xs font-bold text-gray-500">Nama Kontak <span className="text-red-500">*</span></label><input name="contactName" value={formData.contactName} onChange={(e) => handleChange('contactName', e.target.value)} className="w-full p-2 border rounded" aria-label="Nama Kontak" /></div>
// // // // // // // // //                                         <div><label className="text-xs font-bold text-gray-500">Email Kontak <span className="text-red-500">*</span></label><input name="contactEmail" value={formData.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} className="w-full p-2 border rounded" aria-label="Email Kontak" /></div>
// // // // // // // // //                                         <div className="md:col-span-2"><label className="text-xs font-bold text-gray-500">Nomor Telepon/WA <span className="text-red-500">*</span></label><input name="contactPhone" value={formData.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} className="w-full p-2 border rounded" placeholder="628..." aria-label="Telepon Kontak" /></div>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 </div>
// // // // // // // // //                             </div>
// // // // // // // // //                         )}
// // // // // // // // //                     </div>

// // // // // // // // //                     <div className="bg-white border-t p-4 flex justify-between items-center shrink-0">
// // // // // // // // //                         {/* Status Info */}
// // // // // // // // //                         <div className="text-xs text-gray-500 hidden md:block">
// // // // // // // // //                             Status saat ini: <span className="font-bold uppercase">{course?.status || 'Baru'}</span>
// // // // // // // // //                         </div>

// // // // // // // // //                         {/* Action Buttons */}
// // // // // // // // //                         <div className="flex gap-3">
// // // // // // // // //                             <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50" title="Batal">Batal</button>
                            
// // // // // // // // //                             {/* [TOMBOL REVIEW 2 - KHUSUS ADMIN] */}
// // // // // // // // //                             {/* Muncul jika user Admin & status kursus = DRAFT */}
// // // // // // // // //                             {isSuperAdmin && isDraftStatus && course?._id && (
// // // // // // // // //                                 <button 
// // // // // // // // //                                     onClick={handleAdminApproveContent} 
// // // // // // // // //                                     disabled={loading}
// // // // // // // // //                                     className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-md flex items-center gap-2"
// // // // // // // // //                                 >
// // // // // // // // //                                     {loading ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18}/>}
// // // // // // // // //                                     Setujui Konten (Siap Publish)
// // // // // // // // //                                 </button>
// // // // // // // // //                             )}

// // // // // // // // //                             <button onClick={handlePreSubmit} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] shadow-lg flex items-center gap-2 disabled:opacity-50" aria-label="Simpan Pelatihan">
// // // // // // // // //                                 {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} 
// // // // // // // // //                                 Simpan Perubahan
// // // // // // // // //                             </button>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* --- DISCLAIMER POPUP --- */}
// // // // // // // // //                 {showDisclaimer && (
// // // // // // // // //                     <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in">
// // // // // // // // //                         <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 text-center space-y-4">
// // // // // // // // //                             <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2"><ShieldCheck size={32} className="text-orange-600"/></div>
// // // // // // // // //                             <h3 className="text-xl font-bold text-gray-900">Pernyataan Disclaimer</h3>
// // // // // // // // //                             <p className="text-sm text-gray-500 leading-relaxed">Saya menyatakan bahwa data pelatihan ini benar dan bertanggung jawab atas konten yang disajikan. Saya memahami bahwa Fasilitator dan PIC yang ditambahkan akan menerima notifikasi persetujuan di dashboard mereka.</p>
                            
// // // // // // // // //                             <label className="flex items-center justify-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors">
// // // // // // // // //                                 <input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} className="w-5 h-5 accent-orange-600" aria-label="Setuju"/>
// // // // // // // // //                                 <span className="font-bold text-sm text-orange-800">Saya Setuju & Lanjutkan</span>
// // // // // // // // //                             </label>

// // // // // // // // //                             <div className="flex gap-3 pt-2">
// // // // // // // // //                                 <button onClick={() => setShowDisclaimer(false)} className="flex-1 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50">Kembali</button>
// // // // // // // // //                                 <button onClick={handleFinalSubmit} disabled={!isAgreed || loading} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
// // // // // // // // //                                     {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Proses Simpan
// // // // // // // // //                                 </button>
// // // // // // // // //                             </div>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 )}
// // // // // // // // //             </div>
// // // // // // // // //         </>
// // // // // // // // //     );
// // // // // // // // // }

// // // // // // // // 'use client';

// // // // // // // // import { useState, useRef, useEffect } from 'react';
// // // // // // // // import { 
// // // // // // // //     X, Upload, Plus, Trash2, Save, Calendar, 
// // // // // // // //     Video, Image as ImageIcon, Users, FileText, 
// // // // // // // //     CheckCircle, AlertCircle, Award, Clock, Search, 
// // // // // // // //     Download, File, Loader2, UserPlus, 
// // // // // // // //     ShieldCheck, CheckSquare, Building
// // // // // // // // } from 'lucide-react';
// // // // // // // // import { api, apiUpload } from '@/lib/api'; 
// // // // // // // // import { getProvinces, getRegencies } from '@/lib/indonesia';
// // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // import 'react-quill/dist/quill.snow.css';
// // // // // // // // import axios from 'axios'; 
// // // // // // // // import BaseModal from '@/components/ui/BaseModal'; 

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
    
// // // // // // // //     // Refs
// // // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null); 
// // // // // // // //     const templateInputRef = useRef<HTMLInputElement>(null); 
    
// // // // // // // //     // State Search & Users
// // // // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
// // // // // // // //     const [searchPic, setSearchPic] = useState('');
// // // // // // // //     const [allUsers, setAllUsers] = useState<any[]>([]);
    
// // // // // // // //     // State Disclaimer Popup
// // // // // // // //     const [showDisclaimer, setShowDisclaimer] = useState(false);
// // // // // // // //     const [isAgreed, setIsAgreed] = useState(false);

// // // // // // // //     // State Pelaksana & Wilayah
// // // // // // // //     const [organizerType, setOrganizerType] = useState('PMI Pusat');
// // // // // // // //     const [organizerName, setOrganizerName] = useState(''); 
// // // // // // // //     const [provinces, setProvinces] = useState<any[]>([]);
// // // // // // // //     const [regencies, setRegencies] = useState<any[]>([]);
// // // // // // // //     const [selectedProvId, setSelectedProvId] = useState('');
// // // // // // // //     const [selectedCityId, setSelectedCityId] = useState('');
// // // // // // // //     const [cmsCategories, setCmsCategories] = useState<string[]>([]);

// // // // // // // //     // State UI Tambahan
// // // // // // // //     const [newFacility, setNewFacility] = useState('');
// // // // // // // //     const [uploadingCover, setUploadingCover] = useState(false);
// // // // // // // //     const [uploadingTemplate, setUploadingTemplate] = useState(false);

// // // // // // // //     // --- INITIAL STATE ---
// // // // // // // //     const defaultState = {
// // // // // // // //         title: '', description: '', 
// // // // // // // //         programType: 'training', 
// // // // // // // //         hasCertificate: true,
        
// // // // // // // //         regIsForever: false, regStartDate: '', regEndDate: '',
// // // // // // // //         execIsForever: false, execStartDate: '', execEndDate: '',
        
// // // // // // // //         thumbnailUrl: '', promoVideoUrl: '',
        
// // // // // // // //         registrationMethod: 'auto', 
// // // // // // // //         requireDocs: true, 
// // // // // // // //         registrationTemplates: [] as any[], 
        
// // // // // // // //         price: 0, estimatedDuration: 0, totalJp: 0, 
// // // // // // // //         facilities: [] as string[], 
// // // // // // // //         facilitatorIds: [] as string[],
// // // // // // // //         pics: [] as any[], 
        
// // // // // // // //         creatorInfo: null as any,
// // // // // // // //         contactName: '', contactPhone: '', contactEmail: ''
// // // // // // // //     };

// // // // // // // //     const [formData, setFormData] = useState(defaultState);

// // // // // // // //     const getLocalDisplayUrl = (url: string) => {
// // // // // // // //         if (!url) return '';
// // // // // // // //         if (url.startsWith('http')) return url;
// // // // // // // //         const cleanPath = url.startsWith('/') ? url : `/${url}`;
// // // // // // // //         return `${API_BASE_URL}${cleanPath}`;
// // // // // // // //     };

// // // // // // // //     // --- LOAD DATA AWAL ---
// // // // // // // //     useEffect(() => {
// // // // // // // //         const provs = getProvinces();
// // // // // // // //         setProvinces(provs);
        
// // // // // // // //         api('/api/content').then(res => {
// // // // // // // //             if (res && res.organizerCategories) setCmsCategories(res.organizerCategories);
// // // // // // // //         }).catch(() => {});
        
// // // // // // // //         api('/api/users').then(res => setAllUsers(res.users || [])).catch(() => setAllUsers(facilitators));
// // // // // // // //     }, []);

// // // // // // // //     useEffect(() => {
// // // // // // // //         if (selectedProvId) {
// // // // // // // //             const regs = getRegencies(selectedProvId);
// // // // // // // //             setRegencies(regs);
// // // // // // // //         } else {
// // // // // // // //             setRegencies([]);
// // // // // // // //         }
// // // // // // // //     }, [selectedProvId]);

// // // // // // // //     useEffect(() => {
// // // // // // // // //         const initData = async () => {
// // // // // // // // //             if (course && course._id) {
// // // // // // // // //                 setFetchingDetail(true);
// // // // // // // // //                 try {
// // // // // // // // //                     const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
// // // // // // // // //                     const fullData = res.course || res.data || res;
// // // // // // // // //                     populateForm(fullData);
// // // // // // // // //                 } catch (e) {
// // // // // // // // //                     populateForm(course);
// // // // // // // // //                 } finally {
// // // // // // // // //                     setFetchingDetail(false);
// // // // // // // // //                 }
// // // // // // // // //             } else {
// // // // // // // // //                 if (currentUser) {
// // // // // // // // //                      setFormData(prev => ({
// // // // // // // // //                         ...prev,
// // // // // // // // //                         contactName: currentUser.name,
// // // // // // // // //                         contactEmail: currentUser.email,
// // // // // // // // //                         contactPhone: currentUser.phoneNumber || ''
// // // // // // // // //                       }));
// // // // // // // // //                 }
// // // // // // // // //             }
// // // // // // // // //         };
// // // // // // // // //         initData();
// // // // // // // // //     }, [course]);

// // // // // // // // //     const populateForm = (data: any) => {
// // // // // // // // //         const formatDate = (d: string) => {
// // // // // // // // //             if (!d) return '';
// // // // // // // // //             try { return new Date(d).toISOString().split('T')[0]; } catch (e) { return ''; }
// // // // // // // // //         };

// // // // // // // // //         let initialPics = Array.isArray(data.pics) ? data.pics : [];
// // // // // // // // //         if (Array.isArray(data.picIds) && data.picIds.length > 0) {
// // // // // // // // //             initialPics = data.picIds.map((p: any) => ({
// // // // // // // // //                 id: p._id || p.id,
// // // // // // // // //                 name: p.name,
// // // // // // // // //                 email: p.email,
// // // // // // // // //                 role: p.role,
// // // // // // // // //                 avatarUrl: p.avatarUrl
// // // // // // // // //             }));
// // // // // // // // //         }

// // // // // // // // //         setFormData({
// // // // // // // // //             title: data.title || '', description: data.description || '', 
// // // // // // // // //             programType: data.programType || 'training', 
// // // // // // // // //             hasCertificate: data.hasCertificate ?? true,
            
// // // // // // // // //             regIsForever: data.registrationPeriod?.isForever ?? false,
// // // // // // // // //             regStartDate: formatDate(data.registrationPeriod?.startDate),
// // // // // // // // //             regEndDate: formatDate(data.registrationPeriod?.endDate),

// // // // // // // // //             execIsForever: data.executionPeriod?.isForever ?? false,
// // // // // // // // //             execStartDate: formatDate(data.executionPeriod?.startDate),
// // // // // // // // //             execEndDate: formatDate(data.executionPeriod?.endDate),

// // // // // // // // //             thumbnailUrl: data.thumbnailUrl || '', promoVideoUrl: data.promoVideoUrl || '',

// // // // // // // // //             registrationMethod: data.registrationMethod || 'auto',
// // // // // // // // //             requireDocs: data.registrationConfig?.requireDocs !== false,
// // // // // // // // //             registrationTemplates: Array.isArray(data.registrationConfig?.templates) ? data.registrationConfig.templates : [],

// // // // // // // // //             price: Number(data.price) || 0, 
// // // // // // // // //             estimatedDuration: Number(data.estimatedDuration) || 0, 
// // // // // // // // //             totalJp: Number(data.totalJp) || 0,
            
// // // // // // // // //             facilities: Array.isArray(data.facilities) ? data.facilities : [],
// // // // // // // // //             facilitatorIds: Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [],
// // // // // // // // //             pics: initialPics, 
            
// // // // // // // // //             creatorInfo: data.creatorInfo || null,
// // // // // // // // //             contactName: data.contact?.name || data.creatorInfo?.name || '',
// // // // // // // // //             contactEmail: data.contact?.email || data.creatorInfo?.email || '',
// // // // // // // // //             contactPhone: data.contact?.phone || data.creatorInfo?.contact || ''
// // // // // // // // //         });

// // // // // // // // //         if (data.organizer) {
// // // // // // // // //             const org = data.organizer;
// // // // // // // // //             if (org === 'PMI Pusat') {
// // // // // // // // //                 setOrganizerType('PMI Pusat');
// // // // // // // // //             } else if (org.startsWith('PMI Provinsi')) {
// // // // // // // // //                 setOrganizerType('PMI Provinsi');
// // // // // // // // //                 const pName = org.split(': ')[1]?.trim();
// // // // // // // // //                 const foundProv = getProvinces().find((p: any) => p.name === pName);
// // // // // // // // //                 if (foundProv) setSelectedProvId(foundProv.code);
// // // // // // // // //             } else if (org.startsWith('PMI Kab/Kota')) {
// // // // // // // // //                 setOrganizerType('PMI Kabupaten/Kota');
// // // // // // // // //                 const locParts = org.split(': ')[1]?.split(',');
// // // // // // // // //                 if (locParts && locParts.length > 1) {
// // // // // // // // //                      const cityName = locParts[0]?.trim();
// // // // // // // // //                      const provName = locParts[1]?.trim();
// // // // // // // // //                      const foundProv = getProvinces().find((p: any) => p.name === provName);
// // // // // // // // //                      if (foundProv) {
// // // // // // // // //                          setSelectedProvId(foundProv.code);
// // // // // // // // //                          const regs = getRegencies(foundProv.code);
// // // // // // // // //                          setRegencies(regs);
// // // // // // // // //                          const foundCity = regs.find((r: any) => r.name === cityName);
// // // // // // // // //                          if (foundCity) setSelectedCityId(foundCity.code);
// // // // // // // // //                      }
// // // // // // // // //                 }
// // // // // // // // //             } else {
// // // // // // // // //                 const parts = org.split(': ');
// // // // // // // // //                 setOrganizerType(parts[0]);
// // // // // // // // //                 setOrganizerName(parts[1] || '');
// // // // // // // // //             }
// // // // // // // // //         }
// // // // // // // // //     }

// // // // // // // // //     // --- HANDLERS ---
// // // // // // // // //     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
// // // // // // // // //     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
// // // // // // // // //     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };
// // // // // // // // //     const toggleFacilitator = (id: string) => {
// // // // // // // // //         const current = formData.facilitatorIds;
// // // // // // // // //         setFormData(prev => ({ ...prev, facilitatorIds: current.includes(id) ? current.filter(fid => fid !== id) : [...current, id] }));
// // // // // // // // //     };

// // // // // // // // //     const handleAddPicFromSearch = (user: any) => {
// // // // // // // // //         if (formData.pics.length >= 3) return alert("Maksimal 3 PIC Tambahan");
// // // // // // // // //         if (formData.pics.some((p: any) => p.email === user.email)) return alert("User ini sudah ditambahkan.");

// // // // // // // // //         const newPic = {
// // // // // // // // //             id: user._id || user.id,
// // // // // // // // //             name: user.name,
// // // // // // // // //             pmiStatus: user.role, 
// // // // // // // // //             email: user.email,
// // // // // // // // //             avatarUrl: user.avatarUrl
// // // // // // // // //         };
// // // // // // // // //         setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
// // // // // // // // //         setSearchPic('');
// // // // // // // // //     };

// // // // // // // // //     const removePic = (idx: number) => { setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); };
    
// // // // // // // // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // // // // // //         try {
// // // // // // // // //             setUploadingCover(true); const fd = new FormData(); fd.append('file', file);
// // // // // // // // //             const res = await apiUpload('/api/upload', fd); 
// // // // // // // // //             const url = res.url || res.file?.url || res.data?.url;
// // // // // // // // //             if (url) handleChange('thumbnailUrl', url);
// // // // // // // // //         } catch (err: any) { alert('Gagal: ' + err.message); } finally { setUploadingCover(false); }
// // // // // // // // //     };

// // // // // // // // //     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // // // // // //         setUploadingTemplate(true);
// // // // // // // // //         try {
// // // // // // // // //             const fd = new FormData(); fd.append('file', file);
// // // // // // // // //             const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
// // // // // // // // //             const token = userStr ? JSON.parse(userStr).token : '';

// // // // // // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { 
// // // // // // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
// // // // // // // // //                 withCredentials: true 
// // // // // // // // //             });
            
// // // // // // // // //             const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url;
// // // // // // // // //             if (!rawUrl) throw new Error("Gagal dapat URL.");

// // // // // // // // //             setFormData(prev => ({
// // // // // // // // //                 ...prev,
// // // // // // // // //                 registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }]
// // // // // // // // //             }));
// // // // // // // // //         } catch (err: any) {
// // // // // // // // //             console.error(err);
// // // // // // // // //             alert('Upload Gagal: ' + (err.response?.data?.message || err.message));
// // // // // // // // //         } finally {
// // // // // // // // //             setUploadingTemplate(false);
// // // // // // // // //             if (templateInputRef.current) templateInputRef.current.value = '';
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     const removeTemplate = (idx: number) => {
// // // // // // // // //         if(!confirm("Hapus dokumen ini?")) return;
// // // // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) }));
// // // // // // // // //     };

// // // // // // // // //     const updateTemplateTitle = (idx: number, v: string) => {
// // // // // // // // //         const t = [...formData.registrationTemplates]; t[idx].title = v;
// // // // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: t }));
// // // // // // // // //     };

// // // // // // // // //     const handlePreSubmit = () => {
// // // // // // // // //         if (!formData.title) return alert("Judul wajib diisi!");
// // // // // // // // //         setShowDisclaimer(true);
// // // // // // // // //     };

// // // // // // // // //     const handleFinalSubmit = async () => {
// // // // // // // // //         if (!isAgreed) return alert("Mohon setujui pernyataan disclaimer.");
        
// // // // // // // // //         setLoading(true);
// // // // // // // // //         try {
// // // // // // // // //             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
// // // // // // // // //             const picIds = validPics.map((p: any) => p.id || p._id).filter((id: any) => id);

// // // // // // // // //             const parseDate = (d: string) => d ? new Date(d) : null;

// // // // // // // // //             let finalOrganizer = organizerType;
// // // // // // // // //             if (organizerType === 'PMI Provinsi') {
// // // // // // // // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
// // // // // // // // //                 finalOrganizer = `PMI Provinsi: ${provName}`;
// // // // // // // // //             } else if (organizerType === 'PMI Kabupaten/Kota') {
// // // // // // // // //                 const cityName = regencies.find(r => r.code === selectedCityId)?.name || '';
// // // // // // // // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
// // // // // // // // //                 finalOrganizer = `PMI Kabupaten/Kota: ${cityName}, ${provName}`;
// // // // // // // // //             } else if (organizerType !== 'PMI Pusat') {
// // // // // // // // //                 finalOrganizer = `${organizerType}: ${organizerName}`;
// // // // // // // // //             }

// // // // // // // // //             const payload = {
// // // // // // // // //                 title: formData.title,
// // // // // // // // //                 description: formData.description,
// // // // // // // // //                 programType: formData.programType,
// // // // // // // // //                 hasCertificate: formData.hasCertificate,
// // // // // // // // //                 price: Number(formData.price),
// // // // // // // // //                 estimatedDuration: Number(formData.estimatedDuration),
// // // // // // // // //                 totalJp: Number(formData.totalJp),
// // // // // // // // //                 thumbnailUrl: formData.thumbnailUrl,
// // // // // // // // //                 promoVideoUrl: formData.promoVideoUrl,
                
// // // // // // // // //                 organizer: finalOrganizer,

// // // // // // // // //                 registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
// // // // // // // // //                 executionPeriod: { isForever: formData.execIsForever, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
// // // // // // // // //                 registrationMethod: formData.registrationMethod,
                
// // // // // // // // //                 registrationConfig: { 
// // // // // // // // //                     requireDocs: formData.requireDocs, 
// // // // // // // // //                     templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) 
// // // // // // // // //                 },
                
// // // // // // // // //                 facilities: formData.facilities,
// // // // // // // // //                 facilitatorIds: formData.facilitatorIds,
                
// // // // // // // // //                 pics: validPics,
// // // // // // // // //                 picIds: picIds, 

// // // // // // // // //                 creatorInfo: formData.creatorInfo,
// // // // // // // // //                 contact: {
// // // // // // // // //                     name: formData.contactName,
// // // // // // // // //                     email: formData.contactEmail,
// // // // // // // // //                     phone: formData.contactPhone
// // // // // // // // //                 }
// // // // // // // // //             };

// // // // // // // // //             if (course?._id) await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
// // // // // // // // //             else await api('/api/courses', { method: 'POST', body: payload });

// // // // // // // // //             alert("Berhasil disimpan!");
// // // // // // // // //             onSuccess();
// // // // // // // // //         } catch (err: any) {
// // // // // // // // //             console.error(err);
// // // // // // // // //             alert("Gagal: " + (err.response?.data?.message || err.message));
// // // // // // // // //         } finally {
// // // // // // // // //             setLoading(false);
// // // // // // // // //             setShowDisclaimer(false);
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     const handleAdminApproveContent = async () => {
// // // // // // // // //         if(!confirm("Apakah Anda yakin konten pelatihan ini sudah lengkap dan SIAP UNTUK DIPUBLISH oleh Pengaju?")) return;
        
// // // // // // // // //         setLoading(true);
// // // // // // // // //         try {
// // // // // // // // //             await api(`/api/courses/${course._id}`, { 
// // // // // // // // //                 method: 'PATCH', 
// // // // // // // // //                 body: { status: 'ready' } 
// // // // // // // // //             });
            
// // // // // // // // //             alert("✅ Konten disetujui! Status pelatihan sekarang: SIAP PUBLISH.\nPengaju sekarang bisa melihat tombol Publish di dashboard mereka.");
// // // // // // // // //             onSuccess();
// // // // // // // // //             onClose();
// // // // // // // // //         } catch (err: any) {
// // // // // // // // //             console.error(err);
// // // // // // // // //             alert("Gagal mengubah status: " + err.message);
// // // // // // // // //         } finally {
// // // // // // // // //             setLoading(false);
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     const selectedFacilitators = facilitators.filter(f => formData.facilitatorIds.includes(f.id || f._id));
// // // // // // // // //     const availableFacilitators = facilitators.filter(f => !formData.facilitatorIds.includes(f.id || f._id) && (f.name?.toLowerCase().includes(searchFacilitator.toLowerCase()) || f.email?.toLowerCase().includes(searchFacilitator.toLowerCase())));
// // // // // // // // //     const filteredPicCandidates = allUsers.filter(u => ((u.name || '').toLowerCase().includes(searchPic.toLowerCase()) || (u.email || '').toLowerCase().includes(searchPic.toLowerCase())) && !formData.pics.some((p: any) => p.email === u.email));
// // // // // // // // //     const allOrgTypes = ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota', ...cmsCategories];

// // // // // // // // //     const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN' || currentUser?.permissions?.includes('manage_courses');
// // // // // // // // //     const isDraftStatus = course?.status === 'draft';

// // // // // // // // //     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><Loader2 className="animate-spin text-white"/></div>;

// // // // // // // // //     const footerButtons = (
// // // // // // // // //         <>
// // // // // // // // //             <div className="flex-1 text-xs text-gray-500 hidden md:block text-left">
// // // // // // // // //                 Status saat ini: <span className="font-bold uppercase">{course?.status || 'Baru'}</span>
// // // // // // // // //             </div>
// // // // // // // // //             <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50">Batal</button>
            
// // // // // // // // //             {isSuperAdmin && isDraftStatus && course?._id && (
// // // // // // // // //                 <button 
// // // // // // // // //                     onClick={handleAdminApproveContent} 
// // // // // // // // //                     disabled={loading}
// // // // // // // // //                     className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-md flex items-center gap-2"
// // // // // // // // //                 >
// // // // // // // // //                     {loading ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18}/>}
// // // // // // // // //                     Setujui Konten
// // // // // // // // //                 </button>
// // // // // // // // //             )}

// // // // // // // // //             <button onClick={handlePreSubmit} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] shadow-lg flex items-center gap-2 disabled:opacity-50">
// // // // // // // // //                 {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} 
// // // // // // // // //                 Simpan Perubahan
// // // // // // // // //             </button>
// // // // // // // // //         </>
// // // // // // // // //     );

// // // // // // // // //     return (
// // // // // // // // //         <BaseModal
// // // // // // // // //             isOpen={true}
// // // // // // // // //             onClose={onClose}
// // // // // // // // //             title={course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}
// // // // // // // // //             subTitle={isDraftStatus && isSuperAdmin ? 'Review Kelengkapan Materi Pelatihan' : 'Lengkapi data pelatihan.'}
// // // // // // // // //             size="full" // GUNAKAN FULL AGAR LEBAR
// // // // // // // // //             footer={footerButtons}
// // // // // // // // //         >
// // // // // // // // //             {/* TABS MENU */}
// // // // // // // // //             <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0 mb-6 -mx-6 px-6 pt-2">
// // // // // // // // //                 {[{ id: 'info', label: '1. Informasi Dasar', icon: FileText }, { id: 'media', label: '2. Media & Visual', icon: ImageIcon }, { id: 'registration', label: '3. Jadwal & Pelaksana', icon: Calendar }, { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award }, { id: 'team', label: '5. Tim & PIC', icon: Users }].map((tab) => (
// // // // // // // // //                     <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
// // // // // // // // //                         <tab.icon size={16} /> {tab.label}
// // // // // // // // //                     </button>
// // // // // // // // //                 ))}
// // // // // // // // //             </div>

// // // // // // // // //             {/* TAB 1: INFO */}
// // // // // // // // //             {activeTab === 'info' && (
// // // // // // // // //                 <div className="space-y-6 max-w-4xl mx-auto">
// // // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="inpTitle">Judul Pelatihan <span className="text-red-500">*</span></label><input id="inpTitle" required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: Orientasi Kepalangmerahan" value={formData.title} onChange={e => handleChange('title', e.target.value)} aria-label="Judul"/></div>
// // // // // // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap <span className="text-red-500">*</span></label><div className="bg-white border rounded-lg overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" aria-label="Deskripsi" /></div></div>
// // // // // // // // //                     </div>

// // // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
// // // // // // // // //                         <div>
// // // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label>
// // // // // // // // //                             <div className="flex gap-4">
// // // // // // // // //                                 <div onClick={() => handleChange('programType', 'training')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'training' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// // // // // // // // //                                     <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'training' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'training' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// // // // // // // // //                                     <span className="text-sm text-gray-700 font-medium">Diklat Resmi</span>
// // // // // // // // //                                 </div>
// // // // // // // // //                                 <div onClick={() => handleChange('programType', 'course')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'course' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// // // // // // // // //                                     <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'course' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'course' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// // // // // // // // //                                     <span className="text-sm text-gray-700 font-medium">Kursus Mandiri</span>
// // // // // // // // //                                 </div>
// // // // // // // // //                             </div>
// // // // // // // // //                         </div>
// // // // // // // // //                         <div className="w-px bg-gray-200"></div>
// // // // // // // // //                         <div className="flex items-center gap-3">
// // // // // // // // //                             <div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // // // // // //                                 <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div>
// // // // // // // // //                                 <span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span>
// // // // // // // // //                             </div>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
// // // // // // // // //             )}

// // // // // // // // //             {/* TAB 2: MEDIA */}
// // // // // // // // //             {activeTab === 'media' && (
// // // // // // // // //                 <div className="max-w-3xl mx-auto space-y-6">
// // // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) <span className="text-red-500">*</span></label>
// // // // // // // // //                         <div className="flex gap-6 items-start">
// // // // // // // // //                             <div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
// // // // // // // // //                                 {formData.thumbnailUrl ? <img src={getLocalDisplayUrl(formData.thumbnailUrl)} alt="Preview Cover" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1" /><span className="text-xs">Belum ada gambar</span></div>}
// // // // // // // // //                                 {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
// // // // // // // // //                             </div>
// // // // // // // // //                             <div className="flex-1">
// // // // // // // // //                                 <p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p>
// // // // // // // // //                                 <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" title="Input Gambar" aria-label="Input Gambar"/>
// // // // // // // // //                                 <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2" title="Upload Gambar"><Upload size={16}/> Upload Gambar</button>
// // // // // // // // //                             </div>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label>
// // // // // // // // //                         <div className="flex gap-2"><div className="p-3 bg-gray-100 rounded-l-lg border border-r-0 text-gray-500"><Video size={18}/></div><input type="text" className="flex-1 p-2.5 border rounded-r-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} aria-label="URL Video Youtube" /></div>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
// // // // // // // // //             )}

// // // // // // // // //             {/* TAB 3: JADWAL & PELAKSANA */}
// // // // // // // // //             {activeTab === 'registration' && (
// // // // // // // // //                 <div className="max-w-4xl mx-auto space-y-6">
// // // // // // // // //                     <div className="grid grid-cols-2 gap-6">
// // // // // // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // //                             <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
// // // // // // // // //                             <div className="flex items-center gap-2 mb-2">
// // // // // // // // //                                 <div onClick={() => handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // // // // // //                                     <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // // // // // //                                     <span className="text-sm text-gray-600">Buka Selamanya</span>
// // // // // // // // //                                 </div>
// // // // // // // // //                             </div>
// // // // // // // // //                             {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} title="Mulai Pendaftaran" aria-label="Mulai Pendaftaran"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} title="Selesai Pendaftaran" aria-label="Selesai Pendaftaran"/></div></div>)}
// // // // // // // // //                         </div>
// // // // // // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // //                             <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
// // // // // // // // //                             <div className="flex items-center gap-2 mb-2">
// // // // // // // // //                                 <div onClick={() => handleChange('execIsForever', !formData.execIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // // // // // //                                     <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.execIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // // // // // //                                     <span className="text-sm text-gray-600">Fleksibel</span>
// // // // // // // // //                                 </div>
// // // // // // // // //                             </div>
// // // // // // // // //                             {!formData.execIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} aria-label="Pelaksanaan Mulai"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} aria-label="Pelaksanaan Selesai"/></div></div>)}
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>

// // // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // // //                         <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan <span className="text-red-500">*</span></label>
// // // // // // // // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // // // //                             <select className="w-full p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500" value={organizerType} onChange={(e) => { setOrganizerType(e.target.value); setSelectedProvId(''); setSelectedCityId(''); }} title="Tipe Pelaksana" aria-label="Tipe Pelaksana">
// // // // // // // // //                                 {allOrgTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
// // // // // // // // //                             </select>
// // // // // // // // //                             {organizerType === 'PMI Provinsi' && (
// // // // // // // // //                                 <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi">
// // // // // // // // //                                     <option value="">-- Pilih Provinsi --</option>
// // // // // // // // //                                     {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// // // // // // // // //                                 </select>
// // // // // // // // //                             )}
// // // // // // // // //                             {organizerType === 'PMI Kabupaten/Kota' && (
// // // // // // // // //                                 <>
// // // // // // // // //                                     <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi">
// // // // // // // // //                                         <option value="">-- Pilih Provinsi --</option>
// // // // // // // // //                                         {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// // // // // // // // //                                     </select>
// // // // // // // // //                                     <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedCityId} onChange={e => setSelectedCityId(e.target.value)} disabled={!selectedProvId} aria-label="Pilih Kota">
// // // // // // // // //                                         <option value="">-- Pilih Kab/Kota --</option>
// // // // // // // // //                                         {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
// // // // // // // // //                                     </select>
// // // // // // // // //                                 </>
// // // // // // // // //                             )}
// // // // // // // // //                             {!['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota'].includes(organizerType) && (
// // // // // // // // //                                 <input type="text" className="w-full p-2.5 border rounded-lg" placeholder="Nama Unit / Organisasi..." value={organizerName} onChange={e => setOrganizerName(e.target.value)} aria-label="Nama Organisasi"/>
// // // // // // // // //                             )}
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
                    
// // // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // //                         <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan Peserta</h3>
// // // // // // // // //                         <div className="space-y-4">
// // // // // // // // //                                 <div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'auto' ? 'bg-green-50 border-green-200 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'auto' ? 'border-green-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'auto' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Otomatis (Langsung Aktif)</span><span className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</span></div></div>
// // // // // // // // //                                 <div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'manual' ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'manual' ? 'border-yellow-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'manual' && <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Manual (Verifikasi Admin)</span><span className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</span></div></div>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>

// // // // // // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // //                         <div className="flex justify-between items-start mb-4">
// // // // // // // // //                             <div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div>
// // // // // // // // //                             <div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer">
// // // // // // // // //                                 <div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // // // // // //                                 <span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span>
// // // // // // // // //                             </div>
// // // // // // // // //                         </div>
// // // // // // // // //                         {formData.requireDocs && (
// // // // // // // // //                             <div className="space-y-3">
// // // // // // // // //                                 <div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} title="Input Template" aria-label="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50" aria-label="Upload Template"><Upload size={14}/> Upload Template Baru</button></div>
// // // // // // // // //                                 {formData.registrationTemplates.map((item: any, idx: number) => (
// // // // // // // // //                                     <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
// // // // // // // // //                                         <div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div>
// // // // // // // // //                                         <div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} aria-label="Nama Dokumen"/><a href={getLocalDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()} aria-label="Download File"><Download size={10} /> Lihat File Uploaded</a></div>
// // // // // // // // //                                         <button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" aria-label="Hapus Dokumen"><Trash2 size={16} /></button>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 ))}
// // // // // // // // //                             </div>
// // // // // // // // //                         )}
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
// // // // // // // // //             )}

// // // // // // // // //             {/* TAB 4: FASILITAS */}
// // // // // // // // //             {activeTab === 'facilities' && (
// // // // // // // // //                 <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
// // // // // // // // //                     <div className="space-y-6">
// // // // // // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" aria-label="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div>
// // // // // // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.estimatedDuration} disabled aria-label="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.totalJp} disabled aria-label="Total JP"/></div></div></div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas <span className="text-red-500">*</span></label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} aria-label="Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" aria-label="Tambah Fasilitas"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" aria-label="Hapus Fasilitas"><X size={14}/></button></div>))}</div></div>
// // // // // // // // //                 </div>
// // // // // // // // //             )}

// // // // // // // // //             {/* TAB 5: TIM & PIC */}
// // // // // // // // //             {activeTab === 'team' && (
// // // // // // // // //                 <div className="max-w-4xl mx-auto space-y-8">
// // // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // //                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
// // // // // // // // //                         <p className="text-xs text-gray-500 mb-4">*Mencakup Admin, Superadmin, dan Fasilitator.</p>
                        
// // // // // // // // //                         <div className="mb-4 space-y-2">
// // // // // // // // //                             {selectedFacilitators.map(fac => (
// // // // // // // // //                                 <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100 animate-in slide-in-from-top-1">
// // // // // // // // //                                     <div className="flex items-center gap-3">
// // // // // // // // //                                         <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-xs border border-red-200">{fac.name?.charAt(0)}</div>
// // // // // // // // //                                         <div><span className="text-sm font-bold text-red-900 block">{fac.name}</span><span className="text-[10px] text-red-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full w-fit border border-red-100"><Clock size={10}/> Menunggu Persetujuan</span></div>
// // // // // // // // //                                     </div>
// // // // // // // // //                                     <button type="button" onClick={() => toggleFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus" aria-label="Hapus"><X size={14}/></button>
// // // // // // // // //                                 </div>
// // // // // // // // //                             ))}
// // // // // // // // //                         </div>

// // // // // // // // //                         <div className="relative">
// // // // // // // // //                             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // // // // // // //                             <input type="text" placeholder="Cari nama atau email..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchFacilitator} onChange={(e) => setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator"/>
// // // // // // // // //                             {searchFacilitator && (
// // // // // // // // //                                 <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// // // // // // // // //                                     {availableFacilitators.length > 0 ? availableFacilitators.map(fac => (
// // // // // // // // //                                         <button key={fac._id || fac.id} type="button" onClick={() => { toggleFacilitator(fac._id || fac.id); setSearchFacilitator(''); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// // // // // // // // //                                             <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{fac.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{fac.name}</p><p className="text-[10px] text-gray-400">{fac.email} • {fac.role}</p></div></div><Plus size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // // // // // // // //                                         </button>
// // // // // // // // //                                     )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // // // // // // // //                                 </div>
// // // // // // // // //                             )}
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
                    
// // // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // //                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
                        
// // // // // // // // //                         <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
// // // // // // // // //                             <div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div>
// // // // // // // // //                             <div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div>
// // // // // // // // //                         </div>

// // // // // // // // //                         <div className="space-y-2 mb-4">
// // // // // // // // //                             <label className="text-sm font-bold text-gray-700 block">Daftar PIC Tambahan (Maks 3)</label>
// // // // // // // // //                             {formData.pics.map((pic: any, idx: number) => (
// // // // // // // // //                                 <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in slide-in-from-top-1">
// // // // // // // // //                                     <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">{pic.name?.charAt(0)}</div><div><span className="text-sm font-bold text-blue-900 block">{pic.name}</span><div className="flex gap-2"><span className="text-[10px] text-blue-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full border border-blue-100"><Clock size={10}/> Menunggu Persetujuan</span><span className="text-[10px] text-gray-500">{pic.email}</span></div></div></div><button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
// // // // // // // // //                                 </div>
// // // // // // // // //                             ))}
// // // // // // // // //                         </div>

// // // // // // // // //                         {formData.pics.length < 3 ? (
// // // // // // // // //                             <div className="relative">
// // // // // // // // //                                 <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // // // // // // //                                 <input type="text" placeholder="Cari user untuk dijadikan PIC..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchPic} onChange={(e) => setSearchPic(e.target.value)} aria-label="Cari PIC"/>
// // // // // // // // //                                 {searchPic && (
// // // // // // // // //                                     <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// // // // // // // // //                                         {filteredPicCandidates.length > 0 ? filteredPicCandidates.map(user => (
// // // // // // // // //                                             <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// // // // // // // // //                                                 <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div></div><UserPlus size={16} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // // // // // // // //                                             </button>
// // // // // // // // //                                         )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // // // // // // // //                                     </div>
// // // // // // // // //                                 )}
// // // // // // // // //                             </div>
// // // // // // // // //                         ) : <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 rounded-lg border border-gray-200">Kuota PIC penuh (Maksimal 3).</div>}
// // // // // // // // //                     </div>

// // // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // // //                         <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckSquare size={18}/> Kontak Utama (Landing Page)</h3></div>
// // // // // // // // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // // // //                             <div><label className="text-xs font-bold text-gray-500">Nama Kontak <span className="text-red-500">*</span></label><input name="contactName" value={formData.contactName} onChange={(e) => handleChange('contactName', e.target.value)} className="w-full p-2 border rounded" aria-label="Nama Kontak" /></div>
// // // // // // // // //                             <div><label className="text-xs font-bold text-gray-500">Email Kontak <span className="text-red-500">*</span></label><input name="contactEmail" value={formData.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} className="w-full p-2 border rounded" aria-label="Email Kontak" /></div>
// // // // // // // // //                             <div className="md:col-span-2"><label className="text-xs font-bold text-gray-500">Nomor Telepon/WA <span className="text-red-500">*</span></label><input name="contactPhone" value={formData.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} className="w-full p-2 border rounded" placeholder="628..." aria-label="Telepon Kontak" /></div>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
// // // // // // // // //             )}

// // // // // // // // //             {/* DISCLAIMER POPUP */}
// // // // // // // // //             {showDisclaimer && (
// // // // // // // // //                 <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in">
// // // // // // // // //                     <div className="absolute inset-0 bg-black/80"></div>
// // // // // // // // //                     <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 text-center space-y-4">
// // // // // // // // //                         <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2"><ShieldCheck size={32} className="text-orange-600"/></div>
// // // // // // // // //                         <h3 className="text-xl font-bold text-gray-900">Pernyataan Disclaimer</h3>
// // // // // // // // //                         <p className="text-sm text-gray-500 leading-relaxed">Saya menyatakan bahwa data pelatihan ini benar dan bertanggung jawab atas konten yang disajikan.</p>
                        
// // // // // // // // //                         <label className="flex items-center justify-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors">
// // // // // // // // //                             <input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} className="w-5 h-5 accent-orange-600" aria-label="Setuju"/>
// // // // // // // // //                             <span className="font-bold text-sm text-orange-800">Saya Setuju & Lanjutkan</span>
// // // // // // // // //                         </label>

// // // // // // // // //                         <div className="flex gap-3 pt-2">
// // // // // // // // //                             <button onClick={() => setShowDisclaimer(false)} className="flex-1 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50">Kembali</button>
// // // // // // // // //                             <button onClick={handleFinalSubmit} disabled={!isAgreed || loading} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
// // // // // // // // //                                 {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Proses Simpan
// // // // // // // // //                             </button>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
// // // // // // // // //             )}
// // // // // // // // //         </BaseModal>
// // // // // // // // //     );
// // // // // // // // // }


// // // // // // // // 'use client';

// // // // // // // // import { useState, useRef, useEffect } from 'react';
// // // // // // // // import { 
// // // // // // // //     X, Upload, Plus, Trash2, Save, Calendar, 
// // // // // // // //     Video, Image as ImageIcon, Users, FileText, 
// // // // // // // //     CheckCircle, AlertCircle, Award, Clock, Search, 
// // // // // // // //     Download, File, Loader2, UserPlus, 
// // // // // // // //     ShieldCheck, CheckSquare, Building
// // // // // // // // } from 'lucide-react';
// // // // // // // // import { api, apiUpload } from '@/lib/api'; 
// // // // // // // // import { getProvinces, getRegencies } from '@/lib/indonesia';
// // // // // // // // import dynamic from 'next/dynamic';
// // // // // // // // import 'react-quill/dist/quill.snow.css';
// // // // // // // // import axios from 'axios'; 
// // // // // // // // import BaseModal from '@/components/ui/BaseModal'; 

// // // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // // //     ssr: false,
// // // // // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // // // // });

// // // // // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // // // // interface CourseFormModalProps {
// // // // // // // //     course?: any; 
// // // // // // // //     onClose: () => void;
// // // // // // // //     onSuccess: () => void;
// // // // // // // //     facilitators: any[]; 
// // // // // // // //     currentUser: any; 
// // // // // // // // }

// // // // // // // // export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
// // // // // // // //     const [activeTab, setActiveTab] = useState('info');
// // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // //     const [fetchingDetail, setFetchingDetail] = useState(false);
// // // // // // // //     
// // // // // // // //     // Refs
// // // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null); 
// // // // // // // //     const templateInputRef = useRef<HTMLInputElement>(null); 
// // // // // // // //     
// // // // // // // //     // State Search & Users
// // // // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
// // // // // // // //     const [searchPic, setSearchPic] = useState('');
// // // // // // // //     const [allUsers, setAllUsers] = useState<any[]>([]);
// // // // // // // //     
// // // // // // // //     // State Disclaimer Popup
// // // // // // // //     const [showDisclaimer, setShowDisclaimer] = useState(false);
// // // // // // // //     const [isAgreed, setIsAgreed] = useState(false);

// // // // // // // //     // State Pelaksana & Wilayah
// // // // // // // //     const [organizerType, setOrganizerType] = useState('PMI Pusat');
// // // // // // // //     const [organizerName, setOrganizerName] = useState(''); 
// // // // // // // //     const [provinces, setProvinces] = useState<any[]>([]);
// // // // // // // //     const [regencies, setRegencies] = useState<any[]>([]);
// // // // // // // //     const [selectedProvId, setSelectedProvId] = useState('');
// // // // // // // //     const [selectedCityId, setSelectedCityId] = useState('');
// // // // // // // //     const [cmsCategories, setCmsCategories] = useState<string[]>([]);

// // // // // // // //     // State UI Tambahan
// // // // // // // //     const [newFacility, setNewFacility] = useState('');
// // // // // // // //     const [uploadingCover, setUploadingCover] = useState(false);
// // // // // // // //     const [uploadingTemplate, setUploadingTemplate] = useState(false);

// // // // // // // //     // --- INITIAL STATE ---
// // // // // // // //     const defaultState = {
// // // // // // // //         title: '', description: '', 
// // // // // // // //         programType: 'training', 
// // // // // // // //         hasCertificate: true,
// // // // // // // //         
// // // // // // // //         regIsForever: false, regStartDate: '', regEndDate: '',
// // // // // // // //         execIsForever: false, execStartDate: '', execEndDate: '',
// // // // // // // //         
// // // // // // // //         thumbnailUrl: '', promoVideoUrl: '',
// // // // // // // //         
// // // // // // // //         registrationMethod: 'auto', 
// // // // // // // //         requireDocs: true, 
// // // // // // // //         registrationTemplates: [] as any[], 
// // // // // // // //         
// // // // // // // //         price: 0, estimatedDuration: 0, totalJp: 0, 
// // // // // // // //         facilities: [] as string[], 
// // // // // // // //         facilitatorIds: [] as string[],
// // // // // // // //         pics: [] as any[], 
// // // // // // // //         
// // // // // // // //         creatorInfo: null as any,
// // // // // // // //         contactName: '', contactPhone: '', contactEmail: ''
// // // // // // // //     };

// // // // // // // //     const [formData, setFormData] = useState(defaultState);

// // // // // // // //     const getLocalDisplayUrl = (url: string) => {
// // // // // // // //         if (!url) return '';
// // // // // // // //         if (url.startsWith('http')) return url;
// // // // // // // //         const cleanPath = url.startsWith('/') ? url : `/${url}`;
// // // // // // // //         return `${API_BASE_URL}${cleanPath}`;
// // // // // // // //     };

// // // // // // // //     // --- LOAD DATA AWAL ---
// // // // // // // //     useEffect(() => {
// // // // // // // //         const provs = getProvinces();
// // // // // // // //         setProvinces(provs);
// // // // // // // //         
// // // // // // // //         api('/api/content').then(res => {
// // // // // // // //             if (res && res.organizerCategories) setCmsCategories(res.organizerCategories);
// // // // // // // //         }).catch(() => {});
// // // // // // // //         
// // // // // // // //         api('/api/users').then(res => setAllUsers(res.users || [])).catch(() => setAllUsers(facilitators));
// // // // // // // //     }, []);

// // // // // // // //     useEffect(() => {
// // // // // // // //         if (selectedProvId) {
// // // // // // // //             const regs = getRegencies(selectedProvId);
// // // // // // // //             setRegencies(regs);
// // // // // // // //         } else {
// // // // // // // //             setRegencies([]);
// // // // // // // //         }
// // // // // // // //     }, [selectedProvId]);

// // // // // // // //     useEffect(() => {
// // // // // // // //         const initData = async () => {
// // // // // // // //             if (course && course._id) {
// // // // // // // //                 setFetchingDetail(true);
// // // // // // // //                 try {
// // // // // // // //                     const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
// // // // // // // //                     const fullData = res.course || res.data || res;
// // // // // // // //                     populateForm(fullData);
// // // // // // // //                 } catch (e) {
// // // // // // // //                     populateForm(course);
// // // // // // // //                 } finally {
// // // // // // // //                     setFetchingDetail(false);
// // // // // // // //                 }
// // // // // // // //             } else {
// // // // // // // //                 if (currentUser) {
// // // // // // // //                      setFormData(prev => ({
// // // // // // // //                         ...prev,
// // // // // // // //                         contactName: currentUser.name,
// // // // // // // //                         contactEmail: currentUser.email,
// // // // // // // //                         contactPhone: currentUser.phoneNumber || ''
// // // // // // // //                       }));
// // // // // // // //                 }
// // // // // // // //             }
// // // // // // // //         };
// // // // // // // //         initData();
// // // // // // // //     }, [course]);

// // // // // // // //     const populateForm = (data: any) => {
// // // // // // // //         const formatDate = (d: string) => {
// // // // // // // //             if (!d) return '';
// // // // // // // //             try { return new Date(d).toISOString().split('T')[0]; } catch (e) { return ''; }
// // // // // // // //         };

// // // // // // // //         let initialPics = Array.isArray(data.pics) ? data.pics : [];
// // // // // // // //         if (Array.isArray(data.picIds) && data.picIds.length > 0) {
// // // // // // // //             initialPics = data.picIds.map((p: any) => ({
// // // // // // // //                 id: p._id || p.id,
// // // // // // // //                 name: p.name,
// // // // // // // //                 email: p.email,
// // // // // // // //                 role: p.role,
// // // // // // // //                 avatarUrl: p.avatarUrl
// // // // // // // //             }));
// // // // // // // //         }

// // // // // // // //         setFormData({
// // // // // // // //             title: data.title || '', description: data.description || '', 
// // // // // // // //             programType: data.programType || 'training', 
// // // // // // // //             hasCertificate: data.hasCertificate ?? true,
// // // // // // // //             
// // // // // // // //             regIsForever: data.registrationPeriod?.isForever ?? false,
// // // // // // // //             regStartDate: formatDate(data.registrationPeriod?.startDate),
// // // // // // // //             regEndDate: formatDate(data.registrationPeriod?.endDate),

// // // // // // // //             execIsForever: data.executionPeriod?.isForever ?? false,
// // // // // // // //             execStartDate: formatDate(data.executionPeriod?.startDate),
// // // // // // // //             execEndDate: formatDate(data.executionPeriod?.endDate),

// // // // // // // //             thumbnailUrl: data.thumbnailUrl || '', promoVideoUrl: data.promoVideoUrl || '',

// // // // // // // //             registrationMethod: data.registrationMethod || 'auto',
// // // // // // // //             requireDocs: data.registrationConfig?.requireDocs !== false,
// // // // // // // //             registrationTemplates: Array.isArray(data.registrationConfig?.templates) ? data.registrationConfig.templates : [],

// // // // // // // //             price: Number(data.price) || 0, 
// // // // // // // //             estimatedDuration: Number(data.estimatedDuration) || 0, 
// // // // // // // //             totalJp: Number(data.totalJp) || 0,
// // // // // // // //             
// // // // // // // //             facilities: Array.isArray(data.facilities) ? data.facilities : [],
// // // // // // // //             facilitatorIds: Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [],
// // // // // // // //             pics: initialPics, 
// // // // // // // //             
// // // // // // // //             creatorInfo: data.creatorInfo || null,
// // // // // // // //             contactName: data.contact?.name || data.creatorInfo?.name || '',
// // // // // // // //             contactEmail: data.contact?.email || data.creatorInfo?.email || '',
// // // // // // // //             contactPhone: data.contact?.phone || data.creatorInfo?.contact || ''
// // // // // // // //         });

// // // // // // // //         if (data.organizer) {
// // // // // // // //             const org = data.organizer;
// // // // // // // //             if (org === 'PMI Pusat') {
// // // // // // // //                 setOrganizerType('PMI Pusat');
// // // // // // // //             } else if (org.startsWith('PMI Provinsi')) {
// // // // // // // //                 setOrganizerType('PMI Provinsi');
// // // // // // // //                 const pName = org.split(': ')[1]?.trim();
// // // // // // // //                 const foundProv = getProvinces().find((p: any) => p.name === pName);
// // // // // // // //                 if (foundProv) setSelectedProvId(foundProv.code);
// // // // // // // //             } else if (org.startsWith('PMI Kab/Kota')) {
// // // // // // // //                 setOrganizerType('PMI Kabupaten/Kota');
// // // // // // // //                 const locParts = org.split(': ')[1]?.split(',');
// // // // // // // //                 if (locParts && locParts.length > 1) {
// // // // // // // //                      const cityName = locParts[0]?.trim();
// // // // // // // //                      const provName = locParts[1]?.trim();
// // // // // // // //                      const foundProv = getProvinces().find((p: any) => p.name === provName);
// // // // // // // //                      if (foundProv) {
// // // // // // // //                          setSelectedProvId(foundProv.code);
// // // // // // // //                          const regs = getRegencies(foundProv.code);
// // // // // // // //                          setRegencies(regs);
// // // // // // // //                          const foundCity = regs.find((r: any) => r.name === cityName);
// // // // // // // //                          if (foundCity) setSelectedCityId(foundCity.code);
// // // // // // // //                      }
// // // // // // // //                 }
// // // // // // // //             } else {
// // // // // // // //                 const parts = org.split(': ');
// // // // // // // //                 setOrganizerType(parts[0]);
// // // // // // // //                 setOrganizerName(parts[1] || '');
// // // // // // // //             }
// // // // // // // //         }
// // // // // // // //     }

// // // // // // // //     // --- HANDLERS ---
// // // // // // // //     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
// // // // // // // //     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
// // // // // // // //     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };
// // // // // // // //     const toggleFacilitator = (id: string) => {
// // // // // // // //         const current = formData.facilitatorIds;
// // // // // // // //         setFormData(prev => ({ ...prev, facilitatorIds: current.includes(id) ? current.filter(fid => fid !== id) : [...current, id] }));
// // // // // // // //     };

// // // // // // // //     const handleAddPicFromSearch = (user: any) => {
// // // // // // // //         if (formData.pics.length >= 3) return alert("Maksimal 3 PIC Tambahan");
// // // // // // // //         if (formData.pics.some((p: any) => p.email === user.email)) return alert("User ini sudah ditambahkan.");

// // // // // // // //         const newPic = {
// // // // // // // //             id: user._id || user.id,
// // // // // // // //             name: user.name,
// // // // // // // //             pmiStatus: user.role, 
// // // // // // // //             email: user.email,
// // // // // // // //             avatarUrl: user.avatarUrl
// // // // // // // //         };
// // // // // // // //         setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
// // // // // // // //         setSearchPic('');
// // // // // // // //     };

// // // // // // // //     const removePic = (idx: number) => { setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); };
// // // // // // // //     
// // // // // // // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // // // // //         try {
// // // // // // // //             setUploadingCover(true); const fd = new FormData(); fd.append('file', file);
// // // // // // // //             const res = await apiUpload('/api/upload', fd); 
// // // // // // // //             const url = res.url || res.file?.url || res.data?.url;
// // // // // // // //             if (url) handleChange('thumbnailUrl', url);
// // // // // // // //         } catch (err: any) { alert('Gagal: ' + err.message); } finally { setUploadingCover(false); }
// // // // // // // //     };

// // // // // // // //     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // // // // //         setUploadingTemplate(true);
// // // // // // // //         try {
// // // // // // // //             const fd = new FormData(); fd.append('file', file);
// // // // // // // //             const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
// // // // // // // //             const token = userStr ? JSON.parse(userStr).token : '';

// // // // // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { 
// // // // // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
// // // // // // // //                 withCredentials: true 
// // // // // // // //             });
// // // // // // // //             
// // // // // // // //             const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url;
// // // // // // // //             if (!rawUrl) throw new Error("Gagal dapat URL.");

// // // // // // // //             setFormData(prev => ({
// // // // // // // //                 ...prev,
// // // // // // // //                 registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }]
// // // // // // // //             }));
// // // // // // // //         } catch (err: any) {
// // // // // // // //             console.error(err);
// // // // // // // //             alert('Upload Gagal: ' + (err.response?.data?.message || err.message));
// // // // // // // //         } finally {
// // // // // // // //             setUploadingTemplate(false);
// // // // // // // //             if (templateInputRef.current) templateInputRef.current.value = '';
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const removeTemplate = (idx: number) => {
// // // // // // // //         if(!confirm("Hapus dokumen ini?")) return;
// // // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) }));
// // // // // // // //     };

// // // // // // // //     const updateTemplateTitle = (idx: number, v: string) => {
// // // // // // // //         const t = [...formData.registrationTemplates]; t[idx].title = v;
// // // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: t }));
// // // // // // // //     };

// // // // // // // //     const handlePreSubmit = () => {
// // // // // // // //         if (!formData.title) return alert("Judul wajib diisi!");
// // // // // // // //         setShowDisclaimer(true);
// // // // // // // //     };

// // // // // // // //     const handleFinalSubmit = async () => {
// // // // // // // //         if (!isAgreed) return alert("Mohon setujui pernyataan disclaimer.");
// // // // // // // //         
// // // // // // // //         setLoading(true);
// // // // // // // //         try {
// // // // // // // //             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
// // // // // // // //             const picIds = validPics.map((p: any) => p.id || p._id).filter((id: any) => id);

// // // // // // // //             const parseDate = (d: string) => d ? new Date(d) : null;

// // // // // // // //             let finalOrganizer = organizerType;
// // // // // // // //             if (organizerType === 'PMI Provinsi') {
// // // // // // // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
// // // // // // // //                 finalOrganizer = `PMI Provinsi: ${provName}`;
// // // // // // // //             } else if (organizerType === 'PMI Kabupaten/Kota') {
// // // // // // // //                 const cityName = regencies.find(r => r.code === selectedCityId)?.name || '';
// // // // // // // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
// // // // // // // //                 finalOrganizer = `PMI Kabupaten/Kota: ${cityName}, ${provName}`;
// // // // // // // //             } else if (organizerType !== 'PMI Pusat') {
// // // // // // // //                 finalOrganizer = `${organizerType}: ${organizerName}`;
// // // // // // // //             }

// // // // // // // //             const payload = {
// // // // // // // //                 title: formData.title,
// // // // // // // //                 description: formData.description,
// // // // // // // //                 programType: formData.programType,
// // // // // // // //                 hasCertificate: formData.hasCertificate,
// // // // // // // //                 price: Number(formData.price),
// // // // // // // //                 estimatedDuration: Number(formData.estimatedDuration),
// // // // // // // //                 totalJp: Number(formData.totalJp),
// // // // // // // //                 thumbnailUrl: formData.thumbnailUrl,
// // // // // // // //                 promoVideoUrl: formData.promoVideoUrl,
// // // // // // // //                 
// // // // // // // //                 organizer: finalOrganizer,

// // // // // // // //                 registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
// // // // // // // //                 executionPeriod: { isForever: formData.execIsForever, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
// // // // // // // //                 registrationMethod: formData.registrationMethod,
// // // // // // // //                 
// // // // // // // //                 registrationConfig: { 
// // // // // // // //                     requireDocs: formData.requireDocs, 
// // // // // // // //                     templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) 
// // // // // // // //                 },
// // // // // // // //                 
// // // // // // // //                 facilities: formData.facilities,
// // // // // // // //                 facilitatorIds: formData.facilitatorIds,
// // // // // // // //                 
// // // // // // // //                 pics: validPics,
// // // // // // // //                 picIds: picIds, 

// // // // // // // //                 creatorInfo: formData.creatorInfo,
// // // // // // // //                 contact: {
// // // // // // // //                     name: formData.contactName,
// // // // // // // //                     email: formData.contactEmail,
// // // // // // // //                     phone: formData.contactPhone
// // // // // // // //                 }
// // // // // // // //             };

// // // // // // // //             if (course?._id) await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
// // // // // // // //             else await api('/api/courses', { method: 'POST', body: payload });

// // // // // // // //             alert("Berhasil disimpan!");
// // // // // // // //             onSuccess();
// // // // // // // //         } catch (err: any) {
// // // // // // // //             console.error(err);
// // // // // // // //             alert("Gagal: " + (err.response?.data?.message || err.message));
// // // // // // // //         } finally {
// // // // // // // //             setLoading(false);
// // // // // // // //             setShowDisclaimer(false);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const handleAdminApproveContent = async () => {
// // // // // // // //         if(!confirm("Apakah Anda yakin konten pelatihan ini sudah lengkap dan SIAP UNTUK DIPUBLISH oleh Pengaju?")) return;
// // // // // // // //         
// // // // // // // //         setLoading(true);
// // // // // // // //         try {
// // // // // // // //             await api(`/api/courses/${course._id}`, { 
// // // // // // // //                 method: 'PATCH', 
// // // // // // // //                 body: { status: 'ready' } 
// // // // // // // //             });
// // // // // // // //             
// // // // // // // //             alert("✅ Konten disetujui! Status pelatihan sekarang: SIAP PUBLISH.\nPengaju sekarang bisa melihat tombol Publish di dashboard mereka.");
// // // // // // // //             onSuccess();
// // // // // // // //             onClose();
// // // // // // // //         } catch (err: any) {
// // // // // // // //             console.error(err);
// // // // // // // //             alert("Gagal mengubah status: " + err.message);
// // // // // // // //         } finally {
// // // // // // // //             setLoading(false);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const selectedFacilitators = facilitators.filter(f => formData.facilitatorIds.includes(f.id || f._id));
// // // // // // // //     const availableFacilitators = facilitators.filter(f => !formData.facilitatorIds.includes(f.id || f._id) && (f.name?.toLowerCase().includes(searchFacilitator.toLowerCase()) || f.email?.toLowerCase().includes(searchFacilitator.toLowerCase())));
// // // // // // // //     const filteredPicCandidates = allUsers.filter(u => ((u.name || '').toLowerCase().includes(searchPic.toLowerCase()) || (u.email || '').toLowerCase().includes(searchPic.toLowerCase())) && !formData.pics.some((p: any) => p.email === u.email));
// // // // // // // //     const allOrgTypes = ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota', ...cmsCategories];

// // // // // // // //     const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN' || currentUser?.permissions?.includes('manage_courses');
// // // // // // // //     const isDraftStatus = course?.status === 'draft';

// // // // // // // //     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><Loader2 className="animate-spin text-white"/></div>;

// // // // // // // //     const footerButtons = (
// // // // // // // //         <>
// // // // // // // //             <div className="flex-1 text-xs text-gray-500 hidden md:block text-left">
// // // // // // // //                 Status saat ini: <span className="font-bold uppercase">{course?.status || 'Baru'}</span>
// // // // // // // //             </div>
// // // // // // // //             <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50">Batal</button>
// // // // // // // //             
// // // // // // // //             {isSuperAdmin && isDraftStatus && course?._id && (
// // // // // // // //                 <button 
// // // // // // // //                     onClick={handleAdminApproveContent} 
// // // // // // // //                     disabled={loading}
// // // // // // // //                     className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-md flex items-center gap-2"
// // // // // // // //                 >
// // // // // // // //                     {loading ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18}/>}
// // // // // // // //                     Setujui Konten
// // // // // // // //                 </button>
// // // // // // // //             )}

// // // // // // // //             <button onClick={handlePreSubmit} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] shadow-lg flex items-center gap-2 disabled:opacity-50">
// // // // // // // //                 {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} 
// // // // // // // //                 Simpan Perubahan
// // // // // // // //             </button>
// // // // // // // //         </>
// // // // // // // //     );

// // // // // // // //     return (
// // // // // // // //         <BaseModal
// // // // // // // //             isOpen={true}
// // // // // // // //             onClose={onClose}
// // // // // // // //             title={course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}
// // // // // // // //             subTitle={isDraftStatus && isSuperAdmin ? 'Review Kelengkapan Materi Pelatihan' : 'Lengkapi data pelatihan.'}
// // // // // // // //             size="full" // GUNAKAN FULL AGAR LEBAR
// // // // // // // //             footer={footerButtons}
// // // // // // // //         >
// // // // // // // //             {/* TABS MENU */}
// // // // // // // //             <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0 mb-6 -mx-6 px-6 pt-2">
// // // // // // // //                 {[{ id: 'info', label: '1. Informasi Dasar', icon: FileText }, { id: 'media', label: '2. Media & Visual', icon: ImageIcon }, { id: 'registration', label: '3. Jadwal & Pelaksana', icon: Calendar }, { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award }, { id: 'team', label: '5. Tim & PIC', icon: Users }].map((tab) => (
// // // // // // // //                     <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
// // // // // // // //                         <tab.icon size={16} /> {tab.label}
// // // // // // // //                     </button>
// // // // // // // //                 ))}
// // // // // // // //             </div>

// // // // // // // //             {/* TAB 1: INFO */}
// // // // // // // //             {activeTab === 'info' && (
// // // // // // // //                 <div className="space-y-6 max-w-4xl mx-auto">
// // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="inpTitle">Judul Pelatihan <span className="text-red-500">*</span></label><input id="inpTitle" required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: Orientasi Kepalangmerahan" value={formData.title} onChange={e => handleChange('title', e.target.value)} aria-label="Judul"/></div>
// // // // // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap <span className="text-red-500">*</span></label><div className="bg-white border rounded-lg overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" aria-label="Deskripsi" /></div></div>
// // // // // // // //                     </div>

// // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
// // // // // // // //                         <div>
// // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label>
// // // // // // // //                             <div className="flex gap-4">
// // // // // // // //                                 <div onClick={() => handleChange('programType', 'training')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'training' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// // // // // // // //                                     <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'training' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'training' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// // // // // // // //                                     <span className="text-sm text-gray-700 font-medium">Diklat Resmi</span>
// // // // // // // //                                 </div>
// // // // // // // //                                 <div onClick={() => handleChange('programType', 'course')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'course' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// // // // // // // //                                     <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'course' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'course' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// // // // // // // //                                     <span className="text-sm text-gray-700 font-medium">Kursus Mandiri</span>
// // // // // // // //                                 </div>
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                         <div className="w-px bg-gray-200"></div>
// // // // // // // //                         <div className="flex items-center gap-3">
// // // // // // // //                             <div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // // // // //                                 <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div>
// // // // // // // //                                 <span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span>
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             )}

// // // // // // // //             {/* TAB 2: MEDIA */}
// // // // // // // //             {activeTab === 'media' && (
// // // // // // // //                 <div className="max-w-3xl mx-auto space-y-6">
// // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) <span className="text-red-500">*</span></label>
// // // // // // // //                         <div className="flex gap-6 items-start">
// // // // // // // //                             <div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
// // // // // // // //                                 {formData.thumbnailUrl ? <img src={getLocalDisplayUrl(formData.thumbnailUrl)} alt="Preview Cover" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1" /><span className="text-xs">Belum ada gambar</span></div>}
// // // // // // // //                                 {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
// // // // // // // //                             </div>
// // // // // // // //                             <div className="flex-1">
// // // // // // // //                                 <p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p>
// // // // // // // //                                 <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" title="Input Gambar" aria-label="Input Gambar"/>
// // // // // // // //                                 <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2" title="Upload Gambar"><Upload size={16}/> Upload Gambar</button>
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label>
// // // // // // // //                         <div className="flex gap-2"><div className="p-3 bg-gray-100 rounded-l-lg border border-r-0 text-gray-500"><Video size={18}/></div><input type="text" className="flex-1 p-2.5 border rounded-r-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} aria-label="URL Video Youtube" /></div>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             )}

// // // // // // // //             {/* TAB 3: JADWAL & PELAKSANA */}
// // // // // // // //             {activeTab === 'registration' && (
// // // // // // // //                 <div className="max-w-4xl mx-auto space-y-6">
// // // // // // // //                     <div className="grid grid-cols-2 gap-6">
// // // // // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // //                             <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
// // // // // // // //                             <div className="flex items-center gap-2 mb-2">
// // // // // // // //                                 <div onClick={() => handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // // // // //                                     <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // // // // //                                     <span className="text-sm text-gray-600">Buka Selamanya</span>
// // // // // // // //                                 </div>
// // // // // // // //                             </div>
// // // // // // // //                             {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} title="Mulai Pendaftaran" aria-label="Mulai Pendaftaran"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} title="Selesai Pendaftaran" aria-label="Selesai Pendaftaran"/></div></div>)}
// // // // // // // //                         </div>
// // // // // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // //                             <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
// // // // // // // //                             <div className="flex items-center gap-2 mb-2">
// // // // // // // //                                 <div onClick={() => handleChange('execIsForever', !formData.execIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // // // // //                                     <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.execIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // // // // //                                     <span className="text-sm text-gray-600">Fleksibel</span>
// // // // // // // //                                 </div>
// // // // // // // //                             </div>
// // // // // // // //                             {!formData.execIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} aria-label="Pelaksanaan Mulai"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} aria-label="Pelaksanaan Selesai"/></div></div>)}
// // // // // // // //                         </div>
// // // // // // // //                     </div>

// // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // // //                         <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan <span className="text-red-500">*</span></label>
// // // // // // // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // // //                             <select className="w-full p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500" value={organizerType} onChange={(e) => { setOrganizerType(e.target.value); setSelectedProvId(''); setSelectedCityId(''); }} title="Tipe Pelaksana" aria-label="Tipe Pelaksana">
// // // // // // // //                                 {allOrgTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
// // // // // // // //                             </select>
// // // // // // // //                             {organizerType === 'PMI Provinsi' && (
// // // // // // // //                                 <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi">
// // // // // // // //                                     <option value="">-- Pilih Provinsi --</option>
// // // // // // // //                                     {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// // // // // // // //                                 </select>
// // // // // // // //                             )}
// // // // // // // //                             {organizerType === 'PMI Kabupaten/Kota' && (
// // // // // // // //                                 <>
// // // // // // // //                                     <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi">
// // // // // // // //                                         <option value="">-- Pilih Provinsi --</option>
// // // // // // // //                                         {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// // // // // // // //                                     </select>
// // // // // // // //                                     <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedCityId} onChange={e => setSelectedCityId(e.target.value)} disabled={!selectedProvId} aria-label="Pilih Kota">
// // // // // // // //                                         <option value="">-- Pilih Kab/Kota --</option>
// // // // // // // //                                         {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
// // // // // // // //                                     </select>
// // // // // // // //                                 </>
// // // // // // // //                             )}
// // // // // // // //                             {!['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota'].includes(organizerType) && (
// // // // // // // //                                 <input type="text" className="w-full p-2.5 border rounded-lg" placeholder="Nama Unit / Organisasi..." value={organizerName} onChange={e => setOrganizerName(e.target.value)} aria-label="Nama Organisasi"/>
// // // // // // // //                             )}
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                     
// // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // //                         <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan Peserta</h3>
// // // // // // // //                         <div className="space-y-4">
// // // // // // // //                                 <div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'auto' ? 'bg-green-50 border-green-200 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'auto' ? 'border-green-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'auto' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Otomatis (Langsung Aktif)</span><span className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</span></div></div>
// // // // // // // //                                 <div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'manual' ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'manual' ? 'border-yellow-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'manual' && <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Manual (Verifikasi Admin)</span><span className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</span></div></div>
// // // // // // // //                         </div>
// // // // // // // //                     </div>

// // // // // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // //                         <div className="flex justify-between items-start mb-4">
// // // // // // // //                             <div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div>
// // // // // // // //                             <div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer">
// // // // // // // //                                 <div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // // // // //                                 <span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span>
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                         {formData.requireDocs && (
// // // // // // // //                             <div className="space-y-3">
// // // // // // // //                                 <div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} title="Input Template" aria-label="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50" aria-label="Upload Template"><Upload size={14}/> Upload Template Baru</button></div>
// // // // // // // //                                 {formData.registrationTemplates.map((item: any, idx: number) => (
// // // // // // // //                                     <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
// // // // // // // //                                         <div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div>
// // // // // // // //                                         <div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} aria-label="Nama Dokumen"/><a href={getLocalDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()} aria-label="Download File"><Download size={10} /> Lihat File Uploaded</a></div>
// // // // // // // //                                         <button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" aria-label="Hapus Dokumen"><Trash2 size={16} /></button>
// // // // // // // //                                     </div>
// // // // // // // //                                 ))}
// // // // // // // //                             </div>
// // // // // // // //                         )}
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             )}

// // // // // // // //             {/* TAB 4: FASILITAS */}
// // // // // // // //             {activeTab === 'facilities' && (
// // // // // // // //                 <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
// // // // // // // //                     <div className="space-y-6">
// // // // // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" aria-label="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div>
// // // // // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.estimatedDuration} disabled aria-label="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.totalJp} disabled aria-label="Total JP"/></div></div></div>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas <span className="text-red-500">*</span></label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} aria-label="Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" aria-label="Tambah Fasilitas"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" aria-label="Hapus Fasilitas"><X size={14}/></button></div>))}</div></div>
// // // // // // // //                 </div>
// // // // // // // //             )}

// // // // // // // //             {/* TAB 5: TIM & PIC */}
// // // // // // // //             {activeTab === 'team' && (
// // // // // // // //                 <div className="max-w-4xl mx-auto space-y-8">
// // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // //                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
// // // // // // // //                         <p className="text-xs text-gray-500 mb-4">*Mencakup Admin, Superadmin, dan Fasilitator.</p>
// // // // // // // //                         
// // // // // // // //                         <div className="mb-4 space-y-2">
// // // // // // // //                             {selectedFacilitators.map(fac => (
// // // // // // // //                                 <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100 animate-in slide-in-from-top-1">
// // // // // // // //                                     <div className="flex items-center gap-3">
// // // // // // // //                                         <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-xs border border-red-200">{fac.name?.charAt(0)}</div>
// // // // // // // //                                         <div><span className="text-sm font-bold text-red-900 block">{fac.name}</span><span className="text-[10px] text-red-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full w-fit border border-red-100"><Clock size={10}/> Menunggu Persetujuan</span></div>
// // // // // // // //                                     </div>
// // // // // // // //                                     <button type="button" onClick={() => toggleFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus" aria-label="Hapus"><X size={14}/></button>
// // // // // // // //                                 </div>
// // // // // // // //                             ))}
// // // // // // // //                         </div>

// // // // // // // //                         <div className="relative">
// // // // // // // //                             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // // // // // //                             <input type="text" placeholder="Cari nama atau email..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchFacilitator} onChange={(e) => setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator"/>
// // // // // // // //                             {searchFacilitator && (
// // // // // // // //                                 <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// // // // // // // //                                     {availableFacilitators.length > 0 ? availableFacilitators.map(fac => (
// // // // // // // //                                         <button key={fac._id || fac.id} type="button" onClick={() => { toggleFacilitator(fac._id || fac.id); setSearchFacilitator(''); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// // // // // // // //                                             <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{fac.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{fac.name}</p><p className="text-[10px] text-gray-400">{fac.email} • {fac.role}</p></div></div><Plus size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // // // // // // //                                         </button>
// // // // // // // //                                     )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // // // // // // //                                 </div>
// // // // // // // //                             )}
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                     
// // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // //                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
// // // // // // // //                         
// // // // // // // //                         <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
// // // // // // // //                             <div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div>
// // // // // // // //                             <div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div>
// // // // // // // //                         </div>

// // // // // // // //                         <div className="space-y-2 mb-4">
// // // // // // // //                             <label className="text-sm font-bold text-gray-700 block">Daftar PIC Tambahan (Maks 3)</label>
// // // // // // // //                             {formData.pics.map((pic: any, idx: number) => (
// // // // // // // //                                 <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in slide-in-from-top-1">
// // // // // // // //                                     <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">{pic.name?.charAt(0)}</div><div><span className="text-sm font-bold text-blue-900 block">{pic.name}</span><div className="flex gap-2"><span className="text-[10px] text-blue-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full border border-blue-100"><Clock size={10}/> Menunggu Persetujuan</span><span className="text-[10px] text-gray-500">{pic.email}</span></div></div></div><button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
// // // // // // // //                                 </div>
// // // // // // // //                             ))}
// // // // // // // //                         </div>

// // // // // // // //                         {formData.pics.length < 3 ? (
// // // // // // // //                             <div className="relative">
// // // // // // // //                                 <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // // // // // //                                 <input type="text" placeholder="Cari user untuk dijadikan PIC..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchPic} onChange={(e) => setSearchPic(e.target.value)} aria-label="Cari PIC"/>
// // // // // // // //                                 {searchPic && (
// // // // // // // //                                     <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// // // // // // // //                                         {filteredPicCandidates.length > 0 ? filteredPicCandidates.map(user => (
// // // // // // // //                                             <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// // // // // // // //                                                 <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div></div><UserPlus size={16} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // // // // // // //                                             </button>
// // // // // // // //                                         )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // // // // // // //                                     </div>
// // // // // // // //                                 )}
// // // // // // // //                             </div>
// // // // // // // //                         ) : <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 rounded-lg border border-gray-200">Kuota PIC penuh (Maksimal 3).</div>}
// // // // // // // //                     </div>

// // // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // //                         <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckSquare size={18}/> Kontak Utama (Landing Page)</h3></div>
// // // // // // // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // // //                             <div><label className="text-xs font-bold text-gray-500">Nama Kontak <span className="text-red-500">*</span></label><input name="contactName" value={formData.contactName} onChange={(e) => handleChange('contactName', e.target.value)} className="w-full p-2 border rounded" aria-label="Nama Kontak" /></div>
// // // // // // // //                             <div><label className="text-xs font-bold text-gray-500">Email Kontak <span className="text-red-500">*</span></label><input name="contactEmail" value={formData.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} className="w-full p-2 border rounded" aria-label="Email Kontak" /></div>
// // // // // // // //                             <div className="md:col-span-2"><label className="text-xs font-bold text-gray-500">Nomor Telepon/WA <span className="text-red-500">*</span></label><input name="contactPhone" value={formData.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} className="w-full p-2 border rounded" placeholder="628..." aria-label="Telepon Kontak" /></div>
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             )}

// // // // // // // //             {/* DISCLAIMER POPUP */}
// // // // // // // //             {showDisclaimer && (
// // // // // // // //                 <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in">
// // // // // // // //                     <div className="absolute inset-0 bg-black/80"></div>
// // // // // // // //                     <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 text-center space-y-4">
// // // // // // // //                         <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2"><ShieldCheck size={32} className="text-orange-600"/></div>
// // // // // // // //                         <h3 className="text-xl font-bold text-gray-900">Pernyataan Disclaimer</h3>
// // // // // // // //                         <p className="text-sm text-gray-500 leading-relaxed">Saya menyatakan bahwa data pelatihan ini benar dan bertanggung jawab atas konten yang disajikan.</p>
// // // // // // // //                         
// // // // // // // //                         <label className="flex items-center justify-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors">
// // // // // // // //                             <input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} className="w-5 h-5 accent-orange-600" aria-label="Setuju"/>
// // // // // // // //                             <span className="font-bold text-sm text-orange-800">Saya Setuju & Lanjutkan</span>
// // // // // // // //                         </label>

// // // // // // // //                         <div className="flex gap-3 pt-2">
// // // // // // // //                             <button onClick={() => setShowDisclaimer(false)} className="flex-1 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50">Kembali</button>
// // // // // // // //                             <button onClick={handleFinalSubmit} disabled={!isAgreed || loading} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
// // // // // // // //                                 {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Proses Simpan
// // // // // // // //                             </button>
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             )}
// // // // // // // //         </BaseModal>
// // // // // // // //     );
// // // // // // // // }


// // // // // // // 'use client';

// // // // // // // import { useState, useRef, useEffect } from 'react';
// // // // // // // import { 
// // // // // // //     X, Upload, Plus, Trash2, Save, Calendar, 
// // // // // // //     Video, Image as ImageIcon, Users, FileText, 
// // // // // // //     CheckCircle, AlertCircle, Award, Clock, Search, 
// // // // // // //     Download, File, Loader2, UserPlus, 
// // // // // // //     ShieldCheck, CheckSquare, Building
// // // // // // // } from 'lucide-react';
// // // // // // // import { api, apiUpload } from '@/lib/api'; 
// // // // // // // import { getProvinces, getRegencies } from '@/lib/indonesia';
// // // // // // // import dynamic from 'next/dynamic';
// // // // // // // import 'react-quill/dist/quill.snow.css';
// // // // // // // import axios from 'axios'; 
// // // // // // // import BaseModal from '@/components/ui/BaseModal'; 

// // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // // // // // //     ssr: false,
// // // // // // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // // // // // });

// // // // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // // // interface CourseFormModalProps {
// // // // // // //     course?: any; 
// // // // // // //     onClose: () => void;
// // // // // // //     onSuccess: () => void;
// // // // // // //     facilitators: any[]; 
// // // // // // //     currentUser: any; 
// // // // // // // }

// // // // // // // export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
// // // // // // //     const [activeTab, setActiveTab] = useState('info');
// // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // //     const [fetchingDetail, setFetchingDetail] = useState(false);
// // // // // // //     
// // // // // // //     // Refs
// // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null); 
// // // // // // //     const templateInputRef = useRef<HTMLInputElement>(null); 
// // // // // // //     
// // // // // // //     // State Search & Users
// // // // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
// // // // // // //     const [searchPic, setSearchPic] = useState('');
// // // // // // //     const [allUsers, setAllUsers] = useState<any[]>([]);
// // // // // // //     
// // // // // // //     // State Disclaimer Popup
// // // // // // //     const [showDisclaimer, setShowDisclaimer] = useState(false);
// // // // // // //     const [isAgreed, setIsAgreed] = useState(false);

// // // // // // //     // State Pelaksana & Wilayah
// // // // // // //     const [organizerType, setOrganizerType] = useState('PMI Pusat');
// // // // // // //     const [organizerName, setOrganizerName] = useState(''); 
// // // // // // //     const [provinces, setProvinces] = useState<any[]>([]);
// // // // // // //     const [regencies, setRegencies] = useState<any[]>([]);
// // // // // // //     const [selectedProvId, setSelectedProvId] = useState('');
// // // // // // //     const [selectedCityId, setSelectedCityId] = useState('');
// // // // // // //     const [cmsCategories, setCmsCategories] = useState<string[]>([]);

// // // // // // //     // State UI Tambahan
// // // // // // //     const [newFacility, setNewFacility] = useState('');
// // // // // // //     const [uploadingCover, setUploadingCover] = useState(false);
// // // // // // //     const [uploadingTemplate, setUploadingTemplate] = useState(false);

// // // // // // //     // --- INITIAL STATE ---
// // // // // // //     const defaultState = {
// // // // // // //         title: '', description: '', 
// // // // // // //         programType: 'training', 
// // // // // // //         hasCertificate: true,
// // // // // // //         
// // // // // // //         regIsForever: false, regStartDate: '', regEndDate: '',
// // // // // // //         execIsForever: false, execStartDate: '', execEndDate: '',
// // // // // // //         
// // // // // // //         thumbnailUrl: '', promoVideoUrl: '',
// // // // // // //         
// // // // // // //         registrationMethod: 'auto', 
// // // // // // //         requireDocs: true, 
// // // // // // //         registrationTemplates: [] as any[], 
// // // // // // //         
// // // // // // //         price: 0, estimatedDuration: 0, totalJp: 0, 
// // // // // // //         facilities: [] as string[], 
// // // // // // //         facilitatorIds: [] as string[],
// // // // // // //         pics: [] as any[], 
// // // // // // //         
// // // // // // //         creatorInfo: null as any,
// // // // // // //         contactName: '', contactPhone: '', contactEmail: ''
// // // // // // //     };

// // // // // // //     const [formData, setFormData] = useState(defaultState);

// // // // // // //     const getLocalDisplayUrl = (url: string) => {
// // // // // // //         if (!url) return '';
// // // // // // //         if (url.startsWith('http')) return url;
// // // // // // //         const cleanPath = url.startsWith('/') ? url : `/${url}`;
// // // // // // //         return `${API_BASE_URL}${cleanPath}`;
// // // // // // //     };

// // // // // // //     // --- LOAD DATA AWAL ---
// // // // // // //     useEffect(() => {
// // // // // // //         const provs = getProvinces();
// // // // // // //         setProvinces(provs);
// // // // // // //         
// // // // // // //         api('/api/content').then(res => {
// // // // // // //             if (res && res.organizerCategories) setCmsCategories(res.organizerCategories);
// // // // // // //         }).catch(() => {});
// // // // // // //         
// // // // // // //         api('/api/users').then(res => setAllUsers(res.users || [])).catch(() => setAllUsers(facilitators));
// // // // // // //     }, []);

// // // // // // //     useEffect(() => {
// // // // // // //         if (selectedProvId) {
// // // // // // //             const regs = getRegencies(selectedProvId);
// // // // // // //             setRegencies(regs);
// // // // // // //         } else {
// // // // // // //             setRegencies([]);
// // // // // // //         }
// // // // // // //     }, [selectedProvId]);

// // // // // // //     useEffect(() => {
// // // // // // //         const initData = async () => {
// // // // // // //             if (course && course._id) {
// // // // // // //                 setFetchingDetail(true);
// // // // // // //                 try {
// // // // // // //                     const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
// // // // // // //                     const fullData = res.course || res.data || res;
// // // // // // //                     populateForm(fullData);
// // // // // // //                 } catch (e) {
// // // // // // //                     populateForm(course);
// // // // // // //                 } finally {
// // // // // // //                     setFetchingDetail(false);
// // // // // // //                 }
// // // // // // //             } else {
// // // // // // //                 if (currentUser) {
// // // // // // //                      setFormData(prev => ({
// // // // // // //                         ...prev,
// // // // // // //                         contactName: currentUser.name,
// // // // // // //                         contactEmail: currentUser.email,
// // // // // // //                         contactPhone: currentUser.phoneNumber || ''
// // // // // // //                       }));
// // // // // // //                 }
// // // // // // //             }
// // // // // // //         };
// // // // // // //         initData();
// // // // // // //     }, [course]);

// // // // // // //     const populateForm = (data: any) => {
// // // // // // //         const formatDate = (d: string) => {
// // // // // // //             if (!d) return '';
// // // // // // //             try { return new Date(d).toISOString().split('T')[0]; } catch (e) { return ''; }
// // // // // // //         };

// // // // // // //         let initialPics = Array.isArray(data.pics) ? data.pics : [];
// // // // // // //         if (Array.isArray(data.picIds) && data.picIds.length > 0) {
// // // // // // //             initialPics = data.picIds.map((p: any) => ({
// // // // // // //                 id: p._id || p.id,
// // // // // // //                 name: p.name,
// // // // // // //                 email: p.email,
// // // // // // //                 role: p.role,
// // // // // // //                 avatarUrl: p.avatarUrl
// // // // // // //             }));
// // // // // // //         }

// // // // // // //         setFormData({
// // // // // // //             title: data.title || '', description: data.description || '', 
// // // // // // //             programType: data.programType || 'training', 
// // // // // // //             hasCertificate: data.hasCertificate ?? true,
// // // // // // //             
// // // // // // //             regIsForever: data.registrationPeriod?.isForever ?? false,
// // // // // // //             regStartDate: formatDate(data.registrationPeriod?.startDate),
// // // // // // //             regEndDate: formatDate(data.registrationPeriod?.endDate),

// // // // // // //             execIsForever: data.executionPeriod?.isForever ?? false,
// // // // // // //             execStartDate: formatDate(data.executionPeriod?.startDate),
// // // // // // //             execEndDate: formatDate(data.executionPeriod?.endDate),

// // // // // // //             thumbnailUrl: data.thumbnailUrl || '', promoVideoUrl: data.promoVideoUrl || '',

// // // // // // //             registrationMethod: data.registrationMethod || 'auto',
// // // // // // //             requireDocs: data.registrationConfig?.requireDocs !== false,
// // // // // // //             registrationTemplates: Array.isArray(data.registrationConfig?.templates) ? data.registrationConfig.templates : [],

// // // // // // //             price: Number(data.price) || 0, 
// // // // // // //             estimatedDuration: Number(data.estimatedDuration) || 0, 
// // // // // // //             totalJp: Number(data.totalJp) || 0,
// // // // // // //             
// // // // // // //             facilities: Array.isArray(data.facilities) ? data.facilities : [],
// // // // // // //             facilitatorIds: Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [],
// // // // // // //             pics: initialPics, 
// // // // // // //             
// // // // // // //             creatorInfo: data.creatorInfo || null,
// // // // // // //             contactName: data.contact?.name || data.creatorInfo?.name || '',
// // // // // // //             contactEmail: data.contact?.email || data.creatorInfo?.email || '',
// // // // // // //             contactPhone: data.contact?.phone || data.creatorInfo?.contact || ''
// // // // // // //         });

// // // // // // //         if (data.organizer) {
// // // // // // //             const org = data.organizer;
// // // // // // //             if (org === 'PMI Pusat') {
// // // // // // //                 setOrganizerType('PMI Pusat');
// // // // // // //             } else if (org.startsWith('PMI Provinsi')) {
// // // // // // //                 setOrganizerType('PMI Provinsi');
// // // // // // //                 const pName = org.split(': ')[1]?.trim();
// // // // // // //                 const foundProv = getProvinces().find((p: any) => p.name === pName);
// // // // // // //                 if (foundProv) setSelectedProvId(foundProv.code);
// // // // // // //             } else if (org.startsWith('PMI Kab/Kota')) {
// // // // // // //                 setOrganizerType('PMI Kabupaten/Kota');
// // // // // // //                 const locParts = org.split(': ')[1]?.split(',');
// // // // // // //                 if (locParts && locParts.length > 1) {
// // // // // // //                      const cityName = locParts[0]?.trim();
// // // // // // //                      const provName = locParts[1]?.trim();
// // // // // // //                      const foundProv = getProvinces().find((p: any) => p.name === provName);
// // // // // // //                      if (foundProv) {
// // // // // // //                          setSelectedProvId(foundProv.code);
// // // // // // //                          const regs = getRegencies(foundProv.code);
// // // // // // //                          setRegencies(regs);
// // // // // // //                          const foundCity = regs.find((r: any) => r.name === cityName);
// // // // // // //                          if (foundCity) setSelectedCityId(foundCity.code);
// // // // // // //                      }
// // // // // // //                 }
// // // // // // //             } else {
// // // // // // //                 const parts = org.split(': ');
// // // // // // //                 setOrganizerType(parts[0]);
// // // // // // //                 setOrganizerName(parts[1] || '');
// // // // // // //             }
// // // // // // //         }
// // // // // // //     }

// // // // // // //     // --- HANDLERS ---
// // // // // // //     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
// // // // // // //     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
// // // // // // //     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };
// // // // // // //     const toggleFacilitator = (id: string) => {
// // // // // // //         const current = formData.facilitatorIds;
// // // // // // //         setFormData(prev => ({ ...prev, facilitatorIds: current.includes(id) ? current.filter(fid => fid !== id) : [...current, id] }));
// // // // // // //     };

// // // // // // //     const handleAddPicFromSearch = (user: any) => {
// // // // // // //         if (formData.pics.length >= 3) return alert("Maksimal 3 PIC Tambahan");
// // // // // // //         if (formData.pics.some((p: any) => p.email === user.email)) return alert("User ini sudah ditambahkan.");

// // // // // // //         const newPic = {
// // // // // // //             id: user._id || user.id,
// // // // // // //             name: user.name,
// // // // // // //             pmiStatus: user.role, 
// // // // // // //             email: user.email,
// // // // // // //             avatarUrl: user.avatarUrl
// // // // // // //         };
// // // // // // //         setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
// // // // // // //         setSearchPic('');
// // // // // // //     };

// // // // // // //     const removePic = (idx: number) => { setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); };
// // // // // // //     
// // // // // // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // // // //         try {
// // // // // // //             setUploadingCover(true); const fd = new FormData(); fd.append('file', file);
// // // // // // //             const res = await apiUpload('/api/upload', fd); 
// // // // // // //             const url = res.url || res.file?.url || res.data?.url;
// // // // // // //             if (url) handleChange('thumbnailUrl', url);
// // // // // // //         } catch (err: any) { alert('Gagal: ' + err.message); } finally { setUploadingCover(false); }
// // // // // // //     };

// // // // // // //     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //         const file = e.target.files?.[0]; if (!file) return;
// // // // // // //         setUploadingTemplate(true);
// // // // // // //         try {
// // // // // // //             const fd = new FormData(); fd.append('file', file);
// // // // // // //             const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
// // // // // // //             const token = userStr ? JSON.parse(userStr).token : '';

// // // // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { 
// // // // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
// // // // // // //                 withCredentials: true 
// // // // // // //             });
// // // // // // //             
// // // // // // //             const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url;
// // // // // // //             if (!rawUrl) throw new Error("Gagal dapat URL.");

// // // // // // //             setFormData(prev => ({
// // // // // // //                 ...prev,
// // // // // // //                 registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }]
// // // // // // //             }));
// // // // // // //         } catch (err: any) {
// // // // // // //             console.error(err);
// // // // // // //             alert('Upload Gagal: ' + (err.response?.data?.message || err.message));
// // // // // // //         } finally {
// // // // // // //             setUploadingTemplate(false);
// // // // // // //             if (templateInputRef.current) templateInputRef.current.value = '';
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const removeTemplate = (idx: number) => {
// // // // // // //         if(!confirm("Hapus dokumen ini?")) return;
// // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) }));
// // // // // // //     };

// // // // // // //     const updateTemplateTitle = (idx: number, v: string) => {
// // // // // // //         const t = [...formData.registrationTemplates]; t[idx].title = v;
// // // // // // //         setFormData(prev => ({ ...prev, registrationTemplates: t }));
// // // // // // //     };

// // // // // // //     const handlePreSubmit = () => {
// // // // // // //         if (!formData.title) return alert("Judul wajib diisi!");
// // // // // // //         setShowDisclaimer(true);
// // // // // // //     };

// // // // // // //     const handleFinalSubmit = async () => {
// // // // // // //         if (!isAgreed) return alert("Mohon setujui pernyataan disclaimer.");
// // // // // // //         
// // // // // // //         setLoading(true);
// // // // // // //         try {
// // // // // // //             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
// // // // // // //             const picIds = validPics.map((p: any) => p.id || p._id).filter((id: any) => id);

// // // // // // //             const parseDate = (d: string) => d ? new Date(d) : null;

// // // // // // //             let finalOrganizer = organizerType;
// // // // // // //             if (organizerType === 'PMI Provinsi') {
// // // // // // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
// // // // // // //                 finalOrganizer = `PMI Provinsi: ${provName}`;
// // // // // // //             } else if (organizerType === 'PMI Kabupaten/Kota') {
// // // // // // //                 const cityName = regencies.find(r => r.code === selectedCityId)?.name || '';
// // // // // // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
// // // // // // //                 finalOrganizer = `PMI Kabupaten/Kota: ${cityName}, ${provName}`;
// // // // // // //             } else if (organizerType !== 'PMI Pusat') {
// // // // // // //                 finalOrganizer = `${organizerType}: ${organizerName}`;
// // // // // // //             }

// // // // // // //             const payload = {
// // // // // // //                 title: formData.title,
// // // // // // //                 description: formData.description,
// // // // // // //                 programType: formData.programType,
// // // // // // //                 hasCertificate: formData.hasCertificate,
// // // // // // //                 price: Number(formData.price),
// // // // // // //                 estimatedDuration: Number(formData.estimatedDuration),
// // // // // // //                 totalJp: Number(formData.totalJp),
// // // // // // //                 thumbnailUrl: formData.thumbnailUrl,
// // // // // // //                 promoVideoUrl: formData.promoVideoUrl,
// // // // // // //                 
// // // // // // //                 organizer: finalOrganizer,

// // // // // // //                 registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
// // // // // // //                 executionPeriod: { isForever: formData.execIsForever, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
// // // // // // //                 registrationMethod: formData.registrationMethod,
// // // // // // //                 
// // // // // // //                 registrationConfig: { 
// // // // // // //                     requireDocs: formData.requireDocs, 
// // // // // // //                     templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) 
// // // // // // //                 },
// // // // // // //                 
// // // // // // //                 facilities: formData.facilities,
// // // // // // //                 facilitatorIds: formData.facilitatorIds,
// // // // // // //                 
// // // // // // //                 pics: validPics,
// // // // // // //                 picIds: picIds, 

// // // // // // //                 creatorInfo: formData.creatorInfo,
// // // // // // //                 contact: {
// // // // // // //                     name: formData.contactName,
// // // // // // //                     email: formData.contactEmail,
// // // // // // //                     phone: formData.contactPhone
// // // // // // //                 }
// // // // // // //             };

// // // // // // //             if (course?._id) await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
// // // // // // //             else await api('/api/courses', { method: 'POST', body: payload });

// // // // // // //             alert("Berhasil disimpan!");
// // // // // // //             onSuccess();
// // // // // // //         } catch (err: any) {
// // // // // // //             console.error(err);
// // // // // // //             alert("Gagal: " + (err.response?.data?.message || err.message));
// // // // // // //         } finally {
// // // // // // //             setLoading(false);
// // // // // // //             setShowDisclaimer(false);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const handleAdminApproveContent = async () => {
// // // // // // //         if(!confirm("Apakah Anda yakin konten pelatihan ini sudah lengkap dan SIAP UNTUK DIPUBLISH oleh Pengaju?")) return;
// // // // // // //         
// // // // // // //         setLoading(true);
// // // // // // //         try {
// // // // // // //             await api(`/api/courses/${course._id}`, { 
// // // // // // //                 method: 'PATCH', 
// // // // // // //                 body: { status: 'ready' } 
// // // // // // //             });
// // // // // // //             
// // // // // // //             alert("✅ Konten disetujui! Status pelatihan sekarang: SIAP PUBLISH.\nPengaju sekarang bisa melihat tombol Publish di dashboard mereka.");
// // // // // // //             onSuccess();
// // // // // // //             onClose();
// // // // // // //         } catch (err: any) {
// // // // // // //             console.error(err);
// // // // // // //             alert("Gagal mengubah status: " + err.message);
// // // // // // //         } finally {
// // // // // // //             setLoading(false);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const selectedFacilitators = facilitators.filter(f => formData.facilitatorIds.includes(f.id || f._id));
// // // // // // //     const availableFacilitators = facilitators.filter(f => !formData.facilitatorIds.includes(f.id || f._id) && (f.name?.toLowerCase().includes(searchFacilitator.toLowerCase()) || f.email?.toLowerCase().includes(searchFacilitator.toLowerCase())));
// // // // // // //     const filteredPicCandidates = allUsers.filter(u => ((u.name || '').toLowerCase().includes(searchPic.toLowerCase()) || (u.email || '').toLowerCase().includes(searchPic.toLowerCase())) && !formData.pics.some((p: any) => p.email === u.email));
// // // // // // //     const allOrgTypes = ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota', ...cmsCategories];

// // // // // // //     const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN' || currentUser?.permissions?.includes('manage_courses');
// // // // // // //     const isDraftStatus = course?.status === 'draft';

// // // // // // //     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><Loader2 className="animate-spin text-white"/></div>;

// // // // // // //     const footerButtons = (
// // // // // // //         <>
// // // // // // //             <div className="flex-1 text-xs text-gray-500 hidden md:block text-left">
// // // // // // //                 Status saat ini: <span className="font-bold uppercase">{course?.status || 'Baru'}</span>
// // // // // // //             </div>
// // // // // // //             <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50">Batal</button>
// // // // // // //             
// // // // // // //             {isSuperAdmin && isDraftStatus && course?._id && (
// // // // // // //                 <button 
// // // // // // //                     onClick={handleAdminApproveContent} 
// // // // // // //                     disabled={loading}
// // // // // // //                     className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-md flex items-center gap-2"
// // // // // // //                 >
// // // // // // //                     {loading ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18}/>}
// // // // // // //                     Setujui Konten
// // // // // // //                 </button>
// // // // // // //             )}

// // // // // // //             <button onClick={handlePreSubmit} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] shadow-lg flex items-center gap-2 disabled:opacity-50">
// // // // // // //                 {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} 
// // // // // // //                 Simpan Perubahan
// // // // // // //             </button>
// // // // // // //         </>
// // // // // // //     );

// // // // // // //     return (
// // // // // // //         <BaseModal
// // // // // // //             isOpen={true}
// // // // // // //             onClose={onClose}
// // // // // // //             title={course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}
// // // // // // //             subTitle={isDraftStatus && isSuperAdmin ? 'Review Kelengkapan Materi Pelatihan' : 'Lengkapi data pelatihan.'}
// // // // // // //             size="full" // GUNAKAN FULL AGAR LEBAR
// // // // // // //             footer={footerButtons}
// // // // // // //         >
// // // // // // //             {/* TABS MENU */}
// // // // // // //             <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0 mb-6 -mx-6 px-6 pt-2">
// // // // // // //                 {[{ id: 'info', label: '1. Informasi Dasar', icon: FileText }, { id: 'media', label: '2. Media & Visual', icon: ImageIcon }, { id: 'registration', label: '3. Jadwal & Pelaksana', icon: Calendar }, { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award }, { id: 'team', label: '5. Tim & PIC', icon: Users }].map((tab) => (
// // // // // // //                     <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
// // // // // // //                         <tab.icon size={16} /> {tab.label}
// // // // // // //                     </button>
// // // // // // //                 ))}
// // // // // // //             </div>

// // // // // // //             {/* TAB 1: INFO */}
// // // // // // //             {activeTab === 'info' && (
// // // // // // //                 <div className="space-y-6 max-w-4xl mx-auto">
// // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="inpTitle">Judul Pelatihan <span className="text-red-500">*</span></label><input id="inpTitle" required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: Orientasi Kepalangmerahan" value={formData.title} onChange={e => handleChange('title', e.target.value)} aria-label="Judul"/></div>
// // // // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap <span className="text-red-500">*</span></label><div className="bg-white border rounded-lg overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" aria-label="Deskripsi" /></div></div>
// // // // // // //                     </div>

// // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
// // // // // // //                         <div>
// // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label>
// // // // // // //                             <div className="flex gap-4">
// // // // // // //                                 <div onClick={() => handleChange('programType', 'training')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'training' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// // // // // // //                                     <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'training' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'training' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// // // // // // //                                     <span className="text-sm text-gray-700 font-medium">Diklat Resmi</span>
// // // // // // //                                 </div>
// // // // // // //                                 <div onClick={() => handleChange('programType', 'course')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'course' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// // // // // // //                                     <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'course' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'course' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// // // // // // //                                     <span className="text-sm text-gray-700 font-medium">Kursus Mandiri</span>
// // // // // // //                                 </div>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                         <div className="w-px bg-gray-200"></div>
// // // // // // //                         <div className="flex items-center gap-3">
// // // // // // //                             <div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // // // //                                 <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div>
// // // // // // //                                 <span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             )}

// // // // // // //             {/* TAB 2: MEDIA */}
// // // // // // //             {activeTab === 'media' && (
// // // // // // //                 <div className="max-w-3xl mx-auto space-y-6">
// // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) <span className="text-red-500">*</span></label>
// // // // // // //                         <div className="flex gap-6 items-start">
// // // // // // //                             <div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
// // // // // // //                                 {formData.thumbnailUrl ? <img src={getLocalDisplayUrl(formData.thumbnailUrl)} alt="Preview Cover" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1" /><span className="text-xs">Belum ada gambar</span></div>}
// // // // // // //                                 {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
// // // // // // //                             </div>
// // // // // // //                             <div className="flex-1">
// // // // // // //                                 <p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p>
// // // // // // //                                 <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" title="Input Gambar" aria-label="Input Gambar"/>
// // // // // // //                                 <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2" title="Upload Gambar"><Upload size={16}/> Upload Gambar</button>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label>
// // // // // // //                         <div className="flex gap-2"><div className="p-3 bg-gray-100 rounded-l-lg border border-r-0 text-gray-500"><Video size={18}/></div><input type="text" className="flex-1 p-2.5 border rounded-r-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} aria-label="URL Video Youtube" /></div>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             )}

// // // // // // //             {/* TAB 3: JADWAL & PELAKSANA */}
// // // // // // //             {activeTab === 'registration' && (
// // // // // // //                 <div className="max-w-4xl mx-auto space-y-6">
// // // // // // //                     <div className="grid grid-cols-2 gap-6">
// // // // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // //                             <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
// // // // // // //                             <div className="flex items-center gap-2 mb-2">
// // // // // // //                                 <div onClick={() => handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // // // //                                     <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // // // //                                     <span className="text-sm text-gray-600">Buka Selamanya</span>
// // // // // // //                                 </div>
// // // // // // //                             </div>
// // // // // // //                             {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} title="Mulai Pendaftaran" aria-label="Mulai Pendaftaran"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} title="Selesai Pendaftaran" aria-label="Selesai Pendaftaran"/></div></div>)}
// // // // // // //                         </div>
// // // // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // //                             <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
// // // // // // //                             <div className="flex items-center gap-2 mb-2">
// // // // // // //                                 <div onClick={() => handleChange('execIsForever', !formData.execIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // // // //                                     <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.execIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // // // //                                     <span className="text-sm text-gray-600">Fleksibel</span>
// // // // // // //                                 </div>
// // // // // // //                             </div>
// // // // // // //                             {!formData.execIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} aria-label="Pelaksanaan Mulai"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} aria-label="Pelaksanaan Selesai"/></div></div>)}
// // // // // // //                         </div>
// // // // // // //                     </div>

// // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // // // //                         <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan <span className="text-red-500">*</span></label>
// // // // // // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // //                             <select className="w-full p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500" value={organizerType} onChange={(e) => { setOrganizerType(e.target.value); setSelectedProvId(''); setSelectedCityId(''); }} title="Tipe Pelaksana" aria-label="Tipe Pelaksana">
// // // // // // //                                 {allOrgTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
// // // // // // //                             </select>
// // // // // // //                             {organizerType === 'PMI Provinsi' && (
// // // // // // //                                 <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi">
// // // // // // //                                     <option value="">-- Pilih Provinsi --</option>
// // // // // // //                                     {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// // // // // // //                                 </select>
// // // // // // //                             )}
// // // // // // //                             {organizerType === 'PMI Kabupaten/Kota' && (
// // // // // // //                                 <>
// // // // // // //                                     <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi">
// // // // // // //                                         <option value="">-- Pilih Provinsi --</option>
// // // // // // //                                         {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// // // // // // //                                     </select>
// // // // // // //                                     <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedCityId} onChange={e => setSelectedCityId(e.target.value)} disabled={!selectedProvId} aria-label="Pilih Kota">
// // // // // // //                                         <option value="">-- Pilih Kab/Kota --</option>
// // // // // // //                                         {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
// // // // // // //                                     </select>
// // // // // // //                                 </>
// // // // // // //                             )}
// // // // // // //                             {!['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota'].includes(organizerType) && (
// // // // // // //                                 <input type="text" className="w-full p-2.5 border rounded-lg" placeholder="Nama Unit / Organisasi..." value={organizerName} onChange={e => setOrganizerName(e.target.value)} aria-label="Nama Organisasi"/>
// // // // // // //                             )}
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                     
// // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // //                         <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan Peserta</h3>
// // // // // // //                         <div className="space-y-4">
// // // // // // //                                 <div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'auto' ? 'bg-green-50 border-green-200 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'auto' ? 'border-green-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'auto' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Otomatis (Langsung Aktif)</span><span className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</span></div></div>
// // // // // // //                                 <div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'manual' ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'manual' ? 'border-yellow-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'manual' && <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Manual (Verifikasi Admin)</span><span className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</span></div></div>
// // // // // // //                         </div>
// // // // // // //                     </div>

// // // // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // //                         <div className="flex justify-between items-start mb-4">
// // // // // // //                             <div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div>
// // // // // // //                             <div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer">
// // // // // // //                                 <div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // // // //                                 <span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                         {formData.requireDocs && (
// // // // // // //                             <div className="space-y-3">
// // // // // // //                                 <div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} title="Input Template" aria-label="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50" aria-label="Upload Template"><Upload size={14}/> Upload Template Baru</button></div>
// // // // // // //                                 {formData.registrationTemplates.map((item: any, idx: number) => (
// // // // // // //                                     <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
// // // // // // //                                         <div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div>
// // // // // // //                                         <div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} aria-label="Nama Dokumen"/><a href={getLocalDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()} aria-label="Download File"><Download size={10} /> Lihat File Uploaded</a></div>
// // // // // // //                                         <button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" aria-label="Hapus Dokumen"><Trash2 size={16} /></button>
// // // // // // //                                     </div>
// // // // // // //                                 ))}
// // // // // // //                             </div>
// // // // // // //                         )}
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             )}

// // // // // // //             {/* TAB 4: FASILITAS */}
// // // // // // //             {activeTab === 'facilities' && (
// // // // // // //                 <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
// // // // // // //                     <div className="space-y-6">
// // // // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" aria-label="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div>
// // // // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.estimatedDuration} disabled aria-label="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.totalJp} disabled aria-label="Total JP"/></div></div></div>
// // // // // // //                     </div>
// // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas <span className="text-red-500">*</span></label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} aria-label="Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" aria-label="Tambah Fasilitas"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" aria-label="Hapus Fasilitas"><X size={14}/></button></div>))}</div></div>
// // // // // // //                 </div>
// // // // // // //             )}

// // // // // // //             {/* TAB 5: TIM & PIC */}
// // // // // // //             {activeTab === 'team' && (
// // // // // // //                 <div className="max-w-4xl mx-auto space-y-8">
// // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // //                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
// // // // // // //                         <p className="text-xs text-gray-500 mb-4">*Mencakup Admin, Superadmin, dan Fasilitator.</p>
// // // // // // //                         
// // // // // // //                         <div className="mb-4 space-y-2">
// // // // // // //                             {selectedFacilitators.map(fac => (
// // // // // // //                                 <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100 animate-in slide-in-from-top-1">
// // // // // // //                                     <div className="flex items-center gap-3">
// // // // // // //                                         <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-xs border border-red-200">{fac.name?.charAt(0)}</div>
// // // // // // //                                         <div><span className="text-sm font-bold text-red-900 block">{fac.name}</span><span className="text-[10px] text-red-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full w-fit border border-red-100"><Clock size={10}/> Menunggu Persetujuan</span></div>
// // // // // // //                                     </div>
// // // // // // //                                     <button type="button" onClick={() => toggleFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus" aria-label="Hapus"><X size={14}/></button>
// // // // // // //                                 </div>
// // // // // // //                             ))}
// // // // // // //                         </div>

// // // // // // //                         <div className="relative">
// // // // // // //                             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // // // // //                             <input type="text" placeholder="Cari nama atau email..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchFacilitator} onChange={(e) => setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator"/>
// // // // // // //                             {searchFacilitator && (
// // // // // // //                                 <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// // // // // // //                                     {availableFacilitators.length > 0 ? availableFacilitators.map(fac => (
// // // // // // //                                         <button key={fac._id || fac.id} type="button" onClick={() => { toggleFacilitator(fac._id || fac.id); setSearchFacilitator(''); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// // // // // // //                                             <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{fac.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{fac.name}</p><p className="text-[10px] text-gray-400">{fac.email} • {fac.role}</p></div></div><Plus size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // // // // // //                                         </button>
// // // // // // //                                     )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // // // // // //                                 </div>
// // // // // // //                             )}
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                     
// // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // //                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
// // // // // // //                         
// // // // // // //                         <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
// // // // // // //                             <div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div>
// // // // // // //                             <div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div>
// // // // // // //                         </div>

// // // // // // //                         <div className="space-y-2 mb-4">
// // // // // // //                             <label className="text-sm font-bold text-gray-700 block">Daftar PIC Tambahan (Maks 3)</label>
// // // // // // //                             {formData.pics.map((pic: any, idx: number) => (
// // // // // // //                                 <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in slide-in-from-top-1">
// // // // // // //                                     <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">{pic.name?.charAt(0)}</div><div><span className="text-sm font-bold text-blue-900 block">{pic.name}</span><div className="flex gap-2"><span className="text-[10px] text-blue-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full border border-blue-100"><Clock size={10}/> Menunggu Persetujuan</span><span className="text-[10px] text-gray-500">{pic.email}</span></div></div></div><button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
// // // // // // //                                 </div>
// // // // // // //                             ))}
// // // // // // //                         </div>

// // // // // // //                         {formData.pics.length < 3 ? (
// // // // // // //                             <div className="relative">
// // // // // // //                                 <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // // // // //                                 <input type="text" placeholder="Cari user untuk dijadikan PIC..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchPic} onChange={(e) => setSearchPic(e.target.value)} aria-label="Cari PIC"/>
// // // // // // //                                 {searchPic && (
// // // // // // //                                     <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// // // // // // //                                         {filteredPicCandidates.length > 0 ? filteredPicCandidates.map(user => (
// // // // // // //                                             <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// // // // // // //                                                 <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div></div><UserPlus size={16} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // // // // // //                                             </button>
// // // // // // //                                         )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // // // // // //                                     </div>
// // // // // // //                                 )}
// // // // // // //                             </div>
// // // // // // //                         ) : <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 rounded-lg border border-gray-200">Kuota PIC penuh (Maksimal 3).</div>}
// // // // // // //                     </div>

// // // // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // // // //                         <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckSquare size={18}/> Kontak Utama (Landing Page)</h3></div>
// // // // // // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // //                             <div><label className="text-xs font-bold text-gray-500">Nama Kontak <span className="text-red-500">*</span></label><input name="contactName" value={formData.contactName} onChange={(e) => handleChange('contactName', e.target.value)} className="w-full p-2 border rounded" aria-label="Nama Kontak" /></div>
// // // // // // //                             <div><label className="text-xs font-bold text-gray-500">Email Kontak <span className="text-red-500">*</span></label><input name="contactEmail" value={formData.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} className="w-full p-2 border rounded" aria-label="Email Kontak" /></div>
// // // // // // //                             <div className="md:col-span-2"><label className="text-xs font-bold text-gray-500">Nomor Telepon/WA <span className="text-red-500">*</span></label><input name="contactPhone" value={formData.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} className="w-full p-2 border rounded" placeholder="628..." aria-label="Telepon Kontak" /></div>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             )}

// // // // // // //             {/* DISCLAIMER POPUP */}
// // // // // // //             {showDisclaimer && (
// // // // // // //                 <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in">
// // // // // // //                     <div className="absolute inset-0 bg-black/80"></div>
// // // // // // //                     <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 text-center space-y-4">
// // // // // // //                         <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2"><ShieldCheck size={32} className="text-orange-600"/></div>
// // // // // // //                         <h3 className="text-xl font-bold text-gray-900">Pernyataan Disclaimer</h3>
// // // // // // //                         <p className="text-sm text-gray-500 leading-relaxed">Saya menyatakan bahwa data pelatihan ini benar dan bertanggung jawab atas konten yang disajikan.</p>
// // // // // // //                         
// // // // // // //                         <label className="flex items-center justify-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors">
// // // // // // //                             <input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} className="w-5 h-5 accent-orange-600" aria-label="Setuju"/>
// // // // // // //                             <span className="font-bold text-sm text-orange-800">Saya Setuju & Lanjutkan</span>
// // // // // // //                         </label>

// // // // // // //                         <div className="flex gap-3 pt-2">
// // // // // // //                             <button onClick={() => setShowDisclaimer(false)} className="flex-1 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50">Kembali</button>
// // // // // // //                             <button onClick={handleFinalSubmit} disabled={!isAgreed || loading} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
// // // // // // //                                 {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Proses Simpan
// // // // // // //                             </button>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             )}
// // // // // // //         </BaseModal>
// // // // // // //     );
// // // // // // // } 




// // // // // // =======================================================================================
// // // // // // MASTER FORM AWAL
// // // // // // =======================================================================================





// // // // // 'use client';

// // // // // import { useState, useRef, useEffect } from 'react';
// // // // // import { 
// // // // //     X, Upload, Plus, Trash2, Save, Calendar, 
// // // // //     Video, Image as ImageIcon, Users, FileText, 
// // // // //     CheckCircle, AlertCircle, Award, Clock, Search, 
// // // // //     Download, File, Loader2, UserPlus, 
// // // // //     ShieldCheck, CheckSquare, Building
// // // // // } from 'lucide-react';
// // // // // import { api, apiUpload } from '@/lib/api'; 
// // // // // import { getProvinces, getRegencies } from '@/lib/indonesia';
// // // // // import dynamic from 'next/dynamic';
// // // // // import 'react-quill/dist/quill.snow.css';
// // // // // import axios from 'axios'; 
// // // // // import BaseModal from '@/components/ui/BaseModal'; 

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
    
// // // // //     // Refs
// // // // //     const fileInputRef = useRef<HTMLInputElement>(null); 
// // // // //     const templateInputRef = useRef<HTMLInputElement>(null); 
    
// // // // //     // State Search & Users
// // // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
// // // // //     const [searchPic, setSearchPic] = useState('');
// // // // //     const [allUsers, setAllUsers] = useState<any[]>([]);
    
// // // // //     // State Disclaimer Popup
// // // // //     const [showDisclaimer, setShowDisclaimer] = useState(false);
// // // // //     const [isAgreed, setIsAgreed] = useState(false);

// // // // //     // State Pelaksana & Wilayah
// // // // //     const [organizerType, setOrganizerType] = useState('PMI Pusat');
// // // // //     const [organizerName, setOrganizerName] = useState(''); 
// // // // //     const [provinces, setProvinces] = useState<any[]>([]);
// // // // //     const [regencies, setRegencies] = useState<any[]>([]);
// // // // //     const [selectedProvId, setSelectedProvId] = useState('');
// // // // //     const [selectedCityId, setSelectedCityId] = useState('');
// // // // //     const [cmsCategories, setCmsCategories] = useState<string[]>([]);

// // // // //     // State UI Tambahan
// // // // //     const [newFacility, setNewFacility] = useState('');
// // // // //     const [uploadingCover, setUploadingCover] = useState(false);
// // // // //     const [uploadingTemplate, setUploadingTemplate] = useState(false);

// // // // //     // --- INITIAL STATE ---
// // // // //     const defaultState = {
// // // // //         title: '', description: '', 
// // // // //         programType: 'training', 
// // // // //         hasCertificate: true,
        
// // // // //         regIsForever: false, regStartDate: '', regEndDate: '',
// // // // //         execIsForever: false, execStartDate: '', execEndDate: '',
        
// // // // //         thumbnailUrl: '', promoVideoUrl: '',
        
// // // // //         registrationMethod: 'auto', 
// // // // //         requireDocs: true, 
// // // // //         registrationTemplates: [] as any[], 
        
// // // // //         price: 0, estimatedDuration: 0, totalJp: 0, 
// // // // //         facilities: [] as string[], 
// // // // //         facilitatorIds: [] as string[],
// // // // //         pics: [] as any[], 
        
// // // // //         creatorInfo: null as any,
// // // // //         contactName: '', contactPhone: '', contactEmail: ''
// // // // //     };

// // // // //     const [formData, setFormData] = useState(defaultState);

// // // // //     const getLocalDisplayUrl = (url: string) => {
// // // // //         if (!url) return '';
// // // // //         if (url.startsWith('http')) return url;
// // // // //         const cleanPath = url.startsWith('/') ? url : `/${url}`;
// // // // //         return `${API_BASE_URL}${cleanPath}`;
// // // // //     };

// // // // //     // --- LOAD DATA AWAL ---
// // // // //     useEffect(() => {
// // // // //         const provs = getProvinces();
// // // // //         setProvinces(provs);
        
// // // // //         api('/api/content').then(res => {
// // // // //             if (res && res.organizerCategories) setCmsCategories(res.organizerCategories);
// // // // //         }).catch(() => {});
        
// // // // //         api('/api/users').then(res => setAllUsers(res.users || [])).catch(() => setAllUsers(facilitators));
// // // // //     }, []);

// // // // //     useEffect(() => {
// // // // //         if (selectedProvId) {
// // // // //             const regs = getRegencies(selectedProvId);
// // // // //             setRegencies(regs);
// // // // //         } else {
// // // // //             setRegencies([]);
// // // // //         }
// // // // //     }, [selectedProvId]);

// // // // //     useEffect(() => {
// // // // //         const initData = async () => {
// // // // //             if (course && course._id) {
// // // // //                 setFetchingDetail(true);
// // // // //                 try {
// // // // //                     const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
// // // // //                     const fullData = res.course || res.data || res;
// // // // //                     populateForm(fullData);
// // // // //                 } catch (e) {
// // // // //                     populateForm(course);
// // // // //                 } finally {
// // // // //                     setFetchingDetail(false);
// // // // //                 }
// // // // //             } else {
// // // // //                 if (currentUser) {
// // // // //                      setFormData(prev => ({
// // // // //                         ...prev,
// // // // //                         contactName: currentUser.name,
// // // // //                         contactEmail: currentUser.email,
// // // // //                         contactPhone: currentUser.phoneNumber || ''
// // // // //                       }));
// // // // //                 }
// // // // //             }
// // // // //         };
// // // // //         initData();
// // // // //     }, [course]);

// // // // //     const populateForm = (data: any) => {
// // // // //         const formatDate = (d: string) => {
// // // // //             if (!d) return '';
// // // // //             try { return new Date(d).toISOString().split('T')[0]; } catch (e) { return ''; }
// // // // //         };

// // // // //         let initialPics = Array.isArray(data.pics) ? data.pics : [];
// // // // //         if (Array.isArray(data.picIds) && data.picIds.length > 0) {
// // // // //             initialPics = data.picIds.map((p: any) => ({
// // // // //                 id: p._id || p.id,
// // // // //                 name: p.name,
// // // // //                 email: p.email,
// // // // //                 role: p.role,
// // // // //                 avatarUrl: p.avatarUrl
// // // // //             }));
// // // // //         }

// // // // //         setFormData({
// // // // //             title: data.title || '', description: data.description || '', 
// // // // //             programType: data.programType || 'training', 
// // // // //             hasCertificate: data.hasCertificate ?? true,
            
// // // // //             regIsForever: data.registrationPeriod?.isForever ?? false,
// // // // //             regStartDate: formatDate(data.registrationPeriod?.startDate),
// // // // //             regEndDate: formatDate(data.registrationPeriod?.endDate),

// // // // //             execIsForever: data.executionPeriod?.isForever ?? false,
// // // // //             execStartDate: formatDate(data.executionPeriod?.startDate),
// // // // //             execEndDate: formatDate(data.executionPeriod?.endDate),

// // // // //             thumbnailUrl: data.thumbnailUrl || '', promoVideoUrl: data.promoVideoUrl || '',

// // // // //             registrationMethod: data.registrationMethod || 'auto',
// // // // //             requireDocs: data.registrationConfig?.requireDocs !== false,
// // // // //             registrationTemplates: Array.isArray(data.registrationConfig?.templates) ? data.registrationConfig.templates : [],

// // // // //             price: Number(data.price) || 0, 
// // // // //             estimatedDuration: Number(data.estimatedDuration) || 0, 
// // // // //             totalJp: Number(data.totalJp) || 0,
            
// // // // //             facilities: Array.isArray(data.facilities) ? data.facilities : [],
// // // // //             facilitatorIds: Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [],
// // // // //             pics: initialPics, 
            
// // // // //             creatorInfo: data.creatorInfo || null,
// // // // //             contactName: data.contact?.name || data.creatorInfo?.name || '',
// // // // //             contactEmail: data.contact?.email || data.creatorInfo?.email || '',
// // // // //             contactPhone: data.contact?.phone || data.creatorInfo?.contact || ''
// // // // //         });

// // // // //         if (data.organizer) {
// // // // //             const org = data.organizer;
// // // // //             if (org === 'PMI Pusat') {
// // // // //                 setOrganizerType('PMI Pusat');
// // // // //             } else if (org.startsWith('PMI Provinsi')) {
// // // // //                 setOrganizerType('PMI Provinsi');
// // // // //                 const pName = org.split(': ')[1]?.trim();
// // // // //                 const foundProv = getProvinces().find((p: any) => p.name === pName);
// // // // //                 if (foundProv) setSelectedProvId(foundProv.code);
// // // // //             } else if (org.startsWith('PMI Kab/Kota')) {
// // // // //                 setOrganizerType('PMI Kabupaten/Kota');
// // // // //                 const locParts = org.split(': ')[1]?.split(',');
// // // // //                 if (locParts && locParts.length > 1) {
// // // // //                      const cityName = locParts[0]?.trim();
// // // // //                      const provName = locParts[1]?.trim();
// // // // //                      const foundProv = getProvinces().find((p: any) => p.name === provName);
// // // // //                      if (foundProv) {
// // // // //                          setSelectedProvId(foundProv.code);
// // // // //                          const regs = getRegencies(foundProv.code);
// // // // //                          setRegencies(regs);
// // // // //                          const foundCity = regs.find((r: any) => r.name === cityName);
// // // // //                          if (foundCity) setSelectedCityId(foundCity.code);
// // // // //                      }
// // // // //                 }
// // // // //             } else {
// // // // //                 const parts = org.split(': ');
// // // // //                 setOrganizerType(parts[0]);
// // // // //                 setOrganizerName(parts[1] || '');
// // // // //             }
// // // // //         }
// // // // //     }

// // // // //     // --- HANDLERS ---
// // // // //     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
// // // // //     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
// // // // //     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };
// // // // //     const toggleFacilitator = (id: string) => {
// // // // //         const current = formData.facilitatorIds;
// // // // //         setFormData(prev => ({ ...prev, facilitatorIds: current.includes(id) ? current.filter(fid => fid !== id) : [...current, id] }));
// // // // //     };

// // // // //     const handleAddPicFromSearch = (user: any) => {
// // // // //         if (formData.pics.length >= 3) return alert("Maksimal 3 PIC Tambahan");
// // // // //         if (formData.pics.some((p: any) => p.email === user.email)) return alert("User ini sudah ditambahkan.");

// // // // //         const newPic = {
// // // // //             id: user._id || user.id,
// // // // //             name: user.name,
// // // // //             pmiStatus: user.role, 
// // // // //             email: user.email,
// // // // //             avatarUrl: user.avatarUrl
// // // // //         };
// // // // //         setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
// // // // //         setSearchPic('');
// // // // //     };

// // // // //     const removePic = (idx: number) => { setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); };
    
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

// // // // //     const handlePreSubmit = () => {
// // // // //         if (!formData.title) return alert("Judul wajib diisi!");
// // // // //         setShowDisclaimer(true);
// // // // //     };

// // // // //     const handleFinalSubmit = async () => {
// // // // //         if (!isAgreed) return alert("Mohon setujui pernyataan disclaimer.");
        
// // // // //         setLoading(true);
// // // // //         try {
// // // // //             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
// // // // //             const picIds = validPics.map((p: any) => p.id || p._id).filter((id: any) => id);

// // // // //             const parseDate = (d: string) => d ? new Date(d) : null;

// // // // //             let finalOrganizer = organizerType;
// // // // //             if (organizerType === 'PMI Provinsi') {
// // // // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
// // // // //                 finalOrganizer = `PMI Provinsi: ${provName}`;
// // // // //             } else if (organizerType === 'PMI Kabupaten/Kota') {
// // // // //                 const cityName = regencies.find(r => r.code === selectedCityId)?.name || '';
// // // // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || '';
// // // // //                 finalOrganizer = `PMI Kabupaten/Kota: ${cityName}, ${provName}`;
// // // // //             } else if (organizerType !== 'PMI Pusat') {
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
// // // // //                 executionPeriod: { isForever: formData.execIsForever, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
// // // // //                 registrationMethod: formData.registrationMethod,
                
// // // // //                 registrationConfig: { 
// // // // //                     requireDocs: formData.requireDocs, 
// // // // //                     templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) 
// // // // //                 },
                
// // // // //                 facilities: formData.facilities,
// // // // //                 facilitatorIds: formData.facilitatorIds,
                
// // // // //                 pics: validPics,
// // // // //                 picIds: picIds, 

// // // // //                 creatorInfo: formData.creatorInfo,
// // // // //                 contact: {
// // // // //                     name: formData.contactName,
// // // // //                     email: formData.contactEmail,
// // // // //                     phone: formData.contactPhone
// // // // //                 }
// // // // //             };

// // // // //             if (course?._id) await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
// // // // //             else await api('/api/courses', { method: 'POST', body: payload });

// // // // //             alert("Berhasil disimpan!");
// // // // //             onSuccess();
// // // // //         } catch (err: any) {
// // // // //             console.error(err);
// // // // //             alert("Gagal: " + (err.response?.data?.message || err.message));
// // // // //         } finally {
// // // // //             setLoading(false);
// // // // //             setShowDisclaimer(false);
// // // // //         }
// // // // //     };

// // // // //     const handleAdminApproveContent = async () => {
// // // // //         if(!confirm("Apakah Anda yakin konten pelatihan ini sudah lengkap dan SIAP UNTUK DIPUBLISH oleh Pengaju?")) return;
        
// // // // //         setLoading(true);
// // // // //         try {
// // // // //             await api(`/api/courses/${course._id}`, { 
// // // // //                 method: 'PATCH', 
// // // // //                 body: { status: 'ready' } 
// // // // //             });
            
// // // // //             alert("✅ Konten disetujui! Status pelatihan sekarang: SIAP PUBLISH.\nPengaju sekarang bisa melihat tombol Publish di dashboard mereka.");
// // // // //             onSuccess();
// // // // //             onClose();
// // // // //         } catch (err: any) {
// // // // //             console.error(err);
// // // // //             alert("Gagal mengubah status: " + err.message);
// // // // //         } finally {
// // // // //             setLoading(false);
// // // // //         }
// // // // //     };

// // // // //     const selectedFacilitators = facilitators.filter(f => formData.facilitatorIds.includes(f.id || f._id));
// // // // //     const availableFacilitators = facilitators.filter(f => !formData.facilitatorIds.includes(f.id || f._id) && (f.name?.toLowerCase().includes(searchFacilitator.toLowerCase()) || f.email?.toLowerCase().includes(searchFacilitator.toLowerCase())));
// // // // //     const filteredPicCandidates = allUsers.filter(u => ((u.name || '').toLowerCase().includes(searchPic.toLowerCase()) || (u.email || '').toLowerCase().includes(searchPic.toLowerCase())) && !formData.pics.some((p: any) => p.email === u.email));
// // // // //     const allOrgTypes = ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota', ...cmsCategories];

// // // // //     const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN' || currentUser?.permissions?.includes('manage_courses');
// // // // //     const isDraftStatus = course?.status === 'draft';

// // // // //     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><Loader2 className="animate-spin text-white"/></div>;

// // // // //     const footerButtons = (
// // // // //         <>
// // // // //             <div className="flex-1 text-xs text-gray-500 hidden md:block text-left">
// // // // //                 Status saat ini: <span className="font-bold uppercase">{course?.status || 'Baru'}</span>
// // // // //             </div>
// // // // //             <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50">Batal</button>
            
// // // // //             {isSuperAdmin && isDraftStatus && course?._id && (
// // // // //                 <button 
// // // // //                     onClick={handleAdminApproveContent} 
// // // // //                     disabled={loading}
// // // // //                     className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-md flex items-center gap-2"
// // // // //                 >
// // // // //                     {loading ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18}/>}
// // // // //                     Setujui Konten
// // // // //                 </button>
// // // // //             )}

// // // // //             <button onClick={handlePreSubmit} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] shadow-lg flex items-center gap-2 disabled:opacity-50">
// // // // //                 {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} 
// // // // //                 Simpan Perubahan
// // // // //             </button>
// // // // //         </>
// // // // //     );

// // // // //     return (
// // // // //         <BaseModal
// // // // //             isOpen={true}
// // // // //             onClose={onClose}
// // // // //             title={course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}
// // // // //             subTitle={isDraftStatus && isSuperAdmin ? 'Review Kelengkapan Materi Pelatihan' : 'Lengkapi data pelatihan.'}
// // // // //             size="full" // GUNAKAN FULL AGAR LEBAR
// // // // //             footer={footerButtons}
// // // // //         >
// // // // //             {/* TABS MENU */}
// // // // //             <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0 mb-6 -mx-6 px-6 pt-2">
// // // // //                 {[{ id: 'info', label: '1. Informasi Dasar', icon: FileText }, { id: 'media', label: '2. Media & Visual', icon: ImageIcon }, { id: 'registration', label: '3. Jadwal & Pelaksana', icon: Calendar }, { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award }, { id: 'team', label: '5. Tim & PIC', icon: Users }].map((tab) => (
// // // // //                     <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
// // // // //                         <tab.icon size={16} /> {tab.label}
// // // // //                     </button>
// // // // //                 ))}
// // // // //             </div>

// // // // //             {/* TAB 1: INFO */}
// // // // //             {activeTab === 'info' && (
// // // // //                 <div className="space-y-6 max-w-4xl mx-auto">
// // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="inpTitle">Judul Pelatihan <span className="text-red-500">*</span></label><input id="inpTitle" required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: Orientasi Kepalangmerahan" value={formData.title} onChange={e => handleChange('title', e.target.value)} aria-label="Judul"/></div>
// // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap <span className="text-red-500">*</span></label><div className="bg-white border rounded-lg overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" aria-label="Deskripsi" /></div></div>
// // // // //                     </div>

// // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
// // // // //                         <div>
// // // // //                             <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label>
// // // // //                             <div className="flex gap-4">
// // // // //                                 <div onClick={() => handleChange('programType', 'training')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'training' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// // // // //                                     <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'training' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'training' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// // // // //                                     <span className="text-sm text-gray-700 font-medium">Diklat Resmi</span>
// // // // //                                 </div>
// // // // //                                 <div onClick={() => handleChange('programType', 'course')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'course' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// // // // //                                     <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'course' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'course' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// // // // //                                     <span className="text-sm text-gray-700 font-medium">Kursus Mandiri</span>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                         <div className="w-px bg-gray-200"></div>
// // // // //                         <div className="flex items-center gap-3">
// // // // //                             <div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // //                                 <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div>
// // // // //                                 <span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             )}

// // // // //             {/* TAB 2: MEDIA */}
// // // // //             {activeTab === 'media' && (
// // // // //                 <div className="max-w-3xl mx-auto space-y-6">
// // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                         <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) <span className="text-red-500">*</span></label>
// // // // //                         <div className="flex gap-6 items-start">
// // // // //                             <div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
// // // // //                                 {formData.thumbnailUrl ? <img src={getLocalDisplayUrl(formData.thumbnailUrl)} alt="Preview Cover" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1" /><span className="text-xs">Belum ada gambar</span></div>}
// // // // //                                 {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
// // // // //                             </div>
// // // // //                             <div className="flex-1">
// // // // //                                 <p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p>
// // // // //                                 <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" title="Input Gambar" aria-label="Input Gambar"/>
// // // // //                                 <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2" title="Upload Gambar"><Upload size={16}/> Upload Gambar</button>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                         <label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label>
// // // // //                         <div className="flex gap-2"><div className="p-3 bg-gray-100 rounded-l-lg border border-r-0 text-gray-500"><Video size={18}/></div><input type="text" className="flex-1 p-2.5 border rounded-r-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} aria-label="URL Video Youtube" /></div>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             )}

// // // // //             {/* TAB 3: JADWAL & PELAKSANA */}
// // // // //             {activeTab === 'registration' && (
// // // // //                 <div className="max-w-4xl mx-auto space-y-6">
// // // // //                     <div className="grid grid-cols-2 gap-6">
// // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // //                             <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
// // // // //                             <div className="flex items-center gap-2 mb-2">
// // // // //                                 <div onClick={() => handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // //                                     <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // //                                     <span className="text-sm text-gray-600">Buka Selamanya</span>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                             {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} title="Mulai Pendaftaran" aria-label="Mulai Pendaftaran"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} title="Selesai Pendaftaran" aria-label="Selesai Pendaftaran"/></div></div>)}
// // // // //                         </div>
// // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // //                             <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
// // // // //                             <div className="flex items-center gap-2 mb-2">
// // // // //                                 <div onClick={() => handleChange('execIsForever', !formData.execIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// // // // //                                     <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.execIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // //                                     <span className="text-sm text-gray-600">Fleksibel</span>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                             {!formData.execIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} aria-label="Pelaksanaan Mulai"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} aria-label="Pelaksanaan Selesai"/></div></div>)}
// // // // //                         </div>
// // // // //                     </div>

// // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // // //                         <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan <span className="text-red-500">*</span></label>
// // // // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                             <select className="w-full p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500" value={organizerType} onChange={(e) => { setOrganizerType(e.target.value); setSelectedProvId(''); setSelectedCityId(''); }} title="Tipe Pelaksana" aria-label="Tipe Pelaksana">
// // // // //                                 {allOrgTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
// // // // //                             </select>
// // // // //                             {organizerType === 'PMI Provinsi' && (
// // // // //                                 <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi">
// // // // //                                     <option value="">-- Pilih Provinsi --</option>
// // // // //                                     {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// // // // //                                 </select>
// // // // //                             )}
// // // // //                             {organizerType === 'PMI Kabupaten/Kota' && (
// // // // //                                 <>
// // // // //                                     <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} aria-label="Pilih Provinsi">
// // // // //                                         <option value="">-- Pilih Provinsi --</option>
// // // // //                                         {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// // // // //                                     </select>
// // // // //                                     <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedCityId} onChange={e => setSelectedCityId(e.target.value)} disabled={!selectedProvId} aria-label="Pilih Kota">
// // // // //                                         <option value="">-- Pilih Kab/Kota --</option>
// // // // //                                         {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
// // // // //                                     </select>
// // // // //                                 </>
// // // // //                             )}
// // // // //                             {!['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota'].includes(organizerType) && (
// // // // //                                 <input type="text" className="w-full p-2.5 border rounded-lg" placeholder="Nama Unit / Organisasi..." value={organizerName} onChange={e => setOrganizerName(e.target.value)} aria-label="Nama Organisasi"/>
// // // // //                             )}
// // // // //                         </div>
// // // // //                     </div>
                    
// // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                         <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan Peserta</h3>
// // // // //                         <div className="space-y-4">
// // // // //                                 <div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'auto' ? 'bg-green-50 border-green-200 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'auto' ? 'border-green-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'auto' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Otomatis (Langsung Aktif)</span><span className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</span></div></div>
// // // // //                                 <div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'manual' ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'manual' ? 'border-yellow-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'manual' && <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Manual (Verifikasi Admin)</span><span className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</span></div></div>
// // // // //                         </div>
// // // // //                     </div>

// // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                         <div className="flex justify-between items-start mb-4">
// // // // //                             <div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div>
// // // // //                             <div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer">
// // // // //                                 <div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // // //                                 <span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                         {formData.requireDocs && (
// // // // //                             <div className="space-y-3">
// // // // //                                 <div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} title="Input Template" aria-label="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50" aria-label="Upload Template"><Upload size={14}/> Upload Template Baru</button></div>
// // // // //                                 {formData.registrationTemplates.map((item: any, idx: number) => (
// // // // //                                     <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
// // // // //                                         <div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div>
// // // // //                                         <div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} aria-label="Nama Dokumen"/><a href={getLocalDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()} aria-label="Download File"><Download size={10} /> Lihat File Uploaded</a></div>
// // // // //                                         <button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" aria-label="Hapus Dokumen"><Trash2 size={16} /></button>
// // // // //                                     </div>
// // // // //                                 ))}
// // // // //                             </div>
// // // // //                         )}
// // // // //                     </div>
// // // // //                 </div>
// // // // //             )}

// // // // //             {/* TAB 4: FASILITAS */}
// // // // //             {activeTab === 'facilities' && (
// // // // //                 <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
// // // // //                     <div className="space-y-6">
// // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" aria-label="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div>
// // // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.estimatedDuration} disabled aria-label="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.totalJp} disabled aria-label="Total JP"/></div></div></div>
// // // // //                     </div>
// // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas <span className="text-red-500">*</span></label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} aria-label="Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" aria-label="Tambah Fasilitas"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" aria-label="Hapus Fasilitas"><X size={14}/></button></div>))}</div></div>
// // // // //                 </div>
// // // // //             )}

// // // // //             {/* TAB 5: TIM & PIC */}
// // // // //             {activeTab === 'team' && (
// // // // //                 <div className="max-w-4xl mx-auto space-y-8">
// // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
// // // // //                         <p className="text-xs text-gray-500 mb-4">*Mencakup Admin, Superadmin, dan Fasilitator.</p>
                        
// // // // //                         <div className="mb-4 space-y-2">
// // // // //                             {selectedFacilitators.map(fac => (
// // // // //                                 <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100 animate-in slide-in-from-top-1">
// // // // //                                     <div className="flex items-center gap-3">
// // // // //                                         <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-xs border border-red-200">{fac.name?.charAt(0)}</div>
// // // // //                                         <div><span className="text-sm font-bold text-red-900 block">{fac.name}</span><span className="text-[10px] text-red-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full w-fit border border-red-100"><Clock size={10}/> Menunggu Persetujuan</span></div>
// // // // //                                     </div>
// // // // //                                     <button type="button" onClick={() => toggleFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus" aria-label="Hapus"><X size={14}/></button>
// // // // //                                 </div>
// // // // //                             ))}
// // // // //                         </div>

// // // // //                         <div className="relative">
// // // // //                             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // // //                             <input type="text" placeholder="Cari nama atau email..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchFacilitator} onChange={(e) => setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator"/>
// // // // //                             {searchFacilitator && (
// // // // //                                 <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// // // // //                                     {availableFacilitators.length > 0 ? availableFacilitators.map(fac => (
// // // // //                                         <button key={fac._id || fac.id} type="button" onClick={() => { toggleFacilitator(fac._id || fac.id); setSearchFacilitator(''); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// // // // //                                             <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{fac.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{fac.name}</p><p className="text-[10px] text-gray-400">{fac.email} • {fac.role}</p></div></div><Plus size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // // // //                                         </button>
// // // // //                                     )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // // // //                                 </div>
// // // // //                             )}
// // // // //                         </div>
// // // // //                     </div>
                    
// // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
                        
// // // // //                         <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
// // // // //                             <div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div>
// // // // //                             <div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div>
// // // // //                         </div>

// // // // //                         <div className="space-y-2 mb-4">
// // // // //                             <label className="text-sm font-bold text-gray-700 block">Daftar PIC Tambahan (Maks 3)</label>
// // // // //                             {formData.pics.map((pic: any, idx: number) => (
// // // // //                                 <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in slide-in-from-top-1">
// // // // //                                     <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">{pic.name?.charAt(0)}</div><div><span className="text-sm font-bold text-blue-900 block">{pic.name}</span><div className="flex gap-2"><span className="text-[10px] text-blue-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full border border-blue-100"><Clock size={10}/> Menunggu Persetujuan</span><span className="text-[10px] text-gray-500">{pic.email}</span></div></div></div><button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
// // // // //                                 </div>
// // // // //                             ))}
// // // // //                         </div>

// // // // //                         {formData.pics.length < 3 ? (
// // // // //                             <div className="relative">
// // // // //                                 <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // // //                                 <input type="text" placeholder="Cari user untuk dijadikan PIC..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchPic} onChange={(e) => setSearchPic(e.target.value)} aria-label="Cari PIC"/>
// // // // //                                 {searchPic && (
// // // // //                                     <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// // // // //                                         {filteredPicCandidates.length > 0 ? filteredPicCandidates.map(user => (
// // // // //                                             <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// // // // //                                                 <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div></div><UserPlus size={16} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // // // //                                             </button>
// // // // //                                         )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // // // //                                     </div>
// // // // //                                 )}
// // // // //                             </div>
// // // // //                         ) : <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 rounded-lg border border-gray-200">Kuota PIC penuh (Maksimal 3).</div>}
// // // // //                     </div>

// // // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // // //                         <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckSquare size={18}/> Kontak Utama (Landing Page)</h3></div>
// // // // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                             <div><label className="text-xs font-bold text-gray-500">Nama Kontak <span className="text-red-500">*</span></label><input name="contactName" value={formData.contactName} onChange={(e) => handleChange('contactName', e.target.value)} className="w-full p-2 border rounded" aria-label="Nama Kontak" /></div>
// // // // //                             <div><label className="text-xs font-bold text-gray-500">Email Kontak <span className="text-red-500">*</span></label><input name="contactEmail" value={formData.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} className="w-full p-2 border rounded" aria-label="Email Kontak" /></div>
// // // // //                             <div className="md:col-span-2"><label className="text-xs font-bold text-gray-500">Nomor Telepon/WA <span className="text-red-500">*</span></label><input name="contactPhone" value={formData.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} className="w-full p-2 border rounded" placeholder="628..." aria-label="Telepon Kontak" /></div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             )}

// // // // //             {/* DISCLAIMER POPUP */}
// // // // //             {showDisclaimer && (
// // // // //                 <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in">
// // // // //                     <div className="absolute inset-0 bg-black/80"></div>
// // // // //                     <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 text-center space-y-4">
// // // // //                         <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2"><ShieldCheck size={32} className="text-orange-600"/></div>
// // // // //                         <h3 className="text-xl font-bold text-gray-900">Pernyataan Disclaimer</h3>
// // // // //                         <p className="text-sm text-gray-500 leading-relaxed">Saya menyatakan bahwa data pelatihan ini benar dan bertanggung jawab atas konten yang disajikan.</p>
                        
// // // // //                         <label className="flex items-center justify-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors">
// // // // //                             <input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} className="w-5 h-5 accent-orange-600" aria-label="Setuju"/>
// // // // //                             <span className="font-bold text-sm text-orange-800">Saya Setuju & Lanjutkan</span>
// // // // //                         </label>

// // // // //                         <div className="flex gap-3 pt-2">
// // // // //                             <button onClick={() => setShowDisclaimer(false)} className="flex-1 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50">Kembali</button>
// // // // //                             <button onClick={handleFinalSubmit} disabled={!isAgreed || loading} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
// // // // //                                 {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Proses Simpan
// // // // //                             </button>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             )}
// // // // //         </BaseModal>
// // // // //     );
// // // // // }



// // // // // =======================================================================================
// // // // // PERBAIKAN LOKASI PELAKSANAAN AMBIL DARI LOKASI PELAKSANAAN PENGAJUAN PROPOSAL PELATIHAN
// // // // // =======================================================================================


// // // // 'use client';

// // // // import { useState, useRef, useEffect } from 'react';
// // // // import { 
// // // //     X, Upload, Plus, Trash2, Save, Calendar, 
// // // //     Video, Image as ImageIcon, Users, FileText, 
// // // //     CheckCircle, AlertCircle, Award, Clock, Search, 
// // // //     Download, File, Loader2, UserPlus, 
// // // //     ShieldCheck, CheckSquare, Building, MapPin, Lock
// // // // } from 'lucide-react';
// // // // import { api, apiUpload } from '@/lib/api'; 
// // // // import { getProvinces, getRegencies } from '@/lib/indonesia';
// // // // import dynamic from 'next/dynamic';
// // // // import 'react-quill/dist/quill.snow.css';
// // // // import axios from 'axios'; 
// // // // import BaseModal from '@/components/ui/BaseModal'; 

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
    
// // // //     // Refs
// // // //     const fileInputRef = useRef<HTMLInputElement>(null); 
// // // //     const templateInputRef = useRef<HTMLInputElement>(null); 
    
// // // //     // State Search & Users
// // // //     const [searchFacilitator, setSearchFacilitator] = useState('');
// // // //     const [searchPic, setSearchPic] = useState('');
// // // //     const [allUsers, setAllUsers] = useState<any[]>([]);
    
// // // //     // State Disclaimer Popup
// // // //     const [showDisclaimer, setShowDisclaimer] = useState(false);
// // // //     const [isAgreed, setIsAgreed] = useState(false);

// // // //     // [FIX TAB 3] State Pelaksana & Wilayah (Hanya untuk Display / Read Only jika sudah ada)
// // // //     const [organizerDisplay, setOrganizerDisplay] = useState('');
// // // //     const [regionDisplay, setRegionDisplay] = useState('');
    
// // // //     const [cmsCategories, setCmsCategories] = useState<string[]>([]);

// // // //     // State UI Tambahan
// // // //     const [newFacility, setNewFacility] = useState('');
// // // //     const [uploadingCover, setUploadingCover] = useState(false);
// // // //     const [uploadingTemplate, setUploadingTemplate] = useState(false);

// // // //     // --- INITIAL STATE ---
// // // //     const defaultState = {
// // // //         title: '', description: '', 
// // // //         programType: 'training', 
// // // //         hasCertificate: true,
        
// // // //         regIsForever: false, regStartDate: '', regEndDate: '',
// // // //         execIsForever: false, execStartDate: '', execEndDate: '',
        
// // // //         thumbnailUrl: '', promoVideoUrl: '',
        
// // // //         registrationMethod: 'auto', 
// // // //         requireDocs: true, 
// // // //         registrationTemplates: [] as any[], 
        
// // // //         price: 0, estimatedDuration: 0, totalJp: 0, 
// // // //         facilities: [] as string[], 
// // // //         facilitatorIds: [] as string[],
// // // //         pics: [] as any[], 
        
// // // //         creatorInfo: null as any,
// // // //         contactName: '', contactPhone: '', contactEmail: ''
// // // //     };

// // // //     const [formData, setFormData] = useState(defaultState);

// // // //     const getLocalDisplayUrl = (url: string) => {
// // // //         if (!url) return '';
// // // //         if (url.startsWith('http')) return url;
// // // //         const cleanPath = url.startsWith('/') ? url : `/${url}`;
// // // //         return `${API_BASE_URL}${cleanPath}`;
// // // //     };

// // // //     // --- LOAD DATA AWAL ---
// // // //     useEffect(() => {
// // // //         api('/api/content').then(res => {
// // // //             if (res && res.organizerCategories) setCmsCategories(res.organizerCategories);
// // // //         }).catch(() => {});
        
// // // //         api('/api/users').then(res => setAllUsers(res.users || [])).catch(() => setAllUsers(facilitators));
// // // //     }, []);

// // // //     useEffect(() => {
// // // //         const initData = async () => {
// // // //             if (course && course._id) {
// // // //                 setFetchingDetail(true);
// // // //                 try {
// // // //                     const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
// // // //                     const fullData = res.course || res.data || res;
// // // //                     populateForm(fullData);
// // // //                 } catch (e) {
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
// // // //                       }));
// // // //                 }
// // // //             }
// // // //         };
// // // //         initData();
// // // //     }, [course]);

// // // //     const populateForm = (data: any) => {
// // // //         const formatDate = (d: string) => {
// // // //             if (!d) return '';
// // // //             try { return new Date(d).toISOString().split('T')[0]; } catch (e) { return ''; }
// // // //         };

// // // //         let initialPics = Array.isArray(data.pics) ? data.pics : [];
// // // //         if (Array.isArray(data.picIds) && data.picIds.length > 0) {
// // // //             initialPics = data.picIds.map((p: any) => ({
// // // //                 id: p._id || p.id,
// // // //                 name: p.name,
// // // //                 email: p.email,
// // // //                 role: p.role,
// // // //                 avatarUrl: p.avatarUrl
// // // //             }));
// // // //         }

// // // //         setFormData({
// // // //             title: data.title || '', description: data.description || '', 
// // // //             programType: data.programType || 'training', 
// // // //             hasCertificate: data.hasCertificate ?? true,
            
// // // //             regIsForever: data.registrationPeriod?.isForever ?? false,
// // // //             regStartDate: formatDate(data.registrationPeriod?.startDate),
// // // //             regEndDate: formatDate(data.registrationPeriod?.endDate),

// // // //             execIsForever: data.executionPeriod?.isForever ?? false,
// // // //             execStartDate: formatDate(data.executionPeriod?.startDate),
// // // //             execEndDate: formatDate(data.executionPeriod?.endDate),

// // // //             thumbnailUrl: data.thumbnailUrl || '', promoVideoUrl: data.promoVideoUrl || '',

// // // //             registrationMethod: data.registrationMethod || 'auto',
// // // //             requireDocs: data.registrationConfig?.requireDocs !== false,
// // // //             registrationTemplates: Array.isArray(data.registrationConfig?.templates) ? data.registrationConfig.templates : [],

// // // //             price: Number(data.price) || 0, 
// // // //             estimatedDuration: Number(data.estimatedDuration) || 0, 
// // // //             totalJp: Number(data.totalJp) || 0,
            
// // // //             facilities: Array.isArray(data.facilities) ? data.facilities : [],
// // // //             facilitatorIds: Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [],
// // // //             pics: initialPics, 
            
// // // //             creatorInfo: data.creatorInfo || null,
// // // //             contactName: data.contact?.name || data.creatorInfo?.name || '',
// // // //             contactEmail: data.contact?.email || data.creatorInfo?.email || '',
// // // //             contactPhone: data.contact?.phone || data.creatorInfo?.contact || ''
// // // //         });

// // // //         // [FIX TAB 3] SET PELAKSANA & WILAYAH (READ ONLY DARI DATABASE)
// // // //         // Kita ambil langsung string yang sudah tersimpan saat proposal dibuat
// // // //         // Tidak perlu parsing ulang logic provinsi/kota yang rumit, cukup tampilkan apa adanya.
// // // //         if (data.organizer) {
// // // //             setOrganizerDisplay(data.organizer);
// // // //         } else {
// // // //             setOrganizerDisplay('PMI Pusat'); // Default fallback
// // // //         }

// // // //         // Set Region Code Display (Optional, untuk info tambahan)
// // // //         if (data.regionCode && data.regionCode !== 'national') {
// // // //             setRegionDisplay(`Kode Wilayah: ${data.regionCode}`);
// // // //         } else {
// // // //             setRegionDisplay('Tingkat Nasional');
// // // //         }
// // // //     }

// // // //     // --- HANDLERS ---
// // // //     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
// // // //     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
// // // //     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };
// // // //     const toggleFacilitator = (id: string) => {
// // // //         const current = formData.facilitatorIds;
// // // //         setFormData(prev => ({ ...prev, facilitatorIds: current.includes(id) ? current.filter(fid => fid !== id) : [...current, id] }));
// // // //     };

// // // //     const handleAddPicFromSearch = (user: any) => {
// // // //         if (formData.pics.length >= 3) return alert("Maksimal 3 PIC Tambahan");
// // // //         if (formData.pics.some((p: any) => p.email === user.email)) return alert("User ini sudah ditambahkan.");

// // // //         const newPic = {
// // // //             id: user._id || user.id,
// // // //             name: user.name,
// // // //             pmiStatus: user.role, 
// // // //             email: user.email,
// // // //             avatarUrl: user.avatarUrl
// // // //         };
// // // //         setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
// // // //         setSearchPic('');
// // // //     };

// // // //     const removePic = (idx: number) => { setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); };
    
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

// // // //     const handlePreSubmit = () => {
// // // //         if (!formData.title) return alert("Judul wajib diisi!");
// // // //         setShowDisclaimer(true);
// // // //     };

// // // //     const handleFinalSubmit = async () => {
// // // //         if (!isAgreed) return alert("Mohon setujui pernyataan disclaimer.");
        
// // // //         setLoading(true);
// // // //         try {
// // // //             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
// // // //             const picIds = validPics.map((p: any) => p.id || p._id).filter((id: any) => id);

// // // //             const parseDate = (d: string) => d ? new Date(d) : null;

// // // //             // [FIX] Kita TIDAK mengubah organizer di sini.
// // // //             // Kita kirimkan nilai organizer yang lama agar tidak tertimpa/berubah.
// // // //             // Atau backend bisa di-set agar ignore field organizer saat update jika tidak dikirim.
// // // //             // Di sini kita kirim organizerDisplay yang sudah di-load dari DB.
            
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
                
// // // //                 // Organizer tetap menggunakan yang lama
// // // //                 organizer: organizerDisplay, 

// // // //                 registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
// // // //                 executionPeriod: { isForever: formData.execIsForever, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
// // // //                 registrationMethod: formData.registrationMethod,
                
// // // //                 registrationConfig: { 
// // // //                     requireDocs: formData.requireDocs, 
// // // //                     templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) 
// // // //                 },
                
// // // //                 facilities: formData.facilities,
// // // //                 facilitatorIds: formData.facilitatorIds,
                
// // // //                 pics: validPics,
// // // //                 picIds: picIds, 

// // // //                 creatorInfo: formData.creatorInfo,
// // // //                 contact: {
// // // //                     name: formData.contactName,
// // // //                     email: formData.contactEmail,
// // // //                     phone: formData.contactPhone
// // // //                 }
// // // //             };

// // // //             if (course?._id) await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
// // // //             else await api('/api/courses', { method: 'POST', body: payload });

// // // //             alert("Berhasil disimpan!");
// // // //             onSuccess();
// // // //         } catch (err: any) {
// // // //             console.error(err);
// // // //             alert("Gagal: " + (err.response?.data?.message || err.message));
// // // //         } finally {
// // // //             setLoading(false);
// // // //             setShowDisclaimer(false);
// // // //         }
// // // //     };

// // // //     const handleAdminApproveContent = async () => {
// // // //         if(!confirm("Apakah Anda yakin konten pelatihan ini sudah lengkap dan SIAP UNTUK DIPUBLISH oleh Pengaju?")) return;
        
// // // //         setLoading(true);
// // // //         try {
// // // //             await api(`/api/courses/${course._id}`, { 
// // // //                 method: 'PATCH', 
// // // //                 body: { status: 'ready' } 
// // // //             });
            
// // // //             alert("✅ Konten disetujui! Status pelatihan sekarang: SIAP PUBLISH.\nPengaju sekarang bisa melihat tombol Publish di dashboard mereka.");
// // // //             onSuccess();
// // // //             onClose();
// // // //         } catch (err: any) {
// // // //             console.error(err);
// // // //             alert("Gagal mengubah status: " + err.message);
// // // //         } finally {
// // // //             setLoading(false);
// // // //         }
// // // //     };

// // // //     const selectedFacilitators = facilitators.filter(f => formData.facilitatorIds.includes(f.id || f._id));
// // // //     const availableFacilitators = facilitators.filter(f => !formData.facilitatorIds.includes(f.id || f._id) && (f.name?.toLowerCase().includes(searchFacilitator.toLowerCase()) || f.email?.toLowerCase().includes(searchFacilitator.toLowerCase())));
// // // //     const filteredPicCandidates = allUsers.filter(u => ((u.name || '').toLowerCase().includes(searchPic.toLowerCase()) || (u.email || '').toLowerCase().includes(searchPic.toLowerCase())) && !formData.pics.some((p: any) => p.email === u.email));
    
// // // //     const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN' || currentUser?.permissions?.includes('manage_courses');
// // // //     const isDraftStatus = course?.status === 'draft';

// // // //     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><Loader2 className="animate-spin text-white"/></div>;

// // // //     const footerButtons = (
// // // //         <>
// // // //             <div className="flex-1 text-xs text-gray-500 hidden md:block text-left">
// // // //                 Status saat ini: <span className="font-bold uppercase">{course?.status || 'Baru'}</span>
// // // //             </div>
// // // //             <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50">Batal</button>
            
// // // //             {isSuperAdmin && isDraftStatus && course?._id && (
// // // //                 <button 
// // // //                     onClick={handleAdminApproveContent} 
// // // //                     disabled={loading}
// // // //                     className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-md flex items-center gap-2"
// // // //                 >
// // // //                     {loading ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18}/>}
// // // //                     Setujui Konten
// // // //                 </button>
// // // //             )}

// // // //             <button onClick={handlePreSubmit} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] shadow-lg flex items-center gap-2 disabled:opacity-50">
// // // //                 {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} 
// // // //                 Simpan Perubahan
// // // //             </button>
// // // //         </>
// // // //     );

// // // //     return (
// // // //         <BaseModal
// // // //             isOpen={true}
// // // //             onClose={onClose}
// // // //             title={course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}
// // // //             subTitle={isDraftStatus && isSuperAdmin ? 'Review Kelengkapan Materi Pelatihan' : 'Lengkapi data pelatihan.'}
// // // //             size="full" 
// // // //             footer={footerButtons}
// // // //         >
// // // //             {/* TABS MENU */}
// // // //             <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0 mb-6 -mx-6 px-6 pt-2">
// // // //                 {[{ id: 'info', label: '1. Informasi Dasar', icon: FileText }, { id: 'media', label: '2. Media & Visual', icon: ImageIcon }, { id: 'registration', label: '3. Jadwal & Pelaksana', icon: Calendar }, { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award }, { id: 'team', label: '5. Tim & PIC', icon: Users }].map((tab) => (
// // // //                     <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
// // // //                         <tab.icon size={16} /> {tab.label}
// // // //                     </button>
// // // //                 ))}
// // // //             </div>

// // // //             {/* TAB 1: INFO */}
// // // //             {activeTab === 'info' && (
// // // //                 <div className="space-y-6 max-w-4xl mx-auto">
// // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="inpTitle">Judul Pelatihan <span className="text-red-500">*</span></label><input id="inpTitle" required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: Orientasi Kepalangmerahan" value={formData.title} onChange={e => handleChange('title', e.target.value)} aria-label="Judul"/></div>
// // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap <span className="text-red-500">*</span></label><div className="bg-white border rounded-lg overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" aria-label="Deskripsi" /></div></div>
// // // //                     </div>

// // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8">
// // // //                         <div>
// // // //                             <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label>
// // // //                             <div className="flex gap-4">
// // // //                                 <div onClick={() => handleChange('programType', 'training')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'training' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// // // //                                     <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'training' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'training' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// // // //                                     <span className="text-sm text-gray-700 font-medium">Diklat Resmi</span>
// // // //                                 </div>
// // // //                                 <div onClick={() => handleChange('programType', 'course')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-all ${formData.programType === 'course' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}>
// // // //                                     <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'course' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'course' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div>
// // // //                                     <span className="text-sm text-gray-700 font-medium">Kursus Mandiri</span>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                         <div className="w-px bg-gray-200"></div>
// // // //                         <div className="flex items-center gap-3">
// // // //                             <div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none">
// // // //                                 <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div>
// // // //                                 <span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             )}

// // // //             {/* TAB 2: MEDIA */}
// // // //             {activeTab === 'media' && (
// // // //                 <div className="max-w-3xl mx-auto space-y-6">
// // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                         <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) <span className="text-red-500">*</span></label>
// // // //                         <div className="flex gap-6 items-start">
// // // //                             <div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
// // // //                                 {formData.thumbnailUrl ? <img src={getLocalDisplayUrl(formData.thumbnailUrl)} alt="Preview Cover" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1" /><span className="text-xs">Belum ada gambar</span></div>}
// // // //                                 {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
// // // //                             </div>
// // // //                             <div className="flex-1">
// // // //                                 <p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p>
// // // //                                 <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" title="Input Gambar" aria-label="Input Gambar"/>
// // // //                                 <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2" title="Upload Gambar"><Upload size={16}/> Upload Gambar</button>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                         <label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label>
// // // //                         <div className="flex gap-2"><div className="p-3 bg-gray-100 rounded-l-lg border border-r-0 text-gray-500"><Video size={18}/></div><input type="text" className="flex-1 p-2.5 border rounded-r-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} aria-label="URL Video Youtube" /></div>
// // // //                     </div>
// // // //                 </div>
// // // //             )}

// // // //             {/* TAB 3: JADWAL & PELAKSANA */}
// // // //             {activeTab === 'registration' && (
// // // //                 <div className="max-w-4xl mx-auto space-y-6">
// // // //                     {/* Jadwal */}
// // // //                     <div className="grid grid-cols-2 gap-6">
// // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // //                             <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label>
// // // //                             <div className="flex items-center gap-2 mb-2">
// // // //                                 <div onClick={() => handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// // // //                                     <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // //                                     <span className="text-sm text-gray-600">Buka Selamanya</span>
// // // //                                 </div>
// // // //                             </div>
// // // //                             {!formData.regIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} title="Mulai Pendaftaran" aria-label="Mulai Pendaftaran"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} title="Selesai Pendaftaran" aria-label="Selesai Pendaftaran"/></div></div>)}
// // // //                         </div>
// // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
// // // //                             <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label>
// // // //                             <div className="flex items-center gap-2 mb-2">
// // // //                                 <div onClick={() => handleChange('execIsForever', !formData.execIsForever)} className="flex items-center gap-2 cursor-pointer select-none">
// // // //                                     <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.execIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // //                                     <span className="text-sm text-gray-600">Fleksibel</span>
// // // //                                 </div>
// // // //                             </div>
// // // //                             {!formData.execIsForever && (<div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2"><div><span className="text-xs text-gray-500 block mb-1">Mulai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} aria-label="Pelaksanaan Mulai"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai <span className="text-red-500">*</span></span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} aria-label="Pelaksanaan Selesai"/></div></div>)}
// // // //                         </div>
// // // //                     </div>

// // // //                     {/* [FIX] PELAKSANA (READ ONLY / LOCKED) */}
// // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 relative overflow-hidden">
// // // //                         {/* Overlay Lock untuk Visual */}
// // // //                         <div className="absolute top-0 right-0 p-4">
// // // //                             <Lock className="text-gray-300" size={20}/>
// // // //                         </div>

// // // //                         <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan <span className="text-red-500">*</span></label>
                        
// // // //                         <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
// // // //                             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Wilayah / Organizer</p>
// // // //                             <h3 className="text-lg font-bold text-gray-800">{organizerDisplay}</h3>
// // // //                             <p className="text-xs text-gray-500 mt-1">{regionDisplay}</p>
// // // //                         </div>
                        
// // // //                         <p className="text-[10px] text-orange-600 flex items-center gap-1 bg-orange-50 p-2 rounded">
// // // //                             <AlertCircle size={12}/> Pelaksana sudah ditentukan saat pengajuan dan tidak dapat diubah di sini.
// // // //                         </p>
// // // //                     </div>
                    
// // // //                     {/* Metode Pendaftaran */}
// // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                         <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Metode Penerimaan Peserta</h3>
// // // //                         <div className="space-y-4">
// // // //                                 <div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'auto' ? 'bg-green-50 border-green-200 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'auto' ? 'border-green-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'auto' && <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Otomatis (Langsung Aktif)</span><span className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</span></div></div>
// // // //                                 <div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${formData.registrationMethod === 'manual' ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}><div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${formData.registrationMethod === 'manual' ? 'border-yellow-600' : 'border-gray-400'}`}>{formData.registrationMethod === 'manual' && <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full"></div>}</div><div><span className="block font-bold text-gray-800 text-sm mb-1">Manual (Verifikasi Admin)</span><span className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</span></div></div>
// // // //                         </div>
// // // //                     </div>

// // // //                     {/* Dokumen Persyaratan */}
// // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                         <div className="flex justify-between items-start mb-4">
// // // //                             <div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div>
// // // //                             <div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer">
// // // //                                 <div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div>
// // // //                                 <span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span>
// // // //                             </div>
// // // //                         </div>
// // // //                         {formData.requireDocs && (
// // // //                             <div className="space-y-3">
// // // //                                 <div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} title="Input Template" aria-label="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50" aria-label="Upload Template"><Upload size={14}/> Upload Template Baru</button></div>
// // // //                                 {formData.registrationTemplates.map((item: any, idx: number) => (
// // // //                                     <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
// // // //                                         <div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div>
// // // //                                         <div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} aria-label="Nama Dokumen"/><a href={getLocalDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()} aria-label="Download File"><Download size={10} /> Lihat File Uploaded</a></div>
// // // //                                         <button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" aria-label="Hapus Dokumen"><Trash2 size={16} /></button>
// // // //                                     </div>
// // // //                                 ))}
// // // //                             </div>
// // // //                         )}
// // // //                     </div>
// // // //                 </div>
// // // //             )}

// // // //             {/* TAB 4: FASILITAS */}
// // // //             {activeTab === 'facilities' && (
// // // //                 <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
// // // //                     <div className="space-y-6">
// // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" aria-label="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div>
// // // //                         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.estimatedDuration} disabled aria-label="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.totalJp} disabled aria-label="Total JP"/></div></div></div>
// // // //                     </div>
// // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas <span className="text-red-500">*</span></label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFacility())} aria-label="Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" aria-label="Tambah Fasilitas"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" aria-label="Hapus Fasilitas"><X size={14}/></button></div>))}</div></div>
// // // //                 </div>
// // // //             )}

// // // //             {/* TAB 5: TIM & PIC */}
// // // //             {activeTab === 'team' && (
// // // //                 <div className="max-w-4xl mx-auto space-y-8">
// // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
// // // //                         <p className="text-xs text-gray-500 mb-4">*Mencakup Admin, Superadmin, dan Fasilitator.</p>
                        
// // // //                         <div className="mb-4 space-y-2">
// // // //                             {selectedFacilitators.map(fac => (
// // // //                                 <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100 animate-in slide-in-from-top-1">
// // // //                                     <div className="flex items-center gap-3">
// // // //                                         <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-xs border border-red-200">{fac.name?.charAt(0)}</div>
// // // //                                         <div><span className="text-sm font-bold text-red-900 block">{fac.name}</span><span className="text-[10px] text-red-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full w-fit border border-red-100"><Clock size={10}/> Menunggu Persetujuan</span></div>
// // // //                                     </div>
// // // //                                     <button type="button" onClick={() => toggleFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus" aria-label="Hapus"><X size={14}/></button>
// // // //                                 </div>
// // // //                             ))}
// // // //                         </div>

// // // //                         <div className="relative">
// // // //                             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // //                             <input type="text" placeholder="Cari nama atau email..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchFacilitator} onChange={(e) => setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator"/>
// // // //                             {searchFacilitator && (
// // // //                                 <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// // // //                                     {availableFacilitators.length > 0 ? availableFacilitators.map(fac => (
// // // //                                         <button key={fac._id || fac.id} type="button" onClick={() => { toggleFacilitator(fac._id || fac.id); setSearchFacilitator(''); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// // // //                                             <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{fac.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{fac.name}</p><p className="text-[10px] text-gray-400">{fac.email} • {fac.role}</p></div></div><Plus size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // // //                                         </button>
// // // //                                     )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // // //                                 </div>
// // // //                             )}
// // // //                         </div>
// // // //                     </div>
                    
// // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
                        
// // // //                         <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
// // // //                             <div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div>
// // // //                             <div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div>
// // // //                         </div>

// // // //                         <div className="space-y-2 mb-4">
// // // //                             <label className="text-sm font-bold text-gray-700 block">Daftar PIC Tambahan (Maks 3)</label>
// // // //                             {formData.pics.map((pic: any, idx: number) => (
// // // //                                 <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in slide-in-from-top-1">
// // // //                                     <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">{pic.name?.charAt(0)}</div><div><span className="text-sm font-bold text-blue-900 block">{pic.name}</span><div className="flex gap-2"><span className="text-[10px] text-blue-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full border border-blue-100"><Clock size={10}/> Menunggu Persetujuan</span><span className="text-[10px] text-gray-500">{pic.email}</span></div></div></div><button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
// // // //                                 </div>
// // // //                             ))}
// // // //                         </div>

// // // //                         {formData.pics.length < 3 ? (
// // // //                             <div className="relative">
// // // //                                 <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // // //                                 <input type="text" placeholder="Cari user untuk dijadikan PIC..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchPic} onChange={(e) => setSearchPic(e.target.value)} aria-label="Cari PIC"/>
// // // //                                 {searchPic && (
// // // //                                     <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-52 overflow-y-auto z-20">
// // // //                                         {filteredPicCandidates.length > 0 ? filteredPicCandidates.map(user => (
// // // //                                             <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0 flex items-center justify-between group">
// // // //                                                 <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div></div><UserPlus size={16} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // // //                                             </button>
// // // //                                         )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // // //                                     </div>
// // // //                                 )}
// // // //                             </div>
// // // //                         ) : <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 rounded-lg border border-gray-200">Kuota PIC penuh (Maksimal 3).</div>}
// // // //                     </div>

// // // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // // //                         <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckSquare size={18}/> Kontak Utama (Landing Page)</h3></div>
// // // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                             <div><label className="text-xs font-bold text-gray-500">Nama Kontak <span className="text-red-500">*</span></label><input name="contactName" value={formData.contactName} onChange={(e) => handleChange('contactName', e.target.value)} className="w-full p-2 border rounded" aria-label="Nama Kontak" /></div>
// // // //                             <div><label className="text-xs font-bold text-gray-500">Email Kontak <span className="text-red-500">*</span></label><input name="contactEmail" value={formData.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} className="w-full p-2 border rounded" aria-label="Email Kontak" /></div>
// // // //                             <div className="md:col-span-2"><label className="text-xs font-bold text-gray-500">Nomor Telepon/WA <span className="text-red-500">*</span></label><input name="contactPhone" value={formData.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} className="w-full p-2 border rounded" placeholder="628..." aria-label="Telepon Kontak" /></div>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             )}

// // // //             {/* DISCLAIMER POPUP */}
// // // //             {showDisclaimer && (
// // // //                 <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in">
// // // //                     <div className="absolute inset-0 bg-black/80"></div>
// // // //                     <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 text-center space-y-4">
// // // //                         <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2"><ShieldCheck size={32} className="text-orange-600"/></div>
// // // //                         <h3 className="text-xl font-bold text-gray-900">Pernyataan Disclaimer</h3>
// // // //                         <p className="text-sm text-gray-500 leading-relaxed">Saya menyatakan bahwa data pelatihan ini benar dan bertanggung jawab atas konten yang disajikan.</p>
                        
// // // //                         <label className="flex items-center justify-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors">
// // // //                             <input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} className="w-5 h-5 accent-orange-600" aria-label="Setuju"/>
// // // //                             <span className="font-bold text-sm text-orange-800">Saya Setuju & Lanjutkan</span>
// // // //                         </label>

// // // //                         <div className="flex gap-3 pt-2">
// // // //                             <button onClick={() => setShowDisclaimer(false)} className="flex-1 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50">Kembali</button>
// // // //                             <button onClick={handleFinalSubmit} disabled={!isAgreed || loading} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
// // // //                                 {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Proses Simpan
// // // //                             </button>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             )}
// // // //         </BaseModal>
// // // //     );
// // // // }


// // // // // // =======================================================================================
// // // // // // 1. PERBAIKAN LOKASI PELAKSANAAN AMBIL DARI LOKASI PELAKSANAAN PENGAJUAN PROPOSAL PELATIHAN
// // // // // // 2. PERBAIKAN PEMILIHAN TIM FASILITATOR
// // // // // // =======================================================================================


// // // 'use client';

// // // import { useState, useRef, useEffect } from 'react';
// // // import { 
// // //     X, Upload, Plus, Trash2, Save, Calendar, 
// // //     Video, Image as ImageIcon, Users, FileText, 
// // //     CheckCircle, AlertCircle, Award, Clock, Search, 
// // //     Download, File, Loader2, UserPlus, 
// // //     ShieldCheck, CheckSquare, Building, MapPin, Lock, Mail, Phone
// // // } from 'lucide-react';
// // // import { api, apiUpload } from '@/lib/api'; 
// // // import dynamic from 'next/dynamic';
// // // import 'react-quill/dist/quill.snow.css';
// // // import axios from 'axios'; 
// // // import BaseModal from '@/components/ui/BaseModal'; 

// // // const ReactQuill = dynamic(() => import('react-quill'), { 
// // //     ssr: false,
// // //     loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Editor...</div>
// // // });

// // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // interface CourseFormModalProps {
// // //     course?: any; 
// // //     onClose: () => void;
// // //     onSuccess: () => void;
// // //     facilitators: any[]; 
// // //     currentUser: any; 
// // // }

// // // export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
// // //     const [activeTab, setActiveTab] = useState('info');
// // //     const [loading, setLoading] = useState(false);
// // //     const [fetchingDetail, setFetchingDetail] = useState(false);
    
// // //     // Refs
// // //     const fileInputRef = useRef<HTMLInputElement>(null); 
// // //     const templateInputRef = useRef<HTMLInputElement>(null); 
    
// // //     // State Search
// // //     const [searchFacilitator, setSearchFacilitator] = useState('');
// // //     const [searchPic, setSearchPic] = useState('');
    
// // //     // Data User System (Untuk Pencarian)
// // //     const [allSystemUsers, setAllSystemUsers] = useState<any[]>([]);
    
// // //     // State UI
// // //     const [showDisclaimer, setShowDisclaimer] = useState(false);
// // //     const [isAgreed, setIsAgreed] = useState(false);
// // //     const [newFacility, setNewFacility] = useState('');
// // //     const [uploadingCover, setUploadingCover] = useState(false);
// // //     const [uploadingTemplate, setUploadingTemplate] = useState(false);
    
// // //     // State Display (Read Only untuk Tab 3)
// // //     const [organizerDisplay, setOrganizerDisplay] = useState('');
// // //     const [regionCodeDisplay, setRegionCodeDisplay] = useState('');

// // //     // List Terpilih
// // //     const [selectedFacilitatorsList, setSelectedFacilitatorsList] = useState<any[]>([]);

// // //     // --- INITIAL STATE ---
// // //     const defaultState = {
// // //         title: '', description: '', 
// // //         programType: 'training', 
// // //         hasCertificate: true,
// // //         regIsForever: false, regStartDate: '', regEndDate: '',
// // //         execIsForever: false, execStartDate: '', execEndDate: '',
// // //         thumbnailUrl: '', promoVideoUrl: '',
// // //         registrationMethod: 'auto', 
// // //         requireDocs: true, 
// // //         registrationTemplates: [] as any[], 
// // //         price: 0, estimatedDuration: 0, totalJp: 0, 
// // //         facilities: [] as string[], 
// // //         facilitatorIds: [] as string[],
// // //         pics: [] as any[], 
// // //         creatorInfo: null as any,
// // //         contactName: '', contactPhone: '', contactEmail: ''
// // //     };

// // //     const [formData, setFormData] = useState(defaultState);

// // //     const getLocalDisplayUrl = (url: string) => {
// // //         if (!url) return '';
// // //         if (url.startsWith('http')) return url;
// // //         const cleanPath = url.startsWith('/') ? url : `/${url}`;
// // //         return `${API_BASE_URL}${cleanPath}`;
// // //     };

// // //     // --- LOAD ALL USERS (Untuk Pencarian) ---
// // //     useEffect(() => {
// // //         const loadUsers = async () => {
// // //             try {
// // //                 // Coba endpoint admin (jika sudah dibuka aksesnya)
// // //                 const res = await api('/api/admin/users?limit=3000').catch(() => null);
                
// // //                 let users = [];
// // //                 if (res && res.users) users = res.users;
// // //                 else if (res && Array.isArray(res)) users = res;
// // //                 else if (facilitators) users = facilitators; // Fallback

// // //                 setAllSystemUsers(users);
// // //             } catch (e) {
// // //                 console.error("Gagal load users:", e);
// // //                 setAllSystemUsers(facilitators || []);
// // //             }
// // //         };
// // //         loadUsers();
// // //     }, [facilitators]);

// // //     // --- LOAD DETAIL COURSE ---
// // //     useEffect(() => {
// // //         const initData = async () => {
// // //             if (course && course._id) {
// // //                 setFetchingDetail(true);
// // //                 try {
// // //                     const res = await api(`/api/courses/${course._id}?t=${Date.now()}`);
// // //                     const fullData = res.course || res.data || res;
// // //                     populateForm(fullData);
// // //                 } catch (e) {
// // //                     populateForm(course);
// // //                 } finally {
// // //                     setFetchingDetail(false);
// // //                 }
// // //             } else {
// // //                 // Mode Create
// // //                 if (currentUser) {
// // //                      setFormData(prev => ({
// // //                         ...prev,
// // //                         contactName: currentUser.name,
// // //                         contactEmail: currentUser.email,
// // //                         contactPhone: currentUser.phoneNumber || ''
// // //                       }));
// // //                      // Set default dari user login jika baru buat
// // //                      const org = currentUser.role === 'SUPER_ADMIN' ? 'PMI Pusat' : (currentUser.organizer || 'PMI Wilayah');
// // //                      setOrganizerDisplay(org);
// // //                      setRegionCodeDisplay('Menunggu Proposal');
// // //                 }
// // //             }
// // //         };
// // //         initData();
// // //     }, [course]);

// // //     const populateForm = (data: any) => {
// // //         const formatDate = (d: string) => {
// // //             if (!d) return '';
// // //             try { return new Date(d).toISOString().split('T')[0]; } catch (e) { return ''; }
// // //         };

// // //         // Populate PICs
// // //         let initialPics = Array.isArray(data.pics) ? data.pics : [];
// // //         if (Array.isArray(data.picIds) && data.picIds.length > 0) {
// // //             initialPics = data.picIds.map((p: any) => ({
// // //                 id: p._id || p.id,
// // //                 name: p.name,
// // //                 email: p.email,
// // //                 role: p.role,
// // //                 avatarUrl: p.avatarUrl
// // //             }));
// // //         }

// // //         // Populate Facilitators
// // //         const facIds = Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [];
        
// // //         let initialSelectedFacs: any[] = [];
// // //         if (data.facilitatorIds && data.facilitatorIds.length > 0 && typeof data.facilitatorIds[0] === 'object') {
// // //              initialSelectedFacs = data.facilitatorIds;
// // //         }
// // //         setSelectedFacilitatorsList(initialSelectedFacs);

// // //         setFormData({
// // //             title: data.title || '', description: data.description || '', 
// // //             programType: data.programType || 'training', 
// // //             hasCertificate: data.hasCertificate ?? true,
// // //             regIsForever: data.registrationPeriod?.isForever ?? false,
// // //             regStartDate: formatDate(data.registrationPeriod?.startDate),
// // //             regEndDate: formatDate(data.registrationPeriod?.endDate),
// // //             execIsForever: data.executionPeriod?.isForever ?? false,
// // //             execStartDate: formatDate(data.executionPeriod?.startDate),
// // //             execEndDate: formatDate(data.executionPeriod?.endDate),
// // //             thumbnailUrl: data.thumbnailUrl || '', promoVideoUrl: data.promoVideoUrl || '',
// // //             registrationMethod: data.registrationMethod || 'auto',
// // //             requireDocs: data.registrationConfig?.requireDocs !== false,
// // //             registrationTemplates: Array.isArray(data.registrationConfig?.templates) ? data.registrationConfig.templates : [],
// // //             price: Number(data.price) || 0, 
// // //             estimatedDuration: Number(data.estimatedDuration) || 0, 
// // //             totalJp: Number(data.totalJp) || 0,
// // //             facilities: Array.isArray(data.facilities) ? data.facilities : [],
// // //             facilitatorIds: facIds,
// // //             pics: initialPics, 
// // //             creatorInfo: data.creatorInfo || null,
// // //             contactName: data.contact?.name || data.creatorInfo?.name || '',
// // //             contactEmail: data.contact?.email || data.creatorInfo?.email || '',
// // //             contactPhone: data.contact?.phone || data.creatorInfo?.contact || ''
// // //         });

// // //         // [FIX LABEL WILAYAH]
// // //         setOrganizerDisplay(data.organizer || 'PMI Pusat');
// // //         setRegionCodeDisplay(data.regionCode || 'Nasional');
// // //     }

// // //     // Effect: Sync Selected Facilitators from All Users
// // //     useEffect(() => {
// // //         if (allSystemUsers.length > 0 && formData.facilitatorIds.length > 0) {
// // //             const matched = allSystemUsers.filter(u => formData.facilitatorIds.includes(u._id || u.id));
// // //             const map = new Map();
// // //             [...selectedFacilitatorsList, ...matched].forEach(u => map.set(u._id || u.id, u));
// // //             setSelectedFacilitatorsList(Array.from(map.values()));
// // //         }
// // //     }, [allSystemUsers]);

// // //     // --- HANDLERS ---
// // //     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
// // //     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
// // //     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };

// // //     const addFacilitator = (user: any) => {
// // //         const uid = user._id || user.id;
// // //         if (formData.facilitatorIds.includes(uid)) return;
// // //         setFormData(prev => ({ ...prev, facilitatorIds: [...prev.facilitatorIds, uid] }));
// // //         setSelectedFacilitatorsList(prev => [...prev, user]);
// // //         setSearchFacilitator(''); 
// // //     };

// // //     const removeFacilitator = (uid: string) => {
// // //         setFormData(prev => ({ ...prev, facilitatorIds: prev.facilitatorIds.filter(id => id !== uid) }));
// // //         setSelectedFacilitatorsList(prev => prev.filter(u => (u._id || u.id) !== uid));
// // //     };

// // //     const handleAddPicFromSearch = (user: any) => {
// // //         if (formData.pics.length >= 3) return alert("Maksimal 3 PIC Tambahan");
// // //         if (formData.pics.some((p: any) => p.email === user.email)) return alert("User ini sudah ditambahkan.");

// // //         const newPic = {
// // //             id: user._id || user.id,
// // //             name: user.name,
// // //             pmiStatus: user.role, 
// // //             email: user.email,
// // //             avatarUrl: user.avatarUrl
// // //         };
// // //         setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
// // //         setSearchPic('');
// // //     };

// // //     const removePic = (idx: number) => { setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); };
    
// // //     // Upload Handlers
// // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // //         const file = e.target.files?.[0]; if (!file) return;
// // //         try {
// // //             setUploadingCover(true); const fd = new FormData(); fd.append('file', file);
// // //             const res = await apiUpload('/api/upload', fd); 
// // //             const url = res.url || res.file?.url || res.data?.url;
// // //             if (url) handleChange('thumbnailUrl', url);
// // //         } catch (err: any) { alert('Gagal: ' + err.message); } finally { setUploadingCover(false); }
// // //     };

// // //     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // //         const file = e.target.files?.[0]; if (!file) return;
// // //         setUploadingTemplate(true);
// // //         try {
// // //             const fd = new FormData(); fd.append('file', file);
// // //             const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
// // //             const token = userStr ? JSON.parse(userStr).token : '';
// // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }, withCredentials: true });
// // //             const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url;
// // //             if (!rawUrl) throw new Error("Gagal dapat URL.");
// // //             setFormData(prev => ({ ...prev, registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }] }));
// // //         } catch (err: any) { console.error(err); alert('Upload Gagal: ' + (err.response?.data?.message || err.message)); } finally { setUploadingTemplate(false); if (templateInputRef.current) templateInputRef.current.value = ''; }
// // //     };

// // //     const removeTemplate = (idx: number) => { if(!confirm("Hapus dokumen ini?")) return; setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) })); };
// // //     const updateTemplateTitle = (idx: number, v: string) => { const t = [...formData.registrationTemplates]; t[idx].title = v; setFormData(prev => ({ ...prev, registrationTemplates: t })); };
// // //     const handlePreSubmit = () => { if (!formData.title) return alert("Judul wajib diisi!"); setShowDisclaimer(true); };
    
// // //     const handleFinalSubmit = async () => {
// // //         if (!isAgreed) return alert("Mohon setujui pernyataan disclaimer.");
// // //         setLoading(true);
// // //         try {
// // //             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
// // //             const picIds = validPics.map((p: any) => p.id || p._id).filter((id: any) => id);
// // //             const parseDate = (d: string) => d ? new Date(d) : null;

// // //             const payload = {
// // //                 title: formData.title, description: formData.description, programType: formData.programType, hasCertificate: formData.hasCertificate,
// // //                 price: Number(formData.price), estimatedDuration: Number(formData.estimatedDuration), totalJp: Number(formData.totalJp),
// // //                 thumbnailUrl: formData.thumbnailUrl, promoVideoUrl: formData.promoVideoUrl, 
// // //                 organizer: organizerDisplay, 
// // //                 registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
// // //                 executionPeriod: { isForever: formData.execIsForever, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
// // //                 registrationMethod: formData.registrationMethod,
// // //                 registrationConfig: { requireDocs: formData.requireDocs, templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) },
// // //                 facilities: formData.facilities, facilitatorIds: formData.facilitatorIds, pics: validPics, picIds: picIds, 
// // //                 creatorInfo: formData.creatorInfo, contact: { name: formData.contactName, email: formData.contactEmail, phone: formData.contactPhone }
// // //             };

// // //             if (course?._id) await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
// // //             else await api('/api/courses', { method: 'POST', body: payload });
// // //             alert("Berhasil disimpan!"); onSuccess();
// // //         } catch (err: any) { console.error(err); alert("Gagal: " + (err.response?.data?.message || err.message)); } finally { setLoading(false); setShowDisclaimer(false); }
// // //     };

// // //     const handleAdminApproveContent = async () => {
// // //         if(!confirm("Yakin setujui konten?")) return;
// // //         setLoading(true);
// // //         try { await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { status: 'ready' } }); alert("✅ Konten disetujui!"); onSuccess(); onClose(); } catch (err: any) { alert("Gagal: " + err.message); } finally { setLoading(false); }
// // //     };

// // //     const getUserLocation = (u: any) => {
// // //         const city = u.city || u.memberData?.regency;
// // //         const prov = u.province || u.memberData?.province;
// // //         if (city && prov) return `${city}, ${prov}`;
// // //         if (prov) return prov;
// // //         return 'Nasional';
// // //     };

// // //     // --- FILTER SEARCH ---
// // //     const filteredFacilitators = allSystemUsers.filter(u => {
// // //         const keyword = searchFacilitator.toLowerCase();
// // //         const role = (u.role || '').toUpperCase();
// // //         // Hanya tampilkan role Fasilitator/Admin & belum dipilih
// // //         if (!['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'].includes(role)) return false;
// // //         if (formData.facilitatorIds.includes(u._id || u.id)) return false;
        
// // //         return (u.name || '').toLowerCase().includes(keyword) || (u.email || '').toLowerCase().includes(keyword);
// // //     });

// // //     const filteredPics = allSystemUsers.filter(u => {
// // //         const keyword = searchPic.toLowerCase();
// // //         if (formData.pics.some((p: any) => p.email === u.email)) return false;
// // //         return (u.name || '').toLowerCase().includes(keyword) || (u.email || '').toLowerCase().includes(keyword);
// // //     });

// // //     const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN' || currentUser?.permissions?.includes('manage_courses');
// // //     const isDraftStatus = course?.status === 'draft';

// // //     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><Loader2 className="animate-spin text-white"/></div>;

// // //     const footerButtons = (
// // //         <>
// // //             <div className="flex-1 text-xs text-gray-500 hidden md:block text-left">Status: <span className="font-bold uppercase">{course?.status || 'Baru'}</span></div>
// // //             <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50">Batal</button>
// // //             {isSuperAdmin && isDraftStatus && course?._id && (<button onClick={handleAdminApproveContent} disabled={loading} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-md flex items-center gap-2">{loading ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18}/>} Setujui Konten</button>)}
// // //             <button onClick={handlePreSubmit} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] shadow-lg flex items-center gap-2 disabled:opacity-50">{loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Simpan Perubahan</button>
// // //         </>
// // //     );

// // //     return (
// // //         <BaseModal isOpen={true} onClose={onClose} title={course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'} subTitle="Lengkapi data pelatihan." size="full" footer={footerButtons}>
// // //             <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0 mb-6 -mx-6 px-6 pt-2">
// // //                 {[{ id: 'info', label: '1. Informasi Dasar', icon: FileText }, { id: 'media', label: '2. Media & Visual', icon: ImageIcon }, { id: 'registration', label: '3. Jadwal & Pelaksana', icon: Calendar }, { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award }, { id: 'team', label: '5. Tim & PIC', icon: Users }].map((tab) => (
// // //                     <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}><tab.icon size={16} /> {tab.label}</button>
// // //                 ))}
// // //             </div>

// // //             {/* TAB 1: INFO */}
// // //             {activeTab === 'info' && (
// // //                 <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-2">
// // //                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4"><div><label className="block text-sm font-bold text-gray-700 mb-1">Judul Pelatihan *</label><input required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" value={formData.title} onChange={e => handleChange('title', e.target.value)} placeholder="Contoh: Pelatihan Dasar KSR" aria-label="Judul"/></div><div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap *</label><div className="bg-white border rounded-lg overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" aria-label="Deskripsi"/></div></div></div>
// // //                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8"><div><label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label><div className="flex gap-4"><div onClick={() => handleChange('programType', 'training')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border ${formData.programType === 'training' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}><div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'training' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'training' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div><span className="text-sm text-gray-700 font-medium">Diklat Resmi</span></div><div onClick={() => handleChange('programType', 'course')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border ${formData.programType === 'course' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}><div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'course' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'course' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div><span className="text-sm text-gray-700 font-medium">Kursus Mandiri</span></div></div></div><div className="w-px bg-gray-200"></div><div className="flex items-center gap-3"><div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div><span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span></div></div></div>
// // //                 </div>
// // //             )}
            
// // //             {/* TAB 2: MEDIA */}
// // //             {activeTab === 'media' && (
// // //                 <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) *</label><div className="flex gap-6 items-start"><div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">{formData.thumbnailUrl ? <img src={getLocalDisplayUrl(formData.thumbnailUrl)} alt="Preview" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1"/><span className="text-xs">Belum ada gambar</span></div>}{uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}</div><div className="flex-1"><p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p><input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" aria-label="Input Gambar"/><button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2"><Upload size={16}/> Upload Gambar</button></div></div></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label><input type="text" className="w-full p-2.5 border rounded-lg" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} aria-label="URL Video"/></div></div>
// // //             )}
            
// // //             {/* TAB 3: REGISTRASI & PELAKSANA (LOCKED) */}
// // //             {activeTab === 'registration' && (
// // //                 <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2">
// // //                     <div className="grid grid-cols-2 gap-6"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4"><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label><div className="flex items-center gap-2 mb-2"><div onClick={() => handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-sm text-gray-600">Buka Selamanya</span></div></div>{!formData.regIsForever && (<div className="grid grid-cols-2 gap-3"><div><span className="text-xs text-gray-500 block mb-1">Mulai *</span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} aria-label="Mulai Pendaftaran"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai *</span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} aria-label="Selesai Pendaftaran"/></div></div>)}</div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4"><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label><div className="flex items-center gap-2 mb-2"><div onClick={() => handleChange('execIsForever', !formData.execIsForever)} className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.execIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-sm text-gray-600">Fleksibel</span></div></div>{!formData.execIsForever && (<div className="grid grid-cols-2 gap-3"><div><span className="text-xs text-gray-500 block mb-1">Mulai *</span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} aria-label="Mulai Pelaksanaan"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai *</span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} aria-label="Selesai Pelaksanaan"/></div></div>)}</div></div>
                    
// // //                     {/* [LOCKED] ORGANIZER - TAMPILAN SESUAI PERMINTAAN */}
// // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 relative overflow-hidden">
// // //                         <div className="absolute top-0 right-0 p-4"><Lock className="text-gray-300" size={20}/></div>
// // //                         <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan *</label>
// // //                         <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
// // //                             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Wilayah / Organizer</p>
// // //                             <h3 className="text-lg font-bold text-gray-800">{organizerDisplay}</h3>
// // //                             <p className="text-xs text-gray-500 mt-1">Kode Wilayah: {regionCodeDisplay !== 'national' ? regionCodeDisplay : 'NASIONAL'}</p>
// // //                         </div>
// // //                         <p className="text-[10px] text-orange-600 flex items-center gap-1 bg-orange-50 p-2 rounded"><AlertCircle size={12}/> Pelaksana sudah ditentukan saat pengajuan dan tidak dapat diubah di sini.</p>
// // //                     </div>

// // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3"><label className="text-sm font-bold text-gray-700">Metode Penerimaan Peserta</label><div className="flex gap-4 mb-4"><div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex-1 p-3 border rounded cursor-pointer ${formData.registrationMethod==='auto'?'bg-green-50 border-green-500':''}`}><p className="font-bold text-sm">Otomatis (Langsung Aktif)</p><p className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</p></div><div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex-1 p-3 border rounded cursor-pointer ${formData.registrationMethod==='manual'?'bg-yellow-50 border-yellow-500':''}`}><p className="font-bold text-sm">Manual (Verifikasi Admin)</p><p className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</p></div></div></div>

// // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // //                         <div className="flex justify-between items-start mb-4"><div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div><div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer"><div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs?'bg-red-600 border-red-600':''}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span></div></div>
// // //                         {formData.requireDocs && (<div className="space-y-3"><div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} aria-label="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50"><Upload size={14}/> Upload Template Baru</button></div>{formData.registrationTemplates.map((item: any, idx: number) => (<div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg"><div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div><div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} aria-label="Nama Dokumen"/><a href={getLocalDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()}><Download size={10} /> Lihat File Uploaded</a></div><button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" aria-label="Hapus Template"><Trash2 size={16} /></button></div>))}</div>)}
// // //                     </div>
// // //                 </div>
// // //             )}
            
// // //             {/* TAB 4: FACILITIES */}
// // //             {activeTab === 'facilities' && (
// // //                 <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2"><div className="space-y-6"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" aria-label="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded" value={formData.estimatedDuration} disabled aria-label="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded" value={formData.totalJp} disabled aria-label="Total JP"/></div></div></div></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas *</label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} aria-label="Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" aria-label="Tambah"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" aria-label="Hapus"><X size={14}/></button></div>))}</div></div></div>
// // //             )}

// // //             {/* TAB 5: TIM & PIC - PERBAIKAN PENCARIAN CLIENT SIDE */}
// // //             {activeTab === 'team' && (
// // //                 <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2">
// // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // //                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
// // //                         <p className="text-xs text-gray-500 mb-4">*Mencakup Admin, Superadmin, dan Fasilitator.</p>
                        
// // //                         {/* List Terpilih */}
// // //                         {selectedFacilitatorsList.length > 0 && (
// // //                             <div className="mb-4 space-y-2">
// // //                                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tim Terpilih ({selectedFacilitatorsList.length})</p>
// // //                                 {selectedFacilitatorsList.map(fac => (
// // //                                     <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100 animate-in slide-in-from-top-1">
// // //                                         <div className="flex items-center gap-3">
// // //                                             <div className="w-8 h-8 rounded-full bg-white text-green-600 flex items-center justify-center font-bold text-xs border border-green-200">{fac.name?.charAt(0)}</div>
// // //                                             <div>
// // //                                                 <span className="text-sm font-bold text-green-900 block">{fac.name}</span>
// // //                                                 <span className="text-[10px] text-green-700 flex items-center gap-1">
// // //                                                     <MapPin size={10}/> {getUserLocation(fac)}
// // //                                                 </span>
// // //                                             </div>
// // //                                         </div>
// // //                                         <button type="button" onClick={() => removeFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus" aria-label="Hapus"><X size={14}/></button>
// // //                                     </div>
// // //                                 ))}
// // //                             </div>
// // //                         )}

// // //                         {/* Search & Dropdown */}
// // //                         <div className="relative">
// // //                             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // //                             <input 
// // //                                 type="text" 
// // //                                 placeholder="Cari nama atau email..." 
// // //                                 className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" 
// // //                                 value={searchFacilitator} 
// // //                                 onChange={(e) => setSearchFacilitator(e.target.value)} 
// // //                                 aria-label="Cari Fasilitator"
// // //                             />
                            
// // //                             {searchFacilitator && (
// // //                                 <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-60 overflow-y-auto z-20">
// // //                                     <div className="p-2 bg-gray-50 text-[9px] text-gray-400 border-b">
// // //                                         Memuat dari {allSystemUsers.length} user database...
// // //                                     </div>
// // //                                     {filteredFacilitators.length > 0 ? filteredFacilitators.map(fac => (
// // //                                         <button key={fac._id || fac.id} type="button" onClick={() => addFacilitator(fac)} className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-0 flex items-center justify-between group">
// // //                                             <div className="flex items-center gap-3">
// // //                                                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{fac.name?.charAt(0)}</div>
// // //                                                 <div>
// // //                                                     <p className="text-sm font-bold text-gray-700">{fac.name}</p>
// // //                                                     <p className="text-[10px] text-gray-500 flex items-center gap-1">
// // //                                                         <MapPin size={10}/> {getUserLocation(fac)}
// // //                                                     </p>
// // //                                                     <p className="text-[9px] text-gray-400">{fac.email} • {fac.role}</p>
// // //                                                 </div>
// // //                                             </div>
// // //                                             <Plus size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// // //                                         </button>
// // //                                     )) : (
// // //                                         <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>
// // //                                     )}
// // //                                 </div>
// // //                             )}
// // //                         </div>
// // //                     </div>
                    
// // //                     {/* PIC */}
// // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// // //                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
// // //                         <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between"><div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div><div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div></div>
// // //                         <div className="space-y-2 mb-4">
// // //                             <label className="text-sm font-bold text-gray-700 block">Daftar PIC Tambahan</label>
// // //                             {formData.pics.map((pic: any, idx: number) => (
// // //                                 <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in slide-in-from-top-1">
// // //                                     <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">{pic.name?.charAt(0)}</div><div><span className="text-sm font-bold text-blue-900 block">{pic.name}</span><div className="flex gap-2"><span className="text-[10px] text-blue-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full border border-blue-100">PIC</span><span className="text-[10px] text-gray-500">{pic.email}</span></div></div></div><button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
// // //                                 </div>
// // //                             ))}
// // //                         </div>
// // //                         {formData.pics.length < 3 ? (
// // //                             <div className="relative">
// // //                                 <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// // //                                 <input type="text" placeholder="Cari PIC (Ketik nama)..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchPic} onChange={(e) => setSearchPic(e.target.value)} aria-label="Cari PIC"/>
// // //                                 {searchPic && (
// // //                                     <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-60 overflow-y-auto z-20">
// // //                                         {filteredPics.length > 0 ? filteredPics.map(user => (
// // //                                             <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-0 flex items-center justify-between group">
// // //                                                 <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div></div><UserPlus size={16} className="text-green-500"/>
// // //                                             </button>
// // //                                         )) : <div className="p-4 text-center text-xs text-gray-400">Tidak ditemukan.</div>}
// // //                                     </div>
// // //                                 )}
// // //                             </div>
// // //                         ) : <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 rounded-lg border border-gray-200">Kuota PIC penuh.</div>}
// // //                     </div>

// // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckSquare size={18}/> Kontak Utama (Landing Page)</h3></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Nama Kontak *</label><input name="contactName" value={formData.contactName} onChange={(e) => handleChange('contactName', e.target.value)} className="w-full p-2 border rounded" aria-label="Nama Kontak"/></div><div><label className="text-xs font-bold text-gray-500">Email Kontak *</label><input name="contactEmail" value={formData.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} className="w-full p-2 border rounded" aria-label="Email Kontak"/></div><div className="md:col-span-2"><label className="text-xs font-bold text-gray-500">Nomor Telepon/WA *</label><input name="contactPhone" value={formData.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} className="w-full p-2 border rounded" placeholder="628..." aria-label="Telepon Kontak"/></div></div></div>
// // //                 </div>
// // //             )}

// // //             {showDisclaimer && (
// // //                 <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in"><div className="absolute inset-0 bg-black/80"></div><div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 text-center space-y-4"><div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2"><ShieldCheck size={32} className="text-orange-600"/></div><h3 className="text-xl font-bold text-gray-900">Pernyataan Disclaimer</h3><p className="text-sm text-gray-500 leading-relaxed">Saya menyatakan bahwa data pelatihan ini benar.</p><label className="flex items-center justify-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors"><input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} className="w-5 h-5 accent-orange-600" aria-label="Setuju"/><span className="font-bold text-sm text-orange-800">Saya Setuju</span></label><div className="flex gap-3 pt-2"><button onClick={() => setShowDisclaimer(false)} className="flex-1 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50">Kembali</button><button onClick={handleFinalSubmit} disabled={!isAgreed || loading} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">{loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Proses Simpan</button></div></div></div>
// // //             )}
// // //         </BaseModal>
// // //     );
// // // }


// // // // // // =======================================================================================
// // // // // // 1. PERBAIKAN LOKASI PELAKSANAAN AMBIL DARI LOKASI PELAKSANAAN PENGAJUAN PROPOSAL PELATIHAN
// // // // // // 2. PERBAIKAN PEMILIHAN TIM FASILITATOR
// // // //////// 3. PERBAIKAN TOMBOL SETUJUI UNTUK ADMIN
// // // // // // =======================================================================================




// // 'use client';

// // import { useState, useRef, useEffect } from 'react';
// // import { 
// //     X, Upload, Plus, Trash2, Save, Calendar, 
// //     Video, Image as ImageIcon, Users, FileText, 
// //     CheckCircle, AlertCircle, Award, Clock, Search, 
// //     Download, File, Loader2, UserPlus, 
// //     ShieldCheck, CheckSquare, Building, MapPin, Lock, UserCircle
// // } from 'lucide-react';
// // import { api, apiUpload } from '@/lib/api'; 
// // import dynamic from 'next/dynamic';
// // import 'react-quill/dist/quill.snow.css';
// // import axios from 'axios'; 
// // import BaseModal from '@/components/ui/BaseModal'; 

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
    
// //     // State Search
// //     const [searchFacilitator, setSearchFacilitator] = useState('');
// //     const [searchPic, setSearchPic] = useState('');
    
// //     // Data User System
// //     const [allSystemUsers, setAllSystemUsers] = useState<any[]>([]);
    
// //     // State UI
// //     const [showDisclaimer, setShowDisclaimer] = useState(false);
// //     const [isAgreed, setIsAgreed] = useState(false);
// //     const [newFacility, setNewFacility] = useState('');
// //     const [uploadingCover, setUploadingCover] = useState(false);
// //     const [uploadingTemplate, setUploadingTemplate] = useState(false);
    
// //     // State Display (Read Only)
// //     const [organizerDisplay, setOrganizerDisplay] = useState('');
// //     const [regionCodeDisplay, setRegionCodeDisplay] = useState('');
// //     const [cmsCategories, setCmsCategories] = useState<string[]>([]);
    
// //     // Manual Add
// //     const [showManualInput, setShowManualInput] = useState<string | null>(null);
// //     const [manualName, setManualName] = useState('');
// //     const [manualEmail, setManualEmail] = useState('');

// //     const [selectedFacilitatorsList, setSelectedFacilitatorsList] = useState<any[]>([]);

// //     // --- HELPER FUNCTIONS (PINDAH KE SINI AGAR TERBACA) ---
// //     const getUserLocation = (u: any) => {
// //         if (!u) return '-';
// //         const city = u.city || u.memberData?.regency;
// //         const prov = u.province || u.memberData?.province;
        
// //         if (city) return `${city}, ${prov || ''}`;
// //         if (prov) return prov;
        
// //         if (u.managedRegencies?.length > 0) return `Admin: ${u.managedRegencies[0]}`;
// //         if (u.managedProvinces?.length > 0) return `Admin: ${u.managedProvinces[0]}`;

// //         return 'Nasional';
// //     };

// //     const getLocalDisplayUrl = (url: string) => {
// //         if (!url) return '';
// //         if (url.startsWith('http')) return url;
// //         const cleanPath = url.startsWith('/') ? url : `/${url}`;
// //         return `${API_BASE_URL}${cleanPath}`;
// //     };

// //     // --- INITIAL STATE ---
// //     const defaultState = {
// //         title: '', description: '', 
// //         programType: 'training', 
// //         hasCertificate: true,
// //         regIsForever: false, regStartDate: '', regEndDate: '',
// //         execIsForever: false, execStartDate: '', execEndDate: '',
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

// //     // --- LOAD DATA ---
// //     useEffect(() => {
// //         const loadAllData = async () => {
// //             api('/api/content').then(res => {
// //                 if (res && res.organizerCategories) setCmsCategories(res.organizerCategories);
// //             }).catch(() => {});

// //             try {
// //                 let res = await api('/api/admin/users?limit=3000').catch(() => null);
// //                 if (!res) res = await api('/api/users?limit=3000').catch(() => ({ users: [] }));
                
// //                 let cleanUsers = [];
// //                 if (res.users && Array.isArray(res.users)) cleanUsers = res.users;
// //                 else if (Array.isArray(res)) cleanUsers = res;
                
// //                 if (cleanUsers.length === 0 && facilitators) cleanUsers = facilitators;
// //                 setAllSystemUsers(cleanUsers);
// //             } catch (e) {
// //                 console.error("Gagal load users:", e);
// //                 setAllSystemUsers(facilitators || []);
// //             }
// //         };
// //         loadAllData();
// //     }, [facilitators]);

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
// //                       }));
// //                      setOrganizerDisplay('Menunggu Proposal');
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

// //         let initialPics = Array.isArray(data.pics) ? data.pics : [];
// //         if (Array.isArray(data.picIds) && data.picIds.length > 0) {
// //             initialPics = data.picIds.map((p: any) => ({
// //                 id: p._id || p.id,
// //                 name: p.name,
// //                 email: p.email,
// //                 role: p.role,
// //                 avatarUrl: p.avatarUrl
// //             }));
// //         }

// //         const facIds = Array.isArray(data.facilitatorIds) ? data.facilitatorIds.map((f:any) => (typeof f === 'object' && f !== null ? f._id : f)) : [];
        
// //         let initialSelectedFacs: any[] = [];
// //         if (data.facilitatorIds && data.facilitatorIds.length > 0 && typeof data.facilitatorIds[0] === 'object') {
// //              initialSelectedFacs = data.facilitatorIds;
// //         }
// //         setSelectedFacilitatorsList(initialSelectedFacs);

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
// //             facilitatorIds: facIds,
// //             pics: initialPics, 
// //             creatorInfo: data.creatorInfo || null,
// //             contactName: data.contact?.name || data.creatorInfo?.name || '',
// //             contactEmail: data.contact?.email || data.creatorInfo?.email || '',
// //             contactPhone: data.contact?.phone || data.creatorInfo?.contact || ''
// //         });

// //         setOrganizerDisplay(data.organizer || 'PMI Pusat');
// //         setRegionCodeDisplay(data.regionCode || 'Nasional');
// //     }

// //     // Effect: Sync
// //     useEffect(() => {
// //         if (allSystemUsers.length > 0 && formData.facilitatorIds.length > 0) {
// //             const matched = allSystemUsers.filter(u => formData.facilitatorIds.includes(u._id || u.id));
// //             const map = new Map();
// //             [...selectedFacilitatorsList, ...matched].forEach(u => map.set(u._id || u.id, u));
// //             setSelectedFacilitatorsList(Array.from(map.values()));
// //         }
// //     }, [allSystemUsers]);

// //     // --- HANDLERS ---
// //     const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
// //     const addFacility = () => { if (!newFacility.trim()) return; setFormData(prev => ({ ...prev, facilities: [...prev.facilities, newFacility] })); setNewFacility(''); };
// //     const removeFacility = (idx: number) => { setFormData(prev => ({ ...prev, facilities: prev.facilities.filter((_, i) => i !== idx) })); };

// //     const addFacilitator = (user: any) => {
// //         const uid = user._id || user.id;
// //         if (formData.facilitatorIds.includes(uid)) return;
// //         setFormData(prev => ({ ...prev, facilitatorIds: [...prev.facilitatorIds, uid] }));
// //         setSelectedFacilitatorsList(prev => [...prev, user]);
// //         setSearchFacilitator(''); 
// //     };

// //     const removeFacilitator = (uid: string) => {
// //         setFormData(prev => ({ ...prev, facilitatorIds: prev.facilitatorIds.filter(id => id !== uid) }));
// //         setSelectedFacilitatorsList(prev => prev.filter(u => (u._id || u.id) !== uid));
// //     };

// //     const handleAddPicFromSearch = (user: any) => {
// //         if (formData.pics.length >= 3) return alert("Maksimal 3 PIC Tambahan");
// //         if (formData.pics.some((p: any) => p.email === user.email)) return alert("User ini sudah ditambahkan.");
// //         const newPic = { id: user._id || user.id, name: user.name, pmiStatus: user.role, email: user.email, avatarUrl: user.avatarUrl };
// //         setFormData(prev => ({ ...prev, pics: [...prev.pics, newPic] }));
// //         setSearchPic('');
// //     };
    
// //     // Manual Add Logic
// //     const handleManualAdd = () => { 
// //         if (!manualName || !manualEmail) return alert("Isi nama dan email."); 
// //         const newEntry = { id: `manual_${Date.now()}`, name: manualName, email: manualEmail, role: 'GUEST', avatarUrl: '' }; 
// //         if (showManualInput === 'facilitator') { 
// //             setFormData(prev => ({ ...prev, facilitatorIds: [...prev.facilitatorIds, newEntry.id] })); 
// //             setSelectedFacilitatorsList(prev => [...prev, newEntry]); 
// //         } else { 
// //             if (formData.pics.length >= 3) return alert("Maksimal 3 PIC."); 
// //             setFormData(prev => ({ ...prev, pics: [...prev.pics, { ...newEntry, pmiStatus: 'EKSTERNAL' }] })); 
// //         } 
// //         setManualName(''); setManualEmail(''); setShowManualInput(null); 
// //     };

// //     const removePic = (idx: number) => { setFormData(prev => ({ ...prev, pics: prev.pics.filter((_, i) => i !== idx) })); };
    
// //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const file = e.target.files?.[0]; if (!file) return;
// //         try { setUploadingCover(true); const fd = new FormData(); fd.append('file', file); const res = await apiUpload('/api/upload', fd); const url = res.url || res.file?.url || res.data?.url; if (url) handleChange('thumbnailUrl', url); } catch (err: any) { alert('Gagal: ' + err.message); } finally { setUploadingCover(false); }
// //     };

// //     const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const file = e.target.files?.[0]; if (!file) return; setUploadingTemplate(true);
// //         try { const fd = new FormData(); fd.append('file', file); const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null; const token = userStr ? JSON.parse(userStr).token : ''; const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }, withCredentials: true }); const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url; if (!rawUrl) throw new Error("Gagal dapat URL."); setFormData(prev => ({ ...prev, registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }] })); } catch (err: any) { console.error(err); alert('Upload Gagal: ' + (err.response?.data?.message || err.message)); } finally { setUploadingTemplate(false); if (templateInputRef.current) templateInputRef.current.value = ''; }
// //     };

// //     const removeTemplate = (idx: number) => { if(!confirm("Hapus dokumen ini?")) return; setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) })); };
// //     const updateTemplateTitle = (idx: number, v: string) => { const t = [...formData.registrationTemplates]; t[idx].title = v; setFormData(prev => ({ ...prev, registrationTemplates: t })); };
// //     const handlePreSubmit = () => { if (!formData.title) return alert("Judul wajib diisi!"); setShowDisclaimer(true); };
    
// //     const handleFinalSubmit = async () => {
// //         if (!isAgreed) return alert("Mohon setujui pernyataan disclaimer.");
// //         setLoading(true);
// //         try {
// //             const validPics = formData.pics.filter((p: any) => p.name && p.name.trim() !== '');
// //             const picIds = validPics.map((p: any) => p.id || p._id).filter((id: any) => id && !id.toString().startsWith('manual_'));
// //             const parseDate = (d: string) => d ? new Date(d) : null;

// //             const payload = {
// //                 title: formData.title, description: formData.description, programType: formData.programType, hasCertificate: formData.hasCertificate,
// //                 price: Number(formData.price), estimatedDuration: Number(formData.estimatedDuration), totalJp: Number(formData.totalJp),
// //                 thumbnailUrl: formData.thumbnailUrl, promoVideoUrl: formData.promoVideoUrl, 
// //                 organizer: organizerDisplay, 
// //                 registrationPeriod: { isForever: formData.regIsForever, startDate: parseDate(formData.regStartDate), endDate: parseDate(formData.regEndDate) },
// //                 executionPeriod: { isForever: formData.execIsForever, startDate: parseDate(formData.execStartDate), endDate: parseDate(formData.execEndDate) },
// //                 registrationMethod: formData.registrationMethod,
// //                 registrationConfig: { requireDocs: formData.requireDocs, templates: formData.registrationTemplates.map(t => ({ title: t.title, url: t.url })) },
// //                 facilities: formData.facilities, facilitatorIds: formData.facilitatorIds.filter(id => !id.toString().startsWith('manual_')), pics: validPics, picIds: picIds, 
// //                 creatorInfo: formData.creatorInfo, contact: { name: formData.contactName, email: formData.contactEmail, phone: formData.contactPhone }
// //             };

// //             if (course?._id) await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
// //             else await api('/api/courses', { method: 'POST', body: payload });
// //             alert("Berhasil disimpan!"); onSuccess();
// //         } catch (err: any) { console.error(err); alert("Gagal: " + (err.response?.data?.message || err.message)); } finally { setLoading(false); setShowDisclaimer(false); }
// //     };

// //     // [FIX POINT 5] ADMIN APPROVE INFO
// //     const handleAdminApproveInfo = async () => {
// //         if(!confirm("Yakin data informasi pelatihan ini sudah valid?")) return;
// //         setLoading(true);
// //         try { 
// //             // Kirim flag isInfoCompleted=true agar Gear terbuka
// //             await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { isInfoCompleted: true } }); 
// //             alert("✅ Informasi Disetujui! Tombol Konten (Gear) akan terbuka."); 
// //             onSuccess(); // Refresh parent
// //             onClose(); 
// //         } catch (err: any) { alert("Gagal: " + err.message); } finally { setLoading(false); }
// //     };

// //     const filteredFacilitators = allSystemUsers.filter(u => {
// //         const keyword = searchFacilitator.toLowerCase();
// //         const role = (u.role || '').toUpperCase();
// //         if (!['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'].includes(role)) return false;
// //         if (formData.facilitatorIds.includes(u._id || u.id)) return false;
// //         return (u.name || '').toLowerCase().includes(keyword) || (u.email || '').toLowerCase().includes(keyword);
// //     });

// //     const filteredPics = allSystemUsers.filter(u => {
// //         const keyword = searchPic.toLowerCase();
// //         if (formData.pics.some((p: any) => p.email === u.email)) return false;
// //         return (u.name || '').toLowerCase().includes(keyword) || (u.email || '').toLowerCase().includes(keyword);
// //     });

// //     const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'ADMIN';
// //     const isInfoCompleted = course?.isInfoCompleted === true;

// //     if (fetchingDetail && course?._id) return <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"><Loader2 className="animate-spin text-white"/></div>;

// //     const footerButtons = (
// //         <>
// //             <div className="flex-1 text-xs text-gray-500 hidden md:block text-left">Status: <span className="font-bold uppercase">{course?.status || 'Baru'}</span></div>
// //             <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50">Batal</button>
            
// //             {/* [FIX] TOMBOL SETUJUI UNTUK ADMIN */}
// //             {isSuperAdmin && !isInfoCompleted && course?._id && (
// //                 <button 
// //                     onClick={handleAdminApproveInfo} 
// //                     disabled={loading}
// //                     className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-md flex items-center gap-2"
// //                 >
// //                     {loading ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18}/>} Setujui Informasi
// //                 </button>
// //             )}

// //             <button onClick={handlePreSubmit} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] shadow-lg flex items-center gap-2 disabled:opacity-50">
// //                 {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Simpan Perubahan
// //             </button>
// //         </>
// //     );

// //     return (
// //         <BaseModal isOpen={true} onClose={onClose} title={course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'} subTitle="Lengkapi data pelatihan." size="full" footer={footerButtons}>
// //             <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0 mb-6 -mx-6 px-6 pt-2">
// //                 {[{ id: 'info', label: '1. Informasi Dasar', icon: FileText }, { id: 'media', label: '2. Media & Visual', icon: ImageIcon }, { id: 'registration', label: '3. Jadwal & Pelaksana', icon: Calendar }, { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award }, { id: 'team', label: '5. Tim & PIC', icon: Users }].map((tab) => (
// //                     <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}><tab.icon size={16} /> {tab.label}</button>
// //                 ))}
// //             </div>

// //             {activeTab === 'info' && (
// //                 <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-2">
// //                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4"><div><label className="block text-sm font-bold text-gray-700 mb-1">Judul Pelatihan *</label><input required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" value={formData.title} onChange={e => handleChange('title', e.target.value)} placeholder="Contoh: Pelatihan Dasar KSR" aria-label="Judul"/></div><div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap *</label><div className="bg-white border rounded-lg overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" aria-label="Deskripsi"/></div></div></div>
// //                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8"><div><label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label><div className="flex gap-4"><div onClick={() => handleChange('programType', 'training')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border ${formData.programType === 'training' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}><div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'training' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'training' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div><span className="text-sm text-gray-700 font-medium">Diklat Resmi</span></div><div onClick={() => handleChange('programType', 'course')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border ${formData.programType === 'course' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}><div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'course' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'course' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div><span className="text-sm text-gray-700 font-medium">Kursus Mandiri</span></div></div></div><div className="w-px bg-gray-200"></div><div className="flex items-center gap-3"><div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div><span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span></div></div></div>
// //                 </div>
// //             )}
// //             {activeTab === 'media' && (
// //                 <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) *</label><div className="flex gap-6 items-start"><div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">{formData.thumbnailUrl ? <img src={getLocalDisplayUrl(formData.thumbnailUrl)} alt="Preview" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1"/><span className="text-xs">Belum ada gambar</span></div>}{uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}</div><div className="flex-1"><p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p><input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" aria-label="Input Gambar"/><button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2"><Upload size={16}/> Upload Gambar</button></div></div></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label><input type="text" className="w-full p-2.5 border rounded-lg" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} aria-label="URL Video"/></div></div>
// //             )}
// //             {activeTab === 'registration' && (
// //                 <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2">
// //                     <div className="grid grid-cols-2 gap-6"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4"><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label><div className="flex items-center gap-2 mb-2"><div onClick={() => handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-sm text-gray-600">Buka Selamanya</span></div></div>{!formData.regIsForever && (<div className="grid grid-cols-2 gap-3"><div><span className="text-xs text-gray-500 block mb-1">Mulai *</span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} aria-label="Mulai Pendaftaran"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai *</span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} aria-label="Selesai Pendaftaran"/></div></div>)}</div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4"><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label><div className="flex items-center gap-2 mb-2"><div onClick={() => handleChange('execIsForever', !formData.execIsForever)} className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.execIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-sm text-gray-600">Fleksibel</span></div></div>{!formData.execIsForever && (<div className="grid grid-cols-2 gap-3"><div><span className="text-xs text-gray-500 block mb-1">Mulai *</span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} aria-label="Mulai Pelaksanaan"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai *</span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} aria-label="Selesai Pelaksanaan"/></div></div>)}</div></div>
// //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 relative overflow-hidden"><div className="absolute top-0 right-0 p-4"><Lock className="text-gray-300" size={20}/></div><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan *</label><div className="p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Wilayah / Organizer</p><h3 className="text-lg font-bold text-gray-800">{organizerDisplay}</h3><p className="text-xs text-gray-500 mt-1">Kode Wilayah: {regionCodeDisplay !== 'national' ? regionCodeDisplay : 'NASIONAL'}</p></div><p className="text-[10px] text-orange-600 flex items-center gap-1 bg-orange-50 p-2 rounded"><AlertCircle size={12}/> Pelaksana sudah ditentukan saat pengajuan dan tidak dapat diubah di sini.</p></div>
// //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3"><label className="text-sm font-bold text-gray-700">Metode Penerimaan Peserta</label><div className="flex gap-4 mb-4"><div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex-1 p-3 border rounded cursor-pointer ${formData.registrationMethod==='auto'?'bg-green-50 border-green-500':''}`}><p className="font-bold text-sm">Otomatis (Langsung Aktif)</p><p className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</p></div><div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex-1 p-3 border rounded cursor-pointer ${formData.registrationMethod==='manual'?'bg-yellow-50 border-yellow-500':''}`}><p className="font-bold text-sm">Manual (Verifikasi Admin)</p><p className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</p></div></div></div>
// //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="flex justify-between items-start mb-4"><div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div><div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer"><div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs?'bg-red-600 border-red-600':''}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span></div></div>{formData.requireDocs && (<div className="space-y-3"><div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} aria-label="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50"><Upload size={14}/> Upload Template Baru</button></div>{formData.registrationTemplates.map((item: any, idx: number) => (<div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg"><div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div><div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} aria-label="Nama Dokumen"/><a href={getLocalDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()}><Download size={10} /> Lihat File Uploaded</a></div><button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" aria-label="Hapus Template"><Trash2 size={16} /></button></div>))}</div>)}</div>
// //                 </div>
// //             )}
            
// //             {activeTab === 'facilities' && (
// //                 <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2"><div className="space-y-6"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" aria-label="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded" value={formData.estimatedDuration} disabled aria-label="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded" value={formData.totalJp} disabled aria-label="Total JP"/></div></div></div></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas *</label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} aria-label="Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" aria-label="Tambah"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" aria-label="Hapus"><X size={14}/></button></div>))}</div></div></div>
// //             )}

// //             {activeTab === 'team' && (
// //                 <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2">
// //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// //                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
// //                         <p className="text-xs text-gray-500 mb-4">*Mencakup Admin, Superadmin, dan Fasilitator.</p>
                        
// //                         {selectedFacilitatorsList.length > 0 && (
// //                             <div className="mb-4 space-y-2">
// //                                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tim Terpilih ({selectedFacilitatorsList.length})</p>
// //                                 {selectedFacilitatorsList.map(fac => (
// //                                     <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100 animate-in slide-in-from-top-1">
// //                                         <div className="flex items-center gap-3">
// //                                             <div className="w-8 h-8 rounded-full bg-white text-green-600 flex items-center justify-center font-bold text-xs border border-green-200">{fac.name?.charAt(0)}</div>
// //                                             <div>
// //                                                 <span className="text-sm font-bold text-green-900 block">{fac.name}</span>
// //                                                 <span className="text-[10px] text-green-700 flex items-center gap-1">
// //                                                     <MapPin size={10}/> {getUserLocation(fac)}
// //                                                 </span>
// //                                             </div>
// //                                         </div>
// //                                         <button type="button" onClick={() => removeFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus" aria-label="Hapus"><X size={14}/></button>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         )}

// //                         <div className="relative">
// //                             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// //                             <input 
// //                                 type="text" 
// //                                 placeholder="Cari nama atau email..." 
// //                                 className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" 
// //                                 value={searchFacilitator} 
// //                                 onChange={(e) => setSearchFacilitator(e.target.value)} 
// //                                 aria-label="Cari Fasilitator"
// //                             />
                            
// //                             {searchFacilitator && (
// //                                 <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-60 overflow-y-auto z-20">
// //                                     {allSystemUsers.filter(u => {
// //                                         const role = (u.role || '').toUpperCase();
// //                                         if (!['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'].includes(role)) return false;
// //                                         if (formData.facilitatorIds.includes(u._id || u.id)) return false;
// //                                         const keyword = searchFacilitator.toLowerCase();
// //                                         return (u.name || '').toLowerCase().includes(keyword) || (u.email || '').toLowerCase().includes(keyword);
// //                                     }).length > 0 ? allSystemUsers.filter(u => {
// //                                         const role = (u.role || '').toUpperCase();
// //                                         if (!['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'].includes(role)) return false;
// //                                         if (formData.facilitatorIds.includes(u._id || u.id)) return false;
// //                                         const keyword = searchFacilitator.toLowerCase();
// //                                         return (u.name || '').toLowerCase().includes(keyword) || (u.email || '').toLowerCase().includes(keyword);
// //                                     }).map(fac => (
// //                                         <button key={fac._id || fac.id} type="button" onClick={() => addFacilitator(fac)} className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-0 flex items-center justify-between group">
// //                                             <div className="flex items-center gap-3">
// //                                                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{fac.name?.charAt(0)}</div>
// //                                                 <div>
// //                                                     <p className="text-sm font-bold text-gray-700">{fac.name}</p>
// //                                                     <p className="text-[10px] text-gray-500 flex items-center gap-1">
// //                                                         <MapPin size={10}/> {getUserLocation(fac)}
// //                                                     </p>
// //                                                 </div>
// //                                             </div>
// //                                             <Plus size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
// //                                         </button>
// //                                     )) : (
// //                                         <div className="p-4 text-center text-xs text-gray-400">
// //                                             Tidak ditemukan. <button onClick={() => { setShowManualInput('facilitator'); setManualName(searchFacilitator); }} className="text-blue-600 underline">Tambah Manual?</button>
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                             )}
// //                         </div>
// //                     </div>
                    
// //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
// //                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
// //                         <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between"><div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div><div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div></div>
// //                         <div className="space-y-2 mb-4">
// //                             <label className="text-sm font-bold text-gray-700 block">Daftar PIC Tambahan</label>
// //                             {formData.pics.map((pic: any, idx: number) => (
// //                                 <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in slide-in-from-top-1">
// //                                     <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">{pic.name?.charAt(0)}</div><div><span className="text-sm font-bold text-blue-900 block">{pic.name}</span><div className="flex gap-2"><span className="text-[10px] text-blue-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full border border-blue-100">PIC</span><span className="text-[10px] text-gray-500">{pic.email}</span></div></div></div><button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                         {formData.pics.length < 3 ? (
// //                             <div className="relative">
// //                                 <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
// //                                 <input type="text" placeholder="Cari PIC (Ketik nama)..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchPic} onChange={(e) => setSearchPic(e.target.value)} aria-label="Cari PIC"/>
// //                                 {searchPic && (
// //                                     <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-60 overflow-y-auto z-20">
// //                                         {allSystemUsers.filter(u => {
// //                                             if (formData.pics.some((p: any) => p.email === u.email)) return false;
// //                                             const keyword = searchPic.toLowerCase();
// //                                             return (u.name || '').toLowerCase().includes(keyword) || (u.email || '').toLowerCase().includes(keyword);
// //                                         }).map(user => (
// //                                             <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-0 flex items-center justify-between group">
// //                                                 <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div></div><UserPlus size={16} className="text-green-500"/>
// //                                             </button>
// //                                         ))}
// //                                         {allSystemUsers.filter(u => !formData.pics.some((p: any) => p.email === u.email) && (u.name || '').toLowerCase().includes(searchPic.toLowerCase())).length === 0 && (
// //                                             <div className="p-4 text-center text-xs text-gray-400">
// //                                                 Tidak ditemukan. <button onClick={() => { setShowManualInput('pic'); setManualName(searchPic); }} className="text-blue-600 underline">Tambah Manual?</button>
// //                                             </div>
// //                                         )}
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         ) : <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 rounded-lg border border-gray-200">Kuota PIC penuh.</div>}
// //                     </div>

// //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckSquare size={18}/> Kontak Utama (Landing Page)</h3></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Nama Kontak *</label><input name="contactName" value={formData.contactName} onChange={(e) => handleChange('contactName', e.target.value)} className="w-full p-2 border rounded" aria-label="Nama Kontak"/></div><div><label className="text-xs font-bold text-gray-500">Email Kontak *</label><input name="contactEmail" value={formData.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} className="w-full p-2 border rounded" aria-label="Email Kontak"/></div><div className="md:col-span-2"><label className="text-xs font-bold text-gray-500">Nomor Telepon/WA *</label><input name="contactPhone" value={formData.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} className="w-full p-2 border rounded" placeholder="628..." aria-label="Telepon Kontak"/></div></div></div>
// //                 </div>
// //             )}
            
// //             {showManualInput && (
// //                 <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-black/50">
// //                     <div className="bg-white p-6 rounded-xl w-full max-w-sm">
// //                         <h3 className="font-bold text-lg mb-4">Tambah Manual</h3>
// //                         <input className="w-full p-2 border rounded mb-2" placeholder="Nama Lengkap" value={manualName} onChange={e=>setManualName(e.target.value)} aria-label="Manual Nama"/>
// //                         <input className="w-full p-2 border rounded mb-4" placeholder="Email" value={manualEmail} onChange={e=>setManualEmail(e.target.value)} aria-label="Manual Email"/>
// //                         <div className="flex justify-end gap-2">
// //                             <button onClick={() => setShowManualInput(null)} className="px-4 py-2 border rounded">Batal</button>
// //                             <button onClick={handleManualAdd} className="px-4 py-2 bg-blue-600 text-white rounded">Simpan</button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}

// //             {showDisclaimer && (
// //                 <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in"><div className="absolute inset-0 bg-black/80"></div><div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 text-center space-y-4"><div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2"><ShieldCheck size={32} className="text-orange-600"/></div><h3 className="text-xl font-bold text-gray-900">Pernyataan Disclaimer</h3><p className="text-sm text-gray-500 leading-relaxed">Saya menyatakan bahwa data pelatihan ini benar.</p><label className="flex items-center justify-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors"><input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} className="w-5 h-5 accent-orange-600" aria-label="Setuju"/><span className="font-bold text-sm text-orange-800">Saya Setuju</span></label><div className="flex gap-3 pt-2"><button onClick={() => setShowDisclaimer(false)} className="flex-1 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50">Kembali</button><button onClick={handleFinalSubmit} disabled={!isAgreed || loading} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">{loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Proses Simpan</button></div></div></div>
// //             )}
// //         </BaseModal>
// //     );
// // }

// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { 
//     X, Upload, Plus, Trash2, Save, Calendar, 
//     Video, Image as ImageIcon, Users, FileText, 
//     CheckCircle, AlertCircle, Award, Clock, Search, 
//     Download, File, Loader2, UserPlus, 
//     ShieldCheck, CheckSquare, Building, MapPin, Lock, UserCircle
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

// export default function CourseFormModal({ course, onClose, onSuccess, facilitators, currentUser }: CourseFormModalProps) {
//     const [activeTab, setActiveTab] = useState('info');
//     const [loading, setLoading] = useState(false);
//     const [fetchingDetail, setFetchingDetail] = useState(false);
    
//     // Refs
//     const fileInputRef = useRef<HTMLInputElement>(null); 
//     const templateInputRef = useRef<HTMLInputElement>(null); 
    
//     // State Search & Users
//     const [searchFacilitator, setSearchFacilitator] = useState('');
//     const [searchPic, setSearchPic] = useState('');
    
//     // [FIX] State untuk menampung SEMUA USER dari database untuk pencarian
//     const [allSystemUsers, setAllSystemUsers] = useState<any[]>([]);
    
//     // State UI
//     const [showDisclaimer, setShowDisclaimer] = useState(false);
//     const [isAgreed, setIsAgreed] = useState(false);
//     const [organizerDisplay, setOrganizerDisplay] = useState('');
//     const [regionCodeDisplay, setRegionCodeDisplay] = useState('');
//     const [newFacility, setNewFacility] = useState('');
//     const [uploadingCover, setUploadingCover] = useState(false);
//     const [uploadingTemplate, setUploadingTemplate] = useState(false);
//     const [cmsCategories, setCmsCategories] = useState<string[]>([]);
//     const [showManualInput, setShowManualInput] = useState<string | null>(null);
//     const [manualName, setManualName] = useState('');
//     const [manualEmail, setManualEmail] = useState('');

//     const [selectedFacilitatorsList, setSelectedFacilitatorsList] = useState<any[]>([]);

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
//         contactName: '', contactPhone: '', contactEmail: ''
//     };

//     const [formData, setFormData] = useState(defaultState);

//     const getLocalDisplayUrl = (url: string) => {
//         if (!url) return '';
//         if (url.startsWith('http')) return url;
//         const cleanPath = url.startsWith('/') ? url : `/${url}`;
//         return `${API_BASE_URL}${cleanPath}`;
//     };

//     // Helper Location (Dipindah ke atas)
//     const getUserLocation = (u: any) => {
//         if (!u) return '-';
//         const city = u.city || u.memberData?.regency;
//         const prov = u.province || u.memberData?.province;
//         if (city) return `${city}, ${prov || ''}`;
//         if (prov) return prov;
//         return 'Nasional';
//     };

//     // --- LOAD ALL USERS (ROBUST FETCHING) ---
//     useEffect(() => {
//         const loadAllData = async () => {
//             // Load Categories
//             api('/api/content').then(res => {
//                 if (res && res.organizerCategories) setCmsCategories(res.organizerCategories);
//             }).catch(() => {});

//             // Load Users
//             try {
//                 // Coba limit besar agar pencarian client-side lancar
//                 let res = await api('/api/admin/users?limit=5000').catch(() => null);
//                 // Fallback jika forbidden
//                 if (!res) res = await api('/api/users?limit=5000').catch(() => ({ users: [] }));
                
//                 let cleanUsers = [];
//                 if (res.users && Array.isArray(res.users)) cleanUsers = res.users;
//                 else if (res.data && Array.isArray(res.data)) cleanUsers = res.data;
//                 else if (Array.isArray(res)) cleanUsers = res;
                
//                 // Fallback ke props jika kosong
//                 if (cleanUsers.length === 0 && facilitators) cleanUsers = facilitators;

//                 setAllSystemUsers(cleanUsers);
//             } catch (e) {
//                 console.error("Gagal load users:", e);
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
//                 // Mode Create
//                 if (currentUser) {
//                      setFormData(prev => ({
//                         ...prev,
//                         contactName: currentUser.name,
//                         contactEmail: currentUser.email,
//                         contactPhone: currentUser.phoneNumber || ''
//                       }));
//                      const org = currentUser.role === 'SUPER_ADMIN' ? 'PMI Pusat' : (currentUser.organizer || 'PMI Wilayah');
//                      setOrganizerDisplay(org);
//                      setRegionCodeDisplay('Menunggu Proposal');
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
//             contactPhone: data.contact?.phone || data.creatorInfo?.contact || ''
//         });

//         // Set Display Locked
//         setOrganizerDisplay(data.organizer || 'PMI Pusat');
//         setRegionCodeDisplay(data.regionCode || 'Nasional');
//     }

//     // Effect: Sync Selected Facilitators from All Users
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
//     const handlePreSubmit = () => { if (!formData.title) return alert("Judul wajib diisi!"); setShowDisclaimer(true); };
    
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
//                 creatorInfo: formData.creatorInfo, contact: { name: formData.contactName, email: formData.contactEmail, phone: formData.contactPhone }
//             };

//             if (course?._id) await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
//             else await api('/api/courses', { method: 'POST', body: payload });
//             alert("Berhasil disimpan!"); onSuccess();
//         } catch (err: any) { console.error(err); alert("Gagal: " + (err.response?.data?.message || err.message)); } finally { setLoading(false); setShowDisclaimer(false); }
//     };

//     // [ADMIN ACTIONS]
//     const handleAdminApproveInfo = async () => {
//         if(!confirm("Yakin data informasi pelatihan ini sudah valid?")) return;
//         setLoading(true);
//         try { 
//             // Flag isInfoCompleted = true akan membuka Gear di Table
//             await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { isInfoCompleted: true } }); 
//             alert("✅ Informasi Disetujui! Gear Modul Terbuka."); 
//             onSuccess(); 
//             onClose(); 
//         } catch (err: any) { alert("Gagal: " + err.message); } finally { setLoading(false); }
//     };

//     const handleAdminRejectInfo = async () => {
//         const reason = prompt("Masukkan alasan pengembalian (revisi):");
//         if (!reason) return;
//         setLoading(true);
//         try {
//             await api(`/api/courses/${course._id}`, { 
//                 method: 'PATCH', 
//                 body: { status: 'revision', isInfoCompleted: false, rejectionReason: reason } 
//             });
//             alert("⚠️ Pelatihan dikembalikan untuk revisi.");
//             onSuccess();
//             onClose();
//         } catch (e: any) { alert("Gagal: " + e.message); } finally { setLoading(false); }
//     };

//     // Search Logic (Case Insensitive)
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
            
//             {/* ADMIN ACTIONS: Approve/Reject Info */}
//             {isSuperAdmin && !isInfoCompleted && course?._id && (
//                 <>
//                     <button onClick={handleAdminRejectInfo} disabled={loading} className="px-5 py-2.5 rounded-xl bg-orange-100 text-orange-700 font-bold text-sm hover:bg-orange-200 border border-orange-200">
//                         Revisi
//                     </button>
//                     <button onClick={handleAdminApproveInfo} disabled={loading} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-md flex items-center gap-2">
//                         {loading ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18}/>} Setujui Informasi
//                     </button>
//                 </>
//             )}

//             {/* SAVE BUTTON */}
//             <button onClick={handlePreSubmit} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] shadow-lg flex items-center gap-2 disabled:opacity-50">
//                 {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Simpan Perubahan
//             </button>
//         </>
//     );

//     return (
//         <BaseModal isOpen={true} onClose={onClose} title={course ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'} subTitle="Lengkapi data pelatihan." size="full" footer={footerButtons}>
//             {/* TABS */}
//             <div className="flex border-b bg-gray-50 overflow-x-auto shrink-0 mb-6 -mx-6 px-6 pt-2">
//                 {[{ id: 'info', label: '1. Informasi Dasar', icon: FileText }, { id: 'media', label: '2. Media & Visual', icon: ImageIcon }, { id: 'registration', label: '3. Jadwal & Pelaksana', icon: Calendar }, { id: 'facilities', label: '4. Fasilitas & Detail', icon: Award }, { id: 'team', label: '5. Tim & PIC', icon: Users }].map((tab) => (
//                     <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}><tab.icon size={16} /> {tab.label}</button>
//                 ))}
//             </div>

//             {/* TAB 1 */}
//             {activeTab === 'info' && (
//                 <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-2">
//                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4"><div><label className="block text-sm font-bold text-gray-700 mb-1">Judul Pelatihan *</label><input required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" value={formData.title} onChange={e => handleChange('title', e.target.value)} placeholder="Contoh: Pelatihan Dasar KSR" aria-label="Judul"/></div><div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap *</label><div className="bg-white border rounded-lg overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" aria-label="Deskripsi"/></div></div></div>
//                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8"><div><label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label><div className="flex gap-4"><div onClick={() => handleChange('programType', 'training')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border ${formData.programType === 'training' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}><div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'training' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'training' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div><span className="text-sm text-gray-700 font-medium">Diklat Resmi</span></div><div onClick={() => handleChange('programType', 'course')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border ${formData.programType === 'course' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}><div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'course' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'course' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div><span className="text-sm text-gray-700 font-medium">Kursus Mandiri</span></div></div></div><div className="w-px bg-gray-200"></div><div className="flex items-center gap-3"><div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div><span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span></div></div></div>
//                 </div>
//             )}
            
//             {/* TAB 2 */}
//             {activeTab === 'media' && (
//                 <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) *</label><div className="flex gap-6 items-start"><div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">{formData.thumbnailUrl ? <img src={getLocalDisplayUrl(formData.thumbnailUrl)} alt="Preview" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1"/><span className="text-xs">Belum ada gambar</span></div>}{uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}</div><div className="flex-1"><p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p><input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" aria-label="Input Gambar"/><button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2"><Upload size={16}/> Upload Gambar</button></div></div></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label><input type="text" className="w-full p-2.5 border rounded-lg" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} aria-label="URL Video"/></div></div>
//             )}
            
//             {/* TAB 3 */}
//             {activeTab === 'registration' && (
//                 <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2">
//                     <div className="grid grid-cols-2 gap-6"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4"><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label><div className="flex items-center gap-2 mb-2"><div onClick={() => handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-sm text-gray-600">Buka Selamanya</span></div></div>{!formData.regIsForever && (<div className="grid grid-cols-2 gap-3"><div><span className="text-xs text-gray-500 block mb-1">Mulai *</span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} aria-label="Mulai Pendaftaran"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai *</span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} aria-label="Selesai Pendaftaran"/></div></div>)}</div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4"><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label><div className="flex items-center gap-2 mb-2"><div onClick={() => handleChange('execIsForever', !formData.execIsForever)} className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.execIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-sm text-gray-600">Fleksibel</span></div></div>{!formData.execIsForever && (<div className="grid grid-cols-2 gap-3"><div><span className="text-xs text-gray-500 block mb-1">Mulai *</span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} aria-label="Mulai Pelaksanaan"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai *</span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} aria-label="Selesai Pelaksanaan"/></div></div>)}</div></div>
//                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 relative overflow-hidden"><div className="absolute top-0 right-0 p-4"><Lock className="text-gray-300" size={20}/></div><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan *</label><div className="p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Wilayah / Organizer</p><h3 className="text-lg font-bold text-gray-800">{organizerDisplay}</h3><p className="text-xs text-gray-500 mt-1">Kode Wilayah: {regionCodeDisplay !== 'national' ? regionCodeDisplay : 'NASIONAL'}</p></div><p className="text-[10px] text-orange-600 flex items-center gap-1 bg-orange-50 p-2 rounded"><AlertCircle size={12}/> Pelaksana sudah ditentukan saat pengajuan dan tidak dapat diubah di sini.</p></div>
//                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3"><label className="text-sm font-bold text-gray-700">Metode Penerimaan Peserta</label><div className="flex gap-4 mb-4"><div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex-1 p-3 border rounded cursor-pointer ${formData.registrationMethod==='auto'?'bg-green-50 border-green-500':''}`}><p className="font-bold text-sm">Otomatis (Langsung Aktif)</p><p className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</p></div><div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex-1 p-3 border rounded cursor-pointer ${formData.registrationMethod==='manual'?'bg-yellow-50 border-yellow-500':''}`}><p className="font-bold text-sm">Manual (Verifikasi Admin)</p><p className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</p></div></div></div>
//                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="flex justify-between items-start mb-4"><div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div><div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer"><div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs?'bg-red-600 border-red-600':''}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span></div></div>{formData.requireDocs && (<div className="space-y-3"><div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} aria-label="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50"><Upload size={14}/> Upload Template Baru</button></div>{formData.registrationTemplates.map((item: any, idx: number) => (<div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg"><div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div><div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} aria-label="Nama Dokumen"/><a href={getLocalDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()}><Download size={10} /> Lihat File Uploaded</a></div><button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" aria-label="Hapus Template"><Trash2 size={16} /></button></div>))}</div>)}</div>
//                 </div>
//             )}
            
//             {/* TAB 4 */}
//             {activeTab === 'facilities' && (
//                 <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2"><div className="space-y-6"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" aria-label="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded" value={formData.estimatedDuration} disabled aria-label="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded" value={formData.totalJp} disabled aria-label="Total JP"/></div></div></div></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas *</label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} aria-label="Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" aria-label="Tambah"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" aria-label="Hapus"><X size={14}/></button></div>))}</div></div></div>
//             )}

//             {/* TAB 5 */}
//             {activeTab === 'team' && (
//                 <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2">
//                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
//                         <p className="text-xs text-gray-500 mb-4">*Mencakup Admin, Superadmin, dan Fasilitator.</p>
                        
//                         {selectedFacilitatorsList.length > 0 && (
//                             <div className="mb-4 space-y-2">
//                                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tim Terpilih ({selectedFacilitatorsList.length})</p>
//                                 {selectedFacilitatorsList.map(fac => (
//                                     <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100 animate-in slide-in-from-top-1">
//                                         <div className="flex items-center gap-3">
//                                             <div className="w-8 h-8 rounded-full bg-white text-green-600 flex items-center justify-center font-bold text-xs border border-green-200">{fac.name?.charAt(0)}</div>
//                                             <div>
//                                                 <span className="text-sm font-bold text-green-900 block">{fac.name}</span>
//                                                 <span className="text-[10px] text-green-700 flex items-center gap-1">
//                                                     <MapPin size={10}/> {getUserLocation(fac)}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <button type="button" onClick={() => removeFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus" aria-label="Hapus"><X size={14}/></button>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}

//                         <div className="relative">
//                             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//                             <input type="text" placeholder="Cari nama atau email..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchFacilitator} onChange={(e) => setSearchFacilitator(e.target.value)} aria-label="Cari Fasilitator"/>
                            
//                             {searchFacilitator && (
//                                 <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-60 overflow-y-auto z-20">
//                                     {filteredFacilitators.length > 0 ? filteredFacilitators.map(fac => (
//                                         <button key={fac._id || fac.id} type="button" onClick={() => addFacilitator(fac)} className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-0 flex items-center justify-between group">
//                                             <div className="flex items-center gap-3">
//                                                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{fac.name?.charAt(0)}</div>
//                                                 <div>
//                                                     <p className="text-sm font-bold text-gray-700">{fac.name}</p>
//                                                     <p className="text-[10px] text-gray-500 flex items-center gap-1"><MapPin size={10}/> {getUserLocation(fac)}</p>
//                                                     <p className="text-[9px] text-gray-400">{fac.email} • {fac.role}</p>
//                                                 </div>
//                                             </div>
//                                             <Plus size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
//                                         </button>
//                                     )) : (
//                                         <div className="p-4 text-center text-xs text-gray-400">
//                                             Tidak ditemukan. <button onClick={() => { setShowManualInput('facilitator'); setManualName(searchFacilitator); }} className="text-blue-600 underline">Tambah Manual?</button>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
                    
//                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//                         <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
//                         <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between"><div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div><div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div></div>
//                         <div className="space-y-2 mb-4">
//                             <label className="text-sm font-bold text-gray-700 block">Daftar PIC Tambahan</label>
//                             {formData.pics.map((pic: any, idx: number) => (
//                                 <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in slide-in-from-top-1">
//                                     <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">{pic.name?.charAt(0)}</div><div><span className="text-sm font-bold text-blue-900 block">{pic.name}</span><div className="flex gap-2"><span className="text-[10px] text-blue-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full border border-blue-100">PIC</span><span className="text-[10px] text-gray-500">{pic.email}</span></div></div></div><button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
//                                 </div>
//                             ))}
//                         </div>
//                         {formData.pics.length < 3 ? (
//                             <div className="relative">
//                                 <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//                                 <input type="text" placeholder="Cari PIC (Ketik nama)..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchPic} onChange={(e) => setSearchPic(e.target.value)} aria-label="Cari PIC"/>
//                                 {searchPic && (
//                                     <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-60 overflow-y-auto z-20">
//                                         {filteredPics.length > 0 ? filteredPics.map(user => (
//                                             <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-0 flex items-center justify-between group">
//                                                 <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div></div><UserPlus size={16} className="text-green-500"/>
//                                             </button>
//                                         )) : (
//                                             <div className="p-4 text-center text-xs text-gray-400">
//                                                 Tidak ditemukan. <button onClick={() => { setShowManualInput('pic'); setManualName(searchPic); }} className="text-blue-600 underline">Tambah Manual?</button>
//                                             </div>
//                                         )}
//                                     </div>
//                                 )}
//                             </div>
//                         ) : <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 rounded-lg border border-gray-200">Kuota PIC penuh.</div>}
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
    ShieldCheck, CheckSquare, Building, MapPin, Lock, UserCircle
} from 'lucide-react';
import { api, apiUpload } from '@/lib/api'; 
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'; // [FIX] Import axios agar tidak error "Cannot find name 'axios'"
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
    const [cmsCategories, setCmsCategories] = useState<string[]>([]);
    const [showManualInput, setShowManualInput] = useState<string | null>(null);
    const [manualName, setManualName] = useState('');
    const [manualEmail, setManualEmail] = useState('');

    const [selectedFacilitatorsList, setSelectedFacilitatorsList] = useState<any[]>([]);

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
        contactName: '', contactPhone: '', contactEmail: ''
    };

    const [formData, setFormData] = useState(defaultState);

    // --- LOAD ALL USERS ---
    useEffect(() => {
        const loadAllData = async () => {
            // Load Categories
            api('/api/content').then(res => {
                if (res && res.organizerCategories) setCmsCategories(res.organizerCategories);
            }).catch(() => {});

            // Load Users (Try Admin Route First)
            try {
                let res = await api('/api/admin/users?limit=3000').catch(() => null);
                if (!res) res = await api('/api/users?limit=3000').catch(() => ({ users: [] }));
                
                let cleanUsers = [];
                if (res.users && Array.isArray(res.users)) cleanUsers = res.users;
                else if (Array.isArray(res)) cleanUsers = res;
                
                if (cleanUsers.length === 0 && facilitators) cleanUsers = facilitators;

                setAllSystemUsers(cleanUsers);
            } catch (e) {
                console.error("Gagal load users, pakai fallback prop:", e);
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
                // Mode Create
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
            contactPhone: data.contact?.phone || data.creatorInfo?.contact || ''
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
            // [FIX] Menggunakan axios yang sudah diimport
            const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }, withCredentials: true });
            const rawUrl = response.data?.data?.url || response.data?.url || response.data?.secure_url;
            if (!rawUrl) throw new Error("Gagal dapat URL.");
            setFormData(prev => ({ ...prev, registrationTemplates: [...prev.registrationTemplates, { title: file.name, url: rawUrl }] }));
        } catch (err: any) { console.error(err); alert('Upload Gagal: ' + (err.response?.data?.message || err.message)); } finally { setUploadingTemplate(false); if (templateInputRef.current) templateInputRef.current.value = ''; }
    };

    const removeTemplate = (idx: number) => { if(!confirm("Hapus dokumen ini?")) return; setFormData(prev => ({ ...prev, registrationTemplates: prev.registrationTemplates.filter((_, i) => i !== idx) })); };
    const updateTemplateTitle = (idx: number, v: string) => { const t = [...formData.registrationTemplates]; t[idx].title = v; setFormData(prev => ({ ...prev, registrationTemplates: t })); };
    const handlePreSubmit = () => { if (!formData.title) return alert("Judul wajib diisi!"); setShowDisclaimer(true); };
    
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
                creatorInfo: formData.creatorInfo, contact: { name: formData.contactName, email: formData.contactEmail, phone: formData.contactPhone }
            };

            if (course?._id) await api(`/api/courses/${course._id}`, { method: 'PATCH', body: payload });
            else await api('/api/courses', { method: 'POST', body: payload });
            alert("Berhasil disimpan!"); onSuccess();
        } catch (err: any) { console.error(err); alert("Gagal: " + (err.response?.data?.message || err.message)); } finally { setLoading(false); setShowDisclaimer(false); }
    };

    // [FIX] ADMIN APPROVE INFO (Update field isInfoCompleted)
    const handleAdminApproveInfo = async () => {
        if(!confirm("Yakin data informasi pelatihan ini sudah valid?")) return;
        setLoading(true);
        try { 
            // Request ke backend untuk update isInfoCompleted
            await api(`/api/courses/${course._id}`, { 
                method: 'PATCH', 
                body: { isInfoCompleted: true } 
            }); 
            
            alert("✅ Informasi Disetujui! Gear Modul Terbuka."); 
            onSuccess(); 
            onClose(); 
        } catch (err: any) { 
            alert("Gagal: " + err.message); 
        } finally { 
            setLoading(false); 
        }
    };

    const handleAdminRejectInfo = async () => {
        const reason = prompt("Masukkan alasan pengembalian (revisi):");
        if (!reason) return;
        setLoading(true);
        try {
            await api(`/api/courses/${course._id}`, { 
                method: 'PATCH', 
                body: { status: 'revision', isInfoCompleted: false, rejectionReason: reason } 
            });
            alert("⚠️ Pelatihan dikembalikan untuk revisi.");
            onSuccess();
            onClose();
        } catch (e: any) { alert("Gagal: " + e.message); } finally { setLoading(false); }
    };

    // Search Logic
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
            
            {/* ADMIN ACTIONS: Approve/Reject Info */}
            {isSuperAdmin && !isInfoCompleted && course?._id && (
                <>
                    <button onClick={handleAdminRejectInfo} disabled={loading} className="px-5 py-2.5 rounded-xl bg-orange-100 text-orange-700 font-bold text-sm hover:bg-orange-200 border border-orange-200">
                        Revisi
                    </button>
                    <button onClick={handleAdminApproveInfo} disabled={loading} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-md flex items-center gap-2">
                        {loading ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18}/>} Setujui Informasi
                    </button>
                </>
            )}

            {/* SAVE BUTTON */}
            <button onClick={handlePreSubmit} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] shadow-lg flex items-center gap-2 disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Simpan Perubahan
            </button>
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
                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4"><div><label className="block text-sm font-bold text-gray-700 mb-1">Judul Pelatihan *</label><input required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" value={formData.title} onChange={e => handleChange('title', e.target.value)} placeholder="Contoh: Pelatihan Dasar KSR" aria-label="Judul"/></div><div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap *</label><div className="bg-white border rounded-lg overflow-hidden"><ReactQuill theme="snow" value={formData.description} onChange={val => handleChange('description', val)} className="h-64 mb-12" aria-label="Deskripsi"/></div></div></div>
                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-8"><div><label className="block text-sm font-bold text-gray-700 mb-2">Kategori Program</label><div className="flex gap-4"><div onClick={() => handleChange('programType', 'training')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border ${formData.programType === 'training' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}><div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'training' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'training' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div><span className="text-sm text-gray-700 font-medium">Diklat Resmi</span></div><div onClick={() => handleChange('programType', 'course')} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border ${formData.programType === 'course' ? 'bg-red-50 border-red-200' : 'border-transparent hover:bg-gray-50'}`}><div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.programType === 'course' ? 'border-red-600' : 'border-gray-400'}`}>{formData.programType === 'course' && <div className="w-2 h-2 bg-red-600 rounded-full"/>}</div><span className="text-sm text-gray-700 font-medium">Kursus Mandiri</span></div></div></div><div className="w-px bg-gray-200"></div><div className="flex items-center gap-3"><div onClick={() => handleChange('hasCertificate', !formData.hasCertificate)} className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.hasCertificate ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.hasCertificate && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}</div><span className="text-sm font-bold text-gray-700">Sertifikat Tersedia?</span></div></div></div>
                </div>
            )}
            
            {/* TAB 2 */}
            {activeTab === 'media' && (
                <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-3">Cover Image (Thumbnail) *</label><div className="flex gap-6 items-start"><div className="w-64 aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">{formData.thumbnailUrl ? <img src={getLocalDisplayUrl(formData.thumbnailUrl)} alt="Preview" className="w-full h-full object-cover" /> : <div className="text-center text-gray-400"><ImageIcon className="mx-auto mb-1"/><span className="text-xs">Belum ada gambar</span></div>}{uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}</div><div className="flex-1"><p className="text-xs text-gray-500 mb-3">Format: JPG, PNG. Ukuran disarankan 1280x720 px.</p><input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" aria-label="Input Gambar"/><button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center gap-2"><Upload size={16}/> Upload Gambar</button></div></div></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Video Promosi (Opsional)</label><input type="text" className="w-full p-2.5 border rounded-lg" placeholder="https://www.youtube.com/watch?v=..." value={formData.promoVideoUrl} onChange={e => handleChange('promoVideoUrl', e.target.value)} aria-label="URL Video"/></div></div>
            )}
            
            {/* TAB 3 */}
            {activeTab === 'registration' && (
                <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="grid grid-cols-2 gap-6"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4"><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar size={16}/> Periode Pendaftaran</label><div className="flex items-center gap-2 mb-2"><div onClick={() => handleChange('regIsForever', !formData.regIsForever)} className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.regIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.regIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-sm text-gray-600">Buka Selamanya</span></div></div>{!formData.regIsForever && (<div className="grid grid-cols-2 gap-3"><div><span className="text-xs text-gray-500 block mb-1">Mulai *</span><input type="date" className="w-full p-2 border rounded" value={formData.regStartDate} onChange={e => handleChange('regStartDate', e.target.value)} aria-label="Mulai Pendaftaran"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai *</span><input type="date" className="w-full p-2 border rounded" value={formData.regEndDate} onChange={e => handleChange('regEndDate', e.target.value)} aria-label="Selesai Pendaftaran"/></div></div>)}</div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4"><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock size={16}/> Periode Pelaksanaan</label><div className="flex items-center gap-2 mb-2"><div onClick={() => handleChange('execIsForever', !formData.execIsForever)} className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.execIsForever ? 'bg-red-600 border-red-600' : 'border-gray-400 bg-white'}`}>{formData.execIsForever && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-sm text-gray-600">Fleksibel</span></div></div>{!formData.execIsForever && (<div className="grid grid-cols-2 gap-3"><div><span className="text-xs text-gray-500 block mb-1">Mulai *</span><input type="date" className="w-full p-2 border rounded" value={formData.execStartDate} onChange={e => handleChange('execStartDate', e.target.value)} aria-label="Mulai Pelaksanaan"/></div><div><span className="text-xs text-gray-500 block mb-1">Selesai *</span><input type="date" className="w-full p-2 border rounded" value={formData.execEndDate} onChange={e => handleChange('execEndDate', e.target.value)} aria-label="Selesai Pelaksanaan"/></div></div>)}</div></div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 relative overflow-hidden"><div className="absolute top-0 right-0 p-4"><Lock className="text-gray-300" size={20}/></div><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Building size={16}/> Pelaksana Pelatihan *</label><div className="p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Wilayah / Organizer</p><h3 className="text-lg font-bold text-gray-800">{organizerDisplay}</h3><p className="text-xs text-gray-500 mt-1">Kode Wilayah: {regionCodeDisplay !== 'national' ? regionCodeDisplay : 'NASIONAL'}</p></div><p className="text-[10px] text-orange-600 flex items-center gap-1 bg-orange-50 p-2 rounded"><AlertCircle size={12}/> Pelaksana sudah ditentukan saat pengajuan dan tidak dapat diubah di sini.</p></div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3"><label className="text-sm font-bold text-gray-700">Metode Penerimaan Peserta</label><div className="flex gap-4 mb-4"><div onClick={() => handleChange('registrationMethod', 'auto')} className={`flex-1 p-3 border rounded cursor-pointer ${formData.registrationMethod==='auto'?'bg-green-50 border-green-500':''}`}><p className="font-bold text-sm">Otomatis (Langsung Aktif)</p><p className="text-xs text-gray-500">Peserta yang mendaftar akan langsung masuk ke list "Peserta Aktif".</p></div><div onClick={() => handleChange('registrationMethod', 'manual')} className={`flex-1 p-3 border rounded cursor-pointer ${formData.registrationMethod==='manual'?'bg-yellow-50 border-yellow-500':''}`}><p className="font-bold text-sm">Manual (Verifikasi Admin)</p><p className="text-xs text-gray-500">Peserta masuk list "Menunggu Verifikasi". Data upload peserta akan diverifikasi.</p></div></div></div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="flex justify-between items-start mb-4"><div><h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Dokumen Persyaratan (Template)</h3><p className="text-xs text-gray-500 mt-1">Upload file (PDF/Doc) yang harus didownload peserta.</p></div><div onClick={() => handleChange('requireDocs', !formData.requireDocs)} className="flex items-center gap-2 cursor-pointer"><div className={`w-4 h-4 rounded border flex items-center justify-center ${!formData.requireDocs?'bg-red-600 border-red-600':''}`}>{!formData.requireDocs && <div className="w-2 h-2 bg-white rounded-sm"></div>}</div><span className="text-xs font-bold text-gray-700">Tidak butuh dokumen</span></div></div>{formData.requireDocs && (<div className="space-y-3"><div className="flex justify-end"><input type="file" ref={templateInputRef} className="hidden" onChange={handleTemplateUpload} disabled={uploadingTemplate} aria-label="Input Template"/><button type="button" onClick={() => templateInputRef.current?.click()} disabled={uploadingTemplate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50"><Upload size={14}/> Upload Template Baru</button></div>{formData.registrationTemplates.map((item: any, idx: number) => (<div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg"><div className="p-2 bg-white rounded border border-gray-200 text-blue-600"><File size={20} /></div><div className="flex-1"><input type="text" className="text-sm font-bold text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 outline-none w-full" value={item.title} onChange={(e) => updateTemplateTitle(idx, e.target.value)} aria-label="Nama Dokumen"/><a href={getLocalDisplayUrl(item.url)} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5" onClick={(e) => e.stopPropagation()}><Download size={10} /> Lihat File Uploaded</a></div><button type="button" onClick={() => removeTemplate(idx)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" aria-label="Hapus Template"><Trash2 size={16} /></button></div>))}</div>)}</div>
                </div>
            )}
            
            {/* TAB 4 */}
            {activeTab === 'facilities' && (
                <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2"><div className="space-y-6"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-gray-700 mb-2">Harga / Investasi</label><div className="relative"><span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rp</span><input type="number" min="0" className="w-full pl-10 p-2 border rounded-lg" value={formData.price} onChange={e => handleChange('price', Number(e.target.value))} placeholder="0" aria-label="Harga"/></div><p className="text-xs text-gray-500 mt-1">Isi 0 untuk GRATIS.</p></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-gray-600 mb-1">Estimasi Durasi (Menit)</label><input type="number" className="w-full p-2 border rounded" value={formData.estimatedDuration} disabled aria-label="Durasi"/></div><div><label className="block text-xs font-bold text-gray-600 mb-1">Total JP (Otomatis)</label><input type="number" className="w-full p-2 border rounded" value={formData.totalJp} disabled aria-label="Total JP"/></div></div></div></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-3">Daftar Fasilitas *</label><div className="flex gap-2 mb-4"><input type="text" className="flex-1 p-2 border rounded text-sm" placeholder="Contoh: Akses Selamanya" value={newFacility} onChange={e => setNewFacility(e.target.value)} aria-label="Fasilitas"/><button type="button" onClick={addFacility} className="bg-gray-900 text-white p-2 rounded" aria-label="Tambah"><Plus size={18}/></button></div><div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-y-auto max-h-64 space-y-2">{formData.facilities.map((item: string, idx: number) => (<div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm"><span className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {item}</span><button type="button" onClick={() => removeFacility(idx)} className="text-gray-400 hover:text-red-500" aria-label="Hapus"><X size={14}/></button></div>))}</div></div></div>
            )}

            {/* TAB 5 */}
            {activeTab === 'team' && (
                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Users size={18}/> Pilih Tim Fasilitator</h3>
                        <p className="text-xs text-gray-500 mb-4">*Mencakup Admin, Superadmin, dan Fasilitator.</p>
                        
                        {selectedFacilitatorsList.length > 0 && (
                            <div className="mb-4 space-y-2">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tim Terpilih ({selectedFacilitatorsList.length})</p>
                                {selectedFacilitatorsList.map(fac => (
                                    <div key={fac._id || fac.id} className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100 animate-in slide-in-from-top-1">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white text-green-600 flex items-center justify-center font-bold text-xs border border-green-200">{fac.name?.charAt(0)}</div>
                                            <div>
                                                <span className="text-sm font-bold text-green-900 block">{fac.name}</span>
                                                <span className="text-[10px] text-green-700 flex items-center gap-1">
                                                    <MapPin size={10}/> {getUserLocation(fac)}
                                                </span>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => removeFacilitator(fac._id || fac.id)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus" aria-label="Hapus"><X size={14}/></button>
                                    </div>
                                ))}
                            </div>
                        )}

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
                                        <div className="p-4 text-center text-xs text-gray-400">
                                            Tidak ditemukan. <button onClick={() => { setShowManualInput('facilitator'); setManualName(searchFacilitator); }} className="text-blue-600 underline">Tambah Manual?</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><AlertCircle size={18}/> Penanggung Jawab (PIC)</h3>
                        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between"><div><p className="text-xs font-bold text-blue-600 uppercase mb-1">Pembuat Pelatihan (Otomatis)</p><div className="font-bold text-gray-800">{formData.creatorInfo?.name || currentUser?.name || '-'}</div><div className="text-xs text-gray-600">{formData.creatorInfo?.email || currentUser?.email || '-'}</div></div><div className="px-3 py-1 bg-white rounded border border-blue-200 text-xs font-bold text-blue-700">Admin</div></div>
                        <div className="space-y-2 mb-4">
                            <label className="text-sm font-bold text-gray-700 block">Daftar PIC Tambahan</label>
                            {formData.pics.map((pic: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in slide-in-from-top-1">
                                    <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">{pic.name?.charAt(0)}</div><div><span className="text-sm font-bold text-blue-900 block">{pic.name}</span><div className="flex gap-2"><span className="text-[10px] text-blue-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-full border border-blue-100">PIC</span><span className="text-[10px] text-gray-500">{pic.email}</span></div></div></div><button type="button" onClick={() => removePic(idx)} className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm" title="Hapus"><X size={14}/></button>
                                </div>
                            ))}
                        </div>
                        {formData.pics.length < 3 ? (
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                                <input type="text" placeholder="Cari PIC (Ketik nama)..." className="w-full pl-9 p-2.5 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={searchPic} onChange={(e) => setSearchPic(e.target.value)} aria-label="Cari PIC"/>
                                {searchPic && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl max-h-60 overflow-y-auto z-20">
                                        {filteredPics.length > 0 ? filteredPics.map(user => (
                                            <button key={user._id || user.id} type="button" onClick={() => handleAddPicFromSearch(user)} className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-0 flex items-center justify-between group">
                                                <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">{user.name?.charAt(0)}</div><div><p className="text-sm font-bold text-gray-700">{user.name}</p><p className="text-[10px] text-gray-400">{user.email} • {user.role}</p></div></div><UserPlus size={16} className="text-green-500"/>
                                            </button>
                                        )) : (
                                            <div className="p-4 text-center text-xs text-gray-400">
                                                Tidak ditemukan. <button onClick={() => { setShowManualInput('pic'); setManualName(searchPic); }} className="text-blue-600 underline">Tambah Manual?</button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 rounded-lg border border-gray-200">Kuota PIC penuh.</div>}
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
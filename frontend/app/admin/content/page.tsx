// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { useRouter } from 'next/navigation';
// // // // import { api, getImageUrl } from '@/lib/api';
// // // // import Protected from '@/components/Protected'; 
// // // // import { Save, Plus, X, UploadCloud, Layout, List, Trash, Image as ImageIcon, Loader2, Home, BookOpen, Newspaper, MessageSquare } from 'lucide-react';

// // // // // --- TIPE DATA ---
// // // // interface Feature { 
// // // //     title: string; 
// // // //     description: string; 
// // // // }

// // // // interface ForumCategory { 
// // // //     name: string; 
// // // //     iconUrl: string; 
// // // // }

// // // // interface PageConfig {
// // // //     title: string;
// // // //     description: string;
// // // //     slides: string[];
// // // // }

// // // // interface FormDataState {
// // // //   // HOME (DEFAULT)
// // // //   heroTitle: string;
// // // //   heroDescription: string;
// // // //   heroBgUrl: string;
// // // //   faviconUrl: string;
// // // //   slides: string[];
// // // //   features: Feature[];
  
// // // //   // PAGE CONFIGS
// // // //   coursesPage: PageConfig;
// // // //   blogPage: PageConfig;
// // // //   forumPage: PageConfig; // [BARU]

// // // //   // FOOTER & CATS
// // // //   footer: {
// // // //     about: string;
// // // //     address: string;
// // // //     phone: string;
// // // //     email: string;
// // // //     website: string;
// // // //     copyright: string;
// // // //     logoUrl: string; 
// // // //     socials: {
// // // //       facebook: string;
// // // //       instagram: string;
// // // //       twitter: string;
// // // //       youtube: string;
// // // //       [key: string]: string;
// // // //     };
// // // //   };
// // // //   forumCategories: ForumCategory[];
// // // //   courseCategories: string[];
// // // //   libraryCategories: string[];
// // // // }

// // // // export default function AdminContentPage() {
// // // //   const router = useRouter();
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [saving, setSaving] = useState(false);
  
// // // //   // Menambah 'forum' ke activeTab
// // // //   const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'blog' | 'forum'>('home');
  
// // // //   // Loading States Upload
// // // //   const [uploadingSlide, setUploadingSlide] = useState(false);
// // // //   const [uploadingBg, setUploadingBg] = useState(false);
// // // //   const [uploadingFavicon, setUploadingFavicon] = useState(false);
// // // //   const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false);
// // // //   const [uploadingForumIcon, setUploadingForumIcon] = useState(false);

// // // //   // Input Tambahan Kategori
// // // //   const [newForumCat, setNewForumCat] = useState({ name: '', iconUrl: '' });
// // // //   const [newCourseCat, setNewCourseCat] = useState('');
// // // //   const [newLibCat, setNewLibCat] = useState('');

// // // //   // Main State
// // // //   const [formData, setFormData] = useState<FormDataState>({
// // // //     heroTitle: '',
// // // //     heroDescription: '',
// // // //     heroBgUrl: '',
// // // //     faviconUrl: '',
// // // //     slides: [],
// // // //     features: [ 
// // // //         { title: '', description: '' }, 
// // // //         { title: '', description: '' }, 
// // // //         { title: '', description: '' } 
// // // //     ],
// // // //     coursesPage: { title: '', description: '', slides: [] },
// // // //     blogPage: { title: '', description: '', slides: [] },
// // // //     forumPage: { title: '', description: '', slides: [] }, // Init Kosong
// // // //     footer: {
// // // //         about: '', address: '', phone: '', email: '', website: '', copyright: '', logoUrl: '',
// // // //         socials: { facebook: '', instagram: '', twitter: '', youtube: '' }
// // // //     },
// // // //     forumCategories: [],
// // // //     courseCategories: [],
// // // //     libraryCategories: []
// // // //   });

// // // //   useEffect(() => {
// // // //     loadContent();
// // // //   }, []);

// // // //   const loadContent = async () => {
// // // //     try {
// // // //       const data = await api('/api/content');
// // // //       if (data) {
// // // //           setFormData({
// // // //             ...data,
// // // //             // Fallback value jika data baru belum ada di DB lama
// // // //             coursesPage: data.coursesPage || { title: 'Katalog Pelatihan', description: '', slides: [] },
// // // //             blogPage: data.blogPage || { title: 'Cerita Relawan', description: '', slides: [] },
// // // //             forumPage: data.forumPage || { title: 'Forum Diskusi Komunitas', description: '', slides: [] }, // Fallback Forum
// // // //             features: data.features?.length ? data.features : [ 
// // // //                 { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } 
// // // //             ],
// // // //             footer: {
// // // //                 ...data.footer,
// // // //                 socials: { 
// // // //                     facebook: '', instagram: '', twitter: '', youtube: '', 
// // // //                     ...(data.footer?.socials || {}) 
// // // //                 }
// // // //             }
// // // //           });
// // // //       }
// // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // //   };

// // // //   // --- HANDLERS UPLOAD ---
// // // //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void, loader: (v: boolean) => void) => {
// // // //     if (!e.target.files?.[0]) return;
// // // //     loader(true);
// // // //     try {
// // // //       const fd = new FormData();
// // // //       fd.append('file', e.target.files[0]);
      
// // // //       const res = await api('/api/upload', {
// // // //           method: 'POST',
// // // //           body: fd
// // // //       });

// // // //       const newUrl = res.url || res.file?.url;
// // // //       if (newUrl) setter(newUrl);
// // // //     } catch (e: any) { alert(e.message); } finally { loader(false); }
// // // //   };

// // // //   const handleUploadSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //       handleUpload(e, (url) => {
// // // //           if (activeTab === 'home') setFormData(p => ({...p, slides: [...p.slides, url]}));
// // // //           else if (activeTab === 'courses') setFormData(p => ({...p, coursesPage: {...p.coursesPage, slides: [...p.coursesPage.slides, url]}}));
// // // //           else if (activeTab === 'blog') setFormData(p => ({...p, blogPage: {...p.blogPage, slides: [...p.blogPage.slides, url]}}));
// // // //           else if (activeTab === 'forum') setFormData(p => ({...p, forumPage: {...p.forumPage, slides: [...p.forumPage.slides, url]}}));
// // // //       }, setUploadingSlide);
// // // //   }
  
// // // //   const handleUploadFavicon = (e: React.ChangeEvent<HTMLInputElement>) => 
// // // //       handleUpload(e, (url) => setFormData(p => ({...p, faviconUrl: url})), setUploadingFavicon);
  
// // // //   const handleUploadFooterLogo = (e: React.ChangeEvent<HTMLInputElement>) => 
// // // //       handleUpload(e, (url) => setFormData(p => ({...p, footer: {...p.footer, logoUrl: url}})), setUploadingFooterLogo);

// // // //   const handleUploadForumIcon = (e: React.ChangeEvent<HTMLInputElement>) => 
// // // //       handleUpload(e, (url) => setNewForumCat(p => ({...p, iconUrl: url})), setUploadingForumIcon);

// // // //   // --- HANDLERS TEXT ---
// // // //   const handleTextChange = (field: 'title' | 'description', value: string) => {
// // // //       if (activeTab === 'home') {
// // // //           if (field === 'title') setFormData(p => ({...p, heroTitle: value}));
// // // //           else setFormData(p => ({...p, heroDescription: value}));
// // // //       } else if (activeTab === 'courses') {
// // // //           setFormData(p => ({...p, coursesPage: {...p.coursesPage, [field]: value}}));
// // // //       } else if (activeTab === 'blog') {
// // // //           setFormData(p => ({...p, blogPage: {...p.blogPage, [field]: value}}));
// // // //       } else if (activeTab === 'forum') {
// // // //           setFormData(p => ({...p, forumPage: {...p.forumPage, [field]: value}}));
// // // //       }
// // // //   }

// // // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // // //       const newFeatures = [...formData.features];
// // // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // // //       setFormData({ ...formData, features: newFeatures });
// // // //   };
// // // //   const handleFooterChange = (field: string, value: string) => {
// // // //       setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
// // // //   };
// // // //   const handleSocialChange = (platform: string, value: string) => {
// // // //       setFormData(prev => ({ 
// // // //           ...prev, 
// // // //           footer: { ...prev.footer, socials: { ...prev.footer.socials, [platform]: value } } 
// // // //       }));
// // // //   };

// // // //   // --- HANDLERS ITEMS ---
// // // //   const removeSlide = (idx: number) => { 
// // // //       if(!confirm("Hapus slide ini?")) return;
// // // //       if (activeTab === 'home') setFormData(p => ({ ...p, slides: p.slides.filter((_, i) => i !== idx) }));
// // // //       else if (activeTab === 'courses') setFormData(p => ({ ...p, coursesPage: {...p.coursesPage, slides: p.coursesPage.slides.filter((_, i) => i !== idx)} }));
// // // //       else if (activeTab === 'blog') setFormData(p => ({ ...p, blogPage: {...p.blogPage, slides: p.blogPage.slides.filter((_, i) => i !== idx)} }));
// // // //       else if (activeTab === 'forum') setFormData(p => ({ ...p, forumPage: {...p.forumPage, slides: p.forumPage.slides.filter((_, i) => i !== idx)} }));
// // // //   };

// // // //   // Kategori handlers tetap sama
// // // //   const addForumCat = () => { if (!newForumCat.name) return; setFormData(p => ({ ...p, forumCategories: [...p.forumCategories, newForumCat] })); setNewForumCat({ name: '', iconUrl: '' }); };
// // // //   const removeForumCat = (idx: number) => setFormData(p => ({ ...p, forumCategories: p.forumCategories.filter((_, i) => i !== idx) }));
// // // //   const addCourseCat = () => { if (!newCourseCat) return; setFormData(p => ({ ...p, courseCategories: [...p.courseCategories, newCourseCat] })); setNewCourseCat(''); };
// // // //   const removeCourseCat = (idx: number) => setFormData(p => ({ ...p, courseCategories: p.courseCategories.filter((_, i) => i !== idx) }));
// // // //   const addLibCat = () => { if (!newLibCat) return; setFormData(p => ({ ...p, libraryCategories: [...p.libraryCategories, newLibCat] })); setNewLibCat(''); };
// // // //   const removeLibCat = (idx: number) => setFormData(p => ({ ...p, libraryCategories: p.libraryCategories.filter((_, i) => i !== idx) }));

// // // //   // --- GET CURRENT VALUES ---
// // // //   const getCurrent = () => {
// // // //       if (activeTab === 'home') return { title: formData.heroTitle, desc: formData.heroDescription, slides: formData.slides };
// // // //       if (activeTab === 'courses') return { title: formData.coursesPage.title, desc: formData.coursesPage.description, slides: formData.coursesPage.slides };
// // // //       if (activeTab === 'blog') return { title: formData.blogPage.title, desc: formData.blogPage.description, slides: formData.blogPage.slides };
// // // //       // Default to forum
// // // //       return { title: formData.forumPage.title, desc: formData.forumPage.description, slides: formData.forumPage.slides };
// // // //   }

// // // //   // --- SAVE ---
// // // //   const handleSave = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     if(!confirm("Simpan perubahan?")) return;

// // // //     setSaving(true);
// // // //     try {
// // // //       await api('/api/content', { 
// // // //           method: 'PUT', 
// // // //           body: JSON.stringify(formData) 
// // // //       });
// // // //       alert("✅ Pengaturan Berhasil Disimpan!");
// // // //       window.location.reload(); 
// // // //     } catch (e: any) { alert("Gagal: " + e.message); } finally { setSaving(false); }
// // // //   };

// // // //   if (loading) return <div className="p-20 text-center flex justify-center"><Loader2 className="animate-spin text-red-700"/></div>;

// // // //   const currentData = getCurrent();

// // // //   return (
// // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // //       <div className="min-h-screen bg-gray-50 pb-24 font-sans">
        
// // // //         {/* HEADER */}
// // // //         <div className="flex justify-between items-center mb-6 bg-white px-6 py-4 shadow-sm border-b sticky top-0 z-50">
// // // //             <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
// // // //                 <Layout size={20}/> CMS Pengaturan Konten
// // // //             </h1>
// // // //             <button 
// // // //                 onClick={handleSave} 
// // // //                 disabled={saving} 
// // // //                 className="bg-[#990000] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#7f0000] disabled:opacity-50 flex items-center gap-2 transition-all"
// // // //                 title="Simpan Perubahan"
// // // //                 aria-label="Simpan Perubahan"
// // // //             >
// // // //                 {saving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>}
// // // //                 {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
// // // //             </button>
// // // //         </div>
        
// // // //         <div className="max-w-5xl mx-auto px-6 space-y-8 mt-8">
            
// // // //             {/* TAB NAVIGATION */}
// // // //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 flex gap-2 overflow-x-auto">
// // // //                 <button 
// // // //                     onClick={() => setActiveTab('home')} 
// // // //                     className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'home' ? 'bg-red-50 text-red-700 border border-red-100 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
// // // //                     title="Edit Halaman Depan"
// // // //                     aria-label="Edit Halaman Depan"
// // // //                 >
// // // //                     <Home size={18}/> Halaman Depan
// // // //                 </button>
// // // //                 <button 
// // // //                     onClick={() => setActiveTab('courses')} 
// // // //                     className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'courses' ? 'bg-red-50 text-red-700 border border-red-100 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
// // // //                     title="Edit Katalog Kelas"
// // // //                     aria-label="Edit Katalog Kelas"
// // // //                 >
// // // //                     <BookOpen size={18}/> Katalog Kelas
// // // //                 </button>
// // // //                 <button 
// // // //                     onClick={() => setActiveTab('blog')} 
// // // //                     className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'blog' ? 'bg-red-50 text-red-700 border border-red-100 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
// // // //                     title="Edit Blog"
// // // //                     aria-label="Edit Blog"
// // // //                 >
// // // //                     <Newspaper size={18}/> Blog / Cerita
// // // //                 </button>
// // // //                 <button 
// // // //                     onClick={() => setActiveTab('forum')} 
// // // //                     className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'forum' ? 'bg-red-50 text-red-700 border border-red-100 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
// // // //                     title="Edit Forum Diskusi"
// // // //                     aria-label="Edit Forum Diskusi"
// // // //                 >
// // // //                     <MessageSquare size={18}/> Forum Diskusi
// // // //                 </button>
// // // //             </div>

// // // //             {/* 1. HERO & SLIDES (DYNAMIC PER TAB) */}
// // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex justify-between items-center">
// // // //                     <span>1. Pengaturan Header ({activeTab.toUpperCase()})</span>
// // // //                     <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">Mengedit Halaman: {activeTab}</span>
// // // //                 </h2>
                
// // // //                 <div className="grid md:grid-cols-2 gap-6 mb-6">
// // // //                     <div className="space-y-4">
// // // //                         <div>
// // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama</label>
// // // //                             <input 
// // // //                                 className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" 
// // // //                                 value={currentData.title} 
// // // //                                 onChange={e => handleTextChange('title', e.target.value)} 
// // // //                                 title="Judul Utama Header"
// // // //                                 aria-label="Judul Utama Header"
// // // //                             />
// // // //                         </div>
// // // //                         <div>
// // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
// // // //                             <textarea 
// // // //                                 rows={3} 
// // // //                                 className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" 
// // // //                                 value={currentData.desc} 
// // // //                                 onChange={e => handleTextChange('description', e.target.value)} 
// // // //                                 title="Deskripsi Singkat Header"
// // // //                                 aria-label="Deskripsi Singkat Header"
// // // //                             />
// // // //                         </div>
// // // //                     </div>
                    
// // // //                     {/* Upload Favicon (Hanya di Tab Home) */}
// // // //                     {activeTab === 'home' && (
// // // //                         <div className="border-2 border-dashed p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[100px] rounded text-center">
// // // //                             <label className="block text-sm font-bold text-gray-700 mb-2">Favicon Website</label>
// // // //                             {formData.faviconUrl ? <img src={getImageUrl(formData.faviconUrl)} className="h-12 w-12 mb-2 object-contain" alt="Favicon"/> : <ImageIcon size={32} className="text-gray-400 mb-2"/>}
// // // //                             <label className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700 shadow-md">
// // // //                                 {uploadingFavicon ? 'Mengupload...' : 'Upload Favicon'}
// // // //                                 <input type="file" className="hidden" onChange={handleUploadFavicon} disabled={uploadingFavicon} title="Upload Favicon" aria-label="Upload Favicon"/>
// // // //                             </label>
// // // //                         </div>
// // // //                     )}
// // // //                 </div>

// // // //                 <h3 className="text-sm font-bold text-gray-700 mb-2">Slide Gambar ({currentData.slides.length})</h3>
// // // //                 <div className="flex gap-4 overflow-x-auto pb-2">
// // // //                     {currentData.slides.map((url, idx) => (
// // // //                         <div key={idx} className="relative w-40 h-24 flex-shrink-0 group rounded-lg overflow-hidden border">
// // // //                             <img src={getImageUrl(url)} className="w-full h-full object-cover" alt="Slide"/>
// // // //                             <button 
// // // //                                 type="button" 
// // // //                                 onClick={() => removeSlide(idx)} 
// // // //                                 className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700"
// // // //                                 title="Hapus Slide"
// // // //                                 aria-label="Hapus Slide"
// // // //                             >
// // // //                                 <Trash size={12}/>
// // // //                             </button>
// // // //                         </div>
// // // //                     ))}
// // // //                     <label className="w-40 h-24 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 rounded-lg flex-shrink-0 text-xs text-gray-500 font-bold hover:border-red-300">
// // // //                         <Plus size={20} className="mb-1 text-gray-400"/>
// // // //                         {uploadingSlide ? 'Uploading...' : 'Tambah Slide'}
// // // //                         <input type="file" className="hidden" onChange={handleUploadSlide} disabled={uploadingSlide} title="Upload Slide Baru" aria-label="Upload Slide Baru"/>
// // // //                     </label>
// // // //                 </div>
// // // //             </div>

// // // //             {/* 2. FEATURES (HANYA HOME) */}
// // // //             {activeTab === 'home' && (
// // // //                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // //                     <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Fitur Utama (Info Cards)</h2>
// // // //                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // //                         {formData.features.map((feat, idx) => (
// // // //                             <div key={idx} className="p-3 border rounded-lg bg-gray-50">
// // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Kartu #{idx + 1}</label>
// // // //                                 <input 
// // // //                                     className="w-full border rounded p-2 text-sm mb-2" 
// // // //                                     value={feat.title} 
// // // //                                     onChange={e => handleFeatureChange(idx, 'title', e.target.value)} 
// // // //                                     placeholder="Judul" 
// // // //                                     title={`Judul Fitur ${idx+1}`}
// // // //                                     aria-label={`Judul Fitur ${idx+1}`}
// // // //                                 />
// // // //                                 <textarea 
// // // //                                     rows={2} 
// // // //                                     className="w-full border rounded p-2 text-sm" 
// // // //                                     value={feat.description} 
// // // //                                     onChange={e => handleFeatureChange(idx, 'description', e.target.value)} 
// // // //                                     placeholder="Deskripsi" 
// // // //                                     title={`Deskripsi Fitur ${idx+1}`}
// // // //                                     aria-label={`Deskripsi Fitur ${idx+1}`}
// // // //                                 />
// // // //                             </div>
// // // //                         ))}
// // // //                     </div>
// // // //                 </div>
// // // //             )}

// // // //             {/* 3. FOOTER SETTINGS (GLOBAL) */}
// // // //             {activeTab === 'home' && (
// // // //                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // //                     <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Pengaturan Footer Global</h2>
// // // //                     <div className="grid md:grid-cols-2 gap-6">
// // // //                         <div className="space-y-4">
// // // //                             <div>
// // // //                                 <label className="block text-sm font-bold text-gray-700 mb-2">Logo Footer</label>
// // // //                                 <div className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50">
// // // //                                     {formData.footer.logoUrl ? <img src={getImageUrl(formData.footer.logoUrl)} className="h-10 w-auto object-contain" alt="Logo"/> : <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center"><ImageIcon size={20}/></div>}
// // // //                                     <label className="cursor-pointer bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-700">
// // // //                                         {uploadingFooterLogo ? '...' : 'Ganti Logo'}
// // // //                                         <input type="file" className="hidden" onChange={handleUploadFooterLogo} disabled={uploadingFooterLogo} title="Upload Logo Footer" aria-label="Upload Logo Footer"/>
// // // //                                     </label>
// // // //                                 </div>
// // // //                             </div>
// // // //                             <div>
// // // //                                 <label className="block text-xs font-bold mb-1">Tentang</label>
// // // //                                 <textarea 
// // // //                                     rows={2} 
// // // //                                     className="w-full border rounded p-2 text-sm" 
// // // //                                     value={formData.footer.about} 
// // // //                                     onChange={e => handleFooterChange('about', e.target.value)}
// // // //                                     title="Tentang Footer"
// // // //                                     aria-label="Tentang Footer"
// // // //                                 />
// // // //                             </div>
// // // //                             <div>
// // // //                                 <label className="block text-xs font-bold mb-1">Alamat</label>
// // // //                                 <textarea 
// // // //                                     rows={2} 
// // // //                                     className="w-full border rounded p-2 text-sm" 
// // // //                                     value={formData.footer.address} 
// // // //                                     onChange={e => handleFooterChange('address', e.target.value)}
// // // //                                     title="Alamat Footer"
// // // //                                     aria-label="Alamat Footer"
// // // //                                 />
// // // //                             </div>
// // // //                         </div>
// // // //                         <div className="space-y-4">
// // // //                             <div className="grid grid-cols-2 gap-2">
// // // //                                 <div>
// // // //                                     <label className="block text-xs font-bold mb-1">Telepon</label>
// // // //                                     <input 
// // // //                                         className="w-full border rounded p-2 text-sm" 
// // // //                                         value={formData.footer.phone} 
// // // //                                         onChange={e => handleFooterChange('phone', e.target.value)}
// // // //                                         title="Telepon Footer"
// // // //                                         aria-label="Telepon Footer"
// // // //                                     />
// // // //                                 </div>
// // // //                                 <div>
// // // //                                     <label className="block text-xs font-bold mb-1">Email</label>
// // // //                                     <input 
// // // //                                         className="w-full border rounded p-2 text-sm" 
// // // //                                         value={formData.footer.email} 
// // // //                                         onChange={e => handleFooterChange('email', e.target.value)}
// // // //                                         title="Email Footer"
// // // //                                         aria-label="Email Footer"
// // // //                                     />
// // // //                                 </div>
// // // //                             </div>
// // // //                             <div>
// // // //                                 <label className="block text-xs font-bold mb-1">Copyright</label>
// // // //                                 <input 
// // // //                                     className="w-full border rounded p-2 text-sm" 
// // // //                                     value={formData.footer.copyright} 
// // // //                                     onChange={e => handleFooterChange('copyright', e.target.value)}
// // // //                                     title="Copyright Footer"
// // // //                                     aria-label="Copyright Footer"
// // // //                                 />
// // // //                             </div>
// // // //                             <div className="bg-gray-50 p-3 rounded border">
// // // //                                 <h3 className="text-xs font-bold mb-2">Social Media</h3>
// // // //                                 <div className="grid grid-cols-2 gap-2">
// // // //                                     {['facebook','instagram','twitter','youtube'].map(soc => (
// // // //                                         <div key={soc}>
// // // //                                             <input 
// // // //                                                 className="w-full border rounded p-1.5 text-xs" 
// // // //                                                 placeholder={soc} 
// // // //                                                 value={formData.footer.socials?.[soc] || ''} 
// // // //                                                 onChange={e => handleSocialChange(soc, e.target.value)}
// // // //                                                 title={`Link ${soc}`}
// // // //                                                 aria-label={`Link ${soc}`}
// // // //                                             />
// // // //                                         </div>
// // // //                                     ))}
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             )}

// // // //             {/* 4. MANAJEMEN KATEGORI (HANYA HOME) */}
// // // //             {activeTab === 'home' && (
// // // //                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10">
// // // //                     <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2"><List size={18}/> 4. Manajemen Kategori</h2>
// // // //                     <div className="grid md:grid-cols-3 gap-6">
                        
// // // //                         {/* Course Categories */}
// // // //                         <div className="bg-green-50 p-4 rounded-xl border border-green-100">
// // // //                             <h3 className="text-sm font-bold text-green-800 mb-2">Kategori Pelatihan</h3>
// // // //                             <div className="flex gap-2 mb-2">
// // // //                                 <input 
// // // //                                     className="flex-1 border p-1.5 text-sm rounded outline-none" 
// // // //                                     value={newCourseCat} 
// // // //                                     onChange={e=>setNewCourseCat(e.target.value)} 
// // // //                                     placeholder="Nama Kategori" 
// // // //                                     title="Nama Kategori Pelatihan Baru"
// // // //                                     aria-label="Nama Kategori Pelatihan Baru"
// // // //                                 />
// // // //                                 <button 
// // // //                                     type="button" 
// // // //                                     onClick={addCourseCat} 
// // // //                                     className="bg-green-600 text-white px-3 rounded hover:bg-green-700 font-bold"
// // // //                                     title="Tambah Kategori Pelatihan"
// // // //                                     aria-label="Tambah Kategori Pelatihan"
// // // //                                 >
// // // //                                     <Plus size={16}/>
// // // //                                 </button>
// // // //                             </div>
// // // //                             <div className="flex flex-wrap gap-2">
// // // //                                 {formData.courseCategories.map((c,i)=>(
// // // //                                     <span key={i} className="bg-white border border-green-200 text-green-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
// // // //                                         {c} 
// // // //                                         <button 
// // // //                                             onClick={()=>removeCourseCat(i)} 
// // // //                                             className="text-red-400 hover:text-red-600 ml-1"
// // // //                                             title={`Hapus Kategori ${c}`}
// // // //                                             aria-label={`Hapus Kategori ${c}`}
// // // //                                         >
// // // //                                             <X size={12}/>
// // // //                                         </button>
// // // //                                     </span>
// // // //                                 ))}
// // // //                             </div>
// // // //                         </div>

// // // //                         {/* Forum Categories */}
// // // //                         <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
// // // //                             <h3 className="text-sm font-bold text-blue-800 mb-2">Kategori Forum</h3>
// // // //                             <div className="flex gap-2 mb-2 items-center">
// // // //                                 <input 
// // // //                                     className="flex-1 border p-1.5 text-sm rounded outline-none" 
// // // //                                     value={newForumCat.name} 
// // // //                                     onChange={e=>setNewForumCat({...newForumCat, name:e.target.value})} 
// // // //                                     placeholder="Nama Forum" 
// // // //                                     title="Nama Kategori Forum Baru"
// // // //                                     aria-label="Nama Kategori Forum Baru"
// // // //                                 />
// // // //                                 <label className="bg-white border p-1.5 rounded cursor-pointer text-xs hover:bg-gray-50">
// // // //                                     {uploadingForumIcon ? <Loader2 size={16} className="animate-spin text-blue-500"/> : <UploadCloud size={16} className="text-blue-500"/>}
// // // //                                     <input type="file" className="hidden" onChange={handleUploadForumIcon} title="Upload Icon Forum" aria-label="Upload Icon Forum"/>
// // // //                                 </label>
// // // //                                 <button 
// // // //                                     type="button" 
// // // //                                     onClick={addForumCat} 
// // // //                                     className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 font-bold"
// // // //                                     title="Tambah Kategori Forum"
// // // //                                     aria-label="Tambah Kategori Forum"
// // // //                                 >
// // // //                                     <Plus size={16}/>
// // // //                                 </button>
// // // //                             </div>
// // // //                             <div className="flex flex-wrap gap-2">
// // // //                                 {formData.forumCategories.map((c,i)=>(
// // // //                                     <span key={i} className="bg-white border border-blue-200 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
// // // //                                         {c.name} 
// // // //                                         <button 
// // // //                                             onClick={()=>removeForumCat(i)} 
// // // //                                             className="text-red-400 hover:text-red-600 ml-1"
// // // //                                             title={`Hapus Kategori ${c.name}`}
// // // //                                             aria-label={`Hapus Kategori ${c.name}`}
// // // //                                         >
// // // //                                             <X size={12}/>
// // // //                                         </button>
// // // //                                     </span>
// // // //                                 ))}
// // // //                             </div>
// // // //                         </div>

// // // //                         {/* Library Categories */}
// // // //                         <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
// // // //                             <h3 className="text-sm font-bold text-purple-800 mb-2">Kategori Perpustakaan</h3>
// // // //                             <div className="flex gap-2 mb-2">
// // // //                                 <input 
// // // //                                     className="flex-1 border p-1.5 text-sm rounded outline-none" 
// // // //                                     value={newLibCat} 
// // // //                                     onChange={e=>setNewLibCat(e.target.value)} 
// // // //                                     placeholder="Kategori Buku" 
// // // //                                     title="Nama Kategori Perpustakaan Baru"
// // // //                                     aria-label="Nama Kategori Perpustakaan Baru"
// // // //                                 />
// // // //                                 <button 
// // // //                                     type="button" 
// // // //                                     onClick={addLibCat} 
// // // //                                     className="bg-purple-600 text-white px-3 rounded hover:bg-purple-700 font-bold"
// // // //                                     title="Tambah Kategori Perpustakaan"
// // // //                                     aria-label="Tambah Kategori Perpustakaan"
// // // //                                 >
// // // //                                     <Plus size={16}/>
// // // //                                 </button>
// // // //                             </div>
// // // //                             <div className="flex flex-wrap gap-2">
// // // //                                 {formData.libraryCategories.map((c,i)=>(
// // // //                                     <span key={i} className="bg-white border border-purple-200 text-purple-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
// // // //                                         {c} 
// // // //                                         <button 
// // // //                                             onClick={()=>removeLibCat(i)} 
// // // //                                             className="text-red-400 hover:text-red-600 ml-1"
// // // //                                             title={`Hapus Kategori ${c}`}
// // // //                                             aria-label={`Hapus Kategori ${c}`}
// // // //                                         >
// // // //                                             <X size={12}/>
// // // //                                         </button>
// // // //                                     </span>
// // // //                                 ))}
// // // //                             </div>
// // // //                         </div>

// // // //                     </div>
// // // //                 </div>
// // // //             )}

// // // //         </div>
// // // //       </div>
// // // //     </Protected>
// // // //   );
// // // // }


// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // import { api, getImageUrl, apiUpload } from '@/lib/api'; // Pastikan apiUpload diimport
// // // import Protected from '@/components/Protected'; 
// // // import { Save, Plus, X, UploadCloud, Layout, List, Trash, Image as ImageIcon, Loader2, Home, BookOpen, Newspaper, MessageSquare, Book } from 'lucide-react';

// // // // --- TIPE DATA ---
// // // interface Feature { title: string; description: string; }
// // // interface ForumCategory { name: string; iconUrl: string; }
// // // interface PageConfig { title: string; description: string; slides: string[]; }

// // // interface FormDataState {
// // //   heroTitle: string; heroDescription: string; heroBgUrl: string; faviconUrl: string; slides: string[];
// // //   features: Feature[];
// // //   coursesPage: PageConfig;
// // //   blogPage: PageConfig;
// // //   forumPage: PageConfig;
// // //   libraryPage: PageConfig;
// // //   footer: {
// // //     about: string; address: string; phone: string; email: string; website: string; copyright: string; logoUrl: string; 
// // //     socials: { facebook: string; instagram: string; twitter: string; youtube: string; [key: string]: string; };
// // //   };
// // //   forumCategories: ForumCategory[];
// // //   courseCategories: string[];
// // //   libraryCategories: string[];
// // // }

// // // export default function AdminContentPage() {
// // //   const [loading, setLoading] = useState(true);
// // //   const [saving, setSaving] = useState(false);
// // //   const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'blog' | 'forum' | 'library'>('home');
  
// // //   // Loading States
// // //   const [uploadingSlide, setUploadingSlide] = useState(false);
// // //   const [uploadingFavicon, setUploadingFavicon] = useState(false);
// // //   const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false);
// // //   const [uploadingForumIcon, setUploadingForumIcon] = useState(false);

// // //   // Input Tambahan Kategori
// // //   const [newForumCat, setNewForumCat] = useState({ name: '', iconUrl: '' });
// // //   const [newCourseCat, setNewCourseCat] = useState('');
// // //   const [newLibCat, setNewLibCat] = useState('');

// // //   // Main State
// // //   const [formData, setFormData] = useState<FormDataState>({
// // //     heroTitle: '', heroDescription: '', heroBgUrl: '', faviconUrl: '', slides: [],
// // //     features: [ { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } ],
// // //     coursesPage: { title: '', description: '', slides: [] },
// // //     blogPage: { title: '', description: '', slides: [] },
// // //     forumPage: { title: '', description: '', slides: [] },
// // //     libraryPage: { title: '', description: '', slides: [] },
// // //     footer: { about: '', address: '', phone: '', email: '', website: '', copyright: '', logoUrl: '', socials: { facebook: '', instagram: '', twitter: '', youtube: '' } },
// // //     forumCategories: [], courseCategories: [], libraryCategories: []
// // //   });

// // //   useEffect(() => { loadContent(); }, []);

// // //   const loadContent = async () => {
// // //     try {
// // //       const data = await api('/api/content');
// // //       if (data) {
// // //           setFormData({
// // //             ...data,
// // //             coursesPage: data.coursesPage || { title: 'Katalog Pelatihan', description: '', slides: [] },
// // //             blogPage: data.blogPage || { title: 'Cerita Relawan', description: '', slides: [] },
// // //             forumPage: data.forumPage || { title: 'Forum Diskusi', description: '', slides: [] },
// // //             libraryPage: data.libraryPage || { title: 'Perpustakaan Digital', description: '', slides: [] },
// // //             features: data.features?.length ? data.features : [ { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } ],
// // //             footer: { ...data.footer, socials: { facebook: '', instagram: '', twitter: '', youtube: '', ...(data.footer?.socials || {}) } }
// // //           });
// // //       }
// // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // //   };

// // //   // --- HANDLERS ---
// // //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void, loader: (v: boolean) => void) => {
// // //     if (!e.target.files?.[0]) return;
// // //     loader(true);
// // //     try {
// // //       const fd = new FormData();
// // //       fd.append('file', e.target.files[0]);
// // //       const res = await apiUpload('/api/upload', fd); // Gunakan apiUpload
// // //       const url = res.url || res.file?.url;
// // //       if (url) setter(url);
// // //     } catch (e: any) { alert(e.message); } finally { loader(false); }
// // //   };

// // //   const handleUploadSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //       handleUpload(e, (url) => {
// // //           if (activeTab === 'home') setFormData(p => ({...p, slides: [...p.slides, url]}));
// // //           else if (activeTab === 'courses') setFormData(p => ({...p, coursesPage: {...p.coursesPage, slides: [...p.coursesPage.slides, url]}}));
// // //           else if (activeTab === 'blog') setFormData(p => ({...p, blogPage: {...p.blogPage, slides: [...p.blogPage.slides, url]}}));
// // //           else if (activeTab === 'forum') setFormData(p => ({...p, forumPage: {...p.forumPage, slides: [...p.forumPage.slides, url]}}));
// // //           else if (activeTab === 'library') setFormData(p => ({...p, libraryPage: {...p.libraryPage, slides: [...p.libraryPage.slides, url]}}));
// // //       }, setUploadingSlide);
// // //   }
  
// // //   const handleUploadFavicon = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setFormData(p => ({...p, faviconUrl: url})), setUploadingFavicon);
// // //   const handleUploadFooterLogo = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setFormData(p => ({...p, footer: {...p.footer, logoUrl: url}})), setUploadingFooterLogo);
// // //   const handleUploadForumIcon = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setNewForumCat(p => ({...p, iconUrl: url})), setUploadingForumIcon);

// // //   const handleTextChange = (field: 'title' | 'description', value: string) => {
// // //       if (activeTab === 'home') {
// // //           if (field === 'title') setFormData(p => ({...p, heroTitle: value}));
// // //           else setFormData(p => ({...p, heroDescription: value}));
// // //       } else {
// // //           // Fix TypeScript indexing error
// // //           const pageKey = (activeTab + 'Page') as keyof Pick<FormDataState, 'coursesPage' | 'blogPage' | 'forumPage' | 'libraryPage'>;
// // //           if (formData[pageKey]) {
// // //              setFormData(p => ({ ...p, [pageKey]: { ...p[pageKey], [field]: value } }));
// // //           }
// // //       }
// // //   }

// // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // //       const newFeatures = [...formData.features];
// // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // //       setFormData({ ...formData, features: newFeatures });
// // //   };
// // //   const handleFooterChange = (field: string, value: string) => setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
// // //   const handleSocialChange = (platform: string, value: string) => setFormData(prev => ({ ...prev, footer: { ...prev.footer, socials: { ...prev.footer.socials, [platform]: value } } }));

// // //   const removeSlide = (idx: number) => { 
// // //       if(!confirm("Hapus slide ini?")) return;
// // //       if (activeTab === 'home') setFormData(p => ({ ...p, slides: p.slides.filter((_, i) => i !== idx) }));
// // //       else {
// // //           const pageKey = (activeTab + 'Page') as keyof Pick<FormDataState, 'coursesPage' | 'blogPage' | 'forumPage' | 'libraryPage'>;
// // //           if (formData[pageKey]) {
// // //              setFormData(p => ({ ...p, [pageKey]: { ...p[pageKey], slides: p[pageKey].slides.filter((_, i) => i !== idx) } }));
// // //           }
// // //       }
// // //   };

// // //   // Kategori Handlers
// // //   const addForumCat = () => { if (!newForumCat.name) return; setFormData(p => ({ ...p, forumCategories: [...p.forumCategories, newForumCat] })); setNewForumCat({ name: '', iconUrl: '' }); };
// // //   const removeForumCat = (idx: number) => setFormData(p => ({ ...p, forumCategories: p.forumCategories.filter((_, i) => i !== idx) }));
// // //   const addCourseCat = () => { if (!newCourseCat) return; setFormData(p => ({ ...p, courseCategories: [...p.courseCategories, newCourseCat] })); setNewCourseCat(''); };
// // //   const removeCourseCat = (idx: number) => setFormData(p => ({ ...p, courseCategories: p.courseCategories.filter((_, i) => i !== idx) }));
// // //   const addLibCat = () => { if (!newLibCat) return; setFormData(p => ({ ...p, libraryCategories: [...p.libraryCategories, newLibCat] })); setNewLibCat(''); };
// // //   const removeLibCat = (idx: number) => setFormData(p => ({ ...p, libraryCategories: p.libraryCategories.filter((_, i) => i !== idx) }));

// // // //   const getCurrent = () => {
// // // //       if (activeTab === 'home') return { title: formData.heroTitle, desc: formData.heroDescription, slides: formData.slides };
// // // //       let pageData: PageConfig | undefined;
// // // //       switch (activeTab) {
// // // //           case 'courses': pageData = formData.coursesPage; break;
// // // //           case 'blog': pageData = formData.blogPage; break;
// // // //           case 'forum': pageData = formData.forumPage; break;
// // // //           case 'library': pageData = formData.libraryPage; break;
// // // //       }
// // // //       return { title: pageData?.title || '', desc: pageData?.description || '', slides: pageData?.slides || [] };
// // // //   }

// // // //   const handleSave = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     if(!confirm("Simpan perubahan?")) return;
// // // //     setSaving(true);
// // // //     try {
// // // //       await api('/api/content', { method: 'PUT', body: JSON.stringify(formData) });
// // // //       alert("✅ Pengaturan Berhasil Disimpan!");
// // // //       window.location.reload(); 
// // // //     } catch (e: any) { alert("Gagal: " + e.message); } finally { setSaving(false); }
// // // //   };

// // // //   if (loading) return <div className="p-20 text-center flex justify-center"><Loader2 className="animate-spin text-red-700"/></div>;
// // // //   const currentData = getCurrent();

// // // //   return (
// // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // //       <div className="min-h-screen bg-gray-50 pb-24 font-sans">
        
// // // //         {/* [FIXED] HEADER & TABS DALAM SATU STICKY CONTAINER */}
// // // //         <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
// // // //             {/* ROW 1: Judul & Tombol Simpan */}
// // // //             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
// // // //                 <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
// // // //                     <Layout size={20}/> CMS Konten
// // // //                 </h1>
// // // //                 <button 
// // // //                     onClick={handleSave} 
// // // //                     disabled={saving} 
// // // //                     className="bg-[#990000] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#7f0000] flex items-center gap-2 transition-all shadow-sm disabled:opacity-50" 
// // // //                     title="Simpan Perubahan"
// // // //                     aria-label="Simpan Perubahan"
// // // //                 >
// // // //                     {saving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>} 
// // // //                     {saving ? 'Menyimpan...' : 'Simpan'}
// // // //                 </button>
// // // //             </div>

// // // //             {/* ROW 2: Tab Navigasi (Ikut Sticky) */}
// // // //             <div className="px-6 py-2 bg-gray-50/50 backdrop-blur-sm">
// // // //                 <div className="flex gap-2 overflow-x-auto no-scrollbar">
// // // //                     {[
// // // //                         {id: 'home', label: 'Home', icon: Home},
// // // //                         {id: 'courses', label: 'Katalog', icon: BookOpen},
// // // //                         {id: 'blog', label: 'Blog', icon: Newspaper},
// // // //                         {id: 'forum', label: 'Forum', icon: MessageSquare},
// // // //                         {id: 'library', label: 'Pustaka', icon: Book},
// // // //                     ].map(tab => (
// // // //                         <button 
// // // //                             key={tab.id} 
// // // //                             onClick={() => setActiveTab(tab.id as any)} 
// // // //                             className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all border ${activeTab === tab.id ? 'bg-white text-red-700 border-red-200 shadow-sm' : 'text-gray-500 hover:bg-white border-transparent'}`} 
// // // //                             title={tab.label}
// // // //                             aria-label={`Tab ${tab.label}`}
// // // //                         >
// // // //                             <tab.icon size={16}/> {tab.label}
// // // //                         </button>
// // // //                     ))}
// // // //                 </div>
// // // //             </div>
// // // //         </div>
        
// // // //         {/* SCROLLABLE CONTENT */}
// // // //         <div className="max-w-5xl mx-auto px-6 space-y-8 mt-8">

// // // //             {/* 1. HEADER & SLIDES */}
// // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-500">
// // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex justify-between items-center">
// // // //                     <span>1. Header & Slide ({activeTab.toUpperCase()})</span>
// // // //                 </h2>
// // // //                 <div className="grid md:grid-cols-2 gap-6 mb-6">
// // // //                     <div className="space-y-4">
// // // //                         <div>
// // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama</label>
// // // //                             <input className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={currentData.title} onChange={e => handleTextChange('title', e.target.value)} title="Judul Header" aria-label="Judul Header"/>
// // // //                         </div>
// // // //                         <div>
// // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
// // // //                             <textarea rows={3} className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={currentData.desc} onChange={e => handleTextChange('description', e.target.value)} title="Deskripsi Header" aria-label="Deskripsi Header"/>
// // // //                         </div>
// // // //                     </div>
// // // //                     {activeTab === 'home' && (
// // // //                         <div className="border-2 border-dashed p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[100px] rounded text-center">
// // // //                             <label className="block text-sm font-bold text-gray-700 mb-2">Favicon</label>
// // // //                             {formData.faviconUrl ? <img src={getImageUrl(formData.faviconUrl)} className="h-12 w-12 mb-2 object-contain" alt="Favicon"/> : <ImageIcon size={32} className="text-gray-400 mb-2"/>}
// // // //                             <label className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700"><input type="file" className="hidden" onChange={handleUploadFavicon} disabled={uploadingFavicon} title="Upload Favicon" aria-label="Upload Favicon"/> Upload Favicon</label>
// // // //                         </div>
// // // //                     )}
// // // //                 </div>
// // // //                 <h3 className="text-sm font-bold text-gray-700 mb-2">Slide Gambar ({currentData.slides.length})</h3>
// // // //                 <div className="flex gap-4 overflow-x-auto pb-2">
// // // //                     {currentData.slides.map((url: string, idx: number) => (
// // // //                         <div key={idx} className="relative w-40 h-24 flex-shrink-0 group rounded-lg overflow-hidden border">
// // // //                             <img src={getImageUrl(url)} className="w-full h-full object-cover" alt="Slide"/>
// // // //                             <button type="button" onClick={() => removeSlide(idx)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700" title="Hapus Slide" aria-label="Hapus Slide"><Trash size={12}/></button>
// // // //                         </div>
// // // //                     ))}
// // // //                     <label className="w-40 h-24 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 rounded-lg flex-shrink-0 text-xs text-gray-500 font-bold hover:border-red-300">
// // // //                         <Plus size={20} className="mb-1 text-gray-400"/> {uploadingSlide ? '...' : 'Tambah'}
// // // //                         <input type="file" className="hidden" onChange={handleUploadSlide} disabled={uploadingSlide} title="Upload Slide" aria-label="Upload Slide"/>
// // // //                     </label>
// // // //                 </div>
// // // //             </div>

// // // //             {/* 2. KATEGORI (BERDASARKAN TAB) */}
// // // //             {activeTab === 'courses' && (
// // // //                 <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
// // // //                     <h2 className="text-lg font-bold text-green-800 mb-4 border-b border-green-200 pb-2 flex items-center gap-2"><List size={18}/> Kategori Pelatihan</h2>
// // // //                     <div className="flex gap-2 mb-4">
// // // //                         <input className="flex-1 border p-2 text-sm rounded outline-none" value={newCourseCat} onChange={e=>setNewCourseCat(e.target.value)} placeholder="Nama Kategori Baru" title="Input Kategori Pelatihan" aria-label="Input Kategori Pelatihan"/>
// // // //                         <button type="button" onClick={addCourseCat} className="bg-green-600 text-white px-4 rounded hover:bg-green-700 font-bold" title="Tambah Kategori" aria-label="Tambah Kategori"><Plus size={18}/></button>
// // // //                     </div>
// // // //                     <div className="flex flex-wrap gap-2">
// // // //                         {formData.courseCategories.map((c,i)=>(
// // // //                             <span key={i} className="bg-white border border-green-200 text-green-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c} <button onClick={()=>removeCourseCat(i)} className="text-red-400 hover:text-red-600" title="Hapus" aria-label="Hapus"><X size={14}/></button></span>
// // // //                         ))}
// // // //                     </div>
// // // //                 </div>
// // // //             )}

// // // //             {activeTab === 'forum' && (
// // // //                 <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
// // // //                     <h2 className="text-lg font-bold text-blue-800 mb-4 border-b border-blue-200 pb-2 flex items-center gap-2"><List size={18}/> Kategori Forum</h2>
// // // //                     <div className="flex gap-2 mb-4 items-center">
// // // //                         <input className="flex-1 border p-2 text-sm rounded outline-none" value={newForumCat.name} onChange={e=>setNewForumCat({...newForumCat, name:e.target.value})} placeholder="Nama Forum" title="Nama Kategori Forum" aria-label="Nama Kategori Forum"/>
// // // //                         <label className="bg-white border p-2 rounded cursor-pointer text-xs hover:bg-gray-50" title="Upload Icon" aria-label="Upload Icon">
// // // //                             {uploadingForumIcon ? <Loader2 size={18} className="animate-spin text-blue-500"/> : <UploadCloud size={18} className="text-blue-500"/>}
// // // //                             <input type="file" className="hidden" onChange={handleUploadForumIcon}/>
// // // //                         </label>
// // // //                         <button type="button" onClick={addForumCat} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold" title="Tambah Forum" aria-label="Tambah Forum"><Plus size={18}/></button>
// // // //                     </div>
// // // //                     <div className="flex flex-wrap gap-2">
// // // //                         {formData.forumCategories.map((c,i)=>(
// // // //                             <span key={i} className="bg-white border border-blue-200 text-blue-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c.name} <button onClick={()=>removeForumCat(i)} className="text-red-400 hover:text-red-600" title="Hapus" aria-label="Hapus"><X size={14}/></button></span>
// // // //                         ))}
// // // //                     </div>
// // // //                 </div>
// // // //             )}

// // // //             {activeTab === 'library' && (
// // // //                 <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
// // // //                     <h2 className="text-lg font-bold text-purple-800 mb-4 border-b border-purple-200 pb-2 flex items-center gap-2"><List size={18}/> Kategori Perpustakaan</h2>
// // // //                     <div className="flex gap-2 mb-4">
// // // //                         <input className="flex-1 border p-2 text-sm rounded outline-none" value={newLibCat} onChange={e=>setNewLibCat(e.target.value)} placeholder="Kategori Buku" title="Nama Kategori Buku" aria-label="Nama Kategori Buku"/>
// // // //                         <button type="button" onClick={addLibCat} className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700 font-bold" title="Tambah Kategori" aria-label="Tambah Kategori"><Plus size={18}/></button>
// // // //                     </div>
// // // //                     <div className="flex flex-wrap gap-2">
// // // //                         {formData.libraryCategories.map((c,i)=>(
// // // //                             <span key={i} className="bg-white border border-purple-200 text-purple-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c} <button onClick={()=>removeLibCat(i)} className="text-red-400 hover:text-red-600" title="Hapus" aria-label="Hapus"><X size={14}/></button></span>
// // // //                         ))}
// // // //                     </div>
// // // //                 </div>
// // // //             )}

// // // //             {/* 3. HOME FEATURES & FOOTER (Hanya Tab Home) */}
// // // //             {activeTab === 'home' && (
// // // //                 <>
// // // //                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // //                         <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Fitur Utama (Info Cards)</h2>
// // // //                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // //                             {formData.features.map((feat, idx) => (
// // // //                                 <div key={idx} className="p-3 border rounded-lg bg-gray-50">
// // // //                                     <label className="block text-xs font-bold text-gray-500 mb-1">Kartu #{idx + 1}</label>
// // // //                                     <input className="w-full border rounded p-2 text-sm mb-2" value={feat.title} onChange={e => handleFeatureChange(idx, 'title', e.target.value)} placeholder="Judul" title={`Judul Fitur ${idx+1}`} aria-label={`Judul Fitur ${idx+1}`}/>
// // // //                                     <textarea rows={2} className="w-full border rounded p-2 text-sm" value={feat.description} onChange={e => handleFeatureChange(idx, 'description', e.target.value)} placeholder="Deskripsi" title={`Deskripsi Fitur ${idx+1}`} aria-label={`Deskripsi Fitur ${idx+1}`}/>
// // // //                                 </div>
// // // //                             ))}
// // // //                         </div>
// // // //                     </div>

// // // //                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10">
// // // //                         <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Pengaturan Footer Global</h2>
// // // //                         <div className="grid md:grid-cols-2 gap-6">
// // // //                             <div className="space-y-4">
// // // //                                 <div><label className="block text-sm font-bold text-gray-700 mb-2">Logo Footer</label><div className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50">{formData.footer.logoUrl ? <img src={getImageUrl(formData.footer.logoUrl)} className="h-10 w-auto object-contain" alt="Logo"/> : <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center"><ImageIcon size={20}/></div>}<label className="cursor-pointer bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-700">{uploadingFooterLogo ? '...' : 'Ganti Logo'}<input type="file" className="hidden" onChange={handleUploadFooterLogo} disabled={uploadingFooterLogo} title="Upload Logo" aria-label="Upload Logo"/></label></div></div>
// // // //                                 <div><label className="block text-xs font-bold mb-1">Tentang</label><textarea rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.about} onChange={e => handleFooterChange('about', e.target.value)} title="Tentang" aria-label="Tentang"/></div>
// // // //                                 <div><label className="block text-xs font-bold mb-1">Alamat</label><textarea rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.address} onChange={e => handleFooterChange('address', e.target.value)} title="Alamat" aria-label="Alamat"/></div>
// // // //                             </div>
// // // //                             <div className="space-y-4">
// // // //                                 <div className="grid grid-cols-2 gap-2">
// // // //                                     <div><label className="block text-xs font-bold mb-1">Telepon</label><input className="w-full border rounded p-2 text-sm" value={formData.footer.phone} onChange={e => handleFooterChange('phone', e.target.value)} title="Telepon" aria-label="Telepon"/></div>
// // // //                                     <div><label className="block text-xs font-bold mb-1">Email</label><input className="w-full border rounded p-2 text-sm" value={formData.footer.email} onChange={e => handleFooterChange('email', e.target.value)} title="Email" aria-label="Email"/></div>
// // // //                                 </div>
// // // //                                 <div><label className="block text-xs font-bold mb-1">Copyright</label><input className="w-full border rounded p-2 text-sm" value={formData.footer.copyright} onChange={e => handleFooterChange('copyright', e.target.value)} title="Copyright" aria-label="Copyright"/></div>
// // // //                                 <div className="bg-gray-50 p-3 rounded border">
// // // //                                     <h3 className="text-xs font-bold mb-2">Social Media</h3>
// // // //                                     <div className="grid grid-cols-2 gap-2">{['facebook','instagram','twitter','youtube'].map(soc => (<div key={soc}><input className="w-full border rounded p-1.5 text-xs" placeholder={soc} value={formData.footer.socials?.[soc] || ''} onChange={e => handleSocialChange(soc, e.target.value)} title={soc} aria-label={soc}/></div>))}</div>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 </>
// // // //             )}

// // // //         </div>
// // // //       </div>
// // // //     </Protected>
// // // //   );
// // // // }

// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // // import Protected from '@/components/Protected'; 
// // // import { Save, Plus, X, UploadCloud, Layout, List, Trash, Image as ImageIcon, Loader2, Home, BookOpen, Newspaper, MessageSquare, Book } from 'lucide-react';

// // // // --- TIPE DATA ---
// // // interface Feature { title: string; description: string; }
// // // interface ForumCategory { name: string; iconUrl: string; }
// // // interface PageConfig { title: string; description: string; slides: string[]; }

// // // interface FormDataState {
// // //   heroTitle: string; heroDescription: string; heroBgUrl: string; faviconUrl: string; slides: string[];
// // //   features: Feature[];
// // //   coursesPage: PageConfig;
// // //   blogPage: PageConfig;
// // //   forumPage: PageConfig;
// // //   libraryPage: PageConfig;
// // //   footer: {
// // //     about: string; address: string; phone: string; email: string; website: string; copyright: string; logoUrl: string; 
// // //     socials: { facebook: string; instagram: string; twitter: string; youtube: string; [key: string]: string; };
// // //   };
// // //   forumCategories: ForumCategory[];
// // //   courseCategories: string[];
// // //   libraryCategories: string[];
// // // }

// // // export default function AdminContentPage() {
// // //   const [loading, setLoading] = useState(true);
// // //   const [saving, setSaving] = useState(false);
// // //   const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'blog' | 'forum' | 'library'>('home');
  
// // //   // Loading States
// // //   const [uploadingSlide, setUploadingSlide] = useState(false);
// // //   const [uploadingFavicon, setUploadingFavicon] = useState(false);
// // //   const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false);
// // //   const [uploadingForumIcon, setUploadingForumIcon] = useState(false);

// // //   // Input Tambahan
// // //   const [newForumCat, setNewForumCat] = useState({ name: '', iconUrl: '' });
// // //   const [newCourseCat, setNewCourseCat] = useState('');
// // //   const [newLibCat, setNewLibCat] = useState('');

// // //   // Main State
// // //   const [formData, setFormData] = useState<FormDataState>({
// // //     heroTitle: '', heroDescription: '', heroBgUrl: '', faviconUrl: '', slides: [],
// // //     features: [ { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } ],
// // //     coursesPage: { title: '', description: '', slides: [] },
// // //     blogPage: { title: '', description: '', slides: [] },
// // //     forumPage: { title: '', description: '', slides: [] },
// // //     libraryPage: { title: '', description: '', slides: [] },
// // //     footer: { about: '', address: '', phone: '', email: '', website: '', copyright: '', logoUrl: '', socials: { facebook: '', instagram: '', twitter: '', youtube: '' } },
// // //     forumCategories: [], courseCategories: [], libraryCategories: []
// // //   });

// // //   useEffect(() => { loadContent(); }, []);

// // //   const loadContent = async () => {
// // //     try {
// // //       const data = await api('/api/content');
// // //       if (data) {
// // //           setFormData({
// // //             ...data,
// // //             coursesPage: data.coursesPage || { title: 'Katalog Pelatihan', description: '', slides: [] },
// // //             blogPage: data.blogPage || { title: 'Cerita Relawan', description: '', slides: [] },
// // //             forumPage: data.forumPage || { title: 'Forum Diskusi', description: '', slides: [] },
// // //             libraryPage: data.libraryPage || { title: 'Perpustakaan Digital', description: '', slides: [] },
// // //             features: data.features?.length ? data.features : [ { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } ],
// // //             footer: { ...data.footer, socials: { facebook: '', instagram: '', twitter: '', youtube: '', ...(data.footer?.socials || {}) } }
// // //           });
// // //       }
// // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // //   };

// // //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void, loader: (v: boolean) => void) => {
// // //     if (!e.target.files?.[0]) return;
// // //     loader(true);
// // //     try {
// // //       const fd = new FormData();
// // //       fd.append('file', e.target.files[0]);
// // //       // Gunakan apiUpload agar header Content-Type otomatis diurus browser
// // //       const res = await apiUpload('/api/upload', fd); 
// // //       const url = res.url || res.file?.url;
// // //       if (url) setter(url);
// // //     } catch (e: any) { alert(e.message); } finally { loader(false); }
// // //   };

// // //   const handleUploadSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //       handleUpload(e, (url) => {
// // //           if (activeTab === 'home') setFormData(p => ({...p, slides: [...p.slides, url]}));
// // //           else {
// // //              const pageKey = (activeTab + 'Page') as keyof Pick<FormDataState, 'coursesPage' | 'blogPage' | 'forumPage' | 'libraryPage'>;
// // //              if (formData[pageKey]) setFormData(p => ({ ...p, [pageKey]: { ...p[pageKey], slides: [...p[pageKey].slides, url] } }));
// // //           }
// // //       }, setUploadingSlide);
// // //   }
  
// // //   const handleUploadFavicon = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setFormData(p => ({...p, faviconUrl: url})), setUploadingFavicon);
// // //   const handleUploadFooterLogo = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setFormData(p => ({...p, footer: {...p.footer, logoUrl: url}})), setUploadingFooterLogo);
// // //   const handleUploadForumIcon = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setNewForumCat(p => ({...p, iconUrl: url})), setUploadingForumIcon);

// // //   const handleTextChange = (field: 'title' | 'description', value: string) => {
// // //       if (activeTab === 'home') {
// // //           if (field === 'title') setFormData(p => ({...p, heroTitle: value}));
// // //           else setFormData(p => ({...p, heroDescription: value}));
// // //       } else {
// // //           const pageKey = (activeTab + 'Page') as keyof Pick<FormDataState, 'coursesPage' | 'blogPage' | 'forumPage' | 'libraryPage'>;
// // //           if (formData[pageKey]) {
// // //              setFormData(p => ({ ...p, [pageKey]: { ...p[pageKey], [field]: value } }));
// // //           }
// // //       }
// // //   }

// // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // //       const newFeatures = [...formData.features];
// // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // //       setFormData({ ...formData, features: newFeatures });
// // //   };
// // //   const handleFooterChange = (field: string, value: string) => setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
// // //   const handleSocialChange = (platform: string, value: string) => setFormData(prev => ({ ...prev, footer: { ...prev.footer, socials: { ...prev.footer.socials, [platform]: value } } }));

// // //   const removeSlide = (idx: number) => { 
// // //       if(!confirm("Hapus slide ini?")) return;
// // //       if (activeTab === 'home') setFormData(p => ({ ...p, slides: p.slides.filter((_, i) => i !== idx) }));
// // //       else {
// // //           const pageKey = (activeTab + 'Page') as keyof Pick<FormDataState, 'coursesPage' | 'blogPage' | 'forumPage' | 'libraryPage'>;
// // //           if (formData[pageKey]) {
// // //              setFormData(p => ({ ...p, [pageKey]: { ...p[pageKey], slides: p[pageKey].slides.filter((_, i) => i !== idx) } }));
// // //           }
// // //       }
// // //   };

// // //   const addForumCat = () => { if (!newForumCat.name) return; setFormData(p => ({ ...p, forumCategories: [...p.forumCategories, newForumCat] })); setNewForumCat({ name: '', iconUrl: '' }); };
// // //   const removeForumCat = (idx: number) => setFormData(p => ({ ...p, forumCategories: p.forumCategories.filter((_, i) => i !== idx) }));
// // //   const addCourseCat = () => { if (!newCourseCat) return; setFormData(p => ({ ...p, courseCategories: [...p.courseCategories, newCourseCat] })); setNewCourseCat(''); };
// // //   const removeCourseCat = (idx: number) => setFormData(p => ({ ...p, courseCategories: p.courseCategories.filter((_, i) => i !== idx) }));
// // //   const addLibCat = () => { if (!newLibCat) return; setFormData(p => ({ ...p, libraryCategories: [...p.libraryCategories, newLibCat] })); setNewLibCat(''); };
// // //   const removeLibCat = (idx: number) => setFormData(p => ({ ...p, libraryCategories: p.libraryCategories.filter((_, i) => i !== idx) }));

// // //   const getCurrent = () => {
// // //       if (activeTab === 'home') return { title: formData.heroTitle, desc: formData.heroDescription, slides: formData.slides };
// // //       let pageData: PageConfig | undefined;
// // //       switch (activeTab) {
// // //           case 'courses': pageData = formData.coursesPage; break;
// // //           case 'blog': pageData = formData.blogPage; break;
// // //           case 'forum': pageData = formData.forumPage; break;
// // //           case 'library': pageData = formData.libraryPage; break;
// // //       }
// // //       return { title: pageData?.title || '', desc: pageData?.description || '', slides: pageData?.slides || [] };
// // //   }

// // //   const handleSave = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if(!confirm("Simpan perubahan?")) return;
// // //     setSaving(true);
// // //     try {
// // //       await api('/api/content', { method: 'PUT', body: JSON.stringify(formData) });
// // //       alert("✅ Pengaturan Berhasil Disimpan!");
// // //       window.location.reload(); 
// // //     } catch (e: any) { alert("Gagal: " + e.message); } finally { setSaving(false); }
// // //   };

// // //   if (loading) return <div className="p-20 text-center flex justify-center"><Loader2 className="animate-spin text-red-700"/></div>;
// // //   const currentData = getCurrent();

// // //   return (
// // //     <Protected 
// // //         roles={['SUPER_ADMIN', 'ADMIN', 'FACILITATOR']} 
// // //         permissions={['manage_cms_info', 'manage_cms_design']}
// // //     >
// // //       <div className="min-h-screen bg-gray-50 pb-24 font-sans">
        
// // //         {/* HEADER STICKY */}
// // //         <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
// // //             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
// // //                 <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
// // //                     <Layout size={20}/> CMS Konten
// // //                 </h1>
// // //                 <button 
// // //                     onClick={handleSave} 
// // //                     disabled={saving} 
// // //                     className="bg-[#990000] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#7f0000] flex items-center gap-2 transition-all shadow-sm disabled:opacity-50" 
// // //                     aria-label="Simpan Perubahan"
// // //                 >
// // //                     {saving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>} 
// // //                     {saving ? 'Menyimpan...' : 'Simpan'}
// // //                 </button>
// // //             </div>
// // //             {/* TABS */}
// // //             <div className="px-6 py-2 bg-gray-50/50 backdrop-blur-sm">
// // //                 <div className="flex gap-2 overflow-x-auto no-scrollbar">
// // //                     {[
// // //                         {id: 'home', label: 'Home', icon: Home},
// // //                         {id: 'courses', label: 'Katalog', icon: BookOpen},
// // //                         {id: 'blog', label: 'Blog', icon: Newspaper},
// // //                         {id: 'forum', label: 'Forum', icon: MessageSquare},
// // //                         {id: 'library', label: 'Pustaka', icon: Book},
// // //                     ].map(tab => (
// // //                         <button 
// // //                             key={tab.id} 
// // //                             onClick={() => setActiveTab(tab.id as any)} 
// // //                             className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all border ${activeTab === tab.id ? 'bg-white text-red-700 border-red-200 shadow-sm' : 'text-gray-500 hover:bg-white border-transparent'}`} 
// // //                             aria-label={`Tab ${tab.label}`}
// // //                         >
// // //                             <tab.icon size={16}/> {tab.label}
// // //                         </button>
// // //                     ))}
// // //                 </div>
// // //             </div>
// // //         </div>
        
// // //         <div className="max-w-5xl mx-auto px-6 space-y-8 mt-8">
            
// // //             {/* 1. HEADER & SLIDE (MUNCUL DI SEMUA TAB) */}
// // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-500">
// // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex justify-between items-center">
// // //                     <span>1. Header & Slide ({activeTab.toUpperCase()})</span>
// // //                 </h2>
// // //                 <div className="grid md:grid-cols-2 gap-6 mb-6">
// // //                     <div className="space-y-4">
// // //                         <div>
// // //                             <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="page-title">Judul Utama</label>
// // //                             <input id="page-title" className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={currentData.title} onChange={e => handleTextChange('title', e.target.value)} placeholder="Judul Halaman"/>
// // //                         </div>
// // //                         <div>
// // //                             <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="page-desc">Deskripsi Singkat</label>
// // //                             <textarea id="page-desc" rows={3} className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={currentData.desc} onChange={e => handleTextChange('description', e.target.value)} placeholder="Deskripsi Halaman"/>
// // //                         </div>
// // //                     </div>
// // //                     {activeTab === 'home' && (
// // //                         <div className="border-2 border-dashed p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[100px] rounded text-center">
// // //                             <label className="block text-sm font-bold text-gray-700 mb-2">Favicon</label>
// // //                             {formData.faviconUrl ? <img src={getImageUrl(formData.faviconUrl)} className="h-12 w-12 mb-2 object-contain" alt="Favicon"/> : <ImageIcon size={32} className="text-gray-400 mb-2"/>}
// // //                             <label htmlFor="upload-favicon" className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700">
// // //                                 {uploadingFavicon ? '...' : 'Upload'}
// // //                                 <input id="upload-favicon" type="file" className="hidden" onChange={handleUploadFavicon} disabled={uploadingFavicon} aria-label="Upload Favicon"/>
// // //                             </label>
// // //                         </div>
// // //                     )}
// // //                 </div>
// // //                 <h3 className="text-sm font-bold text-gray-700 mb-2">Slide Gambar ({currentData.slides.length})</h3>
// // //                 <div className="flex gap-4 overflow-x-auto pb-2">
// // //                     {currentData.slides.map((url: string, idx: number) => (
// // //                         <div key={idx} className="relative w-40 h-24 flex-shrink-0 group rounded-lg overflow-hidden border">
// // //                             <img src={getImageUrl(url)} className="w-full h-full object-cover" alt="Slide"/>
// // //                             <button type="button" onClick={() => removeSlide(idx)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700" aria-label={`Hapus slide ${idx + 1}`}><Trash size={12}/></button>
// // //                         </div>
// // //                     ))}
// // //                     <label htmlFor="upload-slide" className="w-40 h-24 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 rounded-lg flex-shrink-0 text-xs text-gray-500 font-bold hover:border-red-300">
// // //                         <Plus size={20} className="mb-1 text-gray-400"/> {uploadingSlide ? '...' : 'Tambah'}
// // //                         <input id="upload-slide" type="file" className="hidden" onChange={handleUploadSlide} disabled={uploadingSlide} aria-label="Tambah Slide"/>
// // //                     </label>
// // //                 </div>
// // //             </div>

// // //             {/* 2. MANAJEMEN KATEGORI (MUNCUL SESUAI TAB) */}
            
// // //             {activeTab === 'courses' && (
// // //                 <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
// // //                     <h2 className="text-lg font-bold text-green-800 mb-4 border-b border-green-200 pb-2 flex items-center gap-2"><List size={18}/> Kategori Pelatihan</h2>
// // //                     <div className="flex gap-2 mb-4">
// // //                         <input className="flex-1 border p-2 text-sm rounded outline-none" value={newCourseCat} onChange={e=>setNewCourseCat(e.target.value)} placeholder="Nama Kategori Baru" aria-label="Nama Kategori Baru"/>
// // //                         <button type="button" onClick={addCourseCat} className="bg-green-600 text-white px-4 rounded hover:bg-green-700 font-bold" aria-label="Tambah Kategori Pelatihan"><Plus size={18}/></button>
// // //                     </div>
// // //                     <div className="flex flex-wrap gap-2">
// // //                         {formData.courseCategories.map((c,i)=>(
// // //                             <span key={i} className="bg-white border border-green-200 text-green-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c} <button onClick={()=>removeCourseCat(i)} className="text-red-400 hover:text-red-600" aria-label={`Hapus kategori ${c}`}><X size={14}/></button></span>
// // //                         ))}
// // //                     </div>
// // //                 </div>
// // //             )}

// // //             {activeTab === 'forum' && (
// // //                 <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
// // //                     <h2 className="text-lg font-bold text-blue-800 mb-4 border-b border-blue-200 pb-2 flex items-center gap-2"><List size={18}/> Kategori Forum</h2>
// // //                     <div className="flex gap-2 mb-4 items-center">
// // //                         <input className="flex-1 border p-2 text-sm rounded outline-none" value={newForumCat.name} onChange={e=>setNewForumCat({...newForumCat, name:e.target.value})} placeholder="Nama Forum" aria-label="Nama Kategori Forum"/>
// // //                         <label htmlFor="upload-forum-icon" className="bg-white border p-2 rounded cursor-pointer text-xs hover:bg-gray-50" aria-label="Upload Icon Forum">
// // //                             {uploadingForumIcon ? <Loader2 size={18} className="animate-spin text-blue-500"/> : <UploadCloud size={18} className="text-blue-500"/>}
// // //                             <input id="upload-forum-icon" type="file" className="hidden" onChange={handleUploadForumIcon}/>
// // //                         </label>
// // //                         <button type="button" onClick={addForumCat} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold" aria-label="Tambah Forum"><Plus size={18}/></button>
// // //                     </div>
// // //                     <div className="flex flex-wrap gap-2">
// // //                         {formData.forumCategories.map((c,i)=>(
// // //                             <span key={i} className="bg-white border border-blue-200 text-blue-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c.name} <button onClick={()=>removeForumCat(i)} className="text-red-400 hover:text-red-600" aria-label={`Hapus forum ${c.name}`}><X size={14}/></button></span>
// // //                         ))}
// // //                     </div>
// // //                 </div>
// // //             )}

// // //             {activeTab === 'library' && (
// // //                 <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
// // //                     <h2 className="text-lg font-bold text-purple-800 mb-4 border-b border-purple-200 pb-2 flex items-center gap-2"><List size={18}/> Kategori Perpustakaan</h2>
// // //                     <div className="flex gap-2 mb-4">
// // //                         <input className="flex-1 border p-2 text-sm rounded outline-none" value={newLibCat} onChange={e=>setNewLibCat(e.target.value)} placeholder="Kategori Buku" aria-label="Nama Kategori Buku"/>
// // //                         <button type="button" onClick={addLibCat} className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700 font-bold" aria-label="Tambah Kategori Pustaka"><Plus size={18}/></button>
// // //                     </div>
// // //                     <div className="flex flex-wrap gap-2">
// // //                         {formData.libraryCategories.map((c,i)=>(
// // //                             <span key={i} className="bg-white border border-purple-200 text-purple-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c} <button onClick={()=>removeLibCat(i)} className="text-red-400 hover:text-red-600" aria-label={`Hapus kategori ${c}`}><X size={14}/></button></span>
// // //                         ))}
// // //                     </div>
// // //                 </div>
// // //             )}

// // //             {/* 3. HOME FEATURES & FOOTER (HANYA TAB HOME) */}
// // //             {activeTab === 'home' && (
// // //                 <>
// // //                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // //                         <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Fitur Utama (Info Cards)</h2>
// // //                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //                             {formData.features.map((feat, idx) => (
// // //                                 <div key={idx} className="p-3 border rounded-lg bg-gray-50">
// // //                                     <label className="block text-xs font-bold text-gray-500 mb-1" htmlFor={`feat-title-${idx}`}>Kartu #{idx + 1}</label>
// // //                                     <input id={`feat-title-${idx}`} className="w-full border rounded p-2 text-sm mb-2" value={feat.title} onChange={e => handleFeatureChange(idx, 'title', e.target.value)} placeholder="Judul"/>
// // //                                     <textarea className="w-full border rounded p-2 text-sm" value={feat.description} onChange={e => handleFeatureChange(idx, 'description', e.target.value)} placeholder="Deskripsi" aria-label={`Deskripsi Kartu ${idx+1}`}/>
// // //                                 </div>
// // //                             ))}
// // //                         </div>
// // //                     </div>

// // //                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10">
// // //                         <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Pengaturan Footer Global</h2>
// // //                         <div className="grid md:grid-cols-2 gap-6">
// // //                             <div className="space-y-4">
// // //                                 <div>
// // //                                     <label className="block text-sm font-bold text-gray-700 mb-2">Logo Footer</label>
// // //                                     <div className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50">
// // //                                         {formData.footer.logoUrl ? <img src={getImageUrl(formData.footer.logoUrl)} className="h-10 w-auto object-contain" alt="Logo"/> : <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center"><ImageIcon size={20}/></div>}
// // //                                         <label htmlFor="upload-footer-logo" className="cursor-pointer bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-700">
// // //                                             {uploadingFooterLogo ? '...' : 'Ganti Logo'}
// // //                                             <input id="upload-footer-logo" type="file" className="hidden" onChange={handleUploadFooterLogo} disabled={uploadingFooterLogo} aria-label="Upload Logo Footer"/>
// // //                                         </label>
// // //                                     </div>
// // //                                 </div>
// // //                                 <div><label className="block text-xs font-bold mb-1" htmlFor="footer-about">Tentang</label><textarea id="footer-about" rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.about} onChange={e => handleFooterChange('about', e.target.value)}/></div>
// // //                                 <div><label className="block text-xs font-bold mb-1" htmlFor="footer-address">Alamat</label><textarea id="footer-address" rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.address} onChange={e => handleFooterChange('address', e.target.value)}/></div>
// // //                             </div>
// // //                             <div className="space-y-4">
// // //                                 <div className="grid grid-cols-2 gap-2">
// // //                                     <div><label className="block text-xs font-bold mb-1" htmlFor="footer-phone">Telepon</label><input id="footer-phone" className="w-full border rounded p-2 text-sm" value={formData.footer.phone} onChange={e => handleFooterChange('phone', e.target.value)}/></div>
// // //                                     <div><label className="block text-xs font-bold mb-1" htmlFor="footer-email">Email</label><input id="footer-email" className="w-full border rounded p-2 text-sm" value={formData.footer.email} onChange={e => handleFooterChange('email', e.target.value)}/></div>
// // //                                 </div>
// // //                                 <div><label className="block text-xs font-bold mb-1" htmlFor="footer-copy">Copyright</label><input id="footer-copy" className="w-full border rounded p-2 text-sm" value={formData.footer.copyright} onChange={e => handleFooterChange('copyright', e.target.value)}/></div>
// // //                                 <div className="bg-gray-50 p-3 rounded border">
// // //                                     <h3 className="text-xs font-bold mb-2">Social Media</h3>
// // //                                     <div className="grid grid-cols-2 gap-2">{['facebook','instagram','twitter','youtube'].map(soc => (<div key={soc}><input className="w-full border rounded p-1.5 text-xs" placeholder={soc} value={formData.footer.socials?.[soc] || ''} onChange={e => handleSocialChange(soc, e.target.value)} aria-label={`Link ${soc}`}/></div>))}</div>
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 </>
// // //             )}

// // //         </div>
// // //       </div>
// // //     </Protected>
// // //   );
// // // }




// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // import Protected from '@/components/Protected'; 
// // import { Save, Plus, X, UploadCloud, Layout, List, Trash, Image as ImageIcon, Loader2, Home, BookOpen, Newspaper, MessageSquare, Book, Building } from 'lucide-react';

// // interface Feature { title: string; description: string; }
// // interface ForumCategory { name: string; iconUrl: string; }
// // interface PageConfig { title: string; description: string; slides: string[]; }

// // interface FormDataState {
// //   heroTitle: string; heroDescription: string; heroBgUrl: string; faviconUrl: string; slides: string[];
// //   features: Feature[];
// //   coursesPage: PageConfig;
// //   blogPage: PageConfig;
// //   forumPage: PageConfig;
// //   libraryPage: PageConfig;
// //   footer: {
// //     about: string; address: string; phone: string; email: string; website: string; copyright: string; logoUrl: string; 
// //     socials: { facebook: string; instagram: string; twitter: string; youtube: string; [key: string]: string; };
// //   };
// //   forumCategories: ForumCategory[];
// //   courseCategories: string[];
// //   libraryCategories: string[];
// //   organizerCategories: string[]; 
// // }

// // export default function AdminContentPage() {
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);
// //   const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'blog' | 'forum' | 'library' | 'organizers'>('home');
  
// //   const [uploadingSlide, setUploadingSlide] = useState(false);
// //   const [uploadingFavicon, setUploadingFavicon] = useState(false);
// //   const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false);
// //   const [uploadingForumIcon, setUploadingForumIcon] = useState(false);

// //   const [newForumCat, setNewForumCat] = useState({ name: '', iconUrl: '' });
// //   const [newCourseCat, setNewCourseCat] = useState('');
// //   const [newLibCat, setNewLibCat] = useState('');
// //   const [newOrgCat, setNewOrgCat] = useState(''); 

// //   const [formData, setFormData] = useState<FormDataState>({
// //     heroTitle: '', heroDescription: '', heroBgUrl: '', faviconUrl: '', slides: [],
// //     features: [ { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } ],
// //     coursesPage: { title: '', description: '', slides: [] },
// //     blogPage: { title: '', description: '', slides: [] },
// //     forumPage: { title: '', description: '', slides: [] },
// //     libraryPage: { title: '', description: '', slides: [] },
// //     footer: { about: '', address: '', phone: '', email: '', website: '', copyright: '', logoUrl: '', socials: { facebook: '', instagram: '', twitter: '', youtube: '' } },
// //     forumCategories: [], courseCategories: [], libraryCategories: [],
// //     organizerCategories: ['Unit PMR', 'Relawan', 'External']
// //   });

// //   useEffect(() => { loadContent(); }, []);

// //   const loadContent = async () => {
// //     try {
// //       const data = await api('/api/content');
// //       if (data) {
// //           setFormData({
// //             ...data,
// //             coursesPage: data.coursesPage || { title: 'Katalog Pelatihan', description: '', slides: [] },
// //             blogPage: data.blogPage || { title: 'Cerita Relawan', description: '', slides: [] },
// //             forumPage: data.forumPage || { title: 'Forum Diskusi', description: '', slides: [] },
// //             libraryPage: data.libraryPage || { title: 'Perpustakaan Digital', description: '', slides: [] },
// //             features: data.features?.length ? data.features : [ { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } ],
// //             footer: { ...data.footer, socials: { facebook: '', instagram: '', twitter: '', youtube: '', ...(data.footer?.socials || {}) } },
// //             organizerCategories: data.organizerCategories?.length ? data.organizerCategories : ['Unit PMR', 'Relawan', 'External']
// //           });
// //       }
// //     } catch (e) { console.error(e); } finally { setLoading(false); }
// //   };

// //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void, loader: (v: boolean) => void) => {
// //     if (!e.target.files?.[0]) return;
// //     loader(true);
// //     try {
// //       const fd = new FormData();
// //       fd.append('file', e.target.files[0]);
// //       const res = await apiUpload('/api/upload', fd); 
// //       const url = res.url || res.file?.url;
// //       if (url) setter(url);
// //     } catch (e: any) { alert(e.message); } finally { loader(false); }
// //   };

// //   const handleUploadSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
// //       handleUpload(e, (url) => {
// //           if (activeTab === 'home') setFormData(p => ({...p, slides: [...p.slides, url]}));
// //           else if (activeTab !== 'organizers') {
// //              const pageKey = (activeTab + 'Page') as keyof Pick<FormDataState, 'coursesPage' | 'blogPage' | 'forumPage' | 'libraryPage'>;
// //              if (formData[pageKey]) setFormData(p => ({ ...p, [pageKey]: { ...p[pageKey], slides: [...p[pageKey].slides, url] } }));
// //           }
// //       }, setUploadingSlide);
// //   }
  
// //   const handleUploadFavicon = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setFormData(p => ({...p, faviconUrl: url})), setUploadingFavicon);
// //   const handleUploadFooterLogo = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setFormData(p => ({...p, footer: {...p.footer, logoUrl: url}})), setUploadingFooterLogo);
// //   const handleUploadForumIcon = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setNewForumCat(p => ({...p, iconUrl: url})), setUploadingForumIcon);

// //   const handleTextChange = (field: 'title' | 'description', value: string) => {
// //       if (activeTab === 'home') {
// //           if (field === 'title') setFormData(p => ({...p, heroTitle: value}));
// //           else setFormData(p => ({...p, heroDescription: value}));
// //       } else if (activeTab !== 'organizers') {
// //           const pageKey = (activeTab + 'Page') as keyof Pick<FormDataState, 'coursesPage' | 'blogPage' | 'forumPage' | 'libraryPage'>;
// //           if (formData[pageKey]) setFormData(p => ({ ...p, [pageKey]: { ...p[pageKey], [field]: value } }));
// //       }
// //   }

// //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// //       const newFeatures = [...formData.features];
// //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// //       setFormData({ ...formData, features: newFeatures });
// //   };
// //   const handleFooterChange = (field: string, value: string) => setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
// //   const handleSocialChange = (platform: string, value: string) => setFormData(prev => ({ ...prev, footer: { ...prev.footer, socials: { ...prev.footer.socials, [platform]: value } } }));

// //   const removeSlide = (idx: number) => { 
// //       if(!confirm("Hapus slide ini?")) return;
// //       if (activeTab === 'home') setFormData(p => ({ ...p, slides: p.slides.filter((_, i) => i !== idx) }));
// //       else if (activeTab !== 'organizers') {
// //           const pageKey = (activeTab + 'Page') as keyof Pick<FormDataState, 'coursesPage' | 'blogPage' | 'forumPage' | 'libraryPage'>;
// //           if (formData[pageKey]) setFormData(p => ({ ...p, [pageKey]: { ...p[pageKey], slides: p[pageKey].slides.filter((_, i) => i !== idx) } }));
// //       }
// //   };

// //   const addForumCat = () => { if (!newForumCat.name) return; setFormData(p => ({ ...p, forumCategories: [...p.forumCategories, newForumCat] })); setNewForumCat({ name: '', iconUrl: '' }); };
// //   const removeForumCat = (idx: number) => setFormData(p => ({ ...p, forumCategories: p.forumCategories.filter((_, i) => i !== idx) }));
// //   const addCourseCat = () => { if (!newCourseCat) return; setFormData(p => ({ ...p, courseCategories: [...p.courseCategories, newCourseCat] })); setNewCourseCat(''); };
// //   const removeCourseCat = (idx: number) => setFormData(p => ({ ...p, courseCategories: p.courseCategories.filter((_, i) => i !== idx) }));
// //   const addLibCat = () => { if (!newLibCat) return; setFormData(p => ({ ...p, libraryCategories: [...p.libraryCategories, newLibCat] })); setNewLibCat(''); };
// //   const removeLibCat = (idx: number) => setFormData(p => ({ ...p, libraryCategories: p.libraryCategories.filter((_, i) => i !== idx) }));
  
// //   const addOrgCat = () => { if (!newOrgCat) return; setFormData(p => ({ ...p, organizerCategories: [...p.organizerCategories, newOrgCat] })); setNewOrgCat(''); };
// //   const removeOrgCat = (idx: number) => setFormData(p => ({ ...p, organizerCategories: p.organizerCategories.filter((_, i) => i !== idx) }));

// //   const getCurrent = () => {
// //       if (activeTab === 'home') return { title: formData.heroTitle, desc: formData.heroDescription, slides: formData.slides };
// //       if (activeTab === 'organizers') return { title: 'Manajemen Pelaksana', desc: 'Atur kategori pelaksana tambahan', slides: [] };
// //       let pageData: PageConfig | undefined;
// //       switch (activeTab) {
// //           case 'courses': pageData = formData.coursesPage; break;
// //           case 'blog': pageData = formData.blogPage; break;
// //           case 'forum': pageData = formData.forumPage; break;
// //           case 'library': pageData = formData.libraryPage; break;
// //       }
// //       return { title: pageData?.title || '', desc: pageData?.description || '', slides: pageData?.slides || [] };
// //   }

// //   const handleSave = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if(!confirm("Simpan perubahan?")) return;
// //     setSaving(true);
// //     try {
// //       await api('/api/content', { method: 'PUT', body: JSON.stringify(formData) });
// //       alert("✅ Pengaturan Berhasil Disimpan!");
// //       window.location.reload(); 
// //     } catch (e: any) { alert("Gagal: " + e.message); } finally { setSaving(false); }
// //   };

// //   if (loading) return <div className="p-20 text-center flex justify-center"><Loader2 className="animate-spin text-red-700"/></div>;
// //   const currentData = getCurrent();

// //   return (
// //     <Protected roles={['SUPER_ADMIN', 'ADMIN', 'FACILITATOR']} permissions={['manage_cms_info', 'manage_cms_design']}>
// //       <div className="min-h-screen bg-gray-50 pb-24 font-sans">
        
// //         {/* HEADER */}
// //         <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
// //             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
// //                 <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Layout size={20}/> CMS Konten</h1>
// //                 <button onClick={handleSave} disabled={saving} className="bg-[#990000] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#7f0000] flex items-center gap-2 transition-all shadow-sm disabled:opacity-50" aria-label="Simpan">
// //                     {saving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>} {saving ? 'Menyimpan...' : 'Simpan'}
// //                 </button>
// //             </div>
// //             {/* TABS */}
// //             <div className="px-6 py-2 bg-gray-50/50 backdrop-blur-sm">
// //                 <div className="flex gap-2 overflow-x-auto no-scrollbar">
// //                     {[
// //                         {id: 'home', label: 'Home', icon: Home},
// //                         {id: 'courses', label: 'Katalog', icon: BookOpen},
// //                         {id: 'organizers', label: 'Pelaksana', icon: Building}, 
// //                         {id: 'blog', label: 'Blog', icon: Newspaper},
// //                         {id: 'forum', label: 'Forum', icon: MessageSquare},
// //                         {id: 'library', label: 'Pustaka', icon: Book},
// //                     ].map(tab => (
// //                         <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all border ${activeTab === tab.id ? 'bg-white text-red-700 border-red-200 shadow-sm' : 'text-gray-500 hover:bg-white border-transparent'}`}>
// //                             <tab.icon size={16}/> {tab.label}
// //                         </button>
// //                     ))}
// //                 </div>
// //             </div>
// //         </div>
        
// //         <div className="max-w-5xl mx-auto px-6 space-y-8 mt-8">
            
// //             {/* HEADER & SLIDE */}
// //             {activeTab !== 'organizers' && (
// //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-500">
// //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex justify-between items-center">
// //                     <span>1. Header & Slide ({activeTab.toUpperCase()})</span>
// //                 </h2>
// //                 <div className="grid md:grid-cols-2 gap-6 mb-6">
// //                     <div className="space-y-4">
// //                         <div><label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="page-title">Judul Utama</label><input id="page-title" className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={currentData.title} onChange={e => handleTextChange('title', e.target.value)} /></div>
// //                         <div><label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="page-desc">Deskripsi Singkat</label><textarea id="page-desc" rows={3} className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={currentData.desc} onChange={e => handleTextChange('description', e.target.value)} /></div>
// //                     </div>
// //                     {activeTab === 'home' && (
// //                         <div className="border-2 border-dashed p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[100px] rounded text-center">
// //                             <label className="block text-sm font-bold text-gray-700 mb-2">Favicon</label>
// //                             {formData.faviconUrl ? <img src={getImageUrl(formData.faviconUrl)} className="h-12 w-12 mb-2 object-contain" alt="Favicon"/> : <ImageIcon size={32} className="text-gray-400 mb-2"/>}
// //                             <label htmlFor="upload-favicon" className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700">{uploadingFavicon ? '...' : 'Upload'}<input id="upload-favicon" type="file" className="hidden" onChange={handleUploadFavicon} disabled={uploadingFavicon} aria-label="Upload Favicon"/></label>
// //                         </div>
// //                     )}
// //                 </div>
// //                 <h3 className="text-sm font-bold text-gray-700 mb-2">Slide Gambar ({currentData.slides.length})</h3>
// //                 <div className="flex gap-4 overflow-x-auto pb-2">
// //                     {currentData.slides.map((url: string, idx: number) => (
// //                         <div key={idx} className="relative w-40 h-24 flex-shrink-0 group rounded-lg overflow-hidden border">
// //                             <img src={getImageUrl(url)} className="w-full h-full object-cover" alt="Slide"/>
// //                             <button type="button" onClick={() => removeSlide(idx)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700" aria-label={`Hapus slide ${idx + 1}`}><Trash size={12}/></button>
// //                         </div>
// //                     ))}
// //                     <label htmlFor="upload-slide" className="w-40 h-24 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 rounded-lg flex-shrink-0 text-xs text-gray-500 font-bold hover:border-red-300"><Plus size={20} className="mb-1 text-gray-400"/> {uploadingSlide ? '...' : 'Tambah'}<input id="upload-slide" type="file" className="hidden" onChange={handleUploadSlide} disabled={uploadingSlide} aria-label="Tambah Slide"/></label>
// //                 </div>
// //             </div>
// //             )}

// //             {/* TAB: ORGANIZERS / PELAKSANA */}
// //             {activeTab === 'organizers' && (
// //                 <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
// //                     <h2 className="text-lg font-bold text-orange-800 mb-4 border-b border-orange-200 pb-2 flex items-center gap-2"><Building size={18}/> Kategori Pelaksana Pelatihan</h2>
// //                     <p className="text-xs text-orange-600 mb-4">Tambahkan tipe pelaksana selain PMI Pusat/Provinsi/Kota (Misal: Mitra, NGO, Unit PMR).</p>
// //                     <div className="flex gap-2 mb-4">
// //                         <input className="flex-1 border p-2 text-sm rounded outline-none" value={newOrgCat} onChange={e=>setNewOrgCat(e.target.value)} placeholder="Tipe Pelaksana Baru" aria-label="Nama Tipe Pelaksana Baru"/>
// //                         <button type="button" onClick={addOrgCat} className="bg-orange-600 text-white px-4 rounded hover:bg-orange-700 font-bold" aria-label="Tambah Kategori Pelaksana"><Plus size={18}/></button>
// //                     </div>
// //                     <div className="flex flex-wrap gap-2">
// //                         {formData.organizerCategories?.map((c,i)=>(
// //                             <span key={i} className="bg-white border border-orange-200 text-orange-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c} <button onClick={()=>removeOrgCat(i)} className="text-red-400 hover:text-red-600" aria-label={`Hapus Pelaksana ${c}`}><Trash size={14}/></button></span>
// //                         ))}
// //                     </div>
// //                 </div>
// //             )}

// //             {/* TAB: COURSES */}
// //             {activeTab === 'courses' && (
// //                 <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
// //                     <h2 className="text-lg font-bold text-green-800 mb-4 border-b border-green-200 pb-2 flex items-center gap-2"><List size={18}/> Kategori Pelatihan</h2>
// //                     <div className="flex gap-2 mb-4">
// //                         <input className="flex-1 border p-2 text-sm rounded outline-none" value={newCourseCat} onChange={e=>setNewCourseCat(e.target.value)} placeholder="Nama Kategori Baru" aria-label="Nama Kategori Pelatihan Baru"/>
// //                         <button type="button" onClick={addCourseCat} className="bg-green-600 text-white px-4 rounded hover:bg-green-700 font-bold" aria-label="Tambah Kategori Pelatihan"><Plus size={18}/></button>
// //                     </div>
// //                     <div className="flex flex-wrap gap-2">
// //                         {formData.courseCategories.map((c,i)=>(
// //                             <span key={i} className="bg-white border border-green-200 text-green-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c} <button onClick={()=>removeCourseCat(i)} className="text-red-400 hover:text-red-600" aria-label={`Hapus Kategori ${c}`}><X size={14}/></button></span>
// //                         ))}
// //                     </div>
// //                 </div>
// //             )}

// //             {/* TAB: FORUM */}
// //              {activeTab === 'forum' && (
// //                 <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
// //                     <h2 className="text-lg font-bold text-blue-800 mb-4 border-b border-blue-200 pb-2 flex items-center gap-2"><List size={18}/> Kategori Forum</h2>
// //                     <div className="flex gap-2 mb-4 items-center">
// //                         <input className="flex-1 border p-2 text-sm rounded outline-none" value={newForumCat.name} onChange={e=>setNewForumCat({...newForumCat, name:e.target.value})} placeholder="Nama Forum" aria-label="Nama Kategori Forum Baru"/>
// //                         <label htmlFor="upload-forum-icon" className="bg-white border p-2 rounded cursor-pointer text-xs hover:bg-gray-50" aria-label="Upload Icon Forum">
// //                             {uploadingForumIcon ? <Loader2 size={18} className="animate-spin text-blue-500"/> : <UploadCloud size={18} className="text-blue-500"/>}
// //                             <input id="upload-forum-icon" type="file" className="hidden" onChange={handleUploadForumIcon} aria-label="Input File Icon Forum"/>
// //                         </label>
// //                         <button type="button" onClick={addForumCat} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold" aria-label="Tambah Forum"><Plus size={18}/></button>
// //                     </div>
// //                     <div className="flex flex-wrap gap-2">
// //                         {formData.forumCategories.map((c,i)=>(
// //                             <span key={i} className="bg-white border border-blue-200 text-blue-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c.name} <button onClick={()=>removeForumCat(i)} className="text-red-400 hover:text-red-600" aria-label={`Hapus forum ${c.name}`}><X size={14}/></button></span>
// //                         ))}
// //                     </div>
// //                 </div>
// //             )}

// //             {/* TAB: LIBRARY */}
// //             {activeTab === 'library' && (
// //                 <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
// //                     <h2 className="text-lg font-bold text-purple-800 mb-4 border-b border-purple-200 pb-2 flex items-center gap-2"><List size={18}/> Kategori Perpustakaan</h2>
// //                     <div className="flex gap-2 mb-4">
// //                         <input className="flex-1 border p-2 text-sm rounded outline-none" value={newLibCat} onChange={e=>setNewLibCat(e.target.value)} placeholder="Kategori Buku" aria-label="Nama Kategori Pustaka Baru"/>
// //                         <button type="button" onClick={addLibCat} className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700 font-bold" aria-label="Tambah Kategori Pustaka"><Plus size={18}/></button>
// //                     </div>
// //                     <div className="flex flex-wrap gap-2">
// //                         {formData.libraryCategories.map((c,i)=>(
// //                             <span key={i} className="bg-white border border-purple-200 text-purple-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c} <button onClick={()=>removeLibCat(i)} className="text-red-400 hover:text-red-600" aria-label={`Hapus kategori ${c}`}><X size={14}/></button></span>
// //                         ))}
// //                     </div>
// //                 </div>
// //             )}

// //             {/* TAB FOOTER & FEATURES (HOME) */}
// //             {activeTab === 'home' && (
// //                 <>
// //                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// //                         <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Fitur Utama (Info Cards)</h2>
// //                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                             {formData.features.map((feat, idx) => (
// //                                 <div key={idx} className="p-3 border rounded-lg bg-gray-50">
// //                                     <label className="block text-xs font-bold text-gray-500 mb-1" htmlFor={`feat-title-${idx}`}>Kartu #{idx + 1}</label>
// //                                     <input id={`feat-title-${idx}`} className="w-full border rounded p-2 text-sm mb-2" value={feat.title} onChange={e => handleFeatureChange(idx, 'title', e.target.value)} placeholder="Judul" aria-label={`Judul Kartu ${idx+1}`}/>
// //                                     <textarea className="w-full border rounded p-2 text-sm" value={feat.description} onChange={e => handleFeatureChange(idx, 'description', e.target.value)} placeholder="Deskripsi" aria-label={`Deskripsi Kartu ${idx+1}`}/>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     </div>
// //                     {/* ... Footer ... */}
// //                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10">
// //                         <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Pengaturan Footer Global</h2>
// //                         <div className="grid md:grid-cols-2 gap-6">
// //                             <div className="space-y-4">
// //                                 <div>
// //                                     <label className="block text-sm font-bold text-gray-700 mb-2">Logo Footer</label>
// //                                     <div className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50">
// //                                         {formData.footer.logoUrl ? <img src={getImageUrl(formData.footer.logoUrl)} className="h-10 w-auto object-contain" alt="Logo"/> : <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center"><ImageIcon size={20}/></div>}
// //                                         <label htmlFor="upload-footer-logo" className="cursor-pointer bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-700">
// //                                             {uploadingFooterLogo ? '...' : 'Ganti Logo'}
// //                                             <input id="upload-footer-logo" type="file" className="hidden" onChange={handleUploadFooterLogo} disabled={uploadingFooterLogo} aria-label="Upload Logo Footer"/>
// //                                         </label>
// //                                     </div>
// //                                 </div>
// //                                 <div><label className="block text-xs font-bold mb-1" htmlFor="footer-about">Tentang</label><textarea id="footer-about" rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.about} onChange={e => handleFooterChange('about', e.target.value)}/></div>
// //                                 <div><label className="block text-xs font-bold mb-1" htmlFor="footer-address">Alamat</label><textarea id="footer-address" rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.address} onChange={e => handleFooterChange('address', e.target.value)}/></div>
// //                             </div>
// //                             <div className="space-y-4">
// //                                 <div className="grid grid-cols-2 gap-2">
// //                                     <div><label className="block text-xs font-bold mb-1" htmlFor="footer-phone">Telepon</label><input id="footer-phone" className="w-full border rounded p-2 text-sm" value={formData.footer.phone} onChange={e => handleFooterChange('phone', e.target.value)}/></div>
// //                                     <div><label className="block text-xs font-bold mb-1" htmlFor="footer-email">Email</label><input id="footer-email" className="w-full border rounded p-2 text-sm" value={formData.footer.email} onChange={e => handleFooterChange('email', e.target.value)}/></div>
// //                                 </div>
// //                                 <div><label className="block text-xs font-bold mb-1" htmlFor="footer-copy">Copyright</label><input id="footer-copy" className="w-full border rounded p-2 text-sm" value={formData.footer.copyright} onChange={e => handleFooterChange('copyright', e.target.value)}/></div>
// //                                 <div className="bg-gray-50 p-3 rounded border">
// //                                     <h3 className="text-xs font-bold mb-2">Social Media</h3>
// //                                     <div className="grid grid-cols-2 gap-2">{['facebook','instagram','twitter','youtube'].map(soc => (<div key={soc}><input className="w-full border rounded p-1.5 text-xs" placeholder={soc} value={formData.footer.socials?.[soc] || ''} onChange={e => handleSocialChange(soc, e.target.value)} aria-label={`Link ${soc}`}/></div>))}</div>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </>
// //             )}

// //         </div>
// //       </div>
// //     </Protected>
// //   );
// // }

// 'use client';

// import { useState, useEffect } from 'react';
// import { api, getImageUrl, apiUpload } from '@/lib/api';
// import Protected from '@/components/Protected'; 
// import { Save, Plus, X, UploadCloud, Layout, List, Trash, Image as ImageIcon, Loader2, Home, BookOpen, Newspaper, MessageSquare, Book, Building } from 'lucide-react';

// interface Feature { title: string; description: string; }
// interface ForumCategory { name: string; iconUrl: string; }
// interface PageConfig { title: string; description: string; slides: string[]; }

// interface FormDataState {
//   heroTitle: string; heroDescription: string; heroBgUrl: string; faviconUrl: string; slides: string[];
//   features: Feature[];
//   coursesPage: PageConfig;
//   blogPage: PageConfig;
//   forumPage: PageConfig;
//   libraryPage: PageConfig;
//   footer: {
//     about: string; address: string; phone: string; email: string; website: string; copyright: string; logoUrl: string; 
//     socials: { facebook: string; instagram: string; twitter: string; youtube: string; [key: string]: string; };
//   };
//   forumCategories: ForumCategory[];
//   courseCategories: string[];
//   libraryCategories: string[];
//   organizerCategories: string[]; // [BARU]
// }

// export default function AdminContentPage() {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'blog' | 'forum' | 'library' | 'organizers'>('home');
  
//   const [uploadingSlide, setUploadingSlide] = useState(false);
//   const [uploadingFavicon, setUploadingFavicon] = useState(false);
//   const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false);
//   const [uploadingForumIcon, setUploadingForumIcon] = useState(false);

//   const [newForumCat, setNewForumCat] = useState({ name: '', iconUrl: '' });
//   const [newCourseCat, setNewCourseCat] = useState('');
//   const [newLibCat, setNewLibCat] = useState('');
//   const [newOrgCat, setNewOrgCat] = useState(''); // [BARU]

//   const [formData, setFormData] = useState<FormDataState>({
//     heroTitle: '', heroDescription: '', heroBgUrl: '', faviconUrl: '', slides: [],
//     features: [ { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } ],
//     coursesPage: { title: '', description: '', slides: [] },
//     blogPage: { title: '', description: '', slides: [] },
//     forumPage: { title: '', description: '', slides: [] },
//     libraryPage: { title: '', description: '', slides: [] },
//     footer: { about: '', address: '', phone: '', email: '', website: '', copyright: '', logoUrl: '', socials: { facebook: '', instagram: '', twitter: '', youtube: '' } },
//     forumCategories: [], courseCategories: [], libraryCategories: [],
//     organizerCategories: ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota'] // Default
//   });

//   useEffect(() => { loadContent(); }, []);

//   const loadContent = async () => {
//     try {
//       const data = await api('/api/content');
//       if (data) {
//           setFormData({
//             ...data,
//             coursesPage: data.coursesPage || { title: 'Katalog Pelatihan', description: '', slides: [] },
//             blogPage: data.blogPage || { title: 'Cerita Relawan', description: '', slides: [] },
//             forumPage: data.forumPage || { title: 'Forum Diskusi', description: '', slides: [] },
//             libraryPage: data.libraryPage || { title: 'Perpustakaan Digital', description: '', slides: [] },
//             features: data.features?.length ? data.features : [ { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } ],
//             footer: { ...data.footer, socials: { facebook: '', instagram: '', twitter: '', youtube: '', ...(data.footer?.socials || {}) } },
//             organizerCategories: data.organizerCategories?.length ? data.organizerCategories : ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota']
//           });
//       }
//     } catch (e) { console.error(e); } finally { setLoading(false); }
//   };

//   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void, loader: (v: boolean) => void) => {
//     if (!e.target.files?.[0]) return;
//     loader(true);
//     try {
//       const fd = new FormData();
//       fd.append('file', e.target.files[0]);
//       const res = await apiUpload('/api/upload', fd); 
//       const url = res.url || res.file?.url;
//       if (url) setter(url);
//     } catch (e: any) { alert(e.message); } finally { loader(false); }
//   };

//   const handleUploadSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
//       handleUpload(e, (url) => {
//           if (activeTab === 'home') setFormData(p => ({...p, slides: [...p.slides, url]}));
//           else if (activeTab !== 'organizers') {
//              const pageKey = (activeTab + 'Page') as keyof Pick<FormDataState, 'coursesPage' | 'blogPage' | 'forumPage' | 'libraryPage'>;
//              if (formData[pageKey]) setFormData(p => ({ ...p, [pageKey]: { ...p[pageKey], slides: [...p[pageKey].slides, url] } }));
//           }
//       }, setUploadingSlide);
//   }
  
//   const handleUploadFavicon = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setFormData(p => ({...p, faviconUrl: url})), setUploadingFavicon);
//   const handleUploadFooterLogo = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setFormData(p => ({...p, footer: {...p.footer, logoUrl: url}})), setUploadingFooterLogo);
//   const handleUploadForumIcon = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setNewForumCat(p => ({...p, iconUrl: url})), setUploadingForumIcon);

//   const handleTextChange = (field: 'title' | 'description', value: string) => {
//       if (activeTab === 'home') {
//           if (field === 'title') setFormData(p => ({...p, heroTitle: value}));
//           else setFormData(p => ({...p, heroDescription: value}));
//       } else if (activeTab !== 'organizers') {
//           const pageKey = (activeTab + 'Page') as keyof Pick<FormDataState, 'coursesPage' | 'blogPage' | 'forumPage' | 'libraryPage'>;
//           if (formData[pageKey]) setFormData(p => ({ ...p, [pageKey]: { ...p[pageKey], [field]: value } }));
//       }
//   }

//   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
//       const newFeatures = [...formData.features];
//       newFeatures[index] = { ...newFeatures[index], [field]: value };
//       setFormData({ ...formData, features: newFeatures });
//   };
//   const handleFooterChange = (field: string, value: string) => setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
//   const handleSocialChange = (platform: string, value: string) => setFormData(prev => ({ ...prev, footer: { ...prev.footer, socials: { ...prev.footer.socials, [platform]: value } } }));

//   const removeSlide = (idx: number) => { 
//       if(!confirm("Hapus slide ini?")) return;
//       if (activeTab === 'home') setFormData(p => ({ ...p, slides: p.slides.filter((_, i) => i !== idx) }));
//       else if (activeTab !== 'organizers') {
//           const pageKey = (activeTab + 'Page') as keyof Pick<FormDataState, 'coursesPage' | 'blogPage' | 'forumPage' | 'libraryPage'>;
//           if (formData[pageKey]) setFormData(p => ({ ...p, [pageKey]: { ...p[pageKey], slides: p[pageKey].slides.filter((_, i) => i !== idx) } }));
//       }
//   };

//   const addForumCat = () => { if (!newForumCat.name) return; setFormData(p => ({ ...p, forumCategories: [...p.forumCategories, newForumCat] })); setNewForumCat({ name: '', iconUrl: '' }); };
//   const removeForumCat = (idx: number) => setFormData(p => ({ ...p, forumCategories: p.forumCategories.filter((_, i) => i !== idx) }));
//   const addCourseCat = () => { if (!newCourseCat) return; setFormData(p => ({ ...p, courseCategories: [...p.courseCategories, newCourseCat] })); setNewCourseCat(''); };
//   const removeCourseCat = (idx: number) => setFormData(p => ({ ...p, courseCategories: p.courseCategories.filter((_, i) => i !== idx) }));
//   const addLibCat = () => { if (!newLibCat) return; setFormData(p => ({ ...p, libraryCategories: [...p.libraryCategories, newLibCat] })); setNewLibCat(''); };
//   const removeLibCat = (idx: number) => setFormData(p => ({ ...p, libraryCategories: p.libraryCategories.filter((_, i) => i !== idx) }));
  
//   // [BARU] Handler Pelaksana
//   const addOrgCat = () => { if (!newOrgCat) return; setFormData(p => ({ ...p, organizerCategories: [...p.organizerCategories, newOrgCat] })); setNewOrgCat(''); };
//   const removeOrgCat = (idx: number) => setFormData(p => ({ ...p, organizerCategories: p.organizerCategories.filter((_, i) => i !== idx) }));

//   const getCurrent = () => {
//       if (activeTab === 'home') return { title: formData.heroTitle, desc: formData.heroDescription, slides: formData.slides };
//       if (activeTab === 'organizers') return { title: 'Manajemen Pelaksana', desc: 'Atur daftar pelaksana pelatihan', slides: [] };
//       let pageData: PageConfig | undefined;
//       switch (activeTab) {
//           case 'courses': pageData = formData.coursesPage; break;
//           case 'blog': pageData = formData.blogPage; break;
//           case 'forum': pageData = formData.forumPage; break;
//           case 'library': pageData = formData.libraryPage; break;
//       }
//       return { title: pageData?.title || '', desc: pageData?.description || '', slides: pageData?.slides || [] };
//   }

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if(!confirm("Simpan perubahan?")) return;
//     setSaving(true);
//     try {
//       await api('/api/content', { method: 'PUT', body: JSON.stringify(formData) });
//       alert("✅ Pengaturan Berhasil Disimpan!");
//       window.location.reload(); 
//     } catch (e: any) { alert("Gagal: " + e.message); } finally { setSaving(false); }
//   };

//   if (loading) return <div className="p-20 text-center flex justify-center"><Loader2 className="animate-spin text-red-700"/></div>;
//   const currentData = getCurrent();

//   return (
//     <Protected roles={['SUPER_ADMIN', 'ADMIN', 'FACILITATOR']} permissions={['manage_cms_info', 'manage_cms_design']}>
//       <div className="min-h-screen bg-gray-50 pb-24 font-sans">
        
//         {/* HEADER */}
//         <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
//             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
//                 <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Layout size={20}/> CMS Konten</h1>
//                 <button onClick={handleSave} disabled={saving} className="bg-[#990000] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#7f0000] flex items-center gap-2 transition-all shadow-sm disabled:opacity-50" aria-label="Simpan">{saving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>} {saving ? 'Menyimpan...' : 'Simpan'}</button>
//             </div>
//             {/* TABS */}
//             <div className="px-6 py-2 bg-gray-50/50 backdrop-blur-sm">
//                 <div className="flex gap-2 overflow-x-auto no-scrollbar">
//                     {[
//                         {id: 'home', label: 'Home', icon: Home},
//                         {id: 'courses', label: 'Katalog', icon: BookOpen},
//                         {id: 'organizers', label: 'Pelaksana', icon: Building}, 
//                         {id: 'blog', label: 'Blog', icon: Newspaper},
//                         {id: 'forum', label: 'Forum', icon: MessageSquare},
//                         {id: 'library', label: 'Pustaka', icon: Book},
//                     ].map(tab => (
//                         <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all border ${activeTab === tab.id ? 'bg-white text-red-700 border-red-200 shadow-sm' : 'text-gray-500 hover:bg-white border-transparent'}`} aria-label={tab.label}><tab.icon size={16}/> {tab.label}</button>
//                     ))}
//                 </div>
//             </div>
//         </div>
        
//         <div className="max-w-5xl mx-auto px-6 space-y-8 mt-8">
            
//             {/* HEADER & SLIDE */}
//             {activeTab !== 'organizers' && (
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-500">
//                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex justify-between items-center">
//                     <span>1. Header & Slide ({activeTab.toUpperCase()})</span>
//                 </h2>
//                 <div className="grid md:grid-cols-2 gap-6 mb-6">
//                     <div className="space-y-4">
//                         <div><label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="page-title">Judul Utama</label><input id="page-title" className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={currentData.title} onChange={e => handleTextChange('title', e.target.value)} /></div>
//                         <div><label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="page-desc">Deskripsi Singkat</label><textarea id="page-desc" rows={3} className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={currentData.desc} onChange={e => handleTextChange('description', e.target.value)} /></div>
//                     </div>
//                     {activeTab === 'home' && (
//                         <div className="border-2 border-dashed p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[100px] rounded text-center">
//                             <label className="block text-sm font-bold text-gray-700 mb-2">Favicon</label>
//                             {formData.faviconUrl ? <img src={getImageUrl(formData.faviconUrl)} className="h-12 w-12 mb-2 object-contain" alt="Favicon"/> : <ImageIcon size={32} className="text-gray-400 mb-2"/>}
//                             <label htmlFor="upload-favicon" className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700">{uploadingFavicon ? '...' : 'Upload'}<input id="upload-favicon" type="file" className="hidden" onChange={handleUploadFavicon} disabled={uploadingFavicon} aria-label="Upload Favicon"/></label>
//                         </div>
//                     )}
//                 </div>
//                 <h3 className="text-sm font-bold text-gray-700 mb-2">Slide Gambar ({currentData.slides.length})</h3>
//                 <div className="flex gap-4 overflow-x-auto pb-2">
//                     {currentData.slides.map((url: string, idx: number) => (
//                         <div key={idx} className="relative w-40 h-24 flex-shrink-0 group rounded-lg overflow-hidden border">
//                             <img src={getImageUrl(url)} className="w-full h-full object-cover" alt="Slide"/>
//                             <button type="button" onClick={() => removeSlide(idx)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700" aria-label={`Hapus slide ${idx + 1}`}><Trash size={12}/></button>
//                         </div>
//                     ))}
//                     <label htmlFor="upload-slide" className="w-40 h-24 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 rounded-lg flex-shrink-0 text-xs text-gray-500 font-bold hover:border-red-300"><Plus size={20} className="mb-1 text-gray-400"/> {uploadingSlide ? '...' : 'Tambah'}<input id="upload-slide" type="file" className="hidden" onChange={handleUploadSlide} disabled={uploadingSlide} aria-label="Tambah Slide"/></label>
//                 </div>
//             </div>
//             )}

//             {/* TAB: ORGANIZERS / PELAKSANA */}
//             {activeTab === 'organizers' && (
//                 <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
//                     <h2 className="text-lg font-bold text-orange-800 mb-4 border-b border-orange-200 pb-2 flex items-center gap-2"><Building size={18}/> Kategori Pelaksana Pelatihan</h2>
//                     <p className="text-xs text-orange-600 mb-4">Tambahkan tipe pelaksana selain PMI Pusat/Provinsi/Kota (Misal: Mitra, NGO, Unit PMR).</p>
//                     <div className="flex gap-2 mb-4">
//                         <input className="flex-1 border p-2 text-sm rounded outline-none" value={newOrgCat} onChange={e=>setNewOrgCat(e.target.value)} placeholder="Tipe Pelaksana Baru" aria-label="Nama Pelaksana Baru"/>
//                         <button type="button" onClick={addOrgCat} className="bg-orange-600 text-white px-4 rounded hover:bg-orange-700 font-bold" aria-label="Tambah Pelaksana"><Plus size={18}/></button>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                         {formData.organizerCategories?.map((c,i)=>(
//                             <span key={i} className="bg-white border border-orange-200 text-orange-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c} <button onClick={()=>removeOrgCat(i)} className="text-red-400 hover:text-red-600" aria-label={`Hapus ${c}`}><Trash size={14}/></button></span>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* TAB: COURSES */}
//             {activeTab === 'courses' && (
//                 <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
//                     <h2 className="text-lg font-bold text-green-800 mb-4 border-b border-green-200 pb-2 flex items-center gap-2"><List size={18}/> Kategori Pelatihan</h2>
//                     <div className="flex gap-2 mb-4">
//                         <input className="flex-1 border p-2 text-sm rounded outline-none" value={newCourseCat} onChange={e=>setNewCourseCat(e.target.value)} placeholder="Nama Kategori Baru" aria-label="Nama Kategori Pelatihan Baru"/>
//                         <button type="button" onClick={addCourseCat} className="bg-green-600 text-white px-4 rounded hover:bg-green-700 font-bold" aria-label="Tambah Kategori Pelatihan"><Plus size={18}/></button>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                         {formData.courseCategories.map((c,i)=>(
//                             <span key={i} className="bg-white border border-green-200 text-green-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c} <button onClick={()=>removeCourseCat(i)} className="text-red-400 hover:text-red-600" aria-label={`Hapus Kategori ${c}`}><X size={14}/></button></span>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* TAB: FORUM */}
//              {activeTab === 'forum' && (
//                 <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
//                     <h2 className="text-lg font-bold text-blue-800 mb-4 border-b border-blue-200 pb-2 flex items-center gap-2"><List size={18}/> Kategori Forum</h2>
//                     <div className="flex gap-2 mb-4 items-center">
//                         <input className="flex-1 border p-2 text-sm rounded outline-none" value={newForumCat.name} onChange={e=>setNewForumCat({...newForumCat, name:e.target.value})} placeholder="Nama Forum" aria-label="Nama Forum"/>
//                         <label htmlFor="upload-forum-icon" className="bg-white border p-2 rounded cursor-pointer text-xs hover:bg-gray-50" aria-label="Upload Icon Forum">
//                             {uploadingForumIcon ? <Loader2 size={18} className="animate-spin text-blue-500"/> : <UploadCloud size={18} className="text-blue-500"/>}
//                             <input id="upload-forum-icon" type="file" className="hidden" onChange={handleUploadForumIcon} aria-label="Input File Icon Forum"/>
//                         </label>
//                         <button type="button" onClick={addForumCat} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold" aria-label="Tambah Forum"><Plus size={18}/></button>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                         {formData.forumCategories.map((c,i)=>(
//                             <span key={i} className="bg-white border border-blue-200 text-blue-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c.name} <button onClick={()=>removeForumCat(i)} className="text-red-400 hover:text-red-600" aria-label={`Hapus forum ${c.name}`}><X size={14}/></button></span>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* TAB: LIBRARY */}
//             {activeTab === 'library' && (
//                 <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
//                     <h2 className="text-lg font-bold text-purple-800 mb-4 border-b border-purple-200 pb-2 flex items-center gap-2"><List size={18}/> Kategori Perpustakaan</h2>
//                     <div className="flex gap-2 mb-4">
//                         <input className="flex-1 border p-2 text-sm rounded outline-none" value={newLibCat} onChange={e=>setNewLibCat(e.target.value)} placeholder="Kategori Buku" aria-label="Nama Kategori Pustaka Baru"/>
//                         <button type="button" onClick={addLibCat} className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700 font-bold" aria-label="Tambah Kategori Pustaka"><Plus size={18}/></button>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                         {formData.libraryCategories.map((c,i)=>(
//                             <span key={i} className="bg-white border border-purple-200 text-purple-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c} <button onClick={()=>removeLibCat(i)} className="text-red-400 hover:text-red-600" aria-label={`Hapus kategori ${c}`}><X size={14}/></button></span>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* TAB FOOTER & FEATURES (HOME) */}
//             {activeTab === 'home' && (
//                 <>
//                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                         <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Fitur Utama (Info Cards)</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             {formData.features.map((feat, idx) => (
//                                 <div key={idx} className="p-3 border rounded-lg bg-gray-50">
//                                     <label className="block text-xs font-bold text-gray-500 mb-1" htmlFor={`feat-title-${idx}`}>Kartu #{idx + 1}</label>
//                                     <input id={`feat-title-${idx}`} className="w-full border rounded p-2 text-sm mb-2" value={feat.title} onChange={e => handleFeatureChange(idx, 'title', e.target.value)} placeholder="Judul" aria-label={`Judul Kartu ${idx+1}`}/>
//                                     <textarea className="w-full border rounded p-2 text-sm" value={feat.description} onChange={e => handleFeatureChange(idx, 'description', e.target.value)} placeholder="Deskripsi" aria-label={`Deskripsi Kartu ${idx+1}`}/>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     {/* ... Footer ... */}
//                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10">
//                         <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Pengaturan Footer Global</h2>
//                         <div className="grid md:grid-cols-2 gap-6">
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-bold text-gray-700 mb-2">Logo Footer</label>
//                                     <div className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50">
//                                         {formData.footer.logoUrl ? <img src={getImageUrl(formData.footer.logoUrl)} className="h-10 w-auto object-contain" alt="Logo"/> : <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center"><ImageIcon size={20}/></div>}
//                                         <label htmlFor="upload-footer-logo" className="cursor-pointer bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-700">
//                                             {uploadingFooterLogo ? '...' : 'Ganti Logo'}
//                                             <input id="upload-footer-logo" type="file" className="hidden" onChange={handleUploadFooterLogo} disabled={uploadingFooterLogo} aria-label="Upload Logo Footer"/>
//                                         </label>
//                                     </div>
//                                 </div>
//                                 <div><label className="block text-xs font-bold mb-1" htmlFor="footer-about">Tentang</label><textarea id="footer-about" rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.about} onChange={e => handleFooterChange('about', e.target.value)}/></div>
//                                 <div><label className="block text-xs font-bold mb-1" htmlFor="footer-address">Alamat</label><textarea id="footer-address" rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.address} onChange={e => handleFooterChange('address', e.target.value)}/></div>
//                             </div>
//                             <div className="space-y-4">
//                                 <div className="grid grid-cols-2 gap-2">
//                                     <div><label className="block text-xs font-bold mb-1" htmlFor="footer-phone">Telepon</label><input id="footer-phone" className="w-full border rounded p-2 text-sm" value={formData.footer.phone} onChange={e => handleFooterChange('phone', e.target.value)}/></div>
//                                     <div><label className="block text-xs font-bold mb-1" htmlFor="footer-email">Email</label><input id="footer-email" className="w-full border rounded p-2 text-sm" value={formData.footer.email} onChange={e => handleFooterChange('email', e.target.value)}/></div>
//                                 </div>
//                                 <div><label className="block text-xs font-bold mb-1" htmlFor="footer-copy">Copyright</label><input id="footer-copy" className="w-full border rounded p-2 text-sm" value={formData.footer.copyright} onChange={e => handleFooterChange('copyright', e.target.value)}/></div>
//                                 <div className="bg-gray-50 p-3 rounded border">
//                                     <h3 className="text-xs font-bold mb-2">Social Media</h3>
//                                     <div className="grid grid-cols-2 gap-2">{['facebook','instagram','twitter','youtube'].map(soc => (<div key={soc}><input className="w-full border rounded p-1.5 text-xs" placeholder={soc} value={formData.footer.socials?.[soc] || ''} onChange={e => handleSocialChange(soc, e.target.value)} aria-label={`Link ${soc}`}/></div>))}</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             )}

//         </div>
//       </div>
//     </Protected>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import { api, getImageUrl, apiUpload } from '@/lib/api';
import Protected from '@/components/Protected'; 
import { Save, Plus, X, UploadCloud, Layout, List, Trash, Image as ImageIcon, Loader2, Home, BookOpen, Newspaper, MessageSquare, Book, Building, CheckSquare, FileText } from 'lucide-react';

interface Feature { title: string; description: string; }
interface ForumCategory { name: string; iconUrl: string; }
interface PageConfig { title: string; description: string; slides: string[]; }

interface FormDataState {
  heroTitle: string; heroDescription: string; heroBgUrl: string; faviconUrl: string; slides: string[];
  features: Feature[];
  coursesPage: PageConfig;
  blogPage: PageConfig;
  forumPage: PageConfig;
  libraryPage: PageConfig;
  footer: {
    about: string; address: string; phone: string; email: string; website: string; copyright: string; logoUrl: string; 
    socials: { facebook: string; instagram: string; twitter: string; youtube: string; [key: string]: string; };
  };
  forumCategories: ForumCategory[];
  courseCategories: string[];
  libraryCategories: string[];
  organizerCategories: string[]; 
  trainingRequirements: string[]; 
  courseRequirements: string[]; // [BARU]
}

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'blog' | 'forum' | 'library' | 'training'>('home');
  
  const [uploadingSlide, setUploadingSlide] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false);
  const [uploadingForumIcon, setUploadingForumIcon] = useState(false);

  const [newForumCat, setNewForumCat] = useState({ name: '', iconUrl: '' });
  const [newCourseCat, setNewCourseCat] = useState('');
  const [newLibCat, setNewLibCat] = useState('');
  const [newOrgCat, setNewOrgCat] = useState(''); 
  const [newReq, setNewReq] = useState(''); 
  const [newCourseReq, setNewCourseReq] = useState(''); // [BARU] Input syarat kursus

  const [formData, setFormData] = useState<FormDataState>({
    heroTitle: '', heroDescription: '', heroBgUrl: '', faviconUrl: '', slides: [],
    features: [ { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } ],
    coursesPage: { title: '', description: '', slides: [] },
    blogPage: { title: '', description: '', slides: [] },
    forumPage: { title: '', description: '', slides: [] },
    libraryPage: { title: '', description: '', slides: [] },
    footer: { about: '', address: '', phone: '', email: '', website: '', copyright: '', logoUrl: '', socials: { facebook: '', instagram: '', twitter: '', youtube: '' } },
    forumCategories: [], courseCategories: [], libraryCategories: [],
    organizerCategories: ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota'],
    trainingRequirements: ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)'],
    courseRequirements: ['Outline Materi', 'Profil Pengajar'] // [BARU]
  });

  useEffect(() => { loadContent(); }, []);

  const loadContent = async () => {
    try {
      const data = await api('/api/content');
      if (data) {
          setFormData({
            ...data,
            coursesPage: data.coursesPage || { title: 'Katalog Pelatihan', description: '', slides: [] },
            blogPage: data.blogPage || { title: 'Cerita Relawan', description: '', slides: [] },
            forumPage: data.forumPage || { title: 'Forum Diskusi', description: '', slides: [] },
            libraryPage: data.libraryPage || { title: 'Perpustakaan Digital', description: '', slides: [] },
            features: data.features?.length ? data.features : [ { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } ],
            footer: { ...data.footer, socials: { facebook: '', instagram: '', twitter: '', youtube: '', ...(data.footer?.socials || {}) } },
            organizerCategories: data.organizerCategories?.length ? data.organizerCategories : ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota'],
            trainingRequirements: data.trainingRequirements?.length ? data.trainingRequirements : ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)'],
            courseRequirements: data.courseRequirements?.length ? data.courseRequirements : ['Outline Materi', 'Profil Pengajar'] // [BARU]
          });
      }
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void, loader: (v: boolean) => void) => {
    if (!e.target.files?.[0]) return;
    loader(true);
    try {
      const fd = new FormData();
      fd.append('file', e.target.files[0]);
      const res = await apiUpload('/api/upload', fd); 
      const url = res.url || res.file?.url;
      if (url) setter(url);
    } catch (e: any) { alert(e.message); } finally { loader(false); }
  };

  const handleUploadSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleUpload(e, (url) => {
          if (activeTab === 'home') setFormData(p => ({...p, slides: [...p.slides, url]}));
          else if (activeTab !== 'training') {
             const pageKey = (activeTab + 'Page') as keyof Pick<FormDataState, 'coursesPage' | 'blogPage' | 'forumPage' | 'libraryPage'>;
             if (formData[pageKey]) setFormData(p => ({ ...p, [pageKey]: { ...p[pageKey], slides: [...p[pageKey].slides, url] } }));
          }
      }, setUploadingSlide);
  }
  
  const handleUploadFavicon = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setFormData(p => ({...p, faviconUrl: url})), setUploadingFavicon);
  const handleUploadFooterLogo = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setFormData(p => ({...p, footer: {...p.footer, logoUrl: url}})), setUploadingFooterLogo);
  const handleUploadForumIcon = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setNewForumCat(p => ({...p, iconUrl: url})), setUploadingForumIcon);

  const handleTextChange = (field: 'title' | 'description', value: string) => {
      if (activeTab === 'home') {
          if (field === 'title') setFormData(p => ({...p, heroTitle: value}));
          else setFormData(p => ({...p, heroDescription: value}));
      } else if (activeTab !== 'training') {
          const pageKey = (activeTab + 'Page') as keyof Pick<FormDataState, 'coursesPage' | 'blogPage' | 'forumPage' | 'libraryPage'>;
          if (formData[pageKey]) setFormData(p => ({ ...p, [pageKey]: { ...p[pageKey], [field]: value } }));
      }
  }

  const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
      const newFeatures = [...formData.features];
      newFeatures[index] = { ...newFeatures[index], [field]: value };
      setFormData({ ...formData, features: newFeatures });
  };
  const handleFooterChange = (field: string, value: string) => setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
  const handleSocialChange = (platform: string, value: string) => setFormData(prev => ({ ...prev, footer: { ...prev.footer, socials: { ...prev.footer.socials, [platform]: value } } }));

  const removeSlide = (idx: number) => { 
      if(!confirm("Hapus slide ini?")) return;
      if (activeTab === 'home') setFormData(p => ({ ...p, slides: p.slides.filter((_, i) => i !== idx) }));
      else if (activeTab !== 'training') {
          const pageKey = (activeTab + 'Page') as keyof Pick<FormDataState, 'coursesPage' | 'blogPage' | 'forumPage' | 'libraryPage'>;
          if (formData[pageKey]) setFormData(p => ({ ...p, [pageKey]: { ...p[pageKey], slides: p[pageKey].slides.filter((_, i) => i !== idx) } }));
      }
  };

  const addForumCat = () => { if (!newForumCat.name) return; setFormData(p => ({ ...p, forumCategories: [...p.forumCategories, newForumCat] })); setNewForumCat({ name: '', iconUrl: '' }); };
  const removeForumCat = (idx: number) => setFormData(p => ({ ...p, forumCategories: p.forumCategories.filter((_, i) => i !== idx) }));
  const addCourseCat = () => { if (!newCourseCat) return; setFormData(p => ({ ...p, courseCategories: [...p.courseCategories, newCourseCat] })); setNewCourseCat(''); };
  const removeCourseCat = (idx: number) => setFormData(p => ({ ...p, courseCategories: p.courseCategories.filter((_, i) => i !== idx) }));
  const addLibCat = () => { if (!newLibCat) return; setFormData(p => ({ ...p, libraryCategories: [...p.libraryCategories, newLibCat] })); setNewLibCat(''); };
  const removeLibCat = (idx: number) => setFormData(p => ({ ...p, libraryCategories: p.libraryCategories.filter((_, i) => i !== idx) }));
  
  // [HANDLER PELAKSANA & SYARAT DOKUMEN]
  const addOrgCat = () => { if (!newOrgCat) return; setFormData(p => ({ ...p, organizerCategories: [...p.organizerCategories, newOrgCat] })); setNewOrgCat(''); };
  const removeOrgCat = (idx: number) => setFormData(p => ({ ...p, organizerCategories: p.organizerCategories.filter((_, i) => i !== idx) }));
  
  const addReq = () => { if (!newReq) return; setFormData(p => ({ ...p, trainingRequirements: [...p.trainingRequirements, newReq] })); setNewReq(''); };
  const removeReq = (idx: number) => setFormData(p => ({ ...p, trainingRequirements: p.trainingRequirements.filter((_, i) => i !== idx) }));

  // [BARU] Handler Syarat Kursus
  const addCourseReq = () => { if (!newCourseReq) return; setFormData(p => ({ ...p, courseRequirements: [...p.courseRequirements, newCourseReq] })); setNewCourseReq(''); };
  const removeCourseReq = (idx: number) => setFormData(p => ({ ...p, courseRequirements: p.courseRequirements.filter((_, i) => i !== idx) }));

  const getCurrent = () => {
      if (activeTab === 'home') return { title: formData.heroTitle, desc: formData.heroDescription, slides: formData.slides };
      if (activeTab === 'training') return { title: 'Konfigurasi Pelatihan', desc: 'Atur kategori pelaksana dan dokumen syarat pengajuan.', slides: [] };
      let pageData: PageConfig | undefined;
      switch (activeTab) {
          case 'courses': pageData = formData.coursesPage; break;
          case 'blog': pageData = formData.blogPage; break;
          case 'forum': pageData = formData.forumPage; break;
          case 'library': pageData = formData.libraryPage; break;
      }
      return { title: pageData?.title || '', desc: pageData?.description || '', slides: pageData?.slides || [] };
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!confirm("Simpan perubahan?")) return;
    setSaving(true);
    try {
      await api('/api/content', { method: 'PUT', body: JSON.stringify(formData) });
      alert("✅ Pengaturan Berhasil Disimpan!");
      window.location.reload(); 
    } catch (e: any) { alert("Gagal: " + e.message); } finally { setSaving(false); }
  };

  if (loading) return <div className="p-20 text-center flex justify-center"><Loader2 className="animate-spin text-red-700"/></div>;
  const currentData = getCurrent();

  return (
    <Protected roles={['SUPER_ADMIN', 'ADMIN', 'FACILITATOR']} permissions={['manage_cms_info', 'manage_cms_design']}>
      <div className="min-h-screen bg-gray-50 pb-24 font-sans">
        
        {/* HEADER */}
        <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Layout size={20}/> CMS Konten</h1>
                <button onClick={handleSave} disabled={saving} className="bg-[#990000] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#7f0000] flex items-center gap-2 transition-all shadow-sm disabled:opacity-50" aria-label="Simpan">{saving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>} {saving ? 'Menyimpan...' : 'Simpan'}</button>
            </div>
            {/* TABS */}
            <div className="px-6 py-2 bg-gray-50/50 backdrop-blur-sm">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {[
                        {id: 'home', label: 'Home', icon: Home},
                        {id: 'courses', label: 'Katalog', icon: BookOpen},
                        {id: 'training', label: 'Pelatihan', icon: CheckSquare}, 
                        {id: 'blog', label: 'Blog', icon: Newspaper},
                        {id: 'forum', label: 'Forum', icon: MessageSquare},
                        {id: 'library', label: 'Pustaka', icon: Book},
                    ].map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all border ${activeTab === tab.id ? 'bg-white text-red-700 border-red-200 shadow-sm' : 'text-gray-500 hover:bg-white border-transparent'}`} aria-label={tab.label}><tab.icon size={16}/> {tab.label}</button>
                    ))}
                </div>
            </div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 space-y-8 mt-8">
            
            {/* HEADER & SLIDE */}
            {activeTab !== 'training' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex justify-between items-center">
                    <span>1. Header & Slide ({activeTab.toUpperCase()})</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                        <div><label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="page-title">Judul Utama</label><input id="page-title" className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={currentData.title} onChange={e => handleTextChange('title', e.target.value)} /></div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="page-desc">Deskripsi Singkat</label><textarea id="page-desc" rows={3} className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={currentData.desc} onChange={e => handleTextChange('description', e.target.value)} /></div>
                    </div>
                    {activeTab === 'home' && (
                        <div className="border-2 border-dashed p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[100px] rounded text-center">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Favicon</label>
                            {formData.faviconUrl ? <img src={getImageUrl(formData.faviconUrl)} className="h-12 w-12 mb-2 object-contain" alt="Favicon"/> : <ImageIcon size={32} className="text-gray-400 mb-2"/>}
                            <label htmlFor="upload-favicon" className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700">{uploadingFavicon ? '...' : 'Upload'}<input id="upload-favicon" type="file" className="hidden" onChange={handleUploadFavicon} disabled={uploadingFavicon} aria-label="Upload Favicon"/></label>
                        </div>
                    )}
                </div>
                <h3 className="text-sm font-bold text-gray-700 mb-2">Slide Gambar ({currentData.slides.length})</h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {currentData.slides.map((url: string, idx: number) => (
                        <div key={idx} className="relative w-40 h-24 flex-shrink-0 group rounded-lg overflow-hidden border">
                            <img src={getImageUrl(url)} className="w-full h-full object-cover" alt="Slide"/>
                            <button type="button" onClick={() => removeSlide(idx)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700" aria-label={`Hapus slide ${idx + 1}`}><Trash size={12}/></button>
                        </div>
                    ))}
                    <label htmlFor="upload-slide" className="w-40 h-24 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 rounded-lg flex-shrink-0 text-xs text-gray-500 font-bold hover:border-red-300"><Plus size={20} className="mb-1 text-gray-400"/> {uploadingSlide ? '...' : 'Tambah'}<input id="upload-slide" type="file" className="hidden" onChange={handleUploadSlide} disabled={uploadingSlide} aria-label="Tambah Slide"/></label>
                </div>
            </div>
            )}

            {/* TAB: TRAINING (PELATIHAN - PELAKSANA + SYARAT DOKUMEN) */}
            {activeTab === 'training' && (
                <div className="space-y-6">
                    {/* Bagian 1: Kategori Pelaksana */}
                    <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <h2 className="text-lg font-bold text-orange-800 mb-4 border-b border-orange-200 pb-2 flex items-center gap-2"><Building size={18}/> 1. Kategori Pelaksana Pelatihan</h2>
                        <p className="text-xs text-orange-600 mb-4">Tambahkan tipe pelaksana selain PMI Pusat/Provinsi/Kota (Misal: Mitra, NGO, Unit PMR).</p>
                        <div className="flex gap-2 mb-4">
                            <input className="flex-1 border p-2 text-sm rounded outline-none" value={newOrgCat} onChange={e=>setNewOrgCat(e.target.value)} placeholder="Tipe Pelaksana Baru" aria-label="Nama Pelaksana Baru"/>
                            <button type="button" onClick={addOrgCat} className="bg-orange-600 text-white px-4 rounded hover:bg-orange-700 font-bold" aria-label="Tambah Pelaksana"><Plus size={18}/></button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.organizerCategories?.map((c,i)=>(
                                <span key={i} className="bg-white border border-orange-200 text-orange-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c} <button onClick={()=>removeOrgCat(i)} className="text-red-400 hover:text-red-600" aria-label={`Hapus ${c}`}><Trash size={14}/></button></span>
                            ))}
                        </div>
                    </div>

                    {/* Bagian 2: Syarat Dokumen Pengajuan (Diklat Resmi) */}
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <h2 className="text-lg font-bold text-blue-800 mb-4 border-b border-blue-200 pb-2 flex items-center gap-2"><FileText size={18}/> 2. Dokumen Syarat Pengajuan (Diklat Resmi)</h2>
                        <p className="text-xs text-blue-600 mb-4">Dokumen yang <strong>WAJIB</strong> diupload oleh pengaju saat membuat proposal pelatihan jenis Diklat Resmi.</p>
                        
                        <div className="flex gap-2 mb-4">
                            <input 
                                className="flex-1 border p-2 text-sm rounded outline-none" 
                                value={newReq} 
                                onChange={e=>setNewReq(e.target.value)} 
                                placeholder="Contoh: Kerangka Acuan Kerja (KAK)" 
                                aria-label="Nama Syarat Dokumen Baru"
                                onKeyDown={(e) => e.key === 'Enter' && addReq()}
                            />
                            <button type="button" onClick={addReq} className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 font-bold" aria-label="Tambah Syarat"><Plus size={18}/></button>
                        </div>

                        <div className="space-y-2">
                            {formData.trainingRequirements?.map((req, i) => (
                                <div key={i} className="bg-white border border-blue-200 text-blue-900 text-sm px-4 py-2.5 rounded flex justify-between items-center shadow-sm animate-in slide-in-from-left-1">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">Wajib</span>
                                        {req}
                                    </div>
                                    <button onClick={() => removeReq(i)} className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded" aria-label={`Hapus syarat ${req}`}>
                                        <Trash size={16}/>
                                    </button>
                                </div>
                            ))}
                            {(!formData.trainingRequirements || formData.trainingRequirements.length === 0) && (
                                <p className="text-sm text-gray-400 italic text-center py-4 border-2 border-dashed border-blue-200 rounded">Belum ada syarat dokumen yang diatur.</p>
                            )}
                        </div>
                    </div>

                    {/* [BARU] Bagian 3: Syarat Dokumen Pengajuan (Kursus Mandiri) */}
                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <h2 className="text-lg font-bold text-purple-800 mb-4 border-b border-purple-200 pb-2 flex items-center gap-2"><FileText size={18}/> 3. Dokumen Syarat Pengajuan (Kursus Mandiri)</h2>
                        <p className="text-xs text-purple-600 mb-4">Dokumen yang <strong>WAJIB</strong> diupload oleh pengaju saat membuat proposal jenis Kursus Mandiri.</p>
                        
                        <div className="flex gap-2 mb-4">
                            <input 
                                className="flex-1 border p-2 text-sm rounded outline-none" 
                                value={newCourseReq} 
                                onChange={e=>setNewCourseReq(e.target.value)} 
                                placeholder="Contoh: Outline Materi" 
                                aria-label="Nama Syarat Kursus Baru"
                                onKeyDown={(e) => e.key === 'Enter' && addCourseReq()}
                            />
                            <button type="button" onClick={addCourseReq} className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700 font-bold" aria-label="Tambah Syarat Kursus"><Plus size={18}/></button>
                        </div>

                        <div className="space-y-2">
                            {formData.courseRequirements?.map((req, i) => (
                                <div key={i} className="bg-white border border-purple-200 text-purple-900 text-sm px-4 py-2.5 rounded flex justify-between items-center shadow-sm animate-in slide-in-from-left-1">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded">Wajib</span>
                                        {req}
                                    </div>
                                    <button onClick={() => removeCourseReq(i)} className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded" aria-label={`Hapus syarat ${req}`}>
                                        <Trash size={16}/>
                                    </button>
                                </div>
                            ))}
                            {(!formData.courseRequirements || formData.courseRequirements.length === 0) && (
                                <p className="text-sm text-gray-400 italic text-center py-4 border-2 border-dashed border-purple-200 rounded">Belum ada syarat dokumen yang diatur.</p>
                            )}
                        </div>
                    </div>

                </div>
            )}

            {/* TAB: COURSES */}
            {activeTab === 'courses' && (
                <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <h2 className="text-lg font-bold text-green-800 mb-4 border-b border-green-200 pb-2 flex items-center gap-2"><List size={18}/> Kategori Pelatihan</h2>
                    <div className="flex gap-2 mb-4">
                        <input className="flex-1 border p-2 text-sm rounded outline-none" value={newCourseCat} onChange={e=>setNewCourseCat(e.target.value)} placeholder="Nama Kategori Baru" aria-label="Nama Kategori Pelatihan Baru"/>
                        <button type="button" onClick={addCourseCat} className="bg-green-600 text-white px-4 rounded hover:bg-green-700 font-bold" aria-label="Tambah Kategori Pelatihan"><Plus size={18}/></button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.courseCategories.map((c,i)=>(
                            <span key={i} className="bg-white border border-green-200 text-green-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c} <button onClick={()=>removeCourseCat(i)} className="text-red-400 hover:text-red-600" aria-label={`Hapus Kategori ${c}`}><X size={14}/></button></span>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB: FORUM */}
             {activeTab === 'forum' && (
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <h2 className="text-lg font-bold text-blue-800 mb-4 border-b border-blue-200 pb-2 flex items-center gap-2"><List size={18}/> Kategori Forum</h2>
                    <div className="flex gap-2 mb-4 items-center">
                        <input className="flex-1 border p-2 text-sm rounded outline-none" value={newForumCat.name} onChange={e=>setNewForumCat({...newForumCat, name:e.target.value})} placeholder="Nama Forum" aria-label="Nama Forum"/>
                        <label htmlFor="upload-forum-icon" className="bg-white border p-2 rounded cursor-pointer text-xs hover:bg-gray-50" aria-label="Upload Icon Forum">
                            {uploadingForumIcon ? <Loader2 size={18} className="animate-spin text-blue-500"/> : <UploadCloud size={18} className="text-blue-500"/>}
                            <input id="upload-forum-icon" type="file" className="hidden" onChange={handleUploadForumIcon} aria-label="Input File Icon Forum"/>
                        </label>
                        <button type="button" onClick={addForumCat} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold" aria-label="Tambah Forum"><Plus size={18}/></button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.forumCategories.map((c,i)=>(
                            <span key={i} className="bg-white border border-blue-200 text-blue-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c.name} <button onClick={()=>removeForumCat(i)} className="text-red-400 hover:text-red-600" aria-label={`Hapus forum ${c.name}`}><X size={14}/></button></span>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB: LIBRARY */}
            {activeTab === 'library' && (
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <h2 className="text-lg font-bold text-purple-800 mb-4 border-b border-purple-200 pb-2 flex items-center gap-2"><List size={18}/> Kategori Perpustakaan</h2>
                    <div className="flex gap-2 mb-4">
                        <input className="flex-1 border p-2 text-sm rounded outline-none" value={newLibCat} onChange={e=>setNewLibCat(e.target.value)} placeholder="Kategori Buku" aria-label="Nama Kategori Pustaka Baru"/>
                        <button type="button" onClick={addLibCat} className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700 font-bold" aria-label="Tambah Kategori Pustaka"><Plus size={18}/></button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.libraryCategories.map((c,i)=>(
                            <span key={i} className="bg-white border border-purple-200 text-purple-800 text-xs px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">{c} <button onClick={()=>removeLibCat(i)} className="text-red-400 hover:text-red-600" aria-label={`Hapus kategori ${c}`}><X size={14}/></button></span>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB FOOTER & FEATURES (HOME) */}
            {activeTab === 'home' && (
                <>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Fitur Utama (Info Cards)</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {formData.features.map((feat, idx) => (
                                <div key={idx} className="p-3 border rounded-lg bg-gray-50">
                                    <label className="block text-xs font-bold text-gray-500 mb-1" htmlFor={`feat-title-${idx}`}>Kartu #{idx + 1}</label>
                                    <input id={`feat-title-${idx}`} className="w-full border rounded p-2 text-sm mb-2" value={feat.title} onChange={e => handleFeatureChange(idx, 'title', e.target.value)} placeholder="Judul" aria-label={`Judul Kartu ${idx+1}`}/>
                                    <textarea className="w-full border rounded p-2 text-sm" value={feat.description} onChange={e => handleFeatureChange(idx, 'description', e.target.value)} placeholder="Deskripsi" aria-label={`Deskripsi Kartu ${idx+1}`}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* ... Footer ... */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Pengaturan Footer Global</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Logo Footer</label>
                                    <div className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50">
                                        {formData.footer.logoUrl ? <img src={getImageUrl(formData.footer.logoUrl)} className="h-10 w-auto object-contain" alt="Logo"/> : <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center"><ImageIcon size={20}/></div>}
                                        <label htmlFor="upload-footer-logo" className="cursor-pointer bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-700">
                                            {uploadingFooterLogo ? '...' : 'Ganti Logo'}
                                            <input id="upload-footer-logo" type="file" className="hidden" onChange={handleUploadFooterLogo} disabled={uploadingFooterLogo} aria-label="Upload Logo Footer"/>
                                        </label>
                                    </div>
                                </div>
                                <div><label className="block text-xs font-bold mb-1" htmlFor="footer-about">Tentang</label><textarea id="footer-about" rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.about} onChange={e => handleFooterChange('about', e.target.value)}/></div>
                                <div><label className="block text-xs font-bold mb-1" htmlFor="footer-address">Alamat</label><textarea id="footer-address" rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.address} onChange={e => handleFooterChange('address', e.target.value)}/></div>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <div><label className="block text-xs font-bold mb-1" htmlFor="footer-phone">Telepon</label><input id="footer-phone" className="w-full border rounded p-2 text-sm" value={formData.footer.phone} onChange={e => handleFooterChange('phone', e.target.value)}/></div>
                                    <div><label className="block text-xs font-bold mb-1" htmlFor="footer-email">Email</label><input id="footer-email" className="w-full border rounded p-2 text-sm" value={formData.footer.email} onChange={e => handleFooterChange('email', e.target.value)}/></div>
                                </div>
                                <div><label className="block text-xs font-bold mb-1" htmlFor="footer-copy">Copyright</label><input id="footer-copy" className="w-full border rounded p-2 text-sm" value={formData.footer.copyright} onChange={e => handleFooterChange('copyright', e.target.value)}/></div>
                                <div className="bg-gray-50 p-3 rounded border">
                                    <h3 className="text-xs font-bold mb-2">Social Media</h3>
                                    <div className="grid grid-cols-2 gap-2">{['facebook','instagram','twitter','youtube'].map(soc => (<div key={soc}><input className="w-full border rounded p-1.5 text-xs" placeholder={soc} value={formData.footer.socials?.[soc] || ''} onChange={e => handleSocialChange(soc, e.target.value)} aria-label={`Link ${soc}`}/></div>))}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
      </div>
    </Protected>
  );
}
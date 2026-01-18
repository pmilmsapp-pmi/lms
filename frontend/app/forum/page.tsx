// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { useAuth } from '@/lib/AuthProvider';
// // // import { api, getImageUrl } from '@/lib/api';
// // // import Protected from '@/components/Protected';
// // // import { Pencil, Check, X, Plus, Filter, MessageCircle } from 'lucide-react';
// // // import Link from 'next/link';

// // // export default function ForumPage() {
// // //   const { user } = useAuth();
  
// // //   // --- STATE ---
// // //   const [topics, setTopics] = useState<any[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [cmsCategories, setCmsCategories] = useState<string[]>(["General"]); 
// // //   const [activeTab, setActiveTab] = useState<'approved' | 'pending'>('approved');
// // //   const [categoryFilter, setCategoryFilter] = useState('Semua');
  
// // //   // Modals
// // //   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
// // //   const [createForm, setCreateForm] = useState({ title: '', content: '', category: '' });
// // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // //   const [editingTopic, setEditingTopic] = useState<any>(null);
// // //   const [cmsIcons, setCmsIcons] = useState<{name: string, iconUrl: string}[]>([]);

// // //   const isAdmin = user?.role === 'FACILITATOR' || user?.role === 'SUPER_ADMIN';

// // //   useEffect(() => {
// // //     loadCmsSettings();
// // //     loadTopics();
    
// // //     const handleUpdate = () => loadTopics();
// // //     window.addEventListener('notification-updated', handleUpdate);
    
// // //     // Polling setiap 10 detik agar realtime (Badge & Unread Status)
// // //     const interval = setInterval(loadTopics, 10000);

// // //     return () => {
// // //         window.removeEventListener('notification-updated', handleUpdate);
// // //         clearInterval(interval);
// // //     };
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [activeTab, categoryFilter]);

// // //   const loadCmsSettings = async () => {
// // //     try {
// // //         const content = await api('/api/content'); 
// // //         if (content && content.forumCategories?.length > 0) {
// // //             const catNames = content.forumCategories.map((c: any) => c.name);
// // //             setCmsCategories(catNames);
// // //             setCmsIcons(content.forumCategories);
// // //             setCreateForm(prev => ({ ...prev, category: catNames[0] }));
// // //         }
// // //     } catch (e) { console.error("Gagal load kategori CMS:", e); }
// // //   };

// // //   const loadTopics = async () => {
// // //     try {
// // //       const timestamp = new Date().getTime();
// // //       const statusQuery = activeTab === 'pending' ? 'pending' : 'approved';
      
// // //       const res = await api(`/api/forum?status=${statusQuery}&category=${categoryFilter}&t=${timestamp}`);
// // //       setTopics(res.topics || []);
// // //     } catch (e) { 
// // //       console.error(e); 
// // //     } finally { 
// // //       setLoading(false); 
// // //     }
// // //   };

// // //   const handleCreate = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     try {
// // //       const payload = { ...createForm, category: createForm.category || cmsCategories[0] };
// // //       await api('/api/forum', { method: 'POST', body: payload });
// // //       setIsCreateModalOpen(false);
// // //       setCreateForm({ title: '', content: '', category: cmsCategories[0] });
// // //       alert(isAdmin ? "Topik berhasil dibuat!" : "Permintaan topik dikirim! Menunggu persetujuan admin.");
// // //       loadTopics();
// // //     } catch (e: any) { alert("Gagal: " + e.message); }
// // //   };

// // //   const handleApprove = async (id: string, status: 'approved' | 'rejected') => {
// // //       if(!confirm(`Yakin ingin ${status === 'approved' ? 'menyetujui' : 'menolak'} topik ini?`)) return;
// // //       try {
// // //           await api(`/api/forum/${id}/status`, { method: 'PATCH', body: { status } });
// // //           loadTopics(); 
// // //       } catch (e: any) { alert(e.message); }
// // //   };

// // //   const openEditModal = (topic: any) => {
// // //     setEditingTopic({ 
// // //       _id: topic._id, 
// // //       title: topic.title, 
// // //       category: topic.category, 
// // //       avatarUrl: topic.avatarUrl 
// // //     });
// // //     setIsEditModalOpen(true);
// // //   };

// // //   const handleUpdateTopic = async () => {
// // //     if (!editingTopic) return;
// // //     try {
// // //       await api(`/api/forum/${editingTopic._id}`, { 
// // //         method: 'PATCH', 
// // //         body: { title: editingTopic.title, category: editingTopic.category, avatar: editingTopic.avatarUrl } 
// // //       });
// // //       alert("Perubahan berhasil disimpan!");
// // //       setIsEditModalOpen(false);
// // //       loadTopics();
// // //     } catch (e: any) { alert("Gagal update: " + e.message); }
// // //   };

// // //   return (
// // //     <Protected>
// // //       <div className="max-w-6xl mx-auto p-6 min-h-screen font-sans">
        
// // //         {/* HEADER */}
// // //         <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
// // //             <div>
// // //                 <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
// // //                   <MessageCircle className="text-red-700" size={32}/> Forum Diskusi
// // //                 </h1>
// // //                 <p className="text-gray-500 mt-1">Tempat bertanya dan berbagi ilmu.</p>
// // //             </div>
// // //             <button 
// // //                 onClick={() => setIsCreateModalOpen(true)} 
// // //                 className="bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-800 transition shadow-sm flex items-center gap-2"
// // //             >
// // //                 <Plus size={20} /> Buat Topik Baru
// // //             </button>
// // //         </div>

// // //         {/* FILTER BAR */}
// // //         <div className="flex flex-col md:flex-row justify-between items-center bg-white p-2 rounded-xl shadow-sm border border-gray-200 mb-6 gap-4">
// // //             <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-full md:w-auto">
// // //                 <button 
// // //                     onClick={() => setActiveTab('approved')} 
// // //                     className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'approved' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
// // //                 >
// // //                     Diskusi Aktif
// // //                 </button>
// // //                 {isAdmin && (
// // //                     <button 
// // //                         onClick={() => setActiveTab('pending')} 
// // //                         className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold transition-all flex justify-center items-center gap-2 ${activeTab === 'pending' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
// // //                     >
// // //                         Menunggu Persetujuan
// // //                     </button>
// // //                 )}
// // //             </div>
// // //             <div className="relative w-full md:w-64">
// // //                 <Filter className="absolute left-3 top-2.5 text-gray-400" size={16}/>
// // //                 <select 
// // //                     value={categoryFilter} 
// // //                     onChange={(e) => setCategoryFilter(e.target.value)} 
// // //                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none bg-white cursor-pointer"
// // //                     aria-label="Filter Kategori" // FIX: A11y Error
// // //                     title="Filter Kategori"
// // //                 >
// // //                     <option value="Semua">Semua Kategori</option>
// // //                     {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
// // //                 </select>
// // //             </div>
// // //         </div>

// // //         {/* LIST */}
// // //         {loading && topics.length === 0 ? (
// // //            <div className="text-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-700 mx-auto"></div></div>
// // //         ) : topics.length === 0 ? (
// // //            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed"><p className="text-gray-400 font-medium">Tidak ada topik.</p></div>
// // //         ) : (
// // //           <div className="space-y-4">
// // //             {topics.map((topic) => (
// // //                 <div key={topic._id} className={`bg-white p-6 rounded-2xl shadow-sm border transition-all group flex flex-col md:flex-row gap-4 justify-between items-start relative ${topic.hasUnread ? 'border-red-400 bg-red-50/20' : 'border-gray-200 hover:border-red-200'}`}>
                    
// // //                     {topic.hasUnread && (
// // //                         <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse shadow-sm z-10">
// // //                             PESAN BARU
// // //                         </div>
// // //                     )}

// // //                     <div className="flex gap-4 w-full">
// // //                         <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-100 overflow-hidden bg-gray-50">
// // //                             <img 
// // //                                 src={
// // //                                     (topic.avatarUrl && getImageUrl(topic.avatarUrl)) || 
// // //                                     (topic.author?.avatarUrl && getImageUrl(topic.author.avatarUrl)) || 
// // //                                     `https://ui-avatars.com/api/?name=${encodeURIComponent(topic.author?.name || 'User')}&background=random`
// // //                                 }
// // //                                 className="w-full h-full object-cover"
// // //                                 alt="Avatar"
// // //                                 onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(topic.title || 'Topic')}&background=random`; }}
// // //                             />
// // //                         </div>
// // //                         <div className="flex-1 pr-16">
// // //                             <div className="flex items-center gap-2 mb-1 flex-wrap">
// // //                                 <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">{topic.category}</span>
// // //                                 <span className="text-xs text-gray-400">• {new Date(topic.createdAt).toLocaleDateString('id-ID')}</span>
// // //                             </div>
                            
// // //                             <Link href={`/forum/${topic._id}`} className="text-lg font-bold text-gray-800 group-hover:text-red-700 transition-colors block mb-1">
// // //                                 {topic.title}
// // //                             </Link>
                            
// // //                             <p className="text-sm text-gray-600 line-clamp-2 mb-2">{topic.content}</p>
// // //                             <p className="text-xs text-gray-400 font-medium">Oleh: <span className="text-gray-600">{topic.author?.name}</span></p>
// // //                         </div>
// // //                     </div>
                    
// // //                     {activeTab === 'pending' && isAdmin && (
// // //                         <div className="flex md:flex-col gap-2 w-full md:w-auto mt-2 md:mt-0 z-20">
// // //                             <button onClick={() => openEditModal(topic)} className="flex items-center justify-center gap-1 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition text-xs font-bold" aria-label="Edit Topik"><Pencil size={14} /> Edit</button>
// // //                             <button onClick={() => handleApprove(topic._id, 'approved')} className="flex items-center justify-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-xs font-bold" aria-label="Setujui Topik"><Check size={14} /> Setuju</button>
// // //                             <button onClick={() => handleApprove(topic._id, 'rejected')} className="flex items-center justify-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-xs font-bold" aria-label="Tolak Topik"><X size={14} /> Tolak</button>
// // //                         </div>
// // //                     )}
// // //                 </div>
// // //             ))}
// // //          </div>
// // //         )}

// // //         {/* MODAL CREATE */}
// // //         {isCreateModalOpen && (
// // //             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
// // //                 <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl">
// // //                     <div className="flex justify-between items-center mb-4">
// // //                         <h2 className="text-xl font-bold">Buat Topik Baru</h2>
// // //                         {/* FIX: A11y Error */}
// // //                         <button onClick={() => setIsCreateModalOpen(false)} aria-label="Tutup Modal">
// // //                             <X className="text-gray-400 hover:text-red-600"/>
// // //                         </button>
// // //                     </div>
// // //                     <form onSubmit={handleCreate} className="space-y-4">
// // //                         <input required className="w-full border rounded-lg px-3 py-2" value={createForm.title} onChange={e => setCreateForm({...createForm, title: e.target.value})} placeholder="Judul Diskusi" aria-label="Judul Diskusi"/>
                        
// // //                         <select 
// // //                             className="w-full border rounded-lg px-3 py-2 bg-white" 
// // //                             value={createForm.category} 
// // //                             onChange={e => setCreateForm({...createForm, category: e.target.value})}
// // //                             aria-label="Pilih Kategori" // FIX: A11y Error
// // //                         >
// // //                             {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
// // //                         </select>
                        
// // //                         <textarea required rows={4} className="w-full border rounded-lg px-3 py-2" value={createForm.content} onChange={e => setCreateForm({...createForm, content: e.target.value})} placeholder="Isi diskusi..." aria-label="Isi Diskusi"/>
// // //                         <div className="flex justify-end gap-2 mt-6 pt-4 border-t"><button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button><button type="submit" className="px-6 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800">{isAdmin ? 'Terbitkan' : 'Kirim Request'}</button></div>
// // //                     </form>
// // //                 </div>
// // //             </div>
// // //         )}

// // //         {/* MODAL EDIT */}
// // //         {isEditModalOpen && editingTopic && (
// // //             <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
// // //                 <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl">
// // //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
// // //                         <h3 className="text-lg font-bold">Edit Topik</h3>
// // //                         {/* FIX: A11y Error */}
// // //                         <button onClick={() => setIsEditModalOpen(false)} aria-label="Tutup Modal Edit">
// // //                             <X size={20}/>
// // //                         </button>
// // //                     </div>
// // //                     <div className="p-6 space-y-4">
// // //                          <input type="text" value={editingTopic.title} onChange={(e) => setEditingTopic({...editingTopic, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Judul" aria-label="Edit Judul"/>
                         
// // //                          <select 
// // //                             value={editingTopic.category} 
// // //                             onChange={(e) => setEditingTopic({...editingTopic, category: e.target.value})} 
// // //                             className="w-full px-3 py-2 border rounded-lg bg-white"
// // //                             aria-label="Edit Kategori" // FIX: A11y Error
// // //                          >
// // //                             {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
// // //                          </select>
                         
// // //                          <div className="grid grid-cols-5 gap-3">
// // //                             <button 
// // //                                 onClick={() => setEditingTopic({...editingTopic, avatarUrl: null})} 
// // //                                 className="aspect-square border-2 rounded-xl flex items-center justify-center text-xs font-bold"
// // //                                 aria-label="Hapus Icon Avatar" // FIX: A11y Error
// // //                             >
// // //                                 No Icon
// // //                             </button>
// // //                             {cmsIcons.map((cat, idx) => cat.iconUrl && (
// // //                                 <button 
// // //                                     key={idx} 
// // //                                     onClick={() => setEditingTopic({...editingTopic, avatarUrl: cat.iconUrl})} 
// // //                                     className={`relative aspect-square border-2 rounded-xl overflow-hidden ${editingTopic.avatarUrl === cat.iconUrl ? 'border-red-500' : 'border-gray-200'}`}
// // //                                     aria-label={`Pilih icon ${cat.name}`} // FIX: A11y Error
// // //                                 >
// // //                                     <img src={getImageUrl(cat.iconUrl)} alt="icon" className="w-full h-full object-cover" />
// // //                                 </button>
// // //                             ))}
// // //                          </div>
// // //                     </div>
// // //                     <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-2"><button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-bold">Batal</button><button onClick={handleUpdateTopic} className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-bold">Simpan</button></div>
// // //                 </div>
// // //             </div>
// // //         )}
// // //       </div>
// // //     </Protected>
// // //   );
// // // }

// // 'use client';

// // import { useState, useEffect } from 'react';
// // import Link from 'next/link';
// // import { api, getImageUrl } from '@/lib/api';
// // import { useAuth } from '@/lib/AuthProvider';
// // import Protected from '@/components/Protected'; 
// // import { 
// //     MessageSquare, Search, Plus, Filter, User, Clock, 
// //     MessageCircle, TrendingUp, Users, Loader2 
// // } from 'lucide-react';

// // export default function ForumPage() {
// //     const { user } = useAuth();
// //     const [discussions, setDiscussions] = useState<any[]>([]);
// //     const [categories, setCategories] = useState<any[]>([]);
// //     const [content, setContent] = useState<any>(null); // State konten CMS
// //     const [currentSlide, setCurrentSlide] = useState(0);
// //     const [loading, setLoading] = useState(true);
    
// //     // Filter State
// //     const [filterStatus, setFilterStatus] = useState<'approved' | 'pending'>('approved'); 
// //     const [search, setSearch] = useState('');
// //     const [selectedCategory, setSelectedCategory] = useState('All');

// //     const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'FACILITATOR';

// //     // Default Slide jika CMS kosong
// //     const defaultSlides = [
// //         "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1920",
// //         "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1920"
// //     ];

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 setLoading(true);
// //                 const [discRes, contentRes] = await Promise.all([
// //                     api(`/api/forum?search=${search}&status=${filterStatus}`), 
// //                     api('/api/content')
// //                 ]);
                
// //                 const topicsData = discRes.topics || discRes || [];
// //                 setDiscussions(topicsData);
// //                 setContent(contentRes);
                
// //                 if (contentRes?.forumCategories) {
// //                     setCategories(contentRes.forumCategories);
// //                 }
// //             } catch (e) {
// //                 console.error("Gagal memuat forum:", e);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         const timer = setTimeout(() => fetchData(), 500);
// //         return () => clearTimeout(timer);
// //     }, [search, filterStatus]); 

// //     // Data Header Dinamis (Dari CMS)
// //     const activeTitle = content?.forumPage?.title || "Forum Diskusi Komunitas";
// //     const activeDesc = content?.forumPage?.description || "Tempat berbagi ilmu, bertanya, dan berkolaborasi dengan relawan PMI lainnya.";
// //     const activeSlides = (content?.forumPage?.slides && content.forumPage.slides.length > 0) 
// //         ? content.forumPage.slides 
// //         : defaultSlides;

// //     // Timer Slide
// //     useEffect(() => {
// //         if (activeSlides.length > 1) {
// //             const interval = setInterval(() => {
// //                 setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
// //             }, 5000);
// //             return () => clearInterval(interval);
// //         }
// //     }, [activeSlides]);

// //     const filteredDiscussions = discussions.filter(d => 
// //         selectedCategory === 'All' || d.category === selectedCategory
// //     );

// //     return (
// //         <Protected>
// //             <div className="min-h-screen bg-gray-50 font-sans pb-20">
                
// //                 {/* --- 1. HERO SECTION (COMPACT & OVERLAP) --- */}
// //                 {/* Tinggi dikurangi jadi 280px-320px */}
// //                 <div className="relative bg-[#990000] text-white px-6 shadow-xl overflow-hidden flex items-center justify-center min-h-[280px] md:min-h-[320px] pt-12 pb-32">
                    
// //                     {/* Background Slideshow */}
// //                     <div className="absolute inset-0 z-0 pointer-events-none">
// //                         {activeSlides.map((slide: string, index: number) => (
// //                             <div 
// //                                 key={index} 
// //                                 className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
// //                             >
// //                                 <img 
// //                                     src={getImageUrl(slide)} 
// //                                     alt={`Hero Slide ${index}`} 
// //                                     className="w-full h-full object-cover object-center" 
// //                                 />
// //                             </div>
// //                         ))}
// //                         <div className="absolute inset-0 bg-gradient-to-b from-[#990000]/90 to-black/40 mix-blend-multiply"></div>
// //                     </div>

// //                     <div className="relative z-10 max-w-4xl mx-auto text-center -mt-6">
// //                         <div className="inline-flex items-center justify-center p-2 bg-white/10 rounded-full mb-3 backdrop-blur-sm border border-white/20 shadow-inner">
// //                             <MessageSquare size={24} className="text-red-100"/>
// //                         </div>
// //                         <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight drop-shadow-md leading-tight">{activeTitle}</h1>
// //                         <p className="text-red-100 text-sm md:text-base max-w-2xl mx-auto mb-6 font-medium leading-relaxed opacity-90">
// //                             {activeDesc}
// //                         </p>

// //                         {/* SEARCH BAR (INPUT DALAM HERO) */}
// //                         <div className="max-w-xl mx-auto relative group">
// //                             <div className="absolute inset-0 bg-white/20 blur-md rounded-full transform group-hover:scale-105 transition-transform"></div>
// //                             <div className="relative bg-white rounded-full flex items-center p-1.5 shadow-2xl">
// //                                 <Search className="ml-4 text-gray-400" size={20}/>
// //                                 <input 
// //                                     type="text" 
// //                                     className="flex-1 px-3 py-2.5 outline-none text-gray-700 bg-transparent placeholder:text-gray-400 text-sm"
// //                                     placeholder="Cari topik diskusi..."
// //                                     value={search}
// //                                     onChange={(e) => setSearch(e.target.value)}
// //                                 />
// //                                 <Link href="/forum/create" className="bg-red-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-red-700 transition-all flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 text-xs sm:text-sm">
// //                                     <Plus size={16}/> <span className="hidden sm:inline">Buat Topik</span>
// //                                 </Link>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* --- 2. KATEGORI & STATS (CARD MENINDIH HERO -24) --- */}
// //                 <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-20">
// //                     <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-4 duration-500">
                        
// //                         {/* Categories Pills */}
// //                         <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
// //                             <Filter size={20} className="text-gray-400 shrink-0 ml-1"/>
// //                             <button 
// //                                 onClick={() => setSelectedCategory('All')}
// //                                 className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${selectedCategory === 'All' ? 'bg-red-600 text-white shadow-red-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
// //                             >
// //                                 Semua
// //                             </button>
// //                             {categories.map((cat, idx) => (
// //                                 <button 
// //                                     key={idx}
// //                                     onClick={() => setSelectedCategory(cat.name)}
// //                                     className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${selectedCategory === cat.name ? 'bg-red-600 text-white shadow-red-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
// //                                 >
// //                                     {cat.iconUrl && <img src={getImageUrl(cat.iconUrl)} className="w-4 h-4 object-contain" alt=""/>}
// //                                     {cat.name}
// //                                 </button>
// //                             ))}
// //                         </div>

// //                         {/* Stats Singkat */}
// //                         <div className="flex items-center gap-6 text-xs text-gray-500 border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-6 w-full md:w-auto justify-center md:justify-end">
// //                             <div className="flex items-center gap-1.5">
// //                                 <MessageCircle size={16} className="text-blue-500"/> 
// //                                 <span className="font-bold text-gray-800 text-sm">{filteredDiscussions.length}</span> Topik
// //                             </div>
// //                             <div className="flex items-center gap-1.5">
// //                                 <Users size={16} className="text-green-500"/> 
// //                                 <span className="font-bold text-gray-800 text-sm">Aktif</span>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* --- 3. DAFTAR DISKUSI --- */}
// //                 <div className="max-w-5xl mx-auto px-6 py-12">
                    
// //                     {/* Tabs Filter */}
// //                     <div className="flex items-center gap-6 border-b border-gray-200 mb-8">
// //                         <button 
// //                             onClick={() => setFilterStatus('approved')}
// //                             className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${filterStatus === 'approved' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
// //                         >
// //                             <TrendingUp size={18}/> Diskusi Terbaru
// //                         </button>
// //                         {isAdmin && (
// //                             <button 
// //                                 onClick={() => setFilterStatus('pending')}
// //                                 className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${filterStatus === 'pending' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
// //                             >
// //                                 <Clock size={18}/> Menunggu Persetujuan
// //                             </button>
// //                         )}
// //                     </div>

// //                     {loading ? (
// //                         <div className="space-y-4">
// //                             {[1,2,3].map(i => (
// //                                 <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-pulse h-32"></div>
// //                             ))}
// //                         </div>
// //                     ) : filteredDiscussions.length > 0 ? (
// //                         <div className="space-y-4">
// //                             {filteredDiscussions.map((disc) => (
// //                                 <Link href={`/forum/${disc._id}`} key={disc._id} className="block group">
// //                                     <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-red-200 relative overflow-hidden">
// //                                         {/* Left Accent Bar */}
// //                                         <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

// //                                         <div className="flex items-start gap-5">
// //                                             {/* Avatar Penulis */}
// //                                             <div className="flex-shrink-0">
// //                                                 {disc.creator?.avatarUrl ? (
// //                                                     <img src={getImageUrl(disc.creator.avatarUrl)} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" alt={disc.creator.name} />
// //                                                 ) : (
// //                                                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-red-200 text-red-600 flex items-center justify-center font-bold text-lg border-2 border-white shadow-md">
// //                                                         {disc.creator?.name?.charAt(0) || 'U'}
// //                                                     </div>
// //                                                 )}
// //                                             </div>

// //                                             {/* Konten Card */}
// //                                             <div className="flex-1 min-w-0">
// //                                                 <div className="flex items-center gap-2 mb-1.5">
// //                                                     <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${disc.category === 'Umum' ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-600'}`}>
// //                                                         {disc.category || 'UMUM'}
// //                                                     </span>
// //                                                     <span className="text-[11px] text-gray-400 flex items-center gap-1">
// //                                                         <Clock size={12}/> {new Date(disc.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', hour:'2-digit', minute:'2-digit'})}
// //                                                     </span>
// //                                                     {disc.status === 'pending' && <span className="bg-orange-100 text-orange-700 text-[10px] px-2 py-0.5 rounded font-bold">MENUNGGU</span>}
// //                                                 </div>
                                                
// //                                                 <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-700 transition-colors line-clamp-1 leading-tight">
// //                                                     {disc.title}
// //                                                 </h3>
// //                                                 <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
// //                                                     {disc.content ? disc.content.replace(/<[^>]+>/g, '') : 'Tidak ada deskripsi.'}
// //                                                 </p>

// //                                                 {/* Meta Footer */}
// //                                                 <div className="flex items-center justify-between pt-3 border-t border-gray-50">
// //                                                     <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
// //                                                         Oleh <span className="text-gray-900 font-bold">{disc.creator?.name || 'Anonim'}</span>
// //                                                     </span>
                                                    
// //                                                     <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
// //                                                         <span className="flex items-center gap-1.5 group-hover:text-blue-600 transition-colors">
// //                                                             <MessageCircle size={16}/> {disc.replies?.length || 0} Balasan
// //                                                         </span>
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                 </Link>
// //                             ))}
// //                         </div>
// //                     ) : (
// //                         <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">
// //                             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
// //                                 <MessageSquare className="text-gray-300" size={32}/>
// //                             </div>
// //                             <h3 className="text-lg font-bold text-gray-800">Belum ada topik diskusi</h3>
// //                             <p className="text-gray-500 text-sm mb-6">Jadilah yang pertama memulai percakapan di kategori ini!</p>
// //                             <Link href="/forum/create" className="text-red-600 font-bold hover:underline text-sm">
// //                                 + Buat Topik Baru
// //                             </Link>
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>
// //         </Protected>
// //     );
// // }


// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { api, getImageUrl } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';
// import Protected from '@/components/Protected'; 
// import { 
//     MessageSquare, Search, Plus, Filter, User, Clock, 
//     MessageCircle, TrendingUp, Users, CheckCircle, XCircle, Trash2, Shield
// } from 'lucide-react';

// export default function ForumPage() {
//     const { user } = useAuth();
//     const [discussions, setDiscussions] = useState<any[]>([]);
//     const [categories, setCategories] = useState<any[]>([]);
//     const [content, setContent] = useState<any>(null); 
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [loading, setLoading] = useState(true);
    
//     // Filter State
//     const [filterStatus, setFilterStatus] = useState<'approved' | 'pending'>('approved'); 
//     const [search, setSearch] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('All');

//     const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'FACILITATOR';

//     const defaultSlides = [
//         "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1920",
//         "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1920"
//     ];

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             // Panggil API dengan status filter
//             const [discRes, contentRes] = await Promise.all([
//                 api(`/api/forum?search=${search}&status=${filterStatus}`), 
//                 api('/api/content')
//             ]);
            
//             // Handle variasi response array vs object
//             const topicsData = Array.isArray(discRes) ? discRes : (discRes.topics || []);
//             setDiscussions(topicsData);
//             setContent(contentRes);
            
//             if (contentRes?.forumCategories) {
//                 setCategories(contentRes.forumCategories);
//             }
//         } catch (e) {
//             console.error("Gagal memuat forum:", e);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Debounce search & filter effect
//     useEffect(() => {
//         const timer = setTimeout(() => fetchData(), 300);
//         return () => clearTimeout(timer);
//     }, [search, filterStatus]); 

//     // Admin Actions
//     const handleApprove = async (id: string) => {
//         if(!confirm("Setujui topik ini?")) return;
//         try {
//             await api(`/api/forum/${id}/status`, { method: 'PATCH', body: { status: 'approved' } });
//             fetchData(); // Refresh list
//         } catch(e:any) { alert("Gagal: " + e.message); }
//     };

//     const handleReject = async (id: string) => {
//         if(!confirm("Tolak topik ini?")) return;
//         try {
//             await api(`/api/forum/${id}/status`, { method: 'PATCH', body: { status: 'rejected' } });
//             fetchData();
//         } catch(e:any) { alert("Gagal: " + e.message); }
//     };

//     const handleDelete = async (id: string) => {
//         if(!confirm("Hapus permanen topik ini?")) return;
//         try {
//             await api(`/api/forum/${id}`, { method: 'DELETE' });
//             fetchData();
//         } catch(e:any) { alert("Gagal: " + e.message); }
//     };

//     // Slideshow Logic
//     const activeSlides = (content?.forumPage?.slides && content.forumPage.slides.length > 0) ? content.forumPage.slides : defaultSlides;
//     useEffect(() => {
//         if (activeSlides.length > 1) {
//             const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % activeSlides.length), 5000);
//             return () => clearInterval(interval);
//         }
//     }, [activeSlides]);

//     const filteredDiscussions = discussions.filter(d => selectedCategory === 'All' || d.category === selectedCategory);

//     return (
//         <Protected>
//             <div className="min-h-screen bg-gray-50 font-sans pb-20">
//                 {/* HERO SECTION */}
//                 <div className="relative bg-[#990000] text-white px-6 shadow-xl overflow-hidden flex items-center justify-center min-h-[280px] md:min-h-[320px] pt-12 pb-32">
//                     <div className="absolute inset-0 z-0 pointer-events-none">
//                         {activeSlides.map((slide: string, index: number) => (
//                             <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
//                                 <img src={getImageUrl(slide)} alt="Hero" className="w-full h-full object-cover object-center" />
//                             </div>
//                         ))}
//                         <div className="absolute inset-0 bg-gradient-to-b from-[#990000]/90 to-black/40 mix-blend-multiply"></div>
//                     </div>

//                     <div className="relative z-10 max-w-4xl mx-auto text-center -mt-6">
//                         <h1 className="text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-md">Forum Diskusi Komunitas</h1>
//                         <p className="text-red-100 text-sm md:text-base max-w-2xl mx-auto mb-6 opacity-90">Tempat berbagi ilmu dan berkolaborasi.</p>
                        
//                         <div className="max-w-xl mx-auto relative group">
//                             <div className="relative bg-white rounded-full flex items-center p-1.5 shadow-2xl">
//                                 <Search className="ml-4 text-gray-400" size={20}/>
//                                 <input 
//                                     type="text" 
//                                     className="flex-1 px-3 py-2.5 outline-none text-gray-700 bg-transparent text-sm"
//                                     placeholder="Cari topik diskusi..."
//                                     value={search}
//                                     onChange={(e) => setSearch(e.target.value)}
//                                 />
//                                 <Link href="/forum/create" className="bg-red-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-red-700 transition-all flex items-center gap-2 text-xs sm:text-sm">
//                                     <Plus size={16}/> <span className="hidden sm:inline">Buat Topik</span>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* KATEGORI & STATS */}
//                 <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-20">
//                     <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
//                         <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
//                             <Filter size={20} className="text-gray-400 shrink-0 ml-1"/>
//                             <button onClick={() => setSelectedCategory('All')} className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${selectedCategory === 'All' ? 'bg-red-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border'}`}>Semua</button>
//                             {categories.map((cat, idx) => (
//                                 <button key={idx} onClick={() => setSelectedCategory(cat.name)} className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${selectedCategory === cat.name ? 'bg-red-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border'}`}>{cat.name}</button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* LIST DISKUSI */}
//                 <div className="max-w-5xl mx-auto px-6 py-12">
//                     {/* Tabs Filter */}
//                     <div className="flex items-center gap-6 border-b border-gray-200 mb-8">
//                         <button onClick={() => setFilterStatus('approved')} className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${filterStatus === 'approved' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500'}`}>
//                             <TrendingUp size={18}/> Diskusi Terbaru
//                         </button>
//                         {isAdmin && (
//                             <button onClick={() => setFilterStatus('pending')} className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${filterStatus === 'pending' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500'}`}>
//                                 <Clock size={18}/> Menunggu Persetujuan
//                             </button>
//                         )}
//                     </div>

//                     {loading ? (
//                         <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-pulse h-32"></div>)}</div>
//                     ) : filteredDiscussions.length > 0 ? (
//                         <div className="space-y-4">
//                             {filteredDiscussions.map((disc) => (
//                                 <div key={disc._id} className="block group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
//                                     <div className="flex items-start gap-5">
//                                         {/* Avatar */}
//                                         <div className="flex-shrink-0">
//                                             {disc.author?.avatarUrl ? (
//                                                 <img src={getImageUrl(disc.author.avatarUrl)} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" alt="Avatar" />
//                                             ) : (
//                                                 <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg border-2 border-white shadow-md">
//                                                     {disc.author?.name?.charAt(0) || 'U'}
//                                                 </div>
//                                             )}
//                                         </div>

//                                         <div className="flex-1 min-w-0">
//                                             <div className="flex items-center justify-between mb-1.5">
//                                                 <div className="flex items-center gap-2">
//                                                     <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase">{disc.category}</span>
//                                                     <span className="text-[11px] text-gray-400 flex items-center gap-1"><Clock size={12}/> {new Date(disc.createdAt).toLocaleDateString()}</span>
//                                                     {disc.status === 'pending' && <span className="bg-orange-100 text-orange-700 text-[10px] px-2 py-0.5 rounded font-bold">MENUNGGU</span>}
//                                                 </div>
                                                
//                                                 {/* ADMIN ACTIONS (Only Show for Admin & Pending Items) */}
//                                                 {isAdmin && (
//                                                     <div className="flex items-center gap-2">
//                                                         {filterStatus === 'pending' && (
//                                                             <>
//                                                                 <button onClick={() => handleApprove(disc._id)} className="bg-green-100 text-green-700 p-1.5 rounded-full hover:bg-green-200" title="Setujui"><CheckCircle size={16}/></button>
//                                                                 <button onClick={() => handleReject(disc._id)} className="bg-red-100 text-red-700 p-1.5 rounded-full hover:bg-red-200" title="Tolak"><XCircle size={16}/></button>
//                                                             </>
//                                                         )}
//                                                         <button onClick={() => handleDelete(disc._id)} className="text-gray-400 hover:text-red-600 p-1.5 transition-colors" title="Hapus"><Trash2 size={16}/></button>
//                                                     </div>
//                                                 )}
//                                             </div>
                                            
//                                             <Link href={`/forum/${disc._id}`}>
//                                                 <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-700 transition-colors line-clamp-1">{disc.title}</h3>
//                                                 <p className="text-sm text-gray-500 line-clamp-2 mb-4">{disc.content ? disc.content.replace(/<[^>]+>/g, '') : '...'}</p>
//                                             </Link>

//                                             <div className="flex items-center justify-between pt-3 border-t border-gray-50">
//                                                 <span className="text-xs font-medium text-gray-500">Oleh <span className="text-gray-900 font-bold">{disc.author?.name || 'Anonim'}</span></span>
//                                                 <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
//                                                     <span className="flex items-center gap-1.5"><MessageCircle size={16}/> {disc.repliesCount || 0} Balasan</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">
//                             <MessageSquare className="text-gray-300 w-16 h-16 mx-auto mb-4"/>
//                             <h3 className="text-lg font-bold text-gray-800">Tidak ada data</h3>
//                             <p className="text-gray-500 text-sm">Belum ada diskusi di kategori ini.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </Protected>
//     );
// }
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, getImageUrl } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import Protected from '@/components/Protected'; 
import { 
    MessageSquare, Search, Plus, Filter, User, Clock, 
    MessageCircle, TrendingUp, Users, CheckCircle, XCircle, Trash2
} from 'lucide-react';

export default function ForumPage() {
    const { user } = useAuth();
    const [discussions, setDiscussions] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [content, setContent] = useState<any>(null); 
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    
    // Filter State
    const [filterStatus, setFilterStatus] = useState<'approved' | 'pending'>('approved'); 
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'FACILITATOR';

    const defaultSlides = [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1920",
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1920"
    ];

    const fetchData = async () => {
        try {
            setLoading(true);
            const [discRes, contentRes] = await Promise.all([
                api(`/api/forum?search=${search}&status=${filterStatus}`), 
                api('/api/content')
            ]);
            
            const topicsData = Array.isArray(discRes) ? discRes : (discRes.topics || []);
            setDiscussions(topicsData);
            setContent(contentRes);
            
            if (contentRes?.forumCategories) {
                setCategories(contentRes.forumCategories);
            }
        } catch (e) {
            console.error("Gagal memuat forum:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => fetchData(), 300);
        return () => clearTimeout(timer);
    }, [search, filterStatus]); 

    // Admin Actions
    const handleApprove = async (id: string) => {
        if(!confirm("Setujui topik ini?")) return;
        try {
            await api(`/api/forum/${id}/status`, { method: 'PATCH', body: { status: 'approved' } });
            fetchData(); 
        } catch(e:any) { alert("Gagal: " + e.message); }
    };

    const handleReject = async (id: string) => {
        if(!confirm("Tolak topik ini?")) return;
        try {
            await api(`/api/forum/${id}/status`, { method: 'PATCH', body: { status: 'rejected' } });
            fetchData();
        } catch(e:any) { alert("Gagal: " + e.message); }
    };

    const handleDelete = async (id: string) => {
        if(!confirm("Hapus permanen topik ini?")) return;
        try {
            await api(`/api/forum/${id}`, { method: 'DELETE' });
            fetchData();
        } catch(e:any) { alert("Gagal: " + e.message); }
    };

    // Slideshow Logic
    const activeSlides = (content?.forumPage?.slides && content.forumPage.slides.length > 0) ? content.forumPage.slides : defaultSlides;
    useEffect(() => {
        if (activeSlides.length > 1) {
            const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % activeSlides.length), 5000);
            return () => clearInterval(interval);
        }
    }, [activeSlides]);

    const filteredDiscussions = discussions.filter(d => selectedCategory === 'All' || d.category === selectedCategory);

    return (
        <Protected>
            <div className="min-h-screen bg-gray-50 font-sans pb-20">
                
                {/* --- HERO SECTION (SERAGAM) --- */}
                <div className="relative h-[400px] md:h-[450px] flex items-center justify-center text-center text-white px-4 overflow-hidden pb-40">
                    <div className="absolute inset-0 z-0 bg-gray-900">
                        {activeSlides.map((slide: string, index: number) => (
                            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                                <img src={getImageUrl(slide)} alt="Hero" className="w-full h-full object-cover opacity-60" />
                            </div>
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-b from-red-900/80 via-red-900/60 to-gray-50"></div>
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto -mt-10">
                        <div className="inline-flex items-center justify-center p-2.5 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/20 shadow-lg">
                            <MessageSquare size={24} className="text-red-100"/>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-lg tracking-tight">
                            Forum Diskusi
                        </h1>
                        <p className="text-red-100 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                            Tempat berbagi ilmu, bertanya, dan berkolaborasi dengan relawan PMI lainnya.
                        </p>
                    </div>
                </div>

                {/* --- FILTER & ACTION (CARD MENINDIH HERO) --- */}
                <div className="max-w-7xl mx-auto px-6 -mt-40 relative z-20">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-3 mb-8 flex flex-col md:flex-row items-center gap-3">
                        
                        {/* Search Bar */}
                        <div className="relative w-full md:w-1/3 shrink-0">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                            <input 
                                type="text" 
                                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-gray-400 text-sm bg-gray-50 focus:bg-white" 
                                placeholder="Cari topik diskusi..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Filter Kategori */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto flex-1 pb-1 md:pb-0 no-scrollbar">
                            <Filter size={18} className="text-gray-400 shrink-0 ml-1"/>
                            <button onClick={() => setSelectedCategory('All')} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm border ${selectedCategory === 'All' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>Semua</button>
                            {categories.map((cat, idx) => (
                                <button key={idx} onClick={() => setSelectedCategory(cat.name)} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm border ${selectedCategory === cat.name ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>{cat.name}</button>
                            ))}
                        </div>

                        {/* Button Buat Topik */}
                        <Link href="/forum/create" className="w-full md:w-auto bg-red-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 text-xs shadow-md shrink-0">
                            <Plus size={16}/> Buat Topik
                        </Link>
                    </div>

                    {/* LIST DISKUSI */}
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-6 border-b border-gray-200 mb-8">
                            <button onClick={() => setFilterStatus('approved')} className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${filterStatus === 'approved' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500'}`}>
                                <TrendingUp size={18}/> Diskusi Terbaru
                            </button>
                            {isAdmin && (
                                <button onClick={() => setFilterStatus('pending')} className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${filterStatus === 'pending' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500'}`}>
                                    <Clock size={18}/> Menunggu Persetujuan
                                </button>
                            )}
                        </div>

                        {loading ? (
                            <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-pulse h-32"></div>)}</div>
                        ) : filteredDiscussions.length > 0 ? (
                            <div className="space-y-4">
                                {filteredDiscussions.map((disc) => (
                                    <div key={disc._id} className="block group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                                        <div className="flex items-start gap-5">
                                            <div className="flex-shrink-0">
                                                {disc.author?.avatarUrl ? (
                                                    <img src={getImageUrl(disc.author.avatarUrl)} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" alt="Avatar" />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg border-2 border-white shadow-md">
                                                        {disc.author?.name?.charAt(0) || 'U'}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase">{disc.category}</span>
                                                        <span className="text-[11px] text-gray-400 flex items-center gap-1"><Clock size={12}/> {new Date(disc.createdAt).toLocaleDateString()}</span>
                                                        {disc.status === 'pending' && <span className="bg-orange-100 text-orange-700 text-[10px] px-2 py-0.5 rounded font-bold">MENUNGGU</span>}
                                                    </div>
                                                    
                                                    {isAdmin && (
                                                        <div className="flex items-center gap-2">
                                                            {filterStatus === 'pending' && (
                                                                <>
                                                                    <button onClick={() => handleApprove(disc._id)} className="bg-green-100 text-green-700 p-1.5 rounded-full hover:bg-green-200" title="Setujui"><CheckCircle size={16}/></button>
                                                                    <button onClick={() => handleReject(disc._id)} className="bg-red-100 text-red-700 p-1.5 rounded-full hover:bg-red-200" title="Tolak"><XCircle size={16}/></button>
                                                                </>
                                                            )}
                                                            <button onClick={() => handleDelete(disc._id)} className="text-gray-400 hover:text-red-600 p-1.5 transition-colors" title="Hapus"><Trash2 size={16}/></button>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <Link href={`/forum/${disc._id}`}>
                                                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-700 transition-colors line-clamp-1">{disc.title}</h3>
                                                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{disc.content ? disc.content.replace(/<[^>]+>/g, '') : '...'}</p>
                                                </Link>

                                                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                                    <span className="text-xs font-medium text-gray-500">Oleh <span className="text-gray-900 font-bold">{disc.author?.name || 'Anonim'}</span></span>
                                                    <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                                                        <span className="flex items-center gap-1.5"><MessageCircle size={16}/> {disc.repliesCount || 0} Balasan</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">
                                <MessageSquare className="text-gray-300 w-16 h-16 mx-auto mb-4"/>
                                <h3 className="text-lg font-bold text-gray-800">Tidak ada data</h3>
                                <p className="text-gray-500 text-sm">Belum ada diskusi di kategori ini.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Protected>
    );
}
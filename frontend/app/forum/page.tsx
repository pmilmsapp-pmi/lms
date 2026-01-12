// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { useAuth } from '@/lib/AuthProvider';
// // // // import { api, getImageUrl } from '@/lib/api';
// // // // import Protected from '@/components/Protected';
// // // // import { Pencil, Check, X, Plus, Filter, MessageCircle } from 'lucide-react';

// // // // export default function ForumPage() {
// // // //   const { user } = useAuth();
  
// // // //   // --- STATE ---
// // // //   const [topics, setTopics] = useState<any[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [cmsCategories, setCmsCategories] = useState<string[]>(["General"]); 
// // // //   const [activeTab, setActiveTab] = useState<'approved' | 'pending'>('approved');
// // // //   const [categoryFilter, setCategoryFilter] = useState('Semua');
  
// // // //   // Modals
// // // //   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
// // // //   const [createForm, setCreateForm] = useState({ title: '', content: '', category: '' });
// // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // // //   const [editingTopic, setEditingTopic] = useState<any>(null);
// // // //   const [cmsIcons, setCmsIcons] = useState<{name: string, iconUrl: string}[]>([]);

// // // //   const isAdmin = user?.role === 'FACILITATOR' || user?.role === 'SUPER_ADMIN';

// // // //   useEffect(() => {
// // // //     loadCmsSettings();
// // // //     loadTopics();
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [activeTab, categoryFilter]);

// // // //   const loadCmsSettings = async () => {
// // // //     try {
// // // //         const content = await api('/api/content'); 
// // // //         if (content && content.forumCategories?.length > 0) {
// // // //             const catNames = content.forumCategories.map((c: any) => c.name);
// // // //             setCmsCategories(catNames);
// // // //             setCmsIcons(content.forumCategories);
// // // //             setCreateForm(prev => ({ ...prev, category: catNames[0] }));
// // // //         }
// // // //     } catch (e) { console.error("Gagal load kategori CMS:", e); }
// // // //   };

// // // //   const loadTopics = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const res = await api(`/api/forum?status=${activeTab}&category=${categoryFilter}`);
// // // //       setTopics(res.topics || []);
// // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // //   };

// // // //   const handleCreate = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       const payload = { ...createForm, category: createForm.category || cmsCategories[0] };
// // // //       await api('/api/forum', { method: 'POST', body: payload });
// // // //       setIsCreateModalOpen(false);
// // // //       setCreateForm({ title: '', content: '', category: cmsCategories[0] });
// // // //       alert(isAdmin ? "Topik berhasil dibuat!" : "Permintaan topik dikirim! Menunggu persetujuan admin.");
// // // //       loadTopics();
// // // //     } catch (e: any) { alert("Gagal: " + e.message); }
// // // //   };

// // // //   const handleApprove = async (id: string, status: 'approved' | 'rejected') => {
// // // //       if(!confirm(`Yakin ingin ${status === 'approved' ? 'menyetujui' : 'menolak'} topik ini?`)) return;
// // // //       try {
// // // //           await api(`/api/forum/${id}/status`, { method: 'PUT', body: { status } });
// // // //           loadTopics(); 
// // // //       } catch (e: any) { alert(e.message); }
// // // //   };

// // // //   const openEditModal = (topic: any) => {
// // // //     setEditingTopic({ 
// // // //       _id: topic._id, 
// // // //       title: topic.title, 
// // // //       category: topic.category, 
// // // //       avatarUrl: topic.avatarUrl 
// // // //     });
// // // //     setIsEditModalOpen(true);
// // // //   };

// // // //   const handleUpdateTopic = async () => {
// // // //     if (!editingTopic) return;
// // // //     try {
// // // //       await api(`/api/forum/${editingTopic._id}`, { 
// // // //         method: 'PATCH', 
// // // //         body: { title: editingTopic.title, category: editingTopic.category, avatar: editingTopic.avatarUrl } 
// // // //       });
// // // //       alert("Perubahan berhasil disimpan!");
// // // //       setIsEditModalOpen(false);
// // // //       loadTopics();
// // // //     } catch (e: any) { alert("Gagal update: " + e.message); }
// // // //   };

// // // //   return (
// // // //     <Protected>
// // // //       <div className="max-w-6xl mx-auto p-6 min-h-screen font-sans">
        
// // // //         {/* HEADER */}
// // // //         <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
// // // //             <div>
// // // //                 <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
// // // //                   <MessageCircle className="text-red-700" size={32}/> Forum Diskusi
// // // //                 </h1>
// // // //                 <p className="text-gray-500 mt-1">Tempat bertanya dan berbagi ilmu.</p>
// // // //             </div>
// // // //             <button onClick={() => setIsCreateModalOpen(true)} className="bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-800 transition shadow-sm flex items-center gap-2">
// // // //                 <Plus size={20} /> Buat Topik Baru
// // // //             </button>
// // // //         </div>

// // // //         {/* FILTER BAR */}
// // // //         <div className="flex flex-col md:flex-row justify-between items-center bg-white p-2 rounded-xl shadow-sm border border-gray-200 mb-6 gap-4">
// // // //             <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-full md:w-auto">
// // // //                 <button onClick={() => setActiveTab('approved')} className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'approved' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Diskusi Aktif</button>
// // // //                 {isAdmin && (
// // // //                     <button onClick={() => setActiveTab('pending')} className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold transition-all flex justify-center items-center gap-2 ${activeTab === 'pending' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Menunggu Persetujuan</button>
// // // //                 )}
// // // //             </div>
// // // //             <div className="relative w-full md:w-64">
// // // //                 <Filter className="absolute left-3 top-2.5 text-gray-400" size={16}/>
// // // //                 <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none bg-white cursor-pointer">
// // // //                     <option value="Semua">Semua Kategori</option>
// // // //                     {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
// // // //                 </select>
// // // //             </div>
// // // //         </div>

// // // //         {/* LIST */}
// // // //         {loading ? <div className="text-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-700 mx-auto"></div></div> : 
// // // //          topics.length === 0 ? <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed"><p className="text-gray-400 font-medium">Tidak ada topik.</p></div> : 
// // // //          <div className="space-y-4">
// // // //             {topics.map((topic) => (
// // // //                 <div key={topic._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-red-200 transition-all group flex flex-col md:flex-row gap-4 justify-between items-start">
// // // //                     <div className="flex gap-4 w-full">
// // // //                         {/* --- PERBAIKAN LOGIKA GAMBAR --- */}
// // // //                         <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-100 overflow-hidden bg-gray-50">
// // // //                             <img 
// // // //                                 src={
// // // //                                     (topic.avatarUrl && getImageUrl(topic.avatarUrl)) || // 1. Cover Topik
// // // //                                     (topic.creator?.avatarUrl && getImageUrl(topic.creator.avatarUrl)) || // 2. Avatar Creator
// // // //                                     `https://ui-avatars.com/api/?name=${encodeURIComponent(topic.creator?.name || 'User')}&background=random` // 3. Fallback
// // // //                                 }
// // // //                                 className="w-full h-full object-cover"
// // // //                                 alt="Avatar"
// // // //                                 onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(topic.title || 'Topic')}&background=random`; }}
// // // //                             />
// // // //                         </div>
// // // //                         <div className="flex-1">
// // // //                             <div className="flex items-center gap-2 mb-1 flex-wrap">
// // // //                                 <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">{topic.category}</span>
// // // //                                 <span className="text-xs text-gray-400">• {new Date(topic.createdAt).toLocaleDateString('id-ID')}</span>
// // // //                             </div>
// // // //                             <a href={`/forum/${topic._id}`} className="text-lg font-bold text-gray-800 group-hover:text-red-700 transition-colors block mb-1">{topic.title}</a>
// // // //                             <p className="text-sm text-gray-600 line-clamp-2 mb-2">{topic.content}</p>
// // // //                             <p className="text-xs text-gray-400 font-medium">Oleh: <span className="text-gray-600">{topic.creator?.name}</span></p>
// // // //                         </div>
// // // //                     </div>
// // // //                     {activeTab === 'pending' && isAdmin && (
// // // //                         <div className="flex md:flex-col gap-2 w-full md:w-auto mt-2 md:mt-0">
// // // //                             <button onClick={() => openEditModal(topic)} className="flex items-center justify-center gap-1 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition text-xs font-bold"><Pencil size={14} /> Edit</button>
// // // //                             <button onClick={() => handleApprove(topic._id, 'approved')} className="flex items-center justify-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-xs font-bold"><Check size={14} /> Setuju</button>
// // // //                             <button onClick={() => handleApprove(topic._id, 'rejected')} className="flex items-center justify-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-xs font-bold"><X size={14} /> Tolak</button>
// // // //                         </div>
// // // //                     )}
// // // //                 </div>
// // // //             ))}
// // // //          </div>
// // // //         }

// // // //         {/* MODAL CREATE */}
// // // //         {isCreateModalOpen && (
// // // //             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
// // // //                 <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl">
// // // //                     <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Buat Topik Baru</h2><button onClick={() => setIsCreateModalOpen(false)}><X className="text-gray-400 hover:text-red-600"/></button></div>
// // // //                     <form onSubmit={handleCreate} className="space-y-4">
// // // //                         <input required className="w-full border rounded-lg px-3 py-2" value={createForm.title} onChange={e => setCreateForm({...createForm, title: e.target.value})} placeholder="Judul Diskusi" />
// // // //                         <select className="w-full border rounded-lg px-3 py-2 bg-white" value={createForm.category} onChange={e => setCreateForm({...createForm, category: e.target.value})}>
// // // //                             {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
// // // //                         </select>
// // // //                         <textarea required rows={4} className="w-full border rounded-lg px-3 py-2" value={createForm.content} onChange={e => setCreateForm({...createForm, content: e.target.value})} placeholder="Isi diskusi..." />
// // // //                         <div className="flex justify-end gap-2 mt-6 pt-4 border-t"><button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button><button type="submit" className="px-6 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800">{isAdmin ? 'Terbitkan' : 'Kirim Request'}</button></div>
// // // //                     </form>
// // // //                 </div>
// // // //             </div>
// // // //         )}

// // // //         {/* MODAL EDIT */}
// // // //         {isEditModalOpen && editingTopic && (
// // // //             <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
// // // //                 <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl">
// // // //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center"><h3 className="text-lg font-bold">Edit Topik</h3><button onClick={() => setIsEditModalOpen(false)}><X size={20}/></button></div>
// // // //                     <div className="p-6 space-y-4">
// // // //                          <input type="text" value={editingTopic.title} onChange={(e) => setEditingTopic({...editingTopic, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Judul"/>
// // // //                          <select value={editingTopic.category} onChange={(e) => setEditingTopic({...editingTopic, category: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-white">{cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}</select>
// // // //                          <div className="grid grid-cols-5 gap-3">
// // // //                             <button onClick={() => setEditingTopic({...editingTopic, avatarUrl: null})} className="aspect-square border-2 rounded-xl flex items-center justify-center text-xs font-bold">No Icon</button>
// // // //                             {cmsIcons.map((cat, idx) => cat.iconUrl && (
// // // //                                 <button key={idx} onClick={() => setEditingTopic({...editingTopic, avatarUrl: cat.iconUrl})} className={`relative aspect-square border-2 rounded-xl overflow-hidden ${editingTopic.avatarUrl === cat.iconUrl ? 'border-red-500' : 'border-gray-200'}`}>
// // // //                                     <img src={getImageUrl(cat.iconUrl)} alt="icon" className="w-full h-full object-cover" />
// // // //                                 </button>
// // // //                             ))}
// // // //                          </div>
// // // //                     </div>
// // // //                     <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-2"><button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-bold">Batal</button><button onClick={handleUpdateTopic} className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-bold">Simpan</button></div>
// // // //                 </div>
// // // //             </div>
// // // //         )}
// // // //       </div>
// // // //     </Protected>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { useAuth } from '@/lib/AuthProvider';
// // // import { api, getImageUrl } from '@/lib/api';
// // // import Protected from '@/components/Protected';
// // // import { Pencil, Check, X, Plus, Filter, MessageCircle } from 'lucide-react';

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
// // //       setLoading(true);
// // //       const res = await api(`/api/forum?status=${activeTab}&category=${categoryFilter}`);
// // //       setTopics(res.topics || []);
// // //     } catch (e) { console.error(e); } finally { setLoading(false); }
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
// // //           await api(`/api/forum/${id}/status`, { method: 'PUT', body: { status } });
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
// // //                 {/* FIX ERROR: Added aria-label for accessibility */}
// // //                 <select 
// // //                     value={categoryFilter} 
// // //                     onChange={(e) => setCategoryFilter(e.target.value)} 
// // //                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none bg-white cursor-pointer"
// // //                     aria-label="Filter Kategori"
// // //                     title="Filter Kategori"
// // //                 >
// // //                     <option value="Semua">Semua Kategori</option>
// // //                     {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
// // //                 </select>
// // //             </div>
// // //         </div>

// // //         {/* LIST */}
// // //         {loading ? <div className="text-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-700 mx-auto"></div></div> : 
// // //          topics.length === 0 ? <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed"><p className="text-gray-400 font-medium">Tidak ada topik.</p></div> : 
// // //          <div className="space-y-4">
// // //             {topics.map((topic) => (
// // //                 <div key={topic._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-red-200 transition-all group flex flex-col md:flex-row gap-4 justify-between items-start">
// // //                     <div className="flex gap-4 w-full">
// // //                         <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-100 overflow-hidden bg-gray-50">
// // //                             <img 
// // //                                 src={
// // //                                     (topic.avatarUrl && getImageUrl(topic.avatarUrl)) || 
// // //                                     (topic.creator?.avatarUrl && getImageUrl(topic.creator.avatarUrl)) || 
// // //                                     `https://ui-avatars.com/api/?name=${encodeURIComponent(topic.creator?.name || 'User')}&background=random`
// // //                                 }
// // //                                 className="w-full h-full object-cover"
// // //                                 alt="Avatar"
// // //                                 onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(topic.title || 'Topic')}&background=random`; }}
// // //                             />
// // //                         </div>
// // //                         <div className="flex-1">
// // //                             <div className="flex items-center gap-2 mb-1 flex-wrap">
// // //                                 <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">{topic.category}</span>
// // //                                 <span className="text-xs text-gray-400">• {new Date(topic.createdAt).toLocaleDateString('id-ID')}</span>
// // //                             </div>
// // //                             <a href={`/forum/${topic._id}`} className="text-lg font-bold text-gray-800 group-hover:text-red-700 transition-colors block mb-1">{topic.title}</a>
// // //                             <p className="text-sm text-gray-600 line-clamp-2 mb-2">{topic.content}</p>
// // //                             <p className="text-xs text-gray-400 font-medium">Oleh: <span className="text-gray-600">{topic.creator?.name}</span></p>
// // //                         </div>
// // //                     </div>
// // //                     {activeTab === 'pending' && isAdmin && (
// // //                         <div className="flex md:flex-col gap-2 w-full md:w-auto mt-2 md:mt-0">
// // //                             {/* FIX ERROR: Added aria-labels for action buttons */}
// // //                             <button onClick={() => openEditModal(topic)} className="flex items-center justify-center gap-1 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition text-xs font-bold" aria-label="Edit Topik"><Pencil size={14} /> Edit</button>
// // //                             <button onClick={() => handleApprove(topic._id, 'approved')} className="flex items-center justify-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-xs font-bold" aria-label="Setujui Topik"><Check size={14} /> Setuju</button>
// // //                             <button onClick={() => handleApprove(topic._id, 'rejected')} className="flex items-center justify-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-xs font-bold" aria-label="Tolak Topik"><X size={14} /> Tolak</button>
// // //                         </div>
// // //                     )}
// // //                 </div>
// // //             ))}
// // //          </div>
// // //         }

// // //         {/* MODAL CREATE */}
// // //         {isCreateModalOpen && (
// // //             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
// // //                 <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl">
// // //                     <div className="flex justify-between items-center mb-4">
// // //                         <h2 className="text-xl font-bold">Buat Topik Baru</h2>
// // //                         {/* FIX ERROR: Added aria-label for Close Button */}
// // //                         <button onClick={() => setIsCreateModalOpen(false)} aria-label="Tutup Modal">
// // //                             <X className="text-gray-400 hover:text-red-600"/>
// // //                         </button>
// // //                     </div>
// // //                     <form onSubmit={handleCreate} className="space-y-4">
// // //                         <input required className="w-full border rounded-lg px-3 py-2" value={createForm.title} onChange={e => setCreateForm({...createForm, title: e.target.value})} placeholder="Judul Diskusi" aria-label="Judul Diskusi"/>
                        
// // //                         {/* FIX ERROR: Added aria-label for Select */}
// // //                         <select 
// // //                             className="w-full border rounded-lg px-3 py-2 bg-white" 
// // //                             value={createForm.category} 
// // //                             onChange={e => setCreateForm({...createForm, category: e.target.value})}
// // //                             aria-label="Pilih Kategori"
// // //                             title="Pilih Kategori"
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
// // //                         {/* FIX ERROR: Added aria-label for Close Button */}
// // //                         <button onClick={() => setIsEditModalOpen(false)} aria-label="Tutup Modal Edit">
// // //                             <X size={20}/>
// // //                         </button>
// // //                     </div>
// // //                     <div className="p-6 space-y-4">
// // //                          <input type="text" value={editingTopic.title} onChange={(e) => setEditingTopic({...editingTopic, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Judul" aria-label="Edit Judul"/>
                         
// // //                          {/* FIX ERROR: Added aria-label for Select */}
// // //                          <select 
// // //                             value={editingTopic.category} 
// // //                             onChange={(e) => setEditingTopic({...editingTopic, category: e.target.value})} 
// // //                             className="w-full px-3 py-2 border rounded-lg bg-white"
// // //                             aria-label="Edit Kategori"
// // //                             title="Edit Kategori"
// // //                          >
// // //                             {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
// // //                          </select>
                         
// // //                          <div className="grid grid-cols-5 gap-3">
// // //                             <button 
// // //                                 onClick={() => setEditingTopic({...editingTopic, avatarUrl: null})} 
// // //                                 className="aspect-square border-2 rounded-xl flex items-center justify-center text-xs font-bold"
// // //                                 aria-label="Hapus Icon Avatar"
// // //                             >
// // //                                 No Icon
// // //                             </button>
// // //                             {cmsIcons.map((cat, idx) => cat.iconUrl && (
// // //                                 <button 
// // //                                     key={idx} 
// // //                                     onClick={() => setEditingTopic({...editingTopic, avatarUrl: cat.iconUrl})} 
// // //                                     className={`relative aspect-square border-2 rounded-xl overflow-hidden ${editingTopic.avatarUrl === cat.iconUrl ? 'border-red-500' : 'border-gray-200'}`}
// // //                                     aria-label={`Pilih icon ${cat.name}`}
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
// // import { useAuth } from '@/lib/AuthProvider';
// // import { api, getImageUrl } from '@/lib/api';
// // import Protected from '@/components/Protected';
// // import { Pencil, Check, X, Plus, Filter, MessageCircle } from 'lucide-react';

// // export default function ForumPage() {
// //   const { user } = useAuth();
  
// //   // --- STATE ---
// //   const [topics, setTopics] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [cmsCategories, setCmsCategories] = useState<string[]>(["General"]); 
// //   const [activeTab, setActiveTab] = useState<'approved' | 'pending'>('approved');
// //   const [categoryFilter, setCategoryFilter] = useState('Semua');
  
// //   // Modals
// //   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
// //   const [createForm, setCreateForm] = useState({ title: '', content: '', category: '' });
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const [editingTopic, setEditingTopic] = useState<any>(null);
// //   const [cmsIcons, setCmsIcons] = useState<{name: string, iconUrl: string}[]>([]);

// //   const isAdmin = user?.role === 'FACILITATOR' || user?.role === 'SUPER_ADMIN';

// //   useEffect(() => {
// //     loadCmsSettings();
// //     loadTopics();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [activeTab, categoryFilter]);

// //   const loadCmsSettings = async () => {
// //     try {
// //         const content = await api('/api/content'); 
// //         if (content && content.forumCategories?.length > 0) {
// //             const catNames = content.forumCategories.map((c: any) => c.name);
// //             setCmsCategories(catNames);
// //             setCmsIcons(content.forumCategories);
// //             setCreateForm(prev => ({ ...prev, category: catNames[0] }));
// //         }
// //     } catch (e) { console.error("Gagal load kategori CMS:", e); }
// //   };

// // //   const loadTopics = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await api(`/api/forum?status=${activeTab}&category=${categoryFilter}`);
// // //       setTopics(res.topics || []);
// // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // //   };
// // // const loadTopics = async () => {
// // //     try {
// // //       setLoading(true);
// // //       // TAMBAHKAN TIMESTAMP (?t=...) UNTUK MENGHINDARI CACHE
// // //       const timestamp = new Date().getTime();
// // //       const res = await api(`/api/forum?status=${activeTab}&category=${categoryFilter}&t=${timestamp}`);
// // //       setTopics(res.topics || []);
// // //     } catch (e) { 
// // //       console.error(e); 
// // //     } finally { 
// // //       setLoading(false); 
// // //     }
// // //   };
// // const loadTopics = async () => {
// //     try {
// //       setLoading(true);
// //       // TAMBAHKAN TIMESTAMP UNTUK MENGHINDARI CACHE
// //       const timestamp = new Date().getTime();
      
// //       // Pastikan status dikirim dengan benar
// //       const statusQuery = activeTab === 'pending' ? 'pending' : 'approved';
      
// //       const res = await api(`/api/forum?status=${statusQuery}&category=${categoryFilter}&t=${timestamp}`);
// //       setTopics(res.topics || []);
// //     } catch (e) { 
// //       console.error(e); 
// //     } finally { 
// //       setLoading(false); 
// //     }
// //   };
// //   const handleCreate = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const payload = { ...createForm, category: createForm.category || cmsCategories[0] };
// //       await api('/api/forum', { method: 'POST', body: payload });
// //       setIsCreateModalOpen(false);
// //       setCreateForm({ title: '', content: '', category: cmsCategories[0] });
// //       alert(isAdmin ? "Topik berhasil dibuat!" : "Permintaan topik dikirim! Menunggu persetujuan admin.");
// //       loadTopics();
// //     } catch (e: any) { alert("Gagal: " + e.message); }
// //   };

// //   const handleApprove = async (id: string, status: 'approved' | 'rejected') => {
// //       if(!confirm(`Yakin ingin ${status === 'approved' ? 'menyetujui' : 'menolak'} topik ini?`)) return;
// //       try {
// //           await api(`/api/forum/${id}/status`, { method: 'PUT', body: { status } });
// //           loadTopics(); 
// //       } catch (e: any) { alert(e.message); }
// //   };

// //   const openEditModal = (topic: any) => {
// //     setEditingTopic({ 
// //       _id: topic._id, 
// //       title: topic.title, 
// //       category: topic.category, 
// //       avatarUrl: topic.avatarUrl 
// //     });
// //     setIsEditModalOpen(true);
// //   };

// //   const handleUpdateTopic = async () => {
// //     if (!editingTopic) return;
// //     try {
// //       await api(`/api/forum/${editingTopic._id}`, { 
// //         method: 'PATCH', 
// //         body: { title: editingTopic.title, category: editingTopic.category, avatar: editingTopic.avatarUrl } 
// //       });
// //       alert("Perubahan berhasil disimpan!");
// //       setIsEditModalOpen(false);
// //       loadTopics();
// //     } catch (e: any) { alert("Gagal update: " + e.message); }
// //   };

// //   return (
// //     <Protected>
// //       <div className="max-w-6xl mx-auto p-6 min-h-screen font-sans">
        
// //         {/* HEADER */}
// //         <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
// //             <div>
// //                 <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
// //                   <MessageCircle className="text-red-700" size={32}/> Forum Diskusi
// //                 </h1>
// //                 <p className="text-gray-500 mt-1">Tempat bertanya dan berbagi ilmu.</p>
// //             </div>
// //             <button 
// //                 onClick={() => setIsCreateModalOpen(true)} 
// //                 className="bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-800 transition shadow-sm flex items-center gap-2"
// //             >
// //                 <Plus size={20} /> Buat Topik Baru
// //             </button>
// //         </div>

// //         {/* FILTER BAR */}
// //         <div className="flex flex-col md:flex-row justify-between items-center bg-white p-2 rounded-xl shadow-sm border border-gray-200 mb-6 gap-4">
// //             <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-full md:w-auto">
// //                 <button 
// //                     onClick={() => setActiveTab('approved')} 
// //                     className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'approved' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
// //                 >
// //                     Diskusi Aktif
// //                 </button>
// //                 {isAdmin && (
// //                     <button 
// //                         onClick={() => setActiveTab('pending')} 
// //                         className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold transition-all flex justify-center items-center gap-2 ${activeTab === 'pending' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
// //                     >
// //                         Menunggu Persetujuan
// //                     </button>
// //                 )}
// //             </div>
// //             <div className="relative w-full md:w-64">
// //                 <Filter className="absolute left-3 top-2.5 text-gray-400" size={16}/>
// //                 <select 
// //                     value={categoryFilter} 
// //                     onChange={(e) => setCategoryFilter(e.target.value)} 
// //                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none bg-white cursor-pointer"
// //                     aria-label="Filter Kategori"
// //                     title="Filter Kategori"
// //                 >
// //                     <option value="Semua">Semua Kategori</option>
// //                     {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
// //                 </select>
// //             </div>
// //         </div>

// //         {/* LIST */}
// //         {loading ? <div className="text-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-700 mx-auto"></div></div> : 
// //          topics.length === 0 ? <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed"><p className="text-gray-400 font-medium">Tidak ada topik.</p></div> : 
// //          <div className="space-y-4">
// //             {topics.map((topic) => (
// //                 <div key={topic._id} className={`bg-white p-6 rounded-2xl shadow-sm border transition-all group flex flex-col md:flex-row gap-4 justify-between items-start relative ${topic.hasUnread ? 'border-red-400 bg-red-50/10' : 'border-gray-200 hover:border-red-200'}`}>
                    
// //                     {/* [FITUR BARU] Indikator Pesan Baru */}
// //                     {topic.hasUnread && (
// //                         <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse shadow-sm z-10">
// //                             PESAN BARU
// //                         </div>
// //                     )}

// //                     <div className="flex gap-4 w-full">
// //                         <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-100 overflow-hidden bg-gray-50">
// //                             <img 
// //                                 src={
// //                                     (topic.avatarUrl && getImageUrl(topic.avatarUrl)) || 
// //                                     (topic.creator?.avatarUrl && getImageUrl(topic.creator.avatarUrl)) || 
// //                                     `https://ui-avatars.com/api/?name=${encodeURIComponent(topic.creator?.name || 'User')}&background=random`
// //                                 }
// //                                 className="w-full h-full object-cover"
// //                                 alt="Avatar"
// //                                 onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(topic.title || 'Topic')}&background=random`; }}
// //                             />
// //                         </div>
// //                         <div className="flex-1 pr-16"> {/* pr-16 agar teks tidak nabrak badge 'Pesan Baru' */}
// //                             <div className="flex items-center gap-2 mb-1 flex-wrap">
// //                                 <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">{topic.category}</span>
// //                                 <span className="text-xs text-gray-400">• {new Date(topic.createdAt).toLocaleDateString('id-ID')}</span>
// //                             </div>
// //                             <a href={`/forum/${topic._id}`} className="text-lg font-bold text-gray-800 group-hover:text-red-700 transition-colors block mb-1">
// //                                 {topic.title}
// //                             </a>
// //                             <p className="text-sm text-gray-600 line-clamp-2 mb-2">{topic.content}</p>
// //                             <p className="text-xs text-gray-400 font-medium">Oleh: <span className="text-gray-600">{topic.creator?.name}</span></p>
// //                         </div>
// //                     </div>
// //                     {activeTab === 'pending' && isAdmin && (
// //                         <div className="flex md:flex-col gap-2 w-full md:w-auto mt-2 md:mt-0">
// //                             <button onClick={() => openEditModal(topic)} className="flex items-center justify-center gap-1 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition text-xs font-bold" aria-label="Edit Topik"><Pencil size={14} /> Edit</button>
// //                             <button onClick={() => handleApprove(topic._id, 'approved')} className="flex items-center justify-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-xs font-bold" aria-label="Setujui Topik"><Check size={14} /> Setuju</button>
// //                             <button onClick={() => handleApprove(topic._id, 'rejected')} className="flex items-center justify-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-xs font-bold" aria-label="Tolak Topik"><X size={14} /> Tolak</button>
// //                         </div>
// //                     )}
// //                 </div>
// //             ))}
// //          </div>
// //         }

// //         {/* MODAL CREATE */}
// //         {isCreateModalOpen && (
// //             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
// //                 <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl">
// //                     <div className="flex justify-between items-center mb-4">
// //                         <h2 className="text-xl font-bold">Buat Topik Baru</h2>
// //                         <button onClick={() => setIsCreateModalOpen(false)} aria-label="Tutup Modal">
// //                             <X className="text-gray-400 hover:text-red-600"/>
// //                         </button>
// //                     </div>
// //                     <form onSubmit={handleCreate} className="space-y-4">
// //                         <input required className="w-full border rounded-lg px-3 py-2" value={createForm.title} onChange={e => setCreateForm({...createForm, title: e.target.value})} placeholder="Judul Diskusi" aria-label="Judul Diskusi"/>
                        
// //                         <select 
// //                             className="w-full border rounded-lg px-3 py-2 bg-white" 
// //                             value={createForm.category} 
// //                             onChange={e => setCreateForm({...createForm, category: e.target.value})}
// //                             aria-label="Pilih Kategori"
// //                             title="Pilih Kategori"
// //                         >
// //                             {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
// //                         </select>
                        
// //                         <textarea required rows={4} className="w-full border rounded-lg px-3 py-2" value={createForm.content} onChange={e => setCreateForm({...createForm, content: e.target.value})} placeholder="Isi diskusi..." aria-label="Isi Diskusi"/>
// //                         <div className="flex justify-end gap-2 mt-6 pt-4 border-t"><button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button><button type="submit" className="px-6 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800">{isAdmin ? 'Terbitkan' : 'Kirim Request'}</button></div>
// //                     </form>
// //                 </div>
// //             </div>
// //         )}

// //         {/* MODAL EDIT */}
// //         {isEditModalOpen && editingTopic && (
// //             <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
// //                 <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl">
// //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
// //                         <h3 className="text-lg font-bold">Edit Topik</h3>
// //                         <button onClick={() => setIsEditModalOpen(false)} aria-label="Tutup Modal Edit">
// //                             <X size={20}/>
// //                         </button>
// //                     </div>
// //                     <div className="p-6 space-y-4">
// //                          <input type="text" value={editingTopic.title} onChange={(e) => setEditingTopic({...editingTopic, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Judul" aria-label="Edit Judul"/>
                         
// //                          <select 
// //                             value={editingTopic.category} 
// //                             onChange={(e) => setEditingTopic({...editingTopic, category: e.target.value})} 
// //                             className="w-full px-3 py-2 border rounded-lg bg-white"
// //                             aria-label="Edit Kategori"
// //                             title="Edit Kategori"
// //                          >
// //                             {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
// //                          </select>
                         
// //                          <div className="grid grid-cols-5 gap-3">
// //                             <button 
// //                                 onClick={() => setEditingTopic({...editingTopic, avatarUrl: null})} 
// //                                 className="aspect-square border-2 rounded-xl flex items-center justify-center text-xs font-bold"
// //                                 aria-label="Hapus Icon Avatar"
// //                             >
// //                                 No Icon
// //                             </button>
// //                             {cmsIcons.map((cat, idx) => cat.iconUrl && (
// //                                 <button 
// //                                     key={idx} 
// //                                     onClick={() => setEditingTopic({...editingTopic, avatarUrl: cat.iconUrl})} 
// //                                     className={`relative aspect-square border-2 rounded-xl overflow-hidden ${editingTopic.avatarUrl === cat.iconUrl ? 'border-red-500' : 'border-gray-200'}`}
// //                                     aria-label={`Pilih icon ${cat.name}`}
// //                                 >
// //                                     <img src={getImageUrl(cat.iconUrl)} alt="icon" className="w-full h-full object-cover" />
// //                                 </button>
// //                             ))}
// //                          </div>
// //                     </div>
// //                     <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-2"><button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-bold">Batal</button><button onClick={handleUpdateTopic} className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-bold">Simpan</button></div>
// //                 </div>
// //             </div>
// //         )}
// //       </div>
// //     </Protected>
// //   );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { useAuth } from '@/lib/AuthProvider';
// import { api, getImageUrl } from '@/lib/api';
// import Protected from '@/components/Protected';
// import { Pencil, Check, X, Plus, Filter, MessageCircle } from 'lucide-react';
// import Link from 'next/link'; // Penting untuk navigasi

// export default function ForumPage() {
//   const { user } = useAuth();
  
//   // --- STATE ---
//   const [topics, setTopics] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [cmsCategories, setCmsCategories] = useState<string[]>(["General"]); 
//   const [activeTab, setActiveTab] = useState<'approved' | 'pending'>('approved');
//   const [categoryFilter, setCategoryFilter] = useState('Semua');
  
//   // Modals
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [createForm, setCreateForm] = useState({ title: '', content: '', category: '' });
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingTopic, setEditingTopic] = useState<any>(null);
//   const [cmsIcons, setCmsIcons] = useState<{name: string, iconUrl: string}[]>([]);

//   const isAdmin = user?.role === 'FACILITATOR' || user?.role === 'SUPER_ADMIN';

//   useEffect(() => {
//     loadCmsSettings();
//     loadTopics();
    
//     // LISTENER: Update otomatis saat notifikasi dibaca di tab lain/detail page
//     const handleUpdate = () => loadTopics();
//     window.addEventListener('notification-updated', handleUpdate);
    
//     // Polling setiap 10 detik agar realtime
//     const interval = setInterval(loadTopics, 10000);

//     return () => {
//         window.removeEventListener('notification-updated', handleUpdate);
//         clearInterval(interval);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeTab, categoryFilter]);

//   const loadCmsSettings = async () => {
//     try {
//         const content = await api('/api/content'); 
//         if (content && content.forumCategories?.length > 0) {
//             const catNames = content.forumCategories.map((c: any) => c.name);
//             setCmsCategories(catNames);
//             setCmsIcons(content.forumCategories);
//             setCreateForm(prev => ({ ...prev, category: catNames[0] }));
//         }
//     } catch (e) { console.error("Gagal load kategori CMS:", e); }
//   };

//   const loadTopics = async () => {
//     try {
//       // Jangan set loading true agar tidak flickering saat polling
//       // setLoading(true); 
      
//       const timestamp = new Date().getTime();
//       const statusQuery = activeTab === 'pending' ? 'pending' : 'approved';
      
//       const res = await api(`/api/forum?status=${statusQuery}&category=${categoryFilter}&t=${timestamp}`);
//       setTopics(res.topics || []);
//     } catch (e) { 
//       console.error(e); 
//     } finally { 
//       setLoading(false); 
//     }
//   };

//   const handleCreate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const payload = { ...createForm, category: createForm.category || cmsCategories[0] };
//       await api('/api/forum', { method: 'POST', body: payload });
//       setIsCreateModalOpen(false);
//       setCreateForm({ title: '', content: '', category: cmsCategories[0] });
//       alert(isAdmin ? "Topik berhasil dibuat!" : "Permintaan topik dikirim! Menunggu persetujuan admin.");
//       loadTopics();
//     } catch (e: any) { alert("Gagal: " + e.message); }
//   };

//   const handleApprove = async (id: string, status: 'approved' | 'rejected') => {
//       if(!confirm(`Yakin ingin ${status === 'approved' ? 'menyetujui' : 'menolak'} topik ini?`)) return;
//       try {
//           await api(`/api/forum/${id}/status`, { method: 'PATCH', body: { status } }); // Menggunakan PATCH sesuai backend
//           loadTopics(); 
//       } catch (e: any) { alert(e.message); }
//   };

//   const openEditModal = (topic: any) => {
//     setEditingTopic({ 
//       _id: topic._id, 
//       title: topic.title, 
//       category: topic.category, 
//       avatarUrl: topic.avatarUrl 
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleUpdateTopic = async () => {
//     if (!editingTopic) return;
//     try {
//       await api(`/api/forum/${editingTopic._id}`, { 
//         method: 'PATCH', // Menggunakan PATCH agar konsisten
//         body: { title: editingTopic.title, category: editingTopic.category, avatar: editingTopic.avatarUrl } 
//       });
//       alert("Perubahan berhasil disimpan!");
//       setIsEditModalOpen(false);
//       loadTopics();
//     } catch (e: any) { alert("Gagal update: " + e.message); }
//   };

//   return (
//     <Protected>
//       <div className="max-w-6xl mx-auto p-6 min-h-screen font-sans">
        
//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//             <div>
//                 <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//                   <MessageCircle className="text-red-700" size={32}/> Forum Diskusi
//                 </h1>
//                 <p className="text-gray-500 mt-1">Tempat bertanya dan berbagi ilmu.</p>
//             </div>
//             <button 
//                 onClick={() => setIsCreateModalOpen(true)} 
//                 className="bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-800 transition shadow-sm flex items-center gap-2"
//             >
//                 <Plus size={20} /> Buat Topik Baru
//             </button>
//         </div>

//         {/* FILTER BAR */}
//         <div className="flex flex-col md:flex-row justify-between items-center bg-white p-2 rounded-xl shadow-sm border border-gray-200 mb-6 gap-4">
//             <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-full md:w-auto">
//                 <button 
//                     onClick={() => setActiveTab('approved')} 
//                     className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'approved' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//                 >
//                     Diskusi Aktif
//                 </button>
//                 {isAdmin && (
//                     <button 
//                         onClick={() => setActiveTab('pending')} 
//                         className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold transition-all flex justify-center items-center gap-2 ${activeTab === 'pending' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//                     >
//                         Menunggu Persetujuan
//                     </button>
//                 )}
//             </div>
//             <div className="relative w-full md:w-64">
//                 <Filter className="absolute left-3 top-2.5 text-gray-400" size={16}/>
//                 <select 
//                     value={categoryFilter} 
//                     onChange={(e) => setCategoryFilter(e.target.value)} 
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none bg-white cursor-pointer"
//                 >
//                     <option value="Semua">Semua Kategori</option>
//                     {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
//                 </select>
//             </div>
//         </div>

//         {/* LIST */}
//         {loading && topics.length === 0 ? (
//            <div className="text-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-700 mx-auto"></div></div>
//         ) : topics.length === 0 ? (
//            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed"><p className="text-gray-400 font-medium">Tidak ada topik.</p></div>
//         ) : (
//           <div className="space-y-4">
//             {topics.map((topic) => (
//                 // WRAPPER LINK ke Detail Page
//                 <div key={topic._id} className={`bg-white p-6 rounded-2xl shadow-sm border transition-all group flex flex-col md:flex-row gap-4 justify-between items-start relative ${topic.hasUnread ? 'border-red-400 bg-red-50/20' : 'border-gray-200 hover:border-red-200'}`}>
                    
//                     {/* [FITUR BARU] Indikator Pesan Baru */}
//                     {topic.hasUnread && (
//                         <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse shadow-sm z-10">
//                             PESAN BARU
//                         </div>
//                     )}

//                     <div className="flex gap-4 w-full">
//                         <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-100 overflow-hidden bg-gray-50">
//                             <img 
//                                 src={
//                                     (topic.avatarUrl && getImageUrl(topic.avatarUrl)) || 
//                                     (topic.author?.avatarUrl && getImageUrl(topic.author.avatarUrl)) || 
//                                     `https://ui-avatars.com/api/?name=${encodeURIComponent(topic.author?.name || 'User')}&background=random`
//                                 }
//                                 className="w-full h-full object-cover"
//                                 alt="Avatar"
//                                 onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(topic.title || 'Topic')}&background=random`; }}
//                             />
//                         </div>
//                         <div className="flex-1 pr-16">
//                             <div className="flex items-center gap-2 mb-1 flex-wrap">
//                                 <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">{topic.category}</span>
//                                 <span className="text-xs text-gray-400">• {new Date(topic.createdAt).toLocaleDateString('id-ID')}</span>
//                             </div>
                            
//                             {/* JUDUL YANG BISA DIKLIK */}
//                             <Link href={`/forum/${topic._id}`} className="text-lg font-bold text-gray-800 group-hover:text-red-700 transition-colors block mb-1">
//                                 {topic.title}
//                             </Link>
                            
//                             <p className="text-sm text-gray-600 line-clamp-2 mb-2">{topic.content}</p>
//                             <p className="text-xs text-gray-400 font-medium">Oleh: <span className="text-gray-600">{topic.author?.name}</span></p>
//                         </div>
//                     </div>
                    
//                     {/* Tombol Aksi Admin (Hanya di tab Pending) */}
//                     {activeTab === 'pending' && isAdmin && (
//                         <div className="flex md:flex-col gap-2 w-full md:w-auto mt-2 md:mt-0 z-20">
//                             <button onClick={() => openEditModal(topic)} className="flex items-center justify-center gap-1 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition text-xs font-bold"><Pencil size={14} /> Edit</button>
//                             <button onClick={() => handleApprove(topic._id, 'approved')} className="flex items-center justify-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-xs font-bold"><Check size={14} /> Setuju</button>
//                             <button onClick={() => handleApprove(topic._id, 'rejected')} className="flex items-center justify-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-xs font-bold"><X size={14} /> Tolak</button>
//                         </div>
//                     )}
//                 </div>
//             ))}
//          </div>
//         )}

//         {/* MODAL CREATE */}
//         {isCreateModalOpen && (
//             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//                 <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-xl font-bold">Buat Topik Baru</h2>
//                         <button onClick={() => setIsCreateModalOpen(false)}>
//                             <X className="text-gray-400 hover:text-red-600"/>
//                         </button>
//                     </div>
//                     <form onSubmit={handleCreate} className="space-y-4">
//                         <input required className="w-full border rounded-lg px-3 py-2" value={createForm.title} onChange={e => setCreateForm({...createForm, title: e.target.value})} placeholder="Judul Diskusi"/>
                        
//                         <select 
//                             className="w-full border rounded-lg px-3 py-2 bg-white" 
//                             value={createForm.category} 
//                             onChange={e => setCreateForm({...createForm, category: e.target.value})}
//                         >
//                             {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
//                         </select>
                        
//                         <textarea required rows={4} className="w-full border rounded-lg px-3 py-2" value={createForm.content} onChange={e => setCreateForm({...createForm, content: e.target.value})} placeholder="Isi diskusi..."/>
//                         <div className="flex justify-end gap-2 mt-6 pt-4 border-t"><button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button><button type="submit" className="px-6 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800">{isAdmin ? 'Terbitkan' : 'Kirim Request'}</button></div>
//                     </form>
//                 </div>
//             </div>
//         )}

//         {/* MODAL EDIT */}
//         {isEditModalOpen && editingTopic && (
//             <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
//                 <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl">
//                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
//                         <h3 className="text-lg font-bold">Edit Topik</h3>
//                         <button onClick={() => setIsEditModalOpen(false)}>
//                             <X size={20}/>
//                         </button>
//                     </div>
//                     <div className="p-6 space-y-4">
//                          <input type="text" value={editingTopic.title} onChange={(e) => setEditingTopic({...editingTopic, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Judul"/>
                         
//                          <select 
//                             value={editingTopic.category} 
//                             onChange={(e) => setEditingTopic({...editingTopic, category: e.target.value})} 
//                             className="w-full px-3 py-2 border rounded-lg bg-white"
//                          >
//                             {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
//                          </select>
                         
//                          <div className="grid grid-cols-5 gap-3">
//                             <button 
//                                 onClick={() => setEditingTopic({...editingTopic, avatarUrl: null})} 
//                                 className="aspect-square border-2 rounded-xl flex items-center justify-center text-xs font-bold"
//                             >
//                                 No Icon
//                             </button>
//                             {cmsIcons.map((cat, idx) => cat.iconUrl && (
//                                 <button 
//                                     key={idx} 
//                                     onClick={() => setEditingTopic({...editingTopic, avatarUrl: cat.iconUrl})} 
//                                     className={`relative aspect-square border-2 rounded-xl overflow-hidden ${editingTopic.avatarUrl === cat.iconUrl ? 'border-red-500' : 'border-gray-200'}`}
//                                 >
//                                     <img src={getImageUrl(cat.iconUrl)} alt="icon" className="w-full h-full object-cover" />
//                                 </button>
//                             ))}
//                          </div>
//                     </div>
//                     <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-2"><button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-bold">Batal</button><button onClick={handleUpdateTopic} className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-bold">Simpan</button></div>
//                 </div>
//             </div>
//         )}
//       </div>
//     </Protected>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthProvider';
import { api, getImageUrl } from '@/lib/api';
import Protected from '@/components/Protected';
import { Pencil, Check, X, Plus, Filter, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForumPage() {
  const { user } = useAuth();
  
  // --- STATE ---
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cmsCategories, setCmsCategories] = useState<string[]>(["General"]); 
  const [activeTab, setActiveTab] = useState<'approved' | 'pending'>('approved');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState({ title: '', content: '', category: '' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<any>(null);
  const [cmsIcons, setCmsIcons] = useState<{name: string, iconUrl: string}[]>([]);

  const isAdmin = user?.role === 'FACILITATOR' || user?.role === 'SUPER_ADMIN';

  useEffect(() => {
    loadCmsSettings();
    loadTopics();
    
    const handleUpdate = () => loadTopics();
    window.addEventListener('notification-updated', handleUpdate);
    
    // Polling setiap 10 detik agar realtime (Badge & Unread Status)
    const interval = setInterval(loadTopics, 10000);

    return () => {
        window.removeEventListener('notification-updated', handleUpdate);
        clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, categoryFilter]);

  const loadCmsSettings = async () => {
    try {
        const content = await api('/api/content'); 
        if (content && content.forumCategories?.length > 0) {
            const catNames = content.forumCategories.map((c: any) => c.name);
            setCmsCategories(catNames);
            setCmsIcons(content.forumCategories);
            setCreateForm(prev => ({ ...prev, category: catNames[0] }));
        }
    } catch (e) { console.error("Gagal load kategori CMS:", e); }
  };

  const loadTopics = async () => {
    try {
      const timestamp = new Date().getTime();
      const statusQuery = activeTab === 'pending' ? 'pending' : 'approved';
      
      const res = await api(`/api/forum?status=${statusQuery}&category=${categoryFilter}&t=${timestamp}`);
      setTopics(res.topics || []);
    } catch (e) { 
      console.error(e); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...createForm, category: createForm.category || cmsCategories[0] };
      await api('/api/forum', { method: 'POST', body: payload });
      setIsCreateModalOpen(false);
      setCreateForm({ title: '', content: '', category: cmsCategories[0] });
      alert(isAdmin ? "Topik berhasil dibuat!" : "Permintaan topik dikirim! Menunggu persetujuan admin.");
      loadTopics();
    } catch (e: any) { alert("Gagal: " + e.message); }
  };

  const handleApprove = async (id: string, status: 'approved' | 'rejected') => {
      if(!confirm(`Yakin ingin ${status === 'approved' ? 'menyetujui' : 'menolak'} topik ini?`)) return;
      try {
          await api(`/api/forum/${id}/status`, { method: 'PATCH', body: { status } });
          loadTopics(); 
      } catch (e: any) { alert(e.message); }
  };

  const openEditModal = (topic: any) => {
    setEditingTopic({ 
      _id: topic._id, 
      title: topic.title, 
      category: topic.category, 
      avatarUrl: topic.avatarUrl 
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateTopic = async () => {
    if (!editingTopic) return;
    try {
      await api(`/api/forum/${editingTopic._id}`, { 
        method: 'PATCH', 
        body: { title: editingTopic.title, category: editingTopic.category, avatar: editingTopic.avatarUrl } 
      });
      alert("Perubahan berhasil disimpan!");
      setIsEditModalOpen(false);
      loadTopics();
    } catch (e: any) { alert("Gagal update: " + e.message); }
  };

  return (
    <Protected>
      <div className="max-w-6xl mx-auto p-6 min-h-screen font-sans">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <MessageCircle className="text-red-700" size={32}/> Forum Diskusi
                </h1>
                <p className="text-gray-500 mt-1">Tempat bertanya dan berbagi ilmu.</p>
            </div>
            <button 
                onClick={() => setIsCreateModalOpen(true)} 
                className="bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-800 transition shadow-sm flex items-center gap-2"
            >
                <Plus size={20} /> Buat Topik Baru
            </button>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-2 rounded-xl shadow-sm border border-gray-200 mb-6 gap-4">
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-full md:w-auto">
                <button 
                    onClick={() => setActiveTab('approved')} 
                    className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'approved' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Diskusi Aktif
                </button>
                {isAdmin && (
                    <button 
                        onClick={() => setActiveTab('pending')} 
                        className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold transition-all flex justify-center items-center gap-2 ${activeTab === 'pending' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Menunggu Persetujuan
                    </button>
                )}
            </div>
            <div className="relative w-full md:w-64">
                <Filter className="absolute left-3 top-2.5 text-gray-400" size={16}/>
                <select 
                    value={categoryFilter} 
                    onChange={(e) => setCategoryFilter(e.target.value)} 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none bg-white cursor-pointer"
                    aria-label="Filter Kategori" // FIX: A11y Error
                    title="Filter Kategori"
                >
                    <option value="Semua">Semua Kategori</option>
                    {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
        </div>

        {/* LIST */}
        {loading && topics.length === 0 ? (
           <div className="text-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-700 mx-auto"></div></div>
        ) : topics.length === 0 ? (
           <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed"><p className="text-gray-400 font-medium">Tidak ada topik.</p></div>
        ) : (
          <div className="space-y-4">
            {topics.map((topic) => (
                <div key={topic._id} className={`bg-white p-6 rounded-2xl shadow-sm border transition-all group flex flex-col md:flex-row gap-4 justify-between items-start relative ${topic.hasUnread ? 'border-red-400 bg-red-50/20' : 'border-gray-200 hover:border-red-200'}`}>
                    
                    {topic.hasUnread && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse shadow-sm z-10">
                            PESAN BARU
                        </div>
                    )}

                    <div className="flex gap-4 w-full">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-100 overflow-hidden bg-gray-50">
                            <img 
                                src={
                                    (topic.avatarUrl && getImageUrl(topic.avatarUrl)) || 
                                    (topic.author?.avatarUrl && getImageUrl(topic.author.avatarUrl)) || 
                                    `https://ui-avatars.com/api/?name=${encodeURIComponent(topic.author?.name || 'User')}&background=random`
                                }
                                className="w-full h-full object-cover"
                                alt="Avatar"
                                onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(topic.title || 'Topic')}&background=random`; }}
                            />
                        </div>
                        <div className="flex-1 pr-16">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">{topic.category}</span>
                                <span className="text-xs text-gray-400">• {new Date(topic.createdAt).toLocaleDateString('id-ID')}</span>
                            </div>
                            
                            <Link href={`/forum/${topic._id}`} className="text-lg font-bold text-gray-800 group-hover:text-red-700 transition-colors block mb-1">
                                {topic.title}
                            </Link>
                            
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{topic.content}</p>
                            <p className="text-xs text-gray-400 font-medium">Oleh: <span className="text-gray-600">{topic.author?.name}</span></p>
                        </div>
                    </div>
                    
                    {activeTab === 'pending' && isAdmin && (
                        <div className="flex md:flex-col gap-2 w-full md:w-auto mt-2 md:mt-0 z-20">
                            <button onClick={() => openEditModal(topic)} className="flex items-center justify-center gap-1 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition text-xs font-bold" aria-label="Edit Topik"><Pencil size={14} /> Edit</button>
                            <button onClick={() => handleApprove(topic._id, 'approved')} className="flex items-center justify-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-xs font-bold" aria-label="Setujui Topik"><Check size={14} /> Setuju</button>
                            <button onClick={() => handleApprove(topic._id, 'rejected')} className="flex items-center justify-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-xs font-bold" aria-label="Tolak Topik"><X size={14} /> Tolak</button>
                        </div>
                    )}
                </div>
            ))}
         </div>
        )}

        {/* MODAL CREATE */}
        {isCreateModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Buat Topik Baru</h2>
                        {/* FIX: A11y Error */}
                        <button onClick={() => setIsCreateModalOpen(false)} aria-label="Tutup Modal">
                            <X className="text-gray-400 hover:text-red-600"/>
                        </button>
                    </div>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <input required className="w-full border rounded-lg px-3 py-2" value={createForm.title} onChange={e => setCreateForm({...createForm, title: e.target.value})} placeholder="Judul Diskusi" aria-label="Judul Diskusi"/>
                        
                        <select 
                            className="w-full border rounded-lg px-3 py-2 bg-white" 
                            value={createForm.category} 
                            onChange={e => setCreateForm({...createForm, category: e.target.value})}
                            aria-label="Pilih Kategori" // FIX: A11y Error
                        >
                            {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        
                        <textarea required rows={4} className="w-full border rounded-lg px-3 py-2" value={createForm.content} onChange={e => setCreateForm({...createForm, content: e.target.value})} placeholder="Isi diskusi..." aria-label="Isi Diskusi"/>
                        <div className="flex justify-end gap-2 mt-6 pt-4 border-t"><button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button><button type="submit" className="px-6 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800">{isAdmin ? 'Terbitkan' : 'Kirim Request'}</button></div>
                    </form>
                </div>
            </div>
        )}

        {/* MODAL EDIT */}
        {isEditModalOpen && editingTopic && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
                <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl">
                    <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                        <h3 className="text-lg font-bold">Edit Topik</h3>
                        {/* FIX: A11y Error */}
                        <button onClick={() => setIsEditModalOpen(false)} aria-label="Tutup Modal Edit">
                            <X size={20}/>
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                         <input type="text" value={editingTopic.title} onChange={(e) => setEditingTopic({...editingTopic, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Judul" aria-label="Edit Judul"/>
                         
                         <select 
                            value={editingTopic.category} 
                            onChange={(e) => setEditingTopic({...editingTopic, category: e.target.value})} 
                            className="w-full px-3 py-2 border rounded-lg bg-white"
                            aria-label="Edit Kategori" // FIX: A11y Error
                         >
                            {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
                         </select>
                         
                         <div className="grid grid-cols-5 gap-3">
                            <button 
                                onClick={() => setEditingTopic({...editingTopic, avatarUrl: null})} 
                                className="aspect-square border-2 rounded-xl flex items-center justify-center text-xs font-bold"
                                aria-label="Hapus Icon Avatar" // FIX: A11y Error
                            >
                                No Icon
                            </button>
                            {cmsIcons.map((cat, idx) => cat.iconUrl && (
                                <button 
                                    key={idx} 
                                    onClick={() => setEditingTopic({...editingTopic, avatarUrl: cat.iconUrl})} 
                                    className={`relative aspect-square border-2 rounded-xl overflow-hidden ${editingTopic.avatarUrl === cat.iconUrl ? 'border-red-500' : 'border-gray-200'}`}
                                    aria-label={`Pilih icon ${cat.name}`} // FIX: A11y Error
                                >
                                    <img src={getImageUrl(cat.iconUrl)} alt="icon" className="w-full h-full object-cover" />
                                </button>
                            ))}
                         </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-2"><button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-bold">Batal</button><button onClick={handleUpdateTopic} className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-bold">Simpan</button></div>
                </div>
            </div>
        )}
      </div>
    </Protected>
  );
}
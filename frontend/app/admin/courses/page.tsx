// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { api } from '@/lib/api';
// // // import Protected from '@/components/Protected';
// // // import { useAuth } from '@/lib/AuthProvider'; 
// // // import { 
// // //     Plus, Search, BookOpen, FileText, Loader2, ChevronLeft, ChevronRight, RefreshCw
// // // } from 'lucide-react';

// // // // Import Komponen
// // // import CourseFormModal from '@/components/admin/courses/CourseFormModal';
// // // import CourseProposalModal from '@/components/admin/courses/CourseProposalModal'; 
// // // import ProposalTable from '@/components/admin/courses/ProposalTable'; 
// // // import ManagementTable from '@/components/admin/courses/ManagementTable'; 
// // // import CourseProposalDetailModal from '@/components/admin/courses/CourseProposalDetailModal';

// // // export default function AdminCoursesPage() {
// // //   const { user } = useAuth(); 
// // //   const [courses, setCourses] = useState<any[]>([]);
// // //   const [facilitators, setFacilitators] = useState<any[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [search, setSearch] = useState('');
// // //   const [page, setPage] = useState(1);
// // //   const [totalPages, setTotalPages] = useState(1);
  
// // //   const [activeMainTab, setActiveMainTab] = useState<'proposal' | 'management'>('proposal');

// // //   const [isProposalOpen, setIsProposalOpen] = useState(false); 
// // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
// // //   const [isReadOnlyModal, setIsReadOnlyModal] = useState(false);
// // //   const [editingCourse, setEditingCourse] = useState<any>(null);

// // //   // Helper Permission Check
// // //   const hasPermission = (perm: string) => {
// // //       if (!user) return false;
// // //       if (user.role === 'SUPER_ADMIN') return true;
// // //       return user.permissions?.includes(perm);
// // //   };

// // //   const canCreate = user?.role === 'FACILITATOR' || hasPermission('manage_courses');
// // //   const canVerify = hasPermission('verify_enrollments');
// // //   const canPublish = hasPermission('publish_courses');

// // //   useEffect(() => { fetchCourses(); fetchFacilitators(); }, [page, search, activeMainTab]);

// // //   const fetchCourses = async () => {
// // //     setLoading(true);
// // //     try {
// // //         const limit = '50'; 
// // //         const query = new URLSearchParams({ page: page.toString(), limit: limit, search, sort: '-createdAt' });
// // //         const res = await api(`/api/courses?${query}`);
// // //         let allData = res.courses || [];
// // //         let filteredData = [];
        
// // //         if (activeMainTab === 'proposal') {
// // //             filteredData = allData.filter((c:any) => c.status === 'proposed' || c.status === 'revision');
// // //         } else {
// // //             filteredData = allData.filter((c:any) => c.status !== 'proposed' && c.status !== 'revision');
// // //         }
// // //         setCourses(filteredData);
// // //         setTotalPages(res.totalPages || 1); 
// // //     } catch (error) { console.error("Gagal load courses", error); } finally { setLoading(false); }
// // //   };

// // //   const fetchFacilitators = async () => {
// // //       try {
// // //           const res = await api('/api/users/facilitators').catch(() => null); 
// // //           if (res?.users) setFacilitators(res.users);
// // //       } catch (e) { console.error("Gagal load facilitators", e); }
// // //   };

// // //   const handleDelete = async (id: string) => {
// // //       if(!hasPermission('manage_courses') && user?.role !== 'FACILITATOR') return alert("Akses Ditolak");
// // //       if(!confirm("Yakin ingin menghapus data ini secara permanen?")) return;
// // //       try { await api(`/api/courses/${id}`, { method: 'DELETE' }); fetchCourses(); } catch (e: any) { alert(e.message); }
// // //   };
  
// // //   const handleApprove = async (course: any) => {
// // //       if(!canVerify) return alert("Anda tidak memiliki izin verifikasi.");
// // //       if(!confirm(`Setujui pengajuan "${course.title}"?`)) return;
// // //       try { 
// // //           await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { status: 'draft' } }); 
// // //           alert("✅ Disetujui! Data dipindahkan ke tab Manajemen Pelatihan."); 
// // //           setIsDetailModalOpen(false); 
// // //           fetchCourses(); 
// // //       } catch (e: any) { alert(e.message); }
// // //   };

// // //   const handleReturn = async (course: any) => {
// // //       if(!canVerify) return alert("Anda tidak memiliki izin verifikasi.");
// // //       const note = prompt("Masukkan catatan perbaikan untuk pengaju:");
// // //       if (note === null) return; 
// // //       try {
// // //           const newDesc = course.description + `<br/><br/><div style="background:#fff3cd;padding:10px;border:1px solid #ffeeba;"><strong>⚠️ Catatan Admin:</strong> ${note}</div>`;
// // //           await api(`/api/courses/${course._id}`, { 
// // //               method: 'PATCH', 
// // //               body: { status: 'revision', description: newDesc } 
// // //           });
// // //           alert("↩️ Pengajuan dikembalikan ke user untuk revisi.");
// // //           setIsDetailModalOpen(false);
// // //           fetchCourses();
// // //       } catch (e: any) { alert(e.message); }
// // //   };

// // //   const handlePublish = async (course: any) => {
// // //       if(!canPublish && user?.role !== 'SUPER_ADMIN' && course.status !== 'ready') {
// // //           return alert("Anda belum bisa mempublish kursus ini. Tunggu persetujuan konten dari Admin.");
// // //       }
      
// // //       const isCurrentlyActive = course.isPublished === true || course.status === 'published';
// // //       const newStatusString = !isCurrentlyActive ? 'published' : 'draft';
      
// // //       if(!confirm(`Ubah status publikasi menjadi ${!isCurrentlyActive ? 'TERBIT' : 'DRAFT'}?`)) return;
// // //       try { 
// // //           await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { isPublished: !isCurrentlyActive, status: newStatusString } }); 
// // //           fetchCourses(); 
// // //       } catch (e: any) { alert(e.message); }
// // //   };

// // //   const handleRemindAdmin = async (course: any) => {
// // //       alert(`🔔 Notifikasi terkirim! Admin telah diingatkan untuk me-review "${course.title}".`);
// // //   };

// // //   const handleBroadcast = (course: any) => {
// // //       const msg = prompt(`Kirim Broadcast untuk "${course.title}"?`);
// // //       if (msg) alert(`Broadcast terkirim: ${msg}`);
// // //   };

// // //   const openDetailProposal = (course: any) => {
// // //       setEditingCourse(course);
// // //       setIsReadOnlyModal(false);
// // //       setIsDetailModalOpen(true);
// // //   };

// // //   const openHistory = (course: any) => {
// // //       setEditingCourse(course);
// // //       setIsReadOnlyModal(true);
// // //       setIsDetailModalOpen(true);
// // //   };

// // //   return (
// // //     <Protected roles={['SUPER_ADMIN', 'ADMIN', 'FACILITATOR']}>
// // //       <div className="p-6 md:p-8 min-h-screen bg-gray-50">
        
// // //         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
// // //             <div>
// // //                 <div className="flex items-center gap-3">
// // //                     <h1 className="text-2xl font-bold text-gray-900">Pusat Pelatihan</h1>
// // //                     <button 
// // //                         onClick={fetchCourses} 
// // //                         className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
// // //                         title="Refresh Data"
// // //                         aria-label="Refresh Data"
// // //                     >
// // //                         <RefreshCw size={16} className={loading ? "animate-spin" : ""}/>
// // //                     </button>
// // //                 </div>
// // //                 <p className="text-gray-500 text-sm mt-1">Kelola pengajuan dan kurikulum pelatihan.</p>
// // //             </div>
            
// // //             {canCreate && (
// // //                 <button onClick={() => setIsProposalOpen(true)} className="bg-[#990000] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#7f0000]">
// // //                     <Plus size={18}/> Buat Pengajuan Baru
// // //                 </button>
// // //             )}
// // //         </div>

// // //         <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 mb-6 w-fit">
// // //             <button onClick={() => { setActiveMainTab('proposal'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${activeMainTab === 'proposal' ? 'bg-[#990000] text-white' : 'text-gray-500'}`}><FileText size={16}/> Pengajuan Masuk</button>
// // //             <button onClick={() => { setActiveMainTab('management'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${activeMainTab === 'management' ? 'bg-[#990000] text-white' : 'text-gray-500'}`}><BookOpen size={16}/> Manajemen Pelatihan</button>
// // //         </div>

// // //         <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
// // //             <div className="relative w-full">
// // //                 <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
// // //                 <input type="text" placeholder={activeMainTab === 'proposal' ? "Cari pengajuan..." : "Cari pelatihan aktif..."} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 outline-none text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
// // //             </div>
// // //         </div>

// // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
// // //             {loading ? <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-gray-400"/></div> : (
// // //                 <>
// // //                     {activeMainTab === 'proposal' ? (
// // //                         <ProposalTable 
// // //                             courses={courses} 
// // //                             onApprove={handleApprove} 
// // //                             onReject={handleReturn} 
// // //                             onViewDetail={openDetailProposal}
// // //                             currentUser={user}
// // //                             onRemind={handleRemindAdmin}
// // //                         />
// // //                     ) : (
// // //                         <ManagementTable 
// // //                             courses={courses} 
// // //                             onEdit={(c) => { setEditingCourse(c); setIsEditModalOpen(true); }} 
// // //                             onDelete={handleDelete} 
// // //                             onPublish={handlePublish} 
// // //                             onBroadcast={handleBroadcast} 
// // //                             onViewHistory={openHistory}
// // //                             currentUser={user} 
// // //                         />
// // //                     )}
// // //                 </>
// // //             )}
// // //             <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
// // //                 <button 
// // //                     disabled={page === 1} 
// // //                     onClick={() => setPage(p => p - 1)} 
// // //                     className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200"
// // //                     title="Halaman Sebelumnya"
// // //                 >
// // //                     <ChevronLeft size={16}/>
// // //                 </button>
// // //                 <span className="text-xs font-bold text-gray-500">Halaman {page} dari {totalPages}</span>
// // //                 <button 
// // //                     disabled={page === totalPages} 
// // //                     onClick={() => setPage(p => p + 1)} 
// // //                     className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200"
// // //                     title="Halaman Selanjutnya"
// // //                 >
// // //                     <ChevronRight size={16}/>
// // //                 </button>
// // //             </div>
// // //         </div>
// // // {/* --- MODAL 1: PROPOSAL BARU --- */}
// // //         {isProposalOpen && (
// // //             <CourseProposalModal 
// // //                 currentUser={user}
// // //                 onClose={() => setIsProposalOpen(false)} 
// // //                 onSuccess={() => { 
// // //                     setIsProposalOpen(false); 
// // //                     fetchCourses(); // Refresh data tabel setelah simpan
// // //                 }} 
// // //             />
// // //         )}

// // //         {/* --- MODAL 2: EDIT PELATIHAN --- */}
// // //         {isEditModalOpen && (
// // //             <CourseFormModal 
// // //                 course={editingCourse} 
// // //                 currentUser={user}
// // //                 facilitators={facilitators || []} // [SAFETY] Mencegah error jika data kosong
// // //                 onClose={() => setIsEditModalOpen(false)} 
// // //                 onSuccess={() => { 
// // //                     setIsEditModalOpen(false); 
// // //                     fetchCourses(); 
// // //                 }} 
// // //             />
// // //         )}
// // //         {isDetailModalOpen && (
// // //             <CourseProposalDetailModal 
// // //                 course={editingCourse} 
// // //                 onClose={() => setIsDetailModalOpen(false)} 
// // //                 onApprove={handleApprove} 
// // //                 onReject={handleReturn} 
// // //                 currentUser={user} 
// // //                 refreshData={fetchCourses}
// // //                 isReadOnly={isReadOnlyModal}
// // //             />
// // //         )}
// // //       </div>
// // //     </Protected>
// // //   );
// // // }

// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';
// // import { Plus, Search, FileText, BookOpen, Loader2 } from 'lucide-react';
// // import { api } from '@/lib/api';

// // import ManagementTable from '@/components/admin/courses/ManagementTable';
// // import ProposalTable from '@/components/admin/courses/ProposalTable';
// // import CourseProposalModal from '@/components/admin/courses/CourseProposalModal';
// // import CourseProposalDetailModal from '@/components/admin/courses/CourseProposalDetailModal';
// // import CourseFormModal from '@/components/admin/courses/CourseFormModal'; 

// // export default function AdminCoursesPage() {
// //     const router = useRouter();
// //     const searchParams = useSearchParams();
    
// //     const [currentUser, setCurrentUser] = useState<any>(null);
// //     const [loading, setLoading] = useState(true);
// //     const [courses, setCourses] = useState<any[]>([]);
    
// //     const [activeTab, setActiveTab] = useState<'proposal' | 'management'>('management');
// //     const [searchTerm, setSearchTerm] = useState('');

// //     const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
// //     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //     const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
// //     const [selectedCourse, setSelectedCourse] = useState<any>(null);

// //     useEffect(() => {
// //         const userStr = localStorage.getItem('user');
// //         if (userStr) {
// //             const userObj = JSON.parse(userStr);
// //             setCurrentUser(userObj);
// //             if (userObj.role === 'FACILITATOR') setActiveTab('proposal');
// //         } else {
// //             router.push('/auth/login');
// //         }
// //     }, [router]);

// //     const fetchCourses = async () => {
// //         if (!currentUser) return;
// //         setLoading(true);
// //         try {
// //             let statusFilter = activeTab === 'proposal' ? 'proposed,revision' : 'draft,ready,published,archived';
// //             const res = await api(`/api/courses?status=${statusFilter}&search=${searchTerm}&limit=100`);
// //             setCourses(res.courses || []);
// //         } catch (e) { console.error(e); } finally { setLoading(false); }
// //     };

// //     useEffect(() => { fetchCourses(); }, [currentUser, activeTab, searchTerm]);

// //     const handleCreateSuccess = () => {
// //         setIsCreateModalOpen(false);
// //         setActiveTab('proposal'); 
// //         setTimeout(() => { fetchCourses(); }, 500); 
// //     };

// //     // [FIX] Edit Info -> Buka Modal
// //     const handleEditCourse = (course: any) => {
// //         setSelectedCourse(course);
// //         setIsEditModalOpen(true); 
// //     };

// //     const handleApprove = async (course: any) => {
// //         try {
// //             await api(`/api/courses/${course._id}/status`, { method: 'PATCH', body: { status: 'draft' } });
// //             alert("✅ Disetujui! Pindah ke Manajemen Pelatihan.");
// //             setIsDetailModalOpen(false);
// //             fetchCourses();
// //         } catch (e: any) { alert(e.message); }
// //     };

// //     const handleReject = async (course: any) => { try { await api(`/api/courses/${course._id}/status`, { method: 'PATCH', body: { status: 'revision' } }); alert("Dikembalikan."); setIsDetailModalOpen(false); fetchCourses(); } catch (e: any) { alert(e.message); } };
// //     const handleDelete = async (id: string) => { if(!confirm("Hapus?")) return; try { await api(`/api/courses/${id}`, { method: 'DELETE' }); fetchCourses(); } catch (e: any) { alert(e.message); } };
// //     const handlePublishToggle = async (course: any) => { try { await api(`/api/courses/${course._id}/toggle-publish`, { method: 'PATCH' }); fetchCourses(); } catch (e: any) { alert(e.message); } };

// //     if (!currentUser) return null; 

// //     return (
// //         <div className="p-6 min-h-screen bg-gray-50 pb-20">
// //             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
// //                 <div><h1 className="text-2xl font-bold text-gray-900">{activeTab === 'proposal' ? 'Pusat Pelatihan (Pengajuan)' : 'Manajemen Pelatihan'}</h1><p className="text-gray-500 text-sm">Kelola pengajuan dan kurikulum pelatihan.</p></div>
// //                 <button onClick={() => setIsCreateModalOpen(true)} className="bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg"><Plus size={18} strokeWidth={3}/> Buat Pengajuan Baru</button>
// //             </div>

// //             <div className="flex gap-2 mb-6 bg-white p-1 rounded-xl border border-gray-200 w-fit shadow-sm">
// //                 <button onClick={() => setActiveTab('proposal')} className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${activeTab === 'proposal' ? 'bg-red-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}><FileText size={16}/> Pengajuan Masuk</button>
// //                 <button onClick={() => setActiveTab('management')} className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${activeTab === 'management' ? 'bg-red-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}><BookOpen size={16}/> Manajemen Pelatihan</button>
// //             </div>

// //             <div className="mb-6 relative"><div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Search size={18}/></div><input className="w-full p-4 pl-12 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 shadow-sm text-sm" placeholder="Cari..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/></div>

// //             <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
// //                 {loading ? <div className="flex flex-col items-center justify-center h-64 text-gray-400"><Loader2 size={32} className="animate-spin mb-2"/><span className="text-xs font-medium">Memuat data...</span></div> : (
// //                     <>
// //                         {activeTab === 'proposal' && <ProposalTable courses={courses} onApprove={handleApprove} onReject={handleReject} onViewDetail={(c)=>{setSelectedCourse(c); setIsDetailModalOpen(true)}} currentUser={currentUser} />}
// //                         {activeTab === 'management' && <ManagementTable 
// //                             courses={courses} 
// //                             onEdit={handleEditCourse} // [FIX] Open Modal
// //                             onDelete={handleDelete} 
// //                             onPublish={handlePublishToggle} 
// //                             onBroadcast={() => {}} 
// //                             onViewHistory={(c)=>{setSelectedCourse(c); setIsDetailModalOpen(true)}} 
// //                             currentUser={currentUser} 
// //                         />}
// //                     </>
// //                 )}
// //             </div>

// //             {isCreateModalOpen && <CourseProposalModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSuccess={handleCreateSuccess} currentUser={currentUser} />}
// //             {isDetailModalOpen && selectedCourse && <CourseProposalDetailModal course={selectedCourse} onClose={() => {setIsDetailModalOpen(false); setSelectedCourse(null)}} onApprove={handleApprove} onReject={handleReject} currentUser={currentUser} refreshData={fetchCourses} isReadOnly={activeTab === 'management'} />}
            
// //             {/* [FIX] Edit Modal */}
// //             {isEditModalOpen && selectedCourse && (
// //                 <CourseFormModal 
// //                     course={selectedCourse} 
// //                     currentUser={currentUser} 
// //                     facilitators={[]} 
// //                     onClose={() => {setIsEditModalOpen(false); setSelectedCourse(null)}} 
// //                     onSuccess={() => {setIsEditModalOpen(false); fetchCourses()}} 
// //                 />
// //             )}
// //         </div>
// //     );
// // }



// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Plus, Search, FileText, BookOpen, Loader2 } from 'lucide-react';
// import { api } from '@/lib/api';

// // COMPONENTS
// import ManagementTable from '@/components/admin/courses/ManagementTable';
// import ProposalTable from '@/components/admin/courses/ProposalTable';
// import CourseProposalModal from '@/components/admin/courses/CourseProposalModal';
// import CourseProposalDetailModal from '@/components/admin/courses/CourseProposalDetailModal';

// export default function AdminCoursesPage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
    
//     // --- STATE UTAMA ---
//     const [currentUser, setCurrentUser] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const [courses, setCourses] = useState<any[]>([]);
    
//     // --- STATE TABS & FILTER ---
//     // 'proposal' = Pengajuan Masuk | 'management' = Manajemen Pelatihan
//     const [activeTab, setActiveTab] = useState<'proposal' | 'management'>('management');
//     const [searchTerm, setSearchTerm] = useState('');

//     // --- STATE MODAL ---
//     const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//     const [selectedCourse, setSelectedCourse] = useState<any>(null); // Untuk detail/edit
//     const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

//     // 1. LOAD USER SAAT MOUNT
//     useEffect(() => {
//         const userStr = localStorage.getItem('user');
//         if (userStr) {
//             const userObj = JSON.parse(userStr);
//             setCurrentUser(userObj);
//             // Default tab: Jika Fasilitator -> Proposal, Jika Admin -> Management (Opsional)
//             if (userObj.role === 'FACILITATOR') {
//                 setActiveTab('proposal');
//             }
//         } else {
//             router.push('/auth/login');
//         }
//     }, [router]);

//     // 2. FETCH DATA KURSUS
//     const fetchCourses = async () => {
//         if (!currentUser) return;
//         setLoading(true);
//         try {
//             // Tentukan status apa yang mau diambil berdasarkan Tab
//             let statusFilter = '';
//             if (activeTab === 'proposal') {
//                 statusFilter = 'proposed,revision';
//             } else {
//                 statusFilter = 'draft,ready,published,archived';
//             }

//             // Panggil API
//             const res = await api(`/api/courses?status=${statusFilter}&search=${searchTerm}&limit=100`);
//             setCourses(res.courses || []);
//         } catch (e) {
//             console.error(e);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Reload saat tab/search/user berubah
//     useEffect(() => {
//         fetchCourses();
//     }, [currentUser, activeTab, searchTerm]);

//     // --- HANDLERS ---

//     // [FIX] Handler saat sukses buat proposal baru
//     const handleCreateSuccess = () => {
//         setIsCreateModalOpen(false);
        
//         // 1. PINDAHKAN KE TAB 'PENGAJUAN MASUK' (Agar user melihat datanya)
//         setActiveTab('proposal'); 
        
//         // 2. Refresh data
//         setTimeout(() => {
//             fetchCourses();
//             // Alert opsional (jika di Modal sudah ada notif sukses, ini bisa dihapus)
//             // alert("Data berhasil diperbarui di tab Pengajuan Masuk."); 
//         }, 500); 
//     };

//     const handleViewDetail = (course: any) => {
//         setSelectedCourse(course);
//         setIsDetailModalOpen(true);
//     };

//     const handleApprove = async (course: any) => {
//         try {
//             await api(`/api/courses/${course._id}/status`, { 
//                 method: 'PATCH', 
//                 body: { status: 'draft' } // Setelah diapprove, jadi draft (masuk manajemen)
//             });
//             alert("✅ Usulan disetujui! Pindah ke Manajemen Pelatihan.");
//             setIsDetailModalOpen(false);
//             fetchCourses();
//         } catch (e: any) { alert("Gagal approve: " + e.message); }
//     };

//     const handleReject = async (course: any) => {
//         try {
//             await api(`/api/courses/${course._id}/status`, { 
//                 method: 'PATCH', 
//                 body: { status: 'revision' } 
//             });
//             alert("⚠️ Usulan dikembalikan untuk revisi.");
//             setIsDetailModalOpen(false);
//             fetchCourses();
//         } catch (e: any) { alert("Gagal reject: " + e.message); }
//     };

//     const handleDelete = async (id: string) => {
//         if(!confirm("Hapus permanen pelatihan ini?")) return;
//         try {
//             await api(`/api/courses/${id}`, { method: 'DELETE' });
//             fetchCourses();
//         } catch (e: any) { alert("Gagal hapus: " + e.message); }
//     };

//     const handlePublishToggle = async (course: any) => {
//         try {
//             await api(`/api/courses/${course._id}/toggle-publish`, { method: 'PATCH' });
//             fetchCourses();
//         } catch (e: any) { alert("Gagal ubah status: " + e.message); }
//     };

//     if (!currentUser) return null; 

//     return (
//         <div className="p-6 min-h-screen bg-gray-50 pb-20">
            
//             {/* HEADER */}
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//                 <div>
//                     {activeTab === 'proposal' ? (
//                         <>
//                             <h1 className="text-2xl font-bold text-gray-900">Pusat Pelatihan (Pengajuan)</h1>
//                             <p className="text-gray-500 text-sm">Monitor status usulan pelatihan Anda.</p>
//                         </>
//                     ) : (
//                         <>
//                             <h1 className="text-2xl font-bold text-gray-900">Manajemen Pelatihan</h1>
//                             <p className="text-gray-500 text-sm">Edit konten, modul, dan publikasi pelatihan.</p>
//                         </>
//                     )}
//                 </div>
                
//                 <button 
//                     onClick={() => setIsCreateModalOpen(true)}
//                     className="bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
//                 >
//                     <Plus size={18} strokeWidth={3}/> Buat Pengajuan Baru
//                 </button>
//             </div>

//             {/* TABS NAVIGATION */}
//             <div className="flex gap-2 mb-6 bg-white p-1 rounded-xl border border-gray-200 w-fit shadow-sm">
//                 <button 
//                     onClick={() => setActiveTab('proposal')}
//                     className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'proposal' ? 'bg-red-700 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
//                 >
//                     <FileText size={16}/> Pengajuan Masuk
//                 </button>
//                 <button 
//                     onClick={() => setActiveTab('management')}
//                     className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'management' ? 'bg-red-700 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
//                 >
//                     <BookOpen size={16}/> Manajemen Pelatihan
//                 </button>
//             </div>

//             {/* SEARCH BAR */}
//             <div className="mb-6 relative">
//                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//                     <Search size={18}/>
//                 </div>
//                 <input 
//                     className="w-full p-4 pl-12 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 shadow-sm text-sm"
//                     placeholder="Cari pengajuan..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </div>

//             {/* CONTENT TABLE */}
//             <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
//                 {loading ? (
//                     <div className="flex flex-col items-center justify-center h-64 text-gray-400">
//                         <Loader2 size={32} className="animate-spin mb-2"/>
//                         <span className="text-xs font-medium">Memuat data...</span>
//                     </div>
//                 ) : (
//                     <>
//                         {activeTab === 'proposal' && (
//                             <ProposalTable 
//                                 courses={courses}
//                                 onApprove={handleApprove}
//                                 onReject={handleReject}
//                                 onViewDetail={handleViewDetail}
//                                 currentUser={currentUser}
//                             />
//                         )}

//                         {activeTab === 'management' && (
//                             <ManagementTable 
//                                 courses={courses}
//                                 onEdit={(course) => router.push(`/admin/courses/${course._id}/edit`)}
//                                 onDelete={handleDelete}
//                                 onPublish={handlePublishToggle}
//                                 onBroadcast={() => {}}
//                                 onViewHistory={handleViewDetail}
//                                 currentUser={currentUser}
//                             />
//                         )}
//                     </>
//                 )}
//             </div>

//             {/* MODAL 1: CREATE NEW PROPOSAL */}
//             {isCreateModalOpen && currentUser && (
//                 <CourseProposalModal 
//                     isOpen={isCreateModalOpen}
//                     onClose={() => setIsCreateModalOpen(false)}
//                     onSuccess={handleCreateSuccess}
//                     currentUser={currentUser}
//                 />
//             )}

//             {/* MODAL 2: DETAIL & REVIEW */}
//             {isDetailModalOpen && selectedCourse && (
//                 <CourseProposalDetailModal 
//                     course={selectedCourse}
//                     onClose={() => { setIsDetailModalOpen(false); setSelectedCourse(null); }}
//                     onApprove={handleApprove}
//                     onReject={handleReject}
//                     currentUser={currentUser}
//                     refreshData={fetchCourses}
//                     isReadOnly={activeTab === 'management'} 
//                 />
//             )}
//         </div>
//     );
// }



'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plus, Search, FileText, BookOpen, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

// COMPONENTS
import ManagementTable from '@/components/admin/courses/ManagementTable';
import ProposalTable from '@/components/admin/courses/ProposalTable';
import CourseProposalModal from '@/components/admin/courses/CourseProposalModal';
import CourseProposalDetailModal from '@/components/admin/courses/CourseProposalDetailModal';
// [PENTING] Import Modal Form Lengkap yang Anda berikan
import CourseFormModal from '@/components/admin/courses/CourseFormModal'; 

export default function AdminCoursesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // --- STATE UTAMA ---
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<any[]>([]);
    
    // [PENTING] Data Fasilitator untuk Dropdown di CourseFormModal
    const [facilitators, setFacilitators] = useState<any[]>([]); 
    
    // --- STATE TABS & FILTER ---
    const [activeTab, setActiveTab] = useState<'proposal' | 'management'>('management');
    const [searchTerm, setSearchTerm] = useState('');

    // --- STATE MODAL ---
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Modal Proposal Awal (Sederhana)
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);     // [BARU] Modal Edit Info Lengkap
    
    const [selectedCourse, setSelectedCourse] = useState<any>(null); // Untuk Detail / Edit
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Modal Review Proposal

    // 1. LOAD USER & FASILITATOR
    useEffect(() => {
        const init = async () => {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const userObj = JSON.parse(userStr);
                setCurrentUser(userObj);
                
                // Jika Fasilitator login, default ke tab proposal agar lihat statusnya
                if (userObj.role === 'FACILITATOR') {
                    setActiveTab('proposal');
                }

                // Load list semua user (untuk keperluan dropdown facilitator/PIC di Form Modal)
                try {
                    const res = await api('/api/admin/users');
                    if(res.users) {
                        // Filter user yang relevan (Admin/Fasilitator)
                        setFacilitators(res.users.filter((u:any) => u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN' || u.role === 'ADMIN'));
                    }
                } catch (e) { console.error("Gagal load users", e); }

            } else {
                router.push('/auth/login');
            }
        };
        init();
    }, [router]);

    // 2. FETCH DATA KURSUS
    const fetchCourses = async () => {
        if (!currentUser) return;
        setLoading(true);
        try {
            let statusFilter = '';
            if (activeTab === 'proposal') {
                statusFilter = 'proposed,revision';
            } else {
                // Management tab menampilkan Draft (sedang diedit), Ready, Published
                statusFilter = 'draft,ready,published,archived';
            }

            const res = await api(`/api/courses?status=${statusFilter}&search=${searchTerm}&limit=100`);
            setCourses(res.courses || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [currentUser, activeTab, searchTerm]);

    // --- HANDLERS ---

    const handleCreateSuccess = () => {
        setIsCreateModalOpen(false);
        setActiveTab('proposal'); 
        setTimeout(() => fetchCourses(), 500); 
    };

    // [BARU] Handler saat Form Modal (Edit Info) sukses disimpan
    const handleEditSuccess = () => {
        setIsFormModalOpen(false);
        setSelectedCourse(null);
        fetchCourses(); // Refresh tabel
    };

    const handleViewDetail = (course: any) => {
        setSelectedCourse(course);
        setIsDetailModalOpen(true);
    };

    // [FIX 404] Tombol Edit di Management Table sekarang membuka Modal, BUKAN redirect
    const handleEditInfo = (course: any) => {
        setSelectedCourse(course);
        setIsFormModalOpen(true); // Buka CourseFormModal
    };

    const handleApprove = async (course: any) => {
        try {
            await api(`/api/courses/${course._id}/status`, { 
                method: 'PATCH', 
                body: { status: 'draft' } 
            });
            alert("✅ Usulan disetujui! Pindah ke Manajemen Pelatihan.");
            setIsDetailModalOpen(false);
            fetchCourses();
        } catch (e: any) { alert("Gagal approve: " + e.message); }
    };

    const handleReject = async (course: any) => {
        try {
            await api(`/api/courses/${course._id}/status`, { 
                method: 'PATCH', 
                body: { status: 'revision' } 
            });
            alert("⚠️ Usulan dikembalikan untuk revisi.");
            setIsDetailModalOpen(false);
            fetchCourses();
        } catch (e: any) { alert("Gagal reject: " + e.message); }
    };

    const handleDelete = async (id: string) => {
        if(!confirm("Hapus permanen pelatihan ini?")) return;
        try {
            await api(`/api/courses/${id}`, { method: 'DELETE' });
            fetchCourses();
        } catch (e: any) { alert("Gagal hapus: " + e.message); }
    };

    const handlePublishToggle = async (course: any) => {
        try {
            await api(`/api/courses/${course._id}/toggle-publish`, { method: 'PATCH' });
            fetchCourses();
        } catch (e: any) { alert("Gagal ubah status: " + e.message); }
    };

    if (!currentUser) return null; 

    return (
        <div className="p-6 min-h-screen bg-gray-50 pb-20">
            
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    {activeTab === 'proposal' ? (
                        <>
                            <h1 className="text-2xl font-bold text-gray-900">Pusat Pelatihan (Pengajuan)</h1>
                            <p className="text-gray-500 text-sm">Monitor status usulan pelatihan Anda.</p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold text-gray-900">Manajemen Pelatihan</h1>
                            <p className="text-gray-500 text-sm">Edit konten, modul, dan publikasi pelatihan.</p>
                        </>
                    )}
                </div>
                
                {/* Tombol Buat Baru (Proposal Awal) */}
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
                >
                    <Plus size={18} strokeWidth={3}/> Buat Pengajuan Baru
                </button>
            </div>

            {/* TABS */}
            <div className="flex gap-2 mb-6 bg-white p-1 rounded-xl border border-gray-200 w-fit shadow-sm">
                <button onClick={() => setActiveTab('proposal')} className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'proposal' ? 'bg-red-700 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <FileText size={16}/> Pengajuan Masuk
                </button>
                <button onClick={() => setActiveTab('management')} className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'management' ? 'bg-red-700 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <BookOpen size={16}/> Manajemen Pelatihan
                </button>
            </div>

            {/* SEARCH */}
            <div className="mb-6 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Search size={18}/></div>
                <input className="w-full p-4 pl-12 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 shadow-sm text-sm" placeholder="Cari pelatihan..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>

            {/* CONTENT TABLE */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <Loader2 size={32} className="animate-spin mb-2"/>
                        <span className="text-xs font-medium">Memuat data...</span>
                    </div>
                ) : (
                    <>
                        {/* TAB 1: PROPOSAL (Workflow Awal) */}
                        {activeTab === 'proposal' && (
                            <ProposalTable 
                                courses={courses}
                                onApprove={handleApprove}
                                onReject={handleReject}
                                onViewDetail={handleViewDetail}
                                currentUser={currentUser}
                            />
                        )}

                        {/* TAB 2: MANAGEMENT (Workflow Lanjutan) */}
                        {activeTab === 'management' && (
                            <ManagementTable 
                                courses={courses}
                                // [FIX LOGIC] onEdit membuka Modal Form, bukan redirect 404
                                onEdit={handleEditInfo} 
                                onDelete={handleDelete}
                                onPublish={handlePublishToggle}
                                onBroadcast={() => {}}
                                // Klik Detail di sini (Mata/Judul) tetap ke Builder Materi
                                onViewHistory={(course) => router.push(`/admin/courses/${course._id}`)}
                                currentUser={currentUser}
                            />
                        )}
                    </>
                )}
            </div>

            {/* --- MODAL SECTION --- */}

            {/* 1. Modal Proposal Awal */}
            {isCreateModalOpen && currentUser && (
                <CourseProposalModal 
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSuccess={handleCreateSuccess}
                    currentUser={currentUser}
                />
            )}

            {/* 2. Modal Review Detail (Untuk Admin Approve/Reject) */}
            {isDetailModalOpen && selectedCourse && (
                <CourseProposalDetailModal 
                    course={selectedCourse}
                    onClose={() => { setIsDetailModalOpen(false); setSelectedCourse(null); }}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    currentUser={currentUser}
                    refreshData={fetchCourses}
                    isReadOnly={activeTab === 'management'} 
                />
            )}

            {/* 3. [FIX] Modal Edit Informasi Lengkap (Pengganti Halaman 404) */}
            {isFormModalOpen && selectedCourse && (
                <CourseFormModal 
                    course={selectedCourse}
                    onClose={() => { setIsFormModalOpen(false); setSelectedCourse(null); }}
                    onSuccess={handleEditSuccess}
                    facilitators={facilitators}
                    currentUser={currentUser}
                />
            )}
        </div>
    );
}
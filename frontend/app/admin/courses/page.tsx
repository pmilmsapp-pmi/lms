// 'use client';

// import { useState, useEffect } from 'react';
// import { api } from '@/lib/api';
// import Protected from '@/components/Protected';
// import { useAuth } from '@/lib/AuthProvider'; 
// import { 
//     Plus, Search, BookOpen, FileText, Loader2, ChevronLeft, ChevronRight, RefreshCw
// } from 'lucide-react';

// // Import Komponen
// import CourseFormModal from '@/components/admin/courses/CourseFormModal';
// import CourseProposalModal from '@/components/admin/courses/CourseProposalModal'; 
// import ProposalTable from '@/components/admin/courses/ProposalTable'; 
// import ManagementTable from '@/components/admin/courses/ManagementTable'; 
// import CourseProposalDetailModal from '@/components/admin/courses/CourseProposalDetailModal';

// export default function AdminCoursesPage() {
//   const { user } = useAuth(); 
//   const [courses, setCourses] = useState<any[]>([]);
//   const [facilitators, setFacilitators] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
  
//   const [activeMainTab, setActiveMainTab] = useState<'proposal' | 'management'>('proposal');

//   const [isProposalOpen, setIsProposalOpen] = useState(false); 
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
//   const [isReadOnlyModal, setIsReadOnlyModal] = useState(false);
//   const [editingCourse, setEditingCourse] = useState<any>(null);

//   // Helper Permission Check
//   const hasPermission = (perm: string) => {
//       if (!user) return false;
//       if (user.role === 'SUPER_ADMIN') return true;
//       return user.permissions?.includes(perm);
//   };

//   const canCreate = user?.role === 'FACILITATOR' || hasPermission('manage_courses');
//   const canVerify = hasPermission('verify_enrollments');
//   const canPublish = hasPermission('publish_courses');

//   useEffect(() => { fetchCourses(); fetchFacilitators(); }, [page, search, activeMainTab]);

//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//         const limit = '50'; 
//         const query = new URLSearchParams({ page: page.toString(), limit: limit, search, sort: '-createdAt' });
//         const res = await api(`/api/courses?${query}`);
//         let allData = res.courses || [];
//         let filteredData = [];
        
//         if (activeMainTab === 'proposal') {
//             filteredData = allData.filter((c:any) => c.status === 'proposed' || c.status === 'revision');
//         } else {
//             filteredData = allData.filter((c:any) => c.status !== 'proposed' && c.status !== 'revision');
//         }
//         setCourses(filteredData);
//         setTotalPages(res.totalPages || 1); 
//     } catch (error) { console.error("Gagal load courses", error); } finally { setLoading(false); }
//   };

//   const fetchFacilitators = async () => {
//       try {
//           const res = await api('/api/users/facilitators').catch(() => null); 
//           if (res?.users) setFacilitators(res.users);
//       } catch (e) { console.error("Gagal load facilitators", e); }
//   };

//   const handleDelete = async (id: string) => {
//       if(!hasPermission('manage_courses') && user?.role !== 'FACILITATOR') return alert("Akses Ditolak");
//       if(!confirm("Yakin ingin menghapus data ini secara permanen?")) return;
//       try { await api(`/api/courses/${id}`, { method: 'DELETE' }); fetchCourses(); } catch (e: any) { alert(e.message); }
//   };
  
//   const handleApprove = async (course: any) => {
//       if(!canVerify) return alert("Anda tidak memiliki izin verifikasi.");
//       if(!confirm(`Setujui pengajuan "${course.title}"?`)) return;
//       try { 
//           await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { status: 'draft' } }); 
//           alert("✅ Disetujui! Data dipindahkan ke tab Manajemen Pelatihan."); 
//           setIsDetailModalOpen(false); 
//           fetchCourses(); 
//       } catch (e: any) { alert(e.message); }
//   };

//   const handleReturn = async (course: any) => {
//       if(!canVerify) return alert("Anda tidak memiliki izin verifikasi.");
//       const note = prompt("Masukkan catatan perbaikan untuk pengaju:");
//       if (note === null) return; 
//       try {
//           const newDesc = course.description + `<br/><br/><div style="background:#fff3cd;padding:10px;border:1px solid #ffeeba;"><strong>⚠️ Catatan Admin:</strong> ${note}</div>`;
//           await api(`/api/courses/${course._id}`, { 
//               method: 'PATCH', 
//               body: { status: 'revision', description: newDesc } 
//           });
//           alert("↩️ Pengajuan dikembalikan ke user untuk revisi.");
//           setIsDetailModalOpen(false);
//           fetchCourses();
//       } catch (e: any) { alert(e.message); }
//   };

//   const handlePublish = async (course: any) => {
//       if(!canPublish && user?.role !== 'SUPER_ADMIN' && course.status !== 'ready') {
//           return alert("Anda belum bisa mempublish kursus ini. Tunggu persetujuan konten dari Admin.");
//       }
      
//       const isCurrentlyActive = course.isPublished === true || course.status === 'published';
//       const newStatusString = !isCurrentlyActive ? 'published' : 'draft';
      
//       if(!confirm(`Ubah status publikasi menjadi ${!isCurrentlyActive ? 'TERBIT' : 'DRAFT'}?`)) return;
//       try { 
//           await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { isPublished: !isCurrentlyActive, status: newStatusString } }); 
//           fetchCourses(); 
//       } catch (e: any) { alert(e.message); }
//   };

//   const handleRemindAdmin = async (course: any) => {
//       alert(`🔔 Notifikasi terkirim! Admin telah diingatkan untuk me-review "${course.title}".`);
//   };

//   const handleBroadcast = (course: any) => {
//       const msg = prompt(`Kirim Broadcast untuk "${course.title}"?`);
//       if (msg) alert(`Broadcast terkirim: ${msg}`);
//   };

//   const openDetailProposal = (course: any) => {
//       setEditingCourse(course);
//       setIsReadOnlyModal(false);
//       setIsDetailModalOpen(true);
//   };

//   const openHistory = (course: any) => {
//       setEditingCourse(course);
//       setIsReadOnlyModal(true);
//       setIsDetailModalOpen(true);
//   };

//   return (
//     <Protected roles={['SUPER_ADMIN', 'ADMIN', 'FACILITATOR']}>
//       <div className="p-6 md:p-8 min-h-screen bg-gray-50">
        
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//             <div>
//                 <div className="flex items-center gap-3">
//                     <h1 className="text-2xl font-bold text-gray-900">Pusat Pelatihan</h1>
//                     <button 
//                         onClick={fetchCourses} 
//                         className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
//                         title="Refresh Data"
//                         aria-label="Refresh Data"
//                     >
//                         <RefreshCw size={16} className={loading ? "animate-spin" : ""}/>
//                     </button>
//                 </div>
//                 <p className="text-gray-500 text-sm mt-1">Kelola pengajuan dan kurikulum pelatihan.</p>
//             </div>
            
//             {canCreate && (
//                 <button onClick={() => setIsProposalOpen(true)} className="bg-[#990000] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#7f0000]">
//                     <Plus size={18}/> Buat Pengajuan Baru
//                 </button>
//             )}
//         </div>

//         <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 mb-6 w-fit">
//             <button onClick={() => { setActiveMainTab('proposal'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${activeMainTab === 'proposal' ? 'bg-[#990000] text-white' : 'text-gray-500'}`}><FileText size={16}/> Pengajuan Masuk</button>
//             <button onClick={() => { setActiveMainTab('management'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${activeMainTab === 'management' ? 'bg-[#990000] text-white' : 'text-gray-500'}`}><BookOpen size={16}/> Manajemen Pelatihan</button>
//         </div>

//         <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
//             <div className="relative w-full">
//                 <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
//                 <input type="text" placeholder={activeMainTab === 'proposal' ? "Cari pengajuan..." : "Cari pelatihan aktif..."} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 outline-none text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
//             </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
//             {loading ? <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-gray-400"/></div> : (
//                 <>
//                     {activeMainTab === 'proposal' ? (
//                         <ProposalTable 
//                             courses={courses} 
//                             onApprove={handleApprove} 
//                             onReject={handleReturn} 
//                             onViewDetail={openDetailProposal}
//                             currentUser={user}
//                             onRemind={handleRemindAdmin}
//                         />
//                     ) : (
//                         <ManagementTable 
//                             courses={courses} 
//                             onEdit={(c) => { setEditingCourse(c); setIsEditModalOpen(true); }} 
//                             onDelete={handleDelete} 
//                             onPublish={handlePublish} 
//                             onBroadcast={handleBroadcast} 
//                             onViewHistory={openHistory}
//                             currentUser={user} 
//                         />
//                     )}
//                 </>
//             )}
//             <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
//                 <button 
//                     disabled={page === 1} 
//                     onClick={() => setPage(p => p - 1)} 
//                     className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200"
//                     title="Halaman Sebelumnya"
//                 >
//                     <ChevronLeft size={16}/>
//                 </button>
//                 <span className="text-xs font-bold text-gray-500">Halaman {page} dari {totalPages}</span>
//                 <button 
//                     disabled={page === totalPages} 
//                     onClick={() => setPage(p => p + 1)} 
//                     className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200"
//                     title="Halaman Selanjutnya"
//                 >
//                     <ChevronRight size={16}/>
//                 </button>
//             </div>
//         </div>
// {/* --- MODAL 1: PROPOSAL BARU --- */}
//         {isProposalOpen && (
//             <CourseProposalModal 
//                 currentUser={user}
//                 onClose={() => setIsProposalOpen(false)} 
//                 onSuccess={() => { 
//                     setIsProposalOpen(false); 
//                     fetchCourses(); // Refresh data tabel setelah simpan
//                 }} 
//             />
//         )}

//         {/* --- MODAL 2: EDIT PELATIHAN --- */}
//         {isEditModalOpen && (
//             <CourseFormModal 
//                 course={editingCourse} 
//                 currentUser={user}
//                 facilitators={facilitators || []} // [SAFETY] Mencegah error jika data kosong
//                 onClose={() => setIsEditModalOpen(false)} 
//                 onSuccess={() => { 
//                     setIsEditModalOpen(false); 
//                     fetchCourses(); 
//                 }} 
//             />
//         )}
//         {isDetailModalOpen && (
//             <CourseProposalDetailModal 
//                 course={editingCourse} 
//                 onClose={() => setIsDetailModalOpen(false)} 
//                 onApprove={handleApprove} 
//                 onReject={handleReturn} 
//                 currentUser={user} 
//                 refreshData={fetchCourses}
//                 isReadOnly={isReadOnlyModal}
//             />
//         )}
//       </div>
//     </Protected>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
// [FIX 1] Kembalikan path sesuai struktur folder Anda yang asli
import Protected from '@/components/Protected'; 
import { useAuth } from '@/lib/AuthProvider'; 
import { 
    Plus, Search, BookOpen, FileText, Loader2, ChevronLeft, ChevronRight, RefreshCw
} from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

// Import Komponen
import CourseFormModal from '@/components/admin/courses/CourseFormModal';
import CourseProposalModal from '@/components/admin/courses/CourseProposalModal'; 
import ProposalTable from '@/components/admin/courses/ProposalTable'; 
import ManagementTable from '@/components/admin/courses/ManagementTable'; 
import CourseProposalDetailModal from '@/components/admin/courses/CourseProposalDetailModal';

export default function AdminCoursesPage() {
  const { user } = useAuth(); 
  const [courses, setCourses] = useState<any[]>([]);
  const [facilitators, setFacilitators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [activeMainTab, setActiveMainTab] = useState<'proposal' | 'management'>('proposal');

  const [isProposalOpen, setIsProposalOpen] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReadOnlyModal, setIsReadOnlyModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const highlightId = searchParams.get('highlight');

  // Helper Permission Check
  const hasPermission = (perm: string) => {
      if (!user) return false;
      if (user.role === 'SUPER_ADMIN') return true;
      return user.permissions?.includes(perm);
  };

  const canCreate = user?.role === 'FACILITATOR' || hasPermission('manage_courses');
  const canVerify = hasPermission('verify_enrollments');
  const canPublish = hasPermission('publish_courses');

  useEffect(() => { fetchCourses(); fetchFacilitators(); }, [page, search, activeMainTab]);

  // Auto Open Modal jika ada highlightId (dari Notifikasi)
  useEffect(() => {
      if (highlightId && courses.length > 0) {
          const courseToOpen = courses.find((c: any) => c._id === highlightId);
          if (courseToOpen) {
              setEditingCourse(courseToOpen);
              
              if (courseToOpen.status === 'published' || courseToOpen.status === 'ready') {
                  setActiveMainTab('management');
                  setIsReadOnlyModal(true);
                  setIsDetailModalOpen(true);
              } else {
                  setActiveMainTab('proposal');
                  setIsReadOnlyModal(false);
                  setIsDetailModalOpen(true);
              }
          }
      }
  }, [highlightId, courses]);

  const handleCloseDetail = () => {
      setIsDetailModalOpen(false);
      setEditingCourse(null);
      if (highlightId) router.replace('/admin/courses');
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
        const limit = '50'; 
        const query = new URLSearchParams({ page: page.toString(), limit: limit, search, sort: '-createdAt' });
        const res = await api(`/api/courses?${query}`);
        let allData = res.courses || [];
        let filteredData = [];
        
        if (activeMainTab === 'proposal') {
            filteredData = allData.filter((c:any) => c.status === 'proposed' || c.status === 'revision' || c.status === 'draft');
        } else {
            filteredData = allData.filter((c:any) => c.status !== 'proposed' && c.status !== 'revision' && c.status !== 'draft');
        }
        setCourses(filteredData);
        setTotalPages(res.totalPages || 1); 
    } catch (error) { console.error("Gagal load courses", error); } finally { setLoading(false); }
  };

  const fetchFacilitators = async () => {
      try {
          const res = await api('/api/users/facilitators').catch(() => null); 
          if (res?.users) setFacilitators(res.users);
      } catch (e) { console.error("Gagal load facilitators", e); }
  };

  const handleDelete = async (id: string) => {
      if(!hasPermission('manage_courses') && user?.role !== 'FACILITATOR') return alert("Akses Ditolak");
      if(!confirm("Yakin ingin menghapus data ini secara permanen?")) return;
      try { await api(`/api/courses/${id}`, { method: 'DELETE' }); fetchCourses(); } catch (e: any) { alert(e.message); }
  };
  
  const handleApprove = async (course: any) => {
      if(!canVerify) return alert("Anda tidak memiliki izin verifikasi.");
      
      try { 
          await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { status: 'ready' } }); 
          
          if (course.creatorInfo?._id || course.creatorInfo?.id) {
              await api('/api/notifications', {
                  method: 'POST',
                  body: {
                      recipient: course.creatorInfo._id || course.creatorInfo.id,
                      type: 'system',
                      message: `🎉 Pengajuan "${course.title}" telah DISETUJUI oleh Admin.`,
                      targetUrl: `/courses/my-proposals`, 
                      topic: course._id
                  }
              });
          }

          alert("✅ Disetujui! Data dipindahkan ke tab Manajemen Pelatihan."); 
          setIsDetailModalOpen(false); 
          if (highlightId) router.replace('/admin/courses');
          fetchCourses(); 
      } catch (e: any) { alert(e.message); }
  };

  const handleReturn = async (course: any) => {
      if(!canVerify) return alert("Anda tidak memiliki izin verifikasi.");
      if(!confirm("Kembalikan status ke REVISI?")) return;

      try {
          await api(`/api/courses/${course._id}`, { 
              method: 'PATCH', 
              body: { status: 'revision' } 
          });
          alert("↩️ Pengajuan dikembalikan ke user untuk revisi.");
          setIsDetailModalOpen(false);
          if (highlightId) router.replace('/admin/courses');
          fetchCourses();
      } catch (e: any) { alert(e.message); }
  };

  const handlePublish = async (course: any) => {
      if(!canPublish && user?.role !== 'SUPER_ADMIN' && course.status !== 'ready') {
          return alert("Anda belum bisa mempublish kursus ini. Tunggu persetujuan konten dari Admin.");
      }
      
      const isCurrentlyActive = course.isPublished === true || course.status === 'published';
      const newStatusString = !isCurrentlyActive ? 'published' : 'draft';
      
      if(!confirm(`Ubah status publikasi menjadi ${!isCurrentlyActive ? 'TERBIT' : 'NON-AKTIF'}?`)) return;
      try { 
          await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { isPublished: !isCurrentlyActive, status: newStatusString } }); 
          fetchCourses(); 
      } catch (e: any) { alert(e.message); }
  };

  const handleBroadcast = (course: any) => {
      const msg = prompt(`Kirim Broadcast untuk "${course.title}"?`);
      if (msg) alert(`Broadcast terkirim: ${msg}`);
  };

  const openDetailProposal = (course: any) => {
      setEditingCourse(course);
      setIsReadOnlyModal(false);
      setIsDetailModalOpen(true);
  };

  const openHistory = (course: any) => {
      setEditingCourse(course);
      setIsReadOnlyModal(true);
      setIsDetailModalOpen(true);
  };

  return (
    <Protected roles={['SUPER_ADMIN', 'ADMIN', 'FACILITATOR']}>
      <div className="p-6 md:p-8 min-h-screen bg-gray-50">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-900">Pusat Pelatihan</h1>
                    <button 
                        onClick={fetchCourses} 
                        className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
                        title="Refresh Data"
                        aria-label="Refresh Data"
                    >
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""}/>
                    </button>
                </div>
                <p className="text-gray-500 text-sm mt-1">Kelola pengajuan dan kurikulum pelatihan.</p>
            </div>
            
            {canCreate && (
                <button onClick={() => setIsProposalOpen(true)} className="bg-[#990000] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#7f0000]">
                    <Plus size={18}/> Buat Pengajuan Baru
                </button>
            )}
        </div>

        <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 mb-6 w-fit">
            <button onClick={() => { setActiveMainTab('proposal'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${activeMainTab === 'proposal' ? 'bg-[#990000] text-white' : 'text-gray-500'}`}><FileText size={16}/> Pengajuan Masuk</button>
            <button onClick={() => { setActiveMainTab('management'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${activeMainTab === 'management' ? 'bg-[#990000] text-white' : 'text-gray-500'}`}><BookOpen size={16}/> Manajemen Pelatihan</button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
                <input type="text" placeholder={activeMainTab === 'proposal' ? "Cari pengajuan..." : "Cari pelatihan aktif..."} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 outline-none text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
            {loading ? <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-gray-400"/></div> : (
                <>
                    {activeMainTab === 'proposal' ? (
                        <ProposalTable 
                            courses={courses} 
                            onApprove={handleApprove} 
                            onReject={handleReturn} 
                            onViewDetail={openDetailProposal}
                            currentUser={user}
                            // [FIX 2] HAPUS PROPS onRemind={handleRemindAdmin}
                            // Karena ProposalTable sudah menghandle logikanya sendiri
                        />
                    ) : (
                        <ManagementTable 
                            courses={courses} 
                            onEdit={(c: any) => { setEditingCourse(c); setIsEditModalOpen(true); }} 
                            onDelete={handleDelete} 
                            onPublish={handlePublish} 
                            onBroadcast={handleBroadcast} 
                            onViewHistory={openHistory}
                            currentUser={user} 
                        />
                    )}
                </>
            )}
            <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                <button 
                    disabled={page === 1} 
                    onClick={() => setPage(p => p - 1)} 
                    className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200"
                    title="Halaman Sebelumnya"
                >
                    <ChevronLeft size={16}/>
                </button>
                <span className="text-xs font-bold text-gray-500">Halaman {page} dari {totalPages}</span>
                <button 
                    disabled={page === totalPages} 
                    onClick={() => setPage(p => p + 1)} 
                    className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200"
                    title="Halaman Selanjutnya"
                >
                    <ChevronRight size={16}/>
                </button>
            </div>
        </div>

        {isProposalOpen && (
            <CourseProposalModal 
                currentUser={user}
                onClose={() => setIsProposalOpen(false)} 
                onSuccess={() => { 
                    setIsProposalOpen(false); 
                    fetchCourses(); 
                }} 
            />
        )}

        {isEditModalOpen && (
            <CourseFormModal 
                course={editingCourse} 
                currentUser={user}
                facilitators={facilitators || []} 
                onClose={() => setIsEditModalOpen(false)} 
                onSuccess={() => { 
                    setIsEditModalOpen(false); 
                    fetchCourses(); 
                }} 
            />
        )}
        
        {isDetailModalOpen && (
            <CourseProposalDetailModal 
                course={editingCourse} 
                onClose={handleCloseDetail} 
                onApprove={handleApprove} 
                onReject={handleReturn} 
                currentUser={user} 
                refreshData={fetchCourses}
                isReadOnly={isReadOnlyModal}
            />
        )}
      </div>
    </Protected>
  );
}
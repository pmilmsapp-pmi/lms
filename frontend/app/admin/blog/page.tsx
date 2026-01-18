
// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { api } from '@/lib/api';
// import Protected from '@/components/Protected'; 
// import { 
//     Plus, Search, Edit, Trash2, CheckCircle, XCircle, Clock, Eye, 
//     Settings, DownloadCloud, X, Loader2
// } from 'lucide-react';
// import Swal from 'sweetalert2';

// export default function AdminBlogPage() {
//     const [blogs, setBlogs] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [search, setSearch] = useState('');
//     const [filterStatus, setFilterStatus] = useState('all');
    
//     // State untuk Modal Import
//     const [showImportModal, setShowImportModal] = useState(false);
//     const [importing, setImporting] = useState(false);
//     const [importResults, setImportResults] = useState<any[]>([]);

//     const loadBlogs = async () => {
//         try {
//             setLoading(true);
//             const query = search ? `?search=${search}` : '';
//             const res = await api(`/api/blog/admin${query}`);
//             setBlogs(res);
//         } catch (error) {
//             console.error("Gagal memuat blog:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             loadBlogs();
//         }, 500);
//         return () => clearTimeout(timer);
//     }, [search]);

//     const handleStatusChange = async (id: string, newStatus: string) => {
//         try {
//             await api(`/api/blog/${id}/status`, {
//                 method: 'PATCH',
//                 body: JSON.stringify({ status: newStatus })
//             });
//             setBlogs(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Status Diperbarui',
//                 text: `Blog berhasil diubah menjadi ${newStatus}`,
//                 timer: 1500,
//                 showConfirmButton: false
//             });
//         } catch (error) {
//             Swal.fire('Error', 'Gagal mengubah status', 'error');
//         }
//     };

//     const handleDelete = async (id: string) => {
//         const result = await Swal.fire({
//             title: 'Hapus Cerita?',
//             text: "Data yang dihapus tidak dapat dikembalikan!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             confirmButtonText: 'Ya, Hapus!',
//             cancelButtonText: 'Batal'
//         });

//         if (result.isConfirmed) {
//             try {
//                 await api(`/api/blog/${id}`, { method: 'DELETE' });
//                 setBlogs(prev => prev.filter(b => b._id !== id));
//                 Swal.fire('Terhapus!', 'Cerita relawan telah dihapus.', 'success');
//             } catch (error) {
//                 Swal.fire('Error', 'Gagal menghapus data', 'error');
//             }
//         }
//     };

//     // --- LOGIC IMPORT PMI ---
//     const handleImportPmi = async () => {
//         setImporting(true);
//         setImportResults([]); 
//         try {
//             const res: any = await api('/api/blog/import-pmi', { method: 'POST' });
            
//             if (res.savedCount > 0) {
//                 setImportResults(res.results); 
//                 loadBlogs(); 
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Import Berhasil!',
//                     text: `${res.savedCount} cerita baru berhasil disimpan dari ${res.totalFound} yang ditemukan.`,
//                 });
//             } else {
//                 Swal.fire('Info', 'Tidak ada cerita baru yang ditemukan (mungkin sudah ada di database).', 'info');
//             }
//         } catch (error) {
//             console.error(error);
//             Swal.fire('Gagal', 'Terjadi kesalahan koneksi ke PMI Pusat.', 'error');
//         } finally {
//             setImporting(false);
//         }
//     };

//     const filteredBlogs = blogs.filter(blog => {
//         if (filterStatus === 'all') return true;
//         return blog.status === filterStatus;
//     });

//     return (
//         // [FIX] Role 'ADMIN' dihapus dari sini
//         <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
//             <div className="p-6 bg-gray-50 min-h-screen relative">
                
//                 {/* Header & Tools */}
//                 <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//                     <div>
//                         <h1 className="text-2xl font-bold text-gray-800">Kelola Cerita Relawan</h1>
//                         <p className="text-gray-500 text-sm">Manajemen artikel, berita, dan kisah inspiratif.</p>
//                     </div>
                    
//                     <div className="flex gap-3">
//                         {/* TOMBOL GEAR (IMPORT) */}
//                         <button 
//                             onClick={() => setShowImportModal(true)}
//                             className="bg-white text-gray-600 border border-gray-300 p-2.5 rounded-lg hover:bg-gray-100 transition-all shadow-sm"
//                             title="Import & Pengaturan"
//                             aria-label="Pengaturan Import"
//                         >
//                             <Settings size={20} />
//                         </button>

//                         <Link href="/admin/blog/create" className="bg-[#990000] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-800 transition-colors shadow-md">
//                             <Plus size={18} /> Tulis Cerita Baru
//                         </Link>
//                     </div>
//                 </div>

//                 {/* Filter Bar */}
//                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
//                     <div className="relative w-full md:w-1/3">
//                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                         <input 
//                             type="text" 
//                             placeholder="Cari judul cerita..." 
//                             className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                         />
//                     </div>
//                     <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
//                         {['all', 'approved', 'pending', 'rejected'].map((status) => (
//                             <button
//                                 key={status}
//                                 onClick={() => setFilterStatus(status)}
//                                 className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors whitespace-nowrap ${
//                                     filterStatus === status 
//                                     ? 'bg-red-50 text-[#990000] border border-red-200' 
//                                     : 'bg-gray-50 text-gray-600 border border-transparent hover:bg-gray-100'
//                                 }`}
//                             >
//                                 {status === 'all' ? 'Semua Status' : status}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Main Table */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                     <div className="overflow-x-auto">
//                         <table className="w-full text-left border-collapse">
//                             <thead className="bg-gray-50 border-b border-gray-100">
//                                 <tr>
//                                     <th className="p-4 text-sm font-semibold text-gray-600">Judul & Penulis</th>
//                                     <th className="p-4 text-sm font-semibold text-gray-600">Tanggal</th>
//                                     <th className="p-4 text-sm font-semibold text-gray-600 text-center">Status</th>
//                                     <th className="p-4 text-sm font-semibold text-gray-600 text-right">Aksi</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-50">
//                                 {loading ? (
//                                     <tr><td colSpan={4} className="p-8 text-center text-gray-500">Memuat data...</td></tr>
//                                 ) : filteredBlogs.length === 0 ? (
//                                     <tr><td colSpan={4} className="p-8 text-center text-gray-500">Tidak ada cerita ditemukan.</td></tr>
//                                 ) : (
//                                     filteredBlogs.map((blog) => (
//                                         <tr key={blog._id} className="hover:bg-gray-50 transition-colors group">
//                                             <td className="p-4">
//                                                 <div className="font-bold text-gray-800 mb-1 line-clamp-1">{blog.title}</div>
//                                                 <div className="text-xs text-gray-500 flex items-center gap-1">
//                                                     By: <span className="font-medium text-gray-700">{blog.author?.name || 'Unknown'}</span>
//                                                 </div>
//                                             </td>
//                                             <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
//                                                 {new Date(blog.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
//                                             </td>
//                                             <td className="p-4 text-center">
//                                                 <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
//                                                     blog.status === 'approved' ? 'bg-green-100 text-green-700' :
//                                                     blog.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
//                                                     'bg-red-100 text-red-700'
//                                                 }`}>
//                                                     {blog.status === 'approved' && <CheckCircle size={10}/>}
//                                                     {blog.status === 'pending' && <Clock size={10}/>}
//                                                     {blog.status === 'rejected' && <XCircle size={10}/>}
//                                                     {blog.status}
//                                                 </span>
//                                             </td>
//                                             <td className="p-4">
//                                                 <div className="flex justify-end items-center gap-2">
//                                                     <div className="flex bg-gray-100 rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                                                         {blog.status !== 'approved' && (
//                                                             <button 
//                                                                 onClick={() => handleStatusChange(blog._id, 'approved')}
//                                                                 className="p-1.5 hover:bg-green-200 text-green-600 rounded transition-colors"
//                                                                 title="Setujui"
//                                                                 aria-label="Setujui"
//                                                             >
//                                                                 <CheckCircle size={16}/>
//                                                             </button>
//                                                         )}
//                                                         {blog.status !== 'rejected' && (
//                                                             <button 
//                                                                 onClick={() => handleStatusChange(blog._id, 'rejected')}
//                                                                 className="p-1.5 hover:bg-red-200 text-red-600 rounded transition-colors"
//                                                                 title="Tolak"
//                                                                 aria-label="Tolak"
//                                                             >
//                                                                 <XCircle size={16}/>
//                                                             </button>
//                                                         )}
//                                                     </div>
//                                                     <div className="w-px h-6 bg-gray-200 mx-1"></div>
//                                                     <Link href={`/blog/${blog._id}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" aria-label="Lihat" title="Lihat">
//                                                         <Eye size={18}/>
//                                                     </Link>
//                                                     <Link href={`/admin/blog/edit/${blog._id}`} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg" aria-label="Edit" title="Edit">
//                                                         <Edit size={18}/>
//                                                     </Link>
//                                                     <button onClick={() => handleDelete(blog._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" aria-label="Hapus" title="Hapus">
//                                                         <Trash2 size={18}/>
//                                                     </button>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 {/* === MODAL IMPORT PMI === */}
//                 {showImportModal && (
//                     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
//                         <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[80vh]">
//                             {/* Modal Header */}
//                             <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
//                                 <div className="flex items-center gap-3">
//                                     <div className="bg-red-100 p-2 rounded-full text-[#990000]">
//                                         <DownloadCloud size={24}/>
//                                     </div>
//                                     <div>
//                                         <h3 className="font-bold text-gray-900 text-lg">Import Cerita Relawan</h3>
//                                         <p className="text-xs text-gray-500">Sinkronisasi data dari pmi.or.id</p>
//                                     </div>
//                                 </div>
//                                 <button onClick={() => setShowImportModal(false)} className="text-gray-400 hover:text-gray-600" aria-label="Tutup" title="Tutup">
//                                     <X size={24}/>
//                                 </button>
//                             </div>

//                             {/* Modal Body */}
//                             <div className="p-6 overflow-y-auto flex-1">
//                                 {!importResults.length && !importing && (
//                                     <div className="text-center py-10">
//                                         <p className="text-gray-600 mb-6 max-w-sm mx-auto">
//                                             Fitur ini akan mengambil 5 artikel terbaru dari website PMI Pusat dan menyimpannya sebagai draft (Pending).
//                                         </p>
//                                         <button 
//                                             onClick={handleImportPmi}
//                                             className="bg-[#990000] text-white px-6 py-3 rounded-full font-bold hover:bg-red-800 transition-all shadow-lg flex items-center gap-2 mx-auto"
//                                         >
//                                             Mulai Sinkronisasi
//                                         </button>
//                                     </div>
//                                 )}

//                                 {importing && (
//                                     <div className="text-center py-12">
//                                         <Loader2 className="animate-spin text-[#990000] mx-auto mb-4" size={40}/>
//                                         <p className="text-gray-600 font-medium">Sedang mengambil data...</p>
//                                         <p className="text-xs text-gray-400 mt-1">Mohon tunggu sebentar.</p>
//                                     </div>
//                                 )}

//                                 {/* PREVIEW HASIL IMPORT */}
//                                 {importResults.length > 0 && !importing && (
//                                     <div>
//                                         <div className="flex justify-between items-center mb-4">
//                                             <h4 className="font-bold text-gray-800">Hasil Import ({importResults.length})</h4>
//                                             <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Berhasil Disimpan</span>
//                                         </div>
//                                         <div className="space-y-3">
//                                             {importResults.map((item: any, idx: number) => (
//                                                 <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex gap-4 items-start group hover:border-red-200 transition-colors">
//                                                     <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
//                                                         {item.coverUrl && <img src={item.coverUrl} className="w-full h-full object-cover" alt="Cover"/>}
//                                                     </div>
//                                                     <div className="flex-1 min-w-0">
//                                                         <h5 className="font-bold text-gray-900 text-sm line-clamp-1 mb-1">{item.title}</h5>
//                                                         <div className="flex gap-2">
//                                                             <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bold uppercase">Pending</span>
//                                                         </div>
//                                                     </div>
//                                                     <Link 
//                                                         href={`/admin/blog/edit/${item._id}`}
//                                                         className="self-center bg-white border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#990000] hover:text-white hover:border-[#990000] transition-all flex items-center gap-1"
//                                                     >
//                                                         <Edit size={14}/> Review & Edit
//                                                     </Link>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <div className="mt-6 text-center">
//                                             <button 
//                                                 onClick={() => {
//                                                     setShowImportModal(false);
//                                                     setImportResults([]);
//                                                     setFilterStatus('pending'); 
//                                                 }}
//                                                 className="text-gray-500 hover:text-gray-800 text-sm font-medium underline"
//                                             >
//                                                 Tutup & Lihat di Tabel
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//             </div>
//         </Protected>
//     );
// }
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, getImageUrl } from '@/lib/api'; 
import Protected from '@/components/Protected'; 
import { 
    Plus, Search, Edit, Trash2, CheckCircle, XCircle, Clock, Eye, 
    Settings, DownloadCloud, X, Loader2, MessageCircle, MessageCircleOff
} from 'lucide-react';
import Swal from 'sweetalert2';

export default function AdminBlogPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    
    // Import Modal State
    const [showImportModal, setShowImportModal] = useState(false);
    const [importing, setImporting] = useState(false);
    const [importResults, setImportResults] = useState<any[]>([]);

    const loadBlogs = async () => {
        try {
            setLoading(true);
            const query = search ? `?search=${search}` : '';
            const res = await api(`/api/blog/admin${query}`);
            
            if (Array.isArray(res)) setBlogs(res);
            else if (res.data && Array.isArray(res.data)) setBlogs(res.data);
            else setBlogs([]);

        } catch (error) {
            console.error("Gagal memuat blog:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => loadBlogs(), 500);
        return () => clearTimeout(timer);
    }, [search]);

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            await api(`/api/blog/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus })
            });
            setBlogs(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
            Swal.fire({
                icon: 'success', title: 'Status Diperbarui',
                text: `Blog diubah menjadi ${newStatus}`, timer: 1500, showConfirmButton: false
            });
        } catch (error) { Swal.fire('Error', 'Gagal update status', 'error'); }
    };

    const handleToggleComments = async (id: string, currentStatus: boolean) => {
        try {
            const res = await api(`/api/blog/${id}/toggle-comments`, { method: 'PATCH' });
            setBlogs(prev => prev.map(b => b._id === id ? { ...b, allowComments: res.allowComments } : b));
            
            const Toast = Swal.mixin({
                toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true
            });
            Toast.fire({
                icon: 'success',
                title: res.allowComments ? 'Komentar Diaktifkan' : 'Komentar Dinonaktifkan'
            });
        } catch (error) { Swal.fire('Error', 'Gagal ubah komentar', 'error'); }
    };

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Hapus Cerita?', text: "Data tidak bisa kembali!",
            icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', confirmButtonText: 'Ya, Hapus!'
        });
        if (result.isConfirmed) {
            try {
                await api(`/api/blog/${id}`, { method: 'DELETE' });
                setBlogs(prev => prev.filter(b => b._id !== id));
                Swal.fire('Terhapus!', 'Cerita dihapus.', 'success');
            } catch (error) { Swal.fire('Error', 'Gagal hapus', 'error'); }
        }
    };

    const handleImportPmi = async () => {
        setImporting(true);
        setImportResults([]); 
        try {
            const res: any = await api('/api/blog/import-pmi', { method: 'POST' });
            if (res.savedCount > 0) {
                setImportResults(res.results); 
                loadBlogs(); 
                Swal.fire({ icon: 'success', title: 'Import Berhasil', text: `${res.savedCount} cerita baru.` });
            } else {
                Swal.fire('Info', 'Tidak ada cerita baru.', 'info');
            }
        } catch (error) { Swal.fire('Gagal', 'Koneksi gagal.', 'error'); } 
        finally { setImporting(false); }
    };

    const filteredBlogs = blogs.filter(blog => {
        if (filterStatus === 'all') return true;
        const status = blog.status || 'pending';
        return status === filterStatus;
    });

    return (
        <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
            <div className="p-6 bg-gray-50 min-h-screen relative">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Kelola Cerita Relawan</h1>
                        <p className="text-gray-500 text-sm">Manajemen artikel, berita, dan kisah inspiratif.</p>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setShowImportModal(true)}
                            className="bg-white text-gray-600 border border-gray-300 p-2.5 rounded-lg hover:bg-gray-100 transition-all shadow-sm"
                            title="Import & Pengaturan"
                            aria-label="Buka Import" // [FIX A11Y] Menambahkan label aksesibilitas
                        >
                            <Settings size={20} />
                        </button>
                        <Link href="/admin/blog/create" className="bg-[#990000] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-800 transition-colors shadow-md">
                            <Plus size={18} /> Tulis Cerita Baru
                        </Link>
                    </div>
                </div>

                {/* Filter */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Cari judul..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        {['all', 'approved', 'pending', 'rejected'].map((status) => (
                            <button key={status} onClick={() => setFilterStatus(status)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap ${filterStatus === status ? 'bg-red-50 text-[#990000] border border-red-200' : 'bg-gray-50 text-gray-600 border border-transparent'}`}>
                                {status === 'all' ? 'Semua Status' : status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="p-4 text-sm font-semibold text-gray-600">Judul & Penulis</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600">Tanggal</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600 text-center">Status</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600 text-center">Komentar</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr><td colSpan={5} className="p-8 text-center text-gray-500">Memuat data...</td></tr>
                                ) : filteredBlogs.length === 0 ? (
                                    <tr><td colSpan={5} className="p-8 text-center text-gray-500">Tidak ada cerita ditemukan.</td></tr>
                                ) : (
                                    filteredBlogs.map((blog) => {
                                        const status = blog.status || 'pending';
                                        return (
                                        <tr key={blog._id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                                                        {/* [FIX A11Y] Menambahkan alt tag yang valid */}
                                                        {blog.coverUrl && <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt={blog.title || 'Blog Cover'}/>}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-800 mb-1 line-clamp-1">{blog.title}</div>
                                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                                            By: <span className="font-medium text-gray-700">{blog.author?.name || 'Unknown'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                                                {new Date(blog.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                                    status === 'approved' ? 'bg-green-100 text-green-700' :
                                                    status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {status === 'approved' && <CheckCircle size={10}/>}
                                                    {status === 'pending' && <Clock size={10}/>}
                                                    {status === 'rejected' && <XCircle size={10}/>}
                                                    {status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <button 
                                                    onClick={() => handleToggleComments(blog._id, blog.allowComments)} 
                                                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${blog.allowComments !== false ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`} 
                                                    title={blog.allowComments !== false ? "Nonaktifkan" : "Aktifkan"}
                                                    aria-label={blog.allowComments !== false ? "Matikan Komentar" : "Hidupkan Komentar"}
                                                >
                                                    {blog.allowComments !== false ? <MessageCircle size={12}/> : <MessageCircleOff size={12}/>}
                                                    {blog.allowComments !== false ? 'ON' : 'OFF'}
                                                </button>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex justify-end items-center gap-2">
                                                    <div className="flex bg-gray-100 rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {status !== 'approved' && (
                                                            <button onClick={() => handleStatusChange(blog._id, 'approved')} className="p-1.5 hover:bg-green-200 text-green-600 rounded" aria-label="Setujui" title="Setujui"><CheckCircle size={16}/></button>
                                                        )}
                                                        {status !== 'rejected' && (
                                                            <button onClick={() => handleStatusChange(blog._id, 'rejected')} className="p-1.5 hover:bg-red-200 text-red-600 rounded" aria-label="Tolak" title="Tolak"><XCircle size={16}/></button>
                                                        )}
                                                    </div>
                                                    <div className="w-px h-6 bg-gray-200 mx-1"></div>
                                                    <Link href={`/blog/${blog._id}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" aria-label="Lihat Blog" title="Lihat"><Eye size={18}/></Link>
                                                    <Link href={`/admin/blog/edit/${blog._id}`} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg" aria-label="Edit Blog" title="Edit"><Edit size={18}/></Link>
                                                    <button onClick={() => handleDelete(blog._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" aria-label="Hapus Blog" title="Hapus"><Trash2 size={18}/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )})
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Import Modal */}
                {showImportModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[80vh]">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-gray-900 text-lg">Import Cerita</h3>
                                {/* [FIX A11Y] Menambahkan aria-label */}
                                <button onClick={() => setShowImportModal(false)} className="text-gray-400 hover:text-gray-600" aria-label="Tutup Modal"><X size={24}/></button>
                            </div>
                            <div className="p-6 overflow-y-auto flex-1">
                                {!importResults.length && !importing && (
                                    <div className="text-center py-10">
                                        <button onClick={handleImportPmi} className="bg-[#990000] text-white px-6 py-3 rounded-full font-bold hover:bg-red-800 shadow-lg flex items-center gap-2 mx-auto">Mulai Sinkronisasi</button>
                                    </div>
                                )}
                                {importing && <div className="text-center py-12"><Loader2 className="animate-spin text-[#990000] mx-auto mb-4" size={40}/><p>Sedang mengambil data...</p></div>}
                                {importResults.length > 0 && !importing && (
                                    <div>
                                        <div className="space-y-3">
                                            {importResults.map((item: any, idx: number) => (
                                                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex gap-4 items-start">
                                                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                                        {/* [FIX A11Y] Alt tag */}
                                                        {item.coverUrl && <img src={item.coverUrl} className="w-full h-full object-cover" alt={item.title}/>}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h5 className="font-bold text-gray-900 text-sm line-clamp-1 mb-1">{item.title}</h5>
                                                        <div className="flex gap-2">
                                                            {/* Review Link */}
                                                            <Link href={`/admin/blog/edit/${item._id}`} className="self-center bg-white border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#990000] hover:text-white transition-all flex items-center gap-1">
                                                                <Edit size={14}/> Review & Edit
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6 text-center"><button onClick={() => { setShowImportModal(false); setImportResults([]); setFilterStatus('pending'); }} className="text-gray-500 underline">Tutup</button></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Protected>
    );
}
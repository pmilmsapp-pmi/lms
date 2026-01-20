// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useAuth } from '@/lib/AuthProvider';
// // import { api, getImageUrl } from '@/lib/api';
// // import Protected from '@/components/Protected';
// // import { User, Mail, Phone, MapPin, Edit, MessageSquare, BookOpen, Clock, FileText } from 'lucide-react';
// // import Link from 'next/link';

// // export default function ProfilePage() {
// //   const { user } = useAuth();
  
// //   // State Tabs
// //   const [activeTab, setActiveTab] = useState<'forum' | 'chat' | 'course' | 'finance' | 'library' | 'blog'>('forum');
  
// //   // Data State
// //   const [forums, setForums] = useState<any[]>([]);
// //   const [blogs, setBlogs] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     if (activeTab === 'forum') loadForumHistory();
// //     if (activeTab === 'blog') loadBlogHistory();
// //   }, [activeTab]);

// //   const loadForumHistory = async () => {
// //     try {
// //         setLoading(true);
// //         const res = await api('/api/forum?author=me');
// //         setForums(res.topics || []);
// //     } catch (e) { console.error(e); } finally { setLoading(false); }
// //   };

// //   const loadBlogHistory = async () => {
// //     try {
// //         setLoading(true);
// //         const res = await api('/api/blog?author=me'); 
// //         setBlogs(res || []);
// //     } catch (e) { console.error(e); } finally { setLoading(false); }
// //   };

// //   if (!user) return null;

// //   return (
// //     <Protected>
// //       <div className="max-w-6xl mx-auto p-6 font-sans min-h-screen pb-20">
        
// //         {/* HEADER PROFIL */}
// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
// //             <div className="h-32 bg-red-800"></div>
// //             <div className="px-8 pb-8 relative">
// //                 <div className="flex flex-col md:flex-row gap-6 items-end -mt-12">
// //                     <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md">
// //                         <img src={getImageUrl(user.avatarUrl)} className="w-full h-full object-cover" alt="Avatar"/>
// //                     </div>
// //                     <div className="flex-1 mb-2">
// //                         <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
// //                         <p className="text-sm text-gray-500 uppercase font-bold tracking-wide flex items-center gap-2">
// //                             <span className="bg-gray-100 px-2 py-0.5 rounded">{user.role}</span> • {user.email}
// //                         </p>
// //                     </div>
// //                     <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 mb-2">
// //                         <Edit size={16}/> Edit Profil
// //                     </button>
// //                 </div>
                
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100 text-sm text-gray-600">
// //                     <div className="flex items-center gap-2"><Mail size={16} className="text-gray-400"/> {user.email}</div>
// //                     <div className="flex items-center gap-2"><Phone size={16} className="text-gray-400"/> +62 812-xxxx-xxxx</div>
// //                     <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-400"/> Jakarta, Indonesia</div>
// //                 </div>
// //             </div>
// //         </div>

// //         {/* TAB NAVIGASI */}
// //         <div className="flex overflow-x-auto gap-8 border-b border-gray-200 mb-8 hide-scrollbar">
// //             {[
// //                 { id: 'forum', label: 'Forum & Diskusi', icon: MessageSquare },
// //                 { id: 'blog', label: 'Riwayat Blog', icon: FileText },
// //                 { id: 'chat', label: 'Riwayat Chat', icon: MessageSquare },
// //                 { id: 'course', label: 'Pelatihan', icon: BookOpen },
// //             ].map((tab) => (
// //                 <button 
// //                     key={tab.id}
// //                     onClick={() => setActiveTab(tab.id as any)}
// //                     className={`flex items-center gap-2 pb-4 text-sm font-bold whitespace-nowrap transition border-b-2 ${activeTab === tab.id ? 'border-red-600 text-red-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
// //                 >
// //                     <tab.icon size={18}/> {tab.label}
// //                 </button>
// //             ))}
// //         </div>

// //         {/* KONTEN TAB */}
// //         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[300px]">
            
// //             {/* KONTEN RIWAYAT BLOG */}
// //             {activeTab === 'blog' && (
// //                 <div>
// //                     <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><FileText size={20}/> Cerita Relawan Saya</h3>
// //                     {loading ? <div>Memuat...</div> : 
// //                      blogs.length === 0 ? <div className="text-center py-10 text-gray-400">Belum ada cerita yang Anda tulis.</div> :
// //                      <div className="space-y-4">
// //                         {blogs.map((blog) => (
// //                             <div key={blog._id} className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition">
// //                                 <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
// //                                     {/* FIX: Added alt attribute */}
// //                                     {blog.coverUrl && <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt={blog.title}/>}
// //                                 </div>
// //                                 <div className="flex-1">
// //                                     <h4 className="font-bold text-gray-800">{blog.title}</h4>
// //                                     <div className="flex items-center gap-2 text-xs mt-1">
// //                                         <span className={`px-2 py-0.5 rounded uppercase font-bold ${blog.status === 'approved' ? 'bg-green-100 text-green-700' : blog.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
// //                                             {blog.status === 'approved' ? 'Disetujui' : blog.status === 'rejected' ? 'Ditolak' : 'Menunggu Review'}
// //                                         </span>
// //                                         <span className="text-gray-400">• {new Date(blog.createdAt).toLocaleDateString()}</span>
// //                                     </div>
// //                                 </div>
// //                                 <Link href={`/blog/${blog._id}`} className="text-sm font-bold text-blue-600 hover:underline">Lihat</Link>
// //                             </div>
// //                         ))}
// //                      </div>
// //                     }
// //                 </div>
// //             )}

// //             {/* KONTEN FORUM (EXISTING) */}
// //             {activeTab === 'forum' && (
// //                 <div>
// //                      <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><MessageSquare size={20}/> Riwayat Pengajuan Forum</h3>
// //                      {loading ? <div>Memuat...</div> : 
// //                       forums.length === 0 ? <div className="text-center py-10 text-gray-400">Belum ada topik diskusi.</div> :
// //                       <div className="space-y-4">
// //                         {forums.map((f) => (
// //                             <div key={f._id} className="p-4 border rounded-xl flex justify-between items-center">
// //                                 <div>
// //                                     <div className="text-xs font-bold text-blue-600 mb-1 uppercase">{f.category} • {new Date(f.createdAt).toLocaleDateString()}</div>
// //                                     <h4 className="font-bold text-gray-800">{f.title}</h4>
// //                                 </div>
// //                                 <div className={`px-3 py-1 rounded-full text-xs font-bold ${f.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
// //                                     {f.status === 'approved' ? 'Disetujui' : 'Menunggu'}
// //                                 </div>
// //                             </div>
// //                         ))}
// //                       </div>
// //                      }
// //                 </div>
// //             )}
            
// //             {(activeTab === 'chat' || activeTab === 'course') && (
// //                 <div className="text-center py-20 text-gray-400">Fitur sedang dalam pengembangan...</div>
// //             )}
// //         </div>
// //       </div>
// //     </Protected>
// //   );
// // }


// 'use client';

// import { useState, useEffect } from 'react';
// import { useAuth } from '@/lib/AuthProvider';
// import { api, getImageUrl } from '@/lib/api';
// import Protected from '@/components/Protected';
// import { User, Mail, Phone, MapPin, Edit, MessageSquare, BookOpen, FileText } from 'lucide-react';
// import Link from 'next/link';

// // [PENTING] Sesuaikan path ini dengan lokasi Anda memindahkan file UserProfileForm.tsx
// // Jika ada di folder "frontend/app/admin/members/" maka pathnya:
// import UserProfileForm from '@/app/admin/members/UserProfileForm';
// // Jika masih error, coba cek struktur folder Anda, mungkin di '@/components/admin/members/UserProfileForm'

// export default function ProfilePage() {
//   const { user, login } = useAuth(); // Ambil fungsi login untuk update session lokal
  
//   // State Tabs
//   const [activeTab, setActiveTab] = useState<'forum' | 'chat' | 'course' | 'finance' | 'library' | 'blog'>('forum');
  
//   // Data State
//   const [forums, setForums] = useState<any[]>([]);
//   const [blogs, setBlogs] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   // State Modal Edit Profil
//   const [showEditProfile, setShowEditProfile] = useState(false);

//   useEffect(() => {
//     if (activeTab === 'forum') loadForumHistory();
//     if (activeTab === 'blog') loadBlogHistory();
//   }, [activeTab]);

//   const loadForumHistory = async () => {
//     try {
//         setLoading(true);
//         const res = await api('/api/forum?author=me');
//         setForums(res.topics || []);
//     } catch (e) { console.error(e); } finally { setLoading(false); }
//   };

//   const loadBlogHistory = async () => {
//     try {
//         setLoading(true);
//         const res = await api('/api/blog?author=me'); 
//         setBlogs(res || []);
//     } catch (e) { console.error(e); } finally { setLoading(false); }
//   };

//   // Fungsi Simpan Profil dari Modal
//   const handleSaveProfile = async (updatedData: any) => {
//     try {
//         // 1. Kirim ke API
//         const res = await api('/api/auth/update-profile', { 
//             method: 'PUT', 
//             body: updatedData 
//         });

//         // 2. Update Session Lokal (Penting agar UI langsung berubah tanpa refresh)
//         if (user && res.user) {
//             const token = localStorage.getItem('token') || '';
//             login(token, res.user); 
//         }

//         alert("Profil berhasil diperbarui!");
//         setShowEditProfile(false);
//     } catch (error: any) {
//         alert("Gagal update profil: " + error.message);
//     }
//   };

//   if (!user) return null;

//   return (
//     <Protected>
//       <div className="max-w-6xl mx-auto p-6 font-sans min-h-screen pb-20">
        
//         {/* HEADER PROFIL */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
//             <div className="h-32 bg-red-800"></div>
//             <div className="px-8 pb-8 relative">
//                 <div className="flex flex-col md:flex-row gap-6 items-end -mt-12">
//                     <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md">
//                         <img src={getImageUrl(user.avatarUrl)} className="w-full h-full object-cover" alt="Avatar"/>
//                     </div>
//                     <div className="flex-1 mb-2">
//                         <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
//                         <p className="text-sm text-gray-500 uppercase font-bold tracking-wide flex items-center gap-2">
//                             <span className="bg-gray-100 px-2 py-0.5 rounded">{user.role}</span> 
//                             {/* Menampilkan NIA atau Kode Anggota */}
//                             • {user.memberData?.nia || user.memberData?.kode || user.email}
//                         </p>
//                     </div>
//                     {/* Tombol Edit Membuka Modal */}
//                     <button 
//                         onClick={() => setShowEditProfile(true)}
//                         className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 mb-2 transition-colors"
//                     >
//                         <Edit size={16}/> Edit Profil
//                     </button>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100 text-sm text-gray-600">
//                     <div className="flex items-center gap-2"><Mail size={16} className="text-gray-400"/> {user.email}</div>
//                     <div className="flex items-center gap-2">
//                         <Phone size={16} className="text-gray-400"/> 
//                         {user.memberData?.phone || '-'}
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <MapPin size={16} className="text-gray-400"/> 
//                         {/* Menampilkan Kota (Prioritas) -> Unit -> Alamat */}
//                         {user.city || user.memberData?.unit || user.memberData?.address || 'Lokasi belum diatur'}
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {/* TAB NAVIGASI */}
//         <div className="flex overflow-x-auto gap-8 border-b border-gray-200 mb-8 hide-scrollbar">
//             {[
//                 { id: 'forum', label: 'Forum & Diskusi', icon: MessageSquare },
//                 { id: 'blog', label: 'Riwayat Blog', icon: FileText },
//                 { id: 'chat', label: 'Riwayat Chat', icon: MessageSquare },
//                 { id: 'course', label: 'Pelatihan', icon: BookOpen },
//             ].map((tab) => (
//                 <button 
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id as any)}
//                     className={`flex items-center gap-2 pb-4 text-sm font-bold whitespace-nowrap transition border-b-2 ${activeTab === tab.id ? 'border-red-600 text-red-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                 >
//                     <tab.icon size={18}/> {tab.label}
//                 </button>
//             ))}
//         </div>

//         {/* KONTEN TAB */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[300px]">
            
//             {/* KONTEN RIWAYAT BLOG */}
//             {activeTab === 'blog' && (
//                 <div>
//                     <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><FileText size={20}/> Cerita Relawan Saya</h3>
//                     {loading ? <div>Memuat...</div> : 
//                      blogs.length === 0 ? <div className="text-center py-10 text-gray-400">Belum ada cerita yang Anda tulis.</div> :
//                      <div className="space-y-4">
//                         {blogs.map((blog) => (
//                             <div key={blog._id} className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition">
//                                 <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
//                                     {blog.coverUrl && <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt={blog.title}/>}
//                                 </div>
//                                 <div className="flex-1">
//                                     <h4 className="font-bold text-gray-800">{blog.title}</h4>
//                                     <div className="flex items-center gap-2 text-xs mt-1">
//                                         <span className={`px-2 py-0.5 rounded uppercase font-bold ${blog.status === 'approved' ? 'bg-green-100 text-green-700' : blog.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
//                                             {blog.status === 'approved' ? 'Disetujui' : blog.status === 'rejected' ? 'Ditolak' : 'Menunggu Review'}
//                                         </span>
//                                         <span className="text-gray-400">• {new Date(blog.createdAt).toLocaleDateString()}</span>
//                                     </div>
//                                 </div>
//                                 <Link href={`/blog/${blog._id}`} className="text-sm font-bold text-blue-600 hover:underline">Lihat</Link>
//                             </div>
//                         ))}
//                      </div>
//                     }
//                 </div>
//             )}

//             {/* KONTEN FORUM */}
//             {activeTab === 'forum' && (
//                 <div>
//                       <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><MessageSquare size={20}/> Riwayat Pengajuan Forum</h3>
//                       {loading ? <div>Memuat...</div> : 
//                        forums.length === 0 ? <div className="text-center py-10 text-gray-400">Belum ada topik diskusi.</div> :
//                        <div className="space-y-4">
//                         {forums.map((f) => (
//                             <div key={f._id} className="p-4 border rounded-xl flex justify-between items-center">
//                                 <div>
//                                     <div className="text-xs font-bold text-blue-600 mb-1 uppercase">{f.category} • {new Date(f.createdAt).toLocaleDateString()}</div>
//                                     <h4 className="font-bold text-gray-800">{f.title}</h4>
//                                 </div>
//                                 <div className={`px-3 py-1 rounded-full text-xs font-bold ${f.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
//                                     {f.status === 'approved' ? 'Disetujui' : 'Menunggu'}
//                                 </div>
//                             </div>
//                         ))}
//                       </div>
//                       }
//                 </div>
//             )}
            
//             {(activeTab === 'chat' || activeTab === 'course') && (
//                 <div className="text-center py-20 text-gray-400">Fitur sedang dalam pengembangan...</div>
//             )}
//         </div>
//       </div>

//       {/* Render Modal Edit Profil */}
//       {showEditProfile && (
//           <UserProfileForm 
//               initialData={user} // Kirim data user saat ini ke form
//               onClose={() => setShowEditProfile(false)}
//               onSave={handleSaveProfile}
//           />
//       )}

//     </Protected>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthProvider';
import { api, getImageUrl } from '@/lib/api';
import Protected from '@/components/Protected';
import { User, Mail, Phone, MapPin, Edit, MessageSquare, BookOpen, FileText, Camera } from 'lucide-react';
import Link from 'next/link';
import ProfilePhotoUploader from '@/components/ProfilePhotoUploader'; // Import Komponen Upload
import UserProfileForm from '@/app/admin/members/UserProfileForm'; // Import Modal Form

export default function ProfilePage() {
  const { user, login } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'forum' | 'chat' | 'course' | 'finance' | 'library' | 'blog'>('forum');
  const [forums, setForums] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // State untuk Modal Upload Foto & Edit Profil
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    if (activeTab === 'forum') loadForumHistory();
    if (activeTab === 'blog') loadBlogHistory();
  }, [activeTab]);

  const loadForumHistory = async () => {
    try {
        setLoading(true);
        const res = await api('/api/forum?author=me');
        setForums(res.topics || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const loadBlogHistory = async () => {
    try {
        setLoading(true);
        const res = await api('/api/blog?author=me'); 
        setBlogs(res || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleSaveProfile = async (updatedData: any) => {
    try {
        const res = await api('/api/auth/update-profile', { method: 'PUT', body: updatedData });
        if (user && res.user) {
            const token = localStorage.getItem('token') || '';
            login(token, res.user); 
        }
        alert("Profil berhasil diperbarui!");
        setShowEditProfile(false);
    } catch (error: any) {
        alert("Gagal update profil: " + error.message);
    }
  };

  const handlePhotoSaved = (newUrl: string) => {
      setShowPhotoModal(false);
      // Update state user lokal agar foto langsung berubah
      if (user) {
          const updatedUser = { ...user, avatarUrl: newUrl };
          const token = localStorage.getItem('token') || '';
          login(token, updatedUser);
      }
  };

  if (!user) return null;

  return (
    <Protected>
      <div className="max-w-6xl mx-auto p-6 font-sans min-h-screen pb-20">
        
        {/* HEADER PROFIL */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="h-32 bg-red-800 relative"></div>
            <div className="px-8 pb-8 relative">
                <div className="flex flex-col md:flex-row gap-6 items-end -mt-12">
                    
                    {/* AVATAR DENGAN KLIK UNTUK UPLOAD */}
                    <div className="relative group cursor-pointer" onClick={() => setShowPhotoModal(true)}>
                        <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md relative">
                            <img src={getImageUrl(user.avatarUrl)} className="w-full h-full object-cover" alt="Avatar"/>
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="text-white"/>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 mb-2">
                        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                        <p className="text-sm text-gray-500 uppercase font-bold tracking-wide flex items-center gap-2">
                            <span className="bg-gray-100 px-2 py-0.5 rounded">{user.role}</span> 
                            • {user.memberData?.nia || user.memberData?.kode || user.email}
                        </p>
                    </div>
                    
                    <button 
                        onClick={() => setShowEditProfile(true)}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 mb-2 transition-colors"
                    >
                        <Edit size={16}/> Edit Profil
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100 text-sm text-gray-600">
                    <div className="flex items-center gap-2"><Mail size={16} className="text-gray-400"/> {user.email}</div>
                    <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-400"/> 
                        {user.memberData?.phone || '-'}
                    </div>
                    <div className="flex items-center gap-2 font-bold text-gray-700">
                        <MapPin size={16} className="text-red-500"/> 
                        {user.city ? `${user.city}, ${user.province || 'JAWA TIMUR'}` : (user.memberData?.unit || 'Lokasi belum diatur')}
                    </div>
                </div>
            </div>
        </div>

        {/* TAB NAVIGASI */}
        <div className="flex overflow-x-auto gap-8 border-b border-gray-200 mb-8 hide-scrollbar">
            {[
                { id: 'forum', label: 'Forum & Diskusi', icon: MessageSquare },
                { id: 'blog', label: 'Riwayat Blog', icon: FileText },
                { id: 'chat', label: 'Riwayat Chat', icon: MessageSquare },
                { id: 'course', label: 'Pelatihan', icon: BookOpen },
            ].map((tab) => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 pb-4 text-sm font-bold whitespace-nowrap transition border-b-2 ${activeTab === tab.id ? 'border-red-600 text-red-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <tab.icon size={18}/> {tab.label}
                </button>
            ))}
        </div>

        {/* KONTEN TAB */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[300px]">
            {activeTab === 'blog' && (
                <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><FileText size={20}/> Cerita Relawan Saya</h3>
                    {loading ? <div>Memuat...</div> : 
                     blogs.length === 0 ? <div className="text-center py-10 text-gray-400">Belum ada cerita yang Anda tulis.</div> :
                     <div className="space-y-4">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition">
                                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                    {blog.coverUrl && <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt={blog.title}/>}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800">{blog.title}</h4>
                                    <span className="text-xs text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
                                </div>
                                <Link href={`/blog/${blog._id}`} className="text-sm font-bold text-blue-600 hover:underline">Lihat</Link>
                            </div>
                        ))}
                     </div>
                    }
                </div>
            )}

            {activeTab === 'forum' && (
                <div>
                      <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><MessageSquare size={20}/> Riwayat Pengajuan Forum</h3>
                      {loading ? <div>Memuat...</div> : 
                       forums.length === 0 ? <div className="text-center py-10 text-gray-400">Belum ada topik diskusi.</div> :
                       <div className="space-y-4">
                        {forums.map((f) => (
                            <div key={f._id} className="p-4 border rounded-xl flex justify-between items-center">
                                <div>
                                    <div className="text-xs font-bold text-blue-600 mb-1 uppercase">{f.category}</div>
                                    <h4 className="font-bold text-gray-800">{f.title}</h4>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${f.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                    {f.status === 'approved' ? 'Disetujui' : 'Menunggu'}
                                </div>
                            </div>
                        ))}
                      </div>
                      }
                </div>
            )}
            
            {(activeTab === 'chat' || activeTab === 'course') && (
                <div className="text-center py-20 text-gray-400">Fitur sedang dalam pengembangan...</div>
            )}
        </div>

      </div>

      {/* MODAL UPLOAD PHOTO */}
      {showPhotoModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
                  <h3 className="text-lg font-bold mb-4 text-center">Ganti Foto Profil</h3>
                  <ProfilePhotoUploader 
                      userId={user.id || user._id || ''} 
                      currentUrl={user.avatarUrl}
                      onSaved={handlePhotoSaved}
                  />
                  <button onClick={() => setShowPhotoModal(false)} className="mt-4 w-full py-2 text-sm text-gray-500 font-bold hover:bg-gray-100 rounded-lg">Batal</button>
              </div>
          </div>
      )}

      {/* MODAL EDIT PROFIL */}
      {showEditProfile && (
          <UserProfileForm 
              initialData={user}
              onClose={() => setShowEditProfile(false)}
              onSave={handleSaveProfile}
          />
      )}

    </Protected>
  );
}
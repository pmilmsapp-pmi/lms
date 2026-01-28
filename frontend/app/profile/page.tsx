// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { useAuth } from '@/lib/AuthProvider';
// // // import { api, getImageUrl } from '@/lib/api';
// // // import Protected from '@/components/Protected';
// // // import { User, Mail, Phone, MapPin, Edit, MessageSquare, BookOpen, Clock, FileText } from 'lucide-react';
// // // import Link from 'next/link';

// // // export default function ProfilePage() {
// // //   const { user } = useAuth();
  
// // //   // State Tabs
// // //   const [activeTab, setActiveTab] = useState<'forum' | 'chat' | 'course' | 'finance' | 'library' | 'blog'>('forum');
  
// // //   // Data State
// // //   const [forums, setForums] = useState<any[]>([]);
// // //   const [blogs, setBlogs] = useState<any[]>([]);
// // //   const [loading, setLoading] = useState(false);

// // //   useEffect(() => {
// // //     if (activeTab === 'forum') loadForumHistory();
// // //     if (activeTab === 'blog') loadBlogHistory();
// // //   }, [activeTab]);

// // //   const loadForumHistory = async () => {
// // //     try {
// // //         setLoading(true);
// // //         const res = await api('/api/forum?author=me');
// // //         setForums(res.topics || []);
// // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // //   };

// // //   const loadBlogHistory = async () => {
// // //     try {
// // //         setLoading(true);
// // //         const res = await api('/api/blog?author=me'); 
// // //         setBlogs(res || []);
// // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // //   };

// // //   if (!user) return null;

// // //   return (
// // //     <Protected>
// // //       <div className="max-w-6xl mx-auto p-6 font-sans min-h-screen pb-20">
        
// // //         {/* HEADER PROFIL */}
// // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
// // //             <div className="h-32 bg-red-800"></div>
// // //             <div className="px-8 pb-8 relative">
// // //                 <div className="flex flex-col md:flex-row gap-6 items-end -mt-12">
// // //                     <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md">
// // //                         <img src={getImageUrl(user.avatarUrl)} className="w-full h-full object-cover" alt="Avatar"/>
// // //                     </div>
// // //                     <div className="flex-1 mb-2">
// // //                         <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
// // //                         <p className="text-sm text-gray-500 uppercase font-bold tracking-wide flex items-center gap-2">
// // //                             <span className="bg-gray-100 px-2 py-0.5 rounded">{user.role}</span> • {user.email}
// // //                         </p>
// // //                     </div>
// // //                     <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 mb-2">
// // //                         <Edit size={16}/> Edit Profil
// // //                     </button>
// // //                 </div>
                
// // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100 text-sm text-gray-600">
// // //                     <div className="flex items-center gap-2"><Mail size={16} className="text-gray-400"/> {user.email}</div>
// // //                     <div className="flex items-center gap-2"><Phone size={16} className="text-gray-400"/> +62 812-xxxx-xxxx</div>
// // //                     <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-400"/> Jakarta, Indonesia</div>
// // //                 </div>
// // //             </div>
// // //         </div>

// // //         {/* TAB NAVIGASI */}
// // //         <div className="flex overflow-x-auto gap-8 border-b border-gray-200 mb-8 hide-scrollbar">
// // //             {[
// // //                 { id: 'forum', label: 'Forum & Diskusi', icon: MessageSquare },
// // //                 { id: 'blog', label: 'Riwayat Blog', icon: FileText },
// // //                 { id: 'chat', label: 'Riwayat Chat', icon: MessageSquare },
// // //                 { id: 'course', label: 'Pelatihan', icon: BookOpen },
// // //             ].map((tab) => (
// // //                 <button 
// // //                     key={tab.id}
// // //                     onClick={() => setActiveTab(tab.id as any)}
// // //                     className={`flex items-center gap-2 pb-4 text-sm font-bold whitespace-nowrap transition border-b-2 ${activeTab === tab.id ? 'border-red-600 text-red-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
// // //                 >
// // //                     <tab.icon size={18}/> {tab.label}
// // //                 </button>
// // //             ))}
// // //         </div>

// // //         {/* KONTEN TAB */}
// // //         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[300px]">
            
// // //             {/* KONTEN RIWAYAT BLOG */}
// // //             {activeTab === 'blog' && (
// // //                 <div>
// // //                     <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><FileText size={20}/> Cerita Relawan Saya</h3>
// // //                     {loading ? <div>Memuat...</div> : 
// // //                      blogs.length === 0 ? <div className="text-center py-10 text-gray-400">Belum ada cerita yang Anda tulis.</div> :
// // //                      <div className="space-y-4">
// // //                         {blogs.map((blog) => (
// // //                             <div key={blog._id} className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition">
// // //                                 <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
// // //                                     {/* FIX: Added alt attribute */}
// // //                                     {blog.coverUrl && <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt={blog.title}/>}
// // //                                 </div>
// // //                                 <div className="flex-1">
// // //                                     <h4 className="font-bold text-gray-800">{blog.title}</h4>
// // //                                     <div className="flex items-center gap-2 text-xs mt-1">
// // //                                         <span className={`px-2 py-0.5 rounded uppercase font-bold ${blog.status === 'approved' ? 'bg-green-100 text-green-700' : blog.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
// // //                                             {blog.status === 'approved' ? 'Disetujui' : blog.status === 'rejected' ? 'Ditolak' : 'Menunggu Review'}
// // //                                         </span>
// // //                                         <span className="text-gray-400">• {new Date(blog.createdAt).toLocaleDateString()}</span>
// // //                                     </div>
// // //                                 </div>
// // //                                 <Link href={`/blog/${blog._id}`} className="text-sm font-bold text-blue-600 hover:underline">Lihat</Link>
// // //                             </div>
// // //                         ))}
// // //                      </div>
// // //                     }
// // //                 </div>
// // //             )}

// // //             {/* KONTEN FORUM (EXISTING) */}
// // //             {activeTab === 'forum' && (
// // //                 <div>
// // //                      <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><MessageSquare size={20}/> Riwayat Pengajuan Forum</h3>
// // //                      {loading ? <div>Memuat...</div> : 
// // //                       forums.length === 0 ? <div className="text-center py-10 text-gray-400">Belum ada topik diskusi.</div> :
// // //                       <div className="space-y-4">
// // //                         {forums.map((f) => (
// // //                             <div key={f._id} className="p-4 border rounded-xl flex justify-between items-center">
// // //                                 <div>
// // //                                     <div className="text-xs font-bold text-blue-600 mb-1 uppercase">{f.category} • {new Date(f.createdAt).toLocaleDateString()}</div>
// // //                                     <h4 className="font-bold text-gray-800">{f.title}</h4>
// // //                                 </div>
// // //                                 <div className={`px-3 py-1 rounded-full text-xs font-bold ${f.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
// // //                                     {f.status === 'approved' ? 'Disetujui' : 'Menunggu'}
// // //                                 </div>
// // //                             </div>
// // //                         ))}
// // //                       </div>
// // //                      }
// // //                 </div>
// // //             )}
            
// // //             {(activeTab === 'chat' || activeTab === 'course') && (
// // //                 <div className="text-center py-20 text-gray-400">Fitur sedang dalam pengembangan...</div>
// // //             )}
// // //         </div>
// // //       </div>
// // //     </Protected>
// // //   );
// // // }


// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useAuth } from '@/lib/AuthProvider';
// // import { api, getImageUrl } from '@/lib/api';
// // import Protected from '@/components/Protected';
// // import { User, Mail, Phone, MapPin, Edit, MessageSquare, BookOpen, FileText } from 'lucide-react';
// // import Link from 'next/link';

// // // [PENTING] Sesuaikan path ini dengan lokasi Anda memindahkan file UserProfileForm.tsx
// // // Jika ada di folder "frontend/app/admin/members/" maka pathnya:
// // import UserProfileForm from '@/app/admin/members/UserProfileForm';
// // // Jika masih error, coba cek struktur folder Anda, mungkin di '@/components/admin/members/UserProfileForm'

// // export default function ProfilePage() {
// //   const { user, login } = useAuth(); // Ambil fungsi login untuk update session lokal
  
// //   // State Tabs
// //   const [activeTab, setActiveTab] = useState<'forum' | 'chat' | 'course' | 'finance' | 'library' | 'blog'>('forum');
  
// //   // Data State
// //   const [forums, setForums] = useState<any[]>([]);
// //   const [blogs, setBlogs] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(false);

// //   // State Modal Edit Profil
// //   const [showEditProfile, setShowEditProfile] = useState(false);

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

// //   // Fungsi Simpan Profil dari Modal
// //   const handleSaveProfile = async (updatedData: any) => {
// //     try {
// //         // 1. Kirim ke API
// //         const res = await api('/api/auth/update-profile', { 
// //             method: 'PUT', 
// //             body: updatedData 
// //         });

// //         // 2. Update Session Lokal (Penting agar UI langsung berubah tanpa refresh)
// //         if (user && res.user) {
// //             const token = localStorage.getItem('token') || '';
// //             login(token, res.user); 
// //         }

// //         alert("Profil berhasil diperbarui!");
// //         setShowEditProfile(false);
// //     } catch (error: any) {
// //         alert("Gagal update profil: " + error.message);
// //     }
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
// //                             <span className="bg-gray-100 px-2 py-0.5 rounded">{user.role}</span> 
// //                             {/* Menampilkan NIA atau Kode Anggota */}
// //                             • {user.memberData?.nia || user.memberData?.kode || user.email}
// //                         </p>
// //                     </div>
// //                     {/* Tombol Edit Membuka Modal */}
// //                     <button 
// //                         onClick={() => setShowEditProfile(true)}
// //                         className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 mb-2 transition-colors"
// //                     >
// //                         <Edit size={16}/> Edit Profil
// //                     </button>
// //                 </div>
                
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100 text-sm text-gray-600">
// //                     <div className="flex items-center gap-2"><Mail size={16} className="text-gray-400"/> {user.email}</div>
// //                     <div className="flex items-center gap-2">
// //                         <Phone size={16} className="text-gray-400"/> 
// //                         {user.memberData?.phone || '-'}
// //                     </div>
// //                     <div className="flex items-center gap-2">
// //                         <MapPin size={16} className="text-gray-400"/> 
// //                         {/* Menampilkan Kota (Prioritas) -> Unit -> Alamat */}
// //                         {user.city || user.memberData?.unit || user.memberData?.address || 'Lokasi belum diatur'}
// //                     </div>
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

// //             {/* KONTEN FORUM */}
// //             {activeTab === 'forum' && (
// //                 <div>
// //                       <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><MessageSquare size={20}/> Riwayat Pengajuan Forum</h3>
// //                       {loading ? <div>Memuat...</div> : 
// //                        forums.length === 0 ? <div className="text-center py-10 text-gray-400">Belum ada topik diskusi.</div> :
// //                        <div className="space-y-4">
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
// //                       }
// //                 </div>
// //             )}
            
// //             {(activeTab === 'chat' || activeTab === 'course') && (
// //                 <div className="text-center py-20 text-gray-400">Fitur sedang dalam pengembangan...</div>
// //             )}
// //         </div>
// //       </div>

// //       {/* Render Modal Edit Profil */}
// //       {showEditProfile && (
// //           <UserProfileForm 
// //               initialData={user} // Kirim data user saat ini ke form
// //               onClose={() => setShowEditProfile(false)}
// //               onSave={handleSaveProfile}
// //           />
// //       )}

// //     </Protected>
// //   );
// // }


// 'use client';

// import { useState, useEffect } from 'react';
// import { useAuth } from '@/lib/AuthProvider';
// import { api, getImageUrl } from '@/lib/api';
// import Protected from '@/components/Protected';
// import { User, Mail, Phone, MapPin, Edit, MessageSquare, BookOpen, FileText, Camera } from 'lucide-react';
// import Link from 'next/link';
// import ProfilePhotoUploader from '@/components/ProfilePhotoUploader'; // Import Komponen Upload
// import UserProfileForm from '@/app/admin/members/UserProfileForm'; // Import Modal Form

// export default function ProfilePage() {
//   const { user, login } = useAuth();
  
//   const [activeTab, setActiveTab] = useState<'forum' | 'chat' | 'course' | 'finance' | 'library' | 'blog'>('forum');
//   const [forums, setForums] = useState<any[]>([]);
//   const [blogs, setBlogs] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
  
//   // State untuk Modal Upload Foto & Edit Profil
//   const [showPhotoModal, setShowPhotoModal] = useState(false);
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

//   const handleSaveProfile = async (updatedData: any) => {
//     try {
//         const res = await api('/api/auth/update-profile', { method: 'PUT', body: updatedData });
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

//   const handlePhotoSaved = (newUrl: string) => {
//       setShowPhotoModal(false);
//       // Update state user lokal agar foto langsung berubah
//       if (user) {
//           const updatedUser = { ...user, avatarUrl: newUrl };
//           const token = localStorage.getItem('token') || '';
//           login(token, updatedUser);
//       }
//   };

//   if (!user) return null;

//   return (
//     <Protected>
//       <div className="max-w-6xl mx-auto p-6 font-sans min-h-screen pb-20">
        
//         {/* HEADER PROFIL */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
//             <div className="h-32 bg-red-800 relative"></div>
//             <div className="px-8 pb-8 relative">
//                 <div className="flex flex-col md:flex-row gap-6 items-end -mt-12">
                    
//                     {/* AVATAR DENGAN KLIK UNTUK UPLOAD */}
//                     <div className="relative group cursor-pointer" onClick={() => setShowPhotoModal(true)}>
//                         <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md relative">
//                             <img src={getImageUrl(user.avatarUrl)} className="w-full h-full object-cover" alt="Avatar"/>
//                             <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                                 <Camera className="text-white"/>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex-1 mb-2">
//                         <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
//                         <p className="text-sm text-gray-500 uppercase font-bold tracking-wide flex items-center gap-2">
//                             <span className="bg-gray-100 px-2 py-0.5 rounded">{user.role}</span> 
//                             • {user.memberData?.nia || user.memberData?.kode || user.email}
//                         </p>
//                     </div>
                    
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
//                     <div className="flex items-center gap-2 font-bold text-gray-700">
//                         <MapPin size={16} className="text-red-500"/> 
//                         {user.city ? `${user.city}, ${user.province || 'JAWA TIMUR'}` : (user.memberData?.unit || 'Lokasi belum diatur')}
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
//                                     <span className="text-xs text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
//                                 </div>
//                                 <Link href={`/blog/${blog._id}`} className="text-sm font-bold text-blue-600 hover:underline">Lihat</Link>
//                             </div>
//                         ))}
//                      </div>
//                     }
//                 </div>
//             )}

//             {activeTab === 'forum' && (
//                 <div>
//                       <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><MessageSquare size={20}/> Riwayat Pengajuan Forum</h3>
//                       {loading ? <div>Memuat...</div> : 
//                        forums.length === 0 ? <div className="text-center py-10 text-gray-400">Belum ada topik diskusi.</div> :
//                        <div className="space-y-4">
//                         {forums.map((f) => (
//                             <div key={f._id} className="p-4 border rounded-xl flex justify-between items-center">
//                                 <div>
//                                     <div className="text-xs font-bold text-blue-600 mb-1 uppercase">{f.category}</div>
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

//       {/* MODAL UPLOAD PHOTO */}
//       {showPhotoModal && (
//           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in">
//               <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
//                   <h3 className="text-lg font-bold mb-4 text-center">Ganti Foto Profil</h3>
//                   <ProfilePhotoUploader 
//                       userId={user.id || user._id || ''} 
//                       currentUrl={user.avatarUrl}
//                       onSaved={handlePhotoSaved}
//                   />
//                   <button onClick={() => setShowPhotoModal(false)} className="mt-4 w-full py-2 text-sm text-gray-500 font-bold hover:bg-gray-100 rounded-lg">Batal</button>
//               </div>
//           </div>
//       )}

//       {/* MODAL EDIT PROFIL */}
//       {showEditProfile && (
//           <UserProfileForm 
//               initialData={user}
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
import { 
  User, Mail, Phone, MapPin, Edit, MessageSquare, 
  BookOpen, FileText, Camera, CreditCard, Calendar, 
  Heart, Database, ShieldCheck 
} from 'lucide-react';
import Link from 'next/link';
import ProfilePhotoUploader from '@/components/ProfilePhotoUploader'; 
import UserProfileForm from '@/app/admin/members/UserProfileForm'; 

export default function ProfilePage() {
  const { user, login } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'biodata' | 'forum' | 'chat' | 'course' | 'finance' | 'library' | 'blog'>('biodata');
  const [forums, setForums] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // State Modal
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
      if (user) {
          const updatedUser = { ...user, avatarUrl: newUrl };
          const token = localStorage.getItem('token') || '';
          login(token, updatedUser);
      }
  };

  // Format Tanggal Indonesia
  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  if (!user) return null;

  // Cek apakah data dari Postgres (Pusat)
  const isSynced = user.memberData?.source === 'AUTO_REGISTER_POSTGRES';

  return (
    <Protected>
      <div className="max-w-6xl mx-auto p-4 md:p-6 font-sans min-h-screen pb-20 bg-gray-50">
        
        {/* === HEADER PROFIL === */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            {/* Cover Image */}
            <div className="h-40 bg-gradient-to-r from-red-700 to-red-900 relative">
                {isSynced && (
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                        <Database size={14} /> Terintegrasi Data Pusat
                    </div>
                )}
            </div>
            
            <div className="px-8 pb-8 relative">
                <div className="flex flex-col md:flex-row gap-6 items-end -mt-16">
                    
                    {/* AVATAR (path_foto) */}
                    <div className="relative group cursor-pointer" onClick={() => setShowPhotoModal(true)}>
                        <div className="w-36 h-36 rounded-full border-[5px] border-white bg-gray-200 overflow-hidden shadow-lg relative">
                            <img 
                                src={getImageUrl(user.avatarUrl)} 
                                className="w-full h-full object-cover" 
                                alt="Avatar"
                                onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Img'}
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="text-white w-8 h-8"/>
                            </div>
                        </div>
                    </div>

                    {/* Nama & Info Utama */}
                    <div className="flex-1 mb-2 text-center md:text-left">
                        <h1 className="text-3xl font-black text-gray-900 mb-1">{user.name}</h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-gray-600">
                            <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full font-bold border border-red-100 text-xs tracking-wider">
                                {user.role}
                            </span>
                            <span className="flex items-center gap-1 font-mono bg-gray-100 px-2 py-1 rounded border border-gray-200">
                                <CreditCard size={14}/> {user.memberData?.nia || user.memberData?.kode_anggota || 'NIA Belum Ada'}
                            </span>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => setShowEditProfile(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-md active:scale-95"
                    >
                        <Edit size={16}/> Edit Profil
                    </button>
                </div>
            </div>
        </div>

        {/* === TAB NAVIGASI === */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 px-2">
            <div className="flex overflow-x-auto gap-1 hide-scrollbar p-2">
                {[
                    { id: 'biodata', label: 'Biodata Lengkap', icon: User },
                    { id: 'forum', label: 'Forum', icon: MessageSquare },
                    { id: 'blog', label: 'Blog', icon: FileText },
                    { id: 'course', label: 'Pelatihan', icon: BookOpen },
                ].map((tab) => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-lg transition-all whitespace-nowrap ${
                            activeTab === tab.id 
                            ? 'bg-red-50 text-red-700 ring-1 ring-red-200' 
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                        <tab.icon size={18} className={activeTab === tab.id ? "text-red-600" : "text-gray-400"}/> 
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>

        {/* === KONTEN TAB === */}
        <div className="grid grid-cols-1 gap-6">
            
            {/* TAB BIODATA (INTEGRASI POSTGRES) */}
            {activeTab === 'biodata' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <ShieldCheck className="text-red-600"/> Informasi Anggota
                        </h3>
                        {isSynced && <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded border">Read Only from MIS</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                        {/* Kolom Kiri */}
                        <div className="space-y-6">
                            <InfoRow label="Nama Lengkap" value={user.name} icon={<User size={16}/>} />
                            <InfoRow label="Nomor Induk Anggota (NIA)" value={user.memberData?.nia || user.memberData?.kode_anggota || '-'} icon={<CreditCard size={16}/>} />
                            <InfoRow label="No. Identitas (KTP/SIM)" value={user.memberData?.no_identitas || user.memberData?.nik || '-'} icon={<CreditCard size={16}/>} />
                            <InfoRow label="Jenis Kelamin" value={user.memberData?.kelamin || user.memberData?.gender || '-'} icon={<User size={16}/>} />
                            <InfoRow label="Agama" value={user.memberData?.agama || user.memberData?.religion || '-'} icon={<Heart size={16}/>} />
                        </div>

                        {/* Kolom Kanan */}
                        <div className="space-y-6">
                            <InfoRow label="Email" value={user.email} icon={<Mail size={16}/>} />
                            <InfoRow label="No. Handphone" value={user.memberData?.phone || user.memberData?.no_hp || '-'} icon={<Phone size={16}/>} />
                            <InfoRow 
                                label="Tempat, Tanggal Lahir" 
                                value={`${user.memberData?.tempat_lahir || user.memberData?.birthPlace || '-'}, ${formatDate(user.memberData?.tanggal_lahir || user.memberData?.birthDate)}`} 
                                icon={<Calendar size={16}/>} 
                            />
                            <InfoRow label="Alamat Domisili" value={user.memberData?.address || user.memberData?.alamat || '-'} icon={<MapPin size={16}/>} />
                            <InfoRow label="Unit PMI" value={user.memberData?.unit || 'PMI Pusat'} icon={<MapPin size={16}/>} />
                        </div>
                    </div>
                </div>
            )}

            {/* TAB BLOG */}
            {activeTab === 'blog' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-in fade-in">
                    <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><FileText size={20}/> Cerita Relawan Saya</h3>
                    {loading ? <div className="p-10 text-center"><span className="loading">Memuat...</span></div> : 
                     blogs.length === 0 ? <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">Belum ada cerita yang Anda tulis.</div> :
                     <div className="space-y-4">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition">
                                <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 border">
                                    {blog.coverUrl ? <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt={blog.title}/> : <div className="w-full h-full flex items-center justify-center text-gray-400"><FileText/></div>}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800 line-clamp-1">{blog.title}</h4>
                                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">{blog.content?.replace(/<[^>]+>/g, '')}</p>
                                    <span className="text-xs text-gray-400 mt-2 block">{formatDate(blog.createdAt)}</span>
                                </div>
                                <Link href={`/blog/${blog._id}`} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50">Lihat</Link>
                            </div>
                        ))}
                     </div>
                    }
                </div>
            )}

            {/* TAB FORUM */}
            {activeTab === 'forum' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-in fade-in">
                      <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><MessageSquare size={20}/> Riwayat Pengajuan Forum</h3>
                      {loading ? <div>Memuat...</div> : 
                       forums.length === 0 ? <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">Belum ada topik diskusi.</div> :
                       <div className="space-y-3">
                        {forums.map((f) => (
                            <div key={f._id} className="p-4 border rounded-xl flex justify-between items-center hover:shadow-sm transition bg-white">
                                <div>
                                    <div className="text-[10px] font-bold text-blue-600 mb-1 uppercase tracking-wider bg-blue-50 inline-block px-2 py-0.5 rounded">{f.category}</div>
                                    <h4 className="font-bold text-gray-800">{f.title}</h4>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${f.status === 'approved' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                                    {f.status === 'approved' ? 'Disetujui' : 'Menunggu'}
                                </div>
                            </div>
                        ))}
                      </div>
                      }
                </div>
            )}
            
            {(activeTab === 'course' || activeTab === 'chat' || activeTab === 'finance' || activeTab === 'library') && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        {activeTab === 'course' ? <BookOpen/> : <MessageSquare/>}
                    </div>
                    <h3 className="font-bold text-gray-900">Fitur Belum Tersedia</h3>
                    <p className="text-gray-500 text-sm mt-2">Modul ini sedang dalam tahap pengembangan.</p>
                </div>
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
                  <button onClick={() => setShowPhotoModal(false)} className="mt-4 w-full py-3 text-sm text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition">Batal</button>
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

// Helper Component untuk Baris Info
const InfoRow = ({ label, value, icon }: { label: string, value: string, icon: any }) => (
    <div className="flex gap-4 items-start group">
        <div className="mt-1 text-gray-400 bg-gray-50 p-2 rounded-lg group-hover:text-red-600 group-hover:bg-red-50 transition-colors">
            {icon}
        </div>
        <div className="flex-1 border-b border-gray-100 pb-3 group-hover:border-gray-200 transition-colors">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
            <p className="font-medium text-gray-900 text-base">{value}</p>
        </div>
    </div>
);
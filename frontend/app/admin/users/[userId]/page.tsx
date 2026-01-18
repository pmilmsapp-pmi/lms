// // // // // 'use client';

// // // // // import { useEffect, useState } from 'react';
// // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // import { api, getImageUrl } from '@/lib/api'; 
// // // // // import Protected from '@/components/Protected';
// // // // // import Link from 'next/link';

// // // // // export default function AdminUserDetailPage() {
// // // // //   const params = useParams();
// // // // //   // Mendukung nama folder [id] maupun [userId]
// // // // //   const userId = params?.userId || params?.id;
  
// // // // //   const router = useRouter();
  
// // // // //   const [data, setData] = useState<any>(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState<string | null>(null);

// // // // //   useEffect(() => {
// // // // //     if (!userId || typeof userId !== 'string') {
// // // // //       console.error("ID Pengguna tidak valid.");
// // // // //       setError("ID Pengguna tidak valid.");
// // // // //       setLoading(false);
// // // // //       return;
// // // // //     }

// // // // //     const fetchUserDetails = async () => {
// // // // //       try {
// // // // //         setLoading(true);
// // // // //         setError(null);
        
// // // // //         const res = await api(`/api/admin/users/${userId}/details`);
        
// // // // //         if (res.success) {
// // // // //           setData(res);
// // // // //         } else {
// // // // //           setError(res.error || "Gagal memuat data pengguna.");
// // // // //         }
// // // // //       } catch (err: any) {
// // // // //         console.error("Fetch Detail Error:", err);
// // // // //         setError(err.message || "Terjadi kesalahan saat mengambil data");
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchUserDetails();
// // // // //   }, [userId]);

// // // // //   const handleDownloadPDF = (certId: string) => {
// // // // //     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// // // // //     window.open(`${baseUrl}/api/certificates/${certId}/pdf`, '_blank');
// // // // //   };

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
// // // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
// // // // //         <p className="text-gray-500 font-medium tracking-wide">Memuat Detail Pengguna...</p>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (error || !data?.user) {
// // // // //     return (
// // // // //       <div className="p-20 text-center bg-gray-50 min-h-screen">
// // // // //         <div className="text-red-500 text-5xl mb-4 text-center justify-center flex">⚠️</div>
// // // // //         <p className="text-red-600 font-bold mb-4">{error || "User tidak ditemukan"}</p>
// // // // //         <p className="text-xs text-gray-400 mb-6">ID: {userId || 'Tidak diketahui'}</p>
// // // // //         <button 
// // // // //           onClick={() => router.back()} 
// // // // //           className="bg-white border border-gray-300 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
// // // // //         >
// // // // //           Kembali
// // // // //         </button>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
// // // // //         {/* NAVIGASI ATAS */}
// // // // //         <div className="flex items-center justify-between">
// // // // //           <div className="flex items-center gap-4">
// // // // //             <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200">
// // // // //               <span className="text-2xl">←</span>
// // // // //             </button>
// // // // //             <h1 className="text-2xl font-bold text-gray-800">Profil Lengkap Pengguna</h1>
// // // // //           </div>
// // // // //           <Link href="/admin/users" className="text-sm font-bold text-red-700 hover:underline">
// // // // //             Daftar User
// // // // //           </Link>
// // // // //         </div>

// // // // //         {/* KARTU PROFIL UTAMA (Versi Clean - Tanpa Header Merah) */}
// // // // //         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
// // // // //           <div className="flex flex-col md:flex-row items-center gap-8">
// // // // //             {/* Avatar */}
// // // // //             <img 
// // // // //               src={getImageUrl(data.user.avatarUrl) || '/default-avatar.png'} 
// // // // //               className="w-28 h-28 rounded-full object-cover border border-gray-200 bg-gray-50"
// // // // //               alt="Avatar"
// // // // //               onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }}
// // // // //             />
            
// // // // //             {/* Info User */}
// // // // //             <div className="flex-1 text-center md:text-left">
// // // // //               <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1 justify-center md:justify-start">
// // // // //                 <h2 className="text-3xl font-bold text-gray-900">{data.user.name}</h2>
// // // // //                 <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
// // // // //                   data.user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' :
// // // // //                   data.user.role === 'FACILITATOR' ? 'bg-blue-100 text-blue-700' :
// // // // //                   'bg-green-100 text-green-700'
// // // // //                 }`}>
// // // // //                   {data.user.role}
// // // // //                 </span>
// // // // //               </div>
// // // // //               <p className="text-gray-500 font-medium text-lg">{data.user.email}</p>
// // // // //               <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">ID: {data.user._id}</p>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
// // // // //           {/* KOLOM KIRI: SEJARAH PELATIHAN */}
// // // // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // // // //             <div className="flex justify-between items-center mb-6">
// // // // //               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
// // // // //                 📚 Riwayat Kursus
// // // // //               </h3>
// // // // //               <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-500">
// // // // //                 {data.history?.length || 0} Total
// // // // //               </span>
// // // // //             </div>

// // // // //             <div className="space-y-4">
// // // // //               {data.history && data.history.length > 0 ? (
// // // // //                 data.history.map((item: any) => (
// // // // //                   <div key={item._id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-red-100 transition-all group">
// // // // //                     <div className="flex items-center gap-4">
// // // // //                       <img 
// // // // //                         src={getImageUrl(item.courseId?.thumbnailUrl) || '/course-placeholder.jpg'} 
// // // // //                         className="w-12 h-12 rounded-xl object-cover bg-gray-200" 
// // // // //                         alt=""
// // // // //                         onError={(e) => { (e.target as HTMLImageElement).src = '/course-placeholder.jpg'; }}
// // // // //                       />
// // // // //                       <div>
// // // // //                         <p className="font-bold text-gray-900 text-sm group-hover:text-red-700">{item.courseId?.title || 'Kursus'}</p>
// // // // //                         <p className="text-[10px] text-gray-400">ID: {item.courseId?._id.substring(0,8)}...</p>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase ${
// // // // //                       item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
// // // // //                     }`}>
// // // // //                       {item.completed ? 'LULUS' : 'PROSES'}
// // // // //                     </span>
// // // // //                   </div>
// // // // //                 ))
// // // // //               ) : (
// // // // //                 <div className="text-center py-10">
// // // // //                   <p className="text-gray-400 text-sm italic">Belum ada aktivitas pelatihan yang tercatat.</p>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* KOLOM KANAN: SERTIFIKAT */}
// // // // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // // // //             <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
// // // // //               📜 Sertifikat Digital
// // // // //             </h3>
// // // // //             <div className="space-y-4">
// // // // //               {data.certificates && data.certificates.length > 0 ? (
// // // // //                 data.certificates.map((cert: any) => (
// // // // //                   <div key={cert._id} className="p-5 border-l-4 border-red-600 bg-red-50/40 rounded-r-2xl flex justify-between items-center group">
// // // // //                     <div>
// // // // //                       <p className="font-bold text-red-900 text-sm">{cert.courseId?.title}</p>
// // // // //                       <p className="text-[10px] text-red-700/60 font-mono tracking-widest uppercase mt-1">
// // // // //                         {cert.certificateCode || cert.certificateNumber}
// // // // //                       </p>
// // // // //                     </div>
// // // // //                     <button 
// // // // //                       onClick={() => handleDownloadPDF(cert._id)}
// // // // //                       className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-800 shadow-md flex items-center gap-2 transition-all active:scale-95"
// // // // //                     >
// // // // //                       <span>📥</span> PDF
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 ))
// // // // //               ) : (
// // // // //                 <div className="text-center py-10">
// // // // //                   <p className="text-gray-400 text-sm italic">Sertifikat belum tersedia atau belum diklaim.</p>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>

// // // // //         </div>
// // // // //       </div>
// // // // //     </Protected>
// // // // //   );
// // // // // }


// // // // // PENAMBAHAN DENGAN RBAC BARU


// // // // 'use client';

// // // // import { useEffect, useState } from 'react';
// // // // import { useParams, useRouter } from 'next/navigation';
// // // // import { api, getImageUrl } from '@/lib/api'; 
// // // // import Protected from '@/components/Protected';
// // // // import Link from 'next/link';

// // // // export default function AdminUserDetailPage() {
// // // //   const params = useParams();
// // // //   const userId = params?.userId || params?.id;
// // // //   const router = useRouter();
  
// // // //   const [data, setData] = useState<any>(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState<string | null>(null);

// // // //   useEffect(() => {
// // // //     if (!userId || typeof userId !== 'string') {
// // // //       setError("ID Pengguna tidak valid.");
// // // //       setLoading(false);
// // // //       return;
// // // //     }

// // // //     const fetchUserDetails = async () => {
// // // //       try {
// // // //         setLoading(true);
// // // //         setError(null);
// // // //         const res = await api(`/api/admin/users/${userId}/details`);
        
// // // //         if (res.success) {
// // // //           setData(res);
// // // //         } else {
// // // //           setError(res.error || "Gagal memuat data pengguna.");
// // // //         }
// // // //       } catch (err: any) {
// // // //         console.error("Fetch Detail Error:", err);
// // // //         setError(err.message || "Terjadi kesalahan saat mengambil data");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchUserDetails();
// // // //   }, [userId]);

// // // //   const handleDownloadPDF = (certId: string) => {
// // // //     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// // // //     window.open(`${baseUrl}/api/certificates/${certId}/pdf`, '_blank');
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
// // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
// // // //         <p className="text-gray-500 font-medium tracking-wide">Memuat Detail Pengguna...</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error || !data?.user) {
// // // //     return (
// // // //       <div className="p-20 text-center bg-gray-50 min-h-screen">
// // // //         <div className="text-red-500 text-5xl mb-4 text-center justify-center flex">⚠️</div>
// // // //         <p className="text-red-600 font-bold mb-4">{error || "User tidak ditemukan"}</p>
// // // //         <p className="text-xs text-gray-400 mb-6">ID: {userId || 'Tidak diketahui'}</p>
// // // //         <button onClick={() => router.back()} className="bg-white border border-gray-300 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">Kembali</button>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
// // // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
// // // //         {/* NAVIGASI ATAS */}
// // // //         <div className="flex items-center justify-between">
// // // //           <div className="flex items-center gap-4">
// // // //             <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200">
// // // //               <span className="text-2xl">←</span>
// // // //             </button>
// // // //             <h1 className="text-2xl font-bold text-gray-800">Profil Lengkap Pengguna</h1>
// // // //           </div>
// // // //           <Link href="/admin/users" className="text-sm font-bold text-red-700 hover:underline">Daftar User</Link>
// // // //         </div>

// // // //         {/* KARTU PROFIL UTAMA */}
// // // //         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
// // // //           <div className="flex flex-col md:flex-row items-center gap-8">
// // // //             <img 
// // // //               src={getImageUrl(data.user.avatarUrl) || '/default-avatar.png'} 
// // // //               className="w-28 h-28 rounded-full object-cover border border-gray-200 bg-gray-50"
// // // //               alt="Avatar"
// // // //               onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }}
// // // //             />
            
// // // //             <div className="flex-1 text-center md:text-left">
// // // //               <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1 justify-center md:justify-start">
// // // //                 <h2 className="text-3xl font-bold text-gray-900">{data.user.name}</h2>
// // // //                 {/* [BARU] Badge untuk ADMIN */}
// // // //                 <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
// // // //                   data.user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' :
// // // //                   data.user.role === 'ADMIN' ? 'bg-orange-100 text-orange-700' :
// // // //                   data.user.role === 'FACILITATOR' ? 'bg-blue-100 text-blue-700' :
// // // //                   'bg-green-100 text-green-700'
// // // //                 }`}>
// // // //                   {data.user.role}
// // // //                 </span>
// // // //               </div>
// // // //               <p className="text-gray-500 font-medium text-lg">{data.user.email}</p>
// // // //               <div className="flex gap-4 mt-2 justify-center md:justify-start text-xs text-gray-400">
// // // //                  <p className="uppercase tracking-widest">ID: {data.user._id}</p>
// // // //                  {data.user.regionScope && <p className="uppercase tracking-widest font-bold text-gray-500">• SCOPE: {data.user.regionScope}</p>}
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // // //           {/* KOLOM KIRI: SEJARAH PELATIHAN */}
// // // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // // //             <div className="flex justify-between items-center mb-6">
// // // //               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">📚 Riwayat Kursus</h3>
// // // //               <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-500">{data.history?.length || 0} Total</span>
// // // //             </div>
// // // //             <div className="space-y-4">
// // // //               {data.history && data.history.length > 0 ? (
// // // //                 data.history.map((item: any) => (
// // // //                   <div key={item._id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-red-100 transition-all group">
// // // //                     <div className="flex items-center gap-4">
// // // //                       <img 
// // // //                         src={getImageUrl(item.courseId?.thumbnailUrl) || '/course-placeholder.jpg'} 
// // // //                         className="w-12 h-12 rounded-xl object-cover bg-gray-200" 
// // // //                         alt=""
// // // //                         onError={(e) => { (e.target as HTMLImageElement).src = '/course-placeholder.jpg'; }}
// // // //                       />
// // // //                       <div>
// // // //                         <p className="font-bold text-gray-900 text-sm group-hover:text-red-700">{item.courseId?.title || 'Kursus'}</p>
// // // //                         <p className="text-[10px] text-gray-400">ID: {item.courseId?._id.substring(0,8)}...</p>
// // // //                       </div>
// // // //                     </div>
// // // //                     <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase ${item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
// // // //                       {item.completed ? 'LULUS' : 'PROSES'}
// // // //                     </span>
// // // //                   </div>
// // // //                 ))
// // // //               ) : (
// // // //                 <div className="text-center py-10"><p className="text-gray-400 text-sm italic">Belum ada aktivitas pelatihan.</p></div>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* KOLOM KANAN: SERTIFIKAT */}
// // // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // // //             <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">📜 Sertifikat Digital</h3>
// // // //             <div className="space-y-4">
// // // //               {data.certificates && data.certificates.length > 0 ? (
// // // //                 data.certificates.map((cert: any) => (
// // // //                   <div key={cert._id} className="p-5 border-l-4 border-red-600 bg-red-50/40 rounded-r-2xl flex justify-between items-center group">
// // // //                     <div>
// // // //                       <p className="font-bold text-red-900 text-sm">{cert.courseId?.title}</p>
// // // //                       <p className="text-[10px] text-red-700/60 font-mono tracking-widest uppercase mt-1">{cert.certificateCode || cert.certificateNumber}</p>
// // // //                     </div>
// // // //                     <button onClick={() => handleDownloadPDF(cert._id)} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-800 shadow-md flex items-center gap-2 transition-all active:scale-95">
// // // //                       <span>📥</span> PDF
// // // //                     </button>
// // // //                   </div>
// // // //                 ))
// // // //               ) : (
// // // //                 <div className="text-center py-10"><p className="text-gray-400 text-sm italic">Sertifikat belum tersedia.</p></div>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </Protected>
// // // //   );
// // // // }


// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { useParams, useRouter } from 'next/navigation';
// // // import { api, getImageUrl } from '@/lib/api'; 
// // // import Protected from '@/components/Protected';
// // // import Link from 'next/link';
// // // import { Settings, Save, MapPin, CheckSquare, Shield } from 'lucide-react';
// // // import RegionSelector from '@/components/admin/RegionSelector';

// // // // Definisi Permissions yang tersedia
// // // const AVAILABLE_PERMISSIONS = [
// // //     { id: 'manage_courses', label: 'Kelola Pelatihan (Courses)' },
// // //     { id: 'manage_users', label: 'Kelola Pengguna (Users)' },
// // //     { id: 'manage_blog', label: 'Kelola Blog & Berita' },
// // //     { id: 'manage_forum', label: 'Kelola Forum Diskusi' },
// // //     { id: 'manage_library', label: 'Kelola Pustaka Digital' },
// // //     { id: 'manage_certificates', label: 'Kelola Sertifikat' },
// // //     { id: 'view_reports', label: 'Lihat Laporan & Statistik' },
// // //     { id: 'manage_settings', label: 'Pengaturan Sistem' },
// // // ];

// // // export default function AdminUserDetailPage() {
// // //   const params = useParams();
// // //   const userId = params?.userId || params?.id;
// // //   const router = useRouter();
  
// // //   const [data, setData] = useState<any>(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);

// // //   // State untuk Edit Admin (Permissions & Region)
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [isSaving, setIsSaving] = useState(false);
// // //   const [permissions, setPermissions] = useState<string[]>([]);
// // //   const [regionConfig, setRegionConfig] = useState<any>({
// // //       scope: 'national',
// // //       provinces: [],
// // //       regencies: []
// // //   });

// // //   useEffect(() => {
// // //     if (!userId || typeof userId !== 'string') {
// // //       setError("ID Pengguna tidak valid.");
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     const fetchUserDetails = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const res = await api(`/api/admin/users/${userId}/details`);
        
// // //         if (res.success) {
// // //           setData(res);
// // //           // Inisialisasi state edit dari data user
// // //           if (res.user) {
// // //               setPermissions(res.user.permissions || []);
// // //               setRegionConfig({
// // //                   scope: res.user.regionScope || 'national',
// // //                   provinces: res.user.managedProvinces || [],
// // //                   regencies: res.user.managedRegencies || []
// // //               });
// // //           }
// // //         } else {
// // //           setError(res.error || "Gagal memuat data pengguna.");
// // //         }
// // //       } catch (err: any) {
// // //         console.error(err);
// // //         setError(err.message || "Terjadi kesalahan saat mengambil data");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchUserDetails();
// // //   }, [userId]);

// // //   const handleSaveAdminConfig = async () => {
// // //       setIsSaving(true);
// // //       try {
// // //           const payload = {
// // //               permissions: permissions,
// // //               regionScope: regionConfig.scope,
// // //               managedProvinces: regionConfig.provinces,
// // //               managedRegencies: regionConfig.regencies
// // //           };

// // //           await api(`/api/admin/users/${userId}`, { method: 'PATCH', body: payload });
          
// // //           alert("Konfigurasi Admin berhasil disimpan!");
// // //           setIsEditing(false);
// // //           // Refresh data lokal
// // //           setData((prev: any) => ({
// // //               ...prev,
// // //               user: { ...prev.user, ...payload }
// // //           }));

// // //       } catch (err: any) {
// // //           alert("Gagal menyimpan: " + err.message);
// // //       } finally {
// // //           setIsSaving(false);
// // //       }
// // //   };

// // //   const togglePermission = (id: string) => {
// // //       setPermissions(prev => 
// // //           prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
// // //       );
// // //   };

// // //   const handleDownloadPDF = (certId: string) => {
// // //     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// // //     window.open(`${baseUrl}/api/certificates/${certId}/pdf`, '_blank');
// // //   };

// // //   if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
// // //   if (error || !data?.user) return <div className="p-10 text-center">User tidak ditemukan.</div>;

// // //   const isUserAdmin = data.user.role === 'ADMIN';

// // //   return (
// // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
// // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
// // //         {/* NAVIGASI ATAS */}
// // //         <div className="flex items-center justify-between">
// // //           <div className="flex items-center gap-4">
// // //             <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200">
// // //               <span className="text-2xl">←</span>
// // //             </button>
// // //             <h1 className="text-2xl font-bold text-gray-800">Profil Lengkap Pengguna</h1>
// // //           </div>
// // //           <Link href="/admin/users" className="text-sm font-bold text-red-700 hover:underline">Daftar User</Link>
// // //         </div>

// // //         {/* KARTU PROFIL UTAMA */}
// // //         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
// // //           <div className="flex flex-col md:flex-row items-center gap-8">
// // //             <img 
// // //               src={getImageUrl(data.user.avatarUrl) || '/default-avatar.png'} 
// // //               className="w-28 h-28 rounded-full object-cover border border-gray-200 bg-gray-50"
// // //               alt="Avatar"
// // //               onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }}
// // //             />
            
// // //             <div className="flex-1 text-center md:text-left">
// // //               <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1 justify-center md:justify-start">
// // //                 <h2 className="text-3xl font-bold text-gray-900">{data.user.name}</h2>
// // //                 <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
// // //                   data.user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' :
// // //                   data.user.role === 'ADMIN' ? 'bg-orange-100 text-orange-700' :
// // //                   data.user.role === 'FACILITATOR' ? 'bg-blue-100 text-blue-700' :
// // //                   'bg-green-100 text-green-700'
// // //                 }`}>
// // //                   {data.user.role}
// // //                 </span>
// // //               </div>
// // //               <p className="text-gray-500 font-medium text-lg">{data.user.email}</p>
// // //               <div className="flex gap-4 mt-2 justify-center md:justify-start text-xs text-gray-400">
// // //                  <p className="uppercase tracking-widest">ID: {data.user._id}</p>
// // //                  {data.user.regionScope && <p className="uppercase tracking-widest font-bold text-gray-500">• SCOPE: {data.user.regionScope}</p>}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* --- KONFIGURASI ADMIN (HANYA MUNCUL JIKA USER ADALAH ADMIN) --- */}
// // //         {isUserAdmin && (
// // //             <div className="bg-white rounded-3xl shadow-lg border border-orange-200 overflow-hidden">
// // //                 <div className="bg-orange-50 p-6 border-b border-orange-100 flex justify-between items-center">
// // //                     <div>
// // //                         <h3 className="text-xl font-bold text-orange-900 flex items-center gap-2">
// // //                             <Shield size={24}/> Konfigurasi Hak Akses & Wilayah
// // //                         </h3>
// // //                         <p className="text-sm text-orange-700 mt-1">Atur wilayah kerja dan fitur apa saja yang boleh diakses oleh Admin ini.</p>
// // //                     </div>
// // //                     {!isEditing ? (
// // //                         <button onClick={() => setIsEditing(true)} className="bg-white text-orange-700 px-4 py-2 rounded-lg font-bold text-sm border border-orange-200 hover:bg-orange-100 shadow-sm flex items-center gap-2">
// // //                             <Settings size={16}/> Edit Akses
// // //                         </button>
// // //                     ) : (
// // //                         <div className="flex gap-2">
// // //                             <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg text-sm">Batal</button>
// // //                             <button onClick={handleSaveAdminConfig} disabled={isSaving} className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-orange-700 shadow-lg flex items-center gap-2 disabled:opacity-50">
// // //                                 <Save size={16}/> {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
// // //                             </button>
// // //                         </div>
// // //                     )}
// // //                 </div>

// // //                 <div className="p-8 space-y-8">
// // //                     {/* 1. REGION SELECTOR */}
// // //                     <div>
// // //                         <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
// // //                             <MapPin size={20} className="text-gray-400"/> Wilayah Kerja
// // //                         </h4>
// // //                         {isEditing ? (
// // //                             <RegionSelector value={regionConfig} onChange={setRegionConfig} />
// // //                         ) : (
// // //                             <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm text-gray-600">
// // //                                 <p className="mb-2"><span className="font-bold">Scope:</span> {data.user.regionScope?.toUpperCase()}</p>
// // //                                 {data.user.regionScope === 'province' && (
// // //                                     <p><span className="font-bold">Provinsi:</span> {data.user.managedProvinces?.length || 0} Terpilih</p>
// // //                                 )}
// // //                                 {data.user.regionScope === 'regency' && (
// // //                                     <p><span className="font-bold">Kabupaten/Kota:</span> {data.user.managedRegencies?.length || 0} Terpilih</p>
// // //                                 )}
// // //                             </div>
// // //                         )}
// // //                     </div>

// // //                     <hr className="border-gray-100"/>

// // //                     {/* 2. PERMISSIONS CHECKBOX */}
// // //                     <div>
// // //                         <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
// // //                             <CheckSquare size={20} className="text-gray-400"/> Hak Akses Fitur (Permissions)
// // //                         </h4>
// // //                         {isEditing ? (
// // //                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
// // //                                 {AVAILABLE_PERMISSIONS.map(perm => (
// // //                                     <label key={perm.id} className="flex items-center gap-3 p-3 border rounded-xl hover:bg-orange-50 cursor-pointer transition-colors bg-white">
// // //                                         <input 
// // //                                             type="checkbox" 
// // //                                             checked={permissions.includes(perm.id)} 
// // //                                             onChange={() => togglePermission(perm.id)}
// // //                                             className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
// // //                                         />
// // //                                         <span className="text-sm font-medium text-gray-700">{perm.label}</span>
// // //                                     </label>
// // //                                 ))}
// // //                             </div>
// // //                         ) : (
// // //                             <div className="flex flex-wrap gap-2">
// // //                                 {data.user.permissions && data.user.permissions.length > 0 ? (
// // //                                     data.user.permissions.map((p: string) => {
// // //                                         const label = AVAILABLE_PERMISSIONS.find(ap => ap.id === p)?.label || p;
// // //                                         return (
// // //                                             <span key={p} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
// // //                                                 {label}
// // //                                             </span>
// // //                                         );
// // //                                     })
// // //                                 ) : (
// // //                                     <p className="text-gray-400 text-sm italic">Belum ada hak akses khusus yang diberikan.</p>
// // //                                 )}
// // //                             </div>
// // //                         )}
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         )}

// // //         {/* RIWAYAT & SERTIFIKAT (TETAP SAMA SEPERTI SEBELUMNYA) */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // //           {/* KOLOM KIRI: SEJARAH PELATIHAN */}
// // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // //             <div className="flex justify-between items-center mb-6">
// // //               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">📚 Riwayat Kursus</h3>
// // //               <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-500">{data.history?.length || 0} Total</span>
// // //             </div>
// // //             <div className="space-y-4">
// // //               {data.history && data.history.length > 0 ? (
// // //                 data.history.map((item: any) => (
// // //                   <div key={item._id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-red-100 transition-all group">
// // //                     <div className="flex items-center gap-4">
// // //                       <img 
// // //                         src={getImageUrl(item.courseId?.thumbnailUrl) || '/course-placeholder.jpg'} 
// // //                         className="w-12 h-12 rounded-xl object-cover bg-gray-200" 
// // //                         alt=""
// // //                         onError={(e) => { (e.target as HTMLImageElement).src = '/course-placeholder.jpg'; }}
// // //                       />
// // //                       <div>
// // //                         <p className="font-bold text-gray-900 text-sm group-hover:text-red-700">{item.courseId?.title || 'Kursus'}</p>
// // //                         <p className="text-[10px] text-gray-400">ID: {item.courseId?._id.substring(0,8)}...</p>
// // //                       </div>
// // //                     </div>
// // //                     <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase ${item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
// // //                       {item.completed ? 'LULUS' : 'PROSES'}
// // //                     </span>
// // //                   </div>
// // //                 ))
// // //               ) : (
// // //                 <div className="text-center py-10"><p className="text-gray-400 text-sm italic">Belum ada aktivitas pelatihan.</p></div>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* KOLOM KANAN: SERTIFIKAT */}
// // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // //             <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">📜 Sertifikat Digital</h3>
// // //             <div className="space-y-4">
// // //               {data.certificates && data.certificates.length > 0 ? (
// // //                 data.certificates.map((cert: any) => (
// // //                   <div key={cert._id} className="p-5 border-l-4 border-red-600 bg-red-50/40 rounded-r-2xl flex justify-between items-center group">
// // //                     <div>
// // //                       <p className="font-bold text-red-900 text-sm">{cert.courseId?.title}</p>
// // //                       <p className="text-[10px] text-red-700/60 font-mono tracking-widest uppercase mt-1">{cert.certificateCode || cert.certificateNumber}</p>
// // //                     </div>
// // //                     <button onClick={() => handleDownloadPDF(cert._id)} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-800 shadow-md flex items-center gap-2 transition-all active:scale-95">
// // //                       <span>📥</span> PDF
// // //                     </button>
// // //                   </div>
// // //                 ))
// // //               ) : (
// // //                 <div className="text-center py-10"><p className="text-gray-400 text-sm italic">Sertifikat belum tersedia.</p></div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </Protected>
// // //   );
// // // }


// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import { api, getImageUrl } from '@/lib/api'; 
// // import Protected from '@/components/Protected';
// // import Link from 'next/link';
// // import { Settings, Save, MapPin, CheckSquare, Shield, AlertTriangle } from 'lucide-react';
// // import RegionSelector from '@/components/admin/RegionSelector';

// // // Definisi Permission di Frontend (Harus match dengan Backend Config)
// // const AVAILABLE_PERMISSIONS = [
// //     // Operasional
// //     { id: 'manage_courses', label: 'Kelola Pelatihan (Courses)', group: 'Operasional' },
// //     { id: 'verify_enrollments', label: 'Verifikasi Pendaftaran Peserta', group: 'Operasional' },
// //     { id: 'manage_certificates', label: 'Kelola Template Sertifikat', group: 'Operasional' },

// //     // User Management
// //     { id: 'manage_users', label: 'Kelola Pengguna (User Management)', group: 'User Management' },

// //     // Konten
// //     { id: 'manage_blog', label: 'Moderasi Blog & Berita', group: 'Konten' },
// //     { id: 'manage_forum', label: 'Moderasi Forum Diskusi', group: 'Konten' },
// //     { id: 'manage_library', label: 'Kelola Pustaka Digital', group: 'Konten' },

// //     // CMS Web
// //     { id: 'manage_cms_design', label: '🎨 Kelola Desain (Banner/Slider)', group: 'CMS Web' },
// //     { id: 'manage_cms_info', label: 'ℹ️ Kelola Informasi (Profil/Kontak)', group: 'CMS Web' },

// //     // Sistem
// //     { id: 'view_reports', label: '📊 Lihat Laporan Statistik', group: 'Sistem' },
// //     { id: 'manage_system_core', label: '⚙️ Pengaturan Inti (System Core)', group: 'Sistem', danger: true },
// // ];

// // export default function AdminUserDetailPage() {
// //   const params = useParams();
// //   const userId = params?.userId || params?.id;
// //   const router = useRouter();
  
// //   const [data, setData] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   // State Edit
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [isSaving, setIsSaving] = useState(false);
// //   const [permissions, setPermissions] = useState<string[]>([]);
// //   const [regionConfig, setRegionConfig] = useState<any>({
// //       scope: 'national',
// //       provinces: [],
// //       regencies: []
// //   });

// //   useEffect(() => {
// //     if (!userId || typeof userId !== 'string') {
// //       setError("ID Pengguna tidak valid.");
// //       setLoading(false);
// //       return;
// //     }

// //     const fetchUserDetails = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await api(`/api/admin/users/${userId}/details`);
        
// //         if (res.success) {
// //           setData(res);
// //           if (res.user) {
// //               setPermissions(res.user.permissions || []);
// //               setRegionConfig({
// //                   scope: res.user.regionScope || 'national',
// //                   provinces: res.user.managedProvinces || [],
// //                   regencies: res.user.managedRegencies || []
// //               });
// //           }
// //         } else {
// //           setError(res.error || "Gagal memuat data pengguna.");
// //         }
// //       } catch (err: any) {
// //         console.error(err);
// //         setError(err.message || "Terjadi kesalahan saat mengambil data");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUserDetails();
// //   }, [userId]);

// //   const handleSaveAdminConfig = async () => {
// //       setIsSaving(true);
// //       try {
// //           const payload = {
// //               permissions: permissions,
// //               regionScope: regionConfig.scope,
// //               managedProvinces: regionConfig.provinces,
// //               managedRegencies: regionConfig.regencies
// //           };

// //           await api(`/api/admin/users/${userId}`, { method: 'PATCH', body: payload });
          
// //           alert("Konfigurasi Admin berhasil disimpan!");
// //           setIsEditing(false);
// //           setData((prev: any) => ({
// //               ...prev,
// //               user: { ...prev.user, ...payload }
// //           }));

// //       } catch (err: any) {
// //           alert("Gagal menyimpan: " + err.message);
// //       } finally {
// //           setIsSaving(false);
// //       }
// //   };

// //   const togglePermission = (id: string) => {
// //       setPermissions(prev => 
// //           prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
// //       );
// //   };

// //   const handleDownloadPDF = (certId: string) => {
// //     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// //     window.open(`${baseUrl}/api/certificates/${certId}/pdf`, '_blank');
// //   };

// //   if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div></div>;
// //   if (error || !data?.user) return <div className="p-10 text-center">User tidak ditemukan.</div>;

// //   const isUserAdmin = data.user.role === 'ADMIN';
// //   const isSuperAdmin = data.user.role === 'SUPER_ADMIN'; // [BARU] Cek Super Admin

// //   // Helper untuk mendapatkan grup unik
// //   const permissionGroups = Array.from(new Set(AVAILABLE_PERMISSIONS.map(p => p.group)));

// //   return (
// //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
// //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
// //         {/* HEADER */}
// //         <div className="flex items-center justify-between">
// //           <div className="flex items-center gap-4">
// //             <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200">
// //               <span className="text-2xl">←</span>
// //             </button>
// //             <h1 className="text-2xl font-bold text-gray-800">Profil Lengkap Pengguna</h1>
// //           </div>
// //           <Link href="/admin/users" className="text-sm font-bold text-red-700 hover:underline">Daftar User</Link>
// //         </div>

// //         {/* KARTU PROFIL UTAMA */}
// //         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
// //           <div className="flex flex-col md:flex-row items-center gap-8">
// //             <img 
// //               src={getImageUrl(data.user.avatarUrl) || '/default-avatar.png'} 
// //               className="w-28 h-28 rounded-full object-cover border border-gray-200 bg-gray-50"
// //               alt="Avatar"
// //               onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }}
// //             />
            
// //             <div className="flex-1 text-center md:text-left">
// //               <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1 justify-center md:justify-start">
// //                 <h2 className="text-3xl font-bold text-gray-900">{data.user.name}</h2>
// //                 <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
// //                   data.user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' :
// //                   data.user.role === 'ADMIN' ? 'bg-orange-100 text-orange-700' :
// //                   data.user.role === 'FACILITATOR' ? 'bg-blue-100 text-blue-700' :
// //                   'bg-green-100 text-green-700'
// //                 }`}>
// //                   {data.user.role}
// //                 </span>
// //               </div>
// //               <p className="text-gray-500 font-medium text-lg">{data.user.email}</p>
// //               <div className="flex gap-4 mt-2 justify-center md:justify-start text-xs text-gray-400">
// //                  <p className="uppercase tracking-widest">ID: {data.user._id}</p>
// //                  {data.user.regionScope && <p className="uppercase tracking-widest font-bold text-gray-500">• SCOPE: {data.user.regionScope}</p>}
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* --- TAMPILAN KHUSUS SUPER ADMIN (GOD MODE) --- */}
// //         {isSuperAdmin && (
// //             <div className="bg-purple-50 rounded-3xl shadow-lg border border-purple-200 p-8 flex flex-col md:flex-row items-center gap-6">
// //                 <div className="p-4 bg-purple-100 text-purple-600 rounded-full shrink-0">
// //                     <Shield size={40} />
// //                 </div>
// //                 <div className="text-center md:text-left">
// //                     <h3 className="text-xl font-bold text-purple-900">Akses Super Admin (Unlimited)</h3>
// //                     <p className="text-sm text-purple-700 mt-1 leading-relaxed">
// //                         User ini memiliki akses penuh ke seluruh sistem, seluruh wilayah, dan seluruh fitur tanpa batasan (Bypass System).<br/>
// //                         Anda tidak perlu (dan tidak bisa) mengatur izin manual untuk Role ini.
// //                     </p>
// //                 </div>
// //             </div>
// //         )}

// //         {/* --- KONFIGURASI ADMIN BIASA (RBAC) --- */}
// //         {/* Hanya muncul jika role = ADMIN, dan BUKAN Super Admin */}
// //         {isUserAdmin && !isSuperAdmin && (
// //             <div className="bg-white rounded-3xl shadow-lg border border-orange-200 overflow-hidden">
// //                 <div className="bg-orange-50 p-6 border-b border-orange-100 flex justify-between items-center">
// //                     <div>
// //                         <h3 className="text-xl font-bold text-orange-900 flex items-center gap-2">
// //                             <Shield size={24}/> Konfigurasi Admin (RBAC)
// //                         </h3>
// //                         <p className="text-sm text-orange-700 mt-1">Atur wilayah kerja dan izin fitur spesifik.</p>
// //                     </div>
// //                     {!isEditing ? (
// //                         <button onClick={() => setIsEditing(true)} className="bg-white text-orange-700 px-4 py-2 rounded-lg font-bold text-sm border border-orange-200 hover:bg-orange-100 shadow-sm flex items-center gap-2">
// //                             <Settings size={16}/> Edit Akses
// //                         </button>
// //                     ) : (
// //                         <div className="flex gap-2">
// //                             <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg text-sm">Batal</button>
// //                             <button onClick={handleSaveAdminConfig} disabled={isSaving} className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-orange-700 shadow-lg flex items-center gap-2 disabled:opacity-50">
// //                                 <Save size={16}/> {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
// //                             </button>
// //                         </div>
// //                     )}
// //                 </div>

// //                 <div className="p-8 space-y-10">
// //                     {/* 1. REGION SELECTOR */}
// //                     <div>
// //                         <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
// //                             <MapPin size={20} className="text-gray-400"/> Wilayah Kerja
// //                         </h4>
// //                         {isEditing ? (
// //                             <RegionSelector value={regionConfig} onChange={setRegionConfig} />
// //                         ) : (
// //                             <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm text-gray-600">
// //                                 <p className="mb-2"><span className="font-bold">Scope:</span> {data.user.regionScope?.toUpperCase()}</p>
// //                                 {data.user.regionScope === 'province' && (
// //                                     <p><span className="font-bold">Provinsi:</span> {data.user.managedProvinces?.length || 0} Terpilih</p>
// //                                 )}
// //                                 {data.user.regionScope === 'regency' && (
// //                                     <p><span className="font-bold">Kabupaten/Kota:</span> {data.user.managedRegencies?.length || 0} Terpilih</p>
// //                                 )}
// //                             </div>
// //                         )}
// //                     </div>

// //                     <hr className="border-gray-100"/>

// //                     {/* 2. PERMISSIONS CHECKBOX (GROUPED) */}
// //                     <div>
// //                         <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
// //                             <CheckSquare size={20} className="text-gray-400"/> Hak Akses Fitur (Permissions)
// //                         </h4>
                        
// //                         {isEditing ? (
// //                             <div className="space-y-6">
// //                                 {permissionGroups.map(group => (
// //                                     <div key={group} className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
// //                                         <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-200 pb-2">{group}</h5>
// //                                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
// //                                             {AVAILABLE_PERMISSIONS.filter(p => p.group === group).map(perm => (
// //                                                 <label key={perm.id} className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all ${perm.danger ? 'bg-red-50 border-red-100 hover:bg-red-100' : 'bg-white hover:border-orange-300'}`}>
// //                                                     <input 
// //                                                         type="checkbox" 
// //                                                         checked={permissions.includes(perm.id)} 
// //                                                         onChange={() => togglePermission(perm.id)}
// //                                                         className={`mt-0.5 w-5 h-5 rounded focus:ring-2 ${perm.danger ? 'text-red-600 focus:ring-red-500' : 'text-orange-600 focus:ring-orange-500'}`}
// //                                                     />
// //                                                     <div>
// //                                                         <span className={`text-sm font-bold block ${perm.danger ? 'text-red-700' : 'text-gray-700'}`}>{perm.label}</span>
// //                                                         {perm.danger && <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1"><AlertTriangle size={10}/> Fitur Sensitif</p>}
// //                                                     </div>
// //                                                 </label>
// //                                             ))}
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         ) : (
// //                             <div className="flex flex-wrap gap-2">
// //                                 {data.user.permissions && data.user.permissions.length > 0 ? (
// //                                     data.user.permissions.map((p: string) => {
// //                                         const permDef = AVAILABLE_PERMISSIONS.find(ap => ap.id === p);
// //                                         const label = permDef?.label || p;
// //                                         const isDanger = permDef?.danger;
// //                                         return (
// //                                             <span key={p} className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${isDanger ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}`}>
// //                                                 {isDanger && <AlertTriangle size={10}/>} {label}
// //                                             </span>
// //                                         );
// //                                     })
// //                                 ) : (
// //                                     <p className="text-gray-400 text-sm italic bg-gray-50 px-4 py-2 rounded-lg w-full text-center border border-dashed">Belum ada hak akses khusus yang diberikan.</p>
// //                                 )}
// //                             </div>
// //                         )}
// //                     </div>
// //                 </div>
// //             </div>
// //         )}

// //         {/* DATA RIWAYAT & SERTIFIKAT */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //           {/* KOLOM KIRI: SEJARAH PELATIHAN */}
// //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// //             <div className="flex justify-between items-center mb-6">
// //               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">📚 Riwayat Kursus</h3>
// //               <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-500">{data.history?.length || 0} Total</span>
// //             </div>
// //             <div className="space-y-4">
// //               {data.history && data.history.length > 0 ? (
// //                 data.history.map((item: any) => (
// //                   <div key={item._id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-red-100 transition-all group">
// //                     <div className="flex items-center gap-4">
// //                       <img 
// //                         src={getImageUrl(item.courseId?.thumbnailUrl) || '/course-placeholder.jpg'} 
// //                         className="w-12 h-12 rounded-xl object-cover bg-gray-200" 
// //                         alt=""
// //                         onError={(e) => { (e.target as HTMLImageElement).src = '/course-placeholder.jpg'; }}
// //                       />
// //                       <div>
// //                         <p className="font-bold text-gray-900 text-sm group-hover:text-red-700">{item.courseId?.title || 'Kursus'}</p>
// //                         <p className="text-[10px] text-gray-400">ID: {item.courseId?._id.substring(0,8)}...</p>
// //                       </div>
// //                     </div>
// //                     <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase ${item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
// //                       {item.completed ? 'LULUS' : 'PROSES'}
// //                     </span>
// //                   </div>
// //                 ))
// //               ) : (
// //                 <div className="text-center py-10"><p className="text-gray-400 text-sm italic">Belum ada aktivitas pelatihan.</p></div>
// //               )}
// //             </div>
// //           </div>

// //           {/* KOLOM KANAN: SERTIFIKAT */}
// //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// //             <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">📜 Sertifikat Digital</h3>
// //             <div className="space-y-4">
// //               {data.certificates && data.certificates.length > 0 ? (
// //                 data.certificates.map((cert: any) => (
// //                   <div key={cert._id} className="p-5 border-l-4 border-red-600 bg-red-50/40 rounded-r-2xl flex justify-between items-center group">
// //                     <div>
// //                       <p className="font-bold text-red-900 text-sm">{cert.courseId?.title}</p>
// //                       <p className="text-[10px] text-red-700/60 font-mono tracking-widest uppercase mt-1">{cert.certificateCode || cert.certificateNumber}</p>
// //                     </div>
// //                     <button onClick={() => handleDownloadPDF(cert._id)} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-800 shadow-md flex items-center gap-2 transition-all active:scale-95">
// //                       <span>📥</span> PDF
// //                     </button>
// //                   </div>
// //                 ))
// //               ) : (
// //                 <div className="text-center py-10"><p className="text-gray-400 text-sm italic">Sertifikat belum tersedia.</p></div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </Protected>
// //   );
// // }

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { api, getImageUrl } from '@/lib/api'; 
// import Protected from '@/components/Protected';
// import Link from 'next/link';
// import { Settings, Save, MapPin, CheckSquare, Shield, AlertTriangle, KeyRound, User, Mail, ArrowLeft, Loader2 } from 'lucide-react';
// import RegionSelector from '@/components/admin/RegionSelector';

// // Definisi Permission
// const AVAILABLE_PERMISSIONS = [
//     { id: 'manage_courses', label: 'Kelola Pelatihan (Courses)', group: 'Operasional' },
//     { id: 'verify_enrollments', label: 'Verifikasi Pendaftaran Peserta', group: 'Operasional' },
//     { id: 'manage_certificates', label: 'Kelola Template Sertifikat', group: 'Operasional' },
//     { id: 'manage_users', label: 'Kelola Pengguna (User Management)', group: 'User Management' },
//     { id: 'manage_blog', label: 'Moderasi Blog & Berita', group: 'Konten' },
//     { id: 'manage_forum', label: 'Moderasi Forum Diskusi', group: 'Konten' },
//     { id: 'manage_library', label: 'Kelola Pustaka Digital', group: 'Konten' },
//     { id: 'manage_cms_design', label: '🎨 Kelola Desain (Banner/Slider)', group: 'CMS Web' },
//     { id: 'manage_cms_info', label: 'ℹ️ Kelola Informasi (Profil/Kontak)', group: 'CMS Web' },
//     { id: 'view_reports', label: '📊 Lihat Laporan Statistik', group: 'Sistem' },
//     { id: 'manage_system_core', label: '⚙️ Pengaturan Inti (System Core)', group: 'Sistem', danger: true },
// ];

// export default function AdminUserDetailPage() {
//   const params = useParams();
//   const userId = params?.userId || params?.id;
//   const router = useRouter();
  
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // State Edit
//   const [isEditing, setIsEditing] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
  
//   // State Form Data
//   const [currentName, setCurrentName] = useState('');
//   const [currentRole, setCurrentRole] = useState('');
//   const [permissions, setPermissions] = useState<string[]>([]);
//   const [regionConfig, setRegionConfig] = useState<any>({
//       scope: 'national',
//       provinces: [],
//       regencies: []
//   });

//   useEffect(() => {
//     if (!userId || typeof userId !== 'string') {
//       setError("ID Pengguna tidak valid.");
//       setLoading(false);
//       return;
//     }
//     loadData();
//   }, [userId]);

//   const loadData = async () => {
//     try {
//         setLoading(true);
//         const res = await api(`/api/admin/users/${userId}/details`);
        
//         if (res.success && res.user) {
//           setData(res);
//           setCurrentName(res.user.name);
//           setCurrentRole(res.user.role);
//           setPermissions(res.user.permissions || []);
//           setRegionConfig({
//               scope: res.user.regionScope || 'national',
//               provinces: res.user.managedProvinces || [],
//               regencies: res.user.managedRegencies || []
//           });
//         } else {
//           setError(res.error || "Gagal memuat data pengguna.");
//         }
//       } catch (err: any) {
//         console.error(err);
//         setError(err.message || "Terjadi kesalahan saat mengambil data");
//       } finally {
//         setLoading(false);
//       }
//   };

//   const handleSaveAll = async () => {
//       setIsSaving(true);
//       try {
//           const payload = {
//               name: currentName,
//               role: currentRole,
//               permissions: permissions,
//               regionScope: regionConfig.scope,
//               managedProvinces: regionConfig.provinces,
//               managedRegencies: regionConfig.regencies
//           };

//           await api(`/api/admin/users/${userId}`, { method: 'PATCH', body: payload });
          
//           alert("Data pengguna berhasil diperbarui!");
//           setIsEditing(false);
          
//           setData((prev: any) => ({
//               ...prev,
//               user: { ...prev.user, ...payload }
//           }));

//       } catch (err: any) {
//           alert("Gagal menyimpan: " + err.message);
//       } finally {
//           setIsSaving(false);
//       }
//   };

//   const handleResetPassword = async () => {
//       if (!confirm(`Yakin ingin mereset password user ini menjadi "123456"?`)) return;
//       try {
//           await api(`/api/admin/users/${userId}/reset-password`, { method: 'PATCH' });
//           alert("✅ Sukses! Password telah direset ke: 123456");
//       } catch (err: any) {
//           alert("Gagal reset password: " + err.message);
//       }
//   };

//   const togglePermission = (id: string) => {
//       setPermissions(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
//   };

//   if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
//   if (error || !data?.user) return <div className="p-10 text-center text-red-500 font-bold">{error || "User tidak ditemukan."}</div>;

//   const isUserAdmin = currentRole === 'ADMIN';
//   const isSuperAdmin = data.user.role === 'SUPER_ADMIN'; 

//   const permissionGroups = Array.from(new Set(AVAILABLE_PERMISSIONS.map(p => p.group)));

//   return (
//     <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
//       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
//         {/* HEADER */}
//         <div className="flex items-center justify-between sticky top-0 bg-gray-50/90 backdrop-blur-sm z-10 py-4 border-b border-gray-200">
//           <div className="flex items-center gap-4">
//             <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200" title="Kembali">
//               <ArrowLeft size={24}/>
//             </button>
//             <div>
//                  <h1 className="text-2xl font-bold text-gray-800">{data.user.name}</h1>
//                  <p className="text-xs text-gray-500">{data.user.email} • {data.user.memberType || 'UMUM'}</p>
//             </div>
//           </div>
//           <div className="flex gap-3">
//              <button 
//                 onClick={handleResetPassword}
//                 className="bg-orange-50 text-orange-700 border border-orange-200 px-4 py-2 rounded-xl font-bold text-sm hover:bg-orange-100 flex items-center gap-2 transition-all"
//                 title="Reset Password ke 123456"
//              >
//                 <KeyRound size={16}/> Reset Pass
//              </button>
             
//              {!isEditing ? (
//                  <button onClick={() => setIsEditing(true)} className="bg-red-700 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-red-800 flex items-center gap-2 shadow-lg">
//                     <Settings size={16}/> Edit Profil
//                  </button>
//              ) : (
//                  <div className="flex gap-2">
//                     <button onClick={() => { setIsEditing(false); loadData(); }} className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50">
//                         Batal
//                     </button>
//                     <button onClick={handleSaveAll} disabled={isSaving} className="bg-green-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-green-700 flex items-center gap-2 shadow-lg disabled:opacity-50">
//                         {isSaving ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>} Simpan
//                     </button>
//                  </div>
//              )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
//             {/* KOLOM KIRI: EDIT UTAMA */}
//             <div className="lg:col-span-2 space-y-8">
                
//                 {/* 1. INFORMASI DASAR (EDITABLE) */}
//                 <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
//                     <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-4">
//                         <User size={20} className="text-gray-400"/> Informasi Dasar
//                     </h3>
//                     <div className="grid grid-cols-1 gap-5">
//                          <div>
//                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Lengkap</label>
//                             {/* [FIX 1] Menambahkan aria-label */}
//                             <input 
//                                 disabled={!isEditing}
//                                 className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all disabled:text-gray-500"
//                                 value={currentName}
//                                 onChange={e => setCurrentName(e.target.value)}
//                                 aria-label="Nama Lengkap User"
//                                 title="Nama Lengkap User"
//                             />
//                          </div>
//                          <div>
//                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email (Login)</label>
//                             <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl text-gray-500 border border-gray-200">
//                                 <Mail size={16}/> {data.user.email}
//                             </div>
//                          </div>
//                          <div>
//                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role / Peran</label>
//                             {/* [FIX 2] Menambahkan aria-label */}
//                             <select 
//                                 disabled={!isEditing}
//                                 className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all disabled:text-gray-500 font-bold"
//                                 value={currentRole}
//                                 onChange={e => setCurrentRole(e.target.value)}
//                                 aria-label="Pilih Role User"
//                                 title="Pilih Role User"
//                             >
//                                 <option value="STUDENT">STUDENT (Peserta)</option>
//                                 <option value="FACILITATOR">FACILITATOR (Fasilitator)</option>
//                                 <option value="ADMIN">ADMIN (Admin Wilayah)</option>
//                                 <option value="SUPER_ADMIN">SUPER ADMIN</option>
//                             </select>
//                             <p className="text-[10px] text-gray-400 mt-1">*Ubah ke ADMIN untuk membuka pengaturan wilayah.</p>
//                          </div>
//                     </div>
//                 </div>

//                 {/* 2. KONFIGURASI ADMIN (Muncul jika Role = ADMIN) */}
//                 {isUserAdmin && !isSuperAdmin && (
//                     <div className="bg-white rounded-3xl shadow-lg border border-orange-200 overflow-hidden animate-in slide-in-from-top-4">
//                         <div className="bg-orange-50 p-6 border-b border-orange-100">
//                             <h3 className="text-lg font-bold text-orange-900 flex items-center gap-2">
//                                 <Shield size={20}/> Konfigurasi Admin Wilayah
//                             </h3>
//                         </div>
//                         <div className="p-8 space-y-8">
//                             {/* Region Selector */}
//                             <div>
//                                 <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm">
//                                     <MapPin size={16} className="text-gray-400"/> Cakupan Wilayah
//                                 </h4>
//                                 {isEditing ? (
//                                     <RegionSelector value={regionConfig} onChange={setRegionConfig} />
//                                 ) : (
//                                     <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm">
//                                         <p><span className="font-bold">Scope:</span> {regionConfig.scope.toUpperCase()}</p>
//                                         <p className="text-gray-500 text-xs mt-1">
//                                             {regionConfig.scope === 'regency' 
//                                                 ? `${regionConfig.regencies.length} Kabupaten Terpilih: ${regionConfig.regencies.join(', ')}`
//                                                 : regionConfig.scope === 'province'
//                                                 ? `${regionConfig.provinces.length} Provinsi Terpilih`
//                                                 : 'Seluruh Indonesia'}
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
                            
//                             <hr className="border-gray-100"/>

//                             {/* Permissions */}
//                             <div>
//                                 <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm">
//                                     <CheckSquare size={16} className="text-gray-400"/> Hak Akses Fitur
//                                 </h4>
//                                 {isEditing ? (
//                                     <div className="space-y-4">
//                                         {permissionGroups.map(group => (
//                                             <div key={group} className="bg-gray-50 p-4 rounded-xl">
//                                                 <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{group}</h5>
//                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                                                     {AVAILABLE_PERMISSIONS.filter(p => p.group === group).map(perm => (
//                                                         <label key={perm.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-white p-2 rounded transition-colors">
//                                                             <input type="checkbox" checked={permissions.includes(perm.id)} onChange={() => togglePermission(perm.id)} className="rounded text-red-600 focus:ring-red-500"/>
//                                                             <span className={perm.danger ? 'text-red-600 font-bold' : 'text-gray-700'}>{perm.label}</span>
//                                                         </label>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 ) : (
//                                     <div className="flex flex-wrap gap-2">
//                                         {permissions.map(p => (
//                                             <span key={p} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border font-medium">{p}</span>
//                                         ))}
//                                         {permissions.length === 0 && <span className="text-gray-400 text-xs italic">Tidak ada permission khusus.</span>}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* KOLOM KANAN: STATISTIK & HISTORY (Read Only) */}
//             <div className="space-y-6">
                
//                 {/* KARTU MEMBER INFO */}
//                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
//                      <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
//                         {/* [FIX 3] Menambahkan alt text */}
//                         <img 
//                             src={getImageUrl(data.user.avatarUrl)} 
//                             className="w-full h-full object-cover"
//                             alt={`${data.user.name} Avatar`}
//                         />
//                      </div>
//                      <h3 className="font-bold text-gray-800">{data.user.memberType}</h3>
//                      <p className="text-xs text-gray-400 mb-4">Bergabung: {new Date(data.user.createdAt).toLocaleDateString()}</p>
                     
//                      <div className="text-left text-xs bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-200">
//                         <div className="flex justify-between border-b pb-2">
//                             <span className="text-gray-500">NIA</span>
//                             <span className="font-mono font-bold">{data.user.memberData?.nia || '-'}</span>
//                         </div>
//                         <div className="flex justify-between border-b pb-2">
//                             <span className="text-gray-500">Unit</span>
//                             <span className="font-bold text-right">{data.user.memberData?.unit || '-'}</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="text-gray-500">Domisili</span>
//                             <span className="font-bold text-right">{data.user.memberData?.regency || '-'}</span>
//                         </div>
//                      </div>
//                 </div>

//                 {/* HISTORY KURSUS */}
//                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//                     <h3 className="font-bold text-gray-800 mb-4 text-sm flex justify-between">
//                         <span>Riwayat Kursus</span>
//                         <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{data.history?.length || 0}</span>
//                     </h3>
//                     <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
//                         {data.history?.length > 0 ? data.history.map((h:any) => (
//                              <div key={h._id} className="text-xs border-b pb-2 mb-2 last:border-0">
//                                 <p className="font-bold truncate">{h.courseId?.title}</p>
//                                 <div className="flex justify-between mt-1 text-gray-500">
//                                     <span>Progress: {h.progress}%</span>
//                                     <span className={h.completed ? 'text-green-600 font-bold' : 'text-orange-500'}>{h.completed ? 'Lulus' : 'Jalan'}</span>
//                                 </div>
//                              </div>
//                         )) : <p className="text-gray-400 text-xs italic">Kosong.</p>}
//                     </div>
//                 </div>

//             </div>
//         </div>

//       </div>
//     </Protected>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api, getImageUrl } from '@/lib/api'; 
import Protected from '@/components/Protected';
import { Settings, Save, MapPin, CheckSquare, Shield, AlertTriangle, KeyRound, User, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import RegionSelector from '@/components/admin/RegionSelector';

// Definisi Permission
const AVAILABLE_PERMISSIONS = [
    { id: 'manage_courses', label: 'Kelola Pelatihan (Courses)', group: 'Operasional' },
    { id: 'verify_enrollments', label: 'Verifikasi Pendaftaran Peserta', group: 'Operasional' },
    { id: 'manage_certificates', label: 'Kelola Template Sertifikat', group: 'Operasional' },
    { id: 'manage_users', label: 'Kelola Pengguna (User Management)', group: 'User Management' },
    { id: 'manage_blog', label: 'Moderasi Blog & Berita', group: 'Konten' },
    { id: 'manage_forum', label: 'Moderasi Forum Diskusi', group: 'Konten' },
    { id: 'manage_library', label: 'Kelola Pustaka Digital', group: 'Konten' },
    { id: 'manage_cms_design', label: '🎨 Kelola Desain (Banner/Slider)', group: 'CMS Web' },
    { id: 'manage_cms_info', label: 'ℹ️ Kelola Informasi (Profil/Kontak)', group: 'CMS Web' },
    { id: 'view_reports', label: '📊 Lihat Laporan Statistik', group: 'Sistem' },
    { id: 'manage_system_core', label: '⚙️ Pengaturan Inti (System Core)', group: 'Sistem', danger: true },
];

export default function AdminUserDetailPage() {
  const params = useParams();
  const userId = params?.userId || params?.id;
  const router = useRouter();
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // State Form
  const [currentName, setCurrentName] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);
  
  // [BARU] State Banned
  const [isBanned, setIsBanned] = useState(false);
  const [bannedReason, setBannedReason] = useState('');

  const [regionConfig, setRegionConfig] = useState<any>({ scope: 'national', provinces: [], regencies: [] });

  useEffect(() => {
    if (!userId || typeof userId !== 'string') { setError("ID Pengguna tidak valid."); setLoading(false); return; }
    loadData();
  }, [userId]);

  const loadData = async () => {
    try {
        setLoading(true);
        const res = await api(`/api/admin/users/${userId}/details`);
        if (res.success && res.user) {
          setData(res);
          setCurrentName(res.user.name);
          setCurrentRole(res.user.role);
          setPermissions(res.user.permissions || []);
          
          // Load Status Banned
          setIsBanned(res.user.isBanned || false);
          setBannedReason(res.user.bannedReason || '');

          setRegionConfig({
              scope: res.user.regionScope || 'national',
              provinces: res.user.managedProvinces || [],
              regencies: res.user.managedRegencies || []
          });
        } else { setError(res.error || "Gagal memuat data."); }
      } catch (err: any) { setError(err.message || "Terjadi kesalahan"); } finally { setLoading(false); }
  };

  const handleSaveAll = async () => {
      setIsSaving(true);
      try {
          const payload = {
              name: currentName,
              role: currentRole,
              permissions: permissions,
              regionScope: regionConfig.scope,
              managedProvinces: regionConfig.provinces,
              managedRegencies: regionConfig.regencies,
              // Kirim status banned
              isBanned: isBanned,
              bannedReason: bannedReason
          };
          await api(`/api/admin/users/${userId}`, { method: 'PATCH', body: payload });
          alert("Data pengguna berhasil diperbarui!");
          setIsEditing(false);
          loadData(); // Refresh agar data sinkron
      } catch (err: any) { alert("Gagal menyimpan: " + err.message); } finally { setIsSaving(false); }
  };

  const togglePermission = (id: string) => {
      setPermissions(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const handleResetPassword = async () => {
      if (!confirm(`Reset password user ini menjadi "123456"?`)) return;
      try {
          await api(`/api/admin/users/${userId}/reset-password`, { method: 'PATCH' });
          alert("✅ Sukses! Password telah direset.");
      } catch (err: any) { alert("Gagal: " + err.message); }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
  if (error || !data?.user) return <div className="p-10 text-center text-red-500 font-bold">{error || "User tidak ditemukan."}</div>;

  const isUserAdmin = currentRole === 'ADMIN';
  const isSuperAdmin = data.user.role === 'SUPER_ADMIN'; 
  const permissionGroups = Array.from(new Set(AVAILABLE_PERMISSIONS.map(p => p.group)));

  return (
    <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
      <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        <div className="flex items-center justify-between sticky top-0 bg-gray-50/90 backdrop-blur-sm z-10 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200" title="Kembali" aria-label="Kembali"><ArrowLeft size={24}/></button>
            <div><h1 className="text-2xl font-bold text-gray-800">{data.user.name}</h1><p className="text-xs text-gray-500">{data.user.email} • {data.user.memberType || 'UMUM'}</p></div>
          </div>
          <div className="flex gap-3">
             <button onClick={handleResetPassword} className="bg-orange-50 text-orange-700 border border-orange-200 px-4 py-2 rounded-xl font-bold text-sm hover:bg-orange-100 flex items-center gap-2"><KeyRound size={16}/> Reset Pass</button>
             {!isEditing ? (
                 <button onClick={() => setIsEditing(true)} className="bg-red-700 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-red-800 flex items-center gap-2 shadow-lg"><Settings size={16}/> Edit Profil</button>
             ) : (
                 <div className="flex gap-2">
                    <button onClick={() => { setIsEditing(false); loadData(); }} className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50">Batal</button>
                    <button onClick={handleSaveAll} disabled={isSaving} className="bg-green-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-green-700 flex items-center gap-2 shadow-lg disabled:opacity-50">{isSaving ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>} Simpan</button>
                 </div>
             )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                
                {/* 1. INFORMASI DASAR */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-4"><User size={20} className="text-gray-400"/> Informasi Dasar</h3>
                    <div className="grid grid-cols-1 gap-5">
                         <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Lengkap</label><input disabled={!isEditing} className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all disabled:text-gray-500" value={currentName} onChange={e => setCurrentName(e.target.value)} aria-label="Nama Lengkap"/></div>
                         <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label><div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl text-gray-500 border border-gray-200"><Mail size={16}/> {data.user.email}</div></div>
                         <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role / Peran</label><select disabled={!isEditing} className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none font-bold" value={currentRole} onChange={e => setCurrentRole(e.target.value)} aria-label="Pilih Role"><option value="STUDENT">STUDENT</option><option value="FACILITATOR">FACILITATOR</option><option value="ADMIN">ADMIN</option><option value="SUPER_ADMIN">SUPER ADMIN</option></select></div>
                    </div>
                </div>

                {/* 2. [KEMBALI] STATUS KEAMANAN (BANNED) */}
                <div className="bg-white rounded-3xl shadow-sm border border-red-100 p-8">
                     <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><AlertTriangle size={20} className="text-red-500"/> Status Keamanan</h3>
                     <div className="flex items-center gap-4 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                disabled={!isEditing}
                                checked={isBanned} 
                                onChange={e => setIsBanned(e.target.checked)} 
                                className="w-5 h-5 text-red-600 rounded focus:ring-red-500 disabled:opacity-50"
                            />
                            <span className={`font-bold ${isBanned ? 'text-red-600' : 'text-gray-700'}`}>Bekukan Akun (Banned)</span>
                        </label>
                     </div>
                     {isBanned && (
                        <input 
                            disabled={!isEditing}
                            className="w-full p-3 border border-red-200 bg-red-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500" 
                            placeholder="Alasan pembekuan (wajib diisi)..."
                            value={bannedReason}
                            onChange={e => setBannedReason(e.target.value)}
                        />
                     )}
                     {/* Info Status */}
                     {!isEditing && (
                         <div className={`mt-2 p-3 rounded-lg text-sm font-bold border ${isBanned ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}`}>
                             STATUS: {isBanned ? `DIBEKUKAN (${bannedReason || 'Tanpa alasan'})` : 'AKTIF'}
                         </div>
                     )}
                </div>

                {/* 3. KONFIGURASI ADMIN */}
                {isUserAdmin && !isSuperAdmin && (
                    <div className="bg-white rounded-3xl shadow-lg border border-orange-200 overflow-hidden animate-in slide-in-from-top-4">
                        <div className="bg-orange-50 p-6 border-b border-orange-100"><h3 className="text-lg font-bold text-orange-900 flex items-center gap-2"><Shield size={20}/> Konfigurasi Admin Wilayah</h3></div>
                        <div className="p-8 space-y-8">
                            <div>
                                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm"><MapPin size={16} className="text-gray-400"/> Cakupan Wilayah</h4>
                                {isEditing ? (<RegionSelector value={regionConfig} onChange={setRegionConfig} />) : (<div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm"><p><span className="font-bold">Scope:</span> {regionConfig.scope.toUpperCase()}</p></div>)}
                            </div>
                            <hr className="border-gray-100"/>
                            <div>
                                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm"><CheckSquare size={16} className="text-gray-400"/> Hak Akses Fitur</h4>
                                {isEditing ? (
                                    <div className="space-y-4">{permissionGroups.map(group => (<div key={group} className="bg-gray-50 p-4 rounded-xl"><h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{group}</h5><div className="grid grid-cols-1 md:grid-cols-2 gap-2">{AVAILABLE_PERMISSIONS.filter(p => p.group === group).map(perm => (<label key={perm.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-white p-2 rounded transition-colors"><input type="checkbox" checked={permissions.includes(perm.id)} onChange={() => togglePermission(perm.id)} className="rounded text-red-600 focus:ring-red-500"/><span className={perm.danger ? 'text-red-600 font-bold' : 'text-gray-700'}>{perm.label}</span></label>))}</div></div>))}</div>
                                ) : (
                                    <div className="flex flex-wrap gap-2">{permissions.map(p => (<span key={p} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border font-medium">{p}</span>))}{permissions.length === 0 && <span className="text-gray-400 text-xs italic">Tidak ada permission.</span>}</div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
                     <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md"><img src={getImageUrl(data.user.avatarUrl)} className="w-full h-full object-cover" alt="Av"/></div>
                     <h3 className="font-bold text-gray-800">{data.user.memberType}</h3>
                     <p className="text-xs text-gray-400 mb-4">Join: {new Date(data.user.createdAt).toLocaleDateString()}</p>
                     <div className="text-left text-xs bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-200"><div className="flex justify-between border-b pb-2"><span>NIA</span><span className="font-mono font-bold">{data.user.memberData?.nia || '-'}</span></div><div className="flex justify-between"><span>Unit</span><span className="font-bold text-right">{data.user.memberData?.unit || '-'}</span></div></div>
                </div>
            </div>
        </div>
      </div>
    </Protected>
  );
}
// // // // // // // // // 'use client';

// // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // // import { api, getImageUrl } from '@/lib/api'; 
// // // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // // import Link from 'next/link';

// // // // // // // // // export default function AdminUserDetailPage() {
// // // // // // // // //   const params = useParams();
// // // // // // // // //   // Mendukung nama folder [id] maupun [userId]
// // // // // // // // //   const userId = params?.userId || params?.id;
  
// // // // // // // // //   const router = useRouter();
  
// // // // // // // // //   const [data, setData] = useState<any>(null);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (!userId || typeof userId !== 'string') {
// // // // // // // // //       console.error("ID Pengguna tidak valid.");
// // // // // // // // //       setError("ID Pengguna tidak valid.");
// // // // // // // // //       setLoading(false);
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     const fetchUserDetails = async () => {
// // // // // // // // //       try {
// // // // // // // // //         setLoading(true);
// // // // // // // // //         setError(null);
        
// // // // // // // // //         const res = await api(`/api/admin/users/${userId}/details`);
        
// // // // // // // // //         if (res.success) {
// // // // // // // // //           setData(res);
// // // // // // // // //         } else {
// // // // // // // // //           setError(res.error || "Gagal memuat data pengguna.");
// // // // // // // // //         }
// // // // // // // // //       } catch (err: any) {
// // // // // // // // //         console.error("Fetch Detail Error:", err);
// // // // // // // // //         setError(err.message || "Terjadi kesalahan saat mengambil data");
// // // // // // // // //       } finally {
// // // // // // // // //         setLoading(false);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     fetchUserDetails();
// // // // // // // // //   }, [userId]);

// // // // // // // // //   const handleDownloadPDF = (certId: string) => {
// // // // // // // // //     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// // // // // // // // //     window.open(`${baseUrl}/api/certificates/${certId}/pdf`, '_blank');
// // // // // // // // //   };

// // // // // // // // //   if (loading) {
// // // // // // // // //     return (
// // // // // // // // //       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
// // // // // // // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
// // // // // // // // //         <p className="text-gray-500 font-medium tracking-wide">Memuat Detail Pengguna...</p>
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   if (error || !data?.user) {
// // // // // // // // //     return (
// // // // // // // // //       <div className="p-20 text-center bg-gray-50 min-h-screen">
// // // // // // // // //         <div className="text-red-500 text-5xl mb-4 text-center justify-center flex">⚠️</div>
// // // // // // // // //         <p className="text-red-600 font-bold mb-4">{error || "User tidak ditemukan"}</p>
// // // // // // // // //         <p className="text-xs text-gray-400 mb-6">ID: {userId || 'Tidak diketahui'}</p>
// // // // // // // // //         <button 
// // // // // // // // //           onClick={() => router.back()} 
// // // // // // // // //           className="bg-white border border-gray-300 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
// // // // // // // // //         >
// // // // // // // // //           Kembali
// // // // // // // // //         </button>
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // // // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
// // // // // // // // //         {/* NAVIGASI ATAS */}
// // // // // // // // //         <div className="flex items-center justify-between">
// // // // // // // // //           <div className="flex items-center gap-4">
// // // // // // // // //             <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200">
// // // // // // // // //               <span className="text-2xl">←</span>
// // // // // // // // //             </button>
// // // // // // // // //             <h1 className="text-2xl font-bold text-gray-800">Profil Lengkap Pengguna</h1>
// // // // // // // // //           </div>
// // // // // // // // //           <Link href="/admin/users" className="text-sm font-bold text-red-700 hover:underline">
// // // // // // // // //             Daftar User
// // // // // // // // //           </Link>
// // // // // // // // //         </div>

// // // // // // // // //         {/* KARTU PROFIL UTAMA (Versi Clean - Tanpa Header Merah) */}
// // // // // // // // //         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
// // // // // // // // //           <div className="flex flex-col md:flex-row items-center gap-8">
// // // // // // // // //             {/* Avatar */}
// // // // // // // // //             <img 
// // // // // // // // //               src={getImageUrl(data.user.avatarUrl) || '/default-avatar.png'} 
// // // // // // // // //               className="w-28 h-28 rounded-full object-cover border border-gray-200 bg-gray-50"
// // // // // // // // //               alt="Avatar"
// // // // // // // // //               onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }}
// // // // // // // // //             />
            
// // // // // // // // //             {/* Info User */}
// // // // // // // // //             <div className="flex-1 text-center md:text-left">
// // // // // // // // //               <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1 justify-center md:justify-start">
// // // // // // // // //                 <h2 className="text-3xl font-bold text-gray-900">{data.user.name}</h2>
// // // // // // // // //                 <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
// // // // // // // // //                   data.user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' :
// // // // // // // // //                   data.user.role === 'FACILITATOR' ? 'bg-blue-100 text-blue-700' :
// // // // // // // // //                   'bg-green-100 text-green-700'
// // // // // // // // //                 }`}>
// // // // // // // // //                   {data.user.role}
// // // // // // // // //                 </span>
// // // // // // // // //               </div>
// // // // // // // // //               <p className="text-gray-500 font-medium text-lg">{data.user.email}</p>
// // // // // // // // //               <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">ID: {data.user._id}</p>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>

// // // // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
// // // // // // // // //           {/* KOLOM KIRI: SEJARAH PELATIHAN */}
// // // // // // // // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // // // // // // // //             <div className="flex justify-between items-center mb-6">
// // // // // // // // //               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
// // // // // // // // //                 📚 Riwayat Kursus
// // // // // // // // //               </h3>
// // // // // // // // //               <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-500">
// // // // // // // // //                 {data.history?.length || 0} Total
// // // // // // // // //               </span>
// // // // // // // // //             </div>

// // // // // // // // //             <div className="space-y-4">
// // // // // // // // //               {data.history && data.history.length > 0 ? (
// // // // // // // // //                 data.history.map((item: any) => (
// // // // // // // // //                   <div key={item._id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-red-100 transition-all group">
// // // // // // // // //                     <div className="flex items-center gap-4">
// // // // // // // // //                       <img 
// // // // // // // // //                         src={getImageUrl(item.courseId?.thumbnailUrl) || '/course-placeholder.jpg'} 
// // // // // // // // //                         className="w-12 h-12 rounded-xl object-cover bg-gray-200" 
// // // // // // // // //                         alt=""
// // // // // // // // //                         onError={(e) => { (e.target as HTMLImageElement).src = '/course-placeholder.jpg'; }}
// // // // // // // // //                       />
// // // // // // // // //                       <div>
// // // // // // // // //                         <p className="font-bold text-gray-900 text-sm group-hover:text-red-700">{item.courseId?.title || 'Kursus'}</p>
// // // // // // // // //                         <p className="text-[10px] text-gray-400">ID: {item.courseId?._id.substring(0,8)}...</p>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase ${
// // // // // // // // //                       item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
// // // // // // // // //                     }`}>
// // // // // // // // //                       {item.completed ? 'LULUS' : 'PROSES'}
// // // // // // // // //                     </span>
// // // // // // // // //                   </div>
// // // // // // // // //                 ))
// // // // // // // // //               ) : (
// // // // // // // // //                 <div className="text-center py-10">
// // // // // // // // //                   <p className="text-gray-400 text-sm italic">Belum ada aktivitas pelatihan yang tercatat.</p>
// // // // // // // // //                 </div>
// // // // // // // // //               )}
// // // // // // // // //             </div>
// // // // // // // // //           </div>

// // // // // // // // //           {/* KOLOM KANAN: SERTIFIKAT */}
// // // // // // // // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // // // // // // // //             <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
// // // // // // // // //               📜 Sertifikat Digital
// // // // // // // // //             </h3>
// // // // // // // // //             <div className="space-y-4">
// // // // // // // // //               {data.certificates && data.certificates.length > 0 ? (
// // // // // // // // //                 data.certificates.map((cert: any) => (
// // // // // // // // //                   <div key={cert._id} className="p-5 border-l-4 border-red-600 bg-red-50/40 rounded-r-2xl flex justify-between items-center group">
// // // // // // // // //                     <div>
// // // // // // // // //                       <p className="font-bold text-red-900 text-sm">{cert.courseId?.title}</p>
// // // // // // // // //                       <p className="text-[10px] text-red-700/60 font-mono tracking-widest uppercase mt-1">
// // // // // // // // //                         {cert.certificateCode || cert.certificateNumber}
// // // // // // // // //                       </p>
// // // // // // // // //                     </div>
// // // // // // // // //                     <button 
// // // // // // // // //                       onClick={() => handleDownloadPDF(cert._id)}
// // // // // // // // //                       className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-800 shadow-md flex items-center gap-2 transition-all active:scale-95"
// // // // // // // // //                     >
// // // // // // // // //                       <span>📥</span> PDF
// // // // // // // // //                     </button>
// // // // // // // // //                   </div>
// // // // // // // // //                 ))
// // // // // // // // //               ) : (
// // // // // // // // //                 <div className="text-center py-10">
// // // // // // // // //                   <p className="text-gray-400 text-sm italic">Sertifikat belum tersedia atau belum diklaim.</p>
// // // // // // // // //                 </div>
// // // // // // // // //               )}
// // // // // // // // //             </div>
// // // // // // // // //           </div>

// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </Protected>
// // // // // // // // //   );
// // // // // // // // // }


// // // // // // // // // PENAMBAHAN DENGAN RBAC BARU


// // // // // // // // 'use client';

// // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // // import { api, getImageUrl } from '@/lib/api'; 
// // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // import Link from 'next/link';

// // // // // // // // export default function AdminUserDetailPage() {
// // // // // // // //   const params = useParams();
// // // // // // // //   const userId = params?.userId || params?.id;
// // // // // // // //   const router = useRouter();
  
// // // // // // // //   const [data, setData] = useState<any>(null);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!userId || typeof userId !== 'string') {
// // // // // // // //       setError("ID Pengguna tidak valid.");
// // // // // // // //       setLoading(false);
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     const fetchUserDetails = async () => {
// // // // // // // //       try {
// // // // // // // //         setLoading(true);
// // // // // // // //         setError(null);
// // // // // // // //         const res = await api(`/api/admin/users/${userId}/details`);
        
// // // // // // // //         if (res.success) {
// // // // // // // //           setData(res);
// // // // // // // //         } else {
// // // // // // // //           setError(res.error || "Gagal memuat data pengguna.");
// // // // // // // //         }
// // // // // // // //       } catch (err: any) {
// // // // // // // //         console.error("Fetch Detail Error:", err);
// // // // // // // //         setError(err.message || "Terjadi kesalahan saat mengambil data");
// // // // // // // //       } finally {
// // // // // // // //         setLoading(false);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     fetchUserDetails();
// // // // // // // //   }, [userId]);

// // // // // // // //   const handleDownloadPDF = (certId: string) => {
// // // // // // // //     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// // // // // // // //     window.open(`${baseUrl}/api/certificates/${certId}/pdf`, '_blank');
// // // // // // // //   };

// // // // // // // //   if (loading) {
// // // // // // // //     return (
// // // // // // // //       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
// // // // // // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
// // // // // // // //         <p className="text-gray-500 font-medium tracking-wide">Memuat Detail Pengguna...</p>
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   if (error || !data?.user) {
// // // // // // // //     return (
// // // // // // // //       <div className="p-20 text-center bg-gray-50 min-h-screen">
// // // // // // // //         <div className="text-red-500 text-5xl mb-4 text-center justify-center flex">⚠️</div>
// // // // // // // //         <p className="text-red-600 font-bold mb-4">{error || "User tidak ditemukan"}</p>
// // // // // // // //         <p className="text-xs text-gray-400 mb-6">ID: {userId || 'Tidak diketahui'}</p>
// // // // // // // //         <button onClick={() => router.back()} className="bg-white border border-gray-300 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">Kembali</button>
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
// // // // // // // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
// // // // // // // //         {/* NAVIGASI ATAS */}
// // // // // // // //         <div className="flex items-center justify-between">
// // // // // // // //           <div className="flex items-center gap-4">
// // // // // // // //             <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200">
// // // // // // // //               <span className="text-2xl">←</span>
// // // // // // // //             </button>
// // // // // // // //             <h1 className="text-2xl font-bold text-gray-800">Profil Lengkap Pengguna</h1>
// // // // // // // //           </div>
// // // // // // // //           <Link href="/admin/users" className="text-sm font-bold text-red-700 hover:underline">Daftar User</Link>
// // // // // // // //         </div>

// // // // // // // //         {/* KARTU PROFIL UTAMA */}
// // // // // // // //         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
// // // // // // // //           <div className="flex flex-col md:flex-row items-center gap-8">
// // // // // // // //             <img 
// // // // // // // //               src={getImageUrl(data.user.avatarUrl) || '/default-avatar.png'} 
// // // // // // // //               className="w-28 h-28 rounded-full object-cover border border-gray-200 bg-gray-50"
// // // // // // // //               alt="Avatar"
// // // // // // // //               onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }}
// // // // // // // //             />
            
// // // // // // // //             <div className="flex-1 text-center md:text-left">
// // // // // // // //               <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1 justify-center md:justify-start">
// // // // // // // //                 <h2 className="text-3xl font-bold text-gray-900">{data.user.name}</h2>
// // // // // // // //                 {/* [BARU] Badge untuk ADMIN */}
// // // // // // // //                 <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
// // // // // // // //                   data.user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' :
// // // // // // // //                   data.user.role === 'ADMIN' ? 'bg-orange-100 text-orange-700' :
// // // // // // // //                   data.user.role === 'FACILITATOR' ? 'bg-blue-100 text-blue-700' :
// // // // // // // //                   'bg-green-100 text-green-700'
// // // // // // // //                 }`}>
// // // // // // // //                   {data.user.role}
// // // // // // // //                 </span>
// // // // // // // //               </div>
// // // // // // // //               <p className="text-gray-500 font-medium text-lg">{data.user.email}</p>
// // // // // // // //               <div className="flex gap-4 mt-2 justify-center md:justify-start text-xs text-gray-400">
// // // // // // // //                  <p className="uppercase tracking-widest">ID: {data.user._id}</p>
// // // // // // // //                  {data.user.regionScope && <p className="uppercase tracking-widest font-bold text-gray-500">• SCOPE: {data.user.regionScope}</p>}
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // // // // // // //           {/* KOLOM KIRI: SEJARAH PELATIHAN */}
// // // // // // // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // // // // // // //             <div className="flex justify-between items-center mb-6">
// // // // // // // //               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">📚 Riwayat Kursus</h3>
// // // // // // // //               <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-500">{data.history?.length || 0} Total</span>
// // // // // // // //             </div>
// // // // // // // //             <div className="space-y-4">
// // // // // // // //               {data.history && data.history.length > 0 ? (
// // // // // // // //                 data.history.map((item: any) => (
// // // // // // // //                   <div key={item._id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-red-100 transition-all group">
// // // // // // // //                     <div className="flex items-center gap-4">
// // // // // // // //                       <img 
// // // // // // // //                         src={getImageUrl(item.courseId?.thumbnailUrl) || '/course-placeholder.jpg'} 
// // // // // // // //                         className="w-12 h-12 rounded-xl object-cover bg-gray-200" 
// // // // // // // //                         alt=""
// // // // // // // //                         onError={(e) => { (e.target as HTMLImageElement).src = '/course-placeholder.jpg'; }}
// // // // // // // //                       />
// // // // // // // //                       <div>
// // // // // // // //                         <p className="font-bold text-gray-900 text-sm group-hover:text-red-700">{item.courseId?.title || 'Kursus'}</p>
// // // // // // // //                         <p className="text-[10px] text-gray-400">ID: {item.courseId?._id.substring(0,8)}...</p>
// // // // // // // //                       </div>
// // // // // // // //                     </div>
// // // // // // // //                     <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase ${item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
// // // // // // // //                       {item.completed ? 'LULUS' : 'PROSES'}
// // // // // // // //                     </span>
// // // // // // // //                   </div>
// // // // // // // //                 ))
// // // // // // // //               ) : (
// // // // // // // //                 <div className="text-center py-10"><p className="text-gray-400 text-sm italic">Belum ada aktivitas pelatihan.</p></div>
// // // // // // // //               )}
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           {/* KOLOM KANAN: SERTIFIKAT */}
// // // // // // // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // // // // // // //             <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">📜 Sertifikat Digital</h3>
// // // // // // // //             <div className="space-y-4">
// // // // // // // //               {data.certificates && data.certificates.length > 0 ? (
// // // // // // // //                 data.certificates.map((cert: any) => (
// // // // // // // //                   <div key={cert._id} className="p-5 border-l-4 border-red-600 bg-red-50/40 rounded-r-2xl flex justify-between items-center group">
// // // // // // // //                     <div>
// // // // // // // //                       <p className="font-bold text-red-900 text-sm">{cert.courseId?.title}</p>
// // // // // // // //                       <p className="text-[10px] text-red-700/60 font-mono tracking-widest uppercase mt-1">{cert.certificateCode || cert.certificateNumber}</p>
// // // // // // // //                     </div>
// // // // // // // //                     <button onClick={() => handleDownloadPDF(cert._id)} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-800 shadow-md flex items-center gap-2 transition-all active:scale-95">
// // // // // // // //                       <span>📥</span> PDF
// // // // // // // //                     </button>
// // // // // // // //                   </div>
// // // // // // // //                 ))
// // // // // // // //               ) : (
// // // // // // // //                 <div className="text-center py-10"><p className="text-gray-400 text-sm italic">Sertifikat belum tersedia.</p></div>
// // // // // // // //               )}
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </Protected>
// // // // // // // //   );
// // // // // // // // }


// // // // // // // 'use client';

// // // // // // // import { useEffect, useState } from 'react';
// // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // import { api, getImageUrl } from '@/lib/api'; 
// // // // // // // import Protected from '@/components/Protected';
// // // // // // // import Link from 'next/link';
// // // // // // // import { Settings, Save, MapPin, CheckSquare, Shield } from 'lucide-react';
// // // // // // // import RegionSelector from '@/components/admin/RegionSelector';

// // // // // // // // Definisi Permissions yang tersedia
// // // // // // // const AVAILABLE_PERMISSIONS = [
// // // // // // //     { id: 'manage_courses', label: 'Kelola Pelatihan (Courses)' },
// // // // // // //     { id: 'manage_users', label: 'Kelola Pengguna (Users)' },
// // // // // // //     { id: 'manage_blog', label: 'Kelola Blog & Berita' },
// // // // // // //     { id: 'manage_forum', label: 'Kelola Forum Diskusi' },
// // // // // // //     { id: 'manage_library', label: 'Kelola Pustaka Digital' },
// // // // // // //     { id: 'manage_certificates', label: 'Kelola Sertifikat' },
// // // // // // //     { id: 'view_reports', label: 'Lihat Laporan & Statistik' },
// // // // // // //     { id: 'manage_settings', label: 'Pengaturan Sistem' },
// // // // // // // ];

// // // // // // // export default function AdminUserDetailPage() {
// // // // // // //   const params = useParams();
// // // // // // //   const userId = params?.userId || params?.id;
// // // // // // //   const router = useRouter();
  
// // // // // // //   const [data, setData] = useState<any>(null);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // // //   // State untuk Edit Admin (Permissions & Region)
// // // // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // // // //   const [isSaving, setIsSaving] = useState(false);
// // // // // // //   const [permissions, setPermissions] = useState<string[]>([]);
// // // // // // //   const [regionConfig, setRegionConfig] = useState<any>({
// // // // // // //       scope: 'national',
// // // // // // //       provinces: [],
// // // // // // //       regencies: []
// // // // // // //   });

// // // // // // //   useEffect(() => {
// // // // // // //     if (!userId || typeof userId !== 'string') {
// // // // // // //       setError("ID Pengguna tidak valid.");
// // // // // // //       setLoading(false);
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const fetchUserDetails = async () => {
// // // // // // //       try {
// // // // // // //         setLoading(true);
// // // // // // //         const res = await api(`/api/admin/users/${userId}/details`);
        
// // // // // // //         if (res.success) {
// // // // // // //           setData(res);
// // // // // // //           // Inisialisasi state edit dari data user
// // // // // // //           if (res.user) {
// // // // // // //               setPermissions(res.user.permissions || []);
// // // // // // //               setRegionConfig({
// // // // // // //                   scope: res.user.regionScope || 'national',
// // // // // // //                   provinces: res.user.managedProvinces || [],
// // // // // // //                   regencies: res.user.managedRegencies || []
// // // // // // //               });
// // // // // // //           }
// // // // // // //         } else {
// // // // // // //           setError(res.error || "Gagal memuat data pengguna.");
// // // // // // //         }
// // // // // // //       } catch (err: any) {
// // // // // // //         console.error(err);
// // // // // // //         setError(err.message || "Terjadi kesalahan saat mengambil data");
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchUserDetails();
// // // // // // //   }, [userId]);

// // // // // // //   const handleSaveAdminConfig = async () => {
// // // // // // //       setIsSaving(true);
// // // // // // //       try {
// // // // // // //           const payload = {
// // // // // // //               permissions: permissions,
// // // // // // //               regionScope: regionConfig.scope,
// // // // // // //               managedProvinces: regionConfig.provinces,
// // // // // // //               managedRegencies: regionConfig.regencies
// // // // // // //           };

// // // // // // //           await api(`/api/admin/users/${userId}`, { method: 'PATCH', body: payload });
          
// // // // // // //           alert("Konfigurasi Admin berhasil disimpan!");
// // // // // // //           setIsEditing(false);
// // // // // // //           // Refresh data lokal
// // // // // // //           setData((prev: any) => ({
// // // // // // //               ...prev,
// // // // // // //               user: { ...prev.user, ...payload }
// // // // // // //           }));

// // // // // // //       } catch (err: any) {
// // // // // // //           alert("Gagal menyimpan: " + err.message);
// // // // // // //       } finally {
// // // // // // //           setIsSaving(false);
// // // // // // //       }
// // // // // // //   };

// // // // // // //   const togglePermission = (id: string) => {
// // // // // // //       setPermissions(prev => 
// // // // // // //           prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
// // // // // // //       );
// // // // // // //   };

// // // // // // //   const handleDownloadPDF = (certId: string) => {
// // // // // // //     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// // // // // // //     window.open(`${baseUrl}/api/certificates/${certId}/pdf`, '_blank');
// // // // // // //   };

// // // // // // //   if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
// // // // // // //   if (error || !data?.user) return <div className="p-10 text-center">User tidak ditemukan.</div>;

// // // // // // //   const isUserAdmin = data.user.role === 'ADMIN';

// // // // // // //   return (
// // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
// // // // // // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
// // // // // // //         {/* NAVIGASI ATAS */}
// // // // // // //         <div className="flex items-center justify-between">
// // // // // // //           <div className="flex items-center gap-4">
// // // // // // //             <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200">
// // // // // // //               <span className="text-2xl">←</span>
// // // // // // //             </button>
// // // // // // //             <h1 className="text-2xl font-bold text-gray-800">Profil Lengkap Pengguna</h1>
// // // // // // //           </div>
// // // // // // //           <Link href="/admin/users" className="text-sm font-bold text-red-700 hover:underline">Daftar User</Link>
// // // // // // //         </div>

// // // // // // //         {/* KARTU PROFIL UTAMA */}
// // // // // // //         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
// // // // // // //           <div className="flex flex-col md:flex-row items-center gap-8">
// // // // // // //             <img 
// // // // // // //               src={getImageUrl(data.user.avatarUrl) || '/default-avatar.png'} 
// // // // // // //               className="w-28 h-28 rounded-full object-cover border border-gray-200 bg-gray-50"
// // // // // // //               alt="Avatar"
// // // // // // //               onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }}
// // // // // // //             />
            
// // // // // // //             <div className="flex-1 text-center md:text-left">
// // // // // // //               <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1 justify-center md:justify-start">
// // // // // // //                 <h2 className="text-3xl font-bold text-gray-900">{data.user.name}</h2>
// // // // // // //                 <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
// // // // // // //                   data.user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' :
// // // // // // //                   data.user.role === 'ADMIN' ? 'bg-orange-100 text-orange-700' :
// // // // // // //                   data.user.role === 'FACILITATOR' ? 'bg-blue-100 text-blue-700' :
// // // // // // //                   'bg-green-100 text-green-700'
// // // // // // //                 }`}>
// // // // // // //                   {data.user.role}
// // // // // // //                 </span>
// // // // // // //               </div>
// // // // // // //               <p className="text-gray-500 font-medium text-lg">{data.user.email}</p>
// // // // // // //               <div className="flex gap-4 mt-2 justify-center md:justify-start text-xs text-gray-400">
// // // // // // //                  <p className="uppercase tracking-widest">ID: {data.user._id}</p>
// // // // // // //                  {data.user.regionScope && <p className="uppercase tracking-widest font-bold text-gray-500">• SCOPE: {data.user.regionScope}</p>}
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* --- KONFIGURASI ADMIN (HANYA MUNCUL JIKA USER ADALAH ADMIN) --- */}
// // // // // // //         {isUserAdmin && (
// // // // // // //             <div className="bg-white rounded-3xl shadow-lg border border-orange-200 overflow-hidden">
// // // // // // //                 <div className="bg-orange-50 p-6 border-b border-orange-100 flex justify-between items-center">
// // // // // // //                     <div>
// // // // // // //                         <h3 className="text-xl font-bold text-orange-900 flex items-center gap-2">
// // // // // // //                             <Shield size={24}/> Konfigurasi Hak Akses & Wilayah
// // // // // // //                         </h3>
// // // // // // //                         <p className="text-sm text-orange-700 mt-1">Atur wilayah kerja dan fitur apa saja yang boleh diakses oleh Admin ini.</p>
// // // // // // //                     </div>
// // // // // // //                     {!isEditing ? (
// // // // // // //                         <button onClick={() => setIsEditing(true)} className="bg-white text-orange-700 px-4 py-2 rounded-lg font-bold text-sm border border-orange-200 hover:bg-orange-100 shadow-sm flex items-center gap-2">
// // // // // // //                             <Settings size={16}/> Edit Akses
// // // // // // //                         </button>
// // // // // // //                     ) : (
// // // // // // //                         <div className="flex gap-2">
// // // // // // //                             <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg text-sm">Batal</button>
// // // // // // //                             <button onClick={handleSaveAdminConfig} disabled={isSaving} className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-orange-700 shadow-lg flex items-center gap-2 disabled:opacity-50">
// // // // // // //                                 <Save size={16}/> {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
// // // // // // //                             </button>
// // // // // // //                         </div>
// // // // // // //                     )}
// // // // // // //                 </div>

// // // // // // //                 <div className="p-8 space-y-8">
// // // // // // //                     {/* 1. REGION SELECTOR */}
// // // // // // //                     <div>
// // // // // // //                         <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
// // // // // // //                             <MapPin size={20} className="text-gray-400"/> Wilayah Kerja
// // // // // // //                         </h4>
// // // // // // //                         {isEditing ? (
// // // // // // //                             <RegionSelector value={regionConfig} onChange={setRegionConfig} />
// // // // // // //                         ) : (
// // // // // // //                             <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm text-gray-600">
// // // // // // //                                 <p className="mb-2"><span className="font-bold">Scope:</span> {data.user.regionScope?.toUpperCase()}</p>
// // // // // // //                                 {data.user.regionScope === 'province' && (
// // // // // // //                                     <p><span className="font-bold">Provinsi:</span> {data.user.managedProvinces?.length || 0} Terpilih</p>
// // // // // // //                                 )}
// // // // // // //                                 {data.user.regionScope === 'regency' && (
// // // // // // //                                     <p><span className="font-bold">Kabupaten/Kota:</span> {data.user.managedRegencies?.length || 0} Terpilih</p>
// // // // // // //                                 )}
// // // // // // //                             </div>
// // // // // // //                         )}
// // // // // // //                     </div>

// // // // // // //                     <hr className="border-gray-100"/>

// // // // // // //                     {/* 2. PERMISSIONS CHECKBOX */}
// // // // // // //                     <div>
// // // // // // //                         <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
// // // // // // //                             <CheckSquare size={20} className="text-gray-400"/> Hak Akses Fitur (Permissions)
// // // // // // //                         </h4>
// // // // // // //                         {isEditing ? (
// // // // // // //                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
// // // // // // //                                 {AVAILABLE_PERMISSIONS.map(perm => (
// // // // // // //                                     <label key={perm.id} className="flex items-center gap-3 p-3 border rounded-xl hover:bg-orange-50 cursor-pointer transition-colors bg-white">
// // // // // // //                                         <input 
// // // // // // //                                             type="checkbox" 
// // // // // // //                                             checked={permissions.includes(perm.id)} 
// // // // // // //                                             onChange={() => togglePermission(perm.id)}
// // // // // // //                                             className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
// // // // // // //                                         />
// // // // // // //                                         <span className="text-sm font-medium text-gray-700">{perm.label}</span>
// // // // // // //                                     </label>
// // // // // // //                                 ))}
// // // // // // //                             </div>
// // // // // // //                         ) : (
// // // // // // //                             <div className="flex flex-wrap gap-2">
// // // // // // //                                 {data.user.permissions && data.user.permissions.length > 0 ? (
// // // // // // //                                     data.user.permissions.map((p: string) => {
// // // // // // //                                         const label = AVAILABLE_PERMISSIONS.find(ap => ap.id === p)?.label || p;
// // // // // // //                                         return (
// // // // // // //                                             <span key={p} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
// // // // // // //                                                 {label}
// // // // // // //                                             </span>
// // // // // // //                                         );
// // // // // // //                                     })
// // // // // // //                                 ) : (
// // // // // // //                                     <p className="text-gray-400 text-sm italic">Belum ada hak akses khusus yang diberikan.</p>
// // // // // // //                                 )}
// // // // // // //                             </div>
// // // // // // //                         )}
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         )}

// // // // // // //         {/* RIWAYAT & SERTIFIKAT (TETAP SAMA SEPERTI SEBELUMNYA) */}
// // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // // // // // //           {/* KOLOM KIRI: SEJARAH PELATIHAN */}
// // // // // // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // // // // // //             <div className="flex justify-between items-center mb-6">
// // // // // // //               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">📚 Riwayat Kursus</h3>
// // // // // // //               <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-500">{data.history?.length || 0} Total</span>
// // // // // // //             </div>
// // // // // // //             <div className="space-y-4">
// // // // // // //               {data.history && data.history.length > 0 ? (
// // // // // // //                 data.history.map((item: any) => (
// // // // // // //                   <div key={item._id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-red-100 transition-all group">
// // // // // // //                     <div className="flex items-center gap-4">
// // // // // // //                       <img 
// // // // // // //                         src={getImageUrl(item.courseId?.thumbnailUrl) || '/course-placeholder.jpg'} 
// // // // // // //                         className="w-12 h-12 rounded-xl object-cover bg-gray-200" 
// // // // // // //                         alt=""
// // // // // // //                         onError={(e) => { (e.target as HTMLImageElement).src = '/course-placeholder.jpg'; }}
// // // // // // //                       />
// // // // // // //                       <div>
// // // // // // //                         <p className="font-bold text-gray-900 text-sm group-hover:text-red-700">{item.courseId?.title || 'Kursus'}</p>
// // // // // // //                         <p className="text-[10px] text-gray-400">ID: {item.courseId?._id.substring(0,8)}...</p>
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                     <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase ${item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
// // // // // // //                       {item.completed ? 'LULUS' : 'PROSES'}
// // // // // // //                     </span>
// // // // // // //                   </div>
// // // // // // //                 ))
// // // // // // //               ) : (
// // // // // // //                 <div className="text-center py-10"><p className="text-gray-400 text-sm italic">Belum ada aktivitas pelatihan.</p></div>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           {/* KOLOM KANAN: SERTIFIKAT */}
// // // // // // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // // // // // //             <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">📜 Sertifikat Digital</h3>
// // // // // // //             <div className="space-y-4">
// // // // // // //               {data.certificates && data.certificates.length > 0 ? (
// // // // // // //                 data.certificates.map((cert: any) => (
// // // // // // //                   <div key={cert._id} className="p-5 border-l-4 border-red-600 bg-red-50/40 rounded-r-2xl flex justify-between items-center group">
// // // // // // //                     <div>
// // // // // // //                       <p className="font-bold text-red-900 text-sm">{cert.courseId?.title}</p>
// // // // // // //                       <p className="text-[10px] text-red-700/60 font-mono tracking-widest uppercase mt-1">{cert.certificateCode || cert.certificateNumber}</p>
// // // // // // //                     </div>
// // // // // // //                     <button onClick={() => handleDownloadPDF(cert._id)} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-800 shadow-md flex items-center gap-2 transition-all active:scale-95">
// // // // // // //                       <span>📥</span> PDF
// // // // // // //                     </button>
// // // // // // //                   </div>
// // // // // // //                 ))
// // // // // // //               ) : (
// // // // // // //                 <div className="text-center py-10"><p className="text-gray-400 text-sm italic">Sertifikat belum tersedia.</p></div>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </Protected>
// // // // // // //   );
// // // // // // // }


// // // // // // 'use client';

// // // // // // import { useEffect, useState } from 'react';
// // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // import { api, getImageUrl } from '@/lib/api'; 
// // // // // // import Protected from '@/components/Protected';
// // // // // // import Link from 'next/link';
// // // // // // import { Settings, Save, MapPin, CheckSquare, Shield, AlertTriangle } from 'lucide-react';
// // // // // // import RegionSelector from '@/components/admin/RegionSelector';

// // // // // // // Definisi Permission di Frontend (Harus match dengan Backend Config)
// // // // // // const AVAILABLE_PERMISSIONS = [
// // // // // //     // Operasional
// // // // // //     { id: 'manage_courses', label: 'Kelola Pelatihan (Courses)', group: 'Operasional' },
// // // // // //     { id: 'verify_enrollments', label: 'Verifikasi Pendaftaran Peserta', group: 'Operasional' },
// // // // // //     { id: 'manage_certificates', label: 'Kelola Template Sertifikat', group: 'Operasional' },

// // // // // //     // User Management
// // // // // //     { id: 'manage_users', label: 'Kelola Pengguna (User Management)', group: 'User Management' },

// // // // // //     // Konten
// // // // // //     { id: 'manage_blog', label: 'Moderasi Blog & Berita', group: 'Konten' },
// // // // // //     { id: 'manage_forum', label: 'Moderasi Forum Diskusi', group: 'Konten' },
// // // // // //     { id: 'manage_library', label: 'Kelola Pustaka Digital', group: 'Konten' },

// // // // // //     // CMS Web
// // // // // //     { id: 'manage_cms_design', label: '🎨 Kelola Desain (Banner/Slider)', group: 'CMS Web' },
// // // // // //     { id: 'manage_cms_info', label: 'ℹ️ Kelola Informasi (Profil/Kontak)', group: 'CMS Web' },

// // // // // //     // Sistem
// // // // // //     { id: 'view_reports', label: '📊 Lihat Laporan Statistik', group: 'Sistem' },
// // // // // //     { id: 'manage_system_core', label: '⚙️ Pengaturan Inti (System Core)', group: 'Sistem', danger: true },
// // // // // // ];

// // // // // // export default function AdminUserDetailPage() {
// // // // // //   const params = useParams();
// // // // // //   const userId = params?.userId || params?.id;
// // // // // //   const router = useRouter();
  
// // // // // //   const [data, setData] = useState<any>(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // //   // State Edit
// // // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // // //   const [isSaving, setIsSaving] = useState(false);
// // // // // //   const [permissions, setPermissions] = useState<string[]>([]);
// // // // // //   const [regionConfig, setRegionConfig] = useState<any>({
// // // // // //       scope: 'national',
// // // // // //       provinces: [],
// // // // // //       regencies: []
// // // // // //   });

// // // // // //   useEffect(() => {
// // // // // //     if (!userId || typeof userId !== 'string') {
// // // // // //       setError("ID Pengguna tidak valid.");
// // // // // //       setLoading(false);
// // // // // //       return;
// // // // // //     }

// // // // // //     const fetchUserDetails = async () => {
// // // // // //       try {
// // // // // //         setLoading(true);
// // // // // //         const res = await api(`/api/admin/users/${userId}/details`);
        
// // // // // //         if (res.success) {
// // // // // //           setData(res);
// // // // // //           if (res.user) {
// // // // // //               setPermissions(res.user.permissions || []);
// // // // // //               setRegionConfig({
// // // // // //                   scope: res.user.regionScope || 'national',
// // // // // //                   provinces: res.user.managedProvinces || [],
// // // // // //                   regencies: res.user.managedRegencies || []
// // // // // //               });
// // // // // //           }
// // // // // //         } else {
// // // // // //           setError(res.error || "Gagal memuat data pengguna.");
// // // // // //         }
// // // // // //       } catch (err: any) {
// // // // // //         console.error(err);
// // // // // //         setError(err.message || "Terjadi kesalahan saat mengambil data");
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchUserDetails();
// // // // // //   }, [userId]);

// // // // // //   const handleSaveAdminConfig = async () => {
// // // // // //       setIsSaving(true);
// // // // // //       try {
// // // // // //           const payload = {
// // // // // //               permissions: permissions,
// // // // // //               regionScope: regionConfig.scope,
// // // // // //               managedProvinces: regionConfig.provinces,
// // // // // //               managedRegencies: regionConfig.regencies
// // // // // //           };

// // // // // //           await api(`/api/admin/users/${userId}`, { method: 'PATCH', body: payload });
          
// // // // // //           alert("Konfigurasi Admin berhasil disimpan!");
// // // // // //           setIsEditing(false);
// // // // // //           setData((prev: any) => ({
// // // // // //               ...prev,
// // // // // //               user: { ...prev.user, ...payload }
// // // // // //           }));

// // // // // //       } catch (err: any) {
// // // // // //           alert("Gagal menyimpan: " + err.message);
// // // // // //       } finally {
// // // // // //           setIsSaving(false);
// // // // // //       }
// // // // // //   };

// // // // // //   const togglePermission = (id: string) => {
// // // // // //       setPermissions(prev => 
// // // // // //           prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
// // // // // //       );
// // // // // //   };

// // // // // //   const handleDownloadPDF = (certId: string) => {
// // // // // //     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// // // // // //     window.open(`${baseUrl}/api/certificates/${certId}/pdf`, '_blank');
// // // // // //   };

// // // // // //   if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div></div>;
// // // // // //   if (error || !data?.user) return <div className="p-10 text-center">User tidak ditemukan.</div>;

// // // // // //   const isUserAdmin = data.user.role === 'ADMIN';
// // // // // //   const isSuperAdmin = data.user.role === 'SUPER_ADMIN'; // [BARU] Cek Super Admin

// // // // // //   // Helper untuk mendapatkan grup unik
// // // // // //   const permissionGroups = Array.from(new Set(AVAILABLE_PERMISSIONS.map(p => p.group)));

// // // // // //   return (
// // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
// // // // // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
// // // // // //         {/* HEADER */}
// // // // // //         <div className="flex items-center justify-between">
// // // // // //           <div className="flex items-center gap-4">
// // // // // //             <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200">
// // // // // //               <span className="text-2xl">←</span>
// // // // // //             </button>
// // // // // //             <h1 className="text-2xl font-bold text-gray-800">Profil Lengkap Pengguna</h1>
// // // // // //           </div>
// // // // // //           <Link href="/admin/users" className="text-sm font-bold text-red-700 hover:underline">Daftar User</Link>
// // // // // //         </div>

// // // // // //         {/* KARTU PROFIL UTAMA */}
// // // // // //         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
// // // // // //           <div className="flex flex-col md:flex-row items-center gap-8">
// // // // // //             <img 
// // // // // //               src={getImageUrl(data.user.avatarUrl) || '/default-avatar.png'} 
// // // // // //               className="w-28 h-28 rounded-full object-cover border border-gray-200 bg-gray-50"
// // // // // //               alt="Avatar"
// // // // // //               onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }}
// // // // // //             />
            
// // // // // //             <div className="flex-1 text-center md:text-left">
// // // // // //               <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1 justify-center md:justify-start">
// // // // // //                 <h2 className="text-3xl font-bold text-gray-900">{data.user.name}</h2>
// // // // // //                 <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
// // // // // //                   data.user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' :
// // // // // //                   data.user.role === 'ADMIN' ? 'bg-orange-100 text-orange-700' :
// // // // // //                   data.user.role === 'FACILITATOR' ? 'bg-blue-100 text-blue-700' :
// // // // // //                   'bg-green-100 text-green-700'
// // // // // //                 }`}>
// // // // // //                   {data.user.role}
// // // // // //                 </span>
// // // // // //               </div>
// // // // // //               <p className="text-gray-500 font-medium text-lg">{data.user.email}</p>
// // // // // //               <div className="flex gap-4 mt-2 justify-center md:justify-start text-xs text-gray-400">
// // // // // //                  <p className="uppercase tracking-widest">ID: {data.user._id}</p>
// // // // // //                  {data.user.regionScope && <p className="uppercase tracking-widest font-bold text-gray-500">• SCOPE: {data.user.regionScope}</p>}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* --- TAMPILAN KHUSUS SUPER ADMIN (GOD MODE) --- */}
// // // // // //         {isSuperAdmin && (
// // // // // //             <div className="bg-purple-50 rounded-3xl shadow-lg border border-purple-200 p-8 flex flex-col md:flex-row items-center gap-6">
// // // // // //                 <div className="p-4 bg-purple-100 text-purple-600 rounded-full shrink-0">
// // // // // //                     <Shield size={40} />
// // // // // //                 </div>
// // // // // //                 <div className="text-center md:text-left">
// // // // // //                     <h3 className="text-xl font-bold text-purple-900">Akses Super Admin (Unlimited)</h3>
// // // // // //                     <p className="text-sm text-purple-700 mt-1 leading-relaxed">
// // // // // //                         User ini memiliki akses penuh ke seluruh sistem, seluruh wilayah, dan seluruh fitur tanpa batasan (Bypass System).<br/>
// // // // // //                         Anda tidak perlu (dan tidak bisa) mengatur izin manual untuk Role ini.
// // // // // //                     </p>
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         )}

// // // // // //         {/* --- KONFIGURASI ADMIN BIASA (RBAC) --- */}
// // // // // //         {/* Hanya muncul jika role = ADMIN, dan BUKAN Super Admin */}
// // // // // //         {isUserAdmin && !isSuperAdmin && (
// // // // // //             <div className="bg-white rounded-3xl shadow-lg border border-orange-200 overflow-hidden">
// // // // // //                 <div className="bg-orange-50 p-6 border-b border-orange-100 flex justify-between items-center">
// // // // // //                     <div>
// // // // // //                         <h3 className="text-xl font-bold text-orange-900 flex items-center gap-2">
// // // // // //                             <Shield size={24}/> Konfigurasi Admin (RBAC)
// // // // // //                         </h3>
// // // // // //                         <p className="text-sm text-orange-700 mt-1">Atur wilayah kerja dan izin fitur spesifik.</p>
// // // // // //                     </div>
// // // // // //                     {!isEditing ? (
// // // // // //                         <button onClick={() => setIsEditing(true)} className="bg-white text-orange-700 px-4 py-2 rounded-lg font-bold text-sm border border-orange-200 hover:bg-orange-100 shadow-sm flex items-center gap-2">
// // // // // //                             <Settings size={16}/> Edit Akses
// // // // // //                         </button>
// // // // // //                     ) : (
// // // // // //                         <div className="flex gap-2">
// // // // // //                             <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg text-sm">Batal</button>
// // // // // //                             <button onClick={handleSaveAdminConfig} disabled={isSaving} className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-orange-700 shadow-lg flex items-center gap-2 disabled:opacity-50">
// // // // // //                                 <Save size={16}/> {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
// // // // // //                             </button>
// // // // // //                         </div>
// // // // // //                     )}
// // // // // //                 </div>

// // // // // //                 <div className="p-8 space-y-10">
// // // // // //                     {/* 1. REGION SELECTOR */}
// // // // // //                     <div>
// // // // // //                         <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
// // // // // //                             <MapPin size={20} className="text-gray-400"/> Wilayah Kerja
// // // // // //                         </h4>
// // // // // //                         {isEditing ? (
// // // // // //                             <RegionSelector value={regionConfig} onChange={setRegionConfig} />
// // // // // //                         ) : (
// // // // // //                             <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm text-gray-600">
// // // // // //                                 <p className="mb-2"><span className="font-bold">Scope:</span> {data.user.regionScope?.toUpperCase()}</p>
// // // // // //                                 {data.user.regionScope === 'province' && (
// // // // // //                                     <p><span className="font-bold">Provinsi:</span> {data.user.managedProvinces?.length || 0} Terpilih</p>
// // // // // //                                 )}
// // // // // //                                 {data.user.regionScope === 'regency' && (
// // // // // //                                     <p><span className="font-bold">Kabupaten/Kota:</span> {data.user.managedRegencies?.length || 0} Terpilih</p>
// // // // // //                                 )}
// // // // // //                             </div>
// // // // // //                         )}
// // // // // //                     </div>

// // // // // //                     <hr className="border-gray-100"/>

// // // // // //                     {/* 2. PERMISSIONS CHECKBOX (GROUPED) */}
// // // // // //                     <div>
// // // // // //                         <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
// // // // // //                             <CheckSquare size={20} className="text-gray-400"/> Hak Akses Fitur (Permissions)
// // // // // //                         </h4>
                        
// // // // // //                         {isEditing ? (
// // // // // //                             <div className="space-y-6">
// // // // // //                                 {permissionGroups.map(group => (
// // // // // //                                     <div key={group} className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
// // // // // //                                         <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-200 pb-2">{group}</h5>
// // // // // //                                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
// // // // // //                                             {AVAILABLE_PERMISSIONS.filter(p => p.group === group).map(perm => (
// // // // // // //                                                 <label key={perm.id} className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all ${perm.danger ? 'bg-red-50 border-red-100 hover:bg-red-100' : 'bg-white hover:border-orange-300'}`}>
// // // // // // //                                                     <input 
// // // // // // //                                                         type="checkbox" 
// // // // // // //                                                         checked={permissions.includes(perm.id)} 
// // // // // // //                                                         onChange={() => togglePermission(perm.id)}
// // // // // // //                                                         className={`mt-0.5 w-5 h-5 rounded focus:ring-2 ${perm.danger ? 'text-red-600 focus:ring-red-500' : 'text-orange-600 focus:ring-orange-500'}`}
// // // // // // //                                                     />
// // // // // // //                                                     <div>
// // // // // // //                                                         <span className={`text-sm font-bold block ${perm.danger ? 'text-red-700' : 'text-gray-700'}`}>{perm.label}</span>
// // // // // // //                                                         {perm.danger && <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1"><AlertTriangle size={10}/> Fitur Sensitif</p>}
// // // // // // // //                                                     </div>
// // // // // // // //                                                 </label>
// // // // // // // //                                             ))}
// // // // // // // //                                         </div>
// // // // // // // //                                     </div>
// // // // // // // //                                 ))}
// // // // // // // //                             </div>
// // // // // // // //                         ) : (
// // // // // // // //                             <div className="flex flex-wrap gap-2">
// // // // // // // //                                 {data.user.permissions && data.user.permissions.length > 0 ? (
// // // // // // // //                                     data.user.permissions.map((p: string) => {
// // // // // // // //                                         const permDef = AVAILABLE_PERMISSIONS.find(ap => ap.id === p);
// // // // // // // //                                         const label = permDef?.label || p;
// // // // // // // //                                         const isDanger = permDef?.danger;
// // // // // // // //                                         return (
// // // // // // // //                                             <span key={p} className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${isDanger ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}`}>
// // // // // // // //                                                 {isDanger && <AlertTriangle size={10}/>} {label}
// // // // // // // //                                             </span>
// // // // // // // //                                         );
// // // // // // // //                                     })
// // // // // // // //                                 ) : (
// // // // // // // //                                     <p className="text-gray-400 text-sm italic bg-gray-50 px-4 py-2 rounded-lg w-full text-center border border-dashed">Belum ada hak akses khusus yang diberikan.</p>
// // // // // // // //                                 )}
// // // // // // // //                             </div>
// // // // // // // //                         )}
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         )}

// // // // // // // //         {/* DATA RIWAYAT & SERTIFIKAT */}
// // // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // // // // // // //           {/* KOLOM KIRI: SEJARAH PELATIHAN */}
// // // // // // // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // // // // // // //             <div className="flex justify-between items-center mb-6">
// // // // // // // //               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">📚 Riwayat Kursus</h3>
// // // // // // // //               <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-500">{data.history?.length || 0} Total</span>
// // // // // // // //             </div>
// // // // // // // //             <div className="space-y-4">
// // // // // // // //               {data.history && data.history.length > 0 ? (
// // // // // // // //                 data.history.map((item: any) => (
// // // // // // // //                   <div key={item._id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-red-100 transition-all group">
// // // // // // // //                     <div className="flex items-center gap-4">
// // // // // // // //                       <img 
// // // // // // // //                         src={getImageUrl(item.courseId?.thumbnailUrl) || '/course-placeholder.jpg'} 
// // // // // // // //                         className="w-12 h-12 rounded-xl object-cover bg-gray-200" 
// // // // // // // //                         alt=""
// // // // // // // //                         onError={(e) => { (e.target as HTMLImageElement).src = '/course-placeholder.jpg'; }}
// // // // // // // //                       />
// // // // // // // //                       <div>
// // // // // // // //                         <p className="font-bold text-gray-900 text-sm group-hover:text-red-700">{item.courseId?.title || 'Kursus'}</p>
// // // // // // // //                         <p className="text-[10px] text-gray-400">ID: {item.courseId?._id.substring(0,8)}...</p>
// // // // // // // //                       </div>
// // // // // // // //                     </div>
// // // // // // // //                     <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase ${item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
// // // // // // // //                       {item.completed ? 'LULUS' : 'PROSES'}
// // // // // // // //                     </span>
// // // // // // // //                   </div>
// // // // // // // //                 ))
// // // // // // // //               ) : (
// // // // // // // //                 <div className="text-center py-10"><p className="text-gray-400 text-sm italic">Belum ada aktivitas pelatihan.</p></div>
// // // // // // // //               )}
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           {/* KOLOM KANAN: SERTIFIKAT */}
// // // // // // // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // // // // // // //             <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">📜 Sertifikat Digital</h3>
// // // // // // // //             <div className="space-y-4">
// // // // // // // //               {data.certificates && data.certificates.length > 0 ? (
// // // // // // // //                 data.certificates.map((cert: any) => (
// // // // // // // //                   <div key={cert._id} className="p-5 border-l-4 border-red-600 bg-red-50/40 rounded-r-2xl flex justify-between items-center group">
// // // // // // // //                     <div>
// // // // // // // //                       <p className="font-bold text-red-900 text-sm">{cert.courseId?.title}</p>
// // // // // // // //                       <p className="text-[10px] text-red-700/60 font-mono tracking-widest uppercase mt-1">{cert.certificateCode || cert.certificateNumber}</p>
// // // // // // // //                     </div>
// // // // // // // //                     <button onClick={() => handleDownloadPDF(cert._id)} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-800 shadow-md flex items-center gap-2 transition-all active:scale-95">
// // // // // // // //                       <span>📥</span> PDF
// // // // // // // //                     </button>
// // // // // // // //                   </div>
// // // // // // // //                 ))
// // // // // // // //               ) : (
// // // // // // // //                 <div className="text-center py-10"><p className="text-gray-400 text-sm italic">Sertifikat belum tersedia.</p></div>
// // // // // // // //               )}
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </Protected>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // 'use client';

// // // // // // // import { useEffect, useState } from 'react';
// // // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // // import { api, getImageUrl } from '@/lib/api'; 
// // // // // // // import Protected from '@/components/Protected';
// // // // // // // import Link from 'next/link';
// // // // // // // import { Settings, Save, MapPin, CheckSquare, Shield, AlertTriangle, KeyRound, User, Mail, ArrowLeft, Loader2 } from 'lucide-react';
// // // // // // // import RegionSelector from '@/components/admin/RegionSelector';

// // // // // // // // Definisi Permission
// // // // // // // const AVAILABLE_PERMISSIONS = [
// // // // // // //     { id: 'manage_courses', label: 'Kelola Pelatihan (Courses)', group: 'Operasional' },
// // // // // // //     { id: 'verify_enrollments', label: 'Verifikasi Pendaftaran Peserta', group: 'Operasional' },
// // // // // // //     { id: 'manage_certificates', label: 'Kelola Template Sertifikat', group: 'Operasional' },
// // // // // // //     { id: 'manage_users', label: 'Kelola Pengguna (User Management)', group: 'User Management' },
// // // // // // //     { id: 'manage_blog', label: 'Moderasi Blog & Berita', group: 'Konten' },
// // // // // // //     { id: 'manage_forum', label: 'Moderasi Forum Diskusi', group: 'Konten' },
// // // // // // //     { id: 'manage_library', label: 'Kelola Pustaka Digital', group: 'Konten' },
// // // // // // //     { id: 'manage_cms_design', label: '🎨 Kelola Desain (Banner/Slider)', group: 'CMS Web' },
// // // // // // //     { id: 'manage_cms_info', label: 'ℹ️ Kelola Informasi (Profil/Kontak)', group: 'CMS Web' },
// // // // // // //     { id: 'view_reports', label: '📊 Lihat Laporan Statistik', group: 'Sistem' },
// // // // // // //     { id: 'manage_system_core', label: '⚙️ Pengaturan Inti (System Core)', group: 'Sistem', danger: true },
// // // // // // // ];

// // // // // // // export default function AdminUserDetailPage() {
// // // // // // //   const params = useParams();
// // // // // // //   const userId = params?.userId || params?.id;
// // // // // // //   const router = useRouter();
  
// // // // // // //   const [data, setData] = useState<any>(null);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // // //   // State Edit
// // // // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // // // //   const [isSaving, setIsSaving] = useState(false);
  
// // // // // // //   // State Form Data
// // // // // // //   const [currentName, setCurrentName] = useState('');
// // // // // // //   const [currentRole, setCurrentRole] = useState('');
// // // // // // //   const [permissions, setPermissions] = useState<string[]>([]);
// // // // // // //   const [regionConfig, setRegionConfig] = useState<any>({
// // // // // // //       scope: 'national',
// // // // // // //       provinces: [],
// // // // // // //       regencies: []
// // // // // // //   });

// // // // // // //   useEffect(() => {
// // // // // // //     if (!userId || typeof userId !== 'string') {
// // // // // // //       setError("ID Pengguna tidak valid.");
// // // // // // //       setLoading(false);
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     loadData();
// // // // // // //   }, [userId]);

// // // // // // //   const loadData = async () => {
// // // // // // //     try {
// // // // // // //         setLoading(true);
// // // // // // //         const res = await api(`/api/admin/users/${userId}/details`);
        
// // // // // // //         if (res.success && res.user) {
// // // // // // //           setData(res);
// // // // // // //           setCurrentName(res.user.name);
// // // // // // //           setCurrentRole(res.user.role);
// // // // // // //           setPermissions(res.user.permissions || []);
// // // // // // //           setRegionConfig({
// // // // // // //               scope: res.user.regionScope || 'national',
// // // // // // //               provinces: res.user.managedProvinces || [],
// // // // // // //               regencies: res.user.managedRegencies || []
// // // // // // //           });
// // // // // // //         } else {
// // // // // // //           setError(res.error || "Gagal memuat data pengguna.");
// // // // // // //         }
// // // // // // //       } catch (err: any) {
// // // // // // //         console.error(err);
// // // // // // //         setError(err.message || "Terjadi kesalahan saat mengambil data");
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //   };

// // // // // // //   const handleSaveAll = async () => {
// // // // // // //       setIsSaving(true);
// // // // // // //       try {
// // // // // // //           const payload = {
// // // // // // //               name: currentName,
// // // // // // //               role: currentRole,
// // // // // // //               permissions: permissions,
// // // // // // //               regionScope: regionConfig.scope,
// // // // // // //               managedProvinces: regionConfig.provinces,
// // // // // // //               managedRegencies: regionConfig.regencies
// // // // // // //           };

// // // // // // //           await api(`/api/admin/users/${userId}`, { method: 'PATCH', body: payload });
          
// // // // // // //           alert("Data pengguna berhasil diperbarui!");
// // // // // // //           setIsEditing(false);
          
// // // // // // //           setData((prev: any) => ({
// // // // // // //               ...prev,
// // // // // // //               user: { ...prev.user, ...payload }
// // // // // // //           }));

// // // // // // //       } catch (err: any) {
// // // // // // //           alert("Gagal menyimpan: " + err.message);
// // // // // // //       } finally {
// // // // // // //           setIsSaving(false);
// // // // // // //       }
// // // // // // //   };

// // // // // // //   const handleResetPassword = async () => {
// // // // // // //       if (!confirm(`Yakin ingin mereset password user ini menjadi "123456"?`)) return;
// // // // // // //       try {
// // // // // // //           await api(`/api/admin/users/${userId}/reset-password`, { method: 'PATCH' });
// // // // // // //           alert("✅ Sukses! Password telah direset ke: 123456");
// // // // // // //       } catch (err: any) {
// // // // // // //           alert("Gagal reset password: " + err.message);
// // // // // // //       }
// // // // // // //   };

// // // // // // //   const togglePermission = (id: string) => {
// // // // // // //       setPermissions(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
// // // // // // //   };

// // // // // // //   if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// // // // // // //   if (error || !data?.user) return <div className="p-10 text-center text-red-500 font-bold">{error || "User tidak ditemukan."}</div>;

// // // // // // //   const isUserAdmin = currentRole === 'ADMIN';
// // // // // // //   const isSuperAdmin = data.user.role === 'SUPER_ADMIN'; 

// // // // // // //   const permissionGroups = Array.from(new Set(AVAILABLE_PERMISSIONS.map(p => p.group)));

// // // // // // //   return (
// // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
// // // // // // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
// // // // // // //         {/* HEADER */}
// // // // // // //         <div className="flex items-center justify-between sticky top-0 bg-gray-50/90 backdrop-blur-sm z-10 py-4 border-b border-gray-200">
// // // // // // //           <div className="flex items-center gap-4">
// // // // // // //             <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200" title="Kembali">
// // // // // // //               <ArrowLeft size={24}/>
// // // // // // //             </button>
// // // // // // //             <div>
// // // // // // //                  <h1 className="text-2xl font-bold text-gray-800">{data.user.name}</h1>
// // // // // // //                  <p className="text-xs text-gray-500">{data.user.email} • {data.user.memberType || 'UMUM'}</p>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //           <div className="flex gap-3">
// // // // // // //              <button 
// // // // // // //                 onClick={handleResetPassword}
// // // // // // //                 className="bg-orange-50 text-orange-700 border border-orange-200 px-4 py-2 rounded-xl font-bold text-sm hover:bg-orange-100 flex items-center gap-2 transition-all"
// // // // // // //                 title="Reset Password ke 123456"
// // // // // // //              >
// // // // // // //                 <KeyRound size={16}/> Reset Pass
// // // // // // //              </button>
             
// // // // // // //              {!isEditing ? (
// // // // // // //                  <button onClick={() => setIsEditing(true)} className="bg-red-700 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-red-800 flex items-center gap-2 shadow-lg">
// // // // // // //                     <Settings size={16}/> Edit Profil
// // // // // // //                  </button>
// // // // // // //              ) : (
// // // // // // //                  <div className="flex gap-2">
// // // // // // //                     <button onClick={() => { setIsEditing(false); loadData(); }} className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50">
// // // // // // //                         Batal
// // // // // // //                     </button>
// // // // // // //                     <button onClick={handleSaveAll} disabled={isSaving} className="bg-green-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-green-700 flex items-center gap-2 shadow-lg disabled:opacity-50">
// // // // // // //                         {isSaving ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>} Simpan
// // // // // // //                     </button>
// // // // // // //                  </div>
// // // // // // //              )}
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
// // // // // // //             {/* KOLOM KIRI: EDIT UTAMA */}
// // // // // // //             <div className="lg:col-span-2 space-y-8">
                
// // // // // // //                 {/* 1. INFORMASI DASAR (EDITABLE) */}
// // // // // // //                 <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
// // // // // // //                     <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-4">
// // // // // // //                         <User size={20} className="text-gray-400"/> Informasi Dasar
// // // // // // //                     </h3>
// // // // // // //                     <div className="grid grid-cols-1 gap-5">
// // // // // // //                          <div>
// // // // // // //                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Lengkap</label>
// // // // // // //                             {/* [FIX 1] Menambahkan aria-label */}
// // // // // // //                             <input 
// // // // // // //                                 disabled={!isEditing}
// // // // // // //                                 className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all disabled:text-gray-500"
// // // // // // //                                 value={currentName}
// // // // // // //                                 onChange={e => setCurrentName(e.target.value)}
// // // // // // //                                 aria-label="Nama Lengkap User"
// // // // // // //                                 title="Nama Lengkap User"
// // // // // // //                             />
// // // // // // //                          </div>
// // // // // // //                          <div>
// // // // // // //                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email (Login)</label>
// // // // // // //                             <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl text-gray-500 border border-gray-200">
// // // // // // //                                 <Mail size={16}/> {data.user.email}
// // // // // // //                             </div>
// // // // // // //                          </div>
// // // // // // //                          <div>
// // // // // // //                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role / Peran</label>
// // // // // // //                             {/* [FIX 2] Menambahkan aria-label */}
// // // // // // //                             <select 
// // // // // // //                                 disabled={!isEditing}
// // // // // // //                                 className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all disabled:text-gray-500 font-bold"
// // // // // // //                                 value={currentRole}
// // // // // // //                                 onChange={e => setCurrentRole(e.target.value)}
// // // // // // //                                 aria-label="Pilih Role User"
// // // // // // //                                 title="Pilih Role User"
// // // // // // //                             >
// // // // // // //                                 <option value="STUDENT">STUDENT (Peserta)</option>
// // // // // // //                                 <option value="FACILITATOR">FACILITATOR (Fasilitator)</option>
// // // // // // //                                 <option value="ADMIN">ADMIN (Admin Wilayah)</option>
// // // // // // //                                 <option value="SUPER_ADMIN">SUPER ADMIN</option>
// // // // // // //                             </select>
// // // // // // //                             <p className="text-[10px] text-gray-400 mt-1">*Ubah ke ADMIN untuk membuka pengaturan wilayah.</p>
// // // // // // //                          </div>
// // // // // // //                     </div>
// // // // // // //                 </div>

// // // // // // //                 {/* 2. KONFIGURASI ADMIN (Muncul jika Role = ADMIN) */}
// // // // // // //                 {isUserAdmin && !isSuperAdmin && (
// // // // // // //                     <div className="bg-white rounded-3xl shadow-lg border border-orange-200 overflow-hidden animate-in slide-in-from-top-4">
// // // // // // //                         <div className="bg-orange-50 p-6 border-b border-orange-100">
// // // // // // //                             <h3 className="text-lg font-bold text-orange-900 flex items-center gap-2">
// // // // // // //                                 <Shield size={20}/> Konfigurasi Admin Wilayah
// // // // // // //                             </h3>
// // // // // // //                         </div>
// // // // // // //                         <div className="p-8 space-y-8">
// // // // // // //                             {/* Region Selector */}
// // // // // // //                             <div>
// // // // // // //                                 <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm">
// // // // // // //                                     <MapPin size={16} className="text-gray-400"/> Cakupan Wilayah
// // // // // // //                                 </h4>
// // // // // // //                                 {isEditing ? (
// // // // // // //                                     <RegionSelector value={regionConfig} onChange={setRegionConfig} />
// // // // // // //                                 ) : (
// // // // // // //                                     <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm">
// // // // // // //                                         <p><span className="font-bold">Scope:</span> {regionConfig.scope.toUpperCase()}</p>
// // // // // // //                                         <p className="text-gray-500 text-xs mt-1">
// // // // // // //                                             {regionConfig.scope === 'regency' 
// // // // // // //                                                 ? `${regionConfig.regencies.length} Kabupaten Terpilih: ${regionConfig.regencies.join(', ')}`
// // // // // // //                                                 : regionConfig.scope === 'province'
// // // // // // //                                                 ? `${regionConfig.provinces.length} Provinsi Terpilih`
// // // // // // //                                                 : 'Seluruh Indonesia'}
// // // // // // //                                         </p>
// // // // // // //                                     </div>
// // // // // // //                                 )}
// // // // // // //                             </div>
                            
// // // // // // //                             <hr className="border-gray-100"/>

// // // // // // //                             {/* Permissions */}
// // // // // // //                             <div>
// // // // // // //                                 <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm">
// // // // // // //                                     <CheckSquare size={16} className="text-gray-400"/> Hak Akses Fitur
// // // // // // //                                 </h4>
// // // // // // //                                 {isEditing ? (
// // // // // // //                                     <div className="space-y-4">
// // // // // // //                                         {permissionGroups.map(group => (
// // // // // // //                                             <div key={group} className="bg-gray-50 p-4 rounded-xl">
// // // // // // //                                                 <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{group}</h5>
// // // // // // //                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// // // // // // //                                                     {AVAILABLE_PERMISSIONS.filter(p => p.group === group).map(perm => (
// // // // // // //                                                         <label key={perm.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-white p-2 rounded transition-colors">
// // // // // // //                                                             <input type="checkbox" checked={permissions.includes(perm.id)} onChange={() => togglePermission(perm.id)} className="rounded text-red-600 focus:ring-red-500"/>
// // // // // // //                                                             <span className={perm.danger ? 'text-red-600 font-bold' : 'text-gray-700'}>{perm.label}</span>
// // // // // // //                                                         </label>
// // // // // // //                                                     ))}
// // // // // // //                                                 </div>
// // // // // // //                                             </div>
// // // // // // //                                         ))}
// // // // // // //                                     </div>
// // // // // // //                                 ) : (
// // // // // // //                                     <div className="flex flex-wrap gap-2">
// // // // // // //                                         {permissions.map(p => (
// // // // // // //                                             <span key={p} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border font-medium">{p}</span>
// // // // // // //                                         ))}
// // // // // // //                                         {permissions.length === 0 && <span className="text-gray-400 text-xs italic">Tidak ada permission khusus.</span>}
// // // // // // //                                     </div>
// // // // // // //                                 )}
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 )}
// // // // // // //             </div>

// // // // // // //             {/* KOLOM KANAN: STATISTIK & HISTORY (Read Only) */}
// // // // // // //             <div className="space-y-6">
                
// // // // // // //                 {/* KARTU MEMBER INFO */}
// // // // // // //                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
// // // // // // //                      <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
// // // // // // //                         {/* [FIX 3] Menambahkan alt text */}
// // // // // // //                         <img 
// // // // // // //                             src={getImageUrl(data.user.avatarUrl)} 
// // // // // // //                             className="w-full h-full object-cover"
// // // // // // //                             alt={`${data.user.name} Avatar`}
// // // // // // //                         />
// // // // // // //                      </div>
// // // // // // //                      <h3 className="font-bold text-gray-800">{data.user.memberType}</h3>
// // // // // // //                      <p className="text-xs text-gray-400 mb-4">Bergabung: {new Date(data.user.createdAt).toLocaleDateString()}</p>
                     
// // // // // // //                      <div className="text-left text-xs bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-200">
// // // // // // //                         <div className="flex justify-between border-b pb-2">
// // // // // // //                             <span className="text-gray-500">NIA</span>
// // // // // // //                             <span className="font-mono font-bold">{data.user.memberData?.nia || '-'}</span>
// // // // // // //                         </div>
// // // // // // //                         <div className="flex justify-between border-b pb-2">
// // // // // // //                             <span className="text-gray-500">Unit</span>
// // // // // // //                             <span className="font-bold text-right">{data.user.memberData?.unit || '-'}</span>
// // // // // // //                         </div>
// // // // // // //                         <div className="flex justify-between">
// // // // // // //                             <span className="text-gray-500">Domisili</span>
// // // // // // //                             <span className="font-bold text-right">{data.user.memberData?.regency || '-'}</span>
// // // // // // //                         </div>
// // // // // // //                      </div>
// // // // // // //                 </div>

// // // // // // //                 {/* HISTORY KURSUS */}
// // // // // // //                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // // // // // //                     <h3 className="font-bold text-gray-800 mb-4 text-sm flex justify-between">
// // // // // // //                         <span>Riwayat Kursus</span>
// // // // // // //                         <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{data.history?.length || 0}</span>
// // // // // // //                     </h3>
// // // // // // //                     <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
// // // // // // //                         {data.history?.length > 0 ? data.history.map((h:any) => (
// // // // // // //                              <div key={h._id} className="text-xs border-b pb-2 mb-2 last:border-0">
// // // // // // //                                 <p className="font-bold truncate">{h.courseId?.title}</p>
// // // // // // //                                 <div className="flex justify-between mt-1 text-gray-500">
// // // // // // //                                     <span>Progress: {h.progress}%</span>
// // // // // // //                                     <span className={h.completed ? 'text-green-600 font-bold' : 'text-orange-500'}>{h.completed ? 'Lulus' : 'Jalan'}</span>
// // // // // // //                                 </div>
// // // // // // //                              </div>
// // // // // // //                         )) : <p className="text-gray-400 text-xs italic">Kosong.</p>}
// // // // // // //                     </div>
// // // // // // //                 </div>

// // // // // // //             </div>
// // // // // // //         </div>

// // // // // // //       </div>
// // // // // // //     </Protected>
// // // // // // //   );
// // // // // // // }


// // // // // // 'use client';

// // // // // // import { useEffect, useState } from 'react';
// // // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // // import { api, getImageUrl } from '@/lib/api'; 
// // // // // // import Protected from '@/components/Protected';
// // // // // // import { Settings, Save, MapPin, CheckSquare, Shield, AlertTriangle, KeyRound, User, Mail, ArrowLeft, Loader2 } from 'lucide-react';
// // // // // // import RegionSelector from '@/components/admin/RegionSelector';

// // // // // // // Definisi Permission
// // // // // // const AVAILABLE_PERMISSIONS = [
// // // // // //     { id: 'manage_courses', label: 'Kelola Pelatihan (Courses)', group: 'Operasional' },
// // // // // //     { id: 'verify_enrollments', label: 'Verifikasi Pendaftaran Peserta', group: 'Operasional' },
// // // // // //     { id: 'manage_certificates', label: 'Kelola Template Sertifikat', group: 'Operasional' },
// // // // // //     { id: 'manage_users', label: 'Kelola Pengguna (User Management)', group: 'User Management' },
// // // // // //     { id: 'manage_blog', label: 'Moderasi Blog & Berita', group: 'Konten' },
// // // // // //     { id: 'manage_forum', label: 'Moderasi Forum Diskusi', group: 'Konten' },
// // // // // //     { id: 'manage_library', label: 'Kelola Pustaka Digital', group: 'Konten' },
// // // // // //     { id: 'manage_cms_design', label: '🎨 Kelola Desain (Banner/Slider)', group: 'CMS Web' },
// // // // // //     { id: 'manage_cms_info', label: 'ℹ️ Kelola Informasi (Profil/Kontak)', group: 'CMS Web' },
// // // // // //     { id: 'view_reports', label: '📊 Lihat Laporan Statistik', group: 'Sistem' },
// // // // // //     { id: 'manage_system_core', label: '⚙️ Pengaturan Inti (System Core)', group: 'Sistem', danger: true },
// // // // // // ];

// // // // // // export default function AdminUserDetailPage() {
// // // // // //   const params = useParams();
// // // // // //   const userId = params?.userId || params?.id;
// // // // // //   const router = useRouter();
  
// // // // // //   const [data, setData] = useState<any>(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // // //   const [isSaving, setIsSaving] = useState(false);
  
// // // // // //   // State Form
// // // // // //   const [currentName, setCurrentName] = useState('');
// // // // // //   const [currentRole, setCurrentRole] = useState('');
// // // // // //   const [permissions, setPermissions] = useState<string[]>([]);
  
// // // // // //   // [BARU] State Banned
// // // // // //   const [isBanned, setIsBanned] = useState(false);
// // // // // //   const [bannedReason, setBannedReason] = useState('');

// // // // // //   const [regionConfig, setRegionConfig] = useState<any>({ scope: 'national', provinces: [], regencies: [] });

// // // // // //   useEffect(() => {
// // // // // //     if (!userId || typeof userId !== 'string') { setError("ID Pengguna tidak valid."); setLoading(false); return; }
// // // // // //     loadData();
// // // // // //   }, [userId]);

// // // // // //   const loadData = async () => {
// // // // // //     try {
// // // // // //         setLoading(true);
// // // // // //         const res = await api(`/api/admin/users/${userId}/details`);
// // // // // //         if (res.success && res.user) {
// // // // // //           setData(res);
// // // // // //           setCurrentName(res.user.name);
// // // // // //           setCurrentRole(res.user.role);
// // // // // //           setPermissions(res.user.permissions || []);
          
// // // // // //           // Load Status Banned
// // // // // //           setIsBanned(res.user.isBanned || false);
// // // // // //           setBannedReason(res.user.bannedReason || '');

// // // // // //           setRegionConfig({
// // // // // //               scope: res.user.regionScope || 'national',
// // // // // //               provinces: res.user.managedProvinces || [],
// // // // // //               regencies: res.user.managedRegencies || []
// // // // // //           });
// // // // // //         } else { setError(res.error || "Gagal memuat data."); }
// // // // // //       } catch (err: any) { setError(err.message || "Terjadi kesalahan"); } finally { setLoading(false); }
// // // // // //   };

// // // // // //   const handleSaveAll = async () => {
// // // // // //       setIsSaving(true);
// // // // // //       try {
// // // // // //           const payload = {
// // // // // //               name: currentName,
// // // // // //               role: currentRole,
// // // // // //               permissions: permissions,
// // // // // //               regionScope: regionConfig.scope,
// // // // // //               managedProvinces: regionConfig.provinces,
// // // // // //               managedRegencies: regionConfig.regencies,
// // // // // //               // Kirim status banned
// // // // // //               isBanned: isBanned,
// // // // // //               bannedReason: bannedReason
// // // // // //           };
// // // // // //           await api(`/api/admin/users/${userId}`, { method: 'PATCH', body: payload });
// // // // // //           alert("Data pengguna berhasil diperbarui!");
// // // // // //           setIsEditing(false);
// // // // // //           loadData(); // Refresh agar data sinkron
// // // // // //       } catch (err: any) { alert("Gagal menyimpan: " + err.message); } finally { setIsSaving(false); }
// // // // // //   };

// // // // // //   const togglePermission = (id: string) => {
// // // // // //       setPermissions(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
// // // // // //   };

// // // // // //   const handleResetPassword = async () => {
// // // // // //       if (!confirm(`Reset password user ini menjadi "123456"?`)) return;
// // // // // //       try {
// // // // // //           await api(`/api/admin/users/${userId}/reset-password`, { method: 'PATCH' });
// // // // // //           alert("✅ Sukses! Password telah direset.");
// // // // // //       } catch (err: any) { alert("Gagal: " + err.message); }
// // // // // //   };

// // // // // //   if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// // // // // //   if (error || !data?.user) return <div className="p-10 text-center text-red-500 font-bold">{error || "User tidak ditemukan."}</div>;

// // // // // //   const isUserAdmin = currentRole === 'ADMIN';
// // // // // //   const isSuperAdmin = data.user.role === 'SUPER_ADMIN'; 
// // // // // //   const permissionGroups = Array.from(new Set(AVAILABLE_PERMISSIONS.map(p => p.group)));

// // // // // //   return (
// // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
// // // // // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
// // // // // //         <div className="flex items-center justify-between sticky top-0 bg-gray-50/90 backdrop-blur-sm z-10 py-4 border-b border-gray-200">
// // // // // //           <div className="flex items-center gap-4">
// // // // // //             <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200" title="Kembali" aria-label="Kembali"><ArrowLeft size={24}/></button>
// // // // // //             <div><h1 className="text-2xl font-bold text-gray-800">{data.user.name}</h1><p className="text-xs text-gray-500">{data.user.email} • {data.user.memberType || 'UMUM'}</p></div>
// // // // // //           </div>
// // // // // //           <div className="flex gap-3">
// // // // // //              <button onClick={handleResetPassword} className="bg-orange-50 text-orange-700 border border-orange-200 px-4 py-2 rounded-xl font-bold text-sm hover:bg-orange-100 flex items-center gap-2"><KeyRound size={16}/> Reset Pass</button>
// // // // // //              {!isEditing ? (
// // // // // //                  <button onClick={() => setIsEditing(true)} className="bg-red-700 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-red-800 flex items-center gap-2 shadow-lg"><Settings size={16}/> Edit Profil</button>
// // // // // //              ) : (
// // // // // //                  <div className="flex gap-2">
// // // // // //                     <button onClick={() => { setIsEditing(false); loadData(); }} className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50">Batal</button>
// // // // // //                     <button onClick={handleSaveAll} disabled={isSaving} className="bg-green-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-green-700 flex items-center gap-2 shadow-lg disabled:opacity-50">{isSaving ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>} Simpan</button>
// // // // // //                  </div>
// // // // // //              )}
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // // // //             <div className="lg:col-span-2 space-y-8">
                
// // // // // //                 {/* 1. INFORMASI DASAR */}
// // // // // //                 <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
// // // // // //                     <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-4"><User size={20} className="text-gray-400"/> Informasi Dasar</h3>
// // // // // //                     <div className="grid grid-cols-1 gap-5">
// // // // // //                          <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Lengkap</label><input disabled={!isEditing} className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all disabled:text-gray-500" value={currentName} onChange={e => setCurrentName(e.target.value)} aria-label="Nama Lengkap"/></div>
// // // // // //                          <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label><div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl text-gray-500 border border-gray-200"><Mail size={16}/> {data.user.email}</div></div>
// // // // // //                          <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role / Peran</label><select disabled={!isEditing} className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none font-bold" value={currentRole} onChange={e => setCurrentRole(e.target.value)} aria-label="Pilih Role"><option value="STUDENT">STUDENT</option><option value="FACILITATOR">FACILITATOR</option><option value="ADMIN">ADMIN</option><option value="SUPER_ADMIN">SUPER ADMIN</option></select></div>
// // // // // //                     </div>
// // // // // //                 </div>

// // // // // //                 {/* 2. [KEMBALI] STATUS KEAMANAN (BANNED) */}
// // // // // //                 <div className="bg-white rounded-3xl shadow-sm border border-red-100 p-8">
// // // // // //                      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><AlertTriangle size={20} className="text-red-500"/> Status Keamanan</h3>
// // // // // //                      <div className="flex items-center gap-4 mb-4">
// // // // // //                         <label className="flex items-center gap-2 cursor-pointer">
// // // // // //                             <input 
// // // // // //                                 type="checkbox" 
// // // // // //                                 disabled={!isEditing}
// // // // // //                                 checked={isBanned} 
// // // // // //                                 onChange={e => setIsBanned(e.target.checked)} 
// // // // // //                                 className="w-5 h-5 text-red-600 rounded focus:ring-red-500 disabled:opacity-50"
// // // // // //                             />
// // // // // //                             <span className={`font-bold ${isBanned ? 'text-red-600' : 'text-gray-700'}`}>Bekukan Akun (Banned)</span>
// // // // // //                         </label>
// // // // // //                      </div>
// // // // // //                      {isBanned && (
// // // // // //                         <input 
// // // // // //                             disabled={!isEditing}
// // // // // //                             className="w-full p-3 border border-red-200 bg-red-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500" 
// // // // // //                             placeholder="Alasan pembekuan (wajib diisi)..."
// // // // // //                             value={bannedReason}
// // // // // //                             onChange={e => setBannedReason(e.target.value)}
// // // // // //                         />
// // // // // //                      )}
// // // // // //                      {/* Info Status */}
// // // // // //                      {!isEditing && (
// // // // // //                          <div className={`mt-2 p-3 rounded-lg text-sm font-bold border ${isBanned ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}`}>
// // // // // //                              STATUS: {isBanned ? `DIBEKUKAN (${bannedReason || 'Tanpa alasan'})` : 'AKTIF'}
// // // // // //                          </div>
// // // // // //                      )}
// // // // // //                 </div>

// // // // // //                 {/* 3. KONFIGURASI ADMIN */}
// // // // // //                 {isUserAdmin && !isSuperAdmin && (
// // // // // //                     <div className="bg-white rounded-3xl shadow-lg border border-orange-200 overflow-hidden animate-in slide-in-from-top-4">
// // // // // //                         <div className="bg-orange-50 p-6 border-b border-orange-100"><h3 className="text-lg font-bold text-orange-900 flex items-center gap-2"><Shield size={20}/> Konfigurasi Admin Wilayah</h3></div>
// // // // // //                         <div className="p-8 space-y-8">
// // // // // //                             <div>
// // // // // //                                 <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm"><MapPin size={16} className="text-gray-400"/> Cakupan Wilayah</h4>
// // // // // //                                 {isEditing ? (<RegionSelector value={regionConfig} onChange={setRegionConfig} />) : (<div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm"><p><span className="font-bold">Scope:</span> {regionConfig.scope.toUpperCase()}</p></div>)}
// // // // // //                             </div>
// // // // // //                             <hr className="border-gray-100"/>
// // // // // //                             <div>
// // // // // //                                 <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm"><CheckSquare size={16} className="text-gray-400"/> Hak Akses Fitur</h4>
// // // // // //                                 {isEditing ? (
// // // // // //                                     <div className="space-y-4">{permissionGroups.map(group => (<div key={group} className="bg-gray-50 p-4 rounded-xl"><h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{group}</h5><div className="grid grid-cols-1 md:grid-cols-2 gap-2">{AVAILABLE_PERMISSIONS.filter(p => p.group === group).map(perm => (<label key={perm.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-white p-2 rounded transition-colors"><input type="checkbox" checked={permissions.includes(perm.id)} onChange={() => togglePermission(perm.id)} className="rounded text-red-600 focus:ring-red-500"/><span className={perm.danger ? 'text-red-600 font-bold' : 'text-gray-700'}>{perm.label}</span></label>))}</div></div>))}</div>
// // // // // //                                 ) : (
// // // // // //                                     <div className="flex flex-wrap gap-2">{permissions.map(p => (<span key={p} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border font-medium">{p}</span>))}{permissions.length === 0 && <span className="text-gray-400 text-xs italic">Tidak ada permission.</span>}</div>
// // // // // //                                 )}
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 )}
// // // // // //             </div>
// // // // // //             <div className="space-y-6">
// // // // // //                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
// // // // // //                      <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md"><img src={getImageUrl(data.user.avatarUrl)} className="w-full h-full object-cover" alt="Av"/></div>
// // // // // //                      <h3 className="font-bold text-gray-800">{data.user.memberType}</h3>
// // // // // //                      <p className="text-xs text-gray-400 mb-4">Join: {new Date(data.user.createdAt).toLocaleDateString()}</p>
// // // // // //                      <div className="text-left text-xs bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-200"><div className="flex justify-between border-b pb-2"><span>NIA</span><span className="font-mono font-bold">{data.user.memberData?.nia || '-'}</span></div><div className="flex justify-between"><span>Unit</span><span className="font-bold text-right">{data.user.memberData?.unit || '-'}</span></div></div>
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </Protected>
// // // // // //   );
// // // // // // }




// // // // // 'use client';

// // // // // import { useEffect, useState } from 'react';
// // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // import { api, getImageUrl } from '@/lib/api'; 
// // // // // import Protected from '@/components/Protected';
// // // // // import { Settings, Save, MapPin, CheckSquare, Shield, AlertTriangle, KeyRound, User, Mail, ArrowLeft, Loader2 } from 'lucide-react';
// // // // // import RegionSelector from '@/components/admin/RegionSelector';

// // // // // const AVAILABLE_PERMISSIONS = [
// // // // //     { id: 'manage_courses', label: 'Kelola Pelatihan (Create/Edit/Delete)', group: 'Operasional' },
// // // // //     { id: 'verify_enrollments', label: 'Verifikasi Pendaftaran Peserta', group: 'Operasional' },
// // // // //     { id: 'manage_certificates', label: 'Kelola Template Sertifikat', group: 'Operasional' },
// // // // //     { id: 'manage_users', label: 'Kelola Pengguna (User Management)', group: 'User Management' },
// // // // //     { id: 'manage_blog', label: 'Moderasi Blog & Berita', group: 'Konten' },
// // // // //     { id: 'manage_forum', label: 'Moderasi Forum Diskusi', group: 'Konten' },
// // // // //     { id: 'manage_library', label: 'Kelola Pustaka Digital', group: 'Konten' },
// // // // //     { id: 'manage_cms_design', label: '🎨 Kelola Desain (Banner/Slider)', group: 'CMS Web' },
// // // // //     { id: 'manage_cms_info', label: 'ℹ️ Kelola Informasi (Profil/Kontak)', group: 'CMS Web' },
// // // // //     { id: 'view_reports', label: '📊 Lihat Laporan Statistik', group: 'Sistem' },
// // // // //     { id: 'manage_system_core', label: '⚙️ Pengaturan Inti (System Core)', group: 'Sistem', danger: true },
// // // // // ];

// // // // // export default function AdminUserDetailPage() {
// // // // //   const params = useParams();
// // // // //   const userId = params?.userId || params?.id;
// // // // //   const router = useRouter();
  
// // // // //   const [data, setData] = useState<any>(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState<string | null>(null);

// // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // //   const [isSaving, setIsSaving] = useState(false);
  
// // // // //   const [currentName, setCurrentName] = useState('');
// // // // //   const [currentRole, setCurrentRole] = useState('');
// // // // //   const [permissions, setPermissions] = useState<string[]>([]);
  
// // // // //   const [isBanned, setIsBanned] = useState(false);
// // // // //   const [bannedReason, setBannedReason] = useState('');

// // // // //   const [regionConfig, setRegionConfig] = useState<any>({ scope: 'national', provinces: [], regencies: [] });

// // // // //   useEffect(() => {
// // // // //     if (!userId || typeof userId !== 'string') { setError("ID Pengguna tidak valid."); setLoading(false); return; }
// // // // //     loadData();
// // // // //   }, [userId]);

// // // // //   const loadData = async () => {
// // // // //     try {
// // // // //         setLoading(true);
// // // // //         const res = await api(`/api/admin/users/${userId}/details`);
// // // // //         if (res.success && res.user) {
// // // // //           setData(res);
// // // // //           setCurrentName(res.user.name);
// // // // //           setCurrentRole(res.user.role);
// // // // //           setPermissions(res.user.permissions || []);
          
// // // // //           setIsBanned(res.user.isBanned || false);
// // // // //           setBannedReason(res.user.bannedReason || '');

// // // // //           setRegionConfig({
// // // // //               scope: res.user.regionScope || 'national',
// // // // //               provinces: res.user.managedProvinces || [],
// // // // //               regencies: res.user.managedRegencies || []
// // // // //           });
// // // // //         } else { setError(res.error || "Gagal memuat data."); }
// // // // //       } catch (err: any) { setError(err.message || "Terjadi kesalahan"); } finally { setLoading(false); }
// // // // //   };

// // // // //   const handleSaveAll = async () => {
// // // // //       setIsSaving(true);
// // // // //       try {
// // // // //           const payload = {
// // // // //               name: currentName,
// // // // //               role: currentRole,
// // // // //               permissions: permissions, 
// // // // //               regionScope: regionConfig.scope,
// // // // //               managedProvinces: regionConfig.provinces,
// // // // //               managedRegencies: regionConfig.regencies,
// // // // //               isBanned: isBanned,
// // // // //               bannedReason: bannedReason
// // // // //           };
// // // // //           await api(`/api/admin/users/${userId}`, { method: 'PATCH', body: payload });
// // // // //           alert("Data pengguna berhasil diperbarui!");
// // // // //           setIsEditing(false);
// // // // //           loadData(); 
// // // // //       } catch (err: any) { alert("Gagal menyimpan: " + err.message); } finally { setIsSaving(false); }
// // // // //   };

// // // // //   const togglePermission = (id: string) => {
// // // // //       setPermissions(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
// // // // //   };

// // // // //   const handleResetPassword = async () => {
// // // // //       if (!confirm(`Reset password user ini menjadi "123456"?`)) return;
// // // // //       try {
// // // // //           await api(`/api/admin/users/${userId}/reset-password`, { method: 'PATCH' });
// // // // //           alert("✅ Sukses! Password telah direset.");
// // // // //       } catch (err: any) { alert("Gagal: " + err.message); }
// // // // //   };

// // // // //   if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// // // // //   if (error || !data?.user) return <div className="p-10 text-center text-red-500 font-bold">{error || "User tidak ditemukan."}</div>;

// // // // //   const isUserAdmin = currentRole === 'ADMIN';
// // // // //   const isSuperAdmin = data.user.role === 'SUPER_ADMIN'; 
// // // // //   const permissionGroups = Array.from(new Set(AVAILABLE_PERMISSIONS.map(p => p.group)));

// // // // //   return (
// // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
// // // // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
// // // // //         <div className="flex items-center justify-between sticky top-0 bg-gray-50/90 backdrop-blur-sm z-10 py-4 border-b border-gray-200">
// // // // //           <div className="flex items-center gap-4">
// // // // //              {/* [FIX] A11y: Button Name */}
// // // // //             <button 
// // // // //                 onClick={() => router.back()} 
// // // // //                 className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200" 
// // // // //                 title="Kembali" 
// // // // //                 aria-label="Kembali"
// // // // //             >
// // // // //                 <ArrowLeft size={24}/>
// // // // //             </button>
// // // // //             <div><h1 className="text-2xl font-bold text-gray-800">{data.user.name}</h1><p className="text-xs text-gray-500">{data.user.email}</p></div>
// // // // //           </div>
// // // // //           <div className="flex gap-3">
// // // // //              {!isEditing ? (
// // // // //                  <button onClick={() => setIsEditing(true)} className="bg-red-700 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-red-800 flex items-center gap-2 shadow-lg"><Settings size={16}/> Edit Profil</button>
// // // // //              ) : (
// // // // //                  <div className="flex gap-2">
// // // // //                     <button onClick={() => { setIsEditing(false); loadData(); }} className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50">Batal</button>
// // // // //                     <button onClick={handleSaveAll} disabled={isSaving} className="bg-green-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-green-700 flex items-center gap-2 shadow-lg disabled:opacity-50">{isSaving ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>} Simpan</button>
// // // // //                  </div>
// // // // //              )}
// // // // //           </div>
// // // // //         </div>
        
// // // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // // //             <div className="lg:col-span-2 space-y-8">
// // // // //                 {/* 1. INFORMASI DASAR */}
// // // // //                 <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
// // // // //                     <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-4"><User size={20} className="text-gray-400"/> Informasi Dasar</h3>
// // // // //                     <div className="grid grid-cols-1 gap-5">
// // // // //                         {/* [FIX] A11y: Input Labels */}
// // // // //                         <div>
// // // // //                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Lengkap</label>
// // // // //                             <input 
// // // // //                                 disabled={!isEditing} 
// // // // //                                 className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all disabled:text-gray-500" 
// // // // //                                 value={currentName} 
// // // // //                                 onChange={e => setCurrentName(e.target.value)}
// // // // //                                 aria-label="Nama Lengkap"
// // // // //                                 title="Nama Lengkap"
// // // // //                             />
// // // // //                         </div>
// // // // //                         <div>
// // // // //                              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
// // // // //                              <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl text-gray-500 border border-gray-200"><Mail size={16}/> {data.user.email}</div>
// // // // //                         </div>
// // // // //                         <div>
// // // // //                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role</label>
// // // // //                             <select 
// // // // //                                 disabled={!isEditing} 
// // // // //                                 className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none font-bold" 
// // // // //                                 value={currentRole} 
// // // // //                                 onChange={e => setCurrentRole(e.target.value)}
// // // // //                                 aria-label="Pilih Role Pengguna"
// // // // //                                 title="Pilih Role Pengguna"
// // // // //                             >
// // // // //                                 <option value="STUDENT">STUDENT</option>
// // // // //                                 <option value="FACILITATOR">FACILITATOR</option>
// // // // //                                 <option value="ADMIN">ADMIN</option>
// // // // //                                 <option value="SUPER_ADMIN">SUPER ADMIN</option>
// // // // //                             </select>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>

// // // // //                 {/* 2. SECURITY (Banned) */}
// // // // //                 <div className="bg-white rounded-3xl shadow-sm border border-red-100 p-8">
// // // // //                       <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><AlertTriangle size={20} className="text-red-500"/> Status Keamanan</h3>
// // // // //                       <div className="flex items-center gap-4 mb-4">
// // // // //                         <label className="flex items-center gap-2 cursor-pointer">
// // // // //                             <input type="checkbox" disabled={!isEditing} checked={isBanned} onChange={e => setIsBanned(e.target.checked)} className="w-5 h-5 text-red-600 rounded focus:ring-red-500 disabled:opacity-50"/>
// // // // //                             <span className={`font-bold ${isBanned ? 'text-red-600' : 'text-gray-700'}`}>Bekukan Akun (Banned)</span>
// // // // //                         </label>
// // // // //                       </div>
// // // // //                       {isBanned && (
// // // // //                           <input 
// // // // //                               disabled={!isEditing} 
// // // // //                               className="w-full p-3 border border-red-200 bg-red-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500" 
// // // // //                               placeholder="Alasan..." 
// // // // //                               value={bannedReason} 
// // // // //                               onChange={e => setBannedReason(e.target.value)}
// // // // //                               aria-label="Alasan Pembekuan Akun"
// // // // //                               title="Alasan Pembekuan Akun"
// // // // //                           />
// // // // //                       )}
// // // // //                 </div>

// // // // //                 {/* 3. KONFIGURASI ADMIN (PERMISSION & SCOPE) */}
// // // // //                 {isUserAdmin && !isSuperAdmin && (
// // // // //                    <div className="bg-white rounded-3xl shadow-lg border border-orange-200 overflow-hidden animate-in slide-in-from-top-4">
// // // // //                        <div className="bg-orange-50 p-6 border-b border-orange-100"><h3 className="text-lg font-bold text-orange-900 flex items-center gap-2"><Shield size={20}/> Konfigurasi Admin Wilayah</h3></div>
// // // // //                        <div className="p-8 space-y-8">
// // // // //                            <div>
// // // // //                                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm"><MapPin size={16} className="text-gray-400"/> Cakupan Wilayah</h4>
// // // // //                                {isEditing ? (<RegionSelector value={regionConfig} onChange={setRegionConfig} />) : (<div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm"><p><span className="font-bold">Scope:</span> {regionConfig.scope.toUpperCase()}</p></div>)}
// // // // //                            </div>
// // // // //                            <hr className="border-gray-100"/>
// // // // //                            <div>
// // // // //                                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm"><CheckSquare size={16} className="text-gray-400"/> Hak Akses Fitur</h4>
// // // // //                                {isEditing ? (
// // // // //                                    <div className="space-y-4">
// // // // //                                        {permissionGroups.map(group => (
// // // // //                                            <div key={group} className="bg-gray-50 p-4 rounded-xl">
// // // // //                                                <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{group}</h5>
// // // // //                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// // // // //                                                    {AVAILABLE_PERMISSIONS.filter(p => p.group === group).map(perm => (
// // // // //                                                        <label key={perm.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-white p-2 rounded transition-colors">
// // // // //                                                            <input type="checkbox" checked={permissions.includes(perm.id)} onChange={() => togglePermission(perm.id)} className="rounded text-red-600 focus:ring-red-500"/>
// // // // //                                                            <span className={perm.danger ? 'text-red-600 font-bold' : 'text-gray-700'}>{perm.label}</span>
// // // // //                                                        </label>
// // // // //                                                    ))}
// // // // //                                                </div>
// // // // //                                            </div>
// // // // //                                        ))}
// // // // //                                    </div>
// // // // //                                ) : (
// // // // //                                    <div className="flex flex-wrap gap-2">{permissions.map(p => (<span key={p} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border font-medium">{p}</span>))}{permissions.length === 0 && <span className="text-gray-400 text-xs italic">Tidak ada permission.</span>}</div>
// // // // //                                )}
// // // // //                            </div>
// // // // //                        </div>
// // // // //                    </div>
// // // // //                 )}
// // // // //             </div>
            
// // // // //             <div className="space-y-6">
// // // // //                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
// // // // //                      <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md"><img src={getImageUrl(data.user.avatarUrl)} className="w-full h-full object-cover" alt="Av"/></div>
// // // // //                      <h3 className="font-bold text-gray-800">{data.user.memberType}</h3>
// // // // //                      <p className="text-xs text-gray-400 mb-4">Join: {new Date(data.user.createdAt).toLocaleDateString()}</p>
// // // // //                 </div>
// // // // //             </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </Protected>
// // // // //   );
// // // // // }


// // // // 'use client';

// // // // import { useEffect, useState } from 'react';
// // // // import { useParams, useRouter } from 'next/navigation';
// // // // import { api, getImageUrl } from '@/lib/api'; 
// // // // import Protected from '@/components/Protected';
// // // // import { 
// // // //     Settings, Save, Shield, KeyRound, 
// // // //     ArrowLeft, Loader2, Info, CheckCircle2, LayoutGrid, MapPin 
// // // // } from 'lucide-react';
// // // // import RegionSelector from '@/components/admin/RegionSelector';

// // // // // [FIX] Definisi Interface agar TypeScript tidak error pada properti 'danger'
// // // // interface PermissionItem {
// // // //     id: string;
// // // //     label: string;
// // // //     desc: string;
// // // //     danger?: boolean;
// // // // }

// // // // interface PermissionGroup {
// // // //     group: string;
// // // //     color: string;
// // // //     icon: any;
// // // //     items: PermissionItem[];
// // // // }

// // // // // --- KONFIGURASI UI PERMISSION ---
// // // // const PERMISSION_CONFIG: PermissionGroup[] = [
// // // //     {
// // // //         group: 'Operasional',
// // // //         color: 'bg-blue-50 text-blue-700 border-blue-100',
// // // //         icon: LayoutGrid,
// // // //         items: [
// // // //             { id: 'manage_courses', label: 'Kelola Pelatihan', desc: 'Buat, edit, hapus, dan publish kursus.' },
// // // //             { id: 'verify_enrollments', label: 'Verifikasi Peserta', desc: 'Menyetujui/menolak pendaftaran peserta.' },
// // // //             { id: 'manage_certificates', label: 'Template Sertifikat', desc: 'Mengatur desain dan tanda tangan sertifikat.' },
// // // //         ]
// // // //     },
// // // //     {
// // // //         group: 'User Management',
// // // //         color: 'bg-orange-50 text-orange-700 border-orange-100',
// // // //         icon: null, 
// // // //         items: [
// // // //             { id: 'manage_users', label: 'Kelola Pengguna', desc: 'Tambah user baru, edit profil, dan reset password.' },
// // // //         ]
// // // //     },
// // // //     {
// // // //         group: 'Konten & Publikasi',
// // // //         color: 'bg-purple-50 text-purple-700 border-purple-100',
// // // //         icon: Info,
// // // //         items: [
// // // //             { id: 'manage_blog', label: 'Blog & Berita', desc: 'Tulis dan moderasi artikel blog.' },
// // // //             { id: 'manage_forum', label: 'Forum Diskusi', desc: 'Moderasi topik dan komentar forum.' },
// // // //             { id: 'manage_library', label: 'Pustaka Digital', desc: 'Upload dan kelola file perpustakaan.' },
// // // //         ]
// // // //     },
// // // //     {
// // // //         group: 'CMS Web (Tampilan)',
// // // //         color: 'bg-pink-50 text-pink-700 border-pink-100',
// // // //         icon: Settings,
// // // //         items: [
// // // //             { id: 'manage_cms_design', label: 'Desain Beranda', desc: 'Ubah banner, slider, dan layout utama.' },
// // // //             { id: 'manage_cms_info', label: 'Info Website', desc: 'Ubah kontak, profil, dan footer.' },
// // // //         ]
// // // //     },
// // // //     {
// // // //         group: 'Sistem (Bahaya)',
// // // //         color: 'bg-gray-100 text-gray-800 border-gray-200',
// // // //         icon: Shield,
// // // //         items: [
// // // //             { id: 'view_reports', label: 'Laporan Statistik', desc: 'Akses dashboard analitik lengkap.' },
// // // //             { id: 'manage_system_core', label: 'Core System', desc: 'Akses konfigurasi server (Hanya IT).', danger: true },
// // // //         ]
// // // //     }
// // // // ];

// // // // export default function AdminUserDetailPage() {
// // // //   const params = useParams();
// // // //   const userId = params?.userId || params?.id;
// // // //   const router = useRouter();
  
// // // //   const [data, setData] = useState<any>(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState<string | null>(null);

// // // //   const [isEditing, setIsEditing] = useState(false);
// // // //   const [isSaving, setIsSaving] = useState(false);
  
// // // //   // State Form
// // // //   const [currentName, setCurrentName] = useState('');
// // // //   const [currentRole, setCurrentRole] = useState('');
// // // //   const [permissions, setPermissions] = useState<string[]>([]);
  
// // // //   // State Banned
// // // //   const [isBanned, setIsBanned] = useState(false);
// // // //   const [bannedReason, setBannedReason] = useState('');

// // // //   const [regionConfig, setRegionConfig] = useState<any>({ scope: 'national', provinces: [], regencies: [] });

// // // //   useEffect(() => {
// // // //     if (!userId || typeof userId !== 'string') { setError("ID Pengguna tidak valid."); setLoading(false); return; }
// // // //     loadData();
// // // //   }, [userId]);

// // // //   const loadData = async () => {
// // // //     try {
// // // //         setLoading(true);
// // // //         const res = await api(`/api/admin/users/${userId}/details`);
// // // //         if (res.success && res.user) {
// // // //           setData(res);
// // // //           setCurrentName(res.user.name);
// // // //           setCurrentRole(res.user.role);
// // // //           setPermissions(res.user.permissions || []);
// // // //           setIsBanned(res.user.isBanned || false);
// // // //           setBannedReason(res.user.bannedReason || '');
// // // //           setRegionConfig({
// // // //               scope: res.user.regionScope || 'national',
// // // //               provinces: res.user.managedProvinces || [],
// // // //               regencies: res.user.managedRegencies || []
// // // //           });
// // // //         } else { setError(res.error || "Gagal memuat data."); }
// // // //       } catch (err: any) { setError(err.message || "Terjadi kesalahan"); } finally { setLoading(false); }
// // // //   };

// // // //   const handleSaveAll = async () => {
// // // //       setIsSaving(true);
// // // //       try {
// // // //           const payload = {
// // // //               name: currentName,
// // // //               role: currentRole,
// // // //               permissions: permissions, 
// // // //               regionScope: regionConfig.scope,
// // // //               managedProvinces: regionConfig.provinces,
// // // //               managedRegencies: regionConfig.regencies,
// // // //               isBanned: isBanned,
// // // //               bannedReason: bannedReason
// // // //           };
// // // //           await api(`/api/admin/users/${userId}`, { method: 'PATCH', body: payload });
// // // //           alert("✅ Data pengguna berhasil diperbarui!");
// // // //           setIsEditing(false);
// // // //           loadData(); 
// // // //       } catch (err: any) { alert("❌ Gagal menyimpan: " + err.message); } finally { setIsSaving(false); }
// // // //   };

// // // //   const togglePermission = (id: string) => {
// // // //       setPermissions(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
// // // //   };

// // // //   const toggleGroup = (items: PermissionItem[]) => {
// // // //       const ids = items.map(i => i.id);
// // // //       const allSelected = ids.every(id => permissions.includes(id));
      
// // // //       if (allSelected) {
// // // //           setPermissions(prev => prev.filter(p => !ids.includes(p)));
// // // //       } else {
// // // //           const newPerms = new Set([...permissions, ...ids]);
// // // //           setPermissions(Array.from(newPerms));
// // // //       }
// // // //   };

// // // //   const handleResetPassword = async () => {
// // // //       if (!confirm(`Reset password user ini menjadi "123456"?`)) return;
// // // //       try {
// // // //           await api(`/api/admin/users/${userId}/reset-password`, { method: 'PATCH' });
// // // //           alert("✅ Sukses! Password telah direset.");
// // // //       } catch (err: any) { alert("Gagal: " + err.message); }
// // // //   };

// // // //   if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// // // //   if (error || !data?.user) return <div className="p-10 text-center text-red-500 font-bold">{error || "User tidak ditemukan."}</div>;

// // // //   const isUserAdmin = currentRole === 'ADMIN';
// // // //   const isSuperAdmin = data.user.role === 'SUPER_ADMIN'; 

// // // //   return (
// // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
// // // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-32">
        
// // // //         {/* TOP BAR */}
// // // //         <div className="flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-20 py-4 px-6 rounded-2xl shadow-sm border border-gray-200">
// // // //           <div className="flex items-center gap-4">
// // // //              <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-all" title="Kembali" aria-label="Kembali">
// // // //                 <ArrowLeft size={24} className="text-gray-600"/>
// // // //              </button>
// // // //              <div>
// // // //                  <h1 className="text-xl font-bold text-gray-900">{data.user.name}</h1>
// // // //                  <p className="text-xs text-gray-500 uppercase tracking-wide">{data.user.role} • {data.user.email}</p>
// // // //              </div>
// // // //           </div>
// // // //           <div className="flex gap-3">
// // // //              {!isEditing ? (
// // // //                  <button onClick={() => setIsEditing(true)} className="bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-red-800 flex items-center gap-2 shadow-lg transition-transform active:scale-95">
// // // //                     <Settings size={18}/> Edit Akses
// // // //                  </button>
// // // //              ) : (
// // // //                  <div className="flex gap-3 animate-in fade-in slide-in-from-right-5">
// // // //                     <button onClick={() => { setIsEditing(false); loadData(); }} className="px-5 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">Batal</button>
// // // //                     <button onClick={handleSaveAll} disabled={isSaving} className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 flex items-center gap-2 shadow-lg disabled:opacity-50 transition-transform active:scale-95">
// // // //                         {isSaving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Simpan Perubahan
// // // //                     </button>
// // // //                  </div>
// // // //              )}
// // // //           </div>
// // // //         </div>
        
// // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // //             {/* KOLOM KIRI: DATA UTAMA */}
// // // //             <div className="lg:col-span-1 space-y-6">
                
// // // //                 {/* CARD FOTO PROFIL */}
// // // //                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
// // // //                     <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-50 shadow-inner">
// // // //                         <img src={getImageUrl(data.user.avatarUrl)} className="w-full h-full object-cover" alt="Avatar"/>
// // // //                     </div>
// // // //                     <div className={`px-3 py-1 rounded-full text-xs font-bold mb-4 ${isBanned ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
// // // //                         {isBanned ? 'ACCOUNT BANNED' : 'ACTIVE MEMBER'}
// // // //                     </div>
// // // //                     <div className="w-full space-y-3 text-left">
// // // //                         <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
// // // //                             <label className="text-[10px] font-bold text-gray-400 uppercase">Nama Lengkap</label>
// // // //                             <input 
// // // //                                 disabled={!isEditing} 
// // // //                                 className="w-full bg-transparent font-bold text-gray-800 outline-none" 
// // // //                                 value={currentName} 
// // // //                                 onChange={e => setCurrentName(e.target.value)}
// // // //                                 aria-label="Nama Lengkap"
// // // //                                 title="Nama Lengkap"
// // // //                             />
// // // //                         </div>
// // // //                         <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
// // // //                             <label className="text-[10px] font-bold text-gray-400 uppercase">Role System</label>
// // // //                             <select 
// // // //                                 disabled={!isEditing} 
// // // //                                 className="w-full bg-transparent font-bold text-gray-800 outline-none cursor-pointer" 
// // // //                                 value={currentRole} 
// // // //                                 onChange={e => setCurrentRole(e.target.value)}
// // // //                                 aria-label="Pilih Role System"
// // // //                                 title="Pilih Role System"
// // // //                             >
// // // //                                 <option value="STUDENT">STUDENT</option>
// // // //                                 <option value="FACILITATOR">FACILITATOR</option>
// // // //                                 <option value="ADMIN">ADMIN</option>
// // // //                                 <option value="SUPER_ADMIN">SUPER ADMIN</option>
// // // //                             </select>
// // // //                         </div>
// // // //                     </div>
// // // //                     {isEditing && (
// // // //                         <button onClick={handleResetPassword} className="mt-4 w-full py-3 border-2 border-dashed border-gray-200 text-gray-500 rounded-xl text-xs font-bold hover:border-orange-300 hover:text-orange-600 transition-colors flex items-center justify-center gap-2">
// // // //                             <KeyRound size={14}/> Reset Password ke Default
// // // //                         </button>
// // // //                     )}
// // // //                 </div>

// // // //                 {/* CARD SECURITY */}
// // // //                 <div className={`rounded-3xl shadow-sm border p-6 ${isBanned ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
// // // //                     <div className="flex items-center justify-between mb-4">
// // // //                         <h3 className="font-bold text-gray-800 flex items-center gap-2"><Shield size={18}/> Keamanan</h3>
// // // //                         <label className="relative inline-flex items-center cursor-pointer">
// // // //                             <input 
// // // //                                 type="checkbox" 
// // // //                                 disabled={!isEditing} 
// // // //                                 className="sr-only peer" 
// // // //                                 checked={isBanned} 
// // // //                                 onChange={e => setIsBanned(e.target.checked)}
// // // //                                 aria-label="Status Banned"
// // // //                             />
// // // //                             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
// // // //                         </label>
// // // //                     </div>
// // // //                     {isBanned && (
// // // //                          <textarea 
// // // //                             disabled={!isEditing} 
// // // //                             className="w-full p-3 border border-red-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-red-700 placeholder:text-red-300" 
// // // //                             placeholder="Alasan pembekuan wajib diisi..." 
// // // //                             rows={3}
// // // //                             value={bannedReason} 
// // // //                             onChange={e => setBannedReason(e.target.value)}
// // // //                             aria-label="Alasan Pembekuan"
// // // //                          />
// // // //                     )}
// // // //                     <p className="text-xs text-gray-500 mt-2">
// // // //                         {isBanned ? "User ini tidak dapat login selama status aktif." : "Akun dalam keadaan aman dan dapat diakses."}
// // // //                     </p>
// // // //                 </div>
// // // //             </div>

// // // //             {/* KOLOM KANAN: PERMISSION & SCOPE */}
// // // //             <div className="lg:col-span-2 space-y-8">
                
// // // //                 {/* 1. REGIONAL SCOPE (Hanya utk Admin) */}
// // // //                 {isUserAdmin && !isSuperAdmin && (
// // // //                     <div className="bg-white rounded-3xl shadow-sm border border-orange-200 overflow-hidden">
// // // //                         <div className="bg-orange-50 p-5 border-b border-orange-100 flex items-center gap-3">
// // // //                             <div className="p-2 bg-white rounded-lg text-orange-600 shadow-sm">
// // // //                                 {/* [FIXED] MapPin Imported */}
// // // //                                 <MapPin size={20}/>
// // // //                             </div>
// // // //                             <div>
// // // //                                 <h3 className="font-bold text-orange-900">Cakupan Wilayah Admin</h3>
// // // //                                 <p className="text-xs text-orange-700">Tentukan area yang dapat dikelola oleh admin ini.</p>
// // // //                             </div>
// // // //                         </div>
// // // //                         <div className="p-6">
// // // //                             {isEditing ? (<RegionSelector value={regionConfig} onChange={setRegionConfig} />) : (
// // // //                                 <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
// // // //                                     <span className="text-2xl">🌍</span>
// // // //                                     <div>
// // // //                                         <p className="text-xs font-bold text-gray-400 uppercase">Scope Saat Ini</p>
// // // //                                         <p className="font-bold text-gray-800 text-lg">{regionConfig.scope.toUpperCase()}</p>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             )}
// // // //                         </div>
// // // //                     </div>
// // // //                 )}

// // // //                 {/* 2. PERMISSION MATRIX */}
// // // //                 <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
// // // //                      <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
// // // //                         <div>
// // // //                             <h3 className="font-bold text-gray-800 text-lg">Hak Akses Fitur (Permission)</h3>
// // // //                             <p className="text-xs text-gray-500">Centang fitur yang diizinkan untuk pengguna ini.</p>
// // // //                         </div>
// // // //                         {!isEditing && <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold">Read Only</span>}
// // // //                      </div>
                     
// // // //                      <div className="p-6 space-y-6">
// // // //                         {PERMISSION_CONFIG.map((group, idx) => (
// // // //                             <div key={idx} className={`rounded-2xl border overflow-hidden ${group.color}`}>
// // // //                                 <div className="p-4 flex items-center justify-between bg-white/50 backdrop-blur-sm">
// // // //                                     <div className="flex items-center gap-3">
// // // //                                         {group.icon && <group.icon size={20} className="opacity-70"/>}
// // // //                                         <h4 className="font-bold uppercase tracking-wider text-xs">{group.group}</h4>
// // // //                                     </div>
// // // //                                     {isEditing && (
// // // //                                         <button 
// // // //                                             onClick={() => toggleGroup(group.items)}
// // // //                                             className="text-[10px] font-bold underline opacity-60 hover:opacity-100 transition-opacity"
// // // //                                         >
// // // //                                             {group.items.every(i => permissions.includes(i.id)) ? 'Uncheck All' : 'Select All'}
// // // //                                         </button>
// // // //                                     )}
// // // //                                 </div>
// // // //                                 <div className="p-4 bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                                     {group.items.map((perm) => {
// // // //                                         const isChecked = permissions.includes(perm.id);
// // // //                                         return (
// // // //                                             <label 
// // // //                                                 key={perm.id} 
// // // //                                                 className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isChecked ? 'border-green-200 bg-green-50/50' : 'border-gray-100 hover:border-gray-300'}`}
// // // //                                             >
// // // //                                                 <div className="relative flex items-center mt-1">
// // // //                                                     <input 
// // // //                                                         type="checkbox" 
// // // //                                                         className="peer sr-only" 
// // // //                                                         checked={isChecked} 
// // // //                                                         onChange={() => togglePermission(perm.id)}
// // // //                                                         disabled={!isEditing}
// // // //                                                         aria-label={perm.label}
// // // //                                                     />
// // // //                                                     <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
// // // //                                                 </div>
// // // //                                                 <div>
// // // //                                                     <p className={`text-sm font-bold ${isChecked ? 'text-green-800' : 'text-gray-700'}`}>{perm.label}</p>
// // // //                                                     <p className="text-[11px] text-gray-500 leading-tight mt-0.5">{perm.desc}</p>
// // // //                                                     {perm.danger && <span className="inline-block mt-1 text-[9px] bg-red-100 text-red-600 px-1.5 rounded font-bold border border-red-200">DANGER ZONE</span>}
// // // //                                                 </div>
// // // //                                                 {isChecked ? <CheckCircle2 size={16} className="text-green-500 ml-auto shrink-0"/> : <div className="w-4"/>}
// // // //                                             </label>
// // // //                                         );
// // // //                                     })}
// // // //                                 </div>
// // // //                             </div>
// // // //                         ))}
// // // //                      </div>
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //       </div>
// // // //     </Protected>
// // // //   );
// // // // }



// // // // 'use client';

// // // // import { useEffect, useState } from 'react';
// // // // import { useParams, useRouter } from 'next/navigation';
// // // // import { api, getImageUrl } from '@/lib/api'; 
// // // // import Protected from '@/components/Protected';
// // // // import { 
// // // //     Settings, Save, Shield, KeyRound, 
// // // //     ArrowLeft, Loader2, Info, CheckCircle2, LayoutGrid, MapPin, Users, FileText, Database
// // // // } from 'lucide-react';
// // // // import RegionSelector from '@/components/admin/RegionSelector';

// // // // // Interface
// // // // interface PermissionItem {
// // // //     id: string;
// // // //     label: string;
// // // //     desc: string;
// // // //     danger?: boolean;
// // // // }

// // // // interface PermissionGroup {
// // // //     group: string;
// // // //     color: string;
// // // //     icon: any;
// // // //     items: PermissionItem[];
// // // // }

// // // // // --- [UPDATE] KONFIGURASI PERMISSION LENGKAP & SINKRON ---
// // // // const PERMISSION_CONFIG: PermissionGroup[] = [
// // // //     {
// // // //         group: 'Pelatihan & Kurikulum',
// // // //         color: 'bg-blue-50 text-blue-700 border-blue-100',
// // // //         icon: LayoutGrid,
// // // //         items: [
// // // //             { id: 'manage_courses', label: 'Kelola Pelatihan', desc: 'Buat, edit, hapus, dan publish kursus.' },
// // // //             // [PENTING UNTUK ADMIN WILAYAH]
// // // //             { id: 'verify_course_submission', label: 'Verifikasi Pengajuan', desc: 'Menyetujui pelatihan yang diajukan Fasilitator.' }, 
// // // //             { id: 'manage_certificates', label: 'Template Sertifikat', desc: 'Mengatur desain dan tanda tangan sertifikat.' },
// // // //         ]
// // // //     },
// // // //     {
// // // //         group: 'Manajemen Pengguna',
// // // //         color: 'bg-orange-50 text-orange-700 border-orange-100',
// // // //         icon: Users, 
// // // //         items: [
// // // //             { id: 'manage_users', label: 'Kelola Pengguna', desc: 'Tambah user baru, edit profil, dan reset password.' },
// // // //             { id: 'verify_enrollments', label: 'Verifikasi Pendaftaran', desc: 'Validasi peserta yang mendaftar pelatihan.' },
// // // //         ]
// // // //     },
// // // //     {
// // // //         group: 'Konten & Website',
// // // //         color: 'bg-purple-50 text-purple-700 border-purple-100',
// // // //         icon: FileText,
// // // //         items: [
// // // //             { id: 'manage_blogs', label: 'Blog & Artikel', desc: 'Tulis dan moderasi artikel blog.' },
// // // //             { id: 'manage_cms_design', label: 'Tampilan Web (CMS)', desc: 'Ubah banner, slider, dan info website.' },
// // // //         ]
// // // //     },
// // // //     {
// // // //         group: 'Sistem (Super Admin)',
// // // //         color: 'bg-red-50 text-red-800 border-red-200',
// // // //         icon: Shield,
// // // //         items: [
// // // //             { id: 'view_analytics', label: 'Lihat Statistik', desc: 'Akses dashboard analitik lengkap.' },
// // // //             { id: 'manage_system', label: 'Konfigurasi Sistem', desc: 'Akses database dan backup (Bahaya).', danger: true },
// // // //         ]
// // // //     }
// // // // ];

// // // // export default function AdminUserDetailPage() {
// // // //   const params = useParams();
// // // //   const userId = params?.userId || params?.id;
// // // //   const router = useRouter();
  
// // // //   const [data, setData] = useState<any>(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState<string | null>(null);

// // // //   const [isEditing, setIsEditing] = useState(false);
// // // //   const [isSaving, setIsSaving] = useState(false);
  
// // // //   // State Form
// // // //   const [currentName, setCurrentName] = useState('');
// // // //   const [currentRole, setCurrentRole] = useState('');
// // // //   const [permissions, setPermissions] = useState<string[]>([]);
  
// // // //   // State Banned
// // // //   const [isBanned, setIsBanned] = useState(false);
// // // //   const [bannedReason, setBannedReason] = useState('');

// // // //   const [regionConfig, setRegionConfig] = useState<any>({ scope: 'national', provinces: [], regencies: [] });

// // // //   useEffect(() => {
// // // //     if (!userId || typeof userId !== 'string') { setError("ID Pengguna tidak valid."); setLoading(false); return; }
// // // //     loadData();
// // // //   }, [userId]);

// // // //   const loadData = async () => {
// // // //     try {
// // // //         setLoading(true);
// // // //         const res = await api(`/api/admin/users/${userId}/details`);
// // // //         if (res.success && res.user) {
// // // //           setData(res);
// // // //           setCurrentName(res.user.name);
// // // //           setCurrentRole(res.user.role);
// // // //           setPermissions(res.user.permissions || []);
// // // //           setIsBanned(res.user.isBanned || false);
// // // //           setBannedReason(res.user.bannedReason || '');
// // // //           setRegionConfig({
// // // //               scope: res.user.regionScope || 'national',
// // // //               provinces: res.user.managedProvinces || [],
// // // //               regencies: res.user.managedRegencies || []
// // // //           });
// // // //         } else { setError(res.error || "Gagal memuat data."); }
// // // //       } catch (err: any) { setError(err.message || "Terjadi kesalahan"); } finally { setLoading(false); }
// // // //   };

// // // //   const handleSaveAll = async () => {
// // // //       setIsSaving(true);
// // // //       try {
// // // //           const payload = {
// // // //               name: currentName,
// // // //               role: currentRole,
// // // //               permissions: permissions, 
// // // //               regionScope: regionConfig.scope,
// // // //               managedProvinces: regionConfig.provinces,
// // // //               managedRegencies: regionConfig.regencies,
// // // //               isBanned: isBanned,
// // // //               bannedReason: bannedReason
// // // //           };
// // // //           await api(`/api/admin/users/${userId}`, { method: 'PATCH', body: payload });
// // // //           alert("✅ Data pengguna berhasil diperbarui!");
// // // //           setIsEditing(false);
// // // //           loadData(); 
// // // //       } catch (err: any) { alert("❌ Gagal menyimpan: " + err.message); } finally { setIsSaving(false); }
// // // //   };

// // // //   const togglePermission = (id: string) => {
// // // //       setPermissions(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
// // // //   };

// // // //   const toggleGroup = (items: PermissionItem[]) => {
// // // //       const ids = items.map(i => i.id);
// // // //       const allSelected = ids.every(id => permissions.includes(id));
      
// // // //       if (allSelected) {
// // // //           setPermissions(prev => prev.filter(p => !ids.includes(p)));
// // // //       } else {
// // // //           const newPerms = new Set([...permissions, ...ids]);
// // // //           setPermissions(Array.from(newPerms));
// // // //       }
// // // //   };

// // // //   const handleResetPassword = async () => {
// // // //       if (!confirm(`Reset password user ini menjadi "123456"?`)) return;
// // // //       try {
// // // //           await api(`/api/admin/users/${userId}/reset-password`, { method: 'PATCH' });
// // // //           alert("✅ Sukses! Password telah direset.");
// // // //       } catch (err: any) { alert("Gagal: " + err.message); }
// // // //   };

// // // //   if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// // // //   if (error || !data?.user) return <div className="p-10 text-center text-red-500 font-bold">{error || "User tidak ditemukan."}</div>;

// // // //   const isUserAdmin = currentRole === 'ADMIN';
// // // //   const isSuperAdmin = data.user.role === 'SUPER_ADMIN'; 

// // // //   return (
// // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
// // // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-32">
        
// // // //         {/* TOP BAR */}
// // // //         <div className="flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-20 py-4 px-6 rounded-2xl shadow-sm border border-gray-200">
// // // //           <div className="flex items-center gap-4">
// // // //              <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-all" title="Kembali" aria-label="Kembali">
// // // //                 <ArrowLeft size={24} className="text-gray-600"/>
// // // //              </button>
// // // //              <div>
// // // //                  <h1 className="text-xl font-bold text-gray-900">{data.user.name}</h1>
// // // //                  <p className="text-xs text-gray-500 uppercase tracking-wide">{data.user.role} • {data.user.email}</p>
// // // //              </div>
// // // //           </div>
// // // //           <div className="flex gap-3">
// // // //              {!isEditing ? (
// // // //                  <button onClick={() => setIsEditing(true)} className="bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-red-800 flex items-center gap-2 shadow-lg transition-transform active:scale-95">
// // // //                     <Settings size={18}/> Edit Akses
// // // //                  </button>
// // // //              ) : (
// // // //                  <div className="flex gap-3 animate-in fade-in slide-in-from-right-5">
// // // //                     <button onClick={() => { setIsEditing(false); loadData(); }} className="px-5 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">Batal</button>
// // // //                     <button onClick={handleSaveAll} disabled={isSaving} className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 flex items-center gap-2 shadow-lg disabled:opacity-50 transition-transform active:scale-95">
// // // //                         {isSaving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Simpan Perubahan
// // // //                     </button>
// // // //                  </div>
// // // //              )}
// // // //           </div>
// // // //         </div>
        
// // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // //             {/* KOLOM KIRI: DATA UTAMA */}
// // // //             <div className="lg:col-span-1 space-y-6">
                
// // // //                 {/* CARD FOTO PROFIL */}
// // // //                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
// // // //                     <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-50 shadow-inner">
// // // //                         <img src={getImageUrl(data.user.avatarUrl)} className="w-full h-full object-cover" alt="Avatar"/>
// // // //                     </div>
// // // //                     <div className={`px-3 py-1 rounded-full text-xs font-bold mb-4 ${isBanned ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
// // // //                         {isBanned ? 'ACCOUNT BANNED' : 'ACTIVE MEMBER'}
// // // //                     </div>
// // // //                     <div className="w-full space-y-3 text-left">
// // // //                         <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
// // // //                             <label className="text-[10px] font-bold text-gray-400 uppercase">Nama Lengkap</label>
// // // //                             <input 
// // // //                                 disabled={!isEditing} 
// // // //                                 className="w-full bg-transparent font-bold text-gray-800 outline-none" 
// // // //                                 value={currentName} 
// // // //                                 onChange={e => setCurrentName(e.target.value)}
// // // //                                 aria-label="Nama Lengkap"
// // // //                             />
// // // //                         </div>
// // // //                         <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
// // // //                             <label className="text-[10px] font-bold text-gray-400 uppercase">Role System</label>
// // // //                             <select 
// // // //                                 disabled={!isEditing} 
// // // //                                 className="w-full bg-transparent font-bold text-gray-800 outline-none cursor-pointer" 
// // // //                                 value={currentRole} 
// // // //                                 onChange={e => setCurrentRole(e.target.value)}
// // // //                                 aria-label="Pilih Role"
// // // //                             >
// // // //                                 <option value="STUDENT">STUDENT</option>
// // // //                                 <option value="FACILITATOR">FACILITATOR</option>
// // // //                                 <option value="ADMIN">ADMIN</option>
// // // //                                 <option value="SUPER_ADMIN">SUPER ADMIN</option>
// // // //                             </select>
// // // //                         </div>
// // // //                     </div>
// // // //                     {isEditing && (
// // // //                         <button onClick={handleResetPassword} className="mt-4 w-full py-3 border-2 border-dashed border-gray-200 text-gray-500 rounded-xl text-xs font-bold hover:border-orange-300 hover:text-orange-600 transition-colors flex items-center justify-center gap-2">
// // // //                             <KeyRound size={14}/> Reset Password ke Default
// // // //                         </button>
// // // //                     )}
// // // //                 </div>

// // // //                 {/* CARD SECURITY */}
// // // //                 <div className={`rounded-3xl shadow-sm border p-6 ${isBanned ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
// // // //                     <div className="flex items-center justify-between mb-4">
// // // //                         <h3 className="font-bold text-gray-800 flex items-center gap-2"><Shield size={18}/> Keamanan</h3>
// // // //                         <label className="relative inline-flex items-center cursor-pointer">
// // // //                             <input 
// // // //                                 type="checkbox" 
// // // //                                 disabled={!isEditing} 
// // // //                                 className="sr-only peer" 
// // // //                                 checked={isBanned} 
// // // //                                 onChange={e => setIsBanned(e.target.checked)}
// // // //                                 aria-label="Banned Toggle"
// // // //                             />
// // // //                             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
// // // //                         </label>
// // // //                     </div>
// // // //                     {isBanned && (
// // // //                          <textarea 
// // // //                             disabled={!isEditing} 
// // // //                             className="w-full p-3 border border-red-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-red-700 placeholder:text-red-300" 
// // // //                             placeholder="Alasan pembekuan wajib diisi..." 
// // // //                             rows={3}
// // // //                             value={bannedReason} 
// // // //                             onChange={e => setBannedReason(e.target.value)}
// // // //                             aria-label="Alasan Banned"
// // // //                          />
// // // //                     )}
// // // //                     <p className="text-xs text-gray-500 mt-2">
// // // //                         {isBanned ? "User ini tidak dapat login selama status aktif." : "Akun dalam keadaan aman dan dapat diakses."}
// // // //                     </p>
// // // //                 </div>
// // // //             </div>

// // // //             {/* KOLOM KANAN: PERMISSION & SCOPE */}
// // // //             <div className="lg:col-span-2 space-y-8">
                
// // // //                 {/* 1. REGIONAL SCOPE (Hanya utk Admin) */}
// // // //                 {isUserAdmin && !isSuperAdmin && (
// // // //                     <div className="bg-white rounded-3xl shadow-sm border border-orange-200 overflow-hidden">
// // // //                         <div className="bg-orange-50 p-5 border-b border-orange-100 flex items-center gap-3">
// // // //                             <div className="p-2 bg-white rounded-lg text-orange-600 shadow-sm">
// // // //                                 <MapPin size={20}/>
// // // //                             </div>
// // // //                             <div>
// // // //                                 <h3 className="font-bold text-orange-900">Cakupan Wilayah Admin</h3>
// // // //                                 <p className="text-xs text-orange-700">Tentukan area yang dapat dikelola oleh admin ini.</p>
// // // //                             </div>
// // // //                         </div>
// // // //                         <div className="p-6">
// // // //                             {isEditing ? (<RegionSelector value={regionConfig} onChange={setRegionConfig} />) : (
// // // //                                 <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
// // // //                                     <span className="text-2xl">🌍</span>
// // // //                                     <div>
// // // //                                         <p className="text-xs font-bold text-gray-400 uppercase">Scope Saat Ini</p>
// // // //                                         <div className="font-bold text-gray-800 text-lg flex flex-wrap gap-2">
// // // //                                             {regionConfig.scope === 'national' ? 'NASIONAL' : 
// // // //                                              regionConfig.provinces.length > 0 ? regionConfig.provinces.join(', ') : 
// // // //                                              regionConfig.regencies.join(', ')}
// // // //                                         </div>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             )}
// // // //                         </div>
// // // //                     </div>
// // // //                 )}

// // // //                 {/* 2. PERMISSION MATRIX */}
// // // //                 <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
// // // //                      <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
// // // //                         <div>
// // // //                             <h3 className="font-bold text-gray-800 text-lg">Hak Akses Fitur (Permission)</h3>
// // // //                             <p className="text-xs text-gray-500">Centang fitur yang diizinkan untuk pengguna ini.</p>
// // // //                         </div>
// // // //                         {!isEditing && <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold">Read Only</span>}
// // // //                      </div>
                     
// // // //                      <div className="p-6 space-y-6">
// // // //                         {PERMISSION_CONFIG.map((group, idx) => (
// // // //                             <div key={idx} className={`rounded-2xl border overflow-hidden ${group.color}`}>
// // // //                                 <div className="p-4 flex items-center justify-between bg-white/50 backdrop-blur-sm">
// // // //                                     <div className="flex items-center gap-3">
// // // //                                         {group.icon && <group.icon size={20} className="opacity-70"/>}
// // // //                                         <h4 className="font-bold uppercase tracking-wider text-xs">{group.group}</h4>
// // // //                                     </div>
// // // //                                     {isEditing && (
// // // //                                         <button 
// // // //                                             onClick={() => toggleGroup(group.items)}
// // // //                                             className="text-[10px] font-bold underline opacity-60 hover:opacity-100 transition-opacity"
// // // //                                         >
// // // //                                             {group.items.every(i => permissions.includes(i.id)) ? 'Uncheck All' : 'Select All'}
// // // //                                         </button>
// // // //                                     )}
// // // //                                 </div>
// // // //                                 <div className="p-4 bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                                     {group.items.map((perm) => {
// // // //                                         const isChecked = permissions.includes(perm.id);
// // // //                                         return (
// // // //                                             <label 
// // // //                                                 key={perm.id} 
// // // //                                                 className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isChecked ? 'border-green-200 bg-green-50/50' : 'border-gray-100 hover:border-gray-300'}`}
// // // //                                             >
// // // //                                                 <div className="relative flex items-center mt-1">
// // // //                                                     <input 
// // // //                                                         type="checkbox" 
// // // //                                                         className="peer sr-only" 
// // // //                                                         checked={isChecked} 
// // // //                                                         onChange={() => togglePermission(perm.id)}
// // // //                                                         disabled={!isEditing}
// // // //                                                         aria-label={perm.label}
// // // //                                                     />
// // // //                                                     <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
// // // //                                                 </div>
// // // //                                                 <div>
// // // //                                                     <p className={`text-sm font-bold ${isChecked ? 'text-green-800' : 'text-gray-700'}`}>{perm.label}</p>
// // // //                                                     <p className="text-[11px] text-gray-500 leading-tight mt-0.5">{perm.desc}</p>
// // // //                                                     {perm.danger && <span className="inline-block mt-1 text-[9px] bg-red-100 text-red-600 px-1.5 rounded font-bold border border-red-200">DANGER ZONE</span>}
// // // //                                                 </div>
// // // //                                                 {isChecked ? <CheckCircle2 size={16} className="text-green-500 ml-auto shrink-0"/> : <div className="w-4"/>}
// // // //                                             </label>
// // // //                                         );
// // // //                                     })}
// // // //                                 </div>
// // // //                             </div>
// // // //                         ))}
// // // //                      </div>
// // // //                 </div>
// // // //             </div>
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
// // // import { 
// // //     Settings, Save, Shield, KeyRound, 
// // //     ArrowLeft, Loader2, Info, CheckCircle2, LayoutGrid, MapPin, Users, FileText, Database
// // // } from 'lucide-react';
// // // import RegionSelector from '@/components/admin/RegionSelector';

// // // // Interface
// // // interface PermissionItem {
// // //     id: string;
// // //     label: string;
// // //     desc: string;
// // //     danger?: boolean;
// // // }

// // // interface PermissionGroup {
// // //     group: string;
// // //     color: string;
// // //     icon: any;
// // //     items: PermissionItem[];
// // // }

// // // // --- [UPDATE] KONFIGURASI PERMISSION LENGKAP & SINKRON ---
// // // const PERMISSION_CONFIG: PermissionGroup[] = [
// // //     {
// // //         group: 'Pelatihan & Kurikulum',
// // //         color: 'bg-blue-50 text-blue-700 border-blue-100',
// // //         icon: LayoutGrid,
// // //         items: [
// // //             { id: 'manage_courses', label: 'Kelola Pelatihan', desc: 'Buat, edit, hapus, dan publish kursus.' },
// // //             // [PENTING UNTUK ADMIN WILAYAH]
// // //             { id: 'verify_course_submission', label: 'Verifikasi Pengajuan', desc: 'Menyetujui pelatihan yang diajukan Fasilitator.' }, 
// // //             { id: 'manage_certificates', label: 'Template Sertifikat', desc: 'Mengatur desain dan tanda tangan sertifikat.' },
// // //         ]
// // //     },
// // //     {
// // //         group: 'Manajemen Pengguna',
// // //         color: 'bg-orange-50 text-orange-700 border-orange-100',
// // //         icon: Users, 
// // //         items: [
// // //             { id: 'manage_users', label: 'Kelola Pengguna', desc: 'Tambah user baru, edit profil, dan reset password.' },
// // //             { id: 'verify_enrollments', label: 'Verifikasi Pendaftaran', desc: 'Validasi peserta yang mendaftar pelatihan.' },
// // //         ]
// // //     },
// // //     {
// // //         group: 'Konten & Website',
// // //         color: 'bg-purple-50 text-purple-700 border-purple-100',
// // //         icon: FileText,
// // //         items: [
// // //             { id: 'manage_blogs', label: 'Blog & Artikel', desc: 'Tulis dan moderasi artikel blog.' },
// // //             { id: 'manage_cms_design', label: 'Tampilan Web (CMS)', desc: 'Ubah banner, slider, dan info website.' },
// // //         ]
// // //     },
// // //     {
// // //         group: 'Sistem (Super Admin)',
// // //         color: 'bg-red-50 text-red-800 border-red-200',
// // //         icon: Shield,
// // //         items: [
// // //             { id: 'view_analytics', label: 'Lihat Statistik', desc: 'Akses dashboard analitik lengkap.' },
// // //             { id: 'manage_system', label: 'Konfigurasi Sistem', desc: 'Akses database dan backup (Bahaya).', danger: true },
// // //         ]
// // //     }
// // // ];

// // // export default function AdminUserDetailPage() {
// // //   const params = useParams();
// // //   const userId = params?.userId || params?.id;
// // //   const router = useRouter();
  
// // //   const [data, setData] = useState<any>(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);

// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [isSaving, setIsSaving] = useState(false);
  
// // //   // State Form
// // //   const [currentName, setCurrentName] = useState('');
// // //   const [currentRole, setCurrentRole] = useState('');
// // //   const [permissions, setPermissions] = useState<string[]>([]);
  
// // //   // State Banned
// // //   const [isBanned, setIsBanned] = useState(false);
// // //   const [bannedReason, setBannedReason] = useState('');

// // //   // [BARU] State Region
// // //   const [regionConfig, setRegionConfig] = useState<any>({ scope: 'national', provinces: [], regencies: [] });

// // //   useEffect(() => {
// // //     if (!userId || typeof userId !== 'string') { setError("ID Pengguna tidak valid."); setLoading(false); return; }
// // //     loadData();
// // //   }, [userId]);

// // //   const loadData = async () => {
// // //     try {
// // //         setLoading(true);
// // //         const res = await api(`/api/admin/users/${userId}/details`);
// // //         if (res.success && res.user) {
// // //           setData(res);
// // //           setCurrentName(res.user.name);
// // //           setCurrentRole(res.user.role);
// // //           setPermissions(res.user.permissions || []);
// // //           setIsBanned(res.user.isBanned || false);
// // //           setBannedReason(res.user.bannedReason || '');
          
// // //           // [LOAD REGION]
// // //           setRegionConfig({
// // //               scope: res.user.regionScope || 'national',
// // //               provinces: res.user.managedProvinces || [],
// // //               regencies: res.user.managedRegencies || []
// // //           });
// // //         } else { setError(res.error || "Gagal memuat data."); }
// // //       } catch (err: any) { setError(err.message || "Terjadi kesalahan"); } finally { setLoading(false); }
// // //   };

// // //   const handleSaveAll = async () => {
// // //       setIsSaving(true);
// // //       try {
// // //           const payload = {
// // //               name: currentName,
// // //               role: currentRole,
// // //               permissions: permissions, 
              
// // //               // [SIMPAN REGION]
// // //               regionScope: regionConfig.scope,
// // //               managedProvinces: regionConfig.provinces,
// // //               managedRegencies: regionConfig.regencies,
              
// // //               isBanned: isBanned,
// // //               bannedReason: bannedReason
// // //           };
// // //           await api(`/api/admin/users/${userId}`, { method: 'PATCH', body: payload });
// // //           alert("✅ Data pengguna berhasil diperbarui!");
// // //           setIsEditing(false);
// // //           loadData(); 
// // //       } catch (err: any) { alert("❌ Gagal menyimpan: " + err.message); } finally { setIsSaving(false); }
// // //   };

// // //   const togglePermission = (id: string) => {
// // //       setPermissions(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
// // //   };

// // //   const toggleGroup = (items: PermissionItem[]) => {
// // //       const ids = items.map(i => i.id);
// // //       const allSelected = ids.every(id => permissions.includes(id));
      
// // //       if (allSelected) {
// // //           setPermissions(prev => prev.filter(p => !ids.includes(p)));
// // //       } else {
// // //           const newPerms = new Set([...permissions, ...ids]);
// // //           setPermissions(Array.from(newPerms));
// // //       }
// // //   };

// // //   const handleResetPassword = async () => {
// // //       if (!confirm(`Reset password user ini menjadi "123456"?`)) return;
// // //       try {
// // //           await api(`/api/admin/users/${userId}/reset-password`, { method: 'PATCH' });
// // //           alert("✅ Sukses! Password telah direset.");
// // //       } catch (err: any) { alert("Gagal: " + err.message); }
// // //   };

// // //   if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// // //   if (error || !data?.user) return <div className="p-10 text-center text-red-500 font-bold">{error || "User tidak ditemukan."}</div>;

// // //   const isUserAdmin = currentRole === 'ADMIN';
// // //   const isFacilitator = currentRole === 'FACILITATOR'; // [BARU] Cek Fasilitator
// // //   const isSuperAdmin = data.user.role === 'SUPER_ADMIN'; 
  
// // //   // Logic Tampilkan Region Selector: Jika Admin ATAU Fasilitator
// // //   const canHaveRegion = (isUserAdmin || isFacilitator) && !isSuperAdmin;

// // //   return (
// // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
// // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-32">
        
// // //        {/* TOP BAR */}
// // // <div className="flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-20 py-4 px-6 rounded-2xl shadow-sm border border-gray-200">
// // //   <div className="flex items-center gap-4">
// // //      <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-all" title="Kembali">
// // //         <ArrowLeft size={24} className="text-gray-600"/>
// // //      </button>
// // //      <div>
// // //          <h1 className="text-xl font-bold text-gray-900">{data.user.name}</h1>
// // //          <div className="flex items-center gap-2 text-xs mt-1">
// // //              <span className="font-bold text-gray-600 uppercase tracking-wide">{data.user.role} • {data.user.email}</span>
// // //              {/* [FIX] TAMPILAN DOMISILI (Gambar 4) */}
// // //              {(data.user.city || data.user.province) && (
// // //                  <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-gray-600 border border-gray-200">
// // //                      <MapPin size={10}/> {data.user.city ? `${data.user.city}, ` : ''}{data.user.province}
// // //                  </span>
// // //              )}
// // //          </div>
// // //      </div>
// // //   </div>
// // //   <div className="flex gap-3">
// // //      {!isEditing ? (
// // //          <button onClick={() => setIsEditing(true)} className="bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-red-800 flex items-center gap-2 shadow-lg transition-transform active:scale-95">
// // //             <Settings size={18}/> Edit Akses
// // //          </button>
// // //      ) : (
// // //          <div className="flex gap-3 animate-in fade-in slide-in-from-right-5">
// // //             <button onClick={() => { setIsEditing(false); loadData(); }} className="px-5 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">Batal</button>
// // //             <button onClick={handleSaveAll} disabled={isSaving} className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 flex items-center gap-2 shadow-lg disabled:opacity-50 transition-transform active:scale-95">
// // //                 {isSaving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Simpan Perubahan
// // //             </button>
// // //          </div>
// // //      )}
// // //   </div>
// // // </div>
        
// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // //             {/* KOLOM KIRI: DATA UTAMA */}
// // //             <div className="lg:col-span-1 space-y-6">
                
// // //                 {/* CARD FOTO PROFIL */}
// // //                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
// // //                     <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-50 shadow-inner">
// // //                         <img src={getImageUrl(data.user.avatarUrl)} className="w-full h-full object-cover" alt="Avatar"/>
// // //                     </div>
// // //                     <div className={`px-3 py-1 rounded-full text-xs font-bold mb-4 ${isBanned ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
// // //                         {isBanned ? 'ACCOUNT BANNED' : 'ACTIVE MEMBER'}
// // //                     </div>
// // //                     <div className="w-full space-y-3 text-left">
// // //                         <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
// // //                             <label className="text-[10px] font-bold text-gray-400 uppercase">Nama Lengkap</label>
// // //                             <input 
// // //                                 disabled={!isEditing} 
// // //                                 className="w-full bg-transparent font-bold text-gray-800 outline-none" 
// // //                                 value={currentName} 
// // //                                 onChange={e => setCurrentName(e.target.value)}
// // //                                 aria-label="Nama Lengkap"
// // //                             />
// // //                         </div>
// // //                         <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
// // //                             <label className="text-[10px] font-bold text-gray-400 uppercase">Role System</label>
// // //                             <select 
// // //                                 disabled={!isEditing} 
// // //                                 className="w-full bg-transparent font-bold text-gray-800 outline-none cursor-pointer" 
// // //                                 value={currentRole} 
// // //                                 onChange={e => setCurrentRole(e.target.value)}
// // //                                 aria-label="Pilih Role"
// // //                             >
// // //                                 <option value="STUDENT">STUDENT</option>
// // //                                 <option value="FACILITATOR">FACILITATOR</option>
// // //                                 <option value="ADMIN">ADMIN</option>
// // //                                 <option value="SUPER_ADMIN">SUPER ADMIN</option>
// // //                             </select>
// // //                         </div>
// // //                     </div>
// // //                     {isEditing && (
// // //                         <button onClick={handleResetPassword} className="mt-4 w-full py-3 border-2 border-dashed border-gray-200 text-gray-500 rounded-xl text-xs font-bold hover:border-orange-300 hover:text-orange-600 transition-colors flex items-center justify-center gap-2">
// // //                             <KeyRound size={14}/> Reset Password ke Default
// // //                         </button>
// // //                     )}
// // //                 </div>

// // //                 {/* CARD SECURITY */}
// // //                 <div className={`rounded-3xl shadow-sm border p-6 ${isBanned ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
// // //                     <div className="flex items-center justify-between mb-4">
// // //                         <h3 className="font-bold text-gray-800 flex items-center gap-2"><Shield size={18}/> Keamanan</h3>
// // //                         <label className="relative inline-flex items-center cursor-pointer">
// // //                             <input 
// // //                                 type="checkbox" 
// // //                                 disabled={!isEditing} 
// // //                                 className="sr-only peer" 
// // //                                 checked={isBanned} 
// // //                                 onChange={e => setIsBanned(e.target.checked)}
// // //                                 aria-label="Banned Toggle"
// // //                             />
// // //                             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
// // //                         </label>
// // //                     </div>
// // //                     {isBanned && (
// // //                          <textarea 
// // //                             disabled={!isEditing} 
// // //                             className="w-full p-3 border border-red-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-red-700 placeholder:text-red-300" 
// // //                             placeholder="Alasan pembekuan wajib diisi..." 
// // //                             rows={3}
// // //                             value={bannedReason} 
// // //                             onChange={e => setBannedReason(e.target.value)}
// // //                             aria-label="Alasan Banned"
// // //                           />
// // //                     )}
// // //                     <p className="text-xs text-gray-500 mt-2">
// // //                         {isBanned ? "User ini tidak dapat login selama status aktif." : "Akun dalam keadaan aman dan dapat diakses."}
// // //                     </p>
// // //                 </div>
// // //             </div>

// // //             {/* KOLOM KANAN: PERMISSION & SCOPE */}
// // //             <div className="lg:col-span-2 space-y-8">
                
// // //                 {/* 1. REGIONAL SCOPE & LEVEL FASILITATOR (BARU) */}
// // //                 {canHaveRegion && (
// // //                     <div className="bg-white rounded-3xl shadow-sm border border-orange-200 overflow-hidden">
// // //                         <div className="bg-orange-50 p-5 border-b border-orange-100 flex items-center gap-3">
// // //                             <div className="p-2 bg-white rounded-lg text-orange-600 shadow-sm">
// // //                                 <MapPin size={20}/>
// // //                             </div>
// // //                             <div>
// // //                                 <h3 className="font-bold text-orange-900">
// // //                                     {isFacilitator ? 'Tingkatan Fasilitator' : 'Cakupan Wilayah Admin'}
// // //                                 </h3>
// // //                                 <p className="text-xs text-orange-700">
// // //                                     {isFacilitator 
// // //                                         ? 'Tentukan level wilayah (Provinsi/Kota) di mana fasilitator ini boleh membuat pelatihan.' 
// // //                                         : 'Tentukan area yang dapat dikelola oleh admin ini.'}
// // //                                 </p>
// // //                             </div>
// // //                         </div>
// // //                         <div className="p-6">
// // //                             {isEditing ? (
// // //                                 <RegionSelector value={regionConfig} onChange={setRegionConfig} />
// // //                             ) : (
// // //                                 <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
// // //                                     <span className="text-2xl">🌍</span>
// // //                                     <div>
// // //                                         <p className="text-xs font-bold text-gray-400 uppercase">
// // //                                             {isFacilitator ? 'Level Saat Ini' : 'Scope Saat Ini'}
// // //                                         </p>
// // //                                         <div className="font-bold text-gray-800 text-lg flex flex-wrap gap-2">
// // //                                             {regionConfig.scope === 'national' ? 'NASIONAL (PUSAT)' : 
// // //                                             regionConfig.scope === 'province' ? `PROVINSI (${regionConfig.provinces.length})` :
// // //                                             `KABUPATEN/KOTA (${regionConfig.regencies.length})`}
// // //                                         </div>
// // //                                         {/* Tampilkan detail nama wilayah */}
// // //                                         <div className="text-xs text-gray-500 mt-1">
// // //                                              {regionConfig.provinces.length > 0 && <span className="mr-2">Prov: {regionConfig.provinces.join(', ')}</span>}
// // //                                              {regionConfig.regencies.length > 0 && <span>Kab: {regionConfig.regencies.join(', ')}</span>}
// // //                                         </div>
// // //                                     </div>
// // //                                 </div>
// // //                             )}
// // //                         </div>
// // //                     </div>
// // //                 )}

// // //                 {/* 2. PERMISSION MATRIX */}
// // //                 <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
// // //                       <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
// // //                         <div>
// // //                             <h3 className="font-bold text-gray-800 text-lg">Hak Akses Fitur (Permission)</h3>
// // //                             <p className="text-xs text-gray-500">Centang fitur yang diizinkan untuk pengguna ini.</p>
// // //                         </div>
// // //                         {!isEditing && <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold">Read Only</span>}
// // //                       </div>
                      
// // //                       <div className="p-6 space-y-6">
// // //                         {PERMISSION_CONFIG.map((group, idx) => (
// // //                             <div key={idx} className={`rounded-2xl border overflow-hidden ${group.color}`}>
// // //                                 <div className="p-4 flex items-center justify-between bg-white/50 backdrop-blur-sm">
// // //                                     <div className="flex items-center gap-3">
// // //                                         {group.icon && <group.icon size={20} className="opacity-70"/>}
// // //                                         <h4 className="font-bold uppercase tracking-wider text-xs">{group.group}</h4>
// // //                                     </div>
// // //                                     {isEditing && (
// // //                                         <button 
// // //                                             onClick={() => toggleGroup(group.items)}
// // //                                             className="text-[10px] font-bold underline opacity-60 hover:opacity-100 transition-opacity"
// // //                                         >
// // //                                             {group.items.every(i => permissions.includes(i.id)) ? 'Uncheck All' : 'Select All'}
// // //                                         </button>
// // //                                     )}
// // //                                 </div>
// // //                                 <div className="p-4 bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                                     {group.items.map((perm) => {
// // //                                         const isChecked = permissions.includes(perm.id);
// // //                                         return (
// // //                                             <label 
// // //                                                 key={perm.id} 
// // //                                                 className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isChecked ? 'border-green-200 bg-green-50/50' : 'border-gray-100 hover:border-gray-300'}`}
// // //                                             >
// // //                                                 <div className="relative flex items-center mt-1">
// // //                                                     <input 
// // //                                                         type="checkbox" 
// // //                                                         className="peer sr-only" 
// // //                                                         checked={isChecked} 
// // //                                                         onChange={() => togglePermission(perm.id)}
// // //                                                         disabled={!isEditing}
// // //                                                         aria-label={perm.label}
// // //                                                     />
// // //                                                     <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
// // //                                                 </div>
// // //                                                 <div>
// // //                                                     <p className={`text-sm font-bold ${isChecked ? 'text-green-800' : 'text-gray-700'}`}>{perm.label}</p>
// // //                                                     <p className="text-[11px] text-gray-500 leading-tight mt-0.5">{perm.desc}</p>
// // //                                                     {perm.danger && <span className="inline-block mt-1 text-[9px] bg-red-100 text-red-600 px-1.5 rounded font-bold border border-red-200">DANGER ZONE</span>}
// // //                                                 </div>
// // //                                                 {isChecked ? <CheckCircle2 size={16} className="text-green-500 ml-auto shrink-0"/> : <div className="w-4"/>}
// // //                                             </label>
// // //                                         );
// // //                                     })}
// // //                                 </div>
// // //                             </div>
// // //                         ))}
// // //                       </div>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //       </div>
// // //     </Protected>
// // //   );
// // // }

// // 'use client';

// // import { useEffect, useState, useRef } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import { api, getImageUrl } from '@/lib/api'; 
// // import Protected from '@/components/Protected';
// // import { 
// //     Settings, Save, Shield, KeyRound, 
// //     ArrowLeft, Loader2, Info, CheckCircle2, LayoutGrid, MapPin, Users, FileText, RefreshCcw, Camera, UserCircle
// // } from 'lucide-react';
// // import RegionSelector from '@/components/admin/RegionSelector';
// // import { getProvinces, getRegencies } from '@/lib/indonesia';

// // // Interfaces
// // interface PermissionItem { id: string; label: string; desc: string; danger?: boolean; }
// // interface PermissionGroup { group: string; color: string; icon: any; items: PermissionItem[]; }

// // // Config Permission
// // const PERMISSION_CONFIG: PermissionGroup[] = [
// //     {
// //         group: 'Pelatihan & Kurikulum',
// //         color: 'bg-blue-50 text-blue-700 border-blue-100',
// //         icon: LayoutGrid,
// //         items: [
// //             { id: 'manage_courses', label: 'Kelola Pelatihan', desc: 'Buat, edit, hapus, dan publish kursus.' },
// //             { id: 'verify_course_submission', label: 'Verifikasi Pengajuan', desc: 'Menyetujui pelatihan yang diajukan Fasilitator.' }, 
// //             { id: 'manage_certificates', label: 'Template Sertifikat', desc: 'Mengatur desain dan tanda tangan sertifikat.' },
// //         ]
// //     },
// //     {
// //         group: 'Manajemen Pengguna',
// //         color: 'bg-orange-50 text-orange-700 border-orange-100',
// //         icon: Users, 
// //         items: [
// //             { id: 'manage_users', label: 'Kelola Pengguna', desc: 'Tambah user baru, edit profil, dan reset password.' },
// //             { id: 'verify_enrollments', label: 'Verifikasi Pendaftaran', desc: 'Validasi peserta yang mendaftar pelatihan.' },
// //         ]
// //     },
// //     {
// //         group: 'Konten & Website',
// //         color: 'bg-purple-50 text-purple-700 border-purple-100',
// //         icon: FileText,
// //         items: [
// //             { id: 'manage_blogs', label: 'Blog & Artikel', desc: 'Tulis dan moderasi artikel blog.' },
// //             { id: 'manage_cms_design', label: 'Tampilan Web (CMS)', desc: 'Ubah banner, slider, dan info website.' },
// //         ]
// //     },
// //     {
// //         group: 'Sistem (Super Admin)',
// //         color: 'bg-red-50 text-red-800 border-red-200',
// //         icon: Shield,
// //         items: [
// //             { id: 'view_analytics', label: 'Lihat Statistik', desc: 'Akses dashboard analitik lengkap.' },
// //             { id: 'manage_system', label: 'Konfigurasi Sistem', desc: 'Akses database dan backup (Bahaya).', danger: true },
// //         ]
// //     }
// // ];

// // export default function AdminUserDetailPage() {
// //     const params = useParams();
// //     const userId = params?.userId || params?.id;
// //     const router = useRouter();
// //     const fileInputRef = useRef<HTMLInputElement>(null);
    
// //     const [data, setData] = useState<any>(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState<string | null>(null);

// //     const [isEditing, setIsEditing] = useState(false);
// //     const [isSaving, setIsSaving] = useState(false);
    
// //     // State Form
// //     const [currentName, setCurrentName] = useState('');
// //     const [currentRole, setCurrentRole] = useState('');
// //     const [currentMemberType, setCurrentMemberType] = useState('Umum'); 
// //     const [permissions, setPermissions] = useState<string[]>([]);
    
// //     const [isBanned, setIsBanned] = useState(false);
// //     const [bannedReason, setBannedReason] = useState('');

// //     const [regionConfig, setRegionConfig] = useState<any>({ scope: 'national', provinces: [], regencies: [] });

// //     useEffect(() => {
// //         if (!userId || typeof userId !== 'string') { setError("ID Pengguna tidak valid."); setLoading(false); return; }
// //         loadData();
// //     }, [userId]);

// //     const loadData = async () => {
// //         try {
// //             setLoading(true);
// //             const res = await api(`/api/admin/users/${userId}/details`);
// //             if (res.success && res.user) {
// //                 setData(res);
// //                 setCurrentName(res.user.name);
// //                 setCurrentRole(res.user.role);
// //                 // Load Member Type
// //                 setCurrentMemberType(res.user.memberType || res.user.memberData?.memberType || 'Umum');
// //                 setPermissions(res.user.permissions || []);
// //                 setIsBanned(res.user.isBanned || false);
// //                 setBannedReason(res.user.bannedReason || '');
                
// //                 setRegionConfig({
// //                     scope: res.user.regionScope || 'national',
// //                     provinces: res.user.managedProvinces || [],
// //                     regencies: res.user.managedRegencies || []
// //                 });
// //             } else { setError(res.error || "Gagal memuat data."); }
// //         } catch (err: any) { setError(err.message || "Terjadi kesalahan"); } finally { setLoading(false); }
// //     };

// //     const handleSaveAll = async () => {
// //         setIsSaving(true);
// //         try {
// //             const payload = {
// //                 name: currentName,
// //                 role: currentRole,
// //                 memberType: currentMemberType, 
// //                 permissions: permissions, 
// //                 regionScope: regionConfig.scope,
// //                 managedProvinces: regionConfig.provinces,
// //                 managedRegencies: regionConfig.regencies,
// //                 isBanned: isBanned,
// //                 bannedReason: bannedReason
// //             };
// //             await api(`/api/admin/users/${userId}`, { method: 'PATCH', body: payload });
// //             alert("✅ Data pengguna berhasil diperbarui!");
// //             setIsEditing(false);
// //             loadData(); 
// //         } catch (err: any) { alert("❌ Gagal menyimpan: " + err.message); } finally { setIsSaving(false); }
// //     };

// //     const handleResetToOrigin = () => {
// //         if (!data?.user) return;
// //         const rawProv = (data.user.province || data.user.memberData?.province || '').trim().toUpperCase();
// //         const rawCity = (data.user.city || data.user.memberData?.regency || '').trim().toUpperCase();

// //         if (!rawProv) {
// //             alert("Data domisili user kosong. Reset ke Nasional.");
// //             setRegionConfig({ scope: 'national', provinces: [], regencies: [] });
// //             return;
// //         }

// //         const allProvinces = getProvinces(); 
// //         const matchedProv = allProvinces.find((p:any) => p.name.toUpperCase() === rawProv);

// //         if (matchedProv) {
// //             if (rawCity) {
// //                 const localRegs = getRegencies(matchedProv.code);
// //                 const matchedCity = localRegs.find((r:any) => r.name.toUpperCase().includes(rawCity));
// //                 if (matchedCity) {
// //                     setRegionConfig({ scope: 'regency', provinces: [matchedProv.code], regencies: [matchedCity.code] });
// //                 } else {
// //                     setRegionConfig({ scope: 'province', provinces: [matchedProv.code], regencies: [] });
// //                 }
// //             } else {
// //                 setRegionConfig({ scope: 'province', provinces: [matchedProv.code], regencies: [] });
// //             }
// //         } else {
// //             alert(`Provinsi '${rawProv}' tidak ditemukan.`);
// //         }
// //     };

// //     const handleResetPassword = async () => {
// //         if (!confirm(`Reset password user ini menjadi "123456"?`)) return;
// //         try {
// //             await api(`/api/admin/users/${userId}/reset-password`, { method: 'PATCH' });
// //             alert("✅ Sukses! Password telah direset.");
// //         } catch (err: any) { alert("Gagal: " + err.message); }
// //     };

// //     const togglePermission = (id: string) => setPermissions(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
// //     const toggleGroup = (items: PermissionItem[]) => {
// //         const ids = items.map(i => i.id);
// //         const allSelected = ids.every(id => permissions.includes(id));
// //         if (allSelected) setPermissions(prev => prev.filter(p => !ids.includes(p)));
// //         else setPermissions(prev => Array.from(new Set([...prev, ...ids])));
// //     };

// //     const handlePhotoClick = () => {
// //         if(isEditing && fileInputRef.current) fileInputRef.current.click();
// //     };

// //     if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// //     if (error || !data?.user) return <div className="p-10 text-center text-red-500 font-bold">{error || "User tidak ditemukan."}</div>;

// //     const isUserAdmin = currentRole === 'ADMIN';
// //     const isFacilitator = currentRole === 'FACILITATOR';
// //     const isSuperAdmin = data.user.role === 'SUPER_ADMIN'; 
// //     const canHaveRegion = (isUserAdmin || isFacilitator) && !isSuperAdmin;

// //     return (
// //         <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
// //             <div className="max-w-6xl mx-auto p-6 space-y-8 pb-32">
                
// //                 {/* TOP BAR */}
// //                 <div className="flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-20 py-4 px-6 rounded-2xl shadow-sm border border-gray-200">
// //                     <div className="flex items-center gap-4">
// //                         <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-all" title="Kembali">
// //                             <ArrowLeft size={24} className="text-gray-600"/>
// //                         </button>
// //                         <div>
// //                             <h1 className="text-xl font-bold text-gray-900 uppercase">{data.user.name}</h1>
// //                             <div className="flex items-center gap-2 text-xs mt-1">
// //                                 <span className="font-bold text-gray-500 uppercase tracking-wide">{data.user.role} • {data.user.email}</span>
// //                                 {(data.user.city || data.user.province) && (
// //                                     <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-gray-600 border border-gray-200 font-semibold">
// //                                         <MapPin size={10}/> {data.user.city ? `${data.user.city}, ` : ''}{data.user.province}
// //                                     </span>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     </div>
// //                     <div className="flex gap-3">
// //                         {!isEditing ? (
// //                             <button onClick={() => setIsEditing(true)} className="bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-red-800 flex items-center gap-2 shadow-lg transition-transform active:scale-95">
// //                                 <Settings size={18}/> Edit User
// //                             </button>
// //                         ) : (
// //                             <div className="flex gap-3 animate-in fade-in slide-in-from-right-5">
// //                                 <button onClick={() => { setIsEditing(false); loadData(); }} className="px-5 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">Batal</button>
// //                                 <button onClick={handleSaveAll} disabled={isSaving} className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 flex items-center gap-2 shadow-lg disabled:opacity-50 transition-transform active:scale-95">
// //                                     {isSaving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Simpan Perubahan
// //                                 </button>
// //                             </div>
// //                         )}
// //                     </div>
// //                 </div>
                
// //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
// //                     {/* KOLOM KIRI: PROFIL */}
// //                     <div className="lg:col-span-1 space-y-6">
// //                         <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                            
// //                             {/* Avatar */}
// //                             <div 
// //                                 className={`relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-50 shadow-inner group ${isEditing ? 'cursor-pointer hover:border-gray-200' : ''}`}
// //                                 onClick={handlePhotoClick}
// //                             >
// //                                 <img src={getImageUrl(data.user.avatarUrl)} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Avatar"/>
// //                                 {isEditing && (
// //                                     <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
// //                                         <Camera size={24}/>
// //                                         <span className="text-[10px] font-bold mt-1">Ganti Foto</span>
// //                                     </div>
// //                                 )}
// //                                 <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={() => alert("Fitur upload foto segera hadir.")} title="Unggah foto profil pengguna"/> 
// //                             </div>

// //                             <div className={`px-3 py-1 rounded-full text-xs font-bold mb-6 ${isBanned ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
// //                                 {isBanned ? 'ACCOUNT BANNED' : 'ACTIVE MEMBER'}
// //                             </div>

// //                             <div className="w-full space-y-4 text-left">
// //                                 {/* Nama (Fix Accessibility) */}
// //                                 <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
// //                                     <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Nama Lengkap</label>
// //                                     <input 
// //                                         disabled={!isEditing} 
// //                                         className="w-full bg-transparent font-bold text-gray-800 outline-none text-sm" 
// //                                         value={currentName} 
// //                                         onChange={e => setCurrentName(e.target.value)}
// //                                         aria-label="Edit Nama Lengkap"
// //                                     />
// //                                 </div>

// //                                 {/* [FIX] CSS CONFLICT & ACCESSIBILITY */}
// //                                 <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
// //                                     <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1"><UserCircle size={10}/> Posisi / Jabatan</label>
// //                                     <select 
// //                                         disabled={!isEditing} 
// //                                         className="w-full bg-transparent font-bold text-gray-800 outline-none cursor-pointer text-sm" 
// //                                         value={currentMemberType} 
// //                                         onChange={e => setCurrentMemberType(e.target.value)}
// //                                         aria-label="Pilih Posisi Jabatan"
// //                                     >
// //                                         <option value="PMR">PMR</option>
// //                                         <option value="KSR">KSR</option>
// //                                         <option value="TSR">TSR</option>
// //                                         <option value="Pegawai">Pegawai</option>
// //                                         <option value="Pengurus">Pengurus</option>
// //                                         <option value="Umum">Umum</option>
// //                                     </select>
// //                                 </div>

// //                                 {/* Role (Fix Accessibility) */}
// //                                 <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
// //                                     <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Role System</label>
// //                                     <select 
// //                                         disabled={!isEditing} 
// //                                         className="w-full bg-transparent font-bold text-gray-800 outline-none cursor-pointer text-sm" 
// //                                         value={currentRole} 
// //                                         onChange={e => setCurrentRole(e.target.value)}
// //                                         aria-label="Pilih Role System"
// //                                     >
// //                                         <option value="STUDENT">STUDENT</option>
// //                                         <option value="FACILITATOR">FACILITATOR</option>
// //                                         <option value="ADMIN">ADMIN</option>
// //                                         <option value="SUPER_ADMIN">SUPER ADMIN</option>
// //                                     </select>
// //                                 </div>
// //                             </div>

// //                             {isEditing && (
// //                                 <button onClick={handleResetPassword} className="mt-6 w-full py-3 border-2 border-dashed border-gray-200 text-gray-500 rounded-xl text-xs font-bold hover:border-orange-300 hover:text-orange-600 transition-colors flex items-center justify-center gap-2">
// //                                     <KeyRound size={14}/> Reset Password ke Default
// //                                 </button>
// //                             )}
// //                         </div>

// //                         {/* Security Card (Fix Accessibility) */}
// //                         <div className={`rounded-3xl shadow-sm border p-6 ${isBanned ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
// //                             <div className="flex items-center justify-between mb-4">
// //                                 <h3 className="font-bold text-gray-800 flex items-center gap-2"><Shield size={18}/> Status Akun</h3>
// //                                 <label className="relative inline-flex items-center cursor-pointer">
// //                                     <input 
// //                                         type="checkbox" 
// //                                         disabled={!isEditing} 
// //                                         className="sr-only peer" 
// //                                         checked={isBanned} 
// //                                         onChange={e => setIsBanned(e.target.checked)}
// //                                         aria-label="Toggle Status Banned"
// //                                     />
// //                                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
// //                                 </label>
// //                             </div>
// //                             {isBanned && (
// //                                  <textarea 
// //                                     disabled={!isEditing} 
// //                                     className="w-full p-3 border border-red-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-red-700 placeholder:text-red-300" 
// //                                     placeholder="Alasan pembekuan wajib diisi..." 
// //                                     rows={3} 
// //                                     value={bannedReason} 
// //                                     onChange={e => setBannedReason(e.target.value)}
// //                                     aria-label="Alasan Pembekuan Akun"
// //                                 />
// //                             )}
// //                             <p className="text-xs text-gray-500 mt-2">{isBanned ? "User ini diblokir." : "Akun aktif."}</p>
// //                         </div>
// //                     </div>

// //                     {/* KOLOM KANAN: WILAYAH & PERMISSION */}
// //                     <div className="lg:col-span-2 space-y-8">
                        
// //                         {/* REGION SELECTOR */}
// //                         {canHaveRegion && (
// //                             <div className="bg-white rounded-3xl shadow-sm border border-orange-200 overflow-hidden">
// //                                 <div className="bg-orange-50 p-5 border-b border-orange-100 flex items-center justify-between">
// //                                     <div className="flex items-center gap-3">
// //                                         <div className="p-2 bg-white rounded-lg text-orange-600 shadow-sm"><MapPin size={20}/></div>
// //                                         <div>
// //                                             <h3 className="font-bold text-orange-900">{isFacilitator ? 'Tingkatan Fasilitator' : 'Cakupan Wilayah Admin'}</h3>
// //                                             <p className="text-xs text-orange-700">{isFacilitator ? 'Tentukan wilayah kerja fasilitator.' : 'Tentukan area yang dikelola admin.'}</p>
// //                                         </div>
// //                                     </div>
// //                                     {isEditing && (
// //                                         <button onClick={handleResetToOrigin} type="button" className="text-[10px] font-bold bg-white border border-orange-200 text-orange-700 px-3 py-1.5 rounded-lg hover:bg-orange-100 flex items-center gap-1 transition-colors shadow-sm">
// //                                             <RefreshCcw size={10}/> Reset ke Domisili
// //                                         </button>
// //                                     )}
// //                                 </div>
// //                                 <div className="p-6">
// //                                     {isEditing ? (
// //                                         <RegionSelector value={regionConfig} onChange={setRegionConfig} />
// //                                     ) : (
// //                                         <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
// //                                             <span className="text-2xl">🌍</span>
// //                                             <div>
// //                                                 <p className="text-xs font-bold text-gray-400 uppercase">{isFacilitator ? 'Level Saat Ini' : 'Scope Saat Ini'}</p>
// //                                                 <div className="font-bold text-gray-800 text-lg flex flex-wrap gap-2 uppercase">
// //                                                     {regionConfig.scope === 'national' ? 'NASIONAL (PUSAT)' : 
// //                                                     regionConfig.scope === 'province' ? `PROVINSI (${regionConfig.provinces.length} Lokasi)` :
// //                                                     `KABUPATEN/KOTA (${regionConfig.regencies.length} Lokasi)`}
// //                                                 </div>
// //                                                 <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-2">
// //                                                      {regionConfig.provinces.length > 0 && <span className="bg-white px-2 py-0.5 border rounded">Prov: {regionConfig.provinces.join(', ')}</span>}
// //                                                      {regionConfig.regencies.length > 0 && <span className="bg-white px-2 py-0.5 border rounded">Kab: {regionConfig.regencies.join(', ')}</span>}
// //                                                 </div>
// //                                             </div>
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                             </div>
// //                         )}

// //                         {/* PERMISSION MATRIX */}
// //                         <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
// //                               <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
// //                                 <div><h3 className="font-bold text-gray-800 text-lg">Hak Akses Fitur (Permission)</h3><p className="text-xs text-gray-500">Centang fitur yang diizinkan.</p></div>
// //                                 {!isEditing && <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold">Read Only</span>}
// //                               </div>
// //                               <div className="p-6 space-y-6">
// //                                 {PERMISSION_CONFIG.map((group, idx) => (
// //                                     <div key={idx} className={`rounded-2xl border overflow-hidden ${group.color}`}>
// //                                         <div className="p-4 flex items-center justify-between bg-white/50 backdrop-blur-sm">
// //                                             <div className="flex items-center gap-3">
// //                                                 {group.icon && <group.icon size={20} className="opacity-70"/>}
// //                                                 <h4 className="font-bold uppercase tracking-wider text-xs">{group.group}</h4>
// //                                             </div>
// //                                             {isEditing && (
// //                                                 <button onClick={() => toggleGroup(group.items)} className="text-[10px] font-bold underline opacity-60 hover:opacity-100 transition-opacity">{group.items.every(i => permissions.includes(i.id)) ? 'Uncheck All' : 'Select All'}</button>
// //                                             )}
// //                                         </div>
// //                                         <div className="p-4 bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
// //                                             {group.items.map((perm) => {
// //                                                 const isChecked = permissions.includes(perm.id);
// //                                                 return (
// //                                                     <label key={perm.id} className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isChecked ? 'border-green-200 bg-green-50/50' : 'border-gray-100 hover:border-gray-300'}`}>
// //                                                         <div className="relative flex items-center mt-1">
// //                                                             <input type="checkbox" className="peer sr-only" checked={isChecked} onChange={() => togglePermission(perm.id)} disabled={!isEditing}/>
// //                                                             <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
// //                                                         </div>
// //                                                         <div><p className={`text-sm font-bold ${isChecked ? 'text-green-800' : 'text-gray-700'}`}>{perm.label}</p><p className="text-[11px] text-gray-500 leading-tight mt-0.5">{perm.desc}</p>{perm.danger && <span className="inline-block mt-1 text-[9px] bg-red-100 text-red-600 px-1.5 rounded font-bold border border-red-200">DANGER ZONE</span>}</div>
// //                                                         {isChecked ? <CheckCircle2 size={16} className="text-green-500 ml-auto shrink-0"/> : <div className="w-4"/>}
// //                                                     </label>
// //                                                 );
// //                                             })}
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                               </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </Protected>
// //     );
// // }


// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { api, getImageUrl } from '@/lib/api'; 
// import Protected from '@/components/Protected';
// import { 
//     Settings, Save, Shield, KeyRound, 
//     ArrowLeft, Loader2, Info, CheckCircle2, LayoutGrid, MapPin, Users, FileText, RefreshCcw, Camera, UserCircle,
//     Database, Smartphone, CreditCard, Calendar, Home
// } from 'lucide-react';
// import RegionSelector from '@/components/admin/RegionSelector';
// import { getProvinces, getRegencies } from '@/lib/indonesia';

// // Interfaces
// interface PermissionItem { id: string; label: string; desc: string; danger?: boolean; }
// interface PermissionGroup { group: string; color: string; icon: any; items: PermissionItem[]; }

// // Config Permission
// const PERMISSION_CONFIG: PermissionGroup[] = [
//     {
//         group: 'Pelatihan & Kurikulum',
//         color: 'bg-blue-50 text-blue-700 border-blue-100',
//         icon: LayoutGrid,
//         items: [
//             { id: 'manage_courses', label: 'Kelola Pelatihan', desc: 'Buat, edit, hapus, dan publish kursus.' },
//             { id: 'verify_course_submission', label: 'Verifikasi Pengajuan', desc: 'Menyetujui pelatihan yang diajukan Fasilitator.' }, 
//             { id: 'manage_certificates', label: 'Template Sertifikat', desc: 'Mengatur desain dan tanda tangan sertifikat.' },
//         ]
//     },
//     {
//         group: 'Manajemen Pengguna',
//         color: 'bg-orange-50 text-orange-700 border-orange-100',
//         icon: Users, 
//         items: [
//             { id: 'manage_users', label: 'Kelola Pengguna', desc: 'Tambah user baru, edit profil, dan reset password.' },
//             { id: 'verify_enrollments', label: 'Verifikasi Pendaftaran', desc: 'Validasi peserta yang mendaftar pelatihan.' },
//         ]
//     },
//     {
//         group: 'Konten & Website',
//         color: 'bg-purple-50 text-purple-700 border-purple-100',
//         icon: FileText,
//         items: [
//             { id: 'manage_blogs', label: 'Blog & Artikel', desc: 'Tulis dan moderasi artikel blog.' },
//             { id: 'manage_cms_design', label: 'Tampilan Web (CMS)', desc: 'Ubah banner, slider, dan info website.' },
//         ]
//     },
//     {
//         group: 'Sistem (Super Admin)',
//         color: 'bg-red-50 text-red-800 border-red-200',
//         icon: Shield,
//         items: [
//             { id: 'view_analytics', label: 'Lihat Statistik', desc: 'Akses dashboard analitik lengkap.' },
//             { id: 'manage_system', label: 'Konfigurasi Sistem', desc: 'Akses database dan backup (Bahaya).', danger: true },
//         ]
//     }
// ];

// export default function AdminUserDetailPage() {
//     const params = useParams();
//     const userId = params?.userId || params?.id;
//     const router = useRouter();
//     const fileInputRef = useRef<HTMLInputElement>(null);
    
//     const [data, setData] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const [isEditing, setIsEditing] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);
    
//     // State Form
//     const [currentName, setCurrentName] = useState('');
//     const [currentRole, setCurrentRole] = useState('');
//     const [currentMemberType, setCurrentMemberType] = useState('Umum'); 
//     const [permissions, setPermissions] = useState<string[]>([]);
    
//     const [isBanned, setIsBanned] = useState(false);
//     const [bannedReason, setBannedReason] = useState('');

//     const [regionConfig, setRegionConfig] = useState<any>({ scope: 'national', provinces: [], regencies: [] });

//     useEffect(() => {
//         if (!userId || typeof userId !== 'string') { setError("ID Pengguna tidak valid."); setLoading(false); return; }
//         loadData();
//     }, [userId]);

//     const loadData = async () => {
//         try {
//             setLoading(true);
//             const res = await api(`/api/admin/users/${userId}/details`);
//             if (res.success && res.user) {
//                 setData(res);
//                 setCurrentName(res.user.name);
//                 setCurrentRole(res.user.role);
//                 // Load Member Type
//                 setCurrentMemberType(res.user.memberType || res.user.memberData?.memberType || 'Umum');
//                 setPermissions(res.user.permissions || []);
//                 setIsBanned(res.user.isBanned || false);
//                 setBannedReason(res.user.bannedReason || '');
                
//                 setRegionConfig({
//                     scope: res.user.regionScope || 'national',
//                     provinces: res.user.managedProvinces || [],
//                     regencies: res.user.managedRegencies || []
//                 });
//             } else { setError(res.error || "Gagal memuat data."); }
//         } catch (err: any) { setError(err.message || "Terjadi kesalahan"); } finally { setLoading(false); }
//     };

//     const handleSaveAll = async () => {
//         setIsSaving(true);
//         try {
//             const payload = {
//                 name: currentName,
//                 role: currentRole,
//                 memberType: currentMemberType, 
//                 permissions: permissions, 
//                 regionScope: regionConfig.scope,
//                 managedProvinces: regionConfig.provinces,
//                 managedRegencies: regionConfig.regencies,
//                 isBanned: isBanned,
//                 bannedReason: bannedReason
//             };
//             await api(`/api/admin/users/${userId}`, { method: 'PATCH', body: payload });
//             alert("✅ Data pengguna berhasil diperbarui!");
//             setIsEditing(false);
//             loadData(); 
//         } catch (err: any) { alert("❌ Gagal menyimpan: " + err.message); } finally { setIsSaving(false); }
//     };

//     const handleResetToOrigin = () => {
//         if (!data?.user) return;
//         const rawProv = (data.user.province || data.user.memberData?.province || '').trim().toUpperCase();
//         const rawCity = (data.user.city || data.user.memberData?.regency || '').trim().toUpperCase();

//         if (!rawProv) {
//             alert("Data domisili user kosong. Reset ke Nasional.");
//             setRegionConfig({ scope: 'national', provinces: [], regencies: [] });
//             return;
//         }

//         const allProvinces = getProvinces(); 
//         const matchedProv = allProvinces.find((p:any) => p.name.toUpperCase() === rawProv);

//         if (matchedProv) {
//             if (rawCity) {
//                 const localRegs = getRegencies(matchedProv.code);
//                 const matchedCity = localRegs.find((r:any) => r.name.toUpperCase().includes(rawCity));
//                 if (matchedCity) {
//                     setRegionConfig({ scope: 'regency', provinces: [matchedProv.code], regencies: [matchedCity.code] });
//                 } else {
//                     setRegionConfig({ scope: 'province', provinces: [matchedProv.code], regencies: [] });
//                 }
//             } else {
//                 setRegionConfig({ scope: 'province', provinces: [matchedProv.code], regencies: [] });
//             }
//         } else {
//             alert(`Provinsi '${rawProv}' tidak ditemukan.`);
//         }
//     };

//     const handleResetPassword = async () => {
//         if (!confirm(`Reset password user ini menjadi "123456"?`)) return;
//         try {
//             await api(`/api/admin/users/${userId}/reset-password`, { method: 'PATCH' });
//             alert("✅ Sukses! Password telah direset.");
//         } catch (err: any) { alert("Gagal: " + err.message); }
//     };

//     const togglePermission = (id: string) => setPermissions(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
//     const toggleGroup = (items: PermissionItem[]) => {
//         const ids = items.map(i => i.id);
//         const allSelected = ids.every(id => permissions.includes(id));
//         if (allSelected) setPermissions(prev => prev.filter(p => !ids.includes(p)));
//         else setPermissions(prev => Array.from(new Set([...prev, ...ids])));
//     };

//     const handlePhotoClick = () => {
//         if(isEditing && fileInputRef.current) fileInputRef.current.click();
//     };

//     // Helper Format Tanggal
//     const formatDate = (dateString?: string | Date) => {
//         if (!dateString) return '-';
//         return new Date(dateString).toLocaleDateString('id-ID', {
//             day: 'numeric', month: 'long', year: 'numeric'
//         });
//     };

//     if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
//     if (error || !data?.user) return <div className="p-10 text-center text-red-500 font-bold">{error || "User tidak ditemukan."}</div>;

//     const isUserAdmin = currentRole === 'ADMIN';
//     const isFacilitator = currentRole === 'FACILITATOR';
//     const isSuperAdmin = data.user.role === 'SUPER_ADMIN'; 
//     const canHaveRegion = (isUserAdmin || isFacilitator) && !isSuperAdmin;
//     const isSynced = data.user.memberData?.source === 'AUTO_REGISTER_POSTGRES';

//     return (
//         <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
//             <div className="max-w-6xl mx-auto p-6 space-y-8 pb-32">
                
//                 {/* TOP BAR */}
//                 <div className="flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-20 py-4 px-6 rounded-2xl shadow-sm border border-gray-200">
//                     <div className="flex items-center gap-4">
//                         <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-all" title="Kembali">
//                             <ArrowLeft size={24} className="text-gray-600"/>
//                         </button>
//                         <div>
//                             <h1 className="text-xl font-bold text-gray-900 uppercase">{data.user.name}</h1>
//                             <div className="flex items-center gap-2 text-xs mt-1">
//                                 <span className="font-bold text-gray-500 uppercase tracking-wide">{data.user.role} • {data.user.email}</span>
//                                 {(data.user.city || data.user.province) && (
//                                     <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-gray-600 border border-gray-200 font-semibold">
//                                         <MapPin size={10}/> {data.user.city ? `${data.user.city}, ` : ''}{data.user.province}
//                                     </span>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex gap-3">
//                         {!isEditing ? (
//                             <button onClick={() => setIsEditing(true)} className="bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-red-800 flex items-center gap-2 shadow-lg transition-transform active:scale-95">
//                                 <Settings size={18}/> Edit User
//                             </button>
//                         ) : (
//                             <div className="flex gap-3 animate-in fade-in slide-in-from-right-5">
//                                 <button onClick={() => { setIsEditing(false); loadData(); }} className="px-5 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">Batal</button>
//                                 <button onClick={handleSaveAll} disabled={isSaving} className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 flex items-center gap-2 shadow-lg disabled:opacity-50 transition-transform active:scale-95">
//                                     {isSaving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Simpan Perubahan
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
                
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
//                     {/* KOLOM KIRI: PROFIL & BIODATA */}
//                     <div className="lg:col-span-1 space-y-6">
                        
//                         {/* BASIC PROFILE CARD */}
//                         <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
//                             {/* Avatar */}
//                             <div 
//                                 className={`relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-50 shadow-inner group ${isEditing ? 'cursor-pointer hover:border-gray-200' : ''}`}
//                                 onClick={handlePhotoClick}
//                             >
//                                 <img src={getImageUrl(data.user.avatarUrl)} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Avatar"/>
//                                 {isEditing && (
//                                     <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
//                                         <Camera size={24}/>
//                                         <span className="text-[10px] font-bold mt-1">Ganti Foto</span>
//                                     </div>
//                                 )}
//                                 <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={() => alert("Fitur upload foto segera hadir.")} title="Unggah foto profil pengguna"/> 
//                             </div>

//                             <div className={`px-3 py-1 rounded-full text-xs font-bold mb-6 ${isBanned ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
//                                 {isBanned ? 'ACCOUNT BANNED' : 'ACTIVE MEMBER'}
//                             </div>

//                             <div className="w-full space-y-4 text-left">
//                                 {/* Nama */}
//                                 <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
//                                     <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Nama Lengkap</label>
//                                     <input 
//                                         disabled={!isEditing} 
//                                         className="w-full bg-transparent font-bold text-gray-800 outline-none text-sm" 
//                                         value={currentName} 
//                                         onChange={e => setCurrentName(e.target.value)}
//                                         aria-label="Edit Nama Lengkap"
//                                     />
//                                 </div>

//                                 {/* Posisi */}
//                                 <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
//                                     <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1"><UserCircle size={10}/> Posisi / Jabatan</label>
//                                     <select 
//                                         disabled={!isEditing} 
//                                         className="w-full bg-transparent font-bold text-gray-800 outline-none cursor-pointer text-sm" 
//                                         value={currentMemberType} 
//                                         onChange={e => setCurrentMemberType(e.target.value)}
//                                         aria-label="Pilih Posisi Jabatan"
//                                     >
//                                         <option value="PMR">PMR</option>
//                                         <option value="KSR">KSR</option>
//                                         <option value="TSR">TSR</option>
//                                         <option value="Pegawai">Pegawai</option>
//                                         <option value="Pengurus">Pengurus</option>
//                                         <option value="Umum">Umum</option>
//                                     </select>
//                                 </div>

//                                 {/* Role */}
//                                 <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
//                                     <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Role System</label>
//                                     <select 
//                                         disabled={!isEditing} 
//                                         className="w-full bg-transparent font-bold text-gray-800 outline-none cursor-pointer text-sm" 
//                                         value={currentRole} 
//                                         onChange={e => setCurrentRole(e.target.value)}
//                                         aria-label="Pilih Role System"
//                                     >
//                                         <option value="STUDENT">STUDENT</option>
//                                         <option value="FACILITATOR">FACILITATOR</option>
//                                         <option value="ADMIN">ADMIN</option>
//                                         <option value="SUPER_ADMIN">SUPER ADMIN</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             {isEditing && (
//                                 <button onClick={handleResetPassword} className="mt-6 w-full py-3 border-2 border-dashed border-gray-200 text-gray-500 rounded-xl text-xs font-bold hover:border-orange-300 hover:text-orange-600 transition-colors flex items-center justify-center gap-2">
//                                     <KeyRound size={14}/> Reset Password ke Default
//                                 </button>
//                             )}
//                         </div>

//                         {/* [BARU] CARD BIODATA INTEGRASI (READ ONLY) */}
//                         {data.user.memberData && (
//                             <div className="bg-blue-50/50 p-5 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden">
//                                 {isSynced && (
//                                     <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
//                                         <Database size={10}/> TERINTEGRASI PUSAT
//                                     </div>
//                                 )}
//                                 <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm border-b border-blue-100 pb-2">
//                                     <Shield size={16} className="text-blue-600"/> Data Anggota (MIS)
//                                 </h4>
//                                 <div className="space-y-4 text-sm">
//                                     <div>
//                                         <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5 flex items-center gap-1"><CreditCard size={10}/> NIA (Nomor Anggota)</p>
//                                         <p className="font-mono font-medium text-gray-800 bg-white px-2 py-1 rounded border border-blue-100 inline-block">
//                                             {data.user.memberData.nia || data.user.memberData.kode_anggota || '-'}
//                                         </p>
//                                     </div>
//                                     <div className="grid grid-cols-2 gap-2">
//                                         <div>
//                                             <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Unit PMI</p>
//                                             <p className="font-medium text-gray-800">{data.user.memberData.unit || 'Pusat'}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Kelamin</p>
//                                             <p className="font-medium text-gray-800">{data.user.memberData.kelamin || data.user.memberData.gender || '-'}</p>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5 flex items-center gap-1"><Calendar size={10}/> Tempat, Tgl Lahir</p>
//                                         <p className="font-medium text-gray-800">
//                                             {data.user.memberData.tempat_lahir || '-'}, {formatDate(data.user.memberData.tanggal_lahir)}
//                                         </p>
//                                     </div>
//                                     <div>
//                                         <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5 flex items-center gap-1"><Smartphone size={10}/> No. HP</p>
//                                         <p className="font-medium text-gray-800">{data.user.memberData.no_hp || data.user.memberData.phone || '-'}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5 flex items-center gap-1"><Home size={10}/> Alamat Domisili</p>
//                                         <p className="font-medium text-gray-800 leading-snug text-xs">
//                                             {data.user.memberData.alamat || data.user.memberData.address || '-'}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Security Card */}
//                         <div className={`rounded-3xl shadow-sm border p-6 ${isBanned ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
//                             <div className="flex items-center justify-between mb-4">
//                                 <h3 className="font-bold text-gray-800 flex items-center gap-2"><Shield size={18}/> Status Akun</h3>
//                                 <label className="relative inline-flex items-center cursor-pointer">
//                                     <input 
//                                         type="checkbox" 
//                                         disabled={!isEditing} 
//                                         className="sr-only peer" 
//                                         checked={isBanned} 
//                                         onChange={e => setIsBanned(e.target.checked)}
//                                         aria-label="Toggle Status Banned"
//                                     />
//                                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
//                                 </label>
//                             </div>
//                             {isBanned && (
//                                  <textarea 
//                                     disabled={!isEditing} 
//                                     className="w-full p-3 border border-red-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-red-700 placeholder:text-red-300" 
//                                     placeholder="Alasan pembekuan wajib diisi..." 
//                                     rows={3} 
//                                     value={bannedReason} 
//                                     onChange={e => setBannedReason(e.target.value)}
//                                     aria-label="Alasan Pembekuan Akun"
//                                 />
//                             )}
//                             <p className="text-xs text-gray-500 mt-2">{isBanned ? "User ini diblokir." : "Akun aktif."}</p>
//                         </div>
//                     </div>

//                     {/* KOLOM KANAN: WILAYAH & PERMISSION */}
//                     <div className="lg:col-span-2 space-y-8">
                        
//                         {/* REGION SELECTOR */}
//                         {canHaveRegion && (
//                             <div className="bg-white rounded-3xl shadow-sm border border-orange-200 overflow-hidden">
//                                 <div className="bg-orange-50 p-5 border-b border-orange-100 flex items-center justify-between">
//                                     <div className="flex items-center gap-3">
//                                         <div className="p-2 bg-white rounded-lg text-orange-600 shadow-sm"><MapPin size={20}/></div>
//                                         <div>
//                                             <h3 className="font-bold text-orange-900">{isFacilitator ? 'Tingkatan Fasilitator' : 'Cakupan Wilayah Admin'}</h3>
//                                             <p className="text-xs text-orange-700">{isFacilitator ? 'Tentukan wilayah kerja fasilitator.' : 'Tentukan area yang dikelola admin.'}</p>
//                                         </div>
//                                     </div>
//                                     {isEditing && (
//                                         <button onClick={handleResetToOrigin} type="button" className="text-[10px] font-bold bg-white border border-orange-200 text-orange-700 px-3 py-1.5 rounded-lg hover:bg-orange-100 flex items-center gap-1 transition-colors shadow-sm">
//                                             <RefreshCcw size={10}/> Reset ke Domisili
//                                         </button>
//                                     )}
//                                 </div>
//                                 <div className="p-6">
//                                     {isEditing ? (
//                                         <RegionSelector value={regionConfig} onChange={setRegionConfig} />
//                                     ) : (
//                                         <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
//                                             <span className="text-2xl">🌍</span>
//                                             <div>
//                                                 <p className="text-xs font-bold text-gray-400 uppercase">{isFacilitator ? 'Level Saat Ini' : 'Scope Saat Ini'}</p>
//                                                 <div className="font-bold text-gray-800 text-lg flex flex-wrap gap-2 uppercase">
//                                                     {regionConfig.scope === 'national' ? 'NASIONAL (PUSAT)' : 
//                                                     regionConfig.scope === 'province' ? `PROVINSI (${regionConfig.provinces.length} Lokasi)` :
//                                                     `KABUPATEN/KOTA (${regionConfig.regencies.length} Lokasi)`}
//                                                 </div>
//                                                 <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-2">
//                                                      {regionConfig.provinces.length > 0 && <span className="bg-white px-2 py-0.5 border rounded">Prov: {regionConfig.provinces.join(', ')}</span>}
//                                                      {regionConfig.regencies.length > 0 && <span className="bg-white px-2 py-0.5 border rounded">Kab: {regionConfig.regencies.join(', ')}</span>}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}

//                         {/* PERMISSION MATRIX */}
//                         <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
//                               <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
//                                 <div><h3 className="font-bold text-gray-800 text-lg">Hak Akses Fitur (Permission)</h3><p className="text-xs text-gray-500">Centang fitur yang diizinkan.</p></div>
//                                 {!isEditing && <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold">Read Only</span>}
//                               </div>
//                               <div className="p-6 space-y-6">
//                                 {PERMISSION_CONFIG.map((group, idx) => (
//                                     <div key={idx} className={`rounded-2xl border overflow-hidden ${group.color}`}>
//                                             <div className="p-4 flex items-center justify-between bg-white/50 backdrop-blur-sm">
//                                                 <div className="flex items-center gap-3">
//                                                     {group.icon && <group.icon size={20} className="opacity-70"/>}
//                                                     <h4 className="font-bold uppercase tracking-wider text-xs">{group.group}</h4>
//                                                 </div>
//                                                 {isEditing && (
//                                                     <button onClick={() => toggleGroup(group.items)} className="text-[10px] font-bold underline opacity-60 hover:opacity-100 transition-opacity">{group.items.every(i => permissions.includes(i.id)) ? 'Uncheck All' : 'Select All'}</button>
//                                                 )}
//                                             </div>
//                                             <div className="p-4 bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
//                                                 {group.items.map((perm) => {
//                                                     const isChecked = permissions.includes(perm.id);
//                                                     return (
//                                                         <label key={perm.id} className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isChecked ? 'border-green-200 bg-green-50/50' : 'border-gray-100 hover:border-gray-300'}`}>
//                                                             <div className="relative flex items-center mt-1">
//                                                                 <input type="checkbox" className="peer sr-only" checked={isChecked} onChange={() => togglePermission(perm.id)} disabled={!isEditing}/>
//                                                                 <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
//                                                             </div>
//                                                             <div><p className={`text-sm font-bold ${isChecked ? 'text-green-800' : 'text-gray-700'}`}>{perm.label}</p><p className="text-[11px] text-gray-500 leading-tight mt-0.5">{perm.desc}</p>{perm.danger && <span className="inline-block mt-1 text-[9px] bg-red-100 text-red-600 px-1.5 rounded font-bold border border-red-200">DANGER ZONE</span>}</div>
//                                                             {isChecked ? <CheckCircle2 size={16} className="text-green-500 ml-auto shrink-0"/> : <div className="w-4"/>}
//                                                         </label>
//                                                     );
//                                                 })}
//                                             </div>
//                                     </div>
//                                 ))}
//                               </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Protected>
//     );
// }



'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api, getImageUrl } from '@/lib/api'; 
import Protected from '@/components/Protected';
import { 
    Settings, Save, Shield, KeyRound, 
    ArrowLeft, Loader2, Info, CheckCircle2, LayoutGrid, MapPin, Users, FileText, RefreshCcw, Camera, UserCircle,
    Database, Smartphone, CreditCard, Calendar, Home, AlertTriangle, Briefcase
} from 'lucide-react';
import RegionSelector from '@/components/admin/RegionSelector';
import { getProvinces, getRegencies } from '@/lib/indonesia';

// Interfaces
interface PermissionItem { id: string; label: string; desc: string; danger?: boolean; }
interface PermissionGroup { group: string; color: string; icon: any; items: PermissionItem[]; }

// Config Permission
const PERMISSION_CONFIG: PermissionGroup[] = [
    {
        group: 'Pelatihan & Kurikulum',
        color: 'bg-blue-50 text-blue-700 border-blue-100',
        icon: LayoutGrid,
        items: [
            { id: 'manage_courses', label: 'Kelola Pelatihan', desc: 'Buat, edit, hapus, dan publish kursus.' },
            { id: 'verify_course_submission', label: 'Verifikasi Pengajuan', desc: 'Menyetujui pelatihan yang diajukan Fasilitator.' }, 
            { id: 'manage_certificates', label: 'Template Sertifikat', desc: 'Mengatur desain dan tanda tangan sertifikat.' },
        ]
    },
    {
        group: 'Manajemen Pengguna',
        color: 'bg-orange-50 text-orange-700 border-orange-100',
        icon: Users, 
        items: [
            { id: 'manage_users', label: 'Kelola Pengguna', desc: 'Tambah user baru, edit profil, dan reset password.' },
            { id: 'verify_enrollments', label: 'Verifikasi Pendaftaran', desc: 'Validasi peserta yang mendaftar pelatihan.' },
        ]
    },
    {
        group: 'Konten & Website',
        color: 'bg-purple-50 text-purple-700 border-purple-100',
        icon: FileText,
        items: [
            { id: 'manage_blogs', label: 'Blog & Artikel', desc: 'Tulis dan moderasi artikel blog.' },
            { id: 'manage_cms_design', label: 'Tampilan Web (CMS)', desc: 'Ubah banner, slider, dan info website.' },
        ]
    },
    {
        group: 'Sistem (Super Admin)',
        color: 'bg-red-50 text-red-800 border-red-200',
        icon: Shield,
        items: [
            { id: 'view_analytics', label: 'Lihat Statistik', desc: 'Akses dashboard analitik lengkap.' },
            { id: 'manage_system', label: 'Konfigurasi Sistem', desc: 'Akses database dan backup (Bahaya).', danger: true },
        ]
    }
];

export default function AdminUserDetailPage() {
    const params = useParams();
    // Handling params id/userId
    const userId = (params?.userId || params?.id) as string;
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    // State Form
    const [currentName, setCurrentName] = useState('');
    const [currentRole, setCurrentRole] = useState('');
    const [currentMemberType, setCurrentMemberType] = useState('Umum'); 
    const [permissions, setPermissions] = useState<string[]>([]);
    
    const [isBanned, setIsBanned] = useState(false);
    const [bannedReason, setBannedReason] = useState('');

    const [regionConfig, setRegionConfig] = useState<any>({ scope: 'national', provinces: [], regencies: [] });

    useEffect(() => {
        if (!userId) { setError("ID Pengguna tidak valid."); setLoading(false); return; }
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
                // Load Member Type (Priority: user.memberType -> user.memberData.memberType -> 'Umum')
                setCurrentMemberType(res.user.memberType || res.user.memberData?.memberType || 'Umum');
                setPermissions(res.user.permissions || []);
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
        // Cegah simpan jika user virtual (belum login)
        if (data?.user?.isVirtual) {
            alert("⚠️ User ini belum aktif di LMS (Data Pusat). Minta anggota untuk login terlebih dahulu agar akunnya aktif.");
            return;
        }

        setIsSaving(true);
        try {
            const payload = {
                name: currentName,
                role: currentRole,
                memberType: currentMemberType, 
                permissions: permissions, 
                regionScope: regionConfig.scope,
                managedProvinces: regionConfig.provinces,
                managedRegencies: regionConfig.regencies,
                isBanned: isBanned,
                bannedReason: bannedReason
            };
            await api(`/api/admin/users/${userId}`, { method: 'PATCH', body: payload });
            alert("✅ Data pengguna berhasil diperbarui!");
            setIsEditing(false);
            loadData(); 
        } catch (err: any) { alert("❌ Gagal menyimpan: " + err.message); } finally { setIsSaving(false); }
    };

    const handleResetToOrigin = () => {
        if (!data?.user) return;
        const rawProv = (data.user.province || data.user.memberData?.province || '').trim().toUpperCase();
        const rawCity = (data.user.city || data.user.memberData?.regency || '').trim().toUpperCase();

        if (!rawProv) {
            alert("Data domisili user kosong. Reset ke Nasional.");
            setRegionConfig({ scope: 'national', provinces: [], regencies: [] });
            return;
        }

        const allProvinces = getProvinces(); 
        const matchedProv = allProvinces.find((p:any) => p.name.toUpperCase() === rawProv);

        if (matchedProv) {
            if (rawCity) {
                const localRegs = getRegencies(matchedProv.code);
                const matchedCity = localRegs.find((r:any) => r.name.toUpperCase().includes(rawCity));
                if (matchedCity) {
                    setRegionConfig({ scope: 'regency', provinces: [matchedProv.code], regencies: [matchedCity.code] });
                } else {
                    setRegionConfig({ scope: 'province', provinces: [matchedProv.code], regencies: [] });
                }
            } else {
                setRegionConfig({ scope: 'province', provinces: [matchedProv.code], regencies: [] });
            }
        } else {
            alert(`Provinsi '${rawProv}' tidak ditemukan.`);
        }
    };

    const handleResetPassword = async () => {
        if(data?.user?.isVirtual) return alert("User belum aktif. Tidak bisa reset password.");
        if (!confirm(`Reset password user ini menjadi "123456"?`)) return;
        try {
            await api(`/api/admin/users/${userId}/reset-password`, { method: 'PATCH' });
            alert("✅ Sukses! Password telah direset.");
        } catch (err: any) { alert("Gagal: " + err.message); }
    };

    const togglePermission = (id: string) => setPermissions(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
    const toggleGroup = (items: PermissionItem[]) => {
        const ids = items.map(i => i.id);
        const allSelected = ids.every(id => permissions.includes(id));
        if (allSelected) setPermissions(prev => prev.filter(p => !ids.includes(p)));
        else setPermissions(prev => Array.from(new Set([...prev, ...ids])));
    };

    const handlePhotoClick = () => {
        if(isEditing && !data?.user?.isVirtual && fileInputRef.current) fileInputRef.current.click();
    };

    // Helper Format Tanggal Indonesia
    const formatDate = (dateString?: string | Date) => {
        if (!dateString || dateString === '-' || dateString === '0000-00-00') return '-';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
            });
        } catch (e) { return dateString; }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
    if (error || !data?.user) return <div className="p-10 text-center text-red-500 font-bold">{error || "User tidak ditemukan."}</div>;

    const isUserAdmin = currentRole === 'ADMIN';
    const isFacilitator = currentRole === 'FACILITATOR';
    const isSuperAdmin = data.user.role === 'SUPER_ADMIN'; 
    const canHaveRegion = (isUserAdmin || isFacilitator) && !isSuperAdmin;
    
    // Cek status integrasi
    const isSynced = data.user.memberData?.source?.includes('POSTGRES');
    const isVirtual = data.user.isVirtual; // User belum login (hanya view dari pusat)

    return (
        <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
            <div className="max-w-6xl mx-auto p-6 space-y-8 pb-32">
                
                {/* ALERT JIKA USER VIRTUAL */}
                {isVirtual && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                        <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={20}/>
                        <div>
                            <h3 className="font-bold text-amber-800 text-sm">User Belum Aktif di LMS</h3>
                            <p className="text-xs text-amber-700 mt-1">
                                Data ini ditarik langsung dari <strong>Database Pusat (MIS)</strong>. User ini belum pernah login ke LMS.
                                <br/>Anda tidak bisa mengedit data atau mereset password sampai user melakukan login pertama kali (Aktivasi Otomatis).
                            </p>
                        </div>
                    </div>
                )}

                {/* TOP BAR */}
                <div className="flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-20 py-4 px-6 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-all" title="Kembali">
                            <ArrowLeft size={24} className="text-gray-600"/>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 uppercase">{data.user.name}</h1>
                            <div className="flex items-center gap-2 text-xs mt-1">
                                <span className="font-bold text-gray-500 uppercase tracking-wide">
                                    {data.user.role === 'BELUM_AKTIF' ? 'ANGGOTA PUSAT (NON-AKTIF)' : data.user.role} • {data.user.email}
                                </span>
                                {(data.user.city || data.user.province) && (
                                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-gray-600 border border-gray-200 font-semibold">
                                        <MapPin size={10}/> {data.user.city ? `${data.user.city}, ` : ''}{data.user.province}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {!isEditing ? (
                            <button 
                                onClick={() => setIsEditing(true)} 
                                disabled={isVirtual} // Disable edit for virtual users
                                className="bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-red-800 flex items-center gap-2 shadow-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Settings size={18}/> Edit User
                            </button>
                        ) : (
                            <div className="flex gap-3 animate-in fade-in slide-in-from-right-5">
                                <button onClick={() => { setIsEditing(false); loadData(); }} className="px-5 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">Batal</button>
                                <button onClick={handleSaveAll} disabled={isSaving} className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 flex items-center gap-2 shadow-lg disabled:opacity-50 transition-transform active:scale-95">
                                    {isSaving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Simpan Perubahan
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* KOLOM KIRI: PROFIL & BIODATA */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* BASIC PROFILE CARD */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                            {/* Avatar */}
                            <div 
                                className={`relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-50 shadow-inner group ${isEditing ? 'cursor-pointer hover:border-gray-200' : ''}`}
                                onClick={handlePhotoClick}
                            >
                                <img 
                                    src={getImageUrl(data.user.avatarUrl)} 
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                                    alt="Avatar"
                                    onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Img'} 
                                />
                                {isEditing && !isVirtual && (
                                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera size={24}/>
                                        <span className="text-[10px] font-bold mt-1">Ganti Foto</span>
                                    </div>
                                )}
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={() => alert("Fitur upload foto segera hadir.")} title="Unggah foto profil pengguna"/> 
                            </div>

                            <div className={`px-3 py-1 rounded-full text-xs font-bold mb-6 ${isBanned ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                {isBanned ? 'ACCOUNT BANNED' : 'ACTIVE MEMBER'}
                            </div>

                            <div className="w-full space-y-4 text-left">
                                {/* Nama */}
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Nama Lengkap</label>
                                    <input 
                                        disabled={!isEditing || isVirtual} 
                                        className="w-full bg-transparent font-bold text-gray-800 outline-none text-sm disabled:text-gray-500" 
                                        value={currentName} 
                                        onChange={e => setCurrentName(e.target.value)}
                                        aria-label="Edit Nama Lengkap"
                                    />
                                </div>

                                {/* Posisi (Jabatan) */}
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1"><UserCircle size={10}/> Posisi / Jabatan</label>
                                    <select 
                                        disabled={!isEditing || isVirtual} 
                                        className="w-full bg-transparent font-bold text-gray-800 outline-none cursor-pointer text-sm disabled:cursor-not-allowed" 
                                        value={currentMemberType} 
                                        onChange={e => setCurrentMemberType(e.target.value)}
                                        aria-label="Pilih Posisi Jabatan"
                                    >
                                        <option value="PMR">PMR</option>
                                        <option value="KSR">KSR</option>
                                        <option value="TSR">TSR</option>
                                        <option value="Pegawai">Pegawai</option>
                                        <option value="Pengurus">Pengurus</option>
                                        <option value="Umum">Umum</option>
                                        <option value="Anggota">Anggota</option>
                                    </select>
                                </div>

                                {/* Role */}
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Role System</label>
                                    <select 
                                        disabled={!isEditing || isVirtual} 
                                        className="w-full bg-transparent font-bold text-gray-800 outline-none cursor-pointer text-sm disabled:cursor-not-allowed" 
                                        value={currentRole} 
                                        onChange={e => setCurrentRole(e.target.value)}
                                        aria-label="Pilih Role System"
                                    >
                                        {currentRole === 'BELUM_AKTIF' && <option value="BELUM_AKTIF">BELUM AKTIF</option>}
                                        <option value="STUDENT">STUDENT</option>
                                        <option value="FACILITATOR">FACILITATOR</option>
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="SUPER_ADMIN">SUPER ADMIN</option>
                                    </select>
                                </div>
                            </div>

                            {isEditing && !isVirtual && (
                                <button onClick={handleResetPassword} className="mt-6 w-full py-3 border-2 border-dashed border-gray-200 text-gray-500 rounded-xl text-xs font-bold hover:border-orange-300 hover:text-orange-600 transition-colors flex items-center justify-center gap-2">
                                    <KeyRound size={14}/> Reset Password ke Default
                                </button>
                            )}
                        </div>

                        {/* [CARD BIODATA INTEGRASI - DATA LENGKAP] */}
                        {data.user.memberData && (
                            <div className="bg-blue-50/50 p-5 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden">
                                {isSynced && (
                                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
                                        <Database size={10}/> TERINTEGRASI PUSAT
                                    </div>
                                )}
                                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm border-b border-blue-100 pb-2">
                                    <Shield size={16} className="text-blue-600"/> Data Anggota (MIS)
                                </h4>
                                <div className="space-y-4 text-sm">
                                    
                                    {/* NIA & JABATAN */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5 flex items-center gap-1"><CreditCard size={10}/> NIA</p>
                                            <p className="font-mono font-bold text-blue-700 bg-white px-2 py-1 rounded border border-blue-100 inline-block text-xs">
                                                {data.user.memberData.nia || data.user.memberData.kode_anggota || '-'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5 flex items-center gap-1"><Briefcase size={10}/> Jabatan</p>
                                            <p className="font-bold text-gray-800 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded inline-block uppercase">
                                                {data.user.memberType || 'Anggota'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* NIK */}
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5 flex items-center gap-1"><CreditCard size={10}/> NIK / KTP</p>
                                        <p className="font-mono font-medium text-gray-800">
                                            {data.user.memberData.nik || data.user.memberData.no_identitas || '-'}
                                        </p>
                                    </div>

                                    {/* UNIT LENGKAP */}
                                    <div className="bg-white p-2 rounded border border-blue-100">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Unit / Lokasi</p>
                                        <p className="font-bold text-gray-800 text-xs leading-snug uppercase">
                                            {data.user.memberData.unit || 'PMI PUSAT'}
                                        </p>
                                    </div>

                                    {/* KELAMIN & HP */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Kelamin</p>
                                            <p className="font-medium text-gray-800">{data.user.memberData.kelamin || data.user.memberData.gender || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5"><Smartphone size={10} className="inline mr-1"/>No. HP</p>
                                            <p className="font-medium text-gray-800">{data.user.memberData.no_hp || data.user.memberData.phone || '-'}</p>
                                        </div>
                                    </div>
                                    
                                    {/* LAHIR */}
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5 flex items-center gap-1"><Calendar size={10}/> Tempat, Tgl Lahir</p>
                                        <p className="font-medium text-gray-800">
                                            {data.user.memberData.tempat_lahir || data.user.memberData.birthPlace || '-'}, {formatDate(data.user.memberData.tanggal_lahir || data.user.memberData.birthDate)}
                                        </p>
                                    </div>
                                    
                                    {/* ALAMAT */}
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5 flex items-center gap-1"><Home size={10}/> Alamat Domisili</p>
                                        <p className="font-medium text-gray-800 leading-snug text-xs">
                                            {data.user.memberData.alamat || data.user.memberData.address || '-'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Security Card */}
                        <div className={`rounded-3xl shadow-sm border p-6 ${isBanned ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2"><Shield size={18}/> Status Akun</h3>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        disabled={!isEditing || isVirtual} 
                                        className="sr-only peer" 
                                        checked={isBanned} 
                                        onChange={e => setIsBanned(e.target.checked)}
                                        aria-label="Toggle Status Banned"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                </label>
                            </div>
                            {isBanned && (
                                 <textarea 
                                    disabled={!isEditing || isVirtual} 
                                    className="w-full p-3 border border-red-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-red-700 placeholder:text-red-300" 
                                    placeholder="Alasan pembekuan wajib diisi..." 
                                    rows={3} 
                                    value={bannedReason} 
                                    onChange={e => setBannedReason(e.target.value)}
                                    aria-label="Alasan Pembekuan Akun"
                                />
                            )}
                            <p className="text-xs text-gray-500 mt-2">{isBanned ? "User ini diblokir." : "Akun aktif."}</p>
                        </div>
                    </div>

                    {/* KOLOM KANAN: WILAYAH & PERMISSION */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* REGION SELECTOR */}
                        {canHaveRegion && (
                            <div className="bg-white rounded-3xl shadow-sm border border-orange-200 overflow-hidden">
                                <div className="bg-orange-50 p-5 border-b border-orange-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg text-orange-600 shadow-sm"><MapPin size={20}/></div>
                                        <div>
                                            <h3 className="font-bold text-orange-900">{isFacilitator ? 'Tingkatan Fasilitator' : 'Cakupan Wilayah Admin'}</h3>
                                            <p className="text-xs text-orange-700">{isFacilitator ? 'Tentukan wilayah kerja fasilitator.' : 'Tentukan area yang dikelola admin.'}</p>
                                        </div>
                                    </div>
                                    {isEditing && !isVirtual && (
                                        <button onClick={handleResetToOrigin} type="button" className="text-[10px] font-bold bg-white border border-orange-200 text-orange-700 px-3 py-1.5 rounded-lg hover:bg-orange-100 flex items-center gap-1 transition-colors shadow-sm">
                                            <RefreshCcw size={10}/> Reset ke Domisili
                                        </button>
                                    )}
                                </div>
                                <div className="p-6">
                                    {isEditing && !isVirtual ? (
                                        <RegionSelector value={regionConfig} onChange={setRegionConfig} />
                                    ) : (
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                            <span className="text-2xl">🌍</span>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase">{isFacilitator ? 'Level Saat Ini' : 'Scope Saat Ini'}</p>
                                                <div className="font-bold text-gray-800 text-lg flex flex-wrap gap-2 uppercase">
                                                    {regionConfig.scope === 'national' ? 'NASIONAL (PUSAT)' : 
                                                    regionConfig.scope === 'province' ? `PROVINSI (${regionConfig.provinces.length} Lokasi)` :
                                                    `KABUPATEN/KOTA (${regionConfig.regencies.length} Lokasi)`}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-2">
                                                     {regionConfig.provinces.length > 0 && <span className="bg-white px-2 py-0.5 border rounded">Prov: {regionConfig.provinces.join(', ')}</span>}
                                                     {regionConfig.regencies.length > 0 && <span className="bg-white px-2 py-0.5 border rounded">Kab: {regionConfig.regencies.join(', ')}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* PERMISSION MATRIX */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                              <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                                <div><h3 className="font-bold text-gray-800 text-lg">Hak Akses Fitur (Permission)</h3><p className="text-xs text-gray-500">Centang fitur yang diizinkan.</p></div>
                                {!isEditing && <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold">Read Only</span>}
                              </div>
                              <div className="p-6 space-y-6">
                                {PERMISSION_CONFIG.map((group, idx) => (
                                    <div key={idx} className={`rounded-2xl border overflow-hidden ${group.color}`}>
                                            <div className="p-4 flex items-center justify-between bg-white/50 backdrop-blur-sm">
                                                <div className="flex items-center gap-3">
                                                    {group.icon && <group.icon size={20} className="opacity-70"/>}
                                                    <h4 className="font-bold uppercase tracking-wider text-xs">{group.group}</h4>
                                                </div>
                                                {isEditing && !isVirtual && (
                                                    <button onClick={() => toggleGroup(group.items)} className="text-[10px] font-bold underline opacity-60 hover:opacity-100 transition-opacity">{group.items.every(i => permissions.includes(i.id)) ? 'Uncheck All' : 'Select All'}</button>
                                                )}
                                            </div>
                                            <div className="p-4 bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {group.items.map((perm) => {
                                                    const isChecked = permissions.includes(perm.id);
                                                    return (
                                                        <label key={perm.id} className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isChecked ? 'border-green-200 bg-green-50/50' : 'border-gray-100 hover:border-gray-300'} ${isVirtual ? 'cursor-not-allowed opacity-60' : ''}`}>
                                                            <div className="relative flex items-center mt-1">
                                                                <input type="checkbox" className="peer sr-only" checked={isChecked} onChange={() => togglePermission(perm.id)} disabled={!isEditing || isVirtual}/>
                                                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                                                            </div>
                                                            <div><p className={`text-sm font-bold ${isChecked ? 'text-green-800' : 'text-gray-700'}`}>{perm.label}</p><p className="text-[11px] text-gray-500 leading-tight mt-0.5">{perm.desc}</p>{perm.danger && <span className="inline-block mt-1 text-[9px] bg-red-100 text-red-600 px-1.5 rounded font-bold border border-red-200">DANGER ZONE</span>}</div>
                                                            {isChecked ? <CheckCircle2 size={16} className="text-green-500 ml-auto shrink-0"/> : <div className="w-4"/>}
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                    </div>
                                ))}
                              </div>
                        </div>
                    </div>
                </div>
            </div>
        </Protected>
    );
}
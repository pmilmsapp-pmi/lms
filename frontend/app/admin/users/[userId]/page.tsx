// // // // // // // // // // frontend/app/admin/users/[userId]/page.tsx
// // // // // // // // // 'use client';

// // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // import { api } from '@/lib/api';
// // // // // // // // // import Link from 'next/link';

// // // // // // // // // export default function AdminUserDetailPage({ params }: { params: { userId: string } }) {
// // // // // // // // //   const { userId } = params;
// // // // // // // // //   const [data, setData] = useState<any>(null);
// // // // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const loadDetail = async () => {
// // // // // // // // //       try {
// // // // // // // // //         setLoading(true);
// // // // // // // // //         // Panggil endpoint baru
// // // // // // // // //         const res = await api(`/api/admin/users/${userId}/details`);
// // // // // // // // //         setData(res);
// // // // // // // // //       } catch (err: any) {
// // // // // // // // //         alert(err.message || 'Gagal memuat detail user');
// // // // // // // // //       } finally {
// // // // // // // // //         setLoading(false);
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //     loadDetail();
// // // // // // // // //   }, [userId]);

// // // // // // // // //   if (loading) return <div className="p-8">Memuat profil user...</div>;
// // // // // // // // //   if (!data) return <div className="p-8">Data tidak ditemukan.</div>;

// // // // // // // // //   const { user, enrollments, certificates, attempts } = data;

// // // // // // // // //   return (
// // // // // // // // //     <div className="p-6 max-w-5xl mx-auto space-y-8">
// // // // // // // // //       {/* HEADER PROFIL */}
// // // // // // // // //       <div className="bg-white p-6 rounded-lg shadow border flex items-center gap-6">
// // // // // // // // //         <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-500 uppercase overflow-hidden">
// // // // // // // // //            {user.avatarUrl ? (
// // // // // // // // //              // eslint-disable-next-line @next/next/no-img-element
// // // // // // // // //              <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover"/>
// // // // // // // // //            ) : (
// // // // // // // // //              user.name?.charAt(0) || 'U'
// // // // // // // // //            )}
// // // // // // // // //         </div>
// // // // // // // // //         <div>
// // // // // // // // //           <h1 className="text-2xl font-bold">{user.name}</h1>
// // // // // // // // //           <p className="text-gray-600">{user.email}</p>
// // // // // // // // //           <span className="mt-2 inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded">
// // // // // // // // //             {user.role}
// // // // // // // // //           </span>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="ml-auto">
// // // // // // // // //             <Link href="/admin/users" className="text-blue-600 hover:underline">
// // // // // // // // //                 &larr; Kembali ke Daftar
// // // // // // // // //             </Link>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
// // // // // // // // //         {/* SECTION 1: KURSUS YANG DIIKUTI */}
// // // // // // // // //         <div className="bg-white p-6 rounded-lg shadow border">
// // // // // // // // //           <h2 className="text-lg font-bold mb-4 border-b pb-2">Kursus Diikuti ({enrollments.length})</h2>
// // // // // // // // //           {enrollments.length === 0 ? (
// // // // // // // // //             <p className="text-gray-500 italic">Belum mengikuti kursus apapun.</p>
// // // // // // // // //           ) : (
// // // // // // // // //             <div className="space-y-4">
// // // // // // // // //               {enrollments.map((enrol: any) => (
// // // // // // // // //                 <div key={enrol._id} className="flex items-center gap-3">
// // // // // // // // //                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
// // // // // // // // //                      {enrol.course?.thumbnailUrl && (
// // // // // // // // //                         // eslint-disable-next-line @next/next/no-img-element
// // // // // // // // //                         <img src={enrol.course.thumbnailUrl} className="w-full h-full object-cover" alt="cover"/>
// // // // // // // // //                      )}
// // // // // // // // //                    </div>
// // // // // // // // //                    <div>
// // // // // // // // //                      <p className="font-semibold text-sm">{enrol.course?.title || 'Kursus Dihapus'}</p>
// // // // // // // // //                      <p className="text-xs text-gray-500">
// // // // // // // // //                         Terdaftar: {new Date(enrol.createdAt).toLocaleDateString('id-ID')}
// // // // // // // // //                      </p>
// // // // // // // // //                    </div>
// // // // // // // // //                 </div>
// // // // // // // // //               ))}
// // // // // // // // //             </div>
// // // // // // // // //           )}
// // // // // // // // //         </div>

// // // // // // // // //         {/* SECTION 2: SERTIFIKAT */}
// // // // // // // // //         <div className="bg-white p-6 rounded-lg shadow border">
// // // // // // // // //           <h2 className="text-lg font-bold mb-4 border-b pb-2">Sertifikat ({certificates.length})</h2>
// // // // // // // // //           {certificates.length === 0 ? (
// // // // // // // // //             <p className="text-gray-500 italic">Belum ada sertifikat.</p>
// // // // // // // // //           ) : (
// // // // // // // // //             <div className="space-y-3">
// // // // // // // // //               {certificates.map((cert: any) => (
// // // // // // // // //                 <div key={cert._id} className="flex justify-between items-center bg-green-50 p-3 rounded border border-green-100">
// // // // // // // // //                   <div>
// // // // // // // // //                     <p className="font-semibold text-sm text-green-900">{cert.course?.title}</p>
// // // // // // // // //                     <p className="text-xs text-green-700">{cert.number}</p>
// // // // // // // // //                   </div>
// // // // // // // // //                   <a 
// // // // // // // // //                     href={`${process.env.NEXT_PUBLIC_API_URL}/api/certificates/${cert.course?._id}/pdf`} 
// // // // // // // // //                     target="_blank"
// // // // // // // // //                     className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
// // // // // // // // //                   >
// // // // // // // // //                     Unduh
// // // // // // // // //                   </a>
// // // // // // // // //                 </div>
// // // // // // // // //               ))}
// // // // // // // // //             </div>
// // // // // // // // //           )}
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* SECTION 3: RIWAYAT KUIS & NILAI */}
// // // // // // // // //       <div className="bg-white p-6 rounded-lg shadow border">
// // // // // // // // //         <h2 className="text-lg font-bold mb-4 border-b pb-2">Riwayat & Nilai Kuis</h2>
// // // // // // // // //         {attempts.length === 0 ? (
// // // // // // // // //             <p className="text-gray-500 italic">Belum pernah mengerjakan kuis.</p>
// // // // // // // // //         ) : (
// // // // // // // // //             <table className="w-full text-left text-sm">
// // // // // // // // //                 <thead className="bg-gray-50">
// // // // // // // // //                     <tr>
// // // // // // // // //                         <th className="p-3">Kuis</th>
// // // // // // // // //                         <th className="p-3">Kursus</th>
// // // // // // // // //                         <th className="p-3">Skor</th>
// // // // // // // // //                         <th className="p-3">Waktu</th>
// // // // // // // // //                     </tr>
// // // // // // // // //                 </thead>
// // // // // // // // //                 <tbody className="divide-y">
// // // // // // // // //                     {attempts.map((att: any) => (
// // // // // // // // //                         <tr key={att._id}>
// // // // // // // // //                             <td className="p-3 font-medium">{att.quiz?.title}</td>
// // // // // // // // //                             <td className="p-3 text-gray-500">{att.quiz?.course?.title}</td>
// // // // // // // // //                             <td className="p-3">
// // // // // // // // //                                 <span className={`font-bold ${att.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
// // // // // // // // //                                     {att.score}
// // // // // // // // //                                 </span>
// // // // // // // // //                             </td>
// // // // // // // // //                             <td className="p-3 text-gray-500">
// // // // // // // // //                                 {new Date(att.createdAt).toLocaleString('id-ID')}
// // // // // // // // //                             </td>
// // // // // // // // //                         </tr>
// // // // // // // // //                     ))}
// // // // // // // // //                 </tbody>
// // // // // // // // //             </table>
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }
// // // // // // // // 'use client';

// // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // import { useParams } from 'next/navigation';
// // // // // // // // import { api } from '@/lib/api';
// // // // // // // // import Protected from '@/components/Protected';

// // // // // // // // export default function AdminUserDetailPage() {
// // // // // // // //   const { id } = useParams();
// // // // // // // //   const [data, setData] = useState<any>(null);
// // // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // // //   useEffect(() => {
// // // // // // // //     // Memanggil endpoint detail khusus admin
// // // // // // // //     api(`/api/admin/users/${id}/details`)
// // // // // // // //       .then(setData)
// // // // // // // //       .catch((err) => alert("Gagal mengambil data: " + err.message))
// // // // // // // //       .finally(() => setLoading(false));
// // // // // // // //   }, [id]);

// // // // // // // //   if (loading) return <div className="p-20 text-center">Mengambil detail user...</div>;
// // // // // // // //   if (!data) return <div className="p-20 text-center">User tidak ditemukan.</div>;

// // // // // // // //   return (
// // // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // // //       <div className="max-w-5xl mx-auto p-6 space-y-8">
// // // // // // // //         {/* INFO DASAR USER */}
// // // // // // // //         <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center gap-6">
// // // // // // // //           <img 
// // // // // // // //             src={data.user.avatarUrl || `https://ui-avatars.com/api/?name=${data.user.name}`} 
// // // // // // // //             className="w-20 h-20 rounded-full object-cover" 
// // // // // // // //             alt="avatar" 
// // // // // // // //           />
// // // // // // // //           <div>
// // // // // // // //             <h1 className="text-2xl font-bold">{data.user.name}</h1>
// // // // // // // //             <p className="text-gray-500">{data.user.email} • <span className="font-bold text-red-700">{data.user.role}</span></p>
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // // // // // //           {/* SEJARAH PELATIHAN */}
// // // // // // // //           <div className="bg-white p-6 rounded-2xl shadow-sm border">
// // // // // // // //             <h3 className="font-bold text-lg mb-4 border-b pb-2">📚 Sejarah Pelatihan</h3>
// // // // // // // //             <div className="space-y-3">
// // // // // // // //               {data.history.length > 0 ? data.history.map((h: any) => (
// // // // // // // //                 <div key={h._id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
// // // // // // // //                   <span className="text-sm font-medium">{h.courseId?.title}</span>
// // // // // // // //                   <span className={`text-[10px] px-2 py-1 rounded font-bold ${h.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
// // // // // // // //                     {h.completed ? 'SELESAI' : 'DALAM PROSES'}
// // // // // // // //                   </span>
// // // // // // // //                 </div>
// // // // // // // //               )) : <p className="text-gray-400 text-sm">Belum ada aktivitas belajar.</p>}
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           {/* DAFTAR SERTIFIKAT */}
// // // // // // // //           <div className="bg-white p-6 rounded-2xl shadow-sm border">
// // // // // // // //             <h3 className="font-bold text-lg mb-4 border-b pb-2">📜 Sertifikat Terbit</h3>
// // // // // // // //             <div className="space-y-3">
// // // // // // // //               {data.certificates.length > 0 ? data.certificates.map((c: any) => (
// // // // // // // //                 <div key={c._id} className="p-3 border border-red-100 bg-red-50 rounded-lg flex justify-between items-center">
// // // // // // // //                   <div>
// // // // // // // //                     <p className="text-xs font-bold text-red-800">{c.courseId?.title}</p>
// // // // // // // //                     <p className="text-[10px] text-gray-500">{c.certificateNumber}</p>
// // // // // // // //                   </div>
// // // // // // // //                   <button className="text-red-700 text-xs font-bold hover:underline">Lihat</button>
// // // // // // // //                 </div>
// // // // // // // //               )) : <p className="text-gray-400 text-sm">Belum memiliki sertifikat.</p>}
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
// // // // // // // import { api } from '@/lib/api';
// // // // // // // import Protected from '@/components/Protected';
// // // // // // // import Link from 'next/link';

// // // // // // // export default function AdminUserDetailPage() {
// // // // // // //   const { id } = useParams();
// // // // // // //   const router = useRouter();
// // // // // // //   const [data, setData] = useState<any>(null);
// // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchUserDetails = async () => {
// // // // // // //       try {
// // // // // // //         setLoading(true);
// // // // // // //         // Memanggil endpoint detail khusus admin yang sudah kita perbaiki
// // // // // // //         const res = await api(`/api/admin/users/${id}/details`);
        
// // // // // // //         if (res.success) {
// // // // // // //           setData(res);
// // // // // // //         } else {
// // // // // // //           throw new Error(res.error || "Gagal memuat data user");
// // // // // // //         }
// // // // // // //       } catch (err: any) {
// // // // // // //         console.error("Fetch Detail Error:", err);
// // // // // // //         alert("Gagal mengambil data: " + err.message);
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     if (id) fetchUserDetails();
// // // // // // //   }, [id]);

// // // // // // //   if (loading) {
// // // // // // //     return (
// // // // // // //       <div className="flex items-center justify-center min-h-screen">
// // // // // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   if (!data || !data.user) {
// // // // // // //     return (
// // // // // // //       <div className="p-20 text-center">
// // // // // // //         <p className="text-gray-500">Data pengguna tidak ditemukan.</p>
// // // // // // //         <button onClick={() => router.back()} className="mt-4 text-red-700 font-bold underline">Kembali</button>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
// // // // // // //         {/* HEADER & NAVIGASI */}
// // // // // // //         <div className="flex items-center justify-between">
// // // // // // //           <div className="flex items-center gap-4">
// // // // // // //             <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
// // // // // // //               <span className="text-2xl">←</span>
// // // // // // //             </button>
// // // // // // //             <h1 className="text-2xl font-bold text-gray-800">Detail Pengguna</h1>
// // // // // // //           </div>
// // // // // // //           <Link 
// // // // // // //             href={`/admin/users`} 
// // // // // // //             className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-300 transition-all"
// // // // // // //           >
// // // // // // //             Kembali ke Daftar
// // // // // // //           </Link>
// // // // // // //         </div>

// // // // // // //         {/* KARTU PROFIL UTAMA */}
// // // // // // //         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
// // // // // // //           <div className="bg-red-700 h-24 w-full"></div>
// // // // // // //           <div className="px-8 pb-8">
// // // // // // //             <div className="relative flex justify-between items-end -mt-12 mb-6">
// // // // // // //               <img 
// // // // // // //                 src={data.user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.name)}&background=random`} 
// // // // // // //                 className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
// // // // // // //                 alt="Avatar"
// // // // // // //               />
// // // // // // //               <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
// // // // // // //                 data.user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' : 
// // // // // // //                 data.user.role === 'FACILITATOR' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
// // // // // // //               }`}>
// // // // // // //                 {data.user.role}
// // // // // // //               </span>
// // // // // // //             </div>
// // // // // // //             <div>
// // // // // // //               <h2 className="text-2xl font-bold text-gray-900">{data.user.name}</h2>
// // // // // // //               <p className="text-gray-500">{data.user.email}</p>
// // // // // // //               <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">ID: {data.user._id}</p>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
// // // // // // //           {/* BAGIAN 1: SEJARAH PELATIHAN (PROGRESS) */}
// // // // // // //           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// // // // // // //             <div className="flex items-center justify-between mb-6">
// // // // // // //               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
// // // // // // //                 <span className="p-2 bg-red-50 text-red-700 rounded-lg text-sm font-bold">📚</span>
// // // // // // //                 Sejarah Pelatihan
// // // // // // //               </h3>
// // // // // // //               <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">
// // // // // // //                 {data.history?.length || 0} Kursus
// // // // // // //               </span>
// // // // // // //             </div>

// // // // // // //             <div className="space-y-4">
// // // // // // //               {data.history && data.history.length > 0 ? (
// // // // // // //                 data.history.map((item: any) => (
// // // // // // //                   <div key={item._id} className="group p-4 bg-gray-50 hover:bg-white hover:shadow-md hover:border-red-200 border border-transparent rounded-xl transition-all">
// // // // // // //                     <div className="flex justify-between items-start">
// // // // // // //                       <div>
// // // // // // //                         <p className="font-bold text-gray-900 text-sm mb-1">{item.courseId?.title || 'Kursus Tidak Diketahui'}</p>
// // // // // // //                         <p className="text-[10px] text-gray-400 uppercase font-medium">
// // // // // // //                           Terakhir diakses: {new Date(item.updatedAt).toLocaleDateString('id-ID')}
// // // // // // //                         </p>
// // // // // // //                       </div>
// // // // // // //                       <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
// // // // // // //                         item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
// // // // // // //                       }`}>
// // // // // // //                         {item.completed ? 'Selesai' : 'Sedang Berjalan'}
// // // // // // //                       </span>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 ))
// // // // // // //               ) : (
// // // // // // //                 <div className="text-center py-10">
// // // // // // //                   <p className="text-gray-400 text-sm italic">Belum ada aktivitas pelatihan.</p>
// // // // // // //                 </div>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           {/* BAGIAN 2: DAFTAR SERTIFIKAT */}
// // // // // // //           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// // // // // // //             <div className="flex items-center justify-between mb-6">
// // // // // // //               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
// // // // // // //                 <span className="p-2 bg-red-50 text-red-700 rounded-lg text-sm font-bold">📜</span>
// // // // // // //                 Sertifikat Terbit
// // // // // // //               </h3>
// // // // // // //               <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">
// // // // // // //                 {data.certificates?.length || 0} Dokumen
// // // // // // //               </span>
// // // // // // //             </div>

// // // // // // //             <div className="space-y-4">
// // // // // // //               {data.certificates && data.certificates.length > 0 ? (
// // // // // // //                 data.certificates.map((cert: any) => (
// // // // // // //                   <div key={cert._id} className="p-4 border-l-4 border-red-600 bg-red-50/30 rounded-r-xl flex justify-between items-center group">
// // // // // // //                     <div>
// // // // // // //                       <p className="font-bold text-red-900 text-sm">{cert.courseId?.title}</p>
// // // // // // //                       <p className="text-[10px] text-red-700/60 font-mono mt-0.5">#{cert.certificateNumber}</p>
// // // // // // //                     </div>
// // // // // // //                     <button 
// // // // // // //                       onClick={() => alert('Fitur download sertifikat sedang disiapkan')}
// // // // // // //                       className="opacity-0 group-hover:opacity-100 bg-white text-red-700 p-2 rounded-lg shadow-sm text-xs font-bold transition-opacity"
// // // // // // //                     >
// // // // // // //                       LIHAT
// // // // // // //                     </button>
// // // // // // //                   </div>
// // // // // // //                 ))
// // // // // // //               ) : (
// // // // // // //                 <div className="text-center py-10">
// // // // // // //                   <p className="text-gray-400 text-sm italic">Belum memiliki sertifikat.</p>
// // // // // // //                 </div>
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
// // // // // // import { api } from '@/lib/api';
// // // // // // import Protected from '@/components/Protected';
// // // // // // import Link from 'next/link';

// // // // // // export default function AdminUserDetailPage() {
// // // // // //   const { id } = useParams();
// // // // // //   const router = useRouter();
// // // // // //   const [data, setData] = useState<any>(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // //   useEffect(() => {
// // // // // //     // Gunakan flag untuk mencegah double fetch pada Strict Mode
// // // // // //     let isMounted = true;

// // // // // //     const fetchUserDetails = async () => {
// // // // // //       if (!id) return;
      
// // // // // //       try {
// // // // // //         setLoading(true);
// // // // // //         setError(null);
// // // // // //         const res = await api(`/api/admin/users/${id}/details`);
        
// // // // // //         if (isMounted) {
// // // // // //           if (res.success || res.user) {
// // // // // //             setData(res);
// // // // // //           } else {
// // // // // //             setError("Gagal memuat data pengguna.");
// // // // // //           }
// // // // // //         }
// // // // // //       } catch (err: any) {
// // // // // //         if (isMounted) {
// // // // // //           console.error("Fetch Detail Error:", err);
// // // // // //           setError(err.message || "Terjadi kesalahan saat mengambil data");
// // // // // //         }
// // // // // //       } finally {
// // // // // //         if (isMounted) setLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchUserDetails();

// // // // // //     return () => { isMounted = false; };
// // // // // //   }, [id]); // Dependency hanya pada id

// // // // // //   // Fungsi untuk menangani download PDF
// // // // // //   const handleDownloadPDF = (certId: string) => {
// // // // // //     // Langsung arahkan ke endpoint download backend
// // // // // //     const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/certificates/download/${certId}`;
// // // // // //     window.open(downloadUrl, '_blank');
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="flex flex-col items-center justify-center min-h-screen">
// // // // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
// // // // // //         <p className="text-gray-500 font-medium">Memuat Detail Pengguna...</p>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (error || !data?.user) {
// // // // // //     return (
// // // // // //       <div className="p-20 text-center">
// // // // // //         <p className="text-red-600 font-medium mb-4">{error || "User tidak ditemukan"}</p>
// // // // // //         <button onClick={() => router.back()} className="text-gray-600 underline">Kembali</button>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
// // // // // //         {/* HEADER NAVIGASI */}
// // // // // //         <div className="flex items-center justify-between">
// // // // // //           <div className="flex items-center gap-4">
// // // // // //             <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
// // // // // //               <span className="text-2xl">←</span>
// // // // // //             </button>
// // // // // //             <h1 className="text-2xl font-bold text-gray-800">Profil Lengkap Pengguna</h1>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* KARTU PROFIL UTAMA */}
// // // // // //         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
// // // // // //           <div className="bg-red-700 h-24 w-full"></div>
// // // // // //           <div className="px-8 pb-8 flex flex-col md:flex-row md:items-end gap-6 -mt-12">
// // // // // //             <img 
// // // // // //               src={data.user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.name)}&background=random`} 
// // // // // //               className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
// // // // // //               alt="Avatar"
// // // // // //             />
// // // // // //             <div className="flex-1 pb-2">
// // // // // //               <h2 className="text-3xl font-bold text-gray-900">{data.user.name}</h2>
// // // // // //               <p className="text-gray-500 font-medium">{data.user.email}</p>
// // // // // //               <div className="mt-3 flex gap-2">
// // // // // //                 <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase">
// // // // // //                   {data.user.role}
// // // // // //                 </span>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
// // // // // //           {/* SEJARAH PELATIHAN */}
// // // // // //           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// // // // // //             <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
// // // // // //               📚 Riwayat Kursus
// // // // // //             </h3>
// // // // // //             <div className="space-y-4">
// // // // // //               {data.history && data.history.length > 0 ? (
// // // // // //                 data.history.map((item: any) => (
// // // // // //                   <div key={item._id} className="p-4 bg-gray-50 rounded-xl flex justify-between items-center border border-transparent hover:border-red-200 transition-all">
// // // // // //                     <div>
// // // // // //                       <p className="font-bold text-gray-900">{item.courseId?.title || 'Kursus'}</p>
// // // // // //                       <p className="text-xs text-gray-400">Terakhir Belajar: {new Date(item.updatedAt).toLocaleDateString('id-ID')}</p>
// // // // // //                     </div>
// // // // // //                     <span className={`text-[10px] px-3 py-1 rounded-full font-bold ${
// // // // // //                       item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
// // // // // //                     }`}>
// // // // // //                       {item.completed ? 'SELESAI' : 'PROSES'}
// // // // // //                     </span>
// // // // // //                   </div>
// // // // // //                 ))
// // // // // //               ) : (
// // // // // //                 <p className="text-center py-10 text-gray-400 italic">Belum ada aktivitas.</p>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* SERTIFIKAT & DOWNLOAD PDF */}
// // // // // //           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// // // // // //             <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
// // // // // //               📜 Sertifikat Digital
// // // // // //             </h3>
// // // // // //             <div className="space-y-4">
// // // // // //               {data.certificates && data.certificates.length > 0 ? (
// // // // // //                 data.certificates.map((cert: any) => (
// // // // // //                   <div key={cert._id} className="p-5 border-l-4 border-red-600 bg-red-50 rounded-r-xl flex justify-between items-center group">
// // // // // //                     <div>
// // // // // //                       <p className="font-bold text-red-900">{cert.courseId?.title}</p>
// // // // // //                       <p className="text-[10px] text-red-700/60 font-mono tracking-wider">{cert.certificateNumber}</p>
// // // // // //                     </div>
// // // // // //                     <button 
// // // // // //                       onClick={() => handleDownloadPDF(cert._id)}
// // // // // //                       className="bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-800 shadow-md flex items-center gap-2 transition-all active:scale-95"
// // // // // //                     >
// // // // // //                       <span>📥</span> PDF
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 ))
// // // // // //               ) : (
// // // // // //                 <p className="text-center py-10 text-gray-400 italic">Belum ada sertifikat terbit.</p>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           </div>

// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </Protected>
// // // // // //   );
// // // // // // }
// // // // // 'use client';

// // // // // import { useEffect, useState, use } from 'react'; // Tambahkan use jika Next.js terbaru
// // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // import { api } from '@/lib/api';
// // // // // import Protected from '@/components/Protected';
// // // // // import Link from 'next/link';

// // // // // export default function AdminUserDetailPage() {
// // // // //   const params = useParams();
// // // // //   const id = params?.id;
// // // // //   const router = useRouter();
  
// // // // //   const [data, setData] = useState<any>(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState<string | null>(null);

// // // // //   // useEffect(() => {
// // // // //   //   if (!id) return;

// // // // //   //   const fetchUserDetails = async () => {
// // // // //   //     try {
// // // // //   //       console.log("Memulai fetch data untuk ID:", id);
// // // // //   //       setLoading(true);
// // // // //   //       setError(null);

// // // // //   //       const res = await api(`/api/admin/users/${id}/details`);
        
// // // // //   //       // Cek apakah response sesuai harapan
// // // // //   //       if (res && res.success) {
// // // // //   //         setData(res);
// // // // //   //       } else {
// // // // //   //         setError(res?.error || "Gagal memuat detail pengguna.");
// // // // //   //       }
// // // // //   //     } catch (err: any) {
// // // // //   //       console.error("Fetch Detail Error:", err);
// // // // //   //       setError(err.message || "Koneksi ke server gagal.");
// // // // //   //     } finally {
// // // // //   //       // PENTING: Matikan loading apapun hasilnya
// // // // //   //       setLoading(false);
// // // // //   //     }
// // // // //   //   };

// // // // //   //   fetchUserDetails();
// // // // //   // }, [id]);
// // // // //   useEffect(() => {
// // // // //   const fetchUserDetails = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       setError(null);
// // // // //       // Tambahkan log untuk memastikan ID benar
// // // // //       console.log("Fetching details for ID:", id); 
      
// // // // //       const res = await api(`/api/admin/users/${id}/details`);
      
// // // // //       if (res && res.success) {
// // // // //         setData(res);
// // // // //       } else {
// // // // //         setError(res?.error || "Gagal mengambil data dari server.");
// // // // //       }
// // // // //     } catch (err: any) {
// // // // //       console.error("Critical Client Error:", err);
// // // // //       setError("Koneksi gagal atau server bermasalah.");
// // // // //     } finally {
// // // // //       // WAJIB: Loading harus dimatikan di sini
// // // // //       setLoading(false); 
// // // // //     }
// // // // //   };

// // // // //   if (id) fetchUserDetails();
// // // // // }, [id]);

// // // // //   const handleDownloadPDF = (certId: string) => {
// // // // //     const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
// // // // //     window.open(`${apiUrl}/api/certificates/${certId}/pdf`, '_blank');
// // // // //   };

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="flex flex-col items-center justify-center min-h-[60vh]">
// // // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
// // // // //         <p className="text-gray-500 font-medium">Memuat Detail Pengguna...</p>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (error) {
// // // // //     return (
// // // // //       <div className="p-20 text-center">
// // // // //         <div className="text-red-500 text-5xl mb-4">⚠️</div>
// // // // //         <p className="text-red-600 font-bold mb-4">{error}</p>
// // // // //         <button onClick={() => router.back()} className="bg-gray-200 px-6 py-2 rounded-lg font-bold">
// // // // //           Kembali
// // // // //         </button>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
// // // // //         {/* Header */}
// // // // //         <div className="flex items-center gap-4">
// // // // //           <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">←</button>
// // // // //           <h1 className="text-2xl font-bold">Detail Profil: {data?.user?.name}</h1>
// // // // //         </div>

// // // // //         {/* Konten (Info User, History, Sertifikat) - Sesuai script sebelumnya */}
// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // // //            {/* Section History */}
// // // // //            <div className="bg-white p-6 rounded-2xl shadow-sm border">
// // // // //              <h3 className="font-bold mb-4">📚 Sejarah Pelatihan</h3>
// // // // //              {data?.history?.length > 0 ? (
// // // // //                data.history.map((h: any) => (
// // // // //                  <div key={h._id} className="p-3 bg-gray-50 rounded-lg mb-2 flex justify-between">
// // // // //                    <span className="text-sm font-medium">{h.courseId?.title}</span>
// // // // //                    <span className="text-[10px] font-bold uppercase">{h.completed ? '✅ Lulus' : '⏳ Proses'}</span>
// // // // //                  </div>
// // // // //                ))
// // // // //              ) : <p className="text-gray-400 text-sm italic">Belum ada pelatihan.</p>}
// // // // //            </div>

// // // // //            {/* Section Sertifikat */}
// // // // //            <div className="bg-white p-6 rounded-2xl shadow-sm border">
// // // // //              <h3 className="font-bold mb-4">📜 Sertifikat</h3>
// // // // //              {data?.certificates?.length > 0 ? (
// // // // //                data.certificates.map((c: any) => (
// // // // //                  <div key={c._id} className="p-3 border-l-4 border-red-600 bg-red-50 rounded-r-lg mb-2 flex justify-between items-center">
// // // // //                     <span className="text-sm font-bold">{c.courseId?.title}</span>
// // // // //                     <button 
// // // // //                       onClick={() => handleDownloadPDF(c._id)}
// // // // //                       className="bg-red-700 text-white text-[10px] px-3 py-1 rounded font-bold"
// // // // //                     >
// // // // //                       📥 PDF
// // // // //                     </button>
// // // // //                  </div>
// // // // //                ))
// // // // //              ) : <p className="text-gray-400 text-sm italic">Belum ada sertifikat.</p>}
// // // // //            </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </Protected>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import { useEffect, useState } from 'react';
// // // // import { useParams, useRouter } from 'next/navigation';
// // // // import { api, getImageUrl } from '@/lib/api'; // Mengambil helper dari lib/api.ts Anda
// // // // import Protected from '@/components/Protected';
// // // // import Link from 'next/link';

// // // // export default function AdminUserDetailPage() {
// // // //   const { id } = useParams();
// // // //   const router = useRouter();
  
// // // //   const [data, setData] = useState<any>(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState<string | null>(null);

// // // //   useEffect(() => {
// // // //     const fetchUserDetails = async () => {
// // // //       if (!id) return;
      
// // // //       try {
// // // //         setLoading(true);
// // // //         setError(null);
        
// // // //         // Memanggil endpoint detail admin
// // // //         const res = await api(`/api/admin/users/${id}/details`);
        
// // // //         // Cek success berdasarkan struktur backend yang kita buat sebelumnya
// // // //         if (res.success) {
// // // //           setData(res);
// // // //         } else {
// // // //           setError(res.error || "Gagal memuat data pengguna.");
// // // //         }
// // // //       } catch (err: any) {
// // // //         console.error("Fetch Detail Error:", err);
// // // //         setError(err.message || "Terjadi kesalahan saat mengambil data");
// // // //       } finally {
// // // //         // PENTING: Mematikan loading agar tidak stuck
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchUserDetails();
// // // //   }, [id]);

// // // //   // Fungsi untuk mengunduh Sertifikat PDF
// // // //   const handleDownloadPDF = (certId: string) => {
// // // //     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// // // //     // Membuka tab baru ke endpoint PDF yang sudah kita buat di backend
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
// // // //         <button 
// // // //           onClick={() => router.back()} 
// // // //           className="bg-white border border-gray-300 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
// // // //         >
// // // //           Kembali
// // // //         </button>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
// // // //         {/* NAVIGASI ATAS */}
// // // //         <div className="flex items-center justify-between">
// // // //           <div className="flex items-center gap-4">
// // // //             <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200">
// // // //               <span className="text-2xl">←</span>
// // // //             </button>
// // // //             <h1 className="text-2xl font-bold text-gray-800">Profil Lengkap Pengguna</h1>
// // // //           </div>
// // // //           <Link href="/admin/users" className="text-sm font-bold text-red-700 hover:underline">
// // // //             Daftar User
// // // //           </Link>
// // // //         </div>

// // // //         {/* HEADER PROFIL */}
// // // //         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
// // // //           <div className="bg-red-700 h-28 w-full relative">
// // // //             {/* Dekorasi Logo PMI Transparan */}
// // // //             <div className="absolute right-6 top-4 opacity-10">
// // // //               <img src="/pmi-logo.png" alt="" className="w-20" />
// // // //             </div>
// // // //           </div>
// // // //           <div className="px-8 pb-8 flex flex-col md:flex-row md:items-end gap-6 -mt-14">
// // // //             <img 
// // // //               src={getImageUrl(data.user.avatarUrl)} 
// // // //               className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-white"
// // // //               alt="Avatar"
// // // //             />
// // // //             <div className="flex-1 pb-2">
// // // //               <div className="flex items-center gap-3">
// // // //                 <h2 className="text-3xl font-bold text-gray-900">{data.user.name}</h2>
// // // //                 <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-[10px] font-black uppercase">
// // // //                   {data.user.role}
// // // //                 </span>
// // // //               </div>
// // // //               <p className="text-gray-500 font-medium">{data.user.email}</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
// // // //           {/* KOLOM KIRI: SEJARAH PELATIHAN */}
// // // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // // //             <div className="flex justify-between items-center mb-6">
// // // //               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
// // // //                 📚 Riwayat Kursus
// // // //               </h3>
// // // //               <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-500">
// // // //                 {data.history?.length || 0} Total
// // // //               </span>
// // // //             </div>

// // // //             <div className="space-y-4">
// // // //               {data.history && data.history.length > 0 ? (
// // // //                 data.history.map((item: any) => (
// // // //                   <div key={item._id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-red-100 transition-all group">
// // // //                     <div className="flex items-center gap-4">
// // // //                       <img 
// // // //                         src={getImageUrl(item.courseId?.thumbnailUrl)} 
// // // //                         className="w-12 h-12 rounded-xl object-cover bg-gray-200" 
// // // //                         alt="" 
// // // //                       />
// // // //                       <div>
// // // //                         <p className="font-bold text-gray-900 text-sm group-hover:text-red-700">{item.courseId?.title || 'Kursus'}</p>
// // // //                         <p className="text-[10px] text-gray-400">ID: {item.courseId?._id.substring(0,8)}...</p>
// // // //                       </div>
// // // //                     </div>
// // // //                     <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase ${
// // // //                       item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
// // // //                     }`}>
// // // //                       {item.completed ? 'LULUS' : 'PROSES'}
// // // //                     </span>
// // // //                   </div>
// // // //                 ))
// // // //               ) : (
// // // //                 <div className="text-center py-10">
// // // //                   <p className="text-gray-400 text-sm italic">Belum ada aktivitas pelatihan yang tercatat.</p>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* KOLOM KANAN: SERTIFIKAT */}
// // // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // // //             <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
// // // //               📜 Sertifikat Digital
// // // //             </h3>
// // // //             <div className="space-y-4">
// // // //               {data.certificates && data.certificates.length > 0 ? (
// // // //                 data.certificates.map((cert: any) => (
// // // //                   <div key={cert._id} className="p-5 border-l-4 border-red-600 bg-red-50/40 rounded-r-2xl flex justify-between items-center group">
// // // //                     <div>
// // // //                       <p className="font-bold text-red-900 text-sm">{cert.courseId?.title}</p>
// // // //                       <p className="text-[10px] text-red-700/60 font-mono tracking-widest uppercase mt-1">
// // // //                         {cert.certificateCode || cert.certificateNumber}
// // // //                       </p>
// // // //                     </div>
// // // //                     <button 
// // // //                       onClick={() => handleDownloadPDF(cert._id)}
// // // //                       className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-800 shadow-md flex items-center gap-2 transition-all active:scale-95"
// // // //                     >
// // // //                       <span>📥</span> PDF
// // // //                     </button>
// // // //                   </div>
// // // //                 ))
// // // //               ) : (
// // // //                 <div className="text-center py-10">
// // // //                   <p className="text-gray-400 text-sm italic">Sertifikat belum tersedia atau belum diklaim.</p>
// // // //                 </div>
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

// // // export default function AdminUserDetailPage() {
// // //   const { id } = useParams(); // Pastikan folder Anda bernama [id] atau [userId] sesuai struktur
// // //   const router = useRouter();
  
// // //   const [data, setData] = useState<any>(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);

// // //   useEffect(() => {
// // //     const fetchUserDetails = async () => {
// // //       if (!id) return;
      
// // //       try {
// // //         setLoading(true);
// // //         setError(null);
        
// // //         const res = await api(`/api/admin/users/${id}/details`);
        
// // //         if (res.success) {
// // //           setData(res);
// // //         } else {
// // //           setError(res.error || "Gagal memuat data pengguna.");
// // //         }
// // //       } catch (err: any) {
// // //         console.error("Fetch Detail Error:", err);
// // //         setError(err.message || "Terjadi kesalahan saat mengambil data");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchUserDetails();
// // //   }, [id]);

// // //   const handleDownloadPDF = (certId: string) => {
// // //     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// // //     window.open(`${baseUrl}/api/certificates/${certId}/pdf`, '_blank');
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
// // //         <p className="text-gray-500 font-medium tracking-wide">Memuat Detail Pengguna...</p>
// // //       </div>
// // //     );
// // //   }

// // //   if (error || !data?.user) {
// // //     return (
// // //       <div className="p-20 text-center bg-gray-50 min-h-screen">
// // //         <div className="text-red-500 text-5xl mb-4 text-center justify-center flex">⚠️</div>
// // //         <p className="text-red-600 font-bold mb-4">{error || "User tidak ditemukan"}</p>
// // //         <button 
// // //           onClick={() => router.back()} 
// // //           className="bg-white border border-gray-300 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
// // //         >
// // //           Kembali
// // //         </button>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
// // //         {/* NAVIGASI ATAS */}
// // //         <div className="flex items-center justify-between">
// // //           <div className="flex items-center gap-4">
// // //             <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200">
// // //               <span className="text-2xl">←</span>
// // //             </button>
// // //             <h1 className="text-2xl font-bold text-gray-800">Profil Lengkap Pengguna</h1>
// // //           </div>
// // //           <Link href="/admin/users" className="text-sm font-bold text-red-700 hover:underline">
// // //             Daftar User
// // //           </Link>
// // //         </div>

// // //         {/* HEADER PROFIL */}
// // //         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
// // //           <div className="bg-red-700 h-28 w-full relative">
// // //             <div className="absolute right-6 top-4 opacity-10">
// // //               {/* Gambar statis dari folder public, tidak perlu getImageUrl */}
// // //               <img src="/pmi-logo.png" alt="" className="w-20" /> 
// // //             </div>
// // //           </div>
// // //           <div className="px-8 pb-8 flex flex-col md:flex-row md:items-end gap-6 -mt-14">
// // //             {/* PERBAIKAN 1: Tambahkan fallback string kosong atau gambar default */}
// // //             <img 
// // //               src={getImageUrl(data.user.avatarUrl) || '/default-avatar.png'} 
// // //               className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-white"
// // //               alt="Avatar"
// // //               onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }}
// // //             />
// // //             <div className="flex-1 pb-2">
// // //               <div className="flex items-center gap-3">
// // //                 <h2 className="text-3xl font-bold text-gray-900">{data.user.name}</h2>
// // //                 <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-[10px] font-black uppercase">
// // //                   {data.user.role}
// // //                 </span>
// // //               </div>
// // //               <p className="text-gray-500 font-medium">{data.user.email}</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
// // //           {/* KOLOM KIRI: SEJARAH PELATIHAN */}
// // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // //             <div className="flex justify-between items-center mb-6">
// // //               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
// // //                 📚 Riwayat Kursus
// // //               </h3>
// // //               <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-500">
// // //                 {data.history?.length || 0} Total
// // //               </span>
// // //             </div>

// // //             <div className="space-y-4">
// // //               {data.history && data.history.length > 0 ? (
// // //                 data.history.map((item: any) => (
// // //                   <div key={item._id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-red-100 transition-all group">
// // //                     <div className="flex items-center gap-4">
// // //                       {/* PERBAIKAN 2: Tambahkan fallback string kosong */}
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
// // //                     <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase ${
// // //                       item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
// // //                     }`}>
// // //                       {item.completed ? 'LULUS' : 'PROSES'}
// // //                     </span>
// // //                   </div>
// // //                 ))
// // //               ) : (
// // //                 <div className="text-center py-10">
// // //                   <p className="text-gray-400 text-sm italic">Belum ada aktivitas pelatihan yang tercatat.</p>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* KOLOM KANAN: SERTIFIKAT */}
// // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// // //             <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
// // //               📜 Sertifikat Digital
// // //             </h3>
// // //             <div className="space-y-4">
// // //               {data.certificates && data.certificates.length > 0 ? (
// // //                 data.certificates.map((cert: any) => (
// // //                   <div key={cert._id} className="p-5 border-l-4 border-red-600 bg-red-50/40 rounded-r-2xl flex justify-between items-center group">
// // //                     <div>
// // //                       <p className="font-bold text-red-900 text-sm">{cert.courseId?.title}</p>
// // //                       <p className="text-[10px] text-red-700/60 font-mono tracking-widest uppercase mt-1">
// // //                         {cert.certificateCode || cert.certificateNumber}
// // //                       </p>
// // //                     </div>
// // //                     <button 
// // //                       onClick={() => handleDownloadPDF(cert._id)}
// // //                       className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-800 shadow-md flex items-center gap-2 transition-all active:scale-95"
// // //                     >
// // //                       <span>📥</span> PDF
// // //                     </button>
// // //                   </div>
// // //                 ))
// // //               ) : (
// // //                 <div className="text-center py-10">
// // //                   <p className="text-gray-400 text-sm italic">Sertifikat belum tersedia atau belum diklaim.</p>
// // //                 </div>
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

// // export default function AdminUserDetailPage() {
// //   // PERBAIKAN UTAMA: Menggunakan 'params' generic agar bisa membaca [userId] atau [id]
// //   const params = useParams();
// //   // Ambil ID entah nama foldernya [id] atau [userId]
// //   const userId = params?.userId || params?.id; 
  
// //   const router = useRouter();
  
// //   const [data, setData] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     // 1. Cek apakah ID berhasil ditangkap dari URL
// //     if (!userId) {
// //       console.error("ID tidak ditemukan di URL. Cek nama folder [id] atau [userId]");
// //       setError("ID Pengguna tidak valid.");
// //       setLoading(false); // Matikan loading agar tidak stuck
// //       return;
// //     }

// //     const fetchUserDetails = async () => {
// //       try {
// //         setLoading(true);
// //         setError(null);
        
// //         console.log(`Fetching detail untuk User ID: ${userId}`); // Debugging Log

// //         // 2. Panggil API dengan ID yang benar
// //         // Pastikan konversi ke string jika perlu
// //         const res = await api(`/api/admin/users/${userId}/details`);
        
// //         if (res.success) {
// //           setData(res);
// //         } else {
// //           setError(res.error || "Gagal memuat data pengguna.");
// //         }
// //       } catch (err: any) {
// //         console.error("Fetch Detail Error:", err);
// //         setError(err.message || "Terjadi kesalahan saat mengambil data");
// //       } finally {
// //         // 3. Pastikan loading mati apapun yang terjadi
// //         setLoading(false);
// //       }
// //     };

// //     fetchUserDetails();
// //   }, [userId]);

// //   const handleDownloadPDF = (certId: string) => {
// //     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// //     window.open(`${baseUrl}/api/certificates/${certId}/pdf`, '_blank');
// //   };

// //   // --- TAMPILAN LOADING ---
// //   if (loading) {
// //     return (
// //       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
// //         <p className="text-gray-500 font-medium tracking-wide">Memuat Detail Pengguna...</p>
// //       </div>
// //     );
// //   }

// //   // --- TAMPILAN ERROR ---
// //   if (error || !data?.user) {
// //     return (
// //       <div className="p-20 text-center bg-gray-50 min-h-screen">
// //         <div className="text-red-500 text-5xl mb-4 text-center justify-center flex">⚠️</div>
// //         <p className="text-red-600 font-bold mb-4">{error || "User tidak ditemukan"}</p>
// //         <p className="text-xs text-gray-400 mb-6">ID: {userId || 'Undefined'}</p>
// //         <button 
// //           onClick={() => router.back()} 
// //           className="bg-white border border-gray-300 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
// //         >
// //           Kembali
// //         </button>
// //       </div>
// //     );
// //   }

// //   // --- TAMPILAN DATA UTAMA ---
// //   return (
// //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// //       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
// //         {/* Navigasi */}
// //         <div className="flex items-center justify-between">
// //           <div className="flex items-center gap-4">
// //             <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200">
// //               <span className="text-2xl">←</span>
// //             </button>
// //             <h1 className="text-2xl font-bold text-gray-800">Profil Lengkap Pengguna</h1>
// //           </div>
// //           <Link href="/admin/users" className="text-sm font-bold text-red-700 hover:underline">
// //             Daftar User
// //           </Link>
// //         </div>

// //         {/* Kartu Profil */}
// //         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
// //           <div className="bg-red-700 h-28 w-full relative">
// //             <div className="absolute right-6 top-4 opacity-10">
// //               <img src="/pmi-logo.png" alt="" className="w-20" />
// //             </div>
// //           </div>
// //           <div className="px-8 pb-8 flex flex-col md:flex-row md:items-end gap-6 -mt-14">
// //             <img 
// //               src={getImageUrl(data.user.avatarUrl) || '/default-avatar.png'} 
// //               className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-white"
// //               alt="Avatar"
// //               onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }}
// //             />
// //             <div className="flex-1 pb-2">
// //               <div className="flex items-center gap-3">
// //                 <h2 className="text-3xl font-bold text-gray-900">{data.user.name}</h2>
// //                 <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-[10px] font-black uppercase">
// //                   {data.user.role}
// //                 </span>
// //               </div>
// //               <p className="text-gray-500 font-medium">{data.user.email}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
// //           {/* Sejarah Pelatihan */}
// //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// //             <div className="flex justify-between items-center mb-6">
// //               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
// //                 📚 Riwayat Kursus
// //               </h3>
// //               <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-500">
// //                 {data.history?.length || 0} Total
// //               </span>
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
// //                     <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase ${
// //                       item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
// //                     }`}>
// //                       {item.completed ? 'LULUS' : 'PROSES'}
// //                     </span>
// //                   </div>
// //                 ))
// //               ) : (
// //                 <div className="text-center py-10">
// //                   <p className="text-gray-400 text-sm italic">Belum ada aktivitas pelatihan.</p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Sertifikat */}
// //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
// //             <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
// //               📜 Sertifikat Digital
// //             </h3>
// //             <div className="space-y-4">
// //               {data.certificates && data.certificates.length > 0 ? (
// //                 data.certificates.map((cert: any) => (
// //                   <div key={cert._id} className="p-5 border-l-4 border-red-600 bg-red-50/40 rounded-r-2xl flex justify-between items-center group">
// //                     <div>
// //                       <p className="font-bold text-red-900 text-sm">{cert.courseId?.title}</p>
// //                       <p className="text-[10px] text-red-700/60 font-mono tracking-widest uppercase mt-1">
// //                         {cert.certificateCode || cert.certificateNumber}
// //                       </p>
// //                     </div>
// //                     <button 
// //                       onClick={() => handleDownloadPDF(cert._id)}
// //                       className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-800 shadow-md flex items-center gap-2 transition-all active:scale-95"
// //                     >
// //                       <span>📥</span> PDF
// //                     </button>
// //                   </div>
// //                 ))
// //               ) : (
// //                 <div className="text-center py-10">
// //                   <p className="text-gray-400 text-sm italic">Belum ada sertifikat.</p>
// //                 </div>
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

// export default function AdminUserDetailPage() {
//   const params = useParams();
//   // Mendukung nama folder [id] maupun [userId]
//   const userId = params?.userId || params?.id;
  
//   const router = useRouter();
  
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Cek apakah ID berhasil didapatkan
//     if (!userId || typeof userId !== 'string') {
//       console.error("ID Pengguna tidak valid atau tidak ditemukan di URL.");
//       setError("ID Pengguna tidak valid.");
//       setLoading(false);
//       return;
//     }

//     const fetchUserDetails = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         // Gunakan template literal untuk memastikan userId menjadi string
//         const res = await api(`/api/admin/users/${userId}/details`);
        
//         if (res.success) {
//           setData(res);
//         } else {
//           setError(res.error || "Gagal memuat data pengguna.");
//         }
//       } catch (err: any) {
//         console.error("Fetch Detail Error:", err);
//         setError(err.message || "Terjadi kesalahan saat mengambil data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [userId]);

//   const handleDownloadPDF = (certId: string) => {
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
//     window.open(`${baseUrl}/api/certificates/${certId}/pdf`, '_blank');
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
//         <p className="text-gray-500 font-medium tracking-wide">Memuat Detail Pengguna...</p>
//       </div>
//     );
//   }

//   if (error || !data?.user) {
//     return (
//       <div className="p-20 text-center bg-gray-50 min-h-screen">
//         <div className="text-red-500 text-5xl mb-4 text-center justify-center flex">⚠️</div>
//         <p className="text-red-600 font-bold mb-4">{error || "User tidak ditemukan"}</p>
//         <p className="text-xs text-gray-400 mb-6">ID: {userId || 'Tidak diketahui'}</p>
//         <button 
//           onClick={() => router.back()} 
//           className="bg-white border border-gray-300 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
//         >
//           Kembali
//         </button>
//       </div>
//     );
//   }

//   return (
//     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
//       <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
//         {/* NAVIGASI ATAS */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200">
//               <span className="text-2xl">←</span>
//             </button>
//             <h1 className="text-2xl font-bold text-gray-800">Profil Lengkap Pengguna</h1>
//           </div>
//           <Link href="/admin/users" className="text-sm font-bold text-red-700 hover:underline">
//             Daftar User
//           </Link>
//         </div>

//         {/* KARTU PROFIL UTAMA */}
//         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
//           {/* PERBAIKAN DI SINI: Mengubah h-28 menjadi h-16 agar tidak terlalu tinggi */}
//           <div className="bg-red-700 h-3 w-full relative">
//             <div className="absolute right-6 top-2 opacity-10">
//               <img src="/pmi-logo.png" alt="" className="w-16" />
//             </div>
//           </div>
          
//           {/* Menyesuaikan margin-top (-mt-8) agar foto profil pas dengan header baru */}
//           <div className="px-8 pb-8 flex flex-col md:flex-row md:items-end gap-6 -mt-8">
//             <img 
//               src={getImageUrl(data.user.avatarUrl) || '/default-avatar.png'} 
//               className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-white"
//               alt="Avatar"
//               onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }}
//             />
//             <div className="flex-1 pb-2">
//               <div className="flex items-center gap-3">
//                 <h2 className="text-3xl font-bold text-gray-900">{data.user.name}</h2>
//                 <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-[10px] font-black uppercase">
//                   {data.user.role}
//                 </span>
//               </div>
//               <p className="text-gray-500 font-medium">{data.user.email}</p>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
//           {/* KOLOM KIRI: SEJARAH PELATIHAN */}
//           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
//                 📚 Riwayat Kursus
//               </h3>
//               <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-500">
//                 {data.history?.length || 0} Total
//               </span>
//             </div>

//             <div className="space-y-4">
//               {data.history && data.history.length > 0 ? (
//                 data.history.map((item: any) => (
//                   <div key={item._id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-red-100 transition-all group">
//                     <div className="flex items-center gap-4">
//                       <img 
//                         src={getImageUrl(item.courseId?.thumbnailUrl) || '/course-placeholder.jpg'} 
//                         className="w-12 h-12 rounded-xl object-cover bg-gray-200" 
//                         alt=""
//                         onError={(e) => { (e.target as HTMLImageElement).src = '/course-placeholder.jpg'; }}
//                       />
//                       <div>
//                         <p className="font-bold text-gray-900 text-sm group-hover:text-red-700">{item.courseId?.title || 'Kursus'}</p>
//                         <p className="text-[10px] text-gray-400">ID: {item.courseId?._id.substring(0,8)}...</p>
//                       </div>
//                     </div>
//                     <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase ${
//                       item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
//                     }`}>
//                       {item.completed ? 'LULUS' : 'PROSES'}
//                     </span>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-10">
//                   <p className="text-gray-400 text-sm italic">Belum ada aktivitas pelatihan yang tercatat.</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* KOLOM KANAN: SERTIFIKAT */}
//           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//             <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
//               📜 Sertifikat Digital
//             </h3>
//             <div className="space-y-4">
//               {data.certificates && data.certificates.length > 0 ? (
//                 data.certificates.map((cert: any) => (
//                   <div key={cert._id} className="p-5 border-l-4 border-red-600 bg-red-50/40 rounded-r-2xl flex justify-between items-center group">
//                     <div>
//                       <p className="font-bold text-red-900 text-sm">{cert.courseId?.title}</p>
//                       <p className="text-[10px] text-red-700/60 font-mono tracking-widest uppercase mt-1">
//                         {cert.certificateCode || cert.certificateNumber}
//                       </p>
//                     </div>
//                     <button 
//                       onClick={() => handleDownloadPDF(cert._id)}
//                       className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-800 shadow-md flex items-center gap-2 transition-all active:scale-95"
//                     >
//                       <span>📥</span> PDF
//                     </button>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-10">
//                   <p className="text-gray-400 text-sm italic">Sertifikat belum tersedia atau belum diklaim.</p>
//                 </div>
//               )}
//             </div>
//           </div>

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
import Link from 'next/link';

export default function AdminUserDetailPage() {
  const params = useParams();
  // Mendukung nama folder [id] maupun [userId]
  const userId = params?.userId || params?.id;
  
  const router = useRouter();
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || typeof userId !== 'string') {
      console.error("ID Pengguna tidak valid.");
      setError("ID Pengguna tidak valid.");
      setLoading(false);
      return;
    }

    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await api(`/api/admin/users/${userId}/details`);
        
        if (res.success) {
          setData(res);
        } else {
          setError(res.error || "Gagal memuat data pengguna.");
        }
      } catch (err: any) {
        console.error("Fetch Detail Error:", err);
        setError(err.message || "Terjadi kesalahan saat mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleDownloadPDF = (certId: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    window.open(`${baseUrl}/api/certificates/${certId}/pdf`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
        <p className="text-gray-500 font-medium tracking-wide">Memuat Detail Pengguna...</p>
      </div>
    );
  }

  if (error || !data?.user) {
    return (
      <div className="p-20 text-center bg-gray-50 min-h-screen">
        <div className="text-red-500 text-5xl mb-4 text-center justify-center flex">⚠️</div>
        <p className="text-red-600 font-bold mb-4">{error || "User tidak ditemukan"}</p>
        <p className="text-xs text-gray-400 mb-6">ID: {userId || 'Tidak diketahui'}</p>
        <button 
          onClick={() => router.back()} 
          className="bg-white border border-gray-300 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
      <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
        {/* NAVIGASI ATAS */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200">
              <span className="text-2xl">←</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Profil Lengkap Pengguna</h1>
          </div>
          <Link href="/admin/users" className="text-sm font-bold text-red-700 hover:underline">
            Daftar User
          </Link>
        </div>

        {/* KARTU PROFIL UTAMA (Versi Clean - Tanpa Header Merah) */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <img 
              src={getImageUrl(data.user.avatarUrl) || '/default-avatar.png'} 
              className="w-28 h-28 rounded-full object-cover border border-gray-200 bg-gray-50"
              alt="Avatar"
              onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }}
            />
            
            {/* Info User */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1 justify-center md:justify-start">
                <h2 className="text-3xl font-bold text-gray-900">{data.user.name}</h2>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                  data.user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' :
                  data.user.role === 'FACILITATOR' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {data.user.role}
                </span>
              </div>
              <p className="text-gray-500 font-medium text-lg">{data.user.email}</p>
              <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">ID: {data.user._id}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* KOLOM KIRI: SEJARAH PELATIHAN */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                📚 Riwayat Kursus
              </h3>
              <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-500">
                {data.history?.length || 0} Total
              </span>
            </div>

            <div className="space-y-4">
              {data.history && data.history.length > 0 ? (
                data.history.map((item: any) => (
                  <div key={item._id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-red-100 transition-all group">
                    <div className="flex items-center gap-4">
                      <img 
                        src={getImageUrl(item.courseId?.thumbnailUrl) || '/course-placeholder.jpg'} 
                        className="w-12 h-12 rounded-xl object-cover bg-gray-200" 
                        alt=""
                        onError={(e) => { (e.target as HTMLImageElement).src = '/course-placeholder.jpg'; }}
                      />
                      <div>
                        <p className="font-bold text-gray-900 text-sm group-hover:text-red-700">{item.courseId?.title || 'Kursus'}</p>
                        <p className="text-[10px] text-gray-400">ID: {item.courseId?._id.substring(0,8)}...</p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase ${
                      item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.completed ? 'LULUS' : 'PROSES'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-400 text-sm italic">Belum ada aktivitas pelatihan yang tercatat.</p>
                </div>
              )}
            </div>
          </div>

          {/* KOLOM KANAN: SERTIFIKAT */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
              📜 Sertifikat Digital
            </h3>
            <div className="space-y-4">
              {data.certificates && data.certificates.length > 0 ? (
                data.certificates.map((cert: any) => (
                  <div key={cert._id} className="p-5 border-l-4 border-red-600 bg-red-50/40 rounded-r-2xl flex justify-between items-center group">
                    <div>
                      <p className="font-bold text-red-900 text-sm">{cert.courseId?.title}</p>
                      <p className="text-[10px] text-red-700/60 font-mono tracking-widest uppercase mt-1">
                        {cert.certificateCode || cert.certificateNumber}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleDownloadPDF(cert._id)}
                      className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-800 shadow-md flex items-center gap-2 transition-all active:scale-95"
                    >
                      <span>📥</span> PDF
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-400 text-sm italic">Sertifikat belum tersedia atau belum diklaim.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </Protected>
  );
}
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { api } from '@/lib/api';
// import { Shield, Users, BookOpen, AlertCircle, MapPin, Settings, CheckCircle, FileText } from 'lucide-react';

// interface AdminStats {
//   totalUsers: number;
//   pendingVerifications: number;
//   totalCourses: number;
//   publishedCourses: number;
// }

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState<AdminStats>({
//     totalUsers: 0,
//     pendingVerifications: 0,
//     totalCourses: 0,
//     publishedCourses: 0
//   });

//   useEffect(() => {
//     const initAdminData = async () => {
//       try {
//         setLoading(true);
//         const userData = await api('/api/auth/me');

//         // Security Check
//         if (!userData || (userData.role !== 'ADMIN' && userData.role !== 'SUPER_ADMIN')) {
//           router.replace('/dashboard');
//           return;
//         }
//         setUser(userData);

//         // --- Fetch Statistik Admin ---
//         // Idealnya buat endpoint backend: /api/admin/stats
//         // Di sini kita simulasi fetch manual jika endpoint belum ada
//         const [usersRes, coursesRes] = await Promise.all([
//              api('/api/admin/users'),   // Asumsi route ini ada dan sudah difilter scope wilayah di backend
//              api('/api/courses')        // Asumsi route ini ada
//         ]);

//         const usersList = usersRes.users || [];
//         const coursesList = coursesRes.courses || [];

//         setStats({
//             totalUsers: usersList.length,
//             // Asumsi ada field 'status' atau 'verified' di user
//             pendingVerifications: usersList.filter((u:any) => !u.isVerified).length, 
//             totalCourses: coursesList.length,
//             publishedCourses: coursesList.filter((c:any) => c.isPublished).length
//         });

//       } catch (err) {
//         console.error("Admin Dashboard Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initAdminData();
//   }, [router]);

//   if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent"></div></div>;

//   const isSuperAdmin = user?.role === 'SUPER_ADMIN';

//   return (
//     <div className="min-h-screen bg-gray-100 pb-20">
      
//       {/* ADMIN HEADER */}
//       <div className="bg-white border-b border-gray-200 px-8 py-6">
//          <div className="max-w-7xl mx-auto flex justify-between items-center">
//             <div className="flex items-center gap-4">
//                 <div className={`p-3 rounded-xl ${isSuperAdmin ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
//                     <Shield size={28} />
//                 </div>
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-900">
//                         Dashboard {isSuperAdmin ? 'Super Admin' : 'Admin'}
//                     </h1>
//                     <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
//                         <MapPin size={14}/>
//                         <span className="uppercase font-bold tracking-wider">
//                             Scope: {isSuperAdmin ? 'NASIONAL (GOD MODE)' : user?.regionScope || 'NASIONAL'}
//                         </span>
//                     </div>
//                 </div>
//             </div>
            
//             <button 
//                 onClick={() => { localStorage.removeItem('token'); router.push('/login'); }}
//                 className="text-gray-500 hover:text-red-600 font-bold text-sm transition-colors"
//             >
//                 Keluar
//             </button>
//          </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-8 py-10 space-y-8">
        
//         {/* STATS OVERVIEW */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
//                 <div className="flex justify-between items-start">
//                     <div>
//                         <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total User</p>
//                         <h3 className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</h3>
//                     </div>
//                     <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users size={20}/></div>
//                 </div>
//             </div>

//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
//                 <div className="flex justify-between items-start">
//                     <div>
//                         <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Verifikasi Pending</p>
//                         <h3 className="text-3xl font-bold text-orange-600 mt-2">{stats.pendingVerifications}</h3>
//                     </div>
//                     <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><AlertCircle size={20}/></div>
//                 </div>
//                 {stats.pendingVerifications > 0 && (
//                     <button onClick={() => router.push('/admin/users?filter=pending')} className="text-xs text-orange-600 font-bold mt-3 hover:underline">
//                         Lihat Antrian →
//                     </button>
//                 )}
//             </div>

//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
//                 <div className="flex justify-between items-start">
//                     <div>
//                         <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Kursus Aktif</p>
//                         <h3 className="text-3xl font-bold text-green-600 mt-2">{stats.publishedCourses}</h3>
//                         <p className="text-xs text-gray-400 mt-1">Dari total {stats.totalCourses} kursus</p>
//                     </div>
//                     <div className="p-2 bg-green-50 text-green-600 rounded-lg"><BookOpen size={20}/></div>
//                 </div>
//             </div>

//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
//                 <div className="flex justify-between items-start">
//                     <div>
//                         <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Status Sistem</p>
//                         <h3 className="text-lg font-bold text-gray-800 mt-2 flex items-center gap-2">
//                             <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span> Online
//                         </h3>
//                     </div>
//                     <div className="p-2 bg-gray-50 text-gray-600 rounded-lg"><Settings size={20}/></div>
//                 </div>
//             </div>
//         </div>

//         {/* MANAGEMENT SHORTCUTS */}
//         <div>
//             <h2 className="text-lg font-bold text-gray-800 mb-4 ml-1">Menu Manajemen</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
//                 {/* 1. MANAJEMEN USER */}
//                 {(isSuperAdmin || user?.permissions?.includes('manage_users')) && (
//                     <div 
//                         onClick={() => router.push('/admin/users')}
//                         className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all group"
//                     >
//                         <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                             <Users size={24}/>
//                         </div>
//                         <h3 className="font-bold text-gray-800 text-lg">Kelola Pengguna</h3>
//                         <p className="text-sm text-gray-500 mt-2">Tambah user, reset password, dan atur hak akses admin wilayah.</p>
//                     </div>
//                 )}

//                 {/* 2. MANAJEMEN KURSUS */}
//                 {(isSuperAdmin || user?.permissions?.includes('manage_courses')) && (
//                     <div 
//                         onClick={() => router.push('/admin/courses')}
//                         className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-red-400 hover:shadow-md cursor-pointer transition-all group"
//                     >
//                         <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                             <BookOpen size={24}/>
//                         </div>
//                         <h3 className="font-bold text-gray-800 text-lg">Kelola Pelatihan</h3>
//                         <p className="text-sm text-gray-500 mt-2">Buat kurikulum, verifikasi konten fasilitator, dan publish kursus.</p>
//                     </div>
//                 )}

//                 {/* 3. VERIFIKASI / CMS (Tergantung Izin) */}
//                 <div className="space-y-4">
//                     {(isSuperAdmin || user?.permissions?.includes('verify_enrollments')) && (
//                         <div className="bg-white p-4 rounded-xl border border-gray-200 hover:bg-orange-50 cursor-pointer flex items-center gap-4">
//                             <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><CheckCircle size={20}/></div>
//                             <div>
//                                 <h4 className="font-bold text-gray-800">Verifikasi Pendaftaran</h4>
//                                 <p className="text-xs text-gray-500">Approve pembayaran manual</p>
//                             </div>
//                         </div>
//                     )}
                    
//                     {(isSuperAdmin || user?.permissions?.includes('manage_cms_design')) && (
//                         <div className="bg-white p-4 rounded-xl border border-gray-200 hover:bg-purple-50 cursor-pointer flex items-center gap-4">
//                             <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><FileText size={20}/></div>
//                             <div>
//                                 <h4 className="font-bold text-gray-800">CMS & Konten Web</h4>
//                                 <p className="text-xs text-gray-500">Atur banner dan berita</p>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//             </div>
//         </div>

//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Shield, Users, BookOpen, AlertCircle, MapPin, Settings, CheckCircle, FileText } from 'lucide-react';

// [PENTING] Import Data Wilayah. Sesuaikan path dengan lokasi file JSON Anda
import regionDataRaw from '@/data/indonesia_provinces_regencies.json';
const regionData = regionDataRaw as any;

interface AdminStats {
  totalUsers: number;
  pendingVerifications: number;
  totalCourses: number;
  publishedCourses: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    pendingVerifications: 0,
    totalCourses: 0,
    publishedCourses: 0
  });

  useEffect(() => {
    const initAdminData = async () => {
      try {
        setLoading(true);
        const userData = await api('/api/auth/me');

        if (!userData || (userData.role !== 'ADMIN' && userData.role !== 'SUPER_ADMIN')) {
          router.replace('/dashboard');
          return;
        }
        setUser(userData);

        // Fetch Stats
        const [usersRes, coursesRes] = await Promise.all([
             api('/api/admin/users'),   
             api('/api/courses') // Backend akan filter sesuai role (Fasilitator/Admin)       
        ]);

        const usersList = usersRes.users || [];
        const coursesList = coursesRes.courses || [];

        setStats({
            totalUsers: usersList.length,
            pendingVerifications: usersList.filter((u:any) => !u.isVerified).length, 
            totalCourses: coursesList.length,
            publishedCourses: coursesList.filter((c:any) => c.isPublished).length
        });

      } catch (err) {
        console.error("Admin Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };

    initAdminData();
  }, [router]);

  // [FUNGSI BARU] Untuk menampilkan label wilayah yang cantik
  const getScopeLabel = () => {
      if (!user) return 'Loading...';
      if (user.role === 'SUPER_ADMIN') return 'NASIONAL (GOD MODE)';
      
      const scope = user.regionScope;
      if (scope === 'national') return 'NASIONAL';
      
      if (scope === 'province') {
          const provCodes = user.managedProvinces || [];
          if (provCodes.length === 0) return 'PROVINSI (Belum diset)';
          
          // Cari nama provinsi dari JSON
          const provNames = provCodes.map((code: string) => {
              const p = regionData.provinces.find((rp: any) => rp.code === code);
              return p ? p.name : code;
          });
          
          return `PROVINSI: ${provNames.join(', ')}`;
      }
      
      if (scope === 'regency') {
           // Logika serupa bisa ditambahkan untuk Kabupaten jika perlu
           return 'KABUPATEN/KOTA';
      }
      
      return 'UNDEFINED';
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent"></div></div>;

  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      
      {/* ADMIN HEADER */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
         <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${isSuperAdmin ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
                    <Shield size={28} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Dashboard {isSuperAdmin ? 'Super Admin' : 'Admin'}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <MapPin size={14}/>
                        <span className="uppercase font-bold tracking-wider text-orange-600">
                            {/* Panggil fungsi label di sini */}
                            {getScopeLabel()}
                        </span>
                    </div>
                </div>
            </div>
            
            <button 
                onClick={() => { localStorage.removeItem('token'); router.push('/login'); }}
                className="text-gray-500 hover:text-red-600 font-bold text-sm transition-colors"
            >
                Keluar
            </button>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10 space-y-8">
        
        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total User</p>
                        <h3 className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</h3>
                    </div>
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users size={20}/></div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Verifikasi Pending</p>
                        <h3 className="text-3xl font-bold text-orange-600 mt-2">{stats.pendingVerifications}</h3>
                    </div>
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><AlertCircle size={20}/></div>
                </div>
                {stats.pendingVerifications > 0 && (
                    <button onClick={() => router.push('/admin/users?filter=pending')} className="text-xs text-orange-600 font-bold mt-3 hover:underline">
                        Lihat Antrian →
                    </button>
                )}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Kursus Aktif</p>
                        <h3 className="text-3xl font-bold text-green-600 mt-2">{stats.publishedCourses}</h3>
                        <p className="text-xs text-gray-400 mt-1">Dari total {stats.totalCourses} kursus</p>
                    </div>
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><BookOpen size={20}/></div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Status Sistem</p>
                        <h3 className="text-lg font-bold text-gray-800 mt-2 flex items-center gap-2">
                            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span> Online
                        </h3>
                    </div>
                    <div className="p-2 bg-gray-50 text-gray-600 rounded-lg"><Settings size={20}/></div>
                </div>
            </div>
        </div>

        {/* MENU MANAJEMEN */}
        <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 ml-1">Menu Manajemen</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. MANAJEMEN USER */}
                {(isSuperAdmin || user?.permissions?.includes('manage_users')) && (
                    <div 
                        onClick={() => router.push('/admin/users')}
                        className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all group"
                    >
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Users size={24}/>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Kelola Pengguna</h3>
                        <p className="text-sm text-gray-500 mt-2">Tambah user, reset password, dan atur hak akses admin wilayah.</p>
                    </div>
                )}

                {/* 2. MANAJEMEN KURSUS */}
                {(isSuperAdmin || user?.permissions?.includes('manage_courses')) && (
                    <div 
                        onClick={() => router.push('/admin/courses')}
                        className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-red-400 hover:shadow-md cursor-pointer transition-all group"
                    >
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <BookOpen size={24}/>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Kelola Pelatihan</h3>
                        <p className="text-sm text-gray-500 mt-2">Buat kurikulum, verifikasi konten fasilitator, dan publish kursus.</p>
                    </div>
                )}

                {/* 3. VERIFIKASI & CMS */}
                <div className="space-y-4">
                    {(isSuperAdmin || user?.permissions?.includes('verify_enrollments')) && (
                        <div className="bg-white p-4 rounded-xl border border-gray-200 hover:bg-orange-50 cursor-pointer flex items-center gap-4">
                            <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><CheckCircle size={20}/></div>
                            <div>
                                <h4 className="font-bold text-gray-800">Verifikasi Pendaftaran</h4>
                                <p className="text-xs text-gray-500">Approve pembayaran manual</p>
                            </div>
                        </div>
                    )}
                    
                    {(isSuperAdmin || user?.permissions?.includes('manage_cms_design')) && (
                        <div className="bg-white p-4 rounded-xl border border-gray-200 hover:bg-purple-50 cursor-pointer flex items-center gap-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><FileText size={20}/></div>
                            <div>
                                <h4 className="font-bold text-gray-800">CMS & Konten Web</h4>
                                <p className="text-xs text-gray-500">Atur banner dan berita</p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>

      </div>
    </div>
  );
}
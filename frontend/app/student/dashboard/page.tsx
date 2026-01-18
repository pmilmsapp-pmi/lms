// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { api } from '@/lib/api';
// import { BookOpen, Award, BarChart, Search, LogOut } from 'lucide-react';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
//   avatarUrl?: string;
// }

// export default function StudentDashboard() {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     enrolledCourses: 0,
//     completedCourses: 0,
//     certificates: 0
//   });

//   useEffect(() => {
//     const initData = async () => {
//       try {
//         setLoading(true);
//         // 1. Cek User & Role
//         const userData = await api('/api/auth/me');
        
//         if (!userData || userData.role !== 'STUDENT') {
//            // Jika Admin iseng masuk sini, tendang balik
//            router.replace('/dashboard'); 
//            return;
//         }
//         setUser(userData);

//         // 2. Ambil Data Kursus Student
//         // Asumsi: /api/courses mengembalikan kursus yg diikuti/tersedia
//         const coursesData = await api('/api/courses'); 
//         const list = coursesData.courses || [];

//         // Hitung Statistik Sederhana
//         // (Sesuaikan logika 'completed' dengan struktur data real Anda)
//         setStats({
//             enrolledCourses: list.length, // Total yang diikuti
//             completedCourses: list.filter((c: any) => c.progress === 100).length,
//             certificates: list.filter((c: any) => c.hasCertificate).length
//         });

//       } catch (err) {
//         console.error(err);
//         router.push('/login');
//       } finally {
//         setLoading(false);
//       }
//     };

//     initData();
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20">
//       {/* HEADER DASHBOARD */}
//       <div className="bg-white border-b shadow-sm">
//         <div className="max-w-6xl mx-auto px-6 py-8">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="flex items-center gap-4">
//               <img 
//                 src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.name}&background=random`} 
//                 alt="Avatar" 
//                 className="w-16 h-16 rounded-full border-2 border-blue-100 object-cover shadow-sm"
//               />
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Halo, {user?.name}! 👋</h1>
//                 <p className="text-gray-500 text-sm">Siap melanjutkan pembelajaran hari ini?</p>
//               </div>
//             </div>
            
//             <div className="flex gap-3">
//               <button 
//                 onClick={() => { localStorage.removeItem('token'); router.push('/login'); }}
//                 className="px-4 py-2 border border-red-200 text-red-600 text-sm font-bold rounded-xl hover:bg-red-50 transition-colors flex items-center gap-2"
//               >
//                 <LogOut size={16}/> Logout
//               </button>
//               <button 
//                 onClick={() => router.push('/courses')}
//                 className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-md transition-all flex items-center gap-2"
//               >
//                 <Search size={16}/> Jelajahi Kelas
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* STATS & MENU GRID */}
//       <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        
//         {/* STATS CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
//                 <BookOpen size={24}/>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Kursus Saya</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.enrolledCourses}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
//                 <Award size={24}/>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Selesai</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.completedCourses}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
//                 <BarChart size={24}/>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Sertifikat</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.certificates}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* QUICK MENU */}
//         <div>
//           <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//             <span className="w-1 h-6 bg-blue-600 rounded-full block"></span> 
//             Akses Cepat
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
//             <button 
//               onClick={() => router.push('/courses')}
//               className="p-6 bg-white border rounded-2xl text-left hover:border-blue-300 hover:bg-blue-50 group transition-all"
//             >
//               <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">🔍</span>
//               <h3 className="font-bold text-gray-900">Katalog Kelas</h3>
//               <p className="text-xs text-gray-500 mt-1">Cari materi baru untuk dipelajari</p>
//             </button>

//             <button className="p-6 bg-white border rounded-2xl text-left hover:border-green-300 hover:bg-green-50 group transition-all">
//               <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">📊</span>
//               <h3 className="font-bold text-gray-900">Progres Belajar</h3>
//               <p className="text-xs text-gray-500 mt-1">Lihat nilai kuis dan progres materi</p>
//             </button>

//             <button className="p-6 bg-white border rounded-2xl text-left hover:border-purple-300 hover:bg-purple-50 group transition-all">
//               <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">👤</span>
//               <h3 className="font-bold text-gray-900">Profil Akun</h3>
//               <p className="text-xs text-gray-500 mt-1">Update biodata & ganti password</p>
//             </button>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { BookOpen, Award, BarChart, Search, LogOut } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    certificates: 0
  });

  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        // 1. Ambil Data Profil
        const res = await api('/api/auth/me');
        
        // [SINKRONISASI] Mendukung format {user: {...}} atau langsung {...}
        const userData = res.user || res;
        
        if (!userData || userData.role !== 'STUDENT') {
           // Jika bukan Student, arahkan ke halaman utama/login
           router.replace('/'); 
           return;
        }
        setUser(userData);

        // 2. Ambil Data Kursus Student
        const coursesData = await api('/api/courses'); 
        const list = coursesData.courses || [];

        setStats({
            enrolledCourses: list.length,
            completedCourses: list.filter((c: any) => c.progress === 100).length,
            certificates: list.filter((c: any) => c.hasCertificate).length
        });

      } catch (err) {
        console.error("Dashboard Error:", err);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <img 
                src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.name}&background=random`} 
                alt="Avatar" 
                className="w-16 h-16 rounded-full border-2 border-blue-100 object-cover shadow-sm"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Halo, {user?.name}! 👋</h1>
                <p className="text-gray-500 text-sm">Siap melanjutkan pembelajaran hari ini?</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => { localStorage.removeItem('token'); router.push('/login'); }}
                className="px-4 py-2 border border-red-200 text-red-600 text-sm font-bold rounded-xl hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <LogOut size={16}/> Logout
              </button>
              <button 
                onClick={() => router.push('/courses')}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-md transition-all flex items-center gap-2"
              >
                <Search size={16}/> Jelajahi Kelas
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen size={24}/>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Kursus Saya</p>
                <p className="text-3xl font-bold text-gray-900">{stats.enrolledCourses}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award size={24}/>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Selesai</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart size={24}/>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Sertifikat</p>
                <p className="text-3xl font-bold text-gray-900">{stats.certificates}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-600 rounded-full block"></span> 
            Akses Cepat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => router.push('/courses')}
              className="p-6 bg-white border rounded-2xl text-left hover:border-blue-300 hover:bg-blue-50 group transition-all"
            >
              <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">🔍</span>
              <h3 className="font-bold text-gray-900">Katalog Kelas</h3>
              <p className="text-xs text-gray-500 mt-1">Cari materi baru untuk dipelajari</p>
            </button>

            <button className="p-6 bg-white border rounded-2xl text-left hover:border-green-300 hover:bg-green-50 group transition-all">
              <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">📊</span>
              <h3 className="font-bold text-gray-900">Progres Belajar</h3>
              <p className="text-xs text-gray-500 mt-1">Lihat nilai kuis dan progres materi</p>
            </button>

            <button className="p-6 bg-white border rounded-2xl text-left hover:border-purple-300 hover:bg-purple-50 group transition-all">
              <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">👤</span>
              <h3 className="font-bold text-gray-900">Profil Akun</h3>
              <p className="text-xs text-gray-500 mt-1">Update biodata & ganti password</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
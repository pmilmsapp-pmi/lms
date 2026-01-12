'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'FACILITATOR' | 'SUPER_ADMIN';
  avatarUrl?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    activeCourses: 0,
    completedCourses: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // 1. Cek User Login
      const userData = await api('/api/auth/me');
      setUser(userData);

      // 2. Ambil Data Kursus (Sederhana) untuk Stats
      // Idealnya ada endpoint khusus /api/dashboard/stats
      const coursesData = await api(userData.role === 'STUDENT' ? '/api/courses' : '/api/courses/admin/all');
      const list = coursesData.courses || [];
      
      setStats({
        totalCourses: list.length,
        activeCourses: list.filter((c: any) => c.isPublished || c.isActive).length,
        completedCourses: 0 // Placeholder: Nanti diambil dari data progres
      });

    } catch (err) {
      console.error(err);
      router.push('/login'); // Redirect jika tidak login
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HEADER DASHBOARD */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-2xl font-bold text-blue-600 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.name}&background=random`} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Halo, {user?.name}! 👋</h1>
                <p className="text-gray-500 text-sm">
                  {user?.role === 'STUDENT' ? 'Siap belajar hal baru hari ini?' : 'Selamat datang kembali, Fasilitator.'}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => { localStorage.removeItem('token'); router.push('/login'); }}
                className="px-4 py-2 border border-red-200 text-red-600 text-sm font-bold rounded-xl hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
              {user?.role === 'STUDENT' ? (
                <button 
                  onClick={() => router.push('/courses')}
                  className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-md transition-all"
                >
                  Jelajahi Kelas
                </button>
              ) : (
                <button 
                  onClick={() => router.push('/admin/courses')}
                  className="px-6 py-2 bg-red-700 text-white text-sm font-bold rounded-xl hover:bg-red-800 shadow-md transition-all"
                >
                  Kelola Kursus
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* STATS & MENU GRID */}
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">📚</div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Total Kursus</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl">🔥</div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">
                  {user?.role === 'STUDENT' ? 'Sedang Dipelajari' : 'Kursus Aktif'}
                </p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">🏆</div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">
                   {user?.role === 'STUDENT' ? 'Selesai' : 'Total Siswa'}
                </p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedCourses}</p>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK MENU */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-3">Akses Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {user?.role !== 'STUDENT' && (
              <button 
                onClick={() => router.push('/admin/courses')}
                className="p-6 bg-white border rounded-2xl text-left hover:border-red-300 hover:bg-red-50 group transition-all"
              >
                <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">🛠️</span>
                <h3 className="font-bold text-gray-900">Panel Admin</h3>
                <p className="text-xs text-gray-500 mt-1">Buat & edit materi pelatihan</p>
              </button>
            )}

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
              <h3 className="font-bold text-gray-900">Laporan Saya</h3>
              <p className="text-xs text-gray-500 mt-1">Lihat progres dan nilai kuis</p>
            </button>

            <button className="p-6 bg-white border rounded-2xl text-left hover:border-purple-300 hover:bg-purple-50 group transition-all">
              <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">👤</span>
              <h3 className="font-bold text-gray-900">Profil Akun</h3>
              <p className="text-xs text-gray-500 mt-1">Ganti password & foto profil</p>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
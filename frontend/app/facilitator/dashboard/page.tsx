'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { BookOpen, Users, BarChart, PenTool, LogOut } from 'lucide-react';

export default function FacilitatorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      try {
        const userData = await api('/api/auth/me');
        // Security Check: Hanya Fasilitator
        if (!userData || userData.role !== 'FACILITATOR') {
           router.replace('/dashboard'); 
           return;
        }
        setUser(userData);
      } catch (err) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, [router]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-blue-50 pb-20">
      {/* HEADER FASILITATOR */}
      <div className="bg-white border-b border-blue-100 px-6 py-8">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Halo, Instruktur {user?.name}! 🎓</h1>
                <p className="text-gray-500 text-sm">Siap mengajar dan berbagi ilmu hari ini?</p>
            </div>
            <button onClick={() => { localStorage.removeItem('token'); router.push('/login'); }} className="text-red-600 font-bold text-sm border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50">Logout</button>
          </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* MENU UTAMA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* KELOLA KURSUS */}
            <button onClick={() => router.push('/admin/courses')} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border-l-4 border-blue-600 text-left group">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <PenTool size={28}/>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Kelola Kursus Saya</h3>
                <p className="text-sm text-gray-500 mt-2">Buat materi baru, edit modul, dan buat kuis.</p>
            </button>

            {/* HASIL SISWA (Placeholder) */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 opacity-70">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                    <Users size={28}/>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Data Siswa</h3>
                <p className="text-sm text-gray-500 mt-2">Pantau progres dan nilai peserta didik.</p>
            </div>

            {/* KATALOG (Bisa jadi peserta juga) */}
            <button onClick={() => router.push('/courses')} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 text-left group">
                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen size={28}/>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Katalog Belajar</h3>
                <p className="text-sm text-gray-500 mt-2">Lihat referensi kursus lain.</p>
            </button>
        </div>
      </div>
    </div>
  );
}
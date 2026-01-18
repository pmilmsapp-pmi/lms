'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Protected from '@/components/Protected';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthProvider';

export default function StudentWorkspaceDraft() {
  const { user } = useAuth(); // Ambil user dari context untuk fallback
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Memanggil endpoint baru yang kita buat di Tahap 1
    api('/api/users/me/workspace')
      .then(setData)
      .catch((err) => console.error("Gagal load draft:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
        <span className="ml-3 text-gray-500 font-medium">Menyiapkan Ruang Belajar...</span>
      </div>
    );
  }

  // Fallback data
  const history = data?.history || [];
  const certs = data?.certificates || [];

  return (
    <Protected>
      <div className="bg-gray-50 min-h-screen pb-20 font-sans">
        
        {/* 1. TOP HEADER: Welcome & Stats */}
        <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Halo, <span className="text-red-700">{data?.user?.name}</span> 👋
              </h1>
              <p className="text-gray-500 text-sm mt-1">Selamat datang di Draft Workspace Pelatihan Anda.</p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex bg-gray-50 rounded-xl p-2 border">
              <div className="px-6 py-2 border-r border-gray-200 text-center">
                <span className="block text-2xl font-bold text-gray-800">{history.length}</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Kursus</span>
              </div>
              <div className="px-6 py-2 text-center">
                <span className="block text-2xl font-bold text-green-600">{certs.length}</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Sertifikat</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 2. MAIN CONTENT (Left - 8 Columns): Pelatihan */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-700 rounded-full"></span>
                Pelatihan Aktif
              </h2>
              <Link href="/courses" className="text-red-700 text-sm font-bold hover:underline">
                Cari Pelatihan Baru →
              </Link>
            </div>

            {history.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {history.map((item: any) => (
                  <div key={item._id} className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all overflow-hidden group">
                    {/* Thumbnail Area */}
                    <div className="relative h-36 bg-gray-200">
                      {item.courseId?.thumbnailUrl ? (
                         // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={item.courseId.thumbnailUrl} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          alt="Course"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                      )}
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm">
                        {item.courseId?.category || 'Umum'}
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-5">
                      <h3 className="font-bold text-gray-800 line-clamp-2 min-h-[3rem]">
                        {item.courseId?.title || 'Judul Kursus Tidak Tersedia'}
                      </h3>
                      
                      {/* Progress Bar Modern */}
                      <div className="mt-4 mb-2">
                        <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                          <span>Progres Belajar</span>
                          <span className={item.progressPercent === 100 ? 'text-green-600' : 'text-red-600'}>
                            {item.progressPercent}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              item.progressPercent === 100 ? 'bg-green-500' : 'bg-red-600'
                            }`}
                            style={{ width: `${item.progressPercent}%` } as React.CSSProperties}
                          ></div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link 
                        href={`/courses/${item.courseId?._id}`}
                        className={`block text-center w-full py-2.5 rounded-lg text-sm font-bold mt-4 transition-colors ${
                          item.progressPercent === 100 
                            ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                            : 'bg-gray-900 text-white hover:bg-black'
                        }`}
                      >
                        {item.progressPercent === 100 ? 'Review Materi' : 'Lanjutkan Belajar'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-10 rounded-2xl border-2 border-dashed text-center">
                <p className="text-gray-500 mb-4">Anda belum mengikuti pelatihan apapun.</p>
                <Link href="/courses" className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold">
                  Mulai Belajar Sekarang
                </Link>
              </div>
            )}
          </div>

          {/* 3. SIDEBAR (Right - 4 Columns): Sertifikat & Profile */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Sertifikat Widget */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🏆</span> Koleksi Sertifikat
              </h3>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {certs.length > 0 ? (
                  certs.map((cert: any) => (
                    <div key={cert._id} className="flex items-center gap-3 p-3 bg-yellow-50/50 rounded-xl border border-yellow-100 hover:bg-yellow-50 transition-colors group cursor-pointer">
                      <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg">
                        📜
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-xs text-gray-800 truncate">{cert.courseId?.title}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Terbit: {new Date(cert.issuedAt).toLocaleDateString()}</p>
                      </div>
                      <a 
                        href={`/api/certificates/download/${cert._id}`}
                        target="_blank"
                        className="text-gray-400 hover:text-red-700"
                        title="Download PDF"
                      >
                        ⬇️
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-xs text-gray-400 bg-gray-50 rounded-xl">
                    Selesaikan kursus untuk mendapatkan sertifikat.
                  </div>
                )}
              </div>
            </div>

            {/* Profile Card Mini */}
            <div className="bg-gradient-to-br from-red-900 to-red-700 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🆔</div>
              <div className="relative z-10">
                <p className="text-red-200 text-xs font-bold uppercase tracking-widest mb-1">Kartu Pelajar</p>
                <h3 className="text-xl font-bold truncate">{data?.user?.name}</h3>
                <p className="text-red-100 text-sm opacity-80 mb-6 truncate">{data?.user?.email}</p>
                
                <Link href="/profile" className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur px-4 py-2 rounded-lg text-xs font-bold transition-all">
                  Edit Profil Lengkap
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Protected>
  );
}
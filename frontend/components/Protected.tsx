
// 'use client';
// import { useEffect } from 'react';
// import { useAuth } from '@/lib/AuthProvider';
// import { useRouter } from 'next/navigation';

// export default function Protected({ children, roles }: { children: React.ReactNode; roles?: ('STUDENT'|'FACILITATOR'|'SUPER_ADMIN'|'ADMIN')[] }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading) {
//       if (!user) router.replace('/login');
//       else if (roles && !roles.includes(user.role)) router.replace('/courses');
//     }
//   }, [user, loading, roles, router]);

//   if (loading) return <div>Memuat...</div>;
//   if (!user) return null;
//   if (roles && !roles.includes(user.role)) return null;
//   return <>{children}</>;
// }


'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/AuthProvider';
import { useRouter } from 'next/navigation';
import { Loader2, ShieldAlert } from 'lucide-react';

interface ProtectedProps {
  children: React.ReactNode;
  roles?: string[];       // Support legacy role check
  permissions?: string[]; // New permission check
}

export default function Protected({ children, roles, permissions }: ProtectedProps) {
  // [FIX] Gunakan 'isInitialized' sebagai pengganti 'loading'
  // Logic: Jika !isInitialized, berarti sedang loading data dari localStorage
  const { user, isInitialized } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    // Hanya redirect jika inisialisasi selesai DAN user tidak ada
    if (isInitialized && !user) {
      router.replace('/login');
    }
  }, [user, isInitialized, router]);

  // 1. Tampilkan Loading Screen selama inisialisasi berlangsung
  if (!isInitialized) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-500">
            <Loader2 className="animate-spin mb-2" size={32}/>
            <p className="text-xs font-bold">Memeriksa Akses...</p>
        </div>
    );
  }

  // Jika sudah initialized tapi user null, return null (karena useEffect akan redirect)
  if (!user) return null;

  // 2. Cek Role (Legacy Logic)
  if (roles && !roles.includes(user.role)) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
            <ShieldAlert size={48} className="text-red-500 mb-4"/>
            <h1 className="text-xl font-bold text-gray-800">Akses Ditolak</h1>
            <p className="text-gray-500 text-sm mt-2 max-w-md">
                Role Anda <strong>({user.role})</strong> tidak diizinkan mengakses halaman ini.
            </p>
            <button onClick={() => router.back()} className="mt-6 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-300">Kembali</button>
        </div>
    );
  }

  // 3. Cek Permission (New Logic)
  if (permissions && permissions.length > 0) {
      const userPerms = user.permissions || [];
      // Bypass Super Admin
      if (user.role !== 'SUPER_ADMIN') {
          // Cek apakah punya setidaknya satu permission yg diminta
          const hasPermission = permissions.some(p => userPerms.includes(p));
          
          if (!hasPermission) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
                    <ShieldAlert size={48} className="text-orange-500 mb-4"/>
                    <h1 className="text-xl font-bold text-gray-800">Izin Terbatas</h1>
                    <p className="text-gray-500 text-sm mt-2 max-w-md">
                        Anda tidak memiliki izin khusus untuk fitur ini.<br/>
                        Kode Izin: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{permissions.join(', ')}</code>
                    </p>
                    <button onClick={() => router.back()} className="mt-6 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-300">Kembali</button>
                </div>
            );
          }
      }
  }

  return <>{children}</>;
}
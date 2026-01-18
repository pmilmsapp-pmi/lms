// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { api } from '@/lib/api';

// export default function DashboardRouter() {
//   const router = useRouter();

//   useEffect(() => {
//     const checkUserAndRedirect = async () => {
//       try {
//         // Ambil data user terbaru
//         const user = await api('/api/auth/me');

//         if (!user) {
//             router.replace('/login');
//             return;
//         }

//         console.log("User Role Check:", user.role); // Debugging di Console Browser

//         // --- LOGIKA PENGARAH JALAN ---
        
//         // 1. SUPER ADMIN & ADMIN -> Lempar ke Dashboard Admin
//         if (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') {
//             router.replace('/admin/dashboard'); 
//         } 
//         // 2. FACILITATOR -> Lempar ke Dashboard Fasilitator
//         else if (user.role === 'FACILITATOR') {
//             router.replace('/facilitator/dashboard'); 
//         } 
//         // 3. STUDENT -> Lempar ke Dashboard Student
//         else {
//             router.replace('/student/dashboard');
//         }

//       } catch (err) {
//         console.error("Redirect Error:", err);
//         router.replace('/login');
//       }
//     };

//     checkUserAndRedirect();
//   }, [router]);

//   // Loading Screen (Supaya user tidak melihat layar kosong lama)
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//        <div className="flex flex-col items-center gap-4">
//           <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600"></div>
//           <p className="text-gray-500 text-sm font-medium">Sedang memuat ruang kerja...</p>
//        </div>
//     </div>
//   );
// }


'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRouter() {
  const router = useRouter();

  useEffect(() => {
    // [UBAH STRATEGI] 
    // Alih-alih memisah ke /admin atau /student, 
    // kita arahkan semua ke Landing Page (Home) agar melihat promosi dulu.
    router.replace('/'); 
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
       <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-200 border-t-red-600"></div>
    </div>
  );
}
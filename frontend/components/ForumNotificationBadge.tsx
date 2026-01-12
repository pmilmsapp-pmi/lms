
// // // // // // 'use client';

// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { api } from '@/lib/api';
// // // // // // import { useAuth } from '@/lib/AuthProvider';

// // // // // // export default function ForumNotificationBadge() {
// // // // // //   const { user } = useAuth();
// // // // // //   const [count, setCount] = useState(0);

// // // // // //   useEffect(() => {
// // // // // //     // Hanya Admin/Fasilitator yang perlu melihat notifikasi approval
// // // // // //     if (user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR')) {
// // // // // //         const fetchCount = async () => {
// // // // // //             try {
// // // // // //                 const res = await api('/api/forum/pending-count');
// // // // // //                 setCount(res.count || 0);
// // // // // //             } catch (e) {
// // // // // //                 // Silent error
// // // // // //             }
// // // // // //         };

// // // // // //         fetchCount();
// // // // // //         // Polling setiap 10 detik
// // // // // //         const interval = setInterval(fetchCount, 10000);
// // // // // //         return () => clearInterval(interval);
// // // // // //     }
// // // // // //   }, [user]);

// // // // // //   if (count === 0) return null;

// // // // // //   return (
// // // // // //     <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white shadow-sm animate-pulse">
// // // // // //       {count > 99 ? '99+' : count}
// // // // // //     </span>
// // // // // //   );
// // // // // // }
// // // // // 'use client';

// // // // // import { useState, useEffect } from 'react';
// // // // // import { api } from '@/lib/api';
// // // // // import { useAuth } from '@/lib/AuthProvider';

// // // // // export default function ForumNotificationBadge() {
// // // // //   const { user } = useAuth();
// // // // //   const [count, setCount] = useState(0);

// // // // //   useEffect(() => {
// // // // //     // Cek Role: Hanya Admin/Fasilitator
// // // // //     if (user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR')) {
// // // // //         const fetchCount = async () => {
// // // // //             try {
// // // // //                 const res = await api('/api/forum/pending-count');
// // // // //                 setCount(res.count || 0);
// // // // //             } catch (e) {
// // // // //                 // Silent error
// // // // //             }
// // // // //         };

// // // // //         fetchCount();
// // // // //         // Polling setiap 30 detik agar update tanpa refresh
// // // // //         const interval = setInterval(fetchCount, 30000);
// // // // //         return () => clearInterval(interval);
// // // // //     }
// // // // //   }, [user]);

// // // // //   if (count === 0) return null;

// // // // //   return (
// // // // //     <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white shadow-sm animate-pulse z-10">
// // // // //       {count > 99 ? '99+' : count}
// // // // //     </span>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { api } from '@/lib/api';
// // // // import { useAuth } from '@/lib/AuthProvider';

// // // // export default function ForumNotificationBadge() {
// // // //   const { user } = useAuth();
// // // //   const [count, setCount] = useState(0);

// // // //   useEffect(() => {
// // // //     if (!user) return;

// // // //     const fetchCount = async () => {
// // // //         try {
// // // //             let total = 0;
// // // //             // 1. Admin: Cek Approval Pending
// // // //             if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// // // //                 const pendingRes = await api('/api/forum/pending-count');
// // // //                 total += (pendingRes.count || 0);
// // // //             }
// // // //             // 2. User: Cek Notifikasi Reply (Jika endpoint ada)
// // // //             // const notifRes = await api('/api/notifications/unread-count');
// // // //             // total += (notifRes.count || 0);

// // // //             setCount(total);
// // // //         } catch (e) { /* silent */ }
// // // //     };

// // // //     fetchCount();
// // // //     const interval = setInterval(fetchCount, 15000); 
// // // //     return () => clearInterval(interval);
// // // //   }, [user]);

// // // //   if (count === 0) return null;

// // // //   return (
// // // //     <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white shadow-sm animate-pulse z-10">
// // // //       {count > 99 ? '99+' : count}
// // // //     </span>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { api } from '@/lib/api';
// // // import { useAuth } from '@/lib/AuthProvider';

// // // export default function ForumNotificationBadge() {
// // //   const { user } = useAuth();
// // //   const [count, setCount] = useState(0);

// // //   useEffect(() => {
// // //     if (!user) return;

// // //     const fetchCount = async () => {
// // //         try {
// // //             let total = 0;

// // //             // 1. Jika Admin -> Cek Pending Approval Topik
// // //             if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// // //                 const pendingRes = await api('/api/forum/pending-count');
// // //                 total += (pendingRes.count || 0);
// // //             }

// // //             // 2. Semua User -> Cek Notifikasi Reply & Mention
// // //             const notifRes = await api('/api/notifications/unread-count');
// // //             total += (notifRes.count || 0);

// // //             setCount(total);
// // //         } catch (e) {
// // //             // silent fail (misal endpoint belum siap)
// // //         }
// // //     };

// // //     fetchCount();
// // //     const interval = setInterval(fetchCount, 10000); // Cek tiap 10 detik
// // //     return () => clearInterval(interval);

// // //   }, [user]);

// // //   if (count === 0) return null;

// // //   return (
// // //     <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white shadow-sm animate-pulse z-10">
// // //       {count > 99 ? '99+' : count}
// // //     </span>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { api } from '@/lib/api';
// // import { useAuth } from '@/lib/AuthProvider';

// // export default function ForumNotificationBadge() {
// //   const { user } = useAuth();
// //   const [count, setCount] = useState(0);

// //   useEffect(() => {
// //     if (!user) return;

// //     const fetchCount = async () => {
// //         try {
// //             let total = 0;

// //             // 1. SEMUA USER: Cek Notifikasi Umum (Reply/Mention)
// //             // Menggunakan route notifikasi yang sudah Anda pasang di app.ts
// //             try {
// //                 const notifRes = await api('/api/notifications/unread-count');
// //                 total += (notifRes.count || 0);
// //             } catch (e) {
// //                 // Abaikan jika error
// //             }

// //             // 2. ADMIN/FASILITATOR: Cek Topik Pending Approval
// //             if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// //                 try {
// //                     // Coba hitung via endpoint khusus (jika ada)
// //                     const pendingRes = await api('/api/forum/pending-count');
// //                     total += (pendingRes.count || 0);
// //                 } catch (e) {
// //                     // Fallback: Jika endpoint count tidak ada, cek via list manual
// //                     try {
// //                        const listRes = await api('/api/forum?status=pending');
// //                        if(listRes.topics && Array.isArray(listRes.topics)) {
// //                            total += listRes.topics.length;
// //                        }
// //                     } catch(err) {}
// //                 }
// //             }

// //             setCount(total);
// //         } catch (e) {
// //             // Silent fail
// //         }
// //     };

// //     // Jalankan segera, lalu ulangi setiap 10 detik
// //     fetchCount();
// //     const interval = setInterval(fetchCount, 10000); 
// //     return () => clearInterval(interval);

// //   }, [user]);

// //   if (count === 0) return null;

// //   return (
// //     <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border border-white shadow-sm animate-pulse z-10 px-0.5 leading-none">
// //       {count > 99 ? '99+' : count}
// //     </span>
// //   );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { api } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';

// export default function ForumNotificationBadge() {
//   const { user } = useAuth();
//   const [count, setCount] = useState(0);

//   const fetchCount = async () => {
//         if (!user) return;
//         try {
//             let total = 0;
//             // 1. Cek Pending Approval (Admin Only)
//             if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
//                 const pendingRes = await api('/api/forum/pending-count');
//                 total += (pendingRes.count || 0);
//             }
//             // 2. Cek Unread Mention/Reply (Semua User)
//             const notifRes = await api('/api/notifications/unread-count');
//             total += (notifRes.count || 0);
            
//             setCount(total);
//         } catch (e) { /* silent */ }
//   };

//   useEffect(() => {
//     fetchCount();
    
//     // Polling rutin
//     const interval = setInterval(fetchCount, 10000); 

//     // LISTENER KHUSUS: Agar update instan saat dibaca
//     const handleUpdate = () => fetchCount();
//     window.addEventListener('notification-updated', handleUpdate);

//     return () => {
//         clearInterval(interval);
//         window.removeEventListener('notification-updated', handleUpdate);
//     };
//   }, [user]);

//   if (count === 0) return null;

//   return (
//     <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border border-white shadow-sm animate-pulse z-10 px-0.5 leading-none">
//       {count > 99 ? '99+' : count}
//     </span>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';

export default function ForumNotificationBadge() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
        if (!user) return;
        try {
            let total = 0;
            
            // 1. Cek Pending Approval (Khusus Admin/Fasilitator)
            if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
                try {
                    const pendingRes = await api('/api/forum/pending-count');
                    total += (pendingRes.count || 0);
                } catch(e) {}
            }

            // 2. Cek Notifikasi Forum (Reply/Mention)
            // Mengambil field 'forumCount' dari backend
            const notifRes = await api('/api/notifications/unread-count');
            total += (notifRes.forumCount || 0); 
            
            setCount(total);
        } catch (e) { /* silent */ }
  };

  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, 10000); 
    
    const handleUpdate = () => fetchCount();
    window.addEventListener('notification-updated', handleUpdate);

    return () => {
        clearInterval(interval);
        window.removeEventListener('notification-updated', handleUpdate);
    };
  }, [user]);

  if (count === 0) return null;

  return (
    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border border-white shadow-sm animate-pulse z-10 px-0.5 leading-none">
      {count > 99 ? '99+' : count}
    </span>
  );
}
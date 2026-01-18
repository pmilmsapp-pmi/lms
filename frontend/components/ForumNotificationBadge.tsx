
// // // // // // // 'use client';

// // // // // // // import { useState, useEffect } from 'react';
// // // // // // // import { api } from '@/lib/api';
// // // // // // // import { useAuth } from '@/lib/AuthProvider';

// // // // // // // export default function ForumNotificationBadge() {
// // // // // // //   const { user } = useAuth();
// // // // // // //   const [count, setCount] = useState(0);

// // // // // // //   useEffect(() => {
// // // // // // //     // Hanya Admin/Fasilitator yang perlu melihat notifikasi approval
// // // // // // //     if (user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR')) {
// // // // // // //         const fetchCount = async () => {
// // // // // // //             try {
// // // // // // //                 const res = await api('/api/forum/pending-count');
// // // // // // //                 setCount(res.count || 0);
// // // // // // //             } catch (e) {
// // // // // // //                 // Silent error
// // // // // // //             }
// // // // // // //         };

// // // // // // //         fetchCount();
// // // // // // //         // Polling setiap 10 detik
// // // // // // //         const interval = setInterval(fetchCount, 10000);
// // // // // // //         return () => clearInterval(interval);
// // // // // // //     }
// // // // // // //   }, [user]);

// // // // // // //   if (count === 0) return null;

// // // // // // //   return (
// // // // // // //     <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white shadow-sm animate-pulse">
// // // // // // //       {count > 99 ? '99+' : count}
// // // // // // //     </span>
// // // // // // //   );
// // // // // // // }
// // // // // // 'use client';

// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { api } from '@/lib/api';
// // // // // // import { useAuth } from '@/lib/AuthProvider';

// // // // // // export default function ForumNotificationBadge() {
// // // // // //   const { user } = useAuth();
// // // // // //   const [count, setCount] = useState(0);

// // // // // //   useEffect(() => {
// // // // // //     // Cek Role: Hanya Admin/Fasilitator
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
// // // // // //         // Polling setiap 30 detik agar update tanpa refresh
// // // // // //         const interval = setInterval(fetchCount, 30000);
// // // // // //         return () => clearInterval(interval);
// // // // // //     }
// // // // // //   }, [user]);

// // // // // //   if (count === 0) return null;

// // // // // //   return (
// // // // // //     <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white shadow-sm animate-pulse z-10">
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
// // // // //     if (!user) return;

// // // // //     const fetchCount = async () => {
// // // // //         try {
// // // // //             let total = 0;
// // // // //             // 1. Admin: Cek Approval Pending
// // // // //             if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// // // // //                 const pendingRes = await api('/api/forum/pending-count');
// // // // //                 total += (pendingRes.count || 0);
// // // // //             }
// // // // //             // 2. User: Cek Notifikasi Reply (Jika endpoint ada)
// // // // //             // const notifRes = await api('/api/notifications/unread-count');
// // // // //             // total += (notifRes.count || 0);

// // // // //             setCount(total);
// // // // //         } catch (e) { /* silent */ }
// // // // //     };

// // // // //     fetchCount();
// // // // //     const interval = setInterval(fetchCount, 15000); 
// // // // //     return () => clearInterval(interval);
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

// // // //             // 1. Jika Admin -> Cek Pending Approval Topik
// // // //             if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// // // //                 const pendingRes = await api('/api/forum/pending-count');
// // // //                 total += (pendingRes.count || 0);
// // // //             }

// // // //             // 2. Semua User -> Cek Notifikasi Reply & Mention
// // // //             const notifRes = await api('/api/notifications/unread-count');
// // // //             total += (notifRes.count || 0);

// // // //             setCount(total);
// // // //         } catch (e) {
// // // //             // silent fail (misal endpoint belum siap)
// // // //         }
// // // //     };

// // // //     fetchCount();
// // // //     const interval = setInterval(fetchCount, 10000); // Cek tiap 10 detik
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

// // //             // 1. SEMUA USER: Cek Notifikasi Umum (Reply/Mention)
// // //             // Menggunakan route notifikasi yang sudah Anda pasang di app.ts
// // //             try {
// // //                 const notifRes = await api('/api/notifications/unread-count');
// // //                 total += (notifRes.count || 0);
// // //             } catch (e) {
// // //                 // Abaikan jika error
// // //             }

// // //             // 2. ADMIN/FASILITATOR: Cek Topik Pending Approval
// // //             if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// // //                 try {
// // //                     // Coba hitung via endpoint khusus (jika ada)
// // //                     const pendingRes = await api('/api/forum/pending-count');
// // //                     total += (pendingRes.count || 0);
// // //                 } catch (e) {
// // //                     // Fallback: Jika endpoint count tidak ada, cek via list manual
// // //                     try {
// // //                        const listRes = await api('/api/forum?status=pending');
// // //                        if(listRes.topics && Array.isArray(listRes.topics)) {
// // //                            total += listRes.topics.length;
// // //                        }
// // //                     } catch(err) {}
// // //                 }
// // //             }

// // //             setCount(total);
// // //         } catch (e) {
// // //             // Silent fail
// // //         }
// // //     };

// // //     // Jalankan segera, lalu ulangi setiap 10 detik
// // //     fetchCount();
// // //     const interval = setInterval(fetchCount, 10000); 
// // //     return () => clearInterval(interval);

// // //   }, [user]);

// // //   if (count === 0) return null;

// // //   return (
// // //     <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border border-white shadow-sm animate-pulse z-10 px-0.5 leading-none">
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

// //   const fetchCount = async () => {
// //         if (!user) return;
// //         try {
// //             let total = 0;
// //             // 1. Cek Pending Approval (Admin Only)
// //             if (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') {
// //                 const pendingRes = await api('/api/forum/pending-count');
// //                 total += (pendingRes.count || 0);
// //             }
// //             // 2. Cek Unread Mention/Reply (Semua User)
// //             const notifRes = await api('/api/notifications/unread-count');
// //             total += (notifRes.count || 0);
            
// //             setCount(total);
// //         } catch (e) { /* silent */ }
// //   };

// //   useEffect(() => {
// //     fetchCount();
    
// //     // Polling rutin
// //     const interval = setInterval(fetchCount, 10000); 

// //     // LISTENER KHUSUS: Agar update instan saat dibaca
// //     const handleUpdate = () => fetchCount();
// //     window.addEventListener('notification-updated', handleUpdate);

// //     return () => {
// //         clearInterval(interval);
// //         window.removeEventListener('notification-updated', handleUpdate);
// //     };
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

// interface BadgeProps {
//   courseId?: string;
//   className?: string;
// }

// export default function ChatNotificationBadge({ courseId, className }: BadgeProps) {
//   const { user } = useAuth();
//   const [count, setCount] = useState(0);

//   const fetchCount = async () => {
//     if (!user) return;
//     try {
//       let endpoint = '/api/chat/unread-count';
//       if (courseId) {
//           endpoint = `/api/chat/group/${courseId}/count`; // Mengambil total pesan grup
//       }

//       const res = await api(endpoint);
//       const serverTotal = res.count || 0;

//       // Hitung selisih dengan yang sudah dibaca di LocalStorage
//       if (courseId) {
//           const localKey = `chat_read_count_${courseId}_${user.id}`;
//           const lastRead = parseInt(localStorage.getItem(localKey) || '0', 10);
//           const unread = Math.max(0, serverTotal - lastRead);
//           setCount(unread);
//       } else {
//           setCount(serverTotal);
//       }
//     } catch (e) {
//       // Silent error
//     }
//   };

//   useEffect(() => {
//     fetchCount();
    
//     // 1. Polling interval (backup)
//     const interval = setInterval(fetchCount, 5000);

//     // 2. Event Listener untuk update instan saat chat dibuka
//     const handleUpdate = () => fetchCount();
//     window.addEventListener('chat-badge-update', handleUpdate);

//     return () => {
//         clearInterval(interval);
//         window.removeEventListener('chat-badge-update', handleUpdate);
//     };
//   }, [user, courseId]);

//   if (count === 0) return null;

//   return (
//     <span className={`absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white animate-bounce ${className}`}>
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

  const fetchForumNotifications = async () => {
    if (!user) return;

    try {
      // 1. Ambil semua notifikasi user (atau endpoint khusus unread jika ada)
      // Kita asumsikan endpoint ini mengembalikan list notifikasi
      const res = await api('/api/notifications');
      
      // 2. Filter hanya notifikasi yang:
      //    - Belum dibaca (isRead: false)
      //    - Tipenya berhubungan dengan Forum ('reply' atau 'mention')
      //    - Sesuaikan tipe ini dengan apa yang disimpan di database saat addComment
      const forumUnread = Array.isArray(res) 
        ? res.filter((n: any) => !n.isRead && (n.type === 'reply' || n.type === 'mention')).length
        : 0;

      setCount(forumUnread);
    } catch (e) {
      // Silent error agar tidak mengganggu UI
      console.error("Gagal load notif forum", e);
    }
  };

  useEffect(() => {
    fetchForumNotifications();

    // Polling setiap 10 detik agar badge update otomatis jika ada balasan baru
    const interval = setInterval(fetchForumNotifications, 10000);
    
    // Event listener jika ingin update instan dari komponen lain (opsional)
    const handleUpdate = () => fetchForumNotifications();
    window.addEventListener('notification-update', handleUpdate);

    return () => {
        clearInterval(interval);
        window.removeEventListener('notification-update', handleUpdate);
    };
  }, [user]);

  if (count === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white ring-1 ring-white animate-pulse">
      {count > 99 ? '99+' : count}
    </span>
  );
}
// // 'use client';
// // import { useState, useEffect } from 'react';
// // import { api } from '@/lib/api';

// // export default function ChatNotificationBadge() {
// //   const [count, setCount] = useState(0);

// //   useEffect(() => {
// //     const fetchCount = async () => {
// //       try {
// //         const res = await api('/api/chat/unread-count');
// //         setCount(res.count);
// //       } catch (e) {
// //         // Silent error
// //       }
// //     };

// //     fetchCount();
// //     // Polling setiap 10 detik untuk cek pesan baru
// //     const interval = setInterval(fetchCount, 10000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   if (count === 0) return null;

// //   return (
// //     <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white animate-pulse">
// //       {count > 99 ? '99+' : count}
// //     </span>
// //   );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { api } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';

// export default function ChatNotificationBadge() {
//   const { user } = useAuth(); // Pastikan ada user auth
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!user) return;

//     const fetchCount = async () => {
//       try {
//         const res = await api('/api/chat/unread-count');
//         setCount(res.count || 0);
//       } catch (e) {
//         // Silent error
//       }
//     };

//     fetchCount();
//     // Polling setiap 5 detik agar sinkron dengan popup chat
//     const interval = setInterval(fetchCount, 5000); 
//     return () => clearInterval(interval);
//   }, [user]);

//   if (count === 0) return null;

//   return (
//     // UBAH DISINI: Hapus 'absolute', tambah 'ml-auto'
//     <span className="ml-auto bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-sm animate-pulse">
//       {count > 99 ? '99+' : count}
//     </span>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';

interface BadgeProps {
  courseId?: string;
  className?: string;
}

export default function ChatNotificationBadge({ courseId, className }: BadgeProps) {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
    if (!user) return;
    try {
      // 1. Ambil total pesan dari server
      let endpoint = '/api/chat/unread-count';
      if (courseId) {
          endpoint = `/api/chat/group/${courseId}/count`;
      }

      const res = await api(endpoint);
      const serverTotal = res.count || 0;

      // 2. Ambil total yang sudah dibaca dari LocalStorage
      if (courseId) {
          const localKey = `chat_read_count_${courseId}_${user.id}`;
          const lastRead = parseInt(localStorage.getItem(localKey) || '0', 10);
          
          // 3. Hitung selisih (Unread = Total Server - Terakhir Dibaca)
          const unread = Math.max(0, serverTotal - lastRead);
          setCount(unread);
      } else {
          setCount(serverTotal);
      }
    } catch (e) {
      // Silent error
    }
  };

  useEffect(() => {
    fetchCount();
    
    // Polling backup
    const interval = setInterval(fetchCount, 5000);

    // Event Listener: Dipanggil saat Chat dibuka oleh user
    const handleUpdate = () => {
        // Beri sedikit delay agar localStorage sempat terupdate di komponen Chat
        setTimeout(fetchCount, 200); 
    };
    
    window.addEventListener('chat-badge-update', handleUpdate);

    return () => {
        clearInterval(interval);
        window.removeEventListener('chat-badge-update', handleUpdate);
    };
  }, [user, courseId]);

  if (count === 0) return null;

  return (
    <span className={`absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white animate-bounce ${className}`}>
      {count > 99 ? '99+' : count}
    </span>
  );
}
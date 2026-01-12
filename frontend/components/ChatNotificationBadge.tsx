// 'use client';
// import { useState, useEffect } from 'react';
// import { api } from '@/lib/api';

// export default function ChatNotificationBadge() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const fetchCount = async () => {
//       try {
//         const res = await api('/api/chat/unread-count');
//         setCount(res.count);
//       } catch (e) {
//         // Silent error
//       }
//     };

//     fetchCount();
//     // Polling setiap 10 detik untuk cek pesan baru
//     const interval = setInterval(fetchCount, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   if (count === 0) return null;

//   return (
//     <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white animate-pulse">
//       {count > 99 ? '99+' : count}
//     </span>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';

export default function ChatNotificationBadge() {
  const { user } = useAuth(); // Pastikan ada user auth
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchCount = async () => {
      try {
        const res = await api('/api/chat/unread-count');
        setCount(res.count || 0);
      } catch (e) {
        // Silent error
      }
    };

    fetchCount();
    // Polling setiap 5 detik agar sinkron dengan popup chat
    const interval = setInterval(fetchCount, 5000); 
    return () => clearInterval(interval);
  }, [user]);

  if (count === 0) return null;

  return (
    // UBAH DISINI: Hapus 'absolute', tambah 'ml-auto'
    <span className="ml-auto bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-sm animate-pulse">
      {count > 99 ? '99+' : count}
    </span>
  );
}
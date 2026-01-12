'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';

export default function LibraryNotificationBadge() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
        if (!user) return;
        try {
            // Mengambil field 'libraryCount' dari backend
            const res = await api('/api/notifications/unread-count');
            setCount(res.libraryCount || 0);
        } catch (e) { /* silent */ }
  };

  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, 10000); // Polling 10 detik
    
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
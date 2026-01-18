'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';

export default function BlogNotificationBadge() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  const fetchBlogNotifications = async () => {
    if (!user) return;

    try {
      // 1. Ambil semua notifikasi
      const res = await api('/api/notifications');
      
      // 2. Filter hanya notifikasi yang:
      //    - Belum dibaca (isRead: false)
      //    - Tipenya 'blog' (Komentar blog, like, atau approval blog)
      const blogUnread = Array.isArray(res) 
        ? res.filter((n: any) => !n.isRead && n.type === 'blog').length
        : 0;

      setCount(blogUnread);
    } catch (e) {
      console.error("Gagal load notif blog", e);
    }
  };

  useEffect(() => {
    fetchBlogNotifications();

    // Polling setiap 10 detik
    const interval = setInterval(fetchBlogNotifications, 10000);
    
    // Listen event global jika ada update
    const handleUpdate = () => fetchBlogNotifications();
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
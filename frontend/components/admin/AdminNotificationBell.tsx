'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, Trash2 } from 'lucide-react'; // Import Icon Sampah
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function AdminNotificationBell() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const fetchNotifications = async () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) return;

        try {
            const res = await api('/api/notifications?limit=10');
            // Handle response format (array vs object)
            const data = Array.isArray(res) ? res : (res.notifications || []);
            setNotifications(data);
            
            const countRes = await api('/api/notifications/unread-count');
            setUnreadCount(countRes.count || 0);
        } catch (e) { }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNotificationClick = async (notif: any) => {
        setNotifications(prev => prev.map(n => n._id === notif._id ? { ...n, isRead: true } : n));
        if (!notif.isRead) {
            setUnreadCount(prev => Math.max(0, prev - 1));
            api(`/api/notifications/${notif._id}/read`, { method: 'PATCH' }).catch(() => {});
        }

        setIsOpen(false);

        // --- [FIX] INTERCEPTOR LINK (Mencegah ke /forum) ---
        let finalUrl = notif.targetUrl;

        if (finalUrl && finalUrl.includes('/forum/')) {
            const parts = finalUrl.split('/');
            const potentialId = parts[parts.length - 1]; 
            // Jika ID valid, belokkan ke Admin Course Modal
            if (potentialId && potentialId.length > 15) {
                finalUrl = `/admin/courses?highlight=${potentialId}`;
            }
        }

        if (finalUrl) router.push(finalUrl);
    };

    // [FITUR BARU] BERSIHKAN BUG NOTIFIKASI
    const handleClearAll = async () => {
        if(!confirm("Bersihkan semua notifikasi? Ini akan menghapus notifikasi yang nyangkut.")) return;
        
        try {
            // Panggil endpoint clear-all yang baru dibuat
            await api('/api/notifications/clear-all', { method: 'DELETE' });
            
            // Opsional: Jika ingin reset Chat juga, uncomment baris bawah ini
            // await api('/api/chat/nuke', { method: 'DELETE' }); 

            setNotifications([]);
            setUnreadCount(0);
            setIsOpen(false);
            alert("Notifikasi bersih!");
            window.location.reload(); // Refresh halaman agar bersih total
        } catch (e) {
            alert("Gagal membersihkan.");
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 text-sm">Notifikasi</h3>
                        <div className="flex items-center gap-2">
                            {/* TOMBOL SAMPAH (CLEAR BUG) */}
                            {notifications.length > 0 && (
                                <button 
                                    onClick={handleClearAll} 
                                    className="text-gray-400 hover:text-red-600 transition-colors p-1" 
                                    title="Hapus Semua Notifikasi"
                                >
                                    <Trash2 size={16}/>
                                </button>
                            )}
                            <span className="text-[10px] text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded">{unreadCount} baru</span>
                        </div>
                    </div>
                    
                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                        {notifications.length === 0 ? (
                            <div className="p-6 text-center text-gray-400 text-xs italic">
                                Tidak ada notifikasi.
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {notifications.map((notif) => (
                                    <div 
                                        key={notif._id} 
                                        onClick={() => handleNotificationClick(notif)}
                                        className={`p-3 hover:bg-gray-50 transition-colors flex gap-3 cursor-pointer ${!notif.isRead ? 'bg-blue-50/20' : ''}`}
                                    >
                                        <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${!notif.isRead ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                                        <div className="flex-1 overflow-hidden">
                                            {/* Nama Pengirim dengan Fallback */}
                                            <p className="text-[10px] text-gray-500 font-bold mb-0.5 uppercase">
                                                {notif.sender?.name || 'Sistem'}
                                            </p>
                                            
                                            <p className="text-xs text-gray-800 line-clamp-2 leading-relaxed">
                                                {notif.message}
                                            </p>
                                            
                                            <p className="text-[10px] text-gray-400 mt-1">
                                                {new Date(notif.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div className="p-2 border-t border-gray-50 bg-gray-50 text-center">
                        <button className="text-xs font-bold text-gray-500 hover:text-gray-800 w-full" onClick={() => router.push('/admin/notifications')}>
                            Lihat Semua
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
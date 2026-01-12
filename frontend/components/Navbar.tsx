// 'use client';

// import Link from 'next/link';
// import { useState } from 'react';
// import { usePathname, useRouter } from 'next/navigation';

// export default function Navbar() {
//   const pathname = usePathname();
//   const router = useRouter();
  
//   // State untuk dropdown
//   const [isManageOpen, setIsManageOpen] = useState(false);
//   const [isInteraktifOpen, setIsInteraktifOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     router.push('/login');
//   };

//   return (
//     <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex justify-between items-center h-16">
          
//           {/* LOGO */}
//           <Link href="/dashboard" className="text-xl font-bold text-red-700 flex items-center gap-2">
//             {/* Ganti teks dengan Logo Image jika ada, atau biarkan teks */}
//             LMS System
//           </Link>

//           {/* MENU ITEMS */}
//           <div className="hidden md:flex items-center gap-6">
            
//             <Link 
//               href="/dashboard" 
//               className={`text-sm font-medium ${pathname === '/dashboard' ? 'text-red-700' : 'text-gray-600 hover:text-gray-900'}`}
//             >
//               Dashboard
//             </Link>

//             <Link 
//               href="/courses" 
//               className={`text-sm font-medium ${pathname === '/courses' ? 'text-red-700' : 'text-gray-600 hover:text-gray-900'}`}
//             >
//               Katalog Kelas
//             </Link>

//             {/* --- DROPDOWN 1: INTERAKTIF (Untuk User & Umum) --- */}
//             <div className="relative">
//               <button 
//                 onClick={() => { setIsInteraktifOpen(!isInteraktifOpen); setIsManageOpen(false); }}
//                 className={`text-sm font-medium flex items-center gap-1 focus:outline-none ${pathname?.startsWith('/blog') || pathname?.startsWith('/forum') ? 'text-red-700' : 'text-gray-600 hover:text-gray-900'}`}
//               >
//                 Interaktif
//                 <svg className={`w-4 h-4 transition-transform ${isInteraktifOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//               </button>

//               {isInteraktifOpen && (
//                 <div 
//                   className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2"
//                   onMouseLeave={() => setIsInteraktifOpen(false)}
//                 >
//                   <Link href="/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700" onClick={() => setIsInteraktifOpen(false)}>
//                     Blog Relawan
//                   </Link>
//                   <Link href="/forum" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700" onClick={() => setIsInteraktifOpen(false)}>
//                     Forum Diskusi
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* --- DROPDOWN 2: PENGELOLAAN (Untuk Admin/Fasilitator) --- */}
//             <div className="relative">
//               <button 
//                 onClick={() => { setIsManageOpen(!isManageOpen); setIsInteraktifOpen(false); }}
//                 className={`text-sm font-medium flex items-center gap-1 focus:outline-none ${pathname?.startsWith('/admin') ? 'text-red-700' : 'text-gray-600 hover:text-gray-900'}`}
//               >
//                 Pengelolaan
//                 <svg className={`w-4 h-4 transition-transform ${isManageOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//               </button>

//               {isManageOpen && (
//                 <div 
//                   className="absolute left-0 mt-2 w-56 bg-white border rounded-lg shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2"
//                   onMouseLeave={() => setIsManageOpen(false)}
//                 >
//                   <div className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Menu Admin</div>
                  
//                   <Link href="/admin/courses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700" onClick={() => setIsManageOpen(false)}>
//                     Manajemen Pelatihan
//                   </Link>
                  
//                   <Link href="/admin/library" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700" onClick={() => setIsManageOpen(false)}>
//                     Manajemen Perpustakaan
//                   </Link>
                  
//                   {/* INI TOMBOL YANG ANDA CARI */}
//                   <Link href="/admin/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700" onClick={() => setIsManageOpen(false)}>
//                     Manajemen Blog (CMS)
//                   </Link>

//                   <div className="border-t my-1"></div>
//                   <Link href="/admin/users" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700" onClick={() => setIsManageOpen(false)}>
//                     Manajemen User
//                   </Link>
//                 </div>
//               )}
//             </div>

//           </div>

//           {/* RIGHT SIDE */}
//           <div className="flex items-center gap-4">
//             <Link href="/profile" className="hidden md:block text-sm font-medium text-gray-600 hover:text-red-700">
//                 Profil Saya
//             </Link>
//             <button 
//               onClick={handleLogout}
//               className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors border px-3 py-1.5 rounded-lg hover:border-red-600"
//             >
//               Logout
//             </button>
//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// }
'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthProvider'; // Pastikan path ini benar
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getImageUrl, api } from '@/lib/api'; // Pastikan path ini benar

// --- IMPORTS KOMPONEN PENDUKUNG ---
// Jika file badge belum ada, Anda bisa menghapus import ini sementara
import ChatNotificationBadge from '@/components/ChatNotificationBadge';
import ForumNotificationBadge from '@/components/ForumNotificationBadge';
import LibraryNotificationBadge from '@/components/LibraryNotificationBadge'; 
import GlobalChatModal from '@/components/GlobalChatModal'; // [IMPORT PENTING UTK CHAT]

import { Bell, BookOpen, FileText, GraduationCap, MessageCircle, AlertCircle, Settings, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  // --- STATE MANAGEMENT ---
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false); // Untuk menu mobile/tablet jika diperlukan
  const [isInteraktifOpen, setIsInteraktifOpen] = useState(false); // Untuk menu mobile/tablet jika diperlukan
  
  // STATE KHUSUS CHAT
  const [isChatOpen, setIsChatOpen] = useState(false); 
  
  // STATE NOTIFIKASI
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // REFS UNTUK CLICK OUTSIDE
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // LOGIKA ROLE USER
  const canManageContent = user && (user.role === 'FACILITATOR' || user.role === 'SUPER_ADMIN');
  const isSuperAdmin = user && user.role === 'SUPER_ADMIN';

  // --- EFFECTS ---

  // 1. Load Notifikasi secara berkala
  useEffect(() => {
    if (user) {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 10000); // Poll setiap 10 detik
        return () => clearInterval(interval);
    }
  }, [user]);

  // 2. Click Outside Handler (Menutup dropdown saat klik di luar)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- HELPER FUNCTIONS ---

  const fetchNotifications = async () => {
      try {
          // Pastikan endpoint API ini sudah ada di backend Anda
          const list = await api('/api/notifications');
          setNotifications(list);
          const countRes = await api('/api/notifications/unread-count');
          setUnreadCount(countRes.count || 0);
      } catch (e) { console.error("Gagal load notif", e); }
  };

  const handleMarkAsRead = async (id: string, link: string) => {
      try {
          await api('/api/notifications/mark-read', { method: 'PATCH' });
          setIsNotifOpen(false);
          router.push(link);
          setTimeout(fetchNotifications, 1000); 
      } catch (e) { console.error(e); }
  };

  const handleLogout = () => {
    logout(); // Gunakan fungsi logout dari AuthProvider
    router.push('/login');
  };

  // --- RENDER ---
  return (
    <>
      <nav className="bg-white border-b shadow-sm sticky top-0 z-50 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* === KIRI: LOGO === */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                 {/* Gunakan Image jika ada, fallback ke Text */}
                 {/* <img src="/pmi-logo.png" alt="Logo" className="h-8 w-auto" /> */}
                 <span className="text-xl font-bold text-red-700 tracking-tight">PMI Humanis</span>
              </Link>
            </div>

            {/* === TENGAH: MENU NAVIGASI (Desktop) === */}
            {user && (
              <div className="hidden md:flex items-center space-x-4">
                
                {/* 1. Menu Dashboard */}
                <Link 
                  href="/dashboard" 
                  className={`px-3 py-2 text-sm font-medium transition-colors ${pathname === '/dashboard' ? 'text-red-700' : 'text-gray-600 hover:text-red-700'}`}
                >
                  Dashboard
                </Link>

                {/* 2. Menu Katalog Kelas */}
                <Link 
                  href="/courses" 
                  className={`px-3 py-2 text-sm font-medium transition-colors ${pathname?.startsWith('/courses') ? 'text-red-700' : 'text-gray-600 hover:text-red-700'}`}
                >
                  Katalog Kelas
                </Link>

                {/* 3. Dropdown Interaktif */}
                <div className="relative group py-4">
                  <button className={`px-3 py-2 text-sm font-medium flex items-center gap-1 transition-colors outline-none ${pathname?.startsWith('/forum') || pathname?.startsWith('/blog') ? 'text-red-700' : 'text-gray-600 group-hover:text-red-700'}`}>
                    Interaktif
                    {/* Badge Kecil di Menu jika ada notif forum */}
                    <div className="ml-1 relative transform scale-75"><ForumNotificationBadge /></div>
                    <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  {/* Dropdown Content */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50 pt-2">
                    <div className="bg-white rounded-xl overflow-hidden">
                      <Link href="/forum" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors">
                        <span>Forum Diskusi</span>
                        <div className="relative w-4 h-4 mr-2"><ForumNotificationBadge /></div>
                      </Link>
                      <Link href="/library" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-50">
                        <span>Perpustakaan Digital</span>
                        <div className="relative w-4 h-4 mr-2"><LibraryNotificationBadge /></div>
                      </Link>
                      <Link href="/blog" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-50">
                        Blog Relawan
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 4. Dropdown Pengelolaan (Hanya Admin/Fasilitator) */}
                {canManageContent && (
                  <div className="relative group py-4">
                    <button className={`px-3 py-2 text-sm font-medium flex items-center gap-1 transition-colors outline-none ${pathname?.startsWith('/admin') ? 'text-red-700' : 'text-gray-600 group-hover:text-red-700'}`}>
                      Pengelolaan
                      <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50 pt-2">
                      <div className="bg-white rounded-xl overflow-hidden py-1">
                        <Link href="/admin/courses?type=all" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 font-bold">📂 Semua Program</Link>
                        <Link href="/admin/courses?type=training" className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 border-t border-gray-50">🏢 Admin Pelatihan</Link>
                        <Link href="/admin/courses?type=course" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-t border-gray-50">💻 Admin Kursus</Link>
                        <Link href="/admin/blog" className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 border-t border-gray-50">📰 Kelola Blog</Link>
                        {isSuperAdmin && <Link href="/admin/users" className="block px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 border-t border-gray-50">👥 Admin Users</Link>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* === KANAN: ICONS & PROFILE === */}
            <div className="flex items-center gap-3">
              
              {!user ? (
                <Link href="/login" className="px-5 py-2 rounded-full text-sm font-bold bg-red-700 text-white hover:bg-red-800 transition-colors shadow-md">
                  Masuk / Daftar
                </Link>
              ) : (
                <>
                  {/* Icon CMS (Shortcut) */}
                  {canManageContent && (
                    <Link href="/admin/content" className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all hidden sm:block" title="Pengaturan CMS">
                      <Settings size={22} />
                    </Link>
                  )}

                  {/* NOTIFIKASI BELL */}
                  <div className="relative" ref={notifRef}>
                    <button 
                      onClick={() => setIsNotifOpen(!isNotifOpen)} 
                      className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all relative outline-none"
                    >
                      <Bell size={22} />
                      {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold h-4 min-w-[16px] flex items-center justify-center rounded-full border-2 border-white">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </button>

                    {/* Dropdown Notifikasi */}
                    {isNotifOpen && (
                      <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 origin-top-right">
                        <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
                          <h3 className="font-bold text-gray-800 text-sm">Notifikasi</h3>
                          <Link href="/notifications" className="text-xs text-red-700 hover:underline" onClick={() => setIsNotifOpen(false)}>Lihat Semua</Link>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <p className="p-6 text-center text-xs text-gray-400">Tidak ada notifikasi baru.</p>
                          ) : (
                            notifications.map((notif: any) => (
                              <div key={notif._id} onClick={() => handleMarkAsRead(notif._id, '#')} className={`px-4 py-3 border-b hover:bg-gray-50 cursor-pointer flex gap-3 ${!notif.isRead ? 'bg-red-50/40' : 'bg-white'}`}>
                                <div className="flex-shrink-0 mt-1">
                                  {/* Icon Logik Sederhana */}
                                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                    <Bell size={14} />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <p className={`text-xs text-gray-800 leading-snug ${!notif.isRead ? 'font-bold' : ''}`}>{notif.message}</p>
                                  <p className="text-[10px] text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</p>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* USER PROFILE DROPDOWN */}
                  <div className="relative" ref={profileRef}>
                    <button 
                      onClick={() => setIsProfileOpen(!isProfileOpen)} 
                      className="flex items-center gap-2 hover:bg-gray-50 p-1 pr-3 rounded-full transition-all border border-transparent hover:border-gray-200 outline-none"
                    >
                      <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold overflow-hidden border-2 border-white shadow-sm">
                          {user.avatarUrl ? (
                            <img src={getImageUrl(user.avatarUrl)} alt="Avatar" className="w-full h-full object-cover" />
                          ) : (
                            user.name?.charAt(0).toUpperCase() || 'U'
                          )}
                        </div>
                        {/* Badge Global di Avatar untuk Chat */}
                        <div className="absolute -top-1 -right-1"><ChatNotificationBadge /></div>
                      </div>
                      <span className="text-sm font-bold text-gray-700 hidden md:block max-w-[100px] truncate">
                        {user.name?.split(' ')[0]}
                      </span>
                    </button>

                    {/* Dropdown Menu Profil */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 origin-top-right">
                        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                          <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700" onClick={() => setIsProfileOpen(false)}>
                            <User size={16} /> Profil Saya
                          </Link>
                          
                          {/* --- TOMBOL UNTUK MEMBUKA CHAT MODAL --- */}
                          <button 
                            onClick={() => { setIsProfileOpen(false); setIsChatOpen(true); }} 
                            className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 transition-colors"
                          >
                            <MessageCircle size={16} />
                            <span className="flex-1">Pesan Masuk</span>
                            <ChatNotificationBadge />
                          </button>
                          {/* --------------------------------------- */}

                          <div className="border-t my-1"></div>
                          <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                            <LogOut size={16} /> Keluar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- GLOBAL CHAT MODAL --- */}
      {/* Dirender di sini agar muncul di atas konten lain saat isChatOpen = true */}
      {isChatOpen && (
        <GlobalChatModal 
          onClose={() => setIsChatOpen(false)} 
        />
      )}
    </>
  );
}
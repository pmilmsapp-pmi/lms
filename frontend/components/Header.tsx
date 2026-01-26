// // // 'use client';

// // // import Link from 'next/link';
// // // import { useAuth } from '@/lib/AuthProvider';
// // // import { useState, useEffect, useRef } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // import { getImageUrl, api } from '@/lib/api';

// // // // Import Badge Komponen
// // // import ChatNotificationBadge from '@/components/ChatNotificationBadge';
// // // import ForumNotificationBadge from '@/components/ForumNotificationBadge';
// // // import LibraryNotificationBadge from '@/components/LibraryNotificationBadge'; 
// // // import BlogNotificationBadge from '@/components/BlogNotificationBadge'; 
// // // import GlobalChatModal from '@/components/GlobalChatModal'; 

// // // import { Bell, MessageCircle, Settings, User as UserIcon, LogOut } from 'lucide-react'; 

// // // export default function Header() {
// // //   const { user, logout } = useAuth();
// // //   const router = useRouter();
  
// // //   // STATE
// // //   const [isProfileOpen, setIsProfileOpen] = useState(false);
// // //   const [isNotifOpen, setIsNotifOpen] = useState(false);
// // //   const [isChatOpen, setIsChatOpen] = useState(false); 
  
// // //   const [notifications, setNotifications] = useState<any[]>([]);
// // //   const [unreadCount, setUnreadCount] = useState(0);

// // //   const notifRef = useRef<HTMLDivElement>(null);
// // //   const profileRef = useRef<HTMLDivElement>(null);

// // //   // [FIX] Logika Role yang Aman (karena AuthProvider sudah diupdate)
// // //   // Pastikan role-role ini sesuai dengan enum di backend
// // //   const canManageContent = user && ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'].includes(user.role);
// // //   const isSuperAdmin = user && user.role === 'SUPER_ADMIN';

// // //   // --- FETCH DATA (POLLING) ---
// // //   const fetchNotifications = async () => {
// // //       try {
// // //           const list = await api('/api/notifications'); 
// // //           if (Array.isArray(list)) {
// // //               list.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
// // //               setNotifications(list);
// // //           }
// // //           const countRes = await api('/api/notifications/unread-count');
// // //           setUnreadCount(countRes.count || 0);
// // //       } catch (e) { console.error("Gagal load notif", e); }
// // //   };

// // //   useEffect(() => {
// // //     if (user) {
// // //         fetchNotifications();
// // //         const interval = setInterval(fetchNotifications, 10000);
// // //         return () => clearInterval(interval);
// // //     }
// // //   }, [user]);

// // //   // Click Outside Handler
// // //   useEffect(() => {
// // //     function handleClickOutside(event: MouseEvent) {
// // //       if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
// // //       if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
// // //     }
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   const handleMarkAsRead = async (id: string, link: string) => {
// // //       setIsNotifOpen(false);
      
// // //       if (!id) {
// // //           setUnreadCount(0);
// // //           setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
// // //       } else {
// // //           setUnreadCount(prev => Math.max(0, prev - 1));
// // //           setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
// // //       }

// // //       try {
// // //           if (id) {
// // //             await api(`/api/notifications/${id}/read`, { method: 'PATCH' });
// // //           } else {
// // //             await api('/api/notifications/mark-read', { method: 'PATCH' });
// // //           }
          
// // //           window.dispatchEvent(new Event('notification-update'));
// // //           router.push(link);
// // //       } catch (e) { console.error(e); }
// // //   };

// // //   const handleLogout = () => {
// // //     logout();
// // //     // Tidak perlu router.push karena logout di AuthProvider sudah handle redirect
// // //   };

// // //   return (
// // //     <>
// // //       <header className="bg-white border-b sticky top-0 z-50 shadow-sm font-sans">
// // //         <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
          
// // //           {/* LOGO */}
// // //           <div className="flex-shrink-0 z-20">
// // //             <Link href="/" className="flex items-center gap-3">
// // //               <img src="/pmi-logo.png" alt="Logo PMI" className="h-10 w-auto" />
// // //               <img src="/humanis.png" alt="Humanis" className="h-8 w-auto object-contain hidden md:block" />
// // //             </Link>
// // //           </div>

// // //           {/* MENU TENGAH */}
// // //           {user && (
// // //             <nav className="hidden md:flex items-center gap-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
// // //                 <Link href="/courses" className="px-3 py-2 text-gray-700 hover:text-red-700 font-medium transition-colors">Katalog Kelas</Link>
                
// // //                 {/* MENU INTERAKTIF */}
// // //                 <div className="relative group py-4">
// // //                   <button className="px-3 py-2 text-gray-700 group-hover:text-red-700 font-medium flex items-center gap-1 transition-colors outline-none relative">
// // //                     Interaktif
// // //                     <div className="ml-1 relative transform scale-75"><ForumNotificationBadge /></div>
// // //                     <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
// // //                   </button>
// // //                   <div className="absolute top-full left-0 w-full h-2"></div>
// // //                   <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out origin-top z-50">
// // //                     <div className="py-1">
// // //                       <Link href="/forum" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors">
// // //                           <span>Forum Diskusi</span>
// // //                           <div className="relative w-4 h-4 mr-2"><ForumNotificationBadge /></div>
// // //                       </Link>
// // //                       <Link href="/library" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-50">
// // //                           <span>Perpustakaan Digital</span>
// // //                           <div className="relative w-4 h-4 mr-2"><LibraryNotificationBadge /></div>
// // //                       </Link>
// // //                       <Link href="/blog" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-50">
// // //                           <span>Blog Relawan</span>
// // //                           <div className="relative w-4 h-4 mr-2"><BlogNotificationBadge /></div>
// // //                       </Link>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* MENU PENGELOLAAN (ADMIN/FASILITATOR) */}
// // //                 {canManageContent && (
// // //                   <div className="relative group py-4">
// // //                     <button className="px-3 py-2 text-gray-700 group-hover:text-red-700 font-medium flex items-center gap-1 transition-colors outline-none">
// // //                       Pengelolaan <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
// // //                     </button>
// // //                     <div className="absolute top-full left-0 w-full h-2"></div>
// // //                     <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out origin-top z-50">
// // //                       <div className="py-1">
// // //                         <Link href="/admin/courses?type=all" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 font-bold">📂 Semua Program</Link>
// // //                         <Link href="/admin/courses?type=training" className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 border-t border-gray-50">🏢 Admin Pelatihan</Link>
// // //                         <Link href="/admin/courses?type=course" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-t border-gray-50">💻 Admin Kursus</Link>
// // //                         <Link href="/admin/library" className="block px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 border-t border-gray-50">📚 Kelola Pustaka</Link>
// // //                         <Link href="/admin/blog" className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 border-t border-gray-50">📰 Kelola Blog</Link>
                        
// // //                         {isSuperAdmin && <Link href="/admin/users" className="block px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 border-t border-gray-50">👥 Admin Users</Link>}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //             </nav>
// // //           )}

// // //           {/* ICON KANAN (CHAT, NOTIF, PROFILE) */}
// // //           <div className="flex items-center gap-3 flex-shrink-0 z-20">
// // //             {!user ? (
// // //               <Link href="/login" className="px-6 py-2 rounded-full text-sm bg-red-700 text-white hover:bg-red-800 transition-colors shadow-md font-bold">Masuk / Daftar</Link>
// // //             ) : (
// // //               <>
// // //                 {/* 1. GLOBAL CHAT BUTTON */}
// // //                 <button 
// // //                   onClick={() => setIsChatOpen(true)} 
// // //                   className={`p-2 rounded-full transition-all relative ${isChatOpen ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:text-red-700 hover:bg-gray-100'}`}
// // //                   title="Global Chat"
// // //                   aria-label="Buka Global Chat"
// // //                 >
// // //                   <MessageCircle size={24} />
// // //                   <span className="absolute top-1 right-1"><ChatNotificationBadge /></span>
// // //                 </button>

// // //                 {/* 2. CMS LINK (Short) */}
// // //                 {canManageContent && (
// // //                   <Link href="/admin/content" className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all" title="Pengaturan Tampilan (CMS)" aria-label="Pengaturan CMS">
// // //                       <Settings size={24} />
// // //                   </Link>
// // //                 )}

// // //                 {/* 3. NOTIFICATION BELL */}
// // //                 <div className="relative" ref={notifRef}>
// // //                   <button 
// // //                     onClick={() => setIsNotifOpen(!isNotifOpen)} 
// // //                     className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all relative"
// // //                     aria-label="Lihat Notifikasi"
// // //                   >
// // //                       <Bell size={24} />
// // //                       {unreadCount > 0 && <span className="absolute top-1 right-1 bg-red-600 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border-2 border-white animate-bounce">{unreadCount > 9 ? '9+' : unreadCount}</span>}
// // //                   </button>
// // //                   {isNotifOpen && (
// // //                       <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-scale-in origin-top-right">
// // //                           <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center"><h3 className="font-bold text-gray-800 text-sm">Notifikasi</h3><Link href="/notifications" className="text-xs text-red-700 hover:underline" onClick={() => handleMarkAsRead('', '/notifications')}>Lihat Semua</Link></div>
// // //                           <div className="max-h-80 overflow-y-auto custom-scrollbar">
// // //                               {notifications.length === 0 ? (<p className="p-6 text-center text-xs text-gray-400">Tidak ada notifikasi baru.</p>) : (
// // //                                   notifications.map((notif: any) => {
// // //                                       let href = '#';
// // //                                       if (notif.type === 'course') href = notif.topic ? `/courses/${notif.topic}` : `/courses`;
// // //                                       else if (notif.type === 'blog') href = `/blog/${notif.topic}`;
// // //                                       else if (notif.type === 'approval') href = notif.message.toLowerCase().includes('cerita') ? `/admin/blog` : `/forum?status=pending`;
// // //                                       else if (notif.type === 'reply' || notif.type === 'mention') href = `/forum/${notif.topic}`;

// // //                                       return (
// // //                                           <div key={notif._id} onClick={() => handleMarkAsRead(notif._id, href)} className={`px-4 py-3 border-b hover:bg-gray-50 cursor-pointer flex gap-3 ${!notif.isRead ? 'bg-red-50/30' : 'bg-white'}`}>
// // //                                               <div className="flex-1"><p className={`text-xs text-gray-800 leading-snug ${!notif.isRead ? 'font-bold' : ''}`}>{notif.message}</p><p className="text-[10px] text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</p></div>
// // //                                               {!notif.isRead && <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>}
// // //                                           </div>
// // //                                       );
// // //                                   })
// // //                               )}
// // //                           </div>
// // //                       </div>
// // //                   )}
// // //                 </div>

// // //                 {/* 4. PROFILE */}
// // //                 <div className="relative" ref={profileRef}>
// // //                   <button 
// // //                     onClick={() => setIsProfileOpen(!isProfileOpen)} 
// // //                     className="flex items-center gap-3 hover:bg-gray-50 p-1 pr-3 rounded-full transition-all border border-transparent hover:border-gray-200 outline-none"
// // //                     aria-label="Menu Profil"
// // //                   >
// // //                     <div className="relative">
// // //                         <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold overflow-hidden border-2 border-white shadow-sm">
// // //                         {user.avatarUrl ? (<img src={getImageUrl(user.avatarUrl)} alt="Avatar" className="w-full h-full object-cover" />) : ( user.name?.charAt(0).toUpperCase() || 'U' )}
// // //                         </div>
// // //                         <div className="absolute -top-1 -right-1"><ChatNotificationBadge /></div> 
// // //                     </div>
// // //                     <span className="text-sm font-bold text-gray-700 hidden md:block max-w-[100px] truncate">{user.name?.split(' ')[0]}</span>
// // //                   </button>
// // //                   {isProfileOpen && (
// // //                     <div className="absolute right-0 mt-3 w-64 bg-white border rounded-xl shadow-xl z-20 py-2 animate-scale-in origin-top-right">
// // //                         <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50"><p className="text-sm font-bold text-gray-900 truncate">{user.name}</p><p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p></div>
// // //                         <div className="py-1">
// // //                           <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700" onClick={() => setIsProfileOpen(false)}>
// // //                             <UserIcon size={16}/> Profil Saya
// // //                           </Link>
// // //                           <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700" onClick={() => setIsProfileOpen(false)}>
// // //                             <span>📜</span> Histori Transaksi
// // //                           </Link>
// // //                           <button onClick={() => { setIsProfileOpen(false); setIsChatOpen(true); }} className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 transition-colors">
// // //                             <MessageCircle size={16}/> <span className="flex-1">Pesan Masuk</span><ChatNotificationBadge />
// // //                           </button>
// // //                           <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-gray-50 mt-1">
// // //                             <LogOut size={16}/> Keluar
// // //                           </button>
// // //                         </div>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </header>
// // //       {isChatOpen && <GlobalChatModal onClose={() => setIsChatOpen(false)} />}
// // //     </>
// // //   );
// // // }



// // 'use client';

// // import Link from 'next/link';
// // import { useAuth } from '@/lib/AuthProvider';
// // import { useState, useEffect, useRef } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { getImageUrl, api } from '@/lib/api';

// // // Import Badge Komponen
// // import ChatNotificationBadge from '@/components/ChatNotificationBadge';
// // import ForumNotificationBadge from '@/components/ForumNotificationBadge';
// // import LibraryNotificationBadge from '@/components/LibraryNotificationBadge'; 
// // import BlogNotificationBadge from '@/components/BlogNotificationBadge'; 
// // import AdminNotificationBell from '@/components/admin/AdminNotificationBell'; // [BARU] Import Lonceng Admin
// // import GlobalChatModal from '@/components/GlobalChatModal'; 

// // import { Bell, MessageCircle, Settings, User as UserIcon, LogOut } from 'lucide-react'; 

// // export default function Header() {
// //   const { user, logout } = useAuth();
// //   const router = useRouter();
  
// //   // STATE
// //   const [isProfileOpen, setIsProfileOpen] = useState(false);
// //   const [isNotifOpen, setIsNotifOpen] = useState(false);
// //   const [isChatOpen, setIsChatOpen] = useState(false); 
  
// //   const [notifications, setNotifications] = useState<any[]>([]);
// //   const [unreadCount, setUnreadCount] = useState(0);

// //   const notifRef = useRef<HTMLDivElement>(null);
// //   const profileRef = useRef<HTMLDivElement>(null);

// //   // [LOGIC ROLE]
// //   const isAdminOrSuper = user && ['ADMIN', 'SUPER_ADMIN'].includes(user.role);
// //   const canManageContent = user && ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'].includes(user.role);
// //   const isSuperAdmin = user && user.role === 'SUPER_ADMIN';

// //   // --- FETCH NOTIFIKASI USER BIASA (NON-ADMIN) ---
// //   // Admin pakai komponen AdminNotificationBell terpisah biar rapi
// //   const fetchUserNotifications = async () => {
// //       if (isAdminOrSuper) return; // Admin skip ini
// //       try {
// //           const list = await api('/api/notifications'); 
// //           if (Array.isArray(list)) {
// //               list.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
// //               setNotifications(list);
// //           }
// //           const countRes = await api('/api/notifications/unread-count');
// //           setUnreadCount(countRes.count || 0);
// //       } catch (e) { 
// //           // Silent fail
// //       }
// //   };

// //   useEffect(() => {
// //     if (user && !isAdminOrSuper) {
// //         fetchUserNotifications();
// //         const interval = setInterval(fetchUserNotifications, 15000); // Polling lebih santai (15s)
// //         return () => clearInterval(interval);
// //     }
// //   }, [user, isAdminOrSuper]);

// //   // Click Outside Handler
// //   useEffect(() => {
// //     function handleClickOutside(event: MouseEvent) {
// //       if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
// //       if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
// //     }
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const handleMarkAsRead = async (id: string, link: string) => {
// //       setIsNotifOpen(false);
      
// //       // Optimistic UI Update
// //       if (!id) {
// //           setUnreadCount(0);
// //           setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
// //       } else {
// //           setUnreadCount(prev => Math.max(0, prev - 1));
// //           setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
// //       }

// //       try {
// //           if (id) {
// //             await api(`/api/notifications/${id}/read`, { method: 'PATCH' });
// //           } else {
// //             await api('/api/notifications/mark-read', { method: 'PATCH' });
// //           }
// //           router.push(link);
// //       } catch (e) { console.error(e); }
// //   };

// //   const handleLogout = () => {
// //     logout();
// //   };

// //   return (
// //     <>
// //       <header className="bg-white border-b sticky top-0 z-50 shadow-sm font-sans">
// //         <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
          
// //           {/* LOGO */}
// //           <div className="flex-shrink-0 z-20">
// //             <Link href="/" className="flex items-center gap-3">
// //               <img src="/pmi-logo.png" alt="Logo PMI" className="h-10 w-auto" />
// //               <img src="/humanis.png" alt="Humanis" className="h-8 w-auto object-contain hidden md:block" />
// //             </Link>
// //           </div>

// //           {/* MENU TENGAH */}
// //           {user && (
// //             <nav className="hidden md:flex items-center gap-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
// //                 <Link href="/courses" className="px-3 py-2 text-gray-700 hover:text-red-700 font-medium transition-colors">Katalog Kelas</Link>
                
// //                 {/* MENU INTERAKTIF */}
// //                 <div className="relative group py-4">
// //                   <button className="px-3 py-2 text-gray-700 group-hover:text-red-700 font-medium flex items-center gap-1 transition-colors outline-none relative">
// //                     Interaktif
// //                     <div className="ml-1 relative transform scale-75"><ForumNotificationBadge /></div>
// //                     <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
// //                   </button>
// //                   <div className="absolute top-full left-0 w-full h-2"></div>
// //                   <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out origin-top z-50">
// //                     <div className="py-1">
// //                       <Link href="/forum" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors">
// //                           <span>Forum Diskusi</span>
// //                           <div className="relative w-4 h-4 mr-2"><ForumNotificationBadge /></div>
// //                       </Link>
// //                       <Link href="/library" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-50">
// //                           <span>Perpustakaan Digital</span>
// //                           <div className="relative w-4 h-4 mr-2"><LibraryNotificationBadge /></div>
// //                       </Link>
// //                       <Link href="/blog" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-50">
// //                           <span>Blog Relawan</span>
// //                           <div className="relative w-4 h-4 mr-2"><BlogNotificationBadge /></div>
// //                       </Link>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* MENU PENGELOLAAN (ADMIN/FASILITATOR) */}
// //                 {canManageContent && (
// //                   <div className="relative group py-4">
// //                     <button className="px-3 py-2 text-gray-700 group-hover:text-red-700 font-medium flex items-center gap-1 transition-colors outline-none">
// //                       Pengelolaan <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
// //                     </button>
// //                     <div className="absolute top-full left-0 w-full h-2"></div>
// //                     <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out origin-top z-50">
// //                       <div className="py-1">
// //                         <Link href="/admin/courses?type=all" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 font-bold">📂 Semua Program</Link>
// //                         <Link href="/admin/courses?type=training" className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 border-t border-gray-50">🏢 Admin Pelatihan</Link>
// //                         <Link href="/admin/courses?type=course" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-t border-gray-50">💻 Admin Kursus</Link>
// //                         <Link href="/admin/library" className="block px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 border-t border-gray-50">📚 Kelola Pustaka</Link>
// //                         <Link href="/admin/blog" className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 border-t border-gray-50">📰 Kelola Blog</Link>
                        
// //                         {isSuperAdmin && <Link href="/admin/users" className="block px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 border-t border-gray-50">👥 Admin Users</Link>}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //             </nav>
// //           )}

// //           {/* ICON KANAN (CHAT, NOTIF, PROFILE) */}
// //           <div className="flex items-center gap-3 flex-shrink-0 z-20">
// //             {!user ? (
// //               <Link href="/login" className="px-6 py-2 rounded-full text-sm bg-red-700 text-white hover:bg-red-800 transition-colors shadow-md font-bold">Masuk / Daftar</Link>
// //             ) : (
// //               <>
// //                 {/* 1. GLOBAL CHAT BUTTON */}
// //                 <button 
// //                   onClick={() => setIsChatOpen(true)} 
// //                   className={`p-2 rounded-full transition-all relative ${isChatOpen ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:text-red-700 hover:bg-gray-100'}`}
// //                   title="Global Chat"
// //                   aria-label="Buka Global Chat"
// //                 >
// //                   <MessageCircle size={24} />
// //                   <span className="absolute top-1 right-1"><ChatNotificationBadge /></span>
// //                 </button>

// //                 {/* 2. CMS LINK (Short) - Admin Only */}
// //                 {canManageContent && (
// //                   <Link href="/admin/content" className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all" title="Pengaturan Tampilan (CMS)" aria-label="Pengaturan CMS">
// //                       <Settings size={24} />
// //                   </Link>
// //                 )}

// //                 {/* 3. NOTIFICATION BELL (LOGIKA PENTING) */}
// //                 {/* Jika Admin -> Pakai AdminNotificationBell */}
// //                 {/* Jika User Biasa -> Pakai Lonceng Biasa */}
// //                 {isAdminOrSuper ? (
// //                     <AdminNotificationBell /> 
// //                 ) : (
// //                     <div className="relative" ref={notifRef}>
// //                       <button 
// //                         onClick={() => setIsNotifOpen(!isNotifOpen)} 
// //                         className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all relative"
// //                         aria-label="Lihat Notifikasi"
// //                       >
// //                           <Bell size={24} />
// //                           {unreadCount > 0 && <span className="absolute top-1 right-1 bg-red-600 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border-2 border-white animate-bounce">{unreadCount > 9 ? '9+' : unreadCount}</span>}
// //                       </button>
                      
// //                       {isNotifOpen && (
// //                           <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-scale-in origin-top-right">
// //                               <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center"><h3 className="font-bold text-gray-800 text-sm">Notifikasi</h3><Link href="/notifications" className="text-xs text-red-700 hover:underline" onClick={() => handleMarkAsRead('', '/notifications')}>Lihat Semua</Link></div>
// //                               <div className="max-h-80 overflow-y-auto custom-scrollbar">
// //                                   {notifications.length === 0 ? (<p className="p-6 text-center text-xs text-gray-400">Tidak ada notifikasi baru.</p>) : (
// //                                       notifications.map((notif: any) => {
// //                                           let href = '#';
// //                                           if (notif.type === 'course') href = notif.topic ? `/courses/${notif.topic}` : `/courses`;
// //                                           else if (notif.type === 'blog') href = `/blog/${notif.topic}`;
// //                                           else if (notif.type === 'approval') href = notif.message.toLowerCase().includes('cerita') ? `/admin/blog` : `/forum?status=pending`;
// //                                           else if (notif.type === 'reply' || notif.type === 'mention') href = `/forum/${notif.topic}`;

// //                                           return (
// //                                               <div key={notif._id} onClick={() => handleMarkAsRead(notif._id, href)} className={`px-4 py-3 border-b hover:bg-gray-50 cursor-pointer flex gap-3 ${!notif.isRead ? 'bg-red-50/30' : 'bg-white'}`}>
// //                                                   <div className="flex-1"><p className={`text-xs text-gray-800 leading-snug ${!notif.isRead ? 'font-bold' : ''}`}>{notif.message}</p><p className="text-[10px] text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</p></div>
// //                                                   {!notif.isRead && <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>}
// //                                               </div>
// //                                           );
// //                                       })
// //                                   )}
// //                               </div>
// //                           </div>
// //                       )}
// //                     </div>
// //                 )}

// //                 {/* 4. PROFILE */}
// //                 <div className="relative" ref={profileRef}>
// //                   <button 
// //                     onClick={() => setIsProfileOpen(!isProfileOpen)} 
// //                     className="flex items-center gap-3 hover:bg-gray-50 p-1 pr-3 rounded-full transition-all border border-transparent hover:border-gray-200 outline-none"
// //                     aria-label="Menu Profil"
// //                   >
// //                     <div className="relative">
// //                         <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold overflow-hidden border-2 border-white shadow-sm">
// //                         {user.avatarUrl ? (<img src={getImageUrl(user.avatarUrl)} alt="Avatar" className="w-full h-full object-cover" />) : ( user.name?.charAt(0).toUpperCase() || 'U' )}
// //                         </div>
// //                         {/* Jika User Biasa, Chat badge muncul di profil juga untuk notifikasi */}
// //                         {!isAdminOrSuper && <div className="absolute -top-1 -right-1"><ChatNotificationBadge /></div>}
// //                     </div>
// //                     <span className="text-sm font-bold text-gray-700 hidden md:block max-w-[100px] truncate">{user.name?.split(' ')[0]}</span>
// //                   </button>
// //                   {isProfileOpen && (
// //                     <div className="absolute right-0 mt-3 w-64 bg-white border rounded-xl shadow-xl z-20 py-2 animate-scale-in origin-top-right">
// //                         <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50"><p className="text-sm font-bold text-gray-900 truncate">{user.name}</p><p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p></div>
// //                         <div className="py-1">
// //                           <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700" onClick={() => setIsProfileOpen(false)}>
// //                             <UserIcon size={16}/> Profil Saya
// //                           </Link>
// //                           <button onClick={() => { setIsProfileOpen(false); setIsChatOpen(true); }} className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 transition-colors">
// //                             <MessageCircle size={16}/> <span className="flex-1">Pesan Masuk</span><ChatNotificationBadge />
// //                           </button>
// //                           <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-gray-50 mt-1">
// //                             <LogOut size={16}/> Keluar
// //                           </button>
// //                         </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </header>
// //       {isChatOpen && <GlobalChatModal onClose={() => setIsChatOpen(false)} />}
// //     </>
// //   );
// // }



// 'use client';

// import Link from 'next/link';
// import { useAuth } from '@/lib/AuthProvider';
// import { useState, useEffect, useRef } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import { getImageUrl, api } from '@/lib/api';

// // Import Badge Komponen
// import ChatNotificationBadge from '@/components/ChatNotificationBadge';
// import ForumNotificationBadge from '@/components/ForumNotificationBadge';
// import LibraryNotificationBadge from '@/components/LibraryNotificationBadge'; 
// import BlogNotificationBadge from '@/components/BlogNotificationBadge'; 
// import AdminNotificationBell from '@/components/admin/AdminNotificationBell';
// import GlobalChatModal from '@/components/GlobalChatModal'; 

// import { 
//   Bell, MessageCircle, Settings, User as UserIcon, LogOut, 
//   Menu, X, BookOpen, MessageSquare, FileText, LayoutDashboard, ChevronDown
// } from 'lucide-react'; 

// export default function Header() {
//   const { user, logout } = useAuth();
//   const router = useRouter();
//   const pathname = usePathname();
  
//   // STATE
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isNotifOpen, setIsNotifOpen] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false); 
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [unreadCount, setUnreadCount] = useState(0);

//   const notifRef = useRef<HTMLDivElement>(null);
//   const profileRef = useRef<HTMLDivElement>(null);

//   // [LOGIC ROLE]
//   const isAdminOrSuper = user && ['ADMIN', 'SUPER_ADMIN'].includes(user.role);
//   const canManageContent = user && ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'].includes(user.role);
//   const isSuperAdmin = user && user.role === 'SUPER_ADMIN';

//   // [FIX] DEFINISI HANDLE LOGOUT
//   const handleLogout = () => {
//       logout();
//       setIsMobileMenuOpen(false); // Tutup menu mobile jika terbuka
//       setIsProfileOpen(false);    // Tutup dropdown profil jika terbuka
//   };

//   // --- FETCH NOTIFIKASI USER BIASA (NON-ADMIN) ---
//   const fetchUserNotifications = async () => {
//       if (isAdminOrSuper) return; 
//       try {
//           const list = await api('/api/notifications'); 
//           if (Array.isArray(list)) {
//               list.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//               setNotifications(list);
//           }
//           const countRes = await api('/api/notifications/unread-count');
//           setUnreadCount(countRes.count || 0);
//       } catch (e) { /* Silent fail */ }
//   };

//   useEffect(() => {
//     if (user && !isAdminOrSuper) {
//         fetchUserNotifications();
//         const interval = setInterval(fetchUserNotifications, 15000); 
//         return () => clearInterval(interval);
//     }
//   }, [user, isAdminOrSuper]);

//   // Click Outside Handler
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
//       if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [pathname]);

//   const handleMarkAsRead = async (id: string, link: string) => {
//       setIsNotifOpen(false);
//       if (!id) {
//           setUnreadCount(0);
//           setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
//       } else {
//           setUnreadCount(prev => Math.max(0, prev - 1));
//           setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
//       }
//       try {
//           if (id) await api(`/api/notifications/${id}/read`, { method: 'PATCH' });
//           else await api('/api/notifications/mark-read', { method: 'PATCH' });
//           router.push(link);
//       } catch (e) { console.error(e); }
//   };

//   const isActive = (path: string) => pathname?.startsWith(path);

//   return (
//     <>
//       <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 font-sans transition-all duration-300">
//         <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
          
//           {/* 1. LEFT: LOGO & HAMBURGER */}
//           <div className="flex items-center gap-4 z-20">
//             <button 
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="lg:hidden p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//                 {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
//             </button>

//             <Link href="/" className="flex items-center gap-3 group">
//               <img src="/pmi-logo.png" alt="Logo PMI" className="h-10 w-auto group-hover:scale-105 transition-transform" />
//               <img src="/humanis.png" alt="Humanis" className="h-8 w-auto object-contain hidden md:block" />
//             </Link>
//           </div>

//           {/* 2. CENTER: DESKTOP MENU */}
//           {user && (
//             <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                 <Link 
//                     href="/courses" 
//                     className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${isActive('/courses') ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:text-red-700 hover:bg-gray-50'}`}
//                 >
//                     Katalog Kelas
//                 </Link>
                
//                 <div className="relative group">
//                   <button className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 transition-all outline-none ${isActive('/forum') || isActive('/library') || isActive('/blog') ? 'bg-red-50 text-red-700' : 'text-gray-600 group-hover:text-red-700 group-hover:bg-gray-50'}`}>
//                     Interaktif
//                     <div className="ml-1 relative transform scale-75"><ForumNotificationBadge /></div>
//                     <ChevronDown size={14} className="mt-0.5 transition-transform group-hover:rotate-180"/>
//                   </button>
//                   <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out z-50">
//                     <div className="bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden p-2">
//                       <Link href="/forum" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors">
//                           <div className="p-2 bg-red-100 text-red-600 rounded-lg"><MessageSquare size={16}/></div>
//                           <span className="flex-1">Forum Diskusi</span>
//                           <div className="scale-75"><ForumNotificationBadge /></div>
//                       </Link>
//                       <Link href="/library" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors">
//                           <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><BookOpen size={16}/></div>
//                           <span className="flex-1">Perpustakaan</span>
//                           <div className="scale-75"><LibraryNotificationBadge /></div>
//                       </Link>
//                       <Link href="/blog" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-xl transition-colors">
//                           <div className="p-2 bg-green-100 text-green-600 rounded-lg"><FileText size={16}/></div>
//                           <span className="flex-1">Blog Relawan</span>
//                           <div className="scale-75"><BlogNotificationBadge /></div>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>

//                 {canManageContent && (
//                   <div className="relative group">
//                     <button className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 transition-all outline-none ${isActive('/admin') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 group-hover:text-gray-900 group-hover:bg-gray-50'}`}>
//                       Pengelolaan <ChevronDown size={14} className="mt-0.5 transition-transform group-hover:rotate-180"/>
//                     </button>
//                     <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out z-50">
//                       <div className="bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden p-2">
//                         <Link href="/admin/courses?type=all" className="block px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-lg">📂 Semua Program</Link>
//                         <div className="my-1 border-t border-gray-100"></div>
//                         <Link href="/admin/courses?type=training" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">🏢 Admin Pelatihan</Link>
//                         <Link href="/admin/courses?type=course" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">💻 Admin Kursus</Link>
//                         <Link href="/admin/library" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">📚 Kelola Pustaka</Link>
//                         <Link href="/admin/blog" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">📰 Kelola Blog</Link>
//                         {isSuperAdmin && <Link href="/admin/users" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">👥 Admin Users</Link>}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//             </nav>
//           )}

//           {/* 3. RIGHT: ICONS & PROFILE */}
//           <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 z-20">
//             {!user ? (
//               <Link href="/login" className="px-6 py-2.5 rounded-full text-sm bg-red-600 text-white hover:bg-red-700 hover:shadow-lg transition-all font-bold tracking-wide">
//                   Masuk / Daftar
//               </Link>
//             ) : (
//               <>
//                 <button 
//                   onClick={() => setIsChatOpen(true)} 
//                   className={`p-2.5 rounded-full transition-all relative group ${isChatOpen ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'}`}
//                   title="Global Chat"
//                 >
//                   <MessageCircle size={22} className="group-hover:scale-110 transition-transform" />
//                   <span className="absolute top-1.5 right-1.5"><ChatNotificationBadge /></span>
//                 </button>

//                 {canManageContent && (
//                   <Link href="/admin/content" className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all hidden sm:block" title="CMS">
//                       <LayoutDashboard size={22} />
//                   </Link>
//                 )}

//                 {isAdminOrSuper ? (
//                     <AdminNotificationBell /> 
//                 ) : (
//                     <div className="relative" ref={notifRef}>
//                       <button 
//                         onClick={() => setIsNotifOpen(!isNotifOpen)} 
//                         className={`p-2.5 rounded-full transition-all relative group ${isNotifOpen ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'}`}
//                       >
//                           <Bell size={22} className="group-hover:swing" />
//                           {unreadCount > 0 && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white animate-pulse"></span>}
//                       </button>
                      
//                       {isNotifOpen && (
//                           <div className="absolute right-0 mt-4 w-80 sm:w-96 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 origin-top-right">
//                               <div className="px-5 py-4 border-b border-gray-50 flex justify-between items-center bg-white">
//                                   <h3 className="font-bold text-gray-900">Notifikasi</h3>
//                                   <Link href="/notifications" className="text-xs font-bold text-red-600 hover:text-red-800" onClick={() => handleMarkAsRead('', '/notifications')}>Tandai Semua</Link>
//                               </div>
//                               <div className="max-h-[400px] overflow-y-auto custom-scrollbar bg-gray-50/50">
//                                   {notifications.length === 0 ? (<div className="p-8 text-center text-gray-400 flex flex-col items-center gap-2"><Bell size={32} className="opacity-20"/><span className="text-xs">Belum ada notifikasi baru.</span></div>) : (
//                                       notifications.map((notif: any) => {
//                                           let href = '#';
//                                           if (notif.type === 'course') href = notif.topic ? `/courses/${notif.topic}` : `/courses`;
//                                           else if (notif.type === 'blog') href = `/blog/${notif.topic}`;
//                                           else if (notif.type === 'approval') href = notif.message.toLowerCase().includes('cerita') ? `/admin/blog` : `/forum?status=pending`;
//                                           else if (notif.type === 'reply' || notif.type === 'mention') href = `/forum/${notif.topic}`;

//                                           return (
//                                               <div key={notif._id} onClick={() => handleMarkAsRead(notif._id, href)} className={`px-5 py-4 border-b border-gray-100 cursor-pointer flex gap-4 transition-colors ${!notif.isRead ? 'bg-white hover:bg-gray-50' : 'bg-gray-50/50 hover:bg-gray-100'}`}>
//                                                   <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${!notif.isRead ? 'bg-red-500' : 'bg-transparent'}`}></div>
//                                                   <div className="flex-1">
//                                                       <p className={`text-sm text-gray-800 leading-snug ${!notif.isRead ? 'font-bold' : 'font-medium'}`}>{notif.message}</p>
//                                                       <p className="text-[10px] text-gray-400 mt-1.5 font-medium uppercase tracking-wide">{new Date(notif.createdAt).toLocaleDateString()} • {new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
//                                                   </div>
//                                               </div>
//                                           );
//                                       })
//                                   )}
//                               </div>
//                           </div>
//                       )}
//                     </div>
//                 )}

//                 <div className="relative" ref={profileRef}>
//                   <button 
//                     onClick={() => setIsProfileOpen(!isProfileOpen)} 
//                     className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
//                   >
//                     <div className="relative">
//                         <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center font-bold overflow-hidden shadow-md border-2 border-white">
//                         {user.avatarUrl ? (<img src={getImageUrl(user.avatarUrl)} alt="Avatar" className="w-full h-full object-cover" />) : ( user.name?.charAt(0).toUpperCase() || 'U' )}
//                         </div>
//                         {!isAdminOrSuper && <div className="absolute -bottom-0.5 -right-0.5 pointer-events-none"><ChatNotificationBadge /></div>}
//                     </div>
//                     <ChevronDown size={14} className={`text-gray-400 transition-transform hidden sm:block ${isProfileOpen ? 'rotate-180' : ''}`}/>
//                   </button>

//                   {isProfileOpen && (
//                     <div className="absolute right-0 mt-4 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 origin-top-right">
//                         <div className="px-6 py-4 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
//                             <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
//                             <p className="text-xs text-gray-500 truncate mt-0.5 font-medium">{user.email}</p>
//                             <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider mt-2 bg-red-50 inline-block px-2 py-0.5 rounded border border-red-100">{user.role}</p>
//                         </div>
//                         <div className="p-2 space-y-1">
//                           <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 rounded-xl transition-colors" onClick={() => setIsProfileOpen(false)}>
//                             <UserIcon size={18} className="text-gray-400"/> Profil Saya
//                           </Link>
//                           <button onClick={() => { setIsProfileOpen(false); setIsChatOpen(true); }} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 rounded-xl transition-colors">
//                             <MessageCircle size={18} className="text-gray-400"/> <span className="flex-1">Pesan Masuk</span><ChatNotificationBadge />
//                           </button>
//                           <div className="h-px bg-gray-100 my-1"></div>
//                           {/* [FIX] Gunakan handleLogout yang sudah didefinisikan */}
//                           <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors">
//                             <LogOut size={18}/> Keluar
//                           </button>
//                         </div>
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {isMobileMenuOpen && (
//             <div className="lg:hidden fixed inset-0 z-40 bg-white pt-20 px-6 animate-in slide-in-from-top-10 duration-200">
//                 <div className="flex flex-col space-y-6">
//                     <Link href="/courses" className="text-lg font-bold text-gray-800 pb-4 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>
//                         Katalog Kelas
//                     </Link>
                    
//                     <div className="space-y-4">
//                         <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Interaktif</p>
//                         <Link href="/forum" className="flex items-center gap-3 text-gray-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
//                             <MessageSquare size={20}/> Forum Diskusi <ForumNotificationBadge />
//                         </Link>
//                         <Link href="/library" className="flex items-center gap-3 text-gray-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
//                             <BookOpen size={20}/> Perpustakaan
//                         </Link>
//                         <Link href="/blog" className="flex items-center gap-3 text-gray-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
//                             <FileText size={20}/> Blog Relawan
//                         </Link>
//                     </div>

//                     {canManageContent && (
//                         <div className="space-y-4 pt-4 border-t border-gray-100">
//                             <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Pengelolaan</p>
//                             <Link href="/admin/dashboard" className="flex items-center gap-3 text-gray-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
//                                 <LayoutDashboard size={20}/> Dashboard Admin
//                             </Link>
//                         </div>
//                     )}

//                     {user && (
//                         <div className="pt-4 mt-auto pb-8 border-t border-gray-100">
//                             <button onClick={handleLogout} className="w-full flex items-center gap-3 text-red-600 font-bold">
//                                 <LogOut size={20}/> Keluar Aplikasi
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         )}
//       </header>
      
//       {isChatOpen && <GlobalChatModal onClose={() => setIsChatOpen(false)} />}
//     </>
//   );
// }



'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthProvider';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getImageUrl, api } from '@/lib/api';

// Import Badge Komponen
import ChatNotificationBadge from '@/components/ChatNotificationBadge';
import ForumNotificationBadge from '@/components/ForumNotificationBadge';
import LibraryNotificationBadge from '@/components/LibraryNotificationBadge'; 
import BlogNotificationBadge from '@/components/BlogNotificationBadge'; 
import AdminNotificationBell from '@/components/admin/AdminNotificationBell';
import GlobalChatModal from '@/components/GlobalChatModal'; 

import { 
  Bell, MessageCircle, Settings, User as UserIcon, LogOut, 
  Menu, X, BookOpen, MessageSquare, FileText, LayoutDashboard, ChevronDown
} from 'lucide-react'; 

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  // STATE
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // [LOGIC ROLE]
  const isAdminOrSuper = user && ['ADMIN', 'SUPER_ADMIN'].includes(user.role);
  const canManageContent = user && ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'].includes(user.role);
  const isSuperAdmin = user && user.role === 'SUPER_ADMIN';

  // [FIX] DEFINISI FUNGSI LOGOUT
  const handleLogout = () => {
      setIsMobileMenuOpen(false);
      setIsProfileOpen(false);
      logout();
  };

  // --- FETCH NOTIFIKASI ---
  const fetchUserNotifications = async () => {
      if (isAdminOrSuper) return; 
      try {
          const list = await api('/api/notifications'); 
          if (Array.isArray(list)) {
              list.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
              setNotifications(list);
          }
          const countRes = await api('/api/notifications/unread-count');
          setUnreadCount(countRes.count || 0);
      } catch (e) { /* Silent fail */ }
  };

  useEffect(() => {
    if (user && !isAdminOrSuper) {
        fetchUserNotifications();
        const interval = setInterval(fetchUserNotifications, 15000); 
        return () => clearInterval(interval);
    }
  }, [user, isAdminOrSuper]);

  // Click Outside Handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change & Lock Body Scroll
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const handleMarkAsRead = async (id: string, link: string) => {
      setIsNotifOpen(false);
      if (!id) {
          setUnreadCount(0);
          setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      } else {
          setUnreadCount(prev => Math.max(0, prev - 1));
          setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      }
      try {
          if (id) await api(`/api/notifications/${id}/read`, { method: 'PATCH' });
          else await api('/api/notifications/mark-read', { method: 'PATCH' });
          router.push(link);
      } catch (e) { console.error(e); }
  };

  const isActive = (path: string) => pathname?.startsWith(path);

  return (
    <>
      {/* [FIX] Z-INDEX ditingkatkan ke 100 agar selalu di atas Modal */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] font-sans transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
          
          {/* 1. LEFT: LOGO & HAMBURGER */}
          <div className="flex items-center gap-4 z-20">
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
                aria-label="Toggle Menu"
            >
                {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>

            <Link href="/" className="flex items-center gap-3 group">
              <img src="/pmi-logo.png" alt="Logo PMI" className="h-10 w-auto group-hover:scale-105 transition-transform" />
              <img src="/humanis.png" alt="Humanis" className="h-8 w-auto object-contain hidden md:block" />
            </Link>
          </div>

          {/* 2. CENTER: DESKTOP MENU */}
          {user && (
            <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Link 
                    href="/courses" 
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${isActive('/courses') ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:text-red-700 hover:bg-gray-50'}`}
                >
                    Katalog Kelas
                </Link>
                
                <div className="relative group">
                  <button className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 transition-all outline-none ${isActive('/forum') || isActive('/library') || isActive('/blog') ? 'bg-red-50 text-red-700' : 'text-gray-600 group-hover:text-red-700 group-hover:bg-gray-50'}`}>
                    Interaktif
                    <div className="ml-1 relative transform scale-75"><ForumNotificationBadge /></div>
                    <ChevronDown size={14} className="mt-0.5 transition-transform group-hover:rotate-180"/>
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out z-50">
                    <div className="bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden p-2">
                      <Link href="/forum" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors">
                          <div className="p-2 bg-red-100 text-red-600 rounded-lg"><MessageSquare size={16}/></div>
                          <span className="flex-1">Forum Diskusi</span>
                          <div className="scale-75"><ForumNotificationBadge /></div>
                      </Link>
                      <Link href="/library" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors">
                          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><BookOpen size={16}/></div>
                          <span className="flex-1">Perpustakaan</span>
                          <div className="scale-75"><LibraryNotificationBadge /></div>
                      </Link>
                      <Link href="/blog" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-xl transition-colors">
                          <div className="p-2 bg-green-100 text-green-600 rounded-lg"><FileText size={16}/></div>
                          <span className="flex-1">Blog Relawan</span>
                          <div className="scale-75"><BlogNotificationBadge /></div>
                      </Link>
                    </div>
                  </div>
                </div>

                {canManageContent && (
                  <div className="relative group">
                    <button className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 transition-all outline-none ${isActive('/admin') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 group-hover:text-gray-900 group-hover:bg-gray-50'}`}>
                      Pengelolaan <ChevronDown size={14} className="mt-0.5 transition-transform group-hover:rotate-180"/>
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out z-50">
                      <div className="bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden p-2">
                        <Link href="/admin/courses?type=all" className="block px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-lg">📂 Semua Program</Link>
                        <div className="my-1 border-t border-gray-100"></div>
                        <Link href="/admin/courses?type=training" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">🏢 Admin Pelatihan</Link>
                        <Link href="/admin/courses?type=course" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">💻 Admin Kursus</Link>
                        <Link href="/admin/library" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">📚 Kelola Pustaka</Link>
                        <Link href="/admin/blog" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">📰 Kelola Blog</Link>
                        {isSuperAdmin && <Link href="/admin/users" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">👥 Admin Users</Link>}
                      </div>
                    </div>
                  </div>
                )}
            </nav>
          )}

          {/* 3. RIGHT: ICONS & PROFILE */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 z-20">
            {!user ? (
              <Link href="/login" className="px-6 py-2.5 rounded-full text-sm bg-red-600 text-white hover:bg-red-700 hover:shadow-lg transition-all font-bold tracking-wide">
                  Masuk / Daftar
              </Link>
            ) : (
              <>
                <button 
                  onClick={() => setIsChatOpen(true)} 
                  className={`p-2.5 rounded-full transition-all relative group ${isChatOpen ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'}`}
                  title="Global Chat"
                >
                  <MessageCircle size={22} className="group-hover:scale-110 transition-transform" />
                  <span className="absolute top-1.5 right-1.5"><ChatNotificationBadge /></span>
                </button>

                {canManageContent && (
                  <Link href="/admin/content" className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all hidden sm:block" title="CMS">
                      <LayoutDashboard size={22} />
                  </Link>
                )}

                {isAdminOrSuper ? (
                    <AdminNotificationBell /> 
                ) : (
                    <div className="relative" ref={notifRef}>
                      <button 
                        onClick={() => setIsNotifOpen(!isNotifOpen)} 
                        className={`p-2.5 rounded-full transition-all relative group ${isNotifOpen ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'}`}
                      >
                          <Bell size={22} className="group-hover:swing" />
                          {unreadCount > 0 && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white animate-pulse"></span>}
                      </button>
                      
                      {isNotifOpen && (
                          <div className="absolute right-0 mt-4 w-80 sm:w-96 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 origin-top-right">
                              <div className="px-5 py-4 border-b border-gray-50 flex justify-between items-center bg-white">
                                  <h3 className="font-bold text-gray-900">Notifikasi</h3>
                                  <Link href="/notifications" className="text-xs font-bold text-red-600 hover:text-red-800" onClick={() => handleMarkAsRead('', '/notifications')}>Tandai Semua</Link>
                              </div>
                              <div className="max-h-[400px] overflow-y-auto custom-scrollbar bg-gray-50/50">
                                  {notifications.length === 0 ? (<div className="p-8 text-center text-gray-400 flex flex-col items-center gap-2"><Bell size={32} className="opacity-20"/><span className="text-xs">Belum ada notifikasi baru.</span></div>) : (
                                      notifications.map((notif: any) => {
                                          let href = '#';
                                          if (notif.type === 'course') href = notif.topic ? `/courses/${notif.topic}` : `/courses`;
                                          else if (notif.type === 'blog') href = `/blog/${notif.topic}`;
                                          else if (notif.type === 'approval') href = notif.message.toLowerCase().includes('cerita') ? `/admin/blog` : `/forum?status=pending`;
                                          else if (notif.type === 'reply' || notif.type === 'mention') href = `/forum/${notif.topic}`;

                                          return (
                                              <div key={notif._id} onClick={() => handleMarkAsRead(notif._id, href)} className={`px-5 py-4 border-b border-gray-100 cursor-pointer flex gap-4 transition-colors ${!notif.isRead ? 'bg-white hover:bg-gray-50' : 'bg-gray-50/50 hover:bg-gray-100'}`}>
                                                  <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${!notif.isRead ? 'bg-red-500' : 'bg-transparent'}`}></div>
                                                  <div className="flex-1">
                                                      <p className={`text-sm text-gray-800 leading-snug ${!notif.isRead ? 'font-bold' : 'font-medium'}`}>{notif.message}</p>
                                                      <p className="text-[10px] text-gray-400 mt-1.5 font-medium uppercase tracking-wide">{new Date(notif.createdAt).toLocaleDateString()} • {new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                                  </div>
                                              </div>
                                          );
                                      })
                                  )}
                              </div>
                          </div>
                      )}
                    </div>
                )}

                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)} 
                    className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
                  >
                    <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center font-bold overflow-hidden shadow-md border-2 border-white">
                        {user.avatarUrl ? (<img src={getImageUrl(user.avatarUrl)} alt="Avatar" className="w-full h-full object-cover" />) : ( user.name?.charAt(0).toUpperCase() || 'U' )}
                        </div>
                        {!isAdminOrSuper && <div className="absolute -bottom-0.5 -right-0.5 pointer-events-none"><ChatNotificationBadge /></div>}
                    </div>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform hidden sm:block ${isProfileOpen ? 'rotate-180' : ''}`}/>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-4 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 origin-top-right">
                        <div className="px-6 py-4 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
                            <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate mt-0.5 font-medium">{user.email}</p>
                            <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider mt-2 bg-red-50 inline-block px-2 py-0.5 rounded border border-red-100">{user.role}</p>
                        </div>
                        <div className="p-2 space-y-1">
                          <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 rounded-xl transition-colors" onClick={() => setIsProfileOpen(false)}>
                            <UserIcon size={18} className="text-gray-400"/> Profil Saya
                          </Link>
                          <button onClick={() => { setIsProfileOpen(false); setIsChatOpen(true); }} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 rounded-xl transition-colors">
                            <MessageCircle size={18} className="text-gray-400"/> <span className="flex-1">Pesan Masuk</span><ChatNotificationBadge />
                          </button>
                          <div className="h-px bg-gray-100 my-1"></div>
                          <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                            <LogOut size={18}/> Keluar
                          </button>
                        </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* 4. [FIX] MOBILE MENU OVERLAY (Z-INDEX 90 agar di atas Modal background tapi di bawah Header) */}
        {isMobileMenuOpen && (
            <div className="lg:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white z-[90] overflow-y-auto animate-in slide-in-from-top-5 duration-200 border-t border-gray-100">
                <div className="flex flex-col p-6 space-y-6 pb-20">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold border border-red-200">
                            {user?.avatarUrl ? <img src={getImageUrl(user.avatarUrl)} className="w-full h-full rounded-full object-cover"/> : user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase().replace('_', ' ')}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Link href="/courses" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 text-gray-700 font-bold hover:bg-red-50 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>
                            <BookOpen size={20}/> Katalog Kelas
                        </Link>
                    </div>
                    
                    <div className="space-y-3">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Interaktif</p>
                        <Link href="/forum" className="flex items-center gap-3 px-4 py-2 text-gray-600 font-medium hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>
                            <MessageSquare size={20}/> Forum Diskusi <ForumNotificationBadge />
                        </Link>
                        <Link href="/library" className="flex items-center gap-3 px-4 py-2 text-gray-600 font-medium hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>
                            <BookOpen size={20}/> Perpustakaan
                        </Link>
                        <Link href="/blog" className="flex items-center gap-3 px-4 py-2 text-gray-600 font-medium hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>
                            <FileText size={20}/> Blog Relawan
                        </Link>
                    </div>

                    {canManageContent && (
                        <div className="space-y-3 pt-2 border-t border-gray-100">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-2 mt-4">Pengelolaan</p>
                            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-gray-600 font-medium hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>
                                <LayoutDashboard size={20}/> Dashboard Admin
                            </Link>
                        </div>
                    )}

                    {user && (
                        <div className="pt-4 mt-auto">
                            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors">
                                <LogOut size={20}/> Keluar Aplikasi
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )}
      </header>
      
      {isChatOpen && <GlobalChatModal onClose={() => setIsChatOpen(false)} />}
    </>
  );
}
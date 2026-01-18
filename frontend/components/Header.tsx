
// // // // // 'use client';

// // // // // import Link from 'next/link';
// // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // import { useState, useEffect, useRef } from 'react';
// // // // // import { useRouter } from 'next/navigation';
// // // // // import { getImageUrl, api } from '@/lib/api';
// // // // // import ChatNotificationBadge from '@/components/ChatNotificationBadge';
// // // // // import ForumNotificationBadge from '@/components/ForumNotificationBadge';
// // // // // import LibraryNotificationBadge from '@/components/LibraryNotificationBadge'; 
// // // // // import GlobalChatModal from '@/components/GlobalChatModal'; // [IMPORT BARU]
// // // // // import { Bell, BookOpen, FileText, GraduationCap, MessageCircle, AlertCircle } from 'lucide-react';

// // // // // export default function Header() {
// // // // //   const { user, logout } = useAuth();
// // // // //   const router = useRouter();
  
// // // // //   // STATE
// // // // //   const [isProfileOpen, setIsProfileOpen] = useState(false);
// // // // //   const [isNotifOpen, setIsNotifOpen] = useState(false);
// // // // //   const [isChatOpen, setIsChatOpen] = useState(false); // [STATE BARU UNTUK MODAL]
  
// // // // //   const [notifications, setNotifications] = useState<any[]>([]);
// // // // //   const [unreadCount, setUnreadCount] = useState(0);

// // // // //   const notifRef = useRef<HTMLDivElement>(null);
// // // // //   const profileRef = useRef<HTMLDivElement>(null);

// // // // //   const canManageContent = user && (user.role === 'FACILITATOR' || user.role === 'SUPER_ADMIN');
// // // // //   const isSuperAdmin = user && user.role === 'SUPER_ADMIN';

// // // // //   // ... (Effect Load Notification Tetap Sama) ... 
// // // // //   useEffect(() => {
// // // // //     if (user) {
// // // // //         fetchNotifications();
// // // // //         const interval = setInterval(fetchNotifications, 10000);
// // // // //         return () => clearInterval(interval);
// // // // //     }
// // // // //   }, [user]);

// // // // //   // Click Outside Handler
// // // // //   useEffect(() => {
// // // // //     function handleClickOutside(event: MouseEvent) {
// // // // //       if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
// // // // //       if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
// // // // //     }
// // // // //     document.addEventListener("mousedown", handleClickOutside);
// // // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // // //   }, []);

// // // // //   const fetchNotifications = async () => {
// // // // //       try {
// // // // //           const list = await api('/api/notifications');
// // // // //           setNotifications(list);
// // // // //           const countRes = await api('/api/notifications/unread-count');
// // // // //           setUnreadCount(countRes.count || 0);
// // // // //       } catch (e) { console.error("Gagal load notif", e); }
// // // // //   };

// // // // //   const handleMarkAsRead = async (id: string, link: string) => {
// // // // //       try {
// // // // //           await api('/api/notifications/mark-read', { method: 'PATCH' });
// // // // //           setIsNotifOpen(false);
// // // // //           router.push(link);
// // // // //           setTimeout(fetchNotifications, 1000); 
// // // // //       } catch (e) { console.error(e); }
// // // // //   };

// // // // //   const handleLogout = () => {
// // // // //     logout();
// // // // //     router.push('/login');
// // // // //   };

// // // // //   return (
// // // // //     <>
// // // // //       <header className="bg-white border-b sticky top-0 z-50 shadow-sm font-sans">
// // // // //         <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
          
// // // // //           {/* ... (LOGO & NAVIGASI TENGAH TETAP SAMA) ... */}
// // // // //           <div className="flex-shrink-0 z-20">
// // // // //             <Link href="/" className="flex items-center gap-3">
// // // // //               <img src="/pmi-logo.png" alt="Logo PMI" className="h-10 w-auto" />
// // // // //               <img src="/humanis.png" alt="Humanis" className="h-8 w-auto object-contain hidden md:block" />
// // // // //             </Link>
// // // // //           </div>

// // // // //           {user && (
// // // // //             <nav className="hidden md:flex items-center gap-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
// // // // //                 <Link href="/courses" className="px-3 py-2 text-gray-700 hover:text-red-700 font-medium transition-colors">Katalog Kelas</Link>
// // // // //                 {/* ... (Menu Interaktif & Pengelolaan Tetap Sama) ... */}
// // // // //                 <div className="relative group py-4">
// // // // //                   <button className="px-3 py-2 text-gray-700 group-hover:text-red-700 font-medium flex items-center gap-1 transition-colors outline-none relative">
// // // // //                     Interaktif
// // // // //                     <div className="ml-1 relative transform scale-75"><ForumNotificationBadge /></div>
// // // // //                     <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
// // // // //                   </button>
// // // // //                   <div className="absolute top-full left-0 w-full h-2"></div>
// // // // //                   <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out origin-top z-50">
// // // // //                     <div className="py-1">
// // // // //                       <Link href="/forum" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"><span>Forum Diskusi</span><div className="relative w-4 h-4 mr-2"><ForumNotificationBadge /></div></Link>
// // // // //                       <Link href="/library" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-50"><span>Perpustakaan Digital</span><div className="relative w-4 h-4 mr-2"><LibraryNotificationBadge /></div></Link>
// // // // //                       <Link href="/blog" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-50">Blog Relawan</Link>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 {canManageContent && (
// // // // //                   <div className="relative group py-4">
// // // // //                     <button className="px-3 py-2 text-gray-700 group-hover:text-red-700 font-medium flex items-center gap-1 transition-colors outline-none">
// // // // //                       Pengelolaan <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
// // // // //                     </button>
// // // // //                     <div className="absolute top-full left-0 w-full h-2"></div>
// // // // //                     <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out origin-top z-50">
// // // // //                       <div className="py-1">
// // // // //                         <Link href="/admin/courses?type=all" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors font-bold">📂 Semua Program</Link>
// // // // //                         <Link href="/admin/courses?type=training" className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors border-t border-gray-50">🏢 Admin Pelatihan</Link>
// // // // //                         <Link href="/admin/courses?type=course" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors border-t border-gray-50">💻 Admin Kursus</Link>
// // // // //                         <Link href="/admin/library" className="block px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors border-t border-gray-50">📚 Kelola Pustaka</Link>
// // // // //                         <Link href="/admin/blog" className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors border-t border-gray-50">📰 Kelola Blog</Link>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 )}
// // // // //                 {isSuperAdmin && <Link href="/admin/users" className="px-3 py-2 text-gray-700 hover:text-red-700 font-medium transition-colors">Admin Users</Link>}
// // // // //             </nav>
// // // // //           )}

// // // // //           {/* === KANAN: ICONS & PROFILE === */}
// // // // //           <div className="flex items-center gap-3 flex-shrink-0 z-20">
// // // // //             {!user ? (
// // // // //               <Link href="/login" className="px-6 py-2 rounded-full text-sm bg-red-700 text-white hover:bg-red-800 transition-colors shadow-md font-bold">Masuk / Daftar</Link>
// // // // //             ) : (
// // // // //               <>
// // // // //                 {canManageContent && (
// // // // //                   <Link href="/admin/content" className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all" title="Pengaturan Tampilan (CMS)">
// // // // //                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
// // // // //                   </Link>
// // // // //                 )}

// // // // //                 {/* NOTIFICATION BELL */}
// // // // //                 <div className="relative" ref={notifRef}>
// // // // //                   <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all relative" aria-label="Notifikasi">
// // // // //                       <Bell size={24} />
// // // // //                       {unreadCount > 0 && <span className="absolute top-1 right-1 bg-red-600 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border-2 border-white">{unreadCount > 9 ? '9+' : unreadCount}</span>}
// // // // //                   </button>
// // // // //                   {isNotifOpen && (
// // // // //                       <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-scale-in origin-top-right">
// // // // //                           <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center"><h3 className="font-bold text-gray-800 text-sm">Notifikasi</h3><Link href="/notifications" className="text-xs text-red-700 hover:underline" onClick={() => setIsNotifOpen(false)}>Lihat Semua</Link></div>
// // // // //                           <div className="max-h-80 overflow-y-auto custom-scrollbar">
// // // // //                               {notifications.length === 0 ? (<p className="p-6 text-center text-xs text-gray-400">Tidak ada notifikasi baru.</p>) : (
// // // // //                                   notifications.map((notif: any) => {
// // // // //                                       let href = '#';
// // // // //                                       if (notif.type === 'course') href = notif.topic ? `/courses/${notif.topic}` : `/courses`;
// // // // //                                       else if(notif.type === 'system' && notif.topic) href = `/library?highlight=${notif.topic}`;
// // // // //                                       else if (notif.type === 'blog' && notif.topic) href = `/blog/${notif.topic}`;
// // // // //                                       else if (notif.type === 'approval') href = notif.message.toLowerCase().includes('cerita') ? `/admin/blog` : `/forum?status=pending`;
// // // // //                                       else if(notif.topic) href = `/forum/${notif.topic}`;

// // // // //                                       return (
// // // // //                                           <div key={notif._id} onClick={() => handleMarkAsRead(notif._id, href)} className={`px-4 py-3 border-b hover:bg-gray-50 cursor-pointer flex gap-3 ${!notif.isRead ? 'bg-red-50/30' : 'bg-white'}`}>
// // // // //                                               <div className="flex-shrink-0 mt-1">
// // // // //                                                   {notif.type === 'system' ? <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><BookOpen size={14}/></div> : 
// // // // //                                                    notif.type === 'course' ? <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><GraduationCap size={14}/></div> :
// // // // //                                                    notif.type === 'blog' ? <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><FileText size={14}/></div> :
// // // // //                                                    notif.type === 'approval' ? <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center"><AlertCircle size={14}/></div> :
// // // // //                                                    (notif.type === 'reply' || notif.type === 'mention') ? <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center"><MessageCircle size={14}/></div> :
// // // // //                                                    <img src={getImageUrl(notif.sender?.avatarUrl) || `https://ui-avatars.com/api/?name=${notif.sender?.name || 'U'}`} className="w-8 h-8 rounded-full object-cover" alt="S" />}
// // // // //                                               </div>
// // // // //                                               <div className="flex-1"><p className={`text-xs text-gray-800 leading-snug ${!notif.isRead ? 'font-bold' : ''}`}>{notif.message}</p><p className="text-[10px] text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</p></div>
// // // // //                                               {!notif.isRead && <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>}
// // // // //                                           </div>
// // // // //                                       );
// // // // //                                   })
// // // // //                               )}
// // // // //                           </div>
// // // // //                       </div>
// // // // //                   )}
// // // // //                 </div>

// // // // //                 {/* USER PROFILE DROPDOWN */}
// // // // //                 <div className="relative" ref={profileRef}>
// // // // //                   <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 hover:bg-gray-50 p-1 pr-3 rounded-full transition-all border border-transparent hover:border-gray-200 outline-none">
// // // // //                     <div className="relative">
// // // // //                         <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold overflow-hidden border-2 border-white shadow-sm">
// // // // //                         {user.avatarUrl ? (<img src={getImageUrl(user.avatarUrl)} alt="Avatar" className="w-full h-full object-cover" />) : ( user.name?.charAt(0).toUpperCase() || 'U' )}
// // // // //                         </div>
// // // // //                         {/* Badge Global di Avatar */}
// // // // //                         <div className="absolute -top-1 -right-1"><ChatNotificationBadge /></div> 
// // // // //                     </div>
// // // // //                     <span className="text-sm font-bold text-gray-700 hidden md:block max-w-[100px] truncate">{user.name?.split(' ')[0]}</span>
// // // // //                   </button>
// // // // //                   {isProfileOpen && (
// // // // //                     <div className="absolute right-0 mt-3 w-64 bg-white border rounded-xl shadow-xl z-20 py-2 animate-scale-in origin-top-right">
// // // // //                         <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50"><p className="text-sm font-bold text-gray-900 truncate">{user.name}</p><p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p></div>
// // // // //                         <div className="py-1">
// // // // //                           <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700" onClick={() => setIsProfileOpen(false)}><span>👤</span> Profil Saya</Link>
// // // // //                           <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700" onClick={() => setIsProfileOpen(false)}><span>📜</span> Histori Transaksi</Link>
                          
// // // // //                           {/* [MODIFIKASI] BUTTON PESAN MASUK MEMBUKA MODAL */}
// // // // //                           <button 
// // // // //                             onClick={() => { setIsProfileOpen(false); setIsChatOpen(true); }} 
// // // // //                             className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 transition-colors"
// // // // //                           >
// // // // //                             <span>💬</span> 
// // // // //                             <span className="flex-1">Pesan Masuk</span>
// // // // //                             <ChatNotificationBadge />
// // // // //                           </button>

// // // // //                           <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-gray-50 mt-1"><span>🚪</span> Keluar</button>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </div>
// // // // //               </>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       {/* GLOBAL CHAT MODAL (RENDER DI ROOT) */}
// // // // //       {isChatOpen && <GlobalChatModal onClose={() => setIsChatOpen(false)} />}
// // // // //     </>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import Link from 'next/link';
// // // // import { useAuth } from '@/lib/AuthProvider';
// // // // import { useState, useEffect, useRef } from 'react';
// // // // import { useRouter } from 'next/navigation';
// // // // import { getImageUrl, api } from '@/lib/api';
// // // // import ChatNotificationBadge from '@/components/ChatNotificationBadge';
// // // // import ForumNotificationBadge from '@/components/ForumNotificationBadge';
// // // // import LibraryNotificationBadge from '@/components/LibraryNotificationBadge'; 
// // // // import GlobalChatModal from '@/components/GlobalChatModal'; 
// // // // import { Bell, MessageCircle } from 'lucide-react'; // Pastikan lucide-react terinstall

// // // // export default function Header() {
// // // //   const { user, logout } = useAuth();
// // // //   const router = useRouter();
  
// // // //   // STATE
// // // //   const [isProfileOpen, setIsProfileOpen] = useState(false);
// // // //   const [isNotifOpen, setIsNotifOpen] = useState(false);
// // // //   const [isChatOpen, setIsChatOpen] = useState(false); 
  
// // // //   const [notifications, setNotifications] = useState<any[]>([]);
// // // //   const [unreadCount, setUnreadCount] = useState(0);

// // // //   const notifRef = useRef<HTMLDivElement>(null);
// // // //   const profileRef = useRef<HTMLDivElement>(null);

// // // //   const canManageContent = user && (user.role === 'FACILITATOR' || user.role === 'SUPER_ADMIN');
// // // //   const isSuperAdmin = user && user.role === 'SUPER_ADMIN';

// // // //   useEffect(() => {
// // // //     if (user) {
// // // //         fetchNotifications();
// // // //         const interval = setInterval(fetchNotifications, 10000);
// // // //         return () => clearInterval(interval);
// // // //     }
// // // //   }, [user]);

// // // //   // Click Outside Handler
// // // //   useEffect(() => {
// // // //     function handleClickOutside(event: MouseEvent) {
// // // //       if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
// // // //       if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
// // // //     }
// // // //     document.addEventListener("mousedown", handleClickOutside);
// // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // //   }, []);

// // // //   const fetchNotifications = async () => {
// // // //       try {
// // // //           const list = await api('/api/notifications');
// // // //           setNotifications(list);
// // // //           const countRes = await api('/api/notifications/unread-count');
// // // //           setUnreadCount(countRes.count || 0);
// // // //       } catch (e) { console.error("Gagal load notif", e); }
// // // //   };

// // // //   const handleMarkAsRead = async (id: string, link: string) => {
// // // //       try {
// // // //           await api('/api/notifications/mark-read', { method: 'PATCH' });
// // // //           setIsNotifOpen(false);
// // // //           router.push(link);
// // // //           setTimeout(fetchNotifications, 1000); 
// // // //       } catch (e) { console.error(e); }
// // // //   };

// // // //   const handleLogout = () => {
// // // //     logout();
// // // //     router.push('/login');
// // // //   };

// // // //   return (
// // // //     <>
// // // //       <header className="bg-white border-b sticky top-0 z-50 shadow-sm font-sans">
// // // //         <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
          
// // // //           {/* LOGO */}
// // // //           <div className="flex-shrink-0 z-20">
// // // //             <Link href="/" className="flex items-center gap-3">
// // // //               <img src="/pmi-logo.png" alt="Logo PMI" className="h-10 w-auto" />
// // // //               <img src="/humanis.png" alt="Humanis" className="h-8 w-auto object-contain hidden md:block" />
// // // //             </Link>
// // // //           </div>

// // // //           {/* TENGAH: MENU UTAMA */}
// // // //           {user && (
// // // //             <nav className="hidden md:flex items-center gap-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
// // // //                 <Link href="/courses" className="px-3 py-2 text-gray-700 hover:text-red-700 font-medium transition-colors">Katalog Kelas</Link>
                
// // // //                 {/* MENU INTERAKTIF */}
// // // //                 <div className="relative group py-4">
// // // //                   <button className="px-3 py-2 text-gray-700 group-hover:text-red-700 font-medium flex items-center gap-1 transition-colors outline-none relative">
// // // //                     Interaktif
// // // //                     <div className="ml-1 relative transform scale-75"><ForumNotificationBadge /></div>
// // // //                     <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
// // // //                   </button>
// // // //                   <div className="absolute top-full left-0 w-full h-2"></div>
// // // //                   <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out origin-top z-50">
// // // //                     <div className="py-1">
// // // //                       <Link href="/forum" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"><span>Forum Diskusi</span><div className="relative w-4 h-4 mr-2"><ForumNotificationBadge /></div></Link>
// // // //                       <Link href="/library" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-50"><span>Perpustakaan Digital</span><div className="relative w-4 h-4 mr-2"><LibraryNotificationBadge /></div></Link>
// // // //                       <Link href="/blog" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-50">Blog Relawan</Link>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* MENU PENGELOLAAN (ADMIN) */}
// // // //                 {canManageContent && (
// // // //                   <div className="relative group py-4">
// // // //                     <button className="px-3 py-2 text-gray-700 group-hover:text-red-700 font-medium flex items-center gap-1 transition-colors outline-none">
// // // //                       Pengelolaan <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
// // // //                     </button>
// // // //                     <div className="absolute top-full left-0 w-full h-2"></div>
// // // //                     <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out origin-top z-50">
// // // //                       <div className="py-1">
// // // //                         <Link href="/admin/courses?type=all" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors font-bold">📂 Semua Program</Link>
// // // //                         <Link href="/admin/courses?type=training" className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors border-t border-gray-50">🏢 Admin Pelatihan</Link>
// // // //                         <Link href="/admin/courses?type=course" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors border-t border-gray-50">💻 Admin Kursus</Link>
// // // //                         <Link href="/admin/library" className="block px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors border-t border-gray-50">📚 Kelola Pustaka</Link>
// // // //                         <Link href="/admin/blog" className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors border-t border-gray-50">📰 Kelola Blog</Link>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}
// // // //                 {isSuperAdmin && <Link href="/admin/users" className="px-3 py-2 text-gray-700 hover:text-red-700 font-medium transition-colors">Admin Users</Link>}
// // // //             </nav>
// // // //           )}

// // // //           {/* KANAN: ICONS & PROFILE */}
// // // //           <div className="flex items-center gap-3 flex-shrink-0 z-20">
// // // //             {!user ? (
// // // //               <Link href="/login" className="px-6 py-2 rounded-full text-sm bg-red-700 text-white hover:bg-red-800 transition-colors shadow-md font-bold">Masuk / Daftar</Link>
// // // //             ) : (
// // // //               <>
// // // //                 {/* 1. BUTTON GLOBAL CHAT */}
// // // //                 <button 
// // // //                   onClick={() => setIsChatOpen(true)} 
// // // //                   className={`p-2 rounded-full transition-all relative ${isChatOpen ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:text-red-700 hover:bg-gray-100'}`}
// // // //                   title="Global Chat"
// // // //                   aria-label="Buka Chat"
// // // //                 >
// // // //                   <MessageCircle size={24} />
// // // //                   <span className="absolute top-1 right-1 bg-red-600 w-2 h-2 rounded-full border border-white"></span>
// // // //                 </button>

// // // //                 {/* 2. BUTTON CMS */}
// // // //                 {canManageContent && (
// // // //                   <Link href="/admin/content" className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all" title="Pengaturan Tampilan (CMS)" aria-label="CMS Dashboard">
// // // //                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
// // // //                   </Link>
// // // //                 )}

// // // //                 {/* 3. NOTIFICATION BELL */}
// // // //                 <div className="relative" ref={notifRef}>
// // // //                   <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all relative" aria-label="Notifikasi">
// // // //                       <Bell size={24} />
// // // //                       {unreadCount > 0 && <span className="absolute top-1 right-1 bg-red-600 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border-2 border-white">{unreadCount > 9 ? '9+' : unreadCount}</span>}
// // // //                   </button>
// // // //                   {isNotifOpen && (
// // // //                       <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-scale-in origin-top-right">
// // // //                           <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center"><h3 className="font-bold text-gray-800 text-sm">Notifikasi</h3><Link href="/notifications" className="text-xs text-red-700 hover:underline" onClick={() => setIsNotifOpen(false)}>Lihat Semua</Link></div>
// // // //                           <div className="max-h-80 overflow-y-auto custom-scrollbar">
// // // //                               {notifications.length === 0 ? (<p className="p-6 text-center text-xs text-gray-400">Tidak ada notifikasi baru.</p>) : (
// // // //                                   notifications.map((notif: any) => {
// // // //                                       let href = '#';
// // // //                                       if (notif.type === 'course') href = notif.topic ? `/courses/${notif.topic}` : `/courses`;
// // // //                                       else if(notif.type === 'system' && notif.topic) href = `/library?highlight=${notif.topic}`;
// // // //                                       else if (notif.type === 'blog' && notif.topic) href = `/blog/${notif.topic}`;
// // // //                                       else if (notif.type === 'approval') href = notif.message.toLowerCase().includes('cerita') ? `/admin/blog` : `/forum?status=pending`;
// // // //                                       else if(notif.topic) href = `/forum/${notif.topic}`;

// // // //                                       return (
// // // //                                           <div key={notif._id} onClick={() => handleMarkAsRead(notif._id, href)} className={`px-4 py-3 border-b hover:bg-gray-50 cursor-pointer flex gap-3 ${!notif.isRead ? 'bg-red-50/30' : 'bg-white'}`}>
// // // //                                               {/* Icon Notif Logic */}
// // // //                                               <div className="flex-1"><p className={`text-xs text-gray-800 leading-snug ${!notif.isRead ? 'font-bold' : ''}`}>{notif.message}</p><p className="text-[10px] text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</p></div>
// // // //                                               {!notif.isRead && <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>}
// // // //                                           </div>
// // // //                                       );
// // // //                                   })
// // // //                               )}
// // // //                           </div>
// // // //                       </div>
// // // //                   )}
// // // //                 </div>

// // // //                 {/* 4. USER PROFILE */}
// // // //                 <div className="relative" ref={profileRef}>
// // // //                   <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 hover:bg-gray-50 p-1 pr-3 rounded-full transition-all border border-transparent hover:border-gray-200 outline-none" aria-label="Menu Profil">
// // // //                     <div className="relative">
// // // //                         <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold overflow-hidden border-2 border-white shadow-sm">
// // // //                         {user.avatarUrl ? (<img src={getImageUrl(user.avatarUrl)} alt="Avatar" className="w-full h-full object-cover" />) : ( user.name?.charAt(0).toUpperCase() || 'U' )}
// // // //                         </div>
// // // //                         <div className="absolute -top-1 -right-1"><ChatNotificationBadge /></div> 
// // // //                     </div>
// // // //                     <span className="text-sm font-bold text-gray-700 hidden md:block max-w-[100px] truncate">{user.name?.split(' ')[0]}</span>
// // // //                   </button>
// // // //                   {isProfileOpen && (
// // // //                     <div className="absolute right-0 mt-3 w-64 bg-white border rounded-xl shadow-xl z-20 py-2 animate-scale-in origin-top-right">
// // // //                         <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50"><p className="text-sm font-bold text-gray-900 truncate">{user.name}</p><p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p></div>
// // // //                         <div className="py-1">
// // // //                           <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700" onClick={() => setIsProfileOpen(false)}><span>👤</span> Profil Saya</Link>
// // // //                           <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700" onClick={() => setIsProfileOpen(false)}><span>📜</span> Histori Transaksi</Link>
                          
// // // //                           <button 
// // // //                             onClick={() => { setIsProfileOpen(false); setIsChatOpen(true); }} 
// // // //                             className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 transition-colors"
// // // //                           >
// // // //                             <span>💬</span> 
// // // //                             <span className="flex-1">Pesan Masuk</span>
// // // //                             <ChatNotificationBadge />
// // // //                           </button>

// // // //                           <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-gray-50 mt-1"><span>🚪</span> Keluar</button>
// // // //                         </div>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               </>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       {/* RENDER MODAL DI ROOT */}
// // // //       {isChatOpen && <GlobalChatModal onClose={() => setIsChatOpen(false)} />}
// // // //     </>
// // // //   );
// // // // }




// // // 'use client';

// // // import Link from 'next/link';
// // // import { useAuth } from '@/lib/AuthProvider';
// // // import { useState, useEffect, useRef } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // import { getImageUrl, api } from '@/lib/api';

// // // // [UPDATE] Import Badge Blog
// // // import ChatNotificationBadge from '@/components/ChatNotificationBadge';
// // // import ForumNotificationBadge from '@/components/ForumNotificationBadge';
// // // import LibraryNotificationBadge from '@/components/LibraryNotificationBadge'; 
// // // import BlogNotificationBadge from '@/components/BlogNotificationBadge'; // <--- Tambahkan ini
// // // import GlobalChatModal from '@/components/GlobalChatModal'; 

// // // import { Bell, MessageCircle } from 'lucide-react'; 

// // // export default function Header() {
// // //   const { user, logout } = useAuth();
// // //   const router = useRouter();
  
// // //   // ... (State & Effect lain biarkan tetap sama) ...
// // //   const [isProfileOpen, setIsProfileOpen] = useState(false);
// // //   const [isNotifOpen, setIsNotifOpen] = useState(false);
// // //   const [isChatOpen, setIsChatOpen] = useState(false); 
// // //   const [notifications, setNotifications] = useState<any[]>([]);
// // //   const [unreadCount, setUnreadCount] = useState(0);

// // //   const notifRef = useRef<HTMLDivElement>(null);
// // //   const profileRef = useRef<HTMLDivElement>(null);

// // //   const canManageContent = user && (user.role === 'FACILITATOR' || user.role === 'SUPER_ADMIN');
// // //   const isSuperAdmin = user && user.role === 'SUPER_ADMIN';

// // //   // ... (useEffect fetchNotifications, handleMarkAsRead dll tetap sama) ...
// // //   useEffect(() => {
// // //     if (user) {
// // //         fetchNotifications();
// // //         const interval = setInterval(fetchNotifications, 10000);
// // //         return () => clearInterval(interval);
// // //     }
// // //   }, [user]);

// // //   useEffect(() => {
// // //     function handleClickOutside(event: MouseEvent) {
// // //       if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
// // //       if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
// // //     }
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

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

// // //   const handleMarkAsRead = async (id: string, link: string) => {
// // //       try {
// // //           if (id) {
// // //             await api(`/api/notifications/${id}/read`, { method: 'PATCH' });
// // //           } else {
// // //             await api('/api/notifications/mark-read', { method: 'PATCH' });
// // //           }
// // //           setIsNotifOpen(false);
// // //           window.dispatchEvent(new Event('notification-update'));
// // //           router.push(link);
// // //           setTimeout(fetchNotifications, 500); 
// // //       } catch (e) { console.error(e); }
// // //   };

// // //   const handleLogout = () => {
// // //     logout();
// // //     router.push('/login');
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

// // //           {/* TENGAH: MENU UTAMA */}
// // //           {user && (
// // //             <nav className="hidden md:flex items-center gap-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
// // //                 <Link href="/courses" className="px-3 py-2 text-gray-700 hover:text-red-700 font-medium transition-colors">Katalog Kelas</Link>
                
// // //                 {/* MENU INTERAKTIF */}
// // //                 <div className="relative group py-4">
// // //                   <button className="px-3 py-2 text-gray-700 group-hover:text-red-700 font-medium flex items-center gap-1 transition-colors outline-none relative">
// // //                     Interaktif
// // //                     {/* Badge Global Interaktif (Jika salah satu ada notif) */}
// // //                     <div className="ml-1 relative transform scale-75">
// // //                         <ForumNotificationBadge /> 
// // //                         {/* Note: Jika ingin menggabung notif forum+blog di badge menu utama, logicnya bisa digabung. 
// // //                             Saat ini badge menu utama hanya menampilkan notif forum sesuai kode lama. */}
// // //                     </div>
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
// // //                       {/* [UPDATE] Link Blog dengan Badge */}
// // //                       <Link href="/blog" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-50">
// // //                           <span>Blog Relawan</span>
// // //                           <div className="relative w-4 h-4 mr-2"><BlogNotificationBadge /></div>
// // //                       </Link>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* MENU PENGELOLAAN (ADMIN) - TETAP SAMA */}
// // //                 {canManageContent && (
// // //                   <div className="relative group py-4">
// // //                     <button className="px-3 py-2 text-gray-700 group-hover:text-red-700 font-medium flex items-center gap-1 transition-colors outline-none">
// // //                       Pengelolaan <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
// // //                     </button>
// // //                     <div className="absolute top-full left-0 w-full h-2"></div>
// // //                     <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out origin-top z-50">
// // //                       <div className="py-1">
// // //                         <Link href="/admin/courses?type=all" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors font-bold">📂 Semua Program</Link>
// // //                         <Link href="/admin/courses?type=training" className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors border-t border-gray-50">🏢 Admin Pelatihan</Link>
// // //                         <Link href="/admin/courses?type=course" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors border-t border-gray-50">💻 Admin Kursus</Link>
// // //                         <Link href="/admin/library" className="block px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors border-t border-gray-50">📚 Kelola Pustaka</Link>
// // //                         <Link href="/admin/blog" className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors border-t border-gray-50">📰 Kelola Blog</Link>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //                 {isSuperAdmin && <Link href="/admin/users" className="px-3 py-2 text-gray-700 hover:text-red-700 font-medium transition-colors">Admin Users</Link>}
// // //             </nav>
// // //           )}

// // //           {/* KANAN: ICONS & PROFILE - TETAP SAMA */}
// // //           <div className="flex items-center gap-3 flex-shrink-0 z-20">
// // //             {!user ? (
// // //               <Link href="/login" className="px-6 py-2 rounded-full text-sm bg-red-700 text-white hover:bg-red-800 transition-colors shadow-md font-bold">Masuk / Daftar</Link>
// // //             ) : (
// // //               <>
// // //                 <button onClick={() => setIsChatOpen(true)} className={`p-2 rounded-full transition-all relative ${isChatOpen ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:text-red-700 hover:bg-gray-100'}`} title="Global Chat">
// // //                   <MessageCircle size={24} />
// // //                   <span className="absolute top-1 right-1"><ChatNotificationBadge /></span>
// // //                 </button>

// // //                 {canManageContent && (
// // //                   <Link href="/admin/content" className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all" title="Pengaturan Tampilan (CMS)">
// // //                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
// // //                   </Link>
// // //                 )}

// // //                 <div className="relative" ref={notifRef}>
// // //                   <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all relative">
// // //                       <Bell size={24} />
// // //                       {unreadCount > 0 && <span className="absolute top-1 right-1 bg-red-600 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border-2 border-white animate-bounce">{unreadCount > 9 ? '9+' : unreadCount}</span>}
// // //                   </button>
// // //                   {isNotifOpen && (
// // //                       <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-scale-in origin-top-right">
// // //                           <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center"><h3 className="font-bold text-gray-800 text-sm">Notifikasi</h3><Link href="/notifications" className="text-xs text-red-700 hover:underline" onClick={() => setIsNotifOpen(false)}>Lihat Semua</Link></div>
// // //                           <div className="max-h-80 overflow-y-auto custom-scrollbar">
// // //                               {notifications.length === 0 ? (<p className="p-6 text-center text-xs text-gray-400">Tidak ada notifikasi baru.</p>) : (
// // //                                   notifications.map((notif: any) => {
// // //                                       let href = '#';
// // //                                       if (notif.type === 'course') href = notif.topic ? `/courses/${notif.topic}` : `/courses`;
// // //                                       else if(notif.type === 'system' && notif.topic) href = `/library?highlight=${notif.topic}`;
// // //                                       else if (notif.type === 'blog' && notif.topic) href = `/blog/${notif.topic}`;
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

// // //                 <div className="relative" ref={profileRef}>
// // //                   <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 hover:bg-gray-50 p-1 pr-3 rounded-full transition-all border border-transparent hover:border-gray-200 outline-none">
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
// // //                           <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700" onClick={() => setIsProfileOpen(false)}><span>👤</span> Profil Saya</Link>
// // //                           <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700" onClick={() => setIsProfileOpen(false)}><span>📜</span> Histori Transaksi</Link>
// // //                           <button onClick={() => { setIsProfileOpen(false); setIsChatOpen(true); }} className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 transition-colors"><span>💬</span> <span className="flex-1">Pesan Masuk</span><ChatNotificationBadge /></button>
// // //                           <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-gray-50 mt-1"><span>🚪</span> Keluar</button>
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
// // import GlobalChatModal from '@/components/GlobalChatModal'; 

// // import { Bell, MessageCircle } from 'lucide-react'; 

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

// //   const canManageContent = user && (user.role === 'FACILITATOR' || user.role === 'SUPER_ADMIN');
// //   const isSuperAdmin = user && user.role === 'SUPER_ADMIN';

// //   // --- FETCH DATA (POLLING) ---
// //   const fetchNotifications = async () => {
// //       try {
// //           const list = await api('/api/notifications'); 
// //           if (Array.isArray(list)) {
// //               list.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
// //               setNotifications(list);
// //           }
// //           const countRes = await api('/api/notifications/unread-count');
// //           // Update hanya jika count dari server valid
// //           setUnreadCount(countRes.count || 0);
// //       } catch (e) { console.error("Gagal load notif", e); }
// //   };

// //   useEffect(() => {
// //     if (user) {
// //         fetchNotifications();
// //         // Polling setiap 10 detik
// //         const interval = setInterval(fetchNotifications, 10000);
// //         return () => clearInterval(interval);
// //     }
// //   }, [user]);

// //   // Click Outside Handler
// //   useEffect(() => {
// //     function handleClickOutside(event: MouseEvent) {
// //       if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
// //       if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
// //     }
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // --- [FIX] HANDLE MARK READ (OPTIMISTIC UI UPDATE) ---
// //   // Ini memaksa badge hilang seketika saat diklik tanpa menunggu loading server
// //   const handleMarkAsRead = async (id: string, link: string) => {
// //       // 1. Update Visual Langsung
// //       setIsNotifOpen(false);
      
// //       if (!id) {
// //           // Jika "Lihat Semua" (Mark All Read)
// //           setUnreadCount(0);
// //           setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
// //       } else {
// //           // Jika klik satu notifikasi
// //           setUnreadCount(prev => Math.max(0, prev - 1));
// //           setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
// //       }

// //       try {
// //           // 2. Request ke Backend (Background Process)
// //           if (id) {
// //             await api(`/api/notifications/${id}/read`, { method: 'PATCH' });
// //           } else {
// //             await api('/api/notifications/mark-read', { method: 'PATCH' });
// //           }
          
// //           // 3. Trigger event global (jika ada komponen lain yang butuh update)
// //           window.dispatchEvent(new Event('notification-update'));
          
// //           // 4. Pindah Halaman
// //           router.push(link);
// //       } catch (e) { console.error(e); }
// //   };

// //   const handleLogout = () => {
// //     logout();
// //     router.push('/login');
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

// //                 {/* MENU PENGELOLAAN (ADMIN) */}
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
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //                 {isSuperAdmin && <Link href="/admin/users" className="px-3 py-2 text-gray-700 hover:text-red-700 font-medium transition-colors">Admin Users</Link>}
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
// //                 >
// //                   <MessageCircle size={24} />
// //                   <span className="absolute top-1 right-1"><ChatNotificationBadge /></span>
// //                 </button>

// //                 {/* 2. CMS LINK (Short) */}
// //                 {canManageContent && (
// //                   <Link href="/admin/content" className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all" title="Pengaturan Tampilan (CMS)">
// //                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
// //                   </Link>
// //                 )}

// //                 {/* 3. NOTIFICATION BELL */}
// //                 <div className="relative" ref={notifRef}>
// //                   <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all relative">
// //                       <Bell size={24} />
// //                       {unreadCount > 0 && <span className="absolute top-1 right-1 bg-red-600 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border-2 border-white animate-bounce">{unreadCount > 9 ? '9+' : unreadCount}</span>}
// //                   </button>
// //                   {isNotifOpen && (
// //                       <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-scale-in origin-top-right">
// //                           <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center"><h3 className="font-bold text-gray-800 text-sm">Notifikasi</h3><Link href="/notifications" className="text-xs text-red-700 hover:underline" onClick={() => handleMarkAsRead('', '/notifications')}>Lihat Semua</Link></div>
// //                           <div className="max-h-80 overflow-y-auto custom-scrollbar">
// //                               {notifications.length === 0 ? (<p className="p-6 text-center text-xs text-gray-400">Tidak ada notifikasi baru.</p>) : (
// //                                   notifications.map((notif: any) => {
// //                                       let href = '#';
// //                                       if (notif.type === 'course') href = notif.topic ? `/courses/${notif.topic}` : `/courses`;
// //                                       else if (notif.type === 'blog') href = `/blog/${notif.topic}`;
// //                                       else if (notif.type === 'approval') href = notif.message.toLowerCase().includes('cerita') ? `/admin/blog` : `/forum?status=pending`;
// //                                       else if (notif.type === 'reply' || notif.type === 'mention') href = `/forum/${notif.topic}`;

// //                                       return (
// //                                           <div key={notif._id} onClick={() => handleMarkAsRead(notif._id, href)} className={`px-4 py-3 border-b hover:bg-gray-50 cursor-pointer flex gap-3 ${!notif.isRead ? 'bg-red-50/30' : 'bg-white'}`}>
// //                                               <div className="flex-1"><p className={`text-xs text-gray-800 leading-snug ${!notif.isRead ? 'font-bold' : ''}`}>{notif.message}</p><p className="text-[10px] text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</p></div>
// //                                               {!notif.isRead && <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>}
// //                                           </div>
// //                                       );
// //                                   })
// //                               )}
// //                           </div>
// //                       </div>
// //                   )}
// //                 </div>

// //                 {/* 4. PROFILE */}
// //                 <div className="relative" ref={profileRef}>
// //                   <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 hover:bg-gray-50 p-1 pr-3 rounded-full transition-all border border-transparent hover:border-gray-200 outline-none">
// //                     <div className="relative">
// //                         <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold overflow-hidden border-2 border-white shadow-sm">
// //                         {user.avatarUrl ? (<img src={getImageUrl(user.avatarUrl)} alt="Avatar" className="w-full h-full object-cover" />) : ( user.name?.charAt(0).toUpperCase() || 'U' )}
// //                         </div>
// //                         <div className="absolute -top-1 -right-1"><ChatNotificationBadge /></div> 
// //                     </div>
// //                     <span className="text-sm font-bold text-gray-700 hidden md:block max-w-[100px] truncate">{user.name?.split(' ')[0]}</span>
// //                   </button>
// //                   {isProfileOpen && (
// //                     <div className="absolute right-0 mt-3 w-64 bg-white border rounded-xl shadow-xl z-20 py-2 animate-scale-in origin-top-right">
// //                         <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50"><p className="text-sm font-bold text-gray-900 truncate">{user.name}</p><p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p></div>
// //                         <div className="py-1">
// //                           <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700" onClick={() => setIsProfileOpen(false)}><span>👤</span> Profil Saya</Link>
// //                           <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700" onClick={() => setIsProfileOpen(false)}><span>📜</span> Histori Transaksi</Link>
// //                           <button onClick={() => { setIsProfileOpen(false); setIsChatOpen(true); }} className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 transition-colors"><span>💬</span> <span className="flex-1">Pesan Masuk</span><ChatNotificationBadge /></button>
// //                           <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-gray-50 mt-1"><span>🚪</span> Keluar</button>
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
// import { useRouter } from 'next/navigation';
// import { getImageUrl, api } from '@/lib/api';

// // Import Badge Komponen
// import ChatNotificationBadge from '@/components/ChatNotificationBadge';
// import ForumNotificationBadge from '@/components/ForumNotificationBadge';
// import LibraryNotificationBadge from '@/components/LibraryNotificationBadge'; 
// import BlogNotificationBadge from '@/components/BlogNotificationBadge'; 
// import GlobalChatModal from '@/components/GlobalChatModal'; 

// import { Bell, MessageCircle, Settings, User as UserIcon, LogOut } from 'lucide-react'; 

// export default function Header() {
//   const { user, logout } = useAuth();
//   const router = useRouter();
  
//   // STATE
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isNotifOpen, setIsNotifOpen] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false); 
  
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [unreadCount, setUnreadCount] = useState(0);

//   const notifRef = useRef<HTMLDivElement>(null);
//   const profileRef = useRef<HTMLDivElement>(null);

//   // [FIX] Logika Role yang Aman (karena AuthProvider sudah diupdate)
//   const canManageContent = user && ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'].includes(user.role);
//   const isSuperAdmin = user && user.role === 'SUPER_ADMIN';

//   // --- FETCH DATA (POLLING) ---
//   const fetchNotifications = async () => {
//       try {
//           const list = await api('/api/notifications'); 
//           if (Array.isArray(list)) {
//               list.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//               setNotifications(list);
//           }
//           const countRes = await api('/api/notifications/unread-count');
//           setUnreadCount(countRes.count || 0);
//       } catch (e) { console.error("Gagal load notif", e); }
//   };

//   useEffect(() => {
//     if (user) {
//         fetchNotifications();
//         const interval = setInterval(fetchNotifications, 10000);
//         return () => clearInterval(interval);
//     }
//   }, [user]);

//   // Click Outside Handler
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
//       if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

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
//           if (id) {
//             await api(`/api/notifications/${id}/read`, { method: 'PATCH' });
//           } else {
//             await api('/api/notifications/mark-read', { method: 'PATCH' });
//           }
          
//           window.dispatchEvent(new Event('notification-update'));
//           router.push(link);
//       } catch (e) { console.error(e); }
//   };

//   const handleLogout = () => {
//     logout();
//     router.push('/login');
//   };

//   return (
//     <>
//       <header className="bg-white border-b sticky top-0 z-50 shadow-sm font-sans">
//         <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
          
//           {/* LOGO */}
//           <div className="flex-shrink-0 z-20">
//             <Link href="/" className="flex items-center gap-3">
//               <img src="/pmi-logo.png" alt="Logo PMI" className="h-10 w-auto" />
//               <img src="/humanis.png" alt="Humanis" className="h-8 w-auto object-contain hidden md:block" />
//             </Link>
//           </div>

//           {/* MENU TENGAH */}
//           {user && (
//             <nav className="hidden md:flex items-center gap-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                 <Link href="/courses" className="px-3 py-2 text-gray-700 hover:text-red-700 font-medium transition-colors">Katalog Kelas</Link>
                
//                 {/* MENU INTERAKTIF */}
//                 <div className="relative group py-4">
//                   <button className="px-3 py-2 text-gray-700 group-hover:text-red-700 font-medium flex items-center gap-1 transition-colors outline-none relative">
//                     Interaktif
//                     <div className="ml-1 relative transform scale-75"><ForumNotificationBadge /></div>
//                     <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
//                   </button>
//                   <div className="absolute top-full left-0 w-full h-2"></div>
//                   <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out origin-top z-50">
//                     <div className="py-1">
//                       <Link href="/forum" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors">
//                           <span>Forum Diskusi</span>
//                           <div className="relative w-4 h-4 mr-2"><ForumNotificationBadge /></div>
//                       </Link>
//                       <Link href="/library" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-50">
//                           <span>Perpustakaan Digital</span>
//                           <div className="relative w-4 h-4 mr-2"><LibraryNotificationBadge /></div>
//                       </Link>
//                       <Link href="/blog" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-50">
//                           <span>Blog Relawan</span>
//                           <div className="relative w-4 h-4 mr-2"><BlogNotificationBadge /></div>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>

//                 {/* MENU PENGELOLAAN (ADMIN/FASILITATOR) */}
//                 {canManageContent && (
//                   <div className="relative group py-4">
//                     <button className="px-3 py-2 text-gray-700 group-hover:text-red-700 font-medium flex items-center gap-1 transition-colors outline-none">
//                       Pengelolaan <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
//                     </button>
//                     <div className="absolute top-full left-0 w-full h-2"></div>
//                     <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out origin-top z-50">
//                       <div className="py-1">
//                         <Link href="/admin/courses?type=all" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 font-bold">📂 Semua Program</Link>
//                         <Link href="/admin/courses?type=training" className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 border-t border-gray-50">🏢 Admin Pelatihan</Link>
//                         <Link href="/admin/courses?type=course" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-t border-gray-50">💻 Admin Kursus</Link>
//                         <Link href="/admin/library" className="block px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 border-t border-gray-50">📚 Kelola Pustaka</Link>
//                         <Link href="/admin/blog" className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 border-t border-gray-50">📰 Kelola Blog</Link>
                        
//                         {isSuperAdmin && <Link href="/admin/users" className="block px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 border-t border-gray-50">👥 Admin Users</Link>}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//             </nav>
//           )}

//           {/* ICON KANAN (CHAT, NOTIF, PROFILE) */}
//           <div className="flex items-center gap-3 flex-shrink-0 z-20">
//             {!user ? (
//               <Link href="/login" className="px-6 py-2 rounded-full text-sm bg-red-700 text-white hover:bg-red-800 transition-colors shadow-md font-bold">Masuk / Daftar</Link>
//             ) : (
//               <>
//                 {/* 1. GLOBAL CHAT BUTTON */}
//                 <button 
//                   onClick={() => setIsChatOpen(true)} 
//                   className={`p-2 rounded-full transition-all relative ${isChatOpen ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:text-red-700 hover:bg-gray-100'}`}
//                   title="Global Chat"
//                   aria-label="Buka Global Chat" // [FIX] Accessibility
//                 >
//                   <MessageCircle size={24} />
//                   <span className="absolute top-1 right-1"><ChatNotificationBadge /></span>
//                 </button>

//                 {/* 2. CMS LINK (Short) */}
//                 {canManageContent && (
//                   <Link href="/admin/content" className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all" title="Pengaturan Tampilan (CMS)" aria-label="Pengaturan CMS">
//                       <Settings size={24} />
//                   </Link>
//                 )}

//                 {/* 3. NOTIFICATION BELL */}
//                 <div className="relative" ref={notifRef}>
//                   <button 
//                     onClick={() => setIsNotifOpen(!isNotifOpen)} 
//                     className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all relative"
//                     aria-label="Lihat Notifikasi" // [FIX] Accessibility
//                   >
//                       <Bell size={24} />
//                       {unreadCount > 0 && <span className="absolute top-1 right-1 bg-red-600 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border-2 border-white animate-bounce">{unreadCount > 9 ? '9+' : unreadCount}</span>}
//                   </button>
//                   {isNotifOpen && (
//                       <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-scale-in origin-top-right">
//                           <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center"><h3 className="font-bold text-gray-800 text-sm">Notifikasi</h3><Link href="/notifications" className="text-xs text-red-700 hover:underline" onClick={() => handleMarkAsRead('', '/notifications')}>Lihat Semua</Link></div>
//                           <div className="max-h-80 overflow-y-auto custom-scrollbar">
//                               {notifications.length === 0 ? (<p className="p-6 text-center text-xs text-gray-400">Tidak ada notifikasi baru.</p>) : (
//                                   notifications.map((notif: any) => {
//                                       let href = '#';
//                                       if (notif.type === 'course') href = notif.topic ? `/courses/${notif.topic}` : `/courses`;
//                                       else if (notif.type === 'blog') href = `/blog/${notif.topic}`;
//                                       else if (notif.type === 'approval') href = notif.message.toLowerCase().includes('cerita') ? `/admin/blog` : `/forum?status=pending`;
//                                       else if (notif.type === 'reply' || notif.type === 'mention') href = `/forum/${notif.topic}`;

//                                       return (
//                                           <div key={notif._id} onClick={() => handleMarkAsRead(notif._id, href)} className={`px-4 py-3 border-b hover:bg-gray-50 cursor-pointer flex gap-3 ${!notif.isRead ? 'bg-red-50/30' : 'bg-white'}`}>
//                                               <div className="flex-1"><p className={`text-xs text-gray-800 leading-snug ${!notif.isRead ? 'font-bold' : ''}`}>{notif.message}</p><p className="text-[10px] text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</p></div>
//                                               {!notif.isRead && <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>}
//                                           </div>
//                                       );
//                                   })
//                               )}
//                           </div>
//                       </div>
//                   )}
//                 </div>

//                 {/* 4. PROFILE */}
//                 <div className="relative" ref={profileRef}>
//                   <button 
//                     onClick={() => setIsProfileOpen(!isProfileOpen)} 
//                     className="flex items-center gap-3 hover:bg-gray-50 p-1 pr-3 rounded-full transition-all border border-transparent hover:border-gray-200 outline-none"
//                     aria-label="Menu Profil" // [FIX] Accessibility
//                   >
//                     <div className="relative">
//                         <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold overflow-hidden border-2 border-white shadow-sm">
//                         {user.avatarUrl ? (<img src={getImageUrl(user.avatarUrl)} alt="Avatar" className="w-full h-full object-cover" />) : ( user.name?.charAt(0).toUpperCase() || 'U' )}
//                         </div>
//                         <div className="absolute -top-1 -right-1"><ChatNotificationBadge /></div> 
//                     </div>
//                     <span className="text-sm font-bold text-gray-700 hidden md:block max-w-[100px] truncate">{user.name?.split(' ')[0]}</span>
//                   </button>
//                   {isProfileOpen && (
//                     <div className="absolute right-0 mt-3 w-64 bg-white border rounded-xl shadow-xl z-20 py-2 animate-scale-in origin-top-right">
//                         <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50"><p className="text-sm font-bold text-gray-900 truncate">{user.name}</p><p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p></div>
//                         <div className="py-1">
//                           <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700" onClick={() => setIsProfileOpen(false)}>
//                             <UserIcon size={16}/> Profil Saya
//                           </Link>
//                           <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700" onClick={() => setIsProfileOpen(false)}>
//                             <span>📜</span> Histori Transaksi
//                           </Link>
//                           <button onClick={() => { setIsProfileOpen(false); setIsChatOpen(true); }} className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 transition-colors">
//                             <MessageCircle size={16}/> <span className="flex-1">Pesan Masuk</span><ChatNotificationBadge />
//                           </button>
//                           <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-gray-50 mt-1">
//                             <LogOut size={16}/> Keluar
//                           </button>
//                         </div>
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </header>
//       {isChatOpen && <GlobalChatModal onClose={() => setIsChatOpen(false)} />}
//     </>
//   );
// }


'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthProvider';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getImageUrl, api } from '@/lib/api';

// Import Badge Komponen
import ChatNotificationBadge from '@/components/ChatNotificationBadge';
import ForumNotificationBadge from '@/components/ForumNotificationBadge';
import LibraryNotificationBadge from '@/components/LibraryNotificationBadge'; 
import BlogNotificationBadge from '@/components/BlogNotificationBadge'; 
import GlobalChatModal from '@/components/GlobalChatModal'; 

import { Bell, MessageCircle, Settings, User as UserIcon, LogOut } from 'lucide-react'; 

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  // STATE
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); 
  
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // [FIX] Logika Role yang Aman (karena AuthProvider sudah diupdate)
  // Pastikan role-role ini sesuai dengan enum di backend
  const canManageContent = user && ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'].includes(user.role);
  const isSuperAdmin = user && user.role === 'SUPER_ADMIN';

  // --- FETCH DATA (POLLING) ---
  const fetchNotifications = async () => {
      try {
          const list = await api('/api/notifications'); 
          if (Array.isArray(list)) {
              list.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
              setNotifications(list);
          }
          const countRes = await api('/api/notifications/unread-count');
          setUnreadCount(countRes.count || 0);
      } catch (e) { console.error("Gagal load notif", e); }
  };

  useEffect(() => {
    if (user) {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 10000);
        return () => clearInterval(interval);
    }
  }, [user]);

  // Click Outside Handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          if (id) {
            await api(`/api/notifications/${id}/read`, { method: 'PATCH' });
          } else {
            await api('/api/notifications/mark-read', { method: 'PATCH' });
          }
          
          window.dispatchEvent(new Event('notification-update'));
          router.push(link);
      } catch (e) { console.error(e); }
  };

  const handleLogout = () => {
    logout();
    // Tidak perlu router.push karena logout di AuthProvider sudah handle redirect
  };

  return (
    <>
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm font-sans">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
          
          {/* LOGO */}
          <div className="flex-shrink-0 z-20">
            <Link href="/" className="flex items-center gap-3">
              <img src="/pmi-logo.png" alt="Logo PMI" className="h-10 w-auto" />
              <img src="/humanis.png" alt="Humanis" className="h-8 w-auto object-contain hidden md:block" />
            </Link>
          </div>

          {/* MENU TENGAH */}
          {user && (
            <nav className="hidden md:flex items-center gap-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Link href="/courses" className="px-3 py-2 text-gray-700 hover:text-red-700 font-medium transition-colors">Katalog Kelas</Link>
                
                {/* MENU INTERAKTIF */}
                <div className="relative group py-4">
                  <button className="px-3 py-2 text-gray-700 group-hover:text-red-700 font-medium flex items-center gap-1 transition-colors outline-none relative">
                    Interaktif
                    <div className="ml-1 relative transform scale-75"><ForumNotificationBadge /></div>
                    <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div className="absolute top-full left-0 w-full h-2"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out origin-top z-50">
                    <div className="py-1">
                      <Link href="/forum" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors">
                          <span>Forum Diskusi</span>
                          <div className="relative w-4 h-4 mr-2"><ForumNotificationBadge /></div>
                      </Link>
                      <Link href="/library" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-50">
                          <span>Perpustakaan Digital</span>
                          <div className="relative w-4 h-4 mr-2"><LibraryNotificationBadge /></div>
                      </Link>
                      <Link href="/blog" className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-50">
                          <span>Blog Relawan</span>
                          <div className="relative w-4 h-4 mr-2"><BlogNotificationBadge /></div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* MENU PENGELOLAAN (ADMIN/FASILITATOR) */}
                {canManageContent && (
                  <div className="relative group py-4">
                    <button className="px-3 py-2 text-gray-700 group-hover:text-red-700 font-medium flex items-center gap-1 transition-colors outline-none">
                      Pengelolaan <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div className="absolute top-full left-0 w-full h-2"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out origin-top z-50">
                      <div className="py-1">
                        <Link href="/admin/courses?type=all" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 font-bold">📂 Semua Program</Link>
                        <Link href="/admin/courses?type=training" className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 border-t border-gray-50">🏢 Admin Pelatihan</Link>
                        <Link href="/admin/courses?type=course" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-t border-gray-50">💻 Admin Kursus</Link>
                        <Link href="/admin/library" className="block px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 border-t border-gray-50">📚 Kelola Pustaka</Link>
                        <Link href="/admin/blog" className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 border-t border-gray-50">📰 Kelola Blog</Link>
                        
                        {isSuperAdmin && <Link href="/admin/users" className="block px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 border-t border-gray-50">👥 Admin Users</Link>}
                      </div>
                    </div>
                  </div>
                )}
            </nav>
          )}

          {/* ICON KANAN (CHAT, NOTIF, PROFILE) */}
          <div className="flex items-center gap-3 flex-shrink-0 z-20">
            {!user ? (
              <Link href="/login" className="px-6 py-2 rounded-full text-sm bg-red-700 text-white hover:bg-red-800 transition-colors shadow-md font-bold">Masuk / Daftar</Link>
            ) : (
              <>
                {/* 1. GLOBAL CHAT BUTTON */}
                <button 
                  onClick={() => setIsChatOpen(true)} 
                  className={`p-2 rounded-full transition-all relative ${isChatOpen ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:text-red-700 hover:bg-gray-100'}`}
                  title="Global Chat"
                  aria-label="Buka Global Chat"
                >
                  <MessageCircle size={24} />
                  <span className="absolute top-1 right-1"><ChatNotificationBadge /></span>
                </button>

                {/* 2. CMS LINK (Short) */}
                {canManageContent && (
                  <Link href="/admin/content" className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all" title="Pengaturan Tampilan (CMS)" aria-label="Pengaturan CMS">
                      <Settings size={24} />
                  </Link>
                )}

                {/* 3. NOTIFICATION BELL */}
                <div className="relative" ref={notifRef}>
                  <button 
                    onClick={() => setIsNotifOpen(!isNotifOpen)} 
                    className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-full transition-all relative"
                    aria-label="Lihat Notifikasi"
                  >
                      <Bell size={24} />
                      {unreadCount > 0 && <span className="absolute top-1 right-1 bg-red-600 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border-2 border-white animate-bounce">{unreadCount > 9 ? '9+' : unreadCount}</span>}
                  </button>
                  {isNotifOpen && (
                      <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-scale-in origin-top-right">
                          <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center"><h3 className="font-bold text-gray-800 text-sm">Notifikasi</h3><Link href="/notifications" className="text-xs text-red-700 hover:underline" onClick={() => handleMarkAsRead('', '/notifications')}>Lihat Semua</Link></div>
                          <div className="max-h-80 overflow-y-auto custom-scrollbar">
                              {notifications.length === 0 ? (<p className="p-6 text-center text-xs text-gray-400">Tidak ada notifikasi baru.</p>) : (
                                  notifications.map((notif: any) => {
                                      let href = '#';
                                      if (notif.type === 'course') href = notif.topic ? `/courses/${notif.topic}` : `/courses`;
                                      else if (notif.type === 'blog') href = `/blog/${notif.topic}`;
                                      else if (notif.type === 'approval') href = notif.message.toLowerCase().includes('cerita') ? `/admin/blog` : `/forum?status=pending`;
                                      else if (notif.type === 'reply' || notif.type === 'mention') href = `/forum/${notif.topic}`;

                                      return (
                                          <div key={notif._id} onClick={() => handleMarkAsRead(notif._id, href)} className={`px-4 py-3 border-b hover:bg-gray-50 cursor-pointer flex gap-3 ${!notif.isRead ? 'bg-red-50/30' : 'bg-white'}`}>
                                              <div className="flex-1"><p className={`text-xs text-gray-800 leading-snug ${!notif.isRead ? 'font-bold' : ''}`}>{notif.message}</p><p className="text-[10px] text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</p></div>
                                              {!notif.isRead && <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>}
                                          </div>
                                      );
                                  })
                              )}
                          </div>
                      </div>
                  )}
                </div>

                {/* 4. PROFILE */}
                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)} 
                    className="flex items-center gap-3 hover:bg-gray-50 p-1 pr-3 rounded-full transition-all border border-transparent hover:border-gray-200 outline-none"
                    aria-label="Menu Profil"
                  >
                    <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold overflow-hidden border-2 border-white shadow-sm">
                        {user.avatarUrl ? (<img src={getImageUrl(user.avatarUrl)} alt="Avatar" className="w-full h-full object-cover" />) : ( user.name?.charAt(0).toUpperCase() || 'U' )}
                        </div>
                        <div className="absolute -top-1 -right-1"><ChatNotificationBadge /></div> 
                    </div>
                    <span className="text-sm font-bold text-gray-700 hidden md:block max-w-[100px] truncate">{user.name?.split(' ')[0]}</span>
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white border rounded-xl shadow-xl z-20 py-2 animate-scale-in origin-top-right">
                        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50"><p className="text-sm font-bold text-gray-900 truncate">{user.name}</p><p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p></div>
                        <div className="py-1">
                          <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700" onClick={() => setIsProfileOpen(false)}>
                            <UserIcon size={16}/> Profil Saya
                          </Link>
                          <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700" onClick={() => setIsProfileOpen(false)}>
                            <span>📜</span> Histori Transaksi
                          </Link>
                          <button onClick={() => { setIsProfileOpen(false); setIsChatOpen(true); }} className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 transition-colors">
                            <MessageCircle size={16}/> <span className="flex-1">Pesan Masuk</span><ChatNotificationBadge />
                          </button>
                          <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-gray-50 mt-1">
                            <LogOut size={16}/> Keluar
                          </button>
                        </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </header>
      {isChatOpen && <GlobalChatModal onClose={() => setIsChatOpen(false)} />}
    </>
  );
}
// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { 
//     LayoutDashboard, Users, BookOpen, FileText, 
//     MessageSquare, Settings, LogOut, Layout 
// } from 'lucide-react';
// import { useAuth } from '@/lib/AuthProvider';

// export default function AdminSidebar() {
//     const pathname = usePathname();
//     const { logout, user } = useAuth();

//     const menuItems = [
//         { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
//         { name: 'Kelola Pengguna', href: '/admin/users', icon: Users },
//         { name: 'Kelola Kursus', href: '/admin/courses', icon: BookOpen },
//         { name: 'Kelola Blog', href: '/admin/blog', icon: FileText },
//         { name: 'Forum Diskusi', href: '/admin/forum', icon: MessageSquare },
//         // [MENU BARU]
//         { name: 'Kelola Tampilan', href: '/admin/content', icon: Layout }, 
//     ];

//     return (
//         <aside className="w-64 bg-white border-r h-screen fixed left-0 top-0 flex flex-col z-50">
//             <div className="p-6 border-b flex items-center gap-3">
//                 <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">
//                     PMI
//                 </div>
//                 <div>
//                     <h1 className="font-bold text-gray-800">Admin Panel</h1>
//                     <p className="text-xs text-gray-500">LMS Management</p>
//                 </div>
//             </div>

//             <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
//                 {menuItems.map((item) => {
//                     const isActive = pathname === item.href;
//                     return (
//                         <Link 
//                             key={item.href} 
//                             href={item.href}
//                             className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
//                                 isActive 
//                                     ? 'bg-red-50 text-red-700' 
//                                     : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//                             }`}
//                         >
//                             <item.icon size={20} className={isActive ? 'text-red-600' : 'text-gray-400'} />
//                             {item.name}
//                         </Link>
//                     );
//                 })}
//             </nav>

//             <div className="p-4 border-t bg-gray-50">
//                 <div className="flex items-center gap-3 mb-4 px-2">
//                     <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-xs">
//                         {user?.name?.charAt(0) || 'A'}
//                     </div>
//                     <div className="overflow-hidden">
//                         <p className="text-sm font-bold text-gray-800 truncate">{user?.name}</p>
//                         <p className="text-xs text-gray-500 truncate">{user?.email}</p>
//                     </div>
//                 </div>
//                 <button 
//                     onClick={logout}
//                     className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
//                 >
//                     <LogOut size={16} /> Keluar
//                 </button>
//             </div>
//         </aside>
//     );
// }


'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, Users, BookOpen, FileText, 
    MessageSquare, Settings, LogOut, Layout, Database 
} from 'lucide-react';
import { useAuth } from '@/lib/AuthProvider';

export default function AdminSidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    const menuItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Kelola Pengguna', href: '/admin/users', icon: Users },
        { name: 'Kelola Kursus', href: '/admin/courses', icon: BookOpen },
        { name: 'Kelola Blog', href: '/admin/blog', icon: FileText },
        { name: 'Forum Diskusi', href: '/admin/forum', icon: MessageSquare },
        // [MENU BARU]
        { name: 'Kelola Tampilan', href: '/admin/content', icon: Layout }, 
    ];

    return (
        <aside className="w-64 bg-white border-r h-screen fixed left-0 top-0 flex flex-col z-50">
            {/* Header Sidebar */}
            <div className="p-6 border-b flex items-center gap-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">
                    PMI
                </div>
                <div>
                    <h1 className="font-bold text-gray-800">Admin Panel</h1>
                    <p className="text-xs text-gray-500">LMS Management</p>
                </div>
            </div>

            {/* Menu Navigasi */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {/* Menu Utama (Looping Array) */}
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link 
                            key={item.href} 
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                isActive 
                                    ? 'bg-red-50 text-red-700' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <item.icon size={20} className={isActive ? 'text-red-600' : 'text-gray-400'} />
                            {item.name}
                        </Link>
                    );
                })}

                {/* [TAMBAHAN] Section System & Maintenance */}
                <div className="mt-6 px-4 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    System
                </div>
                
                <Link 
                    href="/admin/backup"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        pathname === '/admin/backup'
                            ? 'bg-red-50 text-red-700' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                    <Database size={20} className={pathname === '/admin/backup' ? 'text-red-600' : 'text-gray-400'} />
                    Database Center
                </Link>
            </nav>

            {/* Footer User Profile */}
            <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-xs">
                        {user?.name?.charAt(0) || 'A'}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-gray-800 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                </div>
                <button 
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                >
                    <LogOut size={16} /> Keluar
                </button>
            </div>
        </aside>
    );
}
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthProvider';
import { api, getImageUrl } from '@/lib/api';
import Protected from '@/components/Protected';
import { User, Mail, Phone, MapPin, Edit, MessageSquare, BookOpen, Clock, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useAuth();
  
  // State Tabs
  const [activeTab, setActiveTab] = useState<'forum' | 'chat' | 'course' | 'finance' | 'library' | 'blog'>('forum');
  
  // Data State
  const [forums, setForums] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'forum') loadForumHistory();
    if (activeTab === 'blog') loadBlogHistory();
  }, [activeTab]);

  const loadForumHistory = async () => {
    try {
        setLoading(true);
        const res = await api('/api/forum?author=me');
        setForums(res.topics || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const loadBlogHistory = async () => {
    try {
        setLoading(true);
        const res = await api('/api/blog?author=me'); 
        setBlogs(res || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  if (!user) return null;

  return (
    <Protected>
      <div className="max-w-6xl mx-auto p-6 font-sans min-h-screen pb-20">
        
        {/* HEADER PROFIL */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="h-32 bg-red-800"></div>
            <div className="px-8 pb-8 relative">
                <div className="flex flex-col md:flex-row gap-6 items-end -mt-12">
                    <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md">
                        <img src={getImageUrl(user.avatarUrl)} className="w-full h-full object-cover" alt="Avatar"/>
                    </div>
                    <div className="flex-1 mb-2">
                        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                        <p className="text-sm text-gray-500 uppercase font-bold tracking-wide flex items-center gap-2">
                            <span className="bg-gray-100 px-2 py-0.5 rounded">{user.role}</span> • {user.email}
                        </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 mb-2">
                        <Edit size={16}/> Edit Profil
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100 text-sm text-gray-600">
                    <div className="flex items-center gap-2"><Mail size={16} className="text-gray-400"/> {user.email}</div>
                    <div className="flex items-center gap-2"><Phone size={16} className="text-gray-400"/> +62 812-xxxx-xxxx</div>
                    <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-400"/> Jakarta, Indonesia</div>
                </div>
            </div>
        </div>

        {/* TAB NAVIGASI */}
        <div className="flex overflow-x-auto gap-8 border-b border-gray-200 mb-8 hide-scrollbar">
            {[
                { id: 'forum', label: 'Forum & Diskusi', icon: MessageSquare },
                { id: 'blog', label: 'Riwayat Blog', icon: FileText },
                { id: 'chat', label: 'Riwayat Chat', icon: MessageSquare },
                { id: 'course', label: 'Pelatihan', icon: BookOpen },
            ].map((tab) => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 pb-4 text-sm font-bold whitespace-nowrap transition border-b-2 ${activeTab === tab.id ? 'border-red-600 text-red-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <tab.icon size={18}/> {tab.label}
                </button>
            ))}
        </div>

        {/* KONTEN TAB */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[300px]">
            
            {/* KONTEN RIWAYAT BLOG */}
            {activeTab === 'blog' && (
                <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><FileText size={20}/> Cerita Relawan Saya</h3>
                    {loading ? <div>Memuat...</div> : 
                     blogs.length === 0 ? <div className="text-center py-10 text-gray-400">Belum ada cerita yang Anda tulis.</div> :
                     <div className="space-y-4">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition">
                                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                    {/* FIX: Added alt attribute */}
                                    {blog.coverUrl && <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt={blog.title}/>}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800">{blog.title}</h4>
                                    <div className="flex items-center gap-2 text-xs mt-1">
                                        <span className={`px-2 py-0.5 rounded uppercase font-bold ${blog.status === 'approved' ? 'bg-green-100 text-green-700' : blog.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {blog.status === 'approved' ? 'Disetujui' : blog.status === 'rejected' ? 'Ditolak' : 'Menunggu Review'}
                                        </span>
                                        <span className="text-gray-400">• {new Date(blog.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <Link href={`/blog/${blog._id}`} className="text-sm font-bold text-blue-600 hover:underline">Lihat</Link>
                            </div>
                        ))}
                     </div>
                    }
                </div>
            )}

            {/* KONTEN FORUM (EXISTING) */}
            {activeTab === 'forum' && (
                <div>
                     <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><MessageSquare size={20}/> Riwayat Pengajuan Forum</h3>
                     {loading ? <div>Memuat...</div> : 
                      forums.length === 0 ? <div className="text-center py-10 text-gray-400">Belum ada topik diskusi.</div> :
                      <div className="space-y-4">
                        {forums.map((f) => (
                            <div key={f._id} className="p-4 border rounded-xl flex justify-between items-center">
                                <div>
                                    <div className="text-xs font-bold text-blue-600 mb-1 uppercase">{f.category} • {new Date(f.createdAt).toLocaleDateString()}</div>
                                    <h4 className="font-bold text-gray-800">{f.title}</h4>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${f.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                    {f.status === 'approved' ? 'Disetujui' : 'Menunggu'}
                                </div>
                            </div>
                        ))}
                      </div>
                     }
                </div>
            )}
            
            {(activeTab === 'chat' || activeTab === 'course') && (
                <div className="text-center py-20 text-gray-400">Fitur sedang dalam pengembangan...</div>
            )}
        </div>
      </div>
    </Protected>
  );
}
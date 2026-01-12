'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, getImageUrl } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import { 
    ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
    Award, FileText, CheckCircle, PenTool, Mic2, Star
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [content, setContent] = useState<any>(null);
  
  // State Data
  const [wofData, setWofData] = useState({ learners: [], contributors: [], facilitators: [] });
  const [activeTab, setActiveTab] = useState<'learners' | 'contributors' | 'facilitators'>('learners'); 

  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0); 

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const contentData = await api('/api/content').catch(() => null);
        setContent(contentData);

        api('/api/stats/visit', { method: 'POST' }).catch(console.error);

        try {
            const blogsRes = await api('/api/blog/public?limit=3');
            setRecentBlogs(Array.isArray(blogsRes.data) ? blogsRes.data : []);
        } catch(e) { console.log("Blog error", e); }

        try {
            const wofRes = await api('/api/stats/wall-of-fame');
            console.log("WOF DATA FINAL:", wofRes); 
            setWofData({
                learners: wofRes.learners || [],
                contributors: wofRes.contributors || [],
                facilitators: wofRes.facilitators || []
            });
            
            if ((!wofRes.learners || wofRes.learners.length === 0)) {
                if(wofRes.contributors?.length > 0) setActiveTab('contributors');
                else if(wofRes.facilitators?.length > 0) setActiveTab('facilitators');
            }
        } catch(e) { console.log("WoF error", e); }

      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (content?.slides?.length > 1) {
      const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % content.slides.length), 5000);
      return () => clearInterval(timer);
    }
  }, [content]);

  const features = content?.features?.length ? content.features : [
      { title: 'Katalog Kelas', description: 'Akses modul pelatihan digital.', link: '/courses', icon: 'book' },
      { title: 'Panduan', description: 'Cara penggunaan sistem.', link: '/guide', icon: 'users' }, 
      { title: 'Pendaftaran', description: 'Jadwal kegiatan terbaru.', link: '/courses', icon: 'calendar' }
  ];

  const activeList: any[] = wofData[activeTab] || [];
  
  const getTabLabel = () => {
      if(activeTab === 'learners') return 'PESERTA';
      if(activeTab === 'contributors') return 'PENULIS';
      return 'FASILITATOR';
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      
      {/* 1. HERO SECTION */}
      {/* [FIX] pt-12: Menaikkan seluruh konten Hero mendekati navbar.
          [FIX] pb-64: Menambah panjang background merah sedikit agar pas dengan tarikan kartu. */}
      <div className="relative bg-[#990000] text-white overflow-hidden shadow-2xl pb-64 pt-12 transition-all duration-500">
        
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            {content?.slides && content.slides.length > 0 ? (
                content.slides.map((slide: string, index: number) => (
                    <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                        <img src={getImageUrl(slide)} alt="Hero" className="w-full h-full object-cover object-center" />
                    </div>
                ))
            ) : (
                <img src={content?.heroBgUrl ? getImageUrl(content.heroBgUrl) : "/pmi-logo.png"} alt="Hero" className="w-full h-full object-cover object-center opacity-50" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[#990000]/95 via-[#990000]/80 to-[#500000]/60 z-10 mix-blend-multiply"></div>
        </div>

        {/* CONTENT HERO FLEX */}
        <div className="max-w-[75rem] mx-auto px-8 relative z-20 flex flex-col md:flex-row items-start gap-8 lg:gap-16">
            
            {/* KIRI: Teks */}
            {/* [FIX] mt-10: Menurunkan teks agar Wall of Fame di kanan terlihat lebih tinggi/dominan. */}
            <div className="w-full md:w-1/2 space-y-4 text-center md:text-left py-2 mt-10">
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight drop-shadow-lg">
                    {content?.heroTitle || "Selamat Datang di LMS"}
                </h1>
                <p className="text-red-50 text-sm md:text-base leading-relaxed font-light opacity-95 drop-shadow-md">
                    {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                    <Link href="/courses" className="bg-white text-[#990000] px-5 py-2.5 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg text-sm flex items-center gap-2">
                        Mulai Belajar <ArrowRight size={16}/>
                    </Link>
                    {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
                        <Link href="/admin/content" className="bg-black/30 text-white px-5 py-2.5 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 text-sm">
                            Kelola
                        </Link>
                    )}
                </div>
            </div>

            {/* KANAN: WALL OF FAME */}
            <div className="w-full md:w-1/2 mt-0">
                <div className="bg-white/10 backdrop-blur-md border border-white/30 p-5 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col">
                    
                    <div className="flex items-center justify-between mb-3 border-b border-white/20 pb-2">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2 drop-shadow-md">
                             <Award size={20} className="text-yellow-300 fill-yellow-300" /> Wall of Fame
                        </h2>
                        <span className="text-[10px] bg-yellow-400 text-[#990000] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                            {getTabLabel()} TOP 3
                        </span>
                    </div>

                    <div className="flex p-1 bg-black/20 rounded-lg mb-3">
                        {['learners', 'contributors', 'facilitators'].map((tab) => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`flex-1 py-1 text-[10px] font-bold rounded transition-all flex items-center justify-center gap-1 ${activeTab === tab ? 'bg-white text-[#990000] shadow-sm' : 'text-white/70 hover:text-white'}`}
                            >
                                {tab === 'learners' && <><Users size={12}/> Peserta</>}
                                {tab === 'contributors' && <><PenTool size={12}/> Penulis</>}
                                {tab === 'facilitators' && <><Mic2 size={12}/> Fasilitator</>}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-2.5 min-h-[170px]"> 
                        {activeList.length > 0 ? (
                            activeList.map((member: any, idx: number) => (
                                <div key={idx} className="bg-white/95 p-2.5 rounded-lg shadow-sm flex items-center gap-3 hover:bg-white transition-colors cursor-default animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className={`w-6 h-6 rounded flex items-center justify-center font-black text-xs shadow-sm flex-shrink-0 ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : idx === 1 ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-600'}`}>
                                        #{idx + 1}
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100 flex-shrink-0">
                                        <img src={member.avatar ? getImageUrl(member.avatar) : `https://ui-avatars.com/api/?name=${member.name}`} className="w-full h-full object-cover" alt={member.name}/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 text-xs truncate">{member.name}</h3>
                                        <p className="text-[10px] text-gray-500 truncate font-medium">{member.desc}</p>
                                    </div>
                                    <div className="text-green-500"><CheckCircle size={14} className="fill-green-100"/></div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-white/50 flex flex-col items-center justify-center">
                                <Star className="w-8 h-8 mx-auto mb-2 opacity-40"/>
                                <p className="text-xs">Belum ada data Top 3.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
      </div>

      {/* 2. INFO CARDS */}
      {/* [FIX] -mt-56: Menarik kartu naik sedikit lagi dari sebelumnya (-mt-48).
          mb-20: Memberi jarak ke konten bawah. */}
      <div className="relative z-30 max-w-[75rem] mx-auto px-8 -mt-56 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {features.map((feat: any, idx: number) => {
             let Icon = BookOpen;
             if(idx === 1) Icon = Users;
             if(idx === 2) Icon = Calendar;

             return (
                <Link 
                    href={feat.link || '#'} 
                    key={idx} 
                    className="bg-white py-6 px-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group h-full justify-center w-full"
                >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                        <Icon size={28}/>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-[#990000] transition-colors line-clamp-1">
                      {feat.title || "Menu"}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {feat.description || "Klik untuk melihat detail."}
                    </p>
                </Link>
             );
          })}
        </div>
      </div>

      {/* 3. CERITA RELAWAN */}
      <div className="max-w-[75rem] mx-auto px-8 mb-24">
          <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                  <div className="bg-red-50 p-2 rounded-lg text-[#990000]"><FileText size={24}/></div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Cerita Relawan</h2>
                    <p className="text-gray-500 text-xs mt-0.5">Kabar terbaru dari lapangan.</p>
                  </div>
              </div>
              <Link href="/blog" className="text-xs font-bold text-[#990000] hover:underline flex items-center gap-1">
                  Lihat Semua <ChevronRight size={14}/>
              </Link>
          </div>
          
          {recentBlogs.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <PenTool className="text-gray-300 mx-auto mb-2" size={24} />
                  <p className="text-gray-400 text-sm">Belum ada cerita dipublikasikan.</p>
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {recentBlogs.map((blog, idx) => (
                      <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col w-full">
                          <div className="h-48 bg-gray-200 relative overflow-hidden">
                              {blog.coverUrl ? (
                                  <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
                              ) : (
                                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={32} opacity={0.2}/></div>
                              )}
                              <div className="absolute top-3 left-3 flex gap-1">
                                  {blog.tags && blog.tags[0] && <span className="bg-white/90 text-gray-900 text-[10px] px-2 py-1 rounded-full font-bold uppercase shadow-sm">{blog.tags[0]}</span>}
                              </div>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                              <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1">
                                  <Calendar size={10}/> {new Date(blog.createdAt).toLocaleDateString('id-ID')}
                              </p>
                              <h3 className="font-bold text-base text-gray-900 mb-3 group-hover:text-[#990000] transition-colors line-clamp-2">
                                  {blog.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-50">
                                  <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden">
                                      <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name || 'Admin'}`} className="w-full h-full object-cover" alt="Au"/>
                                  </div>
                                  <span className="text-[11px] font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
                              </div>
                          </div>
                      </Link>
                  ))}
              </div>
          )}
      </div>
    </div>
  );
}

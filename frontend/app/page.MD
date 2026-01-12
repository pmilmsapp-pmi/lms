


// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { api, getImageUrl } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';
// import { 
//     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
//     Award, FileText, CheckCircle, GraduationCap, Globe 
// } from 'lucide-react';

// export default function Dashboard() {
//   const { user } = useAuth();
//   const [content, setContent] = useState<any>(null);
//   const [stats, setStats] = useState({ users: 0, courses: 0, visitors: 0, startYear: 2025 });
//   const [wallOfFame, setWallOfFame] = useState<any[]>([]);
//   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  
//   const [loading, setLoading] = useState(true);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);
        
//         // 1. Load Content & Stats
//         const [contentData, statsData] = await Promise.all([
//             api('/api/content'),
//             api('/api/stats/public')
//         ]);
//         setContent(contentData);
//         setStats(statsData || { users: 0, courses: 0, visitors: 0, startYear: 2025 });

//         // 2. Track Visitor
//         await api('/api/stats/visit', { method: 'POST' });

//         // 3. Load Blog Terbaru
//         try {
//             const blogsData = await api('/api/blog/public');
//             setRecentBlogs(blogsData?.slice(0, 3) || []);
//         } catch(e) { console.log("Blog error", e); }

//         // 4. Load Wall of Fame
//         try {
//             const wofData = await api('/api/stats/wall-of-fame');
//             setWallOfFame(wofData || []);
//         } catch(e) { console.log("WoF error", e); }

//       } catch (err) {
//         console.error("Gagal memuat data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, []);

//   // Timer Slide Carousel
//   useEffect(() => {
//     if (content?.slides?.length > 1) {
//       const timer = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
//       }, 5000);
//       return () => clearInterval(timer);
//     }
//   }, [content]);

//   // Default Features fallback
//   const features = content?.features?.length ? content.features : [
//       { title: 'Selamat Datang', description: 'Platform pembelajaran digital terbaik.' },
//       { title: 'Tutorial Penggunaan', description: 'Panduan lengkap cara menggunakan sistem.' },
//       { title: 'Pendaftaran', description: 'Daftar pelatihan dan kursus dengan mudah.' }
//   ];

//   // Helper untuk memastikan URL gambar valid
//   const getSlideUrl = (url: string) => {
//       if (!url) return '';
//       // Jika URL sudah lengkap (http/https), pakai langsung. Jika tidak, pakai getImageUrl
//       if (url.startsWith('http')) return url;
//       return getImageUrl(url);
//   };

//   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

//   return (
//     <div className="bg-white min-h-screen flex flex-col font-sans">
      
//       {/* 1. HERO SECTION */}
//       <div className="relative bg-[#990000] text-white overflow-hidden shadow-2xl pb-32 pt-10 md:pt-14">
//         {/* Background Overlay */}
//         <div className="absolute inset-0 z-0">
//           <div className="absolute inset-0 bg-gradient-to-r from-[#990000] via-[#990000]/95 to-transparent z-10"></div>
//           {content?.heroBgUrl ? (
//              <img src={getImageUrl(content.heroBgUrl)} alt="Hero" className="w-full h-full object-cover object-center opacity-40 animate-in fade-in duration-1000" />
//           ) : (
//              <img src="/pmi-logo.png" alt="Default Hero" className="w-full h-full object-cover object-right opacity-10" />
//           )}
//         </div>

//         <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center gap-10">
//             {/* Teks Hero */}
//             <div className="flex-1 space-y-5 text-center md:text-left">
//                 <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
//                     {content?.heroTitle || "Selamat Datang di LMS"}
//                 </h1>
//                 <p className="text-red-50 text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0 font-light opacity-90">
//                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
//                 </p>
                
//                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
//                     <Link href="/courses" className="bg-white text-[#990000] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 flex items-center gap-2 group">
//                         Mulai Belajar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
//                     </Link>
//                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
//                         <Link href="/admin/content" className="bg-black/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 flex items-center gap-2">
//                             Kelola Tampilan
//                         </Link>
//                     )}
//                 </div>
//             </div>

//             {/* Slide Carousel (FIXED) */}
//             <div className="w-full md:w-1/2 lg:w-5/12">
//                 {content?.slides && content.slides.length > 0 ? (
//                     <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 group bg-gray-900">
//                         {content.slides.map((slide: string, index: number) => (
//                             <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
//                                 <img 
//                                     src={getImageUrl(slide)} 
//                                     alt={`Slide ${index}`} 
//                                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[5000ms]" 
//                                     onError={(e) => (e.currentTarget.style.display = 'none')}
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-30 pointer-events-none"></div>
//                             </div>
//                         ))}
                        
//                         {/* Indikator Slide */}
//                         <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
//                             {content.slides.map((_: any, i: number) => (
//                                 <button 
//                                     key={i} 
//                                     onClick={() => setCurrentSlide(i)} 
//                                     className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`} 
//                                     aria-label={`Slide ${i+1}`} 
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="aspect-video bg-white/10 backdrop-blur-md rounded-xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-white/50 gap-3">
//                         <div className="p-3 bg-white/10 rounded-full"><BookOpen size={28}/></div>
//                         <p className="text-xs font-medium">Slide Belum Ditambahkan</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//       </div>

//       {/* 2. INFO CARDS (OVERLAPPING HEADER) */}
//       <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-24 mb-16">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
//           {features.map((feat: any, idx: number) => (
//             <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group h-full">
//                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
//                     {idx === 0 ? <BookOpen size={28}/> : idx === 1 ? <Users size={28}/> : <Calendar size={28}/>}
//                 </div>
//                 <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#990000] transition-colors">{feat.title || "Judul Fitur"}</h3>
//                 <p className="text-gray-500 text-sm leading-relaxed">{feat.description || "Deskripsi fitur singkat akan muncul di sini."}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 3. WALL OF FAME (REALTIME LULUSAN) */}
//       {wallOfFame.length > 0 && (
//           <div className="max-w-7xl mx-auto px-6 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
//               <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
//                   <div className="flex items-center gap-4">
//                       <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 shadow-sm"><Award size={28}/></div>
//                       <div>
//                         <h2 className="text-2xl font-bold text-gray-900">Wall of Fame</h2>
//                         <p className="text-gray-500 text-sm mt-1">Apresiasi untuk lulusan terbaik yang baru saja menyelesaikan pelatihan.</p>
//                       </div>
//                   </div>
//               </div>
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                   {wallOfFame.map((winner, idx) => (
//                       <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-yellow-200 transition-all group relative overflow-hidden flex items-center gap-4">
//                           <div className="absolute top-0 right-0 bg-yellow-400 w-10 h-10 rounded-bl-2xl flex items-center justify-center text-white text-sm font-black shadow-sm group-hover:w-12 group-hover:h-12 transition-all z-10">
//                               #{idx+1}
//                           </div>
                          
//                           <div className="w-16 h-16 rounded-full bg-gray-50 p-1 border-2 border-dashed border-yellow-200 group-hover:border-yellow-400 transition-colors flex-shrink-0">
//                                 <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
//                                     {winner.avatar ? (
//                                         <img src={getImageUrl(winner.avatar)} className="w-full h-full object-cover" alt={winner.name}/>
//                                     ) : (
//                                         <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">{winner.name?.charAt(0)}</div>
//                                     )}
//                                 </div>
//                           </div>
                          
//                           <div className="flex-1 min-w-0 pr-6">
//                               <h3 className="font-bold text-gray-900 truncate text-sm" title={winner.name}>{winner.name}</h3>
//                               <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold mb-1 truncate">{winner.course}</p>
//                               <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[9px] font-bold border border-green-100">
//                                   <CheckCircle size={8}/> LULUS
//                               </span>
//                           </div>
//                       </div>
//                   ))}
//               </div>
//           </div>
//       )}

//       {/* 4. CERITA RELAWAN (BLOG) */}
//       <div className="max-w-7xl mx-auto px-6 mb-24">
//           <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
//               <div className="flex items-center gap-4">
//                   <div className="bg-red-50 p-3 rounded-xl text-[#990000]"><FileText size={28}/></div>
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Cerita Relawan</h2>
//                     <p className="text-gray-500 text-sm mt-1">Kisah inspiratif dan berita terbaru dari lapangan.</p>
//                   </div>
//               </div>
//               <Link href="/blog" className="text-sm font-bold text-[#990000] hover:underline flex items-center gap-1 transition-colors">
//                   Lihat Semua <ChevronRight size={16}/>
//               </Link>
//           </div>
          
//           {recentBlogs.length === 0 ? (
//               <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
//                   Belum ada cerita terbaru yang dipublikasikan.
//               </div>
//           ) : (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                   {recentBlogs.map((blog, idx) => (
//                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
//                           <div className="h-48 bg-gray-200 relative overflow-hidden">
//                               {blog.coverUrl ? (
//                                   <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
//                               ) : (
//                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={40} opacity={0.2}/></div>
//                               )}
//                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                               <div className="absolute top-3 left-3 flex gap-1">
//                                   {blog.tags?.slice(0,1).map((t:any, i:number)=>(<span key={i} className="bg-white/90 text-gray-900 text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">{t}</span>))}
//                               </div>
//                           </div>
//                           <div className="p-6 flex-1 flex flex-col">
//                               <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1 tracking-wider">
//                                   <Calendar size={10}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
//                               </p>
//                               <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
//                               <div className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content?.replace(/<[^>]+>/g, '') }}></div>
                              
//                               <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
//                                   <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
//                                       <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name}`} className="w-full h-full object-cover" alt="Author"/>
//                                   </div>
//                                   <span className="text-xs font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
//                               </div>
//                           </div>
//                       </Link>
//                   ))}
//               </div>
//           )}
//       </div>


//     </div>
//   );
// }











yang muncul gambar : 


'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, getImageUrl } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import { 
    ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
    Award, FileText, CheckCircle 
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [content, setContent] = useState<any>(null);
  const [wallOfFame, setWallOfFame] = useState<any[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // 1. Load Content CMS
        const contentData = await api('/api/content');
        setContent(contentData);

        // 2. Track Visitor (Tetap jalan di background)
        api('/api/stats/visit', { method: 'POST' }).catch(console.error);

        // 3. Load Blog Terbaru
        try {
            const blogsData = await api('/api/blog/public');
            setRecentBlogs(blogsData?.slice(0, 3) || []);
        } catch(e) { console.log("Blog error", e); }

        // 4. Load Wall of Fame
        try {
            const wofData = await api('/api/stats/wall-of-fame');
            setWallOfFame(wofData || []);
        } catch(e) { console.log("WoF error", e); }

      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Timer Slide Carousel
  useEffect(() => {
    if (content?.slides?.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % content.slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [content]);

  // Default Features fallback (Agar card tidak hilang jika CMS kosong)
  const features = content?.features?.length ? content.features : [
      { title: 'Selamat Datang', description: 'Platform pembelajaran digital terbaik.' },
      { title: 'Tutorial Penggunaan', description: 'Panduan lengkap cara menggunakan sistem.' },
      { title: 'Pendaftaran', description: 'Daftar pelatihan dan kursus dengan mudah.' }
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      
      {/* 1. HERO SECTION (HEADER MERAH) */}
      <div className="relative bg-[#990000] text-white shadow-2xl pb-40 pt-10 md:pt-14 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#990000] via-[#990000]/95 to-transparent z-10"></div>
          {content?.heroBgUrl ? (
             <img src={getImageUrl(content.heroBgUrl)} alt="Hero" className="w-full h-full object-cover object-center opacity-40" />
          ) : (
             <img src="/pmi-logo.png" alt="Default Hero" className="w-full h-full object-cover object-right opacity-10" />
          )}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center gap-10">
            {/* Teks Hero */}
            <div className="flex-1 space-y-5 text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
                    {content?.heroTitle || "Selamat Datang di LMS"}
                </h1>
                <p className="text-red-50 text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0 font-light opacity-90">
                    {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
                </p>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                    <Link href="/courses" className="bg-white text-[#990000] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 flex items-center gap-2 group">
                        Mulai Belajar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                    </Link>
                    {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
                        <Link href="/admin/content" className="bg-black/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 flex items-center gap-2">
                            Kelola Tampilan
                        </Link>
                    )}
                </div>
            </div>

            {/* Slide Carousel (KEMBALI KE LOGIKA LAMA) */}
            <div className="w-full md:w-1/2 lg:w-5/12">
                {content?.slides && content.slides.length > 0 ? (
                    <div className="relative h-[250px] md:h-[350px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group bg-gray-900">
                        {content.slides.map((slide: string, index: number) => (
                            <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                                {/* [FIX] Menggunakan getImageUrl langsung agar gambar muncul */}
                                <img 
                                    src={getImageUrl(slide)} 
                                    alt={`Slide ${index}`} 
                                    className="w-full h-full object-cover" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-30 pointer-events-none"></div>
                            </div>
                        ))}
                        
                        {/* Indikator Slide */}
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
                            {content.slides.map((_: any, i: number) => (
                                <button 
                                    key={i} 
                                    onClick={() => setCurrentSlide(i)} 
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`} 
                                    aria-label={`Slide ${i+1}`} 
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="h-[250px] md:h-[350px] w-full bg-white/10 backdrop-blur-md rounded-2xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-white/50 gap-3">
                        <div className="p-3 bg-white/10 rounded-full"><BookOpen size={28}/></div>
                        <p className="text-xs font-medium">Slide Belum Ditambahkan</p>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* 2. INFO CARDS (OVERLAPPING HEADER) - FIXED */}
      {/* Margin negatif -mt-32 menarik card ke atas menutupi header */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-32 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feat: any, idx: number) => (
            <div key={idx} className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group h-full relative z-40">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                    {idx === 0 ? <BookOpen size={32}/> : idx === 1 ? <Users size={32}/> : <Calendar size={32}/>}
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-[#990000] transition-colors">{feat.title || "Judul Fitur"}</h3>
                <p className="text-gray-500 text-base leading-relaxed">{feat.description || "Deskripsi fitur singkat akan muncul di sini."}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. WALL OF FAME (REALTIME) */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-4">
                  <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 shadow-sm"><Award size={28}/></div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Wall of Fame</h2>
                    <p className="text-gray-500 text-sm mt-1">Apresiasi untuk lulusan terbaik yang baru saja menyelesaikan pelatihan.</p>
                  </div>
              </div>
          </div>
          
          {wallOfFame.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {wallOfFame.map((winner, idx) => (
                      <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-yellow-200 transition-all group relative overflow-hidden flex items-center gap-4">
                          <div className="absolute top-0 right-0 bg-yellow-400 w-10 h-10 rounded-bl-2xl flex items-center justify-center text-white text-sm font-black shadow-sm z-10">
                              #{idx+1}
                          </div>
                          
                          <div className="w-16 h-16 rounded-full bg-gray-50 p-1 border-2 border-dashed border-yellow-200 group-hover:border-yellow-400 transition-colors flex-shrink-0">
                                <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
                                    {winner.avatar ? (
                                        <img src={getImageUrl(winner.avatar)} className="w-full h-full object-cover" alt={winner.name}/>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">{winner.name?.charAt(0)}</div>
                                    )}
                                </div>
                          </div>
                          
                          <div className="flex-1 min-w-0 pr-6">
                              <h3 className="font-bold text-gray-900 truncate text-sm" title={winner.name}>{winner.name}</h3>
                              <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold mb-1 truncate">{winner.course}</p>
                              <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[9px] font-bold border border-green-100">
                                  <CheckCircle size={8}/> LULUS
                              </span>
                          </div>
                      </div>
                  ))}
              </div>
          ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <Award className="mx-auto text-gray-300 mb-2" size={48}/>
                  <p className="text-gray-500 font-bold">Belum ada lulusan terbaru.</p>
                  <p className="text-gray-400 text-xs">Jadilah yang pertama lulus!</p>
              </div>
          )}
      </div>

      {/* 4. CERITA RELAWAN (BLOG) */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
          <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-4">
                  <div className="bg-red-50 p-3 rounded-xl text-[#990000]"><FileText size={28}/></div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Cerita Relawan</h2>
                    <p className="text-gray-500 text-sm mt-1">Kisah inspiratif dan berita terbaru dari lapangan.</p>
                  </div>
              </div>
              <Link href="/blog" className="text-sm font-bold text-[#990000] hover:underline flex items-center gap-1 transition-colors">
                  Lihat Semua <ChevronRight size={16}/>
              </Link>
          </div>
          
          {recentBlogs.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
                  Belum ada cerita terbaru yang dipublikasikan.
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {recentBlogs.map((blog, idx) => (
                      <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
                          <div className="h-48 bg-gray-200 relative overflow-hidden">
                              {blog.coverUrl ? (
                                  <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
                              ) : (
                                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={40} opacity={0.2}/></div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <div className="absolute top-3 left-3 flex gap-1">
                                  {blog.tags?.slice(0,1).map((t:any, i:number)=>(<span key={i} className="bg-white/90 text-gray-900 text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">{t}</span>))}
                              </div>
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                              <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1 tracking-wider">
                                  <Calendar size={10}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
                              </p>
                              <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
                              <div className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content?.replace(/<[^>]+>/g, '') }}></div>
                              
                              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                                  <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                                      <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name}`} className="w-full h-full object-cover" alt="Author"/>
                                  </div>
                                  <span className="text-xs font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
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